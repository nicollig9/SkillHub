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
  Play,
  Scale
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

      {/* Banner Explicativo: Para que servem os Cursos da Escola Virtual */}
      <div className="w-full bg-gradient-to-r from-[#1C0730] via-[#3C1361] to-[#521C7E] border border-[#6E259F]/60 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#521C7E] text-white text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FBBF24]" />
                ESCOLA VIRTUAL SKILLHUB
              </span>
              <span className="bg-[#250B3E]/90 text-purple-200 border border-purple-500/40 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                100% Gratuito &amp; Online
              </span>
              <span className="bg-[#150524]/90 text-purple-200 border border-purple-500/30 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-[#D8B4FE]" />
                Certificação com Badges Oficiais
              </span>
            </div>

            <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight">
              Para que servem os cursos da nossa plataforma?
            </h2>
            <p className="text-sm sm:text-base text-purple-100 leading-relaxed font-medium">
              Nossos cursos foram desenvolvidos para apoiar você em duas etapas fundamentais da sua jornada: o seu <strong className="text-[#FBBF24]">desenvolvimento pessoal</strong> — fortalecendo sua autoconfiança, inteligência emocional e comunicação — e a sua <strong className="text-white">preparação completa para o mercado de trabalho</strong>, qualificando você para conquistar oportunidades reais de Jovem Aprendiz, Estágio e Primeiro Emprego em Curitiba e Região Metropolitana.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-purple-200 pt-2 border-t border-[#6E259F]/30">
              <div>
                <span className="text-purple-300">Público Atendido:</span>{' '}
                <strong className="text-white">Jovens Aprendizes, Estagiários e Primeiro Emprego</strong>
              </div>
              <div>
                <span className="text-purple-300">Metodologia:</span>{' '}
                <strong className="text-white">Aulas Práticas, Simulações Reais e Casos do Cotidiano</strong>
              </div>
            </div>
          </div>

          {/* Card Lateral de Certificação e Empregabilidade */}
          <div className="bg-[#150524]/90 border border-[#6E259F]/60 rounded-2xl p-5 lg:w-72 text-center flex flex-col items-center justify-between shrink-0 shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#521C7E] to-[#6E259F] flex items-center justify-center text-white mb-2 shadow-lg shadow-purple-900/50">
              <GraduationCap className="w-8 h-8 text-[#DDD6FE]" />
            </div>
            <div>
              <div className="text-xs font-bold text-white mb-0.5">Certificação Reconhecida</div>
              <div className="text-xs text-purple-200 font-extrabold mb-1">Badges de Competência</div>
              <div className="text-[11px] text-purple-300 leading-tight">
                Cada curso concluído gera um Badge Oficial que comprova suas habilidades práticas perante as empresas parceiras.
              </div>
            </div>
            <div className="mt-3 w-full bg-[#24103E] border border-purple-500/30 text-purple-200 text-[11px] font-bold py-1.5 px-3 rounded-xl flex items-center justify-center gap-1.5">
              <span>{COURSES.length} Cursos Práticos Disponíveis</span>
            </div>
          </div>
        </div>

        {/* Pilares: Desenvolvimento Pessoal vs Mercado de Trabalho */}
        <div className="mt-6 bg-[#150524]/85 border border-[#521C7E]/50 rounded-2xl p-5 space-y-4">
          <div className="text-xs font-bold text-purple-200 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FBBF24]" />
            <span>O que você vai desenvolver em nossos cursos:</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-purple-100">
            {/* Bloco 1: Desenvolvimento Pessoal */}
            <div className="bg-[#1C0A33]/90 border border-[#4C1D95]/40 rounded-xl p-4 space-y-2.5">
              <div className="text-sm font-black text-[#DDD6FE] flex items-center gap-1.5">
                <span>Desenvolvimento Pessoal &amp; Comportamental</span>
              </div>
              <ul className="space-y-2 text-purple-200/90 leading-relaxed text-[11.5px]">
                <li className="flex items-start gap-2">
                  <span className="text-[#A78BFA] font-bold">•</span>
                  <span><strong>Autoconfiança e Postura Ética:</strong> Desenvolva maturidade, responsabilidade e inteligência emocional para superar inseguranças.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#A78BFA] font-bold">•</span>
                  <span><strong>Comunicação e Relacionamento:</strong> Aprenda a se expressar com clareza, ouvir com empatia e colaborar de forma produtiva em equipe.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#A78BFA] font-bold">•</span>
                  <span><strong>Organização e Educação Financeira:</strong> Gestão do próprio tempo, disciplina nos estudos e planejamento do seu primeiro salário.</span>
                </li>
              </ul>
            </div>

            {/* Bloco 2: Desenvolvimento para o Mercado de Trabalho */}
            <div className="bg-[#1C0A33]/90 border border-[#4C1D95]/40 rounded-xl p-4 space-y-2.5">
              <div className="text-sm font-black text-[#DDD6FE] flex items-center gap-1.5">
                <span>Desenvolvimento para o Mercado de Trabalho</span>
              </div>
              <ul className="space-y-2 text-purple-200/90 leading-relaxed text-[11.5px]">
                <li className="flex items-start gap-2">
                  <span className="text-[#A78BFA] font-bold">•</span>
                  <span><strong>Empregabilidade e Entrevistas:</strong> Técnicas comprovadas para montar currículos atrativos e passar com segurança em processos seletivos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#A78BFA] font-bold">•</span>
                  <span><strong>Ferramentas e Rotinas Empresariais:</strong> Domínio prático de pacote Office, Excel, ferramentas digitais e atendimento profissional.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#A78BFA] font-bold">•</span>
                  <span><strong>Direitos e Deveres Trabalhistas:</strong> Conheça as leis de Aprendizagem (10.097), Estágio e CLT, entendendo seu holerite e benefícios.</span>
                </li>
              </ul>
            </div>
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
              placeholder="Digite sua pesquisa"
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
              <option value="JOVEM_APRENDIZ">Jovem Aprendiz</option>
              <option value="ESTAGIARIO">Estagiário</option>
              <option value="PRIMEIRO_EMPREGO">Primeiro Emprego</option>
            </select>
          </div>

        </div>

        {/* Linha 2: Categorias da Escola Virtual */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
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
