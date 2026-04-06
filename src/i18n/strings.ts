export type Lang = 'zh' | 'en';

export const strings = {
  zh: {
    // Banner
    bannerCarSubtitle: '科技行政旗舰SUV · 重磅技术发布会',
    bannerEventPill: '发布会倒计时 · 即将揭晓',

    // KPI
    sectionLabel: '交付数据概览',
    kpiThisMonth: '上月交付',
    kpiAllTime: '历史累计',
    kpiRecord: '单月记录',
    kpiCumulative: '累计交付',
    kpi2025: '2025 全年',
    kpiAllYears: '品牌创立至今',
    kpiUnit: '万台',
    yoyLabel: '同比',

    // Chart
    chartCyclePrefix: '全周期',
    chartTitleMonthly: '月度交付',
    chartTitleQuarterly: '季度交付',
    chartTitleYearly: '年度交付',
    chartScroll: '← 左右滑动',
    viewMonthly: '月度',
    viewQuarterly: '季度',
    viewYearly: '年度',
    trendLine: '趋势线',
    legendLatest: '最新',
    legend30k: '≥3万台',
    legendNormal: '常规',

    // Detail panel
    prevYear: '去年同期',
    prevPeriod: '上期',
    noComparison: '暂无对比数据',
    zoomLabel: '显示密度',
    zoomDense: '极简',
    zoomStandard: '标准',
    zoomRoomy: '宽松',

    // Model section
    modelSectionEyebrow: 'VEHICLE DELIVERY · 车型月交付',
    modelSectionTitle1: '特定车型',
    modelSectionTitle2: '月度交付数据',
    modelTagES8: '旗舰六七座 SUV · 经典战略车型',
    modelTagL90: '家庭智能 SUV · 首款热销车型',
    modelTagFirefly: '城市微型纯电 · 品牌首款',
    modelComingSoon: '数据建设中',
    modelComingDesc: '月度交付数据即将上线',
    modelTrendLine: '趋势线',
    
    // AI Prediction
    aiPrediction: 'AI 推演',
    aiPredictionTitle: '2026 年度销量预测',
    aiAnnualEstimate: '年度总预估',
    aiPeakMonth: '峰值月度 (12月)',
    aiProcess: '推演过程 (SCM 模型)',
    aiProcessStep1: '以 2026.03 实际交付 (6,119台) 为基准锚点',
    aiProcessStep2: '应用 NIO 品牌五年期"季节性修正指数"',
    aiProcessStep3: '平滑 2025 首发爬坡期异常波动 (剔除异常 MoM)',
    aiProcessStep4: '拟合 Q4 年底冲刺效应 (季节性权重系数 1.8x - 2.5x)',
    aiUnit: '万台',

    // 2026 annual target
    target2026Label: '2026 年度目标',
    target2026SubLabel: '基于 2025 全年 × 1.45 估算',
    target2026Current: '进度',
    target2026Gap: '还差',

    // Tabs
    tabDelivery: '交付数据',
    tabFinancial: '财务表现',
    tabPower: '补能建设',

    // Financial
    finForecast: '预估',
    finPerformance: '财报表现',
    finRevenue: '季度营收',
    finMargin: '汽车毛利',
    finCash: '现金储备',
    finRD: '研发投入',
    finUnit: '亿',
    finNetLoss: '净亏损',
    finKpiCash: '流动性储备',
    finKpiRD: '季度研发',
    finNetLossChart: '净亏损 · 扭亏之路',
    finRDChart: '研发投入',
    finNetLossAxis: '亏损额 (亿)',
    finRDAxis: '投入 (亿)',
    finAnnualSnapshot: '年度财务快照',
    finAnnualSnapshotSub: '历年核心财务指标',
    finEstimated: '预估',
    finLossLabel: '净亏损',
    finRDLabel: '研发',
    finBreakevenNote: '逼近盈亏平衡',
    finDataSource: '* 数据来源：NIO 投资者关系官网，预测值仅供参考',

    // Power
    pwrSwapTotal: '换电站总数',
    pwrSwapHighway: '高速公路换电站',
    pwrHighway: '高速网络',
    pwrYTD: '年内新增',
    pwrTotalSessions: '累计换电次数',
    pwrChargeStations: '充电站',
    pwrChargePoles: '充电桩',
    pwrThirdParty: '接入第三方充电桩',
    pwrThirdPartyRatio: '第三方用户占比',
    pwrChargeSessions: '实时累计充电次数',
    pwrStationTotal: '充换电站总数',
    pwrGrowthTitle: '换电站建设进度',
    pwrGrowthSubtitle: '2021—2026 建站历程',
    pwrDataSource: '* 数据来源：NIO Power 官网（nio.cn/official-map）',
    pwrUnit: '座',
    pwrRoot: '根',
    pwrTimes: '次',
    pwrSectionLabel: 'NIO POWER · 补能网络',
    revenue: "营业收入",
    grossMargin: "综合毛利率",
    vehicleMargin: "汽车毛利率",
    quarterly: "按季度",
    annual: "按年度",
    unitRmbBn: "亿元 (RMB)",
    unitPercent: "百分比 (%)",
    swapTitle: "充换电建设",

    // Footer
    footerTagline: 'Blue Sky Coming',
    footerCopyright: '© 2026 NIO Fans Portal · 非官方数据',
    disclaimerTitle: '免责声明 · Disclaimer',
    disclaimerBody: '本站为蔚来汽车独立爱好者自建的非商业数据展示平台，与蔚来汽车（NIO Inc.）无任何官方关联。所有交付数据均来源于蔚来官方公开发布的月度报告，仅供参考，不构成任何投资建议。本站不对数据的完整性及时效性作出任何保证。',
    disclaimerBodyEn: 'This is an independent fan site. Not affiliated with NIO Inc. Data sourced from official public reports. Not financial advice.',

    // Easter egg
    easterEggText: '蔚来，为你而来！',
    easterEggPullMore: '继续下拉',
    easterEggRelease: '松手解锁',
    
    // Q1 Guidance
    q1Guidance: 'Q1 指引',
    q1Actual: '实际',
    q1BeatHigh: '超上限',
    q1BeatLow: '超下限',
    q1BelowLow: '低于下限',
  },

  en: {
    // Banner
    bannerCarSubtitle: 'Tech Flagship SUV · Major Unveiling Event',
    bannerEventPill: 'Launch Countdown · Coming Soon',

    // KPI
    sectionLabel: 'Delivery Overview',
    kpiThisMonth: 'Last Month',
    kpiAllTime: 'All Time',
    kpiRecord: 'Monthly Record',
    kpiCumulative: 'Total Del.',
    kpi2025: '2025 Full Year',
    kpiAllYears: 'Since Debut',
    kpiUnit: '×10k',
    yoyLabel: 'YoY',

    // Chart
    chartCyclePrefix: 'Full Cycle',
    chartTitleMonthly: 'Monthly Deliveries',
    chartTitleQuarterly: 'Quarterly Deliveries',
    chartTitleYearly: 'Yearly Deliveries',
    chartScroll: '← Scroll',
    viewMonthly: 'Monthly',
    viewQuarterly: 'Quarter',
    viewYearly: 'Yearly',
    trendLine: 'Trend',
    legendLatest: 'Latest',
    legend30k: '≥30k',
    legendNormal: 'Regular',

    // Detail panel
    prevYear: 'Prev Year',
    prevPeriod: 'Prev Period',
    noComparison: 'No prior data',
    zoomLabel: 'Density',
    zoomDense: 'Dense',
    zoomStandard: 'Std',
    zoomRoomy: 'Wide',

    // Model section
    modelSectionEyebrow: 'VEHICLE DELIVERY · By Model',
    modelSectionTitle1: 'Model',
    modelSectionTitle2: 'Monthly Deliveries',
    modelTagES8: 'Flagship 6/7-Seat SUV · Classic Strategic Model',
    modelTagL90: 'Family Smart SUV · Best-Selling Debut',
    modelTagFirefly: 'Urban Mini EV · Brand\'s First',
    modelComingSoon: 'Coming Soon',
    modelComingDesc: 'Monthly delivery data coming soon',
    modelTrendLine: 'Trend',
    
    // AI Prediction
    aiPrediction: 'AI Prediction',
    aiPredictionTitle: '2026 Annual Sales Forecast',
    aiAnnualEstimate: 'Annual Estimate',
    aiPeakMonth: 'Peak Month (Dec)',
    aiProcess: 'Process (SCM Model)',
    aiProcessStep1: 'Based on actual delivery in Mar 2026 (6,119 units)',
    aiProcessStep2: 'Applied NIO brand 5-year "seasonal correction index"',
    aiProcessStep3: 'Smoothed 2025 launch ramp anomalies (removed abnormal MoM)',
    aiProcessStep4: 'Fitted Q4 year-end sprint effect (seasonal weight 1.8x - 2.5x)',
    aiUnit: 'k units',

    // 2026 annual target
    target2026Label: '2026 Annual Target',
    target2026SubLabel: 'Est. 2025 Full Year × 1.45',
    target2026Current: 'Progress',
    target2026Gap: 'Remaining',

    // Tabs
    tabDelivery: 'Delivery',
    tabFinancial: 'Finance',
    tabPower: 'Power',

    // Financial
    finForecast: 'Forecast',
    finPerformance: 'Actuals',
    finRevenue: 'Revenue Q4',
    finMargin: 'Veh. Margin',
    finCash: 'Cash Reserve',
    finRD: 'R&D Spend',
    finUnit: 'bn',
    finNetLoss: 'Net Loss',
    finKpiCash: 'Liquidity',
    finKpiRD: 'Qtr R&D',
    finNetLossChart: 'Net Loss · Path to Breakeven',
    finRDChart: 'R&D Investment',
    finNetLossAxis: 'Loss (B¥)',
    finRDAxis: 'Spend (B¥)',
    finAnnualSnapshot: 'Annual Snapshot',
    finAnnualSnapshotSub: 'Key Metrics by Year',
    finEstimated: 'Est.',
    finLossLabel: 'Loss',
    finRDLabel: 'R&D',
    finBreakevenNote: 'Approaching Breakeven',
    finDataSource: '* Source: NIO Investor Relations. Projections for reference only.',

    // Power
    pwrSwapTotal: 'Swap Stations',
    pwrSwapHighway: 'Highway Swap',
    pwrHighway: 'Highway Network',
    pwrYTD: 'New YTD',
    pwrPartner: 'Partners',
    pwrTotalSessions: 'Total Swaps',
    pwrChargeStations: 'Charge Stations',
    pwrChargePoles: 'Charge Poles',
    pwrThirdParty: '3rd-Party Poles',
    pwrThirdPartyRatio: '3rd-Party User Share',
    pwrChargeSessions: 'Total Charges',
    pwrStationTotal: 'Total Stations',
    pwrGrowthTitle: 'Station Growth',
    pwrGrowthSubtitle: '2021—2026 Build Progress',
    pwrDataSource: '* Data: NIO Power Official Map (nio.cn/official-map)',
    pwrUnit: 'st',
    pwrRoot: 'poles',
    pwrTimes: 'times',
    pwrSectionLabel: 'NIO POWER · INFRASTRUCTURE',

    // Footer
    footerTagline: 'Blue Sky Coming',
    footerCopyright: '© 2026 NIO Fans Portal · Unofficial Data',
    disclaimerTitle: 'Disclaimer · 免责声明',
    disclaimerBody: 'This is an independent fan data portal built by NIO enthusiasts. Not affiliated with NIO Inc. All delivery data is sourced from officially published monthly reports, for reference only. Not financial or investment advice. No warranty on accuracy or timeliness.',
    disclaimerBodyEn: '本站为爱好者自建，与蔚来汽车无官方关联，数据仅供参考，不构成投资建议。',

    // Easter egg
    easterEggText: 'NIO · Made for You!',
    easterEggPullMore: 'Pull down',
    easterEggRelease: 'Release to reveal',
    
    // Q1 Guidance
    q1Guidance: 'Q1 Guidance',
    q1Actual: 'Actual',
    q1BeatHigh: 'Above High End',
    q1BeatLow: 'Above Low End',
    q1BelowLow: 'Below Low End',
  },
} as const;

export type Strings = Record<string, string>;
