'use client';

import React from 'react';
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
  Moon
} from 'lucide-react';

export default function Header() {
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

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#200F38] via-[#331656] to-[#481E78] border-b border-[#6D34A8]/40 px-4 lg:px-8 py-3 shadow-2xl backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Lado Esquerdo: Botão Menu Hamburger + Logo SkillHub */}
        <div className="flex items-center gap-3">
          
          {/* Botão Hamburger para Abrir a Barra Lateral (Só autenticado) */}
          {isAuthenticated && (
            <button
              onClick={toggleSidebar}
              title="Abrir Menu de Navegação"
              className="flex items-center gap-2 bg-[#17092A] hover:bg-[#281347] border border-[#7C3AED]/50 text-[#FDE68A] hover:text-white px-3 py-2 rounded-xl text-xs font-bold shadow-md transition-all transform hover:scale-105"
            >
              <Menu className="w-4 h-4 text-[#F59E0B]" />
              <span className="hidden sm:inline">Menu</span>
            </button>
          )}

          {/* Logo Oficial SkillHub (Sem fundo branco) */}
          <button
            onClick={() => setCurrentView(isAuthenticated ? (role === 'RECRUTADOR' ? 'RECRUTADOR_RH' : 'DASHBOARD') : 'LOGIN')}
            className="flex items-center gap-2.5 text-left group transition-transform duration-150 hover:scale-[1.01]"
          >
            <div className="relative w-10 h-10 flex items-center justify-center filter drop-shadow-md">
              <img
                src="/logo.png"
                alt="SkillHub Logo"
                className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-white flex items-center">
                Skill<span className="text-[#FBBF24]">Hub</span>
              </h1>
              <p className="text-[10px] text-purple-200 font-medium hidden md:block">
                Curitiba & RMC
              </p>
            </div>
          </button>
        </div>

        {/* Links Rápidos Centrais */}
        {isAuthenticated && (
          <div className="hidden lg:flex items-center gap-1.5 bg-[#140726]/80 p-1 rounded-xl border border-[#521E8A]/40 text-xs font-bold">
            {role === 'RECRUTADOR' ? (
              <>
                <button
                  onClick={() => setCurrentView('RECRUTADOR_RH')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    currentView === 'RECRUTADOR_RH'
                      ? 'bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-[#1A0B2E] font-black'
                      : 'text-amber-300 hover:text-white'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Painel RH da Empresa</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setCurrentView('DASHBOARD')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    currentView === 'DASHBOARD'
                      ? 'bg-[#351859] text-white border border-[#7C3AED]/50'
                      : 'text-purple-200 hover:text-white'
                  }`}
                >
                  Meu Dashboard
                </button>

                <button
                  onClick={() => setCurrentView('CURSOS_DISPONIVEIS')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    currentView === 'CURSOS_DISPONIVEIS' || currentView === 'CURSOS'
                      ? 'bg-[#351859] text-white border border-[#7C3AED]/50'
                      : 'text-purple-200 hover:text-white'
                  }`}
                >
                  Cursos
                </button>

                <button
                  onClick={() => setCurrentView('TRILHAS_DISPONIVEIS')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    currentView === 'TRILHAS_DISPONIVEIS' || currentView === 'TRILHAS'
                      ? 'bg-[#351859] text-white border border-[#7C3AED]/50'
                      : 'text-purple-200 hover:text-white'
                  }`}
                >
                  Trilhas
                </button>

                <button
                  onClick={() => setCurrentView('MAPA_PROXIMIDADE')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    currentView === 'MAPA_PROXIMIDADE'
                      ? 'bg-[#351859] text-white border border-[#7C3AED]/50'
                      : 'text-purple-200 hover:text-white'
                  }`}
                >
                  Mapa de Vagas
                </button>

                <button
                  onClick={() => setCurrentView('HOLERITE')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    currentView === 'HOLERITE'
                      ? 'bg-[#351859] text-white border border-[#7C3AED]/50'
                      : 'text-purple-200 hover:text-white'
                  }`}
                >
                  Calculadora Salarial
                </button>
              </>
            )}
          </div>
        )}

        {/* Lado Direito: Perfil do Usuário / Login & Reset */}
        <div className="flex items-center gap-3">
          
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentView(role === 'RECRUTADOR' ? 'RECRUTADOR_RH' : 'DASHBOARD')}
                className="bg-[#1C0D33]/90 border border-[#5B2594]/60 px-3 py-1.5 rounded-xl flex items-center gap-2.5 shadow-md hover:border-[#8B5CF6]/70 transition-all text-left"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#6D28D9] to-[#9333EA] flex items-center justify-center text-white font-extrabold text-[10px] shadow-inner">
                  {currentUser?.avatarInitials || 'SH'}
                </div>
                <div className="hidden sm:block">
                  <div className="text-xs font-bold text-white leading-tight">
                    {currentUser?.nome || student.nome || 'Candidato(a)'}
                  </div>
                  <div className="text-[10px] text-purple-300">
                    {role === 'RECRUTADOR' 
                      ? '🏢 Empresa Parceira' 
                      : currentUser?.nome?.includes('Demonstração') 
                        ? '✨ Tour do App • Curitiba/PR' 
                        : `📍 ${student.endereco.bairro || 'Curitiba/PR'}`}
                  </div>
                </div>
              </button>

              <button
                onClick={logout}
                title="Encerrar Sessão"
                className="p-2 text-purple-300 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all border border-[#5B2594]/40"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setCurrentView('LOGIN')}
              className="flex items-center gap-1.5 bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#FBBF24] hover:to-[#F59E0B] text-[#1A0B2E] font-extrabold px-4 py-2 rounded-xl text-xs shadow-md transition-all transform hover:scale-105"
            >
              <User className="w-3.5 h-3.5 text-[#1A0B2E]" />
              <span>Entrar / Cadastrar</span>
            </button>
          )}

          {/* Botão de Alternar Tema Claro / Escuro */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Mudar para Tema Claro' : 'Mudar para Tema Escuro'}
            aria-label="Alternar tema de cores"
            className="flex items-center gap-1.5 p-2 px-2.5 rounded-xl text-xs font-bold transition-all border shadow-sm bg-[#1C0D33]/90 hover:bg-[#2F1352] text-amber-300 hover:text-amber-200 border-[#5B2594]/60 hover:border-amber-400/50"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                <span className="hidden md:inline text-[11px] text-amber-200 font-semibold">Claro</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-purple-300" />
                <span className="hidden md:inline text-[11px] text-purple-200 font-semibold">Escuro</span>
              </>
            )}
          </button>

          {isAuthenticated && (
            <button
              onClick={resetSimulator}
              title="Reiniciar dados de teste"
              className="p-2 text-purple-300 hover:text-white hover:bg-[#6D28D9]/30 rounded-xl transition-all border border-[#6D28D9]/40"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}

        </div>
      </div>
    </header>
  );
}
