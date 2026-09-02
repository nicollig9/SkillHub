/**
 * ==========================================================================
 * SKILLHUB - JAVASCRIPT VANILLA MODERNO (SPA & SISTEMA INTEGRADO)
 * Referências: Fundação Bradesco (EV) & Plataformas de Emprego (Indeed/InfoJobs)
 * ==========================================================================
 */

// --- 1. CATÁLOGO DE CURSOS (ÁREA: DESENVOLVIMENTO PESSOAL E PROFISSIONAL - FUNDAÇÃO BRADESCO) ---
const COURSES_DATA = [
  // Trilha 1: Entrada no Mercado & Primeiro Emprego
  {
    id: 'c1',
    track: 'trilha-1',
    trackName: '1. Entrada no Mercado & Primeiro Emprego',
    title: 'Direitos do Aprendiz e Legislação Trabalhista (Lei 10.097/00)',
    description: 'Compreenda o contrato especial de aprendizagem, jornada escolar compatível, direitos a férias, FGTS, registro em carteira e deveres do aprendiz.',
    duration: '10 horas',
    level: 'Iniciante',
    format: 'EAD Interativo (Escola Virtual)',
    badgeName: 'Legislação do Aprendiz',
    badgeIcon: 'fa-scale-balanced',
    accentColor: 'cyan',
    syllabus: [
      'Módulo 1: O marco legal da Lei da Aprendizagem e seus objetivos sociais',
      'Módulo 2: Direitos fundamentais: salário-hora, repouso semanal, FGTS e férias',
      'Módulo 3: Conciliação obrigatória entre turno escolar e jornada de trabalho',
      'Módulo 4: Deveres, assiduidade, pontualidade e rescisão de contrato'
    ],
    prerequisites: 'Ensino Fundamental em andamento ou concluído.',
    instructor: 'Dra. Vanessa Meireles (Advogada Trabalhista e Educadora Social)',
    quiz: [
      {
        question: 'Qual a principal característica do contrato de trabalho do Jovem Aprendiz?',
        options: [
          'É um contrato por prazo indeterminado sem vínculo com a escola.',
          'É um contrato especial de trabalho ajustado por escrito e por prazo determinado, vinculado à formação profissional.',
          'É um trabalho voluntário sem remuneração.',
          'É uma contratação exclusiva para maiores de 21 anos.'
        ],
        correct: 1
      },
      {
        question: 'O que acontece se o jovem abandonar a escola regular durante o programa de aprendizagem?',
        options: [
          'Ele ganha aumento de salário.',
          'Não há impacto no contrato de trabalho.',
          'O contrato pode ser rescindido antecipadamente, pois a frequência escolar é requisito obrigatório.',
          'A empresa é multada pelo Ministério do Trabalho.'
        ],
        correct: 2
      },
      {
        question: 'Qual a alíquota de depósito do FGTS para o Jovem Aprendiz?',
        options: [
          '2% da remuneração mensal (diferenciada para aprendizes).',
          '8% da remuneração mensal.',
          '0% (não há depósito de FGTS).',
          '10% da remuneração mensal.'
        ],
        correct: 0
      }
    ]
  },
  {
    id: 'c2',
    track: 'trilha-1',
    trackName: '1. Entrada no Mercado & Primeiro Emprego',
    title: 'Elaboração de Currículo e Cadastro em Plataformas de Vagas',
    description: 'Passo a passo para estruturar um currículo sem experiência formal, destacar projetos escolares e cadastrar-se no CIEE, IEL e plataformas digitais.',
    duration: '8 horas',
    level: 'Iniciante',
    format: 'Oficina Prática',
    badgeName: 'Currículo Campeão',
    badgeIcon: 'fa-file-invoice',
    accentColor: 'cyan',
    syllabus: [
      'Módulo 1: Estrutura recomendada pela Fundação Bradesco para currículos de jovens',
      'Módulo 2: Como valorizar trabalhos em grupo, cursos livres e voluntariado',
      'Módulo 3: Cadastro correto em agentes de integração (CIEE/IEL/Agências)',
      'Módulo 4: Cuidados com a LGPD e privacidade ao enviar dados para recrutadores'
    ],
    prerequisites: 'Nenhum pré-requisito.',
    instructor: 'Prof. Carlos Menezes (Consultor de Carreira da Juventude)',
    quiz: [
      {
        question: 'Quem nunca trabalhou formalmente deve destacar o que no currículo?',
        options: [
          'Inventar experiências anteriores para preencher espaço.',
          'Formação escolar, cursos livres, projetos acadêmicos, voluntariado e habilidades comportamentais.',
          'Deixar o currículo em branco na parte de habilidades.',
          'Colocar dados confidenciais como número de conta bancária.'
        ],
        correct: 1
      },
      {
        question: 'Por que é importante manter o perfil atualizado em plataformas de integração (como CIEE e SkillHub)?',
        options: [
          'Para garantir que os filtros de recrutadores encontrem seu perfil de acordo com seu bairro e horário escolar.',
          'Apenas para gerar pontos em redes sociais.',
          'Porque o cadastro expira a cada 24 horas.',
          'Não é importante, os recrutadores ligam sem olhar o cadastro.'
        ],
        correct: 0
      }
    ]
  },

  // Trilha 2: Desenvolvimento Pessoal & Atitude Profissional
  {
    id: 'c3',
    track: 'trilha-2',
    trackName: '2. Desenvolvimento Pessoal & Atitude Profissional',
    title: 'Postura Corporativa, Ética e Imagem Pessoal',
    description: 'Aprenda conduta ética, linguagem corporal assertiva, pontualidade, vestimenta adequada e relacionamento com gestores e pares.',
    duration: '12 horas',
    level: 'Fundamental',
    format: 'EAD com Casos Práticos',
    badgeName: 'Postura Profissional',
    badgeIcon: 'fa-user-tie',
    accentColor: 'accent-light',
    syllabus: [
      'Módulo 1: A importância da primeira impressão e comunicação não-verbal',
      'Módulo 2: Ética profissional e sigilo de informações corporativas',
      'Módulo 3: Pontualidade, assiduidade e uso responsável de smartphones no trabalho',
      'Módulo 4: Relacionamento interpessoal e hierarquia construtiva'
    ],
    prerequisites: 'Nenhum pré-requisito.',
    instructor: 'Renata Castro (Psicóloga e Especialista em RH)',
    quiz: [
      {
        question: 'Qual a postura esperada em relação ao uso de celular pessoal durante o expediente?',
        options: [
          'Usar livremente para redes sociais durante reuniões.',
          'Manter em modo silencioso e utilizar prioritariamente durante os intervalos, focando nas tarefas.',
          'Deixar tocando no volume máximo.',
          'Nunca levar celular para o local de trabalho.'
        ],
        correct: 1
      },
      {
        question: 'O que significa agir com ética e sigilo profissional?',
        options: [
          'Compartilhar dados internos da empresa com amigos na escola.',
          'Preservar informações sigilosas de clientes, colegas e processos internos da organização.',
          'Falar mal de colegas na internet.',
          'Ocultar erros graves sem avisar o gestor.'
        ],
        correct: 1
      }
    ]
  },
  {
    id: 'c4',
    track: 'trilha-2',
    trackName: '2. Desenvolvimento Pessoal & Atitude Profissional',
    title: 'Gestão do Tempo, Organização e Resiliência',
    description: 'Técnicas de priorização de tarefas, matriz de Eisenhower adaptada, administração da rotina estudo-trabalho e inteligência emocional.',
    duration: '10 horas',
    level: 'Intermediário',
    format: 'EAD Gamificado',
    badgeName: 'Gestão & Resiliência',
    badgeIcon: 'fa-brain',
    accentColor: 'accent-light',
    syllabus: [
      'Módulo 1: Organização pessoal e conciliação de horários (escola + trabalho)',
      'Módulo 2: Matriz de prioridades (O que é urgente vs. O que é importante)',
      'Módulo 3: Como lidar com prazos e evitar a procrastinação',
      'Módulo 4: Resiliência e recepção de feedbacks construtivos'
    ],
    prerequisites: 'Nenhum.',
    instructor: 'Lucas Albuquerque (Mentor de Produtividade Jovem)',
    quiz: [
      {
        question: 'Ao receber um feedback corretivo do seu supervisor, qual a melhor atitude?',
        options: [
          'Ficar ofendido e discutir imediatamente.',
          'Ouvir com atenção, anotar os pontos de melhoria, tirar dúvidas e aplicar as orientações.',
          'Ignorar o feedback e continuar fazendo igual.',
          'Faltar no dia seguinte.'
        ],
        correct: 1
      }
    ]
  },

  // Trilha 3: Atendimento & Relacionamento
  {
    id: 'c5',
    track: 'trilha-3',
    trackName: '3. Atendimento & Relacionamento',
    title: 'Excelência no Atendimento ao Público e SAC',
    description: 'Técnicas de acolhimento, escuta ativa, cordialidade no balcão e telefone, resolução rápida de dúvidas e empatia.',
    duration: '15 horas',
    level: 'Iniciante',
    format: 'EAD com Simulações Reais',
    badgeName: 'Atendimento Nota 10',
    badgeIcon: 'fa-headset',
    accentColor: 'cyan',
    syllabus: [
      'Módulo 1: O papel do jovem no encantamento e recepção do cliente',
      'Módulo 2: Escuta ativa e comunicação clara sem gírias inadequadas',
      'Módulo 3: Como lidar com pessoas nervosas mantendo a calma e a simpatia',
      'Módulo 4: Roteiros de atendimento telefônico e recepção presencial'
    ],
    prerequisites: 'Nenhum pré-requisito.',
    instructor: 'Juliana Paes (Gerente de Customer Experience)',
    quiz: [
      {
        question: 'O que caracteriza a "Escuta Ativa" no atendimento ao cliente?',
        options: [
          'Interromper o cliente no meio da frase para responder rápido.',
          'Ouvir atentamente sem distrações, demonstrar interesse genuíno e confirmar o entendimento da necessidade.',
          'Ficar em silêncio pensando em outros assuntos.',
          'Dizer que a culpa é do cliente.'
        ],
        correct: 1
      }
    ]
  },
  {
    id: 'c6',
    track: 'trilha-3',
    trackName: '3. Atendimento & Relacionamento',
    title: 'Comunicação Não-Violenta e Etiqueta Digital',
    description: 'Boas práticas no WhatsApp corporativo, e-mails de suporte, prevenção de mal-entendidos e tratamento humanizado.',
    duration: '8 horas',
    level: 'Iniciante',
    format: 'Prático com Modelos de Mensagens',
    badgeName: 'Etiqueta Digital & CNV',
    badgeIcon: 'fa-comments',
    accentColor: 'cyan',
    syllabus: [
      'Módulo 1: Os 4 componentes da Comunicação Não-Violenta (CNV)',
      'Módulo 2: Boas práticas na escrita de mensagens corporativas instantâneas',
      'Módulo 3: Normas de cordialidade e formatação profissional',
      'Módulo 4: Cuidados para não vazar dados de clientes em canais abertos'
    ],
    prerequisites: 'Nenhum.',
    instructor: 'Felipe Dantas (Consultor de Comunicação Corporativa)',
    quiz: [
      {
        question: 'Qual é um exemplo de boa prática na comunicação via WhatsApp Comercial?',
        options: [
          'Escrever com abreviações excessivas e sem saudação.',
          'Cumprimentar educadamente, identificar-se, escrever em parágrafos claros e revisar antes de enviar.',
          'Enviar áudios de 10 minutos sem aviso prévio.',
          'Compartilhar dados bancários de clientes em grupos públicos.'
        ],
        correct: 1
      }
    ]
  },

  // Trilha 4: Ferramentas de Escritório
  {
    id: 'c7',
    track: 'trilha-4',
    trackName: '4. Ferramentas de Escritório',
    title: 'Excel e Planilhas Essenciais para Escritório',
    description: 'Operações matemáticas básicas, fórmulas (SOMA, MÉDIA, PROCV, SE), filtros, formatação de tabelas e elaboração de relatórios.',
    duration: '20 horas',
    level: 'Fundamental',
    format: 'Exercícios Práticos em Planilha',
    badgeName: 'Excel Básico a Prático',
    badgeIcon: 'fa-table',
    accentColor: 'amber',
    syllabus: [
      'Módulo 1: Navegação na interface, atalhos úteis e formatação de células',
      'Módulo 2: Operações aritméticas e fórmulas essenciais de cálculo',
      'Módulo 3: Classificação de dados, filtros rápidos e congelamento de painéis',
      'Módulo 4: Criação de gráficos simples para acompanhamento de tarefas'
    ],
    prerequisites: 'Noções básicas de informática.',
    instructor: 'Prof. Thiago Rocha (Especialista em Produtividade)',
    quiz: [
      {
        question: 'No Excel, como se inicia qualquer fórmula ou cálculo?',
        options: [
          'Com a tecla de espaço.',
          'Com o sinal de igual (=).',
          'Com o sinal de porcentagem (%).',
          'Escrevendo em maiúsculo.'
        ],
        correct: 1
      },
      {
        question: 'Para que serve o recurso de "Filtro" no Excel?',
        options: [
          'Para apagar todos os dados da tabela.',
          'Para exibir apenas as linhas que atendem a um critério específico sem excluir os outros dados.',
          'Para mudar a cor do texto automaticamente.',
          'Para formatar o computador.'
        ],
        correct: 1
      }
    ]
  },
  {
    id: 'c8',
    track: 'trilha-4',
    trackName: '4. Ferramentas de Escritório',
    title: 'Google Workspace, Documentos e Redação de E-mails',
    description: 'Criação de documentos formais no Google Docs, armazenamento em nuvem no Drive e regras de redação de memorandos e comunicados.',
    duration: '10 horas',
    level: 'Iniciante',
    format: 'EAD Prático',
    badgeName: 'Google Workspace & E-mail',
    badgeIcon: 'fa-envelope-open-text',
    accentColor: 'amber',
    syllabus: [
      'Módulo 1: Organização de pastas e permissões de acesso no Google Drive',
      'Módulo 2: Edição e formatação de textos formais no Google Docs',
      'Módulo 3: Estrutura padrão de e-mail corporativo: Assunto, Saudação, Corpo e Assinatura',
      'Módulo 4: Protocolos de anexo seguro e prevenção contra phishing'
    ],
    prerequisites: 'Nenhum pré-requisito.',
    instructor: 'Camila Guimarães (Especialista em Processos e Documentação)',
    quiz: [
      {
        question: 'Qual é a estrutura correta de um e-mail profissional formal?',
        options: [
          'Sem assunto, texto corrido sem pontuação e sem despedida.',
          'Assunto claro e objetivo, saudação formal, mensagem concisa e assinatura com nome e setor.',
          'Apenas emojis e links sem explicação.',
          'Escrever tudo em caixa alta (CAPS LOCK).'
        ],
        correct: 1
      }
    ]
  },

  // Trilha 5: Educação Financeira
  {
    id: 'c9',
    track: 'trilha-5',
    trackName: '5. Educação Financeira',
    title: 'Gestão da Primeira Renda, Holerite e Poupança',
    description: 'Entenda como ler o demonstrativo de pagamento (holerite), organizar o orçamento pessoal (50-30-20), criar reserva de emergência e evitar dívidas.',
    duration: '8 horas',
    level: 'Iniciante',
    format: 'Vídeo-aulas + Simulador de Orçamento',
    badgeName: 'Finanças do Aprendiz',
    badgeIcon: 'fa-wallet',
    accentColor: 'accent-light',
    syllabus: [
      'Módulo 1: Compreendendo o holerite: salário bruto vs. salário líquido e descontos legais',
      'Módulo 2: A regra do 50-30-20 adaptada para jovens que ajudam em casa',
      'Módulo 3: Como fugir de juros abusivos de cartão de crédito e empréstimos',
      'Módulo 4: Primeiros passos em poupança e investimentos de baixo risco (Tesouro Selic/CDB)'
    ],
    prerequisites: 'Nenhum pré-requisito.',
    instructor: 'Eduardo Martins (Educador Financeiro para Jovens)',
    quiz: [
      {
        question: 'O que representa o "Salário Líquido" em um demonstrativo de pagamento?',
        options: [
          'O valor total antes de qualquer desconto obrigatório.',
          'O valor efetivamente depositado na conta do trabalhador após os descontos legais (como VT e INSS).',
          'O valor reservado para o FGTS.',
          'O total de horas extras acumuladas.'
        ],
        correct: 1
      }
    ]
  }
];

