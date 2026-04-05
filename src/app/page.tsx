"use client";
import React, { useState } from 'react';
import Banner from '@/components/Banner';
import DeliveryChart from '@/components/DeliveryChart';
import ModelSection from '@/components/ModelSection';
import FinancialSection from '@/components/FinancialSection';
import PowerSection from '@/components/PowerSection';
import PullEasterEgg from '@/components/PullEasterEgg';
import { useLang } from '@/contexts/LangContext';

type TabType = 'delivery' | 'financial' | 'power';

export default function AppShell() {
  const { lang, toggleLang, t } = useLang();
  const [activeTab, setActiveTab] = useState<TabType>('delivery');
  const tabs: TabType[] = ['delivery', 'financial', 'power'];
  const activeIndex = tabs.indexOf(activeTab);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    
    // Auto-scroll to sticky dock position (Instant)
    if (typeof window !== 'undefined') {
      const bannerH = window.innerWidth; // Banner is 1:1 square
      const brandH = 80; // Brand Identity section height approx
      const target = bannerH + brandH - 12; // Adjust for some spacing
      
      window.scrollTo({
        top: target,
        behavior: 'auto'
      });
    }
  };

  return (
    <main className="page-shell">
      <PullEasterEgg />
      <Banner />

      {/* ── Brand Identity (Scrolls Away) ── */}
      <div
        style={{
          padding: '24px 20px 12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#FFF',
        }}
      >
        <div style={{ flexShrink: 0 }}>
          <p style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.2em', color: '#000', opacity: 0.8 }}>
            NIO FANS
          </p>
          <p style={{ fontSize: '7px', fontWeight: 500, letterSpacing: '0.1em', color: 'rgba(0,0,0,0.3)', textTransform: 'uppercase', marginTop: '2px' }}>
            Data Visualization
          </p>
        </div>

        {/* Lang toggle */}
        <button
          onClick={toggleLang}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            background: 'rgba(0,0,0,0.03)',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: '100px', padding: '6px 14px',
            cursor: 'pointer', fontSize: '9px', fontWeight: 700,
            letterSpacing: '0.05em',
            color: '#0D0D0D'
          }}
        >
          <span style={{ opacity: lang === 'zh' ? 1 : 0.3 }}>ZH</span>
          <span style={{ opacity: 0.1 }}>·</span>
          <span style={{ opacity: lang === 'en' ? 1 : 0.3 }}>EN</span>
        </button>
      </div>

      {/* ── Sticky Segmented Control (Docks only Tabs) ── */}
      <div 
        style={{ 
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          width: '100%',
          left: 0,
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          padding: '10px 0',
          display: 'flex',
          justifyContent: 'center',
          transform: 'translate3d(0,0,0)',
        }}
      >
        <div className="nav-capsule" style={{ margin: 0 }}>
          <div 
            className="nav-indicator"
            style={{ 
              width: 'calc(33.33% - 8px)',
              transform: `translateX(${activeIndex * 100}%)`,
              left: '4px'
            }}
          />
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`nav-pill ${activeTab === tab ? 'active' : ''}`}
              onClick={() => handleTabChange(tab)}
              style={{ width: '100px', textAlign: 'center' }}
            >
              {tab === 'delivery' ? t.tabDelivery : tab === 'financial' ? t.tabFinancial : t.tabPower}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab Content ── */}
      <div key={activeTab}>
        {activeTab === 'delivery' && (
          <>
            <DeliveryChart />
            <ModelSection />
          </>
        )}
        {activeTab === 'financial' && <FinancialSection />}
        {activeTab === 'power' && <PowerSection />}
      </div>

      {/* ── Site Footer ── */}
      <footer style={{ padding: '36px 16px 52px', textAlign: 'center', background: '#0B0F14' }}>
        <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.1)', margin: '0 auto 24px' }} />

        <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.28em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginBottom: '6px' }}>
          Blue Sky Coming
        </p>
        <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '28px' }}>
          {t.footerCopyright}
        </p>

        {/* Legal disclaimer */}
        <div style={{
          maxWidth: '340px', margin: '0 auto',
          padding: '16px', borderRadius: '10px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}>
          <p style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '8px' }}>
          {t.disclaimerTitle}
          </p>
          <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.8, letterSpacing: '0.02em' }}>
            {t.disclaimerBody}
          </p>
          <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.2)', lineHeight: 1.7, letterSpacing: '0.02em', marginTop: '8px' }}>
            {t.disclaimerBodyEn}
          </p>
        </div>
      </footer>

    </main>
  );
}

