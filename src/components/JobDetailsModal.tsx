'use client';

import React, { useState } from 'react';
import { JobVacancy } from '@/types';
import { useApp } from '@/context/AppContext';
import { BAIRROS_CURITIBA } from '@/data/mockData';
import {
  X,
  Building2,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Check,
  CheckCircle2,
  BookOpen,
  Bus,
  HeartHandshake,
  DollarSign,
  Briefcase,
  GraduationCap,
  Users2,
  Target,
  FileText,
  Utensils,
  Layers,
  HeartPulse,
  Navigation,
  Compass,
  Route,
  CheckCheck
} from 'lucide-react';

interface JobDetailsModalProps {
  isOpen: boolean;
  vaga: JobVacancy | null;
  distanceKm: number;
  adherencePercent: number;
  onClose: () => void;
  onApply: (vaga: JobVacancy) => void;
}

// Informações completas de Mobilidade Urbana, Transporte e Pontos de Interesse por Bairro da RMC
function getCuritibaMapLocationData(bairro: string, userBairro: string = 'CIC') {
  const normalized = (bairro || '').toLowerCase();
  
  // Localiza dados no BAIRROS_CURITIBA de mockData.ts
  const matchKey = Object.keys(BAIRROS_CURITIBA).find((k) =>
    normalized.includes(k.toLowerCase()) || k.toLowerCase().includes(normalized)
  );
  const data = matchKey ? BAIRROS_CURITIBA[matchKey] : null;

  // Mapeamento realista de linhas URBS, Metrocard, terminais e polos de interesse
  let transportInfo = {
    terminais: ['Terminal de Integração da Região'],
    linhas: ['Linha Direta Ligeirinho', 'Alimentadores Locais URBS', 'Interbairros'],
    pontosInteresse: ['Polos Comerciais e de Serviços', 'Ruas da Cidadania', 'Centros Corporativos'],
    tipoTarifa: 'Tarifa Única URBS Curitiba'
  };

  if (normalized.includes('cic')) {
    transportInfo = {
      terminais: ['Terminal CIC', 'Terminal Fazendinha', 'Terminal Capão Raso'],
      linhas: [
        'Ligeirinho 040 CIC / Cabral (Conexão direta Norte-Sul)',
        'Biarticulado 607 Colombo / CIC',
        'Interbairros 020 Interbairros II (Horário e Anti-Horário)',
        'Alimentadores 628 Sabará, 658 Capão Raso / Barigui, 674 N. Sra. da Luz'
      ],
      pontosInteresse: [
        'Polo Industrial da CIC (Bosch, Mondelez, Positivo Tecnologia, Electrolux)',
        'Rua da Cidadania da CIC e Parque Tecnológico da Informação',
        'Parque dos Tropeiros e Faculdade de Tecnologia SENAI CIC',
        'Complexo Empresarial da Rodovia do Xisto e Contorno Sul'
      ],
      tipoTarifa: 'Tarifa Única URBS Curitiba (VT 100% Subsidiado pela Lei)'
    };
  } else if (normalized.includes('pinheirinho')) {
    transportInfo = {
      terminais: ['Terminal Pinheirinho', 'Terminal Capão Raso'],
      linhas: [
        'Biarticulado 503 Boqueirão / Pinheirinho',
        'Biarticulado 603 Santa Cândida / Capão Raso',
        'Ligeirão 550 Linha Verde Sul / Rui Barbosa',
        'Alimentadores 642 Ganchinho, 644 Pinheirinho / CIC'
      ],
      pontosInteresse: [
        'Corredor Comercial e Atacadista da Linha Verde Sul (Assaí, Atacadão, Condor)',
        'Rua da Cidadania do Pinheirinho e Centro de Atendimento ao Cidadão',
        'Hospital do Idoso e UPA 24h Pinheirinho',
        'Polo Logístico das concessionárias da BR-116'
      ],
      tipoTarifa: 'Tarifa Única URBS Curitiba'
    };
  } else if (normalized.includes('portão') || normalized.includes('portao')) {
    transportInfo = {
      terminais: ['Terminal Portão', 'Terminal Capão Raso'],
      linhas: [
        'Biarticulado 203 Santa Cândida / Capão Raso',
        '021 Interbairros II e 023 Interbairros II Anti-Horário',
        'Ligeirinho Santa Cândida / Pinheirinho',
        'Alimentadores 611 Fazendinha / Portão, 612 Portão / CIC'
      ],
      pontosInteresse: [
        'Shopping Palladium e Shopping Ventura (Grandes Polos de Varejo e Serviços)',
        'Rua da Cidadania Fazendinha/Portão',
        'SESC e SENAC Unidade Portão',
        'Eixo Comercial da Avenida República Argentina e Arthur Bernardes'
      ],
      tipoTarifa: 'Tarifa Única URBS Curitiba'
    };
  } else if (normalized.includes('tatuquara')) {
    transportInfo = {
      terminais: ['Terminal Tatuquara', 'Terminal Pinheirinho'],
      linhas: [
        'Linha Direta Ligeirinho Tatuquara / Rui Barbosa',
        '680 Rurbana, 681 Dalagassa e 684 Besenello',
        'Troncal 619 Santa Rita / CIC',
        'Integração RMC Fazenda Rio Grande / Araucária'
      ],
      pontosInteresse: [
        'Rua da Cidadania do Tatuquara e UPA Regional 24h',
        'Centro de Distribuição Tatuquara Express e Hub E-commerce',
        'Ceasa Curitiba (Maior centro de abastecimento de alimentos do PR)',
        'Parque Linear do Tatuquara'
      ],
      tipoTarifa: 'Tarifa Integrada URBS Curitiba'
    };
  } else if (normalized.includes('batel')) {
    transportInfo = {
      terminais: ['Acesso rápido a Praça Rui Barbosa e Terminal Campina do Siqueira'],
      linhas: [
        'Ligeirinho 303 Centenário / Campo Comprido',
        '380 Detran / Vicente Machado',
        '860 Vila Sandra / Batel',
        '011 Interbairros I'
      ],
      pontosInteresse: [
        'Hub Financeiro e Jurídico de Curitiba (Av. Batel e Rua Visconde de Nácar)',
        'Shopping Pátio Batel e Shopping Curitiba',
        'Complexo Hospitalar Cruz Vermelha e Hospital Santa Cruz',
        'Agências de Comunicação, Consultorias de RH e Startups'
      ],
      tipoTarifa: 'Tarifa Única URBS Curitiba'
    };
  } else if (normalized.includes('boqueirão') || normalized.includes('boqueirao')) {
    transportInfo = {
      terminais: ['Terminal Boqueirão', 'Terminal Carmo', 'Terminal Hauer'],
      linhas: [
        'Biarticulado 500 Ligeirão Boqueirão (Expresso Rui Barbosa)',
        'Biarticulado 502 Circular Sul',
        '503 Boqueirão / Pinheirinho',
        'Alimentadores 521 Mad. Boqueirão, 522 Maringá'
      ],
      pontosInteresse: [
        'Rua da Cidadania do Boqueirão e Terminal Integrado',
        'Polo Têxtil e Comercial da Rua Bley Zornig',
        'Eixo Comercial da Av. Marechal Floriano Peixoto',
        'Parque Náutico e Polo Logístico da Região Sul'
      ],
      tipoTarifa: 'Tarifa Única URBS Curitiba'
    };
  } else if (normalized.includes('centro')) {
    transportInfo = {
      terminais: ['Praça Rui Barbosa', 'Praça Tiradentes', 'Terminal Guadalupe (Hub RMC)'],
      linhas: [
        'Linha Direta Ligeirinho Aeroporto / Centro Cívico',
        'Biarticulado Eixo Norte-Sul (Santa Cândida / Capão Raso)',
        'Circular Centro (Linha Branca e Linha Amarela)',
        'Todas as linhas troncais de integração metropolitana'
      ],
      pontosInteresse: [
        'Calçadão da Rua XV de Novembro e Rua das Flores',
        'Palácio Avenida, Edifício Garcez e sedes corporativas',
        'Complexo Educacional UFPR, UTFPR e Colégio Estadual do Paraná (CEP)',
        'Palácio das Araucárias e Centro Cívico de Curitiba'
      ],
      tipoTarifa: 'Tarifa Central URBS Curitiba'
    };
  } else if (normalized.includes('araucária') || normalized.includes('araucaria')) {
    transportInfo = {
      terminais: ['Terminal Central de Araucária', 'Terminal Angélica'],
      linhas: [
        'H01 Araucária / Curitiba (Conexão Metrocard)',
        'H12 Araucária / Portão (Linha Direta)',
        'H24 T. Angélica / T. Pinheirinho',
        'Alimentadores municipais de Araucária (TRIAR)'
      ],
      pontosInteresse: [
        'Complexo Petroquímico REPAR / Petrobras e CSN Paraná',
        'Polo Metalmecânico e de Montadoras da Rodovia do Xisto',
        'Parque Cachoeira e Centro Administrativo de Araucária',
        'Hub de Cargas e Transportadoras RMC Sul'
      ],
      tipoTarifa: 'Tarifa Integrada Metrocard / URBS'
    };
  } else if (normalized.includes('são josé') || normalized.includes('sao jose')) {
    transportInfo = {
      terminais: ['Terminal Central de São José dos Pinhais', 'Terminal Afonso Pena'],
      linhas: [
        'E05 Curitiba / São José (Linha Direta Guadalupe)',
        'E11 Afonso Pena / Terminal Boqueirão',
        'E21 Centro São José / Boqueirão',
        'Linhas metropolitanas integradas de SJP'
      ],
      pontosInteresse: [
        'Aeroporto Internacional Afonso Pena (Hub Aéreo do Paraná)',
        'Complexo Automotivo Renault / Nissan e Polo de Autopeças',
        'Shopping São José e Centro Histórico de SJP',
        'Armazéns Logísticos e E-commerce da BR-277 e BR-376'
      ],
      tipoTarifa: 'Tarifa Integrada Metrocard / URBS'
    };
  } else if (normalized.includes('colombo')) {
    transportInfo = {
      terminais: ['Terminal Maracanã', 'Terminal Roça Grande', 'Terminal Guaraituba'],
      linhas: [
        'B03 Colombo / Guadalupe',
        'B06 Maracanã / Curitiba',
        'B20 Safira / Maracanã',
        'Alimentadores municipais COMEC / Metrocard'
      ],
      pontosInteresse: [
        'Polo Comercial e Bancário do Alto Maracanã',
        'Rodovia da Uva e Parques Rurais de Colombo',
        'Park Shopping Colombo e Grandes Varejistas',
        'Centros de Distribuição da Rodovia Regis Bittencourt (BR-116)'
      ],
      tipoTarifa: 'Tarifa Integrada Metrocard / URBS'
    };
  } else if (normalized.includes('pinhais')) {
    transportInfo = {
      terminais: ['Terminal de Pinhais'],
      linhas: [
        'C01 Pinhais / Rui Barbosa',
        'C03 Pinhais / Guadalupe',
        'C04 Pinhais / Cabral',
        'Alimentadores municipais de Pinhais'
      ],
      pontosInteresse: [
        'Expotrade Convention Center',
        'Polo Industrial Metalmecânico e Autopeças de Pinhais',
        'Avenida Camilo di Lellis e Centro de Serviços de Pinhais',
        'Parque das Águas de Pinhais'
      ],
      tipoTarifa: 'Tarifa Integrada Metrocard / URBS'
    };
  }

  const distKm = data ? data.distKmDaCIC : 5.0;
  const tempoEstimado = Math.round(15 + distKm * 2.5);

  return {
    nomeFormal: data ? data.nome : `${bairro}, Curitiba & RMC`,
    regiao: data ? data.regiao : 'Curitiba',
    coords: data ? data.coords : [-25.4284, -49.2733],
    descricao: data
      ? data.desc
      : `Região estratégica de Curitiba & RMC com constantes oportunidades para inserção de estudantes e jovens no mercado de trabalho formal.`,
    distanciaKm: distKm,
    tempoEstimadoMinutos: tempoEstimado,
    linhasOnibus: transportInfo.linhas,
    terminaisProximos: transportInfo.terminais,
    pontosInteresse: transportInfo.pontosInteresse,
    tipoTarifa: transportInfo.tipoTarifa
  };
}

