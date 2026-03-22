-- Hassan SADS App — Development Seed Data
-- IMPORTANT: Never run this in production. Dev/local only.

-- Seed participants
insert into participants (id, email, full_name, date_of_birth, age_band, consent_given_at, parent_consent_required) values
  ('00000000-0000-0000-0000-000000000001', 'test.low@hassansads.dev', 'Test User Low', '2000-06-15', '18-25', now(), false),
  ('00000000-0000-0000-0000-000000000002', 'test.moderate@hassansads.dev', 'Test User Moderate', '1998-03-20', '26-35', now(), false),
  ('00000000-0000-0000-0000-000000000003', 'test.high@hassansads.dev', 'Test User High Risk', '2007-09-10', '12-17', now(), true);

update participants
  set parent_consent_given_at = now()
  where id = '00000000-0000-0000-0000-000000000003';

-- Seed submissions
insert into questionnaire_submissions (id, participant_id, submitted_at, risk_level, flagged_question_ids, referral_triggered) values
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', now() - interval '3 days', 'low', '{}', false),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', now() - interval '1 day', 'moderate', '{}', false),
  ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', now(), 'high', '{Q11,Q15}', true);

-- Seed anonymised research cohort (NO PII)
insert into research_cohort (age_band, sex, county, risk_level, flagged_question_ids, moderate_concern_ids, submitted_month, exercise_hours_band) values
  ('18-25', 'Male', 'Dublin', 'low', '{}', '{}', to_char(now(), 'YYYY-MM'), '3–5 hours'),
  ('26-35', 'Female', 'Cork', 'moderate', '{}', '{Q06,Q07}', to_char(now(), 'YYYY-MM'), '1–3 hours'),
  ('12-17', 'Male', 'Galway', 'high', '{Q11,Q15}', '{}', to_char(now(), 'YYYY-MM'), '5–10 hours'),
  ('18-25', 'Female', 'Limerick', 'low', '{}', '{}', to_char(now() - interval '1 month', 'YYYY-MM'), 'Less than 1 hour'),
  ('26-35', 'Male', 'Waterford', 'moderate', '{}', '{Q09}', to_char(now() - interval '1 month', 'YYYY-MM'), '3–5 hours');

-- Seed GP referral
insert into gp_referrals (submission_id, gp_email, sent_at) values
  ('10000000-0000-0000-0000-000000000003', 'gp@hassansads.dev', now());
