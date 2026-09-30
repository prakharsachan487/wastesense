'use client';

import React, { useState } from 'react';
import { useWasteSense } from '../../../context/WasteSenseContext';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { Calendar, Clock, MapPin, CheckCircle2, Truck } from 'lucide-react';

export default function CitizenPickupPage() {
  const { pickups, createPickupRequest } = useWasteSense();

  const [wasteType, setWasteType] = useState('Bulk Recyclable Cardboard & Plastics');
  const [location, setLocation] = useState('Sector 12, Greenwood Society, Flat 402');
  const [preferredDate, setPreferredDate] = useState('Tomorrow');
  const [preferredTime, setPreferredTime] = useState('10:00 - 12:00');
  const [notes, setNotes] = useState('Large cardboard boxes from appliance delivery.');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPickupRequest({
      waste_type: wasteType,
      location,
      preferred_date: preferredDate,
      preferred_time: preferredTime,
      notes
    });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Doorstep Bulk Waste & E-Waste Pickup</h1>
        <p className="text-xs text-slate-500 mt-1">
          Schedule dedicated municipal electric van collection for bulky furniture, yard prunings, and e-waste
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">Book a Pickup Slot</h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Waste Stream Classification</label>
            <select
              value={wasteType}
              onChange={(e) => setWasteType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] text-xs rounded-xl px-3 py-2.5 outline-none focus:border-[#0077CC]"
            >
              <option value="Bulk Recyclable Cardboard & Plastics">Bulk Recyclable Cardboard & Plastics</option>
              <option value="Electronic Waste (Batteries, PCs, Chargers)">Electronic Waste (Batteries, PCs, Chargers)</option>
              <option value="Horticultural Prunings & Garden Sod">Horticultural Prunings & Garden Sod</option>
              <option value="Old Furniture / Mattresses">Old Furniture / Mattresses</option>
              <option value="Demolition / Renovation Debris (Light)">Demolition / Renovation Debris (Light)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Pickup Address / Doorstep</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] text-xs rounded-xl px-3 py-2.5 outline-none focus:border-[#0077CC]"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Date</label>
              <select
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] text-xs rounded-xl px-3 py-2.5 outline-none focus:border-[#0077CC]"
              >
                <option value="Today Afternoon">Today Afternoon</option>
                <option value="Tomorrow">Tomorrow</option>
                <option value="Day After Tomorrow">Day After Tomorrow</option>
                <option value="This Weekend">This Weekend</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Time Window</label>
              <select
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] text-xs rounded-xl px-3 py-2.5 outline-none focus:border-[#0077CC]"
              >
                <option value="09:00 - 11:00">Morning (09:00 - 11:00)</option>
                <option value="11:00 - 13:00">Noon (11:00 - 13:00)</option>
                <option value="14:00 - 16:00">Afternoon (14:00 - 16:00)</option>
                <option value="16:30 - 18:30">Evening (16:30 - 18:30)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Special Notes for Driver</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Items stacked near elevator, please bring hand truck..."
              className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] text-xs rounded-xl p-3 outline-none focus:border-[#0077CC]"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            {submitted && (
              <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Pickup appointment confirmed!</span>
              </span>
            )}
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#0077CC] hover:bg-[#004A80] text-white text-xs font-bold shadow-sm transition active:scale-95 ml-auto"
            >
              Confirm Doorstep Pickup
            </button>
          </div>
        </form>

        {/* Existing Pickup Bookings */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">Your Pickup Schedule</h3>
          <div className="space-y-3">
            {pickups.map(p => (
              <div key={p.id} className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs font-bold text-[#0F172A]">{p.request_id}</span>
                  <StatusBadge status={p.status} size="sm" />
                </div>
                <h4 className="text-xs font-semibold text-[#0077CC]">{p.waste_type}</h4>
                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{p.preferred_date} &bull; {p.preferred_time}</span>
                </div>
                <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                  Assigned Unit: <strong className="text-[#0F172A]">{p.assigned_unit || 'Pending Dispatch'}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
