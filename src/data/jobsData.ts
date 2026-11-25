import { JobVacancy } from '@/types';

export interface RecommendedCourse {
  id: string;
  title: string;
  badgeName: string;
  badgeCategory: string;
  accentColor: string;
  link: string;
  reason: string;
}

export interface JobOpportunity {
  id: string;
  numericId: number;
  title: string;
  company: string;
  companyCnpjMasked: string;
  validatedCnpj: boolean;
  contractType: 'Jovem Aprendiz' | 'Estágio' | 'Júnior' | 'Primeiro Emprego';
  modality: 'Presencial' | 'Híbrido' | 'Remoto';
  area: 'Administrativo' | 'Atendimento' | 'Dados & BI' | 'Tecnologia' | 'Logística' | 'Projetos';
  neighborhood: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  salary: string;
  salaryNumeric: number;
  workHours: string;
  schedule: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  recommendedCourses: RecommendedCourse[];
  badgesRequired: string[];
  applicantCount: number;
  source: 'Via Indeed' | 'Via CIEE' | 'Via Gupy' | 'Via InfoJobs' | 'Via LinkedIn' | 'Parceiro Direto SkillHub';
  publishedAt: string;
  featured?: boolean;
}

export const JOB_OPPORTUNITIES: JobOpportunity[] = [
  // =========================================================================
  // 1. LOGÍSTICA & SUPRIMENTOS - BOSCH CIC
  // =========================================================================
  {
    id: 'job-bosch-aprendiz-logistica',
    numericId: 101,
    title: 'Jovem Aprendiz em Logística e Suprimentos',
    company: 'Bosch Curitiba (Unidade CIC)',
    companyCnpjMasked: '45.***.***/0001-92',
    validatedCnpj: true,
    contractType: 'Jovem Aprendiz',
    modality: 'Presencial',
    area: 'Logística',
    neighborhood: 'CIC',
    city: 'Curitiba',
    state: 'PR',
    lat: -25.5036,
    lng: -49.3338,
    salary: 'R$ 1.120,00',
    salaryNumeric: 1120,
    workHours: '4h/dia (20h semanais)',
    schedule: '08:00 às 12:00 (Segunda a Sexta)',
    description: 'Atuação no centro logístico e de suprimentos industriais da Bosch. O jovem atuará no controle e conferência de componentes, lançamento de notas e suporte na organização do almoxarifado.',
    responsibilities: [
      'Apoiar no recebimento e conferência física de peças e matérias-primas.',
      'Alimentar planilhas de movimentação de estoque e conciliação de pedidos.',
      'Organizar documentos fiscais e romaneios de entrega para expedição.',
      'Acompanhar inventários rotativos e zelar pela organização do almoxarifado 5S.'
    ],
    requirements: [
      'Estar cursando ou ter concluído o Ensino Médio.',
      'Conhecimento básico em informática e planilhas eletrônicas.',
      'Boa comunicação interpessoal e organização para rotinas de fábrica.'
    ],
    benefits: [
      'Vale-Transporte integral',
      'Refeitório no local (almoço/café)',
      'Assistência Odontológica',
      'Seguro de vida em grupo',
      'Formação teórica em parceria com o SENAI CIC'
    ],
    recommendedCourses: [
      {
        id: 'curso-hard-skills-excel-ferramentas-digitais',
        title: 'Hard Skills (Excel e Ferramentas Digitais)',
        badgeName: 'Mestre em Ferramentas Digitais',
        badgeCategory: 'Ferramentas de Escritório',
        accentColor: '#3B82F6',
        link: '/cursos/curso-hard-skills-excel-ferramentas-digitais',
        reason: 'O domínio de planilhas e fórmulas (SOMA, PROCV) acelera a conferência de lotes e estoque.'
      },
      {
        id: 'curso-rotinas-praticas-profissionalizantes',
        title: 'Rotinas Administrativas e Organização de Processos',
        badgeName: 'Assistente de Rotinas Administrativas',
        badgeCategory: 'Rotinas Administrativas',
        accentColor: '#3B82F6',
        link: '/cursos/curso-rotinas-praticas-profissionalizantes',
        reason: 'Desenvolve a disciplina em organização de documentos e fluxo interno de materiais.'
      }
    ],
    badgesRequired: ['badge-curriculo-campeao', 'badge-direitos-legislação'],
    applicantCount: 19,
    source: 'Parceiro Direto SkillHub',
    publishedAt: 'Há 2 dias',
    featured: true
  },

  // =========================================================================
  // 2. BUSINESS INTELLIGENCE & POWER BI - POSITIVO TECNOLOGIA
  // =========================================================================
  {
    id: 'job-positivo-estagio-bi',
    numericId: 102,
    title: 'Estágio em Business Intelligence e Power BI',
    company: 'Positivo Tecnologia S.A.',
    companyCnpjMasked: '81.***.***/0001-49',
    validatedCnpj: true,
    contractType: 'Estágio',
    modality: 'Híbrido',
    area: 'Dados & BI',
    neighborhood: 'CIC',
    city: 'Curitiba',
    state: 'PR',
    lat: -25.4985,
    lng: -49.3364,
    salary: 'R$ 1.650,00',
    salaryNumeric: 1650,
    workHours: '6h/dia (30h semanais)',
    schedule: '09:00 às 16:00 (1h de intervalo) - 3x presencial, 2x home office',
    description: 'Oportunidade para estudantes universitários nas áreas de Tecnologia, Administração ou Engenharia que desejam dominar inteligência de dados, modelagem DAX e relatórios executivos no Power BI.',
    responsibilities: [
      'Construir e atualizar dashboards gerenciais e painéis executivos em Power BI.',
      'Realizar tratamento e higienização de bases de dados utilizando Power Query.',
      'Monitorar KPIs de vendas, estoque e pós-vendas com métricas em tempo real.',
      'Apresentar relatórios de tendências para gestores das áreas de negócio.'
    ],
    requirements: [
      'Estar cursando Administração, Ciência da Computação, Sistemas de Informação ou correlatos.',
      'Conhecimento intermediário em Excel e familiaridade com Power BI.',
      'Raciocínio lógico estruturado e boa capacidade de síntese visual de dados.'
    ],
    benefits: [
      'Bolsa-auxílio compatível (R$ 1.650,00)',
      'Auxílio Home Office',
      'Vale-Refeição de R$ 32,00/dia',
      'Plano de Saúde e Odontológico',
      'Desconto em produtos Positivo e marcas parceiras'
    ],
    recommendedCourses: [
      {
        id: 'curso-analise-dados-power-bi',
        title: 'Análise de Dados e Business Intelligence com Power BI',
        badgeName: 'Especialista em Power BI & Data Analytics',
        badgeCategory: 'Análise de Dados & BI',
        accentColor: '#F59E0B',
        link: '/cursos/curso-analise-dados-power-bi',
        reason: 'Pré-requisito para modelar tabelas fato/dimensão e construir dashboards interativos na empresa.'
      },
      {
        id: 'curso-inteligencia-negocios-indicadores',
        title: 'Inteligência de Negócios e Tomada de Decisão Baseada em Indicadores',
        badgeName: 'Estrategista em Inteligência de Negócios & KPIs',
        badgeCategory: 'Gestão Estratégica & BI',
        accentColor: '#3B82F6',
        link: '/cursos/curso-inteligencia-negocios-indicadores',
        reason: 'Capacita na leitura de métricas organizacionais e elaboração de planos de ação.'
      }
    ],
    badgesRequired: ['badge-excel-basico', 'badge-power-bi'],
    applicantCount: 28,
    source: 'Via LinkedIn',
    publishedAt: 'Há 1 dia',
    featured: true
  },

  // =========================================================================
  // 3. ATENDIMENTO AO CLIENTE & CX - HOSPITAL PEQUENO PRÍNCIPE
  // =========================================================================
  {
    id: 'job-pequeno-principe-aprendiz',
    numericId: 103,
    title: 'Jovem Aprendiz em Atendimento e Recepção Hospitalar',
    company: 'Complexo Hospitalar Pequeno Príncipe',
    companyCnpjMasked: '76.***.***/0001-28',
    validatedCnpj: true,
    contractType: 'Jovem Aprendiz',
    modality: 'Presencial',
    area: 'Atendimento',
    neighborhood: 'Batel',
    city: 'Curitiba',
    state: 'PR',
    lat: -25.4431,
    lng: -49.2842,
    salary: 'R$ 980,00',
    salaryNumeric: 980,
    workHours: '4h/dia (20h semanais)',
    schedule: '13:00 às 17:00 (Segunda a Sexta)',
    description: 'Recepção humanizada de famílias e pacientes, direcionamento de guias ambulatoriais, confirmação de consultas e suporte no atendimento telefônico e balcão.',
    responsibilities: [
      'Acolher pacientes e acompanhantes com escuta ativa e empatia.',
      'Emitir senhas de atendimento e conferir documentos de identificação.',
      'Tirar dúvidas sobre locais de exames e horários de visitas.',
      'Organizar materiais informativos e apoiar a equipe de enfermagem e recepção.'
    ],
    requirements: [
      'Idade entre 16 e 22 anos, matriculado ou formado no Ensino Médio.',
      'Alta empatia, paciência, boa dicção e compromisso ético com sigilo.',
      'Residência em Curitiba ou fácil acesso ao bairro Batel / Água Verde.'
    ],
    benefits: [
      'Vale-Transporte',
      'Refeição no refeitório institucional',
      'Assistência Médica ambulatorial',
      'Curso de Capacitação Teórica de Aprendizagem'
    ],
    recommendedCourses: [
      {
        id: 'curso-atendimento-relacionamento-cliente',
        title: 'Atendimento ao Cliente, Experiência e Relacionamento Profissional',
        badgeName: 'Especialista em Atendimento & CX',
        badgeCategory: 'Atendimento & Relacionamento',
        accentColor: '#EC4899',
        link: '/cursos/curso-atendimento-relacionamento-cliente',
        reason: 'Ensina desescalada de conflitos, escuta ativa e acolhimento em momentos sensíveis.'
      },
      {
        id: 'curso-etica-etiqueta-corporativa',
        title: 'Ética e Etiqueta Corporativa (Presencial e Digital)',
        badgeName: 'Profissional de Alta Postura & Ética',
        badgeCategory: 'Atitude Profissional',
        accentColor: '#8B5CF6',
        link: '/cursos/curso-etica-etiqueta-corporativa',
        reason: 'Garante postura profissional exemplar e respeito irrestrito à confidencialidade hospitalar.'
      }
    ],
    badgesRequired: ['badge-comunicacao-assertiva', 'badge-etica-trabalho'],
    applicantCount: 14,
    source: 'Parceiro Direto SkillHub',
    publishedAt: 'Há 3 dias',
    featured: true
  },

  // =========================================================================
  // 4. ANÁLISE DE DADOS JÚNIOR - CONTABILIZEI
  // =========================================================================
  {
    id: 'job-contabilizei-junior-dados',
    numericId: 104,
    title: 'Analista de Dados Júnior (Financeiro & Operações)',
    company: 'Contabilizei Tecnologia',
    companyCnpjMasked: '19.***.***/0001-04',
    validatedCnpj: true,
    contractType: 'Júnior',
    modality: 'Híbrido',
    area: 'Dados & BI',
    neighborhood: 'Rebouças',
    city: 'Curitiba',
    state: 'PR',
    lat: -25.4418,
    lng: -49.2638,
    salary: 'R$ 2.800,00',
    salaryNumeric: 2800,
    workHours: '8h/dia (40h semanais)',
    schedule: '09:00 às 18:00 (Flexível) - 2x presencial no Hub Rebouças',
    description: 'Apoio direto à diretoria financeira na automatização de conciliações bancárias, identificação de inconsistências em declarações contábeis e modelagem de projeções orçamentárias em Power BI e planilhas avançadas.',
    responsibilities: [
      'Construir pipelines de cruzamento de dados fiscais e contábeis.',
      'Desenvolver relatórios de churn, receita recorrente (MRR) e inadimplência.',
      'Automatizar rotinas manuais com scripts e fórmulas de busca complexas.',
      'Garantir conformidade com a LGPD em todas as bases manipuladas.'
    ],
    requirements: [
      'Graduação completa ou em andamento em Ciências Contábeis, Economia, TI ou afins.',
      'Domínio de Excel Avançado (PROCV, PROCX, Tabelas Dinâmicas) e Power BI.',
      'Conhecimento prático em normas de privacidade de dados (LGPD).'
    ],
    benefits: [
      'Salário CLT R$ 2.800,00',
      'Vale-Refeição/Alimentação de R$ 900,00/mês no cartão Caju',
      'Plano de Saúde SulAmérica sem coparticipação',
      'Gympass / TotalPass',
      'Auxílio ergonomia e internet'
    ],
    recommendedCourses: [
      {
        id: 'curso-analise-dados-power-bi',
        title: 'Análise de Dados e Business Intelligence com Power BI',
        badgeName: 'Especialista em Power BI & Data Analytics',
        badgeCategory: 'Análise de Dados & BI',
        accentColor: '#F59E0B',
        link: '/cursos/curso-analise-dados-power-bi',
        reason: 'Fundamental para estruturar visualizações executivas de faturamento e clientes.'
      },
      {
        id: 'curso-excel-avancado-analise-dados',
        title: 'Excel Avançado e Análise de Dados',
        badgeName: 'Excel Avançado & Dashboards',
        badgeCategory: 'Ferramentas de Escritório',
        accentColor: '#10B981',
        link: '/cursos/curso-excel-avancado-analise-dados',
        reason: 'Essencial para auditar milhares de linhas fiscais com agilidade e zero margem de erro.'
      }
    ],
    badgesRequired: ['badge-power-bi', 'badge-excel-avancado'],
    applicantCount: 35,
    source: 'Via Gupy',
    publishedAt: 'Hoje',
    featured: true
  },

  // =========================================================================
  // 5. GESTÃO DE PROJETOS - VOLVO DO BRASIL
  // =========================================================================
  {
    id: 'job-volvo-estagio-projetos',
    numericId: 105,
    title: 'Estágio em Gestão Estratégica de Projetos e PMO',
    company: 'Volvo Group Latin America (CIC)',
    companyCnpjMasked: '76.***.***/0001-38',
    validatedCnpj: true,
    contractType: 'Estágio',
    modality: 'Híbrido',
    area: 'Projetos',
    neighborhood: 'CIC',
    city: 'Curitiba',
    state: 'PR',
    lat: -25.5120,
    lng: -49.3390,
    salary: 'R$ 1.950,00',
    salaryNumeric: 1950,
    workHours: '6h/dia (30h semanais)',
    schedule: '08:30 às 15:30 (1h almoço)',
    description: 'Atuação integrada ao escritório global de projetos da Volvo em Curitiba. O estagiário acompanhará cronogramas de lançamentos de caminhões e ônibus elétricos, atas de governança e monitoramento de riscos com metodologias ágeis e tradicionais.',
    responsibilities: [
      'Apoiar no acompanhamento do cronograma físico e financeiro de projetos industriais.',
      'Criar quadros Kanban e rituais de Daily e Sprint Review com equipes multidisciplinares.',
      'Identificar gargalos de prazos e elaborar relatórios de status report executivo.',
      'Manter repositório centralizado de lições aprendidas em ferramentas digitais.'
    ],
    requirements: [
      'Estudantes de Engenharia de Produção, Administração ou Gestão de Projetos.',
      'Inglês intermediário/avançado para leitura técnica.',
      'Noções de Scrum, Kanban e gestão preditiva de cronogramas.'
    ],
    benefits: [
      'Bolsa-auxílio de R$ 1.950,00',
      'Transporte fretado e Vale-Transporte',
      'Restaurante interno padrão internacional',
      'Acesso à academia corporativa no complexo da Volvo',
      'Plano de desenvolvimento e mentoria técnica'
    ],
    recommendedCourses: [
      {
        id: 'curso-gestao-estrategica-projetos',
        title: 'Gestão Estratégica de Projetos e Metodologias de Gerenciamento',
        badgeName: 'Especialista em Gestão Estratégica de Projetos & Metodologias Ágeis',
        badgeCategory: 'Gestão de Projetos',
        accentColor: '#3B82F6',
        link: '/cursos/curso-gestao-estrategica-projetos',
        reason: 'Ensina o ciclo completo de projetos, matriz RACI, gestão de riscos e cerimônias ágeis.'
      },
      {
        id: 'curso-transformacao-digital-inovacao',
        title: 'Transformação Digital, Inovação e Estratégias Empresariais',
        badgeName: 'Líder em Transformação Digital & Inovação',
        badgeCategory: 'Inovação & Estratégia',
        accentColor: '#3B82F6',
        link: '/cursos/curso-transformacao-digital-inovacao',
        reason: 'Alinha a visão de modernização tecnológica e eficiência em processos corporativos.'
      }
    ],
    badgesRequired: ['badge-gestao-projetos', 'badge-inovacao'],
    applicantCount: 22,
    source: 'Via Indeed',
    publishedAt: 'Há 2 dias',
    featured: true
  },

  // =========================================================================
  // 6. CUSTOMER EXPERIENCE (CX) - MADEIRAMADEIRA
  // =========================================================================
  {
    id: 'job-madeira-junior-cx',
    numericId: 106,
    title: 'Assistente de Customer Experience (CX) e Ouvidoria Júnior',
    company: 'MadeiraMadeira E-commerce',
    companyCnpjMasked: '10.***.***/0001-52',
    validatedCnpj: true,
    contractType: 'Júnior',
    modality: 'Remoto',
    area: 'Atendimento',
    neighborhood: 'Centro',
    city: 'Curitiba',
    state: 'PR',
    lat: -25.4310,
    lng: -49.2715,
    salary: 'R$ 2.100,00',
    salaryNumeric: 2100,
    workHours: '6h20/dia (36h semanais)',
    schedule: 'Escala 5x2 (Horário comercial) - 100% Home Office com kit de trabalho',
    description: 'Resolução em segundo nível de solicitações de clientes em canais de alto impacto (Reclame Aqui, Consumidor.gov e Procon). Foco em retenção, negociação empática e retroalimentação do time de logística.',
    responsibilities: [
      'Gerenciar tickets críticos com abordagem resolutiva e humanizada.',
      'Negociar trocas, devoluções e prazos de entrega diretamente com transportadoras.',
      'Acompanhar os indicadores de CSAT e NPS das tratativas individuais.',
      'Identificar causas-raiz de falhas de entrega para propor melhorias operacionais.'
    ],
    requirements: [
      'Ensino Médio completo (Superior cursando será considerado diferencial).',
      'Excelente redação corporativa, empatia verbal e autocontrole emocional.',
      'Residência em Curitiba ou qualquer cidade do Brasil (vaga remota).'
    ],
    benefits: [
      'Salário R$ 2.100,00 CLT',
      'Auxílio Home Office de R$ 150,00/mês',
      'Notebook e fone de ouvido ergonômico fornecidos pela empresa',
      'Vale-Refeição R$ 680,00/mês',
      'Plano de Saúde e Odontológico Unimed'
    ],
    recommendedCourses: [
      {
        id: 'curso-atendimento-relacionamento-cliente',
        title: 'Atendimento ao Cliente, Experiência e Relacionamento Profissional',
        badgeName: 'Especialista em Atendimento & CX',
        badgeCategory: 'Atendimento & Relacionamento',
        accentColor: '#EC4899',
        link: '/cursos/curso-atendimento-relacionamento-cliente',
        reason: 'Crucial para dominar técnicas de desescalada de reclamações e cálculo de NPS/CSAT.'
      },
      {
        id: 'curso-resolucao-criativa-problemas-adaptacao',
        title: 'Resolução Criativa de Problemas e Adaptação',
        badgeName: 'Solucionador Criativo de Problemas',
        badgeCategory: 'Trabalho',
        accentColor: '#F59E0B',
        link: '/cursos/curso-resolucao-criativa-problemas-adaptacao',
        reason: 'Ensina os 5 Porquês para encontrar a causa-raiz de insatisfações e resolver imprevistos.'
      }
    ],
    badgesRequired: ['badge-atendimento-cx', 'badge-resolucao-problemas'],
    applicantCount: 42,
    source: 'Via Gupy',
    publishedAt: 'Ontem',
    featured: true
  },

  // =========================================================================
  // 7. OPERAÇÕES & INTELIGÊNCIA - OLIST
  // =========================================================================
  {
    id: 'job-olist-estagio-operacoes',
    numericId: 107,
    title: 'Estágio em Operações e Sucesso do Lojista',
    company: 'Olist E-commerce Ecosystem',
    companyCnpjMasked: '18.***.***/0001-44',
    validatedCnpj: true,
    contractType: 'Estágio',
    modality: 'Híbrido',
    area: 'Administrativo',
    neighborhood: 'Rebouças',
    city: 'Curitiba',
    state: 'PR',
    lat: -25.4455,
    lng: -49.2612,
    salary: 'R$ 1.700,00',
    salaryNumeric: 1700,
    workHours: '6h/dia (30h semanais)',
    schedule: '10:00 às 17:00 (1h intervalo) - 2x presencial',
    description: 'Acompanhamento do onboarding de pequenos e médios varejistas nos maiores marketplaces do país. O estagiário audita cadastros de produtos, valida integrações de estoque e apoia na melhoria dos prazos de envio.',
    responsibilities: [
      'Auditar catálogos de produtos e corrigir erros de tributação ou dimensões.',
      'Orientar novos lojistas parceiros via chat e videoconferência institucional.',
      'Controlar indicadores de First Contact Resolution (FCR) nos chamados de integração.',
      'Compilar sugestões dos usuários para o time de produto e tecnologia.'
    ],
    requirements: [
      'Estudantes de Administração, Marketing, Gestão Comercial ou Engenharias.',
      'Afinidade com plataformas de e-commerce e ambiente de startup tech.',
      'Facilidade de comunicação e pensamento orientado a soluções rápidas.'
    ],
    benefits: [
      'Bolsa-auxílio de R$ 1.700,00',
      'Vale-Refeição/Alimentação no cartão Flash',
      'Plano de Saúde Bradesco',
      'Horário flexível e ambiente descontraído',
      'Desconto em cursos e plataformas de idiomas'
    ],
    recommendedCourses: [
      {
        id: 'curso-comunicacao-escrita-corporativa',
        title: 'Comunicação Escrita e Redação Corporativa',
        badgeName: 'Mestre em Comunicação Escrita & E-mails Corporativos',
        badgeCategory: 'Comunicação Profissional',
        accentColor: '#3B82F6',
        link: '/cursos/curso-comunicacao-escrita-corporativa',
        reason: 'Garante redação de e-mails claros, empáticos e sem ambiguidades aos parceiros.'
      },
      {
        id: 'curso-financas-pessoais',
        title: 'Gestão do Tempo, Foco e Conciliação Escola x Trabalho',
        badgeName: 'Gestão do Tempo & Foco',
        badgeCategory: 'Produtividade & Carreira',
        accentColor: '#3B82F6',
        link: '/cursos/curso-financas-pessoais',
        reason: 'Ajuda a organizar a rotina de múltiplos tickets e entregas sem sobrecarga mental.'
      }
    ],
    badgesRequired: ['badge-comunicacao-assertiva', 'badge-gestao-tempo'],
    applicantCount: 16,
    source: 'Via LinkedIn',
    publishedAt: 'Há 3 dias'
  },

  // =========================================================================
  // 8. ROTINAS INDUSTRIAIS - RENAULT DO BRASIL
  // =========================================================================
  {
    id: 'job-renault-aprendiz-admin',
    numericId: 108,
    title: 'Jovem Aprendiz em Rotinas Administrativas de Fábrica',
    company: 'Complexo Industrial Renault do Brasil',
    companyCnpjMasked: '00.***.***/0001-09',
    validatedCnpj: true,
    contractType: 'Jovem Aprendiz',
    modality: 'Presencial',
    area: 'Administrativo',
    neighborhood: 'Borda do Campo',
    city: 'São José dos Pinhais',
    state: 'PR',
    lat: -25.5348,
    lng: -49.1925,
    salary: 'R$ 1.050,00',
    salaryNumeric: 1050,
    workHours: '4h/dia (20h semanais)',
    schedule: '08:00 às 12:00 (Segunda a Sexta)',
    description: 'Atuação na área de suporte administrativo à linha de montagem e estamparia da Renault. O jovem participa da impressão de fichas de processo, arquivamento de laudos de qualidade e controle de crachás e EPIs.',
    responsibilities: [
      'Apoiar no controle de entrega e registro de Equipamentos de Proteção Individual (EPIs).',
      'Alimentar planilhas internas de controle de presença e treinamentos de segurança.',
      'Organizar pastas físicas e digitais de ordens de serviço de manutenção.',
      'Prestar suporte aos líderes de turno no preenchimento de relatórios diários.'
    ],
    requirements: [
      'Idade de 16 a 22 anos, cursando Ensino Médio ou concluído.',
      'Residência em São José dos Pinhais, Piraquara ou bairros do leste de Curitiba.',
      'Comprometimento com normas de segurança do trabalho e disciplina operacional.'
    ],
    benefits: [
      'Bolsa Jovem Aprendiz R$ 1.050,00',
      'Transporte fretado cobrindo Curitiba e RMC',
      'Alimentação no restaurante industrial',
      'Assistência Médica e Odontológica',
      'Curso de capacitação profissional SENAI'
    ],
    recommendedCourses: [
      {
        id: 'curso-rotinas-praticas-profissionalizantes',
        title: 'Rotinas Administrativas e Organização de Processos',
        badgeName: 'Assistente de Rotinas Administrativas',
        badgeCategory: 'Rotinas Administrativas',
        accentColor: '#3B82F6',
        link: '/cursos/curso-rotinas-praticas-profissionalizantes',
        reason: 'Capacita na gestão de arquivos, fluxo de documentos formais e atendimento institucional.'
      },
      {
        id: 'curso-etica-etiqueta-corporativa',
        title: 'Ética e Etiqueta Corporativa (Presencial e Digital)',
        badgeName: 'Profissional de Alta Postura & Ética',
        badgeCategory: 'Atitude Profissional',
        accentColor: '#8B5CF6',
        link: '/cursos/curso-etica-etiqueta-corporativa',
        reason: 'Orienta sobre pontualidade, vestimenta adequada em fábrica e respeito hierárquico.'
      }
    ],
    badgesRequired: ['badge-rotinas-admin', 'badge-etica-trabalho'],
    applicantCount: 25,
    source: 'Via CIEE',
    publishedAt: 'Há 4 dias'
  },

  // =========================================================================
  // 9. RECURSOS HUMANOS & ATENDIMENTO - CONDOR BOQUEIRÃO
  // =========================================================================
  {
    id: 'job-condor-aprendiz-rh',
    numericId: 109,
    title: 'Jovem Aprendiz em Recursos Humanos e Atendimento',
    company: 'Rede de Supermercados Condor (Hiper Boqueirão)',
    companyCnpjMasked: '76.***.***/0004-18',
    validatedCnpj: true,
    contractType: 'Jovem Aprendiz',
    modality: 'Presencial',
    area: 'Administrativo',
    neighborhood: 'Boqueirão',
    city: 'Curitiba',
    state: 'PR',
    lat: -25.5036,
    lng: -49.2372,
    salary: 'R$ 980,00',
    salaryNumeric: 980,
    workHours: '4h/dia (20h semanais)',
    schedule: '13:00 às 17:00 (Segunda a Sexta)',
    description: 'Suporte no setor de gestão de pessoas e administração de pessoal da loja. Apoio no recebimento de atestados médicos, conferência de escalas de folgas e atendimento a dúvidas de colaboradores.',
    responsibilities: [
      'Apoiar no controle de fichas de ponto eletrônico e entrega de holerites.',
      'Organizar dossiês de admissão e conferência de documentos de novos colaboradores.',
      'Atender dúvidas rotineiras de colaboradores com gentileza e discrição.',
      'Apoiar em ações internas comemorativas e integração de novos contratados.'
    ],
    requirements: [
      'Idade de 16 a 21 anos, Ensino Médio em andamento ou concluído.',
      'Boa postura interpessoal, pontualidade e sigilo ético de dados de funcionários.',
      'Fácil acesso ao bairro Boqueirão, Hauer ou Carmo.'
    ],
    benefits: [
      'Vale-Transporte',
      'Desconto especial de 10% em compras na rede de supermercados',
      'Refeição no local',
      'Curso de capacitação teórica'
    ],
    recommendedCourses: [
      {
        id: 'curso-lgpd-seguranca-dados',
        title: 'LGPD, Privacidade e Segurança da Informação',
        badgeName: 'Guardião da Privacidade & LGPD',
        badgeCategory: 'Legislação & Conformidade',
        accentColor: '#3B82F6',
        link: '/cursos/curso-lgpd-seguranca-dados',
        reason: 'Essencial para lidar com prontuários de funcionários e documentos pessoais de forma segura.'
      },
      {
        id: 'curso-soft-skills-comunicacao-interpessoal',
        title: 'Soft Skills e Comunicação Interpessoal',
        badgeName: 'Mestre em Comunicação Interpessoal',
        badgeCategory: 'Habilidades Humanas',
        accentColor: '#10B981',
        link: '/cursos/curso-soft-skills-comunicacao-interpessoal',
        reason: 'Desenvolve empatia e inteligência relacional para atender a equipe de colaboradores.'
      }
    ],
    badgesRequired: ['badge-soft-skills', 'badge-lgpd'],
    applicantCount: 17,
    source: 'Parceiro Direto SkillHub',
    publishedAt: 'Há 5 dias'
  },

  // =========================================================================
  // 10. PROJETOS & METODOLOGIAS ÁGEIS - AKER SOLUTIONS
  // =========================================================================
  {
    id: 'job-aker-estagio-agil',
    numericId: 110,
    title: 'Estágio em Planejamento e Metodologias Ágeis de Projetos',
    company: 'Aker Solutions Subsea Systems (CIC)',
    companyCnpjMasked: '03.***.***/0001-85',
    validatedCnpj: true,
    contractType: 'Estágio',
    modality: 'Presencial',
    area: 'Projetos',
    neighborhood: 'CIC',
    city: 'Curitiba',
    state: 'PR',
    lat: -25.5085,
    lng: -49.3312,
    salary: 'R$ 1.850,00',
    salaryNumeric: 1850,
    workHours: '6h/dia (30h semanais)',
    schedule: '08:00 às 15:00 (1h almoço)',
    description: 'Acompanhamento do desenvolvimento de sistemas de alta complexidade para o setor de energia. O estagiário atuará na facilitação de squads ágeis, monitoramento de entregas de engenharia e métricas de produtividade.',
    responsibilities: [
      'Atualizar quadros de gestão à vista e ferramentas digitais de gestão ágil (Jira / Azure DevOps).',
      'Auxiliar Scrum Masters na condução de reuniões de planejamento e retrospectiva.',
      'Calcular métricas de velocidade de time e taxa de conclusão de demandas.',
      'Elaborar minutas de alinhamento com clientes e parceiros internacionais.'
    ],
    requirements: [
      'Estudantes a partir do 3º período de Engenharia, Administração ou Gestão de TI.',
      'Conhecimento prático ou teórico em Scrum, Kanban e gestão de projetos.',
      'Inglês intermediário para troca de e-mails com times globais.'
    ],
    benefits: [
      'Bolsa-auxílio R$ 1.850,00',
      'Transporte fretado de diversos pontos de Curitiba',
      'Alimentação balanceada no restaurante da empresa',
      'Seguro de vida e assistência odontológica',
      'Trilha de aceleração para efetivação após 12 meses'
    ],
    recommendedCourses: [
      {
        id: 'curso-gestao-estrategica-projetos',
        title: 'Gestão Estratégica de Projetos e Metodologias de Gerenciamento',
        badgeName: 'Especialista em Gestão Estratégica de Projetos & Metodologias Ágeis',
        badgeCategory: 'Gestão de Projetos',
        accentColor: '#3B82F6',
        link: '/cursos/curso-gestao-estrategica-projetos',
        reason: 'Ensina como estruturar sprints, gerenciar riscos e conduzir cerimônias ágeis com eficiência.'
      },
      {
        id: 'curso-inteligencia-negocios-indicadores',
        title: 'Inteligência de Negócios e Tomada de Decisão Baseada em Indicadores',
        badgeName: 'Estrategista em Inteligência de Negócios & KPIs',
        badgeCategory: 'Gestão Estratégica & BI',
        accentColor: '#3B82F6',
        link: '/cursos/curso-inteligencia-negocios-indicadores',
        reason: 'Fundamental para analisar indicadores de produtividade e taxas de entrega do time.'
      }
    ],
    badgesRequired: ['badge-gestao-projetos', 'badge-metodologias-ageis'],
    applicantCount: 20,
    source: 'Via LinkedIn',
    publishedAt: 'Há 2 dias'
  },

  // =========================================================================
  // 11. SUPORTE TÉCNICO & NUVEM - EXEED SOLUÇÕES
  // =========================================================================
  {
    id: 'job-exeed-estagio-ti',
    numericId: 111,
    title: 'Estágio em Suporte Técnico, Nuvem e Ferramentas Digitais',
    company: 'Exeed Cloud Solutions (Cabral)',
    companyCnpjMasked: '22.***.***/0001-99',
    validatedCnpj: true,
    contractType: 'Estágio',
    modality: 'Híbrido',
    area: 'Tecnologia',
    neighborhood: 'Cabral',
    city: 'Curitiba',
    state: 'PR',
    lat: -25.4140,
    lng: -49.2558,
    salary: 'R$ 1.500,00',
    salaryNumeric: 1500,
    workHours: '6h/dia (30h semanais)',
    schedule: '09:00 às 16:00 (1h almoço) - 3x presencial, 2x home office',
    description: 'Atendimento e suporte técnico de primeiro nível para empresas que utilizam Microsoft 365, Google Workspace e infraestrutura em nuvem. O estagiário aprenderá resolução de incidentes, gestão de acessos e segurança cibernética básica.',
    responsibilities: [
      'Atender chamados de suporte técnico em sistemas operacionais e pacotes de escritório.',
      'Configurar contas de e-mail corporativo, autenticação de dois fatores e permissões na nuvem.',
      'Auxiliar na formatação e preparação de notebooks para novos colaboradores de clientes.',
      'Documentar procedimentos operacionais padrão e guias de autoajuda para usuários.'
    ],
    requirements: [
      'Estudantes de Ciência da Computação, Análise de Sistemas, Redes ou Informática.',
      'Boa compreensão de sistemas operacionais (Windows/Linux) e serviços em nuvem.',
      'Paciência didática para orientar colaboradores com menor familiaridade técnica.'
    ],
    benefits: [
      'Bolsa-auxílio R$ 1.500,00',
      'Vale-Refeição de R$ 30,00/dia',
      'Vale-Transporte',
      'Apoio financeiro para certificações técnicas Microsoft/Google',
      'Ambiente flexível com sala de descompressão'
    ],
    recommendedCourses: [
      {
        id: 'curso-hard-skills-excel-ferramentas-digitais',
        title: 'Hard Skills (Excel e Ferramentas Digitais)',
        badgeName: 'Mestre em Ferramentas Digitais',
        badgeCategory: 'Ferramentas de Escritório',
        accentColor: '#3B82F6',
        link: '/cursos/curso-hard-skills-excel-ferramentas-digitais',
        reason: 'Ensina o ecossistema nuvem, atalhos de produtividade e segurança no compartilhamento.'
      },
      {
        id: 'curso-lgpd-seguranca-dados',
        title: 'LGPD, Privacidade e Segurança da Informação',
        badgeName: 'Guardião da Privacidade & LGPD',
        badgeCategory: 'Legislação & Conformidade',
        accentColor: '#3B82F6',
        link: '/cursos/curso-lgpd-seguranca-dados',
        reason: 'Capacita no controle rigoroso de acessos e prevenção contra vazamentos de credenciais.'
      }
    ],
    badgesRequired: ['badge-informatica-basica', 'badge-seguranca-dados'],
    applicantCount: 24,
    source: 'Via InfoJobs',
    publishedAt: 'Ontem'
  },

  // =========================================================================
  // 12. LOGÍSTICA & ESTOQUE - KLABIN S.A.
  // =========================================================================
  {
    id: 'job-klabin-aprendiz-logistica',
    numericId: 112,
    title: 'Jovem Aprendiz em Logística e Expedição Florestal/Papel',
    company: 'Klabin S.A. (Unidade Araucária)',
    companyCnpjMasked: '89.***.***/0001-20',
    validatedCnpj: true,
    contractType: 'Jovem Aprendiz',
    modality: 'Presencial',
    area: 'Logística',
    neighborhood: 'Thomaz Coelho',
    city: 'Araucária',
    state: 'PR',
    lat: -25.5925,
    lng: -49.4089,
    salary: 'R$ 1.150,00',
    salaryNumeric: 1150,
    workHours: '4h/dia (20h semanais)',
    schedule: '08:00 às 12:00 (Segunda a Sexta)',
    description: 'Atuação na expedição de embalagens de papelão e celulose da Klabin em Araucária. Apoio na pesagem de caminhões, conferência de etiquetas de código de barras e preenchimento de romaneios de transporte.',
    responsibilities: [
      'Apoiar no controle de entrada e saída de carretas na balança rodoviária.',
      'Conferir notas fiscais e manifestos eletrônicos de carga com os motoristas.',
      'Organizar relatórios de pallets expedidos e inventário de bobinas.',
      'Participar dos treinamentos de sustentabilidade e segurança operacional.'
    ],
    requirements: [
      'Idade de 16 a 22 anos, cursando ou concluído Ensino Médio.',
      'Residência em Araucária, Fazenda Rio Grande ou CIC (Sul).',
      'Atenção concentrada e pontualidade exemplar.'
    ],
    benefits: [
      'Bolsa-aprendiz de R$ 1.150,00',
      'Transporte fretado da empresa',
      'Refeição completa no refeitório',
      'Assistência Médica e Odontológica',
      'Cesta de Natal e programa de apoio ao estudante'
    ],
    recommendedCourses: [
      {
        id: 'curso-hard-skills-excel-ferramentas-digitais',
        title: 'Hard Skills (Excel e Ferramentas Digitais)',
        badgeName: 'Mestre em Ferramentas Digitais',
        badgeCategory: 'Ferramentas de Escritório',
        accentColor: '#3B82F6',
        link: '/cursos/curso-hard-skills-excel-ferramentas-digitais',
        reason: 'O uso de planilhas e fórmulas facilita a contagem de cargas e conferência de pesos.'
      },
      {
        id: 'curso-rotinas-praticas-profissionalizantes',
        title: 'Rotinas Administrativas e Organização de Processos',
        badgeName: 'Assistente de Rotinas Administrativas',
        badgeCategory: 'Rotinas Administrativas',
        accentColor: '#3B82F6',
        link: '/cursos/curso-rotinas-praticas-profissionalizantes',
        reason: 'Ensina conferência de notas fiscais, arquivamento e fluxo de expedição.'
      }
    ],
    badgesRequired: ['badge-rotinas-admin', 'badge-logistica'],
    applicantCount: 15,
    source: 'Via CIEE',
    publishedAt: 'Há 4 dias'
  },

  // =========================================================================
  // 13. ADMINISTRAÇÃO & SUPORTE - COPEL BATEL
  // =========================================================================
  {
    id: 'job-copel-aprendiz-admin',
    numericId: 113,
    title: 'Jovem Aprendiz em Suporte Administrativo e Atendimento Digital',
    company: 'Copel Distribuição (Sede Batel)',
    companyCnpjMasked: '04.***.***/0001-51',
    validatedCnpj: true,
    contractType: 'Jovem Aprendiz',
    modality: 'Presencial',
    area: 'Administrativo',
    neighborhood: 'Batel',
    city: 'Curitiba',
    state: 'PR',
    lat: -25.4395,
    lng: -49.2810,
    salary: 'R$ 1.080,00',
    salaryNumeric: 1080,
    workHours: '4h/dia (20h semanais)',
    schedule: '13:30 às 17:30 (Segunda a Sexta)',
    description: 'Apoio ao setor de relacionamento com clientes e ouvidoria da concessionária de energia do Paraná. Triagem de protocolos, resposta a e-mails institucionais e organização de relatórios de satisfação.',
    responsibilities: [
      'Classificar solicitações digitais de consumidores por tipo de demanda.',
      'Apoiar na digitalização e arquivamento eletrônico de contratos de fornecimento.',
      'Elaborar minutas de ofícios e respostas padrão sob orientação dos analistas.',
      'Contribuir com ideias para melhoria da experiência do cidadão nos canais digitais.'
    ],
    requirements: [
      'Estar cursando Ensino Médio regular na rede pública ou bolsista.',
      'Excelente redação em português formal e atenção aos detalhes.',
      'Facilidade de relacionamento interpessoal e espírito colaborativo.'
    ],
    benefits: [
      'Bolsa-auxílio R$ 1.080,00',
      'Vale-Transporte integral',
      'Vale-Lanche',
      'Seguro de Acidentes Pessoais',
      'Certificado de Formação Profissional'
    ],
    recommendedCourses: [
      {
        id: 'curso-comunicacao-escrita-corporativa',
        title: 'Comunicação Escrita e Redação Corporativa',
        badgeName: 'Mestre em Comunicação Escrita & E-mails Corporativos',
        badgeCategory: 'Comunicação Profissional',
        accentColor: '#3B82F6',
        link: '/cursos/curso-comunicacao-escrita-corporativa',
        reason: 'Garante conformidade com o padrão formal de correspondência e atendimento institucional.'
      },
      {
        id: 'curso-atendimento-relacionamento-cliente',
        title: 'Atendimento ao Cliente, Experiência e Relacionamento Profissional',
        badgeName: 'Especialista em Atendimento & CX',
        badgeCategory: 'Atendimento & Relacionamento',
        accentColor: '#EC4899',
        link: '/cursos/curso-atendimento-relacionamento-cliente',
        reason: 'Orienta sobre direitos do consumidor, agilidade de resposta e empatia relacional.'
      }
    ],
    badgesRequired: ['badge-comunicacao-assertiva', 'badge-etica-trabalho'],
    applicantCount: 31,
    source: 'Parceiro Direto SkillHub',
    publishedAt: 'Ontem'
  },

  // =========================================================================
  // 14. OPERAÇÕES LOGÍSTICAS JÚNIOR - AMBEV BOQUEIRÃO
  // =========================================================================
  {
    id: 'job-ambev-junior-logistica',
    numericId: 114,
    title: 'Assistente de Operações Logísticas e Distribuição Júnior',
    company: 'Ambev Centro de Distribuição Curitiba',
    companyCnpjMasked: '07.***.***/0001-60',
    validatedCnpj: true,
    contractType: 'Júnior',
    modality: 'Presencial',
    area: 'Logística',
    neighborhood: 'Boqueirão',
    city: 'Curitiba',
    state: 'PR',
    lat: -25.5080,
    lng: -49.2420,
    salary: 'R$ 2.450,00',
    salaryNumeric: 2450,
    workHours: '8h/dia (44h semanais)',
    schedule: 'Segunda a Sexta (Horário comercial) + Sábados alternados pela manhã',
    description: 'Planejamento e roteirização da frota de caminhões que abastece o varejo da Grande Curitiba. O assistente monitora indicadores de devolução de produtos (DPO), tempo de carga/descarga e produtividade dos motoristas.',
    responsibilities: [
      'Acompanhar a roteirização diária da frota através de software de telemetria.',
      'Controlar indicadores de quebra de estoque, avarias e devoluções nos pontos de venda.',
      'Gerar relatórios de desempenho e apresentar resultados semanais na reunião de turno.',
      'Atuar em conjunto com a equipe comercial para priorizar entregas urgentes.'
    ],
    requirements: [
      'Ensino Médio completo ou Superior cursando em Logística ou Administração.',
      'Excel intermediário (capacidade de manipular fórmulas, filtros e tabelas).',
      'Boa energia, perfil resolutivo e facilidade para lidar com ambiente dinâmico.'
    ],
    benefits: [
      'Salário CLT R$ 2.450,00 + Bônus semestral por metas batidas',
      'Vale-Refeição de R$ 35,00/dia',
      'Plano de Saúde e Odontológico Bradesco',
      'Gympass',
      'Previdência privada e desconto em produtos da marca'
    ],
    recommendedCourses: [
      {
        id: 'curso-hard-skills-excel-ferramentas-digitais',
        title: 'Hard Skills (Excel e Ferramentas Digitais)',
        badgeName: 'Mestre em Ferramentas Digitais',
        badgeCategory: 'Ferramentas de Escritório',
        accentColor: '#3B82F6',
        link: '/cursos/curso-hard-skills-excel-ferramentas-digitais',
        reason: 'Otimiza o cálculo de rotas e cruzamento de romaneios com PROCV e formatação condicional.'
      },
      {
        id: 'curso-inteligencia-negocios-indicadores',
        title: 'Inteligência de Negócios e Tomada de Decisão Baseada em Indicadores',
        badgeName: 'Estrategista em Inteligência de Negócios & KPIs',
        badgeCategory: 'Gestão Estratégica & BI',
        accentColor: '#3B82F6',
        link: '/cursos/curso-inteligencia-negocios-indicadores',
        reason: 'Ajuda a interpretar KPIs logísticos como OTIF (On-Time In-Full) e tempo de ciclo.'
      }
    ],
    badgesRequired: ['badge-excel-basico', 'badge-logistica'],
    applicantCount: 29,
    source: 'Via Indeed',
    publishedAt: 'Há 3 dias'
  },

  // =========================================================================
  // 15. AUTOMAÇÃO DE PROCESSOS - FURUKAWA ELECTRIC
  // =========================================================================
  {
    id: 'job-furukawa-estagio-automacao',
    numericId: 115,
    title: 'Estágio em Automação de Processos e Planilhas Avançadas',
    company: 'Furukawa Electric LatAm (CIC)',
    companyCnpjMasked: '51.***.***/0001-40',
    validatedCnpj: true,
    contractType: 'Estágio',
    modality: 'Híbrido',
    area: 'Tecnologia',
    neighborhood: 'CIC',
    city: 'Curitiba',
    state: 'PR',
    lat: -25.5010,
    lng: -49.3280,
    salary: 'R$ 1.750,00',
    salaryNumeric: 1750,
    workHours: '6h/dia (30h semanais)',
    schedule: '08:00 às 15:00 (1h intervalo) - 3x presencial, 2x home office',
    description: 'Atuação na equipe de Excelência Operacional da fabricante global de fibra óptica. O estagiário desenvolverá automações em planilhas, dashboards de produtividade e apoio na integração de dados entre sistemas legados e a nuvem.',
    responsibilities: [
      'Desenvolver e manter planilhas avançadas com fórmulas aninhadas e macros.',
      'Mapear fluxos operacionais repetitivos para aplicar automações com formulários.',
      'Estruturar relatórios analíticos de eficiência de equipamentos (OEE).',
      'Treinar colaboradores internos no uso de novas ferramentas de produtividade.'
    ],
    requirements: [
      'Estudantes de Engenharia de Software, Ciência da Computação, Engenharia de Produção ou TI.',
      'Domínio avançado de Excel e curiosidade por inteligência artificial e automação.',
      'Pensamento crítico voltado para eliminação de desperdícios de tempo.'
    ],
    benefits: [
      'Bolsa-auxílio de R$ 1.750,00',
      'Transporte fretado cobrindo diversos bairros de Curitiba',
      'Refeitório no local',
      'Plano de Saúde Unimed',
      'Subsídio para treinamentos e certificações'
    ],
    recommendedCourses: [
      {
        id: 'curso-excel-avancado-analise-dados',
        title: 'Excel Avançado e Análise de Dados',
        badgeName: 'Excel Avançado & Dashboards',
        badgeCategory: 'Ferramentas de Escritório',
        accentColor: '#10B981',
        link: '/cursos/curso-excel-avancado-analise-dados',
        reason: 'Capacita no uso de tabelas dinâmicas, PROCX, matrizes dinâmicas e dashboards interativos.'
      },
      {
        id: 'curso-transformacao-digital-inovacao',
        title: 'Transformação Digital, Inovação e Estratégias Empresariais',
        badgeName: 'Líder em Transformação Digital & Inovação',
        badgeCategory: 'Inovação & Estratégia',
        accentColor: '#3B82F6',
        link: '/cursos/curso-transformacao-digital-inovacao',
        reason: 'Conecta a técnica da automação com a estratégia de inovação e agilidade corporativa.'
      }
    ],
    badgesRequired: ['badge-excel-avancado', 'badge-inovacao'],
    applicantCount: 18,
    source: 'Via Gupy',
    publishedAt: 'Ontem'
  },

  // =========================================================================
  // 16. TRANSFORMAÇÃO DIGITAL - ELECTROLUX
  // =========================================================================
  {
    id: 'job-electrolux-estagio-transformacao',
    numericId: 116,
    title: 'Estágio em Transformação Digital e Inovação Corporativa',
    company: 'Electrolux do Brasil (Sede Guabirotuba)',
    companyCnpjMasked: '76.***.***/0001-07',
    validatedCnpj: true,
    contractType: 'Estágio',
    modality: 'Híbrido',
    area: 'Projetos',
    neighborhood: 'Guabirotuba',
    city: 'Curitiba',
    state: 'PR',
    lat: -25.4635,
    lng: -49.2450,
    salary: 'R$ 1.800,00',
    salaryNumeric: 1800,
    workHours: '6h/dia (30h semanais)',
    schedule: '09:00 às 16:00 (1h almoço) - 3x presencial, 2x home office',
    description: 'Apoio aos programas de inovação aberta, hackathons corporativos e digitalização de rotinas no hub latino-americano da Electrolux em Curitiba. O estagiário atuará na conexão entre áreas de negócio e soluções tecnológicas.',
    responsibilities: [
      'Apoiar na ideação e implementação de projetos de melhoria contínua e digitalização.',
      'Acompanhar testes piloto de ferramentas de inteligência artificial aplicada ao trabalho.',
      'Preparar apresentações executivas e materiais de comunicação sobre inovação.',
      'Organizar workshops de Design Thinking e ideação criativa com os colaboradores.'
    ],
    requirements: [
      'Estudantes de Administração, Design, Publicidade, Relações Internacionais ou TI.',
      'Curiosidade aguçada sobre tendências de inteligência artificial e ecossistema digital.',
      'Comunicação dinâmica e facilidade para falar em público e produzir apresentações.'
    ],
    benefits: [
      'Bolsa-auxílio de R$ 1.800,00',
      'Vale-Refeição no refeitório interno com menu sustentável',
      'Auxílio transporte ou estacionamento gratuito no campus',
      'Descontos exclusivos de até 40% em eletrodomésticos da marca',
      'Trilha de mentoria com executivos globais'
    ],
    recommendedCourses: [
      {
        id: 'curso-transformacao-digital-inovacao',
        title: 'Transformação Digital, Inovação e Estratégias Empresariais',
        badgeName: 'Líder em Transformação Digital & Inovação',
        badgeCategory: 'Inovação & Estratégia',
        accentColor: '#3B82F6',
        link: '/cursos/curso-transformacao-digital-inovacao',
        reason: 'Base teórica completa em cultura de inovação, dados e modelos ágeis de mudança.'
      },
      {
        id: 'curso-resolucao-criativa-problemas-adaptacao',
        title: 'Resolução Criativa de Problemas e Adaptação',
        badgeName: 'Solucionador Criativo de Problemas',
        badgeCategory: 'Trabalho',
        accentColor: '#F59E0B',
        link: '/cursos/curso-resolucao-criativa-problemas-adaptacao',
        reason: 'Ensina técnicas de brainstorming sem julgamento e prototipagem rápida de soluções.'
      }
    ],
    badgesRequired: ['badge-inovacao', 'badge-resolucao-problemas'],
    applicantCount: 26,
    source: 'Via LinkedIn',
    publishedAt: 'Há 2 dias'
  },

  // =========================================================================
  // 17. RELACIONAMENTO & OUVIDORIA - O BOTICÁRIO
  // =========================================================================
  {
    id: 'job-boticario-estagio-ouvidoria',
    numericId: 117,
    title: 'Estágio em Experiência do Cliente e Relacionamento de Marca',
    company: 'Grupo Boticário (Sede São José dos Pinhais)',
    companyCnpjMasked: '77.***.***/0001-50',
    validatedCnpj: true,
    contractType: 'Estágio',
    modality: 'Híbrido',
    area: 'Atendimento',
    neighborhood: 'Centro',
    city: 'São José dos Pinhais',
    state: 'PR',
    lat: -25.5310,
    lng: -49.1990,
    salary: 'R$ 1.680,00',
    salaryNumeric: 1680,
    workHours: '6h/dia (30h semanais)',
    schedule: '09:00 às 16:00 (1h intervalo) - 2x presencial no campus Boticário',
    description: 'Atuação na área de Customer Experience e Ouvidoria do maior ecossistema de beleza do Brasil. Acompanhamento de jornadas de revendedoras e consumidores finais, análise de sentimento em redes sociais e indicadores de fidelização.',
    responsibilities: [
      'Analisar interações e feedbacks de clientes para categorizar principais dores.',
      'Elaborar diagnósticos semanais de NPS e CSAT por canal de atendimento.',
      'Propor melhorias nas respostas padrão e scripts do assistente virtual.',
      'Participar de testes de novas ferramentas de inteligência no suporte.'
    ],
    requirements: [
      'Estudantes de Comunicação, Relações Públicas, Marketing ou Administração.',
      'Paixão por relacionamento com o público e sensibilidade comunicativa.',
      'Capacidade analítica para transformar reclamações em oportunidades de melhoria.'
    ],
    benefits: [
      'Bolsa-auxílio de R$ 1.680,00',
      'Vale-Refeição no cartão flexível',
      'Transporte fretado de Curitiba e região',
      'Desconto de até 40% em produtos Boticário, Eudora, Quem Disse Berenice e O.U.i',
      'Plano de Saúde e Odontológico Bradesco'
    ],
    recommendedCourses: [
      {
        id: 'curso-atendimento-relacionamento-cliente',
        title: 'Atendimento ao Cliente, Experiência e Relacionamento Profissional',
        badgeName: 'Especialista em Atendimento & CX',
        badgeCategory: 'Atendimento & Relacionamento',
        accentColor: '#EC4899',
        link: '/cursos/curso-atendimento-relacionamento-cliente',
        reason: 'O curso de referência da plataforma em métricas de CX, desescalada e fidelização.'
      },
      {
        id: 'curso-soft-skills-comunicacao-interpessoal',
        title: 'Soft Skills e Comunicação Interpessoal',
        badgeName: 'Mestre em Comunicação Interpessoal',
        badgeCategory: 'Habilidades Humanas',
        accentColor: '#10B981',
        link: '/cursos/curso-soft-skills-comunicacao-interpessoal',
        reason: 'Fortalece a inteligência relacional e empatia em interações com o consumidor.'
      }
    ],
    badgesRequired: ['badge-atendimento-cx', 'badge-soft-skills'],
    applicantCount: 38,
    source: 'Via Gupy',
    publishedAt: 'Ontem'
  },

  // =========================================================================
  // 18. DESENVOLVEDOR FRONT-END JÚNIOR - HUB TECH (REMOTO)
  // =========================================================================
  {
    id: 'job-hubtech-junior-frontend',
    numericId: 118,
    title: 'Desenvolvedor(a) Front-End Júnior (React & Next.js)',
    company: 'Hub Tech Curitiba Inovação',
    companyCnpjMasked: '32.***.***/0001-88',
    validatedCnpj: true,
    contractType: 'Júnior',
    modality: 'Remoto',
    area: 'Tecnologia',
    neighborhood: 'Batel',
    city: 'Curitiba',
    state: 'PR',
    lat: -25.4410,
    lng: -49.2880,
    salary: 'R$ 3.200,00',
    salaryNumeric: 3200,
    workHours: '8h/dia (40h semanais)',
    schedule: '09:00 às 18:00 (100% Home Office)',
    description: 'Construção e sustentação de interfaces web responsivas, componentes acessíveis e painéis em React, Next.js e Tailwind CSS para plataformas SaaS educacionais e de recrutamento.',
    responsibilities: [
      'Desenvolver componentes visuais modernos, performáticos e responsivos em Next.js.',
      'Integrar APIs RESTful e lidar com gerenciamento de estado global no front-end.',
      'Realizar testes de usabilidade e garantir acessibilidade digital (WCAG).',
      'Colaborar no GitHub com Pull Requests, revisões de código e documentação técnica.'
    ],
    requirements: [
      'Conhecimento prático em HTML5, CSS3, JavaScript moderno (ES6+) e React.',
      'Familiaridade com Tailwind CSS, TypeScript e consumo de APIs.',
      'Portfólio de projetos ou repositórios no GitHub para avaliação técnica.'
    ],
    benefits: [
      'Salário CLT R$ 3.200,00',
      'Auxílio Home Office de R$ 250,00/mês',
      'Vale-Refeição no cartão Caju (R$ 800,00/mês)',
      'Plano de Saúde e Odontológico sem coparticipação',
      'Subsídio anual para livros, cursos e certificações de tecnologia'
    ],
    recommendedCourses: [
      {
        id: 'curso-hard-skills-excel-ferramentas-digitais',
        title: 'Hard Skills (Excel e Ferramentas Digitais)',
        badgeName: 'Mestre em Ferramentas Digitais',
        badgeCategory: 'Ferramentas de Escritório',
        accentColor: '#3B82F6',
        link: '/cursos/curso-hard-skills-excel-ferramentas-digitais',
        reason: 'Base técnica sólida em ecossistemas de colaboração e ferramentas digitais.'
      },
      {
        id: 'curso-gestao-estrategica-projetos',
        title: 'Gestão Estratégica de Projetos e Metodologias de Gerenciamento',
        badgeName: 'Especialista em Gestão Estratégica de Projetos & Metodologias Ágeis',
        badgeCategory: 'Gestão de Projetos',
        accentColor: '#3B82F6',
        link: '/cursos/curso-gestao-estrategica-projetos',
        reason: 'Alinha as práticas ágeis de desenvolvimento de software (Scrum, Kanban e Git).'
      }
    ],
    badgesRequired: ['badge-informatica-basica', 'badge-gestao-projetos'],
    applicantCount: 47,
    source: 'Via LinkedIn',
    publishedAt: 'Hoje',
    featured: true
  }
];

