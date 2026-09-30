'use client';

import React, { useState } from 'react';
import { useWasteSense } from '../../../context/WasteSenseContext';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { PriorityBadge } from '../../../components/ui/PriorityBadge';
import { Search, MapPin, Clock, CheckCircle2 } from 'lucide-react';

export default function CitizenComplaintsPage() {
  const { complaints } = useWasteSense();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(complaints[0] || null);

  const filtered = complaints.filter(c => 
    c.complaint_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Track Your Reported Issues</h1>
        <p className="text-xs text-slate-500 mt-1">
          Monitor real-time operational milestones: Submitted &rarr; Under Review &rarr; Assigned &rarr; In Progress &rarr; Resolved
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Ticket ID (e.g. WS-2026-1042)..."
          className="w-full bg-white border border-slate-200 text-[#0F172A] text-xs rounded-xl pl-9 pr-3 py-2.5 outline-none focus:border-[#0077CC] focus:ring-1 focus:ring-[#0077CC] shadow-xs"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket List */}
        <div className="space-y-3 lg:col-span-1">
          {filtered.map(c => {
            const isSelected = selectedTicket?.id === c.id;
            return (
              <div
                key={c.id}
                onClick={() => setSelectedTicket(c)}
                className={`p-4 rounded-xl border transition cursor-pointer ${
                  isSelected 
                    ? 'bg-[#F0F9FF] border-[#BAE6FD] shadow-xs' 
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-mono text-xs font-bold text-[#0F172A]">{c.complaint_id}</span>
                  <StatusBadge status={c.status} size="sm" />
                </div>
                <h4 className="text-xs font-semibold text-[#0077CC]">{c.category}</h4>
                <p className="text-[11px] text-slate-500 truncate mt-1">{c.location}</p>
              </div>
            );
          })}
        </div>

        {/* Selected Ticket Timeline Details */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
          {selectedTicket ? (
            <>
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 pb-4">
                <div>
                  <span className="text-[11px] text-[#0077CC] font-mono font-bold">{selectedTicket.complaint_id}</span>
                  <h3 className="text-lg font-black text-[#0F172A] mt-0.5">{selectedTicket.category}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedTicket.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <PriorityBadge priority={selectedTicket.priority} />
                  <StatusBadge status={selectedTicket.status} />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                <strong className="text-[#0F172A]">Description:</strong>
                <p className="mt-1 text-slate-600">{selectedTicket.description}</p>
              </div>

              {/* Lifecycle Progress Bar */}
              <div>
                <h4 className="text-xs font-bold text-[#0F172A] mb-3 uppercase tracking-wider">Closed-Loop Resolution Timeline</h4>
                <div className="space-y-3">
                  {selectedTicket.timeline.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        step.completed 
                          ? 'bg-[#0077CC] text-white shadow-xs' 
                          : 'bg-slate-100 text-slate-400 border border-slate-200'
                      }`}>
                        {step.completed ? '✓' : idx + 1}
                      </div>

                      <div className="flex-1 pb-3 border-b border-slate-100 last:border-b-0">
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-semibold ${step.completed ? 'text-[#0F172A]' : 'text-slate-400'}`}>
                            {step.step}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">{step.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Before and After Photographic Evidence */}
              <div className="pt-2 border-t border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">Photographic Audit Trail</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Citizen Before-Photo</span>
                    <div className="aspect-video rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                      <img 
                        src={selectedTicket.before_image || selectedTicket.image || '/images/incident-garbage.jpg'} 
                        alt="Reported Issue" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 block truncate">Logged at: {selectedTicket.created_at}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">
                      {selectedTicket.status === 'Resolved' ? 'Worker After-Photo (Verified)' : 'Worker After-Photo (Pending)'}
                    </span>
                    <div className="aspect-video rounded-lg overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
                      {selectedTicket.after_image ? (
                        <img 
                          src={selectedTicket.after_image} 
                          alt="Resolved Site" 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="text-center p-4 text-slate-400 text-xs">
                          <span>Awaiting field collection completion</span>
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 block truncate">
                      {selectedTicket.resolved_at ? `Verified: ${selectedTicket.resolved_at}` : 'In progress with field crew'}
                    </span>
                  </div>
                </div>
              </div>

              {selectedTicket.assigned_worker && (
                <div className="p-3.5 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-500 text-[11px] block">Assigned Sanitation Crew</span>
                    <strong className="text-[#0F172A]">{selectedTicket.assigned_worker}</strong>
                    <span className="text-slate-500 text-[11px] ml-2">({selectedTicket.assigned_vehicle || 'Truck #04'})</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 block">
                      GPS Locked (&plusmn;{selectedTicket.accuracy_meters || 12}m)
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                      {selectedTicket.latitude?.toFixed(4)}, {selectedTicket.longitude?.toFixed(4)}
                    </span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Select a ticket to inspect lifecycle tracking.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
