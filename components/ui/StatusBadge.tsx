import React from 'react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const norm = status.toUpperCase();

  let styles = 'bg-slate-800 text-slate-300 border-slate-700';

  if (norm === 'CRITICAL' || norm === 'HIGH' || norm === 'CANCELLED') {
    styles = 'bg-rose-500/15 text-rose-400 border-rose-500/30';
  } else if (norm === 'WARNING' || norm === 'UNDER REVIEW' || norm === 'PENDING') {
    styles = 'bg-amber-500/15 text-amber-400 border-amber-500/30';
  } else if (norm === 'NORMAL' || norm === 'RESOLVED' || norm === 'COMPLETED' || norm === 'OPERATIONAL' || norm === 'VERIFIED') {
    styles = 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
  } else if (norm === 'ASSIGNED' || norm === 'IN PROGRESS' || norm === 'IN ROUTE' || norm === 'SCHEDULED') {
    styles = 'bg-sky-500/15 text-sky-400 border-sky-500/30';
  } else if (norm === 'SUBMITTED') {
    styles = 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30';
  }

  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1 font-semibold rounded-full border ${styles} ${sizeClass}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {status}
    </span>
  );
};
