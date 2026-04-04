"use client";
import React from 'react';
import { EVENTS } from '@/constants/nioData';

const EventItem = ({ date, title, desc, tag }: { date: string, title: string, desc: string, tag: string }) => (
  <div className="flex flex-col items-center text-center mb-24 last:mb-0 relative py-4 group px-4">
    <div className="t-pure-label mb-4 text-[9px] opacity-40 group-hover:opacity-100">{date} · {tag}</div>
    <div className="text-xl font-extralight tracking-tight text-zinc-900 group-hover:text-[#00A3DA] transition-colors mb-6 leading-tight max-w-[280px]">
      {title}
    </div>
    
    {/* ── Vertical Line Part ── */}
    <div className="w-[0.5px] h-12 bg-zinc-100 group-last:hidden transition-colors" />
    
    <div className="mt-8 text-[11px] text-zinc-400 font-light leading-relaxed max-w-[300px] opacity-50 px-2">
      {desc}
    </div>
  </div>
);

export default function EventSection() {
  return (
    <div className="w-full flex flex-col items-center py-20 px-2">
      <div className="text-center mb-24 px-4 px-2">
        <h3 className="t-pure-label mb-8">重大事件回顾 · Milestones</h3>
        <p className="t-pure-desc max-w-[280px] mx-auto opacity-50 px-2 font-extralight tracking-widest text-[11px]">
          记录 NIO 在全球化进程、产品发布及技术创新的关键时刻。
        </p>
      </div>

      <div className="w-full flex flex-col items-center">
        {EVENTS.map((ev, i) => (
          <EventItem 
            key={i}
            date={ev.date}
            title={ev.title}
            desc={ev.desc}
            tag={ev.tag}
          />
        ))}
      </div>

      <div className="mt-32 text-center opacity-30 px-4">
         <div className="text-[10px] tracking-[0.5em] font-medium uppercase font-black px-2">Blue Sky Coming</div>
      </div>
    </div>
  );
}
