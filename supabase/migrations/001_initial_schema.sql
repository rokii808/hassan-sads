-- Hassan SADS App — Initial Database Schema
-- Migration: 001_initial_schema
-- All tables use Row-Level Security (RLS). No participant can read another participant's data.

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ══════════════════════════════════════════════════════════
-- PARTICIPANTS
-- Stores participant PII + consent state.
-- RLS: participant can only read/update their own row.
-- ══════════════════════════════════════════════════════════
create table participants (
  id                        uuid primary key default uuid_generate_v4(),
  email                     text not null,
  full_name                 text not null,
  date_of_birth             date not null,
  age_band                  text not null check (age_band in ('12-17', '18-25', '26-35', '36+')),
  consent_given_at          timestamptz,
  opted_out_at              timestamptz,
  withdrawn_at              timestamptz,
  parent_consent_required   boolean not null default false,
  parent_consent_given_at   timestamptz,
  created_at                timestamptz not null default now(),
  updated_at                timestamptz not null default now()
);

alter table participants enable row level security;

create policy "participants_own_row_select"
  on participants for select
  using (auth.uid() = id);

create policy "participants_own_row_update"
  on participants for update
  using (auth.uid() = id);

create policy "participants_insert"
  on participants for insert
  with check (auth.uid() = id);

create policy "admin_select_all_participants"
  on participants for select
  using (auth.role() = 'admin');

-- ══════════════════════════════════════════════════════════
-- QUESTIONNAIRE SUBMISSIONS
-- One row per completed questionnaire.
-- RLS: participant sees own submissions; admin sees all.
-- ══════════════════════════════════════════════════════════
create table questionnaire_submissions (
  id                    uuid primary key default uuid_generate_v4(),
  participant_id        uuid not null references participants(id) on delete cascade,
  submitted_at          timestamptz not null default now(),
  risk_level            text not null check (risk_level in ('low', 'moderate', 'high')),
  flagged_question_ids  text[] not null default '{}',
  referral_triggered    boolean not null default false,
  pdf_url               text,
  created_at            timestamptz not null default now()
);

alter table questionnaire_submissions enable row level security;

create policy "submissions_participant_select"
  on questionnaire_submissions for select
  using (participant_id = auth.uid());

create policy "submissions_participant_insert"
  on questionnaire_submissions for insert
  with check (participant_id = auth.uid());

create policy "admin_select_all_submissions"
  on questionnaire_submissions for select
  using (auth.role() = 'admin');

-- ══════════════════════════════════════════════════════════
-- QUESTION RESPONSES
-- Individual answers per submission.
-- ══════════════════════════════════════════════════════════
create table question_responses (
  id              uuid primary key default uuid_generate_v4(),
  submission_id   uuid not null references questionnaire_submissions(id) on delete cascade,
  question_id     text not null,
  answer_value    text not null,
  is_flag         boolean not null default false,
  created_at      timestamptz not null default now()
);

alter table question_responses enable row level security;

create policy "responses_participant_select"
  on question_responses for select
  using (
    submission_id in (
      select id from questionnaire_submissions where participant_id = auth.uid()
    )
  );

create policy "responses_service_role_insert"
  on question_responses for insert
  with check (true);

-- ══════════════════════════════════════════════════════════
-- GP REFERRALS
-- Tracks referral dispatch. Service role insert only.
-- ══════════════════════════════════════════════════════════
create table gp_referrals (
  id              uuid primary key default uuid_generate_v4(),
  submission_id   uuid not null references questionnaire_submissions(id) on delete cascade,
  gp_email        text not null,
  sent_at         timestamptz,
  acknowledged_at timestamptz,
  created_at      timestamptz not null default now()
);

alter table gp_referrals enable row level security;

create policy "admin_select_referrals"
  on gp_referrals for select
  using (auth.role() = 'admin');

create policy "service_role_insert_referrals"
  on gp_referrals for insert
  with check (true);

-- ══════════════════════════════════════════════════════════
-- CONSENT EVENTS
-- Append-only GDPR audit log of all consent changes.
-- ══════════════════════════════════════════════════════════
create table consent_events (
  id              uuid primary key default uuid_generate_v4(),
  participant_id  uuid not null references participants(id) on delete cascade,
  event_type      text not null check (event_type in ('consent_given', 'opt_out', 'withdraw', 'data_exported')),
  timestamp       timestamptz not null default now(),
  ip_hash         text,
  metadata        jsonb
);

alter table consent_events enable row level security;

create policy "admin_select_consent_events"
  on consent_events for select
  using (auth.role() = 'admin');

create policy "service_role_insert_consent_events"
  on consent_events for insert
  with check (true);

-- ══════════════════════════════════════════════════════════
-- RESEARCH COHORT
-- Anonymised analytics — NO PII EVER. Researcher-accessible.
-- ══════════════════════════════════════════════════════════
create table research_cohort (
  id                      uuid primary key default uuid_generate_v4(),
  age_band                text not null check (age_band in ('12-17', '18-25', '26-35', '36+')),
  sex                     text not null,
  county                  text,
  risk_level              text not null check (risk_level in ('low', 'moderate', 'high')),
  flagged_question_ids    text[] not null default '{}',
  moderate_concern_ids    text[] not null default '{}',
  submitted_month         text not null,
  exercise_hours_band     text,
  created_at              timestamptz not null default now()
);

alter table research_cohort enable row level security;

create policy "researcher_select_cohort"
  on research_cohort for select
  using (auth.role() in ('admin', 'researcher'));

create policy "service_role_insert_cohort"
  on research_cohort for insert
  with check (true);

-- ══════════════════════════════════════════════════════════
-- INDEXES
-- ══════════════════════════════════════════════════════════
create index idx_submissions_participant_id on questionnaire_submissions(participant_id);
create index idx_submissions_risk_level on questionnaire_submissions(risk_level);
create index idx_submissions_submitted_at on questionnaire_submissions(submitted_at desc);
create index idx_responses_submission_id on question_responses(submission_id);
create index idx_cohort_submitted_month on research_cohort(submitted_month);
create index idx_cohort_risk_level on research_cohort(risk_level);
create index idx_cohort_age_band on research_cohort(age_band);

-- ══════════════════════════════════════════════════════════
-- UPDATED AT TRIGGER
-- ══════════════════════════════════════════════════════════
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger participants_updated_at
  before update on participants
  for each row execute function update_updated_at_column();
