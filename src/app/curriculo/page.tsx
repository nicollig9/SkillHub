'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  FileText,
  Printer,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Award,
  BookOpen,
  MapPin,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Calendar,
  Share2,
  Check,
  Edit3
} from 'lucide-react';

export default function CurriculoPage() {
  const { student, badges } = useApp();

  // Form states initialized with student data
  const [nome, setNome] = useState(student?.nome || 'Lucas Silva Oliveira');
  const [email, setEmail] = useState(student?.email || 'lucas.silva.curitiba@email.com');
  const [telefone, setTelefone] = useState(student?.telefoneMasked || '(41) 98765-4321');
  const [cidadeBairro, setCidadeBairro] = useState(
    `${student?.endereco?.bairro || 'CIC'}, ${student?.endereco?.cidade || 'Curitiba'} - ${student?.endereco?.estado || 'PR'}`
  );
  const [idade, setIdade] = useState(student?.idade ? `${student.idade} anos` : '17 anos');
  const [objetivo, setObjetivo] = useState(
    'Busco oportunidade como Jovem Aprendiz ou Estagiário nas áreas Administrativa, Atendimento ao Cliente ou Tecnologia. Comprometido com aprendizado contínuo, pontualidade e resolução proativa de problemas.'
  );
  const [escolaridade, setEscolaridade] = useState(
    `${student?.escolaridade || 'Ensino Médio'} • ${student?.turnoEscola || 'Turno Manhã'} (Em andamento)`
  );
  const [instituicao, setInstituicao] = useState('Colégio Estadual do Paraná (CEP)');
  const [competencias, setCompetencias] = useState([
    'Comunicação Não-Violenta e Empatia',
    'Microsoft Excel & Google Planilhas',
    'Organização de Rotinas e Documentos',
    'Informática Básica e Segurança da Informação',
    'Pontualidade e Trabalho em Equipe',
    'Gestão do Tempo e Foco'
  ]);
  const [novaCompetencia, setNovaCompetencia] = useState('');
  const [copied, setCopied] = useState(false);

  // Badges conquistados pelo estudante
  const earnedBadges = student?.badgesEarned?.map((eb) => {
    const badgeInfo = badges.find((b) => b.id === eb.badgeId);
    return {
      ...eb,
      info: badgeInfo
    };
  }) || [];

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleAddCompetencia = () => {
    if (novaCompetencia.trim() && !competencias.includes(novaCompetencia.trim())) {
      setCompetencias([...competencias, novaCompetencia.trim()]);
      setNovaCompetencia('');
    }
  };

  const handleRemoveCompetencia = (index: number) => {
    setCompetencias(competencias.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#0B0813] text-zinc-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Controles e Cabeçalho - Ocultos na Impressão via CSS */}
      <div className="max-w-6xl mx-auto space-y-8 print:hidden">
        {/* Barra superior de navegação */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/vagas"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-purple-400" />
            <span>Voltar ao Mapa de Vagas</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#171126] hover:bg-[#201738] text-zinc-300 hover:text-white border border-purple-500/20 text-xs font-semibold transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-purple-400" />}
              <span>{copied ? 'Link Copiado!' : 'Compartilhar'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-purple-700 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-950/40 transition-all duration-200 hover:scale-[1.02] cursor-pointer"
            >
              <Printer className="w-4 h-4 text-purple-200" />
              <span>Imprimir / Salvar em PDF</span>
            </button>
          </div>
        </div>

        {/* Hero Banner do Gerador */}
        <div className="w-full bg-[#110E1B] border border-purple-500/20 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden space-y-4">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-[#171126] border border-purple-500/30 px-3 py-1 rounded-full text-xs font-semibold text-zinc-300">
              <FileText className="w-3.5 h-3.5 text-purple-400" />
              <span>Currículo Oficial SkillHub</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#171126] border border-purple-500/30 px-3 py-1 rounded-full text-xs font-semibold text-zinc-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Padrão Aceito pelos RHs de Curitiba &amp; RMC</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Gerador de Currículo Inteligente
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
            Personalize seus dados abaixo. Seus selos e cursos concluídos na plataforma SkillHub são integrados automaticamente para valorizar seu perfil junto aos recrutadores.
          </p>
        </div>

        {/* Painel de Edição Rápida */}
        <div className="bg-[#110E1B] border border-purple-500/20 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[#2D1B4E]/60">
            <Edit3 className="w-4 h-4 text-purple-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Personalização Rápida dos Seus Dados
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Nome Completo</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full bg-[#171126] border border-purple-500/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#171126] border border-purple-500/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Telefone / WhatsApp</label>
              <input
                type="text"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="w-full bg-[#171126] border border-purple-500/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Bairro, Cidade - UF</label>
              <input
                type="text"
                value={cidadeBairro}
                onChange={(e) => setCidadeBairro(e.target.value)}
                className="w-full bg-[#171126] border border-purple-500/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Idade</label>
              <input
                type="text"
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
                className="w-full bg-[#171126] border border-purple-500/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Instituição de Ensino</label>
              <input
                type="text"
                value={instituicao}
                onChange={(e) => setInstituicao(e.target.value)}
                className="w-full bg-[#171126] border border-purple-500/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Objetivo Profissional</label>
            <textarea
              rows={2}
              value={objetivo}
              onChange={(e) => setObjetivo(e.target.value)}
              className="w-full bg-[#171126] border border-purple-500/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
              Competências e Habilidades (Clique no × para remover ou adicione novas)
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {competencias.map((comp, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 bg-purple-950/70 border border-purple-500/30 text-purple-200 px-3 py-1 rounded-lg text-xs"
                >
                  <span>{comp}</span>
                  <button
                    onClick={() => handleRemoveCompetencia(idx)}
                    className="text-purple-400 hover:text-rose-400 font-bold ml-1 cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ex: Atendimento ao Cliente, Organização..."
                value={novaCompetencia}
                onChange={(e) => setNovaCompetencia(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddCompetencia()}
                className="flex-1 bg-[#171126] border border-purple-500/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
              />
              <button
                onClick={handleAddCompetencia}
                className="px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================== */}
      {/* PRÉVIA DO CURRÍCULO (PADRÃO A4 IMPRESSO / ATS FRIENDLY) */}
      {/* ===================================================== */}
      <div className="max-w-4xl mx-auto mt-8">
        <div className="text-center mb-3 print:hidden">
          <span className="text-xs text-zinc-400">
            📄 Prévia da folha A4 formatada para leitura humana e sistemas ATS de RH:
          </span>
        </div>

        <div
          id="curriculo-a4"
          className="bg-white text-zinc-900 rounded-2xl print:rounded-none shadow-2xl p-8 sm:p-12 border border-zinc-200 print:border-none print:shadow-none print:p-0 space-y-6 text-sm"
        >
          {/* Cabeçalho do Currículo */}
          <div className="border-b-2 border-purple-600 pb-5">
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
              {nome}
            </h1>
            <p className="text-sm font-semibold text-purple-700 mt-1">
              Candidato a Jovem Aprendiz / Estágio / Primeiro Emprego
            </p>

            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 mt-3 text-xs text-zinc-600">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                {cidadeBairro}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-zinc-400" />
                {telefone}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-zinc-400" />
                {email}
              </span>
              <span>•</span>
              <span>{idade}</span>
            </div>
          </div>

          {/* 1. Objetivo Profissional */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-bold text-purple-900 uppercase tracking-widest border-b border-zinc-200 pb-1">
              1. Objetivo Profissional
            </h2>
            <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed text-justify">
              {objetivo}
            </p>
          </div>

          {/* 2. Formação Acadêmica */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold text-purple-900 uppercase tracking-widest border-b border-zinc-200 pb-1">
              2. Formação Acadêmica
            </h2>
            <div className="flex justify-between items-baseline">
              <div>
                <p className="font-bold text-zinc-900 text-xs sm:text-sm">{escolaridade}</p>
                <p className="text-xs text-zinc-600">{instituicao} • Curitiba, PR</p>
              </div>
              <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                Previsão de Conclusão: 2026
              </span>
            </div>
          </div>

          {/* 3. Cursos e Certificações SkillHub */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-1">
              <h2 className="text-xs font-bold text-purple-900 uppercase tracking-widest">
                3. Cursos Concluídos &amp; Selos de Competência (SkillHub Curitiba)
              </h2>
              <span className="text-[10px] text-zinc-500 font-medium">
                Autenticidade via Código Verificador
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {earnedBadges.length > 0 ? (
                earnedBadges.map((badge, i) => (
                  <div
                    key={i}
                    className="border border-zinc-200 rounded-lg p-2.5 bg-zinc-50/60 flex items-start gap-2.5"
                  >
                    <div className="w-7 h-7 rounded-md bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 font-bold text-xs">
                      🎓
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-zinc-900 leading-tight">
                        {badge.info?.title || badge.badgeId}
                      </p>
                      <p className="text-[11px] text-zinc-600">
                        Carga Horária: {badge.info?.workloadHours || 12}h • Nota: {badge.score}%
                      </p>
                      <p className="text-[10px] text-purple-700 font-mono">
                        Cód: {badge.code || 'SKILL-PR-2026'}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="border border-zinc-200 rounded-lg p-2.5 bg-zinc-50/60 flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 font-bold text-xs">
                    🎓
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-zinc-900">
                      Rotinas Administrativas e Processos de Escritório
                    </p>
                    <p className="text-[11px] text-zinc-600">Carga Horária: 12h • Nota: 100%</p>
                    <p className="text-[10px] text-purple-700 font-mono">Cód: SKILL-ADM-8821</p>
                  </div>
                </div>
              )}

              {/* Segundo curso padrão se tiver apenas 1 */}
              {earnedBadges.length <= 1 && (
                <div className="border border-zinc-200 rounded-lg p-2.5 bg-zinc-50/60 flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 font-bold text-xs">
                    📊
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-zinc-900">
                      Microsoft Excel &amp; Planilhas para Escritório
                    </p>
                    <p className="text-[11px] text-zinc-600">Carga Horária: 16h • Nota: 95%</p>
                    <p className="text-[10px] text-purple-700 font-mono">Cód: SKILL-XLS-9410</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 4. Competências e Habilidades */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold text-purple-900 uppercase tracking-widest border-b border-zinc-200 pb-1">
              4. Competências &amp; Ferramentas
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {competencias.map((comp, idx) => (
                <span
                  key={idx}
                  className="bg-zinc-100 text-zinc-800 border border-zinc-300 text-xs px-2.5 py-1 rounded font-medium"
                >
                  ✓ {comp}
                </span>
              ))}
            </div>
          </div>

          {/* 5. Informações Complementares */}
          <div className="space-y-1.5 pt-1">
            <h2 className="text-xs font-bold text-purple-900 uppercase tracking-widest border-b border-zinc-200 pb-1">
              5. Informações Complementares
            </h2>
            <ul className="text-xs text-zinc-700 space-y-1 list-disc list-inside">
              <li>Disponibilidade para início imediato no contraturno escolar (tarde ou manhã).</li>
              <li>Fácil acesso ao transporte público (linhas RMC e URBS / Terminais CIC, Pinheirinho e Portão).</li>
              <li>Participação ativa em projetos escolares de inovação e cidadania.</li>
            </ul>
          </div>

          {/* Rodapé de autenticação */}
          <div className="pt-4 border-t border-zinc-200 text-center text-[10px] text-zinc-400">
            Currículo gerado e validado pela plataforma SkillHub (Curitiba &amp; RMC) • Empregabilidade Jovem
          </div>
        </div>
      </div>
    </div>
  );
}
