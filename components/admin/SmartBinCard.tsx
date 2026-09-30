import React from 'react';
import Link from 'next/link';
import { SmartBin } from '../../types';
import { StatusBadge } from '../ui/StatusBadge';
import { PriorityBadge } from '../ui/PriorityBadge';
import { Battery, Thermometer, Scale, Clock } from 'lucide-react';

interface SmartBinCardProps {
  bin: SmartBin;
}

export const SmartBinCard: React.FC<SmartBinCardProps> = ({ bin }) => {
  const isCritical = bin.status === 'CRITICAL';
  const isHigh = bin.status === 'HIGH';

  let fillGradient = 'from-emerald-500 to-teal-400';
  if (bin.fill_level >= 90) fillGradient = 'from-rose-500 to-red-600';
  else if (bin.fill_level >= 75) fillGradient = 'from-amber-500 to-orange-500';
  else if (bin.fill_level >= 60) fillGradient = 'from-yellow-400 to-amber-500';

  return (
    <div className={`p-5 rounded-2xl border transition-all shadow-xs hover:shadow-md flex flex-col justify-between ${
      isCritical 
        ? 'bg-white border-rose-300 hover:border-rose-400' 
        : isHigh
        ? 'bg-white border-amber-300 hover:border-amber-400'
        : 'bg-white border-slate-200 hover:border-[#0077CC]'
    }`}>
      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-extrabold text-[#0F172A]">{bin.bin_id}</span>
              <StatusBadge status={bin.status} size="sm" />
            </div>
            <p className="text-xs text-slate-600 font-medium mt-0.5">{bin.location}</p>
            <p className="text-[10px] text-slate-400">{bin.zone}</p>
          </div>
          <PriorityBadge priority={isCritical ? 'CRITICAL' : isHigh ? 'HIGH' : 'LOW'} score={bin.priority_score} />
        </div>

        {/* Fill Level Gauge Bar */}
        <div className="mt-4">
          <div className="flex justify-between items-baseline text-xs mb-1.5">
            <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">Fill Level</span>
            <span className={`font-mono text-base font-extrabold ${isCritical ? 'text-rose-600' : 'text-[#0F172A]'}`}>
              {bin.fill_level}%
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div 
              className={`h-full bg-gradient-to-r ${fillGradient} transition-all duration-500`}
              style={{ width: `${bin.fill_level}%` }}
            />
          </div>
        </div>

        {/* Sensor Meta Grid */}
        <div className="grid grid-cols-3 gap-2 mt-4 p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200 text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-700">
            <Scale className="w-3.5 h-3.5 text-[#0077CC] shrink-0" />
            <span className="font-mono font-semibold">{bin.weight} kg</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-700">
            <Thermometer className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="font-mono font-semibold">{bin.temperature}°C</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-700">
            <Battery className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="font-mono font-semibold">{bin.battery}%</span>
          </div>
        </div>

        {/* AI Prediction & Last Collection */}
        <div className="mt-3.5 text-[11px] text-slate-500 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-slate-500">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Last emptied:</span>
            </span>
            <span className="text-slate-700 font-semibold">{bin.last_collection}</span>
          </div>
          <div className="p-2 rounded-xl bg-[#F0F9FF] text-[10px] text-[#004A80] border border-[#BAE6FD] flex items-center gap-1">
            <span><strong>Overflow Forecast:</strong> {bin.overflow_prediction}</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium">Live Telemetry</span>
        </div>

        {bin.fill_level >= 75 ? (
          <Link
            href="/admin/tasks"
            className="py-1.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition shadow-xs flex items-center gap-1"
          >
            <span>Dispatch Crew</span>
          </Link>
        ) : (
          <Link
            href="/admin/map"
            className="py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
          >
            <span>View on Map</span>
          </Link>
        )}
      </div>
    </div>
  );
};
