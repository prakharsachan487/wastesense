'use client';

import React, { useEffect, useRef, useState } from 'react';
import { SmartBin, Vehicle } from '../../types';
import { 
  Search, Crosshair, Layers, TrafficCone, Compass, 
  MapPin, Truck, AlertTriangle, CheckCircle2, Sparkles, Navigation 
} from 'lucide-react';

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
  const layersGroupRef = useRef<{
    streetsTile?: any;
    satelliteTile?: any;
    zonePolygon?: any;
    hotspotCircle?: any;
    locateMarker?: any;
  }>({});

  const [mapType, setMapType] = useState<'streets' | 'satellite'>('streets');
  const [showOverlays, setShowOverlays] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [locateStatus, setLocateStatus] = useState<string | null>(null);

  // Initialize Leaflet Map once
  useEffect(() => {
    let isMounted = true;

    async function initLeaflet() {
      if (!mapContainerRef.current) return;
      if (mapInstanceRef.current) return;

      const L = await import('leaflet');

      // Center around Sector 12 / Central Market (28.6139, 77.2090)
      const map = L.map(mapContainerRef.current, {
        center: [28.6145, 77.2095],
        zoom: 14,
        zoomControl: true,
        attributionControl: true,
      });

      mapInstanceRef.current = map;

      // 1. Street Tiles (OpenStreetMap Standard)
      const streetsTile = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors &bull; WasteSense Operations',
      }).addTo(map);

      // 2. Satellite Tiles (ESRI World Imagery)
      const satelliteTile = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 18,
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        }
      );

      layersGroupRef.current.streetsTile = streetsTile;
      layersGroupRef.current.satelliteTile = satelliteTile;

      // 3. Zone Polygon: Zone A Commercial & High-Density Pedestrian Corridor (Green Polygon matching screenshot)
      const zoneCoords: [number, number][] = [
        [28.6185, 77.2045],
        [28.6198, 77.2155],
        [28.6115, 77.2165],
        [28.6095, 77.2065],
      ];
      const zonePolygon = L.polygon(zoneCoords, {
        color: '#16a34a', // Emerald Green outline
        weight: 2,
        fillColor: '#22c55e',
        fillOpacity: 0.28,
        dashArray: '4, 6',
      }).addTo(map);

      zonePolygon.bindTooltip(
        '<div class="font-bold text-xs text-emerald-800">Zone A &bull; Commercial Sanitation Grid</div><div class="text-[10px] text-slate-600">Active High-Priority IoT Patrol</div>',
        { sticky: true }
      );

      // 4. Hotspot Circle: Central Commercial Square (Purple circle matching screenshot)
      const hotspotCircle = L.circle([28.6139, 77.2090], {
        radius: 420,
        color: '#7e22ce', // Purple
        weight: 2.5,
        fillColor: '#a855f7',
        fillOpacity: 0.22,
      }).addTo(map);

      hotspotCircle.bindTooltip(
        '<div class="font-bold text-xs text-purple-900">Hotspot H-01 &bull; Central Commercial Hub</div><div class="text-[10px] text-purple-700">Surge Radius: 420m &bull; LoRaWAN Node B-102 Focus</div>',
        { sticky: true }
      );

      // 5. Default Dropped Orange Pin (matching screenshot at Hoxton / Transit Node)
      const pinHtml = `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
          <div style="
            width: 26px;
            height: 26px;
            background: #d97706;
            border: 3px solid #ffffff;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="width: 8px; height: 8px; background: #ffffff; border-radius: 50%; transform: rotate(45deg);"></div>
          </div>
        </div>
      `;

      const defaultPinIcon = L.divIcon({
        html: pinHtml,
        className: 'custom-dropped-pin',
        iconSize: [28, 38],
        iconAnchor: [14, 36],
      });

      const defaultPinMarker = L.marker([28.6225, 77.2185], { icon: defaultPinIcon }).addTo(map);
      defaultPinMarker.bindTooltip(
        '<div class="font-bold text-xs text-amber-900">Transit Terminal Hub</div><div class="text-[10px] text-slate-600">Active Sensor Node Corridor</div>',
        { sticky: true }
      );

      layersGroupRef.current.zonePolygon = zonePolygon;
      layersGroupRef.current.hotspotCircle = hotspotCircle;
      layersGroupRef.current.locateMarker = defaultPinMarker;

      // Invalidate map size after rendering container
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

      // Render Smart Bins
      bins.forEach((b) => {
        const isSelected = b.bin_id === selectedBinId;
        const isCrit = b.status === 'CRITICAL';
        const isHigh = b.status === 'HIGH';

        const badgeBg = isCrit ? '#e11d48' : isHigh ? '#f59e0b' : '#10b981';
        const ringBorder = isSelected ? '#0077CC' : '#ffffff';
        const scaleStyle = isSelected ? 'transform: scale(1.25); z-index: 999;' : '';

        // Custom HTML Marker matching high-tech municipal pin
        const customHtml = `
          <div class="ws-map-pin" style="${scaleStyle} display: flex; flex-direction: column; align-items: center; cursor: pointer;">
            <div style="
              background: ${badgeBg};
              color: #ffffff;
              font-family: monospace;
              font-weight: 900;
              font-size: 10px;
              padding: 2px 6px;
              border-radius: 9999px;
              border: 2px solid ${ringBorder};
              box-shadow: 0 4px 12px rgba(0,0,0,0.25);
              display: flex;
              align-items: center;
              gap: 3px;
              white-space: nowrap;
            ">
              ${isCrit ? '<span style="width: 6px; height: 6px; border-radius: 50%; background: #ffffff; animation: pulse 1.5s infinite;"></span>' : ''}
              <span>${b.bin_id}</span>
              <span style="opacity: 0.9; font-size: 9px;">${b.fill_level}%</span>
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
          className: 'custom-bin-icon',
          iconSize: [60, 32],
          iconAnchor: [30, 30],
          popupAnchor: [0, -28],
        });

        const marker = L.marker([b.latitude, b.longitude], { icon }).addTo(map);

        // Popup content with direct inspect action
        const popupContent = `
          <div style="font-family: system-ui, sans-serif; min-width: 190px; padding: 4px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <strong style="font-size: 14px; font-family: monospace; color: #0f172a;">${b.bin_id}</strong>
              <span style="font-size: 10px; font-weight: bold; padding: 2px 6px; border-radius: 9999px; background: ${badgeBg}20; color: ${badgeBg};">
                ${b.status} (${b.fill_level}%)
              </span>
            </div>
            <div style="font-size: 11px; color: #475569; font-weight: 500; margin-bottom: 4px;">${b.location}</div>
            <div style="font-size: 10px; color: #64748b; margin-bottom: 8px;">${b.overflow_prediction}</div>
            <button id="ws-btn-${b.bin_id}" style="
              width: 100%;
              background: #0077CC;
              color: white;
              border: none;
              padding: 6px 10px;
              border-radius: 8px;
              font-size: 11px;
              font-weight: bold;
              cursor: pointer;
            ">
              Select & Inspect Node
            </button>
          </div>
        `;

        marker.bindPopup(popupContent);

        marker.on('popupopen', () => {
          const btn = document.getElementById(`ws-btn-${b.bin_id}`);
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

      // Render Sanitation Vehicles
      vehicles.forEach((v, idx) => {
        const vCoords: [number, number][] = [
          [28.6162, 77.2085],
          [28.6235, 77.2130],
          [28.6110, 77.2040],
          [28.6180, 77.2180],
          [28.6270, 77.2090],
        ];
        const coords = vCoords[idx % vCoords.length];

        const truckHtml = `
          <div style="
            background: #0077CC;
            color: #ffffff;
            border: 2px solid #ffffff;
            border-radius: 8px;
            padding: 3px 6px;
            font-size: 10px;
            font-weight: bold;
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
          className: 'custom-truck-icon',
          iconSize: [70, 24],
          iconAnchor: [35, 12],
        });

        const vMarker = L.marker(coords, { icon }).addTo(map);
        vMarker.bindTooltip(
          `<div class="font-bold text-xs">${v.name} (${v.plate})</div><div class="text-[10px]">Driver: ${v.assigned_driver} &bull; Route: Commercial Corridor</div>`,
          { sticky: true }
        );
        markersRef.current[`veh-${v.id}`] = vMarker;
      });
    }

    updateMarkers();
  }, [bins, vehicles, selectedBinId, onSelectBin]);

  // Center/Fly to selected bin when selectedBinId changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const targetBin = bins.find((b) => b.bin_id === selectedBinId);
    if (targetBin) {
      map.flyTo([targetBin.latitude, targetBin.longitude], 15, { duration: 1.2 });
    }
  }, [selectedBinId, bins]);

  // Toggle Map Layer (Streets vs Satellite)
  const handleToggleMapType = (type: 'streets' | 'satellite') => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const { streetsTile, satelliteTile } = layersGroupRef.current;
    setMapType(type);

    if (type === 'satellite') {
      if (streetsTile) map.removeLayer(streetsTile);
      if (satelliteTile) map.addLayer(satelliteTile);
    } else {
      if (satelliteTile) map.removeLayer(satelliteTile);
      if (streetsTile) map.addLayer(streetsTile);
    }
  };

  // Toggle Zones & Hotspots Overlay
  const handleToggleOverlays = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const { zonePolygon, hotspotCircle } = layersGroupRef.current;
    const nextState = !showOverlays;
    setShowOverlays(nextState);

    if (nextState) {
      if (zonePolygon) map.addLayer(zonePolygon);
      if (hotspotCircle) map.addLayer(hotspotCircle);
    } else {
      if (zonePolygon) map.removeLayer(zonePolygon);
      if (hotspotCircle) map.removeLayer(hotspotCircle);
    }
  };

  // "Locate Me" Button: Pan to Real User Location with Custom Pin (Matching Screenshot)
  const handleLocateMe = async () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const L = await import('leaflet');

    setIsLocating(true);
    setLocateStatus('Detecting device GPS...');

    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const accuracy = pos.coords.accuracy || 20;

          // Remove previous locate marker
          if (layersGroupRef.current.locateMarker) {
            layersGroupRef.current.locateMarker.remove();
          }

          // Orange dropped pin icon matching the user's reference screenshot!
          const pinHtml = `
            <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
              <div style="
                width: 24px;
                height: 24px;
                background: #ea580c;
                border: 3px solid #ffffff;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                box-shadow: 0 4px 10px rgba(0,0,0,0.4);
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <div style="width: 7px; height: 7px; background: #ffffff; border-radius: 50%; transform: rotate(45deg);"></div>
              </div>
              <div style="
                margin-top: 4px;
                background: #ea580c;
                color: #ffffff;
                font-size: 10px;
                font-weight: 800;
                padding: 1px 6px;
                border-radius: 9999px;
                white-space: nowrap;
                box-shadow: 0 2px 6px rgba(0,0,0,0.25);
              ">
                You Are Here
              </div>
            </div>
          `;

          const pinIcon = L.divIcon({
            html: pinHtml,
            className: 'custom-locate-pin',
            iconSize: [30, 42],
            iconAnchor: [15, 40],
          });

          const locMarker = L.marker([lat, lng], { icon: pinIcon }).addTo(map);
          const circle = L.circle([lat, lng], {
            radius: Math.min(accuracy, 200),
            color: '#ea580c',
            fillColor: '#f97316',
            fillOpacity: 0.15,
            weight: 1.5,
          }).addTo(map);

          layersGroupRef.current.locateMarker = L.layerGroup([locMarker, circle]).addTo(map);

          map.flyTo([lat, lng], 16, { duration: 1.5 });
          setIsLocating(false);
          setLocateStatus(`Locked: ${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E`);
          setTimeout(() => setLocateStatus(null), 4000);
        },
        () => {
          setIsLocating(false);
          // Graceful fallback to Central Market Node B-102
          map.flyTo([28.6139, 77.2090], 15, { duration: 1.2 });
          setLocateStatus('Location denied. Centered on Central Market Node B-102');
          setTimeout(() => setLocateStatus(null), 4000);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      setIsLocating(false);
      setLocateStatus('Geolocation not supported');
    }
  };

  // Search input handler
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    // Search matching bin
    const matchedBin = bins.find(
      (b) =>
        b.bin_id.toLowerCase().includes(query) ||
        b.location.toLowerCase().includes(query) ||
        b.zone.toLowerCase().includes(query)
    );

    if (matchedBin) {
      onSelectBin(matchedBin.bin_id);
      const marker = markersRef.current[`bin-${matchedBin.bin_id}`];
      if (marker && mapInstanceRef.current) {
        mapInstanceRef.current.flyTo([matchedBin.latitude, matchedBin.longitude], 16, { duration: 1.2 });
        setTimeout(() => marker.openPopup(), 1300);
      }
    }
  };

  return (
    <div className="relative w-full h-[540px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 flex flex-col">
      {/* 1. Header Bar matching screenshot: "Advanced Map Example" */}
      <div className="bg-[#0B0F19] text-white px-4 py-2 flex items-center justify-between text-xs font-semibold shrink-0 select-none z-10 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="font-bold tracking-wide text-slate-100 text-sm">Advanced Map Example</span>
          <span className="text-[10px] text-slate-400 font-mono hidden md:inline">&bull; Real-time OpenStreetMap Geospatial Mesh</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-slate-300">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-medium">IoT Mesh Connected</span>
          </span>
        </div>
      </div>

      {/* Map Body Area */}
      <div className="relative flex-1 w-full min-h-[480px]">
        {/* Leaflet Map DOM */}
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* 2. Top-Left: Search Bar with Blue Button (Matching Screenshot - below zoom controls) */}
        <div className="absolute top-[80px] left-3 z-[400] flex items-center shadow-md rounded-xl overflow-hidden bg-white border border-slate-300 max-w-[240px] sm:max-w-xs w-full">
          <form onSubmit={handleSearchSubmit} className="flex items-center w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search B-102, Central Market..."
              className="w-full pl-3 pr-2 py-2 text-xs text-[#0F172A] outline-none font-medium bg-transparent"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-[#0077CC] hover:bg-[#004A80] text-white flex items-center justify-center transition"
              title="Search Map"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* 3. Top-Right: Control Pill Bar (Locate Me | Satellite | Traffic) (Matching Screenshot) */}
        <div className="absolute top-3 right-3 z-[400] flex items-center gap-1 p-1 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md text-xs font-semibold text-slate-700">
          {/* Locate Me */}
          <button
            onClick={handleLocateMe}
            disabled={isLocating}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
              isLocating
                ? 'bg-rose-50 text-rose-700'
                : 'hover:bg-slate-100 text-slate-700 active:scale-95'
            }`}
            title="Pan to device live location"
          >
            <span className="text-rose-500 font-bold text-sm">📍</span>
            <span className="hidden sm:inline">Locate Me</span>
          </button>

          <div className="w-[1px] h-4 bg-slate-200" />

          {/* Satellite vs Streets Toggle */}
          <button
            onClick={() => handleToggleMapType(mapType === 'streets' ? 'satellite' : 'streets')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
              mapType === 'satellite'
                ? 'bg-[#0077CC] text-white shadow-xs'
                : 'hover:bg-slate-100 text-slate-700'
            }`}
            title="Toggle Satellite imagery"
          >
            <span className="text-blue-500 text-xs">🛰️</span>
            <span className="hidden sm:inline">{mapType === 'satellite' ? 'Satellite' : 'Streets'}</span>
          </button>

          <div className="w-[1px] h-4 bg-slate-200" />

          {/* Traffic / Zones Toggle */}
          <button
            onClick={handleToggleOverlays}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
              showOverlays
                ? 'bg-purple-50 text-purple-700 border border-purple-200'
                : 'hover:bg-slate-100 text-slate-400'
            }`}
            title="Toggle Municipal Sector Polygons & Hotspots"
          >
            <span className="text-purple-600 text-xs">🚦</span>
            <span className="hidden sm:inline">Traffic</span>
          </button>
        </div>

        {/* 4. Locate Status Floating Notification Banner */}
        {locateStatus && (
          <div className="absolute top-16 right-3 z-[400] px-3.5 py-1.5 rounded-xl bg-[#0F172A]/90 backdrop-blur-md text-white text-[11px] font-mono font-semibold shadow-lg flex items-center gap-2 animate-in fade-in">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{locateStatus}</span>
          </div>
        )}

        {/* 5. Bottom-Left Operational Legend */}
        <div className="absolute bottom-3 left-3 z-[400] p-2.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg text-[10px] space-y-1 hidden sm:block">
          <div className="font-extrabold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#0077CC]" />
            <span>Geospatial Mesh Overlay</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
            <span className="font-bold text-rose-700">Critical (&ge;90% Fill)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="font-bold text-amber-700">High Priority (&ge;75%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="font-bold text-emerald-700">Normal / Emptied</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
            <span className="font-bold text-purple-800">Hotspot Circle Radius</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs">🚛</span>
            <span className="font-bold text-[#0077CC]">Compactor Truck En Route</span>
          </div>
        </div>
      </div>
    </div>
  );
};
