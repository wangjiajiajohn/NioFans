"use client";
import React from 'react';
import Banner from '@/components/Banner';
import DeliveryChart from '@/components/DeliveryChart';
import ModelSection from '@/components/ModelSection';

export default function AppShell() {
  return (
    <main className="page-shell">
      <Banner />
      <DeliveryChart />
      <ModelSection />

      {/* ── Site Footer ── */}
      <footer style={{ padding: '36px 16px 52px', textAlign: 'center', background: '#0B0F14' }}>
        <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.1)', margin: '0 auto 24px' }} />
        <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.28em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginBottom: '8px' }}>
          Blue Sky Coming
        </p>
        <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
          © 2026 NIO Fans Portal · 非官方数据
        </p>
      </footer>
    </main>
  );
}

