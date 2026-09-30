'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useWasteSense } from '../../context/WasteSenseContext';
import { ArrowLeft, ArrowRight, Eye, EyeOff, HelpCircle, Sparkles, Shield } from 'lucide-react';
import { UserRole } from '../../types';

export default function LoginPage() {
  const router = useRouter();
  const { loginAsRole } = useWasteSense();

  const [nameOrEmail, setNameOrEmail] = useState('Operations Officer');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'signin' | 'demo'>('signin');

  const handleDemoLogin = (role: UserRole) => {
    loginAsRole(role);
    if (role === 'admin') router.push('/admin/dashboard');
    else if (role === 'citizen') router.push('/citizen/dashboard');
    else if (role === 'worker') router.push('/worker/dashboard');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = nameOrEmail.toLowerCase();
    if (query.includes('citizen')) {
      handleDemoLogin('citizen');
    } else if (query.includes('worker') || query.includes('rahul')) {
      handleDemoLogin('worker');
    } else {
      handleDemoLogin('admin');
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex items-center justify-center p-4 sm:p-8 relative overflow-hidden font-sans">
      {/* Warm Ambient Glow behind the hero image (matching the sunset aesthetic from reference) */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-amber-600/15 via-rose-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* LEFT COLUMN: Visual Showcase Card (Styled exactly like reference) */}
        <div className="lg:col-span-6 w-full flex justify-center">
          <div className="relative w-full max-w-[430px] aspect-[3/4] rounded-[32px] overflow-hidden border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] group">
            {/* Background Waste Management Smart City Image */}
            <img
              src="/images/smart-waste-hero.jpg"
              alt="WasteSense Smart City Operations"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Subtle Gradient Overlays for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 pointer-events-none" />

            {/* Top-Left Logo / Badge (Gen AI style from reference) */}
            <div className="absolute top-6 left-6 flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white drop-shadow-md">
                WasteSense
              </span>
              <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-md border border-white/30 text-white/90 bg-black/25 backdrop-blur-md">
                AI
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
                <span>Simulated IoT &bull; Smart City Core</span>
                <span>Hackathon 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Modern Sleek Form (Styled like reference) */}
        <div className="lg:col-span-6 w-full max-w-[460px] mx-auto space-y-7">
          
          {/* Headline */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              Sign In to WasteSense <br className="hidden sm:block" />
              Intelligence Hub
            </h1>
            <p className="text-xs text-slate-400 mt-2">
              Access real-time smart bin telemetry, automated AI dispatch, and verified municipal collection workflows.
            </p>
          </div>

          {/* Top Control Pill Row */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.push('/admin/dashboard')}
              className="w-10 h-10 rounded-full bg-[#161B26] hover:bg-[#1E2536] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition active:scale-95"
              title="Quick Bypass to Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Already configured?</span>
              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="px-3 py-1 rounded-lg border border-white/15 hover:border-white/30 text-white font-medium bg-[#161B26] hover:bg-[#1E2536] transition"
              >
                Log in
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Field 1: Name / Operator ID (Highlighted with subtle glow like reference) */}
            <div className="relative group">
              <input
                type="text"
                value={nameOrEmail}
                onChange={(e) => setNameOrEmail(e.target.value)}
                placeholder="Operator ID or Email"
                className="w-full bg-[#121620]/90 border border-emerald-500/50 focus:border-emerald-400 text-white text-sm rounded-2xl px-5 py-3.5 outline-none transition shadow-[0_0_15px_rgba(16,185,129,0.12)] font-medium"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-emerald-400/80">
                Active
              </span>
            </div>

            {/* Field 2: Email */}
            <div className="relative">
              <input
                type="email"
                defaultValue="admin@wastesense.gov.in"
                placeholder="Email address"
                className="w-full bg-[#121620]/70 border border-white/10 focus:border-white/25 text-slate-300 text-sm rounded-2xl px-5 py-3.5 outline-none transition font-medium"
              />
            </div>

            {/* Field 3: Password */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-[#121620]/70 border border-white/10 focus:border-white/25 text-slate-300 text-sm rounded-2xl px-5 py-3.5 pr-20 outline-none transition font-medium"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-slate-400">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="hover:text-slate-200 transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <HelpCircle className="w-4 h-4 hover:text-slate-200 cursor-pointer" />
              </div>
            </div>

            {/* Primary Submit Button (Capsule with circle arrow like reference) */}
            <button
              type="submit"
              className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-slate-200 to-slate-100 hover:from-white hover:to-slate-200 text-slate-950 font-bold text-sm shadow-[0_10px_25px_rgba(255,255,255,0.1)] transition-all flex items-center justify-between active:scale-[0.99] group"
            >
              <span>Enter Operations Center</span>
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </form>

          {/* 1-Click Hackathon Role Access (Clean Dark Pills) */}
          <div className="pt-2 border-t border-white/10 space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Direct Hackathon Role Demonstrator:</span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="py-2.5 px-3 rounded-xl bg-[#121620] hover:bg-[#181E2C] border border-white/10 hover:border-emerald-500/50 text-left transition group"
              >
                <div className="text-base mb-0.5">👨‍💼</div>
                <div className="text-xs font-bold text-white group-hover:text-emerald-300">Admin</div>
                <div className="text-[10px] text-slate-400">Command Center</div>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('citizen')}
                className="py-2.5 px-3 rounded-xl bg-[#121620] hover:bg-[#181E2C] border border-white/10 hover:border-sky-500/50 text-left transition group"
              >
                <div className="text-base mb-0.5">🧑</div>
                <div className="text-xs font-bold text-white group-hover:text-sky-300">Citizen</div>
                <div className="text-[10px] text-slate-400">Public Portal</div>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('worker')}
                className="py-2.5 px-3 rounded-xl bg-[#121620] hover:bg-[#181E2C] border border-white/10 hover:border-amber-500/50 text-left transition group"
              >
                <div className="text-base mb-0.5">👷</div>
                <div className="text-xs font-bold text-white group-hover:text-amber-300">Worker</div>
                <div className="text-[10px] text-slate-400">Field Route</div>
              </button>
            </div>
          </div>

          {/* Bottom Legal / Disclaimer Text (from reference) */}
          <p className="text-[11px] text-slate-400 leading-relaxed text-center sm:text-left">
            By signing in, you access the WasteSense Smart City Cloud &bull; Simulated IoT Digital Twin Architecture.
          </p>

        </div>

      </div>
    </div>
  );
}
