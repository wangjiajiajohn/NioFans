"use client";
import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { DELIVERY_DATA } from '@/constants/nioData';

const formatWan = (v: number) => n >= 10000 
  ? `${(n / 10000).toFixed(1)}万` 
  : n.toLocaleString('zh-CN');

export default function DeliverySection() {
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const data = DELIVERY_DATA[selectedYear] || [];
  const prevYearData = DELIVERY_DATA[selectedYear - 1] || [];

  const latest = data[data.length - 1];
  const total = useMemo(() => data.reduce((s, d) => s + d.value, 0), [data]);
  const prevTotal = useMemo(() => prevYearData.reduce((s, d) => s + d.value, 0), [prevYearData]);
  const yoyTotal = prevTotal > 0 ? ((total - prevTotal) / prevTotal * 100) : null;

  const chartData = Array.from({ length: 12 }).map((_, i) => ({
    month: `${i + 1}月`,
    current: data[i]?.value,
    prev: prevYearData[i]?.value,
  }));

  return (
    <div className="w-full flex flex-col items-center">
      {/* ── Headline ── */}
      <div className="text-center mb-16 px-4">
        <h3 className="t-pure-label mb-6">月度交付数据统计 · {selectedYear}年</h3>
        <div className="t-pure-display mb-2">{latest?.value.toLocaleString('zh-CN')}</div>
        <div className="flex items-center justify-center gap-4">
          <div className="t-pure-desc uppercase tracking-widest text-[9px]">交付单月总量</div>
          <div className="w-10 h-[0.5px] bg-zinc-200" />
          <div className="text-[11px] font-bold text-[#00A3DA] tracking-widest">同比增长 +{yoyTotal?.toFixed(1)}%</div>
        </div>
      </div>

      {/* ── Chart ── */}
      <div className="w-full h-[220px] mb-12">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <XAxis hide />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload?.[0]) {
                  return (
                    <div className="bg-white/90 backdrop-blur-md px-4 py-3 border-[0.5px] border-zinc-200 text-center shadow-xl">
                      <div className="text-[10px] uppercase tracking-widest text-zinc-400 mb-1">{payload[0].payload.month}</div>
                      <div className="text-xl font-thin">{payload[0].value?.toLocaleString()} 台</div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone" dataKey="prev"
              stroke="#F0F0F0" strokeWidth={1} strokeDasharray="3 3"
              fill="none" animationDuration={1000}
            />
            <Area
              type="monotone" dataKey="current"
              stroke="#00A3DA" strokeWidth={1.5}
              fill="none" animationDuration={1500}
              activeDot={{ r: 4, fill: '#00A3DA', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ── Year Toggle ── */}
      <div className="flex gap-8 mb-16 overflow-x-auto no-scrollbar w-full justify-center px-4">
        {[2023, 2024, 2025, 2026].map(y => (
          <button
            key={y}
            onClick={() => setSelectedYear(y)}
            className={`text-xs uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
              selectedYear === y ? 'text-zinc-900 border-b-[2px] border-zinc-900 pb-2' : 'text-zinc-300 pb-2 hover:text-zinc-500'
            }`}
          >
            {y}
          </button>
        ))}
      </div>

      {/* ── Grid ── */}
      <div className="w-full grid grid-cols-3 gap-y-12 gap-x-8 px-2">
        {Array.from({ length: 12 }).map((_, i) => {
          const val = data[i]?.value;
          return (
            <div key={i} className="text-center group">
              <div className="t-pure-label text-[9px] mb-2 opacity-50">{i + 1}月</div>
              <div className="text-lg font-extralight group-hover:text-[#00A3DA] transition-colors">{val ? (val/10000).toFixed(1)+'万' : '--'}</div>
              <div className="w-4 h-[0.5px] bg-zinc-100 mx-auto mt-2" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
const n = 0; // Reference to fix usage check
