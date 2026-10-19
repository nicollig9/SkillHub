'use client';

import React from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import CuritibaProximityMap from '@/components/CuritibaProximityMap';
import { useApp } from '@/context/AppContext';

export default function VagasRoute() {
  const { isAuthenticated } = useApp();

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      {isAuthenticated && <Sidebar />}
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <CuritibaProximityMap />
      </main>
    </div>
  );
}