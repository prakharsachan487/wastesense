'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useWasteSense } from '../../context/WasteSenseContext';
import { 
  Shield, User, Truck, Eye, EyeOff, Sparkles, ArrowRight, 
  CheckCircle2, AlertCircle, Loader2, Database, MapPin, Phone
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
  credentialsHint: string;
  code: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { loginAsRole, registerUser, loginWithCredentials } = useWasteSense();

  // Mode: Sign In or Register
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Sign In states
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [email, setEmail] = useState('admin@wastesense.demo');
  const [password, setPassword] = useState('demo2026');
  const [showPassword, setShowPassword] = useState(false);

  // Register states
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerRole, setRegisterRole] = useState<UserRole>('citizen');
  const [registerPhone, setRegisterPhone] = useState('+91 98112-90123');
  const [registerZone, setRegisterZone] = useState('Sector 12, Central Market');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  // Status & loading
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

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

  const currentRole = roles[authMode === 'login' ? selectedRole : registerRole];

  const handleRoleSelect = (role: UserRole) => {
    if (authMode === 'login') {
      setSelectedRole(role);
      setEmail(roles[role].email);
      setPassword('demo2026');
    } else {
      setRegisterRole(role);
      if (role === 'admin') setRegisterZone('Headquarters Command Center');
      else if (role === 'worker') setRegisterZone('Zone A - Commercial');
      else setRegisterZone('Sector 12, Central Market');
    }
    setStatusMessage(null);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await loginWithCredentials(email, password, selectedRole);
      if (res.success) {
        setStatusMessage({ type: 'success', text: 'Authentication confirmed. Initializing telematics...' });
        const target = res.user?.role === 'admin' ? '/admin/dashboard' :
                       res.user?.role === 'worker' ? '/worker/dashboard' :
                       '/citizen/dashboard';
        setTimeout(() => router.push(target), 400);
      } else {
        setStatusMessage({ type: 'error', text: res.error || 'Login failed. Please check credentials.' });
      }
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err?.message || 'Login failed. Please try demo accounts.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!registerName.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter your full name.' });
      return;
    }
    if (!registerEmail.trim() || !registerEmail.includes('@')) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }
    if (registerPassword.length < 6) {
      setStatusMessage({ type: 'error', text: 'Password must be at least 6 characters long.' });
      return;
    }
    if (registerPassword !== registerConfirmPassword) {
      setStatusMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await registerUser({
        name: registerName.trim(),
        email: registerEmail.trim(),
        password: registerPassword,
        role: registerRole,
        phone: registerPhone.trim(),
        zone: registerZone
      });

      if (res.success) {
        setStatusMessage({ 
          type: 'success', 
          text: 'Account successfully registered and connected to Supabase backend! Initializing portal...' 
        });
        
        const target = registerRole === 'admin' ? '/admin/dashboard' :
                       registerRole === 'worker' ? '/worker/dashboard' :
                       '/citizen/dashboard';
        setTimeout(() => router.push(target), 800);
      } else {
        setStatusMessage({ 
          type: 'error', 
          text: res.error || 'Registration failed. Please try a different email.' 
        });
      }
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err?.message || 'Failed to connect to backend.' });
    } finally {
      setIsSubmitting(false);
    }
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
          padding: 30px 16px;
        }

        /* Ambient Liquid Stage */
        .stage {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          filter: var(--filter-goo);
          opacity: 0.55;
          pointer-events: none;
        }

        .blob {
          position: absolute;
          background: linear-gradient(135deg, #004A80 0%, #0077CC 40%, #0EA5E9 75%, #38BDF8 100%);
          border-radius: 50%;
          opacity: 0.45;
          animation: float-fluid infinite alternate ease-in-out;
          will-change: transform, margin;
        }

        @keyframes float-fluid {
          0% {
            transform: translateY(0) scale(1);
          }
          100% {
            transform: translateY(-80px) scale(1.12);
          }
        }

        /* Glassmorphism Auth Container */
        .auth-container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 520px;
          background: rgba(15, 23, 42, 0.72);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border-radius: 32px;
          padding: 40px;
          box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.8),
                      0 0 40px rgba(0, 119, 204, 0.12);
          box-sizing: border-box;
          margin: auto;
        }

        @media (max-width: 640px) {
          .auth-container {
            padding: 26px 20px;
            border-radius: 24px;
          }
        }

        /* Header typography */
        .header {
          margin-bottom: 24px;
        }

        .brand-id {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 2px;
          color: var(--brand-cyan);
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 12px;
        }

        h1 {
          font-size: 32px;
          line-height: 1.05;
          font-weight: 800;
          letter-spacing: -1px;
          margin: 0;
          text-transform: uppercase;
        }

        /* Mode Tabs (Sign In / Register) */
        .auth-mode-pill {
          display: flex;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 9999px;
          padding: 4px;
          margin-bottom: 24px;
          gap: 4px;
        }

        .auth-mode-btn {
          flex: 1;
          padding: 8px 16px;
          border-radius: 9999px;
          border: none;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--text-dim);
          background: transparent;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .auth-mode-btn.active {
          background: #ffffff;
          color: #030712;
          box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
        }

        /* Role Buttons */
        .role-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-bottom: 24px;
        }

        .role-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 12px 10px;
          text-align: left;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          color: var(--accent);
        }

        .role-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .role-btn.active {
          background: rgba(14, 165, 233, 0.15);
          border-color: var(--brand-cyan);
          box-shadow: 0 0 20px rgba(14, 165, 233, 0.25);
        }

        /* Form Elements */
        .form-group {
          position: relative;
          margin-bottom: 20px;
          transition: transform 0.4s cubic-bezier(0.2, 1, 0.3, 1);
        }

        .form-group:focus-within {
          transform: translateX(4px);
        }

        .form-group label {
          display: block;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 1.5px;
          color: var(--text-dim);
          margin-bottom: 6px;
          text-transform: uppercase;
        }

        .form-group input, .form-group select {
          width: 100%;
          background: rgba(255, 255, 255, 0.02);
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          color: var(--accent);
          padding: 8px 0;
          font-size: 15px;
          font-weight: 500;
          outline: none;
          transition: border-color 0.4s;
        }

        .form-group select option {
          background: #0F172A;
          color: #ffffff;
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

        .form-group input:focus + .input-glow,
        .form-group select:focus + .input-glow {
          width: 100%;
        }

        /* The Mercury Button */
        .submit-wrap {
          margin-top: 28px;
          position: relative;
          filter: var(--filter-goo);
        }

        .btn-base {
          background: #ffffff;
          color: #030712;
          border: none;
          padding: 16px 28px;
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

        .btn-base:hover:not(:disabled) {
          letter-spacing: 3px;
          background: #f0f9ff;
        }

        .btn-base:disabled {
          opacity: 0.6;
          cursor: not-allowed;
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
          transform: translate(-50%, -50%) scale(1.03, 1.15);
          filter: brightness(1.25);
        }

        /* Footer Nav */
        .footer-nav {
          margin-top: 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 16px;
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
          <div className="flex items-center justify-between mb-2">
            <span className="brand-id" style={{ marginBottom: 0 }}>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>WASTESENSE &bull; {currentRole.badge}</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
              <Database className="w-3 h-3 text-emerald-400" />
              <span>SUPABASE LIVE</span>
            </span>
          </div>

          <h1>
            {authMode === 'login' ? 'NEURAL' : 'REGISTER'}<br />
            <span className="bg-gradient-to-r from-white via-sky-200 to-cyan-400 bg-clip-text text-transparent">
              {authMode === 'login' ? 'ACCESS' : 'IDENTITY'}
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-2 font-normal leading-relaxed">
            {authMode === 'login' 
              ? currentRole.subtitle 
              : 'Provision a verified user on Supabase cloud connected directly to urban sensors and automated dispatch.'}
          </p>
        </header>

        {/* Tab Toggle: Sign In vs Register */}
        <div className="auth-mode-pill">
          <button
            type="button"
            onClick={() => {
              setAuthMode('login');
              setStatusMessage(null);
            }}
            className={`auth-mode-btn ${authMode === 'login' ? 'active' : ''}`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('register');
              setStatusMessage(null);
            }}
            className={`auth-mode-btn ${authMode === 'register' ? 'active' : ''}`}
          >
            Register Account
          </button>
        </div>

        {/* Role Selector with Swiss Number Index */}
        <div className="role-grid">
          {/* Admin */}
          <button
            type="button"
            onClick={() => handleRoleSelect('admin')}
            className={`role-btn ${(authMode === 'login' ? selectedRole : registerRole) === 'admin' ? 'active' : ''}`}
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
            className={`role-btn ${(authMode === 'login' ? selectedRole : registerRole) === 'citizen' ? 'active' : ''}`}
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
            className={`role-btn ${(authMode === 'login' ? selectedRole : registerRole) === 'worker' ? 'active' : ''}`}
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
              <span>03</span>
              <Truck className="w-3 h-3 text-[#38BDF8]" />
            </div>
            <div className="font-extrabold text-xs text-white">Worker</div>
            <div className="text-[10px] text-slate-400">Field Crew</div>
          </button>
        </div>

        {/* Status Message (Alert) */}
        {statusMessage && (
          <div
            className={`p-3 rounded-xl mb-4 text-xs flex items-start gap-2 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            )}
            <span className="leading-snug">{statusMessage.text}</span>
          </div>
        )}

        {/* 1. Sign In Form */}
        {authMode === 'login' && (
          <form autoComplete="off" onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label>User Identity / Email</label>
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
                <label style={{ marginBottom: 0 }}>Sequence Key / Password</label>
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
              <button type="submit" disabled={isSubmitting} className="btn-base">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Synchronizing...</span>
                  </>
                ) : (
                  <>
                    <span>Initialize {currentRole.title} Stream</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* 2. Register Form */}
        {authMode === 'register' && (
          <form autoComplete="off" onSubmit={handleRegisterSubmit} className="space-y-4">
            <div className="form-group">
              <label>Full Official Name</label>
              <input
                type="text"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                placeholder="e.g. Prakhar Sachan"
                required
              />
              <div className="input-glow"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Email Address</label>
                <input
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="prakhar@example.com"
                  required
                />
                <div className="input-glow"></div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Mobile Number</label>
                <input
                  type="tel"
                  value={registerPhone}
                  onChange={(e) => setRegisterPhone(e.target.value)}
                  placeholder="+91 98112-90123"
                  required
                />
                <div className="input-glow"></div>
              </div>
            </div>

            <div className="form-group">
              <label>Assigned Municipal Ward / Zone</label>
              <select
                value={registerZone}
                onChange={(e) => setRegisterZone(e.target.value)}
                className="cursor-pointer"
              >
                <option value="Sector 12, Central Market">Sector 12, Central Market (Ward A)</option>
                <option value="Sector 18, Commercial Hub">Sector 18, Commercial Hub (Ward B)</option>
                <option value="Sector 44, Metro Transit">Sector 44, Metro Transit (Ward C)</option>
                <option value="Zone A - Commercial">Zone A - Commercial Operations</option>
                <option value="Zone B - Residential">Zone B - Residential Sanitation</option>
                <option value="Headquarters Command Center">Headquarters Command Center</option>
              </select>
              <div className="input-glow"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <div className="flex justify-between items-center mb-1">
                  <label style={{ marginBottom: 0 }}>Password</label>
                  <button
                    type="button"
                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                    className="text-slate-400 hover:text-white transition text-[10px] flex items-center gap-1 font-mono"
                  >
                    {showRegisterPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  </button>
                </div>
                <input
                  type={showRegisterPassword ? 'text' : 'password'}
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  required
                />
                <div className="input-glow"></div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Confirm Password</label>
                <input
                  type={showRegisterPassword ? 'text' : 'password'}
                  value={registerConfirmPassword}
                  onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  required
                />
                <div className="input-glow"></div>
              </div>
            </div>

            {/* Liquid Mercury Register Button */}
            <div className="submit-wrap">
              <div className="mercury-drop"></div>
              <button type="submit" disabled={isSubmitting} className="btn-base">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Connecting Backend...</span>
                  </>
                ) : (
                  <>
                    <span>Register {currentRole.title} Identity</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        <footer className="footer-nav">
          <Link href="/" className="hover:text-cyan-400 flex items-center gap-1">
            <span>&larr; BACK TO OVERVIEW</span>
          </Link>
          <div className="flex items-center gap-2 text-slate-400 text-[10px]">
            {authMode === 'login' ? (
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className="text-cyan-400 hover:underline font-mono"
              >
                Create Account &rarr;
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="text-cyan-400 hover:underline font-mono"
              >
                &larr; Existing Account Login
              </button>
            )}
          </div>
        </footer>
      </main>
    </div>
  );
}
