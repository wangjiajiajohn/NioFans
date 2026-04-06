"use client";
import React from 'react';
import Image from 'next/image';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import { POWER_DATA, SWAP_GROWTH_HISTORY } from '@/constants/nioData';
import { useLang } from '@/contexts/LangContext';
import CountUp from './CountUp';

// ── Custom Tooltip ──────────────────────────────────────────────────────────
interface TooltipPayload { value: number; }
function SwapTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(11,15,20,0.97)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(0,163,218,0.25)',
        padding: '10px 14px',
        borderRadius: '10px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.8)'
      }}>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '9px', marginBottom: '4px', letterSpacing: '0.06em' }}>{label}</p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
          <span style={{ color: '#00C3FF', fontSize: '18px', fontWeight: 700 }}>
            {payload[0].value.toLocaleString()}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '9px' }}>座</span>
        </div>
      </div>
    );
  }
  return null;
}

// ── Number Formatter ───────────────────────────────────────────────────────
function fmtMillion(n: number) {
  const m = n / 1_000_000;
  return m >= 100 ? m.toFixed(0) : m.toFixed(2);
}

// ── Main Component ──────────────────────────────────────────────────────────
export default function PowerSection() {
  const { t, lang } = useLang();
  const d = POWER_DATA;

  // Progress toward 4000 target (% of 2025 target)
  const progressPct = Math.min(d.swapStations / 4000, 1);

  const swapSessionsM = fmtMillion(d.totalSwapSessions);
  const chargeSessionsM = fmtMillion(d.totalChargeSessions);
  const thirdPartyM = (d.thirdPartyPoles / 10000).toFixed(1);

  return (
    <div className="w-full anim-fade-up" style={{ background: '#FFFFFF' }}>
      {/* ── Section Label ── */}
      <div style={{ padding: '24px 16px 0' }}>
        <p className="section-label" style={{ marginBottom: '14px' }}>
          {t.pwrSectionLabel}
        </p>
      </div>

      {/* ── Hero: Total Stations ── */}
      <div style={{
        background: 'linear-gradient(to bottom, #FFFFFF 0%, #0B0F14 28px)',
        padding: '0 16px 28px',
      }}>
        <div className="chart-shell" style={{ padding: '24px 20px', background: '#0B0F14', borderRadius: '24px' }}>

          {/* Top Hero Card */}
          <div style={{
            padding: '22px 20px',
            borderRadius: '16px',
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.08)',
            marginBottom: '16px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Ambient glow */}
            <div style={{
              position: 'absolute', top: 0, right: 0, width: '140px', height: '140px',
              background: 'radial-gradient(circle at 100% 0%, rgba(0,163,218,0.18), transparent 70%)',
              pointerEvents: 'none',
            }} />

            <p style={{ fontSize: '9px', fontWeight: 700, color: '#00A3DA', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '10px' }}>
              {t.pwrStationTotal}
            </p>

            {/* Headline number */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
              <span style={{ fontSize: '48px', fontWeight: 100, color: '#FFF', letterSpacing: '-0.03em', lineHeight: 1 }}>
                <CountUp end={d.totalStations} />
              </span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.35)' }}>{t.pwrUnit}</span>
            </div>
            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginBottom: '20px', letterSpacing: '0.02em' }}>
              {lang === 'zh' ? '蔚来能源充换电综合服务网络' : 'NIO Power Integrated Network'}
            </p>

            {/* Swap + Charge 2-column */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              <div style={{ background: 'rgba(0,163,218,0.08)', borderRadius: '12px', padding: '12px', border: '1px solid rgba(0,163,218,0.15)' }}>
                <p style={{ fontSize: '8px', color: 'rgba(255,255,255,0.35)', marginBottom: '6px', letterSpacing: '0.06em' }}>{t.pwrSwapTotal}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                  <span style={{ fontSize: '24px', fontWeight: 300, color: '#00C3FF' }}><CountUp end={d.swapStations} /></span>
                  <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)' }}>{t.pwrUnit}</span>
                </div>
                <p style={{ fontSize: '8px', color: '#00A3DA', marginTop: '6px' }}>
                  {lang === 'zh' ? `高速 ${d.swapHighway} 座` : `${d.swapHighway} highway`}
                </p>
              </div>
              <div style={{ background: 'rgba(0,200,150,0.06)', borderRadius: '12px', padding: '12px', border: '1px solid rgba(0,200,150,0.12)' }}>
                <p style={{ fontSize: '8px', color: 'rgba(255,255,255,0.35)', marginBottom: '6px', letterSpacing: '0.06em' }}>{t.pwrChargeStations}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                  <span style={{ fontSize: '24px', fontWeight: 300, color: '#00C896' }}><CountUp end={d.chargeStations} /></span>
                  <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)' }}>{t.pwrUnit}</span>
                </div>
                <p style={{ fontSize: '8px', color: '#00C896', marginTop: '6px' }}>
                  {lang === 'zh' ? `${d.chargePoles.toLocaleString()} 根充电桩` : `${d.chargePoles.toLocaleString()} poles`}
                </p>
              </div>
            </div>

            {/* Progress Bar toward 4000 target */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>
                  {lang === 'zh' ? '2025 年换电站部署目标' : '2025 Swap Station Target'}
                </span>
                <span style={{ fontSize: '9px', fontWeight: 700, color: '#00A3DA' }}>
                  {(progressPct * 100).toFixed(1)}% / 4,000
                </span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '100px', height: '6px', overflow: 'hidden' }}>
                <div style={{
                  width: `${progressPct * 100}%`,
                  height: '100%',
                  borderRadius: '100px',
                  background: 'linear-gradient(90deg, #00A3DA, #00E5FF)',
                  boxShadow: '0 0 10px rgba(0,195,255,0.5)',
                }} />
              </div>
            </div>
          </div>

          {/* ── Cumulative Sessions Block ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '14px', padding: '16px', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #00A3DA, transparent)' }} />
              <p style={{ fontSize: '8px', color: 'rgba(255,255,255,0.35)', marginBottom: '8px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {t.pwrTotalSessions}
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                <span style={{ fontSize: '22px', fontWeight: 200, color: '#FFF' }}>{swapSessionsM}</span>
                <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', marginLeft: '2px' }}>
                  {lang === 'zh' ? '百万次' : 'M times'}
                </span>
              </div>
              <p style={{ fontSize: '8px', color: 'rgba(255,255,255,0.2)', marginTop: '4px' }}>≈ {d.totalSwapSessions.toLocaleString()}</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '14px', padding: '16px', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #00C896, transparent)' }} />
              <p style={{ fontSize: '8px', color: 'rgba(255,255,255,0.35)', marginBottom: '8px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {t.pwrChargeSessions}
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                <span style={{ fontSize: '22px', fontWeight: 200, color: '#FFF' }}>{chargeSessionsM}</span>
                <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', marginLeft: '2px' }}>
                  {lang === 'zh' ? '百万次' : 'M times'}
                </span>
              </div>
              <p style={{ fontSize: '8px', color: 'rgba(255,255,255,0.2)', marginTop: '4px' }}>≈ {d.totalChargeSessions.toLocaleString()}</p>
            </div>
          </div>

          {/* ── Third-Party Network ── */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '14px',
            padding: '16px 18px',
            border: '1px solid rgba(255,255,255,0.05)',
            marginBottom: '16px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #8E5AFF, transparent)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  {t.pwrThirdParty}
                </p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontSize: '28px', fontWeight: 200, color: '#FFF' }}>{thirdPartyM}</span>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>
                    {lang === 'zh' ? '万根' : 'M poles'}
                  </span>
                </div>
                <p style={{ fontSize: '8px', color: 'rgba(255,255,255,0.2)', marginTop: '4px' }}>
                  {d.thirdPartyPoles.toLocaleString()} {lang === 'zh' ? '根' : 'poles'}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em', marginBottom: '6px' }}>{t.pwrThirdPartyRatio}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px', justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: '28px', fontWeight: 300, color: '#8E5AFF' }}>
                    <CountUp end={d.thirdPartyUserRatio} decimals={2} />
                  </span>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>%</span>
                </div>
                <div style={{
                  marginTop: '6px',
                  fontSize: '8px', fontWeight: 700, color: '#8E5AFF',
                  background: 'rgba(142,90,255,0.1)', padding: '2px 8px', borderRadius: '4px', display: 'inline-block'
                }}>
                  {lang === 'zh' ? '多品牌开放共享' : 'Multi-brand Open Access'}
                </div>
              </div>
            </div>
          </div>

          {/* ── Growth Trend Chart ── */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#00A3DA', marginBottom: '2px' }}>
                  {t.pwrGrowthTitle}
                </p>
                <p style={{ fontSize: '13px', fontWeight: 300, color: '#FFF', opacity: 0.85, letterSpacing: '-0.01em' }}>
                  {t.pwrGrowthSubtitle}
                </p>
              </div>
              <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.04em' }}>座</span>
            </div>
            <div style={{ height: '140px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={SWAP_GROWTH_HISTORY} margin={{ top: 8, right: 4, left: -28, bottom: 0 }}>
                  <defs>
                    <linearGradient id="swapGrowthGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00A3DA" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#00A3DA" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="period"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 8, fill: 'rgba(255,255,255,0.25)' }}
                    interval={1}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 7, fill: 'rgba(255,255,255,0.2)' }}
                    tickFormatter={(v) => `${(v/1000).toFixed(0)}k`}
                    domain={[0, 4200]}
                  />
                  <Tooltip content={<SwapTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="swapStations"
                    stroke="#00C3FF"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#swapGrowthGradient)"
                    dot={{ fill: '#00C3FF', r: 3, strokeWidth: 0 }}
                    activeDot={{ fill: '#FFF', r: 4, stroke: '#00C3FF', strokeWidth: 2 }}
                    animationDuration={1600}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div style={{ position: 'absolute', display: 'none' }} />
          </div>

          {/* ── China Coverage Map ── */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '10px' }}>
              <div>
                <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#00A3DA', marginBottom: '2px' }}>
                  {lang === 'zh' ? '网络覆盖分布' : 'NETWORK COVERAGE'}
                </p>
                <p style={{ fontSize: '13px', fontWeight: 300, color: '#FFF', opacity: 0.85, letterSpacing: '-0.01em' }}>
                  {lang === 'zh' ? '全国充换电站分布' : 'Station Map · China'}
                </p>
              </div>
              <a
                href="https://www.nio.cn/official-map"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '8px', color: '#00A3DA',
                  textDecoration: 'none', letterSpacing: '0.06em',
                  border: '1px solid rgba(0,163,218,0.3)',
                  padding: '3px 8px', borderRadius: '4px',
                  opacity: 0.8,
                }}
              >
                {lang === 'zh' ? '查看官网 →' : 'Official Map →'}
              </a>
            </div>

            {/* Map Image Card */}
            <div style={{
              borderRadius: '14px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.06)',
              position: 'relative',
              background: 'rgba(180,200,220,0.08)',
            }}>
              {/* Image */}
              <Image
                src="/power-map.png"
                alt="NIO Power station distribution map of China"
                width={2839}
                height={1723}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'cover',
                  maxHeight: '240px',
                  objectPosition: 'center center',
                  opacity: 0.9,
                  mixBlendMode: 'luminosity',
                  filter: 'contrast(1.1) brightness(0.9)',
                }}
                priority={false}
              />
              {/* Overlay: bottom gradient fade into dark */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
                background: 'linear-gradient(to bottom, transparent, #0B0F14)',
                pointerEvents: 'none',
              }} />
              {/* Station count badge */}
              <div style={{
                position: 'absolute', bottom: '10px', right: '12px',
                display: 'flex', alignItems: 'center', gap: '6px',
                background: 'rgba(11,15,20,0.85)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(0,163,218,0.25)',
                borderRadius: '8px',
                padding: '5px 10px',
              }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#00C3FF', boxShadow: '0 0 6px #00C3FF', display: 'inline-block' }} />
                <span style={{ fontSize: '9px', fontWeight: 700, color: '#FFF', letterSpacing: '0.04em' }}>
                  {d.totalStations.toLocaleString()}
                  <span style={{ fontWeight: 400, color: 'rgba(255,255,255,0.4)', marginLeft: '3px' }}>{t.pwrUnit}</span>
                </span>
              </div>
            </div>
          </div>

          {/* ── Data Source Footer ── */}
          <p style={{
            fontSize: '8px',
            color: 'rgba(255,255,255,0.18)',
            textAlign: 'center',
            lineHeight: 1.6,
            padding: '12px 12px 0',
            borderTop: '1px solid rgba(255,255,255,0.04)',
          }}>
            {t.pwrDataSource}
            <br />
            {lang === 'zh' ? `截至 ${d.updatedAt}` : `As of ${d.updatedAt}`}
          </p>
        </div>
      </div>
    </div>
  );
}
