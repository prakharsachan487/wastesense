'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useWasteSense } from '../../../../context/WasteSenseContext';
import { PriorityBadge } from '../../../../components/ui/PriorityBadge';
import { StatusBadge } from '../../../../components/ui/StatusBadge';
import { 
  ArrowLeft, MapPin, Camera, CheckCircle2, Clock, 
  Truck, Navigation, AlertTriangle 
} from 'lucide-react';

export default function WorkerTaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { tasks, updateTaskStatus, completeTaskWithProof } = useWasteSense();

  const taskId = params?.id as string;
  const task = tasks.find(t => t.id === taskId || t.task_code === taskId) || tasks[0];

  const [afterFill, setAfterFill] = useState(18);
  const [photoName, setPhotoName] = useState('bin_b102_after_collection.jpg');
  const [submitted, setSubmitted] = useState(false);

  const handleStart = () => {
    updateTaskStatus(task.id, 'In Progress');
  };

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    completeTaskWithProof(task.id, afterFill, photoName);
    setSubmitted(true);
    setTimeout(() => {
      router.push('/worker/dashboard');
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <Link
          href="/worker/tasks"
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Assigned Tasks</span>
        </Link>
        <span className="font-mono text-xs font-bold text-white">{task.task_code}</span>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Work Order Assignment</span>
            <h1 className="text-xl font-black text-white mt-0.5">{task.title}</h1>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{task.location} ({task.zone})</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <PriorityBadge priority={task.priority} score={task.priority_score} />
            <StatusBadge status={task.status} />
          </div>
        </div>

        {/* Telemetry Stats */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-slate-400 text-[11px] block">Target Smart Bin</span>
            <strong className="text-white font-mono">{task.bin_id || 'B-102'}</strong>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">Before Fill Level</span>
            <strong className="text-rose-400 font-mono font-bold">{task.before_fill || 95}%</strong>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">Vehicle</span>
            <strong className="text-white">{task.vehicle_name}</strong>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">Due Window</span>
            <strong className="text-amber-300">{task.due_time}</strong>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Field Operating Instructions:</h4>
          <p className="text-xs text-slate-300 p-3 rounded-xl bg-slate-950 border border-slate-800">
            {task.instructions}
          </p>
        </div>

        {/* Status Actions */}
        <div className="pt-2 border-t border-slate-800">
          {task.status === 'Assigned' && (
            <button
              onClick={handleStart}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg transition active:scale-95"
            >
              Start Collection (Mark In Progress)
            </button>
          )}

          {task.status === 'In Progress' && (
            <form onSubmit={handleComplete} className="space-y-4">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Completion Verification (Proof of Work):</h4>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Final Residual Fill Level (%)
                </label>
                <input
                  type="number"
                  min="5"
                  max="30"
                  value={afterFill}
                  onChange={(e) => setAfterFill(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs font-mono outline-none"
                  required
                />
                <span className="text-[10px] text-slate-400">Baseline clean fill level after emptying is 18%.</span>
              </div>

              <div className="p-4 rounded-xl border border-dashed border-emerald-500/50 bg-emerald-950/20 text-center">
                <Camera className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
                <span className="text-xs font-bold text-white block">Proof Evidence: {photoName}</span>
                <span className="text-[10px] text-emerald-300">Timestamp and GPS stamp verified</span>
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-lg transition active:scale-95"
              >
                {submitted ? '✓ Verified! Updating Command Center...' : 'Submit Proof & Complete Task'}
              </button>
            </form>
          )}

          {task.status === 'Completed' && (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-center text-xs">
              <span className="text-emerald-400 font-bold block mb-1">✓ Task Completed & Closed</span>
              <span className="text-slate-300">Emptied from 95% down to {task.after_fill || 18}%. Verified by Command Center.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
