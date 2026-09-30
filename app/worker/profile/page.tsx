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
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Sanitation Field Operator Profile</h1>
        <p className="text-xs text-slate-500 mt-1">
          Vehicle pairing, crew shift telemetry, and collection performance metrics
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#0077CC] text-white flex items-center justify-center text-3xl font-black shadow-md shadow-[#0077CC]/20">
            W
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#0F172A]">{workerInfo.name}</h2>
            <span className="text-xs text-[#0077CC] font-semibold">{workerInfo.role}</span>
            <p className="text-xs text-slate-500">{workerInfo.zone}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-slate-500 text-[11px] block font-medium">Assigned Vehicle</span>
            <strong className="text-[#0F172A] flex items-center gap-1.5 font-bold">
              <Truck className="w-3.5 h-3.5 text-[#0077CC]" />
              <span>{workerInfo.vehicle_name}</span>
            </strong>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-slate-500 text-[11px] block font-medium">Phone Contact</span>
            <strong className="text-[#0F172A] flex items-center gap-1.5 font-bold">
              <Phone className="w-3.5 h-3.5 text-[#0EA5E9]" />
              <span>{workerInfo.phone}</span>
            </strong>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#0077CC] uppercase tracking-wider block">Today's Collections Verified</span>
            <span className="text-2xl font-black text-[#0F172A] mt-1 block">{completedToday} Bins Emptied</span>
            <span className="text-[11px] text-emerald-600 font-medium">100% on-time SLA fulfillment</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-white border border-sky-200 flex items-center justify-center text-2xl shadow-sm">
            <Award className="w-6 h-6 text-[#0077CC]" />
          </div>
        </div>
      </div>
    </div>
  );
}
