import React from 'react';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { LandingHero } from '../components/landing/LandingHero';
import { LandingLifecycle } from '../components/landing/LandingLifecycle';
import { LandingBento } from '../components/landing/LandingBento';
import { LandingRolePortals } from '../components/landing/LandingRolePortals';
import { LandingMetrics } from '../components/landing/LandingMetrics';
import { LandingFooter } from '../components/landing/LandingFooter';

export const metadata = {
  title: 'WasteSense | Smart Waste Intelligence Platform',
  description:
    'Autonomous municipal smart city waste intelligence platform uniting real-time IoT sensors, predictive overflow forecasting, citizen grievance triage, and mobile fleet dispatch.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#06080F] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      <LandingNavbar />
      <main className="flex-1">
        <LandingHero />
        <LandingLifecycle />
        <LandingBento />
        <LandingRolePortals />
        <LandingMetrics />
      </main>
      <LandingFooter />
    </div>
  );
}
