'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Lock, Award, Heart } from 'lucide-react';

export const LandingFooter: React.FC = () => {
  return (
    <footer className="bg-[#05070B] border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand & Municipal Attribution (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
                <Shield className="w-4 h-4" />
              </div>
              <span className="text-base font-black tracking-wider text-white">
                WASTE<span className="text-emerald-400">SENSE</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-emerald-500/40 text-emerald-300 bg-emerald-950/40">
                OS 2.4
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Autonomous Smart Waste Intelligence Platform engineered for municipal smart cities. Unifying IoT sensory telematics, predictive overflow forecasts, civic grievance intake, and field operator fleet dispatch.
            </p>

            <div className="flex items-center gap-4 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>256-Bit SSL Encrypted</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-sky-400" />
                <span>Smart Cities Mission</span>
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2">
              <li><a href="#architecture" className="hover:text-emerald-400 transition-colors">Architecture</a></li>
              <li><a href="#lifecycle" className="hover:text-emerald-400 transition-colors">4-Stage Lifecycle</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">IoT Telemetry</a></li>
              <li><a href="#impact" className="hover:text-emerald-400 transition-colors">Operational Impact</a></li>
            </ul>
          </div>

          {/* Col 3: Role Portals (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Role Access</h4>
            <ul className="space-y-2">
              <li><Link href="/login" className="hover:text-emerald-400 transition-colors">Admin Command</Link></li>
              <li><Link href="/login" className="hover:text-emerald-400 transition-colors">Citizen Services</Link></li>
              <li><Link href="/login" className="hover:text-emerald-400 transition-colors">Sanitation Fleet</Link></li>
              <li><Link href="/login" className="hover:text-emerald-400 transition-colors">Node Calibration</Link></li>
            </ul>
          </div>

          {/* Col 4: Department & Contact (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Municipal Operations</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Department of Urban Sanitation & Digital Municipal Administration.<br />
              Central Control Headquarters &bull; Zone A-F Operations.
            </p>
            <div className="pt-1 text-[11px] text-emerald-400 font-mono">
              Emergency Dispatch Helpline: 1800-WASTE-SENSE
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            &copy; 2026 WasteSense Intelligence Systems. Municipal Public-Private Partnership. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Protocol</span>
            <span className="hover:text-slate-300 cursor-pointer">Security SLA</span>
            <span className="hover:text-slate-300 cursor-pointer">IoT Gateway Telemetry</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
