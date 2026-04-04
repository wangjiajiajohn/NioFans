"use client";
import React, { useRef, useState, useEffect } from 'react';
import { FLAT_DELIVERY_DATA } from '@/constants/nioData';

type ViewMode = 'monthly' | 'quarterly';

interface BarData {
  id: string;
  value: number;
  shortLabel: string; // "3" or "Q1"
  fullLabel: string;  // "2025年3月" or "2025 Q1"
  isYearStart: boolean;
  yearStr: string;    // "2025"
}

// ── Build bar datasets ─────────────────────────────────────────────
const MONTHLY_BARS: BarData[] = FLAT_DELIVERY_DATA.map((d, i) => ({
  id: d.month,
  value: d.value,
  shortLabel: String(+d.month.slice(3)), // "1"-"12"
  fullLabel: `20${d.month.slice(0, 2)}年${+d.month.slice(3)}月`,
  isYearStart: i % 12 === 0,
  yearStr: `20${d.month.slice(0, 2)}`,
}));

const QUARTERLY_BARS: BarData[] = (() => {
  const result: BarData[] = [];
  for (const y of ['21','22','23','24','25','26']) {
    const yd = FLAT_DELIVERY_DATA.filter(d => d.month.startsWith(y));
    for (let q = 1; q <= 4; q++) {
      const months = yd.filter(d => {
        const m = +d.month.slice(3);
        return m >= (q - 1) * 3 + 1 && m <= q * 3;
      });
      if (months.length > 0) {
        result.push({
          id: `${y}-Q${q}`,
          value: months.reduce((s, d) => s + d.value, 0),
          shortLabel: `Q${q}`,
          fullLabel: `20${y} Q${q}`,
          isYearStart: q === 1,
          yearStr: `20${y}`,
        });
      }
    }
  }
  return result;
})();

// ── KPI stats ──────────────────────────────────────────────────────
const total2025 = FLAT_DELIVERY_DATA.filter(d => d.month.startsWith('25')).reduce((s, d) => s + d.value, 0);
const total2024 = FLAT_DELIVERY_DATA.filter(d => d.month.startsWith('24')).reduce((s, d) => s + d.value, 0);
const yoy2025 = ((total2025 - total2024) / total2024 * 100).toFixed(1);
const allTime = FLAT_DELIVERY_DATA.reduce((s, d) => s + d.value, 0);
const bestMonth = [...FLAT_DELIVERY_DATA].sort((a, b) => b.value - a.value)[0];
const latestEntry = FLAT_DELIVERY_DATA[FLAT_DELIVERY_DATA.length - 1];
const prevYearLatest = FLAT_DELIVERY_DATA.find(
  d => d.month === `${String(+latestEntry.month.slice(0, 2) - 1).padStart(2, '0')}-${latestEntry.month.slice(3)}`
);
const latestYoY = prevYearLatest
  ? ((latestEntry.value - prevYearLatest.value) / prevYearLatest.value * 100).toFixed(1)
  : null;

const yearGroups = ['21','22','23','24','25','26'].map(y => ({
  year: `20${y}`,
  total: FLAT_DELIVERY_DATA.filter(d => d.month.startsWith(y)).reduce((s, d) => s + d.value, 0),
}));
const maxAnnual = Math.max(...yearGroups.map(y => y.total));

// ── Formatters ─────────────────────────────────────────────────────
const fmtK = (v: number) => v >= 10000 ? `${(v / 10000).toFixed(1)}万` : v.toLocaleString('zh-CN');
const signStr = (v: number) => v >= 0 ? '+' : '';
const trendColor = (v: number) => v >= 0 ? '#34C759' : '#FF453A';
const trendArrow = (v: number) => v >= 0 ? '▲' : '▼';

