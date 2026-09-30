'use client';

import React from 'react';
import { useWasteSense } from '../../../context/WasteSenseContext';
import { Truck, Phone, Award, Shield, CheckCircle2 } from 'lucide-react';

export default function WorkerProfilePage() {
  const { currentUser, workers, tasks } = useWasteSense();

  const workerInfo = workers[0];
  const completedToday = tasks.filter(t => t.status === 'Completed').length + 9;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-black text-white tracking-tight">Sanitation Field Operator Profile</h1>
        <p className="text-xs text-slate-400 mt-1">
          Vehicle pairing, crew shift telemetry, and collection performance metrics
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center text-3xl font-black shadow-lg">
            👷
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{workerInfo.name}</h2>
            <span className="text-xs text-amber-400 font-semibold">{workerInfo.role}</span>
            <p className="text-xs text-slate-400">{workerInfo.zone}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[11px] block">Assigned Vehicle</span>
            <strong className="text-white flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-amber-400" />
              <span>{workerInfo.vehicle_name}</span>
            </strong>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400 text-[11px] block">Phone Contact</span>
            <strong className="text-white flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <span>{workerInfo.phone}</span>
            </strong>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/30 to-emerald-950/30 border border-amber-800/30 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Today's Collections Verified</span>
            <span className="text-2xl font-mono font-black text-white mt-1 block">{completedToday} Bins Emptied</span>
            <span className="text-[11px] text-emerald-400">100% on-time SLA fulfillment</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-2xl">
            🏆
          </div>
        </div>
      </div>
    </div>
  );
}
