'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useWasteSense } from '../../../context/WasteSenseContext';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { PriorityBadge } from '../../../components/ui/PriorityBadge';
import { AnimatedNumber } from '../../../components/ui/AnimatedNumber';
import { 
  SkiperBox,
  SkiperStatBox,
  SkiperProgressCard,
  SkiperFeaturedCard,
  SkiperListBox,
  SkiperBannerCard
} from '../../../components/skiper-ui';
import { 
  ClipboardList, AlertTriangle, CheckCircle2, Clock, Truck, 
  MapPin, Camera, Navigation, ArrowRight, Check, Play, ShieldAlert,
  RotateCcw, Sparkles, Compass, CheckCheck, Upload, Trash2, ShieldCheck
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
      {/* 1. Welcoming Header matching reference design */}
      <div className="bg-white/95 rounded-[24px] p-5 sm:p-6 border border-slate-200/90 shadow-[0_2px_14px_rgba(15,23,42,0.04)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#0077CC] text-white flex items-center justify-center text-lg font-black shadow-sm">
              RS
            </div>
            <div>
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                <span>Welcome back, {currentUser?.name || 'Rahul Sharma'}</span>
                <span>👋</span>
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <h1 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
                  Field Operations Crew
                </h1>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  ACTIVE SHIFT
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
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
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-[#0077CC] text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
            >
              <span>All Route Tasks ({tasks.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Bento Grid Section matching reference layout (Left: Featured + List | Right: Progress + 4 Stats + Banner) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Featured Active Task + Route Task Queue */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top Featured Active Task */}
          {activeTask && (
            <SkiperFeaturedCard
              title="Current High-Priority Mission"
              actionText="Manage queue"
              actionHref="/worker/tasks"
              pillBadgeIcon={<Truck className="w-3.5 h-3.5 text-[#0077CC]" />}
              pillBadgeText={`Task ${activeTask.id} • ${activeTask.zone}`}
              leftEntity={{
                title: `Node ${activeTask.bin_id}`,
                subtitle: activeTask.location,
                icon: <Trash2 className="w-5 h-5 text-rose-600" />,
                iconBg: 'bg-rose-50 border border-rose-200',
              }}
              rightEntity={{
                title: 'Truck #04 Active',
                subtitle: 'Assigned Unit',
                icon: <Truck className="w-5 h-5 text-[#0077CC]" />,
                iconBg: 'bg-sky-50 border border-sky-200',
              }}
              connectorText="➔"
              bottomBarText="Live Ultrasonic Fill Level"
              bottomBarValue={`${currentFill}%`}
              progressPercent={currentFill}
              actionButtonText={
                currentStatus === 'Assigned' ? 'Accept Task' :
                currentStatus === 'Accepted' ? 'Start Route' :
                currentStatus === 'En Route' ? 'Arrived On Site' :
                currentStatus === 'On Site' ? 'Start Collection' :
                currentStatus === 'In Progress' ? 'Photo Proof' : 'Completed'
              }
              onActionButtonClick={() => {
                if (currentStatus === 'Assigned') handleAcceptTask();
                else if (currentStatus === 'Accepted') handleStartRoute();
                else if (currentStatus === 'En Route') handleArriveAtSite();
                else if (currentStatus === 'On Site') handleStartCollection();
                else if (currentStatus === 'In Progress') setShowCompleteModal(true);
              }}
            />
          )}

          {/* Assigned Route Queue as Structured SkiperListBox */}
          <SkiperListBox
            title="Assigned Route Queue (Today's Manifest)"
            actionText="All Tasks"
            actionHref="/worker/tasks"
            columnHeaders={['#', 'TASK & DESTINATION', 'DISTANCE', 'PRIORITY', 'STATUS']}
            items={tasks.slice(0, 5).map((t, idx) => {
              const isSelected = t.id === activeTask?.id;
              const isCompleted = t.status === 'Completed';

              return {
                id: t.id,
                rank: idx + 1,
                title: `${t.id} • Bin ${t.bin_id}`,
                subtitle: t.location,
                icon: <ClipboardList className="w-3.5 h-3.5 text-slate-700" />,
                iconBg: isSelected ? 'bg-[#0077CC] text-white' : 'bg-slate-100 text-slate-700',
                col1: `${(idx + 1) * 350}m`,
                col2: `${t.priority_score}/100`,
                badge: <StatusBadge status={t.status} size="sm" />,
                highlight: isSelected,
                onClick: () => setSelectedTaskId(t.id),
                actionNode: (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTaskId(t.id);
                    }}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition ${
                      isSelected
                        ? 'bg-[#0077CC] text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {isSelected ? 'Active' : 'Select'}
                  </button>
                ),
              };
            })}
          />
        </div>

        {/* Right Column (5 cols): Progress Stats + 4 Stat Cards + Banner */}
        <div className="lg:col-span-5 space-y-6">
          {/* Shift Collection Progress Card */}
          <SkiperProgressCard
            title="Shift Manifest & Progress"
            actionText="Manifest"
            actionHref="/worker/tasks"
            segments={[
              { label: 'Completed', count: completedToday, percent: 65, color: 'bg-emerald-500' },
              { label: 'In Progress', count: inProgressTasks.length, percent: 20, color: 'bg-amber-400' },
              { label: 'Assigned', count: assignedTasks.length, percent: 15, color: 'bg-sky-500' },
            ]}
            metrics={[
              { keyLabel: 'ASSIGNED', value: assignedTasks.length },
              { keyLabel: 'COMPLETED', value: completedToday, colorClass: 'text-emerald-600' },
              { keyLabel: 'CRITICAL', value: criticalTasks.length, colorClass: 'text-rose-600' },
              { keyLabel: 'EFFICIENCY', value: '98%', colorClass: 'text-[#0077CC]' },
            ]}
          />

          {/* 4 Compact Stat Cards in 2x2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <SkiperStatBox
              label="Assigned Queue"
              value={assignedTasks.length}
              icon={<ClipboardList className="w-5 h-5" />}
              color="blue"
              subText="Ready for pickup"
            />
            <SkiperStatBox
              label="Critical Urgency"
              value={criticalTasks.length}
              icon={<AlertTriangle className="w-5 h-5" />}
              color="rose"
              subText="Immediate action"
            />
            <SkiperStatBox
              label="In Progress"
              value={inProgressTasks.length}
              icon={<Clock className="w-5 h-5" />}
              color="amber"
              subText="Active on route"
            />
            <SkiperStatBox
              label="Shift Completed"
              value={completedToday}
              icon={<ShieldCheck className="w-5 h-5" />}
              color="emerald"
              subText="Verified with photo"
            />
          </div>

          {/* Bottom Action / Announcement Banner Card */}
          <SkiperBannerCard
            tag="PHOTO PROOF & GPS AUDIT"
            title="Verified Collection Circuit"
            description="Take before/after photo evidence with GPS coordinates (<100m geofence) to close citizen tickets automatically."
            buttonText="Complete Active Task"
            onButtonClick={() => setShowCompleteModal(true)}
            icon={<Sparkles className="w-6 h-6 text-sky-200" />}
          />
        </div>
      </div>

      {/* 3. MAIN WORK ORDER EXECUTION PANEL in a SkiperBox */}
      {activeTask && (
        <SkiperBox
          title={
            <div className="flex items-center gap-2">
              <span>Work Order Execution: Smart Bin {activeTask.bin_id}</span>
              <PriorityBadge priority={activeTask.priority} score={activeTask.priority_score} />
            </div>
          }
          subtitle={`${activeTask.location} • ${activeTask.zone}`}
          actionNode={<StatusBadge status={currentStatus} />}
          icon={<Truck className="w-4 h-4 text-[#0077CC]" />}
        >
          <div className="space-y-5">
            {/* Live Fill Level Gauge & Telemetry Strip */}
            <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-150 space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Real-time Fill Level
                  </span>
                  <span className="text-[11px] text-slate-400">Ultrasonic Sensor &bull; Commercial Organics</span>
                </div>
                <div className="text-right">
                  <div className={`font-mono text-3xl sm:text-4xl font-black transition-colors ${
                    currentFill >= 90 ? 'text-rose-600' : 'text-emerald-600'
                  }`}>
                    <AnimatedNumber value={currentFill} format={(v) => `${v}%`} />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    currentFill >= 90 ? 'text-rose-600' : 'text-emerald-700'
                  }`}>
                    {currentFill >= 90 ? 'CRITICAL OVERFLOW' : 'NORMAL / EMPTIED'}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3.5 bg-slate-200 rounded-full overflow-hidden border border-slate-300/60">
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

            {/* Field Instructions & AI Rationale */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 text-xs space-y-1.5">
                <div className="font-extrabold text-purple-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
                  <span className="tracking-wide">AI DISPATCH REASONING</span>
                </div>
                <ul className="text-xs text-purple-950 space-y-1 pl-4 list-disc font-medium">
                  <li><strong>{currentStatus === 'Completed' ? '18%' : '95%'} fill level</strong> &bull; Ultrasonic telemetry verified</li>
                  <li><strong>Citizen report linked</strong> (Ticket WS-2026-1042)</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex flex-col justify-center">
                <strong className="block text-[#0F172A] mb-1">Field Instructions:</strong>
                <span>{activeTask.instructions}</span>
              </div>
            </div>

            {/* Discrete Lifecycle Action Buttons */}
            <div>
              {/* Step 1: ASSIGNED -> ACCEPT TASK */}
              {currentStatus === 'Assigned' && (
                <button
                  onClick={handleAcceptTask}
                  className="w-full py-3.5 rounded-2xl bg-[#0077CC] hover:bg-[#004A80] text-white font-black text-sm shadow-md transition flex items-center justify-center gap-2 active:scale-95"
                >
                  <Check className="w-5 h-5" />
                  <span>ACCEPT TASK</span>
                </button>
              )}

              {/* Step 2: ACCEPTED -> START ROUTE */}
              {currentStatus === 'Accepted' && (
                <button
                  onClick={handleStartRoute}
                  className="w-full py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-sm shadow-md transition flex items-center justify-center gap-2 active:scale-95"
                >
                  <Navigation className="w-5 h-5" />
                  <span>START ROUTE &bull; MARK EN ROUTE</span>
                </button>
              )}

              {/* Step 3: EN ROUTE -> I'VE ARRIVED */}
              {currentStatus === 'En Route' && (
                <button
                  onClick={handleArriveAtSite}
                  className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm shadow-md transition flex items-center justify-center gap-2 active:scale-95"
                >
                  <MapPin className="w-5 h-5" />
                  <span>I&apos;VE ARRIVED AT SITE (VERIFY GEOFENCE)</span>
                </button>
              )}

              {/* Step 4: ON SITE -> START COLLECTION */}
              {currentStatus === 'On Site' && (
                <button
                  onClick={handleStartCollection}
                  className="w-full py-3.5 rounded-2xl bg-[#0077CC] hover:bg-[#004A80] text-white font-black text-sm shadow-md transition flex items-center justify-center gap-2 active:scale-95"
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
                    className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md transition flex items-center justify-center gap-2 active:scale-95"
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
                <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-center space-y-2.5">
                  <div className="w-11 h-11 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-sm">
                    <CheckCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-emerald-900">TASK COMPLETE &bull; RESOLUTION VERIFIED</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Smart Bin <strong>{activeTask.bin_id}</strong> emptied. Telemetry reset from <strong>95%</strong> down to <strong>18%</strong>.
                    </p>
                    <p className="text-[11px] text-emerald-800 font-bold mt-0.5">
                      Citizen Ticket WS-2026-1042 automatically marked RESOLVED.
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-2 pt-1">
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
        </SkiperBox>
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
