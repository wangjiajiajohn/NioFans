"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useLang } from '@/contexts/LangContext';
import SPECIAL_DATA from '../../month-special-count.json';

type BrandId = 'ONVO' | 'Firefly' | 'NIO';

interface ModelConfig {
  id: string;
  name: string;
  brand: BrandId;
  tag: string;
  color: string;
}

interface BarEntry {
  label: string;   // e.g. "25.08"
  fullLabel: string; // e.g. "2025.08"
  value: number;
}

const MODEL_TAG_KEYS: Record<string, 'modelTagES8' | 'modelTagL90' | 'modelTagFirefly'> = {
  es8: 'modelTagES8',
  l90: 'modelTagL90',
  firefly: 'modelTagFirefly',
};

const MODELS: ModelConfig[] = [
  { id: 'es8',      name: 'ES8',    brand: 'NIO',     tag: '',  color: '#E8940A' },
  { id: 'l90',      name: 'L90',    brand: 'ONVO',    tag: '',  color: '#4E7CF6' },
  { id: 'firefly',  name: '萤火虫', brand: 'Firefly', tag: '',  color: '#00A3DA' },
];

/** Map component model ids → actual keys used in month-special-count.json */
const MODEL_JSON_KEY: Record<string, string> = {
  es8:     'es8',
  l90:     'L90',
  firefly: 'firefly',
};

/** Parse month-special-count.json into a sorted flat array for a given modelId */
function parseModelData(modelId: string): BarEntry[] {
  const jsonKey = MODEL_JSON_KEY[modelId] ?? modelId;
  const raw = SPECIAL_DATA as Record<string, Record<string, Record<string, number>>>;
  const result: BarEntry[] = [];
  for (const [year, months] of Object.entries(raw)) {
    for (const [month, cars] of Object.entries(months)) {
      if (typeof cars[jsonKey] === 'number') {
        result.push({
          label: `${year.slice(2)}.${month}`,
          fullLabel: `${year}.${month}`,
          value: cars[jsonKey],
        });
      }
    }
  }
  return result.sort((a, b) => a.fullLabel.localeCompare(b.fullLabel));
}

function fmtK(v: number) {
  return v >= 10000 ? `${(v / 10000).toFixed(1)}万` : v.toLocaleString();
}

