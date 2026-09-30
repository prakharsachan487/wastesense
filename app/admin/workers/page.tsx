'use client';

import React from 'react';
import { useWasteSense } from '../../../context/WasteSenseContext';
import { Users, Phone, Truck, CheckCircle2 } from 'lucide-react';
import { StatusBadge } from '../../../components/ui/StatusBadge';

export default function AdminWorkersPage() {
  const { workers } = useWasteSense();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">Sanitation Workforce & Field Crews</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-400 font-semibold border border-sky-500/30">
              {workers.length} Registered Operators
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time crew tracking, zone allocations, vehicle pairings, and today's completed collection tally
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {workers.map(w => (
          <div key={w.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-lg space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-bold text-white">{w.name}</h3>
                <span className="text-xs text-emerald-400 font-medium">{w.role}</span>
              </div>
              <StatusBadge status={w.status} size="sm" />
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-1 text-slate-300">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Truck className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-white truncate">{w.vehicle_name}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span>{w.phone}</span>
              </div>
              <div className="text-[11px] text-slate-400">Zone: <strong className="text-slate-200">{w.zone}</strong></div>
            </div>

            <div className="flex justify-between items-center text-xs text-slate-400 pt-1 border-t border-slate-800">
              <span>Completed Today:</span>
              <span className="font-mono font-bold text-emerald-400">{w.completed_today} bins</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
