import React from 'react';
import { PriorityLevel } from '../../types';

interface PriorityBadgeProps {
  priority: PriorityLevel | string;
  score?: number;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, score }) => {
  const p = priority.toUpperCase();

  let styles = 'bg-slate-800 text-slate-300 border-slate-700';

  if (p === 'CRITICAL') {
    styles = 'bg-rose-950/70 text-rose-300 border-rose-500/50 shadow-sm shadow-rose-950/50';
  } else if (p === 'HIGH') {
    styles = 'bg-orange-950/60 text-orange-300 border-orange-500/40';
  } else if (p === 'MEDIUM') {
    styles = 'bg-amber-950/50 text-amber-300 border-amber-500/40';
  } else if (p === 'LOW') {
    styles = 'bg-emerald-950/50 text-emerald-300 border-emerald-500/40';
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${styles}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      <span>{priority}</span>
      {score !== undefined && (
        <span className="text-[10px] opacity-75 font-mono">({score})</span>
      )}
    </span>
  );
};
