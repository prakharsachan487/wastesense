'use client';

import React, { useState } from 'react';
import { useWasteSense } from '../../context/WasteSenseContext';
import { Sliders, X, Flame, AlertTriangle, CheckCircle2, Zap } from 'lucide-react';
import { PriorityBadge } from '../ui/PriorityBadge';

interface ModalProps {
  onClose: () => void;
  targetBinId?: string;
}

export const SmartBinSimulatorModal: React.FC<ModalProps> = ({ onClose, targetBinId = 'B-102' }) => {
  const { bins, updateBinTelemetry, createTask, workers, vehicles } = useWasteSense();

  const [selectedBinId, setSelectedBinId] = useState<string>(targetBinId);
  const currentBin = bins.find(b => b.bin_id === selectedBinId) || bins[0];

  const [fillLevel, setFillLevel] = useState<number>(currentBin.fill_level);
  const [weight, setWeight] = useState<number>(currentBin.weight);
  const [temperature, setTemperature] = useState<number>(currentBin.temperature);
  const [battery, setBattery] = useState<number>(currentBin.battery);

  const [taskCreated, setTaskCreated] = useState<boolean>(false);

  const handleBinSelect = (id: string) => {
    setSelectedBinId(id);
    const b = bins.find(item => item.bin_id === id);
    if (b) {
      setFillLevel(b.fill_level);
      setWeight(b.weight);
      setTemperature(b.temperature);
      setBattery(b.battery);
    }
  };

  const handleApplyPreset = (fill: number, wt: number, temp: number, bat: number) => {
    setFillLevel(fill);
    setWeight(wt);
    setTemperature(temp);
    setBattery(bat);
  };

  const handlePublish = () => {
    updateBinTelemetry(selectedBinId, fillLevel, weight, temperature, battery);
    onClose();
  };

  const handleCreateTaskFromModal = () => {
    createTask(selectedBinId, workers[0].id, vehicles[0].id, 'CRITICAL');
    setTaskCreated(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  const isCritical = fillLevel >= 90 || temperature >= 50;
  const isOverflowRisk = fillLevel >= 95;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Virtual IoT / Digital Twin Simulator</h3>
              <p className="text-xs text-slate-400">Inject real-time sensor events without physical hardware</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Target Bin Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Select Target Smart Bin</label>
            <select
              value={selectedBinId}
              onChange={(e) => handleBinSelect(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              {bins.map(b => (
                <option key={b.bin_id} value={b.bin_id}>
                  {b.bin_id} - {b.location} ({b.fill_level}% - {b.status})
                </option>
              ))}
            </select>
          </div>

          {/* Quick Preset Buttons */}
          <div>
            <div className="text-xs font-semibold text-slate-400 mb-2">Simulation Presets:</div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleApplyPreset(18, 1.4, 25.0, 95)}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-950/60 border border-emerald-700/50 text-emerald-300 text-xs font-semibold hover:bg-emerald-900/60 transition"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Normal (18%)</span>
              </button>

              <button
                type="button"
                onClick={() => handleApplyPreset(76, 6.2, 28.0, 88)}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-amber-950/60 border border-amber-700/50 text-amber-300 text-xs font-semibold hover:bg-amber-900/60 transition"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Warning (76%)</span>
              </button>

              <button
                type="button"
                onClick={() => handleApplyPreset(95, 8.5, 29.5, 87)}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-rose-950/70 border border-rose-600/60 text-rose-300 text-xs font-semibold hover:bg-rose-900/70 transition shadow-sm shadow-rose-950"
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Critical (95%)</span>
              </button>
            </div>
          </div>

          {/* Live Sliders */}
          <div className="space-y-3.5 pt-2">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Ultrasonic Fill Level Sensor</span>
                <span className={`font-mono text-sm ${fillLevel >= 90 ? 'text-rose-400 font-bold' : 'text-slate-300'}`}>
                  {fillLevel}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={fillLevel}
                onChange={(e) => setFillLevel(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Load Cell Weight (Strain Gauge)</span>
                <span className="font-mono text-slate-300">{weight} kg</span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Internal Thermistor (°C)</span>
                <span className="font-mono text-slate-300">{temperature}°C</span>
              </div>
              <input
                type="range"
                min="15"
                max="65"
                step="0.5"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>

          {/* AI Risk Detection Feedback */}
          {isCritical && (
            <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-rose-300 text-xs font-bold">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>CRITICAL OVERFLOW THRESHOLD EXCEEDED</span>
                </div>
                <PriorityBadge priority="CRITICAL" score={95} />
              </div>
              <p className="text-[11px] text-slate-300">
                {isOverflowRisk 
                  ? "Bin fill level is >= 95%. Immediate overflow risk active. AI suggests creating an automated collection task."
                  : "Sensor reading has breached the 90% municipal critical threshold."}
              </p>

              {isOverflowRisk && (
                <button
                  type="button"
                  onClick={handleCreateTaskFromModal}
                  disabled={taskCreated}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-900/40 transition active:scale-95 disabled:bg-emerald-700"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>{taskCreated ? '✓ Task Created & Dispatched to Rahul!' : '⚡ Create Collection Task (Auto-Assign)'}</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:bg-slate-800 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handlePublish}
            className="px-4 py-2 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/30 transition active:scale-95"
          >
            Publish Telemetry to Digital Twin
          </button>
        </div>
      </div>
    </div>
  );
};
