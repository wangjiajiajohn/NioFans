"use client";
import React, { useState } from 'react';


interface ModelConfig {
  id: string;
  name: string;         // display name e.g. "ONVO L90"
  brand: 'ONVO' | 'Firefly' | 'NIO';
  tag: string;          // e.g. "家庭智能SUV"
  thumb: string;        // public image path
  available: false;     // data not yet available
}

const MODELS: ModelConfig[] = [
  {
    id: 'l90',
    name: 'L90',
    brand: 'ONVO',
    tag: '家庭智能 SUV · 首款热销车型',
    thumb: '/hero_car.png',
    available: false,
  },
  {
    id: 'firefly',
    name: '萤火虫',
    brand: 'Firefly',
    tag: '城市微型纯电 · 品牌首款',
    thumb: '/hero_car.png',
    available: false,
  },
  {
    id: 'es8',
    name: 'ES8',
    brand: 'NIO',
    tag: '旗舰六七座 SUV · 经典战略车型',
    thumb: '/hero_car.png',
    available: false,
  },
];

const BRAND_COLOR: Record<string, string> = {
  ONVO: '#4E7CF6',
  Firefly: '#F0A500',
  NIO: '#00A3DA',
};

export default function ModelSection() {
  const [activeId, setActiveId] = useState<string>('l90');
  const model = MODELS.find(m => m.id === activeId)!;
  const brandColor = BRAND_COLOR[model.brand];

  return (
    <section style={{ padding: '32px 16px 48px', background: '#FAFAFA', borderTop: '1px solid #EFEFEF' }}>
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <p
          style={{
            fontSize: '9px', fontWeight: 700, letterSpacing: '0.24em',
            textTransform: 'uppercase', color: '#AAAAAA', marginBottom: '6px',
          }}
        >
          Vehicle Delivery · 车型月交付
        </p>
        <h2
          style={{
            fontSize: '22px', fontWeight: 200, letterSpacing: '-0.01em',
            color: '#0D0D0D', lineHeight: 1.1,
          }}
        >
          特定车型<br />月度交付数据
        </h2>
      </div>

      {/* Model tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto' }} className="no-scrollbar">
        {MODELS.map(m => {
          const isActive = m.id === activeId;
          const color = BRAND_COLOR[m.brand];
          return (
            <button
              key={m.id}
              onClick={() => setActiveId(m.id)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                padding: '10px 14px', borderRadius: '12px', border: '1px solid',
                borderColor: isActive ? color : '#E8E8E8',
                background: isActive ? `${color}10` : '#FFFFFF',
                cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0,
                minWidth: '92px',
              }}
            >
              <span style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: isActive ? color : '#BBBBBB', marginBottom: '3px' }}>
                {m.brand}
              </span>
              <span style={{ fontSize: '15px', fontWeight: 300, color: isActive ? '#0D0D0D' : '#888', letterSpacing: '-0.01em' }}>
                {m.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content card */}
      <div
        style={{
          background: '#FFFFFF', borderRadius: '16px',
          border: '1px solid #EBEBEB', overflow: 'hidden',
        }}
      >
        {/* Card header */}
        <div style={{ padding: '16px 16px 14px', borderBottom: '1px solid #F0F0F0', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: `${brandColor}12`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: '10px', fontWeight: 800, color: brandColor, letterSpacing: '0.02em' }}>
              {model.brand.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em', color: brandColor, textTransform: 'uppercase' }}>
                {model.brand}
              </span>
              <span style={{ fontSize: '14px', fontWeight: 500, color: '#0D0D0D' }}>{model.name}</span>
            </div>
            <div style={{ fontSize: '10px', color: '#AAAAAA', marginTop: '2px', letterSpacing: '0.02em' }}>
              {model.tag}
            </div>
          </div>
        </div>

        {/* Coming-soon empty state */}
        <div
          style={{
            padding: '48px 24px 40px', display: 'flex', flexDirection: 'column',
            alignItems: 'center', textAlign: 'center',
          }}
        >
          {/* Dashed placeholder chart bars */}
          <div
            style={{
              display: 'flex', alignItems: 'flex-end', gap: '6px',
              height: '80px', marginBottom: '24px', opacity: 0.2,
            }}
          >
            {[40, 55, 35, 70, 50, 80, 60, 90, 65, 100, 75, 85].map((h, i) => (
              <div
                key={i}
                style={{
                  width: '14px', height: `${h}%`,
                  border: `1.5px dashed ${brandColor}`,
                  borderRadius: '3px 3px 1px 1px',
                  background: 'transparent',
                }}
              />
            ))}
          </div>

          {/* Status pill */}
          <div
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: `${brandColor}10`, border: `1px solid ${brandColor}30`,
              color: brandColor, fontSize: '10px', fontWeight: 600,
              letterSpacing: '0.08em', padding: '6px 14px', borderRadius: '100px',
              marginBottom: '14px',
            }}
          >
            <span style={{ width: '4px', height: '4px', background: brandColor, borderRadius: '50%', display: 'inline-block', opacity: 0.7 }} />
            数据建设中
          </div>

          <p style={{ fontSize: '12px', fontWeight: 300, color: '#AAAAAA', lineHeight: 1.6, maxWidth: '240px' }}>
            {model.brand} {model.name} 车型级月度交付数据<br />
            即将上线，敬请期待
          </p>

          {/* Bottom decoration */}
          <div style={{ marginTop: '28px', display: 'flex', gap: '4px' }}>
            {[1,2,3].map(i => (
              <div
                key={i}
                style={{
                  width: '4px', height: '4px', borderRadius: '50%',
                  background: brandColor, opacity: 0.15 + i * 0.15,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Coming soon models hint */}
      <div style={{ marginTop: '16px', padding: '0 4px' }}>
        <p style={{ fontSize: '9px', color: '#CCCCCC', letterSpacing: '0.1em', textAlign: 'center', textTransform: 'uppercase' }}>
          More Models · ET9 · ES6 · EC7 · ET5T · Coming Soon
        </p>
      </div>
    </section>
  );
}
