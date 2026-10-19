'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { JobVacancy } from '@/types';
import {
  Search,
  MapPin,
  Building2,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Check,
  RotateCcw,
  Briefcase,
  GraduationCap,
  Eye
} from 'lucide-react';
import JobApplicationModal from '@/components/JobApplicationModal';
import JobDetailsModal from '@/components/JobDetailsModal';

export default function CuritibaProximityMap() {
  const { student, vagas, badges } = useApp();

  // Estados de Filtros e Pesquisa
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('TODOS');
  const [selectedFilter, setSelectedFilter] = useState<'TODAS' | 'JOVEM_APRENDIZ' | 'ESTAGIO' | 'PRIMEIRO_EMPREGO' | 'PERTO_CIC'>('TODAS');
  const [sortBy, setSortBy] = useState<'PROXIMIDADE' | 'SALARIO' | 'RECENTE'>('PROXIMIDADE');

  // Modal de Detalhes da Vaga
  const [detailsVaga, setDetailsVaga] = useState<JobVacancy | null>(null);

  // Modal de Candidatura
  const [modalVaga, setModalVaga] = useState<JobVacancy | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Bairro de referência do estudante (CIC)
  const userBairro = student?.endereco?.bairro || 'CIC';

  // Obter distância da vaga em relação ao usuário (CIC)
  const getDistanceForVaga = (vaga: JobVacancy): number => {
    if (typeof vaga.distanciaKm === 'number') return vaga.distanciaKm;
    const b = vaga.bairro.toLowerCase();
    if (b.includes('cic')) return 1.2;
    if (b.includes('pinheirinho')) return 4.8;
    if (b.includes('portão') || b.includes('portao')) return 6.0;
    if (b.includes('tatuquara')) return 7.5;
    if (b.includes('batel')) return 8.2;
    if (b.includes('boqueirão') || b.includes('boqueirao')) return 8.5;
    if (b.includes('centro')) return 9.1;
    if (b.includes('araucária') || b.includes('araucaria')) return 9.8;
    if (b.includes('santa felicidade')) return 12.0;
    if (b.includes('são josé') || b.includes('sao jose')) return 16.5;
    if (b.includes('pinhais')) return 18.2;
    if (b.includes('colombo')) return 22.0;
    return 10.0;
  };

  // Obter percentual de compatibilidade/aderência da IA
  const getAdherenceForVaga = (vaga: JobVacancy): number => {
    if (vaga.aderenciaPerfil) return vaga.aderenciaPerfil;
    const userBadgeIds = student.badgesEarned.map((b) => b.badgeId);
    const matched = vaga.badgesRequeridas.filter((req) =>
      userBadgeIds.some((ub) => req.includes(ub.replace('badge-', '')) || ub.includes(req.replace('badge-', '')))
    ).length;
    if (vaga.badgesRequeridas.length === 0) return 82;
    return Math.min(98, Math.max(75, Math.round(72 + (matched / vaga.badgesRequeridas.length) * 24)));
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

  // Contagens para os badges de filtro
  const activeVagas = useMemo(() => vagas.filter((v) => v.status === 'ATIVA'), [vagas]);
  const allVagasCount = activeVagas.length;
  const jovemAprendizCount = activeVagas.filter((v) => v.tipoVaga === 'Jovem Aprendiz').length;
  const estagioCount = activeVagas.filter((v) => v.tipoVaga === 'Estagiário').length;
  const primeiroEmpregoCount = activeVagas.filter((v) => v.tipoVaga === 'Primeiro Emprego' || v.tipoVaga === 'Estudante').length;
  const pertoCicCount = activeVagas.filter((v) => v.bairro.toLowerCase() === 'cic' || getDistanceForVaga(v) <= 2.5).length;

  // Filtragem e Ordenação da Grade
  const filteredVagas = useMemo(() => {
    let result = [...activeVagas];

    // Filtro por pílula selecionada
    if (selectedFilter === 'JOVEM_APRENDIZ') {
      result = result.filter((v) => v.tipoVaga === 'Jovem Aprendiz');
    } else if (selectedFilter === 'ESTAGIO') {
      result = result.filter((v) => v.tipoVaga === 'Estagiário');
    } else if (selectedFilter === 'PRIMEIRO_EMPREGO') {
      result = result.filter((v) => v.tipoVaga === 'Primeiro Emprego' || v.tipoVaga === 'Estudante');
    } else if (selectedFilter === 'PERTO_CIC') {
      result = result.filter((v) => v.bairro.toLowerCase() === 'cic' || getDistanceForVaga(v) <= 2.5);
    }

    // Filtro por Bairro/Região
    if (selectedRegion !== 'TODOS') {
      const reg = selectedRegion.toLowerCase();
      result = result.filter(
        (v) => v.bairro.toLowerCase().includes(reg) || v.cidade.toLowerCase().includes(reg)
      );
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
  }, [activeVagas, selectedFilter, selectedRegion, searchQuery, sortBy]);

  // Abrir modal de candidatura
  const handleOpenApply = (vaga: JobVacancy) => {
    setModalVaga(vaga);
    setIsModalOpen(true);
  };

  // Badge da Origem da IA
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

  // Badge do Tipo de Contrato
  const renderContractBadge = (tipo: string) => {
    if (tipo === 'Jovem Aprendiz') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
          Jovem Aprendiz
        </span>
      );
    }
    if (tipo === 'Estagiário') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-950/60 text-amber-300 border border-amber-500/30">
          Estágio
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-950/60 text-rose-300 border border-rose-500/30">
        Primeiro Emprego
      </span>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-16 space-y-8 flex flex-col items-center">
      {/* ===================================================== */}
      {/* 2. CABEÇALHO (HERO BANNER IDÊNTICO AO DE CURSOS) */}
      {/* ===================================================== */}
      <div className="w-full bg-[#110E1B] border border-purple-500/20 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden space-y-6">
        {/* Glow sutil */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10 pb-6 border-b border-[#2D1B4E]/60">
          <div className="space-y-3 max-w-2xl">
            {/* Badges no Topo */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-[#171126] border border-purple-500/30 px-3 py-1 rounded-full text-xs font-semibold text-zinc-300">
                <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                <span>Vagas Verificadas</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#171126] border border-purple-500/30 px-3 py-1 rounded-full text-xs font-semibold text-zinc-300">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>Focado em Curitiba &amp; RMC</span>
              </span>
            </div>

            {/* Título Principal */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Painel de Vagas &amp; Oportunidades com IA
            </h1>

            {/* Subtítulo */}
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Nossa inteligência artificial cruza suas competências com vagas de Jovem Aprendiz, Estágio e Primeiro Emprego agregadas do Indeed, Vagas.com, CIEE e NUBE.
            </p>
          </div>

          {/* Card Lateral Direita (Caixa de Estatística) */}
          <div className="bg-[#171126] border border-[#2D1B4E] rounded-2xl p-4 sm:p-5 text-center shrink-0 shadow-lg min-w-[190px] flex flex-col items-center justify-center">
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {allVagasCount}
            </div>
            <div className="text-xs text-zinc-400 font-medium mt-1">
              Vagas Ativas na RMC
            </div>
          </div>
        </div>

        {/* ===================================================== */}
        {/* 3. TRÊS CARDS DE DESTAQUE DE PERFIL (3 COLUNAS) */}
        {/* ===================================================== */}
        <div className="relative z-10 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Categorias de Oportunidades
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* Card 1: Jovem Aprendiz */}
            <button
              onClick={() => setSelectedFilter(selectedFilter === 'JOVEM_APRENDIZ' ? 'TODAS' : 'JOVEM_APRENDIZ')}
              className={`text-left bg-[#171126] border rounded-2xl p-4 transition-all flex flex-col justify-between space-y-2.5 cursor-pointer ${
                selectedFilter === 'JOVEM_APRENDIZ'
                  ? 'border-emerald-500/60 ring-2 ring-emerald-500/30'
                  : 'border-emerald-500/20 hover:border-emerald-500/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  🟢 Jovem Aprendiz (Lei 10.097)
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Oportunidades de 20h a 24h semanais com formação teórica inclusa.
              </p>
            </button>

            {/* Card 2: Estágio */}
            <button
              onClick={() => setSelectedFilter(selectedFilter === 'ESTAGIO' ? 'TODAS' : 'ESTAGIO')}
              className={`text-left bg-[#171126] border rounded-2xl p-4 transition-all flex flex-col justify-between space-y-2.5 cursor-pointer ${
                selectedFilter === 'ESTAGIO'
                  ? 'border-amber-500/60 ring-2 ring-amber-500/30'
                  : 'border-amber-500/20 hover:border-amber-500/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-950/60 text-amber-300 border border-amber-500/30">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  🟡 Estágio (Ensino Médio / Técnico / Superior)
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Bolsas-auxílio focadas no desenvolvimento prático de estudantes.
              </p>
            </button>

            {/* Card 3: Primeiro Emprego */}
            <button
              onClick={() => setSelectedFilter(selectedFilter === 'PRIMEIRO_EMPREGO' ? 'TODAS' : 'PRIMEIRO_EMPREGO')}
              className={`text-left bg-[#171126] border rounded-2xl p-4 transition-all flex flex-col justify-between space-y-2.5 cursor-pointer ${
                selectedFilter === 'PRIMEIRO_EMPREGO'
                  ? 'border-rose-500/60 ring-2 ring-rose-500/30'
                  : 'border-rose-500/20 hover:border-rose-500/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg bg-rose-950/60 text-rose-300 border border-rose-500/30">
                  <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                  🔴 Primeiro Emprego / Sem Experiência
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Vagas formais de entrada para quem busca a primeira oportunidade no mercado.
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* ===================================================== */}
      {/* 4. BARRA DE FILTROS E PESQUISA (PADRÃO CATÁLOGO) */}
      {/* ===================================================== */}
      <div className="w-full bg-[#140E24] border border-[#2D1B4E]/60 rounded-2xl p-4 sm:p-5 shadow-lg space-y-4">
        {/* Linha 1: Input de Busca + Dropdown de Bairro / Região */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-7 relative">
            <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar por cargo, empresa, bairro ou palavra-chave..."
              className="w-full bg-[#0D0818] border border-[#2D1B4E] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#8B5CF6]"
            />
          </div>

          <div className="md:col-span-5 flex items-center gap-2">
            <span className="text-xs font-bold text-zinc-400 shrink-0">Bairro / Região:</span>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full bg-[#0D0818] border border-[#2D1B4E] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
            >
              <option value="TODOS">Todos os Bairros (CIC, Centro, Boqueirão...)</option>
              <optgroup label="Bairros de Curitiba">
                <option value="CIC">CIC (Cidade Industrial)</option>
                <option value="Centro">Centro</option>
                <option value="Batel">Batel</option>
                <option value="Boqueirão">Boqueirão</option>
                <option value="Pinheirinho">Pinheirinho</option>
                <option value="Portão">Portão</option>
                <option value="Tatuquara">Tatuquara</option>
                <option value="Santa Felicidade">Santa Felicidade</option>
              </optgroup>
              <optgroup label="Região Metropolitana (RMC)">
                <option value="Araucária">Araucária (RMC)</option>
                <option value="São José dos Pinhais">São José dos Pinhais (RMC)</option>
                <option value="Pinhais">Pinhais (RMC)</option>
                <option value="Colombo">Colombo (RMC)</option>
              </optgroup>
            </select>
          </div>
        </div>

        {/* Linha 2: Linha de botões em pílula (Badges filtráveis) */}
        <div className="flex flex-wrap items-center justify-start sm:justify-center gap-2 pt-2 border-t border-[#2D1B4E]/40 text-xs">
          {/* Todas as Vagas */}
          <button
            onClick={() => {
              setSelectedFilter('TODAS');
              setSelectedRegion('TODOS');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              selectedFilter === 'TODAS' && selectedRegion === 'TODOS'
                ? 'bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white shadow'
                : 'bg-[#0D0818] text-zinc-400 hover:text-white border border-[#2D1B4E]'
            }`}
          >
            Todas as Vagas ({allVagasCount})
          </button>

          {/* Jovem Aprendiz */}
          <button
            onClick={() => setSelectedFilter(selectedFilter === 'JOVEM_APRENDIZ' ? 'TODAS' : 'JOVEM_APRENDIZ')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              selectedFilter === 'JOVEM_APRENDIZ'
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 shadow ring-2 ring-emerald-500/30'
                : 'bg-[#0D0818] text-zinc-400 hover:text-white border border-[#2D1B4E]'
            }`}
          >
            <span>🟢 Jovem Aprendiz ({jovemAprendizCount})</span>
          </button>

          {/* Estágio */}
          <button
            onClick={() => setSelectedFilter(selectedFilter === 'ESTAGIO' ? 'TODAS' : 'ESTAGIO')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              selectedFilter === 'ESTAGIO'
                ? 'bg-amber-950/80 text-amber-300 border border-amber-500/50 shadow ring-2 ring-amber-500/30'
                : 'bg-[#0D0818] text-zinc-400 hover:text-white border border-[#2D1B4E]'
            }`}
          >
            <span>🟡 Estágio ({estagioCount})</span>
          </button>

          {/* Primeiro Emprego */}
          <button
            onClick={() => setSelectedFilter(selectedFilter === 'PRIMEIRO_EMPREGO' ? 'TODAS' : 'PRIMEIRO_EMPREGO')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              selectedFilter === 'PRIMEIRO_EMPREGO'
                ? 'bg-rose-950/80 text-rose-300 border border-rose-500/50 shadow ring-2 ring-rose-500/30'
                : 'bg-[#0D0818] text-zinc-400 hover:text-white border border-[#2D1B4E]'
            }`}
          >
            <span>🔴 Primeiro Emprego ({primeiroEmpregoCount})</span>
          </button>

          {/* Perto do CIC */}
          <button
            onClick={() => setSelectedFilter(selectedFilter === 'PERTO_CIC' ? 'TODAS' : 'PERTO_CIC')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              selectedFilter === 'PERTO_CIC'
                ? 'bg-purple-950/80 text-purple-200 border border-purple-500/50 shadow ring-2 ring-purple-500/30'
                : 'bg-[#0D0818] text-zinc-400 hover:text-white border border-[#2D1B4E]'
            }`}
          >
            <span>📍 Perto do CIC ({pertoCicCount})</span>
          </button>
        </div>

        {/* Linha 3: Ordenação + Limpar Filtros */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-2 border-t border-[#2D1B4E]/30">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400 font-bold shrink-0">Ordenar por:</span>
            {[
              { id: 'PROXIMIDADE', label: 'Mais Próximas de Mim' },
              { id: 'SALARIO', label: 'Maior Salário / Bolsa' },
              { id: 'RECENTE', label: 'Mais Recentes' }
            ].map((sortOption) => (
              <button
                key={sortOption.id}
                onClick={() => setSortBy(sortOption.id as any)}
                className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-all text-[11px] ${
                  sortBy === sortOption.id
                    ? 'bg-purple-600/80 text-white font-bold'
                    : 'bg-[#0D0818] text-zinc-400 hover:text-white border border-[#2D1B4E]/40'
                }`}
              >
                {sortOption.label}
              </button>
            ))}
          </div>

          {(searchQuery || selectedRegion !== 'TODOS' || selectedFilter !== 'TODAS') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedRegion('TODOS');
                setSelectedFilter('TODAS');
                setSortBy('PROXIMIDADE');
              }}
              className="text-purple-400 hover:text-purple-300 font-semibold inline-flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpar filtros</span>
            </button>
          )}
        </div>
      </div>

      {/* ===================================================== */}
      {/* 5. GRADE DE CARDS DE VAGAS (GRID DE 3 COLUNAS) */}
      {/* ===================================================== */}
      <div className="w-full space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-purple-400" />
            <span>
              Oportunidades em Destaque ({filteredVagas.length})
              {selectedFilter !== 'TODAS' && ` • Filtro Ativo`}
              {selectedRegion !== 'TODOS' && ` • ${selectedRegion}`}
            </span>
          </div>

          <div className="text-xs text-zinc-400">
            Grade de 3 colunas
          </div>
        </div>

        {/* Grid de 3 Colunas Lado a Lado */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredVagas.map((vaga) => {
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
              <div
                key={vaga.id}
                className={`bg-slate-900/80 border rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-4 transition-all duration-200 hover:-translate-y-1 group relative ${
                  isMesmoBairro
                    ? 'border-purple-500/50 hover:border-[#8B5CF6]'
                    : 'border-purple-500/20 hover:border-[#8B5CF6]/70'
                }`}
              >
                <div className="space-y-3">
                  {/* Topo do Card: Badge da fonte da IA + Badge do tipo */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2D1B4E]/60 pb-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {renderOriginBadge(origemIA)}
                      {renderContractBadge(vaga.tipoVaga)}
                    </div>

                    {/* Badge de compatibilidade de IA */}
                    <span className="inline-flex items-center gap-1 text-[11px] font-black text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded-full border border-purple-500/30">
                      <Sparkles className="w-3 h-3 text-purple-400" />
                      <span>{adherencePercent}%</span>
                    </span>
                  </div>

                  {/* Título da Vaga */}
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight leading-snug group-hover:text-purple-200 transition-colors">
                      {vaga.titulo}
                    </h3>

                    {/* Empresa e Localização com ícone de pino */}
                    <p className="mt-1.5 text-xs text-zinc-300 flex items-center gap-1.5 flex-wrap">
                      <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <strong className="text-white font-semibold">{vaga.empresaNome}</strong>
                      <span className="text-zinc-500">•</span>
                      <span>{vaga.bairro}, {vaga.cidade}</span>
                      <span className="text-zinc-500">•</span>
                      <span className="text-purple-300 font-bold bg-purple-950/60 px-2 py-0.5 rounded-md border border-purple-500/30">
                        A {distanceKm.toFixed(1)} km de você
                      </span>
                    </p>
                  </div>

                  {/* Descrição curta */}
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                    {vaga.descricao}
                  </p>

                  {/* Salário / Bolsa Auxílio em Destaque Verde + Carga Horária */}
                  <div className="grid grid-cols-2 gap-2 p-3 bg-[#0D0818] border border-[#2D1B4E]/60 rounded-xl text-xs">
                    <div>
                      <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider block">
                        Bolsa / Salário
                      </span>
                      <div className="text-base sm:text-lg font-black text-emerald-400 mt-0.5">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(vaga.remuneracao)}
                      </div>
                    </div>

                    <div>
                      <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider block">
                        Carga Horária
                      </span>
                      <div className="text-xs font-bold text-zinc-200 mt-1 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span>{cargaSemanal}</span>
                      </div>
                    </div>
                  </div>

                  {/* Badge de Aderência com Destaque Completo */}
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-300 bg-purple-950/40 border border-purple-500/20 px-2.5 py-1 rounded-lg w-full">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>✨ {adherencePercent}% de Aderência ao seu Perfil</span>
                  </div>

                  {/* Badges Requeridas */}
                  {vaga.badgesRequeridas && vaga.badgesRequeridas.length > 0 && (
                    <div className="text-xs space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-[11px] text-zinc-400">
                        <span className="flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-purple-400" />
                          Competências:
                        </span>
                        <span className="text-purple-300 font-semibold text-[10px]">
                          {matchingBadgesCount}/{vaga.badgesRequeridas.length} compatíveis
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1">
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
                                  : 'bg-[#120D22] border border-[#2D1B4E] text-zinc-500'
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

                {/* Botões de Ação na parte inferior do Card */}
                <div className="pt-3 border-t border-[#2D1B4E]/60 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setDetailsVaga(vaga)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#171126] hover:bg-purple-950/70 text-zinc-300 hover:text-white border border-purple-500/20 hover:border-purple-500/40 text-xs font-semibold transition-all duration-200 cursor-pointer"
                    title="Ver detalhes completos da oportunidade"
                  >
                    <Eye className="w-3.5 h-3.5 text-purple-400" />
                    <span>Ver Detalhes</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {vaga.jaCandidatou ? (
                      <span className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-purple-950/80 text-purple-300 border border-purple-500/40 text-xs font-bold">
                        <Check className="w-3.5 h-3.5 text-purple-400" />
                        Inscrito
                      </span>
                    ) : (
                      <button
                        onClick={() => handleOpenApply(vaga)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-purple-700 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-bold text-xs shadow-lg shadow-purple-950/40 flex items-center gap-1.5 transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                      >
                        <span>Candidatar</span>
                        <ArrowRight className="w-3.5 h-3.5 text-purple-200" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Estado Vazio */}
        {filteredVagas.length === 0 && (
          <div className="w-full text-center py-12 bg-[#140E24] rounded-2xl border border-[#2D1B4E] p-6 space-y-3">
            <Search className="w-8 h-8 text-purple-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">Nenhuma oportunidade encontrada</h4>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Tente alterar a pesquisa por texto ou selecionar outra categoria de contrato para visualizar mais vagas.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedRegion('TODOS');
                setSelectedFilter('TODAS');
              }}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Restaurar todas as vagas ({allVagasCount})
            </button>
          </div>
        )}
      </div>

      {/* Modal de Detalhes Completos da Vaga */}
      <JobDetailsModal
        isOpen={Boolean(detailsVaga)}
        vaga={detailsVaga}
        distanceKm={detailsVaga ? getDistanceForVaga(detailsVaga) : 0}
        adherencePercent={detailsVaga ? getAdherenceForVaga(detailsVaga) : 0}
        onClose={() => setDetailsVaga(null)}
        onApply={(v) => {
          setDetailsVaga(null);
          handleOpenApply(v);
        }}
      />

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
