# Concept Knowledge Base — Open Decisions

Status update 2026-07-03: the owner delegated decisions 1–4 to the engineering side
("I leave that to you"). Calls made and implemented as follows.

## 1. Where does this actually run? — RESOLVED (option b, web assistant)

Decision: **v1 targets Moya, the web assistant** (`js/assistant.js` → `/api/assistant`
relay) — the only student-facing AI surface that actually exists. Implemented:

- `js/concept-matcher.js` — pure matching logic (confused-signal heuristic + tag scoring),
  dependency-free so it's unit-tested in Node (`tests/test-matcher.mjs`, 18/18 passing).
- `js/concepts.js` — data-access glue (index cache, page fetch, non-blocking gap logging,
  `bump_concept_served` RPC). Never throws; degrades silently if tables don't exist.
- `js/assistant.js` — grounding injected into the per-request `system` prompt when a
  message is confused-like AND matches a curated concept. Everything else unchanged.

The heuristic `isConfusedLike()` stands in for the spec's three-intent classifier until
one exists — documented in the matcher. If the Telegram bot materializes in another repo,
the schema, seed content, and matcher port over cleanly.

## 2. Seed list — RESOLVED (Tier 1 only)

The 16 HTML/CSS/JS concepts. Scratch skipped: the curriculum pivot drops it, and seeding
soon-to-be-dead content is wasted authoring. `migrations/002_seed_concepts.sql` contains
all 16 pages fully written in Moya's voice.

## 3. `common_confusions` authorship — RESOLVED (drafted, owner reviews in production)

Drafted from the lessons' own "Watch Out" callouts + well-known beginner failure modes.
They ship as v1 and get corrected from real usage + gap review — the owner edits
`concept_pages` rows directly as RSSOWO experience proves them right or wrong. This is
the spec's own compounding philosophy applied to the confusions themselves.

## 4. Seed timing vs. curriculum pivot — RESOLVED (seed now)

The underlying HTML/CSS/JS concepts don't change in the pivot — only the project framing
around them. Seeded now; re-frame examples later if the content rewrite demands it.

## ⚠️ The one thing NOT done: applying the migrations to the live database

The app's Supabase project is `bzlchdijdpjjobemrcci` (see `js/supabase.js`), but the
Supabase MCP connection in the build session only had access to two unrelated projects
(`ajasin-foundation`, `sellam`). Rather than touch the wrong database, the migrations
ship as files:

1. `migrations/001_create_tables.sql` — tables, RLS policies, counter function
2. `migrations/002_seed_concepts.sql` — the 16 seeded concepts

**To go live:** paste each (001 first) into the SQL editor of the `bzlchdijdpjjobemrcci`
project, or connect that project to the Supabase MCP and ask an agent to apply them.
Until then, the client code degrades silently — the assistant behaves exactly as before.

## 5. Stuck-intent content shape — explicitly deferred

The spec flags that Stuck might eventually draw hints (not full explanations) from this
library. Out of scope for this spec; do not build. Recorded so nobody scope-creeps it in.
