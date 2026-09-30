'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Cpu, 
  TrendingUp, 
  Truck, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Repeat,
  Sparkles
} from 'lucide-react';

interface CircuitNode {
  id: string;
  step: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  color: string;
  bg: string;
}

export const LandingClosedLoop: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const circuitNodes: CircuitNode[] = [
    {
      id: 'citizen',
      step: '01',
      label: 'Citizen Signal',
      sublabel: 'GPS geotagged photographic grievance logged in < 30 seconds',
      icon: User,
      color: 'text-sky-500 border-sky-400',
      bg: 'bg-sky-500/10',
    },
    {
      id: 'wastesense',
      step: '02',
      label: 'WasteSense Intake',
      sublabel: 'Spatial clustering & automatic municipal zone allocation',
      icon: Repeat,
      color: 'text-blue-500 border-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      id: 'ai',
      step: '03',
      label: 'AI Priority Engine',
      sublabel: 'Multi-signal mathematical ranking without human bias',
      icon: Cpu,
      color: 'text-indigo-500 border-indigo-400',
      bg: 'bg-indigo-500/10',
    },
    {
      id: 'worker',
      step: '04',
      label: 'Field Dispatch',
      sublabel: 'Turn-by-turn route pushed to nearest active crew and EV truck',
      icon: Truck,
      color: 'text-teal-500 border-teal-400',
      bg: 'bg-teal-500/10',
    },
    {
      id: 'verification',
      step: '05',
      label: 'Geofence Audit',
      sublabel: '100m proximity verification + mandatory photographic proof',
      icon: ShieldCheck,
      color: 'text-emerald-500 border-emerald-400',
      bg: 'bg-emerald-500/10',
    },
    {
      id: 'resolution',
      step: '06',
      label: 'Citizen Resolution',
      sublabel: 'Digital twin resets & citizen receives proof of resolution',
      icon: CheckCircle2,
      color: 'text-green-500 border-green-400',
      bg: 'bg-green-500/10',
    },
  ];

  return (
    <section id="closed-loop" className="py-24 bg-[#0F172A] text-white relative overflow-hidden border-b border-slate-800">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F] via-[#0F172A] to-slate-950 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#0077CC]/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-sky-400 uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Closed-Loop Operational Architecture
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            From Citizen Signal to{' '}
            <span className="bg-gradient-to-r from-sky-400 via-[#38BDF8] to-emerald-400 bg-clip-text text-transparent">
              Verified Resolution.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            Not an open-ended ticketing system: WasteSense runs an unbroken operational circuit where every grievance and IoT overflow must be physically cleared, audited, and verified.
          </p>
        </div>

        {/* The Animated Glowing Circuit Line */}
        <div className="relative mb-12">
          
          {/* Connecting Circuit Line on Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 bg-slate-800 -translate-y-1/2 rounded-full overflow-hidden">
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'linear' }}
              className="w-1/3 h-full bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent"
            />
          </div>

          {/* 6 Circuit Nodes in Flow */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10">
            {circuitNodes.map((node, idx) => {
              const Icon = node.icon;
              const isSelected = activeStep === idx;

              return (
                <button
                  key={node.id}
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 relative flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-800/90 border-[#38BDF8] shadow-xl shadow-[#38BDF8]/15 ring-2 ring-[#38BDF8]/40 -translate-y-1'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[10px] font-black text-slate-400 tracking-wider">
                        {node.step}
                      </span>
                      <div className={`w-8 h-8 rounded-xl border flex items-center justify-center ${node.color} ${node.bg}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="font-black text-xs sm:text-sm text-white">
                      {node.label}
                    </div>

                    <p className="text-[11px] text-slate-400 mt-1 leading-snug font-normal line-clamp-3">
                      {node.sublabel}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>STAGE {node.step}</span>
                    <span className="text-emerald-400 font-bold">ACTIVE</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Circuit Inspector Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-sky-950 border border-sky-600 flex items-center justify-center text-sky-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-sky-400 font-bold">
                AUDIT-LOCKED COMPLIANCE CIRCUIT
              </div>
              <div className="text-sm sm:text-base font-bold text-white mt-0.5">
                Every task requires before/after photographic matching &amp; &lt;100m GPS geofence validation.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              100% Closed Loop Complete
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
