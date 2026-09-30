'use client';

import React, { useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useWasteSense } from '../../../../context/WasteSenseContext';
import { PriorityBadge } from '../../../../components/ui/PriorityBadge';
import { StatusBadge } from '../../../../components/ui/StatusBadge';
import { 
  ArrowLeft, MapPin, Camera, CheckCircle2, Clock, 
  Truck, Navigation, AlertTriangle, UploadCloud, X 
} from 'lucide-react';

export default function WorkerTaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { tasks, updateTaskStatus, completeTaskWithProof } = useWasteSense();

  const taskId = params?.id as string;
  const task = tasks.find(t => t.id === taskId || t.task_code === taskId) || tasks[0];

  const [afterFill, setAfterFill] = useState(18);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
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

  const handleStart = () => {
    updateTaskStatus(task.id, 'In Progress');
  };

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    const photoToSubmit = imagePreview || 'verified_collection.jpg';
    completeTaskWithProof(task.id, afterFill, photoToSubmit);
    setSubmitted(true);
    setTimeout(() => {
      router.push('/worker/dashboard');
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <Link
          href="/worker/tasks"
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Assigned Tasks</span>
        </Link>
        <span className="font-mono text-xs font-bold text-white">{task.task_code}</span>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Work Order Assignment</span>
            <h1 className="text-xl font-black text-white mt-0.5">{task.title}</h1>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
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
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-slate-400 text-[11px] block">Target Smart Bin</span>
            <strong className="text-white font-mono">{task.bin_id || 'B-102'}</strong>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">Before Fill Level</span>
            <strong className="text-rose-400 font-mono font-bold">{task.before_fill || 95}%</strong>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">Vehicle</span>
            <strong className="text-white">{task.vehicle_name}</strong>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">Due Window</span>
            <strong className="text-amber-300">{task.due_time}</strong>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Field Operating Instructions:</h4>
          <p className="text-xs text-slate-300 p-3 rounded-xl bg-slate-950 border border-slate-800">
            {task.instructions}
          </p>
        </div>

        {/* Status Actions */}
        <div className="pt-2 border-t border-slate-800">
          {task.status === 'Assigned' && (
            <button
              onClick={handleStart}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg transition active:scale-95"
            >
              Start Collection (Mark In Progress)
            </button>
          )}

          {task.status === 'In Progress' && (
            <form onSubmit={handleComplete} className="space-y-4">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Completion Verification (Proof of Work):</h4>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Final Residual Fill Level (%)
                </label>
                <input
                  type="number"
                  min="5"
                  max="30"
                  value={afterFill}
                  onChange={(e) => setAfterFill(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs font-mono outline-none"
                  required
                />
                <span className="text-[10px] text-slate-400">Baseline clean fill level after emptying is 18%.</span>
              </div>

              {/* Real Camera & Photo Input */}
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

              <button
                type="submit"
                disabled={submitted}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-lg transition active:scale-95 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{submitted ? '✓ Verified! Updating Command Center...' : 'Submit Photographic Proof & Complete'}</span>
              </button>
            </form>
          )}

          {task.status === 'Completed' && (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-center text-xs space-y-3">
              <div>
                <span className="text-emerald-400 font-bold block mb-1">✓ Task Completed & Closed</span>
                <span className="text-slate-300">Emptied from 95% down to {task.after_fill || 18}%. Verified by Command Center.</span>
              </div>
              {task.proof_photo && (
                <div className="max-w-xs mx-auto rounded-xl overflow-hidden border border-emerald-500/40 shadow-lg">
                  <img 
                    src={task.proof_photo.startsWith('data:image') ? task.proof_photo : '/images/smart-waste-hero.jpg'} 
                    alt="Uploaded Proof" 
                    className="w-full h-32 object-cover" 
                  />
                  <div className="bg-slate-950 p-1.5 text-[10px] text-emerald-400 font-mono">
                    ✓ Verified Resolution Proof Attached
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
