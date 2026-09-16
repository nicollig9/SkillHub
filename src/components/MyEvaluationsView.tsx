'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { COURSES } from '@/data/coursesData';
import { 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck, 
  FileText 
} from 'lucide-react';

export default function MyEvaluationsView() {
  const { student, quizResults, openCourse, setCurrentView } = useApp();

  const evaluations = [
    {
      courseId: 'curso-jovem-aprendiz-avancado',
      courseTitle: 'Jornada do Jovem Aprendiz & Estagiário (Módulo Avançado)',
      badgeName: 'Direitos & Legislação',
      date: '14/09/2026',
      score: 92,
      passed: true,
      questionsCount: 5,
      codeVerificador: 'SKILL-PR-2026-8841A'
    },
    {
      courseId: 'curso-curriculo-plataformas',
      courseTitle: 'Elaboração de Currículo Campeão e Cadastro em Plataformas',
      badgeName: 'Currículo Campeão',
      date: '10/09/2026',
      score: 85,
      passed: true,
      questionsCount: 3,
      codeVerificador: 'SKILL-PR-2026-4190B'
    },
    {
      courseId: 'curso-excel-basico-avancado',
      courseTitle: 'Microsoft Excel 2016/365 - Básico ao Intermediário',
      badgeName: 'Especialista em Planilhas',
      date: '08/09/2026',
      score: 60,
      passed: false,
      questionsCount: 4,
      codeVerificador: undefined
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#22103B] via-[#351859] to-[#481F78] border border-[#6D34A8]/40 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#17092A] border border-[#7C3AED]/40 px-3 py-1 rounded-full text-xs font-bold text-[#DDD6FE]">
              <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Painel de Avaliações e Verificação de Competências</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Minhas Avaliações & Quizzes
            </h1>
            <p className="text-xs sm:text-sm text-purple-200 leading-relaxed">
              Consulte seu histórico de testes, notas obtidas e selos emitidos com validação de nota mínima de 70%.
            </p>
          </div>

          <div className="bg-[#140824]/90 border border-[#7C3AED]/50 rounded-2xl p-4 text-center shrink-0 shadow-lg">
            <div className="text-2xl font-black text-emerald-400">92%</div>
            <div className="text-[11px] text-purple-200 mt-0.5">Média Geral de Desempenho</div>
          </div>
        </div>
      </div>

      {/* Lista de Avaliações */}
      <div className="space-y-4">
        {evaluations.map((ev) => (
          <div
            key={ev.courseId}
            className="bg-[#170C2B] border border-[#4C1D95]/40 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                {ev.passed ? (
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Aprovado (Nota &ge; 70%)</span>
                  </span>
                ) : (
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>Necessário Refazer</span>
                  </span>
                )}
                <span className="text-xs text-purple-300">Data: {ev.date}</span>
              </div>

              <h2 className="text-base font-bold text-white">
                {ev.courseTitle}
              </h2>

              <div className="flex items-center gap-4 text-xs text-purple-200">
                <span>Badge Associada: <strong className="text-[#FDE68A]">{ev.badgeName}</strong></span>
                {ev.codeVerificador && (
                  <span>• Chave: <strong className="font-mono text-purple-300">{ev.codeVerificador}</strong></span>
                )}
              </div>
            </div>

            {/* Score & Ação */}
            <div className="flex items-center gap-4 shrink-0 w-full md:w-auto justify-between md:justify-end">
              <div className="text-right">
                <div className="text-2xl font-black text-white">{ev.score}%</div>
                <div className="text-[10px] text-purple-300">{ev.passed ? 'Certificado Emitido' : 'Corte: 70%'}</div>
              </div>

              <button
                onClick={() => openCourse(ev.courseId)}
                className="flex items-center gap-1.5 bg-[#24123E] hover:bg-[#341858] border border-[#7C3AED]/50 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md"
              >
                {ev.passed ? (
                  <>
                    <span>Revisar Prova</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-3.5 h-3.5 text-[#FDE68A]" />
                    <span>Refazer Quiz</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
