'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Shield, 
  User, 
  Truck, 
  ArrowRight, 
  CheckCircle2, 
  BarChart3, 
  Radio, 
  MapPin, 
  Camera, 
  Navigation, 
  ShieldCheck,
  Zap
} from 'lucide-react';

interface PortalCard {
  id: string;
  role: string;
  headline: string;
  tag: string;
  badge: string;
  icon: React.ElementType;
  route: string;
  themeColor: string;
  accentColor: string;
  borderColor: string;
  buttonGradient: string;
  capabilities: { title: string; desc: string; icon: React.ElementType }[];
}

export const LandingRolePortals: React.FC = () => {
  const portals: PortalCard[] = [
    {
      id: 'admin',
      role: 'ADMIN',
      headline: 'COMMAND CENTER',
      tag: 'SUPERVISORY OVERSIGHT',
      badge: 'Municipal Authority',
      icon: Shield,
      route: '/admin/dashboard',
      themeColor: 'from-[#0077CC]/10 via-[#0EA5E9]/5 to-transparent',
      accentColor: 'text-[#0077CC]',
      borderColor: 'group-hover:border-[#0077CC]/50',
      buttonGradient: 'bg-gradient-to-r from-[#004A80] to-[#0077CC] hover:from-[#0077CC] hover:to-[#0EA5E9]',
      capabilities: [
        { title: 'Monitor', desc: 'Real-time citywide 20-node IoT telemetry & fire hazard alerts', icon: Radio },
        { title: 'Prioritize', desc: 'Mathematical multi-factor AI scoring with transparent logic', icon: Zap },
        { title: 'Dispatch', desc: 'Automated work order allocation to nearest active vehicle', icon: Navigation },
        { title: 'Analyze', desc: 'Audit-ready compliance reporting & collection diversion metrics', icon: BarChart3 },
      ],
    },
    {
      id: 'citizen',
      role: 'CITIZEN',
      headline: 'CITIZEN SERVICE',
      tag: 'PUBLIC CIVIC ENGAGEMENT',
      badge: 'Resident Access',
      icon: User,
      route: '/citizen/dashboard',
      themeColor: 'from-sky-500/10 via-cyan-500/5 to-transparent',
      accentColor: 'text-sky-600',
      borderColor: 'group-hover:border-sky-400/50',
      buttonGradient: 'bg-gradient-to-r from-[#0077CC] to-[#0EA5E9] hover:from-[#0EA5E9] hover:to-sky-400',
      capabilities: [
        { title: 'Report', desc: 'Zomato-style live GPS geotagged photo complaint submission', icon: Camera },
        { title: 'Track', desc: 'Real-time tracking of assigned worker arrival & status', icon: MapPin },
        { title: 'Book Pickup', desc: 'On-demand scheduled collection for e-waste & bulky items', icon: Truck },
        { title: 'Learn', desc: '4-stream waste segregation awareness & disposal guides', icon: CheckCircle2 },
      ],
    },
    {
      id: 'worker',
      role: 'WORKER',
      headline: 'SANITATION FLEET',
      tag: 'FIELD OPERATOR ACCESS',
      badge: 'Mobile Optimized',
      icon: Truck,
      route: '/worker/dashboard',
      themeColor: 'from-emerald-500/10 via-teal-500/5 to-transparent',
      accentColor: 'text-emerald-600',
      borderColor: 'group-hover:border-emerald-400/50',
      buttonGradient: 'bg-gradient-to-r from-emerald-700 to-[#0077CC] hover:from-[#0077CC] hover:to-teal-500',
      capabilities: [
        { title: 'Receive Task', desc: 'Instant push work orders prioritized by urgency score', icon: Radio },
        { title: 'Navigate', desc: 'Turn-by-turn dynamic waypoint routing to target container', icon: Navigation },
        { title: 'Collect', desc: '100m GPS geofence arrival audit verification on site', icon: ShieldCheck },
        { title: 'Verify', desc: 'Mandatory resolution photo upload closing operational loop', icon: Camera },
      ],
    },
  ];

  return (
    <section id="portals" className="py-24 bg-[#F8FAFC] relative overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-widest mb-3 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#0077CC]" />
            Unified Municipal Experience
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] tracking-tight leading-[1.1]">
            One Platform.{' '}
            <span className="bg-gradient-to-r from-[#0077CC] to-[#0EA5E9] bg-clip-text text-transparent">
              Three Perspectives.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Engineered with strict role guards: administrators, citizens, and field operators each have dedicated interfaces with zero unauthorized access.
          </p>
        </div>

        {/* 3 Large Interactive Cards with Hover Lift, Tilt & Inner Shift */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {portals.map((p) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.id}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className={`group rounded-3xl bg-white border border-slate-200/90 ${p.borderColor} p-7 sm:p-8 flex flex-col justify-between shadow-md shadow-slate-900/5 hover:shadow-2xl hover:shadow-[#0077CC]/10 transition-all duration-300 relative overflow-hidden`}
              >
                {/* Subtle Ambient Hover Glow */}
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${p.themeColor} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-[#0F172A] group-hover:scale-105 group-hover:bg-white group-hover:shadow-sm transition-all">
                        <Icon className={`w-6 h-6 ${p.accentColor}`} />
                      </div>
                      <div>
                        <span className="font-mono text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                          {p.role}
                        </span>
                        <h3 className="text-xl font-black text-[#0F172A] tracking-tight">
                          {p.headline}
                        </h3>
                      </div>
                    </div>

                    <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {p.badge}
                    </span>
                  </div>

                  {/* 4 Core Pillars Grid */}
                  <div className="space-y-3 mb-8">
                    {p.capabilities.map((cap, idx) => {
                      const CapIcon = cap.icon;
                      return (
                        <div 
                          key={idx}
                          className="p-3 rounded-2xl bg-slate-50/70 border border-slate-100 group-hover:bg-white group-hover:border-slate-200/80 transition-all flex items-start gap-3"
                        >
                          <div className="w-7 h-7 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 shrink-0 mt-0.5 shadow-2xs">
                            <CapIcon className="w-3.5 h-3.5 text-[#0077CC]" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#0F172A]">
                              {cap.title}
                            </div>
                            <div className="text-[11px] text-slate-500 leading-snug mt-0.5">
                              {cap.desc}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Explore Portal Action Button */}
                <Link
                  href={p.route}
                  className={`w-full py-3.5 px-6 rounded-2xl font-bold text-xs text-white shadow-md shadow-[#0077CC]/20 flex items-center justify-between transition-all active:scale-95 group/btn ${p.buttonGradient}`}
                >
                  <span>Explore {p.headline.toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Caption */}
        <div className="mt-12 text-center text-xs text-slate-500">
          <span>Enterprise Role-Based Access Control (RBAC) &bull; Seamless Single Sign-On Ready</span>
        </div>

      </div>
    </section>
  );
};
