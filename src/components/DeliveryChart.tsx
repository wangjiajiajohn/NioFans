"use client";
import React, { useRef, useState, useEffect } from 'react';

import { FLAT_DELIVERY_DATA } from '@/constants/nioData';

// ── Derived stats ──────────────────────────────────────────────────
const total2025 = FLAT_DELIVERY_DATA.filter(d => d.month.startsWith('25')).reduce((s, d) => s + d.value, 0);
const total2024 = FLAT_DELIVERY_DATA.filter(d => d.month.startsWith('24')).reduce((s, d) => s + d.value, 0);
const yoy2025 = ((total2025 - total2024) / total2024 * 100).toFixed(1);

const allTime = FLAT_DELIVERY_DATA.reduce((s, d) => s + d.value, 0);
const bestMonth = [...FLAT_DELIVERY_DATA].sort((a, b) => b.value - a.value)[0];
const latest = FLAT_DELIVERY_DATA[FLAT_DELIVERY_DATA.length - 1];

// Latest month year-over-year
const latestMonthSuffix = latest.month.slice(3); // e.g. "03"
const latestYearPrefix = latest.month.slice(0, 2); // e.g. "26"
const prevYearLatestMonth = FLAT_DELIVERY_DATA.find(
  d => d.month === `${String(Number(latestYearPrefix) - 1).padStart(2, '0')}-${latestMonthSuffix}`
);
const latestYoY = prevYearLatestMonth
  ? ((latest.value - prevYearLatestMonth.value) / prevYearLatestMonth.value * 100).toFixed(1)
  : null;

// ── Year groups for the annual summary bar ─────────────────────────
const yearGroups: { year: string; total: number }[] = ['21','22','23','24','25','26'].map(y => ({
  year: `20${y}`,
  total: FLAT_DELIVERY_DATA.filter(d => d.month.startsWith(y)).reduce((s, d) => s + d.value, 0),
}));
const maxAnnual = Math.max(...yearGroups.map(y => y.total));



// ── Custom Bar ─────────────────────────────────────────────────────
function DeliveryBar({ entry, index, maxVal, total, isHovered, onHover }: {
  entry: { month: string; value: number };
  index: number;
  maxVal: number;
  total: number;
  isHovered: boolean;
  onHover: (i: number | null) => void;
}) {
  const pct = (entry.value / maxVal) * 100;
  const isLatest = index === total - 1;
  const isBig = entry.value >= 30000;

  const barColor = isLatest
    ? '#00A3DA'
    : isHovered
    ? '#2E4B6A'
    : isBig
    ? '#1E3A52'
    : '#1A2535';

  const yearStart = index % 12 === 0;
  const yearLabel = yearStart ? `20${entry.month.slice(0,2)}` : '';

  return (
    <div
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '22px',
        flexShrink: 0,
        height: '100%',
        paddingBottom: '20px',
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      {/* Value label on hover */}
      {isHovered && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '7px',
          fontWeight: 600,
          color: '#00A3DA',
          whiteSpace: 'nowrap',
          letterSpacing: '0.02em',
        }}>
          {(entry.value / 1000).toFixed(1)}k
        </div>
      )}
      {/* Latest label */}
      {isLatest && !isHovered && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '7px',
          fontWeight: 600,
          color: '#00A3DA',
          whiteSpace: 'nowrap',
        }}>
          {(entry.value / 1000).toFixed(1)}k
        </div>
      )}

      {/* The bar */}
      <div
        style={{
          width: '14px',
          height: `${pct}%`,
          background: isLatest
            ? 'linear-gradient(180deg, #00C3FF 0%, #00A3DA 100%)'
            : isBig && !isHovered
            ? 'linear-gradient(180deg, #2A5F8A 0%, #1A3D5C 100%)'
            : `${barColor}`,
          borderRadius: '3px 3px 1px 1px',
          transition: 'background 0.15s, height 0.3s',
          boxShadow: isLatest ? '0 0 12px rgba(0,163,218,0.6)' : undefined,
          minHeight: '3px',
        }}
      />

      {/* Year label every 12 bars */}
      {yearStart && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          fontSize: '8px',
          fontWeight: 500,
          color: 'rgba(255,255,255,0.25)',
          letterSpacing: '0.05em',
          whiteSpace: 'nowrap',
        }}>
          {yearLabel}
        </div>
      )}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────
