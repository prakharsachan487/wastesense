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
  ShieldCheck,
  Award,
  TreePine,
  Leaf,
  Clock,
  Flame,
  Users,
  Check,
  ChevronRight
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

// Decomposition Clock Data
interface DecompositionItem {
  id: string;
  name: string;
  icon: string;
  duration: string;
  years: number;
  tag: string;
  tagColor: string;
  barColor: string;
  percentage: number;
  description: string;
  benefit: string;
}

const DECOMPOSITION_ITEMS: DecompositionItem[] = [
  {
    id: 'banana',
    name: 'Banana Peel & Organic Scraps',
    icon: '🍌',
    duration: '2 to 4 Weeks',
    years: 0.05,
    tag: 'ORGANIC BIO-WASTE',
    tagColor: 'text-emerald-700 bg-emerald-50 border-emerald-300',
    barColor: 'bg-emerald-500',
    percentage: 5,
    description: 'Decomposes completely in anaerobic digesters or home compost, converting into nutrient-rich organic manure in less than a month.',
    benefit: 'Produces clean municipal bio-CNG gas & zero landfill burden.'
  },
  {
    id: 'paper',
    name: 'Cardboard Packaging Box',
    icon: '📦',
    duration: '2 Months',
    years: 0.16,
    tag: 'RECYCLABLE FIBER',
    tagColor: 'text-sky-700 bg-sky-50 border-sky-300',
    barColor: 'bg-sky-500',
    percentage: 15,
    description: 'When kept dry and uncontaminated, corrugated cardboard is repulped and recycled up to 7 times into new packaging cartons.',
    benefit: 'Recycling 1 ton of cardboard saves 17 mature trees & 7,000 gallons of water.'
  },
  {
    id: 'can',
    name: 'Aluminum Beverage Can',
    icon: '🥫',
    duration: '200 to 250 Years',
    years: 200,
    tag: 'INFINITELY RECYCLABLE',
    tagColor: 'text-amber-700 bg-amber-50 border-amber-300',
    barColor: 'bg-amber-500',
    percentage: 55,
    description: 'Takes over two centuries to corrode in landfills, yet aluminum melts down with 95% less energy than raw bauxite mining.',
    benefit: 'Can be remelted and back on store shelves as a new can in just 60 days.'
  },
  {
    id: 'plastic',
    name: 'Plastic Water Bottle (PET)',
    icon: '🥤',
    duration: '450 Years',
    years: 450,
    tag: 'PERSISTENT POLYMER',
    tagColor: 'text-rose-700 bg-rose-50 border-rose-300',
    barColor: 'bg-rose-500',
    percentage: 85,
    description: 'Never fully biodegrades. It fractures into microplastics that poison urban soil, municipal groundwater tables, and waterways.',
    benefit: 'Recycling 1 ton of PET saves 3.8 barrels of oil and prevents microplastic leakage.'
  },
  {
    id: 'glass',
    name: 'Glass Container / Jar',
    icon: '🍾',
    duration: '1,000,000+ Years',
    years: 1000000,
    tag: 'PERMANENT SILICA',
    tagColor: 'text-purple-700 bg-purple-50 border-purple-300',
    barColor: 'bg-purple-500',
    percentage: 100,
    description: 'Glass made from natural silica minerals will never degrade in landfills, but it can be recycled endlessly with zero loss in quality.',
    benefit: '1 ton of recycled glass saves 1.2 tons of virgin limestone and sand.'
  },
  {
    id: 'battery',
    name: 'Lithium Battery Cell',
    icon: '🔋',
    duration: '100+ Years (Toxic Threat)',
    years: 100,
    tag: 'HAZARDOUS E-WASTE',
    tagColor: 'text-red-700 bg-red-50 border-red-300',
    barColor: 'bg-red-600',
    percentage: 70,
    description: 'Toxic cobalt and lithium leach into water catchments and cause uncontrollable chemical landfill fires when crushed by compactors.',
    benefit: 'Certified recovery reclaims critical rare metals and prevents urban fires.'
  }
];

