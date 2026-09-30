'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Activity, 
  Navigation, 
  CheckCircle2, 
  Zap, 
  RotateCcw, 
  Layers, 
  Battery, 
  Thermometer, 
  Play, 
  Radio, 
  ShieldCheck,
  Truck,
  MapPin
} from 'lucide-react';
import { useWasteSense } from '../../context/WasteSenseContext';

interface BinNode {
  id: string;
  code: string;
  name: string;
  zone: string;
  fill: number;
  temp: number;
  battery: number;
  weight: number;
  status: 'NORMAL' | 'WARNING' | 'CRITICAL' | 'COLLECTED';
  x: number;
  y: number;
}

const INITIAL_NODES: BinNode[] = [
  {
    id: 'bin-102',
    code: 'B-102',
    name: 'Central Market',
    zone: 'Sector 12',
    fill: 95,
    temp: 29.0,
    battery: 87,
    weight: 18.4,
    status: 'CRITICAL',
    x: 560,
    y: 180,
  },
  {
    id: 'bin-101',
    code: 'B-101',
    name: 'Transit Plaza',
    zone: 'Sector 4',
    fill: 42,
    temp: 26.2,
    battery: 92,
    weight: 8.6,
    status: 'NORMAL',
    x: 220,
    y: 150,
  },
  {
    id: 'bin-103',
    code: 'B-103',
    name: 'Medical Center',
    zone: 'Sector 9',
    fill: 68,
    temp: 27.8,
    battery: 79,
    weight: 12.1,
    status: 'WARNING',
    x: 720,
    y: 310,
  },
  {
    id: 'bin-104',
    code: 'B-104',
    name: 'Residential Gate',
    zone: 'Sector 15',
    fill: 28,
    temp: 24.5,
    battery: 95,
    weight: 5.4,
    status: 'NORMAL',
    x: 360,
    y: 390,
  },
];

