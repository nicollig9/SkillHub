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

  const matchKey = Object.keys(BAIRROS_CURITIBA).find((k) =>
    normalized.includes(k.toLowerCase()) || k.toLowerCase().includes(normalized)
  );
  const data = matchKey ? BAIRROS_CURITIBA[matchKey] : null;

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

  const formattedSalary = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(vaga.remuneracao);

  const cargaSemanal = vaga.cargaSemanal || (vaga.cargaHorariaDiaria === 4 ? '20h/semanais' : '30h/semanais');

  return (
    /* ===================================================== */
    /* 1. CONTAINER PAI (WRAPPER DA PÁGINA "VER MAIS")       */
    /* Espaçamento compacto: gap: 16px; padding: 24px 16px;  */
    /* ===================================================== */
    <div
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
        minHeight: '100vh',
        padding: '24px 16px',
        overflowY: 'auto',
        alignItems: 'center'
      }}
      onClick={onClose}
    >
      {/* ===================================================== */}
      {/* CONTAINER DO CARTÃO CENTRALIZADO (TEMA ESCURO)        */ }
      {/* Padding reduzido para 18px a 20px, gap de 12px a 16px */}
      {/* ===================================================== */}
      <div
        className="w-full max-w-[820px] mx-auto bg-[#110E1B] border border-purple-500/30 rounded-2xl sm:rounded-3xl shadow-2xl relative"
        style={{
          display: 'block',
          width: '100%',
          maxWidth: '820px',
          boxSizing: 'border-box',
          margin: '0 auto',
          marginBottom: '16px',
          padding: '18px sm:padding: 20px',
          height: 'auto',
          maxHeight: 'none'
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="job-details-title"
      >
        {/* ===================================================== */}
        {/* BLOCO DE TOPO / CABEÇALHO DO CARD (COMPACTO)          */}
        {/* ===================================================== */}
        <div
          className="bg-[#160F28] border border-[#2D1B4E] rounded-xl sm:rounded-2xl relative p-4 sm:p-5"
          style={{
            display: 'block',
            width: '100%',
            boxSizing: 'border-box',
            marginBottom: '14px',
            height: 'auto',
            maxHeight: 'none'
          }}
        >
          {/* Botão Fechar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-white bg-[#0F0C1D] hover:bg-purple-950/60 rounded-lg border border-[#2D1B4E] transition-all cursor-pointer shadow-sm"
            aria-label="Fechar detalhes da vaga"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Badges de Topo Compactos (12px / text-xs) */}
          <div className="flex flex-wrap items-center gap-1.5 pr-10 mb-2.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-bold bg-purple-950/90 text-purple-200 border border-purple-500/40">
              <Sparkles className="w-3 h-3 text-purple-300" />
              <span>✨ {adherencePercent}% de Compatibilidade IA</span>
            </span>

            <span className="px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-bold bg-[#110E1B] text-purple-300 border border-purple-500/30">
              {vaga.tipoVaga}
            </span>

            {vaga.origemIA && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-medium bg-[#110E1B] text-zinc-300 border border-[#2D1B4E]">
                {vaga.origemIA}
              </span>
            )}

            <span className="px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
              📍 Curitiba &amp; RMC
            </span>
          </div>

          {/* TÍTULO PRINCIPAL (H1: 18px a 20px / text-lg a text-xl) */}
          <h1
            id="job-details-title"
            className="text-lg sm:text-xl font-bold text-white tracking-tight"
            style={{
              display: 'block',
              fontSize: '20px',
              marginBottom: '10px',
              lineHeight: 1.4,
              width: '100%',
              wordBreak: 'normal',
              whiteSpace: 'normal'
            }}
          >
            {vaga.titulo}
          </h1>

          {/* Empresa, CNPJ e Bairro (12px a 13px / text-xs a text-sm) */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs sm:text-sm text-zinc-300 mb-3.5">
            <div className="flex items-center gap-1.5 font-bold text-white">
              <Building2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>{vaga.empresaNome}</span>
              {vaga.empresaValidadaCnpj ? (
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  CNPJ Verificado
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] text-purple-300 font-medium bg-purple-950/50 px-2 py-0.5 rounded border border-purple-500/20">
                  Empresa Parceira
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-zinc-300">
              <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>{vaga.bairro}, {vaga.cidade}</span>
              <span className="text-purple-300 font-bold bg-purple-950/80 px-2 py-0.5 rounded border border-purple-500/30 text-[11px]">
                A {distanceKm.toFixed(1)} km ({student?.endereco?.bairro || 'CIC'})
              </span>
            </div>
          </div>

          {/* Salário & Carga Horária Compactos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 sm:p-3.5 bg-[#0F0C1D] border border-purple-500/20 rounded-xl">
            <div>
              <span className="text-zinc-400 text-[11px] uppercase font-bold tracking-wider block mb-0.5">
                Bolsa / Salário Registrado
              </span>
              <div className="text-lg sm:text-xl font-black text-emerald-400">
                {formattedSalary}
              </div>
              <span className="text-[11px] text-zinc-400 mt-0.5 block">
                Direitos trabalhistas e FGTS assegurados
              </span>
            </div>

            <div>
              <span className="text-zinc-400 text-[11px] uppercase font-bold tracking-wider block mb-0.5">
                Carga Horária &amp; Horário
              </span>
              <div className="text-xs sm:text-sm font-bold text-zinc-100 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>{cargaSemanal} ({vaga.horario})</span>
              </div>
              <span className="text-[11px] text-zinc-400 mt-0.5 block">
                Compatível com turno escolar e transporte URBS
              </span>
            </div>
          </div>

          {/* Abas de Navegação Compactas */}
          <div className="mt-3.5 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-t border-[#2D1B4E] pt-3 w-full">
            {[
              { id: 'TODAS', label: 'Visão Completa', icon: Layers },
              { id: 'LOCALIZACAO', label: '1. Mapa & Transporte', icon: Compass },
              { id: 'EMPRESA', label: '2. Sobre a Empresa', icon: Building2 },
              { id: 'ATIVIDADES', label: '3. Atividades & Rotinas', icon: Briefcase },
              { id: 'REQUISITOS', label: '4. Requisitos', icon: Target },
              { id: 'BENEFICIOS', label: '5. Benefícios', icon: HeartHandshake }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-900/40 ring-1 ring-purple-400'
                      : 'bg-[#110E1B] text-zinc-400 hover:text-white hover:bg-[#1A122E] border border-purple-500/20'
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
        {/* BLOCO 1: 📍 LOCALIZAÇÃO, MAPA & TRANSPORTE RMC       */}
        {/* Organizado em Grid de 2 colunas nos displays maiores  */}
        {/* ===================================================== */}
        {(activeTab === 'TODAS' || activeTab === 'LOCALIZACAO') && (
          <div
            className="bg-[#140E24] border border-purple-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-5"
            style={{
              display: 'block',
              width: '100%',
              boxSizing: 'border-box',
              marginBottom: '14px',
              height: 'auto',
              maxHeight: 'none'
            }}
          >
            {/* Título de Seção (H2: 18px a 20px) */}
            <h2
              className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5 border-b border-[#2D1B4E] pb-2.5"
              style={{
                display: 'block',
                fontSize: '18px',
                marginBottom: '10px',
                lineHeight: 1.4
              }}
            >
              <Compass className="w-4 h-4 text-purple-400 inline-block align-middle mr-1.5" />
              1. Localização, Mobilidade Urbana &amp; Mapa de Curitiba
            </h2>

            {/* Parágrafo do corpo (14px a 15px) */}
            <p
              className="text-sm text-zinc-300"
              style={{
                display: 'block',
                fontSize: '14px',
                marginBottom: '12px',
                lineHeight: 1.6
              }}
            >
              {locationData.descricao}
            </p>

            {/* Grid de Métricas de Trajeto (3 colunas compactas) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-3.5">
              <div className="bg-[#0F0C1D] border border-purple-500/20 rounded-xl p-3">
                <span className="text-[11px] uppercase font-bold text-zinc-400 flex items-center gap-1 mb-0.5">
                  <Route className="w-3 h-3 text-purple-400" />
                  Distância
                </span>
                <p className="text-base font-black text-white" style={{ display: 'block', marginBottom: '2px', lineHeight: 1.3 }}>
                  {distanceKm.toFixed(1)} km
                </p>
                <span className="text-[11px] text-zinc-400 block">
                  Partindo de {student?.endereco?.bairro || 'CIC'}
                </span>
              </div>

              <div className="bg-[#0F0C1D] border border-purple-500/20 rounded-xl p-3">
                <span className="text-[11px] uppercase font-bold text-zinc-400 flex items-center gap-1 mb-0.5">
                  <Clock className="w-3 h-3 text-purple-400" />
                  Tempo de Trajeto
                </span>
                <p className="text-base font-black text-white" style={{ display: 'block', marginBottom: '2px', lineHeight: 1.3 }}>
                  ~{locationData.tempoEstimadoMinutos} min
                </p>
                <span className="text-[11px] text-zinc-400 block">
                  Via rede integrada URBS
                </span>
              </div>

              <div className="bg-[#0F0C1D] border border-purple-500/20 rounded-xl p-3">
                <span className="text-[11px] uppercase font-bold text-zinc-400 flex items-center gap-1 mb-0.5">
                  <Bus className="w-3 h-3 text-purple-400" />
                  Bilhetagem
                </span>
                <p className="text-xs font-bold text-white pt-0.5" style={{ display: 'block', marginBottom: '2px', lineHeight: 1.3 }}>
                  {locationData.tipoTarifa}
                </p>
                <span className="text-[11px] text-emerald-400 font-semibold block">
                  100% Coberto por Vale-Transporte
                </span>
              </div>
            </div>

            {/* Grid de 2 colunas para Linhas/Terminais e Pontos de Referência */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-[#2D1B4E]">
              {/* Coluna 1: Terminais & Linhas */}
              <div className="bg-[#0F0C1D] border border-[#2D1B4E] rounded-xl p-3 space-y-2">
                <span className="text-xs font-bold text-purple-300 uppercase tracking-wider block">
                  Terminais &amp; Linhas de Ônibus:
                </span>
                <div className="space-y-1 text-xs text-zinc-300">
                  <span className="text-[11px] font-semibold text-zinc-400 block">Terminais:</span>
                  <p className="text-zinc-200" style={{ display: 'block', marginBottom: '4px', lineHeight: 1.4, fontSize: '13px' }}>
                    {locationData.terminaisProximos.join(' • ')}
                  </p>

                  <span className="text-[11px] font-semibold text-zinc-400 block pt-1">Linhas Principais:</span>
                  <ul className="space-y-1">
                    {locationData.linhasOnibus.slice(0, 3).map((l, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-[12px] text-zinc-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Coluna 2: Pontos de Referência */}
              <div className="bg-[#0F0C1D] border border-[#2D1B4E] rounded-xl p-3 space-y-2">
                <span className="text-xs font-bold text-purple-300 uppercase tracking-wider block">
                  Pontos de Referência no Bairro:
                </span>
                <ul className="space-y-1.5 text-[12px] text-zinc-300">
                  {locationData.pontosInteresse.slice(0, 4).map((p, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 bg-[#140E24] border border-purple-500/10 rounded-lg p-1.5">
                      <CheckCheck className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================== */}
        {/* BLOCO 2: 🏢 SOBRE A EMPRESA CONTRATANTE               */}
        {/* ===================================================== */}
        {(activeTab === 'TODAS' || activeTab === 'EMPRESA') && (
          <div
            className="bg-[#140E24] border border-purple-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-5"
            style={{
              display: 'block',
              width: '100%',
              boxSizing: 'border-box',
              marginBottom: '14px',
              height: 'auto',
              maxHeight: 'none'
            }}
          >
            <h2
              className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5 border-b border-[#2D1B4E] pb-2.5"
              style={{
                display: 'block',
                fontSize: '18px',
                marginBottom: '10px',
                lineHeight: 1.4
              }}
            >
              <Building2 className="w-4 h-4 text-purple-400 inline-block align-middle mr-1.5" />
              2. Perfil Institucional da Empresa &amp; Polo de Trabalho
            </h2>

            <p
              className="text-sm text-zinc-300"
              style={{
                display: 'block',
                fontSize: '14px',
                marginBottom: '12px',
                lineHeight: 1.6
              }}
            >
              {company.descricao}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-3 pt-1">
              <div className="bg-[#0F0C1D] border border-purple-500/20 rounded-xl p-3">
                <span className="text-[11px] uppercase font-bold text-zinc-400 flex items-center gap-1 mb-0.5">
                  <Users2 className="w-3 h-3 text-purple-400" />
                  Porte
                </span>
                <p className="font-semibold text-zinc-100 text-xs sm:text-sm" style={{ display: 'block', marginBottom: '0', lineHeight: 1.4 }}>
                  {company.porte}
                </p>
              </div>

              <div className="bg-[#0F0C1D] border border-purple-500/20 rounded-xl p-3">
                <span className="text-[11px] uppercase font-bold text-zinc-400 flex items-center gap-1 mb-0.5">
                  <Briefcase className="w-3 h-3 text-purple-400" />
                  Setor
                </span>
                <p className="font-semibold text-zinc-100 text-xs sm:text-sm" style={{ display: 'block', marginBottom: '0', lineHeight: 1.4 }}>
                  {company.setor}
                </p>
              </div>

              <div className="bg-[#0F0C1D] border border-purple-500/20 rounded-xl p-3">
                <span className="text-[11px] uppercase font-bold text-zinc-400 flex items-center gap-1 mb-0.5">
                  <MapPin className="w-3 h-3 text-rose-400" />
                  Polo
                </span>
                <p className="font-semibold text-zinc-100 text-xs sm:text-sm" style={{ display: 'block', marginBottom: '0', lineHeight: 1.4 }}>
                  {company.polo}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Conformidade Legal:</strong> Vaga registrada conforme Lei 10.097/00 (Jovem Aprendiz) e Lei 11.788/08 (Estágio).
              </span>
            </div>
          </div>
        )}

        {/* ===================================================== */}
        {/* BLOCO 3: 📋 ATIVIDADES & ROTINAS PRÁTICAS             */}
        {/* ===================================================== */}
        {(activeTab === 'TODAS' || activeTab === 'ATIVIDADES') && (
          <div
            className="bg-[#140E24] border border-purple-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-5"
            style={{
              display: 'block',
              width: '100%',
              boxSizing: 'border-box',
              marginBottom: '14px',
              height: 'auto',
              maxHeight: 'none'
            }}
          >
            <h2
              className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5 border-b border-[#2D1B4E] pb-2.5"
              style={{
                display: 'block',
                fontSize: '18px',
                marginBottom: '10px',
                lineHeight: 1.4
              }}
            >
              <Briefcase className="w-4 h-4 text-purple-400 inline-block align-middle mr-1.5" />
              3. Atividades &amp; Responsabilidades Práticas
            </h2>

            <p
              className="text-sm text-zinc-300"
              style={{
                display: 'block',
                fontSize: '14px',
                marginBottom: '12px',
                lineHeight: 1.6
              }}
            >
              {vaga.descricao}
            </p>

            <div className="pt-1 space-y-2">
              <span className="text-xs font-bold text-purple-300 uppercase tracking-wider block mb-2">
                Rotinas Desenvolvidas no Dia a Dia:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex items-start gap-2 bg-[#0F0C1D] border border-purple-500/20 rounded-lg p-2.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-zinc-200" style={{ lineHeight: 1.5 }}>
                    <strong className="text-white">Atendimento:</strong> Apoio corporativo, triagem de solicitações e e-mails.
                  </span>
                </div>

                <div className="flex items-start gap-2 bg-[#0F0C1D] border border-purple-500/20 rounded-lg p-2.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-zinc-200" style={{ lineHeight: 1.5 }}>
                    <strong className="text-white">Arquivos Digitais:</strong> Organização em Google Drive e Microsoft OneDrive.
                  </span>
                </div>

                <div className="flex items-start gap-2 bg-[#0F0C1D] border border-purple-500/20 rounded-lg p-2.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-zinc-200" style={{ lineHeight: 1.5 }}>
                    <strong className="text-white">Sistemas ERP:</strong> Alimentação de cadastros com tutoria contínua.
                  </span>
                </div>

                <div className="flex items-start gap-2 bg-[#0F0C1D] border border-purple-500/20 rounded-lg p-2.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-zinc-200" style={{ lineHeight: 1.5 }}>
                    <strong className="text-white">Ética &amp; LGPD:</strong> Zelo por sigilo de informações corporativas.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================== */}
        {/* BLOCO 4: 🎯 REQUISITOS, COMPETÊNCIAS & CURSOS         */}
        {/* ===================================================== */}
        {(activeTab === 'TODAS' || activeTab === 'REQUISITOS') && (
          <div
            className="bg-[#140E24] border border-purple-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-5"
            style={{
              display: 'block',
              width: '100%',
              boxSizing: 'border-box',
              marginBottom: '14px',
              height: 'auto',
              maxHeight: 'none'
            }}
          >
            <div className="flex items-center justify-between border-b border-[#2D1B4E] pb-2.5 mb-3">
              <h2
                className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5"
                style={{
                  display: 'block',
                  fontSize: '18px',
                  marginBottom: '0',
                  lineHeight: 1.4
                }}
              >
                <Target className="w-4 h-4 text-purple-400 inline-block align-middle mr-1.5" />
                4. Requisitos, Selos de Competência &amp; Cursos SkillHub
              </h2>
              <span className="text-[11px] font-bold text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-500/30">
                {matchingBadgesCount}/{vaga.badgesRequeridas.length} compatíveis
              </span>
            </div>

            <p
              className="text-sm text-zinc-300"
              style={{
                display: 'block',
                fontSize: '14px',
                marginBottom: '10px',
                lineHeight: 1.5
              }}
            >
              Critérios de elegibilidade e perfil comportamental valorizados pelo time de seleção:
            </p>

            <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-200 mb-4">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                <span style={{ lineHeight: 1.5 }}>
                  <strong className="text-white">Escolaridade:</strong> Ensino Médio, Técnico ou Superior com matrícula ativa.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                <span style={{ lineHeight: 1.5 }}>
                  <strong className="text-white">Postura:</strong> Pontualidade, comunicação respeitosa e vontade de aprender.
                </span>
              </li>
            </ul>

            {/* Badges Requeridas */}
            <div className="pt-2.5 border-t border-[#2D1B4E] mb-3.5">
              <span className="text-[11px] font-bold text-zinc-400 block mb-2 uppercase tracking-wider">
                Microcertificações e Selos Requeridos:
              </span>
              <div className="flex flex-wrap gap-1.5">
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
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition-all ${
                        hasBadge
                          ? 'bg-purple-950/80 border-purple-500/50 text-purple-200'
                          : 'bg-[#0F0C1D] border-[#2D1B4E] text-zinc-400'
                      }`}
                    >
                      {hasBadge ? (
                        <Check className="w-3.5 h-3.5 text-purple-400" />
                      ) : (
                        <span className="w-3 h-3 rounded-full border border-zinc-600" />
                      )}
                      <span>{label}</span>
                      {hasBadge && (
                        <span className="text-[10px] bg-purple-900/80 text-purple-200 px-1 py-0.2 rounded font-semibold">
                          Validado
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cursos Recomendados */}
            <div className="pt-2.5 border-t border-[#2D1B4E]">
              <span className="text-xs font-bold text-purple-300 block mb-2 uppercase tracking-wider flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                Cursos Recomendados do Catálogo:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {recommendedCourses.map((c) => (
                  <div
                    key={c.id}
                    className="bg-[#0F0C1D] border border-purple-500/20 rounded-lg p-3 flex flex-col justify-between space-y-1.5"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                        {c.category}
                      </span>
                      <h4 className="text-xs font-bold text-white mt-0.5 leading-snug">
                        {c.title}
                      </h4>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-purple-300 pt-1.5 border-t border-[#2D1B4E]">
                      <span>{c.hours}</span>
                      <span className="text-emerald-400 font-bold">Gratuito</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================== */}
        {/* BLOCO 5: 🎁 PACOTE DE BENEFÍCIOS                      */}
        {/* ===================================================== */}
        {(activeTab === 'TODAS' || activeTab === 'BENEFICIOS') && (
          <div
            className="bg-[#140E24] border border-purple-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-5"
            style={{
              display: 'block',
              width: '100%',
              boxSizing: 'border-box',
              marginBottom: '14px',
              height: 'auto',
              maxHeight: 'none'
            }}
          >
            <h2
              className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5 border-b border-[#2D1B4E] pb-2.5"
              style={{
                display: 'block',
                fontSize: '18px',
                marginBottom: '10px',
                lineHeight: 1.4
              }}
            >
              <HeartHandshake className="w-4 h-4 text-purple-400 inline-block align-middle mr-1.5" />
              5. Pacote de Benefícios &amp; Apoio ao Estudante
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
              <div className="flex items-start gap-2.5 p-3 bg-[#0F0C1D] border border-purple-500/20 rounded-xl text-zinc-200">
                <Bus className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold text-xs sm:text-sm">Vale-Transporte Integral</strong>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Recarga mensal URBS/Metrocard garantida por lei.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 bg-[#0F0C1D] border border-purple-500/20 rounded-xl text-zinc-200">
                <Utensils className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold text-xs sm:text-sm">Vale-Alimentação / Refeição</strong>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Refeitório estruturado ou cartão alimentação.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 bg-[#0F0C1D] border border-purple-500/20 rounded-xl text-zinc-200">
                <HeartPulse className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold text-xs sm:text-sm">Seguro de Vida Coletivo</strong>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Apólice com cobertura 24h para o estudante.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 bg-[#0F0C1D] border border-purple-500/20 rounded-xl text-zinc-200">
                <BookOpen className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold text-xs sm:text-sm">Tutoria &amp; Mentoria</strong>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Acompanhamento contínuo de gestores experientes.</p>
                </div>
              </div>
            </div>

            {vaga.beneficios && vaga.beneficios.length > 0 && (
              <div className="pt-2.5 border-t border-[#2D1B4E] space-y-1.5">
                <span className="text-[11px] font-bold text-zinc-400 block uppercase tracking-wider">
                  Diferenciais oferecidos por esta filial:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {vaga.beneficios.map((b, i) => (
                    <span
                      key={i}
                      className="bg-purple-950/60 text-purple-200 border border-purple-500/30 text-[11px] px-2.5 py-0.5 rounded-md font-medium"
                    >
                      ✓ {b}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===================================================== */}
        {/* BLOCO DE RODAPÉ / AÇÕES (COMPACTO)                    */}
        {/* ===================================================== */}
        <div
          className="bg-[#160F28] border border-[#2D1B4E] rounded-xl sm:rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 sm:p-4"
          style={{
            display: 'flex',
            width: '100%',
            boxSizing: 'border-box',
            marginBottom: '0',
            height: 'auto',
            maxHeight: 'none'
          }}
        >
          <div className="text-xs text-zinc-300 flex items-center gap-1.5 self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
            <span>
              <strong>{vaga.candidatosInscritos} candidaturas registradas</strong> via SkillHub
            </span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-5 py-2 rounded-xl bg-[#0F0C1D] border border-[#2D1B4E] hover:border-purple-500/50 text-zinc-300 hover:text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Voltar ao Painel
            </button>

            {vaga.jaCandidatou ? (
              <span className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-xl bg-purple-950/80 text-purple-300 border border-purple-500/40 text-xs font-bold shadow-sm">
                <Check className="w-3.5 h-3.5 text-purple-400" />
                <span>Candidatura Enviada</span>
              </span>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onApply(vaga);
                }}
                className="w-1/2 sm:w-auto px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-purple-700 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-bold text-xs shadow-md shadow-purple-950/50 flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>Quero me Candidatar</span>
                <ArrowRight className="w-3.5 h-3.5 text-purple-200" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
