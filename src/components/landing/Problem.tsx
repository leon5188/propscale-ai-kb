import React from 'react';
import { AlertCircle, Timer, TrendingDown } from 'lucide-react';

const Problem = () => {
  const issues = [
    {
      icon: <Timer className="w-6 h-6 text-red-500" />,
      title: "Manual Follow-up Hell",
      description: "Agents spend an average of 13+ hours per week manually texting and emailing leads just to see if they're still interested."
    },
    {
      icon: <AlertCircle className="w-6 h-6 text-red-500" />,
      title: "The 48-Hour Leak",
      description: "If you don't follow up with a lead consistently for 12 months, 70% of them will buy from your competitor who did."
    },
    {
      icon: <TrendingDown className="w-6 h-6 text-red-500" />,
      title: "Admin Hemorrhage",
      description: "Copy-pasting templates and setting CRM reminders isn't 'selling.' It's admin work that kills your hourly rate."
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            The 13 Hours You&apos;ll Never Get Back.
          </h2>
          <p className="text-xl text-gray-600">
            Real estate is a relationship business. So why are you spending half your 
            week acting like a robot?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {issues.map((issue, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition duration-200">
              <div className="mb-4 inline-block p-3 bg-red-50 rounded-xl">
                {issue.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{issue.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {issue.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-white rounded-3xl border-2 border-red-100 border-dashed text-center">
          <p className="text-lg font-medium text-gray-700">
            <span className="text-red-600 font-bold">The Hard Truth:</span> You cannot scale a manual follow-up process. 
            Either you automate, or you accept a ceiling on your income.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Problem;
