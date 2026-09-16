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
  Layers
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

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Course Banner Header */}
      <div className="bg-gradient-to-r from-[#1C0730] via-[#3C1361] to-[#521C7E] border border-[#6E259F]/60 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#521C7E] text-white text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                {course.trackName}
              </span>
              <span className="bg-[#250B3E]/90 text-purple-200 border border-purple-500/40 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {course.modality}
              </span>
              <span className="bg-[#150524]/90 text-purple-200 border border-purple-500/30 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#D8B4FE]" />
                {course.equivalentHours}h equivalentes
              </span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight">
              {course.title}
            </h1>
            <p className="text-sm text-purple-100 leading-relaxed">
              {course.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-purple-200 pt-2 border-t border-[#6E259F]/30">
              <div>
                <span className="text-purple-300">Público-Alvo:</span>{' '}
                <strong className="text-white">{course.targetAudience}</strong>
              </div>
              <div>
                <span className="text-purple-300">Certificação:</span>{' '}
                <strong className="text-white">Badge 🏅 {course.badgeName}</strong>
              </div>
            </div>
          </div>

          {/* Badge Preview Card */}
          <div className="bg-[#150524]/90 border border-[#6E259F]/60 rounded-2xl p-5 lg:w-64 text-center flex flex-col items-center justify-center shrink-0 shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#521C7E] to-[#6E259F] flex items-center justify-center text-white mb-2 shadow-lg shadow-purple-900/50">
              <Scale className="w-8 h-8 text-white" />
            </div>
            <div className="text-xs font-bold text-white mb-0.5">Badge Oficial</div>
            <div className="text-xs text-purple-200 font-extrabold mb-2">{course.badgeName}</div>
            <div className="text-[11px] text-purple-300 leading-tight">
              Requisito: Estudar os 5 módulos e obter nota ≥ 70% na avaliação.
            </div>
          </div>
        </div>

        {/* Course Objectives */}
        <div className="mt-6 bg-[#150524]/80 border border-[#521C7E]/40 rounded-2xl p-4">
          <div className="text-xs font-bold text-purple-200 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#D8B4FE]" />
            <span>🎯 Objetivos de Aprendizagem Deste Curso</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-purple-100">
            {course.learningObjectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-[#D8B4FE] font-bold">•</span>
                <span>{obj}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex items-center gap-2 border-b border-[#3C1361]/60 pb-2">
        <button
          onClick={() => setActiveTab('MODULES')}
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
              : 'text-purple-200 hover:text-white hover:bg-[#250B3E]/60'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          Avaliação de Fixação (Quiz)
          {currentQuizResult && (
            <span className={`text-[10px] px-2 py-0.2 rounded-full font-bold ${currentQuizResult.passed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
              {currentQuizResult.score}%
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: MODULES CONTENT */}
      {activeTab === 'MODULES' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Module Selector Sidebar */}
          <div className="lg:col-span-4 space-y-2.5">
            <div className="text-xs font-bold text-purple-300 uppercase tracking-wider px-1">
              Trilha de Módulos (5 Módulos Separados)
            </div>

            {course.modules.map((mod, idx) => {
              const isCompleted = completedList.includes(mod.id);
              const isCurrent = activeModuleIndex === idx;

              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveModuleIndex(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 ${
                    isCurrent
                      ? 'bg-gradient-to-r from-[#250B3E] to-[#3C1361] border-[#6E259F] shadow-lg ring-1 ring-[#9B51E0]'
                      : isCompleted
                      ? 'bg-[#160A25] border-[#3C1361]/60 hover:border-[#521C7E]'
                      : 'bg-[#110520] border-[#250B3E] hover:border-[#3C1361]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md ${isCurrent ? 'bg-[#521C7E] text-white' : 'bg-[#250B3E] text-purple-200'}`}>
                      Módulo {mod.number}
                    </span>
                    <div className="flex items-center gap-1.5 text-[11px]">
                      {isCompleted ? (
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Concluído
                        </span>
                      ) : (
                        <span className="text-purple-300/80 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#D8B4FE]" /> {mod.estimatedMinutes} min
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={`text-xs font-bold leading-snug mb-1 ${isCurrent ? 'text-white' : 'text-purple-100'}`}>
                    {mod.title.replace(/MÓDULO \d+: /, '')}
                  </div>
                  <div className="text-[11px] text-purple-300 line-clamp-2">
                    {mod.summary}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Module Content Viewer */}
          <div className="lg:col-span-8 bg-[#160A25] border border-[#3C1361] rounded-3xl p-6 lg:p-8 space-y-6 shadow-2xl">
            <div className="border-b border-[#3C1361]/60 pb-4">
              <div className="flex items-center gap-2 text-purple-300 font-bold text-xs uppercase mb-1">
                <span>Módulo {currentModule.number} de {course.modules.length}</span>
                <span>•</span>
                <span>{currentModule.estimatedMinutes} minutos estimados</span>
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
                onClick={handleNextModule}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#521C7E] to-[#6E259F] hover:from-[#6E259F] hover:to-[#8736C2] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-950/60"
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
        <div className="space-y-6">
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

      {/* TAB 3: QUIZ EVALUATION */}
      {activeTab === 'QUIZ' && (
        <div className="bg-[#160A25] border border-[#3C1361] rounded-3xl p-6 lg:p-8 space-y-6 shadow-2xl">
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
                    <div className="p-3 bg-[#150524] border border-[#3C1361] rounded-xl text-xs text-purple-200 mt-2">
                      <strong className="text-white">Explicação: </strong>
                      {q.explanation}
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
      )}
    </div>
  );
}
