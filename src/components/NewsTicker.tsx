"use client";
import React, { useState, useEffect, useCallback } from 'react';

export interface NewsItem {
  tag: string;
  text: string;
}

interface NewsTickerProps {
  items: NewsItem[];
}

export default function NewsTicker({ items }: NewsTickerProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const next = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setIndex(prev => (prev + 1) % items.length);
      setVisible(true);
    }, 260);
  }, [items.length]);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, items.length]);

  if (!items.length) return null;
  const item = items[index];

  return (
    <div
      style={{
        borderBottom: '1px solid #EBEBEB',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: '#FAFAFA',
      }}
    >
      {/* Live pulse */}
      <span
        style={{
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          background: '#00A3DA',
          flexShrink: 0,
          animation: 'live-pulse 2.4s ease-in-out infinite',
        }}
      />

      {/* Tag — all-caps, no background */}
      <span
        style={{
          fontSize: '9px',
          fontWeight: 700,
          letterSpacing: '0.14em',
          color: '#00A3DA',
          textTransform: 'uppercase',
          flexShrink: 0,
          whiteSpace: 'nowrap',
        }}
      >
        {item.tag}
      </span>

      {/* Separator */}
      <span style={{ color: '#CACACA', fontSize: '10px', flexShrink: 0, lineHeight: 1 }}>·</span>

      {/* Headline */}
      <span
        style={{
          fontSize: '12px',
          fontWeight: 400,
          color: '#444',
          flex: 1,
          letterSpacing: '0.01em',
          lineHeight: 1.4,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.26s ease',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
      >
        {item.text}
      </span>

      {/* Progress — minimal dots */}
      {items.length > 1 && (
        <div style={{ display: 'flex', gap: '5px', flexShrink: 0, alignItems: 'center' }}>
          {items.map((_, i) => (
            <span
              key={i}
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: i === index ? '#00A3DA' : '#DEDEDE',
                transition: 'background 0.35s ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
