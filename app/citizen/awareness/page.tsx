'use client';

import React, { useState } from 'react';
import { BookOpen, CheckCircle2, AlertTriangle, Sparkles, Leaf, Package, AlertOctagon, Monitor, Lightbulb } from 'lucide-react';

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
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Waste Segregation & Civic Awareness Guide</h1>
        <p className="text-xs text-slate-500 mt-1">
          Proper segregation at source reduces municipal landfill dumping by up to 65%
        </p>
      </div>

      {/* 4 Colored Waste Stream Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 1. Green Bin - Wet Waste */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-600 tracking-wider uppercase">Green Bin</span>
              <h3 className="text-base font-bold text-[#0F172A]">Wet & Biodegradable Waste</h3>
            </div>
          </div>
          <p className="text-xs text-slate-600">
            Kitchen scraps, fruit & vegetable peels, eggshells, leftover food, tea leaves, and garden leaves.
          </p>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
            <strong className="text-[#0F172A]">Where it goes:</strong> Converted at decentralized biomethanation plants into clean cooking gas and nutrient-rich organic compost.
          </div>
        </div>

        {/* 2. Blue Bin - Dry Recyclables */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#F0F9FF] text-[#0077CC] border border-[#BAE6FD]">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#0077CC] tracking-wider uppercase">Blue Bin</span>
              <h3 className="text-base font-bold text-[#0F172A]">Dry & Recyclable Materials</h3>
            </div>
          </div>
          <p className="text-xs text-slate-600">
            Cardboard boxes, paper, plastic containers, beverage cans, glass bottles, and tin foil.
          </p>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
            <strong className="text-[#0F172A]">Where it goes:</strong> Sorted at municipal Material Recovery Facilities (MRF) and reprocessed into industrial raw materials.
          </div>
        </div>

        {/* 3. Red Bin - Hazardous */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-200">
              <AlertOctagon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-rose-600 tracking-wider uppercase">Red Bin</span>
              <h3 className="text-base font-bold text-[#0F172A]">Domestic Hazardous Waste</h3>
            </div>
          </div>
          <p className="text-xs text-slate-600">
            Expired medications, paint cans, solvent bottles, mosquito repellents, thermometers, and sanitizing chemicals.
          </p>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
            <strong className="text-[#0F172A]">Where it goes:</strong> Handled by certified HazMat collection vehicles for safe neutral incineration.
          </div>
        </div>

        {/* 4. Orange Bin - E-Waste */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
              <Monitor className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-600 tracking-wider uppercase">Orange Bin</span>
              <h3 className="text-base font-bold text-[#0F172A]">Electronic Waste (E-Waste)</h3>
            </div>
          </div>
          <p className="text-xs text-slate-600">
            Mobile chargers, dead batteries, discarded PCBs, obsolete cellphones, earphones, and cables.
          </p>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
            <strong className="text-[#0F172A]">Where it goes:</strong> Refurbishing centers and precious rare-earth extraction facilities.
          </div>
        </div>
      </div>

      {/* Interactive AI Segregation Helper Widget */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#0077CC]" />
          <h3 className="text-sm font-bold text-[#0F172A]">Smart Segregation Assistant (Interactive Tester)</h3>
        </div>
        <p className="text-xs text-slate-500">
          Click an item to see its verified classification and disposal guidelines:
        </p>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedItem('banana_peel')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              selectedItem === 'banana_peel' ? 'bg-[#0077CC] text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Banana Peels
          </button>
          <button
            onClick={() => setSelectedItem('plastic_bottle')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              selectedItem === 'plastic_bottle' ? 'bg-[#0077CC] text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Plastic PET Bottle
          </button>
          <button
            onClick={() => setSelectedItem('battery')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              selectedItem === 'battery' ? 'bg-[#0077CC] text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Lithium Battery
          </button>
          <button
            onClick={() => setSelectedItem('sanitary')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              selectedItem === 'sanitary' ? 'bg-[#0077CC] text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Paint & Solvents
          </button>
        </div>

        {active && (
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm text-[#0F172A]">{active.name}</span>
              <span className="font-bold text-xs uppercase px-2 py-0.5 rounded bg-white border border-slate-200 text-[#0077CC]">{active.binColor}</span>
            </div>
            <p className="text-xs text-slate-700"><strong className="text-[#0F172A]">Stream:</strong> {active.stream}</p>
            <p className="text-xs text-slate-600 pt-1 border-t border-slate-200"><Lightbulb className="w-3 h-3 text-amber-500 inline mr-1" />{active.tip}</p>
          </div>
        )}
      </div>
    </div>
  );
}
