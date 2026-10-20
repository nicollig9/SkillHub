'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { TRACKS, COURSES } from '@/data/coursesData';
import { Track, CandidateProfileType } from '@/types';
import { 
  GraduationCap, 
  Clock, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  Play,
  MapPin,
  Search,
  Target,
  Layers,
  Compass,
  Check
} from 'lucide-react';

export default function TracksView() {
  const { openCourse, candidateProfileType, completedModules, quizResults, student } = useApp();

  // Cards recolhidos por padrão (accordion)
  const [expandedTrackId, setExpandedTrackId] = useState<string | null>(null);
  const [selectedAudience, setSelectedAudience] = useState<CandidateProfileType | 'TODOS'>('TODOS');
  const [selectedLevel, setSelectedLevel] = useState<string>('TODOS');
  const [searchQuery, setSearchQuery] = useState('');

  // Sincronizar com o perfil do candidato ativo
  React.useEffect(() => {
    if (candidateProfileType) {
      setSelectedAudience(candidateProfileType);
    }
  }, [candidateProfileType]);

  const toggleExpand = (trackId: string) => {
    setExpandedTrackId(expandedTrackId === trackId ? null : trackId);
  };

  // Verificação de conclusão de curso
  const isCourseCompleted = (courseId: string) => {
    if (quizResults[courseId]?.passed) return true;
    if (student?.badgesEarned?.some((b) => b.badgeId === courseId)) return true;
    const course = COURSES.find((c) => c.id === courseId);
    if (course && completedModules[courseId] && completedModules[courseId].length >= course.modules.length) {
      return true;
    }
    return false;
  };

  // Cálculo de progresso de cada trilha
  const getTrackProgress = (track: Track) => {
    const total = track.steps ? track.steps.length : track.coursesCount;
    if (total === 0) return { completed: 0, total: 0, percentage: 0 };

    const stepCourseIds = track.steps ? track.steps.map((s) => s.courseId) : track.courseIds;
    const completed = stepCourseIds.filter((id) => isCourseCompleted(id)).length;
    const percentage = Math.round((completed / total) * 100);
    return { completed, total, percentage };
  };

  // Estilos de badge por nível
  const getLevelBadge = (level?: string) => {
    switch (level) {
      case 'Iniciante':
        return {
          label: '🟢 Nível 1: Iniciante',
          class: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
        };
      case 'Intermediário':
        return {
          label: '🟡 Nível 2: Intermediário',
          class: 'bg-amber-950/60 text-amber-300 border-amber-500/30'
        };
      case 'Avançado':
        return {
          label: '🔴 Nível 3: Avançado',
          class: 'bg-rose-950/60 text-rose-300 border-rose-500/30'
        };
      default:
        return {
          label: 'Formação Oficial',
          class: 'bg-purple-950/60 text-purple-300 border-purple-500/30'
        };
    }
  };

  // Filtragem de trilhas
  const filteredTracks = TRACKS.filter((track) => {
    // Filtro por perfil
    const matchesAudience = 
      selectedAudience === 'TODOS' ||
      track.targetAudienceType === 'TODOS' ||
      (Array.isArray(track.targetAudienceType) && track.targetAudienceType.includes(selectedAudience));

    // Filtro por nível
    const matchesLevel = 
      selectedLevel === 'TODOS' || track.level === selectedLevel;

    // Filtro por busca de texto
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      !q ||
      track.name.toLowerCase().includes(q) ||
      track.description.toLowerCase().includes(q) ||
      track.badgeReward.toLowerCase().includes(q) ||
      (track.steps && track.steps.some((s) => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)));

    return matchesAudience && matchesLevel && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-6xl w-full mx-auto pb-16">
      
      {/* ===================================================== */}
      {/* 1. HERO BANNER PRINCIPAL: CONCEITO & EDUCAÇÃO         */}
      {/* ===================================================== */}
      <div className="w-full bg-white dark:bg-[#110E1B] border border-slate-200 dark:border-[#2D1B4E]/60 rounded-3xl p-6 lg:p-8 shadow-sm dark:shadow-2xl relative overflow-hidden space-y-6">
        
        {/* Cabeçalho do Banner */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10 pb-6 border-b border-[#2D1B4E]/60">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-slate-200 dark:bg-[#171126] border border-slate-300 dark:border-purple-500/30 px-3 py-1 rounded-full text-xs font-semibold text-slate-800 dark:text-zinc-300">
                <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                <span>Selos Oficiais de Especialista</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-slate-200 dark:bg-[#171126] border border-slate-300 dark:border-purple-500/30 px-3 py-1 rounded-full text-xs font-semibold text-slate-800 dark:text-zinc-300">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>Focado em Curitiba &amp; RMC</span>
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Trilhas de Formação Profissional
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
              Jornadas guiadas passo a passo que conectam múltiplos cursos em uma sequência lógica para você conquistar Selos de Especialista e se destacar no mercado.
            </p>
          </div>

          {/* Card Dinâmico de Métricas */}
          <div className="bg-slate-50 dark:bg-[#171126] border border-slate-300 dark:border-[#2D1B4E] rounded-2xl p-4 sm:p-5 text-center shrink-0 shadow-lg min-w-[190px] flex flex-col items-center justify-center">
            <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {filteredTracks.length}
            </div>
            <div className="text-xs text-zinc-400 font-medium mt-1">
              Trilhas Disponíveis
            </div>
          </div>
        </div>

        {/* Card Informativo/Educativo: Diferença entre Cursos e Trilhas (2 Colunas) */}
        <div className="relative z-10 pt-1">
          <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
            <Compass className="w-4 h-4 text-purple-400" />
            <span>Entenda a Estrutura de Aprendizagem</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Coluna 1: O que são Cursos? */}
            <div className="bg-slate-50 dark:bg-[#171126] border border-slate-300 dark:border-[#2D1B4E] hover:border-purple-500/30 rounded-2xl p-5 space-y-2.5 transition-all">
              <div className="flex items-center gap-2.5 text-white font-bold text-sm">
                <div className="w-8 h-8 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span>O que são Cursos?</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
                Módulos individuais e focados. Ideal para quem quer aprender uma habilidade específica de forma rápida (ex: aprender apenas Excel ou apenas LGPD).
              </p>
              <div className="text-[11px] text-zinc-400 pt-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                <span>Objetivo pontual e certificação modular por disciplina.</span>
              </div>
            </div>

            {/* Coluna 2: O que são Trilhas? */}
            <div className="bg-[#171126] border border-amber-500/20 hover:border-amber-500/40 rounded-2xl p-5 space-y-2.5 transition-all">
              <div className="flex items-center gap-2.5 text-white font-bold text-sm">
                <div className="w-8 h-8 rounded-xl bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-300 shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <span>O que são Trilhas?</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
                Pacotes completos organizados em etapas sequenciais (Etapa 1 ➔ Etapa 2 ➔ Etapa 3). Ao concluir todos os cursos da trilha, você ganha um Selo Oficial de Especialista para o seu currículo.
              </p>
              <div className="text-[11px] text-amber-300/80 pt-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Formação integrada com selo master reconhecido por empresas.</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ===================================================== */}
      {/* 2. BARRA DE FILTROS & PESQUISA                        */}
      {/* ===================================================== */}
      <div className="w-full bg-white dark:bg-[#140E24] border border-slate-300 dark:border-[#2D1B4E]/60 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        
        {/* Linha 1: Input de Busca + Filtro por Público */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          <div className="md:col-span-7 relative">
            <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar por formação, selo, etapa ou palavra-chave..."
              className="w-full bg-white dark:bg-[#0D0818] border border-slate-300 dark:border-[#2D1B4E] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-zinc-500 font-semibold focus:outline-none focus:border-purple-600"
            />
          </div>

          <div className="md:col-span-5 flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800 dark:text-zinc-400 shrink-0">Para quem:</span>
            <select
              value={selectedAudience}
              onChange={(e) => setSelectedAudience(e.target.value as any)}
              className="w-full bg-white dark:bg-[#0D0818] border border-slate-300 dark:border-[#2D1B4E] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-purple-600"
            >
              <option value="TODOS">Todos os Públicos</option>
              <option value="JOVEM_APRENDIZ">🛡️ Jovem Aprendiz</option>
              <option value="ESTAGIARIO">💼 Estagiário</option>
              <option value="PRIMEIRO_EMPREGO">🚀 Primeiro Emprego</option>
              <option value="ESTUDANTE">🎒 Estudante</option>
            </select>
          </div>

        </div>

        {/* Linha 2: Filtro Rápido por Nível */}
        <div className="flex flex-wrap items-center justify-start sm:justify-center gap-2 pt-2 border-t border-slate-300 dark:border-[#2D1B4E]/40 text-xs">
          <span className="text-zinc-400 font-bold shrink-0 flex items-center gap-1.5 mr-1">
            <Target className="w-3.5 h-3.5 text-amber-400" />
            Níveis:
          </span>
          <button
            onClick={() => setSelectedLevel('TODOS')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              selectedLevel === 'TODOS'
                ? 'bg-purple-700 text-white font-black shadow'
                : 'bg-slate-200 text-slate-800 hover:text-black hover:bg-slate-300 font-bold border border-slate-300 dark:bg-[#0D0818] dark:text-zinc-400 dark:hover:text-white dark:border-[#2D1B4E]'
            }`}
          >
            Todas as Trilhas ({TRACKS.length})
          </button>
          
          {[
            { id: 'Iniciante', label: '🟢 Iniciante' },
            { id: 'Intermediário', label: '🟡 Intermediário' },
            { id: 'Avançado', label: '🔴 Avançado' }
          ].map((lvl) => {
            const count = TRACKS.filter((t) => t.level === lvl.id).length;
            return (
              <button
                key={lvl.id}
                onClick={() => setSelectedLevel(selectedLevel === lvl.id ? 'TODOS' : lvl.id)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                  selectedLevel === lvl.id
                    ? 'bg-purple-700 text-white font-black shadow ring-2 ring-purple-600/50'
                    : 'bg-slate-200 text-slate-800 hover:text-black hover:bg-slate-300 font-bold border border-slate-300 dark:bg-[#0D0818] dark:text-zinc-400 dark:hover:text-white dark:border-[#2D1B4E]'
                }`}
              >
                <span>{lvl.label}</span>
                <span className="text-[10px] opacity-75">({count})</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* ===================================================== */}
      {/* 3. LISTAGEM DE TRILHAS (ACCORDION RECOLHIDO PADRÃO)   */}
      {/* ===================================================== */}
      <div className="space-y-4">
        {filteredTracks.length === 0 ? (
          <div className="text-center py-12 bg-[#140E24] rounded-2xl border border-[#2D1B4E] p-6 space-y-2">
            <p className="text-base font-bold text-white">Nenhuma trilha encontrada</p>
            <p className="text-xs text-zinc-400">Tente ajustar seus termos de pesquisa ou filtros selecionados.</p>
          </div>
        ) : (
          filteredTracks.map((track) => {
            const isExpanded = expandedTrackId === track.id;
            const levelInfo = getLevelBadge(track.level);
            const { completed, total, percentage } = getTrackProgress(track);
            const steps = track.steps || [];

            return (
              <div
                key={track.id}
                className={`bg-white dark:bg-[#140E24] border border-slate-300 dark:border-[#2D1B4E]/60 rounded-3xl p-5 sm:p-6 shadow-sm dark:shadow-xl transition-all duration-200 ${
                  isExpanded 
                    ? 'border-[#8B5CF6]/70 shadow-purple-950/40 ring-1 ring-[#8B5CF6]/30' 
                    : 'border-[#2D1B4E]/60 hover:border-purple-500/40'
                }`}
              >
                {/* TOPO DO CARD: Visualização Recolhida (Accordion Header) */}
                <div
                  onClick={() => toggleExpand(track.id)}
                  className="cursor-pointer select-none space-y-4"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleExpand(track.id);
                    }
                  }}
                >
                  {/* Linha Superior: Badges de Nível, Categoria, Horas e Cursos */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md border ${levelInfo.class}`}>
                        {levelInfo.label}
                      </span>
                      <span className="text-[10px] font-bold bg-slate-200 text-slate-900 border border-slate-300 dark:bg-[#1F1535] dark:text-zinc-300 dark:border-[#2D1B4E] px-2.5 py-0.5 rounded-md">
                        {track.category}
                      </span>
                      <span className="text-xs font-semibold text-zinc-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{track.hoursTotal}h Totais</span>
                      </span>
                      <span className="text-xs font-semibold text-zinc-400 flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                        <span>{track.coursesCount} Cursos</span>
                      </span>
                    </div>

                    {/* Destaque para o Selo Final no Header */}
                    <div className="inline-flex items-center gap-1.5 bg-[#1F1535] border border-amber-500/30 px-3 py-1 rounded-xl text-xs font-bold text-amber-300">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      <span>Selo: {track.badgeReward}</span>
                    </div>
                  </div>

                  {/* Linha Central: Título e Descrição da Trilha */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1.5 max-w-3xl">
                      <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">
                        {track.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed font-medium">
                        {track.description}
                      </p>
                    </div>

                    {/* Botão de Expansão / Toggle */}
                    <div className="shrink-0 flex items-center gap-2 self-start md:self-center">
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                          isExpanded 
                            ? 'bg-[#2D164E] text-white border-purple-500/50 shadow' 
                            : 'bg-[#171126] text-zinc-300 border-[#2D1B4E] hover:border-purple-500/30'
                        }`}
                      >
                        <span>{isExpanded ? 'Recolher Trilha' : 'Ver Etapas da Trilha'}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-purple-300 transition-transform" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-purple-300 transition-transform" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Linha Inferior: Barra de Progresso Visual Simples */}
                  <div className="pt-2 border-t border-slate-300 dark:border-[#2D1B4E]/40 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-zinc-400">
                      <span className="font-medium">
                        {completed} de {total} {total === 1 ? 'Curso concluído' : 'Cursos concluídos'}
                      </span>
                      <span className="font-bold text-zinc-300">
                        {percentage}% concluído
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[#0D0818] rounded-full overflow-hidden border border-[#2D1B4E]/60">
                      <div
                        className="h-full bg-gradient-to-r from-[#6D28D9] via-[#8B5CF6] to-emerald-400 transition-all duration-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* ===================================================== */}
                {/* CONTEÚDO EXPANDIDO: LINHA DO TEMPO / ETAPAS           */}
                {/* ===================================================== */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-slate-300 dark:border-[#2D1B4E]/60 space-y-6">
                    
                    {/* Cabeçalho da Linha do Tempo */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                        <Layers className="w-4 h-4 text-purple-400" />
                        <span>Sequência Pedagógica da Trilha ({steps.length} Etapas)</span>
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        Conclua cada etapa em ordem para absorver o conhecimento estruturado.
                      </div>
                    </div>

                    {/* Fluxo Visual Sequencial (Etapa 1 ➔ Etapa 2 ➔ Etapa 3) */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
                      {steps.map((s, i) => (
                        <React.Fragment key={s.stepNumber}>
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#100A1D] border border-[#2D1B4E] text-xs shrink-0">
                            <span className="font-extrabold text-purple-300">Etapa #{s.stepNumber}</span>
                            <span className="text-zinc-300 font-medium truncate max-w-[180px]">{s.title}</span>
                          </div>
                          {i < steps.length - 1 && (
                            <span className="text-purple-400/80 font-black text-sm shrink-0 px-0.5">➔</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Timeline de Etapas */}
                    <div className="space-y-4">
                      {steps.map((step, idx) => {
                        const stepCompleted = isCourseCompleted(step.courseId);
                        const isLast = idx === steps.length - 1;

                        return (
                          <div key={step.stepNumber} className="relative">
                            
                            {/* Card da Etapa */}
                            <div className="bg-slate-50 dark:bg-[#100A1D] border border-slate-300 dark:border-[#2D1B4E] hover:border-purple-500/40 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all">
                              
                              <div className="flex items-start gap-3.5">
                                {/* Indicador Visual do Passo */}
                                <div className="shrink-0 mt-0.5">
                                  {stepCompleted ? (
                                    <div className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow">
                                      <Check className="w-4 h-4 stroke-[3]" />
                                    </div>
                                  ) : (
                                    <div className="w-8 h-8 rounded-xl bg-[#1F1535] border border-[#2D1B4E] flex items-center justify-center text-xs font-bold text-zinc-300">
                                      #{step.stepNumber}
                                    </div>
                                  )}
                                </div>

                                {/* Textos da Etapa */}
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-[11px] font-bold text-purple-300">
                                      Etapa #{step.stepNumber}
                                    </span>
                                    <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                                      <Clock className="w-3 h-3 text-zinc-400" />
                                      <span>{step.hours}h</span>
                                    </span>
                                    {stepCompleted ? (
                                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                                        <CheckCircle2 className="w-3 h-3" />
                                        <span>Etapa Concluída</span>
                                      </span>
                                    ) : (
                                      <span className="text-[10px] font-medium text-zinc-400 bg-[#171126] border border-[#2D1B4E] px-2 py-0.5 rounded-md">
                                        Etapa Disponível
                                      </span>
                                    )}
                                  </div>

                                  <h3 className="text-sm font-bold text-white">
                                    {step.title}
                                  </h3>

                                  {step.subtitle && (
                                    <p className="text-xs text-zinc-400 font-medium">
                                      {step.subtitle}
                                    </p>
                                  )}

                                  <p className="text-xs text-zinc-300/90 leading-relaxed pt-0.5">
                                    {step.description}
                                  </p>
                                </div>
                              </div>

                              {/* Ação da Etapa */}
                              <div className="shrink-0 flex items-center gap-2 self-end md:self-center">
                                <button
                                  type="button"
                                  onClick={() => openCourse(step.courseId)}
                                  className="flex items-center gap-2 bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] hover:from-[#7C3AED] hover:to-[#9D4EDD] text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-all transform hover:scale-[1.02]"
                                >
                                  <Play className="w-3 h-3 fill-current text-amber-300" />
                                  <span>{stepCompleted ? 'Revisar Conteúdo' : 'Iniciar Etapa'}</span>
                                </button>
                              </div>

                            </div>

                            {/* Conector Visual entre Etapas */}
                            {!isLast && (
                              <div className="flex justify-center my-1.5">
                                <div className="text-[11px] text-purple-400/60 font-bold flex items-center gap-1">
                                  <span>↓</span>
                                </div>
                              </div>
                            )}

                          </div>
                        );
                      })}
                    </div>

                    {/* Box de Selo Final e Premiação Oficial */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#171126] border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-amber-950/60 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                          <Award className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">
                            Selo Oficial de Especialista
                          </div>
                          <div className="text-xs text-amber-300 font-bold">
                            {track.badgeReward}
                          </div>
                          <div className="text-[11px] text-zinc-400 mt-0.5">
                            Conclua todas as {steps.length} etapas desta trilha para emitir o selo e enriquecer seu currículo no SkillHub.
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const firstUnfinished = steps.find((s) => !isCourseCompleted(s.courseId)) || steps[0];
                          if (firstUnfinished) {
                            openCourse(firstUnfinished.courseId);
                          }
                        }}
                        className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 bg-[#2D164E] hover:bg-[#3D1E68] border border-purple-500/40 text-purple-200 hover:text-white font-bold px-4 py-2 rounded-xl text-xs transition-all"
                      >
                        <span>Começar Trilha Agora</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
