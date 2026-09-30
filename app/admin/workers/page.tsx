'use client';

import React from 'react';
import { useWasteSense } from '../../../context/WasteSenseContext';
import { Users, Phone, Truck, CheckCircle2 } from 'lucide-react';
import { StatusBadge } from '../../../components/ui/StatusBadge';

export default function AdminWorkersPage() {
  const { workers } = useWasteSense();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Sanitation Workforce & Field Crews</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F0F9FF] text-[#0077CC] font-semibold border border-[#BAE6FD]">
              {workers.length} Registered Operators
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time crew tracking, zone allocations, vehicle pairings, and today's completed collection tally
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {workers.map(w => (
          <div key={w.id} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-bold text-[#0F172A]">{w.name}</h3>
                <span className="text-xs text-[#0077CC] font-semibold">{w.role}</span>
              </div>
              <StatusBadge status={w.status} size="sm" />
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1 text-slate-600">
              <div className="flex items-center gap-1.5 text-slate-500">
                <Truck className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-[#0F172A] font-medium truncate">{w.vehicle_name}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500">
                <Phone className="w-3.5 h-3.5 text-[#0EA5E9]" />
                <span>{w.phone}</span>
              </div>
              <div className="text-[11px] text-slate-500">Zone: <strong className="text-[#0F172A]">{w.zone}</strong></div>
            </div>

            <div className="flex justify-between items-center text-xs text-slate-500 pt-1 border-t border-slate-200">
              <span>Completed Today:</span>
              <span className="font-mono font-bold text-emerald-600">{w.completed_today} bins</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
