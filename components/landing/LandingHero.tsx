'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
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
  Compass,
  Cpu
} from 'lucide-react';

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
    x: 520,
    y: 220,
  },
  {
    id: 'bin-101',
    code: 'B-101',
    name: 'Metro Terminal',
    zone: 'Sector 4',
    fill: 42,
    temp: 26.2,
    battery: 92,
    weight: 8.6,
    status: 'NORMAL',
    x: 230,
    y: 130,
  },
  {
    id: 'bin-103',
    code: 'B-103',
    name: 'Civic Plaza',
    zone: 'Sector 9',
    fill: 68,
    temp: 27.8,
    battery: 79,
    weight: 12.1,
    status: 'WARNING',
    x: 680,
    y: 350,
  },
  {
    id: 'bin-104',
    code: 'B-104',
    name: 'Greenbelt Park',
    zone: 'Sector 15',
    fill: 28,
    temp: 24.5,
    battery: 95,
    weight: 5.4,
    status: 'NORMAL',
    x: 320,
    y: 400,
  },
];

export const LandingHero: React.FC = () => {
  const [nodes, setNodes] = useState<BinNode[]>(INITIAL_NODES);
  const [selectedNode, setSelectedNode] = useState<BinNode>(INITIAL_NODES[0]);
  const [simState, setSimState] = useState<'IDLE' | 'ANALYZING' | 'DISPATCHED' | 'COLLECTING' | 'RESOLVED'>('IDLE');
  const [truckPos, setTruckPos] = useState({ x: 130, y: 300 }); // Depot position

  // Simulation Runner
  const runSimulation = () => {
    if (simState !== 'IDLE' && simState !== 'RESOLVED') return;

    // Reset B-102 to Critical
    setNodes(prev => prev.map(n => n.code === 'B-102' ? { ...n, fill: 95, status: 'CRITICAL' } : n));
    setSelectedNode(prev => prev.code === 'B-102' ? { ...prev, fill: 95, status: 'CRITICAL' } : prev);
    setTruckPos({ x: 130, y: 300 });
    setSimState('ANALYZING');

    setTimeout(() => {
      setSimState('DISPATCHED');
      // Truck moves along isometric road to B-102 (520, 220)
      setTruckPos({ x: 490, y: 230 });
    }, 1300);

    setTimeout(() => {
      setSimState('COLLECTING');
    }, 3100);

    setTimeout(() => {
      // Empty B-102 to clean
      setNodes(prev => prev.map(n => n.code === 'B-102' ? { ...n, fill: 18, status: 'COLLECTED' } : n));
      setSelectedNode(prev => prev.code === 'B-102' ? { ...prev, fill: 18, status: 'COLLECTED' } : prev);
      setSimState('RESOLVED');
    }, 4800);
  };

  const resetSimulation = () => {
    setNodes(INITIAL_NODES);
    setSelectedNode(INITIAL_NODES[0]);
    setTruckPos({ x: 130, y: 300 });
    setSimState('IDLE');
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-[#F0F7FF] via-[#F8FAFC] to-[#FFFFFF]">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(0, 119, 204, 0.12) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      {/* Ambient Radial Spotlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[380px] bg-gradient-to-tr from-sky-200/40 via-blue-100/30 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Mission & Core Value */}
          <div className="lg:col-span-5 text-left">
            {/* System Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-sky-200 shadow-xs mb-6 text-xs font-semibold text-[#004A80]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0077CC]"></span>
              </span>
              <span className="text-[#0077CC] font-black uppercase tracking-wider text-[10px]">
                A Living Digital Twin of a Cleaner City
              </span>
            </div>

            {/* Overline */}
            <div className="text-xs font-black tracking-widest text-slate-500 uppercase mb-2">
              Smart Waste Intelligence Platform
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0F172A] leading-[1.08]">
              Sense. Predict.{' '}
              <span className="bg-gradient-to-r from-[#0077CC] via-[#0EA5E9] to-[#004A80] bg-clip-text text-transparent">
                Prioritize. Collect.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              AI-powered waste intelligence connecting citizens, smart bins and sanitation teams in one real-time command platform.
            </p>

            {/* CTA Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                href="/admin/dashboard"
                className="px-6 py-3.5 rounded-2xl bg-[#0077CC] hover:bg-[#004A80] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#0077CC]/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group"
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

          {/* RIGHT COLUMN: Ultra-Premium Isometric 3D Living Digital Twin */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl p-3 sm:p-5 bg-white border border-slate-200/90 shadow-2xl shadow-slate-900/10">
              
              {/* Header Bar of Digital Twin Canvas */}
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 px-2">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-black uppercase tracking-wider text-[#0F172A]">
                    Central Municipality &bull; Sector 12 3D Mesh
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={runSimulation}
                    disabled={simState === 'ANALYZING' || simState === 'DISPATCHED' || simState === 'COLLECTING'}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                      simState === 'IDLE' || simState === 'RESOLVED'
                        ? 'bg-[#0077CC] hover:bg-[#004A80] text-white active:scale-95'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>{simState === 'RESOLVED' ? 'Re-run Route' : 'Simulate Overflow & Route'}</span>
                  </button>

                  {simState === 'RESOLVED' && (
                    <button
                      onClick={resetSimulation}
                      title="Reset Twin"
                      className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Status Banner */}
              <div className="mb-3 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs font-medium">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Pipeline State:</span>
                  {simState === 'IDLE' && (
                    <span className="font-bold text-slate-700 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-slate-400" /> Continuous IoT Radar Polling
                    </span>
                  )}
                  {simState === 'ANALYZING' && (
                    <span className="font-bold text-amber-600 flex items-center gap-1 animate-pulse">
                      <Activity className="w-3.5 h-3.5" /> AI Priority Engine Evaluating Node B-102 (95/100)
                    </span>
                  )}
                  {simState === 'DISPATCHED' && (
                    <span className="font-bold text-[#0077CC] flex items-center gap-1">
                      <Navigation className="w-3.5 h-3.5 animate-spin" /> Truck #04 En Route via Dynamic Waypoint
                    </span>
                  )}
                  {simState === 'COLLECTING' && (
                    <span className="font-bold text-indigo-600 flex items-center gap-1 animate-pulse">
                      <Truck className="w-3.5 h-3.5" /> Geofence Verified &bull; Emptying Bin B-102
                    </span>
                  )}
                  {simState === 'RESOLVED' && (
                    <span className="font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Closed-Loop Complete &bull; B-102 Reset to 18%
                    </span>
                  )}
                </div>

                <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                  LoRa SF7 &bull; -72 dBm
                </span>
              </div>

              {/* 3D ISOMETRIC CYBER CITY CANVAS */}
              <div className="relative w-full aspect-[16/10] bg-[#020617] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl select-none">
                
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 860 520" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    {/* Glowing Filters */}
                    <filter id="cyberGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    <filter id="alertGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    {/* Linear Gradients for 3D Faces */}
                    <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0B132B" />
                      <stop offset="100%" stopColor="#1C2541" />
                    </linearGradient>

                    <linearGradient id="routeBeam" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0077CC" />
                      <stop offset="50%" stopColor="#0EA5E9" />
                      <stop offset="100%" stopColor="#38BDF8" />
                    </linearGradient>

                    <linearGradient id="headlightBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* 1. PERSPECTIVE ISOMETRIC FLOOR GRID */}
                  <g opacity="0.2" stroke="#38BDF8" strokeWidth="0.8">
                    {/* Isometric Slanted Axis Lines */}
                    {[0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840].map((x) => (
                      <line key={`iso-1-${x}`} x1={x} y1="0" x2={x - 200} y2="520" strokeDasharray="3 3" />
                    ))}
                    {[0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500].map((y) => (
                      <line key={`iso-2-${y}`} x1="0" y1={y} x2="860" y2={y + 120} strokeDasharray="3 3" />
                    ))}
                  </g>

                  {/* 2. ROTATING 360° MESH SCANNER RADAR BEAM */}
                  <g transform="translate(430, 260)">
                    <circle cx="0" cy="0" r="180" fill="none" stroke="#0077CC" strokeWidth="1" strokeDasharray="4 8" opacity="0.2" />
                    <circle cx="0" cy="0" r="280" fill="none" stroke="#0EA5E9" strokeWidth="1" strokeDasharray="2 6" opacity="0.1" />
                    <circle cx="0" cy="0" r="80" fill="none" stroke="#38BDF8" strokeWidth="1" opacity="0.2" />
                    {/* Animated Rotating Sweep Arc */}
                    <g>
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0"
                        to="360"
                        dur="14s"
                        repeatCount="indefinite"
                      />
                      <path d="M 0 0 L 260 -60 A 280 280 0 0 1 260 60 Z" fill="#38BDF8" opacity="0.04" />
                      <line x1="0" y1="0" x2="260" y2="0" stroke="#38BDF8" strokeWidth="1.5" opacity="0.3" />
                    </g>
                  </g>

                  {/* 3. ISOMETRIC HIGHWAY & STREET ARTERIALS */}
                  <g stroke="#0F172A" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M 90 300 L 360 300 L 520 220 L 780 220" />
                    <path d="M 230 90 L 230 300 L 320 400 L 580 400" />
                    <path d="M 520 220 L 680 350 L 780 350" />
                  </g>
                  {/* Road Asphalt Inner Layer */}
                  <g stroke="#1E293B" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M 90 300 L 360 300 L 520 220 L 780 220" />
                    <path d="M 230 90 L 230 300 L 320 400 L 580 400" />
                    <path d="M 520 220 L 680 350 L 780 350" />
                  </g>
                  {/* Animated Center Telemetry Neon Line */}
                  <g stroke="#0EA5E9" strokeWidth="2" strokeDasharray="8 12" fill="none" opacity="0.7">
                    <path d="M 90 300 L 360 300 L 520 220 L 780 220">
                      <animate attributeName="stroke-dashoffset" values="40;0" dur="2s" repeatCount="indefinite" />
                    </path>
                    <path d="M 230 90 L 230 300 L 320 400 L 580 400">
                      <animate attributeName="stroke-dashoffset" values="40;0" dur="2s" repeatCount="indefinite" />
                    </path>
                    <path d="M 520 220 L 680 350 L 780 350">
                      <animate attributeName="stroke-dashoffset" values="40;0" dur="2s" repeatCount="indefinite" />
                    </path>
                  </g>

                  {/* 4. REAL 3D ISOMETRIC ARCHITECTURAL BUILDINGS */}
                  
                  {/* BUILDING 1: Commercial Hub Tower A (Tall 3D Isometric Skyscraper) */}
                  <g transform="translate(390, 70)">
                    {/* Shadow */}
                    <polygon points="0,85 70,50 140,85 70,120" fill="#000000" opacity="0.4" />
                    {/* Left Front Face */}
                    <polygon points="10,40 60,65 60,115 10,90" fill="#0F172A" stroke="#1E293B" strokeWidth="1" />
                    {/* Right Front Face */}
                    <polygon points="60,65 110,40 110,90 60,115" fill="#1E293B" stroke="#334155" strokeWidth="1" />
                    {/* Top Roof Face */}
                    <polygon points="60,15 110,40 60,65 10,40" fill="#334155" stroke="#475569" strokeWidth="1" />
                    {/* Illuminated Window Matrix */}
                    <circle cx="35" cy="65" r="2" fill="#38BDF8" opacity="0.8" />
                    <circle cx="45" cy="70" r="2" fill="#38BDF8" opacity="0.8" />
                    <circle cx="35" cy="78" r="2" fill="#38BDF8" opacity="0.8" />
                    <circle cx="85" cy="65" r="2" fill="#38BDF8" opacity="0.8" />
                    <circle cx="75" cy="70" r="2" fill="#38BDF8" opacity="0.8" />
                    {/* Rooftop Helipad / Antenna */}
                    <line x1="60" y1="15" x2="60" y2="0" stroke="#94A3B8" strokeWidth="2" />
                    <circle cx="60" cy="0" r="3" fill="#EF4444">
                      <animate attributeName="opacity" values="1;0.2;1" dur="1.2s" repeatCount="indefinite" />
                    </circle>
                    <text x="60" y="45" fill="#38BDF8" fontSize="8" fontWeight="bold" textAnchor="middle">HUB A</text>
                  </g>

                  {/* BUILDING 2: Tech Park 09 (Tiered Isometric Complex) */}
                  <g transform="translate(590, 190)">
                    {/* Shadow */}
                    <polygon points="0,65 60,35 120,65 60,95" fill="#000000" opacity="0.4" />
                    {/* Left Face */}
                    <polygon points="10,35 55,55 55,95 10,75" fill="#0F172A" stroke="#1E293B" strokeWidth="1" />
                    {/* Right Face */}
                    <polygon points="55,55 100,35 100,75 55,95" fill="#1E293B" stroke="#334155" strokeWidth="1" />
                    {/* Top Face */}
                    <polygon points="55,15 100,35 55,55 10,35" fill="#334155" stroke="#475569" strokeWidth="1" />
                    {/* Solar Panel Accent */}
                    <polygon points="55,22 85,35 55,48 25,35" fill="#0077CC" opacity="0.4" />
                    <text x="55" y="75" fill="#94A3B8" fontSize="8" fontWeight="bold" textAnchor="middle">TECH 09</text>
                  </g>

                  {/* BUILDING 3: Metro Transit Terminal */}
                  <g transform="translate(130, 80)">
                    {/* Shadow */}
                    <polygon points="0,55 50,30 100,55 50,80" fill="#000000" opacity="0.4" />
                    <polygon points="10,30 50,50 50,80 10,60" fill="#0F172A" stroke="#1E293B" strokeWidth="1" />
                    <polygon points="50,50 90,30 90,60 50,80" fill="#1E293B" stroke="#334155" strokeWidth="1" />
                    <polygon points="50,10 90,30 50,50 10,30" fill="#334155" stroke="#475569" strokeWidth="1" />
                    <text x="50" y="32" fill="#38BDF8" fontSize="8" fontWeight="bold" textAnchor="middle">METRO</text>
                  </g>

                  {/* BUILDING 4: Sector 12 Residential Smart Complex */}
                  <g transform="translate(360, 320)">
                    <polygon points="0,60 65,30 130,60 65,90" fill="#000000" opacity="0.4" />
                    <polygon points="10,35 65,60 65,95 10,70" fill="#0F172A" stroke="#1E293B" strokeWidth="1" />
                    <polygon points="65,60 120,35 120,70 65,95" fill="#1E293B" stroke="#334155" strokeWidth="1" />
                    <polygon points="65,10 120,35 65,60 10,35" fill="#334155" stroke="#475569" strokeWidth="1" />
                    <text x="65" y="37" fill="#94A3B8" fontSize="8" fontWeight="bold" textAnchor="middle">SECTOR 12</text>
                  </g>

                  {/* BUILDING 5: Municipal Sanitation Fleet Base (Depot #01) */}
                  <g transform="translate(70, 240)">
                    <polygon points="0,80 60,45 120,80 60,115" fill="#000000" opacity="0.4" />
                    <polygon points="10,45 60,70 60,105 10,80" fill="#0A192F" stroke="#0077CC" strokeWidth="1.5" />
                    <polygon points="60,70 110,45 110,80 60,105" fill="#0F172A" stroke="#0077CC" strokeWidth="1.5" />
                    <polygon points="60,20 110,45 60,70 10,45" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" />
                    {/* Glowing Bay Doors */}
                    <rect x="25" y="65" width="20" height="25" rx="3" fill="#0077CC" opacity="0.3" />
                    <text x="60" y="47" fill="#38BDF8" fontSize="9" fontWeight="black" textAnchor="middle">DEPOT #01</text>
                    <text x="60" y="60" fill="#64748B" fontSize="7" textAnchor="middle">Fleet Hangar</text>
                  </g>

                  {/* 5. AI DYNAMIC CYBER ROUTE VECTOR (Drawn when Dispatched) */}
                  {(simState === 'DISPATCHED' || simState === 'COLLECTING' || simState === 'RESOLVED') && (
                    <g>
                      <motion.path
                        d="M 130 300 L 360 300 L 520 220"
                        fill="none"
                        stroke="url(#routeBeam)"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray="10 10"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        filter="url(#cyberGlow)"
                      />
                      {/* Trailing Energy Pulse */}
                      <circle r="4" fill="#FFFFFF">
                        <animateMotion path="M 130 300 L 360 300 L 520 220" dur="2s" repeatCount="indefinite" />
                      </circle>
                    </g>
                  )}

                  {/* 6. HOLOGRAPHIC 3D SMART BIN NODES */}
                  {nodes.map((node) => {
                    const isSelected = selectedNode.code === node.code;
                    const isCritical = node.status === 'CRITICAL';
                    const isWarning = node.status === 'WARNING';
                    const isCollected = node.status === 'COLLECTED';

                    let color = '#10B981'; // Green
                    if (isCritical) color = '#EF4444'; // Red
                    if (isWarning) color = '#F59E0B'; // Amber
                    if (isCollected) color = '#06B6D4'; // Cyan

                    return (
                      <g 
                        key={node.code} 
                        transform={`translate(${node.x}, ${node.y})`}
                        onClick={() => setSelectedNode(node)}
                        className="cursor-pointer group"
                      >
                        {/* Hexagonal Isometric Base Ring */}
                        <polygon
                          points="-16,0 -8,-10 8,-10 16,0 8,10 -8,10"
                          fill="none"
                          stroke={color}
                          strokeWidth="1.5"
                          opacity="0.6"
                        />

                        {/* Critical Radar Beacon Shooting Upwards */}
                        {isCritical && (
                          <g>
                            <line x1="0" y1="0" x2="0" y2="-45" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 3" filter="url(#alertGlow)" />
                            <circle cx="0" cy="-45" r="4" fill="#EF4444" />
                            {/* Expanding Shockwaves */}
                            <circle cx="0" cy="0" r="26" fill={color} opacity="0.25">
                              <animate attributeName="r" values="10;36;10" dur="1.8s" repeatCount="indefinite" />
                              <animate attributeName="opacity" values="0.4;0.0;0.4" dur="1.8s" repeatCount="indefinite" />
                            </circle>
                          </g>
                        )}

                        {/* Selection Halo */}
                        {isSelected && (
                          <circle cx="0" cy="0" r="18" fill="none" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4 4" />
                        )}

                        {/* 3D Node Capsule */}
                        <circle cx="0" cy="0" r="10" fill="#0A192F" stroke={color} strokeWidth="3" filter="url(#cyberGlow)" />
                        <circle cx="0" cy="0" r="4" fill={color} />

                        {/* Hologram Tooltip Flag */}
                        <g transform="translate(0, -26)">
                          <rect x="-38" y="-12" width="76" height="20" rx="6" fill="#020617" stroke={color} strokeWidth="1" opacity="0.95" />
                          <text x="0" y="1" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">
                            {node.code} &bull; {node.fill}%
                          </text>
                        </g>
                      </g>
                    );
                  })}

                  {/* 7. ISOMETRIC SANITATION TRUCK WITH HEADLIGHTS */}
                  <motion.g
                    animate={{ x: truckPos.x, y: truckPos.y }}
                    transition={{ duration: 1.6, ease: "easeInOut" }}
                  >
                    {/* Glowing Headlight Cones projecting forward onto road */}
                    <polygon points="12,-5 55,-20 55,20 12,5" fill="url(#headlightBeam)" />

                    {/* Truck Base Shadow */}
                    <ellipse cx="0" cy="8" rx="20" ry="8" fill="#000000" opacity="0.5" />

                    {/* Isometric EV Compactor Body */}
                    <rect x="-16" y="-12" width="32" height="22" rx="6" fill="#0077CC" stroke="#38BDF8" strokeWidth="2" />
                    {/* Cab windshield */}
                    <rect x="4" y="-9" width="10" height="16" rx="3" fill="#38BDF8" opacity="0.8" />
                    
                    {/* Flashing Beacon */}
                    <circle cx="-10" cy="-12" r="3" fill="#FBBF24">
                      <animate attributeName="opacity" values="1;0.3;1" dur="0.8s" repeatCount="indefinite" />
                    </circle>

                    {/* Wheels */}
                    <circle cx="-10" cy="11" r="3.5" fill="#334155" />
                    <circle cx="8" cy="11" r="3.5" fill="#334155" />

                    {/* Truck Identifier Badge */}
                    <g transform="translate(0, -22)">
                      <rect x="-34" y="-10" width="68" height="16" rx="5" fill="#0284C7" stroke="#38BDF8" strokeWidth="1" />
                      <text x="0" y="2" fill="#FFFFFF" fontSize="8" fontWeight="black" textAnchor="middle">
                        TRUCK #04
                      </text>
                    </g>
                  </motion.g>

                </svg>
              </div>

              {/* DOCKED NODE TELEMETRY INSPECTOR BAR (BELOW CANVAS - ZERO OVERLAP) */}
              <div className="mt-3 p-3 sm:p-3.5 rounded-2xl bg-[#0B0F19] border border-slate-800 text-left text-white shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-2.5 h-2.5 rounded-full ${
                      selectedNode.status === 'CRITICAL' ? 'bg-rose-500 animate-ping' :
                      selectedNode.status === 'WARNING' ? 'bg-amber-400' :
                      selectedNode.status === 'COLLECTED' ? 'bg-cyan-400' : 'bg-emerald-400'
                    }`} />
                    <span className="font-mono font-bold text-xs text-white">
                      {selectedNode.code} &bull; {selectedNode.name}
                    </span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${
                      selectedNode.status === 'CRITICAL' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                      selectedNode.status === 'WARNING' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                      selectedNode.status === 'COLLECTED' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' :
                      'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}>
                      {selectedNode.status}
                    </span>
                  </div>

                  {/* Telemetry Metrics */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px]">
                      Fill: <strong className={selectedNode.fill >= 85 ? 'text-rose-400' : selectedNode.fill >= 60 ? 'text-amber-400' : 'text-sky-400'}>{selectedNode.fill}%</strong>
                    </span>
                    <span className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-300">
                      {selectedNode.temp}°C
                    </span>
                    <span className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-emerald-400">
                      🔋 {selectedNode.battery}%
                    </span>
                    <span className="hidden sm:inline-block px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
                      {selectedNode.zone} &bull; {selectedNode.weight} kg
                    </span>
                  </div>
                </div>
              </div>

              {/* Caption Under Canvas */}
              <div className="mt-3 flex items-center justify-between px-2 text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#0077CC]" />
                  <span>Click any node (B-101, B-102, B-103, B-104) to inspect 3D telemetry in real-time.</span>
                </span>
                <span className="hidden sm:inline font-mono text-[10px] text-slate-400">
                  LoRaWAN Mesh Protocol v2.4
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
