'use client';

import React from 'react';
import { 
  Radio, Cpu, Users, Truck, BarChart3, ShieldCheck, 
  MapPin, Flame, Award, Smartphone, Compass, Sparkles 
} from 'lucide-react';

export const LandingBento: React.FC = () => {
  return (
    <section id="technology" className="py-24 bg-white relative overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F0F9FF] border border-[#BAE6FD] text-[11px] font-bold text-[#0077CC] uppercase tracking-widest mb-3">
            Core Architecture & Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight">
            Designed for Modern Smart Municipalities
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600">
            A unified suite engineered for city administrators, field collection crews, and urban residents.
          </p>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-5">
          
          {/* CARD 1: IoT Smart Bin Telemetry (Col span 7) */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 hover:border-[#0077CC] transition-all duration-300 relative overflow-hidden group shadow-xs">
            
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-[#E0F2FE] border border-[#BAE6FD] text-[#0077CC]">
                <Radio className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#0077CC] bg-[#E0F2FE] border border-[#BAE6FD] px-2.5 py-1 rounded-full font-bold">
                20 Active Nodes
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-[#0F172A]">
              IoT Sensor Mesh & Digital Twin Telemetry
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl leading-relaxed">
              Every smart bin node streams real-time ultrasonic distance, load cell strain (gross weight), internal temperature, and battery telemetry. Detects rapid surges and smoldering fire hazards before they escalate.
            </p>

            {/* Micro Telemetry Widget */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-2xl bg-white border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Ultrasonic Fill</span>
                <div className="text-base font-mono font-bold text-[#0F172A] mt-0.5">Continuous %</div>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Gross Weight</span>
                <div className="text-base font-mono font-bold text-[#0F172A] mt-0.5">0.1 - 40 kg</div>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Fire Safety</span>
                <div className="text-base font-mono font-bold text-[#0077CC] mt-0.5">&gt;50°C Alarm</div>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Battery Life</span>
                <div className="text-base font-mono font-bold text-[#0F172A] mt-0.5">24+ Months</div>
              </div>
            </div>
          </div>

          {/* CARD 2: Transparent Decision Engine (Col span 5) */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 hover:border-[#0077CC] transition-all duration-300 relative overflow-hidden group shadow-xs">

            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-[#E0F2FE] border border-[#BAE6FD] text-[#0077CC]">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#0077CC] bg-[#E0F2FE] border border-[#BAE6FD] px-2.5 py-1 rounded-full font-bold">
                Multi-Factor Logic
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-[#0F172A]">
              Predictive Priority Engine
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Transparent, audit-ready formulation rankings. No black-box guesses: priority is calculated mathematically to dispatch routes dynamically.
            </p>

            {/* Formula Breakdown Cards */}
            <div className="mt-5 space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-slate-700 font-medium">Fill Capacity Weight</span>
                <span className="font-mono text-[#0077CC] font-bold">40%</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-slate-700 font-medium">Citizen Complaint Density</span>
                <span className="font-mono text-[#0077CC] font-bold">25%</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-slate-700 font-medium">Uncollected Wait Time</span>
                <span className="font-mono text-[#0077CC] font-bold">20%</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-slate-700 font-medium">Commercial Zone Density</span>
                <span className="font-mono text-[#0077CC] font-bold">15%</span>
              </div>
            </div>
          </div>

          {/* CARD 3: Citizen Civic Grievance & Geotagged Reporting (Col span 4) */}
          <div className="lg:col-span-4 p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 hover:border-[#0077CC] transition-all duration-300 relative overflow-hidden group shadow-xs">
            <div className="p-3 rounded-2xl bg-[#E0F2FE] border border-[#BAE6FD] text-[#0077CC] w-fit mb-4">
              <Users className="w-5 h-5" />
            </div>

            <h3 className="text-lg sm:text-xl font-black text-[#0F172A]">
              Civic Grievance & Geotagged Reporting
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Residents report sidewalk waste with live GPS geotagged photo evidence, triggering instant auto-assignment to active zone sanitation crews.
            </p>

            <div className="mt-5 p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center gap-3">
              <MapPin className="w-6 h-6 text-[#0077CC] shrink-0" />
              <div>
                <div className="text-xs font-bold text-[#0F172A]">Zomato-Style Live GPS Locking</div>
                <div className="text-[10px] text-slate-500">100m geofence validation on resolution</div>
              </div>
            </div>
          </div>

          {/* CARD 4: Sanitation Fleet Telematics (Col span 4) */}
          <div className="lg:col-span-4 p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 hover:border-[#0077CC] transition-all duration-300 relative overflow-hidden group shadow-xs">
            <div className="p-3 rounded-2xl bg-[#E0F2FE] border border-[#BAE6FD] text-[#004A80] w-fit mb-4">
              <Truck className="w-5 h-5" />
            </div>

            <h3 className="text-lg sm:text-xl font-black text-[#0F172A]">
              Field Sanitation Fleet Portal
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Mobile-optimized interface for truck operators. Dynamic route guidance, task acceptance, and tamper-resistant photographic resolution proof.
            </p>

            <div className="mt-5 p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center gap-3">
              <Compass className="w-6 h-6 text-[#0077CC] shrink-0" />
              <div>
                <div className="text-xs font-bold text-[#0F172A]">Dynamic Route Guidance</div>
                <div className="text-[10px] text-slate-500">Eliminating empty-bin dry runs</div>
              </div>
            </div>
          </div>

          {/* CARD 5: Command Center Situational Awareness (Col span 4) */}
          <div className="lg:col-span-4 p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 hover:border-[#0077CC] transition-all duration-300 relative overflow-hidden group shadow-xs">
            <div className="p-3 rounded-2xl bg-[#E0F2FE] border border-[#BAE6FD] text-[#0077CC] w-fit mb-4">
              <BarChart3 className="w-5 h-5" />
            </div>

            <h3 className="text-lg sm:text-xl font-black text-[#0F172A]">
              Command Center Geospatial Intelligence
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Citywide 20-node interactive geospatial map, waste hotspot clustering, active fleet GPS tracking, and complete municipal compliance reporting.
            </p>

            <div className="mt-5 p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#0077CC] shrink-0" />
              <div>
                <div className="text-xs font-bold text-[#0F172A]">Audited Municipal SLA</div>
                <div className="text-[10px] text-slate-500">Complete end-to-end audit logging</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
