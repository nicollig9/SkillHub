'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { BAIRROS_CURITIBA } from '@/data/mockData';
import { JobVacancy, Badge } from '@/types';
import { 
  Building2, 
  PlusCircle, 
  Search, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Award, 
  MapPin, 
  UserCheck, 
  Clock, 
  DollarSign, 
  Filter, 
  ArrowRight,
  ArrowLeft,
  Sparkles, 
  Lock, 
  Mail, 
  Phone,
  Bus,
  Users,
  Briefcase,
  Calendar,
  Check,
  Send,
  Sliders,
  ExternalLink,
  ChevronRight,
  Sparkle,
  BookmarkCheck,
  Building,
  GraduationCap,
  HeartHandshake
} from 'lucide-react';

// Tipos para o Kanban de Candidaturas
interface KanbanCandidate {
  id: string;
  nomeMascarado: string;
  idade: number;
  bairro: string;
  escolaridade: string;
  rotaOnibus: string;
  compatibilidade: number;
  vagaTitulo: string;
  status: 'INSCRITO' | 'PRE_SELECIONADO' | 'ENTREVISTA_AGENDADA';
  badgesPrincipais: string[];
  dataEntrevista?: string;
  horarioEntrevista?: string;
}

// Candidatos Mockados da Busca Ativa (LGPD)
interface ActiveSearchCandidate {
  id: string;
  nomeMascarado: string;
  iniciais: string;
  idade: number;
  bairro: string;
  regiao: string;
  modalidade: 'Jovem Aprendiz' | 'Estagiário' | 'Ambos';
  escolaridade: string;
  turnoEscola: string;
  rotaOnibus: string;
  tempoDeslocamento: string;
  badges: { title: string; score: number }[];
  conviteEnviado: boolean;
}

const INITIAL_ACTIVE_CANDIDATES: ActiveSearchCandidate[] = [
  {
    id: 'cand-01',
    nomeMascarado: 'Lucas S. O.',
    iniciais: 'LO',
    idade: 17,
    bairro: 'CIC',
    regiao: 'Curitiba Sul',
    modalidade: 'Jovem Aprendiz',
    escolaridade: 'Ensino Médio (2º Ano)',
    turnoEscola: 'Noite',
    rotaOnibus: 'Expresso Pinheirinho/CIC e Linha 040 Interbairros II',
    tempoDeslocamento: '15 min de integração',
    badges: [
      { title: 'Atendimento ao Cliente', score: 96 },
      { title: 'Pacote Office & Excel', score: 91 },
      { title: 'Comunicação Assertiva', score: 88 },
      { title: 'Direitos & Legislação', score: 85 }
    ],
    conviteEnviado: false
  },
  {
    id: 'cand-02',
    nomeMascarado: 'Beatriz M. R.',
    iniciais: 'BR',
    idade: 18,
    bairro: 'Portão',
    regiao: 'Curitiba Central/Sul',
    modalidade: 'Estagiário',
    escolaridade: 'Técnico em Administração (IFPR)',
    turnoEscola: 'Manhã',
    rotaOnibus: 'Ligeirão Portão/Tamandaré e Linha Santa Cândida/Capão Raso',
    tempoDeslocamento: '12 min direto',
    badges: [
      { title: 'Rotinas Administrativas', score: 98 },
      { title: 'Pacote Office & Excel', score: 94 },
      { title: 'Organização & Foco', score: 90 }
    ],
    conviteEnviado: false
  },
  {
    id: 'cand-03',
    nomeMascarado: 'Matheus K. P.',
    iniciais: 'MP',
    idade: 17,
    bairro: 'Pinheirinho',
    regiao: 'Curitiba Sul',
    modalidade: 'Jovem Aprendiz',
    escolaridade: 'Ensino Médio (3º Ano)',
    turnoEscola: 'Manhã',
    rotaOnibus: 'Ligeirão Pinheirinho / Carlos Gomes e Circular Sul',
    tempoDeslocamento: '20 min via Terminal Pinheirinho',
    badges: [
      { title: 'Logística Básica', score: 92 },
      { title: 'Segurança no Trabalho', score: 89 },
      { title: 'Pacote Office & Excel', score: 84 }
    ],
    conviteEnviado: false
  },
  {
    id: 'cand-04',
    nomeMascarado: 'Camila V. S.',
    iniciais: 'CS',
    idade: 19,
    bairro: 'Colombo',
    regiao: 'RMC Norte',
    modalidade: 'Estagiário',
    escolaridade: 'Superior em Marketing (1º ano)',
    turnoEscola: 'Noite',
    rotaOnibus: 'Ligeirinho Colombo/CIC e Maracanã/Guadalupe',
    tempoDeslocamento: '25 min via integração Comec',
    badges: [
      { title: 'Marketing Digital & Mídias', score: 95 },
      { title: 'Comunicação Assertiva', score: 93 },
      { title: 'Atendimento ao Cliente', score: 89 }
    ],
    conviteEnviado: false
  },
  {
    id: 'cand-05',
    nomeMascarado: 'Gabriel T. L.',
    iniciais: 'GL',
    idade: 18,
    bairro: 'Araucária',
    regiao: 'RMC Sul',
    modalidade: 'Jovem Aprendiz',
    escolaridade: 'Ensino Médio Completo',
    turnoEscola: 'Concluído',
    rotaOnibus: 'Linha Direta Araucária / Curitiba e Angélica / Pinheirinho',
    tempoDeslocamento: '22 min direto até CIC',
    badges: [
      { title: 'Noções de Produção & Manutenção', score: 94 },
      { title: 'Segurança no Trabalho', score: 92 },
      { title: 'Direitos & Legislação', score: 86 }
    ],
    conviteEnviado: false
  },
  {
    id: 'cand-06',
    nomeMascarado: 'Juliana F. B.',
    iniciais: 'JB',
    idade: 17,
    bairro: 'Boqueirão',
    regiao: 'Curitiba Leste',
    modalidade: 'Jovem Aprendiz',
    escolaridade: 'Ensino Médio (2º Ano)',
    turnoEscola: 'Manhã',
    rotaOnibus: 'Expresso Boqueirão / Praça Rui Barbosa e Linha 502 Circular Sul',
    tempoDeslocamento: '18 min via Terminal Boqueirão',
    badges: [
      { title: 'Atendimento ao Cliente', score: 97 },
      { title: 'Comunicação Assertiva', score: 91 },
      { title: 'Pacote Office & Excel', score: 88 }
    ],
    conviteEnviado: false
  }
];

