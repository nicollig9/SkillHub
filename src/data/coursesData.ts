import { Course, Track } from '@/types';

export const TRACKS: Track[] = [
  // =========================================================================
  // 🟢 TRILHAS NÍVEL INICIANTE
  // =========================================================================
  {
    id: 'trilha-embaixador-primeiro-emprego',
    name: 'Formação Embaixador do Primeiro Emprego',
    level: 'Iniciante',
    category: 'Desenvolvimento Pessoal',
    description: 'Preparação acelerada para encarar processos seletivos e conquistar a primeira oportunidade formal.',
    targetAudienceType: 'TODOS',
    hoursTotal: 36,
    coursesCount: 3,
    badgeReward: 'Embaixador do Primeiro Emprego',
    icon: 'GraduationCap',
    accentColor: '#10B981',
    courseIds: [
      'curso-preparacao-entrevistas-processos-seletivos',
      'curso-soft-skills-comunicacao-interpessoal',
      'curso-gestao-tempo-produtividade-iniciante'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Preparação para Entrevistas e Processos Seletivos',
        subtitle: 'Currículo de impacto, ATS, postura em entrevistas e dinâmicas',
        description: 'Construção da base do candidato, currículo otimizado e técnicas para se destacar diante de recrutadores.',
        courseId: 'curso-preparacao-entrevistas-processos-seletivos',
        hours: 12
      },
      {
        stepNumber: 2,
        title: 'Soft Skills e Comunicação Interpessoal',
        subtitle: 'Escuta ativa, convivência corporativa e comunicação assertiva',
        description: 'Desenvolvimento de postura profissional, empatia e alinhamento em equipes de trabalho.',
        courseId: 'curso-soft-skills-comunicacao-interpessoal',
        hours: 12
      },
      {
        stepNumber: 3,
        title: 'Gestão do Tempo e Produtividade',
        subtitle: 'Matriz de Eisenhower, foco absoluto e rotina de estudos e trabalho',
        description: 'Priorização de demandas, eliminação de distrações e organização da rotina para o dia a dia.',
        courseId: 'curso-gestao-tempo-produtividade-iniciante',
        hours: 12
      }
    ]
  },
  {
    id: 'trilha-comunicacao-relacionamento',
    name: 'Formação Comunicação & Relacionamento Profissional',
    level: 'Iniciante',
    category: 'Desenvolvimento Pessoal',
    description: 'Desenvolvimento da expressão oral, escrita e convivência harmoniosa em ambientes corporativos.',
    targetAudienceType: 'TODOS',
    hoursTotal: 24,
    coursesCount: 2,
    badgeReward: 'Mestre em Comunicação Interpessoal',
    icon: 'Sparkles',
    accentColor: '#10B981',
    courseIds: [
      'curso-soft-skills-comunicacao-interpessoal',
      'curso-rotinas-praticas-profissionalizantes'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Soft Skills e Comunicação Interpessoal',
        subtitle: 'Habilidades comportamentais e inteligência relacional',
        description: 'Postura empática, quebra de ruídos na comunicação e convivência construtiva.',
        courseId: 'curso-soft-skills-comunicacao-interpessoal',
        hours: 12
      },
      {
        stepNumber: 2,
        title: 'Rotinas Administrativas (Comunicação e Atendimento)',
        subtitle: 'Atendimento corporativo e postura institucional',
        description: 'Comunicação empresarial formal, atendimento humanizado e relacionamento profissional.',
        courseId: 'curso-rotinas-praticas-profissionalizantes',
        hours: 12
      }
    ]
  },

  // =========================================================================
  // 🟡 TRILHAS NÍVEL INTERMEDIÁRIO
  // =========================================================================
  {
    id: 'trilha-gestor-rotinas-administrativas',
    name: 'Formação Gestor de Rotinas Administrativas',
    level: 'Intermediário',
    category: 'Administração e Negócios',
    description: 'Capacitação completa em rotinas de escritório, redação formal, gestão documental e LGPD.',
    targetAudienceType: ['JOVEM_APRENDIZ', 'ESTAGIARIO', 'PRIMEIRO_EMPREGO'],
    hoursTotal: 36,
    coursesCount: 3,
    badgeReward: 'Especialista em Serviços Administrativos',
    icon: 'Briefcase',
    accentColor: '#F59E0B',
    courseIds: [
      'curso-rotinas-praticas-profissionalizantes',
      'curso-lgpd-seguranca-dados',
      'curso-hard-skills-excel-ferramentas-digitais'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Rotinas Administrativas e Práticas Profissionalizantes',
        subtitle: 'Comunicação empresarial, fluxos de documentos e rotinas de escritório',
        description: 'Organização de processos internos, gestão de informação e atendimento corporativo.',
        courseId: 'curso-rotinas-praticas-profissionalizantes',
        hours: 12
      },
      {
        stepNumber: 2,
        title: 'Módulo LGPD e Confidencialidade',
        subtitle: 'Segurança digital, privacidade e conformidade com a LGPD',
        description: 'Tratamento de dados pessoais corporativos, princípios de sigilo e prevenção de incidentes de dados.',
        courseId: 'curso-lgpd-seguranca-dados',
        hours: 12
      },
      {
        stepNumber: 3,
        title: 'Hard Skills e Ferramentas Digitais (Nuvem e Workspace)',
        subtitle: 'Google Workspace, nuvem e ferramentas digitais de escritório',
        description: 'Uso profissional do ecossistema em nuvem, organização colaborativa de arquivos e produtividade.',
        courseId: 'curso-hard-skills-excel-ferramentas-digitais',
        hours: 12
      }
    ]
  },
  {
    id: 'trilha-analista-dados-planilhas',
    name: 'Formação Analista de Dados & Planilhas (Excel/Docs)',
    level: 'Intermediário',
    category: 'Tecnologia da Informação',
    description: 'Domínio prático de planilhas eletrônicas para controle financeiro, cadastros e dashboards.',
    targetAudienceType: ['ESTAGIARIO', 'JOVEM_APRENDIZ', 'PRIMEIRO_EMPREGO'],
    hoursTotal: 24,
    coursesCount: 2,
    badgeReward: 'Especialista em Planilhas e Operações',
    icon: 'Table',
    accentColor: '#F59E0B',
    courseIds: [
      'curso-excel-iniciante',
      'curso-excel-basico-avancado'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Hard Skills (Fórmulas Básicas, SOMA e MÉDIA)',
        subtitle: 'Excel do Zero: Primeiras Planilhas, Cálculos e Gráficos',
        description: 'Estruturação da grade, tipos de dados, formatação profissional e funções matemáticas fundamentais.',
        courseId: 'curso-excel-iniciante',
        hours: 12
      },
      {
        stepNumber: 2,
        title: 'Hard Skills Avançado (PROCV e Formatação Condicional)',
        subtitle: 'Microsoft Excel & Planilhas Eletrônicas para Escritório',
        description: 'Tabelas dinâmicas, PROCV, funções lógicas SE e automação de relatórios visuais de apoio à tomada de decisão.',
        courseId: 'curso-excel-basico-avancado',
        hours: 12
      }
    ]
  },
  {
    id: 'trilha-educacao-financeira-contracheque',
    name: 'Formação Educação Financeira & Leitura de Contracheque',
    level: 'Intermediário',
    category: 'Desenvolvimento Pessoal',
    description: 'Gestão do primeiro salário, economia pessoal e compreensão dos direitos e descontos no holerite.',
    targetAudienceType: 'TODOS',
    hoursTotal: 24,
    coursesCount: 2,
    badgeReward: 'Jovem Consciente & Gestor Financeiro',
    icon: 'DollarSign',
    accentColor: '#F59E0B',
    courseIds: [
      'curso-planejamento-orcamento',
      'curso-orcamento-primeiro-salario'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Gestão Financeira e Método 50-30-20',
        subtitle: 'Planejamento Financeiro, Orçamento e Reserva de Emergência',
        description: 'Mapeamento de despesas, regra 50-30-20, controle de gastos impulsivos e estruturação da reserva financeira.',
        courseId: 'curso-planejamento-orcamento',
        hours: 12
      },
      {
        stepNumber: 2,
        title: 'Rotinas Financeiras, Holerite, INSS e VTs',
        subtitle: 'Orçamento do Primeiro Salário e Leitura de Contracheque',
        description: 'Compreensão de salário bruto vs. líquido, descontos obrigatórios (INSS, VT) e direitos do trabalhador.',
        courseId: 'curso-orcamento-primeiro-salario',
        hours: 12
      }
    ]
  },

  // =========================================================================
  // 🔴 TRILHAS NÍVEL AVANÇADO
  // =========================================================================
  {
    id: 'trilha-produtividade-ia-trabalho',
    name: 'Formação Produtividade & Inteligência Artificial no Trabalho',
    level: 'Avançado',
    category: 'Tecnologia da Informação',
    description: 'Uso de IAs gerativas como copilotos para criação de textos, relatórios e automação de escritório.',
    targetAudienceType: ['ESTAGIARIO', 'JOVEM_APRENDIZ', 'PRIMEIRO_EMPREGO'],
    hoursTotal: 24,
    coursesCount: 2,
    badgeReward: 'Especialista em Produtividade Digital com IA',
    icon: 'Zap',
    accentColor: '#F43F5E',
    courseIds: [
      'curso-inteligencia-artificial-pratica',
      'curso-ia-produtividade'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Inteligência Artificial Prática (Prompts e Copiloto)',
        subtitle: 'Prompt Engineering e o conceito de copiloto inteligente',
        description: 'Técnicas avançadas de formulação de prompts, mitigação de alucinações e uso da IA como acelerador de tarefas.',
        courseId: 'curso-inteligencia-artificial-pratica',
        hours: 12
      },
      {
        stepNumber: 2,
        title: 'Automação, Síntese e Tom de Voz',
        subtitle: 'Inteligência Artificial e Automação no Dia a Dia de Trabalho',
        description: 'Geração de minutas, relatórios executivos, resumos analíticos e fluxos integrados de trabalho.',
        courseId: 'curso-ia-produtividade',
        hours: 12
      }
    ]
  },
  {
    id: 'trilha-pesquisa-conhecimento-notebooklm',
    name: 'Formação Pesquisa & Gestão do Conhecimento com NotebookLM',
    level: 'Avançado',
    category: 'Tecnologia da Informação',
    description: 'Criação de bases de conhecimento privadas ancoradas em documentos e produção de podcasts automáticos.',
    targetAudienceType: ['ESTAGIARIO', 'JOVEM_APRENDIZ', 'PRIMEIRO_EMPREGO', 'ESTUDANTE'],
    hoursTotal: 24,
    coursesCount: 2,
    badgeReward: 'Arquiteto de Conhecimento & IA de Fontes',
    icon: 'BookOpen',
    accentColor: '#F43F5E',
    courseIds: [
      'curso-produtividade-notebooklm'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'NotebookLM: Ancoramento (Grounding) e Citações Diretas',
        subtitle: 'IA Baseada Exclusivamente nas Suas Próprias Fontes',
        description: 'Upload de documentos corporativos e auditoria instantânea com citações numéricas interativas.',
        courseId: 'curso-produtividade-notebooklm',
        hours: 12
      },
      {
        stepNumber: 2,
        title: 'Formatos Multimodais: FAQs, Guias de Estudo e Audio Overview',
        subtitle: 'Geração de Podcasts Executivos e Material de Treinamento',
        description: 'Criação de podcasts automáticos a duas vozes e sínteses executivas em linguagem natural.',
        courseId: 'curso-produtividade-notebooklm',
        hours: 12
      }
    ]
  },
  {
    id: 'trilha-tecnologia-gestao-aprendiz-pro',
    name: 'Formação Completa em Tecnologia & Gestão (Jovem Aprendiz Pró)',
    level: 'Avançado',
    category: 'Tecnologia da Informação',
    description: 'Trilha master que combina gestão administrativa, hard skills e tecnologia moderna.',
    targetAudienceType: ['JOVEM_APRENDIZ', 'ESTAGIARIO', 'PRIMEIRO_EMPREGO'],
    hoursTotal: 48,
    coursesCount: 4,
    badgeReward: 'Líder Aprendiz & Profissional do Futuro',
    icon: 'Award',
    accentColor: '#F43F5E',
    courseIds: [
      'curso-rotinas-praticas-profissionalizantes',
      'curso-hard-skills-excel-ferramentas-digitais',
      'curso-inteligencia-artificial-pratica',
      'curso-produtividade-notebooklm'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Rotinas Administrativas e LGPD',
        subtitle: 'Comunicação Empresarial, Sigilo e Privacidade de Dados',
        description: 'Boas práticas corporativas de conformidade, redação institucional e atendimento de processos internos.',
        courseId: 'curso-rotinas-praticas-profissionalizantes',
        hours: 12
      },
      {
        stepNumber: 2,
        title: 'Hard Skills (Excel e Nuvem)',
        subtitle: 'Planilhas Eletrônicas e Armazenamento Colaborativo em Nuvem',
        description: 'Construção de planilhas dinâmicas, controle de operações e colaboração em tempo real no Google Workspace.',
        courseId: 'curso-hard-skills-excel-ferramentas-digitais',
        hours: 12
      },
      {
        stepNumber: 3,
        title: 'Inteligência Artificial Prática',
        subtitle: 'Engenharia de Prompts e Copilotos Generativos',
        description: 'Automação de redação de documentos e aceleração de rotinas administrativas com IA.',
        courseId: 'curso-inteligencia-artificial-pratica',
        hours: 12
      },
      {
        stepNumber: 4,
        title: 'Produtividade com NotebookLM',
        subtitle: 'IA Ancorada em Fontes e Produção de Conteúdo Multimodal',
        description: 'Domínio do NotebookLM para centralização de manuais, normas e geração de áudio explicativo.',
        courseId: 'curso-produtividade-notebooklm',
        hours: 12
      }
    ]
  }
];

// =========================================================================
// CURSO OFICIAL: EQUILÍBRIO EMOCIONAL, ANSIEDADE E FOCO NO TRABALHO
// =========================================================================
export const CURSO_EQUILIBRIO_EMOCIONAL: Course = {
  id: 'curso-saude-mental-trabalho',
  published: true,
  isPublished: true,
  active: true,
  visible: true,
  trackId: 'trilha-2',
  trackName: 'TRILHA 2: Soft Skills, Postura & Comunicação Corporativa',
  category: 'Desenvolvimento Pessoal',
  targetAudienceType: 'TODOS',
  title: 'Equilíbrio Emocional, Ansiedade e Foco no Trabalho',
  subtitle: 'Capacitar o profissional a identificar gatilhos de estresse e ansiedade no ambiente corporativo, aplicar técnicas de autorregulação emocional e mindfulness, manter o foco em tarefas complexas e construir uma rotina de trabalho mentalmente saudável e sustentável.',
  hours: 12,
  equivalentHours: 12,
  modality: 'EAD 100% Gratuito (Escola Virtual)',
  targetAudience: 'Estudantes, aprendizes e profissionais em transição ou atuação no mercado de trabalho',
  prerequisites: 'Nenhum pré-requisito.',
  badgeName: 'Equilíbrio Emocional & Foco',
  badgeCategory: 'Saúde Mental & Carreira',
  videoUrl: 'https://youtu.be/PAVaaGa_gug?si=JYdOWSYOz0oJj5TH',
  youtubeId: 'PAVaaGa_gug',
  badgeIcon: 'HeartPulse',
  accentColor: '#EC4899',
  level: 'Iniciante',
  learningObjectives: [
    'Identificar o mecanismo biológico do estresse no trabalho, compreendendo as diferenças entre Eustresse (positivo) e Distresse (negativo).',
    'Mapear gatilhos individuais internos (perfeccionismo, síndrome do impostor) e externos (pressões, reuniões e cobranças).',
    'Aplicar técnicas de autorregulação fisiológica e respiratória como Respiração Quadrada (Box Breathing) e Técnica 4-7-8.',
    'Praticar a reestruturação cognitiva contra a catastrofização, focando em fatos e planos de ação práticos.',
    'Implementar o Trabalho Profundo (Deep Work) e a pausa estratégica com o método S.T.O.P. de Mindfulness Corporativo.',
    'Estabelecer fronteiras e desconexão digital no expediente, prevenindo precocemente os sinais e estágios da Síndrome de Burnout.'
  ],
  modules: [
    {
      id: 'sau-mod-1',
      number: 1,
      title: 'MÓDULO 1: Inteligência Emocional e Mapeamento de Gatilhos',
      summary: 'O primeiro passo para o equilíbrio emocional é o autoconhecimento. O ambiente corporativo expõe os profissionais a pressões constantes, prazos curtos e conflitos interpessoais. Entender como o corpo e a mente reagem a esses estímulos é fundamental para evitar a exaustão.',
      estimatedMinutes: 45,
      content: {
        sections: [
          {
            subheading: '1. O Mecanismo do Estresse no Trabalho',
            body: [
              'O primeiro passo para o equilíbrio emocional é o autoconhecimento. O ambiente corporativo expõe os profissionais a pressões constantes, prazos curtos e conflitos interpessoais. Entender como o corpo e a mente reagem a esses estímulos é fundamental para evitar a exaustão.',
              'O estresse é uma resposta biológica natural de preservação. No entanto, quando ativado de forma crônica no escritório (reação de "luta ou fuga"), ele libera cortisol e adrenalina continuamente, prejudicando o raciocínio lógico e a tomada de decisões.',
              '• Estresse Positivo (Eustresse): O nível de ativação saudável que gera motivação, foco e impulso para cumprir prazos.',
              '• Estresse Negativo (Distresse): A sobrecarga contínua que gera paralisia, irritabilidade, esquecimentos e exaustão física.'
            ],
            highlightBox: {
              type: 'info',
              title: 'Eustresse vs. Distresse',
              text: 'O eustresse é o nível produtivo de energia que nos move. O perigo é a sobrecarga constante sem descanso, que descamba para o distresse crônico.'
            }
          },
          {
            subheading: '2. Mapeamento de Gatilhos Individuais',
            body: [
              'Cada profissional reage de forma diferente aos estímulos do trabalho. O mapeamento consiste em identificar as situações específicas que desencadeiam picos de ansiedade:',
              '• Gatilhos Internos: Perfeccionismo extremo, medo de errar, síndrome do impostor e necessidade contínua de aprovação.',
              '• Gatilhos Externos: E-mails de cobrança, reuniões de última hora, sobrecarga de demandas e comunicação agressiva de terceiros.'
            ],
            asciiDiagram: `┌────────────────────────────────────────────────────────┐
│           MAPEAMENTO DE GATILHOS CORPORATIVOS          │
├────────────────────────────────────────────────────────┤
│ GATILHOS INTERNOS:                                     │
│ • Perfeccionismo ──► Medo de errar ──► Procrastinação  │
│ • Síndrome do Impostor ──► Insegurança contínua        │
├────────────────────────────────────────────────────────┤
│ GATILHOS EXTERNOS:                                     │
│ • Demandas urgentes ──► Sobrecarga ──► Desorganização  │
│ • Cobranças e prazos ──► Reação de Luta ou Fuga        │
└────────────────────────────────────────────────────────┘`
          }
        ]
      }
    },
    {
      id: 'sau-mod-2',
      number: 2,
      title: 'MÓDULO 2: Técnicas de Autorregulação e Gestão da Ansiedade',
      summary: 'A ansiedade manifesta-se quando a mente antecipa cenários futuros catastróficos. A autorregulação emocional reúne ferramentas práticas para trazer a atenção de volta ao presente e acalmar o sistema nervoso autônomo.',
      estimatedMinutes: 45,
      content: {
        sections: [
          {
            subheading: '1. Técnicas Respiratórias para Redução Ansiolítica',
            body: [
              'A ansiedade manifesta-se quando a mente antecipa cenários futuros catastróficos. A autorregulação emocional reúne ferramentas práticas para trazer a atenção de volta ao presente e acalmar o sistema nervoso autônomo.',
              'A respiração é a ponte direta para ativar o sistema nervoso parassimpático, desacelerando os batimentos cardíacos:',
              '• Respiração Quadrada (Box Breathing): Inspirar em 4 segundos, reter o ar por 4 segundos, expirar em 4 segundos e manter os pulmões vazios por 4 segundos. Ideal para fazer antes de reuniões decisivas.',
              '• Técnica 4-7-8: Inspirar em 4 segundos, reter o ar por 7 segundos e soltar o ar lentamente pela boca durante 8 segundos.'
            ],
            highlightBox: {
              type: 'calc',
              title: 'Respiração Quadrada (Box Breathing)',
              text: 'Inspire em 4s ──► Segure em 4s ──► Expire em 4s ──► Pause em 4s. Pratique rodadas conscientes para normalizar batimentos e clarear o raciocínio.'
            }
          },
          {
            subheading: '2. Reestruturação Cognitiva',
            body: [
              'Diante de uma crise de ansiedade ou de um erro no projeto, a mente costuma criar distorções cognitivas (catastrofização). A reestruturação é o ato de questionar o pensamento ansiogênico com fatos concretos:',
              '• Pensamento Ansiogênico: "Apresentei o relatório com um dado incorreto, serei demitido imediatamente."',
              '• Questionamento Racional: "O dado foi corrigido a tempo? Qual é a probabilidade real de demissão por esse fato isolado? Qual o plano de ação prático agora?"'
            ],
            highlightBox: {
              type: 'warning',
              title: 'Fatos vs. Suposições',
              text: 'Não tome pensamentos catastróficos como certezas. Busque fatos observáveis e estruture um plano de resolução prático em vez de alimentar o pânico.'
            }
          }
        ]
      }
    },
    {
      id: 'sau-mod-3',
      number: 3,
      title: 'MÓDULO 3: Foco Profundo (Deep Work) e Atenção Plena',
      summary: 'A oscilação emocional corrói a capacidade de concentração. Em um ambiente repleto de notificações, manter o foco em tarefas complexas exige estratégias deliberadas de proteção mental.',
      estimatedMinutes: 45,
      content: {
        sections: [
          {
            subheading: '1. O Estado de Flow e o Trabalho Profundo (Deep Work)',
            body: [
              'O conceito de Deep Work (Trabalho Profundo), desenvolvido por Cal Newport, refere-se à capacidade de focar sem distrações em uma tarefa cognitivamente exigente.',
              '• Trabalho Superficial (Shallow Work): Tarefas mecânicas e operacionais (responder e-mails rápidos, organizar pastas) que exigem pouco esforço mental, mas consomem o dia.',
              '• Construção de Rituais de Foco: Eliminação de abas desnecessárias, bloqueio de notificações e definição de metas claras para o bloco de trabalho focado.'
            ]
          },
          {
            subheading: '2. Aplicação Prática do Mindfulness Corporativo',
            body: [
              'Atenção plena (Mindfulness) não significa "esvaziar a mente", mas observar os pensamentos e emoções sem julgamento imediato, ancorando-se na atividade presente.',
              'A Pausa Estratégica (Método STOP):',
              '• S (Stop): Pare o que está fazendo.',
              '• T (Take a breath): Tome uma respiração profunda.',
              '• O (Observe): Observe seus pensamentos e o seu corpo.',
              '• P (Proceed): Prossiga com clareza e intenção.'
            ],
            asciiDiagram: `┌────────────────────────────────────────────────────────┐
│               MÉTODO S.T.O.P. DE MINDFULNESS           │
├────────────────────────────────────────────────────────┤
│ [S] STOP: Pare imediatamente o que está fazendo        │
│ [T] TAKE A BREATH: Respire consciente e profundamente  │
│ [O] OBSERVE: Observe mente, emoções e corpo sem julgar │
│ [P] PROCEED: Prossiga com foco, calma e intenção clara │
└────────────────────────────────────────────────────────┘`
          }
        ]
      }
    },
    {
      id: 'sau-mod-4',
      number: 4,
      title: 'MÓDULO 4: Limites Saudáveis, Comunicação e Prevenção do Burnout',
      summary: 'O equilíbrio emocional sustentável depende da capacidade de estabelecer fronteiras claras entre a vida profissional e a vida pessoal, evitando o esgotamento extremo (Burnout).',
      estimatedMinutes: 45,
      content: {
        sections: [
          {
            subheading: '1. Estabelecimento de Fronteiras e Desconexão Digital',
            body: [
              'A hiperconectividade cria a falsa sensação de que tudo precisa ser respondido imediatamente.',
              '• Desconexão do Expediente: Definir um horário claro para encerrar a checagem de mensagens corporativas no celular pessoal.',
              '• Gestão de Expectativas: Comunicar à equipe os prazos reais de resposta e entrega, sem assumir compromissos inalcançáveis por medo de dizer "não".'
            ],
            highlightBox: {
              type: 'info',
              title: 'Comunicação Assertiva',
              text: 'Dizer "não" fundamentado com alternativas e prazos viáveis é sinal de maturidade profissional e respeito pela qualidade do trabalho.'
            }
          },
          {
            subheading: '2. Sinais de Alerta do Burnout',
            body: [
              'A Síndrome de Burnout é o estresse crônico não gerenciado no ambiente de trabalho. Reconhecer os sinais iniciais evita o colapso físico e emocional:',
              '• Estágio Inicial: Entusiasmo excessivo com negligência de necessidades básicas (sono, alimentação); sensação constante de falta de tempo e ansiedade aos domingos.',
              '• Estágio Avançado: Exaustão física e mental diária; cinismo, desconexão emocional com o trabalho e queda brusca de produtividade.'
            ],
            asciiDiagram: `┌────────────────────────────────────────────────────────┐
│             ESTÁGIOS DA SÍNDROME DE BURNOUT            │
├────────────────────────────────────────────────────────┤
│ ESTÁGIO INICIAL:                                       │
│ • Entusiasmo desmedido sem descanso                    │
│ • Negligência com sono e alimentação                   │
│ • Ansiedade aos domingos e falta de tempo              │
├────────────────────────────────────────────────────────┤
│ ESTÁGIO AVANÇADO:                                      │
│ • Exaustão física e mental diária                      │
│ • Cinismo, frieza e distanciamento da equipe           │
│ • Queda drástica de produtividade e esgotamento        │
└────────────────────────────────────────────────────────┘`
          }
        ]
      }
    }
  ],
  caseStudies: [],
  quiz: [
    {
      id: 1,
      question: 'Durante um dia de alta demanda no escritório, um colaborador percebe que sua respiração está acelerada e que não consegue se concentrar nas tarefas devido ao nervosismo. Qual técnica de autorregulação fisiológica é mais indicada para reativar a calma do sistema nervoso de forma rápida?',
      options: [
        'Ingerir bebidas estimulantes com alto teor de cafeína para acelerar o ritmo de trabalho.',
        'Ignorar os sinais do corpo e continuar digitando em velocidade máxima sem fazer pausas.',
        'Aplicar a técnica de Respiração Quadrada (Box Breathing), alternando inspiração, retenção, expiração e pausa em tempos iguais.',
        'Reclamar abertamente sobre a sobrecarga com os colegas de equipe durante o horário de pico.'
      ],
      correct: 2,
      explanation: 'A técnica de Respiração Quadrada (Box Breathing) reduz diretamente os níveis de excitação fisiológica provocados pela ansiedade, desacelerando a frequência cardíaca e ativando o sistema nervoso parassimpático para recuperar o controle consciente.'
    },
    {
      id: 2,
      question: 'A Síndrome de Burnout foi reconhecida como uma condição ocupacional resultante do estresse crônico no ambiente de trabalho. Qual das opções abaixo apresenta um sintoma característico dessa síndrome em seu estágio avançado?',
      options: [
        'Sensação diária de exaustão física/mental acompanhada de atitudes de cinismo e desapego ao trabalho.',
        'Aumento da criatividade e engajamento constante em novos projetos da empresa.',
        'Capacidade de manter o foco ininterrupto por 12 horas consecutivas sem apresentar fadiga.',
        'Facilidade em desligar-se das responsabilidades profissionais no exato momento em que encerra o expediente.'
      ],
      correct: 0,
      explanation: 'O Burnout é caracterizado pela tríade: exaustão emocional profunda, despersonalização/cinismo (desapego frio em relação às tarefas e colegas) e queda da percepção de eficácia profissional.'
    },
    {
      id: 3,
      question: 'O conceito de Deep Work (Trabalho Profundo) exige eliminar distrações para focar em tarefas cognitivamente complexas. Qual ação prática contribui diretamente para a criação de um ambiente favorável ao Deep Work?',
      options: [
        'Deixar os alertas sonoros do e-mail e do chat corporativo ativados na tela principal.',
        'Alternar a atenção a cada 5 minutos entre a escrita de um relatório e a navegação em redes sociais.',
        'Realizar chamadas de vídeo sem roteiro prévio enquanto tenta revisar planilhas complexas.',
        'Agendar o checamento de e-mails para horários específicos do dia e silenciar notificações durante o bloco de foco.'
      ],
      correct: 3,
      explanation: 'O Trabalho Profundo exige a eliminação de fragmentações na atenção. Definir blocos de tempo isolados e silenciar notificações previne a troca constante de contexto, permitindo hiperfoco e alta performance.'
    },
    {
      id: 4,
      question: 'Diante de um erro cometido em um projeto, a mente de um profissional ansioso pode gerar uma "distorção cognitiva", acreditando que o problema é uma catastrofização irreparável. Qual técnica ajuda a reestruturar esse pensamento de forma racional?',
      options: [
        'Aceitar o pensamento catastrófico como verdade absoluta e pedir demissão imediatamente.',
        'Questionar o pensamento ansiogênico buscando evidências concretas sobre o impacto real e focando no plano de ação para correção.',
        'Esconder o erro da equipe na esperança de que ninguém perceba a falha.',
        'Culpar publicamente outros colegas pelo ocorrido para preservar a própria imagem.'
      ],
      correct: 1,
      explanation: 'A Reestruturação Cognitiva combate vieses de catastrofização substituindo suposições por fatos. Analisar o erro objetivamente e construir uma solução prática reduz a ansiedade e restaura o senso de controle.'
    },
    {
      id: 5,
      question: 'O acrônimo S.T.O.P. representa uma pausa consciente no meio da rotina para recuperar a clareza e o equilíbrio emocional. O que significa a letra "O" nessa metodologia de Mindfulness?',
      options: [
        'Observar os pensamentos, emoções e sensações corporais sem julgamento imediato.',
        'Omitir os sentimentos negativos até o fim da semana.',
        'Optimizar o tempo eliminando o horário de almoço.',
        'Organizar a mesa de trabalho descartando papéis antigos.'
      ],
      correct: 0,
      explanation: 'No método S.T.O.P. (Stop, Take a breath, Observe, Proceed), o passo Observe orienta o indivíduo a tomar consciência de seus estados internos (pensamentos, emoções, tensão muscular) com curiosidade e sem auto-julgamento.'
    },
    {
      id: 6,
      question: 'Para manter a saúde mental e prevenir o esgotamento no ambiente de trabalho, o estabelecimento de limites saudáveis é indispensável. Qual postura reflete o estabelecimento de uma fronteira profissional assertiva?',
      options: [
        'Responder mensagens de trabalho no aplicativo pessoal de mensagens às 23 horas de um domingo.',
        'Aceitar todas as solicitações de última hora recebidas, mesmo quando impossibilitam o cumprimento dos prazos já acordados.',
        'Desligar o telefone corporativo durante o horário de expediente normal sem avisar a equipe.',
        'Comunicar com clareza a capacidade atual de entregas, renegociar prazos com a liderança e respeitar os horários de descanso.'
      ],
      correct: 3,
      explanation: 'Ter assertividade emocional significa alinhar expectativas e prioridades de forma transparente com a equipe. Dizer "não" fundamentado ou renegociar prazos protege a qualidade das entregas e a saúde mental do profissional.'
    },
    {
      id: 7,
      question: 'O estresse é uma reação biológica do organismo que pode ser dividida entre "eustresse" e "distresse". Qual a principal característica do eustresse?',
      options: [
        'É o estágio final de esgotamento físico que exige afastamento médico imediato.',
        'Trata-se do sentimento constante de pânico acompanhado de insônia crônica.',
        'É a forma saudável e positiva de estresse, que mobiliza energia, melhora o foco e motiva a resolução de desafios.',
        'É a incapacidade total de sentir qualquer tipo de emoção durante reuniões de trabalho.'
      ],
      correct: 2,
      explanation: 'O Eustresse (estresse positivo) é o nível moderado de ativação necessário para nos manter alertas, motivados e engajados na superação de metas e desafios do dia a dia, diferindo do estresse crônico nocivo (distresse).'
    }
  ]
};

export const EQUILIBRIO_EMOCIONAL_DATA = CURSO_EQUILIBRIO_EMOCIONAL;

// =========================================================================
// CURSO OFICIAL: INFORMÁTICA BÁSICA, NUVEM E SEGURANÇA DA INFORMAÇÃO
// =========================================================================
export const CURSO_INFORMATICA_SEGURANCA: Course = {
  id: 'curso-informatica-seguranca',
  published: true,
  isPublished: true,
  active: true,
  visible: true,
  trackId: 'trilha-3',
  trackName: 'TRILHA 3: Tecnologia, Informática & Produtividade com IA',
  category: 'Tecnologia da Informação',
  targetAudienceType: 'TODOS',
  title: 'Informática Básica, Nuvem e Segurança da Informação',
  subtitle: 'Sistemas operacionais, atalhos de produtividade, Google Workspace, OneDrive e defesa contra ameaças cibernéticas',
  hours: 12,
  equivalentHours: 12,
  modality: 'EAD 100% Gratuito (Escola Virtual)',
  targetAudience: 'Iniciante / Absoluto Zero — Estudantes e profissionais iniciando o uso de computadores e ferramentas em nuvem',
  prerequisites: 'Nenhum pré-requisito.',
  badgeName: 'Segurança Digital & Nuvem',
  badgeCategory: 'Ferramentas de Escritório',
  badgeIcon: 'Shield',
  accentColor: '#3B82F6',
  level: 'Iniciante',
  videoUrl: 'https://youtu.be/X2wgk02Bqt0?si=vwlWKuVB6909U_dG',
  youtubeId: 'X2wgk02Bqt0',
  learningObjectives: [
    'Capacitar o participante a operar sistemas operacionais de forma eficiente, compreendendo hardware e software.',
    'Utilizar serviços de armazenamento e produtividade em nuvem (Google Drive e OneDrive) com permissões adequadas e edição colaborativa.',
    'Adotar práticas essenciais de segurança da informação (senhas fortes, 2FA, defesa contra phishing e ransomware) e aplicar a regra 3-2-1 de backup e princípios da LGPD.'
  ],
  modules: [
    {
      id: 'inf-mod-1',
      number: 1,
      title: 'MÓDULO 1: Fundamentos de Informática e Sistemas Operacionais',
      summary: 'Compreender a estrutura de um computador e dominar a navegação eficiente pelo sistema operacional.',
      estimatedMinutes: 45,
      content: {
        sections: [
          {
            subheading: '1. Hardware, Software e Estrutura Lógica',
            body: [
              'Hardware vs. Software: Diferença entre componentes físicos (processador, memória RAM, disco de armazenamento SSD/HD) e programas/sistemas.',
              'Sistemas Operacionais (Windows e Linux): Interface gráfica, atalhos universais de teclado (Ctrl+C, Ctrl+V, Ctrl+Z, Alt+Tab, Windows+E) e personalização de ambiente.'
            ]
          },
          {
            subheading: '2. Organização de Arquivos e Armazenamento',
            body: [
              'Estrutura de Pastas e Diretórios: Boas práticas de criação, movimentação, renomeação e exclusão de arquivos.',
              'Extensões de Arquivos Frequentes: Identificação de formatos (.pdf, .docx, .xlsx, .png, .jpeg, .zip).',
              'Gerenciamento de Espaço e Lixeira: Como esvaziar a lixeira com segurança e recuperar arquivos excluídos acidentalmente.'
            ],
            highlightBox: {
              type: 'info',
              title: 'Atalhos de Produtividade',
              text: 'Dominar atalhos como Alt+Tab (alternar janelas) e Windows+E (explorador de arquivos) aumenta expressivamente a velocidade de trabalho no computador corporativo.'
            }
          }
        ]
      }
    },
    {
      id: 'inf-mod-2',
      number: 2,
      title: 'MÓDULO 2: Navegação na Web e Serviços de Produtividade em Nuvem',
      summary: 'Aprender a explorar a internet de forma rápida e utilizar plataformas de colaboração em tempo real.',
      estimatedMinutes: 45,
      content: {
        sections: [
          {
            subheading: '1. Navegadores e Pesquisa Eficiente',
            body: [
              'Navegadores (Browsers): Configuração básica de Chrome, Edge e Firefox (favoritos, histórico, guias e modo anônimo).',
              'Técnicas de Busca: Uso de aspas ("termo exato"), hífen para exclusão (termo -excluído) e busca por tipo de arquivo (filetype:pdf).'
            ]
          },
          {
            subheading: '2. Ecossistemas em Nuvem (Google Workspace e Microsoft 365)',
            body: [
              'O que é Computação em Nuvem (Cloud Computing): Conceito de armazenamento e processamento remoto de dados.',
              'Armazenamento e Compartilhamento: Uso do Google Drive / OneDrive para criar pastas compartilhadas, definir permissões de acesso (Apenas Leitura, Comentador, Editor) e sincronizar arquivos locais.',
              'Edição Colaborativa em Tempo Real: Criação e revisão simultânea de documentos e planilhas em equipe.'
            ],
            highlightBox: {
              type: 'info',
              title: 'Permissões em Nuvem',
              text: 'A permissão de "Apenas Leitura" (ou Visualizador) garante a transparência da informação sem colocar em risco a integridade do arquivo original contra edições ou exclusões indevidas.'
            }
          }
        ]
      }
    },
    {
      id: 'inf-mod-3',
      number: 3,
      title: 'MÓDULO 3: Segurança da Informação e Proteção de Dados',
      summary: 'Desenvolver uma postura preventiva contra os golpes digitais mais comuns do mercado.',
      estimatedMinutes: 45,
      content: {
        sections: [
          {
            subheading: '1. Mapeamento de Ameaças Digitais',
            body: [
              'Engenharia Social e Phishing: Como identificar e-mails, mensagens de WhatsApp e sites falsos projetados para roubar senhas e dados bancários.',
              'Tipos de Malware: Diferenças conceituais entre Vírus, Ransomware (sequestro de dados), Spyware e Trojan (Cavalo de Tróia).'
            ]
          },
          {
            subheading: '2. Mecanismos de Defesa Pessoal e Corporativa',
            body: [
              'Gestão de Senhas Fortes: Criação de combinações seguras sem padrões óbvios e uso de gerenciadores de senhas.',
              'Autenticação em Duas Etapas (2FA/MFA): Configuração obrigatória de verificação em duas etapas via aplicativos autenticadores (Google Authenticator, Microsoft Authenticator) ou chaves de segurança.',
              'Redes Wi-Fi Seguras: Cuidados ao navegar em redes Wi-Fi públicas e uso de conexões criptografadas (HTTPS).'
            ],
            highlightBox: {
              type: 'warning',
              title: 'Alerta de Phishing e Ransomware',
              text: 'Desconfie sempre de e-mails com tom de urgência ou links suspeitos. O ransomware bloqueia arquivos por criptografia exigindo resgate financeiro; a prevenção e a postura atenta são as melhores defesas.'
            }
          }
        ]
      }
    },
    {
      id: 'inf-mod-4',
      number: 4,
      title: 'MÓDULO 4: Rotinas de Proteção e Lei Geral de Proteção de Dados (LGPD)',
      summary: 'Garantir a continuidade das atividades e o cumprimento das normas legais de privacidade.',
      estimatedMinutes: 45,
      content: {
        sections: [
          {
            subheading: '1. Estratégias de Backup (Cópia de Segurança)',
            body: [
              'A Regra de Backup 3-2-1: Manter 3 cópias dos dados, em 2 mídias diferentes, com 1 cópia armazenada fora do local (na nuvem).',
              'Automação de Backups: Programação de rotinas de sincronização automática no sistema operacional e na nuvem.'
            ]
          },
          {
            subheading: '2. Boas Práticas de Privacidade e LGPD no Dia a Dia',
            body: [
              'Privacidade de Dados: Configuração de permissões em aplicativos, redes sociais e navegadores.',
              'Introdução à LGPD: Noções básicas sobre o tratamento responsável de dados de clientes, colegas e fornecedores no ambiente de trabalho.'
            ],
            highlightBox: {
              type: 'law',
              title: 'A Regra 3-2-1 de Backup',
              text: 'Padrão ouro de segurança: 3 cópias dos dados (1 principal + 2 backups), em 2 mídias distintas (ex: disco interno e HD externo), com 1 cópia fora da empresa/residência (nuvem).'
            }
          }
        ]
      }
    }
  ],
  caseStudies: [],
  quiz: [
    {
      id: 1,
      question: 'Um profissional recebeu um e-mail parecendo ser do seu banco, informando sobre o bloqueio da conta e solicitando que ele clique em um link para digitar sua senha e reativar o acesso. Trata-se de uma tentativa de golpe conhecida como:',
      options: [
        'Phishing.',
        'Defragmentação de disco.',
        'Backup em nuvem.',
        'Atualização de firmware.'
      ],
      correct: 0,
      explanation: 'Phishing é uma técnica de engenharia social onde golpistas se passam por instituições confiáveis (bancos, empresas, órgãos governamentais) para enganar o usuário e induzi-lo a fornecer dados confidenciais.'
    },
    {
      id: 2,
      question: 'Para reforçar a segurança de uma conta corporativa de e-mail contra acessos não autorizados, qual das opções representa a prática recomendada de proteção adicional?',
      options: [
        'Utilizar a mesma senha simples em todos os sites da internet.',
        'Anotar a senha em um bloco de notas colado no monitor do computador.',
        'Habilitar a Autenticação em Duas Etapas (2FA) utilizando um aplicativo autenticador.',
        'Compartilhar a senha com todos os colegas de equipe para facilitar o trabalho.'
      ],
      correct: 2,
      explanation: 'A Autenticação em Duas Etapas (2FA) adiciona uma camada de proteção física/digital além da senha, exigindo um código temporário gerado no celular para confirmar a identidade.'
    },
    {
      id: 3,
      question: 'Na rotina de trabalho em equipe utilizando serviços de armazenamento em nuvem (como Google Drive ou OneDrive), qual é a vantagem de definir uma permissão como "Apenas Leitura" ao compartilhar um arquivo com um parceiro externo?',
      options: [
        'Permitir que a pessoa apague permanentemente o arquivo original.',
        'Garantir que o destinatário consiga visualizar o documento sem a possibilidade de alterar seu conteúdo original.',
        'Fazer com que o arquivo seja impresso automaticamente na impressora do destinatário.',
        'Bloquear completamente o acesso da pessoa ao link compartilhado.'
      ],
      correct: 1,
      explanation: 'A permissão de Apenas Leitura (ou Visualizador) garante a transparência da informação sem colocar em risco a integridade do arquivo original contra edições ou exclusões indevidas.'
    },
    {
      id: 4,
      question: 'Qual atalho universal de teclado nos sistemas operacionais é utilizado para alternar rapidamente entre as janelas e programas abertos na tela?',
      options: [
        'Ctrl + P',
        'Alt + Tab',
        'Ctrl + S',
        'Windows + L'
      ],
      correct: 1,
      explanation: 'O atalho Alt + Tab é o padrão nos sistemas operacionais para navegar e alternar a visualização entre diferentes aplicativos abertos na área de trabalho.'
    },
    {
      id: 5,
      question: 'A estratégia de proteção de dados conhecida como "Regra 3-2-1 de Backup" recomenda qual das seguintes estruturas para garantir que informações críticas não sejam perdidas?',
      options: [
        'Guardar 3 cópias dos dados, em 2 mídias diferentes, com 1 cópia armazenada em um local externo (como a nuvem).',
        'Fazer backup a cada 3 dias, durante 2 meses, usando 1 pendrive usado.',
        'Salvar 3 arquivos na mesma pasta, em 2 computadores iguais, sem senha.',
        'Enviar 3 e-mails para você mesmo com 2 anexos em 1 dia.'
      ],
      correct: 0,
      explanation: 'A Regra 3-2-1 é o padrão de ouro da segurança da informação: ter 3 cópias no total (1 primária + 2 backups), em 2 tipos de mídias diferentes (ex: HD externo e nuvem), com 1 cópia mantida fora da empresa/residência (nuvem).'
    },
    {
      id: 6,
      question: 'Um tipo nocivo de software malicioso que criptografa (bloqueia) os arquivos de um computador e exige o pagamento de um "resgate" financeiro para liberar o acesso aos dados é chamado de:',
      options: [
        'Antivírus.',
        'Ransomware.',
        'Sistema Operacional.',
        'Processador.'
      ],
      correct: 1,
      explanation: 'O Ransomware é uma ameaça cibersegurança grave que "sequestra" dados por meio de criptografia forte, cobrando pagamentos (geralmente em criptomoedas) para a suposta devolução das chaves de acesso.'
    },
    {
      id: 7,
      question: 'Para encontrar no Google exatamente um arquivo em formato PDF contendo um manual de instruções, sem exibir páginas com textos genéricos, qual expressão de busca utiliza o operador correto?',
      options: [
        'manual de instrucoes filetype:pdf',
        'manual + instrucoes + site',
        'buscar manual formato texto',
        'pdf.manual.com'
      ],
      correct: 0,
      explanation: 'O operador filetype:pdf filtra a pesquisa do Google para retornar exclusivamente arquivos com a extensão .pdf, tornando a busca por manuais, livros e relatórios muito mais precisa.'
    }
  ]
};

export const INFORMATICA_SEGURANCA_DATA = CURSO_INFORMATICA_SEGURANCA;


// =========================================================================
// CURSO OFICIAL: EXCEL AVANÇADO E ANÁLISE DE DADOS
// =========================================================================
export const CURSO_EXCEL_AVANCADO_ANALISE_DADOS: Course = {
  id: 'excel-avancado',
  trackId: 'trilha-3',
  trackName: 'TRILHA 3: Tecnologia, Informática & Produtividade com IA',
  category: 'Produtividade & Tecnologia',
  targetAudienceType: 'TODOS',
  title: 'Excel Avançado e Análise de Dados',
  subtitle: 'Domine PROCX, tratamento de bases desestruturadas, Tabelas Dinâmicas interativas e construção de Dashboards executivos de alto impacto.',
  hours: 4,
  equivalentHours: 4,
  modality: 'EAD 100% Gratuito (Escola Virtual)',
  targetAudience: 'Estudantes, estagiários, assistentes e analistas que buscam automatizar análises, tratar grandes bases de dados e construir painéis executivos dinâmicos.',
  prerequisites: 'Conhecimentos básicos de Excel e planilhas eletrônicas.',
  badgeName: 'Especialista em Excel Avançado & Dashboards',
  badgeCategory: 'Produtividade & Tecnologia',
  badgeIcon: 'FileSpreadsheet',
  accentColor: '#10B981',
  level: 'Intermediário',
  published: true,
  isPublished: true,
  active: true,
  visible: true,
  videoUrl: 'https://youtu.be/9QbIuIZMVUw',
  youtubeId: '9QbIuIZMVUw',
  learningObjectives: [
    'Substituir fórmulas complexas de busca pelo PROCX com correspondência exata nativa e buscas bidirecionais à esquerda.',
    'Tratar exceções e erros de planilhas (#N/D, #VALOR!) com a função SEERRO e combinar operadores lógicos encadeados.',
    'Higienizar bases desestruturadas com ARRUMAR, Texto para Colunas, eliminação de duplicatas e regras de Validação de Dados.',
    'Construir Tabelas Dinâmicas avançadas com agrupamentos cronológicos, campos calculados e filtros por Segmentação de Dados (Slicers).',
    'Desenvolver Dashboards executivos interativos sem linhas de grade, com gráficos analíticos combinados e formatação condicional avançada baseada em fórmulas.'
  ],
  modules: [
    {
      id: 'exc-av-mod-1',
      number: 1,
      title: 'MÓDULO 1: Fórmulas de Busca e Lógica Avançada',
      summary: 'Substituição de estruturas complexas de busca pelo PROCX, além da combinação de operadores lógicos e controle profissional de erros.',
      estimatedMinutes: 60,
      content: {
        sections: [
          {
            subheading: '1. Sintaxe e Poder do PROCX',
            body: [
              'O PROCX revoluciona a pesquisa no Excel, superando as limitações históricas do PROCV:',
              '• Buscas à Esquerda: O PROCX aceita matrizes de pesquisa e de retorno independentes, permitindo buscar valores à esquerda sem truques.',
              '• Correspondência Exata por Padrão: Elimina a necessidade de digitar o parâmetro FALSO ou 0 no final da fórmula.',
              '• Tratamento Nativo de Erro: O 4º argumento [se_não_encontrado] permite definir uma mensagem padrão caso o item não exista na base.',
              '• Sintaxe Básica: =PROCX(pesquisa_valor; matriz_pesquisa; matriz_retorno; [se_não_encontrado]; [modo_correspondência]; [modo_pesquisa]).'
            ],
            highlightBox: {
              type: 'calc',
              title: 'PROCX vs. PROCV Clássico',
              text: '=PROCX(A2; Clientes[CPF]; Clientes[Nome]; "Não localizado") busca de forma rápida, segura e sem quebrar ao inserir novas colunas.'
            }
          },
          {
            subheading: '2. Funções de Busca Clássicas em Planilhas Legadas',
            body: [
              'Embora o PROCX seja moderno, milhares de empresas utilizam modelos legados compatíveis com versões anteriores do Excel:',
              '• PROCV e PROCH: Entendimento do índice de coluna e limitações de ordenação.',
              '• ÍNDICE + CORRESP: A combinação bidirecional clássica para matrizes dinâmicas antes da criação do PROCX.'
            ]
          },
          {
            subheading: '3. Lógica Encadeada e Tratamento de Exceções',
            body: [
              'Combinando testes lógicos para tomada de decisão automatizada no ambiente corporativo:',
              '• Operadores Lógicos SE, E e OU: Construção de regras de validação multicritério em cascata.',
              '• Função SEERRO: Envolver fórmulas críticas para exibir mensagens elegantes ou 0 em vez de erros antiestéticos como #N/D, #VALOR! ou #DIV/0!.'
            ],
            highlightBox: {
              type: 'info',
              title: 'Controle Profissional com SEERRO',
              text: '=SEERRO(PROCX(A2; Base[ID]; Base[Salário]); 0) garante que células filhas (como somas e médias) não quebrem por erros transitórios.'
            }
          }
        ]
      }
    },
    {
      id: 'exc-av-mod-2',
      number: 2,
      title: 'MÓDULO 2: Tratamento, Limpeza e Organização de Dados',
      summary: 'Preparação e saneamento de bases desestruturadas ou exportadas de sistemas ERP para análises confiáveis e auditáveis.',
      estimatedMinutes: 60,
      content: {
        sections: [
          {
            subheading: '1. Higienização e Tratamento de Dados',
            body: [
              'Bases extraídas de sistemas comumente trazem inconsistências invisíveis que quebram fórmulas:',
              '• Função =ARRUMAR(): Remove espaços duplicados e espaços no início/fim de textos.',
              '• Padronização de Texto: Funções =MAIÚSCULA(), =MINÚSCULA() e =PRI.MAIÚSCULA() para padronizar nomes e cadastros.',
              '• Conversão de Tipos: Conversão de datas e números importados incorretamente como texto utilizando =VALOR() e multiplicação por 1.'
            ]
          },
          {
            subheading: '2. Ferramenta Texto para Colunas',
            body: [
              'Separação eficiente de relatórios brutos ou arquivos CSV delimitados:',
              '• Delimitadores Comuns: Ponto e vírgula (;), vírgula (,), tabulação ou caracteres customizados.',
              '• Largura Fixa: Divisão de campos baseada em posições de caracteres para relatórios bancários ou de folha de pagamento.'
            ],
            highlightBox: {
              type: 'calc',
              title: 'Texto para Colunas',
              text: 'Aba Dados ──► Texto para Colunas ──► Delimitado ──► Selecionar Delimitador (ex: ponto e vírgula) ──► Concluir.'
            }
          },
          {
            subheading: '3. Validação de Dados e Eliminação de Duplicatas',
            body: [
              'Blindagem de planilhas para evitar erros humanos na entrada de dados:',
              '• Listas Suspensas (Drop-downs): Restrição de células a opções predeterminadas de uma tabela de apoio.',
              '• Validações Numéricas e de Data: Limitação de intervalos (ex: notas de 0 a 10, datas no ano vigente).',
              '• Remoção de Duplicatas: Identificação e exclusão de registros repetidos preservando a integridade dos dados originais.'
            ]
          }
        ]
      }
    },
    {
      id: 'exc-av-mod-3',
      number: 3,
      title: 'MÓDULO 3: Tabulação e Análise Dinâmica de Dados',
      summary: 'Sumarização, agrupamentos e extração de insights de grandes volumes de dados em segundos com Tabelas Dinâmicas.',
      estimatedMinutes: 60,
      content: {
        sections: [
          {
            subheading: '1. Arquitetura de Tabelas Dinâmicas (Pivot Tables)',
            body: [
              'A ferramenta mais veloz e poderosa para exploração analítica no Excel:',
              '• Quadrantes Estruturais: Filtros, Colunas, Linhas e Valores.',
              '• Modos de Resumo: Alternância entre Soma, Contagem, Média, Máximo e Percentual do Total Geral.',
              '• Formatação Numérica Preservada: Ajuste da formatação de valores direto no resumo do campo.'
            ]
          },
          {
            subheading: '2. Agrupamentos Automáticos e Campos Calculados',
            body: [
              'Elevando o nível analítico sem tocar na base bruta:',
              '• Agrupamento Cronológico: Agrupar milhares de linhas de pedidos por Anos, Trimestres e Meses com apenas um clique.',
              '• Agrupamento Numérico: Criação de faixas salariais ou de faturamento para análise de distribuição.',
              '• Campos Calculados: Criação de métricas proprietárias (ex: Margem de Lucro = [Lucro] / [Receita]) direto na dinâmica.'
            ],
            highlightBox: {
              type: 'info',
              title: 'Agrupamento Dinâmico',
              text: 'Clique com o botão direito sobre qualquer data na Tabela Dinâmica ──► Agrupar ──► Selecione "Meses" e "Anos".'
            }
          },
          {
            subheading: '3. Segmentação de Dados (Slicers) e Linhas do Tempo',
            body: [
              'Transformando tabelas estáticas em painéis interativos:',
              '• Slicers (Segmentação de Dados): Botões modernos de filtro visual intuitivo.',
              '• Conexões de Relatório: Vinculação de uma única segmentação a múltiplas Tabelas Dinâmicas simultaneamente.',
              '• Linhas do Tempo (Timelines): Controle visual deslizante para recorte dinâmico de períodos e safras.'
            ]
          }
        ]
      }
    },
    {
      id: 'exc-av-mod-4',
      number: 4,
      title: 'MÓDULO 4: Visualização Profissional, Formatação e Dashboards',
      summary: 'Transformação de dados brutos em painéis de bordo executivos (Dashboards) funcionais, elegantes e de alto impacto visual.',
      estimatedMinutes: 60,
      content: {
        sections: [
          {
            subheading: '1. Gráficos Analíticos e Combinações de Eixos',
            body: [
              'A escolha correta do tipo de gráfico orientada ao tipo de decisão:',
              '• Comparação e Ranking: Gráficos de barras e colunas horizontais/verticais.',
              '• Tendência e Evolução Temporal: Gráficos de linhas com marcadores para dados contínuos.',
              '• Composição: Gráficos de rosca ou cascata (waterfall).',
              '• Gráfico Combinado com Eixo Secundário: Colunas (Volume) + Linha (Percentual de Margem) para análise simultânea.'
            ]
          },
          {
            subheading: '2. Formatação Condicional Avançada com Fórmulas',
            body: [
              'Gestão visual imediata com base em regras automáticas:',
              '• Regras Baseadas em Fórmulas: Destacar a linha inteira quando a meta não for atingida (ex: =$D2<$C2).',
              '• Barras de Dados e Escalas de Cor: Gráficos em miniatura dentro das próprias células da tabela.',
              '• Conjuntos de Ícones (KPIs): Semáforos e setas de tendência para rápida leitura executiva.'
            ],
            highlightBox: {
              type: 'calc',
              title: 'Formatação Condicional da Linha Inteira',
              text: 'Selecione a tabela ──► Nova Regra ──► Usar fórmula: =$E2<0 ──► Formatar Preenchimento Vermelho Suave. O "$" na coluna fixa a análise.'
            }
          },
          {
            subheading: '3. Design e Arquitetura de Dashboards Executivos',
            body: [
              'Princípios de UI/UX e design de informação em planilhas corporativas:',
              '• Limpeza Visual: Ocultar linhas de grade, barra de fórmulas e títulos de linha/coluna na apresentação.',
              '• Hierarquia e Alinhamento: Cartões de KPIs no topo, gráficos principais no centro e detalhamentos abaixo.',
              '• Interatividade Integrada: Painel com Segmentação de Dados conectada a todos os gráficos para exploração em tempo real.'
            ]
          }
        ]
      }
    }
  ],
  caseStudies: [
    {
      id: 'case-excel-avancado-1',
      title: 'Dashboard de Vendas e Margem Operacional da TechVarejo',
      character: 'Mariana Duarte, Analista de Dados e Planejamento Financeiro',
      scenario: 'A diretoria da TechVarejo recebia relatórios de vendas semanais em planilhas com 45.000 linhas, nomes de clientes despadronizados e múltiplos erros #N/D provenientes de PROCVs quebrados, impedindo uma tomada de decisão rápida sobre margens por região.',
      criticalAnalysis: 'Mariana higienizou a base com Texto para Colunas e ARRUMAR, substituiu as buscas instáveis por PROCX encapsulado com SEERRO, estruturou uma Tabela Dinâmica com agrupamento de datas e construiu um Dashboard executivo interativo com Segmentação de Dados e Gráficos Combinados.',
      keyTakeaways: [
        'Uso do PROCX para evitar erros decorrentes de inserção de colunas na base de dados.',
        'Saneamento prévio dos dados brutos com ARRUMAR e remoção de duplicatas antes de qualquer modelagem.',
        'Conexão de múltiplos gráficos e tabelas dinâmicas a uma mesma Segmentação de Dados para análise executiva em tempo real.'
      ],
      badgeRelevance: 'Demonstra maestria em transformar planilhas brutas e caóticas em sistemas de apoio à decisão visualmente impecáveis e auditáveis.',
      interactiveOptions: {
        question: 'Qual a primeira medida para garantir que o Dashboard não apresente erros de cálculo ao importar uma nova remessa de dados do sistema?',
        choices: [
          { text: 'Tratar a base com ARRUMAR, verificar formatos e validar fórmulas de busca com PROCX e SEERRO.', correct: true, feedback: 'Excelente! A higienização prévia e o tratamento com SEERRO garantem integridade total.' },
          { text: 'Ocultar as linhas que apresentarem erro na Tabela Dinâmica.', correct: false, feedback: 'Incorreto. Ocultar linhas omite valores reais e distorce os totais do relatório.' },
          { text: 'Mudar a cor de fundo das células de erro para branco.', correct: false, feedback: 'Incorreto. A célula continua contendo o erro na memória do Excel, quebrando cálculos posteriores.' }
        ]
      }
    }
  ],
  quiz: [
    {
      id: 1,
      question: 'Qual é a principal vantagem da função PROCX em relação ao PROCV tradicional?',
      options: [
        'O PROCX é a única função que consegue somar valores com base em critérios.',
        'O PROCX consegue realizar buscas à esquerda da coluna de pesquisa e busca correspondência exata por padrão.',
        'O PROCX exige que a coluna de busca esteja organizada em ordem alfabética obrigatória.',
        'O PROCX funciona apenas com valores numéricos, ignorando textos.'
      ],
      correct: 1,
      explanation: 'Diferente do PROCV (que exige que o valor buscado esteja na primeira coluna à esquerda do intervalo), o PROCX aceita matrizes de busca e retorno independentes, além de procurar correspondência exata sem necessidade do parâmetro FALSO.'
    },
    {
      id: 2,
      question: 'Em um relatório no Excel, algumas células exibem o erro #N/D. Qual é a melhor abordagem para tratar esse problema profissionalmente?',
      options: [
        'Deletar a fórmula da célula para que a palavra sumir.',
        'Ocultar a coluna inteira onde o erro aparece.',
        'Envolver a fórmula dentro da função SEERRO, definindo um texto amigável como "Não encontrado" ou o valor 0.',
        'Mudar a cor da fonte da célula para branco para disfarçar o erro.'
      ],
      correct: 2,
      explanation: 'A função SEERRO(fórmula; valor_se_erro) intercepta qualquer erro retornado e exibe uma alternativa limpa, garantindo que fórmulas dependentes continuem funcionando.'
    },
    {
      id: 3,
      question: 'Para que serve a ferramenta "Segmentação de Dados" (Slicer) associada a uma Tabela Dinâmica?',
      options: [
        'Para dividir o arquivo do Excel em várias planilhas separadas por e-mail.',
        'Para criar botões visuais e interativos que filtram rapidamente as Tabelas Dinâmicas e Gráficos do Dashboard.',
        'Para calcular a média dos valores da tabela automaticamente.',
        'Para converter todas as fórmulas em texto estático.'
      ],
      correct: 1,
      explanation: 'A Segmentação de Dados gera botões clicáveis de fácil navegação que filtram a Tabela Dinâmica e podem ser conectados a múltiplos gráficos ao mesmo tempo.'
    },
    {
      id: 4,
      question: 'Qual é o objetivo principal do recurso "Validação de Dados" no Excel?',
      options: [
        'Proteger a planilha contra cópias não autorizadas por senha.',
        'Restringir os tipos de dados ou valores que os usuários podem inserir em células específicas, evitando erros de digitação.',
        'Fazer a leitura ótica de imagens e transformar em tabela.',
        'Atualizar automaticamente as cotações de moedas em tempo real.'
      ],
      correct: 1,
      explanation: 'A Validação de Dados permite definir regras (como permitir apenas datas, números em um intervalo ou criar uma lista suspensa de opções), garantindo a integridade dos dados inseridos.'
    },
    {
      id: 5,
      question: 'Ao construir um Dashboard executivo, qual tipo de gráfico é o mais recomendado para mostrar a evolução temporal de uma métrica (ex: vendas ao longo dos 12 meses do ano)?',
      options: [
        'Gráfico de Pizza (Setores).',
        'Gráfico de Linhas.',
        'Gráfico de Dispersão de Bolhas.',
        'Gráfico de Radar.'
      ],
      correct: 1,
      explanation: 'Gráficos de linha são visualmente ideais para demonstrar tendências, oscilações, picos e quedas contínuas ao longo do tempo (dias, meses, anos).'
    },
    {
      id: 6,
      question: 'Como a Formatação Condicional com "Regra baseada em Fórmula" pode ajudar na gestão visual de estoque?',
      options: [
        'Aumentando o tamanho da célula quando o estoque acaba.',
        'Destacando automaticamente em vermelho as linhas onde a quantidade atual for menor que o estoque mínimo definido.',
        'Enviando um alarme sonoro quando o usuário abre o Excel.',
        'Bloqueando a edição da planilha quando o estoque atingir zero.'
      ],
      correct: 1,
      explanation: 'Aplicar regras de formatação condicional usando fórmulas lógicas (ex: =$C2<$D2) altera dinamicamente o preenchimento, borda ou cor da fonte da linha inteira com base nos dados.'
    },
    {
      id: 7,
      question: 'O que acontece quando você utiliza a funcionalidade "Texto para Colunas"?',
      options: [
        'Converte automaticamente todas as letras minúsculas em maiúsculas.',
        'Traduz o texto da planilha para outros idiomas.',
        'Divide o conteúdo de uma única célula em múltiplas colunas com base em um delimitador (como vírgula, espaço ou ponto e vírgula).',
        'Transforma colunas verticais em linhas horizontais.'
      ],
      correct: 2,
      explanation: 'É a ferramenta ideal para separar dados importados em bloco (como Nome;Sobrenome;CPF ou arquivos CSV), dividindo o texto em colunas independentes a partir do caractere separador.'
    }
  ]
};

// =========================================================================
// CURSO OFICIAL: ATENDIMENTO AO CLIENTE, EXPERIÊNCIA E RELACIONAMENTO PROFISSIONAL
// =========================================================================
export const CURSO_ATENDIMENTO_RELACIONAMENTO_CLIENTE: Course = {
  id: 'curso-atendimento-relacionamento-cliente',
  trackId: 'trilha-comunicacao-relacionamento',
  trackName: 'TRILHA 2: Soft Skills, Postura & Comunicação Corporativa',
  category: 'Desenvolvimento Pessoal',
  targetAudienceType: ['JOVEM_APRENDIZ', 'ESTUDANTE', 'PRIMEIRO_EMPREGO', 'ESTAGIARIO'],
  title: 'Atendimento ao Cliente, Experiência e Relacionamento Profissional',
  subtitle: 'Fundamentos de CX, comunicação multicanal, desescalada de conflitos, métricas de satisfação (NPS, CSAT, FCR) e fidelização.',
  hours: 16,
  equivalentHours: 16,
  modality: 'EAD 100% Gratuito (Escola Virtual)',
  targetAudience: 'Estudantes, jovens aprendizes, estagiários e profissionais que realizam atendimento ao público, suporte ou relacionamento com clientes.',
  prerequisites: 'Nenhum pré-requisito.',
  badgeName: 'Especialista em Atendimento & Experiência do Cliente (CX)',
  badgeCategory: 'Atendimento & Relacionamento',
  badgeIcon: 'Headphones',
  accentColor: '#EC4899',
  level: 'Intermediário',
  videoUrl: 'https://youtu.be/SFC9uLZSevs?si=8uoTJHebCyg4PF9z',
  youtubeId: 'SFC9uLZSevs',
  learningObjectives: [
    'Capacitar o aluno a realizar atendimentos profissionais em canais presenciais e digitais.',
    'Diferenciar atendimento transacional de Customer Experience (CX) relacional.',
    'Aplicar escuta ativa, empatia e adequação do tom de voz da marca.',
    'Dominar técnicas de desescalada verbal, negociação ganha-ganha e resolução na causa-raiz de conflitos.',
    'Acompanhar e analisar métricas-chave de satisfação e eficiência: NPS, CSAT e FCR.'
  ],
  modules: [
    {
      id: 'atendimento-mod-1',
      number: 1,
      title: 'MÓDULO 1: Fundamentos da Experiência do Cliente e Postura Profissional',
      summary: 'Diferença entre atendimento e CX, retenção de clientes e mapeamento de perfis comportamentais.',
      estimatedMinutes: 45,
      content: {
        sections: [
          {
            subheading: 'Aula 1.1: O Papel do Atendimento no Posicionamento e Retenção',
            body: [
              'O atendimento é a linha de frente de qualquer organização e o principal ponto de contato onde a proposta de valor da marca se concretiza.',
              'Manter um cliente existente custa de 5 a 7 vezes menos do que adquirir um novo cliente. Profissionais que compreendem o valor da retenção geram impacto financeiro e reputacional direto no negócio.',
              'Cada interação é uma oportunidade de reforçar a credibilidade da empresa, transformar potenciais detratores em defensores da marca e identificar oportunidades de melhoria contínua.'
            ],
            highlightBox: {
              type: 'info',
              title: 'Impacto Estratégico',
              text: 'Mais de 80% dos clientes afirmam que a experiência proporcionada por uma empresa é tão importante quanto seus produtos ou serviços.'
            }
          },
          {
            subheading: 'Aula 1.2: Atendimento Transacional vs. Experiência do Cliente (CX)',
            body: [
              'O Atendimento Tradicional (transacional) tem foco no fechamento imediato do chamado ou na resposta pontual a uma solicitação (ex: "Aqui está o boleto").',
              'A Experiência do Cliente (CX - Customer Experience) é relacional e holística: engloba todas as percepções, sentimentos e memórias construídas ao longo de toda a jornada do consumidor com a marca, antes, durante e após a compra.',
              'Enquanto o atendimento transacional se contenta com a ausência de reclamações, o CX busca a facilidade de esforço (Customer Effort Score) e o encantamento genuíno.'
            ],
            highlightBox: {
              type: 'warning',
              title: 'Mudança de Mindset',
              text: 'Transacional: "Resolvi o protocolo número 1234". Relacional (CX): "Garanti que o cliente compreendesse os passos e se sentisse seguro com a solução oferecida".'
            }
          },
          {
            subheading: 'Aula 1.3: Mapeamento de Perfis Comportamentais de Clientes',
            body: [
              'Cliente Decidido/Pragmático: valoriza objetividade, rapidez e respostas diretas sem rodeios.',
              'Cliente Analítico: exige dados técnicos, comprovações, prazos exatos e riqueza de detalhes.',
              'Cliente Inseguro: necessita de paciência, validação constante, suporte passo a passo e tom acolhedor.',
              'Cliente Apressado/Impaciente: exige agilidade máxima, atualizações em tempo real e foco na ação imediata.',
              'A flexibilidade comportamental permite ao profissional calibrar sua comunicação para criar sintonia imediata com cada cliente.'
            ]
          },
          {
            subheading: 'Aula 1.4: Apresentação e Postura Profissional (Presencial e Virtual)',
            body: [
              'No atendimento presencial: contato visual acolhedor, postura ereta e aberta, sorriso receptivo e vestimenta compatível com o dress code da organização.',
              'No atendimento virtual/vídeo: enquadramento adequado de câmera, iluminação frontal, fundo profissional ou desfocado, e atenção contínua sem distrações com telas secundárias.',
              'A pontualidade é a primeira demonstração explícita de respeito ao tempo do outro.'
            ]
          }
        ]
      }
    },
    {
      id: 'atendimento-mod-2',
      number: 2,
      title: 'MÓDULO 2: Comunicação Multicanal e Empatia no Atendimento',
      summary: 'Escuta ativa, atendimento telefônico, canais digitais (Chat, WhatsApp, E-mail) e Brand Voice.',
      estimatedMinutes: 50,
      content: {
        sections: [
          {
            subheading: 'Aula 2.1: Escuta Ativa e Investigação das Reais Necessidades',
            body: [
              'Escutar ativamente significa suspender julgamentos prévios e focar 100% no que o cliente está expressando, verbalmente e emocionalmente.',
              'Técnica do Espelhamento e Parafraseamento: confirme o entendimento antes de responder ("Se entendi corretamente, o senhor precisa que o relatório seja reenviado até as 17h, correto?").',
              'Uso estratégico de perguntas abertas ("Poderia me detalhar o que ocorreu?") para diagnóstico e perguntas fechadas ("O erro ocorreu após atualizar a página?") para confirmação rápida.'
            ],
            highlightBox: {
              type: 'info',
              title: 'Dica Prática',
              text: 'Evite interromper o cliente enquanto ele relata a dúvida ou dor. Permita que ele conclua seu raciocínio antes de intervir.'
            }
          },
          {
            subheading: 'Aula 2.2: Atendimento Telefônico Profissional',
            body: [
              'Padronização de saudação: saudação inicial + identificação da empresa + nome do profissional + oferta de ajuda ("Bom dia, SkillHub! Me chamo Maria, como posso te ajudar hoje?").',
              'Modulação e tom de voz: o tom da voz transmite energia, segurança e empatia — no telefone, a entonação substitui a expressão facial.',
              'Uso de scripts flexíveis: utilize roteiros como guias estruturais, nunca como leituras robóticas ou impessoais.'
            ]
          },
          {
            subheading: 'Aula 2.3: Atendimento via Canais Digitais (WhatsApp, Chat e E-mail)',
            body: [
              'WhatsApp Corporativo e Chat: rapidez de resposta, frases concisas, divisão de textos em parágrafos curtos e uso comedido e adequado de pontuação e emojis.',
              'E-mail Corporativo: assunto objetivo, saudação formal ou cordial, estruturação em tópicos numerados e assinatura profissional completa.',
              'Tempo de Primeira Resposta (FRT): atenda às expectativas de agilidade sem abrir mão da precisão técnica.'
            ]
          },
          {
            subheading: 'Aula 2.4: Tom de Voz da Marca (Brand Voice) e Personalização',
            body: [
              'Cada empresa possui um tom de voz característico: do extremamente formal e corporativo ao informal e descontraído.',
              'O atendente deve harmonizar as diretrizes da marca com a sensibilidade humana individualizada.',
              'Evite respostas genéricas com "copia e cola" desatento — personalize o nome do cliente e cite os dados específicos da situação relatada.'
            ]
          }
        ]
      }
    },
    {
      id: 'atendimento-mod-3',
      number: 3,
      title: 'MÓDULO 3: Gestão de Situações Difíceis, Conflitos e Desescalada',
      summary: 'Desescalada verbal, dizer não com empatia, diagnóstico de causa-raiz e negociação ganha-ganha.',
      estimatedMinutes: 50,
      content: {
        sections: [
          {
            subheading: 'Aula 3.1: Técnicas de Desescalada Verbal com Clientes Irritados',
            body: [
              'Princípio do "Não levar para o lado pessoal": o cliente está reagindo à frustração gerada pelo problema, não contra você.',
              'Acolhimento emocional: valide a dor do cliente antes de apresentar a solução técnica ("Compreendo perfeitamente sua frustração e peço desculpas pelo transtorno. Vou me dedicar pessoalmente para resolver isso agora").',
              'Redução do volume e ritmo de fala: quando o cliente altera o tom, falar de forma pausada e calma desacelera naturalmente a tensão do diálogo.'
            ],
            highlightBox: {
              type: 'warning',
              title: 'O que NUNCA dizer',
              text: 'Jamais diga "o senhor precisa se acalmar" ou "isso não é culpa do meu setor". Tais frases aumentam a hostilidade imediatamente.'
            }
          },
          {
            subheading: 'Aula 3.2: Como Dizer "Não" com Empatia e Propor Alternativas',
            body: [
              'A técnica do Enquadramento Positivo: foque no que você PODE fazer em vez de enfatizar o que é proibido.',
              'Em vez de: "Não podemos cancelar fora do prazo", use: "O prazo regulamentar expirou ontem, mas o que posso providenciar para você de imediato é a suspensão temporária da cobrança enquanto analisamos alternativas com a gerência".',
              'Transparência com gentileza: explique o motivo da política sem transferir a responsabilidade para "o sistema".'
            ]
          },
          {
            subheading: 'Aula 3.3: Resolução de Reclamações na Causa-Raiz',
            body: [
              'Técnica dos 5 Porquês aplicada ao atendimento para descobrir a origem da falha e não apenas mitigar o sintoma.',
              'Encaminhamento interno qualificado: repasse o histórico detalhado aos setores de apoio para que o cliente não precise recontar a história toda vez.',
              'Registro impecável de logs e notas de suporte no sistema de CRM.'
            ]
          },
          {
            subheading: 'Aula 3.4: Técnicas de Negociação Ganha-Ganha no Suporte',
            body: [
              'Identificação do interesse real versus a posição manifestada: muitas vezes o cliente pede devolução total porque apenas quer ser ouvido e ter sua dúvida sanada.',
              'Concessões inteligentes: ofereça compensações sustentáveis (ex: prazo estendido, desconto em renovação, treinamento guiado) que preservem a margem do negócio e restabeleçam a confiança do consumidor.'
            ]
          }
        ]
      }
    },
    {
      id: 'atendimento-mod-4',
      number: 4,
      title: 'MÓDULO 4: Fidelização, Indicadores de CX e Avaliação Final',
      summary: 'Follow-up proativo, métricas de suporte (NPS, CSAT, FCR), cultura de feedback e certificação.',
      estimatedMinutes: 45,
      content: {
        sections: [
          {
            subheading: 'Aula 4.1: O Ciclo de Pós-Atendimento e Follow-up Proativo',
            body: [
              'O relacionamento não se encerra no fechamento do ticket. Entrar em contato após 24 a 48 horas para verificar se a solução continua funcionando consolida a lealdade do cliente.',
              'Transformando o suporte reativo em suporte proativo: antecipe-se a dúvidas frequentes enviando tutoriais ou links de apoio.'
            ]
          },
          {
            subheading: 'Aula 4.2: Métricas Essenciais de CX e Atendimento',
            body: [
              'NPS (Net Promoter Score): mede a probabilidade de recomendação da marca em uma escala de 0 a 10 (Detratores: 0 a 6; Neutros: 7 e 8; Promotores: 9 e 10).',
              'CSAT (Customer Satisfaction Score): mede a satisfação específica com a interação recém-concluída (ex: "Quão satisfeito você ficou com o atendimento de hoje?").',
              'FCR (First Contact Resolution): porcentagem de solicitações completamente solucionadas logo no primeiro contato, sem necessidade de reiteração.',
              'AHT / TMA (Tempo Médio de Atendimento): equilíbrio entre rapidez e qualidade resolutiva.'
            ],
            highlightBox: {
              type: 'info',
              title: 'Métricas em Equilíbrio',
              text: 'Um FCR alto aliado a um CSAT elevado é o principal indicador de uma operação de suporte madura e humanizada.'
            }
          },
          {
            subheading: 'Aula 4.3: Cultura de Melhoria Contínua e Inteligência de Feedback',
            body: [
              'Reclamações não são incômodos: são consultorias gratuitas apontando falhas reais no produto ou processo.',
              'Compartilhamento de dados com os times de produto e desenvolvimento para retroalimentar melhorias contínuas.'
            ]
          },
          {
            subheading: 'Aula 4.4: Encerramento do Curso e Orientações para a Avaliação',
            body: [
              'Complete o Quiz de 7 perguntas sobre os 4 módulos para validar suas competências em Atendimento e CX.',
              'Atingindo o aproveitamento mínimo de 70%, seu Selo Oficial de Especialista em Atendimento & CX será emitido e adicionado ao seu currículo.'
            ]
          }
        ]
      }
    }
  ],
  caseStudies: [],
  quiz: [
    {
      id: 1,
      question: "Qual é a principal diferença prática entre atendimento ao cliente e Customer Experience (CX)?",
      options: [
        "Atendimento é exclusivo de lojas físicas, enquanto CX se aplica apenas ao comércio eletrônico.",
        "Atendimento refere-se às interações pontuais de suporte; CX engloba a percepção global e a jornada completa do cliente com a marca.",
        "CX lida apenas com a resolução de problemas financeiros, enquanto atendimento lida com dúvidas simples.",
        "Atendimento busca encantar o cliente a todo custo; CX foca apenas em reduzir custos operacionais."
      ],
      correct: 1,
      explanation: "Atendimento são os pontos de contato pontuais de suporte, enquanto Customer Experience (CX) compreende toda a percepção, sentimentos e jornada holística do cliente com a marca."
    },
    {
      id: 2,
      question: "Ao atender um cliente extremamente irritado por conta de uma falha grave na entrega de um serviço, qual deve ser a primeira postura profissional?",
      options: [
        "Dizer imediatamente ao cliente que ele precisa se acalmar para que você possa falar.",
        "Praticar a escuta ativa, validar a frustração do cliente com empatia e focar na busca imediata da solução.",
        "Transferir a ligação para outro setor sem aviso prévio para não absorver a tensão do cliente.",
        "Manter silêncio absoluto até que o cliente decida encerrar a chamada por conta própria."
      ],
      correct: 1,
      explanation: "A primeira postura deve ser de acolhimento e escuta ativa, validando os sentimentos do cliente antes de direcionar o foco para uma solução ágil e resolutiva."
    },
    {
      id: 3,
      question: "O que caracteriza o conceito de 'Tom de Voz da Marca' (Brand Voice) no atendimento ao cliente?",
      options: [
        "A obrigação de usar gírias e memes em qualquer canal para parecer sempre jovem e moderno.",
        "A personificação da identidade da empresa aplicada à comunicação com os clientes, equilibrando empatia e as diretrizes da organização.",
        "O uso de termos jurídicos complexos para desencorajar o cliente a registrar reclamações formais.",
        "O envio de respostas automáticas genéricas para encerrar os chamados o mais rápido possível."
      ],
      correct: 1,
      explanation: "Tom de voz é a aplicação da personalidade e valores da marca na forma de se comunicar com o cliente, equilibrando empatia, clareza e adequação ao contexto."
    },
    {
      id: 4,
      question: "O indicador First Contact Resolution (FCR) avalia qual aspecto do atendimento?",
      options: [
        "O tempo total que o cliente permaneceu na fila de espera antes de ser atendido.",
        "O percentual de solicitações ou chamados que são completamente resolvidos logo na primeira interação com a equipe de suporte.",
        "A quantidade de clientes que compram um segundo produto após entrarem em contato com o suporte.",
        "O valor de receita gerado a partir de vendas cruzadas durante o suporte."
      ],
      correct: 1,
      explanation: "FCR (First Contact Resolution) mede a taxa de demandas que são completamente resolvidas logo no primeiro atendimento, sem necessidade de recontato."
    },
    {
      id: 5,
      question: "Em um processo de negociação e resolução de conflitos, o conceito de solução 'Ganha-Ganha' significa que:",
      options: [
        "A empresa aceita qualquer prejuízo financeiro apenas para não perder a avaliação positiva do cliente.",
        "O cliente deve ceder todas as suas exigências em favor das políticas internas da empresa.",
        "Encontra-se um acordo equilibrado que atende à necessidade do cliente e preserva a viabilidade/regras da empresa.",
        "Ambas as partes desistem de resolver a situação e o contrato é cancelado."
      ],
      correct: 2,
      explanation: "A negociação ganha-ganha busca uma solução mutuamente vantajosa, respeitando os direitos e expectativas do cliente e a sustentabilidade operacional da empresa."
    },
    {
      id: 6,
      question: "Como o Net Promoter Score (NPS) classifica um cliente que respondeu à pesquisa de satisfação com nota 7 ou 8?",
      options: [
        "Promotor da marca.",
        "Neutro / Passivo.",
        "Detrator da marca.",
        "Cliente Inativo."
      ],
      correct: 1,
      explanation: "No NPS, notas de 0 a 6 são Detratores, notas 7 e 8 são Neutros/Passivos e notas 9 e 10 são Promotores da marca."
    },
    {
      id: 7,
      question: "Durante um atendimento presencial ou via vídeo, qual elemento NÃO verbal reforça a postura de atenção e empatia com o consumidor?",
      options: [
        "Manter contato visual adequado e postura corporal aberta durante a explicação do cliente.",
        "Verificar constantemente as notificações do celular pessoal enquanto o cliente fala.",
        "Evitar olhar para o cliente para demonstrar foco na digitação do sistema.",
        "Cruzar os braços e manter expressão rígida para demonstrar autoridade."
      ],
      correct: 0,
      explanation: "Contato visual natural e postura corporal receptiva transmitem atenção genuína, enquanto distrações com celulares ou expressões fechadas criam barreiras de comunicação."
    }
  ]
};

// =========================================================================
// CURSO OFICIAL: ANÁLISE DE DADOS E BUSINESS INTELLIGENCE COM POWER BI
// =========================================================================
export const CURSO_ANALISE_DADOS_POWER_BI: Course = {
  id: 'curso-analise-dados-power-bi',
  trackId: 'trilha-tecnologia-produtividade',
  trackName: 'TRILHA 3: Tecnologia, Informática & Produtividade com IA',
  category: 'Tecnologia e Dados',
  targetAudienceType: ['JOVEM_APRENDIZ', 'ESTUDANTE', 'PRIMEIRO_EMPREGO', 'ESTAGIARIO'],
  title: 'Análise de Dados e Business Intelligence com Power BI',
  subtitle: 'Estruturação de dados, ETL com Power Query, modelagem Star Schema, fórmulas DAX intermediárias e criação de Dashboards interativos.',
  hours: 20,
  equivalentHours: 20,
  modality: 'EAD 100% Gratuito (Escola Virtual)',
  targetAudience: 'Estudantes, jovens aprendizes, estagiários e profissionais que desejam transformar dados brutos em relatórios gerenciais e inteligência competitiva com Power BI.',
  prerequisites: 'Conhecimentos básicos de informática e noções elementares de planilhas eletrônicas.',
  badgeName: 'Especialista em Business Intelligence & Power BI',
  badgeCategory: 'Análise de Dados & BI',
  badgeIcon: 'BarChart3',
  accentColor: '#F59E0B',
  level: 'Avançado',
  videoUrl: 'https://youtu.be/QnCSgEsIHMA',
  youtubeId: 'QnCSgEsIHMA',
  learningObjectives: [
    'Compreender os fundamentos de Business Intelligence e o ciclo de vida dos dados corporativos.',
    'Dominar a extração, tratamento e transformação de dados (ETL) no Power Query.',
    'Modelar relacionamentos dimensionais utilizando as melhores práticas do Esquema Estrela (Star Schema).',
    'Construir medidas dinâmicas com funções DAX intermediárias (CALCULATE, DIVIDE, SUM, AVERAGE).',
    'Projetar dashboards executivos com foco em usabilidade, filtros cruzados, drill-down e storytelling visual.'
  ],
  modules: [
    {
      id: 'pbi-mod-1',
      number: 1,
      title: 'MÓDULO 1: Fundamentos de BI e ETL no Power Query',
      summary: 'Conceitos de Business Intelligence, fontes de dados e higienização analítica no Power Query.',
      estimatedMinutes: 50,
      content: {
        sections: [
          {
            subheading: 'Aula 1.1: Introdução ao Business Intelligence e Ciclo de Vida dos Dados',
            body: [
              'Business Intelligence (BI) é o conjunto de teorias, metodologias, processos e tecnologias que transformam dados brutos em informações úteis e acionáveis para a tomada de decisão estratégica.',
              'O ciclo de vida analítico compreende: Coleta e Extração -> Limpeza e Transformação (ETL) -> Modelagem e Cálculos (DAX) -> Visualização e Storytelling -> Compartilhamento e Tomada de Decisão.',
              'No mercado contemporâneo, profissionais capazes de traduzir números em narrativas visuais ganham protagonismo direto no apoio à liderança e eficiência operacional.'
            ],
            highlightBox: {
              type: 'info',
              title: 'Cultura Data-Driven',
              text: 'Empresas orientadas a dados tomam decisões até 3x mais rápidas e reduzem em mais de 40% perdas operacionais decorrentes de palpites intuitivos.'
            }
          },
          {
            subheading: 'Aula 1.2: Conexão a Diferentes Fontes de Dados',
            body: [
              'O Power BI permite integração nativa com centenas de fontes: planilhas Excel (.xlsx), arquivos delimitados (.csv, .txt), pastas locais e da nuvem (SharePoint, OneDrive), bancos de dados relacionais (SQL Server, PostgreSQL, MySQL) e APIs da web.',
              'Diferença entre o modo Import (dados carregados na memória do Power BI com compressão VertiPaq) e DirectQuery (consultas disparadas em tempo real contra o banco de origem).',
              'Boas práticas de governança: manutenção de caminhos padronizados e parametrização de fontes para facilitar a atualização contínua.'
            ]
          },
          {
            subheading: 'Aula 1.3: Limpeza, Tratamento e Transformação no Power Query',
            body: [
              'O Power Query é o motor de ETL visual: cada ação gera uma etapa sequencial gravada na linguagem M, permitindo automação total de rotinas de higienização.',
              'Operações fundamentais: promoção da primeira linha a cabeçalho, tipagem correta de dados (número decimal, número inteiro, texto, data/hora), remoção de nulos, duplicatas e espaços em excesso.',
              'Transformações avançadas: Mesclar Consultas (similar ao PROCV/Join relacional) e Acrescentar Consultas (empilhamento de tabelas/Union All).'
            ],
            highlightBox: {
              type: 'warning',
              title: 'Regra de Ouro do ETL',
              text: 'Quanto mais cedo o dado for tratado no Power Query, mais leve, rápido e eficiente será o desempenho do seu modelo analítico e fórmulas DAX.'
            }
          }
        ]
      }
    },
    {
      id: 'pbi-mod-2',
      number: 2,
      title: 'MÓDULO 2: Modelagem de Dados e Linguagem DAX Intermediária',
      summary: 'Arquitetura Star Schema, cardinalidade de relacionamentos e cálculo de medidas dinâmicas com DAX.',
      estimatedMinutes: 55,
      content: {
        sections: [
          {
            subheading: 'Aula 2.1: Construção de Modelos de Dados (Star Schema e Relacionamentos)',
            body: [
              'A modelagem dimensional é o alicerce de relatórios performáticos. O modelo padrão da indústria é o Star Schema (Esquema Estrela), composto por Tabelas Fato e Tabelas Dimensão.',
              'Tabela Fato (F_Vendas, F_Chamados): armazena registros de transações com métricas numéricas acumuladas e chaves de relacionamento (chaves estrangeiras).',
              'Tabela Dimensão (D_Cliente, D_Produto, D_Calendario): armazena atributos descritivos e contextos categóricos de análise.',
              'Tipos de relacionamento: a relação 1 para Muitos (1:*) de direção única (dimensão filtra fato) garante integridade relacional e previne ambiguidades analíticas.'
            ],
            highlightBox: {
              type: 'calc',
              title: 'Estrutura Estrela',
              text: 'Evite tabelas únicas gigantescas (flat tables). O particionamento em Fatos e Dimensões otimiza a memória VertiPaq do Power BI em até 10 vezes.'
            }
          },
          {
            subheading: 'Aula 2.2: Colunas Calculadas vs. Medidas Implícitas e Explícitas',
            body: [
              'Colunas Calculadas: avaliadas linha a linha durante a carga de dados. Consomem armazenamento em disco e memória RAM permanentemente.',
              'Medidas DAX: expressões calculadas dinamicamente sob demanda, avaliadas no momento exato em que o usuário interage com o gráfico ou filtro.',
              'Medidas Explícitas (criadas manualmente pelo analista) conferem controle total sobre formatação, agregação e reuso em outras fórmulas complexas.'
            ]
          },
          {
            subheading: 'Aula 2.3: Funções DAX Essenciais e Inteligência Temporal',
            body: [
              'Função CALCULATE: o coração do DAX. Avalia uma expressão modificando, aplicando ou substituindo o contexto de filtro visual existente.',
              'Função DIVIDE: executa divisão segura tratando automaticamente divisão por zero (retornando BLANK() ou valor padrão sem quebrar o relatório).',
              'Funções agregadoras e iteradoras: distinção entre SUM (agrega uma coluna) e SUMX (itera linha a linha avaliando expressões antes de somar).',
              'Inteligência Temporal básica (SAMEPERIODLASTYEAR, DATEADD, TOTALYTD): comparativos de desempenho ano contra ano (YoY) fundamentados em uma D_Calendario consistente.'
            ]
          }
        ]
      }
    },
    {
      id: 'pbi-mod-3',
      number: 3,
      title: 'MÓDULO 3: Storytelling com Dados e Visualização de Indicadores (KPIs)',
      summary: 'Seleção visual, cartões de metas, segmentadores dinâmicos, drill-down e experiência do usuário.',
      estimatedMinutes: 50,
      content: {
        sections: [
          {
            subheading: 'Aula 3.1: Escolha dos Visuais Corretos para Análise',
            body: [
              'Cada tipo de gráfico tem uma finalidade analítica clara: gráficos de linhas para evolução temporal contínua; barras/colunas para comparações entre categorias; matrizes para dados hierárquicos detalhados.',
              'Evite gráficos de pizza ou rosca com mais de 3 categorias: o olho humano tem dificuldade em quantificar ângulos e áreas em vez de comprimentos lineares.',
              'Hierarquia visual: posicione os indicadores mais críticos (KPIs macro) no topo superior esquerdo do painel, seguindo o padrão natural de leitura em F.'
            ]
          },
          {
            subheading: 'Aula 3.2: Criação de Cartões de KPIs, Filtros e Drill-Down Interativo',
            body: [
              'Novo Cartão de KPI: exibição de valores absolutos, variações percentuais em relação à meta e formatação condicional visual (verde/vermelho).',
              'Segmentadores de Dados (Slicers): filtros interativos por período, canal de vendas ou filial que reagem instantaneamente em todos os visuais conectados.',
              'Recurso de Drill-Down: navegação vertical entre níveis hierárquicos de uma dimensão (exemplo: Ano -> Trimestre -> Mês -> Dia) com um único clique.'
            ],
            highlightBox: {
              type: 'info',
              title: 'Interatividade Sem Sobrecarga',
              text: 'Configure as interações visuais no menu Formato para impedir que filtros desnecessários recalculem tabelas pesadas desnecessariamente.'
            }
          },
          {
            subheading: 'Aula 3.3: Boas Práticas de Design, Cores e Storytelling Visual',
            body: [
              'Uso intencional de cores: adote paleta corporativa neutra com 1 ou 2 cores de contraste apenas para apontar destaques e anomalias.',
              'Espaçamento e alinhamento: reserve margens de respiro entre os cartões para evitar poluição visual e cansaço cognitivo.',
              'Foco no usuário final: construa painéis intuitivos que respondam às 3 perguntas de ouro: O que aconteceu? Por que aconteceu? O que devemos fazer a respeito?'
            ]
          }
        ]
      }
    },
    {
      id: 'pbi-mod-4',
      number: 4,
      title: 'MÓDULO 4: Publicação, Projeto Prático e Avaliação Final',
      summary: 'Projeto prático de vendas, publicação na nuvem (Power BI Service) e certificação oficial.',
      estimatedMinutes: 45,
      content: {
        sections: [
          {
            subheading: 'Aula 4.1: Vídeo de Conclusão e Apresentação do Projeto Prático',
            body: [
              'Assista à demonstração prática passo a passo da construção de um Dashboard de Vendas e Performance Comercial no Power BI Desktop.',
              'Observe a conexão com planilhas reais de transações, a modelagem dimensional no Star Schema e o cálculo de medidas de faturamento, ticket médio e margem.',
              'A conclusão completa desta aula desbloqueia sua avaliação final e a emissão do certificado de especialista.'
            ]
          },
          {
            subheading: 'Aula 4.2: Publicação no Power BI Service e Compartilhamento',
            body: [
              'Publicação segura no ambiente online do Power BI Service através do botão Publicar no Desktop.',
              'Configuração de Espaços de Trabalho (Workspaces), controle de acesso por perfis e compartilhamento por link ou aplicativos.',
              'Atualização agendada de dados através de Gateways de dados locais e nuvem para manter as informações sempre sincronizadas.'
            ]
          },
          {
            subheading: 'Aula 4.3: Avaliação Final de Fixação e Emissão de Selo Oficial',
            body: [
              'Realize o Quiz de 7 questões intermediárias para validar seu domínio em Power Query, DAX, Modelagem Star Schema e Storytelling.',
              'Alcançando aproveitamento igual ou superior a 70%, seu Selo Oficial de Especialista em Business Intelligence & Power BI será emitido e adicionado ao seu perfil profissional.'
            ]
          }
        ]
      }
    }
  ],
  caseStudies: [],
  quiz: [
    {
      id: 1,
      question: "No Power BI, qual é a função principal da etapa de ETL (Extract, Transform, Load) realizada dentro do Power Query?",
      options: [
        "Criar layouts de relatórios visuais e gráficos interativos para apresentação final.",
        "Conectar às fontes de origem, limpar, tratar e estruturar os dados antes de carregá-los para o modelo.",
        "Substituir o uso de fórmulas DAX em medidas de inteligência temporal.",
        "Exportar relatórios diretamente em formato de apresentação do PowerPoint."
      ],
      correct: 1,
      explanation: "O Power Query é o mecanismo de ETL do Power BI, responsável por extrair dados de diversas fontes, transformar/limpar inconsistências e carregar a base tratada para o modelo analítico."
    },
    {
      id: 2,
      question: "Ao construir um Modelo de Dados no Power BI, qual arquitetura de modelagem é considerada a melhor prática de mercado?",
      options: [
        "Esquema Estrela (Star Schema), separando tabelas Fato (eventos/transações) e tabelas Dimensão (contextos/atributos).",
        "Tabela Única (Flat Table), combinando todas as informações em uma única planilha gigante sem relacionamentos.",
        "Modelagem Cíclica, onde todas as tabelas se conectam entre si com relacionamentos bidirecionais.",
        "Esquema de Lista, onde as tabelas não possuem nenhuma chave primária ou estrangeira."
      ],
      correct: 0,
      explanation: "O Star Schema (Esquema Estrela) é o padrão ouro de modelagem dimensional, organizando tabelas Fato centrais conectadas a tabelas Dimensão com relacionamentos 1:N."
    },
    {
      id: 3,
      question: "Qual é a principal diferença entre uma Coluna Calculada e uma Medida no Power BI?",
      options: [
        "Colunas Calculadas consomem memória RAM e espaço em disco pois são calculadas linha a linha na carga; Medidas são calculadas dinamicamente no momento da visualização.",
        "Medidas só podem ser usadas no Power Query, enquanto Colunas Calculadas funcionam apenas nos relatórios visuais.",
        "Colunas Calculadas não aceitam funções DAX, enquanto Medidas aceitam apenas código SQL.",
        "Não existe diferença prática; ambas gastam exatamente o mesmo recurso computacional."
      ],
      correct: 0,
      explanation: "Colunas calculadas avaliam valores linha por linha no carregamento consumindo armazenamento e memória, enquanto medidas DAX são avaliadas sob demanda respeitando o contexto de filtro visual."
    },
    {
      id: 4,
      question: "Em linguagem DAX, qual é a função da fórmula CALCULATE?",
      options: [
        "Realizar apenas somas simples de colunas inteiras de uma tabela.",
        "Avaliar uma expressão alterando ou modificando o contexto de filtro atual.",
        "Contar a quantidade de textos duplicados em uma coluna específica.",
        "Formatar um número para exibição de moeda local."
      ],
      correct: 1,
      explanation: "A função CALCULATE é a mais poderosa do DAX pois permite modificar, substituir ou adicionar filtros ao contexto de avaliação atual de uma medida."
    },
    {
      id: 5,
      question: "O recurso 'Drill-Down' em um gráfico do Power BI permite ao usuário:",
      options: [
        "Navegar hierarquicamente para níveis mais detalhados dos dados (ex: do Ano para Mês e Dia) ao clicar em um ponto do visual.",
        "Alterar a cor de fundo do dashboard automaticamente.",
        "Apagar os dados incorretos da base diretamente no gráfico.",
        "Exportar o gráfico como uma imagem de alta resolução."
      ],
      correct: 0,
      explanation: "O Drill-Down permite aprofundar a visualização através de níveis hierárquicos (Ano -> Trimestre -> Mês -> Dia) diretamente nos visuais interativos."
    },
    {
      id: 6,
      question: "Para evitar erros de cálculo em divisões onde o denominador pode ser zero, qual função DAX intermediária deve ser utilizada?",
      options: [
        "SUMX()",
        "DIVIDE()",
        "RELATED()",
        "FILTER()"
      ],
      correct: 1,
      explanation: "A função DIVIDE realiza a divisão segura tratando divisão por zero ou denominadores nulos automaticamente, permitindo definir um resultado alternativo (BLANK() por padrão)."
    },
    {
      id: 7,
      question: "O que caracteriza uma tabela FATO em um modelo relacional no Power BI?",
      options: [
        "Contém atributos descritivos e cadastrais, como nome de clientes, categorias de produtos e datas.",
        "Contém valores quantitativos e numéricos acumulados resultantes de eventos ou transações do negócio (ex: vendas, chamados, acessos).",
        "Uma tabela temporária utilizada apenas para armazenar logotipos do relatório.",
        "Uma tabela que guarda unicamente as regras de permissão de acesso dos usuários (RLS)."
      ],
      correct: 1,
      explanation: "Tabelas Fato registram ocorrências e métricas quantitativas de transações e eventos de negócio vinculadas a chaves que apontam para as tabelas Dimensão."
    }
  ]
};

// =========================================================================
// CURSO OFICIAL: GESTÃO ESTRATÉGICA DE PROJETOS E METODOLOGIAS DE GERENCIAMENTO
// =========================================================================
export const CURSO_GESTAO_ESTRATEGICA_PROJETOS: Course = {
  id: 'curso-gestao-estrategica-projetos',
  trackId: 'trilha-rotinas-gestao',
  trackName: 'TRILHA 4: Rotinas Administrativas & Gestão Empresarial',
  category: 'Administração e Negócios',
  targetAudienceType: ['JOVEM_APRENDIZ', 'ESTUDANTE', 'PRIMEIRO_EMPREGO', 'ESTAGIARIO'],
  title: 'Gestão Estratégica de Projetos e Metodologias de Gerenciamento',
  subtitle: 'Planejamento, escopo, EAP/WBS, matriz RACI, metodologias ágeis (Scrum e Kanban), análise de riscos e liderança.',
  hours: 20,
  equivalentHours: 20,
  modality: 'EAD 100% Gratuito (Escola Virtual)',
  targetAudience: 'Estudantes, jovens aprendizes, estagiários e profissionais que desejam dominar o planejamento, execução e monitoramento de projetos com abordagens tradicionais e ágeis.',
  prerequisites: 'Nenhum pré-requisito.',
  badgeName: 'Especialista em Gestão Estratégica de Projetos',
  badgeCategory: 'Gestão Empresarial & Projetos',
  badgeIcon: 'FolderKanban',
  accentColor: '#3B82F6',
  level: 'Avançado',
  videoUrl: 'https://youtu.be/qO0GZGy76gc',
  youtubeId: 'qO0GZGy76gc',
  learningObjectives: [
    'Compreender a diferença prática entre projetos temporários e operações contínuas.',
    'Construir o escopo do projeto, decomposição em EAP/WBS e Matriz de Responsabilidades (RACI).',
    'Comparar abordagens preditivas (Waterfall/Cascata) com frameworks adaptativos e ágeis (Scrum e Kanban).',
    'Aplicar gestão visual de fluxo com limitação de WIP para identificação de gargalos.',
    'Mapear riscos e elaborar planos preventivos de contingência (Probabilidade x Impacto).'
  ],
  modules: [
    {
      id: 'proj-mod-1',
      number: 1,
      title: 'MÓDULO 1: Fundamentos da Gestão de Projetos e Alinhamento Estratégico',
      summary: 'Conceito de projeto vs. operação contínua, ciclo de vida e papel do Gerente de Projetos.',
      estimatedMinutes: 50,
      content: {
        sections: [
          {
            subheading: 'Aula 1.1: O Que Caracteriza um Projeto e Diferença para Operações Contínuas',
            body: [
              'Um Projeto é um esforço temporário empreendido para criar um produto, serviço ou resultado exclusivo, com início, meio e fim claramente delimitados.',
              'As Operações Contínuas são trabalhos rotineiros, padronizados e permanentes que sustentam a operação cotidiana da organização (ex: faturamento mensal, atendimento diário ao cliente).',
              'Compreender essa distinção permite alocar recursos com precisão, definir metas temporais objetivas e gerenciar mudanças de forma estruturada.'
            ],
            highlightBox: {
              type: 'info',
              title: 'Conceito-Chave PMBOK',
              text: 'Projetos geram inovação e transformação; Operações garantem a estabilidade e a continuidade do negócio.'
            }
          },
          {
            subheading: 'Aula 1.2: Ciclo de Vida do Projeto e o Papel de Liderança do GP',
            body: [
              'O ciclo de vida tradicional contempla 5 grupos de processos: Iniciação (Termo de Abertura / TAP) -> Planejamento -> Execução -> Monitoramento e Controle -> Encerramento formal.',
              'O Gerente de Projetos (GP) atua como articulador estratégico, integrando expectativas de stakeholders, mediando conflitos internos e garantindo o alinhamento da equipe.',
              'Soft skills indispensáveis ao líder de projetos: comunicação transparente, negociação assertiva, empatia e adaptabilidade a cenários voláteis.'
            ]
          },
          {
            subheading: 'Aula 1.3: Alinhamento de Objetivos com as Metas Estratégicas',
            body: [
              'Nenhum projeto deve existir no vácuo: todo investimento deve responder diretamente a metas corporativas (OKRs, KPIs estratégicos e expansão de mercado).',
              'Critérios de priorização de projetos: análise de custo-benefício, retorno sobre investimento (ROI) e alinhamento com a visão de longo prazo da organização.',
              'Construção do Business Case e validação formal de viabilidade antes do início do planejamento detalhado.'
            ],
            highlightBox: {
              type: 'warning',
              title: 'Atenção Estratégica',
              text: 'Entregar um projeto no prazo e no custo não basta se ele não gerar valor real perceptível para a estratégia do negócio.'
            }
          }
        ]
      }
    },
    {
      id: 'proj-mod-2',
      number: 2,
      title: 'MÓDULO 2: Planejamento, Escopo, EAP e Cronograma',
      summary: 'Declaração de escopo, Estrutura Analítica do Projeto (EAP/WBS), matriz RACI e cronograma.',
      estimatedMinutes: 55,
      content: {
        sections: [
          {
            subheading: 'Aula 2.1: Definição do Escopo e Construção da EAP (WBS)',
            body: [
              'O Escopo define as fronteiras exatas do que faz parte e do que NÃO faz parte das entregas do projeto, prevenindo o temido Scope Creep (aumento descontrolado de escopo).',
              'A Estrutura Analítica do Projeto (EAP / WBS - Work Breakdown Structure) é uma decomposição hierárquica e visual orientada a entregáveis finais.',
              'Regra dos 100%: a EAP deve conter 100% do trabalho definido pelo escopo do projeto, nem mais nem menos, descendo até o nível de Pacotes de Trabalho gerenciáveis.'
            ],
            highlightBox: {
              type: 'calc',
              title: 'Regra dos 100% na EAP',
              text: 'A soma dos pacotes de trabalho em cada nível hierárquico deve totalizar exatamente 100% da entrega do nível superior correspondente.'
            }
          },
          {
            subheading: 'Aula 2.2: Estimativa de Prazos, Sequenciamento e Matriz RACI',
            body: [
              'Sequenciamento de atividades: dependências de término para início (TI), marcos críticos (milestones) e identificação do Caminho Crítico (CPM).',
              'Matriz RACI para clareza absoluta de papéis: R (Responsible / Quem faz), A (Accountable / Quem aprova e responde), C (Consulted / Quem opina) e I (Informed / Quem recebe atualização).',
              'Evite ambiguidade: cada pacote de trabalho ou entrega deve possuir exatamente 1 (um) Accountable.'
            ]
          },
          {
            subheading: 'Aula 2.3: Planejamento e Alocação de Recursos e Orçamento',
            body: [
              'Levantamento de recursos materiais, licenças tecnológicas e dimensionamento de horas da equipe multidisciplinar.',
              'Construção da Linha de Base de Custos (Cost Baseline) e reservas orçamentárias de contingência para eventos previstos e imprevistos.',
              'Nivelamento de recursos (Resource Leveling) para evitar sobrecarga ou ociosidade dos membros do time ao longo do cronograma.'
            ]
          }
        ]
      }
    },
    {
      id: 'proj-mod-3',
      number: 3,
      title: 'MÓDULO 3: Metodologias Ágeis, Híbridas e Tradicionais (Predictive vs. Adaptive)',
      summary: 'Modelo Cascata (Waterfall), Framework Scrum, Cerimônias e Gestão de Fluxo com Kanban.',
      estimatedMinutes: 55,
      content: {
        sections: [
          {
            subheading: 'Aula 3.1: Metodologias Tradicionais (Waterfall/Cascata) e Quando Aplicá-las',
            body: [
              'O modelo Preditivo (Waterfall) é linear e sequencial: cada fase precisa ser formalmente aprovada antes do início da seguinte.',
              'Indicações ideais: projetos com escopo muito estável, requisitos normativos rigorosos ou custos proibitivos de retrabalho (ex: engenharia civil, infraestrutura fabril).',
              'Limitações: baixa flexibilidade para absorver mudanças durante o andamento e feedback do cliente apenas nas etapas finais.'
            ]
          },
          {
            subheading: 'Aula 3.2: Framework Scrum (Papéis, Cerimônias e Artefatos)',
            body: [
              'Três Papéis essenciais: Product Owner (PO - dono do backlog e valor), Scrum Master (facilitador e guardião das práticas ágeis) e Time de Desenvolvimento (equipe multifuncional auto-organizada).',
              'Cinco Cerimônias: Sprint Planning (planejamento), Daily Scrum (alinhamento diário de 15 min), Sprint Review (apresentação do incremento), Sprint Retrospective (melhoria contínua) e a própria Sprint (ciclo de 1 a 4 semanas).',
              'Três Artefatos: Product Backlog, Sprint Backlog e Incremento Potencialmente Entregável (Definition of Done).'
            ],
            highlightBox: {
              type: 'info',
              title: 'Pilar Ágil',
              text: 'Scrum se baseia no empirismo: transparência, inspeção contínua e adaptação rápida a novas circunstâncias.'
            }
          },
          {
            subheading: 'Aula 3.3: Método Kanban para Gestão Visual de Fluxo e Limites de WIP',
            body: [
              'Princípios do Kanban: visualizar o fluxo de trabalho (Quadro To-Do, Doing, Done), limitar o Trabalho em Progresso (WIP) e gerenciar gargalos operacionais.',
              'A máxima ágil: "Pare de começar e comece a terminar" — diminuir tarefas paralelas reduz alternância de contexto e acelera o Lead Time e Cycle Time de entrega.',
              'Abordagens Híbridas (Scrumban): combinação da estrutura de ritos do Scrum com a fluidez contínua do Kanban.'
            ]
          }
        ]
      }
    },
    {
      id: 'proj-mod-4',
      number: 4,
      title: 'MÓDULO 4: Monitoramento, Análise de Riscos e Avaliação Final',
      summary: 'Simulação do plano de projeto, Matriz de Riscos (Probabilidade x Impacto) e avaliação de certificação.',
      estimatedMinutes: 45,
      content: {
        sections: [
          {
            subheading: 'Aula 4.1: Vídeo de Conclusão e Simulação do Plano de Projeto',
            body: [
              'Assista à demonstração prática de integração entre o termo de abertura, a construção da EAP, a definição do cronograma com marcos e a gestão de entregáveis em equipes multidisciplinares.',
              'Observe como um plano de projeto robusto e visual simplifica a comunicação com a liderança e garante previsibilidade às entregas.',
              'O acompanhamento completo desta aula libera o temporizador para você realizar a avaliação final de certificação.'
            ]
          },
          {
            subheading: 'Aula 4.2: Matriz de Riscos (Probabilidade x Impacto) e Planos de Mitigação',
            body: [
              'Identificação contínua de ameaças e oportunidades: um risco é um evento incerto que, se ocorrer, provocará impacto positivo ou negativo no projeto.',
              'Construção da Matriz de Riscos (Probabilidade x Impacto): classificação em níveis baixo, médio, alto e crítico (vermelho) para priorização.',
              'Estratégias de resposta a riscos: Mitigar (reduzir probabilidade/impacto), Evitar (alterar o plano), Transferir (seguros ou terceiros) ou Aceitar (com plano de contingência reservado).'
            ],
            highlightBox: {
              type: 'warning',
              title: 'Gestão Proativa',
              text: 'Gerenciar riscos antes que se tornem problemas operacionais é a marca registrada de um profissional sênior em projetos.'
            }
          },
          {
            subheading: 'Aula 4.3: Avaliação Final de Fixação e Emissão de Selo Oficial',
            body: [
              'Realize o Quiz de 7 perguntas intermediárias para validar suas competências em EAP, RACI, Scrum, Kanban e Análise de Riscos.',
              'Atingindo o aproveitamento mínimo de 70%, seu Selo Oficial de Especialista em Gestão Estratégica de Projetos será emitido e adicionado ao seu currículo profissional.'
            ]
          }
        ]
      }
    }
  ],
  caseStudies: [],
  quiz: [
    {
      id: 1,
      question: "Qual é a principal característica que diferencia um Projeto de uma Operação contínua dentro de uma organização?",
      options: [
        "Projetos são atividades repetitivas e permanentes; operações têm data para terminar.",
        "Projetos são temporários, têm início e fim definidos e geram um produto, serviço ou resultado exclusivo.",
        "Projetos não possuem orçamento delimitado, enquanto operações possuem verba fixa.",
        "Operações são gerenciadas exclusivamente por metodologias ágeis como o Scrum."
      ],
      correct: 1,
      explanation: "Projetos têm natureza temporária e produzem entregáveis exclusivos, enquanto operações são contínuas, padronizadas e mantêm o negócio em funcionamento diário."
    },
    {
      id: 2,
      question: "Na etapa de Planejamento, para que serve a Estrutura Analítica do Projeto (EAP / WBS)?",
      options: [
        "Para registrar as atas de reunião com os stakeholders da empresa.",
        "Para decompor o escopo total do projeto em partes menores e mais gerenciáveis (entregáveis).",
        "Para calcular automaticamente o salário dos membros da equipe.",
        "Para controlar as permissões de acesso ao sistema de arquivos do projeto."
      ],
      correct: 1,
      explanation: "A EAP (Estrutura Analítica do Projeto) organiza e decompõe visualmente todo o escopo do projeto em pacotes de trabalho e entregáveis menores."
    },
    {
      id: 3,
      question: "Na Matriz de Responsabilidades RACI, o que representa a letra 'A' (Accountable)?",
      options: [
        "A pessoa que executa diretamente a tarefa no dia a dia.",
        "A pessoa responsável final pela aprovação e pela qualidade da entrega (prestador de contas).",
        "O profissional que apenas precisa ser consultado antes de tomar uma decisão.",
        "O membro da equipe que deve ser apenas informado após a conclusão da atividade."
      ],
      correct: 1,
      explanation: "Na matriz RACI, o Accountable é a única pessoa com autoridade final de aprovação e prestação de contas pelo sucesso da entrega."
    },
    {
      id: 4,
      question: "No framework Scrum, qual é a responsabilidade central do Product Owner (PO)?",
      options: [
        "Remover impedimentos técnicos e facilitar os ritos diários da equipe de desenvolvimento.",
        "Definir e priorizar o Backlog do Produto de acordo com o valor para o negócio e clientes.",
        "Gerenciar diretamente o horário de trabalho e atribuição de tarefas de cada desenvolvedor.",
        "Conduzir testes de código e infraestrutura de servidores."
      ],
      correct: 1,
      explanation: "O Product Owner é a voz do cliente e do negócio no Scrum, responsável por gerenciar, refinar e priorizar os itens do Product Backlog."
    },
    {
      id: 5,
      question: "O principal objetivo de definir limites de Trabalho em Progresso (WIP - Work in Progress) no método Kanban é:",
      options: [
        "Impedir que os colaboradores façam pausas durante a jornada de trabalho.",
        "Evitar a sobrecarga do sistema, identificar gargalos no fluxo e focar na conclusão de tarefas antes de iniciar novas.",
        "Aumentar a quantidade de tarefas iniciadas simultaneamente por pessoa.",
        "Eliminar a necessidade de realizar reuniões de acompanhamento."
      ],
      correct: 1,
      explanation: "A limitação do WIP ('pare de começar e comece a terminar') impede a sobrecarga operacional, reduz o tempo de ciclo e expõe gargalos do fluxo de trabalho."
    },
    {
      id: 6,
      question: "Como deve ser preenchida uma Matriz de Riscos durante a fase de planejamento?",
      options: [
        "Listando apenas os riscos de origem financeira e ignorando falhas operacionais.",
        "Mapeando os eventos incertos e avaliando-os com base na sua Probabilidade de ocorrência e no seu Impacto no projeto.",
        "Registrando eventos que já aconteceram no passado para punir os responsáveis.",
        "Definindo respostas de risco apenas após o estouro do prazo final."
      ],
      correct: 1,
      explanation: "A análise qualitativa de riscos cruza a probabilidade de ocorrência com a severidade do impacto, orientando a priorização de planos de mitigação e contingência."
    },
    {
      id: 7,
      question: "Em qual situação o modelo Tradicional (Waterfall / Cascata) é mais recomendado do que abordagens Ágeis?",
      options: [
        "Em projetos inovadores com requisitos altamente incertos e que mudam constantemente.",
        "Em projetos com escopo muito bem definido, requisitos estáveis e regulamentações rígidas (ex: construção civil).",
        "Quando a equipe não possui um gerente de projetos para acompanhar as entregas.",
        "Apenas em startups de tecnologia que precisam lançar produtos rapidamente."
      ],
      correct: 1,
      explanation: "O modelo em cascata (Waterfall) é ideal quando o escopo é previsível, os custos de retrabalho são altíssimos e as etapas devem ser cumpridas sequencialmente com rigor documental."
    }
  ]
};

// =========================================================================
// CURSO OFICIAL: INTELIGÊNCIA DE NEGÓCIOS E TOMADA DE DECISÃO BASEADA EM INDICADORES
// =========================================================================
export const CURSO_INTELIGENCIA_NEGOCIOS_INDICADORES: Course = {
  id: 'curso-inteligencia-negocios-indicadores',
  trackId: 'trilha-rotinas-gestao',
  trackName: 'TRILHA 4: Rotinas Administrativas & Gestão Empresarial',
  category: 'Administração e Negócios',
  targetAudienceType: ['JOVEM_APRENDIZ', 'ESTUDANTE', 'PRIMEIRO_EMPREGO', 'ESTAGIARIO'],
  title: 'Inteligência de Negócios e Tomada de Decisão Baseada em Indicadores',
  subtitle: 'Interpretação de KPIs, pirâmide DIKW, diagnóstico de gargalos operacionais, metas SMART e tomada de decisão data-driven.',
  hours: 20,
  equivalentHours: 20,
  modality: 'EAD 100% Gratuito (Escola Virtual)',
  targetAudience: 'Estudantes, jovens aprendizes, estagiários e profissionais que desejam dominar a interpretação de KPIs, diagnóstico de gargalos e tomada de decisão orientada a dados.',
  prerequisites: 'Nenhum pré-requisito.',
  badgeName: 'Especialista em Inteligência de Negócios & KPIs',
  badgeCategory: 'Gestão Estratégica & BI',
  badgeIcon: 'TrendingUp',
  accentColor: '#8B5CF6',
  level: 'Avançado',
  videoUrl: 'https://youtu.be/sL0m2cnrk8Y',
  youtubeId: 'sL0m2cnrk8Y',
  learningObjectives: [
    'Compreender a informação como ativo estratégico e dominar a pirâmide DIKW (Dados, Informação, Conhecimento e Sabedoria).',
    'Estruturar e interpretar indicadores de desempenho (KPIs) financeiros, operacionais e de produtividade.',
    'Desdobrar metas corporativas e acompanhar planos de ação através da metodologia SMART e OKRs.',
    'Analisar desvios entre resultado real vs. meta planejada para diagnosticar a causa-raiz de gargalos.',
    'Construir matrizes de decisão e planos de ação corretiva orientados por dados e evidências.'
  ],
  modules: [
    {
      id: 'bi-kpi-mod-1',
      number: 1,
      title: 'MÓDULO 1: Fundamentos da Inteligência de Negócios e Gestão do Conhecimento',
      summary: 'Informação como ativo estratégico, pirâmide DIKW e inteligência empresarial no dia a dia.',
      estimatedMinutes: 50,
      content: {
        sections: [
          {
            subheading: 'Aula 1.1: Conceitos de Inteligência Empresarial e a Informação como Ativo Estratégico',
            body: [
              'Na economia digital, a informação consolidada e confiável é o ativo mais valioso de qualquer organização competitiva.',
              'Inteligência de Negócios consiste em coletar, organizar, analisar e monitorar dados de mercado e de processos internos para antecipar tendências e subsidiar escolhas conscientes.',
              'A transição de uma postura intuitiva ("eu acho que...") para uma postura analítica ("os dados demonstram que...") eleva a credibilidade do profissional em qualquer área corporativa.'
            ],
            highlightBox: {
              type: 'info',
              title: 'Cultura Analítica',
              text: 'Decisões orientadas a evidências diminuem o retrabalho em até 35% e ampliam a assertividade na entrega de projetos e metas de vendas.'
            }
          },
          {
            subheading: 'Aula 1.2: A Pirâmide DIKW (Dado, Informação, Conhecimento e Sabedoria)',
            body: [
              'Dado (Data): registros factuais e símbolos brutos sem contexto (exemplo: "38").',
              'Informação (Information): dado processado, categorizado e com significado prático (exemplo: "38 chamados de suporte abertos hoje").',
              'Conhecimento (Knowledge): informação compreendida e integrada a experiências práticas (exemplo: "38 chamados é o triplo da média diária devido à instabilidade do novo servidor").',
              'Sabedoria (Wisdom): aplicação ética e estratégica do conhecimento no longo prazo (exemplo: "Revisar a arquitetura de servidores e criar rotinas de redundância antes dos períodos sazonais").'
            ]
          },
          {
            subheading: 'Aula 1.3: Aplicações Práticas da Inteligência de Negócios na Rotina',
            body: [
              'Rotinas de suporte ao cliente: acompanhamento do volume de tickets por horário para escalonamento eficiente de atendentes.',
              'Gestão de estoque e compras: monitoramento da velocidade de giro de produtos para prevenir ruptura ou excesso de capital imobilizado.',
              'Comunicação interdepartamental: compartilhamento transparente de dados para evitar silos departamentais e conflitos de prioridade.'
            ],
            highlightBox: {
              type: 'warning',
              title: 'Alerta de Gestão',
              text: 'Armazenar milhões de dados sem analisá-los gera apenas custo de infraestrutura. O valor real reside na capacidade humana de extrair insights e agir.'
            }
          }
        ]
      }
    },
    {
      id: 'bi-kpi-mod-2',
      number: 2,
      title: 'MÓDULO 2: Arquitetura e Gestão de Indicadores de Desempenho (KPIs)',
      summary: 'Estruturação de KPIs, categorias de indicadores (financeiros, operacionais, qualidade) e metas SMART.',
      estimatedMinutes: 55,
      content: {
        sections: [
          {
            subheading: 'Aula 2.1: O Que São KPIs e Como Estruturar Indicadores Alinhados',
            body: [
              'Key Performance Indicators (KPIs) são os indicadores mais críticos para o sucesso de um objetivo estratégico; métricas comuns apenas medem volume sem orientar ação direta.',
              'Critérios de um KPI de excelência: deve ter fórmula matemática transparente, fonte de dados auditável, periodicidade definida e um responsável (owner) direto.',
              'Equilíbrio entre Indicadores de Tendência (Leading Indicators - orientam o futuro) e Indicadores de Resultado (Lagging Indicators - mostram o passado).'
            ]
          },
          {
            subheading: 'Aula 2.2: Indicadores Financeiros, Operacionais, de Produtividade e Qualidade',
            body: [
              'Indicadores Financeiros: Margem de Contribuição, EBITDA, Retorno sobre o Investimento (ROI) e Ponto de Equilíbrio (Break-Even).',
              'Indicadores Operacionais e de Produtividade: Tempo Médio de Atendimento (TMA), Taxa de Ocupação e Unidades Produzidas por Hora.',
              'Indicadores de Qualidade e Satisfação: Net Promoter Score (NPS), Customer Satisfaction Score (CSAT) e Índice de Retrabalho/Devoluções.'
            ],
            highlightBox: {
              type: 'calc',
              title: 'Fórmula do ROI',
              text: 'ROI = (Ganho Obtido - Custo do Investimento) / Custo do Investimento. Um índice fundamental para justificar novos projetos à diretoria.'
            }
          },
          {
            subheading: 'Aula 2.3: Definição, Desdobramento e Acompanhamento de Metas (OKRs e SMART)',
            body: [
              'Critérios da Meta SMART: Specific (Específica), Measurable (Mensurável), Achievable (Alcançável), Relevant (Relevante) e Time-bound (Com prazo definido).',
              'Framework OKR (Objectives and Key Results): Objetivos inspiradores e qualitativos combinados a 3 a 5 Resultados-Chave estritamente quantitativos.',
              'Desdobramento top-down e bottom-up: como conectar a meta global da organização com as tarefas semanais de cada colaborador.'
            ]
          }
        ]
      }
    },
    {
      id: 'bi-kpi-mod-3',
      number: 3,
      title: 'MÓDULO 3: Análise de Resultados, Tendências e Identificação de Gargalos',
      summary: 'Leitura técnica de relatórios empresariais, análise de desvio Real vs. Meta e diagnóstico de causa-raiz.',
      estimatedMinutes: 50,
      content: {
        sections: [
          {
            subheading: 'Aula 3.1: Interpretação Técnica de Relatórios Empresariais',
            body: [
              'Como navegar por dashboards executivos, tabelas dinâmicas e relatórios consolidados identificando anomalias instantaneamente.',
              'Análise de séries temporais: diferenciação entre flutuações normais, variações sazonais esperadas e desvios críticos estruturais.',
              'Uso de médias móveis para filtrar ruídos pontuais e enxergar a real direção da curva de desempenho.'
            ]
          },
          {
            subheading: 'Aula 3.2: Análise Comparativa: Desempenho Real vs. Meta Planejada',
            body: [
              'Cálculo de variação percentual (Variance): [(Real - Planejado) / Planejado] * 100.',
              'Farolização de indicadores (semáforo de gestão): Verde (meta atingida), Amarelo (zona de alerta) e Vermelho (desvio crítico que exige plano de ação imediato).',
              'Evite atalhos ilusórios: alterar metas para disfarçar desempenhos insatisfatórios compromete o futuro da empresa.'
            ]
          },
          {
            subheading: 'Aula 3.3: Diagnóstico de Gargalos Operacionais e Análise de Tendências',
            body: [
              'A Teoria das Restrições (TOC): a capacidade global de um sistema é sempre limitada pelo seu elo mais fraco (gargalo).',
              'Técnicas de diagnóstico de causa-raiz: Diagrama de Ishikawa (Espinha de Peixe) e o método dos 5 Porquês para encontrar a origem do problema.',
              'Mapeamento de tendências de mercado e benchmarks setoriais para calibrar a competitividade da organização.'
            ],
            highlightBox: {
              type: 'info',
              title: 'Eliminação de Gargalos',
              text: 'Investir na otimização de etapas que não são o gargalo do processo gera apenas aumento de estoques intermediários e desperdício financeiro.'
            }
          }
        ]
      }
    },
    {
      id: 'bi-kpi-mod-4',
      number: 4,
      title: 'MÓDULO 4: Tomada de Decisão Baseada em Evidências e Avaliação Final',
      summary: 'Estudo de caso prático, matrizes de decisão, planos de ação corretiva 5W2H e certificação.',
      estimatedMinutes: 45,
      content: {
        sections: [
          {
            subheading: 'Aula 4.1: Vídeo de Conclusão e Estudo de Caso Prático',
            body: [
              'Assista à simulação de uma reunião executiva de análise de resultados baseada em relatórios de KPIs corporativos.',
              'Observe o processo de identificação de desvios operacionais, debate fundamentado em dados e seleção da melhor alternativa de intervenção.',
              'Ao concluir a visualização desta aula, você liberará o temporizador para realizar a avaliação de certificação.'
            ]
          },
          {
            subheading: 'Aula 4.2: Matriz de Decisão, Avaliação de Impacto e Planos 5W2H',
            body: [
              'Matriz de Decisão Ponderada: atribuição de notas e pesos para diferentes critérios (custo, tempo, risco e retorno) antes de aprovar uma escolha.',
              'Plano de Ação Corretiva com 5W2H: O que (What), Por que (Why), Onde (Where), Quando (When), Quem (Who), Como (How) e Quanto Custa (How Much).',
              'O ciclo PDCA (Plan, Do, Check, Act): após aplicar a intervenção, mensure os indicadores periodicamente para comprovar a eficácia da solução.'
            ],
            highlightBox: {
              type: 'warning',
              title: 'Rigor no Monitoramento',
              text: 'Um plano de ação sem mensuração de eficácia posterior é apenas uma lista de boas intenções. O fechamento do ciclo de melhoria é obrigatório.'
            }
          },
          {
            subheading: 'Aula 4.3: Avaliação Final de Fixação e Emissão de Selo Oficial',
            body: [
              'Realize o Quiz de 7 questões intermediárias para demonstrar sua capacidade de interpretar KPIs, diagnosticar gargalos e propor decisões estratégicas.',
              'Com aproveitamento igual ou superior a 70%, seu Selo Oficial de Especialista em Inteligência de Negócios & KPIs será emitido e adicionado ao seu currículo profissional.'
            ]
          }
        ]
      }
    }
  ],
  caseStudies: [],
  quiz: [
    {
      id: 1,
      question: "Na hierarquia do conhecimento (Pirâmide DIKW), qual é a principal diferença entre Dado e Informação?",
      options: [
        "Dados são relatórios prontos; informações são números brutos sem tratamento.",
        "Dados são registros brutos sem contexto; informação é o dado processado, estruturado e com significado útil.",
        "Não existe diferença, ambos os termos significam exatamente a mesma coisa na gestão.",
        "Informação é gerada exclusivamente por sistemas de inteligência artificial."
      ],
      correct: 1,
      explanation: "Dados são símbolos ou registros brutos sem contexto; Informação é o dado processado, organizado e contextualizado para ter utilidade prática na tomada de decisão."
    },
    {
      id: 2,
      question: "O que caracteriza um Key Performance Indicator (KPI) eficiente dentro de uma organização?",
      options: [
        "Deve medir absolutamente todas as rotinas da empresa, independente da relevância.",
        "Deve ser mensurável, relevante, ter um objetivo claro e estar diretamente conectado às metas estratégicas.",
        "Deve ser alterado diariamente para refletir os sentimentos da equipe.",
        "Deve ser mantido em segredo e compartilhado apenas com a diretoria."
      ],
      correct: 1,
      explanation: "Um bom KPI é mensurável, simples de interpretar, acionável e alinhado aos objetivos estratégicos do negócio, orientando prioridades sem dispersar o foco operacional."
    },
    {
      id: 3,
      question: "Qual das opções abaixo representa um indicador do tipo OPERACIONAL / PRODUTIVIDADE?",
      options: [
        "Margem de Lucro Líquido anual.",
        "Tempo Médio de Atendimento (TMA) e taxa de unidades produzidas por hora.",
        "Retorno sobre o Investimento (ROI) acionário.",
        "Valor de Mercado da Marca (Brand Equity)."
      ],
      correct: 1,
      explanation: "Indicadores operacionais e de produtividade medem a eficiência e o volume da execução das atividades do dia a dia, como o TMA ou o rendimento por hora trabalhada."
    },
    {
      id: 4,
      question: "Ao analisar a meta SMART, a letra 'R' refere-se ao atributo de que a meta deve ser:",
      options: [
        "Rápida (deve ser concluída em menos de 24 horas).",
        "Relevante (deve fazer sentido e impactar os resultados reais do negócio).",
        "Restrita (deve ser aplicada a apenas um funcionário).",
        "Rígida (não pode sofrer nenhuma alteração sob qualquer hipótese)."
      ],
      correct: 1,
      explanation: "No método SMART, 'R' significa Relevante: a meta deve ser crucial para a organização, alinhada à estratégia e gerar impacto substancial nos resultados."
    },
    {
      id: 5,
      question: "Quando o gestor compara o 'Resultado Real' contra a 'Meta Planejada' e identifica uma variação negativa recorrente, qual deve ser o primeiro passo?",
      options: [
        "Ignorar o relatório e aguardar o próximo trimestre para tomar medidas.",
        "Investigar a causa-raiz do desvio utilizando ferramentas analíticas antes de propor ações corretivas.",
        "Reduzir a meta imediatamente para fingir que o resultado foi atingido.",
        "Demitir a equipe responsável sem analisar o contexto do mercado."
      ],
      correct: 1,
      explanation: "A atitude analítica exige investigar a causa-raiz (com ferramentas como Ishikawa ou 5 Porquês) para diagnosticar o gargalo antes de desenhar planos de intervenção."
    },
    {
      id: 6,
      question: "O que significa adotar uma cultura de Tomada de Decisão Baseada em Evidências (Data-Driven)?",
      options: [
        "Tomar decisões baseadas puramente na intuição e experiência passada dos gestores mais antigos.",
        "Utilizar dados concretos, fatos e análises de desempenho para fundamentar as escolhas estratégicas.",
        "Delegar todas as decisões empresariais para softwares automáticos sem intervenção humana.",
        "Aguardar a aprovação dos clientes antes de realizar qualquer alteração interna."
      ],
      correct: 1,
      explanation: "Uma gestão Data-Driven orienta suas escolhas em métricas objetivas, validações empíricas e relatórios confiáveis, reduzindo o risco e os vieses de julgamento intuitivo."
    },
    {
      id: 7,
      question: "Após a implementação de um plano de ação para resolver um gargalo operacional, qual é a etapa final fundamental do processo de gestão?",
      options: [
        "Encerrar a coleta de dados daquele setor.",
        "Monitorar e mensurar continuamente os resultados para verificar se a solução foi efetiva.",
        "Arquivar o projeto e não realizar novas medições.",
        "Aumentar o preço dos produtos imediatamente."
      ],
      correct: 1,
      explanation: "O ciclo de melhoria contínua (PDCA) exige checagem contínua (Check/Act) para comprovar a eficácia das correções implementadas e padronizar o processo."
    }
  ]
};

// =========================================================================
// CURSO OFICIAL: TRANSFORMAÇÃO DIGITAL, INOVAÇÃO E ESTRATÉGIAS EMPRESARIAIS
// =========================================================================
export const CURSO_TRANSFORMACAO_DIGITAL_INOVACAO: Course = {
  id: 'curso-transformacao-digital-inovacao',
  trackId: 'trilha-rotinas-gestao',
  trackName: 'TRILHA 4: Rotinas Administrativas & Gestão Empresarial',
  category: 'Administração e Negócios',
  targetAudienceType: ['JOVEM_APRENDIZ', 'ESTUDANTE', 'PRIMEIRO_EMPREGO', 'ESTAGIARIO'],
  title: 'Transformação Digital, Inovação e Estratégias Empresariais',
  subtitle: 'Computação em nuvem, IoT, IA gerativa, modelos de plataforma, automação RPA e liderança da mudança cultural.',
  hours: 20,
  equivalentHours: 20,
  modality: 'EAD 100% Gratuito (Escola Virtual)',
  targetAudience: 'Estudantes, jovens aprendizes, estagiários e profissionais que buscam liderar processos de inovação, modernização tecnológica e estratégias de transformação digital corporativa.',
  prerequisites: 'Nenhum pré-requisito.',
  badgeName: 'Especialista em Transformação Digital & Inovação',
  badgeCategory: 'Inovação & Estratégia Digital',
  badgeIcon: 'Zap',
  accentColor: '#06B6D4',
  level: 'Avançado',
  videoUrl: 'https://youtu.be/vFo9TS-rNPQ',
  youtubeId: 'vFo9TS-rNPQ',
  learningObjectives: [
    'Compreender a diferença estratégica entre Digitização, Digitalização de processos e Transformação Digital de modelos de negócio.',
    'Analisar o impacto da Computação em Nuvem, Big Data, IoT e Inteligência Artificial na eficiência corporativa.',
    'Construir modelos de negócios digitais escaláveis baseados em Plataformas, SaaS, Freemium e Ecossistemas integrados.',
    'Fomentar a cultura de inovação aberta, tolerância ao erro, squads ágeis e automação via RPA e APIs.',
    'Liderar a gestão da mudança organizacional através de frameworks consolidados (ADKAR e Kotter) superando resistências culturais.'
  ],
  modules: [
    {
      id: 'transf-dig-mod-1',
      number: 1,
      title: 'MÓDULO 1: Fundamentos e Estratégia da Transformação Digital',
      summary: 'Evolução dos negócios digitais, distinção estratégica e novos modelos de monetização e ecossistemas.',
      estimatedMinutes: 50,
      content: {
        sections: [
          {
            subheading: 'Aula 1.1: Conceito, Evolução e Imperativos da Transformação Digital',
            body: [
              'A Transformação Digital não é meramente a adoção de novas ferramentas tecnológicas, mas uma profunda reinvenção estratégica da proposta de valor, da experiência do cliente e dos processos corporativos.',
              'Os imperativos de mercado: mudanças aceleradas no comportamento do consumidor, ciclos de inovação reduzidos e o surgimento de novos concorrentes ágeis que desafiam modelos tradicionais.',
              'A tecnologia atua como habilitadora de novos patamares de produtividade, enquanto a visão estratégica de liderança define a sustentabilidade do negócio no longo prazo.'
            ],
            highlightBox: {
              type: 'info',
              title: 'Visão Estratégica',
              text: 'A transformação digital é impulsionada pela estratégia de negócios e pela centralidade no cliente, não pela tecnologia isolada.'
            }
          },
          {
            subheading: 'Aula 1.2: Digitização vs. Digitalização de Processos vs. Transformação Digital',
            body: [
              'Digitização (Digitization): conversão de informações analógicas para formatos digitais (exemplo: digitalizar contratos em papel para arquivos PDF).',
              'Digitalização (Digitalization): redesenho e automação de fluxos operacionais existentes utilizando tecnologias digitais (exemplo: fluxo automatizado de aprovação de notas fiscais).',
              'Transformação Digital (Digital Transformation): transformação holística que reformula a cultura, a criação de valor e os modelos de receita da organização (exemplo: transição de venda de produtos físicos para modelos de assinatura de serviços recorrentes).'
            ],
            highlightBox: {
              type: 'warning',
              title: 'Diferenciação Crucial',
              text: 'Automatizar um processo burocrático e ineficiente apenas cria um processo ineficiente mais rápido. A verdadeira transformação exige repensar o porquê daquele processo.'
            }
          },
          {
            subheading: 'Aula 1.3: Novos Modelos de Negócios Digitais (Plataformas, SaaS, Freemium)',
            body: [
              'Modelos de Plataforma e Ecossistema: empresas que conectam produtores e consumidores de valor (Marketplaces, serviços sob demanda) aproveitando os poderosos Efeitos de Rede (Network Effects).',
              'Software as a Service (SaaS): entrega contínua de soluções baseadas em nuvem com previsibilidade de receita recorrente (MRR / ARR).',
              'Freemium e Economia da Assinatura: estratégias de aquisição acelerada de usuários com camadas gratuitas de entrada e monetização em funcionalidades premium avançadas.'
            ]
          }
        ]
      }
    },
    {
      id: 'transf-dig-mod-2',
      number: 2,
      title: 'MÓDULO 2: Arquiteturas de Tecnologia e Tendências Emergentes',
      summary: 'Cloud computing, Big Data, Internet das Coisas (IoT) e convergência da IA na eficiência corporativa.',
      estimatedMinutes: 55,
      content: {
        sections: [
          {
            subheading: 'Aula 2.1: Computação em Nuvem (Cloud Computing) e Arquiteturas Escaláveis',
            body: [
              'A nuvem como pilar de agilidade empresarial: eliminação de custos vultosos com servidores locais (CapEx para OpEx) e elasticidade imediata para atender a picos de demanda.',
              'Modelos de serviço em nuvem: IaaS (Infraestrutura como Serviço), PaaS (Plataforma como Serviço) e SaaS (Software como Serviço).',
              'Estratégias multinuvem (Multi-Cloud) e nuvem híbrida para garantia de alta disponibilidade, governança e conformidade com a LGPD.'
            ]
          },
          {
            subheading: 'Aula 2.2: Big Data, Internet das Coisas (IoT) e Convergência de Dados Operacionais',
            body: [
              'Os 5 Vs do Big Data: Volume, Velocidade, Variedade, Veracidade e Valor transformando dados operacionais em ativos estratégicos.',
              'A Internet das Coisas (IoT) na prática: sensores conectados em frotas, linhas de produção e equipamentos corporativos enviando telemetria em tempo real.',
              'Manutenção Preditiva e Redução de Ociosidade: agir proativamente antes que falhas catastróficas paralisem os serviços da empresa.'
            ],
            highlightBox: {
              type: 'calc',
              title: 'Impacto da IoT',
              text: 'Sistemas inteligentes com sensores de IoT reduzem custos de manutenção não planejada em até 30% em operações industriais e logísticas.'
            }
          },
          {
            subheading: 'Aula 2.3: Inteligência Artificial Gerativa e Machine Learning Organizacional',
            body: [
              'Machine Learning (Aprendizado de Máquina) para previsão de demanda, scoring de crédito e personalização dinâmica de ofertas ao consumidor.',
              'Inteligência Artificial Gerativa como copiloto de produtividade: síntese instantânea de documentos regulatórios, redação assistida e suporte a decisões complexas.',
              'Ética e responsabilidade algorítmica: governança de dados, mitigação de vieses e proteção à privacidade corporativa.'
            ]
          }
        ]
      }
    },
    {
      id: 'transf-dig-mod-3',
      number: 3,
      title: 'MÓDULO 3: Cultura de Inovação e Modernização de Processos',
      summary: 'Inovação aberta, tolerância ao erro, squads ágeis, mapeamento de processos e automação com RPA.',
      estimatedMinutes: 50,
      content: {
        sections: [
          {
            subheading: 'Aula 3.1: Fomento à Cultura de Inovação Aberta e Squads Ágeis',
            body: [
              'Inovação Aberta (Open Innovation): colaboração estratégica com startups, universidades e ecossistemas externos para acelerar o desenvolvimento de soluções.',
              'A importância da Segurança Psicológica e tolerância ao erro calculado: sem experimentação e aprendizado rápido, não existe inovação autêntica.',
              'Estruturas organizacionais em Squads: equipes multidisciplinares auto-organizadas focadas em jornadas completas do usuário com ciclos curtos de entrega.'
            ]
          },
          {
            subheading: 'Aula 3.2: Mapeamento de Gargalos e Redesenho de Processos Digitais',
            body: [
              'Metodologia de Design Thinking aplicada aos processos internos: Imersão, Ideação, Prototipagem e Testes contínuos centrados nas dores do usuário.',
              'Mapeamento da Jornada do Usuário (User Journey) para identificar pontos de atrito e substituir etapas manuais lentas por experiências digitais fluidas.',
              'Simplificação prévia: nunca digitalize etapas redundantes que poderiam ser simplesmente eliminadas do processo.'
            ]
          },
          {
            subheading: 'Aula 3.3: Automação de Processos (RPA) e Integração via APIs',
            body: [
              'RPA (Robotic Process Automation): bots de software configurados para assumir tarefas repetitivas baseadas em regras (ex: conciliação bancária, extração de relatórios e preenchimento de planilhas).',
              'Economia de APIs (Application Programming Interfaces): integração transparente entre sistemas legados e plataformas modernas na nuvem sem necessidade de reescrever códigos do zero.',
              'Liberando o talento humano: a automação inteligente redireciona os colaboradores de tarefas mecânicas para funções analíticas e de relacionamento.'
            ],
            highlightBox: {
              type: 'info',
              title: 'Eficiência de RPA',
              text: 'Rotinas com RPA operam 24/7 com índice zero de erro de digitação, permitindo que a equipe humana se dedique à inovação e atendimento consultivo.'
            }
          }
        ]
      }
    },
    {
      id: 'transf-dig-mod-4',
      number: 4,
      title: 'MÓDULO 4: Gestão de Mudança, Estratégia e Avaliação Final',
      summary: 'Estudo de caso prático, modelos de gestão da mudança (ADKAR/Kotter), superação de resistências e prova final.',
      estimatedMinutes: 45,
      content: {
        sections: [
          {
            subheading: 'Aula 4.1: Vídeo de Conclusão e Estudo de Caso de Transformação Digital',
            body: [
              'Assista à análise prática da jornada de transformação de uma corporação tradicional que reformulou sua arquitetura tecnológica e modelo de negócio.',
              'Observe como a combinação de nuvem, liderança ativa e cultura ágil viabilizou o lançamento de produtos inovadores em tempo recorde.',
              'A conclusão integral desta aula libera o temporizador obrigatório para acesso ao quiz final de certificação.'
            ]
          },
          {
            subheading: 'Aula 4.2: Gestão de Mudança Organizacional (ADKAR/Kotter) e Cultura',
            body: [
              'O maior fator de insucesso em projetos de transformação digital reside na resistência cultural e comportamental humana, não na tecnologia.',
              'Framework ADKAR: Awareness (Consciência da necessidade), Desire (Desejo de participar), Knowledge (Conhecimento prático), Ability (Habilidade de aplicar) e Reinforcement (Reforço e sustentação da mudança).',
              'Os 8 passos de John Kotter: criar senso de urgência, formar coalizões fortes, comunicar a visão, gerar vitórias de curto prazo (quick wins) e ancorar a mudança na cultura corporativa.'
            ],
            highlightBox: {
              type: 'warning',
              title: 'Fator Humano',
              text: 'Pessoas apoiam aquilo que ajudam a construir. Envolva os colaboradores desde as fases iniciais de ideação para mitigar o medo natural da obsolescência.'
            }
          },
          {
            subheading: 'Aula 4.3: Avaliação Final de Fixação e Emissão de Selo Oficial',
            body: [
              'Realize o Quiz de 7 perguntas avançadas sobre Digitização vs. Digitalização, Nuvem, IoT, RPA, Modelos de Plataforma e Gestão de Mudança.',
              'Com aproveitamento igual ou superior a 70%, seu Selo Oficial de Especialista em Transformação Digital & Inovação será emitido e anexado ao seu currículo profissional.'
            ]
          }
        ]
      }
    }
  ],
  caseStudies: [],
  quiz: [
    {
      id: 1,
      question: "Qual é a diferença fundamental entre 'Digitização' (Digitization), 'Digitalização' (Digitalization) e 'Transformação Digital'?",
      options: [
        "Não existe diferença, são apenas sinônimos usados para vender softwares corporativos.",
        "Digitização é a conversão do analógico para o digital; Digitalização é o uso de tecnologia para melhorar processos existentes; Transformação Digital é a mudança cultural e estratégica profunda no modelo de negócio.",
        "Transformação Digital se aplica apenas a startups de tecnologia, enquanto Digitalização é para empresas tradicionais.",
        "Digitização refere-se à compra de computadores; Transformação Digital é a criação de páginas em redes sociais."
      ],
      correct: 1,
      explanation: "A Digitização converte o formato físico para bits, a Digitalização moderniza e automatiza processos específicos e a Transformação Digital altera estrategicamente como a empresa gera e entrega valor ao mercado."
    },
    {
      id: 2,
      question: "Em um contexto de Transformação Digital, qual é o papel estratégico da Computação em Nuvem (Cloud Computing)?",
      options: [
        "Apenas reduzir os custos com impressão de papel na empresa.",
        "Proporcionar escalabilidade, agilidade na implementação de novos serviços, flexibilidade e redução de infraestrutura física local.",
        "Substituir integralmente a necessidade de equipes de desenvolvimento e programação.",
        "Garantir que a empresa não precise mais de conexão com a internet."
      ],
      correct: 1,
      explanation: "A computação em nuvem fornece a flexibilidade e a infraestrutura elástica necessárias para lançar novos produtos rapidamente sem necessidade de data centers físicos próprios."
    },
    {
      id: 3,
      question: "Como a tecnologia de Internet das Coisas (IoT) agrega valor aos processos operacionais e industriais?",
      options: [
        "Permitindo que sensores conectados coletem dados em tempo real sobre equipamentos e produtos para manutenção preditiva e otimização.",
        "Criando apresentações automáticas em PowerPoint para a diretoria.",
        "Aumentando a velocidade de navegação nas redes sociais dos funcionários.",
        "Bloqueando acessos não autorizados em servidores de e-mail."
      ],
      correct: 0,
      explanation: "A IoT conecta ativos físicos ao ambiente analítico, viabilizando telemetria em tempo real, rastreabilidade e manutenção preditiva que evitam perdas financeiras."
    },
    {
      id: 4,
      question: "O que caracteriza a automação por meio de RPA (Robotic Process Automation) nas organizações?",
      options: [
        "O uso de robôs físicos para montagem de peças em linhas de produção.",
        "A implementação de softwares configurados para automatizar tarefas repetitivas, manuais e baseadas em regras em sistemas digitais.",
        "A eliminação de todos os cargos de gestão em uma empresa.",
        "O desenvolvimento de novos produtos através de impressoras 3D."
      ],
      correct: 1,
      explanation: "O RPA atua como um assistente digital programado para interagir com interfaces de sistemas, preenchendo formulários, validando planilhas e executando tarefas mecânicas sem erro."
    },
    {
      id: 5,
      question: "Qual é considerado o maior obstáculo no fracasso de iniciativas de Transformação Digital nas corporações?",
      options: [
        "A escassez de fornecedores de computadores no mercado local.",
        "Resistência cultural interna, falta de engajamento da liderança e ausência de mentalidade voltada à mudança.",
        "O excesso de velocidade na conexão de fibra óptica.",
        "O alto custo de licenças de antivírus."
      ],
      correct: 1,
      explanation: "A maior barreira à inovação é humana e cultural: o medo do novo, a falta de segurança psicológica e a resistência de lideranças acostumadas a modelos legados."
    },
    {
      id: 6,
      question: "O modelo de negócio baseado em 'Plataforma / Ecossistema Digital' (ex: Uber, Airbnb, Marketplaces) diferencia-se do modelo tradicional linear porque:",
      options: [
        "Fabrica e armazena todos os produtos em estoque próprio antes da venda.",
        "Conecta diretamente produtores e consumidores de valor, gerando efeitos de rede sem necessariamente possuir os ativos físicos.",
        "Funciona apenas através de atendimentos presenciais e físicos.",
        "Não utiliza dados de usuários para personalizar a experiência."
      ],
      correct: 1,
      explanation: "Modelos de plataforma operam como ecossistemas de intermediação com custos marginais baixíssimos, potencializados por efeitos de rede onde cada novo participante agrega valor ao conjunto."
    },
    {
      id: 7,
      question: "Dentro de uma estratégia de Gestão de Mudança Organizacional, qual é a importância da fase de 'Ancoragem da Mudança na Cultura'?",
      options: [
        "Garantir que as novas práticas, tecnologias e comportamentos sejam consolidados como a norma padrão da empresa, evitando o retorno aos hábitos antigos.",
        "Punir os colaboradores que não aprenderam a usar os novos sistemas na primeira semana.",
        "Cancelar todos os projetos digitais e retornar ao formato em papel.",
        "Vender os equipamentos antigos para arrecadar fundos de emergência."
      ],
      correct: 0,
      explanation: "Ancorar a mudança significa integrá-la aos ritos, avaliações de desempenho e rotinas cotidianas para que os novos métodos se tornem a identidade definitiva da organização."
    }
  ]
};

export const COURSES: Course[] = [
  CURSO_TRANSFORMACAO_DIGITAL_INOVACAO,
  {
    ...CURSO_TRANSFORMACAO_DIGITAL_INOVACAO,
    id: 'transformacao-digital-inovacao'
  },
  {
    ...CURSO_TRANSFORMACAO_DIGITAL_INOVACAO,
    id: 'curso-transformacao-digital'
  },
  {
    ...CURSO_TRANSFORMACAO_DIGITAL_INOVACAO,
    id: 'transformacao-digital'
  },
  CURSO_INTELIGENCIA_NEGOCIOS_INDICADORES,
  {
    ...CURSO_INTELIGENCIA_NEGOCIOS_INDICADORES,
    id: 'inteligencia-negocios-indicadores'
  },
  {
    ...CURSO_INTELIGENCIA_NEGOCIOS_INDICADORES,
    id: 'curso-inteligencia-negocios'
  },
  {
    ...CURSO_INTELIGENCIA_NEGOCIOS_INDICADORES,
    id: 'inteligencia-negocios'
  },
  CURSO_GESTAO_ESTRATEGICA_PROJETOS,
  {
    ...CURSO_GESTAO_ESTRATEGICA_PROJETOS,
    id: 'gestao-estrategica-projetos'
  },
  {
    ...CURSO_GESTAO_ESTRATEGICA_PROJETOS,
    id: 'curso-gestao-projetos'
  },
  {
    ...CURSO_GESTAO_ESTRATEGICA_PROJETOS,
    id: 'gestao-projetos'
  },
  CURSO_ANALISE_DADOS_POWER_BI,
  {
    ...CURSO_ANALISE_DADOS_POWER_BI,
    id: 'analise-dados-power-bi'
  },
  {
    ...CURSO_ANALISE_DADOS_POWER_BI,
    id: 'curso-power-bi'
  },
  {
    ...CURSO_ANALISE_DADOS_POWER_BI,
    id: 'power-bi'
  },
  CURSO_ATENDIMENTO_RELACIONAMENTO_CLIENTE,
  {
    ...CURSO_ATENDIMENTO_RELACIONAMENTO_CLIENTE,
    id: 'atendimento-relacionamento-cliente'
  },
  {
    ...CURSO_ATENDIMENTO_RELACIONAMENTO_CLIENTE,
    id: 'curso-atendimento-cliente'
  },
  {
    ...CURSO_ATENDIMENTO_RELACIONAMENTO_CLIENTE,
    id: 'atendimento-cliente'
  },
  CURSO_EXCEL_AVANCADO_ANALISE_DADOS,
  {
    ...CURSO_EXCEL_AVANCADO_ANALISE_DADOS,
    id: 'curso-excel-avancado-analise-dados'
  },
  {
    ...CURSO_EXCEL_AVANCADO_ANALISE_DADOS,
    id: 'excel-avancado-analise-dados'
  },
  {
    ...CURSO_EXCEL_AVANCADO_ANALISE_DADOS,
    id: 'curso-excel-avancado'
  },
  // =========================================================================
  // CURSO OFICIAL: COMUNICAÇÃO ESCRITA, E-MAILS E REDAÇÃO CORPORATIVA
  // =========================================================================
  {
    id: 'curso-comunicacao-escrita-corporativa',
    videoUrl: 'https://youtu.be/Lt4zabLCJ9I?si=NpcDLAKgOkQYGDF9',
    youtubeId: 'Lt4zabLCJ9I',
    trackId: 'trilha-comunicacao-relacionamento',
    trackName: 'Trilha Comunicação & Relacionamento Profissional',
    category: 'Administração e Negócios',
    targetAudienceType: 'TODOS',
    title: 'Comunicação Escrita, E-mails e Redação Corporativa',
    subtitle: 'Domine a arte de redigir mensagens corporativas claras, estruturar e-mails que geram respostas rápidas, elaborar relatórios e utilizar ferramentas digitais com assertividade.',
    hours: 12,
    equivalentHours: 12,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Jovens aprendizes, estagiários e profissionais em início de carreira em Curitiba e RMC.',
    prerequisites: 'Nenhum pré-requisito.',
    badgeName: 'Especialista em Comunicação Corporativa',
    badgeCategory: 'Comunicacao',
    badgeIcon: 'Mail',
    accentColor: '#8B5CF6',
    level: 'Iniciante',
    learningObjectives: [
      'Dominar os fundamentos da escrita corporativa: clareza, concisão e adequação de tom.',
      'Estruturar e-mails profissionais com assuntos informativos e uso correto de CC e CCO.',
      'Aplicar técnicas de redação lógica e auto-revisão eliminando vícios e gírias.',
      'Elaborar documentos institucionais respeitando o sigilo e a LGPD.',
      'Gerenciar fluxos de comunicação interna (Slack/Teams) e externa com clientes.',
      'Utilizar ferramentas digitais e copiloto de IA com supervisão e validação humana.'
    ],
    modules: [
      {
        id: 'comunicacao-mod-1',
        number: 1,
        title: 'MÓDULO 1: Fundamentos da Comunicação Escrita & E-mails Profissionais',
        summary: 'Da postura escrita ao envio de e-mails eficazes, com foco em clareza, tom e assertividade corporativa.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Fundamentos da Comunicação Escrita',
              body: [
                'A comunicação escrita no ambiente de trabalho é o principal cartão de visitas de um profissional. Mensagens claras, concisas e objetivas economizam o tempo da equipe e evitam retrabalho.',
                'Adequação ao interlocutor: O tom adotado com a liderança ou clientes deve ser cordial e polido, equilibrando formalidade e empatia sem prolixidade.',
                'O teste dos 5 segundos: Ao reler sua mensagem, certifique-se de que o destinatário consegue identificar o objetivo principal logo no primeiro parágrafo.'
              ],
              highlightBox: {
                type: 'info',
                title: '💡 Dica de Ouro de RH',
                text: 'Evite mensagens fragmentadas de uma linha em chats corporativos. Envie blocos completos com contexto, dúvida e prazo.'
              }
            },
            {
              subheading: '2. E-mails Profissionais Eficazes',
              body: [
                'O assunto do e-mail deve ser um resumo executivo: utilize [Ação], [Urgente] ou [Alinhamento] seguido do projeto e data.',
                'Estrutura em 3 blocos: Saudação personalizada, parágrafo contextual e chamada para ação (CTA) com prazo claro.',
                'Uso seguro de CC e CCO: Envie cópia visível apenas para quem precisa acompanhar, e use CCO para listas externas garantindo a privacidade (LGPD).'
              ],
              highlightBox: {
                type: 'warning',
                title: '⚠️ Atenção com Cópia Oculta (CCO)',
                text: 'Nunca utilize CCO para comunicação velada interna; utilize apenas para proteção de dados em disparos coletivos.'
              }
            }
          ]
        }
      },
      {
        id: 'comunicacao-mod-2',
        number: 2,
        title: 'MÓDULO 2: Documentos Corporativos, Fluxos e Ferramentas',
        summary: 'Redação de atas, relatórios e uso de ferramentas modernas com Inteligência Artificial supervisionada.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Documentos Corporativos e Sigilo',
              body: [
                'Elaboração de memorandos, atas de reunião e relatórios operacionais com formatação limpa e numeração padronizada.',
                'Confidencialidade e LGPD: Atenção redobrada ao compartilhar dados pessoais e planilhas por canais digitais.'
              ]
            },
            {
              subheading: '2. Ferramentas, Tecnologias e IA',
              body: [
                'Uso de corretores gramaticais inteligentes e modelos pré-definidos de respostas.',
                'Apoio de IA Generativa: Utilizar a IA para rascunhos com revisão humana 100% obrigatória antes do envio.'
              ]
            }
          ]
        }
      }
    ],
    caseStudies: [
      {
        id: 'caso-comunicacao-1',
        title: 'Reestruturação de E-mail de Alinhamento com a Diretoria',
        character: 'Beatriz, Estagiária Administrativa',
        scenario: 'Beatriz precisava solicitar aprovação de orçamento para um evento da empresa e o e-mail anterior continha 6 parágrafos densos sem destaque do valor.',
        criticalAnalysis: 'Beatriz resumiu a solicitação em 3 tópicos, colocou o valor total em destaque e uma data limite para resposta. O orçamento foi aprovado no mesmo dia.',
        keyTakeaways: [
          'Diretoria e gestores priorizam objetividade e clareza com números destacados.',
          'Sempre estipule prazos amigáveis para retorno.'
        ],
        badgeRelevance: 'Comprova alta competência em redação executiva e comunicação ágil.'
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'Qual é a estrutura mais recomendada para um e-mail corporativo eficaz?',
        options: [
          'Assunto genérico, texto em caixa alta e sem assinatura para poupar espaço.',
          'Assunto informativo claro, saudação polida, corpo em tópicos objetivos e chamada clara para ação com prazo.',
          'Parágrafo longo contínuo de 50 linhas sem pontuação definida.',
          'Enviar apenas anexos sem nenhuma mensagem explicativa no corpo.'
        ],
        correct: 1,
        explanation: 'A clareza no assunto e a divisão do corpo em blocos com prazo facilitam a leitura e a tomada de decisão rápida.'
      },
      {
        id: 2,
        question: 'Quando é indicado utilizar o recurso de Cópia Oculta (CCO)?',
        options: [
          'Para falar mal de um colega sem que ele perceba.',
          'Para proteger o e-mail de destinatários em envios coletivos e respeitar a privacidade/LGPD.',
          'Para fingir que o gestor não foi copiado.',
          'Em todos os e-mails internos da empresa rotineiramente.'
        ],
        correct: 1,
        explanation: 'O CCO preserva a identidade e o endereço eletrônico dos destinatários externos, evitando vazamento de dados.'
      }
    ]
  },
  // =========================================================================
  // CURSO 10: RESOLUÇÃO CRIATIVA DE PROBLEMAS E ADAPTAÇÃO
  // =========================================================================
  {
    id: 'curso-resolucao-criativa-problemas-adaptacao',
    trackId: 'trilha-4',
    trackName: 'TRILHA 4: Rotinas Administrativas & Gestão Empresarial',
    category: 'Administração e Negócios',
    targetAudienceType: ['JOVEM_APRENDIZ', 'ESTUDANTE', 'PRIMEIRO_EMPREGO', 'ESTAGIARIO'],
    title: 'Resolução Criativa de Problemas e Adaptação',
    subtitle: 'A técnica dos Cinco Porquês (Toyota), causa-raiz, postura de solução vs. reclamação, brainstorming sem filtro e pensamento lateral.',
    hours: 12,
    equivalentHours: 12,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Jovens aprendizes, estagiários e colaboradores que buscam desenvolver raciocínio crítico, capacidade de resolução e adaptabilidade corporativa.',
    prerequisites: 'Nenhum pré-requisito.',
    badgeName: 'Solucionador Criativo de Problemas',
    badgeCategory: 'Trabalho',
    badgeIcon: 'Briefcase',
    accentColor: '#F59E0B',
    level: 'Iniciante',
    learningObjectives: [
      'Aplicar a técnica dos Cinco Porquês da metodologia Toyota/Lean para identificar a causa-raiz de falhas operacionais e evitar correções superficiais.',
      'Adotar uma postura focada em soluções, apresentando à liderança alternativas viáveis ao reportar obstáculos.',
      'Conduzir e participar de sessões de Brainstorming separando a geração livre de ideias da fase posterior de análise de viabilidade técnica.',
      'Desenvolver pensamento lateral e adaptabilidade para contornar desafios imprevistos sob novos ângulos e perspectivas.'
    ],
    modules: [
      {
        id: 'resolucao-mod-1',
        number: 1,
        title: 'MÓDULO 1: O Caos Estruturado',
        summary: 'Investigação profunda de causa-raiz com a técnica dos Cinco Porquês e transformação de reclamações passivas em propostas proativas de solução.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. A Técnica dos Cinco Porquês (Toyota)',
              body: [
                'Desenvolvida na metodologia Lean/Toyota, a técnica dos "Cinco Porquês" busca investigar a causa-raiz de um problema perguntando "por quê?" sucessivamente (geralmente cinco vezes) diante de uma falha.',
                'Esse aprofundamento impede que a equipe tome decisões superficiais baseadas apenas em sintomas aparentes, tratando diretamente o motivo originário que causou o incidente no processo.'
              ],
              highlightBox: {
                type: 'info',
                title: 'Da Causa Aparente à Causa-Raiz',
                text: 'Perguntar "por quê?" de forma encadeada revela que falhas de operação quase sempre decorrem de gargalos de comunicação ou falta de padronização nos processos.'
              }
            },
            {
              subheading: '2. Postura de Solução vs. Reclamação',
              body: [
                'No ambiente corporativo, reportar um problema à liderança sem apresentar alternativas gera gargalos e retrabalho.',
                'A conduta madura exige que, ao identificar um obstáculo, o profissional traga a descrição clara do problema acompanhada de pelo menos duas sugestões viáveis de solução.',
                'Isso demonstra proatividade, visão analítica e capacidade de decisão.'
              ],
              highlightBox: {
                type: 'warning',
                title: 'Não traga apenas a dor, traga o remédio',
                text: 'Apresentar problemas com duas opções de solução viáveis economiza o tempo da liderança e posiciona você como um colaborador estratégico.'
              }
            }
          ]
        }
      },
      {
        id: 'resolucao-mod-2',
        number: 2,
        title: 'MÓDULO 2: Pensamento Lateral e Inovação',
        summary: 'Metodologia de brainstorming livre de pré-julgamentos e aplicação do pensamento lateral para encontrar saídas inovadoras em situações de crise.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Brainstorming sem Filtro Inicial',
              body: [
                'A geração de ideias inovadoras requer a separação entre a fase de criação e a fase de crítica.',
                'Em uma sessão de Brainstorming (tempestade de ideias), deve-se permitir a livre expressão de propostas sem julgamentos precoces.',
                'Ideias aparentemente irreais na primeira etapa podem conter o germe da inovação quando lapidadas posteriormente na fase de viabilidade técnica e financeira.'
              ],
              highlightBox: {
                type: 'info',
                title: 'Separe Ideação de Crítica',
                text: 'Criticar ideias logo no início mata a criatividade da equipe; registre todas as sugestões livremente e avalie a viabilidade prática em uma etapa posterior.'
              }
            },
            {
              subheading: '2. Pensamento Lateral e Adaptabilidade',
              body: [
                'O pensamento lateral consiste em fugir de abordagens lógicas tradicionais e sequenciais para encarar desafios por ângulos inéditos.',
                'Mudar a perspectiva diante de um imprevisto permite encontrar saídas criativas e eficientes em cenários de crise, desenvolvendo a adaptabilidade como um diferencial competitivo de carreira.'
              ],
              highlightBox: {
                type: 'info',
                title: 'Flexibilidade e Inovação',
                text: 'Quando o plano A falha, olhar a situação por um ângulo não convencional descobre oportunidades onde os outros enxergam apenas bloqueios.'
              }
            }
          ]
        }
      }
    ],
    caseStudies: [
      {
        id: 'caso-resolucaocriativa-1',
        title: 'Aplicação dos Cinco Porquês para Solucionar Atrasos na Emissão de Notas',
        character: 'Thiago, Jovem Aprendiz de Faturamento',
        scenario: 'Notas fiscais estavam saindo com atraso de até dois dias, gerando reclamações dos clientes e multas contratuais.',
        criticalAnalysis: 'Thiago aplicou os Cinco Porquês com sua supervisora e descobriu que o atraso não era no sistema contábil, mas na falta de validação do CNPJ pelo setor de cadastros. Com uma checagem preventiva em formulário unificado, o prazo foi normalizado.',
        keyTakeaways: [
          'Investigar a raiz do problema evita retrabalho e gastos com soluções ineficazes.',
          'A curiosidade analítica combinada à colaboração resolve gargalos complexos.'
        ],
        badgeRelevance: 'Comprova alta capacidade de resolução de problemas, raciocínio analítico e mentalidade de melhoria contínua.'
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'O Método "Cinco Porquês" (Toyota) serve para:',
        options: [
          'Repetir futilidades sem parar e com ruído vazio.',
          'Encontrar o núcleo invisível da causa-raiz de um incidente falho e não apenas sintomas.',
          'Irritar colegas perguntando bobagens banais pessoais obscuras e chatas ruidosas frias distantes raras isoladas particulares impertinentes inadequadas.',
          'Decorar fórmulas em japonês clássico ancestral épico histórico cultural distante milenar medieval lendário antigo mítico distante oriental.'
        ],
        correct: 1,
        explanation: 'A técnica da Toyota investiga consecutivamente a causa do problema anterior até atingir o motivo originário real da falha.'
      },
      {
        id: 2,
        question: 'Ao relatar um problema à liderança, você deve:',
        options: [
          'Fazer intrigas no café longo vazando o fracasso lento e obscuro letárgico opaco triste feio ruidoso ruidoso denso de rotina suja obscura imunda pesada fétida ruidosa fria fechada densa amarga medonha e vexatória triste amarga fétida tóxica triste de corredor vazio longo distante sujo.',
          'Berrar e causar pânico caótico desastroso caótico infernal ruidoso histérico nervoso de pavor ansioso e letárgico e agressivo nervoso tenso assustado apavorante horroroso.',
          'Apresentar os fatos reais exatos acompanhados de possíveis esboços de resolução madura e lógica prática focada.',
          'Fugir silenciosamente secretamente apavorado de pânico irracional covarde rápido sumido mudo opaco escondido furtivo.'
        ],
        correct: 2,
        explanation: 'Levar ao gestor o diagnóstico da falha acompanhado de planos de ação demonstra maturidade profissional e visão de solução.'
      },
      {
        id: 3,
        question: 'Brainstorming maduro (Tempestade de Ideias) exige que:',
        options: [
          'Se julgue ferozmente e rapidamente as ideias arriscadas criativas coloridas inovadoras raras e distantes no início do tempo de reunião ruidosa agressiva perigosa.',
          'Se permita a fluidez livre de ideias soltas e inovadoras, postergando a avaliação lógica técnica e viabilidade orçamentária rigorosa exata para outra etapa analítica densa.',
          'Apenas o CEO decida com centralização soberana forte distante calada e fria pesada ditatorial e solene fria distante fechada.',
          'Chova fisicamente forte gélido do lado de fora obscuro e tempestuoso e caótico chuvoso úmido escuro longo torrencial.'
        ],
        correct: 1,
        explanation: 'Separar a fase de geração de ideias da fase de crítica evita que propostas inovadoras sejam descartadas precocemente.'
      },
      {
        id: 4,
        question: 'Ao ver problemas diários como quebra-cabeças, você desenvolve a Soft Skill da:',
        options: [
          'Adaptabilidade analítica criativa focada resiliente.',
          'Irritabilidade profunda sombria e violenta.',
          'Intolerância cruel exata.',
          'Apatia.'
        ],
        correct: 0,
        explanation: 'Encarar imprevistos e crises como desafios a serem solucionados fortalece a capacidade de adaptação e resiliência do colaborador.'
      },
      {
        id: 5,
        question: 'Como o "pensamento lateral" se difere do modelo tradicional analítico robótico burocrático engessado frio?',
        options: [
          'Ele ignora totalmente as planilhas financeiras obrigatórias e quebra as regras da comissão de valores contábeis judiciais duras perigosas ríspidas secas chatas obscuras pesadas e frias lentas ruidosas.',
          'Ele explora abordagens oblíquas criativas indiretas e não convencionais livres que encontram saídas geniais em caminhos não desenhados na cartilha rotineira maçante chata lenta de repetição quadrada tradicional antiga velha rústica repetitiva.',
          'Ele só atua andando de lado físico e cômico no longo e distante e frio e solene tapete do imenso longo salão central do velho prédio administrativo sujo.',
          'Proíbe qualquer solução digital.'
        ],
        correct: 1,
        explanation: 'O pensamento lateral busca caminhos indiretos e criativos fora do padrão óbvio para contornar bloqueios complexos.'
      },
      {
        id: 6,
        question: 'A cultura de "não me traga só o problema sem uma ideia", erradica:',
        options: [
          'A criatividade mágica.',
          'O "reclamão de corredor", que é o profissional imaturo que gasta mais saliva queixando-se sem agir, corroendo de forma perigosa venenosa ruidosa sombria densa e opaca tóxica o clima corporativo de equipe cansada sob enorme rigorosa intensa profunda constante severa grave pressão financeira severa mensal dura.',
          'Os lucros da empresa nacional multinacional sólida madura centenária.',
          'As horas livres folgadas.'
        ],
        correct: 1,
        explanation: 'Exigir sugestões atreladas às reclamações transforma lamúrias passivas em atitudes ativas focadas em resolução.'
      },
      {
        id: 7,
        question: 'Por que ideias "irreais" devem ser anotadas sem risos jocosos e maldosos cruéis críticos tóxicos venenosos na fase inicial do Brainstorming engajado inovador livre expansivo?',
        options: [
          'Porque a ideia louca extrema arriscada excêntrica criativa utópica pode perfeitamente conter o embrião genético genial formidável fantástico do conceito mágico revolucionário central da inovação se apenas a lapidarmos na viabilidade prática posterior com calma analítica focada.',
          'Por obrigação poética artística folclórica colorida vibrante e pura.',
          'Porque atrasam as planilhas contábeis duras e precisas secas lentas longas cruéis exatas.',
          'Para humilhar velozmente lentamente e gradualmente as pessoas caladas tímidas fóbicas amedrontadas isoladas tímidas obscuras lentas e silenciosas assustadas pálidas lentas da sala amarela distante suja calada triste isolada fria pálida.'
        ],
        correct: 0,
        explanation: 'Ideias aparentemente absurdas costumam carregar o germe da inovação que, quando lapidado e ajustado, gera grandes diferenciais competitivos.'
      }
    ]
  },
  // =========================================================================
  // CURSO 9: ÉTICA E ETIQUETA CORPORATIVA (PRESENCIAL E DIGITAL)
  // =========================================================================
  {
    id: 'curso-etica-etiqueta-corporativa',
    trackId: 'trilha-1',
    trackName: 'TRILHA 1: Entrada no Mercado & Primeiro Emprego',
    category: 'Desenvolvimento Pessoal',
    targetAudienceType: ['JOVEM_APRENDIZ', 'ESTUDANTE', 'PRIMEIRO_EMPREGO', 'ESTAGIARIO'],
    title: 'Ética e Etiqueta Corporativa (Presencial e Digital)',
    subtitle: 'Adequação de vestuário (dress code), pontualidade, etiqueta em videochamadas (home office), WhatsApp corporativo e direito à desconexão.',
    hours: 12,
    equivalentHours: 12,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Jovens aprendizes, estagiários e profissionais em início de carreira buscando aprimorar sua postura profissional presencial e remota.',
    prerequisites: 'Nenhum pré-requisito.',
    badgeName: 'Profissional de Alta Postura & Ética',
    badgeCategory: 'Atitude Profissional',
    badgeIcon: 'Sparkles',
    accentColor: '#8B5CF6',
    level: 'Iniciante',
    learningObjectives: [
      'Compreender e respeitar o código de vestimenta (dress code) alinhado à cultura corporativa e aos diferentes segmentos de mercado.',
      'Cultivar pontualidade e rigor no cumprimento de compromissos como pilar de credibilidade profissional.',
      'Aplicar as melhores práticas de etiqueta em videochamadas e reuniões de home office (iluminação frontal, enquadramento e uso do microfone no mudo).',
      'Utilizar canais de comunicação corporativa como WhatsApp com bom senso, respeitando o direito à desconexão e a privacidade dos colegas.'
    ],
    modules: [
      {
        id: 'etica-etiqueta-mod-1',
        number: 1,
        title: 'MÓDULO 1: Comportamento Presencial',
        summary: 'Diretrizes de vestuário corporativo (dress code) para diferentes segmentos de mercado e o valor inegociável da pontualidade.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Adequação de Vestuário (Dress Code)',
              body: [
                'O modo de se vestir comunica respeito pela cultura da empresa e pelos clientes.',
                'O dress code varia desde o formal (terno, gravata ou alfaiataria) até o casual (jeans e camiseta), dependendo do segmento.',
                'Errar para menos (vestir-se com desleixo) passa imagem de amadorismo; errar para mais (excesso de formalidade em startups) demonstra falta de poder de observação.',
                'Vista-se com bom senso alinhado ao ambiente corporativo.'
              ],
              highlightBox: {
                type: 'info',
                title: 'Dress Code e Imagem Pessoal',
                text: 'Observe discretamente como os líderes e colegas de referência se vestem nos primeiros dias e alinhe seu vestuário ao padrão da organização.'
              }
            },
            {
              subheading: '2. Pontualidade e Compromisso',
              body: [
                'Chegar no horário certo a reuniões e cumprir prazos acordados é a base da credibilidade profissional.',
                'Atrasos recorrentes demonstram desrespeito com o tempo alheio.',
                'Caso ocorra um imprevisto inevitável, avise antecipadamente com uma justificativa plausível e o novo horário previsto de chegada.'
              ],
              highlightBox: {
                type: 'warning',
                title: 'Pontualidade é Credibilidade',
                text: 'Planeje trajetos prevendo imprevistos no trânsito; chegar com 5 a 10 minutos de antecedência transmite zelo e serenidade.'
              }
            }
          ]
        }
      },
      {
        id: 'etica-etiqueta-mod-2',
        number: 2,
        title: 'MÓDULO 2: O Novo Paradigma Remoto (Home Office)',
        summary: 'Etiqueta em reuniões virtuais (câmera, iluminação e microfone) e uso responsável do WhatsApp corporativo respeitando o descanso da equipe.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Etiqueta em Videochamadas',
              body: [
                'Reuniões virtuais exigem os mesmos cuidados do ambiente presencial.',
                'Mantenha a câmera ligada quando solicitado para transmitir transparência, garanta um fundo limpo e organizado, atente-se para a iluminação frontal do seu rosto e mantenha o microfone no Mute sempre que não estiver falando, evitando que barulhos domésticos interrompam a apresentação.'
              ],
              highlightBox: {
                type: 'info',
                title: 'Iluminação Frontal e Enquadramento',
                text: 'A luz deve incidir na frente do seu rosto (nunca atrás de você, criando silhuetas escuras); mantenha a câmera na altura dos olhos e fundo profissional.'
              }
            },
            {
              subheading: '2. WhatsApp Corporativo e Direito à Desconexão',
              body: [
                'O aplicativo de mensagens deve ser utilizado com parcimônia para tratar de assuntos profissionais.',
                'Evite enviar demandas fora do expediente de trabalho ou nos fins de semana, respeitando o direito à desconexão dos colegas.',
                'Assuntos complexos ou delicados devem ser tratados por e-mail oficial ou reuniões agendadas, e não por áudios longos no chat pessoal.'
              ],
              highlightBox: {
                type: 'warning',
                title: 'Direito à Desconexão',
                text: 'Demandas enviadas em fins de semana geram ansiedade e quebram a barreira saudável entre vida pessoal e profissional dos colaboradores.'
              }
            }
          ]
        }
      }
    ],
    caseStudies: [
      {
        id: 'caso-eticaetiqueta-1',
        title: 'Postura Profissional em Reunião Híbrida com Diretoria',
        character: 'Vinícius, Jovem Aprendiz Administrativo em Regime Híbrido',
        scenario: 'Vinícius participou de uma videochamada executiva importante trabalhando de casa e enfrentou barulho de obras na vizinhança.',
        criticalAnalysis: 'Ele manteve o microfone no mudo, ativou o cancelamento de ruído no fone, organizou um fundo neutro com iluminação frontal adequada e pediu a palavra pelo chat com extrema polidez, sendo elogiado pela postura impecável.',
        keyTakeaways: [
          'O uso consciente do mudo e enquadramento neutro resguarda o profissionalismo em reuniões virtuais.',
          'A comunicação respeitosa pelo chat oficial resolve imprevistos sem tumultuar a pauta.'
        ],
        badgeRelevance: 'Comprova maturidade exemplar em etiqueta empresarial presencial e remota.'
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'Vestir-se segundo o Dress Code da empresa significa:',
        options: [
          'Fantasiar-se diariamente.',
          'Usar peças de uso pessoal em consonância com a cultura do ambiente.',
          'Impor formalidades rígidas antigas em startups inovadoras.',
          'Não ligar para a estética corporativa.'
        ],
        correct: 1,
        explanation: 'Respeitar o código de vestimenta da empresa demonstra poder de observação e profissionalismo ao se adaptar à cultura interna.'
      },
      {
        id: 2,
        question: 'A Pontualidade Contínua mostra ao gestor que você:',
        options: [
          'Não tem nada importante a fazer.',
          'Possui e honra o fator Respeito pelo tempo de clientes e colegas.',
          'Corre perigos no transporte diário.',
          'Gosta de colecionar relógios caros de luxo dourados e finos clássicos longos importados.'
        ],
        correct: 1,
        explanation: 'Cumprir horários rigorosamente é a demonstração prática de que você valoriza a rotina e o tempo dos profissionais ao seu redor.'
      },
      {
        id: 3,
        question: 'Qual a "etiqueta número um" de videochamadas grupais remotas virtuais modernas?',
        options: [
          'Gritar festivamente e alto com a família em casa animada.',
          'Deixar deliberadamente o áudio perigosamente ligado em casa com ruídos intensos e latidos.',
          'Utilizar sabiamente o "Mute" e ativá-lo apenas na hora exata de discursar e pontuar logicamente e claramente.',
          'Desligar o roteador subitamente na frase do chefe com violência fria.'
        ],
        correct: 2,
        explanation: 'Manter o microfone desativado enquanto os outros falam impede que barulhos e ruídos de fundo interrompam a reunião digital.'
      },
      {
        id: 4,
        question: 'Acionar colegas pelo WhatsApp no domingo para assuntos não-urgentes é:',
        options: [
          'Erro gravíssimo (fere o direito moral ao descanso de fim de semana).',
          'Excelente e genial vanguardista espetacular disruptivo veloz.',
          'Completamente irrelevante ou indiferente no longo e médio prazo corporativo rígido sério.',
          'Recomendado pelas antigas normas aristocráticas medievais poéticas clássicas romanas exuberantes distantes rústicas finas antigas antigas raras longas frias fechadas.'
        ],
        correct: 0,
        explanation: 'Enviar mensagens de trabalho nos fins de semana viola o direito à desconexão do trabalhador e gera estresse desnecessário.'
      },
      {
        id: 5,
        question: 'Na sua videochamada de entrevista online ou reunião de gerência, a iluminação correta exige que:',
        options: [
          'Você fique num breu escuro, como a noite numa caverna umida gelada distante assombrosa oculta silenciosa e densa opaca tenebrosa e profunda sem luz oculta escondida trágica gélida morta.',
          'A fonte de luz mais forte (janela ou ring light leve branca ou amarela e difusa constante) fique voltada para o seu rosto de forma clara simpática franca honesta aberta limpa confiável e profissional e humana, e não estourada ofuscante forte brilhante por trás das suas costas, formando apenas uma silhueta negra invisível de fantasma oculto anônimo suspeito escondido bizarro e fóbico sem credibilidade analítica executiva de vendas formais de contratos grossos sérios corporativos empresariais comerciais vitais analíticos estruturais.',
          'Utilizar luzes vermelhas e estroboscópicas de danceterias festivas para acordar a equipe pesada de sexta feira de tarde fria lenta chata gélida opaca inerte letárgica sonolenta.',
          'Direcionar lanternas de celular fortes brilhantes nos próprios olhos com sofrimento físico latente real doloroso agudo cego temporário perigoso denso letal incômodo severo rígido constante tenso e longo.'
        ],
        correct: 1,
        explanation: 'A iluminação frontal adequada permite que os interlocutores enxerguem com clareza suas expressões faciais, transmitindo transparência.'
      },
      {
        id: 6,
        question: 'Como o fundo (background real visível) de uma videochamada de Home Office reflete na sua marca pessoal?',
        options: [
          'Um fundo caótico transmite completo e amplo puro descaso amador infantil e severo com a comunicação visual profissional da própria companhia, e compromete a seriedade de uma negociação pesada e densa ou explicação formal e longa da pauta extensa complexa analítica financeira do projeto vital trimestral sério grande de milhões importantes puros de reais da diretoria nacional regional global ampla.',
          'O fundo da tela nunca influencia na mente límbica do cliente do outro lado do mundo, já que ele deve ignorar tudo exceto os números brutos secos do PowerPoint azul chato letárgico sonolento longo estático quadrado e velho rústico distante lento pesado arcaico defasado.',
          'Usar efeitos amadores de gatos coloridos mágicos cósmicos voando é recomendado na conversa do RH metódico quadrado firme central diretor supervisor analítico sênior formal.',
          'Acumular roupas sujas na cama visível da tela mostra transparência rústica do seu dia longo produtivo cheio de vida familiar natural biológica rústica pura verdadeira nua e crua poética existencial sincera densa da humanidade.'
        ],
        correct: 0,
        explanation: 'A imagem do ambiente ao fundo compõe a sua marca pessoal e afeta a percepção de zelo e organização que os clientes têm de você.'
      },
      {
        id: 7,
        question: 'Como responder um e-mail de liderança onde seu nome foi copiado equivocadamente por erro do remente desatento focado cansado?',
        options: [
          'Excluir e fingir surpresa plena infantil quando for cobrado futuramente nas longas semanas analíticas severas contábeis judiciais duras seguintes longas de inverno gélido distante calmo neutro denso chuvoso e denso calado obscuro escuro e cinzento nublado de rotina chata comum.',
          'Responder com extrema polidez formal profissional fina educada e clara avisando o erro do remetente sem acusações irônicas sarcásticas e maldosas venenosas tóxicas perigosas inflamáveis infantis para garantir a realocação rápida fluida eficaz e ágil analítica prática certa e verdadeira veloz eficiente contínua e forte do e-mail ao colega que resolverá o problema técnico sério crônico grave urgente formal denso real burocrático longo complexo metódico e real.',
          'Xingar o estagiário com fúria.',
          'Publicar a ofensa nas redes sociais.'
        ],
        correct: 1,
        explanation: 'Esclarecer o equívoco com urbanidade evita que prazos sejam perdidos e ajuda a redirecionar a mensagem ao setor competente.'
      }
    ]
  },
  // =========================================================================
  // CURSO 8: INTELIGÊNCIA EMOCIONAL NO TRABALHO
  // =========================================================================
  {
    id: 'curso-inteligencia-emocional-trabalho',
    trackId: 'trilha-2',
    trackName: 'TRILHA 2: Soft Skills, Postura & Comunicação Corporativa',
    category: 'Desenvolvimento Pessoal',
    targetAudienceType: 'TODOS',
    title: 'Inteligência Emocional no Trabalho',
    subtitle: 'Mapeamento de gatilhos, o sequestro da amígdala e técnica da pausa, postura reativa vs. responsiva, gestão madura de feedbacks e resiliência.',
    hours: 12,
    equivalentHours: 12,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Jovens aprendizes, estagiários e colaboradores que buscam desenvolver autorregulação emocional, resiliência e maturidade profissional.',
    prerequisites: 'Nenhum pré-requisito.',
    badgeName: 'Mestre em Inteligência Emocional',
    badgeCategory: 'Saúde Mental',
    badgeIcon: 'Sparkles',
    accentColor: '#EC4899',
    level: 'Iniciante',
    learningObjectives: [
      'Mapear e identificar gatilhos emocionais específicos no ambiente corporativo para prevenir comportamentos impulsivos.',
      'Compreender o sequestro da amígdala e aplicar a técnica da pausa de 5 segundos para recuperar o raciocínio lógico em momentos de estresse.',
      'Diferenciar a postura reativa da postura responsiva, escolhendo conscientemente condutas construtivas.',
      'Receber e processar feedbacks de melhoria com maturidade, resiliência e foco no aprimoramento contínuo.'
    ],
    modules: [
      {
        id: 'ie-mod-1',
        number: 1,
        title: 'MÓDULO 1: Os Pilares Internos',
        summary: 'Identifique seus gatilhos emocionais, entenda o mecanismo biológico do estresse agudo e pratique a técnica da pausa de 5 segundos.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Mapeamento de Gatilhos e Autoconhecimento',
              body: [
                'A inteligência emocional começa pela identificação dos próprios gatilhos — situações específicas (como críticas em público ou prazos apertados) que despertam emoções intensas de ansiedade ou raiva.',
                'Reconhecer e nomear a emoção no momento em que ela surge é a primeira ferramenta para impedir comportamentos impulsivos e desproporcionais no trabalho.'
              ],
              highlightBox: {
                type: 'info',
                title: 'Nomear para Acalmar',
                text: 'Identificar conscientemente a emoção ("estou sentindo frustração com esse prazo") ativa o córtex pré-frontal e diminui a intensidade da reação impulsiva.'
              }
            },
            {
              subheading: '2. O Sequestro da Amígdala e a Técnica da Pausa',
              body: [
                'Diante de um estresse agudo, a amígdala cortical no cérebro assume o comando instintivo, gerando reações de luta ou fuga antes que a mente lógica (o córtex pré-frontal) processe os fatos.',
                'Aplicar a técnica da pausa de 5 segundos — respirando fundo antes de responder a uma provocação — permite recuperar o raciocínio lógico e agir de maneira equilibrada e profissional.'
              ],
              highlightBox: {
                type: 'warning',
                title: 'A Regra dos 5 Segundos',
                text: 'Em momentos de raiva ou choque, pause e respire profundamente por 5 segundos antes de falar ou enviar qualquer e-mail corporativo.'
              }
            }
          ]
        }
      },
      {
        id: 'ie-mod-2',
        number: 2,
        title: 'MÓDULO 2: O Espelho Social',
        summary: 'Transite da reação impulsiva para a resposta consciente, encare feedbacks como diagnóstico de tarefas e cultive resiliência sustentável.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Posição Reativa vs. Posição Responsiva',
              body: [
                'Profissionais reativos agem sem filtro, sendo guiados por instintos do momento e culpando fatores externos por seus erros.',
                'Já o profissional responsivo analisa a situação, avalia as consequências de cada opção e escolhe conscientemente a melhor conduta para resolver o problema, preservando suas relações de trabalho.'
              ],
              highlightBox: {
                type: 'info',
                title: 'Reação vs. Resposta',
                text: 'Reagir é automático e guiado pelo impulso; responder é uma escolha consciente pautada pela ética e pelo profissionalismo.'
              }
            },
            {
              subheading: '2. Gestão Madura de Feedbacks e Resiliência',
              body: [
                'Feedbacks de melhoria devem ser enxergados como diagnósticos valiosos sobre a execução de uma tarefa, e não como ataques pessoais à dignidade do indivíduo.',
                'A resiliência é a capacidade de absorver críticas construtivas, reerguer-se após falhas operacionais e aplicar os novos aprendizados para evoluir continuamente.'
              ],
              highlightBox: {
                type: 'info',
                title: 'Feedback é Diagnóstico',
                text: 'Separe sua identidade pessoal da tarefa executada: um ajuste técnico apontado pelo gestor é a chave para o seu aperfeiçoamento contínuo.'
              }
            }
          ]
        }
      }
    ],
    caseStudies: [
      {
        id: 'caso-inteligenciaemocional-1',
        title: 'Maturidade Emocional e Resposta Consciente em Reunião de Alinhamento',
        character: 'Larissa, Aprendiz de Departamento Pessoal',
        scenario: 'Larissa recebeu uma crítica pública sobre um relatório divergente durante a reunião geral de equipe, sentindo vontade imediata de rebater agressivamente.',
        criticalAnalysis: 'Larissa aplicou a pausa de 5 segundos, compreendeu que o erro era na fórmula da planilha e não no seu valor como profissional, anotou as correções com calma e apresentou o documento corrigido 20 minutos depois.',
        keyTakeaways: [
          'A pausa estratégica impede rompantes que prejudicam a reputação corporativa.',
          'Encarar o erro como oportunidade de aprendizado demonstra maturidade e liderança.'
        ],
        badgeRelevance: 'Comprova excelência em inteligência emocional, estabilidade sob pressão e atitude responsiva.'
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'A fundação da Inteligência Emocional madura está baseada em:',
        options: [
          'Velocidade de memorização de relatórios.',
          'Mapeamento e Autoconhecimento dos "gatilhos" emocionais.',
          'Vontade de sorrir repetidamente sempre, falsamente.',
          'Decorar livros poéticos antigos europeus longos.'
        ],
        correct: 1,
        explanation: 'Conhecer suas próprias reações emocionais permite antecipar gatilhos de estresse e agir com autocontrole nas reuniões difíceis.'
      },
      {
        id: 2,
        question: 'A técnica da "Pausa" em picos de nervosismo corporativos:',
        options: [
          'Diminui oxigênio no cérebro perigosamente.',
          'Permite à porção lógica (neocórtex) retomar a racionalidade, freando instintos de briga.',
          'Causa pânico total na gerência opressora dura e central.',
          'Exige uso de medicação sintética.'
        ],
        correct: 1,
        explanation: 'Interromper a reação por 5 segundos dá tempo ao córtex pré-frontal para assumir o controle do cérebro no lugar dos impulsos primitivos.'
      },
      {
        id: 3,
        question: 'Empatia é essencialmente diferente de Simpatia porque:',
        options: [
          'Você compreende e mergulha no problema pela ótica do colega ferido.',
          'É enviar cartões florais de apoio aos domingos tristes noturnos.',
          'Dizer "eu te avisei bem antes".',
          'Transferir dinheiro diretamente todo mês para confortar.'
        ],
        correct: 0,
        explanation: 'A empatia exige enxergar a situação sob a perspectiva do outro, ao passo que a simpatia é apenas lamentar o problema superficialmente.'
      },
      {
        id: 4,
        question: 'Como tratar o Feedback de melhoria:',
        options: [
          'Aceitá-lo como diagnóstico da ação profissional, e não como ofensa ao ser humano.',
          'Rebate hostilmente e bater na mesa com fúria cega rígida.',
          'Entrar em crise infindável triste de semanas de choro contínuo e longo paralisado.',
          'Omitir os erros da contabilidade ofendida perigosa frágil pesada tensa obscura.'
        ],
        correct: 0,
        explanation: 'Feedbacks maduros devem ser encarados como oportunidades pontuais de ajustes na tarefa técnica, sem levar para o lado pessoal.'
      },
      {
        id: 5,
        question: 'O que é o "Sequestro da Amígdala" no ambiente corporativo tenso de crise aguda?',
        options: [
          'Uma doença na garganta inflamada dos operadores que falam excessivamente de tarde fria.',
          'Quando a emoção instintiva de defesa bruta sobrepõe o raciocínio lógico no cérebro e gera uma atitude agressiva impulsiva irremediável rude tola grossa e mal-educada contra a chefia sênior direta e imediata e forte superior pesada séria densa.',
          'O rapto físico de arquivos trancados em baús analógicos nas docas escuras industriais longas e periféricas grandes sujas.',
          'A redução do salário na folha contábil do mês descontado irregular.'
        ],
        correct: 1,
        explanation: 'O sequestro da amígdala ocorre quando a parte emocional do cérebro bloqueia o pensamento racional, provocando rompantes explosivos prejudiciais à carreira.'
      },
      {
        id: 6,
        question: 'Um profissional "Reativo" difere do profissional "Responsivo" pois:',
        options: [
          'O responsivo respira e escolhe a melhor atitude racional analítica prudente sólida sábia e polida, o reativo age por instinto imediato cru irracional infantil e raivoso imaturo e frágil e fraco tolo bobo impulsivo volátil inconstante.',
          'O responsivo responde emails longos e chatos e cheios de fórmulas obscuras de noite chuvosa; o reativo apaga computadores alheios vizinhos físicos.',
          'O reativo usa cores berrantes chamativas vibrantes exóticas chocantes na gravata larga social estampada extravagante clássica formal arcaica esquisita.',
          'Ambos são rigorosamente iguais perante o código de ética penal e legal brasileiro vigente e aplicado rígido severo duro punitivo contundente coercitivo.'
        ],
        correct: 0,
        explanation: 'Profissionais responsivos analisam o cenário antes de agir, enquanto profissionais reativos explodem e reagem de imediato sem medir consequências.'
      },
      {
        id: 7,
        question: 'Uma pessoa resiliente na corporação consegue:',
        options: [
          'Fingir plenamente que não se importa dolorosamente intensamente com os graves problemas urgentes catastróficos.',
          'Levantar rapidamente e aprender sólidas maduras contínuas valiosas reais práticas técnicas e puras lições preciosas após tombos dolorosos intensos falhas graves fracassos ruins feios vergonhosos intensos densos de projetos vitais centrais analíticos cancelados duros caros onerosos pesados obscuros perdidos falidos caídos, não perdendo a força e foco final contínuo tenaz resiliente firme mental calmo e pacífico e seguro.',
          'Agredir psicologicamente quem a feriu nas longas horas caladas e sombrias densas da madrugada no chat anônimo invisível furtivo falso corporativo vazio oco noturno obscuro longo distante fechado anônimo.',
          'Pedir demissão no primeiro obstáculo denso pequeno.'
        ],
        correct: 1,
        explanation: 'A resiliência é a habilidade de absorver o impacto das falhas do dia a dia, reerguer-se com aprendizado e continuar focado nos objetivos.'
      }
    ]
  },
  // =========================================================================
  // CURSO 7: GESTÃO DO TEMPO E PRODUTIVIDADE
  // =========================================================================
  {
    id: 'curso-gestao-tempo-produtividade-iniciante',
    published: true,
    isPublished: true,
    active: true,
    visible: true,
    videoUrl: 'https://youtu.be/VcFK4u1IOZQ?si=hhiqf7NL7QwLWP_X',
    youtubeId: 'VcFK4u1IOZQ',
    trackId: 'trilha-5',
    trackName: 'TRILHA 5: Gestão do Tempo, Foco & Educação Financeira',
    category: 'Desenvolvimento Pessoal',
    targetAudienceType: 'TODOS',
    title: 'Gestão do Tempo e Produtividade',
    subtitle: 'A Matriz de Eisenhower (Urgente vs. Importante), planejamento preventivo, o mito da multitarefa, resíduo atencional e a Técnica Pomodoro.',
    hours: 12,
    equivalentHours: 12,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Estudantes, estagiários, jovens aprendizes e profissionais que precisam conciliar múltiplas demandas com foco e sem esgotamento mental.',
    prerequisites: 'Nenhum pré-requisito.',
    badgeName: 'Mestre em Foco e Produtividade',
    badgeCategory: 'Atitude Profissional',
    badgeIcon: 'Clock',
    accentColor: '#10B981',
    level: 'Iniciante',
    learningObjectives: [
      'Classificar tarefas diárias pela Matriz de Eisenhower distinguindo o que é Urgente do que é Importante.',
      'Atuar no Quadrante 2 (Importante e Não Urgente) através do planejamento preventivo para evitar crises de prazos.',
      'Compreender os prejuízos do resíduo atencional e abandonar o mito da multitarefa cognitiva.',
      'Aplicar os ciclos de foco absoluto e pausas restauradoras da Técnica Pomodoro sem distrações de telas.'
    ],
    modules: [
      {
        id: 'gestao-tempo-mod-1',
        number: 1,
        title: 'MÓDULO 1: A Matriz de Eisenhower',
        summary: 'Aprenda a distinguir Urgência de Importância e utilize o planejamento preventivo para priorizar o que gera valor a longo prazo.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Distinção entre Urgente e Importante',
              body: [
                'A Matriz de Eisenhower organiza as tarefas diárias em quatro quadrantes baseados em dois eixos: Urgência (exige atenção imediata) e Importância (contribui para metas de longo prazo).',
                'A divisão orienta a ação: 1) Urgente e Importante: Faça imediatamente; 2) Importante, mas Não Urgente: Agende para realizar com qualidade; 3) Urgente, mas Não Importante: Delegue a terceiros sempre que possível; 4) Não Urgente e Não Importante: Elimine, pois trata-se de distração pura.'
              ],
              highlightBox: {
                type: 'info',
                title: 'Os 4 Quadrantes da Matriz',
                text: 'Q1 (Faça agora) | Q2 (Agende e planeje) | Q3 (Delegue se puder) | Q4 (Elimine distrações).'
              }
            },
            {
              subheading: '2. Planejamento Preventivo',
              body: [
                'A chave para a produtividade sustentável é gastar a maior parte do tempo no Quadrante 2 (Importante/Não Urgente).',
                'Planejar projetos com antecedência, estudar e cuidar do ambiente evita que tarefas importantes se transformem em urgências caóticas na véspera dos prazos.'
              ],
              highlightBox: {
                type: 'info',
                title: 'Trabalho no Quadrante 2',
                text: 'Investir tempo em planejamento preventivo reduz o estresse diário e elimina a sensação de estar apenas "apagando incêndios".'
              }
            }
          ]
        }
      },
      {
        id: 'gestao-tempo-mod-2',
        number: 2,
        title: 'MÓDULO 2: O Foco Absoluto',
        summary: 'Entenda os efeitos do resíduo atencional no cérebro e domine a Técnica Pomodoro para manter concentração máxima.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. O Mito da Multitarefa e Resíduo Atencional',
              body: [
                'O cérebro humano não processa duas tarefas complexas simultaneamente; ele apenas alterna rapidamente o foco entre elas.',
                'Essa alternância gera o chamado "resíduo atencional" — parte da sua capacidade cognitiva permanece presa na tarefa anterior, reduzindo a qualidade do trabalho e aumentando os erros em planilhas ou relatórios.'
              ],
              highlightBox: {
                type: 'warning',
                title: 'Custo da Troca de Contexto',
                text: 'Cada checagem rápida no celular ou troca de abas deixa resíduo atencional, custando minutos preciosos para retomar o estado de fluxo mental profundo.'
              }
            },
            {
              subheading: '2. A Técnica Pomodoro',
              body: [
                'Desenvolvida para manter o foco sustentável, a Técnica Pomodoro consiste em trabalhar com 100% de concentração em um único objetivo por 25 minutos (um "Pomodoro"), seguidos por 5 minutos de pausa total longe das telas.',
                'Após quatro ciclos completados, faz-se uma pausa mais longa (de 15 a 30 minutos), evitando o esgotamento mental ao fim do dia.'
              ],
              highlightBox: {
                type: 'info',
                title: 'Descanso de Verdade',
                text: 'Durante os 5 minutos de pausa, afaste-se do computador e do celular: beba água, alongue-se e descanse a visão para oxigenar a mente.'
              }
            }
          ]
        }
      }
    ],
    caseStudies: [
      {
        id: 'caso-gestaotempo-1',
        title: 'Superando a Procrastinação e Eliminando Ladrões de Tempo',
        character: 'Rodrigo, Aprendiz de Controladoria e Estudante Noturno',
        scenario: 'Rodrigo vivia sobrecarregado entregando relatórios no último minuto e com erros de digitação por tentar responder mensagens enquanto calculava planilhas.',
        criticalAnalysis: 'Rodrigo implementou a Matriz de Eisenhower para agendar suas análises em blocos de Pomodoro de 25 minutos com celular em modo foco, eliminando retrabalhos e saindo pontualmente para a faculdade.',
        keyTakeaways: [
          'Monotarefa focada produz o dobro na metade do tempo.',
          'Pausas programadas longe de telas renovam a clareza analítica.'
        ],
        badgeRelevance: 'Comprova alta maturidade de autogestão, disciplina pessoal e eficiência operacional.'
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'O propósito da Matriz de Eisenhower foca em:',
        options: [
          'Misturar tudo numa bandeja.',
          'Classificar e separar "Importante" de "Urgente".',
          'Medir o tempo de almoço.',
          'Cancelar todos e-mails logo cedo.'
        ],
        correct: 1,
        explanation: 'A Matriz de Eisenhower ajuda o profissional a categorizar suas demandas entre importância e urgência para priorizar o que traz valor real.'
      },
      {
        id: 2,
        question: 'Algo "Não Urgente" e "Não Importante", deve ser tratado como:',
        options: [
          'Feito imediatamente.',
          'Agendado.',
          'Delegado à gerência central.',
          'Eliminado, pois são apenas distrações puras.'
        ],
        correct: 3,
        explanation: 'Atividades que não agregam valor nem possuem urgência são ladrões de tempo que devem ser cortados da rotina.'
      },
      {
        id: 3,
        question: 'A "Multitarefa" extrema reflete que:',
        options: [
          'O cérebro processa tudo triplo mais rápido.',
          'Acarreta "resíduo atencional", destruindo o rendimento.',
          'Melhora finanças cerebrais.',
          'Facilita processos de demissão.'
        ],
        correct: 1,
        explanation: 'Alternar o foco entre várias tarefas complexas deixa rastros de atenção na tarefa anterior, reduzindo drasticamente a capacidade cognitiva.'
      },
      {
        id: 4,
        question: 'A aplicação da Técnica Pomodoro consiste em:',
        options: [
          '25 minutos de foco absoluto seguidos de 5 minutos de pausa.',
          'Dormir 25 minutos e trabalhar 5.',
          'Comer tomates sem parar.',
          'Abandonar relógios no trabalho e agir por intuição.'
        ],
        correct: 0,
        explanation: 'A técnica Pomodoro divide a jornada em blocos ininterruptos de trabalho concentrado intercalados com pequenas pausas para oxigenar a mente.'
      },
      {
        id: 5,
        question: 'O que significa "delegar" tarefas urgentes mas não importantes?',
        options: [
          'Transferir a burocracia mecânica de menor impacto direto para níveis de suporte adequados, liberando seu foco analítico denso central.',
          'Jogar a culpa nas outras pessoas do time lateral vizinho distante.',
          'Excluir o projeto inteiro sem avisar ninguém da cadeia de chefia superior direta formal.',
          'Pagar para um robô invisível realizar clandestinamente.'
        ],
        correct: 0,
        explanation: 'Passar tarefas operacionais secundárias para a equipe de apoio permite ao analista focar nas decisões de alto impacto do setor.'
      },
      {
        id: 6,
        question: 'Como o "resíduo atencional" afeta a entrega de um relatório?',
        options: [
          'Ele melhora as cores das células financeiras.',
          'Parte do seu cérebro fica presa na aba do Whatsapp que acabou de fechar, reduzindo a capacidade intelectual de focar nos cálculos vitais, causando erros bobos estruturais graves operacionais básicos.',
          'Ele aumenta o seu salário bruto.',
          'Não causa impacto algum em jovens.'
        ],
        correct: 1,
        explanation: 'O cérebro leva minutos para recuperar o estado de imersão total após cada interrupção rápida em redes ou chats de mensagens.'
      },
      {
        id: 7,
        question: 'O principal erro ao usar o Pomodoro é:',
        options: [
          'Usar o período de pausa (5 minutos) para entrar nas redes sociais no celular em vez de descansar a visão da tela.',
          'Escolher tomates maduros.',
          'Desligar o computador a cada vinte minutos.',
          'Trabalhar escutando Mozart clássico baixo.'
        ],
        correct: 0,
        explanation: 'O descanso deve ser usado para despressurizar os olhos e a mente da luz das telas, e não para consumir dopamina rápida em redes virtuais.'
      }
    ]
  },
  // =========================================================================
  // CURSO 6: PRODUTIVIDADE COM NOTEBOOKLM
  // =========================================================================
  {
    id: 'curso-produtividade-notebooklm',
    videoUrl: 'https://youtu.be/LVYRzFxBZLE?si=hjVmprUh1FY5ifFd',
    youtubeId: '1uIR8erwQmI',
    trackId: 'trilha-3',
    trackName: 'TRILHA 3: Tecnologia, Informática & Produtividade com IA',
    category: 'Tecnologia da Informação',
    targetAudienceType: ['JOVEM_APRENDIZ', 'ESTUDANTE', 'PRIMEIRO_EMPREGO', 'ESTAGIARIO'],
    title: 'Produtividade com NotebookLM',
    subtitle: 'IA baseada em fontes próprias, técnica de ancoramento (grounding), rastreabilidade com citações diretas, guias de estudo e Audio Overview (podcasts).',
    hours: 12,
    equivalentHours: 12,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Estudantes, jovens aprendizes, estagiários e analistas que precisam absorver grandes volumes de documentos, manuais e apostilas com agilidade e confiabilidade.',
    prerequisites: 'Nenhum pré-requisito.',
    badgeName: 'Especialista em NotebookLM',
    badgeCategory: 'Ferramentas de Escritório',
    badgeIcon: 'BookOpen',
    accentColor: '#3B82F6',
    level: 'Avançado',
    learningObjectives: [
      'Compreender o princípio do ancoramento (grounding) no NotebookLM, restringindo as respostas da IA exclusivamente aos documentos fornecidos.',
      'Utilizar citações diretas clicáveis para auditar, rastrear e validar a procedência exata das informações nos PDFs e textos originais.',
      'Gerar automaticamente guias de estudo, cronogramas, FAQs e relatórios executivos a partir de múltiplos arquivos.',
      'Aproveitar o recurso Audio Overview para transformar materiais densos em podcasts explicativos acessíveis para estudo em qualquer lugar.'
    ],
    modules: [
      {
        id: 'notebooklm-mod-1',
        number: 1,
        title: 'MÓDULO 1: IA Baseada em Suas Fontes',
        summary: 'Entenda como o NotebookLM ancora suas respostas unicamente nos documentos carregados e utilize citações diretas para auditoria.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Ancoramento (Grounding)',
              body: [
                'O NotebookLM (ferramenta do Google) diferencia-se de IAs genéricas por trabalhar com a técnica de ancoramento restrito.',
                'Ao fazer o upload de seus próprios arquivos (PDFs, documentos do Google, planilhas ou textos), a ferramenta responde perguntas baseando-se exclusivamente nos seus dados fornecidos.',
                'Isso reduz drasticamente a ocorrência de alucinações e garante conformidade com as regras e manuais internos da empresa.'
              ],
              highlightBox: {
                type: 'info',
                title: 'O Poder do Ancoramento',
                text: 'Ao restringir as respostas ao material enviado, a IA não busca respostas aleatórias na internet e evita a disseminação de dados não homologados.'
              }
            },
            {
              subheading: '2. Rastreabilidade e Citações Diretas',
              body: [
                'Todas as respostas geradas pelo NotebookLM acompanham citações numéricas interativas.',
                'Ao clicar em uma citação, a plataforma direciona o usuário imediatamente para a página e o parágrafo exatos do documento original de onde a informação foi extraída.',
                'Essa funcionalidade permite auditoria instantânea dos dados e validação rápida em processos de compliance e auditoria.'
              ],
              highlightBox: {
                type: 'info',
                title: 'Auditoria com Um Clique',
                text: 'As citações diretas garantem que toda afirmação possa ser comprovada imediatamente na página e linha do documento original de referência.'
              }
            }
          ]
        }
      },
      {
        id: 'notebooklm-mod-2',
        number: 2,
        title: 'MÓDULO 2: Formatos Multimodais de Estudo',
        summary: 'Gere materiais de apoio automáticos (FAQs, resumos, linhas do tempo) e converta apostilas em discussões de podcast com o Audio Overview.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Geração de Guias de Estudo e MOCs',
              body: [
                'A partir das fontes carregadas, a plataforma permite gerar com um único clique guias de estudo estruturados, FAQs com as dúvidas mais prováveis, linhas do tempo e relatórios executivos.',
                'Isso transforma bases brutas de dados em materiais organizados para treinamentos e consultas rápidas da equipe.'
              ],
              highlightBox: {
                type: 'info',
                title: 'Materiais de Apoio Imediatos',
                text: 'Crie apostilas didáticas, glossários de termos técnicos e perguntas frequentes a partir de documentos complexos em segundos.'
              }
            },
            {
              subheading: '2. Audio Overview (Podcasts Automáticos)',
              body: [
                'O recurso Audio Overview converte documentos de texto em um debate em áudio entre dois apresentadores virtuais em formato de podcast.',
                'Essa inovação oferece acessibilidade e flexibilidade, permitindo absorver conteúdos densos de manuais ou artigos enquanto o profissional se desloca no trânsito ou realiza tarefas físicas rotineiras.'
              ],
              highlightBox: {
                type: 'info',
                title: 'Estudo Dinâmico em Qualquer Lugar',
                text: 'O formato de debate em áudio torna o aprendizado envolvente e prático, ideal para conciliar a rotina de deslocamento com a absorção de conhecimento.'
              }
            }
          ]
        }
      }
    ],
    caseStudies: [
      {
        id: 'caso-notebooklm-1',
        title: 'Centralização de Normas e Onboarding Ágil de Novos Contratados',
        character: 'Camila, Aprendiz de Recursos Humanos',
        scenario: 'Camila precisava capacitar novos aprendizes sobre as políticas internas da empresa reunidas em mais de 10 manuais e regulamentos diferentes.',
        criticalAnalysis: 'Ela consolidou os manuais no NotebookLM, gerou um FAQ com as dúvidas recorrentes e compartilhou o Audio Overview para os novatos escutarem no caminho de volta para casa.',
        keyTakeaways: [
          'Unificar fontes garante que todas as respostas venham da documentação oficial da empresa.',
          'Formatos alternativos como áudio facilitam a retenção do conteúdo sem sobrecarregar a leitura.'
        ],
        badgeRelevance: 'Comprova domínio em organização do conhecimento, síntese multimodal e aprendizagem ágil.'
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'O diferencial do NotebookLM é:',
        options: [
          'Busca aleatória na web.',
          'Resposta ancorada apenas nos documentos que você fez upload.',
          'Gráficos 3D superiores.',
          'Correção via webcam.'
        ],
        correct: 1,
        explanation: 'O NotebookLM usa o princípio do ancoramento (grounding), limitando suas análises única e exclusivamente às fontes enviadas pelo próprio usuário.'
      },
      {
        id: 2,
        question: 'Para que servem as "citações diretas" (marcadores)?',
        options: [
          'Estética da interface.',
          'Apontar falhas de upload.',
          'Validar a resposta mostrando a página e parágrafo exatos no PDF original.',
          'Convidar amigos.'
        ],
        correct: 2,
        explanation: 'As citações clicáveis trazem rastreabilidade total, permitindo conferir no documento original o trecho exato que originou a afirmação.'
      },
      {
        id: 3,
        question: 'Ao usar manuais pesados, você pode gerar rapidamente:',
        options: [
          'FAQs e Guias de Estudo resumidos.',
          'Redação infantil.',
          'Planilhas automáticas que invadem servidores.',
          'Relatórios deletados.'
        ],
        correct: 0,
        explanation: 'A plataforma transforma volumes densos de texto em materiais de apoio estruturados para revisão rápida de matérias e regulamentos.'
      },
      {
        id: 4,
        question: 'O formato "Audio Overview" cria:',
        options: [
          'Melodias clássicas.',
          'Alertas sonoros de tela inativa.',
          'Um "podcast" gerado a partir do seu PDF, excelente para consumir no trânsito.',
          'Sons de pássaros aleatórios.'
        ],
        correct: 2,
        explanation: 'O Audio Overview gera um diálogo em áudio entre dois apresentadores virtuais debatendo os tópicos dos documentos carregados.'
      },
      {
        id: 5,
        question: 'Por que a técnica de "Grounding" (ancoramento) torna os dados mais seguros para o ambiente corporativo?',
        options: [
          'Por amarrar o computador na mesa com cabos de aço rígidos.',
          'Por forçar a inteligência a não buscar no Google, restringindo as respostas apenas aos dados controlados enviados pela própria companhia.',
          'Porque diminui a bateria gasta na execução do programa interno.',
          'Por utilizar senhas alfanuméricas criptografadas curtas.'
        ],
        correct: 1,
        explanation: 'Ao vedar buscas externas abertas na web, a ferramenta impede a contaminação da análise com informações não homologadas pela empresa.'
      },
      {
        id: 6,
        question: 'Como as Notas Salvas ajudam o analista diário?',
        options: [
          'Fixam os aprendizados e excertos-chave extraídos para compor um painel lateral de consulta ágil sem reabrir os longos PDFs primários e brutos.',
          'Enviam músicas para a caixa postal.',
          'Desligam a iluminação noturna do escritório remoto online.',
          'Formatam o disco rígido liberando mais de 50GB diários.'
        ],
        correct: 0,
        explanation: 'O painel de notas serve como um acervo de memórias rápidas extraídas das conversas para montagem de relatórios consolidados.'
      },
      {
        id: 7,
        question: 'Em um contexto universitário, a ferramenta é ideal para:',
        options: [
          'Burlar o sistema de notas do MEC diretamente.',
          'Organizar apostilas extensas de vários professores numa única base coerente de perguntas e respostas focadas na avaliação final acadêmica analítica.',
          'Desenhar logos coloridos para repúblicas estudantis noturnas festivas.',
          'Apagar e-mails institucionais do portal do aluno matriculado na faculdade de Letras.'
        ],
        correct: 1,
        explanation: 'Unificar múltiplos arquivos numa só base de dados facilita a revisão para provas e o estudo cruzado de bibliografias extensas.'
      }
    ]
  },
  // =========================================================================
  // CURSO 5: INTELIGÊNCIA ARTIFICIAL PRÁTICA
  // =========================================================================
  {
    id: 'curso-inteligencia-artificial-pratica',
    trackId: 'trilha-3',
    trackName: 'TRILHA 3: Tecnologia, Informática & Produtividade com IA',
    category: 'Tecnologia da Informação',
    targetAudienceType: ['JOVEM_APRENDIZ', 'ESTUDANTE', 'PRIMEIRO_EMPREGO', 'ESTAGIARIO'],
    title: 'Inteligência Artificial Prática',
    subtitle: 'Prompt engineering (papel, contexto, formato), conceito de copiloto, mitigação de alucinações, síntese de leitura e adequação de tom de voz.',
    hours: 12,
    equivalentHours: 12,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Jovens aprendizes, estagiários e profissionais em início de carreira buscando utilizar IA generativa como copiloto diário no trabalho.',
    prerequisites: 'Nenhum pré-requisito.',
    badgeName: 'Copiloto de IA Corporativa',
    badgeCategory: 'Trabalho',
    badgeIcon: 'Sparkles',
    accentColor: '#3B82F6',
    level: 'Avançado',
    learningObjectives: [
      'Dominar a engenharia de prompts definindo papel, contexto e formato de saída para obter respostas precisas e sem ambiguidades.',
      'Compreender o conceito de copiloto e o risco de alucinações, exercendo supervisão e validação humana rigorosa.',
      'Utilizar modelos generativos para otimizar a leitura, sintetizar relatórios extensos e extrair pontos acionáveis com agilidade.',
      'Ajustar o tom de voz e revisar gramática e coesão em comunicados e e-mails corporativos formais.'
    ],
    modules: [
      {
        id: 'ia-pratica-mod-1',
        number: 1,
        title: 'MÓDULO 1: Prompt Engineering',
        summary: 'Aprenda a estruturar prompts eficazes com papel, contexto e formato, além de compreender o papel da IA como copiloto e os riscos de alucinação.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Construção de Prompts Eficientes',
              body: [
                'A qualidade da resposta de um modelo de linguagem (como ChatGPT ou Gemini) depende diretamente da clareza da instrução enviada (prompt).',
                'Um prompt bem estruturado deve conter três elementos fundamentais: o Papel atribuído à IA (ex: "Atue como um especialista em RH"), o Contexto detalhado do cenário e o Formato da Entrega desejado (ex: "em tópicos com tabela").',
                'Isso elimina respostas vagas ou genéricas e garante entregas profissionais sob medida.'
              ],
              highlightBox: {
                type: 'info',
                title: 'Tríade do Prompt Perfeito',
                text: 'Papel (Quem é a IA?) + Contexto (Qual a situação?) + Formato de Saída (Como a resposta deve ser entregue: tabela, tópicos ou rascunho de e-mail).'
              }
            },
            {
              subheading: '2. O Conceito de Copiloto e Riscos de Alucinação',
              body: [
                'Ferramentas de IA devem ser tratadas como copilotos de trabalho que superam o bloqueio de tela em branco, e nunca como substitutos autônomos da análise humana.',
                'Os modelos podem apresentar "alucinações" — fenômeno em que o sistema inventa fatos ou dados falsos com tom altamente persuasivo.',
                'A revisão e validação humana de todo conteúdo gerado são etapas obrigatórias antes de qualquer envio corporativo.'
              ],
              highlightBox: {
                type: 'warning',
                title: 'Atenção às Alucinações',
                text: 'Nunca encaminhe ou assine um documento gerado por IA sem validação prévia; dados factuais e números devem ser sempre checados nas fontes oficiais.'
              }
            }
          ]
        }
      },
      {
        id: 'ia-pratica-mod-2',
        number: 2,
        title: 'MÓDULO 2: Automação e Produtividade',
        summary: 'Acelere a leitura de manuais e relatórios com resumos executivos e refine a comunicação escrita adaptando o tom de voz da mensagem.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Otimização de Leitura e Síntese',
              body: [
                'Utilizar a IA para resumir relatórios extensos, manuais normativos ou e-mails longos economiza horas de trabalho.',
                'Solicite extrações específicas, como tópicos de decisão, listas de tarefas ou tabelas comparativas a partir do texto original, acelerando a absorção de conhecimento e facilitando a rotina de estudos e trabalho.'
              ],
              highlightBox: {
                type: 'info',
                title: 'Leitura Acelerada com IA',
                text: 'Peça resumos focados em ações práticas: "Extraia apenas os 5 pontos principais e as tarefas pendentes com seus prazos deste documento."'
              }
            },
            {
              subheading: '2. Adequação de Tom de Voz em Comunicação Comercial',
              body: [
                'Modelos gerativos ajudam a aperfeiçoar comunicados e rascunhos difíceis.',
                'É possível solicitar ajustes finos no tom de voz de uma mensagem — tornando um e-mail mais formal, cordial, persuasivo ou sucinto — garantindo adequação perfeita à cultura da empresa e ao perfil do destinatário.'
              ],
              highlightBox: {
                type: 'info',
                title: 'Revisão Ortográfica e Coesão',
                text: 'Além do tom, a IA atua como revisor imediato, corrigindo vícios de linguagem, concordância e pontuação sem alterar o sentido do texto original.'
              }
            }
          ]
        }
      }
    ],
    caseStudies: [
      {
        id: 'caso-iapratica-1',
        title: 'Elaboração de Minuta e Validação Crítica de Dados',
        character: 'Beatriz, Estagiária de Comunicação Institucional',
        scenario: 'Beatriz precisava redigir um comunicado sobre a nova política de benefícios da empresa a partir de uma portaria técnica de 30 páginas.',
        criticalAnalysis: 'Beatriz forneceu o texto à IA pedindo um rascunho em linguagem amigável, revisou linha por linha as datas e regras citadas para evitar alucinações, e obteve a aprovação imediata do RH.',
        keyTakeaways: [
          'A IA acelera a síntese e vence o bloqueio inicial de redação.',
          'A validação humana criteriosa garante fidelidade e segurança corporativa.'
        ],
        badgeRelevance: 'Demonstra fluência no uso ético, seguro e produtivo de ferramentas de IA generativa.'
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'Para criar um bom "Prompt" (comando) é essencial:',
        options: [
          'Usar frases muito curtas sem contexto.',
          'Definir papel, contexto e formato de saída esperado.',
          'Digitar apenas uma palavra.',
          'Confiar no sistema cegamente.'
        ],
        correct: 1,
        explanation: 'Quanto mais detalhadas forem as diretrizes passadas à IA no prompt, mais refinado e aderente à sua necessidade será o resultado do texto.'
      },
      {
        id: 2,
        question: 'Qual o cuidado máximo ao utilizar modelos de IA?',
        options: [
          'Sempre revisar, pois a IA pode criar informações incorretas (alucinações).',
          'Assinar como autor exclusivo sem checar.',
          'Enviar direto para o chefe sem ler.',
          'Passar senhas de banco.'
        ],
        correct: 0,
        explanation: 'Os modelos de linguagem geram palavras baseados em probabilidades estatísticas e podem inventar dados falsos, exigindo validação humana.'
      },
      {
        id: 3,
        question: 'Ao ler um manual de 80 páginas, a IA ajuda a:',
        options: [
          'Colorir as páginas.',
          'Traduzir para linguagens mortas.',
          'Sintetizar tópicos e extrair os pontos principais velozmente.',
          'Deletar páginas difíceis.'
        ],
        correct: 2,
        explanation: 'As IAs são excelentes aceleradoras de leitura ao condensar longos arquivos de texto em tópicos acionáveis imediatos.'
      },
      {
        id: 4,
        question: 'Usar a IA como "Copiloto" significa:',
        options: [
          'Deixar o trabalho autônomo sem supervisão.',
          'Usá-la para vencer o bloqueio da página em branco em e-mails e ofícios.',
          'Substituir todos os funcionários humanos.',
          'Travar o sistema corporativo.'
        ],
        correct: 1,
        explanation: 'O conceito de copiloto enfatiza que o sistema gera o rascunho inicial enquanto o profissional ajusta a versão final refinada.'
      },
      {
        id: 5,
        question: 'Ajustar o "Tom de Voz" no prompt garante que:',
        options: [
          'O texto saia com linguajar adequado para o ambiente corporativo formal.',
          'A máquina fale em voz alta pelo microfone alto.',
          'A formatação vire negrito automaticamente.',
          'O e-mail fique ilegível propositalmente.'
        ],
        correct: 0,
        explanation: 'Parametrizar a formalidade garante que o texto final esteja alinhado às exigências de polidez da cultura da empresa.'
      },
      {
        id: 6,
        question: 'Como a IA pode atuar como um revisor ortográfico e sintático?',
        options: [
          'Ela altera os dados numéricos financeiros do seu balanço anual.',
          'Ela corrige pontuação, concordância e sugere melhorias de coesão no texto bruto.',
          'Ela apenas traduz idiomas.',
          'Ela exclui anexos dos e-mails enviados.'
        ],
        correct: 1,
        explanation: 'A IA identifica deslizes gramaticais e reestrutura frases truncadas, elevando a clareza do comunicado enviado aos clientes.'
      },
      {
        id: 7,
        question: '"Alucinação" da Inteligência Artificial é:',
        options: [
          'Quando o monitor da tela começa a piscar luzes neon coloridas.',
          'O fenômeno onde o modelo inventa com extrema convicção um dado ou fato irreal que não existe.',
          'Apenas um erro gramatical simples na conjugação verbal.',
          'O aumento da conta de luz na fatura do data center.'
        ],
        correct: 1,
        explanation: 'Alucinação é a geração persuasiva de respostas falsas pelo modelo de linguagem, reforçando a importância do olhar crítico do usuário.'
      }
    ]
  },
  // =========================================================================
  // CURSO 4: HARD SKILLS (EXCEL E FERRAMENTAS DIGITAIS)
  // =========================================================================
  {
    id: 'curso-hard-skills-excel-ferramentas-digitais',
    trackId: 'trilha-3',
    trackName: 'TRILHA 3: Tecnologia, Informática & Produtividade com IA',
    category: 'Tecnologia da Informação',
    targetAudienceType: ['JOVEM_APRENDIZ', 'ESTUDANTE', 'PRIMEIRO_EMPREGO', 'ESTAGIARIO'],
    title: 'Hard Skills (Excel e Ferramentas Digitais)',
    subtitle: 'Operações e fórmulas essenciais de planilhas (SOMA, MÉDIA, PROCV), formatação condicional, ecossistema nuvem e agilidade com atalhos de teclado.',
    hours: 12,
    equivalentHours: 12,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Jovens aprendizes, estagiários e colaboradores que buscam dominar planilhas eletrônicas e ferramentas digitais em nuvem no dia a dia corporativo.',
    prerequisites: 'Nenhum pré-requisito.',
    badgeName: 'Mestre em Ferramentas Digitais',
    badgeCategory: 'Ferramentas de Escritório',
    badgeIcon: 'Laptop',
    accentColor: '#3B82F6',
    level: 'Intermediário',
    learningObjectives: [
      'Dominar o uso prático de funções essenciais em planilhas eletrônicas como SOMA, MÉDIA e PROCV para automação de cálculos e cruzamento de dados.',
      'Construir painéis visuais eficientes com formatação condicional para destacar metas e indicadores de alerta.',
      'Operar plataformas colaborativas em nuvem (Google Workspace e Microsoft 365) com rigor na gestão de permissões de acesso.',
      'Elevar a agilidade e produtividade diária no computador utilizando atalhos essenciais de teclado.'
    ],
    modules: [
      {
        id: 'hard-skills-mod-1',
        number: 1,
        title: 'MÓDULO 1: O Domínio das Planilhas',
        summary: 'Aprenda operações com fórmulas essenciais (SOMA, MÉDIA e PROCV) e visualização de dados com formatação condicional.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Operações e Fórmulas Essenciais',
              body: [
                'O Microsoft Excel e o Google Planilhas são indispensáveis na rotina corporativa.',
                'O uso de funções como SOMA() e MÉDIA() automatiza cálculos repetitivos de conjuntos de dados.',
                'Já a função PROCV() permite realizar buscas verticais em tabelas extensas utilizando um valor de referência, agilizando o cruzamento de informações financeiras, cadastrais ou de estoque em segundos.'
              ],
              highlightBox: {
                type: 'calc',
                title: 'Funções Mais Usadas no Escritório',
                text: '=SOMA(A1:A50) totaliza valores; =MÉDIA(B1:B20) calcula o valor médio; =PROCV(chave, tabela, coluna, FALSO) busca informações relacionadas com exatidão.'
              }
            },
            {
              subheading: '2. Formatação Condicional e Visualização',
              body: [
                'A Formatação Condicional altera automaticamente o visual de uma célula (como cor de fundo ou do texto) com base em regras pré-definidas.',
                'É amplamente utilizada por gestores para criar painéis e dashboards visuais, destacando instantaneamente metas atingidas (em verde) ou valores em alerta (em vermelho), facilitando a tomada de decisão ágil.'
              ],
              highlightBox: {
                type: 'info',
                title: 'Dashboards e Indicadores Visuais',
                text: 'A formatação condicional permite identificar rapidamente tendências, desvios ou gargalos sem precisar ler linha por linha da planilha.'
              }
            }
          ]
        }
      },
      {
        id: 'hard-skills-mod-2',
        number: 2,
        title: 'MÓDULO 2: O Ecossistema Nuvem',
        summary: 'Colaboração em tempo real, segurança de permissões de arquivos compartilhados e ganho de velocidade com atalhos de teclado.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Trabalho Colaborativo em Nuvem',
              body: [
                'Plataformas como Google Workspace e Microsoft 365 transformaram o trabalho em equipe.',
                'Documentos salvos na nuvem permitem edição simultânea por múltiplos usuários, histórico de versões para recuperação de conteúdos e controle rígido de permissões de acesso (visualização, comentário ou edição), garantindo segurança e fluidez aos projetos.'
              ],
              highlightBox: {
                type: 'info',
                title: 'Segurança no Compartilhamento',
                text: 'Ao compartilhar documentos corporativos na nuvem, defina com rigor os níveis de acesso (leitor, comentarista ou editor) para resguardar a integridade dos dados.'
              }
            },
            {
              subheading: '2. Agilidade com Atalhos de Teclado',
              body: [
                'Dominar atalhos essenciais do sistema operacional e de programas do escritório (como Ctrl+C, Ctrl+V, Ctrl+Z, Ctrl+F e combinações de navegação) reduz drasticamente a dependência do mouse.',
                'A fluência no uso do teclado economiza tempo precioso ao longo das tarefas operacionais do dia a dia.'
              ],
              highlightBox: {
                type: 'info',
                title: 'Ganho de Tempo Real',
                text: 'Combinar atalhos de teclado para navegação, cópia e busca transforma a produtividade do usuário nas rotinas de escritório.'
              }
            }
          ]
        }
      }
    ],
    caseStudies: [
      {
        id: 'caso-hardskills-1',
        title: 'Automatização e Cruzamento de Dados no Suporte Operacional',
        character: 'Lucas, Aprendiz de Controladoria',
        scenario: 'Lucas precisava verificar manualmente centenas de pedidos contra uma tabela de clientes para validar se os descontos concedidos estavam corretos.',
        criticalAnalysis: 'Em vez de buscar um por um, Lucas aplicou a fórmula PROCV() para puxar os limites autorizados e configurou Formatação Condicional para destacar em vermelho os valores divergentes.',
        keyTakeaways: [
          'O PROCV automatiza o cruzamento de bases distintas sem margem para erro humano.',
          'Destaques visuais agilizam a conferência dos gestores na tomada de decisão.'
        ],
        badgeRelevance: 'Comprova competência técnica prática em ferramentas de escritório e automação de planilhas.'
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'Vantagem do PROCV no Excel:',
        options: [
          'Mudar cores das células.',
          'Somar todas colunas.',
          'Buscar uma informação numa lista usando uma referência.',
          'Criar gráficos 3D.'
        ],
        correct: 2,
        explanation: 'O PROCV busca verticalmente um valor numa coluna de uma tabela e retorna dados de uma coluna correspondente na mesma linha.'
      },
      {
        id: 2,
        question: 'O trabalho em nuvem é caracterizado por:',
        options: [
          'Salvar em pen-drives.',
          'Impedir edição múltipla.',
          'Facilitar edição simultânea e backup automático.',
          'Apenas fotos institucionais.'
        ],
        correct: 2,
        explanation: 'A tecnologia em nuvem permite colaboração em tempo real e garante salvamento contínuo das alterações na rede.'
      },
      {
        id: 3,
        question: 'A formatação condicional ajuda o gestor a:',
        options: [
          'Enxergar indicadores positivos/alerta visualmente e rápido.',
          'Apagar resultados ruins.',
          'Exportar para e-mail.',
          'Trancar a planilha.'
        ],
        correct: 0,
        explanation: 'Formatar condicionalmente altera a cor de fundo das células conforme regras estipuladas, agilizando a leitura analítica dos gestores.'
      },
      {
        id: 4,
        question: 'Ao compartilhar um link de documento em nuvem, deve-se:',
        options: [
          'Dar acesso total a todos.',
          'Ajustar rigorosamente as permissões (leitura ou edição).',
          'Postar abertamente.',
          'Imprimir fisicamente.'
        ],
        correct: 1,
        explanation: 'O gerenciamento de acessos garante a segurança das informações evitando que pessoas não autorizadas alterem arquivos vitais.'
      },
      {
        id: 5,
        question: 'Para que serve a função SOMA() no Excel?',
        options: [
          'Calcular o total acumulado de um intervalo numérico.',
          'Pintar células.',
          'Pesquisar textos.',
          'Apagar o arquivo.'
        ],
        correct: 0,
        explanation: 'A função SOMA() automatiza a adição de extensas colunas e linhas de valores financeiros sem a necessidade de somar manualmente.'
      },
      {
        id: 6,
        question: 'A função MÉDIA() é útil para:',
        options: [
          'Descobrir o valor central/médio de um lote de dados (ex: satisfação).',
          'Transformar números em letras.',
          'Centralizar o texto na célula.',
          'Formatar a data.'
        ],
        correct: 0,
        explanation: 'A função MÉDIA() calcula a média aritmética do intervalo selecionado, facilitando a análise de indicadores gerenciais.'
      },
      {
        id: 7,
        question: 'O uso de atalhos de teclado (ex: Ctrl+C, Ctrl+V) resulta em:',
        options: [
          'Ganho expressivo de tempo operando o computador em tarefas diárias.',
          'Quebra do sistema operacional.',
          'Lentidão da nuvem.',
          'Maior incidência de vírus.'
        ],
        correct: 0,
        explanation: 'Dominar atalhos reduz a dependência exclusiva do mouse e eleva exponencialmente a velocidade nas tarefas de digitação e edição.'
      }
    ]
  },
  // =========================================================================
  // CURSO 3: SOFT SKILLS E COMUNICAÇÃO INTERPESSOAL
  // =========================================================================
  {
    id: 'curso-soft-skills-comunicacao-interpessoal',
    published: true,
    isPublished: true,
    active: true,
    visible: true,
    videoUrl: 'https://youtu.be/SFC9uLZSevs?si=8uoTJHebCyg4PF9z',
    youtubeId: 'SFC9uLZSevs',
    trackId: 'trilha-2',
    trackName: 'TRILHA 2: Soft Skills, Postura & Comunicação Corporativa',
    category: 'Desenvolvimento Pessoal',
    targetAudienceType: 'TODOS',
    title: 'Soft Skills e Comunicação Interpessoal',
    subtitle: 'Habilidades comportamentais, escuta ativa, empatia, comunicação não-violenta (CNV) e inteligência relacional corporativa.',
    hours: 12,
    equivalentHours: 12,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Jovens aprendizes, estagiários e colaboradores que buscam aprimorar suas relações interpessoais e inteligência emocional.',
    prerequisites: 'Nenhum pré-requisito.',
    badgeName: 'Especialista em Soft Skills',
    badgeCategory: 'Atitude Profissional',
    badgeIcon: 'Sparkles',
    accentColor: '#EC4899',
    level: 'Iniciante',
    learningObjectives: [
      'Diferenciar Hard Skills de Soft Skills, reconhecendo a importância das competências comportamentais na contratação e crescimento profissional.',
      'Desenvolver escuta ativa e empatia genuína nas interações corporativas cotidianas.',
      'Aplicar os quatro pilares da Comunicação Não-Violenta (CNV): observação, sentimentos, necessidades e pedidos claros.',
      'Superar silos organizacionais atuando com inteligência relacional e colaboração interdepartamental.'
    ],
    modules: [
      {
        id: 'soft-skills-mod-1',
        number: 1,
        title: 'MÓDULO 1: Habilidades Comportamentais',
        summary: 'Compreenda a relevância das Soft Skills frente às Hard Skills e aprenda a praticar escuta ativa com empatia profunda.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Hard Skills vs. Soft Skills',
              body: [
                'Enquanto as Hard Skills representam as habilidades técnicas mensuráveis (como dominar um software ou falar um idioma), as Soft Skills envolvem competências comportamentais e inteligência emocional.',
                'No mercado atual, contrata-se pelo conhecimento técnico, mas promove-se ou desliga-se pelo comportamento.',
                'Cultivar empatia, adaptabilidade e atitude colaborativa é essencial para o crescimento contínuo.'
              ],
              highlightBox: {
                type: 'info',
                title: 'O Fator Comportamental',
                text: 'O conhecimento técnico abre portas, mas são as habilidades comportamentais e relacionais que sustentam uma carreira sólida e inspiram confiança.'
              }
            },
            {
              subheading: '2. Escuta Ativa e Empatia',
              body: [
                'A escuta ativa vai além de ouvir o áudio das palavras; consiste em focar 100% no interlocutor sem distrações (como olhar o celular), compreendendo suas necessidades subjacentes e demonstrando empatia.',
                'Empatizar significa colocar-se genuinamente no lugar do outro para entender suas motivações e desafios, permitindo construir relações de confiança no ambiente de trabalho.'
              ],
              highlightBox: {
                type: 'warning',
                title: 'Presença Total',
                text: 'Evite distrações e interrupções durante o diálogo; escutar com atenção genuína valida o interlocutor e evita mal-entendidos.'
              }
            }
          ]
        }
      },
      {
        id: 'soft-skills-mod-2',
        number: 2,
        title: 'MÓDULO 2: Inteligência Relacional',
        summary: 'Metodologia da Comunicação Não-Violenta (CNV), resolução pacífica de conflitos e superação de silos organizacionais.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Comunicação Não-Violenta (CNV)',
              body: [
                'A CNV é uma abordagem estruturada para resolver conflitos e expressar opiniões sem gerar defensiva.',
                'Ela baseia-se em quatro pilares: Observar os fatos sem julgamentos, identificar os Sentimentos envolvidos, reconhecer as Necessidades não atendidas e formular Pedidos claros e concretos.',
                'Isso transforma discussões destrutivas em conversas construtivas.'
              ],
              highlightBox: {
                type: 'info',
                title: 'Os 4 Pilares da CNV',
                text: 'Fatos sem julgamento + Identificação de sentimentos + Reconhecimento de necessidades + Pedidos claros e objetivos.'
              }
            },
            {
              subheading: '2. Quebra de Silos Organizacionais',
              body: [
                '"Silos" ocorrem quando equipes ou departamentos trabalham de forma isolada, gerando falhas de comunicação e competição interna.',
                'O profissional com inteligência relacional atua como ponte, promovendo a integração entre setores, compartilhando informações relevantes proativamente e alinhando objetivos para o sucesso geral da empresa.'
              ],
              highlightBox: {
                type: 'info',
                title: 'Pontes vs. Silos',
                text: 'Compartilhe informações relevantes proativamente entre departamentos para eliminar retrabalho e alinhar a empresa rumo aos mesmos objetivos.'
              }
            }
          ]
        }
      }
    ],
    caseStudies: [
      {
        id: 'caso-softskills-1',
        title: 'Comunicação Assertiva e Quebra de Silos no Fechamento de Projetos',
        character: 'Mariana, Aprendiz de Suporte Corporativo',
        scenario: 'Dois departamentos estavam atrasando a entrega de um relatório por falta de alinhamento e acusações mútuas.',
        criticalAnalysis: 'Mariana aplicou a CNV e a escuta ativa para mapear os fatos objetivos e as necessidades de cada time, criando um canal de diálogo respeitoso.',
        keyTakeaways: [
          'Separar fatos de julgamentos pessoais diminui a defensiva.',
          'Construir pontes entre setores economiza tempo e resguarda a qualidade do trabalho.'
        ],
        badgeRelevance: 'Demonstra maestria em inteligência relacional e mediação empática no ambiente corporativo.'
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'A definição de "Soft Skills" é:',
        options: [
          'Certificações em softwares.',
          'Habilidades comportamentais e socioemocionais.',
          'Tom autoritário.',
          'Domínio do pacote Office.'
        ],
        correct: 1,
        explanation: 'Enquanto as Hard Skills representam diplomas e conhecimentos técnicos, as Soft Skills representam atributos interpessoais e socioemocionais.'
      },
      {
        id: 2,
        question: '"Escuta Ativa" exige:',
        options: [
          'Olhar o celular.',
          'Atenção focada para compreender o outro.',
          'Concordar sempre.',
          'Interromper.'
        ],
        correct: 1,
        explanation: 'Escutar ativamente envolve dar presença total ao interlocutor para captar a mensagem real sem julgamentos apressados.'
      },
      {
        id: 3,
        question: 'Na CNV, deve-se focar em:',
        options: [
          'Julgamentos de valor.',
          'Fatos, sentimentos, necessidades e pedidos claros.',
          'Omitir a verdade.',
          'Ameaçar o colega.'
        ],
        correct: 1,
        explanation: 'A Comunicação Não-Violenta (CNV) é fundamentada nesses quatro pilares estruturados para resolver desentendimentos sem acusações.'
      },
      {
        id: 4,
        question: 'O fenômeno dos "Silos Organizacionais":',
        options: [
          'Aumenta a produção.',
          'Desintegra a colaboração e gera falhas de comunicação.',
          'Facilita o controle de horas.',
          'Auxilia na segurança.'
        ],
        correct: 1,
        explanation: 'Silos organizacionais isolam departamentos, impedindo o fluxo livre de dados e gerando retrabalho entre equipes.'
      },
      {
        id: 5,
        question: 'O que é "Inteligência Relacional"?',
        options: [
          'Trabalhar bem com perfis diversos construindo redes saudáveis.',
          'Trabalhar isolado.',
          'Decorar nomes de sistemas.',
          'Criar intrigas.'
        ],
        correct: 0,
        explanation: 'Inteligência relacional é a capacidade de transitar entre diferentes personalidades mantendo respeito e produtividade.'
      },
      {
        id: 6,
        question: 'Como a empatia contribui no departamento?',
        options: [
          'Promove suporte mútuo e fortalece a confiança da equipe.',
          'Aumenta a rivalidade.',
          'Isenta faltas.',
          'Elimina relatórios.'
        ],
        correct: 0,
        explanation: 'Colocar-se no lugar do outro constrói um ambiente de cooperação onde os colaboradores se ajudam nas demandas complexas.'
      },
      {
        id: 7,
        question: 'A "assertividade" na comunicação é a habilidade de:',
        options: [
          'Expressar necessidades de forma clara, direta e respeitosa.',
          'Gritar no escritório.',
          'Aceitar tudo passivamente.',
          'Usar vocabulário prolixo.'
        ],
        correct: 0,
        explanation: 'A assertividade é o equilíbrio perfeito entre a passividade e a agressividade ao defender um ponto de vista com polidez.'
      }
    ]
  },
  // =========================================================================
  // 1. JORNADA DO JOVEM APRENDIZ & ESTAGIÁRIO (MÓDULO AVANÇADO)
  // =========================================================================
  {
    id: 'curso-jovem-aprendiz-avancado',
    trackId: 'trilha-1',
    trackName: 'TRILHA 1: Entrada no Mercado & Primeiro Emprego',
    category: 'Legislação e Cidadania',
    targetAudienceType: ['JOVEM_APRENDIZ', 'ESTUDANTE', 'PRIMEIRO_EMPREGO'],
    title: 'Jornada do Jovem Aprendiz & Estagiário (Módulo Avançado)',
    subtitle: 'Direitos, Legislação Trabalhista, Matriz Comparativa, Análise de Holerite e Prevenção de Fraudes',
    hours: 12,
    equivalentHours: 12,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Jovens de 14 a 24 anos em busca da primeira oportunidade de trabalho',
    prerequisites: 'Nenhum pré-requisito.',
    badgeName: 'Direitos & Legislação',
    badgeCategory: 'Trabalho',
    badgeIcon: 'Scale',
    accentColor: '#8B5CF6',
    level: 'Avançado',
    learningObjectives: [
      'Compreender as bases legais da Lei da Aprendizagem (Lei nº 10.097/2000) e da Lei do Estágio (Lei nº 11.788/2008).',
      'Diferenciar com clareza contratos de trabalho formais (CLT), programa de aprendizagem e estágio remunerado.',
      'Analisar holerites e demonstrativos de pagamento, entendendo descontos legais (VT, INSS) e benefícios (FGTS 2%, VR).',
      'Reconhecer deveres acadêmicos e profissionais para a manutenção segura do contrato de trabalho.',
      'Proteger-se contra fraudes, golpes de falsas vagas de emprego e cobranças indevidas de taxas ou cursos.'
    ],
    modules: [
      {
        id: 'mod-1',
        number: 1,
        title: 'MÓDULO 1: Fundamentos da Lei do Aprendiz (Lei nº 10.097/2000)',
        summary: 'Origem da política pública, o papel das entidades formadoras, regras de jornada de trabalho e direitos fundamentais.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1.1 O que é o Programa de Aprendizagem?',
              body: [
                'A Lei do Aprendiz foi formulada como uma política pública de inclusão social e formação profissional voltada para jovens entre 14 e 24 anos incompletos (sem limite de idade para pessoas com deficiência).',
                'A premissa central é a formação técnico-profissional metódica: a empresa contratante atua em parceria com uma Entidade Formadora (Sistema S - SENAI/SENAC/SENAT, CIEE, etc.) para oferecer conhecimento teórico alinhado à prática supervisionada na empresa.'
              ],
              visualType: 'triangle',
              asciiDiagram: `┌─────────────────────────────────────────────────────────┐
│              TRIÂNGULO DA APRENDIZAGEM                  │
│                                                         │
│                   [ ESTUDANTE ]                         │
│                    /         \\                          │
│                   /           \\                         │
│                  /             \\                        │
│     [ EMPRESA CONTRATANTE ] <---> [ ENTIDADE FORMADORA ]│
└─────────────────────────────────────────────────────────┘`,
              highlightBox: {
                type: 'law',
                title: 'Marco Legal Art. 428 CLT',
                text: 'Contrato de aprendizagem é o contrato de trabalho especial, ajustado por escrito e por prazo determinado, em que o empregador se compromete a assegurar ao maior de 14 e menor de 24 anos formação técnico-profissional metódica.'
              }
            },
            {
              subheading: '1.2 Regras de Carga Horária e Jornada',
              body: [
                'Estudantes do Ensino Fundamental e Médio: A jornada máxima é de 6 horas diárias (30 horas semanais). É expressamente proibida a realização de horas extras ou regime de compensação de jornada.',
                'Jovens que Concluíram o Ensino Médio: A jornada pode chegar a 8 horas diárias (40 horas semanais), desde que computadas as horas de formação teórica da entidade formadora.',
                'Proibição de Trabalho Noturno: Para menores de 18 anos, é vedado por lei constitucional o trabalho entre 22h e 5h, assim como atividades em locais perigosos, insalubres ou penosos.'
              ],
              visualType: 'work-hours',
              highlightBox: {
                type: 'warning',
                title: 'Atenção aos Limites de Horário',
                text: 'Nunca aceite propostas de Jovem Aprendiz com jornadas acima de 6h se você ainda estiver no Ensino Fundamental ou Médio. A prioridade legal absoluta é o seu rendimento escolar.'
              }
            },
            {
              subheading: '1.3 Direitos Trabalhistas Garantidos',
              body: [
                'Registro em CTPS (Carteira de Trabalho Digital): Contrato especial de trabalho por tempo determinado com validade máxima de até 2 anos.',
                'Remuneração Mínima Garantida: Salário Mínimo Hora nacional ou piso regional/estadual estabelecido por convenção coletiva.',
                'FGTS com Alíquota Especial: Alíquota reduzida de 2% (diferente dos 8% de contratos CLT regulares). Valor recolhido diretamente pela empresa.',
                'Férias Coincidentes: 30 dias de recesso obrigatoriamente coincidentes com o período de férias escolares para estudantes menores de 18 anos.',
                '13º Salário e Vale-Transporte: Garantidos integralmente nos termos da legislação federal trabalhista.'
              ]
            }
          ]
        }
      },
      {
        id: 'mod-2',
        number: 2,
        title: 'MÓDULO 2: Lei do Estágio (Lei nº 11.788/2008)',
        summary: 'Termo de Compromisso de Estágio (TCE), interveniência da instituição de ensino, bolsa-auxílio e recesso remunerado.',
        estimatedMinutes: 40,
        content: {
          sections: [
            {
              subheading: '2.1 Definição e Natureza do Estágio',
              body: [
                'O estágio é ato educativo escolar supervisionado, desenvolvido no ambiente de trabalho, que visa à preparação para o trabalho produtivo de educandos que estejam frequentando o ensino regular.',
                'Não Cria Vínculo Empregatício: O estagiário não é empregado CLT e não tem desconto de INSS automático nem recolhimento de FGTS, mas possui direito a Bolsa-Auxílio e Auxílio-Transporte em estágios não obrigatórios.'
              ],
              highlightBox: {
                type: 'law',
                title: 'Termo de Compromisso de Estágio (TCE)',
                text: 'O estágio só é válido quando formalizado por um Termo de Compromisso assinado por três partes: Aluno (ou responsável se menor), Empresa Concedente e Instituição de Ensino.'
              }
            },
            {
              subheading: '2.2 Carga Horária e Redução em Período de Provas',
              body: [
                'Carga Horária Máxima: 4 horas diárias (20h semanais) para educação especial e fundamental, ou 6 horas diárias (30h semanais) para ensino médio, técnico e superior.',
                'Garantia Legal em Semanas de Prova: Se a instituição de ensino adotar verificações periódicas de aprendizagem, a carga horária do estágio será reduzida pelo menos à metade para garantir o estudo do aluno (Art. 10, § 2º da Lei 11.788/08).'
              ]
            }
          ]
        }
      },
      {
        id: 'mod-3',
        number: 3,
        title: 'MÓDULO 3: Análise Prática de Holerite e Prevenção de Golpes',
        summary: 'Cálculo de proventos, descontos legais (VT até 6%, INSS) e identificação de anúncios abusivos de falsas vagas.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '3.1 Como Interpretar seu Contracheque',
              body: [
                'Salário Bruto: O valor acordado no contrato antes de qualquer desconto.',
                'Desconto de Vale-Transporte: A lei autoriza o desconto de até 6% do salário-base, ou o valor real das passagens caso seja menor.',
                'Desconto de INSS: Aprendizes contribuem para a Previdência Social conforme a tabela progressiva (alíquota inicial de 7,5%), garantindo tempo de aposentadoria e auxílio-doença.'
              ],
              highlightBox: {
                type: 'calc',
                title: 'Exemplo de Cálculo de Salário Líquido',
                text: 'Salário Bruto: R$ 1.100,00 | (-) Desconto INSS 7,5%: R$ 82,50 | (-) Desconto VT 6%: R$ 66,00 | (=) Salário Líquido na Conta: R$ 951,50 | (+) FGTS 2% depositado pela empresa: R$ 22,00'
              }
            },
            {
              subheading: '3.2 Escudo Anti-Golpes: Como Detectar Vagas Falsas',
              body: [
                'Cobrança de Taxa: Nenhuma empresa idônea ou programa de aprendizagem cobra valor de matrícula, taxa de processo seletivo ou apostila.',
                'Promessa de Vaga Garantida Condicionada a Curso: Desconfie de mensagens que afirmam que você foi selecionado para uma vaga, mas que deve comprar um curso na recepção para começar.',
                'Exigência de Dados Bancários ou Senhas: Nunca forneça fotos de cartões bancários, senhas ou códigos de SMS para recrutadores.'
              ],
              visualType: 'scam-shield',
              highlightBox: {
                type: 'warning',
                title: 'Regra de Ouro SkillHub',
                text: 'O SkillHub valida previamente o CNPJ de todas as empresas cadastradas e monitora termos abusivos para que você se candidate com 100% de segurança.'
              }
            }
          ]
        }
      }
    ],
    caseStudies: [
      {
        id: 'caso-1',
        title: 'Horas Extras em Época de Fechamento de Mês',
        character: 'Gabriel, 16 anos, Jovem Aprendiz Administrativo',
        scenario: 'O supervisor de Gabriel pede que ele fique até as 19h (duas horas a mais do seu horário de 6h) durante 3 dias para ajudar no fechamento de inventário de uma fábrica no CIC.',
        criticalAnalysis: 'A Lei nº 10.097/2000 veda terminantemente a realização de horas extras para jovens aprendizes. A carga diária de 6h não pode ser ultrapassada em hipótese alguma.',
        keyTakeaways: [
          'Jovem Aprendiz não pode fazer hora extra nem banco de horas.',
          'O supervisor comete infração trabalhista e a empresa pode ser multada pelo Ministério do Trabalho.',
          'Gabriel deve recusar educadamente explicando a restrição contratual e informar o tutor da entidade formadora.'
        ],
        badgeRelevance: 'Comprova conhecimento da jornada legal e segurança no ambiente profissional.',
        interactiveOptions: {
          question: 'O que Gabriel deve fazer nessa situação?',
          choices: [
            { text: 'Aceitar e receber as horas extras no holerite.', correct: false, feedback: 'Incorreto. A lei proíbe horas extras para aprendizes, mesmo que sejam pagas.' },
            { text: 'Explicar cordialmente que seu contrato de aprendiz proíbe horas extras e que seu horário regular é de 6h diárias.', correct: true, feedback: 'Correto! A recusa informada e educada protege tanto o jovem quanto a empresa.' },
            { text: 'Faltar no trabalho no dia seguinte sem avisar.', correct: false, feedback: 'Incorreto. Faltas injustificadas geram advertência e desconto salarial.' }
          ]
        }
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'Qual a jornada máxima permitida para o Jovem Aprendiz que ainda cursa o Ensino Fundamental ou Médio?',
        options: [
          '4 horas diárias.',
          '6 horas diárias (30 horas semanais), sem possibilidade de horas extras.',
          '8 horas diárias mais 2 horas extras.',
          'Não há limite legal se a empresa pagar adicional.'
        ],
        correct: 1,
        explanation: 'Para estudantes que não concluíram o ensino médio, o teto legal estrito é de 6 horas diárias, preservando o rendimento escolar.'
      },
      {
        id: 2,
        question: 'Qual a alíquota de FGTS recolhida pela empresa para contratos de Jovem Aprendiz (Lei 10.097)?',
        options: [
          '8% do salário bruto.',
          'Isento (0%).',
          '2% do salário bruto recolhido integralmente pelo empregador.',
          '5% descontado do jovem.'
        ],
        correct: 2,
        explanation: 'A alíquota de FGTS da Lei do Aprendiz é especial e reduzida para 2%, custeada pela empresa.'
      },
      {
        id: 3,
        question: 'Durante a semana de provas da faculdade ou colégio, o que a Lei do Estágio (Lei 11.788/08) garante ao estagiário?',
        options: [
          'Folga remunerada a semana inteira.',
          'Redução da carga horária de estágio pelo menos à metade para viabilizar os estudos.',
          'Aumento da bolsa para compra de livros.',
          'Nenhum direito específico.'
        ],
        correct: 1,
        explanation: 'O Art. 10 § 2º da Lei 11.788 assegura redução de no mínimo 50% da jornada em períodos avaliativos oficiais.'
      },
      {
        id: 4,
        question: 'Se uma empresa cobrar R$ 100,00 de "taxa de cadastro ou material didático" para uma entrevista de Jovem Aprendiz, qual é a conduta correta?',
        options: [
          'Pagar imediatamente para garantir a vaga.',
          'Denunciar a prática abusiva, pois é proibida a cobrança de qualquer taxa do candidato.',
          'Pedir desconto no valor.',
          'Assinar promissória.'
        ],
        correct: 1,
        explanation: 'Cobrança de taxas de seleção ou condicionamento a cursos pagos é fraude trabalhista proibida por lei.'
      }
    ]
  },

  // =========================================================================
  // 2. ELABORAÇÃO DE CURRÍCULO CAMPEÃO E CADASTRO EM PLATAFORMAS
  // =========================================================================
  {
    id: 'curso-curriculo-plataformas',
    trackId: 'trilha-1',
    trackName: 'TRILHA 1: Entrada no Mercado & Primeiro Emprego',
    category: 'Desenvolvimento Pessoal',
    targetAudienceType: ['PRIMEIRO_EMPREGO', 'JOVEM_APRENDIZ', 'ESTUDANTE'],
    title: 'Elaboração de Currículo Campeão e Cadastro em Plataformas',
    subtitle: 'Estruturação sem experiência prévia, LGPD de dados pessoais, palavras-chave e LinkedIn para jovens',
    hours: 10,
    equivalentHours: 10,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Estudantes e jovens criando seu primeiro currículo profissional',
    prerequisites: 'Nenhum.',
    badgeName: 'Currículo Campeão',
    badgeCategory: 'Trabalho',
    badgeIcon: 'FileText',
    accentColor: '#3B82F6',
    level: 'Iniciante',
    learningObjectives: [
      'Montar um currículo objetivo e profissional mesmo sem experiência de carteira assinada.',
      'Valorizar formação escolar, cursos livres, projetos de ciências, voluntariado e Badges digitais.',
      'Compreender a proteção de dados pessoais (LGPD) no envio de currículos digitais.',
      'Cadastrar-se com eficácia em plataformas de vagas em Curitiba e Região Metropolitana.'
    ],
    modules: [
      {
        id: 'cur-mod-1',
        number: 1,
        title: 'MÓDULO 1: Estrutura do Currículo de Alto Impacto sem Experiência',
        summary: 'Cabeçalho limpo, objetivo direto, formação escolar, cursos complementares e projetos de destaque.',
        estimatedMinutes: 40,
        content: {
          sections: [
            {
              subheading: '1.1 A Estrutura Perfeita em 5 Blocos',
              body: [
                'Bloco 1: Cabeçalho com Nome Completo, Bairro/Cidade (ex: Boqueirão, Curitiba/PR), Telefone WhatsApp e E-mail profissional limpo (ex: nome.sobrenome@email.com).',
                'Bloco 2: Objetivo Profissional Claro (ex: "Jovem Aprendiz Administrativo" ou "Estágio em Suporte Técnico / TI"). Nunca use "A disposição da empresa".',
                'Bloco 3: Formação Acadêmica: Escola/Colégio, Série ou Ano, Curso e Turno das aulas (Manhã, Tarde ou Noite).',
                'Bloco 4: Cursos Complementares & Badges: Cursos do SkillHub com carga horária, temas e códigos verificadores.',
                'Bloco 5: Informações Adicionais: Voluntariado, olimpíadas escolares, participação em grêmio estudantil ou feiras tecnológicas.'
              ],
              highlightBox: {
                type: 'info',
                title: 'Exemplo de Objetivo Direto',
                text: 'Recomendado: "Busco oportunidade como Jovem Aprendiz na área de Logística e Suprimentos para aplicar conhecimentos em controle de estoque e rotinas operacionais."'
              }
            },
            {
              subheading: '1.2 O que NUNCA colocar no currículo (LGPD & Segurança)',
              body: [
                'Número de CPF, RG ou Título de Eleitor: Devem ser informados somente no momento da admissão formal após ser aprovado.',
                'Endereço com número de porta ou CEP residencial: Exponha apenas o Bairro e a Cidade para evitar exposição desnecessária.',
                'Foto 3x4: Só inclua se a vaga solicitar expressamente (para funções artísticas ou recepção).',
                'Pretensão salarial ou dados bancários: Totalmente inadequado na fase inicial de triagem.'
              ],
              highlightBox: {
                type: 'warning',
                title: 'Segurança da Informação',
                text: 'Seu currículo circula por diversas caixas de e-mail. Proteger seus documentos evita fraudes e vazamento de identidade.'
              }
            }
          ]
        }
      },
      {
        id: 'cur-mod-2',
        number: 2,
        title: 'MÓDULO 2: Palavras-Chave e Robôs de Triagem (ATS)',
        summary: 'Como os sistemas de RH filtram currículos automaticamente e como otimizar seu texto para ser chamado.',
        estimatedMinutes: 35,
        content: {
          sections: [
            {
              subheading: '2.1 Entendendo os Robôs de Seleção (ATS)',
              body: [
                'Grandes empresas de Curitiba usam softwares de recrutamento que buscam palavras-chave específicas no currículo.',
                'Se a vaga pede "Excel", "Atendimento telefônico" ou "Rotinas de Arquivo", essas palavras devem constar textualmente na sua lista de competências e cursos.'
              ]
            }
          ]
        }
      }
    ],
    caseStudies: [],
    quiz: [
      {
        id: 1,
        question: 'O que NÃO deve constar no currículo inicial de um jovem para preservar sua segurança conforme a LGPD?',
        options: [
          'Cursos livres e badges conquistadas no SkillHub.',
          'Nome completo e bairro onde reside.',
          'Número de CPF, RG, dados bancários e endereço com número de casa.',
          'Objetivo profissional e turno escolar.'
        ],
        correct: 2,
        explanation: 'Documentos sensíveis como CPF, RG e endereço com número não devem constar no currículo inicial.'
      },
      {
        id: 2,
        question: 'Qual a forma mais adequada de redigir o Objetivo Profissional no currículo?',
        options: [
          '"Qualquer vaga que estiver disponível."',
          '"Atuar como Jovem Aprendiz Administrativo aplicando conhecimentos em rotinas de escritório e planilhas."',
          '"Ganhar dinheiro para comprar roupas."',
          'Deixar o campo em branco.'
        ],
        correct: 1,
        explanation: 'Um objetivo claro e alinhado à vaga pretendida facilita o trabalho do recrutador e demonstra foco.'
      }
    ]
  },

  // =========================================================================
  // 2.5 EQUILÍBRIO EMOCIONAL, ANSIEDADE E FOCO NO TRABALHO
  // =========================================================================
  {
    id: 'equilibrio-emocional',
    isPublished: true,
    active: true,
    visible: true,
    trackId: 'trilha-comunicacao-relacionamento',
    trackName: 'Trilha Comunicação & Relacionamento Profissional',
    category: 'Saúde Mental & Desenvolvimento Pessoal',
    targetAudienceType: 'TODOS',
    title: 'Equilíbrio Emocional, Ansiedade e Foco no Trabalho',
    subtitle: 'Aprenda a reconhecer o ciclo da ansiedade, cultivar autocuidado emocional, sustentar a concentração no trabalho e agir com intenção em momentos de pressão.',
    hours: 1,
    equivalentHours: 1,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Jovens aprendizes, estagiários e colaboradores que buscam inteligência emocional, foco e bem-estar no trabalho.',
    prerequisites: 'Nenhum pré-requisito.',
    badgeName: 'Selo de Inteligência Emocional',
    badgeCategory: 'Saúde Mental',
    badgeIcon: 'Heart',
    accentColor: '#8B5CF6',
    level: 'Iniciante',
    learningObjectives: [
      'Reconhecer o ciclo biológico e cognitivo da ansiedade no ambiente profissional.',
      'Desenvolver técnicas práticas de autorregulação emocional e respiração para desacelerar.',
      'Sustentar o foco diário através de blocos de tempo e fragmentação de tarefas.',
      'Transitar da reação impulsiva para a intenção consciente em momentos de pressão.'
    ],
    modules: [
      {
        id: 'eq-mod-1',
        number: 1,
        title: 'Pilar 1: Entenda o Ciclo da Ansiedade',
        summary: 'Mapeamento de pensamentos acelerados, preocupações e a cadeia cognitiva da ansiedade no ambiente profissional.',
        estimatedMinutes: 15,
        content: {
          sections: [
            {
              subheading: '1. Entenda o Ciclo da Ansiedade',
              body: [
                '• Pensamentos acelerados, preocupações constantes, dificuldade de relaxar e queda na concentração.',
                '• Compreenda a cadeia: Estímulos ➔ Sobrecarga cognitiva ➔ Ansiedade ➔ Cansaço mental.'
              ],
              highlightBox: {
                type: 'info',
                title: 'A Cadeia da Sobrecarga Cognitiva',
                text: 'Estímulos ➔ Sobrecarga cognitiva ➔ Ansiedade ➔ Cansaço mental. Identificar esse padrão nos primeiros minutos é a chave para interromper o esgotamento.'
              }
            }
          ]
        }
      },
      {
        id: 'eq-mod-2',
        number: 2,
        title: 'Pilar 2: Cuide das Emoções',
        summary: 'Autoconsciência emocional, nomeação de sentimentos, respiração diafragmática e acolhimento.',
        estimatedMinutes: 15,
        content: {
          sections: [
            {
              subheading: '2. Cuide das Emoções',
              body: [
                '• Reconheça o que sente e nomeie suas emoções.',
                '• Respire, desacelere e busque apoio quando precisar.',
                '• Lembrete essencial: "Você não controla tudo, mas pode escolher como responder."'
              ],
              highlightBox: {
                type: 'info',
                title: 'Lembrete de Autocuidado',
                text: '"Você não controla tudo, mas pode escolher como responder."'
              }
            }
          ]
        }
      },
      {
        id: 'eq-mod-3',
        number: 3,
        title: 'Pilar 3: Sustente o Foco',
        summary: 'Blocos de tempo, técnica Pomodoro, divisão de demandas extensas e priorização diária.',
        estimatedMinutes: 15,
        content: {
          sections: [
            {
              subheading: '3. Sustente o Foco',
              body: [
                '• Trabalhe em blocos de tempo e divida tarefas grandes em etapas menores.',
                '• Defina prioridades diárias e elimine distrações no ambiente.',
                '• Ciclo prático: Planejar ➔ Executar ➔ Concluir.'
              ],
              highlightBox: {
                type: 'info',
                title: 'Ciclo Prático de Foco',
                text: 'Planejar ➔ Executar ➔ Concluir. A fragmentação de tarefas grandes alivia a ansiedade e eleva o rendimento.'
              }
            }
          ]
        }
      },
      {
        id: 'eq-mod-4',
        number: 4,
        title: 'Pilar 4: Troque Reação por Intenção',
        summary: 'Pausa estratégica, limites saudáveis, ressignificação de erros e consistência diária.',
        estimatedMinutes: 15,
        content: {
          sections: [
            {
              subheading: '4. Troque Reação por Intenção',
              body: [
                '• Pause antes de reagir impulsivamente e estabeleça limites saudáveis.',
                '• Faça pausas estratégicas durante a jornada e veja desafios como aprendizado.',
                '• Lembrete: "Pequenos passos geram grandes resultados!"'
              ],
              highlightBox: {
                type: 'info',
                title: 'Postura Consciente',
                text: '"Pequenos passos geram grandes resultados!" Agir com intenção preserva a clareza mental e melhora suas relações no trabalho.'
              }
            }
          ]
        }
      }
    ],
    caseStudies: [],
    quiz: [
      {
        id: 1,
        question: 'Qual é a recomendação ao perceber pensamentos acelerados e ansiedade no trabalho?',
        options: [
          'Ignorar os sinais e acelerar as tarefas para terminar logo.',
          'Respirar, desacelerar e nomear as emoções.',
          'Reclamar em voz alta na equipe para aliviar a tensão.',
          'Abandonar a estação de trabalho sem avisar o gestor.'
        ],
        correct: 1,
        explanation: 'Respirar com calma, desacelerar o ritmo e nomear conscientemente as emoções reduz a ativação da amígdala e devolve a clareza mental.'
      },
      {
        id: 2,
        question: 'Como sustentar o foco em tarefas complexas ou extensas?',
        options: [
          'Realizar várias tarefas simultâneas respondendo a todas as notificações.',
          'Dividir em tarefas menores e trabalhar em blocos de tempo.',
          'Deixar a demanda para a última hora para trabalhar sob pressão.',
          'Evitar planejar o dia para não gerar expectativas.'
        ],
        correct: 1,
        explanation: 'Dividir demandas extensas em etapas menores e focar em blocos de tempo evita a sobrecarga e mantém o ritmo sustentável.'
      },
      {
        id: 3,
        question: 'O que significa "trocar reação por intenção"?',
        options: [
          'Pausar antes de agir e estabelecer limites em vez de responder no impulso.',
          'Responder de imediato com ironia para não demonstrar fraqueza.',
          'Dizer "sim" para todas as ordens sem avaliar sua capacidade diária.',
          'Fingir que não há desafios no ambiente corporativo.'
        ],
        correct: 0,
        explanation: 'Pausar antes de reagir impulsivamente e definir limites saudáveis permite escolher conscientemente a melhor resposta profissional.'
      }
    ]
  },

  // =========================================================================
  // 3. ORÇAMENTO DO PRIMEIRO SALÁRIO
  // =========================================================================
  {
    id: 'orcamento-primeiro-salario',
    published: true,
    isPublished: true,
    active: true,
    visible: true,
    trackId: 'trilha-1',
    trackName: 'TRILHA 1: Entrada no Mercado & Primeiro Emprego',
    category: 'Finanças Pessoais',
    targetAudienceType: 'TODOS',
    title: 'Orçamento do Primeiro Salário',
    subtitle: 'Ensinar a organizar, priorizar e multiplicar o primeiro salário, evitando dívidas e criando hábitos financeiros saudáveis desde o início da carreira.',
    hours: 12,
    equivalentHours: 12,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Jovens aprendizes, estagiários e profissionais em seu primeiro emprego',
    prerequisites: 'Nenhum pré-requisito.',
    badgeName: 'Mestre em Finanças',
    videoUrl: 'https://youtu.be/CIdkEei-BdU?si=V5_UIYlhtdcZjtEZ',
    youtubeId: 'CIdkEei-BdU',
    badgeCategory: 'Finanças',
    badgeIcon: 'DollarSign',
    accentColor: '#10B981',
    level: 'Iniciante',
    learningObjectives: [
      'Entender a diferença prática entre Salário Bruto e Salário Líquido, dominando descontos (INSS, IRRF, VT, VR) e análise de holerite.',
      'Superar a "Síndrome do Salário no Bolso" e o viés do presente, identificando e eliminando ralos financeiros.',
      'Aplicar a Regra 50/30/20 com adaptabilidade à realidade inicial e escolher ferramentas adequadas de controle (planilhas, apps ou envelopes).',
      'Construir a Reserva de Emergência com foco em segurança e liquidez diária, dominando o uso consciente do cartão de crédito.',
      'Planejar metas pelo método SMART, entender títulos de Renda Fixa (Tesouro Selic e CDB com FGC) e o poder multiplicador dos juros compostos.'
    ],
    modules: [
      {
        id: 'orc-mod-1',
        number: 1,
        title: 'MÓDULO 1: A Anatomia do Primeiro Salário (Mentalidade & Diagnóstico)',
        summary: 'Bruto vs. Líquido, descontos em folha (INSS, IRRF, VT, VR), a psicologia do consumo imediato e o mapeamento de ralos financeiros.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Bruto vs. Líquido: Entendendo Descontos Básicos',
              body: [
                'O erro mais comum ao receber a proposta de trabalho é planejar o orçamento com base no salário bruto (o valor nominal do contrato). O valor que realmente cai na conta corrente é o salário líquido, após os descontos compulsórios e voluntários.',
                'INSS (Instituto Nacional do Seguro Social): Desconto obrigatório regressivo por faixas salariais. Destina-se à previdência social e garante benefícios como auxílio-doença e aposentadoria.',
                'IRRF (Imposto de Renda Retido na Fonte): Imposto federal descontado diretamente da folha de pagamento caso a renda ultrapasse o teto de isenção estipulado pela Receita Federal.',
                'Benefícios e Comparticipações:',
                '• Vale-Transporte (VT): A legislação permite o desconto de até 6% do salário base para o fornecimento do transporte público.',
                '• Vale-Refeição/Alimentação (VR/VA): Dependendo da convenção coletiva, pode haver um pequeno desconto percentual em folha.',
                '• Plano de Saúde e Odontológico: Comparticipações e mensalidades do plano corporativo.',
                'Regra de Ouro: Seu orçamento real só começa a partir do valor numérico do Pix do seu holerite (extrato de pagamento).'
              ],
              highlightBox: {
                type: 'calc',
                title: 'Regra de Ouro do Primeiro Holerite',
                text: 'Nunca faça planos com base no valor bruto do contrato. O orçamento real é planejado estritamente sobre o valor líquido creditado na sua conta bancária.'
              }
            },
            {
              subheading: '2. Mudança de Mentalidade: A "Síndrome do Salário no Bolso"',
              body: [
                'A transição da vida sem renda para o primeiro salário gera um fenômeno psicológico comum: o viés do presente. O cérebro interpreta a entrada repentina de dinheiro como liquidez infinita, alimentando o impulso de satisfazer desejos represados.',
                'A Ilusão do Consumo Imediato: Comprar itens caros na primeira semana sob a justificativa "eu trabalhei para isso" reduz o capital necessário para cobrir os dias restantes do mês, levando à dependência do cheque especial ou cartão de crédito.',
                'Ajuste de Estilo de Vida: Aumentar o padrão de vida na mesma proporção do aumento de renda impede a formação de patrimônio. A maturidade financeira exige postergar pequenas gratificações em prol de estabilidade futura.'
              ],
              highlightBox: {
                type: 'warning',
                title: 'Cuidado com o Viés do Presente',
                text: 'A sensação de "eu trabalhei para isso" logo após o pagamento é o principal gatilho que empurra o jovem para o cheque especial ou para o rotativo do cartão.'
              }
            },
            {
              subheading: '3. Mapeamento de Gastos: Ralos Financeiros',
              body: [
                'Antes de cortar custos, é preciso saber exatamente para onde o dinheiro está escoando. Os gastos dividem-se em três categorias:',
                '• Custos Fixos: Despesas previsíveis com valor constante ou quase constante (ex: contribuição em casa, conta de celular, faculdade).',
                '• Custos Variáveis: Despesas necessárias que oscilam conforme o consumo (ex: alimentação fora, transporte aplicativo, energia elétrica).',
                '• Ralos Financeiros (Gastos Invisíveis): Pequenos saques diários de capital que, somados ao fim do mês, corroem até 20% da renda:',
                '  - Assinaturas de serviços de streaming que você raramente utiliza.',
                '  - Compras em aplicativos de entrega (delivery) por preguiça de cozinhar.',
                '  - Compras de conveniência no dia a dia (cafés, doces e lanches na rua sem planejamento).'
              ],
              asciiDiagram: `┌────────────────────────────────────────────────────────┐
│               MAPEAMENTO DO SALÁRIO LÍQUIDO            │
├────────────────────────────────────────────────────────┤
│ [Entrada: Salário Líquido]                             │
│        │                                               │
│        ├──► Gastos Fixos (Moradia, Contas, Faculdade)  │
│        ├──► Gastos Variáveis (Mercado, Transporte, Lazer)
│        └──► Ralos Financeiros (Assinaturas esquecidas, │
│             Delivery excessivo, Compras por impulso)   │
└────────────────────────────────────────────────────────┘`
            }
          ]
        }
      },
      {
        id: 'orc-mod-2',
        number: 2,
        title: 'MÓDULO 2: Métodos de Organização e Orçamento',
        summary: 'A Regra 50/30/20 na prática, adaptabilidade inicial e ferramentas de controle (planilhas, aplicativos e método dos envelopes).',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. A Regra 50/30/20 Aplicada à Realidade Inicial',
              body: [
                'A Regra 50/30/20 é um modelo de alocação orçamentária projetado para simplificar a tomada de decisão. As proporções incidem diretamente sobre o Salário Líquido:',
                '• Necessidades Essenciais (50%): Aluguel ou contribuição com as contas da casa, supermercado básico, transporte para o trabalho, contas de luz/água e saúde.',
                '• Desejos Pessoais (30%): Lazer nos finais de semana, saídas com amigos, hobbys, compras de vestuário, serviços de streaming e viagens.',
                '• Prioridades Financeiras (20%): Construção da reserva de emergência, quitação de eventuais dívidas e investimentos para objetivos de curto/médio prazo.',
                'Adaptabilidade do Método: Para quem está no início de carreira e ganha um salário menor ou mora com os pais, a divisão pode ser ajustada (ex: 40% Necessidades / 30% Desejos / 30% Futuro ou 60% Necessidades / 25% Desejos / 15% Futuro).'
              ],
              highlightBox: {
                type: 'info',
                title: 'Exemplo Prático (Salário Líquido de R$ 2.000,00)',
                text: 'Necessidades (50%) = R$ 1.000,00 | Desejos (30%) = R$ 600,00 | Prioridades Financeiras (20%) = R$ 400,00.'
              }
            },
            {
              subheading: '2. Escolha da Ferramenta de Controle',
              body: [
                'O método ideal é aquele que você consegue manter de forma consistente ao longo dos meses.',
                '• Planilhas Eletrônicas (Excel / Google Planilhas): Ideal para quem busca controle analítico detalhado, projeções futuras e gráficos de acompanhamento.',
                '• Aplicativos de Gestão Financeira: Opção prática para registrar gastos em tempo real diretamente pelo smartphone.',
                '• Método dos Envelopes (Físico ou Digital): Separação do dinheiro em categorias no início do mês. Acabou o saldo do envelope "Lazer", as saídas são suspensas até o próximo pagamento.'
              ]
            }
          ]
        }
      },
      {
        id: 'orc-mod-3',
        number: 3,
        title: 'MÓDULO 3: Reserva de Emergência e O Perigo do Crédito',
        summary: 'Dimensionamento da reserva de emergência, segurança e liquidez, uso consciente do cartão de crédito e prevenção a dívidas precoces.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Construção da Reserva de Emergência',
              body: [
                'A reserva de emergência é o alicerce de qualquer planejamento financeiro. Ela evita que você precise recorrer a empréstimos ou juros bancários diante de imprevistos.',
                'Dimensionamento do Valor:',
                '• Trabalhadores CLT: 3 a 6 meses do seu custo de vida mensal (não do salário bruto).',
                '• Profissionais Autônomos / PJ: 6 a 12 meses do seu custo de vida mensal devido à volatilidade da renda.',
                'Critérios para Escolha do Local de Alocação:',
                '• Segurança: Baixíssimo risco de perda do valor principal.',
                '• Liquidez Diária: Capacidade de resgatar o dinheiro no mesmo dia em que ocorrer a emergência.'
              ],
              highlightBox: {
                type: 'warning',
                title: 'Segurança & Liquidez Diária',
                text: 'A reserva de emergência não foi feita para lucrar alto, e sim para dar tranquilidade. Ela deve estar sempre em ativos de baixíssimo risco e resgate diário imediato.'
              }
            },
            {
              subheading: '2. Uso Consciente do Cartão de Crédito',
              body: [
                'O cartão de crédito não é renda extra; é um instrumento de pagamento com pagamento diferido (adiado).',
                '• O Ciclo do Crédito: Ao usar o cartão, você está tomando um empréstimo de curto prazo com a instituição financeira. Se pagar a fatura integral na data de vencimento, o custo desse empréstimo é zero.',
                '• A Armadilha do Juro Rotativo: Ao pagar apenas o "valor mínimo" da fatura, o saldo remanescente entra no juro rotativo — uma das taxas mais altas do mercado financeiro brasileiro.',
                'Boas Práticas:',
                '• Mantenha o limite do cartão em um valor inferior ao seu salário líquido.',
                '• Trate as compras no crédito como se fossem saídas imediatas do seu saldo bancário.'
              ]
            },
            {
              subheading: '3. Evitando Dívidas Precoces',
              body: [
                'Assumir compromissos financeiros de longo prazo no início da carreira compromete a renda futura e reduz a flexibilidade profissional.',
                '• Financiamentos Precipitados: Entrar em parcelamentos de longo prazo (veículos ou imóveis) limita a capacidade de trocar de emprego, fazer cursos de especialização ou se arriscar em novas oportunidades.',
                '• A Regra dos 3 Dias para Compras por Impulso: Ao sentir o desejo de comprar algo não essencial, aguarde 72 horas. Se a necessidade persistir após o período de esfriamento emocional, avalie o impacto no seu orçamento.'
              ]
            }
          ]
        }
      },
      {
        id: 'orc-mod-4',
        number: 4,
        title: 'MÓDULO 4: Primeiros Passos nos Investimentos e Objetivos de Vida',
        summary: 'Metas SMART (curto, médio e longo prazo), renda fixa para iniciantes (Tesouro Selic e CDB com FGC) e o efeito multiplicador dos juros compostos.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Definição de Metas Financeiras (Estrutura SMART)',
              body: [
                'Dinheiro sem destino é gasto sem perceber. As metas devem ser categorizadas por horizontes temporais claros:',
                '• Curto Prazo (Até 1 ano): Comprar um curso de especialização, fazer uma viagem nas férias ou trocar de smartphone.',
                '• Médio Prazo (1 a 5 anos): Fazer um intercâmbio, juntar valor de entrada em uma conquista maior ou trocar de veículo.',
                '• Longo Prazo (Acima de 5 anos): Independência financeira, aposentadoria complementar ou constituição de patrimônio.'
              ],
              highlightBox: {
                type: 'info',
                title: 'Metas SMART na Prática',
                text: 'Defina metas Específicas, Mensuráveis, Atingíveis, Relevantes e com Prazo. Exemplo: "Poupar R$ 150 por mês durante 10 meses para comprar um notebook de estudos."'
              }
            },
            {
              subheading: '2. Renda Fixa para Iniciantes',
              body: [
                'Para a reserva de emergência e metas de curto/médio prazo, a renda fixa é a classe de ativos indicada.',
                '• Por que fugir da Poupança Tradicional? A caderneta de poupança possui rendimento inferior ao de outras aplicações de renda fixa simples e rende apenas no "aniversário" mensal, perdendo eficiência para a inflação.',
                '• Tesouro Selic: Título público emitido pelo Governo Federal. É considerado o investimento de menor risco do país, possui liquidez diária e rende 100% da taxa Selic com rentabilidade diária.',
                '• CDBs (Certificados de Depósito Bancário): Títulos emitidos por bancos. Para a reserva, busca-se CDBs de bancos sólidos que ofereçam 100% do CDI com liquidez diária e garantia do FGC (Fundo Garantidor de Créditos).'
              ]
            },
            {
              subheading: '3. A Força dos Juros Compostos',
              body: [
                'Os juros compostos funcionam como uma bola de neve positiva: os rendimentos de cada período são incorporados ao capital inicial, gerando novos rendimentos no período seguinte.',
                'O Fator Tempo: Começar a investir no primeiro salário, mesmo que com valores modestos (ex: R$ 50,00 ou R$ 100,00 por mês), é mais vantajoso do que começar com quantias maiores anos mais tarde, devido ao efeito multiplicador do tempo no cálculo dos juros compostos.'
              ],
              asciiDiagram: `┌────────────────────────────────────────────────────────┐
│            A BOLA DE NEVE DOS JUROS COMPOSTOS          │
├────────────────────────────────────────────────────────┤
│ Mês 1: Capital Inicial ──► Juros acumulados            │
│ Mês 2: (Capital Inicial + Juros Mês 1) ──► Novos Juros │
│ Mês 3: (Capital + Juros Mês 1 + Juros Mês 2) ──► Novos │
│ Efeito: O tempo multiplica seu capital de forma        │
│ exponencial quando mantido com consistência!           │
└────────────────────────────────────────────────────────┘`
            }
          ]
        }
      }
    ],
    caseStudies: [],
    quiz: [
      {
        id: 1,
        question: 'Um profissional assinou seu primeiro contrato de trabalho com o salário bruto registrado em carteira de R$ 2.500,00. Ao receber o primeiro pagamento via depósito bancário, notou que o valor em conta era de R$ 2.180,00. Qual valor deve ser utilizado como base para a montagem do seu orçamento mensal?',
        options: [
          'R$ 2.500,00, pois é a remuneração formal combinada no contrato de trabalho.',
          'R$ 2.180,00, pois o planejamento orçamentário deve ser feito exclusivamente sobre o salário líquido disponível.',
          'R$ 2.340,00, calculando a média aritmética entre o valor bruto e o valor líquido.',
          'R$ 2.500,00 somado ao valor total dos benefícios fornecidos pela empresa (VT e VR).'
        ],
        correct: 1,
        explanation: 'O planejamento orçamentário deve ser elaborado estritamente com base no salário líquido (o valor que efetivamente entra na conta). Fazer projeções sobre o valor bruto (R$ 2.500,00) gerará um déficit orçamentário mensal de R$ 320,00 referente aos descontos em folha.'
      },
      {
        id: 2,
        question: 'A Regra 50/30/20 é uma metodologia prática de divisão orçamentária. Ao receber um salário líquido de R$ 2.000,00, qual é a distribuição correta dos valores em reais para Necessidades, Desejos Pessoais e Prioridades Financeiras, respectivamente?',
        options: [
          'R$ 1.000,00 para Necessidades (50%), R$ 600,00 para Desejos (30%) e R$ 400,00 para Prioridades Financeiras (20%).',
          'R$ 1.200,00 para Necessidades (60%), R$ 400,00 para Desejos (20%) e R$ 400,00 para Prioridades Financeiras (20%).',
          'R$ 800,00 para Necessidades (40%), R$ 800,00 para Desejos (40%) e R$ 400,00 para Prioridades Financeiras (20%).',
          'R$ 1.000,00 para Necessidades (50%), R$ 400,00 para Desejos (20%) e R$ 600,00 para Prioridades Financeiras (30%).'
        ],
        correct: 0,
        explanation: 'Aplicando as proporções sobre R$ 2.000,00: 50% (Necessidades) = 2.000 × 0,50 = R$ 1.000,00; 30% (Desejos) = 2.000 × 0,30 = R$ 600,00; e 20% (Prioridades Financeiras) = 2.000 × 0,20 = R$ 400,00.'
      },
      {
        id: 3,
        question: 'Sobre a construção e manutenção da Reserva de Emergência, qual das alternativas apresenta o local de alocação mais adequado e a justificativa técnica correta?',
        options: [
          'Ações de empresas de tecnologia, pois oferecem alto potencial de valorização no curto prazo.',
          'Caderneta de poupança tradicional, pois é o único produto financeiro no Brasil isento de qualquer tipo de risco sistêmico.',
          'Tesouro Selic ou CDB de liquidez diária cobrindo 100% do CDI, pois oferecem alta segurança e possibilidade de resgate imediato sem perda de rendimento.',
          'Títulos de Renda Fixa pré-fixados com vencimento para 5 anos, pois garantem a maior taxa de juros do mercado.'
        ],
        correct: 2,
        explanation: 'A Reserva de Emergência exige combinação de alta segurança e liquidez diária (possibilidade de resgate a qualquer momento sem perdas). O Tesouro Selic e CDBs a 100% do CDI com liquidez diária atendem exatamente a esses dois requisitos técnicos.'
      },
      {
        id: 4,
        question: 'O uso do cartão de crédito exige disciplina financeira para evitar o endividamento precoce. Qual é a conduta recomendada para o uso consciente dessa ferramenta no dia a dia?',
        options: [
          'Utilizar o limite do cartão como uma extensão da renda mensal para complementar o pagamento de contas básicas.',
          'Pagar sempre o valor mínimo estipulado na fatura mensal para manter dinheiro sobrando na conta corrente.',
          'Acumular o pagamento de duas faturas consecutivas para negociar um desconto de juros junto ao banco.',
          'Concentrar gastos controlados na fatura e efetuar o pagamento integral do valor total até a data de vencimento.'
        ],
        correct: 3,
        explanation: 'O uso correto do cartão de crédito envolve centralizar gastos previamente orçados para obter prazos de pagamento ou benefícios (como pontos), efetuando o pagamento 100% integral da fatura no vencimento para evitar a incidência das taxas de juros rotativos.'
      },
      {
        id: 5,
        question: 'Um jovem profissional deseja acumular dinheiro para realizar uma viagem de férias daqui a 12 meses. Como esse objetivo deve ser classificado dentro do planejamento financeiro e qual o horizonte temporal dessa meta?',
        options: [
          'Meta de Longo Prazo, com horizonte temporal acima de 5 anos.',
          'Meta de Curto Prazo, com horizonte temporal de até 1 ano.',
          'Meta Indefinida, pois investimentos para férias não podem ser planejados financeiramente.',
          'Meta de Médio Prazo, com horizonte temporal de 2 a 5 anos.'
        ],
        correct: 1,
        explanation: 'Metas financeiras com horizonte de realização de até 12 meses (1 ano) são classificadas tecnicamente como metas de Curto Prazo.'
      },
      {
        id: 6,
        question: 'O conceito de "Juros Compostos" desempenha um papel fundamental no acúmulo de patrimônio ao longo do tempo. Qual das afirmações abaixo descreve corretamente a dinâmica do seu funcionamento?',
        options: [
          'Os rendimentos do período são somados ao capital acumulado, fazendo com que os juros do período seguinte incidam sobre o novo valor total.',
          'Os juros são calculados apenas uma vez, sobre o capital inicial investido, no momento do resgate do título.',
          'Trata-se de uma taxa cobrada pelos bancos para administrar a carteira de investimento de clientes iniciantes.',
          'Os juros compostos aplicam-se exclusivamente a dívidas de cartão de crédito e não aos investimentos de renda fixa.'
        ],
        correct: 0,
        explanation: 'Os juros compostos operam na lógica de "juros sobre juros". A cada ciclo, os rendimentos gerados são incorporados ao montante principal, servindo de base de cálculo para a próxima rentabilidade.'
      },
      {
        id: 7,
        question: 'Dentre as opções abaixo, qual representa um "ralo financeiro" típico que pode comprometer silenciosamente o orçamento de quem está no primeiro emprego?',
        options: [
          'Pagamento de transporte público utilizado para o deslocamento diário até o trabalho.',
          'Pagamento da mensalidade de um curso de graduação ou capacitação profissional.',
          'Contratação recorrente de múltiplos serviços de streaming e pedidos frequentes de delivery por aplicativo sem registro no orçamento.',
          'Destinação de 10% do salário líquido para a reserva de emergência no dia do pagamento.'
        ],
        correct: 2,
        explanation: 'Ralos financeiros são pequenos gastos não essenciais e pouco percebidos no dia a dia (como assinaturas duplicadas/não utilizadas e pedidos de delivery impulsivos) que somam valores expressivos ao final do mês, corroendo a capacidade de poupança.'
      }
    ]
  },

  // =========================================================================
  // 4. POSTURA PROFISSIONAL E TÉCNICAS PARA ENTREVISTAS DE EMPREGO
  // =========================================================================
  {
    id: 'curso-postura-entrevistas',
    trackId: 'trilha-1',
    trackName: 'TRILHA 1: Entrada no Mercado & Primeiro Emprego',
    category: 'Desenvolvimento Pessoal',
    targetAudienceType: ['PRIMEIRO_EMPREGO', 'JOVEM_APRENDIZ', 'ESTUDANTE'],
    title: 'Postura Profissional e Técnicas para Entrevistas de Emprego',
    subtitle: 'Comportamento corporativo, dinâmicas de grupo, vestimenta adequada, comunicação assertiva e preparação para perguntas difíceis de recrutadores',
    hours: 10,
    equivalentHours: 10,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Jovens aprendizes, estagiários e estudantes participando de processos seletivos e entrevistas de emprego',
    prerequisites: 'Nenhum pré-requisito.',
    badgeName: 'Destaque em Entrevistas',
    badgeCategory: 'Atitude Profissional',
    badgeIcon: 'UserCheck',
    accentColor: '#8B5CF6',
    level: 'Iniciante',
    learningObjectives: [
      'Preparar respostas autênticas e estruturadas para as perguntas mais frequentes de recrutadores de RH.',
      'Desenvolver linguagem corporal confiante, contato visual, pontualidade e apresentação pessoal adequada.',
      'Posicionar-se estrategicamente em dinâmicas de grupo com espírito de equipe e assertividade.',
      'Elaborar perguntas inteligentes ao entrevistador no encerramento da conversa e realizar acompanhamento pós-entrevista.'
    ],
    modules: [
      {
        id: 'pos-mod-1',
        number: 1,
        title: 'MÓDULO 1: Preparação, Pontualidade e Apresentação Pessoal',
        summary: 'Pesquisa prévia sobre a empresa, pontualidade britânica, vestimenta adequada e controle do nervosismo.',
        estimatedMinutes: 40,
        content: {
          sections: [
            {
              subheading: '1.1 A Regra dos 15 Minutos de Antecedência e Pesquisa Prévia',
              body: [
                'Calcule seu trajeto com antecedência e chegue 15 minutos antes do horário marcado para demonstrar pontualidade e comprometimento.',
                'Pesquise a fundo sobre a empresa contratante: setor de atuação, produtos, cultura corporativa e notícias recentes.'
              ]
            },
            {
              subheading: '1.2 Vestimenta e Comunicação Não-Verbal',
              body: [
                'Vista-se de maneira profissional e compatível com a cultura da empresa.',
                'Mantenha postura ereta, contato visual cordial, escuta atenta e aperto de mão firme.'
              ]
            }
          ]
        }
      },
      {
        id: 'pos-mod-2',
        number: 2,
        title: 'MÓDULO 2: Dominando Perguntas Clássicas e Dinâmicas de Grupo',
        summary: 'Como estruturar respostas para "Conte sobre você", pontos fortes, oportunidades de melhoria e atuação em equipe.',
        estimatedMinutes: 40,
        content: {
          sections: [
            {
              subheading: '2.1 Estrutura da Resposta "Conte sobre você"',
              body: [
                'Use o roteiro: Presente (o que está estudando/fazendo) -> Conquistas e Competências -> Futuro (por que busca essa oportunidade).'
              ],
              highlightBox: {
                type: 'info',
                title: 'Exemplo Prático',
                text: 'Demonstre interesse genuíno conectando suas habilidades atuais aos objetivos da vaga pretendida.'
              }
            },
            {
              subheading: '2.2 Dinâmicas de Grupo e Pontos de Melhoria',
              body: [
                'Em dinâmicas, mostre colaboração, escuta ativa e liderança compartilhada sem tentar diminuir os colegas.',
                'Ao falar de pontos de melhoria, cite um aspecto real e explique o que está fazendo ativamente para aprimorá-lo.'
              ]
            }
          ]
        }
      }
    ],
    caseStudies: [],
    quiz: [
      {
        id: 1,
        question: 'Qual a conduta recomendada ao responder sobre seus pontos a melhorar em uma entrevista?',
        options: [
          'Dizer que é perfeccionista demais ou que não tem nenhum defeito.',
          'Citar uma oportunidade de melhoria real e explicar o que tem feito ativamente para desenvolvê-la.',
          'Falar mal de professores da escola ou colegas anteriores.',
          'Ficar em silêncio.'
        ],
        correct: 1,
        explanation: 'Demonstrar autoconhecimento e atitude ativa de aprendizado é o que os recrutadores mais valorizam.'
      },
      {
        id: 2,
        question: 'Qual é a melhor forma de responder à pergunta "Conte-me sobre você" em uma entrevista?',
        options: [
          'Contar toda a sua infância detalhadamente.',
          'Seguir o roteiro: Presente (estudos/rotina) -> Habilidades desenvolvidas -> Por que tem interesse na vaga.',
          'Dizer apenas seu nome e idade e esperar a próxima pergunta.',
          'Reclamar do trajeto de transporte público até a entrevista.'
        ],
        correct: 1,
        explanation: 'Estruturar a resposta com foco na trajetória acadêmica e profissional atual demonstra clareza e objetividade.'
      },
      {
        id: 3,
        question: 'Por que é fundamental pesquisar sobre a empresa antes da entrevista?',
        options: [
          'Para fingir que já trabalhou lá.',
          'Para entender o negócio, alinhar suas respostas à cultura da empresa e fazer perguntas relevantes.',
          'Para saber o salário de todos os diretores.',
          'Não é necessário pesquisar sobre a empresa.'
        ],
        correct: 1,
        explanation: 'Demonstrar conhecimento sobre os produtos, serviços e valores da empresa prova interesse real e proatividade.'
      },
      {
        id: 4,
        question: 'Durante uma dinâmica de grupo com outros candidatos, qual comportamento é mais valorizado pelos avaliadores?',
        options: [
          'Falar mais alto que todos para impor suas ideias sozinho.',
          'Colaborar com o grupo, praticar escuta ativa e ajudar a construir a solução em equipe.',
          'Permanecer calado e deixar os outros resolverem tudo.',
          'Criticar as opiniões dos concorrentes para se destacar.'
        ],
        correct: 1,
        explanation: 'O trabalho em equipe, a escuta atenta e o espírito colaborativo são as competências mais observadas em dinâmicas.'
      },
      {
        id: 5,
        question: 'Com quanta antecedência é recomendado chegar ao local da entrevista presencial?',
        options: [
          'Exatamente no minuto marcado.',
          'Cerca de 10 a 15 minutos antes do horário agendado.',
          'Uma hora e meia antes.',
          '15 minutos após o horário combinado.'
        ],
        correct: 1,
        explanation: 'Chegar de 10 a 15 minutos antes previne imprevistos de trânsito e demonstra pontualidade e respeito.'
      },
      {
        id: 6,
        question: 'Quando o entrevistador pergunta no final "Você tem alguma dúvida?", qual é a melhor postura?',
        options: [
          'Dizer que não tem nenhuma dúvida e que quer ir embora rápido.',
          'Fazer perguntas inteligentes sobre os próximos passos, a rotina da equipe ou os desafios da vaga.',
          'Perguntar logo se pode faltar na primeira semana.',
          'Pedir para o recrutador avaliar seu desempenho imediatamente.'
        ],
        correct: 1,
        explanation: 'Fazer perguntas pertinentes demonstra engajamento, curiosidade profissional e interesse na oportunidade.'
      },
      {
        id: 7,
        question: 'Qual aspecto da comunicação não-verbal transmite segurança e profissionalismo?',
        options: [
          'Olhar para o chão ou checar o celular durante a conversa.',
          'Manter postura ereta, contato visual cordial e escuta atenta.',
          'Cruzar os braços com cara fechada durante toda a entrevista.',
          'Falar muito baixo de modo que o entrevistador não consiga ouvir.'
        ],
        correct: 1,
        explanation: 'Contato visual, postura aberta e atenção ao interlocutor transmitem confiança, cordialidade e respeito.'
      }
    ]
  },

  // =========================================================================
  // 5. PREPARAÇÃO PARA ENTREVISTAS E PROCESSOS SELETIVOS
  // =========================================================================
  {
    id: 'curso-preparacao-entrevistas-processos-seletivos',
    trackId: 'trilha-1',
    trackName: 'TRILHA 1: Entrada no Mercado & Primeiro Emprego',
    category: 'Desenvolvimento Pessoal',
    targetAudienceType: ['PRIMEIRO_EMPREGO', 'JOVEM_APRENDIZ', 'ESTUDANTE'],
    title: 'Preparação para Entrevistas e Processos Seletivos',
    subtitle: 'Estruturação de currículo campeão, pitch pessoal de 1 a 2 minutos, técnica STAR para respostas comportamentais e atitude colaborativa em dinâmicas de grupo',
    hours: 12,
    equivalentHours: 12,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Jovens aprendizes, estagiários e estudantes participando de processos seletivos e entrevistas de emprego',
    prerequisites: 'Nenhum pré-requisito.',
    badgeName: 'Aprovado em Entrevistas',
    badgeCategory: 'Atitude Profissional',
    badgeIcon: 'UserCheck',
    accentColor: '#8B5CF6',
    level: 'Iniciante',
    learningObjectives: [
      'Estruturar um currículo profissional limpo, objetivo e direcionado para a vaga pretendida sem excessos decorativos.',
      'Construir e praticar um pitch pessoal assertivo de 1 a 2 minutos com clareza, energia e poder de síntese.',
      'Dominar a técnica STAR (Situação, Tarefa, Ação, Resultado) para estruturar respostas a perguntas comportamentais com fatos concretos.',
      'Desenvolver postura colaborativa, escuta ativa e controle emocional em dinâmicas de grupo e entrevistas online.'
    ],
    modules: [
      {
        id: 'prep-mod-1',
        number: 1,
        title: 'MÓDULO 1: A Base do Candidato',
        summary: 'Estruturação de um currículo campeão sem dados desnecessários e domínio do pitch pessoal de 1 a 2 minutos.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Estruturação de um Currículo Campeão',
              body: [
                'O currículo é o seu primeiro cartão de visitas no mercado de trabalho. Ele deve ser limpo, claro e objetivo. Inicie sempre com seus dados de contato atualizados (nome, telefone, e-mail e LinkedIn). Logo em seguida, defina um objetivo profissional específico para a vaga desejada. Destaque sua formação acadêmica, projetos relevantes desenvolvidos e cursos extracurriculares.',
                'É expressamente proibido inserir informações falsas ou dados irrelevantes (como números de documentos pessoais ou endereço completo). Lembre-se: recrutadores levam poucos segundos na primeira triagem, por isso o visual precisa ser organizado e sem excessos decorativos.'
              ],
              highlightBox: {
                type: 'info',
                title: 'Regra de Ouro da Triagem',
                text: 'Recrutadores dedicam poucos segundos na triagem inicial. Um layout limpo, objetivo e em formato PDF garante que seus pontos fortes sejam visualizados imediatamente.'
              },
              asciiDiagram: `┌────────────────────────────────────────────────────────┐
│             ESTRUTURA DO CURRÍCULO CAMPEÃO             │
├────────────────────────────────────────────────────────┤
│ [1. Cabeçalho]      Nome completo, E-mail, Fone/WhatsApp│
│ [2. Objetivo]       Cargo pretendido claro e específico │
│ [3. Formação]       Escolaridade atual e instituição   │
│ [4. Competências]   Habilidades técnicas e soft skills  │
│ [5. Cursos Extras]  Certificados e capacitações recentes│
└────────────────────────────────────────────────────────┘`
            },
            {
              subheading: '2. O Pitch Pessoal',
              body: [
                'O Pitch Pessoal é a sua apresentação oral resumida, com duração de 1 a 2 minutos, utilizada no início das entrevistas ou dinâmicas.',
                'Ele deve responder de forma concatenada a três perguntas essenciais: quem é você profissionalmente, quais são suas principais conquistas/aprendizados e por que você tem um interesse autêntico na oportunidade.',
                'Um bom pitch conecta seu histórico com as necessidades da empresa, demonstrando clareza de pensamento, energia e poder de síntese, evitando leituras decoradas ou biografias longas desde a infância.'
              ],
              highlightBox: {
                type: 'info',
                title: 'Roteiro de 3 Etapas do Pitch',
                text: '1. Quem você é profissionalmente -> 2. Principais aprendizados e projetos -> 3. Motivação autêntica pela empresa.'
              }
            }
          ]
        }
      },
      {
        id: 'prep-mod-2',
        number: 2,
        title: 'MÓDULO 2: O Momento da Avaliação',
        summary: 'Metodologia STAR para perguntas comportamentais, conduta em dinâmicas de grupo e entrevistas online.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. A Técnica STAR nas Entrevistas',
              body: [
                'Diante de perguntas comportamentais (ex: "Conte-me sobre uma situação em que você lidou com um desafio"), utilize a estrutura STAR:',
                '• Situação: Contextualize o cenário inicial e o momento do desafio.',
                '• Tarefa: Explique qual era a sua responsabilidade ou o problema a ser superado.',
                '• Ação: Detalhe exatamente o que você fez, quais ferramentas usou e como agiu.',
                '• Resultado: Apresente o desfecho quantitativo ou qualitativo alcançado.',
                'Essa metodologia impede respostas vagas ou genéricas, provando suas competências através de fatos concretos.'
              ],
              asciiDiagram: `┌────────────────────────────────────────────────────────┐
│                   A METODOLOGIA S.T.A.R.                │
├────────────────────────────────────────────────────────┤
│ [S] Situação   ► Contexto inicial e cenário do desafio │
│ [T] Tarefa     ► Sua responsabilidade e objetivo       │
│ [A] Ação       ► O que VOCÊ fez detalhadamente         │
│ [R] Resultado  ► Desfecho quantitativo e aprendizado   │
└────────────────────────────────────────────────────────┘`,
              highlightBox: {
                type: 'info',
                title: 'Fatos vs. Suposições',
                text: 'A técnica STAR elimina o "eu costumo fazer" e comprova competências através de fatos reais vividos na escola, cursos ou trabalhos anteriores.'
              }
            },
            {
              subheading: '2. Comportamento e Dinâmicas de Grupo',
              body: [
                'As dinâmicas de grupo não buscam quem fala mais alto ou quem lidera à força, mas sim a capacidade de trabalho em equipe, inteligência social e resolução colaborativa de problemas.',
                'A atitude esperada envolve praticar a escuta ativa, dar espaço para os colegas exporem suas ideias, construir soluções a partir dos pontos do grupo e manter a calma sob pressão. O foco deve ser sempre o objetivo coletivo proposto pelo avaliador.'
              ],
              highlightBox: {
                type: 'info',
                title: 'Preparação para Entrevistas Online',
                text: 'Ambiente calmo, teste antecipado de áudio/vídeo e postura ereta comunicam profissionalismo, energia e respeito ao tempo do recrutador.'
              }
            }
          ]
        }
      }
    ],
    caseStudies: [],
    quiz: [
      {
        id: 1,
        question: 'Qual a principal função do Pitch Pessoal em uma entrevista?',
        options: [
          'Ler o currículo em voz alta.',
          'Apresentar perfil, habilidades e motivação sucintamente.',
          'Discutir benefícios logo de início.',
          'Narrar a vida desde a infância.'
        ],
        correct: 1,
        explanation: 'O pitch pessoal é uma apresentação rápida e estratégica criada para sintetizar em até dois minutos quem você é profissionalmente, suas maiores competências e a motivação para ocupar a vaga.'
      },
      {
        id: 2,
        question: 'O que é a técnica STAR?',
        options: [
          'Um teste de informática.',
          'Uma fórmula matemática.',
          'Estrutura (Situação, Tarefa, Ação, Resultado) para respostas comportamentais.',
          'Um software de RH.'
        ],
        correct: 2,
        explanation: 'A metodologia STAR auxilia o candidato a organizar seu raciocínio ao narrar experiências passadas de forma lógica e objetiva.'
      },
      {
        id: 3,
        question: 'Durante uma dinâmica de grupo, a atitude esperada é:',
        options: [
          'Ficar em silêncio.',
          'Interromper os colegas.',
          'Colaborar ativamente e ouvir o grupo.',
          'Ignorar a equipe.'
        ],
        correct: 2,
        explanation: 'Dinâmicas coletivas medem a capacidade de trabalho em equipe, empatia e comunicação colaborativa.'
      },
      {
        id: 4,
        question: 'Sobre os "pontos a melhorar", o que o recrutador espera ouvir?',
        options: [
          'Que não possui fraquezas.',
          'Respostas genéricas como "sou perfeccionista".',
          'Um ponto real e as ações que já toma para resolvê-lo.',
          'Recusa em responder.'
        ],
        correct: 2,
        explanation: 'Demonstrar autoconhecimento genuíno e mostrar proatividade em se aperfeiçoar é o comportamento esperado pelos avaliadores.'
      },
      {
        id: 5,
        question: 'Para uma entrevista online, qual preparação é fundamental?',
        options: [
          'Ligar na hora sem testar nada.',
          'Testar conexão, câmera e áudio previamente em local calmo.',
          'Usar um fundo muito bagunçado.',
          'Ficar de pijama.'
        ],
        correct: 1,
        explanation: 'A preparação antecipada evita imprevistos técnicos e passa uma imagem imediata de responsabilidade e profissionalismo.'
      },
      {
        id: 6,
        question: 'O que a linguagem corporal transmite ao entrevistador?',
        options: [
          'Absolutamente nada.',
          'Confiança, interesse e energia.',
          'Sono e preguiça.',
          'Apenas sua altura.'
        ],
        correct: 1,
        explanation: 'A comunicação não verbal (postura, olhar fixo e expressões faciais) complementa e reforça a veracidade da fala.'
      },
      {
        id: 7,
        question: 'Quando o recrutador pergunta se você tem dúvidas, você deve:',
        options: [
          'Dizer que não quer saber de nada.',
          'Perguntar sobre férias no primeiro dia.',
          'Fazer perguntas inteligentes sobre os desafios da vaga e cultura da empresa.',
          'Sair da sala sem se despedir.'
        ],
        correct: 2,
        explanation: 'Fazer perguntas relevantes demonstra interesse genuíno, curiosidade intelectual e pesquisa prévia sobre a empresa.'
      }
    ]
  },

  // =========================================================================
  // 6. EXCEL DO ZERO: PRIMEIRAS PLANILHAS, FÓRMULAS BÁSICAS E GRÁFICOS
  // =========================================================================
  {
    id: 'curso-excel-iniciante',
    trackId: 'trilha-3',
    trackName: 'TRILHA 3: Tecnologia, Informática & Produtividade com IA',
    category: 'Tecnologia da Informação',
    targetAudienceType: 'TODOS',
    title: 'Excel do Zero: Primeiras Planilhas, Fórmulas Básicas e Gráficos',
    subtitle: 'Navegação em células, formatação de dados, fórmulas essenciais (SOMA, MÉDIA, MÁXIMO) e criação de gráficos simples',
    hours: 10,
    equivalentHours: 10,
    modality: 'EAD 100% Gratuito',
    targetAudience: 'Estudantes que nunca utilizaram planilhas ou querem reforçar a base',
    prerequisites: 'Nenhum.',
    badgeName: 'Excel Fundamentos',
    videoUrl: 'https://youtu.be/9QbIuIZMVUw?si=WLZ2FTGusBMd0mU2',
    youtubeId: '9QbIuIZMVUw',
    badgeCategory: 'Ferramentas de Escritório',
    badgeIcon: 'FileSpreadsheet',
    accentColor: '#10B981',
    level: 'Iniciante',
    learningObjectives: [
      'Entender linhas, colunas, células e referências no Excel e Google Planilhas.',
      'Utilizar operadores matemáticos (+, -, *, /) e funções básicas como =SOMA() e =MÉDIA().',
      'Formatar tabelas com moeda (R$), porcentagem (%) e criar gráficos de colunas.'
    ],
    modules: [
      {
        id: 'exc-ini-mod-1',
        number: 1,
        title: 'MÓDULO 1: Estrutura da Planilha e Primeiras Fórmulas',
        summary: 'Domine a interface do Excel e aprenda como o sinal de igual (=) inicia qualquer cálculo inteligente.',
        estimatedMinutes: 30,
        content: {
          sections: [
            {
              subheading: '1.1 O Segredo do Sinal de Igual',
              body: [
                'No Excel, toda fórmula começa com "=". Para somar os valores das células A1 até A10, usamos =SOMA(A1:A10).',
                'Para calcular uma média aritmética, basta digitar =MÉDIA(B2:B8).'
              ]
            }
          ]
        }
      }
    ],
    caseStudies: [],
    quiz: [
      {
        id: 1,
        question: 'Qual caractere obrigatório deve iniciar qualquer fórmula no Excel ou Planilhas?',
        options: [
          'O símbolo de arroba (@)',
          'O sinal de igual (=)',
          'O ponto de exclamação (!)',
          'As aspas duplas (")'
        ],
        correct: 1,
        explanation: 'O sinal de igual (=) avisa o Excel que o texto seguinte é uma instrução de cálculo ou função.'
      }
    ]
  },

  // =========================================================================
  // 7. MICROSOFT EXCEL & PLANILHAS ELETRÔNICAS PARA ESCRITÓRIO
  // =========================================================================
  {
    id: 'curso-excel-basico-avancado',
    trackId: 'trilha-3',
    trackName: 'TRILHA 3: Tecnologia, Informática & Produtividade com IA',
    category: 'Tecnologia da Informação',
    targetAudienceType: ['PRIMEIRO_EMPREGO', 'JOVEM_APRENDIZ', 'ESTUDANTE'],
    title: 'Microsoft Excel & Planilhas Eletrônicas para Escritório',
    subtitle: 'Capacitar profissionais a dominar o uso de planilhas eletrônicas aplicadas às rotinas administrativas de escritório, automatizando cruzamentos de dados, análise de relatórios, controle financeiro e apresentações executivas.',
    hours: 12,
    equivalentHours: 12,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Jovens aprendizes, estagiários e assistentes administrativos que buscam dominar cruzamento de dados, automação com fórmulas e relatórios gerenciais no Excel',
    prerequisites: 'Noções básicas de informática ou pacote Office.',
    badgeName: 'Excel & Ferramentas de Escritório',
    badgeCategory: 'Ferramentas de Escritório',
    badgeIcon: 'FileSpreadsheet',
    accentColor: '#10B981',
    level: 'Intermediário',
    learningObjectives: [
      'Padronizar bases de dados corporativas usando Texto para Colunas, funções de texto (=ARRUMAR, =MAIÚSCULA), remoção de duplicatas e validação de dados.',
      'Dominar o cruzamento de dados entre tabelas com PROCV e PROCX, eliminando erros com a função SEERRO.',
      'Aplicar consolidação condicional de dados e múltiplos critérios com SOMASES, CONT.SES e MÉDIASES, além de calcular prazos com funções de data.',
      'Construir Tabelas Dinâmicas (Pivot Tables) do zero, sumarizando e agrupando grandes volumes de dados por períodos.',
      'Criar painéis executivos e relatórios gerenciais interativos utilizando Segmentação de Dados (Slicers) e Gráficos Dinâmicos.'
    ],
    modules: [
      {
        id: 'exc-esc-mod-1',
        number: 1,
        title: 'MÓDULO 1: Organização de Dados e Padronização de Planilhas',
        summary: 'No ambiente corporativo, a maioria dos erros de cálculo ocorre devido a bases de dados desorganizadas, com textos mal formatados ou entradas inconsistentes.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Importação e Limpeza de Dados',
              body: [
                'No ambiente corporativo, a maioria dos erros de cálculo ocorre devido a bases de dados desorganizadas, com textos mal formatados ou entradas inconsistentes.',
                'Conversão de Texto para Colunas: Separar dados exportados de sistemas ERP/CRM (como nomes completos, datas e códigos separados por vírgula ou tabulação).',
                'Funções de Texto Essenciais:',
                '• =ARRUMAR(): Remove espaços sobressalentes no início, meio ou fim do texto, evitando falhas em buscas.',
                '• =MAIÚSCULA(), =MINÚSCULA() e =PRI.MAIÚSCULA(): Padronização de nomes de clientes, produtos e cadastros em formatos homogêneos.',
                'Remoção de Duplicadas e Validação de Dados: Criar listas suspensas (menus de seleção) para restringir o que o usuário pode digitar em uma célula, prevenindo erros de digitação e inconsistências no banco de dados.'
              ]
            },
            {
              subheading: '2. Formatação Condicional Aplicada',
              body: [
                'Destaques Automáticos: Destacar em vermelho contas a vencer, metas não atingidas ou estoques baixos de forma visual e dinâmica.',
                'Escalas de Cor e Conjuntos de Ícones: Visualização rápida de desempenho e alertas em relatórios gerenciais sem a necessidade de ler linha por linha.'
              ]
            }
          ]
        }
      },
      {
        id: 'exc-esc-mod-2',
        number: 2,
        title: 'MÓDULO 2: Cruzamento de Dados e Buscas Avançadas',
        summary: 'A habilidade mais cobrada em processos seletivos e no dia a dia de escritórios é a capacidade de relacionar informações de tabelas diferentes.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. A Família de Buscas (PROCV e PROCX)',
              body: [
                'PROCV (Procura Vertical): Buscar informações em outras tabelas com base em um código identificador (ex: buscar o preço ou descrição de um produto a partir do seu SKU ou matrícula).',
                'Sintaxe: =PROCV(valor_procurado; matriz_tabela; número_índice_coluna; [procurar_intervalo])',
                '• O parâmetro [procurar_intervalo] deve ser configurado como FALSO (ou 0) para garantir a busca exata.',
                'PROCX (A Evolução da Busca): Como utilizar a função moderna que substitui o PROCV, permitindo buscas para a esquerda, sem necessidade de contar colunas e com tratamento automático de valores não encontrados.'
              ]
            },
            {
              subheading: '2. Tratamento de Erros de Busca',
              body: [
                'Função SEERRO: Evitar que a planilha exiba poluição visual como #N/D ou #VALOR! quando uma informação não for encontrada na base.',
                'Exemplo Prático: =SEERRO(PROCV(A2; Clientes!A:D; 2; FALSO); \\"Código não encontrado\\")'
              ]
            }
          ]
        }
      },
      {
        id: 'exc-esc-mod-3',
        number: 3,
        title: 'MÓDULO 3: Consolidação, Estatística e Soma Condicional',
        summary: 'Aprender a somar, contar e calcular médias apenas quando determinadas condições do negócio forem atendidas.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Funções Condicionais Compostas',
              body: [
                'SOMASE e SOMASES: Somar valores com base em um ou múltiplos critérios simultâneos (ex: somar o total de vendas realizado apenas na região \\"Sul\\" durante o mês de \\"Agosto\\").',
                'CONT.SE e CONT.SES: Contar a quantidade de ocorrências que atendem a regras específicas (ex: quantos chamados de suporte continuam com status \\"Aberto\\").',
                'MÉDIASE e MÉDIASES: Obter a média ponderada de faturamento por segmento de cliente ou por filial.'
              ]
            },
            {
              subheading: '2. Trabalhando com Datas e Prazos Corporativos',
              body: [
                'Funções de Data (DIA, MÊS, ANO, HOJE): Automatizar o cálculo de dias de atraso de faturas e controle de vencimentos.',
                'DIATRABALHO e NETWORKDAYS: Calcular prazos úteis de projetos descontando finais de semana e feriados nacionais de forma precisa.'
              ]
            }
          ]
        }
      },
      {
        id: 'exc-esc-mod-4',
        number: 4,
        title: 'MÓDULO 4: Tabelas Dinâmicas e Relatórios Gerenciais',
        summary: 'A ferramenta definitiva para resumir milhares de linhas de dados em segundos.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Construção de Tabelas Dinâmicas (Pivot Tables)',
              body: [
                'Estruturação da Fonte de Dados: Requisitos fundamentais para transformar uma lista comum em uma Tabela Dinâmica funcional (cabeçalhos únicos, sem células mescladas e sem linhas em branco intercaladas).',
                'Campos e Áreas: Domínio dos quadrantes Linhas, Colunas, Valores e Filtros para organizar os dados com movimentos de arrastar e soltar.',
                'Agrupamentos Temporais: Agrupar datas por Mês, Trimestre ou Ano para análise rápida de evolução de faturamento ao longo do tempo.'
              ]
            },
            {
              subheading: '2. Segmentação de Dados e Painéis (Dashboards)',
              body: [
                'Segmentadores de Dados (Filtros Visuais / Slicers): Criar botões interativos e elegantes para filtrar relatórios com apenas um clique.',
                'Gráficos Dinâmicos: Conectar gráficos interativos à Tabela Dinâmica para criar apresentações executivas e painéis de controle (Dashboards) para reuniões de diretoria.'
              ]
            }
          ]
        }
      }
    ],
    caseStudies: [],
    quiz: [
      {
        id: 1,
        question: 'Um analista administrativo precisa buscar o salário de um funcionário em uma tabela usando o número da sua matrícula como referência. A matriz possui a matrícula na Coluna A e o salário na Coluna C. Qual das opções representa uma busca configurada corretamente com PROCV para retornar o valor exato?',
        options: [
          '=PROCV(A1:C100; A2; 3; \\"Exato\\")',
          '=PROCV(A2; A1:C100; 1; VERDADEIRO)',
          '=PROCV(A2; A1:C100; 3; FALSO)',
          '=PROCV(3; A1:C100; A2; FALSO)'
        ],
        correct: 2,
        explanation: 'Na função =PROCV(A2; A1:C100; 3; FALSO), o parâmetro A2 é o valor procurado, A1:C100 é o intervalo, 3 representa a coluna do salário (Coluna C) e FALSO garante a busca exata do código.'
      },
      {
        id: 2,
        question: 'Ao utilizar a função PROCV, caso o código procurado não exista na tabela de destino, o Excel retorna o erro #N/D. Qual função deve ser envelopada ao redor do PROCV para substituir esse código de erro por uma mensagem amigável como \\"Não Cadastrado\\"?',
        options: [
          '=SEERRO()',
          '=SE.ERRO.TEXTO()',
          '=LIMPAR.ERRO()',
          '=CORRIGIR()'
        ],
        correct: 0,
        explanation: 'A função =SEERRO(valor; valor_se_erro) avalia uma fórmula e, caso retorne qualquer erro (como #N/D, #VALOR!), exibe o texto amigável definido pelo usuário.'
      },
      {
        id: 3,
        question: 'Um assistente financeiro precisa somar o valor total de notas fiscais que pertencem exclusivamente ao fornecedor \\"Papelaria Silva\\" e que tenham o status de \\"Pendente\\". Qual função do Excel permite realizar a soma com mais de um critério simultâneo?',
        options: [
          '=SOMASE()',
          '=SOMA.VARIAS()',
          '=CONT.SES()',
          '=SOMASES()'
        ],
        correct: 3,
        explanation: 'Enquanto o SOMASE suporta apenas uma condição, a função SOMASES é projetada para somar valores aplicando múltiplos critérios simultâneos (Fornecedor + Status).'
      },
      {
        id: 4,
        question: 'Para evitar que colaboradores digitem nomes de departamentos de forma errada na planilha (como \\"RH\\", \\"R.H.\\" ou \\"Recursos Humanos\\"), qual recurso do Excel deve ser configurado na célula para limitar a digitação a uma lista pré-definida?',
        options: [
          'Formatação Condicional.',
          'Validação de Dados.',
          'Filtro Avançado.',
          'Texto para Colunas.'
        ],
        correct: 1,
        explanation: 'A Validação de Dados (localizada na guia Dados) permite criar restrições e listas suspensas (dropdowns), padronizando a inserção de dados na planilha.'
      },
      {
        id: 5,
        question: 'Qual é a principal vantagem operacional ao utilizar a Tabela Dinâmica (Pivot Table) para analisar grandes volumes de dados no escritório?',
        options: [
          'Ela digita automaticamente os dados que estão faltando na planilha.',
          'Ela impede que o arquivo do Excel seja apagado do computador.',
          'Ela permite resumir, agrupar e cruzar milhares de linhas de informações em poucos segundos sem a necessidade de escrever fórmulas complexas.',
          'Ela substitui completamente o uso do sistema operacional Windows.'
        ],
        correct: 2,
        explanation: 'A Tabela Dinâmica é a ferramenta mais eficiente para análise de dados, permitindo reestruturar relatórios, somar e agrupar dados dinamicamente com movimentos de arrastar e soltar.'
      },
      {
        id: 6,
        question: 'Uma equipe de compras importou um relatório onde os nomes dos clientes vieram com espaços extras no meio e no final das frases (ex: \\" João Silva \\"). Qual função de texto do Excel limpa automaticamente esses espaços desnecessários?',
        options: [
          '=LIMPAR.ESPAÇO()',
          '=ARRUMAR()',
          '=CONCATENAR()',
          '=REMOVER.TEXTO()'
        ],
        correct: 1,
        explanation: 'A função =ARRUMAR() elimina todos os espaços extras de uma cadeia de texto, deixando apenas o espaço simples entre as palavras.'
      },
      {
        id: 7,
        question: 'Em um painel interativo (Dashboard) feito no Excel, qual recurso permite adicionar botões visuais para filtrar dados de uma Tabela Dinâmica com apenas um clique?',
        options: [
          'Tabela de Dispersão.',
          'Mala Direta.',
          'Segmentação de Dados (Slicer).',
          'Macro de Gravação.'
        ],
        correct: 2,
        explanation: 'A Segmentação de Dados (Slicer) cria botões visuais e interativos que filtram relatórios e gráficos dinâmicos de maneira rápida e prática.'
      }
    ]
  },

  // =========================================================================
  // 8. INTELIGÊNCIA ARTIFICIAL E AUTOMAÇÃO NO DIA A DIA DE TRABALHO
  // =========================================================================
  {
    id: 'curso-ia-produtividade',
    published: true,
    isPublished: true,
    active: true,
    visible: true,
    videoUrl: 'https://youtu.be/1uIR8erwQmI?si=_Q067y0xVY9R8iWQ',
    youtubeId: '1uIR8erwQmI',
    trackId: 'trilha-3',
    trackName: 'TRILHA 3: Tecnologia, Informática & Produtividade com IA',
    category: 'Tecnologia da Informação',
    targetAudienceType: ['ESTAGIARIO', 'ESTUDANTE', 'JOVEM_APRENDIZ'],
    title: 'Inteligência Artificial e Automação no Dia a Dia de Trabalho',
    subtitle: 'Capacitar profissionais a integrar ferramentas de Inteligência Artificial Generativa e automações simples nas suas rotinas de trabalho, otimizando o tempo, eliminando tarefas repetitivas e aumentando a produtividade com responsabilidade, ética e segurança de dados.',
    hours: 12,
    equivalentHours: 12,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Profissionais, aprendizes, estagiários e estudantes que buscam aplicar IA generativa e automação no fluxo de trabalho corporativo',
    prerequisites: 'Nenhum pré-requisito.',
    badgeName: 'Especialista em IA & Automação Corporativa',
    badgeCategory: 'Ferramentas de Escritório',
    badgeIcon: 'Cpu',
    accentColor: '#3B82F6',
    level: 'Avançado',
    learningObjectives: [
      'Compreender os fundamentos da IA Generativa e dominar Engenharia de Prompts (Prompt Engineering) com técnicas de Few-Shot e Chain of Thought.',
      'Acelerar a produção, síntese e revisão de documentos corporativos, e-mails, relatórios e análises de dados com assistentes de IA.',
      'Construir automações No-Code com gatilhos (triggers) e ações em plataformas como Zapier e Make para eliminar tarefas repetitivas.',
      'Aplicar boas práticas de governança, conformidade com a LGPD, proteção contra vazamento de dados confidenciais e validação de alucinações da IA.'
    ],
    modules: [
      {
        id: 'ia-prod-mod-1',
        number: 1,
        title: 'MÓDULO 1: Introdução à IA Generativa no Ambiente Corporativo',
        summary: 'Compreender os fundamentos da IA e entender como transformar LLMs (Large Language Models) em assistentes virtuais de trabalho.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Conceitos Fundamentais e Mapeamento de Oportunidades',
              body: [
                'O que é IA Generativa: Diferença entre algoritmos tradicionais (baseados em regras e estatística descritiva) e modelos generativos treinados em grandes volumes de dados capazes de criar novo conteúdo em texto, imagem, áudio e código.',
                'Principais Ferramentas do Mercado: Visão geral e casos de uso de plataformas como ChatGPT (OpenAI), Claude (Anthropic), Gemini (Google), Microsoft Copilot e Perplexity.',
                'Mapeamento de Tarefas: Identificação de gargalos operacionais no dia a dia corporativo (resumo de e-mails extensos, primeiro rascunho de relatórios, ideação de apresentações e análise exploratória de dados).'
              ],
              highlightBox: {
                type: 'info',
                title: 'IA como Copiloto',
                text: 'A IA não substitui o profissional humano: ela atua como um assistente que reduz drasticamente o trabalho braçal e operacional, liberando tempo para pensamento crítico e estratégia.'
              }
            },
            {
              subheading: '2. Engenharia de Prompt para Profissionais (Prompt Engineering)',
              body: [
                'A Estrutura do Prompt Perfeito: Criação de comandos de alta eficácia estruturados em cinco blocos: Papel/Persona (quem a IA representa), Contexto (cenário empresarial), Tarefa Clara (o que fazer), Formato de Saída (tabela, tópicos, tom executivo) e Restrições (o que não fazer).',
                'Técnicas Avançadas: Few-Shot Prompting (fornecer exemplos práticos do resultado esperado no próprio comando) e Chain of Thought (divisão de problemas complexos em etapas de raciocínio lógico).',
                'Refinamento Iterativo: O diálogo iterativo com a IA permite ajustar gradualmente o tom, concisão, profundidade e formatação da resposta.'
              ]
            }
          ]
        }
      },
      {
        id: 'ia-prod-mod-2',
        number: 2,
        title: 'MÓDULO 2: Produção de Conteúdo, Análise de Dados e Resumos com IA',
        summary: 'Aplicar a IA para acelerar a criação de documentos, apresentações e o processamento de grandes volumes de informação.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Redação e Síntese de Informações',
              body: [
                'Geração e Revisão de Documentos: Redação e aprimoramento de e-mails, relatórios executivos, atas de reunião e propostas comerciais com rapidez e clareza.',
                'Síntese de Grandes Volumes de Dados: Leitura, extração de pontos-chave e resumos estruturados de PDFs extensos, artigos técnicos e pesquisas de mercado.',
                'Adaptação de Linguagem: Transformação de textos densos ou excessivamente técnicos em linguagem executiva acessível para clientes ou diretores.'
              ]
            },
            {
              subheading: '2. Análise de Dados e Apoio à Tomada de Decisão',
              body: [
                'IA para Planilhas e Tabelas: Criação e correção de fórmulas complexas de Excel e Google Sheets a partir de descrições em texto simples.',
                'Análise Preditiva e Brainstorming: Utilização de assistentes de IA para geração de ideias, análise de cenários de risco e levantamento de hipóteses de negócios.'
              ],
              highlightBox: {
                type: 'warning',
                title: 'Validação Humana Obrigatória',
                text: 'Sempre confira os cálculos e dados antes de repassá-los para gestores ou clientes; a responsabilidade técnica pelas informações é sempre humana.'
              }
            }
          ]
        }
      },
      {
        id: 'ia-prod-mod-3',
        number: 3,
        title: 'MÓDULO 3: Automação de Processos e Fluxos de Trabalho (Workflows)',
        summary: 'Conectar aplicativos e criar rotinas automáticas sem a necessidade de saber programar (No-Code).',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Introdução à Automação No-Code',
              body: [
                'O que são Ferramentas de Integração: Conceito fundamental de gatilhos (triggers - o evento que inicia o fluxo) e ações (actions - a execução automática) usando plataformas No-Code como Zapier e Make (Integromat).',
                'Conectando Aplicativos do Dia a Dia: Integração entre e-mails (Gmail/Outlook), formulários (Google Forms/Typeform), planilhas e aplicativos de comunicação de equipe (Slack/Microsoft Teams).'
              ]
            },
            {
              subheading: '2. Casos Práticos de Automação com IA',
              body: [
                'Triagem de E-mails e Leads: Envio automático de dados de formulários para planilhas, geração de resumo executivo via IA e notificação instantânea da equipe no canal corporativo.',
                'Agendamento e Lembretes Automáticos: Criação de fluxos que atualizam o status de tarefas em gerenciadores de projetos (Trello, Asana, Notion) a partir de respostas e interações de clientes.'
              ]
            }
          ]
        }
      },
      {
        id: 'ia-prod-mod-4',
        number: 4,
        title: 'MÓDULO 4: Ética, Segurança da Informação e Privacidade de Dados',
        summary: 'Garantir o uso seguro e responsável das tecnologias de IA sem comprometer o sigilo da empresa.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Segurança de Dados Corporativos e LGPD',
              body: [
                'Vazamento de Informações Confidenciais: Riscos e penalidades ao inserir dados sensíveis, segredos industriais ou dados pessoais de colaboradores e clientes (LGPD) em IAs públicas.',
                'Configurações de Privacidade: Como desativar nas configurações das ferramentas o treinamento de modelos com seus dados (opt-out de telemetria).',
                'Verificação de Fatos e Alucinações: Identificação e correção de alucinações (respostas incorretas apresentadas com convicção) antes do envio de relatórios e documentos.'
              ],
              highlightBox: {
                type: 'warning',
                title: 'Atenção à LGPD',
                text: 'Nunca insira dados pessoais de clientes (como CPFs, dados bancários ou prontuários) em plataformas públicas de IA. Anonimize todas as informações sensíveis.'
              }
            },
            {
              subheading: '2. O Futuro do Trabalho e Mentalidade de Aprendizagem Contínua',
              body: [
                'Complementaridade Humano + IA: A IA atua como copiloto de produtividade que potencializa as habilidades humanas exclusivas: pensamento crítico, empatia, criatividade e discernimento ético.',
                'Boas Práticas de Governança: Proposição e adoção de diretrizes claras de uso de inteligência artificial em equipes corporativas.'
              ]
            }
          ]
        }
      }
    ],
    caseStudies: [],
    quiz: [
      {
        id: 1,
        question: 'O que significa o conceito de "Alucinação" em modelos de Inteligência Artificial Generativa?',
        options: [
          'Quando o modelo gera informações falsas ou inventadas com aparência de verdade.',
          'Quando o computador esquenta e precisa ser desligado.',
          'Quando a IA recusa-se a responder por falta de créditos na conta.',
          'Quando o sistema operacional trava ao abrir uma planilha pesada.'
        ],
        correct: 0,
        explanation: 'Alucinação é a geração de dados incorretos ou fictícios que parecem convincentes, exigindo sempre a validação humana.'
      },
      {
        id: 2,
        question: 'Ao criar um prompt eficiente para a IA, qual estrutura traz o resultado mais preciso?',
        options: [
          'Digitar apenas palavras-chave soltas sem pontuação.',
          'Fornecer o papel (persona), o contexto, a tarefa clara, o formato de saída e os limites.',
          'Enviar o comando em letras maiúsculas para exigir prioridade na resposta.',
          'Escrever em outro idioma e traduzir três vezes antes de enviar.'
        ],
        correct: 1,
        explanation: 'Um bom prompt precisa de estrutura: Persona + Contexto + Tarefa + Formato + Restrições.'
      },
      {
        id: 3,
        question: 'Qual das seguintes condutas respeita a Lei Geral de Proteção de Dados (LGPD) ao utilizar IAs públicas?',
        options: [
          'Inserir a lista completa de CPFs e salários dos funcionários para criar gráficos.',
          'Digitar cartões de crédito de clientes para testar o sistema de cobrança.',
          'Anonimizar ou remover dados sensíveis e pessoais antes de colar o texto na ferramenta.',
          'Compartilhar senhas de acesso bancário para a IA fazer conciliação automática.'
        ],
        correct: 2,
        explanation: 'A LGPD exige a proteção de dados pessoais (PII). A anonimização garante a segurança das informações corporativas e de clientes.'
      },
      {
        id: 4,
        question: 'Em ferramentas de automação No-Code (como Zapier ou Make), o que é um "Gatilho" (Trigger)?',
        options: [
          'A linguagem de programação usada para criar o site.',
          'O botão de desligar o servidor principal da empresa.',
          'O evento inicial que dispara a execução de uma sequência de ações automáticas.',
          'O relatório mensal impresso em papel pelo setor administrativo.'
        ],
        correct: 2,
        explanation: 'O gatilho é a condição de início (ex: "quando um novo e-mail chegar") que aciona o fluxo automatizado.'
      },
      {
        id: 5,
        question: 'Qual é o principal objetivo de utilizar a IA como um "Copiloto" no dia a dia corporativo?',
        options: [
          'Substituir 100% dos funcionários humanos e fechar o escritório físico.',
          'Assumir tarefas operacionais e repetitivas, liberando tempo para análise crítica e estratégia.',
          'Deixar a IA tomar decisões financeiras sem nenhuma supervisão humana.',
          'Evitar reuniões presenciais e responder e-mails com frases aleatórias.'
        ],
        correct: 1,
        explanation: 'O papel da IA no trabalho é aumentar a produtividade humana, atuando como assistente para acelerar o trabalho braçal de dados.'
      },
      {
        id: 6,
        question: 'Se um profissional precisa de uma fórmula de Excel para somar valores com múltiplos critérios, como a IA pode ajudar?',
        options: [
          'Traduzindo o objetivo do usuário em linguagem natural diretamente para a sintaxe da função (ex: SOMASES).',
          'Instalando uma versão pirata do pacote Office no computador.',
          'Excluindo as colunas com valores zerados da planilha original.',
          'Comprando uma licença nova do software na loja oficial.'
        ],
        correct: 0,
        explanation: 'A IA converte intenções em linguagem comum em sintaxe lógica de programação ou fórmulas de planilhas.'
      },
      {
        id: 7,
        question: 'Qual das opções abaixo descreve a técnica de Few-Shot Prompting na Engenharia de Prompt?',
        options: [
          'Fazer uma única pergunta curta sem nenhum detalhe.',
          'Desligar o roteador de internet durante o envio da mensagem.',
          'Incluir alguns exemplos do resultado esperado dentro do próprio comando enviado à IA.',
          'Solicitar que a IA responda utilizando apenas uma palavra.'
        ],
        correct: 2,
        explanation: 'Few-shot prompting consiste em dar exemplos práticos no prompt para que o modelo entenda exatamente o padrão de resposta desejado.'
      }
    ]
  },

  // =========================================================================
  // 9. INFORMÁTICA BÁSICA, NUVEM E SEGURANÇA DA INFORMAÇÃO
    // =========================================================================
  // 9. INFORMÁTICA BÁSICA, NUVEM E SEGURANÇA DA INFORMAÇÃO
    CURSO_INFORMATICA_SEGURANCA,

  // Aliases de acesso direto a Informática Básica
  {
    ...CURSO_INFORMATICA_SEGURANCA,
    id: 'informatica-basica'
  },
  {
    ...CURSO_INFORMATICA_SEGURANCA,
    id: 'informatica-basica-nuvem-seguranca'
  },
  {
    ...CURSO_INFORMATICA_SEGURANCA,
    id: 'informatica'
  },

  // =========================================================================
  {
    id: 'curso-lgpd-seguranca-dados',
    trackId: 'trilha-3',
    trackName: 'TRILHA 3: Tecnologia, Informática & Produtividade com IA',
    category: 'Legislação e Cidadania',
    targetAudienceType: ['JOVEM_APRENDIZ', 'ESTUDANTE', 'PRIMEIRO_EMPREGO'],
    title: 'LGPD, Privacidade e Segurança Digital Corporativa',
    subtitle: 'Capacitar profissionais a compreender a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018), aplicando seus princípios e bases legais na rotina de trabalho, mitigando riscos de vazamento de informações e adotando protocolos práticos de segurança digital corporativa.',
    hours: 12,
    equivalentHours: 12,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Jovens aprendizes, estagiários e profissionais em ambientes corporativos buscando conformidade com a LGPD e segurança da informação',
    prerequisites: 'Nenhum pré-requisito.',
    badgeName: 'Especialista em LGPD & Dados',
    badgeCategory: 'Trabalho',
    badgeIcon: 'ShieldCheck',
    accentColor: '#8B5CF6',
    level: 'Avançado',
    learningObjectives: [
      'Compreender os conceitos fundamentais da LGPD (Lei nº 13.709/18), diferenciando Dado Pessoal de Dado Pessoal Sensível e identificando os agentes de tratamento.',
      'Aplicar as principais bases legais para o tratamento de dados (Consentimento, Legítimo Interesse, Execução de Contratos e Cumprimento de Obrigação Legal).',
      'Implementar rotinas de segurança da informação, controle de acesso baseado em funções (RBAC/Menor Privilégio) e descarte seguro de dados.',
      'Atuar com rapidez no Plano de Resposta a Incidentes (PRI) e incorporar a cultura de Privacy by Design e prevenção a phishing.'
    ],
    modules: [
      {
        id: 'lgpd-corp-mod-1',
        number: 1,
        title: 'MÓDULO 1: Fundamentos da LGPD e Conceitos Chave',
        summary: 'Compreender o escopo da lei, a quem ela se aplica e os papéis dos agentes de tratamento.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Conceitos Fundamentais da Lei',
              body: [
                'Dado Pessoal vs. Dado Pessoal Sensível: Diferenciação entre dados comuns (nome, CPF, e-mail) e dados sensíveis (origem racial, convicção religiosa, saúde, biometria).',
                'Agentes de Tratamento: Papéis do Controlador (quem toma as decisões), Operador (quem executa o tratamento) e o Encarregado/DPO (Data Protection Officer).',
                'Titular dos Dados: Direitos de acesso, correção, eliminação e revogação do consentimento.'
              ]
            },
            {
              subheading: '2. Princípios da Proteção de Dados',
              body: [
                'Finalidade e Adequação: Coletar apenas o estritamente necessário para um propósito legítimo e informado.',
                'Necessidade e Transparência: Minimização de dados e garantia de informações claras ao titular.'
              ],
              highlightBox: {
                type: 'law',
                title: 'Princípio da Necessidade (Minimização)',
                text: 'A organização só deve coletar os dados estritamente necessários para a realização de suas finalidades, abrangendo apenas dados pertinentes e proporcionais.'
              }
            }
          ]
        }
      },
      {
        id: 'lgpd-corp-mod-2',
        number: 2,
        title: 'MÓDULO 2: Bases Legais e Ciclo de Vida dos Dados',
        summary: 'Aprender a justificar a coleta de dados de acordo com a legislação e gerenciar o fluxo das informações.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. As Bases Legais para o Tratamento de Dados',
              body: [
                'Consentimento: Como obter e registrar a autorização do titular de forma livre, informada e inequívoca.',
                'Legítimo Interesse: Aplicação, limites e elaboração do teste de proporcionalidade (LIA - Legitimate Interest Assessment).',
                'Cumprimento de Obrigação Legal e Execução de Contratos: Tratar dados para emissão de notas fiscais, contratos de trabalho e obrigações trabalhistas.'
              ]
            },
            {
              subheading: '2. Ciclo de Vida e Descarte Seguro',
              body: [
                'Mapeamento de Dados (Data Mapping): Identificar de onde o dado vem, onde é armazenado, quem tem acesso e para onde é enviado.',
                'Política de Retenção e Descarte: Métodos seguros para exclusão definitiva de dados digitais e destruição de documentos físicos.'
              ]
            }
          ]
        }
      },
      {
        id: 'lgpd-corp-mod-3',
        number: 3,
        title: 'MÓDULO 3: Segurança da Informação e Mitigação de Riscos',
        summary: 'Implementar controles técnicos e administrativos no ambiente de trabalho para prevenir incidentes.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Controles de Acesso e Uso de Dispositivos',
              body: [
                'Controle de Acesso Baseado em Funções (RBAC): Garantir que colaboradores vejam apenas os dados estritamente necessários para a sua função (Princípio do Menor Privilégio).',
                'Política de Mídia Removível e Dispositivos Móveis (BYOD): Riscos do uso de pendrives, celulares pessoais e redes Wi-Fi públicas no trabalho.'
              ],
              highlightBox: {
                type: 'warning',
                title: 'Princípio do Menor Privilégio',
                text: 'Para evitar que colaboradores visualizem arquivos confidenciais que não pertencem ao seu escopo, o acesso deve ser restrito por função e senhas nunca devem ser compartilhadas.'
              }
            },
            {
              subheading: '2. Criptografia e Armazenamento Seguro',
              body: [
                'Uso de Criptografia: Proteção de arquivos confidenciais em trânsito (e-mails) e em repouso (servidores e nuvem).',
                'Anonimização e Pseudonimização: Técnicas para desvincular o dado da identidade do titular.'
              ]
            }
          ]
        }
      },
      {
        id: 'lgpd-corp-mod-4',
        number: 4,
        title: 'MÓDULO 4: Gestão de Incidentes e Resposta a Vazamentos',
        summary: 'Saber como agir em casos de suspeita ou confirmação de incidentes de segurança.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Plano de Resposta a Incidentes (PRI)',
              body: [
                'Identificação e Contenção: Passos imediatos ao detectar a perda de um dispositivo corporativo ou o envio de dados para o destinatário errado.',
                'Notificação à ANPD e aos Titulares: Prazos, gravidade do incidente e comunicação transparente.'
              ]
            },
            {
              subheading: '2. Governança e Cultura de Privacidade',
              body: [
                'Treinamento Contínuo: Conscientização contra Engenharia Social (Phishing) no ambiente corporativo.',
                'Privacy by Design e Privacy by Default: Incorporar a privacidade e a proteção de dados desde a fase inicial de concepção de um projeto, sistema ou produto.'
              ]
            }
          ]
        }
      }
    ],
    caseStudies: [],
    quiz: [
      {
        id: 1,
        question: 'Uma empresa de saúde armazena informações sobre o histórico de exames e o tipo sanguíneo de seus pacientes. Segundo a LGPD, como esses dados são classificados?',
        options: [
          'Dados Públicos sem restrição de uso.',
          'Dados Pessoais Comuns de livre comercialização.',
          'Dados Pessoais Sensíveis.',
          'Dados Anônimos de domínio público.'
        ],
        correct: 2,
        explanation: 'Dados sobre a saúde do indivíduo (como histórico de exames e tipo sanguíneo) são classificados expressamente pela LGPD como Dados Pessoais Sensíveis, devido ao potencial discriminatório em caso de vazamento.'
      },
      {
        id: 2,
        question: 'Qual é a função do Encarregado pelo Tratamento de Dados Pessoais (também conhecido como DPO - Data Protection Officer) dentro de uma organização?',
        options: [
          'Atuar como canal de comunicação entre o controlador, os titulares dos dados e a Autoridade Nacional de Proteção de Dados (ANPD).',
          'Apagar todos os bancos de dados do servidor ao final de cada mês.',
          'Decidir sozinho os salários de todos os diretores da empresa.',
          'Vender relatórios com contatos de clientes para empresas parceiras.'
        ],
        correct: 0,
        explanation: 'O DPO (Encarregado) é o elo estratégico de ligação e intermediação entre a empresa (Controlador), os titulares dos dados e o órgão fiscalizador (ANPD).'
      },
      {
        id: 3,
        question: 'O setor de Recursos Humanos precisa manter o CPF e os dados bancários dos funcionários armazenados para realizar o pagamento do salário mensal. Qual é a base legal da LGPD que justifica esse tratamento sem a necessidade de solicitar consentimento individual?',
        options: [
          'Proteção ao Crédito.',
          'Tutela da Saúde.',
          'Realização de Pesquisas Acadêmicas.',
          'Execução de Contrato ou Obrigação Legal.'
        ],
        correct: 3,
        explanation: 'A coleta e o uso de dados para pagamento de salários e cumprimento de obrigações trabalhistas/fiscais dispensam consentimento, pois estão amparados pelas bases de Execução de Contrato e Cumprimento de Obrigação Legal.'
      },
      {
        id: 4,
        question: 'Um colaborador do setor de Vendas enviou por engano uma planilha contendo nomes, e-mails e telefones de 500 clientes para um fornecedor externo não autorizado. Como esse evento deve ser classificado de acordo com as normas de segurança corporativa?',
        options: [
          'Uma atualização de cadastro de rotina sem importância.',
          'Um procedimento padrão de marketing direto.',
          'Uma melhoria na infraestrutura da rede de internet.',
          'Um incidente de segurança com vazamento de dados pessoais.'
        ],
        correct: 3,
        explanation: 'O envio indevido de informações a terceiros não autorizados caracteriza um incidente de segurança, exigindo contenção imediata e avaliação de risco de impacto aos titulares.'
      },
      {
        id: 5,
        question: 'O princípio da LGPD que estabelece que a coleta de dados deve ser limitada ao mínimo necessário para a realização de suas finalidades, abrangendo apenas dados pertinentes e proporcionais, é chamado de:',
        options: [
          'Princípio da Necessidade (ou Minimização de Dados).',
          'Princípio da Livre Mídia.',
          'Princípio da Lucratividade.',
          'Princípio do Lucro Cessante.'
        ],
        correct: 0,
        explanation: 'O Princípio da Necessidade (minimização) determina que a organização só deve coletar os dados estritamente fundamentais para aquela operação, evitando excessos.'
      },
      {
        id: 6,
        question: 'Para evitar que colaboradores visualizem pastas com salários e contratos de diretoria que não pertencem ao seu escopo de trabalho, a empresa deve adotar qual prática de segurança?',
        options: [
          'Compartilhamento de senhas no mural do escritório.',
          'Princípio do Menor Privilégio (Controle de Acesso Restrito por Função).',
          'Desligamento do sistema de antivírus.',
          'Instalação de redes Wi-Fi abertas para convidados.'
        ],
        correct: 1,
        explanation: 'O Princípio do Menor Privilégio restringe o acesso aos arquivos apenas para os usuários que realmente precisam das informações para desempenhar suas funções operacionais.'
      },
      {
        id: 7,
        question: 'O que significa a abordagem de segurança conhecida como Privacy by Design?',
        options: [
          'Criar telas bonitas e coloridas nos sites de compra.',
          'Contratar designers gráficos para desenhar o logotipo da empresa.',
          'Pensar e incorporar a privacidade e a proteção de dados desde a fase inicial de concepção de um projeto, sistema ou produto.',
          'Deixar para pensar na proteção de dados apenas após o vazamento ocorrer.'
        ],
        correct: 2,
        explanation: 'Privacy by Design é a metodologia que prevê a privacidade como um pilar estrutural do desenvolvimento de qualquer projeto ou tecnologia, desde a sua ideia inicial.'
      }
    ]
  },

  // =========================================================================
  // 11. ROTINAS ADMINISTRATIVAS E PRÁTICAS PROFISSIONALIZANTES
  // =========================================================================
  {
    id: 'curso-rotinas-praticas-profissionalizantes',
    trackId: 'trilha-4',
    trackName: 'TRILHA 4: Rotinas Administrativas & Gestão Empresarial',
    category: 'Administração e Negócios',
    targetAudienceType: ['JOVEM_APRENDIZ', 'ESTAGIARIO', 'PRIMEIRO_EMPREGO'],
    title: 'Rotinas Administrativas e Práticas Profissionalizantes',
    subtitle: 'Comunicação corporativa, atendimento telefônico com excelência, gestão documental, atas de reunião e conformidade com a LGPD no escritório.',
    hours: 12,
    equivalentHours: 12,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Jovens aprendizes, estagiários e iniciantes no setor administrativo corporativo',
    prerequisites: 'Nenhum pré-requisito.',
    badgeName: 'Assistente Administrativo Profissional',
    badgeCategory: 'Trabalho',
    badgeIcon: 'Briefcase',
    accentColor: '#F59E0B',
    level: 'Intermediário',
    learningObjectives: [
      'Dominar as normas de redação corporativa, e-mails claros e objetivos sem vícios de netiqueta (como uso indevido de caixa alta).',
      'Aplicar padrões de excelência no atendimento telefônico e recepção corporativa, registrando recados com precisão.',
      'Elaborar e compreender atas de reunião formais e organizar arquivos físicos e digitais com padrões lógicos.',
      'Garantir sigilo e proteção de dados confidenciais na rotina administrativa segundo as diretrizes da LGPD.'
    ],
    modules: [
      {
        id: 'rot-prat-mod-1',
        number: 1,
        title: 'MÓDULO 1: Comunicação Empresarial',
        summary: 'Aprenda regras essenciais de redação corporativa, netiqueta em e-mails e protocolos de atendimento telefônico receptivo e ativo.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Redação Corporativa',
              body: [
                'A comunicação escrita nas empresas exige clareza, objetividade e respeito às normas formais.',
                'Ao enviar um e-mail, preencha sempre o campo "Assunto" de forma descritiva (ex: "Relatório Mensal de Estoque - Setembro").',
                'Inicie com uma saudação adequada, mantenha o texto dividido em parágrafos curtos, revise antes de enviar e encerre com uma assinatura profissional.',
                'Nunca utilize CAIXA ALTA no texto, pois na netiqueta corporativa isso equivale a gritar com o interlocutor.'
              ],
              highlightBox: {
                type: 'warning',
                title: 'Atenção à Netiqueta',
                text: 'Frases ou palavras inteiras em letras maiúsculas (CAIXA ALTA) transmitem agressividade e falta de polidez no ambiente corporativo.'
              }
            },
            {
              subheading: '2. Atendimento ao Cliente e Telefonia',
              body: [
                'O atendimento receptivo e ativo representa a imagem da instituição.',
                'Ao atender chamadas telefônicas ou mensagens corporativas, diga o nome da empresa, cumprimente o interlocutor e identifique-se claramente (ex: "Empresa X, bom dia! Meu nome é Gabriel, como posso ajudar?").',
                'Anote recados de forma precisa (nome, contato, assunto e horário) e encaminhe as solicitações ao setor correto sem deixar o cliente esperando sem retorno.'
              ],
              highlightBox: {
                type: 'info',
                title: 'Padrão de Atendimento',
                text: 'A identificação completa com saudação, empresa e nome gera profissionalismo imediato e orienta a conversa para uma solução ágil.'
              }
            }
          ]
        }
      },
      {
        id: 'rot-prat-mod-2',
        number: 2,
        title: 'MÓDULO 2: Gestão da Informação e LGPD',
        summary: 'Organização documental, registro de deliberações em atas de reunião e práticas obrigatórias de sigilo sob a LGPD.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Arquivos e Atas de Reunião',
              body: [
                'O controle documental garante o fluxo seguro de informações na empresa.',
                'A Ata de Reunião é o documento formal que registra as presenças, os tópicos debatidos, as decisões tomadas e os prazos com seus respectivos responsáveis.',
                'A organização física e digital de arquivos deve seguir padrões lógicos de nomenclatura para evitar extravios e retrabalho na busca por documentos antigos.'
              ],
              highlightBox: {
                type: 'info',
                title: 'Propósito da Ata',
                text: 'A Ata de Reunião resguarda decisões tomadas e define com clareza os responsáveis e prazos de cada compromisso acordado.'
              }
            },
            {
              subheading: '2. LGPD e Confidencialidade',
              body: [
                'A Lei Geral de Proteção de Dados (LGPD) estabelece regras para a coleta, armazenamento e tratamento de dados pessoais de clientes e colaboradores.',
                'No ambiente administrativo, é dever do profissional manter o sigilo das informações, não compartilhar senhas corporativas, travar a tela do computador ao se ausentar e descartar papéis impressos com dados confidenciais em fragmentadoras apropriadas.'
              ],
              highlightBox: {
                type: 'law',
                title: 'Segurança e LGPD (Lei nº 13.709/18)',
                text: 'Documentos e planilhas contendo dados pessoais devem ser mantidos em locais restritos e protegidos; senhas nunca devem ser expostas ou compartilhadas.'
              }
            }
          ]
        }
      }
    ],
    caseStudies: [
      {
        id: 'caso-rotinas-1',
        title: 'Atendimento e Sigilo em Situação de Pressão',
        character: 'Gabriel, Jovem Aprendiz do setor administrativo',
        scenario: 'Gabriel recebe uma ligação de um terceiro pedindo os dados de contato pessoais e o endereço de um funcionário da empresa com urgência.',
        criticalAnalysis: 'Conforme a LGPD e as normas corporativas, dados de colaboradores são estritamente sigilosos e não podem ser repassados por telefone a terceiros sem autorização formal.',
        keyTakeaways: [
          'Nunca fornecer dados pessoais ou senhas por telefone ou e-mail.',
          'Anotar o recado com identificação do solicitante e repassar ao superior ou DPO/RH.'
        ],
        badgeRelevance: 'Comprova postura ética e respeito rigoroso às normas de proteção de dados.'
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'O que a escrita em CAIXA ALTA transmite?',
        options: [
          'Entusiasmo.',
          'Agressividade (gritando).',
          'Formatação padrão.',
          'Profissionalismo.'
        ],
        correct: 1,
        explanation: 'Na etiqueta digital corporativa (netiqueta), escrever frases inteiras em letras maiúsculas passa a impressão visual de grito e falta de polidez.'
      },
      {
        id: 2,
        question: 'Qual o propósito de uma Ata de Reunião?',
        options: [
          'Registrar decisões e compromissos firmados.',
          'Divulgar festas.',
          'Substituir contratos.',
          'Marcar ponto.'
        ],
        correct: 0,
        explanation: 'A Ata serve como o documento oficial de memória da empresa para resguardar o que foi decidido, os responsáveis e os prazos definidos numa reunião.'
      },
      {
        id: 3,
        question: 'Conduta correta no atendimento telefônico:',
        options: [
          'Falar apenas "Alô".',
          'Saudação, nome da empresa e o próprio nome.',
          'Transferir direto o ramal.',
          'Passar dados confidenciais.'
        ],
        correct: 1,
        explanation: 'A identificação completa no início do atendimento demonstra padrão de qualidade corporativo e facilita a comunicação desde o primeiro segundo.'
      },
      {
        id: 4,
        question: 'Segundo a LGPD:',
        options: [
          'Dados podem ser comentados na copa.',
          'Documentos sigilosos devem ser guardados corretamente.',
          'O aprendiz pode repassar contatos.',
          'Senhas devem ficar nos monitores.'
        ],
        correct: 1,
        explanation: 'A Lei Geral de Proteção de Dados (LGPD) exige segurança rigorosa no armazenamento de informações sensíveis e de dados pessoais de terceiros.'
      },
      {
        id: 5,
        question: 'O atendimento orientado à solução exige:',
        options: [
          'Ignorar o cliente.',
          'Escuta atenta, empatia e direcionamento correto.',
          'Culpar o sistema.',
          'Desligar o telefone.'
        ],
        correct: 1,
        explanation: 'Resolver problemas exige ouvir atentamente a demanda do cliente sem interrupções e dar o encaminhamento adequado com presteza.'
      },
      {
        id: 6,
        question: 'Como organizar a estação de trabalho?',
        options: [
          'Acumular papéis velhos.',
          'Manter a mesa limpa e pastas identificadas.',
          'Espalhar canetas pelo chão.',
          'Deixar restos de comida na mesa.'
        ],
        correct: 1,
        explanation: 'Um ambiente de trabalho limpo e padronizado reduz distrações, evita perdas de documentos vitais e agiliza as tarefas diárias.'
      },
      {
        id: 7,
        question: 'Planilhas de controle de fluxo de caixa servem para:',
        options: [
          'Gerar atrasos.',
          'Garantir confiabilidade e auditabilidade dos processos administrativos.',
          'Decorar o computador.',
          'Fazer desenhos livres.'
        ],
        correct: 1,
        explanation: 'O registro estruturado de saídas e entradas em planilhas financeiras permite conferência rigorosa e tomada de decisões seguras pelos gestores.'
      }
    ]
  },

  // =========================================================================
  // 12. ROTINAS ADMINISTRATIVAS E ORGANIZAÇÃO DE PROCESSOS DE ESCRITÓRIO
  // =========================================================================
  {
    id: 'curso-rotinas-administrativas',
    published: true,
    isPublished: true,
    active: true,
    visible: true,
    videoUrl: 'https://youtu.be/HRqLQmuW_kc?si=QN6bzX4Wc1Z-yZ6U',
    youtubeId: 'HRqLQmuW_kc',
    trackId: 'trilha-4',
    trackName: 'TRILHA 4: Rotinas Administrativas & Gestão Empresarial',
    category: 'Administração e Negócios',
    targetAudienceType: ['JOVEM_APRENDIZ', 'ESTAGIARIO', 'PRIMEIRO_EMPREGO'],
    title: 'Rotinas Administrativas e Organização de Processos de Escritório',
    subtitle: 'Capacitar profissionais a gerenciar com eficiência o fluxo de rotinas administrativas, organizar arquivos e documentos corporativos, padronizar processos de trabalho e otimizar a comunicação interna e o atendimento no ambiente de escritório.',
    hours: 12,
    equivalentHours: 12,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Jovens aprendizes, estagiários e assistentes administrativos que buscam dominar a gestão de documentos, padronização de rotinas e processos de apoio no escritório',
    prerequisites: 'Nenhum pré-requisito.',
    badgeName: 'Especialista em Rotinas Administrativas',
    badgeCategory: 'Rotinas Administrativas',
    badgeIcon: 'Building',
    accentColor: '#F59E0B',
    level: 'Intermediário',
    learningObjectives: [
      'Compreender o papel do assistente administrativo e criar rotinas estruturadas com listas de verificação (checklists) diárias e semanais.',
      'Aplicar técnicas de atendimento profissional presencial e telefônico e redigir documentos corporativos claros (e-mails, memorandos, atas).',
      'Gerenciar arquivos físicos e digitais (GED) com métodos alfabético, cronológico e numérico, além de controlar estoque mínimo e ponto de pedido.',
      'Mapear fluxos de trabalho (Workflow), identificar gargalos operacionais, elaborar Procedimentos Operacionais Padrão (POP) e aplicar a metodologia 5S.',
      'Prestar suporte operacional a rotinas financeiras (conferência de notas e gestão do fundo fixo de caixa) e logística de viagens e reuniões executivas.'
    ],
    modules: [
      {
        id: 'rot-adm-mod-1',
        number: 1,
        title: 'MÓDULO 1: Visão Geral das Rotinas Administrativas e Atendimento',
        summary: 'Entender o papel estratégico do suporte administrativo no funcionamento operacional de uma empresa.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. O Papel do Assistente/Analista Administrativo',
              body: [
                'O suporte administrativo é o pilar que sustenta o funcionamento operacional de todos os departamentos de uma organização.',
                'Competências Chave: Organização metódica, proatividade, pontualidade rigorosa e confidencialidade ética no manuseio de dados e documentos corporativos.',
                'Mapeamento de Rotinas Diárias: Criação de listas de verificação (checklists) diárias, semanais e mensais para garantir o cumprimento pontual de prazos e obrigações sem acúmulo de tarefas ou retrabalho.'
              ]
            },
            {
              subheading: '2. Comunicação Institucional e Atendimento',
              body: [
                'Atendimento Presencial e Telefônico: Técnicas de recepção profissional, postura acolhedora e condução de chamadas corporativas com clareza e padrão institucional.',
                'Redação Empresarial Básica: Estruturação de e-mails corporativos, memorandos, comunicados internos e atas de reunião limpos, objetivos e sem ambiguidades.'
              ]
            }
          ]
        }
      },
      {
        id: 'rot-adm-mod-2',
        number: 2,
        title: 'MÓDULO 2: Gestão de Documentos, Arquivos e Controle de Estoque',
        summary: 'Garantir o rastreamento, a segurança e a integridade das informações físicas e digitais da organização.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Gestão Documental e Gestão Eletrônica de Documentos (GED)',
              body: [
                'Tipos de Documentos: Identificação e arquivamento correto de notas fiscais, contratos, comprovantes de pagamento e registros admissionais de colaboradores.',
                'Métodos de Arquivamento: Organização eficiente baseada em critérios alfabético, numérico, temático e cronológico para localização instantânea.',
                'Padronização Digital: Estrutura lógica de pastas em servidores de rede ou na nuvem (Google Drive, OneDrive) e regras padronizadas de nomenclatura de arquivos (ex: AAAA_MM_Tipo_Identificador.pdf).'
              ]
            },
            {
              subheading: '2. Controle do Material de Escritório e Suprimentos',
              body: [
                'Inventário de Estoque: Registro e controle de entrada e saída de insumos de escritório (papel, cartuchos, materiais de escrita e itens de copa).',
                'Ponto de Pedido (Estoque Mínimo): Estabelecer cotas mínimas que acionam a reposição antes do desabastecimento, evitando compras emergenciais a custos elevados.'
              ]
            }
          ]
        }
      },
      {
        id: 'rot-adm-mod-3',
        number: 3,
        title: 'MÓDULO 3: Mapeamento, Padronização e Melhoria de Processos',
        summary: 'Substituir o trabalho improvisado por procedimentos claros que garantam a qualidade e a agilidade das entregas.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Mapeamento de Fluxos de Trabalho (Workflow)',
              body: [
                'Identificação de Gargalos: Reconhecer etapas lentas, retrabalhos, burocracias desnecessárias ou acúmulo de tarefas que atrasam as operações do escritório.',
                'Criação de Fluxogramas: Representação gráfica das etapas de um processo para facilitar o alinhamento da equipe e o treinamento rápido de novos colaboradores.'
              ]
            },
            {
              subheading: '2. Procedimento Operacional Padrão (POP) e 5S',
              body: [
                'Elaboração de POPs: Manuais simples que descrevem passo a passo a execução padronizada de tarefas recorrentes (ex: fluxo de compras, reembolso e cadastro de fornecedores).',
                'Metodologia 5S no Escritório: Aplicação prática dos sensos de Utilização (descarte do inútil), Organização (um lugar para cada coisa), Limpeza (ambiente impecável), Padronização (normas visuais) e Disciplina (manutenção dos hábitos).'
              ]
            }
          ]
        }
      },
      {
        id: 'rot-adm-mod-4',
        number: 4,
        title: 'MÓDULO 4: Gestão Financeira Básica e Serviços de Apoio no Escritório',
        summary: 'Apoiar os setores de Contabilidade e Financeiro no controle de fluxo de caixa e obrigações operacionais.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Noções de Contas a Pagar e Contas a Receber',
              body: [
                'Conferência Documental: Checagem minuciosa de notas fiscais, boletos, pedidos de compra e dados cadastrais antes do encaminhamento para liquidação.',
                'Fundo Fixo de Caixa (Caixinha): Gestão responsável de pequenos recursos em espécie para despesas imediatas do dia a dia (correios, cópias, chaves e transportes) com prestação de contas rigorosa.'
              ]
            },
            {
              subheading: '2. Organização de Viagens e Eventos Corporativos',
              body: [
                'Agendamento e Logística: Cotação, reserva e controle de itinerários de passagens aéreas/terrestres, hospedagens e transporte para executivos.',
                'Suporte a Reuniões e Atas: Preparação de salas, testes prévios de equipamentos e redação de atas formais contendo decisões, responsáveis e prazos.'
              ]
            }
          ]
        }
      }
    ],
    caseStudies: [],
    quiz: [
      {
        id: 1,
        question: 'Uma empresa percebeu que novos colaboradores levam semanas para aprender a emitir relatórios de compras porque não há um material instrucional. Qual documento administrativo deve ser elaborado para descrever, passo a passo, a forma padronizada de executar essa tarefa?',
        options: [
          'Procedimento Operacional Padrão (POP).',
          'Balanço Patrimonial.',
          'Organograma Executivo.',
          'Contrato Social.'
        ],
        correct: 0,
        explanation: 'O Procedimento Operacional Padrão (POP) é o documento formal que instrui e padroniza a execução de rotinas, garantindo que o trabalho seja feito com a mesma qualidade por qualquer profissional.'
      },
      {
        id: 2,
        question: 'Ao organizar os arquivos digitais do setor financeiro no servidor corporativo, um assistente precisa garantir que qualquer membro da equipe encontre rapidamente os documentos. Qual prática representa a melhor forma de padronização de arquivos?',
        options: [
          'Salvar todos os arquivos na área de trabalho (Desktop) do computador sem pastas.',
          'Adotar uma estrutura lógica de pastas organizadas por Ano/Mês e aplicar uma regra clara de nomenclatura (ex: 2026_08_NF_FornecedorX.pdf).',
          'Nomear os arquivos apenas com códigos numéricos aleatórios como 123.pdf ou documento1.pdf.',
          'Apagar todos os arquivos do mês anterior para economizar espaço no disco rígido.'
        ],
        correct: 1,
        explanation: 'A padronização de arquivos por meio de pastas hierárquicas e regras claras de nomenclatura facilita a busca, evita duplicidade de versões e garante a continuidade do trabalho na equipe.'
      },
      {
        id: 3,
        question: 'O que define o conceito de "Estoque Mínimo" ou "Ponto de Pedido" na gestão de materiais de escritório?',
        options: [
          'A quantidade máxima de materiais que cabe fisicamente dentro do almoxarifado.',
          'O nível limite do estoque que, ao ser atingido, indica a necessidade imediata de emitir um novo pedido de compra para evitar o desabastecimento.',
          'O descarte diário de canetas e papéis que não foram utilizados no expediente.',
          'O valor total em dinheiro gasto com material de escritório no final do ano.'
        ],
        correct: 1,
        explanation: 'O Ponto de Pedido é o gatilho de segurança que aciona o setor de compras quando o estoque atinge determinado nível, considerando o tempo que o fornecedor leva para entregar.'
      },
      {
        id: 4,
        question: 'Durante o atendimento telefônico corporativo de um cliente que se encontra irritado com o atraso de uma entrega, qual deve ser a postura do profissional de suporte administrativo?',
        options: [
          'Interromper o cliente, desligar o telefone na cara dele e bloquear o número.',
          'Manter a calma, escutar com atenção e empatia, anotar os dados relevantes da reclamação e encaminhar a solução ao setor responsável dentro do prazo informado.',
          'Transferir a ligação imediatamente para qualquer colega da sala sem explicar o motivo do contato.',
          'Responder no mesmo tom de voz agressivo para demonstrar autoridade.'
        ],
        correct: 1,
        explanation: 'O atendimento profissional exige escuta ativa, inteligência emocional e resolução focada no problema, mantendo a postura institucional sem absorver a agressividade do cliente.'
      },
      {
        id: 5,
        question: 'O fundo fixo de caixa (ou "caixinha") no escritório é um recurso financeiro destinado a qual tipo de operação?',
        options: [
          'Pagamento dos salários de todos os diretores da empresa no final do mês.',
          'Compra de novas máquinas e equipamentos pesados para a fábrica.',
          'Cobertura de pequenas despesas imediatas e esporádicas do dia a dia do escritório (ex: taxas de correio, cópias, chaves).',
          'Investimento em ações na bolsa de valores.'
        ],
        correct: 2,
        explanation: 'O Fundo Fixo de Caixa é mantido em espécie ou em conta rápida para cobrir pequenos gastos operacionais e corriqueiros que não justificam a abertura de um processo formal de pagamento via fatura/boleto.'
      },
      {
        id: 6,
        question: 'Um analista mapeou o fluxo de aprovação de notas fiscais e descobriu que a nota fica parada por até 5 dias na mesa de um gestor apenas aguardando uma assinatura simples. No mapeamento de processos, esse atraso é classificado como:',
        options: [
          'Gargalo do processo.',
          'Ponto de excelência.',
          'Metodologia 5S.',
          'Atendimento personalizado.'
        ],
        correct: 0,
        explanation: 'Gargalo é a etapa do processo onde o fluxo de trabalho é retido ou desacelerado, reduzindo a eficiência global de toda a cadeia operacional.'
      },
      {
        id: 7,
        question: 'Qual das alternativas apresenta um elemento indispensável na elaboração de uma Ata de Reunião profissional?',
        options: [
          'Opiniões pessoais do redator sobre a roupas dos participantes.',
          'Data, horário, lista de presentes, principais tópicos discutidos e os encaminhamentos/prazos definidos com seus respectivos responsáveis.',
          'Transcrição de piadas e conversas informais ocorridas antes do início da reunião.',
          'Apenas a assinatura do presidente da empresa, sem necessidade de anotar o que foi discutido.'
        ],
        correct: 1,
        explanation: 'A ata deve ser um registro objetivo e factual que documenta as decisões tomadas, ações a serem executadas, prazos e responsáveis definidos durante a reunião.'
      }
    ]
  },

  // =========================================================================
  // 13. PRODUTIVIDADE ÁGIL E ORGANIZAÇÃO DE DEMANDAS
  // =========================================================================
  {
    id: 'curso-gestao-tempo',
    videoUrl: 'https://youtu.be/VcFK4u1IOZQ?si=hhiqf7NL7QwLWP_X',
    youtubeId: 'VcFK4u1IOZQ',
    trackId: 'trilha-4',
    trackName: 'TRILHA 4: Rotinas Administrativas & Gestão Empresarial',
    category: 'Desenvolvimento Pessoal',
    targetAudienceType: ['JOVEM_APRENDIZ', 'ESTUDANTE', 'ESTAGIARIO'],
    title: 'Produtividade Ágil e Organização de Demandas',
    subtitle: 'Técnicas de priorização, organização de fluxos operacionais e rotinas administrativas de alta performance',
    hours: 10,
    equivalentHours: 10,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Jovens que precisam equilibrar estudos e rotina de trabalho',
    prerequisites: 'Nenhum.',
    badgeName: 'Mestre da Produtividade',
    badgeCategory: 'Atitude Profissional',
    badgeIcon: 'Clock',
    accentColor: '#F59E0B',
    level: 'Iniciante',
    learningObjectives: [
      'Classificar tarefas entre urgentes e importantes usando a Matriz de Eisenhower.',
      'Utilizar a Técnica Pomodoro (25 minutos de foco + 5 de pausa) para estudar e trabalhar.',
      'Organizar uma agenda semanal equilibrada para não atrasar trabalhos escolares.'
    ],
    modules: [
      {
        id: 'ges-mod-1',
        number: 1,
        title: 'MÓDULO 1: Matriz de Prioridades e Rotina Semanal',
        summary: 'Como planejar a semana sem estresse e entregar todas as tarefas no prazo.',
        estimatedMinutes: 30,
        content: {
          sections: [
            {
              subheading: '1.1 A Matriz de Eisenhower',
              body: [
                'Urgente e Importante: Faça agora. Importante mas Não Urgente: Agende na semana. Urgente mas Não Importante: Delegue ou resolva rápido. Nem Urgente nem Importante: Elimine.'
              ]
            }
          ]
        }
      }
    ],
    caseStudies: [],
    quiz: [
      {
        id: 1,
        question: 'O que preconiza a Técnica Pomodoro de produtividade?',
        options: [
          'Trabalhar 8 horas seguidas sem parar para almoçar.',
          'Blocos de 25 minutos de foco total intercalados com 5 minutos de descanso.',
          'Comer tomate antes de estudar.',
          'Fazer 10 tarefas ao mesmo tempo.'
        ],
        correct: 1,
        explanation: 'Os ciclos de foco com pausas curtas evitam a fadiga mental e aumentam a concentração.'
      }
    ]
  },

  // =========================================================================
  // 14. GESTÃO DO TEMPO, FOCO E CONCILIAÇÃO ESCOLA X TRABALHO
  // =========================================================================
  {
    id: 'curso-financas-pessoais',
    trackId: 'trilha-5',
    trackName: 'TRILHA 5: Gestão do Tempo, Foco & Produtividade',
    category: 'Desenvolvimento Pessoal',
    targetAudienceType: 'TODOS',
    title: 'Gestão do Tempo, Foco e Conciliação Escola x Trabalho',
    subtitle: 'Capacitar estudantes e jovens profissionais a conciliar a rotina acadêmica com o ambiente de trabalho, aplicando técnicas de planejamento semanal, priorização e foco.',
    hours: 12,
    equivalentHours: 12,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Estudantes e jovens profissionais conciliando estudos e trabalho',
    prerequisites: 'Nenhum pré-requisito.',
    badgeName: 'Gestão do Tempo & Foco',
    badgeCategory: 'Produtividade & Carreira',
    badgeIcon: 'Clock',
    accentColor: '#3B82F6',
    level: 'Iniciante',
    learningObjectives: [
      'Calcular a disponibilidade real de tempo, identificando blocos inflexíveis e evitando o superplanejamento.',
      'Aplicar a Matriz de Prioridades de Eisenhower para equilibrar demandas concorrentes da escola e do trabalho.',
      'Implementar o planejamento semanal com Time Blocking (blocos de tempo) e centralizar informações em agenda única.',
      'Maximizar o foco com a Técnica Pomodoro adaptada e minimizar o custo cognitivo de troca de contexto.',
      'Proteger o sono como ativo cognitivo fundamental e manter comunicação assertiva e transparente com lideranças e colegas.'
    ],
    modules: [
      {
        id: 'ges-mod-1',
        number: 1,
        title: 'MÓDULO 1: Diagnóstico da Rotina Dupla e Priorização Estratégica',
        summary: 'Mapeamento de horários inflexíveis, cálculo de horas líquidas de estudo, armadilha do superplanejamento e matriz de prioridades.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Mapeamento de Horários e Capacidade Real',
              body: [
                'Conciliar estudos e trabalho exige entender que o tempo é um recurso finito. Tentar fazer "tudo ao mesmo tempo" é a principal causa de queda nas notas e queda no rendimento profissional.',
                'O primeiro passo para o equilíbrio é calcular a disponibilidade real de tempo no dia a dia:',
                '• Mapeamento de Blocos Inflexíveis: Identificação de horários fixos e inegociáveis (horas de expediente no trabalho, aulas presenciais/online e tempo de deslocamento).',
                '• Cálculo das Horas Líquidas de Estudo: Determinar quantas horas reais restam na semana para tarefas assíncronas (trabalhos acadêmicos, revisões, leituras e preparação para exames).',
                '• A Armadilha do Superplanejamento: Evitar criar agendas irrealistas que ignoram o tempo gasto com alimentação, higiene, descanso e imprevistos.'
              ],
              highlightBox: {
                type: 'warning',
                title: 'A Armadilha do Superplanejamento',
                text: 'Agendas lotadas de minuto em minuto sem pausas para alimentação, deslocamento e imprevistos colapsam no primeiro atraso do dia. Deixe margens de respiro.'
              }
            },
            {
              subheading: '2. Matriz de Prioridades para a Dupla Jornada',
              body: [
                'Quando demandas do trabalho e da escola coincidem no mesmo período, é preciso saber o que priorizar:',
                '• Urgente e Importante (Executar Já): Prova no dia seguinte, entrega de relatório profissional com prazo final no dia.',
                '• Não Urgente, mas Importante (Agendar): Estudar para a prova que ocorrerá em três semanas, elaborar o TCC aos poucos, preparar apresentações com antecedência.',
                '• Urgente, mas Não Importante (Delegar ou Automatizar): Avisos e mensagens secundárias de grupos de estudo, formatação básica de documentos.'
              ],
              asciiDiagram: `┌────────────────────────────────────────────────────────┐
│               MATRIZ DE PRIORIDADES (EISENHOWER)       │
├────────────────────────────┬───────────────────────────┤
│ URGENTE & IMPORTANTE       │ NÃO URGENTE & IMPORTANTE  │
│ [ EXECUTAR JÁ ]            │ [ AGENDAR & PLANEJAR ]    │
│ • Prova no dia seguinte    │ • Estudo semanal contínuo │
│ • Relatório com prazo hoje │ • Projetos e TCC a prazo  │
├────────────────────────────┼───────────────────────────┤
│ URGENTE / NÃO IMPORTANTE   │ NÃO URGENTE / NÃO IMPORT. │
│ [ DELEGAR / FILTRAR ]      │ [ ELIMINAR / REDUZIR ]    │
│ • Mensagens em grupos      │ • Redes sociais em excesso│
│ • Demandas secundárias     │ • Procrastinação          │
└────────────────────────────┴───────────────────────────┘`
            }
          ]
        }
      },
      {
        id: 'ges-mod-2',
        number: 2,
        title: 'MÓDULO 2: Métodos de Organização e Planejamento Semanal',
        summary: 'Técnica de Time Blocking (blocos de tempo), agrupamento de tarefas (day batching) e centralização de informações em agenda única.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Planejamento Baseado em Time Blocking (Blocos de Tempo)',
              body: [
                'A organização antecipada elimina o estresse de "apagar incêndios" na véspera de entregas importantes.',
                'A técnica de blocos de tempo consiste em transformar a agenda semanal em um mapa de compromissos dedicados:',
                '• Alocação Temática: Reservar horários específicos para "Bloco de Trabalho", "Bloco de Aulas", "Bloco de Estudos Acadêmicos" e "Bloco de Lazer/Descanso".',
                '• Agrupamento de Tarefas (Day Batching): Concentrar leituras teóricas em determinados dias e a resolução de exercícios ou tarefas práticas em outros, evitando a fragmentação do raciocínio.'
              ],
              highlightBox: {
                type: 'info',
                title: 'Time Blocking na Prática',
                text: 'Trate seu bloco de estudo agendado como um compromisso formal inegociável. Se você não reservar esse horário, qualquer distração o ocupará.'
              }
            },
            {
              subheading: '2. Centralização de Informações',
              body: [
                'Espalhar anotações em cadernos, e-mails e aplicativos diferentes gera perda de tempo e esquecimentos.',
                '• Agenda Única Integrada: Uso do Google Agenda ou Outlook para visualizar, no mesmo local, compromissos da escola e do trabalho.',
                '• Gerenciadores de Pendências: Organização de prazos e tarefas por meio de listas ou quadros visuais (como Trello, Notion ou Todoist).'
              ],
              asciiDiagram: `┌────────────────────────────────────────────────────────┐
│             CENTRALIZAÇÃO DE INFORMAÇÕES               │
├────────────────────────────────────────────────────────┤
│ • Google Agenda / Outlook: Visão unificada escola+trampo│
│ • Trello / Notion: Gerenciamento de entregas e prazos  │
│ ──► Evita choque de horários e perda de prazos limite! │
└────────────────────────────────────────────────────────┘`
            }
          ]
        }
      },
      {
        id: 'ges-mod-3',
        number: 3,
        title: 'MÓDULO 3: Foco, Produtividade nos Estudos e no Trabalho',
        summary: 'Técnica Pomodoro clássica e expandida para dupla jornada, minimização do custo de troca de contexto e rituais de transição.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Técnica Pomodoro Adaptada para Estudantes que Trabalham',
              body: [
                'Estar presente fisicamente não garante produtividade. É preciso maximizar o aproveitamento do tempo dedicado a cada atividade.',
                'Para quem dispõe de poucas horas para estudar após o expediente, o gerenciamento de energia é crucial:',
                '• Ciclo Clássico: 25 minutos de estudo/trabalho focado, seguidos de 5 minutos de pausa.',
                '• Blocos Expandidos: Para leituras densas de faculdade ou elaboração de relatórios complexos, ciclos de 50 minutos com 10 minutos de pausa costumam ser mais eficientes para manter o fluxo de pensamento (flow).'
              ],
              highlightBox: {
                type: 'calc',
                title: 'Ciclos Pomodoro',
                text: '25 min de foco total (celular fora do alcance) + 5 min de respiro. 4 blocos equivalem a 2 horas de estudo altamente produtivo.'
              }
            },
            {
              subheading: '2. Minimização do Custo de Troca de Contexto',
              body: [
                'Alternar entre responder e-mails da empresa e ler artigos acadêmicos no mesmo minuto reduz a retenção de aprendizado em até 40%.',
                '• Ritual de Transição: Criar um pequeno hábito para marcar a mudança de papel (ex: ao encerrar o expediente de trabalho, fazer uma pausa de 10 minutos para tomar água e organizar a mesa antes de abrir o material de estudos).',
                '• Eliminação de Distrações Digitais: Manter o celular no modo silencioso ou fora do alcance visual durante os blocos dedicados de estudo ou trabalho.'
              ],
              asciiDiagram: `┌────────────────────────────────────────────────────────┐
│             RITUAL DE TRANSIÇÃO ESCOLA-TRABALHO        │
├────────────────────────────────────────────────────────┤
│ [Fim do Expediente]                                    │
│        │                                               │
│        └──► Pausa de 10 min (água, alongamento, mesa)  │
│                   │                                    │
│                   └──► [Início do Bloco de Estudos]    │
│                        (Celular em silêncio e foco)    │
└────────────────────────────────────────────────────────┘`
            }
          ]
        }
      },
      {
        id: 'ges-mod-4',
        number: 4,
        title: 'MÓDULO 4: Gestão da Energia, Limites e Sustentabilidade da Rotina',
        summary: 'O sono como ativo cognitivo, higiene do sono, estudo de alta densidade e comunicação transparente com gestores e colegas de grupo.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. O Sono como Ativo de Performance',
              body: [
                'Sustentar a rotina dupla no longo prazo depende de proteger a saúde física e mental, evitando o colapso por exaustão.',
                'Cortar horas de sono para estudar na madrugada costuma ser contraproducente. A privação do sono prejudica a consolidação da memória, o foco no trabalho e a imunidade.',
                '• Higiene do Sono: Manter horários regulares para deitar e acordar, reduzindo o uso de telas luminosas 30 minutos antes de dormir.',
                '• Estudo de Alta Densidade vs. Horas de Cansaço: Duas horas de estudo com o cérebro descansado rendem mais do que quatro horas de leitura arrastada em estado de exaustão.'
              ],
              highlightBox: {
                type: 'warning',
                title: 'Sono é Memória e Desempenho',
                text: 'É durante o sono profundo que o cérebro consolida o conteúdo estudado. Estudar de madrugada em exaustão destrói a retenção e o foco no trabalho.'
              }
            },
            {
              subheading: '2. Comunicação e Alinhamento de Expectativas',
              body: [
                'É fundamental manter transparência com as lideranças no trabalho e com os grupos de estudo na escola/faculdade.',
                '• No Trabalho: Informar a liderança sobre horários de aula para alinhar expectativas quanto a horas extras e viagens corporativas.',
                '• Na Escola/Faculdade: Comunicar a disponibilidade de horários aos colegas de grupo para dividir tarefas de forma assíncrona sem comprometer as entregas.'
              ],
              highlightBox: {
                type: 'info',
                title: 'Trabalho Acadêmico Assíncrono',
                text: 'Combine com o grupo de estudos: "Tenho expediente comercial, mas entrego minha parte revisada no drive até quinta-feira às 21h". A clareza evita conflitos.'
              }
            }
          ]
        }
      }
    ],
    caseStudies: [],
    quiz: [
      {
        id: 1,
        question: 'Um estudante que trabalha em período integral percebe que está constantemente atrasando trabalhos acadêmicos porque tenta estudar apenas quando "sobra tempo" no final do dia. De acordo com os princípios de planejamento de rotina dupla, qual é a conduta mais adequada para solucionar esse problema?',
        options: [
          'Abandonar o trabalho imediatamente para focar apenas nas obrigações acadêmicas.',
          'Estudar durante o horário de expediente de trabalho sem que a liderança saiba.',
          'Agendar blocos fixos de tempo (Time Blocking) na semana dedicados exclusivamente aos estudos, tratando esse horário como um compromisso inegociável.',
          'Deixar para fazer todas as leituras e trabalhos do semestre apenas na noite anterior às provas finais.'
        ],
        correct: 2,
        explanation: 'Depender do "tempo que sobrar" costuma falhar na dupla jornada. Reservar blocos de tempo fixos na agenda (Time Blocking) garante que os estudos tenham um espaço protegido e previsível ao longo da semana.'
      },
      {
        id: 2,
        question: 'A alternância constante e rápida entre responder mensagens do trabalho e ler textos da faculdade gera um fenômeno conhecido como "custo de troca de contexto". Qual é o impacto direto desse hábito na rotina do estudante-trabalhador?',
        options: [
          'Aumento da capacidade de memorização e aceleração do aprendizado teórico.',
          'Queda do rendimento em ambas as atividades, aumento do tempo necessário para concluir as tarefas e fadiga mental precoce.',
          'Redução da fadiga mental e eliminação completa de erros operacionais.',
          'Melhoria imediata na avaliação de desempenho enviada pela empresa.'
        ],
        correct: 1,
        explanation: 'O cérebro não realiza multitarefa real em atividades cognitivas complexas. Ficar alternando entre trabalho e estudos divide a atenção, eleva a taxa de erros e gera exaustão mental muito mais rápido.'
      },
      {
        id: 3,
        question: 'Diante de uma semana com entregas concomitantes na faculdade (dois trabalhos em grupo) e no trabalho (um relatório mensal), como a Matriz de Prioridades deve ser aplicada para organizar as ações do dia?',
        options: [
          'Mapear prazos e impactos reais de cada entrega, executando primeiro as demandas classificadas como Urgentes e Importantes.',
          'Classificar as tarefas por ordem de preferência pessoal, fazendo primeiro o que for mais divertido.',
          'Ignorar os prazos corporativos para focar 100% nas atividades acadêmicas.',
          'Adiar todas as entregas e solicitar prorrogação de prazo em ambas as instituições sem justificativa.'
        ],
        correct: 0,
        explanation: 'A Matriz de Prioridades orienta a tomada de decisão com base na urgência (prazos) e no impacto (importância). Identificar e executar primeiro as demandas "Urgentes e Importantes" evita prejuízos em ambos os pilares.'
      },
      {
        id: 4,
        question: 'Ao organizar um trabalho acadêmico em grupo, um estudante que possui jornada de trabalho de 8 horas diárias precisa alinhar sua participação com os colegas. Qual postura reflete uma comunicação assertiva e preventiva?',
        options: [
          'Não avisar sobre sua rotina de trabalho e desaparecer dos grupos de mensagem nos dias de semana.',
          'Assumir a liderança de todas as etapas do trabalho e tentar fazê-las de madrugada sozinho.',
          'Exigir que todos os colegas façam as reuniões presenciais do grupo durante o seu horário de expediente corporativo.',
          'Informar previamente à equipe sua disponibilidade real de horários e assumir partes do projeto que possam ser desenvolvidas de forma assíncrona.'
        ],
        correct: 3,
        explanation: 'Comunicar com clareza a disponibilidade de tempo e optar por contribuições assíncronas (onde cada um realiza sua parte em horários flexíveis) permite cumprir o papel no grupo acadêmico sem impactar o trabalho.'
      },
      {
        id: 5,
        question: 'A privação crônica do sono é um erro comum entre pessoas que tentam conciliar estudos e trabalho. Qual é a consequência biológica e cognitiva direta de reduzir drasticamente as horas de sono para estudar de madrugada?',
        options: [
          'Prejuízo na consolidação do aprendizado, queda na capacidade de atenção e aumento da irritabilidade durante o dia.',
          'Aumento da retenção de memória de longo prazo e ganho de raciocínio lógico.',
          'Eliminação da necessidade de fazer pausas de descanso durante o expediente de trabalho.',
          'Aumento imediato da imunidade do organismo contra infecções.'
        ],
        correct: 0,
        explanation: 'É durante o sono REM e de ondas lentas que o cérebro consolida as informações aprendidas durante o dia. A privação do sono compromete diretamente o raciocínio, a memória e a capacidade de concentração.'
      },
      {
        id: 6,
        question: 'Como a Técnica Pomodoro pode ser aplicada para otimizar os estudos de um profissional que dispõe de apenas 1 hora livre à noite para revisar conteúdos acadêmicos?',
        options: [
          'Estudando por 60 minutos ininterruptos sem piscar ou fazer pausas para não perder o ritmo.',
          'Assistindo a vídeos de entretenimento por 50 minutos e estudando nos 10 minutos finais.',
          'Dividindo o tempo disponível em blocos de foco total de 25 minutos intercalados por pausas curtas de 5 minutos de descanso.',
          'Lendo três livros ao mesmo tempo enquanto atende a chamadas telefônicas da empresa.'
        ],
        correct: 2,
        explanation: 'A divisão em blocos de 25 minutos com 5 de descanso mantém o cérebro em alto nível de alerta sem gerar fadiga precoce, sendo ideal para aproveitar períodos curtos de estudo no fim do dia.'
      },
      {
        id: 7,
        question: 'O que caracteriza a "centralização de informações" como uma boa prática de organização pessoal na dupla jornada?',
        options: [
          'Anotar compromissos de trabalho em papéis avulsos e datas de provas em mensagens rascunhadas no celular.',
          'Utilizar uma ferramenta ou agenda integrada onde seja possível visualizar tanto os prazos acadêmicos quanto os compromissos profissionais em um só lugar.',
          'Guardar todas as datas importantes apenas na memória, dispensando o uso de agendas físicas ou digitais.',
          'Delegar a gestão da sua agenda pessoal para os colegas de faculdade.'
        ],
        correct: 1,
        explanation: 'Unificar prazos profissionais e acadêmicos em uma única agenda ou aplicativo evita choque de horários, perda de prazos limite e a sobrecarga de tentar lembrar de tudo de cabeça.'
      }
    ]
  },

  // =========================================================================
  // 15. PLANEJAMENTO FINANCEIRO, ORÇAMENTO 50-30-20 E RESERVA DE EMERGÊNCIA
  // =========================================================================
  {
    id: 'curso-planejamento-orcamento',
    trackId: 'trilha-5',
    trackName: 'TRILHA 5: Gestão do Tempo, Foco & Educação Financeira',
    category: 'Desenvolvimento Pessoal',
    targetAudienceType: ['JOVEM_APRENDIZ', 'ESTUDANTE', 'PRIMEIRO_EMPREGO'],
    title: 'Planejamento Financeiro, Orçamento 50-30-20 e Reserva de Emergência',
    subtitle: 'Capacitar o participante a organizar suas finanças pessoais, construir um orçamento sustentável através da regra 50-30-20, eliminar dívidas de forma estratégica e estruturar uma reserva de emergência segura e de liquidez imediata.',
    hours: 12,
    equivalentHours: 12,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Jovens aprendizes, estagiários e estudantes que buscam organizar suas finanças pessoais, quitar dívidas e criar sua primeira reserva de emergência',
    prerequisites: 'Nenhum pré-requisito.',
    badgeName: 'Mestre do Orçamento & Reserva',
    badgeCategory: 'Finanças',
    badgeIcon: 'PiggyBank',
    accentColor: '#F59E0B',
    level: 'Intermediário',
    learningObjectives: [
      'Realizar um diagnóstico financeiro completo (raio-X financeiro), mapeando ativos, passivos, gastos fixos, variáveis e despesas invisíveis.',
      'Aplicar o método de orçamento 50-30-20 (50% Necessidades, 30% Desejos e 20% Prioridades Financeiras) e adotar o princípio de \"pague-se primeiro\".',
      'Mapear dívidas pelo Custo Efetivo Total (CET) e aplicar estratégias de quitação acelerada (Método Avalanche vs. Método Bola de Neve).',
      'Calcular a Reserva de Emergência ideal com base na modalidade de trabalho (3 a 6 meses para CLT e 6 a 12 meses para autônomos).',
      'Selecionar produtos de renda fixa seguros e com liquidez diária (Tesouro Selic e CDBs 100% do CDI) para alocação da reserva de emergência.'
    ],
    modules: [
      {
        id: 'fin-orc-mod-1',
        number: 1,
        title: 'MÓDULO 1: Diagnóstico Financeiro e Mapeamento de Gastos',
        summary: 'Compreender a real situação das finanças pessoais antes de tomar decisões de investimento ou corte de despesas.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Raio-X das Finanças Pessoais',
              body: [
                'Compreender a real situação das finanças pessoais antes de tomar decisões de investimento ou corte de despesas.',
                'Levantamento de Ativos e Passivos: Entender a diferença entre o que gera receita e coloca dinheiro no bolso (ativos) e o que gera despesas e consome recursos (passivos).',
                'Mapeamento de Gastos Fixos vs. Variáveis: Classificação clara entre contas essenciais e previsíveis (aluguel, condomínio, internet) e consumos sazonais ou supérfluos que oscilam mês a mês.',
                'Categorização de Gastos: Identificação minuciosa dos chamados \"gastos invisíveis\" ou \"pequenos ralos financeiros\" (pequenos cafezinhos, taxas bancárias não percebidas e compras por impulso no dia a dia).'
              ]
            },
            {
              subheading: '2. Planilhas e Aplicativos de Controle',
              body: [
                'Ferramentas de Acompanhamento: Utilização de cadernos, planilhas organizadas ou aplicativos de gestão financeira para o registro sistemático de todas as entradas e saídas.',
                'Análise de Fluxo de Caixa: Apuração do saldo mensal real para identificar com clareza se a conta fecha no positivo (superávit), no zero a zero ou no negativo (déficit financeiro).'
              ]
            }
          ]
        }
      },
      {
        id: 'fin-orc-mod-2',
        number: 2,
        title: 'MÓDULO 2: O Método de Orçamento 50-30-20',
        summary: 'Uma metodologia prática e visual para distribuir a renda líquida mensal em categorias equilibradas.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. A Divisão Percentual da Renda Líquida',
              body: [
                '50% — Necessidades Essenciais: Moradia, alimentação, saúde, transporte, energia, água e educação básica. Gastos vitais para a sobrevivência e manutenção da vida diária.',
                '30% — Desejos Pessoais: Lazer, passeios, viagens, assinaturas de streaming, hobbies e vestuário não essencial. Gastos que proporcionam qualidade de vida presente.',
                '20% — Prioridades Financeiras: Quitação de dívidas de juros altos, construção de reservas financeiras e investimentos de longo prazo para garantir tranquilidade futura.'
              ]
            },
            {
              subheading: '2. Ajustes e Flexibilidade',
              body: [
                'Customização da Metodologia: Adaptando os percentuais para diferentes realidades de renda (ex: 60-20-20 para orçamentos em fases mais apertadas ou inícios de carreira).',
                'Disciplina e Hábitos: Como manter a constância nos aportes das prioridades financeiras logo no início do mês aplicando o princípio \"pague-se primeiro\" (investir assim que o salário cai, antes de gastar o restante).'
              ]
            }
          ]
        }
      },
      {
        id: 'fin-orc-mod-3',
        number: 3,
        title: 'MÓDULO 3: Gestão de Dívidas e Estratégias de Quitação',
        summary: 'Eliminar passivos que cobram juros altos para liberar margem no orçamento.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Mapeamento e Priorização de Débitos',
              body: [
                'Custo Efetivo Total (CET): Compreender quais dívidas são as mais perigosas e onerosas (cartão de crédito rotativo, cheque especial e empréstimos pessoais com juros compostos explosivos).',
                'Método Bola de Neve: Quitar primeiro as dívidas de menor valor absoluto para gerar vitórias rápidas e motivação psicológica consistente.',
                'Método Avalanche: Quitar prioritariamente as dívidas com as maiores taxas de juros nominais, economizando o máximo de dinheiro em juros ao longo do tempo.'
              ]
            },
            {
              subheading: '2. Renegociação e Proteção do Score',
              body: [
                'Estratégias de Negociação: Como pleitear descontos em feirões de renegociação (ex: Serasa Limpa Nome) e trocar dívidas caras por linhas de crédito mais baratas (como crédito consignado).',
                'Uso Consciente do Cartão de Crédito: Transformar o cartão em um aliado operacional de pontuação e organização de fluxo, e nunca em uma extensão ilusória da renda mensal.'
              ]
            }
          ]
        }
      },
      {
        id: 'fin-orc-mod-4',
        number: 4,
        title: 'MÓDULO 4: Estruturação da Reserva de Emergência',
        summary: 'Criar a base de segurança que protege o orçamento contra imprevistos sem necessidade de recorrer a empréstimos.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Cálculo do Tamanho Ideal da Reserva',
              body: [
                'Meses de Custo de Vida: Definir o tamanho da reserva com base na estabilidade da fonte de renda:',
                '• CLT e Servidores Públicos: De 3 a 6 meses do custo de vida essencial.',
                '• Autônomos e Profissionais Liberais: De 6 a 12 meses do custo de vida essencial, absorvendo períodos de volatilidade de faturamento.'
              ]
            },
            {
              subheading: '2. Onde Guardar a Reserva de Emergência',
              body: [
                'Critérios Inegociáveis: Altíssima segurança do capital, baixíssima volatilidade e Liquidez Diária (resgate imediato em D+0 ou D+1).',
                'Opções Adequadas: Tesouro Selic (título público federal), CDBs de liquidez diária com 100% do CDI garantidos pelo FGC e contas remuneradas de instituições consolidadas.',
                'O que Evitar para a Reserva: Ações, fundos imobiliários, criptomoedas e caderneta de poupança (devido à perda de rendimento em saques antes do aniversário de 30 dias).'
              ]
            }
          ]
        }
      }
    ],
    caseStudies: [],
    quiz: [
      {
        id: 1,
        question: 'De acordo com a metodologia de orçamento 50-30-20, como deve ser distribuída a renda líquida mensal de uma pessoa?',
        options: [
          '50% para Lazer, 30% para Moradia e 20% para Alimentação.',
          '50% para Prioridades Financeiras, 30% para Necessidades Essenciais e 20% para Desejos Pessoais.',
          '50% para Necessidades Essenciais, 30% para Desejos Pessoais e 20% para Prioridades Financeiras/Investimentos.',
          '50% para Imprevistos, 30% para Compras Parceladas e 20% para Contas de Luz e Água.'
        ],
        correct: 2,
        explanation: 'O método 50-30-20 destina 50% para as Necessidades Essenciais (sobrevivência e manutenção), 30% para Desejos Pessoais (estilo de vida e lazer) e 20% para Prioridades Financeiras (quitação de dívidas e investimentos).'
      },
      {
        id: 2,
        question: 'Um profissional autônomo com renda variável deseja calcular o tamanho ideal da sua Reserva de Emergência. Considerando a maior oscilação da sua atividade profissional, quantos meses do seu custo de vida essencial são recomendados para essa reserva?',
        options: [
          'De 6 a 12 meses.',
          'Apenas 1 mês.',
          'Exatamente 24 meses do salário bruto.',
          'Não é necessário manter reserva quando se é autônomo.'
        ],
        correct: 0,
        explanation: 'Para autônomos e profissionais liberais, cuja renda é oscilante e imprevisível, recomenda-se uma reserva mais robusta (de 6 a 12 meses do custo de vida essencial) para absorver períodos de baixa atividade.'
      },
      {
        id: 3,
        question: 'Qual das seguintes opções apresenta as características fundamentais que uma aplicação financeira DEVE ter para servir como destino da Reserva de Emergência?',
        options: [
          'Altíssimo risco, alta volatilidade e resgate bloqueado por 5 anos.',
          'Garantia de ganhos na Bolsa de Valores com rendimento diário de 10%.',
          'Baixa liquidez com cobrança de multa em caso de saque antecipado.',
          'Altíssima segurança, baixíssima volatilidade e liquidez diária (possibilidade de resgate imediato).'
        ],
        correct: 3,
        explanation: 'A reserva de emergência exige segurança (não perder o capital) e liquidez diária (dinheiro disponível no momento em que a emergência acontece). O foco desse montante é proteção, não rentabilidade agressiva.'
      },
      {
        id: 4,
        question: 'Na gestão de dívidas, qual é a principal vantagem da estratégia conhecida como \"Método Avalanche\"?',
        options: [
          'Pagar primeiro as dívidas com as menores taxas de juros para acumulá-las no final.',
          'Priorizar a quitação das dívidas que possuem as maiores taxas de juros, reduzindo ao máximo o montante total pago em juros ao longo do tempo.',
          'Ignorar as dívidas bancárias e pagar apenas as contas de consumo básico.',
          'Consolidar todas as dívidas em uma única parcela parcelada em 120 vezes.'
        ],
        correct: 1,
        explanation: 'O Método Avalanche ataca primeiro os débitos com juros mais caros (como cartão de crédito e cheque especial), sendo matematicamente a forma mais barata de quitar dívidas.'
      },
      {
        id: 5,
        question: 'Ao analisar o orçamento mensal, onde se enquadra o pagamento de despesas como aluguel, conta de luz, supermercado e transporte para o trabalho?',
        options: [
          'Desejos Pessoais (30%).',
          'Prioridades Financeiras (20%).',
          'Necessidades Essenciais (50%).',
          'Gastos Superficiais Não Categorizados.'
        ],
        correct: 2,
        explanation: 'Despesas ligadas à moradia, alimentação básica, saúde e transporte constituem a base de sobrevivência e enquadram-se nos 50% de Necessidades Essenciais.'
      },
      {
        id: 6,
        question: 'O conceito de \"Pague-se Primeiro\" no planejamento financeiro significa:',
        options: [
          'Separar o valor destinado às Prioridades Financeiras/Investimentos assim que a renda entra na conta, antes de efetuar os demais gastos.',
          'Gastar todo o salário com lazer na primeira semana do mês e pagar as contas com o limite do cartão.',
          'Pagar adiantado a fatura do cartão de crédito do mês seguinte.',
          'Comprar produtos importados à vista antes de cotar preços.'
        ],
        correct: 0,
        explanation: 'O hábito de \"pague-se primeiro\" consiste em priorizar o seu futuro financeiro transferindo o percentual de investimentos/poupança logo no dia do pagamento, tratando os aportes como um compromisso fixo.'
      },
      {
        id: 7,
        question: 'Qual das seguintes alternativas representa um produto financeiro adequado e seguro para a alocação da Reserva de Emergência?',
        options: [
          'Ações de empresas de tecnologia na Bolsa de Valores.',
          'Criptomoedas de alto risco.',
          'Tesouro Selic ou CDB de Liquidez Diária de instituição financeira sólida.',
          'Fundos Imobiliários fechados sem liquidez.'
        ],
        correct: 2,
        explanation: 'O Tesouro Selic e os CDBs de liquidez diária possuem risco baixíssimo, acompanham a taxa básica de juros e permitem o resgate imediato sem perdas do valor principal investido.'
      }
    ]
  },

  // =========================================================================
  // 16. EQUILÍBRIO EMOCIONAL, ANSIEDADE E FOCO NO TRABALHO
  // =========================================================================
  {
    id: 'curso-saude-mental-trabalho',
    published: true,
    isPublished: true,
    active: true,
    visible: true,
    trackId: 'trilha-2',
    trackName: 'TRILHA 2: Soft Skills, Postura & Comunicação Corporativa',
    category: 'Desenvolvimento Pessoal',
    targetAudienceType: 'TODOS',
    title: 'Equilíbrio Emocional, Ansiedade e Foco no Trabalho',
    subtitle: 'Capacitar o profissional a identificar gatilhos de estresse e ansiedade no ambiente corporativo, aplicar técnicas de autorregulação emocional e mindfulness, manter o foco em tarefas complexas e construir uma rotina de trabalho mentalmente saudável e sustentável.',
    hours: 12,
    equivalentHours: 12,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Estudantes, aprendizes e profissionais em transição ou atuação no mercado de trabalho',
    prerequisites: 'Nenhum pré-requisito.',
    badgeName: 'Equilíbrio Emocional & Foco',
    badgeCategory: 'Saúde Mental & Carreira',
  videoUrl: 'https://youtu.be/PAVaaGa_gug?si=JYdOWSYOz0oJj5TH',
  youtubeId: 'PAVaaGa_gug',
    badgeIcon: 'HeartPulse',
    accentColor: '#EC4899',
    level: 'Iniciante',
    learningObjectives: [
      'Identificar o mecanismo biológico do estresse no trabalho, compreendendo as diferenças entre Eustresse (positivo) e Distresse (negativo).',
      'Mapear gatilhos individuais internos (perfeccionismo, síndrome do impostor) e externos (pressões, reuniões e cobranças).',
      'Aplicar técnicas de autorregulação fisiológica e respiratória como Respiração Quadrada (Box Breathing) e Técnica 4-7-8.',
      'Praticar a reestruturação cognitiva contra a catastrofização, focando em fatos e planos de ação práticos.',
      'Implementar o Trabalho Profundo (Deep Work) e a pausa estratégica com o método S.T.O.P. de Mindfulness Corporativo.',
      'Estabelecer fronteiras e desconexão digital no expediente, prevenindo precocemente os sinais e estágios da Síndrome de Burnout.'
    ],
    modules: [
      {
        id: 'sau-mod-1',
        number: 1,
        title: 'MÓDULO 1: Inteligência Emocional e Mapeamento de Gatilhos',
        summary: 'O primeiro passo para o equilíbrio emocional é o autoconhecimento. O ambiente corporativo expõe os profissionais a pressões constantes, prazos curtos e conflitos interpessoais. Entender como o corpo e a mente reagem a esses estímulos é fundamental para evitar a exaustão.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. O Mecanismo do Estresse no Trabalho',
              body: [
                'O primeiro passo para o equilíbrio emocional é o autoconhecimento. O ambiente corporativo expõe os profissionais a pressões constantes, prazos curtos e conflitos interpessoais. Entender como o corpo e a mente reagem a esses estímulos é fundamental para evitar a exaustão.',
                'O estresse é uma resposta biológica natural de preservação. No entanto, quando ativado de forma crônica no escritório (reação de "luta ou fuga"), ele libera cortisol e adrenalina continuamente, prejudicando o raciocínio lógico e a tomada de decisões.',
                '• Estresse Positivo (Eustresse): O nível de ativação saudável que gera motivação, foco e impulso para cumprir prazos.',
                '• Estresse Negativo (Distresse): A sobrecarga contínua que gera paralisia, irritabilidade, esquecimentos e exaustão física.'
              ],
              highlightBox: {
                type: 'info',
                title: 'Eustresse vs. Distresse',
                text: 'O eustresse é o nível produtivo de energia que nos move. O perigo é a sobrecarga constante sem descanso, que descamba para o distresse crônico.'
              }
            },
            {
              subheading: '2. Mapeamento de Gatilhos Individuais',
              body: [
                'Cada profissional reage de forma diferente aos estímulos do trabalho. O mapeamento consiste em identificar as situações específicas que desencadeiam picos de ansiedade:',
                '• Gatilhos Internos: Perfeccionismo extremo, medo de errar, síndrome do impostor e necessidade contínua de aprovação.',
                '• Gatilhos Externos: E-mails de cobrança, reuniões de última hora, sobrecarga de demandas e comunicação agressiva de terceiros.'
              ],
              asciiDiagram: `┌────────────────────────────────────────────────────────┐
│           MAPEAMENTO DE GATILHOS CORPORATIVOS          │
├────────────────────────────────────────────────────────┤
│ GATILHOS INTERNOS:                                     │
│ • Perfeccionismo ──► Medo de errar ──► Procrastinação  │
│ • Síndrome do Impostor ──► Insegurança contínua        │
├────────────────────────────────────────────────────────┤
│ GATILHOS EXTERNOS:                                     │
│ • Demandas urgentes ──► Sobrecarga ──► Desorganização  │
│ • Cobranças e prazos ──► Reação de Luta ou Fuga        │
└────────────────────────────────────────────────────────┘`
            }
          ]
        }
      },
      {
        id: 'sau-mod-2',
        number: 2,
        title: 'MÓDULO 2: Técnicas de Autorregulação e Gestão da Ansiedade',
        summary: 'A ansiedade manifesta-se quando a mente antecipa cenários futuros catastróficos. A autorregulação emocional reúne ferramentas práticas para trazer a atenção de volta ao presente e acalmar o sistema nervoso autônomo.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Técnicas Respiratórias para Redução Ansiolítica',
              body: [
                'A ansiedade manifesta-se quando a mente antecipa cenários futuros catastróficos. A autorregulação emocional reúne ferramentas práticas para trazer a atenção de volta ao presente e acalmar o sistema nervoso autônomo.',
                'A respiração é a ponte direta para ativar o sistema nervoso parassimpático, desacelerando os batimentos cardíacos:',
                '• Respiração Quadrada (Box Breathing): Inspirar em 4 segundos, reter o ar por 4 segundos, expirar em 4 segundos e manter os pulmões vazios por 4 segundos. Ideal para fazer antes de reuniões decisivas.',
                '• Técnica 4-7-8: Inspirar em 4 segundos, reter o ar por 7 segundos e soltar o ar lentamente pela boca durante 8 segundos.'
              ],
              highlightBox: {
                type: 'calc',
                title: 'Respiração Quadrada (Box Breathing)',
                text: 'Inspire em 4s ──► Segure em 4s ──► Expire em 4s ──► Pause em 4s. Pratique rodadas conscientes para normalizar batimentos e clarear o raciocínio.'
              }
            },
            {
              subheading: '2. Reestruturação Cognitiva',
              body: [
                'Diante de uma crise de ansiedade ou de um erro no projeto, a mente costuma criar distorções cognitivas (catastrofização). A reestruturação é o ato de questionar o pensamento ansiogênico com fatos concretos:',
                '• Pensamento Ansiogênico: "Apresentei o relatório com um dado incorreto, serei demitido imediatamente."',
                '• Questionamento Racional: "O dado foi corrigido a tempo? Qual é a probabilidade real de demissão por esse fato isolado? Qual o plano de ação prático agora?"'
              ],
              highlightBox: {
                type: 'warning',
                title: 'Fatos vs. Suposições',
                text: 'Não tome pensamentos catastróficos como certezas. Busque fatos observáveis e estruture um plano de resolução prático em vez de alimentar o pânico.'
              }
            }
          ]
        }
      },
      {
        id: 'sau-mod-3',
        number: 3,
        title: 'MÓDULO 3: Foco Profundo (Deep Work) e Atenção Plena',
        summary: 'A oscilação emocional corrói a capacidade de concentração. Em um ambiente repleto de notificações, manter o foco em tarefas complexas exige estratégias deliberadas de proteção mental.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. O Estado de Flow e o Trabalho Profundo (Deep Work)',
              body: [
                'O conceito de Deep Work (Trabalho Profundo), desenvolvido por Cal Newport, refere-se à capacidade de focar sem distrações em uma tarefa cognitivamente exigente.',
                '• Trabalho Superficial (Shallow Work): Tarefas mecânicas e operacionais (responder e-mails rápidos, organizar pastas) que exigem pouco esforço mental, mas consomem o dia.',
                '• Construção de Rituais de Foco: Eliminação de abas desnecessárias, bloqueio de notificações e definição de metas claras para o bloco de trabalho focado.'
              ]
            },
            {
              subheading: '2. Aplicação Prática do Mindfulness Corporativo',
              body: [
                'Atenção plena (Mindfulness) não significa "esvaziar a mente", mas observar os pensamentos e emoções sem julgamento imediato, ancorando-se na atividade presente.',
                'A Pausa Estratégica (Método STOP):',
                '• S (Stop): Pare o que está fazendo.',
                '• T (Take a breath): Tome uma respiração profunda.',
                '• O (Observe): Observe seus pensamentos e o seu corpo.',
                '• P (Proceed): Prossiga com clareza e intenção.'
              ],
              asciiDiagram: `┌────────────────────────────────────────────────────────┐
│               MÉTODO S.T.O.P. DE MINDFULNESS           │
├────────────────────────────────────────────────────────┤
│ [S] STOP: Pare imediatamente o que está fazendo        │
│ [T] TAKE A BREATH: Respire consciente e profundamente  │
│ [O] OBSERVE: Observe mente, emoções e corpo sem julgar │
│ [P] PROCEED: Prossiga com foco, calma e intenção clara │
└────────────────────────────────────────────────────────┘`
            }
          ]
        }
      },
      {
        id: 'sau-mod-4',
        number: 4,
        title: 'MÓDULO 4: Limites Saudáveis, Comunicação e Prevenção do Burnout',
        summary: 'O equilíbrio emocional sustentável depende da capacidade de estabelecer fronteiras claras entre a vida profissional e a vida pessoal, evitando o esgotamento extremo (Burnout).',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Estabelecimento de Fronteiras e Desconexão Digital',
              body: [
                'A hiperconectividade cria a falsa sensação de que tudo precisa ser respondido imediatamente.',
                '• Desconexão do Expediente: Definir um horário claro para encerrar a checagem de mensagens corporativas no celular pessoal.',
                '• Gestão de Expectativas: Comunicar à equipe os prazos reais de resposta e entrega, sem assumir compromissos inalcançáveis por medo de dizer "não".'
              ],
              highlightBox: {
                type: 'info',
                title: 'Comunicação Assertiva',
                text: 'Dizer "não" fundamentado com alternativas e prazos viáveis é sinal de maturidade profissional e respeito pela qualidade do trabalho.'
              }
            },
            {
              subheading: '2. Sinais de Alerta do Burnout',
              body: [
                'A Síndrome de Burnout é o estresse crônico não gerenciado no ambiente de trabalho. Reconhecer os sinais iniciais evita o colapso físico e emocional:',
                '• Estágio Inicial: Entusiasmo excessivo com negligência de necessidades básicas (sono, alimentação); sensação constante de falta de tempo e ansiedade aos domingos.',
                '• Estágio Avançado: Exaustão física e mental diária; cinismo, desconexão emocional com o trabalho e queda brusca de produtividade.'
              ],
              asciiDiagram: `┌────────────────────────────────────────────────────────┐
│             ESTÁGIOS DA SÍNDROME DE BURNOUT            │
├────────────────────────────────────────────────────────┤
│ ESTÁGIO INICIAL:                                       │
│ • Entusiasmo desmedido sem descanso                    │
│ • Negligência com sono e alimentação                   │
│ • Ansiedade aos domingos e falta de tempo              │
├────────────────────────────────────────────────────────┤
│ ESTÁGIO AVANÇADO:                                      │
│ • Exaustão física e mental diária                      │
│ • Cinismo, frieza e distanciamento da equipe           │
│ • Queda drástica de produtividade e esgotamento        │
└────────────────────────────────────────────────────────┘`
            }
          ]
        }
      }
    ],
    caseStudies: [],
    quiz: [
      {
        id: 1,
        question: 'Durante um dia de alta demanda no escritório, um colaborador percebe que sua respiração está acelerada e que não consegue se concentrar nas tarefas devido ao nervosismo. Qual técnica de autorregulação fisiológica é mais indicada para reativar a calma do sistema nervoso de forma rápida?',
        options: [
          'Ingerir bebidas estimulantes com alto teor de cafeína para acelerar o ritmo de trabalho.',
          'Ignorar os sinais do corpo e continuar digitando em velocidade máxima sem fazer pausas.',
          'Aplicar a técnica de Respiração Quadrada (Box Breathing), alternando inspiração, retenção, expiração e pausa em tempos iguais.',
          'Reclamar abertamente sobre a sobrecarga com os colegas de equipe durante o horário de pico.'
        ],
        correct: 2,
        explanation: 'A técnica de Respiração Quadrada (Box Breathing) reduz diretamente os níveis de excitação fisiológica provocados pela ansiedade, desacelerando a frequência cardíaca e ativando o sistema nervoso parassimpático para recuperar o controle consciente.'
      },
      {
        id: 2,
        question: 'A Síndrome de Burnout foi reconhecida como uma condição ocupacional resultante do estresse crônico no ambiente de trabalho. Qual das opções abaixo apresenta um sintoma característico dessa síndrome em seu estágio avançado?',
        options: [
          'Sensação diária de exaustão física/mental acompanhada de atitudes de cinismo e desapego ao trabalho.',
          'Aumento da criatividade e engajamento constante em novos projetos da empresa.',
          'Capacidade de manter o foco ininterrupto por 12 horas consecutivas sem apresentar fadiga.',
          'Facilidade em desligar-se das responsabilidades profissionais no exato momento em que encerra o expediente.'
        ],
        correct: 0,
        explanation: 'O Burnout é caracterizado pela tríade: exaustão emocional profunda, despersonalização/cinismo (desapego frio em relação às tarefas e colegas) e queda da percepção de eficácia profissional.'
      },
      {
        id: 3,
        question: 'O conceito de Deep Work (Trabalho Profundo) exige eliminar distrações para focar em tarefas cognitivamente complexas. Qual ação prática contribui diretamente para a criação de um ambiente favorável ao Deep Work?',
        options: [
          'Deixar os alertas sonoros do e-mail e do chat corporativo ativados na tela principal.',
          'Alternar a atenção a cada 5 minutos entre a escrita de um relatório e a navegação em redes sociais.',
          'Realizar chamadas de vídeo sem roteiro prévio enquanto tenta revisar planilhas complexas.',
          'Agendar o checamento de e-mails para horários específicos do dia e silenciar notificações durante o bloco de foco.'
        ],
        correct: 3,
        explanation: 'O Trabalho Profundo exige a eliminação de fragmentações na atenção. Definir blocos de tempo isolados e silenciar notificações previne a troca constante de contexto, permitindo hiperfoco e alta performance.'
      },
      {
        id: 4,
        question: 'Diante de um erro cometido em um projeto, a mente de um profissional ansioso pode gerar uma "distorção cognitiva", acreditando que o problema é uma catastrofização irreparável. Qual técnica ajuda a reestruturar esse pensamento de forma racional?',
        options: [
          'Aceitar o pensamento catastrófico como verdade absoluta e pedir demissão imediatamente.',
          'Questionar o pensamento ansiogênico buscando evidências concretas sobre o impacto real e focando no plano de ação para correção.',
          'Esconder o erro da equipe na esperança de que ninguém perceba a falha.',
          'Culpar publicamente outros colegas pelo ocorrido para preservar a própria imagem.'
        ],
        correct: 1,
        explanation: 'A Reestruturação Cognitiva combate vieses de catastrofização substituindo suposições por fatos. Analisar o erro objetivamente e construir uma solução prática reduz a ansiedade e restaura o senso de controle.'
      },
      {
        id: 5,
        question: 'O acrônimo S.T.O.P. representa uma pausa consciente no meio da rotina para recuperar a clareza e o equilíbrio emocional. O que significa a letra "O" nessa metodologia de Mindfulness?',
        options: [
          'Observar os pensamentos, emoções e sensações corporais sem julgamento imediato.',
          'Omitir os sentimentos negativos até o fim da semana.',
          'Optimizar o tempo eliminando o horário de almoço.',
          'Organizar a mesa de trabalho descartando papéis antigos.'
        ],
        correct: 0,
        explanation: 'No método S.T.O.P. (Stop, Take a breath, Observe, Proceed), o passo Observe orienta o indivíduo a tomar consciência de seus estados internos (pensamentos, emoções, tensão muscular) com curiosidade e sem auto-julgamento.'
      },
      {
        id: 6,
        question: 'Para manter a saúde mental e prevenir o esgotamento no ambiente de trabalho, o estabelecimento de limites saudáveis é indispensável. Qual postura reflete o estabelecimento de uma fronteira profissional assertiva?',
        options: [
          'Responder mensagens de trabalho no aplicativo pessoal de mensagens às 23 horas de um domingo.',
          'Aceitar todas as solicitações de última hora recebidas, mesmo quando impossibilitam o cumprimento dos prazos já acordados.',
          'Desligar o telefone corporativo durante o horário de expediente normal sem avisar a equipe.',
          'Comunicar com clareza a capacidade atual de entregas, renegociar prazos com a liderança e respeitar os horários de descanso.'
        ],
        correct: 3,
        explanation: 'Ter assertividade emocional significa alinhar expectativas e prioridades de forma transparente com a equipe. Dizer "não" fundamentado ou renegociar prazos protege a qualidade das entregas e a saúde mental do profissional.'
      },
      {
        id: 7,
        question: 'O estresse é uma reação biológica do organismo que pode ser dividida entre "eustresse" e "distresse". Qual a principal característica do eustresse?',
        options: [
          'É o estágio final de esgotamento físico que exige afastamento médico imediato.',
          'Trata-se do sentimento constante de pânico acompanhado de insônia crônica.',
          'É a forma saudável e positiva de estresse, que mobiliza energia, melhora o foco e motiva a resolução de desafios.',
          'É a incapacidade total de sentir qualquer tipo de emoção durante reuniões de trabalho.'
        ],
        correct: 2,
        explanation: 'O Eustresse (estresse positivo) é o nível moderado de ativação necessário para nos manter alertas, motivados e engajados na superação de metas e desafios do dia a dia, diferindo do estresse crônico nocivo (distresse).'
      }
    ]
  },

  // =========================================================================
  // Aliases para acesso direto a Equilíbrio Emocional
  {
    ...CURSO_EQUILIBRIO_EMOCIONAL,
    id: 'equilibrio-emocional'
  },
  {
    ...CURSO_EQUILIBRIO_EMOCIONAL,
    id: 'curso-equilibrio-emocional'
  },
  {
    ...CURSO_EQUILIBRIO_EMOCIONAL,
    id: 'ia-produtividade',
    title: 'Inteligência Artificial e Automação no Dia a Dia de Trabalho'
  },
  {
    ...CURSO_EQUILIBRIO_EMOCIONAL,
    id: 'curso-inteligencia-artificial-automacao',
    title: 'Inteligência Artificial e Automação no Dia a Dia de Trabalho'
  },
  {
    ...CURSO_EQUILIBRIO_EMOCIONAL,
    id: 'soft-skills-comunicacao-interpessoal',
    title: 'Soft Skills e Comunicação Interpessoal'
  },
  {
    ...CURSO_EQUILIBRIO_EMOCIONAL,
    id: 'curso-soft-skills',
    title: 'Soft Skills e Comunicação Interpessoal'
  },
  {
    ...CURSO_EQUILIBRIO_EMOCIONAL,
    id: 'rotinas-administrativas',
    title: 'Rotinas Administrativas e Organização de Processos de Escritório'
  },
  {
    ...CURSO_EQUILIBRIO_EMOCIONAL,
    id: 'rotinas-processos-escritorio',
    title: 'Rotinas Administrativas e Organização de Processos de Escritório'
  },
  {
    ...CURSO_EQUILIBRIO_EMOCIONAL,
    id: 'gestao-tempo-produtividade',
    title: 'Gestão do Tempo e Produtividade'
  },
  {
    ...CURSO_EQUILIBRIO_EMOCIONAL,
    id: 'curso-gestao-tempo-produtividade',
    title: 'Gestão do Tempo e Produtividade'
  },
  {
    ...CURSO_EQUILIBRIO_EMOCIONAL,
    id: 'inteligencia-emocional',
    title: 'Inteligência Emocional no Trabalho'
  },
  {
    ...CURSO_EQUILIBRIO_EMOCIONAL,
    id: 'curso-inteligencia-emocional',
    title: 'Inteligência Emocional no Trabalho'
  },

  // 17. COMUNICAÇÃO ESCRITA, E-MAILS E REDAÇÃO CORPORATIVA
  // =========================================================================
  {
    id: 'curso-comunicacao-corporativa',
    videoUrl: 'https://youtu.be/Lt4zabLCJ9I?si=NpcDLAKgOkQYGDF9',
    youtubeId: 'Lt4zabLCJ9I',
    trackId: 'trilha-2',
    trackName: 'TRILHA 2: Soft Skills, Postura & Comunicação Corporativa',
    category: 'Desenvolvimento Pessoal',
    targetAudienceType: ['PRIMEIRO_EMPREGO', 'JOVEM_APRENDIZ', 'ESTUDANTE'],
    title: 'Comunicação Escrita, E-mails e Redação Corporativa',
    subtitle: 'Capacitar profissionais a redigir mensagens corporativas claras, concisas e assertivas, dominando a estrutura de e-mails profissionais, relatórios executivos e comunicados internos, prevenindo ruídos de comunicação e fortalecendo a imagem institucional.',
    hours: 12,
    equivalentHours: 12,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Jovens aprendizes, estagiários e profissionais em início de carreira buscando clareza, concisão e profissionalismo na escrita corporativa',
    prerequisites: 'Nenhum pré-requisito.',
    badgeName: 'Comunicação Escrita & E-mails',
    badgeCategory: 'Comunicação Corporativa',
    badgeIcon: 'Mail',
    accentColor: '#EC4899',
    level: 'Intermediário',
    learningObjectives: [
      'Dominar a técnica da Pirâmide Invertida na escrita profissional, transmitindo informações prioritárias com clareza, objetividade e sem prolixidade.',
      'Aplicar regras gramaticais essenciais e pontuação estratégica no dia a dia corporativo (há vs. a, anexo vs. em anexo, crase e concordância).',
      'Construir e-mails profissionais de alta performance com linhas de assunto eficazes, uso correto de Para/Cc/Cco e chamadas para ação (CTA) claras com prazos.',
      'Elaborar relatórios executivos, memorandos objetivos, comunicados gerais e atas de reunião com foco em decisões e planos de ação.',
      'Adotar boas práticas de comunicação escrita em canais instantâneos (Slack, Teams, WhatsApp), gerenciar mensagens difíceis e respeitar limites de horário.'
    ],
    modules: [
      {
        id: 'com-corp-mod-1',
        number: 1,
        title: 'MÓDULO 1: Fundamentos da Redação Corporativa e Clareza Textual',
        summary: 'A comunicação escrita no ambiente de trabalho deve ser focada em transmitir a mensagem com o menor gasto de tempo possível do leitor, sem perder o profissionalismo.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Princípios da Comunicação Direta e Objetiva',
              body: [
                'A comunicação escrita no ambiente de trabalho deve ser focada em transmitir a mensagem com o menor gasto de tempo possível do leitor, sem perder o profissionalismo.',
                'A Regra da Pirâmide Invertida: Posicionar a informação mais importante (a conclusão, decisão ou solicitação principal) logo no primeiro parágrafo do texto, garantindo compreensão instantânea.',
                'Eliminação de Vícios e Pleonasmos: Substituir formulações prolixas e arcaicas (\"Venho por meio deste informar que...\") por construções diretas e dinâmicas (\"Informamos que...\").',
                'Adequação ao Tom da Empresa: Equilibrar a comunicação entre o formalismo excessivo (linguagem engessada e arcaica) e a informalidade inadequada (gírias, abreviações e emojis excessivos).'
              ]
            },
            {
              subheading: '2. Gramática Aplicada ao Cotidiano de Escritório',
              body: [
                'Pontuação Estratégica: Emprego consciente de vírgulas, dois-pontos e ponto e vírgula para estruturar ideias em tópicos (bullet points) de fácil escaneamento visual.',
                'Erros Gramaticais Frequentes no Trabalho:',
                '• Há vs. A: \"Há\" para tempo decorrido (\"Trabalho aqui há dois anos\") e \"a\" para tempo futuro ou distância (\"A reunião será daqui a pouco\").',
                '• A fim de vs. Afim: \"A fim de\" indica finalidade/objetivo; \"afim\" indica semelhança/afinidade.',
                '• Anexo vs. Em anexo: O adjetivo \"anexo\" concorda com o substantivo (\"Seguem anexos os relatórios\"); a locução \"em anexo\" é invariável (\"Seguem em anexo os relatórios\").',
                '• Regras de Crase: Uso correto antes de palavras femininas e em locuções prepositivas de tempo/lugar.'
              ]
            }
          ]
        }
      },
      {
        id: 'com-corp-mod-2',
        number: 2,
        title: 'MÓDULO 2: Estruturação de E-mails Profissionais Eficientes',
        summary: 'O e-mail continua sendo o canal oficial de registros e tomadas de decisão nas empresas.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Anatomia de um E-mail de Alta Performance',
              body: [
                'Assunto Efetivo (Subject Line): Criação de linhas de assunto objetivas e contextuais que garantem abertura e priorização imediata (ex: [APROVAÇÃO] Relatório de Vendas - Agosto/2026).',
                'Saudação e Fechamento: Fórmulas adequadas de início (Prezado(a), Olá, Bom dia) e encerramento (Atenciosamente, Cordialmente) alinhadas à hierarquia e proximidade corporativa.',
                'Uso Correto dos Campos de Envio:',
                '• Para: Destinatários principais diretamente responsáveis pela ação solicitada.',
                '• Cc (Com Cópia): Pessoas que precisam apenas se manter informadas sobre o andamento do assunto.',
                '• Cco (Cópia Oculta): Envio para listas amplas com preservação de privacidade dos e-mails ou comunicação discreta sem expor contatos aos demais.'
              ]
            },
            {
              subheading: '2. Chamada para Ação (Call to Action - CTA) e Prazos',
              body: [
                'Clareza nos Próximos Passos: Deixar explícito quem deve executar cada tarefa e até qual data e horário limite.',
                'Técnica de Destaque Visual: Aplicação estratégica de negritos, numerações e espaçamentos para facilitar a leitura rápida em telas de celulares e computadores.'
              ]
            }
          ]
        }
      },
      {
        id: 'com-corp-mod-3',
        number: 3,
        title: 'MÓDULO 3: Redação de Documentos Executivos e Técnicos',
        summary: 'Para além do e-mail, o profissional precisa dominar a escrita de documentos formais para registro de processos e reuniões.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Elaboração de Relatórios e Memorandos',
              body: [
                'Estrutura Básica de Relatórios: Contextualização do problema, Diagnóstico com dados quantitativos, Conclusão lógica e Recomendações práticas.',
                'Transformação de Dados em Narrativa (Data Storytelling): Como traduzir tabelas numéricas complexas e gráficos em parágrafos simples e explicativos para a liderança executiva.'
              ]
            },
            {
              subheading: '2. Atas de Reunião e Comunicados Internos',
              body: [
                'Atas Objetivas: Registro sintético e factual estruturado em: Lista de Presentes, Principais Tópicos Discutidos e Plano de Ação (O quê + Quem + Quando).',
                'Comunicados Gerais: Redação institucional para toda a empresa com linguagem clara, acolhedora, precisa e sem margem para interpretações ambíguas.'
              ]
            }
          ]
        }
      },
      {
        id: 'com-corp-mod-4',
        number: 4,
        title: 'MÓDULO 4: Comunicação Escrita em Situações Críticas e Canais Instantâneos',
        summary: 'Como gerenciar conflitos por escrito e utilizar ferramentas como Slack, Microsoft Teams e WhatsApp Corporativo sem perder o tom profissional.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Gestão de Mensagens Difíceis e Assertivas',
              body: [
                'Tratamento de Reclamações e Erros: Respostas a clientes ou gestores assumindo responsabilidades com profissionalismo, empatia e propostas focadas na resolução ágil do problema.',
                'Atrasos e Pedidos de Adiamento: Como solicitar novas datas e horários de forma transparente, fundamentada em fatos e com compromisso renovado de entrega.'
              ]
            },
            {
              subheading: '2. Etiqueta nas Ferramentas de Mensagem Instantânea',
              body: [
                'A Regra do Parágrafo Único: Evitar o envio fragmentado de múltiplas mensagens curtas (\"Oi\", \"Tudo bem?\", \"Pode falar?\"). Reúna saudação, contexto da dúvida e solicitação em um único texto completo e fluido.',
                'Limites de Horário e Desconexão: Respeito à jornada de trabalho e ao descanso dos colegas ao agendar envios fora do expediente convencional.'
              ]
            }
          ]
        }
      }
    ],
    caseStudies: [],
    quiz: [
      {
        id: 1,
        question: 'Um analista precisa enviar um e-mail urgente para a equipe solicitando a validação de um orçamento até o final do dia. Qual das alternativas apresenta a \"Linha de Assunto\" mais adequada segundo as boas práticas de redação corporativa?',
        options: [
          'Aviso importante favor ler urgente!!!',
          'Orçamento',
          '[AÇÃO NECESSÁRIA] Validação do Orçamento do Projeto X - Prazo: 18h',
          'Oi pessoal, tudo bem? Dêem uma olhada nisso aqui quando der.'
        ],
        correct: 2,
        explanation: 'A alternativa C utiliza a tag visual [AÇÃO NECESSÁRIA], indica o assunto exato do e-mail e define o prazo limite (18h), permitindo que o leitor priorize a mensagem imediatamente.'
      },
      {
        id: 2,
        question: 'Ao redigir um e-mail anexando um relatório financeiro, qual das frases abaixo está gramaticalmente correta para indicar a presença do documento?',
        options: [
          'Seguem em anexo os relatórios financeiros do mês de julho.',
          'Segue em anexos os relatórios financeiros do mês de julho.',
          'Seguem em anexas as relatórios financeiros do mês de julho.',
          'Segue anexos os relatórios financeiros do mês de julho.'
        ],
        correct: 0,
        explanation: 'A expressão \"em anexo\" é invariável (permanece \"em anexo\" no singular ou plural). Como o sujeito \"os relatórios\" está no plural, o verbo concorda no plural: \"Seguem em anexo os relatórios...\".'
      },
      {
        id: 3,
        question: 'A aplicação da técnica da \"Pirâmide Invertida\" na escrita de um e-mail corporativo exige qual estrutura de organização do texto?',
        options: [
          'Iniciar o e-mail com histórias longas e detalhes históricos antes de chegar ao ponto principal.',
          'Colocar a informação mais relevante, a conclusão ou a solicitação principal logo no primeiro parágrafo do texto.',
          'Escrever todo o conteúdo no campo de assunto do e-mail para economizar espaço no corpo da mensagem.',
          'Ocultar a intenção do e-mail até a última linha para gerar suspense no leitor.'
        ],
        correct: 1,
        explanation: 'A Pirâmide Invertida é uma técnica jornalística e corporativa que posiciona a ideia principal no topo do texto, respeitando o tempo do leitor e garantindo que o objetivo da mensagem seja compreendido rapidamente.'
      },
      {
        id: 4,
        question: 'No uso corporativo de e-mails, para que serve o campo \"Cco\" (Cópia Oculta)?',
        options: [
          'Para enviar mensagens que devem ser apagadas automaticamente em 24 horas.',
          'Para incluir destinatários que devem responder obrigatoriamente a todos da lista.',
          'Para enviar um e-mail a múltiplos destinatários garantindo a privacidade de seus endereços ou para informar alguém de forma discreta sem expor seu e-mail aos demais.',
          'Para sinalizar que o e-mail contém vírus ou arquivos corrompidos.'
        ],
        correct: 2,
        explanation: 'O campo Cco (Cópia Oculta) oculta os endereços dos destinatários, sendo essencial para manter a privacidade em envios em massa e evitar o vazamento de contatos.'
      },
      {
        id: 5,
        question: 'Ao utilizar aplicativos de comunicação instantânea corporativa (como Microsoft Teams, Slack ou WhatsApp), qual comportamento reflete uma boa etiqueta de comunicação escrita?',
        options: [
          'Enviar dez mensagens consecutivas contendo apenas uma palavra em cada uma delas (ex: \"Oi\", \"Tudo bem?\", \"Preciso\", \"De\", \"Uma\", \"Ajuda\").',
          'Agrupar a saudação, o contexto e a dúvida/solicitação em uma única mensagem clara e completa.',
          'Enviar áudios de 10 minutos para explicar tarefas simples que poderiam ser descritas em duas linhas de texto.',
          'Utilizar caixa alta (letras maiúsculas) em todo o texto para garantir que as pessoas leiam mais rápido.'
        ],
        correct: 1,
        explanation: 'Agrupar a mensagem completa evita notificações fragmentadas e permite que o interlocutor entenda o contexto e responda de forma ágil e estruturada.'
      },
      {
        id: 6,
        question: 'Em um comunicado oficial sobre a alteração do horário de funcionamento do escritório, a redação deve focar prioritariamente em qual característica textual?',
        options: [
          'Objetividade, precisão das informações e ausência de ambiguidades nos horários e datas indicados.',
          'Uso abundante de metáforas, poesias e figuras de linguagem para tornar a leitura divertida.',
          'Uso de jargões técnicos complexos que apenas a diretoria consegue entender.',
          'Escrita informal com abreviações da internet como \"vc\", \"tbm\" e \"pq\".'
        ],
        correct: 0,
        explanation: 'Comunicados oficiais exigem clareza absoluta, exatidão de datas e horários e ausência de ambiguidades para evitar mal-entendidos operacionais na equipe.'
      },
      {
        id: 7,
        question: 'Um profissional precisa solicitar a prorrogação de um prazo de entrega ao seu gestor de forma assertiva. Qual estrutura de mensagem representa a melhor abordagem escrita?',
        options: [
          'Não vou conseguir entregar no prazo porque estou com muitos problemas pessoais. Depois eu entrego.',
          'Conforme acompanhado, identificamos uma complexidade extra na etapa Y. Proponho o envio da entrega ajustada para a próxima terça-feira às 14h, mantendo a qualidade do projeto.',
          'Fingir que esqueceu o prazo e só responder se o gestor cobrar no dia seguinte.',
          'Enviar o relatório incompleto e com erros na data do prazo original sem avisar nada.'
        ],
        correct: 1,
        explanation: 'A alternativa B é profissional e assertiva: apresenta a justificativa baseada em fatos, demonstra compromisso com a qualidade e propõe uma nova data e hora concretas para a entrega.'
      }
    ]
  },

  // =========================================================================
  // 18. ATENDIMENTO AO PÚBLICO E TÉCNICAS DE RELACIONAMENTO
  // =========================================================================
  {
    ...CURSO_ATENDIMENTO_RELACIONAMENTO_CLIENTE,
    id: 'curso-atendimento-publico',
    trackId: 'trilha-2',
    trackName: 'TRILHA 2: Soft Skills, Postura & Comunicação Corporativa',
    category: 'Desenvolvimento Pessoal',
    targetAudienceType: ['JOVEM_APRENDIZ', 'PRIMEIRO_EMPREGO'],
    title: 'Atendimento ao Público e Técnicas de Relacionamento',
    subtitle: 'Excelência no atendimento telefônico, presencial e por chat, escuta ativa e resolução de dúvidas',
    hours: 8,
    equivalentHours: 8,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Aprendizes em funções de recepção, atendimento ao cliente e suporte',
    prerequisites: 'Nenhum.',
    badgeName: 'Excelência em Atendimento',
    badgeCategory: 'Atitude Profissional',
    badgeIcon: 'Headphones',
    accentColor: '#EC4899',
    level: 'Iniciante',
    learningObjectives: [
      'Atender chamadas telefônicas com cordialidade e padrão corporativo.',
      'Praticar escuta ativa para entender o problema do cliente antes de responder.',
      'Lidar com reclamações com empatia e tranquilidade.'
    ],
    modules: [
      {
        id: 'ate-mod-1',
        number: 1,
        title: 'MÓDULO 1: Princípios do Atendimento Humanizado',
        summary: 'Saudação acolhedora, empatia e clareza na transmissão de informações.',
        estimatedMinutes: 30,
        content: {
          sections: [
            {
              subheading: '1.1 Abertura do Atendimento',
              body: [
                'Sempre cumprimente com energia positiva: "Bom dia! Meu nome é Lucas, em que posso ajudar hoje?". Anote o nome do cliente e use-o com respeito durante a conversa.'
              ]
            }
          ]
        }
      }
    ],
    caseStudies: [],
    quiz: [
      {
        id: 1,
        question: 'Qual a primeira atitude ao atender um cliente que está chateado com uma demora?',
        options: [
          'Interrompê-lo e dizer que a culpa não é sua.',
          'Ouvir atentamente com empatia, demonstrar que compreende a frustração e buscar resolver o problema.',
          'Desligar o telefone.',
          'Rir da situação.'
        ],
        correct: 1,
        explanation: 'A escuta empática desarma a tensão e permite focar na solução rápida do problema.'
      }
    ]
  },

  // =========================================================================
  // 19. COMUNICAÇÃO NÃO-VIOLENTA (CNV) E EMPATIA NO TRABALHO
  // =========================================================================
  {
    id: 'curso-comunicacao-nao-violenta',
    trackId: 'trilha-2',
    trackName: 'TRILHA 2: Soft Skills, Postura & Comunicação Corporativa',
    category: 'Desenvolvimento Pessoal',
    targetAudienceType: ['JOVEM_APRENDIZ', 'ESTUDANTE', 'PRIMEIRO_EMPREGO'],
    title: 'Comunicação Não-Violenta (CNV) e Empatia no Trabalho',
    subtitle: 'Capacitar profissionais a aplicar os princípios da Comunicação Não-Violenta (CNV) no ambiente corporativo, transformando conflitos em colaboração, aprimorando a escuta ativa e fortalecendo a empatia e a clareza nas relações de trabalho.',
    hours: 12,
    equivalentHours: 12,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Jovens aprendizes, estagiários e profissionais que buscam aprimorar suas relações interpessoais, transformar conflitos em cooperação e desenvolver postura empática no trabalho',
    prerequisites: 'Nenhum pré-requisito.',
    badgeName: 'CNV & Empatia no Trabalho',
    badgeCategory: 'Comunicação & Relacionamento',
    badgeIcon: 'HeartHandshake',
    accentColor: '#EC4899',
    level: 'Intermediário',
    learningObjectives: [
      'Dominar os 4 pilares da Comunicação Não-Violenta sistematizados por Marshall Rosenberg: Observação, Sentimento, Necessidade e Pedido.',
      'Diferenciar fatos objetivos e observações puras de avaliações, rótulos e julgamentos pessoais no ambiente profissional.',
      'Praticar a escuta ativa e empática, desarmando comunicações agressivas e entendendo críticas como expressões de necessidades não atendidas.',
      'Estruturar feedbacks empáticos orientados ao desenvolvimento mútuo e receber feedbacks difíceis sem adotar postura defensiva.',
      'Estabelecer limites com assertividade, diferenciando agressividade e passividade e dominando a arte do \\"não\\" fundamentado.'
    ],
    modules: [
      {
        id: 'cnv-mod-1',
        number: 1,
        title: 'MÓDULO 1: Os 4 Pilares da Comunicação Não-Violenta (CNV)',
        summary: 'A Comunicação Não-Violenta, sistematizada por Marshall Rosenberg, é uma abordagem prática para criar conexões autênticas e resolver divergências sem agressividade ou submissão.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Observação sem Julgamento vs. Avaliação',
              body: [
                'A maioria dos conflitos corporativos começa quando misturamos fatos concretos com interpretações pessoais.',
                'Observação Pura: Descrever apenas o que pode ser visto ou ouvido, sem adjetivos ou julgamentos de valor (ex: \\"Você entregou o relatório dois dias após o prazo combinado\\").',
                'Avaliação/Julgamento: Adicionar interpretações ou rótulos à situação (ex: \\"Você é descompromissado com os prazos do projeto\\").'
              ]
            },
            {
              subheading: '2. Sentimentos, Necessidades e Pedidos Claros',
              body: [
                'Identificação de Sentimentos: Reconhecer como nos sentimos diante de um fato (ex: frustrado, preocupado, inseguro), sem culpar o outro por essa emoção.',
                'Mapeamento de Necessidades: Compreender qual necessidade humana fundamental não está sendo atendida (ex: clareza, previsibilidade, respeito, cooperação).',
                'Formulação de Pedidos Concretos: Fazer solicitações claras, factíveis e afirmativas em vez de exigências vagas (ex: \\"Podemos alinhar o status deste projeto diariamente às 09h por 5 minutos?\\").'
              ]
            }
          ]
        }
      },
      {
        id: 'cnv-mod-2',
        number: 2,
        title: 'MÓDULO 2: Escuta Ativa, Empatia e Desarmamento de Conflitos',
        summary: 'Comunicar-se bem exige escutar na mesma proporção em que se fala. A escuta empática desarma a defensiva e estabelece confiança mútua.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. A Escuta Empática no Ambiente Corporativo',
              body: [
                'Escutar de forma empática não significa concordar passivamente com tudo, mas demonstrar que a perspectiva do outro foi verdadeiramente compreendida.',
                'Os Obstáculos da Escuta: Evitar o hábito de dar conselhos não solicitados, minimizar o sentimento alheio (\\"Isso não é nada\\") ou interromper para contar uma experiência própria.',
                'Parafrasear e Validar: Reorganizar com suas próprias palavras o que o outro disse para confirmar o entendimento (ex: \\"Entendo que você está preocupado com o prazo porque precisa desses dados para a reunião do conselho?\\").'
              ]
            },
            {
              subheading: '2. Desarmando Comunicações Agressivas',
              body: [
                'Quando um colega ou cliente se expressa com raiva ou ironia, a reação automática costuma ser o ataque ou a esquiva.',
                'Tradução da Agressividade: Enxergar críticas e ataques como \\"expressões trágicas\\" de necessidades não atendidas no trabalho.',
                'Manutenção do Foco nos Fatos: Responder ao conteúdo real da demanda sem reagir ao tom emocionalmente carregado do interlocutor.'
              ]
            }
          ]
        }
      },
      {
        id: 'cnv-mod-3',
        number: 3,
        title: 'MÓDULO 3: Feedback Empático e Alinhamento de Expectativas',
        summary: 'Dar e receber feedback é essencial para o crescimento profissional, mas exige técnica para evitar que o momento seja percebido como uma punição.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. Estruturação do Feedback no Modelo CNV',
              body: [
                'Substituir termos vagos ou acusações por uma narrativa focada em desenvolvimento e cooperação:',
                '• [1. Observação do Fato] ──► \\"Na reunião de ontem, você interrompeu o cliente três vezes...\\"',
                '• [2. Expressão de Impacto] ──► \\"...fiquei preocupado com a imagem de alinhamento da equipe...\\"',
                '• [3. Necessidade Corporativa] ──► \\"...pois precisamos transmitir total escuta e profissionalismo.\\"',
                '• [4. Pedido Concreto] ──► \\"Podemos combinar de anotar as dúvidas e apresentá-las ao final?\\"'
              ]
            },
            {
              subheading: '2. Recebendo Feedbacks Difíceis sem Defensiva',
              body: [
                'Separar Identidade de Comportamento: Entender que um feedback pontual sobre uma tarefa não define sua competência profissional como um todo.',
                'Investigação Curiosa: Fazer perguntas esclarecedoras para extrair fatos concretos do feedback recebido, mesmo quando ele vier de forma vaga.'
              ]
            }
          ]
        }
      },
      {
        id: 'cnv-mod-4',
        number: 4,
        title: 'MÓDULO 4: Estabelecimento de Limites com Assertividade e Respeito',
        summary: 'Ser empático não significa aceitar sobrecarga de trabalho ou comportamentos inadequados. A CNV oferece ferramentas para impor limites firmes com educação.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1. A Diferença entre Agressividade, Passividade e Assertividade',
              body: [
                'Passividade: Calar-se diante de excessos, acumulando ressentimento e ansiedade.',
                'Agressividade: Impor vontades por meio de intimidação, sarcasmo ou elevação do tom de voz.',
                'Assertividade (CNV): Expressar limites com clareza, mantendo o respeito por si mesmo e pelo interlocutor.'
              ]
            },
            {
              subheading: '2. A Arte do \\"Não\\" Fundamentado',
              body: [
                'Como recusar demandas extras sem gerar atritos desnecessários na equipe:',
                '• Acolher a Necessidade do Outro: Demonstrar compreensão sobre a urgência do pedido.',
                '• Apresentar a Realidade de Forma Objetiva: Explicar a prioridade atual e os limites de capacidade com base em dados de agenda.',
                '• Oferecer Alternativas Construtivas: Propor novos prazos ou redistribuição de tarefas em vez de uma simples recusa fechada.'
              ]
            }
          ]
        }
      }
    ],
    caseStudies: [],
    quiz: [
      {
        id: 1,
        question: 'Durante uma reunião de equipe, um colaborador deseja fazer uma crítica construtiva sobre o atraso recorrente de um colega na entrega de planilhas. Qual das frases abaixo representa uma \\"Observação Pura\\" segundo os conceitos da CNV?',
        options: [
          'Você é uma pessoa totalmente desorganizada com os horários da equipe.',
          'Você claramente não se importa com o impacto do seu atraso no meu trabalho.',
          'Sua falta de compromisso com a empresa está prejudicando a todos nós.',
          'Percebi que as últimas três planilhas foram enviadas após o horário limite combinado na segunda-feira.'
        ],
        correct: 3,
        explanation: 'A opção D descreve um fato mensurável e objetivo (envio de três planilhas após o horário) sem adicionar rótulos morais ou adjetivos julgadores, caracterizando a Observação Pura no modelo da CNV.'
      },
      {
        id: 2,
        question: 'O segundo componente da Comunicação Não-Violenta refere-se à identificação dos \\"Sentimentos\\". Qual das alternativas apresenta a correta nomeação de um sentimento genuíno sem embutir um julgamento velado sobre a outra pessoa?',
        options: [
          'Sinto-me apreensivo e sobrecarregado com o volume de entregas desta semana.',
          'Sinto que você está tentando me sabotar diante da liderança.',
          'Sinto-me completamente ignorado por você nesta sala.',
          'Sinto que a equipe é incompetente para gerenciar este projeto.'
        ],
        correct: 0,
        explanation: '\\"Apreensivo\\" e \\"sobrecarregado\\" são sentimentos legítimos e focados na própria experiência do indivíduo. As demais opções usam a expressão \\"Sinto que...\\" para mascarar julgamentos sobre os outros (\\"sinto que você me ignora\\", \\"sinto que são incompetentes\\").'
      },
      {
        id: 3,
        question: 'A escuta empática é uma habilidade central na CNV. Quando um colega desabafa sobre uma dificuldade no trabalho, qual atitude caracteriza uma verdadeira escuta empática?',
        options: [
          'Interromper imediatamente para contar uma história pessoal mais difícil que ocorreu com você.',
          'Escutar com atenção total, validando os sentimentos expostos e confirmando o entendimento sem julgamentos imediatos.',
          'Oferecer soluções prontas antes mesmo de o colega terminar de explicar o que está sentindo.',
          'Minimizar o problema dizendo que o colega está exagerando e que a situação não é importante.'
        ],
        correct: 1,
        explanation: 'A escuta empática exige presença e acolhimento. Ela foca em compreender a perspectiva do interlocutor e parafrasear sua mensagem, evitando conselhos precipitados, interrupções ou minimização de dores.'
      },
      {
        id: 4,
        question: 'Um gestor precisa solicitar a um liderado que revise um relatório antes de enviá-lo ao diretor. Como essa solicitação deve ser estruturada para ser considerada um \\"Pedido Concreto e Afirmativo\\" no modelo da CNV?',
        options: [
          'Preciso que você pare de ser desatento quando produz os relatórios da área.',
          'Espero que você melhore a qualidade do seu trabalho o mais rápido possível.',
          'Você poderia reexaminar os números da seção 3 e me enviar a versão atualizada até às 15h?',
          'Tente não cometer os mesmos erros de sempre na apresentação de hoje.'
        ],
        correct: 2,
        explanation: 'Um Pedido Concreto e Afirmativo indica com clareza a ação esperada (reexaminar a seção 3), estabelece um prazo viável (até às 15h) e foca no que deve ser feito, e não no que deve ser evitado.'
      },
      {
        id: 5,
        question: 'No contexto da CNV, como as expressões de raiva, agressividade ou ironia do interlocutor devem ser interpretadas para evitar reações defensivas?',
        options: [
          'Como demonstrações trágicas de necessidades e frustrações que não estão sendo atendidas.',
          'Como um ataque pessoal direto que exige uma resposta agressiva imediata para impor respeito.',
          'Como provas definitivas de que a pessoa é incapaz de trabalhar em equipe.',
          'Como um sinal claro de que você deve se calar e aceitar qualquer tipo de tratamento.'
        ],
        correct: 0,
        explanation: 'Marshall Rosenberg ensina que toda agressividade é a manifestação indireta e ineficiente de uma necessidade humana não atendida (ex: necessidade de apoio, clareza ou consideração). Reconhecer isso evita a postura defensiva.'
      },
      {
        id: 6,
        question: 'Ao aplicar o feedback estruturado no modelo CNV, qual é a sequência correta dos quatro componentes que devem guiar a conversa?',
        options: [
          'Julgamento, Punição, Exigência e Encerramento.',
          'Sentimento, Desculpa, Solução e Cobrança.',
          'Observação, Sentimento, Necessidade e Pedido.',
          'Avaliação, Diagnóstico, Comparação e Ordem.'
        ],
        correct: 2,
        explanation: 'A estrutura metodológica da CNV é composta estritamente pela sequência: 1. Observação (fatos), 2. Sentimento (emoções suscitadas), 3. Necessidade (valores/desejos fundamentais) e 4. Pedido (solicitação viável).'
      },
      {
        id: 7,
        question: 'Um profissional é solicitado a assumir um novo projeto de última hora, mas sua agenda já está 100% comprometida com entregas prioritárias. Como dizer \\"não\\" de forma assertiva e alinhada à CNV?',
        options: [
          'Acolher a necessidade da demanda, apresentar os prazos já assumidos e propor uma reavaliação de prioridades ou prazos com a liderança.',
          'Aceitar a demanda imediatamente, mesmo sabendo que não conseguirá entregar dentro do prazo.',
          'Recusar de forma ríspida dizendo que não é pago para fazer o trabalho dos outros.',
          'Ignorar as mensagens de solicitação e fingir que não recebeu o e-mail corporativo.'
        ],
        correct: 0,
        explanation: 'Dizer \\"não\\" de forma empática e assertiva envolve reconhecer a importância da solicitação, expor a realidade da capacidade de entregas com fatos concretos da agenda e negociar alternativas com o solicitante.'
      }
    ]
  }

];




























export const COURSES_DATA = COURSES;
export const catalogCourses = COURSES;
export const EXCEL_AVANCADO_DATA = CURSO_EXCEL_AVANCADO_ANALISE_DADOS;

export const ATENDIMENTO_CLIENTE_DATA = CURSO_ATENDIMENTO_RELACIONAMENTO_CLIENTE;

export const POWER_BI_DATA = CURSO_ANALISE_DADOS_POWER_BI;

export const GESTAO_PROJETOS_DATA = CURSO_GESTAO_ESTRATEGICA_PROJETOS;

export const INTELIGENCIA_NEGOCIOS_DATA = CURSO_INTELIGENCIA_NEGOCIOS_INDICADORES;

export const TRANSFORMACAO_DIGITAL_DATA = CURSO_TRANSFORMACAO_DIGITAL_INOVACAO;

export const tracks = TRACKS;
