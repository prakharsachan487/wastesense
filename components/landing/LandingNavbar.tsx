'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, ArrowRight, Menu, X, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LandingNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['solutions', 'how-it-works', 'technology', 'awareness', 'portals'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            return;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Solutions', href: '#solutions', id: 'solutions' },
    { name: 'How It Works', href: '#how-it-works', id: 'how-it-works' },
    { name: 'Technology', href: '#technology', id: 'technology' },
    { name: 'Awareness', href: '#awareness', id: 'awareness' },
    { name: 'Portals', href: '#portals', id: 'portals' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4">
        <div
          className={`pointer-events-auto transition-all duration-300 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between ${
            scrolled
              ? 'bg-white/85 backdrop-blur-xl border border-slate-200/80 shadow-lg shadow-slate-900/5'
              : 'bg-white/60 backdrop-blur-md border border-slate-200/50 shadow-xs'
          }`}
        >
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#004A80] to-[#0077CC] flex items-center justify-center text-white shadow-md shadow-[#0077CC]/25 transition-transform group-hover:scale-105">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black tracking-tight text-[#0F172A]">
                  WASTE<span className="text-[#0077CC]">SENSE</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border border-sky-200 bg-sky-50 text-[#0077CC]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  AI v2.4
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium hidden md:block">
                AI-Powered Smart Waste Intelligence
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100/70 p-1 rounded-full border border-slate-200/60">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-[#0077CC] font-bold shadow-xs'
                      : 'hover:text-[#0F172A] hover:bg-white/50 text-slate-600'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Action Button */}
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#0077CC] hover:bg-[#004A80] text-white text-xs font-bold shadow-md shadow-[#0077CC]/25 transition-all hover:scale-[1.02] active:scale-95 group"
            >
              <span>Launch Platform</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="md:hidden p-2 rounded-full bg-slate-100 text-slate-700 hover:text-[#0077CC] border border-slate-200"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto md:hidden max-w-7xl mx-auto px-4 mt-2"
          >
            <div className="bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-3xl p-5 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <span>Navigation</span>
                <span className="flex items-center gap-1.5 text-emerald-600 text-[11px] font-semibold">
                  <Radio className="w-3 h-3 animate-pulse" /> Live System
                </span>
              </div>
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-sky-50 hover:text-[#0077CC] transition-colors"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-40" />
                  </a>
                ))}
              </nav>

              <div className="pt-2 border-t border-slate-100">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#0077CC] text-white font-bold text-xs shadow-md shadow-[#0077CC]/20"
                >
                  <span>Launch Platform Command Center</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
