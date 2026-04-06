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
      {/* ── Floating pill ── */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed', bottom: '28px', right: '16px', zIndex: 900,
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '10px 18px',
          background: '#FFF', color: '#0D0D0D',
          border: '1px solid rgba(0,0,0,0.08)', borderRadius: '100px',
          cursor: 'pointer', fontSize: '12px', fontWeight: 600, letterSpacing: '0.04em',
          boxShadow: '0 2px 16px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.08)',
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
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
            animation: 'fade-in 0.22s ease both',
          }}
        />
      )}

      {/* ── Bottom sheet ── */}
      <div
        style={{
          position: 'fixed', left: 0, right: 0, bottom: 0,
          zIndex: 1200,
          borderRadius: '20px 20px 0 0',
          overflow: 'hidden',                          /* image flush to rounded corners */
          boxShadow: '0 -2px 60px rgba(0,0,0,0.6)',
          transform: open ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          maxWidth: '480px', margin: '0 auto',
          background: '#0a0a0a',
        }}
      >
        {/* Image — first child, no gap above */}
        <div style={{ position: 'relative' }}>
          <img
            src={getAssetPath('/2.png')}
            alt="试驾预约二维码"
            style={{ width: '100%', display: 'block' }}
            draggable={false}
          />

          {/* Drag handle — floats over image */}
          <div style={{
            position: 'absolute', top: '10px', left: 0, right: 0,
            display: 'flex', justifyContent: 'center', pointerEvents: 'none',
          }}>
            <div style={{ width: '36px', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.35)' }} />
          </div>

          {/* Close — floats over image */}
          <button
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute', top: '14px', right: '14px',
              width: '28px', height: '28px', borderRadius: '50%',
              background: 'transparent',
              border: '1.5px solid rgba(255,255,255,0.6)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M1 1l10 10M11 1L1 11" stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>

          {/* Bottom fade — image bleeds into dark area */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '64px',
            background: 'linear-gradient(to bottom, transparent, #0a0a0a)',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Text area */}
        <div style={{ padding: '4px 24px 40px' }}>
          <p style={{
            fontSize: '15px', fontWeight: 600,
            color: 'rgba(255,255,255,0.92)',
            letterSpacing: '0.01em',
          }}>
            预约试驾
          </p>
          <p style={{
            fontSize: '11px', color: 'rgba(255,255,255,0.35)',
            marginTop: '5px', letterSpacing: '0.03em', lineHeight: 1.6,
          }}>
            微信扫一扫 · 长按识别二维码 · 一对一专属顾问服务
          </p>
        </div>
      </div>
    </>
  );
}
