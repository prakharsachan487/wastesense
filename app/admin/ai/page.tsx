'use client';

import React, { useState } from 'react';
import { useWasteSense } from '../../../context/WasteSenseContext';
import { PriorityBadge } from '../../../components/ui/PriorityBadge';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { SmartBinSimulatorModal } from '../../../components/admin/SmartBinSimulatorModal';
import { Cpu, Zap, Sliders, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export default function AdminAIPage() {
  const { bins, createTask, workers, vehicles } = useWasteSense();
  const [simModalBin, setSimModalBin] = useState<string | null>(null);
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">AI Operations & Prioritization Engine</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-400 font-semibold border border-purple-500/30">
              Prototype Intelligence Engine
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            AI-assisted prioritization: Multi-factor condition scoring, time-to-overflow regression, and automated dispatch routing
          </p>
        </div>

        <button
          onClick={() => setSimModalBin('B-102')}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-950 transition"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Simulate Sensor for AI Engine</span>
        </button>
      </div>

      {/* Transparent AI Logic Formula Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 border border-purple-800/40 shadow-xl space-y-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-purple-400" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Transparent Prioritization Formulation:</h2>
        </div>
        <p className="text-xs text-slate-300">
          This engine combines continuous digital-twin telemetry with citizen complaint density to rank collection urgency in real time:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-purple-400 font-bold block">1. Fill Urgency (35%)</span>
            <span className="text-[11px] text-slate-400">Ultrasonic readings &gt;90% trigger instant critical threshold override.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-purple-400 font-bold block">2. Overflow Rate (25%)</span>
            <span className="text-[11px] text-slate-400">Estimated rate of fill per hour based on zone commercial density.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-purple-400 font-bold block">3. Citizen Reports (25%)</span>
            <span className="text-[11px] text-slate-400">Repeated complaints within 100m radius boost urgency weighting.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-purple-400 font-bold block">4. Collection Interval (15%)</span>
            <span className="text-[11px] text-slate-400">Hours elapsed since last physical sanitation crew sign-off.</span>
          </div>
        </div>
      </div>

      {/* AI Prioritized Queue Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/70 shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
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
          <tbody className="divide-y divide-slate-800/80 text-slate-300">
            {sortedBins.map((bin, index) => {
              const isTop = index === 0;
              const isCritical = bin.priority_score >= 90;

              return (
                <tr 
                  key={bin.bin_id} 
                  className={`transition ${isTop ? 'bg-rose-950/15' : 'hover:bg-slate-800/40'}`}
                >
                  <td className="px-4 py-3.5 font-bold font-mono text-slate-400">
                    #{index + 1}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="font-mono font-bold text-white">{bin.bin_id}</div>
                    <div className="text-[11px] text-slate-400 truncate max-w-[160px]">{bin.location}</div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`font-mono font-bold text-sm ${bin.fill_level >= 90 ? 'text-rose-400' : 'text-slate-200'}`}>
                      {bin.fill_level}%
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-black text-sm text-purple-400">{bin.priority_score}</span>
                      <span className="text-[10px] text-slate-400">/ 100</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <PriorityBadge priority={bin.status} score={bin.priority_score} />
                  </td>
                  <td className="px-4 py-3.5 font-medium text-slate-200">
                    {bin.overflow_prediction}
                  </td>
                  <td className="px-4 py-3.5 text-slate-400 text-[11px] max-w-[220px]">
                    {bin.fill_level >= 90 
                      ? `${bin.fill_level}% fill + commercial peak zone + 7h+ service gap`
                      : `${bin.fill_level}% fill + moderate generation rate`}
                  </td>
                  <td className="px-4 py-3.5 text-right whitespace-nowrap">
                    {bin.fill_level >= 75 ? (
                      <button
                        onClick={() => handleDispatch(bin.bin_id, bin.status)}
                        className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] shadow-sm shadow-rose-900/40 transition active:scale-95"
                      >
                        {dispatchedBin === bin.bin_id ? '✓ Dispatched!' : 'Create Task'}
                      </button>
                    ) : (
                      <button
                        onClick={() => setSimModalBin(bin.bin_id)}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-[11px] transition"
                      >
                        Simulate
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Simulator Modal */}
      {simModalBin && (
        <SmartBinSimulatorModal
          targetBinId={simModalBin}
          onClose={() => setSimModalBin(null)}
        />
      )}
    </div>
  );
}
