# MoyaCode Agent Guide (Architecture, Workflow, and Auth Plan)

This document is the "operating manual" for AI agents (Claude/Codex/etc.) working on this codebase.

## 1) What this project is

MoyaCode is currently a **static frontend application** (plain HTML/CSS/JS) for coding education quests.
There is no backend and no real authentication yet.

## 2) File map (what each file does)

### Core pages
- `index.html` — Marketing/landing page and entrypoint. Uses heavy inline styles and links users to onboarding and quiz pages.
- `welcome.html` — Intro page that starts onboarding.
- `discovery.html` — Onboarding step: student selects learning dream; writes `moyacode_dream` to `localStorage`.
- `motivation.html` — Onboarding step: student selects motivation; writes `moyacode_motivation`.
- `goals.html` — Onboarding step: student selects goal; writes `moyacode_goal`.
- `selection.html` — Quest/class selection page; clicking a class routes to `loading.html?class=<key>`.
- `loading.html` — Transitional loading/tips page; reads class from query params and redirects to `quiz.html?class=<key>&returnTo=<...>`.
- `quiz.html` — Main quiz UI shell (DOM containers + includes `script.js`).
- `lesson.html` — Separate static learning/lesson page.

### JavaScript
- `script.js` — **Primary quiz engine** currently used by `quiz.html`.
  - Contains question banks (`QUIZ_BANKS`) for jss1 → ss3.
  - Handles state, rendering, answer checking, XP/lives/streak, feedback drawer, end screen, and progress logging.
  - Reads onboarding profile keys from `localStorage`.
- `quiz.js` — Legacy/alternate quiz engine (chip-assembly style). Not loaded by `quiz.html` right now.
- `js/score-tracker.js` — Utility module for appending/fetching session log in `localStorage`; currently not wired into `script.js`.

### Styles
- `tokens.css` — Global design tokens (colors, spacing, typography, radii, timings).
- `css/tokens.css` — Thin wrapper importing root `tokens.css`.
- `components.css` — Shared component/system styles across internal pages.
- `quiz-styles.css` — Quiz-specific visual states (selected/correct/wrong/locked, drawer themes, end screen stats).

## 3) How files connect (runtime interactions)

### User flow graph
1. `index.html` → `welcome.html`
2. `welcome.html` → `discovery.html`
3. `discovery.html` (save dream) → `motivation.html`
4. `motivation.html` (save motivation) → `goals.html`
5. `goals.html` (save goal) → `selection.html`
6. `selection.html` → `loading.html?class=...`
7. `loading.html` → `lesson.html?class=...&returnTo=...`
8. `lesson.html` loads `lessons.js` and runs the lesson engine per class.
9. `lesson.html` launches `quiz.html?class=...&returnTo=...`
10. `quiz.html` loads `script.js`, which reads params + profile + quiz bank and runs the session.

### Data flow today (all client-side)
- Storage keys used for profile:
  - `moyacode_dream`
  - `moyacode_motivation`
  - `moyacode_goal`
- Progress/session keys used by quiz logic:
  - `moyacode_progress_<classKey>`
  - `moyacode_session_log`
- No server sync; all values are browser-local and device-specific.

## 4) Current auth status

There is **no authentication process implemented** yet:
- No signup/signin pages
- No password/social login
- No server-issued sessions or tokens
- No student identity model
- No per-user cloud persistence

Consequence: "accounts" do not exist yet; progress is only tied to one browser's localStorage.

## 5) Recommended authentication workflow (practical MVP)

### Goal
Support student accounts while preserving the existing static UX flow as much as possible.

### Recommended stack options
- **Option A (fastest): Supabase Auth + Postgres**
- **Option B: Firebase Auth + Firestore**
- **Option C: Custom Node/Express + JWT + DB**

For speed and low backend effort, Option A is best.

### Proposed auth journey
1. Student visits `welcome.html`.
2. Before entering quests, student can:
   - Sign up (email/password or Google)
   - Sign in
   - Continue as guest (optional)
3. After login success:
   - create/read profile row (`students` table)
   - load saved onboarding + progress from DB
   - hydrate UI state
4. During quiz:
   - write answer events and XP updates to DB (debounced/batched)
5. On completion:
   - update streak/progress/leaderboard metrics
6. On next login from any device:
   - restore data from DB, not localStorage

### Minimal backend data model
- `students`
  - `id` (auth uid)
  - `full_name` (optional)
  - `school` (optional)
  - `created_at`
- `student_profile`
  - `student_id`
  - `dream`, `motivation`, `goal`
- `student_progress`
  - `student_id`, `class_key`, `score`, `xp`, `completed`, `updated_at`
- `answer_events` (optional analytics)
  - `student_id`, `question_id`, `class_key`, `is_correct`, `xp_awarded`, `created_at`

## 6) Migration plan (localStorage -> real accounts)

1. Add auth UI and session guard helper.
2. Keep localStorage reads for backward compatibility.
3. On first authenticated session, migrate local data to DB once.
4. Switch reads to DB-first; keep local as cache/fallback.
5. Remove duplicate/legacy logic once stable (`quiz.js`, optional `js/score-tracker.js` integration cleanup).

## 7) Engineering workflow to follow for future changes

1. **Define user state first** (guest vs authenticated).
2. **Define source of truth** (DB first, local cache second).
3. **Keep page contracts stable** (URL params and local keys while migrating).
4. **Use one quiz engine only** (`script.js`) and remove/merge legacy paths.
5. **Instrument events** (quiz start, answer, complete, streak updates).
6. **Document any new key/schema** inside this file immediately.

## 8) Immediate TODOs (high impact)

- [ ] Add `auth.html` (or modal) for sign-in/sign-up.
- [ ] Add `auth.js` session module (`getSession`, `requireAuth`, `signOut`).
- [ ] Gate `selection.html` and `quiz.html` behind auth (or explicit guest mode).
- [ ] Persist onboarding/profile to backend.
- [ ] Persist progress and session log to backend.
- [ ] Unify score tracking (`script.js` with `js/score-tracker.js` or remove one).

## 9) Notes for AI collaborators

- Treat `script.js` as the canonical game logic unless refactor says otherwise.
- Prefer incremental changes with backward compatibility for existing localStorage users.
- If introducing backend calls, isolate them in a tiny data-access module to avoid mixing fetch logic into UI rendering code.
