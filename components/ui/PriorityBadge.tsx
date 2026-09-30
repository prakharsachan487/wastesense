import React from 'react';
import { PriorityLevel } from '../../types';

interface PriorityBadgeProps {
  priority: PriorityLevel | string;
  score?: number;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, score }) => {
  const p = priority.toUpperCase();

  let styles = 'bg-slate-100 text-slate-700 border-slate-200';

  if (p === 'CRITICAL') {
    styles = 'bg-rose-50 text-rose-700 border-rose-200 shadow-xs';
  } else if (p === 'HIGH') {
    styles = 'bg-orange-50 text-orange-700 border-orange-200';
  } else if (p === 'MEDIUM') {
    styles = 'bg-amber-50 text-amber-700 border-amber-200';
  } else if (p === 'LOW') {
    styles = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${styles}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      <span>{priority}</span>
      {score !== undefined && (
        <span className="text-[10px] opacity-75 font-mono">({score})</span>
      )}
    </span>
  );
};
