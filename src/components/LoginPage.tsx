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

const BAIRROS_CURITIBA = [
  'Água Verde', 'Alto da Glória', 'Alto da XV', 'Batel', 'Bigorrilho', 
  'Boqueirão', 'Cabral', 'Centro', 'Centro Cívico', 'CIC', 
  'Jardim das Américas', 'Mercês', 'Portão', 'Santa Felicidade', 'Sítio Cérco'
];

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

  const handleCandidateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'LOGIN') {
      loginUser(candEmail, 'ALUNO', selectedProfile, candNome);
    } else {
      if (!candNome || !candEmail || !candCpf || !candUsuario || !candSenha) {
        showToast('Campos Obrigatórios', 'Por favor preencha todos os dados de cadastro (incluindo nome de usuário, e-mail e senha).', 'warning');
        return;
      }
      if (isMinor && (!respNome || !respCpf || !respTelefone || !termoParentalAceito)) {
        showToast('Autorização Parental Necessária', 'Para menores de 18 anos, os dados do responsável e o termo de consentimento são obrigatórios.', 'warning');
        return;
      }

      // --- INTEGRAÇÃO COM SUPABASE: Envia o cadastro completo para a API ---
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: candEmail,
            password: candSenha,
            nome: candNome,
            username: candUsuario.trim().toLowerCase(),
            cpf: candCpf,
            bairro: candBairro,
            escola: candEscola,
            data_nascimento: candDataNasc,
            perfil: selectedProfile
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Erro ao realizar cadastro.');
        }

        // Regista também na tabela auxiliar de e-mails, se necessário
        await fetch('/api/emails', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: candEmail }),
        });

        showToast('Sucesso', 'Cadastro efetuado com sucesso!', 'success');

        // Atualiza o estado global da aplicação
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

      } catch (err: any) {
        console.error('Erro ao guardar utilizador no Supabase:', err);
        showToast('Erro no Cadastro', err.message || 'Erro ao conectar ao banco de dados.', 'error');
      }
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

        {/* Chaveador Principal: Candidato / Jovem vs Empresa / RH */}
        {authMode !== 'DEMO' && (
          <div className="grid grid-cols-2 gap-2 bg-[#10061D] p-1.5 rounded-2xl border border-[#4C1D95]/40 mb-6 relative z-10">
            <button
              type="button"
              onClick={() => setActiveTab('CANDIDATO')}
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
              onClick={() => setActiveTab('EMPRESA')}
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

        {/* ABA: MODO DEMONSTRAÇÃO */}
        {authMode === 'DEMO' && (
          <div className="space-y-6 relative z-10 animate-fadeIn">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => quickDemoLogin('JOVEM_APRENDIZ', 'Jovem Aprendiz')}
                  className="p-3.5 rounded-xl bg-[#1d0b36] hover:bg-[#2e1354] border border-[#7C3AED]/60 text-left transition-all group"
                >
                  <div className="text-xs font-bold text-white group-hover:text-amber-300">
                    Tour como Jovem Aprendiz
                  </div>
                  <div className="text-[11px] text-purple-300 mt-1">
                    14 a 24 anos. Formação teórica e holerite.
                  </div>
                </button>

                <button
                  type="button"
                  onClick={loginCompanyDemo}
                  className="p-3.5 rounded-xl bg-gradient-to-br from-[#271505] to-[#1c0d02] border border-amber-500/60 text-left transition-all group"
                >
                  <div className="text-xs font-bold text-amber-200 group-hover:text-white">
                    Tour como Empresa / Recrutador RH
                  </div>
                  <div className="text-[11px] text-amber-100/70 mt-1">
                    Painel corporativo para publicar vagas e filtrar candidatos.
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ABA: JOVEM / CANDIDATO */}
        {authMode !== 'DEMO' && activeTab === 'CANDIDATO' && (
          <div className="space-y-6 relative z-10">

            {authMode === 'CADASTRO' && (
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-purple-200">
                  Qual é a sua situação atual?
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedProfile('JOVEM_APRENDIZ')}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      selectedProfile === 'JOVEM_APRENDIZ'
                        ? 'bg-gradient-to-b from-[#381665] to-[#250F44] border-purple-400 text-white shadow-lg'
                        : 'bg-[#150926] border-[#4C1D95]/40 text-purple-300'
                    }`}
                  >
                    <span className="text-2xl mb-1">🛡️</span>
                    <div>
                      <div className="text-xs font-bold text-white">Jovem Aprendiz</div>
                      <div className="text-[10px] text-purple-300 mt-0.5">14 a 24 anos</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedProfile('ESTAGIARIO')}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      selectedProfile === 'ESTAGIARIO'
                        ? 'bg-gradient-to-b from-[#381665] to-[#250F44] border-purple-400 text-white shadow-lg'
                        : 'bg-[#150926] border-[#4C1D95]/40 text-purple-300'
                    }`}
                  >
                    <span className="text-2xl mb-1">💼</span>
                    <div>
                      <div className="text-xs font-bold text-white">Estagiário</div>
                      <div className="text-[10px] text-purple-300 mt-0.5">Técnico / Superior</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedProfile('PRIMEIRO_EMPREGO')}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      selectedProfile === 'PRIMEIRO_EMPREGO'
                        ? 'bg-gradient-to-b from-[#381665] to-[#250F44] border-purple-400 text-white shadow-lg'
                        : 'bg-[#150926] border-[#4C1D95]/40 text-purple-300'
                    }`}
                  >
                    <span className="text-2xl mb-1">🚀</span>
                    <div>
                      <div className="text-xs font-bold text-white">1º Emprego</div>
                      <div className="text-[10px] text-purple-300 mt-0.5">Primeira oportunidade</div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* FORMULÁRIO DO CANDIDATO */}
            <form onSubmit={handleCandidateSubmit} className="space-y-4">
              
              {authMode === 'CADASTRO' ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-purple-200">Nome Completo:</label>
                      <input
                        type="text"
                        required
                        value={candNome}
                        onChange={(e) => setCandNome(e.target.value)}
                        placeholder="Nome e Sobrenome"
                        className="w-full bg-[#10061D] border border-[#4C1D95]/50 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#8B5CF6]"
                      />
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-purple-200">Nome de Usuário:</label>
                      <input
                        type="text"
                        required
                        value={candUsuario}
                        onChange={(e) => setCandUsuario(e.target.value)}
                        placeholder="ex: lucas23"
                        className="w-full bg-[#10061D] border border-[#4C1D95]/50 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#8B5CF6]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-purple-200">E-mail:</label>
                      <input
                        type="email"
                        required
                        value={candEmail}
                        onChange={(e) => setCandEmail(e.target.value)}
                        placeholder="seu@email.com"
                        className="w-full bg-[#10061D] border border-[#4C1D95]/50 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#8B5CF6]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-purple-200">Senha:</label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={candSenha}
                        onChange={(e) => setCandSenha(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-[#10061D] border border-[#4C1D95]/50 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#8B5CF6]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-purple-200">Bairro em Curitiba:</label>
                      <select
                        value={candBairro}
                        onChange={(e) => setCandBairro(e.target.value)}
                        className="w-full bg-[#10061D] border border-[#4C1D95]/50 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#8B5CF6]"
                      >
                        {BAIRROS_CURITIBA.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                  </div>

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
                      </div>
                    </div>
                  </div>

                  {isMinor && (
                    <div className="p-4 rounded-2xl bg-[#24103B] border-2 border-amber-500/50 space-y-3">
                      <div className="text-xs font-bold text-amber-300 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-amber-400" />
                        <span>Dados do Responsável Legal (Menor de idade)</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <input
                          type="text"
                          required
                          placeholder="Nome do Responsável"
                          value={respNome}
                          onChange={(e) => setRespNome(e.target.value)}
                          className="w-full bg-[#10061D] border border-[#4C1D95]/60 rounded-xl px-3 py-2 text-xs text-white"
                        />
                        <input
                          type="text"
                          required
                          placeholder="CPF do Responsável"
                          value={respCpf}
                          onChange={(e) => setRespCpf(e.target.value)}
                          className="w-full bg-[#10061D] border border-[#4C1D95]/60 rounded-xl px-3 py-2 text-xs text-white"
                        />
                        <input
                          type="text"
                          required
                          placeholder="Telefone do Responsável"
                          value={respTelefone}
                          onChange={(e) => setRespTelefone(e.target.value)}
                          className="w-full bg-[#10061D] border border-[#4C1D95]/60 rounded-xl px-3 py-2 text-xs text-white"
                        />
                        <label className="flex items-center gap-2 text-[11px] text-purple-200">
                          <input
                            type="checkbox"
                            checked={termoParentalAceito}
                            onChange={(e) => setTermoParentalAceito(e.target.checked)}
                          />
                          <span>Aceito os termos de consentimento</span>
                        </label>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] hover:from-[#5B21B6] hover:to-[#7C3AED] text-white font-black text-sm rounded-xl shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <span>Finalizar Cadastro Gratuito</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  {/* MODO LOGIN */}
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-purple-200">E-mail ou Usuário:</label>
                      <input
                        type="text"
                        required
                        value={candEmail}
                        onChange={(e) => setCandEmail(e.target.value)}
                        placeholder="seu@email.com"
                        className="w-full bg-[#10061D] border border-[#4C1D95]/50 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#8B5CF6]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-purple-200">Senha:</label>
                      <input
                        type="password"
                        required
                        value={candSenha}
                        onChange={(e) => setCandSenha(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-[#10061D] border border-[#4C1D95]/50 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#8B5CF6]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] hover:from-[#5B21B6] hover:to-[#7C3AED] text-white font-black text-sm rounded-xl shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      <span>Entrar no Sistema</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        )}

      </div>
    </div>
  );
}