"use client";
import React, { useState } from 'react';
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
  const { t } = useLang();

  const model = MODELS.find(m => m.id === activeId)!;
  const modelTag = t[MODEL_TAG_KEYS[activeId]];
  const chartData = parseModelData(activeId);

  const hasData = chartData.length > 0;
  const latest = hasData ? chartData[chartData.length - 1] : null;
  const peak   = hasData ? chartData.reduce((a, b) => a.value > b.value ? a : b) : null;
  const maxVal = peak?.value ?? 1;

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
              {modelTag}
            </p>
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
                    {t.kpiRecord}
                  </p>
                  <p style={{ fontSize: '22px', fontWeight: 200, color: model.color, letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {fmtK(peak!.value)}
                  </p>
                  <p style={{ fontSize: '8px', color: `${model.color}80`, marginTop: '4px' }}>
                    {peak!.fullLabel}
                  </p>
                </div>
              </div>

              {/* Bar chart */}
              <div style={{ position: 'relative' }}>
                {/* Y-axis grid lines */}
                {[1, 0.5].map(pct => (
                  <div key={pct} style={{
                    position: 'absolute', left: 0, right: 0,
                    bottom: `calc(26px + ${pct * 100}% - ${pct * 100}px)`,
                    borderTop: '1px dashed rgba(255,255,255,0.06)',
                    pointerEvents: 'none',
                  }} />
                ))}

                {/* Bars */}
                <div style={{
                  display: 'flex', alignItems: 'flex-end', gap: '4px',
                  height: '100px',
                }}>
                  {chartData.map((d, i) => {
                    const pct = (d.value / maxVal) * 100;
                    const isLatest = i === chartData.length - 1;
                    const isPeak   = d.value === maxVal;
                    return (
                      <div
                        key={d.label}
                        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}
                        title={`${d.fullLabel}: ${d.value.toLocaleString()}`}
                      >
                        {/* Value label above bar */}
                        <span style={{
                          fontSize: '6px', fontWeight: 600,
                          color: isPeak ? model.color : isLatest ? 'rgba(255,255,255,0.5)' : 'transparent',
                          whiteSpace: 'nowrap',
                        }}>
                          {fmtK(d.value)}
                        </span>
                        {/* Bar body */}
                        <div style={{
                          width: '100%',
                          height: `${pct}%`,
                          borderRadius: '2px 2px 1px 1px',
                          background: isPeak
                            ? `linear-gradient(180deg, ${model.color}, ${model.color}80)`
                            : isLatest
                              ? 'rgba(255,255,255,0.25)'
                              : 'rgba(255,255,255,0.1)',
                          boxShadow: isPeak ? `0 0 10px ${model.color}50` : 'none',
                          transition: 'height 0.6s cubic-bezier(0.22,1,0.36,1)',
                        }} />
                        {/* X-axis label */}
                        <span style={{
                          fontSize: '7px',
                          color: isLatest ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)',
                          whiteSpace: 'nowrap',
                          letterSpacing: 0,
                        }}>
                          {d.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Data source note */}
              <p style={{
                marginTop: '16px', fontSize: '8px',
                color: 'rgba(255,255,255,0.2)', letterSpacing: '0.04em', textAlign: 'center',
              }}>
                {t.prevYear !== '' ? '' : ''}
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
