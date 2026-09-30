'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { Radio, AlertTriangle, CheckCircle, Users, Truck, MapPin } from 'lucide-react';

interface MetricItem {
  id: string;
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

const Counter: React.FC<{ value: number; padZero?: boolean }> = ({ value, padZero = false }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    const num = Math.round(latest);
    if (padZero && num < 10) return `0${num}`;
    return `${num}`;
  });

  const [displayValue, setDisplayValue] = useState(padZero ? '00' : '0');

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, {
        duration: 1.6,
        ease: [0.16, 1, 0.3, 1],
      });
      const unsubscribe = rounded.on('change', (v) => setDisplayValue(v));
      return () => {
        controls.stop();
        unsubscribe();
      };
    }
  }, [inView, value, count, rounded, padZero]);

  return <span ref={ref}>{displayValue}</span>;
};

export const LandingLiveStrip: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-40px' });

  const metrics: MetricItem[] = [
    {
      id: 'bins',
      target: 20,
      label: 'Smart Bins',
      sublabel: 'Ultrasonic sensor nodes online',
      icon: Radio,
      badge: '100% MESH',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      id: 'zones',
      target: 6,
      label: 'Municipal Zones',
      sublabel: 'Central, North, South, East, West',
      icon: MapPin,
      badge: 'COVERED',
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
    },
    {
      id: 'critical',
      target: 3,
      label: 'Critical Bins',
      sublabel: 'Fill > 85% requiring dispatch',
      icon: AlertTriangle,
      badge: 'DISPATCH TARGET',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    },
    {
      id: 'tasks',
      target: 12,
      label: 'Active Tasks',
      sublabel: 'En route & in-progress work orders',
      icon: CheckCircle,
      badge: 'OPTIMIZED',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
    {
      id: 'workers',
      target: 8,
      label: 'Field Workers',
      sublabel: 'Active sanitation crews on site',
      icon: Users,
      badge: 'GPS TRACKED',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      id: 'vehicles',
      target: 4,
      label: 'Electric Vehicles',
      sublabel: 'Zero-emission collection fleet',
      icon: Truck,
      badge: 'DYNAMIC WAYPOINTS',
      badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
    },
  ];

  return (
    <section className="relative z-20 -mt-6 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div 
        ref={containerRef}
        className="rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl shadow-slate-900/5 p-5 sm:p-7"
      >
        {/* Strip Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-black tracking-widest text-[#0F172A] uppercase">
              LIVE CITY INTELLIGENCE
            </span>
            <span className="text-slate-300 hidden sm:inline">&bull;</span>
            <span className="text-xs text-slate-500 hidden sm:inline">
              Real-time telemetry stream synchronized across municipal assets
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-semibold text-slate-700">Sub-minute IoT polling</span>
            <span className="font-mono text-slate-400">| latency: 38ms</span>
          </div>
        </div>

        {/* 6 Metrics Grid with Animated Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            const padZero = item.target < 10;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group relative p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 hover:border-[#0077CC]/40 hover:bg-white transition-all shadow-xs hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 group-hover:text-[#0077CC] group-hover:border-sky-200 transition-colors shadow-xs">
                    <Icon className="w-4 h-4" />
                  </div>
                  {item.badge && (
                    <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className="text-2xl sm:text-3xl font-mono font-black text-[#0F172A] tracking-tight">
                  <Counter value={item.target} padZero={padZero} />
                </div>

                <div className="text-xs font-bold text-[#0F172A] mt-1 group-hover:text-[#0077CC] transition-colors">
                  {item.label}
                </div>

                <p className="text-[10px] text-slate-500 mt-1 leading-snug font-medium line-clamp-2">
                  {item.sublabel}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
