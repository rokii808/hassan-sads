import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createServiceRoleClient } from '@/lib/supabase-server';
import { scoreQuestionnaire } from '@/lib/scoring';
import type { QuestionnaireSubmission } from '@hassan-sads/db';

const AnswerSchema = z.object({
  questionId: z.string().min(1),
  value: z.union([z.boolean(), z.string(), z.number(), z.null()]),
});

const SubmitSchema = z.object({
  participantId: z.string().uuid(),
  answers: z.array(AnswerSchema).min(1).max(25),
  ageBand: z.enum(['12-17', '18-25', '26-35', '36+']),
  consentConfirmed: z.literal(true),
  parentConsentConfirmed: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = SubmitSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request', details: parsed.error.flatten() }, { status: 422 });
  }

  const { participantId, answers, ageBand, parentConsentConfirmed } = parsed.data;

  // Age band 12–17 requires parent consent
  if (ageBand === '12-17' && !parentConsentConfirmed) {
    return NextResponse.json({ error: 'Parent or guardian consent is required for participants aged 12–17.' }, { status: 403 });
  }

  const supabase = createServiceRoleClient();

  // Verify participant exists and has given consent
  const { data: participant, error: participantError } = await supabase
    .from('participants')
    .select('id, consent_given_at, opted_out_at, withdrawn_at')
    .eq('id', participantId)
    .single();

  if (participantError || !participant) {
    return NextResponse.json({ error: 'Participant not found.' }, { status: 404 });
  }
  if (!participant.consent_given_at) {
    return NextResponse.json({ error: 'Consent has not been recorded for this participant.' }, { status: 403 });
  }
  if (participant.opted_out_at ?? participant.withdrawn_at) {
    return NextResponse.json({ error: 'Participant has opted out or withdrawn.' }, { status: 403 });
  }

  // Score the questionnaire
  const scoring = scoreQuestionnaire(answers);

  // Insert submission
  const { data: rawSubmission, error: submissionError } = await supabase
    .from('questionnaire_submissions')
    .insert({
      participant_id: participantId,
      submitted_at: new Date().toISOString(),
      risk_level: scoring.riskLevel,
      flagged_question_ids: scoring.flaggedQuestions,
      referral_triggered: scoring.recommendGpReferral,
      pdf_url: null,
    })
    .select()
    .single();
  const submission = rawSubmission as QuestionnaireSubmission | null;

  if (submissionError || !submission) {
    return NextResponse.json({ error: 'Failed to save submission.' }, { status: 500 });
  }

  // Insert individual responses
  const responseInserts = answers.map((a) => ({
    submission_id: submission.id,
    question_id: a.questionId,
    answer_value: String(a.value),
    is_flag: scoring.flaggedQuestions.includes(a.questionId),
  }));

  await supabase.from('question_responses').insert(responseInserts);

  // Insert anonymised research cohort row (NO PII)
  await supabase.from('research_cohort').insert({
    age_band: ageBand,
    sex: String(answers.find((a) => a.questionId === 'Q02')?.value ?? 'Prefer not to say'),
    county: String(answers.find((a) => a.questionId === 'Q03')?.value ?? null),
    risk_level: scoring.riskLevel,
    flagged_question_ids: scoring.flaggedQuestions,
    moderate_concern_ids: [],
    submitted_month: new Date().toISOString().slice(0, 7),
    exercise_hours_band: String(answers.find((a) => a.questionId === 'Q05')?.value ?? null),
  });

  // Trigger GP referral if high risk (fire-and-forget via internal fetch)
  if (scoring.recommendGpReferral) {
    void fetch(`${process.env['NEXT_PUBLIC_APP_URL']}/api/referral`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-internal-key': process.env['SUPABASE_SERVICE_ROLE_KEY'] ?? '',
      },
      body: JSON.stringify({ submissionId: submission.id, participantId }),
    });
  }

  return NextResponse.json(
    {
      submissionId: submission.id,
      riskLevel: scoring.riskLevel,
      flags: scoring.flaggedQuestions,
      summary: scoring.summary,
      nextSteps: scoring.nextSteps,
      pdfUrl: null,
    },
    { status: 201 },
  );
}
