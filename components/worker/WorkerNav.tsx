'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, CheckSquare, User, Truck } from 'lucide-react';
import { useWasteSense } from '../../context/WasteSenseContext';

export const WorkerNav: React.FC = () => {
  const pathname = usePathname();
  const { tasks } = useWasteSense();

  const assignedCount = tasks.filter(t => t.status === 'Assigned' || t.status === 'In Progress').length;

  const items = [
    { label: 'Work Dashboard', href: '/worker/dashboard', icon: LayoutDashboard },
    { 
      label: 'Assigned Tasks', 
      href: '/worker/tasks', 
      icon: CheckSquare, 
      badge: assignedCount > 0 ? `${assignedCount}` : undefined 
    },
    { label: 'Vehicle Telematics', href: '/worker/tasks', icon: Truck },
    { label: 'My Crew Profile', href: '/worker/profile', icon: User },
  ];

  return (
    <aside className="w-64 bg-slate-900/95 border-r border-slate-800 flex flex-col justify-between shrink-0 min-h-[calc(100vh-80px)]">
      <div className="py-4 px-3 space-y-1">
        <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Field Operations
        </div>

        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all group ${
                isActive
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-rose-500 text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      <div className="p-3.5 m-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
        <div className="flex items-center justify-between font-bold text-white mb-1">
          <span>Truck #04</span>
          <span className="text-emerald-400">84% Fuel</span>
        </div>
        <p className="text-[11px] text-slate-400">Operator: Rahul Sharma &bull; Zone A Lead</p>
      </div>
    </aside>
  );
};
