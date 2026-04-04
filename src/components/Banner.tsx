"use client";
import React from 'react';
import { ES9_BANNER } from '@/constants/nioData';

export default function Banner() {
  return (
    <section className="relative w-full overflow-hidden" style={{ aspectRatio: '1/1' }}>
      {/* Full-bleed image */}
      <img
        src={ES9_BANNER.image}
        alt={ES9_BANNER.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Multi-stop dark gradient — ensures text always readable */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.65) 75%, rgba(0,0,0,0.88) 100%)'
        }}
      />

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 pt-6 anim-fade-in"
        style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, transparent 100%)' }}>
        <span style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.2em',
          color: 'rgba(255,255,255,0.85)',
          textTransform: 'uppercase',
          paddingBottom: '16px'
        }}>
          NIO FANS
        </span>
        <span style={{
          background: 'rgba(0,163,218,0.35)',
          color: '#fff',
          fontSize: '9px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          padding: '4px 10px',
          borderRadius: '100px',
          marginBottom: '16px'
        }}>
          LIVE DATA
        </span>
      </div>

      {/* Bottom copy — full white, always legible */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 anim-fade-up delay-2">
        <p style={{
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)',
          marginBottom: '6px'
        }}>
          NIO TECHNOLOGY · {ES9_BANNER.date}
        </p>
        <h1 style={{
          fontSize: '36px',
          fontWeight: 300,
          letterSpacing: '-0.03em',
          lineHeight: 1,
          color: '#FFFFFF',
          marginBottom: '8px'
        }}>
          {ES9_BANNER.title}
        </h1>
        <p style={{
          fontSize: '12px',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.65)',
          letterSpacing: '0.04em'
        }}>
          {ES9_BANNER.subtitle}
        </p>

        {/* Upcoming event badge */}
        <div style={{ marginTop: '14px' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(0,163,218,0.9)',
            color: '#fff',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '5px 12px',
            borderRadius: '100px'
          }}>
            <span style={{
              width: '5px', height: '5px',
              background: '#fff',
              borderRadius: '50%',
              display: 'inline-block',
              animation: 'pulse-glow 2s ease-in-out infinite'
            }} />
            发布会倒计时 · 即将揭晓
          </span>
        </div>
      </div>
    </section>
  );
}
