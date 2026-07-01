-- MoyaCode Trust Ledger — Supabase schema
-- See ../SPEC.md for the full design rationale. Not yet applied to any database —
-- this is a design artifact. Review data types/FKs against the real `students` table
-- before running as a migration.

-- ─── Raw behavioral events (append-only, never mutated) ──────────────────────
create table trust_events (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id),
  event_type text not null, -- 'session_start', 'challenge_attempt', 'hint_requested', 'challenge_completed', etc.
  intent_classification text, -- 'stuck' | 'confused' | 'delegating' | null
  challenge_id uuid,
  duration_seconds integer,
  metadata jsonb,
  created_at timestamptz default now()
);

create index idx_trust_events_student_id on trust_events(student_id);
create index idx_trust_events_created_at on trust_events(created_at);

-- ─── Configurable scoring weights (NOT hardcoded — design requirement #4) ─────
-- One active row at a time; new tuning = new row, never mutate a past row so
-- score history stays reproducible against the weights that produced it.
create table trust_score_weights (
  id uuid primary key default gen_random_uuid(),
  consistency_weight numeric not null default 0.20,
  independence_weight numeric not null default 0.25,
  recovery_weight numeric not null default 0.20,
  progression_integrity_weight numeric not null default 0.10,
  repeat_engagement_weight numeric not null default 0.15,
  longevity_weight numeric not null default 0.10,
  is_active boolean not null default false,
  notes text, -- why these weights were chosen/changed
  created_at timestamptz default now()
);

-- Enforce exactly one active weight set at a time.
create unique index idx_one_active_weight_set
  on trust_score_weights (is_active)
  where is_active;

-- ─── Aggregated, recomputed periodically (nightly cron / Edge Function) ──────
create table trust_scores (
  student_id uuid references students(id) primary key,
  consistency_score numeric,
  independence_score numeric,
  recovery_score numeric,
  progression_integrity_score numeric,
  repeat_engagement_score numeric,
  longevity_weeks integer,
  composite_trust_score numeric,
  weights_id uuid references trust_score_weights(id), -- which weight set produced this
  flagged_for_review boolean default false,
  last_computed_at timestamptz default now()
);

-- ─── Progression-integrity anomalies routed to Examiner (design requirement #5) ─
-- Anomalies are NEVER auto-penalized against composite_trust_score directly —
-- they land here for independent verification first.
create table trust_anomalies (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id),
  challenge_id uuid,
  anomaly_type text not null, -- e.g. 'implausible_speed_jump'
  detail jsonb,
  examiner_verdict text, -- null until reviewed: 'confirmed_fast_learner' | 'confirmed_anomaly' | 'inconclusive'
  reviewed_at timestamptz,
  created_at timestamptz default now()
);
