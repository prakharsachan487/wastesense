'use client';

import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export const LandingProblemSolution: React.FC = () => {
  return (
    <section id="overview" className="py-24 bg-gradient-to-b from-[#004A80] to-[#0077CC] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header matching Image 3 */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 border border-white/25 text-[11px] font-bold text-white uppercase tracking-widest mb-4 backdrop-blur-md">
            Problem & Solution
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
            Creating a Modern & Autonomous Smart Waste Infrastructure
          </h2>
        </div>

        {/* Dual Problem & Solution Cards matching Image 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Problem Card (White Background, Black Text) */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white text-[#0F172A] shadow-xl border border-slate-200/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-black tracking-tight text-[#0F172A]">
                  Municipal Challenges
                </h3>
              </div>

              <ul className="space-y-4 text-sm text-slate-600 leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                  <span>
                    <strong>Outdated static collection schedules</strong> that do not reflect actual bin fill levels, causing public street overflows.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                  <span>
                    <strong>Delayed paper or phone complaint intake</strong> that leaves citizen grievances unresolved for days without tracking.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                  <span>
                    <strong>Excessive fuel and operational fleet expenses</strong> incurred from truck drivers navigating blind routes to empty containers.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                  <span>
                    <strong>Zero accountability or verification</strong> on whether bins were genuinely cleared or simply bypassed by field workers.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                  <span>
                    <strong>Eroding citizen confidence</strong> in municipal cleanliness and lack of incentives for proper waste segregation.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Status: Legacy Municipal Operations</span>
              <span className="text-rose-600 font-bold">Inefficient &amp; Costly</span>
            </div>
          </div>

          {/* Solution Card (Soft Light Blue / Mint Tinted Background) */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#F0F9FF] text-[#0F172A] shadow-xl border border-[#BAE6FD] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-[#0077CC] flex items-center justify-center text-white shrink-0 shadow-md shadow-[#0077CC]/20">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-black tracking-tight text-[#0F172A]">
                  WasteSense Solution
                </h3>
              </div>

              <ul className="space-y-4 text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0077CC] mt-2 shrink-0" />
                  <span>
                    <strong>Autonomous IoT sensory mesh</strong> streaming continuous ultrasonic fill %, load cell weight, and internal fire hazard telemetry.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0077CC] mt-2 shrink-0" />
                  <span>
                    <strong>Predictive time-to-overflow algorithms</strong> that forecast container saturation 30–60 minutes in advance.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0077CC] mt-2 shrink-0" />
                  <span>
                    <strong>Dynamic route optimization</strong> cutting up to 38% fleet fuel consumption through waypoint-guided dispatch.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0077CC] mt-2 shrink-0" />
                  <span>
                    <strong>Tamper-resistant photographic completion proof</strong> that automatically resets sensor telemetry in the central command center.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0077CC] mt-2 shrink-0" />
                  <span>
                    <strong>Gamified citizen eco-rewards</strong> granting 50 municipal utility credits for verified grievance resolution.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-[#BAE6FD]/60 flex items-center justify-between text-xs text-[#004A80] font-medium">
              <span>Status: Autonomous Smart Operations</span>
              <span className="text-[#0077CC] font-bold">100% Closed Loop</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
