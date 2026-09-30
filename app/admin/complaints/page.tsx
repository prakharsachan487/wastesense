'use client';

import React from 'react';
import { useWasteSense } from '../../../context/WasteSenseContext';
import { ComplaintTable } from '../../../components/admin/ComplaintTable';
import { AlertCircle, PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminComplaintsPage() {
  const { complaints } = useWasteSense();

  const openCount = complaints.filter(c => c.status !== 'Resolved').length;
  const criticalCount = complaints.filter(c => c.priority === 'CRITICAL' && c.status !== 'Resolved').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">Citizen Complaints & Incident Intake</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-semibold border border-amber-500/30">
              {openCount} Open Cases
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Track, verify, assign workers, and monitor complete resolution lifecycle for municipal reports
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-800/40 text-purple-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
            <span>Automated Triage Active</span>
          </div>
        </div>
      </div>

      {/* KPI highlight row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold uppercase">Total Reported Tickets</span>
          <div className="text-2xl font-mono font-bold text-white mt-1">{complaints.length}</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold uppercase">Critical Priority Cases</span>
          <div className="text-2xl font-mono font-bold text-rose-400 mt-1">{criticalCount}</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold uppercase">Resolution Rate</span>
          <div className="text-2xl font-mono font-bold text-emerald-400 mt-1">
            {Math.round(((complaints.length - openCount) / complaints.length) * 100)}%
          </div>
        </div>
      </div>

      {/* Complaint Table Component */}
      <ComplaintTable complaints={complaints} />
    </div>
  );
}
