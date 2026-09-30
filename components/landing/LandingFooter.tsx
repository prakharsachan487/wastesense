'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Lock, Award, ArrowUp, Radio } from 'lucide-react';

export const LandingFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#020617] border-t border-slate-900 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand & Mission (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#004A80] to-[#0077CC] flex items-center justify-center text-white font-bold shadow-md shadow-[#0077CC]/25">
                <Shield className="w-4 h-4" />
              </div>
              <span className="text-base font-black tracking-wider text-white">
                WASTE<span className="text-[#38BDF8]">SENSE</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-sky-500/30 text-sky-400 bg-sky-950/60">
                v2.4
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Autonomous Smart Waste Intelligence Platform engineered for municipal smart cities. Unifying IoT sensory telematics, predictive overflow forecasts, civic grievance intake, and field operator fleet dispatch.
            </p>

            <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Live Mesh Online
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-sky-400" />
                <span>256-Bit SSL Encrypted</span>
              </span>
            </div>
          </div>

          {/* Platform Architecture (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2">
              <li><a href="#solutions" className="hover:text-sky-400 transition-colors">Problem &amp; Solution</a></li>
              <li><a href="#how-it-works" className="hover:text-sky-400 transition-colors">5-Stage System Flow</a></li>
              <li><a href="#demo" className="hover:text-sky-400 transition-colors">AI Decision Demo</a></li>
              <li><a href="#digital-twin" className="hover:text-sky-400 transition-colors">Smart Bin Digital Twin</a></li>
              <li><a href="#closed-loop" className="hover:text-sky-400 transition-colors">Closed-Loop Circuit</a></li>
            </ul>
          </div>

          {/* Role Portals (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Role Portals</h4>
            <ul className="space-y-2">
              <li><Link href="/admin/dashboard" className="hover:text-sky-400 transition-colors">Admin Command</Link></li>
              <li><Link href="/citizen/dashboard" className="hover:text-sky-400 transition-colors">Citizen Services</Link></li>
              <li><Link href="/worker/dashboard" className="hover:text-sky-400 transition-colors">Sanitation Fleet</Link></li>
              <li><a href="#awareness" className="hover:text-sky-400 transition-colors">Waste Awareness</a></li>
              <li><a href="#impact" className="hover:text-sky-400 transition-colors">Impact Analytics</a></li>
            </ul>
          </div>

          {/* Municipal Operations (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Municipal Operations</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Department of Urban Sanitation &amp; Digital Municipal Administration.<br />
              Central Control Command &bull; Zones A–F Network.
            </p>
            <div className="pt-2 text-[11px] text-sky-400 font-mono">
              Emergency Dispatch Helpline: 1800-WASTE-SENSE
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            &copy; 2026 WasteSense Intelligence Systems. Municipal Smart City Infrastructure. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
