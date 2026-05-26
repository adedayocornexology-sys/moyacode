-- ============================================================
-- MoyaCode — Supabase schema migration
-- Run this in the Supabase SQL editor or via `supabase db push`.
-- ============================================================

-- ── students ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.students (
  id          uuid        PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  full_name   text,
  school      text,
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- A newly authenticated user can insert their own row.
CREATE POLICY "students: insert own row"
  ON public.students
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- A student can read their own row.
CREATE POLICY "students: select own row"
  ON public.students
  FOR SELECT
  USING (auth.uid() = id);

-- A student can update their own row.
CREATE POLICY "students: update own row"
  ON public.students
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);


-- ── student_profile ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.student_profile (
  student_id  uuid        PRIMARY KEY REFERENCES public.students (id) ON DELETE CASCADE,
  dream       text,
  motivation  text,
  goal        text,
  updated_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.student_profile ENABLE ROW LEVEL SECURITY;

CREATE POLICY "student_profile: insert own row"
  ON public.student_profile
  FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "student_profile: select own row"
  ON public.student_profile
  FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "student_profile: update own row"
  ON public.student_profile
  FOR UPDATE
  USING (auth.uid() = student_id)
  WITH CHECK (auth.uid() = student_id);


-- ── student_progress ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.student_progress (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id  uuid        NOT NULL REFERENCES public.students (id) ON DELETE CASCADE,
  class_key   text        NOT NULL,
  completed   boolean     NOT NULL DEFAULT false,
  score       int         NOT NULL DEFAULT 0,
  xp          int         NOT NULL DEFAULT 0,
  updated_at  timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT student_progress_student_class_unique UNIQUE (student_id, class_key)
);

ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "student_progress: insert own rows"
  ON public.student_progress
  FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "student_progress: select own rows"
  ON public.student_progress
  FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "student_progress: update own rows"
  ON public.student_progress
  FOR UPDATE
  USING (auth.uid() = student_id)
  WITH CHECK (auth.uid() = student_id);


-- ── answer_events ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.answer_events (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id  uuid        NOT NULL REFERENCES public.students (id) ON DELETE CASCADE,
  class_key   text        NOT NULL,
  question_id int         NOT NULL,
  is_correct  boolean     NOT NULL,
  xp_awarded  int         NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.answer_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "answer_events: insert own rows"
  ON public.answer_events
  FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "answer_events: select own rows"
  ON public.answer_events
  FOR SELECT
  USING (auth.uid() = student_id);


-- ── handoff_events ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.handoff_events (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id  uuid        NOT NULL REFERENCES public.students (id) ON DELETE CASCADE,
  from_course text,
  to_course   text,
  from_agent  text,
  to_agent    text,
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.handoff_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "handoff_events: insert own rows"
  ON public.handoff_events
  FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "handoff_events: select own rows"
  ON public.handoff_events
  FOR SELECT
  USING (auth.uid() = student_id);
