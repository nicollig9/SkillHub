'use client';

import React from 'react';
import { useApp, AppView } from '@/context/AppContext';
import { 
  Home,
  LayoutDashboard,
  ClipboardCheck,
  BookOpen, 
  Compass,
  Layers,
  Sparkles,
  MapPin, 
  Calculator, 
  Award, 
  Building2, 
  GraduationCap,
  HelpCircle,
  LogOut,
  X
} from 'lucide-react';

export default function Sidebar() {
  const { 
    currentView, 
    setCurrentView, 
    student, 
    vagas, 
    currentUser, 
    isAuthenticated, 
    logout, 
    role,
    candidateProfileType,
    isSidebarOpen,
    setIsSidebarOpen
  } = useApp();

  // Se a barra não estiver aberta, não renderiza nada
  if (!isSidebarOpen) return null;

  const userEmail = currentUser?.email || 'aluno@skillhub.com.br';
  const profileName = candidateProfileType === 'JOVEM_APRENDIZ' 
    ? 'Jovem Aprendiz' 
    : candidateProfileType === 'ESTAGIARIO' 
    ? 'Estagiário' 
    : candidateProfileType === 'ESTUDANTE' 
    ? 'Estudante' 
    : 'Primeiro Emprego';

  // Itens de navegação do Aluno / Candidato
  const studentNavItems: { id: AppView; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string }[] = [
    {
      id: 'DASHBOARD',
      label: 'Meu Dashboard',
      icon: LayoutDashboard,
      badge: 'Principal'
    },
    {
      id: 'MINHAS_AVALIACOES',
      label: 'Minhas Avaliações',
      icon: ClipboardCheck,
      badge: 'Quizzes'
    },
    {
      id: 'MEUS_CURSOS',
      label: 'Meus Cursos',
      icon: BookOpen,
      badge: '3 Ativos'
    },
    {
      id: 'TRILHAS_DISPONIVEIS',
      label: 'Trilhas de Formação',
      icon: Compass,
      badge: '5 Trilhas'
    },
    {
      id: 'MINHAS_TRILHAS',
      label: 'Minhas Trilhas',
      icon: Layers,
      badge: '1 Ativa'
    },
    {
      id: 'CURSOS_DISPONIVEIS',
      label: 'Cursos Disponíveis',
      icon: GraduationCap,
      badge: 'Catálogo'
    },
    {
      id: 'MAPA_PROXIMIDADE',
      label: 'Vagas por Bairro',
      icon: MapPin,
      badge: `${vagas.length} Vagas`
    },
    {
      id: 'HOLERITE',
      label: 'Calculadora de Salário',
      icon: Calculator,
      badge: 'Lei 10.097'
    },
    {
      id: 'BADGES_PERFIL',
      label: 'Minhas Badges & Perfil',
      icon: Award,
      badge: `${student.badgesEarned.length} Selos`
    }
  ];

  // Se for empresa logada, exibe o painel de RH
  if (role === 'RECRUTADOR') {
    studentNavItems.push({
      id: 'RECRUTADOR_RH',
      label: 'Painel RH da Empresa',
      icon: Building2,
      badge: 'Empresa'
    });
  }

  const handleNavigate = (view: AppView) => {
    setCurrentView(view);
    setIsSidebarOpen(false); // Fecha a barra lateral ao clicar
  };

  return (
    <>
      {/* Backdrop escuro com blur para fechar ao clicar fora */}
      <div 
        onClick={() => setIsSidebarOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity animate-fadeIn"
      />

      {/* Gaveta Lateral (Slide-over Drawer) */}
      <aside className="fixed top-0 left-0 bottom-0 w-72 sm:w-80 bg-[#140A23] border-r border-[#3E1C66]/70 z-50 p-5 flex flex-col justify-between shadow-2xl overflow-y-auto animate-slideRight">
        
        {/* Topo do Menu com Logo & Botão de Fechar */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#3E1C66]/50">
            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="SkillHub Logo" className="w-8 h-8 object-contain" />
              <div>
                <span className="font-black text-base text-white tracking-tight">
                  Skill<span className="text-[#FBBF24]">Hub</span>
                </span>
                <p className="text-[10px] text-purple-300">Menu de Navegação</p>
              </div>
            </div>

            <button
              onClick={() => setIsSidebarOpen(false)}
              title="Fechar menu"
              className="p-1.5 rounded-xl bg-[#24123E] hover:bg-[#351859] text-purple-300 hover:text-white border border-[#7C3AED]/30 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Botão Atalho Início */}
          <button
            onClick={() => handleNavigate('INICIO')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              currentView === 'INICIO'
                ? 'bg-gradient-to-r from-[#4C1D95] to-[#6D28D9] text-white border border-[#8B5CF6]/60 shadow-md'
                : 'text-purple-200 hover:text-white hover:bg-[#25123E]/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <Home className="w-4 h-4 text-[#FDE68A]" />
              <span>Página Inicial</span>
            </div>
            <span className="text-[10px] bg-[#220E3A] text-purple-300 px-1.5 py-0.2 rounded-full font-bold">
              Início
            </span>
          </button>

          {/* Lista de Itens do Menu */}
          <nav className="space-y-1">
            {studentNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#4C1D95] to-[#6D28D9] text-white border border-[#8B5CF6]/60 shadow-md shadow-purple-950/60'
                      : 'text-purple-200 hover:text-white hover:bg-[#25123E]/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#FDE68A]' : 'text-[#A78BFA]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-[#220E3A] text-purple-300 border border-[#521E8A]/40'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Rodapé da Gaveta */}
        <div className="pt-4 border-t border-[#3E1C66]/50 space-y-3">
          
          <button
            onClick={() => {
              alert('Canal de Suporte ao Usuário SkillHub:\nE-mail: contato@skillhub.com.br\nCuritiba & Região Metropolitana');
              setIsSidebarOpen(false);
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-purple-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#A78BFA]" />
              <span>Suporte & Dúvidas</span>
            </div>
          </button>

          {isAuthenticated ? (
            <div className="bg-[#1B0D30] border border-[#5B2594]/50 rounded-2xl p-3 flex items-center justify-between gap-2 shadow-inner">
              <div className="space-y-0.5 overflow-hidden">
                <div className="text-xs font-bold text-white truncate">
                  {currentUser?.nome || student.nome}
                </div>
                <div className="text-[10px] text-purple-300 flex items-center gap-1 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                  <span>{role === 'RECRUTADOR' ? 'Empresa' : profileName}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  logout();
                  setIsSidebarOpen(false);
                }}
                title="Sair"
                className="p-1.5 text-purple-300 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors shrink-0"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleNavigate('LOGIN')}
              className="w-full bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] hover:from-[#7C3AED] hover:to-[#9D4EDD] text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition-all text-center"
            >
              Fazer Login / Cadastrar
            </button>
          )}

        </div>

      </aside>
    </>
  );
}
