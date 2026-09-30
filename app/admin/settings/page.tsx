'use client';

import React, { useState } from 'react';
import { Settings, Save, Shield, Sliders, Database, Cpu } from 'lucide-react';

export default function AdminSettingsPage() {
  const [criticalThreshold, setCriticalThreshold] = useState(90);
  const [warningThreshold, setWarningThreshold] = useState(70);
  const [autoDispatch, setAutoDispatch] = useState(true);
  const [telemetryInterval, setTelemetryInterval] = useState(3);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Platform Configuration & Parameters</h1>
        <p className="text-xs text-slate-500 mt-1">
          Adjust digital twin telemetry jitter, priority thresholds, and automated dispatch rules
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* IoT Simulation Settings */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <Sliders className="w-4 h-4 text-[#0077CC]" />
            <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">IoT Sensor Telemetry Thresholds</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Critical Alert Threshold (%)
              </label>
              <input
                type="number"
                min="80"
                max="98"
                value={criticalThreshold}
                onChange={(e) => setCriticalThreshold(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] rounded-xl px-3 py-2 text-xs font-mono outline-none focus:border-[#0077CC]"
              />
              <span className="text-[10px] text-slate-500">Default 90%. Bins at or above this trigger CRITICAL alerts.</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Warning Threshold (%)
              </label>
              <input
                type="number"
                min="50"
                max="85"
                value={warningThreshold}
                onChange={(e) => setWarningThreshold(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] rounded-xl px-3 py-2 text-xs font-mono outline-none focus:border-[#0077CC]"
              />
              <span className="text-[10px] text-slate-500">Default 70%. Bins turn amber on map & fleet grid.</span>
            </div>
          </div>
        </div>

        {/* AI Engine Rules */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <Cpu className="w-4 h-4 text-[#0077CC]" />
            <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">Autonomous Dispatch Rules</h3>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <span className="text-xs font-bold text-[#0F172A] block">Automated Dispatch on Critical Overflow (&ge;95%)</span>
                <span className="text-[11px] text-slate-500">Automatically assign nearest available sanitation truck without waiting for manual admin approval.</span>
              </div>
              <input
                type="checkbox"
                checked={autoDispatch}
                onChange={(e) => setAutoDispatch(e.target.checked)}
                className="rounded border-slate-300 text-[#0077CC] focus:ring-[#0077CC] w-4 h-4"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          {saved && (
            <span className="text-xs text-emerald-600 font-bold self-center">
              Platform parameters saved successfully!
            </span>
          )}
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0077CC] hover:bg-[#004A80] text-white text-xs font-bold shadow-sm transition active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
