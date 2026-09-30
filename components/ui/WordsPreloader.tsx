'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORDS = [
  'Sense.',
  'Predict.',
  'Prioritize.',
  'Collect.',
  'WASTESENSE'
];

export const WordsPreloader: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Prevent re-running preloader if already seen in current browser session
    try {
      const alreadySeen = typeof window !== 'undefined' && sessionStorage.getItem('wastesense_preloader_seen') === 'true';
      if (alreadySeen) {
        setLoading(false);
        if (onComplete) onComplete();
        return;
      }
    } catch {
      // In case sessionStorage is blocked
    }

    setLoading(true);
    // Prevent scrolling while preloader is active
    document.body.style.overflow = 'hidden';

    // Interval to cycle words
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev < WORDS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            try {
              sessionStorage.setItem('wastesense_preloader_seen', 'true');
            } catch {}
            document.body.style.overflow = '';
            if (onComplete) onComplete();
          }, 450);
          return prev;
        }
      });
    }, 380);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  // 5 vertical columns for the clean white stairs/shutter exit transition
  const columns = [0, 1, 2, 3, 4];

  if (!mounted || !loading) return null;


  return (
    <AnimatePresence mode="wait">
      {loading && (
        <div className="fixed inset-0 z-[9999] pointer-events-auto flex items-center justify-center select-none bg-white">
          
          {/* Staggered Vertical White Shutter Columns (Sliding Up on Exit) */}
          <div className="absolute inset-0 flex pointer-events-none">
            {columns.map((col) => (
              <motion.div
                key={col}
                className="flex-1 bg-white border-r border-slate-100/80 last:border-r-0 h-full shadow-2xl"
                exit={{
                  y: '-100%',
                  transition: {
                    duration: 0.8,
                    delay: col * 0.06,
                    ease: [0.76, 0, 0.24, 1],
                  },
                }}
              />
            ))}
          </div>

          {/* Centered Word Presentation */}
          <div className="relative z-10 text-center px-4">
            
            {/* Live Indicator Pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-sky-200 text-[11px] font-mono font-bold text-[#0077CC] mb-8 uppercase tracking-widest shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#0077CC] animate-ping" />
              <span>WasteSense Intelligence OS</span>
            </motion.div>

            {/* Word Animation */}
            <div className="h-20 sm:h-24 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center justify-center gap-3"
                >
                  <span className="w-3 h-3 rounded-full bg-[#0077CC] shadow-sm shadow-[#0077CC]/40" />
                  <span className={`text-4xl sm:text-6xl md:text-7xl font-black tracking-tight ${
                    index === WORDS.length - 1
                      ? 'bg-gradient-to-r from-[#004A80] via-[#0077CC] to-[#0EA5E9] bg-clip-text text-transparent'
                      : 'text-[#0F172A]'
                  }`}>
                    {WORDS[index]}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Subtle Progress Bar */}
            <motion.div
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="w-48 sm:w-64 h-1.5 rounded-full bg-slate-100 border border-slate-200/80 mx-auto mt-8 overflow-hidden shadow-inner p-0.5"
            >
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${((index + 1) / WORDS.length) * 100}%` }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-[#0077CC] via-[#0EA5E9] to-sky-400 rounded-full"
              />
            </motion.div>

            <motion.div
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="font-mono text-[10px] text-slate-400 font-semibold uppercase tracking-widest mt-3"
            >
              Initializing Autonomous Telemetry Nodes
            </motion.div>

          </div>

        </div>
      )}
    </AnimatePresence>
  );
};