// ── Main Component ─────────────────────────────────────────────────
export default function DeliveryChart() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('monthly');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const bars = viewMode === 'monthly' ? MONTHLY_BARS : QUARTERLY_BARS;
  const maxVal = Math.max(...bars.map(b => b.value));
  const yoyOffset = viewMode === 'monthly' ? 12 : 4;
  const containerW = viewMode === 'monthly' ? 24 : 44;
  const barW = viewMode === 'monthly' ? 14 : 28;

  // Scroll to latest, reset selection on view change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
    setSelectedIndex(null);
  }, [viewMode]);

  // Compute detail card data
  const detail = selectedIndex !== null ? (() => {
    const cur = bars[selectedIndex];
    const momPrev = selectedIndex > 0 ? bars[selectedIndex - 1] : null;
    const yoyPrev = selectedIndex >= yoyOffset ? bars[selectedIndex - yoyOffset] : null;
    const yoy = yoyPrev ? (cur.value - yoyPrev.value) / yoyPrev.value * 100 : null;
    const mom = momPrev ? (cur.value - momPrev.value) / momPrev.value * 100 : null;
    return { cur, momPrev, yoyPrev, yoy, mom };
  })() : null;

  return (
    <div className="w-full" style={{ background: '#FFFFFF' }}>

      {/* ── KPI Row ── */}
      <div style={{ padding: '28px 16px 0' }}>
        <p className="section-label anim-fade-up delay-1" style={{ marginBottom: '14px' }}>交付数据概览</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }} className="anim-fade-up delay-2">
          <div className="kpi-card">
            <div style={{ fontSize: '10px', color: '#999', marginBottom: '6px', fontWeight: 500 }}>本月交付</div>
            <div style={{ fontSize: '26px', fontWeight: 300, letterSpacing: '-0.02em', color: '#0D0D0D', lineHeight: 1 }}>
              {(latestEntry.value / 10000).toFixed(2)}
              <span style={{ fontSize: '12px', fontWeight: 400, color: '#999', marginLeft: '3px' }}>万台</span>
            </div>
            {latestYoY && (
              <div style={{ marginTop: '6px' }}>
                <span className={+latestYoY >= 0 ? 'badge-green' : 'badge-red'}>
                  {+latestYoY >= 0 ? '▲' : '▼'} 同比 {latestYoY}%
                </span>
              </div>
            )}
          </div>
          <div className="kpi-card">
            <div style={{ fontSize: '10px', color: '#999', marginBottom: '6px', fontWeight: 500 }}>历史累计</div>
            <div style={{ fontSize: '26px', fontWeight: 300, letterSpacing: '-0.02em', color: '#0D0D0D', lineHeight: 1 }}>
              {(allTime / 10000).toFixed(1)}
              <span style={{ fontSize: '12px', fontWeight: 400, color: '#999', marginLeft: '3px' }}>万台</span>
            </div>
            <div style={{ marginTop: '6px' }}><span className="badge-blue">2021—2026</span></div>
          </div>
          <div className="kpi-card">
            <div style={{ fontSize: '10px', color: '#999', marginBottom: '6px', fontWeight: 500 }}>单月记录</div>
            <div style={{ fontSize: '26px', fontWeight: 300, letterSpacing: '-0.02em', color: '#0D0D0D', lineHeight: 1 }}>
              {(bestMonth.value / 10000).toFixed(1)}
              <span style={{ fontSize: '12px', fontWeight: 400, color: '#999', marginLeft: '3px' }}>万台</span>
            </div>
            <div style={{ marginTop: '6px' }}><span className="badge-blue">20{bestMonth.month.replace('-', '.')}</span></div>
          </div>
          <div className="kpi-card">
            <div style={{ fontSize: '10px', color: '#999', marginBottom: '6px', fontWeight: 500 }}>2025 全年</div>
            <div style={{ fontSize: '26px', fontWeight: 300, letterSpacing: '-0.02em', color: '#0D0D0D', lineHeight: 1 }}>
              {(total2025 / 10000).toFixed(1)}
              <span style={{ fontSize: '12px', fontWeight: 400, color: '#999', marginLeft: '3px' }}>万台</span>
            </div>
            <div style={{ marginTop: '6px' }}><span className="badge-green">▲ YoY +{yoy2025}%</span></div>
          </div>
        </div>
      </div>

      {/* ── Chart Shell ── */}
      <div style={{ padding: '20px 16px 0' }} className="anim-fade-up delay-3">
        <div className="chart-shell" style={{ padding: '20px 16px 16px' }}>

          {/* Header row with toggle */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div>
              <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#00A3DA', marginBottom: '4px' }}>
                全周期{viewMode === 'monthly' ? '月度' : '季度'}交付
              </p>
              <p style={{ fontSize: '18px', fontWeight: 300, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1 }}>
                2021 — 2026
              </p>
            </div>
            {/* Mode toggle */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
              <div style={{ display: 'flex', background: 'rgba(255,255,255,0.07)', borderRadius: '8px', padding: '3px', gap: '2px' }}>
                {(['monthly', 'quarterly'] as ViewMode[]).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    style={{
                      padding: '5px 10px', borderRadius: '6px', border: 'none',
                      fontSize: '10px', fontWeight: 600, letterSpacing: '0.06em', cursor: 'pointer',
                      transition: 'all 0.2s',
                      background: viewMode === mode ? '#FFFFFF' : 'transparent',
                      color: viewMode === mode ? '#0D0D0D' : 'rgba(255,255,255,0.35)',
                    }}
                  >
                    {mode === 'monthly' ? '月度' : '季度'}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em' }}>
                ← 左右滑动
              </div>
            </div>
          </div>

          {/* ── Bars ── */}
          <div
            ref={scrollRef}
            className="no-scrollbar"
            style={{ overflowX: 'auto', overflowY: 'hidden', cursor: 'grab', WebkitOverflowScrolling: 'touch' }}
            onMouseDown={e => {
              const el = e.currentTarget;
              const startX = e.pageX - el.offsetLeft;
              const initSL = el.scrollLeft;
              const onMove = (ev: MouseEvent) => { el.scrollLeft = initSL - (ev.pageX - el.offsetLeft - startX); };
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
              display: 'flex', alignItems: 'flex-end', gap: '3px',
              height: '210px', width: `${bars.length * (containerW + 3)}px`, paddingTop: '20px',
            }}>
              {bars.map((bar, i) => {
                const isLatest = i === bars.length - 1;
                const isBig = bar.value >= 30000;
                const isSelected = selectedIndex === i;
                const isHovered = hoveredIndex === i;
                const active = isSelected || isHovered;
                const pct = (bar.value / maxVal) * 100;
                const barBg = isLatest
                  ? 'linear-gradient(180deg, #00C3FF 0%, #00A3DA 100%)'
                  : active
                  ? 'linear-gradient(180deg, #2E6A9E 0%, #1E4A70 100%)'
                  : isBig
                  ? 'linear-gradient(180deg, #2A5F8A 0%, #1A3D5C 100%)'
                  : '#1A2535';

                return (
                  <div
                    key={bar.id}
                    onClick={() => setSelectedIndex(isSelected ? null : i)}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      justifyContent: 'flex-end', width: `${containerW}px`, flexShrink: 0,
                      height: '100%', paddingBottom: bar.isYearStart ? '28px' : '18px',
                      position: 'relative', cursor: 'pointer',
                    }}
                  >
                    {/* Top value label */}
                    {(active || isLatest) && (
                      <div style={{
                        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                        fontSize: '7px', fontWeight: 700, color: '#00A3DA', whiteSpace: 'nowrap',
                        background: 'rgba(0,163,218,0.15)', padding: '1px 4px', borderRadius: '3px',
                      }}>
                        {(bar.value / 1000).toFixed(1)}k
                      </div>
                    )}

                    {/* The bar */}
                    <div style={{
                      width: `${barW}px`, height: `${pct}%`, background: barBg,
                      borderRadius: '3px 3px 1px 1px', transition: 'background 0.15s', minHeight: '3px',
                      boxShadow: isLatest ? '0 0 12px rgba(0,163,218,0.6)' : isSelected ? '0 0 8px rgba(0,163,218,0.4)' : 'none',
                      outline: isSelected ? '1.5px solid rgba(0,163,218,0.65)' : 'none',
                      outlineOffset: '1px',
                    }} />

                    {/* Bottom labels */}
                    <div style={{ position: 'absolute', bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px' }}>
                      <div style={{
                        fontSize: '7px', fontWeight: 500, lineHeight: 1,
                        color: isLatest || isSelected ? '#00A3DA' : 'rgba(255,255,255,0.3)',
                      }}>
                        {bar.shortLabel}
                      </div>
                      {bar.isYearStart && (
                        <div style={{ fontSize: '7px', fontWeight: 600, lineHeight: 1, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.04em' }}>
                          {bar.yearStr.slice(2)}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Detail Panel ── */}
          {detail ? (
            <div style={{
              marginTop: '14px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(0,163,218,0.25)',
              borderRadius: '12px', padding: '14px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <div style={{ fontSize: '7px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '4px' }}>
                    {viewMode === 'monthly' ? '月度交付' : '季度交付'}
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#00A3DA' }}>{detail.cur.fullLabel}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '24px', fontWeight: 200, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {(detail.cur.value / 10000).toFixed(viewMode === 'monthly' ? 2 : 1)}
                  </div>
                  <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)' }}>万台</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {/* YoY */}
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '10px' }}>
                  <div style={{ fontSize: '7px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '6px' }}>同比 YoY</div>
                  {detail.yoy !== null ? (
                    <>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: trendColor(detail.yoy), lineHeight: 1, marginBottom: '4px' }}>
                        {trendArrow(detail.yoy)} {signStr(detail.yoy)}{detail.yoy.toFixed(1)}%
                      </div>
                      <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.22)' }}>去年同期 {fmtK(detail.yoyPrev!.value)}</div>
                    </>
                  ) : <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)' }}>暂无数据</div>}
                </div>
                {/* MoM */}
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '10px' }}>
                  <div style={{ fontSize: '7px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '6px' }}>环比 MoM</div>
                  {detail.mom !== null ? (
                    <>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: trendColor(detail.mom), lineHeight: 1, marginBottom: '4px' }}>
                        {trendArrow(detail.mom)} {signStr(detail.mom)}{detail.mom.toFixed(1)}%
                      </div>
                      <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.22)' }}>上期 {fmtK(detail.momPrev!.value)}</div>
                    </>
                  ) : <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)' }}>暂无数据</div>}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', fontSize: '10px', color: 'rgba(255,255,255,0.18)', padding: '10px 0 2px', marginTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)', letterSpacing: '0.06em' }}>
              点击柱子 查看同比 / 环比数据
            </div>
          )}

          {/* Legend */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'linear-gradient(180deg, #00C3FF, #00A3DA)', boxShadow: '0 0 6px rgba(0,163,218,0.5)' }} />
              <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>最新</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'linear-gradient(180deg, #2A5F8A, #1A3D5C)' }} />
              <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>≥3万台</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#1A2535' }} />
              <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>常规</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Annual Bar Summary ── */}
      <div style={{ padding: '20px 16px 0' }} className="anim-fade-up delay-4">
        <div style={{ background: '#F8F8F8', borderRadius: '16px', padding: '18px 16px', border: '1px solid #EBEBEB' }}>
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
                      height: '100%', width: `${pct}%`,
                      background: isLatestYear ? 'linear-gradient(90deg, #00A3DA, #00C3FF)' : 'linear-gradient(90deg, #B0C4D8, #8FADC4)',
                      borderRadius: '4px', transition: 'width 1s cubic-bezier(0.22, 1, 0.36, 1)',
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

      {/* ── Footer ── */}
      <footer style={{ padding: '36px 16px 48px', textAlign: 'center', marginTop: '8px' }}>
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
