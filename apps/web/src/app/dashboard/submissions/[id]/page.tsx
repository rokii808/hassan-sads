import { createSupabaseServerClient, createServiceRoleClient } from '@/lib/supabase-server';
import { redirect, notFound } from 'next/navigation';
import type { QuestionnaireSubmission, QuestionResponse } from '@hassan-sads/db';

export default async function SubmissionDetailPage({ params }: { params: { id: string } }) {
  const authClient = createSupabaseServerClient();
  const { data: { session } } = await authClient.auth.getSession();
  if (!session) redirect('/login');

  const supabase = createServiceRoleClient();
  const { data: rawSubmission } = await supabase
    .from('questionnaire_submissions')
    .select('*, question_responses(*)')
    .eq('id', params.id)
    .single();
  const submission = rawSubmission as (QuestionnaireSubmission & { question_responses: QuestionResponse[] }) | null;

  if (!submission) notFound();

  const riskColor = submission.risk_level === 'high' ? '#C04828'
    : submission.risk_level === 'moderate' ? '#BA7517'
    : '#0F6E56';

  const riskBg = submission.risk_level === 'high' ? '#FAEAE5'
    : submission.risk_level === 'moderate' ? '#FEF3CD'
    : '#E6F4F0';

  const responses = (submission.question_responses ?? []) as Array<{
    id: string; question_id: string; answer_value: string; is_flag: boolean;
  }>;

  return (
    <div style={{ padding: '32px 40px', maxWidth: 900, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <a href="/dashboard/submissions" style={{ color: 'var(--color-text-secondary)', fontSize: 14 }}>
          ← Back to submissions
        </a>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--color-navy)', marginBottom: 4 }}>
            Submission Record
          </h1>
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--color-text-secondary)' }}>
            {params.id}
          </code>
        </div>
        <span style={{
          padding: '6px 16px', borderRadius: 8, fontSize: 13, fontWeight: 700,
          background: riskBg, color: riskColor, border: `1.5px solid ${riskColor}`,
        }}>
          {submission.risk_level.charAt(0).toUpperCase() + submission.risk_level.slice(1)} Risk
        </span>
      </div>

      {/* Meta */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Submitted', value: new Date(submission.submitted_at).toLocaleString('en-IE') },
          { label: 'Referral triggered', value: submission.referral_triggered ? '✓ Yes' : '— No' },
          { label: 'Flagged questions', value: submission.flagged_question_ids?.join(', ') || 'None' },
        ].map(({ label, value }) => (
          <div key={label} style={{ background: 'var(--color-card)', borderRadius: 10, padding: '16px 20px', border: '1px solid var(--color-border)' }}>
            <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 4, fontWeight: 600 }}>{label}</p>
            <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-navy)', fontFamily: 'var(--font-mono)' }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Responses table */}
      <div style={{ background: 'var(--color-card)', borderRadius: 14, border: '1px solid var(--color-border)', overflow: 'hidden' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-navy)', margin: 0 }}>
            Question Responses ({responses.length})
          </h2>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
              <th style={{ textAlign: 'left', padding: '10px 16px', color: 'var(--color-text-secondary)', fontWeight: 600, fontSize: 12 }}>Question</th>
              <th style={{ textAlign: 'left', padding: '10px 16px', color: 'var(--color-text-secondary)', fontWeight: 600, fontSize: 12 }}>Answer</th>
              <th style={{ textAlign: 'left', padding: '10px 16px', color: 'var(--color-text-secondary)', fontWeight: 600, fontSize: 12 }}>Flag</th>
            </tr>
          </thead>
          <tbody>
            {responses
              .sort((a, b) => a.question_id.localeCompare(b.question_id))
              .map((r) => (
                <tr key={r.id} style={{ borderTop: '1px solid var(--color-border)', background: r.is_flag ? '#FEF6F4' : 'transparent' }}>
                  <td style={{ padding: '10px 16px', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: r.is_flag ? '#C04828' : 'var(--color-navy)' }}>
                    {r.question_id}
                  </td>
                  <td style={{ padding: '10px 16px', color: 'var(--color-text-primary)' }}>{r.answer_value}</td>
                  <td style={{ padding: '10px 16px' }}>
                    {r.is_flag && (
                      <span style={{ fontSize: 11, fontWeight: 700, background: '#FAEAE5', color: '#C04828', padding: '2px 8px', borderRadius: 4 }}>
                        FLAG
                      </span>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {submission.pdf_url && (
        <div style={{ marginTop: 20 }}>
          <a
            href={submission.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ padding: '10px 20px', background: 'var(--color-navy)', color: '#fff', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 14 }}
          >
            Download Referral PDF
          </a>
        </div>
      )}
    </div>
  );
}
