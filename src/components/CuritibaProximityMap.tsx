'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const JobsInteractiveView = dynamic(() => import('@/components/map/JobsInteractiveView'), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-7xl mx-auto py-24 flex flex-col items-center justify-center space-y-4">
      <div className="w-10 h-10 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      <p className="text-xs text-zinc-400">Carregando Mapa de Vagas e Proximidade SkillHub...</p>
    </div>
  )
});

export default function CuritibaProximityMap() {
  return <JobsInteractiveView />;
}
