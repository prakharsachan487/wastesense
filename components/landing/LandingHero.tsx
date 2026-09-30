'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Cpu, Zap, Activity, Navigation, CheckCircle2 } from 'lucide-react';

export const LandingHero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#F0F7FF] via-[#F8FAFC] to-[#FFFFFF]">
      {/* Subtle Grid Pattern Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Operational Status Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#BAE6FD] shadow-xs text-xs font-semibold text-[#004A80] mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0EA5E9] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0077CC]"></span>
          </span>
          <span className="text-[#0077CC] font-bold uppercase tracking-wider text-[11px]">
            WasteSense OS 2.4 Active
          </span>
          <span className="text-slate-300">&bull;</span>
          <span className="text-slate-600 hidden sm:inline">20 Urban Smart Bins Live Across 6 Sectors</span>
        </div>

        {/* High-Impact Headline (Satoshi Bold / Black #0F172A) */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#0F172A] max-w-5xl mx-auto leading-[1.08]">
          Sense. Predict.{' '}
          <span className="text-[#0077CC]">
            Prioritize. Collect.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
          An autonomous smart city waste intelligence platform uniting real-time ultrasonic IoT telemetry, machine-learning overflow prediction, citizen complaint triage, and verified sanitation fleet dispatch.
        </p>

        {/* Dual Primary Call-to-Action Buttons (Matching Image 2) */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#0077CC] hover:bg-[#004A80] text-white font-bold text-sm shadow-md shadow-[#0077CC]/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group"
          >
            <span>Launch Live Platform</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <a
            href="#lifecycle"
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-white hover:bg-[#F0F7FF] border border-slate-300 text-[#0077CC] font-bold text-sm shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>Explore 4-Stage System Flow</span>
          </a>
        </div>

        {/* Live Operational Metrics Ribbon (Clean White Cards) */}
        <div className="mt-12 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">IoT Sensor Mesh</span>
            <div className="text-xl font-mono font-bold text-[#0F172A] mt-0.5">20 Nodes</div>
            <span className="text-[11px] text-[#0077CC] font-medium">100% Online</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">Task Dispatch</span>
            <div className="text-xl font-mono font-bold text-[#0F172A] mt-0.5">Automated</div>
            <span className="text-[11px] text-[#0077CC] font-medium">Instant Priority Triage</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">Fleet Guidance</span>
            <div className="text-xl font-mono font-bold text-[#0F172A] mt-0.5">Optimized</div>
            <span className="text-[11px] text-[#0077CC] font-medium">Dynamic Waypoints</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">Citizen Reporting</span>
            <div className="text-xl font-mono font-bold text-[#0F172A] mt-0.5">GPS Geotag</div>
            <span className="text-[11px] text-[#0077CC] font-medium">Photo Verified</span>
          </div>
        </div>

        {/* HERO SHOWCASE: High-Tech Visual Container */}
        <div className="mt-16 relative max-w-6xl mx-auto">
          {/* Laptop / Screen Border Frame */}
          <div className="relative rounded-[28px] md:rounded-[36px] p-2.5 border border-slate-300/80 bg-white shadow-2xl group">

            <div className="relative rounded-[22px] md:rounded-[30px] overflow-hidden bg-slate-900 aspect-[16/9] w-full border border-slate-200">
              <img
                src="/images/landing-hero-dashboard.jpg"
                alt="WasteSense Smart City Operations Command Center"
                className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-700"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-black/20 pointer-events-none" />

              {/* Floating Live Badge 1: Top-Left Critical Surge */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 p-3 sm:p-4 rounded-2xl bg-white/95 border border-rose-200 backdrop-blur-md shadow-xl flex items-center gap-3 text-left max-w-xs animate-pulse">
                <div className="w-8 h-8 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-rose-600 uppercase tracking-wider">CRITICAL OVERFLOW</span>
                    <span className="text-[10px] font-mono text-rose-700 font-bold bg-rose-50 px-1.5 py-0.5 rounded">95% Fill</span>
                  </div>
                  <p className="text-xs font-bold text-[#0F172A] mt-0.5">Bin B-102 &bull; Central Market</p>
                </div>
              </div>

              {/* Floating Live Badge 2: Top-Right Automated Dispatch */}
              <div className="hidden sm:flex absolute top-6 right-6 p-3.5 rounded-2xl bg-white/95 border border-slate-200 backdrop-blur-md shadow-xl items-center gap-3 text-left max-w-xs">
                <div className="w-8 h-8 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] flex items-center justify-center text-[#0077CC] shrink-0">
                  <Navigation className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-[#0077CC] uppercase tracking-wider">AUTO-DISPATCHED</span>
                  <p className="text-xs font-bold text-[#0F172A] mt-0.5">Truck #04 &bull; Rahul Sharma</p>
                  <p className="text-[10px] text-slate-500">Route In-Progress &bull; Zone A</p>
                </div>
              </div>

              {/* Floating Live Badge 3: Bottom-Left Real-time IoT Mesh */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 p-3 sm:p-3.5 rounded-2xl bg-white/95 border border-slate-200 backdrop-blur-md shadow-xl flex items-center gap-3 text-left max-w-sm">
                <div className="w-8 h-8 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] flex items-center justify-center text-[#0077CC] shrink-0">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-[#0F172A]">Real-Time IoT Mesh</span>
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <span className="text-[10px] text-slate-500 block">Ultrasonic Fill &bull; Weight &bull; Temp Sensors</span>
                </div>
              </div>

              {/* Floating Live Badge 3: Bottom Right Closed-Loop Reset */}
              <div className="hidden sm:flex absolute bottom-6 right-6 p-3 rounded-2xl bg-white/95 border border-emerald-200 backdrop-blur-md shadow-xl items-center gap-3 text-left">
                <div className="w-7 h-7 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-[#0F172A]">Closed-Loop Confirmed</span>
                  <span className="text-slate-500 block text-[11px]">Photo verified &bull; Telemetry reset to 18%</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
