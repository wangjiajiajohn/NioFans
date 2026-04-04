"use client";
import React, { useState } from 'react';

type BrandId = 'ONVO' | 'Firefly' | 'NIO';

interface ModelConfig {
  id: string;
  name: string;
  brand: BrandId;
  tag: string;
  color: string;
}

const MODELS: ModelConfig[] = [
  { id: 'es8',      name: 'ES8',    brand: 'NIO',     tag: '旗舰六七座 SUV · 经典战略车型',    color: '#E8940A' },
  { id: 'l90',      name: 'L90',    brand: 'ONVO',    tag: '家庭智能 SUV · 首款热销车型',      color: '#4E7CF6' },
  { id: 'firefly',  name: '萤火虫', brand: 'Firefly', tag: '城市微型纯电 · 品牌首款',          color: '#00A3DA' },
];

export default function ModelSection() {
  const [activeId, setActiveId] = useState('es8');
  const model = MODELS.find(m => m.id === activeId)!;

  return (
    <section style={{ background: '#0B0F14', padding: '0 0 48px' }}>


      {/* ── Section header ── */}
      <div style={{ padding: '28px 16px 0', marginBottom: '24px' }}>

        <p style={{
          fontSize: '9px', fontWeight: 700, letterSpacing: '0.26em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: '8px',
        }}>
          Vehicle Delivery · 车型月交付
        </p>
        <h2 style={{
          fontSize: '24px', fontWeight: 200, letterSpacing: '-0.01em',
          color: '#FFFFFF', lineHeight: 1.15,
        }}>
          特定车型<br />月度交付数据
        </h2>
      </div>

      {/* ── Model selector tabs ── */}
      <div
        style={{ display: 'flex', padding: '0 16px', gap: '6px', marginBottom: '20px', overflowX: 'auto' }}
        className="no-scrollbar"
      >
        {MODELS.map(m => {
          const isActive = m.id === activeId;
          return (
            <button
              key={m.id}
              onClick={() => setActiveId(m.id)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                padding: '11px 16px', borderRadius: '12px', border: '1px solid',
                borderColor: isActive ? m.color : 'rgba(255,255,255,0.15)',
                background: isActive ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.03)',
                cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0, minWidth: '88px',
              }}
            >
              <span style={{
                fontSize: '7px', fontWeight: 700, letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: isActive ? m.color : 'rgba(255,255,255,0.5)',
                marginBottom: '4px',
              }}>
                {m.brand}
              </span>
              <span style={{
                fontSize: '16px', fontWeight: 300, letterSpacing: '-0.01em',
                color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.7)',
              }}>
                {m.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Content card ── */}
      <div style={{ padding: '0 16px' }}>
        <div
          key={activeId}
          style={{
          borderRadius: '16px', overflow: 'hidden',
          border: `1px solid rgba(255,255,255,0.12)`,
          background: 'rgba(255,255,255,0.04)',
          animation: 'slide-up 0.35s cubic-bezier(0.22,1,0.36,1) both',
        }}>


          {/* Card top stripe */}
          <div style={{
            height: '2px',
            background: `linear-gradient(90deg, ${model.color}, transparent)`,
          }} />

          {/* Card header */}
          <div style={{ padding: '18px 18px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <span style={{
              fontSize: '8px', fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: model.color,
            }}>
              {model.brand}
            </span>
            {' '}
            <span style={{ fontSize: '16px', fontWeight: 400, color: '#FFFFFF', marginLeft: '4px' }}>
              {model.name}
            </span>
            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', marginTop: '4px', letterSpacing: '0.03em' }}>
              {model.tag}
            </p>
          </div>

          {/* Empty/Coming-soon state */}
          <div style={{
            padding: '44px 24px 40px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
          }}>
            {/* Outline-only waveform placeholder */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '56px', marginBottom: '28px' }}>
              {[22, 38, 28, 52, 35, 66, 44, 72, 50, 80, 58, 68].map((h, i) => (
                <div key={i} style={{
                  width: '12px', height: `${h}%`, borderRadius: '2px 2px 1px 1px',
                  background: 'transparent',
                  border: `1.5px solid ${model.color}`,
                  opacity: 0.18 + (i / 12) * 0.28,
                }} />
              ))}
            </div>

            {/* Status badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px',
              background: `${model.color}14`,
              border: `1px solid ${model.color}35`,
              color: model.color,
              fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em',
              textTransform: 'uppercase',
              padding: '6px 16px', borderRadius: '100px',
              marginBottom: '16px',
            }}>
              <span style={{
                width: '4px', height: '4px', background: model.color,
                borderRadius: '50%', display: 'inline-block',
                animation: 'pulse 2s infinite',
              }} />
              数据建设中
            </div>

            <p style={{
              fontSize: '11px', fontWeight: 300, color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.7, maxWidth: '220px', letterSpacing: '0.02em',
            }}>
              {model.brand} {model.name} 车型级<br />
              月度交付数据即将上线
            </p>
          </div>
        </div>
      </div>

      {/* More models hint */}
      <div style={{ marginTop: '20px', padding: '0 16px', display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
        {['ET9', 'ES6', 'EC7', 'ET5T', 'ET9 Ultra'].map(name => (
          <span key={name} style={{
            fontSize: '8px', fontWeight: 600, letterSpacing: '0.12em',
            color: 'rgba(255,255,255,0.35)',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '100px',
            padding: '4px 10px',
          }}>
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
