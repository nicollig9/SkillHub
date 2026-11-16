'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { COURSES, TRACKS } from '@/data/coursesData';
import { JOB_OPPORTUNITIES } from '@/data/jobsData';
import { 
  Menu,
  Search, 
  Sun, 
  Moon, 
  ChevronDown, 
  User, 
  LogOut, 
  Award, 
  RefreshCw, 
  Briefcase, 
  GraduationCap,
  Compass,
  Calculator,
  MapPin,
  X, 
  ArrowRight
} from 'lucide-react';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [hasStoredSession, setHasStoredSession] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const modalInputRef = useRef<HTMLInputElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

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

  // Sincroniza sessão armazenada no localStorage
  useEffect(() => {
    const syncStoredSession = () => {
      setHasStoredSession(Boolean(localStorage.getItem('skillhub_session')));
    };
    syncStoredSession();
    window.addEventListener('storage', syncStoredSession);
    return () => window.removeEventListener('storage', syncStoredSession);
  }, [isAuthenticated]);

  // Atalhos de teclado: ⌘K, Ctrl+K ou / para abrir o modal de busca, e ESC para fechar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      } else if (
        e.key === '/' && 
        !isSearchModalOpen &&
        !(document.activeElement instanceof HTMLInputElement) && 
        !(document.activeElement instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        setIsSearchModalOpen(true);
      } else if (e.key === 'Escape') {
        setIsSearchModalOpen(false);
        setIsProfileOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchModalOpen]);

  // Foca no input quando o modal de busca for aberto
  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => modalInputRef.current?.focus(), 50);
    } else {
      setSearchQuery('');
    }
  }, [isSearchModalOpen]);

  // Fecha dropdown do perfil ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleLogoClick = () => {
    if (isAuthenticated) {
      setCurrentView(role === 'RECRUTADOR' ? 'RECRUTADOR_RH' : 'DASHBOARD');
    } else {
      setCurrentView('INICIO');
    }
    if (pathname !== '/') {
      router.push('/');
    }
  };

  const hasSession = isAuthenticated && hasStoredSession;

  // Nome e inicial do usuário (enxuto e delicado)
  const rawName = currentUser?.nome || student?.nome || 'Nicolli Vitória';
  const normalizedName = rawName === 'Lucas Silva Oliveira' ? 'Nicolli Vitória' : rawName;
  const firstName = normalizedName.split(' ')[0] || 'Nicolli';
  const displayInitials = (normalizedName.split(' ').map((n) => n[0]).slice(0, 2).join('') || 'NV').toUpperCase();

  // Detecção precisa de link ativo
  const isDashboardActive = 
    pathname === '/dashboard' || 
    pathname === '/dashboard/candidato' || 
    pathname === '/dashboard/empresa' || 
    (pathname === '/' && (currentView === 'DASHBOARD' || currentView === 'RECRUTADOR_RH'));

  const isCoursesActive = 
    pathname === '/cursos' || 
    pathname.startsWith('/cursos/') || 
    (pathname === '/' && (currentView === 'CURSOS_DISPONIVEIS' || currentView === 'CURSOS' || currentView === 'MEUS_CURSOS' || currentView === 'CURSO_DETALHE'));

  const isTracksActive = 
    pathname === '/trilhas' || 
    pathname === '/minhas-trilhas' || 
    (pathname === '/' && (currentView === 'TRILHAS_DISPONIVEIS' || currentView === 'TRILHAS' || currentView === 'MINHAS_TRILHAS'));

  const isJobsActive = 
    pathname === '/vagas' || 
    (pathname === '/' && currentView === 'MAPA_PROXIMIDADE');

  const isSalaryActive = 
    pathname === '/holerite' || 
    (pathname === '/' && currentView === 'HOLERITE');

  // Ações de navegação direta
  const handleNav = (route: string, view: any) => {
    setCurrentView(view);
    if (pathname !== route) {
      router.push(route);
    }
  };

  // Resultados rápidos do Command Palette
  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return {
        courses: COURSES.slice(0, 3),
        tracks: TRACKS.slice(0, 2),
        jobs: JOB_OPPORTUNITIES.slice(0, 3)
      };
    }

    const matchedCourses = COURSES.filter((c) =>
      c.title.toLowerCase().includes(query) ||
      c.subtitle.toLowerCase().includes(query) ||
      c.category.toLowerCase().includes(query)
    ).slice(0, 3);

    const matchedTracks = TRACKS.filter((t) =>
      t.name.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query) ||
      t.category.toLowerCase().includes(query)
    ).slice(0, 2);

    const matchedJobs = JOB_OPPORTUNITIES.filter((j) =>
      j.title.toLowerCase().includes(query) ||
      j.company.toLowerCase().includes(query) ||
      j.neighborhood.toLowerCase().includes(query) ||
      j.modality.toLowerCase().includes(query)
    ).slice(0, 3);

    return {
      courses: matchedCourses,
      tracks: matchedTracks,
      jobs: matchedJobs
    };
  }, [searchQuery]);

  const hasAnyResults = 
    searchResults.courses.length > 0 || 
    searchResults.tracks.length > 0 || 
    searchResults.jobs.length > 0;

  return (
    <>
      <header className="sticky top-0 z-40 h-16 bg-white/80 dark:bg-[#090514]/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/[0.08] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">
          
          {/* ========================================================================= */}
          {/* 1. ESQUERDA — MARCA MINIMALISTA (SEM SELOS EXTRAS)                        */}
          {/* ========================================================================= */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Menu Hambúrguer apenas no mobile */}
            {isAuthenticated && (
              <button
                type="button"
                onClick={toggleSidebar}
                title="Abrir Menu"
                aria-label="Abrir Menu de Navegação"
                className="md:hidden p-2 rounded-lg text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-white/10 transition cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            {/* Logo + Nome SkillHub limpo */}
            <button
              type="button"
              onClick={handleLogoClick}
              className="flex items-center gap-2 text-left group cursor-pointer transition-opacity hover:opacity-90"
            >
              <img
                src="/logo.png"
                alt="SkillHub"
                className="w-8 h-8 rounded-lg object-contain"
              />
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
                Skill<span className="text-purple-600 dark:text-purple-400">Hub</span>
              </span>
            </button>
          </div>

          {/* ========================================================================= */}
          {/* 2. CENTRO — NAVEGAÇÃO INTEGRADA COM BOTÃO DE LUPA DISCRETO                 */}
          {/* ========================================================================= */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] rounded-full p-1 shadow-xs">
            
            {/* 5 Links Enxutos */}
            <button
              type="button"
              onClick={() => handleNav('/dashboard', role === 'RECRUTADOR' ? 'RECRUTADOR_RH' : 'DASHBOARD')}
              className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                isDashboardActive
                  ? 'bg-purple-600/15 dark:bg-purple-600/20 text-purple-700 dark:text-purple-300 border border-purple-500/30 font-semibold'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/[0.05] border border-transparent'
              }`}
            >
              Dashboard
            </button>

            <button
              type="button"
              onClick={() => handleNav('/cursos', 'CURSOS_DISPONIVEIS')}
              className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                isCoursesActive
                  ? 'bg-purple-600/15 dark:bg-purple-600/20 text-purple-700 dark:text-purple-300 border border-purple-500/30 font-semibold'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/[0.05] border border-transparent'
              }`}
            >
              Cursos
            </button>

            <button
              type="button"
              onClick={() => handleNav('/trilhas', 'TRILHAS_DISPONIVEIS')}
              className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                isTracksActive
                  ? 'bg-purple-600/15 dark:bg-purple-600/20 text-purple-700 dark:text-purple-300 border border-purple-500/30 font-semibold'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/[0.05] border border-transparent'
              }`}
            >
              Trilhas
            </button>

            <button
              type="button"
              onClick={() => handleNav('/vagas', 'MAPA_PROXIMIDADE')}
              className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                isJobsActive
                  ? 'bg-purple-600/15 dark:bg-purple-600/20 text-purple-700 dark:text-purple-300 border border-purple-500/30 font-semibold'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/[0.05] border border-transparent'
              }`}
            >
              Vagas
            </button>

            <button
              type="button"
              onClick={() => handleNav('/holerite', 'HOLERITE')}
              className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                isSalaryActive
                  ? 'bg-purple-600/15 dark:bg-purple-600/20 text-purple-700 dark:text-purple-300 border border-purple-500/30 font-semibold'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/[0.05] border border-transparent'
              }`}
            >
              Salário
            </button>

            {/* Divisor sutil */}
            <div className="h-3.5 w-[1px] bg-slate-300 dark:bg-white/10 mx-0.5" />

            {/* Botão de Lupa Compacto (Abre Command Palette) */}
            <button
              type="button"
              onClick={() => setIsSearchModalOpen(true)}
              className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-400 bg-slate-200/70 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] border border-slate-300/70 dark:border-white/10 rounded-full px-2.5 py-1 transition cursor-pointer whitespace-nowrap"
              title="Buscar cursos, vagas e trilhas (⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Buscar...</span>
              <kbd className="hidden lg:inline-flex items-center justify-center px-1.5 py-0.2 text-[9px] font-bold text-slate-500 dark:text-zinc-400 bg-white dark:bg-white/10 border border-slate-300 dark:border-white/10 rounded shadow-xs">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* ========================================================================= */}
          {/* 3. DIREITA — AÇÕES ENXUTAS (TEMA + PERFIL COMPACTO)                       */}
          {/* ========================================================================= */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Botão Lupa no Mobile */}
            <button
              type="button"
              onClick={() => setIsSearchModalOpen(true)}
              className="md:hidden w-8 h-8 rounded-full flex items-center justify-center text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition cursor-pointer"
              title="Buscar"
              aria-label="Abrir busca"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Alternador de Tema Discreto */}
            <button
              type="button"
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
              aria-label="Alternar tema"
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-purple-600 transition-transform hover:-rotate-12" />
              )}
            </button>

            {/* Perfil Compacto: Avatar (w-8 h-8) + Primeiro Nome (Nicolli) */}
            {hasSession ? (
              <div className="relative" ref={profileRef}>
                <button
                  type="button"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1 pr-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-white/10"
                  aria-expanded={isProfileOpen}
                  aria-haspopup="true"
                >
                  {/* Avatar Circular */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
                    {displayInitials}
                  </div>

                  {/* Primeiro Nome */}
                  <span className="text-xs font-medium text-slate-800 dark:text-zinc-200 hidden sm:inline whitespace-nowrap">
                    {firstName}
                  </span>

                  <ChevronDown
                    className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
                      isProfileOpen ? 'rotate-180 text-purple-600 dark:text-purple-400' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Limpo de Perfil */}
                {isProfileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-60 rounded-2xl bg-white dark:bg-[#120a22] border border-slate-200 dark:border-white/10 shadow-xl p-2 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 space-y-1">
                    
                    {/* Cabeçalho do Usuário */}
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {normalizedName}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-zinc-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-purple-500 shrink-0" />
                        <span className="truncate">{student?.endereco?.bairro || 'CIC'} • Curitiba/PR</span>
                      </p>
                    </div>

                    {/* Ações */}
                    <div className="pt-1 space-y-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileOpen(false);
                          handleNav('/dashboard', role === 'RECRUTADOR' ? 'RECRUTADOR_RH' : 'DASHBOARD');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-white/10 transition cursor-pointer text-left"
                      >
                        <User className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                        <span>Meu Dashboard</span>
                      </button>

                      {role !== 'RECRUTADOR' && (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              setIsProfileOpen(false);
                              setCurrentView('BADGES_PERFIL');
                              if (pathname !== '/') router.push('/');
                            }}
                            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-white/10 transition cursor-pointer text-left"
                          >
                            <Award className="w-3.5 h-3.5 text-amber-500" />
                            <span>Minhas Badges</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setIsProfileOpen(false);
                              handleNav('/holerite', 'HOLERITE');
                            }}
                            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-white/10 transition cursor-pointer text-left"
                          >
                            <Calculator className="w-3.5 h-3.5 text-blue-500" />
                            <span>Calculadora Salarial</span>
                          </button>
                        </>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileOpen(false);
                          resetSimulator();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-white/10 transition cursor-pointer text-left"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                        <span>Reiniciar Demonstração</span>
                      </button>
                    </div>

                    <div className="my-1 border-t border-slate-100 dark:border-white/5" />

                    <button
                      type="button"
                      onClick={() => {
                        setIsProfileOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition cursor-pointer text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sair</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => router.push('/login')}
                  className="text-xs font-medium text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white px-3 py-1.5 rounded-full transition cursor-pointer"
                >
                  Entrar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    router.push('/login?cadastro=1');
                    window.dispatchEvent(new Event('skillhub:register'));
                  }}
                  className="text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white px-3.5 py-1.5 rounded-full transition shadow-xs cursor-pointer"
                >
                  Cadastrar
                </button>
              </div>
            )}

          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* COMMAND PALETTE FLUTUANTE (CENTRALIZADO, ESTILO LINEAR / STRIPE)           */}
      {/* ========================================================================= */}
      {isSearchModalOpen && (
        <div 
          onClick={() => setIsSearchModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center pt-20 px-4 animate-in fade-in duration-150"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl bg-white dark:bg-[#120a22] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
          >
            {/* Input de Busca */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 dark:border-white/10">
              <Search className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
              <input
                ref={modalInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar cursos, vagas em Curitiba, trilhas..."
                className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setIsSearchModalOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-white transition"
              >
                <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded">
                  ESC
                </kbd>
              </button>
            </div>

            {/* Resultados */}
            <div className="max-h-[360px] overflow-y-auto p-2 space-y-3 custom-scrollbar">
              {!hasAnyResults ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  Nenhum resultado para &quot;{searchQuery}&quot;
                </div>
              ) : (
                <>
                  {/* Cursos */}
                  {searchResults.courses.length > 0 && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 px-2 text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                        <GraduationCap className="w-3 h-3" />
                        <span>Cursos</span>
                      </div>
                      {searchResults.courses.map((course) => (
                        <div
                          key={course.id}
                          onClick={() => {
                            setIsSearchModalOpen(false);
                            router.push(`/cursos/${course.id}`);
                          }}
                          className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition flex items-center justify-between cursor-pointer group"
                        >
                          <div>
                            <p className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300">
                              {course.title}
                            </p>
                            <p className="text-[10px] text-slate-500 dark:text-zinc-400">
                              {course.category} • {course.hours}h
                            </p>
                          </div>
                          <span className="text-[10px] text-purple-600 dark:text-purple-400 font-medium opacity-0 group-hover:opacity-100 transition">
                            Acessar ➔
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Vagas */}
                  {searchResults.jobs.length > 0 && (
                    <div className="space-y-1 pt-1 border-t border-slate-100 dark:border-white/5">
                      <div className="flex items-center gap-1.5 px-2 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        <Briefcase className="w-3 h-3" />
                        <span>Vagas em Curitiba &amp; RMC</span>
                      </div>
                      {searchResults.jobs.map((job) => (
                        <div
                          key={job.id}
                          onClick={() => {
                            setIsSearchModalOpen(false);
                            handleNav('/vagas', 'MAPA_PROXIMIDADE');
                          }}
                          className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition flex items-center justify-between cursor-pointer group"
                        >
                          <div>
                            <p className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300">
                              {job.title}
                            </p>
                            <p className="text-[10px] text-slate-500 dark:text-zinc-400">
                              {job.company} • {job.neighborhood} • {job.salary}
                            </p>
                          </div>
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium opacity-0 group-hover:opacity-100 transition">
                            Ver vaga ➔
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Trilhas */}
                  {searchResults.tracks.length > 0 && (
                    <div className="space-y-1 pt-1 border-t border-slate-100 dark:border-white/5">
                      <div className="flex items-center gap-1.5 px-2 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        <Compass className="w-3 h-3" />
                        <span>Trilhas</span>
                      </div>
                      {searchResults.tracks.map((track) => (
                        <div
                          key={track.id}
                          onClick={() => {
                            setIsSearchModalOpen(false);
                            handleNav('/trilhas', 'TRILHAS_DISPONIVEIS');
                          }}
                          className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition flex items-center justify-between cursor-pointer group"
                        >
                          <div>
                            <p className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300">
                              {track.name}
                            </p>
                            <p className="text-[10px] text-slate-500 dark:text-zinc-400">
                              {track.hoursTotal}h totais
                            </p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400" />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Rodapé do Modal */}
            <div className="px-4 py-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-400 bg-slate-50/50 dark:bg-white/[0.02]">
              <span>Navegue com facilidade pelo SkillHub</span>
              <span>Pressione <kbd className="font-mono">ESC</kbd> para sair</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
