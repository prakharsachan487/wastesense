'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWasteSense } from '../../context/WasteSenseContext';
import { 
  Bell, Zap, Shield, User, LogOut, Sliders, Award, Truck 
} from 'lucide-react';
import { SmartBinSimulatorModal } from '../admin/SmartBinSimulatorModal';

export const Header: React.FC = () => {
  const router = useRouter();
  const { currentUser, logout, notifications, markNotificationRead } = useWasteSense();
  const [showNotifs, setShowNotifs] = useState(false);
  const [showSimModal, setShowSimModal] = useState(false);

  const role = currentUser.role; // 'admin' | 'citizen' | 'worker'

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <>
      {/* Main Role-Specific Header */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-3 flex items-center justify-between sticky top-0 z-40">
        {/* Brand with Role Context */}
        <div className="flex items-center gap-3">
          <Link 
            href={role === 'admin' ? '/admin/dashboard' : role === 'citizen' ? '/citizen/dashboard' : '/worker/dashboard'} 
            className="flex items-center gap-2.5 group"
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-105 ${
              role === 'admin' ? 'bg-gradient-to-tr from-emerald-600 via-teal-600 to-sky-600 shadow-emerald-900/30' :
              role === 'citizen' ? 'bg-gradient-to-tr from-sky-600 to-indigo-600 shadow-sky-900/30' :
              'bg-gradient-to-tr from-amber-600 to-orange-600 shadow-amber-900/30'
            }`}>
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black tracking-wider text-white">WASTE<span className="text-emerald-400">SENSE</span></span>
                <span className={`text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded border ${
                  role === 'admin' ? 'bg-emerald-950 text-emerald-400 border-emerald-800/60' :
                  role === 'citizen' ? 'bg-sky-950 text-sky-400 border-sky-800/60' :
                  'bg-amber-950 text-amber-400 border-amber-800/60'
                }`}>
                  {role === 'admin' ? 'ADMIN' : role === 'citizen' ? 'CITIZEN' : 'WORKER'}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-tight">
                {role === 'admin' ? 'Citywide Command Center' :
                 role === 'citizen' ? 'Public Resident Services' :
                 'Sanitation Field Telematics'}
              </p>
            </div>
          </Link>
        </div>

        {/* Right Controls: Tailored specifically per Role */}
        <div className="flex items-center gap-3">
          {/* Admin Exclusive: Node Telemetry & Calibration trigger */}
          {role === 'admin' && (
            <button
              onClick={() => setShowSimModal(true)}
              className="hidden md:flex items-center gap-1.5 bg-indigo-950/70 hover:bg-indigo-900/80 text-indigo-300 border border-indigo-700/50 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Node Calibration</span>
            </button>
          )}

          {/* Citizen Exclusive: Eco-Credits Badge */}
          {role === 'citizen' && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-800/50 text-emerald-300 text-xs font-semibold">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>350 Eco-Credits</span>
            </div>
          )}

          {/* Worker Exclusive: Assigned Vehicle Badge */}
          {role === 'worker' && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-800/50 text-amber-300 text-xs font-semibold">
              <Truck className="w-3.5 h-3.5 text-amber-400" />
              <span>Truck #04 Active</span>
            </div>
          )}

          {/* System Notifications (Admin & Worker) */}
          {role !== 'citizen' && (
            <div className="relative">
              <button
                onClick={() => setShowNotifs(!showNotifs)}
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition relative"
                title="System Notifications"
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
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Alerts Queue</span>
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
          )}

          {/* User Profile & Logout */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm border border-slate-700">
              {currentUser.avatar || <User className="w-4 h-4" />}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-semibold text-white leading-tight">{currentUser.name}</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{currentUser.role}</div>
            </div>

            {/* Logout button returning directly to /login */}
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-rose-950/60 hover:text-rose-400 text-slate-400 border border-slate-700 transition flex items-center gap-1 text-xs"
              title="Logout session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline font-semibold">Exit</span>
            </button>
          </div>
        </div>
      </header>

      {/* Simulator Modal for Admin */}
      {showSimModal && (
        <SmartBinSimulatorModal onClose={() => setShowSimModal(false)} />
      )}
    </>
  );
};
