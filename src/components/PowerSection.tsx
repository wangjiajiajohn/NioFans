import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import { POWER_DATA, SWAP_GROWTH_HISTORY } from '@/constants/nioData';
import { useLang } from '@/contexts/LangContext';
import CountUp from './CountUp';
import { getAssetPath } from '@/utils/paths';

// ── Custom Tooltip ──────────────────────────────────────────────────────────
interface TooltipPayload { value: number; }
function SwapTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(11,15,20,0.97)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(0,163,218,0.25)',
        padding: '10px 14px',
        borderRadius: '10px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.8)'
      }}>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '9px', marginBottom: '4px', letterSpacing: '0.06em' }}>{label}</p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
          <span style={{ color: '#00C3FF', fontSize: '18px', fontWeight: 700 }}>
            {payload[0].value.toLocaleString()}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '9px' }}>座</span>
        </div>
      </div>
    );
  }
  return null;
}

// ── Number Formatter ───────────────────────────────────────────────────────
function fmtMillion(n: number) {
  const m = n / 1_000_000;
  return m >= 100 ? m.toFixed(0) : m.toFixed(2);
}

// ── Main Component ──────────────────────────────────────────────────────────
export default function PowerSection() {
  const { t, lang } = useLang();
  const d = POWER_DATA;

  // Progress toward 4000 target (% of 2025 target)
  const progressPct = Math.min(d.swapStations / 4000, 1);

  const swapSessionsM = fmtMillion(d.totalSwapSessions);
  const chargeSessionsM = fmtMillion(d.totalChargeSessions);
  const thirdPartyM = (d.thirdPartyPoles / 10000).toFixed(1);

  return (
    <div className="w-full anim-fade-up" style={{ background: '#FFFFFF' }}>

      {/* ── Dark Mode Data Terminal ── */}
      <div style={{
        background: 'linear-gradient(to bottom, #FFFFFF 0%, #0B1015 20px)',
        padding: '0 16px 28px',
      }}>
        <div className="chart-shell" style={{ padding: '24px 20px', background: '#0B1015', borderRadius: '28px' }}>

          {/* ── Hero Card: Total Stations ── */}
          <div style={{
            padding: '24px 22px',
            borderRadius: '20px',
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.08)',
            marginBottom: '16px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Blue glowing accent */}
            <div style={{
              position: 'absolute', top: 0, right: 0, width: '160px', height: '160px',
              background: 'radial-gradient(circle at 100% 0%, rgba(0,163,218,0.22), transparent 70%)',
              pointerEvents: 'none',
            }} />

            <p style={{ fontSize: '9px', fontWeight: 700, color: '#00A3DA', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '12px' }}>
              {t.pwrStationTotal}
            </p>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
              <span style={{ fontSize: '52px', fontWeight: 100, color: '#FFF', letterSpacing: '-0.04em', lineHeight: 1 }}>
                <CountUp end={d.totalStations} />
              </span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.3)' }}>{t.pwrUnit}</span>
            </div>
            
            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginBottom: '24px', letterSpacing: '0.04em' }}>
              {lang === 'zh' ? '蔚来能源充换电综合服务网络' : 'NIO Power Infrastructure Network'}
            </p>

            {/* Split row: Swap & Charge overview */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
              <div style={{ background: 'rgba(0,163,218,0.08)', borderRadius: '14px', padding: '14px', border: '1px solid rgba(0,163,218,0.15)' }}>
                <p style={{ fontSize: '8px', color: 'rgba(255,255,255,0.35)', marginBottom: '8px', letterSpacing: '0.06em' }}>{t.pwrSwapTotal}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                  <span style={{ fontSize: '26px', fontWeight: 300, color: '#00C3FF' }}><CountUp end={d.swapStations} /></span>
                  <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)' }}>{t.pwrUnit}</span>
                </div>
              </div>
              <div style={{ background: 'rgba(0,200,150,0.06)', borderRadius: '14px', padding: '14px', border: '1px solid rgba(0,200,150,0.12)' }}>
                <p style={{ fontSize: '8px', color: 'rgba(255,255,255,0.35)', marginBottom: '8px', letterSpacing: '0.06em' }}>{t.pwrChargeStations}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                  <span style={{ fontSize: '26px', fontWeight: 300, color: '#00C896' }}><CountUp end={d.chargeStations} /></span>
                  <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)' }}>{t.pwrUnit}</span>
                </div>
              </div>
            </div>

            {/* Target Progress Bar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>
                  {lang === 'zh' ? '2025 年换电站部署目标进度' : '2025 Swap Station Progress'}
                </span>
                <span style={{ fontSize: '9px', fontWeight: 700, color: '#00A3DA' }}>
                  {(progressPct * 100).toFixed(1)}% / 4,000
                </span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '100px', height: '6px', overflow: 'hidden' }}>
                <div style={{
                  width: `${progressPct * 100}%`,
                  height: '100%',
                  borderRadius: '100px',
                  background: 'linear-gradient(90deg, #00A3DA, #00E5FF)',
                  boxShadow: '0 0 10px rgba(0,195,255,0.4)',
                }} />
              </div>
            </div>
          </div>

          {/* ── Cumulative Stats Grid ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            {/* Swap Sessions */}
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '18px', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #00A3DA, transparent)' }} />
              <p style={{ fontSize: '8px', color: 'rgba(255,255,255,0.35)', marginBottom: '10px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {t.pwrTotalSessions}
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                <span style={{ fontSize: '24px', fontWeight: 200, color: '#FFF' }}>{swapSessionsM}</span>
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', marginLeft: '4px' }}>
                  {lang === 'zh' ? '百万次' : 'M times'}
                </span>
              </div>
            </div>
            {/* Charge Sessions */}
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '18px', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #00C896, transparent)' }} />
              <p style={{ fontSize: '8px', color: 'rgba(255,255,255,0.35)', marginBottom: '10px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {t.pwrChargeSessions}
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                <span style={{ fontSize: '24px', fontWeight: 200, color: '#FFF' }}>{chargeSessionsM}</span>
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', marginLeft: '4px' }}>
                  {lang === 'zh' ? '百万次' : 'M times'}
                </span>
              </div>
            </div>
          </div>

          {/* ── Third-Party Open Network Card ── */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '16px',
            padding: '18px 20px',
            border: '1px solid rgba(255,255,255,0.05)',
            marginBottom: '16px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #8E5AFF, transparent)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>
                  {t.pwrThirdParty}
                </p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontSize: '30px', fontWeight: 200, color: '#FFF' }}>{thirdPartyM}</span>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>
                    {lang === 'zh' ? '万根' : 'M poles'}
                  </span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em', marginBottom: '6px' }}>{t.pwrThirdPartyRatio}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px', justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: '28px', fontWeight: 300, color: '#8E5AFF' }}>
                    <CountUp end={d.thirdPartyUserRatio} decimals={2} />
                  </span>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>%</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Growth History Trend Area Chart ── */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#00A3DA', marginBottom: '3px' }}>
                  {t.pwrGrowthTitle}
                </p>
                <p style={{ fontSize: '14px', fontWeight: 300, color: '#FFF', opacity: 0.85, letterSpacing: '-0.01em' }}>
                  {t.pwrGrowthSubtitle}
                </p>
              </div>
              <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.2)' }}>{t.pwrUnit}</span>
            </div>
            <div style={{ height: '140px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={SWAP_GROWTH_HISTORY} margin={{ top: 8, right: 4, left: -28, bottom: 0 }}>
                  <defs>
                    <linearGradient id="swapGrowthGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00A3DA" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#00A3DA" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="period"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 8, fill: 'rgba(255,255,255,0.2)' }}
                    interval={1}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 7, fill: 'rgba(255,255,255,0.15)' }}
                    tickFormatter={(v) => `${(v/1000).toFixed(0)}k`}
                    domain={[0, 4200]}
                  />
                  <Tooltip content={<SwapTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="swapStations"
                    stroke="#00C3FF"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#swapGrowthGradient)"
                    dot={{ fill: '#00C3FF', r: 3, strokeWidth: 0 }}
                    activeDot={{ fill: '#FFF', r: 4, stroke: '#00C3FF', strokeWidth: 2 }}
                    animationDuration={1600}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ── Station Map ── */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: '20px',
            marginBottom: '16px',
          }}>
            <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#00A3DA', marginBottom: '12px' }}>
              {lang === 'zh' ? '全球补能网络分布' : 'Global Power Network'}
            </p>
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(0,163,218,0.15)',
              position: 'relative',
              background: '#0D1520',
              height: '220px',
            }}>
              <img
                src={getAssetPath('/power-map.png')}
                alt="NIO Power station map"
                draggable={false}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'block',
                  objectFit: 'cover',
                  filter: 'brightness(0.88) contrast(1.05) saturate(1.1)',
                  userSelect: 'none',
                }}
              />
            </div>
          </div>

          {/* ── Bottom Data Source Info ── */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.04)',
            paddingTop: '16px',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.15)', lineHeight: 1.6 }}>
              {t.pwrDataSource}
              <br />
              {lang === 'zh' ? `截至 ${d.updatedAt}` : `Updated as of ${d.updatedAt}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
