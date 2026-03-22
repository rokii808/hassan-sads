
import PhoneFrame from '@/components/PhoneFrame';

export const metadata = { title: 'HeartGuard — Sign In' };

export default function LoginPage() {
  return (
    <PhoneFrame>
      {/* Back */}
      <div style={{ padding: '12px 24px 0' }}>
        <a href="/" style={{ color: '#0D0D0D', fontSize: 20, textDecoration: 'none' }}>‹</a>
      </div>

      <div style={{ flex: 1, padding: '16px 28px 32px', overflowY: 'auto' }}>
        {/* Header */}
        <p style={{ color: '#1A6FFF', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>HeartGuard</p>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0D0D0D', marginBottom: 4 }}>Welcome back</h1>
        <p style={{ fontSize: 13, color: '#9898A8', fontStyle: 'italic', marginBottom: 24 }}>
          &ldquo;Every heartbeat matters.&rdquo;
        </p>

        {/* SSO buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
          <button style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '12px', border: '1.5px solid #E8E8F0', borderRadius: 12,
            background: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font)',
          }}>
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            Google
          </button>
          <button style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '12px', border: '1.5px solid #E8E8F0', borderRadius: 12,
            background: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font)',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </button>
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: '#E8E8F0' }} />
          <span style={{ fontSize: 12, color: '#9898A8' }}>Enter your details</span>
          <div style={{ flex: 1, height: 1, background: '#E8E8F0' }} />
        </div>

        {/* Form */}
        <form action="/api/auth/login" method="POST">
          <div style={{ marginBottom: 14 }}>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                name="email"
                defaultValue="user@heartguard.ie"
                placeholder="user@heartguard.ie"
                style={{
                  width: '100%', padding: '13px 42px 13px 16px',
                  border: '1.5px solid #1A6FFF', borderRadius: 12,
                  fontSize: 14, fontFamily: 'var(--font)', outline: 'none',
                  color: '#0D0D0D', background: '#fff',
                }}
              />
              <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: '#9898A8', cursor: 'pointer', fontSize: 16 }}>✕</span>
            </div>
          </div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                style={{
                  width: '100%', padding: '13px 42px 13px 16px',
                  border: '1.5px solid #E8E8F0', borderRadius: 12,
                  fontSize: 14, fontFamily: 'var(--font)', outline: 'none',
                  color: '#0D0D0D', background: '#fff',
                }}
              />
              <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: '#9898A8', cursor: 'pointer', fontSize: 16 }}>✕</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#4A4A5A', cursor: 'pointer' }}>
              <input type="checkbox" style={{ accentColor: '#1A6FFF' }} />
              Remember me
            </label>
            <a href="/forgot-password" style={{ fontSize: 13, color: '#1A6FFF', fontWeight: 600, textDecoration: 'none' }}>
              Forgot password?
            </a>
          </div>

          {/* Age warning */}
          <div style={{
            background: '#EEF4FF', borderRadius: 10, padding: '12px 14px',
            marginBottom: 20, border: '1px solid #DBEAFE',
          }}>
            <p style={{ fontSize: 12, color: '#1A6FFF', lineHeight: 1.5, margin: 0 }}>
              <strong>Ages 12–17:</strong> Please complete this with a parent or guardian. Your data is protected under Irish GDPR law.
            </p>
          </div>

          <button
            type="submit"
            style={{
              width: '100%', padding: '15px', background: '#1A6FFF',
              color: '#fff', border: 'none', borderRadius: 50,
              fontSize: 15, fontWeight: 800, cursor: 'pointer',
              letterSpacing: 0.5, fontFamily: 'var(--font)',
            }}
          >
            SIGN IN
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: '#4A4A5A' }}>
          No account?{' '}
          <a href="/register" style={{ color: '#1A6FFF', fontWeight: 700, textDecoration: 'none' }}>
            Register Here
          </a>
        </p>
      </div>
    </PhoneFrame>
  );
}
