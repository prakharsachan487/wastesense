'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWasteSense } from '../../context/WasteSenseContext';
import { 
  Bell, Zap, Shield, User, LogOut, Sliders, CheckCircle2, AlertTriangle, Info 
} from 'lucide-react';
import { SmartBinSimulatorModal } from '../admin/SmartBinSimulatorModal';

export const Header: React.FC = () => {
  const router = useRouter();
  const { currentUser, loginAsRole, simulateSurgeB102, notifications, markNotificationRead } = useWasteSense();
  const [showNotifs, setShowNotifs] = useState(false);
  const [showSimModal, setShowSimModal] = useState(false);
  const [demoTriggered, setDemoTriggered] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleQuickDemo = () => {
    simulateSurgeB102();
    setDemoTriggered(true);
    setTimeout(() => setDemoTriggered(false), 3000);
  };

  const handleRoleSwitch = (role: 'admin' | 'citizen' | 'worker') => {
    loginAsRole(role);
    if (role === 'admin') router.push('/admin/dashboard');
    else if (role === 'citizen') router.push('/citizen/dashboard');
    else if (role === 'worker') router.push('/worker/dashboard');
  };

  return (
    <>
      {/* Top Prototype Transparency Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-950 text-slate-200 text-xs px-4 py-1.5 flex items-center justify-between border-b border-emerald-900/40 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-emerald-300">PROTOTYPE TRANSPARENCY:</span>
          <span className="hidden sm:inline text-slate-300">
            Hardware is represented digitally via an <strong>IoT Simulation / Digital Twin Layer</strong>. Live sensors are virtually generated.
          </span>
        </div>

        {/* 60s Live Demo Quick Button */}
        <button
          onClick={handleQuickDemo}
          className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1 rounded-full text-[11px] shadow-md shadow-amber-500/20 transition-transform active:scale-95"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>{demoTriggered ? '⚡ Surge Event Active!' : '⚡ Run 60s Demo: Surge B-102 (95%)'}</span>
        </button>
      </div>

      {/* Main Header */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-3 flex items-center justify-between sticky top-[33px] z-40">
        {/* Brand */}
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-sky-600 flex items-center justify-center text-white shadow-lg shadow-emerald-900/30 group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-wider text-white">WASTE<span className="text-emerald-400">SENSE</span></span>
                <span className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60">AI OPS</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-tight">Sense &bull; Predict &bull; Prioritize &bull; Collect</p>
            </div>
          </Link>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-3">
          {/* IoT Simulator Trigger */}
          <button
            onClick={() => setShowSimModal(true)}
            className="hidden md:flex items-center gap-1.5 bg-indigo-950/70 hover:bg-indigo-900/80 text-indigo-300 border border-indigo-700/50 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Digital Twin Simulator</span>
          </button>

          {/* Quick Role Switcher for Hackathon Demo */}
          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => handleRoleSwitch('admin')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                currentUser.role === 'admin' 
                  ? 'bg-emerald-600 text-white shadow' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => handleRoleSwitch('citizen')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                currentUser.role === 'citizen' 
                  ? 'bg-emerald-600 text-white shadow' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Citizen
            </button>
            <button
              onClick={() => handleRoleSwitch('worker')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                currentUser.role === 'worker' 
                  ? 'bg-emerald-600 text-white shadow' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Worker
            </button>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifs(!showNotifs)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition relative"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifs && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">System Alerts</span>
                  <span className="text-[10px] text-slate-400">{notifications.length} events</span>
                </div>
                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {notifications.map(n => (
                    <div 
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`p-2.5 rounded-lg text-xs cursor-pointer transition ${
                        n.read ? 'bg-slate-950/40 text-slate-400' : 'bg-slate-800/80 text-white border-l-2 border-emerald-400'
                      }`}
                    >
                      <div className="font-semibold flex items-center justify-between">
                        <span>{n.title}</span>
                        <span className="text-[10px] text-slate-500">{n.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Pill & Logout */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm border border-slate-700">
              {currentUser.avatar || <User className="w-4 h-4" />}
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-semibold text-white leading-tight">{currentUser.name}</div>
              <div className="text-[10px] text-emerald-400 uppercase tracking-wider font-semibold">{currentUser.role}</div>
            </div>
            <Link
              href="/login"
              className="p-1.5 text-slate-400 hover:text-rose-400 transition"
              title="Logout / Change Role"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Simulator Modal */}
      {showSimModal && (
        <SmartBinSimulatorModal onClose={() => setShowSimModal(false)} />
      )}
    </>
  );
};