// =========================================================================
// HELPER FUNCTIONS & DISTANCE FORMULAS
// =========================================================================

/**
 * Fórmula de Haversine para cálculo da distância real em quilômetros
 * entre dois pares de coordenadas (lat, lng).
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Raio da Terra em km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Math.round(d * 10) / 10; // Arredonda para 1 casa decimal
}

/**
 * Gera URLs formatadas para busca direta nos principais aplicativos de emprego.
 */
export function getExternalJobUrls(title: string, city: string = 'Curitiba') {
  const cleanTitle = title.replace(/\([^)]*\)/g, '').trim();
  const searchCity = city ? `${city}, PR` : 'Curitiba, PR';

  return {
    linkedin: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(cleanTitle)}&location=${encodeURIComponent(searchCity)}`,
    indeed: `https://br.indeed.com/jobs?q=${encodeURIComponent(cleanTitle)}&l=${encodeURIComponent(searchCity)}`,
    gupy: `https://portal.gupy.io/job-search/term=${encodeURIComponent(cleanTitle)}`,
    infojobs: `https://www.infojobs.com.br/empregos.aspx?palabra=${encodeURIComponent(cleanTitle)}`,
    catho: `https://www.catho.com.br/vagas/?q=${encodeURIComponent(cleanTitle)}`
  };
}