// Perfil institucional realista da empresa com base no nome e segmento
function getCompanyProfile(vaga: JobVacancy) {
  const nome = vaga.empresaNome.toLowerCase();

  if (nome.includes('bosch')) {
    return {
      descricao:
        'A Robert Bosch Ltda. é uma líder global em tecnologia e serviços automotivos e industriais. No polo da Cidade Industrial de Curitiba (CIC), a empresa mantém fábricas de alta precisão e centros de pesquisa avançada, promovendo um dos programas de formação de Jovens Aprendizes mais respeitados do país, focado em excelência técnica e desenvolvimento humano.',
      porte: 'Grande Porte (+5.000 colaboradores no PR)',
      setor: 'Tecnologia Automotiva & Indústria 4.0',
      polo: `${vaga.bairro}, ${vaga.cidade} - PR (Acesso direto por alimentadores do Terminal CIC)`
    };
  }

  if (nome.includes('positivo')) {
    return {
      descricao:
        'O Grupo Positivo é um dos maiores e mais tradicionais ecossistemas de educação e tecnologia do Paraná e do Brasil, com mais de 50 anos de história. A instituição investe na formação contínua de jovens talentos, oferecendo ambiente colaborativo, moderno e voltado para a inovação e impacto social.',
      porte: 'Grande Porte (+4.000 colaboradores)',
      setor: 'Educação, Editorial & Tecnologia da Informação',
      polo: `${vaga.bairro}, ${vaga.cidade} - PR (Eixo Batel / Centro)`
    };
  }

  if (nome.includes('condor')) {
    return {
      descricao:
        'A Rede Condor é uma das maiores redes supermercadistas e atacadistas do Sul do Brasil, fundada em Curitiba há mais de 45 anos. Com dezenas de lojas e centros de distribuição na RMC, é uma das principais portas de entrada do jovem no mercado de trabalho formal, com plano de carreira estruturado.',
      porte: 'Grande Porte (+14.000 colaboradores)',
      setor: 'Varejo Supermercadista & Logística',
      polo: `${vaga.bairro}, ${vaga.cidade} - PR (Próximo a terminais da Linha Direta URBS)`
    };
  }

  if (nome.includes('batel') || nome.includes('advocacia') || nome.includes('consultoria')) {
    return {
      descricao:
        'A Advocacia & Consultoria Batel RH é um escritório corporativo consolidado que presta assessoria jurídica, trabalhista e de gestão de talentos para médias e grandes empresas da Região Metropolitana de Curitiba. Proporciona aprendizado prático em rotinas administrativas e atendimento de alto padrão.',
      porte: 'Médio Porte (150 a 300 colaboradores)',
      setor: 'Serviços Jurídicos & Consultoria Corporativa',
      polo: `${vaga.bairro}, ${vaga.cidade} - PR (Região nobre do Batel, fácil acesso a ônibus)`
    };
  }

  if (nome.includes('tatuquara') || nome.includes('expedição') || nome.includes('distribuição')) {
    return {
      descricao:
        'O Centro de Distribuição Tatuquara Express é um dos principais hubs logísticos e de e-commerce do anel sul de Curitiba, integrando fluxos da BR-116 e do Contorno Sul. Oferece programas de capacitação para jovens na área de cadeia de suprimentos, conferência e controle de estoque.',
      porte: 'Grande Porte (+800 colaboradores)',
      setor: 'Logística, Armazenagem & E-commerce',
      polo: `${vaga.bairro}, ${vaga.cidade} - PR (Linhas integradas do Terminal Tatuquara)`
    };
  }

  if (nome.includes('pinheirinho') || nome.includes('atacadista')) {
    return {
      descricao:
        'O Atacadista Sul Linha Verde é um centro atacadista e de autosserviço de grande porte localizado no corredor da Linha Verde Sul. Destaca-se pelo ambiente dinâmico, respeito aos direitos de aprendizagem e constante promoção interna de jovens estudantes.',
      porte: 'Médio/Grande Porte (450 colaboradores)',
      setor: 'Atacado & Distribuição Comercial',
      polo: `${vaga.bairro}, ${vaga.cidade} - PR (Conexão direta com Terminal Pinheirinho)`
    };
  }

  if (nome.includes('renault') || nome.includes('araucária') || nome.includes('são josé')) {
    return {
      descricao:
        'Complexo automotivo e fabril referência no Paraná, pioneiro em manufatura avançada e sustentabilidade. Seus programas de estágio e primeiro emprego são amplamente reconhecidos por proporcionar mentoria de líderes seniores e cursos técnicos integrados.',
      porte: 'Grande Porte (+7.000 colaboradores)',
      setor: 'Indústria Automobilística & Engenharia',
      polo: `${vaga.bairro}, ${vaga.cidade} - PR (Linhas metropolitanas integradas Metrocard)`
    };
  }

  if (nome.includes('hospital') || nome.includes('saúde') || nome.includes('médic')) {
    return {
      descricao:
        'Instituição hospitalar e de assistência à saúde de referência no Paraná, pautada pela humanização, ética e responsabilidade comunitária. O setor administrativo capacita jovens nas rotinas de recepção, prontuários digitais e acolhimento aos pacientes.',
      porte: 'Grande Porte (+2.500 colaboradores)',
      setor: 'Saúde, Atendimento Hospitalar & Ensino',
      polo: `${vaga.bairro}, ${vaga.cidade} - PR (Área central hospitalar de Curitiba)`
    };
  }

  // Descrição Padrão Realista
  return {
    descricao: `${vaga.empresaNome} é uma instituição corporativa de referência com polo atuante no bairro ${vaga.bairro}, em Curitiba & Região Metropolitana. Reconhecida pelas boas práticas de gestão de pessoas e cumprimento rigoroso da Lei do Aprendiz e do Estágio, investe ativamente no desenvolvimento de jovens talentos para o mercado paranaense.`,
    porte: 'Médio / Grande Porte (+350 colaboradores)',
    setor: vaga.tipoVaga === 'Estagiário' ? 'Serviços Corporativos & Tecnologia' : 'Comércio, Logística & Administração',
    polo: `${vaga.bairro}, ${vaga.cidade} - PR (Fácil acesso ao transporte coletivo)`
  };
}

