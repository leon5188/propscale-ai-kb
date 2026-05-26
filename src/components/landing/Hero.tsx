"use client";

import React, { useState, useEffect } from 'react';
import { ArrowRight, Zap, Search, MessageSquare, ShieldCheck, Database } from 'lucide-react';

const Hero = () => {
  const [chatStep, setChatStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setChatStep((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-white pt-32 pb-24 overflow-hidden border-b border-slate-100">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', size: '20px 20px' }}></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center px-3 py-1 mb-8 rounded-full bg-slate-100 border border-slate-200 text-slate-600 font-bold text-[10px] uppercase tracking-[0.2em]">
            <Zap className="w-3 h-3 mr-2 fill-slate-400 text-slate-400" />
            The Modern Real Estate Utility
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-8 leading-[0.9] tracking-tighter">
            AI Agents for Every <br />
            <span className="text-blue-600">Property Inquiry.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
            Deploy custom AI agents for your listings in minutes. 
            Native Zillow penetration and 100% brand voice cloning built-in.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = 'https://propscale-ai.com/pricing'}
              className="flex items-center justify-center px-10 py-5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-black transition duration-300 shadow-2xl shadow-slate-900/20 active:scale-95 group"
            >
              Deploy Your Engine
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => window.location.href = 'https://propscale-ai.com/pricing'}
              className="flex items-center justify-center px-10 py-5 bg-white text-slate-600 border border-slate-200 font-bold rounded-2xl hover:bg-slate-50 transition duration-300 active:scale-95"
            >
              Watch Demo
            </button>
          </div>
        </div>

        {/* Logo Marquee / Trusted By */}
        <div className="mb-24">
          <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Powering Conversations Across</p>
          <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
             <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">Zillow</div>
             <div className="flex items-center gap-2 font-black text-2xl tracking-tighter italic text-blue-600">MLS</div>
             <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">Redfin</div>
             <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">Realtor.com</div>
          </div>
        </div>

        {/* Centered UI Mockup */}
        <div className="relative max-w-5xl mx-auto group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-[40px] blur-2xl opacity-10 group-hover:opacity-20 transition duration-1000"></div>
          
          <div className="relative bg-white rounded-[40px] border border-slate-200 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] overflow-hidden">
            {/* Window Header */}
            <div className="bg-slate-50 px-8 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-slate-200 rounded-full"></div>
                <div className="w-3 h-3 bg-slate-200 rounded-full"></div>
                <div className="w-3 h-3 bg-slate-200 rounded-full"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Assistant Active: 816 S Stoneman Ave</span>
              </div>
              <div className="w-12"></div>
            </div>

            <div className="flex flex-col lg:flex-row min-h-[500px]">
              {/* Left: Input/Status */}
              <div className="w-full lg:w-1/3 border-r border-slate-100 p-8 bg-slate-50/50">
                 <div className="space-y-8">
                   <div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Identity Core</p>
                     <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-black text-white italic">P</div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 leading-none">PropScale V2</p>
                          <p className="text-[10px] text-slate-400 font-medium mt-1">Cloning Agent: Sarah</p>
                        </div>
                     </div>
                   </div>

                   <div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Data Bridges</p>
                     <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs font-bold p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                          <span className="flex items-center gap-2"><Database className="w-3 h-3 text-slate-400" /> Zillow</span>
                          <span className="text-green-500">Live</span>
                        </div>
                        <div className="flex items-center justify-between text-xs font-bold p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                          <span className="flex items-center gap-2"><Search className="w-3 h-3 text-slate-400" /> Exa Search</span>
                          <span className="text-green-500">Live</span>
                        </div>
                     </div>
                   </div>
                   
                   <div className="p-4 bg-blue-600 rounded-2xl text-white shadow-xl shadow-blue-200">
                     <p className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-2">Live Insight</p>
                     <p className="text-xs font-bold leading-relaxed">
                        &quot;Lead is asking about valuation. Pulling real-time comparables and 2024 permit data.&quot;
                     </p>
                   </div>
                 </div>
              </div>

              {/* Right: Message Simulation */}
              <div className="flex-1 p-8 bg-white relative">
                <div className="space-y-8 max-w-lg mx-auto">
                  {/* Message 1 */}
                  <div className={`transition-all duration-700 ${chatStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="bg-slate-100 text-slate-700 p-5 rounded-3xl rounded-tl-none font-medium text-sm leading-relaxed">
                      Hey! Is 816 S Stoneman Ave still available? Also, do you know what the current market value is?
                    </div>
                  </div>

                  {/* Typing Indicator */}
                  <div className={`flex items-center gap-2 transition-all duration-300 ${chatStep === 2 ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Agent Thinking...</span>
                  </div>

                  {/* AI Response */}
                  <div className={`transition-all duration-700 delay-300 ${chatStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="bg-blue-600 text-white p-5 rounded-3xl rounded-tr-none font-bold text-sm leading-relaxed shadow-xl shadow-blue-200">
                      Hi there! It sure is. I just scanned the local market—Zillow estimates it at $852k, and I noticed the new roof from 2024. Would you like Sarah to give you a more precise valuation tomorrow?
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                       <MessageSquare className="w-3 h-3" /> SMS Delivered • 2s response
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
