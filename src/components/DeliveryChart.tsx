"use client";
import React, { useRef, useState, useEffect } from 'react';
import { FLAT_DELIVERY_DATA } from '@/constants/nioData';
import { useLang } from '@/contexts/LangContext';

type ViewMode = 'monthly' | 'quarterly' | 'yearly';

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

// 2026 annual target = 2025 full year × 1.45
const total2026   = FLAT_DELIVERY_DATA.filter(d => d.month.startsWith('26')).reduce((s, d) => s + d.value, 0);
const target2026  = Math.round(total2025 * 1.45);
const progress2026Pct = Math.min(total2026 / target2026, 1);  // cap at 100%

const YEARLY_BARS: BarData[] = ['21','22','23','24','25','26'].map(y => {
  const total = FLAT_DELIVERY_DATA.filter(d => d.month.startsWith(y)).reduce((s, d) => s + d.value, 0);
  return {
    id: `20${y}`,
    value: total,
    shortLabel: `20${y}`,
    fullLabel: `20${y}年`,
    isYearStart: true,
    yearStr: `20${y}`,
  };
});

// ── KPI stats ──────────────────────────────────────────────────────
const fmtK = (v: number) => v >= 10000 ? `${(v / 10000).toFixed(1)}万` : v.toLocaleString('zh-CN');
const signStr = (v: number) => v >= 0 ? '+' : '';
const trendColor = (v: number) => v >= 0 ? '#34C759' : '#FF453A';
const trendArrow = (v: number) => v >= 0 ? '▲' : '▼';

