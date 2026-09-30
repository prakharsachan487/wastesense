'use client';

import React from 'react';
import { useWasteSense } from '../../../context/WasteSenseContext';
import { CalendarCheck, Clock, MapPin, Truck, CheckCircle2 } from 'lucide-react';
import { StatusBadge } from '../../../components/ui/StatusBadge';

export default function AdminPickupsPage() {
  const { pickups } = useWasteSense();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Commercial & Bulk Pickup Operations</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F0F9FF] text-[#0077CC] font-semibold border border-[#BAE6FD]">
              {pickups.length} Scheduled Drives
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage scheduled bulk recyclable cardboard, horticultural prunings, and corporate collection bookings
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pickups.map(p => (
          <div key={p.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-xs font-bold text-slate-500">{p.request_id}</span>
                <h3 className="text-base font-bold text-[#0077CC] mt-0.5">{p.user_name}</h3>
              </div>
              <StatusBadge status={p.status} />
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 text-slate-600">
              <div><strong className="text-[#0F172A]">Waste Type:</strong> {p.waste_type}</div>
              <div className="flex items-center gap-1.5 text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{p.location}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{p.preferred_date} &bull; {p.preferred_time}</span>
              </div>
              {p.notes && (
                <div className="text-slate-500 text-[11px] pt-1 border-t border-slate-200">
                  Note: {p.notes}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="flex items-center gap-1 text-slate-500">
                <Truck className="w-3.5 h-3.5 text-amber-500" />
                <span>Assigned Unit: <strong className="text-[#0F172A]">{p.assigned_unit || 'Unassigned'}</strong></span>
              </span>
              <button className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition">
                View Waypoint Route
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
