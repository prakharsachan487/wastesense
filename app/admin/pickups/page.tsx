'use client';

import React from 'react';
import { useWasteSense } from '../../../context/WasteSenseContext';
import { CalendarCheck, Clock, MapPin, Truck, CheckCircle2 } from 'lucide-react';
import { StatusBadge } from '../../../components/ui/StatusBadge';

export default function AdminPickupsPage() {
  const { pickups } = useWasteSense();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">Commercial & Bulk Pickup Operations</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
              {pickups.length} Scheduled Drives
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage scheduled bulk recyclable cardboard, horticultural prunings, and corporate collection bookings
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pickups.map(p => (
          <div key={p.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-xs font-bold text-white">{p.request_id}</span>
                <h3 className="text-base font-bold text-emerald-400 mt-0.5">{p.customer}</h3>
              </div>
              <StatusBadge status={p.status} />
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
              <div><strong>Waste Type:</strong> {p.waste_type}</div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{p.location}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{p.preferred_date} &bull; {p.preferred_time}</span>
              </div>
              {p.notes && (
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-900">
                  Note: {p.notes}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="flex items-center gap-1 text-slate-400">
                <Truck className="w-3.5 h-3.5 text-amber-400" />
                <span>Assigned Unit: <strong className="text-white">{p.assigned_unit || 'Unassigned'}</strong></span>
              </span>
              <button className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition">
                View Waypoint Route
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
