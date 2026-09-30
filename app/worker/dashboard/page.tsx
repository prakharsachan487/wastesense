'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useWasteSense } from '../../../context/WasteSenseContext';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { PriorityBadge } from '../../../components/ui/PriorityBadge';
import { AnimatedNumber } from '../../../components/ui/AnimatedNumber';
import { 
  ClipboardList, AlertTriangle, CheckCircle2, Clock, Truck, 
  MapPin, Camera, Navigation, ArrowRight, Check, Play, ShieldAlert,
  RotateCcw, Sparkles, Compass, CheckCheck, Upload
} from 'lucide-react';
import { CompleteTaskModal } from '../../../components/worker/CompleteTaskModal';

export default function WorkerDashboardPage() {
  const { 
    tasks, 
    updateTaskStatus, 
    completeTaskWithProof, 
    currentUser, 
    updateComplaintStatus, 
    resetBinToClean, 
    simulateSurgeB102,
    bins
  } = useWasteSense();

  // Find active B-102 task or first critical task
  const [selectedTaskId, setSelectedTaskId] = useState<string>(
    tasks.find(t => t.bin_id === 'B-102')?.id || tasks[0]?.id || ''
  );
  const activeTask = tasks.find(t => t.id === selectedTaskId) || tasks.find(t => t.bin_id === 'B-102') || tasks[0];

  // Resolve matching live bin telemetry
  const linkedBin = bins.find(b => b.bin_id === activeTask?.bin_id);

  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [proofFill, setProofFill] = useState(18);

  const assignedTasks = tasks.filter(t => t.status === 'Assigned' || t.status === 'Accepted');
  const criticalTasks = tasks.filter(t => t.priority === 'CRITICAL' && t.status !== 'Completed');
  const completedToday = tasks.filter(t => t.status === 'Completed').length + 9;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress' || t.status === 'En Route' || t.status === 'On Site');

  // STEP-BY-STEP LIFECYCLE HANDLERS
  const handleAcceptTask = () => {
    if (!activeTask) return;
    updateTaskStatus(activeTask.id, 'Accepted');
  };

  const handleStartRoute = () => {
    if (!activeTask) return;
    updateTaskStatus(activeTask.id, 'En Route');
    if (activeTask.complaint_id) {
      updateComplaintStatus(activeTask.complaint_id, 'En Route');
    }
  };

  const handleArriveAtSite = () => {
    if (!activeTask) return;
    updateTaskStatus(activeTask.id, 'On Site');
  };

  const handleStartCollection = () => {
    if (!activeTask) return;
    updateTaskStatus(activeTask.id, 'In Progress');
    if (activeTask.complaint_id) {
      updateComplaintStatus(activeTask.complaint_id, 'In Progress');
    }
  };

  const handleQuickDemoComplete = () => {
    if (!activeTask) return;
    completeTaskWithProof(activeTask.id, 18, '/images/smart-waste-hero.jpg');
    if (activeTask.bin_id) {
      resetBinToClean(activeTask.bin_id);
    }
    if (activeTask.complaint_id) {
      updateComplaintStatus(activeTask.complaint_id, 'Resolved');
    }
  };

  const currentStatus = activeTask?.status || 'Assigned';
  const isB102 = activeTask?.bin_id === 'B-102';

  // Live fill level from linked bin or task snapshot
  const currentFill = linkedBin ? linkedBin.fill_level : (currentStatus === 'Completed' ? 18 : 95);

  return (
    <div className="space-y-6">
      {/* 1. Mobile-First Worker Top Bar */}
      <div className="p-5 rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#0077CC] text-white flex items-center justify-center text-xl font-black shadow-sm">
            RS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-[#0F172A]">{currentUser.name || 'Rahul Sharma'}</h1>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                ACTIVE SHIFT
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Assigned Unit: <strong className="text-[#0077CC]">Truck #04 (DL-1Z-9404)</strong> &bull; Commercial Sanitation Zone A
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {currentStatus === 'Completed' && isB102 && (
            <button
              onClick={() => simulateSurgeB102()}
              className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition flex items-center gap-1 shadow-xs"
              title="Reset B-102 to 95% critical for demo"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Simulate Surge Again</span>
            </button>
          )}

          <Link
            href="/worker/tasks"
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-[#0077CC] text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
          >
            <span>All Route Tasks ({tasks.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 2. Top Field Metrics Strip with Animated Numbers */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Assigned Queue</span>
          <div className="text-2xl font-mono font-bold text-[#0F172A] mt-0.5">
            <AnimatedNumber value={assignedTasks.length} padZero />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[10px] font-extrabold text-rose-600 uppercase tracking-wider block">Critical Urgency</span>
          <div className="text-2xl font-mono font-bold text-rose-600 mt-0.5">
            <AnimatedNumber value={criticalTasks.length} padZero />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[10px] font-extrabold text-amber-600 uppercase tracking-wider block">In Progress</span>
          <div className="text-2xl font-mono font-bold text-amber-600 mt-0.5">
            <AnimatedNumber value={inProgressTasks.length} padZero />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-wider block">Completed Shift</span>
          <div className="text-2xl font-mono font-bold text-emerald-600 mt-0.5">
            <AnimatedNumber value={completedToday} padZero />
          </div>
        </div>
      </div>

      {/* 3. MAIN WORK ORDER HERO CARD (Touch-First & Action-Driven) */}
      {activeTask && (
        <div className="p-6 md:p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-md space-y-6">
          {/* Card Topline */}
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-black tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 inline-block mb-1.5">
                CRITICAL DISPATCH &bull; PRIORITY DISPATCH ORDER
              </span>
              <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">
                Smart Bin {activeTask.bin_id}
              </h2>
              <p className="text-xs text-slate-600 font-semibold flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#0077CC]" />
                <span>{activeTask.location} &bull; {activeTask.zone}</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <PriorityBadge priority={activeTask.priority} score={activeTask.priority_score} />
              <StatusBadge status={currentStatus} />
            </div>
          </div>

          {/* Large Live Fill Level Gauge & Animated Telemetry */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Real-time Fill Level</span>
                <span className="text-[11px] text-slate-400">Ultrasonic Sensor &bull; Commercial Organics</span>
              </div>
              <div className="text-right">
                <div className={`font-mono text-4xl font-black transition-colors ${
                  currentFill >= 90 ? 'text-rose-600' : 'text-emerald-600'
                }`}>
                  <AnimatedNumber value={currentFill} format={(v) => `${v}%`} />
                </div>
                <span className={`text-[11px] font-bold uppercase tracking-wider ${
                  currentFill >= 90 ? 'text-rose-600' : 'text-emerald-700'
                }`}>
                  {currentFill >= 90 ? 'CRITICAL OVERFLOW' : 'NORMAL / EMPTIED'}
                </span>
              </div>
            </div>

            {/* Smooth Fill Progress Bar */}
            <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden border border-slate-300/60">
              <motion.div
                initial={false}
                animate={{ width: `${currentFill}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={`h-full ${currentFill >= 90 ? 'bg-rose-500' : 'bg-emerald-500'}`}
              />
            </div>

            {/* AI Priority & SLA Due Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-200/80 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">AI Priority Score</span>
                <strong className="text-purple-700 font-mono text-base font-black">
                  {activeTask.priority_score} / 100
                </strong>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">SLA Due Buffer</span>
                <strong className="text-amber-700 font-mono text-base font-black">
                  {currentStatus === 'Completed' ? 'COMPLIED' : '35 MIN'}
                </strong>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-slate-200 col-span-2 sm:col-span-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Telemetry Status</span>
                <strong className="text-slate-800 font-mono text-base font-bold">
                  {currentStatus === 'Completed' ? '18% Flushed' : '95% Active'}
                </strong>
              </div>
            </div>
          </div>

          {/* WHY THIS BIN? AI RATIONALE */}
          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 text-xs space-y-2">
            <div className="font-extrabold text-purple-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
              <span className="tracking-wide">WHY THIS BIN? (AI DISPATCH REASONING)</span>
            </div>
            <ul className="text-xs text-purple-950 space-y-1 pl-4 list-disc font-medium">
              <li><strong>{currentStatus === 'Completed' ? '18%' : '95%'} fill level</strong> &bull; Ultrasonic telemetry verified via LoRaWAN node</li>
              <li><strong>2 citizen complaints nearby</strong> (Ticket WS-2026-1042 registered in Central Market)</li>
              <li><strong>4.2h elapsed since last collection cycle</strong> during commercial peak market footfall</li>
            </ul>
          </div>

          {/* Field Instructions */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
            <strong>Field Instructions:</strong> {activeTask.instructions}
          </div>

          {/* 4. DISCRETE ACTION-FIRST LIFECYCLE BUTTONS */}
          <div className="pt-2">
            {/* Step 1: ASSIGNED -> ACCEPT TASK */}
            {currentStatus === 'Assigned' && (
              <button
                onClick={handleAcceptTask}
                className="w-full py-4 rounded-2xl bg-[#0077CC] hover:bg-[#004A80] text-white font-black text-sm shadow-md transition flex items-center justify-center gap-2 active:scale-95"
              >
                <Check className="w-5 h-5" />
                <span>ACCEPT TASK</span>
              </button>
            )}

            {/* Step 2: ACCEPTED -> START ROUTE */}
            {currentStatus === 'Accepted' && (
              <button
                onClick={handleStartRoute}
                className="w-full py-4 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-sm shadow-md transition flex items-center justify-center gap-2 active:scale-95"
              >
                <Navigation className="w-5 h-5" />
                <span>START ROUTE &bull; MARK EN ROUTE</span>
              </button>
            )}

            {/* Step 3: EN ROUTE -> I'VE ARRIVED */}
            {currentStatus === 'En Route' && (
              <button
                onClick={handleArriveAtSite}
                className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm shadow-md transition flex items-center justify-center gap-2 active:scale-95"
              >
                <MapPin className="w-5 h-5" />
                <span>I&apos;VE ARRIVED AT SITE (VERIFY GEOFENCE)</span>
              </button>
            )}

            {/* Step 4: ON SITE -> START COLLECTION */}
            {currentStatus === 'On Site' && (
              <button
                onClick={handleStartCollection}
                className="w-full py-4 rounded-2xl bg-[#0077CC] hover:bg-[#004A80] text-white font-black text-sm shadow-md transition flex items-center justify-center gap-2 active:scale-95"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>START COLLECTION</span>
              </button>
            )}

            {/* Step 5: IN PROGRESS -> COMPLETE COLLECTION & PROOF */}
            {currentStatus === 'In Progress' && (
              <div className="space-y-2">
                <button
                  onClick={() => setShowCompleteModal(true)}
                  className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md transition flex items-center justify-center gap-2 active:scale-95"
                >
                  <Camera className="w-5 h-5" />
                  <span>COMPLETE COLLECTION &bull; TAKE PHOTO PROOF</span>
                </button>

                <button
                  onClick={handleQuickDemoComplete}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
                >
                  1-Click Quick Demo Complete (Skip Photo)
                </button>
              </div>
            )}

            {/* Step 6: VERIFIED / COMPLETED */}
            {currentStatus === 'Completed' && (
              <div className="p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-sm">
                  <CheckCheck className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-emerald-900">TASK COMPLETE &bull; RESOLUTION VERIFIED</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Smart Bin <strong>{activeTask.bin_id}</strong> emptied. Telemetry reset from <strong>95%</strong> down to <strong>18%</strong>.
                  </p>
                  <p className="text-[11px] text-emerald-800 font-bold mt-0.5">
                    Citizen Ticket WS-2026-1042 automatically marked RESOLVED.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 pt-2">
                  <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-white border border-emerald-300 text-emerald-800 font-bold">
                    GPS Geofence: 14m Verified
                  </span>
                  <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-white border border-emerald-300 text-emerald-800 font-bold">
                    Clean Container Proof Attached
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Complete Task Modal */}
      {showCompleteModal && activeTask && (
        <CompleteTaskModal
          task={activeTask}
          onClose={() => setShowCompleteModal(false)}
          onComplete={() => {
            setShowCompleteModal(false);
            if (activeTask.bin_id) resetBinToClean(activeTask.bin_id);
            if (activeTask.complaint_id) updateComplaintStatus(activeTask.complaint_id, 'Resolved');
          }}
        />
      )}
    </div>
  );
}
