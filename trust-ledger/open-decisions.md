# Trust Ledger — Open Decisions

These are questions the spec explicitly says must be decided on purpose, plus discrepancies
found against the actual repo. **None of these should be resolved silently by an agent working
in this folder** — surface them back to the user (or whoever owns the product decision) first.

## 1. Data portability / ownership (spec flagged this explicitly)

If a student or family leaves MoyaCode, what happens to their Trust Score history? Three
options, not yet chosen:

- **(a) Fully exportable** — student/parent can request their raw `trust_events` and
  `trust_scores` history on the way out.
- **(b) Summary-exportable only** — they get the composite score and sub-scores, but not raw
  event-level data (protects the underlying detection methodology from reverse-engineering,
  which cuts against the anti-gaming guardrail).
- **(c) MoyaCode-internal only** — nothing leaves; the ledger is a MoyaCode asset, not a
  student-portable record.

**Tension to flag explicitly:** portability (transparency, trust with parents) directly
conflicts with the anti-gaming guardrail (don't let students reverse-engineer the score). Full
export of raw events makes gaming easier for the next cohort if that data ever leaks or is
shared. A middle path — (b) — is worth considering as a starting recommendation, but this is a
product/values decision, not a technical one. **Needs an explicit answer before this ships.**

## 2. Faculty agent naming mismatch

The spec names teaching agents **Archie (HTML), Aura (CSS), Logic (JS)**. The actual code
(`js/agents.js`) names them **Tolu (Scratch), Chidi (HTML), Amaka (CSS), Emeka (JS)**, and
includes a Scratch track the spec doesn't mention at all.

Action needed: confirm which naming is canonical going forward. If the spec's naming is the
intended rebrand, `js/agents.js` needs updating (and anywhere else these names appear, e.g.
lesson content, if any). If the existing code names are canonical, update future specs/pitch
materials to match — don't let two names for the same agents drift in parallel docs.

## 3. Infrastructure reality gap

The spec's context section describes "a Telegram bot on Railway, Node.js + Supabase + Claude
Haiku" with an existing four-role system and MoyaCoins economy. As of this writing, **none of
that exists in this repo** — this is a browser-based web app (`quiz.html` + `script.js`) with a
Supabase-backed profile/auth layer (`js/auth.js`, `js/db.js`, `js/supabase.js`) and no Telegram
integration, no role system, no MoyaCoins found anywhere in the codebase.

Action needed: confirm whether the Telegram bot is (a) a planned future direction not yet
started, (b) built in a separate repo not visible here, or (c) aspirational framing that should
be revised to describe the actual web-app architecture. Implementation of the Trust Ledger
should target wherever the real student-interaction surface actually lives, not the bot
described in the prompt, unless that bot is confirmed to exist elsewhere.

## 4. Examiner overlap

`js/examiner.js` already computes something adjacent to `recovery_score` and
`longevity_weeks` — it tracks `atRisk` (inactive ≥ 7 days), `attempts` per course, and
recommendation logic based on retries. Before building new Trust Ledger aggregation logic,
decide: does the Trust Ledger **read from** Examiner's existing verdicts as an input signal, or
does it compute these independently from raw `trust_events`? Building both in parallel risks
two slightly-different definitions of "recovery" existing at once.

## 5. Real-time vs nightly tension with existing UX

Design requirement #3 (spec) mandates nightly/periodic aggregation, not real-time. Confirm this
is acceptable given MoyaBot's hint-generosity adjustment (architecture diagram: "MoyaBot
pedagogy — adjusts hint generosity per trust tier") — a full day of lag between a behavior
change and a pedagogy adjustment may be the right trade-off (anti-gaming) or may feel
unresponsive (UX). Worth a conscious call, not a default.