/**
 * Converte JobOpportunity para o tipo JobVacancy legado do SkillHub
 * para reaproveitamento total dos modais de candidatura e detalhes.
 */
export function toJobVacancy(job: JobOpportunity): JobVacancy {
  const tipoVagaMap: Record<string, JobVacancy['tipoVaga']> = {
    'Jovem Aprendiz': 'Jovem Aprendiz',
    'Estágio': 'Estagiário',
    'Júnior': 'Efetivo Júnior',
    'Primeiro Emprego': 'Primeiro Emprego'
  };

  return {
    id: job.numericId,
    idEmpresa: job.numericId + 1000,
    empresaNome: job.company,
    empresaCnpjMasked: job.companyCnpjMasked,
    empresaValidadaCnpj: job.validatedCnpj,
    titulo: job.title,
    tipoVaga: tipoVagaMap[job.contractType] || 'Jovem Aprendiz',
    descricao: job.description,
    bairro: job.neighborhood,
    cidade: job.city,
    remuneracao: job.salaryNumeric,
    beneficios: job.benefits,
    cargaHorariaDiaria: parseInt(job.workHours.match(/\d+/)?.[0] || '6', 10),
    cargaSemanal: job.workHours,
    horario: job.schedule,
    status: 'ATIVA',
    dataCriacao: job.publishedAt,
    badgesRequeridas: job.badgesRequired,
    candidatosInscritos: job.applicantCount,
    jaCandidatou: false,
    origemIA: (job.source.startsWith('Via ') ? (job.source as JobVacancy['origemIA']) : 'Parceiro Direto'),
    distanciaKm: 0,
    aderenciaPerfil: 85
  };
}

