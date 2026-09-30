'use client';

import React, { useState } from 'react';
import { SmartBin } from '../../types';
import { useWasteSense } from '../../context/WasteSenseContext';
import { StatusBadge } from '../ui/StatusBadge';
import { PriorityBadge } from '../ui/PriorityBadge';
import { MapPin, Navigation, Sliders, Truck, AlertTriangle } from 'lucide-react';

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
      <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-2xl p-5 relative overflow-hidden shadow-2xl min-h-[520px]">
        {/* Map Header / Legend */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80 mb-4 z-10 relative">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Navigation className="w-4 h-4 text-emerald-400" />
              <span>Smart City Geospatial Operations Grid</span>
            </h3>
            <p className="text-[11px] text-slate-400">Real-time digital twin sensor overlay with telemetry status</p>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500" /> &ge;90% Critical</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> &ge;75% High</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Normal</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Hotspot</span>
          </div>
        </div>

        {/* Grid Canvas Background */}
        <div className="w-full h-[440px] bg-slate-900/60 rounded-xl relative border border-slate-800/60 overflow-hidden bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
          {/* Simulated Sector outlines */}
          <div className="absolute top-4 left-6 text-[10px] font-mono text-slate-400 border border-slate-800 px-2 py-0.5 rounded">ZONE C - MEDICAL</div>
          <div className="absolute top-4 right-8 text-[10px] font-mono text-slate-400 border border-slate-800 px-2 py-0.5 rounded">ZONE A - TRANSIT</div>
          <div className="absolute bottom-6 left-6 text-[10px] font-mono text-slate-400 border border-slate-800 px-2 py-0.5 rounded">ZONE F - INDUSTRIAL</div>
          <div className="absolute bottom-6 right-8 text-[10px] font-mono text-slate-400 border border-slate-800 px-2 py-0.5 rounded">ZONE E - WATERFRONT</div>

          {/* Hotspot Circles */}
          {hotspots.map(h => (
            <div
              key={h.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
              title={`Hotspot: ${h.name} (${h.incidents} complaints)`}
            >
              <div className="w-14 h-14 rounded-full bg-purple-500/15 border border-purple-500/40 animate-ping opacity-60 absolute" />
              <div className="w-8 h-8 rounded-full bg-purple-600/30 border border-purple-400 flex items-center justify-center text-[10px] font-bold text-purple-200">
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
              <div className="p-1 rounded-lg bg-sky-600 text-white shadow-lg shadow-sky-900 border border-sky-400 text-[10px] flex items-center gap-1">
                <Truck className="w-3 h-3" />
                <span className="font-bold">{v.name}</span>
              </div>
            </div>
          ))}

          {/* Smart Bin Markers */}
          {bins.map(b => {
            const coords = binCoordinates[b.bin_id] || { x: 50, y: 50 };
            const isCritical = b.status === 'CRITICAL';
            const isHigh = b.status === 'HIGH';
            const isSelected = selectedBin?.bin_id === b.bin_id;

            let color = 'bg-emerald-500 border-emerald-300';
            if (isCritical) color = 'bg-rose-500 border-rose-200 shadow-rose-500/50 shadow-md animate-pulse';
            else if (isHigh) color = 'bg-amber-500 border-amber-200';
            else if (b.fill_level >= 60) color = 'bg-yellow-400 border-yellow-200';

            return (
              <button
                key={b.bin_id}
                onClick={() => setSelectedBin(b)}
                style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full border-2 transition-transform ${color} ${
                  isSelected ? 'scale-150 ring-4 ring-white/30 z-30' : 'hover:scale-125 z-10'
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
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
        {selectedBin ? (
          <div className="space-y-4">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase">Selected Sensor Node</span>
                <h3 className="text-lg font-black text-white font-mono">{selectedBin.bin_id}</h3>
                <p className="text-xs text-slate-300">{selectedBin.location}</p>
                <p className="text-[11px] text-slate-400">{selectedBin.zone}</p>
              </div>
              <StatusBadge status={selectedBin.status} />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-400">Fill Capacity</span>
                <span className={`font-mono font-bold ${selectedBin.fill_level >= 90 ? 'text-rose-400' : 'text-slate-200'}`}>
                  {selectedBin.fill_level}%
                </span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className={`h-full ${selectedBin.fill_level >= 90 ? 'bg-rose-500' : 'bg-emerald-500'} transition-all`}
                  style={{ width: `${selectedBin.fill_level}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[11px] block">Load Strain</span>
                <strong className="text-white font-mono">{selectedBin.weight} kg</strong>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[11px] block">Temperature</span>
                <strong className="text-white font-mono">{selectedBin.temperature} °C</strong>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[11px] block">Battery Life</span>
                <strong className="text-white font-mono">{selectedBin.battery}%</strong>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[11px] block">Dispatch Priority</span>
                <strong className="text-purple-400 font-mono">{selectedBin.priority_score}/100</strong>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-800/40 text-xs">
              <div className="font-bold text-purple-300 mb-1 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>System Recommendation:</span>
              </div>
              <p className="text-[11px] text-slate-300">{selectedBin.overflow_prediction}</p>
            </div>

            {onSimulate && (
              <button
                onClick={() => onSimulate(selectedBin.bin_id)}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-950 transition flex items-center justify-center gap-1.5"
              >
                <Sliders className="w-4 h-4" />
                <span>Configure Sensor Telemetry ({selectedBin.bin_id})</span>
              </button>
            )}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400 text-xs">
            Click on any map marker to view telemetry details.
          </div>
        )}
      </div>
    </div>
  );
};
