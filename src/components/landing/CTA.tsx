import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-24 bg-blue-900">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 bg-blue-800 rounded-2xl mb-8">
            <Sparkles className="w-8 h-8 text-blue-300" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
            Ready to scale your business, <br />
            not your workload?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Stop the admin hemorrhage today. Access the PropScale AI 12-Month 
            Engine and turn your GoHighLevel sub-account into a non-stop 
            conversion machine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-white text-blue-900 font-bold text-lg rounded-xl hover:bg-blue-50 transition duration-200 flex items-center justify-center shadow-xl">
              Access the PropScale AI Engine Today
              <ArrowRight className="ml-2 w-6 h-6" />
            </button>
          </div>
          <p className="mt-8 text-blue-300 text-sm font-medium">
            Risk-Free Guarantee: Set it up in minutes or your money back.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
