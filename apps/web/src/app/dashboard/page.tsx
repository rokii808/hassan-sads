export const dynamic = 'force-dynamic';

import { createServiceRoleClient } from '@/lib/supabase-server';
import { adminListSubmissions, getResearchCohort } from '@hassan-sads/db';

export default async function DashboardPage() {
  let recent: Awaited<ReturnType<typeof adminListSubmissions>>['data'] = null;
  let totalCount: number | null = 0;
  let riskCounts = { high: 0, moderate: 0, low: 0 };
  let dbError = false;

  try {
    const supabase = createServiceRoleClient();
    const [submissionsResult, cohortResult] = await Promise.all([
      adminListSubmissions(supabase, { limit: 5 }),
      getResearchCohort(supabase),
    ]);
    recent = submissionsResult.data;
    totalCount = submissionsResult.count;
    for (const row of cohortResult.data ?? []) {
      riskCounts[row.risk_level as keyof typeof riskCounts]++;
    }
  } catch {
    dbError = true;
  }

  return (
    <div style={{ padding: '36px 40px', maxWidth: 1100 }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
          Research Dashboard
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--black)', letterSpacing: '-0.03em', margin: 0, marginBottom: 4 }}>
          Cohort Overview
        </h1>
        <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>
          Hassan SADS Cardiac Screening — Ireland
        </p>
      </div>

      {dbError && (
        <div style={{ marginBottom: 24, padding: '12px 18px', background: '#FFFBEB', border: '1.5px solid #F59E0B44', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 16 }}>⚠️</span>
          <span style={{ fontSize: 13, color: '#92400E', fontWeight: 600 }}>
            Database not connected — add <code style={{ background: '#FEF3C7', padding: '1px 5px', borderRadius: 4 }}>SUPABASE_*</code> env vars in Vercel to see live data.
          </span>
        </div>
      )}

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        <StatCard label="Total Screenings" value={totalCount ?? 0} accent="var(--blue)" bg="var(--blue-lt)" />
        <StatCard label="High Risk" value={riskCounts.high} accent="#FF6B35" bg="#FFF3EE" />
        <StatCard label="Moderate Risk" value={riskCounts.moderate} accent="var(--amber)" bg="var(--amber-lt)" />
        <StatCard label="Low Risk" value={riskCounts.low} accent="var(--green)" bg="var(--green-lt)" />
      </div>

      {/* Recent submissions */}
      <div style={{ background: 'var(--white)', borderRadius: 16, border: '1.5px solid var(--border)' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1.5px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--black)', letterSpacing: '-0.02em' }}>Recent Submissions</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>Latest 5 screening records</div>
          </div>
          <a href="/dashboard/submissions" style={{
            padding: '8px 16px', background: 'var(--blue)', color: '#fff',
            borderRadius: 10, textDecoration: 'none', fontSize: 12, fontWeight: 700,
            letterSpacing: '0.04em', boxShadow: '0 4px 12px rgba(26,111,255,.3)',
          }}>
            View All
          </a>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font)', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'var(--surface)' }}>
              {['ID', 'Date', 'Risk Level', 'Flags', 'Referral', ''].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 20px', color: 'var(--muted)', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(recent ?? []).map((sub) => (
              <tr key={sub.id} style={{ borderTop: '1px solid var(--border)' }}>
                <td style={{ padding: '14px 20px', fontFamily: 'monospace', fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>{sub.id.slice(0, 8)}…</td>
                <td style={{ padding: '14px 20px', color: 'var(--body)', fontWeight: 500 }}>{new Date(sub.submitted_at).toLocaleDateString('en-IE')}</td>
                <td style={{ padding: '14px 20px' }}>
                  <RiskBadge level={sub.risk_level} />
                </td>
                <td style={{ padding: '14px 20px', fontFamily: 'monospace', fontSize: 11, color: 'var(--muted)' }}>
                  {(sub.flagged_question_ids?.length ?? 0) > 0 ? sub.flagged_question_ids?.join(', ') : '—'}
                </td>
                <td style={{ padding: '14px 20px' }}>
                  {sub.referral_triggered
                    ? <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--green)' }}>✓ Sent</span>
                    : <span style={{ color: 'var(--muted)' }}>—</span>}
                </td>
                <td style={{ padding: '14px 20px' }}>
                  <a href={`/dashboard/submissions/${sub.id}`} style={{
                    fontSize: 12, fontWeight: 700, color: 'var(--blue)', textDecoration: 'none',
                    padding: '5px 12px', border: '1.5px solid var(--blue)', borderRadius: 8,
                  }}>
                    View →
                  </a>
                </td>
              </tr>
            ))}
            {(recent ?? []).length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>
                  No submissions yet — data will appear here once the database is connected.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ label, value, accent, bg }: { label: string; value: number; accent: string; bg: string }) {
  return (
    <div style={{ background: 'var(--white)', borderRadius: 14, border: '1.5px solid var(--border)', padding: '20px 22px' }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: accent }} />
      </div>
      <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--black)', letterSpacing: '-0.04em', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6, fontWeight: 500 }}>{label}</div>
    </div>
  );
}

function RiskBadge({ level }: { level: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    high: { bg: '#FFF3EE', color: '#FF6B35' },
    moderate: { bg: '#FFFBEB', color: '#D97706' },
    low: { bg: '#ECFDF5', color: '#059669' },
  };
  const s = map[level] ?? { bg: '#ECFDF5', color: '#059669' };
  return (
    <span style={{ padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700, background: s.bg, color: s.color, border: `1px solid ${s.color}33` }}>
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>
  );
}
