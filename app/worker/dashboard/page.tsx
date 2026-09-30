'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useWasteSense } from '../../../context/WasteSenseContext';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { PriorityBadge } from '../../../components/ui/PriorityBadge';
import { 
  ClipboardList, AlertTriangle, CheckCircle2, Clock, Truck, 
  MapPin, Camera, Navigation, ArrowRight, Check 
} from 'lucide-react';

export default function WorkerDashboardPage() {
  const { tasks, updateTaskStatus, completeTaskWithProof, currentUser } = useWasteSense();

  const [activeTask, setActiveTask] = useState(
    tasks.find(t => t.bin_id === 'B-102') || tasks[0]
  );
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [proofFill, setProofFill] = useState(18);
  const [photoUploaded, setPhotoUploaded] = useState(false);

  const assignedTasks = tasks.filter(t => t.status === 'Assigned');
  const criticalTasks = tasks.filter(t => t.priority === 'CRITICAL' && t.status !== 'Completed');
  const completedToday = tasks.filter(t => t.status === 'Completed').length + 9;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress');

  const handleStartTask = (taskId: string) => {
    updateTaskStatus(taskId, 'In Progress');
    setActiveTask(prev => prev ? { ...prev, status: 'In Progress' } : prev);
  };

  const handleCompleteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTask) return;
    completeTaskWithProof(activeTask.id, proofFill, 'proof_b102_empty.jpg');
    setActiveTask(prev => prev ? { ...prev, status: 'Completed', after_fill: proofFill } : prev);
    setShowCompleteModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Mobile-Friendly Profile Header */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-600/30 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center text-2xl font-black shadow-lg">
            👷
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white">{currentUser.name}</h1>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                ACTIVE SHIFT
              </span>
            </div>
            <p className="text-xs text-slate-400">Assigned Vehicle: <strong className="text-white">Truck #04 (DL-1Z-9404)</strong> &bull; Commercial Sector</p>
          </div>
        </div>

        <Link
          href="/worker/tasks"
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
        >
          <span>View All Route Queue</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 4 Top Field Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-slate-400 font-semibold uppercase">Assigned Tasks</span>
          <div className="text-2xl font-mono font-bold text-white mt-1">{assignedTasks.length}</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-slate-400 font-semibold uppercase">Critical Tasks</span>
          <div className="text-2xl font-mono font-bold text-rose-400 mt-1">{criticalTasks.length}</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-slate-400 font-semibold uppercase">In Progress</span>
          <div className="text-2xl font-mono font-bold text-amber-400 mt-1">{inProgressTasks.length}</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-slate-400 font-semibold uppercase">Completed Today</span>
          <div className="text-2xl font-mono font-bold text-emerald-400 mt-1">{completedToday}</div>
        </div>
      </div>

      {/* Priority Field Work Order */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-black text-rose-400 tracking-wider uppercase">
              HIGH-PRIORITY ACTIVE DISPATCH
            </span>
            <h2 className="text-xl font-black text-white mt-0.5">{activeTask.title}</h2>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{activeTask.location} ({activeTask.zone})</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <PriorityBadge priority={activeTask.priority} score={activeTask.priority_score} />
            <StatusBadge status={activeTask.status} />
          </div>
        </div>

        {/* Telemetry Status Before Collection */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <span className="text-slate-400 text-[11px]">Reported Fill Level:</span>
            <div className="font-mono text-base font-bold text-rose-400">{activeTask.before_fill || 94}% CRITICAL</div>
          </div>
          <div>
            <span className="text-slate-400 text-[11px]">Recommended Action:</span>
            <div className="text-white font-medium">Empty immediately & replace liner</div>
          </div>
          <div>
            <span className="text-slate-400 text-[11px]">SLA Due Time:</span>
            <div className="text-amber-300 font-medium">{activeTask.due_time}</div>
          </div>
        </div>

        <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
          <strong>Field Instructions:</strong> {activeTask.instructions}
        </p>

        {/* Action Buttons */}
        <div className="pt-2">
          {activeTask.status === 'Assigned' && (
            <button
              onClick={() => handleStartTask(activeTask.id)}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-950 transition flex items-center justify-center gap-2 active:scale-95"
            >
              <Navigation className="w-4 h-4" />
              <span>Start Collection &bull; Mark En Route</span>
            </button>
          )}

          {activeTask.status === 'In Progress' && (
            <button
              onClick={() => setShowCompleteModal(true)}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-lg shadow-emerald-950 transition flex items-center justify-center gap-2 active:scale-95 animate-pulse"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Complete Collection &bull; Submit Photographic Proof</span>
            </button>
          )}

          {activeTask.status === 'Completed' && (
            <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-center space-y-1">
              <span className="text-emerald-400 font-bold text-sm block">✓ Collection Completed & Synchronized with Municipal Operations</span>
              <p className="text-xs text-slate-300">
                Bin B-102 fill dropped from <strong>95%</strong> down to <strong>18%</strong>. Telemetry reset confirmed.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Completion Modal */}
      {showCompleteModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 max-w-md w-full rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Complete & Verify Collection</h3>
            <p className="text-xs text-slate-400">
              Submit proof of emptying for <strong>{activeTask.bin_id} ({activeTask.location})</strong>.
            </p>

            <form onSubmit={handleCompleteSubmit} className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex justify-between items-center">
                <span className="text-slate-400">Initial Overflow Reading:</span>
                <span className="font-mono text-rose-400 font-bold">95% (Critical)</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Post-Collection Fill Level (%)
                </label>
                <input
                  type="number"
                  min="5"
                  max="30"
                  value={proofFill}
                  onChange={(e) => setProofFill(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3 py-2.5 text-xs font-mono outline-none"
                  required
                />
                <span className="text-[10px] text-slate-400">Baseline clean fill level is set to 18%.</span>
              </div>

              {/* Photo Upload Simulation */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Upload Photo Verification Proof</label>
                <button
                  type="button"
                  onClick={() => setPhotoUploaded(!photoUploaded)}
                  className={`w-full p-4 rounded-xl border border-dashed text-center transition ${
                    photoUploaded 
                      ? 'border-emerald-500 bg-emerald-950/20 text-emerald-300' 
                      : 'border-slate-700 bg-slate-950 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  <Camera className="w-6 h-6 mx-auto mb-1.5" />
                  <span className="text-xs font-bold block">
                    {photoUploaded ? '✓ Photo Attached: clean_bin_b102.jpg' : 'Click to take/attach photo proof'}
                  </span>
                  <span className="text-[10px] text-slate-400">GPS & Timestamp embedded</span>
                </button>
              </div>

              <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCompleteModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition"
                >
                  Submit & Resolve Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
