"use client";

import React, { Suspense } from 'react';
import { Player } from '@remotion/player';
import { PropertyReport } from '@/remotion/PropertyReport';
import { useSearchParams } from 'next/navigation';

const VideoPlayer = () => {
  const searchParams = useSearchParams();
  
  // Extract URL parameters to dynamically customize the video
  const address = searchParams.get('address') || '816 S Stoneman Ave';
  const zestimate = searchParams.get('zestimate') || '$852,400';
  const agentName = searchParams.get('agent') || 'Sarah';
  const companyName = searchParams.get('company') || 'PropScale Realty';
  const permitIntel = searchParams.get('intel') || 'New Roof (2024)';
  const score = searchParams.get('score') || '94';

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 md:p-8 font-sans">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-white tracking-tighter mb-2">
          Your Property Intelligence Report
        </h1>
        <p className="text-slate-400 font-medium">
          Generated in real-time by PropScale AI for {agentName}.
        </p>
      </div>

      <div className="w-full max-w-[400px] rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(37,99,235,0.3)] border-4 border-slate-800">
        <Player
          component={PropertyReport}
          inputProps={{
            address,
            zestimate,
            agentName,
            companyName,
            permitIntel,
            score
          }}
          durationInFrames={300}
          compositionWidth={1080}
          compositionHeight={1920}
          fps={30}
          style={{
            width: '100%',
            height: 'auto',
            aspectRatio: '1080 / 1920',
          }}
          controls
          autoPlay
          loop
        />
      </div>

      <div className="mt-12 text-center">
        <button 
          onClick={() => window.location.href = 'https://propscale-ai.com/pricing'}
          className="bg-blue-600 hover:bg-blue-500 text-white font-black px-8 py-4 rounded-2xl shadow-xl transition-all active:scale-95"
        >
          Want to offer this to your clients? Get PropScale
        </button>
      </div>
    </div>
  );
};

export default function DynamicVideoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading Intelligence Engine...</div>}>
      <VideoPlayer />
    </Suspense>
  );
}
