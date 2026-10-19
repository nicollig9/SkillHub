'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { JobVacancy } from '@/types';
import {
  MapPin,
  Building2,
  Sparkles,
  Bot,
  Bus,
  Search,
  SlidersHorizontal,
  ArrowRight,
  Clock,
  Wallet,
  ShieldCheck,
  Award,
  Check,
  RotateCcw,
  Compass,
  Briefcase,
  ChevronDown,
  Navigation,
  Star
} from 'lucide-react';
import JobApplicationModal from '@/components/JobApplicationModal';

// Coordenadas visuais calibradas no canvas escuro (Curitiba & RMC)
interface MapLocationMeta {
  key: string;
  name: string;
  sublabel: string;
  regiao: 'Curitiba' | 'RMC';
  top: string;
  left: string;
  busLines: string;
  distFromCIC: number;
}

const MAP_LOCATIONS: MapLocationMeta[] = [
  {
    key: 'CIC',
    name: 'CIC',
    sublabel: 'Cidade Industrial',
    regiao: 'Curitiba',
    top: '64%',
    left: '22%',
    busLines: 'Expresso Biarticulado CIC-Centro • Interbairros IV • Alimentador CIC',
    distFromCIC: 0
  },
  {
    key: 'Pinheirinho',
    name: 'Pinheirinho',
    sublabel: 'Linha Verde Sul',
    regiao: 'Curitiba',
    top: '74%',
    left: '46%',
    busLines: 'Linha Verde BRT • Ligeirinho Pinheirinho-Carlos Gomes',
    distFromCIC: 4.8
  },
  {
    key: 'Portão',
    name: 'Portão',
    sublabel: 'Eixo Sudoeste',
    regiao: 'Curitiba',
    top: '56%',
    left: '42%',
    busLines: 'Biarticulado Santa Cândida-Capão Raso • Inter 2',
    distFromCIC: 6.0
  },
  {
    key: 'Tatuquara',
    name: 'Tatuquara',
    sublabel: 'Extremo Sul',
    regiao: 'Curitiba',
    top: '84%',
    left: '32%',
    busLines: 'Terminal Tatuquara • Ligeirão Tatuquara-Centro',
    distFromCIC: 7.5
  },
  {
    key: 'Batel',
    name: 'Batel',
    sublabel: 'Hub Corporativo',
    regiao: 'Curitiba',
    top: '46%',
    left: '38%',
    busLines: 'Expresso Campo Comprido • Linha Turismo • Ligeirinho Batel',
    distFromCIC: 8.2
  },
  {
    key: 'Boqueirão',
    name: 'Boqueirão',
    sublabel: 'Zona Sul / Leste',
    regiao: 'Curitiba',
    top: '64%',
    left: '68%',
    busLines: 'Expresso Biarticulado Boqueirão-Centro • Interbairros III',
    distFromCIC: 8.5
  },
  {
    key: 'Centro',
    name: 'Centro',
    sublabel: 'Hub Financeiro',
    regiao: 'Curitiba',
    top: '36%',
    left: '48%',
    busLines: 'Praça Rui Barbosa • Tiradentes • Eixo RIT Conexão Geral',
    distFromCIC: 9.1
  },
  {
    key: 'Araucária',
    name: 'Araucária',
    sublabel: 'RMC Sudoeste',
    regiao: 'RMC',
    top: '82%',
    left: '16%',
    busLines: 'Metrocard H01 Araucária-Curitiba • Terminal Angélica',
    distFromCIC: 9.8
  },
  {
    key: 'São José dos Pinhais',
    name: 'São José dos Pinhais',
    sublabel: 'RMC / Aeroporto',
    regiao: 'RMC',
    top: '72%',
    left: '84%',
    busLines: 'Metrocard E05 Curitiba-SJP • Eixo Linha Boqueirão',
    distFromCIC: 16.5
  },
  {
    key: 'Pinhais',
    name: 'Pinhais',
    sublabel: 'RMC Leste',
    regiao: 'RMC',
    top: '32%',
    left: '78%',
    busLines: 'Metrocard C01 Pinhais-Rui Barbosa • Integração Term. Pinhais',
    distFromCIC: 18.2
  },
  {
    key: 'Colombo',
    name: 'Colombo',
    sublabel: 'RMC Norte',
    regiao: 'RMC',
    top: '18%',
    left: '55%',
    busLines: 'Metrocard B06 Maracanã-Curitiba • Rodovia da Uva',
    distFromCIC: 22.0
  }
];

