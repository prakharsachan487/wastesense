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
      label: 'Priority Engine', 
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
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 min-h-[calc(100vh-80px)]">
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
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                isActive
                  ? 'bg-[#F0F9FF] text-[#0077CC] border border-[#BAE6FD] font-bold shadow-xs'
                  : 'text-slate-600 hover:text-[#0F172A] hover:bg-[#F8FAFC]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-[#0077CC]' : 'text-slate-400 group-hover:text-slate-600'}`} />
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

      {/* IoT Gateway Network Status */}
      <div className="p-3.5 m-3 rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] text-xs text-[#004A80]">
        <div className="flex items-center justify-between font-bold text-[#004A80] mb-1">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#0077CC] animate-pulse"></span>
            IoT Gateway Network
          </span>
          <span className="text-[10px] text-[#0077CC] font-mono font-bold">ONLINE</span>
        </div>
        <p className="text-[11px] text-slate-600">20 active sensor nodes connected across 6 urban sectors.</p>
      </div>
    </aside>
  );
};
