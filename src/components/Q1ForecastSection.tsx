"use client";
import React from 'react';

export default function Q1ForecastSection() {
  return (
    <div style={{ background: '#F5F5F7', minHeight: '100vh', paddingBottom: '32px' }}>
      {/* ── Hero Banner ── */}
      <div style={{
        background: 'linear-gradient(145deg, #0A1628 0%, #0D2847 40%, #0077B6 100%)',
        padding: '32px 20px 28px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* 装饰光效 */}
        <div style={{
          position: 'absolute', top: '-40px', right: '-30px',
          width: '180px', height: '180px',
          background: 'radial-gradient(circle, rgba(0,163,218,0.3) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute', bottom: '-20px', left: '20%',
          width: '120px', height: '120px',
          background: 'radial-gradient(circle, rgba(0,163,218,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(0,163,218,0.25)',
            backdropFilter: 'blur(10px)',
            padding: '4px 12px',
            borderRadius: '100px',
            fontSize: '10px',
            fontWeight: 600,
            color: '#7DD3FC',
            letterSpacing: '0.12em',
            marginBottom: '14px',
          }}>NIOFANS 深度研究</div>
          <h1 style={{
            fontSize: '24px', fontWeight: 800, color: '#fff',
            lineHeight: 1.3, marginBottom: '8px',
            letterSpacing: '-0.01em',
          }}>
            蔚来 2026 Q1<br />财务深度精算
          </h1>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5, maxWidth: '280px' }}>
            基于 ES8 结构性爆发的穿透式损益推演
          </p>

          {/* 三个核心指标 */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px',
            marginTop: '24px',
          }}>
            {[
              { val: '312.8亿', label: '模型预测营收', accent: true },
              { val: '20.2%', label: '综合整车毛利率', accent: false },
              { val: '13.7亿', label: 'Non-GAAP利润', accent: false },
            ].map((d, i) => (
              <div key={i} style={{
                background: d.accent ? 'rgba(0,163,218,0.2)' : 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                padding: '12px 10px',
                border: `1px solid ${d.accent ? 'rgba(0,163,218,0.35)' : 'rgba(255,255,255,0.1)'}`,
              }}>
                <div style={{ fontSize: '17px', fontWeight: 700, color: '#fff', marginBottom: '2px' }}>{d.val}</div>
                <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.02em' }}>{d.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 超指引提示条 ── */}
      <div style={{
        margin: '0 16px', marginTop: '-14px', position: 'relative', zIndex: 2,
        background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
        borderRadius: '12px',
        padding: '12px 16px',
        display: 'flex', alignItems: 'center', gap: '10px',
        boxShadow: '0 4px 20px rgba(255,107,53,0.3)',
      }}>
        <span style={{ fontSize: '20px' }}>⚡</span>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>超官方指引 25%</div>
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.8)' }}>模型值 312.8 亿 vs 官方指引 ~250 亿</div>
        </div>
      </div>

      {/* ── 正文区域 ── */}
      <div style={{ padding: '20px 16px 0' }}>

        {/* 第一部分：Q4 锚点 */}
        <SectionCard>
          <SectionHeader num="01" title="Q4 盈利锚点回顾" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
            {[
              { val: '12.48万', label: '交付量', icon: '🚗' },
              { val: '346.5亿', label: '营收', icon: '💰' },
              { val: '18.1%', label: '整车毛利率', icon: '📈' },
              { val: '12.51亿', label: 'Non-GAAP利润', icon: '✅' },
            ].map((d, i) => (
              <div key={i} style={{
                background: '#F8FAFC',
                borderRadius: '10px',
                padding: '12px',
                border: '1px solid #EEF2F6',
              }}>
                <div style={{ fontSize: '14px', marginBottom: '6px' }}>{d.icon}</div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#0D0D0D' }}>{d.val}</div>
                <div style={{ fontSize: '10px', color: 'rgba(0,0,0,0.4)', marginTop: '2px' }}>{d.label}</div>
              </div>
            ))}
          </div>
          <BodyText>
            2025 年 Q4 是蔚来的历史性转折点——<B>首次实现单季度盈利</B>。交付量突破 12 万辆大关后的规模效应，叠加 ES8 等高溢价车型占比提升，推动毛利率从 Q3 的 13.1% 跃升至 18.1%，公司正式迈入"规模盈利兑现期"。
          </BodyText>
        </SectionCard>

        {/* 第二部分：交付结构 */}
        <SectionCard>
          <SectionHeader num="02" title="Q1 交付结构拆解" />

          {/* ES8 突出展示 */}
          <div style={{
            background: 'linear-gradient(135deg, #EBF8FF 0%, #F0F4FF 100%)',
            borderRadius: '14px',
            padding: '16px',
            border: '1px solid rgba(0,163,218,0.15)',
            marginBottom: '14px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '10px', fontWeight: 600, color: '#0077B6', letterSpacing: '0.08em', marginBottom: '4px' }}>销量冠军</div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#0D0D0D' }}>ES8</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#00A3DA' }}>45,184</div>
                <div style={{ fontSize: '10px', color: 'rgba(0,0,0,0.45)' }}>辆 · 占比 54.1%</div>
              </div>
            </div>
            {/* 占比进度条 */}
            <div style={{ marginTop: '12px', background: 'rgba(0,0,0,0.06)', borderRadius: '4px', height: '6px', overflow: 'hidden' }}>
              <div style={{ width: '54.1%', height: '100%', background: 'linear-gradient(90deg, #00A3DA, #0077B6)', borderRadius: '4px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
              <span style={{ fontSize: '9px', color: 'rgba(0,0,0,0.35)' }}>ES8 占比 54.1%</span>
              <span style={{ fontSize: '9px', color: 'rgba(0,0,0,0.35)' }}>ASP ¥42.3 万</span>
            </div>
          </div>

          {/* 其他车型 */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {[
              { name: 'NIO 其他', vol: '13,316', pct: '16.0%', asp: '~32.0万' },
              { name: '乐道', vol: '13,300', pct: '15.9%', asp: '~17.5万' },
              { name: '萤火虫', vol: '11,665', pct: '14.0%', asp: '~14.9万' },
            ].map((d, i) => (
              <div key={i} style={{
                flex: 1,
                background: '#F8FAFC',
                borderRadius: '10px',
                padding: '10px',
                border: '1px solid #EEF2F6',
              }}>
                <div style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(0,0,0,0.5)', marginBottom: '6px' }}>{d.name}</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#0D0D0D' }}>{d.vol}</div>
                <div style={{ fontSize: '9px', color: 'rgba(0,0,0,0.35)', marginTop: '2px' }}>{d.pct} · {d.asp}</div>
              </div>
            ))}
          </div>

          <BodyText>
            ES8 作为蔚来均价最高的量产车型，其份额爆发直接改写了 Q1 营收结构。乐道和萤火虫合计交付约 2.5 万辆，虽处爬坡期，但对品牌矩阵下探至关重要。
          </BodyText>
        </SectionCard>

        {/* 第三部分：营收重构 */}
        <SectionCard>
          <SectionHeader num="03" title="营收穿透式重构" />

          <DataTable
            headers={['分项', '交付量', 'ASP(万)', '营收(亿)']}
            rows={[
              ['ES8 车辆销售', '45,184', '42.3', '191.1'],
              ['其他车型', '38,281', '24.5', '93.8'],
              ['车辆销售小计', '83,465', '—', '284.9'],
              ['服务及其他', '—', '—', '~27.9'],
            ]}
            footer={['总营收', '—', '—', '312.8']}
          />

          {/* 对比卡片 */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px',
          }}>
            <div style={{
              background: '#F8FAFC', borderRadius: '12px', padding: '14px',
              border: '1px solid #EEF2F6',
            }}>
              <div style={{ fontSize: '9px', fontWeight: 600, color: 'rgba(0,0,0,0.4)', letterSpacing: '0.08em', marginBottom: '6px' }}>官方保守指引</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#0D0D0D' }}>~250 亿</div>
              <div style={{ fontSize: '10px', color: 'rgba(0,0,0,0.4)', marginTop: '2px' }}>3月中旬发布</div>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #EBF8FF 0%, #E0F2FE 100%)', borderRadius: '12px', padding: '14px',
              border: '1px solid rgba(0,163,218,0.2)',
            }}>
              <div style={{ fontSize: '9px', fontWeight: 600, color: '#0077B6', letterSpacing: '0.08em', marginBottom: '6px' }}>模型推演值</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#00A3DA' }}>312.8 亿</div>
              <div style={{ fontSize: '10px', color: '#0077B6', marginTop: '2px' }}>+25% 溢价</div>
            </div>
          </div>

          <BodyText>
            <B>偏差核心原因：ES8 结构性爆发。</B>官方指引通常基于保守的交付结构假设。ES8 以 42.3 万元 ASP 单独贡献车辆营收 <B>191.1 亿元</B>（占 67.1%）。若将 ES8 份额回调至历史均值 30%，营收将降至 ~255 亿，恰好落入官方指引区间。
          </BodyText>
        </SectionCard>

        {/* 第四部分：毛利分析 */}
        <SectionCard>
          <SectionHeader num="04" title="毛利穿透分析" />

          {/* ES8 毛利贡献可视化 */}
          <div style={{
            background: 'linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%)',
            borderRadius: '14px',
            padding: '16px',
            border: '1px solid rgba(34,197,94,0.15)',
            marginBottom: '14px',
          }}>
            <div style={{ fontSize: '10px', fontWeight: 600, color: '#15803D', letterSpacing: '0.08em', marginBottom: '10px' }}>ES8 利润贡献</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '28px', fontWeight: 800, color: '#0D0D0D' }}>47.8</span>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(0,0,0,0.4)' }}>亿元毛利</span>
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.5)' }}>占车辆总毛利 86.4% · 毛利率 25%</div>
            {/* 毛利占比条 */}
            <div style={{ marginTop: '12px', display: 'flex', gap: '2px', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '86.4%', background: 'linear-gradient(90deg, #22C55E, #16A34A)', borderRadius: '4px 0 0 4px' }} />
              <div style={{ width: '13.6%', background: '#E5E7EB', borderRadius: '0 4px 4px 0' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
              <span style={{ fontSize: '9px', color: '#15803D' }}>ES8: 47.8 亿 (86.4%)</span>
              <span style={{ fontSize: '9px', color: 'rgba(0,0,0,0.35)' }}>其他: 7.5 亿</span>
            </div>
          </div>

          <DataTable
            headers={['分项', '营收(亿)', '毛利率', '毛利(亿)']}
            rows={[
              ['ES8', '191.1', '25.0%', '47.8'],
              ['其他车型', '93.8', '8.0%', '7.5'],
              ['车辆毛利合计', '284.9', '19.4%', '55.3'],
              ['服务及其他', '27.9', '~30%', '~8.4'],
            ]}
            footer={['综合毛利', '312.8', '20.4%', '63.7']}
          />

          <Callout color="#0077B6" bg="#EBF8FF" border="rgba(0,163,218,0.15)">
            高端旗舰（ES8）作为利润奶牛，为乐道和萤火虫爬坡提供财务缓冲。其他车型 8% 毛利率已在爬坡初期实现正毛利，避免了"卖一辆亏一辆"的困境。
          </Callout>
        </SectionCard>

        {/* 第五部分：损益总表 */}
        <SectionCard>
          <SectionHeader num="05" title="Q1 损益预测总表" />

          <DataTable
            headers={['科目', '金额(亿)', '备注']}
            rows={[
              ['总营收', '312.8', '模型推演值'],
              ['综合毛利', '63.7', '毛利率 20.4%'],
              ['SG&A', '-31.5', '费用率 10.1%'],
              ['R&D', '-20.5', '同比持平'],
              ['GAAP 经营利润', '11.7', '—'],
              ['利息净收益', '+1.8', '459亿现金理财'],
              ['其他收益/费用', '-0.4', '—'],
              ['GAAP 净利润', '13.1', '连续两季盈利'],
              ['Non-GAAP 调整', '+2.0', '剔除股权激励'],
            ]}
            footer={['Non-GAAP 经营利润', '13.7', '超Q4 12.51亿']}
          />

          {/* 现金储备 */}
          <div style={{
            background: '#F8FAFC', borderRadius: '12px', padding: '14px',
            border: '1px solid #EEF2F6', display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #EBF8FF, #E0F2FE)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px',
            }}>🏦</div>
            <div>
              <div style={{ fontSize: '10px', color: 'rgba(0,0,0,0.4)', fontWeight: 600 }}>现金储备</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#0D0D0D' }}>459 亿元</div>
            </div>
            <div style={{ marginLeft: 'auto', fontSize: '10px', color: 'rgba(0,0,0,0.35)', textAlign: 'right' }}>
              截至 2025 年末<br />充足弹药支撑三品牌扩张
            </div>
          </div>
        </SectionCard>

        {/* 第六部分：逻辑分析 */}
        <SectionCard>
          <SectionHeader num="06" title="盈利质变逻辑" />

          {/* 双轮驱动 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
            <div style={{
              background: 'linear-gradient(145deg, #FFF7ED 0%, #FFFBEB 100%)',
              borderRadius: '14px', padding: '14px',
              border: '1px solid rgba(245,158,11,0.15)',
            }}>
              <div style={{ fontSize: '22px', marginBottom: '8px' }}>✂️</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#0D0D0D', marginBottom: '6px' }}>降本增效</div>
              <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.55)', lineHeight: 1.6 }}>
                裁员 1.06 万人，运营费用率从 28% 压缩至 <strong>16.6%</strong>
              </div>
            </div>
            <div style={{
              background: 'linear-gradient(145deg, #EFF6FF 0%, #EBF8FF 100%)',
              borderRadius: '14px', padding: '14px',
              border: '1px solid rgba(59,130,246,0.15)',
            }}>
              <div style={{ fontSize: '22px', marginBottom: '8px' }}>👑</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#0D0D0D', marginBottom: '6px' }}>旗舰占比过半</div>
              <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.55)', lineHeight: 1.6 }}>
                ES8 占比 54%，25% 毛利率重塑盈利模型
              </div>
            </div>
          </div>

          <SubTitle>降本增效：裁员红利释放</SubTitle>
          <BodyText>
            SG&A 控制在 31.5 亿元（费用率 10.1%，对比 2024 同期 ~15%）。R&D 稳定在 20.5 亿元，同等投入下已完成 NT3.0 平台全系车型量产。合计运营费用率压缩至 16.6%——<B>质的飞跃</B>。
          </BodyText>

          <SubTitle>产品结构升级：ES8 重塑盈利模型</SubTitle>
          <BodyText>
            全新 ES8 基于 NT3.0 平台，在智能座舱、自动驾驶、换电体系方面建立了 45 万价位段绝对壁垒。40 万以上纯电 SUV 市场无真正直接竞品，月均 1.5 万辆交付量使单车成本持续下降，25% 毛利率具备可持续性。
          </BodyText>

          <SubTitle>三品牌矩阵战略纵深</SubTitle>
          {/* 三品牌展示 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            {[
              { brand: 'NIO', desc: '高端利润引擎', range: '30-60万', color: '#0077B6', bg: '#EBF8FF' },
              { brand: '乐道 ONVO', desc: '中端放量突破', range: '15-20万', color: '#7C3AED', bg: '#F3E8FF' },
              { brand: '萤火虫 Firefly', desc: '入门市场卡位', range: '10-15万', color: '#EA580C', bg: '#FFF7ED' },
            ].map((d, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                background: d.bg, borderRadius: '10px', padding: '12px 14px',
                border: `1px solid ${d.color}15`,
              }}>
                <div style={{
                  fontSize: '11px', fontWeight: 700, color: d.color,
                  minWidth: '80px',
                }}>{d.brand}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#0D0D0D' }}>{d.desc}</div>
                  <div style={{ fontSize: '10px', color: 'rgba(0,0,0,0.4)' }}>{d.range}</div>
                </div>
              </div>
            ))}
          </div>

          <Callout color="#0077B6" bg="#EBF8FF" border="rgba(0,163,218,0.15)">
            <strong>蔚来 Q1 的盈利并非一次性事件，而是"降本"与"增效"双轮驱动下的结构性拐点。</strong>459 亿现金储备支撑三品牌全面布局，随着乐道和萤火虫下半年放量，营收与盈利能力有望进一步上台阶。
          </Callout>
        </SectionCard>

        {/* 风险提示 */}
        <div style={{
          margin: '0 0 16px',
          padding: '14px 16px',
          background: '#FFFFFF',
          borderRadius: '14px',
          border: '1px solid #FED7AA',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px' }}>⚠️</span>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#C2410C' }}>风险提示</span>
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.5)', lineHeight: 1.8 }}>
            以上预测基于模型推演，实际数据以蔚来官方财报为准。ES8 高占比可能随季度变化，需关注 ES9 上市对产品结构的影响。宏观经济波动、补贴政策变化等外部因素可能影响实际交付和 ASP。
          </div>
        </div>

        {/* 署名 */}
        <div style={{ textAlign: 'center', padding: '8px 0 16px' }}>
          <div style={{ fontSize: '9px', color: 'rgba(0,0,0,0.25)', letterSpacing: '0.05em' }}>
            NioFans 深度研究 · 仅供参考，不构成投资建议
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Helper Components ── */

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: '16px',
      padding: '20px',
      marginBottom: '12px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    }}>
      {children}
    </div>
  );
}

