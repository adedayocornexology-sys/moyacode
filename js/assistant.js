/**
 * js/assistant.js — "Moya", MoyaCode's in-page agentic assistant.
 *
 * A floating helper that:
 *   • On open, reads the student's saved memory and greets them with a
 *     "continue where you left off" card + one-tap actions (NO LLM needed —
 *     this works even with no API key, the core "remember me" experience).
 *   • Powers free-text chat through the Claude relay at /api/assistant,
 *     executing WebMCP tools (window.MoyaMCP) client-side in the student's
 *     own authenticated session — the WebMCP pattern.
 *
 * Drop-in: <script type="module" src="/js/assistant.js"></script>
 */

import MoyaMCP from './webmcp.js';

const MODEL_HINT = undefined; // server picks a sensible default

const SYSTEM_PROMPT = `You are Moya, the warm, encouraging in-app guide for MoyaCode — a coding-education app for Nigerian secondary-school students (JSS1–SS3) on low-end phones.

Rules:
- Keep replies short, friendly and concrete. Plain English. Celebrate small wins.
- NEVER guess the student's progress. Call get_learner_state first whenever progress, "next", "continue", or recommendations come up.
- To continue/resume, call resume_learning. To open a named class, call start_course.
- The courses, in order, are: JSS1 & JSS2 = Scratch (teacher Tolu), JSS3 & SS1 = HTML (Chidi), SS2 = CSS (Amaka), SS3 = JavaScript (Emeka).
- When a tool navigates the page, tell the student in one short line what's happening.
- You can answer beginner coding questions directly, but stay brief.

Knowledge base:
- For questions about MoyaCode itself (how it works, what's free, MoyaCoin, tutors, the bootcamp, the Arcade) or about what a track/lesson covers, call search_wiki first, then read_page on the best match. Each page lists related pages; follow one when it clearly helps.
- Answer from what the pages say. If the knowledge base doesn't cover it, say so honestly instead of guessing.`;

// ── Knowledge tools (executed against the server's wiki store) ────────
const WIKI_TOOLS = [
  {
    name: 'search_wiki',
    description: 'Search the MoyaCode knowledge base (how MoyaCode works, tracks and lessons, MoyaCoin, tutors, bootcamp, Arcade). Returns matching entries with a page_slug to read.',
    input_schema: {
      type: 'object',
      properties: { query: { type: 'string', description: "The student's question or its key words." } },
      required: ['query'],
    },
  },
  {
    name: 'read_page',
    description: 'Read one knowledge-base page in full by page_slug (from search_wiki results or a related-pages list). Returns the content and related pages.',
    input_schema: {
      type: 'object',
      properties: { slug: { type: 'string', description: 'The page_slug to read.' } },
      required: ['slug'],
    },
  },
];

async function runWikiTool(name, input) {
  try {
    if (name === 'search_wiki') {
      const r = await fetch(`/api/wiki/search?q=${encodeURIComponent(String(input?.query ?? ''))}`);
      return r.ok ? await r.json() : { error: `search failed (${r.status})` };
    }
    const r = await fetch(`/api/wiki/page/${encodeURIComponent(String(input?.slug ?? ''))}`);
    return r.ok ? await r.json() : { error: `page not found` };
  } catch {
    return { error: 'knowledge base unreachable' };
  }
}

// ── Tiny DOM helpers ──────────────────────────────────────────────────
const el = (tag, props = {}, ...kids) => {
  const n = Object.assign(document.createElement(tag), props);
  for (const k of kids) n.append(k);
  return n;
};
const esc = s => String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

