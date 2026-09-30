'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Sparkles, CheckCircle2, Radio } from 'lucide-react';

export const LandingFinalCTA: React.FC = () => {
  return (
    <section className="relative py-28 sm:py-36 bg-[#020617] text-white overflow-hidden border-t border-slate-800">
      
      {/* PERSPECTIVE GRID & TELEMETRY DOTS BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        
        {/* Subtle Perspective Grid Lines */}
        <div 
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(56, 189, 248, 0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(56, 189, 248, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />

        {/* Ambient Radial Spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#0077CC]/25 via-sky-500/15 to-transparent blur-3xl rounded-full" />

        {/* Moving Telemetry Particles (CSS SVG) */}
        <svg className="absolute inset-0 w-full h-full opacity-60">
          <circle cx="15%" cy="30%" r="2" fill="#38BDF8">
            <animate attributeName="cy" values="30%;20%;30%" dur="6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;0.8;0.2" dur="6s" repeatCount="indefinite" />
          </circle>
          <circle cx="85%" cy="40%" r="2.5" fill="#0EA5E9">
            <animate attributeName="cy" values="40%;50%;40%" dur="8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.9;0.3" dur="8s" repeatCount="indefinite" />
          </circle>
          <circle cx="50%" cy="75%" r="2" fill="#38BDF8">
            <animate attributeName="cx" values="50%;55%;50%" dur="7s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;1;0.4" dur="7s" repeatCount="indefinite" />
          </circle>
          <circle cx="30%" cy="70%" r="1.5" fill="#38BDF8">
            <animate attributeName="cy" values="70%;65%;70%" dur="5s" repeatCount="indefinite" />
          </circle>
          <circle cx="70%" cy="25%" r="2" fill="#38BDF8">
            <animate attributeName="cy" values="25%;35%;25%" dur="9s" repeatCount="indefinite" />
          </circle>
        </svg>

        {/* Top Gradient Fade Out */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0F172A] to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-xs font-bold text-sky-400 uppercase tracking-widest mb-8 backdrop-blur-md shadow-lg shadow-sky-500/10">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>MUNICIPAL AUTONOMOUS INFRASTRUCTURE</span>
        </div>

        {/* Primary Statement */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
          THE CITY DOESN&apos;T NEED MORE DATA.{' '}
          <span className="block mt-2 bg-gradient-to-r from-sky-400 via-[#38BDF8] to-emerald-400 bg-clip-text text-transparent">
            IT NEEDS BETTER DECISIONS.
          </span>
        </h2>

        {/* Tagline */}
        <div className="mt-6 font-mono text-base sm:text-xl font-bold tracking-widest text-slate-300 uppercase">
          Sense. Predict. Prioritize. Collect.
        </div>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Unite citizens, smart ultrasonic containers, and field sanitation operators in one synchronized, closed-loop command architecture.
        </p>

        {/* Launch CTA Button */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/login"
            className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-gradient-to-r from-[#0077CC] via-[#0EA5E9] to-sky-400 hover:from-[#004A80] hover:to-[#0077CC] text-white font-black text-sm shadow-xl shadow-[#0077CC]/30 transition-all hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2.5 group"
          >
            <span>Launch WasteSense Platform</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/admin/dashboard"
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>Explore Command Center</span>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Standard LoRaWAN IoT Protocol</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>100m GPS Geofence Audited</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Turnkey Municipal Deployment</span>
          </div>
        </div>

      </div>
    </section>
  );
};
