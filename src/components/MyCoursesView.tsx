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
  const { openCourse, setCurrentView, cursosInscritos } = useApp();

  const [filterTab, setFilterTab] = useState<'ANDAMENTO' | 'CONCLUIDOS' | 'TODOS'>('ANDAMENTO');

  const andamentoList = cursosInscritos.filter((c) => c.status === 'em_andamento');
  const concluidosList = cursosInscritos.filter((c) => c.status === 'concluido');

  const filtered = cursosInscritos.filter((c) => {
    if (filterTab === 'ANDAMENTO') return c.status === 'em_andamento';
    if (filterTab === 'CONCLUIDOS') return c.status === 'concluido';
    return true;
  });

  return (
    <div className="space-y-6 max-w-6xl w-full mx-auto pb-12 transition-colors duration-300">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-purple-900/60 border border-purple-400/30 px-3 py-1 rounded-full text-xs font-bold text-purple-200">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Espaço de Aprendizagem Ativa</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Meus Cursos Matriculados
            </h1>
            <p className="text-xs sm:text-sm text-purple-200 leading-relaxed">
              Acompanhe seu avanço aula por aula, conclua as avaliações de fixação e garanta seus selos oficiais.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentView('CURSOS_DISPONIVEIS')}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>+ Explorar Novos Cursos</span>
            </button>
          </div>
        </div>
      </div>

      {/* Abas de Filtro */}
      <div className="flex border-b border-slate-200 dark:border-purple-500/20 text-xs sm:text-sm font-bold gap-4">
        <button
          onClick={() => setFilterTab('ANDAMENTO')}
          className={`pb-3 border-b-2 transition-all cursor-pointer ${
            filterTab === 'ANDAMENTO'
              ? 'border-purple-600 text-purple-700 dark:border-amber-400 dark:text-amber-300 font-bold'
              : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Em Andamento ({andamentoList.length})
        </button>

        <button
          onClick={() => setFilterTab('CONCLUIDOS')}
          className={`pb-3 border-b-2 transition-all cursor-pointer ${
            filterTab === 'CONCLUIDOS'
              ? 'border-purple-600 text-purple-700 dark:border-amber-400 dark:text-amber-300 font-bold'
              : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Concluídos ({concluidosList.length})
        </button>

        <button
          onClick={() => setFilterTab('TODOS')}
          className={`pb-3 border-b-2 transition-all cursor-pointer ${
            filterTab === 'TODOS'
              ? 'border-purple-600 text-purple-700 dark:border-amber-400 dark:text-amber-300 font-bold'
              : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Todos ({cursosInscritos.length})
        </button>
      </div>

      {/* EMPTY STATE ELEGANTE PARA NOVOS USUÁRIOS */}
      {cursosInscritos.length === 0 ? (
        <div className="bg-white dark:bg-slate-900/60 border border-dashed border-slate-300 dark:border-purple-500/20 rounded-3xl p-10 text-center space-y-4 shadow-sm">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-300">
            <BookOpen className="w-7 h-7" />
          </div>

          <div className="max-w-md mx-auto space-y-1.5">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Você ainda não iniciou nenhum curso
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Você ainda não iniciou nenhum curso. Que tal explorar as Trilhas de Curitiba &amp; RMC?
            </p>
          </div>

          <div>
            <button
              onClick={() => setCurrentView('CURSOS_DISPONIVEIS')}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md transition-all inline-flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
            >
              <span>🚀 Explorar Cursos Gratuitos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-purple-500/20 rounded-3xl p-8 text-center space-y-2">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Nenhum curso encontrado nesta aba de filtro.
          </p>
        </div>
      ) : (
        /* Grid de Cursos do Aluno */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-purple-500/20 hover:border-purple-400 dark:hover:border-purple-500/50 rounded-2xl p-6 shadow-sm hover:shadow-md flex flex-col justify-between space-y-4 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 px-2.5 py-0.5 rounded-md border border-purple-100 dark:border-purple-500/20">
                    {course.category}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {course.progress}% Concluído
                  </span>
                </div>

                <h2 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2">
                  {course.title}
                </h2>

                {/* Barra de Progresso */}
                <div className="space-y-1.5">
                  <div className="w-full bg-slate-100 dark:bg-slate-950 h-2 rounded-full overflow-hidden p-[1px] border border-slate-200 dark:border-purple-500/20">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400">
                    <span>{course.currentModule}</span>
                    <span>{course.workload}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => openCourse(course.courseId || course.id, course.moduleIndex)}
                className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-sm transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{course.status === 'concluido' ? 'Revisar Módulos' : 'Continuar Estudando'}</span>
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
