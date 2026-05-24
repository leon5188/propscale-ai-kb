import React from 'react';
import { Settings, Zap, PlayCircle, Layers } from 'lucide-react';

const Tech = () => {
  const steps = [
    {
      icon: <Layers className="w-8 h-8 text-blue-600" />,
      title: "1. Connect GHL",
      description: "Import our optimized Snapshot into your GoHighLevel sub-account in seconds."
    },
    {
      icon: <Settings className="w-8 h-8 text-blue-600" />,
      title: "2. Set Custom Values",
      description: "Fill in your name, phone, and booking link. Our system injects them into every script automatically."
    },
    {
      icon: <PlayCircle className="w-8 h-8 text-blue-600" />,
      title: "3. Go Live",
      description: "Activate your workflows and watch your 'Admin Hemorrhage' stop instantly."
    }
  ];

  return (
    <section className="py-24 bg-gray-50 border-y border-gray-200">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-bold mb-6">
            <Zap className="w-4 h-4 mr-2" />
            NO TECH GENIUS REQUIRED
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Plug-and-Play Power with GoHighLevel.
          </h2>
          <p className="text-xl text-gray-600">
            We've done the heavy lifting. You just fill in the blanks and let the 
            engine run. PropScale AI is built to be the most friction-less automation 
            you've ever used.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {index < 2 && (
                <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gray-200 z-0 -ml-6"></div>
              )}
              <div className="relative z-10 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm group-hover:shadow-lg transition duration-300 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-6 group-hover:scale-110 transition duration-300">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                  User
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 font-medium">
              Join 500+ agents automating their business this month.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tech;
