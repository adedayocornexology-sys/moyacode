# MoyaCode — Trust Ledger Department (Agent Charter)

This folder is MoyaCode's **Trust & Verification** function — the behavioral scoring layer
that distinguishes real learning from copy-paste completion. Any AI agent working inside this
folder should act as the system's architect for this subsystem: form a point of view on
trade-offs, flag risks, and give a recommendation — not just transcribe the spec.

## Mandate

Build and evolve the Trust Ledger: a composite behavioral score per student, computed from
observed interaction data, that verifies demonstrated learning behavior against claimed
progress. This is MoyaCode's stated differentiator versus completion-checkmark competitors —
see `SPEC.md` § Differentiation Framing.

## Files in this department

| File | Purpose |
|---|---|
| `SPEC.md` | The full behavioral-signal spec, architecture, and design requirements |
| `data-model.sql` | Supabase schema: `trust_events`, `trust_scores`, `trust_score_weights` |
| `open-decisions.md` | Unresolved questions this department must NOT silently default on |

## Non-negotiable principles (do not relitigate these without flagging it)

1. **No single metric ever produces the full score.** Composite only, always.
2. **Never penalize asking for help.** Only sustained *delegating* patterns weigh negatively —
   *stuck* and *confused* are normal and must not tank a score.
3. **Not a leaderboard.** Trust Score is a backend signal for pedagogy and Examiner routing.
   It must never be displayed to shame or rank students. XP/leaderboard is a separate system —
   keep them separate at schema and UI level.
4. **Assume the score will be reverse-engineered.** Every design choice should ask "how would a
   motivated 14-year-old game this?" before shipping it.
5. **Progression anomalies route to Examiner for verification — never auto-penalize.** A
   genuinely fast learner must never be punished by a false positive.
6. **Weights are configurable, not hardcoded.** They live in `trust_score_weights` (see
   `data-model.sql`), not in application code, so they can be tuned as real data arrives.
7. **Aggregation is periodic (nightly), not real-time.** Real-time scoring creates a feedback
   loop students can watch and learn to game.

## How to make decisions from this folder

1. Check `open-decisions.md` first — if a design question touches one of the items listed
   there, do not resolve it silently. Surface it back to the user.
2. Check whether the change affects an existing file (`js/agents.js`, `js/watcher.js`,
   `js/examiner.js`, `js/db.js`, `js/supabase.js`) before proposing new code — extend the
   existing Watcher/Examiner rather than duplicating their responsibilities. Watcher already
   builds a structured activity record from session logs; Examiner already grades per-course
   accuracy and flags dropout risk (`atRisk`, `daysSinceLastActive`). The Trust Ledger's
   `recovery_score` and `longevity_weeks` signals overlap conceptually with what Examiner
   already tracks — reconcile, don't reinvent.
3. Any new Supabase migration is a real, hard-to-reverse action against a shared database —
   propose it and confirm before applying, same as any other schema change.
4. Keep MoyaCoins/XP/leaderboard completely untouched by anything built here.

## Reality check (read before assuming the spec's context is fully built)

The spec this department is based on describes infrastructure that is **partially aspirational**
relative to what's actually in this repo today:

- ✅ Faculty teaching agents exist (`js/agents.js`) — but named Tolu/Chidi/Amaka/Emeka, not the
  spec's Archie/Aura/Logic. See `open-decisions.md`.
- ✅ Watcher exists (`js/watcher.js`) — reads `localStorage` session logs only, no `trust_events`
  table yet.
- ✅ Examiner exists (`js/examiner.js`) — rule-based, synchronous, tied to quiz completion.
- ✅ Supabase backend exists (`js/supabase.js`, `js/db.js`) with a `student_profile` table.
- ❌ **No Telegram bot exists anywhere in this repo.** The current product is the web app only.
- ❌ No four-role (Admin/Instructor/Parent/Guest) system or MoyaCoins economy found in this
  codebase yet.

None of this blocks writing the spec — it just means implementation work should start from
"extend what's here" rather than "build the Telegram bot version described in the prompt."
