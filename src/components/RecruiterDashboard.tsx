'use client';

import React, { useState, useMemo } from 'react';
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
  GraduationCap,
  HeartHandshake,
  Download,
  FileSpreadsheet,
  Edit3,
  Trash2,
  X,
  MessageSquare,
  CheckCircle,
  TrendingUp,
  UserPlus,
  Building,
  BookmarkCheck,
  Star,
  FileText
} from 'lucide-react';

// Tipos para o Kanban ATS de Candidaturas (4 Etapas)
export type KanbanStage = 'TRIAGEM' | 'ENTREVISTA' | 'TESTE_GESTOR' | 'CONTRATADO';

export interface KanbanCandidate {
  id: string;
  nomeMascarado: string;
  nomeCompleto?: string;
  idade: number;
  bairro: string;
  cidade?: string;
  escolaridade: string;
  rotaOnibus: string;
  compatibilidade: number;
  vagaTitulo: string;
  status: KanbanStage;
  badgesPrincipais: string[];
  anotacoes?: string;
  dataEntrevista?: string;
  horarioEntrevista?: string;
  reprovado?: boolean;
}

// Candidatos Mockados da Busca Ativa (LGPD)
export interface ActiveSearchCandidate {
  id: string;
  nomeMascarado: string;
  nomeCompleto: string;
  iniciais: string;
  idade: number;
  bairro: string;
  cidade: string;
  regiao: string;
  modalidade: 'Jovem Aprendiz' | 'Estagiário' | 'Ambos';
  escolaridade: string;
  turnoEscola: string;
  disponibilidade: string;
  rotaOnibus: string;
  tempoDeslocamento: string;
  scoreMatch: number;
  assiduidade: number;
  bio: string;
  badges: { title: string; score: number; code: string }[];
  conviteEnviado: boolean;
}

// 10 Perfis Realistas de Jovens de Curitiba & RMC
const REALISTIC_CANDIDATES_RMC: ActiveSearchCandidate[] = [
  {
    id: 'cand-01',
    nomeMascarado: 'Lucas S. O.',
    nomeCompleto: 'Lucas Silva Oliveira',
    iniciais: 'LO',
    idade: 17,
    bairro: 'CIC',
    cidade: 'Curitiba',
    regiao: 'Curitiba Sul',
    modalidade: 'Jovem Aprendiz',
    escolaridade: 'Ensino Médio (2º Ano — Colégio CEP)',
    turnoEscola: 'Noite',
    disponibilidade: 'Manhã ou Tarde (Imediata)',
    rotaOnibus: 'Expresso Pinheirinho/CIC e Linha 040 Interbairros II',
    tempoDeslocamento: '15 min via Terminal CIC',
    scoreMatch: 97,
    assiduidade: 99.2,
    bio: 'Jovem pontual, com facilidade para aprender rotinas administrativas e planilhas de estoque. Completou 4 trilhas na SkillHub com notas superiores a 85%.',
    badges: [
      { title: 'Excel & Ferramentas Digitais', score: 96, code: 'SKH-EXC-9642' },
      { title: 'Atendimento ao Cliente & Experiência', score: 94, code: 'SKH-ATD-8821' },
      { title: 'Comunicação Corporativa & Assertividade', score: 91, code: 'SKH-COM-7743' },
      { title: 'Gestão do Tempo & Foco', score: 88, code: 'SKH-TMP-6629' }
    ],
    conviteEnviado: false
  },
  {
    id: 'cand-02',
    nomeMascarado: 'Beatriz M. R.',
    nomeCompleto: 'Beatriz Mendes Rocha',
    iniciais: 'BR',
    idade: 18,
    bairro: 'Portão',
    cidade: 'Curitiba',
    regiao: 'Curitiba Central/Sul',
    modalidade: 'Estagiário',
    escolaridade: 'Técnico em Administração (IFPR Curitiba)',
    turnoEscola: 'Manhã',
    disponibilidade: 'Tarde (13:00 às 19:00)',
    rotaOnibus: 'Ligeirão Portão/Tamandaré e Ligeirinho Santa Cândida',
    tempoDeslocamento: '12 min direto',
    scoreMatch: 98,
    assiduidade: 98.6,
    bio: 'Estudante de administração com foco em RH, recrutamento e rotinas de departamento pessoal. Excelente redação corporativa e organização de arquivos.',
    badges: [
      { title: 'Rotinas Administrativas & Documentação', score: 98, code: 'SKH-ADM-9921' },
      { title: 'Excel & Ferramentas Digitais', score: 95, code: 'SKH-EXC-9512' },
      { title: 'Ética Profissional & Responsabilidade', score: 92, code: 'SKH-ETC-9204' }
    ],
    conviteEnviado: false
  },
  {
    id: 'cand-03',
    nomeMascarado: 'Matheus K. P.',
    nomeCompleto: 'Matheus Kauan Pereira',
    iniciais: 'MP',
    idade: 17,
    bairro: 'Pinheirinho',
    cidade: 'Curitiba',
    regiao: 'Curitiba Sul',
    modalidade: 'Jovem Aprendiz',
    escolaridade: 'Ensino Médio (3º Ano)',
    turnoEscola: 'Manhã',
    disponibilidade: 'Tarde (13:30 às 17:30)',
    rotaOnibus: 'Ligeirão Pinheirinho / Carlos Gomes e Linha Verde Sul',
    tempoDeslocamento: '18 min via Terminal Pinheirinho',
    scoreMatch: 93,
    assiduidade: 97.9,
    bio: 'Interesse prático em logística, almoxarifado, expedição e conferência de materiais. Conhecimento em metodologia 5S e segurança do trabalho.',
    badges: [
      { title: 'Logística Básica & Estoque', score: 94, code: 'SKH-LOG-9411' },
      { title: 'Segurança no Trabalho & 5S', score: 91, code: 'SKH-SEG-9132' },
      { title: 'Excel & Ferramentas Digitais', score: 86, code: 'SKH-EXC-8640' }
    ],
    conviteEnviado: false
  },
  {
    id: 'cand-04',
    nomeMascarado: 'Camila V. S.',
    nomeCompleto: 'Camila Vitória Santos',
    iniciais: 'CS',
    idade: 19,
    bairro: 'Colombo',
    cidade: 'Colombo (RMC)',
    regiao: 'RMC Norte',
    modalidade: 'Estagiário',
    escolaridade: 'Superior em Marketing / Publicidade (2º Período)',
    turnoEscola: 'Noite',
    disponibilidade: 'Manhã ou Tarde',
    rotaOnibus: 'Ligeirinho Colombo/CIC e Maracanã/Guadalupe (Comec)',
    tempoDeslocamento: '25 min via integração Comec',
    scoreMatch: 95,
    assiduidade: 96.8,
    bio: 'Proativa, comunicativa, com experiência em redação para mídias sociais, suporte ao cliente via WhatsApp e atendimento humanizado.',
    badges: [
      { title: 'Comunicação Corporativa & Assertividade', score: 96, code: 'SKH-COM-9610' },
      { title: 'Atendimento ao Cliente & Experiência', score: 93, code: 'SKH-ATD-9325' },
      { title: 'Gestão do Tempo & Foco', score: 90, code: 'SKH-TMP-9018' }
    ],
    conviteEnviado: false
  },
  {
    id: 'cand-05',
    nomeMascarado: 'Gabriel T. L.',
    nomeCompleto: 'Gabriel Torres Lima',
    iniciais: 'GL',
    idade: 18,
    bairro: 'Araucária',
    cidade: 'Araucária (RMC)',
    regiao: 'RMC Sul',
    modalidade: 'Jovem Aprendiz',
    escolaridade: 'Ensino Médio Completo',
    turnoEscola: 'Concluído',
    disponibilidade: 'Integral / Flexível',
    rotaOnibus: 'Linha Direta Araucária / Curitiba e Terminal Central',
    tempoDeslocamento: '20 min até CIC / SJP',
    scoreMatch: 94,
    assiduidade: 100,
    bio: 'Dedicado à indústria e operações. Concluiu curso preparatório na área metalmecânica e logística. Disponibilidade total para horários diurnos.',
    badges: [
      { title: 'Segurança no Trabalho & 5S', score: 95, code: 'SKH-SEG-9520' },
      { title: 'Logística Básica & Estoque', score: 92, code: 'SKH-LOG-9280' },
      { title: 'Ética Profissional & Responsabilidade', score: 89, code: 'SKH-ETC-8910' }
    ],
    conviteEnviado: false
  },
  {
    id: 'cand-06',
    nomeMascarado: 'Juliana F. B.',
    nomeCompleto: 'Juliana Fernandes Barbosa',
    iniciais: 'JB',
    idade: 17,
    bairro: 'Boqueirão',
    cidade: 'Curitiba',
    regiao: 'Curitiba Leste',
    modalidade: 'Jovem Aprendiz',
    escolaridade: 'Ensino Médio (2º Ano)',
    turnoEscola: 'Manhã',
    disponibilidade: 'Tarde (13:00 às 17:00)',
    rotaOnibus: 'Expresso Boqueirão / Rui Barbosa e Linha 502 Circular Sul',
    tempoDeslocamento: '16 min via Terminal Boqueirão',
    scoreMatch: 96,
    assiduidade: 99.4,
    bio: 'Habilidade comprovada em atendimento ao público, conferência de relatórios e recepção. Organizada, comunicativa e pontual.',
    badges: [
      { title: 'Atendimento ao Cliente & Experiência', score: 97, code: 'SKH-ATD-9730' },
      { title: 'Comunicação Corporativa & Assertividade', score: 94, code: 'SKH-COM-9402' },
      { title: 'Excel & Ferramentas Digitais', score: 89, code: 'SKH-EXC-8921' }
    ],
    conviteEnviado: false
  },
  {
    id: 'cand-07',
    nomeMascarado: 'Enzo R. S.',
    nomeCompleto: 'Enzo Rafael Siqueira',
    iniciais: 'ES',
    idade: 16,
    bairro: 'Fazenda Rio Grande',
    cidade: 'Fazenda Rio Grande (RMC)',
    regiao: 'RMC Sul',
    modalidade: 'Jovem Aprendiz',
    escolaridade: 'Ensino Médio (1º Ano)',
    turnoEscola: 'Manhã',
    disponibilidade: 'Tarde (13:30 às 17:30)',
    rotaOnibus: 'Ligeirinho Fazenda Rio Grande / Pinheirinho',
    tempoDeslocamento: '22 min via Linha Direta',
    scoreMatch: 91,
    assiduidade: 96.5,
    bio: 'Buscando primeira oportunidade profissional pelo programa Jovem Aprendiz. Muita vontade de aprender rotinas de escritório e informática.',
    badges: [
      { title: 'Excel & Ferramentas Digitais', score: 92, code: 'SKH-EXC-9201' },
      { title: 'Gestão do Tempo & Foco', score: 88, code: 'SKH-TMP-8850' },
      { title: 'Ética Profissional & Responsabilidade', score: 86, code: 'SKH-ETC-8630' }
    ],
    conviteEnviado: false
  },
  {
    id: 'cand-08',
    nomeMascarado: 'Larissa P. N.',
    nomeCompleto: 'Larissa Prado Nogueira',
    iniciais: 'LN',
    idade: 18,
    bairro: 'São José dos Pinhais',
    cidade: 'São José dos Pinhais (RMC)',
    regiao: 'RMC Leste / Aeroporto',
    modalidade: 'Ambos',
    escolaridade: 'Técnico em Logística Integrada (SENAI SJP)',
    turnoEscola: 'Noite',
    disponibilidade: 'Manhã ou Tarde',
    rotaOnibus: 'Ligeirinho Aeroporto / Curitiba e Linha São José / Boqueirão',
    tempoDeslocamento: '10 min até o Polo Automotivo',
    scoreMatch: 99,
    assiduidade: 99.8,
    bio: 'Especialista jovem em cadeia de suprimentos e organização de inventários. Moradora de SJP próxima ao Complexo Ayrton Senna e Parque da Fonte.',
    badges: [
      { title: 'Logística Básica & Estoque', score: 99, code: 'SKH-LOG-9910' },
      { title: 'Excel & Ferramentas Digitais', score: 96, code: 'SKH-EXC-9640' },
      { title: 'Rotinas Administrativas & Documentação', score: 95, code: 'SKH-ADM-9530' }
    ],
    conviteEnviado: false
  },
  {
    id: 'cand-09',
    nomeMascarado: 'Felipe A. R.',
    nomeCompleto: 'Felipe Augusto Ramos',
    iniciais: 'FR',
    idade: 19,
    bairro: 'Cajuru',
    cidade: 'Curitiba',
    regiao: 'Curitiba Leste',
    modalidade: 'Estagiário',
    escolaridade: 'Superior em Ciência da Computação (UFPR - 1º Ano)',
    turnoEscola: 'Tarde',
    disponibilidade: 'Manhã (08:00 às 12:00)',
    rotaOnibus: 'Expresso Centenário / Campo Comprido e Interbairros III',
    tempoDeslocamento: '18 min via Terminal Capão da Imbuia',
    scoreMatch: 94,
    assiduidade: 98.1,
    bio: 'Foco em suporte a sistemas internos, TI corporativa, automação em Excel/VBA e organização de chamados de atendimento técnico.',
    badges: [
      { title: 'Excel & Ferramentas Digitais', score: 98, code: 'SKH-EXC-9801' },
      { title: 'Comunicação Corporativa & Assertividade', score: 90, code: 'SKH-COM-9015' },
      { title: 'Ética Profissional & Responsabilidade', score: 91, code: 'SKH-ETC-9120' }
    ],
    conviteEnviado: false
  },
  {
    id: 'cand-10',
    nomeMascarado: 'Yasmin C. B.',
    nomeCompleto: 'Yasmin Caroline Becker',
    iniciais: 'YB',
    idade: 17,
    bairro: 'Pinhais',
    cidade: 'Pinhais (RMC)',
    regiao: 'RMC Leste',
    modalidade: 'Jovem Aprendiz',
    escolaridade: 'Ensino Médio (3º Ano)',
    turnoEscola: 'Manhã',
    disponibilidade: 'Tarde (13:00 às 17:00)',
    rotaOnibus: 'Ligeirinho Pinhais / Campo Comprido e Linha Direta Comec',
    tempoDeslocamento: '14 min via Terminal Pinhais',
    scoreMatch: 95,
    assiduidade: 99.1,
    bio: 'Excelente relacionamento interpessoal, dicção clara e entusiasmo para atuar em recepção, teleatendimento ou apoio à equipe de vendas.',
    badges: [
      { title: 'Atendimento ao Cliente & Experiência', score: 96, code: 'SKH-ATD-9615' },
      { title: 'Comunicação Corporativa & Assertividade', score: 93, code: 'SKH-COM-9340' },
      { title: 'Rotinas Administrativas & Documentação', score: 89, code: 'SKH-ADM-8910' }
    ],
    conviteEnviado: false
  }
];

