'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { COURSES, TRACKS } from '@/data/coursesData';
import { BAIRROS_CURITIBA } from '@/data/mockData';
import { JobVacancy } from '@/types';
import JobApplicationModal from '@/components/JobApplicationModal';
import { 
  BookOpen, 
  Clock, 
  Award, 
  GraduationCap, 
  Play, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  TrendingUp, 
  ShieldCheck, 
  ChevronRight,
  Calculator,
  Navigation,
  FileCheck,
  Building2
} from 'lucide-react';

export default function StudentDashboard() {
  const { 
    currentUser, 
    candidateProfileType, 
    setCandidateProfileType, 
    openCourse, 
    setCurrentView,
    student,
    vagas,
    applications,
    badges,
    completedModules,
    filterVagasByProfile
  } = useApp();

  const [selectedDashboardBairro, setSelectedDashboardBairro] = useState<string>('TODOS');
  const [modalVaga, setModalVaga] = useState<JobVacancy | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const userName = currentUser?.nome || student.nome || 'Nicoli Silva';
  const userProfile = candidateProfileType || 'JOVEM_APRENDIZ';
  const studentBairro = student.endereco.bairro || 'Boqueirão';

  const profileLabels: Record<string, { label: string; icon: string; desc: string }> = {
    'JOVEM_APRENDIZ': { label: 'Jovem Aprendiz', icon: '🛡️', desc: 'Programa de Aprendizagem (Lei nº 10.097/00)' },
    'ESTAGIARIO': { label: 'Estagiário', icon: '💼', desc: 'Estágio Técnico ou Superior (Lei nº 11.788/08)' },
    'ESTUDANTE': { label: 'Estudante', icon: '🎒', desc: 'Ensino Fundamental, Médio ou Universitário' },
    'PRIMEIRO_EMPREGO': { label: 'Primeiro Emprego', icon: '🚀', desc: 'Transição e Entrada no Mercado de Trabalho' }
  };

  // Vagas filtradas para o mapa do dashboard
  const profileVagas = filterVagasByProfile(candidateProfileType);
  const dashboardVagas = profileVagas.filter((vaga) => {
    if (selectedDashboardBairro === 'TODOS') return true;
    if (selectedDashboardBairro === 'MESMO_BAIRRO') return vaga.bairro.toLowerCase() === studentBairro.toLowerCase();
    return vaga.bairro.toLowerCase() === selectedDashboardBairro.toLowerCase();
  }).slice(0, 4);

  // Cálculo dinâmico de cursos em andamento a partir de completedModules
  const activeCourseIds = Object.keys(completedModules).filter(
    (cId) => (completedModules[cId]?.length || 0) > 0
  );

  const inProgressCourses = activeCourseIds.map((cId) => {
    const course = COURSES.find((c) => c.id === cId) || COURSES[0];
    const completedCount = completedModules[cId]?.length || 0;
    const totalModules = course.modules.length;
    const progressPercent = Math.min(100, Math.round((completedCount / totalModules) * 100));
    const nextModIndex = Math.min(completedCount, totalModules - 1);
    const nextModTitle = course.modules[nextModIndex]?.title || 'Módulo Final';

    return {
      id: course.id,
      title: course.title,
      category: course.category,
      progress: progressPercent,
      currentModule: nextModTitle
    };
  });

  // Cálculo das 4 métricas principais (100% dinâmicas)
  const metricCursosEmAndamento = inProgressCourses.length;
  const metricHoras = inProgressCourses.reduce((acc, curr) => {
    const c = COURSES.find((item) => item.id === curr.id);
    return acc + Math.round(((c?.hours || 10) * curr.progress) / 100);
  }, 0);
  const metricCertificados = student.badgesEarned.length;
  const metricCandidaturas = applications.length;

  // Recomendações por perfil
  const recommendedCourses = COURSES.filter((c) => {
    if (c.targetAudienceType === 'TODOS') return true;
    if (Array.isArray(c.targetAudienceType)) {
      return c.targetAudienceType.includes(userProfile);
    }
    return true;
  }).slice(0, 4);

  const handleOpenApply = (vaga: JobVacancy) => {
    setModalVaga(vaga);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 animate-fadeIn">
      
      {/* ========================================================================= */}
      {/* 1. BREADCRUMB & HEADER DE BOAS-VINDAS                                      */}
      {/* ========================================================================= */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-purple-300">
          <button onClick={() => setCurrentView('DASHBOARD')} className="hover:text-white flex items-center gap-1">
            <span>🏠</span>
            <span>Home</span>
          </button>
          <span>&gt;</span>
          <span className="text-white font-semibold">Dashboard do Aluno</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Bem-vindo(a),</span>
              <span className="text-[#FBBF24]">{userName}</span>
            </h1>
            <p className="text-xs sm:text-sm text-purple-200 mt-1 flex items-center gap-2 flex-wrap">
              <span className="bg-[#24123E] border border-[#7C3AED]/40 text-[#DDD6FE] px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1.5">
                <span>{profileLabels[userProfile]?.icon}</span>
                <span>Perfil: {profileLabels[userProfile]?.label}</span>
              </span>
              <span>•</span>
              <span>📍 Bairro: <strong>{studentBairro}</strong> (Curitiba/PR)</span>
            </p>
          </div>

          <div className="bg-[#150926] border border-[#521E8A]/50 p-1.5 rounded-xl flex items-center gap-1">
            <span className="text-[10px] text-purple-300 font-bold px-2 hidden sm:inline">Visão:</span>
            {(['JOVEM_APRENDIZ', 'ESTAGIARIO', 'ESTUDANTE', 'PRIMEIRO_EMPREGO'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setCandidateProfileType(p)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  userProfile === p
                    ? 'bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white shadow'
                    : 'text-purple-300 hover:text-white'
                }`}
              >
                {profileLabels[p].label.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. 4 TOP METRIC CARDS (DINÂMICOS CONFORME O PROGRESSO REAL DO ALUNO)      */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Cursos */}
        <div className="bg-[#170C2B] border border-[#4C1D95]/40 hover:border-[#8B5CF6]/60 rounded-2xl p-5 shadow-xl transition-all">
          <div className="flex items-center justify-between text-purple-300 mb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <BookOpen className="w-4 h-4 text-[#8B5CF6]" />
              <span>Cursos em Andamento</span>
            </div>
          </div>
          <div className="text-3xl font-black text-white">{metricCursosEmAndamento}</div>
          <p className="text-[11px] text-purple-300 mt-1 font-medium">
            {metricCursosEmAndamento === 0 ? 'Nenhum curso iniciado' : `${metricCursosEmAndamento} trilha(s) ativa(s)`}
          </p>
        </div>

        {/* Card 2: Horas */}
        <div className="bg-[#170C2B] border border-[#4C1D95]/40 hover:border-[#8B5CF6]/60 rounded-2xl p-5 shadow-xl transition-all">
          <div className="flex items-center justify-between text-purple-300 mb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Clock className="w-4 h-4 text-[#F59E0B]" />
              <span>Horas de Estudo</span>
            </div>
          </div>
          <div className="text-3xl font-black text-white">{metricHoras}h</div>
          <p className="text-[11px] text-purple-300 mt-1 font-medium">Carga horária acumulada</p>
        </div>

        {/* Card 3: Certificados / Badges */}
        <div className="bg-[#170C2B] border border-[#4C1D95]/40 hover:border-[#8B5CF6]/60 rounded-2xl p-5 shadow-xl transition-all">
          <div className="flex items-center justify-between text-purple-300 mb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Award className="w-4 h-4 text-[#10B981]" />
              <span>Badges & Certificados</span>
            </div>
          </div>
          <div className="text-3xl font-black text-white">{metricCertificados}</div>
          <p className="text-[11px] text-purple-300 mt-1 font-medium">Obtidos com Nota &ge; 70%</p>
        </div>

        {/* Card 4: Candidaturas */}
        <div className="bg-[#170C2B] border border-[#4C1D95]/40 hover:border-[#8B5CF6]/60 rounded-2xl p-5 shadow-xl transition-all">
          <div className="flex items-center justify-between text-purple-300 mb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <FileCheck className="w-4 h-4 text-[#38BDF8]" />
              <span>Minhas Candidaturas</span>
            </div>
          </div>
          <div className="text-3xl font-black text-white">{metricCandidaturas}</div>
          <p className="text-[11px] text-purple-300 mt-1 font-medium">Protocoladas no RH</p>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. SEÇÃO DESTACADA: MAPA INTELIGENTE DE VAGAS EM CURITIBA & RMC           */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-[#200E3D] via-[#32135C] to-[#481A7D] border-2 border-[#7C3AED]/60 rounded-3xl p-6 shadow-2xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Geolocalização em Curitiba & Região Metropolitana</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              🗺️ Mapa de Oportunidades & Vagas por Bairro
            </h2>
            <p className="text-xs text-purple-200 mt-0.5">
              Vagas disponíveis para o perfil <strong className="text-amber-300">{profileLabels[userProfile]?.label}</strong> com cálculo de distância do seu bairro ({studentBairro}).
            </p>
          </div>

          <button
            onClick={() => setCurrentView('MAPA_PROXIMIDADE')}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black px-5 py-2.5 rounded-2xl text-xs shadow-lg transition-all transform hover:scale-105 shrink-0"
          >
            <span>Ver Mapa Completo em Tela Cheia</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Seletor de Bairros de Curitiba */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
          <button
            onClick={() => setSelectedDashboardBairro('TODOS')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedDashboardBairro === 'TODOS'
                ? 'bg-amber-400 text-slate-950 shadow'
                : 'bg-[#18092E] text-purple-300 hover:text-white border border-purple-900/50'
            }`}
          >
            Todos os Polos ({profileVagas.length})
          </button>
          <button
            onClick={() => setSelectedDashboardBairro('MESMO_BAIRRO')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedDashboardBairro === 'MESMO_BAIRRO'
                ? 'bg-emerald-400 text-slate-950 shadow'
                : 'bg-[#18092E] text-emerald-300 hover:text-white border border-emerald-500/40'
            }`}
          >
            📍 No meu Bairro ({studentBairro})
          </button>
          {Object.keys(BAIRROS_CURITIBA).map((bairroNome) => {
            const count = profileVagas.filter((v) => v.bairro.toLowerCase() === bairroNome.toLowerCase()).length;
            return (
              <button
                key={bairroNome}
                onClick={() => setSelectedDashboardBairro(bairroNome)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedDashboardBairro === bairroNome
                    ? 'bg-amber-400 text-slate-950 shadow'
                    : 'bg-[#18092E] text-purple-300 hover:text-white border border-purple-900/50'
                }`}
              >
                {bairroNome} ({count})
              </button>
            );
          })}
        </div>

        {/* Cards Rápidos de Vagas com Protocolo de Candidatura */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          {dashboardVagas.map((vaga) => {
            const bairroInfo = BAIRROS_CURITIBA[vaga.bairro];
            const distKm = bairroInfo ? bairroInfo.distKmDoBoqueirao : null;

            return (
              <div
                key={vaga.id}
                className="bg-[#15092A] border border-[#7C3AED]/40 hover:border-amber-400/60 rounded-2xl p-4 shadow-xl flex flex-col justify-between space-y-3 transition-all hover:-translate-y-1"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="bg-[#2E1254] text-purple-200 px-2 py-0.5 rounded font-bold uppercase">
                      {vaga.tipoVaga}
                    </span>
                    <span className="text-emerald-400 font-bold">
                      R$ {vaga.remuneracao.toFixed(2)}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-white line-clamp-2">{vaga.titulo}</h3>
                  <p className="text-[11px] text-amber-300 font-semibold">{vaga.empresaNome}</p>

                  <div className="flex items-center justify-between text-[10px] text-purple-300 pt-1 border-t border-purple-900/40">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{vaga.bairro}</span>
                    </span>
                    {distKm !== null && (
                      <span className="text-purple-300 font-medium">
                        {distKm === 0 ? '📍 Mesmo Bairro' : `🚗 ~${distKm} km`}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  {vaga.jaCandidatou ? (
                    <span className="w-full block text-center py-2 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[11px] font-bold">
                      ✓ Candidatado
                    </span>
                  ) : (
                    <button
                      onClick={() => handleOpenApply(vaga)}
                      className="w-full flex items-center justify-center gap-1.5 bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white text-xs font-bold py-2 rounded-xl shadow-md transition-all"
                    >
                      <span>Candidatar-se</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. GRID: CONTINUAR APRENDENDO / PRIMEIROS PASSOS                          */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LADO ESQUERDO (7 colunas): Cursos em Andamento ou Comece Agora */}
        <div className="lg:col-span-7 bg-[#170C2B] border border-[#4C1D95]/40 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">
                {inProgressCourses.length > 0 ? 'Continuar Aprendendo' : 'Comece Sua Formação Profissional'}
              </h2>
              <p className="text-xs text-purple-200">
                {inProgressCourses.length > 0
                  ? 'Retome de onde você parou suas aulas'
                  : 'Complete módulos gratuitos, ganhe badges verificadas e destaque seu currículo'}
              </p>
            </div>
            <button
              onClick={() => setCurrentView('CURSOS_DISPONIVEIS')}
              className="text-xs font-bold text-[#FDE68A] hover:underline flex items-center gap-1"
            >
              <span>Ver catálogo</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3 pt-2">
            {inProgressCourses.length > 0 ? (
              inProgressCourses.map((c) => (
                <div
                  key={c.id}
                  className="bg-[#120722] border border-[#4C1D95]/30 hover:border-[#7C3AED]/60 rounded-2xl p-4 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 max-w-md">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-[#24123E] text-purple-300 px-2 py-0.5 rounded font-semibold">
                        {c.category}
                      </span>
                      <span className="text-xs font-bold text-emerald-400">
                        {c.progress}% concluído
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white">{c.title}</h3>
                    <p className="text-[11px] text-purple-300 flex items-center gap-1">
                      <span>📍</span>
                      <span>{c.currentModule}</span>
                    </p>
                  </div>

                  <div className="shrink-0 w-full sm:w-auto">
                    <button
                      onClick={() => openCourse(c.id)}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs shadow-md transition-all transform hover:scale-105"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Continuar</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-[#120722] border border-dashed border-[#7C3AED]/50 rounded-2xl p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#2A114D] text-amber-300 flex items-center justify-center mx-auto shadow-lg">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-white">Nenhum curso em andamento ainda</h3>
                <p className="text-xs text-purple-200 max-w-md mx-auto">
                  Escolha um curso da Trilha de Entrada no Mercado para aprender direitos trabalhistas, como estruturar seu currículo e se destacar em entrevistas.
                </p>
                <button
                  onClick={() => openCourse(recommendedCourses[0]?.id || 'curso-jovem-aprendiz-avancado')}
                  className="bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs shadow-lg transition-all"
                >
                  Iniciar Primeiro Curso Recomendado
                </button>
              </div>
            )}
          </div>
        </div>

        {/* LADO DIREITO (5 colunas): Visão de Habilidades e Badges */}
        <div className="lg:col-span-5 bg-[#170C2B] border border-[#4C1D95]/40 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="text-xs font-bold text-purple-300 uppercase tracking-wider">
              BADGES & COMPETÊNCIAS
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Selo de Competências Validadas</h2>
              <p className="text-xs text-purple-200 mt-0.5">
                Badges conquistadas após atingir nota &ge; 70% nas avaliações oficiais
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <span className="bg-[#24123E] text-[#DDD6FE] border border-[#7C3AED]/40 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                {student.badgesEarned.length} Badges Conquistadas
              </span>
            </div>
          </div>

          {/* Lista de Badges Conquistadas */}
          <div className="space-y-2.5 pt-2">
            {badges.slice(0, 3).map((b) => {
              const isEarned = student.badgesEarned.some((be) => be.badgeId === b.id) || b.dateEarned;
              return (
                <div
                  key={b.id}
                  className={`p-3 rounded-2xl border flex items-center justify-between gap-3 ${
                    isEarned
                      ? 'bg-[#1C0E33] border-amber-400/40 text-white'
                      : 'bg-[#10061D] border-purple-900/30 text-purple-400 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#2A114D] flex items-center justify-center text-amber-400 font-bold text-xs">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold">{b.title}</div>
                      <div className="text-[10px] text-purple-300">{b.category} • {b.workloadHours}h</div>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isEarned ? 'bg-emerald-500/20 text-emerald-300' : 'bg-purple-900/30 text-purple-400'
                  }`}>
                    {isEarned ? '✓ Conquistada' : 'Pendente'}
                  </span>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentView('MINHAS_AVALIACOES')}
            className="w-full mt-4 py-2.5 rounded-xl bg-[#24123E] hover:bg-[#341858] border border-[#7C3AED]/40 text-xs font-bold text-[#DDD6FE] hover:text-white transition-all text-center"
          >
            Ver Minhas Avaliações & Certificados
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 5. SEÇÃO: RECOMENDADOS PARA SEU PERFIL                                     */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#FDE68A] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Cursos Recomendados para {profileLabels[userProfile]?.label}</span>
            </div>
            <h2 className="text-xl font-bold text-white">
              Capacitação Profissional Gratuita
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentView('CURSOS_DISPONIVEIS')}
              className="text-xs font-bold text-[#DDD6FE] hover:text-white bg-[#24123E] px-3 py-1.5 rounded-xl border border-[#7C3AED]/40 transition-all"
            >
              Aba só de Cursos
            </button>
            <button
              onClick={() => setCurrentView('TRILHAS_DISPONIVEIS')}
              className="text-xs font-bold text-[#DDD6FE] hover:text-white bg-[#24123E] px-3 py-1.5 rounded-xl border border-[#7C3AED]/40 transition-all"
            >
              Aba só de Trilhas
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendedCourses.map((c) => (
            <div
              key={c.id}
              className="bg-[#170C2B] border border-[#4C1D95]/40 hover:border-[#8B5CF6]/70 rounded-2xl p-5 shadow-lg space-y-3 flex flex-col justify-between transition-all hover:-translate-y-1"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-purple-300">
                  <span className="bg-[#24123E] px-2 py-0.5 rounded font-semibold">
                    {c.hours} Horas
                  </span>
                  <span className="text-[#FDE68A] font-bold">100% Gratuito</span>
                </div>
                <h3 className="text-sm font-bold text-white line-clamp-2">
                  {c.title}
                </h3>
                <p className="text-xs text-purple-200/80 line-clamp-2">
                  {c.subtitle}
                </p>
              </div>

              <div className="pt-2 border-t border-[#3F1F68]/40 flex items-center justify-between">
                <span className="text-[10px] text-purple-300 flex items-center gap-1">
                  <Award className="w-3 h-3 text-[#F59E0B]" />
                  <span>Badge Oficial</span>
                </span>
                <button
                  onClick={() => openCourse(c.id)}
                  className="text-xs font-bold text-[#FDE68A] hover:text-white flex items-center gap-1"
                >
                  <span>Iniciar</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Candidatura Estilo Indeed */}
      <JobApplicationModal
        isOpen={isModalOpen}
        vaga={modalVaga}
        onClose={() => setIsModalOpen(false)}
      />

    </div>
  );
}
