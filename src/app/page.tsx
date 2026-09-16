'use client';

import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import LandingPage from '@/components/LandingPage';
import LoginPage from '@/components/LoginPage';
import StudentDashboard from '@/components/StudentDashboard';
import CoursesView from '@/components/CoursesView';
import TracksView from '@/components/TracksView';
import MyCoursesView from '@/components/MyCoursesView';
import MyEvaluationsView from '@/components/MyEvaluationsView';
import CourseViewer from '@/components/CourseViewer';
import CuritibaProximityMap from '@/components/CuritibaProximityMap';
import HoleriteSimulator from '@/components/HoleriteSimulator';
import BadgeWallet from '@/components/BadgeWallet';
import RecruiterDashboard from '@/components/RecruiterDashboard';
import { useApp } from '@/context/AppContext';

export default function HomePage() {
  const { currentView, role, isAuthenticated, setCurrentView } = useApp();

  // Keep view in sync when user changes role
  useEffect(() => {
    if (isAuthenticated) {
      if (role === 'RECRUTADOR' && currentView !== 'RECRUTADOR_RH') {
        setCurrentView('RECRUTADOR_RH');
      } else if (role === 'ALUNO' && currentView === 'RECRUTADOR_RH') {
        setCurrentView('DASHBOARD');
      }
    }
  }, [role, isAuthenticated]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0C0717]">
      {/* Top Header */}
      <Header />

      {/* Drawer Sidebar Modal (Só acessível após autenticação) */}
      {isAuthenticated && <Sidebar />}

      {/* Dynamic Main Content Area */}
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
        {!isAuthenticated ? (
          <LoginPage />
        ) : role === 'RECRUTADOR' ? (
          <RecruiterDashboard />
        ) : (
          <>
            {currentView === 'INICIO' && <StudentDashboard />}
            {currentView === 'LOGIN' && <StudentDashboard />}
            {currentView === 'DASHBOARD' && <StudentDashboard />}
            {currentView === 'CURSOS_DISPONIVEIS' && <CoursesView />}
            {currentView === 'MEUS_CURSOS' && <MyCoursesView />}
            {currentView === 'TRILHAS_DISPONIVEIS' && <TracksView />}
            {currentView === 'MINHAS_TRILHAS' && <TracksView />}
            {currentView === 'MINHAS_AVALIACOES' && <MyEvaluationsView />}
            {currentView === 'CURSOS' && <CoursesView />}
            {currentView === 'TRILHAS' && <TracksView />}
            {currentView === 'CURSO_DETALHE' && <CourseViewer />}
            {currentView === 'MAPA_PROXIMIDADE' && <CuritibaProximityMap />}
            {currentView === 'HOLERITE' && <HoleriteSimulator />}
            {currentView === 'BADGES_PERFIL' && <BadgeWallet />}
          </>
        )}
      </main>
    </div>
  );
}
