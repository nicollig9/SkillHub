'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { COURSES } from '@/data/coursesData';
import { CandidateProfileType } from '@/types';
import { 
  BookOpen, 
  Search, 
  Clock, 
  Award, 
  ArrowRight, 
  GraduationCap, 
  Sparkles,
  CheckCircle2,
  MapPin,
  Target
} from 'lucide-react';

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
    accentBorder: 'border-emerald-500/30',
    badgeClass: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30',
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
    accentBorder: 'border-amber-500/30',
    badgeClass: 'bg-amber-950/60 text-amber-300 border-amber-500/30',
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
    accentBorder: 'border-rose-500/30',
    badgeClass: 'bg-rose-950/60 text-rose-300 border-rose-500/30',
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
      
      {/* Banner Principal Unificado: Aba de Cursos & Progressão por Níveis */}
      <div className="w-full bg-white dark:bg-[#110E1B] border border-slate-200 dark:border-[#2D1B4E]/60 rounded-3xl p-6 lg:p-8 shadow-sm dark:shadow-2xl relative overflow-hidden space-y-6">
        
        {/* Cabeçalho do Catálogo */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10 pb-6 border-b border-[#2D1B4E]/60">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-slate-200 dark:bg-[#171126] border border-slate-300 dark:border-purple-500/30 px-3 py-1 rounded-full text-xs font-semibold text-slate-800 dark:text-zinc-300">
                <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                <span>Certificação por Competências</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-slate-200 dark:bg-[#171126] border border-slate-300 dark:border-purple-500/30 px-3 py-1 rounded-full text-xs font-semibold text-slate-800 dark:text-zinc-300">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>Focado em Curitiba &amp; RMC</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Catálogo de Cursos por Níveis
            </h1>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
              Trilha formativa progressiva e orientada à empregabilidade, desenvolvida para apoiar sua trajetória profissional desde o primeiro emprego até funções analíticas e de gestão.
            </p>
          </div>

          {/* Card Único de Métricas Dinâmicas */}
          <div className="bg-[#171126] border border-[#2D1B4E] rounded-2xl p-4 sm:p-5 text-center shrink-0 shadow-lg min-w-[190px] flex flex-col items-center justify-center">
            <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {COURSES.length}
            </div>
            <div className="text-xs text-zinc-400 font-medium mt-1">
              Cursos Cadastrados
            </div>
          </div>
        </div>

        {/* Estrutura Visual: 3 Cards de Níveis em Grid Horizontal */}
        <div className="relative z-10 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Progressão de Aprendizado
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* Card 1: Nível 1 */}
            <div className="bg-[#171126] border border-emerald-500/20 hover:border-emerald-500/40 rounded-2xl p-4 transition-all flex flex-col justify-between space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Nível 1 (Iniciante)
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Primeiros passos, adaptação ao mercado e postura profissional.
              </p>
            </div>

            {/* Card 2: Nível 2 */}
            <div className="bg-[#171126] border border-amber-500/20 hover:border-amber-500/40 rounded-2xl p-4 transition-all flex flex-col justify-between space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-950/60 text-amber-300 border border-amber-500/30">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  Nível 2 (Intermediário)
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Prática diária de rotinas corporativas, Excel e planilhas.
              </p>
            </div>

            {/* Card 3: Nível 3 */}
            <div className="bg-[#171126] border border-rose-500/20 hover:border-rose-500/40 rounded-2xl p-4 transition-all flex flex-col justify-between space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg bg-rose-950/60 text-rose-300 border border-rose-500/30">
                  <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                  Nível 3 (Avançado)
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Inovação com Inteligência Artificial, automação e LGPD.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Barra de Filtros & Pesquisa - 100% Centralizada */}
      <div className="w-full bg-white dark:bg-[#140E24] border border-slate-300 dark:border-[#2D1B4E]/60 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        
        {/* Linha 1: Input de Busca + Filtro por Público */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          <div className="md:col-span-7 relative">
            <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar por título, área, ferramenta ou competência..."
              className="w-full bg-white dark:bg-[#0D0818] border border-slate-300 dark:border-[#2D1B4E] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-500 font-semibold focus:outline-none focus:border-purple-600"
            />
          </div>

          <div className="md:col-span-5 flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800 dark:text-zinc-400 shrink-0">Para quem:</span>
            <select
              value={selectedAudience}
              onChange={(e) => setSelectedAudience(e.target.value as any)}
              className="w-full bg-white dark:bg-[#0D0818] border border-slate-300 dark:border-[#2D1B4E] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-purple-600"
            >
              <option value="TODOS">Todos os Públicos</option>
              <option value="JOVEM_APRENDIZ">Jovem Aprendiz</option>
              <option value="ESTAGIARIO">Estagiário</option>
              <option value="PRIMEIRO_EMPREGO">Primeiro Emprego</option>
            </select>
          </div>

        </div>

        {/* Linha 2: Filtro Rápido por Nível */}
        <div className="flex flex-wrap items-center justify-start sm:justify-center gap-2 pt-2 border-t border-slate-300 dark:border-[#2D1B4E]/40 text-xs">
          <span className="text-zinc-400 font-bold shrink-0 flex items-center gap-1.5 mr-1">
            <Target className="w-3.5 h-3.5 text-amber-400" />
            Níveis:
          </span>
          <button
            onClick={() => setSelectedLevel('TODOS')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              selectedLevel === 'TODOS'
                ? 'bg-purple-700 text-white font-black shadow'
                : 'bg-slate-200 text-slate-800 hover:text-black hover:bg-slate-300 font-bold border border-slate-300 dark:bg-[#0D0818] dark:text-zinc-400 dark:hover:text-white dark:border-[#2D1B4E]'
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
                    ? 'bg-purple-700 text-white font-black shadow ring-2 ring-purple-600/50'
                    : 'bg-slate-200 text-slate-800 hover:text-black hover:bg-slate-300 font-bold border border-slate-300 dark:bg-[#0D0818] dark:text-zinc-400 dark:hover:text-white dark:border-[#2D1B4E]'
                }`}
              >
                <span>{def.badgeText}</span>
                <span className="text-[10px] opacity-75">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Linha 3: Categorias da Escola Virtual */}
        <div className="flex flex-wrap items-center justify-start sm:justify-center gap-2 text-xs pt-2 border-t border-slate-300 dark:border-[#2D1B4E]/30">
          <span className="text-zinc-400 font-bold shrink-0">Categorias:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-all text-[11px] ${
                selectedCategory === cat
                  ? 'bg-purple-600/80 text-white font-bold'
                  : 'bg-[#0D0818] text-zinc-400 hover:text-white border border-[#2D1B4E]/40'
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

          // Ordenação pedagógica prioritária
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
                <div key={def.id} className="text-center py-12 bg-[#140E24] rounded-2xl border border-[#2D1B4E] p-6">
                  <p className="text-sm text-zinc-400">Nenhum curso encontrado neste nível com os filtros selecionados.</p>
                </div>
              );
            }
            return null;
          }

          return (
            <section key={def.id} className="w-full space-y-5">
              
              {/* Header do Nível */}
              <div className={`w-full bg-[#140E24] border ${def.accentBorder} rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden`}>
                <div className="space-y-1.5 max-w-3xl">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${def.badgeClass}`}>
                      {def.badgeText}
                    </span>
                    <span className="text-xs text-zinc-400 font-bold">
                      {coursesInLevel.length} {coursesInLevel.length === 1 ? 'curso' : 'cursos'}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight">
                    {def.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                    {def.description}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-2 text-xs font-bold text-zinc-400">
                  <span className="hidden sm:inline bg-[#0D0818] px-3 py-1.5 rounded-xl border border-[#2D1B4E]">
                    Trilha Estruturada
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
                      className="bg-white dark:bg-[#140E24] border border-slate-300 dark:border-[#2D1B4E]/60 hover:border-purple-600 dark:hover:border-[#8B5CF6]/70 rounded-2xl p-5 sm:p-6 shadow-sm dark:shadow-xl flex flex-col justify-between space-y-4 transition-all duration-200 hover:-translate-y-1 group relative"
                    >
                      <div className="space-y-3">
                        {/* Header do Card com Categoria, Nível & Carga Horária (SEM numeração 'Curso X') */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-bold bg-slate-200 text-slate-900 border border-slate-300 dark:bg-[#1F1535] dark:text-zinc-300 dark:border-[#2D1B4E] px-2.5 py-0.5 rounded-md">
                              {course.category}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${def.badgeClass}`}>
                              {course.level || 'Iniciante'}
                            </span>
                          </div>
                          <span className="text-xs font-semibold text-zinc-400 flex items-center gap-1 shrink-0">
                            <Clock className="w-3.5 h-3.5 text-zinc-400" />
                            <span>{course.hours}h</span>
                          </span>
                        </div>

                        {/* Título & Subtítulo */}
                        <h3 className="text-base font-black text-slate-900 dark:text-white transition-colors line-clamp-2">
                          {course.title}
                        </h3>

                        <p className="text-xs text-slate-700 dark:text-zinc-400 line-clamp-3 leading-relaxed font-medium">
                          {course.subtitle}
                        </p>

                        {/* Motivo Pedagógico / Justificativa Estruturada */}
                        {pedagogicalReason && (
                          <div className="bg-slate-50 dark:bg-[#0E091A] border border-slate-300 dark:border-[#2D1B4E] rounded-xl p-3 text-[11px] leading-relaxed space-y-1">
                            <div className="font-bold text-slate-900 dark:text-zinc-300 flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-purple-400" />
                              <span>Foco do Curso:</span>
                            </div>
                            <p className="text-slate-800 dark:text-zinc-300/90 font-medium italic">
                              "{pedagogicalReason}"
                            </p>
                          </div>
                        )}

                        {/* Módulos e Emblema Oficial */}
                        <div className="pt-2 text-[11px] text-zinc-400 space-y-1">
                          <div className="flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-[#8B5CF6]" />
                            <span>{course.modules.length} Módulos com Casos Práticos</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Award className="w-3.5 h-3.5 text-amber-400" />
                            <span>Badge: <strong className="text-zinc-200">{course.badgeName}</strong></span>
                          </div>
                        </div>
                      </div>

                      {/* Rodapé com Ação */}
                      <div className="pt-4 border-t border-slate-300 dark:border-[#2D1B4E]/60 flex items-center justify-between">
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
