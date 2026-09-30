import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  subtitle?: string;
  badge?: string;
  variant?: 'rose' | 'amber' | 'emerald' | 'sky' | 'indigo' | 'default';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  subtitle,
  badge,
  variant = 'default'
}) => {
  const borderVariants = {
    rose: 'hover:border-rose-500/40 bg-gradient-to-br from-rose-950/20 via-slate-900/60 to-slate-900',
    amber: 'hover:border-amber-500/40 bg-gradient-to-br from-amber-950/20 via-slate-900/60 to-slate-900',
    emerald: 'hover:border-emerald-500/40 bg-gradient-to-br from-emerald-950/20 via-slate-900/60 to-slate-900',
    sky: 'hover:border-sky-500/40 bg-gradient-to-br from-sky-950/20 via-slate-900/60 to-slate-900',
    indigo: 'hover:border-indigo-500/40 bg-gradient-to-br from-indigo-950/20 via-slate-900/60 to-slate-900',
    default: 'hover:border-slate-700 bg-slate-900/80'
  };

  const textColors = {
    rose: 'text-rose-400',
    amber: 'text-amber-400',
    emerald: 'text-emerald-400',
    sky: 'text-sky-400',
    indigo: 'text-indigo-400',
    default: 'text-white'
  };

  return (
    <div className={`p-5 rounded-xl border border-slate-800 backdrop-blur-md transition-all duration-200 shadow-lg ${borderVariants[variant]}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</span>
        <div className="p-2.5 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/60">
          {icon}
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <div className={`text-3xl font-extrabold tracking-tight font-mono ${textColors[variant]}`}>
          {value}
        </div>
        {badge && (
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            {badge}
          </span>
        )}
      </div>

      {(subtitle || change) && (
        <div className="mt-2.5 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-2.5">
          <span>{subtitle}</span>
          {change && (
            <span className={`font-medium ${
              changeType === 'positive' ? 'text-emerald-400' :
              changeType === 'negative' ? 'text-rose-400' : 'text-slate-400'
            }`}>
              {change}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
