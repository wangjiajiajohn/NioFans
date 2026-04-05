"use client";
import React from 'react';
import { FINANCIAL_DATA } from '@/constants/nioData';
import { useLang } from '@/contexts/LangContext';
import CountUp from './CountUp';

import FinancialChart from './FinancialChart';

export default function FinancialSection() {
  const { t } = useLang();
  const data = FINANCIAL_DATA[0]; // Using latest Q4 data

  return (
    <div className="w-full anim-fade-up" style={{ padding: '24px 16px', background: '#FFFFFF' }}>
      <p className="section-label" style={{ marginBottom: '14px' }}>
        {data.quarter} {t.financialTitle}
      </p>

      {/* Latest Performance Summary - KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '32px' }}>
        {/* Revenue */}
        <div className="kpi-card">
          <div style={{ fontSize: '10px', color: '#999', marginBottom: '6px', fontWeight: 500 }}>
            {t.revenue}
          </div>
          <div style={{ fontSize: '26px', fontWeight: 300, letterSpacing: '-0.02em', color: '#0D0D0D', lineHeight: 1 }}>
            <CountUp end={data.revenue} decimals={1} />
            <span style={{ fontSize: '12px', fontWeight: 400, color: '#999', marginLeft: '3px' }}>B</span>
          </div>
        </div>

        {/* Vehicle Margin */}
        <div className="kpi-card">
          <div style={{ fontSize: '10px', color: '#999', marginBottom: '6px', fontWeight: 500 }}>
            {t.vehicleMargin}
          </div>
          <div style={{ fontSize: '26px', fontWeight: 300, letterSpacing: '-0.02em', color: '#0D0D0D', lineHeight: 1 }}>
            <CountUp end={data.vehicleMargin} decimals={1} />
            <span style={{ fontSize: '12px', fontWeight: 400, color: '#999', marginLeft: '3px' }}>%</span>
          </div>
        </div>

        {/* Cash Reserve */}
        <div className="kpi-card">
          <div style={{ fontSize: '10px', color: '#999', marginBottom: '6px', fontWeight: 500 }}>
            {t.pwrUnit} Cash
          </div>
          <div style={{ fontSize: '26px', fontWeight: 300, letterSpacing: '-0.02em', color: '#0D0D0D', lineHeight: 1 }}>
            <CountUp end={data.cash / 10} decimals={1} />
            <span style={{ fontSize: '12px', fontWeight: 400, color: '#999', marginLeft: '3px' }}>B</span>
          </div>
        </div>

        {/* R&D Spend */}
        <div className="kpi-card">
          <div style={{ fontSize: '10px', color: '#999', marginBottom: '6px', fontWeight: 500 }}>
            R&D
          </div>
          <div style={{ fontSize: '26px', fontWeight: 300, letterSpacing: '-0.02em', color: '#0D0D0D', lineHeight: 1 }}>
            <CountUp end={data.rd} decimals={1} />
            <span style={{ fontSize: '12px', fontWeight: 400, color: '#999', marginLeft: '3px' }}>B</span>
          </div>
        </div>
      </div>

      <div style={{ width: '40px', height: '1px', background: 'rgba(0,0,0,0.05)', margin: '0 auto 24px' }} />

      <FinancialChart />
    </div>
  );
}
