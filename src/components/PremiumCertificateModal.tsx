'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Course } from '@/types';
import { 
  generateCertificateCode, 
  getLinkedInShareUrl, 
  generateQrCodeDataUrl 
} from '@/utils/certificateUtils';
import { 
  Award, 
  CheckCircle2, 
  Clock, 
  Download, 
  Printer, 
  RotateCw, 
  ShieldCheck, 
  Sparkles, 
  X, 
  QrCode, 
  GraduationCap, 
  BookOpen, 
  Layers, 
  Copy, 
  Check, 
  Share2,
  ExternalLink
} from 'lucide-react';

interface PremiumCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
  studentName: string;
  score?: number;
  issueDate?: string;
  validationCode?: string;
  isFirstEarned?: boolean;
}

export default function PremiumCertificateModal({
  isOpen,
  onClose,
  course,
  studentName,
  score = 100,
  issueDate,
  validationCode,
  isFirstEarned = false
}: PremiumCertificateModalProps) {
  const [currentSide, setCurrentSide] = useState<'front' | 'back'>('front');
  const [showConfetti, setShowConfetti] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [originUrl, setOriginUrl] = useState<string>('https://skillhub.com.br');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sincroniza origin da janela
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOriginUrl(window.location.origin);
    }
  }, []);

  // Formatação de data em pt-BR (ex: "24 de novembro de 2026")
  const formattedDate = React.useMemo(() => {
    if (issueDate) return issueDate;
    try {
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }).format(new Date());
    } catch {
      return new Date().toLocaleDateString('pt-BR');
    }
  }, [issueDate]);

  // Código de validação determinístico no formato SH-2026-[HASH]
  const authCode = React.useMemo(() => {
    if (validationCode && validationCode.startsWith('SH-2026-')) {
      return validationCode;
    }
    return generateCertificateCode(course?.id || '', studentName);
  }, [validationCode, course?.id, studentName]);

  // URL pública de validação
  const validationUrl = React.useMemo(() => {
    return `${originUrl}/validar/${authCode}`;
  }, [originUrl, authCode]);

  // URL de compartilhamento oficial no LinkedIn
  const linkedinUrl = React.useMemo(() => {
    return getLinkedInShareUrl({
      courseTitle: course?.title || 'Formação Profissional',
      code: authCode,
      validationUrl,
      issueYear: 2026,
      issueMonth: 11
    });
  }, [course?.title, authCode, validationUrl]);

  // Geração do QR Code em alta resolução
  useEffect(() => {
    let isMounted = true;
    generateQrCodeDataUrl(validationUrl).then((url) => {
      if (isMounted && url) {
        setQrCodeDataUrl(url);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [validationUrl]);

  // Efeito de celebração leve no cliente
  useEffect(() => {
    if (isOpen && isFirstEarned) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isFirstEarned]);

  // Copiar código de autenticidade para a área de transferência
  const handleCopyCode = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(authCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  // Confetes em Canvas leve (sem bibliotecas externas)
  useEffect(() => {
    if (!showConfetti || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: {
      x: number;
      y: number;
      r: number;
      d: number;
      color: string;
      tilt: number;
      tiltAngleIncremental: number;
      tiltAngle: number;
    }[] = [];

    const colors = ['#F59E0B', '#10B981', '#8B5CF6', '#EC4899', '#3B82F6', '#FBBF24', '#34D399'];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        r: Math.random() * 6 + 3,
        d: Math.random() * 90 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngleIncremental: Math.random() * 0.07 + 0.05,
        tiltAngle: 0
      });
    }

    const startTime = Date.now();

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      const elapsed = Date.now() - startTime;
      const opacity = elapsed > 3800 ? Math.max(0, 1 - (elapsed - 3800) / 1700) : 1;
      ctx.globalAlpha = opacity;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += (Math.cos(p.d) + 3 + p.r / 2) * 0.85;
        p.x += Math.sin(p.d);
        p.tilt = Math.sin(p.tiltAngle - i / 3) * 15;

        ctx.beginPath();
        ctx.lineWidth = p.r / 2;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
        ctx.stroke();

        if (p.y > height) {
          p.x = Math.random() * width;
          p.y = -20;
        }
      }

      if (opacity > 0) {
        animationFrameId = requestAnimationFrame(draw);
      }
    }

    draw();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [showConfetti]);

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  // Extração das competências do curso
  const skillsList: string[] = course.learningObjectives && course.learningObjectives.length > 0
    ? course.learningObjectives
    : [
        `Competências práticas em ${course.title}`,
        'Resolução de problemas e análise crítica aplicada',
        'Postura ética e alinhamento com a cultura corporativa',
        'Comunicação interpessoal assertiva no ambiente de trabalho',
        'Uso eficiente de ferramentas e métodos modernos'
      ];

  return (
    <>
      {/* Canvas de Celebração */}
      {showConfetti && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-[120] print:hidden"
        />
      )}

      {/* Estilos dedicados para impressão e rotação 3D */}
      <style jsx global>{`
        @media print {
          html, body {
            background: #000000 !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          header, aside, nav, footer, #nprogress, .print\\:hidden {
            display: none !important;
          }
          @page {
            size: A4 landscape;
            margin: 0;
          }
          .certificate-screen-modal {
            display: none !important;
          }
          .certificate-print-sheet {
            display: flex !important;
            width: 297mm !important;
            height: 210mm !important;
            page-break-after: always;
            break-after: page;
            box-sizing: border-box;
            padding: 10mm !important;
            background: #080413 !important;
            color: #ffffff !important;
          }
          .certificate-print-back {
            page-break-before: always;
            break-before: page;
          }
        }

        @media screen {
          .certificate-print-sheet {
            display: none !important;
          }
        }

        .perspective-1200 {
          perspective: 1200px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>

      {/* ========================================================================= */}
      {/* 1. MODAL INTERATIVO EM TELA (TELA DO ALUNO COM FLIP 3D)                    */}
      {/* ========================================================================= */}
      <div 
        onClick={onClose}
        className="certificate-screen-modal fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto animate-in fade-in duration-200"
      >
        <div 
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl bg-[#0c0719]/95 border border-purple-500/30 rounded-3xl shadow-2xl p-4 sm:p-6 text-white relative my-auto space-y-4 max-h-[96vh] flex flex-col justify-between"
        >
          {/* BARRA SUPERIOR DE CONTROLES */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10 print:hidden">
            {/* Título & Badge */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 font-black flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                  <span>Certificado Digital Oficial</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-semibold uppercase">
                    Homologado
                  </span>
                </h2>
                <p className="text-[11px] text-slate-400">
                  Emitido por SkillHub • Curitiba &amp; Região Metropolitana
                </p>
              </div>
            </div>

            {/* Ações: Alternar Frente/Verso, LinkedIn, Imprimir, Fechar */}
            <div className="flex flex-wrap items-center gap-2">
              
              {/* Botão de Toggle Frente / Verso */}
              <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-0.5">
                <button
                  type="button"
                  onClick={() => setCurrentSide('front')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    currentSide === 'front'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Frente</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentSide('back')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    currentSide === 'back'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Verso (Ementa &amp; Skills)</span>
                </button>
              </div>

              {/* Botão 1-Clique: Adicionar ao Perfil do LinkedIn */}
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-[#0077B5] hover:bg-[#006396] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-blue-900/30 cursor-pointer"
                title="Adicionar Certificado ao LinkedIn em 1 Clique"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Adicionar ao LinkedIn</span>
              </a>

              {/* Botão de Impressão / PDF */}
              <button
                type="button"
                onClick={handlePrint}
                className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-purple-900/40 cursor-pointer"
                title="Salvar em PDF ou Imprimir Diploma A4 Paisagem"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Imprimir PDF</span>
              </button>

              {/* Botão Fechar */}
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition cursor-pointer"
                title="Fechar (ESC)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ÁREA DO CERTIFICADO COM FLIP 3D EM TELA */}
          <div className="relative w-full overflow-y-auto max-h-[72vh] p-1 sm:p-2 custom-scrollbar">
            <div className="perspective-1200 w-full">
              <div 
                className={`relative w-full transition-transform duration-700 transform-style-3d ${
                  currentSide === 'back' ? 'rotate-y-180' : ''
                }`}
                style={{ minHeight: '520px' }}
              >
                {/* ============================================================== */}
                {/* FACE 1: FRENTE DO CERTIFICADO                                   */}
                {/* ============================================================== */}
                <div 
                  className={`w-full rounded-2xl border-2 border-amber-500/40 bg-gradient-to-b from-[#140b2a] via-[#0e071e] to-[#080413] p-5 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between text-center select-none backface-hidden ${
                    currentSide === 'back' ? 'pointer-events-none' : ''
                  }`}
                  style={{ minHeight: '520px' }}
                >
                  {/* Ornato de Bordas e Cantoneiras Douradas */}
                  <div className="absolute inset-1.5 sm:inset-3 border border-amber-400/20 rounded-xl pointer-events-none" />
                  <div className="absolute top-2 left-2 sm:top-4 sm:left-4 w-6 h-6 border-t-2 border-l-2 border-amber-400/70 pointer-events-none" />
                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-6 h-6 border-t-2 border-r-2 border-amber-400/70 pointer-events-none" />
                  <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 w-6 h-6 border-b-2 border-l-2 border-amber-400/70 pointer-events-none" />
                  <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-6 h-6 border-b-2 border-r-2 border-amber-400/70 pointer-events-none" />

                  {/* Marca d'água */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                    <GraduationCap className="w-96 h-96 text-amber-300" />
                  </div>

                  {/* TOPO: Chancelas Oficiais e Brasão */}
                  <div className="relative z-10 space-y-1.5 pt-1">
                    <div className="flex items-center justify-center gap-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-amber-400/90">
                      <span>REPÚBLICA FEDERATIVA DO BRASIL</span>
                      <span>•</span>
                      <span>ESTADO DO PARANÁ</span>
                    </div>

                    <div className="flex items-center justify-center gap-3 pt-1">
                      <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-amber-400/60" />
                      <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="SkillHub" className="w-6 h-6 rounded-md object-contain" />
                        <span className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                          Skill<span className="text-amber-400">Hub</span>
                        </span>
                      </div>
                      <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-amber-400/60" />
                    </div>

                    <p className="text-[10px] sm:text-xs text-purple-300/80 font-medium tracking-wider uppercase">
                      Polo Regional de Qualificação Profissional • Curitiba &amp; Região Metropolitana
                    </p>

                    <h1 className="text-lg sm:text-2xl md:text-3xl font-serif font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 uppercase pt-2">
                      Certificado de Qualificação Profissional
                    </h1>
                  </div>

                  {/* MEIO: Texto de Concessão do Diploma */}
                  <div className="relative z-10 py-4 sm:py-6 space-y-3 max-w-2xl mx-auto">
                    <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                      Certificamos para os devidos fins de direito e comprovação acadêmico-profissional que
                    </p>

                    <div className="py-1">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white font-serif border-b-2 border-amber-400/40 inline-block px-4 pb-1">
                        {studentName}
                      </h2>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                      concluiu com êxito e aproveitamento de <strong className="text-emerald-400 font-semibold">{score}%</strong> o curso de formação profissional de:
                    </p>

                    <div className="p-2 sm:p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-amber-300 font-bold text-sm sm:text-lg">
                      {course.title}
                    </div>

                    <p className="text-[11px] sm:text-xs text-slate-400 max-w-xl mx-auto leading-normal">
                      com carga horária total de <strong className="text-white font-medium">{course.hours} horas</strong> de estudos práticos e avaliações de fixação, sob as diretrizes da Lei da Aprendizagem (Lei nº 10.097/2000) e da Lei do Estágio (Lei nº 11.788/2008).
                    </p>
                  </div>

                  {/* RODAPÉ DA FRENTE COM CÓDIGO DETERMINÍSTICO E BOTÃO COPIAR */}
                  <div className="relative z-10 pt-4 border-t border-amber-500/20 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                    
                    {/* Código de Autenticidade & Botão Rápido de Copiar */}
                    <div className="flex items-center justify-center sm:justify-start gap-2.5 text-left">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 p-0.5 shadow-lg shadow-amber-500/20 shrink-0">
                        <div className="w-full h-full rounded-full bg-[#120826] flex flex-col items-center justify-center text-amber-300 text-[8px] font-black leading-tight border border-amber-300/40">
                          <Award className="w-4 h-4 text-amber-400" />
                          <span>OFICIAL</span>
                        </div>
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                          Selo de Autenticidade
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[10px] font-mono text-emerald-400 font-bold tracking-tight truncate">
                            {authCode}
                          </span>
                          <button
                            type="button"
                            onClick={handleCopyCode}
                            className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition shrink-0 print:hidden cursor-pointer"
                            title="Copiar código de autenticidade"
                          >
                            {copiedCode ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3 text-amber-300" />
                            )}
                          </button>
                        </div>
                        {copiedCode && (
                          <span className="text-[9px] text-emerald-400 font-semibold block animate-in fade-in">
                            ✓ Código copiado!
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Cidade, Data e Validação Digital */}
                    <div className="text-center">
                      <p className="text-[11px] text-slate-300">
                        Curitiba - PR, {formattedDate}
                      </p>
                      <a
                        href={validationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[9px] text-emerald-400 hover:text-emerald-300 flex items-center justify-center gap-1 font-mono mt-0.5 transition print:no-underline"
                      >
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        <span>Validar em {originUrl.replace(/^https?:\/\//, '')}</span>
                      </a>
                    </div>

                    {/* Assinatura da Diretoria Pedagógica & QR Code nítido no canto */}
                    <div className="flex items-center justify-center sm:justify-end gap-3 text-center sm:text-right">
                      <div className="space-y-0.5">
                        <div className="h-6 flex items-end justify-center sm:justify-end">
                          <span className="font-serif italic text-amber-200/90 text-sm tracking-wider">
                            Profª. Dra. Helena Guimarães
                          </span>
                        </div>
                        <div className="w-36 sm:w-44 h-[1px] bg-slate-500/60 mx-auto sm:ml-auto" />
                        <p className="text-[10px] font-semibold text-slate-300">
                          Coordenação Pedagógica SkillHub
                        </p>
                      </div>

                      {qrCodeDataUrl && (
                        <div className="w-12 h-12 bg-white p-0.5 rounded-lg shrink-0 shadow-md hidden sm:flex items-center justify-center" title="Escaneie para validar em /validar">
                          <img src={qrCodeDataUrl} alt="QR Code Oficial" className="w-full h-full object-contain" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* ============================================================== */}
                {/* FACE 2: VERSO DO CERTIFICADO COM QR CODE DINÂMICO              */}
                {/* ============================================================== */}
                <div 
                  className={`w-full rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-b from-[#0c1322] via-[#090e1c] to-[#050912] p-5 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between text-left select-none backface-hidden rotate-y-180 absolute inset-0 ${
                    currentSide === 'front' ? 'pointer-events-none' : ''
                  }`}
                  style={{ minHeight: '520px' }}
                >
                  <div className="absolute inset-1.5 sm:inset-3 border border-emerald-400/20 rounded-xl pointer-events-none" />

                  {/* TOPO DO VERSO */}
                  <div className="relative z-10 pb-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                        <BookOpen className="w-4 h-4" />
                        <span>Registro Acadêmico • Histórico &amp; Competências</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                        Ementa Curricular: {course.title}
                      </h3>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Carga Horária Integral:</span>
                      <span className="text-xs sm:text-sm font-bold text-emerald-300 font-mono">
                        {course.hours} Horas ({course.modules?.length || 4} Módulos)
                      </span>
                    </div>
                  </div>

                  {/* CORPO DO VERSO: MÓDULOS + COMPETÊNCIAS + QR CODE DINÂMICO */}
                  <div className="relative z-10 py-3 grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                    {/* Grade de Módulos */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300 uppercase tracking-wide">
                        <Layers className="w-3.5 h-3.5 text-purple-400" />
                        <span>Módulos Concluídos &amp; Avaliados</span>
                      </div>
                      
                      <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
                        {course.modules && course.modules.length > 0 ? (
                          course.modules.map((m, idx) => (
                            <div 
                              key={m.id || idx}
                              className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 transition text-xs"
                            >
                              <div className="flex items-center justify-between font-semibold text-white">
                                <span className="text-emerald-400 font-mono text-[10px]">
                                  Módulo {m.number || idx + 1}
                                </span>
                                <span className="text-[10px] text-slate-400">
                                  {m.estimatedMinutes ? `${m.estimatedMinutes} min` : 'Concluído'}
                                </span>
                              </div>
                              <p className="font-bold text-slate-200 mt-0.5 text-xs">
                                {m.title}
                              </p>
                              {m.summary && (
                                <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">
                                  {m.summary}
                                </p>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="p-3 rounded-xl bg-white/5 text-xs text-slate-400">
                            Conteúdo teórico e exercícios práticos equivalentes a {course.hours} horas de qualificação.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Competências Desenvolvidas + Validação com QR Code Dinâmico */}
                    <div className="space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300 uppercase tracking-wide mb-2">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          <span>Habilidades &amp; Competências (Skills)</span>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {skillsList.map((skill, sIdx) => (
                            <span 
                              key={sIdx}
                              className="px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[11px] font-medium flex items-center gap-1"
                            >
                              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                              <span className="truncate max-w-[280px]">{skill}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Box de Validação com QR Code Dinâmico SVG/Base64 */}
                      <div className="p-3 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex items-center justify-between gap-3">
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              Validação Institucional
                            </span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-semibold font-mono">
                              QR Dinâmico
                            </span>
                          </div>
                          <p className="text-xs font-mono font-bold text-white select-all">
                            {authCode}
                          </p>
                          <p className="text-[9px] text-slate-400 truncate">
                            Escaneie para validar em <span className="text-emerald-400 font-mono">{originUrl.replace(/^https?:\/\//, '')}/validar</span>
                          </p>
                        </div>

                        {/* Imagem do QR Code Dinâmico com fallback */}
                        <div className="w-16 h-16 bg-white p-1 rounded-xl shrink-0 flex items-center justify-center shadow-md">
                          {qrCodeDataUrl ? (
                            <img
                              src={qrCodeDataUrl}
                              alt={`QR Code de validação: ${authCode}`}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <QrCode className="w-12 h-12 text-slate-950" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RODAPÉ DO VERSO */}
                  <div className="relative z-10 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between text-[10px] text-slate-400">
                    <span>SkillHub Capacitação e Tecnologia Ltda. • CNPJ: 45.123.890/0001-12</span>
                    <span>Curitiba, Paraná • Lei Federal nº 10.097/2000</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* RODAPÉ DO MODAL (PRINT:HIDDEN) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs print:hidden">
            <div className="flex items-center gap-2 text-slate-400 text-[11px]">
              <RotateCw className="w-3.5 h-3.5 text-amber-400" />
              <span>Dica: Use as abas no topo ou o botão para virar o diploma e ver o verso.</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#0077B5] hover:bg-[#006396] text-white font-bold transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-blue-900/30"
                title="Adicionar ao Perfil do LinkedIn em 1 Clique"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Adicionar ao LinkedIn</span>
              </a>

              <button
                type="button"
                onClick={() => setCurrentSide(currentSide === 'front' ? 'back' : 'front')}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold transition cursor-pointer flex items-center gap-1.5"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>{currentSide === 'front' ? 'Ver Verso (Ementa & QR)' : 'Ver Frente (Diploma)'}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition cursor-pointer"
              >
                Concluir Visualização
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. LAYOUT LIMPO DEDICADO PARA IMPRESSÃO (A4 LANDSCAPE: PÁGINAS 1 & 2)      */}
      {/* ========================================================================= */}
      
      {/* PÁGINA 1 DE IMPRESSÃO: FRENTE DO DIPLOMA */}
      <div className="certificate-print-sheet flex flex-col justify-between border-4 border-amber-600 rounded-none relative overflow-hidden bg-[#0a0518] text-white">
        <div className="border-2 border-amber-400/40 p-8 flex-1 flex flex-col justify-between text-center relative">
          
          {/* Topo Oficial */}
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] font-bold text-amber-400">
              REPÚBLICA FEDERATIVA DO BRASIL • ESTADO DO PARANÁ
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="h-[1px] w-24 bg-amber-400/60" />
              <span className="font-extrabold text-xl tracking-tight text-white">
                Skill<span className="text-amber-400">Hub</span>
              </span>
              <div className="h-[1px] w-24 bg-amber-400/60" />
            </div>
            <p className="text-xs text-purple-200 tracking-wider uppercase">
              Polo Regional de Qualificação Profissional • Curitiba &amp; Região Metropolitana
            </p>
            <h1 className="text-3xl font-serif font-black uppercase text-amber-300 pt-2 tracking-wide">
              Certificado de Qualificação Profissional
            </h1>
          </div>

          {/* Corpo do Diploma */}
          <div className="py-6 space-y-4 max-w-3xl mx-auto">
            <p className="text-sm text-slate-300 font-light">
              Certificamos para os devidos fins de direito e comprovação acadêmico-profissional que
            </p>
            <h2 className="text-3xl font-bold font-serif text-white border-b-2 border-amber-400 inline-block px-6 pb-1">
              {studentName}
            </h2>
            <p className="text-sm text-slate-300 font-light">
              concluiu com êxito e aproveitamento de <strong className="text-emerald-400">{score}%</strong> o curso de formação profissional de:
            </p>
            <div className="p-3 border-2 border-amber-400/50 bg-purple-950/40 text-amber-200 font-bold text-xl rounded-xl">
              {course.title}
            </div>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto leading-relaxed">
              com carga horária total de <strong className="text-white">{course.hours} horas</strong> de estudos práticos e avaliações de fixação, sob as diretrizes da Lei da Aprendizagem (Lei nº 10.097/2000) e da Lei do Estágio (Lei nº 11.788/2008).
            </p>
          </div>

          {/* Rodapé Oficial com Assinatura, Código e QR Code */}
          <div className="pt-6 border-t-2 border-amber-400/30 grid grid-cols-3 gap-6 items-center text-xs">
            <div className="text-left space-y-1">
              <p className="font-bold text-amber-300 uppercase text-[11px]">Selo de Autenticidade</p>
              <p className="text-emerald-400 font-mono text-xs font-bold">{authCode}</p>
              <p className="text-slate-400 text-[10px]">Validar em: {originUrl.replace(/^https?:\/\//, '')}/validar</p>
            </div>

            <div className="text-center">
              <p className="text-slate-200">Curitiba - PR, {formattedDate}</p>
              <p className="text-slate-400 text-[10px] mt-1">Homologado via Plataforma SkillHub</p>
            </div>

            <div className="flex items-center justify-end gap-4 text-right">
              <div className="space-y-1">
                <span className="font-serif italic text-amber-200 text-sm block">
                  Profª. Dra. Helena Guimarães
                </span>
                <div className="w-44 h-[1px] bg-slate-400 ml-auto" />
                <p className="text-slate-300 text-[11px]">Coordenação Pedagógica SkillHub</p>
              </div>
              {qrCodeDataUrl && (
                <div className="w-14 h-14 bg-white p-0.5 rounded-lg shrink-0 flex items-center justify-center">
                  <img src={qrCodeDataUrl} alt="QR Code" className="w-full h-full object-contain" />
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* PÁGINA 2 DE IMPRESSÃO: VERSO DO DIPLOMA COM QR CODE */}
      <div className="certificate-print-sheet certificate-print-back flex flex-col justify-between border-4 border-emerald-600 rounded-none relative overflow-hidden bg-[#060e18] text-white">
        <div className="border-2 border-emerald-400/40 p-8 flex-1 flex flex-col justify-between text-left relative">
          
          {/* Topo do Verso */}
          <div className="pb-4 border-b-2 border-emerald-500/30 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                REGISTRO ACADÊMICO • HISTÓRICO &amp; EMENTA CURRICULAR
              </p>
              <h3 className="text-xl font-bold text-white mt-1">
                {course.title}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Carga Horária:</span>
              <span className="text-base font-bold text-emerald-300 font-mono">
                {course.hours} Horas ({course.modules?.length || 4} Módulos)
              </span>
            </div>
          </div>

          {/* Grade de Módulos e Skills */}
          <div className="py-4 grid grid-cols-2 gap-6 flex-1">
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 border-b border-white/10 pb-1">
                Módulos de Ensino Concluídos
              </h4>
              <div className="space-y-2 text-xs">
                {course.modules && course.modules.length > 0 ? (
                  course.modules.map((m, idx) => (
                    <div key={m.id || idx} className="p-2 border border-white/10 rounded-lg bg-white/5">
                      <div className="flex justify-between font-bold text-white">
                        <span className="text-emerald-400">Módulo {m.number || idx + 1}</span>
                        <span className="text-slate-400">{m.estimatedMinutes ? `${m.estimatedMinutes} min` : 'Concluído'}</span>
                      </div>
                      <p className="font-semibold text-slate-200 mt-0.5">{m.title}</p>
                      {m.summary && <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{m.summary}</p>}
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400">Conteúdo prático de capacitação profissional.</p>
                )}
              </div>
            </div>

            <div className="space-y-4 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 border-b border-white/10 pb-1 mb-2">
                  Habilidades &amp; Competências Desenvolvidas
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {skillsList.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-medium"
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 border-2 border-emerald-500/30 rounded-xl bg-slate-900 flex items-center justify-between gap-4">
                <div className="space-y-1 text-xs min-w-0">
                  <p className="font-bold text-slate-400 uppercase text-[10px]">Autenticação Eletrônica</p>
                  <p className="font-mono font-bold text-white text-sm">{authCode}</p>
                  <p className="text-slate-400 text-[10px]">
                    Documento assinado digitalmente nos termos da Medida Provisória nº 2.200-2/2001.
                  </p>
                </div>
                <div className="w-16 h-16 bg-white p-1 rounded-xl shrink-0 flex items-center justify-center">
                  {qrCodeDataUrl ? (
                    <img src={qrCodeDataUrl} alt="QR Code" className="w-full h-full object-contain" />
                  ) : (
                    <QrCode className="w-12 h-12 text-slate-950" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Rodapé do Verso */}
          <div className="pt-4 border-t-2 border-emerald-500/30 flex items-center justify-between text-[11px] text-slate-400">
            <span>SkillHub Capacitação e Tecnologia Ltda. • CNPJ: 45.123.890/0001-12</span>
            <span>Curitiba, Paraná • Lei Federal nº 10.097/2000</span>
          </div>

        </div>
      </div>
    </>
  );
}
