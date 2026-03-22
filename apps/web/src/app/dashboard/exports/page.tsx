export default function ExportsPage() {
  return (
    <div style={{ padding: '36px 40px', maxWidth: 800 }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
          Data Export
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--black)', letterSpacing: '-0.03em', margin: 0, marginBottom: 6 }}>
          Research Export
        </h1>
        <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>
          Exports are drawn from the anonymised <code style={{ fontFamily: 'monospace', background: 'var(--surface)', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>research_cohort</code> table. No PII included.
        </p>
      </div>

      <div style={{ background: 'var(--white)', borderRadius: 16, border: '1.5px solid var(--border)', padding: 32, marginBottom: 16 }}>
        <form action="/api/export" method="GET" target="_blank">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--body)', marginBottom: 6, letterSpacing: '0.02em' }}>From (month)</label>
              <input type="month" name="from" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1.5px solid var(--border)', fontSize: 13, fontFamily: 'var(--font)', boxSizing: 'border-box' as const, background: 'var(--white)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--body)', marginBottom: 6 }}>To (month)</label>
              <input type="month" name="to" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1.5px solid var(--border)', fontSize: 13, fontFamily: 'var(--font)', boxSizing: 'border-box' as const, background: 'var(--white)' }} />
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--body)', marginBottom: 6 }}>Age Band</label>
            <select name="age_band" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1.5px solid var(--border)', fontSize: 13, fontFamily: 'var(--font)', background: 'var(--white)' }}>
              <option value="all">All ages</option>
              <option value="12-17">12–17 years</option>
              <option value="18-25">18–25 years</option>
              <option value="26-35">26–35 years</option>
              <option value="36+">36+ years</option>
            </select>
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--body)', marginBottom: 10 }}>Export Format</label>
            <div style={{ display: 'flex', gap: 12 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600, color: 'var(--body)' }}>
                <input type="radio" name="format" value="csv" defaultChecked /> CSV
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600, color: 'var(--body)' }}>
                <input type="radio" name="format" value="json" /> JSON
              </label>
            </div>
          </div>

          <button type="submit" style={{
            width: '100%', padding: '13px', background: 'var(--blue)', color: '#fff',
            border: 'none', borderRadius: 12, fontSize: 13, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'var(--font)', letterSpacing: '0.05em', textTransform: 'uppercase',
            boxShadow: '0 4px 14px rgba(26,111,255,.35)',
          }}>
            Download Export
          </button>
        </form>
      </div>

      <div style={{ padding: '14px 18px', background: '#FFFBEB', borderRadius: 12, border: '1.5px solid #F59E0B44', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <span style={{ fontSize: 16, flexShrink: 0 }}>⚠️</span>
        <p style={{ fontSize: 12, color: '#92400E', margin: 0, lineHeight: 1.6 }}>
          <strong>Researcher note:</strong> All exports are logged for GDPR audit purposes. Use only for SADS prevention research as agreed in your data agreement.
        </p>
      </div>
    </div>
  );
}
