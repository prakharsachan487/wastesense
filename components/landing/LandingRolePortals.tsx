'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Shield, User, Truck, CheckCircle2 } from 'lucide-react';

export const LandingRolePortals: React.FC = () => {
  const portals = [
    {
      id: 'admin',
      role: 'Admin Command Center',
      tag: 'MUNICIPAL OPERATIONS',
      icon: '👨‍💼',
      tagColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40',
      buttonBg: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950',
      description: 'Central command authority with citywide situational awareness, digital twin telemetry calibration, and automated smart dispatch.',
      features: [
        'Real-time 20-node IoT telemetry & fire alerts',
        'Transparent multi-factor priority engine',
        'Citizen grievance triage & fleet dispatch',
        'Geospatial hotspot clustering & heatmaps',
        'Comprehensive audit logs & diversion analytics'
      ]
    },
    {
      id: 'citizen',
      role: 'Citizen Service Portal',
      tag: 'PUBLIC RESIDENT ACCESS',
      icon: '🧑',
      tagColor: 'text-sky-400 border-sky-500/40 bg-sky-950/40',
      buttonBg: 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-950',
      description: 'Public civic platform empowering residents to actively participate in smart city cleanliness and earn municipal green credits.',
      features: [
        'Geotagged photographic complaint intake',
        'Doorstep bulk & e-waste collection booking',
        'Nearby smart bin finder with real-time fill %',
        'Interactive 4-stream waste segregation guide',
        '50 Eco-Credits per verified resolution'
      ]
    },
    {
      id: 'worker',
      role: 'Sanitation Fleet Portal',
      tag: 'FIELD OPERATOR ACCESS',
      icon: '👷',
      tagColor: 'text-amber-400 border-amber-500/40 bg-amber-950/40',
      buttonBg: 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-950',
      description: 'Mobile-first driver and sanitation crew portal designed for rapid field execution, navigation, and verified resolution.',
      features: [
        'Live assigned collection work order queue',
        'Turn-by-turn route navigation & ETA tracking',
        'Truck telematics & fuel level monitoring',
        'Tamper-resistant photographic proof upload',
        'Instant closed-loop sensor telemetry reset'
      ]
    }
  ];

  return (
    <section id="portals" className="py-24 bg-[#080B12] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-emerald-500/40 text-[11px] font-bold text-emerald-400 uppercase tracking-widest mb-3">
            Strict Role-Isolated Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Three Dedicated Experience Portals
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            Engineered with strict role guards: administrators, citizens, and field operators each have tailored interfaces with zero unauthorized access.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {portals.map((p) => (
            <div
              key={p.id}
              className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{p.icon}</span>
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border ${p.tagColor}`}>
                    {p.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white">{p.role}</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed mb-6">
                  {p.description}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-slate-800/80 mb-8">
                  {p.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/login"
                className={`w-full py-3.5 px-5 rounded-2xl font-black text-xs transition-all flex items-center justify-between shadow-lg active:scale-95 group/btn ${p.buttonBg}`}
              >
                <span>Launch {p.role.split(' ')[0]} Portal</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
