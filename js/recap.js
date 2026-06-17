// recap.js — MoyaCode Recap engine.
// Fires at session end; calls the Watcher prompt on Claude Haiku, then
// injects a student-facing card into the end screen and persists the row.

const LOCAL_KEY = 'moyacode_last_recap';

// ── Intent classification ─────────────────────────────────────────────────────
// Maps quiz session entries (from script.js scoreEntry) to the three-intent
// taxonomy the Watcher understands.
//
// Quiz mode mapping:
//   STUCK      = used a hint on this question (asked for help legitimately)
//   CONFUSED   = wrong answer, no hint (attempted without asking for help)
//   DELEGATING = 0 in quiz mode; incremented by the Telegram MoyaBot later

function computeIntentCounts(sessionLog) {
  let stuck = 0, confused = 0, delegating = 0;
  for (const entry of sessionLog) {
    if (entry.hintUsed)        stuck++;
    else if (!entry.isCorrect) confused++;
  }
  return { stuck, confused, delegating };
}

// independence_score = (stuck + confused) / (stuck + confused + delegating)
// A score near 1.0 = student wrestled honestly with the material.
function computeIndependenceScore({ stuck, confused, delegating }) {
  const denom = stuck + confused + delegating;
  if (denom === 0) return 1.0;
  return parseFloat(((stuck + confused) / denom).toFixed(2));
}

// ── API call ──────────────────────────────────────────────────────────────────
async function fetchRecap(sessionLog, profile, classKey) {
  const res = await fetch('/api/recap', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session_log: sessionLog, profile, class_key: classKey }),
  });
  if (!res.ok) throw new Error(`recap ${res.status}`);
  return res.json();
}

// ── Card rendering ────────────────────────────────────────────────────────────
function esc(str) {
  return String(str || '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[c]);
}

function getOrCreateCard() {
  let card = document.getElementById('moya-recap-card');
  if (!card) {
    card = document.createElement('div');
    card.id = 'moya-recap-card';
    card.className = 'moya-recap-card';
    const actions = document.getElementById('end-actions');
    if (actions) actions.insertAdjacentElement('afterend', card);
    else document.getElementById('end-screen')?.appendChild(card);
  }
  return card;
}

function showLoading() {
  const card = getOrCreateCard();
  card.innerHTML = `
    <div class="recap-loading">
      <span class="recap-spinner" aria-hidden="true">⏳</span>
      <p>Generating your session recap…</p>
    </div>`;
}

function showRecap(recapData, independenceScore) {
  const card = getOrCreateCard();
  const s     = recapData.student_summary || {};
  const pct   = Math.round(independenceScore * 100);

  card.innerHTML = `
    <div class="recap-header">
      <span class="recap-icon" aria-hidden="true">📋</span>
      <h3 class="recap-title">Your Session Recap</h3>
    </div>
    <div class="recap-body">
      <div class="recap-item">
        <span class="recap-label">What you built</span>
        <p class="recap-text">${esc(s.built)}</p>
      </div>
      <div class="recap-item">
        <span class="recap-label">What clicked</span>
        <p class="recap-text">${esc(s.clicked)}</p>
      </div>
      <div class="recap-item">
        <span class="recap-label">One thing to practice</span>
        <p class="recap-text">${esc(s.practice_one)}</p>
      </div>
      ${s.next_quest ? `
      <div class="recap-item">
        <span class="recap-label">Your next quest</span>
        <p class="recap-text">${esc(s.next_quest)}</p>
      </div>` : ''}
      <div class="recap-score">
        <span class="score-label">Independence Score</span>
        <span class="score-value">${pct}%</span>
        <span class="score-desc">You did the work yourself.</span>
      </div>
    </div>`;
}

// ── Public API ────────────────────────────────────────────────────────────────
export async function generate(classKey, sessionLog, profile) {
  if (!sessionLog || sessionLog.length === 0) return;

  showLoading();

  const intentCounts      = computeIntentCounts(sessionLog);
  const independenceScore = computeIndependenceScore(intentCounts);

  try {
    const apiResult = await fetchRecap(sessionLog, profile, classKey);

    // Merge intent_counts: API may add delegating from Telegram in the future
    const merged = {
      stuck:      (apiResult.intent_counts?.stuck      ?? 0) || intentCounts.stuck,
      confused:   (apiResult.intent_counts?.confused   ?? 0) || intentCounts.confused,
      delegating: (apiResult.intent_counts?.delegating ?? 0) || intentCounts.delegating,
    };
    const finalScore = computeIndependenceScore(merged);

    showRecap(apiResult, finalScore);

    const recapRow = {
      session_id:        crypto.randomUUID(),
      class_key:         classKey,
      student_summary:   apiResult.student_summary,
      teacher_summary:   apiResult.teacher_summary,
      concepts_covered:  apiResult.concepts_covered || [],
      independence_score: finalScore,
      model_used:        'claude-haiku',
      generated_at:      new Date().toISOString(),
    };

    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(recapRow));
    } catch {}

    window.MOYADB?.saveRecap(recapRow);

  } catch (err) {
    console.warn('[recap] generation failed:', err.message);
    const card = document.getElementById('moya-recap-card');
    if (card) card.remove();
  }
}