// Empresas de Referência para Demonstração Rápida de CNPJ em Curitiba
const DEMO_COMPANIES_CURITIBA = [
  {
    cnpj: '01.323.714/0001-09',
    razaoSocial: 'Renault do Brasil S.A.',
    nomeFantasia: 'Renault Curitiba & Polo Automotivo',
    bairro: 'CIC',
    porte: 'Grande Empresa',
    ramo: 'Indústria Automobilística & Logística'
  },
  {
    cnpj: '02.438.455/0001-76',
    razaoSocial: 'Positivo Tecnologia S.A.',
    nomeFantasia: 'Positivo Tecnologia Curitiba',
    bairro: 'CIC',
    porte: 'Grande Empresa',
    ramo: 'Tecnologia da Informação & Hardware'
  },
  {
    cnpj: '11.137.051/0001-86',
    razaoSocial: 'Grupo Boticário Negócios S.A.',
    nomeFantasia: 'O Boticário',
    bairro: 'Pinheirinho',
    porte: 'Grande Empresa',
    ramo: 'Cosméticos, Varejo & E-commerce'
  },
  {
    cnpj: '10.490.181/0001-35',
    razaoSocial: 'MadeiraMadeira Comércio S.A.',
    nomeFantasia: 'MadeiraMadeira Curitiba Tech',
    bairro: 'Batel',
    porte: 'Média Empresa',
    ramo: 'E-commerce & Tecnologia'
  }
];

