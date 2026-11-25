'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import CoursesView from '@/components/CoursesView';
import CourseViewer from '@/components/CourseViewer';
import { useApp } from '@/context/AppContext';

export default function CoursesCatalogRoutePage() {
  const router = useRouter();
  const { isAuthenticated, currentView } = useApp();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0D17] text-slate-100 transition-colors duration-300">
      <Header />
      {isAuthenticated && <Sidebar />}
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto flex flex-col items-center justify-start">
        {currentView === 'CURSO_DETALHE' ? <CourseViewer /> : <CoursesView />}
      </main>
    </div>
  );
}