// Empresas de Referência Reais de Curitiba & RMC para Preset
export interface CompanyPreset {
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  bairro: string;
  cidade: string;
  porte: 'Startup' | 'Pequena Empresa' | 'Média Empresa' | 'Grande Empresa';
  ramo: string;
  responsavelRH: string;
  emailCorporativo: string;
  cotaAprendizagem: string;
  cotaPCD: string;
  logoUrl?: string;
  siteUrl?: string;
}

const REAL_COMPANIES_RMC: CompanyPreset[] = [
  {
    cnpj: '00.913.443/0001-73',
    razaoSocial: 'Renault do Brasil S.A.',
    nomeFantasia: 'Renault do Brasil — Complexo Ayrton Senna',
    bairro: 'Complexo Industrial Ayrton Senna',
    cidade: 'São José dos Pinhais (RMC)',
    porte: 'Grande Empresa',
    ramo: 'Indústria Automobilística, Logística & Inovação',
    responsavelRH: 'Juliana Silveira — Gerente de Atração & Diversidade',
    emailCorporativo: 'rh.talentos@renault.com.br',
    cotaAprendizagem: 'Conforme Lei 10.097/00 (7.4% do quadro preenchido)',
    cotaPCD: 'Conforme Lei 8.213/91 (5.2% do quadro)',
    siteUrl: 'https://www.renault.com.br'
  },
  {
    cnpj: '11.137.051/0001-86',
    razaoSocial: 'Grupo Boticário Negócios S.A.',
    nomeFantasia: 'Grupo Boticário',
    bairro: 'Parque da Fonte',
    cidade: 'São José dos Pinhais (RMC)',
    porte: 'Grande Empresa',
    ramo: 'Cosméticos, Beleza, Varejo & E-commerce',
    responsavelRH: 'Mariana Duarte — Coordenadora de Talentos Jovens',
    emailCorporativo: 'gente.cultura@grupoboticario.com.br',
    cotaAprendizagem: 'Conforme Lei 10.097/00 (8.1% do quadro preenchido)',
    cotaPCD: 'Conforme Lei 8.213/91 (5.5% do quadro)',
    siteUrl: 'https://www.grupoboticario.com.br'
  },
  {
    cnpj: '76.487.032/0001-25',
    razaoSocial: 'Electrolux do Brasil S.A.',
    nomeFantasia: 'Electrolux Group Brasil',
    bairro: 'Guaíra',
    cidade: 'Curitiba',
    porte: 'Grande Empresa',
    ramo: 'Eletrodomésticos, Manufatura & Sustentabilidade',
    responsavelRH: 'Carlos Eduardo Lima — BP de Recursos Humanos',
    emailCorporativo: 'talentos.pr@electrolux.com',
    cotaAprendizagem: 'Conforme Lei 10.097/00 (6.8% do quadro preenchido)',
    cotaPCD: 'Conforme Lei 8.213/91 (5.1% do quadro)',
    siteUrl: 'https://www.electrolux.com.br'
  },
  {
    cnpj: '02.438.455/0001-76',
    razaoSocial: 'Positivo Tecnologia S.A.',
    nomeFantasia: 'Positivo Tecnologia',
    bairro: 'CIC',
    cidade: 'Curitiba',
    porte: 'Grande Empresa',
    ramo: 'Tecnologia da Informação, Hardware & EdTech',
    responsavelRH: 'Renata Zanin — Especialista em D&I e Início de Carreira',
    emailCorporativo: 'oportunidades@positivo.com.br',
    cotaAprendizagem: 'Conforme Lei 10.097/00 (7.0% do quadro preenchido)',
    cotaPCD: 'Conforme Lei 8.213/91 (5.3% do quadro)',
    siteUrl: 'https://www.positivotec.com.br'
  },
  {
    cnpj: '10.490.181/0001-35',
    razaoSocial: 'MadeiraMadeira Comércio S.A.',
    nomeFantasia: 'MadeiraMadeira Tech',
    bairro: 'Batel',
    cidade: 'Curitiba',
    porte: 'Grande Empresa',
    ramo: 'E-commerce, Logtech & Casa',
    responsavelRH: 'Vinicius Alcantara — Tech Recruiter & Estágio',
    emailCorporativo: 'carreiras@madeiramadeira.com.br',
    cotaAprendizagem: 'Conforme Lei 10.097/00 (6.2% do quadro preenchido)',
    cotaPCD: 'Conforme Lei 8.213/91 (5.0% do quadro)',
    siteUrl: 'https://www.madeiramadeira.com.br'
  }
];

