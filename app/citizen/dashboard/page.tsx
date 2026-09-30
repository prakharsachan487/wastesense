'use client';

import React from 'react';
import Link from 'next/link';
import { useWasteSense } from '../../../context/WasteSenseContext';
import { ComplaintTimelineStepper } from '../../../components/citizen/ComplaintTimelineStepper';
import { CitizenSmartBinCard } from '../../../components/citizen/CitizenSmartBinCard';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { 
  AlertTriangle, Calendar, Search, ArrowRight, Trash2, 
  MapPin, CheckCircle2, Clock, Sparkles, Navigation, Send
} from 'lucide-react';

export default function CitizenDashboardPage() {
  const { currentUser, complaints, pickups, bins } = useWasteSense();

  // Find user's latest active report (B-102 complaint WS-2026-1042 or first complaint)
  const latestReport = complaints.find(c => c.complaint_id === 'WS-2026-1042') || complaints[0];
  const otherComplaints = complaints.filter(c => c.id !== latestReport?.id).slice(0, 2);
  const userPickups = pickups.slice(0, 2);

  // Relevant bins nearby: B-102 (Central Market), B-109 (Railway), B-087 (Metro), B-044 (Greenwood)
  const localBins = [
    bins.find(b => b.bin_id === 'B-102') || bins[0],
    bins.find(b => b.bin_id === 'B-109') || bins[1],
    bins.find(b => b.bin_id === 'B-087') || bins[2],
    bins.find(b => b.bin_id === 'B-044') || bins[3],
  ];

  return (
    <div className="space-y-6">
      {/* 1. Welcoming Hero with Ward Focus & Quick Actions */}
      <div className="p-6 rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <span className="text-[10px] font-extrabold text-[#0077CC] uppercase tracking-widest block">
            RESIDENT CITIZEN PORTAL
          </span>
          <h1 className="text-xl md:text-2xl font-black text-[#0F172A] mt-0.5">
            Good evening, {currentUser.name || 'Amitabh'}!
          </h1>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#BAE6FD] text-[#004A80] text-xs font-bold shadow-xs">
              <MapPin className="w-3.5 h-3.5 text-[#0077CC]" />
              <span>Your Ward: SECTOR 12 &bull; ZONE A</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Sensors Synchronized</span>
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/citizen/report"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0077CC] hover:bg-[#004A80] text-white text-xs font-bold shadow-sm transition active:scale-95"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Report Waste Issue</span>
          </Link>

          <Link
            href="/citizen/pickup"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold shadow-xs transition"
          >
            <Calendar className="w-4 h-4 text-[#0EA5E9]" />
            <span>Request Pickup</span>
          </Link>

          <Link
            href="/citizen/complaints"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/80 hover:bg-white text-slate-600 border border-slate-200 text-xs font-medium transition"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>All Tickets</span>
          </Link>
        </div>
      </div>

      {/* 2. PRIMARY HERO SECTION: "What Happened to My Report?" (Interactive 6-Stage Timeline) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0077CC] animate-ping" />
            <h2 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest">
              Live Resolution Tracking &bull; What Happened to My Report?
            </h2>
          </div>
          <span className="text-xs text-[#0077CC] font-semibold">
            Closed-Loop AI Triage Active
          </span>
        </div>

        {latestReport ? (
          <ComplaintTimelineStepper complaint={latestReport} />
        ) : (
          <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <h3 className="text-sm font-bold text-[#0F172A]">No Active Complaints</h3>
            <p className="text-xs text-slate-500">Your neighborhood is currently clean and verified.</p>
          </div>
        )}
      </div>

      {/* 3. Secondary Row: Scheduled Pickups & Other Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Doorstep Pickups */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#0077CC]" />
                <span>Scheduled Doorstep Pickups</span>
              </h3>
              <p className="text-[11px] text-slate-500">Bulk recyclables, electronic & packaging collection</p>
            </div>
            <Link href="/citizen/pickup" className="text-xs text-[#0077CC] hover:underline flex items-center gap-0.5 font-semibold">
              <span>Book Pickup</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {userPickups.map(p => (
              <div key={p.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 hover:border-slate-300 transition">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-xs font-black text-[#0F172A]">{p.request_id}</span>
                    <h4 className="text-xs font-semibold text-[#0077CC] mt-0.5">{p.waste_type}</h4>
                  </div>
                  <StatusBadge status={p.status} size="sm" />
                </div>
                <div className="text-xs text-slate-700 flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>{p.preferred_date} &bull; {p.preferred_time}</span>
                </div>
                <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-200">
                  <span>Assigned Unit: <strong className="text-[#0F172A]">{p.assigned_unit || 'Pending Unit'}</strong></span>
                  <span className="text-emerald-700 font-semibold font-mono text-[10px]">Doorstep Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Neighborhood Reports */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Other Ward Incidents</span>
              </h3>
              <p className="text-[11px] text-slate-500">Public reports in Sector 12 municipal radius</p>
            </div>
            <Link href="/citizen/complaints" className="text-xs text-[#0077CC] hover:underline flex items-center gap-0.5 font-semibold">
              <span>View All ({complaints.length})</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {otherComplaints.map(c => (
              <div key={c.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 hover:border-slate-300 transition">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#0F172A]">{c.complaint_id}</span>
                    <h4 className="text-xs font-semibold text-slate-800 mt-0.5">{c.category}</h4>
                  </div>
                  <StatusBadge status={c.status} size="sm" />
                </div>
                <p className="text-xs text-slate-600 line-clamp-1">{c.description}</p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-200">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span className="truncate max-w-[200px] text-slate-600">{c.location}</span>
                  </span>
                  <span>{c.created_at}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Smart Containers in Your Ward Radius */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-[#0077CC]" />
              <span>Smart Bins in Sector 12 Radius</span>
            </h3>
            <p className="text-xs text-slate-500">Live ultrasonic capacity, segregation stream, and overflow forecasting</p>
          </div>
          <Link 
            href="/citizen/bins" 
            className="text-xs text-[#0077CC] hover:underline font-semibold flex items-center gap-1"
          >
            <span>Explore All Bins</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {localBins.map(bin => (
            <CitizenSmartBinCard key={bin.bin_id} bin={bin} />
          ))}
        </div>
      </div>
    </div>
  );
}
