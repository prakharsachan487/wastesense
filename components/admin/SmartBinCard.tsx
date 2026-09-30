import React from 'react';
import { SmartBin } from '../../types';
import { StatusBadge } from '../ui/StatusBadge';
import { PriorityBadge } from '../ui/PriorityBadge';
import { Sliders, Battery, Thermometer, Scale, Clock } from 'lucide-react';

interface SmartBinCardProps {
  bin: SmartBin;
  onSimulate: (binId: string) => void;
  onQuickFlush?: (binId: string) => void;
}

export const SmartBinCard: React.FC<SmartBinCardProps> = ({ bin, onSimulate, onQuickFlush }) => {
  const isCritical = bin.status === 'CRITICAL';
  const isHigh = bin.status === 'HIGH';

  let fillGradient = 'from-emerald-500 to-teal-400';
  if (bin.fill_level >= 90) fillGradient = 'from-rose-500 to-red-600';
  else if (bin.fill_level >= 75) fillGradient = 'from-amber-500 to-orange-500';
  else if (bin.fill_level >= 60) fillGradient = 'from-yellow-400 to-amber-500';

  return (
    <div className={`p-4 rounded-xl border backdrop-blur-md transition-all shadow-md flex flex-col justify-between ${
      isCritical 
        ? 'bg-rose-950/20 border-rose-500/40 hover:border-rose-400' 
        : isHigh
        ? 'bg-amber-950/20 border-amber-500/30 hover:border-amber-400'
        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
    }`}>
      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-extrabold text-white">{bin.bin_id}</span>
              <StatusBadge status={bin.status} size="sm" />
            </div>
            <p className="text-xs text-slate-300 font-medium mt-0.5">{bin.location}</p>
            <p className="text-[10px] text-slate-400">{bin.zone}</p>
          </div>
          <PriorityBadge priority={isCritical ? 'CRITICAL' : isHigh ? 'HIGH' : 'LOW'} score={bin.priority_score} />
        </div>

        {/* Fill Level Gauge Bar */}
        <div className="mt-3.5">
          <div className="flex justify-between items-baseline text-xs mb-1">
            <span className="text-slate-400 text-[11px] font-semibold">FILL LEVEL</span>
            <span className={`font-mono text-base font-extrabold ${isCritical ? 'text-rose-400' : 'text-slate-200'}`}>
              {bin.fill_level}%
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div 
              className={`h-full bg-gradient-to-r ${fillGradient} transition-all duration-500`}
              style={{ width: `${bin.fill_level}%` }}
            />
          </div>
        </div>

        {/* Sensor Meta Grid */}
        <div className="grid grid-cols-3 gap-2 mt-3.5 p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Scale className="w-3 h-3 text-sky-400 shrink-0" />
            <span className="font-mono">{bin.weight} kg</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Thermometer className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="font-mono">{bin.temperature}°C</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Battery className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="font-mono">{bin.battery}%</span>
          </div>
        </div>

        {/* AI Prediction & Last Collection */}
        <div className="mt-3 text-[11px] text-slate-400 space-y-1">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Last emptied:</span>
            </span>
            <span className="text-slate-300 font-medium">{bin.last_collection}</span>
          </div>
          <div className="p-1.5 rounded bg-slate-800/40 text-[10px] text-purple-300 border border-purple-900/30 flex items-center gap-1">
            <span>🔮 <strong>AI Forecast:</strong> {bin.overflow_prediction}</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2">
        <button
          onClick={() => onSimulate(bin.bin_id)}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-indigo-950/70 hover:bg-indigo-900/80 text-indigo-300 border border-indigo-800/40 text-xs font-semibold transition"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Simulate Sensor</span>
        </button>

        {onQuickFlush && bin.fill_level > 50 && (
          <button
            onClick={() => onQuickFlush(bin.bin_id)}
            className="py-1.5 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
            title="Simulate Emptying Bin to 18%"
          >
            Empty (18%)
          </button>
        )}
      </div>
    </div>
  );
};
