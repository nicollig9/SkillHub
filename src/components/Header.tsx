'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  Menu, 
  Sparkles, 
  RefreshCw, 
  BookOpen, 
  MapPin, 
  GraduationCap, 
  Calculator, 
  User, 
  LogOut,
  Building2,
  Sun,
  Moon,
  Compass,
  Briefcase
} from 'lucide-react';

export default function Header() {
  const router = useRouter();
  const [hasStoredSession, setHasStoredSession] = useState(false);
  const { 
    role, 
    student, 
    resetSimulator, 
    currentView, 
    setCurrentView, 
    toggleSidebar, 
    isAuthenticated, 
    currentUser, 
    logout,
    theme,
    toggleTheme
  } = useApp();

  useEffect(() => {
    const syncStoredSession = () => setHasStoredSession(Boolean(localStorage.getItem('skillhub_session')));
    syncStoredSession();
    window.addEventListener('storage', syncStoredSession);
    return () => window.removeEventListener('storage', syncStoredSession);
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const hasSession = isAuthenticated && hasStoredSession;
  const displayName = currentUser?.nome || student?.nome || 'Estudante';
  const displayInitials = (displayName || 'ES').split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();

  // Helper para verificar qual aba está ativa
  const isDashboardActive = currentView === 'DASHBOARD' || currentView === 'INICIO';
  const isCursosActive = currentView === 'CURSOS_DISPONIVEIS' || currentView === 'CURSOS' || currentView === 'MEUS_CURSOS' || currentView === 'CURSO_DETALHE';
  const isTrilhasActive = currentView === 'TRILHAS_DISPONIVEIS' || currentView === 'TRILHAS' || currentView === 'MINHAS_TRILHAS';
  const isMapaActive = currentView === 'MAPA_PROXIMIDADE';
  const isHoleriteActive = currentView === 'HOLERITE';

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0E091B]/95 backdrop-blur-md border-b border-slate-300 dark:border-purple-500/20 px-4 lg:px-8 py-2.5 shadow-sm dark:shadow-2xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* ========================================================================= */}
        {/* 1. LOGO & MARCA (ESQUERDA)                                               */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Botão de Menu Lateral (Hambúrguer) */}
          {isAuthenticated && (
            <button
              onClick={toggleSidebar}
              title="Abrir Menu de Navegação"
              className="flex items-center gap-1.5 p-2 rounded-xl border border-slate-300 dark:border-purple-500/30 bg-slate-200/80 hover:bg-slate-300 dark:bg-purple-950/60 dark:hover:bg-purple-900/60 text-slate-900 dark:text-purple-200 font-bold transition-all cursor-pointer"
            >
              <Menu className="w-4 h-4 text-purple-700 dark:text-purple-300" />
              <span className="hidden sm:inline text-xs font-bold text-slate-900 dark:text-purple-200">Menu</span>
            </button>
          )}

          {/* Logo Oficial e Nome SkillHub */}
          <button
            onClick={() => setCurrentView(isAuthenticated ? (role === 'RECRUTADOR' ? 'RECRUTADOR_RH' : 'DASHBOARD') : 'LOGIN')}
            className="flex items-center gap-3 text-left group transition-transform duration-150 hover:scale-[1.01] cursor-pointer"
          >
            <div className="relative flex items-center justify-center shrink-0 filter drop-shadow-sm">
              <img
                src="/logo.png"
                alt="SkillHub Logo"
                className="h-10 w-auto object-contain transform group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white flex items-center leading-none">
                Skill<span className="text-purple-700 dark:text-[#FBBF24]">Hub</span>
              </h1>
              <p className="text-[10px] text-slate-700 dark:text-purple-300 font-bold tracking-wide mt-0.5">
                Curitiba &amp; RMC
              </p>
            </div>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* 2. LINKS DE NAVEGAÇÃO FLUTUANTES (CENTRO)                                */}
        {/* ========================================================================= */}
        {isAuthenticated && role !== 'RECRUTADOR' && (
          <nav aria-label="Navegação Principal" className="hidden lg:flex items-center gap-1 bg-slate-200/90 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-300 dark:border-purple-500/20 shadow-inner text-xs font-bold">
            
            {/* Aba 1: Meu Dashboard */}
            <button
              onClick={() => setCurrentView('DASHBOARD')}
              className={`px-3.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                isDashboardActive
                  ? 'bg-purple-700 text-white font-black shadow-sm'
                  : 'text-slate-800 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-slate-800/60 font-bold'
              }`}
            >
              <span>Meu Dashboard</span>
            </button>

            {/* Aba 2: Cursos */}
            <button
              onClick={() => setCurrentView('CURSOS_DISPONIVEIS')}
              className={`px-3.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                isCursosActive
                  ? 'bg-purple-700 text-white font-black shadow-sm'
                  : 'text-slate-800 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-slate-800/60 font-bold'
              }`}
            >
              <span>Cursos</span>
            </button>

            {/* Aba 3: Trilhas */}
            <button
              onClick={() => setCurrentView('TRILHAS_DISPONIVEIS')}
              className={`px-3.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                isTrilhasActive
                  ? 'bg-purple-700 text-white font-black shadow-sm'
                  : 'text-slate-800 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-slate-800/60 font-bold'
              }`}
            >
              <span>Trilhas</span>
            </button>

            {/* Aba 4: Mapa de Vagas */}
            <button
              onClick={() => setCurrentView('MAPA_PROXIMIDADE')}
              className={`px-3.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                isMapaActive
                  ? 'bg-purple-700 text-white font-black shadow-sm'
                  : 'text-slate-800 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-slate-800/60 font-bold'
              }`}
            >
              <span>Mapa de Vagas</span>
            </button>

            {/* Aba 5: Calculadora Salarial */}
            <button
              onClick={() => setCurrentView('HOLERITE')}
              className={`px-3.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                isHoleriteActive
                  ? 'bg-purple-700 text-white font-black shadow-sm'
                  : 'text-slate-800 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-slate-800/60 font-bold'
              }`}
            >
              <span>Calculadora Salarial</span>
            </button>

          </nav>
        )}

        {/* Links Rápidos RH (Se perfil for Empresa) */}
        {isAuthenticated && role === 'RECRUTADOR' && (
          <div className="hidden lg:flex items-center gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl border border-slate-200 dark:border-purple-500/20 text-xs font-bold">
            <button
              onClick={() => setCurrentView('RECRUTADOR_RH')}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold shadow-sm flex items-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Painel RH da Empresa</span>
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. PERFIL E CONTROLES (DIREITA)                                           */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-2.5 shrink-0">
          
          {hasSession ? (
            <div className="flex items-center gap-2">
              
              {/* Botão Perfil / Usuário */}
              <button
                onClick={() => setCurrentView(role === 'RECRUTADOR' ? 'RECRUTADOR_RH' : 'DASHBOARD')}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-purple-500/30 bg-slate-200/80 hover:bg-slate-300 dark:bg-slate-900/80 dark:hover:bg-slate-800 transition-all text-left shadow-sm cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-[11px] shadow-sm">
                  {displayInitials}
                </div>
                <div className="hidden sm:block">
                  <div className="text-xs font-black text-slate-950 dark:text-white leading-tight">
                    {displayName}
                  </div>
                  <div className="text-[10px] text-slate-700 dark:text-purple-300 font-bold">
                    {role === 'RECRUTADOR' 
                      ? '🏢 Empresa Parceira' 
                      : `📍 ${student?.endereco?.bairro || 'CIC'} • Curitiba/PR`}
                  </div>
                </div>
              </button>

              {/* Botão Sair */}
              <button
                onClick={handleLogout}
                title="Encerrar Sessão"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-purple-500/30 text-slate-900 dark:text-purple-200 hover:bg-rose-100 hover:border-rose-300 hover:text-rose-700 dark:hover:bg-rose-500/15 dark:hover:text-rose-300 text-xs font-bold transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <span className="hidden md:inline font-bold">Sair</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push('/login')}
                className="flex items-center gap-1.5 border border-slate-300 dark:border-[#8B5CF6]/50 bg-slate-200/80 text-slate-900 dark:text-white font-bold px-3 py-1.5 rounded-xl text-xs transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>Login</span>
              </button>
              <button
                onClick={() => {
                  router.push('/login?cadastro=1');
                  window.dispatchEvent(new Event('skillhub:register'));
                }}
                className="bg-purple-700 hover:bg-purple-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow-sm transition-colors cursor-pointer"
              >
                Cadastrar
              </button>
            </div>
          )}

          {/* Botão Alternador de Tema Claro / Escuro */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Mudar para Tema Claro' : 'Mudar para Tema Escuro'}
            aria-label="Alternar tema de cores"
            className="flex items-center gap-1.5 p-2 px-2.5 rounded-xl text-xs font-bold transition-all border border-slate-300 dark:border-purple-500/30 bg-slate-200/80 hover:bg-slate-300 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-900 dark:text-amber-300 shadow-sm cursor-pointer"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="hidden md:inline text-[11px] text-amber-300 font-bold">Claro</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-purple-700" />
                <span className="hidden md:inline text-[11px] text-slate-900 font-bold">Escuro</span>
              </>
            )}
          </button>

          {/* Botão de Reset para testes */}
          {isAuthenticated && (
            <button
              onClick={resetSimulator}
              title="Reiniciar dados de demonstração"
              className="p-2 text-slate-500 dark:text-purple-300 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#6D28D9]/30 rounded-xl transition-all border border-slate-200 dark:border-[#6D28D9]/40 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}

        </div>
      </div>
    </header>
  );
}
