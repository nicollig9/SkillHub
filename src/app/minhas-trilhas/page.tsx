'use client';

import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import TracksView from '@/components/TracksView';
import CourseViewer from '@/components/CourseViewer';
import { useApp } from '@/context/AppContext';

export default function MinhasTrilhasPage() {
  const { isAuthenticated, currentView, setCurrentView } = useApp();

  useEffect(() => {
    if (currentView !== 'CURSO_DETALHE') {
      setCurrentView('MINHAS_TRILHAS');
    }
  }, [currentView, setCurrentView]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0D17] text-slate-100 transition-colors duration-300">
      <Header />
      {isAuthenticated && <Sidebar />}
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto flex flex-col items-center justify-start">
        {currentView === 'CURSO_DETALHE' ? <CourseViewer /> : <TracksView />}
      </main>
    </div>
  );
}
