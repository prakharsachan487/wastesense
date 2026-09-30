'use client';

import React from 'react';
import { useWasteSense } from '../../../context/WasteSenseContext';
import { User, Award, ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';

export default function CitizenProfilePage() {
  const { currentUser } = useWasteSense();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Citizen Profile & Eco-Impact</h1>
        <p className="text-xs text-slate-500 mt-1">
          Your civic participation rating, community reports, and municipal reward balance
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0077CC] to-[#0EA5E9] text-white flex items-center justify-center text-3xl shadow-md">
            {currentUser.avatar || 'C'}
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#0F172A]">{currentUser.name}</h2>
            <span className="text-xs text-[#0077CC] font-semibold uppercase tracking-wider">Verified Citizen Resident</span>
            <p className="text-xs text-slate-500">{currentUser.zone}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-200 text-xs">
          <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <Mail className="w-4 h-4 text-slate-400" />
            <span className="text-slate-700 font-medium">{currentUser.email}</span>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <Phone className="w-4 h-4 text-slate-400" />
            <span className="text-slate-700 font-medium">{currentUser.phone || '+91 98112-90123'}</span>
          </div>
        </div>

        {/* Eco Credits Card */}
        <div className="p-4 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[#0077CC] font-bold text-xs uppercase">
              <Award className="w-4 h-4" />
              <span>Eco-Reward Balance</span>
            </div>
            <div className="text-2xl font-mono font-black text-[#0F172A] mt-1">350 Credits</div>
            <p className="text-[11px] text-slate-600">Redeemable for municipal composting kits or bus transit passes.</p>
          </div>
          <button className="px-3.5 py-2 rounded-xl bg-[#0077CC] hover:bg-[#004A80] text-white font-bold text-xs shadow-xs transition active:scale-95">
            Redeem Credits
          </button>
        </div>
      </div>
    </div>
  );
}
