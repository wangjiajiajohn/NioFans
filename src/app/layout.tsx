import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LangProvider } from "@/contexts/LangContext";

export const viewport: Viewport = {
  viewportFit: 'cover',
  themeColor: '#060608',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "NioFans · 蔚来数据",
  description: "蔚来汽车交付数据、财务数据、换电站建设数据实时追踪",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" suppressHydrationWarning style={{ background: '#ffffff' }}>
      <body style={{ background: '#ffffff', margin: 0, padding: 0 }}>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
