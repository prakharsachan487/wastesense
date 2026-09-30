'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Trash2, AlertCircle, CalendarCheck, Cpu, 
  ClipboardList, Users, Truck, MapPin, BarChart3, Settings, ShieldCheck
} from 'lucide-react';
import { useWasteSense } from '../../context/WasteSenseContext';

interface NavGroup {
  name: string;
  items: {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    badgeColor?: string;
  }[];
}

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const { kpis, tasks } = useWasteSense();

  const activeTaskCount = tasks.filter(t => t.status !== 'Completed').length;

  const navGroups: NavGroup[] = [
    {
      name: 'OPERATIONS',
      items: [
        { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { 
          label: 'Smart Bins', 
          href: '/admin/smart-bins', 
          icon: Trash2,
          badge: kpis.criticalBins > 0 ? `${kpis.criticalBins} Alert` : undefined,
          badgeColor: 'bg-rose-500 text-white shadow-xs'
        },
        { 
          label: 'Priority Queue', 
          href: '/admin/ai', 
          icon: Cpu,
          badge: 'Score 95',
          badgeColor: 'bg-purple-100 text-purple-700 border border-purple-200'
        },
        { 
          label: 'Collection Tasks', 
          href: '/admin/tasks', 
          icon: ClipboardList,
          badge: activeTaskCount > 0 ? `${activeTaskCount}` : undefined,
          badgeColor: 'bg-[#F0F9FF] text-[#0077CC] border border-[#BAE6FD]'
        },
      ]
    },
    {
      name: 'FIELD',
      items: [
        { label: 'Workers', href: '/admin/workers', icon: Users },
        { label: 'Vehicles', href: '/admin/vehicles', icon: Truck },
        { label: 'Live Map', href: '/admin/map', icon: MapPin },
      ]
    },
    {
      name: 'SERVICE',
      items: [
        { 
          label: 'Complaints', 
          href: '/admin/complaints', 
          icon: AlertCircle,
          badge: kpis.openComplaints > 0 ? `${kpis.openComplaints}` : undefined,
          badgeColor: 'bg-amber-100 text-amber-800 border border-amber-200'
        },
        { label: 'Pickup Requests', href: '/admin/pickups', icon: CalendarCheck },
      ]
    },
    {
      name: 'INSIGHTS',
      items: [
        { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 min-h-[calc(100vh-80px)]">
      <div className="py-4 px-3 space-y-5 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.name} className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
              {group.name}
            </div>

            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
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
        ))}
      </div>

      {/* Footer / Secondary System Status & Settings Link */}
      <div className="p-3 border-t border-slate-100 space-y-2">
        <Link
          href="/admin/settings"
          className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
            pathname === '/admin/settings'
              ? 'bg-[#F0F9FF] text-[#0077CC] border border-[#BAE6FD] font-bold'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Settings className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
            <span>Settings & Rules</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">v2.4</span>
        </Link>

        {/* IoT Gateway Network Status */}
        <div className="p-3 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] text-xs text-[#004A80]">
          <div className="flex items-center justify-between font-bold text-[#004A80] mb-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              IoT Mesh Gateway
            </span>
            <span className="text-[10px] text-[#0077CC] font-mono font-bold">ONLINE</span>
          </div>
          <p className="text-[11px] text-slate-600">20 active sensor nodes &bull; 6 urban sectors active</p>
        </div>
      </div>
    </aside>
  );
};
