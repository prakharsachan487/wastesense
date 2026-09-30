import './globals.css';
import type { Metadata } from 'next';
import { WasteSenseProvider } from '../context/WasteSenseContext';

export const metadata: Metadata = {
  title: 'WasteSense | Smart Waste Intelligence Platform',
  description: 'Closed-loop municipal waste operations platform with IoT digital twin telemetry, automated priority dispatch, and worker verification.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <WasteSenseProvider>
          {children}
        </WasteSenseProvider>
      </body>
    </html>
  );
}