export default function DeliveryChart() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxVal = Math.max(...FLAT_DELIVERY_DATA.map(d => d.value));

  useEffect(() => {
    if (scrollRef.current) {
      // Scroll to show latest data (the rightmost side) on load
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, []);

  return (
    <div className="w-full" style={{ background: '#FFFFFF' }}>

      {/* ── KPI Row ─────────────────────────────────────────────── */}
      <div style={{ padding: '28px 16px 0' }}>
        <p className="section-label anim-fade-up delay-1" style={{ marginBottom: '14px' }}>
          交付数据概览
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }} className="anim-fade-up delay-2">
          {/* Latest month */}
          <div className="kpi-card">
            <div style={{ fontSize: '10px', color: '#999', marginBottom: '6px', fontWeight: 500 }}>本月交付</div>
            <div style={{ fontSize: '26px', fontWeight: 300, letterSpacing: '-0.02em', color: '#0D0D0D', lineHeight: 1 }}>
              {(latest.value / 10000).toFixed(2)}
              <span style={{ fontSize: '12px', fontWeight: 400, color: '#999', marginLeft: '3px' }}>万台</span>
            </div>
            {latestYoY && (
              <div style={{ marginTop: '6px' }}>
                <span className={Number(latestYoY) >= 0 ? 'badge-green' : 'badge-red'}>
                  {Number(latestYoY) >= 0 ? '▲' : '▼'} 同比 {latestYoY}%
                </span>
              </div>
            )}
          </div>

          {/* All time */}
          <div className="kpi-card">
            <div style={{ fontSize: '10px', color: '#999', marginBottom: '6px', fontWeight: 500 }}>历史累计</div>
            <div style={{ fontSize: '26px', fontWeight: 300, letterSpacing: '-0.02em', color: '#0D0D0D', lineHeight: 1 }}>
              {(allTime / 10000).toFixed(1)}
              <span style={{ fontSize: '12px', fontWeight: 400, color: '#999', marginLeft: '3px' }}>万台</span>
            </div>
            <div style={{ marginTop: '6px' }}>
              <span className="badge-blue">2021—2026</span>
            </div>
          </div>

          {/* Best month */}
          <div className="kpi-card">
            <div style={{ fontSize: '10px', color: '#999', marginBottom: '6px', fontWeight: 500 }}>单月记录</div>
            <div style={{ fontSize: '26px', fontWeight: 300, letterSpacing: '-0.02em', color: '#0D0D0D', lineHeight: 1 }}>
              {(bestMonth.value / 10000).toFixed(1)}
              <span style={{ fontSize: '12px', fontWeight: 400, color: '#999', marginLeft: '3px' }}>万台</span>
            </div>
            <div style={{ marginTop: '6px' }}>
              <span className="badge-blue">20{bestMonth.month.replace('-', '.')}</span>
            </div>
          </div>

          {/* 2025 YoY */}
          <div className="kpi-card">
            <div style={{ fontSize: '10px', color: '#999', marginBottom: '6px', fontWeight: 500 }}>2025 全年</div>
            <div style={{ fontSize: '26px', fontWeight: 300, letterSpacing: '-0.02em', color: '#0D0D0D', lineHeight: 1 }}>
              {(total2025 / 10000).toFixed(1)}
              <span style={{ fontSize: '12px', fontWeight: 400, color: '#999', marginLeft: '3px' }}>万台</span>
            </div>
            <div style={{ marginTop: '6px' }}>
              <span className="badge-green">▲ YoY +{yoy2025}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Chart Shell ─────────────────────────────────────────── */}
      <div style={{ padding: '20px 16px 0' }} className="anim-fade-up delay-3">
        <div className="chart-shell" style={{ padding: '20px 16px 16px' }}>

          {/* Chart header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#00A3DA', marginBottom: '4px' }}>
                全周期月度交付
              </p>
              <p style={{ fontSize: '18px', fontWeight: 300, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1 }}>
                2021 — 2026
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>63 months</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>← 左右滑动</div>
            </div>
          </div>

          {/* Bars */}
          <div
            ref={scrollRef}
            className="no-scrollbar"
            style={{
              overflowX: 'auto',
              overflowY: 'hidden',
              cursor: 'grab',
              WebkitOverflowScrolling: 'touch',
            }}
            onMouseDown={e => {
              const el = e.currentTarget;
              const startX = e.pageX - el.offsetLeft;
              const initScrollLeft = el.scrollLeft;
              const onMove = (ev: MouseEvent) => {
                const x = ev.pageX - el.offsetLeft;
                el.scrollLeft = initScrollLeft - (x - startX);
              };
              const onUp = () => {
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup', onUp);
                el.style.cursor = 'grab';
              };
              el.style.cursor = 'grabbing';
              document.addEventListener('mousemove', onMove);
              document.addEventListener('mouseup', onUp);
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: '3px',
              height: '180px',
              width: `${FLAT_DELIVERY_DATA.length * 25}px`,
              paddingTop: '20px',
            }}>
              {FLAT_DELIVERY_DATA.map((entry, i) => (
                <DeliveryBar
                  key={entry.month}
                  entry={entry}
                  index={i}
                  maxVal={maxVal}
                  total={FLAT_DELIVERY_DATA.length}
                  isHovered={hoveredIndex === i}
                  onHover={setHoveredIndex}
                />
              ))}
            </div>
          </div>

          {/* Legend */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginTop: '12px',
            paddingTop: '12px',
            borderTop: '1px solid rgba(255,255,255,0.06)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'linear-gradient(180deg, #00C3FF, #00A3DA)', boxShadow: '0 0 6px rgba(0,163,218,0.5)' }} />
              <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>最新月份</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'linear-gradient(180deg, #2A5F8A, #1A3D5C)' }} />
              <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>月交付 ≥3万</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#1A2535' }} />
              <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>常规月份</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Annual Bar Summary ───────────────────────────────────── */}
      <div style={{ padding: '20px 16px 0' }} className="anim-fade-up delay-4">
        <div style={{
          background: '#F8F8F8',
          borderRadius: '16px',
          padding: '18px 16px',
          border: '1px solid #EBEBEB'
        }}>
          <p className="section-label" style={{ marginBottom: '16px' }}>年度交付总量对比</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {yearGroups.map((y, i) => {
              const pct = (y.total / maxAnnual) * 100;
              const isLatestYear = i === yearGroups.length - 1;
              return (
                <div key={y.year} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', fontSize: '11px', fontWeight: 600, color: isLatestYear ? '#00A3DA' : '#555', textAlign: 'right', flexShrink: 0 }}>
                    {y.year}
                  </div>
                  <div style={{ flex: 1, height: '20px', background: '#EBEBEB', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${pct}%`,
                      background: isLatestYear
                        ? 'linear-gradient(90deg, #00A3DA, #00C3FF)'
                        : 'linear-gradient(90deg, #B0C4D8, #8FADC4)',
                      borderRadius: '4px',
                      transition: 'width 1s cubic-bezier(0.22, 1, 0.36, 1)',
                    }} />
                  </div>
                  <div style={{ width: '48px', fontSize: '11px', fontWeight: 500, color: isLatestYear ? '#0D0D0D' : '#999', textAlign: 'right', flexShrink: 0 }}>
                    {y.total >= 10000 ? `${(y.total / 10000).toFixed(1)}万` : y.total.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer style={{
        padding: '36px 16px 48px',
        textAlign: 'center',
        marginTop: '8px'
      }}>
        <div className="divider" style={{ marginBottom: '28px' }} />
        <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.24em', color: '#0D0D0D', textTransform: 'uppercase', marginBottom: '8px' }}>
          Blue Sky Coming
        </p>
        <p style={{ fontSize: '9px', color: '#AAAAAA', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
          © 2026 NIO Fans Portal · 非官方数据
        </p>
      </footer>
    </div>
  );
}
