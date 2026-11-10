'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { COURSES } from '@/data/coursesData';
import { 
  BookOpen, 
  Play, 
  CheckCircle2, 
  Clock, 
  Award, 
  ArrowRight,
  Sparkles,
  Search,
  X,
  Target,
  GraduationCap,
  Layers,
  Compass
} from 'lucide-react';

export default function MyCoursesView() {
  const { openCourse, setCurrentView, cursosInscritos } = useApp();

  const [filterTab, setFilterTab] = useState<'ANDAMENTO' | 'CONCLUIDOS' | 'TODOS'>('ANDAMENTO');
  const [searchQuery, setSearchQuery] = useState('');

  // Listagens por status
  const andamentoList = useMemo(() => {
    return cursosInscritos.filter((c) => c.status === 'em_andamento');
  }, [cursosInscritos]);

  const concluidosList = useMemo(() => {
    return cursosInscritos.filter((c) => c.status === 'concluido');
  }, [cursosInscritos]);

  // Filtragem combinada por aba e busca
  const filtered = useMemo(() => {
    return cursosInscritos.filter((c) => {
      // Filtro de aba
      if (filterTab === 'ANDAMENTO' && c.status !== 'em_andamento') return false;
      if (filterTab === 'CONCLUIDOS' && c.status !== 'concluido') return false;

      // Filtro de busca por nome ou categoria
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = c.title.toLowerCase().includes(query);
        const matchesCategory = c.category ? c.category.toLowerCase().includes(query) : false;
        const matchesModule = c.currentModule ? c.currentModule.toLowerCase().includes(query) : false;
        return matchesTitle || matchesCategory || matchesModule;
      }

      return true;
    });
  }, [cursosInscritos, filterTab, searchQuery]);

  return (
    <div className="space-y-8 max-w-6xl w-full mx-auto pb-16 px-2 sm:px-4">
      
      {/* ========================================================================= */}
      {/* 1. HERO BANNER PRINCIPAL (DESIGN SYSTEM PADRONIZADO COM TRILHAS)          */}
      {/* ========================================================================= */}
      <div className="w-full bg-white dark:bg-[#110E1B] border border-slate-200 dark:border-[#2D1B4E]/60 rounded-3xl p-6 lg:p-8 shadow-sm dark:shadow-2xl relative overflow-hidden space-y-6">
        
        {/* Cabeçalho do Banner */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10 pb-6 border-b border-slate-200 dark:border-[#2D1B4E]/60">
          <div className="space-y-3 max-w-2xl">
            {/* Badges superiores */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-slate-200 dark:bg-[#171126] border border-slate-300 dark:border-purple-500/30 px-3 py-1 rounded-full text-xs font-semibold text-slate-800 dark:text-zinc-300">
                <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                <span>Espaço de Aprendizagem Ativa</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-slate-200 dark:bg-[#171126] border border-slate-300 dark:border-purple-500/30 px-3 py-1 rounded-full text-xs font-semibold text-slate-800 dark:text-zinc-300">
                <Target className="w-3.5 h-3.5 text-amber-400" />
                <span>Meta da semana: {Math.min(concluidosList.length, 5)}/5 aulas</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-slate-200 dark:bg-[#171126] border border-slate-300 dark:border-purple-500/30 px-3 py-1 rounded-full text-xs font-semibold text-slate-800 dark:text-zinc-300">
                <GraduationCap className="w-3.5 h-3.5 text-rose-400" />
                <span>Certificados Oficiais</span>
              </span>
            </div>

            {/* Título & Descrição */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Meus Cursos Matriculados
            </h1>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
              Acompanhe seu avanço aula por aula, conclua as avaliações de fixação e conquiste selos de competência reconhecidos pelo mercado de Curitiba e região.
            </p>
          </div>

          {/* Card Numérico de Destaque à Direita */}
          <div className="bg-slate-50 dark:bg-[#171126] border border-slate-300 dark:border-[#2D1B4E] rounded-2xl p-4 sm:p-5 text-center shrink-0 shadow-lg min-w-[190px] flex flex-col items-center justify-center">
            <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {cursosInscritos.length}
            </div>
            <div className="text-xs text-zinc-400 font-medium mt-1">
              Cursos Matriculados
            </div>
          </div>
        </div>

        {/* Seção Explicativa de 2 Colunas ("Entenda seu Aprendizado") */}
        <div className="relative z-10 pt-1">
          <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Entenda seu Aprendizado</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Box 1: Cursos em Andamento */}
            <div className="bg-slate-50 dark:bg-[#171126] border border-slate-300 dark:border-[#2D1B4E] hover:border-purple-500/30 rounded-2xl p-5 space-y-2.5 transition-all">
              <div className="flex items-center gap-2.5 text-slate-900 dark:text-white font-bold text-sm">
                <div className="w-8 h-8 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                  <Clock className="w-4 h-4 text-purple-400" />
                </div>
                <span>Cursos em Andamento</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
                Aulas interativas e práticas ativas. Retome seus estudos exatamente de onde parou para manter a frequência e garantir retenção máxima do conteúdo.
              </p>
              <div className="text-[11px] text-zinc-400 pt-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                <span>{andamentoList.length} curso(s) aguardando sua próxima sessão de estudo.</span>
              </div>
            </div>

            {/* Box 2: Próximas Metas & Certificados */}
            <div className="bg-slate-50 dark:bg-[#171126] border border-amber-500/20 hover:border-amber-500/40 rounded-2xl p-5 space-y-2.5 transition-all">
              <div className="flex items-center gap-2.5 text-slate-900 dark:text-white font-bold text-sm">
                <div className="w-8 h-8 rounded-xl bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-300 shrink-0">
                  <Award className="w-4 h-4 text-amber-400" />
                </div>
                <span>Próximas Metas &amp; Certificados</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
                Ao atingir 100% dos módulos e aprovação mínima de 70% no Quiz final, você desbloqueia o Selo Oficial com código de autenticidade instantâneo para seu currículo.
              </p>
              <div className="text-[11px] text-amber-300/80 pt-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>{concluidosList.length} curso(s) já concluído(s) com certificação emitida.</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. BARRA DE FILTROS & BUSCA RÁPIDA (PADRONIZADA COM DESIGN SYSTEM)         */}
      {/* ========================================================================= */}
      <div className="w-full bg-white dark:bg-[#140E24] border border-slate-300 dark:border-[#2D1B4E]/60 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        
        {/* Linha 1: Input de Busca + Botão Explorar Novos Cursos */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar em meus cursos matriculados por nome ou categoria..."
              className="w-full bg-white dark:bg-[#0D0818] border border-slate-300 dark:border-[#2D1B4E] rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-zinc-500 font-semibold focus:outline-none focus:border-purple-600 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setCurrentView('CURSOS_DISPONIVEIS')}
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md shadow-purple-600/20 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>+ Explorar Novos Cursos</span>
          </button>
        </div>

        {/* Linha 2: Filtro Rápido por Status (Pills Padronizadas) */}
        <div className="flex flex-wrap items-center justify-start sm:justify-start gap-2 pt-2 border-t border-slate-300 dark:border-[#2D1B4E]/40 text-xs">
          <span className="text-zinc-400 font-bold shrink-0 flex items-center gap-1.5 mr-1">
            <Target className="w-3.5 h-3.5 text-amber-400" />
            Status:
          </span>

          <button
            type="button"
            onClick={() => setFilterTab('TODOS')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              filterTab === 'TODOS'
                ? 'bg-purple-700 text-white font-black shadow ring-2 ring-purple-600/50'
                : 'bg-slate-200 text-slate-800 hover:text-black hover:bg-slate-300 font-bold border border-slate-300 dark:bg-[#0D0818] dark:text-zinc-400 dark:hover:text-white dark:border-[#2D1B4E]'
            }`}
          >
            Todos os Cursos ({cursosInscritos.length})
          </button>

          <button
            type="button"
            onClick={() => setFilterTab('ANDAMENTO')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              filterTab === 'ANDAMENTO'
                ? 'bg-purple-700 text-white font-black shadow ring-2 ring-purple-600/50'
                : 'bg-slate-200 text-slate-800 hover:text-black hover:bg-slate-300 font-bold border border-slate-300 dark:bg-[#0D0818] dark:text-zinc-400 dark:hover:text-white dark:border-[#2D1B4E]'
            }`}
          >
            Em Andamento ({andamentoList.length})
          </button>

          <button
            type="button"
            onClick={() => setFilterTab('CONCLUIDOS')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              filterTab === 'CONCLUIDOS'
                ? 'bg-purple-700 text-white font-black shadow ring-2 ring-purple-600/50'
                : 'bg-slate-200 text-slate-800 hover:text-black hover:bg-slate-300 font-bold border border-slate-300 dark:bg-[#0D0818] dark:text-zinc-400 dark:hover:text-white dark:border-[#2D1B4E]'
            }`}
          >
            Concluídos ({concluidosList.length})
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. LISTAGEM & CARDS MODERNOS COM DESIGN SYSTEM GAMIFICADO                  */}
      {/* ========================================================================= */}
      {cursosInscritos.length === 0 ? (
        /* Empty State para Novos Usuários */
        <div className="w-full bg-white dark:bg-[#110E1B] border border-dashed border-slate-300 dark:border-purple-500/30 rounded-3xl p-10 sm:p-12 text-center space-y-4 shadow-sm dark:shadow-xl">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-300 shadow-lg shadow-purple-900/30">
            <GraduationCap className="w-8 h-8 text-amber-300" />
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Você ainda não iniciou nenhum curso
            </h3>
            <p className="text-xs text-slate-600 dark:text-purple-200/80 leading-relaxed">
              Explore o catálogo de cursos e trilhas gratuitas de Curitiba e Região Metropolitana para conquistar seus primeiros certificados.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setCurrentView('CURSOS_DISPONIVEIS')}
              className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all inline-flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>🚀 Explorar Cursos Gratuitos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        /* Empty State de Filtro ou Busca Sem Resultados */
        <div className="w-full bg-white dark:bg-[#140E24] border border-slate-300 dark:border-[#2D1B4E] rounded-2xl p-10 text-center space-y-3">
          <p className="text-xs text-slate-600 dark:text-zinc-400">
            {searchQuery 
              ? `Nenhum curso encontrado para "${searchQuery}".` 
              : 'Nenhum curso matriculado nesta aba de visualização.'}
          </p>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold cursor-pointer"
            >
              Limpar busca
            </button>
          )}
        </div>
      ) : (
        /* Grid de Cards Padronizados */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((course) => {
            const matchedCourse = COURSES.find(c => c.id === course.courseId || c.id === course.id);
            const totalModules = matchedCourse?.modules?.length || 4;
            const isCompleted = course.status === 'concluido' || course.progress >= 100;

            return (
              <div
                key={course.id}
                className="group relative bg-white dark:bg-[#110E1B] border border-slate-200 dark:border-[#2D1B4E]/60 hover:border-purple-500/50 rounded-2xl p-6 shadow-sm dark:shadow-xl hover:shadow-2xl hover:shadow-purple-950/40 flex flex-col justify-between space-y-5 transition-all duration-300 hover:-translate-y-1"
              >
                
                {/* Topo do Card: Categoria & Porcentagem com Ciano/Esmeralda */}
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between gap-2">
                    {/* Tag de Categoria em pílula violeta translúcida */}
                    <span className="text-[11px] font-semibold bg-purple-900/40 text-purple-300 px-2.5 py-0.5 rounded-md border border-purple-500/30 tracking-wide truncate max-w-[190px]">
                      {course.category || 'Desenvolvimento Profissional'}
                    </span>

                    {/* Porcentagem com Estilo Limpo Ciano/Esmeralda */}
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 shrink-0">
                      {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                      <span>{course.progress}% Concluído</span>
                    </span>
                  </div>

                  {/* Título do Curso */}
                  <h2 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-purple-300 transition-colors line-clamp-2 leading-snug">
                    {course.title}
                  </h2>

                  {/* Barra de Progresso em Gradiente Contínuo Cyan-Emerald */}
                  <div className="space-y-2 pt-1">
                    <div className="w-full bg-slate-200 dark:bg-slate-950 h-2 rounded-full overflow-hidden p-[1px] border border-slate-300 dark:border-purple-500/20 shadow-inner">
                      <div
                        className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 h-full rounded-full transition-all duration-700 shadow-sm shadow-emerald-500/30"
                        style={{ width: `${Math.max(5, course.progress)}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-0.5">
                      <span className="flex items-center gap-1 text-slate-700 dark:text-purple-200/90 truncate max-w-[180px]">
                        <BookOpen className="w-3 h-3 text-purple-400 shrink-0" />
                        <span className="truncate">{course.currentModule || `Módulo 1 de ${totalModules}`}</span>
                      </span>

                      <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 shrink-0">
                        <Clock className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                        <span>{course.workload || `${course.hours || 12}h`}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Botão de Ação no Roxo Vibrante da Navbar */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => openCourse(course.courseId || course.id, course.moduleIndex)}
                    className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-md shadow-purple-900/30 hover:shadow-purple-600/35 transition-all duration-200 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current transform group-hover:translate-x-0.5 transition-transform duration-200 text-amber-300" />
                    <span>{isCompleted ? 'Revisar Módulos' : 'Continuar Estudando'}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
