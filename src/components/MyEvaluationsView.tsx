'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { COURSES } from '@/data/coursesData';
import { 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck, 
  FileText,
  Search,
  Copy,
  Check,
  Share2,
  Download,
  Flame,
  Calendar,
  X,
  Target
} from 'lucide-react';

interface EvaluationItem {
  courseId: string;
  courseTitle: string;
  badgeName: string;
  badgeIconColor: string;
  badgeBgColor: string;
  date: string;
  score: number;
  passed: boolean;
  questionsCount: number;
  correctCount: number;
  codeVerificador?: string;
  attemptsUsed?: number;
  maxAttempts?: number;
  category: string;
}

export default function MyEvaluationsView() {
  const { student, quizResults, openCourse, setCurrentView, showToast } = useApp();

  // Estados de busca, filtro e interatividade
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'PASSED' | 'FAILED' | 'CERTIFICATES'>('ALL');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedCertEvaluation, setSelectedCertEvaluation] = useState<EvaluationItem | null>(null);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  // Lista base de avaliações: inicia zerada para refletir exclusivamente testes reais concluídos pelo estudante
  const baseEvaluations: EvaluationItem[] = useMemo(() => [], []);

  // Mescla dinamicamente qualquer teste realizado na sessão ativa
  const evaluations: EvaluationItem[] = useMemo(() => {
    const list = [...baseEvaluations];

    Object.entries(quizResults || {}).forEach(([courseId, result]) => {
      const existingIdx = list.findIndex(e => e.courseId === courseId);
      const matchedCourse = COURSES.find(c => c.id === courseId);

      const newItem: EvaluationItem = {
        courseId,
        courseTitle: matchedCourse?.title || (courseId.replace(/-/g, ' ')),
        badgeName: matchedCourse?.badgeName || 'Certificado de Conclusão',
        badgeIconColor: 'text-emerald-400',
        badgeBgColor: 'from-emerald-600/30 to-teal-900/40 border-emerald-500/40',
        date: result.date || 'Hoje',
        score: result.score,
        passed: result.passed,
        questionsCount: matchedCourse?.quiz?.length || 5,
        correctCount: Math.round(((result.score / 100) * (matchedCourse?.quiz?.length || 5))),
        codeVerificador: result.passed ? `SKILL-PR-2026-${courseId.slice(0, 6).toUpperCase()}` : undefined,
        attemptsUsed: 1,
        maxAttempts: 3,
        category: matchedCourse?.category || 'Desenvolvimento Geral'
      };

      if (existingIdx >= 0) {
        list[existingIdx] = { ...list[existingIdx], ...newItem };
      } else {
        list.unshift(newItem);
      }
    });

    return list;
  }, [baseEvaluations, quizResults]);

  // Cálculos do Painel Superior
  const totalEvaluations = evaluations.length;
  const passedEvaluations = evaluations.filter(e => e.passed);
  const failedEvaluations = evaluations.filter(e => !e.passed);
  const totalCertificates = passedEvaluations.length;

  const averageScore = useMemo(() => {
    if (totalEvaluations === 0) return 0;
    const sum = evaluations.reduce((acc, curr) => acc + curr.score, 0);
    return Math.round(sum / totalEvaluations);
  }, [evaluations, totalEvaluations]);

  // Filtragem dos Cards
  const filteredEvaluations = useMemo(() => {
    return evaluations.filter((ev) => {
      // Filtro por tipo/status
      if (filterType === 'PASSED' && !ev.passed) return false;
      if (filterType === 'FAILED' && ev.passed) return false;
      if (filterType === 'CERTIFICATES' && !ev.codeVerificador) return false;

      // Filtro por texto
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = ev.courseTitle.toLowerCase().includes(query);
        const matchesBadge = ev.badgeName.toLowerCase().includes(query);
        const matchesCode = ev.codeVerificador ? ev.codeVerificador.toLowerCase().includes(query) : false;
        const matchesCategory = ev.category.toLowerCase().includes(query);
        return matchesTitle || matchesBadge || matchesCode || matchesCategory;
      }

      return true;
    });
  }, [evaluations, filterType, searchQuery]);

  // Copiar código verificador com feedback
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast('Chave Copiada!', `O código de autenticação ${code} foi copiado para a área de transferência.`, 'success');
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  // Simular Compartilhamento no LinkedIn
  const handleShareLinkedIn = () => {
    const shareText = encodeURIComponent(
      `Conquistei novas certificações profissionais na plataforma SkillHub com média geral de ${averageScore}%! 🚀 #Educação #SkillHub #Carreira`
    );
    const shareUrl = encodeURIComponent(`https://skillhub.educacao.pr.gov.br/perfil/${student?.id || 'aluno-certificados'}`);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}&summary=${shareText}`, '_blank');
    showToast('Compartilhar Conquistas', 'Janela de publicação do LinkedIn aberta com suas credenciais!', 'info');
  };

  // Simular Download do Relatório em PDF
  const handleDownloadReport = () => {
    setIsDownloadingPdf(true);
    setTimeout(() => {
      setIsDownloadingPdf(false);
      showToast('Relatório de Desempenho Emitido', 'O PDF consolidado com seu histórico e notas foi baixado com sucesso.', 'success');
    }, 1800);
  };

  return (
    <div className="space-y-8 max-w-6xl w-full mx-auto pb-16 px-2 sm:px-4">
      
      {/* ========================================================================= */}
      {/* 1. HERO BANNER PRINCIPAL (DESIGN SYSTEM PADRONIZADO COM TRILHAS)          */}
      {/* ========================================================================= */}
      <div className="w-full bg-white dark:bg-[#110E1B] border border-slate-200 dark:border-[#2D1B4E]/60 rounded-3xl p-6 lg:p-8 shadow-sm dark:shadow-2xl relative overflow-hidden space-y-6">
        
        {/* Cabeçalho do Banner */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10 pb-6 border-b border-slate-200 dark:border-[#2D1B4E]/60">
          <div className="space-y-3 max-w-2xl">
            {/* Badges superiores com ícones */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-slate-200 dark:bg-[#171126] border border-slate-300 dark:border-purple-500/30 px-3 py-1 rounded-full text-xs font-semibold text-slate-800 dark:text-zinc-300">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                <span>Avaliações &amp; Quizzes Oficiais</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-slate-200 dark:bg-[#171126] border border-slate-300 dark:border-purple-500/30 px-3 py-1 rounded-full text-xs font-semibold text-slate-800 dark:text-zinc-300">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Sequência Ativa: 7 Dias</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-slate-200 dark:bg-[#171126] border border-slate-300 dark:border-purple-500/30 px-3 py-1 rounded-full text-xs font-semibold text-slate-800 dark:text-zinc-300">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                <span>{totalCertificates} Certificados Conquistados</span>
              </span>
            </div>

            {/* Título & Descrição */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Minhas Avaliações &amp; Quizzes
            </h1>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
              Histórico completo de provas, testes de fixação e certificados emitidos. Comprove suas competências no mercado de trabalho com credenciais auditáveis.
            </p>
          </div>

          {/* Card Numérico de Destaque à Direita (Média Geral de Desempenho) */}
          <div className="bg-slate-50 dark:bg-[#171126] border border-slate-300 dark:border-[#2D1B4E] rounded-2xl p-4 sm:p-5 text-center shrink-0 shadow-lg min-w-[190px] flex flex-col items-center justify-center">
            <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
              {averageScore}%
            </div>
            <div className="text-xs text-zinc-400 font-medium mt-1">
              Média Geral de Desempenho
            </div>
          </div>
        </div>

        {/* Seção Explicativa / Educativa de 2 Colunas */}
        <div className="relative z-10 pt-1">
          <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-purple-400" />
            <span>Critérios &amp; Certificação Oficial</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Box 1: Critérios de Aprovação */}
            <div className="bg-slate-50 dark:bg-[#171126] border border-slate-300 dark:border-[#2D1B4E] hover:border-purple-500/30 rounded-2xl p-5 space-y-2.5 transition-all">
              <div className="flex items-center gap-2.5 text-slate-900 dark:text-white font-bold text-sm">
                <div className="w-8 h-8 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                </div>
                <span>Critérios de Aprovação</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
                Cada avaliação exige aproveitamento mínimo de 70% para emissão do selo oficial. Você conta com até 3 tentativas para atingir a nota de excelência.
              </p>
              <div className="text-[11px] text-zinc-400 pt-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>{totalCertificates} de {totalEvaluations} avaliações já certificadas.</span>
              </div>
            </div>

            {/* Box 2: Exportação e Relatório de Desempenho */}
            <div className="bg-slate-50 dark:bg-[#171126] border border-amber-500/20 hover:border-amber-500/40 rounded-2xl p-5 space-y-2.5 transition-all">
              <div className="flex items-center gap-2.5 text-slate-900 dark:text-white font-bold text-sm">
                <div className="w-8 h-8 rounded-xl bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-300 shrink-0">
                  <FileText className="w-4 h-4 text-amber-400" />
                </div>
                <span>Relatórios &amp; Compartilhamento</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
                Compartilhe suas conquistas profissionais diretamente no LinkedIn ou faça o download do histórico consolidado em PDF com código autenticador.
              </p>
              <div className="pt-1 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleDownloadReport}
                  disabled={isDownloadingPdf}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isDownloadingPdf ? 'Gerando...' : 'Baixar Relatório (PDF)'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleShareLinkedIn}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0A66C2] hover:bg-[#095196] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Compartilhar LinkedIn</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. BARRA DE FILTROS & BUSCA RÁPIDA (PADRONIZADA COM DESIGN SYSTEM)         */}
      {/* ========================================================================= */}
      <div className="w-full bg-white dark:bg-[#140E24] border border-slate-300 dark:border-[#2D1B4E]/60 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        
        {/* Linha 1: Input de Busca */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar avaliação por curso, selo, categoria ou código de validação..."
            className="w-full bg-white dark:bg-[#0D0818] border border-slate-300 dark:border-[#2D1B4E] rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-zinc-500 font-semibold focus:outline-none focus:border-purple-600 transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Linha 2: Filtro Rápido por Status (Pills Padronizadas) */}
        <div className="flex flex-wrap items-center justify-start sm:justify-start gap-2 pt-2 border-t border-slate-300 dark:border-[#2D1B4E]/40 text-xs">
          <span className="text-zinc-400 font-bold shrink-0 flex items-center gap-1.5 mr-1">
            <Target className="w-3.5 h-3.5 text-amber-400" />
            Filtrar:
          </span>

          <button
            type="button"
            onClick={() => setFilterType('ALL')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              filterType === 'ALL'
                ? 'bg-purple-700 text-white font-black shadow ring-2 ring-purple-600/50'
                : 'bg-slate-200 text-slate-800 hover:text-black hover:bg-slate-300 font-bold border border-slate-300 dark:bg-[#0D0818] dark:text-zinc-400 dark:hover:text-white dark:border-[#2D1B4E]'
            }`}
          >
            Todas as Provas ({evaluations.length})
          </button>

          <button
            type="button"
            onClick={() => setFilterType('PASSED')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              filterType === 'PASSED'
                ? 'bg-purple-700 text-white font-black shadow ring-2 ring-purple-600/50'
                : 'bg-slate-200 text-slate-800 hover:text-black hover:bg-slate-300 font-bold border border-slate-300 dark:bg-[#0D0818] dark:text-zinc-400 dark:hover:text-white dark:border-[#2D1B4E]'
            }`}
          >
            Aprovadas ({passedEvaluations.length})
          </button>

          <button
            type="button"
            onClick={() => setFilterType('FAILED')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              filterType === 'FAILED'
                ? 'bg-purple-700 text-white font-black shadow ring-2 ring-purple-600/50'
                : 'bg-slate-200 text-slate-800 hover:text-black hover:bg-slate-300 font-bold border border-slate-300 dark:bg-[#0D0818] dark:text-zinc-400 dark:hover:text-white dark:border-[#2D1B4E]'
            }`}
          >
            A Recuperar ({failedEvaluations.length})
          </button>

          <button
            type="button"
            onClick={() => setFilterType('CERTIFICATES')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              filterType === 'CERTIFICATES'
                ? 'bg-purple-700 text-white font-black shadow ring-2 ring-purple-600/50'
                : 'bg-slate-200 text-slate-800 hover:text-black hover:bg-slate-300 font-bold border border-slate-300 dark:bg-[#0D0818] dark:text-zinc-400 dark:hover:text-white dark:border-[#2D1B4E]'
            }`}
          >
            Com Certificado ({totalCertificates})
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. LISTAGEM HORIZONTAL EMPILHADA (1 COLUNA / FULL WIDTH)                   */}
      {/* ========================================================================= */}
      {filteredEvaluations.length === 0 ? (
        <div className="w-full bg-white dark:bg-[#140E24] border border-slate-300 dark:border-[#2D1B4E] rounded-2xl p-10 text-center space-y-3">
          <p className="text-xs text-slate-600 dark:text-zinc-400">
            {searchQuery 
              ? `Nenhuma avaliação encontrada para "${searchQuery}".` 
              : 'Nenhuma avaliação encontrada com o filtro selecionado.'}
          </p>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold cursor-pointer"
            >
              Limpar busca
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col space-y-4 w-full">
          {filteredEvaluations.map((ev) => (
            <div
              key={ev.courseId}
              className="group relative bg-white dark:bg-[#110E1B] border border-slate-200 dark:border-[#2D1B4E]/60 hover:border-purple-500/50 rounded-2xl p-6 sm:p-7 shadow-sm dark:shadow-xl hover:shadow-2xl hover:shadow-purple-950/40 transition-all duration-300 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 w-full"
            >
              
              {/* LADO ESQUERDO: Badge/Ícone + Categoria, Título, Selo, Questões, Data e Chave */}
              <div className="flex items-start sm:items-center gap-4 sm:gap-5 flex-1 min-w-0 w-full lg:w-auto">
                
                {/* Selo/Badge Gamificado */}
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${ev.badgeBgColor} border flex items-center justify-center shrink-0 shadow-lg shadow-purple-900/30 group-hover:scale-105 transition-transform duration-300`}>
                  <Award className={`w-7 h-7 sm:w-8 sm:h-8 ${ev.badgeIconColor}`} />
                </div>

                {/* Informações da Avaliação */}
                <div className="space-y-2 flex-1 min-w-0">
                  
                  {/* Topo: Categoria + Status da Avaliação + Data */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-semibold bg-purple-900/40 text-purple-300 px-2.5 py-0.5 rounded-md border border-purple-500/30 tracking-wide">
                      {ev.category}
                    </span>

                    {ev.passed ? (
                      <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm shadow-emerald-500/20">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Aprovado (Nota ≥ 70%)</span>
                      </span>
                    ) : (
                      <span className="bg-amber-500/15 text-amber-400 border border-amber-500/40 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm shadow-amber-500/20">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                        <span>Necessário Refazer • Tentativa {ev.attemptsUsed || 1} de {ev.maxAttempts || 3}</span>
                      </span>
                    )}

                    <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{ev.date}</span>
                    </span>
                  </div>

                  {/* Título do Curso */}
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-purple-300 transition-colors leading-snug">
                    {ev.courseTitle}
                  </h2>

                  {/* Selo & Chave de Autenticação */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Selo Oficial: <strong className="text-amber-500 dark:text-amber-300 font-semibold">{ev.badgeName}</strong></span>
                    </span>

                    <span className="text-slate-500 dark:text-slate-400 text-xs">
                      • {ev.correctCount} de {ev.questionsCount} questões acertadas
                    </span>

                    {ev.codeVerificador && (
                      <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-[#171126] border border-slate-300 dark:border-purple-500/30 px-2.5 py-1 rounded-lg">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-slate-500 dark:text-slate-400 text-[11px]">Chave:</span>
                        <strong className="font-mono text-purple-700 dark:text-purple-300 text-xs">{ev.codeVerificador}</strong>
                        <button
                          type="button"
                          onClick={() => handleCopyCode(ev.codeVerificador!)}
                          title="Copiar chave de validação"
                          className="ml-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        >
                          {copiedCode === ev.codeVerificador ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 text-slate-400" />
                          )}
                        </button>
                      </span>
                    )}
                  </div>

                </div>

              </div>

              {/* LADO DIREITO: Porcentagem de Nota Final + Barra de Desempenho + Botões de Ação */}
              <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-row items-stretch sm:items-center justify-between lg:justify-end gap-5 shrink-0 pt-4 lg:pt-0 border-t border-slate-200 dark:border-[#2D1B4E]/60 lg:border-t-0">
                
                {/* Nota e Barra de Corte */}
                <div className="text-left sm:text-right space-y-1 min-w-[120px]">
                  <div className="flex items-baseline sm:justify-end gap-1.5">
                    <span className={`text-2xl sm:text-3xl font-black tracking-tight ${ev.passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500 dark:text-amber-400'}`}>
                      {ev.score}%
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">({ev.correctCount}/{ev.questionsCount})</span>
                  </div>

                  <div className="w-full sm:w-28 bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden relative">
                    <div 
                      className={`h-full rounded-full transition-all duration-700 ${ev.passed ? 'bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400' : 'bg-gradient-to-r from-amber-500 to-orange-500'}`}
                      style={{ width: `${Math.max(5, ev.score)}%` }}
                    />
                  </div>

                  <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center sm:justify-end gap-1">
                    <span>{ev.passed ? '✅ Certificado Emitido' : '⚠️ Corte: 70%'}</span>
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex items-center gap-2.5">
                  {ev.passed && (
                    <button
                      type="button"
                      onClick={() => setSelectedCertEvaluation(ev)}
                      title="Visualizar e baixar certificado oficial"
                      className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#171126] dark:hover:bg-purple-950/60 border border-slate-300 dark:border-purple-500/40 text-purple-700 dark:text-purple-200 hover:text-purple-900 dark:hover:text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-purple-400" />
                      <span>Certificado</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => openCourse(ev.courseId)}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md bg-purple-600 hover:bg-purple-500 text-white cursor-pointer shadow-purple-900/30"
                  >
                    {ev.passed ? (
                      <>
                        <span>Revisar Prova</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    ) : (
                      <>
                        <RotateCcw className="w-3.5 h-3.5 text-amber-300" />
                        <span>Refazer Quiz</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. MODAL GAMIFICADO DE CERTIFICADO DIGITAL OFICIAL                         */}
      {/* ========================================================================= */}
      {selectedCertEvaluation && (
        <div 
          onClick={() => setSelectedCertEvaluation(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl bg-gradient-to-b from-[#1E0E38] via-[#140826] to-[#0B0414] border-2 border-purple-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden"
          >
            {/* Fechar */}
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
              <div className="flex items-center gap-2 text-purple-300 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Certificado Oficial de Competência</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCertEvaluation(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-purple-950/50 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Certificado Canvas Estilizado */}
            <div className="bg-gradient-to-br from-[#120522] via-[#0D031A] to-[#07010E] border border-purple-500/40 rounded-2xl p-6 text-center space-y-4 shadow-inner relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/30 to-purple-600/40 border border-amber-500/50 flex items-center justify-center mx-auto shadow-xl shadow-amber-500/20">
                <Award className="w-8 h-8 text-amber-400" />
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-purple-300 tracking-widest">
                  SkillHub • Governo do Estado do Paraná
                </span>
                <h3 className="text-xl font-black text-white mt-1">
                  {selectedCertEvaluation.courseTitle}
                </h3>
                <p className="text-xs text-purple-200 mt-1">
                  Certificamos que <strong>{student?.nome || 'Nicolly Silva'}</strong> concluiu com êxito os módulos avaliativos e conquistou a badge oficial:
                </p>
                <div className="inline-block mt-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
                  {selectedCertEvaluation.badgeName}
                </div>
              </div>

              {/* Informações de Validação */}
              <div className="bg-slate-900/80 border border-purple-500/20 p-3.5 rounded-xl text-xs space-y-1.5 text-left">
                <div className="flex justify-between">
                  <span className="text-slate-400">Nota Obtida:</span>
                  <strong className="text-emerald-400 font-bold">{selectedCertEvaluation.score}% de Aproveitamento</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Data de Emissão:</span>
                  <strong className="text-purple-200">{selectedCertEvaluation.date}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Código Verificador:</span>
                  <strong className="text-amber-300 font-mono">{selectedCertEvaluation.codeVerificador}</strong>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-emerald-400 font-semibold pt-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Assinatura Digital Auditável e Válida em Território Nacional</span>
              </div>
            </div>

            {/* Ações do Modal */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  handleCopyCode(selectedCertEvaluation.codeVerificador!);
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar Código</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  showToast('Download do Certificado', 'Certificado PDF de alta resolução baixado com sucesso!', 'success');
                  setSelectedCertEvaluation(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-600/30 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar Certificado PDF</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
