'use client';

import React, { useState } from 'react';
import { Complaint } from '../../types';
import { StatusBadge } from '../ui/StatusBadge';
import { PriorityBadge } from '../ui/PriorityBadge';
import { useWasteSense } from '../../context/WasteSenseContext';
import { Filter, UserCheck, CheckCircle2, Clock, MapPin, Eye, AlertTriangle } from 'lucide-react';

interface ComplaintTableProps {
  complaints: Complaint[];
}

export const ComplaintTable: React.FC<ComplaintTableProps> = ({ complaints }) => {
  const { workers, updateComplaintStatus } = useWasteSense();

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

  return (
    <div className="space-y-4">
      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <Filter className="w-4 h-4 text-[#0077CC]" />
          <span>Filters:</span>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#F8FAFC] border border-slate-200 text-slate-700 font-medium px-3 py-1.5 rounded-xl outline-none focus:border-[#0077CC]"
          >
            <option value="All">All Statuses</option>
            <option value="Submitted">Submitted</option>
            <option value="Assigned">Assigned</option>
            <option value="En Route">En Route</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Rework">Rework</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-[#F8FAFC] border border-slate-200 text-slate-700 font-medium px-3 py-1.5 rounded-xl outline-none focus:border-[#0077CC]"
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
            className="bg-[#F8FAFC] border border-slate-200 text-slate-700 font-medium px-3 py-1.5 rounded-xl outline-none focus:border-[#0077CC]"
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
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F8FAFC] text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
            <tr>
              <th className="px-4 py-3.5">Ticket ID</th>
              <th className="px-4 py-3.5">Category</th>
              <th className="px-4 py-3.5">Location & Zone</th>
              <th className="px-4 py-3.5">Citizen</th>
              <th className="px-4 py-3.5">Status</th>
              <th className="px-4 py-3.5">Assigned Crew</th>
              <th className="px-4 py-3.5">Logged At</th>
              <th className="px-4 py-3.5 text-right">Audit & Verification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filtered.map(c => (
              <tr key={c.id} className="hover:bg-slate-50/80 transition">
                <td className="px-4 py-3.5 font-mono font-bold text-[#0077CC]">
                  {c.complaint_id}
                </td>
                <td className="px-4 py-3.5 font-semibold text-[#0F172A]">
                  {c.category}
                </td>
                <td className="px-4 py-3.5">
                  <div className="truncate max-w-[200px] font-medium text-slate-700">{c.location}</div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {c.latitude?.toFixed(4)}, {c.longitude?.toFixed(4)} ({c.zone || 'Zone A'})
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <span className="font-medium text-slate-800">{c.user_name}</span>
                </td>
                <td className="px-4 py-3.5">
                  <StatusBadge status={c.status} size="sm" />
                </td>
                <td className="px-4 py-3.5">
                  {c.assigned_worker ? (
                    <div className="flex items-center gap-1.5 font-medium text-[#0F172A]">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{c.assigned_worker}</span>
                    </div>
                  ) : (
                    <select
                      onChange={(e) => handleAssignWorker(c.complaint_id, e.target.value)}
                      className="bg-slate-50 border border-slate-200 text-slate-700 text-[11px] rounded-lg px-2 py-1 outline-none"
                    >
                      <option value="">+ Assign Worker</option>
                      {workers.map(w => (
                        <option key={w.id} value={w.name}>{w.name}</option>
                      ))}
                    </select>
                  )}
                </td>
                <td className="px-4 py-3.5 text-slate-400 text-[11px]">
                  {c.created_at}
                </td>
                <td className="px-4 py-3.5 text-right whitespace-nowrap">
                  <button
                    onClick={() => setSelectedComplaint(c)}
                    className="px-3 py-1.5 rounded-xl bg-[#F0F9FF] hover:bg-[#E0F2FE] text-[#0077CC] font-bold text-[11px] border border-[#BAE6FD] transition shadow-xs flex items-center gap-1 ml-auto"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Audit Evidence</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Complaint Audit & Evidence Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-[#0077CC] bg-[#F0F9FF] px-2.5 py-0.5 rounded-full border border-[#BAE6FD]">
                  {selectedComplaint.complaint_id}
                </span>
                <h4 className="text-base font-black text-[#0F172A] mt-1">{selectedComplaint.category}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{selectedComplaint.location} ({selectedComplaint.zone})</p>
              </div>
              <button 
                onClick={() => setSelectedComplaint(null)} 
                className="p-1 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-800 text-base"
              >
                &times;
              </button>
            </div>

            {/* Before and After Photos */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-2">
                Photographic Verification Evidence
              </span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Citizen Before-Photo</span>
                  <div className="aspect-video rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                    <img 
                      src={selectedComplaint.before_image || selectedComplaint.image || '/images/incident-garbage.jpg'} 
                      alt="Before Issue" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 block truncate">Reported: {selectedComplaint.created_at}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">
                    {selectedComplaint.status === 'Resolved' ? 'Worker After-Photo (Verified)' : 'Worker After-Photo'}
                  </span>
                  <div className="aspect-video rounded-lg overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
                    {selectedComplaint.after_image ? (
                      <img 
                        src={selectedComplaint.after_image} 
                        alt="After Resolution" 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="text-center p-3 text-slate-400 text-xs">
                        <span>Awaiting field collection proof</span>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 block truncate">
                    {selectedComplaint.resolved_at ? `Resolved: ${selectedComplaint.resolved_at}` : 'Awaiting worker resolution'}
                  </span>
                </div>
              </div>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 text-[10px] block uppercase font-semibold">Reported By</span>
                <strong className="text-[#0F172A]">{selectedComplaint.user_name}</strong>
                <span className="text-slate-500 text-[11px] block">{selectedComplaint.user_phone || '+91 98112-90123'}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 text-[10px] block uppercase font-semibold">Assigned Sanitation Unit</span>
                <strong className="text-[#0077CC]">{selectedComplaint.assigned_worker || 'Auto-Assigned'}</strong>
                <span className="text-slate-500 text-[11px] block">{selectedComplaint.assigned_vehicle || 'Truck #04'}</span>
              </div>
            </div>

            {/* GPS Metadata */}
            <div className="p-3 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0077CC]" />
                <div>
                  <span className="font-bold text-[#0F172A] block">Site GPS Geotag</span>
                  <span className="font-mono text-slate-600 text-[11px]">
                    {selectedComplaint.latitude?.toFixed(6)}° N, {selectedComplaint.longitude?.toFixed(6)}° E
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Accuracy: &plusmn;{selectedComplaint.accuracy_meters || 12}m
              </span>
            </div>

            {/* Lifecycle Stages */}
            <div className="border-t border-slate-100 pt-3">
              <h5 className="text-xs font-bold text-[#0F172A] mb-2 uppercase tracking-wider">Closed-Loop Resolution Audit Log:</h5>
              <div className="space-y-2">
                {selectedComplaint.timeline.map((step, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${step.completed ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                      <span className={step.completed ? 'text-[#0F172A] font-semibold' : 'text-slate-400'}>{step.step}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">{step.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedComplaint(null)}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-[#0F172A] rounded-xl text-xs font-bold transition"
            >
              Close Audit Modal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
