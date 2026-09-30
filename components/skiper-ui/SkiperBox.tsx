'use client';

import React from 'react';
import Link from 'next/link';

interface SkiperBoxProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  actionText?: string;
  actionHref?: string;
  onActionClick?: () => void;
  actionNode?: React.ReactNode;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  noPadding?: boolean;
}

export const SkiperBox: React.FC<SkiperBoxProps> = ({
  title,
  subtitle,
  actionText,
  actionHref,
  onActionClick,
  actionNode,
  icon,
  children,
  className = '',
  headerClassName = '',
  noPadding = false,
}) => {
  const hasHeader = title || subtitle || actionText || actionNode || icon;

  return (
    <div
      className={`bg-white/95 rounded-[24px] border border-slate-200/90 shadow-[0_2px_14px_rgba(15,23,42,0.04)] transition-all duration-200 hover:shadow-[0_6px_22px_rgba(15,23,42,0.07)] ${
        noPadding ? 'p-0' : 'p-5 sm:p-6'
      } ${className}`}
    >
      {hasHeader && (
        <div
          className={`flex items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100 ${headerClassName}`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {icon && (
              <div className="w-8 h-8 rounded-xl bg-slate-100/90 text-slate-700 flex items-center justify-center shrink-0">
                {icon}
              </div>
            )}
            <div className="min-w-0">
              {title && (
                <div className="text-sm sm:text-base font-extrabold text-[#0F172A] tracking-tight truncate">
                  {title}
                </div>
              )}
              {subtitle && (
                <div className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                  {subtitle}
                </div>
              )}
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            {actionNode}
            {actionText && actionHref && (
              <Link
                href={actionHref}
                className="text-xs font-semibold text-[#0077CC] hover:text-[#004A80] hover:underline flex items-center gap-1 transition"
              >
                <span>{actionText}</span>
              </Link>
            )}
            {actionText && !actionHref && onActionClick && (
              <button
                type="button"
                onClick={onActionClick}
                className="text-xs font-semibold text-[#0077CC] hover:text-[#004A80] hover:underline flex items-center gap-1 transition"
              >
                <span>{actionText}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {children}
    </div>
  );
};
