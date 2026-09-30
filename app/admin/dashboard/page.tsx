'use client';

import React from 'react';
import Link from 'next/link';
import { useWasteSense } from '../../../context/WasteSenseContext';
import { StatCard } from '../../../components/ui/StatCard';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { PriorityBadge } from '../../../components/ui/PriorityBadge';
import { MapPanel } from '../../../components/admin/MapPanel';
import { 
  AlertTriangle, FileText, CheckCircle2, Users, TrendingUp, 
  Trash2, Cpu, ArrowUpRight
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { kpis, bins, complaints, tasks } = useWasteSense();

  // Top AI priority bins
  const aiPriorityQueue = [...bins]
    .sort((a, b) => b.priority_score - a.priority_score)
    .slice(0, 5);

  // Recent operational activity
  const recentActivities = [
    { title: 'IoT Surge Alert', desc: 'Bin B-102 at Central Market reached 94% fill capacity', time: '2m ago', type: 'critical' },
    { title: 'Task Dispatched', desc: 'Rahul Sharma assigned to TSK-1042 (Truck #04)', time: '8m ago', type: 'info' },
    { title: 'Citizen Complaint', desc: 'WS-2026-1042 registered: Sidewalk overflow Sector 12', time: '45m ago', type: 'warning' },
    { title: 'Verified Collection', desc: 'Bin B-087 emptied and verified. Telemetry reset to 14%', time: '1h 10m ago', type: 'success' },
    { title: 'Scheduled Bulk Pickup', desc: 'Apex Business Tower 1.2 tons packaging scheduled', time: '2h ago', type: 'info' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Admin Command Center</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F0F9FF] text-[#0077CC] font-semibold border border-[#BAE6FD]">
              Live Operations
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time citywide situational awareness &bull; IoT Sensor Telemetry &bull; Automated Smart Dispatch
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/smart-bins"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-700 shadow-xs transition"
          >
            <span>Inspect All Bins</span>
          </Link>

          <Link
            href="/admin/tasks"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0077CC] hover:bg-[#004A80] text-white text-xs font-bold shadow-sm transition"
          >
            <span>View Work Orders</span>
          </Link>
        </div>
      </div>

      {/* 5 Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Critical Bins"
          value={kpis.criticalBins}
          subtitle="&ge;90% Capacity or Fire Hazard"
          badge="Requires Action"
          variant="rose"
          icon={<AlertTriangle className="w-5 h-5 text-rose-500" />}
        />

        <StatCard
          title="Open Complaints"
          value={kpis.openComplaints}
          subtitle="Citizen Reported Issues"
          badge="Active Tickets"
          variant="amber"
          icon={<FileText className="w-5 h-5 text-amber-500" />}
        />

        <StatCard
          title="Today's Pickups"
          value={kpis.pickupsToday}
          subtitle="Verified Emptied & Logged"
          badge="On Track"
          variant="emerald"
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
        />

        <StatCard
          title="Active Workers"
          value={kpis.activeWorkers}
          subtitle="Sanitation Crews On Route"
          badge="8 Units"
          variant="sky"
          icon={<Users className="w-5 h-5 text-[#0EA5E9]" />}
        />

        <StatCard
          title="Collection Efficiency"
          value={`${kpis.efficiencyPct}%`}
          subtitle="SLA Resolution Compliance"
          badge="High Efficiency"
          variant="indigo"
          icon={<TrendingUp className="w-5 h-5 text-[#0077CC]" />}
        />
      </div>

      {/* Main Grid: AI Priority Queue + Interactive Hotspot Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: AI Priority Queue */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#0077CC]" />
                <h3 className="text-sm font-bold text-[#0F172A]">Priority Dispatch Queue</h3>
              </div>
              <Link href="/admin/ai" className="text-xs text-[#0077CC] hover:underline flex items-center gap-0.5 font-semibold">
                <span>View Full Engine</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {aiPriorityQueue.map((bin) => (
                <div 
                  key={bin.bin_id}
                  className={`p-3 rounded-xl border transition ${
                    bin.status === 'CRITICAL' 
                      ? 'bg-rose-50/60 border-rose-200' 
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-black text-[#0F172A]">{bin.bin_id}</span>
                      <PriorityBadge priority={bin.status} score={bin.priority_score} />
                    </div>
                    <span className={`font-mono text-sm font-bold ${bin.fill_level >= 90 ? 'text-rose-600' : 'text-slate-800'}`}>
                      {bin.fill_level}%
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 truncate font-medium">{bin.location}</p>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                    <span>{bin.overflow_prediction}</span>
                    <Link
                      href={`/admin/smart-bins?search=${bin.bin_id}`}
                      className="text-[#0077CC] hover:text-[#004A80] font-semibold flex items-center gap-0.5"
                    >
                      <span>Inspect Bin</span>
                      <span>&rarr;</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200">
            <Link
              href="/admin/tasks"
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <span>Manage Collection Work Orders</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right: Operational Stream & Recent Activities */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
            <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Operational Stream & Resolution Log</span>
            </h3>
            <span className="text-[11px] text-slate-500 font-mono font-medium">AUTOREFRESHED</span>
          </div>

          <div className="space-y-3">
            {recentActivities.map((act, i) => (
              <div 
                key={i} 
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3 hover:border-slate-300 transition"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#0F172A]">{act.title}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      act.type === 'critical' ? 'bg-rose-500' :
                      act.type === 'warning' ? 'bg-amber-500' :
                      act.type === 'success' ? 'bg-emerald-500' : 'bg-[#0EA5E9]'
                    }`} />
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">{act.desc}</p>
                </div>
                <span className="text-[11px] text-slate-400 font-mono shrink-0">{act.time}</span>
              </div>
            ))}
          </div>

          {/* Quick links banner */}
          <div className="mt-5 p-3.5 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-[#004A80] block">Closed-Loop Operational Integrity</span>
              <span className="text-slate-600 text-[11px]">When workers complete pickups, bin telemetry flushes back to 18% automatically.</span>
            </div>
            <Link
              href="/admin/smart-bins"
              className="px-3 py-1.5 rounded-lg bg-[#0077CC] hover:bg-[#004A80] text-white font-semibold text-xs transition shrink-0 shadow-xs"
            >
              Inspect Fleet &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Geospatial Map Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-base font-bold text-[#0F172A]">Geospatial Operations & Hotspot Clustering</h2>
          <p className="text-xs text-slate-500">Click any marker to inspect real-time sensor levels, weight strain, and predictive overflow forecast.</p>
        </div>
        <MapPanel />
      </div>
    </div>
  );
}
