'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function Footer() {
  const router = useRouter();
  const { setCurrentView } = useApp();
  const [showLegalModal, setShowLegalModal] = useState(false);

  const handleNav = (view: any, route?: string) => {
    setCurrentView(view);
    if (typeof window !== 'undefined' && window.location.pathname !== '/' && route) {
      router.push(route);
    } else if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      router.push('/');
    }
  };

  return (
    <footer className="w-full mt-auto py-6 px-4 sm:px-6 lg:px-8 print:hidden transition-colors duration-300">
      {/* Container delicado e flutuante */}
      <div className="max-w-7xl mx-auto bg-white/80 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/60 dark:border-purple-500/15 rounded-3xl shadow-sm py-6 px-8 transition-colors duration-300">
        
        {/* Linha principal: Esquerda (Identidade) e Direita (Links Essenciais) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* ESQUERDA: Identidade Simples */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center shrink-0">
                <img
                  src="/logo.png"
                  alt="SkillHub"
                  className="h-11 w-auto object-contain drop-shadow-sm"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              <span className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">
                Skill<span className="text-purple-600 dark:text-purple-400">Hub</span>
              </span>

              <span className="bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-500/20 text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-purple-100">
                Curitiba &amp; RMC
              </span>
            </div>

            <p className="text-slate-500 dark:text-slate-400 text-xs font-normal">
              Aceleração profissional e primeiro emprego para jovens da RMC.
            </p>
          </div>

          {/* DIREITA: Links Essenciais */}
          <nav aria-label="Links do Rodapé" className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
            <button
              onClick={() => handleNav('CURSOS_DISPONIVEIS')}
              className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors cursor-pointer"
            >
              Cursos
            </button>
            <span className="text-slate-300 dark:text-slate-700 select-none">•</span>

            <button
              onClick={() => handleNav('TRILHAS_DISPONIVEIS')}
              className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors cursor-pointer"
            >
              Trilhas
            </button>
            <span className="text-slate-300 dark:text-slate-700 select-none">•</span>

            <button
              onClick={() => handleNav('MAPA_PROXIMIDADE', '/vagas')}
              className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors cursor-pointer"
            >
              Mapa de Vagas
            </button>
            <span className="text-slate-300 dark:text-slate-700 select-none">•</span>

            <button
              onClick={() => handleNav('HOLERITE', '/holerite')}
              className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors cursor-pointer"
            >
              Calculadora Salarial
            </button>
            <span className="text-slate-300 dark:text-slate-700 select-none">•</span>

            <button
              onClick={() => setShowLegalModal(true)}
              className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors cursor-pointer"
            >
              Termos &amp; Privacidade
            </button>
          </nav>

        </div>

        {/* LINHA INFERIOR (DISCRETA) */}
        <div className="border-t border-slate-100 dark:border-slate-800/50 mt-5 pt-4">
          <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center font-normal">
            © 2026 SkillHub. Todos os direitos reservados.
          </p>
        </div>

      </div>

      {/* Modal Minimalista de Termos e Privacidade */}
      {showLegalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-purple-500/20 rounded-2xl p-6 shadow-xl relative text-slate-800 dark:text-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-purple-600" />
                <span>Termos de Uso &amp; Política de Privacidade</span>
              </h3>
              <button
                onClick={() => setShowLegalModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              <p>
                O <strong>SkillHub</strong> atua em estrita conformidade com a <strong>LGPD (Lei Federal nº 13.709/2018)</strong>, com a Lei da Aprendizagem (Lei nº 10.097/00) e a Lei do Estágio (Lei nº 11.788/08).
              </p>
              <p>
                Os dados cadastrados são utilizados exclusivamente para a intermediação segura entre jovens e empresas contratantes credenciadas em Curitiba e Região Metropolitana. Nenhuma taxa é cobrada dos candidatos.
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowLegalModal(false)}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium text-xs transition-colors cursor-pointer shadow-sm"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