// --- 2. VAGAS REGIONALIZADAS EM CURITIBA (ESTILO INDEED / INFOJOBS / JOBRAPIDO) ---
const JOBS_DATA = [
  {
    id: 'v1',
    title: 'Jovem Aprendiz - Apoio Administrativo e Logística',
    company: 'Logística & Distribuição Paraná S.A.',
    companyAbout: 'Líder no segmento de armazenagem e transporte no Sul do Brasil, com programa contínuo de mentoria para aprendizes e alto índice de efetivação após 18 meses.',
    neighborhood: 'CIC',
    region: 'Zona Oeste / Industrial',
    modality: 'jovem-aprendiz',
    modalityLabel: 'Jovem Aprendiz (Lei 10.097/00)',
    workload: '20h semanais • Turno Manhã (08h às 12h)',
    stipend: 'R$ 890,00 + Vale Transporte + Vale Refeição (R$ 28/dia) + Seguro de Vida',
    requiredBadges: ['Legislação do Aprendiz', 'Excel Básico a Prático'],
    dailyDuties: [
      'Lançamento e conferência de notas fiscais de entrada e saída no sistema integrado.',
      'Organização e digitalização de relatórios de expedição de mercadorias.',
      'Apoio no controle de planilhas de estoque e inventários rotativos.',
      'Envio de e-mails formais para confirmação de entregas com fornecedores.'
    ],
    lgpdNotice: 'Candidatura segura: seu endereço residencial não é compartilhado até a convocação formal para a entrevista presencial.'
  },
  {
    id: 'v2',
    title: 'Estágio em Atendimento ao Cliente e Recepção',
    company: 'Clínica Integrada de Especialidades Médicas',
    companyAbout: 'Ambiente acolhedor focado no bem-estar humano, oferecendo plano de capacitação em relacionamento e ferramentas digitais para estudantes de Ensino Médio.',
    neighborhood: 'Batel',
    region: 'Região Central / Sul',
    modality: 'estagio',
    modalityLabel: 'Estágio Ensino Médio (Lei 11.788/08)',
    workload: '30h semanais • Turno Tarde (13h às 19h)',
    stipend: 'R$ 1.250,00 + Vale Transporte + Recesso Remunerado + Bonificação Semestral',
    requiredBadges: ['Atendimento Nota 10', 'Etiqueta Digital & CNV'],
    dailyDuties: [
      'Recepção cordial de pacientes e confirmação de cadastros em sistema.',
      'Atendimento e triagem de dúvidas via WhatsApp Comercial e telefone.',
      'Agendamento de consultas e emissão de guias de atendimento.',
      'Organização do fluxo da sala de espera com foco em acolhimento e escuta ativa.'
    ],
    lgpdNotice: 'Candidatura segura: perfil exibido anonimizado por badges de capacitação.'
  },
  {
    id: 'v3',
    title: 'Jovem Aprendiz - Atendimento e Operações Comerciais',
    company: 'Varejo & Moda Brasil Curitiba',
    companyAbout: 'Rede nacional de lojas com cultura de estímulo ao primeiro emprego, oferecendo treinamentos semanais e plano de carreira estruturado para jovens talentos.',
    neighborhood: 'Boqueirão',
    region: 'Zona Sudeste',
    modality: 'jovem-aprendiz',
    modalityLabel: 'Jovem Aprendiz (Lei 10.097/00)',
    workload: '20h semanais • Turno Tarde (14h às 18h)',
    stipend: 'R$ 850,00 + Vale Transporte + 20% Desconto em Compras + Assistência Odontológica',
    requiredBadges: ['Atendimento Nota 10', 'Postura Profissional'],
    dailyDuties: [
      'Apoio no atendimento aos clientes com postura cordial e empática.',
      'Organização de mostruários e suporte na conferência de etiquetas de preço.',
      'Auxílio no empacotamento e suporte básico na frente de caixa.',
      'Participação ativa nos encontros teóricos de formação profissional.'
    ],
    lgpdNotice: 'Proteção LGPD ativa: dados de contato liberados apenas após triagem positiva de badges.'
  },
  {
    id: 'v4',
    title: 'Auxiliar de Escritório - Jovem Aprendiz',
    company: 'Indústria Metalúrgica do Sul Ltda.',
    companyAbout: 'Empresa com 35 anos de atuação no parque fabril de Curitiba, comprometida com a inclusão de jovens da região sul em setores de tecnologia e administração.',
    neighborhood: 'Tatuquara',
    region: 'Zona Sul',
    modality: 'jovem-aprendiz',
    modalityLabel: 'Jovem Aprendiz (Lei 10.097/00)',
    workload: '20h semanais • Turno Manhã (08h às 12h)',
    stipend: 'R$ 920,00 + Refeição Completa no Local + Vale Transporte + Cesta Básica',
    requiredBadges: ['Excel Básico a Prático', 'Google Workspace & E-mail'],
    dailyDuties: [
      'Preenchimento de relatórios diários de produção e controle de presença em planilhas.',
      'Digitalização de prontuários de equipamentos e arquivamento eletrônico no Google Drive.',
      'Redação e envio de comunicados internos por correio eletrônico.',
      'Apoio aos analistas de compras em cotações simples.'
    ],
    lgpdNotice: 'Vaga próxima da sua região para reduzir o tempo de transporte urbano.'
  },
  {
    id: 'v5',
    title: 'Estágio Ensino Médio - Apoio Operacional e Documental',
    company: 'Cartório & Serviços Documentais Curitiba',
    companyAbout: 'Instituição centenária de serviços notariais, prezando pelo rigor ético, pontualidade e excelência na gestão documental.',
    neighborhood: 'Centro',
    region: 'Região Central',
    modality: 'estagio',
    modalityLabel: 'Estágio Ensino Médio (Lei 11.788/08)',
    workload: '25h semanais • Turno Manhã (08h às 13h)',
    stipend: 'R$ 1.100,00 + Vale Transporte + Vale Refeição (R$ 24/dia) + Seguro',
    requiredBadges: ['Currículo Campeão', 'Google Workspace & E-mail', 'Postura Profissional'],
    dailyDuties: [
      'Classificação, triagem e conferência de documentos físicos e digitais.',
      'Atendimento inicial ao público no balcão para direcionamento de senhas.',
      'Auxílio no preenchimento de formulários eletrônicos de protocolo.',
      'Manutenção organizada dos arquivos setoriais.'
    ],
    lgpdNotice: 'Total respeito à LGPD para menores de 18 anos.'
  },
  {
    id: 'v6',
    title: 'Jovem Aprendiz - Suporte Digital e Atendimento Omnichannel',
    company: 'Hub Tecnologia & E-commerce Curitiba',
    companyAbout: 'Startup inovadora do ecossistema do Vale do Pinhão, com ambiente descontraído e foco no desenvolvimento de habilidades digitais para jovens.',
    neighborhood: 'Portão',
    region: 'Zona Sudoeste',
    modality: 'jovem-aprendiz',
    modalityLabel: 'Jovem Aprendiz (Lei 10.097/00)',
    workload: '20h semanais • Modelo Híbrido (3 dias presencial / 2 dias home office)',
    stipend: 'R$ 980,00 + Ajuda de Custo Home Office + VT + Plano de Desenvolvimento',
    requiredBadges: ['Etiqueta Digital & CNV', 'Atendimento Nota 10'],
    dailyDuties: [
      'Atendimento a chamados de dúvidas de clientes no chat da loja virtual e WhatsApp.',
      'Acompanhamento do status de pedidos e atualização no sistema de CRM.',
      'Interação com clientes nas redes sociais respeitando o guia de tom de voz da marca.',
      'Elaboração de pequenos relatórios semanais de satisfação do usuário.'
    ],
    lgpdNotice: 'Privacidade garantida conforme diretrizes da ANPD.'
  }
];

