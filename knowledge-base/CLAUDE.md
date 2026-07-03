# MoyaCode — Concept Knowledge Base Department (Agent Charter)

This folder owns MoyaBot's **concept knowledge base**: the curated library of explanations
that grounds MoyaBot's answers when a student is confused about a concept, so the same
concept gets the same quality explanation every time — personalized in wording, consistent
in substance. Any agent working here acts as the system's architect: reconcile against
what's actually built, flag risks, recommend — don't just transcribe.

## Mandate

Implement the index → synthesis → retrieval pattern in `SPEC.md`: when a student's message
is classified as *Confused*, retrieve a refined `concept_pages` entry as grounding context
instead of generating a fresh explanation every time; log unmatched concepts to
`concept_gaps` so the library compounds.

## Files in this department

| File | Purpose |
|---|---|
| `SPEC.md` | The full handoff spec (problem, data model, retrieval logic, phases, DoD) |
| `data-model.sql` | Corrected schema (see note below) — design artifact, not yet applied |
| `seed-concepts-draft.md` | Concept list extracted from the repo's real lesson content, awaiting owner confirmation |
| `open-decisions.md` | Items requiring the owner's answer before Phase 1 starts |

## Non-negotiables (from the spec — don't relitigate silently)

1. **Scoped to the Confused intent only.** Stuck and Delegating paths untouched.
2. **Fallback must never block.** Unmatched concept → current fresh-generation behavior,
   gap logged asynchronously.
3. **In-character voice.** `concept_pages.content_md` is written in MoyaBot's voice, not
   textbook-neutral — and this is verified by reading transcripts, not assumed (DoD).
4. **No embeddings for v1.** Curriculum is a bounded concept set; tag/keyword matching
   against `concept_index.tags` is the design. Don't gold-plate with semantic search.
5. **Seed from what's actually taught** (`lessons.js`, `script.js` quiz banks), not a
   generic curriculum. `seed-concepts-draft.md` was extracted accordingly.

## Corrections made to the spec as pasted

- **SQL ordering bug:** the spec creates `concept_index` (which has
  `page_id uuid references concept_pages(id)`) *before* `concept_pages` exists — that
  fails in Postgres. `data-model.sql` creates `concept_pages` first. Flagged rather than
  silently fixed so the correction survives review.

## Reality check (same discipline as `trust-ledger/CLAUDE.md`)

The spec's context describes a Telegram bot on Railway, a live three-intent classifier,
and a `refusal_responses` table. **None of these exist in this repo** — verified again
2026-07-03 (no telegram/intent/refusal code anywhere). The in-repo analog is **Moya, the
web assistant** (`js/assistant.js`, Claude relay at `/api/assistant`, WebMCP tools). This
is the third spec (after Trust Ledger and this one; see `trust-ledger/open-decisions.md`
§3) assuming that infrastructure — the question of where it actually lives (separate repo?
planned? aspirational?) is still open and now blocks two departments, not one.

**Implementation guidance:** if the Telegram bot is confirmed to live elsewhere, this
repo's deliverables are the schema + seed content + retrieval-logic reference. If it
doesn't exist yet, the natural v1 target is Moya's `/api/assistant` relay path instead.

## Rules for changes

- Supabase schema changes are real, hard-to-reverse actions against a shared project —
  propose and confirm before applying any migration. `data-model.sql` stays a design
  artifact until the owner green-lights Phase 1 (its §7 open items are answered).
- Keep this system separate from XP/leaderboard/gamification, same as the Trust Ledger.
- The curriculum pivot (`VISION.md` § "Curriculum Pivot") changes what should be seeded:
  Scratch is being dropped, so Scratch concepts are transitional. See
  `seed-concepts-draft.md` for how that's handled.
