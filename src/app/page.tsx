import React from 'react';
import Hero from '@/components/landing/Hero';
import Problem from '@/components/landing/Problem';
import Solution from '@/components/landing/Solution';
import Tech from '@/components/landing/Tech';
import ROI from '@/components/landing/ROI';
import CTA from '@/components/landing/CTA';
import Onboarding from '@/components/landing/Onboarding';

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
    <div className="container mx-auto px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">P</div>
        <span className="text-xl font-bold text-gray-900 tracking-tight">PropScale AI</span>
      </div>
      <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-gray-600">
        <a href="#how-it-works" className="hover:text-blue-600 transition">The Setup</a>
        <a href="#problem" className="hover:text-blue-600 transition">The Problem</a>
        <a href="#solution" className="hover:text-blue-600 transition">The Superpowers</a>
      </div>
      <button className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition text-sm">
        Start Now
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
        © 2026 PropScale AI. Built for high-performance real estate agencies.
      </p>
    </div>
  </footer>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <div id="how-it-works">
          <Onboarding />
        </div>
        <div id="problem">
          <Problem />
        </div>
        <div id="solution">
          <Solution />
        </div>
        <div id="tech">
          <Tech />
        </div>
        <ROI />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
