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
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-black text-white tracking-tight">Track Your Reported Issues</h1>
        <p className="text-xs text-slate-400 mt-1">
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
          className="w-full bg-slate-900 border border-slate-800 text-white text-xs rounded-xl pl-9 pr-3 py-2.5 outline-none focus:border-emerald-500"
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
                    ? 'bg-emerald-950/20 border-emerald-500/50 shadow-lg' 
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-mono text-xs font-bold text-white">{c.complaint_id}</span>
                  <StatusBadge status={c.status} size="sm" />
                </div>
                <h4 className="text-xs font-semibold text-emerald-300">{c.category}</h4>
                <p className="text-[11px] text-slate-400 truncate mt-1">{c.location}</p>
              </div>
            );
          })}
        </div>

        {/* Selected Ticket Timeline Details */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          {selectedTicket ? (
            <>
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[11px] text-emerald-400 font-mono font-bold">{selectedTicket.complaint_id}</span>
                  <h3 className="text-lg font-black text-white mt-0.5">{selectedTicket.category}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedTicket.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <PriorityBadge priority={selectedTicket.priority} />
                  <StatusBadge status={selectedTicket.status} />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                <strong>Description:</strong>
                <p className="mt-1 text-slate-400">{selectedTicket.description}</p>
              </div>

              {/* Lifecycle Progress Bar */}
              <div>
                <h4 className="text-xs font-bold text-white mb-3 uppercase tracking-wider">Closed-Loop Resolution Timeline</h4>
                <div className="space-y-3">
                  {selectedTicket.timeline.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        step.completed 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-slate-800 text-slate-500 border border-slate-700'
                      }`}>
                        {step.completed ? '✓' : idx + 1}
                      </div>

                      <div className="flex-1 pb-3 border-b border-slate-800/60 last:border-b-0">
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-semibold ${step.completed ? 'text-white' : 'text-slate-400'}`}>
                            {step.step}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">{step.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedTicket.assigned_worker && (
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Assigned Sanitation Crew:</span>
                  <strong className="text-sky-400">{selectedTicket.assigned_worker}</strong>
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
