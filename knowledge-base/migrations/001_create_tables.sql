-- Concept Knowledge Base — migration 001: tables, RLS, counter function
-- Target: the MoyaCode Supabase project (bzlchdijdpjjobemrcci — the one js/supabase.js
-- points at). Run this in the SQL editor there, then run 002_seed_concepts.sql.
--
-- Creation order matters: concept_pages before concept_index (FK dependency).

create table concept_pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  content_md text not null,
  common_confusions text[],
  difficulty_tier text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table concept_index (
  id uuid primary key default gen_random_uuid(),
  concept_slug text unique not null,
  title text not null,
  summary text not null,
  tags text[] not null default '{}',
  grade_level text[] not null default '{}',
  page_id uuid references concept_pages(id),
  times_served int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_concept_index_tags on concept_index using gin (tags);
create index idx_concept_index_grade on concept_index using gin (grade_level);

create table concept_gaps (
  id uuid primary key default gen_random_uuid(),
  student_message text not null,
  inferred_topic text,
  occurred_at timestamptz default now(),
  reviewed boolean default false
);

create index idx_concept_gaps_unreviewed on concept_gaps (occurred_at) where not reviewed;

-- ── Row Level Security ─────────────────────────────────────────────────────
-- Concept content is public educational material: readable by everyone
-- (guests use the assistant too). Gaps are write-only from the client;
-- reviewing them happens via the dashboard / service role.

alter table concept_pages enable row level security;
alter table concept_index enable row level security;
alter table concept_gaps  enable row level security;

create policy "concept pages are readable by all"
  on concept_pages for select to anon, authenticated using (true);

create policy "concept index is readable by all"
  on concept_index for select to anon, authenticated using (true);

create policy "anyone can log a concept gap"
  on concept_gaps for insert to anon, authenticated with check (true);

-- No select/update/delete policies on concept_gaps for client roles: the
-- review loop (spec Phase 3) reads them with the service role.

-- ── times_served counter ───────────────────────────────────────────────────
-- Clients must not have blanket UPDATE on concept_index; this security-definer
-- function is the single narrow write they're allowed.

create or replace function bump_concept_served(cid uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update concept_index
     set times_served = times_served + 1,
         updated_at   = now()
   where id = cid;
$$;

revoke all on function bump_concept_served(uuid) from public;
grant execute on function bump_concept_served(uuid) to anon, authenticated;
