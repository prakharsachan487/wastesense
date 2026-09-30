'use client';

import React from 'react';
import Link from 'next/link';

export interface ProgressSegment {
  label: string;
  count: number | string;
  percent: number; // 0 - 100
  color: string; // Tailwind color class e.g. 'bg-teal-600', 'bg-rose-500'
}

export interface MetricStatItem {
  keyLabel: string;
  value: number | string;
  colorClass?: string;
}

interface SkiperProgressCardProps {
  title: string;
  actionText?: string;
  actionHref?: string;
  onActionClick?: () => void;
  segments: ProgressSegment[];
  metrics: MetricStatItem[];
  className?: string;
}

export const SkiperProgressCard: React.FC<SkiperProgressCardProps> = ({
  title,
  actionText,
  actionHref,
  onActionClick,
  segments,
  metrics,
  className = '',
}) => {
  return (
    <div
      className={`bg-white/95 rounded-[24px] p-5 sm:p-6 border border-slate-200/90 shadow-[0_2px_14px_rgba(15,23,42,0.04)] flex flex-col justify-between ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
        <h3 className="text-sm sm:text-base font-extrabold text-[#0F172A] tracking-tight">
          {title}
        </h3>
        {actionText && actionHref && (
          <Link
            href={actionHref}
            className="text-xs font-semibold text-[#0077CC] hover:text-[#004A80] hover:underline"
          >
            {actionText}
          </Link>
        )}
        {actionText && !actionHref && onActionClick && (
          <button
            type="button"
            onClick={onActionClick}
            className="text-xs font-semibold text-[#0077CC] hover:text-[#004A80] hover:underline"
          >
            {actionText}
          </button>
        )}
      </div>

      {/* Segmented Dual/Multi Color Progress Track */}
      <div className="my-2">
        <div className="h-3 w-full bg-slate-100 rounded-full flex overflow-hidden p-0.5 gap-1 shadow-inner">
          {segments.map((seg, idx) => (
            <div
              key={idx}
              style={{ width: `${Math.max(seg.percent, 3)}%` }}
              className={`h-full rounded-full transition-all duration-500 ${seg.color}`}
              title={`${seg.label}: ${seg.count} (${seg.percent}%)`}
            />
          ))}
        </div>
      </div>

      {/* 4 Metric Columns below track matching reference */}
      <div className="grid grid-cols-4 gap-2 pt-4 mt-2 border-t border-slate-100 text-center">
        {metrics.map((m, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              {m.keyLabel}
            </span>
            <span
              className={`text-lg sm:text-xl font-black font-mono tracking-tight mt-0.5 ${
                m.colorClass || 'text-[#0F172A]'
              }`}
            >
              {m.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
