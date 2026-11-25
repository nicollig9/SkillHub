'use client';

import React from 'react';
import { 
  Sparkles, 
  Wallet, 
  Target, 
  PieChart, 
  ShieldCheck, 
  AlertTriangle, 
  Rocket 
} from 'lucide-react';

export default function OrcamentoMindMap() {
  return (
    <div className="w-full max-w-6xl mx-auto bg-slate-950/80 border border-slate-800 rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl text-left my-4">
      {/* =================================================================== */}
      {/* 1. LUZES DE FUNDO E EFEITO ATMOSFÉRICO (GRADIENTES SUTIS)           */}
      {/* =================================================================== */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* =================================================================== */}
      {/* 2. LINHAS DE CONEXÃO SVG (MODERNO / TECH / MINDMAP DESKTOP)        */}
      {/* =================================================================== */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none hidden md:block z-0" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="linePurple" x1="50%" y1="50%" x2="16%" y2="20%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="lineEmerald" x1="50%" y1="50%" x2="50%" y2="20%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="lineSky" x1="50%" y1="50%" x2="84%" y2="20%">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="lineIndigo" x1="50%" y1="50%" x2="16%" y2="80%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="lineAmber" x1="50%" y1="50%" x2="50%" y2="80%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="lineRose" x1="50%" y1="50%" x2="84%" y2="80%">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fb7185" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Linhas conectando o centro aos 6 cards */}
        <line x1="50%" y1="50%" x2="17%" y2="22%" stroke="url(#linePurple)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="50%" y1="50%" x2="50%" y2="22%" stroke="url(#lineEmerald)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="50%" y1="50%" x2="83%" y2="22%" stroke="url(#lineSky)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="50%" y1="50%" x2="17%" y2="78%" stroke="url(#lineIndigo)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="50%" y1="50%" x2="50%" y2="78%" stroke="url(#lineAmber)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="50%" y1="50%" x2="83%" y2="78%" stroke="url(#lineRose)" strokeWidth="1.5" strokeDasharray="4 4" />

        {/* Círculo suave de pulso central */}
        <circle cx="50%" cy="50%" r="130" stroke="#a855f7" strokeOpacity="0.08" strokeWidth="1" fill="none" />
        <circle cx="50%" cy="50%" r="200" stroke="#6366f1" strokeOpacity="0.05" strokeWidth="1" strokeDasharray="6 6" fill="none" />
      </svg>

      {/* =================================================================== */}
      {/* 3. GRADE NATIVA RESPONSIVA (3 COLUNAS)                             */}
      {/* =================================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10 items-stretch">
        
        {/* ----------------------------------------------------------------- */}
        {/* LINHA 1 (TOP)                                                     */}
        {/* ----------------------------------------------------------------- */}

        {/* 1. [Top Esquerda] "1. Entenda seu salário" */}
        <div className="order-2 md:order-1 bg-slate-900/90 border border-purple-500/40 hover:border-purple-400 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all duration-300 hover:shadow-purple-500/10 hover:shadow-xl group">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-purple-500/20">
              <span className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 font-bold text-xs flex items-center justify-center border border-purple-500/30 shrink-0 group-hover:scale-105 transition-transform">
                <Wallet className="w-3.5 h-3.5 text-purple-400" />
              </span>
              <h4 className="text-sm font-bold text-purple-200 tracking-tight">
                1. Entenda seu salário
              </h4>
            </div>
            <ul className="space-y-2 text-xs text-slate-300 leading-relaxed font-normal">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold mt-0.5">•</span>
                <span><strong className="text-white font-semibold">Salário bruto:</strong> valor total acordado no contrato.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold mt-0.5">•</span>
                <span><strong className="text-white font-semibold">Descontos:</strong> INSS, IR e outros (se houver).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold mt-0.5">•</span>
                <span><strong className="text-white font-semibold">Salário líquido:</strong> o que realmente cai na sua conta.</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-2">
            <span className="inline-block w-full text-center px-3 py-1.5 rounded-full text-[11px] font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30 shadow-sm">
              Saiba exatamente quanto você vai receber!
            </span>
          </div>
        </div>

        {/* 2. [Top Centro] "2. Defina suas prioridades" */}
        <div className="order-3 md:order-2 bg-slate-900/90 border border-emerald-500/40 hover:border-emerald-400 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all duration-300 hover:shadow-emerald-500/10 hover:shadow-xl group">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-emerald-500/20">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-xs flex items-center justify-center border border-emerald-500/30 shrink-0 group-hover:scale-105 transition-transform">
                <Target className="w-3.5 h-3.5 text-emerald-400" />
              </span>
              <h4 className="text-sm font-bold text-emerald-200 tracking-tight">
                2. Defina suas prioridades
              </h4>
            </div>
            <ul className="space-y-2 text-xs text-slate-300 leading-relaxed font-normal">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold mt-0.5">•</span>
                <span>Moradia (aluguel, contas, transporte)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold mt-0.5">•</span>
                <span>Alimentação</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold mt-0.5">•</span>
                <span>Estudos e desenvolvimento</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold mt-0.5">•</span>
                <span>Lazer &amp; Reserva de emergência</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-2">
            <span className="inline-block w-full text-center px-3 py-1.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm">
              Separe seu dinheiro em categorias!
            </span>
          </div>
        </div>

        {/* 3. [Top Direita] "3. Controle seus gastos" */}
        <div className="order-4 md:order-3 bg-slate-900/90 border border-sky-500/40 hover:border-sky-400 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all duration-300 hover:shadow-sky-500/10 hover:shadow-xl group">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-sky-500/20">
              <span className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-300 font-bold text-xs flex items-center justify-center border border-sky-500/30 shrink-0 group-hover:scale-105 transition-transform">
                <PieChart className="w-3.5 h-3.5 text-sky-400" />
              </span>
              <h4 className="text-sm font-bold text-sky-200 tracking-tight">
                3. Controle seus gastos
              </h4>
            </div>
            <ul className="space-y-2 text-xs text-slate-300 leading-relaxed font-normal">
              <li className="flex items-start gap-2">
                <span className="text-sky-400 font-bold mt-0.5">•</span>
                <span>Anote tudo, mesmo o que parece pequeno.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-400 font-bold mt-0.5">•</span>
                <span>Use aplicativos ou uma planilha.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-400 font-bold mt-0.5">•</span>
                <span>Evite compras por impulso.</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-2">
            <span className="inline-block w-full text-center px-3 py-1.5 rounded-full text-[11px] font-semibold bg-sky-500/15 text-sky-300 border border-sky-500/30 shadow-sm">
              O controle hoje é a liberdade amanhã!
            </span>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* LINHA 2 (MEIO): FRASE ESQ | CARD CENTRAL NO NÚCLEO | FRASE DIR    */}
        {/* ----------------------------------------------------------------- */}

        {/* Card Frase Esquerda */}
        <div className="order-8 md:order-4 border border-slate-700 bg-slate-900/60 text-slate-300 text-xs italic p-4 rounded-xl shadow-lg flex items-center justify-center text-center backdrop-blur-sm hover:border-slate-600 transition-all">
          <p className="leading-relaxed">
            "Disciplina no presente é tranquilidade no futuro! 🤍"
          </p>
        </div>

        {/* • CARD CENTRAL: "Orçamento do Primeiro Salário" */}
        <div className="order-1 md:order-5 bg-gradient-to-br from-purple-900/40 via-slate-900 to-indigo-900/40 border-2 border-purple-500/60 rounded-2xl p-6 text-center shadow-purple-500/10 shadow-2xl max-w-sm w-full mx-auto my-2 flex flex-col items-center justify-center space-y-3 group hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-indigo-500/10 to-purple-500/5 opacity-50 pointer-events-none" />
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-semibold border border-purple-500/30 shadow-sm relative z-10">
            <Sparkles className="w-3.5 h-3.5 text-purple-300 animate-pulse" />
            <span>Mapa Mental Oficial</span>
          </div>

          <h3 className="text-xl font-extrabold text-white tracking-tight leading-tight relative z-10">
            Orçamento do Primeiro Salário
          </h3>

          <span className="inline-block mt-1 px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-semibold border border-purple-500/30 relative z-10">
            Sonhe, planeje, conquiste!
          </span>
        </div>

        {/* Card Frase Direita */}
        <div className="order-9 md:order-6 border border-slate-700 bg-slate-900/60 text-slate-300 text-xs italic p-4 rounded-xl shadow-lg flex items-center justify-center text-center backdrop-blur-sm hover:border-slate-600 transition-all">
          <p className="leading-relaxed">
            "Você consegue! É só o começo! 🚀"
          </p>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* LINHA 3 (BAIXO): 4. RESERVA | 6. FUTURO | 5. DÍVIDAS              */}
        {/* ----------------------------------------------------------------- */}

        {/* 4. [Baixo Esquerda] "4. Crie uma reserva" */}
        <div className="order-5 md:order-7 bg-slate-900/90 border border-indigo-500/40 hover:border-indigo-400 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all duration-300 hover:shadow-indigo-500/10 hover:shadow-xl group">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-indigo-500/20">
              <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold text-xs flex items-center justify-center border border-indigo-500/30 shrink-0 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              </span>
              <h4 className="text-sm font-bold text-indigo-200 tracking-tight">
                4. Crie uma reserva
              </h4>
            </div>
            <ul className="space-y-2 text-xs text-slate-300 leading-relaxed font-normal">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold mt-0.5">•</span>
                <span>Guarde uma parte do seu salário, mesmo que seja pouco.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold mt-0.5">•</span>
                <span>Essa reserva te ajuda em imprevistos e dá mais segurança.</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-2">
            <span className="inline-block w-full text-center px-3 py-1.5 rounded-full text-[11px] font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 shadow-sm">
              Pequenos valores fazem grande diferença!
            </span>
          </div>
        </div>

        {/* 6. [Baixo Centro] "6. Pense no futuro" */}
        <div className="order-7 md:order-8 bg-slate-900/90 border border-amber-500/40 hover:border-amber-400 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all duration-300 hover:shadow-amber-500/10 hover:shadow-xl group">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-amber-500/20">
              <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center border border-amber-500/30 shrink-0 group-hover:scale-105 transition-transform">
                <Rocket className="w-3.5 h-3.5 text-amber-400" />
              </span>
              <h4 className="text-sm font-bold text-amber-200 tracking-tight">
                6. Pense no futuro
              </h4>
            </div>
            <ul className="space-y-2 text-xs text-slate-300 leading-relaxed font-normal">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold mt-0.5">•</span>
                <span>Invista, mesmo que seja pouco.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold mt-0.5">•</span>
                <span>Conheça opções como CDB, Tesouro Direto, fundos e etc.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold mt-0.5">•</span>
                <span>O seu primeiro salário pode ser o começo de grandes planos!</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-2">
            <span className="inline-block w-full text-center px-3 py-1.5 rounded-full text-[11px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm">
              Hoje é o início do seu futuro financeiro!
            </span>
          </div>
        </div>

        {/* 5. [Baixo Direita] "5. Evite dívidas" */}
        <div className="order-6 md:order-9 bg-slate-900/90 border border-rose-500/40 hover:border-rose-400 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all duration-300 hover:shadow-rose-500/10 hover:shadow-xl group">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-rose-500/20">
              <span className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-300 font-bold text-xs flex items-center justify-center border border-rose-500/30 shrink-0 group-hover:scale-105 transition-transform">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              </span>
              <h4 className="text-sm font-bold text-rose-200 tracking-tight">
                5. Evite dívidas
              </h4>
            </div>
            <ul className="space-y-2 text-xs text-slate-300 leading-relaxed font-normal">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold mt-0.5">•</span>
                <span>Fuja de juros altos (cartão de crédito, cheque especial).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold mt-0.5">•</span>
                <span>Pague suas contas em dia.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold mt-0.5">•</span>
                <span>Se precisar, planeje bem antes de parcelar.</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-2">
            <span className="inline-block w-full text-center px-3 py-1.5 rounded-full text-[11px] font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30 shadow-sm">
              Mais controle, menos estresse!
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
