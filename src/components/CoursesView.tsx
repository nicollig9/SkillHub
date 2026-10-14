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

// Identificação oficial dos cursos numerados nos níveis
const COURSE_LABELS: Record<string, string> = {
  // Nível 1: Iniciante (Fundamentos & Adaptação)
  'curso-orcamento-primeiro-salario': 'Curso 1',
  'curso-saude-mental-trabalho': 'Curso 2',
  'curso-financas-pessoais': 'Curso 3',
  'curso-excel-iniciante': 'Curso 5',
  'curso-informatica-seguranca': 'Curso 9',

  // Nível 2: Intermediário (Prática Profissional & Rotinas)
  'curso-comunicacao-nao-violenta': 'Curso 4',
  'curso-excel-basico-avancado': 'Curso 6',
  'curso-rotinas-administrativas': 'Curso 7',
  'curso-comunicacao-corporativa': 'Curso 8',
  'curso-planejamento-orcamento': 'Curso 10',

  // Nível 3: Avançado (Tecnologia, Inovação & Compliance)
  'curso-ia-produtividade': 'Curso 11',
  'curso-lgpd-seguranca-dados': 'Curso 12',
};

// Mapeamento dos motivos e objetivos pedagógicos
const COURSE_REASONS: Record<string, string> = {
  // Nível 1
  'curso-orcamento-primeiro-salario': 'Adaptação financeira inicial, mentalidade consciente sobre o salário líquido, impostos do contracheque e formação de hábitos de poupança.',
  'curso-saude-mental-trabalho': 'Inteligência emocional de entrada, controle da ansiedade no primeiro emprego e foco para conciliar novas responsabilidades.',
  'curso-financas-pessoais': 'Organização de rotina semanal, conciliação prática entre os horários escolares e a jornada de trabalho sem esgotamento mental.',
  'curso-excel-iniciante': 'Primeiros passos em planilhas eletrônicas, interface básica, inserção de dados, primeiras fórmulas matemáticas e gráficos simples.',
  'curso-informatica-seguranca': 'Conceitos fundamentais de informática, arquivos em nuvem, cuidados com senhas corporativas e prevenção a vírus e phishing.',

  // Nível 2
  'curso-comunicacao-nao-violenta': 'Comunicação empática e sem conflitos no dia a dia do escritório, escuta ativa e mediação de divergências.',
  'curso-excel-basico-avancado': 'Operações estruturadas de escritório, tabelas dinâmicas, PROCV, funções lógicas e padronização visual de dados.',
  'curso-rotinas-administrativas': 'Organização e controle de processos internos, redação de atas formais, arquivos e atendimento telefônico institucional.',
  'curso-comunicacao-corporativa': 'Redação técnica de e-mails, ofícios e relatórios formais com clareza, concisão e respeito à netiqueta corporativa.',
  'curso-planejamento-orcamento': 'Planejamento financeiro prático pelo método 50-30-20, cálculo de juros e construção da reserva de emergência.',

  // Nível 3
  'curso-ia-produtividade': 'Aplicação prática de Inteligência Artificial generativa, engenharia de prompts avançada e automação de fluxos operacionais.',
  'curso-lgpd-seguranca-dados': 'Conformidade com a Lei Geral de Proteção de Dados (LGPD), classificação de dados sensíveis e segurança da informação corporativa.'
};

