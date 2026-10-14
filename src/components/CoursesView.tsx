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
  Scale,
  Briefcase,
  Zap,
  Target
} from 'lucide-react';

// Mapeamento dos motivos pedagógicos fornecidos para os cursos estruturados por níveis
const COURSE_REASONS: Record<string, string> = {
  // Nível Iniciante (Fundamentos & Primeiro Emprego)
  'curso-preparacao-entrevistas-processos-seletivos': 'É a porta de entrada para quem busca a primeira vaga (elaboração de currículo e primeiros contatos com recrutadores).',
  'curso-soft-skills-comunicacao-interpessoal': 'Ensina postura profissional básica, escuta ativa, convivência no ambiente de trabalho e comunicação sem conflitos.',
  'curso-gestao-tempo-produtividade-iniciante': 'Essencial para organizar rotinas diárias de estudo e trabalho, priorizando tarefas com métodos visuais simples (Matriz de Eisenhower).',
  'curso-etica-etiqueta-corporativa': 'Postura e etiqueta corporativa para novos ingressantes no mercado profissional presencial e remoto.',
  'curso-inteligencia-emocional-trabalho': 'Mapeamento de gatilhos, autorregulação e resiliência essencial para a entrada profissional.',

  // Nível Intermediário (Prática Profissionalizante & Ferramentas)
  'curso-rotinas-praticas-profissionalizantes': 'Exige compreensão de processos internos, redação técnica corporativa, atendimento formal e legislação (LGPD).',
  'curso-hard-skills-excel-ferramentas-digitais': 'Envolve raciocínio lógico em planilhas (fórmulas como PROCV, SOMA, formatação condicional) e gestão de arquivos em nuvem.',
  'curso-resolucao-criativa-problemas-adaptacao': 'Aplicação prática da metodologia dos Cinco Porquês da Toyota, causa-raiz e postura focada em soluções.',

  // Nível Avançado (Inovação, Inteligência Artificial & Automação)
  'curso-inteligencia-artificial-pratica': 'Exige senso crítico, técnicas de engenharia de prompt (papel, contexto, formato) e análise para evitar "alucinações" de IA.',
  'curso-produtividade-notebooklm': 'Requer conhecimento em gestão de bases de conhecimento, análise de documentos em nuvem (grounding), validação por citações e produção de conteúdos multimodais.'
};

const LEVEL_DEFINITIONS = [
  {
    id: 'Iniciante',
    badgeText: '🟢 Nível Iniciante',
    title: 'Nível Iniciante (Fundamentos & Primeiro Emprego)',
    description: 'Cursos de entrada, focados em comportamentos básicos, primeiros passos para o mercado de trabalho e organização pessoal.',
    accentBorder: 'border-emerald-500/40',
    badgeClass: 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40',
    dotColor: 'bg-emerald-400'
  },
  {
    id: 'Intermediário',
    badgeText: '🟡 Nível Intermediário',
    title: 'Nível Intermediário (Prática Profissionalizante & Ferramentas)',
    description: 'Cursos para quem já domina o básico e precisa de ferramentas técnicas para executar rotinas administrativas e de escritório.',
    accentBorder: 'border-amber-500/40',
    badgeClass: 'bg-amber-950/70 text-amber-300 border-amber-500/40',
    dotColor: 'bg-amber-400'
  },
  {
    id: 'Avançado',
    badgeText: '🔴 Nível Avançado',
    title: 'Nível Avançado (Inovação, Inteligência Artificial & Automação)',
    description: 'Cursos de diferenciação competitiva, indicados para quem quer se destacar usando tecnologias modernas de produtividade e IA.',
    accentBorder: 'border-rose-500/40',
    badgeClass: 'bg-rose-950/70 text-rose-300 border-rose-500/40',
    dotColor: 'bg-rose-400'
  }
];

