"use client";
import React, { useState, useRef, useEffect } from 'react';
import DeliveryChart from '@/components/DeliveryChart';
import ModelSection from '@/components/ModelSection';
import FinancialSection from '@/components/FinancialSection';
import PowerSection from '@/components/PowerSection';
import PullEasterEgg from '@/components/PullEasterEgg';
import NewsTicker from '@/components/NewsTicker';
import StockTicker from '@/components/StockTicker';
import TestDriveButton from '@/components/TestDriveButton';
import { useLang } from '@/contexts/LangContext';

type TabType = 'delivery' | 'financial' | 'power' | 'dynamic';

const NEWS: Record<TabType, { zh: { tag: string; text: string }[]; en: { tag: string; text: string }[] }> = {
  delivery: {
    zh: [
      { tag: '交付动态', text: 'ES8 累计交付突破 9 万辆，旗舰 SUV 持续热销' },
      { tag: '新车发布', text: 'ES9 技术产品发布会 4 月 9 日即将举行，敬请期待' },
      { tag: '月度数据', text: '2026 年 3 月交付 35,500 辆，同比大幅增长' },
    ],
    en: [
      { tag: 'DELIVERY', text: 'ES8 cumulative deliveries surpass 90,000 units' },
      { tag: 'LAUNCH', text: 'ES9 Tech Event on Apr 9 — stay tuned for the unveiling' },
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
  dynamic: {
    zh: [
      { tag: '品牌动态', text: '蔚来ES9全球首秀，引领智能电动SUV新潮流' },
      { tag: '用户社区', text: '蔚来车主社区活跃度持续攀升，用户粘性领先行业' },
      { tag: '赛事活动', text: '蔚来车队在电动方程式锦标赛中取得优异成绩' },
    ],
    en: [
      { tag: 'BRAND', text: 'NIO ES9 global debut — leading smart electric SUV trend' },
      { tag: 'COMMUNITY', text: 'NIO owner community engagement continues to rise' },
      { tag: 'RACING', text: 'NIO team achieves excellent results in Formula E championship' },
    ],
  },
};

export default function AppShell() {
  const { lang, toggleLang, t } = useLang();
  const [activeTab, setActiveTab] = useState<TabType>('dynamic');
  const tabs: TabType[] = ['dynamic', 'delivery', 'financial', 'power'];
  const activeIndex = tabs.indexOf(activeTab);

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [activeTab]);

  // ── Scroll-driven navigation bar animation ──
  const headerRef = useRef<HTMLDivElement>(null);
  const brandRowRef = useRef<HTMLDivElement>(null);
  const tabRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const headerEl = headerRef.current;
      const brandRowEl = brandRowRef.current;
      const tabRowEl = tabRowRef.current;
      
      if (!headerEl || !brandRowEl || !tabRowEl) return;
      
      const brandHeight = brandRowEl.offsetHeight;
      const tabHeight = tabRowEl.offsetHeight;
      const headerHeight = headerEl.offsetHeight;
      
      // Calculate scroll progress (0 to 1)
      const progress = Math.min(Math.max(scrollY / brandHeight, 0), 1);
      
      // Move header up
      const translateY = -Math.min(scrollY, brandHeight);
      headerEl.style.transform = `translate3d(0, ${translateY}px, 0)`;
      
      // Scale tab row (only when scrolled)
      if (scrollY > 0) {
        const scale = 1 - progress * 0.05; // Scale down by 5%
        const scaleOrigin = 'center bottom';
        tabRowEl.style.transform = `scale(${scale})`;
        tabRowEl.style.transformOrigin = scaleOrigin;
      } else {
        tabRowEl.style.transform = 'scale(1)';
      }
    };
    
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Swipe carousel (direct DOM for zero-lag tracking) ──
  const panelRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const dragDir = useRef<'h' | 'v' | null>(null);
  const dragOffset = useRef(0);

  const onTouchStart = (e: React.TouchEvent) => {
    // Check if the touch is inside a scrollable table
    const target = e.target as HTMLElement;
    if (target.closest('.no-scrollbar') || target.closest('div[style*="overflowX: auto"]') || target.closest('div[style*="overflow-x: auto"]')) {
      return; // Skip if touch is inside a scrollable table
    }
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    dragDir.current = null;
    dragOffset.current = 0;
    if (panelRef.current) panelRef.current.style.transition = 'none';
  };

  const onTouchMove = (e: React.TouchEvent) => {
    // Check if touch started outside scrollable tables
    if (touchStartX.current === 0) return;
    
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;

    if (dragDir.current === null) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      dragDir.current = Math.abs(dx) > Math.abs(dy) ? 'h' : 'v';
    }
    if (dragDir.current !== 'h') return;

    // Rubber-band at first/last tab
    let offset = dx;
    if ((activeIndex === 0 && dx > 0) || (activeIndex === tabs.length - 1 && dx < 0)) {
      offset = dx * 0.18;
    }

    dragOffset.current = offset;
    if (panelRef.current) {
      panelRef.current.style.transform = `translateX(${offset}px)`;
    }
  };

  const onTouchEnd = () => {
    // Check if touch started outside scrollable tables
    if (touchStartX.current === 0) {
      return;
    }
    
    if (dragDir.current !== 'h') {
      // Reset touch state
      touchStartX.current = 0;
      touchStartY.current = 0;
      dragDir.current = null;
      dragOffset.current = 0;
      return;
    }

    const w = panelRef.current?.offsetWidth ?? 375;
    const offset = dragOffset.current;

    // Snap back first
    if (panelRef.current) {
      panelRef.current.style.transition = 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)';
      panelRef.current.style.transform = 'translateX(0)';
    }

    // Switch tab if threshold (25% of width) exceeded
    if (offset < -(w * 0.25) && activeIndex < tabs.length - 1) {
      setActiveTab(tabs[activeIndex + 1]);
    } else if (offset > w * 0.25 && activeIndex > 0) {
      setActiveTab(tabs[activeIndex - 1]);
    }

    // Reset touch state
    touchStartX.current = 0;
    touchStartY.current = 0;
    dragDir.current = null;
    dragOffset.current = 0;
  };

  return (
    <main className="page-shell">
      <PullEasterEgg />
      <TestDriveButton />

      {/* ── Sticky Header ── */}
      <div
        ref={headerRef}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          width: '100%',
          background: '#FFFFFF',
          borderBottom: '1px solid #EBEBEB',
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Brand row */}
        <div ref={brandRowRef} style={{ padding: '6px 20px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <StockTicker />
          <button
            onClick={toggleLang}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              background: 'transparent', border: 'none', padding: '4px 0',
              cursor: 'pointer', fontSize: '9px', fontWeight: 600,
              letterSpacing: '0.08em', color: '#0D0D0D',
            }}
          >
            <span style={{ opacity: lang === 'zh' ? 0.9 : 0.25, transition: 'opacity 0.2s' }}>ZH</span>
            <span style={{ width: '1px', height: '10px', background: '#DDD', display: 'inline-block' }} />
            <span style={{ opacity: lang === 'en' ? 0.9 : 0.25, transition: 'opacity 0.2s' }}>EN</span>
          </button>
        </div>

        {/* Tab row */}
        <div ref={tabRowRef} style={{ padding: '6px 20px 6px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflowX: 'auto', whiteSpace: 'nowrap', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="nav-capsule" style={{ margin: 0, minWidth: 'fit-content' }}>
            <div
              className="nav-indicator"
              style={{ width: 'calc(25% - 8px)', transform: `translateX(${activeIndex * 100}%)`, left: '4px' }}
            />
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`nav-pill ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
                style={{ width: '80px', textAlign: 'center' }}
              >
                {tab === 'delivery' ? t.tabDelivery : tab === 'financial' ? t.tabFinancial : tab === 'power' ? t.tabPower : '动态'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab Content (swipeable) ── */}
      <div style={{ overflow: 'hidden' }}>
        <div
          ref={panelRef}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{ touchAction: 'pan-y', willChange: 'transform' }}
        >
          <NewsTicker items={NEWS[activeTab][lang]} />

          {activeTab === 'delivery' && (
            <>
              <DeliveryChart />
              <ModelSection />
            </>
          )}
          {activeTab === 'financial' && <FinancialSection />}
          {activeTab === 'power' && <PowerSection />}
          {activeTab === 'dynamic' && (
            <div style={{ padding: '20px' }}>
              <h3 style={{ color: '#FFFFFF', marginBottom: '20px', fontSize: '18px', fontWeight: 600 }}>最近动态</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* 动态卡片 1 */}
                <div style={{
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: '12px',
                  padding: '16px',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <span style={{ color: '#FF6A00', fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em' }}>品牌动态</span>
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '9px' }}>2026-04-09</span>
                  </div>
                  <h4 style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>蔚来 ES9 产品技术发布会即将举行</h4>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', lineHeight: 1.5 }}>蔚来 ES9 产品技术发布会将于4月9日 19:00举行，全新旗舰SUV将带来5,280mm车长、2,010mm车宽、1,800mm车高、3,130mm轴距的豪华体验。</p>
                </div>
                
                {/* 动态卡片 2 */}
                <div style={{
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: '12px',
                  padding: '16px',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <span style={{ color: '#FF6A00', fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em' }}>技术创新</span>
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '9px' }}>2026-04-08</span>
                  </div>
                  <h4 style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>智能辅助驾驶系统全面升级</h4>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', lineHeight: 1.5 }}>蔚来推出安心高效的全场景智能辅助驾驶体验，依托蔚来云技术，实时关注车辆状态，提供安心之至的出行服务体验。</p>
                </div>
                
                {/* 动态卡片 3 */}
                <div style={{
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: '12px',
                  padding: '16px',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <span style={{ color: '#FF6A00', fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em' }}>能源服务</span>
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '9px' }}>2026-04-07</span>
                  </div>
                  <h4 style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>全球创新的智能能源服务体系</h4>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', lineHeight: 1.5 }}>蔚来搭建了可充可换可升级的能源服务体系，为用户提供全场景的加电服务，包括蔚来家充桩、换电站和充电车等多种选择。</p>
                </div>
                
                {/* 动态卡片 4 */}
                <div style={{
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: '12px',
                  padding: '16px',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <span style={{ color: '#FF6A00', fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em' }}>用户服务</span>
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '9px' }}>2026-04-06</span>
                  </div>
                  <h4 style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>NIO House 佛山顺德顺峰山蔚来中心开业</h4>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', lineHeight: 1.5 }}>蔚来中心·佛山顺德顺峰山正式开业，为用户提供Living Café、Gallery、Joy Camp和Community Chamber等多元化服务空间。</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Footer ── */}
      <footer style={{ padding: '20px 20px 36px', background: '#0B0F14' }}>
        <div style={{ width: '32px', height: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '14px' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>
            Blue Sky Coming
          </span>
          <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '8px' }}>·</span>
          <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em' }}>
            {t.footerCopyright}
          </span>
        </div>
        <p style={{ fontSize: '8.5px', color: 'rgba(255,255,255,0.2)', lineHeight: 1.7, letterSpacing: '0.01em', maxWidth: '360px' }}>
          {t.disclaimerBody}
        </p>
      </footer>
    </main>
  );
}
