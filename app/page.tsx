import React from 'react';
import { WordsPreloader } from '../components/ui/WordsPreloader';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { LandingHero } from '../components/landing/LandingHero';
import { LandingLiveStrip } from '../components/landing/LandingLiveStrip';
import { LandingProblemSolution } from '../components/landing/LandingProblemSolution';
import { LandingLifecycle } from '../components/landing/LandingLifecycle';
import { LandingDecisionDemo } from '../components/landing/LandingDecisionDemo';
import { LandingDigitalTwin } from '../components/landing/LandingDigitalTwin';
import { LandingRolePortals } from '../components/landing/LandingRolePortals';
import { LandingClosedLoop } from '../components/landing/LandingClosedLoop';
import { LandingAwareness } from '../components/landing/LandingAwareness';
import { LandingMetrics } from '../components/landing/LandingMetrics';
import { LandingFinalCTA } from '../components/landing/LandingFinalCTA';
import { LandingFooter } from '../components/landing/LandingFooter';

export const metadata = {
  title: 'WasteSense | AI-Powered Smart Waste Intelligence Platform',
  description:
    'Autonomous municipal smart city waste intelligence platform uniting real-time IoT sensors, predictive overflow forecasting, citizen grievance triage, and mobile fleet dispatch.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-satoshi selection:bg-[#0077CC] selection:text-white">
      {/* Skiper UI Inspired Words Preloader */}
      <WordsPreloader />

      <LandingNavbar />
      <main className="flex-1">
        <LandingHero />
        <LandingLiveStrip />
        <LandingProblemSolution />
        <LandingLifecycle />
        <LandingDecisionDemo />
        <LandingDigitalTwin />
        <LandingRolePortals />
        <LandingClosedLoop />
        <LandingAwareness />
        <LandingMetrics />
        <LandingFinalCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
