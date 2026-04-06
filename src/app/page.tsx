"use client";
import React, { useState } from 'react';
import DeliveryChart from '@/components/DeliveryChart';
import ModelSection from '@/components/ModelSection';
import FinancialSection from '@/components/FinancialSection';
import PowerSection from '@/components/PowerSection';
import PullEasterEgg from '@/components/PullEasterEgg';
import NewsTicker from '@/components/NewsTicker';
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
          background: 'rgba(255,255,255,0.94)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          transform: 'translate3d(0,0,0)',
        }}
      >
        {/* Brand row */}
        <div
          style={{
            padding: '12px 20px 8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ flexShrink: 0 }}>
            <p style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.22em', color: '#000', opacity: 0.85 }}>
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
              color: '#0D0D0D',
            }}
          >
            <span style={{ opacity: lang === 'zh' ? 1 : 0.3 }}>ZH</span>
            <span style={{ opacity: 0.1 }}>·</span>
            <span style={{ opacity: lang === 'en' ? 1 : 0.3 }}>EN</span>
          </button>
        </div>

        {/* Tab row */}
        <div style={{ padding: '0 0 10px', display: 'flex', justifyContent: 'center' }}>
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
      <div key={activeTab}>
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

