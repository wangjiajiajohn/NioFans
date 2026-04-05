"use client";
import React, { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer,
  Cell, AreaChart, Area
} from 'recharts';
import { FINANCIAL_QUARTERLY, FINANCIAL_ANNUAL } from '@/constants/nioData';
import { useLang } from '@/contexts/LangContext';

type MetricType = 'revenue' | 'grossMargin' | 'vehicleMargin';
type PeriodType = 'quarterly' | 'annual';

const CustomTooltip = ({ active, payload, label, metric }: any) => {
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
  t: any;
}

function FinancialSubChart({ title, metric, period, data, t }: SubChartProps) {
  const mainColor = metric === 'revenue' ? '#00A3DA' : metric === 'grossMargin' ? '#00C3FF' : '#5CD6FF';
  const unit = metric === 'revenue' ? 'RMB Billions' : 'Percentage (%)';

  return (
    <div style={{ 
      padding: '0 16px 24px', 
      marginTop: '12px', 
      background: 'linear-gradient(to bottom, #FFFFFF 0%, #0B0F14 28px)' 
    }}>
      <div className="chart-shell" style={{ padding: '20px 16px 16px', background: '#0B0F14', borderRadius: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
          <div>
            <p style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#00A3DA', marginBottom: '4px' }}>
              {title}
            </p>
            <p style={{ fontSize: '16px', fontWeight: 300, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1 }}>
              {period === 'quarterly' ? '2020 — 2025' : 'ANNUAL TREND'}
            </p>
          </div>
          <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.04em' }}>
            {unit}
          </span>
        </div>

        <div style={{ height: '180px', width: '100%', marginLeft: '-24px' }}>
          <ResponsiveContainer width="115%" height="100%">
            {metric === 'revenue' ? (
              <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
      </div>
    </div>
  );
}

export default function FinancialChart() {
  const { t } = useLang();
  const [period, setPeriod] = useState<PeriodType>('quarterly');

  const data = useMemo(() => {
    return period === 'quarterly' ? FINANCIAL_QUARTERLY : FINANCIAL_ANNUAL;
  }, [period]);

  return (
    <div style={{ marginTop: '0px' }}>
      {/* Global Period Toggle */}
      <div style={{ padding: '0 16px', marginBottom: '8px', display: 'flex', justifyContent: 'flex-start', gap: '16px' }}>
        <button 
          onClick={() => setPeriod('quarterly')}
          style={{ 
            fontSize: '11px', 
            letterSpacing: '0.04em',
            color: period === 'quarterly' ? '#00A3DA' : 'rgba(0,0,0,0.3)',
            background: 'none', border: 'none', fontWeight: 700, padding: '4px 0', cursor: 'pointer',
            borderBottom: period === 'quarterly' ? '2px solid #00A3DA' : '2px solid transparent',
            transition: 'all 0.2s'
          }}
        >
          {t.quarterly}
        </button>
        <button 
          onClick={() => setPeriod('annual')}
          style={{ 
            fontSize: '11px', 
            letterSpacing: '0.04em',
            color: period === 'annual' ? '#00A3DA' : 'rgba(0,0,0,0.3)',
            background: 'none', border: 'none', fontWeight: 700, padding: '4px 0', cursor: 'pointer',
            borderBottom: period === 'annual' ? '2px solid #00A3DA' : '2px solid transparent',
            transition: 'all 0.2s'
          }}
        >
          {t.annual}
        </button>
      </div>

      {/* Stacked Charts */}
      <FinancialSubChart 
        title={t.revenue} 
        metric="revenue" 
        period={period} 
        data={data} 
        t={t} 
      />
      <FinancialSubChart 
        title={t.grossMargin} 
        metric="grossMargin" 
        period={period} 
        data={data} 
        t={t} 
      />
      <FinancialSubChart 
        title={t.vehicleMargin} 
        metric="vehicleMargin" 
        period={period} 
        data={data} 
        t={t} 
      />

      <p style={{ 
        fontSize: '9px', 
        color: 'rgba(0,0,0,0.25)', 
        textAlign: 'center', 
        marginTop: '-12px',
        marginBottom: '24px',
        lineHeight: 1.5,
        padding: '0 32px'
      }}>
        * Data based on official NIO fiscal reports. 
        Bar gradients and chart aesthetics synchronized with Delivery Dashboard standards.
      </p>
    </div>
  );
}
