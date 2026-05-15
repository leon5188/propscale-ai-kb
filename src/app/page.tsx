import Chatbot from '@/components/Chatbot';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-24">
      <div className="max-w-3xl text-center">
        <h1 className="text-6xl font-bold text-blue-900 mb-6">
          PropScale AI
        </h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          The AI-powered CRM and automation platform designed specifically for real estate agents. 
          Maximize your productivity and never miss a lead again.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Get Started
          </button>
          <button className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Learn More
          </button>
        </div>
      </div>
      
      <Chatbot />
    </main>
  );
}
