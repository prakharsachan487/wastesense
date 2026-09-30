'use client';

import React from 'react';
import { TrendingDown, Zap, Clock, ShieldCheck } from 'lucide-react';

export const LandingMetrics: React.FC = () => {
  const stats = [
    {
      value: '42%',
      label: 'Overflow Reduction',
      desc: 'Predictive time-to-overflow models dispatch trucks before public littering occurs.',
      icon: TrendingDown,
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40',
    },
    {
      value: '38%',
      label: 'Fleet Fuel Savings',
      desc: 'Dynamic waypoints eliminate static routes and dry-runs to empty containers.',
      icon: Zap,
      color: 'text-amber-400 border-amber-500/30 bg-amber-950/40',
    },
    {
      value: '< 15m',
      label: 'Automated Triage',
      desc: 'Zero manual bottlenecks: critical sensor breaches trigger immediate task creation.',
      icon: Clock,
      color: 'text-sky-400 border-sky-500/30 bg-sky-950/40',
    },
    {
      value: '100%',
      label: 'Verified Resolution',
      desc: 'Photographic proof of collection synchronized directly with municipal dashboards.',
      icon: ShieldCheck,
      color: 'text-purple-400 border-purple-500/30 bg-purple-950/40',
    },
  ];

  return (
    <section id="impact" className="py-24 bg-[#07090E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-emerald-500/40 text-[11px] font-bold text-emerald-400 uppercase tracking-widest mb-3">
            Municipal Operational Impact
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Data-Driven Smart Sanitation
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            Proven operational metrics driving environmental sustainability and citizen satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-6 ${s.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-4xl sm:text-5xl font-mono font-black text-white tracking-tight">
                    {s.value}
                  </div>
                  <div className="text-sm font-bold text-slate-200 mt-2">{s.label}</div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
