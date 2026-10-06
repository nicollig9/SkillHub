import { Student, JobVacancy, Badge, Application, GuardrailLog } from '@/types';

export const BAIRROS_CURITIBA: Record<string, { nome: string; coords: [number, number]; desc: string; vagasCount: number; distKmDoBoqueirao: number }> = {
  'Boqueirão': {
    nome: 'Boqueirão',
    coords: [-25.5039, -49.2372],
    desc: 'Região Sul de Curitiba com forte polo comercial, serviços e logística.',
    vagasCount: 6,
    distKmDoBoqueirao: 0
  },
  'CIC': {
    nome: 'CIC (Cidade Industrial de Curitiba)',
    coords: [-25.5036, -49.3338],
    desc: 'Maior polo industrial do Paraná com centenas de empresas metalmecânicas, automobilísticas e tecnologia.',
    vagasCount: 14,
    distKmDoBoqueirao: 8.5
  },
  'Tatuquara': {
    nome: 'Tatuquara',
    coords: [-25.5681, -49.3392],
    desc: 'Região em forte expansão no extremo sul, com centros de distribuição e varejo.',
    vagasCount: 4,
    distKmDoBoqueirao: 11.2
  },
  'Centro': {
    nome: 'Centro',
    coords: [-25.4284, -49.2733],
    desc: 'Coração financeiro e administrativo de Curitiba, com órgãos públicos, escritórios e serviços.',
    vagasCount: 12,
    distKmDoBoqueirao: 9.1
  },
  'Batel': {
    nome: 'Batel',
    coords: [-25.4431, -49.2842],
    desc: 'Hub financeiro, consultorias de RH, tecnologia e serviços corporativos de alta demanda.',
    vagasCount: 8,
    distKmDoBoqueirao: 8.8
  },
  'Portão': {
    nome: 'Portão',
    coords: [-25.4748, -49.2934],
    desc: 'Região com grandes shoppings centers, supermercados e clínicas.',
    vagasCount: 7,
    distKmDoBoqueirao: 6.4
  },
  'Pinheirinho': {
    nome: 'Pinheirinho',
    coords: [-25.5218, -49.2941],
    desc: 'Polo logístico e atacadista próximo à Linha Verde Sul.',
    vagasCount: 9,
    distKmDoBoqueirao: 4.8
  }
};

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge-direitos-legislação',
    title: 'Direitos & Legislação',
    category: 'Trabalho',
    description: 'Comprova domínio da Lei do Aprendiz (10.097/00), Lei do Estágio (11.788/08), holerite e prevenção a fraudes.',
    workloadHours: 12,
    icon: 'Scale',
    color: '#8B5CF6',
    dateEarned: '14/09/2026',
    score: 92,
    codeVerificador: 'SKILL-PR-2026-8841A'
  },
  {
    id: 'badge-curriculo-campeao',
    title: 'Currículo Campeão',
    category: 'Trabalho',
    description: 'Comprova competência em estruturação de currículo sem experiência, cadastro seguro e LGPD.',
    workloadHours: 8,
    icon: 'FileText',
    color: '#3B82F6',
    dateEarned: '12/09/2026',
    score: 88,
    codeVerificador: 'SKILL-PR-2026-1920B'
  },
  {
    id: 'badge-financas',
    title: 'Mestre em Finanças',
    category: 'Finanças',
    description: 'Comprova conhecimentos em planejamento 50/30/20, gestão do primeiro salário e prevenção a juros abusivos.',
    workloadHours: 10,
    icon: 'DollarSign',
    color: '#10B981',
    dateEarned: undefined
  },
  {
    id: 'badge-inteligencia-emocional',
    title: 'Inteligência Emocional',
    category: 'Saúde Mental',
    description: 'Comprova domínio de gestão de estresse, comunicação não violenta e relações interpessoais no trabalho.',
    workloadHours: 10,
    icon: 'HeartPulse',
    color: '#EC4899',
    dateEarned: undefined
  },
  {
    id: 'badge-office-tools',
    title: 'Excel & Ferramentas de Escritório',
    category: 'Ferramentas de Escritório',
    description: 'Comprova proficiência em planilhas, redação corporativa formal e organização de arquivos digitais.',
    workloadHours: 16,
    icon: 'Briefcase',
    color: '#F59E0B',
    dateEarned: undefined
  }
];

