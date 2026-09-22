'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, CandidateProfileType, UserAccount, Student, JobVacancy, Badge, Application, GuardrailLog } from '@/types';
import { INITIAL_STUDENT, INITIAL_VAGAS, INITIAL_BADGES, INITIAL_APPLICATIONS, INITIAL_GUARDRAILS_LOGS } from '@/data/mockData';
import { COURSES } from '@/data/coursesData';

export type AppView = 
  | 'INICIO'
  | 'LOGIN'
  | 'DASHBOARD'
  | 'CURSOS_DISPONIVEIS'
  | 'MEUS_CURSOS'
  | 'TRILHAS_DISPONIVEIS'
  | 'MINHAS_TRILHAS'
  | 'MINHAS_AVALIACOES'
  | 'CURSOS'
  | 'TRILHAS'
  | 'CURSO_DETALHE'
  | 'MAPA_PROXIMIDADE'
  | 'HOLERITE'
  | 'BADGES_PERFIL'
  | 'RECRUTADOR_RH'
  | 'GUARDRAILS_DER';

interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  timestamp: string;
}

export interface UserSavedData {
  student: Student;
  completedModules: Record<string, string[]>;
  quizResults: Record<string, { score: number; passed: boolean; answers: number[]; date: string }>;
  badges: Badge[];
  applications: Application[];
  selectedCourseId: string;
  activeModuleIndex: number;
  candidateProfileType: CandidateProfileType;
  currentUser: UserAccount;
  lastView?: AppView;
  savedAt: string;
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  isAuthenticated: boolean;
  currentUser: UserAccount | null;
  candidateProfileType: CandidateProfileType;
  setCandidateProfileType: (type: CandidateProfileType) => void;
  loginUser: (email: string, role: UserRole, profileType?: CandidateProfileType, name?: string, isDemo?: boolean) => void;
  registerCandidate: (data: { 
    nome: string; 
    email: string; 
    profileType: CandidateProfileType; 
    bairro: string; 
    cpf: string;
    dataNascimento?: string;
    idade?: number;
    responsavelLegal?: { nome: string; parentesco: string; cpf: string; telefone: string; termoAceito: boolean };
    matriculaEscolar?: { instituicao: string; cursoOuSerie: string; turno: string; comprovanteValido: boolean };
  }) => void;
  registerCompany: (data: { 
    razaoSocial: string; 
    nomeFantasia: string; 
    cnpj: string; 
    bairro: string; 
    ramo: string; 
    responsavel: string; 
    email: string; 
    telefone: string;
    cnae?: string;
    porte?: string;
    cotaAprendizagemCumprida?: boolean;
    termoNaoCobrancaAceito?: boolean;
    declaracaoCotaLei10097?: boolean;
    termoCompromissoEstagioLei11788?: boolean;
    semCobrancaTaxas?: boolean;
    termoSigiloLGPD?: boolean;
  }) => void;
  logout: () => void;
  selectedCourseId: string;
  setSelectedCourseId: (id: string) => void;
  activeModuleIndex: number;
  setActiveModuleIndex: (index: number) => void;
  student: Student;
  vagas: JobVacancy[];
  badges: Badge[];
  applications: Application[];
  guardrailLogs: GuardrailLog[];
  completedModules: Record<string, string[]>; // courseId -> moduleIds[]
  quizResults: Record<string, { score: number; passed: boolean; answers: number[]; date: string }>;
  toasts: ToastNotification[];
  dismissToast: (id: string) => void;
  showToast: (title: string, message: string, type?: ToastNotification['type']) => void;
  openCourse: (courseId: string, moduleIndex?: number) => void;
  markModuleComplete: (courseId: string, moduleId: string) => void;
  submitCourseQuiz: (courseId: string, scorePercentage: number, userAnswers: number[]) => boolean;
  applyToJob: (
    vagaId: number, 
    details?: {
      curriculoTipo?: 'PDF_ANEXADO' | 'DOCUMENTO' | 'CURRICULO_SKILLHUB';
      curriculoNomeArquivo?: string;
      cartaApresentacao?: string;
      respostasTriagem?: { pergunta: string; resposta: string }[];
    }
  ) => { success: boolean; message: string; protocolo?: string };
  addNewVacancy: (vaga: Omit<JobVacancy, 'id' | 'dataCriacao' | 'candidatosInscritos' | 'empresaValidadaCnpj'>) => { success: boolean; message: string; blockedReason?: string };
  testAntiHarassment: (text: string) => { safe: boolean; flaggedTerms: string[]; sanitized: string };
  testCnpjValidation: (cnpj: string) => { valid: boolean; companyName?: string; status?: string };
  filterVagasByBairro: (bairro: string) => JobVacancy[];
  filterVagasByProfile: (profile?: CandidateProfileType, bairro?: string) => JobVacancy[];
  resetSimulator: () => void;
  getKnownAccounts: () => { email: string; nome: string; profileType: CandidateProfileType; date: string }[];
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const STORAGE_PREFIX = 'skillhub_user_';
const ACCOUNTS_INDEX_KEY = 'skillhub_registered_accounts';

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>('ALUNO');
  const [currentView, setCurrentView] = useState<AppView>('LOGIN');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [candidateProfileType, setCandidateProfileType] = useState<CandidateProfileType>('JOVEM_APRENDIZ');
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('curso-jovem-aprendiz-avancado');
  const [activeModuleIndex, setActiveModuleIndex] = useState<number>(0);

