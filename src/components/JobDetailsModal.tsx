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
    /* display: flex; flex-direction: column; gap: 24px;     */
    /* width: 100%; min-height: 100vh; padding: 32px 16px;  */
    /* overflow-y: auto;                                     */
    /* ===================================================== */
    <div
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
        minHeight: '100vh',
        padding: '32px 16px',
        overflowY: 'auto',
        alignItems: 'center'
      }}
      onClick={onClose}
    >
      {/* ===================================================== */}
      {/* CONTAINER DO CARTÃO CENTRALIZADO (TEMA ESCURO ORIGINAL) */}
      {/* Sem height ou max-height fixo travando o container    */}
      {/* ===================================================== */}
      <div
        className="w-full max-w-[850px] mx-auto bg-[#110E1B] border border-purple-500/30 rounded-3xl shadow-2xl relative"
        style={{
          display: 'block',
          width: '100%',
          maxWidth: '850px',
          boxSizing: 'border-box',
          margin: '0 auto',
          marginBottom: '24px',
          padding: '24px',
          height: 'auto',
          maxHeight: 'none'
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="job-details-title"
      >
        {/* ===================================================== */}
        {/* BLOCO DE TOPO / CABEÇALHO DO CARD                     */}
        {/* ===================================================== */}
        <div
          className="bg-[#160F28] border border-[#2D1B4E] rounded-2xl relative"
          style={{
            display: 'block',
            width: '100%',
            boxSizing: 'border-box',
            marginBottom: '24px',
            padding: '24px',
            height: 'auto',
            maxHeight: 'none'
          }}
        >
          {/* Botão Fechar */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white bg-[#0F0C1D] hover:bg-purple-950/60 rounded-xl border border-[#2D1B4E] transition-all cursor-pointer shadow-md"
            aria-label="Fechar detalhes da vaga"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges de Topo */}
          <div className="flex flex-wrap items-center gap-2 pr-12 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-950/90 text-purple-200 border border-purple-500/40">
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              <span>✨ {adherencePercent}% de Compatibilidade IA</span>
            </span>

            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#110E1B] text-purple-300 border border-purple-500/30">
              {vaga.tipoVaga}
            </span>

            {vaga.origemIA && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#110E1B] text-zinc-300 border border-[#2D1B4E]">
                {vaga.origemIA}
              </span>
            )}

            <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
              📍 Curitiba &amp; RMC
            </span>
          </div>

          {/* TÍTULO PRINCIPAL (<h1> com margin-bottom: 16px; line-height: 1.7; display: block;) */}
          <h1
            id="job-details-title"
            className="text-2xl sm:text-3xl font-black text-white tracking-tight"
            style={{
              display: 'block',
              marginBottom: '16px',
              lineHeight: 1.7,
              width: '100%',
              wordBreak: 'normal',
              whiteSpace: 'normal'
            }}
          >
            {vaga.titulo}
          </h1>

          {/* Empresa, CNPJ e Bairro */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-300 mb-4">
            <div className="flex items-center gap-2 font-bold text-white">
              <Building2 className="w-4 h-4 text-purple-400 shrink-0" />
              <span className="text-base">{vaga.empresaNome}</span>
              {vaga.empresaValidadaCnpj ? (
                <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-0.5 rounded-md border border-emerald-500/40">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  CNPJ Verificado
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs text-purple-300 font-medium bg-purple-950/50 px-2.5 py-0.5 rounded-md border border-purple-500/20">
                  Empresa Parceira
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-zinc-300">
              <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
              <span className="font-medium">{vaga.bairro}, {vaga.cidade}</span>
              <span className="text-purple-300 font-bold bg-purple-950/80 px-2.5 py-0.5 rounded-md border border-purple-500/30 text-xs">
                A {distanceKm.toFixed(1)} km do seu endereço ({student?.endereco?.bairro || 'CIC'})
              </span>
            </div>
          </div>

          {/* Salário & Carga Horária */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#0F0C1D] border border-purple-500/20 rounded-xl">
            <div>
              <span className="text-zinc-400 text-xs uppercase font-bold tracking-wider block mb-1">
                Bolsa / Salário Registrado
              </span>
              <div className="text-xl sm:text-2xl font-black text-emerald-400">
                {formattedSalary}
              </div>
              <span className="text-xs text-zinc-400 mt-1 block">
                Direitos trabalhistas e FGTS assegurados
              </span>
            </div>

            <div>
              <span className="text-zinc-400 text-xs uppercase font-bold tracking-wider block mb-1">
                Carga Horária &amp; Horário
              </span>
              <div className="text-base sm:text-lg font-bold text-zinc-100 flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{cargaSemanal} ({vaga.horario})</span>
              </div>
              <span className="text-xs text-zinc-400 mt-1 block">
                Compatível com turno escolar e transporte público
              </span>
            </div>
          </div>

          {/* Abas de Navegação */}
          <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-[#2D1B4E] pt-4 w-full">
            {[
              { id: 'TODAS', label: 'Visão Completa', icon: Layers },
              { id: 'LOCALIZACAO', label: '1. Mapa & Transporte RMC', icon: Compass },
              { id: 'EMPRESA', label: '2. Sobre a Empresa', icon: Building2 },
              { id: 'ATIVIDADES', label: '3. Atividades & Rotinas', icon: Briefcase },
              { id: 'REQUISITOS', label: '4. Perfil & Requisitos', icon: Target },
              { id: 'BENEFICIOS', label: '5. Benefícios', icon: HeartHandshake }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
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
        {/* ===================================================== */}
        {(activeTab === 'TODAS' || activeTab === 'LOCALIZACAO') && (
          <div
            className="bg-[#140E24] border border-purple-500/20 rounded-2xl"
            style={{
              display: 'block',
              width: '100%',
              boxSizing: 'border-box',
              marginBottom: '24px',
              padding: '24px',
              height: 'auto',
              maxHeight: 'none'
            }}
          >
            <h2
              className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-[#2D1B4E] pb-3"
              style={{
                display: 'block',
                marginBottom: '16px',
                lineHeight: 1.7
              }}
            >
              <Compass className="w-5 h-5 text-purple-400 inline-block align-middle mr-2" />
              1. Localização, Mobilidade Urbana &amp; Mapa de Curitiba
            </h2>

            <p
              className="text-base text-zinc-200"
              style={{
                display: 'block',
                marginBottom: '16px',
                lineHeight: 1.7
              }}
            >
              {locationData.descricao}
            </p>

            {/* Grid de Métricas de Trajeto */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-4">
              <div className="bg-[#0F0C1D] border border-purple-500/20 rounded-xl p-4">
                <span className="text-xs uppercase font-bold text-zinc-400 flex items-center gap-1.5 mb-1">
                  <Route className="w-3.5 h-3.5 text-purple-400" />
                  Distância do Candidato
                </span>
                <p className="text-lg font-black text-white" style={{ display: 'block', marginBottom: '4px', lineHeight: 1.4 }}>
                  {distanceKm.toFixed(1)} km
                </p>
                <span className="text-xs text-zinc-400 block">
                  Partindo de {student?.endereco?.bairro || 'CIC'}
                </span>
              </div>

              <div className="bg-[#0F0C1D] border border-purple-500/20 rounded-xl p-4">
                <span className="text-xs uppercase font-bold text-zinc-400 flex items-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  Tempo Médio em Trânsito
                </span>
                <p className="text-lg font-black text-white" style={{ display: 'block', marginBottom: '4px', lineHeight: 1.4 }}>
                  ~{locationData.tempoEstimadoMinutos} min
                </p>
                <span className="text-xs text-zinc-400 block">
                  Trajeto via rede integrada URBS
                </span>
              </div>

              <div className="bg-[#0F0C1D] border border-purple-500/20 rounded-xl p-4">
                <span className="text-xs uppercase font-bold text-zinc-400 flex items-center gap-1.5 mb-1">
                  <Bus className="w-3.5 h-3.5 text-purple-400" />
                  Sistema de Bilhetagem
                </span>
                <p className="text-sm font-bold text-white pt-1" style={{ display: 'block', marginBottom: '4px', lineHeight: 1.4 }}>
                  {locationData.tipoTarifa}
                </p>
                <span className="text-xs text-emerald-400 font-semibold block">
                  100% Subsidiado por Vale-Transporte
                </span>
              </div>
            </div>

            {/* Linhas e Terminais */}
            <div className="pt-3 border-t border-[#2D1B4E] space-y-3">
              <h3
                className="text-sm font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2"
                style={{ display: 'block', marginBottom: '12px', lineHeight: 1.5 }}
              >
                <Bus className="w-4 h-4 text-purple-400 inline-block mr-1.5" />
                Terminais Integrados &amp; Principais Linhas:
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-[#0F0C1D] border border-[#2D1B4E] rounded-xl p-3.5">
                  <span className="text-xs font-bold text-zinc-300 block mb-2">Terminais de Acesso:</span>
                  <ul className="space-y-1.5 text-xs text-zinc-300">
                    {locationData.terminaisProximos.map((t, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#0F0C1D] border border-[#2D1B4E] rounded-xl p-3.5">
                  <span className="text-xs font-bold text-zinc-300 block mb-2">Linhas Diretas / Biarticulados:</span>
                  <ul className="space-y-1.5 text-xs text-zinc-300">
                    {locationData.linhasOnibus.map((l, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Pontos de Referência */}
            <div className="pt-4 border-t border-[#2D1B4E] space-y-2">
              <h3
                className="text-sm font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2"
                style={{ display: 'block', marginBottom: '12px', lineHeight: 1.5 }}
              >
                <Navigation className="w-4 h-4 text-purple-400 inline-block mr-1.5" />
                Pontos de Referência &amp; Polos Próximos:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {locationData.pontosInteresse.map((p, idx) => (
                  <div key={idx} className="bg-[#0F0C1D] border border-purple-500/20 rounded-lg p-2.5 text-xs text-zinc-200 flex items-start gap-2">
                    <CheckCheck className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================== */}
        {/* BLOCO 2: 🏢 SOBRE A EMPRESA CONTRATANTE               */}
        {/* ===================================================== */}
        {(activeTab === 'TODAS' || activeTab === 'EMPRESA') && (
          <div
            className="bg-[#140E24] border border-purple-500/20 rounded-2xl"
            style={{
              display: 'block',
              width: '100%',
              boxSizing: 'border-box',
              marginBottom: '24px',
              padding: '24px',
              height: 'auto',
              maxHeight: 'none'
            }}
          >
            <h2
              className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-[#2D1B4E] pb-3"
              style={{
                display: 'block',
                marginBottom: '16px',
                lineHeight: 1.7
              }}
            >
              <Building2 className="w-5 h-5 text-purple-400 inline-block align-middle mr-2" />
              2. Perfil Institucional da Empresa &amp; Polo de Trabalho
            </h2>

            <p
              className="text-base text-zinc-200"
              style={{
                display: 'block',
                marginBottom: '16px',
                lineHeight: 1.7
              }}
            >
              {company.descricao}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-4 pt-2">
              <div className="bg-[#0F0C1D] border border-purple-500/20 rounded-xl p-4">
                <span className="text-xs uppercase font-bold text-zinc-400 flex items-center gap-1.5 mb-1">
                  <Users2 className="w-3.5 h-3.5 text-purple-400" />
                  Porte Institucional
                </span>
                <p className="font-semibold text-zinc-100 text-sm" style={{ display: 'block', marginBottom: '0', lineHeight: 1.5 }}>
                  {company.porte}
                </p>
              </div>

              <div className="bg-[#0F0C1D] border border-purple-500/20 rounded-xl p-4">
                <span className="text-xs uppercase font-bold text-zinc-400 flex items-center gap-1.5 mb-1">
                  <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                  Setor de Atuação
                </span>
                <p className="font-semibold text-zinc-100 text-sm" style={{ display: 'block', marginBottom: '0', lineHeight: 1.5 }}>
                  {company.setor}
                </p>
              </div>

              <div className="bg-[#0F0C1D] border border-purple-500/20 rounded-xl p-4">
                <span className="text-xs uppercase font-bold text-zinc-400 flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  Polo de Trabalho
                </span>
                <p className="font-semibold text-zinc-100 text-sm" style={{ display: 'block', marginBottom: '0', lineHeight: 1.5 }}>
                  {company.polo}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Conformidade Legal Assegurada:</strong> Processo de contratação supervisionado e em estrita conformidade com a Lei 10.097/00 (Jovem Aprendiz) e Lei 11.788/08 (Estágio).
              </span>
            </div>
          </div>
        )}

        {/* ===================================================== */}
        {/* BLOCO 3: 📋 ATIVIDADES & ROTINAS PRÁTICAS             */}
        {/* ===================================================== */}
        {(activeTab === 'TODAS' || activeTab === 'ATIVIDADES') && (
          <div
            className="bg-[#140E24] border border-purple-500/20 rounded-2xl"
            style={{
              display: 'block',
              width: '100%',
              boxSizing: 'border-box',
              marginBottom: '24px',
              padding: '24px',
              height: 'auto',
              maxHeight: 'none'
            }}
          >
            <h2
              className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-[#2D1B4E] pb-3"
              style={{
                display: 'block',
                marginBottom: '16px',
                lineHeight: 1.7
              }}
            >
              <Briefcase className="w-5 h-5 text-purple-400 inline-block align-middle mr-2" />
              3. Atividades &amp; Responsabilidades Práticas
            </h2>

            <p
              className="text-base text-zinc-200"
              style={{
                display: 'block',
                marginBottom: '16px',
                lineHeight: 1.7
              }}
            >
              {vaga.descricao}
            </p>

            <div className="pt-2 space-y-3">
              <h3
                className="text-sm font-bold text-purple-300 uppercase tracking-wider"
                style={{ display: 'block', marginBottom: '12px', lineHeight: 1.5 }}
              >
                Rotinas Práticas Desenvolvidas no Dia a Dia:
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-[#0F0C1D] border border-purple-500/20 rounded-xl p-3.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-1" />
                  <span className="text-sm text-zinc-200" style={{ lineHeight: 1.7 }}>
                    <strong className="text-white">Atendimento Corporativo &amp; Apoio:</strong> Recebimento cordial e encaminhamento de solicitações internas, correspondências e mensagens de clientes.
                  </span>
                </div>

                <div className="flex items-start gap-3 bg-[#0F0C1D] border border-purple-500/20 rounded-xl p-3.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-1" />
                  <span className="text-sm text-zinc-200" style={{ lineHeight: 1.7 }}>
                    <strong className="text-white">Organização Documental &amp; Nuvem:</strong> Arquivamento metódico de notas fiscais, relatórios e documentos nos diretórios Microsoft OneDrive / Google Drive.
                  </span>
                </div>

                <div className="flex items-start gap-3 bg-[#0F0C1D] border border-purple-500/20 rounded-xl p-3.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-1" />
                  <span className="text-sm text-zinc-200" style={{ lineHeight: 1.7 }}>
                    <strong className="text-white">Alimentação de Planilhas e Sistemas ERP:</strong> Cadastro e atualização de registros operacionais com acompanhamento de tutores.
                  </span>
                </div>

                <div className="flex items-start gap-3 bg-[#0F0C1D] border border-purple-500/20 rounded-xl p-3.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-1" />
                  <span className="text-sm text-zinc-200" style={{ lineHeight: 1.7 }}>
                    <strong className="text-white">Ética, Sigilo e LGPD:</strong> Cumprimento cuidadoso das políticas corporativas de sigilo de informações e integridade profissional.
                  </span>
                </div>

                <div className="flex items-start gap-3 bg-[#0F0C1D] border border-purple-500/20 rounded-xl p-3.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-1" />
                  <span className="text-sm text-zinc-200" style={{ lineHeight: 1.7 }}>
                    <strong className="text-white">Formação Teórica Integrada:</strong> Participação periódica em oficinas de capacitação profissional e reuniões pedagógicas.
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
            className="bg-[#140E24] border border-purple-500/20 rounded-2xl"
            style={{
              display: 'block',
              width: '100%',
              boxSizing: 'border-box',
              marginBottom: '24px',
              padding: '24px',
              height: 'auto',
              maxHeight: 'none'
            }}
          >
            <div className="flex items-center justify-between border-b border-[#2D1B4E] pb-3 mb-4">
              <h2
                className="text-lg sm:text-xl font-bold text-white flex items-center gap-2"
                style={{
                  display: 'block',
                  marginBottom: '0',
                  lineHeight: 1.7
                }}
              >
                <Target className="w-5 h-5 text-purple-400 inline-block align-middle mr-2" />
                4. Requisitos, Selos de Competência &amp; Cursos SkillHub
              </h2>
              <span className="text-xs font-bold text-purple-300 bg-purple-950/80 px-2.5 py-1 rounded-md border border-purple-500/30">
                {matchingBadgesCount}/{vaga.badgesRequeridas.length} compatíveis
              </span>
            </div>

            <p
              className="text-base text-zinc-200"
              style={{
                display: 'block',
                marginBottom: '16px',
                lineHeight: 1.7
              }}
            >
              Critérios de elegibilidade e perfil comportamental valorizados pelo time de seleção:
            </p>

            <ul className="space-y-2.5 text-sm text-zinc-200 mb-5">
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-purple-400 mt-2 shrink-0" />
                <span style={{ lineHeight: 1.7 }}>
                  <strong className="text-white">Escolaridade:</strong> Ensino Médio, Técnico ou Superior com matrícula ativa e frequência escolar comprovada.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-purple-400 mt-2 shrink-0" />
                <span style={{ lineHeight: 1.7 }}>
                  <strong className="text-white">Postura &amp; Relacionamento:</strong> Pontualidade, compromisso, boa comunicação oral e escrita, e vontade de aprender.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-purple-400 mt-2 shrink-0" />
                <span style={{ lineHeight: 1.7 }}>
                  <strong className="text-white">Ferramentas de Trabalho:</strong> Conhecimentos elementares de informática, internet e planilhas eletrônicas.
                </span>
              </li>
            </ul>

            {/* Badges Requeridas */}
            <div className="pt-3 border-t border-[#2D1B4E] mb-5">
              <span className="text-xs font-bold text-zinc-300 block mb-3 uppercase tracking-wider">
                Microcertificações e Selos Requeridos:
              </span>
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
                          ? 'bg-purple-950/80 border-purple-500/50 text-purple-200'
                          : 'bg-[#0F0C1D] border-[#2D1B4E] text-zinc-400'
                      }`}
                    >
                      {hasBadge ? (
                        <Check className="w-4 h-4 text-purple-400" />
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-full border border-zinc-600" />
                      )}
                      <span>{label}</span>
                      {hasBadge && (
                        <span className="text-[10px] bg-purple-900/80 text-purple-200 px-1.5 py-0.5 rounded font-semibold">
                          Validado no seu perfil
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cursos Recomendados */}
            <div className="pt-3 border-t border-[#2D1B4E]">
              <span className="text-xs font-bold text-purple-300 block mb-3 uppercase tracking-wider flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-purple-400" />
                Cursos do SkillHub Recomendados para a Oportunidade:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {recommendedCourses.map((c) => (
                  <div
                    key={c.id}
                    className="bg-[#0F0C1D] border border-purple-500/20 rounded-xl p-4 flex flex-col justify-between space-y-2"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                        {c.category}
                      </span>
                      <h4 className="text-xs font-bold text-white mt-1 leading-snug">
                        {c.title}
                      </h4>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-purple-300 pt-2 border-t border-[#2D1B4E]">
                      <span>Carga: {c.hours}</span>
                      <span className="text-emerald-400 font-bold">100% Gratuito</span>
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
            className="bg-[#140E24] border border-purple-500/20 rounded-2xl"
            style={{
              display: 'block',
              width: '100%',
              boxSizing: 'border-box',
              marginBottom: '24px',
              padding: '24px',
              height: 'auto',
              maxHeight: 'none'
            }}
          >
            <h2
              className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 border-b border-[#2D1B4E] pb-3"
              style={{
                display: 'block',
                marginBottom: '16px',
                lineHeight: 1.7
              }}
            >
              <HeartHandshake className="w-5 h-5 text-purple-400 inline-block align-middle mr-2" />
              5. Pacote de Benefícios &amp; Apoio ao Estudante
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4">
              <div className="flex items-start gap-3 p-4 bg-[#0F0C1D] border border-purple-500/20 rounded-xl text-zinc-200">
                <Bus className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold text-sm">Vale-Transporte Integral</strong>
                  <p className="text-xs text-zinc-400 mt-0.5">Recarga mensal de cartões URBS ou Metrocard sem cobranças abusivas.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-[#0F0C1D] border border-purple-500/20 rounded-xl text-zinc-200">
                <Utensils className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold text-sm">Vale-Refeição ou Alimentação</strong>
                  <p className="text-xs text-zinc-400 mt-0.5">Refeitório completo no polo de trabalho ou cartão alimentação flexível.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-[#0F0C1D] border border-purple-500/20 rounded-xl text-zinc-200">
                <HeartPulse className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold text-sm">Seguro de Vida Coletivo</strong>
                  <p className="text-xs text-zinc-400 mt-0.5">Apólice de acidentes pessoais com cobertura integral 24 horas.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-[#0F0C1D] border border-purple-500/20 rounded-xl text-zinc-200">
                <BookOpen className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold text-sm">Tutoria e Mentoria Dedicada</strong>
                  <p className="text-xs text-zinc-400 mt-0.5">Acompanhamento contínuo de gestores seniores com plano de aprendizado.</p>
                </div>
              </div>
            </div>

            {vaga.beneficios && vaga.beneficios.length > 0 && (
              <div className="pt-3 border-t border-[#2D1B4E] space-y-2">
                <span className="text-xs font-bold text-zinc-400 block uppercase tracking-wider">
                  Diferenciais oferecidos por esta filial:
                </span>
                <div className="flex flex-wrap gap-2">
                  {vaga.beneficios.map((b, i) => (
                    <span
                      key={i}
                      className="bg-purple-950/60 text-purple-200 border border-purple-500/30 text-xs px-3 py-1 rounded-lg font-medium"
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
        {/* BLOCO DE RODAPÉ / AÇÕES                               */}
        {/* ===================================================== */}
        <div
          className="bg-[#160F28] border border-[#2D1B4E] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            display: 'flex',
            width: '100%',
            boxSizing: 'border-box',
            marginBottom: '0',
            padding: '24px',
            height: 'auto',
            maxHeight: 'none'
          }}
        >
          <div className="text-xs sm:text-sm text-zinc-300 flex items-center gap-2 self-start sm:self-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
            <span>
              <strong>{vaga.candidatosInscritos} candidaturas registradas</strong> para esta vaga via SkillHub
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-6 py-2.5 rounded-xl bg-[#0F0C1D] border border-[#2D1B4E] hover:border-purple-500/50 text-zinc-300 hover:text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Voltar ao Painel
            </button>

            {vaga.jaCandidatou ? (
              <span className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-purple-950/80 text-purple-300 border border-purple-500/40 text-xs sm:text-sm font-bold shadow-md">
                <Check className="w-4 h-4 text-purple-400" />
                <span>Candidatura Enviada</span>
              </span>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onApply(vaga);
                }}
                className="w-1/2 sm:w-auto px-7 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-purple-700 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-950/50 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>Quero me Candidatar</span>
                <ArrowRight className="w-4 h-4 text-purple-200" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