export const INITIAL_STUDENT: Student = {
  id: 1,
  nome: 'Lucas Silva Oliveira',
  email: 'lucas.oliveira@escola.pr.gov.br',
  profileType: 'JOVEM_APRENDIZ',
  cpfRaw: '098.765.432-10',
  cpfMasked: '***.765.432-**',
  dataNascimento: '2009-04-18',
  idade: 17,
  escolaridade: '2º Ano do Ensino Médio Regular',
  turnoEscola: 'Noturno (19:00 às 22:30)',
  endereco: {
    id: 101,
    rua: 'Rua Maestro Carlos Frank',
    numero: '1240',
    bairro: 'Boqueirão',
    cidade: 'Curitiba',
    estado: 'PR',
    cep: '81650-010',
    latitude: -25.5039,
    longitude: -25.2372
  },
  badgesEarned: [
    {
      badgeId: 'badge-direitos-legislação',
      date: '14/09/2026',
      score: 92,
      code: 'SKILL-PR-2026-8841A'
    },
    {
      badgeId: 'badge-curriculo-campeao',
      date: '12/09/2026',
      score: 88,
      code: 'SKILL-PR-2026-1920B'
    }
  ],
  bio: 'Estudante dedicado do Ensino Médio noturno buscando primeira oportunidade como Jovem Aprendiz Administrativo ou Logística. Badges validadas em Legislação Trabalhista e Elaboração de Currículo.',
  telefoneRaw: '(41) 98877-6655',
  telefoneMasked: '(41) *****-6655'
};

