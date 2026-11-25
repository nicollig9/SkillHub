'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useApp, AppView } from '@/context/AppContext';
import { COURSES, TRACKS } from '@/data/coursesData';
import DemoPageGuide from '@/components/DemoPageGuide';
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
  ArrowRight,
  FileText,
  ClipboardCheck,
  BookOpen,
  Layers,
  Sparkles,
  Building2,
  HelpCircle,
  Info,
  Mail,
  Clock
} from 'lucide-react';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [hasStoredSession, setHasStoredSession] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const modalInputRef = useRef<HTMLInputElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);

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
    toggleTheme,
    isDemoMode
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
        setIsMoreOpen(false);
        setIsSupportModalOpen(false);
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

  // Fecha dropdowns ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
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

  // Nome e inicial do usuário
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
    (pathname === '/' && (currentView === 'CURSOS_DISPONIVEIS' || currentView === 'CURSOS'));

  const isTracksActive = 
    pathname === '/trilhas' || 
    (pathname === '/' && (currentView === 'TRILHAS_DISPONIVEIS' || currentView === 'TRILHAS'));

  const isJobsActive = 
    pathname === '/vagas' || 
    (pathname === '/' && currentView === 'MAPA_PROXIMIDADE');

  const isSalaryActive = 
    pathname === '/holerite' || 
    (pathname === '/' && currentView === 'HOLERITE');

  // Detecção do estado ativo para abas secundárias dentro do menu "Mais"
  const isMoreActive = 
    pathname === '/perfil' || 
    pathname === '/curriculo' || 
    pathname === '/sobre' || 
    pathname === '/minhas-trilhas' || 
    (pathname === '/' && (
      currentView === 'MINHAS_AVALIACOES' || 
      currentView === 'MEUS_CURSOS' || 
      currentView === 'MINHAS_TRILHAS' || 
      currentView === 'BADGES_PERFIL'
    ));

  // Ações de navegação direta
  const handleNav = (route: string, view?: AppView) => {
    if (view) {
      setCurrentView(view);
    }
    if (pathname !== route) {
      router.push(route);
    }
  };

  // Navegação para views que vivem na Home ou em rotas dedicadas
  const handleViewNav = (view: AppView, fallbackRoute?: string) => {
    setCurrentView(view);
    if (fallbackRoute) {
      if (pathname !== fallbackRoute) {
        router.push(fallbackRoute);
      }
    } else {
      if (pathname !== '/') {
        router.push('/');
      }
    }
  };

  // Resultados rápidos do Command Palette com estrita deduplicação
  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    // Deduplicação garantida de Cursos por título normalizado e ID canônico
    const deduplicateCourses = (courseList: typeof COURSES) => {
      const seen = new Set<string>();
      const result: typeof COURSES = [];
      for (const course of courseList) {
        const titleKey = course.title.trim().toLowerCase();
        if (!seen.has(titleKey) && !seen.has(course.id)) {
          seen.add(titleKey);
          seen.add(course.id);
          result.push(course);
        }
      }
      return result;
    };

    // Deduplicação garantida de Trilhas por nome normalizado e ID
    const deduplicateTracks = (trackList: typeof TRACKS) => {
      const seen = new Set<string>();
      const result: typeof TRACKS = [];
      for (const track of trackList) {
        const nameKey = track.name.trim().toLowerCase();
        if (!seen.has(nameKey) && !seen.has(track.id)) {
          seen.add(nameKey);
          seen.add(track.id);
          result.push(track);
        }
      }
      return result;
    };

    // Deduplicação garantida de Vagas por cargo + empresa e ID
    const deduplicateJobs = (jobList: typeof JOB_OPPORTUNITIES) => {
      const seen = new Set<string>();
      const result: typeof JOB_OPPORTUNITIES = [];
      for (const job of jobList) {
        const jobKey = `${job.title.trim().toLowerCase()}__${job.company.trim().toLowerCase()}`;
        const idKey = String(job.id);
        if (!seen.has(jobKey) && !seen.has(idKey)) {
          seen.add(jobKey);
          seen.add(idKey);
          result.push(job);
        }
      }
      return result;
    };

    if (!query) {
      return {
        courses: deduplicateCourses(COURSES).slice(0, 3),
        tracks: deduplicateTracks(TRACKS).slice(0, 2),
        jobs: deduplicateJobs(JOB_OPPORTUNITIES).slice(0, 3)
      };
    }

    const matchedCourses = deduplicateCourses(
      COURSES.filter((c) =>
        c.title.toLowerCase().includes(query) ||
        c.subtitle?.toLowerCase().includes(query) ||
        c.category?.toLowerCase().includes(query)
      )
    ).slice(0, 3);

    const matchedTracks = deduplicateTracks(
      TRACKS.filter((t) =>
        t.name.toLowerCase().includes(query) ||
        t.description?.toLowerCase().includes(query) ||
        t.category?.toLowerCase().includes(query)
      )
    ).slice(0, 2);

    const matchedJobs = deduplicateJobs(
      JOB_OPPORTUNITIES.filter((j) =>
        j.title.toLowerCase().includes(query) ||
        j.company.toLowerCase().includes(query) ||
        j.neighborhood?.toLowerCase().includes(query) ||
        j.modality?.toLowerCase().includes(query)
      )
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
      {/* Banner Discreto de Modo Demonstração */}
      {isDemoMode && isAuthenticated && (
        <div className="w-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white text-xs font-medium py-1 px-4 shadow-sm relative z-50 border-b border-amber-600/40">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-white animate-pulse" />
              <span className="font-extrabold flex items-center gap-1.5 text-white tracking-wide uppercase text-[10px] bg-black/20 px-2 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3 text-amber-200" />
                Modo Demonstração
              </span>
              <span className="text-amber-50 text-xs hidden sm:inline">
                {role === 'RECRUTADOR'
                  ? 'Sessão avaliativa de RH com vagas e candidatos de Curitiba & RMC.'
                  : `Perfil modelo de ${student?.nome || 'Lucas Andrade'} pré-populado com 4 certificados, QR Code e competências.`}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={resetSimulator}
                className="text-[11px] font-semibold bg-white/15 hover:bg-white/25 text-white px-2.5 py-0.5 rounded-md transition-all cursor-pointer flex items-center gap-1"
                title="Resetar progresso para o estado inicial"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Resetar Progresso</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  logout();
                  router.push('/login');
                }}
                className="text-[11px] font-bold bg-amber-950/40 hover:bg-amber-950/60 text-amber-100 hover:text-white px-2.5 py-0.5 rounded-md transition-all cursor-pointer flex items-center gap-1 border border-white/20"
                title="Sair do modo de demonstração e retornar ao login"
              >
                <LogOut className="w-3 h-3" />
                <span>Sair da Demonstração</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 h-16 bg-white/80 dark:bg-[#090514]/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/[0.08] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">
          
          {/* ========================================================================= */}
          {/* 1. ESQUERDA — MARCA MINIMALISTA (SEM SELOS EXTRAS)                        */}
          {/* ========================================================================= */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Menu Hambúrguer visível no mobile para abrir a gaveta completa */}
            <button
              type="button"
              onClick={toggleSidebar}
              title="Abrir Menu de Navegação Completo"
              aria-label="Abrir Menu de Navegação"
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-white/10 transition cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Logo + Nome SkillHub limpo e elegante */}
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
          {/* 2. CENTRO — NAVEGAÇÃO INTEGRADA + DROPDOWN "MAIS ▾" + LUPA COMPACTA       */}
          {/* ========================================================================= */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] rounded-full p-1 shadow-xs">
            
            {/* 5 Links Principais Enxutos */}
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

            {/* Dropdown "Mais ▾" com todas as abas secundárias */}
            <div className="relative" ref={moreMenuRef}>
              <button
                type="button"
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                  isMoreActive || isMoreOpen
                    ? 'bg-purple-600/15 dark:bg-purple-600/20 text-purple-700 dark:text-purple-300 border border-purple-500/30 font-semibold'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/[0.05] border border-transparent'
                }`}
                aria-expanded={isMoreOpen}
                aria-haspopup="true"
              >
                <span>Mais</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isMoreOpen ? 'rotate-180 text-purple-600 dark:text-purple-400' : 'text-slate-400'}`} />
              </button>

              {/* Menu Flutuante Moderno (Glassmorphism) com Abas Secundárias */}
              {isMoreOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 sm:w-80 rounded-2xl bg-white/95 dark:bg-[#120a22]/95 border border-slate-200/80 dark:border-purple-500/25 shadow-2xl p-2 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 space-y-1">
                  
                                    {/* Meu Passaporte de Competências */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsMoreOpen(false);
                      handleNav('/perfil');
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-200/50 dark:border-amber-800/30 flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-400 group-hover:scale-105 transition-transform">
                        <Award className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-800 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                          Meu Passaporte
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-zinc-400 truncate">
                          Portfólio público de competências e certificados
                        </p>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 shrink-0 ml-1">
                      Portfólio
                    </span>
                  </button>

                  {/* Meu Currículo com IA */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsMoreOpen(false);
                      handleNav('/curriculo');
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-950/50 border border-purple-200/50 dark:border-purple-800/30 flex items-center justify-center shrink-0 text-purple-600 dark:text-purple-400 group-hover:scale-105 transition-transform">
                        <FileText className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                          Meu Currículo
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-zinc-400 truncate">
                          Gerador profissional com IA e exportação em PDF
                        </p>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 shrink-0 ml-1">
                      IA
                    </span>
                  </button>

                  {/* Minhas Avaliações */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsMoreOpen(false);
                      handleViewNav('MINHAS_AVALIACOES');
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/50 dark:border-emerald-800/30 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                        <ClipboardCheck className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                          Minhas Avaliações
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-zinc-400 truncate">
                          Histórico de notas, quizzes e desempenho
                        </p>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 shrink-0 ml-1">
                      Quizzes
                    </span>
                  </button>

                  {/* Minhas Badges & Perfil */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsMoreOpen(false);
                      handleViewNav('BADGES_PERFIL');
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-200/50 dark:border-amber-800/30 flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-400 group-hover:scale-105 transition-transform">
                        <Award className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-800 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                          Badges &amp; Certificados
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-zinc-400 truncate">
                          Selos de competência e conquistas
                        </p>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 shrink-0 ml-1">
                      {student?.badgesEarned?.length || 0} Selos
                    </span>
                  </button>

                  {/* Meus Cursos em Andamento */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsMoreOpen(false);
                      handleViewNav('MEUS_CURSOS');
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200/50 dark:border-blue-800/30 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
                        <BookOpen className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                          Meus Cursos Inscritos
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-zinc-400 truncate">
                          Aulas em andamento e progresso
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* Minhas Trilhas */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsMoreOpen(false);
                      handleNav('/minhas-trilhas', 'MINHAS_TRILHAS');
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-fuchsia-50 dark:bg-fuchsia-950/50 border border-fuchsia-200/50 dark:border-fuchsia-800/30 flex items-center justify-center shrink-0 text-fuchsia-600 dark:text-fuchsia-400 group-hover:scale-105 transition-transform">
                        <Layers className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-800 dark:text-white group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-300 transition-colors">
                          Minhas Trilhas Ativas
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-zinc-400 truncate">
                          Trilhas profissionais em andamento
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* Painel RH da Empresa (se aplicável) */}
                  {role === 'RECRUTADOR' && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsMoreOpen(false);
                        handleNav('/dashboard/empresa', 'RECRUTADOR_RH');
                      }}
                      className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-left group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200/50 dark:border-indigo-800/30 flex items-center justify-center shrink-0 text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform">
                          <Building2 className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                            Painel RH da Empresa
                          </p>
                          <p className="text-[10px] text-slate-500 dark:text-zinc-400 truncate">
                            Gestão de vagas e candidatos da Lei 10.097
                          </p>
                        </div>
                      </div>
                    </button>
                  )}

                  {/* Sobre o SkillHub */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsMoreOpen(false);
                      handleNav('/sobre');
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-violet-50 dark:bg-violet-950/50 border border-violet-200/50 dark:border-violet-800/30 flex items-center justify-center shrink-0 text-violet-600 dark:text-violet-400 group-hover:scale-105 transition-transform">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-800 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
                          Sobre o SkillHub
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-zinc-400 truncate">
                          Propósito, impacto e regras da Lei 10.097
                        </p>
                      </div>
                    </div>
                  </button>

                  <div className="my-1 border-t border-slate-100 dark:border-white/5" />

                  {/* Ajuda & Suporte */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsMoreOpen(false);
                      setIsSupportModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2 p-2 rounded-xl text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-left cursor-pointer"
                  >
                    <HelpCircle className="w-4 h-4 text-purple-500" />
                    <span className="text-xs font-medium">Ajuda &amp; Suporte</span>
                  </button>
                </div>
              )}
            </div>

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
          {/* 3. DIREITA — AÇÕES ENXUTAS (TEMA + PERFIL EXPANDIDO COMPACTO)             */}
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

            {/* Perfil Compacto (Avatar + Primeiro Nome + Dropdown Expandido) */}
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

                {/* Dropdown Expandido de Perfil com Acesso Completo */}
                {isProfileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl bg-white dark:bg-[#120a22] border border-slate-200 dark:border-white/10 shadow-2xl p-2 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 space-y-1">
                    
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

                    {/* Ações e Rotas Secundárias */}
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
                      {/* Meu Passaporte / Portfólio */}
                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileOpen(false);
                          handleNav('/perfil');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-white/10 transition cursor-pointer text-left"
                      >
                        <Award className="w-3.5 h-3.5 text-amber-400" />
                        <span>Meu Passaporte de Competências</span>
                      </button>

                      {/* Meu Currículo com IA */}
                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileOpen(false);
                          handleNav('/curriculo');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-white/10 transition cursor-pointer text-left"
                      >
                        <FileText className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Meu Currículo com IA</span>
                      </button>

                      {role !== 'RECRUTADOR' && (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              setIsProfileOpen(false);
                              handleViewNav('BADGES_PERFIL');
                            }}
                            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-white/10 transition cursor-pointer text-left"
                          >
                            <Award className="w-3.5 h-3.5 text-amber-500" />
                            <span>Minhas Badges &amp; Perfil</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setIsProfileOpen(false);
                              handleViewNav('MINHAS_AVALIACOES');
                            }}
                            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-white/10 transition cursor-pointer text-left"
                          >
                            <ClipboardCheck className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Minhas Avaliações</span>
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
                          handleNav('/sobre');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-white/10 transition cursor-pointer text-left"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-violet-500" />
                        <span>Sobre o SkillHub</span>
                      </button>

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
                      <span>Sair da Conta</span>
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

      {/* Guia Contextual de Avaliação do Modo Demonstração */}
      <DemoPageGuide />

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
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-white transition cursor-pointer"
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
      {/* ========================================================================= */}
      {/* MODAL DE AJUDA & SUPORTE AO ESTUDANTE (GLASSMORPHISM RESPONSIVO)          */}
      {/* ========================================================================= */}
      {isSupportModalOpen && (
        <div
          onClick={() => setIsSupportModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white/95 dark:bg-[#120a22]/95 border border-slate-200/80 dark:border-purple-500/30 rounded-3xl shadow-2xl p-6 backdrop-blur-2xl animate-in zoom-in-95 duration-200 relative overflow-hidden text-slate-800 dark:text-zinc-100"
          >
            {/* Efeito Glow de Fundo */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Cabeçalho do Modal */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-white/10 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                    Suporte &amp; Atendimento ao Aluno
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">
                    Estamos aqui para ajudar na sua jornada profissional
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsSupportModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition cursor-pointer"
                title="Fechar (ESC)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conteúdo / Cards Informativos */}
            <div className="py-5 space-y-3.5 relative z-10">
              {/* Card E-mail */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/70 dark:border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/40 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400">
                      Canal Direto por E-mail
                    </p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      contato@skillhub.com.br
                    </p>
                  </div>
                </div>
                <a
                  href="mailto:contato@skillhub.com.br?subject=Suporte%20SkillHub"
                  className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-xs transition cursor-pointer shrink-0"
                >
                  Enviar E-mail
                </a>
              </div>

              {/* Card Localização & Abrangência */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/70 dark:border-white/10 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400">
                    Polo Regional &amp; Atendimento
                  </p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    Curitiba &amp; Região Metropolitana (RMC)
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
                    Programas de Jovem Aprendiz (Lei 10.097/00), Estágio e Primeiro Emprego.
                  </p>
                </div>
              </div>

              {/* Card Horários */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/70 dark:border-white/10 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/40 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400">
                    Horário de Atendimento Técnico
                  </p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    Segunda a Sexta-feira — das 08h às 18h
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
                    Tempo médio de resposta: até 24 horas úteis.
                  </p>
                </div>
              </div>
            </div>

            {/* Rodapé do Modal */}
            <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs relative z-10">
              <span className="text-[11px] text-slate-400 dark:text-zinc-500">
                Plataforma SkillHub • Curitiba/PR
              </span>
              <button
                type="button"
                onClick={() => setIsSupportModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-zinc-200 font-semibold transition cursor-pointer"
              >
                Entendi, Fechar
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}
