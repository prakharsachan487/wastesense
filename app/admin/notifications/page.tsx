'use client';

import React from 'react';
import { useWasteSense } from '../../../context/WasteSenseContext';
import { Bell, CheckCheck, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

export default function AdminNotificationsPage() {
  const { notifications, markNotificationRead } = useWasteSense();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">System Alerts & Notifications</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F0F9FF] text-[#0077CC] font-semibold border border-[#BAE6FD]">
              {notifications.filter(n => !n.read).length} Unread
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time audit log of critical bin fill surges, citizen tickets, and driver dispatch confirmations
          </p>
        </div>

        <button
          onClick={() => notifications.forEach(n => markNotificationRead(n.id))}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs transition"
        >
          <CheckCheck className="w-3.5 h-3.5" />
          <span>Mark All as Read</span>
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => {
          const isAlert = n.type === 'alert';
          const isWarning = n.type === 'warning';
          const isSuccess = n.type === 'success';

          return (
            <div
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`p-4 rounded-xl border transition cursor-pointer flex items-start justify-between gap-4 ${
                !n.read 
                  ? 'bg-white border-slate-200 shadow-xs' 
                  : 'bg-slate-50/70 border-slate-200/70 opacity-75'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                  isAlert ? 'bg-rose-50 text-rose-600 border border-rose-200' :
                  isWarning ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                  isSuccess ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-[#F0F9FF] text-[#0077CC] border border-[#BAE6FD]'
                }`}>
                  {isAlert ? <AlertTriangle className="w-4 h-4" /> :
                   isSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#0F172A]">{n.title}</h4>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-[#0077CC]" />
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{n.message}</p>
                </div>
              </div>

              <span className="text-[11px] text-slate-400 font-mono shrink-0">{n.timestamp}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
