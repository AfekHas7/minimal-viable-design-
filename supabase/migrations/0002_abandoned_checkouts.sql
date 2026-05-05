-- 0002_abandoned_checkouts.sql
-- Per-email tracking of users who clicked "להמשך לתשלום" in the landing-page
-- purchase modal but haven't yet completed payment. Service-role only — no
-- end-user RLS surface. completed_at and *_email_sent_at are lifetime per-email
-- facts and are NEVER reset on re-engagement (rationale: a re-click must not
-- re-arm the abandonment cron and re-send the same nudges).
--
-- Apply this once via the Supabase SQL editor (Database -> SQL editor -> New query).

create extension if not exists "uuid-ossp";

create table if not exists public.abandoned_checkouts (
  id                    uuid         primary key default uuid_generate_v4(),
  email                 text         not null,
  source                text         not null default 'landing_purchase_modal',
  started_at            timestamptz  not null default now(),
  last_seen_at          timestamptz  not null default now(),
  completed             boolean      not null default false,
  completed_at          timestamptz,
  first_email_sent_at   timestamptz,
  second_email_sent_at  timestamptz
);

-- Case-insensitive uniqueness enforced at the DB layer (defense in depth).
-- The RPC normalizes via lower(trim(...)), but any future direct-write path
-- using service-role could otherwise insert "Foo@x.com" alongside "foo@x.com"
-- and silently create duplicates. An expression-based unique index closes that
-- hole at the database level — no developer discipline required.
create unique index if not exists uq_abandoned_checkouts_email_lower
  on public.abandoned_checkouts (lower(email));

-- Future cron will scan WHERE completed = false AND started_at < now() - interval.
-- Partial index keeps that O(pending rows), not O(table).
create index if not exists idx_abandoned_checkouts_pending
  on public.abandoned_checkouts (started_at)
  where completed = false;

-- Idempotent upsert. ON CONFLICT updates ONLY last_seen_at — see field-by-field
-- rationale in the project plan. completed*, *_email_sent_at, started_at, and
-- source are all lifetime/first-touch and must NOT be touched on re-engagement.
create or replace function public.upsert_abandoned_checkout(
  p_email  text,
  p_source text default 'landing_purchase_modal'
) returns void
language sql
security definer
set search_path = public
as $$
  insert into public.abandoned_checkouts (email, source)
  values (
    lower(trim(p_email)),
    coalesce(p_source, 'landing_purchase_modal')
  )
  on conflict (lower(email)) do update set
    last_seen_at = now();
$$;

-- Defense in depth: only the service role (which bypasses RLS) may read/write.
-- Stricter than marketing_leads — this RPC is server-only, never called from
-- an anon Supabase client, so we revoke EXECUTE from PUBLIC/anon/authenticated.
alter table public.abandoned_checkouts enable row level security;
revoke all on public.abandoned_checkouts from anon, authenticated, public;
grant select, insert, update on public.abandoned_checkouts to service_role;

revoke all  on function public.upsert_abandoned_checkout(text, text) from public, anon, authenticated;
grant execute on function public.upsert_abandoned_checkout(text, text) to service_role;
