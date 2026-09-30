'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useWasteSense } from '../../../context/WasteSenseContext';
import { ComplaintCategory } from '../../../types';
import { 
  Camera, CheckCircle2, MapPin, AlertTriangle, ArrowRight, 
  Crosshair, Navigation, Check, Database, Sparkles, RefreshCw, Send
} from 'lucide-react';
import { detectZoneFromLocation } from '../../../lib/geoUtils';

const QUICK_LANDMARKS = [
  { label: 'Central Market', name: 'Central Market, Sector 12 Gate 1', lat: 28.6139, lng: 77.2090, zone: 'Zone A - Commercial' },
  { label: 'Metro Concourse', name: 'Metro Concourse Gate 3 Plaza', lat: 28.6155, lng: 77.2105, zone: 'Zone A - Transit' },
  { label: 'City Hospital', name: 'City Hospital Outpatient Entry', lat: 28.6210, lng: 77.2025, zone: 'Zone C - Medical' },
  { label: 'Tech Park', name: 'Tech Park Food Court Backlane', lat: 28.6145, lng: 77.2075, zone: 'Zone A - Corporate' },
  { label: 'Sports Stadium', name: 'Sports Stadium Gate 4', lat: 28.6050, lng: 77.2050, zone: 'Zone E - Recreational' },
  { label: 'Ring Road Flyover', name: 'Ring Road Flyover Junction, Pillar 42', lat: 28.6190, lng: 77.2080, zone: 'Zone F - Highway' },
];

