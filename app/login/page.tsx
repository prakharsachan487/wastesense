'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useWasteSense } from '../../context/WasteSenseContext';
import { 
  ArrowRight, Eye, EyeOff, Shield, User, Truck, Sparkles, 
  CheckCircle2, KeyRound, Radio, Zap, ShieldCheck 
} from 'lucide-react';
import { UserRole } from '../../types';

interface RoleDetail {
  title: string;
  roleTag: string;
  subtitle: string;
  badge: string;
  email: string;
  targetRoute: string;
  accentColor: string;
  ringColor: string;
  bgLight: string;
  credentialsHint: string;
  scope: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { loginAsRole } = useWasteSense();

  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [email, setEmail] = useState('admin@wastesense.demo');
  const [password, setPassword] = useState('demo2026');
  const [showPassword, setShowPassword] = useState(false);

  const roles: Record<UserRole, RoleDetail> = {
    admin: {
      title: 'Admin Command Center',
      roleTag: 'Operations',
      subtitle: 'Citywide situational awareness, digital-twin telemetry, and automated smart dispatch operations.',
      badge: 'DEMO ENVIRONMENT &bull; ADMIN',
      email: 'admin@wastesense.demo',
      targetRoute: '/admin/dashboard',
      accentColor: 'text-[#0077CC]',
      ringColor: 'ring-2 ring-[#0077CC] border-[#0077CC] bg-[#F0F9FF]',
      bgLight: 'bg-[#F0F9FF] text-[#0077CC] border-[#BAE6FD]',
      credentialsHint: 'admin@wastesense.demo (Full City Command)',
      scope: 'Live map, priority triage queue, fleet routing & telemetry'
    },
    citizen: {
      title: 'Citizen Resident Portal',
      roleTag: 'Resident',
      subtitle: 'Report neighborhood overflow, schedule doorstep recyclable pickup, and track live incident resolution.',
      badge: 'DEMO ENVIRONMENT &bull; CITIZEN',
      email: 'citizen@wastesense.demo',
      targetRoute: '/citizen/dashboard',
      accentColor: 'text-[#0EA5E9]',
      ringColor: 'ring-2 ring-[#0EA5E9] border-[#0EA5E9] bg-[#F0F9FF]',
      bgLight: 'bg-[#F0F9FF] text-[#0EA5E9] border-[#BAE6FD]',
      credentialsHint: 'citizen@wastesense.demo (Sector 12 Resident)',
      scope: 'GPS incident reporting, doorstep bookings & 6-stage tracker'
    },
    worker: {
      title: 'Sanitation Field Crew',
      roleTag: 'Field Crew',
      subtitle: 'Action-first work orders, turn-by-turn routing, geofence verification, and photographic proof.',
      badge: 'DEMO ENVIRONMENT &bull; FIELD OPERATOR',
      email: 'worker@wastesense.demo',
      targetRoute: '/worker/dashboard',
      accentColor: 'text-[#004A80]',
      ringColor: 'ring-2 ring-[#004A80] border-[#004A80] bg-[#F0F9FF]',
      bgLight: 'bg-[#F0F9FF] text-[#004A80] border-[#BAE6FD]',
      credentialsHint: 'worker@wastesense.demo (Truck #04 Driver)',
      scope: 'Touch-first lifecycle actions & photographic verification'
    }
  };

  const currentRole = roles[selectedRole];

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setEmail(roles[role].email);
    setPassword('demo2026');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsRole(selectedRole);
    router.push(currentRole.targetRoute);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex items-center justify-center p-4 sm:p-8 relative overflow-hidden font-satoshi">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F0F7FF] via-[#F8FAFC] to-[#FFFFFF] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* LEFT COLUMN: Visual Showcase Card */}
        <div className="lg:col-span-5 w-full flex justify-center">
          <div className="relative w-full max-w-[420px] aspect-[3/4] rounded-[32px] overflow-hidden border border-slate-200 shadow-2xl group bg-white p-2">
            <div className="relative w-full h-full rounded-[24px] overflow-hidden">
              <img
                src="/images/smart-waste-hero.jpg"
                alt="WasteSense Smart City Operations"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 pointer-events-none" />

              {/* Top-Left Logo / Badge */}
              <div className="absolute top-6 left-6 flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white drop-shadow-md">
                  WasteSense
                </span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border border-white/30 text-white bg-black/40 backdrop-blur-md">
                  DEMO
                </span>
              </div>

