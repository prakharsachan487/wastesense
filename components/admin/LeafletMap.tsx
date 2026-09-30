'use client';

import React, { useEffect, useRef } from 'react';
import { SmartBin, Vehicle } from '../../types';
import { Truck } from 'lucide-react';

interface LeafletMapProps {
  bins: SmartBin[];
  vehicles: Vehicle[];
  selectedBinId: string;
  onSelectBin: (binId: string) => void;
}

export const LeafletMap: React.FC<LeafletMapProps> = ({
  bins,
  vehicles,
  selectedBinId,
  onSelectBin,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});

  // Initialize Leaflet Map once
  useEffect(() => {
    let isMounted = true;

    async function initLeaflet() {
      if (!mapContainerRef.current) return;
      if (mapInstanceRef.current) return;

      const L = await import('leaflet');

      // Center around municipal district (Central Market / Sector 12: 28.6145, 77.2095)
      const map = L.map(mapContainerRef.current, {
        center: [28.6145, 77.2095],
        zoom: 14,
        zoomControl: true,
        attributionControl: true,
      });

      mapInstanceRef.current = map;

      // Clean OpenStreetMap standard street tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors &bull; WasteSense IoT Grid',
      }).addTo(map);

      // Force proper container layout calculation
      setTimeout(() => {
        if (isMounted && map) {
          map.invalidateSize();
        }
      }, 300);
    }

    initLeaflet();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers whenever bins, vehicles, or selection changes
  useEffect(() => {
    async function updateMarkers() {
      const map = mapInstanceRef.current;
      if (!map) return;
      const L = await import('leaflet');

      // Clear previous bin/vehicle markers
      Object.values(markersRef.current).forEach((m: any) => m.remove());
      markersRef.current = {};

      // 1. Render all real WasteSense Smart Bins
      bins.forEach((b) => {
        const isSelected = b.bin_id === selectedBinId;
        const isCrit = b.status === 'CRITICAL' || b.fill_level >= 90;
        const isHigh = b.status === 'HIGH' || (b.fill_level >= 75 && b.fill_level < 90);

        const badgeBg = isCrit ? '#e11d48' : isHigh ? '#f59e0b' : '#10b981';
        const ringBorder = isSelected ? '#0077CC' : '#ffffff';
        const scale = isSelected ? 'scale(1.2)' : 'scale(1)';
        const zIndex = isSelected ? 999 : isCrit ? 500 : 100;

        const customHtml = `
          <div class="ws-map-bin-pin" style="transform: ${scale}; z-index: ${zIndex}; display: flex; flex-direction: column; align-items: center; cursor: pointer; transition: transform 0.2s ease;">
            <div style="
              background: ${badgeBg};
              color: #ffffff;
              font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
              font-weight: 800;
              font-size: 11px;
              padding: 2.5px 7px;
              border-radius: 9999px;
              border: 2px solid ${ringBorder};
              box-shadow: 0 4px 10px rgba(0,0,0,0.28);
              display: flex;
              align-items: center;
              gap: 4px;
              white-space: nowrap;
            ">
              ${isCrit ? '<span style="width: 6px; height: 6px; border-radius: 50%; background: #ffffff; animation: pulse 1.5s infinite;"></span>' : ''}
              <span>${b.bin_id}</span>
              <span style="opacity: 0.95; font-size: 10px;">${b.fill_level}%</span>
            </div>
            <div style="
              width: 0;
              height: 0;
              border-left: 5px solid transparent;
              border-right: 5px solid transparent;
              border-top: 6px solid ${badgeBg};
              margin-top: -1px;
            "></div>
          </div>
        `;

        const icon = L.divIcon({
          html: customHtml,
          className: 'custom-bin-pin-icon',
          iconSize: [64, 34],
          iconAnchor: [32, 32],
          popupAnchor: [0, -30],
        });

        const marker = L.marker([b.latitude, b.longitude], { icon }).addTo(map);

        const popupHtml = `
          <div style="font-family: system-ui, -apple-system, sans-serif; min-width: 180px; padding: 2px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <strong style="font-size: 14px; font-family: monospace; color: #0f172a;">${b.bin_id}</strong>
              <span style="font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 9999px; background: ${badgeBg}20; color: ${badgeBg};">
                ${b.status} (${b.fill_level}%)
              </span>
            </div>
            <div style="font-size: 11px; color: #334155; font-weight: 600; margin-bottom: 2px;">${b.location}</div>
            <div style="font-size: 10px; color: #64748b; margin-bottom: 6px;">${b.zone} &bull; ${b.waste_type}</div>
            <button id="ws-btn-inspect-${b.bin_id}" style="
              width: 100%;
              background: #0077CC;
              color: white;
              border: none;
              padding: 5px 8px;
              border-radius: 6px;
              font-size: 11px;
              font-weight: 700;
              cursor: pointer;
            ">
              Inspect Telemetry
            </button>
          </div>
        `;

        marker.bindPopup(popupHtml);

        marker.on('popupopen', () => {
          const btn = document.getElementById(`ws-btn-inspect-${b.bin_id}`);
          if (btn) {
            btn.onclick = () => {
              onSelectBin(b.bin_id);
              marker.closePopup();
            };
          }
        });

        marker.on('click', () => {
          onSelectBin(b.bin_id);
        });

        markersRef.current[`bin-${b.bin_id}`] = marker;
      });

      // 2. Render all real WasteSense Fleet Vehicles
      const vehicleCoords: [number, number][] = [
        [28.6165, 77.2085],
        [28.6225, 77.2140],
        [28.6110, 77.2040],
        [28.6180, 77.2185],
        [28.6265, 77.2080],
      ];

      vehicles.forEach((v, idx) => {
        const coords = vehicleCoords[idx % vehicleCoords.length];

        const truckHtml = `
          <div style="
            background: #0077CC;
            color: #ffffff;
            border: 2px solid #ffffff;
            border-radius: 8px;
            padding: 2.5px 6px;
            font-size: 10px;
            font-weight: 700;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            gap: 4px;
            cursor: pointer;
            white-space: nowrap;
          ">
            <span>🚛</span>
            <span>${v.name.split(' ')[0]}</span>
          </div>
        `;

        const icon = L.divIcon({
          html: truckHtml,
          className: 'custom-vehicle-truck-icon',
          iconSize: [68, 24],
          iconAnchor: [34, 12],
          popupAnchor: [0, -14],
        });

        const vMarker = L.marker(coords, { icon }).addTo(map);
        vMarker.bindPopup(`
          <div style="font-family: system-ui, sans-serif; font-size: 11px; padding: 2px;">
            <strong style="color: #0077CC; font-size: 12px;">${v.name} (${v.plate})</strong>
            <div style="color: #334155; margin-top: 3px;">Driver: <strong>${v.assigned_driver}</strong></div>
            <div style="color: #64748b; font-size: 10px;">Status: ${v.status} &bull; Load: ${v.current_load_pct}%</div>
          </div>
        `);

        markersRef.current[`veh-${v.id}`] = vMarker;
      });
    }

    updateMarkers();
  }, [bins, vehicles, selectedBinId, onSelectBin]);

  // Smooth camera pan to selected bin
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const targetBin = bins.find((b) => b.bin_id === selectedBinId);
    if (targetBin) {
      map.flyTo([targetBin.latitude, targetBin.longitude], 15, { duration: 1.0 });
    }
  }, [selectedBinId, bins]);

  return (
    <div className="relative w-full h-[540px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
      {/* 1. Leaflet Interactive Map Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* 2. Top-Right: Clean Live Fleet & Telemetry Status Badge */}
      <div className="absolute top-3 right-3 z-[400] flex items-center gap-3 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-sm text-xs font-semibold text-slate-700">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-mono text-slate-800">
            {bins.length} Active Bins Monitored
          </span>
        </div>
        <div className="w-[1px] h-3.5 bg-slate-200" />
        <div className="flex items-center gap-1 text-[11px] text-[#0077CC]">
          <Truck className="w-3.5 h-3.5" />
          <span>{vehicles.length} Trucks</span>
        </div>
      </div>

      {/* 3. Bottom-Left: Clean Operational Legend */}
      <div className="absolute bottom-3 left-3 z-[400] px-3 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-sm text-[11px] flex flex-wrap items-center gap-3 font-semibold text-slate-700">
        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Legend:</span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-xs" />
          <span>Critical (&ge;90%)</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span>High (&ge;75%)</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span>Normal</span>
        </span>
        <span className="flex items-center gap-1.5 text-[#0077CC]">
          <span>🚛</span>
          <span>Fleet Compactor</span>
        </span>
      </div>
    </div>
  );
};
