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
  ChevronUp
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
    setCurrentView
  } = useApp();

  const course = COURSES.find((c) => c.id === selectedCourseId) || COURSES[0];

  const [activeTab, setActiveTab] = useState<'MODULES' | 'CASE_STUDIES' | 'QUIZ'>('MODULES');
  const [isReadingMode, setIsReadingMode] = useState<boolean>(false);
  const [expandedDesc, setExpandedDesc] = useState<Record<string, boolean>>({});
  const [selectedCaseIdx, setSelectedCaseIdx] = useState<number>(0);
  const [caseAnswers, setCaseAnswers] = useState<Record<string, number>>({});
  const [userQuizAnswers, setUserQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const currentModule = course.modules[activeModuleIndex] || course.modules[0];
  const completedList = completedModules[course.id] || [];

  const handleNextModule = () => {
    markModuleComplete(course.id, currentModule.id);
    if (activeModuleIndex < course.modules.length - 1) {
      setActiveModuleIndex(activeModuleIndex + 1);
    } else {
      if (course.caseStudies && course.caseStudies.length > 0) {
        setActiveTab('CASE_STUDIES');
      } else {
        setActiveTab('QUIZ');
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

  const currentQuizResult = quizResults[course.id];

  const isAllModulesCompleted = course.modules.every((mod) => completedList.includes(mod.id));
  const completedModulesCount = course.modules.filter((mod) => completedList.includes(mod.id)).length;
  const progressPercent = Math.round((completedModulesCount / Math.max(course.modules.length, 1)) * 100);

  return (
    <div className="space-y-6 max-w-5xl w-full mx-auto flex flex-col items-center">
      {/* Top Breadcrumb */}
      <div className="w-full flex items-center justify-between text-xs text-purple-300 pb-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('CURSOS_DISPONIVEIS')}
            className="hover:text-white flex items-center gap-1.5 transition-colors font-medium cursor-pointer"
          >
            <GraduationCap className="w-4 h-4 text-[#A78BFA]" />
            <span>Cursos Disponíveis</span>
          </button>
          <span>&gt;</span>
          <span className="text-white font-semibold truncate max-w-xs sm:max-w-md">{course.title}</span>
        </div>
      </div>

      {/* Main Tabs - 100% Centralizado */}
      <div className="w-full flex flex-wrap items-center justify-center gap-2 border-b border-[#3C1361]/60 pb-3">
        <button
          onClick={() => {
            setActiveTab('MODULES');
            setIsReadingMode(false);
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'MODULES'
              ? 'bg-gradient-to-r from-[#521C7E] to-[#6E259F] text-white shadow-md shadow-purple-900/50'
              : 'text-purple-200 hover:text-white hover:bg-[#250B3E]/60'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Módulos do Curso ({course.modules.length})
        </button>

        {course.caseStudies && course.caseStudies.length > 0 && (
          <button
            onClick={() => setActiveTab('CASE_STUDIES')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'CASE_STUDIES'
                ? 'bg-gradient-to-r from-[#521C7E] to-[#6E259F] text-white shadow-md shadow-purple-900/50'
                : 'text-purple-200 hover:text-white hover:bg-[#250B3E]/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            Estudos de Caso & Prática ({course.caseStudies.length})
          </button>
        )}

        <button
          onClick={() => setActiveTab('QUIZ')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'QUIZ'
              ? 'bg-gradient-to-r from-[#521C7E] to-[#6E259F] text-white shadow-md shadow-purple-900/50'
              : isAllModulesCompleted
              ? 'text-purple-200 hover:text-white hover:bg-[#250B3E]/60'
              : 'text-purple-300/60 hover:text-purple-200 bg-[#160A25]/40 border border-purple-900/40'
          }`}
        >
          {isAllModulesCompleted ? (
            <HelpCircle className="w-4 h-4 text-emerald-400" />
          ) : (
            <Lock className="w-4 h-4 text-amber-400" />
          )}
          <span>Avaliação Final (Quiz)</span>
          {!isAllModulesCompleted && (
            <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded-full font-bold">
              Bloqueado ({completedModulesCount}/{course.modules.length})
            </span>
          )}
          {isAllModulesCompleted && currentQuizResult && (
            <span className={`text-[10px] px-2 py-0.2 rounded-full font-bold ${currentQuizResult.passed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
              {currentQuizResult.score}%
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: MODULES OVERVIEW (CARDS GRID NO ESTILO DO PRINT) */}
      {activeTab === 'MODULES' && !isReadingMode && (
        <div className="w-full space-y-6 flex flex-col items-center">
          {/* Header da Seção de Módulos (com títulos e cores do site) */}
          <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#3C1361]/60 pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Módulos do Curso
              </h2>
              <p className="text-xs sm:text-sm text-purple-200 mt-1">
                {course.title} • {course.modules.length} módulos disponíveis
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-purple-300">
                Progresso Geral:
              </span>
              <span className="bg-[#24123E] border border-purple-500/40 text-purple-200 text-xs font-black px-3 py-1 rounded-full">
                {completedList.length}/{course.modules.length} concluídos ({progressPercent}%)
              </span>
            </div>
          </div>

          {/* Grid de Cards dos Módulos (estilo exato do print do usuário, com as cores do site) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full justify-center">
            {course.modules.map((mod, idx) => {
              const isCompleted = completedList.includes(mod.id);
              const isExpanded = !!expandedDesc[mod.id];

              return (
                <div
                  key={mod.id}
                  className={`bg-[#170C2B] border rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                    isCompleted
                      ? 'border-emerald-500/50 hover:border-emerald-400 shadow-emerald-950/20'
                      : 'border-[#4C1D95]/50 hover:border-[#8B5CF6]/80 shadow-purple-950/30'
                  }`}
                >
                  {/* Cabeçalho do Card: Badge do Módulo + Status */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="bg-[#24103D] border border-[#6D28D9]/50 text-[#DDD6FE] text-xs font-black px-3 py-1 rounded-xl uppercase tracking-wider">
                        Módulo {mod.number}
                      </span>
                      {isCompleted ? (
                        <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <Check className="w-3 h-3" /> Concluído
                        </span>
                      ) : (
                        <span className="bg-[#220E3D]/60 text-purple-300 border border-purple-500/20 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                          Disponível
                        </span>
                      )}
                    </div>

                    {/* Título do Módulo */}
                    <h3 className="text-base sm:text-lg font-black text-white leading-snug">
                      {mod.title.replace(/MÓDULO \d+: /, '')}
                    </h3>

                    {/* Resumo do Módulo */}
                    <p className={`text-xs text-purple-200/90 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                      {mod.summary}
                    </p>

                    {mod.summary && mod.summary.length > 70 && (
                      <button
                        type="button"
                        onClick={() => setExpandedDesc(prev => ({ ...prev, [mod.id]: !prev[mod.id] }))}
                        className="text-[11px] text-[#A78BFA] hover:text-white font-bold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>{isExpanded ? 'Ver menos' : 'Ver mais'}</span>
                        <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>

                  {/* Metadados: Atividades */}
                  <div className="pt-1">
                    <div className="bg-[#10061D] border border-[#3C1361]/70 rounded-xl p-2.5 flex items-center justify-center gap-2 text-center">
                      <Layers className="w-4 h-4 text-[#A78BFA]" />
                      <span className="text-xs font-bold text-white">7 atividades disponíveis</span>
                    </div>
                  </div>

                  {/* Barra de Progresso */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-purple-300">Progresso</span>
                      <span className={isCompleted ? 'text-emerald-400 font-black' : 'text-purple-300'}>
                        {isCompleted ? '100%' : '0%'}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[#10061D] rounded-full overflow-hidden border border-[#3C1361]/50">
                      <div
                        className={`h-full transition-all duration-500 ${
                          isCompleted
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-400 w-full'
                            : 'bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] w-0'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Botão Acessar Módulo */}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveModuleIndex(idx);
                      setIsReadingMode(true);
                    }}
                    className="w-full mt-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] hover:from-[#7C3AED] hover:to-[#9333EA] text-white text-xs font-black flex items-center justify-center gap-2 shadow-lg shadow-purple-950/60 transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                  >
                    <span>{isCompleted ? 'Revisar Módulo' : 'Acessar Módulo'}</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 1: MODO LEITURA DO MÓDULO SELECIONADO */}
      {activeTab === 'MODULES' && isReadingMode && (
        <div className="w-full space-y-5">
          {/* Barra Superior de Navegação no Modo Leitura */}
          <div className="w-full bg-[#180A2B] border border-[#521C7E]/70 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setIsReadingMode(false)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#250B3E] hover:bg-[#35135A] text-purple-200 hover:text-white text-xs font-bold transition-all border border-purple-500/30 shadow cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#A78BFA]" />
              <span>Voltar para Todos os Módulos</span>
            </button>

            {/* Dropdown seletor rápido */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-purple-300 font-bold hidden sm:inline">Módulo Atual:</span>
              <select
                value={activeModuleIndex}
                onChange={(e) => setActiveModuleIndex(Number(e.target.value))}
                className="bg-[#10061D] border border-[#4C1D95]/60 text-white text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#8B5CF6]"
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
          <div className="w-full bg-[#160A25] border border-[#3C1361] rounded-3xl p-6 lg:p-8 space-y-6 shadow-2xl">
            <div className="border-b border-[#3C1361]/60 pb-4">
              <div className="flex items-center gap-2 text-purple-300 font-bold text-xs uppercase mb-1">
                <span>Módulo {currentModule.number} de {course.modules.length}</span>
              </div>
              <h2 className="text-xl lg:text-2xl font-black text-white">
                {currentModule.title}
              </h2>
              <p className="text-xs text-purple-200 mt-1">
                {currentModule.summary}
              </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-6">
              {currentModule.content.sections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-3.5">
                  <h3 className="text-base font-bold text-purple-200 border-l-4 border-[#6E259F] pl-3">
                    {section.subheading}
                  </h3>

                  <div className="space-y-2 text-xs lg:text-sm text-purple-100 leading-relaxed">
                    {section.body.map((paragraph, pIdx) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Visual 1: Triângulo da Aprendizagem */}
                  {section.visualType === 'triangle' && (
                    <div className="my-6 bg-[#0D0618] border border-[#521C7E] rounded-2xl p-5 shadow-inner">
                      <div className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-3 flex items-center justify-between">
                        <span>📐 Diagrama do Triângulo da Aprendizagem (Lei nº 10.097/00)</span>
                        <span className="text-[10px] bg-[#250B3E] text-purple-200 px-2 py-0.5 rounded-full">Interativo</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3 text-center">
                        <div className="bg-[#250B3E]/80 border border-[#521C7E]/60 rounded-xl p-3.5">
                          <div className="w-10 h-10 mx-auto rounded-full bg-[#521C7E]/40 text-purple-200 flex items-center justify-center font-bold mb-2">
                            <User className="w-5 h-5" />
                          </div>
                          <div className="text-xs font-bold text-white">1. Estudante (Aprendiz)</div>
                          <div className="text-[11px] text-purple-200 mt-1">
                            14 a 24 anos matriculado no ensino regular.
                          </div>
                        </div>

                        <div className="bg-[#250B3E]/80 border border-[#521C7E]/60 rounded-xl p-3.5">
                          <div className="w-10 h-10 mx-auto rounded-full bg-[#521C7E]/40 text-purple-200 flex items-center justify-center font-bold mb-2">
                            <Building className="w-5 h-5" />
                          </div>
                          <div className="text-xs font-bold text-white">2. Empresa Contratante</div>
                          <div className="text-[11px] text-purple-200 mt-1">
                            Prática supervisionada, CTPS, FGTS 2% e salário.
                          </div>
                        </div>

                        <div className="bg-[#250B3E]/80 border border-[#521C7E]/60 rounded-xl p-3.5">
                          <div className="w-10 h-10 mx-auto rounded-full bg-[#521C7E]/40 text-purple-200 flex items-center justify-center font-bold mb-2">
                            <GraduationCap className="w-5 h-5" />
                          </div>
                          <div className="text-xs font-bold text-white">3. Entidade Formadora</div>
                          <div className="text-[11px] text-purple-200 mt-1">
                            Sistema S (SENAI, SENAC), CIEE e escolas técnicas.
                          </div>
                        </div>
                      </div>

                      {section.asciiDiagram && (
                        <pre className="bg-[#150524] p-3.5 rounded-xl text-[#D8B4FE] font-mono text-[11px] overflow-x-auto border border-[#3C1361]">
                          {section.asciiDiagram}
                        </pre>
                      )}
                    </div>
                  )}

                  {/* Visual 2: Work Hours Rules */}
                  {section.visualType === 'work-hours' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
                      <div className="bg-[#150524] border border-[#521C7E]/60 rounded-2xl p-4">
                        <div className="text-xs font-bold text-purple-200 mb-1 flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-[#D8B4FE]" />
                          <span>Ensino Fundamental & Médio</span>
                        </div>
                        <div className="text-2xl font-black text-white">Máximo 6h / dia</div>
                        <div className="text-[11px] text-purple-200 mt-1">
                          30h semanais. Vedada a compensação e prorrogação (horas extras).
                        </div>
                      </div>

                      <div className="bg-[#150524] border border-emerald-500/40 rounded-2xl p-4">
                        <div className="text-xs font-bold text-emerald-300 mb-1 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Ensino Médio Concluído</span>
                        </div>
                        <div className="text-2xl font-black text-white">Até 8h / dia</div>
                        <div className="text-[11px] text-purple-200 mt-1">
                          40h semanais, desde que computadas as horas teóricas.
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Visual 3: Comparison Table */}
                  {section.visualType === 'comparison-table' && (
                    <div className="my-6 bg-[#0D0618] border border-[#521C7E]/60 rounded-2xl p-4 overflow-x-auto shadow-xl">
                      <div className="text-xs font-bold text-purple-200 uppercase tracking-wider mb-3">
                        ⚖️ Matriz Comparativa: Jovem Aprendiz vs Estagiário
                      </div>
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-[#3C1361] bg-[#1F0E34] text-purple-200">
                            <th className="p-3 font-bold">Critério Legislação</th>
                            <th className="p-3 font-bold text-white">Jovem Aprendiz (Lei 10.097/00)</th>
                            <th className="p-3 font-bold text-purple-300">Estagiário (Lei 11.788/08)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#250B3E] text-purple-100">
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
                            <td className="p-3 text-slate-400">Isento (não há recolhimento de FGTS)</td>
                          </tr>
                          <tr className="hover:bg-white/5">
                            <td className="p-3 font-semibold text-white">13º Salário</td>
                            <td className="p-3 text-emerald-400 font-bold">Assegurado integralmente por lei</td>
                            <td className="p-3 text-slate-400">Não aplicável</td>
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
                    <div className="my-6 bg-[#0D0618] border border-[#521C7E] rounded-2xl p-4">
                      <div className="text-xs font-bold text-purple-200 uppercase tracking-wider mb-3 flex items-center justify-between">
                        <span>💵 Demonstrativo de Pagamento (Holerite Modelo 120h)</span>
                        <button
                          onClick={() => setCurrentView('HOLERITE')}
                          className="text-[11px] text-[#D8B4FE] hover:text-white underline font-bold flex items-center gap-1"
                        >
                          Abrir Calculadora Completa <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="bg-[#150524] border border-[#3C1361] rounded-xl p-4 font-mono text-xs">
                        <div className="border-b border-[#3C1361]/60 pb-2 mb-3 flex justify-between text-purple-300 font-sans">
                          <div><strong>EMPRESA:</strong> TECNOLOGIA & SERVIÇOS CURITIBA LTDA</div>
                          <div><strong>MÊS:</strong> SETEMBRO/2026</div>
                        </div>

                        <div className="grid grid-cols-12 gap-2 text-purple-300 font-sans font-bold border-b border-[#250B3E] pb-1.5 mb-2">
                          <div className="col-span-6">Descrição da Rubrica</div>
                          <div className="col-span-3 text-right">Proventos (+)</div>
                          <div className="col-span-3 text-right">Descontos (-)</div>
                        </div>

                        <div className="space-y-1.5 text-purple-100">
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

                        <div className="border-t border-[#3C1361] pt-3 mt-3 grid grid-cols-12 gap-2 font-sans font-bold">
                          <div className="col-span-6 text-slate-300">TOTAIS:</div>
                          <div className="col-span-3 text-right text-emerald-400">R$ 1.120,00</div>
                          <div className="col-span-3 text-right text-rose-400">R$ 151,20</div>
                        </div>

                        <div className="mt-3 bg-gradient-to-r from-[#250B3E] to-[#3C1361] border border-[#6E259F]/60 rounded-xl p-3.5 flex flex-col sm:flex-row justify-between items-center gap-2 font-sans">
                          <div>
                            <div className="text-xs text-purple-200 font-bold">VALOR LÍQUIDO A RECEBER:</div>
                            <div className="text-xl font-black text-white">R$ 968,80</div>
                          </div>
                          <div className="text-right sm:text-right text-xs">
                            <span className="text-purple-200">Depósito FGTS (2% Patronal): </span>
                            <strong className="text-emerald-400">R$ 22,40</strong>
                            <div className="text-[10px] text-purple-300/80">(Depositado pela empresa sem desconto)</div>
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
                          ? 'bg-[#250B3E]/80 border-[#6E259F]/60 text-purple-100'
                          : section.highlightBox.type === 'calc'
                          ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                          : 'bg-[#150524] border-[#521C7E]/40 text-purple-100'
                      }`}
                    >
                      <div className="font-bold text-sm mb-1 flex items-center gap-1.5 text-white">
                        {section.highlightBox.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                        {section.highlightBox.type === 'law' && <Scale className="w-4 h-4 text-[#D8B4FE]" />}
                        {section.highlightBox.type === 'calc' && <DollarSign className="w-4 h-4 text-emerald-400" />}
                        {section.highlightBox.type === 'info' && <Info className="w-4 h-4 text-[#D8B4FE]" />}
                        <span>{section.highlightBox.title}</span>
                      </div>
                      <p>{section.highlightBox.text}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Nav Controls */}
            <div className="pt-6 border-t border-[#3C1361]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={handlePrevModule}
                disabled={activeModuleIndex === 0}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#521C7E]/40 text-purple-200 text-xs font-bold hover:bg-[#250B3E] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Módulo Anterior
              </button>

              <button
                type="button"
                onClick={() => setIsReadingMode(false)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-purple-500/30 text-purple-200 text-xs font-bold hover:bg-[#250B3E] flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Layers className="w-4 h-4 text-[#A78BFA]" /> Ver Todos os Módulos
              </button>

              <button
                onClick={handleNextModule}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] hover:from-[#7C3AED] hover:to-[#9333EA] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-950/60"
              >
                <span>{activeModuleIndex === course.modules.length - 1 ? 'Concluir Módulos e Ir para Casos' : 'Concluir Módulo e Avançar'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CASE STUDIES */}
      {activeTab === 'CASE_STUDIES' && (
        <div className="w-full space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course.caseStudies.map((cs, idx) => (
              <button
                key={cs.id}
                onClick={() => setSelectedCaseIdx(idx)}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  selectedCaseIdx === idx
                    ? 'bg-gradient-to-r from-[#250B3E] to-[#3C1361] border-[#6E259F] ring-1 ring-[#9B51E0] shadow-lg'
                    : 'bg-[#160A25] border-[#3C1361]/60 hover:border-[#521C7E]'
                }`}
              >
                <div className="text-xs font-bold text-purple-300 mb-1">Caso #{idx + 1}</div>
                <div className="text-sm font-bold text-white mb-2">{cs.title}</div>
                <div className="text-xs text-purple-200 line-clamp-2">{cs.scenario}</div>
              </button>
            ))}
          </div>

          {course.caseStudies[selectedCaseIdx] && (() => {
            const cs = course.caseStudies[selectedCaseIdx];
            const currentChoice = caseAnswers[cs.id];

            return (
              <div className="bg-[#160A25] border border-[#3C1361] rounded-3xl p-6 lg:p-8 space-y-6 shadow-2xl">
                <div className="border-b border-[#3C1361]/60 pb-4">
                  <span className="bg-[#521C7E] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase">
                    {cs.character}
                  </span>
                  <h2 className="text-xl font-bold text-white mt-2">{cs.title}</h2>
                </div>

                <div className="bg-[#0D0618] border border-[#3C1361] rounded-2xl p-5">
                  <div className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-2">
                    📋 A Situação Real
                  </div>
                  <p className="text-xs lg:text-sm text-purple-100 leading-relaxed">
                    {cs.scenario}
                  </p>
                </div>

                {cs.interactiveOptions && (
                  <div className="bg-[#250B3E]/60 border border-[#521C7E]/40 rounded-2xl p-5 space-y-4">
                    <div className="text-xs font-bold text-purple-200 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#D8B4FE]" />
                      <span>{cs.interactiveOptions.question}</span>
                    </div>

                    <div className="space-y-2">
                      {cs.interactiveOptions.choices.map((choice, cIdx) => {
                        const isSelected = currentChoice === cIdx;

                        return (
                          <div key={cIdx} className="space-y-2">
                            <button
                              onClick={() => handleCaseOptionSelect(cs.id, cIdx)}
                              className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all ${
                                isSelected
                                  ? choice.correct
                                    ? 'bg-emerald-950/70 border-emerald-500 text-emerald-100 font-semibold'
                                    : 'bg-rose-950/70 border-rose-500 text-rose-100 font-semibold'
                                  : 'bg-[#150524] border-[#3C1361] text-purple-200 hover:border-[#521C7E]'
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
                  <div className="bg-[#0D0618] border border-[#3C1361] rounded-2xl p-4">
                    <div className="text-xs font-bold text-purple-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Scale className="w-4 h-4 text-[#D8B4FE]" />
                      <span>Análise Jurídica Crítica</span>
                    </div>
                    <p className="text-xs text-purple-200 leading-relaxed">
                      {cs.criticalAnalysis}
                    </p>
                  </div>

                  <div className="bg-[#0D0618] border border-[#3C1361] rounded-2xl p-4">
                    <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Pontos de Aprendizagem Prática</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-purple-200">
                      {cs.keyTakeaways.map((takeaway, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#3C1361]/60 flex justify-end">
                  <button
                    onClick={() => setActiveTab('QUIZ')}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#521C7E] to-[#6E259F] hover:from-[#6E259F] hover:to-[#8736C2] text-white text-xs font-bold flex items-center gap-2"
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

      {/* TAB 3: QUIZ EVALUATION (BLOQUEADO ATÉ CONCLUIR 100% DOS MÓDULOS) */}
      {activeTab === 'QUIZ' && (
        !isAllModulesCompleted ? (
          <div className="w-full bg-[#160A25] border border-amber-500/40 rounded-3xl p-8 lg:p-12 text-center space-y-6 shadow-2xl">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-amber-500/20 to-purple-900/40 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-xl">
              <Lock className="w-10 h-10 animate-pulse" />
            </div>

            <div className="max-w-xl mx-auto space-y-3">
              <span className="inline-block bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
                🔒 Avaliação Final Bloqueada
              </span>
              <h2 className="text-2xl lg:text-3xl font-black text-white">
                Conclua todos os módulos para liberar o Quiz
              </h2>
              <p className="text-sm text-purple-200 leading-relaxed">
                De acordo com as diretrizes pedagógicas da Escola Virtual e da Lei da Aprendizagem, a avaliação final e a emissão da Badge <strong>"{course.badgeName}"</strong> só são liberadas após a conclusão de <strong>100% dos módulos</strong> deste curso.
              </p>
            </div>

            {/* Card de Progresso */}
            <div className="max-w-md mx-auto bg-[#10061D] border border-purple-900/50 rounded-2xl p-4 space-y-2 text-left">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-purple-300">Seu Progresso nas Aulas:</span>
                <span className="text-emerald-400 font-extrabold">{completedModulesCount} de {course.modules.length} módulos ({progressPercent}%)</span>
              </div>
              <div className="w-full h-3 bg-[#1D0933] rounded-full overflow-hidden border border-purple-950">
                <div 
                  className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#10B981] transition-all duration-500" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="text-[11px] text-purple-400 text-center pt-1">
                Faltam {course.modules.length - completedModulesCount} módulo(s) para você desbloquear a avaliação!
              </div>
            </div>

            <div>
              <button
                onClick={() => setActiveTab('MODULES')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] hover:from-[#7C3AED] hover:to-[#9D4EDD] text-white text-xs font-black shadow-lg shadow-purple-950/60 inline-flex items-center gap-2 transition-all transform hover:scale-105"
              >
                <BookOpen className="w-4 h-4" />
                <span>Voltar para as Aulas e Concluir Módulos</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full bg-[#160A25] border border-[#3C1361] rounded-3xl p-6 lg:p-8 space-y-6 shadow-2xl">
          <div className="border-b border-[#3C1361]/60 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-purple-300 font-bold text-xs uppercase mb-1">
                <HelpCircle className="w-4 h-4" />
                <span>Avaliação Oficial de Competência</span>
              </div>
              <h2 className="text-xl lg:text-2xl font-black text-white">
                Questionário de Fixação: {course.title}
              </h2>
              <p className="text-xs text-purple-200 mt-1">
                Guardrail de Gamificação: Obtenha nota ≥ 70% para emissão e gravação da Badge no banco de dados.
              </p>
            </div>

            {currentQuizResult && (
              <div className={`px-4 py-2 rounded-xl border text-center ${currentQuizResult.passed ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300' : 'bg-rose-950/60 border-rose-500/50 text-rose-300'}`}>
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
                <div key={q.id} className="bg-[#0D0618] border border-[#3C1361] rounded-2xl p-5 space-y-3">
                  <div className="text-xs font-bold text-purple-300 flex items-center justify-between">
                    <span>Questão {qIdx + 1} de {course.quiz.length}</span>
                    {quizSubmitted && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isCorrect ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
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
                      let optionClasses = 'bg-[#150524] border-[#250B3E] text-purple-200 hover:border-[#521C7E]';

                      if (quizSubmitted) {
                        if (optIdx === q.correct) {
                          optionClasses = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
                        } else if (isOptionSelected && !isCorrect) {
                          optionClasses = 'bg-rose-950/60 border-rose-500 text-rose-200';
                        }
                      } else if (isOptionSelected) {
                        optionClasses = 'bg-gradient-to-r from-[#250B3E] to-[#521C7E] border-[#6E259F] text-white font-semibold ring-1 ring-[#9B51E0]';
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleQuizOptionSelect(q.id, optIdx)}
                          disabled={quizSubmitted}
                          className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center gap-3 ${optionClasses}`}
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

                      <div className="text-purple-100 leading-relaxed pt-1">
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

          <div className="pt-4 border-t border-[#3C1361]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => setActiveTab('MODULES')}
              className="px-4 py-2 text-xs font-semibold text-purple-300 hover:text-white"
            >
              ← Voltar aos Módulos
            </button>

            <div className="flex items-center gap-3">
              {quizSubmitted ? (
                <>
                  <button
                    onClick={handleRetakeQuiz}
                    className="px-4 py-2 rounded-xl border border-[#521C7E]/60 text-purple-200 text-xs font-semibold hover:bg-[#250B3E]"
                  >
                    Refazer Avaliação
                  </button>
                  <button
                    onClick={() => setCurrentView('BADGES_PERFIL')}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#521C7E] to-[#6E259F] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-950/60"
                  >
                    <Award className="w-4 h-4" />
                    Ver Minhas Badges
                  </button>
                </>
              ) : (
                <button
                  onClick={handleQuizSubmit}
                  disabled={Object.keys(userQuizAnswers).length < course.quiz.length}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#521C7E] to-[#6E259F] hover:from-[#6E259F] hover:to-[#8736C2] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-950/60 disabled:opacity-40 disabled:cursor-not-allowed"
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
    </div>
  );
}
