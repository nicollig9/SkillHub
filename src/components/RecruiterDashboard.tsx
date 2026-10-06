'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { BAIRROS_CURITIBA } from '@/data/mockData';
import { JobVacancy } from '@/types';
import { 
  Building2, 
  PlusCircle, 
  Search, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Award, 
  MapPin, 
  UserCheck, 
  Clock, 
  DollarSign, 
  Filter, 
  ArrowRight,
  Sparkles,
  Lock,
  Mail,
  Phone
} from 'lucide-react';

export default function RecruiterDashboard() {
  const { student, vagas, badges, applications, addNewVacancy } = useApp();

  const [activeTab, setActiveTab] = useState<'CANDIDATOS' | 'CADASTRAR_VAGA' | 'CANDIDATURAS_RECEBIDAS'>('CANDIDATOS');

  // New Job Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('Parceiro Industrial Curitiba S.A.');
  const [newBairro, setNewBairro] = useState('CIC');
  const [newType, setNewType] = useState<'Jovem Aprendiz' | 'Estagiário'>('Jovem Aprendiz');
  const [newSalary, setNewSalary] = useState('1150');
  const [newHours, setNewHours] = useState('6');
  const [newDesc, setNewDesc] = useState('');
  const [selectedBadgeRequirements, setSelectedBadgeRequirements] = useState<string[]>(['badge-direitos-legislação']);
  const [formFeedback, setFormFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Search candidate filters
  const [searchBairro, setSearchBairro] = useState<string>('TODOS');
  const [searchBadge, setSearchBadge] = useState<string>('TODOS');

  const handleToggleBadgeReq = (bId: string) => {
    setSelectedBadgeRequirements((prev) =>
      prev.includes(bId) ? prev.filter((id) => id !== bId) : [...prev, bId]
    );
  };

  const handleCreateVacancy = (e: React.FormEvent) => {
    e.preventDefault();
    setFormFeedback(null);

    if (!newTitle.trim() || !newDesc.trim()) {
      setFormFeedback({ type: 'error', message: 'Por favor, preencha o título e a descrição da vaga.' });
      return;
    }

    const result = addNewVacancy({
      idEmpresa: 99,
      empresaNome: newCompany,
      empresaCnpjMasked: '21.***.***/0001-44',
      titulo: newTitle,
      tipoVaga: newType,
      descricao: newDesc,
      bairro: newBairro,
      cidade: 'Curitiba',
      remuneracao: Number(newSalary) || 1120,
      beneficios: ['Vale-Transporte', 'Seguro de Vida', 'Refeição'],
      cargaHorariaDiaria: Number(newHours) || 6,
      horario: '08:00 às 14:00 (Segunda a Sexta)',
      status: 'ATIVA',
      badgesRequeridas: selectedBadgeRequirements
    });

    if (result.success) {
      setFormFeedback({ type: 'success', message: result.message });
      setNewTitle('');
      setNewDesc('');
    } else {
      setFormFeedback({ type: 'error', message: result.message });
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/30 rounded-3xl p-6 lg:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Building2 className="w-4 h-4 text-indigo-400" />
              <span>Painel do Recrutador & Gestão de Vagas com Guardrails</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Portal do Recrutador RH — SkillHub Curitiba
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Abra vagas qualificadas exigindo Badges de competência e realize busca ativa de jovens aprendizes por proximidade de bairro.
            </p>
          </div>

          <div className="bg-indigo-900/40 border border-indigo-500/40 rounded-2xl p-3 text-xs text-indigo-200">
            <span className="font-bold text-white block">Validação CNPJ Ativa:</span>
            Empresas auditadas na Receita Federal
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('CANDIDATOS')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'CANDIDATOS'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Search className="w-4 h-4" />
          Busca Ativa de Candidatos por Bairro & Badges
        </button>

        <button
          onClick={() => setActiveTab('CADASTRAR_VAGA')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'CADASTRAR_VAGA'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          Publicar Nova Vaga (com Filtro Anti-Golpes)
        </button>

        <button
          onClick={() => setActiveTab('CANDIDATURAS_RECEBIDAS')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'CANDIDATURAS_RECEBIDAS'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          Candidaturas Recebidas ({applications.length})
        </button>
      </div>

      {/* TAB 1: CANDIDATE SEARCH */}
      {activeTab === 'CANDIDATOS' && (
        <div className="space-y-5">
          {/* Filters Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-md">
            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">Filtrar por Bairro de Curitiba:</label>
              <select
                value={searchBairro}
                onChange={(e) => setSearchBairro(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-xs text-white rounded-xl p-2.5 focus:outline-none focus:border-indigo-500"
              >
                <option value="TODOS">Todos os Bairros</option>
                {Object.keys(BAIRROS_CURITIBA).map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">Filtrar por Badge Exigida:</label>
              <select
                value={searchBadge}
                onChange={(e) => setSearchBadge(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-xs text-white rounded-xl p-2.5 focus:outline-none focus:border-indigo-500"
              >
                <option value="TODOS">Todas as Badges</option>
                {badges.map((b) => (
                  <option key={b.id} value={b.id}>{b.title}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <div className="bg-slate-950/60 border border-slate-800 p-2.5 rounded-xl text-[11px] text-slate-400 w-full flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>LGPD: Dados mascarados até o jovem autorizar o contato.</span>
              </div>
            </div>
          </div>

          {/* Candidate Card (Lucas Silva Oliveira Demo) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-indigo-300 font-extrabold text-base">
                  {student.nome.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-white">{student.nome}</h3>
                    <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Disponível para Contratação
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Bairro: <strong className="text-slate-200">{student.endereco.bairro}</strong> (Curitiba/PR)</span>
                    <span>•</span>
                    <span>{student.escolaridade} ({student.turnoEscola})</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] bg-purple-950/60 text-purple-300 border border-purple-500/40 px-2.5 py-1 rounded-full font-bold">
                  {student.badgesEarned.length} Badges Validadas
                </span>
              </div>
            </div>

            {/* Candidate Badges */}
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Badges Conquistadas no SkillHub (Nota ≥ 70%):
              </div>
              <div className="flex flex-wrap gap-2">
                {student.badgesEarned.map((b) => {
                  const badgeObj = badges.find((item) => item.id.includes(b.badgeId.replace('badge-', '')) || b.badgeId.includes(item.id.replace('badge-', '')));
                  return (
                    <div
                      key={b.badgeId}
                      className="bg-indigo-950/50 border border-indigo-500/40 rounded-xl px-3 py-1.5 text-xs text-indigo-200 flex items-center gap-2"
                    >
                      <Award className="w-3.5 h-3.5 text-indigo-400" />
                      <div>
                        <strong className="text-white">{badgeObj ? badgeObj.title : 'Direitos & Legislação'}</strong>
                        <span className="text-[10px] text-slate-400 ml-1.5 font-mono">({b.score}%)</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* LGPD Protection Notice for Recruiter */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  Dados de contato (Telefone, CPF, E-mail) estão protegidos pela <strong>LGPD para Menores</strong> até o candidato se inscrever na sua vaga.
                </span>
              </div>
              <button
                onClick={() => alert(`Convite para processo seletivo enviado para ${student.nome}!`)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shrink-0 flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" /> Enviar Convite de Entrevista
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: POST NEW VACANCY (WITH GUARDRAIL DEMO) */}
      {activeTab === 'CADASTRAR_VAGA' && (
        <form onSubmit={handleCreateVacancy} className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-indigo-400" />
              Cadastro de Vaga com Algoritmo de Varredura Anti-Fraude
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              O sistema verifica em tempo real se o texto da vaga cumpre as normas da Lei nº 10.097/00 e bloqueia cobranças indevidas de taxas.
            </p>
          </div>

          {formFeedback && (
            <div
              className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                formFeedback.type === 'success'
                  ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-200'
                  : 'bg-rose-950/60 border-rose-500/60 text-rose-200'
              }`}
            >
              <div className="font-bold text-sm mb-1 flex items-center gap-2">
                {formFeedback.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-rose-400" />}
                <span>{formFeedback.type === 'success' ? 'Vaga Aprovada pelo Guardrail' : 'Guardrail Bloqueou a Publicação'}</span>
              </div>
              <p>{formFeedback.message}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Título da Vaga *</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Ex: Jovem Aprendiz Administrativo"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Empresa Contratante</label>
              <input
                type="text"
                value={newCompany}
                onChange={(e) => setNewCompany(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Bairro da Empresa (Curitiba/RMC)</label>
              <select
                value={newBairro}
                onChange={(e) => setNewBairro(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                {Object.keys(BAIRROS_CURITIBA).map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Tipo de Contratação</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Jovem Aprendiz">Jovem Aprendiz (Lei 10.097/00)</option>
                <option value="Estagiário">Estagiário (Lei 11.788/08)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Remuneração / Bolsa (R$)</label>
              <input
                type="number"
                value={newSalary}
                onChange={(e) => setNewSalary(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Carga Horária Diária (Máx 6h para estudantes)</label>
              <input
                type="number"
                max="6"
                min="4"
                value={newHours}
                onChange={(e) => setNewHours(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Descrição das Atividades & Benefícios *
            </label>
            <textarea
              rows={3}
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Descreva as funções. Teste escrever termos restritos como 'taxa' ou 'apostila paga' para ver o Guardrail em ação."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          {/* Badges Requeridas Selection */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-2">
              Selecione as Badges Requeridas para a Vaga:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {badges.map((b) => {
                const isChecked = selectedBadgeRequirements.includes(b.id);
                return (
                  <button
                    type="button"
                    key={b.id}
                    onClick={() => handleToggleBadgeReq(b.id)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                      isChecked
                        ? 'bg-indigo-950/60 border-indigo-500 text-white font-semibold'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span>{b.title}</span>
                    <span className="text-xs">{isChecked ? '✓' : '+'}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              Validar e Publicar Vaga
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: APPLICATIONS RECEIVED */}
      {activeTab === 'CANDIDATURAS_RECEBIDAS' && (
        <div className="space-y-4">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Candidaturas Registradas no Sistema
          </div>

          {applications.map((app) => (
            <div key={app.id} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] bg-purple-950/70 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded font-bold">
                    Protocolo #{app.id}
                  </span>
                  <span className="text-xs text-slate-400">{app.dataCandidatura}</span>
                </div>
                <h3 className="text-sm font-extrabold text-white">{app.vagaTitulo}</h3>
                <div className="text-xs text-slate-400 mt-0.5">
                  Candidato: <strong className="text-slate-200">{app.alunoNome}</strong> • Bairro: <strong className="text-emerald-300">{app.alunoBairro}</strong>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right text-xs">
                  <span className="text-slate-400 block text-[10px]">Badges Compatíveis</span>
                  <strong className="text-emerald-400">{app.badgesCompatíveis} de {app.totalBadgesRequeridas}</strong>
                </div>
                <span className="px-3 py-1.5 rounded-xl bg-indigo-950/60 text-indigo-300 border border-indigo-500/40 text-xs font-bold">
                  {app.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
