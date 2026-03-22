import { createSupabaseServerClient, createServiceRoleClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import { adminListSubmissions, getResearchCohort } from '@hassan-sads/db';

export default async function DashboardPage() {
  const authClient = createSupabaseServerClient();
  const { data: { session } } = await authClient.auth.getSession();
  if (!session) redirect('/login');

  const supabase = createServiceRoleClient();
  const [{ data: recent, count: totalCount }, { data: cohort }] = await Promise.all([
    adminListSubmissions(supabase, { limit: 5 }),
    getResearchCohort(supabase),
  ]);

  const riskCounts = { high: 0, moderate: 0, low: 0 };
  for (const row of cohort ?? []) {
    riskCounts[row.risk_level]++;
  }

  return (
    <div style={{ padding: '32px 40px', maxWidth: 1200, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--color-navy)', marginBottom: 8 }}>
        Cohort Dashboard
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 32 }}>
        Hassan SADS Screening Research — Ireland
      </p>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 40 }}>
        <StatCard label="Total Screenings" value={totalCount ?? 0} color="var(--color-navy)" />
        <StatCard label="High Risk" value={riskCounts.high} color="var(--color-coral)" />
        <StatCard label="Moderate Risk" value={riskCounts.moderate} color="var(--color-amber)" />
        <StatCard label="Low Risk" value={riskCounts.low} color="var(--color-teal)" />
      </div>

      {/* Recent submissions */}
      <div style={{ background: 'var(--color-card)', borderRadius: 14, border: '1px solid var(--color-border)', padding: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-navy)', marginBottom: 20 }}>
          Recent Submissions
        </h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
              <th style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>ID</th>
              <th style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Date</th>
              <th style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Risk Level</th>
              <th style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Referral</th>
              <th style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(recent ?? []).map((sub) => (
              <tr key={sub.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontSize: 12 }}>{sub.id.slice(0, 8)}…</td>
                <td style={{ padding: '12px' }}>{new Date(sub.submitted_at).toLocaleDateString('en-IE')}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    padding: '3px 10px', borderRadius: 5, fontSize: 12, fontWeight: 700,
                    background: sub.risk_level === 'high' ? '#FAEAE5' : sub.risk_level === 'moderate' ? '#FEF3CD' : '#E6F4F0',
                    color: sub.risk_level === 'high' ? '#C04828' : sub.risk_level === 'moderate' ? '#BA7517' : '#0F6E56',
                  }}>
                    {sub.risk_level.charAt(0).toUpperCase() + sub.risk_level.slice(1)}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>{sub.referral_triggered ? '✓ Sent' : '—'}</td>
                <td style={{ padding: '12px' }}>
                  <a href={`/dashboard/submissions/${sub.id}`} style={{ color: 'var(--color-navy)', fontWeight: 600, textDecoration: 'underline', fontSize: 13 }}>
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: 16, textAlign: 'right' }}>
          <a href="/dashboard/submissions" style={{ color: 'var(--color-navy)', fontWeight: 600, fontSize: 14 }}>
            View all submissions →
          </a>
        </div>
      </div>

      <footer style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--color-border)', textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: 12 }}>
        <em>Built in memory of Hassan — so no family faces this again.</em>
      </footer>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{ background: 'var(--color-card)', borderRadius: 12, border: '1px solid var(--color-border)', padding: '20px 24px' }}>
      <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 6, fontWeight: 500 }}>{label}</p>
      <p style={{ fontSize: 36, fontFamily: 'var(--font-display)', color, lineHeight: 1 }}>{value}</p>
    </div>
  );
}
