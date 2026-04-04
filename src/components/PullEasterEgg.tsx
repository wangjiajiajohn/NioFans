"use client";
import React, { useEffect, useRef, useState } from 'react';

type Phase = 'idle' | 'pulling' | 'snap-back' | 'shown' | 'dismissing';

const PANEL_H = 210;
const THRESHOLD = 72;
const MAX_DRAG = 120;

// Decorative particles
const PARTICLES = [
  { sym: '✦', size: 11, delay: 0,    dur: 2.2 },
  { sym: '·',  size: 5,  delay: 0.3,  dur: 1.8 },
  { sym: '✦', size: 8,  delay: 0.6,  dur: 2.5 },
  { sym: '·',  size: 4,  delay: 0.9,  dur: 2.0 },
  { sym: '✦', size: 13, delay: 0.15, dur: 1.9 },
  { sym: '·',  size: 5,  delay: 0.5,  dur: 2.3 },
  { sym: '✦', size: 9,  delay: 0.75, dur: 2.1 },
];

export default function PullEasterEgg() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [dragY, setDragY] = useState(0);
  const startYRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Compute translateY
  let ty: number;
  if (phase === 'idle')        ty = -PANEL_H;
  else if (phase === 'pulling') ty = -PANEL_H + Math.min(dragY, MAX_DRAG);
  else if (phase === 'shown')   ty = 0;
  else                          ty = -PANEL_H; // snap-back or dismissing

  const transition =
    phase === 'pulling'    ? 'none' :
    phase === 'snap-back'  ? 'transform 0.4s cubic-bezier(0.22,1,0.36,1)' :
    phase === 'shown'      ? 'transform 0.55s cubic-bezier(0.34,1.56,0.64,1)' :
    phase === 'dismissing' ? 'transform 0.35s cubic-bezier(0.55,0,1,0.45)' :
                             'none';

  const progress = Math.min(dragY / THRESHOLD, 1); // 0–1, used for opacity fade-in

  // ── Auto-show on first page load ──────────────────────────────────
  useEffect(() => {
    const t1 = setTimeout(() => {
      setPhase('shown');
      timerRef.current = setTimeout(() => {
        setPhase('dismissing');
        setTimeout(() => {
          setPhase('idle');
          timerRef.current = null;
        }, 400);
      }, 2800);
    }, 300); // slight delay so page renders first
    return () => clearTimeout(t1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Pull-to-reveal gesture ─────────────────────────────────────────
  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      if (window.scrollY > 5) return;
      if (timerRef.current) return; // egg already showing
      startYRef.current = e.touches[0].clientY;
      setPhase('pulling');
      setDragY(0);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (startYRef.current === null || phase === 'shown') return;
      if (window.scrollY > 5) return;
      const delta = e.touches[0].clientY - startYRef.current;
      if (delta <= 0) { setPhase('idle'); startYRef.current = null; return; }
      e.preventDefault();
      setDragY(delta);
    };

    const onTouchEnd = () => {
      if (startYRef.current === null) return;
      startYRef.current = null;

      if (dragY >= THRESHOLD) {
        setPhase('shown');
        setDragY(0);
        timerRef.current = setTimeout(() => {
          setPhase('dismissing');
          timerRef.current = setTimeout(() => {
            setPhase('idle');
            timerRef.current = null;
          }, 400);
        }, 2800);
      } else {
        setPhase('snap-back');
        setDragY(0);
        setTimeout(() => setPhase('idle'), 400);
      }
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [phase, dragY]);


  if (phase === 'idle') return null;

  const contentOpacity = phase === 'shown' ? 1 : phase === 'dismissing' ? 0 : progress;
  const isFullyShown = phase === 'shown';

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 9999,
        height: `${PANEL_H}px`,
        transform: `translateY(${ty}px)`,
        transition,
        background: '#060608',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    >
      {/* ── Animated nebula background ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 70% 130% at 50% 85%, rgba(0,163,218,1) 0%, transparent 70%)',
        animation: 'bg-breathe 3s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      {/* ── Ripple rings ── */}
      {isFullyShown && [0, 0.8, 1.6].map((delay, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: '80px', height: '80px',
          border: '1px solid rgba(0,195,255,0.5)',
          borderRadius: '50%',
          animation: `ring-expand 3s cubic-bezier(0.2,0.6,0.4,1) ${delay}s infinite`,
          pointerEvents: 'none',
        }} />
      ))}

      {/* ── Top particles ── */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', opacity: contentOpacity, transition: 'opacity 0.3s', position: 'relative', zIndex: 1 }}>
        {PARTICLES.map((p, i) => {
          const anim = i % 3 === 0
            ? `float-y ${p.dur}s ease-in-out ${p.delay}s infinite`
            : i % 3 === 1
            ? `drift-x ${p.dur * 1.3}s ease-in-out ${p.delay}s infinite`
            : `spin-slow ${p.dur * 4}s linear ${p.delay}s infinite`;
          return (
            <span key={i} style={{
              fontSize: `${p.size}px`,
              color: p.sym === '✦' ? '#00C3FF' : 'rgba(255,255,255,0.22)',
              display: 'inline-block',
              animation: anim,
              textShadow: p.sym === '✦' ? '0 0 10px rgba(0,195,255,0.9)' : 'none',
            }}>
              {p.sym}
            </span>
          );
        })}
      </div>

      {/* ── NIO wordmark ── */}
      <p style={{
        fontSize: '8px', fontWeight: 700, letterSpacing: '0.36em',
        color: '#00A3DA', marginBottom: '10px',
        opacity: contentOpacity, transition: 'opacity 0.3s',
        position: 'relative', zIndex: 1,
        animation: isFullyShown ? 'fade-up 0.5s cubic-bezier(0.22,1,0.36,1) 0.1s both' : 'none',
      }}>
        N I O
      </p>

      {/* ── Main text ── */}
      <h2 style={{
        fontSize: '22px', fontWeight: 200, letterSpacing: '0.12em',
        color: '#FFFFFF', margin: '0 0 14px',
        opacity: contentOpacity, transition: 'opacity 0.3s',
        position: 'relative', zIndex: 1,
        animation: isFullyShown
          ? 'fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 0.2s both, breathe 3s ease-in-out 1s infinite, glow-pulse-text 3s ease-in-out 1s infinite'
          : 'none',
      }}>
        蔚来，为你而来！
      </h2>

      {/* ── Shimmer divider ── */}
      <div style={{
        width: `${160 * contentOpacity}px`, height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, #00C3FF 25%, rgba(255,255,255,0.8) 50%, #00C3FF 75%, transparent 100%)',
        backgroundSize: '200% 100%',
        animation: isFullyShown ? 'shimmer-sweep 2s linear 0.5s infinite' : 'none',
        marginBottom: '10px',
        transition: 'width 0.4s ease',
        position: 'relative', zIndex: 1,
      }} />

      {/* ── Brand tagline ── */}
      <p style={{
        fontSize: '8px', fontWeight: 600, letterSpacing: '0.26em',
        color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase',
        opacity: contentOpacity, transition: 'opacity 0.3s',
        position: 'relative', zIndex: 1,
        animation: isFullyShown ? 'fade-up 0.5s cubic-bezier(0.22,1,0.36,1) 0.35s both' : 'none',
      }}>
        Blue Sky Coming
      </p>

      {/* ── Pull indicator ── */}
      {phase === 'pulling' && (
        <div style={{
          position: 'absolute', bottom: 10,
          fontSize: '9px', color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.12em', display: 'flex', alignItems: 'center', gap: '6px',
          zIndex: 1,
        }}>
          <span style={{ fontSize: '10px', display: 'inline-block', transform: `translateY(${progress >= 1 ? 0 : 2}px)`, transition: 'transform 0.2s' }}>
            {progress >= 1 ? '↑' : '↓'}
          </span>
          {progress >= 1 ? '松手解锁' : '继续下拉'}
        </div>
      )}

      {/* ── Bottom particles (mirror, dimmer) ── */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '12px', opacity: contentOpacity * 0.5, transition: 'opacity 0.3s', position: 'relative', zIndex: 1 }}>
        {[...PARTICLES].reverse().map((p, i) => (
          <span key={i} style={{
            fontSize: `${p.size * 0.65}px`,
            color: p.sym === '✦' ? 'rgba(0,195,255,0.45)' : 'rgba(255,255,255,0.12)',
            display: 'inline-block',
            animation: `float-y ${p.dur * 1.2}s ease-in-out ${p.delay + 0.4}s infinite`,
          }}>
            {p.sym}
          </span>
        ))}
      </div>
    </div>
  );
}

