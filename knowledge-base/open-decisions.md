# Concept Knowledge Base — Open Decisions

Items an agent in this folder must NOT resolve silently. Surface to the owner first.

## 1. Where does this actually run? (blocks Phase 2)

The spec targets a Telegram-bot pipeline with a live three-intent classifier and
`refusal_responses` table. **Verified again 2026-07-03: none of that exists in this repo.**
This is now the *second* department blocked on the same question — see
`trust-ledger/open-decisions.md` §3, still unanswered. Options:

- **(a)** The Telegram bot lives in a separate repo → this repo's deliverables are schema,
  seed content, and retrieval-logic reference; implementation happens there.
- **(b)** It doesn't exist yet → the natural v1 target is **Moya, the web assistant**
  (`js/assistant.js` → `/api/assistant` relay), which is real, already has a system prompt
  and WebMCP tool loop, and serves the same student-facing role. The intent classifier
  would also need building as part of that work.
- **(c)** Aspirational framing → revise specs to match the web-app architecture.

**Needs one answer covering both this spec and the Trust Ledger.**

## 2. Seed list confirmation (blocks Phase 1) — DRAFT READY

`seed-concepts-draft.md` extracts the real taught concepts from `lessons.js`:
16 HTML/CSS/JS concepts (Tier 1, survive the curriculum pivot) + 8 Scratch concepts
(Tier 2, transitional since the pivot drops Scratch). Owner to confirm: seed Tier 1 only,
or both while Scratch students remain active?

## 3. `common_confusions` authorship (spec §7 item 2)

Options: (a) owner writes them from RSSOWO teaching experience, or (b) drafted from
typical patterns + lesson "Watch Out" callouts (starter material already collected in
`seed-concepts-draft.md`), then owner reviews before going live. The spec leans (b) with
review; needs an explicit pick.

## 4. Curriculum pivot vs. seed content timing

The lesson content (`lessons.js`, `script.js` quiz banks) still reflects the OLD
curriculum; the pivot's content rewrite hasn't started. Decide whether to seed concepts
from current-but-outgoing content now (usable immediately, some churn later) or wait for
the rewritten game-dev/capstone content (no churn, but the knowledge base sits empty
meanwhile). Recommendation: seed Tier 1 now — the underlying HTML/CSS/JS concepts don't
change in the pivot, only the project framing around them.

## 5. Stuck-intent content shape — explicitly deferred

The spec flags that Stuck might eventually draw hints (not full explanations) from this
library. Out of scope for this spec; do not build. Recorded so nobody scope-creeps it in.