export const INITIAL_VAGAS: JobVacancy[] = [
  // --- VAGAS DE JOVEM APRENDIZ (LEI 10.097/00) ---
  {
    id: 1,
    idEmpresa: 10,
    empresaNome: 'Bosch Curitiba (Unidade CIC)',
    empresaCnpjMasked: '45.***.***/0001-92',
    empresaValidadaCnpj: true,
    titulo: 'Jovem Aprendiz em Logística e Suprimentos',
    tipoVaga: 'Jovem Aprendiz',
    descricao: 'Apoio no controle de estoque de peças industriais, emissão de notas no SAP e conciliação com o time de armazém. Carga teórica em parceria com o SENAI CIC.',
    bairro: 'CIC',
    cidade: 'Curitiba',
    remuneracao: 1120.00,
    beneficios: ['Vale-Transporte Integral', 'Refeitório no Local', 'Assistência Odontológica', 'Seguro de Vida'],
    cargaHorariaDiaria: 6,
    horario: '08:00 às 14:00 (Segunda a Sexta)',
    status: 'ATIVA',
    dataCriacao: '12/09/2026',
    badgesRequeridas: ['badge-direitos-legislação', 'badge-curriculo-campeao'],
    candidatosInscritos: 18,
    jaCandidatou: true
  },
  {
    id: 2,
    idEmpresa: 11,
    empresaNome: 'Supermercados Condor (Filial Boqueirão)',
    empresaCnpjMasked: '76.***.***/0004-18',
    empresaValidadaCnpj: true,
    titulo: 'Jovem Aprendiz Administrativo & Atendimento',
    tipoVaga: 'Jovem Aprendiz',
    descricao: 'Suporte no setor de recursos humanos da loja, organização de escalas de folgas, atendimento inicial e controle de fichas de ponto eletrônico.',
    bairro: 'Boqueirão',
    cidade: 'Curitiba',
    remuneracao: 1080.00,
    beneficios: ['Vale-Transporte', 'Desconto em Compras', 'Uniforme Gratuito', 'Plano Odontológico'],
    cargaHorariaDiaria: 6,
    horario: '08:30 às 14:30 (Segunda a Sexta)',
    status: 'ATIVA',
    dataCriacao: '13/09/2026',
    badgesRequeridas: ['badge-direitos-legislação'],
    candidatosInscritos: 9,
    jaCandidatou: false
  },
  {
    id: 4,
    idEmpresa: 13,
    empresaNome: 'Advocacia & Consultoria Batel RH',
    empresaCnpjMasked: '22.***.***/0001-80',
    empresaValidadaCnpj: true,
    titulo: 'Jovem Aprendiz em Rotinas de Escritório e Recepção',
    tipoVaga: 'Jovem Aprendiz',
    descricao: 'Triagem de documentos digitais, agendamento de reuniões em Google Workspace e atendimento telefônico cortês a clientes.',
    bairro: 'Batel',
    cidade: 'Curitiba',
    remuneracao: 1150.00,
    beneficios: ['Vale-Transporte', 'Vale-Alimentação R$ 450/mês', 'Café da manhã no escritório'],
    cargaHorariaDiaria: 6,
    horario: '09:00 às 15:00',
    status: 'ATIVA',
    dataCriacao: '11/09/2026',
    badgesRequeridas: ['badge-direitos-legislação', 'badge-curriculo-campeao'],
    candidatosInscritos: 11,
    jaCandidatou: false
  },
  {
    id: 5,
    idEmpresa: 14,
    empresaNome: 'Centro Distribuição Tatuquara Express',
    empresaCnpjMasked: '33.***.***/0002-55',
    empresaValidadaCnpj: true,
    titulo: 'Jovem Aprendiz Auxiliar de Expedição',
    tipoVaga: 'Jovem Aprendiz',
    descricao: 'Conferência de etiquetas de remessas expressas e organização de relatórios de saída de frotas.',
    bairro: 'Tatuquara',
    cidade: 'Curitiba',
    remuneracao: 1050.00,
    beneficios: ['Vale-Transporte', 'Seguro de Vida', 'Refeitório no Local'],
    cargaHorariaDiaria: 6,
    horario: '08:00 às 14:00',
    status: 'ATIVA',
    dataCriacao: '14/09/2026',
    badgesRequeridas: ['badge-direitos-legislação'],
    candidatosInscritos: 5,
    jaCandidatou: false
  },

  // --- VAGAS DE ESTÁGIO (LEI 11.788/08) ---
  {
    id: 3,
    idEmpresa: 12,
    empresaNome: 'Grupo Positivo Tecnologia',
    empresaCnpjMasked: '08.***.***/0001-35',
    empresaValidadaCnpj: true,
    titulo: 'Estagiário de Suporte Técnico & TI Jr.',
    tipoVaga: 'Estagiário',
    descricao: 'Acompanhamento em testes de bancada de computadores e suporte a colaboradores internos. Redução obrigatória da jornada em 50% em períodos de provas.',
    bairro: 'CIC',
    cidade: 'Curitiba',
    remuneracao: 1350.00,
    beneficios: ['Bolsa-Auxílio R$ 1.350', 'Auxílio Transporte', 'Vale-Refeição R$ 32/dia', 'Seguro de Vida Coletivo (Lei do Estágio)'],
    cargaHorariaDiaria: 6,
    horario: '13:00 às 19:00',
    status: 'ATIVA',
    dataCriacao: '10/09/2026',
    badgesRequeridas: ['badge-direitos-legislação', 'badge-curriculo-campeao'],
    candidatosInscritos: 14,
    jaCandidatou: false
  },
  {
    id: 6,
    idEmpresa: 15,
    empresaNome: 'Hub de Inovação Centro Curitiba',
    empresaCnpjMasked: '19.***.***/0001-09',
    empresaValidadaCnpj: true,
    titulo: 'Estagiário de Comunicação e Conteúdo Digital',
    tipoVaga: 'Estagiário',
    descricao: 'Criação de comunicados internos, auxílio na organização de workshops e atualização de murais informativos.',
    bairro: 'Centro',
    cidade: 'Curitiba',
    remuneracao: 1200.00,
    beneficios: ['Bolsa-Auxílio', 'Auxílio Transporte', 'Curso de Inglês Interno'],
    cargaHorariaDiaria: 5,
    horario: '13:30 às 18:30',
    status: 'ATIVA',
    dataCriacao: '09/09/2026',
    badgesRequeridas: ['badge-curriculo-campeao'],
    candidatosInscritos: 22,
    jaCandidatou: false
  },
  {
    id: 7,
    idEmpresa: 16,
    empresaNome: 'Auditoria & Consultoria Portão Finanças',
    empresaCnpjMasked: '14.***.***/0001-77',
    empresaValidadaCnpj: true,
    titulo: 'Estagiário em Administração & Controle de Planilhas',
    tipoVaga: 'Estagiário',
    descricao: 'Elaboração de planilhas de controle financeiro, conferência de extratos bancários e apoio em lançamentos de contas a pagar.',
    bairro: 'Portão',
    cidade: 'Curitiba',
    remuneracao: 1400.00,
    beneficios: ['Bolsa-Auxílio R$ 1.400', 'Vale-Transporte', 'Vale-Refeição R$ 28/dia', 'Seguro de Vida'],
    cargaHorariaDiaria: 6,
    horario: '08:00 às 14:00',
    status: 'ATIVA',
    dataCriacao: '14/09/2026',
    badgesRequeridas: ['badge-direitos-legislação'],
    candidatosInscritos: 8,
    jaCandidatou: false
  },

  // --- VAGAS DE PRIMEIRO EMPREGO / EM BUSCA DE OPORTUNIDADE ---
  {
    id: 8,
    idEmpresa: 17,
    empresaNome: 'Rede Farma Curitiba Distribuição',
    empresaCnpjMasked: '55.***.***/0001-20',
    empresaValidadaCnpj: true,
    titulo: 'Auxiliar de Entrada / Trainee de Operações (Sem Experiência)',
    tipoVaga: 'Primeiro Emprego',
    descricao: 'Oportunidade de entrada para quem nunca trabalhou. Treinamento completo na empresa com acompanhamento de tutor e plano de carreira interno.',
    bairro: 'Boqueirão',
    cidade: 'Curitiba',
    remuneracao: 1420.00,
    beneficios: ['Vale-Transporte', 'Vale-Alimentação R$ 600/mês', 'Plano de Saúde', 'Treinamento Remunerado'],
    cargaHorariaDiaria: 8,
    horario: '08:00 às 17:00',
    status: 'ATIVA',
    dataCriacao: '15/09/2026',
    badgesRequeridas: ['badge-curriculo-campeao'],
    candidatosInscritos: 35,
    jaCandidatou: false
  },
  {
    id: 9,
    idEmpresa: 18,
    empresaNome: 'Contact Center Curitiba Teleatendimento',
    empresaCnpjMasked: '62.***.***/0001-88',
    empresaValidadaCnpj: true,
    titulo: 'Assistente de Atendimento Inicial (Primeiro Emprego)',
    tipoVaga: 'Primeiro Emprego',
    descricao: 'Atendimento receptivo de clientes para esclarecimento de dúvidas e registro em sistema. Não exige experiência prévia.',
    bairro: 'Centro',
    cidade: 'Curitiba',
    remuneracao: 1380.00,
    beneficios: ['Vale-Transporte', 'Vale-Refeição R$ 25/dia', 'Comissões', 'Auxílio Creche'],
    cargaHorariaDiaria: 6,
    horario: '14:00 às 20:20',
    status: 'ATIVA',
    dataCriacao: '15/09/2026',
    badgesRequeridas: ['badge-curriculo-campeao'],
    candidatosInscritos: 19,
    jaCandidatou: false
  },

  // --- VAGAS PARA ESTUDANTES (TURNO FLEXÍVEL) ---
  {
    id: 10,
    idEmpresa: 19,
    empresaNome: 'Livraria & Papelaria Santa Felicidade',
    empresaCnpjMasked: '81.***.***/0001-11',
    empresaValidadaCnpj: true,
    titulo: 'Apoio de Atendimento & Estoque Estudantil (4 Horas)',
    tipoVaga: 'Estudante',
    descricao: 'Jornada reduzida de 4 horas diárias feita sob medida para conciliar com os estudos no turno matutino ou noturno.',
    bairro: 'Santa Felicidade',
    cidade: 'Curitiba',
    remuneracao: 950.00,
    beneficios: ['Vale-Transporte', 'Desconto em Livros', 'Horário Flexível para Provas'],
    cargaHorariaDiaria: 4,
    horario: '14:00 às 18:00',
    status: 'ATIVA',
    dataCriacao: '13/09/2026',
    badgesRequeridas: ['badge-direitos-legislação'],
    candidatosInscritos: 12,
    jaCandidatou: false
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 1001,
    protocolo: '#CAND-2026-88412',
    idVaga: 1,
    vagaTitulo: 'Jovem Aprendiz em Logística e Suprimentos',
    empresaNome: 'Bosch Curitiba (Unidade CIC)',
    bairroVaga: 'CIC',
    idAluno: 1,
    alunoNome: 'Lucas Silva Oliveira',
    alunoBairro: 'Boqueirão',
    dataCandidatura: '14/09/2026 10:15',
    status: 'EM_ANALISE',
    badgesCompatíveis: 2,
    totalBadgesRequeridas: 2,
    lgpdDadosLiberados: true,
    curriculoTipo: 'CURRICULO_SKILLHUB',
    curriculoNomeArquivo: 'Curriculo_Lucas_Oliveira_SkillHub.pdf',
    cartaApresentacao: 'Tenho grande interesse em ingressar como Jovem Aprendiz na área de logística para aplicar meus conhecimentos em organização e aprender as rotinas industriais da Bosch.'
  }
];

