'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  GraduationCap,
  Clock,
  MapPin,
  Briefcase,
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

export default function StudentDashboard() {
  const {
    currentUser,
    candidateProfileType,
    openCourse,
    setCurrentView,
    student,
    vagas,
    applications,
    showToast,
    applyToJob,
    cursosInscritos,
    badgesConquistadas,
    horasEstudadas,
    progressoGeral
  } = useApp();

  const userName = currentUser?.nome || student?.nome || 'Estudante';
  const studentBairro = student?.endereco?.bairro || currentUser?.bairro || 'Curitiba';

  // =========================================================================
  // CÁLCULOS DINÂMICOS EM TEMPO REAL (BASEADOS NO USUÁRIO LOGADO)
  // =========================================================================

  // 1. Cursos Concluídos
  const concluidosCount = cursosInscritos.filter((c) => c.status === 'concluido').length;

  // 2. Badges Reais Validadas
  const badgesCount = badgesConquistadas.length;

  // 3. Cursos em Andamento (ou total ativos)
  const activeCourses = cursosInscritos.filter((c) => c.status === 'em_andamento');

  // 4. Vagas Recomendadas para o perfil
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
      <div className="bg-white dark:bg-[#110E1B] border border-slate-300 dark:border-purple-500/20 rounded-2xl p-5 sm:p-6 shadow-sm dark:shadow-xl transition-colors duration-300">
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
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-1.5 hover:scale-[1.02]"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explorar Catálogo</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. CONTADORES REAIS E DINÂMICOS DO DASHBOARD (4 CARDS)                    */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* CARD 1: Cursos Concluídos */}
        <div className="bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-purple-500/20 rounded-2xl p-4 sm:p-5 shadow-sm dark:shadow-lg space-y-2 transition-all hover:border-purple-400 dark:hover:border-purple-500/40 flex flex-col justify-between">
          <div className="space-y-2">
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
                {concluidosCount}
              </span>
              <span className="text-xs text-slate-700 dark:text-zinc-400 font-medium">
                {concluidosCount === 1 ? 'concluído' : 'concluídos'}
              </span>
            </div>
          </div>

          <div>
            {concluidosCount === 0 ? (
              <p className="text-[11px] text-purple-700 dark:text-purple-300 font-semibold leading-tight">
                Nenhum curso concluído ainda. Comece sua jornada!
              </p>
            ) : (
              <p className="text-[11px] text-slate-700 dark:text-zinc-400 font-medium leading-tight">
                Microcertificados e badges emitidos no SkillHub.
              </p>
            )}
          </div>
        </div>

        {/* CARD 2: Badges Reais Validadas */}
        <div className="bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-purple-500/20 rounded-2xl p-4 sm:p-5 shadow-sm dark:shadow-lg space-y-2 transition-all hover:border-purple-400 dark:hover:border-purple-500/40 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 text-xs">
                Badges Reais Validadas
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-300">
                <Award className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {badgesCount}
              </span>
              <span className="text-xs text-slate-700 dark:text-zinc-400 font-medium">
                {badgesCount === 1 ? 'selo oficial' : 'selos oficiais'}
              </span>
            </div>
          </div>

          <div>
            {badgesCount === 0 ? (
              <p className="text-[11px] text-amber-700 dark:text-amber-300 font-semibold leading-tight">
                0 Badges Conquistadas. Conclua testes para emitir selos.
              </p>
            ) : (
              <p className="text-[11px] text-slate-700 dark:text-zinc-400 font-medium leading-tight">
                Selos digitais verificados visíveis para recrutadores.
              </p>
            )}
          </div>
        </div>

        {/* CARD 3: Horas de Aprendizagem */}
        <div className="bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-purple-500/20 rounded-2xl p-4 sm:p-5 shadow-sm dark:shadow-lg space-y-2 transition-all hover:border-purple-400 dark:hover:border-purple-500/40 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 text-xs">
                Horas de Aprendizagem
              </span>
              <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-300">
                <Clock className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {horasEstudadas}h
              </span>
              <span className="text-xs text-slate-700 dark:text-zinc-400 font-medium">
                computadas
              </span>
            </div>
          </div>

          <div>
            <p className="text-[11px] text-slate-700 dark:text-zinc-400 font-medium leading-tight">
              {horasEstudadas === 0
                ? 'Nenhuma hora registrada ainda.'
                : 'Horas teóricas válidas para cota de aprendizagem.'}
            </p>
          </div>
        </div>

        {/* CARD 4: Progresso de Trilhas */}
        <div className="bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-purple-500/20 rounded-2xl p-4 sm:p-5 shadow-sm dark:shadow-lg space-y-2 transition-all hover:border-purple-400 dark:hover:border-purple-500/40 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 text-xs">
                Progresso de Trilhas
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-300">
                <Compass className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {progressoGeral}%
              </span>
              <span className="text-xs text-slate-700 dark:text-zinc-400 font-medium">
                evolução geral
              </span>
            </div>

            {/* Barra de Progresso Real (0% para novos usuários) */}
            <div className="w-full bg-slate-200 dark:bg-zinc-800 rounded-full h-2 overflow-hidden mt-1">
              <div
                className="bg-gradient-to-r from-emerald-600 to-teal-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressoGeral}%` }}
              />
            </div>
          </div>

          <div>
            <p className="text-[11px] text-slate-700 dark:text-zinc-400 font-medium leading-tight">
              {progressoGeral === 0
                ? '0% inicial. Escolha um curso para começar.'
                : 'Média de conclusão dos módulos matriculados.'}
            </p>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. SEÇÃO "MEU APRENDIZADO EM ANDAMENTO" COM EMPTY STATE ELEGANTE          */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-purple-500/20 rounded-2xl p-5 sm:p-6 shadow-sm dark:shadow-xl space-y-4 transition-colors duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-300 dark:border-zinc-800">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span>Meu Aprendizado em Andamento</span>
            </h2>
            <p className="text-xs text-slate-700 font-medium dark:text-zinc-400">
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

        {/* Empty State Elegante se o usuário não iniciou nenhum curso */}
        {activeCourses.length === 0 ? (
          <div className="bg-slate-50/70 dark:bg-slate-950/40 border border-dashed border-slate-300 dark:border-purple-500/20 rounded-2xl p-8 sm:p-10 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-300">
              <BookOpen className="w-6 h-6" />
            </div>

            <div className="max-w-md mx-auto space-y-1">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Você ainda não iniciou nenhum curso
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Que tal explorar as Trilhas de Curitiba &amp; RMC para conquistar suas primeiras badges e se destacar para os recrutadores?
              </p>
            </div>

            <div>
              <button
                onClick={() => setCurrentView('CURSOS_DISPONIVEIS')}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm transition-all inline-flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
              >
                <span>🚀 Explorar Cursos Gratuitos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* Grid de Cursos em Andamento (quando houver) */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeCourses.map((course) => (
              <div
                key={course.id}
                className="bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-purple-500/15 rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-4 hover:border-purple-400 dark:hover:border-purple-500/40 transition-all shadow-sm"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30">
                      {course.trackName}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-700 font-medium dark:text-zinc-400">
                      {course.workload}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-snug line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-800 font-semibold dark:text-zinc-400 line-clamp-1">
                    {course.currentModule}
                  </p>
                </div>

                {/* Barra de Progresso Visual */}
                <div className="space-y-1.5 pt-2 border-t border-slate-300 dark:border-zinc-800/80">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-800 font-semibold dark:text-zinc-400 text-[11px]">Progresso</span>
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
                  onClick={() => handleContinueCourse(course.courseId || course.id, course.moduleIndex)}
                  className="w-full mt-2 py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer group"
                >
                  <span>Continuar de onde parou</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* SEÇÃO "OPORTUNIDADES RECOMENDADAS HOJE"                                    */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-purple-500/20 rounded-2xl p-5 sm:p-6 shadow-sm dark:shadow-xl space-y-4 transition-colors duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-300 dark:border-zinc-800">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Oportunidades Recomendadas Hoje</span>
            </h2>
            <p className="text-xs text-slate-700 font-medium dark:text-zinc-400">
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
                className="bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-purple-500/15 rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-3 hover:border-purple-400 dark:hover:border-purple-500/40 transition-all shadow-sm"
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

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-800 font-semibold dark:text-zinc-400 pt-1">
                    <span className="flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400">
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>R$ {vaga.remuneracao.toFixed(2)}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-700 font-medium dark:text-zinc-400" />
                      <span>Bairro {vaga.bairro}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-700 font-medium dark:text-zinc-400" />
                      <span>{vaga.cargaSemanal}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-300 dark:border-zinc-800/80 gap-2">
                  <div className="text-[11px] text-slate-700 font-medium dark:text-zinc-400 flex items-center gap-1">
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
