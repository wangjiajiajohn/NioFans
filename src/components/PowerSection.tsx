"use client";
import React from 'react';
import { SWAP_DATA } from '@/constants/nioData';
import { useLang } from '@/contexts/LangContext';
import CountUp from './CountUp';

export default function PowerSection() {
  const { t } = useLang();
  const progressPct = Math.min(SWAP_DATA.total / SWAP_DATA.target2025, 1);

  return (
    <div className="w-full anim-fade-up" style={{ background: '#FFFFFF' }}>
      <div style={{ padding: '24px 16px 0' }}>
        <p className="section-label" style={{ marginBottom: '14px' }}>
          {t.tabPower} · INFRASTRUCTURE
        </p>
      </div>

      <div style={{ 
        background: 'linear-gradient(to bottom, #FFFFFF 0%, #0B0F14 28px)',
        padding: '0 16px 32px'
      }}>
        <div className="chart-shell" style={{ 
          padding: '24px 20px', 
          background: '#0B0F14', 
          borderRadius: '24px'
        }}>
          {/* Main Progress Card - Glassmorphism */}
          <div style={{
            padding: '24px 20px',
            borderRadius: '16px',
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.08)',
            marginBottom: '16px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ 
              position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', 
              background: 'radial-gradient(circle at 100% 0%, rgba(0,163,218,0.15), transparent 70%)',
              pointerEvents: 'none'
            }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <p style={{ fontSize: '9px', fontWeight: 700, color: '#00A3DA', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '6px' }}>
                  {t.pwrSwapTotal}
                </p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontSize: '36px', fontWeight: 200, color: '#FFF', letterSpacing: '-0.02em' }}>
                    <CountUp end={SWAP_DATA.total} />
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.4)' }}>{t.pwrUnit}</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.04em' }}>TARGET 2025</p>
                <p style={{ fontSize: '18px', fontWeight: 300, color: '#FFF', marginTop: '2px' }}>
                  {SWAP_DATA.target2025}
                </p>
              </div>
            </div>

            {/* Premium Progress Bar */}
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '100px', height: '8px', overflow: 'hidden', marginBottom: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{
                width: `${progressPct * 100}%`,
                height: '100%',
                borderRadius: '100px',
                background: 'linear-gradient(90deg, #00A3DA, #00E5FF)',
                boxShadow: '0 0 15px rgba(0,163,218,0.5)',
                transition: 'width 1.5s cubic-bezier(0.22,1,0.36,1)',
              }} />
            </div>

            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px',
              background: 'rgba(0,163,218,0.15)', 
              padding: '5px 12px', 
              borderRadius: '100px',
              fontSize: '10px',
              fontWeight: 800,
              color: '#00C3FF',
              border: '1px solid rgba(0,163,218,0.2)'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00C3FF', boxShadow: '0 0 8px #00C3FF' }} />
              建设进度 {(progressPct * 100).toFixed(1)}%
            </div>
          </div>

          {/* Secondary KPIs Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {/* Highway Stations */}
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', marginBottom: '8px', fontWeight: 700, letterSpacing: '0.04em' }}>
                {t.pwrHighway}
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
                <span style={{ fontSize: '24px', fontWeight: 300, color: '#FFF' }}>
                  <CountUp end={SWAP_DATA.highway} />
                </span>
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>座</span>
              </div>
              <span style={{ 
                fontSize: '8px', fontWeight: 700, color: '#00A3DA', 
                background: 'rgba(0,163,218,0.1)', padding: '2px 8px', borderRadius: '4px' 
              }}>已覆盖 7 纵 6 横</span>
            </div>

            {/* Partners */}
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', marginBottom: '8px', fontWeight: 700, letterSpacing: '0.04em' }}>
                {t.pwrPartner}
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
                <span style={{ fontSize: '24px', fontWeight: 300, color: '#FFF' }}>
                  <CountUp end={SWAP_DATA.partners} />
                </span>
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>家</span>
              </div>
              <span style={{ 
                fontSize: '8px', fontWeight: 700, color: '#00C896', 
                background: 'rgba(0,200,150,0.1)', padding: '2px 8px', borderRadius: '4px' 
              }}>多品牌共享网络</span>
            </div>
          </div>

          <p style={{ 
            fontSize: '9px', 
            color: 'rgba(255,255,255,0.2)', 
            textAlign: 'center', 
            marginTop: '24px',
            lineHeight: 1.5
          }}>
            * Data updated as of April 2026. NIO Power network is scaling <br/>
            to support the &quot;Power Up&quot; global infrastructure plan.
          </p>
        </div>
      </div>
    </div>
  );
}