const LEVEL_DEFINITIONS = [
  {
    id: 'Iniciante',
    badgeText: '🟢 Nível 1: Iniciante',
    title: 'Nível 1: Iniciante (Fundamentos & Adaptação)',
    description: 'Cursos de entrada, focados na adaptação ao primeiro emprego, conceitos básicos de informática e primeiros passos na organização pessoal/financeira.',
    accentBorder: 'border-emerald-500/40',
    badgeClass: 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40',
    dotColor: 'bg-emerald-400',
    priorityOrder: [
      'curso-orcamento-primeiro-salario',
      'curso-saude-mental-trabalho',
      'curso-financas-pessoais',
      'curso-excel-iniciante',
      'curso-informatica-seguranca'
    ]
  },
  {
    id: 'Intermediário',
    badgeText: '🟡 Nível 2: Intermediário',
    title: 'Nível 2: Intermediário (Prática Profissional & Rotinas)',
    description: 'Cursos para aprimorar a atuação no dia a dia do escritório, comunicação corporativa e ferramentas de produtividade.',
    accentBorder: 'border-amber-500/40',
    badgeClass: 'bg-amber-950/70 text-amber-300 border-amber-500/40',
    dotColor: 'bg-amber-400',
    priorityOrder: [
      'curso-comunicacao-nao-violenta',
      'curso-excel-basico-avancado',
      'curso-rotinas-administrativas',
      'curso-comunicacao-corporativa',
      'curso-planejamento-orcamento'
    ]
  },
  {
    id: 'Avançado',
    badgeText: '🔴 Nível 3: Avançado',
    title: 'Nível 3: Avançado (Tecnologia, Inovação & Compliance)',
    description: 'Cursos que exigem visão crítica, aplicação de tecnologias emergentes e regras de governança/privacidade.',
    accentBorder: 'border-rose-500/40',
    badgeClass: 'bg-rose-950/70 text-rose-300 border-rose-500/40',
    dotColor: 'bg-rose-400',
    priorityOrder: [
      'curso-ia-produtividade',
      'curso-lgpd-seguranca-dados'
    ]
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
      course.badgeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (COURSE_LABELS[course.id] && COURSE_LABELS[course.id].toLowerCase().includes(searchQuery.toLowerCase()));

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
                <span>Trilha Formativa Oficial</span>
              </div>
              <span className="bg-[#250B3E]/90 text-purple-200 border border-purple-500/40 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                100% Gratuito &amp; Online
              </span>
              <span className="bg-[#150524]/90 text-purple-200 border border-purple-500/30 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-[#D8B4FE]" />
                Certificação por Competências
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Catálogo de Cursos por Níveis
            </h1>
            <p className="text-xs sm:text-sm text-purple-200 leading-relaxed">
              Trilha progressiva estruturada em 3 níveis: <strong className="text-emerald-300">Nível 1 (Iniciante)</strong>, <strong className="text-amber-300">Nível 2 (Intermediário)</strong> e <strong className="text-rose-300">Nível 3 (Avançado)</strong> para acelerar sua carreira.
            </p>
          </div>

          <div className="bg-[#140824]/90 border border-[#7C3AED]/50 rounded-2xl p-4 text-center shrink-0 shadow-lg">
            <div className="text-2xl font-black text-[#FBBF24]">{filteredCourses.length}</div>
            <div className="text-[11px] text-purple-200 mt-0.5">Cursos Disponíveis</div>
          </div>
        </div>

        {/* Seção Explicativa: Para que servem os cursos */}
        <div className="flex flex-col lg:flex-row justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-3xl">
            <h2 className="text-xl lg:text-2xl font-black text-white tracking-tight leading-tight">
              Como funciona a progressão de aprendizado?
            </h2>
            <p className="text-sm sm:text-base text-purple-100 leading-relaxed font-medium">
              A trilha é dividida para acompanhar o seu amadurecimento profissional: desde a <strong className="text-emerald-300">adaptação ao primeiro emprego e noções básicas</strong>, passando pela <strong className="text-amber-300">prática diária de rotinas corporativas e planilhas</strong>, até a <strong className="text-rose-300">inovação com inteligência artificial e conformidade com a LGPD</strong>.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-purple-200 pt-2 border-t border-[#6E259F]/30">
              <div>
                <span className="text-purple-300">Foco Principal:</span>{' '}
                <strong className="text-white">Jovem Aprendiz, Estágio e Primeiro Emprego</strong>
              </div>
              <div>
                <span className="text-purple-300">Metodologia:</span>{' '}
                <strong className="text-white">Casos Reais, Simulações Práticas e Avaliações com Feedback</strong>
              </div>
            </div>
          </div>

          {/* Card Lateral de Certificação e Empregabilidade */}
          <div className="bg-[#150524]/90 border border-[#6E259F]/60 rounded-2xl p-5 lg:w-72 text-center flex flex-col items-center justify-between shrink-0 shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#521C7E] to-[#6E259F] flex items-center justify-center text-white mb-2 shadow-lg shadow-purple-900/50">
              <GraduationCap className="w-8 h-8 text-[#DDD6FE]" />
            </div>
            <div>
              <div className="text-xs font-bold text-white mb-0.5">Certificação Oficial</div>
              <div className="text-xs text-purple-200 font-extrabold mb-1">Badges por Nível</div>
              <div className="text-[11px] text-purple-300 leading-tight">
                Complete os cursos de cada nível para acumular badges comprovando suas habilidades técnicas e socioemocionais.
              </div>
            </div>
            <div className="mt-3 w-full bg-[#24103E] border border-purple-500/30 text-purple-200 text-[11px] font-bold py-1.5 px-3 rounded-xl flex items-center justify-center gap-1.5">
              <span>{COURSES.length} Cursos Cadastrados</span>
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
              placeholder="Pesquisar por Curso 1, Curso 11, nome, ferramenta..."
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
      <div className="w-full space-y-12">
        {LEVEL_DEFINITIONS.filter((def) => selectedLevel === 'TODOS' || selectedLevel === def.id).map((def) => {
          // Filtrar os cursos deste nível
          const rawCoursesInLevel = filteredCourses.filter((course) => (course.level || 'Iniciante') === def.id);

          // Ordenação prioritária: cursos oficiais numerados solicitados aparecem primeiro na ordem exata (Curso 1, 2, 3...)
          const priorityIndex = (id: string, list: string[]) => {
            const idx = list.indexOf(id);
            return idx === -1 ? 999 : idx;
          };

          const coursesInLevel = [...rawCoursesInLevel].sort(
            (a, b) => priorityIndex(a.id, def.priorityOrder) - priorityIndex(b.id, def.priorityOrder)
          );

          if (coursesInLevel.length === 0) {
            if (selectedLevel === def.id) {
              return (
                <div key={def.id} className="text-center py-12 bg-[#170C2B] rounded-2xl border border-purple-950 p-6">
                  <p className="text-sm text-purple-300">Nenhum curso encontrado neste nível com os filtros selecionados.</p>
                </div>
              );
            }
            return null;
          }

          return (
            <section key={def.id} className="w-full space-y-5">
              
              {/* Header do Nível */}
              <div className={`w-full bg-[#170C2B] border ${def.accentBorder} rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden`}>
                <div className="space-y-1.5 max-w-3xl">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${def.badgeClass}`}>
                      {def.badgeText}
                    </span>
                    <span className="text-xs text-purple-300 font-bold">
                      {coursesInLevel.length} {coursesInLevel.length === 1 ? 'curso' : 'cursos'}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight">
                    {def.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed font-medium">
                    {def.description}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-2 text-xs font-bold text-purple-300">
                  <span className="hidden sm:inline bg-[#10061D] px-3 py-1.5 rounded-xl border border-purple-500/20">
                    Trilha Estruturada
                  </span>
                </div>
              </div>

              {/* Grid de Cursos do Nível */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {coursesInLevel.map((course) => {
                  const courseLabel = COURSE_LABELS[course.id];
                  const pedagogicalReason = COURSE_REASONS[course.id];

                  return (
                    <div
                      key={course.id}
                      className="bg-[#170C2B] border border-[#4C1D95]/40 hover:border-[#8B5CF6]/70 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-4 transition-all duration-200 hover:-translate-y-1 group relative"
                    >
                      <div className="space-y-3">
                        {/* Header do Card com Tag Oficial do Curso, Categoria & Carga Horária */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {courseLabel && (
                              <span className="text-[11px] font-black bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 px-2.5 py-0.5 rounded-md shadow-sm">
                                {courseLabel}
                              </span>
                            )}
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
                              <span>Foco do Curso:</span>
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