export default function RecruiterDashboard() {
  const { student, vagas, badges, applications, addNewVacancy, currentUser, showToast } = useApp();

  // Abas do Gestor (apenas 4, com ícone limpo lucide-react sem emoji duplicado)
  const [activeTab, setActiveTab] = useState<'PUBLICAR_VAGA' | 'BUSCA_ATIVA' | 'KANBAN' | 'MARCA_EMPREGADORA'>('PUBLICAR_VAGA');

  // =========================================================================
  // 1. DADOS REAIS DA EMPRESA (DEFAULT: RENAULT DO BRASIL S.A.)
  // =========================================================================
  const [companyData, setCompanyData] = useState<CompanyPreset>(REAL_COMPANIES_RMC[0]);
  const [showEditCompanyModal, setShowEditCompanyModal] = useState(false);

  // Formulário de Edição do Modal
  const [editCnpj, setEditCnpj] = useState(companyData.cnpj);
  const [editRazao, setEditRazao] = useState(companyData.razaoSocial);
  const [editFantasia, setEditFantasia] = useState(companyData.nomeFantasia);
  const [editBairro, setEditBairro] = useState(companyData.bairro);
  const [editCidade, setEditCidade] = useState(companyData.cidade);
  const [editPorte, setEditPorte] = useState(companyData.porte);
  const [editRamo, setEditRamo] = useState(companyData.ramo);
  const [editResp, setEditResp] = useState(companyData.responsavelRH);
  const [editEmail, setEditEmail] = useState(companyData.emailCorporativo);
  const [editCotaAprendiz, setEditCotaAprendiz] = useState(companyData.cotaAprendizagem);
  const [editCotaPCD, setEditCotaPCD] = useState(companyData.cotaPCD);

  // =========================================================================
  // 2. ASSISTENTE DE PUBLICAÇÃO DE VAGAS EM 3 PASSOS
  // =========================================================================
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [vagaCargo, setVagaCargo] = useState('Jovem Aprendiz em Logística Industrial');
  const [vagaTipo, setVagaTipo] = useState<'Jovem Aprendiz' | 'Estagiário' | 'Primeiro Emprego'>('Jovem Aprendiz');
  const [vagaFormato, setVagaFormato] = useState<'Presencial' | 'Híbrido' | 'Remoto'>('Presencial');
  const [vagaBairro, setVagaBairro] = useState('São José dos Pinhais');
  const [vagaTurno, setVagaTurno] = useState('Manhã (08:00 às 14:00)');
  const [vagaHoras, setVagaHoras] = useState('6');
  const [vagaDescricao, setVagaDescricao] = useState(
    'Apoio nas rotinas de conferência de inventário, organização de documentos de expedição e uso do sistema de gestão integrada no Polo Automotivo de São José dos Pinhais. O aprendiz contará com mentoria técnica dedicada e formação teórica semanal.'
  );

  const [vagaBadges, setVagaBadges] = useState<string[]>([
    'Excel & Ferramentas Digitais',
    'Logística Básica & Estoque',
    'Segurança no Trabalho & 5S'
  ]);
  const [vagaEscolaridade, setVagaEscolaridade] = useState('Ensino Médio Cursando (ou Concluído)');
  const [vagaFaixaEtaria, setVagaFaixaEtaria] = useState('14 a 24 anos (Lei da Aprendizagem)');

  const [vagaSalario, setVagaSalario] = useState('1280');
  const [vagaBeneficios, setVagaBeneficios] = useState<string[]>([
    'Vale-Transporte (URBS / Comec Integral)',
    'Refeitório no Local',
    'Seguro de Vida em Grupo',
    'Plano Odontológico',
    'Trilha de Capacitação Contínua SkillHub'
  ]);

  const [publishFeedback, setPublishFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // =========================================================================
  // 3. BUSCA ATIVA DE CANDIDATOS (BANCO DE TALENTOS)
  // =========================================================================
  const [activeCandidates, setActiveCandidates] = useState<ActiveSearchCandidate[]>(REALISTIC_CANDIDATES_RMC);
  const [filtroTexto, setFiltroTexto] = useState('');
  const [filtroBairro, setFiltroBairro] = useState('TODOS');
  const [filtroBadge, setFiltroBadge] = useState('TODOS');
  const [filtroTurno, setFiltroTurno] = useState('TODOS');
  const [filtroScoreMin, setFiltroScoreMin] = useState('0');
  const [filtroModalidade, setFiltroModalidade] = useState('TODOS');

  // Modais de Visualização e Convite
  const [selectedCandidateDetail, setSelectedCandidateDetail] = useState<ActiveSearchCandidate | null>(null);
  const [selectedCandidateForInvite, setSelectedCandidateForInvite] = useState<ActiveSearchCandidate | null>(null);
  const [inviteVagaSelect, setInviteVagaSelect] = useState('Jovem Aprendiz em Logística Industrial — SJP');
  const [inviteDate, setInviteDate] = useState('2026-11-25');
  const [inviteTime, setInviteTime] = useState('14:30');
  const [inviteMensagem, setInviteMensagem] = useState(
    'Olá! Ficamos muito impressionados com as suas Badges conquistadas na SkillHub e seu perfil alinhado com nossa cultura. Gostaria de convidá-lo(a) para a etapa de entrevistas com nossa equipe de Gente & Gestão!'
  );

  // =========================================================================
  // 4. KANBAN ATS (4 COLUNAS: TRIAGEM, ENTREVISTA, TESTE, CONTRATADO)
  // =========================================================================
  const [vagaFiltroKanban, setVagaFiltroKanban] = useState<string>('TODAS');
  const [kanbanItems, setKanbanItems] = useState<KanbanCandidate[]>([
    {
      id: 'kb-1',
      nomeMascarado: 'Lucas S. O.',
      nomeCompleto: 'Lucas Silva Oliveira',
      idade: 17,
      bairro: 'CIC',
      cidade: 'Curitiba',
      escolaridade: 'Ensino Médio (2º Ano)',
      rotaOnibus: 'Expresso Pinheirinho/CIC (15 min)',
      compatibilidade: 97,
      vagaTitulo: 'Jovem Aprendiz Administrativo',
      status: 'TRIAGEM',
      badgesPrincipais: ['Excel & Ferramentas Digitais', 'Atendimento ao Cliente'],
      anotacoes: 'Excelente pontuação no quiz de Excel (96%). Perfil comunicativo e focado.'
    },
    {
      id: 'kb-2',
      nomeMascarado: 'Beatriz M. R.',
      nomeCompleto: 'Beatriz Mendes Rocha',
      idade: 18,
      bairro: 'Portão',
      cidade: 'Curitiba',
      escolaridade: 'Técnico em Administração (IFPR)',
      rotaOnibus: 'Ligeirão Portão / CIC (12 min)',
      compatibilidade: 98,
      vagaTitulo: 'Estagiário de RH & Gente',
      status: 'ENTREVISTA',
      badgesPrincipais: ['Rotinas Administrativas', 'Excel Avançado'],
      dataEntrevista: '22/11/2026',
      horarioEntrevista: '10:00',
      anotacoes: 'Entrevista marcada com a coordenadora de RH. Boa articulação verbal.'
    },
    {
      id: 'kb-3',
      nomeMascarado: 'Larissa P. N.',
      nomeCompleto: 'Larissa Prado Nogueira',
      idade: 18,
      bairro: 'São José dos Pinhais',
      cidade: 'São José dos Pinhais (RMC)',
      escolaridade: 'Técnico em Logística (SENAI SJP)',
      rotaOnibus: 'Linha Direta SJP / Aeroporto (10 min)',
      compatibilidade: 99,
      vagaTitulo: 'Jovem Aprendiz em Logística Industrial',
      status: 'TESTE_GESTOR',
      badgesPrincipais: ['Logística Básica', 'Excel & Ferramentas Digitais', '5S'],
      anotacoes: 'Aprovada com nota 9.5 no teste prático de inventário no Excel. Encaminhada ao Gestor de Logística.'
    },
    {
      id: 'kb-4',
      nomeMascarado: 'Gabriel T. L.',
      nomeCompleto: 'Gabriel Torres Lima',
      idade: 18,
      bairro: 'Araucária',
      cidade: 'Araucária (RMC)',
      escolaridade: 'Ensino Médio Completo',
      rotaOnibus: 'Linha Direta Araucária / CIC (20 min)',
      compatibilidade: 94,
      vagaTitulo: 'Jovem Aprendiz em Logística Industrial',
      status: 'CONTRATADO',
      badgesPrincipais: ['Segurança no Trabalho', 'Logística Básica'],
      anotacoes: 'Contrato assinado em 14/11/2026. Integração agendada para 01/12/2026.'
    },
    {
      id: 'kb-5',
      nomeMascarado: 'Juliana F. B.',
      nomeCompleto: 'Juliana Fernandes Barbosa',
      idade: 17,
      bairro: 'Boqueirão',
      cidade: 'Curitiba',
      escolaridade: 'Ensino Médio (2º Ano)',
      rotaOnibus: 'Circular Sul (18 min)',
      compatibilidade: 96,
      vagaTitulo: 'Jovem Aprendiz Administrativo',
      status: 'ENTREVISTA',
      badgesPrincipais: ['Atendimento ao Cliente', 'Comunicação Assertiva'],
      dataEntrevista: '24/11/2026',
      horarioEntrevista: '14:30',
      anotacoes: 'Agendada entrevista presencial no escritório regional.'
    }
  ]);

  // Modal para Adicionar Anotação / Agendar Entrevista no Kanban
  const [editingKanbanCandidate, setEditingKanbanCandidate] = useState<KanbanCandidate | null>(null);
  const [kanbanNoteInput, setKanbanNoteInput] = useState('');
  const [kanbanDateInput, setKanbanDateInput] = useState('');
  const [kanbanTimeInput, setKanbanTimeInput] = useState('');

  // =========================================================================
  // 5. PERFIL DA MARCA EMPREGADORA (EMPLOYER BRANDING)
  // =========================================================================
  const [marcaDescricao, setMarcaDescricao] = useState(
    'No Complexo Industrial Ayrton Senna da Renault do Brasil, acreditamos que investir nos jovens de Curitiba e Região Metropolitana é moldar o futuro da mobilidade sustentável e da tecnologia. Nosso programa oferece mentoria individualizada com engenheiros e líderes de projeto, incentivo aos estudos e rota real de efetivação.'
  );
  const [marcaBeneficiosTexto, setMarcaBeneficiosTexto] = useState(
    'Bolsa competitiva alinhada às melhores práticas da indústria automobilística, Vale-Transporte integral URBS/Comec com frotas dedicadas para unidades fabris, alimentação nos restaurantes internos da fábrica, seguro de vida em grupo, recesso escolar garantido em períodos de provas e acesso integral à plataforma SkillHub.'
  );
  const [marcaTaxaEfetivacao, setMarcaTaxaEfetivacao] = useState(78);
  const [marcaJovensFormados, setMarcaJovensFormados] = useState(184);

  // Lista de Vagas Ativas da Empresa para o Seletor
  const companyVacancies = useMemo(() => {
    return [
      { id: 'vaga-01', titulo: 'Jovem Aprendiz em Logística Industrial', bairro: 'São José dos Pinhais (RMC)', visualizacoes: 412, inscritos: 18, status: 'Ativa' },
      { id: 'vaga-02', titulo: 'Jovem Aprendiz Administrativo', bairro: 'CIC / Curitiba', visualizacoes: 350, inscritos: 14, status: 'Ativa' },
      { id: 'vaga-03', titulo: 'Estagiário de RH & Gente', bairro: 'São José dos Pinhais (RMC)', visualizacoes: 290, inscritos: 9, status: 'Ativa' },
      { id: 'vaga-04', titulo: 'Estagiário de Engenharia & Qualidade', bairro: 'Complexo Ayrton Senna', visualizacoes: 520, inscritos: 22, status: 'Ativa' }
    ];
  }, []);

  // Handlers do Modal de Edição da Empresa
  const handleOpenEditCompanyModal = () => {
    setEditCnpj(companyData.cnpj);
    setEditRazao(companyData.razaoSocial);
    setEditFantasia(companyData.nomeFantasia);
    setEditBairro(companyData.bairro);
    setEditCidade(companyData.cidade);
    setEditPorte(companyData.porte);
    setEditRamo(companyData.ramo);
    setEditResp(companyData.responsavelRH);
    setEditEmail(companyData.emailCorporativo);
    setEditCotaAprendiz(companyData.cotaAprendizagem);
    setEditCotaPCD(companyData.cotaPCD);
    setShowEditCompanyModal(true);
  };

  const handleApplyPreset = (preset: CompanyPreset) => {
    setEditCnpj(preset.cnpj);
    setEditRazao(preset.razaoSocial);
    setEditFantasia(preset.nomeFantasia);
    setEditBairro(preset.bairro);
    setEditCidade(preset.cidade);
    setEditPorte(preset.porte);
    setEditRamo(preset.ramo);
    setEditResp(preset.responsavelRH);
    setEditEmail(preset.emailCorporativo);
    setEditCotaAprendiz(preset.cotaAprendizagem);
    setEditCotaPCD(preset.cotaPCD);
  };

  const handleSaveCompanyData = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: CompanyPreset = {
      cnpj: editCnpj,
      razaoSocial: editRazao,
      nomeFantasia: editFantasia,
      bairro: editBairro,
      cidade: editCidade,
      porte: editPorte,
      ramo: editRamo,
      responsavelRH: editResp,
      emailCorporativo: editEmail,
      cotaAprendizagem: editCotaAprendiz,
      cotaPCD: editCotaPCD
    };
    setCompanyData(updated);
    setShowEditCompanyModal(false);
    showToast('Cadastro Atualizado!', `Dados da empresa ${editFantasia} homologados com sucesso!`, 'success');
  };

  // Toggle de Badges no Passo 2
  const handleToggleBadge = (badgeName: string) => {
    setVagaBadges((prev) =>
      prev.includes(badgeName) ? prev.filter((b) => b !== badgeName) : [...prev, badgeName]
    );
  };

  // Toggle de Benefícios no Passo 3
  const handleToggleBeneficio = (ben: string) => {
    setVagaBeneficios((prev) =>
      prev.includes(ben) ? prev.filter((b) => b !== ben) : [...prev, ben]
    );
  };

  // Publicar Nova Vaga no AppContext
  const handlePublishVacancy = (e: React.FormEvent) => {
    e.preventDefault();
    setPublishFeedback(null);

    if (!vagaCargo.trim() || !vagaDescricao.trim()) {
      setPublishFeedback({
        type: 'error',
        message: 'Por favor, preencha o título do cargo e a descrição das atividades antes de publicar.'
      });
      return;
    }

    const result = addNewVacancy({
      idEmpresa: 101,
      empresaNome: companyData.nomeFantasia || companyData.razaoSocial,
      empresaCnpjMasked: companyData.cnpj,
      titulo: vagaCargo,
      tipoVaga: vagaTipo as any,
      descricao: vagaDescricao,
      bairro: vagaBairro,
      cidade: companyData.cidade.includes('Curitiba') ? 'Curitiba' : companyData.cidade,
      remuneracao: Number(vagaSalario) || 1280,
      beneficios: vagaBeneficios,
      cargaHorariaDiaria: Number(vagaHoras) || 6,
      horario: vagaTurno,
      status: 'ATIVA',
      badgesRequeridas: vagaBadges
    });

    if (result.success) {
      setPublishFeedback({
        type: 'success',
        message: `Vaga de "${vagaCargo}" homologada e publicada com sucesso! Ela já está visível para os jovens no Mapa de Vagas da RMC.`
      });
      showToast('Vaga Publicada com Sucesso!', `A oportunidade foi adicionada ao Mapa da RMC e ao painel da ${companyData.nomeFantasia}.`, 'success');

      // Adiciona um candidato exemplo na Triagem do Kanban
      setKanbanItems((prev) => [
        {
          id: 'kb-pub-' + Date.now(),
          nomeMascarado: 'Larissa P. N.',
          nomeCompleto: 'Larissa Prado Nogueira',
          idade: 18,
          bairro: vagaBairro,
          cidade: companyData.cidade,
          escolaridade: vagaEscolaridade,
          rotaOnibus: `Transporte público direto até ${vagaBairro}`,
          compatibilidade: 98,
          vagaTitulo: vagaCargo,
          status: 'TRIAGEM',
          badgesPrincipais: vagaBadges.slice(0, 2),
          anotacoes: 'Candidatura compatível com as badges requeridas pela vaga.'
        },
        ...prev
      ]);

      setStep(1);
    } else {
      setPublishFeedback({
        type: 'error',
        message: result.message || 'Inconsistência identificada nas diretrizes da Lei da Aprendizagem ou Estágio.'
      });
    }
  };

  // Enviar Convite de Entrevista na Busca Ativa
  const handleSendInterviewInvite = () => {
    if (!selectedCandidateForInvite) return;

    setActiveCandidates((prev) =>
      prev.map((c) =>
        c.id === selectedCandidateForInvite.id ? { ...c, conviteEnviado: true } : c
      )
    );

    // Adiciona o candidato diretamente ao Kanban na coluna de Entrevista
    const newKanban: KanbanCandidate = {
      id: 'kb-inv-' + Date.now(),
      nomeMascarado: selectedCandidateForInvite.nomeMascarado,
      nomeCompleto: selectedCandidateForInvite.nomeCompleto,
      idade: selectedCandidateForInvite.idade,
      bairro: selectedCandidateForInvite.bairro,
      cidade: selectedCandidateForInvite.cidade,
      escolaridade: selectedCandidateForInvite.escolaridade,
      rotaOnibus: selectedCandidateForInvite.rotaOnibus,
      compatibilidade: selectedCandidateForInvite.scoreMatch,
      vagaTitulo: inviteVagaSelect,
      status: 'ENTREVISTA',
      badgesPrincipais: selectedCandidateForInvite.badges.slice(0, 2).map((b) => b.title),
      dataEntrevista: inviteDate.split('-').reverse().join('/'),
      horarioEntrevista: inviteTime,
      anotacoes: `Convite enviado pelo RH da ${companyData.nomeFantasia}. Mensagem: "${inviteMensagem.slice(0, 60)}..."`
    };

    setKanbanItems((prev) => [newKanban, ...prev]);

    showToast(
      'Convite de Processo Seletivo Enviado!',
      `Convite enviado para ${selectedCandidateForInvite.nomeCompleto} com notificação no painel do aluno.`,
      'success'
    );
    setSelectedCandidateForInvite(null);
  };

  // Movimentar Candidato no Funil Kanban
  const handleMoveKanban = (id: string, nextStatus: KanbanStage) => {
    setKanbanItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: nextStatus } : item))
    );
    const stageNames: Record<KanbanStage, string> = {
      TRIAGEM: 'Triagem (Match IA)',
      ENTREVISTA: 'Entrevista RH',
      TESTE_GESTOR: 'Teste Prático / Gestor',
      CONTRATADO: 'Proposta / Contratado'
    };
    showToast('Etapa Atualizada', `Candidato avançou para "${stageNames[nextStatus]}"!`, 'info');
  };

  // Reprovar Candidato no Kanban com Feedback Ético
  const handleRejectCandidate = (id: string) => {
    setKanbanItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Candidato Encaminhado', 'Candidato arquivado com feedback de incentivo para continuar estudando na SkillHub.', 'info');
  };

  // Salvar Anotação e Entrevista no Kanban
  const handleSaveKanbanDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingKanbanCandidate) return;

    setKanbanItems((prev) =>
      prev.map((item) =>
        item.id === editingKanbanCandidate.id
          ? {
              ...item,
              anotacoes: kanbanNoteInput,
              dataEntrevista: kanbanDateInput || item.dataEntrevista,
              horarioEntrevista: kanbanTimeInput || item.horarioEntrevista
            }
          : item
      )
    );
    showToast('Anotações Salvas', 'Informações internas registradas no histórico do candidato!', 'success');
    setEditingKanbanCandidate(null);
  };

  // Exportar Relatório RH em CSV Real
  const handleExportCSV = () => {
    const headers = [
      'Empresa',
      'Vaga',
      'Candidato',
      'Idade',
      'Bairro/Cidade',
      'Compatibilidade %',
      'Etapa Funil',
      'Data Entrevista',
      'Anotacoes RH'
    ];

    const rows = kanbanItems.map((item) => [
      `"${companyData.nomeFantasia}"`,
      `"${item.vagaTitulo}"`,
      `"${item.nomeCompleto || item.nomeMascarado}"`,
      item.idade,
      `"${item.bairro} - ${item.cidade || 'Curitiba'}"`,
      `"${item.compatibilidade}%"`,
      `"${item.status}"`,
      `"${item.dataEntrevista ? item.dataEntrevista + ' às ' + (item.horarioEntrevista || '') : 'Não Agendada'}"`,
      `"${(item.anotacoes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `relatorio_rh_${companyData.nomeFantasia.toLowerCase().replace(/[^a-z0-9]/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('Relatório Gerado!', 'Planilha CSV exportada com sucesso contendo todos os dados do processo.', 'success');
  };

  // Filtragem Dinâmica da Busca Ativa
  const filteredCandidates = useMemo(() => {
    return activeCandidates.filter((cand) => {
      const matchTexto = 
        !filtroTexto.trim() ||
        cand.nomeCompleto.toLowerCase().includes(filtroTexto.toLowerCase()) ||
        cand.bairro.toLowerCase().includes(filtroTexto.toLowerCase()) ||
        cand.badges.some((b) => b.title.toLowerCase().includes(filtroTexto.toLowerCase()));

      const matchBairro = filtroBairro === 'TODOS' || cand.bairro.toLowerCase() === filtroBairro.toLowerCase();
      const matchModalidade = filtroModalidade === 'TODOS' || cand.modalidade === filtroModalidade || cand.modalidade === 'Ambos';
      const matchBadge = filtroBadge === 'TODOS' || cand.badges.some((b) => b.title.toLowerCase().includes(filtroBadge.toLowerCase()));
      const matchTurno = filtroTurno === 'TODOS' || cand.turnoEscola.toLowerCase().includes(filtroTurno.toLowerCase());
      const matchScore = cand.scoreMatch >= Number(filtroScoreMin);

      return matchTexto && matchBairro && matchModalidade && matchBadge && matchTurno && matchScore;
    });
  }, [activeCandidates, filtroTexto, filtroBairro, filtroModalidade, filtroBadge, filtroTurno, filtroScoreMin]);

  // Filtragem dos Cards do Kanban pela Vaga Selecionada
  const filteredKanbanItems = useMemo(() => {
    if (vagaFiltroKanban === 'TODAS') return kanbanItems;
    return kanbanItems.filter((i) => i.vagaTitulo.toLowerCase().includes(vagaFiltroKanban.toLowerCase()));
  }, [kanbanItems, vagaFiltroKanban]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-16 transition-colors duration-300">
      
      {/* ========================================================================= */}
      {/* 1. HEADER EXECUTIVO & DADOS REAIS DA EMPRESA                              */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-purple-900/60 border border-purple-400/30 text-purple-200 text-xs font-semibold px-3 py-1 rounded-full shadow-xs">
                <Building2 className="w-3.5 h-3.5 text-purple-300" />
                <span>Painel Corporativo • Perfil do Recrutador RH</span>
              </span>
              
              <span className="inline-flex items-center gap-1.5 bg-emerald-950/70 border border-emerald-400/30 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>CNPJ Verificado na Receita Federal • Cota Lei 10.097 Regular</span>
              </span>
            </div>

            <div className="pt-1">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight flex items-center gap-3">
                <span>{companyData.nomeFantasia}</span>
              </h1>
              <p className="text-xs sm:text-sm text-purple-200/90 font-medium max-w-3xl mt-1 leading-relaxed">
                {companyData.razaoSocial} • Conectando jovens de Curitiba e RMC às melhores oportunidades de aprendizagem e estágio por proximidade e comprovação de badges.
              </p>
            </div>

            {/* Badges de Dados Reais da Empresa */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                <span>Sede / Unidade: <strong className="text-white font-bold">{companyData.cidade}</strong></span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-amber-400" />
                <span>Porte: <strong className="text-white font-bold">{companyData.porte}</strong></span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>CNPJ: <strong className="text-white font-mono">{companyData.cnpj}</strong></span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>RH: <strong className="text-white font-medium">{companyData.responsavelRH}</strong></span>
              </span>
            </div>
          </div>

          {/* Botões Executivos: Gerenciar Dados e Exportar CSV */}
          <div className="shrink-0 flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleOpenEditCompanyModal}
              className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:scale-[1.02]"
              title="Editar Razão Social, CNPJ, Cidade e Cota Legal"
            >
              <Sliders className="w-4 h-4 text-amber-300" />
              <span>Gerenciar Dados &amp; CNPJ</span>
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:scale-[1.02]"
              title="Baixar planilha CSV com os dados dos candidatos"
            >
              <Download className="w-4 h-4" />
              <span>Exportar Relatório RH (CSV)</span>
            </button>
          </div>
        </div>

        {/* Indicadores de RH (KPIs) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/10 relative z-10">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3.5 border border-white/10">
            <div className="flex items-center justify-between text-[11px] text-purple-200 font-medium">
              <span>Jovens Aptos na RMC</span>
              <Users className="w-3.5 h-3.5 text-purple-300" />
            </div>
            <span className="text-xl sm:text-2xl font-black text-white mt-1 block">+1.240</span>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3.5 border border-white/10">
            <div className="flex items-center justify-between text-[11px] text-purple-200 font-medium">
              <span>Cota Lei 10.097/00</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <span className="text-xl sm:text-2xl font-black text-emerald-400 mt-1 block">7.4% (Conforme)</span>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3.5 border border-white/10">
            <div className="flex items-center justify-between text-[11px] text-purple-200 font-medium">
              <span>Taxa de Efetivação</span>
              <TrendingUp className="w-3.5 h-3.5 text-amber-300" />
            </div>
            <span className="text-xl sm:text-2xl font-black text-amber-300 mt-1 block">{marcaTaxaEfetivacao}%</span>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3.5 border border-white/10">
            <div className="flex items-center justify-between text-[11px] text-purple-200 font-medium">
              <span>Assiduidade Escolar</span>
              <Award className="w-3.5 h-3.5 text-blue-300" />
            </div>
            <span className="text-xl sm:text-2xl font-black text-white mt-1 block">98.4%</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. BARRA DE ABAS DO GESTOR (SEM ÍCONES DUPLICADOS!)                       */}
      {/* ========================================================================= */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white dark:bg-[#120a22] border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm">
        
        {/* Aba 1: Publicar Nova Vaga */}
        <button
          type="button"
          onClick={() => setActiveTab('PUBLICAR_VAGA')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'PUBLICAR_VAGA'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>Publicar Nova Vaga</span>
        </button>

        {/* Aba 2: Busca Ativa */}
        <button
          type="button"
          onClick={() => setActiveTab('BUSCA_ATIVA')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'BUSCA_ATIVA'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Busca Ativa (Banco de Talentos)</span>
          <span className="ml-1 text-[10px] bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full font-bold">
            {activeCandidates.length}
          </span>
        </button>

        {/* Aba 3: Minhas Vagas & Candidaturas (Kanban) */}
        <button
          type="button"
          onClick={() => setActiveTab('KANBAN')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'KANBAN'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Minhas Vagas &amp; Candidaturas (Kanban)</span>
          <span className="ml-1 text-[10px] bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full font-bold">
            {kanbanItems.length}
          </span>
        </button>

        {/* Aba 4: Perfil da Marca Empregadora */}
        <button
          type="button"
          onClick={() => setActiveTab('MARCA_EMPREGADORA')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'MARCA_EMPREGADORA'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Marca Empregadora</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* ABA 1: FORMULÁRIO DE PUBLICAÇÃO DE VAGA EM 3 PASSOS                       */}
      {/* ========================================================================= */}
      {activeTab === 'PUBLICAR_VAGA' && (
        <div className="bg-white dark:bg-[#120a22] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-fadeIn transition-colors">
          
          {/* Header e Barra de Progresso dos 3 Passos */}
          <div className="border-b border-slate-100 dark:border-white/10 pb-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span>Publicar Nova Vaga no Mapa da RMC</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                  Cadastre sua oportunidade em 3 passos com vinculação automática de Badges oficiais e Validador de Lei.
                </p>
              </div>

              {/* Steps Progress */}
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-white/5 p-1 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    step === 1 ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 dark:text-zinc-400'
                  }`}
                >
                  1. Dados da Vaga
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    step === 2 ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 dark:text-zinc-400'
                  }`}
                >
                  2. Pré-requisitos &amp; Badges
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    step === 3 ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 dark:text-zinc-400'
                  }`}
                >
                  3. Bolsa &amp; Conformidade
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
                  
                  {/* Título */}
                  <div>
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                      Título do Cargo / Função *
                    </label>
                    <input
                      type="text"
                      value={vagaCargo}
                      onChange={(e) => setVagaCargo(e.target.value)}
                      placeholder="Ex: Jovem Aprendiz Administrativo, Estagiário de RH..."
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                      required
                    />
                    {/* Sugestões Rápidas */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {[
                        'Jovem Aprendiz em Logística Industrial',
                        'Jovem Aprendiz Administrativo',
                        'Estagiário de RH & Gente',
                        'Estagiário de TI & Suporte Tech',
                        'Jovem Aprendiz Atendimento & SAC'
                      ].map((sug) => (
                        <button
                          key={sug}
                          type="button"
                          onClick={() => setVagaCargo(sug)}
                          className="text-[10px] bg-slate-100 dark:bg-white/5 hover:bg-purple-100 dark:hover:bg-purple-900/40 text-slate-600 dark:text-zinc-300 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-white/10 transition-colors cursor-pointer"
                        >
                          + {sug}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Modalidade */}
                  <div>
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                      Tipo de Contratação *
                    </label>
                    <select
                      value={vagaTipo}
                      onChange={(e) => setVagaTipo(e.target.value as any)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="Jovem Aprendiz">Jovem Aprendiz (Lei 10.097/00 — 14 a 24 anos)</option>
                      <option value="Estagiário">Estágio (Lei 11.788/08 — Ensino Médio/Técnico/Superior)</option>
                      <option value="Primeiro Emprego">Primeiro Emprego CLT / Efetivo</option>
                    </select>
                  </div>

                  {/* Formato de Trabalho */}
                  <div>
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                      Formato de Atuação *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Presencial', 'Híbrido', 'Remoto'] as const).map((fmt) => (
                        <button
                          key={fmt}
                          type="button"
                          onClick={() => setVagaFormato(fmt)}
                          className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                            vagaFormato === fmt
                              ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-500 text-purple-700 dark:text-purple-300'
                              : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-zinc-400'
                          }`}
                        >
                          {fmt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Localização (Bairro / Cidade da RMC) */}
                  <div>
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                      Bairro ou Cidade da Vaga (Curitiba &amp; RMC) *
                    </label>
                    <select
                      value={vagaBairro}
                      onChange={(e) => setVagaBairro(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="São José dos Pinhais">São José dos Pinhais (RMC - Polo Automotivo)</option>
                      <option value="CIC">CIC (Cidade Industrial de Curitiba)</option>
                      <option value="Portão">Portão (Curitiba)</option>
                      <option value="Pinheirinho">Pinheirinho (Curitiba)</option>
                      <option value="Boqueirão">Boqueirão (Curitiba)</option>
                      <option value="Batel">Batel (Curitiba)</option>
                      <option value="Centro">Centro (Curitiba)</option>
                      <option value="Araucária">Araucária (RMC)</option>
                      <option value="Colombo">Colombo (RMC)</option>
                      <option value="Pinhais">Pinhais (RMC)</option>
                      <option value="Fazenda Rio Grande">Fazenda Rio Grande (RMC)</option>
                      <option value="Campo Largo">Campo Largo (RMC)</option>
                    </select>
                  </div>

                  {/* Turno e Carga */}
                  <div>
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                      Horário / Turno de Trabalho *
                    </label>
                    <input
                      type="text"
                      value={vagaTurno}
                      onChange={(e) => setVagaTurno(e.target.value)}
                      placeholder="Ex: 08:00 às 14:00 (Segunda a Sexta)"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                      Carga Horária Diária *
                    </label>
                    <select
                      value={vagaHoras}
                      onChange={(e) => setVagaHoras(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="4">4 Horas / dia (20h semanais — Lei 10.097)</option>
                      <option value="6">6 Horas / dia (30h semanais — Padrão Aprendiz e Estágio)</option>
                    </select>
                  </div>
                </div>

                {/* Descrição */}
                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                    Descrição Detalhada das Atividades &amp; Rotinas *
                  </label>
                  <textarea
                    rows={3}
                    value={vagaDescricao}
                    onChange={(e) => setVagaDescricao(e.target.value)}
                    placeholder="Descreva as responsabilidades da vaga com clareza e de forma estimulante para o jovem..."
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
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

            {/* PASSO 2: PRÉ-REQUISITOS & SELEÇÃO MULTI-TAG DE BADGES */}
            {step === 2 && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                      Badges Oficiais SkillHub Requeridas ou Desejáveis:
                    </label>
                    <span className="text-[11px] text-purple-600 dark:text-purple-400 font-bold">
                      {vagaBadges.length} badges selecionadas
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-zinc-400 mb-3">
                    Os candidatos que comprovaram conclusão dos módulos e nota superior a 70% nos quizzes oficiais terão prioridade no ranking da vaga.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {[
                      'Excel & Ferramentas Digitais',
                      'Atendimento ao Cliente, Experiência & Fidelização',
                      'Comunicação Corporativa & Assertividade',
                      'Gestão do Tempo, Foco & Conciliação',
                      'Ética Profissional & Responsabilidade',
                      'Rotinas Administrativas & Documentação',
                      'Logística Básica & Controle de Estoque',
                      'Segurança no Trabalho & Metodologia 5S'
                    ].map((badgeTitle) => {
                      const isChecked = vagaBadges.includes(badgeTitle);
                      return (
                        <button
                          type="button"
                          key={badgeTitle}
                          onClick={() => handleToggleBadge(badgeTitle)}
                          className={`p-3 rounded-2xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                            isChecked
                              ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-500 text-purple-900 dark:text-purple-100 font-bold shadow-xs'
                              : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-zinc-300 hover:border-purple-300'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Award className={`w-4 h-4 shrink-0 ${isChecked ? 'text-purple-600 dark:text-purple-400' : 'text-slate-400'}`} />
                            <span className="line-clamp-2 text-[11px]">{badgeTitle}</span>
                          </div>
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ml-1.5 ${
                            isChecked ? 'bg-purple-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                          }`}>
                            {isChecked ? '✓' : '+'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-100 dark:border-white/10">
                  <div>
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                      Escolaridade Mínima
                    </label>
                    <select
                      value={vagaEscolaridade}
                      onChange={(e) => setVagaEscolaridade(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="Ensino Médio Cursando (ou Concluído)">Ensino Médio Cursando ou Concluído</option>
                      <option value="Ensino Médio Cursando (Obrigatório Cota Lei 10.097)">Ensino Médio Cursando (Obrigatório Lei 10.097)</option>
                      <option value="Técnico em Andamento (Administração / TI / Logística)">Técnico em Andamento (ADM / TI / Logística)</option>
                      <option value="Superior Cursando (Estágio Lei 11.788)">Superior Cursando (Estágio Lei 11.788)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                      Faixa Etária Indicativa
                    </label>
                    <select
                      value={vagaFaixaEtaria}
                      onChange={(e) => setVagaFaixaEtaria(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="14 a 24 anos (Lei da Aprendizagem)">14 a 24 anos (Lei da Aprendizagem 10.097/00)</option>
                      <option value="16 a 24 anos (Recomendado)">16 a 24 anos (Recomendado para turnos vespertinos)</option>
                      <option value="16+ anos (Estágio Lei 11.788)">16+ anos (Estágio Lei 11.788/08)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-white/5 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Voltar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>Próximo: Bolsa, Benefícios &amp; Lei</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* PASSO 3: BOLSA, BENEFÍCIOS & VALIDADOR AUTOMÁTICO DE LEI */}
            {step === 3 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                      Bolsa Auxílio / Salário Mensal (R$) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-xs text-slate-500 font-bold">R$</span>
                      <input
                        type="number"
                        value={vagaSalario}
                        onChange={(e) => setVagaSalario(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 pl-9 text-xs text-slate-900 dark:text-white font-bold focus:outline-none focus:border-purple-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                      Empresa Contratante
                    </label>
                    <input
                      type="text"
                      disabled
                      value={`${companyData.nomeFantasia} (${companyData.cnpj})`}
                      className="w-full bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-600 dark:text-zinc-400 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Seleção de Benefícios */}
                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-2">
                    Benefícios Oferecidos aos Jovens:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Vale-Transporte (URBS / Comec Integral)',
                      'Refeitório no Local / Vale-Refeição',
                      'Seguro de Vida em Grupo',
                      'Plano Odontológico',
                      'Auxílio Creche',
                      'Folga no Aniversário (Day Off)',
                      'Trilha de Capacitação Contínua SkillHub'
                    ].map((ben) => {
                      const isSel = vagaBeneficios.includes(ben);
                      return (
                        <button
                          key={ben}
                          type="button"
                          onClick={() => handleToggleBeneficio(ben)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                            isSel
                              ? 'bg-purple-100 dark:bg-purple-950/80 border-purple-500 text-purple-800 dark:text-purple-200 font-bold shadow-2xs'
                              : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-zinc-400'
                          }`}
                        >
                          {isSel ? '✓ ' : '+ '} {ben}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Validador Automático de Lei (Compliance) */}
                <div className="p-4 rounded-2xl border bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300/80 dark:border-emerald-500/30 space-y-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                      Validador Automático de Conformidade Legal SkillHub
                    </span>
                  </div>

                  {vagaTipo === 'Estagiário' ? (
                    <div className="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed space-y-1">
                      <p>
                        🟢 <strong>Em Conformidade com a Lei nº 11.788/2008 (Lei do Estágio):</strong> Carga horária definida de {vagaHoras}h/dia (máximo legal permitido de 30h semanais). O estudante terá direito a recesso remunerado proporcional de 30 dias a cada ano e cobertura obrigatória por seguro contra acidentes pessoais.
                      </p>
                    </div>
                  ) : vagaTipo === 'Jovem Aprendiz' ? (
                    <div className="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed space-y-1">
                      <p>
                        🟢 <strong>Em Conformidade com a Lei nº 10.097/2000 (Lei da Aprendizagem):</strong> Carga horária de {vagaHoras}h/dia compatível com a frequência escolar. Recolhimento especial de FGTS fixado em 2%, anotação formal em Carteira de Trabalho (CTPS Digital) e validação da cota compulsória de 5% a 15% para a {companyData.nomeFantasia}.
                      </p>
                    </div>
                  ) : (
                    <div className="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed">
                      <p>
                        🟢 <strong>Em Conformidade com a Consolidação das Leis do Trabalho (CLT):</strong> Remuneração compatível com a faixa salarial regional do Paraná e garantia integral de direitos trabalhistas para primeiro emprego.
                      </p>
                    </div>
                  )}
                </div>

                {/* Resumo da Vaga */}
                <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                  <span className="font-bold text-slate-900 dark:text-white block">Resumo da Vaga Pré-Publicação:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-600 dark:text-zinc-400">
                    <div>Cargo: <strong className="text-slate-900 dark:text-white block">{vagaCargo}</strong></div>
                    <div>Local: <strong className="text-slate-900 dark:text-white block">{vagaBairro}</strong></div>
                    <div>Bolsa: <strong className="text-emerald-600 dark:text-emerald-400 block">R$ {vagaSalario}</strong></div>
                    <div>Carga: <strong className="text-slate-900 dark:text-white block">{vagaHoras}h/dia ({vagaFormato})</strong></div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-white/5 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Voltar</span>
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-purple-600/30 flex items-center gap-2 cursor-pointer transform hover:scale-[1.02]"
                  >
                    <Check className="w-4 h-4" />
                    <span>Publicar Vaga no Mapa da RMC</span>
                  </button>
                </div>
              </div>
            )}

          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ABA 2: BUSCA ATIVA POR BAIRRO & BADGES (BANCO DE TALENTOS REALISTA)       */}
      {/* ========================================================================= */}
      {activeTab === 'BUSCA_ATIVA' && (
        <div className="space-y-5 animate-fadeIn">
          
          {/* Barra de Filtros Inteligentes */}
          <div className="bg-white dark:bg-[#120a22] border border-slate-200 dark:border-white/10 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 dark:border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Banco de Talentos — Busca Ativa por Bairro &amp; Badges
                </h3>
              </div>
              <span className="text-xs text-slate-500 dark:text-zinc-400">
                Mostrando <strong className="text-purple-600 dark:text-purple-400">{filteredCandidates.length}</strong> jovens qualificados com badges validadas
              </span>
            </div>

            {/* Inputs de Filtro */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Busca por texto */}
              <div className="lg:col-span-1">
                <label className="text-[11px] font-bold text-slate-600 dark:text-zinc-400 block mb-1">
                  Buscar por Nome / Palavra:
                </label>
                <input
                  type="text"
                  value={filtroTexto}
                  onChange={(e) => setFiltroTexto(e.target.value)}
                  placeholder="Ex: Lucas, Excel, SJP..."
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white rounded-xl p-2.5 focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Filtro Bairro */}
              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-zinc-400 block mb-1">
                  Bairro ou Cidade da RMC:
                </label>
                <select
                  value={filtroBairro}
                  onChange={(e) => setFiltroBairro(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white rounded-xl p-2.5 focus:outline-none focus:border-purple-500"
                >
                  <option value="TODOS">Todos os Bairros &amp; RMC</option>
                  <option value="CIC">CIC</option>
                  <option value="Portão">Portão</option>
                  <option value="Pinheirinho">Pinheirinho</option>
                  <option value="Boqueirão">Boqueirão</option>
                  <option value="Cajuru">Cajuru</option>
                  <option value="São José dos Pinhais">São José dos Pinhais</option>
                  <option value="Colombo">Colombo</option>
                  <option value="Araucária">Araucária</option>
                  <option value="Pinhais">Pinhais</option>
                  <option value="Fazenda Rio Grande">Fazenda Rio Grande</option>
                </select>
              </div>

              {/* Filtro Badge */}
              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-zinc-400 block mb-1">
                  Badge Específica:
                </label>
                <select
                  value={filtroBadge}
                  onChange={(e) => setFiltroBadge(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white rounded-xl p-2.5 focus:outline-none focus:border-purple-500"
                >
                  <option value="TODOS">Todas as Badges</option>
                  <option value="Excel">Excel &amp; Ferramentas Digitais</option>
                  <option value="Atendimento">Atendimento ao Cliente</option>
                  <option value="Comunicação">Comunicação Corporativa</option>
                  <option value="Logística">Logística Básica</option>
                  <option value="Segurança">Segurança no Trabalho</option>
                  <option value="Rotinas">Rotinas Administrativas</option>
                  <option value="Tempo">Gestão do Tempo</option>
                </select>
              </div>

              {/* Filtro Turno */}
              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-zinc-400 block mb-1">
                  Turno Escolar:
                </label>
                <select
                  value={filtroTurno}
                  onChange={(e) => setFiltroTurno(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white rounded-xl p-2.5 focus:outline-none focus:border-purple-500"
                >
                  <option value="TODOS">Todos os Turnos</option>
                  <option value="Manhã">Manhã (Estuda de manhã)</option>
                  <option value="Noite">Noite (Livre durante o dia)</option>
                  <option value="Concluído">Ensino Médio Concluído</option>
                </select>
              </div>

              {/* Filtro Score Mínimo */}
              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-zinc-400 block mb-1">
                  Score de Match Mínimo:
                </label>
                <select
                  value={filtroScoreMin}
                  onChange={(e) => setFiltroScoreMin(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white rounded-xl p-2.5 focus:outline-none focus:border-purple-500"
                >
                  <option value="0">Todos os Scores</option>
                  <option value="90">90% ou superior</option>
                  <option value="95">95% ou superior (Top Talentos)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Grid de Candidatos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCandidates.map((cand) => (
              <div
                key={cand.id}
                className="bg-white dark:bg-[#120a22] border border-slate-200 dark:border-white/10 rounded-3xl p-5 shadow-sm space-y-4 hover:border-purple-400 dark:hover:border-purple-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
                        {cand.iniciais}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {cand.nomeCompleto}
                          </h4>
                          <span className="text-[11px] text-slate-500 dark:text-zinc-400">
                            • {cand.idade} anos
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-zinc-400 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                          <span>{cand.bairro} ({cand.cidade})</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="inline-block text-[11px] font-extrabold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                        {cand.scoreMatch}% Match
                      </span>
                      <span className="block text-[10px] text-slate-400 mt-0.5">
                        {cand.assiduidade}% assiduidade
                      </span>
                    </div>
                  </div>

                  {/* Informação de Transporte e Escolaridade */}
                  <div className="mt-3 p-2.5 bg-slate-50 dark:bg-white/[0.03] rounded-xl border border-slate-200 dark:border-white/5 text-[11px] text-slate-600 dark:text-zinc-300 space-y-1">
                    <div className="flex items-center gap-1.5 font-medium">
                      <GraduationCap className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                      <span className="truncate">{cand.escolaridade} • Turno {cand.turnoEscola}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                      <Bus className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{cand.rotaOnibus} ({cand.tempoDeslocamento})</span>
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

                {/* Footer do Card com Ações */}
                <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCandidateDetail(cand)}
                    className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Ver Currículo &amp; Badges</span>
                  </button>

                  {cand.conviteEnviado ? (
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 px-3 py-1.5 rounded-xl font-bold">
                      <Check className="w-3.5 h-3.5" /> Convidado!
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelectedCandidateForInvite(cand)}
                      className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Convidar para Processo</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ABA 3: MINHAS VAGAS & CANDIDATURAS (KANBAN ATS EM 4 FASES)                */}
      {/* ========================================================================= */}
      {activeTab === 'KANBAN' && (
        <div className="space-y-5 animate-fadeIn">
          
          {/* Header e Seletor de Vagas da Empresa */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-[#120a22] border border-slate-200 dark:border-white/10 rounded-3xl p-5 shadow-sm">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Gestão Visual de Candidaturas (Funil ATS)</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                Acompanhe o fluxo de seleção dos jovens para as vagas de {companyData.nomeFantasia}.
              </p>
            </div>

            {/* Seletor de Vaga para Filtrar */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-slate-500 dark:text-zinc-400 whitespace-nowrap">Filtrar por Vaga:</span>
              <select
                value={vagaFiltroKanban}
                onChange={(e) => setVagaFiltroKanban(e.target.value)}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white rounded-xl p-2 focus:outline-none focus:border-purple-500"
              >
                <option value="TODAS">Todas as Vagas Ativas</option>
                {companyVacancies.map((v) => (
                  <option key={v.id} value={v.titulo}>{v.titulo}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Cards Rápidos das Vagas da Empresa */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {companyVacancies.map((v) => (
              <div
                key={v.id}
                onClick={() => setVagaFiltroKanban(vagaFiltroKanban === v.titulo ? 'TODAS' : v.titulo)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  vagaFiltroKanban === v.titulo
                    ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-500 shadow-xs'
                    : 'bg-white dark:bg-[#120a22] border-slate-200 dark:border-white/10 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-1">
                  <span className="text-purple-600 dark:text-purple-400 uppercase tracking-wider">{v.bairro}</span>
                  <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.2 rounded-full">{v.status}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{v.titulo}</h4>
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-zinc-400 mt-2 pt-2 border-t border-slate-100 dark:border-white/5">
                  <span>{v.visualizacoes} views</span>
                  <strong className="text-slate-800 dark:text-white">{v.inscritos} candidatos</strong>
                </div>
              </div>
            ))}
          </div>

          {/* Funil Kanban ATS em 4 Colunas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* COLUNA 1: TRIAGEM (MATCH IA) */}
            <div className="bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-3xl p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    1. Triagem (Match IA)
                  </h4>
                </div>
                <span className="text-[10px] bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-zinc-300 px-2 py-0.5 rounded-full font-bold">
                  {filteredKanbanItems.filter((i) => i.status === 'TRIAGEM').length}
                </span>
              </div>

              <div className="space-y-3">
                {filteredKanbanItems
                  .filter((item) => item.status === 'TRIAGEM')
                  .map((item) => (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-[#120a22] border border-slate-200 dark:border-white/10 rounded-2xl p-3.5 shadow-sm space-y-2.5 hover:border-purple-300 transition-all"
                    >
                      <div className="flex justify-between items-start gap-1">
                        <div>
                          <strong className="text-xs font-bold text-slate-900 dark:text-white block">
                            {item.nomeCompleto || item.nomeMascarado}
                          </strong>
                          <span className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold block truncate">
                            {item.vagaTitulo}
                          </span>
                        </div>
                        <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30 px-1.5 py-0.5 rounded-md font-bold shrink-0">
                          {item.compatibilidade}% match
                        </span>
                      </div>

                      <div className="text-[10px] text-slate-500 dark:text-zinc-400 space-y-0.5">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-purple-500" />
                          <span>{item.bairro} ({item.cidade || 'Curitiba'})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bus className="w-3 h-3 text-emerald-500" />
                          <span className="truncate">{item.rotaOnibus}</span>
                        </div>
                      </div>

                      {item.anotacoes && (
                        <p className="text-[10px] text-slate-600 dark:text-zinc-300 bg-slate-50 dark:bg-white/5 p-2 rounded-lg italic">
                          &quot;{item.anotacoes}&quot;
                        </p>
                      )}

                      {/* Ações */}
                      <div className="pt-2 border-t border-slate-100 dark:border-white/10 flex justify-between items-center text-xs">
                        <button
                          type="button"
                          onClick={() => handleRejectCandidate(item.id)}
                          className="text-[10px] text-rose-500 hover:underline cursor-pointer"
                        >
                          Reprovar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveKanban(item.id, 'ENTREVISTA')}
                          className="text-[11px] font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>Entrevista ➔</span>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* COLUNA 2: ENTREVISTA RH */}
            <div className="bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-3xl p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    2. Entrevista RH
                  </h4>
                </div>
                <span className="text-[10px] bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-zinc-300 px-2 py-0.5 rounded-full font-bold">
                  {filteredKanbanItems.filter((i) => i.status === 'ENTREVISTA').length}
                </span>
              </div>

              <div className="space-y-3">
                {filteredKanbanItems
                  .filter((item) => item.status === 'ENTREVISTA')
                  .map((item) => (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-[#120a22] border border-amber-300/40 dark:border-amber-500/20 rounded-2xl p-3.5 shadow-sm space-y-2.5 transition-all"
                    >
                      <div className="flex justify-between items-start gap-1">
                        <div>
                          <strong className="text-xs font-bold text-slate-900 dark:text-white block">
                            {item.nomeCompleto || item.nomeMascarado}
                          </strong>
                          <span className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold block truncate">
                            {item.vagaTitulo}
                          </span>
                        </div>
                        <span className="text-[10px] bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30 px-1.5 py-0.5 rounded-md font-bold shrink-0">
                          Entrevista
                        </span>
                      </div>

                      {/* Data / Hora da Entrevista */}
                      <div className="bg-amber-50 dark:bg-amber-950/30 p-2 rounded-lg border border-amber-200 dark:border-amber-500/20 text-[10px] text-amber-900 dark:text-amber-200 space-y-0.5">
                        <div className="flex items-center gap-1 font-bold">
                          <Calendar className="w-3 h-3 text-amber-600 shrink-0" />
                          <span>{item.dataEntrevista || '25/11/2026'} às {item.horarioEntrevista || '14:00'}</span>
                        </div>
                      </div>

                      {item.anotacoes && (
                        <p className="text-[10px] text-slate-600 dark:text-zinc-300 bg-slate-50 dark:bg-white/5 p-2 rounded-lg italic">
                          &quot;{item.anotacoes}&quot;
                        </p>
                      )}

                      <div className="pt-2 border-t border-slate-100 dark:border-white/10 flex justify-between items-center text-xs">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingKanbanCandidate(item);
                            setKanbanNoteInput(item.anotacoes || '');
                            setKanbanDateInput(item.dataEntrevista || '');
                            setKanbanTimeInput(item.horarioEntrevista || '');
                          }}
                          className="text-[10px] text-slate-500 hover:text-purple-600 flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Anotação</span>
                        </button>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleMoveKanban(item.id, 'TRIAGEM')}
                            className="text-[10px] text-slate-400 hover:underline cursor-pointer"
                          >
                            ←
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveKanban(item.id, 'TESTE_GESTOR')}
                            className="text-[11px] font-bold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
                          >
                            Teste ➔
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* COLUNA 3: TESTE PRÁTICO / GESTOR */}
            <div className="bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-3xl p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    3. Teste / Gestor
                  </h4>
                </div>
                <span className="text-[10px] bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-zinc-300 px-2 py-0.5 rounded-full font-bold">
                  {filteredKanbanItems.filter((i) => i.status === 'TESTE_GESTOR').length}
                </span>
              </div>

              <div className="space-y-3">
                {filteredKanbanItems
                  .filter((item) => item.status === 'TESTE_GESTOR')
                  .map((item) => (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-[#120a22] border border-purple-300/40 dark:border-purple-500/20 rounded-2xl p-3.5 shadow-sm space-y-2.5 transition-all"
                    >
                      <div className="flex justify-between items-start gap-1">
                        <div>
                          <strong className="text-xs font-bold text-slate-900 dark:text-white block">
                            {item.nomeCompleto || item.nomeMascarado}
                          </strong>
                          <span className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold block truncate">
                            {item.vagaTitulo}
                          </span>
                        </div>
                        <span className="text-[10px] bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-500/30 px-1.5 py-0.5 rounded-md font-bold shrink-0">
                          Avaliação
                        </span>
                      </div>

                      {item.anotacoes && (
                        <p className="text-[10px] text-slate-600 dark:text-zinc-300 bg-slate-50 dark:bg-white/5 p-2 rounded-lg italic">
                          &quot;{item.anotacoes}&quot;
                        </p>
                      )}

                      <div className="pt-2 border-t border-slate-100 dark:border-white/10 flex justify-between items-center text-xs">
                        <button
                          type="button"
                          onClick={() => handleMoveKanban(item.id, 'ENTREVISTA')}
                          className="text-[10px] text-slate-400 hover:underline cursor-pointer"
                        >
                          ← Voltar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveKanban(item.id, 'CONTRATADO')}
                          className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>Aprovar ➔</span>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* COLUNA 4: PROPOSTA / CONTRATADO */}
            <div className="bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-3xl p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    4. Contratado!
                  </h4>
                </div>
                <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                  {filteredKanbanItems.filter((i) => i.status === 'CONTRATADO').length}
                </span>
              </div>

              <div className="space-y-3">
                {filteredKanbanItems
                  .filter((item) => item.status === 'CONTRATADO')
                  .map((item) => (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-[#120a22] border border-emerald-300/80 dark:border-emerald-500/40 rounded-2xl p-3.5 shadow-sm space-y-2.5 transition-all"
                    >
                      <div className="flex justify-between items-start gap-1">
                        <div>
                          <strong className="text-xs font-bold text-slate-900 dark:text-white block">
                            {item.nomeCompleto || item.nomeMascarado}
                          </strong>
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block truncate">
                            {item.vagaTitulo}
                          </span>
                        </div>
                        <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 font-bold px-2 py-0.5 rounded-full shrink-0">
                          🎉 Efetivado
                        </span>
                      </div>

                      <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-500/20 text-[10px] text-emerald-800 dark:text-emerald-200">
                        <span>Contrato emitido e vinculado à Cota da {companyData.nomeFantasia}.</span>
                      </div>

                      <div className="pt-2 border-t border-slate-100 dark:border-white/10 flex justify-end text-xs">
                        <span className="text-[10px] text-slate-400">Processo Concluído com Sucesso</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ABA 4: PERFIL DA MARCA EMPREGADORA (EMPLOYER BRANDING)                    */}
      {/* ========================================================================= */}
      {activeTab === 'MARCA_EMPREGADORA' && (
        <div className="bg-white dark:bg-[#120a22] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-fadeIn transition-colors">
          
          <div className="border-b border-slate-100 dark:border-white/10 pb-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span>Perfil da Marca Empregadora (Employer Branding)</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
              Personalize a página institucional de {companyData.nomeFantasia} vista pelos mais de 1.200 jovens cadastrados na SkillHub.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LADO ESQUERDO: Card Institucional da Marca (5 Colunas) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-3xl p-6 space-y-4 text-center">
                
                {/* Logo da Empresa */}
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-700 text-white font-black text-2xl flex items-center justify-center shadow-md">
                  {companyData.nomeFantasia.slice(0, 2).toUpperCase()}
                </div>

                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {companyData.nomeFantasia}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">
                    {companyData.razaoSocial}
                  </p>
                  <p className="text-[11px] text-purple-600 dark:text-purple-400 font-medium mt-0.5">
                    📍 {companyData.bairro} • {companyData.cidade}
                  </p>
                </div>

                {/* Selo Oficial */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-purple-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 px-3.5 py-1.5 rounded-full text-xs font-bold">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Empresa Amiga da Juventude Curitibana 2026</span>
                </div>

                {/* Métricas de Impacto */}
                <div className="grid grid-cols-2 gap-2 text-left pt-2">
                  <div className="bg-white dark:bg-[#120a22] p-3 rounded-2xl border border-slate-200 dark:border-white/10">
                    <span className="text-[10px] text-slate-400 block font-semibold">Taxa de Efetivação</span>
                    <strong className="text-base font-bold text-emerald-600 dark:text-emerald-400">{marcaTaxaEfetivacao}%</strong>
                  </div>
                  <div className="bg-white dark:bg-[#120a22] p-3 rounded-2xl border border-slate-200 dark:border-white/10">
                    <span className="text-[10px] text-slate-400 block font-semibold">Jovens Formados</span>
                    <strong className="text-base font-bold text-purple-600 dark:text-purple-400">+{marcaJovensFormados}</strong>
                  </div>
                </div>

                {/* Depoimento Real de Ex-Jovem Aprendiz */}
                <div className="text-left bg-white dark:bg-[#120a22] p-4 rounded-2xl border border-slate-200 dark:border-white/10 space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      MC
                    </div>
                    <div>
                      <strong className="text-xs font-bold text-slate-900 dark:text-white block">Mariana Costa, 21 anos</strong>
                      <span className="text-[10px] text-slate-500 dark:text-zinc-400">Analista Jr. • Ex-Aprendiz na {companyData.nomeFantasia}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-zinc-300 leading-relaxed italic">
                    &quot;Comecei aos 17 anos no programa de aprendizagem. Com as trilhas da SkillHub e o apoio dos mentores da empresa, conquistei minha vaga efetiva logo após o término do contrato!&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* LADO DIREITO: Edição da Marca Empregadora (7 Colunas) */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                  Cultura de Mentoria &amp; Propósito Jovem
                </label>
                <textarea
                  rows={4}
                  value={marcaDescricao}
                  onChange={(e) => setMarcaDescricao(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl p-3.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors leading-relaxed"
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
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl p-3.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Taxa Média de Efetivação (%)
                  </label>
                  <input
                    type="number"
                    value={marcaTaxaEfetivacao}
                    onChange={(e) => setMarcaTaxaEfetivacao(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Jovens Formados nos Últimos 3 Anos
                  </label>
                  <input
                    type="number"
                    value={marcaJovensFormados}
                    onChange={(e) => setMarcaJovensFormados(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => showToast('Perfil Atualizado!', 'As informações da Marca Empregadora foram salvas com sucesso na base do SkillHub.', 'success')}
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
      {/* MODAL 1: GERENCIAR DADOS & CNPJ (PRESETS REAIS + EDIÇÃO COMPLETA)         */}
      {/* ========================================================================= */}
      {showEditCompanyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl bg-white dark:bg-[#120a22] border border-slate-200 dark:border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-5 max-h-[90vh] overflow-y-auto custom-scrollbar">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Gerenciar Dados da Empresa &amp; Homologação CNPJ
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowEditCompanyModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white font-bold text-sm cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            {/* Seletor de Empresas Parceiras Reais de Curitiba & RMC */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-700 dark:text-zinc-300 block">
                Alternar Rapidamente entre Empresas Parceiras da RMC:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {REAL_COMPANIES_RMC.map((comp) => (
                  <button
                    key={comp.cnpj}
                    type="button"
                    onClick={() => handleApplyPreset(comp)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                      editCnpj === comp.cnpj
                        ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-500 font-bold'
                        : 'bg-slate-50 dark:bg-white/[0.03] border-slate-200 dark:border-white/10 hover:border-purple-300'
                    }`}
                  >
                    <strong className="text-slate-900 dark:text-white block truncate">{comp.nomeFantasia}</strong>
                    <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-mono block">{comp.cnpj} • {comp.cidade}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Formulário de Edição Completa */}
            <form onSubmit={handleSaveCompanyData} className="space-y-3.5 pt-2 border-t border-slate-100 dark:border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Número do CNPJ *
                  </label>
                  <input
                    type="text"
                    value={editCnpj}
                    onChange={(e) => setEditCnpj(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white font-mono focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Nome Fantasia *
                  </label>
                  <input
                    type="text"
                    value={editFantasia}
                    onChange={(e) => setEditFantasia(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Razão Social Oficial *
                  </label>
                  <input
                    type="text"
                    value={editRazao}
                    onChange={(e) => setEditRazao(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Cidade / Região da Sede *
                  </label>
                  <input
                    type="text"
                    value={editCidade}
                    onChange={(e) => setEditCidade(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Bairro / Unidade Operacional *
                  </label>
                  <input
                    type="text"
                    value={editBairro}
                    onChange={(e) => setEditBairro(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Responsável de RH / Atração *
                  </label>
                  <input
                    type="text"
                    value={editResp}
                    onChange={(e) => setEditResp(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    E-mail Corporativo de Contato *
                  </label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Status da Cota Lei 10.097/00
                  </label>
                  <input
                    type="text"
                    value={editCotaAprendiz}
                    onChange={(e) => setEditCotaAprendiz(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setShowEditCompanyModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-zinc-400 text-xs font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold cursor-pointer shadow-sm"
                >
                  Salvar Dados Cadastrais
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: VER CURRÍCULO COMPLETO & BADGES DO CANDIDATO                     */}
      {/* ========================================================================= */}
      {selectedCandidateDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl bg-white dark:bg-[#120a22] border border-slate-200 dark:border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                  {selectedCandidateDetail.iniciais}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {selectedCandidateDetail.nomeCompleto}
                  </h3>
                  <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                    {selectedCandidateDetail.escolaridade}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCandidateDetail(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white font-bold text-sm cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            {/* Informações Resumidas */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-slate-50 dark:bg-white/[0.03] p-3 rounded-2xl border border-slate-100 dark:border-white/5">
              <div>
                <span className="text-slate-400 block text-[10px]">Idade:</span>
                <strong className="text-slate-800 dark:text-white">{selectedCandidateDetail.idade} anos</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Local:</span>
                <strong className="text-slate-800 dark:text-white">{selectedCandidateDetail.bairro} ({selectedCandidateDetail.cidade})</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Disponibilidade:</span>
                <strong className="text-emerald-600 dark:text-emerald-400">{selectedCandidateDetail.disponibilidade}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Assiduidade:</span>
                <strong className="text-purple-600 dark:text-purple-400">{selectedCandidateDetail.assiduidade}%</strong>
              </div>
            </div>

            {/* Bio e Apresentação */}
            <div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                Apresentação Profissional:
              </span>
              <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed bg-slate-50 dark:bg-white/[0.02] p-3 rounded-xl border border-slate-100 dark:border-white/5">
                {selectedCandidateDetail.bio}
              </p>
            </div>

            {/* Badges e Certificados Validados */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                Badges Oficiais &amp; Certificados Digitais Validados:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedCandidateDetail.badges.map((b, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-purple-200/60 dark:border-purple-500/30 bg-purple-50/50 dark:bg-purple-950/30 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 dark:text-white">
                        <Award className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                        <span>{b.title}</span>
                      </div>
                      <span className="text-xs font-bold text-purple-700 dark:text-purple-300 font-mono">
                        {b.score}%
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono block">
                      Código de Autenticidade: {b.code}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rota de Ônibus */}
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <Bus className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>Logística URBS/Comec:</strong> {selectedCandidateDetail.rotaOnibus} ({selectedCandidateDetail.tempoDeslocamento})</span>
            </div>

            {/* Rodapé do Modal com Ação de Convite */}
            <div className="pt-3 flex justify-end gap-2 border-t border-slate-100 dark:border-white/10">
              <button
                type="button"
                onClick={() => setSelectedCandidateDetail(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-zinc-400 text-xs font-bold cursor-pointer"
              >
                Fechar
              </button>
              <button
                type="button"
                onClick={() => {
                  const targetCand = selectedCandidateDetail;
                  setSelectedCandidateDetail(null);
                  setSelectedCandidateForInvite(targetCand);
                }}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Convidar para Processo Seletivo</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: CONVIDAR CANDIDATO PARA PROCESSO SELETIVO                        */}
      {/* ========================================================================= */}
      {selectedCandidateForInvite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-[#120a22] border border-slate-200 dark:border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Convidar para Processo Seletivo
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCandidateForInvite(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white font-bold text-sm cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-2xl border border-purple-200 dark:border-purple-500/20 text-xs text-slate-700 dark:text-zinc-300">
              Você está convidando <strong>{selectedCandidateForInvite.nomeCompleto}</strong> ({selectedCandidateForInvite.idade} anos, Bairro {selectedCandidateForInvite.bairro}) para o processo seletivo da <strong>{companyData.nomeFantasia}</strong>.
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                  Vaga de Interesse da Sua Empresa:
                </label>
                <select
                  value={inviteVagaSelect}
                  onChange={(e) => setInviteVagaSelect(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="Jovem Aprendiz em Logística Industrial — SJP">Jovem Aprendiz em Logística Industrial — SJP</option>
                  <option value="Jovem Aprendiz Administrativo — CIC">Jovem Aprendiz Administrativo — CIC</option>
                  <option value="Estagiário de RH & Gente — Curitiba">Estagiário de RH &amp; Gente — Curitiba</option>
                  <option value="Estagiário de Engenharia & Qualidade — SJP">Estagiário de Engenharia &amp; Qualidade — SJP</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Data da Entrevista
                  </label>
                  <input
                    type="date"
                    value={inviteDate}
                    onChange={(e) => setInviteDate(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Horário da Entrevista
                  </label>
                  <input
                    type="time"
                    value={inviteTime}
                    onChange={(e) => setInviteTime(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                  Mensagem Personalizada de Boas-Vindas:
                </label>
                <textarea
                  rows={3}
                  value={inviteMensagem}
                  onChange={(e) => setInviteMensagem(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-slate-100 dark:border-white/10">
              <button
                type="button"
                onClick={() => setSelectedCandidateForInvite(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-zinc-400 text-xs font-bold cursor-pointer"
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

      {/* ========================================================================= */}
      {/* MODAL 4: ANOTAÇÃO / AGENDAR ENTREVISTA NO KANBAN ATS                       */}
      {/* ========================================================================= */}
      {editingKanbanCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-[#120a22] border border-slate-200 dark:border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Anotações Internas &amp; Agendamento
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingKanbanCandidate(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white font-bold text-sm cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Candidato: <strong className="text-slate-900 dark:text-white">{editingKanbanCandidate.nomeCompleto || editingKanbanCandidate.nomeMascarado}</strong> • Vaga: <strong>{editingKanbanCandidate.vagaTitulo}</strong>
            </p>

            <form onSubmit={handleSaveKanbanDetails} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                  Anotações da Entrevista / Parecer RH:
                </label>
                <textarea
                  rows={4}
                  value={kanbanNoteInput}
                  onChange={(e) => setKanbanNoteInput(e.target.value)}
                  placeholder="Ex: Boa comunicação, pontual, domínio das fórmulas do Excel. Recomendado para teste com o gestor..."
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Data da Entrevista
                  </label>
                  <input
                    type="text"
                    value={kanbanDateInput}
                    onChange={(e) => setKanbanDateInput(e.target.value)}
                    placeholder="DD/MM/AAAA"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Horário
                  </label>
                  <input
                    type="text"
                    value={kanbanTimeInput}
                    onChange={(e) => setKanbanTimeInput(e.target.value)}
                    placeholder="HH:MM"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingKanbanCandidate(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-zinc-400 text-xs font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold cursor-pointer shadow-sm"
                >
                  Salvar Informações
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
