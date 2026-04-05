"use client";
import React, { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer,
  Cell, CartesianGrid, AreaChart, Area
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
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
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

export default function FinancialChart() {
  const { t } = useLang();
  const [metric, setMetric] = useState<MetricType>('revenue');
  const [period, setPeriod] = useState<PeriodType>('quarterly');

  const data = useMemo(() => {
    return period === 'quarterly' ? FINANCIAL_QUARTERLY : FINANCIAL_ANNUAL;
  }, [period, FINANCIAL_QUARTERLY, FINANCIAL_ANNUAL]);

  const unit = metric === 'revenue' ? t.unitRmbBn : t.unitPercent;
  const mainColor = metric === 'revenue' ? '#00A3DA' : metric === 'grossMargin' ? '#00C3FF' : '#5CD6FF';

  return (
    <div style={{ marginTop: '24px', padding: '0 16px' }}>
      {/* Metrics Switcher */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        background: 'rgba(0,0,0,0.03)', 
        borderRadius: '12px', 
        padding: '4px',
        marginBottom: '20px'
      }}>
        {(['revenue', 'grossMargin', 'vehicleMargin'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMetric(m)}
            style={{
              flex: 1,
              padding: '8px 4px',
              fontSize: '11px',
              fontWeight: metric === m ? 700 : 400,
              color: metric === m ? '#000' : 'rgba(0,0,0,0.4)',
              background: metric === m ? '#FFF' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              boxShadow: metric === m ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.2s cubic-bezier(0.2,0.6,0.4,1)',
              cursor: 'pointer'
            }}
          >
            {m === 'revenue' ? t.revenue : m === 'grossMargin' ? t.grossMargin : t.vehicleMargin}
          </button>
        ))}
      </div>

      {/* Period Toggle & Unit */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => setPeriod('quarterly')}
            style={{ 
              fontSize: '12px', 
              color: period === 'quarterly' ? '#00A3DA' : 'rgba(0,0,0,0.3)',
              background: 'none', border: 'none', fontWeight: 600, padding: 0, cursor: 'pointer'
            }}
          >
            {t.quarterly}
          </button>
          <button 
            onClick={() => setPeriod('annual')}
            style={{ 
              fontSize: '12px', 
              color: period === 'annual' ? '#00A3DA' : 'rgba(0,0,0,0.3)',
              background: 'none', border: 'none', fontWeight: 600, padding: 0, cursor: 'pointer'
            }}
          >
            {t.annual}
          </button>
        </div>
        <span style={{ fontSize: '10px', color: 'rgba(0,0,0,0.3)', letterSpacing: '0.02em' }}>
          {unit}
        </span>
      </div>

      {/* Chart Container */}
      <div style={{ height: '240px', width: '100%', marginLeft: '-20px' }}>
        <ResponsiveContainer width="112%" height="100%">
          {metric === 'revenue' ? (
            <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00A3DA" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#00A3DA" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="period" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 9, fill: 'rgba(0,0,0,0.3)' }}
                interval={period === 'quarterly' ? 3 : 0}
              />
              <Tooltip content={<CustomTooltip metric={metric} />} cursor={{ fill: 'rgba(0,163,218,0.05)' }} />
              <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                {data.map((entry: any, index: number) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index === data.length - 1 ? '#00A3DA' : 'url(#barGradient)'} 
                  />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={mainColor} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={mainColor} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
              <XAxis 
                dataKey="period" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 9, fill: 'rgba(0,0,0,0.3)' }}
                interval={period === 'quarterly' ? 3 : 0}
              />
              <Tooltip content={<CustomTooltip metric={metric} />} />
              <Area 
                type="monotone" 
                dataKey={metric} 
                stroke={mainColor} 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#areaGradient)" 
                animationDuration={1500}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      <p style={{ 
        fontSize: '10px', 
        color: 'rgba(0,0,0,0.25)', 
        textAlign: 'center', 
        marginTop: '12px',
        lineHeight: 1.5,
        padding: '0 20px'
      }}>
        * {period === 'quarterly' ? 'Historical quarterly data' : 'Annual performance overview'} for NIO Inc. (RMB Billions / Margins). Updated as of latest fiscal report.
      </p>
    </div>
  );
}
