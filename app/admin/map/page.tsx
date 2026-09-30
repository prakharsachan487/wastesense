'use client';

import React from 'react';
import { MapPanel } from '../../../components/admin/MapPanel';

export default function AdminMapPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Geospatial Operations & Hotspot Clustering</h1>
        <p className="text-xs text-slate-500 mt-1">
          Interactive map visualizing all 20 smart bins, citizen complaint concentrations, and active collection vehicles
        </p>
      </div>

      <MapPanel />
    </div>
  );
}
