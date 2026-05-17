'use client';

import { useState } from 'react';
import { Bot, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

export default function OnboardingPortal() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    agentName: '',
    brokerageName: '',
    cityMarket: '',
    calendlyLink: '',
    localKnowledge: '',
    objectionLogic: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
      } else {
        setErrorMsg(data.error || "Failed to configure workspace.");
      }
    } catch (error) {
      setErrorMsg("A network error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Workspace Ready!</h2>
          <p className="text-gray-600 mb-8">
            Your PropScale AI agent has been localized to {formData.cityMarket}. 
            Your 12-month follow-up scripts have been updated with your name ({formData.agentName}).
          </p>
          <a href="/" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700">
            Go to Dashboard <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
            <Bot className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">Welcome to PropScale AI</h1>
          <p className="mt-4 text-lg text-gray-600">
            Let's configure your "Black Box" CRM. Fill out these details and our system will automatically localize your AI assistant and 12-month follow-up scripts in seconds.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 sm:p-10">
            
            {errorMsg && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                <p className="text-red-700">{errorMsg}</p>
              </div>
            )}

            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              {/* Agent Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Agent Name / Team Name</label>
                <div className="mt-1">
                  <input required type="text" name="agentName" value={formData.agentName} onChange={handleChange} className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md border" placeholder="e.g. Ryan Serhant" />
                </div>
              </div>

              {/* Brokerage */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Brokerage Name</label>
                <div className="mt-1">
                  <input required type="text" name="brokerageName" value={formData.brokerageName} onChange={handleChange} className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md border" placeholder="e.g. Compass" />
                </div>
              </div>

              {/* City Market */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Primary City / Market</label>
                <div className="mt-1">
                  <input required type="text" name="cityMarket" value={formData.cityMarket} onChange={handleChange} className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md border" placeholder="e.g. Alhambra & Pasadena" />
                </div>
              </div>

              {/* Calendly */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Booking Link (Calendly)</label>
                <div className="mt-1">
                  <input type="url" name="calendlyLink" value={formData.calendlyLink} onChange={handleChange} className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md border" placeholder="https://calendly.com/your-link" />
                </div>
              </div>

              {/* Local Knowledge */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Local Knowledge (Train your AI)
                  <span className="block text-xs text-gray-500 font-normal mt-1">What specific neighborhoods, schools, or trends should your AI mention to sound like a local?</span>
                </label>
                <div className="mt-1">
                  <textarea rows={3} name="localKnowledge" value={formData.localKnowledge} onChange={handleChange} className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border border-gray-300 rounded-md" placeholder="e.g. Mention that San Marino schools are top-rated, and South Pasadena has historic craftsman homes." />
                </div>
              </div>

              {/* Objection Logic */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Objection Handling (Train your AI)
                  <span className="block text-xs text-gray-500 font-normal mt-1">How do you want the AI to handle objections about high interest rates or high prices?</span>
                </label>
                <div className="mt-1">
                  <textarea rows={3} name="objectionLogic" value={formData.objectionLogic} onChange={handleChange} className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border border-gray-300 rounded-md" placeholder="e.g. Offer our 2-1 buydown program, and emphasize that marrying the house and dating the rate is the best strategy." />
                </div>
              </div>
            </div>

            <div className="mt-10">
              <button type="submit" disabled={isSubmitting} className="w-full inline-flex items-center justify-center px-6 py-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                    Configuring CRM Workspace...
                  </>
                ) : (
                  'Initialize My AI Workspace'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
