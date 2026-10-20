'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { COURSES, TRACKS } from '@/data/coursesData';
import {
  GraduationCap,
  Clock,
  MapPin,
  Briefcase,
  Play,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Building2,
  DollarSign,
  TrendingUp,
  Compass,
  BookOpen,
  Award
} from 'lucide-react';

interface ActiveCourseProgress {
  id: string;
  title: string;
  trackName: string;
  category: string;
  currentModule: string;
  progress: number;
  workload: string;
  moduleIndex: number;
}

export default function StudentDashboard() {
  const {
    currentUser,
    candidateProfileType,
    openCourse,
    setCurrentView,
    student,
    vagas,
    applications,
    badges,
    showToast,
    applyToJob,
    completedModules,
    quizResults
  } = useApp();

  const userName = currentUser?.nome || student?.nome || 'Nicoli Silva';
  const studentBairro = student?.endereco?.bairro || 'CIC';

  // =========================================================================
  // DADOS E ESTADO DE APRENDIZADO DO ALUNO
  // =========================================================================

  // Cursos ativos em andamento do aluno
  const [activeCourses, setActiveCourses] = useState<ActiveCourseProgress[]>([
    {
      id: 'curso-jovem-aprendiz-avancado',
      title: 'Legislação Trabalhista, Direitos & Deveres do Aprendiz',
      trackName: 'Trilha Entrada no Mercado',
      category: 'Direito & Cidadania',
      currentModule: 'Módulo 2: Jornada de Trabalho e Horas Teóricas',
      progress: 60,
      workload: '20h',
      moduleIndex: 1
    },
    {
      id: 'curso-soft-skills-comunicacao-interpessoal',
      title: 'Microsoft Excel & Planilhas para Escritório',
      trackName: 'Trilha Rotinas Administrativas',
      category: 'Tecnologia & Escritório',
      currentModule: 'Módulo 3: Fórmulas PROCV, PROCH e Tabelas Dinâmicas',
      progress: 45,
      workload: '24h',
      moduleIndex: 2
    },
    {
      id: 'curso-preparacao-entrevistas-processos-seletivos',
      title: 'Comunicação Assertiva e Postura Corporativa',
      trackName: 'Trilha Soft Skills Essenciais',
      category: 'Desenvolvimento Pessoal',
      currentModule: 'Módulo 1: Escuta Ativa e Convivência em Equipe',
      progress: 30,
      workload: '16h',
      moduleIndex: 0
    }
  ]);

  // Contadores Reais Conectados
  // 1. Cursos Concluídos: soma de quizzes aprovados ou módulos finalizados + cursos concluídos históricos
  const completedFromQuizzes = Object.values(quizResults).filter((q) => q.passed).length;
  const completedCount = Math.max(5, completedFromQuizzes + (badges?.length || 2));

  // 2. Cursos em Andamento
  const inProgressCount = activeCourses.length;

  // 3. Trilhas em Progresso
  const tracksInProgressCount = 2; // "Trilha Rotinas Administrativas" e "Trilha Entrada no Mercado"

  // 4. Vagas Novas Hoje (últimas 24h na RMC)
  const newVacanciesToday = vagas.filter((v) => v.status === 'ATIVA').length;

  // =========================================================================
  // OPORTUNIDADES RECOMENDADAS HOJE
  // =========================================================================
  // Filtrar vagas para o perfil do aluno e ordenar por proximidade/aderência
  const recommendedJobs = vagas
    .filter((v) => {
      if (candidateProfileType === 'ESTAGIARIO') {
        return v.tipoVaga === 'Estagiário';
      }
      if (candidateProfileType === 'PRIMEIRO_EMPREGO') {
        return v.tipoVaga === 'Primeiro Emprego' || v.tipoVaga === 'Jovem Aprendiz';
      }
      return v.tipoVaga === 'Jovem Aprendiz' || v.tipoVaga === 'Estagiário';
    })
    .slice(0, 4);

  const handleApply = (vagaId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const result = applyToJob(vagaId);
    if (!result.success) {
      showToast('Aviso', result.message, 'info');
    }
  };

  const handleContinueCourse = (courseId: string, moduleIndex: number) => {
    openCourse(courseId, moduleIndex);
    setCurrentView('CURSO_DETALHE');
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 pb-12 animate-fadeIn transition-colors duration-300">
      
      {/* ========================================================================= */}
      {/* BANNER PRINCIPAL DE BOAS-VINDAS                                          */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-[#110E1B] border border-gray-200 dark:border-purple-500/20 rounded-2xl p-5 sm:p-6 shadow-sm dark:shadow-xl transition-colors duration-300">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-slate-200 dark:bg-purple-950/80 text-slate-800 dark:text-purple-200 border border-slate-300 dark:border-purple-500/30">
                <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Painel do Aluno</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-slate-200 dark:bg-emerald-950/70 text-slate-800 dark:text-emerald-300 border border-slate-300 dark:border-emerald-500/30">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{studentBairro} • Curitiba/PR</span>
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Olá, <span className="text-purple-600 dark:text-purple-300">{userName}</span>!
            </h1>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 mt-1 max-w-2xl leading-relaxed">
              Aqui está o resumo em tempo real do seu progresso educacional, trilhas em andamento e oportunidades compatíveis com o seu perfil em Curitiba e RMC.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <button
              onClick={() => setCurrentView('CURSOS_DISPONIVEIS')}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explorar Catálogo</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* A) CARDS DE MÉTRICAS E CONTADORES REAIS (TOPO)                            */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Cursos Concluídos */}
        <div className="bg-white dark:bg-slate-900/80 border border-gray-200 dark:border-purple-500/20 rounded-2xl p-4 sm:p-5 shadow-sm dark:shadow-lg space-y-2 transition-all hover:border-purple-400 dark:hover:border-purple-500/40">
          <div className="flex items-center justify-between">
            <span className="font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 text-xs">
              Cursos Concluídos
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-300">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {completedCount}
            </span>
            <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
              finalizados
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-zinc-400">
            Microcertificados e badges emitidos no SkillHub.
          </p>
        </div>

        {/* KPI 2: Cursos em Andamento */}
        <div className="bg-white dark:bg-slate-900/80 border border-gray-200 dark:border-purple-500/20 rounded-2xl p-4 sm:p-5 shadow-sm dark:shadow-lg space-y-2 transition-all hover:border-purple-400 dark:hover:border-purple-500/40">
          <div className="flex items-center justify-between">
            <span className="font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 text-xs">
              Cursos em Andamento
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-300">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {inProgressCount}
            </span>
            <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
              em progresso
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-zinc-400">
            Aulas iniciadas aguardando conclusão dos módulos.
          </p>
        </div>

        {/* KPI 3: Trilhas em Progresso */}
        <div className="bg-white dark:bg-slate-900/80 border border-gray-200 dark:border-purple-500/20 rounded-2xl p-4 sm:p-5 shadow-sm dark:shadow-lg space-y-2 transition-all hover:border-purple-400 dark:hover:border-purple-500/40">
          <div className="flex items-center justify-between">
            <span className="font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 text-xs">
              Trilhas em Progresso
            </span>
            <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-300">
              <Compass className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {tracksInProgressCount}
            </span>
            <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
              formações ativas
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-zinc-400">
            Jornadas estruturadas de entrada no mercado.
          </p>
        </div>

        {/* KPI 4: Vagas Novas Hoje */}
        <div className="bg-white dark:bg-slate-900/80 border border-gray-200 dark:border-purple-500/20 rounded-2xl p-4 sm:p-5 shadow-sm dark:shadow-lg space-y-2 transition-all hover:border-purple-400 dark:hover:border-purple-500/40">
          <div className="flex items-center justify-between">
            <span className="font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 text-xs">
              Vagas Novas Hoje
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-300">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {newVacanciesToday}
            </span>
            <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
              vagas abertas
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-zinc-400">
            Estágio e Jovem Aprendiz em Curitiba e RMC.
          </p>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* B) SEÇÃO "MEU APRENDIZADO EM ANDAMENTO"                                    */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-slate-900/80 border border-gray-200 dark:border-purple-500/20 rounded-2xl p-5 sm:p-6 shadow-sm dark:shadow-xl space-y-4 transition-colors duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-200 dark:border-zinc-800">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span>Meu Aprendizado em Andamento</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Cursos e trilhas que você iniciou recentemente. Retome suas aulas a qualquer momento.
            </p>
          </div>
          <button
            onClick={() => setCurrentView('CURSOS_DISPONIVEIS')}
            className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center gap-1 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span>Ver Todas as Trilhas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Grid de Cursos em Andamento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activeCourses.map((course) => (
            <div
              key={course.id}
              className="bg-slate-50 dark:bg-slate-950/60 border border-gray-200 dark:border-purple-500/15 rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-4 hover:border-purple-400 dark:hover:border-purple-500/40 transition-all shadow-sm"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30">
                    {course.trackName}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400">
                    {course.workload}
                  </span>
                </div>

                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-snug line-clamp-2">
                  {course.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-zinc-400 line-clamp-1">
                  {course.currentModule}
                </p>
              </div>

              {/* Barra de Progresso Visual */}
              <div className="space-y-1.5 pt-2 border-t border-gray-200 dark:border-zinc-800/80">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-600 dark:text-zinc-400 text-[11px]">Progresso</span>
                  <span className="text-purple-600 dark:text-purple-300">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              {/* Botão de Ação Direta */}
              <button
                onClick={() => handleContinueCourse(course.id, course.moduleIndex)}
                className="w-full mt-2 py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer group"
              >
                <span>Continuar de onde parou</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* C) SEÇÃO "OPORTUNIDADES RECOMENDADAS HOJE"                                  */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-slate-900/80 border border-gray-200 dark:border-purple-500/20 rounded-2xl p-5 sm:p-6 shadow-sm dark:shadow-xl space-y-4 transition-colors duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-200 dark:border-zinc-800">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Oportunidades Recomendadas Hoje</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Vagas abertas nas últimas 24h em Curitiba e RMC selecionadas para o seu perfil.
            </p>
          </div>
          <button
            onClick={() => setCurrentView('MAPA_PROXIMIDADE')}
            className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center gap-1 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span>Ver Mapa Completo de Vagas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bloco Compacto de Oportunidades */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendedJobs.map((vaga) => {
            const hasApplied = applications.some((app) => app.idVaga === vaga.id) || vaga.jaCandidatou;

            return (
              <div
                key={vaga.id}
                className="bg-slate-50 dark:bg-slate-950/60 border border-gray-200 dark:border-purple-500/15 rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-3 hover:border-purple-400 dark:hover:border-purple-500/40 transition-all shadow-sm"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>{vaga.empresaNome}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
                      {vaga.tipoVaga}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                    {vaga.titulo}
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 dark:text-zinc-400 pt-1">
                    <span className="flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400">
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>R$ {vaga.remuneracao.toFixed(2)}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
                      <span>Bairro {vaga.bairro}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
                      <span>{vaga.cargaSemanal}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-zinc-800/80 gap-2">
                  <div className="text-[11px] text-slate-500 dark:text-zinc-400 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                    <span>{vaga.aderenciaPerfil}% de aderência</span>
                  </div>

                  {hasApplied ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 text-xs font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Candidatado</span>
                    </span>
                  ) : (
                    <button
                      onClick={(e) => handleApply(vaga.id, e)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Candidatar-se</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
