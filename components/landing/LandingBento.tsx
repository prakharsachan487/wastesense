'use client';

import React from 'react';
import { 
  Radio, Cpu, Users, Truck, BarChart3, ShieldCheck, 
  MapPin, Flame, Award, Smartphone, Compass, Sparkles 
} from 'lucide-react';

export const LandingBento: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-[#07090E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-sky-500/40 text-[11px] font-bold text-sky-400 uppercase tracking-widest mb-3">
            Core Architecture & Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Designed for Modern Smart Municipalities
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            A unified suite engineered for city administrators, field collection crews, and urban residents.
          </p>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-5">
          
          {/* CARD 1: IoT Smart Bin Telemetry (Col span 7) */}
          <div className="lg:col-span-7 p-7 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 relative overflow-hidden group">
            
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
                <Radio className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-full">
                20 Active Nodes
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white">
              IoT Sensor Mesh & Digital Twin Telemetry
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl leading-relaxed">
              Every smart bin node streams real-time ultrasonic distance, load cell strain (gross weight), internal temperature, and battery telemetry. Detects rapid surges and smoldering fire hazards before they escalate.
            </p>

            {/* Micro Telemetry Widget */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Ultrasonic Fill</span>
                <div className="text-base font-mono font-bold text-white mt-0.5">Continuous %</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Gross Weight</span>
                <div className="text-base font-mono font-bold text-white mt-0.5">0.1 - 40 kg</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Fire Safety</span>
                <div className="text-base font-mono font-bold text-emerald-400 mt-0.5">&gt;50°C Alarm</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Battery Life</span>
                <div className="text-base font-mono font-bold text-white mt-0.5">24+ Months</div>
              </div>
            </div>
          </div>

          {/* CARD 2: Transparent Decision Engine (Col span 5) */}
          <div className="lg:col-span-5 p-7 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 relative overflow-hidden group">

            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-purple-950/60 border border-purple-500/30 text-purple-400">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 bg-purple-950/40 border border-purple-800/40 px-2.5 py-1 rounded-full">
                Multi-Factor Logic
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white">
              Predictive Priority Engine
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
              Transparent, audit-ready formulation rankings. No black-box guesses: priority is calculated mathematically to dispatch routes dynamically.
            </p>

            {/* Formula Breakdown Cards */}
            <div className="mt-5 space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-300 font-medium">Fill Capacity Weight</span>
                <span className="font-mono text-purple-400 font-bold">40%</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-300 font-medium">Citizen Complaint Density</span>
                <span className="font-mono text-purple-400 font-bold">25%</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-300 font-medium">Uncollected Wait Time</span>
                <span className="font-mono text-purple-400 font-bold">20%</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-300 font-medium">Commercial Zone Density</span>
                <span className="font-mono text-purple-400 font-bold">15%</span>
              </div>
            </div>
          </div>

          {/* CARD 3: Citizen Civic Engagement & Eco-Credits (Col span 4) */}
          <div className="lg:col-span-4 p-7 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 relative overflow-hidden group">
            <div className="p-3 rounded-2xl bg-sky-950/60 border border-sky-500/30 text-sky-400 w-fit mb-4">
              <Users className="w-5 h-5" />
            </div>

            <h3 className="text-lg sm:text-xl font-black text-white">
              Citizen Civic Services & Eco-Credits
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Residents report sidewalk waste with geotagged photo evidence, schedule doorstep bulk collection, and earn 50 Eco-Credits on verified resolution.
            </p>

            <div className="mt-5 p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
              <Award className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">Green Citizen Rewards</div>
                <div className="text-[10px] text-slate-400">Redeemable for municipal utility rebates</div>
              </div>
            </div>
          </div>

          {/* CARD 4: Sanitation Fleet Telematics (Col span 4) */}
          <div className="lg:col-span-4 p-7 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 relative overflow-hidden group">
            <div className="p-3 rounded-2xl bg-amber-950/60 border border-amber-500/30 text-amber-400 w-fit mb-4">
              <Truck className="w-5 h-5" />
            </div>

            <h3 className="text-lg sm:text-xl font-black text-white">
              Field Sanitation Fleet Portal
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Mobile-optimized interface for truck operators. Dynamic route guidance, task acceptance, and tamper-resistant photographic resolution proof.
            </p>

            <div className="mt-5 p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
              <Compass className="w-6 h-6 text-amber-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">38% Route Fuel Reduction</div>
                <div className="text-[10px] text-slate-400">Eliminating empty-bin dry runs</div>
              </div>
            </div>
          </div>

          {/* CARD 5: Command Center Situational Awareness (Col span 4) */}
          <div className="lg:col-span-4 p-7 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-teal-500/40 transition-all duration-300 relative overflow-hidden group">
            <div className="p-3 rounded-2xl bg-teal-950/60 border border-teal-500/30 text-teal-400 w-fit mb-4">
              <BarChart3 className="w-5 h-5" />
            </div>

            <h3 className="text-lg sm:text-xl font-black text-white">
              Command Center Geospatial Intelligence
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Citywide 20-node interactive geospatial map, waste hotspot clustering, active fleet GPS tracking, and complete municipal compliance reporting.
            </p>

            <div className="mt-5 p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-teal-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">Audited Municipal SLA</div>
                <div className="text-[10px] text-slate-400">Complete end-to-end audit logging</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
