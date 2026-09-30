'use client';

import React, { useState } from 'react';
import { BookOpen, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

export default function CitizenAwarenessPage() {
  const [selectedItem, setSelectedItem] = useState('banana_peel');

  const segregationItems: Record<string, { name: string; stream: string; binColor: string; colorClass: string; tip: string }> = {
    banana_peel: {
      name: 'Fruit Peels & Food Waste',
      stream: 'Organic / Wet Waste',
      binColor: 'Green Bin',
      colorClass: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30',
      tip: 'Deposit in municipal Green Bins. Converted into organic fertilizer and biomethane.'
    },
    plastic_bottle: {
      name: 'PET Beverage Bottle',
      stream: 'Dry Recyclable Waste',
      binColor: 'Blue Bin',
      colorClass: 'text-sky-400 border-sky-500/40 bg-sky-950/30',
      tip: 'Rinse with leftover water, compress bottle flat, and screw cap back on before Blue Bin disposal.'
    },
    battery: {
      name: 'Lithium Battery / E-Waste',
      stream: 'Domestic E-Waste Stream',
      binColor: 'Orange Bin / E-Waste Kiosk',
      colorClass: 'text-amber-400 border-amber-500/40 bg-amber-950/30',
      tip: 'Do NOT toss into regular bins! Tape the battery terminals to prevent short circuit fires and drop at certified kiosk.'
    },
    sanitary: {
      name: 'Medicines & Disinfectants',
      stream: 'Domestic Hazardous Waste',
      binColor: 'Red Hazardous Bin',
      colorClass: 'text-rose-400 border-rose-500/40 bg-rose-950/30',
      tip: 'Wrap securely in labeled bag. Hand over separately to avoid chemical contamination of municipal aquifers.'
    }
  };

  const active = segregationItems[selectedItem];

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-black text-white tracking-tight">Waste Segregation & Civic Awareness Guide</h1>
        <p className="text-xs text-slate-400 mt-1">
          Proper segregation at source reduces municipal landfill dumping by up to 65%
        </p>
      </div>

      {/* 4 Colored Waste Stream Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 1. Green Bin - Wet Waste */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/40 shadow-xl space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🍏</span>
            <div>
              <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">Green Bin</span>
              <h3 className="text-base font-bold text-white">Wet & Biodegradable Waste</h3>
            </div>
          </div>
          <p className="text-xs text-slate-300">
            Kitchen scraps, fruit & vegetable peels, eggshells, leftover food, tea leaves, and garden leaves.
          </p>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
            <strong>Where it goes:</strong> Converted at decentralized biomethanation plants into clean cooking gas and nutrient-rich organic compost.
          </div>
        </div>

        {/* 2. Blue Bin - Dry Recyclables */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-950/40 via-slate-900 to-slate-900 border border-sky-500/40 shadow-xl space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📦</span>
            <div>
              <span className="text-xs font-bold text-sky-400 tracking-wider uppercase">Blue Bin</span>
              <h3 className="text-base font-bold text-white">Dry & Recyclable Materials</h3>
            </div>
          </div>
          <p className="text-xs text-slate-300">
            Cardboard boxes, paper, plastic containers, beverage cans, glass bottles, and tin foil.
          </p>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
            <strong>Where it goes:</strong> Sorted at municipal Material Recovery Facilities (MRF) and reprocessed into industrial raw materials.
          </div>
        </div>

        {/* 3. Red Bin - Hazardous */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-950/40 via-slate-900 to-slate-900 border border-rose-500/40 shadow-xl space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">☣️</span>
            <div>
              <span className="text-xs font-bold text-rose-400 tracking-wider uppercase">Red Bin</span>
              <h3 className="text-base font-bold text-white">Domestic Hazardous Waste</h3>
            </div>
          </div>
          <p className="text-xs text-slate-300">
            Expired medications, paint cans, solvent bottles, mosquito repellents, thermometers, and sanitizing chemicals.
          </p>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
            <strong>Where it goes:</strong> Handled by certified HazMat collection vehicles for safe neutral incineration.
          </div>
        </div>

        {/* 4. Orange Bin - E-Waste */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/40 shadow-xl space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">💻</span>
            <div>
              <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">Orange Bin</span>
              <h3 className="text-base font-bold text-white">Electronic Waste (E-Waste)</h3>
            </div>
          </div>
          <p className="text-xs text-slate-300">
            Mobile chargers, dead batteries, discarded PCBs, obsolete cellphones, earphones, and cables.
          </p>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
            <strong>Where it goes:</strong> Refurbishing centers and precious rare-earth extraction facilities.
          </div>
        </div>
      </div>

      {/* Interactive AI Segregation Helper Widget */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="text-sm font-bold text-white">AI Segregation Assistant (Interactive Tester)</h3>
        </div>
        <p className="text-xs text-slate-400">
          Click an item to see its verified classification and disposal guidelines:
        </p>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedItem('banana_peel')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              selectedItem === 'banana_peel' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            🍌 Banana Peels
          </button>
          <button
            onClick={() => setSelectedItem('plastic_bottle')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              selectedItem === 'plastic_bottle' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            🧴 Plastic PET Bottle
          </button>
          <button
            onClick={() => setSelectedItem('battery')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              selectedItem === 'battery' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            🔋 Lithium Battery
          </button>
          <button
            onClick={() => setSelectedItem('sanitary')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              selectedItem === 'sanitary' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            🧪 Paint & Solvents
          </button>
        </div>

        {active && (
          <div className={`p-4 rounded-xl border ${active.colorClass} space-y-1.5`}>
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm text-white">{active.name}</span>
              <span className="font-bold text-xs uppercase px-2 py-0.5 rounded bg-black/40">{active.binColor}</span>
            </div>
            <p className="text-xs text-slate-200"><strong>Stream:</strong> {active.stream}</p>
            <p className="text-xs text-slate-300 pt-1 border-t border-white/10">💡 {active.tip}</p>
          </div>
        )}
      </div>
    </div>
  );
}
