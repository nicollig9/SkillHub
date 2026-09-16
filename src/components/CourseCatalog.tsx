'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { COURSES } from '@/data/coursesData';
import { 
  GraduationCap, 
  Clock, 
  Award, 
  ArrowRight, 
  Sparkles
} from 'lucide-react';

export default function CourseCatalog() {
  const { openCourse, completedModules, student } = useApp();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner with Logo Imperial Purple Theme */}
      <div className="bg-gradient-to-r from-[#1C0730] via-[#3C1361] to-[#521C7E] border border-[#6E259F]/50 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-purple-300 font-bold text-xs uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-[#D8B4FE]" />
              <span>Capacitação Profissional Gratuita de Jovens</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Trilhas de Aprendizagem & Empregabilidade
            </h1>
            <p className="text-xs lg:text-sm text-purple-100 leading-relaxed">
              Formação prática estruturada para Jovem Aprendiz e Estagiários na região metropolitana de Curitiba com certificação digital via Badges.
            </p>
          </div>

          <div className="bg-[#150524]/90 border border-[#6E259F]/60 rounded-2xl p-4 text-center shrink-0 shadow-lg">
            <div className="text-xl font-black text-white">100% Gratuito</div>
            <div className="text-xs text-purple-300 mt-0.5">Certificação com Selo Oficial</div>
          </div>
        </div>
      </div>

      {/* Featured Advanced Course Card in Imperial Purple */}
      <div className="bg-gradient-to-br from-[#1C0730] via-[#2A0E47] to-[#3C1361] border-2 border-[#6E259F]/70 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-4 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-[#521C7E] to-[#6E259F] text-white font-black text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md">
              ★ Curso em Destaque
            </span>
            <span className="text-xs text-purple-200 font-bold">
              TRILHA 1: Entrada no Mercado & Primeiro Emprego
            </span>
          </div>

          <span className="text-xs text-purple-200 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#D8B4FE]" />
            12 Horas Equivalentes • 5 Módulos Separados
          </span>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl lg:text-2xl font-black text-white">
            CURSO 1: Jornada do Jovem Aprendiz & Estagiário (Módulo Avançado)
          </h2>
          <p className="text-xs lg:text-sm text-purple-100 leading-relaxed">
            Aprenda os direitos da Lei nº 10.097/00 e Lei nº 11.788/08, análise detalhada de contracheque (holerite), prevenção contra golpes e fraudes no primeiro emprego com estudos de caso reais e quiz avaliativo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="bg-[#150524]/90 border border-[#521C7E]/40 rounded-2xl p-3.5 text-xs">
            <div className="text-white font-bold">📖 5 Módulos com Gráficos</div>
            <div className="text-[11px] text-purple-300 mt-0.5">Triângulo da Aprendizagem e Matriz Comparativa</div>
          </div>

          <div className="bg-[#150524]/90 border border-[#521C7E]/40 rounded-2xl p-3.5 text-xs">
            <div className="text-white font-bold">💵 Demonstrativo de Holerite</div>
            <div className="text-[11px] text-purple-300 mt-0.5">Cálculo de Proventos, VT 6%, INSS e FGTS 2%</div>
          </div>

          <div className="bg-[#150524]/90 border border-[#521C7E]/40 rounded-2xl p-3.5 text-xs">
            <div className="text-white font-bold">🏅 Badge Verificável</div>
            <div className="text-[11px] text-purple-300 mt-0.5">Selo Oficial: Direitos & Legislação (Nota ≥ 70%)</div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#6E259F]/30 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-xs text-purple-200">
            Status: <strong className="text-emerald-400">2 de 5 módulos concluídos</strong>
          </div>

          <button
            onClick={() => openCourse('curso-jovem-aprendiz-avancado')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#521C7E] to-[#6E259F] hover:from-[#6E259F] hover:to-[#8736C2] text-white text-xs font-black shadow-lg shadow-purple-950/60 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
          >
            <span>Acessar Ambiente do Curso Avançado</span>
            <ArrowRight className="w-4 h-4 text-[#D8B4FE]" />
          </button>
        </div>
      </div>

      {/* Catalog Grid for Other Courses */}
      <div className="space-y-4">
        <div className="text-xs font-bold text-purple-300 uppercase tracking-wider">
          Outros Cursos Disponíveis na Plataforma
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {COURSES.filter((c) => c.id !== 'curso-jovem-aprendiz-avancado').map((course) => {
            return (
              <div
                key={course.id}
                className="bg-[#160A25] border border-[#3C1361]/80 hover:border-[#6E259F] rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold bg-[#250B3E] text-purple-200 border border-[#521C7E]/40 px-2.5 py-0.5 rounded-md">
                      {course.trackName.split(':')[0]}
                    </span>
                    <span className="text-[11px] text-purple-300 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#D8B4FE]" /> {course.hours}h
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-white mb-2 leading-tight">
                    {course.title}
                  </h3>
                  <p className="text-xs text-purple-200 line-clamp-3 mb-4">
                    {course.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#3C1361]/40 flex items-center justify-between">
                  <span className="text-[11px] text-purple-300 font-semibold flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-[#D8B4FE]" /> Badge: {course.badgeName}
                  </span>

                  <button
                    onClick={() => openCourse(course.id)}
                    className="px-4 py-1.5 rounded-lg bg-[#250B3E] hover:bg-[#521C7E] text-white border border-[#521C7E]/50 text-xs font-bold transition-all"
                  >
                    Estudar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
