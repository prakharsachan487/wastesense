'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useWasteSense } from '../../context/WasteSenseContext';
import { Shield, User, Truck, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';
import { UserRole } from '../../types';

interface RoleDetail {
  title: string;
  roleTag: string;
  subtitle: string;
  badge: string;
  email: string;
  targetRoute: string;
  accentColor: string;
  credentialsHint: string;
  code: string;
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
      title: 'Admin Command',
      roleTag: 'Operations',
      subtitle: 'Citywide digital-twin telemetry & autonomous fleet dispatch.',
      badge: 'NODE 0x992 &bull; OPERATIONS',
      email: 'admin@wastesense.demo',
      targetRoute: '/admin/dashboard',
      accentColor: '#0077CC',
      credentialsHint: 'admin@wastesense.demo (Full City Command)',
      code: '01'
    },
    citizen: {
      title: 'Citizen Resident',
      roleTag: 'Resident',
      subtitle: 'Neighborhood overflow reports & doorstep recyclable bookings.',
      badge: 'WARD 12 &bull; PUBLIC SERVICES',
      email: 'citizen@wastesense.demo',
      targetRoute: '/citizen/dashboard',
      accentColor: '#0EA5E9',
      credentialsHint: 'citizen@wastesense.demo (Sector 12 Resident)',
      code: '02'
    },
    worker: {
      title: 'Field Operator',
      roleTag: 'Field Crew',
      subtitle: 'Action-first work orders, GPS geofence & photographic verification.',
      badge: 'TRUCK #04 &bull; SANITATION CREW',
      email: 'worker@wastesense.demo',
      targetRoute: '/worker/dashboard',
      accentColor: '#38BDF8',
      credentialsHint: 'worker@wastesense.demo (Truck #04 Driver)',
      code: '03'
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

  // Generate static random values once per mount to prevent hydration mismatch
  const blobsData = useMemo(() => {
    return Array.from({ length: 7 }).map(() => ({
      size: Math.random() * 220 + 160,
      left: Math.random() * 80 + 10,
      top: Math.random() * 80 + 10,
      animationDelay: Math.random() * -20,
      animationDuration: Math.random() * 15 + 16,
    }));
  }, []);

  // Blob DOM elements for high-performance mouse parallax updates
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      // Apply subtle parallax effect to each blob
      blobRefs.current.forEach((blob, index) => {
        if (blob) {
          const speed = (index + 1) * 18;
          blob.style.marginLeft = `${x * speed}px`;
          blob.style.marginTop = `${y * speed}px`;
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="mercury-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;700;800&family=Space+Mono:wght@400;700&display=swap');

        :root {
          --bg: #030712;
          --mercury: #e2e8f0;
          --mercury-dark: #475569;
          --accent: #ffffff;
          --brand-blue: #0077CC;
          --brand-cyan: #38BDF8;
          --text-dim: rgba(255, 255, 255, 0.55);
          --filter-goo: url('#gooey');
        }

        .mercury-wrapper {
          background-color: var(--bg);
          color: var(--accent);
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100vh;
          width: 100vw;
          overflow-x: hidden;
          overflow-y: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 24px 16px;
        }

        .mercury-wrapper * {
          box-sizing: border-box;
          -webkit-font-smoothing: antialiased;
        }

        /* Background Liquid Physics Simulation */
        .stage {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          filter: var(--filter-goo);
          opacity: 0.65;
          pointer-events: none;
        }

        .blob {
          position: absolute;
          background: linear-gradient(135deg, #0284C7, #38BDF8, #94A3B8, #E2E8F0);
          border-radius: 50%;
          filter: blur(22px);
          animation: float 22s infinite alternate ease-in-out;
          box-shadow: inset -10px -10px 25px rgba(0,0,0,0.6), 
                      10px 10px 35px rgba(56,189,248,0.25);
          transition: margin 0.12s ease-out;
        }

        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(12vw, 18vh) scale(1.15); }
          66% { transform: translate(-8vw, 12vh) scale(0.85); }
          100% { transform: translate(6vw, -12vh) scale(1.1); }
        }

        /* Interface Container */
        .auth-container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 520px;
          padding: 44px 38px;
          background: rgba(10, 15, 29, 0.78);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 32px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7),
                      inset 0 1px 1px rgba(255, 255, 255, 0.1);
        }

        .header {
          margin-bottom: 32px;
          text-align: left;
        }

        .brand-id {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--brand-cyan);
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .header h1 {
          font-family: 'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: 2.75rem;
          line-height: 0.95;
          letter-spacing: -0.04em;
          margin-left: -2px;
          margin-top: 0;
          margin-bottom: 8px;
          color: #ffffff;
        }

        /* Role Selector */
        .role-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-bottom: 28px;
        }

        .role-btn {
          background: rgba(15, 23, 42, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 12px 10px;
          text-align: left;
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative;
        }

        .role-btn:hover {
          background: rgba(30, 41, 59, 0.85);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .role-btn.active {
          background: rgba(14, 165, 233, 0.15);
          border-color: var(--brand-cyan);
          box-shadow: 0 0 20px rgba(14, 165, 233, 0.25);
        }

        /* Form Elements */
        .form-group {
          position: relative;
          margin-bottom: 24px;
          transition: transform 0.4s cubic-bezier(0.2, 1, 0.3, 1);
        }

        .form-group:focus-within {
          transform: translateX(6px);
        }

        .form-group label {
          display: block;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 1.5px;
          color: var(--text-dim);
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        .form-group input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          color: var(--accent);
          padding: 10px 0;
          font-size: 16px;
          font-weight: 500;
          outline: none;
          transition: border-color 0.4s;
        }

        .input-glow {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 2px;
          background: var(--brand-cyan);
          transition: width 0.5s cubic-bezier(0.2, 1, 0.3, 1);
          box-shadow: 0 0 16px var(--brand-cyan);
        }

        .form-group input:focus + .input-glow {
          width: 100%;
        }

        /* The Mercury Button */
        .submit-wrap {
          margin-top: 36px;
          position: relative;
          filter: var(--filter-goo);
        }

        .btn-base {
          background: #ffffff;
          color: #030712;
          border: none;
          padding: 18px 32px;
          font-size: 13px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          cursor: pointer;
          width: 100%;
          position: relative;
          z-index: 2;
          transition: letter-spacing 0.3s, background 0.3s;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-base:hover {
          letter-spacing: 3.5px;
          background: #f0f9ff;
        }

        .mercury-drop {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #0284C7, #38BDF8, #ffffff);
          transform: translate(-50%, -50%);
          z-index: 1;
          border-radius: 50px;
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          opacity: 0.85;
        }

        .submit-wrap:hover .mercury-drop {
          transform: translate(-50%, -50%) scale(1.04, 1.2);
          filter: brightness(1.25);
        }

        /* Footer Nav */
        .footer-nav {
          margin-top: 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 18px;
        }

        .footer-nav a {
          color: var(--text-dim);
          text-decoration: none;
          transition: color 0.3s;
        }

        .footer-nav a:hover {
          color: var(--brand-cyan);
        }

        /* SVG Filter Definition */
        .svg-filter-hidden {
          position: absolute;
          width: 0;
          height: 0;
          pointer-events: none;
        }
      `}</style>

      {/* SVG Gooey Filter Definition */}
      <svg className="svg-filter-hidden" aria-hidden="true">
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Background Liquid Physics Stage */}
      <div className="stage" id="stage">
        {blobsData.map((data, index) => (
          <div
            key={index}
            ref={(el) => {
              blobRefs.current[index] = el;
            }}
            className="blob"
            style={{
              width: `${data.size}px`,
              height: `${data.size}px`,
              left: `${data.left}%`,
              top: `${data.top}%`,
              animationDelay: `${data.animationDelay}s`,
              animationDuration: `${data.animationDuration}s`,
            }}
          />
        ))}
      </div>

      {/* Interface Container */}
      <main className="auth-container">
        <header className="header">
          <span className="brand-id">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>WASTESENSE &bull; {currentRole.badge}</span>
          </span>
          <h1>
            NEURAL<br />
            <span className="bg-gradient-to-r from-white via-sky-200 to-cyan-400 bg-clip-text text-transparent">
              ACCESS
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-2 font-normal leading-relaxed">
            {currentRole.subtitle}
          </p>
        </header>

        {/* Role Selector with Swiss Number Index */}
        <div className="role-grid">
          {/* Admin */}
          <button
            type="button"
            onClick={() => handleRoleSelect('admin')}
            className={`role-btn ${selectedRole === 'admin' ? 'active' : ''}`}
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
              <span>01</span>
              <Shield className="w-3 h-3 text-[#38BDF8]" />
            </div>
            <div className="font-extrabold text-xs text-white">Admin</div>
            <div className="text-[10px] text-slate-400">Operations</div>
          </button>

          {/* Citizen */}
          <button
            type="button"
            onClick={() => handleRoleSelect('citizen')}
            className={`role-btn ${selectedRole === 'citizen' ? 'active' : ''}`}
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
              <span>02</span>
              <User className="w-3 h-3 text-[#38BDF8]" />
            </div>
            <div className="font-extrabold text-xs text-white">Citizen</div>
            <div className="text-[10px] text-slate-400">Resident</div>
          </button>

          {/* Worker */}
          <button
            type="button"
            onClick={() => handleRoleSelect('worker')}
            className={`role-btn ${selectedRole === 'worker' ? 'active' : ''}`}
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
              <span>03</span>
              <Truck className="w-3 h-3 text-[#38BDF8]" />
            </div>
            <div className="font-extrabold text-xs text-white">Worker</div>
            <div className="text-[10px] text-slate-400">Field Crew</div>
          </button>
        </div>

        {/* Login Form */}
        <form autoComplete="off" onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <label>User Identity (Demo Account)</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@wastesense.demo"
              required
            />
            <div className="input-glow"></div>
          </div>

          <div className="form-group">
            <div className="flex justify-between items-center mb-1">
              <label style={{ marginBottom: 0 }}>Sequence Key</label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-white transition text-[10px] flex items-center gap-1 font-mono"
              >
                {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                <span>{showPassword ? 'HIDE' : 'SHOW'}</span>
              </button>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
            <div className="input-glow"></div>
          </div>

          {/* Liquid Mercury Submit Button */}
          <div className="submit-wrap">
            <div className="mercury-drop"></div>
            <button type="submit" className="btn-base">
              <span>Initialize {currentRole.title} Stream</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <footer className="footer-nav">
          <Link href="/" className="hover:text-cyan-400 flex items-center gap-1">
            <span>&larr; BACK TO OVERVIEW</span>
          </Link>
          <span className="text-slate-500">
            DEMO PRELOADED &bull; 2026
          </span>
        </footer>
      </main>
    </div>
  );
}
