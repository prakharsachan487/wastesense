'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  BarChart3, 
  TrendingDown, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Fuel, 
  Leaf, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';

export const LandingMetrics: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });

  const zoneData = [
    { zone: 'Zone A - Commercial Hub', progress: 88, color: 'from-[#0077CC] to-[#0EA5E9]', bins: '14/16 Cleared' },
    { zone: 'Zone B - Residential Sectors', progress: 74, color: 'from-sky-500 to-teal-400', bins: '18/24 Cleared' },
    { zone: 'Zone C - Market Corridor', progress: 92, color: 'from-indigo-600 to-sky-400', bins: '11/12 Cleared' },
    { zone: 'Zone D - Transit Terminals', progress: 65, color: 'from-amber-500 to-rose-400', bins: '7/10 Cleared' },
  ];

  return (
    <section id="impact" className="py-24 bg-[#F8FAFC] relative overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={containerRef}>
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-widest mb-3 shadow-xs">
            <BarChart3 className="w-3.5 h-3.5 text-[#0077CC]" />
            Municipal Operational Analytics
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] tracking-tight leading-[1.1]">
            A City That Can{' '}
            <span className="bg-gradient-to-r from-[#0077CC] to-[#0EA5E9] bg-clip-text text-transparent">
              See Its Waste.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            From reactive municipal firefighting to predictive precision: real-time telemetry and transparent KPIs keep administrators and citizens aligned.
          </p>
        </div>

        {/* Large Animated Dashboard Visualization */}
        <div className="rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-10">
          
          {/* Dashboard Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-slate-100 gap-4">
            <div>
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider block">
                MUNICIPAL TELEMETRY SNAPSHOT
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] mt-0.5">
                Citywide Daily Operations Overview
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-mono font-bold text-slate-700">Live Synchronized</span>
              <span className="text-xs font-mono text-slate-400">| Today 16:45</span>
            </div>
          </div>

          {/* 4 Core KPI Tiles */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            
            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
                Grievances Logged
              </span>
              <div className="text-3xl sm:text-4xl font-mono font-black text-[#0F172A] mt-1">
                128
              </div>
              <div className="text-[11px] text-slate-500 mt-1 font-medium">
                Photo &amp; GPS geotagged
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
                Completed Collections
              </span>
              <div className="text-3xl sm:text-4xl font-mono font-black text-[#0077CC] mt-1">
                94
              </div>
              <div className="text-[11px] text-emerald-600 mt-1 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Proof Verified
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
                Critical Bins Tracked
              </span>
              <div className="text-3xl sm:text-4xl font-mono font-black text-rose-600 mt-1">
                07
              </div>
              <div className="text-[11px] text-slate-500 mt-1 font-medium">
                Active overflow prevention
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
                SLA Resolution Rate
              </span>
              <div className="text-3xl sm:text-4xl font-mono font-black text-emerald-600 mt-1">
                86%
              </div>
              <div className="text-[11px] text-emerald-700 mt-1 font-medium">
                Within 2-hour target
              </div>
            </div>

          </div>

          {/* 2 Focused Visualizations: Zone Activity + Environmental Fleet Impact */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 border-t border-slate-100">
            
            {/* VIZ 1: Municipal Zone Progress Bars (Col Span 7) */}
            <div className="lg:col-span-7">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-black text-[#0F172A] uppercase tracking-wider">
                  Zone Activity &amp; Clearance Rate
                </h4>
                <span className="text-xs text-slate-400 font-mono">Real-time status</span>
              </div>

              <div className="space-y-4">
                {zoneData.map((z, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-between text-xs font-bold mb-2">
                      <span className="text-[#0F172A]">{z.zone}</span>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-slate-400 text-[11px]">{z.bins}</span>
                        <span className="font-mono text-[#0077CC]">{z.progress}%</span>
                      </div>
                    </div>

                    <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${z.progress}%` } : {}}
                        transition={{ duration: 1.2, delay: idx * 0.15, ease: 'easeOut' }}
                        className={`h-full rounded-full bg-gradient-to-r ${z.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* VIZ 2: Environmental & Fleet Efficiency Metric Cards (Col Span 5) */}
            <div className="lg:col-span-5 space-y-4">
              
              <div className="p-6 rounded-2xl bg-[#0F172A] text-white border border-slate-800 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0077CC]/20 border border-[#0077CC] flex items-center justify-center text-[#38BDF8] shrink-0">
                  <Fuel className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-mono font-black text-sky-400">
                    38%
                  </div>
                  <div className="text-xs font-bold text-white mt-0.5">
                    Fleet Diesel Consumption Saved
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Through dynamic AI waypoints eliminating blind routes.
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-emerald-950 text-white border border-emerald-800 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-900 border border-emerald-600 flex items-center justify-center text-emerald-400 shrink-0">
                  <Leaf className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-mono font-black text-emerald-400">
                    14.2 Tons
                  </div>
                  <div className="text-xs font-bold text-white mt-0.5">
                    Waste Diverted This Month
                  </div>
                  <div className="text-[11px] text-emerald-300 mt-1">
                    Routed directly to composting &amp; certified recycling plants.
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Link to Full Analytics */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Aggregated telemetry compliant with municipal open-data directives.</span>
            <Link
              href="/admin/analytics"
              className="text-[#0077CC] font-bold flex items-center gap-1 hover:underline"
            >
              <span>View Citywide Analytics Report</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};
