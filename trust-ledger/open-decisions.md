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

## 2. Faculty agent naming & curriculum structure — RESOLVED (superseded once, now final)

**First pass got this half-wrong.** An earlier version of this entry declared
Tolu/Chidi/Amaka/Emeka (4 agents, Scratch included) canonical purely because that's what the
live code already had built. That was the right read of *current state* but the wrong answer
to the actual product question — "what should the Faculty be" is a decision for the product
owner, not something to infer from what happens to exist in the repo already.

**Final decision (confirmed by product owner 2026-07-01): drop Scratch. The Faculty is 3
teaching agents — HTML, CSS, JavaScript — not 4.**

This means:
- JSS1–JSS2 no longer teach Scratch. They need new, HTML-focused curriculum content instead —
  this is a real content-authoring task, not a find-and-replace. The existing JSS1/JSS2 quiz
  banks in `script.js` (currently Scratch-based) will need to be rewritten.
- Tolu is removed as an agent entirely — not renamed, retired.
- **Naming — DECIDED:** the 3 agents are **Archie (HTML), Aura (CSS), Logic (JavaScript)** —
  the spec's original naming, now adopted as canonical since the structure matches it 1:1.
- **Not yet decided:** the course → agent mapping for JSS1–JSS2 (currently Tolu/Scratch).
  Options: fold JSS1–JSS2 into Archie's HTML track (Archie owns 4 courses: JSS1–SS1), or split
  differently. And the JSS1–JSS2 content itself still needs authoring — replacing Scratch
  exercises with HTML exercises appropriate for that age/level is real curriculum work, not a
  mechanical rename.
- Files that will need updating once course mapping is final: `js/agents.js` (remove Tolu,
  rename Chidi→Archie/Amaka→Aura/Emeka→Logic, remap courses), `js/assistant.js` (system prompt
  references agents by name), `home.html`, `placement.html`, `script.js` (course→agent mapping
  + new JSS1/JSS2 quiz content), and `VISION.md` §"The Faculty" + its course table.

**Lesson for this department going forward:** "what does the code currently do" and "what
should the product be" are different questions. Default to asking, not inferring from existing
implementation, whenever a spec conflicts with shipped code on a substantive (non-cosmetic)
point.

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