export const INITIAL_GUARDRAILS_LOGS: GuardrailLog[] = [
  {
    id: 'glog-101',
    timestamp: '14/09/2026 15:30:12',
    type: 'LGPD_MASK',
    status: 'PROTECTED',
    details: 'Endereço exato mascarado no mapa público de candidatos. Apenas o bairro "Boqueirão" foi exposto para as empresas.',
    source: 'Módulo de Geolocalização (MapContainer)'
  },
  {
    id: 'glog-102',
    timestamp: '14/09/2026 15:28:44',
    type: 'BADGE_INTEGRITY',
    status: 'ALLOWED',
    details: 'Badge "Direitos & Legislação" emitida para Aluno ID #1 após atingir nota 92.00% (Nota de corte mínima: 70.00%).',
    source: 'Serviço de Certificação (Alunos_Badges)'
  },
  {
    id: 'glog-103',
    timestamp: '14/09/2026 14:55:03',
    type: 'ANTI_FRAUD_SCAN',
    status: 'BLOCKED',
    details: 'Varredura automática bloqueou tentativa de cadastro de vaga contendo termo abusivo: "taxa de R$ 150 para apostila".',
    source: 'Filtro Anti-Vagas Abusivas (Web API .NET)'
  },
  {
    id: 'glog-104',
    timestamp: '14/09/2026 14:12:19',
    type: 'CNPJ_VALIDATION',
    status: 'ALLOWED',
    details: 'CNPJ 45.***.***/0001-92 validado com sucesso na base cadastral da Receita Federal (Status: ATIVO).',
    source: 'Middleware de Validação de Empresas'
  },
  {
    id: 'glog-105',
    timestamp: '14/09/2026 13:40:02',
    type: 'ANTI_HARASSMENT',
    status: 'PROTECTED',
    details: 'Filtro de moderação de texto em tempo real ativo nas mensagens entre recrutadores e jovens aprendizes.',
    source: 'Serviço de Chat & Candidatura'
  }
];