function SectionHeader({ num, title }: { num: string; title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
      <div style={{
        width: '28px', height: '28px', borderRadius: '8px',
        background: 'linear-gradient(135deg, #0A1628, #0077B6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '11px', fontWeight: 700, color: '#fff',
        flexShrink: 0,
      }}>{num}</div>
      <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0D0D0D', margin: 0 }}>{title}</h3>
    </div>
  );
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: '13px', fontWeight: 700, color: '#0D0D0D',
      margin: '14px 0 8px',
      paddingLeft: '10px',
      borderLeft: '3px solid #00A3DA',
    }}>{children}</div>
  );
}

function BodyText({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: '13px', color: 'rgba(0,0,0,0.65)', lineHeight: 1.85, marginBottom: '12px' }}>
      {children}
    </div>
  );
}

function B({ children }: { children: React.ReactNode }) {
  return <strong style={{ color: '#0D0D0D', fontWeight: 600 }}>{children}</strong>;
}

function DataTable({ headers, rows, footer }: { headers: string[]; rows: string[][]; footer?: string[] }) {
  return (
    <div style={{ overflowX: 'auto', marginBottom: '14px', scrollbarWidth: 'none' }} className="no-scrollbar">
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={{
                padding: '8px 8px',
                textAlign: i === 0 ? 'left' : 'right',
                fontWeight: 600,
                color: 'rgba(0,0,0,0.4)',
                borderBottom: '1px solid #EEF2F6',
                whiteSpace: 'nowrap',
                fontSize: '10px',
                letterSpacing: '0.03em',
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} style={{
                  padding: '9px 8px',
                  textAlign: ci === 0 ? 'left' : 'right',
                  borderBottom: '1px solid #F8FAFC',
                  whiteSpace: 'nowrap',
                  color: 'rgba(0,0,0,0.65)',
                  fontSize: '12px',
                }}>{cell}</td>
              ))}
            </tr>
          ))}
          {footer && (
            <tr>
              {footer.map((cell, ci) => (
                <td key={ci} style={{
                  padding: '10px 8px',
                  textAlign: ci === 0 ? 'left' : 'right',
                  borderTop: '2px solid #00A3DA',
                  whiteSpace: 'nowrap',
                  color: '#00A3DA',
                  fontSize: '12px',
                  fontWeight: 700,
                }}>{cell}</td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function Callout({ color, bg, border, children }: { color: string; bg: string; border: string; children: React.ReactNode }) {
  return (
    <div style={{
      padding: '14px 16px',
      background: bg,
      border: `1px solid ${border}`,
      borderRadius: '12px',
      marginBottom: '12px',
      fontSize: '12px',
      lineHeight: 1.8,
      color: 'rgba(0,0,0,0.65)',
      borderLeft: `3px solid ${color}`,
    }}>
      {children}
    </div>
  );
}
