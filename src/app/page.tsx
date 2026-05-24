import React from 'react';
import Hero from '@/components/landing/Hero';
import Problem from '@/components/landing/Problem';
import Solution from '@/components/landing/Solution';
import Tech from '@/components/landing/Tech';
import ROI from '@/components/landing/ROI';
import CTA from '@/components/landing/CTA';

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
    <div className="container mx-auto px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">P</div>
        <span className="text-xl font-bold text-gray-900 tracking-tight">PropScale AI</span>
      </div>
      <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-gray-600">
        <a href="#problem" className="hover:text-blue-600 transition">The Problem</a>
        <a href="#solution" className="hover:text-blue-600 transition">The Engine</a>
        <a href="#how-it-works" className="hover:text-blue-600 transition">How it Works</a>
      </div>
      <button className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition text-sm">
        Get Started
      </button>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="py-12 bg-gray-50 border-t border-gray-200">
    <div className="container mx-auto px-6 text-center">
      <div className="flex items-center justify-center space-x-2 mb-8">
        <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-xs">P</div>
        <span className="text-lg font-bold text-gray-900 tracking-tight">PropScale AI</span>
      </div>
      <p className="text-gray-500 text-sm">
        © 2026 PropScale AI. Specifically built for GoHighLevel users.
      </p>
      <div className="mt-4 flex justify-center space-x-6 text-xs font-semibold text-gray-400">
        <a href="#" className="hover:text-gray-600">Privacy Policy</a>
        <a href="#" className="hover:text-gray-600">Terms of Service</a>
        <a href="#" className="hover:text-gray-600">Support</a>
      </div>
    </div>
  </footer>
);

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <div id="problem">
          <Problem />
        </div>
        <div id="solution">
          <Solution />
        </div>
        <div id="how-it-works">
          <Tech />
        </div>
        <ROI />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
