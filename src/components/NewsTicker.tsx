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
    }, 220);
  }, [items.length]);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [next, items.length]);

  if (!items.length) return null;
  const item = items[index];

  return (
    <div
      style={{
        margin: '10px 16px 4px',
        padding: '9px 12px',
        background: 'rgba(0,163,218,0.04)',
        border: '1px solid rgba(0,163,218,0.13)',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '9px',
      }}
    >
      {/* Live dot */}
      <span
        style={{
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          background: '#00A3DA',
          flexShrink: 0,
          boxShadow: '0 0 8px rgba(0,163,218,0.8)',
          animation: 'live-pulse 2s ease-in-out infinite',
        }}
      />

      {/* Tag badge */}
      <span
        style={{
          fontSize: '9px',
          fontWeight: 700,
          letterSpacing: '0.06em',
          color: '#00A3DA',
          background: 'rgba(0,163,218,0.1)',
          padding: '2px 7px',
          borderRadius: '4px',
          flexShrink: 0,
          whiteSpace: 'nowrap',
        }}
      >
        {item.tag}
      </span>

      {/* Headline */}
      <span
        style={{
          fontSize: '11px',
          color: 'rgba(0,0,0,0.7)',
          flex: 1,
          letterSpacing: '0.01em',
          lineHeight: 1.35,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.22s ease',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 1,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {item.text}
      </span>

      {/* Progress dots */}
      {items.length > 1 && (
        <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
          {items.map((_, i) => (
            <span
              key={i}
              style={{
                width: i === index ? '14px' : '4px',
                height: '3px',
                borderRadius: '2px',
                background: i === index ? '#00A3DA' : 'rgba(0,0,0,0.12)',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
