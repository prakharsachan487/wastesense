'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Trash2, AlertCircle, CalendarCheck, Cpu, 
  ClipboardList, Users, Truck, MapPin, BarChart3, Bell, Settings
} from 'lucide-react';
import { useWasteSense } from '../../context/WasteSenseContext';

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const { kpis } = useWasteSense();

  const navItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { 
      label: 'Smart Bins', 
      href: '/admin/smart-bins', 
      icon: Trash2,
      badge: kpis.criticalBins > 0 ? `${kpis.criticalBins} Alert` : undefined,
      badgeColor: 'bg-rose-500 text-white'
    },
    { 
      label: 'Complaints', 
      href: '/admin/complaints', 
      icon: AlertCircle,
      badge: kpis.openComplaints > 0 ? `${kpis.openComplaints}` : undefined,
      badgeColor: 'bg-amber-500/20 text-amber-300'
    },
    { label: 'Pickup Requests', href: '/admin/pickups', icon: CalendarCheck },
    { 
      label: 'AI Operations', 
      href: '/admin/ai', 
      icon: Cpu,
      badge: 'Score 95',
      badgeColor: 'bg-purple-500/20 text-purple-300'
    },
    { label: 'Collection Tasks', href: '/admin/tasks', icon: ClipboardList },
    { label: 'Workers', href: '/admin/workers', icon: Users },
    { label: 'Vehicles', href: '/admin/vehicles', icon: Truck },
    { label: 'Map & Hotspots', href: '/admin/map', icon: MapPin },
    { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { label: 'Notifications', href: '/admin/notifications', icon: Bell },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900/95 border-r border-slate-800 flex flex-col justify-between shrink-0 min-h-[calc(100vh-80px)]">
      <div className="py-4 px-3 space-y-1">
        <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Command Center
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all group ${
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
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${item.badgeColor}`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Digital Twin Status Footer */}
      <div className="p-3 m-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400">
        <div className="flex items-center justify-between font-semibold text-slate-300 mb-1">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            IoT Digital Twin
          </span>
          <span className="text-[10px] text-emerald-400 font-mono">ONLINE</span>
        </div>
        <p className="text-[11px] text-slate-400">Simulating 20 sensor nodes across 6 urban sectors.</p>
      </div>
    </aside>
  );
};