  const [student, setStudent] = useState<Student>(INITIAL_STUDENT);
  const [vagas, setVagas] = useState<JobVacancy[]>(INITIAL_VAGAS);
  const [badges, setBadges] = useState<Badge[]>(INITIAL_BADGES);
  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);
  const [guardrailLogs, setGuardrailLogs] = useState<GuardrailLog[]>(INITIAL_GUARDRAILS_LOGS);
  
  const [completedModules, setCompletedModules] = useState<Record<string, string[]>>({});
  const [quizResults, setQuizResults] = useState<Record<string, { score: number; passed: boolean; answers: number[]; date: string }>>({});

  // Tema Claro e Escuro
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const savedTheme = localStorage.getItem('skillhub_theme') as 'dark' | 'light' | null;
      const initialTheme = savedTheme === 'light' ? 'light' : 'dark';
      setTheme(initialTheme);
      document.documentElement.setAttribute('data-theme', initialTheme);
      if (initialTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('skillhub_theme', next);
      } catch {
        // ignore
      }
      document.documentElement.setAttribute('data-theme', next);
      if (next === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      showToast('Tema Alterado', `Modo ${next === 'dark' ? 'Escuro' : 'Claro'} ativado!`, 'info');
      return next;
    });
  };

  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const showToast = (title: string, message: string, type: ToastNotification['type'] = 'info') => {
    const newToast: ToastNotification = {
      id: 'toast-' + Date.now() + Math.random(),
      title,
      message,
      type,
      timestamp: new Date().toLocaleTimeString('pt-BR')
    };
    setToasts((prev) => [newToast, ...prev].slice(0, 4));
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Helper para salvar conta no índice de contas locais
  const recordAccountInIndex = (email: string, nome: string, profileType: CandidateProfileType) => {
    if (typeof window === 'undefined' || !email) return;
    try {
      const raw = localStorage.getItem(ACCOUNTS_INDEX_KEY);
      let list: { email: string; nome: string; profileType: CandidateProfileType; date: string }[] = raw ? JSON.parse(raw) : [];
      const cleanEmail = email.toLowerCase().trim();
      list = list.filter((a) => a.email.toLowerCase().trim() !== cleanEmail);
      list.unshift({
        email: cleanEmail,
        nome,
        profileType,
        date: new Date().toLocaleDateString('pt-BR')
      });
      localStorage.setItem(ACCOUNTS_INDEX_KEY, JSON.stringify(list.slice(0, 10)));
    } catch (e) {
      console.error('Erro ao indexar conta:', e);
    }
  };

  const getKnownAccounts = () => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(ACCOUNTS_INDEX_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  // SINCRONIZAÇÃO AUTOMÁTICA DO PROGRESSO DO USUÁRIO NO LOCALSTORAGE
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isAuthenticated && currentUser && currentUser.email && currentUser.email !== 'demo@skillhub.com.br' && currentUser.role === 'ALUNO') {
      const cleanEmail = currentUser.email.toLowerCase().trim();
      const storageKey = `${STORAGE_PREFIX}${cleanEmail}`;
      const dataToSave: UserSavedData = {
        student,
        completedModules,
        quizResults,
        badges,
        applications,
        selectedCourseId,
        activeModuleIndex,
        candidateProfileType,
        currentUser,
        lastView: currentView === 'LOGIN' ? 'DASHBOARD' : currentView,
        savedAt: new Date().toISOString()
      };
      try {
        localStorage.setItem(storageKey, JSON.stringify(dataToSave));
        recordAccountInIndex(cleanEmail, student.nome, candidateProfileType);
      } catch (err) {
        console.error('Erro ao persistir progresso do usuário:', err);
      }
    }
  }, [
    isAuthenticated,
    currentUser,
    student,
    completedModules,
    quizResults,
    badges,
    applications,
    selectedCourseId,
    activeModuleIndex,
    candidateProfileType,
    currentView
  ]);

  const openCourse = (courseId: string, moduleIndex?: number) => {
    setSelectedCourseId(courseId);
    if (moduleIndex !== undefined) {
      setActiveModuleIndex(moduleIndex);
    } else {
      // Retomar automaticamente de onde o aluno parou naquele curso
      const course = COURSES.find((c) => c.id === courseId);
      const doneList = completedModules[courseId] || [];
      if (course && doneList.length > 0 && doneList.length < course.modules.length) {
        setActiveModuleIndex(doneList.length);
      } else {
        setActiveModuleIndex(0);
      }
    }
    setCurrentView('CURSO_DETALHE');
  };

  const markModuleComplete = (courseId: string, moduleId: string) => {
    setCompletedModules((prev) => {
      const currentList = prev[courseId] || [];
      if (!currentList.includes(moduleId)) {
        showToast('Progresso Salvo', 'Módulo concluído e salvo no seu histórico!', 'success');
        return {
          ...prev,
          [courseId]: [...currentList, moduleId]
        };
      }
      return prev;
    });
  };

  const submitCourseQuiz = (courseId: string, scorePercentage: number, userAnswers: number[]): boolean => {
    const course = COURSES.find((c) => c.id === courseId);
    if (!course) return false;

    const passed = scorePercentage >= 70;
    const now = new Date().toLocaleDateString('pt-BR');

    setQuizResults((prev) => ({
      ...prev,
      [courseId]: {
        score: scorePercentage,
        passed,
        answers: userAnswers,
        date: now
      }
    }));

    if (passed) {
      // Emitir Badge respeitando o Guardrail de 70%
      const badgeCode = `SKILL-PR-2026-${Math.floor(1000 + Math.random() * 9000)}Z`;
      
      setBadges((prev) =>
        prev.map((b) =>
          b.title.toLowerCase().includes(course.badgeName.toLowerCase()) || b.id.includes(course.badgeCategory.toLowerCase())
            ? { ...b, dateEarned: now, score: scorePercentage, codeVerificador: badgeCode }
            : b
        )
      );

      setStudent((prev) => {
        const alreadyHas = prev.badgesEarned.some((b) => b.badgeId.includes(course.badgeCategory.toLowerCase()));
        if (!alreadyHas) {
          return {
            ...prev,
            badgesEarned: [
              ...prev.badgesEarned,
              {
                badgeId: 'badge-' + course.badgeCategory.toLowerCase(),
                date: now,
                score: scorePercentage,
                code: badgeCode
              }
            ]
          };
        }
        return prev;
      });

      // Registrar no log de auditoria de Guardrails
      const newLog: GuardrailLog = {
        id: 'glog-' + Date.now(),
        timestamp: `${now} ${new Date().toLocaleTimeString('pt-BR')}`,
        type: 'BADGE_INTEGRITY',
        status: 'ALLOWED',
        details: `Badge "${course.badgeName}" emitida com sucesso para o Aluno ${student.nome}. Nota: ${scorePercentage}% (Critério mínimo atendido: >= 70%).`,
        source: 'Serviço de Gamificação (Next.js Back-End)'
      };
      setGuardrailLogs((prev) => [newLog, ...prev]);

      showToast(
        '🎉 Parabéns! Badge Conquistada!',
        `Você atingiu ${scorePercentage}% e recebeu o selo oficial: ${course.badgeName}`,
        'success'
      );
      return true;
    } else {
      // Bloqueado pelo Guardrail
      const newLog: GuardrailLog = {
        id: 'glog-' + Date.now(),
        timestamp: `${now} ${new Date().toLocaleTimeString('pt-BR')}`,
        type: 'BADGE_INTEGRITY',
        status: 'BLOCKED',
        details: `Emissão de Badge para o curso "${course.title}" BLOQUEADA. Nota obtida (${scorePercentage}%) foi inferior ao corte de 70%.`,
        source: 'Guardrail de Gamificação & Certificação'
      };
      setGuardrailLogs((prev) => [newLog, ...prev]);

      showToast(
        'Nota Insuficiente para Badge',
        `Você obteve ${scorePercentage}%. A nota mínima de corte é 70%. Revise os módulos e tente novamente!`,
        'warning'
      );
      return false;
    }
  };

  const applyToJob = (
    vagaId: number,
    details?: {
      curriculoTipo?: 'PDF_ANEXADO' | 'DOCUMENTO' | 'CURRICULO_SKILLHUB';
      curriculoNomeArquivo?: string;
      cartaApresentacao?: string;
      respostasTriagem?: { pergunta: string; resposta: string }[];
    }
  ) => {
    const vaga = vagas.find((v) => v.id === vagaId);
    if (!vaga) return { success: false, message: 'Vaga não encontrada.' };

    const alreadyApplied = applications.some((a) => a.idVaga === vagaId && a.idAluno === student.id);
    if (alreadyApplied) {
      return { success: false, message: 'Você já se candidatou para esta vaga anteriormente.' };
    }

    // Calcular match de badges
    const userBadgeIds = student.badgesEarned.map((b) => b.badgeId);
    const badgesCompativeis = vaga.badgesRequeridas.filter((req) =>
      userBadgeIds.some((ub) => req.includes(ub.replace('badge-', '')) || ub.includes(req.replace('badge-', '')))
    ).length;

    const protocolCode = `#CAND-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    const newApp: Application = {
      id: Date.now(),
      protocolo: protocolCode,
      idVaga: vaga.id,
      vagaTitulo: vaga.titulo,
      empresaNome: vaga.empresaNome,
      bairroVaga: vaga.bairro,
      idAluno: student.id,
      alunoNome: student.nome,
      alunoBairro: student.endereco.bairro,
      dataCandidatura: new Date().toLocaleString('pt-BR'),
      status: 'EM_ANALISE',
      badgesCompatíveis: badgesCompativeis,
      totalBadgesRequeridas: vaga.badgesRequeridas.length,
      lgpdDadosLiberados: true,
      curriculoTipo: details?.curriculoTipo || 'CURRICULO_SKILLHUB',
      curriculoNomeArquivo: details?.curriculoNomeArquivo,
      cartaApresentacao: details?.cartaApresentacao,
      respostasTriagem: details?.respostasTriagem
    };

    setApplications((prev) => [newApp, ...prev]);
    setVagas((prev) =>
      prev.map((v) => (v.id === vagaId ? { ...v, candidatosInscritos: v.candidatosInscritos + 1, jaCandidatou: true } : v))
    );

    // Registrar log de liberação consentida de dados (LGPD)
    const newLog: GuardrailLog = {
      id: 'glog-' + Date.now(),
      timestamp: new Date().toLocaleString('pt-BR'),
      type: 'LGPD_MASK',
      status: 'ALLOWED',
      details: `Consentimento LGPD [${protocolCode}]: Aluno #${student.id} candidatou-se à vaga #${vaga.id} (${vaga.empresaNome}). Dados e currículo liberados exclusivamente para o RH.`,
      source: 'Módulo de Candidaturas (Candidaturas Table)'
    };
    setGuardrailLogs((prev) => [newLog, ...prev]);

    showToast(
      'Candidatura Protocolada!',
      `Protocolo ${protocolCode} emitido para ${vaga.titulo} na ${vaga.empresaNome}.`,
      'success'
    );

    return { success: true, message: 'Candidatura realizada com sucesso!', protocolo: protocolCode };
  };

  const addNewVacancy = (vagaData: Omit<JobVacancy, 'id' | 'dataCriacao' | 'candidatosInscritos' | 'empresaValidadaCnpj'>) => {
    const termosAbusivos = [
      'taxa', 'pagamento', 'pagar', 'comprar apostila', 'curso obrigatorio', 
      'modulo pago', 'investimento inicial', 'custo de matricula', 'taxa de inscricao'
    ];

    const textoCompleto = `${vagaData.titulo} ${vagaData.descricao}`.toLowerCase();
    const termoEncontrado = termosAbusivos.find((t) => textoCompleto.includes(t));

    if (termoEncontrado) {
      const blockedLog: GuardrailLog = {
        id: 'glog-' + Date.now(),
        timestamp: new Date().toLocaleString('pt-BR'),
        type: 'ANTI_FRAUD_SCAN',
        status: 'BLOCKED',
        details: `Publicação de vaga BLOQUEADA: Detectada menção a cobrança/termo abusivo: "${termoEncontrado}". A plataforma proíbe qualquer cobrança de taxas a jovens aprendizes.`,
        source: 'Algoritmo de Varredura Anti-Fraude'
      };
      setGuardrailLogs((prev) => [blockedLog, ...prev]);

      showToast(
        '⚠️ Publicação Bloqueada pelo Guardrail Anti-Fraude',
        `A vaga contém o termo restrito "${termoEncontrado}". Vagas para jovens aprendizes não podem exigir pagamentos.`,
        'error'
      );

      return {
        success: false,
        message: `Vaga bloqueada: Termo indevido "${termoEncontrado}" detectado.`,
        blockedReason: `A legislação trabalhista e os Guardrails do SkillHub proíbem cobrança de taxas em vagas de aprendizagem.`
      };
    }

    const newVaga: JobVacancy = {
      ...vagaData,
      id: Date.now(),
      dataCriacao: new Date().toLocaleDateString('pt-BR'),
      candidatosInscritos: 0,
      empresaValidadaCnpj: true,
      jaCandidatou: false
    };

    setVagas((prev) => [newVaga, ...prev]);

    const approvedLog: GuardrailLog = {
      id: 'glog-' + Date.now(),
      timestamp: new Date().toLocaleString('pt-BR'),
      type: 'CNPJ_VALIDATION',
      status: 'ALLOWED',
      details: `Vaga "${vagaData.titulo}" publicada pela empresa ${vagaData.empresaNome} após aprovação nos filtros de conformidade e integridade.`,
      source: 'Módulo de Vagas (Web API .NET)'
    };
    setGuardrailLogs((prev) => [approvedLog, ...prev]);

    showToast('Vaga Publicada!', `A vaga foi cadastrada com sucesso e está visível para candidatos no mapa.`, 'success');
    return { success: true, message: 'Vaga publicada com sucesso!' };
  };

  const testAntiHarassment = (text: string) => {
    const offensiveWords = [
      'idiota', 'burro', 'incompetente', 'lixo', 'assédio', 'gostosa', 'safado', 'dinheiro fácil', 'senha'
    ];
    const words = text.toLowerCase().split(/\s+/);
    const flagged = offensiveWords.filter((w) => words.some((inputWord) => inputWord.includes(w)));
    
    let sanitized = text;
    flagged.forEach((f) => {
      const reg = new RegExp(f, 'gi');
      sanitized = sanitized.replace(reg, '***[CONTEÚDO BLOQUEADO]***');
    });

    if (flagged.length > 0) {
      const log: GuardrailLog = {
        id: 'glog-' + Date.now(),
        timestamp: new Date().toLocaleString('pt-BR'),
        type: 'ANTI_HARASSMENT',
        status: 'BLOCKED',
        details: `Filtro de moderação bloqueou termos impróprios: ${flagged.join(', ')}. Texto higienizado automaticamente.`,
        source: 'Serviço de Moderação em Tempo Real'
      };
      setGuardrailLogs((prev) => [log, ...prev]);
    }

    return {
      safe: flagged.length === 0,
      flaggedTerms: flagged,
      sanitized
    };
  };

  const testCnpjValidation = (cnpj: string) => {
    const clean = cnpj.replace(/\D/g, '');
    if (clean.length !== 14) {
      return { valid: false, companyName: undefined, status: 'CNPJ com tamanho inválido (necessário 14 dígitos)' };
    }
    return {
      valid: true,
      companyName: 'Organização Curitiba Parceira LTDA',
      status: 'REGULAR / ATIVO NA RECEITA FEDERAL'
    };
  };

  const filterVagasByBairro = (bairro: string) => {
    if (!bairro || bairro === 'TODOS') return vagas;
    return vagas.filter((v) => v.bairro.toLowerCase() === bairro.toLowerCase());
  };

  const filterVagasByProfile = (profile?: CandidateProfileType, bairro?: string) => {
    const prof = profile || candidateProfileType;
    let list = [...vagas];

    if (prof === 'ESTAGIARIO') {
      list = list.filter((v) => v.tipoVaga === 'Estagiário');
    } else if (prof === 'JOVEM_APRENDIZ') {
      list = list.filter((v) => v.tipoVaga === 'Jovem Aprendiz');
    } else if (prof === 'PRIMEIRO_EMPREGO') {
      list = list.filter((v) => v.tipoVaga === 'Primeiro Emprego' || v.tipoVaga === 'Jovem Aprendiz');
    } else if (prof === 'ESTUDANTE') {
      list = list.filter((v) => v.tipoVaga === 'Estudante' || v.tipoVaga === 'Estagiário' || v.tipoVaga === 'Jovem Aprendiz');
    }

    if (bairro && bairro !== 'TODOS') {
      list = list.filter((v) => v.bairro.toLowerCase() === bairro.toLowerCase());
    }

    return list;
  };

  // LOGIN DO USUÁRIO COM RETOMADA DE ONDE PAROU
  const loginUser = (email: string, targetRole: UserRole, profileType: CandidateProfileType = 'JOVEM_APRENDIZ', name?: string, isDemo: boolean = false) => {
    setIsAuthenticated(true);
    setRole(targetRole);

    if (isDemo) {
      setCandidateProfileType(profileType);
      const demoAccount: UserAccount = {
        id: 'usr-demo',
        nome: 'Visitante (Demonstração)',
        email: 'demo@skillhub.com.br',
        role: 'ALUNO',
        profileType: profileType,
        bairro: 'Boqueirão',
        cidade: 'Curitiba',
        cpfOrCnpjMasked: '***.***.***-**',
        avatarInitials: 'DM',
        idade: 17,
        menorDeIdade: true
      };
      setCurrentUser(demoAccount);
      setCompletedModules({});
      setQuizResults({});
      setApplications([]);
      setBadges(INITIAL_BADGES.map((b) => ({ ...b, dateEarned: undefined, score: undefined, codeVerificador: undefined })));
      setVagas(INITIAL_VAGAS.map((v) => ({ ...v, jaCandidatou: false })));
      setStudent({
        ...INITIAL_STUDENT,
        id: 9999,
        nome: 'Visitante (Demonstração)',
        email: 'demo@skillhub.com.br',
        profileType: profileType,
        badgesEarned: [],
        bio: 'Navegação demonstrativa do SkillHub em Curitiba/PR.',
      });
      setCurrentView('DASHBOARD');
      showToast('Modo Demonstração Ativado', 'Você está navegando como visitante para conhecer as ferramentas do SkillHub.', 'info');
      return;
    }

    if (targetRole === 'RECRUTADOR') {
      const userName = name || 'Recrutador RH';
      const empAccount: UserAccount = {
        id: 'emp-' + Date.now(),
        nome: userName,
        email: email || 'rh@empresa.com.br',
        role: 'RECRUTADOR',
        profileType: 'JOVEM_APRENDIZ',
        bairro: 'Centro',
        cidade: 'Curitiba',
        cpfOrCnpjMasked: '12.345.678/0001-90',
        avatarInitials: userName.slice(0, 2).toUpperCase(),
        idade: 35,
        menorDeIdade: false
      };
      setCurrentUser(empAccount);
      setCurrentView('RECRUTADOR_RH');
      showToast('Bem-vindo(a) ao Portal RH', `Sessão iniciada como ${userName}`, 'success');
      return;
    }

    // CANDIDATO (ALUNO): VERIFICA SE JÁ EXISTE CONTA SALVA NO DISPOSITIVO
    const cleanEmail = (email || '').toLowerCase().trim();
    const storageKey = `${STORAGE_PREFIX}${cleanEmail}`;
    let savedData: UserSavedData | null = null;

    if (typeof window !== 'undefined' && cleanEmail) {
      try {
        const raw = localStorage.getItem(storageKey);
        if (raw) {
          savedData = JSON.parse(raw);
        }
      } catch (e) {
        console.error('Erro ao ler dados salvos:', e);
      }
    }

    if (savedData && savedData.student) {
      // CONTA EXISTENTE: RESTAURA EXATAMENTE DE ONDE A PESSOA PAROU!
      setCandidateProfileType(savedData.candidateProfileType || profileType || 'JOVEM_APRENDIZ');
      
      const restoredUser: UserAccount = savedData.currentUser || {
        id: 'usr-' + Date.now(),
        nome: savedData.student.nome,
        email: savedData.student.email,
        role: 'ALUNO',
        profileType: savedData.candidateProfileType || profileType,
        bairro: savedData.student.endereco?.bairro || 'Boqueirão',
        cidade: 'Curitiba',
        cpfOrCnpjMasked: savedData.student.cpfMasked || '***.***.***-**',
        avatarInitials: savedData.student.nome.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase(),
        idade: savedData.student.idade || 17,
        menorDeIdade: (savedData.student.idade || 17) < 18
      };
      setCurrentUser(restoredUser);
      setStudent(savedData.student);
      setCompletedModules(savedData.completedModules || {});
      setQuizResults(savedData.quizResults || {});
      setBadges(savedData.badges || INITIAL_BADGES);
      setApplications(savedData.applications || []);
      
      if (savedData.selectedCourseId) {
        setSelectedCourseId(savedData.selectedCourseId);
      }
      if (savedData.activeModuleIndex !== undefined) {
        setActiveModuleIndex(savedData.activeModuleIndex);
      }

      // Sincronizar vagas com status das candidaturas já feitas pelo usuário
      const appliedIds = new Set((savedData.applications || []).map((a) => a.idVaga));
      setVagas(INITIAL_VAGAS.map((v) => ({ ...v, jaCandidatou: appliedIds.has(v.id) })));

      const totalConcluidos = Object.values(savedData.completedModules || {}).reduce((acc, list) => acc + (list?.length || 0), 0);
      const totalSelos = (savedData.student.badgesEarned || []).length;
      const totalApps = (savedData.applications || []).length;

      const nextView = savedData.lastView && savedData.lastView !== 'LOGIN' ? savedData.lastView : 'DASHBOARD';
      setCurrentView(nextView);

      showToast(
        'Sessão e Progresso Restaurados! 🚀',
        `Olá de volta, ${savedData.student.nome}! Foram recuperados ${totalConcluidos} módulos concluídos, ${totalSelos} badges e ${totalApps} candidaturas.`,
        'success'
      );
    } else {
      // CONTA NOVA / PRIMEIRO LOGIN: COMEÇA DO ZERO ABSOLUTO
      const userName = name || (cleanEmail ? cleanEmail.split('@')[0] : 'Candidato(a)');
      const initials = userName.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();

      const newAccount: UserAccount = {
        id: 'usr-' + Date.now(),
        nome: userName,
        email: cleanEmail || 'candidato@email.com',
        role: 'ALUNO',
        profileType: profileType,
        bairro: 'Boqueirão',
        cidade: 'Curitiba',
        cpfOrCnpjMasked: '***.***.***-**',
        avatarInitials: initials,
        idade: 17,
        menorDeIdade: true
      };

      const newStudent: Student = {
        ...INITIAL_STUDENT,
        id: Date.now(),
        nome: userName,
        email: cleanEmail || 'candidato@email.com',
        profileType: profileType,
        badgesEarned: [],
        bio: `Estudante e candidato(a) no SkillHub em Curitiba/PR. Perfil: ${profileType}.`,
        endereco: {
          ...INITIAL_STUDENT.endereco,
          bairro: 'Boqueirão'
        }
      };

      setCandidateProfileType(profileType);
      setCurrentUser(newAccount);
      setCompletedModules({});
      setQuizResults({});
      setApplications([]);
      setBadges(INITIAL_BADGES.map((b) => ({ ...b, dateEarned: undefined, score: undefined, codeVerificador: undefined })));
      setVagas(INITIAL_VAGAS.map((v) => ({ ...v, jaCandidatou: false })));
      setStudent(newStudent);

      if (typeof window !== 'undefined' && cleanEmail) {
        try {
          const initialRecord: UserSavedData = {
            student: newStudent,
            completedModules: {},
            quizResults: {},
            badges: INITIAL_BADGES.map((b) => ({ ...b, dateEarned: undefined, score: undefined, codeVerificador: undefined })),
            applications: [],
            selectedCourseId: 'curso-jovem-aprendiz-avancado',
            activeModuleIndex: 0,
            candidateProfileType: profileType,
            currentUser: newAccount,
            lastView: 'DASHBOARD',
            savedAt: new Date().toISOString()
          };
          localStorage.setItem(storageKey, JSON.stringify(initialRecord));
          recordAccountInIndex(cleanEmail, userName, profileType);
        } catch (e) {
          console.error(e);
        }
      }

      setCurrentView('DASHBOARD');
      showToast('Bem-vindo(a) ao SkillHub!', `Conta criada para ${userName}. Seu progresso será salvo automaticamente!`, 'success');
    }
  };

  const registerCandidate = (data: { 
    nome: string; 
    email: string; 
    profileType: CandidateProfileType; 
    bairro: string; 
    cpf: string;
    dataNascimento?: string;
    idade?: number;
    responsavelLegal?: { nome: string; parentesco: string; cpf: string; telefone: string; termoAceito: boolean };
    matriculaEscolar?: { instituicao: string; cursoOuSerie: string; turno: string; comprovanteValido: boolean };
  }) => {
    setIsAuthenticated(true);
    setRole('ALUNO');
    setCandidateProfileType(data.profileType);

    const cleanEmail = data.email.toLowerCase().trim();
    const initials = data.nome.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();
    const cleanCpf = data.cpf.replace(/\D/g, '');
    const maskedCpf = cleanCpf.length === 11 
      ? `***.${cleanCpf.slice(3, 6)}.${cleanCpf.slice(6, 9)}-**`
      : '***.482.919-**';

    const isMinor = (data.idade !== undefined && data.idade < 18) || (data.dataNascimento ? new Date().getFullYear() - new Date(data.dataNascimento).getFullYear() < 18 : true);

    const account: UserAccount = {
      id: 'cand-' + Date.now(),
      nome: data.nome,
      email: cleanEmail,
      role: 'ALUNO',
      profileType: data.profileType,
      bairro: data.bairro || 'Boqueirão',
      cidade: 'Curitiba',
      cpfOrCnpjMasked: maskedCpf,
      avatarInitials: initials,
      idade: data.idade || 17,
      menorDeIdade: isMinor,
      responsavelLegal: data.responsavelLegal,
      matriculaEscolar: data.matriculaEscolar
    };

    const newStudent: Student = {
      ...INITIAL_STUDENT,
      id: Date.now(),
      nome: data.nome,
      email: cleanEmail,
      profileType: data.profileType,
      cpfMasked: maskedCpf,
      idade: data.idade || 17,
      badgesEarned: [],
      escolaridade: data.matriculaEscolar?.cursoOuSerie || 'Ensino Médio Regular',
      turnoEscola: data.matriculaEscolar?.turno || 'Manhã',
      bio: `Estudante e candidato(a) no SkillHub em Curitiba/PR. Perfil: ${data.profileType}.`,
      endereco: {
        ...INITIAL_STUDENT.endereco,
        bairro: data.bairro || 'Boqueirão'
      }
    };

    setCurrentUser(account);
    setCompletedModules({});
    setQuizResults({});
    setApplications([]);
    setBadges(INITIAL_BADGES.map((b) => ({ ...b, dateEarned: undefined, score: undefined, codeVerificador: undefined })));
    setVagas(INITIAL_VAGAS.map((v) => ({ ...v, jaCandidatou: false })));
    setStudent(newStudent);

    // Salvar imediatamente no LocalStorage
    if (typeof window !== 'undefined' && cleanEmail) {
      try {
        const storageKey = `${STORAGE_PREFIX}${cleanEmail}`;
        const initialRecord: UserSavedData = {
          student: newStudent,
          completedModules: {},
          quizResults: {},
          badges: INITIAL_BADGES.map((b) => ({ ...b, dateEarned: undefined, score: undefined, codeVerificador: undefined })),
          applications: [],
          selectedCourseId: 'curso-jovem-aprendiz-avancado',
          activeModuleIndex: 0,
          candidateProfileType: data.profileType,
          currentUser: account,
          lastView: 'DASHBOARD',
          savedAt: new Date().toISOString()
        };
        localStorage.setItem(storageKey, JSON.stringify(initialRecord));
        recordAccountInIndex(cleanEmail, data.nome, data.profileType);
      } catch (e) {
        console.error('Erro ao salvar registro de cadastro:', e);
      }
    }

    // Log de auditoria LGPD se menor
    if (isMinor) {
      const log: GuardrailLog = {
        id: 'glog-' + Date.now(),
        timestamp: new Date().toLocaleString('pt-BR'),
        type: 'LGPD_MASK',
        status: 'PROTECTED',
        details: `Cadastro de menor de 18 anos protegido. Responsável Legal: ${data.responsavelLegal?.nome || 'Validado'}. Autorização registrada conforme LGPD e Lei do Menor.`,
        source: 'Módulo de Cadastro de Menores'
      };
      setGuardrailLogs((prev) => [log, ...prev]);
    }

    setCurrentView('DASHBOARD');
    showToast('Conta Criada com Sucesso!', `Bem-vindo(a) ao SkillHub, ${data.nome}!`, 'success');
  };

  const registerCompany = (data: { 
    razaoSocial: string; 
    nomeFantasia: string; 
    cnpj: string; 
    bairro: string; 
    ramo: string; 
    cnae?: string; 
    responsavel: string; 
    email: string; 
    telefone: string;
    cotaAprendizagemCumprida?: boolean;
    termoNaoCobrancaAceito?: boolean;
  }) => {
    setIsAuthenticated(true);
    setRole('RECRUTADOR');

    const cleanCnpj = data.cnpj.replace(/\D/g, '');
    const maskedCnpj = cleanCnpj.length === 14 
      ? `${cleanCnpj.slice(0, 2)}.${cleanCnpj.slice(2, 5)}.${cleanCnpj.slice(5, 8)}/${cleanCnpj.slice(8, 12)}-${cleanCnpj.slice(12, 14)}`
      : '12.345.678/0001-90';

    const account: UserAccount = {
      id: 'emp-' + Date.now(),
      nome: data.responsavel || data.nomeFantasia,
      email: data.email,
      role: 'RECRUTADOR',
      profileType: 'JOVEM_APRENDIZ',
      bairro: data.bairro,
      cidade: 'Curitiba',
      cpfOrCnpjMasked: maskedCnpj,
      avatarInitials: (data.nomeFantasia || 'EM').slice(0, 2).toUpperCase(),
      empresaData: {
        razaoSocial: data.razaoSocial,
        nomeFantasia: data.nomeFantasia,
        cnpj: data.cnpj,
        ramoAtuacao: data.ramo,
        cnae: data.cnae || '78.10-8-00',
        responsavelRh: data.responsavel,
        telefone: data.telefone,
        cotaAprendizagemCumprida: data.cotaAprendizagemCumprida !== false,
        termoNaoCobrancaAceito: data.termoNaoCobrancaAceito !== false
      }
    };

    setCurrentUser(account);

    const log: GuardrailLog = {
      id: 'glog-' + Date.now(),
      timestamp: new Date().toLocaleString('pt-BR'),
      type: 'CNPJ_VALIDATION',
      status: 'ALLOWED',
      details: `Empresa "${data.razaoSocial}" (CNPJ: ${maskedCnpj}) homologada com sucesso. Termos da Lei 10.097 e LGPD de Menores assinados digitalmente.`,
      source: 'Módulo de Compliance e Cadastro Empresarial'
    };
    setGuardrailLogs((prev) => [log, ...prev]);

    setCurrentView('RECRUTADOR_RH');
    showToast('Empresa Homologada!', `Sua empresa ${data.nomeFantasia} já pode publicar vagas em Curitiba!`, 'success');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setCurrentView('LOGIN');
    showToast('Sessão Encerrada', 'Você saiu com segurança do sistema.', 'info');
  };

  const resetSimulator = () => {
    setStudent(INITIAL_STUDENT);
    setVagas(INITIAL_VAGAS);
    setBadges(INITIAL_BADGES);
    setApplications(INITIAL_APPLICATIONS);
    setGuardrailLogs(INITIAL_GUARDRAILS_LOGS);
    setCompletedModules({
      'curso-jovem-aprendiz-avancado': ['mod-1', 'mod-2'],
      'curso-curriculo-plataformas': ['cur-mod-1']
    });
    showToast('Demonstração Restaurada', 'Dados restaurados para os valores padrão do sistema.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        currentView,
        setCurrentView,
        isSidebarOpen,
        setIsSidebarOpen,
        toggleSidebar,
        isAuthenticated,
        currentUser,
        candidateProfileType,
        setCandidateProfileType,
        loginUser,
        registerCandidate,
        registerCompany,
        logout,
        selectedCourseId,
        setSelectedCourseId,
        activeModuleIndex,
        setActiveModuleIndex,
        student,
        vagas,
        badges,
        applications,
        guardrailLogs,
        completedModules,
        quizResults,
        toasts,
        dismissToast,
        showToast,
        openCourse,
        markModuleComplete,
        submitCourseQuiz,
        applyToJob,
        addNewVacancy,
        testAntiHarassment,
        testCnpjValidation,
        filterVagasByBairro,
        filterVagasByProfile,
        resetSimulator,
        getKnownAccounts,
        theme,
        toggleTheme
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
