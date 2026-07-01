# MoyaCode Trust Ledger — Behavioral Verification & Scoring System

## Context

MoyaCode is an AI coding education platform with a planned four-role system
(Admin/Instructor/Parent/Guest), a MoyaCoins economy, and a multi-agent Faculty architecture:
teaching agents, a Watcher agent (log-driven summaries), an Examiner agent (independent
grading), and an Administrator seat (human-first).

> See `CLAUDE.md` in this folder for how this maps to what's actually built in the repo today —
> the Faculty/Watcher/Examiner concept already exists in `js/agents.js`, `js/watcher.js`, and
> `js/examiner.js`, though not yet in the Telegram-bot/Supabase-events form described below.

This spec adds a **Trust Ledger**: a behavioral scoring layer that verifies whether a student's
demonstrated learning behavior matches their claimed progress — the same underlying pattern as
a credit-scoring ledger (verify real activity, not self-reported activity), applied to learning
instead of commerce.

## Core Principle

Just as a teacher doesn't grade on one test, this ledger should never score on one metric.
Behavioral signals are combined into a composite Trust Score because any single metric can be
gamed (e.g., a student who copies working code once looks "good" on a single completion check
but has no underlying skill).

## What Gets Measured (Behavioral Signals, Not Self-Reports)

Each signal must come from **observed interaction data**, never from a student's self-declared
confidence or completion claim.

1. **Consistency** — session frequency and regularity over time (daily/weekly login and
   practice cadence), not just total hours logged.
2. **Independence Score** — derived from a three-intent classifier:
   - *Stuck* → full hint given, weighted as low-independence signal
   - *Confused* → Socratic half-cost hint, weighted as medium-independence signal
   - *Delegating* (asking the bot to just do the work) → free in-character refusal, weighted
     as a red flag signal if frequent
3. **Recovery behavior** — how a student responds after failing a challenge or exercise: do
   they retry and progress, or abandon and never return to that topic?
4. **Progression integrity** — does time-to-completion for later, harder challenges scale
   sensibly relative to earlier ones? A sudden implausible jump (very hard challenge solved in
   seconds after struggling with easy ones) is a signal worth flagging, not necessarily
   penalizing — it should route to Examiner for independent verification.
5. **Repeat engagement depth** — does the student revisit prior concepts unprompted (indicates
   internalization), or only ever move forward once (indicates shallow completion)?
6. **Longevity** — how long has the current behavioral pattern held? One good week means far
   less than eight consistent weeks.

## Explicit Non-Goals / Guardrails

- **Not a public-shaming leaderboard.** Trust Score is a backend signal for MoyaBot pedagogy
  and Examiner routing — not a number displayed to shame low scorers. Leaderboard/XP/rank
  already exists separately and must stay separate.
- **Do not penalize asking for help.** *Confused* and even *Stuck* signals are normal learning
  behavior and should not tank a score — only sustained *Delegating* patterns (skipping the
  struggle every time) should weigh negatively.
- **Anti-gaming design required.** Once students learn a score exists, some will behave to game
  it (e.g., artificially spacing out logins, or asking a "confused" question they already know
  the answer to just to look independent). Assume the score itself will be reverse-engineered
  by users.
- **No single metric ever produces the full score.** Composite scoring only.
- **Data portability/ownership consideration.** If a student or family leaves the platform,
  whether their Trust Score history is exportable/portable or stays MoyaCode-internal must be
  decided explicitly — see `open-decisions.md`. Do not default to lock-in silently.

## Architecture Integration

```
Student interaction (Telegram bot)
        ↓
Intent Classifier (Stuck / Confused / Delegating) — already scoped
        ↓
Watcher Agent — logs raw behavioral events (existing agent, log-driven summaries)
        ↓
Trust Ledger Engine (NEW) — aggregates raw events into the 6 signals above,
                             computes composite Trust Score per student
        ↓
   ┌────────────┬─────────────────┬──────────────────┐
Examiner Agent   MoyaBot pedagogy   Administrator view
(routes flagged  (adjusts hint      (human-first,
 progression      generosity per    read-only insight
 for verification) trust tier)      into class trends)
```

## Design Requirements

1. Build `trust_events` logging as a passive side-effect of existing bot interactions — do not
   require any new explicit student action to generate data.
2. Build the aggregation job (`trust_scores` computation) as a scheduled job (Supabase Edge
   Function or cron), not real-time — recompute nightly or on a defined cadence, not on every
   event, to avoid score volatility and gaming feedback loops.
3. Make each of the 6 sub-scores independently inspectable (for Administrator view and for
   debugging) — never collapse straight to composite without retaining the components.
4. Composite score formula should be a **documented, adjustable weighted average** (not a
   black-box ML model at this stage) — weights live in a config table (`trust_score_weights`,
   see `data-model.sql`), not hardcoded, so they can be tuned as real data comes in.
5. Any progression-integrity anomaly (signal #4) routes to the Examiner agent for independent
   verification rather than auto-penalizing the score — false positives (a genuinely fast
   learner) must not be punished by the system.
6. Keep this entirely separate from the existing MoyaCoins/XP/leaderboard gamification system
   at the schema and UI level — Trust Score is a pedagogy/verification signal, not a
   competitive game mechanic.

## Differentiation Framing (for pitch materials)

**"Our AI doesn't just teach kids to code — it verifies they actually learned it."**

Other coding platforms measure completion. MoyaCode measures behavior — the same principle
credit bureaus use to tell a real business from a paper one, applied to tell real learning from
copy-paste completion. This is the evidence layer behind every MoyaCode certificate or progress
report to a parent, school, or sponsor ("Sponsor a Builder" backers can eventually see verified
progress, not just claimed progress).
