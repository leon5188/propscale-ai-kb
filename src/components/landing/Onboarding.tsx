import React from 'react';
import { MousePointerClick, Zap, UserCheck, ArrowRight, Database, Mic2, CheckCircle2 } from 'lucide-react';

const Onboarding = () => {
  return (
    <section className="py-32 bg-slate-50 overflow-hidden" id="how-it-works">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            The 3-Minute <span className="text-blue-600">Profit Loop.</span>
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Stop wasting months on complex automation. We&apos;ve eliminated the setup so you can start closing today.
          </p>
        </div>

        <div className="space-y-24">
          {/* Step 1: Connect */}
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              <div className="relative group">
                <div className="absolute -inset-4 bg-blue-100 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                {/* Mock UI Card */}
                <div className="relative bg-white p-8 rounded-3xl border border-slate-200 shadow-2xl">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Platform Integration</span>
                  </div>
                  <div className="py-12 flex flex-col items-center justify-center">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-black px-10 py-5 rounded-2xl flex items-center gap-4 shadow-xl shadow-blue-200 transition-all active:scale-95">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center font-black text-xl italic tracking-tighter">P</div>
                      Connect Your PropScale Account
                    </button>
                    <p className="mt-6 text-sm text-slate-400 font-medium">Secure Native Connection • 1-Click Setup</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-bold text-xs uppercase tracking-widest">Step 1</div>
              <h3 className="text-4xl font-black text-slate-900">Seamless Authentication.</h3>
              <p className="text-xl text-slate-600 leading-relaxed italic">
                &quot;Just click the blue button. That&apos;s it. Your PropScale account and CRM data sync instantly without lifting a finger.&quot;
              </p>
              <ul className="space-y-4">
                {["Direct CRM Sync", "No Third-Party Subs", "Instant Data Handshake"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-bold text-slate-700">
                    <CheckCircle2 className="text-blue-600 w-5 h-5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Step 2: Auto-Provision */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            <div className="w-full lg:w-1/2">
              <div className="relative group">
                <div className="absolute -inset-4 bg-amber-100 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                {/* Mock UI Card */}
                <div className="relative bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
                  <div className="flex items-center justify-between mb-8 text-white/50 font-mono text-xs">
                    <span>PROPSCALE_INIT.LOG</span>
                    <span className="animate-pulse">● READY</span>
                  </div>
                  <div className="space-y-4 font-mono text-sm leading-tight">
                    <div className="text-blue-400 opacity-60 flex justify-between">
                      <span>{">"} SYNC_FIELD: Zestimate</span>
                      <span className="text-green-400">SYNCED</span>
                    </div>
                    <div className="text-blue-400 opacity-80 flex justify-between">
                      <span>{">"} SYNC_FIELD: PropScale Score</span>
                      <span className="text-green-400">SYNCED</span>
                    </div>
                    <div className="text-blue-400 flex justify-between">
                      <span>{">"} SYNC_FIELD: Intelligence</span>
                      <span className="animate-pulse text-amber-400">INITIALIZING...</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full mt-8 overflow-hidden">
                      <div className="h-full bg-blue-600 w-3/4 animate-progress"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 p-4 opacity-10">
                    <Database className="w-32 h-32 text-white" />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-700 rounded-full font-bold text-xs uppercase tracking-widest">Step 2</div>
              <h3 className="text-4xl font-black text-slate-900">Automated Data Mapping.</h3>
              <p className="text-xl text-slate-600 leading-relaxed italic">
                &quot;The moment you connect, our engine builds the custom property insights directly into your dashboard. Zero manual data entry.&quot;
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                {["Live Valuations", "Property Specs", "Permit Tracking", "Local IQ"].map((item, i) => (
                  <div key={i} className="p-4 bg-white rounded-2xl border border-slate-200 font-black text-slate-700 text-center shadow-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step 3: Clone & Live */}
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              <div className="relative group">
                <div className="absolute -inset-4 bg-green-100 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                {/* Mock UI Card */}
                <div className="relative bg-white p-8 rounded-3xl border border-slate-200 shadow-2xl">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-100">
                      <Mic2 className="text-white w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900">Brand Voice Engine</h4>
                      <p className="text-xs font-bold text-slate-400 uppercase">Configuring Your Identity</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-end gap-1 h-12">
                      {[0.4, 0.7, 0.2, 0.9, 0.5, 1, 0.6, 0.8, 0.3, 0.7, 0.5, 0.9, 0.4].map((h, i) => (
                        <div key={i} className="flex-1 bg-blue-600 rounded-t-full animate-wave" style={{height: `${h*100}%`, animationDelay: `${i*0.1}s`}}></div>
                      ))}
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-sm font-medium text-slate-600 italic">
                        &quot;I just finished the deep scan for your property... talk tomorrow?&quot;
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <div className="px-6 py-2 bg-green-100 text-green-700 rounded-full text-sm font-black flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full animate-ping"></div>
                        AGENT CORE ACTIVE
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full font-bold text-xs uppercase tracking-widest">Step 3</div>
              <h3 className="text-4xl font-black text-slate-900">Identity Injection.</h3>
              <p className="text-xl text-slate-600 leading-relaxed italic">
                &quot;The AI adopts your identity and starts engaging leads as your executive assistant. You focus on the showing, we focus on the booking.&quot;
              </p>
              <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-black px-10 py-5 rounded-2xl flex items-center gap-4 transition-all active:scale-95 group">
                Apply for Exclusivity in Your City
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Onboarding;
