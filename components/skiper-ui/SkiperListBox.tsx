'use client';

import React from 'react';
import Link from 'next/link';

export interface SkiperListItem {
  id: string;
  rank?: number | string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  iconBg?: string;
  col1?: string | number;
  col2?: string | number;
  col3?: string | number;
  col4?: string | number;
  col5?: string | number;
  badge?: React.ReactNode;
  actionNode?: React.ReactNode;
  onClick?: () => void;
  highlight?: boolean;
}

interface SkiperListBoxProps {
  title: string;
  actionText?: string;
  actionHref?: string;
  onActionClick?: () => void;
  columnHeaders?: string[]; // e.g. ['#', 'NODE', 'LOC', 'FILL', 'STATUS']
  items: SkiperListItem[];
  className?: string;
}

export const SkiperListBox: React.FC<SkiperListBoxProps> = ({
  title,
  actionText,
  actionHref,
  onActionClick,
  columnHeaders,
  items,
  className = '',
}) => {
  return (
    <div
      className={`bg-white/95 rounded-[24px] p-5 sm:p-6 border border-slate-200/90 shadow-[0_2px_14px_rgba(15,23,42,0.04)] flex flex-col justify-between ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
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

      {/* Column Headers if provided */}
      {columnHeaders && (
        <div className="grid grid-cols-12 gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-100 px-2">
          {columnHeaders.map((header, idx) => (
            <span
              key={idx}
              className={`${
                idx === 0
                  ? 'col-span-1 text-center'
                  : idx === 1
                  ? 'col-span-5 text-left'
                  : 'col-span-2 text-center'
              }`}
            >
              {header}
            </span>
          ))}
        </div>
      )}

      {/* List items */}
      <div className="space-y-1.5 divide-y divide-slate-50 mt-1">
        {items.map((item, idx) => (
          <div
            key={item.id}
            onClick={item.onClick}
            className={`pt-2 pb-2 px-2 rounded-xl transition flex items-center justify-between gap-3 text-xs ${
              item.onClick ? 'cursor-pointer' : ''
            } ${
              item.highlight
                ? 'bg-rose-50/60 border border-rose-100'
                : 'hover:bg-slate-50/80'
            }`}
          >
            {/* Rank + Icon + Title */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {item.rank !== undefined && (
                <span className="font-mono text-xs font-bold text-slate-400 w-4 text-center shrink-0">
                  {item.rank}
                </span>
              )}
              {item.icon && (
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    item.iconBg || 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {item.icon}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <span className="font-extrabold text-[#0F172A] block truncate leading-tight">
                  {item.title}
                </span>
                {item.subtitle && (
                  <span className="text-[11px] text-slate-500 block truncate font-medium">
                    {item.subtitle}
                  </span>
                )}
              </div>
            </div>

            {/* Optional columns */}
            <div className="flex items-center gap-4 shrink-0 font-mono text-xs">
              {item.col1 !== undefined && (
                <span className="text-slate-600 font-bold hidden sm:inline">{item.col1}</span>
              )}
              {item.col2 !== undefined && (
                <span className="text-slate-800 font-black">{item.col2}</span>
              )}
              {item.badge}
              {item.actionNode}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
