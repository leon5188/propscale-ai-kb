import React from 'react';
import { MessageSquare, Mail, Calendar, ShieldCheck } from 'lucide-react';

const Solution = () => {
  const features = [
    {
      title: "365-Day Nurture Engine",
      description: "Our scripts don't quit. We cover the entire first year of a lead's journey with perfectly timed SMS and Email touchpoints.",
      icon: <Calendar className="w-5 h-5" />
    },
    {
      title: "Proven Conversion Scripts",
      description: "Hand-crafted English templates designed to sound human, build trust, and spark conversations—not just blast noise.",
      icon: <MessageSquare className="w-5 h-5" />
    },
    {
      title: "Multi-Channel Domination",
      description: "Seamlessly switch between SMS and Email to stay top-of-mind wherever your leads prefer to communicate.",
      icon: <Mail className="w-5 h-5" />
    },
    {
      title: "Zero Admin Required",
      description: "Once connected to GoHighLevel, the system runs itself. You only step in when a lead raises their hand.",
      icon: <ShieldCheck className="w-5 h-5" />
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap items-center -mx-4">
          <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="bg-blue-900 p-8 text-white">
                <div className="flex items-center space-x-2 mb-8">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs font-mono opacity-50 ml-2">propscale-ai-engine.config</span>
                </div>
                <div className="space-y-6 font-mono text-sm">
                  <div className="text-blue-300">{"//"} Day 1: Instant Outreach</div>
                  <div className="text-white">trigger: &quot;New Lead&quot; -{">"} send_sms(&quot;Thanks for looking!&quot;)</div>
                  
                  <div className="text-blue-300">{"//"} Day 45: Long-term Nurture</div>
                  <div className="text-white">trigger: &quot;No Response&quot; -{">"} send_email(&quot;Market update for you...&quot;)</div>
                  
                  <div className="text-blue-300">{"//"} Day 180: The &apos;Still Interested?&apos; Check</div>
                  <div className="text-white">trigger: &quot;6 Months Idle&quot; -{">"} send_sms(&quot;Still thinking of moving?&quot;)</div>
                  
                  <div className="flex items-center text-green-400">
                    <span className="mr-2">●</span> Active: 365 Days of Automation
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 px-4">
            <div className="lg:pl-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Your New Automated Assistant: <br />
                <span className="text-blue-600">PropScale AI.</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We&apos;ve built the ultimate 12-month nurture engine inside GoHighLevel. 
                It&apos;s not just a set of scripts; it&apos;s a conversion machine that never sleeps, 
                never forgets, and never gets tired of following up.
              </p>
              
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1 p-1 bg-blue-50 text-blue-600 rounded">
                      {feature.icon}
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold text-gray-900">{feature.title}</h4>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
