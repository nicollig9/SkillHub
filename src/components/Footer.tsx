'use client';

import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Mail,
  Phone,
  Heart,
  ExternalLink,
  ShieldCheck,
  GraduationCap,
  Calculator,
  Compass,
  ArrowUpRight,
  Briefcase
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function Footer() {
  const { setCurrentView } = useApp();

  return (
    <footer className="w-full bg-[#0B0716] text-zinc-300 border-t border-neutral-800/80 mt-auto print:hidden">
      {/* Container Principal do Rodapé (4 Colunas no Desktop / 1 Coluna no Mobile) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          
          {/* ===================================================== */}
          {/* COLUNA 1: SOBRE O PROJETO                             */}
          {/* ===================================================== */}
          <div className="space-y-3.5">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center text-white font-black text-base shadow-md shadow-purple-900/40">
                S
              </div>
              <span className="text-lg font-black text-white tracking-tight group-hover:text-purple-300 transition-colors">
                Skill<span className="text-purple-400">Hub</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Plataforma inteligente de formação, capacitação e inserção profissional focada exclusivamente em <strong>Jovens Aprendizes</strong>, <strong>Estagiários</strong> e <strong>Primeiro Emprego</strong> em Curitiba &amp; Região Metropolitana.
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs text-zinc-400">
              <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Curitiba &amp; Região Metropolitana - PR</span>
            </div>

            <div className="text-[11px] text-zinc-400 pt-1">
              Conforme a Lei nº 10.097/00 (Aprendizagem) e Lei nº 11.788/08 (Estágio).
            </div>
          </div>

          {/* ===================================================== */}
          {/* COLUNA 2: NAVEGAÇÃO PRINCIPAL                         */}
          {/* ===================================================== */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-neutral-800 pb-1.5 flex items-center gap-1.5">
              <span>Navegação Rápida</span>
            </h3>

            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => setCurrentView('INICIO')}
                  className="text-zinc-400 hover:text-purple-300 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>• Início</span>
                </button>
              </li>
              <li>
                <Link
                  href="/vagas"
                  className="text-zinc-400 hover:text-purple-300 transition-colors flex items-center gap-1.5"
                >
                  <span>• Painel de Vagas</span>
                  <span className="text-[10px] bg-purple-950/80 text-purple-300 px-1.5 py-0.2 rounded border border-purple-500/30">
                    RMC
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/holerite"
                  className="text-zinc-400 hover:text-purple-300 transition-colors flex items-center gap-1.5"
                >
                  <span>• Calculadora de Holerite</span>
                  <span className="text-[10px] bg-emerald-950/80 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-500/30">
                    Didática
                  </span>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('DASHBOARD')}
                  className="text-zinc-400 hover:text-purple-300 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>• Dashboard do Aluno</span>
                </button>
              </li>
              <li>
                <Link
                  href="/curriculo"
                  className="text-zinc-400 hover:text-purple-300 transition-colors flex items-center gap-1.5"
                >
                  <span>• Gerador de Currículo</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('CURSOS_DISPONIVEIS')}
                  className="text-zinc-400 hover:text-purple-300 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>• Catálogo de Cursos &amp; Badges</span>
                </button>
              </li>
            </ul>
          </div>

          {/* ===================================================== */}
          {/* COLUNA 3: SERVIÇOS & POLOS                            */}
          {/* ===================================================== */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-neutral-800 pb-1.5">
              Serviços &amp; Curitiba
            </h3>

            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => setCurrentView('MAPA_PROXIMIDADE')}
                  className="text-zinc-400 hover:text-purple-300 transition-colors cursor-pointer"
                >
                  • Guia de Bairros (CIC, Centro, Batel...)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('HOLERITE')}
                  className="text-zinc-400 hover:text-purple-300 transition-colors cursor-pointer"
                >
                  • Simulador Salarial &amp; FGTS
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('TRILHAS_DISPONIVEIS')}
                  className="text-zinc-400 hover:text-purple-300 transition-colors cursor-pointer"
                >
                  • Trilhas de Entrada no Mercado
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('BADGES_PERFIL')}
                  className="text-zinc-400 hover:text-purple-300 transition-colors cursor-pointer"
                >
                  • Carteira de Microcertificações
                </button>
              </li>
              <li>
                <Link
                  href="/sobre"
                  className="text-zinc-400 hover:text-purple-300 transition-colors flex items-center gap-1"
                >
                  <span>• Proteção LGPD &amp; Termos</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                </Link>
              </li>
            </ul>
          </div>

          {/* ===================================================== */}
          {/* COLUNA 4: CONTATO & CANAIS                            */}
          {/* ===================================================== */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-neutral-800 pb-1.5">
              Canais de Atendimento
            </h3>

            <div className="space-y-2.5 text-xs sm:text-sm text-zinc-400">
              <a
                href="mailto:contato@skillhub.com.br"
                className="flex items-center gap-2 hover:text-purple-300 transition-colors"
              >
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <span>contato@skillhub.com.br</span>
              </a>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-purple-400 shrink-0" />
                <span>(41) 3350-8000 • Curitiba/PR</span>
              </div>

              <div className="pt-2">
                <span className="text-xs font-semibold text-zinc-300 block mb-2">Redes Oficiais:</span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-[#140E24] hover:bg-purple-950/80 border border-neutral-800 hover:border-purple-500/40 text-zinc-300 hover:text-white transition-all text-xs"
                    title="Instagram SkillHub"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-[#140E24] hover:bg-purple-950/80 border border-neutral-800 hover:border-purple-500/40 text-zinc-300 hover:text-white transition-all text-xs"
                    title="LinkedIn SkillHub"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/nicollig9/SkillHub"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-[#140E24] hover:bg-purple-950/80 border border-neutral-800 hover:border-purple-500/40 text-zinc-300 hover:text-white transition-all text-xs"
                    title="GitHub Projeto"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Linha Inferior com Copyright */}
      <div className="border-t border-neutral-800/80 bg-[#090513] py-4 px-4 sm:px-6 lg:px-8 text-center text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © 2026 SkillHub — Plataforma de Empregabilidade Jovem em Curitiba &amp; Região Metropolitana.
          </span>
          <span className="text-[11px] text-zinc-400 flex items-center gap-1">
            Desenvolvido com foco em impacto social, educação e mobilidade urbana.
          </span>
        </div>
      </div>
    </footer>
  );
}
