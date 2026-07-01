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

## 2. Faculty agent naming — RESOLVED

**Resolution: Tolu / Chidi / Amaka / Emeka is canonical.** The spec's "Archie/Aura/Logic"
naming does not appear anywhere in the actual product and was almost certainly placeholder
shorthand written without cross-referencing the existing code.

Evidence this is a deliberate, settled product decision — not a coincidence to reconcile away:

- `js/agents.js` — full agent definitions with distinct intro/farewell copy per teacher.
- `js/assistant.js` — Moya's own system prompt references these four names directly.
- `home.html`, `placement.html`, `script.js` — agent names drive UI copy, placement-quiz
  results, and course routing across the live product.
- **`VISION.md` § "The Faculty"** (the product's own vision doc) — names Tolu/Chidi/Amaka/Emeka
  as the four Teachers alongside Watcher/Examiner/Administrator, and calls the handoffs between
  them ("Tolu handing to Chidi, Chidi to Amaka, Amaka to Emeka") **"the emotional spine of the
  product."** This is character design with real narrative investment, not a stub.

Also resolved: the spec's 3-agent list (HTML/CSS/JS) omitted the Scratch agent entirely. The
real Faculty is **four** teachers across six courses — Tolu owns JSS1+JSS2 (Scratch), Chidi
owns JSS3+SS1 (HTML), Amaka owns SS2 (CSS), Emeka owns SS3 (JavaScript). Any future spec or
pitch material referencing "the Faculty" should use this four-agent structure, not three.

**Action for future docs:** use Tolu/Chidi/Amaka/Emeka going forward. If "Archie/Aura/Logic"
resurfaces in another draft, treat it as a drafting error to fix, not a rename to consider.

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
