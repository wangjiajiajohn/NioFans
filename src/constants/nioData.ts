// Focused Data Model for NIO Fans - Official ES9 Edition

export interface DeliveryPoint {
  month: string;
  value: number;
}

export const FLAT_DELIVERY_DATA: DeliveryPoint[] = [
  // 2021
  { month: "21-01", value: 7225 },
  { month: "21-02", value: 5578 },
  { month: "21-03", value: 7257 },
  { month: "21-04", value: 7102 },
  { month: "21-05", value: 6711 },
  { month: "21-06", value: 8083 },
  { month: "21-07", value: 7931 },
  { month: "21-08", value: 5880 },
  { month: "21-09", value: 10600 },
  { month: "21-10", value: 3667 },
  { month: "21-11", value: 10900 },
  { month: "21-12", value: 10500 },
  // 2022
  { month: "22-01", value: 9652 },
  { month: "22-02", value: 6131 },
  { month: "22-03", value: 9985 },
  { month: "22-04", value: 5074 },
  { month: "22-05", value: 7024 },
  { month: "22-06", value: 13000 },
  { month: "22-07", value: 10100 },
  { month: "22-08", value: 10700 },
  { month: "22-09", value: 10900 },
  { month: "22-10", value: 10100 },
  { month: "22-11", value: 14200 },
  { month: "22-12", value: 15800 },
  // 2023
  { month: "23-01", value: 8506 },
  { month: "23-02", value: 12200 },
  { month: "23-03", value: 10400 },
  { month: "23-04", value: 6658 },
  { month: "23-05", value: 6155 },
  { month: "23-06", value: 10700 },
  { month: "23-07", value: 20500 },
  { month: "23-08", value: 19300 },
  { month: "23-09", value: 15600 },
  { month: "23-10", value: 16100 },
  { month: "23-11", value: 16000 },
  { month: "23-12", value: 18000 },
  // 2024
  { month: "24-01", value: 10100 },
  { month: "24-02", value: 8132 },
  { month: "24-03", value: 11900 },
  { month: "24-04", value: 15600 },
  { month: "24-05", value: 20500 },
  { month: "24-06", value: 21200 },
  { month: "24-07", value: 20500 },
  { month: "24-08", value: 20200 },
  { month: "24-09", value: 21200 },
  { month: "24-10", value: 21000 },
  { month: "24-11", value: 20600 },
  { month: "24-12", value: 31100 },
  // 2025
  { month: "25-01", value: 13900 },
  { month: "25-02", value: 13200 },
  { month: "25-03", value: 15000 },
  { month: "25-04", value: 23900 },
  { month: "25-05", value: 23200 },
  { month: "25-06", value: 23900 },
  { month: "25-07", value: 21000 },
  { month: "25-08", value: 31300 },
  { month: "25-09", value: 34700 },
  { month: "25-10", value: 40400 },
  { month: "25-11", value: 36300 },
  { month: "25-12", value: 48100 },
  // 2026
  { month: "26-01", value: 27200 },
  { month: "26-02", value: 20800 },
  { month: "26-03", value: 35500 },
];

// Year-keyed delivery data for DeliverySection (e.g. DELIVERY_DATA[2025])
export const DELIVERY_DATA: Record<number, DeliveryPoint[]> = [
  2021, 2022, 2023, 2024, 2025, 2026,
].reduce(
  (acc, year) => {
    const prefix = String(year).slice(2);
    acc[year] = FLAT_DELIVERY_DATA.filter((d) => d.month.startsWith(prefix));
    return acc;
  },
  {} as Record<number, DeliveryPoint[]>,
);

export const BANNERS = [
  {
    id: "2",
    title: "NIO 2026",
    subtitle: "全新车型 · 邀您体验",
    date: "2026.04.15",
    image: "/2.png",
    inviteText: "长按扫码 ｜ 预约试驾",
    showLiveBadge: false,
  },
  {
    id: "1",
    title: "NIO ES9",
    subtitle: "科技行政旗舰SUV · 重磅技术发布会",
    date: "2026.04.09",
    image: "/1.png",
    inviteText: "预约ES9发布会直播",
    showLiveBadge: true,
  },
];

export const EVENTS = [
  {
    date: "2026.03",
    title: "NIO ES9 极寒测试完成",
    desc: "在漠河完成 -45°C 极寒环境下的全系统稳定性测试。",
    tag: "技术",
  },
  {
    date: "2025.12",
    title: "单月交付突破 4.8 万台",
    desc: "创下品牌历史新高，持续领跑高端纯电市场。",
    tag: "交付",
  },
  {
    date: "2025.04",
    title: "第四代换电站大规模部署",
    desc: "支持多品牌共享，换电速度提升 22%。",
    tag: "补能",
  },
];

