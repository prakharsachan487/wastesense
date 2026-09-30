'use client';

import React from 'react';
import { useWasteSense } from '../../../context/WasteSenseContext';
import { User, Award, ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';

export default function CitizenProfilePage() {
  const { currentUser } = useWasteSense();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-black text-white tracking-tight">Citizen Profile & Eco-Impact</h1>
        <p className="text-xs text-slate-400 mt-1">
          Your civic participation rating, community reports, and municipal reward balance
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-sky-600 flex items-center justify-center text-3xl shadow-lg">
            {currentUser.avatar || '🧑'}
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{currentUser.name}</h2>
            <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">Verified Citizen Resident</span>
            <p className="text-xs text-slate-400">{currentUser.zone}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-xs">
          <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800">
            <Mail className="w-4 h-4 text-slate-400" />
            <span className="text-slate-300">{currentUser.email}</span>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800">
            <Phone className="w-4 h-4 text-slate-400" />
            <span className="text-slate-300">{currentUser.phone || '+91 98112-90123'}</span>
          </div>
        </div>

        {/* Eco Credits Card */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-teal-950/40 border border-emerald-800/40 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs uppercase">
              <Award className="w-4 h-4" />
              <span>Eco-Reward Balance</span>
            </div>
            <div className="text-2xl font-mono font-black text-white mt-1">350 Credits</div>
            <p className="text-[11px] text-slate-400">Redeemable for municipal composting kits or bus transit passes.</p>
          </div>
          <button className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition">
            Redeem Credits
          </button>
        </div>
      </div>
    </div>
  );
}
