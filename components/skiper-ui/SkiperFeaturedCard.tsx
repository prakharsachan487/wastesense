'use client';

import React from 'react';
import Link from 'next/link';

interface EntityBlock {
  title: string;
  subtitle?: string;
  badge?: string;
  icon?: React.ReactNode;
  iconBg?: string;
}

interface SkiperFeaturedCardProps {
  title: string;
  actionText?: string;
  actionHref?: string;
  onActionClick?: () => void;
  pillBadgeText?: string;
  pillBadgeIcon?: React.ReactNode;
  leftEntity: EntityBlock;
  rightEntity: EntityBlock;
  connectorText?: string;
  bottomBarText?: string;
  bottomBarValue?: string;
  progressPercent?: number;
  actionButtonText?: string;
  onActionButtonClick?: () => void;
  className?: string;
}

export const SkiperFeaturedCard: React.FC<SkiperFeaturedCardProps> = ({
  title,
  actionText,
  actionHref,
  onActionClick,
  pillBadgeText,
  pillBadgeIcon,
  leftEntity,
  rightEntity,
  connectorText = '⚡',
  bottomBarText,
  bottomBarValue,
  progressPercent,
  actionButtonText,
  onActionButtonClick,
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

      {/* Center Metadata Pill */}
      {pillBadgeText && (
        <div className="flex justify-center mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-semibold">
            {pillBadgeIcon}
            <span>{pillBadgeText}</span>
          </div>
        </div>
      )}

      {/* Two Entities with Connector */}
      <div className="flex items-center justify-around gap-2 my-2 py-2 px-3 rounded-2xl bg-slate-50/70 border border-slate-100">
        {/* Left Entity */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
              leftEntity.iconBg || 'bg-white text-[#0077CC] border border-slate-200'
            }`}
          >
            {leftEntity.icon}
          </div>
          <div className="min-w-0">
            <span className="font-extrabold text-[#0F172A] text-xs sm:text-sm block truncate">
              {leftEntity.title}
            </span>
            {leftEntity.subtitle && (
              <span className="text-[10px] text-slate-500 font-medium block truncate">
                {leftEntity.subtitle}
              </span>
            )}
          </div>
        </div>

        {/* Connector Badge */}
        <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
          {connectorText}
        </div>

        {/* Right Entity */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
              rightEntity.iconBg || 'bg-white text-emerald-600 border border-slate-200'
            }`}
          >
            {rightEntity.icon}
          </div>
          <div className="min-w-0">
            <span className="font-extrabold text-[#0F172A] text-xs sm:text-sm block truncate">
              {rightEntity.title}
            </span>
            {rightEntity.subtitle && (
              <span className="text-[10px] text-slate-500 font-medium block truncate">
                {rightEntity.subtitle}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Optional Progress or Action Bar */}
      {(bottomBarText || progressPercent !== undefined || actionButtonText) && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            {bottomBarText && (
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1">
                <span>{bottomBarText}</span>
                {bottomBarValue && <span className="font-bold">{bottomBarValue}</span>}
              </div>
            )}
            {progressPercent !== undefined && (
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    progressPercent >= 85
                      ? 'bg-rose-500'
                      : progressPercent >= 65
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(progressPercent, 100)}%` }}
                />
              </div>
            )}
          </div>

          {actionButtonText && onActionButtonClick && (
            <button
              type="button"
              onClick={onActionButtonClick}
              className="shrink-0 px-3.5 py-1.5 rounded-full bg-[#0077CC] hover:bg-[#004A80] text-white text-xs font-bold shadow-xs transition active:scale-95"
            >
              {actionButtonText}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
