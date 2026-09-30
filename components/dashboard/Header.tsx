'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWasteSense } from '../../context/WasteSenseContext';
import { 
  Bell, Zap, Shield, User, LogOut, Award, Truck, Settings 
} from 'lucide-react';

export const Header: React.FC = () => {
  const router = useRouter();
  const { currentUser, logout, notifications, markNotificationRead } = useWasteSense();
  const [showNotifs, setShowNotifs] = useState(false);

  const role = currentUser.role; // 'admin' | 'citizen' | 'worker'

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <>
      {/* Main Role-Specific Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-40 text-[#0F172A] shadow-xs">
        {/* Brand with Role Context */}
        <div className="flex items-center gap-3">
          <Link 
            href={role === 'admin' ? '/admin/dashboard' : role === 'citizen' ? '/citizen/dashboard' : '/worker/dashboard'} 
            className="flex items-center gap-2.5 group"
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105 ${
              role === 'admin' ? 'bg-[#0077CC]' :
              role === 'citizen' ? 'bg-[#0EA5E9]' :
              'bg-[#004A80]'
            }`}>
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black tracking-wider text-[#0F172A]">WASTE<span className="text-[#0077CC]">SENSE</span></span>
                <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                  role === 'admin' ? 'bg-[#F0F9FF] text-[#0077CC] border-[#BAE6FD]' :
                  role === 'citizen' ? 'bg-[#F0F9FF] text-[#0EA5E9] border-[#BAE6FD]' :
                  'bg-[#F0F9FF] text-[#004A80] border-[#BAE6FD]'
                }`}>
                  {role === 'admin' ? 'ADMIN' : role === 'citizen' ? 'CITIZEN' : 'WORKER'}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium tracking-tight">
                {role === 'admin' ? 'Citywide Command Center' :
                 role === 'citizen' ? 'Public Resident Services' :
                 'Sanitation Field Telematics'}
              </p>
            </div>
          </Link>
        </div>

        {/* Right Controls: Tailored specifically per Role */}
        <div className="flex items-center gap-3">
          {/* Admin Exclusive: Live System Status indicator */}
          {role === 'admin' && (
            <div className="hidden md:flex items-center gap-2 bg-[#F0F9FF] text-[#0077CC] border border-[#BAE6FD] px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Grid Online (20 Bins)</span>
            </div>
          )}

          {/* Citizen Exclusive: Ward Badge */}
          {role === 'citizen' && (
            <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F0F9FF] border border-[#BAE6FD] text-[#0077CC] text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Ward: Sector 12</span>
            </div>
          )}

          {/* Worker Exclusive: Assigned Vehicle Badge */}
          {role === 'worker' && (
            <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F0F9FF] border border-[#BAE6FD] text-[#004A80] text-xs font-bold">
              <Truck className="w-3.5 h-3.5 text-[#004A80]" />
              <span>Truck #04 Active</span>
            </div>
          )}

          {/* System Notifications (Admin & Worker) */}
          {role !== 'citizen' && (
            <div className="relative">
              <button
                onClick={() => setShowNotifs(!showNotifs)}
                className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-[#0077CC] hover:bg-slate-200 transition relative"
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
                <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                    <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Alerts Queue</span>
                    <span className="text-[10px] text-slate-500">{notifications.length} events</span>
                  </div>
                  <div className="space-y-2 max-h-72 overflow-y-auto">
                    {notifications.map(n => (
                      <div 
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`p-2.5 rounded-xl text-xs cursor-pointer transition ${
                          n.read ? 'bg-slate-50 text-slate-500' : 'bg-[#F0F9FF] text-[#0F172A] border-l-2 border-[#0077CC]'
                        }`}
                      >
                        <div className="font-semibold flex items-center justify-between">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-slate-500">{n.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Settings button for Admin */}
              {role === 'admin' && (
                <Link
                  href="/admin/settings"
                  className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-[#0077CC] hover:bg-slate-200 transition"
                  title="System Settings"
                >
                  <Settings className="w-4 h-4" />
                </Link>
              )}
            </div>
          )}

          {/* User Profile & Logout */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-[#0077CC] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              {currentUser.name ? currentUser.name.charAt(0) : 'U'}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-[#0F172A] leading-tight">{currentUser.name}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{currentUser.role}</div>
            </div>

            {/* Logout button returning directly to landing page */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 border border-slate-200 transition flex items-center gap-1 text-xs"
              title="Exit to Landing Page"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline font-semibold">Exit</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
