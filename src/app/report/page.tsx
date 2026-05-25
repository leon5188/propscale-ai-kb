"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { 
  TrendingDown, Zap, Clock, ShieldAlert, CheckCircle2, 
  ArrowRight, PhoneCall, Mail, MousePointer2 
} from 'lucide-react';

const leadLeakData = [
  { time: '1m', conversion: 95 },
  { time: '5m', conversion: 90 },
  { time: '10m', conversion: 40 },
  { time: '30m', conversion: 15 },
  { time: '1h', conversion: 5 },
  { time: '4h', conversion: 1 },
];

const comparisonData = [
  { name: 'Standard Response', time: 45, color: '#ef4444' },
  { name: 'PropScale AI', time: 0.5, color: '#22c55e' },
];

function ReportContent() {
  const searchParams = useSearchParams();
  const agencyName = searchParams.get("agency") || "Your Agency";
  const city = searchParams.get("city") || "Your Local Market";
  const agentName = searchParams.get("agent") || "Team Leader";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <Zap className="text-white w-5 h-5 fill-current" />
            </div>
            <span className="font-bold text-xl tracking-tight text-blue-900">PropScale AI</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <span>Audit ID: #PS-2026-0524</span>
            <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded border border-blue-100">Confidential</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Digital Performance Audit
          </h1>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xl text-slate-600 max-w-2xl">
                Analysis of lead response infrastructure for <span className="text-blue-600 font-semibold">{agencyName}</span> in <span className="text-slate-900 font-medium">{city}</span>.
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Health Score</p>
                <p className="text-3xl font-black text-amber-500">64/100</p>
              </div>
              <div className="h-10 w-px bg-slate-100"></div>
              <div className="flex flex-col gap-1">
                <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[64%] h-full bg-amber-500"></div>
                </div>
                <span className="text-[10px] text-amber-600 font-bold uppercase">Needs Attention</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Analysis */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* The Lead Leak Section */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-50 rounded-lg">
                  <TrendingDown className="text-red-600 w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold">The "Lead Leak" Phenomenon</h2>
              </div>
              
              <p className="text-slate-600 mb-8 leading-relaxed">
                Our analysis confirms that your agency is suffering from a significant conversion drop-off. In <span className="font-semibold">{city}</span>, real estate leads are highly sensitive to time. Failing to respond within the first 10 minutes results in a <strong>400% decrease</strong> in qualified appointments.
              </p>

              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={leadLeakData}>
                    <defs>
                      <linearGradient id="colorLeak" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                    />
                    <Area type="monotone" dataKey="conversion" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorLeak)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Conversion Rate % vs. Response Time</p>
              </div>
            </div>

            {/* AI Comparison Section */}
            <div className="bg-slate-900 rounded-2xl p-6 md:p-8 shadow-xl text-white">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Zap className="text-white w-6 h-6 fill-current" />
                </div>
                <h2 className="text-2xl font-bold">The PropScale Solution</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-blue-400 font-bold uppercase tracking-widest text-xs">Response Time Benchmark</p>
                    <h3 className="text-3xl font-bold">Human vs. AI</h3>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    While your team is busy with showings, our AI acts as a 24/7 concierge. It doesn't just reply; it qualifies the lead using local market data from Zillow.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Instant Data Enrichment (Zestimate, SqFt)",
                      "Localized AI Conversation Soul",
                      "Auto-Booking Listing Presentations",
                      "365-Day Intelligent Nurture"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm">
                        <CheckCircle2 className="text-blue-500 w-5 h-5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={comparisonData} layout="vertical">
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} width={100} />
                        <Tooltip cursor={{fill: 'transparent'}} />
                        <Bar dataKey="time" radius={[0, 4, 4, 0]} barSize={30}>
                          {comparisonData.map((entry, index) => (
                            <rect key={index} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-center mt-4 text-xs text-slate-500 font-medium">Response Time in Minutes (Lower is better)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - CTA */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 sticky top-24">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Ready to fix the leak?</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  We have reserved a 10-minute Tech Audit slot for <span className="font-bold text-slate-900">{agentName}</span> to see this automation live in your own GHL dashboard.
                </p>
              </div>
              
              <div className="space-y-4">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200 group">
                  Book Free Tech Audit
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-dashed">
                  <div className="p-2 bg-white rounded-full shadow-sm">
                    <ShieldAlert className="text-amber-500 w-5 h-5" />
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium uppercase leading-tight">
                    This offer is limited to 1 agency per market area to ensure local exclusivity.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t space-y-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Infrastructure Status</p>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Zillow API Integration</span>
                  <span className="text-green-500 font-bold flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    READY
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">AI Logic Mapping</span>
                  <span className="text-green-500 font-bold flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    COMPLETE
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">GHL Workflow Bridge</span>
                  <span className="text-blue-500 font-bold">PENDING AUTH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Zap className="text-blue-600 w-5 h-5 fill-current" />
            <span className="font-bold text-slate-900">PropScale AI</span>
          </div>
          <p className="text-slate-400 text-sm">© 2026 PropScale AI. All rights reserved. Data analyzed for proprietary outreach.</p>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <Mail className="w-5 h-5" />
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <PhoneCall className="w-5 h-5" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function ReportPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Report...</div>}>
      <ReportContent />
    </Suspense>
  );
}
