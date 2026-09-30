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

              {/* LIGHT GEOSPATIAL MAP CANVAS (NO CYBERPUNK / NO DARK THEME) */}
              <div 
                className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl bg-[#F7FAFC] border border-[#E2E8F0] shadow-inner select-none overflow-hidden"
                style={{
                  backgroundImage: `radial-gradient(#CBD5E1 1.2px, transparent 1.2px)`,
                  backgroundSize: '20px 20px',
                }}
              >
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 860 480" preserveAspectRatio="xMidYMid meet">
                  
                  {/* 1. MUNICIPAL ZONE SHAPES (SUBTLE ARCHITECTURAL FOOTPRINTS) */}
                  
                  {/* Zone A: Commercial District */}
                  <g>
                    <rect x="440" y="70" width="260" height="190" rx="16" fill="#087FD1" fillOpacity="0.04" stroke="#BAE6FD" strokeWidth="1.5" strokeDasharray="4 4" />
                    <text x="570" y="98" fill="#004A80" fontSize="10" fontWeight="700" letterSpacing="0.8" textAnchor="middle">
                      Zone A &bull; Commercial
                    </text>
                  </g>

                  {/* Zone B: Transit Corridor */}
                  <g>
                    <rect x="110" y="80" width="220" height="150" rx="16" fill="#F1F5F9" fillOpacity="0.7" stroke="#E2E8F0" strokeWidth="1.5" />
                    <text x="220" y="106" fill="#475569" fontSize="10" fontWeight="700" letterSpacing="0.8" textAnchor="middle">
                      Zone B &bull; Transit
                    </text>
                  </g>

                  {/* Zone C: Residential Ward */}
                  <g>
                    <rect x="230" y="300" width="260" height="150" rx="16" fill="#F1F5F9" fillOpacity="0.7" stroke="#E2E8F0" strokeWidth="1.5" />
                    <text x="360" y="326" fill="#475569" fontSize="10" fontWeight="700" letterSpacing="0.8" textAnchor="middle">
                      Zone C &bull; Residential
                    </text>
                  </g>

                  {/* Zone D: Medical Center */}
                  <g>
                    <rect x="620" y="240" width="200" height="180" rx="16" fill="#10B981" fillOpacity="0.04" stroke="#A7F3D0" strokeWidth="1.5" strokeDasharray="4 4" />
                    <text x="720" y="266" fill="#065F46" fontSize="10" fontWeight="700" letterSpacing="0.8" textAnchor="middle">
                      Zone D &bull; Medical
                    </text>
                  </g>

                  {/* 2. LIGHT GRAY MUNICIPAL ROAD NETWORK */}
                  {/* Road Base Layer (Light Slate/Gray) */}
                  <g stroke="#E2E8F0" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" fill="none">
                    <path d="M 70 260 L 360 260 L 560 180 L 760 180" />
                    <path d="M 220 110 L 220 260 L 360 390 L 600 390" />
                    <path d="M 560 180 L 720 310 L 800 310" />
                  </g>

                  {/* Road Surface Inner Layer */}
                  <g stroke="#FFFFFF" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" fill="none">
                    <path d="M 70 260 L 360 260 L 560 180 L 760 180" />
                    <path d="M 220 110 L 220 260 L 360 390 L 600 390" />
                    <path d="M 560 180 L 720 310 L 800 310" />
                  </g>

                  {/* INACTIVE FEEDER ROUTES (Dashed Gray Lines) */}
                  <g stroke="#CBD5E1" strokeWidth="2" strokeDasharray="5 5" fill="none">
                    <path d="M 220 110 L 220 260" />
                    <path d="M 360 260 L 360 390 L 600 390" />
                    <path d="M 560 180 L 720 310 L 800 310" />
                    <path d="M 560 180 L 760 180" />
                  </g>

                  {/* ACTIVE DISPATCH ROUTE (Solid Blue Line - Clean, No Neon) */}
                  <path 
                    d="M 130 260 L 360 260 L 560 180" 
                    fill="none" 
                    stroke="#087FD1" 
                    strokeWidth="3.5" 
                    strokeLinecap="round" 
                  />

                  {/* Fleet Operations Depot Base Marker */}
                  <g transform="translate(90, 260)">
                    <rect x="-22" y="-12" width="44" height="24" rx="8" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
                    <text x="0" y="3" fill="#64748B" fontSize="9" fontWeight="700" textAnchor="middle">DEPOT</text>
                  </g>

                  {/* 3. SMART BIN NODES (CLEAN CIRCULAR MARKERS WITH OPERATION BADGES) */}
                  {nodes.map((node) => {
                    const isSelected = selectedNode.code === node.code;
                    const isB102 = node.code === 'B-102';
                    const isCollected = node.status === 'COLLECTED';
                    const isCritical = node.status === 'CRITICAL';
                    const isWarning = node.status === 'WARNING';

                    const markerColor = isCollected ? '#10B981' : isCritical ? '#EF4444' : isWarning ? '#F59E0B' : '#10B981';

                    return (
                      <g 
                        key={node.id} 
                        transform={`translate(${node.x}, ${node.y})`}
                        onClick={() => setSelectedNode(node)}
                        className="cursor-pointer group"
                      >
                        {/* Subtle Pulsing Ring around B-102 */}
                        {isB102 && (
                          <circle cx="0" cy="0" r="22" fill="none" stroke="#087FD1" strokeWidth="2" opacity="0.6">
                            <animate attributeName="r" values="16;28;16" dur="2.2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.7;0.1;0.7" dur="2.2s" repeatCount="indefinite" />
                          </circle>
                        )}

                        {/* Selected Node Ring */}
                        {isSelected && !isB102 && (
                          <circle cx="0" cy="0" r="18" fill="none" stroke="#087FD1" strokeWidth="2" strokeDasharray="3 3" />
                        )}

                        {/* Outer White Base Disc */}
                        <circle cx="0" cy="0" r="11" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />

                        {/* Circular Status Core */}
                        <circle cx="0" cy="0" r="8" fill={markerColor} />

                        {/* Callout Information Pill Above Node */}
                        <g transform="translate(0, -22)">
                          <rect 
                            x="-38" 
                            y="-11" 
                            width="76" 
                            height="20" 
                            rx="10" 
                            fill="#FFFFFF" 
                            stroke={isSelected ? '#087FD1' : '#E2E8F0'} 
                            strokeWidth={isSelected ? '1.5' : '1'}
                            className="shadow-xs" 
                          />
                          <circle cx="-26" cy="-1" r="3" fill={markerColor} />
                          <text x="4" y="2" fill="#0F172A" fontSize="9" fontWeight="800" textAnchor="middle" fontFamily="monospace">
                            {node.code} &bull; {node.fill}%
                          </text>
                        </g>
                      </g>
                    );
                  })}

                  {/* 4. SANITATION COMPACTOR TRUCK (CLEAN BLUE ICON & SUBTLE MOVEMENT) */}
                  <motion.g
                    animate={{ x: truckPos.x, y: truckPos.y }}
                    transition={{ duration: 1.6, ease: "easeInOut" }}
                  >
                    {/* Shadow */}
                    <ellipse cx="0" cy="14" rx="20" ry="6" fill="#000000" opacity="0.12" />

                    {/* Truck Base Badge */}
                    <rect 
                      x="-28" 
                      y="-13" 
                      width="56" 
                      height="26" 
                      rx="13" 
                      fill="#087FD1" 
                      stroke="#FFFFFF" 
                      strokeWidth="2.5" 
                      className="shadow-md"
                    />
                    
                    <text x="0" y="3" fill="#FFFFFF" fontSize="9" fontWeight="800" textAnchor="middle">
                      🚛 TRUCK #04
                    </text>
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
