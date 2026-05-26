"use client";

import React, { useState, useEffect } from 'react';
import { X, MessageSquare, Database, Search, Layout, CheckCircle2, Zap, ArrowRight, Mic2, ShieldCheck, RefreshCw } from 'lucide-react';

interface LiveDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

const LiveDemo: React.FC<LiveDemoProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const steps = [
    { title: "Authentication", subtitle: "Connecting to your CRM" },
    { title: "Auto-Provisioning", subtitle: "Building data infrastructure" },
    { title: "Voice Synthesis", subtitle: "Cloning your identity" },
    { title: "Real-time Interception", subtitle: "Zillow & Exa data scan" },
    { title: "Autonomous CRM", subtitle: "Closing the loop" }
  ];

  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      return;
    }

    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      setStep((prev) => (prev < 7 ? prev + 1 : 0));
    }, 4500);

    return () => clearInterval(timer);
  }, [isOpen, isAutoPlay]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-md" onClick={onClose}></div>

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-7xl rounded-[40px] shadow-[0_0_100px_rgba(37,99,235,0.2)] border border-slate-200 overflow-hidden flex flex-col h-[90vh]">
        
        {/* Header */}
        <div className="bg-white px-8 py-6 border-b border-slate-100 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-200">
              <Zap className="text-white w-6 h-6 fill-current" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Full Onboarding & Automation Cycle</h3>
              <div className="flex items-center gap-4 mt-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">End-to-End Simulation</p>
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 rounded-full border border-blue-100">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-[8px] font-black text-blue-600 uppercase">Live Preview</span>
                </div>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="w-12 h-12 rounded-full hover:bg-slate-100 flex items-center justify-center transition-all">
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        {/* Progress Nav */}
        <div className="bg-slate-50 px-8 py-3 flex items-center justify-between border-b border-slate-100 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-8">
            {steps.map((s, i) => (
              <div key={i} className={`flex items-center gap-3 transition-opacity duration-500 ${Math.floor(step / 1.5) >= i ? 'opacity-100' : 'opacity-30'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${Math.floor(step / 1.5) >= i ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                  {i + 1}
                </span>
                <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest whitespace-nowrap">{s.title}</span>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="flex items-center gap-2 px-4 py-1.5 bg-white rounded-lg border border-slate-200 shadow-sm hover:bg-slate-50 transition-all ml-8"
          >
            <RefreshCw className={`w-3 h-3 text-slate-500 ${isAutoPlay ? 'animate-spin' : ''}`} />
            <span className="text-[10px] font-black text-slate-600 uppercase">{isAutoPlay ? 'Auto-Play On' : 'Paused'}</span>
          </button>
        </div>

        {/* Dynamic Demo Body */}
        <div className="flex-1 overflow-y-auto bg-slate-50/30">
          <div className="max-w-6xl mx-auto p-8 md:p-16">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              
              {/* Visual Side (Mock UI) */}
              <div className="relative order-2 lg:order-1">
                <div className="absolute -inset-10 bg-blue-100/50 rounded-full blur-[100px]"></div>
                
                <div className="relative">
                  {/* Step 1 & 2: Platform Connection */}
                  {step <= 2 && (
                    <div className="bg-white rounded-[40px] border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
                      <div className="bg-slate-50 px-8 py-4 border-b border-slate-100 flex items-center gap-2">
                         <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                         <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                         <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="p-12 flex flex-col items-center">
                        <div className={`transition-all duration-700 ${step === 0 ? 'scale-100 opacity-100' : 'scale-90 opacity-0 absolute'}`}>
                           <div className="w-24 h-24 bg-blue-50 rounded-[32px] flex items-center justify-center mb-8 shadow-inner">
                              <Zap className="w-12 h-12 text-blue-600" />
                           </div>
                           <button className="bg-blue-600 text-white font-black px-10 py-5 rounded-2xl shadow-xl shadow-blue-200 flex items-center gap-4 hover:scale-105 transition-transform">
                              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center italic tracking-tighter">P</div>
                              Connect PropScale CRM
                           </button>
                        </div>

                        {step >= 1 && (
                          <div className="w-full space-y-6 font-mono text-sm bg-slate-900 rounded-3xl p-8 text-blue-400 shadow-2xl">
                             <div className="flex justify-between items-center text-xs opacity-50 border-b border-white/10 pb-4 mb-4">
                               <span>SYSTEM_INIT_V2.0</span>
                               <span className="text-green-400">● ACTIVE</span>
                             </div>
                             <div className="flex justify-between">
                               <span>{">"} AUTH_HANDSHAKE</span>
                               <span className="text-green-400">VERIFIED</span>
                             </div>
                             <div className={`flex justify-between transition-opacity ${step >= 2 ? 'opacity-100' : 'opacity-30'}`}>
                               <span>{">"} INJECT_FIELDS_DB</span>
                               <span className="text-green-400">SUCCESS</span>
                             </div>
                             <div className={`flex justify-between transition-opacity ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                               <span>{">"} SYNCING: Zestimate</span>
                               <span className="animate-pulse text-amber-400 italic">PENDING_API</span>
                             </div>
                             <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mt-6">
                               <div className="h-full bg-blue-500 w-[85%] animate-progress"></div>
                             </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Identity Setup */}
                  {step === 3 && (
                    <div className="bg-white rounded-[40px] border border-slate-200 shadow-2xl p-10 animate-in fade-in slide-in-from-right duration-700">
                       <div className="flex items-center gap-6 mb-12">
                          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-200">
                             <Mic2 className="text-white w-10 h-10" />
                          </div>
                          <div>
                            <h4 className="text-2xl font-black text-slate-900 tracking-tight">Identity Synthesis</h4>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Cloning Agent Persona</p>
                          </div>
                       </div>
                       <div className="space-y-8">
                          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 italic text-slate-500 font-medium text-sm leading-relaxed relative">
                             &quot;Hey Friend! I just finished the deep scan for your house at 816 S Stoneman... talk tomorrow?&quot;
                             <div className="absolute -top-3 -left-3 bg-blue-600 text-white text-[8px] font-black px-2 py-1 rounded-lg uppercase tracking-widest">Training Sample</div>
                          </div>
                          <div className="flex items-end gap-1.5 h-16 px-4">
                             {[0.4, 0.7, 0.2, 0.9, 0.5, 1, 0.6, 0.8, 0.3, 0.7, 0.5, 0.9, 0.4, 0.8, 0.2, 0.6, 1].map((h, i) => (
                               <div key={i} className="flex-1 bg-blue-600 rounded-full animate-wave" style={{height: `${h*100}%`, animationDelay: `${i*0.05}s`}}></div>
                             ))}
                          </div>
                          <div className="flex justify-center pt-4">
                             <div className="px-8 py-3 bg-green-100 text-green-700 rounded-full text-xs font-black flex items-center gap-3">
                                <ShieldCheck className="w-4 h-4" />
                                VOICE CLONE VERIFIED & ACTIVE
                             </div>
                          </div>
                       </div>
                    </div>
                  )}

                  {/* Step 4 & 5: Live Interaction */}
                  {step >= 4 && step <= 5 && (
                    <div className="bg-white rounded-[40px] border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-700 h-[500px] flex flex-col">
                       <div className="bg-slate-50 p-6 border-b border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-black text-white italic">P</div>
                             <div>
                               <p className="text-xs font-black text-slate-900">PropScale Assistant</p>
                               <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Active • Intercepting Leads</p>
                             </div>
                          </div>
                          <Search className="w-5 h-5 text-slate-300" />
                       </div>
                       <div className="flex-1 p-8 space-y-8 flex flex-col">
                          <div className="self-start max-w-[80%] bg-slate-100 p-5 rounded-3xl rounded-tl-none text-sm font-medium text-slate-600 animate-in slide-in-from-left duration-700">
                             Hey, I saw your ad. What is the current market value for 816 S Stoneman Ave?
                          </div>
                          
                          {step >= 5 && (
                            <div className="mt-auto space-y-4">
                               <div className="flex items-center gap-2 text-blue-600">
                                  <Search className="w-4 h-4 animate-spin" />
                                  <span className="text-[10px] font-black uppercase tracking-widest">Scraping Zillow & Building Permits...</span>
                               </div>
                               <div className="self-end max-w-[85%] bg-blue-600 p-5 rounded-3xl rounded-tr-none text-sm font-bold text-white shadow-xl shadow-blue-200 animate-in slide-in-from-right duration-700">
                                  I just pulled the data! Zillow estimates it at $852,400. I also noticed you had a 2024 roof permit—nice upgrade! Want Sarah to give you a precise valuation tomorrow?
                               </div>
                            </div>
                          )}
                       </div>
                    </div>
                  )}

                  {/* Step 6 & 7: Final ROI */}
                  {step >= 6 && (
                    <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] animate-in fade-in slide-in-from-bottom duration-700">
                       <div className="flex justify-between items-start mb-12">
                          <div>
                            <h4 className="text-3xl font-black tracking-tight mb-2">Automated Payout</h4>
                            <p className="text-xs font-black text-white/40 uppercase tracking-widest">GHL Kanban Synchronization</p>
                          </div>
                          <Layout className="w-10 h-10 text-blue-500" />
                       </div>
                       <div className="space-y-4">
                          <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between opacity-30">
                             <span className="text-[10px] font-black uppercase tracking-widest">1. New Lead</span>
                             <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                          </div>
                          <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between opacity-50">
                             <span className="text-[10px] font-black uppercase tracking-widest">2. AI Contacted</span>
                             <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                          </div>
                          <div className="p-6 bg-blue-600 rounded-2xl flex items-center justify-between shadow-2xl shadow-blue-500/20 translate-x-4 border border-blue-400">
                             <div className="space-y-1">
                                <span className="text-[8px] font-black text-white/70 uppercase tracking-[0.2em]">Current Stage</span>
                                <p className="text-xl font-black italic tracking-tighter">3. AI QUALIFIED</p>
                             </div>
                             <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                <CheckCircle2 className="w-6 h-6 text-blue-600" />
                             </div>
                          </div>
                       </div>
                       <div className="mt-12 p-6 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-4">
                          <div className="p-3 bg-green-500 rounded-xl shadow-lg shadow-green-500/30">
                             <TrendingUp className="text-white w-6 h-6" />
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-green-400 uppercase tracking-widest">Time Reclaimed</p>
                             <p className="text-lg font-black tracking-tight text-white">+13 Hours This Week</p>
                          </div>
                       </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Text Side (Narrative) */}
              <div className="order-1 lg:order-2 space-y-10">
                {step <= 2 && (
                  <div className="space-y-6">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">Phase 01: Setup</span>
                    <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-tight">
                      We removed <br /> the setup phase.
                    </h2>
                    <p className="text-xl text-slate-500 leading-relaxed font-medium">
                      Most AI tools require weeks of training and Zapier integration. PropScale connects natively to your CRM location in 1-click. 
                    </p>
                    <div className="space-y-4">
                       <div className="flex items-center gap-4 text-slate-700 font-bold">
                          <CheckCircle2 className="text-green-500 w-5 h-5" /> Instant OAuth Authorization
                       </div>
                       <div className={`flex items-center gap-4 text-slate-700 font-bold transition-opacity ${step >= 2 ? 'opacity-100' : 'opacity-30'}`}>
                          <CheckCircle2 className="text-green-500 w-5 h-5" /> Auto-Injection of Property Fields
                       </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6 animate-in slide-in-from-right duration-700">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">Phase 02: Personality</span>
                    <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-tight">
                      Your voice. <br /> Our engine.
                    </h2>
                    <p className="text-xl text-slate-500 leading-relaxed font-medium">
                      Provide a single writing sample. Our Brand Voice engine clones your rhythm, vocabulary, and emoji usage. The result is an assistant that leads think is you.
                    </p>
                    <div className="p-4 bg-white rounded-2xl border border-slate-200 border-l-4 border-l-blue-600 shadow-sm">
                       <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Active Tone</p>
                       <p className="text-sm font-black text-slate-800 tracking-tight italic">&quot;Professional, slightly casual, uses data to verify claims.&quot;</p>
                    </div>
                  </div>
                )}

                {step >= 4 && step <= 5 && (
                  <div className="space-y-6 animate-in slide-in-from-right duration-700">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">Phase 03: Data Mastery</span>
                    <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-tight">
                      Zillow Data <br /> in every SMS.
                    </h2>
                    <p className="text-xl text-slate-500 leading-relaxed font-medium">
                      As soon as a lead mentions an address, our scraper penetrates Zillow and local permit records to provide instant authority. No more generic &quot;I&apos;ll check on that&quot; replies.
                    </p>
                    <div className="flex gap-4">
                       <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 font-black text-[10px] text-blue-600 tracking-widest uppercase">Zestimate Active</div>
                       <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 font-black text-[10px] text-amber-600 tracking-widest uppercase">Permit Scan On</div>
                    </div>
                  </div>
                )}

                {step >= 6 && (
                  <div className="space-y-6 animate-in slide-in-from-right duration-700">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">Phase 04: Profit</span>
                    <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-tight">
                      The Machine <br /> does the work.
                    </h2>
                    <p className="text-xl text-slate-500 leading-relaxed font-medium">
                      The AI qualifies the lead and automatically moves the Opportunity card in your CRM. You wake up to a dashboard full of appointments.
                    </p>
                    <button 
                      onClick={() => window.location.href = 'https://propscale-ai.com/pricing'}
                      className="bg-blue-600 text-white font-black px-10 py-5 rounded-2xl shadow-xl shadow-blue-200 flex items-center gap-4 hover:scale-105 transition-transform"
                    >
                      Get Started Today <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-slate-900 p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5 sticky bottom-0 z-20">
           <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-black text-white/50 italic">P</div>
                ))}
              </div>
              <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Joined by 50+ new agents this week</p>
           </div>
           <button 
             onClick={() => window.location.href = 'https://propscale-ai.com/pricing'}
             className="bg-white text-slate-900 font-black px-12 py-4 rounded-2xl hover:bg-slate-100 transition-all active:scale-95 shadow-2xl shadow-white/10"
           >
             Start Your 3-Minute Setup
           </button>
        </div>
      </div>
    </div>
  );
};

export default LiveDemo;
