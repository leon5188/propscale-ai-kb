import React from 'react';
import { X, Check } from 'lucide-react';

const ROI = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Manual Agent vs. The PropScale Agent
          </h2>
          <p className="text-xl text-gray-600">
            When you look at the numbers, the choice is clear. Stop paying for lead 
            leakage and start scaling.
          </p>
        </div>

        <div className="max-w-4xl mx-auto overflow-hidden rounded-3xl border border-gray-200 shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-6 text-lg font-bold text-gray-900">Feature</th>
                <th className="p-6 text-lg font-bold text-red-600 text-center">Manual Process</th>
                <th className="p-6 text-lg font-bold text-blue-600 text-center bg-blue-50">PropScale AI</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="p-6 font-medium text-gray-700">Follow-up Time</td>
                <td className="p-6 text-center text-gray-500">13+ Hours / Week</td>
                <td className="p-6 text-center text-blue-700 font-bold bg-blue-50/50">0 Hours (Automated)</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="p-6 font-medium text-gray-700">Follow-up Duration</td>
                <td className="p-6 text-center text-gray-500">2-3 Weeks (Inconsistent)</td>
                <td className="p-6 text-center text-blue-700 font-bold bg-blue-50/50">365 Days (Guaranteed)</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="p-6 font-medium text-gray-700">Lead Leakage</td>
                <td className="p-6 text-center flex justify-center">
                  <div className="inline-flex items-center text-red-500 font-bold uppercase text-xs tracking-widest">
                    High Risk
                  </div>
                </td>
                <td className="p-6 text-center bg-blue-50/50">
                  <div className="inline-flex items-center text-green-600 font-bold uppercase text-xs tracking-widest">
                    Minimal
                  </div>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="p-6 font-medium text-gray-700">Scalability</td>
                <td className="p-6 text-center">
                   <X className="inline w-6 h-6 text-red-400" />
                </td>
                <td className="p-6 text-center bg-blue-50/50">
                   <Check className="inline w-6 h-6 text-green-500" />
                </td>
              </tr>
              <tr>
                <td className="p-6 font-medium text-gray-700">Cost of Operation</td>
                <td className="p-6 text-center text-gray-500">Thousands in Lost Time</td>
                <td className="p-6 text-center text-blue-700 font-bold bg-blue-50/50">Fixed & Scalable</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ROI;