// ── Styles ────────────────────────────────────────────────────────────
const CSS = `
.moya-fab{position:fixed;right:18px;bottom:18px;z-index:9998;display:flex;align-items:center;gap:8px;
  padding:12px 16px;border:none;border-radius:999px;cursor:pointer;font-family:var(--f-body,system-ui),sans-serif;
  font-weight:700;font-size:.92rem;color:#030712;background:var(--c-teal,#00e5a0);
  box-shadow:0 8px 30px rgba(0,229,160,.4);transition:transform .15s ease,filter .15s ease}
.moya-fab:hover{transform:translateY(-2px);filter:brightness(1.06)}
.moya-fab svg{width:18px;height:18px}
.moya-panel{position:fixed;right:18px;bottom:18px;z-index:9999;width:min(380px,calc(100vw - 24px));
  height:min(560px,calc(100vh - 36px));display:none;flex-direction:column;overflow:hidden;
  background:#0b1220;color:#e7ecf5;border:1px solid rgba(255,255,255,.1);border-radius:18px;
  box-shadow:0 24px 70px rgba(0,0,0,.55);font-family:var(--f-body,system-ui),sans-serif}
.moya-panel.open{display:flex;animation:moya-in .18s ease}
@keyframes moya-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
.moya-head{display:flex;align-items:center;gap:10px;padding:14px 16px;background:rgba(0,229,160,.08);
  border-bottom:1px solid rgba(255,255,255,.08)}
.moya-head .dot{width:30px;height:30px;border-radius:9px;background:var(--c-teal,#00e5a0);display:grid;place-items:center;color:#030712;font-weight:800}
.moya-head b{font-size:.98rem}.moya-head small{display:block;color:#8da2c0;font-size:.74rem}
.moya-x{margin-left:auto;background:none;border:none;color:#8da2c0;font-size:1.3rem;cursor:pointer;line-height:1}
.moya-body{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px}
.moya-msg{max-width:85%;padding:10px 13px;border-radius:14px;font-size:.9rem;line-height:1.45;white-space:pre-wrap;word-wrap:break-word}
.moya-msg.user{align-self:flex-end;background:var(--c-teal,#00e5a0);color:#041014;border-bottom-right-radius:4px}
.moya-msg.bot{align-self:flex-start;background:rgba(255,255,255,.06);border-bottom-left-radius:4px}
.moya-card{align-self:stretch;background:rgba(0,229,160,.07);border:1px solid rgba(0,229,160,.25);border-radius:14px;padding:13px}
.moya-card h4{margin:0 0 4px;font-size:.95rem}.moya-card p{margin:0;color:#aab8d0;font-size:.83rem;line-height:1.45}
.moya-bar{height:7px;border-radius:99px;background:rgba(255,255,255,.1);margin:10px 0 4px;overflow:hidden}
.moya-bar i{display:block;height:100%;background:var(--c-teal,#00e5a0)}
.moya-chips{display:flex;flex-wrap:wrap;gap:7px;margin-top:10px}
.moya-chip{padding:7px 12px;border-radius:999px;border:1px solid rgba(0,229,160,.4);background:transparent;
  color:var(--c-teal,#00e5a0);font-weight:600;font-size:.8rem;cursor:pointer;transition:background .12s}
.moya-chip:hover{background:rgba(0,229,160,.12)}
.moya-foot{display:flex;gap:8px;padding:12px;border-top:1px solid rgba(255,255,255,.08)}
.moya-foot input{flex:1;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:12px;
  padding:10px 12px;color:#e7ecf5;font-size:.9rem;font-family:inherit;outline:none}
.moya-foot input:focus{border-color:var(--c-teal,#00e5a0)}
.moya-foot button{background:var(--c-teal,#00e5a0);border:none;border-radius:12px;padding:0 15px;color:#041014;font-weight:800;cursor:pointer}
.moya-foot button:disabled{opacity:.5;cursor:default}
.moya-typing{align-self:flex-start;color:#8da2c0;font-size:.85rem;padding:4px 6px}
`;

// ── State ─────────────────────────────────────────────────────────────
let panel, body, input, sendBtn, history = [];

function addMsg(role, text) {
  const m = el('div', { className: `moya-msg ${role === 'user' ? 'user' : 'bot'}` });
  m.textContent = text;
  body.append(m);
  body.scrollTop = body.scrollHeight;
  return m;
}

function chips(items) {
  const wrap = el('div', { className: 'moya-chips' });
  for (const [label, fn] of items) {
    const c = el('button', { className: 'moya-chip', textContent: label });
    c.onclick = fn;
    wrap.append(c);
  }
  body.append(wrap);
  body.scrollTop = body.scrollHeight;
}

// ── The deterministic "welcome back" card (no LLM required) ────────────
async function showWelcome() {
  body.replaceChildren();
  const state = await MoyaMCP.getLearnerState();
  const card = el('div', { className: 'moya-card' });

  if (state.allDone && state.completedCount > 0) {
    card.innerHTML = `<h4>🎓 You finished every track!</h4><p>You're a MoyaCode graduate. Want to build something in the Arcade?</p>`;
    body.append(card);
    chips([['🕹️ Open Arcade', () => (location.href = '/arcade')]]);
  } else if (state.completedCount > 0 && state.nextCourse) {
    const pct = Math.round((state.completedCount / state.totalCourses) * 100);
    card.innerHTML =
      `<h4>👋 Welcome back!</h4>` +
      `<p>You've completed <b>${state.completedCount}/${state.totalCourses}</b> tracks` +
      `${state.totalXp ? ` · <b>${state.totalXp} XP</b>` : ''}. ` +
      `Next up: <b>${esc(state.nextCourse.label)}</b>${state.nextCourse.teacher ? ` with ${esc(state.nextCourse.teacher)}` : ''}.</p>` +
      `<div class="moya-bar"><i style="width:${pct}%"></i></div>`;
    body.append(card);
    chips([
      ['▶ Continue learning', () => MoyaMCP.call('resume_learning')],
      ['🧭 What should I learn next?', () => ask("What should I learn next?")],
      ['📊 My progress', () => ask('Show my progress')],
    ]);
  } else {
    const nm = state.nextCourse ? esc(state.nextCourse.label) : 'JSS1 — Scratch Basics';
    card.innerHTML =
      `<h4>👋 Hi, I'm Moya</h4>` +
      `<p>Your coding guide. ${state.signedIn ? "Let's pick up your journey." : "Start your journey — I'll remember where you reach."} First stop: <b>${nm}</b>.</p>`;
    body.append(card);
    chips([
      ['🚀 Start learning', () => MoyaMCP.call('resume_learning')],
      ['❓ How does MoyaCode work?', () => ask('How does MoyaCode work?')],
    ]);
  }
}