export const LandingHero: React.FC = () => {
  const { simulateSurgeB102, resetBinToClean } = useWasteSense();

  const [nodes, setNodes] = useState<BinNode[]>(INITIAL_NODES);
  const [selectedNode, setSelectedNode] = useState<BinNode>(INITIAL_NODES[0]);
  const [simState, setSimState] = useState<'IDLE' | 'ANALYZING' | 'DISPATCHED' | 'COLLECTING' | 'RESOLVED'>('IDLE');
  const [truckPos, setTruckPos] = useState({ x: 130, y: 260 }); // Operations Depot

  // Simulation Runner: Demonstrates realistic closed-loop resolution
  const runSimulation = () => {
    if (simState !== 'IDLE' && simState !== 'RESOLVED') return;

    // Reset B-102 to Critical Surge (95%)
    setNodes(prev => prev.map(n => n.code === 'B-102' ? { ...n, fill: 95, status: 'CRITICAL' } : n));
    setSelectedNode(prev => prev.code === 'B-102' ? { ...prev, fill: 95, status: 'CRITICAL' } : prev);
    setTruckPos({ x: 130, y: 260 });
    setSimState('ANALYZING');

    setTimeout(() => {
      setSimState('DISPATCHED');
      // Truck moves smoothly along solid blue road to B-102
      setTruckPos({ x: 505, y: 190 });
    }, 1200);

    setTimeout(() => {
      setSimState('COLLECTING');
    }, 2800);

    setTimeout(() => {
      // Empty B-102 to clean 18% & VERIFIED
      setNodes(prev => prev.map(n => n.code === 'B-102' ? { ...n, fill: 18, status: 'COLLECTED' } : n));
      setSelectedNode(prev => prev.code === 'B-102' ? { ...prev, fill: 18, status: 'COLLECTED' } : prev);
      setSimState('RESOLVED');
      resetBinToClean('B-102'); // Synchronize state globally with Admin, Worker, and Citizen dashboards!
    }, 4500);
  };

  const resetSimulation = () => {
    setNodes(INITIAL_NODES);
    setSelectedNode(INITIAL_NODES[0]);
    setTruckPos({ x: 130, y: 260 });
    setSimState('IDLE');
    simulateSurgeB102(); // Ensure B-102 returns to 95% critical for demo evaluation
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-[#F0F7FF] via-[#F8FAFC] to-[#FFFFFF]">
      {/* Background Subtle Dot Grid */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(0, 119, 204, 0.12) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Platform Overview & Mission */}
          <div className="lg:col-span-5 text-left">
            {/* System Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-sky-200 shadow-xs mb-6 text-xs font-semibold text-[#004A80]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0077CC]"></span>
              </span>
              <span className="text-[#0077CC] font-bold uppercase tracking-wider text-[10px]">
                A Living Digital Twin of a Cleaner City
              </span>
            </div>

            {/* Overline */}
            <div className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-2 font-mono">
              Smart Waste Intelligence Platform
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-[1.06] font-display">
              Sense. Predict.{' '}
              <span className="bg-gradient-to-r from-[#0077CC] via-[#0EA5E9] to-[#004A80] bg-clip-text text-transparent">
                Prioritize. Collect.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Autonomous waste intelligence connecting citizens, smart containers and sanitation teams in one real-time municipal command platform.
            </p>

            {/* CTA Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                href="/admin/dashboard"
                className="px-6 py-3.5 rounded-2xl bg-[#0077CC] hover:bg-[#004A80] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#0077CC]/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group"
              >
                <span>Launch Command Center</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="#how-it-works"
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold text-xs sm:text-sm shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>Explore How It Works</span>
              </a>
            </div>

            {/* Trust and Feature Bullets */}
            <div className="mt-8 pt-6 border-t border-slate-200/80 grid grid-cols-2 gap-3 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0077CC] shrink-0" />
                <span>100m GPS Geofence Audited</span>
              </div>
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#0077CC] shrink-0" />
                <span>Sub-Minute Telemetry Sync</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Closed-Loop Photo Proof</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Dynamic Vehicle Routing</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: LIGHT GEOSPATIAL OPERATIONS MAP (PREMIUM SMART-CITY TECH) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl p-4 sm:p-6 bg-white border border-[#E2E8F0] shadow-xl shadow-slate-900/5">
              
              {/* Header Bar of Digital Twin Canvas */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#087FD1] animate-ping" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#0F172A]">
                    Central Municipality &bull; Sector 12 Operations Grid
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={runSimulation}
                    disabled={simState === 'ANALYZING' || simState === 'DISPATCHED' || simState === 'COLLECTING'}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                      simState === 'IDLE' || simState === 'RESOLVED'
                        ? 'bg-[#087FD1] hover:bg-[#004A80] text-white active:scale-95'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>{simState === 'RESOLVED' ? 'Re-run Route' : 'Simulate Overflow & Route'}</span>
                  </button>

                  {simState === 'RESOLVED' && (
                    <button
                      onClick={resetSimulation}
                      title="Reset Grid to Initial State"
                      className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* PIPELINE STATUS: Clean Light Success/Status Component */}
              {simState === 'RESOLVED' ? (
                <div className="mb-3 px-4 py-2.5 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-between text-xs text-emerald-900 transition-all shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                    <div>
                      <span className="font-extrabold uppercase tracking-wide text-emerald-800 text-[11px] block sm:inline sm:mr-2">
                        ✓ CLOSED-LOOP COMPLETE
                      </span>
                      <span className="text-emerald-700 font-medium">
                        B-102 collection verified &bull; Telemetry reset 95% → 18%
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full font-bold">
                    VERIFIED
                  </span>
                </div>
              ) : simState === 'ANALYZING' ? (
                <div className="mb-3 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between text-xs text-amber-900 font-semibold animate-pulse">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-amber-600 animate-spin" />
                    <span>Priority Engine Evaluating Node B-102 &bull; Risk Score 95/100</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-amber-700 bg-white px-2 py-0.5 rounded border border-amber-200">
                    ANALYZING
                  </span>
                </div>
              ) : simState === 'DISPATCHED' || simState === 'COLLECTING' ? (
                <div className="mb-3 px-4 py-2.5 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-between text-xs text-[#004A80] font-semibold">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#087FD1] animate-bounce" />
                    <span>Compactor Truck #04 En Route via Central Arterial &bull; ETA &lt; 2m</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#087FD1] bg-white px-2 py-0.5 rounded border border-sky-200">
                    DISPATCHED
                  </span>
                </div>
              ) : (
                <div className="mb-3 px-4 py-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse" />
                    <span className="font-bold text-slate-800">Node B-102 Critical Overflow (95%)</span>
                    <span className="text-slate-500 hidden sm:inline">&bull; Autonomous Dispatch Recommended</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                    CRITICAL 95/100
                  </span>
                </div>
              )}

              {/* LIGHT GEOSPATIAL MAP CANVAS (HIGH VISIBILITY & COMPREHENSION • LIGHT MUNICIPAL PALETTE) */}
              <div 
                className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl bg-[#F8FAFC] border-2 border-[#CBD5E1] shadow-inner select-none overflow-hidden"
                style={{
                  backgroundImage: `radial-gradient(#94A3B8 1px, transparent 1px)`,
                  backgroundSize: '22px 22px',
                }}
              >
                {/* On-Canvas Visual Legend (Top-Right) */}
                <div className="absolute top-3 right-3 z-20 hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/95 border border-slate-200/90 shadow-md text-[10px] font-semibold text-slate-700 backdrop-blur-xs">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse" />
                    <span>Critical (≥85%)</span>
                  </div>
                  <div className="flex items-center gap-1 border-l border-slate-200 pl-2">
                    <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                    <span>Warning</span>
                  </div>
                  <div className="flex items-center gap-1 border-l border-slate-200 pl-2">
                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                    <span>Normal</span>
                  </div>
                  <div className="flex items-center gap-1 border-l border-slate-200 pl-2 text-[#0077CC]">
                    <span className="w-2 h-2 rounded-full bg-[#0077CC]" />
                    <span>En Route</span>
                  </div>
                </div>

                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 860 480" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    {/* Headlight illumination beam */}
                    <linearGradient id="headlightBeam" x1="0%" y1="50%" x2="100%" y2="50%">
                      <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                    </linearGradient>

                    {/* Subtle Drop Shadow */}
                    <filter id="mapShadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.12" />
                    </filter>
                  </defs>
                  
                  {/* 1. MUNICIPAL ZONE SHAPES WITH DISTINCT BUILDING FOOTPRINTS */}
                  
                  {/* Zone A: Commercial Hub (Sector 12) */}
                  <g>
                    <rect x="430" y="60" width="270" height="200" rx="18" fill="#F0F9FF" stroke="#0284C7" strokeWidth="1.8" strokeDasharray="5 5" opacity="0.9" />
                    {/* Mini Architectural Building Footprints */}
                    <rect x="450" y="80" width="45" height="35" rx="6" fill="#BAE6FD" opacity="0.6" />
                    <rect x="505" y="80" width="60" height="35" rx="6" fill="#BAE6FD" opacity="0.6" />
                    <rect x="640" y="80" width="45" height="40" rx="6" fill="#BAE6FD" opacity="0.6" />
                    <rect x="635" y="135" width="50" height="45" rx="6" fill="#BAE6FD" opacity="0.6" />
                    
                    {/* Zone Badge */}
                    <g transform="translate(565, 82)">
                      <rect x="-90" y="-12" width="180" height="22" rx="11" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.2" filter="url(#mapShadow)" />
                      <text x="0" y="3" fill="#004A80" fontSize="10" fontWeight="800" letterSpacing="0.5" textAnchor="middle">
                        🏢 ZONE A &bull; COMMERCIAL HUB
                      </text>
                    </g>
                  </g>

                  {/* Zone B: Transit Corridor (Metro & Railway) */}
                  <g>
                    <rect x="100" y="70" width="230" height="160" rx="18" fill="#F1F5F9" stroke="#64748B" strokeWidth="1.8" strokeDasharray="5 5" opacity="0.95" />
                    {/* Transit Platform Lines */}
                    <line x1="120" y1="120" x2="200" y2="120" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />
                    <line x1="120" y1="135" x2="200" y2="135" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />

                    <g transform="translate(215, 90)">
                      <rect x="-85" y="-12" width="170" height="22" rx="11" fill="#FFFFFF" stroke="#64748B" strokeWidth="1.2" filter="url(#mapShadow)" />
                      <text x="0" y="3" fill="#334155" fontSize="10" fontWeight="800" letterSpacing="0.5" textAnchor="middle">
                        🚆 ZONE B &bull; TRANSIT PLAZA
                      </text>
                    </g>
                  </g>

                  {/* Zone C: Residential Ward 12 */}
                  <g>
                    <rect x="220" y="290" width="270" height="165" rx="18" fill="#F0FDF4" stroke="#10B981" strokeWidth="1.8" strokeDasharray="5 5" opacity="0.95" />
                    {/* Residential Blocks */}
                    <rect x="240" y="315" width="40" height="30" rx="4" fill="#BBF7D0" opacity="0.6" />
                    <rect x="290" y="315" width="40" height="30" rx="4" fill="#BBF7D0" opacity="0.6" />
                    <rect x="420" y="315" width="55" height="30" rx="4" fill="#BBF7D0" opacity="0.6" />

                    <g transform="translate(355, 310)">
                      <rect x="-85" y="-12" width="170" height="22" rx="11" fill="#FFFFFF" stroke="#10B981" strokeWidth="1.2" filter="url(#mapShadow)" />
                      <text x="0" y="3" fill="#065F46" fontSize="10" fontWeight="800" letterSpacing="0.5" textAnchor="middle">
                        🏘️ ZONE C &bull; RESIDENTIAL WARD
                      </text>
                    </g>
                  </g>

                  {/* Zone D: Healthcare / Medical Center */}
                  <g>
                    <rect x="610" y="230" width="210" height="195" rx="18" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="1.8" strokeDasharray="5 5" opacity="0.95" />
                    {/* Medical Cross Building */}
                    <rect x="635" y="260" width="35" height="35" rx="6" fill="#FDE68A" opacity="0.6" />

                    <g transform="translate(715, 252)">
                      <rect x="-80" y="-12" width="160" height="22" rx="11" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="1.2" filter="url(#mapShadow)" />
                      <text x="0" y="3" fill="#92400E" fontSize="10" fontWeight="800" letterSpacing="0.5" textAnchor="middle">
                        🏥 ZONE D &bull; MEDICAL CTR
                      </text>
                    </g>
                  </g>

                  {/* 2. HIGH-CONTRAST MUNICIPAL ROAD NETWORK (DEFINED ASPHALT + LANE DIVIDERS) */}
                  {/* Road Outer Edge Border (Strong Slate Contrast) */}
                  <g stroke="#94A3B8" strokeWidth="36" strokeLinecap="round" strokeLinejoin="round" fill="none">
                    <path d="M 60 260 L 360 260 L 560 180 L 780 180" />
                    <path d="M 220 100 L 220 260 L 360 390 L 620 390" />
                    <path d="M 560 180 L 720 310 L 810 310" />
                  </g>

                  {/* Road Clean White Asphalt Surface */}
                  <g stroke="#FFFFFF" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" fill="none">
                    <path d="M 60 260 L 360 260 L 560 180 L 780 180" />
                    <path d="M 220 100 L 220 260 L 360 390 L 620 390" />
                    <path d="M 560 180 L 720 310 L 810 310" />
                  </g>

                  {/* Road Center Dashed Lane Divider (Guides the Eye) */}
                  <g stroke="#94A3B8" strokeWidth="1.8" strokeDasharray="6 6" fill="none">
                    <path d="M 60 260 L 360 260 L 560 180 L 780 180" />
                    <path d="M 220 100 L 220 260 L 360 390 L 620 390" />
                    <path d="M 560 180 L 720 310 L 810 310" />
                  </g>

                  {/* Street Name Typography Along Roads */}
                  <text x="250" y="254" fill="#64748B" fontSize="9" fontWeight="800" letterSpacing="1.2" textAnchor="middle" opacity="0.9">
                    CENTRAL ARTERIAL BLVD
                  </text>
                  <text x="660" y="174" fill="#64748B" fontSize="9" fontWeight="800" letterSpacing="1.2" textAnchor="middle" opacity="0.9">
                    MARKET EXPRESSWAY
                  </text>
                  <text x="490" y="384" fill="#64748B" fontSize="9" fontWeight="800" letterSpacing="1.2" textAnchor="middle" opacity="0.9">
                    SECTOR 12 RING RD
                  </text>

                  {/* 3. ACTIVE DISPATCH ROUTE (FLOWING BLUE ANIMATED TRAIL TO B-102) */}
                  <path 
                    d="M 125 260 L 360 260 L 560 180" 
                    fill="none" 
                    stroke="#0284C7" 
                    strokeWidth="5" 
                    strokeLinecap="round" 
                  />
                  {/* Flowing Dashed Direction Pulse */}
                  <path 
                    d="M 125 260 L 360 260 L 560 180" 
                    fill="none" 
                    stroke="#38BDF8" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeDasharray="8 6"
                  >
                    <animate attributeName="stroke-dashoffset" values="28;0" dur="1s" repeatCount="indefinite" />
                  </path>

                  {/* Active Route Waypoint Tag */}
                  <g transform="translate(450, 215)">
                    <rect x="-65" y="-10" width="130" height="20" rx="10" fill="#0077CC" filter="url(#mapShadow)" />
                    <text x="0" y="3" fill="#FFFFFF" fontSize="8.5" fontWeight="800" textAnchor="middle" letterSpacing="0.4">
                      ⚡ DISPATCH ROUTE &bull; 1.4 KM
                    </text>
                  </g>

                  {/* Municipal Fleet Operations Depot Marker */}
                  <g transform="translate(90, 260)">
                    <rect x="-35" y="-22" width="70" height="44" rx="12" fill="#FFFFFF" stroke="#0077CC" strokeWidth="2" filter="url(#mapShadow)" />
                    <circle cx="-16" cy="-4" r="6" fill="#0077CC" />
                    <text x="-16" y="-1" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">D</text>
                    <text x="10" y="-7" fill="#0F172A" fontSize="9" fontWeight="900" textAnchor="middle">DEPOT</text>
                    <text x="10" y="5" fill="#64748B" fontSize="7.5" fontWeight="bold" textAnchor="middle">BASE 01</text>
                    <rect x="-26" y="11" width="52" height="6" rx="3" fill="#E2E8F0" />
                  </g>

                  {/* 4. SMART BIN NODES (PROMINENT BEACON PINS WITH LOCATION & TELEMETRY LABELS) */}
                  {nodes.map((node) => {
                    const isSelected = selectedNode.code === node.code;
                    const isB102 = node.code === 'B-102';
                    const isCollected = node.status === 'COLLECTED';
                    const isCritical = node.status === 'CRITICAL';
                    const isWarning = node.status === 'WARNING';

                    const markerColor = isCollected ? '#10B981' : isCritical ? '#EF4444' : isWarning ? '#F59E0B' : '#10B981';
                    const borderColor = isCritical ? '#DC2626' : isWarning ? '#D97706' : '#059669';

                    return (
                      <g 
                        key={node.id} 
                        transform={`translate(${node.x}, ${node.y})`}
                        onClick={() => setSelectedNode(node)}
                        className="cursor-pointer group"
                      >
                        {/* Ground Shadow & Anchor Disc */}
                        <ellipse cx="0" cy="4" rx="14" ry="6" fill="#000000" opacity="0.16" />

                        {/* Critical Radar Shockwaves Pulsing outwards around B-102 */}
                        {isCritical && (
                          <g>
                            <circle cx="0" cy="0" r="28" fill="none" stroke="#EF4444" strokeWidth="2.5" opacity="0.8">
                              <animate attributeName="r" values="14;38;14" dur="1.8s" repeatCount="indefinite" />
                              <animate attributeName="opacity" values="0.9;0.0;0.9" dur="1.8s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="0" cy="0" r="46" fill="#EF4444" opacity="0.12">
                              <animate attributeName="r" values="14;48;14" dur="1.8s" repeatCount="indefinite" />
                              <animate attributeName="opacity" values="0.25;0.0;0.25" dur="1.8s" repeatCount="indefinite" />
                            </circle>
                          </g>
                        )}

                        {/* Selected Node Ring */}
                        {isSelected && (
                          <circle cx="0" cy="0" r="22" fill="none" stroke="#0077CC" strokeWidth="2.5" strokeDasharray="4 4" />
                        )}

                        {/* Vertical Beacon Pin Stem (Connects Ground to Elevated Badge) */}
                        <line x1="0" y1="0" x2="0" y2="-28" stroke={markerColor} strokeWidth="3" strokeLinecap="round" />

                        {/* Circular Base Anchor Cap */}
                        <circle cx="0" cy="0" r="8" fill="#FFFFFF" stroke={borderColor} strokeWidth="2.5" />
                        <circle cx="0" cy="0" r="4.5" fill={markerColor} />

                        {/* HIGHLY LEGIBLE ELEVATED INFORMATION BADGE WITH LOCATION NAME */}
                        <g transform="translate(0, -32)" filter="url(#mapShadow)">
                          {/* Badge Background */}
                          <rect 
                            x="-52" 
                            y="-20" 
                            width="104" 
                            height="34" 
                            rx="10" 
                            fill="#FFFFFF" 
                            stroke={isSelected ? '#0077CC' : borderColor} 
                            strokeWidth={isSelected ? '2.5' : '1.8'}
                          />
                          
                          {/* Top Row: Colored Status Dot + Code + Fill Percentage */}
                          <circle cx="-38" cy="-8" r="4" fill={markerColor} />
                          <text x="-6" y="-5" fill="#0F172A" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="monospace">
                            {node.code} &bull; {node.fill}%
                          </text>

                          {/* Divider line inside badge */}
                          <line x1="-44" y1="1" x2="44" y2="1" stroke="#F1F5F9" strokeWidth="1" />

                          {/* Bottom Row: Clear Location Name */}
                          <text x="0" y="10" fill="#475569" fontSize="8" fontWeight="800" textAnchor="middle" letterSpacing="0.2">
                            {node.name}
                          </text>

                          {/* Urgent Warning Tag if Critical */}
                          {isCritical && (
                            <g transform="translate(0, -28)">
                              <rect x="-38" y="-9" width="76" height="17" rx="8" fill="#EF4444" />
                              <text x="0" y="3" fill="#FFFFFF" fontSize="8" fontWeight="900" textAnchor="middle" letterSpacing="0.4">
                                ⚠️ OVERFLOW 95%
                              </text>
                            </g>
                          )}
                        </g>
                      </g>
                    );
                  })}

                  {/* 5. AUTHENTIC SANITATION COMPACTOR TRUCK WITH ILLUMINATING HEADLIGHTS */}
                  <motion.g
                    animate={{ x: truckPos.x, y: truckPos.y }}
                    transition={{ duration: 1.6, ease: "easeInOut" }}
                    filter="url(#mapShadow)"
                  >
                    {/* Headlight Beam Cone illuminating the road forward */}
                    <polygon points="18,-8 75,-24 75,24 18,8" fill="url(#headlightBeam)" />

                    {/* Truck Ground Shadow */}
                    <ellipse cx="0" cy="16" rx="26" ry="8" fill="#000000" opacity="0.2" />

                    {/* Compactor Cargo Body (Rear Compartment in WasteSense Blue) */}
                    <rect x="-24" y="-14" width="28" height="26" rx="5" fill="#0077CC" stroke="#004A80" strokeWidth="1.5" />
                    {/* Rear Loading Hopper Door */}
                    <line x1="-20" y1="-12" x2="-20" y2="10" stroke="#BAE6FD" strokeWidth="1.5" />

                    {/* Truck Driver Cab (Front Compartment) */}
                    <rect x="4" y="-12" width="18" height="22" rx="4" fill="#0284C7" stroke="#004A80" strokeWidth="1.5" />
                    {/* Windshield Glass */}
                    <rect x="10" y="-9" width="8" height="16" rx="2" fill="#BAE6FD" opacity="0.9" />

                    {/* Flashing Amber Roof Beacon */}
                    <circle cx="-6" cy="-15" r="3.5" fill="#F59E0B" stroke="#B45309" strokeWidth="1">
                      <animate attributeName="opacity" values="1;0.2;1" dur="0.8s" repeatCount="indefinite" />
                    </circle>

                    {/* Wheels */}
                    <circle cx="-16" cy="14" r="4.5" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
                    <circle cx="12" cy="14" r="4.5" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />

                    {/* Floating Truck Badge */}
                    <g transform="translate(0, -25)">
                      <rect x="-48" y="-10" width="96" height="20" rx="10" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
                      <text x="0" y="3.5" fill="#FFFFFF" fontSize="8.5" fontWeight="900" textAnchor="middle" letterSpacing="0.4">
                        🚛 TRUCK #04 &bull; EN ROUTE
                      </text>
                    </g>
                  </motion.g>

                </svg>
              </div>

              {/* BOTTOM SELECTED BIN PANEL: Clean Surface Card (#FFFFFF, #E2E8F0 border, dark navy text) */}
              <div className="mt-3.5 p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs text-left">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-3 h-3 rounded-full ${
                      selectedNode.status === 'COLLECTED' ? 'bg-[#10B981]' :
                      selectedNode.status === 'CRITICAL' ? 'bg-[#EF4444] animate-pulse' :
                      selectedNode.status === 'WARNING' ? 'bg-[#F59E0B]' : 'bg-[#10B981]'
                    }`} />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-extrabold text-sm text-[#0F172A]">
                          {selectedNode.code}
                        </span>
                        <span className="text-xs text-slate-600 font-medium">
                          &bull; {selectedNode.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                      selectedNode.status === 'COLLECTED' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : selectedNode.status === 'CRITICAL'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : selectedNode.status === 'WARNING'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {selectedNode.status === 'COLLECTED' ? 'VERIFIED' : selectedNode.status}
                    </span>
                  </div>
                </div>

                {/* 4-Pack Telemetry Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3">
                  <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider font-mono">Fill Level</span>
                    <span className={`font-mono font-bold text-sm ${
                      selectedNode.fill >= 85 ? 'text-rose-600' : selectedNode.fill >= 60 ? 'text-amber-600' : 'text-emerald-600'
                    }`}>
                      {selectedNode.fill}%
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider font-mono">Temperature</span>
                    <span className="font-mono font-bold text-sm text-[#0F172A]">
                      {selectedNode.temp}°C
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider font-mono">Battery</span>
                    <span className="font-mono font-bold text-sm text-[#0F172A]">
                      {selectedNode.battery}%
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider font-mono">Zone</span>
                    <span className="font-bold text-xs text-[#0F172A] truncate block">
                      {selectedNode.zone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Caption Under Canvas */}
              <div className="mt-3 flex items-center justify-between px-1 text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5 font-medium">
                  <Layers className="w-3.5 h-3.5 text-[#087FD1]" />
                  <span>Click any node (B-101, B-102, B-103, B-104) to inspect operations telemetry.</span>
                </span>
                <span className="hidden sm:inline font-mono text-[10px] text-slate-400">
                  Municipal Grid Telemetry Active
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
