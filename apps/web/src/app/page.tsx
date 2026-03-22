
import PhoneFrame from '@/components/PhoneFrame';

export const metadata = { title: 'HeartGuard — Monitor your Cardiac Health' };

export default function SplashPage() {
  return (
    <PhoneFrame>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 28px 40px', textAlign: 'center' }}>

        {/* Illustration */}
        <div style={{ marginBottom: 28, position: 'relative', width: 160, height: 160 }}>
          {/* Circle bg */}
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#EEF4FF' }} />
          {/* Heart + ECG SVG */}
          <svg viewBox="0 0 160 160" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            {/* Heart */}
            <path d="M80 118s-38-24-38-52c0-14 10-24 22-24 6 0 12 3 16 8 4-5 10-8 16-8 12 0 22 10 22 24 0 28-38 52-38 52z"
              fill="#FF6B35" />
            {/* ECG line */}
            <path d="M28 80 L50 80 L58 60 L66 100 L74 72 L82 80 L132 80"
              stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            {/* Small stethoscope */}
            <circle cx="116" cy="58" r="10" fill="#1A6FFF" opacity="0.9"/>
            <path d="M112 54 L120 62 M116 50 L116 54" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
            {/* Grass/plant */}
            <path d="M38 122 Q34 108 36 100" stroke="#12B76A" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M36 100 Q30 94 32 88" stroke="#12B76A" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Heading */}
        <h1 style={{ fontSize: 30, fontWeight: 800, lineHeight: 1.2, color: '#0D0D0D', marginBottom: 14 }}>
          Monitor your{' '}
          <span style={{ color: '#FF6B35' }}>Cardiac</span>{' '}
          Health
        </h1>

        {/* Subtext */}
        <p style={{ fontSize: 14, color: '#4A4A5A', lineHeight: 1.6, marginBottom: 10 }}>
          HeartGuard screens for SADS risk. A few questions could save a life —{' '}
          <em>yours or someone you love.</em>
        </p>

        {/* Date badge */}
        <p style={{ fontSize: 12, color: '#9898A8', marginBottom: 4 }}>24 September – 1 October</p>
        <p style={{ fontSize: 13, fontWeight: 700, color: '#0D0D0D', marginBottom: 36 }}>
          &ldquo;Heart Screening Week&rdquo; Ireland
        </p>

        {/* CTA */}
        <a href="/questionnaire" style={{
          display: 'block',
          width: '100%',
          background: '#1A6FFF',
          color: '#fff',
          textAlign: 'center',
          padding: '16px',
          borderRadius: 50,
          fontSize: 15,
          fontWeight: 800,
          letterSpacing: 0.5,
          textDecoration: 'none',
          marginBottom: 20,
        }}>
          GET STARTED
        </a>

        <p style={{ fontSize: 14, color: '#4A4A5A' }}>
          Already screened?{' '}
          <a href="/login" style={{ color: '#1A6FFF', fontWeight: 700, textDecoration: 'none' }}>
            Sign In
          </a>
        </p>
      </div>

      {/* Memorial */}
      <p style={{ textAlign: 'center', fontSize: 11, color: '#9898A8', paddingBottom: 28, fontStyle: 'italic' }}>
        Built in memory of Hassan
      </p>
    </PhoneFrame>
  );
}
