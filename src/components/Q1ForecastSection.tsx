"use client";
import React from 'react';

export default function Q1ForecastSection() {
  return (
    <div style={{
      background: 'linear-gradient(to bottom, #FFFFFF 0%, #0B0F14 28px)',
      minHeight: '100vh',
    }}>
      <div className="chart-shell" style={{
        background: '#0B0F14',
        borderRadius: '28px 28px 0 0',
        position: 'relative',
        overflow: 'hidden',
        padding: '24px 16px 32px',
      }}>
        {/* 顶部光晕 */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '200px',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(0,163,218,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        {/* ── Section Label ── */}
        <div style={{
          fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em',
          color: '#00A3DA', textTransform: 'uppercase' as const, marginBottom: '14px',
          position: 'relative',
        }}>Q1 FINANCIAL FORECAST</div>

        {/* ── Hero Number ── */}
        <div style={{ marginBottom: '6px', position: 'relative' }}>
          <span style={{
            fontSize: '52px', fontWeight: 100, color: '#FFFFFF',
            letterSpacing: '-0.04em', lineHeight: 1, fontFamily: 'Outfit, sans-serif',
          }}>316.4</span>
          <span style={{
            fontSize: '18px', fontWeight: 300, color: 'rgba(255,255,255,0.35)',
            marginLeft: '6px', letterSpacing: '-0.02em',
          }}>亿元</span>
        </div>
        <div style={{
          fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.4)',
          letterSpacing: '0.04em', marginBottom: '20px',
        }}>
          模型预测 Q1 总营收 — 跨越价值驱动转折点
        </div>

        {/* ── 三指标卡 ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '24px' }}>
          {[
            { val: '18.7%', label: '综合毛利率' },
            { val: '9.6亿', label: 'Non-GAAP经营' },
            { val: '459亿', label: '现金储备' },
          ].map((d, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '12px',
              padding: '12px 10px',
              backdropFilter: 'blur(10px)',
            }}>
              <div style={{
                fontSize: '18px', fontWeight: 300, color: '#FFFFFF',
                letterSpacing: '-0.02em', fontFamily: 'Outfit, sans-serif',
              }}>{d.val}</div>
              <div style={{ fontSize: '9px', fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em', marginTop: '4px' }}>{d.label}</div>
            </div>
          ))}
        </div>

        {/* ── 超指引 Badge ── */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(0,163,218,0.08)',
          border: '1px solid rgba(0,163,218,0.15)',
          borderRadius: '100px',
          padding: '6px 14px',
          marginBottom: '28px',
        }}>
          <span style={{ fontSize: '10px', fontWeight: 600, color: '#00C3FF', letterSpacing: '0.04em' }}>
            模型值 316.4 亿
          </span>
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
          <span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.35)' }}>
            官方指引 ~250 亿
          </span>
        </div>

        {/* ── 01 Q4 锚点 ── */}
        <DarkCard accentColor="#00A3DA">
          <Label>01 · Q4 盈利锚点</Label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
            {[
              { val: '12.48万', label: '交付量' },
              { val: '346.5亿', label: '营收' },
              { val: '18.1%', label: '整车毛利率' },
              { val: '12.51亿', label: 'Non-GAAP利润' },
            ].map((d, i) => (
              <div key={i} style={{
                background: 'rgba(0,163,218,0.08)',
                border: '1px solid rgba(0,163,218,0.15)',
                borderRadius: '10px', padding: '10px 12px',
              }}>
                <div style={{
                  fontSize: '16px', fontWeight: 300, color: '#FFFFFF',
                  fontFamily: 'Outfit, sans-serif',
                }}>{d.val}</div>
                <div style={{ fontSize: '9px', fontWeight: 600, color: 'rgba(255,255,255,0.3)', marginTop: '2px', letterSpacing: '0.04em' }}>{d.label}</div>
              </div>
            ))}
          </div>
          <Body>
            2025 年 Q4 是蔚来的历史性转折点——<W>首次实现单季度盈利</W>。交付量突破 12 万辆后的规模效应，叠加 ES8 高溢价车型占比提升，推动毛利率从 Q3 的 13.1% 跃升至 18.1%。
          </Body>
        </DarkCard>

        {/* ── 02 交付结构 ── */}
        <DarkCard accentColor="#00C896">
          <Label>02 · Q1 交付结构拆解</Label>

          {/* ES8 主力卡 */}
          <div style={{
            background: 'rgba(0,200,150,0.06)',
            border: '1px solid rgba(0,200,150,0.12)',
            borderRadius: '14px', padding: '16px', marginBottom: '12px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="badge-blue" style={{
                  background: 'rgba(0,163,218,0.1)', color: '#00A3DA',
                  fontSize: '10px', fontWeight: 600, letterSpacing: '0.04em',
                  padding: '3px 8px', borderRadius: '100px',
                }}>销量冠军</span>
                <div style={{
                  fontSize: '24px', fontWeight: 200, color: '#FFFFFF',
                  fontFamily: 'Outfit, sans-serif', marginTop: '8px',
                }}>ES8</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: '26px', fontWeight: 300, color: '#00C3FF',
                  fontFamily: 'Outfit, sans-serif',
                }}>45,184</div>
                <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>辆 · 占比 54.1%</div>
              </div>
            </div>
            {/* 进度条 */}
            <div style={{
              marginTop: '14px', background: 'rgba(255,255,255,0.06)',
              borderRadius: '100px', height: '6px', overflow: 'hidden',
            }}>
              <div style={{
                width: '54.1%', height: '100%',
                background: 'linear-gradient(90deg, #00A3DA, #00E5FF)',
                borderRadius: '100px',
                boxShadow: '0 0 10px rgba(0,195,255,0.4)',
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
              <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.25)' }}>ES8 · 54.1%</span>
              <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.25)' }}>ASP ¥42.3 万</span>
            </div>
          </div>

          {/* 其他车型 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '14px' }}>
            {[
              { name: 'NIO其他', vol: '13,316', pct: '16.0%' },
              { name: '乐道', vol: '13,300', pct: '15.9%' },
              { name: '萤火虫', vol: '11,665', pct: '14.0%' },
            ].map((d, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '10px', padding: '10px',
              }}>
                <div style={{ fontSize: '9px', fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em', marginBottom: '6px' }}>{d.name}</div>
                <div style={{ fontSize: '14px', fontWeight: 300, color: '#FFFFFF', fontFamily: 'Outfit, sans-serif' }}>{d.vol}</div>
                <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.2)', marginTop: '2px' }}>{d.pct}</div>
              </div>
            ))}
          </div>

          <Body>
            ES8 作为蔚来均价最高的量产车型，其份额爆发直接改写了 Q1 营收结构。乐道和萤火虫合计交付约 2.5 万辆，虽处爬坡期，但对品牌矩阵下探至关重要。
          </Body>
        </DarkCard>

        {/* ── 03 营收重构 ── */}
        <DarkCard accentColor="#8E5AFF">
          <Label>03 · 营收穿透式重构</Label>

          <DarkTable
            headers={['分项', '交付量', 'ASP(万)', '营收(亿)']}
            rows={[
              ['ES8 车辆销售', '45,184', '42.3', '191.1'],
              ['其他车型', '38,281', '24.5', '93.8'],
              ['车辆销售小计', '83,465', '—', '284.9'],
              ['服务及其他', '—', '—', '~31.5'],
            ]}
            footer={['总营收', '—', '—', '316.4']}
          />

          {/* 对比 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '12px', padding: '12px',
            }}>
              <div style={{ fontSize: '9px', fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', marginBottom: '6px' }}>官方指引</div>
              <div style={{ fontSize: '22px', fontWeight: 200, color: '#FFFFFF', fontFamily: 'Outfit, sans-serif' }}>~250<span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}> 亿</span></div>
            </div>
            <div style={{
              background: 'rgba(0,163,218,0.08)',
              border: '1px solid rgba(0,163,218,0.15)',
              borderRadius: '12px', padding: '12px',
            }}>
              <div style={{ fontSize: '9px', fontWeight: 600, color: '#00A3DA', letterSpacing: '0.08em', marginBottom: '6px' }}>模型推演值</div>
              <div style={{ fontSize: '22px', fontWeight: 200, color: '#00C3FF', fontFamily: 'Outfit, sans-serif' }}>316.4<span style={{ fontSize: '12px', color: 'rgba(0,195,255,0.5)' }}> 亿</span></div>
            </div>
          </div>

          <Body>
            <W>偏差核心：ES8 结构性爆发。</W>官方指引基于保守的交付结构假设。ES8 以 42.3 万元 ASP 单独贡献车辆营收 <W>191.1 亿元</W>（占 67.1%）。若将 ES8 份额回调至历史均值 30%，营收降至 ~255 亿，恰好落入指引区间。
          </Body>
        </DarkCard>

        {/* ── 04 毛利分析 ── */}
        <DarkCard accentColor="#00C896">
          <Label>04 · 毛利穿透分析</Label>

          {/* ES8 利润贡献 */}
          <div style={{
            background: 'rgba(0,200,150,0.06)',
            border: '1px solid rgba(0,200,150,0.12)',
            borderRadius: '14px', padding: '16px', marginBottom: '14px',
          }}>
            <div style={{ fontSize: '9px', fontWeight: 600, color: '#00C896', letterSpacing: '0.08em', marginBottom: '10px' }}>ES8 利润贡献</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
              <div style={{ fontSize: '32px', fontWeight: 200, color: '#FFFFFF', fontFamily: 'Outfit, sans-serif' }}>55.3</div>
              <span style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.35)' }}>亿元毛利</span>
            </div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>占车辆总毛利 100% · 毛利率 19.4%</div>
            <div style={{
              marginTop: '12px', background: 'rgba(255,255,255,0.06)',
              borderRadius: '100px', height: '6px', overflow: 'hidden', display: 'flex', gap: '2px',
            }}>
              <div style={{
                width: '86.4%', height: '100%',
                background: 'linear-gradient(90deg, #00C896, #00E5B0)',
                borderRadius: '100px 0 0 100px',
                boxShadow: '0 0 10px rgba(0,200,150,0.4)',
              }} />
              <div style={{ width: '13.6%', height: '100%', background: 'rgba(255,255,255,0.06)', borderRadius: '0 100px 100px 0' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
              <span style={{ fontSize: '8px', color: '#00C896' }}>车辆毛利: 55.3亿</span>
              <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.2)' }}>服务毛利: 3.2亿</span>
            </div>
          </div>

          <DarkTable
            headers={['分项', '营收(亿)', '毛利率', '毛利(亿)']}
            rows={[
              ['ES8', '191.1', '25.0%', '47.8'],
              ['其他车型', '93.8', '8.0%', '7.5'],
              ['车辆毛利合计', '284.9', '19.4%', '55.3'],
              ['服务及其他', '31.5', '12.0%', '3.8'],
            ]}
            footer={['综合毛利', '316.4', '18.7%', '59.1']}
          />

          <Body>
            ES8 以 <W>25% 毛利率</W>贡献 <W>47.8 亿</W>毛利，为乐道和萤火虫爬坡提供充足财务缓冲。其他车型 8% 毛利率已实现正毛利，避免了"卖一辆亏一辆"的困境。
          </Body>
        </DarkCard>

        {/* ── 05 损益总表 ── */}
        <DarkCard accentColor="#00A3DA">
          <Label>05 · Q1 损益预测总表</Label>

          <DarkTable
            headers={['科目', '金额(亿)', '备注']}
            rows={[
              ['总营收', '316.4', '大幅超越指引'],
              ['综合毛利', '59.1', '毛利率 18.7%'],
              ['SG&A', '-31.0', '费率 9.8%'],
              ['R&D', '-20.5', '稳态投入'],
              ['D&A', '-14.0', '刚性折旧'],
              ['Non-GAAP 调整', '+2.0', '剔除股权激励'],
              ['Non-GAAP 经营', '+9.6', '历史性盈利'],
              ['利息净收益', '+1.8', '现金理财'],
            ]}
            footer={['GAAP 净利润', '—', '-2.6', '极度接近平衡']}
          />

          {/* 深度逻辑解析 */}
          <SubHead>深度逻辑：为何模型预测超官方指引？</SubHead>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '12px', borderLeft: '3px solid #00A3DA' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#FFFFFF', marginBottom: '4px' }}>1. 官方指引的“保守性”陷阱</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.6 }}>
                官方指引通常按低客单价车型占比大来预估以降低风险。但模型锁定了 <W>ES8 占比 54.1%</W> 的客观事实，高均价车型的脉冲式交付直接拉高了营收天板。
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '12px', borderLeft: '3px solid #00C896' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#FFFFFF', marginBottom: '4px' }}>2. ES8 的“利润收割机”效应</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.6 }}>
                单台 ES8 营收贡献相当于 3 台萤火虫。4.5 万辆规模下产生的 <W>47.8 亿车辆毛利</W>，足以覆盖全司研发开支（20.5 亿）及 2/3 的销售行政开支。
              </div>
            </div>
          </div>

          {/* 现金储备 */}
          <div style={{
            background: 'rgba(0,163,218,0.08)',
            border: '1px solid rgba(0,163,218,0.15)',
            borderRadius: '12px', padding: '14px',
            display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <div style={{ fontSize: '18px' }}>🏦</div>
            <div>
              <div style={{ fontSize: '9px', fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>现金储备</div>
              <div style={{ fontSize: '18px', fontWeight: 200, color: '#FFFFFF', fontFamily: 'Outfit, sans-serif' }}>459 亿元</div>
            </div>
            <div style={{ marginLeft: 'auto', fontSize: '9px', color: 'rgba(255,255,255,0.25)', textAlign: 'right' }}>
              截至 2025 年末<br />支撑三品牌扩张
            </div>
          </div>
        </DarkCard>

        {/* ── 06 逻辑分析 ── */}
        <DarkCard accentColor="#8E5AFF">
          <Label>06 · 盈利质变逻辑</Label>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
            {[
              { icon: '✂️', title: '降本增效', desc: '运营费用率 28% → 16.6%', color: '#00C896' },
              { icon: '👑', title: '旗舰占比过半', desc: 'ES8 毛利率 25%', color: '#00A3DA' },
            ].map((d, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '14px', padding: '14px',
              }}>
                <div style={{ fontSize: '20px', marginBottom: '8px' }}>{d.icon}</div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF', marginBottom: '4px' }}>{d.title}</div>
                <div style={{ fontSize: '10px', color: d.color }}>{d.desc}</div>
              </div>
            ))}
          </div>

          <SubHead>降本增效：运营费用率最优</SubHead>
          <Body>
            SG&A 控制在 31.5 亿元（费用率 9.95%），对比 2024 同期大幅下降。R&D 稳定在 20.5 亿元。即便计入 14 亿元折旧（D&A），损益表现已极度接近盈亏平衡线——<W>质的飞跃</W>。
          </Body>

          <SubHead>产品结构升级：ES8 重塑盈利模型</SubHead>
          <Body>
            全新 ES8 基于 NT3.0 平台，在智能座舱、自动驾驶、换电体系方面建立了 45 万价位段绝对壁垒。40 万以上纯电 SUV 市场无直接竞品，月均 1.5 万辆交付使单车成本持续下降，25% 毛利率具备可持续性。
          </Body>

          <SubHead>三品牌矩阵</SubHead>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
            {[
              { brand: 'NIO', range: '30-60万', desc: '高端利润引擎', color: '#00A3DA' },
              { brand: '乐道 ONVO', range: '15-20万', desc: '中端放量突破', color: '#8E5AFF' },
              { brand: '萤火虫 Firefly', range: '10-15万', desc: '入门市场卡位', color: '#00C896' },
            ].map((d, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '10px', padding: '10px 14px',
              }}>
                <div style={{
                  width: '4px', height: '24px', borderRadius: '2px',
                  background: d.color, flexShrink: 0,
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#FFFFFF' }}>
                    {d.brand}
                    <span style={{ fontWeight: 400, color: 'rgba(255,255,255,0.3)', marginLeft: '8px', fontSize: '10px' }}>{d.range}</span>
                  </div>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)' }}>{d.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 结语 */}
          <div style={{
            background: 'rgba(0,163,218,0.08)',
            border: '1px solid rgba(0,163,218,0.15)',
            borderRadius: '12px', padding: '16px',
            borderLeft: '4px solid #00A3DA',
          }}>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.95, fontStyle: 'italic' }}>
              “市场还没从‘蔚来烧钱’的旧梦中醒来，但 2026 Q1 的数据已经抽了一记响亮的耳光。316 亿的营收预测绝非激进，而是 ES8 结构性爆发后的必然逻辑。当一款单价 40 万+ 的国产旗舰能贡献超过 50% 的销量占比时，蔚来已经完成了从‘量换钱’到‘价值驱动’的财务史诗级跨越。”
            </div>
            <div style={{ textAlign: 'right', marginTop: '10px', fontSize: '10px', fontWeight: 600, color: '#00A3DA' }}>
              — NioFans 深度研报 (v5.0)
            </div>
          </div>
        </DarkCard>

        {/* ── 风险提示 ── */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '16px', padding: '16px', marginTop: '8px',
        }}>
          <div style={{ fontSize: '9px', fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', marginBottom: '8px' }}>⚠️ 风险提示</div>
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', lineHeight: 1.8 }}>
            以上预测基于模型推演，实际数据以蔚来官方财报为准。ES8 高占比可能随季度变化，需关注 ES9 上市对产品结构的影响。宏观经济波动、补贴政策变化等外部因素可能影响实际交付和 ASP。
          </div>
        </div>

        {/* 署名 */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <div style={{ fontSize: '8px', fontWeight: 600, color: 'rgba(255,255,255,0.15)', letterSpacing: '0.06em' }}>
            NioFans 深度研究 · 仅供参考，不构成投资建议
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Helpers ── */

function DarkCard({ accentColor, children }: { accentColor: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '16px',
      padding: '18px',
      marginBottom: '12px',
      position: 'relative',
      overflow: 'hidden',
      backdropFilter: 'blur(10px)',
    }}>
      {/* 顶部色条 */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, ${accentColor}, transparent)`,
      }} />
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em',
      color: '#00A3DA', marginBottom: '14px',
    }}>{children}</div>
  );
}

function SubHead({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: '12px', fontWeight: 600, color: '#FFFFFF',
      margin: '14px 0 8px', paddingLeft: '10px',
      borderLeft: '2px solid rgba(0,163,218,0.5)',
    }}>{children}</div>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.85, marginBottom: '10px' }}>{children}</div>;
}

function W({ children }: { children: React.ReactNode }) {
  return <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{children}</span>;
}

function DarkTable({ headers, rows, footer }: { headers: string[]; rows: string[][]; footer?: string[] }) {
  return (
    <div style={{ overflowX: 'auto', marginBottom: '14px', scrollbarWidth: 'none' }} className="no-scrollbar">
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={{
                padding: '8px 8px', textAlign: i === 0 ? 'left' : 'right',
                fontWeight: 600, color: 'rgba(255,255,255,0.25)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                whiteSpace: 'nowrap', fontSize: '9px', letterSpacing: '0.04em',
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} style={{
                  padding: '8px 8px', textAlign: ci === 0 ? 'left' : 'right',
                  borderBottom: '1px solid rgba(255,255,255,0.03)',
                  whiteSpace: 'nowrap', color: 'rgba(255,255,255,0.5)',
                  fontSize: '11px',
                }}>{cell}</td>
              ))}
            </tr>
          ))}
          {footer && (
            <tr>
              {footer.map((cell, ci) => (
                <td key={ci} style={{
                  padding: '10px 8px', textAlign: ci === 0 ? 'left' : 'right',
                  borderTop: '1px solid rgba(0,163,218,0.3)',
                  whiteSpace: 'nowrap', color: '#00C3FF', fontWeight: 600,
                  fontSize: '11px',
                }}>{cell}</td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
