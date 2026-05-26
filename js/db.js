/**
 * js/db.js
 * Data-access layer for MoyaCode.
 *
 * All functions are fire-and-forget safe: they log errors to the
 * console but never throw, so UI code never needs try/catch.
 */

import { supabase } from './supabase.js';

// ── Profile ───────────────────────────────────────────────────

/**
 * Upserts the student's onboarding profile.
 *
 * @param {string} userId
 * @param {{ dream: string, motivation: string, goal: string }} profile
 */
export async function saveProfile(userId, { dream, motivation, goal }) {
  const { error } = await supabase
    .from('student_profile')
    .upsert(
      { student_id: userId, dream, motivation, goal, updated_at: new Date().toISOString() },
      { onConflict: 'student_id' }
    );

  if (error) {
    console.warn('[db] saveProfile error:', error.message);
  }
}

/**
 * Loads the student's onboarding profile.
 *
 * @param {string} userId
 * @returns {Promise<{dream?: string, motivation?: string, goal?: string}>}
 */
export async function loadProfile(userId) {
  const { data, error } = await supabase
    .from('student_profile')
    .select('dream, motivation, goal')
    .eq('student_id', userId)
    .maybeSingle();

  if (error) {
    console.warn('[db] loadProfile error:', error.message);
    return {};
  }

  return data ?? {};
}

// ── Progress ──────────────────────────────────────────────────

/**
 * Marks a course as complete and records the student's final score/XP.
 *
 * @param {string} userId
 * @param {string} classKey  e.g. 'jss1', 'ss2'
 * @param {{ score: number, xp: number }} stats
 */
export async function markCourseComplete(userId, classKey, { score = 0, xp = 0 } = {}) {
  const { error } = await supabase
    .from('student_progress')
    .upsert(
      {
        student_id: userId,
        class_key:  classKey,
        completed:  true,
        score,
        xp,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'student_id,class_key' }
    );

  if (error) {
    console.warn('[db] markCourseComplete error:', error.message);
  }
}

/**
 * Loads all progress rows for a student.
 *
 * @param {string} userId
 * @returns {Promise<Array<{class_key: string, completed: boolean, score: number, xp: number}>>}
 */
export async function loadProgress(userId) {
  const { data, error } = await supabase
    .from('student_progress')
    .select('class_key, completed, score, xp, updated_at')
    .eq('student_id', userId);

  if (error) {
    console.warn('[db] loadProgress error:', error.message);
    return [];
  }

  return data ?? [];
}

// ── Answer events ─────────────────────────────────────────────

/**
 * Inserts a single answer event (fire-and-forget).
 *
 * @param {string} userId
 * @param {{ classKey: string, questionId: number, isCorrect: boolean, xpAwarded: number }} evt
 */
export async function logAnswerEvent(userId, { classKey, questionId, isCorrect, xpAwarded = 0 }) {
  const { error } = await supabase
    .from('answer_events')
    .insert({
      student_id:  userId,
      class_key:   classKey,
      question_id: questionId,
      is_correct:  isCorrect,
      xp_awarded:  xpAwarded,
    });

  if (error) {
    console.warn('[db] logAnswerEvent error:', error.message);
  }
}

// ── Handoff events ────────────────────────────────────────────

/**
 * Inserts a handoff event (agent-to-agent course transition).
 *
 * @param {string} userId
 * @param {{ fromCourse: string, toCourse: string, fromAgent: string, toAgent: string }} evt
 */
export async function logHandoffEvent(userId, { fromCourse, toCourse, fromAgent, toAgent }) {
  const { error } = await supabase
    .from('handoff_events')
    .insert({
      student_id:  userId,
      from_course: fromCourse,
      to_course:   toCourse,
      from_agent:  fromAgent,
      to_agent:    toAgent,
    });

  if (error) {
    console.warn('[db] logHandoffEvent error:', error.message);
  }
}

// ── Watcher / activity record ─────────────────────────────────

/**
 * Loads all activity data for a student in parallel.
 *
 * @param {string} userId
 * @returns {Promise<{
 *   profile:  object,
 *   progress: Array,
 *   answers:  Array,
 *   handoffs: Array,
 * }>}
 */
