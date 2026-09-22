export type UserRole = 'ALUNO' | 'RECRUTADOR' | 'SEGURANCA_DER';

export type CandidateProfileType = 
  | 'ESTUDANTE' 
  | 'ESTAGIARIO' 
  | 'JOVEM_APRENDIZ' 
  | 'PRIMEIRO_EMPREGO';

export type UserType = CandidateProfileType | 'EMPRESA';

export interface UserAccount {
  id: string;
  nome: string;
  email: string;
  role: UserRole;
  profileType: CandidateProfileType;
  bairro: string;
  cidade: string;
  cpfOrCnpjMasked: string;
  avatarInitials: string;
  idade?: number;
  menorDeIdade?: boolean;
  responsavelLegal?: {
    nome: string;
    parentesco: string;
    cpf: string;
    telefone: string;
    termoAceito: boolean;
  };
  matriculaEscolar?: {
    instituicao: string;
    cursoOuSerie: string;
    turno: string;
    comprovanteValido: boolean;
  };
  empresaData?: {
    razaoSocial: string;
    nomeFantasia: string;
    cnpj: string;
    ramoAtuacao: string;
    cnae?: string;
    responsavelRh: string;
    telefone: string;
    cotaAprendizagemCumprida?: boolean;
    termoNaoCobrancaAceito?: boolean;
  };
}

export interface QuizQuestion {
  id: number;
  question: string;
  explanation: string;
  options: string[];
  correct: number;
}

export interface CaseStudy {
  id: string;
  title: string;
  character: string;
  scenario: string;
  criticalAnalysis: string;
  keyTakeaways: string[];
  badgeRelevance: string;
  interactiveOptions?: {
    question: string;
    choices: { text: string; correct: boolean; feedback: string }[];
  };
}

export interface CourseModule {
  id: string;
  number: number;
  title: string;
  summary: string;
  estimatedMinutes: number;
  content: {
    sections: {
      subheading: string;
      body: string[];
      highlightBox?: {
        type: 'info' | 'warning' | 'law' | 'calc';
        title: string;
        text: string;
      };
      asciiDiagram?: string;
      visualType?: 'triangle' | 'comparison-table' | 'holerite' | 'scam-shield' | 'work-hours';
    }[];
  };
}

export interface Course {
  id: string;
  trackId: string;
  trackName: string;
  category: 'Desenvolvimento Pessoal' | 'Administração e Negócios' | 'Tecnologia da Informação' | 'Legislação e Cidadania';
  targetAudienceType: CandidateProfileType[] | 'TODOS';
  title: string;
  subtitle: string;
  hours: number;
  equivalentHours: number;
  modality: string;
  targetAudience: string;
  prerequisites: string;
  badgeName: string;
  badgeCategory: string;
  badgeIcon: string;
  accentColor: string;
  level?: 'Iniciante' | 'Intermediário' | 'Avançado';
  learningObjectives: string[];
  modules: CourseModule[];
  caseStudies: CaseStudy[];
  quiz: QuizQuestion[];
}

export interface Track {
  id: string;
  name: string;
  category: string;
  description: string;
  targetAudienceType: CandidateProfileType[] | 'TODOS';
  hoursTotal: number;
  coursesCount: number;
  courseIds: string[];
  badgeReward: string;
  icon: string;
  accentColor: string;
}

export interface Badge {
  id: string;
  title: string;
  category: 'Trabalho' | 'Finanças' | 'Saúde Mental' | 'Atitude Profissional' | 'Ferramentas de Escritório';
  description: string;
  workloadHours: number;
  icon: string;
  color: string;
  dateEarned?: string;
  score?: number;
  codeVerificador?: string;
}

export interface Address {
  id: number;
  rua?: string;
  numero?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep?: string;
  latitude: number;
  longitude: number;
}

export interface Student {
  id: number;
  nome: string;
  email: string;
  profileType: CandidateProfileType;
  cpfMasked: string; // LGPD
  cpfRaw: string;
  dataNascimento: string;
  idade: number;
  escolaridade: string;
  turnoEscola: string;
  endereco: Address;
  badgesEarned: { badgeId: string; date: string; score: number; code: string }[];
  bio: string;
  telefoneMasked: string;
  telefoneRaw: string;
}

export interface JobVacancy {
  id: number;
  idEmpresa: number;
  empresaNome: string;
  empresaCnpjMasked: string;
  empresaValidadaCnpj: boolean;
  titulo: string;
  tipoVaga: 'Jovem Aprendiz' | 'Estagiário' | 'Primeiro Emprego' | 'Estudante' | 'Efetivo Júnior';
  descricao: string;
  bairro: string;
  cidade: string;
  remuneracao: number;
  beneficios: string[];
  cargaHorariaDiaria: number;
  horario: string;
  status: 'ATIVA' | 'PREENCHIDA' | 'CANCELADA';
  dataCriacao: string;
  badgesRequeridas: string[];
  candidatosInscritos: number;
  jaCandidatou?: boolean;
}

export interface Application {
  id: number;
  protocolo: string; // e.g. "#CAND-2026-88412"
  idVaga: number;
  vagaTitulo: string;
  empresaNome: string;
  bairroVaga: string;
  idAluno: number;
  alunoNome: string;
  alunoBairro: string;
  dataCandidatura: string;
  status: 'EM_ANALISE' | 'ENTREVISTA_AGENDADA' | 'APROVADO' | 'FINALIZADO';
  badgesCompatíveis: number;
  totalBadgesRequeridas: number;
  lgpdDadosLiberados: boolean;
  curriculoTipo?: 'PDF_ANEXADO' | 'DOCUMENTO' | 'CURRICULO_SKILLHUB';
  curriculoNomeArquivo?: string;
  cartaApresentacao?: string;
  respostasTriagem?: { pergunta: string; resposta: string }[];
}

export interface GuardrailLog {
  id: string;
  timestamp: string;
  type: 'LGPD_MASK' | 'CNPJ_VALIDATION' | 'ANTI_FRAUD_SCAN' | 'ANTI_HARASSMENT' | 'BADGE_INTEGRITY';
  status: 'BLOCKED' | 'ALLOWED' | 'PROTECTED';
  details: string;
  source: string;
}
