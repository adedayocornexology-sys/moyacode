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
 * The student's name/full_name is also sent as auth user metadata so it's
 * available immediately. The `students` row upsert only succeeds here when a
 * session exists (email confirmation off); otherwise the profile is persisted
 * on first sign-in via db.js `migrateLocalStorage` from the localStorage the
 * sign-up page saved.
 *
 * @param {string} email
 * @param {string} password
 * @param {{fullName?:string, classLevel?:string, school?:string, guardianEmail?:string}} [profile]
 * @returns {Promise<{user: object|null, session: object|null, error: object|null}>}
 */
export async function signUp(email, password, profile = {}) {
  const { fullName, classLevel, school, guardianEmail } = profile;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName || '' } },
  });

  if (error) {
    return { user: null, session: null, error };
  }

  const user = data?.user ?? null;

  // Insert the student row (works when a session exists, i.e. confirmation off).
  // Upsert in case a previous attempt already created it.
  if (user) {
    const row = { id: user.id };
    if (fullName)      row.full_name      = fullName;
    if (classLevel)    row.class_level    = classLevel;
    if (school)        row.school         = school;
    if (guardianEmail) row.guardian_email = guardianEmail;

    const { error: rowError } = await supabase
      .from('students')
      .upsert(row, { onConflict: 'id' });

    if (rowError) {
      // Expected when email confirmation is on (no session yet) — the profile
      // is saved from localStorage on first sign-in instead. Not fatal.
      console.warn('[auth] students row deferred to first sign-in:', rowError.message);
    }
  }

  return { user, session: data?.session ?? null, error: null };
}

// ── Google OAuth ──────────────────────────────────────────────

/**
 * Starts the Google (Gmail) sign-in flow. Redirects the browser to Google and
 * back to `redirectTo`. Requires the Google provider to be enabled in the
 * Supabase project (Auth → Providers → Google).
 *
 * @param {string} [nextUrl] - where to land after auth completes.
 * @returns {Promise<{error: object|null}>}
 */
export async function signInWithGoogle(nextUrl) {
  const base = window.location.href.split('?')[0];
  const redirectTo = nextUrl
    ? `${base}?next=${encodeURIComponent(nextUrl)}`
    : base;

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo },
  });
  return { error: error ?? null };
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
