import { Course, Track } from '@/types';

export const TRACKS: Track[] = [
  {
    id: 'trilha-1',
    name: '1. Entrada no Mercado & Primeiro Emprego',
    category: 'Desenvolvimento Pessoal e Legislação',
    description: 'Trilha fundamental para quem quer conquistar a primeira vaga formal: direitos da Lei 10.097, orçamento do primeiro salário e equilíbrio emocional no trabalho.',
    targetAudienceType: ['JOVEM_APRENDIZ', 'ESTUDANTE', 'PRIMEIRO_EMPREGO'],
    hoursTotal: 36,
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
    hoursTotal: 46,
    coursesCount: 4,
    courseIds: ['curso-comunicacao-corporativa', 'curso-atendimento-publico', 'curso-saude-mental-trabalho', 'curso-comunicacao-nao-violenta'],
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
    name: '5. Gestão do Tempo, Foco & Produtividade',
    category: 'Desenvolvimento Pessoal',
    description: 'Capacitar estudantes e jovens profissionais a conciliar a rotina acadêmica com o ambiente de trabalho, aplicando técnicas de planejamento semanal, priorização e foco.',
    targetAudienceType: 'TODOS',
    hoursTotal: 12,
    coursesCount: 1,
    courseIds: ['curso-financas-pessoais'],
    badgeReward: 'Especialista em Gestão do Tempo',
    icon: 'Clock',
    accentColor: '#3B82F6'
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
  // 3. COMUNICAÇÃO ESCRITA, E-MAILS E REDAÇÃO CORPORATIVA
  // =========================================================================
  {
    id: 'curso-postura-entrevistas',
    trackId: 'trilha-1',
    trackName: 'TRILHA 1: Entrada no Mercado & Primeiro Emprego',
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
    level: 'Iniciante',
    learningObjectives: [
      'Dominar a técnica da Pirâmide Invertida na escrita profissional, transmitindo informações prioritárias com clareza, objetividade e sem prolixidade.',
      'Aplicar regras gramaticais essenciais e pontuação estratégica no dia a dia corporativo (há vs. a, anexo vs. em anexo, crase e concordância).',
      'Construir e-mails profissionais de alta performance com linhas de assunto eficazes, uso correto de Para/Cc/Cco e chamadas para ação (CTA) claras com prazos.',
      'Elaborar relatórios executivos, memorandos objetivos, comunicados gerais e atas de reunião com foco em decisões e planos de ação.',
      'Adotar boas práticas de comunicação escrita em canais instantâneos (Slack, Teams, WhatsApp), gerenciar mensagens difíceis e respeitar limites de horário.'
    ],
    modules: [
      {
        id: 'com-esc-mod-1',
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
        id: 'com-esc-mod-2',
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
        id: 'com-esc-mod-3',
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
        id: 'com-esc-mod-4',
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
  // 4. MICROSOFT EXCEL & PLANILHAS ELETRÔNICAS PARA ESCRITÓRIO
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
  // 5. INTELIGÊNCIA ARTIFICIAL E PRODUTIVIDADE
  // =========================================================================
  {
    id: 'curso-ia-produtividade',
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
    level: 'Intermediário',
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
  // 6. ROTINAS ADMINISTRATIVAS & GESTÃO DOCUMENTAL
  // =========================================================================
  {
    id: 'curso-rotinas-administrativas',
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
  // 7. GESTÃO DO TEMPO, FOCO E CONCILIAÇÃO ESCOLA X TRABALHO
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
  // 8. EQUILÍBRIO EMOCIONAL, ANSIEDADE E FOCO NO TRABALHO
  // =========================================================================
  {
    id: 'curso-saude-mental-trabalho',
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
  // 9. COMUNICAÇÃO ESCRITA, E-MAILS E REDAÇÃO CORPORATIVA
  // =========================================================================
  {
    id: 'curso-comunicacao-corporativa',
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
    level: 'Iniciante',
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
  // 10. PLANEJAMENTO FINANCEIRO, ORÇAMENTO 50-30-20 E RESERVA DE EMERGÊNCIA
  // =========================================================================
  {
    id: 'curso-atendimento-publico',
    trackId: 'trilha-2',
    trackName: 'TRILHA 2: Soft Skills, Postura & Comunicação Corporativa',
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
    badgeCategory: 'Finanças Pessoais',
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
  // =========================================================================
  // 11. INTELIGÊNCIA ARTIFICIAL E AUTOMAÇÃO NO DIA A DIA DE TRABALHO
  // =========================================================================
  {
    id: 'curso-informatica-seguranca',
    trackId: 'trilha-3',
    trackName: 'TRILHA 3: Tecnologia, Informática & Produtividade com IA',
    category: 'Tecnologia da Informação',
    targetAudienceType: 'TODOS',
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
    level: 'Intermediário',
    learningObjectives: [
      'Compreender os fundamentos da IA Generativa e dominar Engenharia de Prompts (Prompt Engineering) com técnicas de Few-Shot e Chain of Thought.',
      'Acelerar a produção, síntese e revisão de documentos corporativos, e-mails, relatórios e análises de dados com assistentes de IA.',
      'Construir automações No-Code com gatilhos (triggers) e ações em plataformas como Zapier e Make para eliminar tarefas repetitivas.',
      'Aplicar boas práticas de governança, conformidade com a LGPD, proteção contra vazamento de dados confidenciais e validação de alucinações da IA.'
    ],
    modules: [
      {
        id: 'ia-auto-mod-1',
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
        id: 'ia-auto-mod-2',
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
        id: 'ia-auto-mod-3',
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
        id: 'ia-auto-mod-4',
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
  // 12. GESTÃO DO TEMPO & PRODUTIVIDADE
  // =========================================================================
  {
    id: 'curso-gestao-tempo',
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
  // 13. COMUNICAÇÃO NÃO-VIOLENTA (CNV) E EMPATIA NO TRABALHO
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
  },

  // =========================================================================
  // 14. ROTINAS ADMINISTRATIVAS & GESTÃO DOCUMENTAL
  // =========================================================================
  {
    id: 'curso-excel-iniciante',
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
        id: 'rot-ini-mod-1',
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
        id: 'rot-ini-mod-2',
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
        id: 'rot-ini-mod-3',
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
        id: 'rot-ini-mod-4',
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
  // 16. PLANEJAMENTO E MATEMÁTICA FINANCEIRA, ORÇAMENTO 50-30-20 E RESERVA DE EMERGÊNCIA
  // =========================================================================
  {
    id: 'curso-planejamento-orcamento',
    trackId: 'trilha-5',
    trackName: 'TRILHA 5: Gestão do Tempo, Foco & Produtividade',
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
    badgeCategory: 'Finanças Pessoais',
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
        id: 'fin-plan-mod-1',
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
        id: 'fin-plan-mod-2',
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
        id: 'fin-plan-mod-3',
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
        id: 'fin-plan-mod-4',
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
  }
];
