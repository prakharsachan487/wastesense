'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Cpu, Zap, Activity, Navigation, CheckCircle2 } from 'lucide-react';
import { BorderBeam } from '../ui/BorderBeam';

export const LandingHero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Ambient Radial Gradient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-emerald-600/20 via-teal-500/15 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-sky-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Operational Status Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/40 shadow-lg shadow-emerald-950/40 text-xs font-semibold text-slate-200 mb-8 backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-500">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
            WasteSense OS 2.4 Active
          </span>
          <span className="text-slate-600">&bull;</span>
          <span className="text-slate-300 hidden sm:inline">20 Urban Smart Bins Live Across 6 Sectors</span>
        </div>

        {/* High-Impact Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-[1.08] drop-shadow-sm">
          Sense. Predict.{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
            Prioritize. Collect.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-normal">
          An autonomous smart city waste intelligence platform uniting real-time ultrasonic IoT telemetry, machine-learning overflow prediction, citizen complaint triage, and verified sanitation fleet dispatch.
        </p>

        {/* Dual Primary Call-to-Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm shadow-xl shadow-emerald-950/80 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group"
          >
            <span>Launch Live Platform</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <a
            href="#lifecycle"
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-white font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 backdrop-blur-md"
          >
            <span>Explore 4-Stage System Flow</span>
          </a>
        </div>

        {/* Live Operational Metrics Ribbon */}
        <div className="mt-12 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">IoT Sensor Mesh</span>
            <div className="text-xl font-mono font-bold text-white mt-0.5">20 Nodes</div>
            <span className="text-[11px] text-emerald-400">100% Online</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Triage Speed</span>
            <div className="text-xl font-mono font-bold text-white mt-0.5">&lt; 15 mins</div>
            <span className="text-[11px] text-emerald-400">Automated Dispatch</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Fleet Fuel Saved</span>
            <div className="text-xl font-mono font-bold text-white mt-0.5">38% Route Cut</div>
            <span className="text-[11px] text-emerald-400">Dynamic Waypoints</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Citizen Eco-Credits</span>
            <div className="text-xl font-mono font-bold text-white mt-0.5">50 Pts / Ticket</div>
            <span className="text-[11px] text-emerald-400">Verified Resolution</span>
          </div>
        </div>

        {/* HERO SHOWCASE: High-Tech Holographic Visual with Border Beam */}
        <div className="mt-16 relative max-w-6xl mx-auto">
          {/* Outer Glowing Border Frame */}
          <div className="relative rounded-[28px] md:rounded-[36px] p-2 bg-gradient-to-b from-white/15 to-transparent border border-white/10 shadow-[0_30px_100px_-20px_rgba(16,185,129,0.25)] group">
            
            {/* Animated Border Beam from Skiper UI */}
            <BorderBeam size={350} duration={14} colorFrom="#10b981" colorTo="#06b6d4" borderWidth={2} />

            <div className="relative rounded-[24px] md:rounded-[30px] overflow-hidden bg-slate-950 aspect-[16/9] w-full border border-slate-800">
              <img
                src="/images/landing-hero-dashboard.jpg"
                alt="WasteSense Smart City Operations Command Center"
                className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-700"
              />

              {/* Holographic Ambient Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/30 pointer-events-none" />

              {/* Floating Live Badge 1: Top-Left Critical Surge */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 p-3 sm:p-4 rounded-2xl bg-slate-950/85 border border-rose-500/40 backdrop-blur-md shadow-2xl flex items-center gap-3 text-left max-w-xs animate-pulse">
                <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-rose-400 uppercase tracking-wider">CRITICAL OVERFLOW</span>
                    <span className="text-[10px] font-mono text-white font-bold bg-rose-950/80 px-1 rounded">95% Fill</span>
                  </div>
                  <p className="text-xs font-bold text-white mt-0.5">Bin B-102 &bull; Central Market</p>
                </div>
              </div>

              {/* Floating Live Badge 2: Top-Right Automated Dispatch */}
              <div className="hidden sm:flex absolute top-6 right-6 p-3.5 rounded-2xl bg-slate-950/85 border border-emerald-500/40 backdrop-blur-md shadow-2xl items-center gap-3 text-left max-w-xs">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <Navigation className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider">AUTO-DISPATCHED</span>
                  <p className="text-xs font-bold text-white mt-0.5">Truck #04 &bull; Rahul Sharma</p>
                  <p className="text-[10px] text-slate-400">ETA: 6 mins &bull; Zone A Route</p>
                </div>
              </div>

              {/* Floating Live Badge 3: Bottom Center Closed-Loop Reset */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 p-3 rounded-2xl bg-slate-950/90 border border-sky-500/40 backdrop-blur-md shadow-2xl flex items-center gap-3 text-left">
                <div className="w-7 h-7 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-white">Closed-Loop Resolution Confirmed</span>
                  <span className="text-slate-400 block text-[11px]">Photo verified &bull; Telemetry reset to 18% clean</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
