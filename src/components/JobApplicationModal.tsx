'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { JobVacancy } from '@/types';
import {
  X,
  UploadCloud,
  FileText,
  CheckCircle2,
  Sparkles,
  Building2,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  AlertCircle,
  FileCheck,
  ExternalLink,
  Award,
  HelpCircle
} from 'lucide-react';

interface JobApplicationModalProps {
  isOpen: boolean;
  vaga: JobVacancy | null;
  onClose: () => void;
  onSuccess?: (protocolo: string) => void;
}

export default function JobApplicationModal({ isOpen, vaga, onClose, onSuccess }: JobApplicationModalProps) {
  const { student, currentUser, applyToJob, showToast } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [resumeType, setResumeType] = useState<'CURRICULO_SKILLHUB' | 'PDF_ANEXADO' | 'SEM_CURRICULO'>('CURRICULO_SKILLHUB');
  const [uploadedFileName, setUploadedFileName] = useState<string>('Meu_Curriculo_2026.pdf');
  const [uploadedFileSize, setUploadedFileSize] = useState<string>('245 KB');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const candidateName = currentUser?.nome || student.nome || 'Lucas Silva Oliveira';
  const candidateBairro = currentUser?.bairro || student.endereco.bairro || 'CIC';

  const [coverLetter, setCoverLetter] = useState<string>(
    `Olá! Tenho grande interesse na oportunidade de ${vaga?.titulo || 'trabalho'} na ${vaga?.empresaNome || 'empresa'}. Sou dedicado(a), pontual e tenho muita disposição para aprender e contribuir com a equipe!`
  );

  // Perguntas de triagem
  const [disponibilidade, setDisponibilidade] = useState<string>('Imediata (próximos dias)');
  const [transporte, setTransporte] = useState<string>('Sim, fácil acesso via transporte público de Curitiba / RMC');
  const [autorizacaoMenor, setAutorizacaoMenor] = useState<string>('Sim, responsável informado e ciente');

  const [consentLgpd, setConsentLgpd] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [generatedProtocol, setGeneratedProtocol] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen || !vaga) return null;

  // Modelos de Carta de Apresentação
  const applyTemplate = (type: 'PRIMEIRO_EMPREGO' | 'ESTAGIO' | 'APRENDIZ') => {
    if (type === 'PRIMEIRO_EMPREGO') {
      setCoverLetter(
        `Prezada equipe de RH da ${vaga.empresaNome},\n\nEstou em busca da minha primeira oportunidade profissional. Possuo perfil proativo, facilidade para trabalhar em equipe e muita disposição para aprender todas as rotinas necessárias. Tenho disponibilidade no contraturno escolar e compromisso absoluto com pontualidade e dedicação.\n\nAtenciosamente,\n${candidateName}`
      );
    } else if (type === 'ESTAGIO') {
      setCoverLetter(
        `À equipe de Recursos Humanos da ${vaga.empresaNome},\n\nVenho por meio desta apresentar minha candidatura à vaga de ${vaga.titulo}. Estou em formação acadêmica e busco aplicar meus conhecimentos técnicos em um ambiente desafiador, desenvolvendo projetos e gerando resultados práticos para a organização.\n\nAtenciosamente,\n${candidateName}`
      );
    } else if (type === 'APRENDIZ') {
      setCoverLetter(
        `Prezado(a) Recrutador(a),\n\nTenho grande entusiasmo em participar do Programa de Aprendizagem na ${vaga.empresaNome}. Busco conciliar a formação teórica de qualidade com o aprendizado prático no setor de ${vaga.bairro}. Comprometo-me com excelência nas atividades e excelente frequência escolar.\n\nCordialmente,\n${candidateName}`
      );
    }
    showToast('Modelo Aplicado', 'O texto da sua carta de apresentação foi preenchido com sucesso!', 'info');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setTimeout(() => {
        setUploadedFileName(file.name);
        setUploadedFileSize(`${(file.size / 1024).toFixed(0)} KB`);
        setIsUploading(false);
        showToast('Arquivo Carregado', `${file.name} anexado com sucesso!`, 'success');
      }, 600);
    }
  };

  const handleFinalSubmit = () => {
    if (resumeType === 'SEM_CURRICULO') {
      showToast('Atenção', 'Crie seu currículo antes de enviar ou selecione o Currículo SkillHub.', 'warning');
      return;
    }

    if (!consentLgpd) {
      showToast('Consentimento Obrigatório', 'Você deve aceitar o compartilhamento seguro de dados para enviar a candidatura.', 'warning');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const protocoloCode = `#CAND-2026-${Math.floor(10000 + Math.random() * 90000)}`;

      applyToJob(vaga.id, {
        curriculoTipo: resumeType === 'PDF_ANEXADO' ? 'PDF_ANEXADO' : 'CURRICULO_SKILLHUB',
        curriculoNomeArquivo: resumeType === 'PDF_ANEXADO' ? uploadedFileName : `Curriculo_${candidateName.replace(/\s+/g, '_')}_SkillHub.pdf`,
        cartaApresentacao: coverLetter,
        respostasTriagem: [
          { pergunta: 'Disponibilidade de início', resposta: disponibilidade },
          { pergunta: 'Acesso e transporte', resposta: transporte },
          { pergunta: 'Autorização de menor / idade', resposta: autorizacaoMenor }
        ]
      });

      setIsSubmitting(false);
      setGeneratedProtocol(protocoloCode);

      if (onSuccess) {
        onSuccess(protocoloCode);
      }
    }, 700);
  };

  const copyProtocol = () => {
    if (generatedProtocol) {
      navigator.clipboard.writeText(generatedProtocol);
      setCopied(true);
      showToast('Copiado!', 'Código do protocolo copiado para a área de transferência.', 'success');
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleClose = () => {
    setStep(1);
    setGeneratedProtocol(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div
        className="bg-[#110E1B] border border-purple-500/30 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-scaleUp"
        role="dialog"
        aria-modal="true"
      >
        {/* ========================================================================= */}
        {/* CABEÇALHO DO MODAL (DARK MODE SKILLHUB)                                    */}
        {/* ========================================================================= */}
        <div className="bg-[#160F28] border-b border-[#2D1B4E]/80 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
              <FileCheck className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>Protocolo de Candidatura</span>
                <span className="text-xs bg-purple-950/80 text-purple-300 px-2.5 py-0.5 rounded-full border border-purple-500/30 font-semibold">
                  IA Multiplataforma
                </span>
              </h2>
              <p className="text-xs text-zinc-300">
                {vaga.titulo} • <strong className="text-white">{vaga.empresaNome}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 text-zinc-400 hover:text-white bg-[#0F0C1D] hover:bg-purple-950/60 rounded-xl border border-[#2D1B4E] transition-all"
            aria-label="Fechar candidatura"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Indicador de Etapas */}
        {!generatedProtocol && (
          <div className="bg-[#0F0C1D] px-6 py-3 border-b border-[#2D1B4E]/60 flex items-center justify-between text-xs">
            {[
              { num: 1, label: 'Confirmação' },
              { num: 2, label: 'Currículo' },
              { num: 3, label: 'Carta' },
              { num: 4, label: 'Triagem' },
              { num: 5, label: 'Revisão' }
            ].map((s, idx) => (
              <React.Fragment key={s.num}>
                <div
                  className={`flex items-center gap-1.5 font-bold cursor-pointer transition-colors ${
                    step === s.num
                      ? 'text-purple-300'
                      : step > s.num
                      ? 'text-emerald-400'
                      : 'text-zinc-500'
                  }`}
                  onClick={() => s.num < step && setStep(s.num as any)}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] border ${
                      step === s.num
                        ? 'bg-purple-600 border-purple-400 text-white'
                        : step > s.num
                        ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                        : 'bg-[#18112C] border-[#2D1B4E] text-zinc-500'
                    }`}
                  >
                    {step > s.num ? <Check className="w-3 h-3 text-emerald-400" /> : s.num}
                  </span>
                  <span className="hidden sm:inline">{s.label}</span>
                </div>
                {idx < 4 && <span className="text-zinc-700">→</span>}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* CONTEÚDO DINÂMICO POR ETAPA                                               */}
        {/* ========================================================================= */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {/* SUCESSO: PROTOCOLO EMITIDO */}
          {generatedProtocol ? (
            <div className="text-center py-6 space-y-6 animate-scaleUp">
              <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto shadow-2xl shadow-emerald-500/20">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white">Candidatura Protocolada com Sucesso!</h3>
                <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                  Seus dados e currículo foram transmitidos com segurança para o RH de{' '}
                  <strong className="text-white font-bold">{vaga.empresaNome}</strong>.
                </p>
              </div>

              {/* Caixa de Protocolo Oficial */}
              <div className="bg-[#140E24] border border-purple-500/40 rounded-2xl p-5 max-w-md mx-auto text-left shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-purple-600 text-white font-black text-[10px] px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                  Oficial LGPD
                </div>

                <div className="text-[11px] text-zinc-400 uppercase font-bold tracking-wider mb-1">
                  Número de Protocolo Oficial:
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-2xl font-black text-purple-300 tracking-wider font-mono">
                    {generatedProtocol}
                  </span>
                  <button
                    onClick={copyProtocol}
                    className="flex items-center gap-1.5 bg-[#0F0C1D] hover:bg-purple-950/60 border border-purple-500/40 text-purple-300 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copiado' : 'Copiar'}</span>
                  </button>
                </div>

                <div className="mt-4 pt-3 border-t border-[#2D1B4E]/60 space-y-1.5 text-xs text-zinc-300">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Vaga:</span>
                    <strong className="text-white">{vaga.titulo}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Empresa:</span>
                    <strong className="text-white">{vaga.empresaNome}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Currículo Enviado:</span>
                    <strong className="text-purple-300">
                      {resumeType === 'PDF_ANEXADO' ? uploadedFileName : 'Currículo SkillHub Integrado'}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Data do Envio:</span>
                    <strong className="text-emerald-400">{new Date().toLocaleString('pt-BR')}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Status:</span>
                    <span className="bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-bold text-[10px]">
                      EM ANÁLISE PELO RH
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  onClick={handleClose}
                  className="bg-gradient-to-r from-purple-600 via-purple-700 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-bold px-8 py-3 rounded-xl text-sm shadow-xl transition-all hover:scale-105"
                >
                  Concluir e Voltar às Vagas
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* ========================================================================= */}
              {/* ETAPA 1: CONFIRMAÇÃO DOS DADOS DA VAGA E CANDIDATO                         */}
              {/* ========================================================================= */}
              {step === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="bg-[#140E24] border border-[#2D1B4E] rounded-2xl p-4 sm:p-5 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] bg-purple-950/80 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full font-bold uppercase">
                          {vaga.tipoVaga}
                        </span>
                        <h3 className="text-base font-black text-white mt-1.5">{vaga.titulo}</h3>
                        <p className="text-xs text-purple-300 font-semibold">{vaga.empresaNome}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] text-zinc-400 block">Salário / Bolsa:</span>
                        <div className="text-base font-black text-emerald-400">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(vaga.remuneracao)}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-300 leading-relaxed">{vaga.descricao}</p>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#2D1B4E]/60 text-zinc-300">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-rose-400" />
                        <span>Bairro: <strong className="text-white">{vaga.bairro}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-purple-400" />
                        <span>Jornada: <strong className="text-white">{vaga.horario}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#140E24] border border-[#2D1B4E] rounded-2xl p-4 sm:p-5 space-y-2">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Seus Dados Cadastrados no Perfil (SkillHub):</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-zinc-300 pt-1">
                      <div>Nome: <strong className="text-white">{candidateName}</strong></div>
                      <div>Bairro: <strong className="text-white">{candidateBairro} (Curitiba)</strong></div>
                      <div>Escolaridade: <strong className="text-white">{student.escolaridade}</strong></div>
                      <div>Turno Escolar: <strong className="text-purple-300">{student.turnoEscola}</strong></div>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* ETAPA 2: SELEÇÃO DE CURRÍCULO + REDIRECIONAMENTO INTELIGENTE              */}
              {/* ========================================================================= */}
              {step === 2 && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <h3 className="text-base font-bold text-white">Como deseja enviar seu currículo?</h3>
                    <p className="text-xs text-zinc-300 mt-1">
                      Selecione uma das opções abaixo para apresentar seu perfil à empresa:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Opção 1: Currículo SkillHub Integrado */}
                    <button
                      type="button"
                      onClick={() => setResumeType('CURRICULO_SKILLHUB')}
                      className={`text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                        resumeType === 'CURRICULO_SKILLHUB'
                          ? 'bg-[#18112C] border-purple-500 shadow-xl ring-2 ring-purple-500/30'
                          : 'bg-[#140E24] border-[#2D1B4E] hover:border-purple-500/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Sparkles className="w-5 h-5 text-purple-400" />
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            resumeType === 'CURRICULO_SKILLHUB' ? 'bg-purple-600 border-purple-400' : 'border-zinc-600'
                          }`}
                        >
                          {resumeType === 'CURRICULO_SKILLHUB' && <Check className="w-3 h-3 text-white" />}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">Currículo SkillHub Integrado</h4>
                        <p className="text-[11px] text-zinc-400 mt-1 leading-tight">
                          Gera documento com suas {student.badgesEarned.length} Badges e dados escolares.
                        </p>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 w-fit">
                        Recomendado
                      </span>
                    </button>

                    {/* Opção 2: Fazer Upload de Arquivo */}
                    <button
                      type="button"
                      onClick={() => setResumeType('PDF_ANEXADO')}
                      className={`text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                        resumeType === 'PDF_ANEXADO'
                          ? 'bg-[#18112C] border-purple-500 shadow-xl ring-2 ring-purple-500/30'
                          : 'bg-[#140E24] border-[#2D1B4E] hover:border-purple-500/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <UploadCloud className="w-5 h-5 text-blue-400" />
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            resumeType === 'PDF_ANEXADO' ? 'bg-purple-600 border-purple-400' : 'border-zinc-600'
                          }`}
                        >
                          {resumeType === 'PDF_ANEXADO' && <Check className="w-3 h-3 text-white" />}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">Upload de Arquivo Próprio</h4>
                        <p className="text-[11px] text-zinc-400 mt-1 leading-tight">
                          Anexe seu currículo em formato PDF, DOC ou DOCX.
                        </p>
                      </div>
                      <span className="text-[10px] text-zinc-400 font-medium">
                        Até 5 MB
                      </span>
                    </button>

                    {/* Opção 3: Ainda Não Tenho Currículo */}
                    <button
                      type="button"
                      onClick={() => setResumeType('SEM_CURRICULO')}
                      className={`text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                        resumeType === 'SEM_CURRICULO'
                          ? 'bg-[#18112C] border-rose-500/60 shadow-xl ring-2 ring-rose-500/30'
                          : 'bg-[#140E24] border-[#2D1B4E] hover:border-rose-500/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <AlertCircle className="w-5 h-5 text-amber-400" />
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            resumeType === 'SEM_CURRICULO' ? 'bg-amber-500 border-amber-400' : 'border-zinc-600'
                          }`}
                        >
                          {resumeType === 'SEM_CURRICULO' && <Check className="w-3 h-3 text-slate-950 font-bold" />}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">Ainda não tenho currículo</h4>
                        <p className="text-[11px] text-zinc-400 mt-1 leading-tight">
                          Preciso de ajuda para montar meu primeiro currículo.
                        </p>
                      </div>
                      <span className="text-[10px] text-amber-400 font-semibold">
                        Ajuda da IA
                      </span>
                    </button>
                  </div>

                  {/* Detalhes da Opção Selecionada */}
                  {resumeType === 'CURRICULO_SKILLHUB' && (
                    <div className="bg-[#140E24] border border-purple-500/40 rounded-2xl p-4 sm:p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-purple-400" />
                          <span>Currículo SkillHub Oficial Gerado Automaticamente</span>
                        </span>
                        <span className="text-[11px] text-emerald-400 font-bold">✓ Pronto para Envio</span>
                      </div>

                      <p className="text-xs text-zinc-300">
                        O recrutador receberá um documento padronizado contendo sua apresentação profissional, dados escolares ({student.escolaridade}) e a comprovação oficial de {student.badgesEarned.length} Badges validadas.
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {student.badgesEarned.map((b) => (
                          <span
                            key={b.badgeId}
                            className="text-[10px] font-semibold bg-purple-950/70 border border-purple-500/40 text-purple-200 px-2 py-0.5 rounded"
                          >
                            ✓ {b.badgeId.replace('badge-', '').replaceAll('-', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {resumeType === 'PDF_ANEXADO' && (
                    <div className="bg-[#140E24] border border-dashed border-purple-500/40 rounded-2xl p-5 text-center space-y-3">
                      <label className="cursor-pointer block">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <div className="w-12 h-12 rounded-full bg-purple-950/60 border border-purple-500/40 flex items-center justify-center text-purple-300 mx-auto mb-2 hover:scale-105 transition-transform">
                          <UploadCloud className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-white block">
                          Clique para escolher o arquivo do seu computador
                        </span>
                        <span className="text-[11px] text-zinc-400 block mt-0.5">
                          Suporta arquivos em PDF, DOCX até 5 MB
                        </span>
                      </label>

                      {isUploading ? (
                        <div className="flex items-center justify-center gap-2 text-xs text-purple-300 font-bold animate-pulse">
                          <span>Processando arquivo...</span>
                        </div>
                      ) : (
                        <div className="bg-[#0F0C1D] border border-emerald-500/40 rounded-xl p-3 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 text-white font-semibold">
                            <FileText className="w-4 h-4 text-emerald-400" />
                            <span>{uploadedFileName}</span>
                            <span className="text-zinc-500 text-[10px]">({uploadedFileSize})</span>
                          </div>
                          <span className="bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded font-bold">
                            Pronto para Envio
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* REDIRECIONAMENTO INTELIGENTE PARA O GERADOR DE CURRÍCULO */}
                  {resumeType === 'SEM_CURRICULO' && (
                    <div className="bg-purple-950/30 border border-purple-500/50 rounded-2xl p-5 space-y-4 animate-fadeIn">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-purple-600/30 border border-purple-400/50 flex items-center justify-center shrink-0 text-purple-300">
                          <Sparkles className="w-5 h-5 text-purple-300" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-white leading-snug">
                            Percebemos que você ainda não tem um currículo pronto. Vamos te ajudar a criar um currículo campeão agora!
                          </h4>
                          <p className="text-xs text-zinc-300 leading-relaxed">
                            Nosso gerador inteligente monta seu currículo automaticamente com base no seu perfil, dados escolares e as Badges oficiais que você conquistou. Leva menos de 2 minutos!
                          </p>
                        </div>
                      </div>

                      <div className="pt-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-[#2D1B4E]/60">
                        <a
                          href="/curriculo"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-purple-700 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-bold text-xs py-2.5 px-5 rounded-xl shadow-lg shadow-purple-950/40 transition-all hover:scale-105"
                        >
                          <span>Criar meu Currículo Agora</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        <span className="text-[11px] text-zinc-400">
                          💡 Abre em uma nova aba para você não perder esta vaga.
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ========================================================================= */}
              {/* ETAPA 3: CARTA DE APRESENTAÇÃO                                             */}
              {/* ========================================================================= */}
              {step === 3 && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <h3 className="text-base font-bold text-white">Carta de Apresentação Pessoal</h3>
                    <p className="text-xs text-zinc-300 mt-1">
                      Escreva ou personalize sua mensagem de apresentação para o RH da {vaga.empresaNome}:
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-purple-400" />
                      Modelos de 1 Clique para Inspirar:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => applyTemplate('PRIMEIRO_EMPREGO')}
                        className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#140E24] border border-[#2D1B4E] hover:border-purple-500/50 text-zinc-300 hover:text-white transition-all"
                      >
                        🚀 Primeiro Emprego
                      </button>
                      <button
                        type="button"
                        onClick={() => applyTemplate('APRENDIZ')}
                        className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#140E24] border border-[#2D1B4E] hover:border-purple-500/50 text-zinc-300 hover:text-white transition-all"
                      >
                        🛡️ Jovem Aprendiz
                      </button>
                      <button
                        type="button"
                        onClick={() => applyTemplate('ESTAGIO')}
                        className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#140E24] border border-[#2D1B4E] hover:border-purple-500/50 text-zinc-300 hover:text-white transition-all"
                      >
                        💼 Estágio Técnico/Superior
                      </button>
                    </div>
                  </div>

                  <textarea
                    rows={6}
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Escreva sua carta de apresentação..."
                    className="w-full bg-[#140E24] border border-[#2D1B4E] rounded-2xl p-4 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors leading-relaxed"
                  />
                </div>
              )}

              {/* ========================================================================= */}
              {/* ETAPA 4: PERGUNTAS DE TRIAGEM                                              */}
              {/* ========================================================================= */}
              {step === 4 && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <h3 className="text-base font-bold text-white">Perguntas de Triagem do RH</h3>
                    <p className="text-xs text-zinc-300 mt-1">
                      Responda para agilizar a análise do recrutador da {vaga.empresaNome}:
                    </p>
                  </div>

                  <div className="space-y-3.5">
                    <div className="bg-[#140E24] border border-[#2D1B4E] rounded-2xl p-4 space-y-2">
                      <label className="text-xs font-bold text-white block">
                        1. Qual a sua disponibilidade para início das atividades?
                      </label>
                      <select
                        value={disponibilidade}
                        onChange={(e) => setDisponibilidade(e.target.value)}
                        className="w-full bg-[#0F0C1D] border border-[#2D1B4E] rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-purple-500"
                      >
                        <option value="Imediata (próximos dias)">Imediata (nos próximos dias)</option>
                        <option value="Em até 15 dias">Em até 15 dias</option>
                        <option value="Início no próximo mês letivo">Início no próximo mês letivo</option>
                      </select>
                    </div>

                    <div className="bg-[#140E24] border border-[#2D1B4E] rounded-2xl p-4 space-y-2">
                      <label className="text-xs font-bold text-white block">
                        2. Você possui facilidade de deslocamento até o bairro {vaga.bairro}?
                      </label>
                      <select
                        value={transporte}
                        onChange={(e) => setTransporte(e.target.value)}
                        className="w-full bg-[#0F0C1D] border border-[#2D1B4E] rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-purple-500"
                      >
                        <option value="Sim, fácil acesso via transporte público de Curitiba / RMC">
                          Sim, fácil acesso via transporte público (URBS / Metrocard)
                        </option>
                        <option value="Moro no mesmo bairro ou próximo">
                          Moro no mesmo bairro ou bem próximo
                        </option>
                        <option value="Possuo veículo ou carona própria">
                          Possuo transporte próprio / carona
                        </option>
                      </select>
                    </div>

                    <div className="bg-[#140E24] border border-[#2D1B4E] rounded-2xl p-4 space-y-2">
                      <label className="text-xs font-bold text-white block">
                        3. Se menor de 18 anos, seu responsável legal está ciente da candidatura?
                      </label>
                      <select
                        value={autorizacaoMenor}
                        onChange={(e) => setAutorizacaoMenor(e.target.value)}
                        className="w-full bg-[#0F0C1D] border border-[#2D1B4E] rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-purple-500"
                      >
                        <option value="Sim, responsável informado e ciente">
                          Sim, responsável legal devidamente ciente
                        </option>
                        <option value="Já possuo 18 anos completos">
                          Já possuo 18 anos ou mais
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* ETAPA 5: REVISÃO FINAL & ENVIO COM TERMO LGPD                              */}
              {/* ========================================================================= */}
              {step === 5 && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <h3 className="text-base font-bold text-white">Revisão Final da Candidatura</h3>
                    <p className="text-xs text-zinc-300 mt-1">
                      Verifique as informações antes de transmitir ao recrutador:
                    </p>
                  </div>

                  <div className="bg-[#140E24] border border-[#2D1B4E] rounded-2xl p-4 sm:p-5 space-y-2.5 text-xs text-zinc-300">
                    <div className="flex justify-between border-b border-[#2D1B4E]/60 pb-2">
                      <span className="text-zinc-400">Vaga Selecionada:</span>
                      <strong className="text-white">{vaga.titulo}</strong>
                    </div>
                    <div className="flex justify-between border-b border-[#2D1B4E]/60 pb-2">
                      <span className="text-zinc-400">Empresa Contratante:</span>
                      <strong className="text-white">{vaga.empresaNome}</strong>
                    </div>
                    <div className="flex justify-between border-b border-[#2D1B4E]/60 pb-2">
                      <span className="text-zinc-400">Candidato(a):</span>
                      <strong className="text-white">{candidateName} ({candidateBairro})</strong>
                    </div>
                    <div className="flex justify-between border-b border-[#2D1B4E]/60 pb-2">
                      <span className="text-zinc-400">Currículo Selecionado:</span>
                      <strong className="text-purple-300">
                        {resumeType === 'PDF_ANEXADO' ? uploadedFileName : 'Currículo SkillHub Integrado'}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Remuneração Inicial:</span>
                      <strong className="text-emerald-400">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(vaga.remuneracao)}
                      </strong>
                    </div>
                  </div>

                  {/* Termo LGPD */}
                  <div className="bg-[#0F0C1D] border border-purple-500/30 rounded-2xl p-4 space-y-2">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consentLgpd}
                        onChange={(e) => setConsentLgpd(e.target.checked)}
                        className="w-4 h-4 rounded mt-0.5 accent-purple-600 cursor-pointer"
                      />
                      <span className="text-xs text-zinc-300 leading-relaxed">
                        Autorizo o compartilhamento seguro dos meus dados profissionais e escolares com a empresa{' '}
                        <strong className="text-white font-semibold">{vaga.empresaNome}</strong> estritamente para fins de processo seletivo, em conformidade com a LGPD e Proteção de Dados de Menores.
                      </span>
                    </label>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* ========================================================================= */}
        {/* RODAPÉ DO MODAL (BOTÕES DE NAVEGAÇÃO)                                     */}
        {/* ========================================================================= */}
        {!generatedProtocol && (
          <div className="bg-[#160F28] border-t border-[#2D1B4E]/80 p-4 sm:p-5 flex items-center justify-between gap-3">
            <div>
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => (s - 1) as any)}
                  className="px-4 py-2.5 rounded-xl bg-[#0F0C1D] border border-[#2D1B4E] hover:border-purple-500/50 text-zinc-300 hover:text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Voltar</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2.5 rounded-xl bg-[#0F0C1D] border border-[#2D1B4E] hover:border-purple-500/50 text-zinc-400 hover:text-white font-bold text-xs transition-colors"
                >
                  Cancelar
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500 mr-2 hidden sm:inline">
                Etapa {step} de 5
              </span>

              {step < 5 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (step === 2 && resumeType === 'SEM_CURRICULO') {
                      showToast('Atenção', 'Crie seu currículo pelo botão acima ou selecione o Currículo SkillHub.', 'warning');
                      return;
                    }
                    setStep((s) => (s + 1) as any);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-purple-700 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-bold text-xs shadow-lg shadow-purple-950/40 flex items-center gap-1.5 transition-all hover:scale-105"
                >
                  <span>Avançar</span>
                  <ArrowRight className="w-3.5 h-3.5 text-purple-200" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting || !consentLgpd}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-purple-700 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-bold text-xs shadow-lg shadow-purple-950/40 flex items-center gap-2 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span>Enviando Candidatura...</span>
                  ) : (
                    <>
                      <span>Transmitir Candidatura</span>
                      <Check className="w-4 h-4 text-purple-200" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
