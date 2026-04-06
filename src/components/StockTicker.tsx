"use client";
import React, { useState, useEffect, useCallback } from 'react';

interface StockData {
  price: number;
  change: number;
  changePercent: number;
  isMarketOpen: boolean;
}

interface DualStockData {
  us: StockData | null;
  hk: StockData | null;
}

/** Try multiple endpoints for one Yahoo Finance symbol, return parsed meta or null */
async function fetchSymbol(symbol: string): Promise<StockData | null> {
  const base = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1m&range=1d`;
  const endpoints = [
    base,
    `https://corsproxy.io/?${encodeURIComponent(base)}`,
    `https://api.allorigins.win/get?url=${encodeURIComponent(base)}`,
  ];

  for (let i = 0; i < endpoints.length; i++) {
    try {
      const res = await fetch(endpoints[i], { cache: 'no-store' });
      let json = await res.json();
      // allorigins wraps response in { contents: "..." }
      if (i === 2 && json?.contents) json = JSON.parse(json.contents);

      const meta = json?.chart?.result?.[0]?.meta as Record<string, number> | undefined;
      if (!meta) continue;

      const price = meta.regularMarketPrice ?? 0;
      const prevClose = meta.chartPreviousClose ?? meta.previousClose ?? price;
      const change = price - prevClose;
      const changePercent = prevClose ? (change / prevClose) * 100 : 0;
      const isMarketOpen = meta.regularMarketTime
        ? Date.now() / 1000 - meta.regularMarketTime < 900
        : false;

      return { price, change, changePercent, isMarketOpen };
    } catch {
      // try next
    }
  }
  return null;
}

/* ── Single stock row ── */
function StockRow({
  label,
  exchange,
  prefix,
  data,
  decimals = 2,
}: {
  label: string;
  exchange: string;
  prefix: string;
  data: StockData | null;
  decimals?: number;
}) {
  if (!data) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: '#0D0D0D' }}>{label}</span>
        <span style={{ fontSize: '8px', color: 'rgba(0,0,0,0.25)', letterSpacing: '0.05em' }}>{exchange} · —</span>
      </div>
    );
  }

  const isUp = data.change >= 0;
  const color = isUp ? '#00A86B' : '#E0382C';
  const arrow = isUp ? '▲' : '▼';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
      {/* ticker + exchange */}
      <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: '#0D0D0D' }}>{label}</span>
      <span style={{ fontSize: '7.5px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.04em' }}>{exchange}</span>

      {/* live dot */}
      {data.isMarketOpen && (
        <span style={{
          width: '3.5px', height: '3.5px', borderRadius: '50%',
          background: '#00A86B', flexShrink: 0,
          animation: 'live-pulse 2.2s ease-in-out infinite',
        }} />
      )}

      {/* price */}
      <span style={{ fontSize: '11px', fontWeight: 600, color: '#0D0D0D', letterSpacing: '-0.01em' }}>
        {prefix}{data.price.toFixed(decimals)}
      </span>

      {/* change */}
      <span style={{ fontSize: '8.5px', fontWeight: 500, color, letterSpacing: '0.01em' }}>
        {arrow}{Math.abs(data.changePercent).toFixed(1)}%
      </span>
    </div>
  );
}

/* ── Skeleton row ── */
function SkeletonRow({ label, exchange }: { label: string; exchange: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
      <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: '#0D0D0D' }}>{label}</span>
      <span style={{ fontSize: '7.5px', color: 'rgba(0,0,0,0.25)', letterSpacing: '0.04em' }}>{exchange}</span>
      <div style={{
        width: '52px', height: '7px', borderRadius: '3px',
        background: 'linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer-sweep 1.4s ease-in-out infinite',
      }} />
    </div>
  );
}

/* ── Main component ── */
export default function StockTicker() {
  const [data, setData] = useState<DualStockData>({ us: null, hk: null });
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    try {
      const [us, hk] = await Promise.allSettled([
        fetchSymbol('NIO'),
        fetchSymbol('9866.HK'),
      ]);
      setData({
        us: us.status === 'fulfilled' ? us.value : null,
        hk: hk.status === 'fulfilled' ? hk.value : null,
      });
    } catch (err) {
      console.error('Error fetching stock data:', err);
      setData({ us: null, hk: null });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
    const timer = setInterval(fetchAll, 60_000);
    return () => clearInterval(timer);
  }, [fetchAll]);

  // Check if we have any data to display
  const hasData = data.us !== null || data.hk !== null;

  return (
    <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
      {loading ? (
        <>
          <SkeletonRow label="NIO" exchange="NYSE" />
          <div style={{ width: '1px', height: '14px', background: '#E8E8E8', flexShrink: 0 }} />
          <SkeletonRow label="9866" exchange="HKEX" />
        </>
      ) : hasData ? (
        <>
          {data.us && <StockRow label="NIO"  exchange="NYSE" prefix="$"   data={data.us} decimals={2} />}
          {data.us && data.hk && <div style={{ width: '1px', height: '14px', background: '#E8E8E8', flexShrink: 0 }} />}
          {data.hk && <StockRow label="9866" exchange="HKEX" prefix="HK$" data={data.hk} decimals={2} />}
        </>
      ) : null}
    </div>
  );
}
