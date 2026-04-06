"use client";
import React, { useState } from 'react';
import DeliveryChart from '@/components/DeliveryChart';
import ModelSection from '@/components/ModelSection';
import FinancialSection from '@/components/FinancialSection';
import PowerSection from '@/components/PowerSection';
import PullEasterEgg from '@/components/PullEasterEgg';
import NewsTicker from '@/components/NewsTicker';
import StockTicker from '@/components/StockTicker';
import { useLang } from '@/contexts/LangContext';

type TabType = 'delivery' | 'financial' | 'power';

const NEWS: Record<TabType, { zh: { tag: string; text: string }[]; en: { tag: string; text: string }[] }> = {
  delivery: {
    zh: [
      { tag: '交付动态', text: 'ES8 累计交付突破 9 万辆，旗舰 SUV 持续热销' },
      { tag: '新车发布', text: 'ES9 技术产品发布会圆满落幕，全新智能驾驶平台亮相' },
      { tag: '月度数据', text: '2026 年 3 月交付 35,500 辆，同比大幅增长' },
    ],
    en: [
      { tag: 'DELIVERY', text: 'ES8 cumulative deliveries surpass 90,000 units' },
      { tag: 'LAUNCH', text: 'ES9 Tech Event concluded — new smart driving platform unveiled' },
      { tag: 'MONTHLY', text: 'March 2026: 35,500 units delivered, strong YoY growth' },
    ],
  },
  financial: {
    zh: [
      { tag: '财务亮点', text: '2025 Q4 首次实现单季度盈利，盈亏平衡历史性突破' },
      { tag: '2026 Q1', text: '预估营收 312.8 亿元，汽车毛利率 20.2%' },
      { tag: '研发投入', text: '2025 全年研发投入超 130 亿元，智能化持续领跑' },
    ],
    en: [
      { tag: 'HIGHLIGHT', text: 'Q4 2025: First-ever quarterly profit — breakeven achieved' },
      { tag: 'Q1 2026', text: 'Est. revenue ¥31.3B, vehicle margin 20.2%' },
      { tag: 'R&D', text: 'FY2025 R&D spend exceeds ¥13B, leading in smart tech' },
    ],
  },
  power: {
    zh: [
      { tag: '补能网络', text: '换电站总数达 3,789 座，高速网络覆盖持续扩张' },
      { tag: '里程碑', text: '累计换电次数突破 1.069 亿次，全球最大换电网络' },
      { tag: '充电生态', text: '接入第三方充电桩超 28,456 根，86% 用户来自非蔚来车主' },
    ],
    en: [
      { tag: 'NETWORK', text: '3,789 swap stations — highway coverage expanding' },
      { tag: 'MILESTONE', text: '106.9M cumulative swaps — world\'s largest swap network' },
      { tag: 'CHARGING', text: '28,456 3rd-party poles; 86% users are non-NIO owners' },
    ],
  },
};

export default function AppShell() {
  const { lang, toggleLang, t } = useLang();
  const [activeTab, setActiveTab] = useState<TabType>('delivery');
  const tabs: TabType[] = ['delivery', 'financial', 'power'];
  const activeIndex = tabs.indexOf(activeTab);

  // ── Swipe to change tab ──
  const touchStartX = React.useRef<number>(0);
  const touchStartY = React.useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    // Only trigger if horizontal swipe dominates and distance > 48px
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    const dir = dx < 0 ? 1 : -1; // left swipe → next tab
    const next = activeIndex + dir;
    if (next >= 0 && next < tabs.length) setActiveTab(tabs[next]);
  };

  return (
    <main className="page-shell">
      <PullEasterEgg />

      {/* ── Sticky Header: Brand + Tabs + Lang toggle ── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          width: '100%',
          background: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(24px) saturate(200%)',
          WebkitBackdropFilter: 'blur(24px) saturate(200%)',
          borderBottom: '1px solid #EBEBEB',
          transform: 'translate3d(0,0,0)',
        }}
      >
        {/* Brand row */}
        <div
          style={{
            padding: '10px 20px 6px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <StockTicker />

          {/* Lang toggle */}
          <button
            onClick={toggleLang}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              background: 'transparent',
              border: 'none',
              padding: '4px 0',
              cursor: 'pointer', fontSize: '9px', fontWeight: 600,
              letterSpacing: '0.08em',
              color: '#0D0D0D',
            }}
          >
            <span style={{ opacity: lang === 'zh' ? 0.9 : 0.25, transition: 'opacity 0.2s' }}>ZH</span>
            <span style={{ width: '1px', height: '10px', background: '#DDD', display: 'inline-block' }} />
            <span style={{ opacity: lang === 'en' ? 0.9 : 0.25, transition: 'opacity 0.2s' }}>EN</span>
          </button>
        </div>

        {/* Tab row */}
        <div style={{ padding: '0 0 8px', display: 'flex', justifyContent: 'center' }}>
          <div className="nav-capsule" style={{ margin: 0 }}>
            <div
              className="nav-indicator"
              style={{
                width: 'calc(33.33% - 8px)',
                transform: `translateX(${activeIndex * 100}%)`,
                left: '4px',
              }}
            />
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`nav-pill ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
                style={{ width: '100px', textAlign: 'center' }}
              >
                {tab === 'delivery' ? t.tabDelivery : tab === 'financial' ? t.tabFinancial : t.tabPower}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab Content ── */}
      <div key={activeTab} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {/* News ticker for each tab */}
        <NewsTicker items={NEWS[activeTab][lang]} />

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
      <footer style={{ padding: '20px 20px 36px', background: '#0B0F14' }}>
        <div style={{ width: '32px', height: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '14px' }} />

        {/* Brand + copyright inline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>
            Blue Sky Coming
          </span>
          <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '8px' }}>·</span>
          <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em' }}>
            {t.footerCopyright}
          </span>
        </div>

        {/* Disclaimer — single compact paragraph */}
        <p style={{
          fontSize: '8.5px', color: 'rgba(255,255,255,0.2)',
          lineHeight: 1.7, letterSpacing: '0.01em',
          maxWidth: '360px',
        }}>
          {t.disclaimerBody}
        </p>
      </footer>

    </main>
  );
}

