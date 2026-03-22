import { createServiceRoleClient } from '@/lib/supabase-server';
import { notFound } from 'next/navigation';
import type { QuestionnaireSubmission, QuestionResponse } from '@hassan-sads/db';

function RiskBadge({ level }: { level: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    high: { bg: '#FFF3EE', color: '#FF6B35' },
    moderate: { bg: '#FFFBEB', color: '#D97706' },
    low: { bg: '#ECFDF5', color: '#059669' },
  };
  const s = map[level] ?? { bg: '#ECFDF5', color: '#059669' };
  return (
    <span style={{
      padding: '6px 16px', borderRadius: 8, fontSize: 13, fontWeight: 800,
      background: s.bg, color: s.color, border: `1.5px solid ${s.color}55`,
    }}>
      {level.charAt(0).toUpperCase() + level.slice(1)} Risk
    </span>
  );
}

export default async function SubmissionDetailPage({ params }: { params: { id: string } }) {
  const supabase = createServiceRoleClient();
  const { data: rawSubmission } = await supabase
    .from('questionnaire_submissions')
    .select('*, question_responses(*)')
    .eq('id', params.id)
    .single();
  const submission = rawSubmission as (QuestionnaireSubmission & { question_responses: QuestionResponse[] }) | null;

  if (!submission) notFound();

  const responses = (submission.question_responses ?? []) as Array<{
    id: string; question_id: string; answer_value: string; is_flag: boolean;
  }>;

  return (
    <div style={{ padding: '36px 40px', maxWidth: 900 }}>
      {/* Back */}
      <a href="/dashboard/submissions" style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 24 }}>
        ← Back to submissions
      </a>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: 'var(--black)', letterSpacing: '-0.03em', margin: 0, marginBottom: 6 }}>
            Submission Record
          </h1>
          <code style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--muted)', background: 'var(--surface)', padding: '3px 8px', borderRadius: 6 }}>
            {params.id}
          </code>
        </div>
        <RiskBadge level={submission.risk_level} />
      </div>

      {/* Meta cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 28 }}>
        {[
          { label: 'Submitted', value: new Date(submission.submitted_at).toLocaleString('en-IE') },
          { label: 'Referral Triggered', value: submission.referral_triggered ? '✓ Yes' : '— No' },
          { label: 'Flagged Questions', value: submission.flagged_question_ids?.join(', ') || 'None' },
        ].map(({ label, value }) => (
          <div key={label} style={{ background: 'var(--white)', borderRadius: 12, padding: '16px 20px', border: '1.5px solid var(--border)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{label}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--black)', fontFamily: 'monospace' }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Responses */}
      <div style={{ background: 'var(--white)', borderRadius: 16, border: '1.5px solid var(--border)', overflow: 'hidden' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1.5px solid var(--border)', background: 'var(--surface)' }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--black)', letterSpacing: '-0.02em' }}>
            Question Responses <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)' }}>({responses.length})</span>
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: 'var(--font)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th style={{ textAlign: 'left', padding: '10px 20px', color: 'var(--muted)', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Question</th>
              <th style={{ textAlign: 'left', padding: '10px 20px', color: 'var(--muted)', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Answer</th>
              <th style={{ textAlign: 'left', padding: '10px 20px', color: 'var(--muted)', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Flag</th>
            </tr>
          </thead>
          <tbody>
            {responses
              .sort((a, b) => a.question_id.localeCompare(b.question_id))
              .map((r) => (
                <tr key={r.id} style={{ borderTop: '1px solid var(--border)', background: r.is_flag ? '#FFF8F6' : 'transparent' }}>
                  <td style={{ padding: '11px 20px', fontFamily: 'monospace', fontSize: 12, fontWeight: 700, color: r.is_flag ? '#FF6B35' : 'var(--black)' }}>
                    {r.question_id}
                  </td>
                  <td style={{ padding: '11px 20px', color: 'var(--body)' }}>{r.answer_value}</td>
                  <td style={{ padding: '11px 20px' }}>
                    {r.is_flag && (
                      <span style={{ fontSize: 10, fontWeight: 800, background: '#FFF3EE', color: '#FF6B35', padding: '2px 8px', borderRadius: 4, letterSpacing: '0.05em' }}>
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
            style={{
              display: 'inline-block', padding: '11px 22px',
              background: 'var(--blue)', color: '#fff', borderRadius: 10,
              textDecoration: 'none', fontWeight: 700, fontSize: 13,
              boxShadow: '0 4px 12px rgba(26,111,255,.3)',
            }}
          >
            Download Referral PDF
          </a>
        </div>
      )}
    </div>
  );
}
