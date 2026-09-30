'use client';

import React, { useState } from 'react';
import { Complaint, WorkerProfile } from '../../types';
import { StatusBadge } from '../ui/StatusBadge';
import { PriorityBadge } from '../ui/PriorityBadge';
import { useWasteSense } from '../../context/WasteSenseContext';
import { Filter, UserCheck, CheckCircle, Clock } from 'lucide-react';

interface ComplaintTableProps {
  complaints: Complaint[];
}

export const ComplaintTable: React.FC<ComplaintTableProps> = ({ complaints }) => {
  const { workers, updateComplaintStatus, createTask, vehicles } = useWasteSense();

  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  const filtered = complaints.filter(c => {
    if (categoryFilter !== 'All' && c.category !== categoryFilter) return false;
    if (statusFilter !== 'All' && c.status !== statusFilter) return false;
    if (priorityFilter !== 'All' && c.priority !== priorityFilter) return false;
    return true;
  });

  const handleAssignWorker = (complaintId: string, workerName: string) => {
    updateComplaintStatus(complaintId, 'Assigned', workerName);
  };

  const handleResolve = (complaintId: string) => {
    updateComplaintStatus(complaintId, 'Resolved');
  };

  const handleCreateTask = (complaint: Complaint) => {
    createTask('B-102', workers[0].id, vehicles[0].id, complaint.priority);
    updateComplaintStatus(complaint.complaint_id, 'In Progress', workers[0].name);
  };

  return (
    <div className="space-y-4">
      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
          <Filter className="w-4 h-4 text-emerald-400" />
          <span>Filters:</span>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-slate-200 px-3 py-1.5 rounded-lg outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Submitted">Submitted</option>
            <option value="Under Review">Under Review</option>
            <option value="Assigned">Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-slate-200 px-3 py-1.5 rounded-lg outline-none"
          >
            <option value="All">All Priorities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-slate-200 px-3 py-1.5 rounded-lg outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Overflowing Bin">Overflowing Bin</option>
            <option value="Garbage on Road">Garbage on Road</option>
            <option value="Missed Collection">Missed Collection</option>
            <option value="Illegal Dumping">Illegal Dumping</option>
            <option value="Hazardous Material">Hazardous Material</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
            <tr>
              <th className="px-4 py-3">Ticket ID</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Citizen</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Assigned Crew</th>
              <th className="px-4 py-3">Reported</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-slate-300">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-slate-800/40 transition">
                <td className="px-4 py-3.5 font-mono font-bold text-white">
                  {c.complaint_id}
                </td>
                <td className="px-4 py-3.5 font-medium text-slate-200">
                  {c.category}
                </td>
                <td className="px-4 py-3.5 max-w-[180px] truncate" title={c.location}>
                  {c.location}
                </td>
                <td className="px-4 py-3.5 text-slate-400">
                  {c.user_name}
                </td>
                <td className="px-4 py-3.5">
                  <PriorityBadge priority={c.priority} />
                </td>
                <td className="px-4 py-3.5">
                  <StatusBadge status={c.status} size="sm" />
                </td>
                <td className="px-4 py-3.5 text-slate-300">
                  {c.assigned_worker ? (
                    <span className="font-semibold text-sky-400 flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5" />
                      {c.assigned_worker}
                    </span>
                  ) : (
                    <select
                      onChange={(e) => handleAssignWorker(c.complaint_id, e.target.value)}
                      className="bg-slate-950 border border-slate-700 text-slate-400 text-[11px] rounded px-2 py-1 outline-none"
                    >
                      <option value="">+ Assign</option>
                      {workers.map(w => (
                        <option key={w.id} value={w.name}>{w.name}</option>
                      ))}
                    </select>
                  )}
                </td>
                <td className="px-4 py-3.5 text-slate-400 text-[11px]">
                  {c.created_at}
                </td>
                <td className="px-4 py-3.5 text-right space-x-1.5 whitespace-nowrap">
                  <button
                    onClick={() => setSelectedComplaint(c)}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-[11px] transition"
                  >
                    Details
                  </button>

                  {c.status !== 'Resolved' && (
                    <button
                      onClick={() => handleCreateTask(c)}
                      className="px-2.5 py-1 rounded bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 font-semibold text-[11px] border border-emerald-500/30 transition"
                    >
                      Dispatch
                    </button>
                  )}

                  {c.status !== 'Resolved' && (
                    <button
                      onClick={() => handleResolve(c.complaint_id)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-400 font-semibold text-[11px] transition"
                      title="Mark as Resolved"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Complaint Detail Dialog */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-5 shadow-2xl">
            <div className="flex justify-between items-start border-b border-slate-800 pb-3 mb-3">
              <div>
                <span className="font-mono text-sm font-bold text-white">{selectedComplaint.complaint_id}</span>
                <h4 className="text-sm font-bold text-emerald-400">{selectedComplaint.category}</h4>
              </div>
              <button onClick={() => setSelectedComplaint(null)} className="text-slate-400 hover:text-white">&times;</button>
            </div>

            <p className="text-xs text-slate-300 mb-4 bg-slate-950 p-3 rounded-lg border border-slate-800">
              {selectedComplaint.description}
            </p>

            <div className="text-xs text-slate-400 space-y-1.5 mb-4">
              <div><strong>Location:</strong> {selectedComplaint.location}</div>
              <div><strong>Reported By:</strong> {selectedComplaint.user_name} ({selectedComplaint.user_phone || 'N/A'})</div>
              <div><strong>Assigned Team:</strong> {selectedComplaint.assigned_worker || 'Unassigned'}</div>
            </div>

            <div className="border-t border-slate-800 pt-3">
              <h5 className="text-xs font-bold text-white mb-2">Ticket Lifecycle:</h5>
              <div className="space-y-1.5">
                {selectedComplaint.timeline.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[11px]">
                    <span className={`w-2 h-2 rounded-full ${step.completed ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                    <span className={step.completed ? 'text-white font-medium' : 'text-slate-400'}>{step.step}</span>
                    <span className="text-[10px] text-slate-400">({step.timestamp})</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedComplaint(null)}
              className="mt-4 w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
