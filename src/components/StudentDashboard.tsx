'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { COURSES, TRACKS } from '@/data/coursesData';
import { BAIRROS_CURITIBA } from '@/data/mockData';
import {
  GraduationCap,
  Trees,
  Footprints,
  Bus,
  Award,
  Clock,
  Calendar,
  Building2,
  CheckCircle2,
  ExternalLink,
  Plus,
  Play,
  ArrowRight,
  Sparkles,
  MapPin,
  TrendingUp,
  CloudRain,
  Sun,
  Cloud,
  Compass,
  Download,
  Printer,
  X,
  FileCheck,
  Utensils,
  HeartPulse,
  Navigation
} from 'lucide-react';

interface UserCourse {
  id: string;
  title: string;
  institution: string;
  workload: string;
  date: string;
  progress: number;
  status: 'CONCLUIDO' | 'EM_ANDAMENTO';
  certificateCode?: string;
}

export default function StudentDashboard() {
  const {
    currentUser,
    candidateProfileType,
    openCourse,
    setCurrentView,
    student,
    vagas,
    applications,
    badges,
    showToast
  } = useApp();

  const userName = currentUser?.nome || student.nome || 'Nicoli Silva';
  const studentBairro = student?.endereco?.bairro || 'CIC';

  // Lista dos cursos do usuário (5 concluídos + 1 em andamento = 120h)
  const [userCourses, setUserCourses] = useState<UserCourse[]>([
    {
      id: 'curso-rotinas-adm',
      title: 'Rotinas Administrativas & Gestão de Documentos',
      institution: 'FAS Curitiba & SkillHub',
      workload: '40h',
      date: '15/09/2026',
      progress: 100,
      status: 'CONCLUIDO',
      certificateCode: 'SKILL-PR-2026-ADM9841'
    },
    {
      id: 'curso-excel-avancado',
      title: 'Microsoft Excel & Planilhas para Escritório',
      institution: 'SENAI Paraná',
      workload: '24h',
      date: '28/08/2026',
      progress: 100,
      status: 'CONCLUIDO',
      certificateCode: 'SKILL-PR-2026-EXC7712'
    },
    {
      id: 'curso-comunicacao-nv',
      title: 'Comunicação Não-Violenta e Postura Corporativa',
      institution: 'SkillHub Academy',
      workload: '16h',
      date: '10/09/2026',
      progress: 100,
      status: 'CONCLUIDO',
      certificateCode: 'SKILL-PR-2026-CNV4409'
    },
    {
      id: 'curso-ia-trabalho',
      title: 'Inteligência Artificial & Produtividade no Trabalho',
      institution: 'Polo Tecnológico da CIC',
      workload: '20h',
      date: '01/10/2026',
      progress: 100,
      status: 'CONCLUIDO',
      certificateCode: 'SKILL-PR-2026-IA8820'
    },
    {
      id: 'curso-orcamento-primeiro-salario',
      title: 'Orçamento do Primeiro Salário e Finanças Pessoais',
      institution: 'Educação Financeira PR',
      workload: '20h',
      date: '14/10/2026',
      progress: 100,
      status: 'CONCLUIDO',
      certificateCode: 'SKILL-PR-2026-FIN1023'
    },
    {
      id: 'curso-ingles-corporativo',
      title: 'Inglês para Atendimento e Rotinas Corporativas',
      institution: 'SkillHub Global',
      workload: '30h',
      date: 'Iniciado em 16/10/2026',
      progress: 65,
      status: 'EM_ANDAMENTO'
    }
  ]);

  // Filtro Rápido por Região de Curitiba
  const [selectedRegion, setSelectedRegion] = useState<'MATRIZ' | 'CIC' | 'BOA_VISTA' | 'SANTA_FELICIDADE'>('MATRIZ');

  // Modais
  const [selectedCertificate, setSelectedCertificate] = useState<UserCourse | null>(null);
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState<boolean>(false);
  const [newCourseName, setNewCourseName] = useState<string>('');
  const [newCourseInstitution, setNewCourseInstitution] = useState<string>('SENAI Paraná');
  const [newCourseHours, setNewCourseHours] = useState<string>('20h');

  // Dados das Regiões de Curitiba
  const REGIOES_DATA = {
    MATRIZ: {
      nome: 'Regional Matriz / Centro',
      vagasAtivas: 18,
      parques: 'Passeio Público, Praça Santos Andrade, Bosque do Papa',
      caminhabilidade: 'Nota 94/100 (Excelente infraestrutura de calçadas e ciclovias)',
      transporte: 'Conexão com Rui Barbosa, Tiradentes e Linha Central'
    },
    CIC: {
      nome: 'Regional CIC (Cidade Industrial)',
      vagasAtivas: 24,
      parques: 'Parque dos Tropeiros, Bosque da CIC',
      caminhabilidade: 'Nota 82/100 (Acessível pelos eixos industriais e alimentadores)',
      transporte: 'Terminal CIC, Ligeirinho 040 e Interbairros II'
    },
    BOA_VISTA: {
      nome: 'Regional Boa Vista / Norte',
      vagasAtivas: 12,
      parques: 'Parque São Lourenço, Bosque Alemão, Parque Bacacheri',
      caminhabilidade: 'Nota 89/100 (Bairros arborizados e tranquilos)',
      transporte: 'Terminal Boa Vista, Terminal Cabral e Biarticulado Santa Cândida'
    },
    SANTA_FELICIDADE: {
      nome: 'Regional Santa Felicidade / Oeste',
      vagasAtivas: 9,
      parques: 'Parque Barigui, Parque Tingui, Bosque São Cristóvão',
      caminhabilidade: 'Nota 87/100 (Polo gastronômico e turístico integrado)',
      transporte: 'Terminal Santa Felicidade, Linha Turismo e Ligeirinho Barigui'
    }
  };

  // Widget de Clima e Dica de Passeio em Curitiba
  const climaCuritiba = {
    temp: '19°C',
    condicao: 'Garoa Típica Curitibana',
    icone: CloudRain,
    dicaTitulo: 'Museu Oscar Niemeyer (MON) & Bosque do Papa',
    dicaDescricao: 'Dia perfeito para aproveitar o acervo coberto do MON no Centro Cívico ou saborear um pastel na Feira do Juvevê. Fácil acesso pela Linha Turismo e Ligeirinho Aeroporto/Centro Cívico.',
    linhaSugerida: 'Ligeirinho 040 ou Linha Direta Inter 2'
  };

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseName.trim()) return;

    const newEntry: UserCourse = {
      id: `curso-manual-${Date.now()}`,
      title: newCourseName.trim(),
      institution: newCourseInstitution,
      workload: newCourseHours,
      date: new Date().toLocaleDateString('pt-BR'),
      progress: 100,
      status: 'CONCLUIDO',
      certificateCode: `SKILL-PR-2026-EXT${Math.floor(1000 + Math.random() * 9000)}`
    };

    setUserCourses([newEntry, ...userCourses]);
    setNewCourseName('');
    setIsAddCourseModalOpen(false);
    showToast('Curso Registrado!', `${newEntry.title} adicionado ao seu histórico.`, 'success');
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 pb-12 animate-fadeIn">
      {/* ========================================================================= */}
      {/* CABEÇALHO DO DASHBOARD (PADRÃO ESCURO E ELEGANTE)                         */}
      {/* ========================================================================= */}
      <div className="bg-[#110E1B] border border-purple-500/20 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-purple-950/80 text-purple-200 border border-purple-500/30">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Painel de Indicadores &amp; Carreira</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/70 text-emerald-300 border border-emerald-500/30">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{studentBairro} • Curitiba/PR</span>
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Olá, <span className="text-purple-300">{userName}</span>!
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              Acompanhe suas capacitações profissionais, métricas de mobilidade urbana em Curitiba e oportunidades verificadas para o seu perfil.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <button
              onClick={() => setIsAddCourseModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-950/40 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar Novo Curso</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. CARDS DE MÉTRICAS E KPIS PRINCIPAIS (TOPO DA TELA)                     */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Cursos & Capacitações */}
        <div className="bg-[#140E24] border border-purple-500/20 rounded-2xl p-4 sm:p-5 shadow-lg space-y-1.5 transition-all hover:border-purple-500/40">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span className="font-bold uppercase tracking-wider text-purple-300">Cursos &amp; Capacitações</span>
            <div className="w-8 h-8 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            5 Cursos Concluídos
          </div>
          <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>120h de Carga Horária Acumulada</span>
          </p>
        </div>

        {/* KPI 2: Parques e Acessibilidade */}
        <div className="bg-[#140E24] border border-purple-500/20 rounded-2xl p-4 sm:p-5 shadow-lg space-y-1.5 transition-all hover:border-purple-500/40">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span className="font-bold uppercase tracking-wider text-emerald-300">Parques &amp; Acessibilidade</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
              <Trees className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            48 Áreas Verdes
          </div>
          <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <span>🌿 68 m²/morador em Curitiba</span>
          </p>
        </div>

        {/* KPI 3: Índice de Caminhabilidade */}
        <div className="bg-[#140E24] border border-purple-500/20 rounded-2xl p-4 sm:p-5 shadow-lg space-y-1.5 transition-all hover:border-purple-500/40">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span className="font-bold uppercase tracking-wider text-blue-300">Caminhabilidade</span>
            <div className="w-8 h-8 rounded-xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-blue-300">
              <Footprints className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            Nota 88/100
          </div>
          <p className="text-xs text-blue-300 font-semibold flex items-center gap-1">
            <span>📍 Batel, Centro e Juvevê</span>
          </p>
        </div>

        {/* KPI 4: Cobertura de Transportes */}
        <div className="bg-[#140E24] border border-purple-500/20 rounded-2xl p-4 sm:p-5 shadow-lg space-y-1.5 transition-all hover:border-purple-500/40">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span className="font-bold uppercase tracking-wider text-amber-300">Cobertura de Transporte</span>
            <div className="w-8 h-8 rounded-xl bg-amber-950/80 border border-amber-500/30 flex items-center justify-center text-amber-300">
              <Bus className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            26 Pontos de Integração
          </div>
          <p className="text-xs text-amber-300 font-semibold flex items-center gap-1">
            <span>🚌 Linha Turismo &amp; Terminais URBS</span>
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SEÇÃO: MEUS CURSOS E CAPACITAÇÕES PROFISSIONAIS                        */}
      {/* ========================================================================= */}
      <div className="bg-[#110E1B] border border-purple-500/20 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#2D1B4E]/60 pb-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-300 mb-1">
              <GraduationCap className="w-4 h-4 text-purple-400" />
              <span>Histórico Acadêmico &amp; Profissional</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Meus Cursos e Capacitações Profissionais
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Certificados registrados e validados pelas empresas parceiras do SkillHub em Curitiba.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentView('CURSOS_DISPONIVEIS')}
              className="text-xs font-semibold text-purple-300 hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Explorar mais cursos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Grade de Cards de Cursos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userCourses.map((curso) => {
            const isConcluido = curso.status === 'CONCLUIDO';

            return (
              <div
                key={curso.id}
                className="bg-[#140E24] border border-purple-500/20 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3.5 shadow-md hover:border-purple-500/40 transition-all"
              >
                <div className="space-y-2">
                  {/* Status Badge + Carga Horária */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                        isConcluido
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30'
                          : 'bg-blue-950/80 text-blue-300 border-blue-500/30'
                      }`}
                    >
                      {isConcluido ? '✓ Concluído' : '⚡ Em Andamento'}
                    </span>

                    <span className="text-xs font-bold text-zinc-300 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-purple-400" />
                      <span>{curso.workload}</span>
                    </span>
                  </div>

                  {/* Título do Curso */}
                  <h3 className="text-sm sm:text-base font-bold text-white leading-snug line-clamp-2">
                    {curso.title}
                  </h3>

                  {/* Instituição & Data */}
                  <div className="space-y-1 text-xs text-zinc-400">
                    <p className="flex items-center gap-1.5 text-zinc-300 font-medium">
                      <Building2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>{curso.institution}</span>
                    </p>
                    <p className="flex items-center gap-1.5 text-zinc-400">
                      <Calendar className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                      <span>{curso.date}</span>
                    </p>
                  </div>

                  {/* Barra Visual de Progresso para Cursos em Andamento */}
                  {!isConcluido && (
                    <div className="space-y-1 pt-1.5">
                      <div className="flex justify-between text-[11px] font-semibold text-zinc-300">
                        <span>Progresso do Aluno</span>
                        <span className="text-blue-400">{curso.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-[#0F0C1D] rounded-full overflow-hidden border border-[#2D1B4E]">
                        <div
                          style={{ width: `${curso.progress}%` }}
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Botões de Ação na Base do Card */}
                <div className="pt-3 border-t border-[#2D1B4E]/60 flex items-center justify-between gap-2">
                  {isConcluido ? (
                    <button
                      onClick={() => setSelectedCertificate(curso)}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#171126] hover:bg-purple-950/60 border border-purple-500/20 text-xs font-semibold text-zinc-200 hover:text-white transition-all cursor-pointer shadow-xs"
                    >
                      <Award className="w-3.5 h-3.5 text-purple-400" />
                      <span>Visualizar / Baixar Certificado</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => openCourse('curso-comunicacao-corporativa')}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition-all cursor-pointer shadow-md shadow-blue-950/40"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Continuar Aulas ({curso.progress}%)</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. RECURSOS E WIDGETS DO DASHBOARD (DISTRIBUIÇÃO, FILTRO & CLIMA)          */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Widget 1: Distribuição por Categoria de Serviços */}
        <div className="bg-[#110E1B] border border-purple-500/20 rounded-2xl p-5 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-[#2D1B4E]/60 pb-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-purple-400" />
                <span>Distribuição por Categoria</span>
              </h3>
              <span className="text-[11px] text-zinc-400">Curitiba &amp; RMC</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Equipamentos públicos e infraestrutura urbana acessíveis nas proximidades.
            </p>

            {/* Barra Multissegmentada Colorida */}
            <div className="pt-2 space-y-2">
              <div className="w-full h-3.5 bg-[#160F28] rounded-full overflow-hidden flex border border-[#2D1B4E]">
                <div style={{ width: '35%' }} className="h-full bg-purple-500" title="Transporte: 35%" />
                <div style={{ width: '25%' }} className="h-full bg-emerald-500" title="Saúde: 25%" />
                <div style={{ width: '22%' }} className="h-full bg-teal-400" title="Parques: 22%" />
                <div style={{ width: '18%' }} className="h-full bg-amber-400" title="Comércio: 18%" />
              </div>

              {/* Legenda de Categorias */}
              <div className="space-y-1.5 pt-1 text-xs text-zinc-300">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                    <span>Transporte Coletivo &amp; Terminais</span>
                  </span>
                  <span className="font-bold text-white">35%</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span>Saúde &amp; Unidades 24h</span>
                  </span>
                  <span className="font-bold text-white">25%</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                    <span>Parques &amp; Áreas Verdes</span>
                  </span>
                  <span className="font-bold text-white">22%</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span>Gastronomia &amp; Comércio Local</span>
                  </span>
                  <span className="font-bold text-white">18%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#2D1B4E]/60 text-[11px] text-zinc-400 flex items-center justify-between">
            <span>Fonte: Dados Abertos IPPUC 2026</span>
            <span className="text-emerald-400 font-semibold">100% Mapeado</span>
          </div>
        </div>

        {/* Widget 2: Filtro Rápido por Região */}
        <div className="bg-[#110E1B] border border-purple-500/20 rounded-2xl p-5 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#2D1B4E]/60 pb-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-400" />
                <span>Filtro Rápido por Região</span>
              </h3>
              <span className="text-[11px] text-purple-300 font-semibold">4 Regionais</span>
            </div>

            {/* Botões de Alternância Rápida */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'MATRIZ', label: 'Matriz / Centro' },
                { id: 'CIC', label: 'CIC (Industrial)' },
                { id: 'BOA_VISTA', label: 'Boa Vista' },
                { id: 'SANTA_FELICIDADE', label: 'Santa Felicidade' }
              ].map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => setSelectedRegion(reg.id as any)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-left ${
                    selectedRegion === reg.id
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-950/50 ring-1 ring-purple-400'
                      : 'bg-[#140E24] text-zinc-400 hover:text-white border border-[#2D1B4E]'
                  }`}
                >
                  {reg.label}
                </button>
              ))}
            </div>

            {/* Detalhes da Região Selecionada */}
            <div className="bg-[#140E24] border border-purple-500/20 rounded-xl p-3.5 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <strong className="text-white text-sm font-bold">
                  {REGIOES_DATA[selectedRegion].nome}
                </strong>
                <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded text-[11px] font-bold">
                  {REGIOES_DATA[selectedRegion].vagasAtivas} vagas ativas
                </span>
              </div>

              <div className="space-y-1 text-zinc-300 text-[11px]">
                <p>
                  <strong className="text-zinc-200">Parques:</strong> {REGIOES_DATA[selectedRegion].parques}
                </p>
                <p>
                  <strong className="text-zinc-200">Caminhabilidade:</strong> {REGIOES_DATA[selectedRegion].caminhabilidade}
                </p>
                <p>
                  <strong className="text-zinc-200">Transporte:</strong> {REGIOES_DATA[selectedRegion].transporte}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('MAPA_PROXIMIDADE')}
            className="w-full py-2 rounded-xl bg-[#171126] hover:bg-purple-950/70 border border-purple-500/30 text-xs font-bold text-purple-200 hover:text-white transition-all text-center cursor-pointer"
          >
            Ver Vagas &amp; Pontos desta Regional ➔
          </button>
        </div>

        {/* Widget 3: Clima e Dica de Passeio em Curitiba */}
        <div className="bg-[#110E1B] border border-purple-500/20 rounded-2xl p-5 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#2D1B4E]/60 pb-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <CloudRain className="w-4 h-4 text-blue-400" />
                <span>Clima &amp; Dica de Passeio</span>
              </h3>
              <span className="text-[11px] bg-blue-950/80 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded font-semibold">
                Tempo Real
              </span>
            </div>

            {/* Temperatura e Condição */}
            <div className="flex items-center justify-between bg-[#140E24] border border-blue-500/20 rounded-xl p-3.5">
              <div className="space-y-0.5">
                <span className="text-xs text-zinc-400 block">Curitiba / Paraná</span>
                <span className="text-2xl font-black text-white">{climaCuritiba.temp}</span>
                <span className="text-xs text-blue-300 block">{climaCuritiba.condicao}</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-blue-300">
                <CloudRain className="w-6 h-6 text-blue-400 animate-pulse" />
              </div>
            </div>

            {/* Recomendação Dinâmica de Passeio */}
            <div className="bg-[#140E24] border border-purple-500/20 rounded-xl p-3.5 space-y-1.5 text-xs">
              <div className="flex items-center gap-1 text-purple-300 font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Dica do Dia para Você:</span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-white">
                {climaCuritiba.dicaTitulo}
              </h4>
              <p className="text-[11px] text-zinc-300 leading-relaxed">
                {climaCuritiba.dicaDescricao}
              </p>
              <div className="pt-1 text-[11px] text-emerald-400 font-medium">
                🚌 Linha recomendada: {climaCuritiba.linhaSugerida}
              </div>
            </div>
          </div>

          <div className="text-[11px] text-zinc-400 text-center">
            Aproveite os pontos turísticos integrados com desconto estudantil.
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: VISUALIZAR / BAIXAR CERTIFICADO OFICIAL                          */}
      {/* ========================================================================= */}
      {selectedCertificate && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            className="relative w-full max-w-xl mx-auto bg-white text-zinc-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-zinc-200 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCertificate(null)}
              className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-zinc-800 bg-zinc-100 rounded-xl transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Cabeçalho do Certificado */}
            <div className="text-center space-y-1 border-b-2 border-purple-600 pb-4">
              <span className="text-xs font-bold text-purple-700 uppercase tracking-widest block">
                República Federativa do Brasil • Estado do Paraná
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
                CERTIFICADO DE CONCLUSÃO
              </h2>
              <p className="text-xs text-zinc-500">
                Plataforma SkillHub de Formação &amp; Capacitação Profissional
              </p>
            </div>

            {/* Texto do Certificado */}
            <div className="text-center space-y-3 py-2 text-sm text-zinc-700 leading-relaxed">
              <p>
                Certificamos que <strong>{userName}</strong> concluiu com êxito o programa de capacitação profissional em:
              </p>
              <h3 className="text-base sm:text-lg font-black text-purple-900 py-1">
                {selectedCertificate.title}
              </h3>
              <p className="text-xs text-zinc-600">
                Instituição formadora: <strong>{selectedCertificate.institution}</strong> • Carga horária total: <strong>{selectedCertificate.workload}</strong>
              </p>
              <p className="text-xs text-zinc-500">
                Data de emissão: {selectedCertificate.date} • Registro de autenticidade:
              </p>
              <div className="font-mono text-xs font-bold text-purple-800 bg-purple-50 p-2 rounded-lg border border-purple-200 inline-block">
                {selectedCertificate.certificateCode || 'SKILL-PR-2026-CERT-OK'}
              </div>
            </div>

            {/* Rodapé do Modal */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-200 gap-3">
              <button
                onClick={() => setSelectedCertificate(null)}
                className="px-4 py-2 rounded-xl border border-zinc-300 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  window.print();
                  showToast('Pronto para Impressão', 'Certificado pronto para salvar em PDF.', 'info');
                }}
                className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir / Salvar em PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: ADICIONAR NOVO CURSO                                             */}
      {/* ========================================================================= */}
      {isAddCourseModalOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsAddCourseModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md mx-auto bg-[#140E24] border border-purple-500/30 text-white rounded-3xl p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsAddCourseModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white bg-[#0F0C1D] rounded-xl transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1 border-b border-[#2D1B4E] pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-purple-400" />
                <span>Adicionar Nova Capacitação</span>
              </h2>
              <p className="text-xs text-zinc-400">
                Registre um curso concluído externamente ou no ecossistema do SkillHub.
              </p>
            </div>

            <form onSubmit={handleAddCourse} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-zinc-200 block">Nome do Curso / Oficina:</label>
                <input
                  type="text"
                  required
                  value={newCourseName}
                  onChange={(e) => setNewCourseName(e.target.value)}
                  placeholder="Ex: Atendimento ao Cliente e Redação Corporativa"
                  className="w-full bg-[#0F0C1D] border border-purple-500/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-zinc-200 block">Instituição Emissora:</label>
                <input
                  type="text"
                  required
                  value={newCourseInstitution}
                  onChange={(e) => setNewCourseInstitution(e.target.value)}
                  placeholder="Ex: SENAI, FAS Curitiba, Sebrae, CIEE..."
                  className="w-full bg-[#0F0C1D] border border-purple-500/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-zinc-200 block">Carga Horária (Horas):</label>
                <select
                  value={newCourseHours}
                  onChange={(e) => setNewCourseHours(e.target.value)}
                  className="w-full bg-[#0F0C1D] border border-purple-500/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                >
                  <option value="8h">8 Horas</option>
                  <option value="12h">12 Horas</option>
                  <option value="16h">16 Horas</option>
                  <option value="20h">20 Horas</option>
                  <option value="30h">30 Horas</option>
                  <option value="40h">40 Horas</option>
                  <option value="60h">60 Horas</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddCourseModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#2D1B4E] text-zinc-300 hover:text-white text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Salvar Curso
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