export default function CuritibaProximityMap() {
  const { student, vagas, badges } = useApp();

  // Estados de Filtros Organizados
  const [contractFilter, setContractFilter] = useState<string>('TODAS');
  const [locationFilter, setLocationFilter] = useState<string>('TODOS');
  const [sortBy, setSortBy] = useState<'PROXIMIDADE' | 'SALARIO' | 'RECENTE'>('PROXIMIDADE');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modal de Candidatura
  const [modalVaga, setModalVaga] = useState<JobVacancy | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Bairro do aluno conectado (garante CIC como padrão destacado)
  const userBairro = student?.endereco?.bairro || 'CIC';

  // Obter distância da vaga em relação ao usuário (CIC)
  const getDistanceForVaga = (vaga: JobVacancy): number => {
    if (typeof vaga.distanciaKm === 'number') return vaga.distanciaKm;
    const meta = MAP_LOCATIONS.find(
      (m) =>
        m.key.toLowerCase() === vaga.bairro.toLowerCase() ||
        vaga.bairro.toLowerCase().includes(m.key.toLowerCase()) ||
        vaga.cidade.toLowerCase().includes(m.key.toLowerCase())
    );
    return meta ? meta.distFromCIC : 10.0;
  };

  // Obter percentual de compatibilidade/aderência da IA
  const getAdherenceForVaga = (vaga: JobVacancy): number => {
    if (vaga.aderenciaPerfil) return vaga.aderenciaPerfil;
    const userBadgeIds = student.badgesEarned.map((b) => b.badgeId);
    const matched = vaga.badgesRequeridas.filter((req) =>
      userBadgeIds.some((ub) => req.includes(ub.replace('badge-', '')) || ub.includes(req.replace('badge-', '')))
    ).length;
    if (vaga.badgesRequeridas.length === 0) return 80;
    return Math.min(98, Math.max(72, Math.round(70 + (matched / vaga.badgesRequeridas.length) * 25)));
  };

  // Origem IA da Vaga
  const getOrigemIA = (vaga: JobVacancy): string => {
    if (vaga.origemIA) return vaga.origemIA;
    const mockOrigins = ['Via Indeed', 'Via CIEE', 'Via Vagas.com', 'Via NUBE', 'Via Catho', 'Parceiro Direto'];
    return mockOrigins[vaga.id % mockOrigins.length];
  };

  // Carga Horária Semanal formatada
  const getCargaSemanal = (vaga: JobVacancy): string => {
    if (vaga.cargaSemanal) return vaga.cargaSemanal;
    if (vaga.cargaHorariaDiaria === 4) return '20h/semanais';
    if (vaga.cargaHorariaDiaria === 6) return '30h/semanais';
    return `${vaga.cargaHorariaDiaria * 5}h/semanais`;
  };

  // Contagem de vagas por bairro/cidade
  const countPerLocation = useMemo(() => {
    const counts: Record<string, number> = {};
    MAP_LOCATIONS.forEach((loc) => {
      counts[loc.key] = vagas.filter((v) => {
        const b = v.bairro.toLowerCase();
        const c = v.cidade.toLowerCase();
        const k = loc.key.toLowerCase();
        return b === k || b.includes(k) || c === k || c.includes(k);
      }).length;
    });
    return counts;
  }, [vagas]);

  // Vagas Filtradas e Ordenadas
  const filteredAndSortedVagas = useMemo(() => {
    let result = vagas.filter((vaga) => vaga.status === 'ATIVA');

    // Filtro por Tipo de Contrato
    if (contractFilter !== 'TODAS') {
      if (contractFilter === 'JOVEM_APRENDIZ') {
        result = result.filter((v) => v.tipoVaga === 'Jovem Aprendiz');
      } else if (contractFilter === 'ESTAGIO') {
        result = result.filter((v) => v.tipoVaga === 'Estagiário');
      } else if (contractFilter === 'PRIMEIRO_EMPREGO') {
        result = result.filter((v) => v.tipoVaga === 'Primeiro Emprego' || v.tipoVaga === 'Estudante');
      }
    }

    // Filtro por Bairro/Cidade
    if (locationFilter !== 'TODOS') {
      result = result.filter((v) => {
        const b = v.bairro.toLowerCase();
        const c = v.cidade.toLowerCase();
        const target = locationFilter.toLowerCase();
        return b === target || b.includes(target) || c === target || c.includes(target);
      });
    }

    // Filtro por busca de texto
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (v) =>
          v.titulo.toLowerCase().includes(q) ||
          v.empresaNome.toLowerCase().includes(q) ||
          v.bairro.toLowerCase().includes(q) ||
          v.cidade.toLowerCase().includes(q) ||
          v.descricao.toLowerCase().includes(q)
      );
    }

    // Ordenação
    return result.sort((a, b) => {
      if (sortBy === 'PROXIMIDADE') {
        return getDistanceForVaga(a) - getDistanceForVaga(b);
      }
      if (sortBy === 'SALARIO') {
        return b.remuneracao - a.remuneracao;
      }
      if (sortBy === 'RECENTE') {
        return b.id - a.id;
      }
      return 0;
    });
  }, [vagas, contractFilter, locationFilter, searchQuery, sortBy]);

  // Vagas Recomendadas pela IA (Top 2 ou 3 com maior aderência)
  const recommendedVagas = useMemo(() => {
    const active = vagas.filter((v) => v.status === 'ATIVA');
    return [...active]
      .sort((a, b) => getAdherenceForVaga(b) - getAdherenceForVaga(a))
      .slice(0, 3);
  }, [vagas]);

  // Handler para clicar em um pin no mapa
  const handlePinClick = (locationKey: string) => {
    if (locationFilter.toLowerCase() === locationKey.toLowerCase()) {
      setLocationFilter('TODOS');
    } else {
      setLocationFilter(locationKey);
    }
  };

  // Abrir modal de candidatura
  const handleOpenApply = (vaga: JobVacancy) => {
    setModalVaga(vaga);
    setIsModalOpen(true);
  };

  // Badge da Origem da IA estilizado
  const renderOriginBadge = (origem: string) => {
    switch (origem) {
      case 'Via Indeed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-950/70 border border-blue-500/40 text-blue-300">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            Via Indeed
          </span>
        );
      case 'Via CIEE':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-950/70 border border-teal-500/40 text-teal-300">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
            Via CIEE
          </span>
        );
      case 'Via Vagas.com':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-950/70 border border-purple-500/40 text-purple-300">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
            Via Vagas.com
          </span>
        );
      case 'Via NUBE':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-950/70 border border-emerald-500/40 text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Via NUBE
          </span>
        );
      case 'Via Catho':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-950/70 border border-indigo-500/40 text-indigo-300">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
            Via Catho
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-950/70 border border-amber-500/40 text-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            Parceiro Direto
          </span>
        );
    }
  };

  const selectedLocationMeta = MAP_LOCATIONS.find((l) => l.key.toLowerCase() === locationFilter.toLowerCase());

  return (
    <div className="space-y-6 max-w-6xl mx-auto w-full pb-16">
      {/* ===================================================== */}
      {/* 2. CABEÇALHO & CONCEITO DE IA MULTIPLATAFORMA (HERO) */}
      {/* ===================================================== */}
      <section className="bg-[#110E1B] border border-[#2D1B4E]/80 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow de fundo */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>RADAR DE EMPREGABILIDADE • CURITIBA &amp; RMC</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Proteção LGPD Ativa: Localização aproximada por bairro</span>
            </div>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Mapa de Vagas &amp; Radar de Oportunidades com IA
            </h1>
            <p className="mt-2 text-sm sm:text-base text-zinc-300 leading-relaxed">
              Nossa IA cruza suas competências e localização com vagas de Jovem Aprendiz, Estágio e Primeiro Emprego
              agregadas de plataformas como <strong className="text-purple-300 font-semibold">Indeed</strong>,{' '}
              <strong className="text-purple-300 font-semibold">Vagas.com</strong>,{' '}
              <strong className="text-purple-300 font-semibold">CIEE</strong>,{' '}
              <strong className="text-purple-300 font-semibold">NUBE</strong> e{' '}
              <strong className="text-purple-300 font-semibold">Catho</strong>.
            </p>
          </div>

          {/* Card em Destaque da IA */}
          <div className="bg-[#18112C] border border-[#3B2268] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center shrink-0 text-xl">
                🤖
              </div>
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Busca Inteligente por Proximidade: Vagas ranqueadas pela distância do seu bairro ({userBairro}) e facilidade de acesso de ônibus (URBS / Metrocard).</span>
                </h2>
                <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5 flex-wrap">
                  <Bus className="w-3.5 h-3.5 text-purple-400" />
                  <span>Conexão direta integrada: Eixos Expresso Biarticulado, Ligeirinhos e Terminais da RMC.</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="px-3 py-1.5 rounded-xl bg-purple-950/90 border border-purple-500/40 text-purple-200 text-xs font-bold">
                📍 Você está em: <strong className="text-white">{userBairro}</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* 1. REDESIGN COMPLETO DO MAPA (MOCK INTERATIVO DARK) */}
      {/* ===================================================== */}
      <section className="bg-[#110E1B] border border-[#2D1B4E]/80 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2D1B4E]/60 pb-3">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-purple-400" />
            <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Mapa Interativo de Oportunidades (Curitiba &amp; Região Metropolitana)
            </h2>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {locationFilter !== 'TODOS' && (
              <button
                onClick={() => setLocationFilter('TODOS')}
                className="text-xs text-purple-300 hover:text-white font-semibold underline underline-offset-4 transition-colors mr-2"
              >
                Ver todos os bairros
              </button>
            )}
            <button
              onClick={() => setLocationFilter('CIC')}
              className="text-xs font-bold text-purple-300 hover:text-white bg-purple-950/70 border border-purple-500/40 px-3 py-1 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Navigation className="w-3.5 h-3.5 text-purple-400" />
              <span>Centralizar em Mim (CIC)</span>
            </button>
          </div>
        </div>

        {/* Canvas do Mapa Estilo Dark Mapbox / Leaflet */}
        <div className="relative w-full h-[380px] sm:h-[420px] bg-[#0A0718] rounded-2xl border border-[#2D1B4E] overflow-hidden select-none">
          {/* Grid Geográfico Suave de Fundo */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="map-grid-wide" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2D1B4E" strokeWidth="0.8" />
              </pattern>
              <linearGradient id="transit-line-wide" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#C084FC" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            <rect width="100%" height="100%" fill="url(#map-grid-wide)" />

            {/* Contorno Vetorial Estilizado da RMC */}
            <ellipse cx="50%" cy="52%" rx="45%" ry="44%" fill="#130C26" fillOpacity="0.5" stroke="#372061" strokeWidth="1.2" strokeDasharray="3 3" />

            {/* Área Central de Curitiba */}
            <path
              d="M 320 130 C 420 100, 560 120, 600 180 C 650 250, 660 330, 600 380 C 530 420, 400 440, 280 400 C 180 370, 160 270, 220 180 Z"
              fill="#181030"
              fillOpacity="0.6"
              stroke="#4C2889"
              strokeWidth="1.5"
            />

            {/* Linhas de Integração de Ônibus (URBS / Metrocard) */}
            {/* Linha Verde Norte-Sul */}
            <line x1="55%" y1="18%" x2="46%" y2="74%" stroke="url(#transit-line-wide)" strokeWidth="2.5" strokeDasharray="5 4" />

            {/* Eixo Sul (Centro -> Portão -> Pinheirinho -> CIC) */}
            <path d="M 480 150 Q 420 220, 220 270" fill="none" stroke="#A855F7" strokeWidth="2" strokeDasharray="4 4" strokeOpacity="0.8" />

            {/* Eixo Leste (Centro -> Boqueirão -> SJP) */}
            <path d="M 480 150 Q 660 270, 840 310" fill="none" stroke="#A855F7" strokeWidth="2" strokeDasharray="4 4" strokeOpacity="0.6" />

            {/* Eixo Oeste Metrocard (CIC -> Araucária) */}
            <line x1="22%" y1="64%" x2="16%" y2="82%" stroke="#C084FC" strokeWidth="2" strokeDasharray="3 3" strokeOpacity="0.7" />

            {/* Eixo Leste Metrocard (Centro -> Pinhais) */}
            <line x1="48%" y1="36%" x2="78%" y2="32%" stroke="#C084FC" strokeWidth="2" strokeDasharray="3 3" strokeOpacity="0.7" />
          </svg>

          {/* Rótulo Geográfico RMC e Curitiba de Fundo */}
          <div className="absolute top-3 left-4 pointer-events-none text-[10px] text-zinc-600 font-mono tracking-widest uppercase">
            Curitiba &amp; RMC • Eixo RIT / Metrocard
          </div>

          {/* Marcadores / Pins nos Bairros e Cidades */}
          {MAP_LOCATIONS.map((loc) => {
            const isUserLoc = loc.key === userBairro;
            const isSelected = locationFilter.toLowerCase() === loc.key.toLowerCase();
            const vacanciesCount = countPerLocation[loc.key] || 0;

            return (
              <div
                key={loc.key}
                style={{ top: loc.top, left: loc.left }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
              >
                {/* Aura Pulsante Discreta no Bairro do Usuário (CIC) */}
                {isUserLoc && (
                  <div className="absolute -inset-3 rounded-full bg-violet-600/30 animate-ping pointer-events-none" />
                )}

                {/* Botão do Pin */}
                <button
                  onClick={() => handlePinClick(loc.key)}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 shadow-xl cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white border-2 border-white scale-110 ring-4 ring-purple-500/40 z-30'
                      : isUserLoc
                      ? 'bg-[#1C1236] text-purple-200 border-2 border-purple-400 ring-2 ring-purple-500/30 hover:scale-105'
                      : vacanciesCount > 0
                      ? 'bg-[#150F28]/95 text-zinc-200 border border-[#442674] hover:border-purple-400 hover:text-white hover:scale-105'
                      : 'bg-[#100B20]/80 text-zinc-400 border border-[#2D1B4E]/60 hover:text-zinc-200'
                  }`}
                >
                  {/* Ícone */}
                  <span className="shrink-0">
                    {isUserLoc ? (
                      <span className="flex h-2 w-2 rounded-full bg-purple-400 ring-4 ring-purple-500/40 animate-pulse" />
                    ) : (
                      <MapPin
                        className={`w-3.5 h-3.5 ${
                          isSelected ? 'text-white' : vacanciesCount > 0 ? 'text-purple-400' : 'text-zinc-500'
                        }`}
                      />
                    )}
                  </span>

                  {/* Nome do Bairro & Quantidade */}
                  <span className="tracking-tight whitespace-nowrap">
                    {loc.name} {vacanciesCount > 0 ? `• ${vacanciesCount} vagas` : ''}
                  </span>
                </button>

                {/* Badge Pulsante Flutuante para o Bairro do Usuário */}
                {isUserLoc && (
                  <div className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 bg-purple-900/90 text-purple-200 border border-purple-400/60 text-[10px] font-black px-2 py-0.5 rounded-md shadow-lg backdrop-blur-sm animate-pulse">
                      📍 Você está aqui: CIC
                    </span>
                  </div>
                )}

                {/* Tooltip com Linhas de Ônibus no Hover */}
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block z-40 pointer-events-none w-56">
                  <div className="bg-[#1A1230] border border-purple-500/40 rounded-xl p-2.5 text-[11px] text-zinc-300 shadow-2xl space-y-1">
                    <div className="font-bold text-white flex items-center justify-between">
                      <span>{loc.name} ({loc.regiao})</span>
                      <span className="text-purple-300 text-[10px] font-bold">
                        {loc.distFromCIC === 0 ? 'Sua Região' : `~${loc.distFromCIC} km de você`}
                      </span>
                    </div>
                    <p className="text-zinc-400 text-[10px] leading-tight">
                      🚌 {loc.busLines}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Legenda do Mapa */}
          <div className="absolute bottom-3 left-3 right-3 bg-[#0E0A1E]/90 border border-[#2D1B4E]/80 rounded-xl p-2.5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-400 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 border border-white"></span>
                <span className="text-zinc-300 font-medium">Você está aqui (CIC)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#18112C] border border-purple-400"></span>
                <span className="text-zinc-300 font-medium">Bairro com vagas</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-purple-400"></span>
                <span className="text-zinc-300 font-medium">Linhas URBS / Metrocard</span>
              </span>
            </div>

            <div className="text-[10px] text-purple-300 font-semibold">
              Clique em qualquer pin para filtrar a grade de vagas abaixo
            </div>
          </div>
        </div>

        {/* Card Informativo do Bairro Selecionado */}
        <div className="bg-[#160F28] border border-[#2D1B4E] rounded-2xl p-4 text-xs space-y-1.5">
          <div className="flex items-center justify-between font-bold text-white">
            <span className="flex items-center gap-1.5 text-purple-300">
              <MapPin className="w-3.5 h-3.5 text-purple-400" />
              {selectedLocationMeta ? `${selectedLocationMeta.name} (${selectedLocationMeta.regiao})` : 'Visão Geral (Todas as Regiões)'}
            </span>

            {selectedLocationMeta && (
              <span className="text-emerald-400 font-semibold text-[11px]">
                {selectedLocationMeta.distFromCIC === 0
                  ? '🎯 Mesmo Bairro (0 km de deslocamento)'
                  : `🚗 ~${selectedLocationMeta.distFromCIC} km do seu endereço (CIC)`}
              </span>
            )}
          </div>

          <p className="text-zinc-300 text-[11px] leading-relaxed">
            {selectedLocationMeta
              ? `Acesso facilitado de transporte público: ${selectedLocationMeta.busLines}.`
              : 'Exibindo oportunidades integradas por toda Curitiba e Região Metropolitana. Clique em qualquer marcador no mapa para filtrar.'}
          </p>
        </div>
      </section>

      {/* ===================================================== */}
      {/* 3. BARRA DE FILTROS LIMPA E ORGANIZADA */}
      {/* ===================================================== */}
      <section
        className="bg-[#160F28]/90 border border-[#2D1B4E]/80 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4"
        aria-label="Filtros de oportunidades"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Campo de Busca Rápida */}
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por cargo, empresa ou palavra-chave..."
              className="w-full bg-[#0F0C1D] border border-[#2D1B4E] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            />
          </div>

          {/* Select de Bairro / Cidade (RMC) */}
          <div className="md:col-span-4 relative">
            <MapPin className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full bg-[#0F0C1D] border border-[#2D1B4E] rounded-xl pl-10 pr-8 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all appearance-none cursor-pointer"
            >
              <option value="TODOS">Todas as Regiões (Curitiba &amp; RMC)</option>
              <optgroup label="Bairros de Curitiba">
                <option value="CIC">CIC (Você está aqui)</option>
                <option value="Centro">Centro</option>
                <option value="Batel">Batel</option>
                <option value="Boqueirão">Boqueirão</option>
                <option value="Pinheirinho">Pinheirinho</option>
                <option value="Portão">Portão</option>
                <option value="Tatuquara">Tatuquara</option>
              </optgroup>
              <optgroup label="Cidades da RMC">
                <option value="Araucária">Araucária (RMC)</option>
                <option value="São José dos Pinhais">São José dos Pinhais (RMC)</option>
                <option value="Pinhais">Pinhais (RMC)</option>
                <option value="Colombo">Colombo (RMC)</option>
              </optgroup>
            </select>
            <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Select de Ordenação */}
          <div className="md:col-span-4 relative">
            <SlidersHorizontal className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-[#0F0C1D] border border-[#2D1B4E] rounded-xl pl-10 pr-8 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all appearance-none cursor-pointer"
            >
              <option value="PROXIMIDADE">Mais Próximas de Mim ({userBairro})</option>
              <option value="SALARIO">Maior Salário / Bolsa Auxílio</option>
              <option value="RECENTE">Mais Recentes</option>
            </select>
            <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Linha de Pills: Tipo de Contrato */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#2D1B4E]/60 text-xs">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-zinc-400 font-bold mr-1 flex items-center gap-1 text-[11px] uppercase tracking-wider">
              Contrato:
            </span>
            {[
              { id: 'TODAS', label: 'Todas' },
              { id: 'JOVEM_APRENDIZ', label: 'Jovem Aprendiz (Lei 10.097)' },
              { id: 'ESTAGIO', label: 'Estágio' },
              { id: 'PRIMEIRO_EMPREGO', label: 'Primeiro Emprego / Sem Experiência' }
            ].map((tab) => {
              const active = contractFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setContractFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-900/40 border border-purple-400/50'
                      : 'bg-[#0F0C1D] text-zinc-300 border border-[#2D1B4E] hover:border-purple-500/50 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Contador e Botão de Limpar */}
          <div className="flex items-center gap-3 text-xs text-zinc-400">
            <span>
              <strong className="text-purple-300 font-bold">{filteredAndSortedVagas.length}</strong> vagas encontradas
            </span>
            {(contractFilter !== 'TODAS' || locationFilter !== 'TODOS' || searchQuery.trim() !== '') && (
              <button
                onClick={() => {
                  setContractFilter('TODAS');
                  setLocationFilter('TODOS');
                  setSearchQuery('');
                  setSortBy('PROXIMIDADE');
                }}
                className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Limpar filtros</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* 5. SEÇÃO DE RECOMENDAÇÃO PERSONALIZADA PELA IA */}
      {/* ===================================================== */}
      <section className="bg-gradient-to-r from-[#170E2C] via-[#1A1133] to-[#140C28] border border-purple-500/40 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/20 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-600/30 border border-purple-400/50 flex items-center justify-center text-purple-300">
              <Sparkles className="w-4 h-4 text-purple-300" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span>Destaques Recomendados para Você</span>
                <span className="text-[10px] font-black bg-purple-950 text-purple-300 border border-purple-400/40 px-2 py-0.5 rounded-full uppercase">
                  IA Match SkillHub
                </span>
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Vagas mais aderentes às competências e badges conquistadas no seu perfil.
              </p>
            </div>
          </div>

          <div className="text-xs text-purple-300 font-medium">
            Baseado em <strong className="text-white">{student.badgesEarned.length} Badges</strong> validadas
          </div>
        </div>

        {/* Grade de 3 Cards de Vagas Recomendadas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedVagas.map((vaga) => {
            const distanceKm = getDistanceForVaga(vaga);
            const adherencePercent = getAdherenceForVaga(vaga);
            const origemIA = getOrigemIA(vaga);
            const cargaSemanal = getCargaSemanal(vaga);

            return (
              <div
                key={`rec-${vaga.id}`}
                className="bg-[#120B24]/90 border border-purple-500/30 hover:border-purple-400/60 rounded-2xl p-4 shadow-lg transition-all duration-200 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-1.5">
                    {renderOriginBadge(origemIA)}
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-purple-900/80 border border-purple-400/40 text-purple-200">
                      <Star className="w-2.5 h-2.5 text-purple-300 fill-purple-300" />
                      <span>{adherencePercent}% Aderência</span>
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white leading-snug line-clamp-1">
                      {vaga.titulo}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-0.5 flex items-center gap-1 line-clamp-1">
                      <span>{vaga.empresaNome}</span>
                      <span>•</span>
                      <span className="text-purple-300 font-semibold">{vaga.bairro} (A {distanceKm.toFixed(1)} km)</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-[#2D1B4E]/60">
                    <span className="font-black text-emerald-400">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(vaga.remuneracao)}
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      {vaga.tipoVaga} • {cargaSemanal}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenApply(vaga)}
                  className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-950/40 flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Candidatar-se</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===================================================== */}
      {/* 4. CARDS DE VAGAS REFORMULADOS EM GRADE (SIDE-BY-SIDE) */}
      {/* ===================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-purple-400" />
            <span>
              Todas as Oportunidades ({filteredAndSortedVagas.length})
              {locationFilter !== 'TODOS' && ` • Filtrado por ${locationFilter}`}
            </span>
          </div>

          <div className="text-xs text-zinc-400">
            Grade em 2 colunas
          </div>
        </div>

        {/* Grade Side-by-side de 2 colunas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
          {filteredAndSortedVagas.map((vaga) => {
            const distanceKm = getDistanceForVaga(vaga);
            const adherencePercent = getAdherenceForVaga(vaga);
            const origemIA = getOrigemIA(vaga);
            const cargaSemanal = getCargaSemanal(vaga);
            const isMesmoBairro = vaga.bairro.toLowerCase() === userBairro.toLowerCase();

            const userBadgeIds = student.badgesEarned.map((b) => b.badgeId);
            const matchingBadgesCount = vaga.badgesRequeridas.filter((req) =>
              userBadgeIds.some((ub) => req.includes(ub.replace('badge-', '')) || ub.includes(req.replace('badge-', '')))
            ).length;

            return (
              <article
                key={vaga.id}
                className={`bg-slate-900/90 border rounded-2xl p-5 shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between space-y-4 ${
                  isMesmoBairro
                    ? 'border-purple-500/50 shadow-purple-950/20'
                    : 'border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-950/15'
                }`}
              >
                {/* Linha Superior: Origem IA, Contrato e Compatibilidade */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2D1B4E]/60 pb-3">
                    <div className="flex items-center gap-2">
                      {/* Badge da Origem da IA */}
                      {renderOriginBadge(origemIA)}

                      {/* Badge do Tipo de Contrato */}
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#110E1B] border border-[#2D1B4E] text-zinc-300">
                        {vaga.tipoVaga}
                      </span>
                    </div>

                    {/* Badge de Compatibilidade da IA */}
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-gradient-to-r from-purple-900/80 to-violet-900/80 border border-purple-400/40 text-purple-200">
                      <Sparkles className="w-3 h-3 text-purple-300" />
                      <span>✨ {adherencePercent}% de Aderência</span>
                    </div>
                  </div>

                  {/* Título da Vaga, Empresa e Bairro com Distância */}
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight leading-snug">
                      {vaga.titulo}
                    </h3>

                    <p className="mt-1 text-xs text-zinc-300 flex items-center gap-1.5 flex-wrap">
                      <Building2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <strong className="text-white font-semibold">{vaga.empresaNome}</strong>
                      <span className="text-zinc-500">•</span>
                      <span>{vaga.bairro}, {vaga.cidade}</span>
                      <span className="text-zinc-500">•</span>
                      <span className="text-purple-300 font-bold bg-purple-950/60 px-2 py-0.5 rounded-md border border-purple-500/30">
                        A {distanceKm.toFixed(1)} km de você
                      </span>
                    </p>
                  </div>

                  {/* Descrição resumida */}
                  <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2">
                    {vaga.descricao}
                  </p>

                  {/* Salário / Bolsa Auxílio em Destaque + Tipo & Carga Horária */}
                  <div className="grid grid-cols-2 gap-3 p-3 bg-[#0B081A] border border-[#2D1B4E]/80 rounded-xl text-xs">
                    <div>
                      <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider block">
                        Salário / Bolsa Auxílio
                      </span>
                      <div className="text-base font-black text-emerald-400 mt-0.5">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(vaga.remuneracao)}
                      </div>
                    </div>

                    <div>
                      <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider block">
                        Tipo &amp; Carga Horária
                      </span>
                      <div className="text-xs font-bold text-zinc-200 mt-1 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span>{vaga.tipoVaga} • {cargaSemanal}</span>
                      </div>
                    </div>
                  </div>

                  {/* Competências / Badges */}
                  {vaga.badgesRequeridas && vaga.badgesRequeridas.length > 0 && (
                    <div className="text-xs space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-[11px] text-zinc-400">
                        <span className="flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-purple-400" />
                          Competências Requeridas:
                        </span>
                        <span className="text-purple-300 font-semibold">
                          {matchingBadgesCount}/{vaga.badgesRequeridas.length} compatíveis
                        </span>
                      </div>

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
                            <span
                              key={bId}
                              className={`text-[10px] px-2 py-0.5 rounded-md font-semibold flex items-center gap-1 ${
                                hasBadge
                                  ? 'bg-purple-950/80 border border-purple-400/50 text-purple-200'
                                  : 'bg-[#120D22] border border-[#2D1B4E] text-zinc-400'
                              }`}
                            >
                              {hasBadge ? <Check className="w-3 h-3 text-purple-400" /> : '○'}
                              <span>{label}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Rodapé do Card: Contador & Botão Quero me candidatar */}
                <div className="pt-3 border-t border-[#2D1B4E]/60 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-zinc-400">
                    {vaga.candidatosInscritos} candidaturas registradas
                  </span>

                  {vaga.jaCandidatou ? (
                    <span className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-purple-950/80 text-purple-300 border border-purple-500/40 text-xs font-bold">
                      <Check className="w-3.5 h-3.5 text-purple-400" />
                      Candidatura Enviada
                    </span>
                  ) : (
                    <button
                      onClick={() => handleOpenApply(vaga)}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-purple-700 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-bold text-xs shadow-lg shadow-purple-950/40 flex items-center gap-1.5 transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                    >
                      <span>Quero me candidatar</span>
                      <ArrowRight className="w-3.5 h-3.5 text-purple-200" />
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Estado Vazio caso nada combine com os filtros */}
        {filteredAndSortedVagas.length === 0 && (
          <div className="bg-[#160F28]/90 border border-[#2D1B4E]/80 rounded-2xl p-8 text-center space-y-3">
            <Search className="w-8 h-8 text-purple-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">Nenhuma oportunidade encontrada</h4>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Tente limpar os filtros de localização ou tipo de contrato para visualizar mais vagas em outras regiões.
            </p>
            <button
              onClick={() => {
                setContractFilter('TODAS');
                setLocationFilter('TODOS');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Restaurar todas as vagas
            </button>
          </div>
        )}
      </section>

      {/* Modal de Candidatura Rápida Integrada */}
      <JobApplicationModal
        isOpen={isModalOpen}
        vaga={modalVaga}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(protocolo) => {
          if (modalVaga) {
            modalVaga.jaCandidatou = true;
            modalVaga.candidatosInscritos += 1;
          }
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}
