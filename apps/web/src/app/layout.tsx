import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HeartGuard — Cardiac Screening',
  description: 'HeartGuard screens for SADS risk. A few questions could save a life.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#0E0E22' }}>{children}</body>
    </html>
  );
}
