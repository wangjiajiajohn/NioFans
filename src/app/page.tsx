"use client";
import React from 'react';
import Banner from '@/components/Banner';
import DeliveryChart from '@/components/DeliveryChart';
import ModelSection from '@/components/ModelSection';
import PullEasterEgg from '@/components/PullEasterEgg';

export default function AppShell() {
  return (
    <main className="page-shell">
      <PullEasterEgg />
      <Banner />
      <DeliveryChart />
      <ModelSection />

      {/* ── Site Footer ── */}
      <footer style={{ padding: '36px 16px 52px', textAlign: 'center', background: '#0B0F14' }}>
        <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.1)', margin: '0 auto 24px' }} />

        <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.28em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginBottom: '6px' }}>
          Blue Sky Coming
        </p>
        <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '28px' }}>
          © 2026 NIO Fans Portal · 非官方数据
        </p>

        {/* Legal disclaimer */}
        <div style={{
          maxWidth: '340px', margin: '0 auto',
          padding: '16px', borderRadius: '10px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}>
          <p style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '8px' }}>
            免责声明 · Disclaimer
          </p>
          <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.8, letterSpacing: '0.02em' }}>
            本站为蔚来汽车独立爱好者自建的非商业数据展示平台，与蔚来汽车（NIO Inc.）无任何官方关联。
            所有交付数据均来源于蔚来官方公开发布的月度报告，仅供参考，不构成任何投资建议。
            本站不对数据的完整性及时效性作出任何保证。
          </p>
          <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.2)', lineHeight: 1.7, letterSpacing: '0.02em', marginTop: '8px' }}>
            This is an independent fan site. Not affiliated with NIO Inc. Data sourced from official public reports. Not financial advice.
          </p>
        </div>
      </footer>

    </main>
  );
}

