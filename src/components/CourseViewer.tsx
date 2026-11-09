'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { COURSES } from '@/data/coursesData';
import { 
  BookOpen, 
  CheckCircle2, 
  Award, 
  Clock, 
  AlertTriangle, 
  Check, 
  HelpCircle, 
  ArrowLeft,
  Maximize2,
  Download,
  Play,
  Lock,
  X,
  RefreshCw,
  ChevronRight,
  ChevronLeft,
  ArrowRight
} from 'lucide-react';

export default function CourseViewer({ courseId }: { courseId?: string } = {}) {
  const { 
    selectedCourseId, 
    setSelectedCourseId,
    setCurrentView,
    showToast,
    completedModules,
    quizResults,
    markModuleComplete,
    submitCourseQuiz,
    completeCourseAndClaimBadge,
    currentUser,
    student
  } = useApp();

  const activeCourseId = courseId || selectedCourseId;

  const course = 
    COURSES.find((c) => c.id === activeCourseId) || 
    COURSES.find((c) => c.id === 'orcamento-primeiro-salarial') || 
    COURSES.find((c) => c.id === 'curso-orcamento-primeiro-salario') || 
    COURSES[0];

  const isOrcamento = course.id === 'curso-orcamento-primeiro-salario' || course.id === 'orcamento-primeiro-salarial';
  const isEquilibrio = course.id === 'equilibrio-emocional' || course.id === 'curso-equilibrio-emocional' || course.id === 'curso-saude-mental-trabalho';
  const hasReadingTimer = isOrcamento || isEquilibrio;

  useEffect(() => {
    if (courseId && setSelectedCourseId && selectedCourseId !== courseId) {
      setSelectedCourseId(courseId);
    }
  }, [courseId, selectedCourseId, setSelectedCourseId]);

  const [activeTab, setActiveTab] = useState<'AULA' | 'QUIZ'>('AULA');
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [isImageExpanded, setIsImageExpanded] = useState<boolean>(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState<boolean>(false);
  const [downloadingPdf, setDownloadingPdf] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  // Quiz State
  const [userQuizAnswers, setUserQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizPassedState, setQuizPassedState] = useState<boolean>(false);

  const completedInCourse = completedModules[course.id] || [];
  const isQuizPassedInContext = Boolean(quizResults[course.id]?.passed);
  const isCourseCompleted = isQuizPassedInContext || quizPassedState;
  const progressPercent = isCourseCompleted 
    ? 100 
    : Math.min(99, Math.round((completedInCourse.length / Math.max(course.modules.length, 1)) * 100));

  // Cronômetro de leitura
  const INITIAL_TIMER_SECONDS = 180;
  const [timeLeft, setTimeLeft] = useState<number>(INITIAL_TIMER_SECONDS);
  const isTimerFinished = timeLeft === 0;

  useEffect(() => {
    if (!hasReadingTimer) return;

    if (isQuizPassedInContext) {
      setTimeLeft(0);
      return;
    }

    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [course.id, hasReadingTimer, isQuizPassedInContext, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSkipTimerForTesting = () => {
    setTimeLeft(0);
    showToast('Timer Concluído para Testes', 'O Quiz do curso foi liberado para validação imediata.', 'info');
  };

  const handleDownloadInfografico = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloadingPdf(true);
    setTimeout(() => {
      setDownloadingPdf(false);
      showToast(
        'Infográfico em PDF Gerado',
        `O mapa mental de "${course.title}" foi enviado para download no seu dispositivo.`,
        'success'
      );
    }, 800);
  };

  const handleAnswerSelect = (questionId: number, optionIdx: number) => {
    if (quizSubmitted) return;
    setUserQuizAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx
    }));
  };

  const handleSubmitQuiz = () => {
    const questions = course.quiz || [];
    if (questions.length === 0) return;

    const answeredCount = Object.keys(userQuizAnswers).length;
    if (answeredCount < questions.length) {
      showToast('Atenção', `Por favor, responda todas as ${questions.length} questões antes de enviar.`, 'warning');
      return;
    }

    let correct = 0;
    questions.forEach((q) => {
      if (userQuizAnswers[q.id] === q.correct) {
        correct++;
      }
    });

    const scorePct = Math.round((correct / questions.length) * 100);
    const passed = isEquilibrio ? correct >= 2 : scorePct >= 70;

    setQuizScore(scorePct);
    setQuizSubmitted(true);
    setQuizPassedState(passed);

    const answersArray = questions.map((q) => userQuizAnswers[q.id] ?? 0);
    submitCourseQuiz(course.id, scorePct, answersArray);

    if (passed) {
      completeCourseAndClaimBadge(course.id);
      setIsCertificateModalOpen(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 6000);
    }
  };

  const handleRetakeQuiz = () => {
    setUserQuizAnswers({});
    setQuizSubmitted(false);
  };

  const studentName = currentUser?.nome || student?.nome || 'Jovem Aprendiz';

  // Informações do Módulo Ativo
  const currentModuleIndex = selectedModuleId 
    ? course.modules.findIndex((m) => m.id === selectedModuleId)
    : -1;
  const currentModule = currentModuleIndex >= 0 ? course.modules[currentModuleIndex] : null;
  const isCurrentModuleDone = currentModule ? completedInCourse.includes(currentModule.id) : false;

  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-6 flex flex-col items-center space-y-6 pb-24 font-sans text-slate-100">
      
      {/* ========================================================================= */}
      {/* 1. NAVEGAÇÃO SUPERIOR                                                     */}
      {/* ========================================================================= */}
      <div className="w-full flex items-center justify-between text-xs pb-1">
        <button
          onClick={() => {
            if (typeof window !== 'undefined' && window.location.pathname.startsWith('/cursos')) {
              window.location.href = '/cursos';
            } else {
              setCurrentView('CURSOS_DISPONIVEIS');
            }
          }}
          className="inline-flex items-center gap-1.5 font-medium text-slate-400 hover:text-white transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform text-purple-400" />
          <span>Voltar ao Catálogo de Cursos</span>
        </button>

        <button
          onClick={() => {
            if (typeof window !== 'undefined' && window.location.pathname.startsWith('/cursos')) {
              window.location.href = '/';
            } else {
              setCurrentView('DASHBOARD');
            }
          }}
          className="text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          Painel Principal
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 2. CABEÇALHO DO CURSO (DESIGN PADRÃO SKILLHUB COM BACKDROP-BLUR)          */}
      {/* ========================================================================= */}
      <div className="w-full bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md shadow-lg space-y-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          
          <div className="space-y-3 max-w-2xl">
            {/* Badges e Pills: rounded-full text-xs font-medium px-3 py-1 bg-slate-800 text-slate-300 */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full text-xs font-medium px-3 py-1 bg-slate-800 text-slate-300">
                {course.category}
              </span>

              <span className="rounded-full text-xs font-medium px-3 py-1 bg-slate-800 text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                <span>{course.hours === 1 ? '1 hora' : `${course.hours}h`}</span>
              </span>

              <span className="rounded-full text-xs font-medium px-3 py-1 bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                EAD 100% Gratuito
              </span>

              <span className="rounded-full text-xs font-medium px-3 py-1 bg-purple-950/60 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-purple-400" />
                <span>Selo: {course.badgeName}</span>
              </span>
            </div>

            {/* Título Principal com text-2xl md:text-3xl font-bold */}
            <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight tracking-tight">
              {course.title}
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              {course.subtitle}
            </p>
          </div>

          {/* Card Lateral de Progresso */}
          <div className="w-full md:w-64 bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 shrink-0 flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-300">Progresso Geral</span>
                <span className={isCourseCompleted ? 'text-emerald-400 font-bold' : 'text-purple-300 font-bold'}>
                  {isCourseCompleted ? '100%' : `${progressPercent}%`}
                </span>
              </div>

              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    isCourseCompleted ? 'bg-emerald-500' : 'bg-purple-600'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-400">
                {isCourseCompleted 
                  ? 'Certificação homologada com sucesso!' 
                  : `${completedInCourse.length} de ${course.modules.length} módulos concluídos`}
              </p>
            </div>

            {isCourseCompleted ? (
              <button
                onClick={() => setIsCertificateModalOpen(true)}
                className="w-full py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Ver Certificado</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  if (!hasReadingTimer || isTimerFinished) {
                    setActiveTab('QUIZ');
                  }
                }}
                disabled={hasReadingTimer && !isTimerFinished}
                className={`w-full py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
                  hasReadingTimer && !isTimerFinished
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-500 text-white cursor-pointer shadow-md shadow-purple-600/20'
                }`}
              >
                {hasReadingTimer && !isTimerFinished ? (
                  <>
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                    <span>Quiz Bloqueado ({formatTime(timeLeft)})</span>
                  </>
                ) : (
                  <>
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Fazer Quiz Oficial</span>
                  </>
                )}
              </button>
            )}
          </div>

        </div>

        {/* ===================================================================== */}
        {/* MAPA MENTAL OFICIAL (APENAS NOS CURSOS QUE POSSUEM O MATERIAL)        */}
        {/* ===================================================================== */}
        {isEquilibrio && (
          <div className="pt-2 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                <span>Material Visual de Referência: Mapa Mental &amp; Práticas Diárias</span>
              </span>
              <button
                type="button"
                onClick={() => setIsImageExpanded(true)}
                className="px-2.5 py-1 rounded-md text-xs font-medium border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Maximize2 className="w-3 h-3 text-purple-400" />
                <span>Ampliar Mapa</span>
              </button>
            </div>

            <div className="w-full rounded-2xl border border-purple-500/20 shadow-md overflow-hidden bg-slate-900/60 p-2">
              <img 
                src="/mapa-mental-equilibrio.png" 
                alt="Mapa Mental Equilíbrio Emocional" 
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.triedFallback) {
                    target.dataset.triedFallback = 'true';
                    target.src = '/api/course-image?course=equilibrio';
                  }
                }}
                className="w-full h-auto rounded-xl object-contain cursor-pointer transition-transform hover:scale-[1.01] max-h-[480px]"
                onClick={() => setIsImageExpanded(true)}
              />
            </div>
          </div>
        )}

        {isOrcamento && (
          <div className="pt-2 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                <span>Material Visual de Referência: Mapa Mental do Orçamento</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsImageExpanded(true)}
                  className="px-2.5 py-1 rounded-md text-xs font-medium border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Maximize2 className="w-3 h-3 text-purple-400" />
                  <span>Ampliar</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadInfografico}
                  disabled={downloadingPdf}
                  className="px-2.5 py-1 rounded-md text-xs font-medium border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3 h-3 text-purple-400" />
                  <span>{downloadingPdf ? 'Baixando...' : 'Baixar PDF'}</span>
                </button>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-2 shadow-md flex items-center justify-center">
              <img 
                src="/mapa-mental-orcamento.png" 
                alt="Mapa Mental: Orçamento do Primeiro Salário" 
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.triedFallback) {
                    target.dataset.triedFallback = 'true';
                    target.src = '/api/course-image';
                  }
                }}
                className="w-full h-auto object-contain max-h-[480px] rounded-xl cursor-pointer" 
                onClick={() => setIsImageExpanded(true)}
              />
            </div>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* 3. CONTEÚDO PRINCIPAL: MODULAR (GRID DE CARDS) OU LEITURA FOCADA           */}
      {/* ========================================================================= */}
      {activeTab === 'AULA' && (
        <div className="w-full space-y-8">
          
          {/* --------------------------------------------------------------------- */}
          {/* CASO A: VISÃO GERAL EM GRID DE CARDS MODULARES (NENHUM MÓDULO ABERTO) */}
          {/* --------------------------------------------------------------------- */}
          {!selectedModuleId ? (
            <div className="w-full space-y-6 animate-fadeIn">
              
              {/* Barra de Título do Conteúdo */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    Módulos do Curso
                  </h2>
                  <span className="rounded-full text-xs font-semibold px-2.5 py-0.5 bg-slate-800 text-slate-300">
                    {course.modules.length} {course.modules.length === 1 ? 'módulo' : 'módulos'}
                  </span>
                </div>

                <span className="text-xs text-slate-400 font-medium">
                  {completedInCourse.length} de {course.modules.length} concluídos
                </span>
              </div>

              {/* GRID DE CARDS MODULARES LADO A LADO (2 ou 3 colunas) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {course.modules.map((module, mIdx) => {
                  const isModuleDone = completedInCourse.includes(module.id);

                  return (
                    <div 
                      key={module.id || mIdx}
                      className={`bg-slate-900/40 border rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between transition-all duration-300 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-950/20 group relative overflow-hidden ${
                        isModuleDone 
                          ? 'border-emerald-500/30 shadow-emerald-950/10' 
                          : 'border-slate-800/80'
                      }`}
                    >
                      {/* Topo do Card: Badge sutil + Título limpo */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="rounded-full text-xs font-semibold px-3 py-1 bg-slate-800 text-slate-300 group-hover:bg-purple-950/60 group-hover:text-purple-300 transition-colors">
                            Módulo {mIdx + 1}
                          </span>

                          {isModuleDone ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-500/20">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Concluído
                            </span>
                          ) : (
                            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-500" />
                              {module.estimatedMinutes || 15} min
                            </span>
                          )}
                        </div>

                        <h3 className="text-base md:text-lg font-semibold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                          {module.title}
                        </h3>

                        {/* Meio do Card: Resumo/Descrição dos tópicos */}
                        <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 font-normal">
                          {module.summary || 'Estudo detalhado dos conceitos essenciais, técnicas práticas e exemplos de aplicação corporativa.'}
                        </p>
                      </div>

                      {/* Rodapé do Card: Duração, barra e botão de acesso */}
                      <div className="pt-5 mt-4 border-t border-slate-800/80 space-y-3">
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>{isModuleDone ? 'Conteúdo validado' : 'Pendente de leitura'}</span>
                          <span className="text-slate-300 font-medium">{module.content.sections.length} seções</span>
                        </div>

                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              isModuleDone ? 'bg-emerald-500 w-full' : 'bg-purple-600/40 w-1/4'
                            }`}
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedModuleId(module.id);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                            isModuleDone
                              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                              : 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/20'
                          }`}
                        >
                          <span>{isModuleDone ? 'Rever Módulo' : 'Estudar Módulo'}</span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* CARD DE VÍDEO RECOMENDADO NO YOUTUBE (CENTRALIZADO) */}
              <div className="w-full bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
                    <Play className="w-3.5 h-3.5 text-purple-400" />
                    <span>Material Audiovisual Complementar</span>
                  </div>
                  <p className="text-sm text-slate-300 font-medium">
                    {isOrcamento 
                      ? 'Se você quiser aprender mais sobre como administrar seus ganhos, assista ao vídeo complementar:'
                      : 'Aprofunde seus conhecimentos assistindo à videoaula recomendada para fixar o aprendizado:'}
                  </p>
                </div>

                <a
                  href={isOrcamento 
                    ? "https://youtu.be/CIdkEei-BdU?si=V5_UIYlhtdcZjtEZ" 
                    : "https://www.youtube.com/results?search_query=inteligencia+emocional+e+foco+no+trabalho"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-600 hover:bg-purple-500 text-white font-medium px-5 py-2.5 rounded-full transition-all shadow-md flex items-center gap-2 text-xs sm:text-sm shrink-0 whitespace-nowrap cursor-pointer hover:scale-[1.02]"
                >
                  <span>Assistir no YouTube ➔</span>
                </a>
              </div>

              {/* BARRA INFERIOR DE TIMER & QUIZ */}
              <div className="w-full bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md shadow-lg">
                <div className="flex items-center gap-3">
                  {hasReadingTimer ? (
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium">
                      <Clock className="w-3.5 h-3.5 text-purple-400" />
                      <span>
                        {isTimerFinished ? 'Tempo de estudo concluído' : `⏱️ Tempo mínimo de leitura: ${formatTime(timeLeft)}`}
                      </span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium">
                      <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                      <span>{completedInCourse.length} de {course.modules.length} módulos concluídos</span>
                    </div>
                  )}

                  {hasReadingTimer && !isTimerFinished && (
                    <button
                      type="button"
                      onClick={handleSkipTimerForTesting}
                      className="text-xs text-purple-400 hover:underline cursor-pointer"
                      title="Atalho de teste"
                    >
                      (pular tempo)
                    </button>
                  )}
                </div>

                <button
                  onClick={() => {
                    if (!hasReadingTimer || isTimerFinished) {
                      setActiveTab('QUIZ');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  disabled={hasReadingTimer && !isTimerFinished && !isCourseCompleted}
                  className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md ${
                    isCourseCompleted
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer'
                      : !hasReadingTimer || isTimerFinished
                      ? 'bg-purple-600 hover:bg-purple-500 text-white cursor-pointer hover:scale-[1.02]'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  }`}
                >
                  {isCourseCompleted ? (
                    <>
                      <Award className="w-4 h-4" />
                      <span>Ver Certificado Oficial</span>
                    </>
                  ) : hasReadingTimer && !isTimerFinished ? (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Quiz Bloqueado ({formatTime(timeLeft)})</span>
                    </>
                  ) : (
                    <>
                      <HelpCircle className="w-4 h-4" />
                      <span>Fazer Prova de Fixação (Quiz) ➔</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          ) : (
            /* --------------------------------------------------------------------- */
            /* CASO B: LEITURA FOCADA DO MÓDULO INDIVIDUAL (VISÃO LIMPA E SEM RUÍDO)  */
            /* --------------------------------------------------------------------- */
            currentModule && (
              <div className="w-full space-y-6 animate-fadeIn">
                
                {/* Barra Superior da Leitura Focada */}
                <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedModuleId(null);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors cursor-pointer self-start sm:self-auto group"
                  >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform text-purple-400" />
                    <span>Voltar a Todos os Módulos</span>
                  </button>

                  <div className="flex items-center gap-2.5">
                    <span className="rounded-full text-xs font-semibold px-3 py-1 bg-slate-800 text-slate-300">
                      Módulo {currentModuleIndex + 1} de {course.modules.length}
                    </span>

                    <button
                      type="button"
                      onClick={() => markModuleComplete(course.id, currentModule.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isCurrentModuleDone
                          ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                          : 'bg-purple-600 hover:bg-purple-500 text-white shadow-sm'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isCurrentModuleDone ? 'Módulo Concluído' : 'Marcar como Concluído'}</span>
                    </button>
                  </div>
                </div>

                {/* Conteúdo Completo do Módulo */}
                <div className="w-full bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 md:p-8 backdrop-blur-md space-y-6 shadow-xl">
                  
                  {/* Cabeçalho do Módulo */}
                  <div className="space-y-2 border-b border-slate-800 pb-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                      Módulo {currentModuleIndex + 1} • {currentModule.estimatedMinutes || 15} minutos estimados
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                      {currentModule.title}
                    </h2>
                    {currentModule.summary && (
                      <p className="text-sm text-slate-300 font-normal leading-relaxed pt-1">
                        {currentModule.summary}
                      </p>
                    )}
                  </div>

                  {/* Seções Internas */}
                  <div className="space-y-6 pt-2">
                    {currentModule.content.sections.map((section, sIdx) => (
                      <div key={sIdx} className="space-y-3 pt-4 border-t border-slate-800/60 first:border-t-0 first:pt-0">
                        <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
                          <ChevronRight className="w-4 h-4 text-purple-400 shrink-0" />
                          <span>{section.subheading}</span>
                        </h3>

                        <div className="space-y-3 text-sm text-slate-300 leading-relaxed font-normal">
                          {section.body.map((p, pIdx) => {
                            if (p.startsWith('• ')) {
                              const colonIdx = p.indexOf(':');
                              const hasTitle = colonIdx !== -1;
                              const title = hasTitle ? p.slice(2, colonIdx).trim() : null;
                              const desc = hasTitle ? p.slice(colonIdx + 1).trim() : p.slice(2).trim();

                              return (
                                <div 
                                  key={pIdx} 
                                  className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 flex items-start gap-2.5 my-2"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                                  <div className="text-sm text-slate-300 leading-relaxed">
                                    {title && (
                                      <strong className="font-semibold text-white mr-1.5">
                                        {title}:
                                      </strong>
                                    )}
                                    <span>{desc}</span>
                                  </div>
                                </div>
                              );
                            }

                            return <p key={pIdx}>{p}</p>;
                          })}
                        </div>

                        {section.highlightBox && (
                          <div className="mt-4 border-l-2 border-purple-500 bg-purple-950/20 px-4 py-3 rounded-r-xl space-y-1 text-sm border border-y-0 border-r-0">
                            <div className="font-semibold text-purple-300">
                              {section.highlightBox.title}
                            </div>
                            <p className="text-slate-300 leading-relaxed text-sm">
                              {section.highlightBox.text}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Rodapé de Navegação Entre Módulos */}
                  <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    {currentModuleIndex > 0 ? (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedModuleId(course.modules[currentModuleIndex - 1].id);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Módulo Anterior</span>
                      </button>
                    ) : (
                      <div />
                    )}

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => markModuleComplete(course.id, currentModule.id)}
                        className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                          isCurrentModuleDone
                            ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{isCurrentModuleDone ? 'Concluído' : 'Marcar Concluído'}</span>
                      </button>

                      {currentModuleIndex < course.modules.length - 1 ? (
                        <button
                          type="button"
                          onClick={() => {
                            if (!isCurrentModuleDone) {
                              markModuleComplete(course.id, currentModule.id);
                            }
                            setSelectedModuleId(course.modules[currentModuleIndex + 1].id);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="w-full sm:w-auto px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md shadow-purple-600/20"
                        >
                          <span>Próximo Módulo</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            if (!isCurrentModuleDone) {
                              markModuleComplete(course.id, currentModule.id);
                            }
                            setSelectedModuleId(null);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="w-full sm:w-auto px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                        >
                          <span>Concluir Todos os Módulos</span>
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            )
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. AVALIAÇÃO FINAL (QUIZ INTERATIVO)                                      */}
      {/* ========================================================================= */}
      {activeTab === 'QUIZ' && (
        <div className="w-full bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 md:p-8 space-y-6 backdrop-blur-md shadow-xl animate-fadeIn">
          
          <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 mb-1">
                <HelpCircle className="w-4 h-4" />
                <span>Avaliação Oficial do Curso</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Prova de Fixação: {course.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Nota mínima para certificação: <strong>{isEquilibrio ? '2 acertos' : '70% de aproveitamento'}</strong>.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('AULA')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar aos Módulos</span>
            </button>
          </div>

          {/* Feedback de Resultado */}
          {quizSubmitted && (
            <div className={`p-4 rounded-xl border text-xs sm:text-sm font-medium flex items-center justify-between gap-4 ${
              quizPassedState
                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
                : 'bg-amber-950/40 border-amber-500/30 text-amber-200'
            }`}>
              <div className="space-y-1">
                <div className="font-semibold flex items-center gap-2 text-sm sm:text-base">
                  {quizPassedState ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertTriangle className="w-5 h-5 text-amber-400" />}
                  <span>{quizPassedState ? `Aprovado com ${quizScore}%!` : `Nota: ${quizScore}%. Você precisa de aprovação para validar o selo.`}</span>
                </div>
                <p className="text-xs opacity-90">
                  {quizPassedState 
                    ? 'Parabéns! Sua certificação oficial foi homologada no sistema.' 
                    : 'Revise os tópicos dos módulos e tente novamente.'}
                </p>
              </div>

              {!quizPassedState && (
                <button
                  type="button"
                  onClick={handleRetakeQuiz}
                  className="px-3.5 py-1.5 rounded-md bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refazer Prova</span>
                </button>
              )}
            </div>
          )}

          {/* Questões do Quiz */}
          <div className="space-y-5 pt-1">
            {course.quiz.map((q, idx) => {
              const selectedOption = userQuizAnswers[q.id];
              const isCorrect = selectedOption === q.correct;

              return (
                <div 
                  key={q.id || idx}
                  className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <h3 className="text-sm sm:text-base font-semibold text-white leading-snug">
                      {q.question}
                    </h3>
                  </div>

                  <div className="space-y-2 pt-1 sm:pl-8">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = selectedOption === oIdx;
                      let optionClasses = 'border-slate-800 bg-slate-900/40 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60';

                      if (isSelected) {
                        optionClasses = 'border-purple-500 bg-purple-950/30 text-white';
                      }

                      if (quizSubmitted) {
                        if (oIdx === q.correct) {
                          optionClasses = 'border-emerald-500/60 bg-emerald-950/30 text-emerald-200';
                        } else if (isSelected && !isCorrect) {
                          optionClasses = 'border-rose-500/60 bg-rose-950/30 text-rose-200';
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          type="button"
                          onClick={() => handleAnswerSelect(q.id, oIdx)}
                          disabled={quizSubmitted}
                          className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition-all flex items-start gap-2.5 cursor-pointer ${optionClasses}`}
                        >
                          <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] shrink-0 mt-0.5 ${
                            isSelected ? 'border-purple-400 bg-purple-600 text-white' : 'border-slate-700'
                          }`}>
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="leading-relaxed">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && q.explanation && (
                    <div className="mt-2 ml-0 sm:ml-8 p-3 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
                      <strong className="font-semibold text-white">Explicação Técnica:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!quizSubmitted ? (
            <div className="pt-3 flex justify-end">
              <button
                type="button"
                onClick={handleSubmitQuiz}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md"
              >
                <Check className="w-4 h-4" />
                <span>Enviar Respostas</span>
              </button>
            </div>
          ) : quizPassedState && (
            <div className="pt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setIsCertificateModalOpen(true)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md"
              >
                <Award className="w-4 h-4" />
                <span>Ver Certificado Oficial</span>
              </button>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MODAL DE EXPANSÃO DA IMAGEM                                            */}
      {/* ========================================================================= */}
      {isImageExpanded && (
        <div 
          onClick={() => setIsImageExpanded(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-fadeIn cursor-zoom-out"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col space-y-3 max-h-[92vh] cursor-default"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-white font-semibold text-sm">
                Material Visual: {course.title}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadInfografico}
                  className="px-3 py-1 rounded-md bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsImageExpanded(false)}
                  className="p-1 rounded-md text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="overflow-auto max-h-[75vh] flex items-center justify-center p-2">
              <img
                src={isEquilibrio ? '/mapa-mental-equilibrio.png' : '/mapa-mental-orcamento.png'}
                alt="Mapa Mental Expandido"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.triedFallback) {
                    target.dataset.triedFallback = 'true';
                    target.src = isEquilibrio ? '/api/course-image?course=equilibrio' : '/api/course-image';
                  }
                }}
                className="w-full h-auto object-contain rounded-xl max-w-4xl"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. MODAL DE CERTIFICADO OFICIAL                                           */}
      {/* ========================================================================= */}
      {isCertificateModalOpen && (
        <div 
          onClick={() => setIsCertificateModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-lg w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-center space-y-5 shadow-2xl relative"
          >
            <div className="w-14 h-14 mx-auto rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Award className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                Certificação Homologada
              </span>
              <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                {isEquilibrio ? 'SELO DE INTELIGÊNCIA EMOCIONAL' : isOrcamento ? 'Certificado de Educação Financeira' : 'Certificado de Conclusão'}
              </h3>
              <p className="text-xs text-slate-400">
                A plataforma <strong>SkillHub Curitiba &amp; RMC</strong> confere a:
              </p>
              <div className="text-base font-bold text-white underline py-1">
                {studentName}
              </div>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                O selo oficial de <strong>{course.badgeName}</strong> pelo curso <strong>"{course.title}"</strong>.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-left bg-slate-800/40 p-3.5 rounded-xl border border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Carga Horária:</span>
                <strong className="text-white font-medium">{course.hours === 1 ? '1 hora' : `${course.hours} horas`}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Aproveitamento:</span>
                <strong className="text-emerald-400 font-medium">{quizScore || 100}%</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Data:</span>
                <strong className="text-white font-medium">{new Date().toLocaleDateString('pt-BR')}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Código:</span>
                <strong className="text-purple-400 font-mono text-[10px]">SKILL-PR-2026</strong>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setIsCertificateModalOpen(false);
                  setCurrentView('BADGES_PERFIL');
                }}
                className="w-full py-2.5 px-4 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md transition-colors cursor-pointer"
              >
                Ver Minha Carteira de Badges
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsCertificateModalOpen(false);
                  setCurrentView('DASHBOARD');
                }}
                className="w-full py-2 px-4 rounded-full border border-slate-800 text-slate-300 hover:bg-slate-800 text-xs font-medium transition-colors cursor-pointer"
              >
                Voltar ao Painel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. ANIMAÇÃO DE CELEBRAÇÃO (CONFETTI)                                      */}
      {/* ========================================================================= */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-purple-500/10 backdrop-blur-[1px] animate-pulse" />
          <div className="flex flex-col items-center justify-center space-y-3 animate-bounce select-none">
            <div className="text-6xl sm:text-8xl">🎉 🌟 🎊</div>
            <div className="px-6 py-2 rounded-full bg-purple-600 text-white font-extrabold text-sm sm:text-base shadow-2xl border border-purple-400">
              PARABÉNS! CERTIFICAÇÃO CONQUISTADA COM SUCESSO!
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
