"use client";

import React, { useState, useEffect } from 'react';
import { X, MessageSquare, Database, Search, Layout, CheckCircle2, Zap } from 'lucide-react';

interface LiveDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

const LiveDemo: React.FC<LiveDemoProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      return;
    }

    const timer = setInterval(() => {
      setStep((prev) => (prev < 5 ? prev + 1 : 0));
    }, 3500);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-6xl rounded-[40px] shadow-2xl border border-slate-200 overflow-hidden flex flex-col md:h-[700px]">
        
        {/* Header */}
        <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <Zap className="text-white w-6 h-6 fill-current" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">PropScale AI Live Demo</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Visualizing the 3-Minute Profit Loop</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-8 md:p-12 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 h-full items-start">
            
            {/* Column 1: Lead Interaction */}
            <div className={`space-y-6 transition-all duration-500 ${step >= 1 ? 'opacity-100' : 'opacity-30 grayscale'}`}>
              <div className="flex items-center gap-2 mb-4">
                 <MessageSquare className="w-4 h-4 text-blue-600" />
                 <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Channel: SMS</span>
              </div>
              <div className="bg-slate-50 rounded-[32px] p-6 border border-slate-100 shadow-inner min-h-[350px] flex flex-col">
                <div className={`bg-white p-4 rounded-2xl rounded-tl-none text-xs font-medium text-slate-600 shadow-sm border border-slate-100 self-start max-w-[85%] transition-all duration-700 ${step >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                  &quot;Hey, is 816 S Stoneman Ave available? What&apos;s the Zestimate right now?&quot;
                </div>
                <div className={`mt-auto bg-blue-600 p-4 rounded-2xl rounded-tr-none text-xs font-bold text-white shadow-xl self-end max-w-[85%] transition-all duration-700 delay-[2000ms] ${step >= 4 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                  &quot;It sure is! Scanning the market... Zestimate is $852,400. I also noticed you had a 2024 roof permit. Nice! Want to chat tomorrow?&quot;
                </div>
              </div>
              <p className="text-[10px] text-center font-bold text-slate-400">Step 1: AI intercepts Lead instantly</p>
            </div>

            {/* Column 2: Data Intelligence */}
            <div className={`space-y-6 transition-all duration-500 ${step >= 2 ? 'opacity-100' : 'opacity-30 grayscale'}`}>
              <div className="flex items-center gap-2 mb-4">
                 <Database className="w-4 h-4 text-blue-600" />
                 <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Brain: Multi-Tenant IQ</span>
              </div>
              <div className="bg-slate-900 rounded-[32px] p-8 min-h-[350px] relative overflow-hidden flex flex-col justify-center">
                 <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500 rounded-full blur-[80px]"></div>
                 </div>
                 
                 <div className="space-y-4 font-mono text-[10px] relative z-10">
                   <div className={`flex items-center gap-3 text-blue-400 transition-all ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                     <Search className="w-3 h-3" />
                     <span>RUNNING_EXA_SEARCH: 816_S_STONEMAN...</span>
                   </div>
                   <div className={`p-3 bg-white/5 border border-white/10 rounded-xl space-y-2 transition-all duration-1000 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                      <div className="flex justify-between">
                        <span className="text-white/40 italic">Zillow_API</span>
                        <span className="text-green-400 font-bold">$852,400</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/40 italic">Permit_History</span>
                        <span className="text-amber-400 font-bold">Roof_2024</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-white/10">
                        <span className="text-white font-bold tracking-widest">PROPSCALE_SCORE</span>
                        <span className="text-blue-400 font-bold">94/100</span>
                      </div>
                   </div>
                 </div>
              </div>
              <p className="text-[10px] text-center font-bold text-slate-400">Step 2: Scraper penetrates Zillow & Permits</p>
            </div>

            {/* Column 3: CRM Automation */}
            <div className={`space-y-6 transition-all duration-500 ${step >= 5 ? 'opacity-100' : 'opacity-30 grayscale'}`}>
              <div className="flex items-center gap-2 mb-4">
                 <Layout className="w-4 h-4 text-blue-600" />
                 <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Platform: Live Sync</span>
              </div>
              <div className="bg-slate-50 rounded-[32px] p-6 border border-slate-100 shadow-inner min-h-[350px] flex flex-col gap-4">
                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between opacity-40">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                    <span className="text-[10px] font-black text-slate-400 uppercase">New Lead</span>
                  </div>
                </div>
                <div className={`p-4 bg-white rounded-2xl border-l-4 border-l-blue-600 shadow-xl flex items-center justify-between transition-all duration-1000 transform ${step >= 5 ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-20 opacity-0 rotate-3'}`}>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest italic">AI Qualified</span>
                    <p className="text-xs font-black text-slate-900 leading-none mt-2 italic">816 S Stoneman Ave</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
              </div>
              <p className="text-[10px] text-center font-bold text-slate-400">Step 3: Kanban board moves itself</p>
            </div>

          </div>
        </div>

        {/* Footer Info */}
        <div className="bg-slate-900 p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center ${step === 5 ? 'animate-bounce' : ''}`}>
              <Zap className="fill-current" />
            </div>
            <div>
              <p className="font-black text-lg leading-tight tracking-tight">System Cycle Complete.</p>
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Time to value: &lt; 2.5 Minutes</p>
            </div>
          </div>
          <button 
            onClick={() => window.location.href = 'https://propscale-ai.com/pricing'}
            className="bg-white text-slate-900 font-black px-10 py-4 rounded-2xl hover:bg-slate-100 transition-all active:scale-95 whitespace-nowrap"
          >
            Claim Your Market Now
          </button>
        </div>

      </div>
    </div>
  );
};

export default LiveDemo;
