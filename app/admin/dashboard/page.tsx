'use client';

import React from 'react';
import Link from 'next/link';
import { useWasteSense } from '../../../context/WasteSenseContext';
import { PriorityBadge } from '../../../components/ui/PriorityBadge';
import { MapPanel } from '../../../components/admin/MapPanel';
import { AdminAIAssistant } from '../../../components/admin/AdminAIAssistant';
import { AnimatedNumber } from '../../../components/ui/AnimatedNumber';
import { 
  AlertTriangle, FileText, CheckCircle2, Users, TrendingUp, 
  Trash2, Cpu, ArrowUpRight, Radio, Activity, Send, Sparkles, Zap
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { kpis, bins, complaints, tasks, simulateSurgeB102, createTask, workers, vehicles } = useWasteSense();

  const activeTaskCount = tasks.filter(t => t.status !== 'Completed').length;

  // Top AI priority bins
  const aiPriorityQueue = [...bins]
    .sort((a, b) => b.priority_score - a.priority_score)
    .slice(0, 5);

  // Recent operational activity
  const recentActivities = [
    { title: 'IoT Surge Alert', desc: 'Bin B-102 at Central Market reached 95% fill capacity', time: '2m ago', type: 'critical' },
    { title: 'Task Dispatched', desc: 'Rahul Sharma assigned to TSK-1042 (Truck #04)', time: '8m ago', type: 'info' },
    { title: 'Citizen Complaint', desc: 'WS-2026-1042 registered: Sidewalk overflow Sector 12', time: '45m ago', type: 'warning' },
    { title: 'Verified Collection', desc: 'Bin B-087 emptied and verified. Telemetry reset to 14%', time: '1h 10m ago', type: 'success' },
    { title: 'Scheduled Bulk Pickup', desc: 'Apex Business Tower 1.2 tons packaging scheduled', time: '2h ago', type: 'info' },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header with 5-Second Hierarchy & Fast KPI Counters */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">City Operations</h1>
              <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-0.5 rounded-full bg-[#F0F9FF] text-[#0077CC] font-bold border border-[#BAE6FD]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Situational Grid
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Real-time urban telemetry &bull; LoRaWAN mesh active &bull; Automated AI closed-loop dispatch
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => simulateSurgeB102()}
              className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition flex items-center gap-1.5 active:scale-95 shadow-xs"
              title="Trigger simulated 95% overflow on Node B-102"
            >
              <Zap className="w-3.5 h-3.5 text-rose-600" />
              <span>Simulate B-102 Surge</span>
            </button>

            <Link
              href="/admin/smart-bins"
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-700 shadow-xs transition"
            >
              Inspect Fleet
            </Link>

            <Link
              href="/admin/tasks"
              className="px-3.5 py-2 rounded-xl bg-[#0077CC] hover:bg-[#004A80] text-white text-xs font-bold shadow-sm transition"
            >
              Work Orders
            </Link>
          </div>
        </div>

        {/* The 4 Scannable KPI Pills with Animated Numbers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
          {/* Critical Bins */}
          <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-700 block">Critical Nodes</span>
              <div className="text-2xl font-black font-mono text-rose-700 flex items-baseline gap-1 mt-0.5">
                <AnimatedNumber value={kpis.criticalBins} padZero />
                <span className="text-xs font-normal text-rose-500">&ge;90% fill</span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-xs">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>

          {/* Open Citizen Reports */}
          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 block">Open Reports</span>
              <div className="text-2xl font-black font-mono text-amber-800 flex items-baseline gap-1 mt-0.5">
                <AnimatedNumber value={kpis.openComplaints} padZero />
                <span className="text-xs font-normal text-amber-600">Active tickets</span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
          </div>

          {/* Active Work Tasks */}
          <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0077CC] block">Active Tasks</span>
              <div className="text-2xl font-black font-mono text-[#0077CC] flex items-baseline gap-1 mt-0.5">
                <AnimatedNumber value={activeTaskCount} padZero />
                <span className="text-xs font-normal text-sky-600">Crews en route</span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#0077CC] text-white flex items-center justify-center shadow-xs">
              <Users className="w-5 h-5" />
            </div>
          </div>

          {/* Bins Online */}
          <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 block">Bins Online</span>
              <div className="text-2xl font-black font-mono text-emerald-800 flex items-baseline gap-1 mt-0.5">
                <AnimatedNumber value={bins.length} padZero />
                <span className="text-xs font-normal text-emerald-600">100% Mesh grid</span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Centerpiece: LIVE CITY OPERATIONS & SELECTED NODE (Map + Selected Bin Intelligence) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0077CC] animate-ping" />
            <h2 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest">
              Live Operations & Digital Twin Map
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            Node B-102 selected by default &bull; Click any marker to redirect focus
          </span>
        </div>
        <MapPanel />
      </div>

      {/* 3. Bottom Grid: AI Priority Queue + Live Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: AI Priority Queue */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#0077CC]" />
                <h3 className="text-sm font-bold text-[#0F172A]">AI Priority Dispatch Queue</h3>
              </div>
              <Link href="/admin/ai" className="text-xs text-[#0077CC] hover:underline flex items-center gap-0.5 font-semibold">
                <span>Priority Engine</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {aiPriorityQueue.map((bin) => {
                const isCrit = bin.status === 'CRITICAL';
                const hasTask = tasks.some(t => t.bin_id === bin.bin_id && t.status !== 'Completed');

                return (
                  <div 
                    key={bin.bin_id}
                    className={`p-3 rounded-xl border transition ${
                      isCrit 
                        ? 'bg-rose-50/70 border-rose-200' 
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-black text-[#0F172A]">{bin.bin_id}</span>
                        <PriorityBadge priority={bin.status} score={bin.priority_score} />
                      </div>
                      <span className={`font-mono text-sm font-black ${isCrit ? 'text-rose-600' : 'text-slate-800'}`}>
                        {bin.fill_level}%
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-600 truncate font-medium">{bin.location}</p>
                    
                    <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 font-mono text-[10px]">{bin.overflow_prediction}</span>
                      
                      {hasTask ? (
                        <span className="text-[10px] font-bold text-[#0077CC] bg-[#F0F9FF] px-2 py-0.5 rounded border border-[#BAE6FD]">
                          Dispatched
                        </span>
                      ) : (
                        <button
                          onClick={() => createTask(bin.bin_id, workers[0]?.id || 'w-1', vehicles[0]?.id || 'v-1', isCrit ? 'CRITICAL' : 'HIGH')}
                          className="text-[10px] font-bold text-white bg-[#0077CC] hover:bg-[#004A80] px-2.5 py-0.5 rounded shadow-xs transition active:scale-95"
                        >
                          Dispatch
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200">
            <Link
              href="/admin/tasks"
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <span>Manage All Work Orders</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right: Operational Stream & Interactive AI Copilot */}
        <div className="lg:col-span-2 space-y-6">
          {/* Live Operational Stream */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Operational Stream & Resolution Log</span>
              </h3>
              <span className="text-[10px] text-slate-500 font-mono font-bold bg-slate-100 px-2 py-0.5 rounded">
                REALTIME EVENT BUS
              </span>
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
                        act.type === 'critical' ? 'bg-rose-500 animate-pulse' :
                        act.type === 'warning' ? 'bg-amber-500' :
                        act.type === 'success' ? 'bg-emerald-500' : 'bg-[#0077CC]'
                      }`} />
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">{act.desc}</p>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono shrink-0">{act.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Interactive WasteSense AI Decision Copilot */}
          <AdminAIAssistant />
        </div>
      </div>
    </div>
  );
}
