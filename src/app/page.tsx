"use client";
import React from 'react';
import Banner from '@/components/Banner';
import DeliveryChart from '@/components/DeliveryChart';
import ModelSection from '@/components/ModelSection';

export default function AppShell() {
  return (
    <main className="page-shell">
      <Banner />
      <DeliveryChart />
      <ModelSection />
    </main>
  );
}