// Cidades pré-definidas para seleção rápida caso o GPS não esteja ativo
export const PRESET_LOCATIONS: { name: string; city: string; state: string; coords: [number, number] }[] = [
  { name: 'Curitiba (Centro) — PR', city: 'Curitiba', state: 'PR', coords: [-25.4284, -49.2733] },
  { name: 'CIC (Cidade Industrial de Curitiba) — PR', city: 'Curitiba', state: 'PR', coords: [-25.5036, -49.3338] },
  { name: 'Batel / Água Verde — Curitiba', city: 'Curitiba', state: 'PR', coords: [-25.4431, -49.2842] },
  { name: 'Boqueirão / Hauer — Curitiba', city: 'Curitiba', state: 'PR', coords: [-25.5036, -49.2372] },
  { name: 'São José dos Pinhais — RMC', city: 'São José dos Pinhais', state: 'PR', coords: [-25.5348, -49.1925] },
  { name: 'Araucária — RMC', city: 'Araucária', state: 'PR', coords: [-25.5925, -49.4089] },
  { name: 'Pinhais / Piraquara — RMC', city: 'Pinhais', state: 'PR', coords: [-25.4342, -49.1895] },
  { name: 'São Paulo (Avenida Paulista) — SP', city: 'São Paulo', state: 'SP', coords: [-23.5615, -46.6560] },
  { name: 'Rio de Janeiro (Centro) — RJ', city: 'Rio de Janeiro', state: 'RJ', coords: [-22.9068, -43.1729] }
];
