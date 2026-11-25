'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  JOB_OPPORTUNITIES,
  JobOpportunity,
  calculateDistanceKm,
  getExternalJobUrls,
  PRESET_LOCATIONS,
  toJobVacancy
} from '@/data/jobsData';
import { JobVacancy } from '@/types';
import JobApplicationModal from '@/components/JobApplicationModal';
import JobDetailsModal from '@/components/JobDetailsModal';
import {
  Search,
  MapPin,
  Building2,
  Navigation,
  Sparkles,
  ArrowRight,
  ExternalLink,
  SlidersHorizontal,
  DollarSign,
  Briefcase,
  GraduationCap,
  Layers,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Map as MapIcon,
  List as ListIcon,
  X,
  Compass,
  Info
} from 'lucide-react';

// Importação dinâmica do mapa com SSR desabilitado (essencial para o Leaflet no Next.js)
const LeafletJobsMap = dynamic(() => import('./LeafletJobsMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[480px] rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center p-6 text-center space-y-3">
      <div className="w-10 h-10 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      <div className="space-y-1">
        <p className="text-sm font-semibold text-slate-200">Carregando mapa interativo...</p>
        <p className="text-xs text-slate-400">Renderizando OpenStreetMap e pontos geolocalizados...</p>
      </div>
    </div>
  )
});