export const LandingAwareness: React.FC = () => {
  // Quiz State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'WET' | 'DRY' | 'E-WASTE' | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  // Household Eco-Karma Calculator State
  const [householdSize, setHouseholdSize] = useState<number>(4);
  const [habitCompost, setHabitCompost] = useState(true);
  const [habitRecycleDry, setHabitRecycleDry] = useState(true);
  const [habitEWaste, setHabitEWaste] = useState(true);

  // Decomposition Timeline State
  const [activeDecompId, setActiveDecompId] = useState<string>('plastic');
  const activeDecompItem = DECOMPOSITION_ITEMS.find(d => d.id === activeDecompId) || DECOMPOSITION_ITEMS[3];

  const currentQ = QUIZ_QUESTIONS[currentQIndex];

  // Answer selection handler
  const handleSelect = (category: 'WET' | 'DRY' | 'E-WASTE') => {
    if (isAnswered) return;
    setSelectedAnswer(category);
    setIsAnswered(true);
    if (category === currentQ.correctCategory) {
      setScore(prev => prev + 10);
      setCorrectCount(prev => prev + 1);
    }
  };

  // Next question or Final Result trigger
  const handleNext = () => {
    if (currentQIndex < QUIZ_QUESTIONS.length - 1) {
      setSelectedAnswer(null);
      setIsAnswered(false);
      setCurrentQIndex(prev => prev + 1);
    } else {
      setIsQuizComplete(true);
    }
  };

  // Retake Quiz Handler
  const handleRetakeQuiz = () => {
    setCurrentQIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setCorrectCount(0);
    setIsQuizComplete(false);
  };

  const isCorrect = selectedAnswer === currentQ.correctCategory;

  // Household Calculator math:
  const baseAnnualWaste = householdSize * 135; // avg kg per year
  const compostDiverted = habitCompost ? baseAnnualWaste * 0.48 : 0;
  const dryDiverted = habitRecycleDry ? baseAnnualWaste * 0.36 : 0;
  const eWasteDiverted = habitEWaste ? baseAnnualWaste * 0.06 : 0;
  const totalDivertedKg = Math.round(compostDiverted + dryDiverted + eWasteDiverted);
  const co2PreventedKg = Math.round(totalDivertedKg * 0.44);
  const treesEquivalent = Math.max(1, Math.round(totalDivertedKg / 48));
  const ecoKarmaPoints = Math.round(totalDivertedKg * 1.8);

  const karmaTier = 
    totalDivertedKg >= 450 ? 'GOLD CIVIC CHAMPION' :
    totalDivertedKg >= 250 ? 'SILVER RECYCLER' : 'BRONZE RESIDENT';

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
        <div id="waste-categories" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
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

        {/* 1. INTERACTIVE MINI QUIZ: WHERE DOES THIS GO? (WITH FINAL RESULT & COMPLIMENT FIX) */}
        <div className="rounded-3xl bg-[#0F172A] text-white border border-slate-800 shadow-2xl p-6 sm:p-10 relative overflow-hidden mb-16">
          
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
              {!isQuizComplete && (
                <span className="text-xs text-slate-500 font-mono">
                  Item {currentQIndex + 1} of {QUIZ_QUESTIONS.length}
                </span>
              )}
            </div>
          </div>

          {/* ACTIVE QUIZ VIEW */}
          {!isQuizComplete ? (
            <div className="max-w-2xl mx-auto text-center py-4">
              
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
                      <span>
                        {currentQIndex === QUIZ_QUESTIONS.length - 1 ? 'See Final Score' : 'Next Item'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          ) : (
            /* FINAL SCORE & EVALUATION SCREEN */
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto text-center py-6 space-y-6"
            >
              {/* Trophy / Evaluation Badge */}
              <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-4xl shadow-lg bg-gradient-to-br from-amber-400/20 to-emerald-400/20 border border-amber-400/40">
                {correctCount >= 4 ? '🏆' : correctCount === 3 ? '🌟' : '📚'}
              </div>

              <div>
                <span className={`inline-block font-mono text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 border ${
                  correctCount >= 4 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : correctCount === 3 
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                }`}>
                  {correctCount >= 4 ? 'CIVIC MASTER SEGREGATOR' : correctCount === 3 ? 'ECO APPRENTICE' : 'NEEDS PRACTICE'}
                </span>

                <h5 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Your Score: <span className="text-emerald-400">{score}</span> / 50 pts
                </h5>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  {correctCount} of {QUIZ_QUESTIONS.length} items correctly segregated
                </p>
              </div>

              {/* Contextual Evaluation Compliment */}
              <div className={`p-5 rounded-2xl border text-sm text-left max-w-xl mx-auto ${
                correctCount >= 4 
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' 
                  : correctCount === 3 
                  ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
              }`}>
                <div className="font-extrabold text-white text-base mb-1.5 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>
                    {correctCount >= 4 
                      ? 'Outstanding Segregation Instincts!' 
                      : correctCount === 3 
                      ? 'Good Effort! You Have Strong Fundamentals.' 
                      : 'Great Start! Time to Level Up Your Knowledge.'}
                  </span>
                </div>
                <p className="text-xs leading-relaxed opacity-90">
                  {correctCount >= 4 
                    ? 'Excellent job! You correctly identified wet organic, dry recyclable, and hazardous e-waste streams. Your habits directly reduce landfill overload and safeguard sanitation workers from toxic burns.' 
                    : correctCount === 3 
                    ? 'You have solid control of regular daily household waste. Keep an eye on hazardous e-waste items like cables and batteries to achieve 100% contamination-free segregation.' 
                    : 'Improper segregation is the #1 reason why 65% of recyclables end up in landfills. Take a quick moment to review the color-coded bin guide above to learn where daily items belong!'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleRetakeQuiz}
                  className="px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-600 transition flex items-center gap-2 shadow-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Test</span>
                </button>

                {correctCount < 3 ? (
                  <button
                    onClick={() => {
                      const el = document.getElementById('waste-categories');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 rounded-full bg-[#0077CC] hover:bg-[#004A80] text-white font-bold text-xs transition flex items-center gap-1.5 shadow-md"
                  >
                    <span>Learn More in Category Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      const el = document.getElementById('eco-calculator');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-md"
                  >
                    <span>Calculate Household Eco-Karma 👇</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </motion.div>
          )}

        </div>

        {/* 2. HOUSEHOLD ECO-KARMA CALCULATOR & DECOMPOSITION TIMELINE */}
        <div id="eco-calculator" className="space-y-12">
          
          {/* Section Divider Header */}
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-mono text-[#0077CC] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-sky-50 border border-sky-200">
              CITIZEN IMPACT SIMULATOR
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight mt-2">
              Calculate Your Household Eco-Karma
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium">
              See the exact annual landfill volume diverted, CO₂ emissions prevented, and civic badges earned by your daily segregation choices.
            </p>
          </div>

          {/* Calculator Bento Card */}
          <div className="rounded-[28px] bg-[#F8FAFC] border border-slate-200/90 shadow-md p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Controls (Household Config) - 6 cols */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* 1. Household Size Picker */}
              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 block mb-2.5 flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#0077CC]" />
                  <span>1. Family / Household Size</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 4, 6].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setHouseholdSize(num)}
                      className={`py-2.5 rounded-2xl font-bold text-xs border transition-all ${
                        householdSize === num
                          ? 'bg-[#0077CC] text-white border-[#0077CC] shadow-sm scale-102'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {num} {num === 1 ? 'Person' : 'People'}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Daily Segregation Habits Toggles */}
              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 block mb-2.5 flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                  <span>2. Your Segregation Habits</span>
                </label>
                
                <div className="space-y-2.5">
                  {/* Wet Waste Composting */}
                  <div 
                    onClick={() => setHabitCompost(!habitCompost)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      habitCompost
                        ? 'bg-emerald-50/70 border-emerald-300 shadow-xs'
                        : 'bg-white border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm ${
                        habitCompost ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'
                      }`}>
                        {habitCompost ? <Check className="w-4 h-4" /> : '—'}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#0F172A] block">Segregate Wet Organic Waste</span>
                        <span className="text-[10px] text-slate-500">Bio-gas digestion &amp; kitchen composting</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-700">+48%</span>
                  </div>

                  {/* Dry Waste Recycling */}
                  <div 
                    onClick={() => setHabitRecycleDry(!habitRecycleDry)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      habitRecycleDry
                        ? 'bg-sky-50/70 border-sky-300 shadow-xs'
                        : 'bg-white border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm ${
                        habitRecycleDry ? 'bg-[#0077CC] text-white' : 'bg-slate-100 text-slate-400'
                      }`}>
                        {habitRecycleDry ? <Check className="w-4 h-4" /> : '—'}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#0F172A] block">Separate Clean Dry Recyclables</span>
                        <span className="text-[10px] text-slate-500">Cardboard, bottles, paper &amp; metals</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#0077CC]">+36%</span>
                  </div>

                  {/* E-Waste Collection */}
                  <div 
                    onClick={() => setHabitEWaste(!habitEWaste)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      habitEWaste
                        ? 'bg-rose-50/70 border-rose-300 shadow-xs'
                        : 'bg-white border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm ${
                        habitEWaste ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-400'
                      }`}>
                        {habitEWaste ? <Check className="w-4 h-4" /> : '—'}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#0F172A] block">Doorstep E-Waste Handover</span>
                        <span className="text-[10px] text-slate-500">Batteries, gadgets &amp; hazardous electronics</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-rose-700">+6%</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Results Display (Real-time Live Calculation) - 6 cols */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-lg space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-slate-400 block">
                    PROJECTED ANNUAL IMPACT
                  </span>
                  <div className="text-xl sm:text-2xl font-black text-[#0F172A] mt-0.5">
                    Your Household Footprint
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {karmaTier}
                </span>
              </div>

              {/* Big Metrics Grid */}
              <div className="grid grid-cols-2 gap-3.5">
                
                {/* Landfill Waste Diverted */}
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
                  <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block">
                    Waste Diverted
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-900 font-mono mt-1">
                    {totalDivertedKg} <span className="text-xs font-normal text-emerald-700">kg/yr</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-medium block mt-0.5">
                    Saved from overflowing landfills
                  </span>
                </div>

                {/* CO2 Emissions Prevented */}
                <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200">
                  <span className="text-[10px] uppercase font-bold text-[#0077CC] tracking-wider block">
                    CO₂ Prevented
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-[#004A80] font-mono mt-1">
                    {co2PreventedKg} <span className="text-xs font-normal text-sky-600">kg/yr</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                    Methane &amp; greenhouse reduction
                  </span>
                </div>

                {/* Equivalent Trees Saved */}
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
                  <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider block flex items-center gap-1">
                    <TreePine className="w-3.5 h-3.5 text-amber-600" />
                    <span>Trees Equivalent</span>
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-amber-900 font-mono mt-1">
                    {treesEquivalent} <span className="text-xs font-normal text-amber-700">Trees</span>
                  </div>
                  <span className="text-[10px] text-amber-800 font-medium block mt-0.5">
                    Oxygen &amp; carbon offset parity
                  </span>
                </div>

                {/* Civic Karma Score */}
                <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200">
                  <span className="text-[10px] uppercase font-bold text-purple-800 tracking-wider block flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-purple-600" />
                    <span>Eco Karma</span>
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-purple-900 font-mono mt-1">
                    +{ecoKarmaPoints} <span className="text-xs font-normal text-purple-600">pts</span>
                  </div>
                  <span className="text-[10px] text-purple-800 font-medium block mt-0.5">
                    Redeemable municipal credits
                  </span>
                </div>

              </div>

              {/* Civic Clean City Message */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#0077CC] shrink-0" />
                <span>
                  <strong>90% of household waste</strong> can be repurposed when sorted at source. WasteSense auto-dispatches clean streams directly to treatment centers.
                </span>
              </div>

            </div>

          </div>

          {/* 3. INTERACTIVE DECOMPOSITION LIFETIME CLOCK */}
          <div className="rounded-[28px] bg-white border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-8">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div>
                <span className="text-[10px] font-mono text-rose-600 font-extrabold uppercase tracking-widest block">
                  WASTE LIFETIME CLOCK
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-[#0F172A] mt-0.5">
                  How Long Does It Survive in Landfills?
                </h4>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Tap an item to compare decomposition duration &amp; recycling benefits
              </span>
            </div>

            {/* Item Selector Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {DECOMPOSITION_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveDecompId(item.id)}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    activeDecompId === item.id
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-102'
                      : 'bg-[#F8FAFC] text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-[11px] font-bold truncate max-w-full leading-tight">
                    {item.name.split(' ')[0]}
                  </span>
                  <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    activeDecompId === item.id ? 'bg-slate-800 text-slate-200' : 'text-slate-500'
                  }`}>
                    {item.duration.split(' ')[0]} {item.duration.split(' ')[1]}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Item Deep-Dive Card */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              <div className="md:col-span-4 flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-4xl shrink-0">
                  {activeDecompItem.icon}
                </div>
                <div>
                  <span className={`text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded-full border ${activeDecompItem.tagColor}`}>
                    {activeDecompItem.tag}
                  </span>
                  <h5 className="text-base sm:text-lg font-black text-[#0F172A] mt-1">
                    {activeDecompItem.name}
                  </h5>
                  <div className="text-xl sm:text-2xl font-black font-mono text-rose-600 mt-0.5">
                    {activeDecompItem.duration}
                  </div>
                </div>
              </div>

              <div className="md:col-span-8 space-y-3">
                {/* Visual Decomposition Bar */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1">
                    <span>Persistence in Environment</span>
                    <span className="font-mono text-slate-800">{activeDecompItem.duration}</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                    <motion.div
                      key={activeDecompItem.id}
                      initial={{ width: '0%' }}
                      animate={{ width: `${activeDecompItem.percentage}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className={`h-full rounded-full ${activeDecompItem.barColor}`}
                    />
                  </div>
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {activeDecompItem.description}
                </p>

                <div className="pt-2 border-t border-slate-200 flex items-center gap-2 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Civic Impact: {activeDecompItem.benefit}</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
