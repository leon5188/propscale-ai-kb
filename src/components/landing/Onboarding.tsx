"use client";

import React from 'react';
import { ArrowRight, CheckCircle2, Mic2, Layout, Database, Shield } from 'lucide-react';

const Onboarding = () => {
  return (
    <section className="py-32 bg-slate-50 overflow-hidden border-b border-slate-100" id="how-it-works">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-4">The Onboarding Flow</p>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter">
            Zero to Agent <br /> in <span className="text-blue-600 italic">3 Minutes.</span>
          </h2>
          <p className="text-xl text-slate-500 leading-relaxed font-medium">
            We built PropScale to be invisible. No complex setups, no Zapier headaches. Just a native connection to your CRM.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="flex flex-col h-full">
            <div className="bg-white p-1.5 rounded-[32px] border border-slate-200 shadow-xl shadow-slate-200/40 mb-8 flex-1 group hover:border-blue-300 transition-all duration-500">
               <div className="bg-slate-50 rounded-[26px] p-8 h-full border border-slate-100/50">
                  <div className="flex justify-between items-start mb-12">
                    <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                      <Layout className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-2">Instruction 01</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Connect CRM</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">
                    Authorize your native CRM location with a single click. Our secure bridge establishes a direct data handshake instantly.
                  </p>
                  
                  {/* Mock OAuth Button */}
                  <div className="mt-auto pt-8">
                    <div 
                      onClick={() => window.location.href = 'https://propscale-ai.com/pricing'}
                      className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center gap-3 active:scale-95 transition-all cursor-pointer hover:bg-slate-50"
                    >
                      <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-[10px] font-bold text-white italic">P</div>
                      <span className="text-xs font-black text-slate-700">Authorize PropScale</span>
                    </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col h-full lg:mt-12">
            <div className="bg-white p-1.5 rounded-[32px] border border-slate-200 shadow-xl shadow-slate-200/40 mb-8 flex-1 group hover:border-blue-300 transition-all duration-500">
               <div className="bg-slate-50 rounded-[26px] p-8 h-full border border-slate-100/50">
                  <div className="flex justify-between items-start mb-12">
                    <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                      <Database className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-2">Instruction 02</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Auto-Provision</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">
                    Our engine automatically injects the necessary property intelligence fields (Zestimate, IQ Score) into your dashboard.
                  </p>
                  
                  {/* Mock Log Output */}
                  <div className="mt-auto space-y-2 font-mono text-[10px]">
                    <div className="flex justify-between p-2 bg-slate-900 rounded-lg text-green-400">
                      <span>SYNC: Zestimate</span>
                      <span>DONE</span>
                    </div>
                    <div className="flex justify-between p-2 bg-slate-900/10 rounded-lg text-slate-400 border border-slate-200">
                      <span>SYNC: Permit_IQ</span>
                      <span className="animate-pulse">WORKING</span>
                    </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col h-full lg:mt-24">
            <div className="bg-white p-1.5 rounded-[32px] border border-slate-200 shadow-xl shadow-slate-200/40 mb-8 flex-1 group hover:border-blue-300 transition-all duration-500">
               <div className="bg-slate-50 rounded-[26px] p-8 h-full border border-slate-100/50">
                  <div className="flex justify-between items-start mb-12">
                    <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                      <Mic2 className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-2">Instruction 03</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Identity Clone</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">
                    The AI adopts your specific tone and personality. Every SMS sent is uniquely you—just smarter and faster.
                  </p>
                  
                  {/* Mock Waveform */}
                  <div className="mt-auto flex items-end gap-1 h-8 px-2">
                    {[0.4, 0.7, 0.2, 0.9, 0.5, 1, 0.6, 0.8, 0.3, 0.7, 0.5].map((h, i) => (
                      <div key={i} className="flex-1 bg-blue-600 rounded-full animate-wave" style={{height: `${h*100}%`, animationDelay: `${i*0.1}s`}}></div>
                    ))}
                  </div>
                  <p className="text-center text-[8px] font-black text-blue-600 uppercase tracking-widest mt-4">Core Voice Synced</p>
               </div>
            </div>
          </div>
        </div>

        {/* Floating Success Pill */}
        <div className="mt-24 flex justify-center">
          <div 
            onClick={() => window.location.href = 'https://propscale-ai.com/pricing'}
            className="bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 group cursor-pointer active:scale-95 transition-all"
          >
             <Shield className="w-5 h-5 text-blue-400 fill-blue-400" />
             <span className="font-bold tracking-tight">PropScale Engine: Verified & Deployable</span>
             <div className="h-4 w-px bg-slate-700"></div>
             <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Onboarding;
