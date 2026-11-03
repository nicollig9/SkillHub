'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import CourseViewer from '@/components/CourseViewer';
import { useApp } from '@/context/AppContext';

export default function CourseRoutePage() {
  const params = useParams();
  const rawId = params?.id;
  const courseId = Array.isArray(rawId) ? rawId[0] : (rawId as string) || 'orcamento-primeiro-salarial';
  const { setSelectedCourseId, isAuthenticated } = useApp();

  useEffect(() => {
    if (courseId && setSelectedCourseId) {
      setSelectedCourseId(courseId);
    }
  }, [courseId, setSelectedCourseId]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0D17] text-slate-100 transition-colors duration-300">
      <Header />
      {isAuthenticated && <Sidebar />}
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto flex flex-col items-center justify-start">
        <CourseViewer courseId={courseId} />
      </main>
    </div>
  );
}
