-- 0001_marketing_leads.sql
-- Captures marketing leads from the landing-page purchase modal.
-- Apply this once via the Supabase SQL editor (Database -> SQL editor -> New query).

create extension if not exists "uuid-ossp";

create table if not exists public.marketing_leads (
  id                uuid         primary key default uuid_generate_v4(),
  email             text         not null unique,
  consent_marketing boolean      not null default false,
  source            text         default 'landing_purchase_modal',
  created_at        timestamptz  not null default now(),
  updated_at        timestamptz  not null default now(),
  last_seen_at      timestamptz  not null default now()
);

-- Idempotent upsert with OR-merged consent: false -> true is allowed,
-- true -> false is silently ignored. Atomic; no read-modify-write race.
create or replace function public.upsert_marketing_lead(
  p_email             text,
  p_consent_marketing boolean,
  p_source            text default 'landing_purchase_modal'
) returns void
language sql
security definer
set search_path = public
as $$
  insert into public.marketing_leads (email, consent_marketing, source, last_seen_at, updated_at)
  values (
    lower(trim(p_email)),
    p_consent_marketing,
    coalesce(p_source, 'landing_purchase_modal'),
    now(),
    now()
  )
  on conflict (email) do update set
    consent_marketing = public.marketing_leads.consent_marketing or excluded.consent_marketing,
    last_seen_at      = now(),
    updated_at        = now();
$$;

-- Defense in depth: only the service role (which bypasses RLS) may read/write.
alter table public.marketing_leads enable row level security;
