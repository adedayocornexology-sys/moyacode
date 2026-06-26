-- MoyaCode: public, account-free character submissions.
-- Run this in the MoyaCode Supabase project (ref bzlchdijdpjjobemrcci) SQL editor.
-- Security model: anonymous visitors may ONLY insert; they can never read,
-- change, or delete submissions. Length limits are enforced in the database.

create table if not exists public.character_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  student_name text not null,
  school_class text,
  contact text,
  character_name text not null,
  character_power text,
  character_description text not null,
  status text not null default 'new'
);

alter table public.character_submissions enable row level security;

-- Anonymous INSERT only, with server-side length caps (defense in depth).
-- No SELECT/UPDATE/DELETE policy for anon => the public site cannot read or
-- modify any data. Admins read via the dashboard (service role bypasses RLS).
create policy "anon can submit a character"
  on public.character_submissions
  for insert to anon
  with check (
    char_length(student_name) between 1 and 80
    and char_length(coalesce(school_class,'')) <= 120
    and char_length(coalesce(contact,'')) <= 60
    and char_length(character_name) between 1 and 80
    and char_length(coalesce(character_power,'')) <= 120
    and char_length(character_description) between 1 and 1000
  );