export const FINANCIAL_DATA = [
  {
    quarter: "2026 Q1",
    status: "ESTIMATED",
    revenue: 316.4,
    grossMargin: 18.7,
    vehicleMargin: 19.4,
    netLoss: -2.6,      // 亿元，GAAP 净亏损（极度接近平衡）
    cash: 459.0,      // 亿元，现金资产
    rd: 20.5,         // 亿元，季度研发支出
  },
];

// Historical Quarterly Data (2020 - 2026)
// netLoss: 净亏损（亿元，负值），rd: 研发投入（亿元）
export const FINANCIAL_QUARTERLY = [
  { period: "20 Q1", revenue: 13.7,  grossMargin: -12.2, vehicleMargin: -7.4,  netLoss: -17.4, rd: 5.3  },
  { period: "20 Q2", revenue: 37.2,  grossMargin: 8.4,   vehicleMargin: 9.7,   netLoss: -11.0, rd: 6.2  },
  { period: "20 Q3", revenue: 45.3,  grossMargin: 12.9,  vehicleMargin: 14.5,  netLoss: -10.5, rd: 6.4  },
  { period: "20 Q4", revenue: 66.4,  grossMargin: 17.2,  vehicleMargin: 17.2,  netLoss: -17.2, rd: 7.0  },
  { period: "21 Q1", revenue: 79.8,  grossMargin: 19.5,  vehicleMargin: 21.2,  netLoss: -6.8,  rd: 10.0 },
  { period: "21 Q2", revenue: 84.5,  grossMargin: 18.6,  vehicleMargin: 20.3,  netLoss: -5.9,  rd: 11.2 },
  { period: "21 Q3", revenue: 98.1,  grossMargin: 20.3,  vehicleMargin: 18.0,  netLoss: -8.3,  rd: 12.2 },
  { period: "21 Q4", revenue: 99.0,  grossMargin: 17.2,  vehicleMargin: 20.9,  netLoss: -19.2, rd: 12.5 },
  { period: "22 Q1", revenue: 99.1,  grossMargin: 14.6,  vehicleMargin: 18.1,  netLoss: -18.3, rd: 25.0 },
  { period: "22 Q2", revenue: 102.9, grossMargin: 13.0,  vehicleMargin: 16.7,  netLoss: -27.6, rd: 28.0 },
  { period: "22 Q3", revenue: 130.0, grossMargin: 13.3,  vehicleMargin: 16.4,  netLoss: -41.1, rd: 29.4 },
  { period: "22 Q4", revenue: 160.6, grossMargin: 3.9,   vehicleMargin: 6.8,   netLoss: -57.4, rd: 30.0 },
  { period: "23 Q1", revenue: 106.8, grossMargin: 1.5,   vehicleMargin: 5.1,   netLoss: -47.4, rd: 24.0 },
  { period: "23 Q2", revenue: 87.7,  grossMargin: 1.0,   vehicleMargin: 6.2,   netLoss: -60.0, rd: 23.3 },
  { period: "23 Q3", revenue: 190.7, grossMargin: 8.0,   vehicleMargin: 11.0,  netLoss: -45.6, rd: 23.6 },
  { period: "23 Q4", revenue: 171.0, grossMargin: 7.5,   vehicleMargin: 11.9,  netLoss: -54.2, rd: 22.4 },
  { period: "24 Q1", revenue: 99.1,  grossMargin: 4.9,   vehicleMargin: 9.2,   netLoss: -52.6, rd: 18.7 },
  { period: "24 Q2", revenue: 174.5, grossMargin: 9.7,   vehicleMargin: 12.2,  netLoss: -31.4, rd: 21.1 },
  { period: "24 Q3", revenue: 186.7, grossMargin: 10.7,  vehicleMargin: 13.1,  netLoss: -19.5, rd: 22.0 },
  { period: "24 Q4", revenue: 204.5, grossMargin: 12.5,  vehicleMargin: 18.2,  netLoss: -21.9, rd: 22.6 },
  { period: "25 Q1", revenue: 165.0, grossMargin: 13.0,  vehicleMargin: 18.5,  netLoss: -18.5, rd: 23.5 },
  { period: "25 Q2", revenue: 210.2, grossMargin: 14.2,  vehicleMargin: 19.0,  netLoss: -15.0, rd: 25.0 },
  { period: "25 Q3", revenue: 235.5, grossMargin: 15.5,  vehicleMargin: 19.8,  netLoss: -10.5, rd: 26.5 },
  { period: "25 Q4", revenue: 346.5, grossMargin: 18.1,  vehicleMargin: 18.1,  netLoss: 8.5,   rd: 20.5 },
  { period: "26 Q1", revenue: 316.4, grossMargin: 18.7,  vehicleMargin: 19.4,  netLoss: -2.6,  rd: 20.5, cash: 459.0 },
];

