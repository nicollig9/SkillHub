'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { COURSES } from '@/data/coursesData';
import { 
  BookOpen, 
  Play, 
  CheckCircle2, 
  Clock, 
  Award, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function MyCoursesView() {
  const { openCourse, setCurrentView, completedModules } = useApp();

  const [filterTab, setFilterTab] = useState<'ANDAMENTO' | 'CONCLUIDOS' | 'TODOS'>('ANDAMENTO');

  const myCourses = [
    {
      ...COURSES[0], // Jornada do Aprendiz
      status: 'EM_ANDAMENTO',
      progress: 65,
      completedMods: 2,
      totalMods: 5
    },
    {
      ...COURSES[1], // Currículo Campeão
      status: 'EM_ANDAMENTO',
      progress: 80,
      completedMods: 1,
      totalMods: 1
    },
    {
      ...COURSES[4], // Excel
      status: 'EM_ANDAMENTO',
      progress: 40,
      completedMods: 1,
      totalMods: 2
    },
    {
      ...COURSES[7], // Finanças Pessoais
      status: 'CONCLUIDO',
      progress: 100,
      completedMods: 1,
      totalMods: 1
    }
  ];

  const filtered = myCourses.filter((c) => {
    if (filterTab === 'ANDAMENTO') return c.status === 'EM_ANDAMENTO';
    if (filterTab === 'CONCLUIDOS') return c.status === 'CONCLUIDO';
    return true;
  });

  return (
    <div className="space-y-6 max-w-6xl w-full mx-auto pb-12">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#22103B] via-[#351859] to-[#481F78] border border-[#6D34A8]/40 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#17092A] border border-[#7C3AED]/40 px-3 py-1 rounded-full text-xs font-bold text-[#DDD6FE]">
              <BookOpen className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Espaço de Aprendizagem Ativa</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Meus Cursos Matriculados
            </h1>
            <p className="text-xs sm:text-sm text-purple-200 leading-relaxed">
              Acompanhe seu avanço aula por aula, conclua as avaliações de fixação e garanta seus selos.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentView('CURSOS_DISPONIVEIS')}
              className="bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md transition-all"
            >
              + Explorar Novos Cursos
            </button>
          </div>
        </div>
      </div>

      {/* Abas de Filtro */}
      <div className="flex border-b border-[#3F1F68]/60 text-xs sm:text-sm font-bold gap-4">
        <button
          onClick={() => setFilterTab('ANDAMENTO')}
          className={`pb-3 border-b-2 transition-all ${
            filterTab === 'ANDAMENTO'
              ? 'border-[#F59E0B] text-[#FDE68A]'
              : 'border-transparent text-purple-300 hover:text-white'
          }`}
        >
          Em Andamento (3)
        </button>

        <button
          onClick={() => setFilterTab('CONCLUIDOS')}
          className={`pb-3 border-b-2 transition-all ${
            filterTab === 'CONCLUIDOS'
              ? 'border-[#F59E0B] text-[#FDE68A]'
              : 'border-transparent text-purple-300 hover:text-white'
          }`}
        >
          Concluídos (1)
        </button>

        <button
          onClick={() => setFilterTab('TODOS')}
          className={`pb-3 border-b-2 transition-all ${
            filterTab === 'TODOS'
              ? 'border-[#F59E0B] text-[#FDE68A]'
              : 'border-transparent text-purple-300 hover:text-white'
          }`}
        >
          Todos os Cursos
        </button>
      </div>

      {/* Grid de Cursos do Aluno */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((course) => (
          <div
            key={course.id}
            className="bg-[#170C2B] border border-[#4C1D95]/40 hover:border-[#8B5CF6]/70 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold bg-[#24123E] text-purple-300 px-2.5 py-0.5 rounded-md">
                  {course.category}
                </span>
                <span className="text-xs font-bold text-emerald-400">
                  {course.progress}% Concluído
                </span>
              </div>

              <h2 className="text-base font-bold text-white line-clamp-2">
                {course.title}
              </h2>

              {/* Barra de Progresso */}
              <div className="space-y-1">
                <div className="w-full bg-[#10061D] h-2 rounded-full overflow-hidden p-[1px] border border-purple-500/20">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-purple-300">
                  <span>{course.completedMods} de {course.totalMods} módulos</span>
                  <span>{course.hours}h carga horária</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => openCourse(course.id)}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] hover:from-[#7C3AED] hover:to-[#9D4EDD] text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{course.status === 'CONCLUIDO' ? 'Revisar Módulos' : 'Continuar Estudando'}</span>
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
