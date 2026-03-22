import AppShell from '@/components/AppShell';

export const metadata = { title: 'HeartGuard — Profile' };

const MENU = [
  { icon: '📱', label: 'My Devices' },
  { icon: '📄', label: 'My Screenings' },
  { icon: '👤', label: 'My Contacts' },
  { icon: '⚙️', label: 'Settings' },
];

export default function ProfilePage() {
  return (
    <AppShell activeNav="profile">
      <div className="app-card">
        {/* Avatar */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28 }}>
          <div style={{ position: 'relative', marginBottom: 12 }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg,#667eea,#764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 800, color: '#fff', boxShadow: '0 4px 14px rgba(102,126,234,.4)' }}>
              S
            </div>
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 22, height: 22, borderRadius: '50%', background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff', cursor: 'pointer', fontSize: 10 }}>
              ✏️
            </div>
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--black)', letterSpacing: '-0.01em', marginBottom: 4 }}>Sarah O&apos;Brien</h2>
          <p style={{ fontSize: 12, color: 'var(--muted)' }}>@emailuser · sarah@example.ie</p>
        </div>

        {/* Menu */}
        <div className="menu-list" style={{ marginBottom: 12 }}>
          {MENU.map(item => (
            <div key={item.label} className="menu-item">
              <span className="menu-item-icon">{item.icon}</span>
              <span className="menu-item-label">{item.label}</span>
              <span className="menu-item-chevron">›</span>
            </div>
          ))}
        </div>

        {/* Sign out */}
        <div className="menu-list" style={{ marginBottom: 20 }}>
          <div className="menu-item">
            <span className="menu-item-icon">🚪</span>
            <span className="menu-item-label danger">Sign Out</span>
            <span style={{ color: 'var(--orange)' }}>›</span>
          </div>
        </div>

        {/* GDPR */}
        <div className="info-box">
          ✓ GDPR consent active · Data withdrawal available anytime · Irish data law compliant
        </div>
      </div>
    </AppShell>
  );
}
