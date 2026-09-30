'use client';

import React, { useState } from 'react';
import { MapPanel } from '../../../components/admin/MapPanel';
import { SmartBinSimulatorModal } from '../../../components/admin/SmartBinSimulatorModal';

export default function AdminMapPage() {
  const [simBin, setSimBin] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-black text-white tracking-tight">Geospatial Operations & Hotspot Clustering</h1>
        <p className="text-xs text-slate-400 mt-1">
          Interactive map visualizing all 20 smart bins, citizen complaint concentrations, and active collection vehicles
        </p>
      </div>

      <MapPanel onSimulate={(binId) => setSimBin(binId)} />

      {simBin && (
        <SmartBinSimulatorModal targetBinId={simBin} onClose={() => setSimBin(null)} />
      )}
    </div>
  );
}
