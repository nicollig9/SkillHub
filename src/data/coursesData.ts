import { Course, Track } from '@/types';

export const TRACKS: Track[] = [
  {
    id: 'trilha-1',
    name: '1. Entrada no Mercado & Primeiro Emprego',
    category: 'Desenvolvimento Pessoal e Legislação',
    description: 'Trilha fundamental para quem quer conquistar a primeira vaga formal: direitos da Lei 10.097, orçamento do primeiro salário e técnicas comprovadas para entrevistas.',
    targetAudienceType: ['JOVEM_APRENDIZ', 'ESTUDANTE', 'PRIMEIRO_EMPREGO'],
    hoursTotal: 34,
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
  // 2. ORÇAMENTO DO PRIMEIRO SALÁRIO
  // =========================================================================
  {
    id: 'curso-curriculo-plataformas',
    trackId: 'trilha-1',
    trackName: 'TRILHA 1: Entrada no Mercado & Primeiro Emprego',
    category: 'Desenvolvimento Pessoal',
    targetAudienceType: ['PRIMEIRO_EMPREGO', 'JOVEM_APRENDIZ', 'ESTUDANTE'],
    title: 'Orçamento do Primeiro Salário',
    subtitle: 'Ensinar a organizar, priorizar e multiplicar o primeiro salário, evitando dívidas e criando hábitos financeiros saudáveis desde o início da carreira.',
    hours: 12,
    equivalentHours: 12,
    modality: 'EAD 100% Gratuito (Escola Virtual)',
    targetAudience: 'Jovens aprendizes, estagiários e profissionais em seu primeiro emprego',
    prerequisites: 'Nenhum pré-requisito.',
    badgeName: 'Orçamento do Primeiro Salário',
    badgeCategory: 'Finanças Pessoais',
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
    level: 'Iniciante',
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
    level: 'Intermediário',
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
    level: 'Avançado',
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
    level: 'Intermediário',
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
    level: 'Iniciante',
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
    level: 'Iniciante',
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
    level: 'Intermediário',
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
    level: 'Intermediário',
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
  // 13. COMUNICAÇÃO NÃO-VIOLENTA (CNV) E EMPATIA
  // =========================================================================
  {
    id: 'curso-comunicacao-nao-violenta',
    trackId: 'trilha-2',
    trackName: 'TRILHA 2: Soft Skills, Postura & Comunicação Corporativa',
    category: 'Desenvolvimento Pessoal',
    targetAudienceType: 'TODOS',
    title: 'Comunicação Não-Violenta (CNV) e Empatia no Trabalho',
    subtitle: 'Os 4 pilares da CNV (Observação, Sentimento, Necessidade e Pedido) para relacionamentos saudáveis no primeiro emprego',
    hours: 8,
    equivalentHours: 8,
    modality: 'EAD 100% Gratuito',
    targetAudience: 'Jovens aprendizes, estagiários e estudantes',
    prerequisites: 'Nenhum.',
    badgeName: 'CNV & Empatia',
    badgeCategory: 'Atitude Profissional',
    badgeIcon: 'HeartHandshake',
    accentColor: '#EC4899',
    level: 'Iniciante',
    learningObjectives: [
      'Identificar fatos objetivos sem misturar com julgamentos ou suposições.',
      'Reconhecer necessidades humanas básicas por trás de feedbacks difíceis.',
      'Formular pedidos claros e acionáveis em vez de exigências no trabalho.'
    ],
    modules: [
      {
        id: 'cnv-mod-1',
        number: 1,
        title: 'MÓDULO 1: Os 4 Passos da Comunicação Não-Violenta',
        summary: 'Aprenda a fórmula prática de Marshall Rosenberg para se comunicar sem gerar brigas ou defensividade.',
        estimatedMinutes: 30,
        content: {
          sections: [
            {
              subheading: '1.1 A Fórmula dos 4 Passos',
              body: [
                '1. Observação: Relate o fato concreto sem adjetivos acusatórios (ex: "Ontem a planilha não foi preenchida").',
                '2. Sentimento: Diga como se sente de forma honesta (ex: "Fiquei preocupado com o prazo do cliente").',
                '3. Necessidade: Explique a necessidade por trás (ex: "Porque nossa equipe precisa de previsibilidade").',
                '4. Pedido: Faça um pedido concreto e realizável (ex: "Você poderia me avisar até as 14h se houver atraso?").'
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
        question: 'Qual é o primeiro passo da Comunicação Não-Violenta (CNV)?',
        options: [
          'Exigir que a outra pessoa peça desculpas imediatamente.',
          'Observar fatos concretos sem misturar com julgamentos ou críticas pessoais.',
          'Reclamar com o chefe da empresa.',
          'Ficar em silêncio e não responder.'
        ],
        correct: 1,
        explanation: 'Observar fatos objetivos sem julgar evita que o interlocutor entre em modo de defesa.'
      }
    ]
  },

  // =========================================================================
  // 14. EXCEL PARA INICIANTES
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
  // 15. LGPD, PRIVACIDADE E SEGURANÇA DIGITAL
  // =========================================================================
  {
    id: 'curso-lgpd-seguranca-dados',
    trackId: 'trilha-3',
    trackName: 'TRILHA 3: Tecnologia, Informática & Produtividade com IA',
    category: 'Tecnologia da Informação',
    targetAudienceType: ['JOVEM_APRENDIZ', 'ESTAGIARIO'],
    title: 'LGPD, Privacidade e Segurança Digital Corporativa',
    subtitle: 'Lei Geral de Proteção de Dados (Lei nº 13.709/18), proteção de dados de menores, phishing e sigilo de senhas',
    hours: 14,
    equivalentHours: 14,
    modality: 'EAD 100% Gratuito',
    targetAudience: 'Jovens aprendizes e estagiários em ambientes corporativos informatizados',
    prerequisites: 'Noções básicas de informática.',
    badgeName: 'Especialista em LGPD & Dados',
    badgeCategory: 'Trabalho',
    badgeIcon: 'ShieldCheck',
    accentColor: '#8B5CF6',
    level: 'Avançado',
    learningObjectives: [
      'Compreender o conceito de Dado Pessoal e Dado Pessoal Sensível segundo a LGPD.',
      'Saber como tratar dados de clientes e colegas de trabalho sem infringir a lei.',
      'Identificar ataques de engenharia social, phishing e manter autenticação em 2 fatores ativa.'
    ],
    modules: [
      {
        id: 'lgpd-mod-1',
        number: 1,
        title: 'MÓDULO 1: Fundamentos da LGPD e Responsabilidade no Trabalho',
        summary: 'Conheça as principais obrigações que todo colaborador deve seguir ao lidar com dados de terceiros.',
        estimatedMinutes: 35,
        content: {
          sections: [
            {
              subheading: '1.1 O que é Dado Pessoal?',
              body: [
                'Qualquer informação relacionada a pessoa natural identificada ou identificável (CPF, e-mail, telefone, biometria).',
                'Compartilhar listas de clientes em grupos não autorizados de WhatsApp é infração grave com penalidades para a empresa e o colaborador.'
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
        question: 'O que o colaborador deve fazer ao receber um e-mail suspeito solicitando senhas internas da empresa?',
        options: [
          'Enviar a senha imediatamente para não ser demitido.',
          'Nunca fornecer senhas e reportar imediatamente à equipe de TI/Segurança da Informação.',
          'Encaminhar o e-mail para todos os seus colegas de sala.',
          'Clicar em todos os links para verificar se é verdade.'
        ],
        correct: 1,
        explanation: 'Golpes de phishing visam roubar credenciais corporativas. Nunca compartilhe senhas e reporte o incidente.'
      }
    ]
  },

  // =========================================================================
  // 16. PLANEJAMENTO E MATEMÁTICA FINANCEIRA
  // =========================================================================
  {
    id: 'curso-planejamento-orcamento',
    trackId: 'trilha-5',
    trackName: 'TRILHA 5: Educação Financeira & Cidadania no Trabalho',
    category: 'Desenvolvimento Pessoal',
    targetAudienceType: 'TODOS',
    title: 'Planejamento Financeiro, Orçamento 50-30-20 e Reserva de Emergência',
    subtitle: 'Método 50-30-20 na prática, cálculo de juros simples vs compostos e construção da primeira reserva financeira',
    hours: 12,
    equivalentHours: 12,
    modality: 'EAD 100% Gratuito',
    targetAudience: 'Jovens que recebem bolsa-auxílio ou salário de aprendiz',
    prerequisites: 'Nenhum.',
    badgeName: 'Mestre do Orçamento',
    badgeCategory: 'Finanças',
    badgeIcon: 'PiggyBank',
    accentColor: '#F59E0B',
    level: 'Intermediário',
    learningObjectives: [
      'Dividir o salário mensal segundo a regra 50% (Necessidades), 30% (Desejos) e 20% (Futuro).',
      'Evitar o endividamento em cartões de crédito e juros rotativos abusivos.',
      'Calcular o valor ideal da Reserva de Emergência (3 a 6 meses de custos fixos).'
    ],
    modules: [
      {
        id: 'fin-mod-1',
        number: 1,
        title: 'MÓDULO 1: A Regra 50-30-20 Aplicada à Realidade do Jovem',
        summary: 'Como administrar uma bolsa de R$ 900 a R$ 1.500 sem ficar no vermelho.',
        estimatedMinutes: 30,
        content: {
          sections: [
            {
              subheading: '1.1 Divisão dos Potes Financeiros',
              body: [
                '50% para Gastos Essenciais: Passagens, materiais escolares, auxílio nas contas de casa.',
                '30% para Lazer e Estilo de Vida: Saídas com amigos, assinaturas, passeios.',
                '20% para o Futuro: Guardar em conta rendendo 100% do CDI para formar a reserva de emergência.'
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
        question: 'Segundo a regra 50-30-20, qual porcentagem da sua renda deve ser direcionada para economias e reserva do futuro?',
        options: [
          '0% (gastar tudo no mesmo dia)',
          '20% da renda líquida',
          '90% da renda líquida',
          '100% da renda líquida'
        ],
        correct: 1,
        explanation: 'Destinar 20% para a reserva garante estabilidade financeira e autonomia para o jovem.'
      }
    ]
  }
];
