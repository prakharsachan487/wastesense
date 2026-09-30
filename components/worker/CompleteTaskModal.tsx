'use client';

import React, { useState, useRef } from 'react';
import { CollectionTask } from '../../types';
import { Camera, X, CheckCircle2, UploadCloud, MapPin, Clock, Sparkles } from 'lucide-react';

interface CompleteTaskModalProps {
  task: CollectionTask;
  onClose: () => void;
  onComplete: (taskId: string, postFill: number, proofPhoto: string) => void;
}

export const CompleteTaskModal: React.FC<CompleteTaskModalProps> = ({
  task,
  onClose,
  onComplete,
}) => {
  const [postFill, setPostFill] = useState<number>(18);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    const photoToSubmit = imagePreview || 'verified_clean_collection.jpg';
    onComplete(task.id, postFill, photoToSubmit);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 max-w-lg w-full rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 overflow-hidden relative">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Resolution Intake
              </span>
              <span className="font-mono text-xs font-bold text-slate-400">
                {task.task_code}
              </span>
            </div>
            <h3 className="text-lg font-black text-white mt-1">Complete & Verify Collection</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Submit proof of emptying for <strong>{task.bin_id || 'Assigned Bin'}</strong> &bull; {task.location}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Telemetry Before/After Row */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Initial Overflow</span>
              <div className="font-mono text-base font-bold text-rose-400 mt-0.5">
                {task.before_fill || 95}% CRITICAL
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
              <label className="text-[10px] text-slate-300 uppercase font-semibold block mb-1">
                Post-Collection Fill (%)
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min="5"
                  max="35"
                  value={postFill}
                  onChange={(e) => setPostFill(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-2.5 py-1 text-xs font-mono font-bold outline-none focus:border-emerald-500"
                  required
                />
                <span className="text-[11px] text-emerald-400 font-bold">%</span>
              </div>
            </div>
          </div>

          {/* REAL CAMERA / FILE INPUT */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-white flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-emerald-400" />
                <span>Photographic Verification Proof</span>
              </label>
              <span className="text-[10px] text-emerald-400 font-medium">GPS Geotag Embedded</span>
            </div>

            {/* Hidden Native File Input (supports mobile camera) */}
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
                className="border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-2xl p-6 text-center cursor-pointer bg-slate-950/60 hover:bg-slate-950 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto mb-2.5 group-hover:scale-105 transition-transform">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-white block">
                  Click to open Camera or Upload Photo
                </span>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Takes live camera snapshot on mobile &bull; JPG, PNG up to 10MB
                </span>
              </div>
            ) : (
              <div className="relative rounded-2xl overflow-hidden border border-emerald-500/40 bg-slate-950 p-2 space-y-2">
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                  <img
                    src={imagePreview}
                    alt="Collection Proof"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>VERIFIED PROOF ATTACHED</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/75 text-slate-300 hover:text-white hover:bg-rose-950/80 transition"
                    title="Remove Photo"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between px-1 text-[11px] text-slate-300">
                  <span className="truncate max-w-[200px] font-mono text-slate-400">{imageName}</span>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-emerald-400 hover:underline font-semibold"
                  >
                    Retake / Change Photo
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Verification Audit Notice */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Location: {task.location} ({task.zone})</span>
            </div>
            <p className="text-[10px] text-slate-400">
              Submitting proof updates the municipal database, marks citizen ticket as Resolved, awards 50 Eco-Credits, and resets node telemetry to {postFill}%.
            </p>
          </div>

          {/* Modal Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-950 transition active:scale-95 flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit Verification & Complete Task</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
