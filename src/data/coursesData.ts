import { Course, Track } from '@/types';

export const TRACKS: Track[] = [
  {
    id: 'trilha-1',
    name: '1. Entrada no Mercado & Primeiro Emprego',
    category: 'Desenvolvimento Pessoal e Legislação',
    description: 'Trilha fundamental para quem quer conquistar a primeira vaga formal: direitos da Lei 10.097, elaboração de currículo campeão e técnicas comprovadas para entrevistas.',
    targetAudienceType: ['JOVEM_APRENDIZ', 'ESTUDANTE', 'PRIMEIRO_EMPREGO'],
    hoursTotal: 32,
    coursesCount: 3,
    courseIds: ['curso-jovem-aprendiz-avancado', 'curso-curriculo-plataformas', 'curso-postura-entrevistas'],
    badgeReward: 'Embaixador do Primeiro Emprego',
    icon: 'GraduationCap',
    accentColor: '#8B5CF6'
  },
  {
    id: 'trilha-2',
    name: '2. Soft Skills, Postura & Comunicação Corporativa',
    category: 'Desenvolvimento Pessoal',
    description: 'Aprenda a se comunicar com clareza em e-mails e reuniões, trabalhar em equipe, lidar com pressão e construir uma postura profissional ética.',
    targetAudienceType: 'TODOS',
    hoursTotal: 30,
    coursesCount: 3,
    courseIds: ['curso-comunicacao-corporativa', 'curso-atendimento-publico', 'curso-saude-mental-trabalho'],
    badgeReward: 'Mestre em Comunicação e Soft Skills',
    icon: 'Sparkles',
    accentColor: '#EC4899'
  },
  {
    id: 'trilha-3',
    name: '3. Tecnologia, Informática & Produtividade com IA',
    category: 'Tecnologia da Informação',
    description: 'Domine o pacote Office (Excel e Word), noções de inteligência artificial aplicada ao trabalho administrativo e segurança digital na empresa.',
    targetAudienceType: ['ESTAGIARIO', 'ESTUDANTE', 'JOVEM_APRENDIZ'],
    hoursTotal: 36,
    coursesCount: 3,
    courseIds: ['curso-excel-basico-avancado', 'curso-ia-produtividade', 'curso-informatica-seguranca'],
    badgeReward: 'Especialista em Produtividade Digital',
    icon: 'Laptop',
    accentColor: '#3B82F6'
  },
  {
    id: 'trilha-4',
    name: '4. Rotinas Administrativas & Gestão Empresarial',
    category: 'Administração e Negócios',
    description: 'Organização de arquivos e fluxos, suporte a departamentos de RH e financeiro, redação de atas e atendimento profissional.',
    targetAudienceType: ['JOVEM_APRENDIZ', 'ESTAGIARIO'],
    hoursTotal: 25,
    coursesCount: 2,
    courseIds: ['curso-rotinas-administrativas', 'curso-gestao-tempo'],
    badgeReward: 'Gestor de Rotinas Administrativas',
    icon: 'Briefcase',
    accentColor: '#F59E0B'
  },
  {
    id: 'trilha-5',
    name: '5. Educação Financeira & Cidadania no Trabalho',
    category: 'Desenvolvimento Pessoal',
    description: 'Como administrar o primeiro salário, poupar para o futuro, evitar golpes e entender os impostos e deduções do contracheque.',
    targetAudienceType: 'TODOS',
    hoursTotal: 20,
    coursesCount: 1,
    courseIds: ['curso-financas-pessoais'],
    badgeReward: 'Cidadão Consciente & Finanças',
    icon: 'DollarSign',
    accentColor: '#10B981'
  }
];

