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

type TabType = 'delivery' | 'financial' | 'power';

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
      { tag: '里程碑', text: '累计换电次数突破 1.071 亿次，全球最大换电网络' },
      { tag: '充电生态', text: '接入第三方充电桩超 28,456 根，86% 用户来自非蔚来车主' },
    ],
    en: [
      { tag: 'NETWORK', text: '3,789 swap stations — highway coverage expanding' },
      { tag: 'MILESTONE', text: '107.1M cumulative swaps — world\'s largest swap network' },
      { tag: 'CHARGING', text: '28,456 3rd-party poles; 86% users are non-NIO owners' },
    ],
  },
};

export default function AppShell() {
  const { lang, toggleLang, t } = useLang();
  const [activeTab, setActiveTab] = useState<TabType>('delivery');
  const tabs: TabType[] = ['delivery', 'financial', 'power'];
  const activeIndex = tabs.indexOf(activeTab);

  // Scroll to top when tab changes, then reset tab bar to initial state
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    window.dispatchEvent(new Event('scroll'));
  }, [activeTab]);

  // ── Scroll-driven progressive tab bar shrink + color ──
  const brandRowRef = useRef<HTMLDivElement>(null);
  const tabRowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const onScroll = () => {
      const brandH = brandRowRef.current?.offsetHeight ?? 44;
      const p = Math.min(Math.max(window.scrollY / brandH, 0), 1);
      const el = tabRowRef.current;
      if (!el) return;

      // Outer padding: 8px → 4px
      const pad = lerp(8, 4, p);
      el.style.paddingTop = `${pad}px`;
      el.style.paddingBottom = `${pad}px`;

      // Background: white → #0B1015 (matches chart dark)
      const bgR = Math.round(lerp(255, 11, p));
      const bgG = Math.round(lerp(255, 15, p));
      const bgB = Math.round(lerp(255, 20, p));
      el.style.background = `rgba(${bgR},${bgG},${bgB},0.96)`;

      // Shadow
      const shadowA = lerp(0, 0.5, p).toFixed(3);
      const shadowY = lerp(0, 8, p).toFixed(1);
      const shadowBlur = lerp(0, 24, p).toFixed(1);
      el.style.boxShadow = `0 ${shadowY}px ${shadowBlur}px rgba(0,0,0,${shadowA})`;

      // Border: grey → subtle NIO blue glow
      const bdrR = Math.round(lerp(235, 0, p));
      const bdrG = Math.round(lerp(235, 163, p));
      const bdrB = Math.round(lerp(235, 218, p));
      const bdrA = lerp(1, 0.15, p).toFixed(2);
      el.style.borderBottom = `1px solid rgba(${bdrR},${bdrG},${bdrB},${bdrA})`;

      // Pills: padding + font
      const pills = el.querySelectorAll('.nav-pill') as NodeListOf<HTMLElement>;
      pills.forEach(pill => {
        pill.style.setProperty('padding', `${lerp(8,5,p).toFixed(1)}px ${lerp(18,14,p).toFixed(1)}px`, 'important');
        pill.style.setProperty('font-size', `${lerp(13,11,p).toFixed(1)}px`, 'important');
        // Inactive text: dark → muted white
        const tv = Math.round(lerp(0, 255, p));
        pill.style.setProperty('color', `rgba(${tv},${tv},${tv},${lerp(0.4, 0.45, p).toFixed(2)})`, 'important');
      });

      // Active pill: dark → bright white
      const activePill = el.querySelector('.nav-pill.active') as HTMLElement | null;
      if (activePill) {
        const av = Math.round(lerp(13, 255, p));
        activePill.style.setProperty('color', `rgb(${av},${av},${av})`, 'important');
      }

      // Nav capsule: light frosted → dark frosted
      const capsule = el.querySelector('.nav-capsule') as HTMLElement | null;
      if (capsule) {
        const cv = Math.round(lerp(245, 255, p));
        const ca = lerp(0.7, 0.07, p).toFixed(2);
        capsule.style.setProperty('background', `rgba(${cv},${cv},${cv},${ca})`, 'important');
        capsule.style.setProperty('border', `1px solid rgba(255,255,255,${lerp(0.4, 0.1, p).toFixed(2)})`, 'important');
      }

      // Indicator: white solid → subtle white ghost
      const indicator = el.querySelector('.nav-indicator') as HTMLElement | null;
      if (indicator) {
        indicator.style.setProperty('background', `rgba(255,255,255,${lerp(1, 0.12, p).toFixed(2)})`, 'important');
        indicator.style.setProperty('box-shadow', `0 2px 8px rgba(0,0,0,${lerp(0.08, 0, p).toFixed(3)})`, 'important');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
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

      {/* ── Brand row — scrolls away ── */}
      <div ref={brandRowRef} style={{
        padding: '10px 20px 6px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: '#fff',
      }}>
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

      {/* ── Tab row — sticks to top ── */}
      <div ref={tabRowRef} style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
        padding: '8px 0',
        display: 'flex', justifyContent: 'center',
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(24px) saturate(200%)',
        WebkitBackdropFilter: 'blur(24px) saturate(200%)',
        borderBottom: '1px solid #EBEBEB',
        transform: 'translate3d(0,0,0)',
      }}>
        <div className="nav-capsule" style={{ margin: 0 }}>
          <div
            className="nav-indicator"
            style={{ width: 'calc(33.33% - 8px)', transform: `translateX(${activeIndex * 100}%)`, left: '4px' }}
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
