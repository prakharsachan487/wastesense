'use client';

import React from 'react';
import Link from 'next/link';
import { useWasteSense } from '../../../context/WasteSenseContext';
import { ComplaintTimelineStepper } from '../../../components/citizen/ComplaintTimelineStepper';
import { CitizenSmartBinCard } from '../../../components/citizen/CitizenSmartBinCard';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { 
  SkiperBox,
  SkiperStatBox,
  SkiperProgressCard,
  SkiperFeaturedCard,
  SkiperListBox,
  SkiperBannerCard
} from '../../../components/skiper-ui';
import { 
  AlertTriangle, Calendar, Search, ArrowRight, Trash2, 
  MapPin, CheckCircle2, Clock, Sparkles, Navigation, Send,
  ShieldCheck, Award, Zap, Truck
} from 'lucide-react';

export default function CitizenDashboardPage() {
  const { currentUser, complaints, pickups, bins } = useWasteSense();

  // Find user's latest active report (B-102 complaint WS-2026-1042 or first complaint)
  const latestReport = complaints.find(c => c.complaint_id === 'WS-2026-1042') || complaints[0];
  const otherComplaints = complaints.filter(c => c.id !== latestReport?.id).slice(0, 2);
  const userPickups = pickups.slice(0, 2);

  // Relevant bins nearby: B-102 (Central Market), B-109 (Railway), B-087 (Metro), B-044 (Greenwood)
  const localBins = [
    bins.find(b => b.bin_id === 'B-102') || bins[0],
    bins.find(b => b.bin_id === 'B-109') || bins[1],
    bins.find(b => b.bin_id === 'B-087') || bins[2],
    bins.find(b => b.bin_id === 'B-044') || bins[3],
  ];

  const activeReportsCount = complaints.filter(c => c.status !== 'Resolved').length;

  return (
    <div className="space-y-6">
      {/* 1. Welcoming Hero matching reference card style */}
      <div className="bg-white/95 rounded-[24px] p-5 sm:p-6 border border-slate-200/90 shadow-[0_2px_14px_rgba(15,23,42,0.04)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
              <span>Welcome back, {currentUser?.name || 'Amitabh'}</span>
              <span>👋</span>
            </span>
            <div className="flex flex-wrap items-center gap-2.5 mt-1">
              <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
                Resident Citizen Services
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0F9FF] border border-[#BAE6FD] text-[#0077CC] text-xs font-bold shadow-xs">
                <MapPin className="w-3.5 h-3.5 text-[#0077CC]" />
                <span>Sector 12 &bull; Zone A</span>
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/citizen/report"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0077CC] hover:bg-[#004A80] text-white text-xs font-bold shadow-sm transition active:scale-95"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Report Issue</span>
            </Link>

            <Link
              href="/citizen/pickup"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold shadow-xs transition"
            >
              <Calendar className="w-4 h-4 text-[#0EA5E9]" />
              <span>Request Pickup</span>
            </Link>

            <Link
              href="/citizen/complaints"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span>All Tickets</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Bento Grid Section matching reference layout (Left: Featured + List | Right: Progress + 4 Stats + Banner) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Featured Active Report + Nearby Bins List */}
        <div className="lg:col-span-7 space-y-6">
          {/* Featured Active Complaint / Service */}
          {latestReport && (
            <SkiperFeaturedCard
              title="Active Issue Resolution"
              actionText="View all tickets"
              actionHref="/citizen/complaints"
              pillBadgeIcon={<Clock className="w-3.5 h-3.5 text-amber-600" />}
              pillBadgeText={`Ticket ${latestReport.complaint_id} • Status: ${latestReport.status}`}
              leftEntity={{
                title: latestReport.category || 'Overflow',
                subtitle: latestReport.location,
                icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
                iconBg: 'bg-amber-50 border border-amber-200',
              }}
              rightEntity={{
                title: 'Crew Dispatched',
                subtitle: 'Truck #04 en route',
                icon: <Truck className="w-5 h-5 text-[#0077CC]" />,
                iconBg: 'bg-sky-50 border border-sky-200',
              }}
              connectorText="➔"
              bottomBarText="AI Resolution Stage"
              bottomBarValue={latestReport.status}
              progressPercent={
                latestReport.status === 'Resolved' ? 100 :
                latestReport.status === 'In Progress' ? 75 :
                latestReport.status === 'En Route' ? 50 : 25
              }
              actionButtonText="Track Timeline"
              onActionButtonClick={() => {
                const el = document.getElementById('citizen-timeline-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          )}

          {/* Nearby Smart Bins List Box */}
          <SkiperListBox
            title="Nearby Smart Containers (Ward 12)"
            actionText="Explore map"
            actionHref="/citizen/bins"
            columnHeaders={['#', 'SMART BIN & LOCATION', 'DISTANCE', 'CAPACITY', 'STATUS']}
            items={localBins.map((bin, idx) => {
              const isFull = bin.fill_level >= 80;
              const distance = (idx + 1) * 120 + 80;

              return {
                id: bin.bin_id,
                rank: idx + 1,
                title: `${bin.bin_id} (${bin.waste_type || 'General'})`,
                subtitle: bin.location,
                icon: <Trash2 className="w-3.5 h-3.5 text-slate-700" />,
                iconBg: isFull ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700',
                col1: `${distance}m away`,
                col2: `${bin.fill_level}%`,
                badge: (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isFull
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {isFull ? 'Near Full' : 'Available'}
                  </span>
                ),
              };
            })}
          />
        </div>

        {/* Right Column (5 cols): Progress Stats + 4 Stat Cards + Banner */}
        <div className="lg:col-span-5 space-y-6">
          {/* Ward Sanitation Progress Card */}
          <SkiperProgressCard
            title="Ward Sanitation Score"
            actionText="Guide"
            actionHref="/citizen/awareness"
            segments={[
              { label: 'Cleaned', count: 12, percent: 75, color: 'bg-emerald-500' },
              { label: 'In Progress', count: 2, percent: 15, color: 'bg-sky-500' },
              { label: 'Pending', count: 1, percent: 10, color: 'bg-amber-400' },
            ]}
            metrics={[
              { keyLabel: 'SCORE', value: '94%' },
              { keyLabel: 'RESOLVED', value: 12, colorClass: 'text-emerald-600' },
              { keyLabel: 'ACTIVE', value: activeReportsCount, colorClass: 'text-amber-600' },
              { keyLabel: 'COMMUNITY', value: '480', colorClass: 'text-[#0077CC]' },
            ]}
          />

          {/* 4 Compact Stat Cards in 2x2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <SkiperStatBox
              label="Active Reports"
              value={activeReportsCount}
              icon={<AlertTriangle className="w-5 h-5" />}
              color="amber"
              subText="Under investigation"
            />
            <SkiperStatBox
              label="Verified Cleaned"
              value={12}
              icon={<ShieldCheck className="w-5 h-5" />}
              color="emerald"
              subText="Photo matched"
            />
            <SkiperStatBox
              label="Eco Karma Points"
              value={340}
              icon={<Award className="w-5 h-5" />}
              color="purple"
              subText="Silver resident level"
            />
            <SkiperStatBox
              label="Avg Response"
              value="< 2.4h"
              isNumeric={false}
              icon={<Clock className="w-5 h-5" />}
              color="blue"
              subText="Prompt SLA rating"
            />
          </div>

          {/* Bottom Action / Announcement Banner Card */}
          <SkiperBannerCard
            tag="SPECIAL RECYCLING DRIVE"
            title="Doorstep E-Waste & Bulk Pickup"
            description="Schedule convenient home collection for old appliances, packaging boxes, and bulk recyclables."
            buttonText="Book Free Slot"
            buttonHref="/citizen/pickup"
            icon={<Sparkles className="w-6 h-6 text-sky-200" />}
          />
        </div>
      </div>

      {/* 3. Live 6-Stage Timeline Stepper in a SkiperBox */}
      <div id="citizen-timeline-section">
        <SkiperBox
          title="Live Resolution Tracking • What Happened to My Report?"
          subtitle="Closed-Loop AI Triage & Field Verification Circuit"
          actionText="View All Tickets"
          actionHref="/citizen/complaints"
          icon={<Clock className="w-4 h-4 text-[#0077CC]" />}
        >
          {latestReport ? (
            <ComplaintTimelineStepper complaint={latestReport} />
          ) : (
            <div className="p-8 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <h3 className="text-sm font-bold text-[#0F172A]">No Active Complaints</h3>
              <p className="text-xs text-slate-500">Your neighborhood is currently clean and verified.</p>
            </div>
          )}
        </SkiperBox>
      </div>

      {/* 4. Scheduled Pickups & Other Incidents in SkiperBoxes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Doorstep Pickups */}
        <SkiperBox
          title="Scheduled Doorstep Pickups"
          subtitle="Bulk recyclables, electronic & packaging collection"
          actionText="Book Pickup"
          actionHref="/citizen/pickup"
          icon={<Calendar className="w-4 h-4 text-[#0077CC]" />}
        >
          <div className="space-y-3">
            {userPickups.map(p => (
              <div key={p.id} className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-2 hover:border-slate-200 transition">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-xs font-black text-[#0F172A]">{p.request_id}</span>
                    <h4 className="text-xs font-semibold text-[#0077CC] mt-0.5">{p.waste_type}</h4>
                  </div>
                  <StatusBadge status={p.status} size="sm" />
                </div>
                <div className="text-xs text-slate-700 flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>{p.preferred_date} &bull; {p.preferred_time}</span>
                </div>
                <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-200/60">
                  <span>Assigned Unit: <strong className="text-[#0F172A]">{p.assigned_unit || 'Pending Unit'}</strong></span>
                  <span className="text-emerald-700 font-semibold font-mono text-[10px]">Doorstep Verified</span>
                </div>
              </div>
            ))}
          </div>
        </SkiperBox>

        {/* Other Neighborhood Reports */}
        <SkiperBox
          title="Other Ward Incidents"
          subtitle="Public reports in Sector 12 municipal radius"
          actionText={`View All (${complaints.length})`}
          actionHref="/citizen/complaints"
          icon={<AlertTriangle className="w-4 h-4 text-amber-500" />}
        >
          <div className="space-y-3">
            {otherComplaints.map(c => (
              <div key={c.id} className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-1.5 hover:border-slate-200 transition">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#0F172A]">{c.complaint_id}</span>
                    <h4 className="text-xs font-semibold text-slate-800 mt-0.5">{c.category}</h4>
                  </div>
                  <StatusBadge status={c.status} size="sm" />
                </div>
                <p className="text-xs text-slate-600 line-clamp-1">{c.description}</p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-200/60">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span className="truncate max-w-[200px] text-slate-600">{c.location}</span>
                  </span>
                  <span>{c.created_at}</span>
                </div>
              </div>
            ))}
          </div>
        </SkiperBox>
      </div>

      {/* 5. Smart Containers in Your Ward Radius */}
      <SkiperBox
        title="Smart Bins in Sector 12 Radius"
        subtitle="Live ultrasonic capacity, segregation stream, and overflow forecasting"
        actionText="Explore All Bins"
        actionHref="/citizen/bins"
        icon={<Trash2 className="w-4 h-4 text-[#0077CC]" />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
          {localBins.map(bin => (
            <CitizenSmartBinCard key={bin.bin_id} bin={bin} />
          ))}
        </div>
      </SkiperBox>
    </div>
  );
}
