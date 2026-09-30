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
      icon: Shield,
      tagColor: 'text-[#0077CC] border-[#BAE6FD] bg-[#F0F9FF]',
      buttonBg: 'bg-[#0077CC] hover:bg-[#004A80] text-white shadow-md shadow-[#0077CC]/20',
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
      icon: User,
      tagColor: 'text-[#0077CC] border-[#BAE6FD] bg-[#F0F9FF]',
      buttonBg: 'bg-[#0EA5E9] hover:bg-[#0077CC] text-white shadow-md shadow-[#0EA5E9]/20',
      description: 'Public civic platform empowering residents to actively participate in smart city cleanliness and earn municipal green credits.',
      features: [
        'Geotagged photographic complaint intake',
        'Doorstep bulk & e-waste collection booking',
        'Nearby smart bin finder with real-time fill %',
        'Interactive 4-stream waste segregation guide',
        'GPS & photo-verified issue resolution'
      ]
    },
    {
      id: 'worker',
      role: 'Sanitation Fleet Portal',
      tag: 'FIELD OPERATOR ACCESS',
      icon: Truck,
      tagColor: 'text-[#004A80] border-[#BAE6FD] bg-[#F0F9FF]',
      buttonBg: 'bg-[#004A80] hover:bg-[#0077CC] text-white shadow-md shadow-[#004A80]/20',
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
    <section id="portals" className="py-24 bg-[#F8FAFC] relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#BAE6FD] text-[11px] font-bold text-[#0077CC] uppercase tracking-widest mb-3 shadow-xs">
            Strict Role-Isolated Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight">
            Three Dedicated Experience Portals
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600">
            Engineered with strict role guards: administrators, citizens, and field operators each have tailored interfaces with zero unauthorized access.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {portals.map((p) => (
            <div
              key={p.id}
              className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-[#0077CC] transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] flex items-center justify-center text-[#0077CC]">
                    <p.icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border ${p.tagColor}`}>
                    {p.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-[#0F172A]">{p.role}</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed mb-6">
                  {p.description}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-slate-100 mb-8">
                  {p.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#0077CC] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/login"
                className={`w-full py-3.5 px-6 rounded-full font-bold text-xs transition-all flex items-center justify-between active:scale-95 group/btn ${p.buttonBg}`}
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
