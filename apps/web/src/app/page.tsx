import AppShell from '@/components/AppShell';

export const metadata = { title: 'HeartGuard — Monitor your Cardiac Health' };

export default function SplashPage() {
  return (
    <AppShell activeNav="home">
      <div className="app-card" style={{ textAlign: 'center' }}>
        {/* Illustration */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
          <div style={{ width: 120, height: 120, borderRadius: '50%', background: 'var(--blue-lt)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <svg viewBox="0 0 120 120" fill="none" width="120" height="120">
              <path d="M60 95s-30-19-30-42c0-11 8-19 17-19 5 0 9 2.5 13 7 4-4.5 8-7 13-7 9 0 17 8 17 19 0 23-30 42-30 42z" fill="#FF6B35" />
              <path d="M22 60 L38 60 L44 45 L50 75 L56 54 L60 60 L98 60" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <h1 style={{ fontSize: 'clamp(24px,4vw,34px)', fontWeight: 800, color: 'var(--black)', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 14 }}>
          Monitor your <span style={{ color: 'var(--orange)' }}>Cardiac</span> Health
        </h1>

        <p style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.7, marginBottom: 10 }}>
          HeartGuard screens for SADS risk. A few questions could save a life —{' '}
          <em>yours or someone you love.</em>
        </p>

        <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>24 September – 1 October</p>
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--black)', marginBottom: 32 }}>
          &ldquo;Heart Screening Week&rdquo; Ireland
        </p>

        <a href="/questionnaire" className="btn-primary" style={{ marginBottom: 16 }}>
          Get Started
        </a>

        <p style={{ fontSize: 14, color: 'var(--body)' }}>
          Already screened?{' '}
          <a href="/login" style={{ color: 'var(--blue)', fontWeight: 700, textDecoration: 'none' }}>Sign In</a>
        </p>

        <p style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)', fontSize: 11, color: 'var(--muted)', fontStyle: 'italic' }}>
          Built in memory of Hassan — so no family faces this again.
        </p>
      </div>
    </AppShell>
  );
}
