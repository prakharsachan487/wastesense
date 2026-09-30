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
    <html lang="en">
      <body className="min-h-screen bg-[#F8FAFC] text-[#0F172A] antialiased font-sans selection:bg-[#0077CC] selection:text-white">
        <WasteSenseProvider>
          {children}
        </WasteSenseProvider>
      </body>
    </html>
  );
}
