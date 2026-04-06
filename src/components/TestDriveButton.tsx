"use client";
import React, { useState, useEffect } from 'react';
import { getAssetPath } from '@/utils/paths';

export default function TestDriveButton() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* ── Floating pill button ── */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '16px',
          zIndex: 900,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '10px 18px',
          background: '#0D0D0D',
          color: '#FFF',
          border: 'none',
          borderRadius: '100px',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '0.04em',
          boxShadow: '0 4px 24px rgba(0,0,0,0.28)',
          transition: 'transform 0.15s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l3-4h10l3 4h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
          <circle cx="7.5" cy="17.5" r="2.5" /><circle cx="16.5" cy="17.5" r="2.5" />
        </svg>
        预约试驾
      </button>

      {/* ── Backdrop ── */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 1100,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            animation: 'fade-in 0.2s ease both',
          }}
        />
      )}

      {/* ── Bottom sheet (dark) ── */}
      <div
        style={{
          position: 'fixed',
          left: 0, right: 0, bottom: 0,
          zIndex: 1200,
          background: '#111214',
          borderRadius: '20px 20px 0 0',
          boxShadow: '0 -2px 40px rgba(0,0,0,0.5)',
          transform: open ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.38s cubic-bezier(0.22, 1, 0.36, 1)',
          maxWidth: '480px',
          margin: '0 auto',
          overflow: 'hidden',
          paddingBottom: '36px',
        }}
      >
        {/* Handle */}
        <div style={{ padding: '12px 0 8px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '36px', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.12)' }} />
        </div>

        {/* Image full-width */}
        <div style={{ position: 'relative' }}>
          <img
            src={getAssetPath('/2.png')}
            alt="试驾预约二维码"
            style={{ width: '100%', display: 'block' }}
            draggable={false}
          />
          {/* Close button over image */}
          <button
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute', top: '12px', right: '12px',
              width: '30px', height: '30px', borderRadius: '50%',
              background: 'rgba(0,0,0,0.45)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.15)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M1 1l10 10M11 1L1 11" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Footer text */}
        <div style={{ padding: '16px 24px 0' }}>
          <p style={{ fontSize: '15px', fontWeight: 600, color: '#FFF', letterSpacing: '0.01em' }}>
            预约试驾
          </p>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '5px', letterSpacing: '0.02em', lineHeight: 1.6 }}>
            微信扫一扫 · 长按识别二维码 · 一对一专属顾问服务
          </p>
        </div>
      </div>
    </>
  );
}
