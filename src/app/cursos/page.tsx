'use client';

import React from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import CoursesView from '@/components/CoursesView';
import { useApp } from '@/context/AppContext';

export default function CoursesCatalogRoutePage() {
  const { isAuthenticated } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0D17] text-slate-100 transition-colors duration-300">
      <Header />
      {isAuthenticated && <Sidebar />}
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto flex flex-col items-center justify-start">
        <CoursesView />
      </main>
    </div>
  );
}
