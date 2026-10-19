'use client';

import React from 'react';
import { JobVacancy } from '@/types';
import { useApp } from '@/context/AppContext';
import {
  X,
  Building2,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Check,
  CheckCircle2,
  BookOpen,
  Bus,
  HeartHandshake,
  DollarSign,
  Briefcase,
  GraduationCap
} from 'lucide-react';

interface JobDetailsModalProps {
  isOpen: boolean;
  vaga: JobVacancy | null;
  distanceKm: number;
  adherencePercent: number;
  onClose: () => void;
  onApply: (vaga: JobVacancy) => void;
}

// Cursos sugeridos com base no perfil da vaga
function getRecommendedCourses(vaga: JobVacancy) {
  const t = (vaga.titulo + ' ' + vaga.descricao).toLowerCase();
  const list = [];

  if (/administra|escritório|processo|documento|recepção/.test(t)) {
    list.push({
      id: 'curso-rotinas-administrativas',
      title: 'Rotinas Administrativas e Processos de Escritório',
      category: 'Administração',
      hours: '12h'
    });
  }

  if (/excel|planilha|financeir|suprimento|estoque/.test(t)) {
    list.push({
      id: 'curso-excel-basico-avancado',
      title: 'Microsoft Excel & Planilhas para Escritório',
      category: 'Ferramentas de Escritório',
      hours: '16h'
    });
  }

  if (/comunica|conteúdo|atendimento|cliente|suporte/.test(t)) {
    list.push({
      id: 'curso-comunicacao-corporativa',
      title: 'Comunicação Escrita, E-mails e Redação Corporativa',
      category: 'Comunicação',
      hours: '10h'
    });
    list.push({
      id: 'curso-comunicacao-nao-violenta',
      title: 'Comunicação Não-Violenta (CNV) e Empatia no Trabalho',
      category: 'Desenvolvimento Pessoal',
      hours: '10h'
    });
  }

  if (/ti|tecnologia|software|web|suporte técnico|informática/.test(t)) {
    list.push({
      id: 'curso-informatica-seguranca',
      title: 'Informática Básica, Nuvem e Segurança da Informação',
      category: 'Tecnologia da Informação',
      hours: '12h'
    });
    list.push({
      id: 'curso-ia-produtividade',
      title: 'Inteligência Artificial & Produtividade no Trabalho',
      category: 'Tecnologia da Informação',
      hours: '14h'
    });
  }

  // Curso comum para todos
  list.push({
    id: 'curso-orcamento-primeiro-salario',
    title: 'Orçamento do Primeiro Salário, Holerite e Gestão Financeira',
    category: 'Finanças Pessoais',
    hours: '8h'
  });

  return list.slice(0, 3);
}