export default function CoursesView() {
  const { openCourse, candidateProfileType } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('TODAS');
  const [selectedLevel, setSelectedLevel] = useState<string>('TODOS');
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

    // Filtro por nível
    const matchesLevel =
      selectedLevel === 'TODOS' || course.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesAudience && matchesLevel;
  });

  return (
    <div className="w-full max-w-6xl mx-auto pb-12 space-y-8 flex flex-col items-center">
      
      {/* Banner Principal Unificado: Aba de Cursos & Para que servem os cursos */}
      <div className="w-full bg-gradient-to-r from-[#1C0730] via-[#3C1361] to-[#521C7E] border border-[#6E259F]/60 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden space-y-6">
        
        {/* Cabeçalho da Aba de Cursos */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10 pb-6 border-b border-[#6E259F]/40">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 bg-[#17092A] border border-[#7C3AED]/40 px-3 py-1 rounded-full text-xs font-bold text-[#DDD6FE]">
                <GraduationCap className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Catálogo Oficial de Cursos</span>
              </div>
              <span className="bg-[#250B3E]/90 text-purple-200 border border-purple-500/40 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                100% Gratuito &amp; Online
              </span>
              <span className="bg-[#150524]/90 text-purple-200 border border-purple-500/30 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-[#D8B4FE]" />
                Certificação com Badges Oficiais
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Aba de Cursos Disponíveis
            </h1>
            <p className="text-xs sm:text-sm text-purple-200 leading-relaxed">
              Cursos gratuitos e práticos organizados por níveis de aprendizado para desenvolver as competências mais valorizadas pelas empresas.
            </p>
          </div>

          <div className="bg-[#140824]/90 border border-[#7C3AED]/50 rounded-2xl p-4 text-center shrink-0 shadow-lg">
            <div className="text-2xl font-black text-[#FBBF24]">{filteredCourses.length}</div>
            <div className="text-[11px] text-purple-200 mt-0.5">Cursos Filtrados</div>
          </div>
        </div>

        {/* Seção Explicativa: Para que servem os cursos */}
        <div className="flex flex-col lg:flex-row justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-3xl">
            <h2 className="text-xl lg:text-2xl font-black text-white tracking-tight leading-tight">
              Para que servem os cursos da nossa plataforma?
            </h2>
            <p className="text-sm sm:text-base text-purple-100 leading-relaxed font-medium">
              Nossos cursos foram desenvolvidos para apoiar você em duas etapas fundamentais da sua jornada: o seu <strong className="text-[#FBBF24]">desenvolvimento pessoal</strong> — fortalecendo sua autoconfiança, inteligência emocional e comunicação — e a sua <strong className="text-white">preparação completa para o mercado de trabalho</strong>, qualificando você para conquistar oportunidades reais de Jovem Aprendiz, Estágio e Primeiro Emprego.
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

      </div>

      {/* Barra de Filtros & Pesquisa - 100% Centralizada */}
      <div className="w-full bg-[#170C2B] border border-[#4C1D95]/40 rounded-2xl p-4 sm:p-5 shadow-lg space-y-4">
        
        {/* Linha 1: Input de Busca + Filtro por Público */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          <div className="md:col-span-7 relative">
            <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Digite o nome do curso, módulo ou competência..."
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

        {/* Linha 2: Filtro Rápido por Nível */}
        <div className="flex flex-wrap items-center justify-start sm:justify-center gap-2 pt-2 border-t border-[#4C1D95]/30 text-xs">
          <span className="text-purple-300 font-bold shrink-0 flex items-center gap-1.5 mr-1">
            <Target className="w-3.5 h-3.5 text-[#F59E0B]" />
            Níveis:
          </span>
          <button
            onClick={() => setSelectedLevel('TODOS')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              selectedLevel === 'TODOS'
                ? 'bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white shadow'
                : 'bg-[#10061D] text-purple-300 hover:text-white border border-purple-500/20'
            }`}
          >
            Todos os Níveis ({filteredCourses.length})
          </button>
          {LEVEL_DEFINITIONS.map((def) => {
            const count = COURSES.filter((c) => c.level === def.id).length;
            return (
              <button
                key={def.id}
                onClick={() => setSelectedLevel(selectedLevel === def.id ? 'TODOS' : def.id)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                  selectedLevel === def.id
                    ? 'bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white shadow ring-2 ring-[#8B5CF6]/50'
                    : 'bg-[#10061D] text-purple-300 hover:text-white border border-purple-500/20'
                }`}
              >
                <span>{def.badgeText}</span>
                <span className="text-[10px] opacity-75">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Linha 3: Categorias da Escola Virtual */}
        <div className="flex flex-wrap items-center justify-start sm:justify-center gap-2 text-xs pt-2 border-t border-[#4C1D95]/20">
          <span className="text-purple-300 font-bold shrink-0">Categorias:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-all text-[11px] ${
                selectedCategory === cat
                  ? 'bg-purple-600/80 text-white font-bold'
                  : 'bg-[#10061D] text-purple-300/80 hover:text-white border border-purple-500/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Listagem de Cursos Agrupada por Níveis */}
      <div className="w-full space-y-10">
        {LEVEL_DEFINITIONS.filter((def) => selectedLevel === 'TODOS' || selectedLevel === def.id).map((def) => {
          // Filtrar os cursos deste nível
          const coursesInLevel = filteredCourses.filter((course) => (course.level || 'Iniciante') === def.id);

          if (coursesInLevel.length === 0) {
            if (selectedLevel === def.id) {
              return (
                <div key={def.id} className="text-center py-12 bg-[#170C2B] rounded-2xl border border-purple-950 p-6">
                  <p className="text-sm text-purple-300">Nenhum curso encontrado neste nível com os filtros aplicados.</p>
                </div>
              );
            }
            return null;
          }

          return (
            <section key={def.id} className="w-full space-y-4">
              
              {/* Header do Nível */}
              <div className={`w-full bg-[#170C2B] border ${def.accentBorder} rounded-2xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-3 relative overflow-hidden`}>
                <div className="space-y-1.5 max-w-3xl">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${def.badgeClass}`}>
                      {def.badgeText}
                    </span>
                    <span className="text-xs text-purple-300 font-bold">
                      {coursesInLevel.length} {coursesInLevel.length === 1 ? 'curso' : 'cursos'}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                    {def.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed font-medium">
                    {def.description}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-2 text-xs font-bold text-purple-300">
                  <span className="hidden sm:inline bg-[#10061D] px-3 py-1.5 rounded-xl border border-purple-500/20">
                    Formação Progressiva
                  </span>
                </div>
              </div>

              {/* Grid de Cursos do Nível */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {coursesInLevel.map((course) => {
                  const pedagogicalReason = COURSE_REASONS[course.id];

                  return (
                    <div
                      key={course.id}
                      className="bg-[#170C2B] border border-[#4C1D95]/40 hover:border-[#8B5CF6]/70 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-4 transition-all duration-200 hover:-translate-y-1 group relative"
                    >
                      <div className="space-y-3">
                        {/* Header do Card com Nível de Dificuldade & Carga Horária */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-bold bg-[#24123E] text-[#DDD6FE] border border-[#7C3AED]/30 px-2.5 py-0.5 rounded-md">
                              {course.category}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${def.badgeClass}`}>
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

                        {/* Motivo Pedagógico / Justificativa Estruturada */}
                        {pedagogicalReason && (
                          <div className="bg-[#120722] border border-[#7C3AED]/30 rounded-xl p-3 text-[11px] leading-relaxed space-y-1">
                            <div className="font-extrabold text-[#FBBF24] flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-[#FBBF24]" />
                              <span>Motivo &amp; Foco Pedagógico:</span>
                            </div>
                            <p className="text-purple-100/90 italic">
                              "{pedagogicalReason}"
                            </p>
                          </div>
                        )}

                        {/* Módulos e Emblema Oficial */}
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
                  );
                })}
              </div>

            </section>
          );
        })}
      </div>

    </div>
  );
}
