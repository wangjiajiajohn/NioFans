"use client";
import React, { useEffect, useState } from 'react';
import { useLang } from '@/contexts/LangContext';

// Phase: shown → exiting → done
type Phase = 'shown' | 'exiting' | 'done';

const PARTICLES = [
  { sym: '✦', size: 12, delay: 0,    dur: 2.2, x: '18%',  y: '22%' },
  { sym: '·',  size: 5,  delay: 0.4,  dur: 1.8, x: '80%',  y: '18%' },
  { sym: '✦', size: 9,  delay: 0.7,  dur: 2.5, x: '88%',  y: '55%' },
  { sym: '·',  size: 4,  delay: 1.0,  dur: 2.0, x: '12%',  y: '65%' },
  { sym: '✦', size: 14, delay: 0.2,  dur: 1.9, x: '72%',  y: '80%' },
  { sym: '·',  size: 5,  delay: 0.6,  dur: 2.3, x: '30%',  y: '88%' },
  { sym: '✦', size: 10, delay: 0.9,  dur: 2.1, x: '55%',  y: '14%' },
  { sym: '·',  size: 6,  delay: 0.3,  dur: 2.0, x: '6%',   y: '40%' },
  { sym: '✦', size: 8,  delay: 0.8,  dur: 2.4, x: '92%',  y: '32%' },
];

export default function SplashScreen() {
  const [phase, setPhase] = useState<Phase>('shown');
  const { t } = useLang();

  // Lock body scroll while splash is visible
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    // shown → exiting after 1.8s
    const t1 = setTimeout(() => setPhase('exiting'), 1800);
    // exiting → done after 2.3s (fade-out completes)
    const t2 = setTimeout(() => {
      setPhase('done');
      document.body.style.overflow = '';
    }, 2300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const skip = () => {
    if (phase === 'shown') {
      setPhase('exiting');
      setTimeout(() => {
        setPhase('done');
        document.body.style.overflow = '';
      }, 500);
    }
  };

  if (phase === 'done') return null;

  const opacity = phase === 'exiting' ? 0 : 1;
  const isVisible = phase === 'shown';

  return (
    <div
      onClick={skip}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#060608',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        transition: 'opacity 0.5s ease',
        cursor: 'pointer',
      }}
    >
      {/* ── Nebula glow ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 60% 50% at 50% 55%, rgba(0,163,218,0.2) 0%, transparent 70%)',
        animation: 'bg-breathe 3s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      {/* ── Scattered particles ── */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: p.x, top: p.y,
            fontSize: `${p.size}px`,
            color: p.sym === '✦' ? '#00C3FF' : 'rgba(255,255,255,0.2)',
            display: 'inline-block',
            animation: `float-y ${p.dur}s ease-in-out ${p.delay}s infinite`,
            textShadow: p.sym === '✦' ? '0 0 10px rgba(0,195,255,0.8)' : 'none',
            pointerEvents: 'none',
          }}
        >
          {p.sym}
        </span>
      ))}

      {/* ── Ripple rings ── */}
      {isVisible && [0, 1.0, 2.0].map((delay, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: '120px', height: '120px',
          border: '1px solid rgba(0,195,255,0.4)',
          borderRadius: '50%',
          animation: `ring-expand 3.5s cubic-bezier(0.2,0.6,0.4,1) ${delay}s infinite`,
          pointerEvents: 'none',
        }} />
      ))}

      {/* ── Center content ── */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 32px' }}>

        {/* N I O wordmark */}
        <p style={{
          fontSize: '10px', fontWeight: 700, letterSpacing: '0.4em',
          color: '#00A3DA', marginBottom: '20px',
          animation: isVisible ? 'fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both' : 'none',
        }}>
          N I O
        </p>

        {/* Main text */}
        <h1 style={{
          fontSize: '28px', fontWeight: 200, letterSpacing: '0.14em',
          color: '#FFFFFF', margin: '0 0 24px',
          animation: isVisible
            ? 'fade-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.25s both, breathe 3.5s ease-in-out 1s infinite, glow-pulse-text 3.5s ease-in-out 1s infinite'
            : 'none',
          lineHeight: 1.3,
        }}>
          {t.easterEggText}
        </h1>

        {/* Shimmer divider */}
        <div style={{
          width: '200px', height: '1px', margin: '0 auto 20px',
          background: 'linear-gradient(90deg, transparent 0%, #00C3FF 25%, rgba(255,255,255,0.8) 50%, #00C3FF 75%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: isVisible ? 'shimmer-sweep 2s linear 0.5s infinite' : 'none',
        }} />

        {/* Brand tagline */}
        <p style={{
          fontSize: '9px', fontWeight: 600, letterSpacing: '0.3em',
          color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase',
          animation: isVisible ? 'fade-up 0.5s cubic-bezier(0.22,1,0.36,1) 0.4s both' : 'none',
        }}>
          {t.footerTagline}
        </p>
      </div>

      {/* ── Skip hint ── */}
      <p style={{
        position: 'absolute', bottom: '36px',
        fontSize: '10px', color: 'rgba(255,255,255,0.2)',
        letterSpacing: '0.14em',
        animation: isVisible ? 'fade-in 0.6s ease 1.2s both' : 'none',
      }}>
        点击跳过 · Tap to Skip
      </p>
    </div>
  );
}
