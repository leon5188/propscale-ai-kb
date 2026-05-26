'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  Activity, 
  RefreshCcw, 
  ShieldCheck,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';

interface DashboardStats {
  totalLeads: number;
  aiRepliesToday: number;
  appointmentsBooked: number;
  systemHealth: {
    ghl: string;
    vercel: string;
    pinecone: string;
  };
}

function DashboardContent() {
  const searchParams = useSearchParams();
  // GHL will pass ?location=xyz when embedded via Custom Menu Link
  const locationId = searchParams.get('location') || 'dcJGZR1L77vJd0rvaNI5'; 

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      // Pass the location ID to our API so it fetches data for the correct sub-account
      const res = await fetch(`/api/dashboard-stats?locationId=${locationId}`);
      const data = await res.json();
      setStats(data);
    } catch (e) {
      console.error("Failed to load stats", e);
    } finally {
      setLoading(false);
    }
  }, [locationId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchStats();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchStats]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 font-sans text-left">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
              PropScale AI Command Center
            </h1>
            <p className="text-slate-400 mt-1">
              Live performance metrics for Location ID: <span className="font-mono text-xs text-slate-500">{locationId}</span>
            </p>
          </div>
          <button 
            onClick={fetchStats}
            className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg hover:bg-slate-800 transition-all text-sm"
          >
            <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 text-left">
          {/* Total Leads */}
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:border-blue-500/50 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex items-center text-green-400 text-xs font-medium">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12%
              </div>
            </div>
            <p className="text-slate-400 text-sm font-medium">Total Potential Buyers</p>
            <h3 className="text-3xl font-bold mt-1">{loading ? '...' : stats?.totalLeads}</h3>
          </div>

          {/* AI Conversations */}
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:border-indigo-500/50 transition-all group">
            <div className="flex justify-between items-start mb-4 text-left">
              <div className="p-3 bg-indigo-500/10 rounded-xl">
                <MessageSquare className="w-6 h-6 text-indigo-400" />
              </div>
              <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">Today</span>
            </div>
            <p className="text-slate-400 text-sm font-medium">AI Replies Handled</p>
            <h3 className="text-3xl font-bold mt-1">{loading ? '...' : stats?.aiRepliesToday}</h3>
          </div>

          {/* Appointments */}
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:border-purple-500/50 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-purple-500/10 rounded-xl">
                <Calendar className="w-6 h-6 text-purple-400" />
              </div>
              <div className="bg-purple-500/20 text-purple-300 text-[10px] px-2 py-0.5 rounded-full font-bold">LIVE</div>
            </div>
            <p className="text-slate-400 text-sm font-medium">Appointments Booked</p>
            <h3 className="text-3xl font-bold mt-1">{loading ? '...' : stats?.appointmentsBooked}</h3>
          </div>

          {/* System Health */}
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-emerald-500/10 rounded-xl">
                <Activity className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <p className="text-slate-400 text-sm font-medium">System Integrity</p>
            <div className="flex flex-col gap-2 mt-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">CRM Connection</span>
                <span className={`font-bold ${stats?.systemHealth.ghl === 'connected' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {stats?.systemHealth.ghl.toUpperCase() || 'OFFLINE'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">OpenAI Brain</span>
                <span className="text-emerald-400 font-bold tracking-tight">GPT-4O READY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Console Feed */}
          <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-bold flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
                Live AI Activity Stream
              </h4>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-950/50 border border-slate-800 p-4 rounded-xl text-sm flex gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold">L.S</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold">Leon Sun</span>
                    <span className="text-slate-500 text-[10px]">Just now</span>
                  </div>
                  <p className="text-slate-300 italic">&quot;Can you find me a 3-bedroom house in Alhambra?&quot;</p>
                  <div className="mt-3 flex items-center gap-2 text-indigo-400 font-medium">
                    <Bot className="w-4 h-4" />
                    <span className="text-xs">PropScale AI replied with custom listings...</span>
                  </div>
                </div>
              </div>
              <div className="bg-slate-950/50 border border-slate-800 p-4 rounded-xl text-sm flex gap-4 opacity-60">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold">J.D</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold">John Doe</span>
                    <span className="text-slate-500 text-[10px]">14 mins ago</span>
                  </div>
                  <p className="text-slate-300 italic">&quot;What is the interest rate trend?&quot;</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-b from-blue-600/10 to-indigo-600/10 border border-blue-500/20 rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-bold mb-2">Growth Acceleration</h4>
              <p className="text-slate-400 text-sm mb-6">Need more leads? Launch a new AI-powered campaign in one click.</p>
              
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 group mb-4">
                Launch FB Campaign
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              
              <button className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                Download Lead Report
              </button>
            </div>
            
            <div className="mt-8 pt-8 border-t border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 p-0.5">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-xs font-black">
                    PAI
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold">PropScale AI Pro</p>
                  <p className="text-[10px] text-slate-500">Plan: Enterprise v1.0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading Command Center...</div>}>
      <DashboardContent />
    </Suspense>
  );
}

function Bot({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}