// --- 3. SIMULADOR DE ENTREVISTAS (TÉCNICA STAR) ---
const INTERVIEW_QUESTIONS = [
  {
    id: 1,
    theme: 'Apresentação Pessoal & Motivação',
    question: 'Conte-me um pouco sobre você: quem é você fora dos estudos e o que te motivou a buscar essa oportunidade?',
    starTip: 'SITUAÇÃO & AÇÃO: Apresente sua rotina escolar, seus interesses pessoais e conecte seu desejo de aprender com a vaga.',
    goodKeywords: ['aprender', 'escola', 'dedicação', 'oportunidade', 'desenvolver', 'responsabilidade', 'crescer', 'estudos'],
    sampleResponse: 'Atualmente curso o ensino médio, gosto muito de aprender coisas novas e busco minha primeira oportunidade para aplicar minha vontade de aprender e construir minha independência profissional.'
  },
  {
    id: 2,
    theme: 'Desafios & Resolução de Problemas',
    question: 'Conte sobre um momento na escola ou na vida em que algo não saiu como planejado. Como você lidou com isso?',
    starTip: 'TÉCNICA STAR (Situação, Tarefa, Ação, Resultado): Explique qual era o problema, o que você fez para resolver com calma e o que aprendeu com a experiência.',
    goodKeywords: ['situação', 'tarefa', 'resolvi', 'ajuda', 'aprendi', 'calma', 'organização', 'consegui', 'resultado'],
    sampleResponse: 'Em um trabalho em grupo escolar, um integrante não pôde comparecer. Em vez de entrar em pânico, reorganizei as tarefas com o time, apresentamos no prazo e tiramos nota máxima.'
  },
  {
    id: 3,
    theme: 'Trabalho em Equipe e Convivência',
    question: 'Como você reage quando discorda da opinião de um colega em um trabalho em grupo ou projeto?',
    starTip: 'FOCO EM ESCUTA ATIVA: Demonstre respeito pela opinião alheia, busque conversar em particular e focar no objetivo do projeto.',
    goodKeywords: ['ouvir', 'respeito', 'conversar', 'equipe', 'objetivo', 'empatia', 'consenso', 'feedback'],
    sampleResponse: 'Procuro ouvir o ponto de vista do colega com empatia e explicar meu raciocínio com calma. Se necessário, buscamos uma solução que una as melhores ideias de ambos para o bem da equipe.'
  }
];

const MENTORS_DATA = [
  {
    name: 'Patrícia Nogueira',
    role: 'Gerente de Gente & Gestão (12 anos em RH)',
    focus: 'Simulação de Entrevistas & Feedback de Currículo',
    slots: ['Quinta-feira às 15:00', 'Sexta-feira às 10:30', 'Segunda-feira às 14:00'],
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'Rodrigo Brandão',
    role: 'Coordenador de Desenvolvimento Humano e Voluntário',
    focus: 'Planejamento de Carreira & Autoconfiança para Jovens',
    slots: ['Terça-feira às 16:00', 'Quarta-feira às 11:00', 'Sábado às 09:30'],
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80'
  }
];

// --- 4. GERENCIAMENTO DE ESTADO (LOCALSTORAGE) ---
const STATE_KEYS = {
  ENROLLED: 'skillhub_enrolled_courses',
  BADGES: 'skillhub_unlocked_badges',
  PRIVACY: 'skillhub_privacy_settings',
  PROFILE: 'skillhub_user_profile',
  APPLICATIONS: 'skillhub_job_applications'
};

class SkillHubApp {
  constructor() {
    this.enrolledCourses = JSON.parse(localStorage.getItem(STATE_KEYS.ENROLLED)) || {
      'c1': { progress: 100, completed: true, examScore: 100, enrolledAt: '2026-08-15' },
      'c7': { progress: 65, completed: false, examScore: null, enrolledAt: '2026-08-20' }
    };
    
    this.unlockedBadges = JSON.parse(localStorage.getItem(STATE_KEYS.BADGES)) || ['Legislação do Aprendiz'];
    
    this.applications = JSON.parse(localStorage.getItem(STATE_KEYS.APPLICATIONS)) || [];

    this.privacySettings = JSON.parse(localStorage.getItem(STATE_KEYS.PRIVACY)) || {
      publicToRecruiters: true,
      anonymousMode: true,
      neighborhoodOnly: true
    };

    // Cadastro Burocrático Completo (Estilo Fundação Bradesco)
    this.userProfile = JSON.parse(localStorage.getItem(STATE_KEYS.PROFILE)) || {
      name: 'Gabriel Alencar dos Santos',
      cpf: '123.456.789-00',
      birthDate: '2009-04-12',
      age: 17,
      email: 'gabriel.alencar@exemplo.com.br',
      phone: '(41) 99876-5432',
      city: 'Curitiba',
      neighborhood: 'Boqueirão',
      schoolName: 'Colégio Estadual Victor do Amaral',
      schoolType: 'Pública Estadual',
      education: 'Ensino Médio (2º Ano)',
      schoolShift: 'Manhã', // Manhã, Tarde ou Noite
      isMinor: true,
      parentConsentSigned: true, // Termo de consentimento LGPD para menor
      bio: 'Estudante dedicado do 2º ano do Ensino Médio, em busca da primeira oportunidade profissional como Jovem Aprendiz ou Estagiário nas áreas administrativa, recepção ou logística.',
      isComplete: true
    };

    this.currentTrackFilter = 'all';
    this.currentSimulatorIndex = 0;
    this.selectedNeighborhood = 'all';
    this.selectedModality = 'all';

    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupEventListeners();
    this.renderCoursesCatalog();
    this.renderDashboard();
    this.renderJobsMap();
    this.renderSimulator();
    this.renderMentors();
    this.updateTopProgressBar();
    this.startBreathingAnimation();

    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();
  }

