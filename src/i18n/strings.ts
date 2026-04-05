export type Lang = 'zh' | 'en';

export const strings = {
  zh: {
    // Banner
    bannerCarSubtitle: '科技行政旗舰SUV · 重磅技术发布会',
    bannerEventPill: '发布会倒计时 · 即将揭晓',

    // KPI
    sectionLabel: '交付数据概览',
    kpiThisMonth: '本月交付',
    kpiAllTime: '历史累计',
    kpiRecord: '单月记录',
    kpi2025: '2025 全年',
    kpiAllYears: '2021—2026',
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

    // 2026 annual target
    target2026Label: '2026 年度目标',
    target2026SubLabel: '基于 2025 全年 × 1.45 估算',
    target2026Current: '当前进度',
    target2026Gap: '还差',

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
  },

  en: {
    // Banner
    bannerCarSubtitle: 'Tech Flagship SUV · Major Unveiling Event',
    bannerEventPill: 'Launch Countdown · Coming Soon',

    // KPI
    sectionLabel: 'Delivery Overview',
    kpiThisMonth: 'This Month',
    kpiAllTime: 'All Time',
    kpiRecord: 'Monthly Record',
    kpi2025: '2025 Full Year',
    kpiAllYears: '2021—2026',
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

    // 2026 annual target
    target2026Label: '2026 Annual Target',
    target2026SubLabel: 'Est. 2025 Full Year × 1.45',
    target2026Current: 'Progress',
    target2026Gap: 'Remaining',

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
  },
} as const;

export type Strings = Record<string, string>;
