'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SmartBin } from '../../types';
import { StatusBadge } from '../ui/StatusBadge';
import { Trash2, AlertTriangle, Clock, MapPin, ArrowRight, ShieldCheck, Flame } from 'lucide-react';

interface CitizenSmartBinCardProps {
  bin: SmartBin;
  onSelect?: (bin: SmartBin) => void;
}

export const CitizenSmartBinCard: React.FC<CitizenSmartBinCardProps> = ({ bin }) => {
  const isCritical = bin.status === 'CRITICAL';
  const isHigh = bin.status === 'HIGH';
  const isNormal = bin.status === 'NORMAL';

  // Bar color based on fill level
  const barColor = isCritical 
    ? 'bg-rose-500' 
    : isHigh 
    ? 'bg-amber-500' 
    : bin.fill_level >= 60 
    ? 'bg-yellow-500' 
    : 'bg-emerald-500';

  const textColor = isCritical 
    ? 'text-rose-600' 
    : isHigh 
    ? 'text-amber-600' 
    : 'text-[#0F172A]';

  return (
    <div className={`p-4 rounded-2xl bg-white border transition-all hover:shadow-md flex flex-col justify-between ${
      isCritical ? 'border-rose-200 ring-1 ring-rose-200/60' : 'border-slate-200'
    }`}>
      <div className="space-y-3">
        {/* Top Line: Bin ID + Status Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-base font-black text-[#0F172A]">{bin.bin_id}</span>
            {isCritical && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            )}
          </div>
          <StatusBadge status={bin.status} size="sm" />
        </div>

        {/* Location & Sector */}
        <div>
          <h4 className="text-xs font-bold text-[#0F172A] line-clamp-1">{bin.location}</h4>
          <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="truncate">{bin.zone}</span>
          </p>
        </div>

        {/* Capacity Percentage & Animated Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Fill Capacity</span>
            <span className={`font-mono font-black text-sm ${textColor}`}>
              {bin.fill_level}%
            </span>
          </div>

          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/80">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${bin.fill_level}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className={`h-full ${barColor}`}
            />
          </div>
        </div>

        {/* Waste Type Tag & Overflow Risk */}
        <div className="pt-2 border-t border-slate-100 space-y-1 text-[11px]">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-slate-400">Waste Stream:</span>
            <strong className="text-[#0F172A] font-semibold">{bin.waste_type}</strong>
          </div>

          <div className="flex items-center justify-between text-slate-600">
            <span className="text-slate-400">Overflow Status:</span>
            <span className={`font-medium ${isCritical ? 'text-rose-600 font-bold' : isHigh ? 'text-amber-700' : 'text-slate-600'}`}>
              {bin.overflow_prediction}
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-400 text-[10px]">
            <span>Last Telemetry Sync:</span>
            <span className="font-mono">{bin.updated_at || 'Just now'}</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-4 pt-2">
        {isCritical || isHigh ? (
          <Link
            href={`/citizen/report?bin=${bin.bin_id}`}
            className="w-full py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs transition flex items-center justify-center gap-1.5 active:scale-95"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Report Overflow</span>
          </Link>
        ) : (
          <Link
            href={`/citizen/bins?id=${bin.bin_id}`}
            className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-xs transition flex items-center justify-center gap-1.5"
          >
            <span>View Bin Details</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        )}
      </div>
    </div>
  );
};
