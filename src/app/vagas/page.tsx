'use client';

import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import LoginPage from '@/components/LoginPage';
import { useApp } from '@/context/AppContext';

const CuritibaProximityMap = dynamic(() => import('@/components/CuritibaProximityMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-6xl mx-auto py-24 flex flex-col items-center justify-center space-y-4">
      <div className="w-10 h-10 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      <p className="text-xs text-zinc-400">Carregando oportunidades em Curitiba &amp; RMC...</p>
    </div>
  )
});

export default function VagasRoute() {
  const { isAuthenticated } = useApp();

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      {isAuthenticated && <Sidebar />}
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {!isAuthenticated ? <LoginPage /> : <CuritibaProximityMap />}
      </main>
    </div>
  );
}
