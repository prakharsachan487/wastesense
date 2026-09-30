'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, ArrowRight, Menu, X, Sparkles, Activity } from 'lucide-react';

export const LandingNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07090E]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-sky-600 flex items-center justify-center text-white shadow-lg shadow-emerald-950/60 transition-transform group-hover:scale-105">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-wider text-white">
                WASTE<span className="text-emerald-400">SENSE</span>
              </span>
              <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded border border-emerald-500/40 text-emerald-300 bg-emerald-950/50">
                AI
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-tight">
              Smart Waste Intelligence Platform
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
          <a href="#architecture" className="hover:text-emerald-400 transition-colors">
            Architecture
          </a>
          <a href="#lifecycle" className="hover:text-emerald-400 transition-colors">
            Lifecycle
          </a>
          <a href="#features" className="hover:text-emerald-400 transition-colors">
            IoT & AI
          </a>
          <a href="#portals" className="hover:text-emerald-400 transition-colors">
            Role Portals
          </a>
          <a href="#impact" className="hover:text-emerald-400 transition-colors">
            City Impact
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/30 text-[11px] font-semibold text-emerald-400">
            <Activity className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            <span>20 Nodes Online</span>
          </div>

          <Link
            href="/login"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/80 transition-all hover:shadow-emerald-600/30 active:scale-95"
          >
            <span>Launch Platform</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#07090E]/95 backdrop-blur-2xl border-b border-slate-800 px-6 py-5 space-y-4 animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-3 text-sm font-semibold text-slate-300">
            <a
              href="#architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-emerald-400"
            >
              Architecture
            </a>
            <a
              href="#lifecycle"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-emerald-400"
            >
              Lifecycle
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-emerald-400"
            >
              IoT & AI Engine
            </a>
            <a
              href="#portals"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-emerald-400"
            >
              Role Portals
            </a>
            <a
              href="#impact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-emerald-400"
            >
              City Impact
            </a>
          </nav>
          <div className="pt-3 border-t border-slate-800">
            <Link
              href="/login"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs"
            >
              <span>Launch Platform</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
