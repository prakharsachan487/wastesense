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
      badgeColor: 'text-[#0EA5E9] border-[#0EA5E9]/30 bg-[#004A80]/30',
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
      badgeColor: 'text-[#0077CC] border-[#0077CC]/30 bg-[#004A80]/30',
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
      metric: 'Closed-Loop Confirmed: 15%',
      metricDetail: 'Complaint marked Resolved + Geofence GPS Validated',
      badge: 'Audited Resolution Chain',
      badgeColor: 'text-[#0EA5E9] border-[#0EA5E9]/30 bg-[#004A80]/30',
      icon: CheckCircle2,
    },
  ];

  return (
    <section id="lifecycle" className="py-24 bg-[#F8FAFC] relative overflow-hidden border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#BAE6FD] text-[11px] font-bold text-[#0077CC] uppercase tracking-widest mb-3 shadow-xs">
            Closed-Loop System Lifecycle
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight">
            How WasteSense Solves Municipal Waste in 4 Steps
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600">
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
                    ? 'bg-white border-[#0077CC] shadow-lg scale-[1.02]'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-black text-slate-400 group-hover:text-[#0077CC] transition-colors">
                      {s.num}
                    </span>
                    <div className="p-2.5 rounded-xl border border-[#BAE6FD] bg-[#F0F9FF] text-[#0077CC]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-[#0F172A]">{s.title}</h3>
                  <div className="text-xs font-bold text-[#0077CC] mb-2">{s.subtitle}</div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">{s.desc}</p>
                </div>

                {/* Metric Footer */}
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  <div className="text-xs font-bold text-[#0F172A] font-mono">{s.metric}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 truncate">{s.metricDetail}</div>
                </div>

                {isSelected && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#0077CC] rounded-full" />
                )}
              </div>
            );
          })}
        </div>

        {/* Detailed Spotlight of Selected Stage */}
        <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#BAE6FD] bg-[#F0F9FF] text-[#0077CC]">
                {steps[activeStep].badge}
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-[#0F172A]">
                Stage {steps[activeStep].num}: {steps[activeStep].title} &bull; {steps[activeStep].subtitle}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {steps[activeStep].desc}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 min-w-[280px]">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Live System Verification</span>
              <div className="text-base font-bold text-[#0077CC] mt-1">{steps[activeStep].metric}</div>
              <div className="text-xs text-slate-600 mt-1">{steps[activeStep].metricDetail}</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
