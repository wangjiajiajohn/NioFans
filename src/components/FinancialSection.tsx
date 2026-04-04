"use client";
import React from 'react';
import { FINANCIAL_DATA } from '@/constants/nioData';

const StatItem = ({ label, value, trend }: { label: string, value: string, trend?: string }) => (
  <div className="flex flex-col items-center text-center px-4 py-8 group transition-all duration-300">
    <div className="t-pure-label mb-6 text-[8px] opacity-40 group-hover:opacity-100">{label}</div>
    <div className="text-3xl font-thin tracking-tight text-zinc-900 group-hover:text-[#00A3DA] transition-colors">{value}</div>
    {trend && (
      <div className="flex flex-col items-center mt-6">
        <div className="w-[0.5px] h-8 bg-zinc-100 group-hover:bg-[#00A3DA]/20 transition-colors" />
        <div className={`mt-4 text-[10px] font-bold tracking-widest ${trend.startsWith('+') ? 'text-[#00A3DA]' : 'text-zinc-600'}`}>
          {trend} <span className="text-[8px] opacity-30 font-normal">同比</span>
        </div>
      </div>
    )}
  </div>
);

export default function FinancialSection() {
  const latest = FINANCIAL_DATA[0];

  return (
    <div className="w-full flex flex-col items-center py-20">
      <div className="text-center mb-24 px-4 px-2">
        <h3 className="t-pure-label mb-8">核心财务指标综述 · {latest.quarter}</h3>
        <p className="t-pure-desc max-w-[280px] mx-auto opacity-50 px-2 font-extralight tracking-widest text-[11px]">
          季度营收与资产运营质量的核心指标追踪。反映 NIO 在高端市场的经营韧性。
        </p>
      </div>

      <div className="w-full grid grid-cols-2 hairline-t hairline-b">
        <div className="hairline-r">
          <StatItem 
            label="季度总营收" 
            value={`${latest.revenue}亿`} 
            trend={latest.gap >= 0 ? `+${latest.gap}%` : `${latest.gap}%`}
          />
        </div>
        <StatItem 
          label="整车毛利率" 
          value={`${latest.vehicleMargin}%`} 
          trend="+2.1%"
        />
      </div>
      
      <div className="w-full grid grid-cols-2 hairline-b">
        <div className="hairline-r">
          <StatItem 
            label="现金储备" 
            value={`${latest.cash}亿`} 
            trend="+1.2%"
          />
        </div>
        <StatItem 
          label="季度研发支出" 
          value={`${latest.rd}亿`} 
          trend="+5.2%"
        />
      </div>

      <div className="mt-24 text-center opacity-30 px-4">
        <div className="text-[10px] tracking-[0.6em] font-medium uppercase font-black px-2">NIO INVESTOR RELATIONS</div>
      </div>
    </div>
  );
}
