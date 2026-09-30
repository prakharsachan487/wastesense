'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useWasteSense } from '../../../context/WasteSenseContext';
import { SmartBinCard } from '../../../components/admin/SmartBinCard';
import { Filter, Search, MapPin, Truck } from 'lucide-react';

function SmartBinsContent() {
  const { bins } = useWasteSense();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Smart Bins Fleet & Telemetry</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F0F9FF] text-[#0077CC] font-semibold border border-[#BAE6FD]">
              20 Active Nodes
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time ultrasonic distance, load strain gauges, and thermistor telemetry across all 20 urban municipal nodes
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/map"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-semibold shadow-xs transition"
          >
            <MapPin className="w-3.5 h-3.5 text-[#0077CC]" />
            <span>Geospatial Map</span>
          </Link>
          <Link
            href="/admin/tasks"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0077CC] hover:bg-[#004A80] text-white text-xs font-bold shadow-sm transition"
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Fleet Dispatches</span>
          </Link>
        </div>
      </div>

      {/* Critical Node Surveillance Banner */}
      <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-rose-600 text-white">
              Critical Surveillance
            </span>
            <span className="font-mono font-bold text-[#0F172A] text-sm">Smart Bin B-102 (Central Market)</span>
          </div>
          <p className="text-xs text-slate-600">
            Node B-102 fill capacity is monitored continuously. Automated high-priority work orders trigger collection dispatch to assigned sanitation units when fill thresholds reach critical levels.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/admin/tasks"
            className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition shadow-xs"
          >
            Dispatch Collection
          </Link>
          <Link
            href="/admin/map"
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition shadow-xs"
          >
            Track on Map
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Bin ID (e.g. B-102) or Location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] text-xs rounded-xl pl-9 pr-3 py-2 outline-none focus:border-[#0077CC] focus:ring-1 focus:ring-[#0077CC]"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={zoneFilter}
            onChange={(e) => setZoneFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 px-3 py-2 rounded-xl outline-none focus:border-[#0077CC]"
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
            className="bg-slate-50 border border-slate-200 text-slate-700 px-3 py-2 rounded-xl outline-none focus:border-[#0077CC]"
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
          />
        ))}
      </div>
    </div>
  );
}

export default function SmartBinsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 text-xs">Loading Smart Bins...</div>}>
      <SmartBinsContent />
    </Suspense>
  );
}
