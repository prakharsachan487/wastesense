'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWasteSense } from '../../context/WasteSenseContext';
import { ArrowRight, Eye, EyeOff, Shield, User, Truck, Sparkles, CheckCircle2 } from 'lucide-react';
import { UserRole } from '../../types';

export default function LoginPage() {
  const router = useRouter();
  const { loginAsRole } = useWasteSense();

  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [email, setEmail] = useState('admin@wastesense.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);

  const roleConfigs: Record<UserRole, {
    title: string;
    subtitle: string;
    defaultEmail: string;
    badge: string;
    icon: string;
    targetRoute: string;
    themeColor: string;
  }> = {
    admin: {
      title: 'Admin Command Center',
      subtitle: 'Citywide situational awareness, digital-twin telemetry, and automated dispatch operations.',
      defaultEmail: 'admin@wastesense.gov.in',
      badge: 'MUNICIPAL OPERATIONS',
      icon: '👨‍💼',
      targetRoute: '/admin/dashboard',
      themeColor: 'border-emerald-500/60 bg-emerald-500/10 text-emerald-400'
    },
    citizen: {
      title: 'Citizen Service Portal',
      subtitle: 'Report urban waste issues, schedule doorstep bulk collection, and track resolution tickets.',
      defaultEmail: 'citizen@wastesense.org',
      badge: 'PUBLIC RESIDENT ACCESS',
      icon: '🧑',
      targetRoute: '/citizen/dashboard',
      themeColor: 'border-sky-500/60 bg-sky-500/10 text-sky-400'
    },
    worker: {
      title: 'Sanitation Fleet Portal',
      subtitle: 'Assigned route navigation, mobile task execution, and verified photographic resolution.',
      defaultEmail: 'rahul.sharma@wastesense.ops',
      badge: 'FIELD OPERATOR ACCESS',
      icon: '👷',
      targetRoute: '/worker/dashboard',
      themeColor: 'border-amber-500/60 bg-amber-500/10 text-amber-400'
    }
  };

  const currentConfig = roleConfigs[selectedRole];

  const handleRoleTabChange = (role: UserRole) => {
    setSelectedRole(role);
    setEmail(roleConfigs[role].defaultEmail);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsRole(selectedRole);
    router.push(currentConfig.targetRoute);
  };

  const handleQuickEnter = (role: UserRole) => {
    loginAsRole(role);
    router.push(roleConfigs[role].targetRoute);
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex items-center justify-center p-4 sm:p-8 relative overflow-hidden font-sans">
      {/* Main Container */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* LEFT COLUMN: Visual Showcase Card */}
        <div className="lg:col-span-6 w-full flex justify-center">
          <div className="relative w-full max-w-[430px] aspect-[3/4] rounded-[32px] overflow-hidden border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] group">
            <img
              src="/images/smart-waste-hero.jpg"
              alt="WasteSense Smart City Operations"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 pointer-events-none" />

            {/* Top-Left Logo / Badge */}
            <div className="absolute top-6 left-6 flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white drop-shadow-md">
                WasteSense
              </span>
              <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-md border border-white/30 text-white/90 bg-black/25 backdrop-blur-md">
                IoT
              </span>
            </div>

            {/* Top-Right Online Pulse */}
            <div className="absolute top-6 right-6 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Digital Twin Live</span>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-xs font-semibold text-amber-300/90 tracking-wide uppercase mb-1">
                Autonomous Waste Operations
              </div>
              <p className="text-sm font-medium text-white/95 leading-snug drop-shadow">
                Sense &bull; Predict &bull; Prioritize &bull; Collect
              </p>
              <div className="mt-3 flex items-center justify-between text-[10px] text-white/50 border-t border-white/15 pt-2">
                <span>Role-Isolated Architecture</span>
                <span>Smart City Operations 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Dedicated Role Portals Login */}
        <div className="lg:col-span-6 w-full max-w-[460px] mx-auto space-y-6">
          
          {/* Header & Role Indicator */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-bold tracking-wider uppercase mb-2.5 bg-black/40 border-white/15 text-slate-300">
              <span>{currentConfig.icon}</span>
              <span>{currentConfig.badge}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
              {currentConfig.title}
            </h1>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              {currentConfig.subtitle}
            </p>
          </div>

          {/* 3 Dedicated Role Selection Tabs */}
          <div className="grid grid-cols-3 gap-1.5 bg-[#121620] p-1.5 rounded-2xl border border-white/10">
            <button
              type="button"
              onClick={() => handleRoleTabChange('admin')}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                selectedRole === 'admin'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>👨‍💼</span>
              <span>Admin</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleTabChange('citizen')}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                selectedRole === 'citizen'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-950'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>🧑</span>
              <span>Citizen</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleTabChange('worker')}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                selectedRole === 'worker'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-950'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>👷</span>
              <span>Worker</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {selectedRole === 'admin' ? 'Administrator Email / ID' :
                 selectedRole === 'citizen' ? 'Citizen Registered Email / Phone' :
                 'Operator Badge ID / Mobile'}
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#121620]/90 border border-white/15 focus:border-emerald-500 text-white text-xs rounded-xl px-4 py-3 outline-none transition font-medium"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-slate-300">Password / Security Key</label>
                <span className="text-[11px] text-emerald-400/90 font-medium">Secured Node</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#121620]/90 border border-white/15 focus:border-emerald-500 text-white text-xs rounded-xl px-4 py-3 pr-10 outline-none transition font-medium"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 px-5 rounded-xl bg-gradient-to-r from-slate-200 to-slate-100 hover:from-white hover:to-slate-200 text-slate-950 font-black text-xs shadow-lg transition flex items-center justify-between active:scale-[0.99] group"
            >
              <span>Sign In to {currentConfig.title}</span>
              <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          </form>

          {/* Secure Portal Authentication Note */}
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-white/10 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Municipal Single Sign-On (SSO) Active</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">256-BIT SSL</span>
          </div>

          <p className="text-[10px] text-slate-400 text-center">
            City of New Delhi &bull; Department of Urban Sanitation & Waste Intelligence Operations
          </p>

        </div>

      </div>
    </div>
  );
}