// ── Agent loop: chat → Claude relay → execute tools → repeat ───────────
async function ask(text) {
  addMsg('user', text);
  history.push({ role: 'user', content: text });
  input.value = '';
  sendBtn.disabled = true;

  const typing = el('div', { className: 'moya-typing', textContent: 'Moya is thinking…' });
  body.append(typing);
  body.scrollTop = body.scrollHeight;

  try {
    for (let hop = 0; hop < 6; hop++) {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ system: SYSTEM_PROMPT, messages: history, tools: [...MoyaMCP.tools, ...WIKI_TOOLS], model: MODEL_HINT }),
      });

      if (res.status === 503) { typing.remove(); fallback(); return; }
      if (!res.ok) throw new Error(`relay ${res.status}`);

      const data = await res.json();
      const content = data.content || [];
      history.push({ role: 'assistant', content });

      // Surface any text the model produced this hop.
      for (const block of content) {
        if (block.type === 'text' && block.text.trim()) addMsg('bot', block.text.trim());
      }

      const toolUses = content.filter(b => b.type === 'tool_use');
      if (toolUses.length === 0) break;

      const results = [];
      for (const tu of toolUses) {
        const isWiki = tu.name === 'search_wiki' || tu.name === 'read_page';
        const out = isWiki ? await runWikiTool(tu.name, tu.input) : await MoyaMCP.call(tu.name, tu.input);
        results.push({ type: 'tool_result', tool_use_id: tu.id, content: JSON.stringify(out) });
      }
      history.push({ role: 'user', content: results });
      // If a tool navigated away, the page unloads and the loop ends here.
    }
  } catch (e) {
    console.warn('[moya] chat error', e);
    addMsg('bot', "I hit a snag reaching my brain. You can still tap the buttons to continue learning.");
  } finally {
    typing.remove();
    sendBtn.disabled = false;
    input.focus();
  }
}

// Graceful path when the LLM relay isn't configured (no API key).
function fallback() {
  addMsg('bot', "Chat isn't switched on yet, but I've still got you — use these:");
  chips([
    ['▶ Continue learning', () => MoyaMCP.call('resume_learning')],
    ['📊 My progress', () => showWelcome()],
  ]);
}

// ── Mount ─────────────────────────────────────────────────────────────
function mount() {
  document.head.append(el('style', { textContent: CSS }));

  const fab = el('button', { className: 'moya-fab', title: 'Ask Moya' });
  fab.innerHTML = `<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l2.1 5.9L20 11l-5.9 2.1L12 19l-2.1-5.9L4 11l5.9-2.1L12 3z" fill="#030712"/></svg> Ask Moya`;

  panel = el('div', { className: 'moya-panel' });
  panel.innerHTML = `
    <div class="moya-head">
      <span class="dot">M</span>
      <div><b>Moya</b><small>Your coding guide</small></div>
      <button class="moya-x" aria-label="Close">×</button>
    </div>
    <div class="moya-body"></div>
    <div class="moya-foot">
      <input type="text" placeholder="Ask Moya anything…" autocomplete="off" />
      <button>➤</button>
    </div>`;

  document.body.append(fab, panel);
  body = panel.querySelector('.moya-body');
  input = panel.querySelector('.moya-foot input');
  sendBtn = panel.querySelector('.moya-foot button');

  const open = () => { panel.classList.add('open'); fab.style.display = 'none'; if (!body.childElementCount) showWelcome(); input.focus(); };
  const close = () => { panel.classList.remove('open'); fab.style.display = 'flex'; };

  fab.onclick = open;
  panel.querySelector('.moya-x').onclick = close;
  const send = () => { const v = input.value.trim(); if (v) ask(v); };
  sendBtn.onclick = send;
  input.onkeydown = e => { if (e.key === 'Enter') send(); };
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}
