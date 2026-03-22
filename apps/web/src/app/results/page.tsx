
import PhoneFrame from '@/components/PhoneFrame';

export const metadata = { title: 'HeartGuard — Your Cardiac Risk Report' };

function EcgLine() {
  return (
    <svg viewBox="0 0 280 60" fill="none" style={{ width: '100%', height: 60 }}>
      <path
        d="M0 30 L30 30 L42 30 L50 30 L56 12 L62 48 L68 18 L74 30 L86 30 L92 30 L98 30 L104 30 L108 8 L112 52 L116 28 L120 30 L140 30 L150 30 L158 14 L164 46 L170 20 L176 30 L196 30 L204 30 L210 30 L216 10 L220 50 L224 26 L228 30 L260 30 L280 30"
        stroke="#FF6B35"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ResultsPage() {
  return (
    <PhoneFrame>
      {/* Back */}
      <div style={{ padding: '12px 24px 0' }}>
        <a href="/questionnaire" style={{ color: '#0D0D0D', fontSize: 20, textDecoration: 'none' }}>‹</a>
      </div>

      <div style={{ flex: 1, padding: '16px 24px 32px', overflowY: 'auto' }}>
        {/* Title */}
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0D0D0D', lineHeight: 1.2, marginBottom: 4 }}>
          Your Cardiac{' '}
          <span style={{ color: '#FF6B35' }}>Risk<br />Report</span>
        </h1>
        <p style={{ fontSize: 12, color: '#9898A8', marginBottom: 20 }}>
          HeartGuard SADS screening — 5 October 2025
        </p>

        {/* Risk Level Card */}
        <div style={{
          border: '1.5px solid #E8E8F0', borderRadius: 16, padding: '18px 18px 16px',
          marginBottom: 14, background: '#fff',
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#9898A8', letterSpacing: 0.8, marginBottom: 8, textTransform: 'uppercase' }}>
            Risk Level
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: 48, fontWeight: 800, color: '#FF6B35', lineHeight: 1 }}>Med</span>
              <span style={{ fontSize: 24, fontWeight: 700, color: '#FF6B35' }}>ium</span>
            </div>
            <div style={{
              background: '#FF6B35', color: '#fff', padding: '6px 12px',
              borderRadius: 20, fontSize: 12, fontWeight: 800, letterSpacing: 0.3,
            }}>
              SEE GP
            </div>
          </div>
          <p style={{ fontSize: 12, color: '#4A4A5A', marginTop: 8, marginBottom: 14 }}>
            2 of 7 key flags detected
          </p>

          {/* Flag pills */}
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ background: '#FFF3EE', border: '1px solid #FFCFB8', borderRadius: 8, padding: '6px 10px', textAlign: 'center' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#FF6B35', marginBottom: 2 }}>Q11</p>
              <p style={{ fontSize: 10, color: '#9898A8' }}>Syncope</p>
            </div>
            <div style={{ background: '#FFF3EE', border: '1px solid #FFCFB8', borderRadius: 8, padding: '6px 10px', textAlign: 'center' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#FF6B35', marginBottom: 2 }}>Q15</p>
              <p style={{ fontSize: 10, color: '#9898A8' }}>Family Hx</p>
            </div>
            <div style={{ background: '#F6F6FA', border: '1px solid #E8E8F0', borderRadius: 8, padding: '6px 10px', textAlign: 'center', flex: 1 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#12B76A', marginBottom: 2 }}>None</p>
              <p style={{ fontSize: 10, color: '#9898A8' }}>ECG flag</p>
            </div>
          </div>
        </div>

        {/* Cardiac Trend Card */}
        <div style={{ border: '1.5px solid #E8E8F0', borderRadius: 16, padding: '16px', marginBottom: 14, background: '#fff' }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#0D0D0D', marginBottom: 10 }}>Today&apos;s Cardiac Trend</p>

          {/* Day/Week tabs */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
            {['Day', 'Week', 'Month', 'Year'].map((tab) => (
              <button key={tab} style={{
                padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                background: tab === 'Day' ? '#1A6FFF' : 'transparent',
                color: tab === 'Day' ? '#fff' : '#9898A8',
                border: 'none', cursor: 'pointer', fontFamily: 'var(--font)',
              }}>{tab}</button>
            ))}
          </div>

          <EcgLine />

          {/* Day labels */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
              <span key={d} style={{ fontSize: 10, color: '#9898A8' }}>{d}</span>
            ))}
          </div>
        </div>

        {/* Irish Heart Foundation */}
        <div style={{ border: '1.5px solid #E8E8F0', borderRadius: 16, padding: '14px 16px', marginBottom: 20, background: '#fff', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#FF6B35', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 18 }}>🫀</span>
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#0D0D0D', marginBottom: 2 }}>Irish Heart Foundation</p>
            <p style={{ fontSize: 12, color: '#9898A8' }}>SADS family support &amp; referral</p>
          </div>
          <span style={{ marginLeft: 'auto', color: '#9898A8' }}>›</span>
        </div>

        {/* Action buttons */}
        <button style={{
          width: '100%', padding: '15px', background: '#1A6FFF',
          color: '#fff', border: 'none', borderRadius: 50,
          fontSize: 14, fontWeight: 800, cursor: 'pointer',
          letterSpacing: 0.3, fontFamily: 'var(--font)', marginBottom: 10,
        }}>
          DOWNLOAD REFERRAL REPORT
        </button>
        <button style={{
          width: '100%', padding: '15px', background: '#fff',
          color: '#0D0D0D', border: '2px solid #E8E8F0', borderRadius: 50,
          fontSize: 14, fontWeight: 700, cursor: 'pointer',
          letterSpacing: 0.3, fontFamily: 'var(--font)',
        }}>
          WITHDRAW MY DATA
        </button>
      </div>
    </PhoneFrame>
  );
}
