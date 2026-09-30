'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  Clock, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Radio, 
  CheckCircle2, 
  Sparkles,
  Layers,
  Zap,
  Repeat
} from 'lucide-react';

export const LandingProblemSolution: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'DISCONNECTED' | 'CONNECTED'>('CONNECTED');

  const problems = [
    {
      num: '01',
      title: 'Disconnected Reporting',
      desc: 'Citizen complaints often exist separately from field operations, creating untracked delays, duplicate calls, and public frustration.',
      impact: 'Average resolution lag: 3-5 days',
      icon: AlertTriangle,
      tag: 'SILOED INTAKE',
      color: 'border-rose-200 bg-rose-50/50 text-rose-700',
    },
    {
      num: '02',
      title: 'Reactive Collection',
      desc: 'Waste is often collected based on fixed calendar schedules rather than actual container fill conditions, wasting diesel on half-empty bins.',
      impact: 'Up to 38% fleet fuel wasted on empty runs',
      icon: Clock,
      tag: 'BLIND SCHEDULES',
      color: 'border-amber-200 bg-amber-50/50 text-amber-700',
    },
    {
      num: '03',
      title: 'Limited Operational Visibility',
      desc: 'Administrators lack one unified real-time view connecting smart bins, live grievances, and field worker locations across city sectors.',
      impact: 'Zero tamper-proof verification trail',
      icon: EyeOff,
      tag: 'BLIND OPERATIONS',
      color: 'border-slate-200 bg-slate-50 text-slate-700',
    },
  ];

  const solutions = [
    {
      num: '01',
      title: 'Live Telemetry & Geotagged Intake',
      desc: 'Ultrasonic sensors stream sub-minute volume data while citizen reports capture live GPS coordinates with 100m geofence validation.',
      impact: '100% telemetry coverage across all sectors',
      icon: Radio,
      tag: 'REAL-TIME SIGNALS',
      color: 'border-sky-200 bg-sky-50/50 text-[#0077CC]',
    },
    {
      num: '02',
      title: 'Predictive & Priority-Driven Routing',
      desc: 'AI calculates multi-factor urgency scores to auto-generate collection routes, directing vehicles only where intervention is required.',
      impact: 'Optimized dynamic collection waypoints',
      icon: Cpu,
      tag: 'AI DISPATCH ENGINE',
      color: 'border-indigo-200 bg-indigo-50/50 text-indigo-700',
    },
    {
      num: '03',
      title: 'Unified Command & Verified Proof',
      desc: 'City supervisors maintain 360° visibility over IoT assets, fleet positions, and photographic resolution proof before tasks can be resolved.',
      impact: 'Closed-loop accountability & audit log',
      icon: ShieldCheck,
      tag: 'VERIFIED RESOLUTION',
      color: 'border-emerald-200 bg-emerald-50/50 text-emerald-700',
    },
  ];

  return (
    <section id="solutions" className="py-24 bg-white relative overflow-hidden border-b border-slate-200">
      {/* Background Subtle Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/50 to-white pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-[#0077CC]" />
            Municipal Architecture Paradigm
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] tracking-tight leading-[1.1]">
            Waste management is a{' '}
            <span className="bg-gradient-to-r from-[#0077CC] to-[#0EA5E9] bg-clip-text text-transparent">
              coordination problem.
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Traditional municipal sanitation relies on fragmented databases, blind driving schedules, and unverified work orders. WasteSense unites the entire lifecycle into one continuous loop.
          </p>
        </div>

        {/* Dynamic State Toggle Conduit: DISCONNECTED vs CONNECTED */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="p-1.5 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-between shadow-inner">
            <button
              onClick={() => setActiveTab('DISCONNECTED')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'DISCONNECTED'
                  ? 'bg-white text-rose-600 shadow-sm border border-rose-100'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>01. Disconnected Municipal State</span>
            </button>

            <button
              onClick={() => setActiveTab('CONNECTED')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'CONNECTED'
                  ? 'bg-[#0077CC] text-white shadow-md shadow-[#0077CC]/25'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-200" />
              <span>02. WasteSense Connected Loop</span>
            </button>
          </div>
        </div>

        {/* 3 Interactive Cards with Smooth State Morph */}
        <AnimatePresence mode="wait">
          {activeTab === 'DISCONNECTED' ? (
            <motion.div
              key="disconnected-grid"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {problems.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.num}
                    className="p-8 rounded-3xl bg-[#FFFDFD] border border-rose-100 hover:border-rose-300 transition-all shadow-sm flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-mono text-xs font-black text-rose-600 tracking-wider">
                          STEP {p.num}
                        </span>
                        <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-full border ${p.color}`}>
                          {p.tag}
                        </span>
                      </div>

                      <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mb-5 group-hover:scale-105 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>

                      <h3 className="text-xl font-black text-[#0F172A] tracking-tight">
                        {p.title}
                      </h3>

                      <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
                        {p.desc}
                      </p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-rose-100/60 flex items-center gap-2 text-xs font-semibold text-rose-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span>{p.impact}</span>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="connected-grid"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {solutions.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.num}
                    className="p-8 rounded-3xl bg-white border border-sky-100 hover:border-[#0077CC]/40 transition-all shadow-md shadow-sky-900/5 flex flex-col justify-between group relative overflow-hidden"
                  >
                    {/* Top ambient highlight */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0077CC] to-[#0EA5E9]" />

                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-mono text-xs font-black text-[#0077CC] tracking-wider">
                          STAGE {s.num}
                        </span>
                        <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-full border ${s.color}`}>
                          {s.tag}
                        </span>
                      </div>

                      <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-[#0077CC] mb-5 group-hover:scale-105 transition-transform shadow-xs">
                        <Icon className="w-6 h-6" />
                      </div>

                      <h3 className="text-xl font-black text-[#0F172A] tracking-tight">
                        {s.title}
                      </h3>

                      <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
                        {s.desc}
                      </p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-[#0077CC]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>{s.impact}</span>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
