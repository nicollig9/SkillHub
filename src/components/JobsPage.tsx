'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Bookmark,
  Building2,
  Check,
  Clock3,
  MapPin,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Wallet,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { JobVacancy } from '@/types';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import JobApplicationModal from '@/components/JobApplicationModal';

const CITIES = ['Curitiba', 'Colombo', 'São José dos Pinhais', 'Pinhais', 'Araucária'];
const CONTRACTS = ['Jovem Aprendiz', 'Estagiário', 'Primeiro Emprego', 'Efetivo Júnior'];
const AREAS = ['Administração', 'Atendimento e Vendas', 'Comunicação', 'Logística', 'Tecnologia'];
const SAVED_JOBS_KEY = 'skillhub_saved_jobs';

function getArea(vacancy: JobVacancy) {
  const text = `${vacancy.titulo} ${vacancy.descricao}`.toLowerCase();
  if (/logíst|estoque|expedi|suprimento|armazém/.test(text)) return 'Logística';
  if (/tecnologia|suporte|software|dados|técnic|ti\b/.test(text)) return 'Tecnologia';
  if (/comunica|conteúdo|marketing|design/.test(text)) return 'Comunicação';
  if (/administra|escritório|recursos humanos|\brh\b/.test(text)) return 'Administração';
  return 'Atendimento e Vendas';
}

