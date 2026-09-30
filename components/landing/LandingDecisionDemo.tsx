'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  RotateCcw, 
  Cpu, 
  Radio, 
  TrendingUp, 
  Truck, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  MapPin, 
  Layers, 
  ShieldCheck, 
  Zap,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useWasteSense } from '../../context/WasteSenseContext';
import Link from 'next/link';

interface DemoNode {
  id: string;
  code: string;
  location: string;
  zone: string;
  defaultFill: number;
  weight: number;
  temp: number;
  assignedWorker: string;
  assignedVehicle: string;
  complaintCount: number;
}

const DEMO_NODES: DemoNode[] = [
  {
    id: 'bin-1',
    code: 'Node B-102',
    location: 'Central Market',
    zone: 'Sector 12 Commercial',
    defaultFill: 95,
    weight: 18.4,
    temp: 29.0,
    assignedWorker: 'Rahul Sharma',
    assignedVehicle: 'Truck #04 (EV Compactor)',
    complaintCount: 4,
  },
  {
    id: 'bin-2',
    code: 'Node B-105',
    location: 'Metro Transit Terminal',
    zone: 'Sector 4 Transit Hub',
    defaultFill: 88,
    weight: 15.2,
    temp: 26.5,
    assignedWorker: 'Amit Patel',
    assignedVehicle: 'Truck #02 (Heavy Compactor)',
    complaintCount: 3,
  },
  {
    id: 'bin-3',
    code: 'Node B-108',
    location: 'Hospital Medical Corridor',
    zone: 'Sector 9 Healthcare',
    defaultFill: 92,
    weight: 16.8,
    temp: 27.2,
    assignedWorker: 'Sunil Kumar',
    assignedVehicle: 'Truck #01 (Rapid EV)',
    complaintCount: 5,
  },
];

type SimStep = 'IDLE' | 'TELEMETRY' | 'ANALYSIS' | 'PRIORITY' | 'DISPATCH' | 'RESOLVED';

