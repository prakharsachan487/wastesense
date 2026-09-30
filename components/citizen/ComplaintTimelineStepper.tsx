'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Complaint, TaskStatus } from '../../types';
import { 
  CheckCircle2, Clock, Truck, ShieldCheck, MapPin, 
  Cpu, Camera, AlertTriangle, ArrowRight, User 
} from 'lucide-react';

interface ComplaintTimelineStepperProps {
  complaint: Complaint;
  onRefresh?: () => void;
}

interface StepItem {
  id: string;
  label: string;
  subtitle: string;
  status: 'completed' | 'current' | 'upcoming';
  timestamp?: string;
}

export const ComplaintTimelineStepper: React.FC<ComplaintTimelineStepperProps> = ({ complaint }) => {
  const normStatus = complaint.status.toUpperCase();

  // Determine stage progression
  // Stages: 1. Submitted -> 2. AI Triaged -> 3. Assigned -> 4. Worker En Route -> 5. On Site -> 6. Collected & Verified
  let currentStageIndex = 2; // Default 'Assigned' is stage 3 (0-indexed: 2)
  if (normStatus === 'SUBMITTED') currentStageIndex = 0;
  else if (normStatus === 'UNDER REVIEW' || normStatus === 'TRIAGED') currentStageIndex = 1;
  else if (normStatus === 'ASSIGNED') currentStageIndex = 2;
  else if (normStatus === 'EN ROUTE' || normStatus === 'IN ROUTE') currentStageIndex = 3;
  else if (normStatus === 'IN PROGRESS' || normStatus === 'ON SITE') currentStageIndex = 4;
  else if (normStatus === 'RESOLVED' || normStatus === 'COMPLETED' || normStatus === 'VERIFIED') currentStageIndex = 5;

  const steps: StepItem[] = [
    {
      id: 'submitted',
      label: 'REPORT SUBMITTED',
      subtitle: 'Citizen GPS ticket registered',
      status: currentStageIndex > 0 ? 'completed' : currentStageIndex === 0 ? 'current' : 'upcoming',
      timestamp: complaint.created_at || '45 mins ago'
    },
    {
      id: 'triaged',
      label: 'AI TRIAGED',
      subtitle: 'Sensor B-102 fill correlation (95% surge verified)',
      status: currentStageIndex > 1 ? 'completed' : currentStageIndex === 1 ? 'current' : 'upcoming',
      timestamp: '32 mins ago'
    },
    {
      id: 'assigned',
      label: 'ASSIGNED',
      subtitle: `Dispatched to ${complaint.assigned_worker || 'Rahul Sharma'} (${complaint.assigned_vehicle || 'Truck #04'})`,
      status: currentStageIndex > 2 ? 'completed' : currentStageIndex === 2 ? 'current' : 'upcoming',
      timestamp: '10 mins ago'
    },
    {
      id: 'en_route',
      label: 'WORKER EN ROUTE',
      subtitle: 'Compactor vehicle en route &bull; ETA ~ 25 min',
      status: currentStageIndex > 3 ? 'completed' : currentStageIndex === 3 ? 'current' : 'upcoming',
      timestamp: currentStageIndex >= 3 ? 'Just now' : 'Pending'
    },
    {
      id: 'on_site',
      label: 'ON SITE',
      subtitle: 'Geofence proximity verified within 100m',
      status: currentStageIndex > 4 ? 'completed' : currentStageIndex === 4 ? 'current' : 'upcoming',
      timestamp: currentStageIndex >= 4 ? 'Just now' : 'Pending'
    },
    {
      id: 'verified',
      label: 'COLLECTED & VERIFIED',
      subtitle: 'Photo proof validated &bull; Telemetry reset to 18%',
      status: currentStageIndex >= 5 ? 'completed' : 'upcoming',
      timestamp: currentStageIndex >= 5 ? 'Just now' : 'Pending'
    }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5">
      {/* Header with Ticket Context */}
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black text-[#0077CC] bg-[#F0F9FF] px-2.5 py-0.5 rounded border border-[#BAE6FD]">
              {complaint.complaint_id}
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
              {complaint.priority} PRIORITY
            </span>
          </div>
          <h3 className="text-base font-black text-[#0F172A] mt-1.5">{complaint.category}: Smart Bin B-102</h3>
          <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{complaint.location} (Sector 12 &bull; Zone A)</span>
          </p>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Live Status</span>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0F9FF] border border-[#BAE6FD] text-[#0077CC] text-xs font-bold mt-0.5">
            <span className="w-2 h-2 rounded-full bg-[#0077CC] animate-pulse" />
            <span>{complaint.status}</span>
          </div>
          {currentStageIndex < 5 && (
            <div className="text-[11px] font-mono font-bold text-amber-700 mt-1">
              ETA ~ 25 min
            </div>
          )}
        </div>
      </div>

      {/* Interactive 6-Stage Timeline Stepper */}
      <div className="relative pl-2 sm:pl-4">
        <div className="space-y-4">
          {steps.map((step, idx) => {
            const isCompleted = step.status === 'completed';
            const isCurrent = step.status === 'current';
            const isUpcoming = step.status === 'upcoming';
            const isLast = idx === steps.length - 1;

            return (
              <div key={step.id} className="relative flex items-start gap-3.5 group">
                {/* Connecting Line */}
                {!isLast && (
                  <div 
                    className={`absolute left-[13px] top-[24px] w-0.5 h-[calc(100%+4px)] transition-colors ${
                      isCompleted ? 'bg-[#0077CC]' : 'bg-slate-200'
                    }`} 
                  />
                )}

                {/* Node Icon Indicator */}
                <div className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                  isCompleted 
                    ? 'bg-[#0077CC] text-white shadow-xs' 
                    : isCurrent 
                    ? 'bg-white border-2 border-[#0077CC] text-[#0077CC] ring-4 ring-[#0077CC]/20' 
                    : 'bg-slate-100 border border-slate-300 text-slate-400'
                }`}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : isCurrent ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0077CC] animate-pulse" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-slate-300" />
                  )}
                </div>

                {/* Step Details */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className={`text-xs font-black tracking-wide ${
                      isCurrent ? 'text-[#0077CC]' : isCompleted ? 'text-[#0F172A]' : 'text-slate-400'
                    }`}>
                      {step.label}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {step.timestamp}
                    </span>
                  </div>
                  <p className={`text-xs mt-0.5 leading-relaxed ${
                    isCurrent ? 'text-slate-800 font-semibold' : isCompleted ? 'text-slate-600' : 'text-slate-400'
                  }`} dangerouslySetInnerHTML={{ __html: step.subtitle }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Field Crew Assigned Card */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#0077CC] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            RS
          </div>
          <div>
            <div className="font-bold text-[#0F172A]">
              Assigned Field Crew: {complaint.assigned_worker || 'Rahul Sharma'}
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              Vehicle: <strong>{complaint.assigned_vehicle || 'Truck #04 (Compact Compactor)'}</strong> &bull; Commercial Sanitation Unit
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
            GPS Mesh Linked
          </span>
        </div>
      </div>
    </div>
  );
};
