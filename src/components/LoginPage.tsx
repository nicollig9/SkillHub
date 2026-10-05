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
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  Phone,
  HelpCircle,
  Eye,
  EyeOff,
  Calendar,
  AlertTriangle,
  FileCheck,
  Building,
  Scale
} from 'lucide-react';
import { BAIRROS_CURITIBA } from '@/data/mockData';

export default function LoginPage() {
  const { loginUser, registerCandidate, registerCompany, setCurrentView, showToast, getKnownAccounts } = useApp();

  const [activeTab, setActiveTab] = useState<'CANDIDATO' | 'EMPRESA'>('CANDIDATO');
  const [authMode, setAuthMode] = useState<'LOGIN' | 'CADASTRO' | 'DEMO'>('LOGIN');
  const [selectedProfile, setSelectedProfile] = useState<CandidateProfileType>('JOVEM_APRENDIZ');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [savedAccounts, setSavedAccounts] = useState<{ email: string; nome: string; username?: string; profileType: CandidateProfileType; date: string }[]>([]);

  React.useEffect(() => {
    setSavedAccounts(getKnownAccounts());
  }, [authMode]);

  React.useEffect(() => {
    const selectRegistration = () => setAuthMode('CADASTRO');
    if (new URLSearchParams(window.location.search).get('cadastro') === '1') {
      setAuthMode('CADASTRO');
    }

    window.addEventListener('skillhub:register', selectRegistration);
    return () => window.removeEventListener('skillhub:register', selectRegistration);
  }, []);

  // Form Candidato (inicia limpo)
  const [candUsuario, setCandUsuario] = useState('');
  const [candEmail, setCandEmail] = useState('');
  const [candSenha, setCandSenha] = useState('');
  const [candNome, setCandNome] = useState('');
  const [candCpf, setCandCpf] = useState('');
  const [candBairro, setCandBairro] = useState('Boqueirão');
  const [candDataNasc, setCandDataNasc] = useState('');
  const [candEscola, setCandEscola] = useState('');
  const [candTurno, setCandTurno] = useState('Manhã');

  // Dados do Responsável Legal (Obrigatório se < 18 anos)
  const [respNome, setRespNome] = useState('');
  const [respParentesco, setRespParentesco] = useState('Mãe');
  const [respCpf, setRespCpf] = useState('');
  const [respTelefone, setRespTelefone] = useState('');
  const [termoParentalAceito, setTermoParentalAceito] = useState<boolean>(false);

  // Form Empresa (inicia limpo)
  const [empStep, setEmpStep] = useState<number>(1);
  const [empEmail, setEmpEmail] = useState('');
  const [empSenha, setEmpSenha] = useState('');
  const [empRazao, setEmpRazao] = useState('');
  const [empFantasia, setEmpFantasia] = useState('');
  const [empCnpj, setEmpCnpj] = useState('');
  const [empCnae, setEmpCnae] = useState('');
  const [empBairro, setEmpBairro] = useState('CIC');
  const [empRamo, setEmpRamo] = useState('');
  const [empResponsavel, setEmpResponsavel] = useState('');
  const [empCargo, setEmpCargo] = useState('');
  const [empCpfResp, setEmpCpfResp] = useState('');
  const [empTelefone, setEmpTelefone] = useState('');

  // Declarações Burocráticas Obrigatórias da Empresa
  const [decCotaAprendiz, setDecCotaAprendiz] = useState<boolean>(false);
  const [decNaoCobranca, setDecNaoCobranca] = useState<boolean>(false);
  const [decTermoEstagio, setDecTermoEstagio] = useState<boolean>(false);
  const [decLgpdMenores, setDecLgpdMenores] = useState<boolean>(false);

  // Cálculo da idade
  const calculateAge = (birthDateStr: string): number | null => {
    if (!birthDateStr) return null;
    const birth = new Date(birthDateStr);
    if (isNaN(birth.getTime())) return null;
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const calculatedAge = calculateAge(candDataNasc);
  const isMinor = calculatedAge !== null && calculatedAge < 18;

  const handleCandidateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'LOGIN') {
      loginUser(candEmail, 'ALUNO', selectedProfile, candNome);
    } else {
      if (!candNome || !candEmail || !candCpf || !candUsuario) {
        showToast('Campos Obrigatórios', 'Por favor preencha todos os dados de cadastro (incluindo nome de usuário e e-mail).', 'warning');
        return;
      }
      if (isMinor && (!respNome || !respCpf || !respTelefone || !termoParentalAceito)) {
        showToast('Autorização Parental Necessária', 'Para menores de 18 anos, os dados do responsável e o termo de consentimento são obrigatórios.', 'warning');
        return;
      }
      registerCandidate({
        nome: candNome,
        username: candUsuario.trim().toLowerCase(),
        email: candEmail,
        profileType: selectedProfile,
        bairro: candBairro,
        cpf: candCpf,
        dataNascimento: candDataNasc,
        idade: calculatedAge ?? 18,
        responsavelLegal: isMinor ? {
          nome: respNome,
          parentesco: respParentesco,
          cpf: respCpf,
          telefone: respTelefone,
          termoAceito: termoParentalAceito
        } : undefined,
        matriculaEscolar: {
          instituicao: candEscola,
          cursoOuSerie: selectedProfile === 'ESTAGIARIO' ? 'Técnico / Superior' : 'Ensino Médio',
          turno: candTurno,
          comprovanteValido: true
        }
      });
    }
  };

  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'LOGIN') {
      loginUser(empEmail, 'RECRUTADOR', 'JOVEM_APRENDIZ', empResponsavel);
    } else {
      if (!decCotaAprendiz || !decNaoCobranca || !decTermoEstagio || !decLgpdMenores) {
        showToast('Compliance Obrigatório', 'A empresa deve aceitar todos os termos legais e declarações de conformidade.', 'warning');
        return;
      }
      registerCompany({
        razaoSocial: empRazao,
        nomeFantasia: empFantasia || empRazao,
        cnpj: empCnpj,
        cnae: empCnae,
        bairro: empBairro,
        ramo: empRamo,
        responsavel: `${empResponsavel} (${empCargo})`,
        email: empEmail,
        telefone: empTelefone,
        cotaAprendizagemCumprida: decCotaAprendiz,
        termoNaoCobrancaAceito: decNaoCobranca
      });
    }
  };

  // Modo Demonstração / Tour do Aplicativo (sem conta pessoal)
  const quickDemoLogin = (profile: CandidateProfileType, tourLabel: string) => {
    setSelectedProfile(profile);
    loginUser('demo@skillhub.com.br', 'ALUNO', profile, `Modo Demonstração (${tourLabel})`, true);
  };

  const loginCompanyDemo = () => {
    loginUser('rh.demo@empresa.com.br', 'RECRUTADOR', 'JOVEM_APRENDIZ', 'Empresa Parceira (Demonstração)', true);
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center py-6 px-4">
      
      {/* Card Principal de Autenticação */}
      <div className="w-full max-w-3xl bg-gradient-to-b from-[#1C0D33] via-[#160B29] to-[#120722] border border-[#5B2594]/60 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        
        {/* Glow de fundo */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#8B5CF6]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Topo do Card com Logo */}
        <div className="text-center space-y-3 relative z-10 mb-8">
          <div className="flex items-center justify-center mb-3">
            <img 
              src="/logo.png" 
              alt="SkillHub" 
              className="w-64 sm:w-80 md:w-96 h-auto max-h-36 sm:max-h-44 object-contain filter drop-shadow-xl transition-transform duration-300 hover:scale-105" 
            />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Portal de Acesso <span className="text-[#FBBF24]">SkillHub</span>
          </h2>
          <p className="text-xs sm:text-sm text-purple-200 max-w-xl mx-auto">
            Plataforma protegida de formação e empregabilidade jovem para Curitiba e Região Metropolitana. Faça login ou crie sua conta para acessar o sistema.
          </p>
        </div>

        {/* Chaveador Principal: Candidato / Jovem vs Empresa / RH (apenas se não estiver no tour de demonstração) */}
        {authMode !== 'DEMO' && (
          <div className="grid grid-cols-2 gap-2 bg-[#10061D] p-1.5 rounded-2xl border border-[#4C1D95]/40 mb-6 relative z-10">
            <button
              type="button"
              onClick={() => {
                setActiveTab('CANDIDATO');
              }}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'CANDIDATO'
                  ? 'bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white shadow-lg shadow-purple-900/40'
                  : 'text-purple-300 hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-[#FDE68A]" />
              <span>Sou Jovem / Candidato</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('EMPRESA');
              }}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'EMPRESA'
                  ? 'bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-[#1A0B2E] shadow-lg shadow-amber-950/40 font-black'
                  : 'text-purple-300 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Sou Empresa / Recrutador RH</span>
            </button>
          </div>
        )}

        {/* Toggle Login vs Cadastro vs Modo Demonstração */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 border-b border-[#3F1F68]/40 pb-4 text-xs font-bold relative z-10">
          <button
            type="button"
            onClick={() => setAuthMode('LOGIN')}
            className={`px-4 py-2 rounded-xl transition-all ${
              authMode === 'LOGIN'
                ? 'bg-[#311554] text-white border border-[#7C3AED]/60 shadow-md ring-1 ring-purple-500/30'
                : 'text-purple-300 hover:text-white'
            }`}
          >
            Já possuo conta (Entrar)
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('CADASTRO')}
            className={`px-4 py-2 rounded-xl transition-all ${
              authMode === 'CADASTRO'
                ? 'bg-[#311554] text-white border border-[#7C3AED]/60 shadow-md ring-1 ring-purple-500/30'
                : 'text-purple-300 hover:text-white'
            }`}
          >
            Criar nova conta gratuita
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('DEMO')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              authMode === 'DEMO'
                ? 'bg-gradient-to-r from-amber-500 to-purple-600 text-white border border-amber-300 shadow-lg font-extrabold ring-2 ring-amber-400/40'
                : 'text-amber-300 hover:text-white bg-amber-500/10 border border-amber-500/30 hover:border-amber-400'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Modo Demonstração (Tour)</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* ABA: MODO DEMONSTRAÇÃO (TOUR GUIADO COMPLETO)                            */}
        {/* ========================================================================= */}
        {authMode === 'DEMO' && (
          <div className="space-y-6 relative z-10 animate-fadeIn">
            {/* Box Explicativo Principal */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#271047] via-[#1B0A33] to-[#120524] border border-[#7C3AED]/50 shadow-2xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-purple-600 flex items-center justify-center text-white shadow-lg shrink-0">
                  <Sparkles className="w-5 h-5 text-amber-200" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                    <span>Como Funciona o Modo Demonstração?</span>
                    <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Tour do Sistema
                    </span>
                  </h3>
                  <p className="text-xs text-purple-200">
                    Acesso imediato e irrestrito sem preenchimento de formulários, CPF ou senhas.
                  </p>
                </div>
              </div>

              <div className="text-xs text-purple-200 space-y-3 leading-relaxed border-t border-purple-800/40 pt-4">
                <p>
                  O <strong>Modo Demonstração</strong> foi criado para que jovens, orientadores e recrutadores possam vivenciar 100% da experiência da plataforma <strong>SkillHub</strong> instantaneamente, sem precisar cadastrar dados reais ou criar senhas.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-[#160728]/80 border border-purple-500/30 space-y-1.5">
                    <div className="font-bold text-amber-300 text-xs flex items-center gap-1.5">
                      <span>⚡ Navegação Livre e Segura</span>
                    </div>
                    <p className="text-[11px] text-purple-300">
                      Nenhum dado pessoal é gravado no servidor. Você pode concluir módulos de estudo, simular quizes e emitir badges com total liberdade.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#160728]/80 border border-purple-500/30 space-y-1.5">
                    <div className="font-bold text-amber-300 text-xs flex items-center gap-1.5">
                      <span>📍 Geolocalização Real em Curitiba</span>
                    </div>
                    <p className="text-[11px] text-purple-300">
                      Explore o mapa interativo por proximidade com vagas reais nos 75 bairros de Curitiba (Boqueirão, CIC, Batel, Portão, etc.).
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#160728]/80 border border-purple-500/30 space-y-1.5">
                    <div className="font-bold text-amber-300 text-xs flex items-center gap-1.5">
                      <span>🛡️ Proteção Legal & Salarial</span>
                    </div>
                    <p className="text-[11px] text-purple-300">
                      Teste o simulador de holerite com cálculos da CLT, tabela progressiva do INSS 2026 e limite de 6h para jovens aprendizes.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#160728]/80 border border-purple-500/30 space-y-1.5">
                    <div className="font-bold text-amber-300 text-xs flex items-center gap-1.5">
                      <span>💡 Guia Pedagógico em Todas as Telas</span>
                    </div>
                    <p className="text-[11px] text-purple-300">
                      Dentro do app, cada tela terá um painel interativo no topo explicando detalhadamente o objetivo de cada funcionalidade e como testá-la.
                    </p>
                  </div>
                </div>
              </div>

              {/* Botões para entrar na demonstração */}
              <div className="pt-3 border-t border-purple-800/40 space-y-3">
                <div className="text-xs font-bold text-white flex items-center justify-between">
                  <span>Escolha um perfil para iniciar o Tour guiado:</span>
                  <span className="text-[10px] text-purple-300 font-normal">Alterne quando quiser pelo menu</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => quickDemoLogin('JOVEM_APRENDIZ', 'Jovem Aprendiz')}
                    className="p-3.5 rounded-xl bg-[#1d0b36] hover:bg-[#2e1354] border border-[#7C3AED]/60 hover:border-amber-400 text-left transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl">🛡️</span>
                        <span className="text-[10px] font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">Lei 10.097/00</span>
                      </div>
                      <div className="text-xs font-bold text-white group-hover:text-amber-300 mt-2">
                        Tour como Jovem Aprendiz
                      </div>
                      <div className="text-[11px] text-purple-300 mt-1">
                        14 a 24 anos. Formação teórica, holerite com desconto de VT até 6% e vagas com carga horária protegida.
                      </div>
                    </div>
                    <div className="text-[11px] font-bold text-purple-300 group-hover:text-white flex items-center gap-1 mt-3">
                      <span>Iniciar Tour Aprendiz</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => quickDemoLogin('ESTAGIARIO', 'Estagiário')}
                    className="p-3.5 rounded-xl bg-[#1d0b36] hover:bg-[#2e1354] border border-[#7C3AED]/60 hover:border-amber-400 text-left transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl">💼</span>
                        <span className="text-[10px] font-bold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">Lei 11.788/08</span>
                      </div>
                      <div className="text-xs font-bold text-white group-hover:text-amber-300 mt-2">
                        Tour como Estagiário
                      </div>
                      <div className="text-[11px] text-purple-300 mt-1">
                        Ensino Médio, Técnico ou Superior. Bolsa-auxílio, termo de compromisso e vagas sem exigência de experiência.
                      </div>
                    </div>
                    <div className="text-[11px] font-bold text-purple-300 group-hover:text-white flex items-center gap-1 mt-3">
                      <span>Iniciar Tour Estágio</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => quickDemoLogin('PRIMEIRO_EMPREGO', '1º Emprego')}
                    className="p-3.5 rounded-xl bg-[#1d0b36] hover:bg-[#2e1354] border border-[#7C3AED]/60 hover:border-amber-400 text-left transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl">🚀</span>
                        <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">CLT / Entrada</span>
                      </div>
                      <div className="text-xs font-bold text-white group-hover:text-amber-300 mt-2">
                        Tour como 1º Emprego
                      </div>
                      <div className="text-[11px] text-purple-300 mt-1">
                        Em busca da primeira carteira assinada. Cursos rápidos de postura profissional, badges e oportunidades em Curitiba.
                      </div>
                    </div>
                    <div className="text-[11px] font-bold text-purple-300 group-hover:text-white flex items-center gap-1 mt-3">
                      <span>Iniciar Tour 1º Emprego</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={loginCompanyDemo}
                    className="p-3.5 rounded-xl bg-gradient-to-br from-[#271505] to-[#1c0d02] hover:from-[#3a1f07] hover:to-[#2b1403] border border-amber-500/60 hover:border-amber-300 text-left transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl">🏢</span>
                        <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30">Visão RH</span>
                      </div>
                      <div className="text-xs font-bold text-amber-200 group-hover:text-white mt-2">
                        Tour como Empresa / Recrutador RH
                      </div>
                      <div className="text-[11px] text-amber-100/70 mt-1">
                        Painel corporativo para publicar vagas, testar a trava antiassédio com IA e filtrar candidatos por bairros de Curitiba.
                      </div>
                    </div>
                    <div className="text-[11px] font-bold text-amber-300 group-hover:text-amber-200 flex items-center gap-1 mt-3">
                      <span>Iniciar Tour RH</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ABA 1: JOVEM / CANDIDATO                                                 */}
        {/* ========================================================================= */}
        {authMode !== 'DEMO' && activeTab === 'CANDIDATO' && (
          <div className="space-y-6 relative z-10">

            {/* SELETOR DE SITUAÇÃO DO JOVEM (3 OPÇÕES CLARAS - APENAS NO CADASTRO) */}
            {authMode === 'CADASTRO' && (
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-purple-200 flex items-center justify-between">
                  <span>Qual é a sua situação atual? (O app personalizará tudo para você):</span>
                  <span className="text-[11px] text-amber-300 font-normal">Personalização Imediata</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  
                  {/* Opção 1: Jovem Aprendiz */}
                  <button
                    type="button"
                    onClick={() => setSelectedProfile('JOVEM_APRENDIZ')}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      selectedProfile === 'JOVEM_APRENDIZ'
                        ? 'bg-gradient-to-b from-[#381665] to-[#250F44] border-purple-400 text-white ring-2 ring-purple-500/40 shadow-lg'
                        : 'bg-[#150926] border-[#4C1D95]/40 text-purple-300 hover:border-purple-400/60'
                    }`}
                  >
                    <span className="text-2xl mb-1">🛡️</span>
                    <div>
                      <div className="text-xs font-bold text-white leading-tight">Jovem Aprendiz</div>
                      <div className="text-[10px] text-purple-300 mt-0.5">14 a 24 anos (Lei 10.097)</div>
                    </div>
                  </button>

                  {/* Opção 2: Estagiário */}
                  <button
                    type="button"
                    onClick={() => setSelectedProfile('ESTAGIARIO')}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      selectedProfile === 'ESTAGIARIO'
                        ? 'bg-gradient-to-b from-[#381665] to-[#250F44] border-purple-400 text-white ring-2 ring-purple-500/40 shadow-lg'
                        : 'bg-[#150926] border-[#4C1D95]/40 text-purple-300 hover:border-purple-400/60'
                    }`}
                  >
                    <span className="text-2xl mb-1">💼</span>
                    <div>
                      <div className="text-xs font-bold text-white leading-tight">Estagiário</div>
                      <div className="text-[10px] text-purple-300 mt-0.5">Técnico / Superior (Lei 11.788)</div>
                    </div>
                  </button>

                  {/* Opção 3: Nenhuma das opções / 1º Emprego */}
                  <button
                    type="button"
                    onClick={() => setSelectedProfile('PRIMEIRO_EMPREGO')}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      selectedProfile === 'PRIMEIRO_EMPREGO'
                        ? 'bg-gradient-to-b from-[#381665] to-[#250F44] border-purple-400 text-white ring-2 ring-purple-500/40 shadow-lg'
                        : 'bg-[#150926] border-[#4C1D95]/40 text-purple-300 hover:border-purple-400/60'
                    }`}
                  >
                    <span className="text-2xl mb-1">🚀</span>
                    <div>
                      <div className="text-xs font-bold text-white leading-tight">1º Emprego</div>
                      <div className="text-[10px] text-purple-300 mt-0.5">Em busca da 1ª vaga</div>
                    </div>
                  </button>

                </div>
              </div>
            )}

            {/* FORMULÁRIO DO CANDIDATO */}
            <form onSubmit={handleCandidateSubmit} className="space-y-4">
              
              {authMode === 'CADASTRO' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-purple-200">Nome Completo:</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          required
                          value={candNome}
                          onChange={(e) => setCandNome(e.target.value)}
                          placeholder="Nome e Sobrenome"
                          className="w-full bg-[#10061D] border border-[#4C1D95]/50 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#8B5CF6]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-purple-200">CPF:</label>
                      <input
                        type="text"
                        required
                        value={candCpf}
                        onChange={(e) => setCandCpf(e.target.value)}
                        placeholder="000.000.000-00"
                        className="w-full bg-[#10061D] border border-[#4C1D95]/50 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#8B5CF6]"
                      />
                    </div>
                  </div>

                  {/* DATA DE NASCIMENTO & CÁLCULO DE IDADE (PROTEÇÃO DE MENORES) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#130722] p-3 rounded-2xl border border-[#4C1D95]/30">
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-bold text-purple-200 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#FBBF24]" />
                        <span>Data de Nascimento:</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={candDataNasc}
                        onChange={(e) => setCandDataNasc(e.target.value)}
                        className="w-full bg-[#10061D] border border-[#4C1D95]/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#8B5CF6]"
                      />
                    </div>

                    <div className="space-y-1 flex flex-col justify-end">
                      <div className="bg-[#24123E] border border-purple-500/40 rounded-xl p-2 text-center">
                        <span className="text-[10px] text-purple-300 block">Idade Calculada:</span>
                        <span className="text-sm font-black text-[#FBBF24]">
                          {calculatedAge !== null ? `${calculatedAge} anos` : 'Informe a data'}
                        </span>
                        {calculatedAge !== null && (
                          <span className={`text-[9px] block ${isMinor ? 'text-amber-400 font-bold' : 'text-emerald-400'}`}>
                            {isMinor ? '(Menor de 18)' : '(Maior de idade)'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* SALVAGUARDAS LEGAIS PARA MENORES DE 18 ANOS */}
                  {isMinor && (
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-[#24103B] to-[#1C0D30] border-2 border-amber-500/50 space-y-3 shadow-inner animate-fadeIn">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                        <ShieldCheck className="w-4 h-4 text-amber-400" />
                        <span>Módulo de Proteção de Menores (LGPD & Lei nº 10.097/00)</span>
                      </div>
                      <p className="text-[11px] text-purple-200 leading-relaxed">
                        Como você tem <strong>{calculatedAge} anos</strong>, a legislação trabalhista brasileira exige os dados e a autorização formal do responsável legal para garantir total proteção.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        <div>
                          <label className="text-[11px] font-bold text-purple-300">Nome do Responsável Legal:</label>
                          <input
                            type="text"
                            required
                            value={respNome}
                            onChange={(e) => setRespNome(e.target.value)}
                            placeholder="Nome do Pai, Mãe ou Tutor"
                            className="w-full bg-[#10061D] border border-[#4C1D95]/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-purple-300">Grau de Parentesco:</label>
                          <select
                            value={respParentesco}
                            onChange={(e) => setRespParentesco(e.target.value)}
                            className="w-full bg-[#10061D] border border-[#4C1D95]/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                          >
                            <option value="Mãe">Mãe</option>
                            <option value="Pai">Pai</option>
                            <option value="Avô/Avó">Avô / Avó</option>
                            <option value="Tutor Legal">Tutor Legal com Guarda</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-purple-300">CPF do Responsável:</label>
                          <input
                            type="text"
                            required
                            value={respCpf}
                            onChange={(e) => setRespCpf(e.target.value)}
                            placeholder="000.000.000-00"
                            className="w-full bg-[#10061D] border border-[#4C1D95]/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-purple-300">WhatsApp / Telefone do Responsável:</label>
                          <input
                            type="text"
                            required
                            value={respTelefone}
                            onChange={(e) => setRespTelefone(e.target.value)}
                            placeholder="(41) 90000-0000"
                            className="w-full bg-[#10061D] border border-[#4C1D95]/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                          />
                        </div>
                      </div>

                      <div className="pt-2 border-t border-purple-900/40 flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          id="termoParental"
                          checked={termoParentalAceito}
                          onChange={(e) => setTermoParentalAceito(e.target.checked)}
                          className="w-4 h-4 accent-amber-400 rounded cursor-pointer mt-0.5"
                        />
                        <label htmlFor="termoParental" className="text-[11px] text-purple-200 cursor-pointer">
                          Declaro que os dados do responsável acima são verídicos e autorizo a participação em cursos gratuitos e processos seletivos de vagas de aprendizagem em Curitiba/RMC.
                        </label>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-purple-200">Bairro em Curitiba / RMC:</label>
                      <select
                        value={candBairro}
                        onChange={(e) => setCandBairro(e.target.value)}
                        className="w-full bg-[#10061D] border border-[#4C1D95]/50 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#8B5CF6]"
                      >
                        {Object.keys(BAIRROS_CURITIBA).map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-purple-200">Escola / Colégio Atual:</label>
                      <input
                        type="text"
                        value={candEscola}
                        onChange={(e) => setCandEscola(e.target.value)}
                        placeholder="Nome da Escola ou Faculdade"
                        className="w-full bg-[#10061D] border border-[#4C1D95]/50 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#8B5CF6]"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* CONTAS SALVAS RECENTES (RESTAURAR PROGRESSO) */}
              {authMode === 'LOGIN' && savedAccounts.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-[#1F0E38] border border-[#7C3AED]/40 space-y-2">
                  <div className="text-[11px] font-bold text-amber-300 flex items-center justify-between">
                    <span>💡 Contas salvas neste dispositivo:</span>
                    <span className="text-[10px] text-purple-300">Clique para preencher</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {savedAccounts.slice(0, 4).map((acc) => (
                      <button
                        key={acc.email}
                        type="button"
                        onClick={() => {
                          setCandEmail(acc.email);
                          setCandUsuario(acc.username || acc.email.split('@')[0]);
                          setCandSenha('••••••••');
                          setSelectedProfile(acc.profileType);
                        }}
                        className={`p-2 rounded-xl text-left border transition-all flex items-center gap-2.5 ${
                          candEmail.toLowerCase() === acc.email.toLowerCase()
                            ? 'bg-[#3C1A6E] border-amber-400 text-white shadow-md'
                            : 'bg-[#150926] border-[#4C1D95]/40 text-purple-200 hover:border-purple-400'
                        }`}
                      >
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-amber-500 flex items-center justify-center text-[10px] font-black text-white shrink-0">
                          {acc.nome.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="truncate">
                          <div className="text-xs font-bold text-white truncate">{acc.nome}</div>
                          <div className="text-[10px] text-purple-300 truncate">{acc.username ? `@${acc.username}` : acc.email}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* NOME DE USUÁRIO, E-MAIL & SENHA */}
              {authMode === 'CADASTRO' ? (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-purple-200">Nome de Usuário:</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={candUsuario}
                        onChange={(e) => setCandUsuario(e.target.value.toLowerCase().replace(/\s+/g, ''))}
                        placeholder="Escolha seu nome de usuário (ex: maria.silva)"
                        className="w-full bg-[#10061D] border border-[#4C1D95]/50 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#8B5CF6]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-purple-200">E-mail:</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
                      <input
                        type="email"
                        required
                        value={candEmail}
                        onChange={(e) => setCandEmail(e.target.value)}
                        placeholder="seuemail@exemplo.com"
                        className="w-full bg-[#10061D] border border-[#4C1D95]/50 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#8B5CF6]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-purple-200">Senha:</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={candSenha}
                        onChange={(e) => setCandSenha(e.target.value)}
                        placeholder="Sua senha segura"
                        className="w-full bg-[#10061D] border border-[#4C1D95]/50 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white focus:outline-none focus:border-[#8B5CF6]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3 text-purple-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-purple-200">Nome de Usuário ou E-mail:</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={candEmail}
                        onChange={(e) => setCandEmail(e.target.value)}
                        placeholder="Seu nome de usuário ou e-mail"
                        className="w-full bg-[#10061D] border border-[#4C1D95]/50 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#8B5CF6]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-purple-200">Senha:</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={candSenha}
                        onChange={(e) => setCandSenha(e.target.value)}
                        placeholder="Sua senha de acesso"
                        className="w-full bg-[#10061D] border border-[#4C1D95]/50 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white focus:outline-none focus:border-[#8B5CF6]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3 text-purple-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] hover:from-[#7C3AED] hover:to-[#9D4EDD] text-white font-extrabold py-3.5 rounded-xl shadow-lg shadow-purple-950/50 transition-all flex items-center justify-center gap-2 text-sm mt-4"
              >
                <span>{authMode === 'LOGIN' ? 'Entrar no SkillHub' : 'Finalizar Cadastro Gratuito'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>

            {/* Atalho para Modo Demonstração */}
            <div className="pt-4 border-t border-[#3F1F68]/40 text-center">
              <button
                type="button"
                onClick={() => setAuthMode('DEMO')}
                className="text-xs text-amber-300 hover:text-amber-200 transition-colors inline-flex items-center gap-1.5 font-bold"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Quer apenas conhecer a plataforma? Acesse o Modo Demonstração</span>
              </button>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* ABA 2: EMPRESA / RECRUTADOR RH (COM BUROCRACIA COMPLETA DE VALIDAÇÃO)      */}
        {/* ========================================================================= */}
        {authMode !== 'DEMO' && activeTab === 'EMPRESA' && (
          <div className="space-y-6 relative z-10">
            
            {authMode === 'LOGIN' ? (
              <form onSubmit={handleCompanySubmit} className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#261509]/60 border border-amber-500/40 text-xs text-amber-200 flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-bold mb-0.5">Acesso Restrito a Empresas & RH:</strong>
                    Ambiente corporativo exclusivo para publicação e gestão de vagas de jovens aprendizes e estagiários em Curitiba.
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-purple-200">E-mail Corporativo do RH:</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={empEmail}
                      onChange={(e) => setEmpEmail(e.target.value)}
                      placeholder="rh@empresa.com.br"
                      className="w-full bg-[#10061D] border border-[#4C1D95]/50 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-purple-200">Senha Corporativa:</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={empSenha}
                      onChange={(e) => setEmpSenha(e.target.value)}
                      placeholder="Senha do Portal RH"
                      className="w-full bg-[#10061D] border border-[#4C1D95]/50 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-purple-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#D97706] to-[#F59E0B] hover:brightness-110 text-[#1A0B2E] font-black py-3.5 rounded-xl shadow-lg shadow-amber-950/50 transition-all flex items-center justify-center gap-2 text-sm mt-4"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Acessar Painel RH da Empresa</span>
                </button>

                <div className="pt-4 border-t border-[#3F1F68]/40">
                  <button
                    type="button"
                    onClick={() => loginUser('rh@renaultcuritiba.com.br', 'RECRUTADOR', 'JOVEM_APRENDIZ', 'Renault do Brasil RH')}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#241306] hover:bg-[#341b09] border border-amber-500/50 text-amber-200 font-bold text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <span>⚡ Demo 1-Clique: Entrar como Renault Curitiba RH</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            ) : (
              /* CADASTRO BUROCRÁTICO DA EMPRESA EM ETAPAS */
              <form onSubmit={handleCompanySubmit} className="space-y-4">
                
                {/* Stepper de Burocracia */}
                <div className="flex items-center justify-between bg-[#120722] p-2 rounded-2xl border border-[#4C1D95]/40 text-xs">
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-bold ${empStep === 1 ? 'bg-amber-500 text-slate-950' : 'text-purple-300'}`}>
                    <span>1. CNPJ & Dados</span>
                  </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-bold ${empStep === 2 ? 'bg-amber-500 text-slate-950' : 'text-purple-300'}`}>
                    <span>2. Gestor RH</span>
                  </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-bold ${empStep === 3 ? 'bg-amber-500 text-slate-950' : 'text-purple-300'}`}>
                    <span>3. Compliance Legal</span>
                  </div>
                </div>

                {/* ETAPA 1: DADOS JURÍDICOS */}
                {empStep === 1 && (
                  <div className="space-y-3 animate-fadeIn">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-purple-200">CNPJ da Empresa:</label>
                        <input
                          type="text"
                          required
                          value={empCnpj}
                          onChange={(e) => setEmpCnpj(e.target.value)}
                          placeholder="00.000.000/0001-00"
                          className="w-full bg-[#10061D] border border-[#4C1D95]/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-purple-200">Razão Social Oficial:</label>
                        <input
                          type="text"
                          required
                          value={empRazao}
                          onChange={(e) => setEmpRazao(e.target.value)}
                          placeholder="Razão Social Registrada"
                          className="w-full bg-[#10061D] border border-[#4C1D95]/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-purple-200">Nome Fantasia:</label>
                        <input
                          type="text"
                          required
                          value={empFantasia}
                          onChange={(e) => setEmpFantasia(e.target.value)}
                          placeholder="Nome comercial da marca"
                          className="w-full bg-[#10061D] border border-[#4C1D95]/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-purple-200">Bairro / Polo em Curitiba & RMC:</label>
                        <select
                          value={empBairro}
                          onChange={(e) => setEmpBairro(e.target.value)}
                          className="w-full bg-[#10061D] border border-[#4C1D95]/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        >
                          {Object.keys(BAIRROS_CURITIBA).map((b) => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-purple-200">CNAE Principal & Ramo:</label>
                      <input
                        type="text"
                        value={empCnae}
                        onChange={(e) => setEmpCnae(e.target.value)}
                        placeholder="Código CNAE e descrição de atividade"
                        className="w-full bg-[#10061D] border border-[#4C1D95]/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => setEmpStep(2)}
                      className="w-full py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs flex items-center justify-center gap-2 mt-3"
                    >
                      <span>Avançar para Dados do Gestor de RH</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* ETAPA 2: DADOS DO GESTOR DE RH */}
                {empStep === 2 && (
                  <div className="space-y-3 animate-fadeIn">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-purple-200">Nome do Responsável de RH:</label>
                        <input
                          type="text"
                          required
                          value={empResponsavel}
                          onChange={(e) => setEmpResponsavel(e.target.value)}
                          placeholder="Gestor de Contratação"
                          className="w-full bg-[#10061D] border border-[#4C1D95]/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-purple-200">Cargo / Função:</label>
                        <input
                          type="text"
                          required
                          value={empCargo}
                          onChange={(e) => setEmpCargo(e.target.value)}
                          placeholder="Ex: Coordenador de RH"
                          className="w-full bg-[#10061D] border border-[#4C1D95]/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-purple-200">E-mail Corporativo (@empresa.com.br):</label>
                        <input
                          type="email"
                          required
                          value={empEmail}
                          onChange={(e) => setEmpEmail(e.target.value)}
                          placeholder="rh@suaempresa.com.br"
                          className="w-full bg-[#10061D] border border-[#4C1D95]/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-purple-200">Telefone Comercial:</label>
                        <input
                          type="text"
                          required
                          value={empTelefone}
                          onChange={(e) => setEmpTelefone(e.target.value)}
                          placeholder="(41) 3000-0000"
                          className="w-full bg-[#10061D] border border-[#4C1D95]/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setEmpStep(1)}
                        className="w-1/3 py-2.5 rounded-xl bg-[#24123E] text-purple-300 text-xs font-bold"
                      >
                        Voltar
                      </button>
                      <button
                        type="button"
                        onClick={() => setEmpStep(3)}
                        className="w-2/3 py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs flex items-center justify-center gap-2"
                      >
                        <span>Avançar para Declarações de Compliance</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ETAPA 3: COMPLIANCE LEGAL & DECLARAÇÕES DE LEI */}
                {empStep === 3 && (
                  <div className="space-y-3 animate-fadeIn">
                    <div className="p-3.5 rounded-2xl bg-[#241306] border border-amber-500/50 space-y-2">
                      <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                        <Scale className="w-4 h-4 text-amber-400" />
                        Declarações Legais Obrigatórias para Contratação:
                      </span>
                      
                      <div className="space-y-2 text-[11px] text-purple-200">
                        <label className="flex items-start gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={decCotaAprendiz}
                            onChange={(e) => setDecCotaAprendiz(e.target.checked)}
                            className="w-4 h-4 accent-amber-400 rounded mt-0.5"
                          />
                          <span>Declaro que as vagas abertas respeitarão a <strong>Cota de Aprendizagem (Art. 429 da CLT / Lei 10.097/00)</strong> com garantia de formação teórica.</span>
                        </label>

                        <label className="flex items-start gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={decNaoCobranca}
                            onChange={(e) => setDecNaoCobranca(e.target.checked)}
                            className="w-4 h-4 accent-amber-400 rounded mt-0.5"
                          />
                          <span>Declaro que <strong>nenhuma taxa, curso prévio ou valor financeiro</strong> será cobrado dos jovens candidatos em nenhuma fase do processo seletivo.</span>
                        </label>

                        <label className="flex items-start gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={decTermoEstagio}
                            onChange={(e) => setDecTermoEstagio(e.target.checked)}
                            className="w-4 h-4 accent-amber-400 rounded mt-0.5"
                          />
                          <span>Declaro que as contratações de estágio seguirão integralmente a <strong>Lei nº 11.788/08</strong> com Termo de Compromisso e Seguro de Vida Coletivo.</span>
                        </label>

                        <label className="flex items-start gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={decLgpdMenores}
                            onChange={(e) => setDecLgpdMenores(e.target.checked)}
                            className="w-4 h-4 accent-amber-400 rounded mt-0.5"
                          />
                          <span>Comprometo-me com o sigilo e tratamento de dados de menores de idade conforme as diretrizes da <strong>LGPD (Lei nº 13.709/2018)</strong>.</span>
                        </label>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setEmpStep(2)}
                        className="w-1/3 py-2.5 rounded-xl bg-[#24123E] text-purple-300 text-xs font-bold"
                      >
                        Voltar
                      </button>
                      <button
                        type="submit"
                        className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-[#1A0B2E] font-black text-xs flex items-center justify-center gap-2 shadow-lg"
                      >
                        <Building2 className="w-4 h-4" />
                        <span>Homologar Cadastro da Empresa</span>
                      </button>
                    </div>
                  </div>
                )}

              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
