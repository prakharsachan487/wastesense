import React from 'react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const norm = status.toUpperCase();

  let styles = 'bg-slate-100 text-slate-700 border-slate-200';

  if (norm === 'CRITICAL' || norm === 'HIGH' || norm === 'CANCELLED' || norm === 'REWORK') {
    styles = 'bg-rose-50 text-rose-700 border-rose-200';
  } else if (norm === 'WARNING' || norm === 'UNDER REVIEW' || norm === 'PENDING') {
    styles = 'bg-amber-50 text-amber-700 border-amber-200';
  } else if (norm === 'NORMAL' || norm === 'RESOLVED' || norm === 'COMPLETED' || norm === 'OPERATIONAL' || norm === 'VERIFIED') {
    styles = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (norm === 'EN ROUTE' || norm === 'IN ROUTE') {
    styles = 'bg-purple-50 text-purple-700 border-purple-200';
  } else if (norm === 'ASSIGNED' || norm === 'IN PROGRESS' || norm === 'SCHEDULED') {
    styles = 'bg-[#F0F9FF] text-[#0077CC] border-[#BAE6FD]';
  } else if (norm === 'SUBMITTED') {
    styles = 'bg-[#F0F9FF] text-[#0EA5E9] border-[#BAE6FD]';
  }

  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1 font-bold rounded-full border ${styles} ${sizeClass}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {status}
    </span>
  );
};
