import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HeartGuard SADS — Admin Portal',
  description: 'Researcher and clinician dashboard for the HeartGuard SADS cardiac screening platform.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
