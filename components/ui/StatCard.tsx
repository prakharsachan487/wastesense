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
    rose: 'border-rose-200 bg-white hover:border-rose-300',
    amber: 'border-amber-200 bg-white hover:border-amber-300',
    emerald: 'border-emerald-200 bg-white hover:border-emerald-300',
    sky: 'border-[#BAE6FD] bg-white hover:border-[#0EA5E9]',
    indigo: 'border-indigo-200 bg-white hover:border-indigo-300',
    default: 'border-slate-200/90 bg-white hover:border-[#0077CC]'
  };

  const textColors = {
    rose: 'text-rose-600',
    amber: 'text-amber-600',
    emerald: 'text-emerald-600',
    sky: 'text-[#0077CC]',
    indigo: 'text-[#004A80]',
    default: 'text-[#0F172A]'
  };

  const iconBg = {
    rose: 'bg-rose-50 text-rose-600 border-rose-200',
    amber: 'bg-amber-50 text-amber-600 border-amber-200',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    sky: 'bg-[#F0F9FF] text-[#0077CC] border-[#BAE6FD]',
    indigo: 'bg-[#F0F9FF] text-[#004A80] border-[#BAE6FD]',
    default: 'bg-[#F0F9FF] text-[#0077CC] border-[#BAE6FD]'
  };

  return (
    <div className={`p-5 rounded-2xl border transition-all duration-200 shadow-xs hover:shadow-md ${borderVariants[variant]}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</span>
        <div className={`p-2.5 rounded-xl border ${iconBg[variant]}`}>
          {icon}
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <div className={`text-3xl font-extrabold tracking-tight font-mono ${textColors[variant]}`}>
          {value}
        </div>
        {badge && (
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#F0F9FF] text-[#0077CC] border border-[#BAE6FD]">
            {badge}
          </span>
        )}
      </div>

      {(subtitle || change) && (
        <div className="mt-3 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-2.5">
          <span>{subtitle}</span>
          {change && (
            <span className={`font-bold ${
              changeType === 'positive' ? 'text-emerald-600' :
              changeType === 'negative' ? 'text-rose-600' : 'text-slate-600'
            }`}>
              {change}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
