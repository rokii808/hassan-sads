import { createServiceRoleClient } from '@/lib/supabase-server';
import { adminListSubmissions } from '@hassan-sads/db';
import type { RiskLevel } from '@hassan-sads/db';

interface SearchParams {
  risk?: string;
  from?: string;
  to?: string;
  page?: string;
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

export default async function SubmissionsPage({ searchParams }: { searchParams: SearchParams }) {
  const page = Math.max(1, Number(searchParams.page ?? 1));
  const limit = 20;
  const offset = (page - 1) * limit;

  const supabase = createServiceRoleClient();
  const { data: submissions, count } = await adminListSubmissions(supabase, {
    riskLevel: searchParams.risk as RiskLevel | undefined,
    from: searchParams.from,
    to: searchParams.to,
    limit,
    offset,
  });

  const totalPages = Math.ceil((count ?? 0) / limit);

  return (
    <div style={{ padding: '36px 40px', maxWidth: 1100 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
            Records
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--black)', letterSpacing: '-0.03em', margin: 0, marginBottom: 4 }}>
            Submissions
          </h1>
          <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>{count ?? 0} total screening records</p>
        </div>
        <a href="/dashboard/exports" style={{
          padding: '10px 18px', background: 'var(--blue)', color: '#fff',
          borderRadius: 10, textDecoration: 'none', fontSize: 12, fontWeight: 700,
          letterSpacing: '0.06em', textTransform: 'uppercase',
          boxShadow: '0 4px 12px rgba(26,111,255,.3)',
        }}>
          Export Data
        </a>
      </div>

      {/* Filters */}
      <form method="GET" style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <select name="risk" defaultValue={searchParams.risk ?? ''} style={{
          padding: '9px 14px', borderRadius: 10, border: '1.5px solid var(--border)',
          fontSize: 13, fontFamily: 'var(--font)', background: 'var(--white)', color: 'var(--body)', fontWeight: 600,
        }}>
          <option value="">All risk levels</option>
          <option value="high">High</option>
          <option value="moderate">Moderate</option>
          <option value="low">Low</option>
        </select>
        <input type="date" name="from" defaultValue={searchParams.from} style={{
          padding: '9px 14px', borderRadius: 10, border: '1.5px solid var(--border)',
          fontSize: 13, fontFamily: 'var(--font)', background: 'var(--white)',
        }} />
        <input type="date" name="to" defaultValue={searchParams.to} style={{
          padding: '9px 14px', borderRadius: 10, border: '1.5px solid var(--border)',
          fontSize: 13, fontFamily: 'var(--font)', background: 'var(--white)',
        }} />
        <button type="submit" style={{
          padding: '9px 18px', background: 'var(--blue)', color: '#fff',
          border: 'none', borderRadius: 10, fontSize: 12, fontWeight: 700,
          cursor: 'pointer', letterSpacing: '0.06em', fontFamily: 'var(--font)',
        }}>
          Filter
        </button>
        {(searchParams.risk || searchParams.from || searchParams.to) && (
          <a href="/dashboard/submissions" style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600, textDecoration: 'none', padding: '9px 14px' }}>
            Clear
          </a>
        )}
      </form>

      {/* Table */}
      <div style={{ background: 'var(--white)', borderRadius: 16, border: '1.5px solid var(--border)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font)', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'var(--surface)' }}>
              {['ID', 'Submitted', 'Risk', 'Flagged Qs', 'Referral', ''].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 20px', color: 'var(--muted)', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(submissions ?? []).map((sub) => (
              <tr key={sub.id} style={{ borderTop: '1px solid var(--border)' }}>
                <td style={{ padding: '13px 20px', fontFamily: 'monospace', fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>{sub.id.slice(0, 8)}</td>
                <td style={{ padding: '13px 20px', color: 'var(--body)', fontWeight: 500 }}>{new Date(sub.submitted_at).toLocaleDateString('en-IE')}</td>
                <td style={{ padding: '13px 20px' }}>
                  <RiskBadge level={sub.risk_level} />
                </td>
                <td style={{ padding: '13px 20px', fontFamily: 'monospace', fontSize: 11, color: 'var(--muted)' }}>
                  {(sub.flagged_question_ids?.length ?? 0) > 0 ? sub.flagged_question_ids?.join(', ') : '—'}
                </td>
                <td style={{ padding: '13px 20px' }}>
                  {sub.referral_triggered
                    ? <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--green)' }}>✓ Sent</span>
                    : <span style={{ color: 'var(--muted)' }}>—</span>}
                </td>
                <td style={{ padding: '13px 20px' }}>
                  <a href={`/dashboard/submissions/${sub.id}`} style={{
                    fontSize: 12, fontWeight: 700, color: 'var(--blue)', textDecoration: 'none',
                    padding: '5px 12px', border: '1.5px solid var(--blue)', borderRadius: 8,
                  }}>
                    View →
                  </a>
                </td>
              </tr>
            ))}
            {(submissions ?? []).length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: '48px 20px', textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>
                  No submissions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 24 }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <a key={p} href={`?page=${p}&risk=${searchParams.risk ?? ''}`} style={{
              padding: '6px 14px', borderRadius: 8,
              border: p === page ? 'none' : '1.5px solid var(--border)',
              background: p === page ? 'var(--blue)' : 'var(--white)',
              color: p === page ? '#fff' : 'var(--body)',
              fontWeight: 700, fontSize: 13, textDecoration: 'none',
            }}>
              {p}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