export default function ModelSection() {
  const [activeId, setActiveId] = useState('es8');
  const [showTrend, setShowTrend] = useState(true);
  const { t } = useLang();

  // Zoom and scroll state
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedIndexOverride, setSelectedIndexOverride] = useState<number | 'latest' | null>('latest');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [barScale, setBarScale] = useState(1.8);
  const barScaleRef = useRef(1.8);
  const pinchRef = useRef<{ dist: number; scale: number } | null>(null);

  // Constants for scaling
  const BASE_CW = 22; // Base column width (spacing)
  const BASE_BW = 12; // Base bar width
  const colW = Math.max(12, Math.round(BASE_CW * barScale));
  const barW = Math.max(4, Math.round(BASE_BW * barScale));

  // Pinch-to-zoom logic
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    function dist(t: TouchList) {
      const dx = t[0].clientX - t[1].clientX;
      const dy = t[0].clientY - t[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    }
    function onStart(e: TouchEvent) {
      if (e.touches.length === 2)
        pinchRef.current = { dist: dist(e.touches), scale: barScaleRef.current };
    }
    function onMove(e: TouchEvent) {
      if (e.touches.length !== 2 || !pinchRef.current) return;
      e.preventDefault();
      const ratio = dist(e.touches) / pinchRef.current.dist;
      setBarScale(Math.min(3, Math.max(0.4, pinchRef.current.scale * ratio)));
    }
    function onEnd() { pinchRef.current = null; }
    el.addEventListener('touchstart', onStart, { passive: true });
    el.addEventListener('touchmove',  onMove,  { passive: false });
    el.addEventListener('touchend',   onEnd,   { passive: true });
    return () => {
      el.removeEventListener('touchstart', onStart);
      el.removeEventListener('touchmove',  onMove);
      el.removeEventListener('touchend',   onEnd);
    };
  }, []);

  // Update ref to latest scale for pinch logic
  useEffect(() => {
    barScaleRef.current = barScale;
  }, [barScale]);

  // Scroll to end when model changes or data loads
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [activeId]);

  const model = MODELS.find(m => m.id === activeId)!;
  const modelTag = t[MODEL_TAG_KEYS[activeId]];
  const chartData = parseModelData(activeId);

  const hasData = chartData.length > 0;
  const selectedIndex: number | null =
    selectedIndexOverride === 'latest' ? chartData.length - 1 : selectedIndexOverride;
  const latest = hasData ? chartData[chartData.length - 1] : null;
  const peak   = hasData ? chartData.reduce((a, b) => a.value > b.value ? a : b) : null;
  const cumulative = hasData ? chartData.reduce((sum, item) => sum + item.value, 0) : 0;
  const maxVal = peak?.value ?? 1;

  // Detail panel computation
  const detail = hasData && selectedIndex !== null ? (() => {
    const cur = chartData[selectedIndex];
    const momPrev = selectedIndex > 0 ? chartData[selectedIndex - 1] : null;
    // YoY for model data might be sparse, so find the same month in the previous year
    const curYear = +cur.fullLabel.split('.')[0];
    const curMonth = +cur.fullLabel.split('.')[1];
    const yoyPrev = chartData.find(d => {
      const dYear = +d.fullLabel.split('.')[0];
      const dMonth = +d.fullLabel.split('.')[1];
      return dYear === curYear - 1 && dMonth === curMonth;
    });
    const yoy = yoyPrev ? (cur.value - yoyPrev.value) / yoyPrev.value * 100 : null;
    const mom = momPrev ? (cur.value - momPrev.value) / momPrev.value * 100 : null;
    return { cur, momPrev, yoyPrev, yoy, mom };
  })() : null;

  return (
    <section style={{ background: '#0B0F14', padding: '0 0 48px' }}>

      {/* ── Section header ── */}
      <div style={{ padding: '28px 16px 0', marginBottom: '24px' }}>
        <p style={{
          fontSize: '9px', fontWeight: 700, letterSpacing: '0.26em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: '8px',
        }}>
          {t.modelSectionEyebrow}
        </p>
        <h2 style={{
          fontSize: '24px', fontWeight: 200, letterSpacing: '-0.01em',
          color: '#FFFFFF', lineHeight: 1.15,
        }}>
          {t.modelSectionTitle1}<br />{t.modelSectionTitle2}
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
            border: '1px solid rgba(255,255,255,0.12)',
            background: 'rgba(255,255,255,0.04)',
            animation: 'slide-up 0.35s cubic-bezier(0.22,1,0.36,1) both',
          }}
        >
          {/* Card top stripe */}
          <div style={{ height: '2px', background: `linear-gradient(90deg, ${model.color}, transparent)` }} />

          {/* Card header */}
          <div style={{ padding: '18px 18px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
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
                {modelTag}
              </p>
            </div>

            <div />
          </div>

          {/* ── Data view ── */}
          {hasData ? (
            <div style={{ padding: '20px 18px 32px' }}>

              {/* KPI row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '28px' }}>
                {/* Latest */}
                <div style={{
                  padding: '14px 16px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}>
                  <p style={{
                    fontSize: '7px', fontWeight: 700, letterSpacing: '0.14em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '8px',
                  }}>
                    {t.kpiThisMonth}
                  </p>
                  <p style={{ fontSize: '22px', fontWeight: 200, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {latest!.value.toLocaleString()}
                  </p>
                  <p style={{ fontSize: '8px', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>
                    {latest!.fullLabel}
                  </p>
                </div>
                {/* Peak */}
                <div style={{
                  padding: '14px 16px', borderRadius: '12px',
                  background: `${model.color}12`,
                  border: `1px solid ${model.color}30`,
                }}>
                  <p style={{
                    fontSize: '7px', fontWeight: 700, letterSpacing: '0.14em',
                    textTransform: 'uppercase', color: `${model.color}99`, marginBottom: '8px',
                  }}>
                    {t.kpiCumulative}
                  </p>
                  <p style={{ fontSize: '22px', fontWeight: 200, color: model.color, letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {fmtK(cumulative)}
                  </p>
                  <p style={{ fontSize: '8px', color: `${model.color}80`, marginTop: '4px' }}>
                    {chartData[0]?.fullLabel.slice(0, 4)}—{latest!.fullLabel.slice(0, 4)}
                  </p>
                </div>
              </div>

              {/* Chart title */}
              <div style={{ marginBottom: '8px' }}>
                <p style={{ fontSize: '8px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
                  {t.chartTitleMonthly}
                </p>
              </div>

              {/* Bar chart with optional trend overlay */}
              <div
                ref={scrollRef}
                className="no-scrollbar"
                style={{ position: 'relative', overflowX: 'auto', overflowY: 'hidden', WebkitOverflowScrolling: 'touch', cursor: 'grab' }}
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
                  display: 'flex', alignItems: 'center', height: '140px',
                  width: `${chartData.length * colW}px`,
                  position: 'relative',
                }}>
                  {chartData.map((d, i) => {
                    const ratio = d.value / maxVal;
                    const isLatest = i === chartData.length - 1;
                    const isPeak   = d.value === maxVal;
                    const isSelected = selectedIndex === i;
                    const isHovered = hoveredIndex === i;
                    const active = isSelected || isHovered;
                    const barFill = isPeak
                      ? `linear-gradient(180deg, ${model.color}, ${model.color}80)`
                      : active
                      ? `linear-gradient(180deg, ${model.color}99, ${model.color}40)`
                      : isLatest
                      ? 'rgba(255,255,255,0.25)'
                      : 'rgba(255,255,255,0.1)';

                    return (
                      <div
                        key={d.label}
                        onClick={() => setSelectedIndexOverride(selectedIndex === i ? 'latest' : i)}
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        style={{
                          width: `${colW}px`, flexShrink: 0, height: '100%',
                          display: 'flex', flexDirection: 'column',
                          cursor: 'pointer',
                        }}
                        title={`${d.fullLabel}: ${d.value.toLocaleString()}`}
                      >
                        {/* ── Chart Area (110px) ── */}
                        <div style={{
                          height: '110px', width: '100%', display: 'flex', flexDirection: 'column',
                          justifyContent: 'flex-end', alignItems: 'center', position: 'relative',
                        }}>
                          {/* Value label above bar */}
                          {(active || isLatest) && (
                            <span style={{
                              fontSize: '6px', fontWeight: 600,
                              color: active ? model.color : isLatest ? 'rgba(255,255,255,0.5)' : 'transparent',
                              whiteSpace: 'nowrap',
                              background: active ? `${model.color}15` : 'transparent',
                              padding: active ? '1px 3px' : '0',
                              borderRadius: '2px',
                              marginBottom: '2px',
                            }}>
                              {fmtK(d.value)}
                            </span>
                          )}
                          {/* Bar body: height is 80 * ratio */}
                          <div style={{
                            width: `${barW}px`,
                            height: `${Math.round(ratio * 80)}px`,
                            borderRadius: '2px 2px 1px 1px',
                            background: barFill,
                            boxShadow: isPeak ? `0 0 10px ${model.color}50` : isSelected ? `0 0 8px ${model.color}30` : 'none',
                            outline: isSelected ? `1.5px solid ${model.color}80` : 'none',
                            outlineOffset: '1px',
                            transition: 'height 0.6s cubic-bezier(0.22,1,0.36,1), background 0.2s',
                            minHeight: '2px',
                          }} />
                        </div>

                        {/* ── Label Area (30px) ── */}
                        <div style={{
                          height: '30px', width: '100%', display: 'flex', alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          <span style={{
                            fontSize: '7px',
                            color: isSelected ? model.color : isLatest ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)',
                            whiteSpace: 'nowrap',
                            letterSpacing: 0,
                            fontWeight: isSelected ? 700 : 400,
                          }}>
                            {d.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {/* SVG Catmull-Rom trend line */}
                  {showTrend && chartData.length >= 2 && (() => {
                    const TOP_PAD = 30;    // Top padding of the chart area within the 110px box
                    const AREA_H = 80;     // Active chart area height (110 - 30)
                    
                    const pts = chartData.map((d, i) => ({
                      x: i * colW + colW / 2,
                      y: TOP_PAD + AREA_H * (1 - d.value / maxVal),
                    }));
                    
                    let path = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
                    for (let i = 0; i < pts.length - 1; i++) {
                      const p0 = pts[Math.max(0, i - 1)];
                      const p1 = pts[i];
                      const p2 = pts[i + 1];
                      const p3 = pts[Math.min(pts.length - 1, i + 2)];
                      const cp1x = p1.x + (p2.x - p0.x) / 6;
                      const cp1y = p1.y + (p2.y - p0.y) / 6;
                      const cp2x = p2.x - (p3.x - p1.x) / 6;
                      const cp2y = p2.y - (p3.y - p1.y) / 6;
                      path += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
                    }
                    return (
                      <svg
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '110px', pointerEvents: 'none' }}
                        viewBox={`0 0 ${chartData.length * colW} 110`}
                        preserveAspectRatio="none"
                      >
                        <path d={path} stroke={`${model.color}30`} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        <path d={path} stroke={model.color} strokeWidth="1" fill="none"
                          strokeDasharray="4 2" strokeLinecap="round" strokeLinejoin="round" />
                        {pts.map((p, i) => {
                          const isSel = selectedIndex === i;
                          return (
                            <circle
                              key={i} cx={p.x} cy={p.y} r={isSel ? "2.5" : "1.5"}
                              fill={model.color} opacity={isSel ? "1" : "0.8"}
                              stroke={isSel ? "#000" : "none"} strokeWidth="0.5"
                            />
                          );
                        })}
                      </svg>
                    );
                  })()}
                </div>
              </div>

              {/* ── Detail Panel for Model ── */}
              {detail && (
                <div style={{
                  marginTop: '14px',
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${model.color}25`,
                  borderRadius: '12px', padding: '14px',
                  animation: 'slide-up 0.3s cubic-bezier(0.22,1,0.36,1) both',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div>
                      <div style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '4px' }}>
                        {t.chartTitleMonthly}
                      </div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: model.color }}>{detail.cur.fullLabel}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '24px', fontWeight: 200, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>
                        {(detail.cur.value / 10000).toFixed(2)}
                      </div>
                      <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)' }}>{t.kpiUnit}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {/* YoY */}
                    <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '10px' }}>
                      <div style={{ fontSize: '7px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: '6px' }}>{t.yoyLabel} YoY</div>
                      {detail.yoy !== null ? (
                        <>
                          <div style={{ fontSize: '15px', fontWeight: 700, color: detail.yoy >= 0 ? '#34C759' : '#FF453A', lineHeight: 1, marginBottom: '4px' }}>
                            {detail.yoy >= 0 ? '▲' : '▼'} {detail.yoy >= 0 ? '+' : ''}{detail.yoy.toFixed(1)}%
                          </div>
                          <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.2)' }}>{t.prevYear} {fmtK(detail.yoyPrev!.value)}</div>
                        </>
                      ) : <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.15)' }}>{t.noComparison}</div>}
                    </div>
                    {/* MoM */}
                    <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '10px' }}>
                      <div style={{ fontSize: '7px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: '6px' }}>环比 MoM</div>
                      {detail.mom !== null ? (
                        <>
                          <div style={{ fontSize: '15px', fontWeight: 700, color: detail.mom >= 0 ? '#34C759' : '#FF453A', lineHeight: 1, marginBottom: '4px' }}>
                            {detail.mom >= 0 ? '▲' : '▼'} {detail.mom >= 0 ? '+' : ''}{detail.mom.toFixed(1)}%
                          </div>
                          <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.2)' }}>{t.prevPeriod} {fmtK(detail.momPrev!.value)}</div>
                        </>
                      ) : <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.15)' }}>{t.noComparison}</div>}
                    </div>
                  </div>
                </div>
              )}

              {/* Trend toggle below chart */}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }}>
                <button
                  onClick={() => setShowTrend(v => !v)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '4px',
                    background: showTrend ? 'rgba(0,195,255,0.12)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${showTrend ? 'rgba(0,195,255,0.4)' : 'rgba(255,255,255,0.12)'}`,
                    borderRadius: '100px', padding: '4px 10px', cursor: 'pointer', transition: 'all 0.2s',
                  }}
                >
                  <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
                    <path d="M0 6 C1.5 6, 2 1.5, 3.5 1.5 C5 1.5, 5 4, 6.5 3 C8 2, 9 4, 12 0.5"
                      stroke={showTrend ? '#00C3FF' : 'rgba(255,255,255,0.25)'}
                      strokeWidth="1.4" fill="none" strokeLinecap="round" strokeDasharray="3 2" />
                  </svg>
                  <span style={{ fontSize: '8px', fontWeight: 600, color: showTrend ? '#00C3FF' : 'rgba(255,255,255,0.25)', letterSpacing: '0.06em' }}>
                    {t.modelTrendLine}
                  </span>
                </button>
              </div>

              {/* ── AI Forecast Section (Firefly Only) ── */}
              {model.id === 'firefly' && (
                <div style={{
                  marginTop: '24px', padding: '16px',
                  background: 'linear-gradient(135deg, rgba(0,195,255,0.08) 0%, rgba(0,195,255,0.03) 100%)',
                  border: '1px solid rgba(0,195,255,0.2)', borderRadius: '14px',
                  animation: 'fade-in 0.6s ease-out both',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <div style={{
                      padding: '4px 8px', borderRadius: '4px', background: '#00C3FF',
                      color: '#000', fontSize: '9px', fontWeight: 900, textTransform: 'uppercase',
                    }}>AI 推演</div>
                    <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#fff', margin: 0 }}>2026 年度销量预测</h4>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ flex: 1, padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', margin: '0 0 4px 0' }}>年度总预估</p>
                      <p style={{ fontSize: '18px', fontWeight: 700, color: '#00C3FF', margin: 0 }}>~11.5 <span style={{ fontSize: '10px' }}>万台</span></p>
                    </div>
                    <div style={{ flex: 1, padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', margin: '0 0 4px 0' }}>峰值月度 (12月)</p>
                      <p style={{ fontSize: '18px', fontWeight: 700, color: '#fff', margin: 0 }}>~1.85 <span style={{ fontSize: '10px' }}>万台</span></p>
                    </div>
                  </div>

                  <div style={{ padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                    <p style={{ fontSize: '9px', fontWeight: 600, color: 'rgba(0,195,255,0.8)', marginBottom: '6px', textTransform: 'uppercase' }}>推演过程 (SCM 模型)</p>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {[
                        '以 2026.03 实际交付 (6,119台) 为基准锚点',
                        '应用 NIO 品牌五年期“季节性修正指数”',
                        '平滑 2025 首发爬坡期异常波动 (剔除异常 MoM)',
                        '拟合 Q4 年底冲刺效应 (季节性权重系数 1.8x - 2.5x)'
                      ].map((text, i) => (
                        <li key={i} style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', display: 'flex', gap: '6px' }}>
                          <span style={{ color: '#00C3FF' }}>•</span> {text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Data source note */}
              <p style={{
                marginTop: '16px', fontSize: '8px',
                color: 'rgba(255,255,255,0.2)', letterSpacing: '0.04em', textAlign: 'center',
              }}>
                Source · NIO Official Monthly Reports
              </p>
            </div>

          ) : (
            /* ── Coming-soon state ── */
            <div style={{
              padding: '44px 24px 40px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
            }}>
              {/* Outline waveform placeholder */}
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
                {t.modelComingSoon}
              </div>

              <p style={{
                fontSize: '11px', fontWeight: 300, color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.7, maxWidth: '220px', letterSpacing: '0.02em',
              }}>
                {model.brand} {model.name} {t.modelDataComingSoonDesc1 ?? ''}<br />
                {t.modelComingDesc}
              </p>
            </div>
          )}
        </div>
      </div>


    </section>
  );
}
