'use client';

import React, { useState, useRef, useEffect } from 'react';
import { CollectionTask } from '../../types';
import { useWasteSense } from '../../context/WasteSenseContext';
import { Camera, X, CheckCircle2, UploadCloud, MapPin, Crosshair, AlertTriangle } from 'lucide-react';
import { calculateDistanceMeters } from '../../lib/geoUtils';

interface CompleteTaskModalProps {
  task: CollectionTask;
  onClose: () => void;
  onComplete?: (taskId: string, postFill: number, proofPhoto: string) => void;
}

export const CompleteTaskModal: React.FC<CompleteTaskModalProps> = ({
  task,
  onClose,
}) => {
  const { workerSubmitProof } = useWasteSense();

  const [postFill, setPostFill] = useState<number>(15);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Live GPS State for Worker Verification
  const targetLat = task.target_lat || 28.6139;
  const targetLng = task.target_lng || 77.2090;

  const [workerGps, setWorkerGps] = useState<{ lat: number; lng: number; accuracy: number }>({
    lat: targetLat + 0.0002, // Default nearby simulated position ~22m away
    lng: targetLng + 0.0001,
    accuracy: 8
  });
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [validationResult, setValidationResult] = useState<{ status: 'PASS' | 'FAIL'; message: string } | null>(null);

  const distanceMeters = calculateDistanceMeters(targetLat, targetLng, workerGps.lat, workerGps.lng);
  const isWithinGeofence = distanceMeters <= 100;

  useEffect(() => {
    // Attempt automatic live GPS capture on modal mount
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      setIsDetectingGps(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setWorkerGps({
            lat: Number(pos.coords.latitude.toFixed(6)),
            lng: Number(pos.coords.longitude.toFixed(6)),
            accuracy: Math.round(pos.coords.accuracy || 10)
          });
          setIsDetectingGps(false);
        },
        () => {
          // Graceful simulated on-site coordinates
          setIsDetectingGps(false);
        },
        { enableHighAccuracy: true, timeout: 6000 }
      );
    }
  }, []);

  const handleRefreshGps = () => {
    setIsDetectingGps(true);
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
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
        }
      );
    } else {
      setIsDetectingGps(false);
    }
  };

  const handleSimulateOnSiteGps = () => {
    // Snap to within 15 meters of target site for easy testing
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePreview) {
      setValidationResult({
        status: 'FAIL',
        message: 'Resolution photo is required. Please capture or upload evidence.'
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
        message: `Validation Passed! Geofence verified at ${res.distanceMeters}m from site. Complaint marked Resolved.`
      });
      setTimeout(() => {
        onClose();
      }, 1500);
    } else {
      setValidationResult({
        status: 'FAIL',
        message: res.reason || 'Auto-validation failed. Task flagged for rework.'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 max-w-lg w-full rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 overflow-hidden relative text-[#0F172A] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#F0F9FF] text-[#0077CC] border border-[#BAE6FD]">
                Proof & Geofence Verification
              </span>
              <span className="font-mono text-xs font-bold text-slate-500">
                {task.task_code}
              </span>
            </div>
            <h3 className="text-lg font-black text-[#0F172A] mt-1">Resolution Evidence Submission</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Task target: <strong>{task.location}</strong> ({task.zone})
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

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

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ZOMATO-STYLE LIVE GPS GEOFENCE CHECK */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
                <Crosshair className={`w-3.5 h-3.5 text-[#0077CC] ${isDetectingGps ? 'animate-spin' : ''}`} />
                <span>Worker Live Geolocation Check</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSimulateOnSiteGps}
                  className="text-[10px] text-slate-500 hover:text-[#0077CC] underline"
                >
                  Snap On-Site
                </button>
                <button
                  type="button"
                  onClick={handleRefreshGps}
                  className="text-[11px] text-[#0077CC] font-bold hover:underline"
                >
                  Refresh GPS
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-slate-400 text-[10px] block uppercase font-semibold">Worker GPS</span>
                <strong className="text-[#0F172A] font-mono text-[11px] block mt-0.5">
                  {workerGps.lat.toFixed(4)}° N, {workerGps.lng.toFixed(4)}° E
                </strong>
                <span className="text-[10px] text-slate-500">Accuracy &plusmn;{workerGps.accuracy}m</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-slate-400 text-[10px] block uppercase font-semibold">Geofence Distance</span>
                <strong className={`font-mono text-[11px] block mt-0.5 font-bold ${isWithinGeofence ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {distanceMeters} meters away
                </strong>
                <span className={`text-[10px] font-bold ${isWithinGeofence ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {isWithinGeofence ? '✓ WITHIN 100m GEOFENCE' : '✗ OUTSIDE GEOFENCE'}
                </span>
              </div>
            </div>
          </div>

          {/* MANDATORY RESOLUTION AFTER-PHOTO */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-[#0077CC]" />
                <span>Photographic Proof (After-Collection) *</span>
              </label>
              <span className="text-[10px] font-bold text-rose-600">Mandatory</span>
            </div>

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
                className="border-2 border-dashed border-slate-300 hover:border-[#0077CC] rounded-2xl p-6 text-center cursor-pointer bg-[#F8FAFC] hover:bg-slate-50 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#F0F9FF] text-[#0077CC] border border-[#BAE6FD] flex items-center justify-center mx-auto mb-2.5 group-hover:scale-105 transition-transform">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-[#0F172A] block">
                  Tap to Capture or Upload Clean Site Photo
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Camera opens directly on mobile phone
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

          {/* Modal Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!imagePreview}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#0077CC] hover:bg-[#004A80] text-white shadow-sm transition active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Validate Proof & Close Task</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
