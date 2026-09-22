'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { COURSES } from '@/data/coursesData';
import { CandidateProfileType } from '@/types';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Clock, 
  Award, 
  ArrowRight, 
  GraduationCap, 
  Sparkles,
  CheckCircle2,
  Play
} from 'lucide-react';

export default function CoursesView() {
  const { openCourse, candidateProfileType, setCandidateProfileType } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('TODAS');
  const [selectedAudience, setSelectedAudience] = useState<CandidateProfileType | 'TODOS'>(candidateProfileType || 'TODOS');

  // Atualizar quando mudar o perfil
  React.useEffect(() => {
    if (candidateProfileType) {
      setSelectedAudience(candidateProfileType);
    }
  }, [candidateProfileType]);

  const categories = [
    'TODAS',
    'Desenvolvimento Pessoal',
    'Administração e Negócios',
    'Tecnologia da Informação',
    'Legislação e Cidadania'
  ];

  const levelWeight: Record<string, number> = {
    'Iniciante': 1,
    'Intermediário': 2,
    'Avançado': 3
  };

  const filteredCourses = COURSES.filter((course) => {
    // Filtro por texto
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.badgeName.toLowerCase().includes(searchQuery.toLowerCase());

    // Filtro por categoria
    const matchesCategory = 
      selectedCategory === 'TODAS' || course.category === selectedCategory;

    // Filtro por público-alvo
    const matchesAudience = 
      selectedAudience === 'TODOS' || 
      course.targetAudienceType === 'TODOS' || 
      (Array.isArray(course.targetAudienceType) && course.targetAudienceType.includes(selectedAudience));

    return matchesSearch && matchesCategory && matchesAudience;
  }).sort((a, b) => {
    // Ordenação pedagógica: Cursos mais fáceis (Iniciante) antes dos cursos mais complexos (Avançado)
    const weightA = levelWeight[a.level || 'Iniciante'] || 99;
    const weightB = levelWeight[b.level || 'Iniciante'] || 99;
    return weightA - weightB;
  });

  return (
    <div className="w-full max-w-6xl mx-auto pb-12 space-y-6 flex flex-col items-center">
      
      {/* Top Banner da Aba de Cursos - 100% Centralizado */}
      <div className="w-full bg-gradient-to-r from-[#22103B] via-[#351859] to-[#481F78] border border-[#6D34A8]/40 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#17092A] border border-[#7C3AED]/40 px-3 py-1 rounded-full text-xs font-bold text-[#DDD6FE]">
              <GraduationCap className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Catálogo Oficial de Cursos (Escola Virtual)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Aba de Cursos Disponíveis
            </h1>
            <p className="text-xs sm:text-sm text-purple-200 leading-relaxed">
              Cursos gratuitos e práticos projetados para desenvolver as competências mais valorizadas pelas empresas de Curitiba.
            </p>
          </div>

          <div className="bg-[#140824]/90 border border-[#7C3AED]/50 rounded-2xl p-4 text-center shrink-0 shadow-lg">
            <div className="text-2xl font-black text-[#FBBF24]">{filteredCourses.length}</div>
            <div className="text-[11px] text-purple-200 mt-0.5">Cursos Filtrados</div>
          </div>
        </div>
      </div>

      {/* Barra de Filtros & Pesquisa - 100% Centralizada */}
      <div className="w-full bg-[#170C2B] border border-[#4C1D95]/40 rounded-2xl p-4 shadow-lg space-y-4">
        
        {/* Linha 1: Input de Busca + Filtro por Público */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          <div className="md:col-span-7 relative">
            <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar por título, assunto ou badge (ex: Excel, Holerite, Comunicação)..."
              className="w-full bg-[#10061D] border border-[#4C1D95]/50 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
            />
          </div>

          <div className="md:col-span-5 flex items-center gap-2">
            <span className="text-xs font-bold text-purple-300 shrink-0">Para quem:</span>
            <select
              value={selectedAudience}
              onChange={(e) => setSelectedAudience(e.target.value as any)}
              className="w-full bg-[#10061D] border border-[#4C1D95]/50 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
            >
              <option value="TODOS">Todos os Públicos</option>
              <option value="JOVEM_APRENDIZ">🛡️ Jovem Aprendiz</option>
              <option value="ESTAGIARIO">💼 Estagiário</option>
              <option value="ESTUDANTE">🎒 Estudante</option>
              <option value="PRIMEIRO_EMPREGO">🚀 Primeiro Emprego</option>
            </select>
          </div>

        </div>

        {/* Linha 2: Categorias da Escola Virtual */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-purple-300 font-bold shrink-0">Categorias:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white shadow'
                  : 'bg-[#10061D] text-purple-300 hover:text-white border border-purple-500/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Grid de Cursos - 100% Centralizado no Meio */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-[#170C2B] border border-[#4C1D95]/40 hover:border-[#8B5CF6]/70 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4 transition-all duration-200 hover:-translate-y-1 group"
          >
            <div className="space-y-3">
              {/* Header do Card com Nível de Dificuldade */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-bold bg-[#24123E] text-[#DDD6FE] border border-[#7C3AED]/30 px-2.5 py-0.5 rounded-md">
                    {course.category}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                    course.level === 'Iniciante' 
                      ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40' 
                      : course.level === 'Intermediário'
                      ? 'bg-amber-950/70 text-amber-300 border-amber-500/40'
                      : 'bg-purple-950/70 text-purple-300 border-purple-500/40'
                  }`}>
                    {course.level || 'Iniciante'}
                  </span>
                </div>
                <span className="text-xs font-semibold text-purple-300 flex items-center gap-1 shrink-0">
                  <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>{course.hours}h</span>
                </span>
              </div>

              {/* Título & Subtítulo */}
              <h3 className="text-base font-bold text-white group-hover:text-[#FDE68A] transition-colors line-clamp-2">
                {course.title}
              </h3>

              <p className="text-xs text-purple-200/80 line-clamp-3 leading-relaxed">
                {course.subtitle}
              </p>

              {/* Módulos e Público */}
              <div className="pt-2 text-[11px] text-purple-300 space-y-1">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>{course.modules.length} Módulos com Casos Práticos</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Badge Oficial: <strong className="text-white">{course.badgeName}</strong></span>
                </div>
              </div>
            </div>

            {/* Rodapé com Ação */}
            <div className="pt-4 border-t border-[#3F1F68]/40 flex items-center justify-between">
              <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Certificado Incluso</span>
              </span>

              <button
                onClick={() => openCourse(course.id)}
                className="flex items-center gap-1.5 bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] hover:from-[#7C3AED] hover:to-[#9D4EDD] text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-all transform group-hover:scale-105"
              >
                <span>Acessar Curso</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
