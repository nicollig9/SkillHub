'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  HelpCircle,
  FileText,
  Lock,
  X
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function Footer() {
  const router = useRouter();
  const { setCurrentView, isAuthenticated } = useApp();
  const [activeModal, setActiveModal] = useState<'FAQ' | 'TERMOS' | 'LGPD' | null>(null);

  const handleNav = (view: any) => {
    setCurrentView(view);
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      router.push('/');
    }
  };

  return (
    <footer className="w-full mt-auto py-8 px-4 sm:px-6 lg:px-8 print:hidden transition-colors duration-300">
      {/* Container elegante flutuante com bordas suaves e cantos arredondados */}
      <div className="max-w-7xl mx-auto bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-purple-500/20 rounded-2xl shadow-sm py-8 px-6 sm:px-8 transition-colors duration-300">
        
        {/* Layout em 2 Colunas: Marca (40%) + Navegação Organizada (60%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ===================================================== */}
          {/* COLUNA DA ESQUERDA (IDENTIDADE VISUAL - 40% / 5 cols) */}
          {/* ===================================================== */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Logo & Nome */}
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
                  <img
                    src="/assets/icons/favicon-skillhub.svg"
                    alt="SkillHub"
                    className="w-7 h-7 object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                      const fallback = (e.target as HTMLElement).parentElement?.querySelector('.fallback-footer-logo');
                      if (fallback) fallback.classList.remove('hidden');
                    }}
                  />
                  <div className="fallback-footer-logo hidden w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center text-white font-black text-sm">
                    S
                  </div>
                </div>

                <span className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Skill<span className="text-purple-600 dark:text-purple-400">Hub</span>
                </span>
              </div>

              {/* Badge Local */}
              <span className="inline-flex items-center bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-purple-200 dark:border-purple-500/30">
                Curitiba &amp; RMC
              </span>
            </div>

            {/* Descrição Curta */}
            <p className="text-slate-600 dark:text-zinc-400 text-sm mt-2 max-w-sm leading-relaxed font-medium">
              Capacitando jovens aprendizes e estagiários para o primeiro emprego no mercado local.
            </p>
          </div>

          {/* ===================================================== */}
          {/* COLUNA DA DIREITA (LINKS ÚTEIS - 60% / 7 cols)        */}
          {/* ===================================================== */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Subcoluna 1: Plataforma */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mb-3">
                Plataforma
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <button
                    onClick={() => handleNav(isAuthenticated ? 'DASHBOARD' : 'LOGIN')}
                    className="text-slate-600 hover:text-purple-600 dark:text-zinc-400 dark:hover:text-purple-300 text-sm font-medium transition-colors duration-200 cursor-pointer text-left"
                  >
                    Meu Dashboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNav('CURSOS_DISPONIVEIS')}
                    className="text-slate-600 hover:text-purple-600 dark:text-zinc-400 dark:hover:text-purple-300 text-sm font-medium transition-colors duration-200 cursor-pointer text-left"
                  >
                    Cursos
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNav('TRILHAS_DISPONIVEIS')}
                    className="text-slate-600 hover:text-purple-600 dark:text-zinc-400 dark:hover:text-purple-300 text-sm font-medium transition-colors duration-200 cursor-pointer text-left"
                  >
                    Trilhas
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNav('MAPA_PROXIMIDADE')}
                    className="text-slate-600 hover:text-purple-600 dark:text-zinc-400 dark:hover:text-purple-300 text-sm font-medium transition-colors duration-200 cursor-pointer text-left"
                  >
                    Mapa de Vagas
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNav('HOLERITE')}
                    className="text-slate-600 hover:text-purple-600 dark:text-zinc-400 dark:hover:text-purple-300 text-sm font-medium transition-colors duration-200 cursor-pointer text-left"
                  >
                    Calculadora Salarial
                  </button>
                </li>
              </ul>
            </div>

            {/* Subcoluna 2: Suporte & Legal */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mb-3">
                Suporte &amp; Legal
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <button
                    onClick={() => setActiveModal('FAQ')}
                    className="text-slate-600 hover:text-purple-600 dark:text-zinc-400 dark:hover:text-purple-300 text-sm font-medium transition-colors duration-200 cursor-pointer text-left"
                  >
                    Dúvidas Frequentes
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('TERMOS')}
                    className="text-slate-600 hover:text-purple-600 dark:text-zinc-400 dark:hover:text-purple-300 text-sm font-medium transition-colors duration-200 cursor-pointer text-left"
                  >
                    Termos de Uso
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('LGPD')}
                    className="text-slate-600 hover:text-purple-600 dark:text-zinc-400 dark:hover:text-purple-300 text-sm font-medium transition-colors duration-200 cursor-pointer text-left"
                  >
                    Privacidade / LGPD
                  </button>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* ===================================================== */}
        {/* LINHA INFERIOR (COPYRIGHT E CRÉDITOS)                  */}
        {/* ===================================================== */}
        <div className="border-t border-slate-100 dark:border-slate-800 my-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-zinc-500 font-medium">
          <span>© 2026 SkillHub. Todos os direitos reservados.</span>
          <span>Desenvolvido para jovens em Curitiba e Região Metropolitana</span>
        </div>

      </div>

      {/* MODAL DIDÁTICO DE DÚVIDAS / TERMOS / LGPD */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-purple-500/30 rounded-2xl p-6 shadow-2xl relative text-slate-900 dark:text-zinc-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-300 flex items-center justify-center font-bold text-sm">
                  {activeModal === 'FAQ' && <HelpCircle className="w-4 h-4" />}
                  {activeModal === 'TERMOS' && <FileText className="w-4 h-4" />}
                  {activeModal === 'LGPD' && <Lock className="w-4 h-4 text-emerald-500" />}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {activeModal === 'FAQ' && 'Dúvidas Frequentes (FAQ)'}
                  {activeModal === 'TERMOS' && 'Termos de Uso da Plataforma'}
                  {activeModal === 'LGPD' && 'Privacidade & Proteção de Dados (LGPD)'}
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-400 transition-colors cursor-pointer"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed space-y-3 max-h-[60vh] overflow-y-auto pr-2 font-medium">
              {activeModal === 'FAQ' && (
                <>
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white">Como me inscrevo nas vagas?</h5>
                    <p>Basta acessar a aba de Vagas ou o Mapa de Proximidade, selecionar a oportunidade desejada e clicar em "Candidatar-se". Seus dados do perfil serão enviados diretamente ao RH parceiro.</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white">Os cursos e certificados são gratuitos?</h5>
                    <p>Sim! Todos os cursos e trilhas oferecidos pelo SkillHub são 100% gratuitos para estudantes de Curitiba e RMC com emissão de microcertificações e badges.</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white">O SkillHub atende apenas Curitiba?</h5>
                    <p>Nosso foco principal é a Região Metropolitana de Curitiba (RMC), conectando candidatos às linhas de transporte e bairros locais como CIC, Centro, Boqueirão, Pinhais e São José dos Pinhais.</p>
                  </div>
                </>
              )}

              {activeModal === 'TERMOS' && (
                <>
                  <p>
                    O <strong>SkillHub</strong> é um serviço de intermediação de aprendizagem e primeiro emprego regulamentado pelas Leis nº 10.097/00 (Lei da Aprendizagem) e nº 11.788/08 (Lei do Estágio).
                  </p>
                  <p>
                    É estritamente proibida qualquer cobrança de taxas de seleção ou inscrição aos candidatos. As empresas parceiras passam por verificação de CNPJ ativo antes de anunciar qualquer vaga.
                  </p>
                </>
              )}

              {activeModal === 'LGPD' && (
                <>
                  <p>
                    Em estrita conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), seus dados pessoais, endereço e contato são mantidos sob sigilo e apenas compartilhados com empresas e recrutadores mediante o seu consentimento expresso ao se candidatar.
                  </p>
                  <p>
                    Para menores de 18 anos, aplicam-se as salvaguardas adicionais do Estatuto da Criança e do Adolescente (ECA) e proteção especial aos dados sensíveis do estudante.
                  </p>
                </>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors cursor-pointer shadow-sm"
              >
                Entendi e Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
