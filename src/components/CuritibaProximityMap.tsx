'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { BAIRROS_CURITIBA } from '@/data/mockData';
import { JobVacancy } from '@/types';
import { 
  MapPin, 
  Navigation, 
  ShieldCheck, 
  Building2, 
  Award, 
  Clock, 
  ArrowRight,
  Filter
} from 'lucide-react';

import JobApplicationModal from '@/components/JobApplicationModal';

export default function CuritibaProximityMap() {
  const { student, vagas, applyToJob, badges, candidateProfileType, setCandidateProfileType, filterVagasByProfile } = useApp();
  const [selectedBairro, setSelectedBairro] = useState<string>('TODOS');
  const [selectedVaga, setSelectedVaga] = useState<JobVacancy | null>(null);
  const [modalVaga, setModalVaga] = useState<JobVacancy | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const studentBairro = student.endereco.bairro;

  // Filtrar vagas especificamente pelo perfil do usuário logado
  const profileVagas = filterVagasByProfile(candidateProfileType);
  const filteredVagas = profileVagas.filter((vaga) => {
    if (selectedBairro === 'TODOS') return true;
    if (selectedBairro === 'MESMO_BAIRRO') return vaga.bairro.toLowerCase() === studentBairro.toLowerCase();
    return vaga.bairro.toLowerCase() === selectedBairro.toLowerCase();
  });

  const profileLabels: Record<string, { label: string; desc: string; icon: string }> = {
    'ESTAGIARIO': { label: 'Estágio', desc: 'Exibindo apenas vagas de empresas que buscam Estagiários (Lei 11.788/08)', icon: '💼' },
    'JOVEM_APRENDIZ': { label: 'Jovem Aprendiz', desc: 'Exibindo apenas vagas do Programa de Aprendizagem (Lei 10.097/00)', icon: '🛡️' },
    'PRIMEIRO_EMPREGO': { label: 'Primeiro Emprego', desc: 'Exibindo vagas de entrada e oportunidades sem experiência exigida', icon: '🚀' },
    'ESTUDANTE': { label: 'Estudante', desc: 'Exibindo vagas compatíveis com horário de estudos e flexíveis', icon: '🎒' }
  };

  const handleOpenApply = (vaga: JobVacancy) => {
    setModalVaga(vaga);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner with Purple + Yellow Gradient */}
      <div className="bg-gradient-to-r from-[#2E1065] via-[#581C87] to-[#78350F] border-2 border-yellow-400/40 rounded-3xl p-6 lg:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-yellow-300 font-black text-xs uppercase tracking-wider mb-1">
              <MapPin className="w-4 h-4 text-yellow-400" />
              <span>Módulo de Geolocalização & Proximidade de Vagas</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
              Mapa Inteligente de Oportunidades em Curitiba
            </h1>
            <p className="text-xs text-purple-100 mt-1 max-w-2xl font-medium">
              Mapeamento de vagas de Jovem Aprendiz e Estágio nos bairros da Região Metropolitana com cálculo de distância e compatibilidade de Badges.
            </p>
          </div>

          <div className="bg-slate-950/80 border-2 border-yellow-400/50 rounded-2xl p-3.5 text-xs text-yellow-200 flex items-start gap-3 max-w-md shadow-lg">
            <ShieldCheck className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">Guardrail LGPD para Menores:</strong>
              Sua localização exata e dados pessoais estão protegidos. As empresas visualizam apenas seu bairro aproximado (
              <span className="text-yellow-300 font-bold">{studentBairro}</span>).
            </div>
          </div>
        </div>
      </div>

      {/* Banner de Personalização de Perfil */}
      <div className="bg-[#1C0E33] border border-[#7C3AED]/50 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{profileLabels[candidateProfileType]?.icon || '🛡️'}</span>
          <div>
            <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <span>Perfil Ativo: {profileLabels[candidateProfileType]?.label}</span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full font-bold">Filtro Automático</span>
            </div>
            <p className="text-[11px] text-purple-200 mt-0.5">
              {profileLabels[candidateProfileType]?.desc}
            </p>
          </div>
        </div>

        {/* Chaveador Rápido de Perfil para testes */}
        <div className="flex items-center gap-1.5 bg-[#120722] p-1 rounded-xl border border-purple-900/40">
          {(['JOVEM_APRENDIZ', 'ESTAGIARIO', 'PRIMEIRO_EMPREGO', 'ESTUDANTE'] as const).map((prof) => (
            <button
              key={prof}
              onClick={() => setCandidateProfileType(prof)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                candidateProfileType === prof
                  ? 'bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white shadow'
                  : 'text-purple-300 hover:text-white'
              }`}
            >
              {profileLabels[prof].label.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Neighborhood Filters & Stats */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0F0D1E] border border-purple-900/60 p-4 rounded-3xl shadow-xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-black text-yellow-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5 text-yellow-400" />
            Filtrar Bairro:
          </span>

          <button
            onClick={() => setSelectedBairro('TODOS')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
              selectedBairro === 'TODOS'
                ? 'bg-gradient-to-r from-purple-600 to-yellow-500 text-white shadow-md'
                : 'bg-slate-900 text-purple-200 hover:text-yellow-300'
            }`}
          >
            Todas as Vagas do Perfil ({profileVagas.length})
          </button>

          <button
            onClick={() => setSelectedBairro('MESMO_BAIRRO')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
              selectedBairro === 'MESMO_BAIRRO'
                ? 'bg-yellow-400 text-slate-950 shadow-md'
                : 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/40 hover:bg-yellow-400/30'
            }`}
          >
            📍 Perto de Mim ({studentBairro})
          </button>

          {Object.keys(BAIRROS_CURITIBA).map((bairroNome) => {
            const isCurrent = selectedBairro.toLowerCase() === bairroNome.toLowerCase();
            const count = vagas.filter((v) => v.bairro.toLowerCase() === bairroNome.toLowerCase()).length;

            return (
              <button
                key={bairroNome}
                onClick={() => setSelectedBairro(bairroNome)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isCurrent
                    ? 'bg-gradient-to-r from-purple-600 to-yellow-500 text-white shadow-md'
                    : 'bg-slate-900 text-slate-300 hover:text-yellow-300'
                }`}
              >
                {bairroNome} ({count})
              </button>
            );
          })}
        </div>

        <div className="text-xs text-purple-200">
          Exibindo <strong className="text-yellow-300">{filteredVagas.length}</strong> vagas disponíveis
        </div>
      </div>

      {/* Interactive Map Canvas + Job List Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Curitiba Interactive Map Visualizer */}
        <div className="lg:col-span-6 bg-[#0F0D1E] border border-purple-900/60 rounded-3xl p-5 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-purple-900/40 pb-3">
              <div className="text-xs font-black text-yellow-300 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-yellow-400" />
                <span>Radar Geográfico de Curitiba (Coordenadas Reais)</span>
              </div>
              <span className="text-[11px] bg-yellow-400/20 text-yellow-300 border border-yellow-400/40 px-2.5 py-0.5 rounded-full font-bold">
                Centro: Curitiba, PR
              </span>
            </div>

            {/* Visual Radar Container */}
            <div className="relative w-full h-80 bg-gradient-to-b from-[#080612] via-[#120D25] to-[#1A0E2A] rounded-2xl border-2 border-yellow-400/30 overflow-hidden flex items-center justify-center p-4">
              {/* Radar Rings & Grid */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
                <div className="w-72 h-72 border border-yellow-400 rounded-full"></div>
                <div className="w-48 h-48 border border-purple-400 rounded-full"></div>
                <div className="w-24 h-24 border border-yellow-400 rounded-full"></div>
                <div className="absolute w-full h-[1px] bg-yellow-400"></div>
                <div className="absolute h-full w-[1px] bg-purple-400"></div>
              </div>

              {/* Curitiba Center Marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center pointer-events-none">
                <div className="w-3.5 h-3.5 bg-yellow-400 rounded-full ring-4 ring-yellow-400/40 mx-auto animate-ping"></div>
              </div>

              {/* Neighborhood Points */}
              {Object.entries(BAIRROS_CURITIBA).map(([key, info]) => {
                const isStudentNeighborhood = key.toLowerCase() === studentBairro.toLowerCase();
                const isSelected = selectedBairro.toLowerCase() === key.toLowerCase();
                const vacanciesInNeighborhood = vagas.filter((v) => v.bairro.toLowerCase() === key.toLowerCase());

                let top = '50%';
                let left = '50%';
                if (key === 'Centro') { top = '35%'; left = '50%'; }
                if (key === 'Batel') { top = '40%'; left = '35%'; }
                if (key === 'Portão') { top = '55%'; left = '38%'; }
                if (key === 'Boqueirão') { top = '70%'; left = '65%'; }
                if (key === 'Pinheirinho') { top = '72%'; left = '45%'; }
                if (key === 'CIC') { top = '65%'; left = '20%'; }
                if (key === 'Tatuquara') { top = '85%'; left = '30%'; }

                return (
                  <button
                    key={key}
                    onClick={() => setSelectedBairro(key)}
                    style={{ top, left }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group transition-transform duration-200 hover:scale-110 ${
                      isSelected ? 'scale-110' : ''
                    }`}
                  >
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-black shadow-lg border transition-all ${
                        isStudentNeighborhood
                          ? 'bg-yellow-400 text-slate-950 border-yellow-300 ring-2 ring-yellow-400/50'
                          : isSelected
                          ? 'bg-gradient-to-r from-purple-600 to-yellow-500 text-white border-white'
                          : vacanciesInNeighborhood.length > 0
                          ? 'bg-purple-950/90 border-yellow-400/50 text-yellow-300 hover:border-yellow-400'
                          : 'bg-slate-950/80 border-purple-900 text-purple-300'
                      }`}
                    >
                      <MapPin className={`w-3.5 h-3.5 ${isStudentNeighborhood ? 'text-slate-950' : 'text-yellow-400'}`} />
                      <span>{key}</span>
                      {vacanciesInNeighborhood.length > 0 && (
                        <span className="bg-yellow-400/30 text-yellow-200 text-[9px] px-1 rounded-full font-extrabold">
                          {vacanciesInNeighborhood.length}
                        </span>
                      )}
                    </div>

                    {isStudentNeighborhood && (
                      <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-yellow-400 text-slate-950 text-[9px] px-2 py-0.5 rounded font-black whitespace-nowrap shadow-md">
                        📍 Você está aqui
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Neighborhood Guide */}
          <div className="mt-4 p-4 bg-slate-950 border border-yellow-400/30 rounded-2xl text-xs space-y-1.5">
            <div className="font-bold text-yellow-300 flex items-center justify-between">
              <span>Bairro Selecionado: {selectedBairro === 'TODOS' ? 'Visão Geral Curitiba' : selectedBairro}</span>
              {selectedBairro !== 'TODOS' && selectedBairro !== 'MESMO_BAIRRO' && BAIRROS_CURITIBA[selectedBairro] && (
                <span className="text-yellow-400 font-black">
                  {BAIRROS_CURITIBA[selectedBairro].distKmDoBoqueirao === 0
                    ? '🎯 Mesmo Bairro (0 km)'
                    : `🚗 ~${BAIRROS_CURITIBA[selectedBairro].distKmDoBoqueirao} km do Boqueirão`}
                </span>
              )}
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {selectedBairro !== 'TODOS' && selectedBairro !== 'MESMO_BAIRRO' && BAIRROS_CURITIBA[selectedBairro]
                ? BAIRROS_CURITIBA[selectedBairro].desc
                : 'Clique em um bairro no mapa para ver vagas e calcular rotas pela Rede Integrada de Transporte (RIT Curitiba).'}
            </p>
          </div>
        </div>

        {/* Vacancies List Column */}
        <div className="lg:col-span-6 space-y-3">
          <div className="text-xs font-black text-yellow-400 uppercase tracking-wider px-1 flex items-center justify-between">
            <span>Oportunidades em Destaque</span>
            <span className="text-purple-300 text-[11px]">Ordenado por proximidade</span>
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {filteredVagas.map((vaga) => {
              const isMesmoBairro = vaga.bairro.toLowerCase() === studentBairro.toLowerCase();
              const userBadgeIds = student.badgesEarned.map((b) => b.badgeId);
              const matchingBadgesCount = vaga.badgesRequeridas.filter((req) =>
                userBadgeIds.some((ub) => req.includes(ub.replace('badge-', '')) || ub.includes(req.replace('badge-', '')))
              ).length;
              const hasAllBadges = matchingBadgesCount >= vaga.badgesRequeridas.length;

              return (
                <div
                  key={vaga.id}
                  className={`bg-[#0F0D1E] border rounded-3xl p-5 transition-all duration-200 hover:shadow-xl ${
                    isMesmoBairro
                      ? 'border-yellow-400/60 shadow-yellow-500/10'
                      : 'border-purple-900/60 hover:border-yellow-400/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-black text-yellow-300 bg-purple-950 border border-yellow-400/30 px-2.5 py-0.5 rounded-md">
                          {vaga.tipoVaga}
                        </span>
                        {isMesmoBairro && (
                          <span className="text-[10px] font-black bg-yellow-400 text-slate-950 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                            📍 Próximo a você ({vaga.bairro})
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-black text-white leading-tight">
                        {vaga.titulo}
                      </h3>
                      <div className="text-xs text-purple-200 flex items-center gap-1 mt-0.5 font-medium">
                        <Building2 className="w-3.5 h-3.5 text-yellow-400" />
                        <span>{vaga.empresaNome}</span>
                        <span>•</span>
                        <span className="text-yellow-300 font-bold">{vaga.bairro}, Curitiba</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs text-purple-300">Bolsa / Salário</div>
                      <div className="text-sm font-black text-yellow-300">
                        R$ {vaga.remuneracao.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 mb-3">
                    {vaga.descricao}
                  </p>

                  <div className="bg-slate-950 border border-purple-900/50 rounded-2xl p-3 mb-3 text-xs">
                    <div className="text-[11px] font-bold text-yellow-300 mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-yellow-400" /> Badges Requeridas pelo RH:
                      </span>
                      <span className={`text-[10px] font-bold ${hasAllBadges ? 'text-yellow-400' : 'text-purple-300'}`}>
                        {matchingBadgesCount}/{vaga.badgesRequeridas.length} Compatíveis
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {vaga.badgesRequeridas.map((bId) => {
                        const hasBadge = userBadgeIds.some((ub) => bId.includes(ub.replace('badge-', '')) || ub.includes(bId.replace('badge-', '')));
                        const badgeObj = badges.find((b) => b.id.includes(bId.replace('badge-', '')) || bId.includes(b.id.replace('badge-', '')));
                        const label = badgeObj ? badgeObj.title : bId.replace('badge-', '');

                        return (
                          <span
                            key={bId}
                            className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                              hasBadge
                                ? 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/50'
                                : 'bg-slate-900 text-slate-400 border border-slate-800'
                            }`}
                          >
                            {hasBadge ? '✓' : '○'} {label}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-purple-900/40">
                    <div className="text-[11px] text-purple-200 flex items-center gap-2">
                      <Clock className="w-3 h-3 text-yellow-400" />
                      <span>{vaga.horario}</span>
                    </div>

                    <div>
                      {vaga.jaCandidatou ? (
                        <span className="px-3.5 py-1.5 rounded-xl bg-yellow-400/20 text-yellow-300 border border-yellow-400/50 text-xs font-black">
                          ✓ Candidatura Enviada
                        </span>
                      ) : (
                        <button
                          onClick={() => handleOpenApply(vaga)}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-purple-700 to-yellow-500 hover:from-purple-500 hover:to-yellow-400 text-white text-xs font-black flex items-center gap-1.5 shadow-md shadow-yellow-500/20 transition-all"
                        >
                          <span>Quero me candidatar</span>
                          <ArrowRight className="w-3.5 h-3.5 text-yellow-300" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal de Candidatura Estilo Indeed */}
      <JobApplicationModal
        isOpen={isModalOpen}
        vaga={modalVaga}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(protocolo) => {
          if (selectedVaga && modalVaga && selectedVaga.id === modalVaga.id) {
            setSelectedVaga({
              ...selectedVaga,
              jaCandidatou: true,
              candidatosInscritos: selectedVaga.candidatosInscritos + 1
            });
          }
        }}
      />
    </div>
  );
}
