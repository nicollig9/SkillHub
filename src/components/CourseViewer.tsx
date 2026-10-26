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
  ArrowRight, 
  ArrowLeft,
  GraduationCap,
  Sparkles,
  Info,
  Maximize2,
  Download,
  Play,
  Lock,
  Unlock,
  DollarSign,
  Compass,
  X,
  RefreshCw,
  FileText
} from 'lucide-react';

export default function CourseViewer() {
  const { 
    selectedCourseId, 
    setCurrentView,
    showToast,
    completedModules,
    quizResults,
    markModuleComplete,
    submitCourseQuiz,
    completeCourseAndClaimBadge,
    cursosInscritos,
    badgesConquistadas,
    horasEstudadas,
    currentUser,
    student
  } = useApp();

  // Seleciona o curso ativo (se selecionado, ou o de Orçamento por padrão)
  const course = 
    COURSES.find((c) => c.id === selectedCourseId) || 
    COURSES.find((c) => c.id === 'orcamento-primeiro-salarial') || 
    COURSES.find((c) => c.id === 'curso-orcamento-primeiro-salario') || 
    COURSES[0];

  const isOrcamento = course.id === 'curso-orcamento-primeiro-salario' || course.id === 'orcamento-primeiro-salarial';

  // =========================================================================
  // ESTADOS GERAIS
  // =========================================================================
  const [activeTab, setActiveTab] = useState<'AULA' | 'QUIZ'>('AULA');
  const [isImageExpanded, setIsImageExpanded] = useState<boolean>(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState<boolean>(false);
  const [downloadingPdf, setDownloadingPdf] = useState<boolean>(false);

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

  // =========================================================================
  // CRONÔMETRO DE LEITURA (EXCLUSIVO PARA "ORÇAMENTO DO PRIMEIRO SALÁRIO")
  // =========================================================================
  const INITIAL_TIMER_SECONDS = 180; // 03:00 min
  const [timeLeft, setTimeLeft] = useState<number>(INITIAL_TIMER_SECONDS);
  const isTimerFinished = timeLeft === 0;

  useEffect(() => {
    if (!isOrcamento) return;

    // Se já foi aprovado anteriormente, libera direto
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
  }, [course.id, isOrcamento, isQuizPassedInContext, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSkipTimerForTesting = () => {
    setTimeLeft(0);
    showToast('Timer Concluído para Testes', 'O Quiz do curso foi liberado para validação imediata!', 'info');
  };

  // Download do PDF
  const handleDownloadInfografico = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloadingPdf(true);
    setTimeout(() => {
      setDownloadingPdf(false);
      showToast(
        'Infográfico em PDF Gerado!',
        `O mapa mental de "${course.title}" foi enviado para download no seu dispositivo em alta resolução.`,
        'success'
      );
    }, 800);
  };

  // Submissão do Quiz
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
    const passed = scorePct >= 70;

    setQuizScore(scorePct);
    setQuizSubmitted(true);
    setQuizPassedState(passed);

    const answersArray = questions.map((q) => userQuizAnswers[q.id] ?? 0);
    submitCourseQuiz(course.id, scorePct, answersArray);

    if (passed) {
      completeCourseAndClaimBadge(course.id);
      setIsCertificateModalOpen(true);
    }
  };

  const handleRetakeQuiz = () => {
    setUserQuizAnswers({});
    setQuizSubmitted(false);
  };

  const studentName = currentUser?.nome || student?.nome || 'Jovem Aprendiz';

  return (
    <div className="space-y-8 max-w-5xl w-full mx-auto flex flex-col items-center pb-20 animate-fadeIn">
      
      {/* ========================================================================= */}
      {/* BREADCRUMB DE NAVEGAÇÃO                                                  */}
      {/* ========================================================================= */}
      <div className="w-full flex items-center justify-between text-xs text-slate-600 dark:text-zinc-400 pb-1">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setCurrentView('CURSOS_DISPONIVEIS')}
            className="hover:text-purple-600 dark:hover:text-white flex items-center gap-1.5 transition-colors font-medium cursor-pointer"
          >
            <GraduationCap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>Catálogo de Cursos</span>
          </button>
          <span>/</span>
          <span className="text-slate-500 dark:text-zinc-500">{course.category}</span>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-semibold truncate max-w-xs sm:max-w-md">{course.title}</span>
        </div>

        <button
          onClick={() => setCurrentView('DASHBOARD')}
          className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar ao Painel</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* CABEÇALHO DO CURSO (COMUM A TODOS OS CURSOS)                              */}
      {/* ========================================================================= */}
      <div className="w-full bg-white dark:bg-[#110E1B] border border-slate-300 dark:border-purple-500/20 rounded-3xl p-6 lg:p-8 shadow-sm dark:shadow-2xl relative overflow-hidden space-y-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
          
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-200 border border-purple-200 dark:border-purple-500/40">
                <Compass className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>{course.category}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
                <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{course.hours}h de Carga Horária</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 dark:bg-zinc-900/80 dark:text-zinc-300 border border-slate-300 dark:border-zinc-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>EAD 100% Gratuito</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {course.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed font-medium">
              {course.subtitle}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <div className="px-3.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-500/40 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span className="text-xs text-amber-900 dark:text-amber-200 font-bold">
                  Selo Oficial: <strong className="text-amber-700 dark:text-amber-300 font-black">{course.badgeName}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Lado Direito: Progresso Geral */}
          <div className="w-full lg:w-80 bg-slate-50 dark:bg-[#160E28] border border-slate-300 dark:border-purple-500/30 rounded-2xl p-5 shadow-sm dark:shadow-xl shrink-0 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-700 dark:text-zinc-300">Status da Aula</span>
                <span className={`font-black ${isCourseCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-purple-600 dark:text-purple-400'}`}>
                  {isCourseCompleted ? '100% Concluído' : `${progressPercent}% em andamento`}
                </span>
              </div>

              <div className="w-full h-2.5 bg-slate-200 dark:bg-[#0D0818] rounded-full overflow-hidden border border-slate-300 dark:border-[#2D1B4E]/60">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    isCourseCompleted 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400' 
                      : 'bg-gradient-to-r from-purple-600 to-indigo-600'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-600 dark:text-zinc-400">
                {isCourseCompleted 
                  ? '✓ Você já resgatou esta certificação oficial.' 
                  : isOrcamento
                  ? 'Complete a leitura do mapa mental e responda ao quiz para conquistar seu selo.'
                  : 'Complete os módulos e obtenha aprovação no Quiz para conquistar seu selo.'}
              </p>
            </div>

            {/* Ação Rápida */}
            {isCourseCompleted ? (
              <button
                onClick={() => setIsCertificateModalOpen(true)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>Ver Certificado Homologado ✓</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  if (!isOrcamento || isTimerFinished) {
                    setActiveTab('QUIZ');
                    const quizSec = document.getElementById('quiz-section');
                    if (quizSec) quizSec.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                disabled={isOrcamento && !isTimerFinished}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  isOrcamento && !isTimerFinished
                    ? 'bg-slate-200 dark:bg-zinc-800 text-slate-500 dark:text-zinc-500 cursor-not-allowed opacity-80'
                    : 'bg-purple-600 hover:bg-purple-500 text-white shadow-sm hover:scale-[1.02] cursor-pointer'
                }`}
              >
                {isOrcamento && !isTimerFinished ? (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Quiz Bloqueado ({formatTime(timeLeft)})</span>
                  </>
                ) : (
                  <>
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Fazer Quiz do Curso</span>
                  </>
                )}
              </button>
            )}
          </div>

        </div>

        {/* ===================================================================== */}
        {/* MAPA MENTAL INTEGRAL — EXCLUSIVO DO CURSO "ORÇAMENTO DO PRIMEIRO SALÁRIO" */}
        {/* ===================================================================== */}
        {isOrcamento && (
          <div className="pt-2 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Material Visual de Apoio — Mapa Mental Original</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsImageExpanded(true)}
                  className="px-3 py-1 rounded-xl text-xs font-medium border border-purple-300 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/50 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>Expandir</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadInfografico}
                  disabled={downloadingPdf}
                  className="px-3 py-1 rounded-xl text-xs font-medium border border-slate-300 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3 h-3" />
                  <span>{downloadingPdf ? 'Baixando...' : 'Baixar PDF'}</span>
                </button>
              </div>
            </div>

            {/* MOLDURA SAAS MINIMALISTA (ADAPTAÇÃO MODO CLARO & ESCURO) */}
            <div 
              onClick={() => setIsImageExpanded(true)}
              className="bg-white/80 border border-slate-200 shadow-md p-3 dark:bg-slate-900/40 dark:border-purple-500/20 dark:shadow-lg dark:backdrop-blur-sm rounded-2xl group cursor-pointer transition-all hover:border-purple-400/50 flex items-center justify-center relative overflow-hidden"
            >
              <img
                src="/mapa-mental-orcamento.svg"
                alt="Mapa Mental: Orçamento do Primeiro Salário"
                className="w-full h-auto object-contain max-h-[500px] rounded-2xl transition-transform duration-300 group-hover:scale-[1.01]"
              />

              <div className="absolute inset-0 bg-purple-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 text-white text-xs font-bold flex items-center gap-1.5 shadow-xl border border-purple-500/40">
                  <Maximize2 className="w-3.5 h-3.5 text-purple-300" />
                  <span>Clique para Visualizar em Tela Cheia</span>
                </span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* CORPO DA AULA (CONTEÚDO DOS MÓDULOS)                                      */}
      {/* ========================================================================= */}
      <div className="w-full space-y-6">
        
        {/* Barra de Tabs para os outros cursos (ou título dos módulos) */}
        {!isOrcamento && (
          <div className="w-full flex items-center gap-2 border-b border-slate-200 dark:border-purple-500/20 pb-2">
            <button
              onClick={() => setActiveTab('AULA')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'AULA'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Módulos do Curso ({course.modules.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('QUIZ')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'QUIZ'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-white'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Avaliação Final (Quiz)</span>
            </button>
          </div>
        )}

        {/* LISTA DE MÓDULOS (RENDERIZADA NA TAB AULA OU SEMPRE NO ORÇAMENTO) */}
        {(activeTab === 'AULA' || isOrcamento) && (
          <div className="space-y-6">
            {course.modules.map((module, mIdx) => {
              const isModuleDone = completedInCourse.includes(module.id);

              return (
                <div 
                  key={module.id || mIdx}
                  className="bg-white dark:bg-[#120B20] border border-slate-300 dark:border-purple-500/20 hover:border-purple-400 dark:hover:border-purple-500/40 rounded-3xl p-6 sm:p-8 space-y-5 transition-all shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-purple-500/20 pb-4">
                    <div className="flex items-center gap-3.5">
                      <span className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-500/40 text-purple-700 dark:text-purple-300 text-sm font-black flex items-center justify-center shrink-0 shadow-sm">
                        {String(mIdx + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">
                          Módulo #{mIdx + 1} • {module.estimatedMinutes} min
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                          {module.title}
                        </h3>
                      </div>
                    </div>

                    {!isOrcamento && (
                      <button
                        onClick={() => markModuleComplete(course.id, module.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer self-start sm:self-auto ${
                          isModuleDone 
                            ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40' 
                            : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-purple-100 dark:hover:bg-purple-900/40 hover:text-purple-700'
                        }`}
                      >
                        <CheckCircle2 className={`w-3.5 h-3.5 ${isModuleDone ? 'text-emerald-500' : 'text-slate-400'}`} />
                        <span>{isModuleDone ? 'Concluído' : 'Marcar como Concluído'}</span>
                      </button>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 font-medium italic">
                    "{module.summary}"
                  </p>

                  <div className="space-y-4 pt-1">
                    {module.content.sections.map((section, sIdx) => (
                      <div key={sIdx} className="space-y-2.5 bg-slate-50 dark:bg-[#170E28] p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-purple-500/15">
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-purple-500" />
                          <span>{section.subheading}</span>
                        </h4>

                        <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
                          {section.body.map((p, pIdx) => (
                            <p key={pIdx}>{p}</p>
                          ))}
                        </div>

                        {section.highlightBox && (
                          <div className={`mt-3 p-3 rounded-xl border text-xs ${
                            section.highlightBox.type === 'warning'
                              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-500/40 text-amber-900 dark:text-amber-200'
                              : section.highlightBox.type === 'calc'
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-500/40 text-emerald-900 dark:text-emerald-200'
                              : 'bg-purple-50 dark:bg-purple-950/40 border-purple-300 dark:border-purple-500/40 text-purple-900 dark:text-purple-200'
                          }`}>
                            <div className="font-bold flex items-center gap-1.5 mb-1">
                              {section.highlightBox.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                              {section.highlightBox.type === 'calc' && <DollarSign className="w-4 h-4 text-emerald-500" />}
                              {section.highlightBox.type === 'info' && <Info className="w-4 h-4 text-purple-400" />}
                              <span>{section.highlightBox.title}</span>
                            </div>
                            <p>{section.highlightBox.text}</p>
                          </div>
                        )}

                        {section.asciiDiagram && (
                          <div className="mt-3 p-3 bg-slate-950 rounded-xl border border-purple-500/20 overflow-x-auto text-[11px] font-mono text-purple-200">
                            <pre>{section.asciiDiagram}</pre>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* 3. CARD DE VÍDEO COMPLEMENTAR & TIMER (EXCLUSIVO DO ORÇAMENTO)           */}
      {/* ========================================================================= */}
      {isOrcamento && (
        <div className="w-full space-y-6">
          
          {/* CARD DE VÍDEO COMPLEMENTAR (SEM VERMELHO, EM TONS DE ROXO / SLATE) */}
          <div className="w-full bg-slate-50 dark:bg-[#150E28] border border-slate-200 dark:border-purple-500/20 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center shrink-0 text-purple-600 dark:text-purple-400">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 font-medium leading-relaxed">
                Se você quiser aprender mais sobre como administrar seus ganhos, assista ao vídeo complementar:
              </p>
            </div>

            {/* Botão estilo Pílula/SaaS */}
            <a
              href="https://youtu.be/CIdkEei-BdU?si=V5_UIYlhtdcZjtEZ"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-5 py-2.5 rounded-full transition-all shadow-sm flex items-center gap-2 text-xs sm:text-sm shrink-0 whitespace-nowrap cursor-pointer hover:scale-[1.02]"
            >
              <span>🎬 Assistir no YouTube: Como usar o seu primeiro salário? ➔</span>
            </a>
          </div>

          {/* TIMER DE LEITURA & LIBERAÇÃO DO QUIZ */}
          <div id="quiz-section" className="w-full bg-white dark:bg-[#110E1B] border border-slate-300 dark:border-purple-500/20 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold">
                  {isTimerFinished ? (
                    <span className="text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                      <Unlock className="w-4 h-4 text-emerald-500" />
                      <span>Tempo mínimo concluído! Quiz oficial liberado.</span>
                    </span>
                  ) : (
                    <span className="text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-purple-500 animate-pulse" />
                      <span>⏱️ Tempo mínimo para leitura e vídeo: {formatTime(timeLeft)} min</span>
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 dark:text-zinc-400">
                  {isTimerFinished 
                    ? 'O Quiz está pronto para ser respondido. Acerte pelo menos 70% para emitir sua Badge Oficial.' 
                    : 'Revise o mapa mental e os módulos com calma. O botão do Quiz será liberado quando o cronômetro zerar.'}
                </p>

                {!isTimerFinished && (
                  <button
                    type="button"
                    onClick={handleSkipTimerForTesting}
                    className="text-[10px] text-purple-600 dark:text-purple-400 hover:underline cursor-pointer block pt-1 font-medium"
                    title="Atalho de validação rápida"
                  >
                    (Pular tempo para teste de validação ⚡)
                  </button>
                )}
              </div>

              {/* Botão de Fazer o Quiz */}
              <button
                type="button"
                onClick={() => {
                  if (isTimerFinished) {
                    setActiveTab('QUIZ');
                  }
                }}
                disabled={!isTimerFinished && !isCourseCompleted}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  isCourseCompleted
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer shadow-sm'
                    : isTimerFinished
                    ? 'bg-purple-600 hover:bg-purple-700 text-white cursor-pointer shadow-sm hover:scale-[1.02]'
                    : 'bg-slate-200 dark:bg-zinc-800 text-slate-500 dark:text-zinc-500 cursor-not-allowed opacity-75'
                }`}
              >
                {isCourseCompleted ? (
                  <>
                    <Award className="w-4 h-4" />
                    <span>Ver Certificado Conquistado ✓</span>
                  </>
                ) : isTimerFinished ? (
                  <>
                    <HelpCircle className="w-4 h-4" />
                    <span>📝 Fazer Quiz do Curso ➔</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>📝 Fazer Quiz do Curso (Bloqueado: {formatTime(timeLeft)})</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. SEÇÃO DO QUIZ INTERATIVO (QUANDO ACIONADO OU TAB SELECIONADA)          */}
      {/* ========================================================================= */}
      {activeTab === 'QUIZ' && (
        <div className="w-full bg-white dark:bg-[#110E1B] border border-purple-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl animate-fadeIn">
          
          <div className="border-b border-slate-200 dark:border-purple-500/20 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400 mb-1">
                <HelpCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Avaliação Oficial do Curso</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                📝 Quiz: {course.title}
              </h2>
              <p className="text-xs text-slate-600 dark:text-zinc-300 mt-1">
                Responda com atenção. Nota mínima de corte para homologação do selo: <strong>≥ 70%</strong>.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('AULA')}
              className="text-xs font-bold text-slate-600 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar para a Aula</span>
            </button>
          </div>

          {/* Feedback de Resultado */}
          {quizSubmitted && (
            <div className={`p-4 rounded-2xl border text-xs sm:text-sm font-medium flex items-center justify-between gap-4 ${
              quizPassedState
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-500/40 text-emerald-900 dark:text-emerald-200'
                : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-500/40 text-amber-900 dark:text-amber-200'
            }`}>
              <div className="space-y-1">
                <div className="font-bold flex items-center gap-2 text-sm sm:text-base">
                  {quizPassedState ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <AlertTriangle className="w-5 h-5 text-amber-500" />}
                  <span>{quizPassedState ? `Aprovado com ${quizScore}%!` : `Nota: ${quizScore}%. Você precisa de 70% para aprovação.`}</span>
                </div>
                <p className="text-xs opacity-90">
                  {quizPassedState 
                    ? 'Parabéns! Sua certificação foi homologada e o selo já está ativo no seu perfil.' 
                    : 'Revise o conteúdo e tente novamente.'}
                </p>
              </div>

              {!quizPassedState && (
                <button
                  type="button"
                  onClick={handleRetakeQuiz}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0 shadow-sm"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refazer Quiz</span>
                </button>
              )}
            </div>
          )}

          {/* Questões */}
          <div className="space-y-6 pt-2">
            {course.quiz.map((q, idx) => {
              const selectedOption = userQuizAnswers[q.id];
              const isCorrect = selectedOption === q.correct;

              return (
                <div 
                  key={q.id || idx}
                  className="bg-slate-50 dark:bg-[#150D27] border border-slate-200 dark:border-purple-500/20 rounded-2xl p-5 space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-xl bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-500/40 text-purple-700 dark:text-purple-300 text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {q.question}
                    </h3>
                  </div>

                  <div className="space-y-2 pl-0 sm:pl-10">
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = selectedOption === optIdx;
                      let optionClasses = 'border-slate-200 dark:border-purple-500/15 bg-white dark:bg-[#1A1032] text-slate-700 dark:text-zinc-200 hover:border-purple-400';

                      if (quizSubmitted) {
                        if (optIdx === q.correct) {
                          optionClasses = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-bold';
                        } else if (isOptionSelected && !isCorrect) {
                          optionClasses = 'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200';
                        } else {
                          optionClasses = 'opacity-50 border-slate-200 dark:border-zinc-800 text-slate-500';
                        }
                      } else if (isOptionSelected) {
                        optionClasses = 'border-purple-500 bg-purple-50 dark:bg-purple-950/60 text-purple-900 dark:text-purple-100 font-bold shadow-sm';
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleAnswerSelect(q.id, optIdx)}
                          disabled={quizSubmitted}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm flex items-center gap-3 transition-all cursor-pointer ${optionClasses}`}
                        >
                          <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 ${
                            isOptionSelected 
                              ? 'border-purple-500 bg-purple-600 text-white font-bold' 
                              : 'border-slate-300 dark:border-zinc-600 text-slate-400'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="leading-relaxed flex-1">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && q.explanation && (
                    <div className="mt-2 ml-0 sm:ml-10 p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/20 text-xs text-slate-700 dark:text-zinc-300">
                      <strong>💡 Explicação:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!quizSubmitted ? (
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleSubmitQuiz}
                className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Enviar Respostas e Avaliar</span>
              </button>
            </div>
          ) : quizPassedState && (
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setIsCertificateModalOpen(true)}
                className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Award className="w-5 h-5" />
                <span>Visualizar Certificado Oficial</span>
              </button>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL FULLSCREEN DE EXPANSÃO DA IMAGEM DO MAPA MENTAL                     */}
      {/* ========================================================================= */}
      {isImageExpanded && (
        <div 
          onClick={() => setIsImageExpanded(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 animate-fadeIn cursor-zoom-out"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-6xl w-full bg-[#110E1B] border border-purple-500/40 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col space-y-4 max-h-[92vh] cursor-default"
          >
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Mapa Mental em Alta Definição — {course.title}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadInfografico}
                  className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsImageExpanded(false)}
                  className="p-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-all cursor-pointer"
                  title="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="overflow-auto max-h-[75vh] rounded-2xl border border-purple-500/20 bg-slate-950 flex items-center justify-center p-2">
              <img
                src="/mapa-mental-orcamento.svg"
                alt="Mapa Mental Expandido"
                className="w-full h-auto min-w-[800px] object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL DE CERTIFICADO & SELO OFICIAL                                      */}
      {/* ========================================================================= */}
      {isCertificateModalOpen && (
        <div 
          onClick={() => setIsCertificateModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-xl w-full bg-white dark:bg-[#120B20] border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-2xl relative"
          >
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-purple-600 p-0.5 shadow-2xl">
              <div className="w-full h-full bg-white dark:bg-[#120B20] rounded-[22px] flex items-center justify-center text-emerald-500">
                <Award className="w-10 h-10 animate-bounce" />
              </div>
            </div>

            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40 uppercase tracking-wider">
                ✓ Certificação Oficial Homologada
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {isOrcamento ? 'Certificado de Educação Financeira' : `Certificado de Conclusão`}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300">
                A plataforma <strong>SkillHub Curitiba &amp; RMC</strong> confere a:
              </p>
              <div className="text-lg sm:text-xl font-black text-purple-600 dark:text-purple-300 underline py-1">
                {studentName}
              </div>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed max-w-md mx-auto">
                O selo oficial de <strong>{course.badgeName}</strong> correspondente ao curso <strong>"{course.title}"</strong>.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-left bg-slate-50 dark:bg-[#18102A] p-4 rounded-2xl border border-slate-200 dark:border-purple-500/20 text-xs">
              <div>
                <span className="text-slate-500 dark:text-zinc-400 block text-[11px]">Carga Horária:</span>
                <strong className="text-slate-800 dark:text-white font-bold">{course.hours} horas computadas</strong>
              </div>
              <div>
                <span className="text-slate-500 dark:text-zinc-400 block text-[11px]">Aproveitamento:</span>
                <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{quizScore || 100}% de acerto</strong>
              </div>
              <div>
                <span className="text-slate-500 dark:text-zinc-400 block text-[11px]">Data de Emissão:</span>
                <strong className="text-slate-800 dark:text-white font-bold">{new Date().toLocaleDateString('pt-BR')}</strong>
              </div>
              <div>
                <span className="text-slate-500 dark:text-zinc-400 block text-[11px]">Código Verificador:</span>
                <strong className="text-purple-600 dark:text-purple-400 font-mono text-[10px]">SKILL-PR-2026-VAL</strong>
              </div>
            </div>

            {/* Contadores em tempo real */}
            <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-500/30 rounded-2xl p-4 text-xs space-y-2 text-left">
              <div className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5 pb-1 border-b border-emerald-200 dark:border-emerald-500/20">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                <span>Atualização em Tempo Real no Seu Perfil:</span>
              </div>
              <div className="flex justify-between items-center text-slate-700 dark:text-zinc-300">
                <span>Cursos Concluídos:</span>
                <strong className="text-purple-700 dark:text-purple-300 font-bold">
                  {cursosInscritos.filter((c) => c.status === 'concluido').length} curso(s) (+1)
                </strong>
              </div>
              <div className="flex justify-between items-center text-slate-700 dark:text-zinc-300">
                <span>Badges Validadas:</span>
                <strong className="text-amber-700 dark:text-amber-300 font-bold">
                  {badgesConquistadas.length} selo(s) (+1)
                </strong>
              </div>
              <div className="flex justify-between items-center text-slate-700 dark:text-zinc-300">
                <span>Horas de Formação:</span>
                <strong className="text-emerald-700 dark:text-emerald-300 font-bold">
                  {horasEstudadas}h computadas
                </strong>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsCertificateModalOpen(false);
                  setCurrentView('BADGES_PERFIL');
                }}
                className="w-full py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>Ver Minha Carteira de Badges</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsCertificateModalOpen(false);
                  setCurrentView('DASHBOARD');
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-300 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 text-xs font-bold transition-all cursor-pointer"
              >
                Voltar para o Painel Principal
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
