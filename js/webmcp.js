/**
 * js/webmcp.js — MoyaCode's WebMCP agentic layer.
 *
 * Turns MoyaCode's learner capabilities into callable tools, backed by the
 * student's persisted memory (Supabase via db.js when signed in, localStorage
 * for guests). These tools are what make the site "remember" a student and
 * let them say things like "continue where I left off".
 *
 * Two consumers, one tool set:
 *   1. Browser-native AI agents — registered via navigator.modelContext
 *      (the emerging WebMCP API) when the browser supports it.
 *   2. Our own in-page assistant (js/assistant.js) and any script —
 *      via window.MoyaMCP.
 */

import { getUserId } from './auth.js';
import { loadProfile, loadProgress, saveProfile } from './db.js';
import { getAgentForCourse } from './agents.js';

// Curriculum order + friendly labels. Keys match script.js / agents.js.
export const COURSES = [
  { key: 'jss1', label: 'JSS1 — Scratch Basics' },
  { key: 'jss2', label: 'JSS2 — Scratch Projects' },
  { key: 'jss3', label: 'JSS3 — HTML Foundations' },
  { key: 'ss1',  label: 'SS1 — Building Web Pages' },
  { key: 'ss2',  label: 'SS2 — CSS Styling' },
  { key: 'ss3',  label: 'SS3 — JavaScript' },
];

const COURSE_LABEL = Object.fromEntries(COURSES.map(c => [c.key, c.label]));

// ── Memory read (the heart of "remember me") ──────────────────────────

/** Reads progress rows for a guest from localStorage, mirroring db.js keys. */
function readGuestProgress() {
  return COURSES.map(c => {
    const raw = localStorage.getItem(`moyacode_progress_${c.key}`);
    let completed = false, score = 0, xp = 0;
    if (raw) {
      try {
        const p = JSON.parse(raw);
        completed = p === true || p?.completed === true;
        score = Number(p?.score) || 0;
        xp = Number(p?.xp) || 0;
      } catch {
        completed = raw === 'true';
      }
    }
    return { class_key: c.key, completed, score, xp };
  });
}

/**
 * The student's full learning memory: who they are, what they've done,
 * and what comes next. Works signed-in (DB) or as a guest (localStorage).
 */
export async function getLearnerState() {
  const userId = await getUserId();

  let profile = {};
  let progressRows = [];

  if (userId) {
    [profile, progressRows] = await Promise.all([
      loadProfile(userId),
      loadProgress(userId),
    ]);
  } else {
    profile = {
      dream: localStorage.getItem('moyacode_dream') || '',
      motivation: localStorage.getItem('moyacode_motivation') || '',
      goal: localStorage.getItem('moyacode_goal') || '',
    };
    progressRows = readGuestProgress();
  }

  const byKey = Object.fromEntries((progressRows || []).map(r => [r.class_key, r]));

  const courses = COURSES.map(c => {
    const r = byKey[c.key] || {};
    const agent = getAgentForCourse(c.key);
    return {
      key: c.key,
      label: c.label,
      teacher: agent ? `${agent.emoji} ${agent.name} — ${agent.role}` : null,
      completed: !!r.completed,
      score: r.score || 0,
      xp: r.xp || 0,
    };
  });

  const nextCourse = courses.find(c => !c.completed) || null;

  return {
    signedIn: !!userId,
    profile: {
      dream: profile?.dream || '',
      motivation: profile?.motivation || '',
      goal: profile?.goal || '',
    },
    courses,
    nextCourse,
    completedCount: courses.filter(c => c.completed).length,
    totalCourses: courses.length,
    totalXp: courses.reduce((s, c) => s + c.xp, 0),
    allDone: !nextCourse,
  };
}

// ── Navigation helper ─────────────────────────────────────────────────
function go(url) {
  window.location.href = url;
}

// ── Tool definitions (Anthropic tool-schema shape + a handler) ────────

