import { createSupabaseServerClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import { adminListSubmissions } from '@hassan-sads/db';
import type { RiskLevel } from '@hassan-sads/db';

interface SearchParams {
  risk?: string;
  from?: string;
  to?: string;
  page?: string;
}

export default async function SubmissionsPage({ searchParams }: { searchParams: SearchParams }) {
  const supabase = createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect('/login');

  const page = Math.max(1, Number(searchParams.page ?? 1));
  const limit = 20;
  const offset = (page - 1) * limit;

  const { data: submissions, count } = await adminListSubmissions(supabase, {
    riskLevel: searchParams.risk as RiskLevel | undefined,
    from: searchParams.from,
    to: searchParams.to,
    limit,
    offset,
  });

  const totalPages = Math.ceil((count ?? 0) / limit);

  return (
    <div style={{ padding: '32px 40px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--color-navy)', marginBottom: 4 }}>Submissions</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 14 }}>{count ?? 0} total records</p>
        </div>
        <a href="/dashboard/exports" style={{ padding: '10px 20px', background: 'var(--color-navy)', color: '#fff', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>
          Export Data
        </a>
      </div>

      {/* Filters */}
      <form method="GET" style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <select name="risk" defaultValue={searchParams.risk ?? ''} style={{ padding: '8px 12px', borderRadius: 8, border: '1.5px solid var(--color-border)', fontSize: 14, fontFamily: 'var(--font-body)' }}>
          <option value="">All risk levels</option>
          <option value="high">High</option>
          <option value="moderate">Moderate</option>
          <option value="low">Low</option>
        </select>
        <input type="date" name="from" defaultValue={searchParams.from} style={{ padding: '8px 12px', borderRadius: 8, border: '1.5px solid var(--color-border)', fontSize: 14 }} />
        <input type="date" name="to" defaultValue={searchParams.to} style={{ padding: '8px 12px', borderRadius: 8, border: '1.5px solid var(--color-border)', fontSize: 14 }} />
        <button type="submit" style={{ padding: '8px 18px', background: 'var(--color-navy)', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          Filter
        </button>
      </form>

      {/* Table */}
      <div style={{ background: 'var(--color-card)', borderRadius: 14, border: '1px solid var(--color-border)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, fontFamily: 'var(--font-body)' }}>
          <thead style={{ background: 'var(--color-surface)' }}>
            <tr>
              {['ID', 'Submitted', 'Risk', 'Flags', 'Referral', ''].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--color-text-secondary)', fontWeight: 600, fontSize: 13 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(submissions ?? []).map((sub) => (
              <tr key={sub.id} style={{ borderTop: '1px solid var(--color-border)' }}>
                <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: 12 }}>{sub.id.slice(0, 8)}</td>
                <td style={{ padding: '12px 16px' }}>{new Date(sub.submitted_at).toLocaleDateString('en-IE')}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{
                    padding: '2px 8px', borderRadius: 4, fontSize: 12, fontWeight: 700,
                    background: sub.risk_level === 'high' ? '#FAEAE5' : sub.risk_level === 'moderate' ? '#FEF3CD' : '#E6F4F0',
                    color: sub.risk_level === 'high' ? '#C04828' : sub.risk_level === 'moderate' ? '#BA7517' : '#0F6E56',
                  }}>
                    {sub.risk_level}
                  </span>
                </td>
                <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                  {sub.flagged_question_ids?.join(', ') ?? '—'}
                </td>
                <td style={{ padding: '12px 16px' }}>{sub.referral_triggered ? '✓' : '—'}</td>
                <td style={{ padding: '12px 16px' }}>
                  <a href={`/dashboard/submissions/${sub.id}`} style={{ color: 'var(--color-navy)', fontWeight: 600, fontSize: 13, textDecoration: 'underline' }}>View</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <a key={p} href={`?page=${p}&risk=${searchParams.risk ?? ''}`} style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid var(--color-border)', background: p === page ? 'var(--color-navy)' : '#fff', color: p === page ? '#fff' : 'var(--color-navy)', fontWeight: 600, fontSize: 13, textDecoration: 'none' }}>
            {p}
          </a>
        ))}
      </div>
    </div>
  );
}
