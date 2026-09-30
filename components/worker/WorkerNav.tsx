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
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 min-h-[calc(100vh-80px)]">
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
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                isActive
                  ? 'bg-[#F0F9FF] text-[#004A80] border border-[#BAE6FD] font-bold shadow-xs'
                  : 'text-slate-600 hover:text-[#0F172A] hover:bg-[#F8FAFC]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-[#004A80]' : 'text-slate-400 group-hover:text-slate-600'}`} />
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

      <div className="p-3.5 m-3 rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] text-xs">
        <div className="flex items-center justify-between font-bold text-[#004A80] mb-1">
          <span>Truck #04</span>
          <span className="text-[#0077CC]">84% Fuel</span>
        </div>
        <p className="text-[11px] text-slate-600">Operator: Rahul Sharma &bull; Zone A Lead</p>
      </div>
    </aside>
  );
};
