'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { CandidateProfileType } from '@/types';
import { 
  GraduationCap, 
  Building2, 
  Briefcase, 
  Sparkles, 
  ArrowRight, 
  Lock, 
  Mail, 
  User, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Award, 
  BookOpen, 
  Sun, 
  Moon,
  Info,
  X,
  Scale,
  Calendar
} from 'lucide-react';
import { BAIRROS_CURITIBA } from '@/data/mockData';

export default function LoginPage() {
  const { 
    loginUser, 
    registerCandidate, 
    registerCompany, 
    showToast, 
    getKnownAccounts,
    theme,
    toggleTheme
  } = useApp();

  // Estados principais de navegação do portal
  const [activeTab, setActiveTab] = useState<'CANDIDATO' | 'EMPRESA'>('CANDIDATO');
  const [authMode, setAuthMode] = useState<'LOGIN' | 'CADASTRO' | 'DEMO'>('LOGIN');
  const [selectedProfile, setSelectedProfile] = useState<CandidateProfileType>('JOVEM_APRENDIZ');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [showForgotModal, setShowForgotModal] = useState<boolean>(false);
  const [forgotEmail, setForgotEmail] = useState<string>('');
  const [forgotSent, setForgotSent] = useState<boolean>(false);

  // Contas salvas no dispositivo
  const [savedAccounts, setSavedAccounts] = useState<{ email: string; nome: string; username?: string; profileType: CandidateProfileType; date: string }[]>([]);

  React.useEffect(() => {
    setSavedAccounts(getKnownAccounts());
  }, [authMode]);

  // Form Candidato
  const [candUsuario, setCandUsuario] = useState('');
  const [candEmail, setCandEmail] = useState('');
  const [candSenha, setCandSenha] = useState('');
  const [candConfirmSenha, setCandConfirmSenha] = useState('');
  const [candNome, setCandNome] = useState('');
  const [candBairro, setCandBairro] = useState('Boqueirão');
  const [termoAceito, setTermoAceito] = useState(false);

  // Form Empresa
  const [empStep, setEmpStep] = useState<number>(1);
  const [empEmail, setEmpEmail] = useState('');
  const [empSenha, setEmpSenha] = useState('');
  const [empRazao, setEmpRazao] = useState('');
  const [empFantasia, setEmpFantasia] = useState('');
  const [empCnpj, setEmpCnpj] = useState('');
  const [empCnae, setEmpCnae] = useState('');
  const [empBairro, setEmpBairro] = useState('CIC');
  const [empResponsavel, setEmpResponsavel] = useState('');
  const [empCargo, setEmpCargo] = useState('Recursos Humanos');
  const [empTelefone, setEmpTelefone] = useState('');

  // Declarações Legais da Empresa
  const [decCotaAprendiz, setDecCotaAprendiz] = useState<boolean>(true);
  const [decNaoCobranca, setDecNaoCobranca] = useState<boolean>(true);
  const [decTermoEstagio, setDecTermoEstagio] = useState<boolean>(true);
  const [decLgpdMenores, setDecLgpdMenores] = useState<boolean>(true);

  // Submissão do Candidato
  const handleCandidateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'LOGIN') {
      if (!candEmail.trim()) {
        showToast('E-mail Obrigatório', 'Por favor preencha seu e-mail ou nome de usuário.', 'warning');
        return;
      }
      loginUser(candEmail.trim(), 'ALUNO', selectedProfile, candNome || candEmail.split('@')[0]);
    } else {
      if (!candNome.trim() || !candEmail.trim() || !candSenha) {
        showToast('Campos Obrigatórios', 'Por favor preencha todos os campos do cadastro.', 'warning');
        return;
      }
      if (candSenha !== candConfirmSenha) {
        showToast('Senhas Não Conferem', 'A confirmação de senha deve ser idêntica à senha informada.', 'error');
        return;
      }
      if (!termoAceito) {
        showToast('Termos Obrigatórios', 'É necessário aceitar os Termos de Uso e Política de Privacidade.', 'warning');
        return;
      }

      registerCandidate({
        nome: candNome.trim(),
        username: (candUsuario.trim() || candEmail.split('@')[0]).toLowerCase(),
        email: candEmail.trim(),
        profileType: selectedProfile,
        bairro: candBairro,
        cpf: '000.000.000-00',
        dataNascimento: '2008-01-01',
        idade: 18,
        matriculaEscolar: {
          instituicao: 'Colégio Estadual de Curitiba',
          cursoOuSerie: selectedProfile === 'ESTAGIARIO' ? 'Técnico / Superior' : 'Ensino Médio',
          turno: 'Manhã',
          comprovanteValido: true
        }
      });
    }
  };

  // Submissão da Empresa
  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'LOGIN') {
      if (!empEmail.trim()) {
        showToast('E-mail Corporativo Obrigatório', 'Por favor preencha seu e-mail de RH.', 'warning');
        return;
      }
      loginUser(empEmail.trim(), 'RECRUTADOR', 'JOVEM_APRENDIZ', empResponsavel || 'Gestor RH');
    } else {
      if (!decCotaAprendiz || !decNaoCobranca || !decTermoEstagio || !decLgpdMenores) {
        showToast('Compliance Obrigatório', 'A empresa deve aceitar todos os termos legais para cadastrar vagas.', 'warning');
        return;
      }

      registerCompany({
        razaoSocial: empRazao.trim() || 'Empresa Parceira S/A',
        nomeFantasia: empFantasia.trim() || empRazao.trim() || 'Empresa Parceira Curitiba',
        cnpj: empCnpj.trim() || '00.000.000/0001-00',
        cnae: empCnae.trim() || '62.01-5-01',
        bairro: empBairro,
        ramo: 'Tecnologia / Serviços',
        responsavel: `${empResponsavel.trim() || 'Recrutador'} (${empCargo})`,
        email: empEmail.trim(),
        telefone: empTelefone.trim() || '(41) 3000-0000',
        cotaAprendizagemCumprida: decCotaAprendiz,
        termoNaoCobrancaAceito: decNaoCobranca
      });
    }
  };

  // Modo Demonstração Controlado
  const quickDemoLogin = (profile: CandidateProfileType, label: string) => {
    setSelectedProfile(profile);
    loginUser('demo@skillhub.com.br', 'ALUNO', profile, `Visitante (${label})`, true);
  };

  const loginCompanyDemo = () => {
    loginUser('rh.demo@empresa.com.br', 'RECRUTADOR', 'JOVEM_APRENDIZ', 'Renault Curitiba RH', true);
  };

  // Envio de recuperação de senha
  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;
    setForgotSent(true);
    setTimeout(() => {
      setForgotSent(false);
      setShowForgotModal(false);
      setForgotEmail('');
      showToast('Link Enviado', 'As instruções de recuperação foram enviadas ao seu e-mail.', 'success');
    }, 2500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto my-2 sm:my-6 rounded-3xl overflow-hidden border border-slate-200 dark:border-purple-500/20 shadow-2xl bg-white dark:bg-slate-900 grid grid-cols-1 lg:grid-cols-12 min-h-[720px] transition-colors duration-300">
      
      {/* ========================================================================= */}
      {/* LADO ESQUERDO — BRANDING & DESTAQUES DO SKILLHUB (50% / 6 COLUNAS)        */}
      {/* ========================================================================= */}
      <div className="lg:col-span-6 bg-gradient-to-br from-purple-950 via-slate-900 to-purple-900 text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
        
        {/* Glows Decorativos de Fundo */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* TOPO: LOGO OFICIAL & BADGE REGIONAL */}
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3.5">
              <div className="shrink-0 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="SkillHub"
                  className="w-16 h-16 object-contain filter drop-shadow-lg"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              <div>
                <span className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none block">
                  Skill<span className="text-amber-400">Hub</span>
                </span>
                <span className="text-xs text-purple-200 font-medium tracking-wide mt-1 block">
                  Empregabilidade Jovem
                </span>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 bg-purple-900/80 text-purple-200 border border-purple-400/30 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
              📍 Focado em Curitiba e Região Metropolitana
            </span>
          </div>
        </div>

        {/* CONTEÚDO CENTRAL: PROPOSTA DE VALOR & CARDS DE IMPACTO */}
        <div className="relative z-10 my-8 sm:my-10 space-y-6">
          <div className="space-y-3 max-w-lg">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white">
              Sua jornada rumo ao primeiro emprego começa aqui.
            </h1>
            <p className="text-sm sm:text-base text-purple-200/90 leading-relaxed font-medium">
              Capacitação prática com selos de especialização e conexão direta com vagas de Estágio e Jovem Aprendiz na RMC.
            </p>
          </div>

          {/* CARDS DE IMPACTO */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            
            {/* Card 1 */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 space-y-1.5 hover:bg-white/10 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-amber-300">
                <Award className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-white">8 Trilhas de Aprendizagem</h3>
              <p className="text-[11px] text-purple-200/80 leading-snug">
                Com badges oficiais reconhecidos pelo mercado.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 space-y-1.5 hover:bg-white/10 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-amber-300">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-white">27 Cursos Práticos</h3>
              <p className="text-[11px] text-purple-200/80 leading-snug">
                Do nível Iniciante ao Avançado com IA e planilhas.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 space-y-1.5 hover:bg-white/10 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-amber-300">
                <Building2 className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-white">Conexão Direta</h3>
              <p className="text-[11px] text-purple-200/80 leading-snug">
                Empresas parceiras de Curitiba e RMC por ônibus.
              </p>
            </div>

          </div>
        </div>

        {/* RODAPÉ DA MARCA: CREDIBILIDADE */}
        <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-purple-300 font-medium">
          <span>✨ Mais de 1.200 jovens capacitados para o mercado de trabalho local.</span>
          <span className="text-[11px] text-purple-400">Lei 10.097/00 • Lei 11.788/08</span>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* LADO DIREITO — FORMULÁRIO COMPLETO DE AUTH (50% / 6 COLUNAS)              */}
      {/* ========================================================================= */}
      <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 sm:p-10 lg:p-12 flex flex-col justify-between relative transition-colors duration-300">
        
        {/* TOPO: SELETOR DE PERFIL & ALTERNADOR DE TEMA */}
        <div className="flex items-center justify-between gap-3 mb-6">
          
          {/* Abas de Perfil: Jovem vs Empresa */}
          <div className="grid grid-cols-2 gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-2xl border border-slate-200 dark:border-purple-500/20 max-w-xs w-full">
            <button
              type="button"
              onClick={() => {
                setActiveTab('CANDIDATO');
                if (authMode === 'DEMO') setAuthMode('LOGIN');
              }}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'CANDIDATO'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Sou Jovem</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('EMPRESA');
                if (authMode === 'DEMO') setAuthMode('LOGIN');
              }}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'EMPRESA'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Sou Empresa</span>
            </button>
          </div>

          {/* Botão de Tema Claro/Escuro */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Alternar Tema Claro/Escuro"
            className="p-2 rounded-xl border border-slate-200 dark:border-purple-500/30 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-purple-300 transition-colors cursor-pointer"
            title={theme === 'dark' ? 'Mudar para Tema Claro' : 'Mudar para Tema Escuro'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-purple-600" />}
          </button>
        </div>

        {/* ÁREA CENTRAL: ALTERNÂNCIA DE ABAS DE FORMULÁRIO */}
        <div className="space-y-6">
          
          {/* Abas: Entrar vs Criar Conta vs Modo Demonstração */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <button
              type="button"
              onClick={() => setAuthMode('LOGIN')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                authMode === 'LOGIN'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Entrar na Conta
            </button>

            <button
              type="button"
              onClick={() => setAuthMode('CADASTRO')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                authMode === 'CADASTRO'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Criar Nova Conta Gratuita
            </button>

            <button
              type="button"
              onClick={() => setAuthMode('DEMO')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                authMode === 'DEMO'
                  ? 'bg-amber-600 text-white shadow-sm font-extrabold'
                  : 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/30 hover:bg-amber-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-300" />
              <span>Modo Demonstração</span>
            </button>
          </div>

          {/* ========================================================================= */}
          {/* 1. MODO DEMONSTRAÇÃO (TOUR RÁPIDO CONTROLADO)                             */}
          {/* ========================================================================= */}
          {authMode === 'DEMO' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-300">
                  <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Acesso Controlado de Demonstração (Sem Senha)</span>
                </div>
                <p className="text-xs text-amber-800 dark:text-zinc-300 leading-relaxed">
                  Explore todos os recursos práticos do SkillHub (Trilhas, Cursos, Mapa de Curitiba e Holerite) instantaneamente com dados simulados.
                </p>
              </div>

              <div className="space-y-2.5">
                <span className="text-xs font-bold text-slate-800 dark:text-zinc-200 block">
                  Escolha um perfil para iniciar o Tour guiado:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => quickDemoLogin('JOVEM_APRENDIZ', 'Jovem Aprendiz')}
                    className="p-3 rounded-xl border border-slate-200 dark:border-purple-500/30 hover:border-purple-600 bg-slate-50 dark:bg-slate-800/60 hover:bg-purple-50 dark:hover:bg-purple-950/40 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-purple-600">Jovem Aprendiz</span>
                      <span className="text-[10px] bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded font-semibold">Lei 10.097</span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-zinc-400 mt-1">
                      14 a 24 anos. Formação teórica e jornada protegida.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => quickDemoLogin('ESTAGIARIO', 'Estagiário')}
                    className="p-3 rounded-xl border border-slate-200 dark:border-purple-500/30 hover:border-emerald-600 bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600">Estagiário</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-semibold">Lei 11.788</span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-zinc-400 mt-1">
                      Ensino Médio, Técnico ou Superior com bolsa-auxílio.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => quickDemoLogin('PRIMEIRO_EMPREGO', '1º Emprego')}
                    className="p-3 rounded-xl border border-slate-200 dark:border-purple-500/30 hover:border-purple-600 bg-slate-50 dark:bg-slate-800/60 hover:bg-purple-50 dark:hover:bg-purple-950/40 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-purple-600">Primeiro Emprego</span>
                      <span className="text-[10px] bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded font-semibold">Entrada</span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-zinc-400 mt-1">
                      Para quem não tem experiência e quer começar agora.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={loginCompanyDemo}
                    className="p-3 rounded-xl border border-amber-200 dark:border-amber-500/30 hover:border-amber-600 bg-amber-50/50 dark:bg-amber-950/20 hover:bg-amber-100 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600">Empresa / RH</span>
                      <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded font-semibold">Renault</span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-zinc-400 mt-1">
                      Painel de publicação e gestão de candidatos.
                    </p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 2. FORMULÁRIO DE LOGIN (CANDIDATO OU EMPRESA)                            */}
          {/* ========================================================================= */}
          {authMode === 'LOGIN' && (
            <div className="space-y-4 animate-fadeIn">
              
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {activeTab === 'CANDIDATO' ? 'Acesse sua Conta de Estudante' : 'Acesse o Painel Corporativo'}
                </h2>
                <p className="text-xs text-slate-600 dark:text-zinc-400 mt-0.5">
                  Informe seus dados para continuar seus cursos e candidaturas.
                </p>
              </div>

              {/* Atalho para Contas Salvas */}
              {activeTab === 'CANDIDATO' && savedAccounts.length > 0 && (
                <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/30 space-y-1.5">
                  <span className="text-[11px] font-bold text-purple-900 dark:text-purple-300 block">
                    ⚡ Contas salvas neste navegador:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {savedAccounts.slice(0, 3).map((acc) => (
                      <button
                        key={acc.email}
                        type="button"
                        onClick={() => {
                          setCandEmail(acc.email);
                          setCandSenha('••••••••');
                          setSelectedProfile(acc.profileType);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-500/40 text-[11px] font-semibold text-purple-900 dark:text-purple-200 hover:border-purple-500 cursor-pointer"
                      >
                        {acc.nome} ({acc.email.split('@')[0]})
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* FORMULÁRIO */}
              <form onSubmit={activeTab === 'CANDIDATO' ? handleCandidateSubmit : handleCompanySubmit} className="space-y-3.5">
                
                {/* Campo E-mail / Usuário */}
                <div className="space-y-1">
                  <label htmlFor="auth-email" className="text-xs font-bold text-slate-800 dark:text-zinc-200 block">
                    {activeTab === 'CANDIDATO' ? 'E-mail ou Nome de Usuário:' : 'E-mail Corporativo do RH:'}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 dark:text-zinc-500 absolute left-3.5 top-3" />
                    <input
                      id="auth-email"
                      type="text"
                      required
                      value={activeTab === 'CANDIDATO' ? candEmail : empEmail}
                      onChange={(e) => activeTab === 'CANDIDATO' ? setCandEmail(e.target.value) : setEmpEmail(e.target.value)}
                      placeholder={activeTab === 'CANDIDATO' ? 'seuemail@exemplo.com ou @usuario' : 'rh@suaempresa.com.br'}
                      className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-purple-500/30 rounded-xl pl-10 pr-3 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-purple-600 transition-colors"
                    />
                  </div>
                </div>

                {/* Campo Senha */}
                <div className="space-y-1">
                  <label htmlFor="auth-senha" className="text-xs font-bold text-slate-800 dark:text-zinc-200 block">
                    Senha:
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 dark:text-zinc-500 absolute left-3.5 top-3" />
                    <input
                      id="auth-senha"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={activeTab === 'CANDIDATO' ? candSenha : empSenha}
                      onChange={(e) => activeTab === 'CANDIDATO' ? setCandSenha(e.target.value) : setEmpSenha(e.target.value)}
                      placeholder="Sua senha de acesso"
                      className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-purple-500/30 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-purple-600 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Linha Lembrar Dados & Esqueceu Senha */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 text-slate-700 dark:text-zinc-400 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
                    />
                    <span>Lembrar dos meus dados</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-purple-600 dark:text-purple-400 hover:underline font-semibold cursor-pointer"
                  >
                    Esqueceu a senha?
                  </button>
                </div>

                {/* Botão de Envio */}
                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-purple-900/20 transition-all text-sm flex items-center justify-center gap-2 mt-4 cursor-pointer"
                >
                  <span>{activeTab === 'CANDIDATO' ? 'Entrar no SkillHub' : 'Acessar Painel da Empresa'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 3. FORMULÁRIO DE CADASTRO (CRIAR NOVA CONTA GRATUITA)                    */}
          {/* ========================================================================= */}
          {authMode === 'CADASTRO' && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {activeTab === 'CANDIDATO' ? 'Criar Nova Conta Gratuita' : 'Credenciamento de Empresa'}
                </h2>
                <p className="text-xs text-slate-600 dark:text-zinc-400 mt-0.5">
                  {activeTab === 'CANDIDATO' 
                    ? 'Leva menos de 1 minuto para começar a se capacitar e buscar vagas.' 
                    : 'Cadastre sua empresa para anunciar vagas e contratar talentos locais.'}
                </p>
              </div>

              {activeTab === 'CANDIDATO' ? (
                /* CADASTRO DE JOVEM / ESTUDANTE */
                <form onSubmit={handleCandidateSubmit} className="space-y-3">
                  
                  {/* Seletor de Modalidade Desejada */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 dark:text-zinc-200 block">
                      Qual é o seu objetivo no SkillHub?
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedProfile('JOVEM_APRENDIZ')}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedProfile === 'JOVEM_APRENDIZ'
                            ? 'bg-purple-600 border-purple-600 text-white font-bold shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-purple-500/30 text-slate-700 dark:text-zinc-300'
                        }`}
                      >
                        <span className="text-xs block">🛡️ Aprendiz</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedProfile('ESTAGIARIO')}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedProfile === 'ESTAGIARIO'
                            ? 'bg-purple-600 border-purple-600 text-white font-bold shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-purple-500/30 text-slate-700 dark:text-zinc-300'
                        }`}
                      >
                        <span className="text-xs block">💼 Estágio</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedProfile('PRIMEIRO_EMPREGO')}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedProfile === 'PRIMEIRO_EMPREGO'
                            ? 'bg-purple-600 border-purple-600 text-white font-bold shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-purple-500/30 text-slate-700 dark:text-zinc-300'
                        }`}
                      >
                        <span className="text-xs block">🚀 1º Emprego</span>
                      </button>
                    </div>
                  </div>

                  {/* Nome Completo */}
                  <div className="space-y-1">
                    <label htmlFor="cad-nome" className="text-xs font-bold text-slate-800 dark:text-zinc-200 block">
                      Nome Completo:
                    </label>
                    <input
                      id="cad-nome"
                      type="text"
                      required
                      value={candNome}
                      onChange={(e) => setCandNome(e.target.value)}
                      placeholder="Ex: Ana Clara Silva"
                      className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-purple-500/30 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-600"
                    />
                  </div>

                  {/* E-mail e Bairro */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="cad-email" className="text-xs font-bold text-slate-800 dark:text-zinc-200 block">
                        E-mail:
                      </label>
                      <input
                        id="cad-email"
                        type="email"
                        required
                        value={candEmail}
                        onChange={(e) => setCandEmail(e.target.value)}
                        placeholder="seuemail@exemplo.com"
                        className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-purple-500/30 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="cad-bairro" className="text-xs font-bold text-slate-800 dark:text-zinc-200 block">
                        Bairro em Curitiba / RMC:
                      </label>
                      <select
                        id="cad-bairro"
                        value={candBairro}
                        onChange={(e) => setCandBairro(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-purple-500/30 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-600"
                      >
                        {Object.keys(BAIRROS_CURITIBA).map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Senha e Confirmação */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="cad-senha" className="text-xs font-bold text-slate-800 dark:text-zinc-200 block">
                        Senha:
                      </label>
                      <input
                        id="cad-senha"
                        type="password"
                        required
                        value={candSenha}
                        onChange={(e) => setCandSenha(e.target.value)}
                        placeholder="Mínimo 6 caracteres"
                        className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-purple-500/30 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="cad-confirm" className="text-xs font-bold text-slate-800 dark:text-zinc-200 block">
                        Confirmar Senha:
                      </label>
                      <input
                        id="cad-confirm"
                        type="password"
                        required
                        value={candConfirmSenha}
                        onChange={(e) => setCandConfirmSenha(e.target.value)}
                        placeholder="Repita a senha"
                        className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-purple-500/30 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-600"
                      />
                    </div>
                  </div>

                  {/* Checkbox Termos de Uso */}
                  <div className="pt-1">
                    <label className="flex items-start gap-2 text-xs text-slate-700 dark:text-zinc-300 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={termoAceito}
                        onChange={(e) => setTermoAceito(e.target.checked)}
                        className="w-4 h-4 accent-purple-600 rounded mt-0.5 cursor-pointer"
                      />
                      <span>
                        Aceito os <strong className="text-purple-600 dark:text-purple-400">Termos de Uso</strong> e a <strong className="text-purple-600 dark:text-purple-400">Política de Privacidade</strong> do SkillHub em conformidade com a LGPD.
                      </span>
                    </label>
                  </div>

                  {/* Botão de Envio Cadastro */}
                  <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-purple-900/20 transition-all text-sm flex items-center justify-center gap-2 mt-2 cursor-pointer"
                  >
                    <span>Finalizar Cadastro Gratuito</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                /* CADASTRO DE EMPRESA / RECRUTADOR */
                <form onSubmit={handleCompanySubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-800 dark:text-zinc-200 block">CNPJ:</label>
                      <input
                        type="text"
                        required
                        value={empCnpj}
                        onChange={(e) => setEmpCnpj(e.target.value)}
                        placeholder="00.000.000/0001-00"
                        className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-purple-500/30 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-800 dark:text-zinc-200 block">Razão Social:</label>
                      <input
                        type="text"
                        required
                        value={empRazao}
                        onChange={(e) => setEmpRazao(e.target.value)}
                        placeholder="Razão Social Registrada"
                        className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-purple-500/30 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-800 dark:text-zinc-200 block">Gestor de RH Responsável:</label>
                      <input
                        type="text"
                        required
                        value={empResponsavel}
                        onChange={(e) => setEmpResponsavel(e.target.value)}
                        placeholder="Nome do Recrutador"
                        className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-purple-500/30 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-800 dark:text-zinc-200 block">E-mail Corporativo (@empresa.com.br):</label>
                      <input
                        type="email"
                        required
                        value={empEmail}
                        onChange={(e) => setEmpEmail(e.target.value)}
                        placeholder="rh@empresa.com.br"
                        className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-purple-500/30 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Declarações de Compliance */}
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/30 space-y-1.5 text-[11px] text-amber-900 dark:text-amber-200">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={decCotaAprendiz}
                        onChange={(e) => setDecCotaAprendiz(e.target.checked)}
                        className="w-4 h-4 accent-amber-500 rounded mt-0.5"
                      />
                      <span>Garantia de cumprimento da <strong>Cota de Aprendizagem (Lei 10.097/00)</strong> e Estágio (Lei 11.788/08).</span>
                    </label>

                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={decNaoCobranca}
                        onChange={(e) => setDecNaoCobranca(e.target.checked)}
                        className="w-4 h-4 accent-amber-500 rounded mt-0.5"
                      />
                      <span>Declaro que <strong>nenhuma taxa</strong> será cobrada dos jovens candidatos.</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Homologar Cadastro da Empresa</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          )}

        </div>

        {/* RODAPÉ DO FORMULÁRIO: ALTERNÂNCIA RÁPIDA ENTRE LOGIN E CADASTRO */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-zinc-400">
          <span>
            {authMode === 'LOGIN' ? 'Não tem uma conta ainda?' : 'Já possui uma conta ativa?'}
          </span>
          <button
            type="button"
            onClick={() => setAuthMode(authMode === 'LOGIN' ? 'CADASTRO' : 'LOGIN')}
            className="text-purple-600 dark:text-purple-400 font-bold hover:underline cursor-pointer"
          >
            {authMode === 'LOGIN' ? 'Criar conta gratuita' : 'Entrar na minha conta'}
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* MODAL DE RECUPERAÇÃO DE SENHA (ESQUECEU A SENHA)                         */}
      {/* ========================================================================= */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-purple-500/30 rounded-2xl p-6 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-300 flex items-center justify-center font-bold">
                  <Lock className="w-4 h-4" />
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Recuperação de Senha
                </h3>
              </div>
              <button
                onClick={() => setShowForgotModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
              Informe seu e-mail cadastrado. Enviaremos um link de acesso imediato para redefinir sua senha com segurança.
            </p>

            <form onSubmit={handleForgotSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 dark:text-zinc-200">Seu E-mail Cadastrado:</label>
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="seuemail@exemplo.com"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-purple-500/30 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-600"
                />
              </div>

              {forgotSent ? (
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Link enviado! Verifique sua caixa de entrada.</span>
                </div>
              ) : (
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-sm cursor-pointer"
                  >
                    Enviar Link de Recuperação
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