export default function JobDetailsModal({
  isOpen,
  vaga,
  distanceKm,
  adherencePercent,
  onClose,
  onApply
}: JobDetailsModalProps) {
  const { student, badges, openCourse } = useApp();

  if (!isOpen || !vaga) return null;

  const userBadgeIds = student.badgesEarned.map((b) => b.badgeId);
  const matchingBadgesCount = vaga.badgesRequeridas.filter((req) =>
    userBadgeIds.some((ub) => req.includes(ub.replace('badge-', '')) || ub.includes(req.replace('badge-', '')))
  ).length;

  const recommendedCourses = getRecommendedCourses(vaga);

  // Formatação de salário
  const formattedSalary = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(vaga.remuneracao);

  const cargaSemanal = vaga.cargaSemanal || (vaga.cargaHorariaDiaria === 4 ? '20h/semanais' : '30h/semanais');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="bg-[#110E1B] border border-purple-500/30 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-scaleUp"
        role="dialog"
        aria-modal="true"
        aria-labelledby="job-details-title"
      >
        {/* ===================================================== */}
        {/* CABEÇALHO DO MODAL */}
        {/* ===================================================== */}
        <div className="bg-[#160F28] border-b border-[#2D1B4E]/80 p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white bg-[#0F0C1D] hover:bg-purple-950/60 rounded-xl border border-[#2D1B4E] transition-all"
            aria-label="Fechar detalhes da vaga"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges de Topo */}
          <div className="flex flex-wrap items-center gap-2 mb-3 pr-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-950/80 border border-purple-500/40 text-purple-200">
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              <span>✨ {adherencePercent}% de Aderência ao seu Perfil</span>
            </span>

            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#110E1B] border border-purple-500/30 text-purple-300">
              {vaga.tipoVaga}
            </span>

            {vaga.origemIA && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#110E1B] border border-[#2D1B4E] text-zinc-300">
                {vaga.origemIA}
              </span>
            )}
          </div>

          {/* Título Principal */}
          <h2 id="job-details-title" className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
            {vaga.titulo}
          </h2>

          {/* Empresa e Localização */}
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs sm:text-sm text-zinc-300">
            <div className="flex items-center gap-1.5 font-semibold text-white">
              <Building2 className="w-4 h-4 text-purple-400 shrink-0" />
              <span>{vaga.empresaNome}</span>
              {vaga.empresaValidadaCnpj && (
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-normal bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  CNPJ Verificado
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-zinc-300">
              <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{vaga.bairro}, {vaga.cidade}</span>
              <span className="text-purple-300 font-bold bg-purple-950/80 px-2 py-0.5 rounded border border-purple-500/30 text-xs">
                A {distanceKm.toFixed(1)} km de você
              </span>
            </div>
          </div>

          {/* Destaque Salarial & Horário */}
          <div className="mt-4 grid grid-cols-2 gap-3 p-3.5 bg-[#0F0C1D] border border-[#2D1B4E] rounded-2xl">
            <div>
              <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider block">
                Bolsa / Salário
              </span>
              <div className="text-lg sm:text-xl font-black text-emerald-400 mt-0.5">
                {formattedSalary}
              </div>
            </div>

            <div>
              <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider block">
                Carga Horária &amp; Turno
              </span>
              <div className="text-xs sm:text-sm font-bold text-zinc-200 mt-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>{cargaSemanal} ({vaga.horario})</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================== */}
        {/* CORPO DO MODAL (ROLÁVEL) */}
        {/* ===================================================== */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm leading-relaxed text-zinc-300">
          {/* Seção 1: Descrição da Vaga */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider">
              <Briefcase className="w-4 h-4 text-purple-400" />
              <span>Descrição da Vaga &amp; Atividades Diárias</span>
            </div>

            <div className="bg-[#140E24] border border-[#2D1B4E]/60 rounded-2xl p-4 sm:p-5 space-y-3">
              <p className="text-zinc-300">{vaga.descricao}</p>

              <div className="pt-2 border-t border-[#2D1B4E]/40 space-y-2">
                <span className="text-xs font-bold text-purple-300 block">
                  Principais responsabilidades no ambiente de trabalho:
                </span>
                <ul className="space-y-1.5 text-zinc-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>Execução das rotinas diárias com acompanhamento de tutor ou gestor do setor.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>Organização de relatórios, arquivos digitais e comunicação formal com clientes e colegas.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>Cumprimento rigoroso das normas de conduta, ética corporativa e sigilo de dados (LGPD).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>Compatibilidade garantida com frequência escolar e calendário acadêmico.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Seção 2: Requisitos & Competências */}
          <section className="space-y-3">
            <div className="flex items-center justify-between text-white font-bold text-sm uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-400" />
                <span>Requisitos &amp; Competências Valorizadas</span>
              </div>
              <span className="text-xs font-semibold text-purple-300">
                {matchingBadgesCount}/{vaga.badgesRequeridas.length} compatíveis
              </span>
            </div>

            {/* Badges Requeridas */}
            <div className="bg-[#140E24] border border-[#2D1B4E]/60 rounded-2xl p-4 sm:p-5 space-y-3">
              <span className="text-xs font-bold text-zinc-400 block">
                Selos e Microcertificações exigidas pelo RH:
              </span>
              <div className="flex flex-wrap gap-2">
                {vaga.badgesRequeridas.map((bId) => {
                  const hasBadge = userBadgeIds.some(
                    (ub) => bId.includes(ub.replace('badge-', '')) || ub.includes(bId.replace('badge-', ''))
                  );
                  const badgeObj = badges.find(
                    (b) => b.id.includes(bId.replace('badge-', '')) || bId.includes(b.id.replace('badge-', ''))
                  );
                  const label = badgeObj ? badgeObj.title : bId.replace('badge-', '').replaceAll('-', ' ');

                  return (
                    <div
                      key={bId}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 border ${
                        hasBadge
                          ? 'bg-purple-950/80 border-purple-500/50 text-purple-200'
                          : 'bg-[#0F0C1D] border-[#2D1B4E] text-zinc-400'
                      }`}
                    >
                      {hasBadge ? (
                        <Check className="w-3.5 h-3.5 text-purple-400 font-bold" />
                      ) : (
                        <span className="w-3 h-3 rounded-full border border-zinc-600" />
                      )}
                      <span>{label}</span>
                      {hasBadge && (
                        <span className="text-[10px] text-purple-300 font-bold bg-purple-900/60 px-1.5 py-0.2 rounded">
                          Validado no seu perfil
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Cursos Recomendados do SkillHub */}
              <div className="mt-4 pt-3 border-t border-[#2D1B4E]/40 space-y-2">
                <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                  <span>Cursos do SkillHub Recomendados para se Destacar:</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  {recommendedCourses.map((c) => (
                    <div
                      key={c.id}
                      className="bg-[#0F0C1D] border border-purple-500/20 hover:border-purple-500/50 rounded-xl p-3 flex flex-col justify-between space-y-2 transition-colors"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase">{c.category}</span>
                        <h4 className="text-xs font-bold text-white line-clamp-2 mt-0.5">{c.title}</h4>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-purple-300 pt-1 border-t border-[#2D1B4E]/60">
                        <span>Carga: {c.hours}</span>
                        <span className="text-emerald-400 font-semibold">Disponível</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Seção 3: Benefícios */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider">
              <HeartHandshake className="w-4 h-4 text-purple-400" />
              <span>Benefícios da Oportunidade</span>
            </div>

            <div className="bg-[#140E24] border border-[#2D1B4E]/60 rounded-2xl p-4 sm:p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {vaga.beneficios && vaga.beneficios.length > 0 ? (
                  vaga.beneficios.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2.5 bg-[#0F0C1D] border border-[#2D1B4E] rounded-xl text-xs text-zinc-200"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-center gap-2 p-2.5 bg-[#0F0C1D] border border-[#2D1B4E] rounded-xl text-xs text-zinc-200">
                      <Bus className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>Vale-Transporte (URBS / Metrocard Integral)</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 bg-[#0F0C1D] border border-[#2D1B4E] rounded-xl text-xs text-zinc-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>Seguro de Vida Coletivo Obrigatório</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 bg-[#0F0C1D] border border-[#2D1B4E] rounded-xl text-xs text-zinc-200">
                      <BookOpen className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>Capacitação Teórica Continuada</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* ===================================================== */}
        {/* RODAPÉ FIXO DO MODAL */}
        {/* ===================================================== */}
        <div className="bg-[#160F28] border-t border-[#2D1B4E]/80 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-zinc-400 flex items-center gap-1.5 self-start sm:self-auto">
            <span>{vaga.candidatosInscritos} candidaturas registradas</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl bg-[#0F0C1D] border border-[#2D1B4E] hover:border-purple-500/50 text-zinc-300 hover:text-white font-bold text-xs transition-colors"
            >
              Voltar
            </button>

            {vaga.jaCandidatou ? (
              <span className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-xl bg-purple-950/80 text-purple-300 border border-purple-500/40 text-xs font-bold">
                <Check className="w-4 h-4 text-purple-400" />
                <span>Candidatura Enviada</span>
              </span>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onApply(vaga);
                }}
                className="w-1/2 sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-purple-700 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-bold text-xs shadow-lg shadow-purple-950/40 flex items-center justify-center gap-2 transition-all hover:scale-105 cursor-pointer"
              >
                <span>Quero me Candidatar</span>
                <ArrowRight className="w-4 h-4 text-purple-200" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
