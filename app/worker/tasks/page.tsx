'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useWasteSense } from '../../../context/WasteSenseContext';
import { TaskCard } from '../../../components/admin/TaskCard';
import { CompleteTaskModal } from '../../../components/worker/CompleteTaskModal';
import { CollectionTask } from '../../../types';
import { ArrowLeft } from 'lucide-react';

export default function WorkerTasksPage() {
  const { tasks, updateTaskStatus, completeTaskWithProof } = useWasteSense();
  const [selectedTaskForComplete, setSelectedTaskForComplete] = useState<CollectionTask | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Today's Assigned Task Queue</h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete route sequence for Truck #04 &bull; Rahul Sharma
          </p>
        </div>
        <Link
          href="/worker/dashboard"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 hover:text-white"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Dashboard</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onStatusChange={(taskId, status) => updateTaskStatus(taskId, status)}
            onCompleteClick={(t) => setSelectedTaskForComplete(t)}
            isWorkerPortal
          />
        ))}
      </div>

      {selectedTaskForComplete && (
        <CompleteTaskModal
          task={selectedTaskForComplete}
          onClose={() => setSelectedTaskForComplete(null)}
          onComplete={(taskId, postFill, proofPhoto) => {
            completeTaskWithProof(taskId, postFill, proofPhoto);
            setSelectedTaskForComplete(null);
          }}
        />
      )}
    </div>
  );
}
