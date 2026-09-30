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
import { CompleteTaskModal } from '../../../components/worker/CompleteTaskModal';

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
      <div className="p-5 rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#0077CC] text-white flex items-center justify-center text-2xl font-black shadow-sm">
            W
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-[#0F172A]">{currentUser.name}</h1>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                ACTIVE SHIFT
              </span>
            </div>
            <p className="text-xs text-slate-600">Assigned Vehicle: <strong className="text-[#0F172A]">Truck #04 (DL-1Z-9404)</strong> &bull; Commercial Sector</p>
          </div>
        </div>

        <Link
          href="/worker/tasks"
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-[#0077CC] text-xs font-semibold flex items-center gap-1.5 transition shadow-xs"
        >
          <span>View All Route Queue</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 4 Top Field Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-500 font-semibold uppercase">Assigned Tasks</span>
          <div className="text-2xl font-mono font-bold text-[#0F172A] mt-1">{assignedTasks.length}</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-500 font-semibold uppercase">Critical Tasks</span>
          <div className="text-2xl font-mono font-bold text-rose-600 mt-1">{criticalTasks.length}</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-500 font-semibold uppercase">In Progress</span>
          <div className="text-2xl font-mono font-bold text-amber-600 mt-1">{inProgressTasks.length}</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-500 font-semibold uppercase">Completed Today</span>
          <div className="text-2xl font-mono font-bold text-emerald-600 mt-1">{completedToday}</div>
        </div>
      </div>

      {/* Priority Field Work Order */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <span className="text-[10px] font-black text-rose-600 tracking-wider uppercase">
              HIGH-PRIORITY ACTIVE DISPATCH
            </span>
            <h2 className="text-xl font-black text-[#0F172A] mt-0.5">{activeTask.title}</h2>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#0077CC] shrink-0" />
              <span>{activeTask.location} ({activeTask.zone})</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <PriorityBadge priority={activeTask.priority} score={activeTask.priority_score} />
            <StatusBadge status={activeTask.status} />
          </div>
        </div>

        {/* Telemetry Status Before Collection */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <span className="text-slate-500 text-[11px]">Reported Fill Level:</span>
            <div className="font-mono text-base font-bold text-rose-600">{activeTask.before_fill || 94}% CRITICAL</div>
          </div>
          <div>
            <span className="text-slate-500 text-[11px]">Recommended Action:</span>
            <div className="text-[#0F172A] font-medium">Empty immediately & replace liner</div>
          </div>
          <div>
            <span className="text-slate-500 text-[11px]">SLA Due Time:</span>
            <div className="text-amber-700 font-medium">{activeTask.due_time}</div>
          </div>
        </div>

        <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200">
          <strong>Field Instructions:</strong> {activeTask.instructions}
        </p>

        {/* Action Buttons */}
        <div className="pt-2">
          {activeTask.status === 'Assigned' && (
            <button
              onClick={() => handleStartTask(activeTask.id)}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-2 active:scale-95"
            >
              <Navigation className="w-4 h-4" />
              <span>Start Collection &bull; Mark En Route</span>
            </button>
          )}

          {activeTask.status === 'In Progress' && (
            <button
              onClick={() => setShowCompleteModal(true)}
              className="w-full py-3 rounded-xl bg-[#0077CC] hover:bg-[#004A80] text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-2 active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Complete Collection &bull; Submit Photographic Proof</span>
            </button>
          )}

          {activeTask.status === 'Completed' && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
              <span className="text-emerald-700 font-bold text-sm block">Collection Completed & Synchronized with Municipal Operations</span>
              <p className="text-xs text-slate-600">
                Bin {activeTask.bin_id} fill dropped from <strong>{activeTask.before_fill || 95}%</strong> down to <strong>{activeTask.after_fill || 18}%</strong>. Telemetry reset confirmed.
              </p>
              {activeTask.proof_photo && (
                <div className="mt-2 max-w-xs mx-auto rounded-xl overflow-hidden border border-emerald-300 shadow-sm bg-white">
                  <img 
                    src={activeTask.proof_photo.startsWith('data:image') ? activeTask.proof_photo : '/images/smart-waste-hero.jpg'} 
                    alt="Uploaded Proof" 
                    className="w-full h-32 object-cover" 
                  />
                  <div className="bg-slate-50 p-1.5 text-[10px] text-emerald-700 font-mono border-t border-slate-200">
                    Verified Resolution Proof Attached
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Real Photographic Completion Modal */}
      {showCompleteModal && activeTask && (
        <CompleteTaskModal
          task={activeTask}
          onClose={() => setShowCompleteModal(false)}
          onComplete={(taskId, postFill, proofPhoto) => {
            completeTaskWithProof(taskId, postFill, proofPhoto);
            setActiveTask(prev => prev ? { ...prev, status: 'Completed', after_fill: postFill, proof_photo: proofPhoto } : prev);
          }}
        />
      )}
    </div>
  );
}
