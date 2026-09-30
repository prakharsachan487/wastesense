'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SmartBin } from '../../types';
import { useWasteSense } from '../../context/WasteSenseContext';
import { StatusBadge } from '../ui/StatusBadge';
import { PriorityBadge } from '../ui/PriorityBadge';
import { MapPin, Navigation, Truck, AlertTriangle, Trash2 } from 'lucide-react';

interface MapPanelProps {
  onSimulate?: (binId: string) => void;
}

export const MapPanel: React.FC<MapPanelProps> = ({ onSimulate }) => {
  const { bins, vehicles } = useWasteSense();
  const [selectedBin, setSelectedBin] = useState<SmartBin | null>(bins.find(b => b.bin_id === 'B-102') || bins[0]);

  const hotspots = [
    { id: "H-01", name: "Central Commercial Square", incidents: 14, severity: "Critical", x: 42, y: 38 },
    { id: "H-02", name: "Railway Transit Concourse", incidents: 11, severity: "High", x: 74, y: 22 },
    { id: "H-03", name: "Industrial Sector Backlane", incidents: 8, severity: "Critical", x: 22, y: 65 },
    { id: "H-04", name: "Sports Stadium West Gate", incidents: 6, severity: "Medium", x: 62, y: 72 },
    { id: "H-05", name: "Riverfront Walkway", incidents: 5, severity: "Medium", x: 82, y: 55 }
  ];

  // Distribute bins across simulated grid
  const binCoordinates: Record<string, { x: number; y: number }> = {
    "B-102": { x: 45, y: 40 },
    "B-087": { x: 52, y: 30 },
    "B-121": { x: 30, y: 25 },
    "B-044": { x: 60, y: 50 },
    "B-105": { x: 48, y: 46 },
    "B-106": { x: 65, y: 68 },
    "B-107": { x: 70, y: 42 },
    "B-108": { x: 55, y: 78 },
    "B-109": { x: 76, y: 24 },
    "B-110": { x: 38, y: 48 },
    "B-111": { x: 80, y: 58 },
    "B-112": { x: 24, y: 68 },
    "B-113": { x: 36, y: 32 },
    "B-114": { x: 58, y: 20 },
    "B-115": { x: 42, y: 52 },
    "B-116": { x: 68, y: 58 },
    "B-117": { x: 72, y: 18 },
    "B-118": { x: 28, y: 36 },
    "B-119": { x: 85, y: 65 },
    "B-120": { x: 88, y: 35 },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Map Canvas */}
      <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 relative overflow-hidden shadow-sm min-h-[520px]">
        {/* Map Header / Legend */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 mb-4 z-10 relative">
          <div>
            <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
              <Navigation className="w-4 h-4 text-[#0077CC]" />
              <span>Smart City Geospatial Operations Grid</span>
            </h3>
            <p className="text-[11px] text-slate-500">Real-time digital twin sensor overlay with telemetry status</p>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-600 font-medium">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-xs" /> &ge;90% Critical</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> &ge;75% High</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Normal</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#087FD1]" /> High Density Area</span>
          </div>
        </div>

        {/* Grid Canvas Background */}
        <div 
          className="w-full h-[440px] bg-[#F7FAFC] rounded-xl relative border border-[#E2E8F0] overflow-hidden"
          style={{
            backgroundImage: `radial-gradient(#CBD5E1 1.2px, transparent 1.2px)`,
            backgroundSize: '18px 18px',
          }}
        >
          {/* Simulated Sector outlines */}
          <div className="absolute top-4 left-6 text-[10px] font-mono font-bold text-slate-600 border border-slate-200 bg-white/95 shadow-xs px-2.5 py-1 rounded-lg">ZONE C &bull; MEDICAL</div>
          <div className="absolute top-4 right-8 text-[10px] font-mono font-bold text-slate-600 border border-slate-200 bg-white/95 shadow-xs px-2.5 py-1 rounded-lg">ZONE A &bull; TRANSIT</div>
          <div className="absolute bottom-6 left-6 text-[10px] font-mono font-bold text-slate-600 border border-slate-200 bg-white/95 shadow-xs px-2.5 py-1 rounded-lg">ZONE F &bull; INDUSTRIAL</div>
          <div className="absolute bottom-6 right-8 text-[10px] font-mono font-bold text-slate-600 border border-slate-200 bg-white/95 shadow-xs px-2.5 py-1 rounded-lg">ZONE E &bull; WATERFRONT</div>

          {/* Area Density Clusters */}
          {hotspots.map(h => (
            <div
              key={h.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
              title={`Corridor: ${h.name} (${h.incidents} active reports)`}
            >
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-300 animate-ping opacity-60 absolute" />
              <div className="w-8 h-8 rounded-full bg-white border border-amber-400 flex items-center justify-center text-[10px] font-extrabold text-amber-800 shadow-sm">
                {h.incidents}
              </div>
            </div>
          ))}

          {/* Vehicle Markers */}
          {vehicles.map((v, i) => (
            <div
              key={v.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
              style={{ left: `${25 + i * 14}%`, top: `${35 + (i % 2) * 20}%` }}
              title={`${v.name} (${v.type}) - ${v.assigned_driver}`}
            >
              <div className="p-1.5 rounded-xl bg-[#087FD1] text-white shadow-md border border-white text-[10px] flex items-center gap-1.5 font-bold">
                <Truck className="w-3.5 h-3.5" />
                <span>{v.name}</span>
              </div>
            </div>
          ))}

          {/* Smart Bin Markers */}
          {bins.map(b => {
            const coords = binCoordinates[b.bin_id] || { x: 50, y: 50 };
            const isCritical = b.status === 'CRITICAL' || b.fill_level >= 90;
            const isHigh = b.status === 'HIGH' || (b.fill_level >= 75 && b.fill_level < 90);
            const isSelected = selectedBin?.bin_id === b.bin_id;

            let color = 'bg-[#10B981] border-white';
            if (isCritical) color = 'bg-[#EF4444] border-white shadow-sm animate-pulse';
            else if (isHigh) color = 'bg-[#F59E0B] border-white';
            else if (b.fill_level >= 60) color = 'bg-amber-400 border-white';

            return (
              <button
                key={b.bin_id}
                onClick={() => setSelectedBin(b)}
                style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full border-2 transition-all ${color} ${
                  isSelected ? 'scale-150 ring-4 ring-[#087FD1]/40 z-30 shadow-md' : 'hover:scale-125 z-10'
                }`}
                title={`${b.bin_id}: ${b.fill_level}% (${b.status})`}
              >
                <span className="sr-only">{b.bin_id}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Marker Detail Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
        {selectedBin ? (
          <div className="space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#087FD1] tracking-wider uppercase">Selected Sensor Node</span>
                <h3 className="text-xl font-extrabold text-[#0F172A] font-mono mt-0.5">{selectedBin.bin_id}</h3>
                <p className="text-xs text-slate-700 font-medium">{selectedBin.location}</p>
                <p className="text-[11px] text-slate-500">{selectedBin.zone}</p>
              </div>
              <StatusBadge status={selectedBin.status} />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-600">Fill Capacity</span>
                <span className={`font-mono font-bold ${selectedBin.fill_level >= 90 ? 'text-[#EF4444]' : 'text-[#0F172A]'}`}>
                  {selectedBin.fill_level}%
                </span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div 
                  className={`h-full ${selectedBin.fill_level >= 90 ? 'bg-[#EF4444]' : selectedBin.fill_level >= 75 ? 'bg-[#F59E0B]' : 'bg-[#10B981]'} transition-all`}
                  style={{ width: `${selectedBin.fill_level}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="text-slate-400 text-[10px] block uppercase font-bold tracking-wider">Load Strain</span>
                <strong className="text-[#0F172A] font-mono">{selectedBin.weight} kg</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="text-slate-400 text-[10px] block uppercase font-bold tracking-wider">Temperature</span>
                <strong className="text-[#0F172A] font-mono">{selectedBin.temperature} °C</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="text-slate-400 text-[10px] block uppercase font-bold tracking-wider">Battery</span>
                <strong className="text-[#0F172A] font-mono">{selectedBin.battery}%</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="text-slate-400 text-[10px] block uppercase font-bold tracking-wider">Priority Score</span>
                <strong className="text-[#087FD1] font-mono">{selectedBin.priority_score}/100</strong>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-sky-50/80 border border-sky-200 text-xs">
              <div className="font-bold text-[#004A80] mb-1 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-[#087FD1]" />
                <span>Operational Intelligence:</span>
              </div>
              <p className="text-[11px] text-[#0F172A] leading-relaxed">{selectedBin.overflow_prediction}</p>
            </div>

            <Link
              href={`/admin/smart-bins?search=${selectedBin.bin_id}`}
              className="w-full py-2.5 rounded-xl bg-[#0077CC] hover:bg-[#004A80] text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" />
              <span>Inspect in Fleet Manager ({selectedBin.bin_id})</span>
            </Link>
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500 text-xs">
            Click on any map marker to view telemetry details.
          </div>
        )}
      </div>
    </div>
  );
};
