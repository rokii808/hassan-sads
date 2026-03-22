export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="phone-outer">
      <div className="phone-frame">
        {/* Fake status bar — hidden on real mobile via CSS */}
        <div className="phone-status-bar">
          <span style={{ fontSize: 13, fontWeight: 700, color: '#0D0D0D' }}>12:30</span>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {/* Signal bars */}
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
              <rect x="0" y="4" width="3" height="8" rx="1" fill="#0D0D0D" />
              <rect x="4.5" y="2.5" width="3" height="9.5" rx="1" fill="#0D0D0D" />
              <rect x="9" y="0" width="3" height="12" rx="1" fill="#0D0D0D" />
              <rect x="13.5" y="0" width="2.5" height="12" rx="1" fill="#0D0D0D" opacity="0.3" />
            </svg>
            {/* Wifi */}
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
              <path d="M8 3C5.6 3 3.4 4 1.8 5.6L0.4 4.2C2.4 2.2 5.1 1 8 1s5.6 1.2 7.6 3.2l-1.4 1.4C12.6 4 10.4 3 8 3z" fill="#0D0D0D" />
              <path d="M8 6c-1.4 0-2.6.6-3.5 1.5L3.1 6.1C4.4 4.8 6.1 4 8 4s3.6.8 4.9 2.1l-1.4 1.4C10.6 6.6 9.4 6 8 6z" fill="#0D0D0D" />
              <circle cx="8" cy="10" r="1.5" fill="#0D0D0D" />
            </svg>
            {/* Battery */}
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none" aria-hidden="true">
              <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#0D0D0D" strokeOpacity="0.35" />
              <rect x="2" y="2" width="16" height="8" rx="2" fill="#0D0D0D" />
              <path d="M23 4v4a2 2 0 000-4z" fill="#0D0D0D" opacity="0.4" />
            </svg>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
