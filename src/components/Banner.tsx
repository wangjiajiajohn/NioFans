"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { BANNERS } from '@/constants/nioData';
import { useLang } from '@/contexts/LangContext';

export default function Banner() {
  const { lang, t, toggleLang } = useLang();
  const [currentBanner, setCurrentBanner] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev === BANNERS.length - 1 ? 0 : prev + 1));
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev === 0 ? BANNERS.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextBanner, 5000);
    return () => clearInterval(interval);
  }, []);

  // Touch events for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      nextBanner();
    }
    if (touchEnd - touchStart > 50) {
      // Swipe right
      prevBanner();
    }
  };

  return (
    <section
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1 / 1',
        background: '#060608',
        overflow: 'hidden',
        cursor: 'grab',
      }}
      onMouseDown={() => {
        if (containerRef.current) {
          containerRef.current.style.cursor = 'grabbing';
        }
      }}
      onMouseUp={() => {
        if (containerRef.current) {
          containerRef.current.style.cursor = 'grab';
        }
      }}
    >
      {/* Banner slides */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          transition: 'transform 0.5s ease-in-out',
          transform: `translateX(-${currentBanner * 100}%)`,
        }}
      >
        {BANNERS.map((banner) => (
          <div
            key={banner.id}
            style={{
              flex: '0 0 100%',
              position: 'relative',
              width: '100%',
              height: '100%',
            }}
          >
            {/* Car image */}
            <Image
              src={banner.image}
              alt={banner.title}
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
          </div>
        ))}
      </div>



      {/* ── Top bar ── */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          paddingTop: 'max(20px, env(safe-area-inset-top))',
          paddingLeft: '20px',
          paddingRight: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          zIndex: 10,
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

        {/* Lang toggle */}
        <button
          onClick={toggleLang}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '3px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(6px)',
            borderRadius: '100px', padding: '5px 10px',
            cursor: 'pointer', fontSize: '8px', fontWeight: 700,
            letterSpacing: '0.12em',
          }}
        >
          <span style={{ color: lang === 'zh' ? '#FFFFFF' : 'rgba(255,255,255,0.35)' }}>ZH</span>
          <span style={{ color: 'rgba(255,255,255,0.25)', margin: '0 2px' }}>·</span>
          <span style={{ color: lang === 'en' ? '#FFFFFF' : 'rgba(255,255,255,0.35)' }}>EN</span>
        </button>
      </div>

      {/* ── Bottom copy ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          padding: '0 22px 40px',
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: '90%' }}>
          {/* Eyebrow */}
          <p
            style={{
              fontSize: '8px',
              fontWeight: 600,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(0,195,255,0.6)',
              marginBottom: '12px',
              animation: 'fade-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s both',
            }}
          >
            {BANNERS[currentBanner].date} · NIO TECHNOLOGY
          </p>

          <h1
            style={{
              fontSize: '42px',
              fontWeight: 700,
              letterSpacing: '0.02em',
              lineHeight: 1.1,
              color: '#FFFFFF',
              marginBottom: '8px',
              animation: 'fade-up 0.8s cubic-bezier(0.22,1,0.36,1) 0.35s both',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)',
            }}
          >
            {BANNERS[currentBanner].title}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '14px',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: '0.03em',
              marginBottom: '24px',
              animation: 'fade-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.5s both',
            }}
          >
            {BANNERS[currentBanner].subtitle || t.bannerCarSubtitle}
          </p>
        </div>

        {/* Event pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
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
              animation: 'fade-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.65s both',
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
            {BANNERS[currentBanner].inviteText}
          </div>

          {/* Live badge - only show on ES9 banner */}
          {BANNERS[currentBanner].showLiveBadge && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: 'linear-gradient(90deg, rgba(0,163,218,0.3), rgba(0,195,255,0.2))',
                border: '1px solid rgba(0,195,255,0.3)',
                backdropFilter: 'blur(8px)',
                color: '#72D8F5',
                fontSize: '7px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                padding: '4px 10px',
                borderRadius: '12px',
                animation: 'fade-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.75s both',
                pointerEvents: 'none',
                boxShadow: '0 0 12px rgba(0,195,255,0.3)',
              }}
            >
              <span
                style={{
                  width: '3px', height: '3px',
                  background: '#00C3FF',
                  borderRadius: '50%',
                  display: 'inline-block',
                  boxShadow: '0 0 8px #00C3FF',
                  animation: 'live-pulse 2s ease-in-out infinite',
                }}
              />
              LIVE
            </div>
          )}
        </div>

        {/* Banner indicators */}
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            marginTop: '20px',
          }}
        >
          {BANNERS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              style={{
                width: index === currentBanner ? '24px' : '8px',
                height: '2px',
                background: index === currentBanner ? '#00C3FF' : 'rgba(255,255,255,0.3)',
                borderRadius: '1px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
