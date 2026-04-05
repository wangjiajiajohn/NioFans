"use client";
import React from 'react';
import { FINANCIAL_DATA } from '@/constants/nioData';
import { useLang } from '@/contexts/LangContext';
import CountUp from './CountUp';

export default function FinancialSection() {
  const { t } = useLang();
  const data = FINANCIAL_DATA[0]; // Using latest Q4 data

  return (
    <div className="w-full anim-fade-up" style={{ padding: '24px 16px', background: '#FFFFFF' }}>
      <p className="section-label" style={{ marginBottom: '14px' }}>
        {data.quarter} {t.tabFinancial}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {/* Revenue */}
        <div className="kpi-card">
          <div style={{ fontSize: '10px', color: '#999', marginBottom: '6px', fontWeight: 500 }}>
            {t.finRevenue}
          </div>
          <div style={{ fontSize: '26px', fontWeight: 300, letterSpacing: '-0.02em', color: '#0D0D0D', lineHeight: 1 }}>
            <CountUp end={data.revenue} decimals={1} />
            <span style={{ fontSize: '12px', fontWeight: 400, color: '#999', marginLeft: '3px' }}>{t.finUnit}</span>
          </div>
          <div style={{ marginTop: '6px' }}>
            <span className="badge-blue">24Q4 OFFICIAL</span>
          </div>
        </div>

        {/* Vehicle Margin */}
        <div className="kpi-card">
          <div style={{ fontSize: '10px', color: '#999', marginBottom: '6px', fontWeight: 500 }}>
            {t.finMargin}
          </div>
          <div style={{ fontSize: '26px', fontWeight: 300, letterSpacing: '-0.02em', color: '#0D0D0D', lineHeight: 1 }}>
            <CountUp end={data.vehicleMargin} decimals={1} />
            <span style={{ fontSize: '12px', fontWeight: 400, color: '#999', marginLeft: '3px' }}>%</span>
          </div>
          <div style={{ marginTop: '6px' }}>
            <span className="badge-green">▲ {t.yoyLabel} 1.2%</span>
          </div>
        </div>

        {/* Cash Reserve */}
        <div className="kpi-card">
          <div style={{ fontSize: '10px', color: '#999', marginBottom: '6px', fontWeight: 500 }}>
            {t.finCash}
          </div>
          <div style={{ fontSize: '26px', fontWeight: 300, letterSpacing: '-0.02em', color: '#0D0D0D', lineHeight: 1 }}>
            <CountUp end={data.cash / 10} decimals={1} />
            <span style={{ fontSize: '12px', fontWeight: 400, color: '#999', marginLeft: '3px' }}>{t.finUnit}</span>
          </div>
          <div style={{ marginTop: '6px' }}>
            <span className="badge-blue">STABLE</span>
          </div>
        </div>

        {/* R&D Spend */}
        <div className="kpi-card">
          <div style={{ fontSize: '10px', color: '#999', marginBottom: '6px', fontWeight: 500 }}>
            {t.finRD}
          </div>
          <div style={{ fontSize: '26px', fontWeight: 300, letterSpacing: '-0.02em', color: '#0D0D0D', lineHeight: 1 }}>
            <CountUp end={data.rd} decimals={1} />
            <span style={{ fontSize: '12px', fontWeight: 400, color: '#999', marginLeft: '3px' }}>{t.finUnit}</span>
          </div>
          <div style={{ marginTop: '6px' }}>
            <span className="badge-blue">QUARTERLY</span>
          </div>
        </div>
      </div>

      {/* Financial Disclaimer or extra note */}
      <div style={{ 
        marginTop: '16px', 
        padding: '12px', 
        borderRadius: '10px', 
        background: '#F8F9FB', 
        fontSize: '9px', 
        color: '#999',
        lineHeight: 1.6
      }}>
        * 财务数据以蔚来官方财报为准，金额单位为人民币（CNY）。
        研发投入持续保持高位，支撑全栈技术开发。
      </div>
    </div>
  );
}
