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
    <aside className="w-64 bg-slate-900/95 border-r border-slate-800 flex flex-col justify-between shrink-0 min-h-[calc(100vh-80px)]">
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
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all group ${
                isActive
                  ? 'bg-emerald-600/15 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      <div className="p-3 m-3 rounded-xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-800/30 text-xs">
        <div className="font-bold text-emerald-300 mb-1">🌱 Green City Mission</div>
        <p className="text-[11px] text-slate-400">Earn 50 Eco-Credits each time your reported waste issue is collected and verified.</p>
      </div>
    </aside>
  );
};
