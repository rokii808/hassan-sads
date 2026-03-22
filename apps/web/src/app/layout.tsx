import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hassan SADS App — Admin Portal',
  description: 'Researcher and clinician dashboard for the Hassan SADS cardiac screening platform.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
