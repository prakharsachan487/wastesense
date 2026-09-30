'use client';

import React, { useState } from 'react';
import { useWasteSense } from '../../../context/WasteSenseContext';
import { TaskCard } from '../../../components/admin/TaskCard';
import { CompleteTaskModal } from '../../../components/worker/CompleteTaskModal';
import { CollectionTask } from '../../../types';
import { ClipboardList, PlusCircle, CheckCircle2, UserCheck, Truck } from 'lucide-react';

export default function AdminTasksPage() {
  const { tasks, updateTaskStatus, completeTaskWithProof, workers, vehicles, createTask, bins } = useWasteSense();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedBin, setSelectedBin] = useState('B-102');
  const [selectedWorker, setSelectedWorker] = useState(workers[0].id);
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0].id);

  const [completingTask, setCompletingTask] = useState<CollectionTask | null>(null);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    createTask(selectedBin, selectedWorker, selectedVehicle, 'CRITICAL');
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Collection Task Management</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F0F9FF] text-[#0077CC] font-semibold border border-[#BAE6FD]">
              {tasks.length} Total Work Orders
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Dispatch sanitation teams, assign vehicles, monitor live route progress, and verify closed-loop resolution
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0077CC] hover:bg-[#004A80] text-white text-xs font-bold shadow-sm transition active:scale-95"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Dispatch New Collection Task</span>
        </button>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onStatusChange={(taskId, status) => updateTaskStatus(taskId, status)}
            onCompleteClick={(t) => setCompletingTask(t)}
          />
        ))}
      </div>

      {/* Create Task Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 max-w-md w-full rounded-2xl p-6 shadow-2xl text-[#0F172A]">
            <h3 className="text-base font-bold text-[#0F172A] mb-1">Dispatch Collection Work Order</h3>
            <p className="text-xs text-slate-500 mb-4">Allocate field crew and compactor vehicle to high-priority bin node.</p>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Select Smart Bin</label>
                <select
                  value={selectedBin}
                  onChange={(e) => setSelectedBin(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] rounded-lg px-3 py-2 text-xs outline-none focus:border-[#0077CC]"
                >
                  {bins.map(b => (
                    <option key={b.bin_id} value={b.bin_id}>
                      {b.bin_id} - {b.location} ({b.fill_level}% - {b.status})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Assign Worker Crew</label>
                <select
                  value={selectedWorker}
                  onChange={(e) => setSelectedWorker(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] rounded-lg px-3 py-2 text-xs outline-none focus:border-[#0077CC]"
                >
                  {workers.map(w => (
                    <option key={w.id} value={w.id}>
                      {w.name} ({w.role}) - {w.zone}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Assign Collection Vehicle</label>
                <select
                  value={selectedVehicle}
                  onChange={(e) => setSelectedVehicle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] rounded-lg px-3 py-2 text-xs outline-none focus:border-[#0077CC]"
                >
                  {vehicles.map(v => (
                    <option key={v.id} value={v.id}>
                      {v.name} ({v.type}) - Plate: {v.plate}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-bold bg-[#0077CC] hover:bg-[#004A80] text-white shadow-sm transition active:scale-95"
                >
                  Dispatch Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Completion & Verification Dialog */}
      {completingTask && (
        <CompleteTaskModal
          task={completingTask}
          onClose={() => setCompletingTask(null)}
          onComplete={(taskId, postFill, proofPhoto) => {
            completeTaskWithProof(taskId, postFill, proofPhoto);
            setCompletingTask(null);
          }}
        />
      )}
    </div>
  );
}