function formatSalary(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function JobsPage() {
  const router = useRouter();
  const { vagas, isAuthenticated } = useApp();
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('TODAS');
  const [contract, setContract] = useState('TODAS');
  const [area, setArea] = useState('TODAS');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [applicationVacancy, setApplicationVacancy] = useState<JobVacancy | null>(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(SAVED_JOBS_KEY) || '[]') as number[];
      setSavedIds(saved);
    } catch {
      setSavedIds([]);
    }
  }, []);

  useEffect(() => {
    setShowSaved(new URLSearchParams(window.location.search).get('salvas') === '1');
  }, []);

  const activeJobs = useMemo(() => vagas.filter((vacancy) => vacancy.status === 'ATIVA'), [vagas]);
  const filteredJobs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return activeJobs.filter((vacancy) => {
      const matchesQuery = !normalizedQuery ||
        `${vacancy.titulo} ${vacancy.empresaNome} ${vacancy.descricao} ${vacancy.bairro}`.toLowerCase().includes(normalizedQuery);
      const matchesCity = city === 'TODAS' || vacancy.cidade === city;
      const matchesContract = contract === 'TODAS' || vacancy.tipoVaga === contract;
      const matchesArea = area === 'TODAS' || getArea(vacancy) === area;
      const matchesSaved = !showSaved || savedIds.includes(vacancy.id);
      return matchesQuery && matchesCity && matchesContract && matchesArea && matchesSaved;
    });
  }, [activeJobs, area, city, contract, query, savedIds, showSaved]);

  const selectedVacancy = filteredJobs.find((vacancy) => vacancy.id === selectedId) || filteredJobs[0] || null;

  const toggleSaved = (vacancyId: number) => {
    setSavedIds((current) => {
      const next = current.includes(vacancyId)
        ? current.filter((id) => id !== vacancyId)
        : [...current, vacancyId];
      localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(next));
      return next;
    });
  };

  const startApplication = (vacancy: JobVacancy) => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    setApplicationVacancy(vacancy);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      {isAuthenticated && <Sidebar />}
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-300">SkillHub • Curitiba &amp; RMC</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{showSaved ? 'Suas vagas guardadas' : 'Vagas que combinam com você'}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">Encontre oportunidades verificadas de aprendizagem, estágio e início de carreira perto de casa.</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-violet-300/15 bg-violet-300/[0.06] text-violet-300"><ShieldCheck className="h-4 w-4" /></span>
            Empresas com CNPJ validado
          </div>
        </div>

        <section className="mb-6 rounded-xl border border-violet-200/10 bg-[#18132b] p-4 shadow-lg shadow-black/10" aria-label="Filtros de vagas">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[minmax(220px,1.5fr)_repeat(3,minmax(150px,1fr))]">
            <label className="relative block">
              <span className="sr-only">Buscar por vaga, empresa ou palavra-chave</span>
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-violet-300" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cargo, empresa ou palavra-chave" className="w-full rounded-lg border border-violet-200/10 bg-[#0f0c1b] py-3 pl-10 pr-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/15" />
            </label>
            <label>
              <span className="sr-only">Cidade</span>
              <select value={city} onChange={(event) => setCity(event.target.value)} className="w-full rounded-lg border border-violet-200/10 bg-[#0f0c1b] px-3 py-3 text-sm text-slate-200 outline-none focus:border-violet-400">
                <option value="TODAS">Todas as cidades</option>
                {CITIES.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
            <label>
              <span className="sr-only">Tipo de contrato</span>
              <select value={contract} onChange={(event) => setContract(event.target.value)} className="w-full rounded-lg border border-violet-200/10 bg-[#0f0c1b] px-3 py-3 text-sm text-slate-200 outline-none focus:border-violet-400">
                <option value="TODAS">Todos os contratos</option>
                {CONTRACTS.map((item) => <option key={item} value={item}>{item === 'Efetivo Júnior' ? 'CLT • Efetivo Júnior' : item}</option>)}
              </select>
            </label>
            <label>
              <span className="sr-only">Área de atuação</span>
              <select value={area} onChange={(event) => setArea(event.target.value)} className="w-full rounded-lg border border-violet-200/10 bg-[#0f0c1b] px-3 py-3 text-sm text-slate-200 outline-none focus:border-violet-400">
                <option value="TODAS">Todas as áreas</option>
                {AREAS.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-violet-200/10 pt-3 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5"><SlidersHorizontal className="h-3.5 w-3.5 text-violet-300" /> {filteredJobs.length} oportunidades</span>
            <button onClick={() => { setQuery(''); setCity('TODAS'); setContract('TODAS'); setArea('TODAS'); }} className="font-semibold text-violet-300 transition hover:text-violet-200">Limpar filtros</button>
          </div>
        </section>

        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.78fr)]">
          <section className="space-y-3" aria-label="Lista de vagas">
            {filteredJobs.map((vacancy) => {
              const isSaved = savedIds.includes(vacancy.id);
              const isSelected = selectedVacancy?.id === vacancy.id;
              return (
                <article key={vacancy.id} onClick={() => setSelectedId(vacancy.id)} className={`cursor-pointer rounded-xl border bg-[#18132b] p-4 transition-all sm:p-5 ${isSelected ? 'border-violet-400/70 shadow-lg shadow-violet-950/20' : 'border-violet-200/10 hover:border-violet-400/40 hover:shadow-lg hover:shadow-violet-950/15'}`}>
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-violet-300/15 bg-violet-300/[0.07] text-violet-200"><Building2 className="h-5 w-5" /></div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h2 className="text-base font-bold leading-snug text-white">{vacancy.titulo}</h2>
                          <p className="mt-1 text-sm text-slate-400">{vacancy.empresaNome}</p>
                        </div>
                        <button onClick={(event) => { event.stopPropagation(); toggleSaved(vacancy.id); }} aria-label={isSaved ? 'Remover vaga salva' : 'Salvar vaga'} aria-pressed={isSaved} className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition ${isSaved ? 'border-violet-400/40 bg-violet-500/15 text-violet-200' : 'border-violet-200/10 text-slate-400 hover:border-violet-400/50 hover:text-violet-200'}`}>
                          {isSaved ? <Check className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                        </button>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-400">
                        <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-violet-300" />{vacancy.bairro}, {vacancy.cidade}</span>
                        <span className="inline-flex items-center gap-1.5"><Wallet className="h-3.5 w-3.5 text-violet-300" />{formatSalary(vacancy.remuneracao)} / mês</span>
                        <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5 text-violet-300" />{vacancy.cargaHorariaDiaria}h por dia</span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-md border border-violet-300/15 bg-violet-300/[0.06] px-2.5 py-1 text-[11px] font-semibold text-violet-200">{vacancy.tipoVaga}</span>
                        <span className="rounded-md border border-violet-200/10 bg-[#0f0c1b] px-2.5 py-1 text-[11px] text-slate-300">{getArea(vacancy)}</span>
                        {vacancy.empresaValidadaCnpj && <span className="inline-flex items-center gap-1 rounded-md border border-emerald-400/15 bg-emerald-400/[0.06] px-2.5 py-1 text-[11px] text-emerald-300"><ShieldCheck className="h-3 w-3" /> Verificada</span>}
                      </div>
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-violet-200/10 pt-3">
                        <span className="text-xs text-slate-500">{vacancy.candidatosInscritos} candidaturas</span>
                        <button onClick={(event) => { event.stopPropagation(); startApplication(vacancy); }} disabled={vacancy.jaCandidatou} className="rounded-lg bg-violet-600 px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-violet-950/30 transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:bg-violet-900/60 disabled:text-violet-200">
                          {vacancy.jaCandidatou ? 'Já candidatado' : 'Candidatura rápida'}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
            {filteredJobs.length === 0 && (
              <div className="rounded-xl border border-violet-200/10 bg-[#18132b] px-6 py-12 text-center">
                <Search className="mx-auto h-8 w-8 text-violet-300" />
                <h2 className="mt-3 font-bold text-white">Nenhuma vaga encontrada</h2>
                <p className="mt-1 text-sm text-slate-400">Tente alterar a busca ou remover alguns filtros.</p>
              </div>
            )}
          </section>

          <aside className="rounded-xl border border-violet-200/10 bg-[#18132b] p-5 shadow-xl shadow-black/15 lg:sticky lg:top-24" aria-label="Detalhes da vaga selecionada">
            {selectedVacancy ? (
              <>
                <div className="flex items-start gap-3 border-b border-violet-200/10 pb-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-violet-300/15 bg-violet-300/[0.07] text-violet-200"><Building2 className="h-5 w-5" /></div>
                  <div>
                    <p className="text-xs font-semibold text-violet-300">{selectedVacancy.empresaNome}</p>
                    <h2 className="mt-1 text-lg font-bold leading-snug text-white">{selectedVacancy.titulo}</h2>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 py-4 text-xs">
                  <div className="rounded-lg border border-violet-200/10 bg-[#0f0c1b] p-3"><span className="text-slate-500">Localização</span><p className="mt-1 font-semibold text-slate-200">{selectedVacancy.bairro}, {selectedVacancy.cidade}</p></div>
                  <div className="rounded-lg border border-violet-200/10 bg-[#0f0c1b] p-3"><span className="text-slate-500">Remuneração</span><p className="mt-1 font-semibold text-slate-200">{formatSalary(selectedVacancy.remuneracao)}</p></div>
                  <div className="rounded-lg border border-violet-200/10 bg-[#0f0c1b] p-3"><span className="text-slate-500">Contrato</span><p className="mt-1 font-semibold text-slate-200">{selectedVacancy.tipoVaga}</p></div>
                  <div className="rounded-lg border border-violet-200/10 bg-[#0f0c1b] p-3"><span className="text-slate-500">Jornada</span><p className="mt-1 font-semibold text-slate-200">{selectedVacancy.horario}</p></div>
                </div>
                <div className="space-y-4">
                  <section><h3 className="text-xs font-bold uppercase tracking-wide text-slate-300">Sobre a oportunidade</h3><p className="mt-2 text-sm leading-6 text-slate-400">{selectedVacancy.descricao}</p></section>
                  <section><h3 className="text-xs font-bold uppercase tracking-wide text-slate-300">Benefícios</h3><div className="mt-2 flex flex-wrap gap-2">{selectedVacancy.beneficios.map((benefit) => <span key={benefit} className="rounded-md border border-violet-200/10 bg-[#0f0c1b] px-2.5 py-1.5 text-xs text-slate-300">{benefit}</span>)}</div></section>
                  <section><h3 className="text-xs font-bold uppercase tracking-wide text-slate-300">Requisitos valorizados</h3><ul className="mt-2 space-y-2">{selectedVacancy.badgesRequeridas.map((badge) => <li key={badge} className="flex items-center gap-2 text-sm text-slate-400"><Check className="h-3.5 w-3.5 text-violet-300" />{badge.replace('badge-', '').replaceAll('-', ' ')}</li>)}</ul></section>
                </div>
                <button onClick={() => startApplication(selectedVacancy)} disabled={selectedVacancy.jaCandidatou} className="mt-5 w-full rounded-lg bg-violet-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-violet-950/30 transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:bg-violet-900/60">
                  {selectedVacancy.jaCandidatou ? 'Candidatura já enviada' : 'Candidatar-se agora'}
                </button>
              </>
            ) : (
              <p className="text-sm text-slate-400">Selecione uma vaga para ver os detalhes.</p>
            )}
          </aside>
        </div>
      </main>
      <JobApplicationModal isOpen={Boolean(applicationVacancy)} vaga={applicationVacancy} onClose={() => setApplicationVacancy(null)} onSuccess={() => setApplicationVacancy(null)} />
    </div>
  );
}