'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SmartBin } from '../../types';
import { useWasteSense } from '../../context/WasteSenseContext';
import { StatusBadge } from '../ui/StatusBadge';
import { PriorityBadge } from '../ui/PriorityBadge';
import { 
  MapPin, Navigation, Truck, AlertTriangle, Trash2, Send, 
  CheckCircle2, Clock, Flame, ShieldAlert, Sparkles 
} from 'lucide-react';

import dynamic from 'next/dynamic';

const LeafletMap = dynamic(
  () => import('./LeafletMap').then((m) => m.LeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[540px] rounded-2xl bg-slate-100 flex flex-col items-center justify-center border border-slate-200 text-slate-400">
        <Navigation className="w-8 h-8 text-[#0077CC] animate-spin mb-2" />
        <span className="text-xs font-semibold">Loading Advanced Geospatial Map Engine...</span>
      </div>
    ),
  }
);

interface MapPanelProps {
  onSimulate?: (binId: string) => void;
}

export const MapPanel: React.FC<MapPanelProps> = ({ onSimulate }) => {
  const { bins, vehicles, tasks, workers, createTask, simulateSurgeB102 } = useWasteSense();
  const [selectedBinId, setSelectedBinId] = useState<string>('B-102');
  const [dispatchSuccess, setDispatchSuccess] = useState<string | null>(null);

  // Dynamic live bin resolution from shared context
  const selectedBin = bins.find(b => b.bin_id === selectedBinId) || bins.find(b => b.bin_id === 'B-102') || bins[0];

  // Check if an active collection task already exists for this bin
  const existingTask = tasks.find(t => t.bin_id === selectedBin?.bin_id && t.status !== 'Completed');

  const handleDispatch = () => {
    if (!selectedBin) return;
    if (existingTask) {
      setDispatchSuccess(`Task already active: ${existingTask.task_code} (${existingTask.worker_name})`);
      setTimeout(() => setDispatchSuccess(null), 3500);
      return;
    }

    const newTask = createTask(
      selectedBin.bin_id, 
      workers[0]?.id || 'w-1', 
      vehicles[0]?.id || 'v-1', 
      selectedBin.status === 'CRITICAL' ? 'CRITICAL' : 'HIGH'
    );
    setDispatchSuccess(`Dispatched ${newTask.task_code} to ${newTask.worker_name}!`);
    setTimeout(() => setDispatchSuccess(null), 3500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Real Interactive Leaflet OpenStreetMap Canvas */}
      <div className="lg:col-span-2">
        <LeafletMap
          bins={bins}
          vehicles={vehicles}
          selectedBinId={selectedBin?.bin_id || 'B-102'}
          onSelectBin={(id) => setSelectedBinId(id)}
        />
      </div>

      {/* Selected Marker Detail & AI Intelligence Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
        {selectedBin ? (
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#0077CC] tracking-wider uppercase flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#0077CC]" />
                  Selected Sensor Intelligence
                </span>
                <h3 className="text-xl font-black text-[#0F172A] font-mono mt-0.5">{selectedBin.bin_id}</h3>
                <p className="text-xs text-slate-700 font-semibold">{selectedBin.location}</p>
                <p className="text-[11px] text-slate-500">{selectedBin.zone}</p>
              </div>
              <div className="text-right space-y-1">
                <StatusBadge status={selectedBin.status} />
                <div className="text-[10px] font-bold text-slate-500 font-mono">
                  Score: <span className="text-purple-700">{selectedBin.priority_score}/100</span>
                </div>
              </div>
            </div>

            {/* Fill Level Gauge */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-600">IoT Ultrasonic Fill Capacity</span>
                <span className={`font-mono font-bold text-sm ${
                  selectedBin.fill_level >= 90 ? 'text-rose-600' : 
                  selectedBin.fill_level >= 75 ? 'text-amber-600' : 'text-emerald-600'
                }`}>
                  {selectedBin.fill_level}% {selectedBin.status}
                </span>
              </div>
              <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div 
                  className={`h-full transition-all duration-500 ${
                    selectedBin.fill_level >= 90 ? 'bg-rose-500' : 
                    selectedBin.fill_level >= 75 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${selectedBin.fill_level}%` }}
                />
              </div>
            </div>

            {/* Telemetry 4-Pack */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 text-[10px] block uppercase font-bold">Load Strain</span>
                <strong className="text-[#0F172A] font-mono text-sm">{selectedBin.weight} kg</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 text-[10px] block uppercase font-bold">Temperature</span>
                <strong className="text-[#0F172A] font-mono text-sm">{selectedBin.temperature} °C</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 text-[10px] block uppercase font-bold">Battery (Solar)</span>
                <strong className="text-[#0F172A] font-mono text-sm">{selectedBin.battery}%</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 text-[10px] block uppercase font-bold">Last Collection</span>
                <strong className="text-slate-700 font-mono text-xs">{selectedBin.last_collection}</strong>
              </div>
            </div>

            {/* WHY THIS BIN? AI Rationale */}
            <div className="p-3.5 rounded-xl bg-purple-50/80 border border-purple-200 text-xs space-y-1.5">
              <div className="font-bold text-purple-900 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>WHY THIS BIN? (AI RATIONALE)</span>
              </div>
              <ul className="text-[11px] text-purple-950 space-y-0.5 pl-4 list-disc font-medium">
                <li><strong>{selectedBin.fill_level}% Fill Level</strong> &bull; {selectedBin.overflow_prediction}</li>
                <li>{selectedBin.bin_id === 'B-102' ? '2 citizen complaints registered nearby in last 45m' : `${selectedBin.risk_factor} corridor demand`}</li>
                <li>{selectedBin.bin_id === 'B-102' ? '4.2h elapsed since last collection cycle' : `Telemetry verified via LoRaWAN mesh`}</li>
                <li>Priority score weighted at <strong>{selectedBin.priority_score}/100</strong></li>
              </ul>
            </div>

            {/* Dispatch Status / Notification */}
            {dispatchSuccess && (
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{dispatchSuccess}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleDispatch}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0077CC] hover:bg-[#004A80] text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-2 active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>
                  {existingTask 
                    ? `Task Active: ${existingTask.task_code} (${existingTask.status})` 
                    : `Dispatch Collection for ${selectedBin.bin_id}`
                  }
                </span>
              </button>

              <div className="flex items-center gap-2">
                {selectedBin.bin_id === 'B-102' && (
                  <button
                    onClick={() => simulateSurgeB102()}
                    className="flex-1 py-2 px-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-[11px] transition text-center"
                    title="Simulate 95% overflow surge for demo"
                  >
                    Simulate 95% Surge
                  </button>
                )}

                <Link
                  href={`/admin/smart-bins?search=${selectedBin.bin_id}`}
                  className="flex-1 py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition text-center flex items-center justify-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Fleet Detail</span>
                </Link>
              </div>
            </div>
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
