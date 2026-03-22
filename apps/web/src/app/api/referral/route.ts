import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createServiceRoleClient } from '@/lib/supabase-server';
import sgMail from '@sendgrid/mail';

const ReferralSchema = z.object({
  submissionId: z.string().uuid(),
  participantId: z.string().uuid(),
});

export async function POST(request: NextRequest) {
  // Internal-only route — validate internal key
  const internalKey = request.headers.get('x-internal-key');
  if (internalKey !== process.env['SUPABASE_SERVICE_ROLE_KEY']) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const parsed = ReferralSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid request' }, { status: 422 });

  const { submissionId } = parsed.data;
  const supabase = createServiceRoleClient();

  const { data: submission } = await supabase
    .from('questionnaire_submissions')
    .select('*, question_responses(*)')
    .eq('id', submissionId)
    .single();

  if (!submission) return NextResponse.json({ error: 'Submission not found' }, { status: 404 });

  const gpEmail = process.env['GP_REFERRAL_DEFAULT_EMAIL'] ?? process.env['SENDGRID_FROM_EMAIL']!;

  sgMail.setApiKey(process.env['SENDGRID_API_KEY']!);

  const flagSummary = submission.flagged_question_ids?.join(', ') ?? 'None';

  await sgMail.send({
    to: gpEmail,
    from: process.env['SENDGRID_FROM_EMAIL']!,
    subject: `[Hassan SADS] High-Risk Cardiac Screening Referral — Action Required`,
    html: `
      <h2>Hassan SADS App — GP Referral Alert</h2>
      <p>A participant has completed the SADS screening questionnaire and has been identified as <strong>high risk</strong>.</p>
      <p><strong>Submission ID:</strong> ${submissionId}</p>
      <p><strong>Risk Level:</strong> HIGH</p>
      <p><strong>Flagged Questions:</strong> ${flagSummary}</p>
      <p>Please review the participant's questionnaire and initiate a cardiac referral pathway (ECG, cardiology referral as appropriate).</p>
      <p>For more information, visit <a href="https://irishheart.ie">irishheart.ie</a> or <a href="https://www.crying.ie">CRY Ireland</a>.</p>
      <hr/>
      <p><em>Hassan SADS App — Built in memory of Hassan. Every referral matters.</em></p>
    `,
  });

  await supabase.from('gp_referrals').insert({
    submission_id: submissionId,
    gp_email: gpEmail,
    sent_at: new Date().toISOString(),
    acknowledged_at: null,
  });

  await supabase.from('questionnaire_submissions').update({ referral_triggered: true }).eq('id', submissionId);

  return NextResponse.json({ status: 'sent', sentAt: new Date().toISOString() });
}