// Cursos sugeridos com base no perfil da vaga
function getRecommendedCourses(vaga: JobVacancy) {
  const t = (vaga.titulo + ' ' + vaga.descricao).toLowerCase();
  const list = [];

  if (/administra|escritório|processo|documento|recepção/.test(t)) {
    list.push({
      id: 'curso-rotinas-administrativas',
      title: 'Rotinas Administrativas e Processos de Escritório',
      category: 'Administração',
      hours: '12h'
    });
  }

  if (/excel|planilha|financeir|suprimento|estoque/.test(t)) {
    list.push({
      id: 'curso-excel-basico-avancado',
      title: 'Microsoft Excel & Planilhas para Escritório',
      category: 'Ferramentas de Escritório',
      hours: '16h'
    });
  }

  if (/comunica|conteúdo|atendimento|cliente|suporte/.test(t)) {
    list.push({
      id: 'curso-comunicacao-corporativa',
      title: 'Comunicação Escrita, E-mails e Redação Corporativa',
      category: 'Comunicação',
      hours: '10h'
    });
    list.push({
      id: 'curso-comunicacao-nao-violenta',
      title: 'Comunicação Não-Violenta (CNV) e Empatia no Trabalho',
      category: 'Desenvolvimento Pessoal',
      hours: '10h'
    });
  }

  if (/ti|tecnologia|software|web|suporte técnico|informática/.test(t)) {
    list.push({
      id: 'curso-informatica-seguranca',
      title: 'Informática Básica, Nuvem e Segurança da Informação',
      category: 'Tecnologia da Informação',
      hours: '12h'
    });
    list.push({
      id: 'curso-ia-produtividade',
      title: 'Inteligência Artificial & Produtividade no Trabalho',
      category: 'Tecnologia da Informação',
      hours: '14h'
    });
  }

  // Curso comum para todos
  list.push({
    id: 'curso-orcamento-primeiro-salario',
    title: 'Orçamento do Primeiro Salário, Holerite e Gestão Financeira',
    category: 'Finanças Pessoais',
    hours: '8h'
  });

  return list.slice(0, 3);
}

