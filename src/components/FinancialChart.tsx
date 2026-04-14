"use client";
import React, { useState, useMemo, useRef } from 'react';
import {
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer,
  Cell, AreaChart, Area, ReferenceLine
} from 'recharts';
import {
  FINANCIAL_QUARTERLY, FINANCIAL_ANNUAL,
  FINANCIAL_ANNUAL_SNAPSHOT
} from '@/constants/nioData';
import { useLang } from '@/contexts/LangContext';
import CountUp from './CountUp';

type MetricType = 'revenue' | 'grossMargin' | 'vehicleMargin' | 'netLoss' | 'rd';
type PeriodType = 'quarterly' | 'annual';

// ── Custom Tooltip ────────────────────────────────────────
interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  metric: MetricType;
}

const CustomTooltip = ({ active, payload, label, metric }: TooltipProps) => {
  if (active && payload && payload.length) {
    const val = payload[0].value;
    const metricVal = metric === 'netLoss' ? (payload[0].payload.netLoss ?? -val) : val;
    const isProfit = metric === 'netLoss' && metricVal > 0;
    const isLoss = metric === 'netLoss' && metricVal < 0;
    const unit = metric === 'revenue' || metric === 'netLoss' || metric === 'rd' ? '亿' : '%';
    const displayColor = isProfit ? '#00C896' : isLoss ? '#FF6B6B' : '#FFF';
    
    return (
      <div style={{
        background: 'rgba(11, 15, 20, 0.97)',
        backdropFilter: 'blur(12px)',
        border: `1px solid ${isLoss ? 'rgba(255,92,92,0.2)' : isProfit ? 'rgba(0,200,150,0.2)' : 'rgba(255,255,255,0.1)'}`,
        padding: '10px 14px',
        borderRadius: '10px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.8)'
      }}>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '9px', marginBottom: '3px', letterSpacing: '0.06em' }}>{label}</p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
          <span style={{ color: displayColor, fontSize: '18px', fontWeight: 700 }}>
            {metric === 'netLoss' ? (metricVal > 0 ? `+${metricVal.toFixed(1)}` : metricVal.toFixed(1)) : val.toFixed(metric === 'revenue' || metric === 'rd' ? 1 : 1)}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '9px' }}>{unit}</span>
        </div>
      </div>
    );
  }
  return null;
};

// ── Sub Chart ─────────────────────────────────────────────
interface SubChartProps {
  title: string;
  subtitle: string;
  metric: MetricType;
  period: PeriodType;
  data: any[];
  axisLabel: string;
}