// ── Main Component ─────────────────────────────────────────────────
export default function DeliveryChart() {
  const { t } = useLang();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('monthly');
  const [selectedIndexOverride, setSelectedIndexOverride] = useState<number | 'latest' | null>('latest');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showTrend, setShowTrend] = useState(true);

  const bars = viewMode === 'monthly' ? MONTHLY_BARS : viewMode === 'quarterly' ? QUARTERLY_BARS : YEARLY_BARS;
  const maxVal = Math.max(...bars.map(b => b.value));
  const yoyOffset = viewMode === 'monthly' ? 12 : viewMode === 'quarterly' ? 4 : 1;
  const containerW = viewMode === 'monthly' ? 24 : viewMode === 'quarterly' ? 44 : 56;
  const barW = viewMode === 'monthly' ? 14 : viewMode === 'quarterly' ? 28 : 36;

  // Resolve selected index: 'latest' means always point at last bar
  const selectedIndex: number | null =
    selectedIndexOverride === 'latest'
      ? bars.length - 1
      : selectedIndexOverride;

  // Scroll to latest when view changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
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
        <p className="section-label anim-fade-up delay-1" style={{ marginBottom: '14px' }}>{t.sectionLabel}</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }} className="anim-fade-up delay-2">
          <div className="kpi-card">
            <div style={{ fontSize: '10px', color: '#999', marginBottom: '6px', fontWeight: 500 }}>{t.kpiThisMonth}</div>
            <div style={{ fontSize: '26px', fontWeight: 300, letterSpacing: '-0.02em', color: '#0D0D0D', lineHeight: 1 }}>
              {(latestEntry.value / 10000).toFixed(2)}
              <span style={{ fontSize: '12px', fontWeight: 400, color: '#999', marginLeft: '3px' }}>{t.kpiUnit}</span>
            </div>
            {latestYoY && (
              <div style={{ marginTop: '6px' }}>
                <span className={+latestYoY >= 0 ? 'badge-green' : 'badge-red'}>
                  {+latestYoY >= 0 ? '▲' : '▼'} {t.yoyLabel} {latestYoY}%
                </span>
              </div>
            )}
          </div>
          <div className="kpi-card">
            <div style={{ fontSize: '10px', color: '#999', marginBottom: '6px', fontWeight: 500 }}>{t.kpiAllTime}</div>
            <div style={{ fontSize: '26px', fontWeight: 300, letterSpacing: '-0.02em', color: '#0D0D0D', lineHeight: 1 }}>
              {(allTime / 10000).toFixed(1)}
              <span style={{ fontSize: '12px', fontWeight: 400, color: '#999', marginLeft: '3px' }}>{t.kpiUnit}</span>
            </div>
            <div style={{ marginTop: '6px' }}><span className="badge-blue">{t.kpiAllYears}</span></div>
          </div>
          <div className="kpi-card">
            <div style={{ fontSize: '10px', color: '#999', marginBottom: '6px', fontWeight: 500 }}>{t.kpiRecord}</div>
            <div style={{ fontSize: '26px', fontWeight: 300, letterSpacing: '-0.02em', color: '#0D0D0D', lineHeight: 1 }}>
              {(bestMonth.value / 10000).toFixed(1)}
              <span style={{ fontSize: '12px', fontWeight: 400, color: '#999', marginLeft: '3px' }}>{t.kpiUnit}</span>
            </div>
            <div style={{ marginTop: '6px' }}><span className="badge-blue">20{bestMonth.month.replace('-', '.')}</span></div>
          </div>
          <div className="kpi-card">
            <div style={{ fontSize: '10px', color: '#999', marginBottom: '6px', fontWeight: 500 }}>{t.kpi2025}</div>
            <div style={{ fontSize: '26px', fontWeight: 300, letterSpacing: '-0.02em', color: '#0D0D0D', lineHeight: 1 }}>
              {(total2025 / 10000).toFixed(1)}
              <span style={{ fontSize: '12px', fontWeight: 400, color: '#999', marginLeft: '3px' }}>{t.kpiUnit}</span>
            </div>
            <div style={{ marginTop: '6px' }}><span className="badge-green">▲ YoY +{yoy2025}%</span></div>
          </div>
        </div>

        {/* ── 2026 Annual Target Progress ── */}
        <div
          className="anim-fade-up delay-3"
          style={{
            marginTop: '12px',
            padding: '16px 18px',
            borderRadius: '14px',
            background: '#F7F9FF',
            border: '1px solid #E5E9F5',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div>
              <p style={{ fontSize: '10px', fontWeight: 700, color: '#0D0D0D', letterSpacing: '0.04em', marginBottom: '2px' }}>
                {t.target2026Label}
              </p>
              <p style={{ fontSize: '9px', color: '#999', letterSpacing: '0.02em' }}>
                {t.target2026SubLabel}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '20px', fontWeight: 300, color: '#0D0D0D', letterSpacing: '-0.02em', lineHeight: 1 }}>
                {(target2026 / 10000).toFixed(1)}
                <span style={{ fontSize: '10px', fontWeight: 400, color: '#999', marginLeft: '2px' }}>{t.kpiUnit}</span>
              </p>
              <p style={{ fontSize: '8px', color: '#999', marginTop: '2px' }}>TARGET</p>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ background: '#E5E9F5', borderRadius: '100px', height: '6px', overflow: 'hidden', marginBottom: '10px' }}>
            <div style={{
              width: `${progress2026Pct * 100}%`,
              height: '100%',
              borderRadius: '100px',
              background: 'linear-gradient(90deg, #00A3DA, #00C3FF)',
              transition: 'width 1s cubic-bezier(0.22,1,0.36,1)',
            }} />
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div>
                <p style={{ fontSize: '8px', color: '#999', marginBottom: '2px' }}>{t.target2026Current}</p>
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#00A3DA', letterSpacing: '-0.01em' }}>
                  {(total2026 / 10000).toFixed(1)}{t.kpiUnit}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '8px', color: '#999', marginBottom: '2px' }}>{t.target2026Gap}</p>
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#666', letterSpacing: '-0.01em' }}>
                  {((target2026 - total2026) / 10000).toFixed(1)}{t.kpiUnit}
                </p>
              </div>
            </div>
            <div style={{
              background: progress2026Pct >= 1 ? '#34C75920' : '#00A3DA15',
              border: `1px solid ${progress2026Pct >= 1 ? '#34C75950' : '#00A3DA40'}`,
              borderRadius: '100px',
              padding: '4px 10px',
              fontSize: '10px', fontWeight: 700,
              color: progress2026Pct >= 1 ? '#34C759' : '#00A3DA',
              letterSpacing: '0.04em',
            }}>
              {(progress2026Pct * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* ── Chart Shell ── */}
      <div style={{ padding: '0 16px 24px', marginTop: '20px', background: 'linear-gradient(to bottom, #FFFFFF 0%, #0B0F14 28px)' }} className="anim-fade-up delay-3">

        <div className="chart-shell" style={{ padding: '20px 16px 16px' }}>

          {/* Header row with toggle */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div>
              <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#00A3DA', marginBottom: '4px' }}>
                {t.chartCyclePrefix}{viewMode === 'monthly' ? t.chartTitleMonthly : viewMode === 'quarterly' ? t.chartTitleQuarterly : t.chartTitleYearly}

              </p>
              <p style={{ fontSize: '18px', fontWeight: 300, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1 }}>
                2021 — 2026
              </p>
            </div>
            {/* Mode toggle */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
              <div style={{ display: 'flex', background: 'rgba(255,255,255,0.07)', borderRadius: '8px', padding: '3px', gap: '2px' }}>
                {(['monthly', 'quarterly', 'yearly'] as ViewMode[]).map(mode => (

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
                    {mode === 'monthly' ? t.viewMonthly : mode === 'quarterly' ? t.viewQuarterly : t.viewYearly}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em' }}>
                {t.chartScroll}
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
            <div
              key={viewMode}
              style={{
              display: 'flex', alignItems: 'flex-end', gap: '3px',
              height: '210px', width: `${bars.length * (containerW + 3)}px`, paddingTop: '20px',
              position: 'relative',
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
                    onClick={() => setSelectedIndexOverride(selectedIndex === i ? 'latest' : i)}
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
                      transformOrigin: 'bottom center',
                      animation: `bar-grow 0.45s cubic-bezier(0.34,1.56,0.64,1) ${Math.min(i * 0.012, 0.5)}s both`,
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

              {/* ── Trend Line SVG overlay ── */}
              {showTrend && (() => {
                const BAR_AREA_H = 172; // 210 - 20(top) - 18(bottom)
                const TOP_OFFSET = 20;
                const pts = bars.map((bar, i) => ({
                  x: i * (containerW + 3) + containerW / 2,
                  y: TOP_OFFSET + BAR_AREA_H * (1 - bar.value / maxVal),
                }));
                // Smooth Catmull-Rom to cubic bezier path
                let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
                for (let i = 0; i < pts.length - 1; i++) {
                  const p0 = pts[Math.max(0, i - 1)];
                  const p1 = pts[i];
                  const p2 = pts[i + 1];
                  const p3 = pts[Math.min(pts.length - 1, i + 2)];
                  const cp1x = p1.x + (p2.x - p0.x) / 6;
                  const cp1y = p1.y + (p2.y - p0.y) / 6;
                  const cp2x = p2.x - (p3.x - p1.x) / 6;
                  const cp2y = p2.y - (p3.y - p1.y) / 6;
                  d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
                }
                return (
                  <svg
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', animation: 'trend-draw 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s both' }}
                    viewBox={`0 0 ${bars.length * (containerW + 3)} 210`}
                    preserveAspectRatio="none"
                  >
                    {/* Glow layer */}
                    <path d={d} stroke="rgba(0,195,255,0.25)" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    {/* Main line */}
                    <path d={d} stroke="#00C3FF" strokeWidth="1.5" fill="none" strokeDasharray="5 3" strokeLinecap="round" strokeLinejoin="round" />
                    {/* Dots at each point */}
                    {pts.map((p, i) => (
                      <circle key={i} cx={p.x} cy={p.y} r="2" fill="#00C3FF" opacity="0.7" />
                    ))}
                  </svg>
                );
              })()}
            </div>
          </div>

          {/* ── Detail Panel ── */}
          {detail ? (
            <div style={{
              marginTop: '14px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(0,163,218,0.25)',
              borderRadius: '12px', padding: '14px',
              animation: 'slide-up 0.3s cubic-bezier(0.22,1,0.36,1) both',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <div style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>
                    {viewMode === 'monthly' ? t.chartTitleMonthly : viewMode === 'quarterly' ? t.chartTitleQuarterly : t.chartTitleYearly}
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#00A3DA' }}>{detail.cur.fullLabel}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '24px', fontWeight: 200, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {(detail.cur.value / 10000).toFixed(viewMode === 'monthly' ? 2 : 1)}
                  </div>
                  <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)' }}>{t.kpiUnit}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {/* YoY */}
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '10px' }}>
                  <div style={{ fontSize: '7px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '6px' }}>{t.yoyLabel} YoY</div>
                  {detail.yoy !== null ? (
                    <>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: trendColor(detail.yoy), lineHeight: 1, marginBottom: '4px' }}>
                        {trendArrow(detail.yoy)} {signStr(detail.yoy)}{detail.yoy.toFixed(1)}%
                      </div>
                      <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.22)' }}>{t.prevYear} {fmtK(detail.yoyPrev!.value)}</div>
                    </>
                  ) : <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)' }}>{t.noComparison}</div>}
                </div>
                {/* MoM */}
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '10px' }}>
                  <div style={{ fontSize: '7px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '6px' }}>环比 MoM</div>
                  {detail.mom !== null ? (
                    <>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: trendColor(detail.mom), lineHeight: 1, marginBottom: '4px' }}>
                        {trendArrow(detail.mom)} {signStr(detail.mom)}{detail.mom.toFixed(1)}%
                      </div>
                      <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.22)' }}>{t.prevPeriod} {fmtK(detail.momPrev!.value)}</div>
                    </>
                  ) : <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)' }}>{t.noComparison}</div>}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', fontSize: '10px', color: 'rgba(255,255,255,0.18)', padding: '10px 0 2px', marginTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)', letterSpacing: '0.06em' }}>
              点击柱子 查看同比 / 环比数据
            </div>
          )}

          {/* Legend */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'linear-gradient(180deg, #00C3FF, #00A3DA)', boxShadow: '0 0 6px rgba(0,163,218,0.5)' }} />
              <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>{t.legendLatest}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'linear-gradient(180deg, #2A5F8A, #1A3D5C)' }} />
              <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>{t.legend30k}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#1A2535' }} />
              <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>{t.legendNormal}</span>
            </div>
            {/* Trend toggle */}
            <button
              onClick={() => setShowTrend(!showTrend)}
              style={{
                marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px',
                background: showTrend ? 'rgba(0,195,255,0.12)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${showTrend ? 'rgba(0,195,255,0.4)' : 'rgba(255,255,255,0.12)'}`,
                borderRadius: '100px', padding: '4px 10px', cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                <path d="M0 7 C2 7, 2 2, 4 2 C6 2, 6 5, 8 3.5 C10 2, 11 5, 14 1"
                  stroke={showTrend ? '#00C3FF' : 'rgba(255,255,255,0.3)'}
                  strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="3 2"
                />
              </svg>
              <span style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.08em', color: showTrend ? '#00C3FF' : 'rgba(255,255,255,0.3)' }}>
                {t.trendLine}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

