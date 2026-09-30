'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Radio, 
  Battery, 
  Thermometer, 
  Scale, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  Compass, 
  RefreshCw,
  Sparkles,
  Layers
} from 'lucide-react';

interface BinTwin {
  id: string;
  code: string;
  location: string;
  zone: string;
  fill: number;
  weight: number;
  temp: number;
  battery: number;
  status: 'NORMAL' | 'WARNING' | 'CRITICAL';
  lastPing: string;
  tilt: number;
  x: number;
  y: number;
}

const TWIN_BINS: BinTwin[] = [
  {
    id: 'b-102',
    code: 'B-102',
    location: 'Central Market High Street',
    zone: 'Zone A - Commercial Hub',
    fill: 95,
    weight: 18.4,
    temp: 29.0,
    battery: 87,
    status: 'CRITICAL',
    lastPing: '12 sec ago',
    tilt: 0.8,
    x: 180,
    y: 110,
  },
  {
    id: 'b-101',
    code: 'B-101',
    location: 'Metro Terminal Sector 4',
    zone: 'Zone A - Commercial Hub',
    fill: 42,
    weight: 8.6,
    temp: 26.2,
    battery: 94,
    status: 'NORMAL',
    lastPing: '24 sec ago',
    tilt: 0.2,
    x: 80,
    y: 60,
  },
  {
    id: 'b-103',
    code: 'B-103',
    location: 'Civic Plaza Walkway',
    zone: 'Zone A - Commercial Hub',
    fill: 68,
    weight: 12.1,
    temp: 27.8,
    battery: 81,
    status: 'WARNING',
    lastPing: '8 sec ago',
    tilt: 0.4,
    x: 230,
    y: 170,
  },
  {
    id: 'b-104',
    code: 'B-104',
    location: 'Greenbelt Boulevard',
    zone: 'Zone A - Commercial Hub',
    fill: 28,
    weight: 5.4,
    temp: 24.5,
    battery: 98,
    status: 'NORMAL',
    lastPing: '35 sec ago',
    tilt: 0.1,
    x: 110,
    y: 190,
  },
];

