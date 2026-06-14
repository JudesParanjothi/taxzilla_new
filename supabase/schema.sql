-- ============================================================================
--  Taxzilla — Supabase schema
--  Run this once in your Supabase project's SQL Editor (or via the CLI).
--  Safe to re-run: uses IF NOT EXISTS / idempotent statements.
--
--  Security model: the app talks to the DB ONLY through the service-role key
--  on the server. RLS is enabled with NO public policies, so the anon/public
--  API cannot read or write these tables. The service role bypasses RLS.
-- ============================================================================

-- Job applications (careers form)
create table if not exists public.candidates (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  phone       text not null,
  email       text not null,
  message     text not null default '',
  resume_file text,
  photo_file  text,
  status      text not null default 'new',
  created_at  timestamptz not null default now()
);
create index if not exists candidates_created_at_idx on public.candidates (created_at desc);

-- Contact form enquiries
create table if not exists public.contact_enquiries (
  id         uuid primary key default gen_random_uuid(),
  fullname   text not null,
  contact    text not null,
  email      text not null,
  about      text not null default '',
  message    text not null default '',
  created_at timestamptz not null default now()
);
create index if not exists contact_enquiries_created_at_idx on public.contact_enquiries (created_at desc);

-- Newsletter subscribers (email unique → idempotent subscribe)
create table if not exists public.newsletter_subscribers (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  created_at timestamptz not null default now()
);

-- Lock everything down: enable RLS, add NO policies.
alter table public.candidates             enable row level security;
alter table public.contact_enquiries      enable row level security;
alter table public.newsletter_subscribers enable row level security;

-- Private storage bucket for résumés / photos (not publicly readable).
insert into storage.buckets (id, name, public)
values ('uploads', 'uploads', false)
on conflict (id) do nothing;