export default function JobDetailsModal({
  isOpen,
  vaga,
  distanceKm,
  adherencePercent,
  onClose,
  onApply
}: JobDetailsModalProps) {
  const { student, badges } = useApp();
  const [activeTab, setActiveTab] = useState<'TODAS' | 'LOCALIZACAO' | 'EMPRESA' | 'ATIVIDADES' | 'REQUISITOS' | 'BENEFICIOS'>('TODAS');

  if (!isOpen || !vaga) return null;

  const company = getCompanyProfile(vaga);
  const locationData = getCuritibaMapLocationData(vaga.bairro, student?.endereco?.bairro || 'CIC');

  const userBadgeIds = student.badgesEarned.map((b) => b.badgeId);
  const matchingBadgesCount = vaga.badgesRequeridas.filter((req) =>
    userBadgeIds.some((ub) => req.includes(ub.replace('badge-', '')) || ub.includes(req.replace('badge-', '')))
  ).length;

  const recommendedCourses = getRecommendedCourses(vaga);

  // Formatação de salário
  const formattedSalary = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(vaga.remuneracao);

  const cargaSemanal = vaga.cargaSemanal || (vaga.cargaHorariaDiaria === 4 ? '20h/semanais' : '30h/semanais');

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 lg:p-8"
      onClick={onClose}
    >
      {/* ===================================================== */}
      {/* CONTAINER FORMATO FOLHA / DOCUMENTO PROFISSIONAL (A4) */}
      {/* Fundo Branco, Bordas Leves, Sombra Suave, Max-Width: 850px */}
      {/* ===================================================== */}
      <div
        className="relative w-full max-w-[850px] mx-auto bg-white text-zinc-900 border border-zinc-200/90 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[92vh] my-auto overflow-hidden shrink-0"
        style={{ width: '100%', maxWidth: '850px', margin: '0 auto' }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="job-document-title"
      >
        {/* ===================================================== */}
        {/* CABEÇALHO DO DOCUMENTO PROFISSIONAL (ESTILO CURRÍCULO) */}
        {/* ===================================================== */}
        <div className="w-full bg-white border-b-2 border-purple-600 p-6 sm:p-9 relative shrink-0">
          {/* Botão de Fechar */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 text-zinc-400 hover:text-zinc-800 bg-zinc-100 hover:bg-zinc-200 rounded-xl transition-all cursor-pointer border border-zinc-200 shadow-sm"
            aria-label="Fechar detalhes da vaga"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges de Topo Estilo Documento */}
          <div className="flex flex-wrap items-center gap-2 pr-12 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-900 border border-purple-200 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-purple-700" />
              <span>{adherencePercent}% de Compatibilidade IA</span>
            </span>

            <span className="px-3 py-1 rounded-full text-xs font-bold bg-zinc-100 text-zinc-800 border border-zinc-200">
              {vaga.tipoVaga}
            </span>

            {vaga.origemIA && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 text-zinc-600 border border-zinc-200">
                {vaga.origemIA}
              </span>
            )}

            <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
              📍 Foco Curitiba &amp; RMC
            </span>
          </div>

          {/* Título Principal (24px a 28px - Leitura Fluida Horizontal) */}
          <h1
            id="job-document-title"
            className="w-full text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight leading-snug break-normal text-left"
            style={{ width: '100%', whiteSpace: 'normal', wordBreak: 'normal', lineHeight: 1.3 }}
          >
            {vaga.titulo}
          </h1>

          {/* Linha da Empresa com CNPJ e Localização no Mapa de Curitiba */}
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-700">
            <div className="flex items-center gap-2 font-bold text-zinc-900">
              <Building2 className="w-4 h-4 text-purple-700 shrink-0" />
              <span className="text-base">{vaga.empresaNome}</span>
              {vaga.empresaValidadaCnpj ? (
                <span className="inline-flex items-center gap-1 text-xs text-emerald-800 font-bold bg-emerald-100/80 px-2.5 py-0.5 rounded-md border border-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  CNPJ Verificado
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs text-purple-800 font-medium bg-purple-100/70 px-2.5 py-0.5 rounded-md border border-purple-300">
                  Empresa Parceira
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-zinc-700">
              <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
              <span className="font-medium">{vaga.bairro}, {vaga.cidade}</span>
              <span className="text-purple-800 font-bold bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-200 text-xs">
                A {distanceKm.toFixed(1)} km do seu endereço (CIC)
              </span>
            </div>
          </div>

          {/* Ficha Resumo Financeira & Jornada de Trabalho */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 sm:p-5 bg-zinc-50 border border-zinc-200 rounded-2xl shadow-xs w-full">
            <div className="space-y-1">
              <span className="text-zinc-500 text-xs uppercase font-bold tracking-wider block">
                Bolsa-Auxílio / Salário Registrado
              </span>
              <div className="text-xl sm:text-2xl font-black text-emerald-700">
                {formattedSalary}
              </div>
              <span className="text-[11px] text-zinc-500 block">
                Garantia legal de FGTS e direitos trabalhistas integrais
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-zinc-500 text-xs uppercase font-bold tracking-wider block">
                Jornada Semanal &amp; Horário de Trabalho
              </span>
              <div className="text-base sm:text-lg font-bold text-zinc-800 flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-700 shrink-0" />
                <span>{cargaSemanal} ({vaga.horario})</span>
              </div>
              <span className="text-[11px] text-zinc-500 block">
                Turno compatível com frequência escolar e transporte URBS
              </span>
            </div>
          </div>

          {/* Abas de Navegação Estilo Documento */}
          <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-zinc-200 pt-4 w-full">
            {[
              { id: 'TODAS', label: 'Documento Completo', icon: Layers },
              { id: 'LOCALIZACAO', label: '1. Mapa & Transporte RMC', icon: Compass },
              { id: 'EMPRESA', label: '2. Sobre a Empresa', icon: Building2 },
              { id: 'ATIVIDADES', label: '3. Atividades & Rotinas', icon: Briefcase },
              { id: 'REQUISITOS', label: '4. Perfil & Requisitos', icon: Target },
              { id: 'BENEFICIOS', label: '5. Pacote de Benefícios', icon: HeartHandshake }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-purple-700 text-white shadow-sm ring-1 ring-purple-800'
                      : 'bg-zinc-100 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200 border border-zinc-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ===================================================== */}
        {/* CORPO DO DOCUMENTO (FOLHA COM TEXTO LIMPO E FLUIDO)  */}
        {/* Padding interno generoso (24px a 36px), line-height 1.6 */}
        {/* ===================================================== */}
        <div
          className="w-full p-6 sm:p-9 lg:p-10 overflow-y-auto space-y-9 flex-1 text-[15px] sm:text-[16px] text-zinc-800 bg-white"
          style={{ width: '100%', whiteSpace: 'normal', wordBreak: 'normal', lineHeight: 1.6 }}
        >
          {/* ===================================================== */}
          {/* SEÇÃO 1: 📍 LOCALIZAÇÃO, MAPA & TRANSPORTE EM CURITIBA */}
          {/* ===================================================== */}
          {(activeTab === 'TODAS' || activeTab === 'LOCALIZACAO') && (
            <section className="w-full space-y-4" style={{ width: '100%' }}>
              <div className="flex items-center justify-between border-b-2 border-purple-100 pb-2">
                <div className="flex items-center gap-2.5 text-purple-950 font-black text-sm sm:text-base uppercase tracking-wider">
                  <Compass className="w-5 h-5 text-purple-700 shrink-0" />
                  <span>1. Localização, Mobilidade Urbana &amp; Mapa de Curitiba</span>
                </div>
                <span className="text-xs font-bold text-purple-800 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200">
                  {locationData.regiao}
                </span>
              </div>

              <div className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl p-6 sm:p-7 space-y-5 shadow-xs">
                {/* Resumo da Região */}
                <div>
                  <h3 className="text-base font-bold text-zinc-900 mb-1 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-rose-600" />
                    <span>{locationData.nomeFormal}</span>
                  </h3>
                  <p className="text-zinc-700 leading-relaxed text-[15px]">
                    {locationData.descricao}
                  </p>
                </div>

                {/* Grid de Métricas de Proximidade e Mobilidade */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                  <div className="bg-white border border-zinc-200 rounded-xl p-4 space-y-1 shadow-xs">
                    <span className="text-xs uppercase font-bold text-zinc-500 flex items-center gap-1.5">
                      <Route className="w-3.5 h-3.5 text-purple-700" />
                      Raio de Distância
                    </span>
                    <p className="text-lg font-black text-zinc-900">
                      {distanceKm.toFixed(1)} km
                    </p>
                    <span className="text-[11px] text-zinc-500 block">
                      Referência: Bairro do usuário ({student?.endereco?.bairro || 'CIC'})
                    </span>
                  </div>

                  <div className="bg-white border border-zinc-200 rounded-xl p-4 space-y-1 shadow-xs">
                    <span className="text-xs uppercase font-bold text-zinc-500 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-purple-700" />
                      Tempo Médio de Trajeto
                    </span>
                    <p className="text-lg font-black text-zinc-900">
                      ~{locationData.tempoEstimadoMinutos} min
                    </p>
                    <span className="text-[11px] text-zinc-500 block">
                      Estimativa via transporte coletivo municipal
                    </span>
                  </div>

                  <div className="bg-white border border-zinc-200 rounded-xl p-4 space-y-1 shadow-xs">
                    <span className="text-xs uppercase font-bold text-zinc-500 flex items-center gap-1.5">
                      <Bus className="w-3.5 h-3.5 text-purple-700" />
                      Modelo Tarifário
                    </span>
                    <p className="text-sm font-bold text-zinc-900 pt-0.5">
                      {locationData.tipoTarifa}
                    </p>
                    <span className="text-[11px] text-emerald-700 font-semibold block">
                      100% Coberto por Vale-Transporte
                    </span>
                  </div>
                </div>

                {/* Conexões de Transporte URBS / Metrocard */}
                <div className="pt-3 border-t border-zinc-200 space-y-3">
                  <h4 className="text-xs uppercase font-black tracking-wider text-purple-900 flex items-center gap-2">
                    <Bus className="w-4 h-4 text-purple-700" />
                    <span>Conexões de Transporte Público &amp; Terminais Próximos:</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-white border border-zinc-200 rounded-xl p-3.5 space-y-2">
                      <span className="text-xs font-bold text-zinc-700 block">Terminais Integrados de Acesso:</span>
                      <ul className="space-y-1 text-xs text-zinc-600">
                        {locationData.terminaisProximos.map((t, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white border border-zinc-200 rounded-xl p-3.5 space-y-2">
                      <span className="text-xs font-bold text-zinc-700 block">Principais Linhas de Ônibus / Ligeirinhos:</span>
                      <ul className="space-y-1 text-xs text-zinc-600">
                        {locationData.linhasOnibus.map((l, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                            <span>{l}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Pontos de Interesse & Polos Comerciais */}
                <div className="pt-3 border-t border-zinc-200 space-y-2.5">
                  <h4 className="text-xs uppercase font-black tracking-wider text-purple-900 flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-purple-700" />
                    <span>Pontos de Referência &amp; Polos Próximos no Bairro:</span>
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-700">
                    {locationData.pontosInteresse.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-white border border-zinc-200/80 rounded-lg p-2.5">
                        <CheckCheck className="w-3.5 h-3.5 text-purple-700 shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* ===================================================== */}
          {/* SEÇÃO 2: 🏢 SOBRE A EMPRESA CONTRATANTE               */}
          {/* ===================================================== */}
          {(activeTab === 'TODAS' || activeTab === 'EMPRESA') && (
            <section className="w-full space-y-4" style={{ width: '100%' }}>
              <div className="flex items-center justify-between border-b-2 border-purple-100 pb-2">
                <div className="flex items-center gap-2.5 text-purple-950 font-black text-sm sm:text-base uppercase tracking-wider">
                  <Building2 className="w-5 h-5 text-purple-700 shrink-0" />
                  <span>2. Perfil Institucional da Empresa &amp; Polo de Trabalho</span>
                </div>
              </div>

              <div className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl p-6 sm:p-7 space-y-5 shadow-xs">
                <p
                  className="w-full text-[15px] sm:text-[16px] text-zinc-800 leading-relaxed"
                  style={{ width: '100%', whiteSpace: 'normal', wordBreak: 'normal', lineHeight: 1.6 }}
                >
                  {company.descricao}
                </p>

                {/* Tópicos de Metadados Corporativos */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 border-t border-zinc-200">
                  <div className="bg-white border border-zinc-200 rounded-xl p-4 space-y-1">
                    <span className="text-xs uppercase font-bold text-zinc-500 flex items-center gap-1.5">
                      <Users2 className="w-3.5 h-3.5 text-purple-700" />
                      Porte Institucional
                    </span>
                    <p className="font-bold text-zinc-900 text-sm">{company.porte}</p>
                  </div>

                  <div className="bg-white border border-zinc-200 rounded-xl p-4 space-y-1">
                    <span className="text-xs uppercase font-bold text-zinc-500 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-purple-700" />
                      Setor de Atuação
                    </span>
                    <p className="font-bold text-zinc-900 text-sm">{company.setor}</p>
                  </div>

                  <div className="bg-white border border-zinc-200 rounded-xl p-4 space-y-1">
                    <span className="text-xs uppercase font-bold text-zinc-500 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-600" />
                      Endereço do Polo
                    </span>
                    <p className="font-bold text-zinc-900 text-sm">{company.polo}</p>
                  </div>
                </div>

                <div className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-900">
                  <ShieldCheck className="w-4 h-4 text-purple-700 shrink-0" />
                  <span style={{ whiteSpace: 'normal', wordBreak: 'normal', lineHeight: 1.5 }}>
                    <strong>Conformidade Legal Assegurada:</strong> Processo de contratação auditado e em estrita conformidade com a Lei do Aprendiz (Lei 10.097/00) e Lei do Estágio (Lei 11.788/08).
                  </span>
                </div>
              </div>
            </section>
          )}

          {/* ===================================================== */}
          {/* SEÇÃO 3: 📋 ATIVIDADES & RESPONSABILIDADES DIÁRIAS   */}
          {/* ===================================================== */}
          {(activeTab === 'TODAS' || activeTab === 'ATIVIDADES') && (
            <section className="w-full space-y-4" style={{ width: '100%' }}>
              <div className="flex items-center justify-between border-b-2 border-purple-100 pb-2">
                <div className="flex items-center gap-2.5 text-purple-950 font-black text-sm sm:text-base uppercase tracking-wider">
                  <Briefcase className="w-5 h-5 text-purple-700 shrink-0" />
                  <span>3. Atividades &amp; Responsabilidades Práticas</span>
                </div>
              </div>

              <div className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl p-6 sm:p-7 space-y-5 shadow-xs">
                <div>
                  <h4 className="text-xs uppercase font-black tracking-wider text-purple-900 mb-2">
                    Resumo da Função:
                  </h4>
                  <p
                    className="w-full text-[15px] sm:text-[16px] text-zinc-800 leading-relaxed"
                    style={{ width: '100%', whiteSpace: 'normal', wordBreak: 'normal', lineHeight: 1.6 }}
                  >
                    {vaga.descricao}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-200 space-y-3">
                  <h4 className="text-xs uppercase font-black tracking-wider text-purple-900">
                    Rotinas Diárias e Aprendizados Desenvolvidos:
                  </h4>
                  <ul className="space-y-3 text-[15px] text-zinc-800">
                    <li className="flex items-start gap-3 bg-white border border-zinc-200/90 rounded-xl p-3.5">
                      <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0 mt-1" />
                      <span style={{ whiteSpace: 'normal', wordBreak: 'normal', lineHeight: 1.6 }}>
                        <strong className="text-zinc-900 font-bold">Atendimento e Apoio Corporativo:</strong> Recebimento, triagem e encaminhamento cordial de chamados, e-mails e solicitações internas de clientes e colaboradores.
                      </span>
                    </li>

                    <li className="flex items-start gap-3 bg-white border border-zinc-200/90 rounded-xl p-3.5">
                      <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0 mt-1" />
                      <span style={{ whiteSpace: 'normal', wordBreak: 'normal', lineHeight: 1.6 }}>
                        <strong className="text-zinc-900 font-bold">Organização Documental e Arquivos:</strong> Digitalização de relatórios, arquivamento sistemático em pastas físicas e em nuvem (Google Drive / OneDrive) e atualização de cadastros.
                      </span>
                    </li>

                    <li className="flex items-start gap-3 bg-white border border-zinc-200/90 rounded-xl p-3.5">
                      <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0 mt-1" />
                      <span style={{ whiteSpace: 'normal', wordBreak: 'normal', lineHeight: 1.6 }}>
                        <strong className="text-zinc-900 font-bold">Alimentação de Planilhas e Softwares:</strong> Lançamento de dados operacionais em Microsoft Excel e sistemas ERP da empresa com supervisão de gestores seniores.
                      </span>
                    </li>

                    <li className="flex items-start gap-3 bg-white border border-zinc-200/90 rounded-xl p-3.5">
                      <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0 mt-1" />
                      <span style={{ whiteSpace: 'normal', wordBreak: 'normal', lineHeight: 1.6 }}>
                        <strong className="text-zinc-900 font-bold">Ética, Sigilo e LGPD:</strong> Cumprimento responsável das políticas de privacidade, conduta profissional e proteção de dados confidenciais de usuários.
                      </span>
                    </li>

                    <li className="flex items-start gap-3 bg-white border border-zinc-200/90 rounded-xl p-3.5">
                      <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0 mt-1" />
                      <span style={{ whiteSpace: 'normal', wordBreak: 'normal', lineHeight: 1.6 }}>
                        <strong className="text-zinc-900 font-bold">Capacitação Teórica e Mentoria:</strong> Frequência regular em cursos e encontros pedagógicos de formação profissional integrados ao contrato.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* ===================================================== */}
          {/* SEÇÃO 4: 🎯 REQUISITOS, COMPETÊNCIAS & CURSOS         */}
          {/* ===================================================== */}
          {(activeTab === 'TODAS' || activeTab === 'REQUISITOS') && (
            <section className="w-full space-y-4" style={{ width: '100%' }}>
              <div className="flex items-center justify-between border-b-2 border-purple-100 pb-2">
                <div className="flex items-center gap-2.5 text-purple-950 font-black text-sm sm:text-base uppercase tracking-wider">
                  <Target className="w-5 h-5 text-purple-700 shrink-0" />
                  <span>4. Requisitos, Selos de Competência &amp; Cursos SkillHub</span>
                </div>
                <span className="text-xs font-bold text-purple-800 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200">
                  {matchingBadgesCount}/{vaga.badgesRequeridas.length} requisitos atendidos
                </span>
              </div>

              <div className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl p-6 sm:p-7 space-y-5 shadow-xs">
                {/* Requisitos Gerais */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase font-black tracking-wider text-purple-900">
                    Critérios de Elegibilidade &amp; Perfil Comportamental:
                  </h4>
                  <ul className="space-y-2.5 text-[15px] text-zinc-800">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-purple-700 mt-2 shrink-0" />
                      <span style={{ whiteSpace: 'normal', wordBreak: 'normal', lineHeight: 1.6 }}>
                        <strong className="text-zinc-900">Escolaridade:</strong> Ensino Médio, Técnico ou Superior com matrícula ativa e frequência escolar regular (turno matutino, vespertino ou noturno).
                      </span>
                    </li>

                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-purple-700 mt-2 shrink-0" />
                      <span style={{ whiteSpace: 'normal', wordBreak: 'normal', lineHeight: 1.6 }}>
                        <strong className="text-zinc-900">Perfil Pessoal:</strong> Pontualidade, curiosidade para aprender novas rotinas, bom relacionamento interpessoal e espírito colaborativo.
                      </span>
                    </li>

                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-purple-700 mt-2 shrink-0" />
                      <span style={{ whiteSpace: 'normal', wordBreak: 'normal', lineHeight: 1.6 }}>
                        <strong className="text-zinc-900">Conhecimentos Básicos:</strong> Noções gerais de informática (Windows, editores de texto, digitação e internet comercial).
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Selos de Competência Requeridos pelo Empregador */}
                <div className="pt-4 border-t border-zinc-200 space-y-3">
                  <h4 className="text-xs uppercase font-black tracking-wider text-purple-900">
                    Selos de Competência &amp; Microcertificações Validadas:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {vaga.badgesRequeridas.map((bId) => {
                      const hasBadge = userBadgeIds.some(
                        (ub) => bId.includes(ub.replace('badge-', '')) || ub.includes(bId.replace('badge-', ''))
                      );
                      const badgeObj = badges.find(
                        (b) => b.id.includes(bId.replace('badge-', '')) || bId.includes(b.id.replace('badge-', ''))
                      );
                      const label = badgeObj ? badgeObj.title : bId.replace('badge-', '').replaceAll('-', ' ');

                      return (
                        <div
                          key={bId}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
                            hasBadge
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                              : 'bg-white border-zinc-300 text-zinc-600'
                          }`}
                        >
                          {hasBadge ? (
                            <Check className="w-4 h-4 text-emerald-700" />
                          ) : (
                            <span className="w-3.5 h-3.5 rounded-full border border-zinc-400" />
                          )}
                          <span>{label}</span>
                          {hasBadge && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-semibold">
                              Validado no seu Perfil
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Cursos Recomendados */}
                <div className="pt-4 border-t border-zinc-200 space-y-3">
                  <h4 className="text-xs uppercase font-black tracking-wider text-purple-900 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-purple-700" />
                    <span>Cursos Recomendados do SkillHub para Fortalecer sua Seleção:</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {recommendedCourses.map((c) => (
                      <div
                        key={c.id}
                        className="bg-white border border-zinc-200 rounded-xl p-4 flex flex-col justify-between space-y-2 shadow-xs"
                      >
                        <div>
                          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
                            {c.category}
                          </span>
                          <h5 className="text-xs font-bold text-zinc-900 mt-1 leading-snug">
                            {c.title}
                          </h5>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-purple-700 pt-2 border-t border-zinc-100">
                          <span>Carga: {c.hours}</span>
                          <span className="text-emerald-700 font-bold">100% Gratuito</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ===================================================== */}
          {/* SEÇÃO 5: 🎁 PACOTE DE BENEFÍCIOS & DIREITOS           */}
          {/* ===================================================== */}
          {(activeTab === 'TODAS' || activeTab === 'BENEFICIOS') && (
            <section className="w-full space-y-4" style={{ width: '100%' }}>
              <div className="flex items-center justify-between border-b-2 border-purple-100 pb-2">
                <div className="flex items-center gap-2.5 text-purple-950 font-black text-sm sm:text-base uppercase tracking-wider">
                  <HeartHandshake className="w-5 h-5 text-purple-700 shrink-0" />
                  <span>5. Pacote de Benefícios &amp; Direitos Assegurados</span>
                </div>
              </div>

              <div className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl p-6 sm:p-7 space-y-5 shadow-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="flex items-start gap-3 p-4 bg-white border border-zinc-200 rounded-xl text-zinc-800">
                    <Bus className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-zinc-900 block font-bold text-sm">Vale-Transporte Integral</strong>
                      <p className="text-xs text-zinc-600 mt-0.5">Recarga mensal de cartões URBS ou Metrocard sem descontos indevidos.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-white border border-zinc-200 rounded-xl text-zinc-800">
                    <Utensils className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-zinc-900 block font-bold text-sm">Vale-Refeição ou Alimentação</strong>
                      <p className="text-xs text-zinc-600 mt-0.5">Refeitório completo no polo de trabalho ou cartão alimentação flexível.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-white border border-zinc-200 rounded-xl text-zinc-800">
                    <HeartPulse className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-zinc-900 block font-bold text-sm">Seguro de Acidentes Pessoais</strong>
                      <p className="text-xs text-zinc-600 mt-0.5">Apólice coletiva com cobertura integral 24 horas por dia.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-white border border-zinc-200 rounded-xl text-zinc-800">
                    <BookOpen className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-zinc-900 block font-bold text-sm">Tutoria e Orientação Profissional</strong>
                      <p className="text-xs text-zinc-600 mt-0.5">Acompanhamento contínuo por supervisor capacitado da instituição parceira.</p>
                    </div>
                  </div>
                </div>

                {vaga.beneficios && vaga.beneficios.length > 0 && (
                  <div className="pt-3 border-t border-zinc-200 space-y-2">
                    <span className="text-xs font-bold text-zinc-600 block uppercase tracking-wider">
                      Diferenciais específicos informados para esta vaga:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {vaga.beneficios.map((b, i) => (
                        <span
                          key={i}
                          className="bg-white text-zinc-800 border border-zinc-300 text-xs px-3 py-1 rounded-lg font-medium"
                        >
                          ✓ {b}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>

        {/* ===================================================== */}
        {/* RODAPÉ FIXO DO MODAL (ESTILO FOLHA CORPORATIVA)       */}
        {/* ===================================================== */}
        <div className="w-full bg-zinc-50 border-t border-zinc-200 p-5 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="text-xs sm:text-sm text-zinc-600 flex items-center gap-2 self-start sm:self-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
            <span>
              <strong>{vaga.candidatosInscritos} candidaturas registradas</strong> para esta vaga via SkillHub
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-6 py-2.5 rounded-xl bg-white border border-zinc-300 hover:bg-zinc-100 text-zinc-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-xs"
            >
              Voltar ao Painel
            </button>

            {vaga.jaCandidatou ? (
              <span className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs sm:text-sm font-bold shadow-xs">
                <Check className="w-4 h-4 text-emerald-700" />
                <span>Candidatura Enviada</span>
              </span>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onApply(vaga);
                }}
                className="w-1/2 sm:w-auto px-7 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-800 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-600/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>Quero me Candidatar</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
