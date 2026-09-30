'use client';

import React from 'react';
import { useWasteSense } from '../../../context/WasteSenseContext';
import { Bell, CheckCheck, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

export default function AdminNotificationsPage() {
  const { notifications, markNotificationRead } = useWasteSense();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">System Alerts & Notifications</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
              {notifications.filter(n => !n.read).length} Unread
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time audit log of critical bin fill surges, citizen tickets, and driver dispatch confirmations
          </p>
        </div>

        <button
          onClick={() => notifications.forEach(n => markNotificationRead(n.id))}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 transition"
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
                  ? 'bg-slate-900 border-slate-700 shadow-md' 
                  : 'bg-slate-950/60 border-slate-800/80 opacity-75'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                  isAlert ? 'bg-rose-500/20 text-rose-400' :
                  isWarning ? 'bg-amber-500/20 text-amber-400' :
                  isSuccess ? 'bg-emerald-500/20 text-emerald-400' : 'bg-sky-500/20 text-sky-400'
                }`}>
                  {isAlert ? <AlertTriangle className="w-4 h-4" /> :
                   isSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{n.title}</h4>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{n.message}</p>
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
