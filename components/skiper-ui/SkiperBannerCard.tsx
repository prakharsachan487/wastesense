'use client';

import React from 'react';
import Link from 'next/link';

interface SkiperBannerCardProps {
  tag?: string;
  title: string;
  description?: string;
  buttonText: string;
  buttonHref?: string;
  onButtonClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export const SkiperBannerCard: React.FC<SkiperBannerCardProps> = ({
  tag = "DON'T FORGET",
  title,
  description,
  buttonText,
  buttonHref,
  onButtonClick,
  icon,
  className = '',
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-[24px] p-5 sm:p-6 bg-gradient-to-br from-[#003B66] via-[#0066AA] to-[#0088EE] text-white shadow-[0_4px_20px_rgba(0,119,204,0.25)] flex flex-col justify-between ${className}`}
    >
      {/* Background Decorative Rings / Mesh */}
      <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-white/10 blur-xl pointer-events-none" />
      <div className="absolute right-8 top-4 w-20 h-20 rounded-full bg-sky-300/10 blur-lg pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          {tag && (
            <span className="text-[10px] font-extrabold tracking-widest uppercase text-sky-200 block">
              {tag}
            </span>
          )}
          {icon && <div className="text-white/80">{icon}</div>}
        </div>

        <h4 className="text-base sm:text-lg font-black text-white leading-snug tracking-tight max-w-[280px]">
          {title}
        </h4>

        {description && (
          <p className="text-xs text-sky-100/90 mt-1 max-w-[280px] font-medium leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <div className="relative z-10 mt-5 pt-1">
        {buttonHref ? (
          <Link
            href={buttonHref}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white text-[#004A80] hover:bg-slate-100 text-xs font-bold transition shadow-sm active:scale-95"
          >
            {buttonText}
          </Link>
        ) : (
          <button
            type="button"
            onClick={onButtonClick}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white text-[#004A80] hover:bg-slate-100 text-xs font-bold transition shadow-sm active:scale-95"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};
