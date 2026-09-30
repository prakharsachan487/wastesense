'use client';

import React, { useState } from 'react';
import { Radio, Cpu, ClipboardCheck, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export const LandingLifecycle: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 'sense',
      num: '01',
      title: 'Sense',
      subtitle: 'IoT Telemetry Mesh',
      desc: 'Optical and ultrasonic distance sensors continuously monitor waste volume. Load strain gauges measure gross weight while thermistors detect fire hazards.',
      metric: '20 Smart Bins Transmitting',
      metricDetail: 'Fill %, Weight (kg), Temp (°C), Battery (95%)',
      badge: 'Continuous Hardware Stream',
      badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40',
      icon: Radio,
    },
    {
      id: 'predict',
      num: '02',
      title: 'Predict',
      subtitle: 'Machine Learning Regression',
      desc: 'Predictive algorithms correlate fill-rate velocity, citizen foot traffic, and weather data to forecast the exact hour a bin will overflow before it happens.',
      metric: 'Overflow Prediction: ~35 Mins',
      metricDetail: 'Surge detection on B-102 (Central Market)',
      badge: 'Predictive Analytics Active',
      badgeColor: 'text-purple-400 border-purple-500/30 bg-purple-950/40',
      icon: Cpu,
    },
    {
      id: 'prioritize',
      num: '03',
      title: 'Prioritize',
      subtitle: 'Automated Dispatch Formulation',
      desc: 'The prioritization engine combines fill capacity (40%), citizen complaints (25%), time elapsed (20%), and commercial zone density (15%) to automatically generate work orders.',
      metric: 'Priority Score: 95 / 100',
      metricDetail: 'Work Order TSK-1042 assigned to Truck #04',
      badge: 'Zero Manual Dispatch Delays',
      badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-950/40',
      icon: ClipboardCheck,
    },
    {
      id: 'collect',
      num: '04',
      title: 'Collect & Verify',
      subtitle: 'Photographic Proof & Sensor Reset',
      desc: 'Field drivers receive turn-by-turn navigation. Upon collection, the worker captures a verified completion photo, resetting node telemetry to 18% in the command center.',
      metric: 'Closed-Loop Confirmed: 18%',
      metricDetail: 'Citizen complaint marked Resolved + 50 Eco-Credits',
      badge: 'Audited Resolution Chain',
      badgeColor: 'text-sky-400 border-sky-500/30 bg-sky-950/40',
      icon: CheckCircle2,
    },
  ];

  return (
    <section id="lifecycle" className="py-24 bg-[#080B12] relative overflow-hidden border-t border-b border-white/5">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-emerald-500/40 text-[11px] font-bold text-emerald-400 uppercase tracking-widest mb-3">
            Closed-Loop System Lifecycle
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            How WasteSense Solves Municipal Waste in 4 Steps
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            From autonomous sensory perception to verified mobile field collection: eliminating overflowing bins, wasted diesel, and citizen dissatisfaction.
          </p>
        </div>

        {/* 4 Steps Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isSelected = activeStep === idx;

            return (
              <div
                key={s.id}
                onClick={() => setActiveStep(idx)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-slate-900/90 border-emerald-500/60 shadow-xl shadow-emerald-950/50 scale-[1.02]'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-black text-slate-500 group-hover:text-emerald-400 transition-colors">
                      {s.num}
                    </span>
                    <div className={`p-2.5 rounded-xl border ${s.badgeColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-white">{s.title}</h3>
                  <div className="text-xs font-bold text-emerald-400 mb-2">{s.subtitle}</div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">{s.desc}</p>
                </div>

                {/* Metric Footer */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <div className="text-xs font-bold text-white font-mono">{s.metric}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5 truncate">{s.metricDetail}</div>
                </div>

                {isSelected && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-emerald-400 rounded-full" />
                )}
              </div>
            );
          })}
        </div>

        {/* Detailed Spotlight of Selected Stage */}
        <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${steps[activeStep].badgeColor}`}>
                {steps[activeStep].badge}
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-white">
                Stage {steps[activeStep].num}: {steps[activeStep].title} &bull; {steps[activeStep].subtitle}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {steps[activeStep].desc}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 min-w-[280px]">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Live System Verification</span>
              <div className="text-base font-bold text-emerald-400 mt-1">{steps[activeStep].metric}</div>
              <div className="text-xs text-slate-300 mt-1">{steps[activeStep].metricDetail}</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