export default function RecruiterDashboard() {
  const { student, vagas, badges, applications, addNewVacancy, currentUser, showToast } = useApp();

  // Sistema de Abas Principais
  const [activeTab, setActiveTab] = useState<'PUBLICAR_VAGA' | 'BUSCA_ATIVA' | 'KANBAN' | 'MARCA_EMPREGADORA'>('PUBLICAR_VAGA');

  // =========================================================================
  // 1. DADOS DE ONBOARDING & CADASTRO DA EMPRESA
  // =========================================================================
  const [empresaCnpj, setEmpresaCnpj] = useState('01.323.714/0001-09');
  const [empresaRazao, setEmpresaRazao] = useState('Renault do Brasil S.A.');
  const [empresaFantasia, setEmpresaFantasia] = useState('Renault Curitiba & Polo Automotivo');
  const [empresaBairro, setEmpresaBairro] = useState('CIC');
  const [empresaPorte, setEmpresaPorte] = useState<'Startup' | 'Pequena Empresa' | 'Média Empresa' | 'Grande Empresa'>('Grande Empresa');
  const [isCnpjValidado, setIsCnpjValidado] = useState(true);
  const [showEditCompanyModal, setShowEditCompanyModal] = useState(false);

  // =========================================================================
  // 2. FORMULÁRIO DE PUBLICAÇÃO DE VAGA EM 3 PASSOS
  // =========================================================================
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [vagaCargo, setVagaCargo] = useState('Jovem Aprendiz Administrativo');
  const [vagaTipo, setVagaTipo] = useState<'Jovem Aprendiz' | 'Estagiário' | 'Primeiro Emprego'>('Jovem Aprendiz');
  const [vagaBairro, setVagaBairro] = useState('CIC');
  const [vagaDescricao, setVagaDescricao] = useState('Suporte nas rotinas administrativas, controle de planilhas de atendimento, organização de arquivos e atendimento a colaboradores no escritório regional de Curitiba.');

  const [vagaBadges, setVagaBadges] = useState<string[]>([
    'badge-direitos-legislação',
    'badge-comunicacao-assertiva',
    'badge-pacote-office'
  ]);
  const [vagaEscolaridade, setVagaEscolaridade] = useState('Ensino Médio Cursando (ou Concluído)');
  const [vagaTurno, setVagaTurno] = useState('Manhã ou Tarde');

  const [vagaSalario, setVagaSalario] = useState('1180');
  const [vagaHoras, setVagaHoras] = useState('6');
  const [vagaHorario, setVagaHorario] = useState('08:00 às 14:00 (Segunda a Sexta)');
  const [vagaVt, setVagaVt] = useState(true);
  const [vagaBeneficios, setVagaBeneficios] = useState<string[]>([
    'Vale-Transporte (URBS/Comec)',
    'Vale-Refeição / Refeitório',
    'Seguro de Vida',
    'Trilha de Capacitação SkillHub'
  ]);

  const [publishFeedback, setPublishFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // =========================================================================
  // 3. BUSCA ATIVA DE CANDIDATOS
  // =========================================================================
  const [activeCandidates, setActiveCandidates] = useState<ActiveSearchCandidate[]>(INITIAL_ACTIVE_CANDIDATES);
  const [filtroBairro, setFiltroBairro] = useState('TODOS');
  const [filtroBadge, setFiltroBadge] = useState('TODOS');
  const [filtroModalidade, setFiltroModalidade] = useState('TODOS');
  const [selectedCandidateForInvite, setSelectedCandidateForInvite] = useState<ActiveSearchCandidate | null>(null);
  const [inviteVagaSelect, setInviteVagaSelect] = useState('Jovem Aprendiz Administrativo - CIC');
  const [inviteDate, setInviteDate] = useState('2026-10-28');
  const [inviteTime, setInviteTime] = useState('14:30');

  // =========================================================================
  // 4. KANBAN DE CANDIDATURAS
  // =========================================================================
  const [kanbanItems, setKanbanItems] = useState<KanbanCandidate[]>([
    {
      id: 'kb-1',
      nomeMascarado: 'Lucas S. O.',
      idade: 17,
      bairro: 'CIC',
      escolaridade: 'Ensino Médio (2º Ano)',
      rotaOnibus: 'Linha 040 Interbairros II (10 min)',
      compatibilidade: 95,
      vagaTitulo: 'Jovem Aprendiz Administrativo',
      status: 'INSCRITO',
      badgesPrincipais: ['Atendimento ao Cliente', 'Pacote Office', 'Comunicação']
    },
    {
      id: 'kb-2',
      nomeMascarado: 'Beatriz M. R.',
      idade: 18,
      bairro: 'Portão',
      escolaridade: 'Técnico em Administração',
      rotaOnibus: 'Ligeirão Portão / CIC (12 min)',
      compatibilidade: 98,
      vagaTitulo: 'Estagiário de RH & Gente',
      status: 'PRE_SELECIONADO',
      badgesPrincipais: ['Rotinas ADM', 'Excel Avançado', 'Organização']
    },
    {
      id: 'kb-3',
      nomeMascarado: 'Matheus K. P.',
      idade: 17,
      bairro: 'Pinheirinho',
      escolaridade: 'Ensino Médio (3º Ano)',
      rotaOnibus: 'Ligeirão Pinheirinho (18 min)',
      compatibilidade: 90,
      vagaTitulo: 'Jovem Aprendiz Administrativo',
      status: 'INSCRITO',
      badgesPrincipais: ['Logística Básica', 'Segurança no Trabalho']
    },
    {
      id: 'kb-4',
      nomeMascarado: 'Juliana F. B.',
      idade: 17,
      bairro: 'Boqueirão',
      escolaridade: 'Ensino Médio (2º Ano)',
      rotaOnibus: 'Circular Sul (20 min)',
      compatibilidade: 94,
      vagaTitulo: 'Estagiário de RH & Gente',
      status: 'ENTREVISTA_AGENDADA',
      badgesPrincipais: ['Atendimento', 'Comunicação Assertiva'],
      dataEntrevista: '24/10/2026',
      horarioEntrevista: '15:00'
    },
    {
      id: 'kb-5',
      nomeMascarado: 'Gabriel T. L.',
      idade: 18,
      bairro: 'Araucária',
      escolaridade: 'Ensino Médio Completo',
      rotaOnibus: 'Linha Direta Araucária / CIC (15 min)',
      compatibilidade: 92,
      vagaTitulo: 'Jovem Aprendiz Administrativo',
      status: 'PRE_SELECIONADO',
      badgesPrincipais: ['Noções de Produção', 'Legislação']
    }
  ]);

  // =========================================================================
  // 5. PERFIL DA MARCA EMPREGADORA
  // =========================================================================
  const [marcaDescricao, setMarcaDescricao] = useState(
    'Somos apaixonados pelo desenvolvimento do primeiro emprego em Curitiba. Oferecemos mentoria dedicada para cada estagiário e aprendiz, proporcionando rota clara de efetivação e desenvolvimento profissional acelerado.'
  );
  const [marcaBeneficiosTexto, setMarcaBeneficiosTexto] = useState(
    'Bolsa compatível com o mercado, Vale-Transporte integral URBS/Comec, Vale Refeição, Seguro de Vida, Folga no dia do aniversário, Biblioteca corporativa e Acesso ilimitado às Trilhas de Capacitação do SkillHub.'
  );
  const [marcaLogoUrl, setMarcaLogoUrl] = useState('/logo.png');

  // Handlers para Validação de CNPJ
  const handleValidateCnpj = (cnpjInput: string) => {
    const clean = cnpjInput.replace(/\D/g, '');
    const foundDemo = DEMO_COMPANIES_CURITIBA.find(
      (c) => c.cnpj.replace(/\D/g, '') === clean
    );

    if (foundDemo) {
      setEmpresaCnpj(foundDemo.cnpj);
      setEmpresaRazao(foundDemo.razaoSocial);
      setEmpresaFantasia(foundDemo.nomeFantasia);
      setEmpresaBairro(foundDemo.bairro);
      setEmpresaPorte(foundDemo.porte as any);
      setIsCnpjValidado(true);
      showToast('CNPJ Validado com Sucesso', `${foundDemo.nomeFantasia} homologada na base oficial do SkillHub!`, 'success');
      setShowEditCompanyModal(false);
      return;
    }

    if (clean.length === 14) {
      setEmpresaCnpj(cnpjInput);
      setEmpresaRazao('Organização Curitiba Parceira S.A.');
      setEmpresaFantasia('Empresa Parceira Curitiba RH');
      setEmpresaBairro('CIC');
      setIsCnpjValidado(true);
      showToast('CNPJ Auditado', 'Empresa verificada e autorizada para contratação de aprendizes!', 'success');
      setShowEditCompanyModal(false);
    } else {
      showToast('CNPJ Incompleto', 'Por favor digite um CNPJ válido com 14 dígitos.', 'warning');
    }
  };

  // Toggle de Badges no Passo 2
  const handleToggleBadge = (bId: string) => {
    setVagaBadges((prev) =>
      prev.includes(bId) ? prev.filter((id) => id !== bId) : [...prev, bId]
    );
  };

  // Envio da Publicação da Vaga (Passo 3)
  const handlePublishVacancy = (e: React.FormEvent) => {
    e.preventDefault();
    setPublishFeedback(null);

    if (!vagaCargo.trim() || !vagaDescricao.trim()) {
      setPublishFeedback({
        type: 'error',
        message: 'Preencha o cargo e a descrição das atividades antes de publicar.'
      });
      return;
    }

    const result = addNewVacancy({
      idEmpresa: 101,
      empresaNome: empresaFantasia || empresaRazao,
      empresaCnpjMasked: empresaCnpj,
      titulo: vagaCargo,
      tipoVaga: vagaTipo as any,
      descricao: vagaDescricao,
      bairro: vagaBairro,
      cidade: 'Curitiba',
      remuneracao: Number(vagaSalario) || 1180,
      beneficios: vagaBeneficios,
      cargaHorariaDiaria: Number(vagaHoras) || 6,
      horario: vagaHorario,
      status: 'ATIVA',
      badgesRequeridas: vagaBadges
    });

    if (result.success) {
      setPublishFeedback({
        type: 'success',
        message: `Vaga de "${vagaCargo}" publicada com sucesso no Mapa de Oportunidades de Curitiba e RMC!`
      });
      showToast('Vaga Publicada!', `A vaga está visível para candidatos em ${vagaBairro}.`, 'success');
      // Adiciona vaga ao Kanban como nova coluna de referência
      setKanbanItems((prev) => [
        {
          id: 'kb-' + Date.now(),
          nomeMascarado: 'Candidato Triagem #01',
          idade: 17,
          bairro: vagaBairro,
          escolaridade: vagaEscolaridade,
          rotaOnibus: `Integração direta até ${vagaBairro}`,
          compatibilidade: 100,
          vagaTitulo: vagaCargo,
          status: 'INSCRITO',
          badgesPrincipais: ['SkillHub Badges Validadas']
        },
        ...prev
      ]);
      setStep(1);
    } else {
      setPublishFeedback({
        type: 'error',
        message: result.message || 'Houve uma inconsistência nas políticas da Lei de Aprendizagem.'
      });
    }
  };

  // Enviar convite de entrevista na Busca Ativa
  const handleSendInterviewInvite = () => {
    if (!selectedCandidateForInvite) return;

    setActiveCandidates((prev) =>
      prev.map((c) =>
        c.id === selectedCandidateForInvite.id ? { ...c, conviteEnviado: true } : c
      )
    );

    // Adiciona o candidato diretamente à coluna de Entrevista no Kanban
    setKanbanItems((prev) => [
      {
        id: 'kb-inv-' + Date.now(),
        nomeMascarado: selectedCandidateForInvite.nomeMascarado,
        idade: selectedCandidateForInvite.idade,
        bairro: selectedCandidateForInvite.bairro,
        escolaridade: selectedCandidateForInvite.escolaridade,
        rotaOnibus: selectedCandidateForInvite.rotaOnibus,
        compatibilidade: 96,
        vagaTitulo: inviteVagaSelect,
        status: 'ENTREVISTA_AGENDADA',
        badgesPrincipais: selectedCandidateForInvite.badges.slice(0, 2).map((b) => b.title),
        dataEntrevista: inviteDate,
        horarioEntrevista: inviteTime
      },
      ...prev
    ]);

    showToast(
      'Convite de Entrevista Enviado!',
      `Convite enviado para ${selectedCandidateForInvite.nomeMascarado} via painel do aluno.`,
      'success'
    );
    setSelectedCandidateForInvite(null);
  };

  // Mover candidato no Kanban
  const handleMoveKanban = (
    id: string,
    nextStatus: 'INSCRITO' | 'PRE_SELECIONADO' | 'ENTREVISTA_AGENDADA'
  ) => {
    setKanbanItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: nextStatus } : item))
    );
    showToast('Fase Atualizada', 'O candidato foi movido com sucesso no funil de seleção!', 'info');
  };

  // Candidatos filtrados na Busca Ativa
  const filteredCandidates = activeCandidates.filter((cand) => {
    const matchBairro = filtroBairro === 'TODOS' || cand.bairro.toLowerCase() === filtroBairro.toLowerCase();
    const matchModalidade = filtroModalidade === 'TODOS' || cand.modalidade === filtroModalidade || cand.modalidade === 'Ambos';
    const matchBadge = filtroBadge === 'TODOS' || cand.badges.some((b) => b.title.toLowerCase().includes(filtroBadge.toLowerCase()));
    return matchBairro && matchModalidade && matchBadge;
  });

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-12 transition-colors duration-300">
      
      {/* ========================================================================= */}
      {/* 1. ONBOARDING & BOAS-VINDAS DA EMPRESA (HEADER EXECUTIVO & CONFIANÇA)     */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 bg-purple-900/60 border border-purple-400/30 text-purple-200 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                <Building2 className="w-3.5 h-3.5 text-purple-300" />
                Painel do Recrutador RH • Perfil Empresa
              </span>
              
              {/* Pílula de Confiança em Destaque */}
              <span className="inline-flex items-center gap-1.5 bg-emerald-950/70 border border-emerald-400/30 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                🔒 CNPJ Validado — Sua empresa visível para +1.200 jovens capacitados na RMC.
              </span>
            </div>

            <div className="pt-1">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight flex items-center gap-3">
                <span>{empresaFantasia}</span>
              </h1>
              <p className="text-xs sm:text-sm text-purple-200/90 font-medium max-w-3xl mt-1">
                Conecte sua empresa a talentos jovens de Curitiba e RMC com comprovação prática de habilidades por badges digitais e logística por proximidade.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                Sede: <strong className="text-white font-bold">{empresaBairro}</strong> (Curitiba)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-amber-400" />
                Porte: <strong className="text-white font-bold">{empresaPorte}</strong>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                CNPJ: <strong className="text-white font-mono">{empresaCnpj}</strong>
              </span>
            </div>
          </div>

          {/* Botão de Ajuste Rápido de Cadastro da Empresa */}
          <div className="shrink-0 flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => setShowEditCompanyModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:scale-[1.02]"
            >
              <Sliders className="w-4 h-4 text-amber-300" />
              <span>Gerenciar Dados &amp; CNPJ</span>
            </button>
          </div>
        </div>

        {/* Métricas Executivas de Atração & Impacto */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/10 relative z-10">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <span className="text-[11px] text-purple-200 block font-medium">Jovens Prontos na RMC</span>
            <span className="text-xl font-black text-white">+1.240</span>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <span className="text-[11px] text-purple-200 block font-medium">Badges Conquistadas</span>
            <span className="text-xl font-black text-amber-300">4.850 selos</span>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <span className="text-[11px] text-purple-200 block font-medium">Assiduidade Média</span>
            <span className="text-xl font-black text-emerald-300">98.4%</span>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <span className="text-[11px] text-purple-200 block font-medium">Custo de Intermediação</span>
            <span className="text-xl font-black text-white">0% Gratuito</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. NAVEGAÇÃO COMPLETA DO PAINEL RH (SISTEMA DE 4 ABAS DINÂMICAS)          */}
      {/* ========================================================================= */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-purple-500/20 rounded-2xl shadow-sm">
        <button
          onClick={() => setActiveTab('PUBLICAR_VAGA')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'PUBLICAR_VAGA'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>➕ Publicar Nova Vaga</span>
        </button>

        <button
          onClick={() => setActiveTab('BUSCA_ATIVA')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'BUSCA_ATIVA'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>🔍 Busca Ativa por Bairro &amp; Badges</span>
          <span className="ml-1 text-[10px] bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full font-bold">
            {activeCandidates.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('KANBAN')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'KANBAN'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>💼 Minhas Vagas &amp; Candidaturas (Kanban)</span>
          <span className="ml-1 text-[10px] bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full font-bold">
            {kanbanItems.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('MARCA_EMPREGADORA')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'MARCA_EMPREGADORA'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>🏢 Perfil da Marca Empregadora</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* ABA 1: FORMULÁRIO DE PUBLICAÇÃO EM 3 PASSOS                               */}
      {/* ========================================================================= */}
      {activeTab === 'PUBLICAR_VAGA' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 transition-colors duration-300">
          
          {/* Header e Indicador dos 3 Passos */}
          <div className="border-b border-slate-100 dark:border-slate-800 pb-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span>Publicar Nova Vaga no Mapa da RMC</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Cadastre sua oportunidade em 3 passos simples com pré-requisito de badges e conformidade legal automática.
                </p>
              </div>

              {/* Steps Progress Pills */}
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    step === 1 ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  1. Dados da Vaga
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    step === 2 ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  2. Pré-requisitos &amp; Badges
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    step === 3 ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  3. Bolsa &amp; Benefícios
                </button>
              </div>
            </div>
          </div>

          {publishFeedback && (
            <div
              className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                publishFeedback.type === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-200'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-500/40 text-rose-800 dark:text-rose-200'
              }`}
            >
              <div className="font-bold text-sm mb-1 flex items-center gap-2">
                {publishFeedback.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                )}
                <span>{publishFeedback.type === 'success' ? 'Vaga Homologada com Sucesso!' : 'Atenção na Publicação'}</span>
              </div>
              <p>{publishFeedback.message}</p>
            </div>
          )}

          <form onSubmit={handlePublishVacancy} className="space-y-6">
            {/* PASSO 1: DADOS DA VAGA */}
            {step === 1 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                      Título do Cargo / Função *
                    </label>
                    <input
                      type="text"
                      value={vagaCargo}
                      onChange={(e) => setVagaCargo(e.target.value)}
                      placeholder="Ex: Jovem Aprendiz Administrativo, Estagiário de RH..."
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
                      required
                    />
                    {/* Sugestões Rápidas */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {[
                        'Jovem Aprendiz Administrativo',
                        'Estagiário de RH & Gente',
                        'Jovem Aprendiz Logística',
                        'Estagiário de Suporte Tech'
                      ].map((sug) => (
                        <button
                          key={sug}
                          type="button"
                          onClick={() => setVagaCargo(sug)}
                          className="text-[10px] bg-slate-100 dark:bg-slate-800 hover:bg-purple-100 dark:hover:bg-purple-900/40 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
                        >
                          + {sug}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                      Tipo de Contratação *
                    </label>
                    <select
                      value={vagaTipo}
                      onChange={(e) => setVagaTipo(e.target.value as any)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
                    >
                      <option value="Jovem Aprendiz">Jovem Aprendiz (Lei 10.097/00 — 14 a 24 anos)</option>
                      <option value="Estagiário">Estágio (Lei 11.788/08 — Estudantes)</option>
                      <option value="Primeiro Emprego">Efetivo / Primeiro Emprego CLT</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                      Bairro ou Cidade da Vaga (Curitiba &amp; RMC) *
                    </label>
                    <select
                      value={vagaBairro}
                      onChange={(e) => setVagaBairro(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
                    >
                      {Object.keys(BAIRROS_CURITIBA).map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                      <option value="Araucária">Araucária (RMC)</option>
                      <option value="Colombo">Colombo (RMC)</option>
                      <option value="São José dos Pinhais">São José dos Pinhais (RMC)</option>
                      <option value="Campo Largo">Campo Largo (RMC)</option>
                      <option value="Fazenda Rio Grande">Fazenda Rio Grande (RMC)</option>
                      <option value="Pinhais">Pinhais (RMC)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                      Empresa Contratante
                    </label>
                    <input
                      type="text"
                      disabled
                      value={empresaFantasia}
                      className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-600 dark:text-slate-400 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                    Descrição das Atividades &amp; Dia a Dia *
                  </label>
                  <textarea
                    rows={3}
                    value={vagaDescricao}
                    onChange={(e) => setVagaDescricao(e.target.value)}
                    placeholder="Descreva as responsabilidades da vaga de forma acolhedora..."
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
                    required
                  />
                </div>

                <div className="flex justify-end pt-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>Próximo: Pré-requisitos &amp; Badges</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* PASSO 2: PRÉ-REQUISITOS INTELIGENTES & BADGES */}
            {step === 2 && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                      Badges Exigidas do SkillHub (Selecione as competências comprovadas):
                    </label>
                    <span className="text-[11px] text-purple-600 dark:text-purple-400 font-bold">
                      {vagaBadges.length} selecionadas
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                    Apenas candidatos que completaram os módulos e atingiram nota mínima nos quizzes serão destacados para a vaga.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {badges.map((b) => {
                      const isChecked = vagaBadges.includes(b.id);
                      return (
                        <button
                          type="button"
                          key={b.id}
                          onClick={() => handleToggleBadge(b.id)}
                          className={`p-3 rounded-2xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                            isChecked
                              ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-500 text-purple-900 dark:text-purple-100 font-bold shadow-sm'
                              : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-purple-300'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Award className={`w-4 h-4 ${isChecked ? 'text-purple-600 dark:text-purple-400' : 'text-slate-400'}`} />
                            <span className="line-clamp-1">{b.title}</span>
                          </div>
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                            isChecked ? 'bg-purple-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                          }`}>
                            {isChecked ? '✓' : '+'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                      Escolaridade Mínima
                    </label>
                    <select
                      value={vagaEscolaridade}
                      onChange={(e) => setVagaEscolaridade(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="Ensino Médio Cursando (ou Concluído)">Ensino Médio Cursando ou Concluído</option>
                      <option value="Ensino Médio Cursando (Obrigatório Estar Matriculado)">Ensino Médio Cursando (Obrigatório Cota)</option>
                      <option value="Técnico ou Superior Cursando">Técnico ou Superior Cursando (Estágio)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                      Turno de Disponibilidade do Aluno
                    </label>
                    <select
                      value={vagaTurno}
                      onChange={(e) => setVagaTurno(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="Manhã (Estuda à Tarde/Noite)">Manhã (Estuda à Tarde ou Noite)</option>
                      <option value="Tarde (Estuda pela Manhã)">Tarde (Estuda pela Manhã)</option>
                      <option value="Qualquer Turno (Horário Flexível)">Qualquer Turno (Flexível)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Voltar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>Próximo: Bolsa &amp; Benefícios</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* PASSO 3: BOLSA, BENEFÍCIOS & PUBLICAÇÃO NO MAPA */}
            {step === 3 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                      Bolsa / Salário Mensal (R$) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-xs text-slate-500 font-bold">R$</span>
                      <input
                        type="number"
                        value={vagaSalario}
                        onChange={(e) => setVagaSalario(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-3 pl-9 text-xs text-slate-900 dark:text-white font-bold focus:outline-none focus:border-purple-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                      Carga Horária Diária (Horas)
                    </label>
                    <select
                      value={vagaHoras}
                      onChange={(e) => setVagaHoras(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="4">4 Horas / dia (Lei da Aprendizagem)</option>
                      <option value="6">6 Horas / dia (Padrão Aprendiz e Estágio)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                      Horário de Trabalho
                    </label>
                    <input
                      type="text"
                      value={vagaHorario}
                      onChange={(e) => setVagaHorario(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="p-4 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/30 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2">
                    <Bus className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      Benefício Obrigatório de Mobilidade Urbana (Curitiba &amp; RMC):
                    </span>
                  </div>

                  <label className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={vagaVt}
                      onChange={(e) => setVagaVt(e.target.checked)}
                      className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
                    />
                    <span>
                      <strong>Vale-Transporte (VT) Integral Garantido</strong> — Integração cartões URBS e Comec Metrocard sem desconto excessivo.
                    </span>
                  </label>
                </div>

                {/* Resumo da Vaga Pré-Publicação */}
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                  <span className="font-bold text-slate-900 dark:text-white block">Resumo da Vaga:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-600 dark:text-slate-400">
                    <div>Cargo: <strong className="text-slate-900 dark:text-white block">{vagaCargo}</strong></div>
                    <div>Local: <strong className="text-slate-900 dark:text-white block">{vagaBairro}</strong></div>
                    <div>Bolsa: <strong className="text-emerald-600 dark:text-emerald-400 block">R$ {vagaSalario}</strong></div>
                    <div>Carga: <strong className="text-slate-900 dark:text-white block">{vagaHoras}h/dia</strong></div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Voltar</span>
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-purple-600/30 flex items-center gap-2 cursor-pointer transform hover:scale-[1.02]"
                  >
                    <span>🚀 Publicar Vaga no Mapa da RMC</span>
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ABA 2: BUSCA ATIVA POR BAIRRO & BADGES (COM DADOS LGPD MASCARADOS)        */}
      {/* ========================================================================= */}
      {activeTab === 'BUSCA_ATIVA' && (
        <div className="space-y-5 animate-fadeIn">
          
          {/* Barra de Filtros Refinados */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-purple-500/20 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Filtros de Proximidade &amp; Competências
                </h3>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Mostrando <strong className="text-purple-600 dark:text-purple-400">{filteredCandidates.length}</strong> candidatos qualificados
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                  Filtrar por Bairro / Região:
                </label>
                <select
                  value={filtroBairro}
                  onChange={(e) => setFiltroBairro(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white rounded-xl p-2.5 focus:outline-none focus:border-purple-500"
                >
                  <option value="TODOS">Todos os Bairros &amp; RMC</option>
                  <option value="CIC">CIC (Cidade Industrial)</option>
                  <option value="Portão">Portão</option>
                  <option value="Pinheirinho">Pinheirinho</option>
                  <option value="Boqueirão">Boqueirão</option>
                  <option value="Batel">Batel</option>
                  <option value="Colombo">Colombo (RMC)</option>
                  <option value="Araucária">Araucária (RMC)</option>
                  <option value="São José dos Pinhais">São José dos Pinhais (RMC)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                  Filtrar por Badge de Destaque:
                </label>
                <select
                  value={filtroBadge}
                  onChange={(e) => setFiltroBadge(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white rounded-xl p-2.5 focus:outline-none focus:border-purple-500"
                >
                  <option value="TODOS">Todas as Badges Validadas</option>
                  <option value="Atendimento">Atendimento ao Cliente</option>
                  <option value="Office">Pacote Office &amp; Excel</option>
                  <option value="Comunicação">Comunicação Assertiva</option>
                  <option value="Rotinas">Rotinas Administrativas</option>
                  <option value="Logística">Logística Básica</option>
                  <option value="Segurança">Segurança no Trabalho</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                  Modalidade Desejada:
                </label>
                <select
                  value={filtroModalidade}
                  onChange={(e) => setFiltroModalidade(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white rounded-xl p-2.5 focus:outline-none focus:border-purple-500"
                >
                  <option value="TODOS">Todos (Aprendiz &amp; Estágio)</option>
                  <option value="Jovem Aprendiz">Apenas Jovem Aprendiz</option>
                  <option value="Estagiário">Apenas Estagiário</option>
                </select>
              </div>
            </div>
          </div>

          {/* Cards de Candidatos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCandidates.map((cand) => (
              <div
                key={cand.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-purple-500/20 rounded-3xl p-5 shadow-sm space-y-4 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-500/40 flex items-center justify-center text-purple-700 dark:text-purple-300 font-extrabold text-sm shrink-0">
                        {cand.iniciais}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {cand.nomeMascarado}
                          </h4>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400">
                            • {cand.idade} anos
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                          <span>Bairro: <strong className="text-slate-900 dark:text-slate-200">{cand.bairro}</strong> ({cand.regiao})</span>
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30 px-2.5 py-1 rounded-full font-bold shrink-0">
                      {cand.modalidade}
                    </span>
                  </div>

                  {/* Informação de Acesso e Ônibus */}
                  <div className="mt-3 p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-2">
                    <Bus className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <div>
                      <span><strong>Rota URBS/Comec:</strong> {cand.rotaOnibus}</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold block text-[10px]">
                        ⚡ {cand.tempoDeslocamento}
                      </span>
                    </div>
                  </div>

                  {/* Badges Validadas */}
                  <div className="mt-3 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Badges de Competência Conquistadas:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cand.badges.map((b, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 text-[11px] bg-purple-50 dark:bg-purple-950/50 text-purple-800 dark:text-purple-200 border border-purple-200 dark:border-purple-500/30 px-2 py-0.5 rounded-lg"
                        >
                          <Award className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                          <span>{b.title}</span>
                          <strong className="text-[10px] text-purple-700 dark:text-purple-300 font-mono">({b.score}%)</strong>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer do Card com Proteção LGPD & Ação de Convite */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Lock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Dados protegidos pela LGPD</span>
                  </div>

                  {cand.conviteEnviado ? (
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 px-3 py-1.5 rounded-xl font-bold">
                      <Check className="w-3.5 h-3.5" /> Convite Enviado!
                    </span>
                  ) : (
                    <button
                      onClick={() => setSelectedCandidateForInvite(cand)}
                      className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>✉️ Enviar Convite de Entrevista</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ABA 3: MINHAS VAGAS & CANDIDATURAS (KANBAN)                               */}
      {/* ========================================================================= */}
      {activeTab === 'KANBAN' && (
        <div className="space-y-5 animate-fadeIn">
          
          {/* Header do Kanban */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-purple-500/20 rounded-3xl p-5 shadow-sm">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Gestão Visual de Candidaturas (Funil de Contratação)</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Acompanhe os jovens inscritos nas vagas de {empresaFantasia} e agende entrevistas com 1 clique.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('PUBLICAR_VAGA')}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Nova Vaga</span>
            </button>
          </div>

          {/* Grid do Funil Kanban (3 Colunas) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* COLUNA 1: INSCRITOS */}
            <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Inscritos ({kanbanItems.filter((i) => i.status === 'INSCRITO').length})
                  </h4>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold">Triagem Inicial</span>
              </div>

              <div className="space-y-3">
                {kanbanItems
                  .filter((item) => item.status === 'INSCRITO')
                  .map((item) => (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-purple-500/15 rounded-2xl p-4 shadow-sm space-y-2.5 hover:border-purple-300 transition-all"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <span className="text-xs font-bold text-slate-900 dark:text-white block">
                            {item.nomeMascarado}
                          </span>
                          <span className="text-[11px] text-purple-600 dark:text-purple-400 font-medium">
                            {item.vagaTitulo}
                          </span>
                        </div>
                        <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                          {item.compatibilidade}% match
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-purple-500" />
                          <span>{item.bairro}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Bus className="w-3 h-3 text-emerald-500" />
                          <span>{item.rotaOnibus}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                        <button
                          onClick={() => handleMoveKanban(item.id, 'PRE_SELECIONADO')}
                          className="text-[11px] font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center gap-1 cursor-pointer"
                        >
                          <span>Mover para Pré-Seleção</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* COLUNA 2: PRÉ-SELECIONADOS */}
            <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Pré-Selecionados ({kanbanItems.filter((i) => i.status === 'PRE_SELECIONADO').length})
                  </h4>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold">Perfil Validado</span>
              </div>

              <div className="space-y-3">
                {kanbanItems
                  .filter((item) => item.status === 'PRE_SELECIONADO')
                  .map((item) => (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-purple-500/15 rounded-2xl p-4 shadow-sm space-y-2.5 hover:border-purple-300 transition-all"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <span className="text-xs font-bold text-slate-900 dark:text-white block">
                            {item.nomeMascarado}
                          </span>
                          <span className="text-[11px] text-purple-600 dark:text-purple-400 font-medium">
                            {item.vagaTitulo}
                          </span>
                        </div>
                        <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                          {item.compatibilidade}% match
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-purple-500" />
                          <span>{item.bairro}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Bus className="w-3 h-3 text-emerald-500" />
                          <span>{item.rotaOnibus}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                        <button
                          onClick={() => handleMoveKanban(item.id, 'INSCRITO')}
                          className="text-[10px] text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          ← Voltar
                        </button>
                        <button
                          onClick={() => handleMoveKanban(item.id, 'ENTREVISTA_AGENDADA')}
                          className="text-[11px] font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center gap-1 cursor-pointer"
                        >
                          <span>📅 Agendar Entrevista</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* COLUNA 3: ENTREVISTA AGENDADA */}
            <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Entrevista Agendada ({kanbanItems.filter((i) => i.status === 'ENTREVISTA_AGENDADA').length})
                  </h4>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold">Etapa Final</span>
              </div>

              <div className="space-y-3">
                {kanbanItems
                  .filter((item) => item.status === 'ENTREVISTA_AGENDADA')
                  .map((item) => (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-slate-900 border border-emerald-300/60 dark:border-emerald-500/30 rounded-2xl p-4 shadow-sm space-y-2.5 transition-all"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <span className="text-xs font-bold text-slate-900 dark:text-white block">
                            {item.nomeMascarado}
                          </span>
                          <span className="text-[11px] text-purple-600 dark:text-purple-400 font-medium">
                            {item.vagaTitulo}
                          </span>
                        </div>
                        <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                          Entrevista
                        </span>
                      </div>

                      <div className="bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-500/20 text-[11px] text-emerald-800 dark:text-emerald-300 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold">
                          <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Data: {item.dataEntrevista || '26/10/2026'} às {item.horarioEntrevista || '14:30'}</span>
                        </div>
                        <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block">
                          📍 Sede {empresaBairro} ou Google Meet
                        </span>
                      </div>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                        <button
                          onClick={() => handleMoveKanban(item.id, 'PRE_SELECIONADO')}
                          className="text-[10px] text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          ← Voltar
                        </button>
                        <button
                          onClick={() => showToast('Contratação Registrada!', `Parabéns pela contratação de ${item.nomeMascarado}!`, 'success')}
                          className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Aprovar Contratação</span>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ABA 4: PERFIL DA MARCA EMPREGADORA                                        */}
      {/* ========================================================================= */}
      {activeTab === 'MARCA_EMPREGADORA' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-fadeIn transition-colors duration-300">
          
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span>Perfil da Marca Empregadora (Employer Branding)</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Personalize a forma como os jovens de Curitiba e RMC enxergam a cultura e os diferenciais da sua organização.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LADO ESQUERDO: Visualização / Card da Marca (5 Colunas) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 text-center">
                
                {/* Logo da Empresa */}
                <div className="relative w-24 h-24 mx-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-purple-500/30 p-3 shadow-md flex items-center justify-center">
                  <img
                    src={marcaLogoUrl}
                    alt={empresaFantasia}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {empresaFantasia}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {empresaRazao} • Sede {empresaBairro}
                  </p>
                </div>

                {/* Selo Oficial de Empresa Parceira */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-purple-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 px-3 py-1.5 rounded-full text-xs font-bold">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Empresa Amiga da Juventude Curitibana 2026</span>
                </div>

                <div className="text-left text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 leading-relaxed">
                  <strong className="text-slate-900 dark:text-white block mb-1">Nosso Propósito:</strong>
                  {marcaDescricao}
                </div>
              </div>
            </div>

            {/* LADO DIREITO: Formulário de Edição da Marca (7 Colunas) */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                  Descrição da Cultura da Empresa &amp; Mentoria Jovem
                </label>
                <textarea
                  rows={4}
                  value={marcaDescricao}
                  onChange={(e) => setMarcaDescricao(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-2xl p-3.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors leading-relaxed"
                  placeholder="Conte um pouco sobre o ambiente, mentoria e valores da empresa..."
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                  Benefícios Oferecidos aos Estagiários e Aprendizes
                </label>
                <textarea
                  rows={3}
                  value={marcaBeneficiosTexto}
                  onChange={(e) => setMarcaBeneficiosTexto(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-2xl p-3.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors leading-relaxed"
                  placeholder="Liste os diferenciais como VT integral, horários flexíveis para provas, mentoria..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/20 rounded-2xl text-xs text-purple-900 dark:text-purple-200 flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                  <span>Mentores de Carreira Cadastrados</span>
                </div>
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>100% em Conformidade com o MTE</span>
                </div>
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => showToast('Perfil Atualizado!', 'As informações da Marca Empregadora foram salvas com sucesso.', 'success')}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <BookmarkCheck className="w-4 h-4" />
                  <span>Salvar Alterações da Marca</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL DE CADASTRO RÁPIDO & VALIDAÇÃO DE CNPJ                             */}
      {/* ========================================================================= */}
      {showEditCompanyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Cadastro Rápido &amp; Homologação de CNPJ
                </h3>
              </div>
              <button
                onClick={() => setShowEditCompanyModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white font-bold text-sm cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Digite o CNPJ da empresa para busca automática e validação cadastral na Receita Federal.
            </p>

            {/* Demos Rápidos de CNPJ de Curitiba */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block">
                Ou selecione uma empresa de Curitiba para teste rápido:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {DEMO_COMPANIES_CURITIBA.map((comp) => (
                  <button
                    key={comp.cnpj}
                    type="button"
                    onClick={() => handleValidateCnpj(comp.cnpj)}
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-left hover:border-purple-500 text-xs transition-colors cursor-pointer"
                  >
                    <strong className="text-slate-900 dark:text-white block truncate">{comp.nomeFantasia}</strong>
                    <span className="text-[10px] text-slate-400 font-mono block">{comp.cnpj} • {comp.bairro}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                  Número do CNPJ *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={empresaCnpj}
                    onChange={(e) => setEmpresaCnpj(e.target.value)}
                    placeholder="00.000.000/0001-00"
                    className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white font-mono focus:outline-none focus:border-purple-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleValidateCnpj(empresaCnpj)}
                    className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-all cursor-pointer shadow-sm"
                  >
                    Validar CNPJ
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Nome Fantasia
                  </label>
                  <input
                    type="text"
                    value={empresaFantasia}
                    onChange={(e) => setEmpresaFantasia(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Bairro da Sede em Curitiba
                  </label>
                  <select
                    value={empresaBairro}
                    onChange={(e) => setEmpresaBairro(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white"
                  >
                    {Object.keys(BAIRROS_CURITIBA).map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                    <option value="Araucária">Araucária (RMC)</option>
                    <option value="Colombo">Colombo (RMC)</option>
                    <option value="São José dos Pinhais">São José dos Pinhais (RMC)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                  Porte da Empresa
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['Startup', 'Pequena Empresa', 'Média Empresa', 'Grande Empresa'] as const).map((porte) => (
                    <button
                      key={porte}
                      type="button"
                      onClick={() => setEmpresaPorte(porte)}
                      className={`p-2 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                        empresaPorte === porte
                          ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-500 text-purple-700 dark:text-purple-300'
                          : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {porte}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowEditCompanyModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs font-bold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCnpjValidado(true);
                  showToast('Dados Salvos', 'Empresa pronta para anunciar vagas e buscar jovens!', 'success');
                  setShowEditCompanyModal(false);
                }}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold cursor-pointer shadow-sm"
              >
                Confirmar Dados da Empresa
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL DE ENVIO DE CONVITE DE ENTREVISTA                                    */}
      {/* ========================================================================= */}
      {selectedCandidateForInvite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Enviar Convite de Entrevista
                </h3>
              </div>
              <button
                onClick={() => setSelectedCandidateForInvite(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white font-bold text-sm cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-2xl border border-purple-200 dark:border-purple-500/20 text-xs text-slate-700 dark:text-slate-300">
              Você está convidando <strong className="text-slate-900 dark:text-white">{selectedCandidateForInvite.nomeMascarado}</strong> ({selectedCandidateForInvite.idade} anos, Bairro {selectedCandidateForInvite.bairro}).
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                  Vaga de Interesse da Sua Empresa:
                </label>
                <select
                  value={inviteVagaSelect}
                  onChange={(e) => setInviteVagaSelect(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white"
                >
                  <option value="Jovem Aprendiz Administrativo - CIC">Jovem Aprendiz Administrativo - CIC</option>
                  <option value="Estagiário de RH & Gente - Curitiba">Estagiário de RH &amp; Gente - Curitiba</option>
                  <option value="Jovem Aprendiz Logística - Pinheirinho">Jovem Aprendiz Logística - Pinheirinho</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Data Sugerida
                  </label>
                  <input
                    type="date"
                    value={inviteDate}
                    onChange={(e) => setInviteDate(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Horário Sugerido
                  </label>
                  <input
                    type="time"
                    value={inviteTime}
                    onChange={(e) => setInviteTime(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedCandidateForInvite(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs font-bold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSendInterviewInvite}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold cursor-pointer shadow-sm flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Confirmar e Enviar Convite</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
