'use client';

import React, { useState } from 'react';
import { useWasteSense } from '../../../context/WasteSenseContext';
import { SmartBinCard } from '../../../components/admin/SmartBinCard';
import { SmartBinSimulatorModal } from '../../../components/admin/SmartBinSimulatorModal';
import { Sliders, Filter, Search, Zap, CheckCircle2 } from 'lucide-react';

export default function SmartBinsPage() {
  const { bins, simulateSurgeB102, resetBinToClean } = useWasteSense();
  const [simModalBin, setSimModalBin] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoneFilter, setZoneFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredBins = bins.filter(b => {
    const matchSearch = b.bin_id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        b.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchZone = zoneFilter === 'All' || b.zone.includes(zoneFilter);
    const matchStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchSearch && matchZone && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">Smart Bins Fleet & Digital Twin</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-semibold border border-indigo-500/30">
              Virtual IoT Layer
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time ultrasonic distance, load strain gauges, and thermistor telemetry across all 20 urban municipal nodes
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setSimModalBin('B-102')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-950 transition"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Node Diagnostics & Controls</span>
          </button>
        </div>
      </div>

      {/* Critical Node Surveillance Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-indigo-950/40 border border-rose-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500 text-white">
              Critical Surveillance
            </span>
            <span className="font-mono font-bold text-white text-sm">Smart Bin B-102 (Central Market)</span>
          </div>
          <p className="text-xs text-slate-300">
            Node B-102 fill capacity is monitored continuously. Automated high-priority work orders trigger collection dispatch to assigned sanitation units when fill thresholds reach critical levels.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setSimModalBin('B-102')}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-md shadow-indigo-950"
          >
            Sensor Controls
          </button>
          <button
            onClick={() => resetBinToClean('B-102')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
          >
            Reset to Emptied (18%)
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Bin ID (e.g. B-102) or Location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 text-white text-xs rounded-xl pl-9 pr-3 py-2 outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={zoneFilter}
            onChange={(e) => setZoneFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 px-3 py-2 rounded-xl outline-none"
          >
            <option value="All">All Urban Zones</option>
            <option value="Zone A">Zone A (Commercial / Transit)</option>
            <option value="Zone B">Zone B (Civic / Residential)</option>
            <option value="Zone C">Zone C (Medical)</option>
            <option value="Zone D">Zone D (Cultural / Education)</option>
            <option value="Zone E">Zone E (Parks / Waterfront)</option>
            <option value="Zone F">Zone F (Industrial / Highway)</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 px-3 py-2 rounded-xl outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="CRITICAL">Critical (&ge;90%)</option>
            <option value="HIGH">High (&ge;75%)</option>
            <option value="WARNING">Warning (&ge;60%)</option>
            <option value="NORMAL">Normal (&lt;60%)</option>
          </select>
        </div>
      </div>

      {/* Smart Bins Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredBins.map((bin) => (
          <SmartBinCard
            key={bin.bin_id}
            bin={bin}
            onSimulate={(binId) => setSimModalBin(binId)}
            onQuickFlush={(binId) => resetBinToClean(binId)}
          />
        ))}
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
