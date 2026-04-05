"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { BANNERS } from '@/constants/nioData';
import { useLang } from '@/contexts/LangContext';
import { getAssetPath } from '@/utils/paths';

export default function Banner() {
  const { lang, toggleLang } = useLang();
  const [visualIndex, setVisualIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Clone last slide at start, first slide at end for seamless loop
  const extendedBanners = [
    BANNERS[BANNERS.length - 1],
    ...BANNERS,
    BANNERS[0]
  ];

  const nextBanner = React.useCallback(() => {
    if (!isTransitioning) return;
    setVisualIndex((prev) => prev + 1);
  }, [isTransitioning]);

  const prevBanner = React.useCallback(() => {
    if (!isTransitioning) return;
    setVisualIndex((prev) => prev - 1);
  }, [isTransitioning]);

  useEffect(() => {
    if (isDragging) return; // Pause auto-play while user is interacting
    const interval = setInterval(nextBanner, 5000);
    return () => clearInterval(interval);
  }, [nextBanner, isDragging]);

  const handleTransitionEnd = () => {
    if (visualIndex === 0) {
      setIsTransitioning(false);
      setVisualIndex(BANNERS.length);
    } else if (visualIndex === BANNERS.length + 1) {
      setIsTransitioning(false);
      setVisualIndex(1);
    }
  };

  // Re-enable transitions after jump
  useEffect(() => {
    if (!isTransitioning) {
      // Small tick to ensure React applies the non-transitioning index jump first
      const t = setTimeout(() => setIsTransitioning(true), 20);
      return () => clearTimeout(t);
    }
  }, [isTransitioning]);

  // Map visual index back to original BANNER index for content rendering
  const currentBanner = (visualIndex - 1 + BANNERS.length) % BANNERS.length;

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setTouchStart(clientX);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    setTouchEnd(clientX);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    const deltaX = touchStart - touchEnd;
    if (Math.abs(deltaX) > 50 && touchEnd !== 0) {
      if (deltaX > 0) nextBanner();
      else prevBanner();
    }
    setIsDragging(false);
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => handleStart(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);
  const handleTouchEnd = () => handleEnd();

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX);
    if (containerRef.current) containerRef.current.style.cursor = 'grabbing';
  };
  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const handleMouseUp = () => {
    handleEnd();
    if (containerRef.current) containerRef.current.style.cursor = 'grab';
  };
  const handleMouseLeave = () => {
    if (isDragging) handleEnd();
    if (containerRef.current) containerRef.current.style.cursor = 'grab';
  };

  return (
    <section
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1 / 1',
        background: '#060608',
        overflow: 'hidden',
        cursor: 'grab',
      }}
    >
      {/* Banner slides */}
      <div
        onTransitionEnd={handleTransitionEnd}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
          transform: `translateX(-${visualIndex * 100}%)`,
        }}
      >
        {extendedBanners.map((banner, idx) => (
          <div
            key={`${banner.id}-${idx}`}
            style={{
              flex: '0 0 100%',
              position: 'relative',
              width: '100%',
              height: '100%',
            }}
          >
            {/* Car image */}
            <Image
              src={getAssetPath(banner.image)}
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
                pointerEvents: 'none',
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
          pointerEvents: 'none',
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
            pointerEvents: 'auto',
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
          pointerEvents: 'none',
        }}
      >
        <div style={{ maxWidth: '90%' }}>
          {/* Removed text overlaps per user request to show more of the car image */}
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
              pointerEvents: 'auto',
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
              onClick={() => {
                if (!isTransitioning) return;
                setVisualIndex(index + 1);
              }}
              style={{
                width: index === currentBanner ? '24px' : '8px',
                height: '2px',
                background: index === currentBanner ? '#00C3FF' : 'rgba(255,255,255,0.3)',
                borderRadius: '1px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
                pointerEvents: 'auto',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
