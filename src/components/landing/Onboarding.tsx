import React from 'react';
import { MousePointerClick, Zap, UserCheck, ArrowRight } from 'lucide-react';

const Onboarding = () => {
  const steps = [
    {
      icon: <MousePointerClick className="w-8 h-8 text-blue-500" />,
      title: "1-Click Connect",
      description: "Securely link your GoHighLevel account via OAuth. No API keys or coding required."
    },
    {
      icon: <Zap className="w-8 h-8 text-amber-500" />,
      title: "Auto-Provisioning",
      description: "Our engine instantly creates Zestimate, SqFt, and PropScale Score fields in your CRM."
    },
    {
      icon: <UserCheck className="w-8 h-8 text-green-500" />,
      title: "Clone & Go Live",
      description: "Provide a writing sample. We clone your voice. Your AI starts qualifying leads immediately."
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            From Setup to Profit in <span className="text-blue-600">3 Minutes.</span>
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Forget complex automation tools. PropScale AI is a zero-configuration engine designed for agents who value time over technical headaches.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center group hover:border-blue-200 transition-all duration-300">
                <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                  {step.icon}
                </div>
                <div className="mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-600 text-white text-xs font-black rounded-full flex items-center justify-center">
                    {index + 1}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{step.title}</h3>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 p-8 bg-slate-900 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center animate-pulse">
              <Zap className="text-white fill-current" />
            </div>
            <p className="text-white font-bold text-lg md:text-xl">
              Start capturing the 5-minute lead window today.
            </p>
          </div>
          <button className="bg-white hover:bg-slate-100 text-slate-900 font-black px-8 py-4 rounded-xl flex items-center gap-2 transition-all active:scale-95 group whitespace-nowrap">
            Launch Your Engine
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Onboarding;