export const LandingDecisionDemo: React.FC = () => {
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(0);
  const activeNode = DEMO_NODES[selectedNodeIndex];

  const [fillLevel, setFillLevel] = useState<number>(activeNode.defaultFill);
  const [simStep, setSimStep] = useState<SimStep>('IDLE');
  const [computedScore, setComputedScore] = useState<number>(0);

  // Sync fill when node changes
  useEffect(() => {
    setFillLevel(activeNode.defaultFill);
    setSimStep('IDLE');
  }, [selectedNodeIndex, activeNode.defaultFill]);

  // Calculate dynamic urgency score based on formula
  const calculateUrgency = (fill: number, complaints: number) => {
    // Fill 40%, complaints 25%, wait time ~20%, zone ~15%
    const fillWeight = (fill / 100) * 40;
    const complaintWeight = Math.min(25, complaints * 5);
    const waitWeight = fill > 80 ? 18 : 8;
    const zoneWeight = 14;
    return Math.min(99, Math.round(fillWeight + complaintWeight + waitWeight + zoneWeight));
  };

  const runDecisionSimulator = () => {
    if (simStep !== 'IDLE' && simStep !== 'RESOLVED') return;

    const score = calculateUrgency(fillLevel, activeNode.complaintCount);
    setComputedScore(score);

    // Step 1: Ingest Telemetry
    setSimStep('TELEMETRY');

    // Step 2: Multi-Factor Analysis
    setTimeout(() => {
      setSimStep('ANALYSIS');
    }, 1100);

    // Step 3: Priority Calculation
    setTimeout(() => {
      setSimStep('PRIORITY');
    }, 2400);

    // Step 4: Dispatch Work Order
    setTimeout(() => {
      setSimStep('DISPATCH');
    }, 3800);

    // Step 5: Resolution & Reset
    setTimeout(() => {
      setSimStep('RESOLVED');
      setFillLevel(18); // Reset to clean
    }, 5400);
  };

  const resetSimulator = () => {
    setFillLevel(activeNode.defaultFill);
    setSimStep('IDLE');
  };

  return (
    <section id="demo" className="py-24 bg-white relative overflow-hidden border-b border-slate-200">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/60 via-white to-[#F8FAFC]/30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-bold text-[#0077CC] uppercase tracking-widest mb-3">
            <Cpu className="w-3.5 h-3.5" />
            Live Algorithm In Action
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] tracking-tight leading-[1.1]">
            Watch WasteSense Make an{' '}
            <span className="bg-gradient-to-r from-[#0077CC] to-[#0EA5E9] bg-clip-text text-transparent">
              Autonomous Decision.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Interact with the decision engine: select any municipal node, adjust real-time fill capacity, and watch our multi-factor engine evaluate signals, dispatch field crews, and verify resolution.
          </p>
        </div>

        {/* Main Interactive Decision Twin Card */}
        <div className="rounded-3xl bg-[#0F172A] text-white border border-slate-800 shadow-2xl p-6 sm:p-10 relative overflow-hidden">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0077CC]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Control Bar: Node Selector + Sliders */}
          <div className="pb-8 mb-8 border-b border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Node Selector Tabs */}
            <div>
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider block mb-2">
                SELECT MUNICIPAL ASSET NODE
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {DEMO_NODES.map((node, idx) => (
                  <button
                    key={node.id}
                    onClick={() => {
                      if (simStep === 'IDLE' || simStep === 'RESOLVED') {
                        setSelectedNodeIndex(idx);
                      }
                    }}
                    disabled={simStep !== 'IDLE' && simStep !== 'RESOLVED'}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                      selectedNodeIndex === idx
                        ? 'bg-[#0077CC] text-white shadow-md shadow-[#0077CC]/30 border border-sky-400'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{node.code}</span>
                    <span className="text-[10px] opacity-70">({node.location})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Fill Level Range Slider */}
            <div className="lg:w-80">
              <div className="flex items-center justify-between text-xs font-mono font-bold mb-1.5">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-sky-400" /> Simulated Fill Capacity:
                </span>
                <span className={`font-black ${
                  fillLevel >= 85 ? 'text-rose-400' : fillLevel >= 60 ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {fillLevel}%
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="98"
                value={fillLevel}
                onChange={(e) => {
                  if (simStep === 'IDLE' || simStep === 'RESOLVED') {
                    setFillLevel(Number(e.target.value));
                    setSimStep('IDLE');
                  }
                }}
                disabled={simStep !== 'IDLE' && simStep !== 'RESOLVED'}
                className="w-full h-2 rounded-lg bg-slate-800 appearance-none cursor-pointer accent-[#0077CC]"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>20% Low</span>
                <span>65% Warning</span>
                <span className="text-rose-400 font-bold">85%+ Critical</span>
              </div>
            </div>

            {/* Launch Action Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={runDecisionSimulator}
                disabled={simStep !== 'IDLE' && simStep !== 'RESOLVED'}
                className={`px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-lg ${
                  simStep === 'IDLE' || simStep === 'RESOLVED'
                    ? 'bg-gradient-to-r from-[#0077CC] to-[#0EA5E9] hover:from-[#004A80] hover:to-[#0077CC] text-white shadow-[#0077CC]/25 active:scale-95'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                }`}
              >
                <Play className="w-4 h-4 fill-current" />
                <span>
                  {simStep === 'RESOLVED' ? 'Re-Run Decision Loop' : 'Trigger Autonomous Decision'}
                </span>
              </button>

              {simStep === 'RESOLVED' && (
                <button
                  onClick={resetSimulator}
                  title="Reset to Initial State"
                  className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

          {/* 5 Sequential Decision Pipeline Stages */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            
            {/* STAGE 1: TELEMETRY INGESTION */}
            <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
              simStep === 'TELEMETRY'
                ? 'bg-slate-800/90 border-[#0077CC] shadow-lg shadow-[#0077CC]/20 ring-1 ring-[#0077CC]'
                : simStep !== 'IDLE'
                ? 'bg-slate-900/60 border-slate-800 opacity-90'
                : 'bg-slate-900/40 border-slate-800/60 opacity-60'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] text-slate-400 font-bold">STEP 01</span>
                <Radio className={`w-4 h-4 ${simStep === 'TELEMETRY' ? 'text-sky-400 animate-pulse' : 'text-slate-500'}`} />
              </div>
              <h4 className="text-xs font-black uppercase text-white tracking-wider">
                Telemetry Stream
              </h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Ultrasonic sensor & load gauge transmitting.
              </p>

              <div className="mt-4 pt-3 border-t border-slate-800/80 font-mono text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Fill:</span>
                  <span className={`font-bold ${fillLevel >= 85 ? 'text-rose-400' : 'text-sky-400'}`}>
                    {fillLevel}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Weight:</span>
                  <span className="text-slate-300">{activeNode.weight} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Temp:</span>
                  <span className="text-slate-300">{activeNode.temp}°C</span>
                </div>
              </div>
            </div>

            {/* STAGE 2: MULTI-FACTOR ANALYSIS */}
            <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
              simStep === 'ANALYSIS'
                ? 'bg-slate-800/90 border-amber-400 shadow-lg shadow-amber-400/20 ring-1 ring-amber-400'
                : simStep === 'PRIORITY' || simStep === 'DISPATCH' || simStep === 'RESOLVED'
                ? 'bg-slate-900/60 border-slate-800 opacity-90'
                : 'bg-slate-900/40 border-slate-800/60 opacity-60'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] text-slate-400 font-bold">STEP 02</span>
                <Cpu className={`w-4 h-4 ${simStep === 'ANALYSIS' ? 'text-amber-400 animate-spin' : 'text-slate-500'}`} />
              </div>
              <h4 className="text-xs font-black uppercase text-white tracking-wider">
                Signal Synthesis
              </h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Evaluating 4 operational factors simultaneously.
              </p>

              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] space-y-1.5">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Fill Capacity (40%)</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Citizen Complaints (25%)</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Wait Time (20%)</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Zone Footfall (15%)</span>
                </div>
              </div>
            </div>

            {/* STAGE 3: AI PRIORITY SCORE */}
            <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
              simStep === 'PRIORITY'
                ? 'bg-slate-800/90 border-rose-500 shadow-lg shadow-rose-500/20 ring-1 ring-rose-500'
                : simStep === 'DISPATCH' || simStep === 'RESOLVED'
                ? 'bg-slate-900/60 border-slate-800 opacity-90'
                : 'bg-slate-900/40 border-slate-800/60 opacity-60'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] text-slate-400 font-bold">STEP 03</span>
                <TrendingUp className={`w-4 h-4 ${simStep === 'PRIORITY' ? 'text-rose-400 animate-pulse' : 'text-slate-500'}`} />
              </div>
              <h4 className="text-xs font-black uppercase text-white tracking-wider">
                Urgency Score
              </h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Zero human bias mathematical ranking.
              </p>

              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <div className="text-2xl font-mono font-black text-rose-400">
                  {computedScore > 0 ? computedScore : '--'}
                  <span className="text-xs text-slate-500 font-normal"> / 100</span>
                </div>
                <span className="inline-block mt-1 text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                  {computedScore >= 80 ? 'CRITICAL TIER' : computedScore >= 60 ? 'HIGH PRIORITY' : 'SCHEDULED'}
                </span>
              </div>
            </div>

            {/* STAGE 4: AUTONOMOUS TASK DISPATCH */}
            <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
              simStep === 'DISPATCH'
                ? 'bg-slate-800/90 border-indigo-400 shadow-lg shadow-indigo-400/20 ring-1 ring-indigo-400'
                : simStep === 'RESOLVED'
                ? 'bg-slate-900/60 border-slate-800 opacity-90'
                : 'bg-slate-900/40 border-slate-800/60 opacity-60'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] text-slate-400 font-bold">STEP 04</span>
                <Truck className={`w-4 h-4 ${simStep === 'DISPATCH' ? 'text-indigo-400 animate-bounce' : 'text-slate-500'}`} />
              </div>
              <h4 className="text-xs font-black uppercase text-white tracking-wider">
                Work Order Created
              </h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Instant zone routing to active sanitation crew.
              </p>

              <div className="mt-4 pt-3 border-t border-slate-800/80 font-mono text-[11px] space-y-1 text-slate-300">
                <div className="text-xs font-bold text-white truncate">
                  {activeNode.assignedWorker}
                </div>
                <div className="text-[10px] text-indigo-300 truncate">
                  {activeNode.assignedVehicle}
                </div>
                <div className="text-emerald-400 font-semibold text-[10px]">
                  → EN ROUTE
                </div>
              </div>
            </div>

            {/* STAGE 5: CLOSED-LOOP RESOLUTION */}
            <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
              simStep === 'RESOLVED'
                ? 'bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-500'
                : 'bg-slate-900/40 border-slate-800/60 opacity-60'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] text-slate-400 font-bold">STEP 05</span>
                <CheckCircle2 className={`w-4 h-4 ${simStep === 'RESOLVED' ? 'text-emerald-400' : 'text-slate-500'}`} />
              </div>
              <h4 className="text-xs font-black uppercase text-white tracking-wider">
                Closed-Loop Verified
              </h4>
              <p className="text-[11px] text-slate-400 mt-1">
                On-site photo + 100m geofence reset.
              </p>

              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <div className="text-xl font-mono font-black text-emerald-400">
                  {simStep === 'RESOLVED' ? '18% Clean' : '--'}
                </div>
                <span className="inline-block mt-1 text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {simStep === 'RESOLVED' ? 'Audit: PASS' : 'Pending Proof'}
                </span>
              </div>
            </div>

          </div>

          {/* Bottom Live Feedback Bar */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-[#0077CC]" />
              <span>
                Simulating live decision model for <strong className="text-white">{activeNode.code}</strong> ({activeNode.location}).
              </span>
            </div>

            <Link
              href="/admin/dashboard"
              className="text-[#38BDF8] hover:text-white font-bold flex items-center gap-1.5 transition-colors group"
            >
              <span>Inspect Live Municipal Command Center</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};
