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

        {/* ── Article Title ── */}
        <div style={{ 
          fontSize: '28px', fontWeight: 700, color: '#FFFFFF', 
          letterSpacing: '-0.02em', marginBottom: '8px', lineHeight: 1.2
        }}>
          使用 AI 预估蔚来<br />一季度财务数据
        </div>
        <div style={{
          fontSize: '11px', fontWeight: 400, color: 'rgba(255,255,255,0.4)',
          letterSpacing: '0.04em', marginBottom: '32px',
        }}>
          深度研报 · AI 提示词工程 · 穿透式损益演练
        </div>

        {/* ── 三指标卡 ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '24px' }}>
          {[
            { val: '19.3%', label: '综合毛利率' },
            { val: '5.1亿', label: 'Non-GAAP经营' },
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
            报表营收 282.7 亿
          </span>
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
          <span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.35)' }}>
            物理规模 ~300 亿
          </span>
        </div>

        {/* ── 01 为什么要用 AI？ ── */}
        <DarkCard accentColor="#00A3DA">
          <Label>01 · 背景与初衷</Label>
          <SubHead>传统分析的“时滞”与 AI 的“即时穿透”</SubHead>
          <Body>
            当市场还在对官方指引进行线性推演时，我们尝试利用大语言模型（LLM）的深度精算能力，结合“车型结构边际贡献模型（Unit Economics）”，对已既定的 8.3 万台交付数据进行穿透式拆解。
          </Body>
        </DarkCard>

        {/* ── 02 核心提示词工程 ── */}
        <DarkCard accentColor="#00C896">
          <Label>02 · AI 提示词工程 (v5.1)</Label>
          <SubHead>如何像高级分析师一样提问？</SubHead>
          <Body>
            要得到具备专业研报水准的结论，关键在于赋予 AI 明确的角色模型和底层财务公式。以下是我们使用的核心提示词：
          </Body>
          
          <PromptBox>
{`**Role:** 你是一位深耕中概股汽车行业的资深分析师，擅长使用“车型结构边际贡献模型（Unit Economics）”进行穿透式损益推演。
**Task:** 基于蔚来 2025 Q4 财报（首次实现单季盈利）为锚点，对 **2026 Q1** 的财务表现进行深度精算。请对比“公司保守营收指引”与“基于 ES8 结构性爆发的实际模型值”，还原财务真相。

**1. 官方已知锚点 (不可变更事实):**
* **2025 Q4 基准:** 交付 12.48 万辆，营收 346.5 亿，整车毛利率 18.1%，Non-GAAP 经营利润 **12.51 亿元**。
* **2026 Q1 交付:** 共计 **83,465 辆**（NIO品牌 5.85 万，乐道 1.33 万，萤火虫 1.16 万）。
* **2026 Q1 官方指引:** 营收指引为 **244.8 亿 - 251.8 亿元**（注：此为 3 月中旬发布的保守指引）。
* **现金储备:** 截至 2025 年末约为 **459 亿**。

**2. 核心精算逻辑 (差异化来源):**
* **车型结构重组:** 请注意，Q1 交付的 8.35 万辆中，高均价的 **ES8 占比激增至 54.1% (约 4.52 万辆)**。这是由于其在新一代 NT3.0 平台后的爆发。
* **营收预测:** 按 ES8 均价 42.3 万，其他车型均价 24.5 万进行穿透计算。
* **毛利逻辑:** ES8 边际毛利设定为 25.0%。其他车型综合毛利 8.0%。服务及其他业务营收 31.5 亿，毛利 12.0%。
* **成本与费用:** SG&A 刚性支出约 31.0 亿，研发支出 20.5 亿，D&A 折旧约 14 亿。
* **关键调优项目:** 计入单车约 1 万元的终端购车补贴/购置税对冲影响。`}
          </PromptBox>

          <div style={{ 
            fontSize: '10px', color: 'rgba(0,200,150,0.6)', 
            padding: '12px', background: 'rgba(0,200,150,0.03)', 
            borderRadius: '8px', borderLeft: '2px solid #00C896' 
          }}>
            <W>Tips：</W>提示词中增加了“审慎会计确认”约束，通过逻辑减法屏蔽了 BaaS 模式在财报确认上的干扰，直指盈利核心。
          </div>
        </DarkCard>

        {/* ── 03 模型调优实录 ── */}
        <DarkCard accentColor="#FF6B6B">
          <Label>03 · 模型调优实录</Label>
          <SubHead>从“虚幻利润”到“真实平衡”</SubHead>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
            {[
              { step: 'Phase 1: 理论模型', res: 'Revenue 316亿', desc: '物理经营规模全额确认，未考虑会计脱敏。' },
              { step: 'Phase 2: 财务脱敏', res: 'Net Profit +5.5亿', desc: '计入 14 亿 D&A 刚性折旧及服务盈亏。' },
              { step: 'Phase 3: 会计对齐', res: 'Revenue 282.7亿', desc: '基于审慎原则，剔除 BaaS 会计分拆影响。' },
              { step: 'Phase 4: 实战共识', res: 'Op. Profit +5.1亿', desc: '计入单车 1 万补贴，达成最终精算平衡。' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '4px', height: '40px', background: i === 3 ? '#FF6B6B' : 'rgba(255,255,255,0.1)', borderRadius: '2px' }} />
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#FFFFFF' }}>{s.step} — <span style={{ color: i === 3 ? '#FF6B6B' : 'rgba(255,255,255,0.4)' }}>{s.res}</span></div>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </DarkCard>

        {/* ── 04 指标卡 ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '24px' }}>
          {[
            { val: '282.7亿', label: '财报营收' },
            { val: '5.1亿', label: 'Non-GAAP经营' },
            { val: '19.3%', label: '综合毛利率' },
          ].map((d, i) => (
            <div key={i} style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
              padding: '16px 12px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ fontSize: '14px', fontWeight: 300, color: '#FFFFFF', marginBottom: '4px' }}>{d.val}</div>
              <div style={{ fontSize: '8px', fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>{d.label}</div>
            </div>
          ))}
        </div>

        {/* ── 04 最终精算模型报告 ── */}
        <DarkCard accentColor="#00A3DA">
          <Label>04 · 最终精算模型报告</Label>

          <DarkTable
            headers={['科目', '金额(亿)', '备注']}
            rows={[
              ['总营收', '282.7', '会计确认后数值'],
              ['综合毛利', '54.6', '毛利率 19.3%'],
              ['SG&A', '-31.0', '费率 11.0%'],
              ['R&D', '-20.5', '稳态投入'],
              ['D&A', '-14.0', '刚性折旧'],
              ['Non-GAAP 调整', '+2.0', '剔除股权激励'],
              ['Non-GAAP 经营', '+5.1', '已计入 4.5 亿补贴'],
              ['利息净收益', '+1.8', '现金理财'],
            ]}
            footer={['GAAP 净利润', '—', '-7.1', '接近平衡点']}
          />

          {/* 深度逻辑解析 */}
          <SubHead>解析：BaaS 模式下的“会计悖论”</SubHead>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '12px', borderLeft: '3px solid #00A3DA' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#FFFFFF', marginBottom: '4px' }}>1. “钱进兜”与“入报表”的时间差</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.6 }}>
                无论用户是否选择 BaaS，蔚来在交付时都会收到蔚能支付的完整电池款项（物理规模 ~300 亿）。但基于审慎原则，部分电池溢价在财报中会被分拆处理，故报表营收确认为 <W>282.7 亿</W>。
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '12px', borderLeft: '3px solid #00C896' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#FFFFFF', marginBottom: '4px' }}>2. 利润额（Margin Dollar）的稳定性</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.6 }}>
                报表营收的下调并不影响 ES8 带来的实打实利润。分母减小后，综合毛利率反而被动推高至 <W>19.3%</W>。这解释了为何在 280 亿营收下，蔚来依然能维持 Non-GAAP 经营盈利。
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

        {/* ── 05 总结 ── */}
        <DarkCard accentColor="#8E5AFF">
          <Label>05 · 总结：史诗级的跨越</Label>

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

function PromptBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '12px', padding: '16px',
      marginBottom: '20px', position: 'relative',
      fontFamily: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace',
    }}>
      <div style={{ position: 'absolute', top: '-10px', right: '16px', background: '#00A3DA', color: '#FFF', fontSize: '9px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>AI PROMPT</div>
      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
        {children}
      </div>
    </div>
  );
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
