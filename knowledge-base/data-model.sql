-- MoyaCode Concept Knowledge Base — Supabase schema
-- Design artifact: NOT yet applied to any database. Confirm open-decisions.md items
-- before running as a migration.
--
-- NOTE: creation order fixed vs. the original spec draft — concept_pages must exist
-- before concept_index because concept_index.page_id references it.

-- ─── The synthesis layer: curated explanations MoyaBot draws from ─────────────
create table concept_pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  content_md text not null,        -- the refined explanation: definition, analogy, example (in MoyaBot's voice)
  common_confusions text[],        -- known ways students get this wrong, for targeted framing
  difficulty_tier text,            -- beginner / intermediate, matches curriculum progression
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─── The index: what concepts exist, read first on every "Confused" hit ───────
create table concept_index (
  id uuid primary key default gen_random_uuid(),
  concept_slug text unique not null,       -- e.g. 'for-loops', 'variables', 'css-selectors'
  title text not null,
  summary text not null,                    -- 1-2 sentences, what this concept covers
  tags text[] not null default '{}',        -- e.g. {loops, iteration, control-flow}
  grade_level text[] not null default '{}', -- e.g. {JSS1,JSS2} — aligns to curriculum tiers
  page_id uuid references concept_pages(id),
  times_served int default 0,               -- usage signal: how often this has been pulled
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_concept_index_tags on concept_index using gin (tags);
create index idx_concept_index_grade on concept_index using gin (grade_level);

-- ─── Gap log: Confused messages with no matching page ─────────────────────────
create table concept_gaps (
  id uuid primary key default gen_random_uuid(),
  student_message text not null,
  inferred_topic text,             -- best-guess topic extraction, may be null
  occurred_at timestamptz default now(),
  reviewed boolean default false
);

create index idx_concept_gaps_unreviewed on concept_gaps (occurred_at) where not reviewed;
