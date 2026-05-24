import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-white pt-20 pb-32 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-wrap items-center -mx-4">
          <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
            <div className="max-w-2xl">
              <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-blue-50 text-blue-600 font-medium text-sm">
                <Clock className="w-4 h-4 mr-2" />
                <span>Reclaim 13+ Hours Every Week</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Stop Losing Deals to <span className="text-blue-600">"Admin Hemorrhage."</span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                You became an agent to close deals, not to manually text leads for a year. 
                PropScale AI is the plug-and-play GoHighLevel engine that automates your 
                pipeline for 365 days.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-200">
                  Get Your Time Back
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button className="flex items-center justify-center px-8 py-4 bg-white text-gray-900 border border-gray-200 font-bold rounded-lg hover:bg-gray-50 transition duration-200">
                  See the Nurture Flow
                </button>
              </div>
              
              {/* Compliance Consent Section */}
              <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-start mb-2">
                  <input 
                    type="checkbox" 
                    id="consent" 
                    className="mt-1 mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    required
                  />
                  <label htmlFor="consent" className="text-xs text-gray-500 leading-normal">
                    By providing your phone number, you expressly consent to receive marketing text messages and phone calls from PropScale Realty, including those made via automated technology, pre-recorded messages, or an AI voice. Consent is not a condition of purchase. Msg & data rates may apply. Reply STOP to opt-out.
                  </label>
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-500 italic">
                *Specifically designed for GoHighLevel power users.
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-4">
            <div className="relative">
              <div className="absolute top-0 left-0 w-full h-full bg-blue-100 rounded-3xl transform -rotate-3 scale-105 opacity-50"></div>
              <div className="relative bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
                {/* Mockup Placeholder */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl border border-blue-100 animate-pulse">
                    <div className="w-10 h-10 bg-blue-200 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-blue-200 rounded w-3/4"></div>
                      <div className="h-3 bg-blue-100 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Automated SMS - Day 184</div>
                    <p className="text-sm text-gray-600 italic">"Hey [Name], just checking in on your home search. Still looking in the area?"</p>
                  </div>
                  <div className="flex justify-end text-xs text-blue-500 font-bold">Response: "Yes, actually! Let's talk tomorrow."</div>
                  <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-green-700">Lead Reactivated</span>
                      <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">Action Required</span>
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
