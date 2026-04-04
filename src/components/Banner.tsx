"use client";
import React from 'react';
import Image from 'next/image';
import { ES9_BANNER } from '@/constants/nioData';
import { getAssetPath } from '@/utils/paths';

export default function Banner() {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1 / 1',
        background: '#060608',
        overflow: 'hidden',
      }}
    >
      {/* Car image */}
      <Image
        src={getAssetPath(ES9_BANNER.image)}
        alt={ES9_BANNER.title}
        fill
        priority
        style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
      />


      {/* Cinematic gradient — dark at top & bottom, transparent in middle */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(6,6,8,0.72) 0%, rgba(6,6,8,0) 30%, rgba(6,6,8,0) 52%, rgba(6,6,8,0.88) 100%)',
        }}
      />

      {/* ── Top bar ── */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          padding: '20px 20px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <div>
          <p
            style={{
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.35)',
              lineHeight: 1,
            }}
          >
            NIO FANS
          </p>
          <p
            style={{
              fontSize: '8px',
              fontWeight: 400,
              letterSpacing: '0.14em',
              color: 'rgba(255,255,255,0.2)',
              marginTop: '3px',
            }}
          >
            DATA PORTAL
          </p>
        </div>

        {/* Live badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            background: 'rgba(0,163,218,0.28)',
            border: '1px solid rgba(0,163,218,0.5)',
            backdropFilter: 'blur(6px)',
            color: '#72D8F5',
            fontSize: '8px',
            fontWeight: 700,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            padding: '5px 11px',
            borderRadius: '100px',
          }}
        >
          <span
            style={{
              width: '4px', height: '4px',
              background: '#00C3FF',
              borderRadius: '50%',
              display: 'inline-block',
              boxShadow: '0 0 6px #00C3FF',
            }}
          />
          LIVE
        </div>
      </div>

      {/* ── Bottom copy ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          padding: '0 22px 32px',
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontSize: '9px',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
            marginBottom: '7px',
          }}
        >
          NIO TECHNOLOGY · {ES9_BANNER.date}
        </p>

        <h1
          style={{
            fontSize: '36px',
            fontWeight: 200,
            letterSpacing: '0.04em',
            lineHeight: 1.0,
            color: '#FFFFFF',
            marginBottom: '10px',
          }}
        >
          {ES9_BANNER.title}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '12px',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.55)',
            letterSpacing: '0.03em',
            marginBottom: '18px',
          }}
        >
          {ES9_BANNER.subtitle}
        </p>

        {/* Event pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            color: 'rgba(255,255,255,0.82)',
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.05em',
            padding: '7px 15px',
            borderRadius: '100px',
          }}
        >
          <span
            style={{
              width: '5px', height: '5px',
              background: '#00A3DA',
              borderRadius: '50%',
              display: 'inline-block',
              flexShrink: 0,
              boxShadow: '0 0 8px rgba(0,163,218,0.8)',
            }}
          />
          发布会倒计时 · 即将揭晓
        </div>
      </div>
    </section>
  );
}
