'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import SiteFooter from '@/components/SiteFooter';
import { useApp } from '@/context/AppContext';
import { COURSES, TRACKS, resolveCourseAlias } from '@/data/coursesData';
import { generateCertificateCode } from '@/utils/certificateUtils';
import { 
  Award, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Layers, 
  Sparkles, 
  Share2, 
  Copy, 
  Check, 
  ExternalLink, 
  Edit3, 
  MapPin, 
  User, 
  Briefcase, 
  GraduationCap, 
  ShieldCheck, 
  FileText, 
  ArrowRight,
  TrendingUp,
  Download,
  Flame,
  Star,
  CheckCheck
} from 'lucide-react';

export default function ProfilePassportPage() {
  const { 
    student, 
    currentUser, 
    quizResults, 
    completedModules, 
    cursosInscritos,
    candidateProfileType,
    completeCourseAndClaimBadge
  } = useApp();

  // Dados do Candidato com edição local fluida
  const defaultName = currentUser?.nome || student?.nome || 'Nicolli Vitória';
  const defaultCity = student?.endereco?.bairro 
    ? `${student.endereco.bairro} • Curitiba/PR` 
    : 'Curitiba & Região Metropolitana (PR)';

  const [candidateName, setCandidateName] = useState(defaultName);
  const [candidateLocation, setCandidateLocation] = useState(defaultCity);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Feedbacks de Cópia
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedResumo, setCopiedResumo] = useState(false);
  const [copiedCourseId, setCopiedCourseId] = useState<string | null>(null);

  // Cursos Concluídos pelo Aluno
  const completedCoursesList = useMemo(() => {
    const passedFromQuiz = Object.keys(quizResults || {}).filter((id) => quizResults[id]?.passed);
    const passedFromInscritos = (cursosInscritos || [])
      .filter((c) => c.status === 'concluido' || c.progress === 100)
      .map((c) => c.courseId);

    const allPassedRawIds = Array.from(new Set([...passedFromQuiz, ...passedFromInscritos]));
    const resolvedSet = new Set<string>();

    allPassedRawIds.forEach((rawId) => {
      const resolved = resolveCourseAlias(rawId);
      resolvedSet.add(resolved);
      resolvedSet.add(rawId);
    });

    const seenIds = new Set<string>();
    const list: typeof COURSES = [];

    COURSES.forEach((course) => {
      if (resolvedSet.has(course.id) && !seenIds.has(course.id)) {
        seenIds.add(course.id);
        list.push(course);
      }
    });

    return list;
  }, [quizResults, cursosInscritos]);

  // Indicadores Rápidos (KPIs)
  const totalCursosConcluidos = completedCoursesList.length;
  
  const totalHorasCertificadas = useMemo(() => {
    return completedCoursesList.reduce((acc, c) => acc + (c.hours || 0), 0);
  }, [completedCoursesList]);

  // Matriz de Competências Únicas
  const allSkills = useMemo(() => {
    const skillsSet = new Set<string>();
    completedCoursesList.forEach((course) => {
      if (course.learningObjectives && course.learningObjectives.length > 0) {
        course.learningObjectives.forEach((s) => skillsSet.add(s));
      } else {
        skillsSet.add(`Competências práticas em ${course.title}`);
      }
    });
    return Array.from(skillsSet);
  }, [completedCoursesList]);

  // Categorias dominadas
  const completedCategories = useMemo(() => {
    const catMap = new Map<string, number>();
    completedCoursesList.forEach((c) => {
      const cat = c.category || 'Qualificação Geral';
      catMap.set(cat, (catMap.get(cat) || 0) + 1);
    });
    return Array.from(catMap.entries());
  }, [completedCoursesList]);

  // Progresso nas Trilhas Oficiais
  const tracksProgress = useMemo(() => {
    const completedIdsSet = new Set(completedCoursesList.map((c) => c.id));
    return TRACKS.map((track) => {
      const stepIds = track.steps ? track.steps.map((s) => s.courseId) : track.courseIds;
      const finishedSteps = stepIds.filter((id) => {
        const resolved = resolveCourseAlias(id);
        return completedIdsSet.has(id) || completedIdsSet.has(resolved);
      });
      const pct = stepIds.length > 0 ? Math.round((finishedSteps.length / stepIds.length) * 100) : 0;
      return {
        track,
        totalCourses: stepIds.length,
        doneCount: finishedSteps.length,
        percent: pct,
        isCompleted: pct === 100
      };
    });
  }, [completedCoursesList]);

  // Gerador de Texto "Sobre" para LinkedIn e Currículo
  const generatedAboutText = useMemo(() => {
    const categoriesText = completedCategories.length > 0
      ? completedCategories.map(([cat]) => cat).slice(0, 3).join(', ')
      : 'Administração, Tecnologia e Desenvolvimento Pessoal';

    const coursesNames = completedCoursesList.length > 0
      ? completedCoursesList.map((c) => c.title).slice(0, 3).join('; ')
      : 'Formações preparatórias para o mercado corporativo';

    return `Jovem talento em desenvolvimento profissional com foco em ${categoriesText}, qualificado pela plataforma SkillHub — Polo Curitiba & RMC. Possuo ${totalCursosConcluidos} certificações práticas concluídas com ${totalHorasCertificadas}h de carga horária oficial em ${coursesNames}, alinhadas às diretrizes da Lei da Aprendizagem (Lei nº 10.097/00) e Estágio (Lei nº 11.788/08). Competências desenvolvidas em comunicação assertiva, resolução de problemas, ética e ferramentas digitais. Disponível para oportunidades profissionais em Curitiba e Região Metropolitana.`;
  }, [completedCategories, completedCoursesList, totalCursosConcluidos, totalHorasCertificadas]);

  // Ações de Cópia
  const handleCopyPassportLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleCopyCourseLine = (course: (typeof COURSES)[0]) => {
    const code = generateCertificateCode(course.id, candidateName);
    const line = `Certificação em ${course.title} (${course.hours}h) — SkillHub | Validação: ${code}`;
    navigator.clipboard.writeText(line);
    setCopiedCourseId(course.id);
    setTimeout(() => setCopiedCourseId(null), 2500);
  };

  const handleCopyResumo = () => {
    navigator.clipboard.writeText(generatedAboutText);
    setCopiedResumo(true);
    setTimeout(() => setCopiedResumo(false), 2500);
  };

  // Simular Conclusão para Teste Rápido (caso o usuário queira ver o passaporte preenchido)
  const handleSimulateDemo = () => {
    completeCourseAndClaimBadge('curso-transformacao-digital-inovacao');
    completeCourseAndClaimBadge('excel-avancado');
    completeCourseAndClaimBadge('curso-atendimento-relacionamento-cliente');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-slate-100">
      <Header />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        
        {/* ========================================================================= */}
        {/* 1. CABEÇALHO DO CANDIDATO (PASSAPORTE PROFISSIONAL PÚBLICO)               */}
        {/* ========================================================================= */}
        <section className="w-full bg-[#120a22]/90 border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          {/* Efeitos Glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            {/* Foto / Avatar & Dados Pessoais */}
            <div className="flex items-start sm:items-center gap-4 sm:gap-6 w-full lg:w-auto">
              {/* Avatar com Gradiente Dourado/Roxo */}
              <div className="relative shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-amber-500 p-1 shadow-xl shadow-purple-950/50">
                  <div className="w-full h-full rounded-[22px] bg-[#140826] flex items-center justify-center text-white font-extrabold text-2xl sm:text-3xl font-serif">
                    {candidateName.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()}
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 border-2 border-[#120a22] flex items-center justify-center text-white shadow" title="Disponível para Oportunidades">
                  <CheckCheck className="w-4 h-4" />
                </div>
              </div>

              {/* Informações Textuais ou Form de Edição */}
              <div className="min-w-0 flex-1">
                {isEditingProfile ? (
                  <div className="space-y-2 max-w-sm">
                    <input
                      type="text"
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      placeholder="Nome do Aluno"
                      className="w-full px-3 py-1.5 rounded-xl bg-white/10 border border-purple-400 text-sm font-bold text-white focus:outline-none"
                    />
                    <input
                      type="text"
                      value={candidateLocation}
                      onChange={(e) => setCandidateLocation(e.target.value)}
                      placeholder="Cidade / Região"
                      className="w-full px-3 py-1.5 rounded-xl bg-white/10 border border-purple-400 text-xs text-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold transition hover:bg-emerald-500"
                    >
                      Salvar Alterações
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight font-serif">
                        {candidateName}
                      </h1>
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(true)}
                        className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
                        title="Editar nome ou localização"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>{candidateLocation}</span>
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mt-2.5">
                      {/* Selo Disponível */}
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Disponível para Oportunidades
                      </span>

                      {/* Selo Modalidade */}
                      <span className="px-2.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-medium">
                        Jovem Aprendiz • Estágio
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Ações do Cabeçalho: Compartilhar Passaporte */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-start lg:justify-end">
              <button
                type="button"
                onClick={handleCopyPassportLink}
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-purple-950/50 cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Link do Passaporte Copiado!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>Compartilhar Passaporte</span>
                  </>
                )}
              </button>

              <Link
                href="/curriculo"
                className="px-4 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-purple-400" />
                <span>Gerar Currículo PDF</span>
              </Link>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* BARRA DE KPIS (INDICADORES RÁPIDOS)                                      */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-white/10 relative z-10">
            {/* KPI 1: Cursos Concluídos */}
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Cursos Concluídos</span>
                <Award className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-2xl font-black text-white font-mono">
                {totalCursosConcluidos}
              </p>
              <span className="text-[10px] text-emerald-400 font-semibold block">
                {totalCursosConcluidos > 0 ? '100% Homologados' : 'Nenhum ainda'}
              </span>
            </div>

            {/* KPI 2: Carga Horária Certificada */}
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Horas Certificadas</span>
                <Clock className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-2xl font-black text-white font-mono">
                {totalHorasCertificadas}h
              </p>
              <span className="text-[10px] text-purple-300 font-semibold block">
                Horas Complementares
              </span>
            </div>

            {/* KPI 3: Competências Dominadas */}
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Skills Dominadas</span>
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-2xl font-black text-white font-mono">
                {allSkills.length}
              </p>
              <span className="text-[10px] text-slate-400 block truncate">
                Em {completedCategories.length} áreas
              </span>
            </div>

            {/* KPI 4: Polo e Validação */}
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Polo Curitiba &amp; RMC</span>
                <ShieldCheck className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-sm font-bold text-white truncate pt-1">
                Lei 10.097/00
              </p>
              <span className="text-[10px] text-blue-300 font-semibold block">
                Selo de Aprendizagem
              </span>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. MURAL DE CERTIFICADOS VALIDADOS                                        */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <Award className="w-4 h-4" />
                <span>Credenciais Profissionais</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
                Mural de Certificados Validados
              </h2>
            </div>

            {totalCursosConcluidos === 0 && (
              <button
                type="button"
                onClick={handleSimulateDemo}
                className="text-xs text-purple-300 hover:text-white underline cursor-pointer"
              >
                (Simular 3 Cursos Concluídos para Demonstração)
              </button>
            )}
          </div>

          {totalCursosConcluidos > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {completedCoursesList.map((course) => {
                const code = generateCertificateCode(course.id, candidateName);
                const isCopied = copiedCourseId === course.id;

                return (
                  <div
                    key={course.id}
                    className="p-5 rounded-2xl bg-[#120a22]/80 border border-purple-500/20 hover:border-purple-500/40 transition shadow-xl space-y-4 flex flex-col justify-between group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 font-semibold text-[10px] uppercase">
                          {course.category}
                        </span>
                        <span className="text-slate-400 font-medium text-[11px] flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-400" />
                          {course.hours}h
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition line-clamp-2">
                        {course.title}
                      </h3>

                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                          Chave de Autenticação Oficial:
                        </span>
                        <span className="text-xs font-mono font-bold text-emerald-400 select-all block">
                          {code}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 space-y-2 border-t border-white/10">
                      {/* Botão Validar Credencial */}
                      <Link
                        href={`/validar/${code}`}
                        target="_blank"
                        className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition flex items-center justify-center gap-1.5 group-hover:border-purple-500/30"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Validar Credencial Pública</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </Link>

                      {/* Botão Copiar para Currículo (Gupy) */}
                      <button
                        type="button"
                        onClick={() => handleCopyCourseLine(course)}
                        className="w-full py-2 px-3 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 hover:text-white text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer"
                        title="Copiar linha formatada para o currículo / Gupy"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-300">Copiado para Currículo!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-purple-400" />
                            <span>Copiar Linha para Currículo</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State Elegante */
            <div className="p-8 sm:p-12 rounded-3xl bg-[#120a22]/60 border border-dashed border-purple-500/30 text-center space-y-4 max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-3xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 mx-auto shadow-inner">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">
                  Nenhum Certificado Emitido Ainda
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
                  Conclua as videoaulas e a prova de fixação de qualquer curso do catálogo para conquistar seu primeiro certificado oficial com QR Code e validação pública.
                </p>
              </div>
              <Link
                href="/cursos"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition shadow-lg shadow-purple-950/50"
              >
                <span>Explorar Catálogo de Cursos</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* 3. MATRIZ DE COMPETÊNCIAS & PROGRESSO DE TRILHAS                           */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Coluna A: Matriz de Competências Adquiridas */}
          <div className="p-6 rounded-3xl bg-[#120a22]/80 border border-purple-500/20 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <Sparkles className="w-4 h-4" />
                <span>Matriz de Competências</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Skills Conquistadas ({allSkills.length})
              </h3>
              <p className="text-xs text-slate-400">
                Habilidades técnicas e comportamentais validadas nas avaliações do SkillHub.
              </p>
            </div>

            <div className="py-2 flex-1">
              {allSkills.length > 0 ? (
                <div className="flex flex-wrap gap-1.5 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
                  {allSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center text-xs text-slate-400">
                  As competências adquiridas nos cursos aparecerão mapeadas aqui conforme seu avanço.
                </div>
              )}
            </div>

            {/* Categorias Mapeadas */}
            {completedCategories.length > 0 && (
              <div className="pt-3 border-t border-white/10 space-y-1.5">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  Áreas de Domínio:
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {completedCategories.map(([cat, count], i) => (
                    <span key={i} className="px-2.5 py-0.5 rounded-lg bg-white/5 text-slate-300 font-medium text-[11px]">
                      {cat} • <strong className="text-purple-400">{count} curso(s)</strong>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Coluna B: Progresso nas Trilhas Oficiais */}
          <div className="p-6 rounded-3xl bg-[#120a22]/80 border border-purple-500/20 shadow-xl space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400">
                <Layers className="w-4 h-4" />
                <span>Formações Estruturadas</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Progresso nas Trilhas da RMC
              </h3>
              <p className="text-xs text-slate-400">
                Avanço nas 8 trilhas formativas de qualificação para o mercado formal.
              </p>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
              {tracksProgress.map(({ track, totalCourses, doneCount, percent, isCompleted }) => (
                <div
                  key={track.id}
                  className={`p-3.5 rounded-2xl border transition ${
                    isCompleted
                      ? 'bg-amber-950/20 border-amber-500/40 shadow-md shadow-amber-950/30'
                      : 'bg-white/[0.02] border-white/10 hover:border-purple-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate">
                        {track.name}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {doneCount} de {totalCourses} cursos concluídos
                      </p>
                    </div>

                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold shrink-0">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>Trilha Concluída</span>
                      </span>
                    ) : (
                      <span className="text-xs font-mono font-bold text-purple-300 shrink-0">
                        {percent}%
                      </span>
                    )}
                  </div>

                  {/* Barra de Progresso */}
                  <div className="w-full h-1.5 bg-white/10 rounded-full mt-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCompleted
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500'
                          : 'bg-gradient-to-r from-purple-500 to-indigo-500'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* ========================================================================= */}
        {/* 4. GERADOR DE TEXTO "SOBRE" PARA LINKEDIN / CURRÍCULO (1 CLIQUE)          */}
        {/* ========================================================================= */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#120a22]/90 border border-purple-500/30 shadow-2xl relative overflow-hidden space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>IA &amp; Empregabilidade</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Resumo Profissional para LinkedIn &amp; Currículo (1 Clique)
              </h3>
              <p className="text-xs text-slate-400">
                Parágrafo profissional gerado automaticamente com base nas certificações reais que você já conquistou.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopyResumo}
              className="px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition flex items-center gap-2 shadow-md cursor-pointer shrink-0"
            >
              {copiedResumo ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Resumo Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Resumo Profissional</span>
                </>
              )}
            </button>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans select-all">
            &ldquo;{generatedAboutText}&rdquo;
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Cole no campo &quot;Sobre&quot; do seu LinkedIn ou na carta de apresentação das plataformas Gupy e CIEE.</span>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}
