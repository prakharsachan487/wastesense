'use client';

import React from 'react';
import { TrendingDown, Zap, Clock, ShieldCheck } from 'lucide-react';

export const LandingMetrics: React.FC = () => {
  const stats = [
    {
      value: 'Real-Time',
      label: 'Surge Detection',
      desc: 'Continuous ultrasonic distance telemetry flags overflow risks before public littering occurs.',
      icon: TrendingDown,
      color: 'text-[#0EA5E9] border-[#0EA5E9]/30 bg-[#004A80]/30',
    },
    {
      value: 'Dynamic',
      label: 'Route Optimization',
      desc: 'Smart waypoints direct trucks only to bins requiring collection, eliminating empty runs.',
      icon: Zap,
      color: 'text-amber-400 border-amber-500/30 bg-amber-950/40',
    },
    {
      value: 'Instant',
      label: 'Automated Triage',
      desc: 'Critical threshold breaches trigger immediate task generation and crew dispatch.',
      icon: Clock,
      color: 'text-[#0077CC] border-[#0077CC]/30 bg-[#004A80]/30',
    },
    {
      value: 'Closed-Loop',
      label: 'Verified Resolution',
      desc: 'Field photographic evidence is synchronized directly with municipal command records.',
      icon: ShieldCheck,
      color: 'text-[#0EA5E9] border-[#0EA5E9]/30 bg-[#004A80]/20',
    },
  ];

  return (
    <section id="impact" className="py-24 bg-white relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F0F9FF] border border-[#BAE6FD] text-[11px] font-bold text-[#0077CC] uppercase tracking-widest mb-3">
            Municipal Operational Impact
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight">
            Data-Driven Smart Sanitation
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600">
            Proven operational metrics driving environmental sustainability and citizen satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 hover:border-[#0077CC] transition-all flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl border border-[#BAE6FD] bg-[#F0F9FF] flex items-center justify-center mb-6 text-[#0077CC]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-4xl sm:text-5xl font-mono font-black text-[#0F172A] tracking-tight">
                    {s.value}
                  </div>
                  <div className="text-sm font-bold text-[#0077CC] mt-2">{s.label}</div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
