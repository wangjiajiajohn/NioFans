// Focused Data Model for NIO Fans - Official ES9 Edition

export interface DeliveryPoint {
  month: string;
  value: number;
}

export const FLAT_DELIVERY_DATA: DeliveryPoint[] = [
  // 2021
  { month: '21-01', value: 7225 }, { month: '21-02', value: 5578 }, { month: '21-03', value: 7257 },
  { month: '21-04', value: 7102 }, { month: '21-05', value: 6711 }, { month: '21-06', value: 8083 },
  { month: '21-07', value: 7931 }, { month: '21-08', value: 5880 }, { month: '21-09', value: 10600 },
  { month: '21-10', value: 3667 }, { month: '21-11', value: 10900 }, { month: '21-12', value: 10500 },
  // 2022
  { month: '22-01', value: 9652 }, { month: '22-02', value: 6131 }, { month: '22-03', value: 9985 },
  { month: '22-04', value: 5074 }, { month: '22-05', value: 7024 }, { month: '22-06', value: 13000 },
  { month: '22-07', value: 10100 }, { month: '22-08', value: 10700 }, { month: '22-09', value: 10900 },
  { month: '22-10', value: 10100 }, { month: '22-11', value: 14200 }, { month: '22-12', value: 15800 },
  // 2023
  { month: '23-01', value: 8506 }, { month: '23-02', value: 12200 }, { month: '23-03', value: 10400 },
  { month: '23-04', value: 6658 }, { month: '23-05', value: 6155 }, { month: '23-06', value: 10700 },
  { month: '23-07', value: 20500 }, { month: '23-08', value: 19300 }, { month: '23-09', value: 15600 },
  { month: '23-10', value: 16100 }, { month: '23-11', value: 16000 }, { month: '23-12', value: 18000 },
  // 2024
  { month: '24-01', value: 10100 }, { month: '24-02', value: 8132 }, { month: '24-03', value: 11900 },
  { month: '24-04', value: 15600 }, { month: '24-05', value: 20500 }, { month: '24-06', value: 21200 },
  { month: '24-07', value: 20500 }, { month: '24-08', value: 20200 }, { month: '24-09', value: 21200 },
  { month: '24-10', value: 21000 }, { month: '24-11', value: 20600 }, { month: '24-12', value: 31100 },
  // 2025
  { month: '25-01', value: 13900 }, { month: '25-02', value: 13200 }, { month: '25-03', value: 15000 },
  { month: '25-04', value: 23900 }, { month: '25-05', value: 23200 }, { month: '25-06', value: 23900 },
  { month: '25-07', value: 21000 }, { month: '25-08', value: 31300 }, { month: '25-09', value: 34700 },
  { month: '25-10', value: 40400 }, { month: '25-11', value: 36300 }, { month: '25-12', value: 48100 },
  // 2026
  { month: '26-01', value: 27200 }, { month: '26-02', value: 20800 }, { month: '26-03', value: 35500 },
];

// Year-keyed delivery data for DeliverySection (e.g. DELIVERY_DATA[2025])
export const DELIVERY_DATA: Record<number, DeliveryPoint[]> = [2021, 2022, 2023, 2024, 2025, 2026].reduce(
  (acc, year) => {
    const prefix = String(year).slice(2);
    acc[year] = FLAT_DELIVERY_DATA.filter(d => d.month.startsWith(prefix));
    return acc;
  },
  {} as Record<number, DeliveryPoint[]>
);

export const ES9_BANNER = {
  title: 'NIO ES9',
  subtitle: '科技行政旗舰SUV · 重磅技术发布会',
  date: '2026.04.09',
  image: '/1.png'
};

export const EVENTS = [
  { date: '2026.03', title: 'NIO ES9 极寒测试完成', desc: '在漠河完成 -45°C 极寒环境下的全系统稳定性测试。', tag: '技术' },
  { date: '2025.12', title: '单月交付突破 4.8 万台', desc: '创下品牌历史新高，持续领跑高端纯电市场。', tag: '交付' },
  { date: '2025.04', title: '第四代换电站大规模部署', desc: '支持多品牌共享，换电速度提升 22%。', tag: '补能' }
];

export const FINANCIAL_DATA = [
  { quarter: '2025 Q4', revenue: 204.5, gap: 12.5, vehicleMargin: 18.2, cash: 520, rd: 36.8 }
];

export const SWAP_DATA = {
  total: 2850,
  target2025: 4000,
  highway: 820,
  ytd: 750,
  partners: 8
};


export const PRE_2021_DELIVERY_OFFSET = 76406;