export const DER_TABLES_INFO = [
  {
    name: 'Enderecos',
    purpose: 'Guardrail de Privacidade: Isola a geolocalização exata do aluno (lat/long mantidos restritos).',
    columns: [
      { name: 'id_endereco', type: 'SERIAL PRIMARY KEY', isPk: true, isFk: false, note: 'Identificador único' },
      { name: 'rua', type: 'VARCHAR(150)', isPk: false, isFk: false, note: 'Protegido / Privado' },
      { name: 'numero', type: 'VARCHAR(20)', isPk: false, isFk: false, note: 'Protegido / Privado' },
      { name: 'bairro', type: 'VARCHAR(80) NOT NULL', isPk: false, isFk: false, note: 'Exibido publicamente no mapa' },
      { name: 'cidade', type: 'VARCHAR(80) DEFAULT "Curitiba"', isPk: false, isFk: false, note: 'Região metropolitana' },
      { name: 'estado', type: 'VARCHAR(2) DEFAULT "PR"', isPk: false, isFk: false, note: 'Paraná' },
      { name: 'cep', type: 'VARCHAR(10)', isPk: false, isFk: false, note: 'Uso interno de roteirização' },
      { name: 'latitude', type: 'DECIMAL(10, 8)', isPk: false, isFk: false, note: 'Mantido restrito ao backend' },
      { name: 'longitude', type: 'DECIMAL(11, 8)', isPk: false, isFk: false, note: 'Mantido restrito ao backend' }
    ]
  },
  {
    name: 'Alunos',
    purpose: 'Contas de jovens estudantes e aprendizes com proteção LGPD de dados sensíveis.',
    columns: [
      { name: 'id_aluno', type: 'SERIAL PRIMARY KEY', isPk: true, isFk: false, note: 'Identificador do jovem' },
      { name: 'nome', type: 'VARCHAR(100) NOT NULL', isPk: false, isFk: false, note: 'Nome do candidato' },
      { name: 'email', type: 'VARCHAR(100) UNIQUE NOT NULL', isPk: false, isFk: false, note: 'Contato profissional' },
      { name: 'senha_hash', type: 'VARCHAR(255) NOT NULL', isPk: false, isFk: false, note: 'Criptografia BCrypt com Salt' },
      { name: 'cpf', type: 'VARCHAR(14) UNIQUE NOT NULL', isPk: false, isFk: false, note: 'Restrito (LGPD Menores)' },
      { name: 'data_nascimento', type: 'DATE NOT NULL', isPk: false, isFk: false, note: 'Validação 14-24 anos' },
      { name: 'id_endereco', type: 'INT REFERENCES Enderecos', isPk: false, isFk: true, note: 'Vínculo com bairro seguro' }
    ]
  },
  {
    name: 'Empresas',
    purpose: 'Empresas contratantes com validação obrigatória de CNPJ ativo na Receita Federal.',
    columns: [
      { name: 'id_empresa', type: 'SERIAL PRIMARY KEY', isPk: true, isFk: false, note: 'ID da organização' },
      { name: 'razao_social', type: 'VARCHAR(150) NOT NULL', isPk: false, isFk: false, note: 'Razão social oficial' },
      { name: 'cnpj', type: 'VARCHAR(18) UNIQUE NOT NULL', isPk: false, isFk: false, note: 'Registro fiscal' },
      { name: 'email', type: 'VARCHAR(100) UNIQUE NOT NULL', isPk: false, isFk: false, note: 'E-mail institucional RH' },
      { name: 'senha_hash', type: 'VARCHAR(255) NOT NULL', isPk: false, isFk: false, note: 'BCrypt + JWT' },
      { name: 'validado_cnpj', type: 'BOOLEAN DEFAULT FALSE', isPk: false, isFk: false, note: 'Guardrail Anti-Fraude' },
      { name: 'id_endereco', type: 'INT REFERENCES Enderecos', isPk: false, isFk: true, note: 'Local físico da empresa' }
    ]
  },
  {
    name: 'Badges',
    purpose: 'Catálogo oficial de selos digitais de competência emitidos pela plataforma.',
    columns: [
      { name: 'id_badge', type: 'SERIAL PRIMARY KEY', isPk: true, isFk: false, note: 'ID do selo' },
      { name: 'titulo', type: 'VARCHAR(100) NOT NULL', isPk: false, isFk: false, note: 'Nome da competência' },
      { name: 'descricao', type: 'TEXT', isPk: false, isFk: false, note: 'Habilidades validadas' },
      { name: 'categoria', type: 'VARCHAR(50)', isPk: false, isFk: false, note: 'Trabalho, Finanças, etc.' },
      { name: 'carga_horaria_minutos', type: 'INT NOT NULL', isPk: false, isFk: false, note: 'Tempo mínimo exigido' }
    ]
  },
  {
    name: 'Alunos_Badges',
    purpose: 'Guardrail de Gamificação: Só grava conquista se o aluno atingir nota >= 70%.',
    columns: [
      { name: 'id_aluno', type: 'INT REFERENCES Alunos', isPk: true, isFk: true, note: 'Aluno premiado' },
      { name: 'id_badge', type: 'INT REFERENCES Badges', isPk: true, isFk: true, note: 'Selo conquistado' },
      { name: 'data_conquista', type: 'TIMESTAMP DEFAULT NOW()', isPk: false, isFk: false, note: 'Data de conclusão' },
      { name: 'nota_quiz', type: 'DECIMAL(4,2) NOT NULL', isPk: false, isFk: false, note: 'Guardrail: Mínimo 70%' }
    ]
  },
  {
    name: 'Vagas',
    purpose: 'Vagas de Jovem Aprendiz e Estagiário publicadas por empresas autorizadas.',
    columns: [
      { name: 'id_vaga', type: 'SERIAL PRIMARY KEY', isPk: true, isFk: false, note: 'ID da vaga' },
      { name: 'id_empresa', type: 'INT REFERENCES Empresas', isPk: false, isFk: true, note: 'Empresa contratante' },
      { name: 'titulo', type: 'VARCHAR(100) NOT NULL', isPk: false, isFk: false, note: 'Cargo / Função' },
      { name: 'descricao', type: 'TEXT NOT NULL', isPk: false, isFk: false, note: 'Atividades e benefícios' },
      { name: 'status', type: 'VARCHAR(20) DEFAULT "ATIVA"', isPk: false, isFk: false, note: 'ATIVA, PREENCHIDA, CANCELADA' },
      { name: 'bairro_vaga', type: 'VARCHAR(80) NOT NULL', isPk: false, isFk: false, note: 'Bairro para cálculo de proximidade' },
      { name: 'data_criacao', type: 'TIMESTAMP DEFAULT NOW()', isPk: false, isFk: false, note: 'Data de publicação' }
    ]
  },
  {
    name: 'Vagas_Badges_Requeridas',
    purpose: 'Associação de badges necessárias para a vaga.',
    columns: [
      { name: 'id_vaga', type: 'INT REFERENCES Vagas', isPk: true, isFk: true, note: 'Vaga correspondente' },
      { name: 'id_badge', type: 'INT REFERENCES Badges', isPk: true, isFk: true, note: 'Badge exigida pelo RH' }
    ]
  },
  {
    name: 'Candidaturas',
    purpose: 'Conexão entre aluno e vaga com liberação controlada de dados após consentimento.',
    columns: [
      { name: 'id_candidatura', type: 'SERIAL PRIMARY KEY', isPk: true, isFk: false, note: 'Protocolo de inscrição' },
      { name: 'id_vaga', type: 'INT REFERENCES Vagas', isPk: false, isFk: true, note: 'Vaga pretendida' },
      { name: 'id_aluno', type: 'INT REFERENCES Alunos', isPk: false, isFk: true, note: 'Candidato inscrito' },
      { name: 'data_candidatura', type: 'TIMESTAMP DEFAULT NOW()', isPk: false, isFk: false, note: 'Data e hora do envio' },
      { name: 'status', type: 'VARCHAR(30) DEFAULT "EM_ANALISE"', isPk: false, isFk: false, note: 'EM_ANALISE, ENTREVISTA, APROVADO' }
    ]
  }
];
