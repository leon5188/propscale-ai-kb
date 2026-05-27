import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Sequence } from 'remotion';

export interface PropertyReportProps {
  address: string;
  zestimate: string;
  agentName: string;
  companyName: string;
  permitIntel: string;
  score: string;
}

export const PropertyReport: React.FC<PropertyReportProps> = ({
  address = "816 S Stoneman Ave",
  zestimate = "$852,400",
  agentName = "Sarah",
  companyName = "PropScale Realty",
  permitIntel = "New Roof (2024)",
  score = "94"
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animations
  const titleOp = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = spring({ fps, frame, config: { damping: 12 } });

  const zestimateOp = interpolate(frame, [30, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const zestimateScale = spring({ fps, frame: frame - 30, config: { damping: 10 } });

  const intelOp = interpolate(frame, [60, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const intelY = spring({ fps, frame: frame - 60, config: { damping: 12 } });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f172a', fontFamily: 'sans-serif', color: 'white', display: 'flex', flexDirection: 'column', padding: '60px' }}>
      
      {/* Background Decor */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '600px', height: '600px', backgroundColor: '#2563eb', borderRadius: '50%', filter: 'blur(150px)', opacity: 0.3 }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '600px', height: '600px', backgroundColor: '#4f46e5', borderRadius: '50%', filter: 'blur(150px)', opacity: 0.3 }}></div>

      {/* Header: Agent Branding */}
      <Sequence from={0} durationInFrames={300}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '80px', opacity: titleOp, transform: `translateY(${(1 - Number(titleY)) * 20}px)` }}>
          <div style={{ width: '80px', height: '80px', backgroundColor: '#2563eb', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', fontWeight: 900, fontStyle: 'italic' }}>
            P
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-0.05em' }}>{agentName}</span>
            <span style={{ fontSize: '18px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 800 }}>{companyName}</span>
          </div>
        </div>
      </Sequence>

      {/* Main Content: Address */}
      <Sequence from={15} durationInFrames={300}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontSize: '24px', color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.3em', fontWeight: 900, marginBottom: '20px', opacity: titleOp }}>Property Intelligence Report</p>
          <h1 style={{ fontSize: '72px', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '40px', opacity: titleOp, transform: `translateY(${(1 - Number(titleY)) * 40}px)` }}>
            {address}
          </h1>

          {/* Zestimate Reveal */}
          <div style={{ opacity: zestimateOp, transform: `scale(${Number(zestimateScale)})`, transformOrigin: 'left center', marginBottom: '60px' }}>
            <div style={{ display: 'inline-block', padding: '12px 24px', backgroundColor: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.2)', borderRadius: '100px', fontSize: '20px', fontWeight: 900, letterSpacing: '0.1em', marginBottom: '20px' }}>
              CURRENT ESTIMATED VALUE
            </div>
            <div style={{ fontSize: '120px', fontWeight: 900, color: '#4ade80', letterSpacing: '-0.05em', lineHeight: 1 }}>
              {zestimate}
            </div>
          </div>

          {/* Deep Intel Cards */}
          <div style={{ display: 'flex', gap: '40px', opacity: intelOp, transform: `translateY(${(1 - Number(intelY)) * 40}px)` }}>
            
            <div style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '40px', borderRadius: '40px', backdropFilter: 'blur(20px)' }}>
               <p style={{ fontSize: '18px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 900, marginBottom: '20px' }}>Exa AI Permit Scan</p>
               <p style={{ fontSize: '32px', fontWeight: 800 }}>{permitIntel}</p>
            </div>

            <div style={{ flex: 1, backgroundColor: 'rgba(37,99,235,0.2)', border: '2px solid rgba(37,99,235,0.5)', padding: '40px', borderRadius: '40px', backdropFilter: 'blur(20px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
               <p style={{ fontSize: '16px', color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 900, marginBottom: '10px' }}>PropScale Score</p>
               <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
                 <span style={{ fontSize: '72px', fontWeight: 900, lineHeight: 0.8 }}>{score}</span>
                 <span style={{ fontSize: '24px', color: '#60a5fa', fontWeight: 900 }}>/100</span>
               </div>
            </div>

          </div>

        </div>
      </Sequence>

      {/* Footer CTA */}
      <Sequence from={90} durationInFrames={300}>
        <div style={{ marginTop: 'auto', textAlign: 'center', padding: '40px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p style={{ fontSize: '24px', fontWeight: 800, color: '#cbd5e1' }}>
            Generated exclusively for <span style={{ color: 'white' }}>{agentName}</span>. Call to discuss your custom strategy.
          </p>
        </div>
      </Sequence>

    </AbsoluteFill>
  );
};
