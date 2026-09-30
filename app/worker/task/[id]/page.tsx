'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useWasteSense } from '../../../../context/WasteSenseContext';
import { PriorityBadge } from '../../../../components/ui/PriorityBadge';
import { StatusBadge } from '../../../../components/ui/StatusBadge';
import { 
  ArrowLeft, MapPin, Camera, CheckCircle2, Clock, 
  Truck, Navigation, AlertTriangle, UploadCloud, X, Crosshair 
} from 'lucide-react';
import { calculateDistanceMeters } from '../../../../lib/geoUtils';

export default function WorkerTaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { 
    tasks, 
    workerAcceptTask, 
    workerArriveAtSite, 
    workerSubmitProof 
  } = useWasteSense();

  const taskId = params?.id as string;
  const task = tasks.find(t => t.id === taskId || t.task_code === taskId) || tasks[0];

  const targetLat = task.target_lat || 28.6139;
  const targetLng = task.target_lng || 77.2090;

  const [afterFill, setAfterFill] = useState(15);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>('');
  const [validationResult, setValidationResult] = useState<{ status: 'PASS' | 'FAIL'; message: string } | null>(null);
  
  // Worker GPS
  const [workerGps, setWorkerGps] = useState<{ lat: number; lng: number; accuracy: number }>({
    lat: targetLat + 0.0002,
    lng: targetLng + 0.0001,
    accuracy: 8
  });
  const [isDetectingGps, setIsDetectingGps] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const distanceMeters = calculateDistanceMeters(targetLat, targetLng, workerGps.lat, workerGps.lng);
  const isWithinGeofence = distanceMeters <= 100;

  useEffect(() => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      setIsDetectingGps(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setWorkerGps({
            lat: Number(pos.coords.latitude.toFixed(6)),
            lng: Number(pos.coords.longitude.toFixed(6)),
            accuracy: Math.round(pos.coords.accuracy || 8)
          });
          setIsDetectingGps(false);
        },
        () => {
          setIsDetectingGps(false);
        },
        { enableHighAccuracy: true, timeout: 6000 }
      );
    }
  }, []);

  const handleSimulateOnSiteGps = () => {
    setWorkerGps({
      lat: Number((targetLat + 0.0001).toFixed(6)),
      lng: Number((targetLng + 0.0001).toFixed(6)),
      accuracy: 6
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAccept = () => {
    workerAcceptTask(task.id);
  };

  const handleArrive = () => {
    const res = workerArriveAtSite(task.id, workerGps.lat, workerGps.lng, workerGps.accuracy);
    if (!res.success) {
      alert(`Warning: You are currently ${res.distanceMeters}m away from the reported coordinates. Geofence requires within 100m.`);
    }
  };

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePreview) {
      setValidationResult({
        status: 'FAIL',
        message: 'Photographic proof of resolution is mandatory.'
      });
      return;
    }

    const res = workerSubmitProof(
      task.id,
      imagePreview,
      workerGps.lat,
      workerGps.lng,
      workerGps.accuracy
    );

    if (res.status === 'PASS') {
      setValidationResult({
        status: 'PASS',
        message: `Validation Passed! Geofence verified at ${res.distanceMeters}m. Closed-loop complete.`
      });
      setTimeout(() => {
        router.push('/worker/tasks');
      }, 1500);
    } else {
      setValidationResult({
        status: 'FAIL',
        message: res.reason || 'Validation failed. Flagged for rework.'
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <Link
          href="/worker/tasks"
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#0077CC] transition font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Assigned Tasks</span>
        </Link>
        <span className="font-mono text-xs font-bold text-slate-500">{task.task_code}</span>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-bold text-[#0077CC] uppercase tracking-wider">Work Order Assignment</span>
            <h1 className="text-xl font-black text-[#0F172A] mt-0.5">{task.title}</h1>
            <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{task.location} ({task.zone})</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <PriorityBadge priority={task.priority} score={task.priority_score} />
            <StatusBadge status={task.status} />
          </div>
        </div>

        {/* Telemetry Stats */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-slate-500 text-[11px] block">Target Point</span>
            <strong className="text-[#0F172A] font-mono">{task.bin_id || 'Citizen Incident'}</strong>
          </div>
          <div>
            <span className="text-slate-500 text-[11px] block">Target GPS</span>
            <strong className="text-slate-700 font-mono text-[11px]">{targetLat.toFixed(4)}, {targetLng.toFixed(4)}</strong>
          </div>
          <div>
            <span className="text-slate-500 text-[11px] block">Assigned Unit</span>
            <strong className="text-[#0F172A]">{task.vehicle_name}</strong>
          </div>
          <div>
            <span className="text-slate-500 text-[11px] block">Due Window</span>
            <strong className="text-amber-700">{task.due_time}</strong>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1">Field Operating Instructions:</h4>
          <p className="text-xs text-slate-700 p-3 rounded-xl bg-slate-50 border border-slate-200">
            {task.instructions}
          </p>
        </div>

        {/* Rework Banner if flagged */}
        {task.status === 'Rework' && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-rose-700">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>TASK FLAGGED FOR REWORK</span>
            </div>
            <p className="text-[11px] text-rose-600">
              {task.rework_reason || 'Photo evidence was missing or device was outside 100m geofence. Please re-verify on site.'}
            </p>
          </div>
        )}

        {/* Validation Result Banner */}
        {validationResult && (
          <div className={`p-3.5 rounded-xl border text-xs font-semibold flex items-start gap-2.5 animate-in fade-in ${
            validationResult.status === 'PASS'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}>
            {validationResult.status === 'PASS' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            )}
            <div>
              <span className="font-bold block">{validationResult.status === 'PASS' ? 'AUTO-VALIDATION PASSED' : 'VALIDATION FAILED'}</span>
              <span className="text-[11px] font-normal">{validationResult.message}</span>
            </div>
          </div>
        )}

        {/* Live GPS Geofence Check Box */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
              <Crosshair className={`w-3.5 h-3.5 text-[#0077CC] ${isDetectingGps ? 'animate-spin' : ''}`} />
              <span>Live Geolocation Radar</span>
            </span>
            <button
              type="button"
              onClick={handleSimulateOnSiteGps}
              className="text-[10px] text-slate-500 hover:text-[#0077CC] underline"
            >
              Snap On-Site (Simulation)
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded-lg bg-white border border-slate-200">
              <span className="text-slate-400 text-[10px] block uppercase font-semibold">Worker GPS</span>
              <strong className="text-[#0F172A] font-mono text-[11px] block mt-0.5">
                {workerGps.lat.toFixed(4)}° N, {workerGps.lng.toFixed(4)}° E
              </strong>
              <span className="text-[10px] text-slate-500">&plusmn;{workerGps.accuracy}m</span>
            </div>
            <div className="p-2 rounded-lg bg-white border border-slate-200">
              <span className="text-slate-400 text-[10px] block uppercase font-semibold">Geofence Proximity</span>
              <strong className={`font-mono text-[11px] block mt-0.5 font-bold ${isWithinGeofence ? 'text-emerald-600' : 'text-rose-600'}`}>
                {distanceMeters}m from site
              </strong>
              <span className={`text-[10px] font-bold ${isWithinGeofence ? 'text-emerald-600' : 'text-rose-600'}`}>
                {isWithinGeofence ? '✓ WITHIN GEOFENCE' : '✗ OUTSIDE GEOFENCE'}
              </span>
            </div>
          </div>
        </div>

        {/* Status Actions Pipeline */}
        <div className="pt-2 border-t border-slate-200">
          {task.status === 'Assigned' && (
            <button
              onClick={handleAccept}
              className="w-full py-3 rounded-xl bg-[#0077CC] hover:bg-[#004A80] text-white font-bold text-xs shadow-sm transition active:scale-95 flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4" />
              <span>Accept & Start Route (Mark En Route)</span>
            </button>
          )}

          {task.status === 'En Route' && (
            <button
              onClick={handleArrive}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm transition active:scale-95 flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4" />
              <span>Verify Arrival at Site (Start Work)</span>
            </button>
          )}

          {(task.status === 'In Progress' || task.status === 'Rework') && (
            <form onSubmit={handleComplete} className="space-y-4">
              <h4 className="text-xs font-bold text-[#0077CC] uppercase tracking-wider">Resolution Evidence & Proof Verification:</h4>

              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {!imagePreview ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 hover:border-[#0077CC] rounded-2xl p-6 text-center cursor-pointer bg-[#F8FAFC] transition-all group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#F0F9FF] text-[#0077CC] border border-[#BAE6FD] flex items-center justify-center mx-auto mb-2.5 group-hover:scale-105 transition-transform">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-[#0F172A] block">
                      Capture or Upload Clean Site Photo (After Photo)
                    </span>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Mandatory proof of resolution &bull; Opens camera on mobile
                    </span>
                  </div>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden border border-emerald-300 bg-slate-50 p-2 space-y-2">
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                      <img
                        src={imagePreview}
                        alt="Collection Proof"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>AFTER-PHOTO ATTACHED</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/75 text-slate-300 hover:text-white hover:bg-rose-900/80 transition"
                        title="Remove Photo"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between px-1 text-[11px] text-slate-600">
                      <span className="truncate max-w-[200px] font-mono text-slate-500">{imageName}</span>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-[#0077CC] hover:underline font-semibold"
                      >
                        Retake / Change Photo
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={!imagePreview}
                className="w-full py-3 rounded-xl bg-[#0077CC] hover:bg-[#004A80] text-white font-bold text-xs shadow-sm transition active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Validate Proof & Close Task</span>
              </button>
            </form>
          )}

          {task.status === 'Completed' && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center text-xs space-y-3">
              <div>
                <span className="text-emerald-700 font-bold block mb-1">Task Completed & Verified</span>
                <span className="text-slate-600">Geofence verified at site. Cleaned container photograph archived.</span>
              </div>
              {task.proof_photo && (
                <div className="max-w-xs mx-auto rounded-xl overflow-hidden border border-emerald-300 shadow-sm bg-white">
                  <img 
                    src={task.proof_photo.startsWith('data:image') ? task.proof_photo : '/images/landing-hero-dashboard.jpg'} 
                    alt="Uploaded Proof" 
                    className="w-full h-36 object-cover" 
                  />
                  <div className="bg-slate-50 p-2 text-[10px] text-emerald-700 font-mono border-t border-slate-200">
                    GPS Geotag: {task.location} {task.proof_lat ? `(${task.proof_lat.toFixed(4)}, ${task.proof_lng?.toFixed(4)})` : ''}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
