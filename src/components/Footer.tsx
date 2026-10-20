'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  GraduationCap,
  Calculator,
  Compass,
  Briefcase,
  HelpCircle,
  FileText,
  Lock,
  X,
  ExternalLink
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function Footer() {
  const { setCurrentView } = useApp();
  const [activeModal, setActiveModal] = useState<'FAQ' | 'TERMOS' | 'LGPD' | null>(null);

  return (
    <footer className="w-full bg-white dark:bg-slate-950 text-slate-800 dark:text-zinc-300 border-t border-slate-300 dark:border-purple-500/20 transition-colors duration-300 mt-auto print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* ===================================================== */}
          {/* COLUNA DA ESQUERDA: IDENTIDADE DA MARCA               */}
          {/* ===================================================== */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-purple-900/30">
                S
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                    Skill<span className="text-purple-600 dark:text-purple-400">Hub</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-900 border border-slate-300 dark:bg-purple-950/80 dark:text-purple-300">
                    Curitiba &amp; RMC
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-700 dark:text-zinc-400 font-medium leading-relaxed max-w-md">
              Capacitando jovens aprendizes e estagiários para o primeiro emprego no mercado local.
            </p>

            <div className="pt-2 border-t border-gray-200 dark:border-zinc-800/80 text-xs text-slate-700 dark:text-zinc-500 font-medium space-y-1">
              <div>
                © 2026 SkillHub — Plataforma de Empregabilidade Jovem em Curitiba &amp; Região Metropolitana.
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-700 dark:text-zinc-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Dados protegidos nos termos da LGPD (Lei Federal nº 13.709/18).</span>
              </div>
            </div>
          </div>

          {/* ===================================================== */}
          {/* COLUNA DA DIREITA: NAVEGAÇÃO RÁPIDA E LINKS ÚTEIS     */}
          {/* ===================================================== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Bloco 1: Plataforma */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-zinc-200 flex items-center gap-1.5 pb-1 border-b border-gray-200 dark:border-zinc-800">
                <GraduationCap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Plataforma</span>
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => setCurrentView('CURSOS_DISPONIVEIS')}
                    className="text-slate-800 dark:text-zinc-400 hover:text-purple-700 dark:hover:text-purple-300 font-bold transition-colors cursor-pointer flex items-center gap-1.5 text-left"
                  >
                    <span>Cursos</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentView('TRILHAS_DISPONIVEIS')}
                    className="text-slate-800 dark:text-zinc-400 hover:text-purple-700 dark:hover:text-purple-300 font-bold transition-colors cursor-pointer flex items-center gap-1.5 text-left"
                  >
                    <span>Trilhas de Formação</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentView('MAPA_PROXIMIDADE')}
                    className="text-slate-800 dark:text-zinc-400 hover:text-purple-700 dark:hover:text-purple-300 font-bold transition-colors cursor-pointer flex items-center gap-1.5 text-left"
                  >
                    <span>Mapa de Vagas</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentView('HOLERITE')}
                    className="text-slate-800 dark:text-zinc-400 hover:text-purple-700 dark:hover:text-purple-300 font-bold transition-colors cursor-pointer flex items-center gap-1.5 text-left"
                  >
                    <span>Calculadora Salarial</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Bloco 2: Suporte & Legal */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-zinc-200 flex items-center gap-1.5 pb-1 border-b border-gray-200 dark:border-zinc-800">
                <ShieldCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Suporte</span>
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => setActiveModal('FAQ')}
                    className="text-slate-800 dark:text-zinc-400 hover:text-purple-700 dark:hover:text-purple-300 font-bold transition-colors cursor-pointer flex items-center gap-1.5 text-left"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Dúvidas Frequentes</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('TERMOS')}
                    className="text-slate-800 dark:text-zinc-400 hover:text-purple-700 dark:hover:text-purple-300 font-bold transition-colors cursor-pointer flex items-center gap-1.5 text-left"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Termos de Uso</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('LGPD')}
                    className="text-slate-800 dark:text-zinc-400 hover:text-purple-700 dark:hover:text-purple-300 font-bold transition-colors cursor-pointer flex items-center gap-1.5 text-left"
                  >
                    <Lock className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Privacidade / LGPD</span>
                  </button>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>

      {/* MODAL DIDÁTICO DE DÚVIDAS / TERMOS / LGPD */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-gray-200 dark:border-purple-500/30 rounded-2xl p-6 shadow-2xl relative text-slate-900 dark:text-zinc-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-zinc-800">
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
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-400 font-medium transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed space-y-3 max-h-[60vh] overflow-y-auto pr-2">
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
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors cursor-pointer"
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
