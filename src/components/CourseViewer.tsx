'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { COURSES } from '@/data/coursesData';
import { 
  BookOpen, 
  CheckCircle2, 
  Award, 
  Clock, 
  AlertTriangle, 
  ShieldAlert, 
  Check, 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft,
  Scale,
  DollarSign,
  Building,
  User,
  GraduationCap,
  Sparkles,
  Info,
  Layers,
  Lock,
  Unlock,
  ChevronDown,
  ChevronUp,
  MapPin,
  FileText,
  Download,
  Lightbulb,
  Share2,
  ExternalLink
} from 'lucide-react';

export default function CourseViewer() {
  const { 
    selectedCourseId, 
    activeModuleIndex, 
    setActiveModuleIndex, 
    markModuleComplete, 
    completedModules, 
    submitCourseQuiz, 
    quizResults,
    setCurrentView,
    showToast
  } = useApp();

  const course = COURSES.find((c) => c.id === selectedCourseId) || COURSES[0];

  const [activeTab, setActiveTab] = useState<'MODULES' | 'CASE_STUDIES' | 'QUIZ'>('MODULES');
  const [isReadingMode, setIsReadingMode] = useState<boolean>(false);
  const [expandedDesc, setExpandedDesc] = useState<Record<string, boolean>>({});
  const [selectedCaseIdx, setSelectedCaseIdx] = useState<number>(0);
  const [caseAnswers, setCaseAnswers] = useState<Record<string, number>>({});
  const [userQuizAnswers, setUserQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [showInterviewTips, setShowInterviewTips] = useState<boolean>(false);

  const currentModule = course.modules[activeModuleIndex] || course.modules[0];
  const completedList = completedModules[course.id] || [];

  const handleNextModule = () => {
    markModuleComplete(course.id, currentModule.id);
    if (activeModuleIndex < course.modules.length - 1) {
      setActiveModuleIndex(activeModuleIndex + 1);
    } else {
      if (course.caseStudies && course.caseStudies.length > 0) {
        setActiveTab('CASE_STUDIES');
        setIsReadingMode(false);
      } else {
        setActiveTab('QUIZ');
        setIsReadingMode(false);
      }
    }
  };

  const handlePrevModule = () => {
    if (activeModuleIndex > 0) {
      setActiveModuleIndex(activeModuleIndex - 1);
    }
  };

  const handleCaseOptionSelect = (caseId: string, choiceIdx: number) => {
    setCaseAnswers((prev) => ({ ...prev, [caseId]: choiceIdx }));
  };

  const handleQuizOptionSelect = (questionId: number, optionIdx: number) => {
    if (quizSubmitted) return;
    setUserQuizAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleQuizSubmit = () => {
    let correctCount = 0;
    const answersArray: number[] = [];

    course.quiz.forEach((q) => {
      const selected = userQuizAnswers[q.id];
      answersArray.push(selected !== undefined ? selected : -1);
      if (selected === q.correct) {
        correctCount++;
      }
    });

    const scorePercentage = Math.round((correctCount / course.quiz.length) * 100);
    submitCourseQuiz(course.id, scorePercentage, answersArray);
    setQuizSubmitted(true);
  };

  const handleRetakeQuiz = () => {
    setUserQuizAnswers({});
    setQuizSubmitted(false);
  };

  const handleDownloadApostila = () => {
    showToast(
      'Download Iniciado',
      `A apostila completa em PDF de "${course.title}" foi enviada para o seu dispositivo.`,
      'success'
    );
  };

  const currentQuizResult = quizResults[course.id];

  const isAllModulesCompleted = course.modules.every((mod) => completedList.includes(mod.id));
  const completedModulesCount = course.modules.filter((mod) => completedList.includes(mod.id)).length;
  const progressPercent = Math.round((completedModulesCount / Math.max(course.modules.length, 1)) * 100);

  // Determinar qual é o próximo módulo a fazer
  const nextUnfinishedIndex = course.modules.findIndex((m) => !completedList.includes(m.id));

  return (
    <div className="space-y-8 max-w-5xl w-full mx-auto flex flex-col items-center pb-16">
      
      {/* ===================================================== */}
      {/* BREADCRUMB DE NAVEGAÇÃO                               */}
      {/* ===================================================== */}
      <div className="w-full flex items-center justify-between text-xs text-zinc-400 pb-1">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setCurrentView('CURSOS_DISPONIVEIS')}
            className="hover:text-white flex items-center gap-1.5 transition-colors font-medium cursor-pointer"
          >
            <GraduationCap className="w-4 h-4 text-purple-400" />
            <span>Catálogo de Cursos</span>
          </button>
          <span>/</span>
          <span className="text-zinc-500">{course.category}</span>
          <span>/</span>
          <span className="text-white font-semibold truncate max-w-xs sm:max-w-md">{course.title}</span>
        </div>
      </div>

      {/* ===================================================== */}
      {/* 1. CABEÇALHO DO CURSO (HERO BANNER COMPLETO)          */}
      {/* ===================================================== */}
      {!isReadingMode && (
        <div className="w-full bg-[#110E1B] border border-[#2D1B4E]/60 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden space-y-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
            
            {/* Lado Esquerdo: Badges de Metadados, Título e Descrição */}
            <div className="space-y-3 max-w-2xl">
              {/* Badges de Metadados */}
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-md border ${
                  course.level === 'Intermediário'
                    ? 'bg-amber-950/60 text-amber-300 border-amber-500/30'
                    : course.level === 'Avançado'
                    ? 'bg-rose-950/60 text-rose-300 border-rose-500/30'
                    : 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
                }`}>
                  {course.level === 'Intermediário' ? '🟡 Nível 2: Intermediário' : course.level === 'Avançado' ? '🔴 Nível 3: Avançado' : '🟢 Nível 1: Iniciante'}
                </span>
                
                <span className="inline-flex items-center gap-1 bg-[#171126] border border-[#2D1B4E] text-zinc-300 text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-md">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Carga Horária: {course.hours}h</span>
                </span>

                <span className="inline-flex items-center gap-1 bg-[#171126] border border-[#2D1B4E] text-zinc-300 text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Certificado Incluso</span>
                </span>

                <span className="inline-flex items-center gap-1 bg-[#171126] border border-purple-500/30 text-purple-300 text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-md">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>Jornada: {course.category}</span>
                </span>
              </div>

              {/* Título Grande */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                {course.title}
              </h1>

              {/* Descrição Curta com Foco em Curitiba & RMC */}
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                {course.subtitle} — Desenvolva competências práticas e comportamentais altamente valorizadas no mercado de trabalho e empresas parceiras de Curitiba e Região Metropolitana.
              </p>
            </div>

            {/* Lado Direito: Card / Widget de Progresso do Curso */}
            <div className="w-full lg:w-80 bg-[#140E24] border border-[#2D1B4E] rounded-2xl p-5 shadow-xl shrink-0 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-zinc-300">Progresso do Curso</span>
                  <span className="text-emerald-400 font-black">{progressPercent}%</span>
                </div>

                <div className="w-full h-2.5 bg-[#0D0818] rounded-full overflow-hidden border border-[#2D1B4E]/60">
                  <div
                    className="h-full bg-gradient-to-r from-[#6D28D9] via-[#8B5CF6] to-emerald-400 transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className="text-[11px] text-zinc-400 flex items-center justify-between pt-0.5">
                  <span>{completedModulesCount}/{course.modules.length} Módulos Concluídos</span>
                  {isAllModulesCompleted && (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="w-3 h-3 stroke-[3]" /> Concluído
                    </span>
                  )}
                </div>
              </div>

              {/* Botão de Ação Principal em Destaque */}
              <button
                type="button"
                onClick={() => {
                  if (isAllModulesCompleted) {
                    setActiveTab('QUIZ');
                    setIsReadingMode(false);
                  } else {
                    const targetIdx = nextUnfinishedIndex !== -1 ? nextUnfinishedIndex : 0;
                    setActiveModuleIndex(targetIdx);
                    setActiveTab('MODULES');
                    setIsReadingMode(true);
                  }
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] hover:from-[#7C3AED] hover:to-[#9D4EDD] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-950/60 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>
                  {completedModulesCount === 0
                    ? 'Iniciar Módulo 1'
                    : isAllModulesCompleted
                    ? 'Ir para Avaliação Final'
                    : 'Continuar de Onde Parou'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Tag Selo Oficial ao Finalizar */}
              <div className="pt-3 border-t border-[#2D1B4E]/60 flex items-center gap-2 text-xs">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-zinc-400 text-[11px]">
                  Selo Oficial: <strong className="text-amber-300 font-semibold">{course.badgeName}</strong>
                </span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ===================================================== */}
      {/* 2. NAVEGAÇÃO POR ABAS (TABS SUPERIORES MODERNAS)      */}
      {/* ===================================================== */}
      {!isReadingMode && (
        <div className="w-full flex flex-wrap items-center justify-start sm:justify-center gap-2.5 border-b border-[#2D1B4E]/60 pb-3">
          
          {/* Aba 1: Módulos do Curso */}
          <button
            onClick={() => {
              setActiveTab('MODULES');
              setIsReadingMode(false);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'MODULES'
                ? 'bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white shadow-lg shadow-purple-950/50 border border-purple-500/40'
                : 'bg-[#140E24] text-zinc-300 hover:text-white hover:bg-[#1C152E] border border-[#2D1B4E]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-purple-300" />
            <span>Módulos do Curso ({course.modules.length})</span>
          </button>

          {/* Aba 2: Estudos de Caso & Prática */}
          {course.caseStudies && course.caseStudies.length > 0 && (
            <button
              onClick={() => {
                setActiveTab('CASE_STUDIES');
                setIsReadingMode(false);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'CASE_STUDIES'
                  ? 'bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white shadow-lg shadow-purple-950/50 border border-purple-500/40'
                  : 'bg-[#140E24] text-zinc-300 hover:text-white hover:bg-[#1C152E] border border-[#2D1B4E]'
              }`}
            >
              <Layers className="w-4 h-4 text-amber-300" />
              <span>Estudos de Caso &amp; Prática ({course.caseStudies.length})</span>
            </button>
          )}

          {/* Aba 3: Avaliação Final (Quiz) */}
          <button
            onClick={() => {
              setActiveTab('QUIZ');
              setIsReadingMode(false);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'QUIZ'
                ? 'bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white shadow-lg shadow-purple-950/50 border border-purple-500/40'
                : isAllModulesCompleted
                ? 'bg-[#140E24] text-zinc-300 hover:text-white hover:bg-[#1C152E] border border-[#2D1B4E]'
                : 'bg-[#0E091A] text-zinc-500 border border-[#2D1B4E]/60 hover:text-zinc-400'
            }`}
          >
            {isAllModulesCompleted ? (
              <HelpCircle className="w-4 h-4 text-emerald-400" />
            ) : (
              <Lock className="w-4 h-4 text-amber-400" />
            )}
            <span>Avaliação Final (Quiz)</span>
            {!isAllModulesCompleted ? (
              <span className="text-[10px] bg-amber-950/60 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
                Bloqueado ({completedModulesCount}/{course.modules.length})
              </span>
            ) : currentQuizResult ? (
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                currentQuizResult.passed ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40' : 'bg-rose-950/80 text-rose-300 border border-rose-500/40'
              }`}>
                {currentQuizResult.score}%
              </span>
            ) : (
              <span className="text-[10px] bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                Liberado
              </span>
            )}
          </button>
        </div>
      )}

      {/* ===================================================== */}
      {/* 3. CONTEÚDO DA ABA 1: LISTAGEM DE MÓDULOS (CARDS)     */}
      {/* ===================================================== */}
      {activeTab === 'MODULES' && !isReadingMode && (
        <div className="w-full space-y-6 flex flex-col items-center">
          
          {/* Subheader da Lista de Módulos */}
          <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2D1B4E]/40 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Módulos do Curso
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                Conteúdos teóricos, metodologias corporativas e exercícios práticos de fixação.
              </p>
            </div>
            
            <div className="flex items-center gap-2 text-xs">
              <span className="text-zinc-400 font-medium">Status:</span>
              <span className="bg-[#171126] border border-[#2D1B4E] text-zinc-300 font-bold px-3 py-1 rounded-full">
                {completedList.length}/{course.modules.length} concluídos ({progressPercent}%)
              </span>
            </div>
          </div>

          {/* Grid de Cards dos Módulos Aprimorados */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
            {course.modules.map((mod, idx) => {
              const isCompleted = completedList.includes(mod.id);
              const isExpanded = !!expandedDesc[mod.id];
              const isCurrentUnfinished = !isCompleted && idx === nextUnfinishedIndex;
              const formattedNumber = String(mod.number).padStart(2, '0');

              return (
                <div
                  key={mod.id}
                  className={`bg-[#140E24] border rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl ${
                    isCompleted
                      ? 'border-emerald-500/40 hover:border-emerald-500/70'
                      : isCurrentUnfinished
                      ? 'border-[#8B5CF6]/70 ring-1 ring-[#8B5CF6]/40 shadow-purple-950/40'
                      : 'border-[#2D1B4E]/60 hover:border-purple-500/40'
                  }`}
                >
                  <div className="space-y-3.5">
                    {/* Linha Superior: Número Destacado + Tag de Status Clara */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="bg-[#1F1535] border border-[#2D1B4E] text-purple-300 text-xs font-black px-3 py-1 rounded-xl uppercase tracking-wider">
                        Módulo {formattedNumber}
                      </span>
                      
                      {isCompleted ? (
                        <span className="bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <Check className="w-3 h-3 stroke-[3]" /> Concluído
                        </span>
                      ) : isCurrentUnfinished ? (
                        <span className="bg-amber-950/60 text-amber-300 border border-amber-500/30 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Em Progresso
                        </span>
                      ) : (
                        <span className="bg-[#171126] text-zinc-400 border border-[#2D1B4E] text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                          Disponível
                        </span>
                      )}
                    </div>

                    {/* Título do Módulo */}
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                      {mod.title.replace(/MÓDULO \d+: /, '')}
                    </h3>

                    {/* Resumo do Módulo */}
                    <p className={`text-xs text-zinc-300/90 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                      {mod.summary}
                    </p>

                    {mod.summary && mod.summary.length > 70 && (
                      <button
                        type="button"
                        onClick={() => setExpandedDesc((prev) => ({ ...prev, [mod.id]: !prev[mod.id] }))}
                        className="text-[11px] text-purple-400 hover:text-white font-bold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>{isExpanded ? 'Ver menos' : 'Ver mais'}</span>
                        <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    )}

                    {/* Checklist: O que o aluno vai aprender */}
                    {mod.content && mod.content.sections && mod.content.sections.length > 0 && (
                      <div className="pt-2 border-t border-[#2D1B4E]/40 space-y-1.5">
                        <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                          Tópicos Aprendidos:
                        </div>
                        <div className="space-y-1">
                          {mod.content.sections.slice(0, 2).map((sec, sIdx) => (
                            <div key={sIdx} className="flex items-start gap-1.5 text-xs text-zinc-300">
                              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{sec.subheading}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Indicador Visual de Atividades & Barra de Progresso */}
                  <div className="space-y-2.5 pt-2 border-t border-[#2D1B4E]/40">
                    <div className="bg-[#0E091A] border border-[#2D1B4E] rounded-xl p-2.5 flex items-center justify-between text-[11px] text-zinc-400">
                      <span className="flex items-center gap-1.5 text-zinc-300 font-medium">
                        <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                        <span>Texto Teórico</span>
                      </span>
                      <span className="text-zinc-600">•</span>
                      <span className="flex items-center gap-1.5 text-zinc-300 font-medium">
                        <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                        <span>7 Atividades</span>
                      </span>
                    </div>

                    {/* Barra de Progresso do Módulo */}
                    <div className="w-full h-1.5 bg-[#0D0818] rounded-full overflow-hidden border border-[#2D1B4E]/60">
                      <div
                        className={`h-full transition-all duration-500 rounded-full ${
                          isCompleted
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-400 w-full'
                            : 'bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] w-0'
                        }`}
                      />
                    </div>

                    {/* Botão Acessar Módulo com estilo Dark/Lilás */}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveModuleIndex(idx);
                        setIsReadingMode(true);
                      }}
                      className="w-full mt-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] hover:from-[#7C3AED] hover:to-[#9D4EDD] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                    >
                      <span>{isCompleted ? 'Revisar Conteúdo' : 'Acessar Módulo'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ===================================================== */}
      {/* MODO LEITURA DO MÓDULO SELECIONADO                    */}
      {/* ===================================================== */}
      {activeTab === 'MODULES' && isReadingMode && (
        <div className="w-full space-y-5">
          {/* Barra Superior de Navegação no Modo Leitura */}
          <div className="w-full bg-[#140E24] border border-[#2D1B4E]/60 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setIsReadingMode(false)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#171126] hover:bg-[#251540] text-zinc-300 hover:text-white text-xs font-bold transition-all border border-[#2D1B4E] shadow cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-purple-400" />
              <span>Voltar para Todos os Módulos</span>
            </button>

            {/* Dropdown seletor rápido */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400 font-bold hidden sm:inline">Módulo Atual:</span>
              <select
                value={activeModuleIndex}
                onChange={(e) => setActiveModuleIndex(Number(e.target.value))}
                className="bg-[#0D0818] border border-[#2D1B4E] text-white text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#8B5CF6]"
              >
                {course.modules.map((m, mIdx) => (
                  <option key={m.id} value={mIdx}>
                    Módulo {m.number}: {m.title.replace(/MÓDULO \d+: /, '')} {completedList.includes(m.id) ? '✓' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Module Content Viewer */}
          <div className="w-full bg-[#110E1B] border border-[#2D1B4E]/60 rounded-3xl p-6 lg:p-8 space-y-6 shadow-2xl">
            <div className="border-b border-[#2D1B4E]/60 pb-4">
              <div className="flex items-center gap-2 text-purple-300 font-bold text-xs uppercase mb-1">
                <span>Módulo {currentModule.number} de {course.modules.length}</span>
              </div>
              <h2 className="text-xl lg:text-2xl font-black text-white">
                {currentModule.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 mt-1">
                {currentModule.summary}
              </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-6">
              {currentModule.content.sections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-3.5">
                  <h3 className="text-base font-bold text-white border-l-4 border-purple-500 pl-3">
                    {section.subheading}
                  </h3>

                  <div className="space-y-2 text-xs lg:text-sm text-zinc-300 leading-relaxed">
                    {section.body.map((paragraph, pIdx) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Visual 1: Triângulo da Aprendizagem */}
                  {section.visualType === 'triangle' && (
                    <div className="my-6 bg-[#0E091A] border border-[#2D1B4E] rounded-2xl p-5 shadow-inner">
                      <div className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-3 flex items-center justify-between">
                        <span>📐 Diagrama do Triângulo da Aprendizagem (Lei nº 10.097/00)</span>
                        <span className="text-[10px] bg-[#171126] text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/20">Interativo</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3 text-center">
                        <div className="bg-[#140E24] border border-[#2D1B4E] rounded-xl p-3.5">
                          <div className="w-10 h-10 mx-auto rounded-full bg-[#1F1535] text-purple-300 flex items-center justify-center font-bold mb-2">
                            <User className="w-5 h-5" />
                          </div>
                          <div className="text-xs font-bold text-white">1. Estudante (Aprendiz)</div>
                          <div className="text-[11px] text-zinc-400 mt-1">
                            14 a 24 anos matriculado no ensino regular.
                          </div>
                        </div>

                        <div className="bg-[#140E24] border border-[#2D1B4E] rounded-xl p-3.5">
                          <div className="w-10 h-10 mx-auto rounded-full bg-[#1F1535] text-purple-300 flex items-center justify-center font-bold mb-2">
                            <Building className="w-5 h-5" />
                          </div>
                          <div className="text-xs font-bold text-white">2. Empresa Contratante</div>
                          <div className="text-[11px] text-zinc-400 mt-1">
                            Prática supervisionada, CTPS, FGTS 2% e salário.
                          </div>
                        </div>

                        <div className="bg-[#140E24] border border-[#2D1B4E] rounded-xl p-3.5">
                          <div className="w-10 h-10 mx-auto rounded-full bg-[#1F1535] text-purple-300 flex items-center justify-center font-bold mb-2">
                            <GraduationCap className="w-5 h-5" />
                          </div>
                          <div className="text-xs font-bold text-white">3. Entidade Formadora</div>
                          <div className="text-[11px] text-zinc-400 mt-1">
                            Sistema S (SENAI, SENAC), CIEE e escolas técnicas.
                          </div>
                        </div>
                      </div>

                      {section.asciiDiagram && (
                        <pre className="bg-[#0A0514] p-3.5 rounded-xl text-purple-300 font-mono text-[11px] overflow-x-auto border border-[#2D1B4E]">
                          {section.asciiDiagram}
                        </pre>
                      )}
                    </div>
                  )}

                  {/* Visual 2: Work Hours Rules */}
                  {section.visualType === 'work-hours' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
                      <div className="bg-[#140E24] border border-[#2D1B4E] rounded-2xl p-4">
                        <div className="text-xs font-bold text-zinc-300 mb-1 flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-purple-400" />
                          <span>Ensino Fundamental &amp; Médio</span>
                        </div>
                        <div className="text-2xl font-black text-white">Máximo 6h / dia</div>
                        <div className="text-[11px] text-zinc-400 mt-1">
                          30h semanais. Vedada a compensação e prorrogação (horas extras).
                        </div>
                      </div>

                      <div className="bg-[#140E24] border border-emerald-500/30 rounded-2xl p-4">
                        <div className="text-xs font-bold text-emerald-300 mb-1 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Ensino Médio Concluído</span>
                        </div>
                        <div className="text-2xl font-black text-white">Até 8h / dia</div>
                        <div className="text-[11px] text-zinc-400 mt-1">
                          40h semanais, desde que computadas as horas teóricas.
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Visual 3: Comparison Table */}
                  {section.visualType === 'comparison-table' && (
                    <div className="my-6 bg-[#0E091A] border border-[#2D1B4E] rounded-2xl p-4 overflow-x-auto shadow-xl">
                      <div className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-3">
                        ⚖️ Matriz Comparativa: Jovem Aprendiz vs Estagiário
                      </div>
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-[#2D1B4E] bg-[#140E24] text-zinc-300">
                            <th className="p-3 font-bold">Critério Legislação</th>
                            <th className="p-3 font-bold text-white">Jovem Aprendiz (Lei 10.097/00)</th>
                            <th className="p-3 font-bold text-purple-300">Estagiário (Lei 11.788/08)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1D1130] text-zinc-300">
                          <tr className="hover:bg-white/5">
                            <td className="p-3 font-semibold text-white">Faixa Etária</td>
                            <td className="p-3">14 a 24 anos incompletos (sem teto para PcD)</td>
                            <td className="p-3">A partir de 16 anos (sem teto de idade)</td>
                          </tr>
                          <tr className="hover:bg-white/5">
                            <td className="p-3 font-semibold text-white">Vínculo Empregatício</td>
                            <td className="p-3 text-emerald-400 font-semibold">Sim (CLT Especial com CTPS)</td>
                            <td className="p-3 text-purple-300 font-semibold">Não (Ato Educativo - Termo TCE)</td>
                          </tr>
                          <tr className="hover:bg-white/5">
                            <td className="p-3 font-semibold text-white">FGTS</td>
                            <td className="p-3 text-emerald-400 font-bold">Alíquota especial de 2% (paga pela empresa)</td>
                            <td className="p-3 text-zinc-400">Isento (não há recolhimento de FGTS)</td>
                          </tr>
                          <tr className="hover:bg-white/5">
                            <td className="p-3 font-semibold text-white">13º Salário</td>
                            <td className="p-3 text-emerald-400 font-bold">Assegurado integralmente por lei</td>
                            <td className="p-3 text-zinc-400">Não aplicável</td>
                          </tr>
                          <tr className="hover:bg-white/5">
                            <td className="p-3 font-semibold text-white">Semana de Provas</td>
                            <td className="p-3">Garantia de frequência escolar</td>
                            <td className="p-3 text-purple-300 font-bold">Redução obrigatória da jornada em 50%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Visual 4: Demonstrativo de Holerite */}
                  {section.visualType === 'holerite' && (
                    <div className="my-6 bg-[#0E091A] border border-[#2D1B4E] rounded-2xl p-4">
                      <div className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-3 flex items-center justify-between">
                        <span>💵 Demonstrativo de Pagamento (Holerite Modelo 120h)</span>
                        <button
                          onClick={() => setCurrentView('HOLERITE')}
                          className="text-[11px] text-purple-400 hover:text-white underline font-bold flex items-center gap-1 cursor-pointer"
                        >
                          Abrir Calculadora Completa <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="bg-[#140E24] border border-[#2D1B4E] rounded-xl p-4 font-mono text-xs">
                        <div className="border-b border-[#2D1B4E]/60 pb-2 mb-3 flex justify-between text-zinc-400 font-sans">
                          <div><strong>EMPRESA:</strong> TECNOLOGIA &amp; SERVIÇOS CURITIBA LTDA</div>
                          <div><strong>MÊS:</strong> SETEMBRO/2026</div>
                        </div>

                        <div className="grid grid-cols-12 gap-2 text-zinc-400 font-sans font-bold border-b border-[#2D1B4E] pb-1.5 mb-2">
                          <div className="col-span-6">Descrição da Rubrica</div>
                          <div className="col-span-3 text-right">Proventos (+)</div>
                          <div className="col-span-3 text-right">Descontos (-)</div>
                        </div>

                        <div className="space-y-1.5 text-zinc-300">
                          <div className="grid grid-cols-12 gap-2">
                            <div className="col-span-6">Salário Base (Aprendizagem 120h)</div>
                            <div className="col-span-3 text-right text-emerald-400 font-bold">R$ 1.120,00</div>
                            <div className="col-span-3 text-right">-</div>
                          </div>
                          <div className="grid grid-cols-12 gap-2">
                            <div className="col-span-6">Vale-Transporte (Desc. Máx. 6%)</div>
                            <div className="col-span-3 text-right">-</div>
                            <div className="col-span-3 text-right text-rose-400">R$ 67,20</div>
                          </div>
                          <div className="grid grid-cols-12 gap-2">
                            <div className="col-span-6">INSS (Alíquota Faixa Inicial 7,5%)</div>
                            <div className="col-span-3 text-right">-</div>
                            <div className="col-span-3 text-right text-rose-400">R$ 84,00</div>
                          </div>
                        </div>

                        <div className="border-t border-[#2D1B4E] pt-3 mt-3 grid grid-cols-12 gap-2 font-sans font-bold">
                          <div className="col-span-6 text-zinc-400">TOTAIS:</div>
                          <div className="col-span-3 text-right text-emerald-400">R$ 1.120,00</div>
                          <div className="col-span-3 text-right text-rose-400">R$ 151,20</div>
                        </div>

                        <div className="mt-3 bg-[#171126] border border-[#2D1B4E] rounded-xl p-3.5 flex flex-col sm:flex-row justify-between items-center gap-2 font-sans">
                          <div>
                            <div className="text-xs text-zinc-400 font-bold">VALOR LÍQUIDO A RECEBER:</div>
                            <div className="text-xl font-black text-white">R$ 968,80</div>
                          </div>
                          <div className="text-right sm:text-right text-xs">
                            <span className="text-zinc-400">Depósito FGTS (2% Patronal): </span>
                            <strong className="text-emerald-400">R$ 22,40</strong>
                            <div className="text-[10px] text-zinc-500">(Depositado pela empresa sem desconto)</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Highlight Box */}
                  {section.highlightBox && (
                    <div
                      className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                        section.highlightBox.type === 'warning'
                          ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                          : section.highlightBox.type === 'law'
                          ? 'bg-[#171126] border-purple-500/40 text-zinc-200'
                          : section.highlightBox.type === 'calc'
                          ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                          : 'bg-[#140E24] border-[#2D1B4E] text-zinc-200'
                      }`}
                    >
                      <div className="font-bold text-sm mb-1 flex items-center gap-1.5 text-white">
                        {section.highlightBox.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                        {section.highlightBox.type === 'law' && <Scale className="w-4 h-4 text-purple-300" />}
                        {section.highlightBox.type === 'calc' && <DollarSign className="w-4 h-4 text-emerald-400" />}
                        {section.highlightBox.type === 'info' && <Info className="w-4 h-4 text-purple-300" />}
                        <span>{section.highlightBox.title}</span>
                      </div>
                      <p className="text-zinc-300">{section.highlightBox.text}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Nav Controls */}
            <div className="pt-6 border-t border-[#2D1B4E]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={handlePrevModule}
                disabled={activeModuleIndex === 0}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#2D1B4E] text-zinc-300 text-xs font-bold hover:bg-[#171126] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Módulo Anterior
              </button>

              <button
                type="button"
                onClick={() => setIsReadingMode(false)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#2D1B4E] text-zinc-300 text-xs font-bold hover:bg-[#171126] hover:text-white flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Layers className="w-4 h-4 text-purple-400" /> Ver Todos os Módulos
              </button>

              <button
                onClick={handleNextModule}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] hover:from-[#7C3AED] hover:to-[#9D4EDD] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-950/60 cursor-pointer transition-all hover:scale-[1.02]"
              >
                <span>{activeModuleIndex === course.modules.length - 1 ? 'Concluir Módulos e Ir para Casos' : 'Concluir Módulo e Avançar'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================== */}
      {/* ABA 2: ESTUDOS DE CASO & PRÁTICA                      */}
      {/* ===================================================== */}
      {activeTab === 'CASE_STUDIES' && !isReadingMode && (
        <div className="w-full space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course.caseStudies.map((cs, idx) => (
              <button
                key={cs.id}
                onClick={() => setSelectedCaseIdx(idx)}
                className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedCaseIdx === idx
                    ? 'bg-[#171126] border-purple-500/80 ring-1 ring-purple-500/50 shadow-xl'
                    : 'bg-[#140E24] border-[#2D1B4E]/60 hover:border-purple-500/30'
                }`}
              >
                <div className="text-xs font-bold text-purple-400 mb-1">Caso #{idx + 1}</div>
                <div className="text-sm font-bold text-white mb-2">{cs.title}</div>
                <div className="text-xs text-zinc-400 line-clamp-2">{cs.scenario}</div>
              </button>
            ))}
          </div>

          {course.caseStudies[selectedCaseIdx] && (() => {
            const cs = course.caseStudies[selectedCaseIdx];
            const currentChoice = caseAnswers[cs.id];

            return (
              <div className="bg-[#110E1B] border border-[#2D1B4E]/60 rounded-3xl p-6 lg:p-8 space-y-6 shadow-2xl">
                <div className="border-b border-[#2D1B4E]/60 pb-4">
                  <span className="bg-[#1F1535] text-purple-300 border border-purple-500/30 text-[11px] font-bold px-3 py-1 rounded-full uppercase">
                    {cs.character}
                  </span>
                  <h2 className="text-xl font-bold text-white mt-2">{cs.title}</h2>
                </div>

                <div className="bg-[#0E091A] border border-[#2D1B4E] rounded-2xl p-5">
                  <div className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                    📋 A Situação Real
                  </div>
                  <p className="text-xs lg:text-sm text-zinc-300 leading-relaxed">
                    {cs.scenario}
                  </p>
                </div>

                {cs.interactiveOptions && (
                  <div className="bg-[#140E24] border border-[#2D1B4E] rounded-2xl p-5 space-y-4">
                    <div className="text-xs font-bold text-zinc-200 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-purple-400" />
                      <span>{cs.interactiveOptions.question}</span>
                    </div>

                    <div className="space-y-2">
                      {cs.interactiveOptions.choices.map((choice, cIdx) => {
                        const isSelected = currentChoice === cIdx;

                        return (
                          <div key={cIdx} className="space-y-2">
                            <button
                              onClick={() => handleCaseOptionSelect(cs.id, cIdx)}
                              className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all cursor-pointer ${
                                isSelected
                                  ? choice.correct
                                    ? 'bg-emerald-950/70 border-emerald-500 text-emerald-100 font-semibold'
                                    : 'bg-rose-950/70 border-rose-500 text-rose-100 font-semibold'
                                  : 'bg-[#0E091A] border-[#2D1B4E] text-zinc-300 hover:border-purple-500/40'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center font-bold text-[10px]">
                                  {String.fromCharCode(65 + cIdx)}
                                </span>
                                <span>{choice.text}</span>
                              </div>
                            </button>

                            {isSelected && (
                              <div
                                className={`p-3 rounded-xl text-xs ${
                                  choice.correct
                                    ? 'bg-emerald-950/50 border border-emerald-500/40 text-emerald-200'
                                    : 'bg-rose-950/50 border border-rose-500/40 text-rose-200'
                                }`}
                              >
                                <strong>{choice.correct ? '✓ Resposta Correta: ' : '✗ Atenção: '}</strong>
                                {choice.feedback}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#0E091A] border border-[#2D1B4E] rounded-2xl p-4">
                    <div className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Scale className="w-4 h-4 text-purple-400" />
                      <span>Análise Jurídica Crítica</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {cs.criticalAnalysis}
                    </p>
                  </div>

                  <div className="bg-[#0E091A] border border-[#2D1B4E] rounded-2xl p-4">
                    <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Pontos de Aprendizagem Prática</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-zinc-300">
                      {cs.keyTakeaways.map((takeaway, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#2D1B4E]/60 flex justify-end">
                  <button
                    onClick={() => setActiveTab('QUIZ')}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] hover:from-[#7C3AED] hover:to-[#9D4EDD] text-white text-xs font-bold flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <span>Prosseguir para Avaliação Final (Quiz)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ===================================================== */}
      {/* ABA 3: AVALIAÇÃO FINAL (QUIZ)                         */}
      {/* ===================================================== */}
      {activeTab === 'QUIZ' && !isReadingMode && (
        !isAllModulesCompleted ? (
          <div className="w-full bg-[#110E1B] border border-amber-500/40 rounded-3xl p-8 lg:p-12 text-center space-y-6 shadow-2xl">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-950/40 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-xl">
              <Lock className="w-10 h-10 animate-pulse" />
            </div>

            <div className="max-w-xl mx-auto space-y-3">
              <span className="inline-block bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
                🔒 Avaliação Final Bloqueada
              </span>
              <h2 className="text-2xl lg:text-3xl font-black text-white">
                Conclua todos os módulos para liberar o Quiz
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed">
                De acordo com as diretrizes pedagógicas da Escola Virtual e da Lei da Aprendizagem, a avaliação final e a emissão da Badge <strong>"{course.badgeName}"</strong> só são liberadas após a conclusão de <strong>100% dos módulos</strong> deste curso.
              </p>
            </div>

            {/* Card de Progresso */}
            <div className="max-w-md mx-auto bg-[#140E24] border border-[#2D1B4E] rounded-2xl p-4 space-y-2 text-left">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-zinc-300">Seu Progresso nas Aulas:</span>
                <span className="text-emerald-400 font-extrabold">{completedModulesCount} de {course.modules.length} módulos ({progressPercent}%)</span>
              </div>
              <div className="w-full h-3 bg-[#0D0818] rounded-full overflow-hidden border border-[#2D1B4E]">
                <div 
                  className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#10B981] transition-all duration-500" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="text-[11px] text-zinc-400 text-center pt-1">
                Faltam {course.modules.length - completedModulesCount} módulo(s) para você desbloquear a avaliação!
              </div>
            </div>

            <div>
              <button
                onClick={() => {
                  const targetIdx = nextUnfinishedIndex !== -1 ? nextUnfinishedIndex : 0;
                  setActiveModuleIndex(targetIdx);
                  setActiveTab('MODULES');
                  setIsReadingMode(true);
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] hover:from-[#7C3AED] hover:to-[#9D4EDD] text-white text-xs font-black shadow-lg shadow-purple-950/60 inline-flex items-center gap-2 transition-all transform hover:scale-105 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Voltar para as Aulas e Concluir Módulos</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full bg-[#110E1B] border border-[#2D1B4E]/60 rounded-3xl p-6 lg:p-8 space-y-6 shadow-2xl">
            <div className="border-b border-[#2D1B4E]/60 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 text-purple-300 font-bold text-xs uppercase mb-1">
                  <HelpCircle className="w-4 h-4" />
                  <span>Avaliação Oficial de Competência</span>
                </div>
                <h2 className="text-xl lg:text-2xl font-black text-white">
                  Questionário de Fixação: {course.title}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-300 mt-1">
                  Obtenha nota ≥ 70% para emissão da certificação e registro oficial do Selo no seu currículo.
                </p>
              </div>

              {currentQuizResult && (
                <div className={`px-4 py-2 rounded-xl border text-center ${
                  currentQuizResult.passed ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300' : 'bg-rose-950/60 border-rose-500/50 text-rose-300'
                }`}>
                  <div className="text-[10px] uppercase font-bold">Último Resultado</div>
                  <div className="text-xl font-extrabold">{currentQuizResult.score}%</div>
                  <div className="text-[10px]">{currentQuizResult.passed ? 'Aprovado ✓' : 'Nota Insuficiente'}</div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {course.quiz.map((q, qIdx) => {
                const selectedOpt = userQuizAnswers[q.id];
                const isCorrect = selectedOpt === q.correct;

                return (
                  <div key={q.id} className="bg-[#0E091A] border border-[#2D1B4E] rounded-2xl p-5 space-y-3">
                    <div className="text-xs font-bold text-purple-300 flex items-center justify-between">
                      <span>Questão {qIdx + 1} de {course.quiz.length}</span>
                      {quizSubmitted && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isCorrect ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40' : 'bg-rose-950/60 text-rose-300 border border-rose-500/40'}`}>
                          {isCorrect ? '✓ Correta' : '✗ Incorreta'}
                        </span>
                      )}
                    </div>

                    <p className="text-xs lg:text-sm font-semibold text-white">
                      {q.question}
                    </p>

                    <div className="space-y-2 pt-1">
                      {q.options.map((opt, optIdx) => {
                        const isOptionSelected = selectedOpt === optIdx;
                        let optionClasses = 'bg-[#140E24] border-[#2D1B4E] text-zinc-300 hover:border-purple-500/40';

                        if (quizSubmitted) {
                          if (optIdx === q.correct) {
                            optionClasses = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
                          } else if (isOptionSelected && !isCorrect) {
                            optionClasses = 'bg-rose-950/60 border-rose-500 text-rose-200';
                          }
                        } else if (isOptionSelected) {
                          optionClasses = 'bg-[#1F1535] border-purple-500 text-white font-semibold ring-1 ring-purple-500/60';
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleQuizOptionSelect(q.id, optIdx)}
                            disabled={quizSubmitted}
                            className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center gap-3 cursor-pointer ${optionClasses}`}
                          >
                            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center font-bold text-[10px] shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className={`p-4 rounded-xl text-xs mt-3 border space-y-2 ${
                        isCorrect 
                          ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-100' 
                          : 'bg-rose-950/40 border-rose-500/50 text-rose-100'
                      }`}>
                        <div className="font-bold flex items-center gap-2 text-sm">
                          {isCorrect ? (
                            <span className="text-emerald-300 flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              Você acertou!
                            </span>
                          ) : (
                            <span className="text-rose-300 flex items-center gap-1.5">
                              <AlertTriangle className="w-4 h-4 text-rose-400" />
                              Você errou esta questão
                            </span>
                          )}
                        </div>

                        {!isCorrect && (
                          <div className="text-xs text-rose-200 bg-rose-950/70 p-3 rounded-lg border border-rose-800/40 leading-relaxed">
                            <div>
                              Sua escolha:{' '}
                              <span className="font-bold text-white">
                                {selectedOpt !== undefined ? `Alternativa (${String.fromCharCode(65 + selectedOpt)})` : 'Não respondeu'}
                              </span>
                            </div>
                            <div className="mt-1">
                              Alternativa correta:{' '}
                              <span className="font-bold text-emerald-300">
                                Alternativa ({String.fromCharCode(65 + q.correct)}) - &ldquo;{q.options[q.correct]}&rdquo;
                              </span>
                            </div>
                          </div>
                        )}

                        <div className="text-zinc-200 leading-relaxed pt-1">
                          <strong className="text-white font-semibold">
                            {isCorrect ? 'Explicação & Justificativa:' : 'Por que a alternativa (' + String.fromCharCode(65 + q.correct) + ') é a correta:'}
                          </strong>{' '}
                          <span>{q.explanation}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#2D1B4E]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => setActiveTab('MODULES')}
                className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white cursor-pointer"
              >
                ← Voltar aos Módulos
              </button>

              <div className="flex items-center gap-3">
                {quizSubmitted ? (
                  <>
                    <button
                      onClick={handleRetakeQuiz}
                      className="px-4 py-2 rounded-xl border border-[#2D1B4E] text-zinc-300 text-xs font-semibold hover:bg-[#171126] cursor-pointer"
                    >
                      Refazer Avaliação
                    </button>
                    <button
                      onClick={() => setCurrentView('BADGES_PERFIL')}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-950/60 cursor-pointer"
                    >
                      <Award className="w-4 h-4" />
                      Ver Minhas Badges
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(userQuizAnswers).length < course.quiz.length}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] hover:from-[#7C3AED] hover:to-[#9D4EDD] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-950/60 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Finalizar Avaliação e Emitir Badge
                  </button>
                )}
              </div>
            </div>
          </div>
        )
      )}

      {/* ===================================================== */}
      {/* 4. SEÇÃO INFERIOR DE RECURSOS EXTRAS (APOIO)          */}
      {/* ===================================================== */}
      {!isReadingMode && (
        <div className="w-full space-y-4 pt-4 border-t border-[#2D1B4E]/40">
          
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Recursos de Apoio &amp; Material Complementar</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Card 1: Download da Apostila em PDF */}
            <div className="bg-[#140E24] border border-[#2D1B4E] hover:border-purple-500/40 rounded-2xl p-5 space-y-3 transition-all flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 text-white font-bold text-sm">
                  <div className="w-8 h-8 rounded-xl bg-[#1F1535] border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span>Download da Apostila em PDF</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Baixe o material didático consolidado deste curso para estudar offline, imprimir ou consultar rapidamente no dia a dia do seu trabalho.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleDownloadApostila}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#171126] hover:bg-[#251540] border border-purple-500/30 text-purple-200 hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4 text-purple-400" />
                  <span>Baixar Apostila Completa (.PDF)</span>
                </button>
              </div>
            </div>

            {/* Card 2: Dicas para Entrevistas & LinkedIn */}
            <div className="bg-[#140E24] border border-[#2D1B4E] hover:border-amber-500/40 rounded-2xl p-5 space-y-3 transition-all flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 text-white font-bold text-sm">
                  <div className="w-8 h-8 rounded-xl bg-amber-950/60 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <span>Dicas para Entrevistas &amp; LinkedIn</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Descubra como mencionar as competências deste curso no seu currículo e como responder a perguntas de recrutadores de Curitiba e RMC.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowInterviewTips(!showInterviewTips)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#171126] hover:bg-[#2A1838] border border-amber-500/30 text-amber-200 hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{showInterviewTips ? 'Ocultar Recomendações' : 'Ver Recomendações de RH'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showInterviewTips ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>

          </div>

          {/* Drawer Expandido de Dicas para Entrevistas */}
          {showInterviewTips && (
            <div className="w-full bg-[#110E1B] border border-amber-500/40 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Como valorizar este curso perante Recrutadores:</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* Dica 1 */}
                <div className="bg-[#140E24] border border-[#2D1B4E] rounded-xl p-3.5 space-y-1.5">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                    <span>No seu Currículo (PDF/Word):</span>
                  </div>
                  <p className="text-zinc-300 leading-relaxed">
                    Insira na seção "Cursos Complementares": <em>"{course.title} ({course.hours}h) — Escola Virtual SkillHub (Curitiba &amp; RMC)"</em>.
                  </p>
                </div>

                {/* Dica 2 */}
                <div className="bg-[#140E24] border border-[#2D1B4E] rounded-xl p-3.5 space-y-1.5">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <span>Na Entrevista com o RH:</span>
                  </div>
                  <p className="text-zinc-300 leading-relaxed">
                    Destaque como você aprendeu a aplicar essa competência em situações reais de trabalho, mencionando a resolução de casos práticos.
                  </p>
                </div>

                {/* Dica 3 */}
                <div className="bg-[#140E24] border border-[#2D1B4E] rounded-xl p-3.5 space-y-1.5">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>No seu Perfil do LinkedIn:</span>
                  </div>
                  <p className="text-zinc-300 leading-relaxed">
                    Adicione na aba "Licenças e Certificados" a sua Badge Oficial <strong>"{course.badgeName}"</strong> com o código de validação emitido pela plataforma.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
