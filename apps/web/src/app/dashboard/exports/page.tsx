import { createSupabaseServerClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';

export default async function ExportsPage() {
  const supabase = createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect('/login');

  return (
    <div style={{ padding: '32px 40px', maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--color-navy)', marginBottom: 8 }}>Research Export</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 32, fontSize: 14 }}>
        Exports are drawn from the anonymised <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--color-surface)', padding: '2px 6px', borderRadius: 4 }}>research_cohort</code> table.
        No personally identifiable information (PII) is ever included in exports.
      </p>

      <div style={{ background: 'var(--color-card)', borderRadius: 14, border: '1px solid var(--color-border)', padding: 32 }}>
        <form action="/api/export" method="GET" target="_blank">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>From (month)</label>
              <input type="month" name="from" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid var(--color-border)', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>To (month)</label>
              <input type="month" name="to" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid var(--color-border)', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Age Band</label>
            <select name="age_band" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid var(--color-border)', fontSize: 14 }}>
              <option value="all">All ages</option>
              <option value="12-17">12–17 years</option>
              <option value="18-25">18–25 years</option>
              <option value="26-35">26–35 years</option>
              <option value="36+">36+ years</option>
            </select>
          </div>

          <div style={{ marginBottom: 32 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Export Format</label>
            <div style={{ display: 'flex', gap: 12 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14 }}>
                <input type="radio" name="format" value="csv" defaultChecked /> CSV
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14 }}>
                <input type="radio" name="format" value="json" /> JSON
              </label>
            </div>
          </div>

          <button type="submit" style={{ width: '100%', padding: '13px', background: 'var(--color-navy)', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
            Download Export
          </button>
        </form>
      </div>

      <div style={{ marginTop: 24, padding: 16, background: '#FEF3CD', borderRadius: 10, border: '1px solid #BA7517' }}>
        <p style={{ fontSize: 13, color: '#7A4E0A', margin: 0 }}>
          <strong>Researcher note:</strong> All exports are logged for GDPR audit purposes. Exports must only be used for SADS prevention research as agreed in your research data agreement. Contact the data steward for queries.
        </p>
      </div>
    </div>
  );
}
