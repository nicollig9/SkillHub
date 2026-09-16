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
  Download, 
  AlertCircle,
  FileCheck,
  HelpCircle,
  DollarSign
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
  const [resumeType, setResumeType] = useState<'PDF_ANEXADO' | 'CURRICULO_SKILLHUB'>('PDF_ANEXADO');
  const [uploadedFileName, setUploadedFileName] = useState<string>('Meu_Curriculo_2026.pdf');
  const [uploadedFileSize, setUploadedFileSize] = useState<string>('245 KB');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  
  const [coverLetter, setCoverLetter] = useState<string>(
    `Olá! Tenho grande interesse na oportunidade de ${vaga?.titulo || 'trabalho'} na ${vaga?.empresaNome || 'empresa'}. Sou dedicado(a), pontual e tenho muita vontade de aprender e contribuir com a equipe!`
  );

  // Perguntas de triagem estilo Indeed
  const [disponibilidade, setDisponibilidade] = useState<string>('Imediata (próximos dias)');
  const [transporte, setTransporte] = useState<string>('Sim, fácil acesso via transporte público de Curitiba / RMC');
  const [autorizacaoMenor, setAutorizacaoMenor] = useState<string>('Sim, responsável informado e ciente');
  
  const [consentLgpd, setConsentLgpd] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [generatedProtocol, setGeneratedProtocol] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen || !vaga) return null;

  const candidateName = currentUser?.nome || student.nome || 'Nicoli Silva';
  const candidateBairro = currentUser?.bairro || student.endereco.bairro || 'Boqueirão';

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
    if (!consentLgpd) {
      showToast('Consentimento Obrigatório', 'Você deve aceitar o compartilhamento seguro de dados para enviar a candidatura.', 'warning');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const protocoloCode = `#CAND-2026-${Math.floor(10000 + Math.random() * 90000)}`;

      applyToJob(vaga.id, {
        curriculoTipo: resumeType,
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
    }, 800);
  };

  const copyProtocol = () => {
    if (generatedProtocol) {
      navigator.clipboard.writeText(generatedProtocol);
      setCopied(true);
      showToast('Copiado!', 'Código do protocolo copiado para a área de transferência.', 'success');
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#150B25] border-2 border-[#7C3AED]/60 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header do Modal */}
        <div className="bg-gradient-to-r from-[#2A114D] via-[#3E1674] to-[#581C87] border-b border-[#7C3AED]/40 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-[#1A0B2E] font-black shadow-lg">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <span>Protocolo de Candidatura</span>
                <span className="text-xs bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/40">
                  Estilo Indeed
                </span>
              </h2>
              <p className="text-xs text-purple-200">
                {vaga.titulo} • <strong className="text-white">{vaga.empresaNome}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-purple-300 hover:text-white hover:bg-white/10 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Indicador de Etapas */}
        {!generatedProtocol && (
          <div className="bg-[#10061D] px-6 py-3 border-b border-[#4C1D95]/40 flex items-center justify-between text-xs">
            <div className={`flex items-center gap-1.5 font-bold ${step >= 1 ? 'text-amber-400' : 'text-purple-400'}`}>
              <span className="w-5 h-5 rounded-full bg-[#2A114D] border border-amber-400/50 flex items-center justify-center text-[10px]">1</span>
              <span className="hidden sm:inline">Vaga</span>
            </div>
            <span className="text-purple-600">→</span>

            <div className={`flex items-center gap-1.5 font-bold ${step >= 2 ? 'text-amber-400' : 'text-purple-400'}`}>
              <span className="w-5 h-5 rounded-full bg-[#2A114D] border border-amber-400/50 flex items-center justify-center text-[10px]">2</span>
              <span className="hidden sm:inline">Currículo</span>
            </div>
            <span className="text-purple-600">→</span>

            <div className={`flex items-center gap-1.5 font-bold ${step >= 3 ? 'text-amber-400' : 'text-purple-400'}`}>
              <span className="w-5 h-5 rounded-full bg-[#2A114D] border border-amber-400/50 flex items-center justify-center text-[10px]">3</span>
              <span className="hidden sm:inline">Carta</span>
            </div>
            <span className="text-purple-600">→</span>

            <div className={`flex items-center gap-1.5 font-bold ${step >= 4 ? 'text-amber-400' : 'text-purple-400'}`}>
              <span className="w-5 h-5 rounded-full bg-[#2A114D] border border-amber-400/50 flex items-center justify-center text-[10px]">4</span>
              <span className="hidden sm:inline">Triagem</span>
            </div>
            <span className="text-purple-600">→</span>

            <div className={`flex items-center gap-1.5 font-bold ${step >= 5 ? 'text-amber-400' : 'text-purple-400'}`}>
              <span className="w-5 h-5 rounded-full bg-[#2A114D] border border-amber-400/50 flex items-center justify-center text-[10px]">5</span>
              <span className="hidden sm:inline">Enviar</span>
            </div>
          </div>
        )}

        {/* Conteúdo Dinâmico por Etapa */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* ========================================================================= */}
          {/* TELA DE SUCESSO: PROTOCOLO EMITIDO                                         */}
          {/* ========================================================================= */}
          {generatedProtocol ? (
            <div className="text-center py-6 space-y-6 animate-scaleUp">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 mx-auto shadow-2xl shadow-emerald-500/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white">Candidatura Protocolada com Sucesso!</h3>
                <p className="text-sm text-purple-200 max-w-md mx-auto">
                  Seus dados e currículo foram enviados com segurança para o departamento de Recursos Humanos da <strong className="text-amber-300">{vaga.empresaNome}</strong>.
                </p>
              </div>

              {/* Caixa de Protocolo Oficial */}
              <div className="bg-[#1A0B2E] border-2 border-amber-400/60 rounded-2xl p-5 max-w-md mx-auto text-left shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-amber-400 text-slate-950 font-black text-[10px] px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                  Oficial LGPD
                </div>

                <div className="text-[11px] text-purple-300 uppercase font-bold tracking-wider mb-1">
                  Número de Protocolo Oficial:
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-2xl font-black text-amber-300 tracking-wider font-mono">
                    {generatedProtocol}
                  </span>
                  <button
                    onClick={copyProtocol}
                    className="flex items-center gap-1.5 bg-[#2A114D] hover:bg-[#3E1674] border border-amber-400/40 text-amber-300 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copiado' : 'Copiar'}</span>
                  </button>
                </div>

                <div className="mt-4 pt-3 border-t border-[#4C1D95]/40 space-y-1.5 text-xs text-purple-200">
                  <div className="flex justify-between">
                    <span>Vaga Pretendida:</span>
                    <strong className="text-white">{vaga.titulo}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Empresa:</span>
                    <strong className="text-white">{vaga.empresaNome}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Polo / Bairro:</span>
                    <strong className="text-white">{vaga.bairro} (Curitiba)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Currículo Anexado:</span>
                    <strong className="text-amber-300">
                      {resumeType === 'PDF_ANEXADO' ? uploadedFileName : 'Currículo SkillHub Validado'}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Data do Registro:</span>
                    <strong className="text-emerald-400">{new Date().toLocaleString('pt-BR')}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Status Inicial:</span>
                    <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold text-[10px]">
                      EM ANÁLISE PELO RH
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    showToast('Comprovante Gerado', 'O comprovante do protocolo foi salvo no seu histórico.', 'info');
                    onClose();
                  }}
                  className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black px-6 py-3 rounded-xl text-sm shadow-xl transition-all"
                >
                  Concluir e Voltar às Vagas
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* ETAPA 1 */}
              {step === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="bg-[#1C0E33] border border-[#7C3AED]/40 rounded-2xl p-4 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] bg-purple-900/60 text-purple-200 px-2 py-0.5 rounded-full font-bold uppercase">
                          {vaga.tipoVaga}
                        </span>
                        <h3 className="text-base font-black text-white mt-1">{vaga.titulo}</h3>
                        <p className="text-xs text-amber-300 font-bold">{vaga.empresaNome}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-purple-300">Bolsa / Salário:</span>
                        <div className="text-base font-black text-emerald-400">
                          R$ {vaga.remuneracao.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-purple-200">{vaga.descricao}</p>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-purple-900/40">
                      <div className="flex items-center gap-1.5 text-purple-300">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>Bairro: <strong>{vaga.bairro}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5 text-purple-300">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>Jornada: <strong>{vaga.cargaHorariaDiaria}h/dia ({vaga.horario})</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#120722] border border-[#4C1D95]/40 rounded-2xl p-4 space-y-2">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Seus Dados de Contato Cadastrados:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-purple-200">
                      <div>Nome: <strong className="text-white">{candidateName}</strong></div>
                      <div>Bairro Residencial: <strong className="text-white">{candidateBairro} (Curitiba)</strong></div>
                      <div>Escolaridade: <strong className="text-white">{student.escolaridade}</strong></div>
                      <div>Turno Escolar: <strong className="text-amber-300">{student.turnoEscola}</strong></div>
                    </div>
                  </div>
                </div>
              )}

              {/* ETAPA 2 */}
              {step === 2 && (
                <div className="space-y-5 animate-fadeIn">
                  <div>
                    <h3 className="text-base font-bold text-white">Como deseja enviar seu currículo?</h3>
                    <p className="text-xs text-purple-200 mt-0.5">
                      Você pode fazer upload de um arquivo PDF/Documento do seu computador ou usar o currículo automático gerado pelo SkillHub.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      onClick={() => setResumeType('PDF_ANEXADO')}
                      className={`cursor-pointer rounded-2xl p-4 border-2 transition-all ${
                        resumeType === 'PDF_ANEXADO'
                          ? 'bg-[#2A114D] border-amber-400 shadow-xl'
                          : 'bg-[#150B25] border-[#4C1D95]/50 hover:border-purple-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <UploadCloud className="w-6 h-6 text-amber-400" />
                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          resumeType === 'PDF_ANEXADO' ? 'bg-amber-400 border-amber-400' : 'border-purple-400'
                        }`}>
                          {resumeType === 'PDF_ANEXADO' && <Check className="w-3 h-3 text-slate-950" />}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white">Fazer Upload de Arquivo</h4>
                      <p className="text-xs text-purple-300 mt-1">
                        Anexe seu currículo em formato PDF, DOC ou DOCX.
                      </p>
                    </div>

                    <div
                      onClick={() => setResumeType('CURRICULO_SKILLHUB')}
                      className={`cursor-pointer rounded-2xl p-4 border-2 transition-all ${
                        resumeType === 'CURRICULO_SKILLHUB'
                          ? 'bg-[#2A114D] border-amber-400 shadow-xl'
                          : 'bg-[#150B25] border-[#4C1D95]/50 hover:border-purple-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Sparkles className="w-6 h-6 text-[#8B5CF6]" />
                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          resumeType === 'CURRICULO_SKILLHUB' ? 'bg-amber-400 border-amber-400' : 'border-purple-400'
                        }`}>
                          {resumeType === 'CURRICULO_SKILLHUB' && <Check className="w-3 h-3 text-slate-950" />}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white">Currículo SkillHub Oficial</h4>
                      <p className="text-xs text-purple-300 mt-1">
                        Gera documento com suas Badges validadas e dados escolares.
                      </p>
                    </div>
                  </div>

                  {resumeType === 'PDF_ANEXADO' ? (
                    <div className="bg-[#120722] border border-dashed border-[#7C3AED]/60 rounded-2xl p-5 text-center space-y-3">
                      <label className="cursor-pointer block">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <div className="w-12 h-12 rounded-full bg-[#2A114D] border border-amber-400/40 flex items-center justify-center text-amber-300 mx-auto mb-2 hover:scale-105 transition-transform">
                          <UploadCloud className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-white block">
                          Clique para escolher um arquivo do seu computador
                        </span>
                        <span className="text-[11px] text-purple-300 block mt-0.5">
                          Suporta PDF, DOCX até 5 MB
                        </span>
                      </label>

                      {isUploading ? (
                        <div className="flex items-center justify-center gap-2 text-xs text-amber-300 font-bold animate-pulse">
                          <span>Carregando arquivo...</span>
                        </div>
                      ) : (
                        <div className="bg-[#1C0E33] border border-emerald-500/40 rounded-xl p-3 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 text-white font-semibold">
                            <FileText className="w-4 h-4 text-emerald-400" />
                            <span>{uploadedFileName}</span>
                            <span className="text-purple-400 text-[10px]">({uploadedFileSize})</span>
                          </div>
                          <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded font-bold">
                            Pronto para Envio
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-[#1C0E33] border border-[#8B5CF6]/50 rounded-2xl p-4 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                        <Sparkles className="w-4 h-4" />
                        <span>Visualização do Currículo SkillHub:</span>
                      </div>
                      <p className="text-xs text-purple-200">
                        O recrutador receberá seu currículo estruturado com seus dados escolares, histórico de {student.badgesEarned.length} Badges oficiais e garantia de autenticidade.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* ETAPA 3 */}
              {step === 3 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white">Carta de Apresentação Pessoal</h3>
                      <p className="text-xs text-purple-200">
                        Destaque por que você quer trabalhar na {vaga.empresaNome}.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Modelos de 1 Clique para Inspirar:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => applyTemplate('PRIMEIRO_EMPREGO')}
                        className="bg-[#24123E] hover:bg-[#381B5E] border border-purple-500/40 text-purple-200 hover:text-white px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
                      >
                        🚀 1º Emprego / Sem Experiência
                      </button>
                      <button
                        type="button"
                        onClick={() => applyTemplate('APRENDIZ')}
                        className="bg-[#24123E] hover:bg-[#381B5E] border border-purple-500/40 text-purple-200 hover:text-white px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
                      >
                        🛡️ Jovem Aprendiz
                      </button>
                      <button
                        type="button"
                        onClick={() => applyTemplate('ESTAGIO')}
                        className="bg-[#24123E] hover:bg-[#381B5E] border border-purple-500/40 text-purple-200 hover:text-white px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
                      >
                        💼 Estágio Técnico/Superior
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <textarea
                      rows={6}
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      placeholder="Escreva uma breve mensagem se apresentando ao recrutador..."
                      className="w-full bg-[#10061D] border border-[#7C3AED]/50 rounded-2xl p-3.5 text-xs text-white placeholder-purple-400/60 focus:outline-none focus:border-amber-400 font-sans leading-relaxed"
                    />
                    <div className="flex justify-between text-[10px] text-purple-400">
                      <span>Dica: Mencione sua pontualidade e facilidade de lidar com pessoas.</span>
                      <span>{coverLetter.length} caracteres</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ETAPA 4 */}
              {step === 4 && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <h3 className="text-base font-bold text-white">Perguntas de Triagem da Empresa</h3>
                    <p className="text-xs text-purple-200">
                      A <strong className="text-white">{vaga.empresaNome}</strong> solicita a confirmação dos seguintes itens:
                    </p>
                  </div>

                  <div className="bg-[#1C0E33] border border-[#4C1D95]/40 rounded-2xl p-4 space-y-2">
                    <label className="text-xs font-bold text-amber-300 block">
                      1. Qual sua disponibilidade para início das atividades?
                    </label>
                    <select
                      value={disponibilidade}
                      onChange={(e) => setDisponibilidade(e.target.value)}
                      className="w-full bg-[#10061D] border border-[#7C3AED]/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Imediata (próximos dias)">Imediata (próximos dias)</option>
                      <option value="Em até 1 semana">Em até 1 semana</option>
                      <option value="Em até 15 dias">Em até 15 dias</option>
                      <option value="A combinar conforme período escolar">A combinar conforme período escolar</option>
                    </select>
                  </div>

                  <div className="bg-[#1C0E33] border border-[#4C1D95]/40 rounded-2xl p-4 space-y-2">
                    <label className="text-xs font-bold text-amber-300 block">
                      2. Você tem facilidade de deslocamento até o bairro <u>{vaga.bairro}</u>?
                    </label>
                    <select
                      value={transporte}
                      onChange={(e) => setTransporte(e.target.value)}
                      className="w-full bg-[#10061D] border border-[#7C3AED]/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Sim, fácil acesso via transporte público de Curitiba / RMC">
                        Sim, fácil acesso via transporte público de Curitiba / RMC
                      </option>
                      <option value="Sim, resido no mesmo bairro ou proximidades">
                        Sim, resido no mesmo bairro ou proximidades
                      </option>
                      <option value="Sim, utilizo condução própria / carona">
                        Sim, utilizo condução própria / carona
                      </option>
                    </select>
                  </div>

                  <div className="bg-[#1C0E33] border border-[#4C1D95]/40 rounded-2xl p-4 space-y-2">
                    <label className="text-xs font-bold text-amber-300 block">
                      3. Confirmação de Idade & Autorização do Responsável:
                    </label>
                    <select
                      value={autorizacaoMenor}
                      onChange={(e) => setAutorizacaoMenor(e.target.value)}
                      className="w-full bg-[#10061D] border border-[#7C3AED]/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Sim, responsável informado e ciente">
                        Sim, responsável legal informado e ciente da candidatura
                      </option>
                      <option value="Tenho 18 anos ou mais">
                        Tenho 18 anos ou mais (maioridade civil)
                      </option>
                    </select>
                  </div>
                </div>
              )}

              {/* ETAPA 5 */}
              {step === 5 && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <h3 className="text-base font-bold text-white">Revisão Final da Candidatura</h3>
                    <p className="text-xs text-purple-200">
                      Confira todos os itens antes de emitir o protocolo oficial.
                    </p>
                  </div>

                  <div className="bg-[#1A0B2E] border border-purple-900/50 rounded-2xl p-4 space-y-2 text-xs text-purple-200">
                    <div className="flex justify-between">
                      <span>Candidato:</span>
                      <strong className="text-white">{candidateName}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Vaga:</span>
                      <strong className="text-white">{vaga.titulo}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Empresa:</span>
                      <strong className="text-white">{vaga.empresaNome}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Modalidade de Currículo:</span>
                      <strong className="text-amber-300">
                        {resumeType === 'PDF_ANEXADO' ? uploadedFileName : 'Currículo Oficial SkillHub'}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Disponibilidade:</span>
                      <strong className="text-emerald-400">{disponibilidade}</strong>
                    </div>
                  </div>

                  <label className="flex items-start gap-3 bg-[#120722] border border-amber-400/40 rounded-2xl p-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consentLgpd}
                      onChange={(e) => setConsentLgpd(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded text-amber-400 bg-[#10061D] border-purple-500 focus:ring-amber-400"
                    />
                    <div className="text-xs text-purple-200">
                      <strong className="text-white block mb-0.5">Autorização de Tratamento de Dados (LGPD):</strong>
                      Declaro que autorizo o compartilhamento seguro do meu currículo, dados de contato e histórico escolar exclusivamente com os recrutadores da <strong>{vaga.empresaNome}</strong> para fins desta seleção, sem cobrança de nenhuma taxa.
                    </div>
                  </label>
                </div>
              )}
            </>
          )}

        </div>

        {/* Footer com Botões de Navegação */}
        {!generatedProtocol && (
          <div className="bg-[#10061D] border-t border-[#4C1D95]/40 p-4 px-6 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => (prev - 1) as any)}
                className="flex items-center gap-1.5 text-xs font-bold text-purple-300 hover:text-white px-3 py-2 rounded-xl transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-bold text-purple-400 hover:text-white px-3 py-2 rounded-xl transition-all"
              >
                Cancelar
              </button>
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => (prev + 1) as any)}
                className="flex items-center gap-1.5 bg-[#6D28D9] hover:bg-[#7C3AED] text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-lg transition-all"
              >
                <span>Avançar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleFinalSubmit}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs shadow-xl transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Emitindo Protocolo...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirmar e Emitir Protocolo</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
