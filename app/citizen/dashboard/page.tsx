'use client';

import React from 'react';
import Link from 'next/link';
import { useWasteSense } from '../../../context/WasteSenseContext';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { 
  AlertTriangle, Calendar, Search, ArrowRight, Trash2, 
  MapPin, CheckCircle2, Clock, Sparkles 
} from 'lucide-react';

export default function CitizenDashboardPage() {
  const { currentUser, complaints, pickups, bins } = useWasteSense();

  const userComplaints = complaints.slice(0, 3);
  const userPickups = pickups.slice(0, 2);
  const nearbyBins = bins.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/60 border border-emerald-800/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">👋</span>
            <h1 className="text-xl md:text-2xl font-black text-white">
              Welcome back, {currentUser.name}!
            </h1>
          </div>
          <p className="text-xs text-slate-300">
            Citizen Ward: <strong className="text-emerald-400">Sector 12, Central Market</strong> &bull; Eco-Credits: <strong className="text-amber-400">350 Points</strong>
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/citizen/report"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950 transition active:scale-95"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Report Waste</span>
          </Link>

          <Link
            href="/citizen/pickup"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
          >
            <Calendar className="w-3.5 h-3.5 text-sky-400" />
            <span>Request Pickup</span>
          </Link>

          <Link
            href="/citizen/complaints"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
          >
            <Search className="w-3.5 h-3.5 text-amber-400" />
            <span>Track Complaint</span>
          </Link>
        </div>
      </div>

      {/* Main Grid: My Complaints & Scheduled Pickups */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Complaints */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white">My Active Waste Reports</h3>
              <p className="text-[11px] text-slate-400">Real-time status of your reported community issues</p>
            </div>
            <Link href="/citizen/complaints" className="text-xs text-emerald-400 hover:underline flex items-center gap-0.5">
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {userComplaints.map(c => (
              <div key={c.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-xs font-bold text-white">{c.complaint_id}</span>
                    <h4 className="text-xs font-semibold text-emerald-300 mt-0.5">{c.category}</h4>
                  </div>
                  <StatusBadge status={c.status} size="sm" />
                </div>
                <p className="text-xs text-slate-400 line-clamp-1">{c.description}</p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-900">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span className="truncate max-w-[180px]">{c.location}</span>
                  </span>
                  <span>{c.created_at}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scheduled Pickups */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white">Scheduled Bulk & Recyclable Pickups</h3>
              <p className="text-[11px] text-slate-400">Convenient doorstep collection appointments</p>
            </div>
            <Link href="/citizen/pickup" className="text-xs text-emerald-400 hover:underline flex items-center gap-0.5">
              <span>Book New</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {userPickups.map(p => (
              <div key={p.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-xs font-bold text-white">{p.request_id}</span>
                    <h4 className="text-xs font-semibold text-sky-300 mt-0.5">{p.waste_type}</h4>
                  </div>
                  <StatusBadge status={p.status} size="sm" />
                </div>
                <div className="text-xs text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{p.preferred_date} &bull; {p.preferred_time}</span>
                </div>
                <div className="text-[11px] text-slate-400">Assigned: <strong className="text-white">{p.assigned_unit || 'Pending Unit'}</strong></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nearby Smart Bins Section */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-emerald-400" />
              <span>Nearby Smart Containers (Sector 12 Radius)</span>
            </h3>
            <p className="text-[11px] text-slate-400">Real-time fill levels so you know where capacity is available</p>
          </div>
          <Link href="/citizen/bins" className="text-xs text-emerald-400 hover:underline">
            View All Containers &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {nearbyBins.map(bin => {
            const isFull = bin.fill_level >= 85;
            return (
              <div key={bin.bin_id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                <div className="flex justify-between items-start">
                  <span className="font-mono font-bold text-white text-xs">{bin.bin_id}</span>
                  <StatusBadge status={bin.status} size="sm" />
                </div>
                <p className="text-xs text-slate-300 truncate">{bin.location}</p>

                <div>
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>Capacity:</span>
                    <strong className={isFull ? 'text-rose-400' : 'text-emerald-400'}>{bin.fill_level}%</strong>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${isFull ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                      style={{ width: `${bin.fill_level}%` }}
                    />
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 pt-1">
                  Waste Type: <span className="text-slate-300 font-medium">{bin.waste_type}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
