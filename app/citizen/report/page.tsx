'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useWasteSense } from '../../../context/WasteSenseContext';
import { ComplaintCategory } from '../../../types';
import { Camera, CheckCircle2, MapPin, AlertTriangle, ArrowRight } from 'lucide-react';

export default function CitizenReportPage() {
  const { createComplaint } = useWasteSense();

  const [category, setCategory] = useState<ComplaintCategory>('Overflowing Bin');
  const [description, setDescription] = useState('Smart Bin B-102 is overflowing onto the sidewalk, causing bad smell.');
  const [location, setLocation] = useState('Central Market, Sector 12 Gate 1');
  const [imageName, setImageName] = useState<string | null>(null);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newComp = createComplaint({
      category,
      description,
      location,
      image: imageName || 'incident_evidence.jpg'
    });
    setSubmittedTicket(newComp.complaint_id);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageName(file.name);
    }
  };

  if (submittedTicket) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center space-y-5 animate-in fade-in">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div>
          <h2 className="text-2xl font-black text-white">Report Submitted Successfully!</h2>
          <p className="text-xs text-slate-300 mt-1">Your community issue has been logged into the municipal dispatch queue.</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <span className="text-xs text-slate-400">Tracking Ticket ID:</span>
            <span className="font-mono text-base font-bold text-emerald-400">{submittedTicket}</span>
          </div>

          <div className="text-xs text-slate-300 space-y-1">
            <div><strong>Category:</strong> {category}</div>
            <div><strong>Location:</strong> {location}</div>
            <div><strong>Status:</strong> <span className="text-sky-400 font-semibold">Submitted &bull; Under Verification</span></div>
          </div>

          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
            Status Progression: Submitted &rarr; Under Review &rarr; Assigned &rarr; In Progress &rarr; Resolved
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Link
            href="/citizen/complaints"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950 transition flex items-center gap-1.5"
          >
            <span>Track This Ticket</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => setSubmittedTicket(null)}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition"
          >
            Submit Another Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-black text-white tracking-tight">Report a Community Waste Problem</h1>
        <p className="text-xs text-slate-400 mt-1">
          Help our automated sanitation dispatch detect and clear urban waste hotspots rapidly
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Issue Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ComplaintCategory)}
            className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5 outline-none focus:border-emerald-500"
            required
          >
            <option value="Overflowing Bin">Overflowing Bin</option>
            <option value="Garbage on Road">Garbage on Road / Spillage</option>
            <option value="Missed Collection">Missed Collection</option>
            <option value="Illegal Dumping">Illegal Dumping / Commercial Debris</option>
            <option value="Hazardous Material">Hazardous / Chemical Waste</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Location / Landmark</label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Near Metro Gate 3, Sector 15"
              className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-xl pl-9 pr-3 py-2.5 outline-none focus:border-emerald-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Description of Issue</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the severity, blockage, smell, or hazards..."
            className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-xl p-3 outline-none focus:border-emerald-500"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Attach Photographic Evidence</label>
          <label className="border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-xl p-6 text-center block cursor-pointer bg-slate-950/60 transition group">
            <Camera className="w-6 h-6 text-slate-400 group-hover:text-emerald-400 mx-auto mb-2 transition" />
            <span className="text-xs font-semibold text-white block">
              {imageName ? `Attached: ${imageName}` : 'Click to capture or upload photo'}
            </span>
            <span className="text-[11px] text-slate-400">JPG, PNG supported up to 5MB</span>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950 transition active:scale-95"
        >
          Submit Report & Generate Ticket ID
        </button>
      </form>
    </div>
  );
}
