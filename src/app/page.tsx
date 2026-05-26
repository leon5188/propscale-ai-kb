import React from 'react';
import Hero from '@/components/landing/Hero';
import Problem from '@/components/landing/Problem';
import Solution from '@/components/landing/Solution';
import Tech from '@/components/landing/Tech';
import ROI from '@/components/landing/ROI';
import CTA from '@/components/landing/CTA';
import Onboarding from '@/components/landing/Onboarding';

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
    <div className="container mx-auto px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold tracking-tighter italic">P</div>
        <span className="text-xl font-black text-slate-900 tracking-tighter">PropScale AI</span>
      </div>
      <div className="hidden md:flex items-center space-x-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
        <a href="#how-it-works" className="hover:text-blue-600 transition">Setup</a>
        <a href="#solution" className="hover:text-blue-600 transition">Superpowers</a>
        <a href="#tech" className="hover:text-blue-600 transition">Platform</a>
      </div>
      <button 
        onClick={() => window.location.href = 'https://propscale-ai.com/pricing'}
        className="px-6 py-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-black transition text-xs shadow-xl shadow-slate-900/10"
      >
        Deploy Now
      </button>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="py-20 bg-white border-t border-slate-100">
    <div className="container mx-auto px-6 text-center">
      <div className="flex items-center justify-center space-x-2 mb-8">
        <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-xs italic tracking-tighter">P</div>
        <span className="text-lg font-black text-slate-900 tracking-tighter">PropScale AI</span>
      </div>
      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
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
        <Onboarding />
        <Solution />
        <Problem />
        <Tech />
        <ROI />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
