"use client";
import React from 'react';
import { SWAP_DATA } from '@/constants/nioData';

const ProgressItem = ({ label, current, target, unit = "座" }: { label: string, current: number, target: number, unit?: string }) => {
  const percent = Math.min(100, (current / target) * 100);
  return (
    <div className="w-full flex flex-col items-center mb-16 px-4 group">
      <div className="t-pure-label mb-6 text-[9px] opacity-40 group-hover:opacity-100">{label}</div>
      <div className="text-4xl font-thin tracking-tight text-zinc-900 group-hover:text-[#00A3DA] transition-colors mb-8">
        {current.toLocaleString()} <span className="text-[11px] font-normal text-zinc-400">{unit}</span>
      </div>
      
      {/* ── Ethereal Thin Progress track ── */}
      <div className="w-full max-w-[240px] h-[0.5px] bg-zinc-100 relative mb-4">
        <div 
          className="absolute h-[1.5px] bg-[#00A3DA] top-[-0.5px] transition-all duration-1000 shadow-[0_0_12px_rgba(0,163,218,0.4)]"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="text-[10px] text-zinc-300 font-medium tracking-widest uppercase">
        目标总量 {target.toLocaleString()} · {percent.toFixed(1)}%
      </div>
    </div>
  );
};

export default function SwapSection() {
  return (
    <div className="w-full flex flex-col items-center py-20 px-2">
      <div className="text-center mb-24 px-4 px-2">
        <h3 className="t-pure-label mb-8">加电网络建设实况 · Infrastructure</h3>
        <p className="t-pure-desc max-w-[280px] mx-auto opacity-50 px-2 font-extralight tracking-widest text-[11px]">
          截至目前补能基础设施建设进度。践行“让加电比加油更方便”的品牌愿景。
        </p>
      </div>

      <ProgressItem label="全国累计换电站" current={SWAP_DATA.total} target={SWAP_DATA.target2025} />
      <ProgressItem label="高速换电网络覆盖" current={SWAP_DATA.highway} target={1000} />

      <div className="w-full grid grid-cols-2 hairline-t">
        <div className="hairline-r py-12 flex flex-col items-center group">
          <div className="t-pure-label mb-4 text-[8px] opacity-40">2024 年度新增</div>
          <div className="text-2xl font-thin text-zinc-900 group-hover:text-[#00A3DA] transition-all">{SWAP_DATA.ytd}</div>
        </div>
        <div className="py-12 flex flex-col items-center group">
          <div className="t-pure-label mb-4 text-[8px] opacity-40">合作开放伙伴</div>
          <div className="text-2xl font-thin text-zinc-900 group-hover:text-[#00A3DA] transition-all">{SWAP_DATA.partners}</div>
        </div>
      </div>

      <div className="mt-20 t-pure-label opacity-30 text-[9px] tracking-[0.4em] px-2 text-center uppercase font-black">
        Power Swap System 4.0 Deployment
      </div>
    </div>
  );
}
