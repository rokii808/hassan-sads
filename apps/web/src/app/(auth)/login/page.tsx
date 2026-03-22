import { createSupabaseServerClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const supabase = createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (session) redirect('/dashboard');

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-surface)' }}>
      <div style={{ background: 'var(--color-card)', borderRadius: 16, padding: '40px 36px', width: '100%', maxWidth: 400, boxShadow: '0 4px 32px rgba(10,22,40,0.1)', border: '1px solid var(--color-border)' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--color-navy)', marginBottom: 6 }}>
            Hassan SADS
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 14 }}>
            Admin Portal — Researcher &amp; Clinician Access
          </p>
        </div>

        <form action="/api/auth/login" method="POST">
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--color-navy)', marginBottom: 6 }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="researcher@hospital.ie"
              style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid var(--color-border)', fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--color-navy)', marginBottom: 6 }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid var(--color-border)', fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <button
            type="submit"
            style={{ width: '100%', padding: '12px', background: 'var(--color-navy)', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-body)' }}
          >
            Sign In
          </button>
        </form>

        <p style={{ marginTop: 24, fontSize: 12, color: 'var(--color-text-secondary)', textAlign: 'center' }}>
          Access is restricted to authorised researchers and clinicians.
          <br />Contact the research team if you need access.
        </p>

        <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--color-border)', textAlign: 'center' }}>
          <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
            <em>Built in memory of Hassan.</em>
          </p>
        </div>
      </div>
    </main>
  );
}
