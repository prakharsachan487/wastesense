'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, AlertTriangle, FileText, Calendar, Trash2, BookOpen, User
} from 'lucide-react';

export const CitizenSidebar: React.FC = () => {
  const pathname = usePathname();

  const citizenNav = [
    { label: 'Citizen Home', href: '/citizen/dashboard', icon: Home },
    { label: 'Report Waste', href: '/citizen/report', icon: AlertTriangle, badge: 'New' },
    { label: 'My Complaints', href: '/citizen/complaints', icon: FileText },
    { label: 'Request Pickup', href: '/citizen/pickup', icon: Calendar },
    { label: 'Nearby Smart Bins', href: '/citizen/bins', icon: Trash2 },
    { label: 'Segregation Guide', href: '/citizen/awareness', icon: BookOpen },
    { label: 'My Profile', href: '/citizen/profile', icon: User },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 min-h-[calc(100vh-80px)]">
      <div className="py-4 px-3 space-y-1">
        <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Citizen Services
        </div>

        {citizenNav.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                isActive
                  ? 'bg-[#F0F9FF] text-[#0EA5E9] border border-[#BAE6FD] font-bold shadow-xs'
                  : 'text-slate-600 hover:text-[#0F172A] hover:bg-[#F8FAFC]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-[#0EA5E9]' : 'text-slate-400 group-hover:text-slate-600'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#E0F2FE] text-[#0077CC]">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      <div className="p-3.5 m-3 rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] text-xs text-[#004A80]">
        <div className="font-bold text-[#0077CC] mb-1">Municipal Ward 12</div>
        <p className="text-[11px] text-slate-600">Reports are auto-assigned to active zone sanitation units with real-time GPS tracking.</p>
      </div>
    </aside>
  );
};
