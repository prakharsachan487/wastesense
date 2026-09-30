'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderWord {
  title: string;
  subtitle: string;
}

const PRELOADER_STAGES: PreloaderWord[] = [
  { title: 'Sense.', subtitle: 'IoT Ultrasonic Telemetry & Fill Levels' },
  { title: 'Predict.', subtitle: 'Real-time AI Overflow Forecasting' },
  { title: 'Prioritize.', subtitle: 'Automated Municipal Incident Triage' },
  { title: 'Collect.', subtitle: 'Dynamic Fleet Routing & Driver Dispatch' },
  { title: 'WASTESENSE', subtitle: 'Autonomous Smart Waste Intelligence Platform' }
];

export const WordsPreloader: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const finishPreloader = () => {
    setIsActive(false);
    try {
      sessionStorage.setItem('wastesense_preloader_seen', 'true');
    } catch {}
  };

  useEffect(() => {
    setMounted(true);

    // Check if preloader was already seen in current browser session
    try {
      const alreadySeen = typeof window !== 'undefined' && sessionStorage.getItem('wastesense_preloader_seen') === 'true';
      if (alreadySeen) {
        setIsActive(false);
        if (onComplete) onComplete();
        return;
      }
    } catch {
      // In case storage is restricted
    }

    setIsActive(true);
    document.body.style.overflow = 'hidden';

    // Elegant, comfortable pacing:
    // Stages 0-3: 750ms each (giving ample time to absorb the word and subtitle)
    // Stage 4 (Brand name): 1100ms
    const scheduleNext = (currentIdx: number) => {
      const delay = currentIdx === PRELOADER_STAGES.length - 1 ? 1150 : 780;
      timeoutRef.current = setTimeout(() => {
        if (currentIdx < PRELOADER_STAGES.length - 1) {
          setIndex(currentIdx + 1);
          scheduleNext(currentIdx + 1);
        } else {
          // Trigger exit animation
          finishPreloader();
        }
      }, delay);
    };

    scheduleNext(0);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  // 5 vertical architectural shutter panels for a cinematic entrance
  const shutterColumns = [0, 1, 2, 3, 4];

  // Keep AnimatePresence alive; only return null if component hasn't mounted in browser
  if (!mounted) return null;

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = '';
        if (onComplete) onComplete();
      }}
    >
      {isActive && (
        <motion.div
          key="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{
            transition: { staggerChildren: 0.06 }
          }}
          className="fixed inset-0 z-[9999] pointer-events-auto flex items-center justify-center select-none overflow-hidden"
        >
          {/* 5 Staggered Architectural Shutter Panels (Slide Up seamlessly to reveal landing page) */}
          <div className="absolute inset-0 flex pointer-events-none z-0">
            {shutterColumns.map((col) => (
              <motion.div
                key={col}
                className="flex-1 bg-white border-r border-slate-100/60 last:border-r-0 h-full shadow-[0_30px_60px_rgba(0,0,0,0.06)]"
                initial={{ y: 0 }}
                exit={{
                  y: '-100%',
                  transition: {
                    duration: 0.85,
                    delay: 0.15 + col * 0.06,
                    ease: [0.76, 0, 0.24, 1],
                  },
                }}
              />
            ))}
          </div>

          {/* Skip Button */}
          <motion.button
            type="button"
            onClick={finishPreloader}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="absolute top-6 right-6 z-20 px-3 py-1.5 rounded-full bg-slate-50/80 hover:bg-slate-100 border border-slate-200/80 text-[11px] font-mono font-medium text-slate-500 hover:text-slate-800 transition-colors tracking-wider uppercase cursor-pointer"
          >
            Skip ✕
          </motion.button>

          {/* Central Animated Content */}
          <motion.div
            key="preloader-content"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              y: -32,
              filter: 'blur(8px)',
              transition: { duration: 0.35, ease: [0.32, 0, 0.67, 0] }
            }}
            className="relative z-10 text-center px-4 max-w-lg mx-auto"
          >
            {/* Top Municipal OS Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-sky-200/80 text-[11px] font-mono font-bold text-[#0077CC] mb-8 uppercase tracking-widest shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#0077CC] animate-ping" />
              <span>WasteSense Municipal OS</span>
            </div>

            {/* Word & Subtitle Presentation */}
            <div className="h-28 sm:h-32 flex flex-col items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 22, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -18, filter: 'blur(4px)' }}
                  transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center justify-center gap-2"
                >
                  <div className="flex items-center justify-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0077CC] shadow-md shadow-[#0077CC]/40 animate-pulse" />
                    <span
                      className={`text-4xl sm:text-6xl md:text-7xl font-black tracking-tight ${
                        index === PRELOADER_STAGES.length - 1
                          ? 'bg-gradient-to-r from-[#004A80] via-[#0077CC] to-[#0EA5E9] bg-clip-text text-transparent'
                          : 'text-[#0F172A]'
                      }`}
                    >
                      {PRELOADER_STAGES[index].title}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-slate-500 font-mono tracking-wide">
                    {PRELOADER_STAGES[index].subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Smooth Progress Bar */}
            <div className="w-56 sm:w-72 h-1.5 rounded-full bg-slate-100 border border-slate-200/80 mx-auto mt-6 overflow-hidden p-0.5 shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-[#004A80] via-[#0077CC] to-sky-400 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${((index + 1) / PRELOADER_STAGES.length) * 100}%` }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {/* Bottom Status Feed */}
            <div className="font-mono text-[10px] text-slate-400 font-semibold uppercase tracking-widest mt-3.5 flex items-center justify-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>
                {index === PRELOADER_STAGES.length - 1
                  ? 'All Systems Ready • Launching Operations'
                  : 'Synchronizing Citywide Telemetry Grid'}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