// Historical Annual Data
// netLoss: 净亏损（亿元），rd: 研发投入（亿元）
export const FINANCIAL_ANNUAL = [
  { period: "2020", revenue: 162.6,  grossMargin: 11.5, vehicleMargin: 12.7, netLoss: -56.1,  rd: 24.9  },
  { period: "2021", revenue: 361.4,  grossMargin: 18.9, vehicleMargin: 20.1, netLoss: -40.2,  rd: 45.9  },
  { period: "2022", revenue: 492.7,  grossMargin: 10.4, vehicleMargin: 13.7, netLoss: -144.4, rd: 112.4 },
  { period: "2023", revenue: 556.2,  grossMargin: 5.5,  vehicleMargin: 9.5,  netLoss: -207.2, rd: 93.3  },
  { period: "2024", revenue: 664.8,  grossMargin: 10.2, vehicleMargin: 14.5, netLoss: -125.4, rd: 84.4  },
  { period: "2025", revenue: 990.7,  grossMargin: 16.0, vehicleMargin: 19.6, netLoss: -35.0,  rd: 95.5  },
  { period: "2026", revenue: 1350.0, grossMargin: 19.5, vehicleMargin: 21.0, netLoss: -5.0,   rd: 100.0 },
];

// 年度财务快照 — 用于卡片展示（仅已确认年度）
export const FINANCIAL_ANNUAL_SNAPSHOT = [
  { year: '2020', revenue: 162.6,  netLoss: -56.1,  grossMargin: 11.5, rd: 24.9  },
  { year: '2021', revenue: 361.4,  netLoss: -40.2,  grossMargin: 18.9, rd: 45.9  },
  { year: '2022', revenue: 492.7,  netLoss: -144.4, grossMargin: 10.4, rd: 112.4 },
  { year: '2023', revenue: 556.2,  netLoss: -207.2, grossMargin: 5.5,  rd: 93.3  },
  { year: '2024', revenue: 664.8,  netLoss: -125.4, grossMargin: 10.2, rd: 84.4  },
  { year: '2025', revenue: 990.7,  netLoss: -35.0,  grossMargin: 16.0, rd: 95.5, estimated: true },
];

// Official NIO Power data — source: nio.cn/official-map
// 截至 2026.04.08 02:44:15
export const POWER_DATA = {
  // 充换电站总数
  totalStations: 8751,
  // 换电站
  swapStations: 3790,
  swapHighway: 1027,          // 高速公路换电站
  // 累计换电次数
  totalSwapSessions: 107136000,
  // 充电站
  chargeStations: 4961,
  chargePoles: 28456,         // 充电桩根数
  // 第三方充电桩
  thirdPartyPoles: 1576244,
  thirdPartyUserRatio: 86.02, // 第三方用户占比 %
  // 实时累计充电次数
  totalChargeSessions: 85498874,
  // 数据更新时间
  updatedAt: '2026.04.08',
};

// 换电站季度历史增长（用于趋势图）— 来源：公开报道及官方披露
export const SWAP_GROWTH_HISTORY = [
  { period: '21Q4', swapStations: 700 },
  { period: '22Q2', swapStations: 900 },
  { period: '22Q4', swapStations: 1300 },
  { period: '23Q2', swapStations: 1700 },
  { period: '23Q4', swapStations: 2200 },
  { period: '24Q2', swapStations: 2800 },
  { period: '24Q4', swapStations: 3100 },
  { period: '25Q2', swapStations: 3400 },
  { period: '25Q4', swapStations: 3750 },
  { period: '26Q1', swapStations: 3789 },
];

// 向后兼容旧引用
export const SWAP_DATA = {
  total: 3790,
  target2025: 4000,
  highway: 1027,
  ytd: 750,
  partners: 8,
};

export const PRE_2021_DELIVERY_OFFSET = 76406;
