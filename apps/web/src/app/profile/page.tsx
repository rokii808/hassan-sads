import PhoneFrame from '@/components/PhoneFrame';

export const metadata = { title: 'HeartGuard — Profile' };

const MENU_ITEMS = [
  { icon: '📱', label: 'My Devices' },
  { icon: '📄', label: 'My Screenings' },
  { icon: '👤', label: 'My Contacts' },
  { icon: '⚙️', label: 'Settings' },
];

const NAV_LEFT = [
  { icon: '🏠', label: 'Home', href: '/' },
  { icon: '📋', label: 'History', href: '/results' },
];

const NAV_RIGHT = [
  { icon: '📞', label: 'Contacts', href: '#', active: false },
  { icon: '👤', label: 'Profile', href: '/profile', active: true },
];

export default function ProfilePage() {
  return (
    <PhoneFrame>
      {/* Back */}
      <div style={{ padding: '12px 24px 0' }}>
        <a href="/results" style={{ color: '#0D0D0D', fontSize: 20, textDecoration: 'none' }}>‹</a>
      </div>

      <div style={{ flex: 1, padding: '20px 24px 0', overflowY: 'auto' }}>
        {/* Avatar */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ position: 'relative', marginBottom: 12 }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: '#7C3AED', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 28, fontWeight: 800, color: '#fff',
            }}>
              S
            </div>
            <div style={{
              position: 'absolute', bottom: 0, right: 0,
              width: 22, height: 22, borderRadius: '50%',
              background: '#1A6FFF', display: 'flex', alignItems: 'center',
              justifyContent: 'center', border: '2px solid #fff', cursor: 'pointer',
            }}>
              <span style={{ fontSize: 10, color: '#fff' }}>✏️</span>
            </div>
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0D0D0D', marginBottom: 4 }}>Sarah O&apos;Brien</h2>
          <p style={{ fontSize: 12, color: '#9898A8' }}>@emailuser &middot; sarah@example.ie</p>
        </div>

        {/* Main menu */}
        <div style={{ border: '1.5px solid #E8E8F0', borderRadius: 16, overflow: 'hidden', marginBottom: 14 }}>
          {MENU_ITEMS.map((item, i) => (
            <div key={item.label} style={{
              display: 'flex', alignItems: 'center', padding: '16px 18px',
              borderBottom: i < MENU_ITEMS.length - 1 ? '1px solid #E8E8F0' : 'none',
              cursor: 'pointer', background: '#fff',
            }}>
              <span style={{ fontSize: 18, marginRight: 14 }}>{item.icon}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#0D0D0D', flex: 1 }}>{item.label}</span>
              <span style={{ color: '#9898A8' }}>›</span>
            </div>
          ))}
        </div>

        {/* Sign Out */}
        <div style={{ border: '1.5px solid #E8E8F0', borderRadius: 16, overflow: 'hidden', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '16px 18px', cursor: 'pointer', background: '#fff' }}>
            <span style={{ fontSize: 18, marginRight: 14 }}>🚪</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#FF6B35', flex: 1 }}>Sign Out</span>
            <span style={{ color: '#FF6B35' }}>›</span>
          </div>
        </div>

        {/* GDPR info */}
        <div style={{
          background: '#EEF4FF', border: '1px solid #DBEAFE', borderRadius: 12,
          padding: '12px 14px', marginBottom: 24,
        }}>
          <p style={{ fontSize: 12, color: '#1A6FFF', lineHeight: 1.6, margin: 0 }}>
            ✓ GDPR consent active &middot; Data withdrawal available anytime &middot; Irish data law compliant
          </p>
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-around',
        padding: '10px 20px 24px', borderTop: '1px solid #E8E8F0',
        background: '#fff', flexShrink: 0,
      }}>
        {NAV_LEFT.map((item) => (
          <a key={item.label} href={item.href} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, textDecoration: 'none' }}>
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <span style={{ fontSize: 10, color: '#9898A8', fontWeight: 600 }}>{item.label}</span>
          </a>
        ))}

        {/* Plus button */}
        <a href="/questionnaire" style={{
          width: 52, height: 52, borderRadius: '50%',
          background: '#FF6B35', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: 26, color: '#fff',
          fontWeight: 300, textDecoration: 'none', lineHeight: 1,
          boxShadow: '0 4px 12px rgba(255,107,53,0.35)',
        }}>
          +
        </a>

        {NAV_RIGHT.map((item) => (
          <a key={item.label} href={item.href} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, textDecoration: 'none' }}>
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <span style={{ fontSize: 10, color: item.active ? '#1A6FFF' : '#9898A8', fontWeight: 600 }}>{item.label}</span>
          </a>
        ))}
      </div>
    </PhoneFrame>
  );
}
