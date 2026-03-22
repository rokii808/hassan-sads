export default function AppShell({
  children,
  activeNav,
  hideNav,
}: {
  children: React.ReactNode;
  activeNav?: 'home' | 'results' | 'questionnaire' | 'profile';
  hideNav?: boolean;
}) {
  return (
    <div className="app-root">
      {/* Desktop top nav */}
      {!hideNav && (
        <nav className="app-topnav">
          <a href="/" className="app-topnav-logo">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill="#FF6B35" />
              <path d="M14 21s-7-4.5-7-9.5c0-2.5 1.8-4.5 4-4.5 1.1 0 2.2.6 3 1.5.8-.9 1.9-1.5 3-1.5 2.2 0 4 2 4 4.5 0 5-7 9.5-7 9.5z" fill="#fff" />
              <path d="M8 14 L10 14 L11.5 11 L13 17 L14.5 13 L15.5 14 L20 14" stroke="rgba(255,107,53,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Heart<em>Guard</em></span>
          </a>
          <div className="app-topnav-links">
            <a href="/" className={activeNav === 'home' ? 'active' : ''}>Home</a>
            <a href="/questionnaire" className={activeNav === 'questionnaire' ? 'active' : ''}>Screening</a>
            <a href="/results" className={activeNav === 'results' ? 'active' : ''}>Results</a>
            <a href="/profile" className={activeNav === 'profile' ? 'active' : ''}>Profile</a>
            <a href="/dashboard" style={{ marginLeft: 8, background: 'rgba(255,255,255,0.08)', color: '#fff', padding: '7px 14px', borderRadius: 8 }}>
              Admin →
            </a>
          </div>
        </nav>
      )}

      {/* Page content */}
      <main className="app-content">
        {children}
      </main>

      {/* Mobile bottom nav */}
      {!hideNav && (
        <div className="app-bottomnav">
          <div className="app-bottomnav-inner">
            <a href="/" className={activeNav === 'home' ? 'active' : ''}>
              <span>🏠</span>
              <span>Home</span>
            </a>
            <a href="/results" className={activeNav === 'results' ? 'active' : ''}>
              <span>📋</span>
              <span>Results</span>
            </a>
            <a href="/questionnaire" className="app-bottomnav-plus">+</a>
            <a href="/profile" className={activeNav === 'profile' ? 'active' : ''}>
              <span>👤</span>
              <span>Profile</span>
            </a>
            <a href="/login">
              <span>🔑</span>
              <span>Sign in</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
