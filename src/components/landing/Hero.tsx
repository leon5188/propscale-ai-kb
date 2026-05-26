import React, { useState, useEffect } from 'react';
import { ArrowRight, Zap, ShieldCheck, TrendingUp, Search } from 'lucide-react';

const Hero = () => {
  const [chatStep, setChatStep] = useState(0);

  // Chat animation simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setChatStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-slate-900 pt-32 pb-40 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-wrap items-center -mx-4">
          <div className="w-full lg:w-3/5 px-4 mb-16 lg:mb-0">
            <div className="max-w-3xl">
              <div className="inline-flex items-center px-4 py-2 mb-8 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-xs uppercase tracking-widest">
                <Zap className="w-4 h-4 mr-2 fill-current" />
                Real-Time Property & Market Intelligence Built-In
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-white mb-8 leading-tight tracking-tight">
                Don&apos;t Let Leads Die in the <span className="text-blue-500">First 5 Minutes.</span>
              </h1>
              <p className="text-xl text-slate-400 mb-12 leading-relaxed max-w-2xl">
                The only B2B AI assistant that runs background checks on properties instantly. 
                <span className="text-white font-semibold"> 100% Brand Voice cloning. Native CRM integration.</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <button className="flex items-center justify-center px-10 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition duration-300 shadow-xl shadow-blue-600/20 active:scale-95 group">
                  Book Your Tech Audit
                  <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-4 px-6 text-slate-500 border-l border-slate-800 ml-0 sm:ml-4">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white">
                        {String.fromCharCode(64+i)}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm font-bold tracking-tight uppercase">Trusted by Top Agencies</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/5 px-4">
            <div className="relative">
              {/* Animated Chat Mockup */}
              <div className="relative bg-slate-800 rounded-[32px] p-6 border border-slate-700 shadow-2xl">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-700/50">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-black text-white tracking-tighter">P</div>
                  <div>
                    <p className="text-sm font-black text-white leading-none">PropScale Assistant</p>
                    <p className="text-[10px] text-green-400 font-bold uppercase tracking-widest mt-1 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                      Market Core Active
                    </p>
                  </div>
                </div>

                <div className="space-y-6 min-h-[300px]">
                  {/* Lead Message */}
                  <div className={`flex flex-col items-start transition-all duration-500 ${chatStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="bg-slate-700 text-white p-4 rounded-2xl rounded-tl-none max-w-[80%] text-sm font-medium">
                      Hey, how much is my house at 816 S Stoneman Ave worth?
                    </div>
                  </div>

                  {/* AI Processing */}
                  <div className={`flex items-center gap-2 transition-all duration-300 ${chatStep === 2 ? 'opacity-100' : 'opacity-0'}`}>
                    <Search className="w-4 h-4 text-blue-400 animate-spin" />
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Scanning Property Intelligence...</span>
                  </div>

                  {/* AI Response */}
                  <div className={`flex flex-col items-end transition-all duration-500 delay-300 ${chatStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="bg-blue-600 text-white p-4 rounded-2xl rounded-tr-none max-w-[85%] text-sm font-bold shadow-lg">
                      I just pulled the data! Market estimates it at $852,000. I also noticed you had a roof permit in 2024—nice upgrade! Do you want a professional valuation?
                    </div>
                    <p className="text-[10px] text-slate-500 mt-2 font-bold uppercase">Sent via PropScale • Instant</p>
                  </div>
                </div>
              </div>

              {/* Data Badge Floating */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 animate-bounce">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="text-green-600 w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">PropScale Score</p>
                    <p className="text-xl font-black text-slate-900 leading-none">94/100</p>
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
