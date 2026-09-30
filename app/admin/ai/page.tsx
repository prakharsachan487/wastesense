'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useWasteSense } from '../../../context/WasteSenseContext';
import { PriorityBadge } from '../../../components/ui/PriorityBadge';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { Cpu, Zap, CheckCircle2, AlertTriangle, ArrowRight, Truck } from 'lucide-react';

export default function AdminAIPage() {
  const { bins, createTask, workers, vehicles } = useWasteSense();
  const [dispatchedBin, setDispatchedBin] = useState<string | null>(null);

  // Sort bins by priority score descending
  const sortedBins = [...bins].sort((a, b) => b.priority_score - a.priority_score);

  const handleDispatch = (binId: string, priority: any) => {
    createTask(binId, workers[0].id, vehicles[0].id, priority);
    setDispatchedBin(binId);
    setTimeout(() => setDispatchedBin(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Smart Operations & Prioritization Engine</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F0F9FF] text-[#0077CC] font-semibold border border-[#BAE6FD]">
              Autonomous Priority Active
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Predictive prioritization: Multi-factor condition scoring, time-to-overflow regression, and automated dispatch routing
          </p>
        </div>

        <Link
          href="/admin/tasks"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0077CC] hover:bg-[#004A80] text-white text-xs font-bold shadow-sm transition"
        >
          <Truck className="w-3.5 h-3.5" />
          <span>Active Work Orders</span>
        </Link>
      </div>

      {/* Transparent AI Logic Formula Card */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-[#0077CC]" />
          <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">Predictive Prioritization Formulation:</h2>
        </div>
        <p className="text-xs text-slate-600">
          This engine combines continuous IoT sensor telemetry with citizen complaint density to rank collection urgency in real time:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[#0077CC] font-bold block">1. Fill Urgency (35%)</span>
            <span className="text-[11px] text-slate-500">Ultrasonic readings &gt;90% trigger instant critical threshold override.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[#0077CC] font-bold block">2. Overflow Rate (25%)</span>
            <span className="text-[11px] text-slate-500">Estimated rate of fill per hour based on zone commercial density.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[#0077CC] font-bold block">3. Citizen Reports (25%)</span>
            <span className="text-[11px] text-slate-500">Repeated complaints within 100m radius boost urgency weighting.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[#0077CC] font-bold block">4. Collection Interval (15%)</span>
            <span className="text-[11px] text-slate-500">Hours elapsed since last physical sanitation crew sign-off.</span>
          </div>
        </div>
      </div>

      {/* AI Prioritized Queue Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">Smart Bin Node</th>
              <th className="px-4 py-3">Fill Capacity</th>
              <th className="px-4 py-3">Calculated Score</th>
              <th className="px-4 py-3">Priority Level</th>
              <th className="px-4 py-3">Forecasted Overflow</th>
              <th className="px-4 py-3">Prioritization Rationale</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {sortedBins.map((bin, index) => {
              const isTop = index === 0;

              return (
                <tr 
                  key={bin.bin_id} 
                  className={`transition ${isTop ? 'bg-rose-50/50' : 'hover:bg-slate-50/80'}`}
                >
                  <td className="px-4 py-3.5 font-bold font-mono text-slate-400">
                    #{index + 1}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="font-mono font-bold text-[#0F172A]">{bin.bin_id}</div>
                    <div className="text-[11px] text-slate-500 truncate max-w-[160px]">{bin.location}</div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`font-mono font-bold text-sm ${bin.fill_level >= 90 ? 'text-rose-600' : 'text-[#0F172A]'}`}>
                      {bin.fill_level}%
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-black text-sm text-[#0077CC]">{bin.priority_score}</span>
                      <span className="text-[10px] text-slate-400">/ 100</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <PriorityBadge priority={bin.status} score={bin.priority_score} />
                  </td>
                  <td className="px-4 py-3.5 font-medium text-slate-800">
                    {bin.overflow_prediction}
                  </td>
                  <td className="px-4 py-3.5 text-slate-500 text-[11px] max-w-[220px]">
                    {bin.fill_level >= 90 
                      ? `${bin.fill_level}% fill + commercial peak zone + 7h+ service gap`
                      : `${bin.fill_level}% fill + moderate generation rate`}
                  </td>
                  <td className="px-4 py-3.5 text-right whitespace-nowrap">
                    {bin.fill_level >= 75 ? (
                      <button
                        onClick={() => handleDispatch(bin.bin_id, bin.status)}
                        className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] shadow-xs transition active:scale-95"
                      >
                        {dispatchedBin === bin.bin_id ? 'Dispatched!' : 'Create Task'}
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-medium px-2 py-1">
                        Normal
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
