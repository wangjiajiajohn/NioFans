"use client";
import React from 'react';
import { useLang } from '@/contexts/LangContext';
import FinancialChart from './FinancialChart';

export default function FinancialSection() {
  const { t } = useLang();

  return (
    <div className="w-full anim-fade-up" style={{ background: '#FFFFFF' }}>
      <div style={{ padding: '24px 16px 0' }}>
        <p className="section-label" style={{ marginBottom: '14px' }}>
          {t.tabFinancial}
        </p>
      </div>

      <FinancialChart />
    </div>
  );
}
