# MoyaCode — MoyaBot Concept Knowledge Base (Student-Facing Harness)

**Handoff spec.** Read fully before touching code. This is additive to the existing
MoyaCode platform (Telegram bot on Railway, Supabase backend, MoyaBot on Claude Haiku,
three-intent classifier: Stuck / Confused / Delegating, refusal-as-pedagogy already live
via the `refusal_responses` table). This spec does not touch the Delegating-intent refusal
system — it's scoped entirely to how MoyaBot teaches, not how it refuses.

> **Reality note:** see `CLAUDE.md` in this folder — the platform context above is not what
> exists in this repo (web app only; the in-repo analog of MoyaBot is `js/assistant.js`).
> The infrastructure question is tracked in `open-decisions.md` §1.

---

## 1. The problem this solves

Right now, when the three-intent classifier tags a student message as **Confused**,
MoyaBot generates an explanation fresh, from scratch, via Claude Haiku, every single time.
Two students asking "what's a for-loop" a week apart get two different explanations of
varying quality — nothing is remembered, nothing compounds, and there's no way to review or
improve "the for-loop explanation" as a single thing, because it doesn't exist as a thing.

## 2. The fix — index → synthesis → retrieval

Instead of generating fresh every time, MoyaBot first checks whether a **refined,
previously-curated explanation** exists for the concept the student is confused about. If
it does, that becomes the grounding context Haiku uses to answer — personalized to the
student's exact wording, but consistent in substance and teaching approach every time. If
no matching concept exists yet, MoyaBot falls back to its current fresh-generation
behavior — and that gap gets logged so the concept library grows over time, the same way a
wiki grows from unanswered questions.

This is purely additive to the Confused-intent path. Stuck and Delegating intents are
untouched by this spec.

---

## 3. Data model (Supabase)

Two content tables plus a gap log. Does not touch `refusal_responses` or any existing
gamification/quest tables. **Authoritative DDL lives in `data-model.sql`** (which fixes a
table-creation-order bug in the original draft: `concept_pages` must be created before
`concept_index` because of the `page_id` foreign key).

- **`concept_index`** — the index: what concepts exist; read first on every Confused hit.
  `concept_slug`, `title`, `summary`, `tags[]`, `grade_level[]`, `page_id → concept_pages`,
  `times_served` usage counter.
- **`concept_pages`** — the synthesis layer: the curated explanation MoyaBot draws from.
  `slug`, `title`, `content_md` (definition, analogy, example — written in MoyaBot's
  voice), `common_confusions[]`, `difficulty_tier`.
- **`concept_gaps`** — Confused messages that had no matching page: `student_message`,
  `inferred_topic` (nullable), `reviewed` flag. This is how you know what to write next.

---

## 4. Retrieval logic (runtime)

On each message classified as **Confused**:

1. **Extract topic signal** from the message (keyword/tag match against
   `concept_index.tags` — curriculum is a bounded, finite set of concepts, so this does
   not need embeddings or fuzzy semantic search).
2. **Match** — query `concept_index` by tag overlap + `grade_level` (use the student's
   known grade if available, otherwise search all tiers). Take the best match.
3. **If matched:** fetch `concept_pages.content_md`, pass it to the model as grounding
   context alongside the student's actual message, so the response is personalized in
   wording but consistent in substance. Increment `times_served`.
4. **If unmatched:** fall back to current fresh-generation behavior (unchanged), and
   insert a row into `concept_gaps` with the student's message and any partial topic
   guess. Do not block or slow down the response waiting on this — log and move on.

MoyaBot's existing personality and voice must carry through `concept_pages.content_md` —
these are written in-character, not as neutral textbook text.

---

## 5. Build phases

**Phase 1 — Schema + seed concepts.** Create the three tables. Seed `concept_pages` with
the core concepts actually taught in the current curriculum — pull the real list from
lesson/quiz content, not a generic curriculum. Start with 10–15 concepts covering the
topics that come up most. (Draft list: `seed-concepts-draft.md`.)

**Phase 2 — Wire into the intent pipeline.** Insert the retrieval step (§4) into the
Confused-intent handling path. Leave Stuck and Delegating paths untouched.

**Phase 3 — Gap review loop.** A simple way (admin script or lightweight query) to review
`concept_gaps` weekly and turn recurring gaps into new `concept_pages` entries — the
mechanism that makes the library compound instead of going stale.

**Phase 4 — Testing with real students.** Before wider rollout: test against real student
"Confused" messages across a spread of topics and grade levels. Confirm responses stay in
MoyaBot's voice and don't feel canned or repetitive across different students hitting the
same concept.

---

## 6. Definition of Done

- [ ] `concept_index`, `concept_pages`, `concept_gaps` tables exist in the MoyaCode
      Supabase project, seeded with real curriculum concepts (not placeholders)
- [ ] Confused-intent retrieval correctly matches concept for at least 10 real test
      messages spanning different topics and grade levels
- [ ] Unmatched messages correctly fall back to existing behavior and log to `concept_gaps`
- [ ] MoyaBot's in-character voice is preserved in retrieved responses — verified by
      reading transcripts, not assumed
- [ ] Stuck-intent and Delegating-intent behavior fully unchanged
- [ ] Tested end-to-end on a sandbox account before promoting to all students

---

## 7. Open items needing the owner's input before Phase 1

Tracked with status in `open-decisions.md`:

- Confirm the actual list of currently-taught concepts per grade tier to seed first
  (a draft extracted from `lessons.js` is ready for review).
- Should `common_confusions` per concept be written from the owner's own teaching
  experience at RSSOWO, or drafted from typical patterns and reviewed before going live?
- Whether Stuck-intent should eventually draw from a *different* shape of content here
  (hints, not full explanations) — flagged for a future spec, not this one.
