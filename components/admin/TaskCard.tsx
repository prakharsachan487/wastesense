import React from 'react';
import { CollectionTask } from '../../types';
import { StatusBadge } from '../ui/StatusBadge';
import { PriorityBadge } from '../ui/PriorityBadge';
import { Truck, User, Clock, CheckCircle2, Navigation } from 'lucide-react';

interface TaskCardProps {
  task: CollectionTask;
  onStatusChange?: (taskId: string, status: CollectionTask['status']) => void;
  onCompleteClick?: (task: CollectionTask) => void;
  isWorkerPortal?: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onStatusChange,
  onCompleteClick,
  isWorkerPortal = false
}) => {
  const isCritical = task.priority === 'CRITICAL';

  return (
    <div className={`p-5 rounded-2xl border transition-all shadow-xs hover:shadow-md ${
      isCritical
        ? 'bg-white border-rose-300'
        : 'bg-white border-slate-200'
    }`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-[#0F172A]">{task.task_code}</span>
            <StatusBadge status={task.status} size="sm" />
          </div>
          <h4 className="text-sm font-bold text-[#0F172A] mt-1">{task.title}</h4>
          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
            <Navigation className="w-3 h-3 text-[#0077CC] shrink-0" />
            <span>{task.location} ({task.zone})</span>
          </p>
        </div>
        <PriorityBadge priority={task.priority} score={task.priority_score} />
      </div>

      <p className="text-xs text-slate-700 mt-3 p-3 rounded-xl bg-[#F8FAFC] border border-slate-200">
        {task.instructions}
      </p>

      {/* Meta row */}
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
        <div className="flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-[#0077CC]" />
          <span className="truncate"><strong>Crew:</strong> {task.worker_name}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Truck className="w-3.5 h-3.5 text-amber-500" />
          <span className="truncate"><strong>Vehicle:</strong> {task.vehicle_name}</span>
        </div>
      </div>

      <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-2.5">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-slate-400" />
          <span>Created {task.created_time}</span>
        </span>
        <span className="text-slate-700 font-semibold">Due: {task.due_time}</span>
      </div>

      {/* Rework Banner if flagged */}
      {task.status === 'Rework' && (
        <div className="mt-3 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-rose-700">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
            <span>ACTION REQUIRED: FLAGGED FOR REWORK</span>
          </div>
          <p className="text-[11px] text-rose-600">{task.rework_reason || 'Photo or GPS validation mismatch. Please re-verify at site.'}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-4 flex items-center gap-2">
        {task.status === 'Assigned' && onStatusChange && (
          <button
            onClick={() => onStatusChange(task.id, 'En Route')}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#0077CC] hover:bg-[#004A80] text-white font-bold text-xs transition shadow-sm flex items-center justify-center gap-1.5"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Accept & Start Route (En Route)</span>
          </button>
        )}

        {task.status === 'En Route' && onStatusChange && (
          <button
            onClick={() => onStatusChange(task.id, 'In Progress')}
            className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition shadow-sm flex items-center justify-center gap-1.5"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>📍 Verify Arrival at Site (&le;100m)</span>
          </button>
        )}

        {(task.status === 'In Progress' || task.status === 'Rework') && onCompleteClick && (
          <button
            onClick={() => onCompleteClick(task)}
            className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{task.status === 'Rework' ? 'Re-Submit Proof for Validation' : 'Complete Collection & Upload Proof'}</span>
          </button>
        )}

        {task.status === 'Completed' && (
          <div className="w-full space-y-2">
            <div className="w-full text-center py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
              Collection Verified & Closed ({task.after_fill || 15}% Reset)
            </div>
            {task.proof_photo && (
              <div className="rounded-xl overflow-hidden border border-emerald-200 bg-[#F0FDF4] p-2 flex items-center gap-3">
                <img
                  src={task.proof_photo.startsWith('data:image') ? task.proof_photo : '/images/landing-hero-dashboard.jpg'}
                  alt="Verified Proof"
                  className="w-12 h-12 rounded-lg object-cover border border-emerald-300 shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-[#0F172A] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Auto-Validation Passed</span>
                  </div>
                  <span className="text-[10px] text-slate-500 block truncate">
                    GPS Geotag: {task.location} {task.proof_lat ? `(${task.proof_lat.toFixed(4)}, ${task.proof_lng?.toFixed(4)})` : ''}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