export const COURSES: Course[] = [
  // =========================================================================
  // 1. JORNADA DO JOVEM APRENDIZ & ESTAGIÁRIO (AVANÇADO)
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
  // 2. ELABORAÇÃO DE CURRÍCULO CAMPEÃO & PLATAFORMAS
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
  // 3. POSTURA PROFISSIONAL & ENTREVISTAS DE EMPREGO
  // =========================================================================
  {
    id: 'curso-postura-entrevistas',
    trackId: 'trilha-1',
    trackName: 'TRILHA 1: Entrada no Mercado & Primeiro Emprego',
    category: 'Desenvolvimento Pessoal',
    targetAudienceType: ['PRIMEIRO_EMPREGO', 'JOVEM_APRENDIZ', 'ESTUDANTE'],
    title: 'Postura Profissional e Técnicas para Entrevistas de Emprego',
    subtitle: 'Comportamento corporativo, dinâmicas de grupo, vestimenta adequada, comunicação assertiva e perguntas difíceis',
    hours: 10,
    equivalentHours: 10,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Jovens participando de processos seletivos',
    prerequisites: 'Nenhum.',
    badgeName: 'Destaque em Entrevistas',
    badgeCategory: 'Atitude Profissional',
    badgeIcon: 'UserCheck',
    accentColor: '#8B5CF6',
    learningObjectives: [
      'Preparar respostas autênticas para as perguntas mais frequentes de recrutadores de RH.',
      'Desenvolver linguagem corporal confiante, contato visual e dicção clara.',
      'Saber se posicionar em dinâmicas de grupo com espírito de equipe e sem timidez.',
      'Fazer perguntas inteligentes ao entrevistador no final da conversa.'
    ],
    modules: [
      {
        id: 'pos-mod-1',
        number: 1,
        title: 'MÓDULO 1: Preparação e Apresentação Pessoal',
        summary: 'Pesquisa prévia sobre a empresa, pontualidade britânica, vestimenta adequada e controle do nervosismo.',
        estimatedMinutes: 40,
        content: {
          sections: [
            {
              subheading: '1.1 A Regra dos 15 Minutos de Antecedência',
              body: [
                'Em Curitiba, imprevistos no transporte coletivo ou trânsito acontecem. Calcule seu trajeto com antecedência e chegue 15 minutos antes do horário marcado.',
                'Pesquise sobre a empresa: qual o ramo de atuação, produtos fabricados ou serviços prestados. Isso demonstra interesse real.'
              ]
            },
            {
              subheading: '1.2 Vestimenta e Comunicação Não-Verbal',
              body: [
                'Vista-se de maneira sóbria e profissional (calça jeans sem rasgos, camisa ou polo, calçado fechado).',
                'Mantenha postura ereta, cumprimente os entrevistadores com firmeza e mantenha contato visual cordial durante as respostas.'
              ]
            }
          ]
        }
      },
      {
        id: 'pos-mod-2',
        number: 2,
        title: 'MÓDULO 2: Dominando as Perguntas Clássicas do RH',
        summary: '"Conte sobre você", pontos fortes, pontos a melhorar e por que quer trabalhar conosco.',
        estimatedMinutes: 40,
        content: {
          sections: [
            {
              subheading: '2.1 A Estrutura da Pergunta "Conte-me sobre você"',
              body: [
                'Não conte sua história desde a infância. Use o roteiro: Presente (o que está estudando) -> Conquistas (cursos, badges, habilidades) -> Futuro (por que quer essa vaga).'
              ],
              highlightBox: {
                type: 'info',
                title: 'Exemplo Prático de Resposta',
                text: '"Atualmente curso o 2º ano do Ensino Médio no período noturno. Concluí cursos de Informática e Rotinas Administrativas no SkillHub e busco essa vaga de Jovem Aprendiz para colocar em prática minha organização e crescer junto à empresa."'
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
        question: 'Qual a conduta recomendada ao responder sobre seus pontos a melhorar em uma entrevista?',
        options: [
          'Dizer que é perfeccionista demais ou que não tem nenhum defeito.',
          'Citar uma oportunidade de melhoria real e explicar o que tem feito ativamente para desenvolvê-la.',
          'Falar mal de professores da escola.',
          'Ficar em silêncio.'
        ],
        correct: 1,
        explanation: 'Demonstrar autoconhecimento e atitude ativa de aprendizado é o que os recrutadores mais valorizam.'
      }
    ]
  },

  // =========================================================================
  // 4. MICROSOFT EXCEL & PLANILHAS INTELIGENTES
  // =========================================================================
  {
    id: 'curso-excel-basico-avancado',
    trackId: 'trilha-3',
    trackName: 'TRILHA 3: Tecnologia, Informática & Produtividade com IA',
    category: 'Tecnologia da Informação',
    targetAudienceType: ['ESTAGIARIO', 'ESTUDANTE', 'JOVEM_APRENDIZ'],
    title: 'Microsoft Excel & Planilhas Eletrônicas para Escritório',
    subtitle: 'Fórmulas essenciais (SOMA, MÉDIA, SE, PROCV), formatação de tabelas, gráficos gerenciais e atalhos rápidos',
    hours: 16,
    equivalentHours: 16,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Estudantes e aprendizes atuando em apoio administrativo e operacional',
    prerequisites: 'Noções básicas de uso do computador.',
    badgeName: 'Excel & Ferramentas de Escritório',
    badgeCategory: 'Ferramentas de Escritório',
    badgeIcon: 'Briefcase',
    accentColor: '#10B981',
    learningObjectives: [
      'Navegar com destreza pelas células, linhas, colunas e abas do Microsoft Excel e Google Planilhas.',
      'Escrever fórmulas matemáticas básicas e funções essenciais como =SOMA(), =MÉDIA(), =SE() e =PROCV().',
      'Aplicar formatação condicional visual para destacar status (ex: Pendente / Concluído).',
      'Construir gráficos de colunas e setores para apresentação de relatórios à chefia.'
    ],
    modules: [
      {
        id: 'exc-mod-1',
        number: 1,
        title: 'MÓDULO 1: Estrutura de Células e Operações Básicas',
        summary: 'Conceito de células (A1, B2), inserção de dados, tipos de dados (texto, número, moeda, data) e auto-preenchimento.',
        estimatedMinutes: 45,
        content: {
          sections: [
            {
              subheading: '1.1 O Sinal de Igual (=) e as Quatro Operações',
              body: [
                'Toda fórmula no Excel deve começar obrigatoriamente com o sinal de igual (=).',
                'Operadores aritméticos: Adição (+), Subtração (-), Multiplicação (*) e Divisão (/).',
                'Exemplo: =A1*B1 calcula o preço unitário multiplicado pela quantidade em estoque.'
              ]
            }
          ]
        }
      },
      {
        id: 'exc-mod-2',
        number: 2,
        title: 'MÓDULO 2: Funções Lógicas e de Busca (=SE, =PROCV, =CONT.SE)',
        summary: 'Como automatizar decisões em planilhas e localizar dados em grandes tabelas de produtos ou clientes.',
        estimatedMinutes: 50,
        content: {
          sections: [
            {
              subheading: '2.1 A Função Lógica =SE()',
              body: [
                'A função =SE(teste_lógico; valor_se_verdadeiro; valor_se_falso) permite que a planilha tome decisões automáticas.',
                'Exemplo: =SE(C2>=70; "Aprovado"; "Em Revisão") classifica alunos com base na nota de corte.'
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
        question: 'Com qual caractere deve iniciar qualquer fórmula ou cálculo no Microsoft Excel?',
        options: [
          'Com o sinal de soma (+)',
          'Com o sinal de igual (=)',
          'Com o arroba (@)',
          'Com uma barra (/)'
        ],
        correct: 1,
        explanation: 'O sinal de igual (=) instrui o software a calcular a expressão seguinte.'
      }
    ]
  },

  // =========================================================================
  // 5. INTELIGÊNCIA ARTIFICIAL E PRODUTIVIDADE
  // =========================================================================
  {
    id: 'curso-ia-produtividade',
    trackId: 'trilha-3',
    trackName: 'TRILHA 3: Tecnologia, Informática & Produtividade com IA',
    category: 'Tecnologia da Informação',
    targetAudienceType: ['ESTAGIARIO', 'ESTUDANTE'],
    title: 'Inteligência Artificial e Automação no Dia a Dia de Trabalho',
    subtitle: 'Como utilizar IA generativa (Gemini/ChatGPT) com segurança, prompts eficazes e ética profissional',
    hours: 12,
    equivalentHours: 12,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Jovens que desejam turbinar sua produtividade com tecnologia moderna',
    prerequisites: 'Navegação básica na web.',
    badgeName: 'Inovador em IA & Produtividade',
    badgeCategory: 'Ferramentas de Escritório',
    badgeIcon: 'Cpu',
    accentColor: '#3B82F6',
    learningObjectives: [
      'Escrever prompts estruturados para resumir textos longos e gerar rascunhos de relatórios.',
      'Compreender os riscos de vazamento de dados corporativos confidenciais ao usar ferramentas públicas de IA.',
      'Revisar criticamente saídas geradas por IA para evitar informações incorretas.'
    ],
    modules: [
      {
        id: 'ia-mod-1',
        number: 1,
        title: 'MÓDULO 1: Engenharia de Prompts e Ética Corporativa',
        summary: 'Regras de ouro: nunca colar dados sigilosos/senhas em chats de IA e sempre conferir os resultados.',
        estimatedMinutes: 35,
        content: {
          sections: [
            {
              subheading: '1.1 Segurança e LGPD na Era da IA',
              body: [
                'A IA é um co-piloto e assistente. A responsabilidade final pelo trabalho entregue é sempre do profissional humano.',
                'Dados sigilosos de clientes, senhas e informações financeiras internas da empresa jamais devem ser colados em modelos públicos de IA.'
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
        question: 'O que NUNCA deve ser inserido em ferramentas públicas de Inteligência Artificial no trabalho?',
        options: [
          'Dúvidas sobre regras ortográficas da língua portuguesa.',
          'Dados sigilosos de clientes, CPFs, senhas corporativas e relatórios financeiros confidenciais.',
          'Pedidos de sugestões de ideias para títulos de apresentação.',
          'Dúvidas de fórmulas de Excel.'
        ],
        correct: 1,
        explanation: 'A privacidade e a LGPD exigem sigilo rigoroso sobre dados corporativos e dados pessoais de clientes.'
      }
    ]
  },

  // =========================================================================
  // 6. ROTINAS ADMINISTRATIVAS & GESTÃO DOCUMENTAL
  // =========================================================================
  {
    id: 'curso-rotinas-administrativas',
    trackId: 'trilha-4',
    trackName: 'TRILHA 4: Rotinas Administrativas & Gestão Empresarial',
    category: 'Administração e Negócios',
    targetAudienceType: ['JOVEM_APRENDIZ', 'ESTAGIARIO'],
    title: 'Rotinas Administrativas e Organização de Processos de Escritório',
    subtitle: 'Gestão documental física e digital, fluxos de compras, suporte a RH e controles de estoque',
    hours: 15,
    equivalentHours: 15,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Aprendizes e estagiários de apoio administrativo',
    prerequisites: 'Nenhum.',
    badgeName: 'Especialista em Rotinas Administrativas',
    badgeCategory: 'Ferramentas de Escritório',
    badgeIcon: 'Building',
    accentColor: '#F59E0B',
    learningObjectives: [
      'Organizar pastas e arquivos digitais em nuvem seguindo nomenclatura padronizada.',
      'Controlar recebimento de notas fiscais e encaminhamento a departamentos contábeis.',
      'Conhecer o fluxo de admissão de pessoal e conferência básica de documentos.'
    ],
    modules: [
      {
        id: 'rot-mod-1',
        number: 1,
        title: 'MÓDULO 1: Organização Documental e Métodos de Arquivamento',
        summary: 'Critérios alfabético, cronológico e numérico para arquivamento rápido e sem perda de documentos.',
        estimatedMinutes: 40,
        content: {
          sections: [
            {
              subheading: '1.1 Gestão de Arquivos Digitais',
              body: [
                'Nomes de arquivos padronizados (ex: AAAA-MM-DD_Relatorio_Financeiro.pdf) evitam retrabalho e agilizam buscas em equipe.'
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
        question: 'Qual a melhor prática para nomear arquivos digitais em uma rede compartilhada da empresa?',
        options: [
          'documento_final_agora_vai_2.docx',
          '2026-09-15_Ata_Reuniao_Diretoria_v1.pdf',
          'asdfg.xlsx',
          'novo(1).pdf'
        ],
        correct: 1,
        explanation: 'Padrão com data (ISO), assunto claro e versão garante rastreabilidade e organização de equipe.'
      }
    ]
  },

  // =========================================================================
  // 7. EDUCAÇÃO FINANCEIRA & ORÇAMENTO PESSOAL
  // =========================================================================
  {
    id: 'curso-financas-pessoais',
    trackId: 'trilha-5',
    trackName: 'TRILHA 5: Educação Financeira & Cidadania no Trabalho',
    category: 'Desenvolvimento Pessoal',
    targetAudienceType: 'TODOS',
    title: 'Educação Financeira & Orçamento do Primeiro Salário',
    subtitle: 'Gestão da primeira renda, regra 50-30-20, reserva de emergência e fuga de endividamento precoce',
    hours: 10,
    equivalentHours: 10,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Aprendizes e estagiários recém-contratados',
    prerequisites: 'Nenhum.',
    badgeName: 'Mestre em Finanças',
    badgeCategory: 'Finanças',
    badgeIcon: 'DollarSign',
    accentColor: '#10B981',
    learningObjectives: [
      'Aprender a planejar gastos mensais a partir do salário líquido real.',
      'Aplicar o método de divisão de orçamento 50/30/20.',
      'Compreender o perigo dos juros rotativos de cartão de crédito e empréstimos fáceis.'
    ],
    modules: [
      {
        id: 'fin-mod-1',
        number: 1,
        title: 'MÓDULO 1: O Primeiro Salário e a Regra 50/30/20',
        summary: '50% Necessidades Básicas, 30% Desejos Pessoais, 20% Poupança/Reserva de Futuro.',
        estimatedMinutes: 30,
        content: {
          sections: [
            {
              subheading: '1.1 A armadilha do primeiro salário',
              body: [
                'Ao receber o primeiro salário, muitos jovens gastam 100% no primeiro final de semana.',
                'O método 50/30/20 ensina a equilibrar o apoio financeiro à família, transporte/alimentação, lazer consciente e uma reserva financeira para imprevistos.'
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
        question: 'Na metodologia de orçamento 50/30/20, o que representam os 20%?',
        options: [
          'Gasto exclusivo com roupas e festas.',
          'Reserva financeira, investimentos para o futuro e poupança de emergência.',
          'Pagamento de impostos adicionais.',
          'Gorjetas e apostas online.'
        ],
        correct: 1,
        explanation: 'Os 20% são destinados à construção da sua reserva de emergência e investimentos futuros.'
      }
    ]
  },

  // =========================================================================
  // 8. EQUILÍBRIO EMOCIONAL E SAÚDE MENTAL
  // =========================================================================
  {
    id: 'curso-saude-mental-trabalho',
    trackId: 'trilha-2',
    trackName: 'TRILHA 2: Soft Skills, Postura & Comunicação Corporativa',
    category: 'Desenvolvimento Pessoal',
    targetAudienceType: 'TODOS',
    title: 'Equilíbrio Emocional, Ansiedade e Foco no Trabalho',
    subtitle: 'Gestão de estresse, comunicação não-violenta, adaptação ao primeiro ambiente corporativo e acolhimento',
    hours: 10,
    equivalentHours: 10,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Estudantes e aprendizes em transição para o mercado',
    prerequisites: 'Nenhum.',
    badgeName: 'Inteligência Emocional',
    badgeCategory: 'Saúde Mental',
    badgeIcon: 'HeartPulse',
    accentColor: '#EC4899',
    learningObjectives: [
      'Identificar gatilhos de ansiedade no primeiro emprego e desenvolver técnicas de respiração e foco.',
      'Saber comunicar limites e pedir ajuda quando sobrecarregado com tarefas da escola e do trabalho.',
      'Identificar ambientes acolhedores e canais de apoio psicossocial.'
    ],
    modules: [
      {
        id: 'sau-mod-1',
        number: 1,
        title: 'MÓDULO 1: Transição da Escola para o Trabalho com Saúde Mental',
        summary: 'Como lidar com o medo do erro, cobranças de prazos e convivência com equipes.',
        estimatedMinutes: 30,
        content: {
          sections: [
            {
              subheading: '1.1 O erro como oportunidade de aprendizado',
              body: [
                'O aprendiz está na empresa prioritariamente para aprender. Não tenha vergonha de fazer perguntas ao seu mentor quando tiver dúvidas sobre um procedimento.'
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
        question: 'O que fazer ao se sentir sobrecarregado ou em dúvida sobre uma tarefa no trabalho?',
        options: [
          'Esconder o problema e faltar no dia seguinte.',
          'Conversar abertamente com seu gestor/tutor, pedir orientação e alinhar prioridades.',
          'Pedir demissão imediatamente sem avisar ninguém.',
          'Fazer a tarefa de qualquer jeito sem ler as instruções.'
        ],
        correct: 1,
        explanation: 'A comunicação transparente com o tutor é o caminho profissional mais saudável e seguro.'
      }
    ]
  },

  // =========================================================================
  // 9. COMUNICAÇÃO ESCRITA & E-MAILS CORPORATIVOS
  // =========================================================================
  {
    id: 'curso-comunicacao-corporativa',
    trackId: 'trilha-2',
    trackName: 'TRILHA 2: Soft Skills, Postura & Comunicação Corporativa',
    category: 'Desenvolvimento Pessoal',
    targetAudienceType: 'TODOS',
    title: 'Comunicação Escrita, Emails e Redação Corporativa',
    subtitle: 'Norma culta sem formalismo excessivo, clareza em mensagens eletrônicas, Slack/Teams e relatórios',
    hours: 10,
    equivalentHours: 10,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Estudantes, aprendizes e estagiários',
    prerequisites: 'Nenhum.',
    badgeName: 'Comunicação Corporativa',
    badgeCategory: 'Atitude Profissional',
    badgeIcon: 'Mail',
    accentColor: '#EC4899',
    learningObjectives: [
      'Redigir e-mails profissionais com assunto claro, saudação adequada e despedida cordial.',
      'Evitar gírias e abreviações de internet em comunicações formais da empresa.',
      'Aprender a elaborar atas de reuniões e resumos de atividades.'
    ],
    modules: [
      {
        id: 'com-mod-1',
        number: 1,
        title: 'MÓDULO 1: A Arte da Redação no Ambiente de Trabalho',
        summary: 'Estrutura padrão de e-mails corporativos e mensagens de chat profissional.',
        estimatedMinutes: 30,
        content: {
          sections: [
            {
              subheading: '1.1 Anatomia do Email Profissional',
              body: [
                'Todo e-mail deve ter: Assunto objetivo, Vocativo profissional ("Prezado Carlos," / "Olá equipe,"), Corpo conciso e Fechamento com Assinatura.'
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
        question: 'Qual o formato correto de assunto para um e-mail de envio de relatório?',
        options: [
          'oi olha ai',
          '[Relatório] Acompanhamento Semanal de Vagas - Setembro/2026',
          'URGENTE VEJA ISSO',
          'Deixar o assunto em branco'
        ],
        correct: 1,
        explanation: 'Um assunto contextualizado e claro permite ao leitor identificar imediatamente o teor do documento.'
      }
    ]
  },

  // =========================================================================
  // 10. ATENDIMENTO AO PÚBLICO E RELACIONAMENTO
  // =========================================================================
  {
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
  // 11. INFORMÁTICA & SEGURANÇA DIGITAL
  // =========================================================================
  {
    id: 'curso-informatica-seguranca',
    trackId: 'trilha-3',
    trackName: 'TRILHA 3: Tecnologia, Informática & Produtividade com IA',
    category: 'Tecnologia da Informação',
    targetAudienceType: 'TODOS',
    title: 'Informática Básica, Nuvem e Segurança da Informação',
    subtitle: 'Navegação segura, senhas fortes, Google Drive/OneDrive e proteção contra phishing',
    hours: 10,
    equivalentHours: 10,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Estudantes e aprendizes iniciando o uso de computadores corporativos',
    prerequisites: 'Nenhum.',
    badgeName: 'Segurança Digital & Nuvem',
    badgeCategory: 'Ferramentas de Escritório',
    badgeIcon: 'Shield',
    accentColor: '#3B82F6',
    learningObjectives: [
      'Criar senhas fortes e gerenciar autenticação em dois fatores.',
      'Identificar e-mails de phishing e links maliciosos.',
      'Organizar pastas e permissões de compartilhamento no Google Drive e OneDrive.'
    ],
    modules: [
      {
        id: 'inf-mod-1',
        number: 1,
        title: 'MÓDULO 1: Proteção de Senhas e Prevenção a Fraudes',
        summary: 'Como manter o computador da empresa seguro e evitar infecções por malware.',
        estimatedMinutes: 30,
        content: {
          sections: [
            {
              subheading: '1.1 Criando Senhas Inquebráveis',
              body: [
                'Combine letras maiúsculas, minúsculas, números e caracteres especiais. Nunca utilize "123456" ou sua data de aniversário.'
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
        question: 'Se você receber um e-mail suspeito pedindo sua senha corporativa, o que deve fazer?',
        options: [
          'Responder imediatamente com a senha.',
          'Não clicar em nenhum link e alertar o time de TI da empresa.',
          'Encaminhar para todos os colegas de trabalho.',
          'Ignorar e apagar sem avisar ninguém.'
        ],
        correct: 1,
        explanation: 'Nunca compartilhe senhas por e-mail e sempre notifique o departamento de segurança da informação.'
      }
    ]
  },

  // =========================================================================
  // 12. GESTÃO DO TEMPO & PRODUTIVIDADE
  // =========================================================================
  {
    id: 'curso-gestao-tempo',
    trackId: 'trilha-4',
    trackName: 'TRILHA 4: Rotinas Administrativas & Gestão Empresarial',
    category: 'Desenvolvimento Pessoal',
    targetAudienceType: ['JOVEM_APRENDIZ', 'ESTUDANTE', 'ESTAGIARIO'],
    title: 'Gestão do Tempo, Foco e Conciliação Escola x Trabalho',
    subtitle: 'Técnica Pomodoro, Matriz de Prioridades de Eisenhower e organização de agenda',
    hours: 10,
    equivalentHours: 10,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Jovens que precisam equilibrar estudos e rotina de trabalho',
    prerequisites: 'Nenhum.',
    badgeName: 'Mestre da Produtividade',
    badgeCategory: 'Atitude Profissional',
    badgeIcon: 'Clock',
    accentColor: '#F59E0B',
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
  }
];
