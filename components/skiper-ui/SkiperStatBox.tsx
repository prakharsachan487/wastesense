'use client';

import React from 'react';
import { AnimatedNumber } from '../ui/AnimatedNumber';

export type SkiperBadgeColor = 'purple' | 'pink' | 'rose' | 'amber' | 'emerald' | 'blue' | 'sky';

interface SkiperStatBoxProps {
  label: string;
  value: number | string;
  isNumeric?: boolean;
  prefix?: string;
  suffix?: string;
  icon: React.ReactNode;
  color?: SkiperBadgeColor;
  subText?: string;
  trend?: string;
  trendPositive?: boolean;
  onClick?: () => void;
  className?: string;
}

const colorStyles: Record<SkiperBadgeColor, { bg: string; text: string; border: string }> = {
  purple: {
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    border: 'border-purple-100',
  },
  pink: {
    bg: 'bg-pink-50',
    text: 'text-pink-600',
    border: 'border-pink-100',
  },
  rose: {
    bg: 'bg-rose-50',
    text: 'text-rose-600',
    border: 'border-rose-100',
  },
  amber: {
    bg: 'bg-amber-50',
    text: 'text-amber-600',
    border: 'border-amber-100',
  },
  emerald: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    border: 'border-emerald-100',
  },
  blue: {
    bg: 'bg-sky-50',
    text: 'text-[#0077CC]',
    border: 'border-sky-100',
  },
  sky: {
    bg: 'bg-sky-50',
    text: 'text-sky-600',
    border: 'border-sky-100',
  },
};

export const SkiperStatBox: React.FC<SkiperStatBoxProps> = ({
  label,
  value,
  isNumeric = typeof value === 'number',
  prefix,
  suffix,
  icon,
  color = 'blue',
  subText,
  trend,
  trendPositive = true,
  onClick,
  className = '',
}) => {
  const c = colorStyles[color] || colorStyles.blue;

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl p-4 border border-slate-200/80 shadow-[0_2px_12px_rgba(15,23,42,0.03)] hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-3.5 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {/* Pastel circular icon container */}
      <div
        className={`w-11 h-11 rounded-full ${c.bg} ${c.text} ${c.border} border flex items-center justify-center shrink-0 shadow-xs`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block truncate">
          {label}
        </span>
        <div className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight font-mono mt-0.5 flex items-baseline gap-1">
          {prefix && <span className="text-sm font-bold text-slate-500">{prefix}</span>}
          {isNumeric && typeof value === 'number' ? (
            <AnimatedNumber value={value} />
          ) : (
            <span>{value}</span>
          )}
          {suffix && <span className="text-xs font-semibold text-slate-400">{suffix}</span>}
        </div>

        {(subText || trend) && (
          <div className="flex items-center gap-1.5 mt-0.5">
            {trend && (
              <span
                className={`text-[10px] font-bold ${
                  trendPositive ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {trend}
              </span>
            )}
            {subText && (
              <span className="text-[10px] text-slate-400 font-medium truncate">
                {subText}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
