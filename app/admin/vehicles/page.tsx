'use client';

import React from 'react';
import { useWasteSense } from '../../../context/WasteSenseContext';
import { Truck, Battery, Fuel, UserCheck } from 'lucide-react';
import { StatusBadge } from '../../../components/ui/StatusBadge';

export default function AdminVehiclesPage() {
  const { vehicles } = useWasteSense();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">Collection Fleet Telematics</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
              5 Active Vehicles
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time payload tonnage, onboard compactor load capacity, battery / fuel telematics, and route zones
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {vehicles.map(v => (
          <div key={v.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-xs text-slate-400 block">{v.plate}</span>
                <h3 className="text-base font-bold text-white mt-0.5">{v.name}</h3>
                <span className="text-xs text-sky-400 font-medium">{v.type}</span>
              </div>
              <StatusBadge status={v.status} size="sm" />
            </div>

            {/* Load bar */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-400">Current Payload Load</span>
                <span className="font-mono text-white">{v.current_load_pct}% ({v.capacity_tons}T max)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className={`h-full ${v.current_load_pct >= 80 ? 'bg-rose-500' : 'bg-sky-500'} transition-all`}
                  style={{ width: `${v.current_load_pct}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[11px] block">Driver</span>
                <strong className="text-white">{v.assigned_driver}</strong>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[11px] block">Fuel / Battery</span>
                <strong className="text-emerald-400 font-mono">{v.fuel_battery_pct}%</strong>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
              Assigned Operational Area: <strong className="text-slate-200">{v.zone}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