export default function JobsInteractiveView() {
  // =========================================================================
  // ESTADOS DE LOCALIZAÇÃO E GEOLOCALIZAÇÃO
  // =========================================================================
  const [centerCoords, setCenterCoords] = useState<[number, number]>([-25.4284, -49.2733]); // Curitiba Centro padrão
  const [zoomLevel, setZoomLevel] = useState<number>(13);
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null);
  const [userAddressLabel, setUserAddressLabel] = useState<string>('Curitiba (Centro) — PR');
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // =========================================================================
  // ESTADOS DE FILTROS & BUSCA
  // =========================================================================
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedModality, setSelectedModality] = useState<string>('TODAS');
  const [selectedContract, setSelectedContract] = useState<string>('TODOS');
  const [selectedArea, setSelectedArea] = useState<string>('TODAS');
  const [maxDistanceKm, setMaxDistanceKm] = useState<number>(0); // 0 = Sem limite / Todas
  const [sortBy, setSortBy] = useState<'PROXIMIDADE' | 'SALARIO' | 'RECENTE'>('PROXIMIDADE');

  // Seleção e Destaque
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  // Modais de Ação
  const [detailsJob, setDetailsJob] = useState<JobOpportunity | null>(null);
  const [applicationJob, setApplicationJob] = useState<JobVacancy | null>(null);
  const [isApplicationOpen, setIsApplicationOpen] = useState<boolean>(false);

  // Visualização Mobile: alternar entre 'LISTA' e 'MAPA'
  const [mobileTab, setMobileTab] = useState<'LISTA' | 'MAPA'>('LISTA');

  // Painel explicativo de apps externos expandido/recolhido
  const [showExternalAppsGuide, setShowExternalAppsGuide] = useState<boolean>(false);

  // Ref da lista de vagas para scroll automático ao selecionar no mapa
  const jobListRef = useRef<HTMLDivElement>(null);

  // =========================================================================
  // ATIVAÇÃO DE GEOLOCALIZAÇÃO REAL ("PERTO DE MIM")
  // =========================================================================
  const handleRequestLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Seu navegador não suporta geolocalização por GPS.');
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: [number, number] = [position.coords.latitude, position.coords.longitude];
        setUserCoords(coords);
        setCenterCoords(coords);
        setZoomLevel(13);
        setUserAddressLabel(`Sua localização (${coords[0].toFixed(3)}, ${coords[1].toFixed(3)})`);
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError('Permissão de GPS não concedida. Usando centro de referência em Curitiba.');
        } else {
          setLocationError('Não foi possível obter sua localização com precisão.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  // Selecionar cidade/bairro pré-definido
  const handleSelectPresetLocation = (preset: typeof PRESET_LOCATIONS[0]) => {
    setCenterCoords(preset.coords);
    setUserCoords(preset.coords);
    setUserAddressLabel(preset.name);
    setZoomLevel(13);
    setLocationError(null);
  };

  // =========================================================================
  // CÁLCULO DE DISTÂNCIAS REAIS EM TEMPO REAL
  // =========================================================================
  const effectiveRefCoords: [number, number] = useMemo(() => {
    return userCoords || centerCoords;
  }, [userCoords, centerCoords]);

  const distancesMap = useMemo(() => {
    const map: Record<string, number> = {};
    JOB_OPPORTUNITIES.forEach((job) => {
      map[job.id] = calculateDistanceKm(
        effectiveRefCoords[0],
        effectiveRefCoords[1],
        job.lat,
        job.lng
      );
    });
    return map;
  }, [effectiveRefCoords]);

  // =========================================================================
  // FILTRAGEM E ORDENAÇÃO INTELIGENTE
  // =========================================================================
  const filteredJobs = useMemo(() => {
    return JOB_OPPORTUNITIES.filter((job) => {
      // 1. Busca por texto
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesCompany = job.company.toLowerCase().includes(query);
        const matchesNeighborhood = job.neighborhood.toLowerCase().includes(query);
        const matchesArea = job.area.toLowerCase().includes(query);
        const matchesDesc = job.description.toLowerCase().includes(query);
        const matchesCourses = job.recommendedCourses.some(c => c.title.toLowerCase().includes(query));

        if (!matchesTitle && !matchesCompany && !matchesNeighborhood && !matchesArea && !matchesDesc && !matchesCourses) {
          return false;
        }
      }

      // 2. Filtro de Modalidade
      if (selectedModality !== 'TODAS' && job.modality !== selectedModality) {
        return false;
      }

      // 3. Filtro de Tipo de Contrato
      if (selectedContract !== 'TODOS' && job.contractType !== selectedContract) {
        return false;
      }

      // 4. Filtro de Área
      if (selectedArea !== 'TODAS' && job.area !== selectedArea) {
        return false;
      }

      // 5. Filtro de Distância Máxima
      if (maxDistanceKm > 0) {
        const dist = distancesMap[job.id] || 0;
        if (dist > maxDistanceKm) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'PROXIMIDADE') {
        const distA = distancesMap[a.id] ?? 999;
        const distB = distancesMap[b.id] ?? 999;
        return distA - distB;
      }
      if (sortBy === 'SALARIO') {
        return b.salaryNumeric - a.salaryNumeric;
      }
      return 0; // Recente (ordem padrão)
    });
  }, [searchQuery, selectedModality, selectedContract, selectedArea, maxDistanceKm, sortBy, distancesMap]);

  // Scroll automático do card na lista quando selecionado no mapa
  const handleSelectJobFromMap = (job: JobOpportunity) => {
    setSelectedJobId(job.id);
    setCenterCoords([job.lat, job.lng]);

    // No mobile, se o usuário clica no pin do mapa, pode abrir os detalhes
    const cardEl = document.getElementById(`job-card-${job.id}`);
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleSelectJobFromList = (job: JobOpportunity) => {
    setSelectedJobId(job.id);
    setCenterCoords([job.lat, job.lng]);
    setZoomLevel(14);
  };

  const handleOpenDetails = (job: JobOpportunity) => {
    setDetailsJob(job);
  };

  const handleOpenApplication = (job: JobOpportunity) => {
    setApplicationJob(toJobVacancy(job));
    setIsApplicationOpen(true);
  };

  return (
    <div className="w-full space-y-6">
      {/* =====================================================================
          CABEÇALHO DA PÁGINA COM GUIA EXPLICATIVO
      ====================================================================== */}
      <div className="w-full bg-gradient-to-r from-purple-950/60 via-slate-900/80 to-purple-950/60 border border-purple-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-900/60 text-purple-300 border border-purple-500/30">
              <Compass className="w-3.5 h-3.5 text-purple-400" />
              <span>Mapa de Empregabilidade em Tempo Real</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Mapa de Vagas e Proximidade SkillHub
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Encontre oportunidades de <strong>Jovem Aprendiz</strong>, <strong>Estágio</strong> e <strong>Júnior</strong> perto da sua casa ou faculdade. Conecte cada vaga aos cursos oficiais recomendados da plataforma para acelerar sua contratação.
            </p>
          </div>

          {/* Botão de Geolocalização Rápida & Status */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleRequestLocation}
              disabled={isLocating}
              className="px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/25 transition-all transform hover:scale-[1.02] cursor-pointer disabled:opacity-50"
            >
              <Navigation className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
              <span>{isLocating ? 'Detectando GPS...' : '📍 Usar Minha Localização Atual'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowExternalAppsGuide(!showExternalAppsGuide)}
              className="px-4 py-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <ExternalLink className="w-4 h-4 text-purple-400" />
              <span>{showExternalAppsGuide ? 'Ocultar Guia de Apps' : 'Explorar Apps Parceiros'}</span>
            </button>
          </div>
        </div>

        {/* Mensagem de Erro de GPS, se houver */}
        {locationError && (
          <div className="mt-4 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
            <span>{locationError}</span>
          </div>
        )}

        {/* Seletor Rápido de Cidade/Região Pré-definida */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-purple-400" />
            Ponto de Referência:
          </span>
          {PRESET_LOCATIONS.slice(0, 5).map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => handleSelectPresetLocation(preset)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer border ${
                userAddressLabel === preset.name
                  ? 'bg-purple-600 text-white border-purple-500 shadow-sm'
                  : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* =====================================================================
          PAINEL EXPLICATIVO: COMO APROVEITAR OS APPS PARCEIROS DE VAGAS
      ====================================================================== */}
      {showExternalAppsGuide && (
        <div className="w-full bg-slate-900/80 border border-purple-500/30 rounded-3xl p-6 backdrop-blur-md shadow-xl space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Integração Direta com Aplicativos de Vagas</span>
            </div>
            <button
              type="button"
              onClick={() => setShowExternalAppsGuide(false)}
              className="text-xs text-slate-400 hover:text-white cursor-pointer"
            >
              Fechar
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Além das vagas exclusivas cadastradas diretamente na plataforma SkillHub, você pode consultar oportunidades abertas em tempo real nos principais portais de recrutamento já pré-filtradas pelo cargo e pela sua cidade:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              {
                nome: 'LinkedIn Vagas',
                url: 'https://www.linkedin.com/jobs/search/?keywords=Jovem%20Aprendiz&location=Curitiba%2C%20PR',
                tag: 'Networking e Empresas',
                cor: 'from-blue-600 to-cyan-700'
              },
              {
                nome: 'Indeed Brasil',
                url: 'https://br.indeed.com/jobs?q=Jovem+Aprendiz&l=Curitiba%2C+PR',
                tag: 'Maior volume de vagas',
                cor: 'from-blue-700 to-indigo-800'
              },
              {
                nome: 'Gupy Portal',
                url: 'https://portal.gupy.io/job-search/term=Estagio',
                tag: 'Processos estruturados com IA',
                cor: 'from-emerald-600 to-teal-700'
              },
              {
                nome: 'InfoJobs',
                url: 'https://www.infojobs.com.br/empregos.aspx?palabra=Jovem+Aprendiz',
                tag: 'Vagas em comércio e indústria',
                cor: 'from-orange-600 to-amber-700'
              },
              {
                nome: 'Catho',
                url: 'https://www.catho.com.br/vagas/?q=Jovem+Aprendiz',
                tag: 'Grandes empregadores',
                cor: 'from-purple-600 to-pink-700'
              }
            ].map((app) => (
              <a
                key={app.nome}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/50 transition-all flex flex-col justify-between group shadow-sm hover:scale-[1.02]"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block mb-1">
                    {app.tag}
                  </span>
                  <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                    {app.nome}
                  </h4>
                </div>
                <div className="mt-3 flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                  <span>Abrir busca</span>
                  <ExternalLink className="w-3 h-3 text-purple-400" />
                </div>
              </a>
            ))}
          </div>

          {/* Dica de Ouro de Candidatura */}
          <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/20 flex items-start gap-3 text-xs text-purple-200">
            <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-semibold mb-0.5">Dica de Ouro da SkillHub:</strong>
              Conclua o curso recomendado da vaga e obtenha a Badge oficial antes de se candidatar nos portais externos. Candidatos com certificações alinhadas às palavras-chave do anúncio passam 3x mais pelas triagens de inteligência artificial (ATS) dos recrutadores!
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          BARRA DE PESQUISA E FILTROS INTELIGENTES
      ====================================================================== */}
      <div className="w-full bg-slate-900/60 border border-slate-800 rounded-3xl p-5 backdrop-blur-md shadow-lg space-y-4">
        {/* Campo de Busca por Texto */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por cargo, empresa, bairro, tecnologia ou curso recomendado..."
              className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Ordenação */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3.5 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs font-semibold text-slate-200 focus:outline-none focus:border-purple-500"
            >
              <option value="PROXIMIDADE">📍 Mais Próximas</option>
              <option value="SALARIO">💰 Maior Remuneração</option>
              <option value="RECENTE">⏱️ Mais Recentes</option>
            </select>
          </div>
        </div>

        {/* Linha de Filtros em Pílulas */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/60">
          {/* Modalidade */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Modalidade:</span>
            {['TODAS', 'Presencial', 'Híbrido', 'Remoto'].map((mod) => (
              <button
                key={mod}
                type="button"
                onClick={() => setSelectedModality(mod)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedModality === mod
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {mod}
              </button>
            ))}
          </div>

          {/* Distância Máxima */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Raio Máximo:</span>
            {[
              { label: 'Todas', value: 0 },
              { label: 'Até 5 km', value: 5 },
              { label: 'Até 10 km', value: 10 },
              { label: 'Até 25 km', value: 25 }
            ].map((dist) => (
              <button
                key={dist.label}
                type="button"
                onClick={() => setMaxDistanceKm(dist.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  maxDistanceKm === dist.value
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {dist.label}
              </button>
            ))}
          </div>

          {/* Tipo de Contrato */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Contrato:</span>
            {['TODOS', 'Jovem Aprendiz', 'Estágio', 'Júnior'].map((contract) => (
              <button
                key={contract}
                type="button"
                onClick={() => setSelectedContract(contract)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedContract === contract
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {contract}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================================
          SELETOR DE MODO MOBILE (LISTA vs MAPA)
      ====================================================================== */}
      <div className="flex lg:hidden w-full p-1 bg-slate-900 border border-slate-800 rounded-2xl">
        <button
          type="button"
          onClick={() => setMobileTab('LISTA')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
            mobileTab === 'LISTA'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ListIcon className="w-4 h-4" />
          <span>Lista de Vagas ({filteredJobs.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('MAPA')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
            mobileTab === 'MAPA'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <MapIcon className="w-4 h-4" />
          <span>Mapa Interativo</span>
        </button>
      </div>

      {/* =====================================================================
          LAYOUT SPLIT-VIEW (TELA DIVIDIDA NO DESKTOP)
      ====================================================================== */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* COLUNA ESQUERDA: LISTA INTERATIVA DE CARDS (5 colunas) */}
        <div
          ref={jobListRef}
          className={`w-full lg:col-span-5 space-y-4 max-h-[820px] overflow-y-auto pr-1 sm:pr-2 custom-scrollbar ${
            mobileTab === 'MAPA' ? 'hidden lg:block' : 'block'
          }`}
        >
          <div className="flex items-center justify-between px-1 text-xs text-slate-400 font-medium">
            <span>
              Exibindo <strong>{filteredJobs.length}</strong> vagas disponíveis
            </span>
            {selectedJobId && (
              <button
                type="button"
                onClick={() => setSelectedJobId(null)}
                className="text-purple-400 hover:underline cursor-pointer"
              >
                Limpar seleção
              </button>
            )}
          </div>

          {filteredJobs.length === 0 ? (
            <div className="p-8 text-center bg-slate-900/50 rounded-2xl border border-slate-800 space-y-3">
              <AlertCircle className="w-8 h-8 text-slate-500 mx-auto" />
              <h4 className="text-sm font-bold text-white">Nenhuma vaga encontrada com esses filtros</h4>
              <p className="text-xs text-slate-400">
                Tente expandir o raio de distância ou desativar filtros de modalidade e contrato.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedModality('TODAS');
                  setSelectedContract('TODOS');
                  setMaxDistanceKm(0);
                }}
                className="text-xs text-purple-400 font-semibold underline cursor-pointer"
              >
                Redefinir todos os filtros
              </button>
            </div>
          ) : (
            filteredJobs.map((job) => {
              const isSelected = selectedJobId === job.id;
              const distanceKm = distancesMap[job.id];
              const externalUrls = getExternalJobUrls(job.title, job.city);

              return (
                <div
                  key={job.id}
                  id={`job-card-${job.id}`}
                  onClick={() => handleSelectJobFromList(job)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-4 shadow-md ${
                    isSelected
                      ? 'bg-slate-900/95 border-purple-500 ring-2 ring-purple-500/50 shadow-purple-500/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                  }`}
                >
                  {/* Cabeçalho do Card */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white"
                          style={{
                            backgroundColor:
                              job.modality === 'Presencial'
                                ? '#059669'
                                : job.modality === 'Híbrido'
                                ? '#7C3AED'
                                : '#2563EB'
                          }}
                        >
                          {job.modality}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                          {job.contractType}
                        </span>
                      </div>

                      {/* Distância */}
                      {typeof distanceKm === 'number' && (
                        <span className="text-[11px] font-bold text-purple-300 bg-purple-950/70 border border-purple-500/30 px-2 py-0.5 rounded-full shrink-0">
                          📍 {distanceKm} km
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                      {job.title}
                    </h3>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1 font-medium text-slate-300">
                        <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        {job.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        {job.neighborhood}, {job.city}
                      </span>
                    </div>
                  </div>

                  {/* Remuneração & Carga Horária */}
                  <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Bolsa / Salário:</span>
                      <strong className="text-sm font-extrabold text-emerald-400">{job.salary}</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Carga:</span>
                      <span className="text-slate-300 font-medium text-xs">{job.workHours}</span>
                    </div>
                  </div>

                  {/* Curso Recomendado SkillHub com Link Direto */}
                  {job.recommendedCourses.length > 0 && (
                    <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-bold text-purple-300 uppercase tracking-wider">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-purple-400" />
                          Curso SkillHub Recomendado
                        </span>
                        <span className="text-purple-400">Aumente suas chances</span>
                      </div>
                      <Link
                        href={job.recommendedCourses[0].link}
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-bold text-white hover:text-purple-300 hover:underline flex items-center justify-between group"
                      >
                        <span>{job.recommendedCourses[0].title}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                      </Link>
                      <p className="text-[11px] text-slate-400 leading-tight">
                        {job.recommendedCourses[0].reason}
                      </p>
                    </div>
                  )}

                  {/* Ações do Card */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-2 border-t border-slate-800/60">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDetails(job);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors shadow-md shadow-purple-600/20 cursor-pointer"
                      >
                        Ver Detalhes e Candidatar-se
                      </button>
                    </div>

                    {/* Links rápidos para apps externos */}
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span className="text-[10px] text-slate-500">Buscar no:</span>
                      <a
                        href={externalUrls.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-blue-400 hover:underline font-semibold"
                        title="Buscar vaga equivalente no LinkedIn"
                      >
                        LinkedIn
                      </a>
                      <span>•</span>
                      <a
                        href={externalUrls.indeed}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-indigo-400 hover:underline font-semibold"
                        title="Buscar vaga equivalente no Indeed"
                      >
                        Indeed
                      </a>
                      <span>•</span>
                      <a
                        href={externalUrls.gupy}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-emerald-400 hover:underline font-semibold"
                        title="Buscar vaga equivalente na Gupy"
                      >
                        Gupy
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* COLUNA DIREITA: MAPA INTERATIVO LEAFLET (7 colunas) */}
        <div
          className={`w-full lg:col-span-7 h-[540px] sm:h-[640px] lg:h-[820px] sticky top-6 ${
            mobileTab === 'LISTA' ? 'hidden lg:block' : 'block'
          }`}
        >
          <LeafletJobsMap
            jobs={filteredJobs}
            selectedJobId={selectedJobId}
            onSelectJob={handleSelectJobFromMap}
            onOpenDetails={handleOpenDetails}
            centerCoords={centerCoords}
            zoomLevel={zoomLevel}
            userCoords={userCoords}
            userAddressLabel={userAddressLabel}
            distancesMap={distancesMap}
          />
        </div>
      </div>

      {/* =====================================================================
          MODAL DE DETALHES COMPLETOS DA VAGA
      ====================================================================== */}
      {detailsJob && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-950 border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 custom-scrollbar text-slate-100">
            {/* Fechar Modal */}
            <button
              type="button"
              onClick={() => setDetailsJob(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Cabeçalho do Detalhe */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white"
                  style={{
                    backgroundColor:
                      detailsJob.modality === 'Presencial'
                        ? '#059669'
                        : detailsJob.modality === 'Híbrido'
                        ? '#7C3AED'
                        : '#2563EB'
                  }}
                >
                  {detailsJob.modality}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  {detailsJob.contractType}
                </span>
                {typeof distancesMap[detailsJob.id] === 'number' && (
                  <span className="text-xs font-bold text-purple-300 bg-purple-950 px-3 py-1 rounded-full border border-purple-500/30">
                    📍 {distancesMap[detailsJob.id]} km do ponto de referência
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                {detailsJob.title}
              </h2>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1 font-semibold text-slate-200">
                  <Building2 className="w-4 h-4 text-purple-400" />
                  {detailsJob.company}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  {detailsJob.neighborhood}, {detailsJob.city} — {detailsJob.state}
                </span>
                <span className="text-slate-500 font-mono">
                  CNPJ: {detailsJob.companyCnpjMasked} (Verificado)
                </span>
              </div>
            </div>

            {/* Informações Rápidas de Remuneração e Horário */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div>
                <span className="text-xs text-slate-400 font-medium">Bolsa-Auxílio / Remuneração:</span>
                <p className="text-lg font-black text-emerald-400">{detailsJob.salary}</p>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium">Carga & Horário:</span>
                <p className="text-sm font-semibold text-slate-200">{detailsJob.workHours}</p>
                <p className="text-xs text-slate-400">{detailsJob.schedule}</p>
              </div>
            </div>

            {/* Descrição e Responsabilidades */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-purple-400">
                Sobre a Vaga
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {detailsJob.description}
              </p>

              <h4 className="text-xs font-bold text-slate-200 pt-2">Principais Atividades:</h4>
              <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                {detailsJob.responsibilities.map((resp, idx) => (
                  <li key={idx}>{resp}</li>
                ))}
              </ul>
            </div>

            {/* Requisitos e Benefícios */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-purple-300 uppercase">Requisitos:</h4>
                <ul className="space-y-1 text-xs text-slate-300">
                  {detailsJob.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-purple-400 mt-0.5">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-emerald-300 uppercase">Benefícios Oferecidos:</h4>
                <ul className="space-y-1 text-xs text-slate-300">
                  {detailsJob.benefits.map((ben, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{ben}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Cursos Recomendados SkillHub */}
            {detailsJob.recommendedCourses.length > 0 && (
              <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-300 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Cursos Recomendados para Esta Vaga</span>
                </div>
                <div className="space-y-2">
                  {detailsJob.recommendedCourses.map((course) => (
                    <div
                      key={course.id}
                      className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div>
                        <Link
                          href={course.link}
                          className="text-xs font-bold text-white hover:text-purple-300 hover:underline flex items-center gap-1.5"
                        >
                          <span>{course.title}</span>
                          <ExternalLink className="w-3 h-3 text-purple-400" />
                        </Link>
                        <p className="text-[11px] text-slate-400 mt-0.5">{course.reason}</p>
                      </div>
                      <Link
                        href={course.link}
                        className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shrink-0 self-start sm:self-center"
                      >
                        Acessar Curso
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Redirecionamento para Apps Externos */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-xs text-slate-400 font-medium block">
                Buscar esta vaga em outros portais parceiros:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {Object.entries(getExternalJobUrls(detailsJob.title, detailsJob.city)).map(([portal, url]) => (
                  <a
                    key={portal}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500 text-xs font-semibold text-slate-300 hover:text-white capitalize transition-colors flex items-center gap-1.5"
                  >
                    <span>{portal}</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                ))}
              </div>
            </div>

            {/* Botões de Ação Final */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDetailsJob(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs cursor-pointer"
              >
                Voltar ao Mapa
              </button>
              <button
                type="button"
                onClick={() => {
                  const jobToApply = detailsJob;
                  setDetailsJob(null);
                  handleOpenApplication(jobToApply);
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-600/30 transition-transform transform hover:scale-[1.02] cursor-pointer"
              >
                Candidatar-se Diretamente no SkillHub ➔
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL DE CANDIDATURA COMPLETO (INTEGRADO AO APP CONTEXT)
      ====================================================================== */}
      {applicationJob && (
        <JobApplicationModal
          vaga={applicationJob}
          isOpen={isApplicationOpen}
          onClose={() => {
            setIsApplicationOpen(false);
            setApplicationJob(null);
          }}
        />
      )}
    </div>
  );
}