  // --- NAVEGAÇÃO SPA ---
  setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .spa-nav-trigger');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const target = link.getAttribute('href');
        if (target && target.startsWith('#')) {
          e.preventDefault();
          window.location.hash = target;
          
          const mobileNav = document.getElementById('mainNav');
          if (mobileNav) mobileNav.classList.remove('open');
        }
      });
    });

    const mobileBtn = document.getElementById('mobileMenuBtn');
    if (mobileBtn) {
      mobileBtn.addEventListener('click', () => {
        const nav = document.getElementById('mainNav');
        nav.classList.toggle('open');
      });
    }
  }

  handleRoute() {
    const hash = window.location.hash || '#home';
    const targetId = hash.substring(1);
    
    const pages = document.querySelectorAll('.page-view');
    let pageFound = false;

    pages.forEach(page => {
      if (page.id === targetId) {
        page.classList.add('active');
        pageFound = true;
      } else {
        page.classList.remove('active');
      }
    });

    if (!pageFound) {
      const homePage = document.getElementById('home');
      if (homePage) homePage.classList.add('active');
    }

    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.getAttribute('href') === hash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --- BARRA DE PROGRESSO DO TOPO ---
  updateTopProgressBar() {
    const totalBadgesPossible = COURSES_DATA.length;
    const earnedCount = this.unlockedBadges.length;
    const percent = Math.min(100, Math.round((earnedCount / totalBadgesPossible) * 100));

    const fillElem = document.getElementById('topProgressFill');
    const textElem = document.getElementById('topProgressText');

    if (fillElem) fillElem.style.width = `${percent}%`;
    if (textElem) textElem.innerHTML = `<strong>${earnedCount} de ${totalBadgesPossible}</strong> Badges conquistadas (${percent}%)`;
  }

  // --- CATÁLOGO DE CURSOS (FUNDAÇÃO BRADESCO) ---
  renderCoursesCatalog() {
    const container = document.getElementById('coursesGrid');
    if (!container) return;

    const searchTerm = (document.getElementById('courseSearchInput')?.value || '').toLowerCase();
    const durationFilter = document.getElementById('filterDuration')?.value || 'all';
    const levelFilter = document.getElementById('filterLevel')?.value || 'all';

    const filtered = COURSES_DATA.filter(course => {
      const matchesTrack = this.currentTrackFilter === 'all' || course.track === this.currentTrackFilter;
      const matchesSearch = course.title.toLowerCase().includes(searchTerm) || 
                            course.description.toLowerCase().includes(searchTerm) ||
                            course.badgeName.toLowerCase().includes(searchTerm);
      
      let matchesDuration = true;
      const hours = parseInt(course.duration);
      if (durationFilter === 'short') matchesDuration = hours <= 10;
      if (durationFilter === 'medium') matchesDuration = hours > 10 && hours <= 15;
      if (durationFilter === 'long') matchesDuration = hours > 15;

      let matchesLevel = true;
      if (levelFilter !== 'all') {
        matchesLevel = course.level.toLowerCase() === levelFilter.toLowerCase();
      }

      return matchesTrack && matchesSearch && matchesDuration && matchesLevel;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: white; border-radius: 12px; border: 1px dashed var(--border-color);">
          <i class="fa-solid fa-search" style="font-size: 2.5rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
          <h4 style="color: var(--deep-cyan); margin-bottom: 0.5rem;">Nenhum curso encontrado com esses filtros</h4>
          <p style="color: var(--text-secondary); font-size: 0.9rem;">Tente buscar por outro termo ou limpar os filtros de duração/nível.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(course => {
      const isEnrolled = !!this.enrolledCourses[course.id];
      const isCompleted = isEnrolled && this.enrolledCourses[course.id].completed;
      const progress = isEnrolled ? this.enrolledCourses[course.id].progress : 0;

      let actionButtonHtml = '';
      if (isCompleted) {
        actionButtonHtml = `
          <div class="enrolled-badge" style="width: 100%;">
            <i class="fa-solid fa-circle-check"></i> Certificado Ativo (${course.badgeName})
          </div>
        `;
      } else if (isEnrolled && progress >= 100) {
        actionButtonHtml = `
          <button class="btn btn-coral btn-sm" onclick="app.openCourseExam('${course.id}')" style="width: 100%;">
            <i class="fa-solid fa-clipboard-check"></i> Fazer Avaliação Final (Média 70%)
          </button>
        `;
      } else if (isEnrolled) {
        actionButtonHtml = `
          <button class="btn btn-deep-cyan btn-sm" onclick="app.continueCourse('${course.id}')" style="width: 100%;">
            <i class="fa-solid fa-play"></i> Continuar Aulas (${progress}%)
          </button>
        `;
      } else {
        actionButtonHtml = `
          <button class="btn btn-primary btn-sm" onclick="app.enrollCourse('${course.id}')" style="width: 100%;">
            <i class="fa-solid fa-plus"></i> Matricular-se Grátis
          </button>
        `;
      }

      return `
        <div class="course-card" data-id="${course.id}">
          <div class="course-card-header">
            <div class="course-badge-icon" style="background: var(--soft-teal); color: var(--primary-cyan);">
              <i class="fa-solid ${course.badgeIcon}"></i>
            </div>
            <span class="badge-tag ${course.accentColor}">${course.level}</span>
          </div>
          <div class="course-card-body">
            <span class="course-category-tag">${course.trackName}</span>
            <h3 class="course-title">${course.title}</h3>
            <p class="course-desc">${course.description}</p>
            <div class="course-meta">
              <span class="course-meta-item"><i class="fa-regular fa-clock"></i> ${course.duration}</span>
              <span class="course-meta-item"><i class="fa-solid fa-graduation-cap"></i> ${course.format}</span>
            </div>
            <div class="course-actions">
              ${actionButtonHtml}
              <button class="btn btn-outline btn-sm" onclick="app.openCourseDetails('${course.id}')" title="Ver Ementa Fundação Bradesco">
                <i class="fa-regular fa-file-lines"></i> Ementa
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- INSCRIÇÃO & PROGRESSO DE CURSO ---
  enrollCourse(courseId) {
    const course = COURSES_DATA.find(c => c.id === courseId);
    if (!course) return;

    this.enrolledCourses[courseId] = {
      progress: 0,
      completed: false,
      examScore: null,
      enrolledAt: new Date().toISOString().split('T')[0]
    };

    this.saveState();
    this.renderCoursesCatalog();
    this.renderDashboard();
    this.showToast(`Matrícula confirmada no curso "${course.title}"! Bons estudos.`, 'success');
  }

  continueCourse(courseId) {
    const course = COURSES_DATA.find(c => c.id === courseId);
    if (!course) return;

    let current = this.enrolledCourses[courseId].progress;
    current += 35;

    if (current >= 100) {
      current = 100;
      this.enrolledCourses[courseId].progress = 100;
      this.showToast(`Aulas concluídas em "${course.title}"! Agora realize a Avaliação Final para emitir a Badge.`, 'info');
    } else {
      this.enrolledCourses[courseId].progress = current;
      this.showToast(`Progresso atualizado em "${course.title}": ${current}% concluído!`, 'info');
    }

    this.saveState();
    this.renderCoursesCatalog();
    this.renderDashboard();
    this.updateTopProgressBar();
  }

  // --- AVALIAÇÃO FINAL (QUIZ 70% ESTILO FUNDAÇÃO BRADESCO) ---
  openCourseExam(courseId) {
    const course = COURSES_DATA.find(c => c.id === courseId);
    if (!course || !course.quiz) return;

    const modal = document.getElementById('quizModal');
    const title = document.getElementById('quizModalTitle');
    const body = document.getElementById('quizModalBody');

    if (!modal || !body) return;

    title.textContent = `Avaliação Final: ${course.title}`;
    
    body.innerHTML = `
      <div style="background: var(--soft-teal); border: 1px solid rgba(0,168,150,0.3); padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; font-size: 0.88rem; color: #064E3B;">
        <i class="fa-solid fa-graduation-cap"></i> <strong>Critério Fundação Bradesco:</strong> Para conquistar a Badge "${course.badgeName}" e o Certificado Oficial, você precisa atingir aproveitamento mínimo de <strong>70%</strong>.
      </div>

      <form id="courseExamForm">
        ${course.quiz.map((q, qIndex) => `
          <div style="margin-bottom: 1.5rem; padding-bottom: 1.25rem; border-bottom: 1px solid var(--border-color);">
            <h4 style="font-size: 1rem; color: var(--deep-cyan); margin-bottom: 0.75rem;">
              Questão ${qIndex + 1}: ${q.question}
            </h4>
            ${q.options.map((opt, optIndex) => `
              <label class="quiz-option-label">
                <input type="radio" name="question_${qIndex}" value="${optIndex}" required />
                <span style="font-size: 0.88rem; color: var(--text-primary);">${opt}</span>
              </label>
            `).join('')}
          </div>
        `).join('')}
      </form>
    `;

    const submitBtn = document.getElementById('quizSubmitBtn');
    if (submitBtn) {
      submitBtn.onclick = () => this.submitCourseExam(courseId);
    }

    modal.classList.add('active');
  }

  submitCourseExam(courseId) {
    const course = COURSES_DATA.find(c => c.id === courseId);
    if (!course || !course.quiz) return;

    const form = document.getElementById('courseExamForm');
    if (!form) return;

    let correctCount = 0;
    const totalQuestions = course.quiz.length;

    for (let i = 0; i < totalQuestions; i++) {
      const selected = form.querySelector(`input[name="question_${i}"]:checked`);
      if (!selected) {
        this.showToast('Por favor, responda a todas as questões antes de finalizar.', 'warning');
        return;
      }
      if (parseInt(selected.value) === course.quiz[i].correct) {
        correctCount++;
      }
    }

    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

    if (scorePercentage >= 70) {
      this.enrolledCourses[courseId].completed = true;
      this.enrolledCourses[courseId].progress = 100;
      this.enrolledCourses[courseId].examScore = scorePercentage;

      if (!this.unlockedBadges.includes(course.badgeName)) {
        this.unlockedBadges.push(course.badgeName);
      }

      this.saveState();
      this.closeModals();
      this.renderCoursesCatalog();
      this.renderDashboard();
      this.renderJobsMap();
      this.updateTopProgressBar();

      this.showToast(`🎉 APROVADO! Aproveitamento de ${scorePercentage}%. A Badge "${course.badgeName}" foi adicionada ao seu perfil!`, 'success');
      this.previewCertificate(course.badgeName);
    } else {
      this.showToast(`Nota: ${scorePercentage}%. Você precisa de no mínimo 70% para ser aprovado. Revise as aulas e tente novamente!`, 'warning');
    }
  }

  // --- PAINEL DO ALUNO & CADASTRO BUROCRÁTICO ---
  renderDashboard() {
    const enrolledListElem = document.getElementById('myCoursesList');
    const badgesGridElem = document.getElementById('dashboardBadgesGrid');
    const totalEnrolledCount = Object.keys(this.enrolledCourses).length;

    const dashEnrolledStat = document.getElementById('dashEnrolledCount');
    const dashBadgesStat = document.getElementById('dashBadgesCount');
    if (dashEnrolledStat) dashEnrolledStat.textContent = totalEnrolledCount;
    if (dashBadgesStat) dashBadgesStat.textContent = this.unlockedBadges.length;

    // Atualizar Card de Status Burocrático
    const statusBox = document.getElementById('bureaucracyStatusBox');
    if (statusBox) {
      if (this.userProfile.isComplete && this.userProfile.parentConsentSigned) {
        statusBox.innerHTML = `
          <div class="bureaucracy-info">
            <div class="bureaucracy-status-icon">
              <i class="fa-solid fa-circle-check"></i>
            </div>
            <div class="bureaucracy-text">
              <h4>Cadastro Formal Homologado (Padrão Fundação Bradesco)</h4>
              <p>Dados pessoais, vínculo escolar (${this.userProfile.education} • Turno ${this.userProfile.schoolShift}) e Termo de Consentimento LGPD validados.</p>
            </div>
          </div>
          <button class="btn btn-outline btn-sm" onclick="app.openEditProfileModal()">
            <i class="fa-solid fa-pen-to-square"></i> Atualizar Dados
          </button>
        `;
      } else {
        statusBox.innerHTML = `
          <div class="bureaucracy-info">
            <div class="bureaucracy-status-icon pending">
              <i class="fa-solid fa-triangle-exclamation"></i>
            </div>
            <div class="bureaucracy-text">
              <h4 style="color: #B45309;">Pendência no Cadastro Obrigatório</h4>
              <p>É necessário preencher sua escolaridade, turno e assinar o consentimento LGPD para liberar candidaturas a vagas.</p>
            </div>
          </div>
          <button class="btn btn-coral btn-sm" onclick="app.openEditProfileModal()">
            <i class="fa-solid fa-id-card"></i> Completar Cadastro Agora
          </button>
        `;
      }
    }

    // Renderizar Cursos em Andamento
    if (enrolledListElem) {
      const enrolledKeys = Object.keys(this.enrolledCourses);
      if (enrolledKeys.length === 0) {
        enrolledListElem.innerHTML = `
          <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
            <p>Você ainda não está matriculado em nenhum curso da Fundação Bradesco.</p>
            <a href="#trilhas" class="btn btn-primary btn-sm spa-nav-trigger" style="margin-top: 1rem;">
              Explorar Catálogo de Trilhas
            </a>
          </div>
        `;
      } else {
        enrolledListElem.innerHTML = enrolledKeys.map(courseId => {
          const course = COURSES_DATA.find(c => c.id === courseId);
          if (!course) return '';
          const info = this.enrolledCourses[courseId];

          return `
            <div class="my-course-card">
              <div class="my-course-top">
                <div>
                  <span class="course-category-tag">${course.trackName}</span>
                  <h4 class="my-course-title">${course.title}</h4>
                </div>
                <span class="badge-tag ${info.completed ? 'accent-light' : 'cyan'}">
                  ${info.completed ? '<i class="fa-solid fa-check"></i> Concluído (Nota: ' + (info.examScore || 100) + '%)' : '<i class="fa-solid fa-spinner"></i> ' + info.progress + '% Concluído'}
                </span>
              </div>
              
              <div class="my-progress-bar-wrap">
                <div class="progress-track">
                  <div class="progress-fill" style="width: ${info.progress}%;"></div>
                </div>
                <div class="progress-label-row">
                  <span>Progresso Teórico e Prático</span>
                  <span>${info.progress}%</span>
                </div>
              </div>

              <div class="my-course-actions">
                ${info.completed ? `
                  <button class="btn btn-outline btn-sm" onclick="app.previewCertificate('${course.badgeName}')">
                    <i class="fa-solid fa-award"></i> Ver Certificado Oficial
                  </button>
                ` : info.progress >= 100 ? `
                  <button class="btn btn-coral btn-sm" onclick="app.openCourseExam('${course.id}')">
                    <i class="fa-solid fa-clipboard-check"></i> Fazer Avaliação Final (Média 70%)
                  </button>
                ` : `
                  <button class="btn btn-primary btn-sm" onclick="app.continueCourse('${course.id}')">
                    <i class="fa-solid fa-play"></i> Assistir Próxima Aula (+35%)
                  </button>
                `}
              </div>
            </div>
          `;
        }).join('');
      }
    }

    // Galeria de Badges
    if (badgesGridElem) {
      badgesGridElem.innerHTML = COURSES_DATA.map(course => {
        const isUnlocked = this.unlockedBadges.includes(course.badgeName);
        return `
          <div class="badge-item-card ${isUnlocked ? 'unlocked' : ''}">
            <div class="badge-icon-circle">
              <i class="fa-solid ${course.badgeIcon}"></i>
            </div>
            <div class="badge-title-text">${course.badgeName}</div>
            <div class="badge-status-text">
              ${isUnlocked ? '<i class="fa-solid fa-circle-check"></i> Conquistada' : '<i class="fa-solid fa-lock"></i> Bloqueada'}
            </div>
          </div>
        `;
      }).join('');
    }

    const privacyToggle = document.getElementById('privacyRecruiterToggle');
    if (privacyToggle) {
      privacyToggle.checked = this.privacySettings.publicToRecruiters;
    }
  }

  // --- MODAL DE EDIÇÃO DE CADASTRO BUROCRÁTICO ---
  openEditProfileModal() {
    const modal = document.getElementById('profileModal');
    const body = document.getElementById('profileModalBody');
    if (!modal || !body) return;

    body.innerHTML = `
      <form id="bureaucracyProfileForm">
        <div class="form-grid-2">
          <div class="form-group">
            <label>Nome Completo do Aluno:</label>
            <input type="text" id="profName" value="${this.userProfile.name}" required />
          </div>
          <div class="form-group">
            <label>CPF (Validação Cadastral):</label>
            <input type="text" id="profCpf" value="${this.userProfile.cpf}" required />
          </div>
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label>Data de Nascimento:</label>
            <input type="date" id="profBirth" value="${this.userProfile.birthDate}" required />
          </div>
          <div class="form-group">
            <label>Bairro de Residência (Curitiba):</label>
            <select id="profNeighborhood" required>
              <option value="Boqueirão" ${this.userProfile.neighborhood === 'Boqueirão' ? 'selected' : ''}>Boqueirão</option>
              <option value="CIC" ${this.userProfile.neighborhood === 'CIC' ? 'selected' : ''}>CIC</option>
              <option value="Centro" ${this.userProfile.neighborhood === 'Centro' ? 'selected' : ''}>Centro</option>
              <option value="Batel" ${this.userProfile.neighborhood === 'Batel' ? 'selected' : ''}>Batel</option>
              <option value="Portão" ${this.userProfile.neighborhood === 'Portão' ? 'selected' : ''}>Portão</option>
              <option value="Tatuquara" ${this.userProfile.neighborhood === 'Tatuquara' ? 'selected' : ''}>Tatuquara</option>
            </select>
          </div>
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label>Escola / Instituição de Ensino:</label>
            <input type="text" id="profSchool" value="${this.userProfile.schoolName}" required />
          </div>
          <div class="form-group">
            <label>Turno das Aulas Regulares:</label>
            <select id="profShift" required>
              <option value="Manhã" ${this.userProfile.schoolShift === 'Manhã' ? 'selected' : ''}>Manhã (Compatível c/ vagas à tarde)</option>
              <option value="Tarde" ${this.userProfile.schoolShift === 'Tarde' ? 'selected' : ''}>Tarde (Compatível c/ vagas de manhã)</option>
              <option value="Noite" ${this.userProfile.schoolShift === 'Noite' ? 'selected' : ''}>Noite (Horário flexível de dia)</option>
            </select>
          </div>
        </div>

        <div class="form-group" style="margin-bottom: 1rem;">
          <label>Objetivo Profissional (Breve Apresentação):</label>
          <textarea id="profBio" rows="3">${this.userProfile.bio}</textarea>
        </div>

        <div style="background: var(--soft-teal); border: 1px solid rgba(0,168,150,0.3); padding: 1rem; border-radius: 8px; margin-top: 1rem;">
          <label style="display: flex; align-items: flex-start; gap: 0.75rem; cursor: pointer; font-size: 0.85rem; color: #064E3B;">
            <input type="checkbox" id="profConsent" ${this.userProfile.parentConsentSigned ? 'checked' : ''} style="margin-top: 0.2rem; accent-color: var(--primary-cyan);" />
            <span><strong>Termo de Consentimento para Menores de 18 anos (LGPD):</strong> Declaro que os dados fornecidos são verdadeiros e autorizo a utilização dessas informações para intermediação gratuita de vagas e emissão de certificados educacionais.</span>
          </label>
        </div>
      </form>
    `;

    modal.classList.add('active');
  }

  saveProfileData() {
    const name = document.getElementById('profName')?.value.trim();
    const cpf = document.getElementById('profCpf')?.value.trim();
    const birth = document.getElementById('profBirth')?.value;
    const neighborhood = document.getElementById('profNeighborhood')?.value;
    const school = document.getElementById('profSchool')?.value.trim();
    const shift = document.getElementById('profShift')?.value;
    const bio = document.getElementById('profBio')?.value.trim();
    const consent = document.getElementById('profConsent')?.checked;

    if (!name || !cpf || !school || !consent) {
      this.showToast('Preencha os campos obrigatórios e aceite o termo de consentimento.', 'warning');
      return;
    }

    this.userProfile.name = name;
    this.userProfile.cpf = cpf;
    this.userProfile.birthDate = birth;
    this.userProfile.neighborhood = neighborhood;
    this.userProfile.schoolName = school;
    this.userProfile.schoolShift = shift;
    this.userProfile.bio = bio;
    this.userProfile.parentConsentSigned = consent;
    this.userProfile.isComplete = true;

    this.saveState();
    this.closeModals();
    this.renderDashboard();
    this.showToast('Cadastro burocrático atualizado e validado com sucesso!', 'success');
  }

  // --- MAPA INTERATIVO DE VAGAS (ESTILO INDEED / INFOJOBS / JOBRAPIDO) ---
  renderJobsMap() {
    const jobsListElem = document.getElementById('jobsListContainer');
    const keywordVal = (document.getElementById('jobKeywordInput')?.value || '').toLowerCase();
    const neighborhoodVal = document.getElementById('jobNeighborhoodSelect')?.value || 'all';
    const modalityVal = document.getElementById('jobModalitySelect')?.value || 'all';

    if (!jobsListElem) return;

    const filteredJobs = JOBS_DATA.filter(job => {
      const matchesKeyword = !keywordVal || 
                             job.title.toLowerCase().includes(keywordVal) ||
                             job.company.toLowerCase().includes(keywordVal) ||
                             job.description.toLowerCase().includes(keywordVal);

      const matchesNeighborhood = (neighborhoodVal === 'all' && this.selectedNeighborhood === 'all') ||
                                  (neighborhoodVal !== 'all' && job.neighborhood.toLowerCase() === neighborhoodVal.toLowerCase()) ||
                                  (this.selectedNeighborhood !== 'all' && job.neighborhood.toLowerCase() === this.selectedNeighborhood.toLowerCase());

      const matchesModality = modalityVal === 'all' || job.modality === modalityVal;

      return matchesKeyword && matchesNeighborhood && matchesModality;
    });

    if (filteredJobs.length === 0) {
      jobsListElem.innerHTML = `
        <div style="text-align: center; padding: 2.5rem; background: white; border-radius: 12px; border: 1px dashed var(--border-color);">
          <i class="fa-solid fa-map-location-dot" style="font-size: 2.5rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
          <h4 style="color: var(--deep-cyan);">Nenhuma vaga encontrada com esses filtros</h4>
          <p style="color: var(--text-secondary); font-size: 0.88rem; margin-top: 0.35rem;">Tente ajustar as palavras-chave, selecionar outro bairro ou modalidade.</p>
        </div>
      `;
      return;
    }

    jobsListElem.innerHTML = filteredJobs.map(job => {
      const userHasBadges = job.requiredBadges.filter(b => this.unlockedBadges.includes(b));
      const matchScore = Math.round((userHasBadges.length / job.requiredBadges.length) * 100);
      const isAlreadyApplied = this.applications.includes(job.id);

      return `
        <div class="job-card" id="job-card-${job.id}">
          <div class="job-header-row">
            <div>
              <span class="badge-tag cyan" style="font-size: 0.72rem; margin-bottom: 0.35rem;">${job.modalityLabel}</span>
              <h3 class="job-title">${job.title}</h3>
              <p class="job-company">${job.company} • <strong>${job.neighborhood}</strong> (${job.region})</p>
            </div>
            <span class="badge-tag ${matchScore === 100 ? 'accent-light' : 'amber'}">
              <i class="fa-solid fa-bolt"></i> ${matchScore}% Match
            </span>
          </div>

          <p style="font-size: 0.9rem; color: var(--text-primary); line-height: 1.5;">${job.dailyDuties[0]} e outras atribuições.</p>
          
          <div style="display: flex; gap: 1rem; font-size: 0.82rem; color: var(--text-secondary); flex-wrap: wrap;">
            <span><i class="fa-regular fa-clock"></i> ${job.workload}</span>
            <span><i class="fa-solid fa-money-bill-wave"></i> ${job.stipend}</span>
          </div>

          <div class="job-badges-req">
            <strong>Badges Exigidas pela Empresa:</strong>
            <div class="req-badges-list">
              ${job.requiredBadges.map(reqBadge => {
                const has = this.unlockedBadges.includes(reqBadge);
                return `
                  <span class="req-badge-tag ${has ? 'has-badge' : ''}">
                    <i class="fa-solid ${has ? 'fa-circle-check' : 'fa-circle'}"></i> ${reqBadge}
                  </span>
                `;
              }).join('')}
            </div>
          </div>

          <div class="job-actions-row">
            <button class="btn btn-outline btn-sm" onclick="app.openCompanyDetailsModal('${job.id}')" style="flex: 1;">
              <i class="fa-solid fa-building"></i> Ver Detalhes da Empresa
            </button>
            ${isAlreadyApplied ? `
              <button class="btn btn-outline btn-sm" disabled style="color: var(--primary-cyan); border-color: var(--primary-cyan); flex: 1;">
                <i class="fa-solid fa-circle-check"></i> Candidatura Enviada
              </button>
            ` : `
              <button class="btn btn-coral btn-sm" onclick="app.handleApplyProcess('${job.id}')" style="flex: 1;">
                <i class="fa-solid fa-paper-plane"></i> Candidatar-se
              </button>
            `}
          </div>
        </div>
      `;
    }).join('');
  }

  selectNeighborhood(neighborhood) {
    this.selectedNeighborhood = neighborhood;
    const selectElem = document.getElementById('jobNeighborhoodSelect');
    if (selectElem) selectElem.value = neighborhood;

    document.querySelectorAll('.neighborhood-tag-btn').forEach(btn => {
      if (btn.getAttribute('data-zone') === neighborhood) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    document.querySelectorAll('.neighborhood-zone-card').forEach(card => {
      if (card.getAttribute('data-zone') === neighborhood) {
        card.classList.add('selected');
      } else {
        card.classList.remove('selected');
      }
    });

    this.renderJobsMap();
  }

  // --- DETALHES COMPLETOS DA EMPRESA E VAGA (INDEED / INFOJOBS STYLE) ---
  openCompanyDetailsModal(jobId) {
    const job = JOBS_DATA.find(j => j.id === jobId);
    if (!job) return;

    const modal = document.getElementById('companyModal');
    const title = document.getElementById('companyModalTitle');
    const body = document.getElementById('companyModalBody');
    const actionBtn = document.getElementById('companyModalActionBtn');

    if (!modal || !body) return;

    const missingBadges = job.requiredBadges.filter(b => !this.unlockedBadges.includes(b));
    const isAlreadyApplied = this.applications.includes(job.id);

    title.textContent = `${job.title} - ${job.company}`;

    body.innerHTML = `
      <div style="display: flex; gap: 0.5rem; margin-bottom: 1.25rem; flex-wrap: wrap;">
        <span class="badge-tag cyan">${job.modalityLabel}</span>
        <span class="badge-tag accent-light"><i class="fa-solid fa-location-dot"></i> ${job.neighborhood}, Curitiba</span>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 1.1rem; color: var(--deep-cyan); margin-bottom: 0.4rem;">Sobre a Empresa & Cultura</h4>
        <p style="font-size: 0.92rem; color: var(--text-primary); line-height: 1.6;">${job.companyAbout}</p>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 1.1rem; color: var(--deep-cyan); margin-bottom: 0.4rem;">Atribuições e Rotina do Dia a Dia</h4>
        <ul style="display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.9rem; color: var(--text-primary);">
          ${job.dailyDuties.map(d => `<li>• ${d}</li>`).join('')}
        </ul>
      </div>

      <div style="background: var(--bg-neutral); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-color); margin-bottom: 1.5rem;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; font-size: 0.88rem;">
          <div><strong>Carga Horária:</strong> ${job.workload}</div>
          <div><strong>Remuneração:</strong> ${job.stipend}</div>
        </div>
      </div>

      <div style="margin-bottom: 1rem;">
        <h4 style="font-size: 1.1rem; color: var(--deep-cyan); margin-bottom: 0.5rem;">Requisitos de Cursos & Badges Obrigatórias:</h4>
        <div class="req-badges-list">
          ${job.requiredBadges.map(reqBadge => {
            const has = this.unlockedBadges.includes(reqBadge);
            return `
              <span class="req-badge-tag ${has ? 'has-badge' : ''}" style="font-size: 0.85rem; padding: 0.4rem 0.8rem;">
                <i class="fa-solid ${has ? 'fa-circle-check' : 'fa-triangle-exclamation'}"></i> ${reqBadge}
                ${has ? ' (Concluído)' : ' (Pendente)'}
              </span>
            `;
          }).join('')}
        </div>
      </div>

      <div style="background: var(--soft-teal); border-left: 3px solid var(--primary-cyan); padding: 0.75rem; border-radius: 4px; font-size: 0.8rem; color: #064E3B; margin-top: 1rem;">
        <i class="fa-solid fa-shield-halved"></i> ${job.lgpdNotice}
      </div>
    `;

    if (actionBtn) {
      if (isAlreadyApplied) {
        actionBtn.className = 'btn btn-outline btn-sm';
        actionBtn.innerHTML = '<i class="fa-solid fa-check"></i> Candidatura Já Enviada';
        actionBtn.onclick = () => this.closeModals();
      } else {
        actionBtn.className = 'btn btn-coral btn-sm';
        actionBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Candidatar-se para esta Vaga';
        actionBtn.onclick = () => {
          this.closeModals();
          this.handleApplyProcess(job.id);
        };
      }
    }

    modal.classList.add('active');
  }

  // --- FLUXO BUROCRÁTICO DE CANDIDATURA (VERIFICAÇÃO DE PERFIL E BADGES) ---
  handleApplyProcess(jobId) {
    const job = JOBS_DATA.find(j => j.id === jobId);
    if (!job) return;

    // 1. Verificação do Cadastro Burocrático
    if (!this.userProfile.isComplete || !this.userProfile.parentConsentSigned) {
      this.showPendingChecklistModal(job, 'cadastro');
      return;
    }

    // 2. Verificação de Badges e Cursos Exigidos
    const missingBadges = job.requiredBadges.filter(b => !this.unlockedBadges.includes(b));
    if (missingBadges.length > 0) {
      this.showPendingChecklistModal(job, 'badges', missingBadges);
      return;
    }

    // 3. Sucesso: Gravação da Candidatura
    if (!this.applications.includes(jobId)) {
      this.applications.push(jobId);
      localStorage.setItem(STATE_KEYS.APPLICATIONS, JSON.stringify(this.applications));
    }

    this.renderJobsMap();
    this.showToast(`✅ Candidatura formalizada com sucesso para "${job.title}" na empresa "${job.company}"! Seus dados e badges foram transmitidos de forma segura.`, 'success');
  }

  showPendingChecklistModal(job, reason, missingBadges = []) {
    const modal = document.getElementById('checklistModal');
    const title = document.getElementById('checklistModalTitle');
    const body = document.getElementById('checklistModalBody');
    const actionBtn = document.getElementById('checklistModalActionBtn');

    if (!modal || !body) return;

    title.textContent = `Atenção: Pré-requisitos para ${job.title}`;

    if (reason === 'cadastro') {
      body.innerHTML = `
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <div style="width: 60px; height: 60px; background: var(--amber-soft); color: #D97706; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin: 0 auto 1rem;">
            <i class="fa-solid fa-id-card-clip"></i>
          </div>
          <h4 style="color: var(--deep-cyan); font-size: 1.2rem;">Cadastro Formal Incompleto</h4>
          <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 0.35rem;">
            Conforme as normas da Lei da Aprendizagem e da Fundação Bradesco, você deve informar sua escola, turno escolar e assinar o consentimento LGPD antes de se candidatar.
          </p>
        </div>
      `;
      actionBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Completar Cadastro Agora';
      actionBtn.onclick = () => {
        this.closeModals();
        this.openEditProfileModal();
      };
    } else {
      body.innerHTML = `
        <div style="text-align: center; margin-bottom: 1.25rem;">
          <div style="width: 60px; height: 60px; background: #FFF1F2; color: var(--coral-alert); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin: 0 auto 1rem;">
            <i class="fa-solid fa-graduation-cap"></i>
          </div>
          <h4 style="color: var(--deep-cyan); font-size: 1.2rem;">Badges Obrigatórias Pendentes</h4>
          <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 0.35rem;">
            A empresa <strong>${job.company}</strong> exige a comprovação das seguintes certificações para este processo seletivo:
          </p>
        </div>

        <div style="background: var(--bg-neutral); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-color); margin-bottom: 1rem;">
          <strong style="color: var(--deep-cyan); display: block; margin-bottom: 0.5rem;">Você precisa concluir os cursos:</strong>
          <ul style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.88rem; color: var(--text-primary);">
            ${missingBadges.map(b => `
              <li style="display: flex; align-items: center; gap: 0.5rem; color: #B45309;">
                <i class="fa-solid fa-circle-xmark"></i> <strong>${b}</strong> (Curso gratuito disponível no catálogo)
              </li>
            `).join('')}
          </ul>
        </div>
      `;
      actionBtn.innerHTML = '<i class="fa-solid fa-layer-group"></i> Ir para o Catálogo de Cursos';
      actionBtn.onclick = () => {
        this.closeModals();
        window.location.hash = '#trilhas';
      };
    }

    modal.classList.add('active');
  }

  // --- MODAL DE DETALHES DO CURSO (EMENTA BRADESCO) ---
  openCourseDetails(courseId) {
    const course = COURSES_DATA.find(c => c.id === courseId);
    if (!course) return;

    const modal = document.getElementById('courseModal');
    const modalTitle = document.getElementById('courseModalTitle');
    const modalBody = document.getElementById('courseModalBody');
    const modalActionBtn = document.getElementById('courseModalActionBtn');

    if (!modal || !modalBody) return;

    modalTitle.textContent = course.title;
    const isEnrolled = !!this.enrolledCourses[course.id];
    const isCompleted = isEnrolled && this.enrolledCourses[course.id].completed;

    modalBody.innerHTML = `
      <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap;">
        <span class="badge-tag cyan">${course.trackName}</span>
        <span class="badge-tag accent-light">${course.duration}</span>
        <span class="badge-tag amber">${course.format}</span>
      </div>

      <p style="color: var(--text-primary); margin-bottom: 1.5rem; line-height: 1.6;">${course.description}</p>
      
      <div style="background: var(--soft-teal); padding: 1rem 1.25rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 3px solid var(--primary-cyan);">
        <strong style="color: var(--deep-cyan); display: block; margin-bottom: 0.25rem;">
          <i class="fa-solid fa-award" style="color: var(--amber-warning);"></i> Badge e Certificação Oficial ao Concluir:
        </strong>
        <span style="font-size: 0.95rem; color: var(--text-primary); font-weight: 600;">${course.badgeName}</span>
      </div>

      <h4 style="color: var(--deep-cyan); margin-bottom: 0.75rem; font-size: 1.1rem;">Ementa Completa do Curso (Escola Virtual):</h4>
      <div class="syllabus-list">
        ${course.syllabus.map((item, idx) => `
          <div class="syllabus-item">
            <div class="syllabus-number">${idx + 1}</div>
            <div style="font-size: 0.9rem; color: var(--text-primary); font-weight: 500;">${item}</div>
          </div>
        `).join('')}
      </div>

      <div style="margin-top: 1.5rem; font-size: 0.88rem; color: var(--text-secondary); border-top: 1px solid var(--border-color); padding-top: 1rem;">
        <p><strong>Corpo Docente / Especialista:</strong> ${course.instructor}</p>
        <p style="margin-top: 0.35rem;"><strong>Pré-requisitos:</strong> ${course.prerequisites}</p>
      </div>
    `;

    if (modalActionBtn) {
      if (isCompleted) {
        modalActionBtn.className = 'btn btn-outline';
        modalActionBtn.innerHTML = '<i class="fa-solid fa-check"></i> Certificado Emitido';
        modalActionBtn.onclick = () => this.closeModals();
      } else if (isEnrolled) {
        modalActionBtn.className = 'btn btn-deep-cyan';
        modalActionBtn.innerHTML = '<i class="fa-solid fa-play"></i> Continuar Estudos';
        modalActionBtn.onclick = () => {
          this.closeModals();
          this.continueCourse(course.id);
        };
      } else {
        modalActionBtn.className = 'btn btn-primary';
        modalActionBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Matricular-se Gratuitamente';
        modalActionBtn.onclick = () => {
          this.enrollCourse(course.id);
          this.closeModals();
        };
      }
    }

    modal.classList.add('active');
  }

  // --- SIMULADOR DE ENTREVISTAS (STAR) ---
  renderSimulator() {
    const qData = INTERVIEW_QUESTIONS[this.currentSimulatorIndex];
    if (!qData) return;

    const qThemeElem = document.getElementById('simTheme');
    const qCounterElem = document.getElementById('simCounter');
    const qTextElem = document.getElementById('simQuestionText');
    const qStarTipElem = document.getElementById('simStarTip');
    const answerInput = document.getElementById('simAnswerInput');
    const feedbackBox = document.getElementById('simFeedbackBox');

    if (qThemeElem) qThemeElem.textContent = qData.theme;
    if (qCounterElem) qCounterElem.textContent = `Pergunta ${this.currentSimulatorIndex + 1} de ${INTERVIEW_QUESTIONS.length}`;
    if (qTextElem) qTextElem.textContent = qData.question;
    if (qStarTipElem) qStarTipElem.textContent = qData.starTip;
    if (answerInput) answerInput.value = '';
    if (feedbackBox) feedbackBox.classList.remove('active');
  }

  evaluateAnswer() {
    const answerInput = document.getElementById('simAnswerInput');
    const feedbackBox = document.getElementById('simFeedbackBox');
    const feedbackContent = document.getElementById('simFeedbackContent');
    const text = (answerInput?.value || '').trim();

    if (!text || text.length < 20) {
      this.showToast('Por favor, digite uma resposta mais completa para receber a análise STAR.', 'warning');
      return;
    }

    const qData = INTERVIEW_QUESTIONS[this.currentSimulatorIndex];
    const wordsFound = qData.goodKeywords.filter(kw => text.toLowerCase().includes(kw));
    const scorePercentage = Math.min(100, Math.round((wordsFound.length / 3) * 100));

    let starEvaluationHtml = '';
    if (scorePercentage >= 70) {
      starEvaluationHtml = `
        <div style="color: #064E3B; font-weight: 700; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.4rem;">
          <i class="fa-solid fa-circle-check" style="color: var(--primary-cyan); font-size: 1.2rem;"></i> Excelente Estrutura STAR! (${scorePercentage}% de aderência)
        </div>
        <p style="color: #047857; font-size: 0.9rem; line-height: 1.5;">
          Você abordou com clareza o contexto e usou termos que transmitem atitude profissional e segurança. 
          Exemplo de resposta de referência de RH: <em>"${qData.sampleResponse}"</em>
        </p>
      `;
    } else {
      starEvaluationHtml = `
        <div style="color: #92400E; font-weight: 700; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.4rem;">
          <i class="fa-solid fa-lightbulb" style="color: var(--amber-warning); font-size: 1.2rem;"></i> Boa tentativa! Dica para deixar ainda mais forte:
        </div>
        <p style="color: #B45309; font-size: 0.9rem; line-height: 1.5;">
          Procure estruturar melhor a <strong>Ação</strong> (o que você fez) e o <strong>Resultado</strong> (o que aprendeu). Experimente incluir palavras como <em>${qData.goodKeywords.slice(0, 3).join(', ')}</em>.
        </p>
      `;
    }

    if (feedbackContent) feedbackContent.innerHTML = starEvaluationHtml;
    if (feedbackBox) feedbackBox.classList.add('active');
  }

  nextQuestion() {
    if (this.currentSimulatorIndex < INTERVIEW_QUESTIONS.length - 1) {
      this.currentSimulatorIndex++;
      this.renderSimulator();
    } else {
      this.showToast('Você finalizou o simulador de perguntas! Experimente agendar uma mentoria voluntária.', 'info');
      this.currentSimulatorIndex = 0;
      this.renderSimulator();
    }
  }

  // --- MENTORIA VOLUNTÁRIA ---
  renderMentors() {
    const listElem = document.getElementById('mentorsList');
    if (!listElem) return;

    listElem.innerHTML = MENTORS_DATA.map((m, idx) => `
      <div class="mentor-card">
        <img src="${m.avatar}" alt="${m.name}" class="mentor-photo" />
        <div class="mentor-details" style="flex: 1;">
          <h4>${m.name}</h4>
          <p class="mentor-role">${m.role}</p>
          <div class="mentor-tags">
            <span class="badge-tag accent-light" style="font-size: 0.72rem;">Mentoria Gratuita</span>
            <span class="badge-tag cyan" style="font-size: 0.72rem;">Online</span>
          </div>
          <div style="margin-top: 0.75rem;">
            <button class="btn btn-deep-cyan btn-sm" onclick="app.openMentorScheduleModal(${idx})">
              <i class="fa-regular fa-calendar-check"></i> Agendar Simulação
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  openMentorScheduleModal(mentorIdx) {
    const mentor = MENTORS_DATA[mentorIdx];
    if (!mentor) return;

    const modal = document.getElementById('mentorModal');
    const title = document.getElementById('mentorModalTitle');
    const body = document.getElementById('mentorModalBody');

    if (!modal || !body) return;

    title.textContent = `Agendar Mentoria com ${mentor.name}`;
    body.innerHTML = `
      <p style="color: var(--text-primary); margin-bottom: 1.25rem;">
        Selecione um horário disponível para realizar sua simulação de entrevista individual (30 minutos via Google Meet):
      </p>

      <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
        ${mentor.slots.map(slot => `
          <label style="display: flex; align-items: center; gap: 0.75rem; background: var(--bg-neutral); padding: 0.85rem 1.25rem; border-radius: 8px; cursor: pointer; border: 1px solid var(--border-color);">
            <input type="radio" name="mentorSlot" value="${slot}" checked style="accent-color: var(--primary-cyan);" />
            <span style="font-weight: 600; color: var(--deep-cyan);">${slot}</span>
          </label>
        `).join('')}
      </div>

      <div style="background: var(--soft-teal); padding: 1rem; border-radius: 8px; font-size: 0.85rem; color: var(--text-secondary);">
        <i class="fa-solid fa-lock" style="color: var(--primary-cyan);"></i> 
        Seus dados de contato só serão utilizados para o envio do link da sala virtual pela equipe voluntária da SkillHub.
      </div>
    `;

    const confirmBtn = document.getElementById('mentorConfirmBtn');
    if (confirmBtn) {
      confirmBtn.onclick = () => {
        const selected = document.querySelector('input[name="mentorSlot"]:checked')?.value;
        this.closeModals();
        this.showToast(`🎉 Mentoria confirmada para ${selected}! O link da sala foi enviado para seu e-mail cadastrado.`, 'success');
      };
    }

    modal.classList.add('active');
  }

  // --- GERADOR DE CURRÍCULO AUTOMÁTICO ---
  openCvModal() {
    const modal = document.getElementById('cvModal');
    const sheet = document.getElementById('cvSheetContent');
    if (!modal || !sheet) return;

    sheet.innerHTML = `
      <div class="cv-header">
        <div>
          <h2 class="cv-name">${this.userProfile.name}</h2>
          <p class="cv-title">Jovem Aprendiz / Estagiário(a) • ${this.userProfile.neighborhood}, ${this.userProfile.city} - PR</p>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.2rem;">
            E-mail: ${this.userProfile.email} • Telefone: ${this.userProfile.phone}
          </p>
        </div>
        <div style="text-align: right; font-size: 0.85rem; color: var(--text-secondary);">
          <p>Idade: ${this.userProfile.age} anos</p>
          <p>Escolaridade: ${this.userProfile.education}</p>
          <p>Turno: ${this.userProfile.schoolShift}</p>
        </div>
      </div>

      <div class="cv-section">
        <h3 class="cv-section-title">Objetivo Profissional</h3>
        <p style="font-size: 0.92rem; color: var(--text-primary); line-height: 1.5;">${this.userProfile.bio}</p>
      </div>

      <div class="cv-section">
        <h3 class="cv-section-title">Formação Escolar</h3>
        <p style="font-size: 0.9rem; color: var(--text-primary);">
          <strong>${this.userProfile.schoolName}</strong> (${this.userProfile.schoolType})<br>
          ${this.userProfile.education} • Turno: ${this.userProfile.schoolShift}
        </p>
      </div>

      <div class="cv-section">
        <h3 class="cv-section-title">Badges & Microcertificações Oficiais (SkillHub / Fundação Bradesco)</h3>
        <div class="cv-badges-list">
          ${this.unlockedBadges.map(badgeName => `
            <div class="cv-badge-row">
              <span style="font-weight: 700; color: var(--deep-cyan);">
                <i class="fa-solid fa-award" style="color: var(--primary-cyan);"></i> ${badgeName}
              </span>
              <span style="color: #018367; font-weight: 600; font-size: 0.8rem;">Avaliação Concluída (>= 70%)</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="cv-section">
        <h3 class="cv-section-title">Cursos em Formação Contínua</h3>
        <ul style="font-size: 0.9rem; color: var(--text-primary); display: flex; flex-direction: column; gap: 0.4rem;">
          ${Object.keys(this.enrolledCourses).map(cid => {
            const c = COURSES_DATA.find(item => item.id === cid);
            const inf = this.enrolledCourses[cid];
            return `<li>• <strong>${c.title}</strong> (${c.duration}) - Status: ${inf.completed ? 'Aprovado' : inf.progress + '% em andamento'}</li>`;
          }).join('')}
        </ul>
      </div>

      <div style="background: var(--bg-neutral); border: 1px dashed var(--border-color); padding: 0.75rem; border-radius: 6px; font-size: 0.78rem; color: var(--text-secondary); text-align: center; margin-top: 1.5rem;">
        Autenticidade verificada via SkillHub Curitiba • Respeito às Diretrizes de Proteção ao Menor Aprendiz (LGPD Art. 14)
      </div>
    `;

    modal.classList.add('active');
  }

  printCv() {
    window.print();
  }

  // --- CERTIFICADO INDIVIDUAL DE BADGE ---
  previewCertificate(badgeName) {
    const modal = document.getElementById('certModal');
    const body = document.getElementById('certModalBody');
    if (!modal || !body) return;

    body.innerHTML = `
      <div style="text-align: center; padding: 2.25rem; background: linear-gradient(135deg, #0A192F, #0D5C75); color: white; border-radius: 12px; border: 2px solid var(--light-cyan);">
        <i class="fa-solid fa-award" style="font-size: 3.5rem; color: var(--amber-warning); margin-bottom: 1rem;"></i>
        <h2 style="font-size: 1.8rem; font-weight: 800; color: white; letter-spacing: -0.02em;">CERTIFICADO OFICIAL DE CONCLUSÃO</h2>
        <p style="color: var(--light-cyan); font-size: 0.95rem; margin-top: 0.5rem;">A plataforma SkillHub em cooperação pedagógica certifica que</p>
        <h3 style="font-size: 1.6rem; color: white; margin: 1rem 0; text-decoration: underline var(--light-cyan);">${this.userProfile.name}</h3>
        <p style="color: #E2E8F0; font-size: 0.95rem; max-width: 480px; margin: 0 auto;">
          completou satisfatoriamente a avaliação final com aproveitamento superior a 70%, conquistando a insígnia profissional:
        </p>
        <div style="display: inline-block; background: rgba(2, 195, 154, 0.2); border: 1px solid var(--light-cyan); padding: 0.6rem 1.5rem; border-radius: 30px; font-size: 1.1rem; font-weight: 800; color: var(--light-cyan); margin-top: 1.25rem;">
          ${badgeName}
        </div>
        <p style="font-size: 0.78rem; color: #94A3B8; margin-top: 1.75rem;">
          Código de Autenticidade: SKILL-${Math.random().toString(36).substring(2, 9).toUpperCase()} • Registro Curitiba - PR
        </p>
      </div>
    `;

    modal.classList.add('active');
  }

  // --- RESPIRAÇÃO GUIADA ---
  startBreathingAnimation() {
    const circleOuter = document.getElementById('breathingOuter');
    const circleText = document.getElementById('breathingText');
    if (!circleOuter || !circleText) return;

    let phase = 0;
    const phases = [
      { text: 'Inspire...', class: 'inhale', duration: 4000 },
      { text: 'Segure...', class: 'inhale', duration: 4000 },
      { text: 'Expire...', class: '', duration: 4000 },
      { text: 'Relaxe...', class: '', duration: 4000 }
    ];

    const cycle = () => {
      const current = phases[phase];
      circleText.textContent = current.text;
      
      if (current.class) {
        circleOuter.classList.add(current.class);
      } else {
        circleOuter.classList.remove('inhale');
      }

      phase = (phase + 1) % phases.length;
      setTimeout(cycle, current.duration);
    };

    cycle();
  }

  // --- MODAL DE LGPD ---
  openLgpdModal() {
    const modal = document.getElementById('lgpdModal');
    if (modal) modal.classList.add('active');
  }

  toggleRecruiterPrivacy(enabled) {
    this.privacySettings.publicToRecruiters = enabled;
    this.saveState();
    if (enabled) {
      this.showToast('Visibilidade ativada: seu perfil anônimo está disponível para empresas parceiras.', 'info');
    } else {
      this.showToast('Modo Privado: nenhuma empresa poderá visualizar suas badges no mapa de talentos.', 'warning');
    }
  }

  // --- NOTIFICAÇÕES TOAST & CONTROLE DE MODAL ---
  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = 'fa-circle-info';
    if (type === 'success') icon = 'fa-circle-check';
    if (type === 'warning') icon = 'fa-triangle-exclamation';

    toast.innerHTML = `
      <i class="fa-solid ${icon}"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  closeModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
  }

  setupEventListeners() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.closest('.modal-close-btn')) {
          this.closeModals();
        }
      });
    });

    document.querySelectorAll('.track-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.track-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentTrackFilter = btn.getAttribute('data-track');
        this.renderCoursesCatalog();
      });
    });

    document.getElementById('courseSearchInput')?.addEventListener('input', () => this.renderCoursesCatalog());
    document.getElementById('filterDuration')?.addEventListener('change', () => this.renderCoursesCatalog());
    document.getElementById('filterLevel')?.addEventListener('change', () => this.renderCoursesCatalog());

    // Filtros múltiplos estilo Indeed / InfoJobs no Mapa
    document.getElementById('jobKeywordInput')?.addEventListener('input', () => this.renderJobsMap());
    document.getElementById('jobNeighborhoodSelect')?.addEventListener('change', (e) => {
      this.selectNeighborhood(e.target.value);
    });
    document.getElementById('jobModalitySelect')?.addEventListener('change', () => this.renderJobsMap());

    document.getElementById('privacyRecruiterToggle')?.addEventListener('change', (e) => {
      this.toggleRecruiterPrivacy(e.target.checked);
    });
  }

  saveState() {
    localStorage.setItem(STATE_KEYS.ENROLLED, JSON.stringify(this.enrolledCourses));
    localStorage.setItem(STATE_KEYS.BADGES, JSON.stringify(this.unlockedBadges));
    localStorage.setItem(STATE_KEYS.PRIVACY, JSON.stringify(this.privacySettings));
    localStorage.setItem(STATE_KEYS.PROFILE, JSON.stringify(this.userProfile));
    localStorage.setItem(STATE_KEYS.APPLICATIONS, JSON.stringify(this.applications));
  }
}

let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new SkillHubApp();
});
