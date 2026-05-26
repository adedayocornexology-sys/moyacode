/**
 * js/auth.js
 * Authentication helpers for MoyaCode.
 *
 * All exports are thin wrappers around the Supabase auth API.
 * Never throw — callers check the returned `error` field.
 */

import { supabase } from './supabase.js';

// ── Session helpers ───────────────────────────────────────────

/**
 * Returns the currently active session, or null if not signed in.
 * @returns {Promise<import('@supabase/supabase-js').Session|null>}
 */
export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data?.session ?? null;
}

/**
 * Returns the authenticated user's UUID, or null.
 * @returns {Promise<string|null>}
 */
export async function getUserId() {
  const session = await getSession();
  return session?.user?.id ?? null;
}

/**
 * Guards a page behind authentication.
 * If there is no active session the browser is redirected to
 * `auth.html?next=<current href>` and null is returned.
 * Otherwise the session is returned so the caller can use it.
 *
 * @param {string} [redirectTo] - Optional override for the post-login URL.
 * @returns {Promise<import('@supabase/supabase-js').Session|null>}
 */
export async function requireAuth(redirectTo) {
  const session = await getSession();
  if (!session) {
    const next = redirectTo ?? window.location.href;
    window.location.href = `auth.html?next=${encodeURIComponent(next)}`;
    return null;
  }
  return session;
}

// ── Sign up ───────────────────────────────────────────────────

/**
 * Creates a new account and inserts a row in the `students` table.
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{user: object|null, session: object|null, error: object|null}>}
 */
export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return { user: null, session: null, error };
  }

  const user = data?.user ?? null;

  // Insert the student row so foreign keys from other tables can resolve.
  // Use upsert in case the trigger or a previous attempt already created it.
  if (user) {
    const { error: rowError } = await supabase
      .from('students')
      .upsert({ id: user.id }, { onConflict: 'id' });

    if (rowError) {
      console.warn('[auth] Could not create students row:', rowError.message);
    }
  }

  return { user, session: data?.session ?? null, error: null };
}

// ── Sign in ───────────────────────────────────────────────────

/**
 * Signs in an existing user with email + password.
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{user: object|null, session: object|null, error: object|null}>}
 */
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { user: null, session: null, error };
  }

  return {
    user:    data?.user    ?? null,
    session: data?.session ?? null,
    error:   null,
  };
}

// ── Password reset ────────────────────────────────────────────

/**
 * Sends a password-reset email. The link redirects to reset-password.html.
 *
 * @param {string} email
 * @returns {Promise<{error: object|null}>}
 */
export async function resetPassword(email) {
  const redirectTo = window.location.href
    .split('?')[0]
    .replace(/auth\.html$/, 'reset-password.html');

  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
  return { error: error ?? null };
}

/**
 * Sets a new password for the currently-authenticated recovery session.
 * Call this only from reset-password.html after the PASSWORD_RECOVERY event.
 *
 * @param {string} newPassword
 * @returns {Promise<{error: object|null}>}
 */
export async function updatePassword(newPassword) {
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  return { error: error ?? null };
}

// ── Sign out ──────────────────────────────────────────────────

/**
 * Signs the current user out and redirects to auth.html.
 */
export async function signOut() {
  await supabase.auth.signOut();
  window.location.href = 'auth.html';
}

// ── Auth state change ─────────────────────────────────────────

/**
 * Subscribes to auth state changes (SIGNED_IN, SIGNED_OUT, etc.).
 *
 * @param {(event: string, session: object|null) => void} cb
 * @returns {import('@supabase/supabase-js').Subscription}
 */
export function onAuthChange(cb) {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    cb(event, session);
  });
  return data?.subscription;
}
