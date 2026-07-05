-- ============================================================
-- MoyaCode — wiki knowledge map (same schema as the Ajasin
-- Foundation chat harness: wiki_pages / wiki_index / wiki_relations,
-- migrations 0003 + 0004 there).
-- Run this in the Supabase SQL editor or via `supabase db push`.
--
-- Two jobs:
--   1. Give Moya (the site assistant) a knowledge base it can
--      search and cite when students ask questions.
--   2. Model the curriculum as a graph students can walk:
--      HTML -> CSS -> JavaScript -> projects, with each student's
--      progress overlaid via student_wiki_progress.
--
-- Writes are service-role only (no INSERT/UPDATE policies for
-- authenticated), reads are public — learning is never paywalled.
-- ============================================================

-- ── wiki_pages — the content layer Moya reads and cites ──────
CREATE TABLE IF NOT EXISTS public.wiki_pages (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        text        NOT NULL UNIQUE,
  title       text        NOT NULL,
  content_md  text        NOT NULL,
  source_refs text[]      NOT NULL DEFAULT '{}',
  page_type   text        NOT NULL CHECK (page_type IN ('concept','lesson','project','track','faq','announcement')),
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS wiki_pages_page_type_idx ON public.wiki_pages (page_type);

ALTER TABLE public.wiki_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "wiki_pages: public read"
  ON public.wiki_pages
  FOR SELECT
  USING (true);

-- ── wiki_index — the lookup layer questions are matched against ──
CREATE TABLE IF NOT EXISTS public.wiki_index (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title            text        NOT NULL,
  summary          text        NOT NULL,
  tags             text[]      NOT NULL DEFAULT '{}',
  page_id          uuid        NOT NULL REFERENCES public.wiki_pages (id) ON DELETE CASCADE,
  relevance_weight float       NOT NULL DEFAULT 1.0,
  search_vector    tsvector    GENERATED ALWAYS AS (to_tsvector('english', summary)) STORED,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS wiki_index_page_id_idx ON public.wiki_index (page_id);
CREATE INDEX IF NOT EXISTS wiki_index_tags_idx ON public.wiki_index USING GIN (tags);
CREATE INDEX IF NOT EXISTS wiki_index_search_vector_idx ON public.wiki_index USING GIN (search_vector);

ALTER TABLE public.wiki_index ENABLE ROW LEVEL SECURITY;

CREATE POLICY "wiki_index: public read"
  ON public.wiki_index
  FOR SELECT
  USING (true);

-- ── wiki_relations — typed edges, the map itself ─────────────
CREATE TABLE IF NOT EXISTS public.wiki_relations (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  from_page_id  uuid        NOT NULL REFERENCES public.wiki_pages (id) ON DELETE CASCADE,
  to_page_id    uuid        NOT NULL REFERENCES public.wiki_pages (id) ON DELETE CASCADE,
  relation_type text        NOT NULL,  -- e.g. 'prerequisite_of', 'part_of', 'builds_on', 'see_also'
  description   text,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT wiki_relations_no_self_link CHECK (from_page_id <> to_page_id),
  CONSTRAINT wiki_relations_unique_edge UNIQUE (from_page_id, to_page_id, relation_type)
);
CREATE INDEX IF NOT EXISTS wiki_relations_from_idx ON public.wiki_relations (from_page_id);
CREATE INDEX IF NOT EXISTS wiki_relations_to_idx ON public.wiki_relations (to_page_id);

ALTER TABLE public.wiki_relations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "wiki_relations: public read"
  ON public.wiki_relations
  FOR SELECT
  USING (true);

-- ── student_wiki_progress — each student's overlay on the map ──
-- Students are minors: rows are strictly own-row (auth.uid()),
-- mirroring the students/student_profile pattern in schema.sql.
CREATE TABLE IF NOT EXISTS public.student_wiki_progress (
  student_id  uuid        NOT NULL REFERENCES public.students (id) ON DELETE CASCADE,
  page_id     uuid        NOT NULL REFERENCES public.wiki_pages (id) ON DELETE CASCADE,
  status      text        NOT NULL DEFAULT 'seen' CHECK (status IN ('seen','learning','completed')),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (student_id, page_id)
);

ALTER TABLE public.student_wiki_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "student_wiki_progress: insert own rows"
  ON public.student_wiki_progress
  FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "student_wiki_progress: select own rows"
  ON public.student_wiki_progress
  FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "student_wiki_progress: update own rows"
  ON public.student_wiki_progress
  FOR UPDATE
  USING (auth.uid() = student_id)
  WITH CHECK (auth.uid() = student_id);
