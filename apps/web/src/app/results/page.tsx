import AppShell from '@/components/AppShell';

export const metadata = { title: 'HeartGuard — Your Cardiac Risk Report' };

function EcgLine() {
  return (
    <svg viewBox="0 0 320 60" fill="none" style={{ width: '100%', height: 56 }}>
      <path d="M0 30 L35 30 L48 30 L58 30 L65 10 L72 50 L79 18 L86 30 L105 30 L115 30 L122 30 L130 30 L136 6 L141 54 L146 24 L151 30 L178 30 L190 30 L200 12 L207 48 L214 20 L220 30 L245 30 L257 30 L265 30 L272 8 L278 52 L283 26 L288 30 L320 30"
        stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ResultsPage() {
  return (
    <AppShell activeNav="results">
      <div className="app-card">
        <a href="/questionnaire" style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 600, textDecoration: 'none', display: 'inline-block', marginBottom: 20 }}>← Back</a>

        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--black)', lineHeight: 1.2, marginBottom: 4, letterSpacing: '-0.02em' }}>
          Your Cardiac <span style={{ color: 'var(--orange)' }}>Risk Report</span>
        </h1>
        <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 24 }}>HeartGuard SADS screening — 5 October 2025</p>

        {/* Risk card */}
        <div style={{ border: '1.5px solid var(--border)', borderRadius: 16, padding: '20px', marginBottom: 14 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Risk Level</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 8 }}>
            <div>
              <span style={{ fontSize: 44, fontWeight: 800, color: 'var(--orange)', lineHeight: 1 }}>Med</span>
              <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--orange)' }}>ium</span>
            </div>
            <div style={{ background: 'var(--orange)', color: '#fff', padding: '7px 14px', borderRadius: 20, fontSize: 12, fontWeight: 800 }}>SEE GP</div>
          </div>
          <p style={{ fontSize: 12, color: 'var(--body)', marginBottom: 14 }}>2 of 7 key flags detected</p>

          <div style={{ display: 'flex', gap: 8 }}>
            {[{ label: 'Q11', sub: 'Syncope', orange: true }, { label: 'Q15', sub: 'Family Hx', orange: true }, { label: 'None', sub: 'ECG flag', green: true }].map(c => (
              <div key={c.label} className="chip" style={{ background: c.orange ? 'var(--orange-lt)' : c.green ? '#ECFDF5' : 'var(--surface)', border: `1px solid ${c.orange ? '#FFCFB8' : c.green ? '#A7F3D0' : 'var(--border)'}`, flex: c.green ? 1 : undefined }}>
                <div className="chip-label" style={{ color: c.orange ? 'var(--orange)' : c.green ? 'var(--green)' : 'var(--black)' }}>{c.label}</div>
                <div className="chip-sub">{c.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ECG chart */}
        <div style={{ border: '1.5px solid var(--border)', borderRadius: 16, padding: '16px 18px', marginBottom: 14 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--black)', marginBottom: 10 }}>Today&apos;s Cardiac Trend</p>
          <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
            {['Day', 'Week', 'Month', 'Year'].map(t => (
              <button key={t} style={{ padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: t === 'Day' ? 'var(--blue)' : 'transparent', color: t === 'Day' ? '#fff' : 'var(--muted)', border: 'none', cursor: 'pointer', fontFamily: 'var(--font)' }}>{t}</button>
            ))}
          </div>
          <EcgLine />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
              <span key={d} style={{ fontSize: 10, color: 'var(--muted)' }}>{d}</span>
            ))}
          </div>
        </div>

        {/* Irish Heart Foundation */}
        <div style={{ border: '1.5px solid var(--border)', borderRadius: 16, padding: '14px 18px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--orange)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🫀</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--black)', marginBottom: 2 }}>Irish Heart Foundation</p>
            <p style={{ fontSize: 12, color: 'var(--muted)' }}>SADS family support &amp; referral</p>
          </div>
          <span style={{ color: 'var(--muted)' }}>›</span>
        </div>

        <button className="btn-primary" style={{ marginBottom: 10 }}>Download Referral Report</button>
        <button className="btn-outline">Withdraw My Data</button>
      </div>
    </AppShell>
  );
}
