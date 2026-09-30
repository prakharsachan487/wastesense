'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Apple, 
  Package, 
  BatteryCharging, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface QuizQuestion {
  id: string;
  item: string;
  icon: string;
  correctCategory: 'WET' | 'DRY' | 'E-WASTE';
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    item: 'Used Lithium-Ion Battery',
    icon: '🔋',
    correctCategory: 'E-WASTE',
    explanation: 'Lithium batteries contain toxic heavy metals and pose fire hazards. They must go to specialized E-Waste collection to prevent landfill combustion.',
  },
  {
    id: 'q2',
    item: 'Banana Peel & Vegetable Scraps',
    icon: '🍌',
    correctCategory: 'WET',
    explanation: 'Wet organic waste is 100% biodegradable and is diverted to municipal anaerobic digesters and composting facilities.',
  },
  {
    id: 'q3',
    item: 'Cardboard Delivery Package',
    icon: '📦',
    correctCategory: 'DRY',
    explanation: 'Clean paper and corrugated cardboard are pulped and recycled into new packaging materials.',
  },
  {
    id: 'q4',
    item: 'Old Smartphone Charger Cable',
    icon: '🔌',
    correctCategory: 'E-WASTE',
    explanation: 'Cables contain valuable copper and polymers that require specialized shredding and e-waste recycling.',
  },
  {
    id: 'q5',
    item: 'Plastic Water Bottle (Crushed)',
    icon: '🥤',
    correctCategory: 'DRY',
    explanation: 'PET plastic containers are sorted, sanitized, and extruded into recycled polymer pellets for manufacturing.',
  },
];

