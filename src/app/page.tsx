"use client";
import React from 'react';
import Banner from '@/components/Banner';
import DeliveryChart from '@/components/DeliveryChart';

export default function AppShell() {
  return (
    <main className="page-shell">
      <Banner />
      <DeliveryChart />
    </main>
  );
}
