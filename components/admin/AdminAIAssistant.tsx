'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Bot, CheckCircle2, ArrowRight, CornerDownLeft, RefreshCw, Zap } from 'lucide-react';
import { useWasteSense } from '../../context/WasteSenseContext';

interface AIResponse {
  query: string;
  summary: string;
  bins: { id: string; fill: number; priority: number; status: string; note: string }[];
  recommendation: string;
  actionText?: string;
  actionTargetBin?: string;
}

const PRESET_RESPONSES: Record<string, AIResponse> = {
  'Which bins need collection first?': {
    query: 'Which bins need collection first?',
    summary: 'WasteSense Multi-Factor AI Engine evaluated 20 sensor nodes. 3 nodes exceed critical triage thresholds:',
    bins: [
      { id: 'B-102', fill: 95, priority: 95, status: 'CRITICAL', note: 'Central Market &bull; 2 citizen complaints &bull; 4.2h since pickup' },
      { id: 'B-105', fill: 92, priority: 93, status: 'CRITICAL', note: 'Tech Park Food Court &bull; High organic spoilage risk' },
      { id: 'B-106', fill: 90, priority: 90, status: 'CRITICAL', note: 'Sports Stadium Gate 4 &bull; Event spillage surge' },
    ],
    recommendation: 'Immediate dispatch recommended: Deploy Truck #04 (Rahul Sharma) to B-102 immediately. Remaining SLA buffer: 35 minutes.',
    actionText: 'Dispatch Truck #04 to B-102',
    actionTargetBin: 'B-102'
  },
  'Why is B-102 flagged critical?': {
    query: 'Why is B-102 flagged critical?',
    summary: 'Decision Rationale for Node B-102 (Central Market, Sector 12):',
    bins: [
      { id: 'B-102', fill: 95, priority: 95, status: 'CRITICAL', note: 'Ultrasonic sensor: 95% full | Load cell: 8.4kg | Thermistor: 29.0°C' }
    ],
    recommendation: 'Triangulated with 2 verified citizen reports (WS-2026-1042) within 15m radius. Commercial pedestrian traffic peak underway. Overflow spill imminent within 25 minutes.',
    actionText: 'Assign Priority Dispatch',
    actionTargetBin: 'B-102'
  },
  'What is the optimal route for Truck #04?': {
    query: 'What is the optimal route for Truck #04?',
    summary: 'TSP-Optimized Dynamic Route for Unit Truck #04 (Driver: Rahul Sharma):',
    bins: [
      { id: 'Waypoint 1: B-102', fill: 95, priority: 95, status: 'CRITICAL', note: 'ETA 8 mins &bull; High Street' },
      { id: 'Waypoint 2: B-110', fill: 86, priority: 86, status: 'HIGH', note: 'ETA 22 mins &bull; Night Bazaar' },
      { id: 'Waypoint 3: B-087', fill: 84, priority: 84, status: 'HIGH', note: 'ETA 38 mins &bull; Metro Gate 3' },
    ],
    recommendation: 'Route avoids Ring Road congestion. Fuel consumption reduced by 22.4% vs static sector patrol. Estimated total run time: 48 mins.',
    actionText: 'Push Route to Driver App',
    actionTargetBin: 'B-102'
  }
};

