'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Radio, 
  TrendingUp, 
  Cpu, 
  Truck, 
  CheckCircle2, 
  ArrowRight, 
  Thermometer, 
  Battery, 
  MapPin, 
  ShieldCheck, 
  AlertTriangle,
  Sparkles
} from 'lucide-react';

interface Stage {
  id: string;
  step: string;
  title: string;
  tagline: string;
  desc: string;
  badge: string;
  badgeColor: string;
  icon: React.ElementType;
}

export const LandingLifecycle: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);

  const stages: Stage[] = [
    {
      id: 'sense',
      step: 'STEP 01',
      title: 'SENSE',
      tagline: 'Operational Signal Ingestion',
      desc: 'Smart bins and citizen mobile reports continuously generate operational signals across municipal sectors.',
      badge: 'Continuous Hardware & Civic Stream',
      badgeColor: 'bg-sky-50 text-[#0077CC] border-sky-200',
      icon: Radio,
    },
    {
      id: 'predict',
      step: 'STEP 02',
      title: 'PREDICT',
      tagline: 'Saturation & Risk Forecasting',
      desc: 'Predictive algorithms model fill velocity to identify which containers require intervention before public littering occurs.',
      badge: 'Time-to-Overflow < 45m',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: TrendingUp,
    },
    {
      id: 'prioritize',
      step: 'STEP 03',
      title: 'PRIORITIZE',
      tagline: 'Mathematical Urgency Engine',
      desc: 'The AI decision engine combines fill capacity, citizen reports, wait time, and zone footfall to compute an objective score.',
      badge: 'Urgency Score: 91 • CRITICAL',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      icon: Cpu,
    },
    {
      id: 'collect',
      step: 'STEP 04',
      title: 'COLLECT',
      tagline: 'Dynamic Fleet Routing',
      desc: 'The right dispatch task automatically reaches the right field operator and electric vehicle with turn-by-turn waypoints.',
      badge: 'Rahul Sharma • Truck #04',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      icon: Truck,
    },
    {
      id: 'verify',
      step: 'STEP 05',
      title: 'VERIFY',
      tagline: 'Tamper-Proof Closed Loop',
      desc: 'Mandatory on-site photographic evidence and 100m GPS geofencing validate resolution and reset the bin digital twin.',
      badge: '95% ➔ 18% Verified',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: CheckCircle2,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#F8FAFC] relative overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#BAE6FD] text-[11px] font-bold text-[#0077CC] uppercase tracking-widest mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            Core Operational Storytelling
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] tracking-tight leading-[1.1]">
            Sense. Predict. Prioritize. Collect.{' '}
            <span className="text-[#0077CC]">Verify.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Follow a single municipal signal from ultrasonic telemetry detection all the way to verified on-site field resolution.
          </p>
        </div>

        {/* 5-Step Horizontal Navigation Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-10">
          {stages.map((st, idx) => {
            const Icon = st.icon;
            const isCurrent = activeStage === idx;
            return (
              <button
                key={st.id}
                onClick={() => setActiveStage(idx)}
                className={`p-3 sm:p-4 rounded-2xl text-left transition-all relative border flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-white border-[#0077CC] shadow-lg shadow-[#0077CC]/10 ring-2 ring-[#0077CC]/20'
                    : 'bg-white/60 border-slate-200/80 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono text-[10px] font-black tracking-wider ${
                    isCurrent ? 'text-[#0077CC]' : 'text-slate-400'
                  }`}>
                    {st.step}
                  </span>
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center transition-colors ${
                    isCurrent ? 'bg-[#0077CC] text-white shadow-xs' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="font-black text-xs sm:text-sm text-[#0F172A]">
                  {st.title}
                </div>

                <div className="text-[10px] text-slate-500 font-medium truncate mt-0.5">
                  {st.tagline}
                </div>

                {isCurrent && (
                  <motion.div 
                    layoutId="activeStepperIndicator" 
                    className="absolute -bottom-[2px] left-4 right-4 h-0.5 bg-[#0077CC] rounded-full" 
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Interactive Showcase Canvas for Active Stage */}
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-6 text-left">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs font-black text-[#0077CC] tracking-widest">
                  {stages[activeStage].step} OF 05
                </span>
                <span className="text-slate-300">&bull;</span>
                <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${stages[activeStage].badgeColor}`}>
                  {stages[activeStage].badge}
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
                {stages[activeStage].title}:{' '}
                <span className="text-[#0077CC]">{stages[activeStage].tagline}</span>
              </h3>

              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {stages[activeStage].desc}
              </p>

              <div className="mt-8 flex items-center gap-3">
                <button
                  onClick={() => setActiveStage((prev) => (prev + 1) % stages.length)}
                  className="px-5 py-2.5 rounded-xl bg-[#0077CC] hover:bg-[#004A80] text-white font-bold text-xs shadow-md shadow-[#0077CC]/20 flex items-center gap-2 transition-all active:scale-95"
                >
                  <span>Next Step: {stages[(activeStage + 1) % stages.length].title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                  Click any stage above to inspect
                </span>
              </div>
            </div>

            {/* Right Interactive Visual Simulation Card */}
            <div className="lg:col-span-6">
              <AnimatePresence mode="wait">
                
                {/* STEP 01: SENSE VISUAL */}
                {activeStage === 0 && (
                  <motion.div
                    key="step-sense"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="p-6 sm:p-7 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                      <div>
                        <div className="text-[10px] font-mono text-sky-400 font-bold uppercase tracking-wider">
                          HARDWARE TELEMETRY &bull; NODE B-102
                        </div>
                        <div className="text-base font-bold text-white mt-0.5">Central Market &bull; Sector 12</div>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-rose-950 text-rose-300 border border-rose-800 font-mono text-[10px] font-black uppercase animate-pulse">
                        CRITICAL
                      </span>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                          <span className="text-slate-400">Ultrasonic Fill Level</span>
                          <span className="font-mono text-rose-400 font-black">95% FULL</span>
                        </div>
                        <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden p-0.5 border border-slate-700">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '95%' }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-rose-500 shadow-md shadow-rose-500/50"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700">
                          <div className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                            <Thermometer className="w-3 h-3 text-amber-400" /> Temperature
                          </div>
                          <div className="font-mono text-base font-bold text-white mt-1">29.0°C</div>
                          <div className="text-[9px] text-slate-400 mt-0.5">Normal Ambient</div>
                        </div>

                        <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700">
                          <div className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                            <Battery className="w-3 h-3 text-emerald-400" /> Battery
                          </div>
                          <div className="font-mono text-base font-bold text-white mt-1">87%</div>
                          <div className="text-[9px] text-emerald-400 mt-0.5">LiFePO4 Solar Backed</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1.5 text-emerald-400">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        Transmitting at 433MHz LoRa
                      </span>
                      <span>Sensor Ping: 4s ago</span>
                    </div>
                  </motion.div>
                )}

                {/* STEP 02: PREDICT VISUAL */}
                {activeStage === 1 && (
                  <motion.div
                    key="step-predict"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="p-6 sm:p-7 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                      <div>
                        <div className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                          PREDICTIVE FORECASTING ENGINE
                        </div>
                        <div className="text-base font-bold text-white mt-0.5">Time-to-Overflow Horizon</div>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono text-[10px] font-black uppercase">
                        RISK: HIGH
                      </span>
                    </div>

                    <div className="mt-6 p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30">
                      <div className="text-xs text-amber-300 font-semibold">Estimated Saturation:</div>
                      <div className="text-2xl sm:text-3xl font-mono font-black text-amber-400 mt-1">
                        &lt; 45 Minutes
                      </div>
                      <p className="text-[11px] text-slate-300 mt-1">
                        Footfall surge detected around Sector 12 Market. Overflow likely before 16:30.
                      </p>
                    </div>

                    <div className="mt-4 space-y-2 font-mono text-xs">
                      <div className="flex justify-between p-2.5 rounded-xl bg-slate-800 border border-slate-700">
                        <span className="text-slate-400">Fill Velocity</span>
                        <span className="text-rose-400 font-bold">+14.2% per hour</span>
                      </div>
                      <div className="flex justify-between p-2.5 rounded-xl bg-slate-800 border border-slate-700">
                        <span className="text-slate-400">Commercial Density Factor</span>
                        <span className="text-sky-400 font-bold">1.8x Standard Rate</span>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Model: Gradient Boosted Regressor</span>
                      <span className="text-sky-400 font-semibold">Confidence: 94.6%</span>
                    </div>
                  </motion.div>
                )}

                {/* STEP 03: PRIORITIZE VISUAL */}
                {activeStage === 2 && (
                  <motion.div
                    key="step-prioritize"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="p-6 sm:p-7 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                      <div>
                        <div className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-wider">
                          MULTI-SIGNAL SCORING ENGINE
                        </div>
                        <div className="text-base font-bold text-white mt-0.5">Objective Mathematical Ranking</div>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-rose-950 text-rose-300 border border-rose-800 font-mono text-[10px] font-black uppercase">
                        CRITICAL TIER
                      </span>
                    </div>

                    {/* 4 Signals Breakdown */}
                    <div className="mt-5 space-y-2 font-mono text-xs">
                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/80 border border-slate-700">
                        <span className="text-slate-300">Fill Level (40% weight)</span>
                        <span className="font-bold text-rose-400">95 / 100</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/80 border border-slate-700">
                        <span className="text-slate-300">Citizen Complaints (25% weight)</span>
                        <span className="font-bold text-amber-400">82 / 100</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/80 border border-slate-700">
                        <span className="text-slate-300">Wait Time Velocity (20% weight)</span>
                        <span className="font-bold text-yellow-400">74 / 100</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/80 border border-slate-700">
                        <span className="text-slate-300">Zone Importance (15% weight)</span>
                        <span className="font-bold text-sky-400">90 / 100</span>
                      </div>
                    </div>

                    {/* Formula Calculation Result */}
                    <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-rose-950/60 to-slate-900 border border-rose-500/40 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-slate-300 uppercase tracking-wider">
                          COMPUTED URGENCY SCORE
                        </span>
                        <div className="text-3xl font-mono font-black text-rose-400 mt-0.5">
                          91 <span className="text-xs text-slate-400">/ 100</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-3 py-1 rounded-xl bg-rose-600 text-white font-mono text-xs font-bold shadow-md shadow-rose-600/30">
                          AUTO-DISPATCH
                        </span>
                        <div className="text-[10px] text-slate-400 mt-1">Dispatched in 400ms</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 04: COLLECT VISUAL */}
                {activeStage === 3 && (
                  <motion.div
                    key="step-collect"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="p-6 sm:p-7 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                      <div>
                        <div className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">
                          TASK DISPATCH ACTIVE
                        </div>
                        <div className="text-base font-bold text-white mt-0.5">Work Order #WO-9024</div>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono text-[10px] font-black uppercase flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
                        EN ROUTE
                      </span>
                    </div>

                    <div className="mt-5 space-y-3">
                      <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-indigo-950 border border-indigo-700 flex items-center justify-center text-indigo-400 font-bold text-xs">
                            RS
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">Rahul Sharma</div>
                            <div className="text-[10px] text-slate-400">Zone A Sanitation Lead</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-mono font-bold text-indigo-300">Truck #04</span>
                          <div className="text-[10px] text-slate-400">EV Compactor</div>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 space-y-2 text-xs">
                        <div className="flex justify-between text-slate-300">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-rose-400" /> Target Destination:
                          </span>
                          <strong className="text-white">Central Market, Sector 12</strong>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>ETA:</span>
                          <span className="font-mono text-emerald-400 font-bold">6 minutes (1.4 km)</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Status: Route Acknowledged</span>
                      <span className="text-indigo-400 font-mono">Live Telemetry Linked</span>
                    </div>
                  </motion.div>
                )}

                {/* STEP 05: VERIFY VISUAL */}
                {activeStage === 4 && (
                  <motion.div
                    key="step-verify"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="p-6 sm:p-7 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                      <div>
                        <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                          CLOSED-LOOP VERIFICATION
                        </div>
                        <div className="text-base font-bold text-white mt-0.5">Proof-of-Resolution Synchronized</div>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono text-[10px] font-black uppercase flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        VERIFIED
                      </span>
                    </div>

                    {/* Before vs After Telemetry Reset */}
                    <div className="mt-5 grid grid-cols-2 gap-3 text-center">
                      <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-800/50">
                        <div className="text-[10px] text-rose-300 font-bold uppercase">BEFORE DISPATCH</div>
                        <div className="text-3xl font-mono font-black text-rose-400 mt-1">95%</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">Critical Overflow</div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-800/50">
                        <div className="text-[10px] text-emerald-300 font-bold uppercase">AFTER COLLECTION</div>
                        <div className="text-3xl font-mono font-black text-emerald-400 mt-1">18%</div>
                        <div className="text-[10px] text-emerald-300 mt-0.5">Cleared & Reset</div>
                      </div>
                    </div>

                    <div className="mt-4 p-3.5 rounded-2xl bg-slate-800 border border-slate-700 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-400" /> GPS Geofence Check:
                        </span>
                        <span className="font-mono text-emerald-400 font-bold">24m from Bin (&lt;100m PASS)</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span>Photographic Proof:</span>
                        <span className="text-sky-400 font-semibold">Matched &amp; Timestamped</span>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="text-emerald-400 font-semibold">✓ Work order closed</span>
                      <span>Digital Twin Reset: Done</span>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