              {/* Top-Right Online Pulse */}
              <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-[10px] font-semibold text-[#0EA5E9]">
                <span className="w-2 h-2 rounded-full bg-[#0EA5E9] animate-pulse" />
                <span>Simulated IoT Mesh</span>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-6 left-6 right-6 space-y-1">
                <div className="text-[11px] font-bold text-[#BAE6FD] tracking-wider uppercase">
                  Smart Waste Intelligence Platform
                </div>
                <p className="text-sm font-semibold text-white/95 leading-snug drop-shadow">
                  Sense &bull; Predict &bull; Prioritize &bull; Collect
                </p>
                <div className="mt-3 flex items-center justify-between text-[10px] text-white/70 border-t border-white/20 pt-2 font-mono">
                  <span>Interactive Role Sandbox</span>
                  <span>v2.4 Hackathon Build</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Role Selector & Login Card */}
        <div className="lg:col-span-7 w-full max-w-[500px] mx-auto space-y-5">
          
          <div className="bg-white p-7 sm:p-9 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            {/* Header & Role Context */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-extrabold tracking-wider uppercase mb-2 bg-[#F0F9FF] border-[#BAE6FD] text-[#0077CC]">
                <Sparkles className="w-3 h-3 text-[#0077CC]" />
                <span dangerouslySetInnerHTML={{ __html: currentRole.badge }} />
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.04em] text-[#0F172A] leading-[1.06] font-display">
                {currentRole.title}
              </h1>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed font-normal">
                {currentRole.subtitle}
              </p>
            </div>

            {/* WHO ARE YOU? Interactive 3-Card Role Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <span>Select Workspace Role</span>
                <span className="font-mono text-slate-400">/ 03 Portals</span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {/* 1. Admin */}
                <button
                  type="button"
                  onClick={() => handleRoleSelect('admin')}
                  className={`p-3.5 rounded-2xl border text-left transition-all relative group ${
                    selectedRole === 'admin'
                      ? 'border-[#0077CC] bg-[#F0F9FF] ring-2 ring-[#0077CC]/20 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-medium text-slate-400">01</span>
                    <div className="w-6 h-6 rounded-lg bg-[#0077CC] text-white flex items-center justify-center shadow-xs">
                      <Shield className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="font-extrabold text-xs text-[#0F172A] tracking-tight">Admin</div>
                  <div className="text-[10px] text-slate-500 font-medium">Operations</div>
                </button>

                {/* 2. Citizen */}
                <button
                  type="button"
                  onClick={() => handleRoleSelect('citizen')}
                  className={`p-3.5 rounded-2xl border text-left transition-all relative group ${
                    selectedRole === 'citizen'
                      ? 'border-[#0EA5E9] bg-[#F0F9FF] ring-2 ring-[#0EA5E9]/20 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-medium text-slate-400">02</span>
                    <div className="w-6 h-6 rounded-lg bg-[#0EA5E9] text-white flex items-center justify-center shadow-xs">
                      <User className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="font-extrabold text-xs text-[#0F172A] tracking-tight">Citizen</div>
                  <div className="text-[10px] text-slate-500 font-medium">Resident</div>
                </button>

                {/* 3. Worker */}
                <button
                  type="button"
                  onClick={() => handleRoleSelect('worker')}
                  className={`p-3.5 rounded-2xl border text-left transition-all relative group ${
                    selectedRole === 'worker'
                      ? 'border-[#004A80] bg-[#F0F9FF] ring-2 ring-[#004A80]/20 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-medium text-slate-400">03</span>
                    <div className="w-6 h-6 rounded-lg bg-[#004A80] text-white flex items-center justify-center shadow-xs">
                      <Truck className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="font-extrabold text-xs text-[#0F172A] tracking-tight">Worker</div>
                  <div className="text-[10px] text-slate-500 font-medium">Field Crew</div>
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Demo Email Account
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-slate-200 focus:border-[#0077CC] focus:bg-white text-[#0F172A] text-xs rounded-xl px-4 py-3 outline-none transition font-medium"
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold text-slate-700">Password</label>
                  <span className="text-[10px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                    Demo Credentials Preloaded
                  </span>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-slate-200 focus:border-[#0077CC] focus:bg-white text-[#0F172A] text-xs rounded-xl px-4 py-3 pr-10 outline-none transition font-medium"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-[#0077CC] hover:bg-[#004A80] text-white font-bold text-xs shadow-md shadow-[#0077CC]/20 transition flex items-center justify-between active:scale-[0.99] group"
              >
                <span>Enter {currentRole.title}</span>
                <div className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            </form>

            {/* Honest Demo Environment Information Strip */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
              <div className="flex items-center gap-2 font-bold text-[#0F172A]">
                <Radio className="w-3.5 h-3.5 text-[#0077CC]" />
                <span>Smart City Operations Demo Environment</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Preloaded with 20 telemetry nodes, active complaints, and live work orders for testing.
              </p>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 text-center font-medium">
            WasteSense &bull; Smart City Operations Demo &bull; Hackathon Evaluation Build
          </p>

        </div>
      </div>
    </div>
  );
}