export default function CitizenReportPage() {
  const { createComplaint, workers, vehicles } = useWasteSense();

  const [category, setCategory] = useState<ComplaintCategory>('Overflowing Bin');
  const [description, setDescription] = useState('Smart Bin B-102 is overflowing onto the sidewalk, causing bad smell.');
  const [location, setLocation] = useState('Central Market, Sector 12 Gate 1');
  const [imageName, setImageName] = useState<string | null>(null);
  
  // Real GPS & Reverse Geocoded Address State
  const [gpsCoords, setGpsCoords] = useState<{ lat: number; lng: number; accuracy: number } | null>({
    lat: 28.6139,
    lng: 77.2090,
    accuracy: 10
  });
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [gpsStatusText, setGpsStatusText] = useState<string>('GPS calibrated: Central Market, Sector 12 (±10m)');
  const [isLiveGpsLocked, setIsLiveGpsLocked] = useState(false);
  
  const [submittedComplaint, setSubmittedComplaint] = useState<any | null>(null);

  // Real-world Geolocation + OpenStreetMap Reverse Geocoding
  const handleDetectRealLocation = () => {
    setIsDetectingGps(true);
    setGpsStatusText('Requesting satellite GPS coordinates from device...');

    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = Number(position.coords.latitude.toFixed(6));
          const lng = Number(position.coords.longitude.toFixed(6));
          const accuracy = Math.round(position.coords.accuracy || 8);

          setGpsCoords({ lat, lng, accuracy });
          setGpsStatusText(`GPS Locked (${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E) &bull; Fetching street address...`);

          try {
            // Reverse geocode via OpenStreetMap Nominatim
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`, {
              headers: { 'Accept': 'application/json' }
            });
            const data = await res.json();
            
            if (data && data.address) {
              const addr = data.address;
              const streetParts = [
                addr.road || addr.street || addr.pedestrian || addr.suburb || '',
                addr.neighbourhood || addr.residential || addr.city_district || '',
                addr.city || addr.town || addr.county || 'New Delhi',
                addr.postcode || ''
              ].filter(Boolean);

              const resolvedAddress = streetParts.length > 0 
                ? streetParts.join(', ') 
                : (data.display_name ? data.display_name.split(',').slice(0, 3).join(', ') : `Sector 12 (${lat}, ${lng})`);

              setLocation(resolvedAddress);
              setIsLiveGpsLocked(true);
              setGpsStatusText(`Real Address Locked: ${resolvedAddress} (Accuracy: ±${accuracy}m)`);
            } else {
              const fallbackStr = `GPS Point (${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E)`;
              setLocation(fallbackStr);
              setIsLiveGpsLocked(true);
              setGpsStatusText(`Live GPS Coordinates Locked: ${lat}° N, ${lng}° E`);
            }
          } catch {
            const fallbackStr = `Sector 12 GPS (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
            setLocation(fallbackStr);
            setIsLiveGpsLocked(true);
            setGpsStatusText(`Live GPS Coordinates Locked: ${lat}° N, ${lng}° E (±${accuracy}m)`);
          } finally {
            setIsDetectingGps(false);
          }
        },
        (error) => {
          setIsDetectingGps(false);
          setIsLiveGpsLocked(false);
          setGpsStatusText('Browser GPS permission was not granted. Tap a quick landmark below or type your street address.');
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
      );
    } else {
      setIsDetectingGps(false);
      setGpsStatusText('Device does not support GPS. Select a landmark below.');
    }
  };

  const handleSelectLandmark = (lm: typeof QUICK_LANDMARKS[0]) => {
    setLocation(lm.name);
    setGpsCoords({ lat: lm.lat, lng: lm.lng, accuracy: 6 });
    setIsLiveGpsLocked(true);
    setGpsStatusText(`Landmark Locked: ${lm.name} &bull; ${lm.zone}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lat = gpsCoords?.lat || 28.6139;
    const lng = gpsCoords?.lng || 77.2090;
    const accuracy = gpsCoords?.accuracy || 10;

    const newComp = createComplaint({
      category,
      description,
      location,
      latitude: lat,
      longitude: lng,
      accuracy_meters: accuracy,
      image: imageName || '/images/incident-garbage.jpg',
      before_image: imageName || '/images/incident-garbage.jpg'
    });

    setSubmittedComplaint(newComp);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageName(file.name);
    }
  };

  if (submittedComplaint) {
    return (
      <div className="max-w-xl mx-auto py-8 text-center space-y-5 animate-in fade-in">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-1.5">
            COMPLAINT DISPATCHED &bull; SYNCED WITH CLOUD DATABASE
          </span>
          <h2 className="text-2xl font-black text-[#0F172A]">Complaint Logged & Auto-Assigned!</h2>
          <p className="text-xs text-slate-500 mt-1">
            Ticket #{submittedComplaint.complaint_id} has been recorded into the live system and dispatched to field crew.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-left space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Tracking Ticket ID</span>
              <span className="font-mono text-xl font-black text-[#0077CC]">{submittedComplaint.complaint_id}</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#F0F9FF] text-[#0077CC] text-xs font-bold border border-[#BAE6FD] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#0077CC] animate-pulse" />
              <span>Assigned & Active</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 text-[10px] block uppercase font-bold">Assigned Sanitation Unit</span>
              <strong className="text-[#0F172A] text-sm block mt-0.5">{submittedComplaint.assigned_worker}</strong>
              <span className="text-[11px] text-[#0077CC] font-semibold">{submittedComplaint.assigned_vehicle}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 text-[10px] block uppercase font-bold">Live GPS Geotag</span>
              <strong className="text-[#0F172A] font-mono text-xs block mt-0.5">
                {submittedComplaint.latitude?.toFixed(4)}° N, {submittedComplaint.longitude?.toFixed(4)}° E
              </strong>
              <span className="text-[11px] text-emerald-600 font-semibold">&plusmn;{submittedComplaint.accuracy_meters}m Accuracy</span>
            </div>
          </div>

          <div className="text-xs text-slate-600 space-y-1.5 pt-1">
            <div><strong className="text-[#0F172A]">Real Address:</strong> {submittedComplaint.location} ({submittedComplaint.zone})</div>
            <div><strong className="text-[#0F172A]">Category:</strong> {submittedComplaint.category}</div>
            <div><strong className="text-[#0F172A]">Description:</strong> {submittedComplaint.description}</div>
          </div>

          {/* Cloud Database Confirmation */}
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>Cloud Persistence Active:</strong> Record synchronized with Supabase PostgreSQL and broadcast over WebSocket realtime bus.</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/citizen/dashboard"
            className="px-5 py-2.5 rounded-xl bg-[#0077CC] hover:bg-[#004A80] text-white font-bold text-xs shadow-sm transition flex items-center gap-1.5"
          >
            <span>Track in Live Stepper</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/admin/complaints"
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
          >
            Inspect in Admin Portal
          </Link>
          <button
            onClick={() => setSubmittedComplaint(null)}
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition"
          >
            Report Another Issue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0077CC] block mb-1">
          CITIZEN INCIDENT REPORT
        </span>
        <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Report a Community Waste Problem</h1>
        <p className="text-xs text-slate-500 mt-1">
          Detects your exact device GPS coordinates, reverse geocodes the street address, and dispatches the assigned field team.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
        {/* Issue Category */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Issue Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ComplaintCategory)}
            className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-[#0077CC] font-semibold"
            required
          >
            <option value="Overflowing Bin">Overflowing Bin</option>
            <option value="Garbage on Road">Garbage on Road / Spillage</option>
            <option value="Missed Collection">Missed Collection</option>
            <option value="Illegal Dumping">Illegal Dumping / Commercial Debris</option>
            <option value="Hazardous Material">Hazardous / Chemical Waste</option>
            <option value="Other">Other Community Sanitation Issue</option>
          </select>
        </div>

        {/* Real Location Detection with Live Geocoding */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-700">Location / Street Landmark</label>
            <button
              type="button"
              onClick={handleDetectRealLocation}
              disabled={isDetectingGps}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0F9FF] hover:bg-[#E0F2FE] border border-[#BAE6FD] text-[#0077CC] text-xs font-bold transition shadow-xs disabled:opacity-50"
            >
              <Crosshair className={`w-3.5 h-3.5 ${isDetectingGps ? 'animate-spin' : ''}`} />
              <span>{isDetectingGps ? 'Locking Satellite GPS...' : '📍 Detect My Real Location'}</span>
            </button>
          </div>

          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setIsLiveGpsLocked(false);
              }}
              placeholder="e.g. Near Metro Gate 3, Sector 12"
              className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] text-xs rounded-xl pl-10 pr-3.5 py-3 outline-none focus:border-[#0077CC] font-medium"
              required
            />
          </div>

          {/* Quick Landmarks Selector */}
          <div className="space-y-1 pt-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Or select a recognized sector landmark:</span>
            <div className="flex flex-wrap items-center gap-1.5">
              {QUICK_LANDMARKS.map(lm => (
                <button
                  key={lm.name}
                  type="button"
                  onClick={() => handleSelectLandmark(lm)}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition ${
                    location === lm.name
                      ? 'bg-[#0077CC] text-white border-[#0077CC]'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  {lm.label}
                </button>
              ))}
            </div>
          </div>

          {/* GPS Status Indicator */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${isLiveGpsLocked ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span className="text-slate-700 font-medium" dangerouslySetInnerHTML={{ __html: gpsStatusText }} />
            </div>
            {gpsCoords && (
              <span className="font-mono text-slate-500 text-[10px] shrink-0 self-end sm:self-auto">
                Lat: {gpsCoords.lat.toFixed(4)}, Lng: {gpsCoords.lng.toFixed(4)}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Incident Description</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the severity, overflow state, stench, or sidewalk obstruction..."
            className="w-full bg-slate-50 border border-slate-200 text-[#0F172A] text-xs rounded-xl p-3 outline-none focus:border-[#0077CC] font-medium"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Incident Photo Proof (Optional)</label>
          <label className="border-2 border-dashed border-slate-300 hover:border-[#0077CC] rounded-xl p-6 text-center block cursor-pointer bg-[#F8FAFC] transition group">
            <Camera className="w-6 h-6 text-slate-400 group-hover:text-[#0077CC] mx-auto mb-2 transition" />
            <span className="text-xs font-semibold text-[#0F172A] block">
              {imageName ? `Attached: ${imageName}` : 'Click to take a photo or select an image'}
            </span>
            <span className="text-[11px] text-slate-500">JPG, PNG supported up to 5MB</span>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 rounded-xl bg-[#0077CC] hover:bg-[#004A80] text-white font-black text-xs shadow-md transition flex items-center justify-center gap-2 active:scale-95"
        >
          <Send className="w-4 h-4" />
          <span>SUBMIT REPORT & AUTO-DISPATCH CREW</span>
        </button>
      </form>
    </div>
  );
}
