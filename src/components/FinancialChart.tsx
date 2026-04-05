"use client";
import React, { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer,
  Cell, AreaChart, Area
} from 'recharts';
import { FINANCIAL_QUARTERLY, FINANCIAL_ANNUAL, FINANCIAL_DATA } from '@/constants/nioData';
import { useLang } from '@/contexts/LangContext';
import CountUp from './CountUp';

type MetricType = 'revenue' | 'grossMargin' | 'vehicleMargin';
type PeriodType = 'quarterly' | 'annual';

interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  metric: MetricType;
}

const CustomTooltip = ({ active, payload, label, metric }: TooltipProps) => {
  if (active && payload && payload.length) {
    const val = payload[0].value;
    return (
      <div style={{
        background: 'rgba(11, 15, 20, 0.95)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.1)',
        padding: '12px 16px',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.8)'
      }}>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', marginBottom: '4px', letterSpacing: '0.05em' }}>{label}</p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          <span style={{ color: '#FFF', fontSize: '20px', fontWeight: 700, fontFamily: 'Outfit' }}>
            {val}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px' }}>
            {metric === 'revenue' ? 'B' : '%'}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

interface SubChartProps {
  title: string;
  metric: MetricType;
  period: PeriodType;
  data: any[];
}

function FinancialSubChart({ title, metric, period, data }: SubChartProps) {
  const colors: Record<MetricType, string> = {
    revenue: '#00A3DA',
    grossMargin: '#8E5AFF',
    vehicleMargin: '#00E5FF'
  };
  const mainColor = colors[metric];
  const unit = metric === 'revenue' ? 'RMB Billions' : 'Percentage (%)';

  return (
    <div style={{ padding: '0 0 40px', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', paddingLeft: '4px' }}>
        <div>
          <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: mainColor, marginBottom: '2px' }}>
            {title}
          </p>
          <p style={{ fontSize: '16px', fontWeight: 300, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1, opacity: 0.9 }}>
            {period === 'quarterly' ? '2020 — 2025' : 'ANNUAL TREND'}
          </p>
        </div>
        <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.04em' }}>
          {unit}
        </span>
      </div>

      <div style={{ height: '160px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          {metric === 'revenue' ? (
            <BarChart data={data} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="barGradientFin" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00C3FF" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#00A3DA" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="period" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 8, fill: 'rgba(255,255,255,0.25)' }}
                interval={period === 'quarterly' ? 3 : 0}
              />
              <Tooltip content={<CustomTooltip metric={metric} />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index === data.length - 1 ? '#00A3DA' : 'url(#barGradientFin)'} 
                  />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <AreaChart data={data} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id={`areaGradient-${metric}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={mainColor} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={mainColor} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="period" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 8, fill: 'rgba(255,255,255,0.25)' }}
                interval={period === 'quarterly' ? 3 : 0}
              />
              <Tooltip content={<CustomTooltip metric={metric} />} />
              <Area 
                type="monotone" 
                dataKey={metric} 
                stroke={mainColor} 
                strokeWidth={2} 
                fillOpacity={1} 
                fill={`url(#areaGradient-${metric})`} 
                animationDuration={1500}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      <div style={{ position: 'absolute', bottom: '15px', left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.04)' }} />
    </div>
  );
}

export default function FinancialChart() {
  const { t } = useLang();
  const [period, setPeriod] = useState<PeriodType>('quarterly');
  const latestData = FINANCIAL_DATA[0];

  const data = useMemo(() => {
    return period === 'quarterly' ? FINANCIAL_QUARTERLY : FINANCIAL_ANNUAL;
  }, [period]);

  const colors: Record<string, string> = {
    revenue: '#00A3DA',
    grossMargin: '#8E5AFF',
    vehicleMargin: '#00E5FF'
  };

  return (
    <div style={{ marginTop: '0px' }}>
      {/* Unified Seamless Dark Container (Single Shell) */}
      <div style={{ 
        background: 'linear-gradient(to bottom, #FFFFFF 0%, #0B0F14 28px)',
        padding: '0 16px 32px'
      }}>
        <div className="chart-shell" style={{ 
          padding: '24px 20px', 
          background: '#0B0F14', 
          borderRadius: '24px', 
          boxShadow: 'none'
        }}>
          
          {/* Immersive KPI Header Card - Mirrored from Delivery Dashboard */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '32px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <p style={{ fontSize: '9px', fontWeight: 700, color: colors.revenue, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {latestData.quarter} Performance
                </p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontSize: '32px', fontWeight: 200, color: '#FFF' }}>
                    <CountUp end={latestData.revenue} decimals={1} />
                  </span>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>RMB BN</span>
                </div>
              </div>
              
              {/* Global Period Toggle within Dark Shell */}
              <div style={{ display: 'flex', background: 'rgba(255,255,255,0.07)', borderRadius: '8px', padding: '3px', gap: '2px' }}>
                {(['quarterly', 'annual'] as PeriodType[]).map(p => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    style={{
                      padding: '5px 12px', borderRadius: '6px', border: 'none',
                      fontSize: '10px', fontWeight: 600, letterSpacing: '0.04em', cursor: 'pointer',
                      transition: 'all 0.2s',
                      background: period === p ? '#FFFFFF' : 'transparent',
                      color: period === p ? '#0D0D0D' : 'rgba(255,255,255,0.3)',
                    }}
                  >
                    {p === 'quarterly' ? t.quarterly : t.annual}
                  </button>
                ))}
              </div>
            </div>

            {/* Secondary KPIs Grid inside Summary Card */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '12px', borderLeft: `2px solid ${colors.grossMargin}` }}>
                <p style={{ fontSize: '8px', color: 'rgba(255,255,255,0.3)', marginBottom: '4px' }}>{t.grossMargin}</p>
                <p style={{ fontSize: '18px', fontWeight: 500, color: '#FFF' }}>
                  <CountUp end={latestData.grossMargin} decimals={1} />%
                </p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '12px', borderLeft: `2px solid ${colors.vehicleMargin}` }}>
                <p style={{ fontSize: '8px', color: 'rgba(255,255,255,0.3)', marginBottom: '4px' }}>{t.vehicleMargin}</p>
                <p style={{ fontSize: '18px', fontWeight: 500, color: '#FFF' }}>
                  <CountUp end={latestData.vehicleMargin} decimals={1} />%
                </p>
              </div>
            </div>
          </div>

          <FinancialSubChart 
            title={t.revenue} 
            metric="revenue" 
            period={period} 
            data={data} 
          />
          <FinancialSubChart 
            title={t.grossMargin} 
            metric="grossMargin" 
            period={period} 
            data={data} 
          />
          <FinancialSubChart 
            title={t.vehicleMargin} 
            metric="vehicleMargin" 
            period={period} 
            data={data} 
          />

          <p style={{ 
            fontSize: '9px', 
            color: 'rgba(255,255,255,0.2)', 
            textAlign: 'center', 
            marginTop: '0px',
            lineHeight: 1.5,
            padding: '0 16px'
          }}>
            * Official fiscal data sourced from NIO Investor Relations. 
            Waterfall charts synchronized with delivery visualization standards.
          </p>
        </div>
      </div>
    </div>
  );
}
