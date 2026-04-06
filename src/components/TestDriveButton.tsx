"use client";
import React, { useState, useEffect } from 'react';
import { getAssetPath } from '@/utils/paths';

export default function TestDriveButton() {
  const [open, setOpen] = useState(false);

  // Lock body scroll when sheet is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
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
          boxShadow: '0 4px 20px rgba(0,0,0,0.22), 0 1px 4px rgba(0,0,0,0.12)',
          transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {/* Car icon */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l3-4h10l3 4h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
          <circle cx="7.5" cy="17.5" r="2.5" />
          <circle cx="16.5" cy="17.5" r="2.5" />
        </svg>
        预约试驾
      </button>

      {/* ── Backdrop ── */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1100,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            animation: 'fade-in 0.2s ease both',
          }}
        />
      )}

      {/* ── Bottom sheet ── */}
      <div
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1200,
          background: '#FFF',
          borderRadius: '20px 20px 0 0',
          padding: '0 0 40px',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.15)',
          transform: open ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.38s cubic-bezier(0.22, 1, 0.36, 1)',
          maxWidth: '480px',
          margin: '0 auto',
        }}
      >
        {/* Handle */}
        <div style={{ padding: '12px 0 4px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '36px', height: '4px', borderRadius: '2px', background: '#E8E8E8' }} />
        </div>

        {/* Header */}
        <div style={{ padding: '12px 24px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontSize: '18px', fontWeight: 700, color: '#0D0D0D', letterSpacing: '-0.01em' }}>预约试驾</p>
            <p style={{ fontSize: '12px', color: '#888', marginTop: '4px', letterSpacing: '0.01em' }}>
              扫码添加专属顾问，获取一对一试驾服务
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            style={{
              width: '28px', height: '28px', borderRadius: '50%',
              background: '#F2F2F2', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1l10 10M11 1L1 11" stroke="#666" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* QR code */}
        <div style={{ padding: '0 24px' }}>
          <div style={{
            borderRadius: '16px',
            overflow: 'hidden',
            background: '#F8F8F8',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <img
              src={getAssetPath('/2.png')}
              alt="试驾预约二维码"
              style={{ width: '100%', maxWidth: '280px', display: 'block' }}
              draggable={false}
            />
          </div>

          {/* Hint */}
          <p style={{
            textAlign: 'center', marginTop: '16px',
            fontSize: '11px', color: '#AAA', letterSpacing: '0.03em', lineHeight: 1.6,
          }}>
            微信扫一扫 · 长按识别二维码
          </p>
        </div>
      </div>
    </>
  );
}
