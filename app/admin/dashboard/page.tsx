'use client';

import React from 'react';
import Link from 'next/link';
import { useWasteSense } from '../../../context/WasteSenseContext';
import { PriorityBadge } from '../../../components/ui/PriorityBadge';
import { MapPanel } from '../../../components/admin/MapPanel';
import { AdminAIAssistant } from '../../../components/admin/AdminAIAssistant';
import { 
  SkiperBox,
  SkiperStatBox,
  SkiperProgressCard,
  SkiperFeaturedCard,
  SkiperListBox,
  SkiperBannerCard
} from '../../../components/skiper-ui';
import { 
  AlertTriangle, FileText, CheckCircle2, Users, 
  Trash2, Cpu, ArrowUpRight, Zap, Radio, Truck, Sparkles
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { kpis, bins, complaints, tasks, simulateSurgeB102, createTask, workers, vehicles, currentUser } = useWasteSense();

  const activeTaskCount = tasks.filter(t => t.status !== 'Completed').length;

  // Highlight urgent node (B-102 Central Market)
  const nodeB102 = bins.find(b => b.bin_id === 'B-102') || bins[0];
  const b102Task = tasks.find(t => t.bin_id === 'B-102' && t.status !== 'Completed');

  // Top AI priority bins
  const aiPriorityQueue = [...bins]
    .sort((a, b) => b.priority_score - a.priority_score)
    .slice(0, 5);

  // Fleet Telemetry stats calculation
  const criticalCount = bins.filter(b => b.status === 'CRITICAL' || b.fill_level >= 85).length;
  const warningCount = bins.filter(b => b.status === 'WARNING' || (b.fill_level >= 70 && b.fill_level < 85)).length;
  const normalCount = Math.max(0, bins.length - criticalCount - warningCount);

  const normalPct = Math.round((normalCount / (bins.length || 1)) * 100);
  const warningPct = Math.round((warningCount / (bins.length || 1)) * 100);
  const criticalPct = Math.round((criticalCount / (bins.length || 1)) * 100);

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
      {/* 1. Welcoming Header matching reference design */}
      <div className="bg-white/95 rounded-[24px] p-5 sm:p-6 border border-slate-200/90 shadow-[0_2px_14px_rgba(15,23,42,0.04)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
              <span>Welcome back, {currentUser?.name || 'Chief Operator'}</span>
              <span>👋</span>
            </span>
            <div className="flex items-center gap-2.5 mt-1">
              <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
                City Operations & Telemetry
              </h1>
              <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-0.5 rounded-full bg-[#F0F9FF] text-[#0077CC] font-bold border border-[#BAE6FD]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Situational Grid
              </span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
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
      </div>

      {/* 2. Bento Grid Section matching reference layout (Left: Featured + List | Right: Progress + 4 Stats + Banner) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Featured Node + AI Priority Queue */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top Featured Node Card */}
          <SkiperFeaturedCard
            title="High-Priority Overflow Watch"
            actionText="View all bins"
            actionHref="/admin/smart-bins"
            pillBadgeIcon={<Radio className="w-3.5 h-3.5 text-[#0077CC]" />}
            pillBadgeText="LoRaWAN Active &bull; Central Commercial Hub"
            leftEntity={{
              title: `${nodeB102.bin_id} (${nodeB102.fill_level}%)`,
              subtitle: nodeB102.location,
              icon: <Trash2 className="w-5 h-5 text-rose-600" />,
              iconBg: 'bg-rose-50 border border-rose-200',
            }}
            rightEntity={{
              title: b102Task ? 'Truck #04 (En Route)' : 'Truck #04 (Standby)',
              subtitle: 'Driver: Rahul Sharma',
              icon: <Truck className="w-5 h-5 text-[#0077CC]" />,
              iconBg: 'bg-sky-50 border border-sky-200',
            }}
            connectorText="⚡"
            bottomBarText="Real-time Fill Level Telemetry"
            bottomBarValue={`${nodeB102.fill_level}% Capacity`}
            progressPercent={nodeB102.fill_level}
            actionButtonText={b102Task ? 'View Task' : 'Dispatch Now'}
            onActionButtonClick={() => {
              if (!b102Task) {
                createTask('B-102', workers[0]?.id || 'w-1', vehicles[0]?.id || 'v-1', 'CRITICAL');
              }
            }}
          />

          {/* AI Priority Dispatch Queue as Structured SkiperListBox */}
          <SkiperListBox
            title="AI Priority Dispatch Queue"
            actionText="Priority Engine"
            actionHref="/admin/ai"
            columnHeaders={['#', 'SMART NODE & LOCATION', 'PREDICTION', 'FILL LEVEL', 'DISPATCH']}
            items={aiPriorityQueue.map((bin, idx) => {
              const isCrit = bin.status === 'CRITICAL';
              const hasTask = tasks.some(t => t.bin_id === bin.bin_id && t.status !== 'Completed');

              return {
                id: bin.bin_id,
                rank: idx + 1,
                title: `${bin.bin_id} • ${bin.waste_type || 'General'}`,
                subtitle: bin.location,
                icon: <Trash2 className="w-3.5 h-3.5 text-slate-700" />,
                iconBg: isCrit ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700',
                col1: bin.overflow_prediction || '<1.5h',
                col2: `${bin.fill_level}%`,
                badge: <PriorityBadge priority={bin.status} score={bin.priority_score} />,
                highlight: isCrit,
                actionNode: hasTask ? (
                  <span className="text-[10px] font-bold text-[#0077CC] bg-[#F0F9FF] px-2 py-0.5 rounded-full border border-[#BAE6FD]">
                    Dispatched
                  </span>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      createTask(bin.bin_id, workers[0]?.id || 'w-1', vehicles[0]?.id || 'v-1', isCrit ? 'CRITICAL' : 'HIGH');
                    }}
                    className="text-[10px] font-bold text-white bg-[#0077CC] hover:bg-[#004A80] px-2.5 py-1 rounded-lg shadow-xs transition active:scale-95"
                  >
                    Dispatch
                  </button>
                ),
              };
            })}
          />
        </div>

        {/* Right Column (5 cols): Progress Stats + 4 Stat Cards + Banner */}
        <div className="lg:col-span-5 space-y-6">
          {/* Fleet Telemetry Progress Card */}
          <SkiperProgressCard
            title="Grid Telemetry & Health"
            actionText="View analytics"
            actionHref="/admin/analytics"
            segments={[
              { label: 'Normal', count: normalCount, percent: normalPct, color: 'bg-emerald-500' },
              { label: 'Warning', count: warningCount, percent: warningPct, color: 'bg-amber-400' },
              { label: 'Critical', count: criticalCount, percent: criticalPct, color: 'bg-rose-500' },
            ]}
            metrics={[
              { keyLabel: 'TOTAL BINS', value: bins.length },
              { keyLabel: 'HEALTHY', value: normalCount, colorClass: 'text-emerald-600' },
              { keyLabel: 'WARNING', value: warningCount, colorClass: 'text-amber-600' },
              { keyLabel: 'CRITICAL', value: criticalCount, colorClass: 'text-rose-600' },
            ]}
          />

          {/* 4 Compact Stat Cards in 2x2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <SkiperStatBox
              label="Critical Nodes"
              value={kpis.criticalBins}
              icon={<AlertTriangle className="w-5 h-5" />}
              color="rose"
              subText="≥90% fill capacity"
            />
            <SkiperStatBox
              label="Open Reports"
              value={kpis.openComplaints}
              icon={<FileText className="w-5 h-5" />}
              color="amber"
              subText="Active citizen tickets"
            />
            <SkiperStatBox
              label="Active Dispatches"
              value={activeTaskCount}
              icon={<Users className="w-5 h-5" />}
              color="blue"
              subText="Crews en route"
            />
            <SkiperStatBox
              label="Grid Online"
              value={bins.length}
              icon={<CheckCircle2 className="w-5 h-5" />}
              color="emerald"
              subText="100% telemetry online"
            />
          </div>

          {/* Bottom Action / Announcement Banner Card */}
          <SkiperBannerCard
            tag="AI DISPATCH CONDUIT"
            title="Automated Route Optimization Active"
            description="Autonomous sensor surge detection automatically calculates optimal collection routes for field sanitation vehicles."
            buttonText="Open AI Decision Engine"
            buttonHref="/admin/ai"
            icon={<Sparkles className="w-6 h-6 text-sky-200" />}
          />
        </div>
      </div>

      {/* 3. Main Centerpiece: LIVE CITY OPERATIONS MAP in a SkiperBox */}
      <SkiperBox
        title="Live Operations & Digital Twin Map"
        subtitle="Node B-102 selected by default • Click any marker to redirect focus"
        actionText="Full Screen Map"
        actionHref="/admin/map"
        icon={<Radio className="w-4 h-4 text-[#0077CC] animate-pulse" />}
      >
        <MapPanel />
      </SkiperBox>

      {/* 4. Bottom Row: Live Operational Stream & AI Copilot in SkiperBoxes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Operational Stream */}
        <SkiperBox
          title="Live Operational Stream & Resolution Log"
          subtitle="Real-time municipal event bus"
          actionText="Work Orders"
          actionHref="/admin/tasks"
          icon={<Cpu className="w-4 h-4 text-[#0077CC]" />}
        >
          <div className="space-y-2.5">
            {recentActivities.map((act, i) => (
              <div 
                key={i} 
                className="p-3 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-start justify-between gap-3 hover:border-slate-200 transition"
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
        </SkiperBox>

        {/* Interactive WasteSense AI Decision Copilot */}
        <AdminAIAssistant />
      </div>
    </div>
  );
}