export const LandingDigitalTwin: React.FC = () => {
  const [selectedBin, setSelectedBin] = useState<BinTwin>(TWIN_BINS[0]);

  const isCritical = selectedBin.status === 'CRITICAL';
  const isWarning = selectedBin.status === 'WARNING';

  const statusColor = isCritical
    ? 'text-rose-400 bg-rose-950/80 border-rose-800'
    : isWarning
    ? 'text-amber-400 bg-amber-950/80 border-amber-800'
    : 'text-emerald-400 bg-emerald-950/80 border-emerald-800';

  const fillGradient = isCritical
    ? 'from-rose-600 via-rose-500 to-amber-500'
    : isWarning
    ? 'from-amber-500 to-yellow-400'
    : 'from-emerald-500 to-teal-400';

  return (
    <section id="digital-twin" className="py-24 bg-white relative overflow-hidden border-b border-slate-200">
      {/* Background Subtle Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/50 to-white pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-widest mb-3">
            <Layers className="w-3.5 h-3.5 text-[#0077CC]" />
            Asset Telematics & Digital Identity
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] tracking-tight leading-[1.1]">
            Every Bin Has a{' '}
            <span className="bg-gradient-to-r from-[#0077CC] to-[#0EA5E9] bg-clip-text text-transparent">
              Digital Identity.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Not just dumb plastic bins on a street corner: each physical container maintains a continuous, synchronized digital twin with live volumetric fill, weight, temperature, and battery telemetry.
          </p>
        </div>

        {/* Dual Layout: Large 3D Digital Twin Card + Interactive Mini Sector Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT / CENTER: Large 3D Smart Bin Card (Col Span 7) */}
          <div className="lg:col-span-7 rounded-3xl bg-[#0F172A] text-white border border-slate-800 shadow-2xl p-6 sm:p-9 flex flex-col justify-between relative overflow-hidden">
            
            {/* Ambient Corner Glow */}
            <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
              isCritical ? 'bg-rose-500/15' : isWarning ? 'bg-amber-500/15' : 'bg-emerald-500/15'
            }`} />

            {/* Header info */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-[#38BDF8]">
                    <Radio className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xl font-black text-white">
                        {selectedBin.code}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                        {selectedBin.zone}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{selectedBin.location}</div>
                  </div>
                </div>

                <span className={`text-[11px] font-mono font-black uppercase px-3 py-1 rounded-full border ${statusColor}`}>
                  {selectedBin.status}
                </span>
              </div>

              {/* 3D SMART BIN PHYSICAL VISUALIZER */}
              <div className="my-8 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
                
                {/* Stylized 3D Canister Visual */}
                <div className="relative w-40 sm:w-44 h-64 sm:h-72 rounded-3xl bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 p-2.5 border-2 border-slate-700 shadow-2xl flex flex-col justify-end overflow-hidden group">
                  
                  {/* Smart Canister Top Lid */}
                  <div className="absolute top-2 left-3 right-3 h-5 rounded-t-xl bg-slate-700 border-b border-slate-600 flex items-center justify-center">
                    <span className="w-8 h-1 rounded-full bg-slate-500" />
                  </div>

                  {/* Ultrasonic Sensor Beam Effect */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-24 h-16 bg-gradient-to-b from-sky-400/20 to-transparent pointer-events-none" />

                  {/* Animated Volumetric Fill Level Fluid */}
                  <motion.div
                    key={selectedBin.code + selectedBin.fill}
                    initial={{ height: '0%' }}
                    animate={{ height: `${selectedBin.fill}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className={`w-full rounded-2xl bg-gradient-to-t ${fillGradient} relative shadow-lg flex items-center justify-center`}
                  >
                    {/* Fluid Surface Wave Accent */}
                    <div className="absolute -top-1.5 left-0 right-0 h-3 rounded-full bg-white/30 backdrop-blur-xs" />

                    {/* Centered Large Fill Typography */}
                    <div className="font-mono text-2xl sm:text-3xl font-black text-white drop-shadow-md z-10">
                      {selectedBin.fill}%
                    </div>
                  </motion.div>

                  {/* Grid overlay lines on the canister */}
                  <div className="absolute inset-0 pointer-events-none border-t border-b border-slate-700/50 flex flex-col justify-between py-12 px-4 opacity-40">
                    <div className="border-b border-dashed border-slate-600 flex justify-between text-[8px] font-mono text-slate-400">
                      <span>75%</span>
                    </div>
                    <div className="border-b border-dashed border-slate-600 flex justify-between text-[8px] font-mono text-slate-400">
                      <span>50%</span>
                    </div>
                    <div className="border-b border-dashed border-slate-600 flex justify-between text-[8px] font-mono text-slate-400">
                      <span>25%</span>
                    </div>
                  </div>
                </div>

                {/* Live Core Telemetry HUD Badges */}
                <div className="flex-1 w-full space-y-2.5">
                  <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                    <span className="text-xs text-slate-400 flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-amber-400" /> Temperature:
                    </span>
                    <span className="font-mono text-sm font-bold text-white">
                      {selectedBin.temp}°C
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                    <span className="text-xs text-slate-400 flex items-center gap-2">
                      <Scale className="w-4 h-4 text-sky-400" /> Gross Weight:
                    </span>
                    <span className="font-mono text-sm font-bold text-white">
                      {selectedBin.weight} kg
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                    <span className="text-xs text-slate-400 flex items-center gap-2">
                      <Battery className="w-4 h-4 text-emerald-400" /> Battery Health:
                    </span>
                    <span className="font-mono text-sm font-bold text-emerald-400">
                      {selectedBin.battery}% (Solar Backed)
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                    <span className="text-xs text-slate-400 flex items-center gap-2">
                      <Compass className="w-4 h-4 text-indigo-400" /> Container Tilt:
                    </span>
                    <span className="font-mono text-sm font-bold text-slate-200">
                      {selectedBin.tilt}° (Upright)
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Timestamp & Sync */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-sky-400 animate-spin duration-3000" />
                <span>Last Telemetry Sync: <strong className="text-white">{selectedBin.lastPing}</strong></span>
              </span>
              <span className="font-mono text-[11px] text-emerald-400">
                LoRaWAN SF7 &bull; 99.8% Packet Delivery
              </span>
            </div>

          </div>

          {/* RIGHT: Interactive Sector Mini Map (Col Span 5) */}
          <div className="lg:col-span-5 rounded-3xl bg-[#F8FAFC] border border-slate-200 p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#0077CC]" />
                  <span className="font-black text-sm uppercase tracking-wider text-[#0F172A]">
                    Sector 12 &bull; Zone A Assets
                  </span>
                </div>
                <span className="text-[10px] font-mono bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-bold">
                  4 Nodes in Cluster
                </span>
              </div>

              <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                Click any asset node below to inspect its synchronized digital twin parameters:
              </p>

              {/* Stylized Mini Map Grid Canvas */}
              <div className="relative w-full aspect-[4/3] rounded-2xl bg-[#0F172A] border border-slate-800 overflow-hidden shadow-inner mb-6">
                
                {/* Grid Overlay */}
                <div 
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(#38BDF8 1px, transparent 1px)`,
                    backgroundSize: '20px 20px',
                  }}
                />

                {/* Roads on Mini Map */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 240">
                  <path d="M 40 60 L 260 60 L 260 200" stroke="#1E293B" strokeWidth="12" fill="none" />
                  <path d="M 180 30 L 180 210" stroke="#1E293B" strokeWidth="12" fill="none" />
                  <path d="M 40 60 L 260 60 L 260 200" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" fill="none" />
                  <path d="M 180 30 L 180 210" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" fill="none" />

                  {/* Nodes on Mini Map */}
                  {TWIN_BINS.map((b) => {
                    const isCurrent = selectedBin.code === b.code;
                    const nodeColor = b.status === 'CRITICAL' ? '#EF4444' : b.status === 'WARNING' ? '#F59E0B' : '#10B981';

                    return (
                      <g 
                        key={b.code} 
                        transform={`translate(${b.x}, ${b.y})`}
                        onClick={() => setSelectedBin(b)}
                        className="cursor-pointer"
                      >
                        {b.status === 'CRITICAL' && (
                          <circle cx="0" cy="0" r="18" fill="#EF4444" opacity="0.3">
                            <animate attributeName="r" values="8;20;8" dur="2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.4;0.0;0.4" dur="2s" repeatCount="indefinite" />
                          </circle>
                        )}

                        {isCurrent && (
                          <circle cx="0" cy="0" r="14" fill="none" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 3" />
                        )}

                        <circle cx="0" cy="0" r="8" fill="#0F172A" stroke={nodeColor} strokeWidth="2.5" />
                        <circle cx="0" cy="0" r="3" fill={nodeColor} />

                        <text x="12" y="3" fill="#FFFFFF" fontSize="9" fontWeight="bold">
                          {b.code}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Overlay Badge */}
                <div className="absolute top-2 left-2 px-2 py-1 rounded bg-slate-900/80 backdrop-blur-md border border-slate-700 text-[10px] font-mono text-slate-300">
                  Zone A Telemetry Map
                </div>
              </div>

              {/* Node Switcher List */}
              <div className="space-y-2">
                {TWIN_BINS.map((b) => {
                  const isCurrent = selectedBin.code === b.code;
                  return (
                    <button
                      key={b.code}
                      onClick={() => setSelectedBin(b)}
                      className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                        isCurrent
                          ? 'bg-white border-[#0077CC] shadow-xs ring-1 ring-[#0077CC]'
                          : 'bg-white/60 border-slate-200 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${
                          b.status === 'CRITICAL' ? 'bg-rose-500 animate-ping' :
                          b.status === 'WARNING' ? 'bg-amber-500' : 'bg-emerald-500'
                        }`} />
                        <div>
                          <span className="font-mono text-xs font-bold text-[#0F172A]">
                            {b.code}
                          </span>
                          <span className="text-[11px] text-slate-500 ml-2">
                            {b.location}
                          </span>
                        </div>
                      </div>

                      <span className={`font-mono text-xs font-bold ${
                        b.fill >= 85 ? 'text-rose-600' : b.fill >= 60 ? 'text-amber-600' : 'text-emerald-600'
                      }`}>
                        {b.fill}% Full
                      </span>
                    </button>
                  );
                })}
              </div>

            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Sensor Mesh: 100% Online</span>
              <span className="text-[#0077CC] font-bold">Encrypted Telemetry</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
