"use client";
import React from 'react';
import { SWAP_DATA } from '@/constants/nioData';
import { useLang } from '@/contexts/LangContext';
import CountUp from './CountUp';

export default function PowerSection() {
  const { t } = useLang();
  const progressPct = Math.min(SWAP_DATA.total / SWAP_DATA.target2025, 1);

  return (
    <div className="w-full anim-fade-up" style={{ padding: '24px 16px', background: '#FFFFFF' }}>
      <p className="section-label" style={{ marginBottom: '14px' }}>
        {t.tabPower} · INFRASTRUCTURE
      </p>

      {/* Main progress card */}
      <div style={{
        padding: '20px 18px',
        borderRadius: '14px',
        background: '#F7F9FF',
        border: '1px solid #E5E9F5',
        marginBottom: '10px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <p style={{ fontSize: '10px', fontWeight: 700, color: '#0D0D0D', letterSpacing: '0.04em', marginBottom: '2px' }}>
              {t.pwrSwapTotal}
            </p>
            <p style={{ fontSize: '26px', fontWeight: 300, letterSpacing: '-0.02em', color: '#0D0D0D', lineHeight: 1 }}>
              <CountUp end={SWAP_DATA.total} />
              <span style={{ fontSize: '12px', fontWeight: 400, color: '#999', marginLeft: '3px' }}>{t.pwrUnit}</span>
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#999', letterSpacing: '-0.01em' }}>
              {SWAP_DATA.target2025}
            </p>
            <p style={{ fontSize: '8px', color: '#999', marginTop: '2px' }}>TARGET 2025</p>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ background: '#E5E9F5', borderRadius: '100px', height: '6px', overflow: 'hidden', marginBottom: '10px' }}>
          <div style={{
            width: `${progressPct * 100}%`,
            height: '100%',
            borderRadius: '100px',
            background: 'linear-gradient(90deg, #00A3DA, #00C3FF)',
            transition: 'width 1s cubic-bezier(0.22,1,0.36,1)',
          }} />
        </div>

        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '6px',
          background: 'rgba(0,163,218,0.1)', 
          padding: '4px 10px', 
          borderRadius: '100px',
          fontSize: '10px',
          fontWeight: 700,
          color: '#00A3DA'
        }}>
          建设进度 {(progressPct * 100).toFixed(1)}%
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {/* Highway Stations */}
        <div className="kpi-card">
          <div style={{ fontSize: '10px', color: '#999', marginBottom: '6px', fontWeight: 500 }}>
            {t.pwrHighway}
          </div>
          <div style={{ fontSize: '22px', fontWeight: 300, color: '#0D0D0D', lineHeight: 1 }}>
            <CountUp end={SWAP_DATA.highway} />
            <span style={{ fontSize: '10px', fontWeight: 400, color: '#999', marginLeft: '2px' }}>座</span>
          </div>
          <div style={{ marginTop: '6px' }}><span className="badge-blue">已覆盖 7 纵 6 横</span></div>
        </div>

        {/* Partners */}
        <div className="kpi-card">
          <div style={{ fontSize: '10px', color: '#999', marginBottom: '6px', fontWeight: 500 }}>
            {t.pwrPartner}
          </div>
          <div style={{ fontSize: '22px', fontWeight: 300, color: '#0D0D0D', lineHeight: 1 }}>
            <CountUp end={SWAP_DATA.partners} />
            <span style={{ fontSize: '10px', fontWeight: 400, color: '#999', marginLeft: '2px' }}>家</span>
          </div>
          <div style={{ marginTop: '6px' }}><span className="badge-green">可共享换电网络</span></div>
        </div>
      </div>
    </div>
  );
}