export async function loadActivityRecord(userId) {
  const [profileRes, progressRes, answersRes, handoffsRes] = await Promise.all([
    supabase
      .from('student_profile')
      .select('*')
      .eq('student_id', userId)
      .maybeSingle(),

    supabase
      .from('student_progress')
      .select('*')
      .eq('student_id', userId),

    supabase
      .from('answer_events')
      .select('*')
      .eq('student_id', userId)
      .order('created_at', { ascending: false }),

    supabase
      .from('handoff_events')
      .select('*')
      .eq('student_id', userId)
      .order('created_at', { ascending: false }),
  ]);

  if (profileRes.error)  console.warn('[db] loadActivityRecord profile error:',  profileRes.error.message);
  if (progressRes.error) console.warn('[db] loadActivityRecord progress error:', progressRes.error.message);
  if (answersRes.error)  console.warn('[db] loadActivityRecord answers error:',  answersRes.error.message);
  if (handoffsRes.error) console.warn('[db] loadActivityRecord handoffs error:', handoffsRes.error.message);

  return {
    profile:  profileRes.data  ?? {},
    progress: progressRes.data ?? [],
    answers:  answersRes.data  ?? [],
    handoffs: handoffsRes.data ?? [],
  };
}

// ── localStorage migration ────────────────────────────────────

/**
 * One-time migration of localStorage data into the database.
 * Safe to call on every sign-in; it is a no-op after the first run.
 *
 * @param {string} userId
 */
export async function migrateLocalStorage(userId) {
  const migrationKey = `moyacode_migrated_${userId}`;
  if (localStorage.getItem(migrationKey) === 'true') return;

  try {
    // 1. Onboarding profile
    const dream      = localStorage.getItem('moyacode_dream')      ?? '';
    const motivation = localStorage.getItem('moyacode_motivation') ?? '';
    const goal       = localStorage.getItem('moyacode_goal')       ?? '';

    if (dream || motivation || goal) {
      await saveProfile(userId, { dream, motivation, goal });
    }

    // 2. Course progress
    // Scan all localStorage keys that look like moyacode_progress_<classKey>
    const progressKeys = Object.keys(localStorage).filter(k =>
      k.startsWith('moyacode_progress_')
    );

    for (const key of progressKeys) {
      try {
        const classKey = key.replace('moyacode_progress_', '');
        const raw      = localStorage.getItem(key);
        if (!raw) continue;

        let payload;
        try { payload = JSON.parse(raw); } catch { payload = {}; }

        // Accept both boolean flags and richer objects
        const completed = payload === true || payload?.completed === true;
        if (!completed) continue;

        await markCourseComplete(userId, classKey, {
          score: payload?.score ?? 0,
          xp:    payload?.xp    ?? 0,
        });
      } catch (e) {
        console.warn('[db] migrate progress key error:', e);
      }
    }

    // 3. Session log → answer_events
    const sessionLogRaw = localStorage.getItem('moyacode_session_log');
    if (sessionLogRaw) {
      let log;
      try { log = JSON.parse(sessionLogRaw); } catch { log = []; }

      if (Array.isArray(log)) {
        for (const entry of log) {
          try {
            await logAnswerEvent(userId, {
              classKey:   entry.classKey   ?? entry.class_key   ?? '',
              questionId: entry.questionId ?? entry.question_id ?? 0,
              isCorrect:  entry.isCorrect  ?? entry.is_correct  ?? false,
              xpAwarded:  entry.xpAwarded  ?? entry.xp_awarded  ?? 0,
            });
          } catch (e) {
            console.warn('[db] migrate answer_event entry error:', e);
          }
        }
      }
    }

    // 4. Handoff events
    const handoffsRaw = localStorage.getItem('moyacode_handoffs');
    if (handoffsRaw) {
      let handoffs;
      try { handoffs = JSON.parse(handoffsRaw); } catch { handoffs = []; }

      if (Array.isArray(handoffs)) {
        for (const h of handoffs) {
          try {
            await logHandoffEvent(userId, {
              fromCourse: h.fromCourse ?? h.from_course ?? '',
              toCourse:   h.toCourse   ?? h.to_course   ?? '',
              fromAgent:  h.fromAgent  ?? h.from_agent  ?? '',
              toAgent:    h.toAgent    ?? h.to_agent    ?? '',
            });
          } catch (e) {
            console.warn('[db] migrate handoff_event entry error:', e);
          }
        }
      }
    }

    // Mark done so we never run this twice for the same user.
    localStorage.setItem(migrationKey, 'true');
    console.info('[db] localStorage migration complete for user:', userId);

  } catch (err) {
    console.warn('[db] migrateLocalStorage unexpected error:', err);
    // Do NOT set the migration flag — allow retry on next sign-in.
  }
}