export const LandingAwareness: React.FC = () => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'WET' | 'DRY' | 'E-WASTE' | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentQ = QUIZ_QUESTIONS[currentQIndex];

  const handleSelect = (category: 'WET' | 'DRY' | 'E-WASTE') => {
    if (isAnswered) return;
    setSelectedAnswer(category);
    setIsAnswered(true);
    if (category === currentQ.correctCategory) {
      setScore(prev => prev + 10);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCurrentQIndex((prev) => (prev + 1) % QUIZ_QUESTIONS.length);
  };

  const isCorrect = selectedAnswer === currentQ.correctCategory;

  return (
    <section id="awareness" className="py-24 bg-white relative overflow-hidden border-b border-slate-200">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/50 to-white pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Civic Segregation & Education
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] tracking-tight leading-[1.1]">
            Smarter Collection Starts With{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-[#0077CC] to-sky-600 bg-clip-text text-transparent">
              Smarter Disposal.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Clean cities begin at the point of generation. Proper waste segregation stops contamination, protects sanitation workers, and enables true circular economy recycling.
          </p>
        </div>

        {/* 3 Structured Waste Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* CATEGORY 1: WET WASTE */}
          <div className="p-7 rounded-3xl bg-emerald-50/50 border border-emerald-200 shadow-sm flex flex-col justify-between group hover:border-emerald-400 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                  <Apple className="w-6 h-6" />
                </div>
                <span className="font-mono text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  GREEN BIN
                </span>
              </div>

              <h3 className="text-2xl font-black text-[#0F172A]">WET WASTE</h3>
              <p className="text-xs text-slate-600 mt-2 font-medium">
                Organic, biodegradable kitchen and garden materials for composting.
              </p>

              <div className="mt-6 space-y-2 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-emerald-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Food scraps &amp; cooked meal leftovers</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-emerald-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Fruit and vegetable peelings</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-emerald-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Garden leaves, tea leaves, coffee grounds</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-200/80 text-[11px] text-emerald-800 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Diverted to Municipal Bio-Gas &amp; Compost</span>
            </div>
          </div>

          {/* CATEGORY 2: DRY WASTE */}
          <div className="p-7 rounded-3xl bg-sky-50/50 border border-sky-200 shadow-sm flex flex-col justify-between group hover:border-[#0077CC] transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0077CC] text-white flex items-center justify-center shadow-md shadow-[#0077CC]/20 group-hover:scale-105 transition-transform">
                  <Package className="w-6 h-6" />
                </div>
                <span className="font-mono text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-sky-100 text-sky-800 border border-sky-300">
                  BLUE BIN
                </span>
              </div>

              <h3 className="text-2xl font-black text-[#0F172A]">DRY WASTE</h3>
              <p className="text-xs text-slate-600 mt-2 font-medium">
                Recyclable inorganic items that can be processed into new materials.
              </p>

              <div className="mt-6 space-y-2 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-sky-100">
                  <span className="w-2 h-2 rounded-full bg-[#0077CC]" />
                  <span>Clean paper, notebooks &amp; newspapers</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-sky-100">
                  <span className="w-2 h-2 rounded-full bg-[#0077CC]" />
                  <span>Cardboard boxes &amp; shipping cartons</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-sky-100">
                  <span className="w-2 h-2 rounded-full bg-[#0077CC]" />
                  <span>Plastic bottles, drink cans &amp; glassware</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-sky-200/80 text-[11px] text-[#004A80] font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#0077CC]" />
              <span>Diverted to Material Recovery Facilities</span>
            </div>
          </div>

          {/* CATEGORY 3: E-WASTE */}
          <div className="p-7 rounded-3xl bg-rose-50/50 border border-rose-200 shadow-sm flex flex-col justify-between group hover:border-rose-400 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md shadow-rose-600/20 group-hover:scale-105 transition-transform">
                  <BatteryCharging className="w-6 h-6" />
                </div>
                <span className="font-mono text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-300">
                  RED / SPECIAL BIN
                </span>
              </div>

              <h3 className="text-2xl font-black text-[#0F172A]">E-WASTE</h3>
              <p className="text-xs text-slate-600 mt-2 font-medium">
                Hazardous electronic components requiring regulated extraction.
              </p>

              <div className="mt-6 space-y-2 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-rose-100">
                  <span className="w-2 h-2 rounded-full bg-rose-600" />
                  <span>Batteries, powerbanks &amp; dry cells</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-rose-100">
                  <span className="w-2 h-2 rounded-full bg-rose-600" />
                  <span>Old smartphones, chargers &amp; cables</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-rose-100">
                  <span className="w-2 h-2 rounded-full bg-rose-600" />
                  <span>Circuit boards, fluorescent tubes &amp; gadgets</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-rose-200/80 text-[11px] text-rose-800 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-rose-600" />
              <span>Diverted to Certified Hazardous Recyclers</span>
            </div>
          </div>

        </div>

        {/* INTERACTIVE MINI QUIZ: WHERE DOES THIS GO? */}
        <div className="rounded-3xl bg-[#0F172A] text-white border border-slate-800 shadow-2xl p-6 sm:p-10 relative overflow-hidden">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-800 gap-4">
            <div>
              <span className="text-[10px] font-mono text-sky-400 font-bold uppercase tracking-wider block">
                INTERACTIVE SEGREGATION TEST
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                Where Does This Waste Go?
              </h4>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700 font-mono text-xs text-slate-300">
                Score: <strong className="text-emerald-400 font-black">+{score} pts</strong>
              </div>
              <span className="text-xs text-slate-500 font-mono">
                Item {currentQIndex + 1} of {QUIZ_QUESTIONS.length}
              </span>
            </div>
          </div>

          {/* Quiz Question Card */}
          <div className="max-w-2xl mx-auto text-center py-6">
            
            {/* Big Item Presentation */}
            <div className="text-6xl mb-4 animate-bounce">
              {currentQ.icon}
            </div>

            <h5 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-8">
              {currentQ.item}
            </h5>

            {/* 3 Answer Choice Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              
              <button
                onClick={() => handleSelect('WET')}
                disabled={isAnswered}
                className={`py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm border transition-all ${
                  isAnswered
                    ? currentQ.correctCategory === 'WET'
                      ? 'bg-emerald-600 border-emerald-400 text-white'
                      : selectedAnswer === 'WET'
                      ? 'bg-rose-900 border-rose-500 text-rose-200'
                      : 'bg-slate-800 text-slate-500 border-slate-700'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700 hover:border-emerald-500'
                }`}
              >
                Wet Waste
              </button>

              <button
                onClick={() => handleSelect('DRY')}
                disabled={isAnswered}
                className={`py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm border transition-all ${
                  isAnswered
                    ? currentQ.correctCategory === 'DRY'
                      ? 'bg-sky-600 border-sky-400 text-white'
                      : selectedAnswer === 'DRY'
                      ? 'bg-rose-900 border-rose-500 text-rose-200'
                      : 'bg-slate-800 text-slate-500 border-slate-700'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700 hover:border-sky-500'
                }`}
              >
                Dry Waste
              </button>

              <button
                onClick={() => handleSelect('E-WASTE')}
                disabled={isAnswered}
                className={`py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm border transition-all ${
                  isAnswered
                    ? currentQ.correctCategory === 'E-WASTE'
                      ? 'bg-rose-600 border-rose-400 text-white'
                      : selectedAnswer === 'E-WASTE'
                      ? 'bg-rose-900 border-rose-500 text-rose-200'
                      : 'bg-slate-800 text-slate-500 border-slate-700'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700 hover:border-rose-500'
                }`}
              >
                E-Waste
              </button>

            </div>

            {/* Answer Feedback Alert */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className={`p-4 rounded-2xl border text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    isCorrect
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                      : 'bg-rose-950/60 border-rose-500 text-rose-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="font-bold text-xs text-white">
                        {isCorrect ? 'Correct Category!' : `Incorrect — Goes to ${currentQ.correctCategory} Waste!`}
                      </div>
                      <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                        {currentQ.explanation}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleNext}
                    className="px-4 py-2 rounded-xl bg-white text-[#0F172A] font-bold text-xs shadow-md shrink-0 flex items-center gap-1.5 hover:bg-slate-100 transition-colors"
                  >
                    <span>Next Item</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
};