export const AdminAIAssistant: React.FC = () => {
  const { createTask, workers, vehicles, tasks } = useWasteSense();
  const [inputValue, setInputValue] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResponse, setCurrentResponse] = useState<AIResponse | null>(
    PRESET_RESPONSES['Which bins need collection first?']
  );
  const [actionDone, setActionDone] = useState(false);

  const handleAsk = (queryText: string) => {
    const trimmed = queryText.trim();
    if (!trimmed) return;
    setIsAnalyzing(true);
    setActionDone(false);

    setTimeout(() => {
      // Find matching preset or default
      const matched = PRESET_RESPONSES[trimmed] || {
        query: trimmed,
        summary: `WasteSense AI analyzed city telemetry in response to: "${trimmed}"`,
        bins: [
          { id: 'B-102', fill: 95, priority: 95, status: 'CRITICAL', note: 'Highest urgency node in sector' },
          { id: 'B-109', fill: 88, priority: 88, status: 'HIGH', note: 'Transit hub container approaching threshold' }
        ],
        recommendation: 'Autonomous triage algorithm suggests prioritizing commercial sector clearance before evening peak traffic.',
        actionText: 'Execute Optimal Dispatch',
        actionTargetBin: 'B-102'
      };
      setCurrentResponse(matched);
      setIsAnalyzing(false);
    }, 450);
  };

  const handleAction = () => {
    if (!currentResponse?.actionTargetBin) return;
    const existing = tasks.find(t => t.bin_id === currentResponse.actionTargetBin && t.status !== 'Completed');
    if (!existing) {
      createTask(currentResponse.actionTargetBin, workers[0]?.id || 'w-1', vehicles[0]?.id || 'v-1', 'CRITICAL');
    }
    setActionDone(true);
    setTimeout(() => setActionDone(false), 4000);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#0077CC] to-[#0EA5E9] flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-1.5">
              <span>WasteSense AI Decision Copilot</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                ACTIVE INFERENCE
              </span>
            </h3>
            <p className="text-[11px] text-slate-500">Natural language operational query & dynamic priority synthesis</p>
          </div>
        </div>

        <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">Model: UrbanTriage-v4</span>
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] font-semibold text-slate-400 mr-1">Try:</span>
        {Object.keys(PRESET_RESPONSES).map((prompt) => (
          <button
            key={prompt}
            onClick={() => {
              setInputValue(prompt);
              handleAsk(prompt);
            }}
            className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-[#F0F9FF] hover:text-[#0077CC] hover:border-[#BAE6FD] border border-slate-200 text-slate-600 transition"
          >
            &ldquo;{prompt}&rdquo;
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleAsk(inputValue);
        }}
        className="relative flex items-center"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask WasteSense AI... (e.g. Which bins need collection first?)"
          className="w-full pl-3.5 pr-24 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#0077CC] focus:ring-2 focus:ring-[#0077CC]/20 outline-none text-xs text-[#0F172A] transition"
        />
        <button
          type="submit"
          disabled={isAnalyzing || !inputValue.trim()}
          className="absolute right-1.5 px-3 py-1.5 rounded-lg bg-[#0077CC] hover:bg-[#004A80] disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1 transition shadow-xs"
        >
          {isAnalyzing ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <>
              <span>Ask AI</span>
              <CornerDownLeft className="w-3 h-3" />
            </>
          )}
        </button>
      </form>

      {/* AI Inference Output Box */}
      <AnimatePresence mode="wait">
        {isAnalyzing ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 flex items-center gap-3 text-xs text-purple-800"
          >
            <RefreshCw className="w-4 h-4 animate-spin text-purple-600 shrink-0" />
            <span>Analyzing 20 sensor nodes, citizen ticket density, and fleet positions...</span>
          </motion.div>
        ) : currentResponse ? (
          <motion.div
            key={currentResponse.query}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A]">
                <Bot className="w-4 h-4 text-[#0077CC]" />
                <span>WasteSense AI Decision Rationale</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Response latency: 42ms</span>
            </div>

            <p className="text-xs text-slate-700 font-medium">
              {currentResponse.summary}
            </p>

            {/* Structured Findings */}
            <div className="space-y-1.5">
              {currentResponse.bins.map((b) => (
                <div 
                  key={b.id}
                  className="p-2 rounded-lg bg-white border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-[#0F172A]">{b.id}</span>
                    <span className="text-[11px] text-slate-600 font-medium" dangerouslySetInnerHTML={{ __html: b.note }} />
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      b.status === 'CRITICAL' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {b.status} ({b.fill}%)
                    </span>
                    <span className="font-mono font-bold text-xs text-purple-700">
                      Score {b.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendation & Execution */}
            <div className="p-3 rounded-lg bg-purple-50 border border-purple-200 text-xs text-purple-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="font-extrabold text-[10px] text-purple-700 uppercase tracking-wider block">Recommended Operational Action</span>
                <p className="text-[11px] font-medium leading-relaxed">{currentResponse.recommendation}</p>
              </div>

              {currentResponse.actionText && (
                <button
                  onClick={handleAction}
                  disabled={actionDone}
                  className="px-3.5 py-2 rounded-lg bg-[#0077CC] hover:bg-[#004A80] text-white font-bold text-xs shrink-0 shadow-xs flex items-center gap-1.5 transition active:scale-95 disabled:bg-emerald-600"
                >
                  {actionDone ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Action Dispatched!</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5" />
                      <span>{currentResponse.actionText}</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
