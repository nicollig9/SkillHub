'use client';

import React, { useState } from 'react';
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
  GraduationCap,
  Users2,
  Target,
  FileText,
  Utensils,
  Layers,
  HeartPulse
} from 'lucide-react';

interface JobDetailsModalProps {
  isOpen: boolean;
  vaga: JobVacancy | null;
  distanceKm: number;
  adherencePercent: number;
  onClose: () => void;
  onApply: (vaga: JobVacancy) => void;
}

// Perfil institucional realista da empresa com base no nome e segmento
function getCompanyProfile(vaga: JobVacancy) {
  const nome = vaga.empresaNome.toLowerCase();
  const desc = vaga.descricao.toLowerCase();

  if (nome.includes('bosch')) {
    return {
      descricao:
        'A Robert Bosch Ltda. é uma líder global em tecnologia e serviços automotivos e industriais. No polo da Cidade Industrial de Curitiba (CIC), a empresa mantém fábricas de alta precisão e centros de pesquisa, promovendo um dos programas de formação de Jovens Aprendizes mais respeitados do país, focado em excelência técnica e desenvolvimento humano.',
      porte: 'Grande Porte (+5.000 colaboradores no PR)',
      setor: 'Tecnologia Automotiva & Indústria 4.0',
      polo: `${vaga.bairro}, ${vaga.cidade} - PR (Acesso direto por alimentadores do Terminal CIC)`
    };
  }

  if (nome.includes('positivo')) {
    return {
      descricao:
        'O Grupo Positivo é um dos maiores e mais tradicionais ecossistemas de educação e tecnologia do Paraná e do Brasil, com mais de 50 anos de história. A instituição investe na formação contínua de jovens talentos, oferecendo ambiente colaborativo, moderno e voltado para a inovação e impacto social.',
      porte: 'Grande Porte (+4.000 colaboradores)',
      setor: 'Educação, Editorial & Tecnologia da Informação',
      polo: `${vaga.bairro}, ${vaga.cidade} - PR (Eixo Batel / Centro)`
    };
  }

  if (nome.includes('condor')) {
    return {
      descricao:
        'A Rede Condor é uma das maiores redes supermercadistas e atacadistas do Sul do Brasil, fundada em Curitiba há mais de 45 anos. Com dezenas de lojas e centros de distribuição na RMC, é uma das principais portas de entrada do jovem no mercado de trabalho formal, com plano de carreira estruturado.',
      porte: 'Grande Porte (+14.000 colaboradores)',
      setor: 'Varejo Supermercadista & Logística',
      polo: `${vaga.bairro}, ${vaga.cidade} - PR (Próximo a terminais da Linha Direta URBS)`
    };
  }

  if (nome.includes('batel') || nome.includes('advocacia') || nome.includes('consultoria')) {
    return {
      descricao:
        'A Advocacia & Consultoria Batel RH é um escritório corporativo consolidado que presta assessoria jurídica, trabalhista e de gestão de talentos para médias e grandes empresas da Região Metropolitana de Curitiba. Proporciona aprendizado prático em rotinas administrativas e atendimento de alto padrão.',
      porte: 'Médio Porte (150 a 300 colaboradores)',
      setor: 'Serviços Jurídicos & Consultoria Corporativa',
      polo: `${vaga.bairro}, ${vaga.cidade} - PR (Região nobre do Batel, fácil acesso a ônibus)`
    };
  }

  if (nome.includes('tatuquara') || nome.includes('expedição') || nome.includes('distribuição')) {
    return {
      descricao:
        'O Centro de Distribuição Tatuquara Express é um dos principais hubs logísticos e de e-commerce do anel sul de Curitiba, integrando fluxos da BR-116 e do Contorno Sul. Oferece programas de capacitação para jovens na área de cadeia de suprimentos, conferência e controle de estoque.',
      porte: 'Grande Porte (+800 colaboradores)',
      setor: 'Logística, Armazenagem & E-commerce',
      polo: `${vaga.bairro}, ${vaga.cidade} - PR (Linhas integradas do Terminal Tatuquara)`
    };
  }

  if (nome.includes('pinheirinho') || nome.includes('atacadista')) {
    return {
      descricao:
        'O Atacadista Sul Linha Verde é um centro atacadista e de autosserviço de grande porte localizado no corredor da Linha Verde Sul. Destaca-se pelo ambiente dinâmico, respeito aos direitos de aprendizagem e constante promoção interna de jovens estudantes.',
      porte: 'Médio/Grande Porte (450 colaboradores)',
      setor: 'Atacado & Distribuição Comercial',
      polo: `${vaga.bairro}, ${vaga.cidade} - PR (Conexão direta com Terminal Pinheirinho)`
    };
  }

  if (nome.includes('renault') || nome.includes('araucária') || nome.includes('são josé')) {
    return {
      descricao:
        'Complexo automotivo e fabril referência no Paraná, pioneiro em manufatura avançada e sustentabilidade. Seus programas de estágio e primeiro emprego são amplamente reconhecidos por proporcionar mentoria de líderes seniores e cursos técnicos integrados.',
      porte: 'Grande Porte (+7.000 colaboradores)',
      setor: 'Indústria Automobilística & Engenharia',
      polo: `${vaga.bairro}, ${vaga.cidade} - PR (Linhas metropolitanas integradas Metrocard)`
    };
  }

  if (nome.includes('hospital') || nome.includes('saúde') || nome.includes('médic')) {
    return {
      descricao:
        'Instituição hospitalar e de assistência à saúde de referência no Paraná, pautada pela humanização, ética e responsabilidade comunitária. O setor administrativo capacita jovens nas rotinas de recepção, prontuários digitais e acolhimento aos pacientes.',
      porte: 'Grande Porte (+2.500 colaboradores)',
      setor: 'Saúde, Atendimento Hospitalar & Ensino',
      polo: `${vaga.bairro}, ${vaga.cidade} - PR (Área central hospitalar de Curitiba)`
    };
  }

  // Descrição Padrão Realista
  return {
    descricao: `${vaga.empresaNome} é uma instituição corporativa de referência com polo atuante no bairro ${vaga.bairro}, em Curitiba & Região Metropolitana. Reconhecida pelas boas práticas de gestão de pessoas e cumprimento rigoroso da Lei do Aprendiz e do Estágio, investe ativamente no desenvolvimento de jovens talentos para o mercado paranaense.`,
    porte: 'Médio / Grande Porte (+350 colaboradores)',
    setor: vaga.tipoVaga === 'Estagiário' ? 'Serviços Corporativos & Tecnologia' : 'Comércio, Logística & Administração',
    polo: `${vaga.bairro}, ${vaga.cidade} - PR (Fácil acesso ao transporte coletivo)`
  };
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
  const { student, badges } = useApp();
  const [activeTab, setActiveTab] = useState<'TODAS' | 'EMPRESA' | 'PERFIL' | 'ATIVIDADES' | 'BENEFICIOS'>('TODAS');

  if (!isOpen || !vaga) return null;

  const company = getCompanyProfile(vaga);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div
        className="bg-[#110E1B] border border-purple-500/30 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-scaleUp"
        role="dialog"
        aria-modal="true"
        aria-labelledby="job-details-title"
      >
        {/* ===================================================== */}
        {/* CABEÇALHO DO MODAL (PADRÃO PROFISSIONAL DE RECRUTAMENTO) */}
        {/* ===================================================== */}
        <div className="bg-[#160F28] border-b border-[#2D1B4E]/80 p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white bg-[#0F0C1D] hover:bg-purple-950/60 rounded-xl border border-[#2D1B4E] transition-all cursor-pointer"
            aria-label="Fechar detalhes da vaga"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges de Topo */}
          <div className="flex flex-wrap items-center gap-2 mb-3 pr-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-950/80 border border-purple-500/40 text-purple-200">
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              <span>✨ {adherencePercent}% de Compatibilidade com seu Perfil</span>
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

          {/* Empresa com Badge CNPJ Verificado e Localização */}
          <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs sm:text-sm text-zinc-300">
            <div className="flex items-center gap-1.5 font-semibold text-white">
              <Building2 className="w-4 h-4 text-purple-400 shrink-0" />
              <span>{vaga.empresaNome}</span>
              {vaga.empresaValidadaCnpj ? (
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  CNPJ Verificado
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] text-purple-300 font-medium bg-purple-950/40 px-2 py-0.5 rounded border border-purple-500/20">
                  Empresa Parceira
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

          {/* Destaque Salarial & Carga Horária */}
          <div className="mt-4 grid grid-cols-2 gap-3 p-3.5 bg-[#0F0C1D] border border-[#2D1B4E] rounded-2xl">
            <div>
              <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider block">
                Bolsa / Salário Mensal
              </span>
              <div className="text-lg sm:text-xl font-black text-emerald-400 mt-0.5">
                {formattedSalary}
              </div>
            </div>

            <div>
              <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider block">
                Carga Horária &amp; Horário de Trabalho
              </span>
              <div className="text-xs sm:text-sm font-bold text-zinc-200 mt-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>{cargaSemanal} ({vaga.horario})</span>
              </div>
            </div>
          </div>

          {/* Barra de Navegação por Abas (Estilo Apps de Recrutamento) */}
          <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-t border-[#2D1B4E]/60 pt-3">
            {[
              { id: 'TODAS', label: 'Visão Geral', icon: Layers },
              { id: 'EMPRESA', label: '1. Sobre a Empresa', icon: Building2 },
              { id: 'PERFIL', label: '2. Perfil Desejado', icon: Target },
              { id: 'ATIVIDADES', label: '3. Atividades', icon: Briefcase },
              { id: 'BENEFICIOS', label: '4. Benefícios', icon: HeartHandshake }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-900/40'
                      : 'bg-[#110E1B] text-zinc-400 hover:text-zinc-200 hover:bg-[#1A122E] border border-purple-500/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ===================================================== */}
        {/* CORPO DO MODAL (ROLÁVEL COM AS 4 SEÇÕES ENRIQUECIDAS) */}
        {/* ===================================================== */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm leading-relaxed text-zinc-300">
          
          {/* ===================================================== */}
          {/* ABA / BLOCO 1: 🏢 SOBRE A EMPRESA */}
          {/* ===================================================== */}
          {(activeTab === 'TODAS' || activeTab === 'EMPRESA') && (
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider">
                <Building2 className="w-4 h-4 text-purple-400" />
                <span>1. Sobre a Empresa Contratante</span>
              </div>

              <div className="bg-[#140E24] border border-[#2D1B4E]/60 rounded-2xl p-4 sm:p-5 space-y-4">
                <p className="text-zinc-300 leading-relaxed">
                  {company.descricao}
                </p>

                {/* Cards de Metadados Corporativos */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-[#2D1B4E]/40 text-xs">
                  <div className="bg-[#0F0C1D] border border-purple-500/20 rounded-xl p-3 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-zinc-500 flex items-center gap-1">
                      <Users2 className="w-3.5 h-3.5 text-purple-400" />
                      Porte da Empresa
                    </span>
                    <p className="font-semibold text-zinc-200">{company.porte}</p>
                  </div>

                  <div className="bg-[#0F0C1D] border border-purple-500/20 rounded-xl p-3 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-zinc-500 flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                      Setor de Atuação
                    </span>
                    <p className="font-semibold text-zinc-200">{company.setor}</p>
                  </div>

                  <div className="bg-[#0F0C1D] border border-purple-500/20 rounded-xl p-3 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-zinc-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      Polo de Trabalho
                    </span>
                    <p className="font-semibold text-zinc-200">{company.polo}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1 text-[11px] text-purple-300 bg-purple-950/40 p-2.5 rounded-xl border border-purple-500/20">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    <strong>Conformidade Legal Garantida:</strong> Vaga registrada conforme as diretrizes do Ministério do Trabalho e Emprego (MTE) e Lei 10.097/00 (Jovem Aprendiz) / Lei 11.788/08 (Estágio).
                  </span>
                </div>
              </div>
            </section>
          )}

          {/* ===================================================== */}
          {/* ABA / BLOCO 2: 🎯 O QUE A EMPRESA BUSCA (PERFIL DESEJADO) */}
          {/* ===================================================== */}
          {(activeTab === 'TODAS' || activeTab === 'PERFIL') && (
            <section className="space-y-3">
              <div className="flex items-center justify-between text-white font-bold text-sm uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-purple-400" />
                  <span>2. O que a Empresa Busca (Perfil Desejado)</span>
                </div>
                <span className="text-xs font-semibold text-purple-300">
                  {matchingBadgesCount}/{vaga.badgesRequeridas.length} requisitos compatíveis
                </span>
              </div>

              <div className="bg-[#140E24] border border-[#2D1B4E]/60 rounded-2xl p-4 sm:p-5 space-y-4">
                {/* Requisitos Comportamentais & Técnicos */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-purple-300 block">
                    Requisitos Comportamentais &amp; Formação Escolar:
                  </span>
                  <ul className="space-y-2 text-zinc-300 text-xs sm:text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white">Escolaridade:</strong> Estudantes do Ensino Médio, Técnico ou Superior com matrícula ativa e frequência comprovada (turno compatível com a vaga).
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white">Atitude &amp; Postura:</strong> Vontade genuína de aprender, pontualidade, facilidade para trabalhar em equipe e comunicação clara e respeitosa.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white">Ferramentas de Trabalho:</strong> Conhecimentos básicos de informática, internet, e-mail corporativo e planilhas eletrônicas (alinhados aos cursos do SkillHub).
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Selos e Microcertificações Exigidos */}
                <div className="pt-3 border-t border-[#2D1B4E]/40 space-y-2">
                  <span className="text-xs font-bold text-zinc-400 block">
                    Selos de Competência &amp; Microcertificações do SkillHub:
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
                </div>

                {/* Cursos Recomendados para Capacitação */}
                <div className="pt-3 border-t border-[#2D1B4E]/40 space-y-2">
                  <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                    <span>Cursos do SkillHub Recomendados para Fortalecer sua Candidatura:</span>
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
                          <span className="text-emerald-400 font-semibold">Gratuito &amp; Online</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ===================================================== */}
          {/* ABA / BLOCO 3: 📋 ATIVIDADES & RESPONSABILIDADES */}
          {/* ===================================================== */}
          {(activeTab === 'TODAS' || activeTab === 'ATIVIDADES') && (
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider">
                <Briefcase className="w-4 h-4 text-purple-400" />
                <span>3. Atividades &amp; Responsabilidades Diárias</span>
              </div>

              <div className="bg-[#140E24] border border-[#2D1B4E]/60 rounded-2xl p-4 sm:p-5 space-y-3">
                <p className="text-zinc-300">{vaga.descricao}</p>

                <div className="pt-2 border-t border-[#2D1B4E]/40 space-y-2">
                  <span className="text-xs font-bold text-purple-300 block">
                    Rotinas práticas que você executará no dia a dia:
                  </span>
                  <ul className="space-y-2 text-zinc-300 text-xs sm:text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white">Atendimento &amp; Apoio:</strong> Recepção e triagem inicial de correspondências, e-mails e solicitações de clientes ou colegas de setor.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white">Organização de Arquivos:</strong> Digitalização, classificação de documentos e manutenção de planilhas de controle no Microsoft Excel e Google Drive.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white">Lançamento de Dados:</strong> Atualização de cadastros em sistemas internos (ERP/SAP) com acompanhamento direto de um tutor ou gestor da área.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white">Ética e Segurança:</strong> Zelo pelas diretrizes de conduta corporativa, sigilo de informações conforme a LGPD e pontualidade na jornada diária.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white">Formação Teórica:</strong> Participação periódica em oficinas de capacitação profissional e acompanhamento pedagógico.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* ===================================================== */}
          {/* ABA / BLOCO 4: 🎁 BENEFÍCIOS OFERTADOS */}
          {/* ===================================================== */}
          {(activeTab === 'TODAS' || activeTab === 'BENEFICIOS') && (
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider">
                <HeartHandshake className="w-4 h-4 text-purple-400" />
                <span>4. Benefícios Ofertados &amp; Apoio ao Jovem</span>
              </div>

              <div className="bg-[#140E24] border border-[#2D1B4E]/60 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="flex items-center gap-2.5 p-3 bg-[#0F0C1D] border border-[#2D1B4E] rounded-xl text-xs text-zinc-200">
                    <Bus className="w-4 h-4 text-purple-400 shrink-0" />
                    <div>
                      <strong className="text-white block font-semibold">Vale-Transporte Integral</strong>
                      <span className="text-[11px] text-zinc-400">Cartão URBS / Metrocard sem cobranças abusivas</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 p-3 bg-[#0F0C1D] border border-[#2D1B4E] rounded-xl text-xs text-zinc-200">
                    <Utensils className="w-4 h-4 text-purple-400 shrink-0" />
                    <div>
                      <strong className="text-white block font-semibold">Vale-Refeição ou Alimentação</strong>
                      <span className="text-[11px] text-zinc-400">Refeitório estruturado no local ou cartão benefício</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 p-3 bg-[#0F0C1D] border border-[#2D1B4E] rounded-xl text-xs text-zinc-200">
                    <HeartPulse className="w-4 h-4 text-purple-400 shrink-0" />
                    <div>
                      <strong className="text-white block font-semibold">Seguro de Vida Coletivo</strong>
                      <span className="text-[11px] text-zinc-400">Cobertura integral e assistência médica/odontológica</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 p-3 bg-[#0F0C1D] border border-[#2D1B4E] rounded-xl text-xs text-zinc-200">
                    <BookOpen className="w-4 h-4 text-purple-400 shrink-0" />
                    <div>
                      <strong className="text-white block font-semibold">Tutoria &amp; Mentoria Dedicada</strong>
                      <span className="text-[11px] text-zinc-400">Acompanhamento contínuo de gestores experientes</span>
                    </div>
                  </div>
                </div>

                {vaga.beneficios && vaga.beneficios.length > 0 && (
                  <div className="pt-2 border-t border-[#2D1B4E]/40">
                    <span className="text-[11px] text-zinc-400 font-bold block mb-1.5">
                      Vantagens adicionais oferecidas por esta filial:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {vaga.beneficios.map((b, i) => (
                        <span
                          key={i}
                          className="bg-purple-950/40 text-purple-200 border border-purple-500/20 text-[11px] px-2.5 py-1 rounded-lg"
                        >
                          ✓ {b}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>

        {/* ===================================================== */}
        {/* RODAPÉ FIXO DO MODAL */}
        {/* ===================================================== */}
        <div className="bg-[#160F28] border-t border-[#2D1B4E]/80 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-zinc-400 flex items-center gap-1.5 self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
            <span>{vaga.candidatosInscritos} candidaturas registradas via IA Multiplataforma</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl bg-[#0F0C1D] border border-[#2D1B4E] hover:border-purple-500/50 text-zinc-300 hover:text-white font-bold text-xs transition-colors cursor-pointer"
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
