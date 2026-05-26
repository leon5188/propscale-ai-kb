import React from 'react';
import { Database, Search, MessageSquare, Zap, ShieldCheck, Layout, ArrowUpRight, TrendingUp } from 'lucide-react';

const Solution = () => {
  return (
    <section className="py-32 bg-white" id="solution">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-4">Core Superpowers</p>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter text-slate-900">
            Intelligence <br /> that moves the <span className="text-blue-600">Needle.</span>
          </h2>
          <p className="text-xl text-slate-500 leading-relaxed font-medium">
            PropScale AI is more than a chatbot. It&apos;s a fully-integrated data and automation layer for your real estate business.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          
          {/* Feature 1: The Data Engine (Large) */}
          <div className="md:col-span-4 bg-slate-50 rounded-[40px] border border-slate-100 p-10 flex flex-col group hover:border-blue-200 transition-all duration-500">
             <div className="flex justify-between items-start mb-12">
               <div className="space-y-4 max-w-sm">
                 <h3 className="text-3xl font-black text-slate-900 tracking-tight">The Omniscient Data Engine</h3>
                 <p className="text-slate-500 font-medium leading-relaxed">
                   AI with a local soul. We don&apos;t just talk; we scan Zillow, recent permits, and school ratings to provide instant authority.
                 </p>
               </div>
               <div className="w-14 h-14 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Database className="w-7 h-7 text-blue-600" />
               </div>
             </div>

             {/* Mock Data Card */}
             <div className="mt-auto relative">
               <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 max-w-md mx-auto transform group-hover:-translate-y-2 transition-transform duration-500">
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-black italic text-sm">IQ</div>
                    <div>
                      <p className="text-xs font-black text-slate-900">816 S Stoneman Ave</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Enrichment Active</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Zestimate</p>
                      <p className="text-lg font-black text-slate-900">$852,400</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Permit IQ</p>
                      <p className="text-lg font-black text-green-600">New Roof (2024)</p>
                    </div>
                  </div>
               </div>
               {/* Decorative Element */}
               <div className="absolute -top-12 -right-4 w-24 h-24 bg-blue-100 rounded-full blur-3xl opacity-40"></div>
             </div>
          </div>

          {/* Feature 2: Auto Pipeline (Small) */}
          <div className="md:col-span-2 bg-slate-900 rounded-[40px] p-10 flex flex-col text-white group hover:bg-black transition-all duration-500">
             <div className="w-14 h-14 bg-white/10 rounded-2xl border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <Layout className="w-7 h-7 text-blue-400" />
             </div>
             <h3 className="text-2xl font-black mb-4 tracking-tight">Auto Pipeline Movement</h3>
             <p className="text-slate-400 text-sm font-medium leading-relaxed mb-12">
               Watch your Kanban board move itself. AI qualifies the intent and advances leads to &apos;Hot Prospect&apos; in real-time.
             </p>
             
             {/* Mock Kanban */}
             <div className="mt-auto space-y-3">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">New Lead</span>
                  <div className="w-2 h-2 bg-slate-700 rounded-full"></div>
                </div>
                <div className="p-3 bg-blue-600 rounded-xl flex items-center justify-between shadow-lg shadow-blue-900/40 translate-x-4">
                  <span className="text-[10px] font-black text-white uppercase tracking-widest italic">AI Qualified</span>
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
             </div>
          </div>

          {/* Feature 3: Voice Cloning (Small) */}
          <div className="md:col-span-2 bg-slate-50 rounded-[40px] border border-slate-100 p-10 flex flex-col group hover:border-blue-200 transition-all duration-500">
             <div className="w-14 h-14 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <Zap className="w-7 h-7 text-blue-600" />
             </div>
             <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">100% Brand Voice</h3>
             <p className="text-slate-500 text-sm font-medium leading-relaxed mb-12">
               We don&apos;t do generic. Our AI clones your unique text style, emojis, and vocabulary. Invisible technology.
             </p>
             
             <div className="mt-auto p-4 bg-white rounded-2xl border border-slate-200 shadow-sm italic text-[10px] font-bold text-slate-600">
                &quot;Hey friend! Checked the roof permit... it looks solid! 🚀&quot;
             </div>
          </div>

          {/* Feature 4: Lead Scoring (Large) */}
          <div className="md:col-span-4 bg-slate-50 rounded-[40px] border border-slate-100 p-10 flex flex-col lg:flex-row gap-12 group hover:border-blue-200 transition-all duration-500">
             <div className="flex-1 space-y-6">
                <div className="w-14 h-14 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                   <TrendingUp className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight text-slate-900">Predictive Lead Scoring</h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Focus on the whales, not the minnows. AI calculates a PropScale Score (0-100) based on real market demand and property history.
                </p>
                <div className="pt-4">
                  <div className="inline-flex items-center gap-2 text-blue-600 font-black text-sm uppercase tracking-widest group-hover:gap-4 transition-all duration-300 cursor-pointer">
                    Learn about IQ Scoring <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
             </div>
             
             <div className="flex-1 flex flex-col justify-center">
                <div className="bg-slate-900 rounded-[32px] p-8 text-center shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-600"></div>
                   <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-4">Lead Score Confidence</p>
                   <p className="text-7xl font-black text-white tracking-tighter mb-4">94<span className="text-2xl text-blue-400">/100</span></p>
                   <div className="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-[10px] font-black uppercase tracking-widest inline-block">High Intent Seller</div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
