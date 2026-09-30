'use client';

import React, { useState } from 'react';
import { useWasteSense } from '../../../context/WasteSenseContext';
import { BarChart3, TrendingUp, Calendar, Download, RefreshCw } from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, 
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend 
} from 'recharts';

export default function AdminAnalyticsPage() {
  const { bins, complaints, tasks } = useWasteSense();
  const [timeRange, setTimeRange] = useState('7d');

  // 1. Weekly Collection Volume (Tons)
  const collectionTrends = [
    { day: 'Mon', collected: 14.2, target: 12.0 },
    { day: 'Tue', collected: 16.8, target: 14.0 },
    { day: 'Wed', collected: 18.5, target: 15.0 },
    { day: 'Thu', collected: 15.1, target: 14.0 },
    { day: 'Fri', collected: 21.4, target: 18.0 },
    { day: 'Sat', collected: 24.8, target: 20.0 },
    { day: 'Sun', collected: 19.3, target: 16.0 },
  ];

  // 2. Complaints by Category
  const categoryCounts: Record<string, number> = {};
  complaints.forEach(c => {
    categoryCounts[c.category] = (categoryCounts[c.category] || 0) + 1;
  });

  const categoryData = Object.keys(categoryCounts).map(cat => ({
    name: cat,
    value: categoryCounts[cat]
  }));

  const COLORS = ['#ef4444', '#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899'];

  // 3. Fill Level Distribution
  const fillDistribution = [
    { name: 'Critical (≥90%)', count: bins.filter(b => b.fill_level >= 90).length, fill: '#ef4444' },
    { name: 'High (75-89%)', count: bins.filter(b => b.fill_level >= 75 && b.fill_level < 90).length, fill: '#f97316' },
    { name: 'Warning (60-74%)', count: bins.filter(b => b.fill_level >= 60 && b.fill_level < 75).length, fill: '#eab308' },
    { name: 'Normal (<60%)', count: bins.filter(b => b.fill_level < 60).length, fill: '#10b981' },
  ];

  // 4. Efficiency Trend
  const hourlyEfficiency = [
    { hour: '06:00', efficiency: 94 },
    { hour: '09:00', efficiency: 91 },
    { hour: '12:00', efficiency: 86 },
    { hour: '15:00', efficiency: 89 },
    { hour: '18:00', efficiency: 93 },
    { hour: '21:00', efficiency: 96 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Operations Analytics & Telematics</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F0F9FF] text-[#0077CC] font-semibold border border-[#BAE6FD]">
              Live Aggregations
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Throughput velocity, SLA compliance, fill-level histograms, and fuel saving impact
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-white border border-slate-200 text-xs text-slate-700 px-3 py-2 rounded-xl outline-none focus:border-[#0077CC] shadow-xs"
          >
            <option value="24h">Past 24 Hours</option>
            <option value="7d">Past 7 Days</option>
            <option value="30d">Past 30 Days</option>
          </select>

          <button className="flex items-center gap-1 px-3 py-2 bg-[#0077CC] hover:bg-[#004A80] text-white rounded-xl text-xs font-semibold shadow-xs transition active:scale-95">
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold uppercase">Weekly Tonnage Collected</span>
          <div className="text-2xl font-mono font-black text-[#0F172A] mt-1">130.1 Tons</div>
          <span className="text-[11px] text-emerald-600 font-semibold">↑ 14% vs baseline</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold uppercase">Average Response SLA</span>
          <div className="text-2xl font-mono font-black text-emerald-600 mt-1">42 Minutes</div>
          <span className="text-[11px] text-emerald-600 font-medium">Target: &lt; 90 mins</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold uppercase">Fuel Saved (Dynamic Routing)</span>
          <div className="text-2xl font-mono font-black text-[#0077CC] mt-1">182 Liters</div>
          <span className="text-[11px] text-[#0077CC] font-medium">Condition-based skip logic</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold uppercase">Verification Compliance</span>
          <div className="text-2xl font-mono font-black text-purple-600 mt-1">100%</div>
          <span className="text-[11px] text-purple-600 font-medium">Photo + Sensor signed</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Collection Volume Trend */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-[#0F172A] mb-1">Daily Municipal Waste Tonnage (Tons)</h3>
          <p className="text-xs text-slate-500 mb-4">Actual collected volume vs municipal planned route targets</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={collectionTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '8px', fontSize: '11px', color: '#0f172a' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="collected" name="Collected (Tons)" fill="#0077CC" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" name="Target Base (Tons)" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Hourly Operations Efficiency */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-[#0F172A] mb-1">Real-Time Operational Efficiency (%)</h3>
          <p className="text-xs text-slate-500 mb-4">Fleet dispatch adherence & on-time bin clearance rate</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyEfficiency}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="hour" stroke="#64748b" fontSize={11} />
                <YAxis domain={[70, 100]} stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '8px', fontSize: '11px', color: '#0f172a' }} />
                <Line type="monotone" dataKey="efficiency" name="Efficiency %" stroke="#0077CC" strokeWidth={3} dot={{ fill: '#0077CC', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Fill Level Breakdown Histogram */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-[#0F172A] mb-1">Fleet Fill Capacity Distribution</h3>
          <p className="text-xs text-slate-500 mb-4">Current state across all 20 monitored digital twin nodes</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fillDistribution} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" stroke="#64748b" fontSize={11} />
                <YAxis type="category" dataKey="name" stroke="#64748b" fontSize={11} width={110} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '8px', fontSize: '11px', color: '#0f172a' }} />
                <Bar dataKey="count" name="Number of Bins" radius={[0, 4, 4, 0]}>
                  {fillDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Complaints by Category Pie */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-[#0F172A] mb-1">Citizen Complaints by Category</h3>
          <p className="text-xs text-slate-500 mb-4">Breakdown of reported issues across urban sectors</p>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={45}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }: { name?: string; percent?: number }) => `${name ? name.split(' ')[0] : ''} (${percent ? (percent * 100).toFixed(0) : 0}%)`}
                  labelLine={false}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`pie-cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '8px', fontSize: '11px', color: '#0f172a' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