export const TOOLS = [
  {
    name: 'get_learner_state',
    description:
      "Read the student's saved learning memory: their dream/goal, every course with completion status and XP, and which course comes next. Call this before answering anything about the student's progress — never guess.",
    input_schema: { type: 'object', properties: {}, additionalProperties: false },
    handler: async () => getLearnerState(),
  },
  {
    name: 'resume_learning',
    description:
      "Take the student straight back to where they left off — the first course they have not yet completed. Use this for 'continue', 'resume', 'keep going'. This navigates the page.",
    input_schema: { type: 'object', properties: {}, additionalProperties: false },
    handler: async () => {
      const state = await getLearnerState();
      if (state.allDone) {
        return { navigated: false, message: 'All courses are complete. The student is a MoyaCode graduate.' };
      }
      const key = state.nextCourse.key;
      go(`loading.html?class=${encodeURIComponent(key)}`);
      return { navigated: true, course: key, label: COURSE_LABEL[key] };
    },
  },
  {
    name: 'start_course',
    description:
      'Open a specific course by its key. Valid keys: jss1, jss2, jss3, ss1, ss2, ss3. This navigates the page.',
    input_schema: {
      type: 'object',
      properties: {
        class_key: { type: 'string', enum: COURSES.map(c => c.key), description: 'The course to open.' },
      },
      required: ['class_key'],
      additionalProperties: false,
    },
    handler: async ({ class_key }) => {
      if (!COURSE_LABEL[class_key]) return { error: `Unknown course: ${class_key}` };
      go(`loading.html?class=${encodeURIComponent(class_key)}`);
      return { navigated: true, course: class_key, label: COURSE_LABEL[class_key] };
    },
  },
  {
    name: 'recommend_next_step',
    description:
      "Return the single best next course for the student (data only — phrase the recommendation yourself). Bases it on what they've completed and their stated goal.",
    input_schema: { type: 'object', properties: {}, additionalProperties: false },
    handler: async () => {
      const state = await getLearnerState();
      if (state.allDone) {
        return { recommendation: null, reason: 'All courses complete — suggest the Arcade or building a project.' };
      }
      return {
        recommendation: { key: state.nextCourse.key, label: state.nextCourse.label, teacher: state.nextCourse.teacher },
        goal: state.profile.goal,
        completedCount: state.completedCount,
        totalCourses: state.totalCourses,
      };
    },
  },
  {
    name: 'list_courses',
    description: 'List every MoyaCode course in order with the student’s completion status and XP.',
    input_schema: { type: 'object', properties: {}, additionalProperties: false },
    handler: async () => {
      const state = await getLearnerState();
      return { courses: state.courses };
    },
  },
  {
    name: 'set_goal',
    description:
      "Save or update the student's learning goal to their persistent memory (used to personalise recommendations).",
    input_schema: {
      type: 'object',
      properties: { goal: { type: 'string', description: 'The student’s goal in their own words.' } },
      required: ['goal'],
      additionalProperties: false,
    },
    handler: async ({ goal }) => {
      const clean = String(goal || '').trim();
      if (!clean) return { error: 'Goal was empty.' };
      localStorage.setItem('moyacode_goal', clean);
      const userId = await getUserId();
      if (userId) {
        const current = await loadProfile(userId);
        await saveProfile(userId, {
          dream: current?.dream || localStorage.getItem('moyacode_dream') || '',
          motivation: current?.motivation || localStorage.getItem('moyacode_motivation') || '',
          goal: clean,
        });
      }
      return { saved: true, goal: clean, persisted: userId ? 'cloud' : 'device' };
    },
  },
];

// ── Register with a browser-native WebMCP agent, if present ────────────

function registerWithBrowserAgent(tools) {
  try {
    const mc = navigator.modelContext;
    if (!mc) return false;

    for (const t of tools) {
      const def = {
        name: t.name,
        description: t.description,
        inputSchema: t.input_schema,
        async execute(args) {
          const result = await t.handler(args || {});
          return { content: [{ type: 'text', text: JSON.stringify(result) }] };
        },
      };
      if (typeof mc.registerTool === 'function') mc.registerTool(def);
      else if (typeof mc.provideContext === 'function') mc.provideContext({ tools: [def] });
    }
    console.info('[webmcp] Registered', tools.length, 'tools with the browser agent.');
    return true;
  } catch (e) {
    console.warn('[webmcp] Browser-agent registration skipped:', e);
    return false;
  }
}

// ── Public surface for our own scripts (assistant.js, etc.) ───────────

const api = {
  COURSES,
  // Anthropic-shaped tool defs (no handlers) for sending to the LLM relay.
  tools: TOOLS.map(({ handler, ...def }) => def),
  getLearnerState,
  async call(name, args) {
    const t = TOOLS.find(t => t.name === name);
    if (!t) return { error: `Unknown tool: ${name}` };
    try {
      return await t.handler(args || {});
    } catch (e) {
      console.warn('[webmcp] tool error', name, e);
      return { error: String(e?.message || e) };
    }
  },
};

window.MoyaMCP = api;
registerWithBrowserAgent(TOOLS);

export default api;
