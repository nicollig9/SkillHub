'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { TRACKS, COURSES } from '@/data/coursesData';
import { CandidateProfileType } from '@/types';
import { 
  GraduationCap, 
  Clock, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  Play
} from 'lucide-react';

export default function TracksView() {
  const { openCourse, candidateProfileType } = useApp();

  const [expandedTrackId, setExpandedTrackId] = useState<string | null>('trilha-1');
  const [selectedAudience, setSelectedAudience] = useState<CandidateProfileType | 'TODOS'>('TODOS');

  const filteredTracks = TRACKS.filter((track) => {
    if (selectedAudience === 'TODOS') return true;
    if (track.targetAudienceType === 'TODOS') return true;
    if (Array.isArray(track.targetAudienceType)) {
      return track.targetAudienceType.includes(selectedAudience);
    }
    return true;
  });

  const toggleExpand = (trackId: string) => {
    setExpandedTrackId(expandedTrackId === trackId ? null : trackId);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#22103B] via-[#351859] to-[#481F78] border border-[#6D34A8]/40 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#17092A] border border-[#7C3AED]/40 px-3 py-1 rounded-full text-xs font-bold text-[#DDD6FE]">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Formação Modular Integrada (Escola Virtual)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Aba de Trilhas de Aprendizagem
            </h1>
            <p className="text-xs sm:text-sm text-purple-200 leading-relaxed">
              Trilhas organizadas passo a passo que reúnem cursos complementares para você dominar uma área profissional e conquistar selos de especialista.
            </p>
          </div>

          {/* Filtro de Público */}
          <div className="bg-[#140824]/90 border border-[#7C3AED]/50 rounded-2xl p-4 shrink-0 shadow-lg space-y-1.5">
            <span className="text-xs font-bold text-purple-200">Filtrar por Perfil:</span>
            <select
              value={selectedAudience}
              onChange={(e) => setSelectedAudience(e.target.value as any)}
              className="w-full bg-[#1A0B2E] border border-purple-500/40 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#8B5CF6]"
            >
              <option value="TODOS">Todas as Trilhas</option>
              <option value="JOVEM_APRENDIZ">🛡️ Jovem Aprendiz</option>
              <option value="ESTAGIARIO">💼 Estagiário</option>
              <option value="ESTUDANTE">🎒 Estudante</option>
              <option value="PRIMEIRO_EMPREGO">🚀 Primeiro Emprego</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Trilhas Expandíveis */}
      <div className="space-y-5">
        {filteredTracks.map((track) => {
          const isExpanded = expandedTrackId === track.id;
          const trackCourses = COURSES.filter((c) => track.courseIds.includes(c.id));

          return (
            <div
              key={track.id}
              className={`bg-[#170C2B] border rounded-3xl p-6 shadow-xl transition-all ${
                isExpanded ? 'border-[#8B5CF6] shadow-purple-950/60' : 'border-[#4C1D95]/40 hover:border-purple-500/50'
              }`}
            >
              {/* Topo do Card da Trilha */}
              <div
                onClick={() => toggleExpand(track.id)}
                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 cursor-pointer select-none"
              >
                <div className="space-y-2 max-w-3xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-[#24123E] text-[#FDE68A] border border-[#7C3AED]/40 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full">
                      {track.category}
                    </span>
                    <span className="text-xs font-bold text-purple-300 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
                      <span>{track.hoursTotal} Horas Totais</span>
                    </span>
                    <span className="text-xs text-purple-300 font-semibold">
                      • {track.coursesCount} Cursos
                    </span>
                  </div>

                  <h2 className="text-xl font-extrabold text-white">
                    {track.name}
                  </h2>

                  <p className="text-xs sm:text-sm text-purple-200 leading-relaxed">
                    {track.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right hidden sm:block">
                    <div className="text-[11px] text-purple-300">Selo Final</div>
                    <div className="text-xs font-bold text-[#FDE68A]">{track.badgeReward}</div>
                  </div>

                  <button
                    type="button"
                    className="p-2.5 rounded-2xl bg-[#24123E] border border-[#7C3AED]/40 text-purple-200 hover:text-white"
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Conteúdo Expandido com os Cursos da Trilha */}
              {isExpanded && (
                <div className="mt-6 pt-6 border-t border-[#3F1F68]/40 space-y-4 animate-fadeIn">
                  <div className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#8B5CF6]" />
                    <span>Cursos que compõem esta trilha ({trackCourses.length})</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {trackCourses.map((c, index) => (
                      <div
                        key={c.id}
                        className="bg-[#120722] border border-[#4C1D95]/40 rounded-2xl p-4 space-y-3 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-[10px] text-purple-300">
                            <span className="bg-[#24123E] px-2 py-0.5 rounded font-bold">
                              Etapa #{index + 1}
                            </span>
                            <span>{c.hours}h</span>
                          </div>

                          <h3 className="text-xs font-bold text-white line-clamp-2">
                            {c.title}
                          </h3>

                          <p className="text-[11px] text-purple-200/80 line-clamp-2">
                            {c.subtitle}
                          </p>
                        </div>

                        <button
                          onClick={() => openCourse(c.id)}
                          className="w-full flex items-center justify-center gap-2 bg-[#24123E] hover:bg-[#341858] border border-[#7C3AED]/50 text-white font-bold py-2 rounded-xl text-xs transition-all"
                        >
                          <Play className="w-3 h-3 text-[#FDE68A] fill-current" />
                          <span>Iniciar Etapa</span>
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-[#1E0F38] border border-[#7C3AED]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-purple-200">
                      <Award className="w-5 h-5 text-[#F59E0B]" />
                      <span>Conclua todos os cursos da trilha para desbloquear o selo oficial: <strong>{track.badgeReward}</strong></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
