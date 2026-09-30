'use client';

import React, { useState } from 'react';
import { useWasteSense } from '../../../context/WasteSenseContext';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { Trash2, MapPin, Navigation, Search } from 'lucide-react';

export default function CitizenBinsPage() {
  const { bins } = useWasteSense();
  const [searchTerm, setSearchTerm] = useState('');

  const citizenBins = bins.filter(b => 
    b.bin_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.waste_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Nearby Smart Containers & Capacity</h1>
        <p className="text-xs text-slate-500 mt-1">
          Check live container capacity before stepping out to deposit segregated recyclables or organic waste
        </p>
      </div>

      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter by location or waste stream..."
          className="w-full bg-white border border-slate-200 text-[#0F172A] text-xs rounded-xl pl-9 pr-3 py-2.5 outline-none focus:border-[#0077CC] focus:ring-1 focus:ring-[#0077CC] shadow-xs"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {citizenBins.map((bin, index) => {
          const isCritical = bin.fill_level >= 90;
          const isHigh = bin.fill_level >= 75;
          const approxDistance = (0.2 + (index * 0.15)).toFixed(1);

          return (
            <div key={bin.bin_id} className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-[#0F172A] text-sm">{bin.bin_id}</span>
                    <StatusBadge status={bin.status} size="sm" />
                  </div>
                  <h4 className="text-xs font-semibold text-[#0F172A] mt-1">{bin.location}</h4>
                  <p className="text-[11px] text-slate-500">{bin.zone}</p>
                </div>
                <span className="text-[10px] font-bold text-[#0077CC] bg-[#F0F9FF] px-2 py-0.5 rounded border border-[#BAE6FD]">
                  {approxDistance} km away
                </span>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-600">Current Volume</span>
                  <span className={`font-mono ${isCritical ? 'text-rose-600 font-bold' : 'text-[#0F172A]'}`}>
                    {bin.fill_level}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className={`h-full ${isCritical ? 'bg-rose-500' : isHigh ? 'bg-amber-500' : 'bg-[#0077CC]'} transition-all`}
                    style={{ width: `${bin.fill_level}%` }}
                  />
                </div>
              </div>

              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span>Waste Stream: <strong className="text-[#0F172A]">{bin.waste_type}</strong></span>
                <span className="text-[10px] text-slate-400">Emptied {bin.last_collection}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