function FinancialSubChart({ title, subtitle, metric, period, data, axisLabel }: SubChartProps) {
  const colors: Record<MetricType, string> = {
    revenue:       '#00A3DA',
    grossMargin:   '#8E5AFF',
    vehicleMargin: '#00E5FF',
    netLoss:       '#FF6B6B',
    rd:            '#00C896',
  };
  const mainColor = colors[metric];
  const isLoss = metric === 'netLoss';

  // For net loss we display absolute value bars (all positive) with red color
  const chartData = useMemo(() => {
    if (isLoss) {
      return data.map(d => ({ ...d, netLossAbs: Math.abs(d.netLoss) }));
    }
    return data;
  }, [data, isLoss]);

  const dataKey = isLoss ? 'netLossAbs' : metric;

  return (
    <div style={{ padding: '0 0 36px', position: 'relative' }}>
      {/* Chart header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', paddingLeft: '4px' }}>
        <div>
          <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: mainColor, marginBottom: '2px' }}>
            {title}
          </p>
          <p style={{ fontSize: '14px', fontWeight: 300, color: '#FFFFFF', letterSpacing: '-0.01em', lineHeight: 1, opacity: 0.85 }}>
            {subtitle}
          </p>
        </div>
        <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em', marginTop: '2px' }}>
          {axisLabel}
        </span>
      </div>

      {/* Chart */}
      <div style={{ height: '150px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          {metric === 'revenue' ? (
            <BarChart data={data} margin={{ top: 8, right: 20, left: -22, bottom: 0 }}>
              <defs>
                <linearGradient id="barGradientFin" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#00C3FF" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#00A3DA" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="period" axisLine={false} tickLine={false}
                tick={{ fontSize: 8, fill: 'rgba(255,255,255,0.3)' }}
                interval={period === 'quarterly' ? 3 : 0}
              />
              <Tooltip content={<CustomTooltip metric={metric} />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="revenue" radius={[3, 3, 0, 0]}>
                {data.map((_entry, index) => (
                  <Cell key={`cell-${index}`}
                    fill={index === data.length - 1 ? '#00A3DA' : 'url(#barGradientFin)'}
                  />
                ))}
              </Bar>
            </BarChart>
          ) : metric === 'netLoss' ? (
            <BarChart data={chartData} margin={{ top: 8, right: 20, left: -22, bottom: 0 }}>
              <defs>
                <linearGradient id="lossGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#FF6B6B" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#FF6B6B" stopOpacity={0.15}/>
                </linearGradient>
                <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#00C896" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#00C896" stopOpacity={0.15}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="period" axisLine={false} tickLine={false}
                tick={{ fontSize: 8, fill: 'rgba(255,255,255,0.3)' }}
                interval={period === 'quarterly' ? 3 : 0}
              />
              <Tooltip content={<CustomTooltip metric={metric} />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="netLossAbs" radius={[3, 3, 0, 0]}>
                {chartData.map((d, index) => (
                  <Cell key={`cell-${index}`} fill={d.netLoss > 0 ? 'url(#profitGradient)' : 'url(#lossGradient)'} />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <AreaChart data={data} margin={{ top: 8, right: 20, left: -22, bottom: 0 }}>
              <defs>
                <linearGradient id={`areaGradient-${metric}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={mainColor} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={mainColor} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="period" axisLine={false} tickLine={false}
                tick={{ fontSize: 8, fill: 'rgba(255,255,255,0.3)' }}
                interval={period === 'quarterly' ? 3 : 0}
              />
              <ReferenceLine y={0} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
              <Tooltip content={<CustomTooltip metric={metric} />} />
              <Area type="monotone" dataKey={metric}
                stroke={mainColor} strokeWidth={1.5}
                fillOpacity={1} fill={`url(#areaGradient-${metric})`}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* bottom divider */}
      <div style={{ position: 'absolute', bottom: '12px', left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.04)' }} />
    </div>
  );
}

// ── Annual Snapshot Card ───────────────────────────────────
interface SnapshotCardProps {
  year: string;
  revenue: number;
  netLoss: number;
  grossMargin: number;
  rd: number;
  estimated?: boolean;
  isLatest?: boolean;
}

function AnnualSnapshotCard({ year, revenue, netLoss, grossMargin, rd, estimated, isLatest }: SnapshotCardProps) {
  const lossAbs = Math.abs(netLoss);
  // Severity of loss for color coding
  const lossColor = lossAbs > 150 ? '#FF4444' : lossAbs > 80 ? '#FF6B6B' : lossAbs > 30 ? '#FFB347' : '#FFD700';

  return (
    <div style={{
      flexShrink: 0,
      width: '148px',
      background: isLatest
        ? 'linear-gradient(135deg, rgba(0,163,218,0.15) 0%, rgba(0,163,218,0.05) 100%)'
        : 'rgba(255,255,255,0.04)',
      border: isLatest ? '1px solid rgba(0,163,218,0.35)' : '1px solid rgba(255,255,255,0.07)',
      borderRadius: '14px',
      padding: '14px 12px',
    }}>
      {/* Year header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
        <span style={{
          fontSize: '15px', fontWeight: 700, color: isLatest ? '#00A3DA' : 'rgba(255,255,255,0.9)',
          letterSpacing: '-0.01em'
        }}>{year}</span>
        {estimated && (
          <span style={{
            fontSize: '7px', fontWeight: 700, padding: '2px 5px',
            background: 'rgba(255,163,0,0.15)', color: '#FFB347',
            borderRadius: '3px', letterSpacing: '0.04em'
          }}>EST</span>
        )}
      </div>

      {/* Revenue */}
      <div style={{ marginBottom: '8px' }}>
        <p style={{ fontSize: '7px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em', marginBottom: '2px' }}>营业收入</p>
        <p style={{ fontSize: '16px', fontWeight: 300, color: '#FFF', letterSpacing: '-0.01em', lineHeight: 1 }}>
          {revenue.toFixed(0)}<span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', marginLeft: '2px' }}>亿</span>
        </p>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '8px' }} />

      {/* Gross Margin */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <p style={{ fontSize: '7px', color: 'rgba(255,255,255,0.3)' }}>综合毛利率</p>
        <p style={{ fontSize: '11px', fontWeight: 600, color: grossMargin > 10 ? '#00C896' : grossMargin > 0 ? '#FFB347' : '#FF6B6B' }}>
          {grossMargin.toFixed(1)}%
        </p>
      </div>

      {/* Net Loss */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <p style={{ fontSize: '7px', color: 'rgba(255,255,255,0.3)' }}>{netLoss > 0 ? '净利润' : '净亏损'}</p>
        <p style={{ fontSize: '11px', fontWeight: 600, color: netLoss > 0 ? '#00C896' : lossColor }}>
          {netLoss > 0 ? '+' : '-'}{lossAbs.toFixed(0)}<span style={{ fontSize: '8px', marginLeft: '1px', opacity: 0.7 }}>亿</span>
        </p>
      </div>

      {/* R&D */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: '7px', color: 'rgba(255,255,255,0.3)' }}>研发投入</p>
        <p style={{ fontSize: '11px', fontWeight: 600, color: '#00C896' }}>
          {rd.toFixed(0)}<span style={{ fontSize: '8px', marginLeft: '1px', opacity: 0.7 }}>亿</span>
        </p>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────
export default function FinancialChart() {
  const { t } = useLang();
  const [period, setPeriod] = useState<PeriodType>('quarterly');
  const latest = FINANCIAL_ANNUAL_SNAPSHOT[FINANCIAL_ANNUAL_SNAPSHOT.length - 1];
  const scrollRef = useRef<HTMLDivElement>(null);

  const data = useMemo(() => {
    return period === 'quarterly' ? FINANCIAL_QUARTERLY : FINANCIAL_ANNUAL;
  }, [period]);

  // Latest quarter data
  const latestQ = FINANCIAL_QUARTERLY[FINANCIAL_QUARTERLY.length - 1];

  const dateRange = period === 'quarterly' ? '2020 — 2026' : '2020 — 2026';

  return (
    <div style={{ marginTop: '0px' }}>
      {/* Gradient transition white → dark */}
      <div style={{
        background: 'linear-gradient(to bottom, #FFFFFF 0%, #0B0F14 28px)',
        padding: '0 16px 32px'
      }}>
        <div className="chart-shell" style={{ padding: '20px 18px', background: '#0B0F14', borderRadius: '24px' }}>

          {/* ── KPI Summary Header ────────────────────── */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            padding: '18px 16px',
            marginBottom: '28px'
          }}>
            {/* Top row: quarter label + prediction badge + period toggle */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <p style={{ fontSize: '10px', fontWeight: 800, color: '#00A3DA', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                    {latestQ.period.replace('Q', 'Q')} {t.finForecast}
                  </p>
                  <span style={{
                    fontSize: '8px', fontWeight: 900, padding: '2px 8px',
                    background: '#00A3DA', color: '#FFF',
                    borderRadius: '4px', letterSpacing: '0.06em',
                  }}>PREDICTION</span>
                </div>
                {/* Main revenue number */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
                  <span style={{ fontSize: '36px', fontWeight: 200, color: '#FFF', letterSpacing: '-0.02em' }}>
                    <CountUp end={latestQ.revenue} decimals={1} />
                  </span>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>{t.unitRmbBn}</span>
                </div>
              </div>

              {/* Period Toggle */}
              <div style={{ display: 'flex', background: 'rgba(255,255,255,0.07)', borderRadius: '8px', padding: '3px', gap: '2px' }}>
                {(['quarterly', 'annual'] as PeriodType[]).map(p => (
                  <button key={p} onClick={() => setPeriod(p)} style={{
                    padding: '5px 10px', borderRadius: '6px', border: 'none',
                    fontSize: '9px', fontWeight: 600, letterSpacing: '0.04em', cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: period === p ? '#FFFFFF' : 'transparent',
                    color: period === p ? '#0D0D0D' : 'rgba(255,255,255,0.3)',
                  }}>
                    {p === 'quarterly' ? t.quarterly : t.annual}
                  </button>
                ))}
              </div>
            </div>

            {/* 5 metric mini-cards grid: 2+3 layout */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
              {/* 综合毛利率 */}
              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '10px 10px', borderLeft: '2px solid #8E5AFF' }}>
                <p style={{ fontSize: '7px', color: 'rgba(255,255,255,0.3)', marginBottom: '3px', letterSpacing: '0.06em' }}>{t.grossMargin}</p>
                <p style={{ fontSize: '17px', fontWeight: 600, color: '#FFF' }}>
                  <CountUp end={latestQ.grossMargin} decimals={1} />%
                </p>
              </div>
              {/* 汽车毛利率 */}
              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '10px 10px', borderLeft: '2px solid #00E5FF' }}>
                <p style={{ fontSize: '7px', color: 'rgba(255,255,255,0.3)', marginBottom: '3px', letterSpacing: '0.06em' }}>{t.vehicleMargin}</p>
                <p style={{ fontSize: '17px', fontWeight: 600, color: '#FFF' }}>
                  <CountUp end={latestQ.vehicleMargin} decimals={1} />%
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              {/* 净损益 */}
              <div style={{ 
                background: latestQ.netLoss > 0 ? 'rgba(0,200,150,0.06)' : 'rgba(255,92,92,0.06)', 
                borderRadius: '10px', padding: '10px 8px', 
                borderLeft: `2px solid ${latestQ.netLoss > 0 ? '#00C896' : '#FF6B6B'}` 
              }}>
                <p style={{ fontSize: '7px', color: 'rgba(255,255,255,0.3)', marginBottom: '3px', letterSpacing: '0.04em' }}>{latestQ.netLoss > 0 ? '净利润' : t.finNetLoss}</p>
                <p style={{ fontSize: '14px', fontWeight: 600, color: latestQ.netLoss > 0 ? '#00C896' : '#FF6B6B' }}>
                  {latestQ.netLoss > 0 ? '+' : '-'}<CountUp end={Math.abs(latestQ.netLoss)} decimals={1} />
                  <span style={{ fontSize: '8px', opacity: 0.7 }}>亿</span>
                </p>
              </div>
              {/* 现金储备 */}
              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '10px 8px', borderLeft: '2px solid rgba(255,255,255,0.2)' }}>
                <p style={{ fontSize: '7px', color: 'rgba(255,255,255,0.3)', marginBottom: '3px', letterSpacing: '0.04em' }}>{t.finKpiCash}</p>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#FFF' }}>
                  {latestQ.cash ?? 459}<span style={{ fontSize: '8px', opacity: 0.5 }}>亿</span>
                </p>
              </div>
              {/* 季度研发 */}
              <div style={{ background: 'rgba(0,200,150,0.06)', borderRadius: '10px', padding: '10px 8px', borderLeft: '2px solid #00C896' }}>
                <p style={{ fontSize: '7px', color: 'rgba(255,255,255,0.3)', marginBottom: '3px', letterSpacing: '0.04em' }}>{t.finKpiRD}</p>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#00C896' }}>
                  <CountUp end={latestQ.rd} decimals={1} />
                  <span style={{ fontSize: '8px', opacity: 0.7 }}>亿</span>
                </p>
              </div>
            </div>
          </div>

          {/* ── Charts ───────────────────────────────── */}

          {/* 1. 营业收入 */}
          <FinancialSubChart
            title={t.revenue}
            subtitle={dateRange}
            metric="revenue"
            period={period}
            data={data}
            axisLabel={t.unitRmbBn}
          />

          {/* 2. 综合毛利率 */}
          <FinancialSubChart
            title={t.grossMargin}
            subtitle={dateRange}
            metric="grossMargin"
            period={period}
            data={data}
            axisLabel={t.unitPercent}
          />

          {/* 3. 汽车毛利率 */}
          <FinancialSubChart
            title={t.vehicleMargin}
            subtitle={dateRange}
            metric="vehicleMargin"
            period={period}
            data={data}
            axisLabel={t.unitPercent}
          />

          {/* 4. 净亏损趋势（扭亏之路） */}
          <FinancialSubChart
            title={t.finNetLossChart}
            subtitle={dateRange}
            metric="netLoss"
            period={period}
            data={data}
            axisLabel={t.finNetLossAxis}
          />

          {/* 5. 研发投入 */}
          <FinancialSubChart
            title={t.finRDChart}
            subtitle={dateRange}
            metric="rd"
            period={period}
            data={data}
            axisLabel={t.finRDAxis}
          />

          {/* ── Annual Snapshot Cards ─────────────────── */}
          <div style={{ marginTop: '4px', marginBottom: '20px' }}>
            {/* Section label */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px', paddingLeft: '4px' }}>
              <div>
                <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#00A3DA', marginBottom: '2px' }}>
                  {t.finAnnualSnapshot}
                </p>
                <p style={{ fontSize: '14px', fontWeight: 300, color: '#FFFFFF', opacity: 0.85, letterSpacing: '-0.01em', lineHeight: 1 }}>
                  {t.finAnnualSnapshotSub}
                </p>
              </div>
              <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.04em' }}>← 滑动</span>
            </div>

            {/* Horizontal scroll cards */}
            <div
              ref={scrollRef}
              className="no-scrollbar"
              style={{
                display: 'flex',
                gap: '10px',
                overflowX: 'auto',
                paddingBottom: '4px',
              }}
            >
              {FINANCIAL_ANNUAL_SNAPSHOT.map((snap, i) => (
                <AnnualSnapshotCard
                  key={snap.year}
                  year={snap.year}
                  revenue={snap.revenue}
                  netLoss={snap.netLoss}
                  grossMargin={snap.grossMargin}
                  rd={snap.rd}
                  estimated={snap.estimated}
                  isLatest={i === FINANCIAL_ANNUAL_SNAPSHOT.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Divider before note */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '14px' }} />

          {/* Data source note */}
          <p style={{
            fontSize: '8px',
            color: 'rgba(255,255,255,0.25)',
            textAlign: 'center',
            lineHeight: 1.6,
            padding: '0 8px'
          }}>
            {t.finDataSource}
          </p>
        </div>
      </div>
    </div>
  );
}
