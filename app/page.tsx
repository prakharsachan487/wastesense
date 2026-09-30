import React from 'react';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { LandingHero } from '../components/landing/LandingHero';
import { LandingProblemSolution } from '../components/landing/LandingProblemSolution';
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
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-satoshi selection:bg-[#0077CC] selection:text-white">
      <LandingNavbar />
      <main className="flex-1">
        <LandingHero />
        <LandingProblemSolution />
        <LandingLifecycle />
        <LandingBento />
        <LandingRolePortals />
        <LandingMetrics />
      </main>
      <LandingFooter />
    </div>
  );
}
