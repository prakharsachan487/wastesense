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
    <div className={`p-4 rounded-xl border transition-all shadow-md ${
      isCritical
        ? 'bg-rose-950/15 border-rose-500/40'
        : 'bg-slate-900/80 border-slate-800'
    }`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-white">{task.task_code}</span>
            <StatusBadge status={task.status} size="sm" />
          </div>
          <h4 className="text-sm font-bold text-slate-100 mt-1">{task.title}</h4>
          <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
            <Navigation className="w-3 h-3 text-emerald-400 shrink-0" />
            <span>{task.location} ({task.zone})</span>
          </p>
        </div>
        <PriorityBadge priority={task.priority} score={task.priority_score} />
      </div>

      <p className="text-xs text-slate-300 mt-3 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
        {task.instructions}
      </p>

      {/* Meta row */}
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-sky-400" />
          <span className="truncate"><strong>Crew:</strong> {task.worker_name}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Truck className="w-3.5 h-3.5 text-amber-400" />
          <span className="truncate"><strong>Vehicle:</strong> {task.vehicle_name}</span>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-slate-400" />
          <span>Created {task.created_time}</span>
        </span>
        <span className="text-slate-300 font-medium">Due: {task.due_time}</span>
      </div>

      {/* Action Buttons */}
      <div className="mt-3.5 flex items-center gap-2">
        {task.status === 'Assigned' && onStatusChange && (
          <button
            onClick={() => onStatusChange(task.id, 'In Progress')}
            className="flex-1 py-1.5 px-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition"
          >
            Start Route / In Progress
          </button>
        )}

        {task.status === 'In Progress' && onCompleteClick && (
          <button
            onClick={() => onCompleteClick(task)}
            className="flex-1 py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-900/30 transition flex items-center justify-center gap-1"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Complete Collection & Verify</span>
          </button>
        )}

        {task.status === 'Completed' && (
          <div className="w-full text-center py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            ✓ Collection Verified & Closed (18% Reset)
          </div>
        )}
      </div>
    </div>
  );
};
