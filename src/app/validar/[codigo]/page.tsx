'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import SiteFooter from '@/components/SiteFooter';
import { validateCertificateCode, getLinkedInShareUrl } from '@/utils/certificateUtils';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Award, 
  BookOpen, 
  Clock, 
  Calendar, 
  ExternalLink, 
  Share2, 
  FileCheck, 
  Building2, 
  GraduationCap, 
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';

export default function CertificateVerificationPage() {
  const params = useParams();
  const router = useRouter();
  const codeParam = typeof params?.codigo === 'string' ? params.codigo : '';

  const [inputCode, setInputCode] = useState(codeParam);
  const [currentCode, setCurrentCode] = useState(codeParam);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (codeParam) {
      setCurrentCode(codeParam);
      setInputCode(codeParam);
    }
  }, [codeParam]);

  // Executa validação determinística
  const validation = React.useMemo(() => {
    return validateCertificateCode(
      currentCode, 
      typeof window !== 'undefined' ? window.location.origin : 'https://skillhub.com.br'
    );
  }, [currentCode]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputCode.trim();
    if (clean) {
      setCurrentCode(clean);
      router.push(`/validar/${clean}`);
    }
  };

  const handleCopyCode = () => {
    if (validation.code) {
      navigator.clipboard.writeText(validation.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const linkedinUrl = React.useMemo(() => {
    if (!validation.course) return '#';
    return getLinkedInShareUrl({
      courseTitle: validation.course.title,
      code: validation.code,
      validationUrl: validation.verificationUrl
    });
  }, [validation]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-slate-100">
      <Header />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
        
        {/* BANNER INSTITUCIONAL DE VERIFICAÇÃO */}
        <div className="text-center space-y-2 mb-8 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Portal Oficial de Autenticidade • Curitiba &amp; RMC</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Validação Pública de Certificados
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Consulte a autenticidade e validade jurídica de certificados emitidos pela plataforma SkillHub sob as diretrizes da Lei da Aprendizagem (Lei nº 10.097/00) e Estágio (Lei nº 11.788/08).
          </p>
        </div>

        {/* BARRA DE PESQUISA / DIGITAÇÃO DE CÓDIGO */}
        <form onSubmit={handleSearch} className="w-full max-w-xl mb-8">
          <div className="relative flex items-center bg-white/5 border border-purple-500/30 rounded-2xl p-1.5 focus-within:border-purple-400 transition shadow-lg shadow-purple-950/30">
            <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Digite o código (ex: SH-2026-05A9F21B)..."
              className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none uppercase font-mono tracking-wider"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition shrink-0 cursor-pointer shadow-md"
            >
              Verificar
            </button>
          </div>
        </form>

        {/* RESULTADO DA VALIDAÇÃO */}
        {validation.isValid && validation.course ? (
          /* ============================================================== */
          /* CASO 1: CERTIFICADO AUTÊNTICO E ATIVO                           */
          /* ============================================================== */
          <div className="w-full bg-[#120a22]/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Efeito Glow Verde */}
            <div className="absolute -top-24 -right-24 w-60 h-60 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* SELO DE AUTENTICIDADE VERDE */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold uppercase tracking-wider">
                    <span>Certificado Autêntico e Verificado</span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-white mt-1">
                    Registro Ativo &amp; Homologado • SkillHub
                  </h2>
                </div>
              </div>

              {/* Botões de Ação: Copiar Código e LinkedIn */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition flex items-center gap-1.5 cursor-pointer"
                  title="Copiar código de validação"
                >
                  <FileCheck className="w-4 h-4 text-emerald-400" />
                  <span>{copied ? 'Copiado!' : 'Copiar Código'}</span>
                </button>

                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#0077B5] hover:bg-[#006396] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md cursor-pointer"
                  title="Adicionar esta certificação ao perfil do LinkedIn"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Adicionar ao LinkedIn</span>
                </a>
              </div>
            </div>

            {/* DADOS DETALHADOS DO CERTIFICADO */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
              
              {/* Card Curso & Categoria */}
              <div className="md:col-span-2 p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold">
                  <GraduationCap className="w-4 h-4" />
                  <span>Formação Profissional Homologada</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {validation.course.title}
                </h3>
                <p className="text-xs text-slate-400">
                  {validation.course.subtitle || validation.course.description}
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-purple-950/60 border border-purple-500/30 text-purple-300 font-medium">
                    Categoria: {validation.course.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Carga Horária: {validation.workloadHours} Horas</span>
                  </span>
                </div>
              </div>

              {/* Card Registro Institucional */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                    Código de Autenticação:
                  </span>
                  <span className="text-sm font-mono font-bold text-emerald-400 select-all block mt-0.5">
                    {validation.code}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                    Status no Sistema:
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Válido / Regular
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                    Data de Conclusão:
                  </span>
                  <span className="text-xs text-slate-200 font-medium">
                    {validation.issueDate}
                  </span>
                </div>
              </div>
            </div>

            {/* MÓDULOS & COMPETÊNCIAS */}
            <div className="space-y-4 pt-2 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Ementa de Módulos */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wide">
                    <Layers className="w-4 h-4 text-purple-400" />
                    <span>Ementa Curricular Concluída ({validation.course.modules?.length || 4} Módulos)</span>
                  </div>
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1 custom-scrollbar text-xs">
                    {validation.course.modules?.map((m, idx) => (
                      <div key={m.id || idx} className="p-2 rounded-xl bg-white/[0.03] border border-white/5">
                        <div className="flex justify-between font-semibold text-white">
                          <span className="text-emerald-400 font-mono text-[11px]">Módulo {m.number || idx + 1}</span>
                          <span className="text-slate-400 text-[10px]">{m.estimatedMinutes ? `${m.estimatedMinutes} min` : '100%'}</span>
                        </div>
                        <p className="font-medium text-slate-200 text-xs mt-0.5">{m.title}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Habilidades & Competências */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wide">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Competências Adquiridas (Skills)</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {validation.skills?.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* RODAPÉ DO CARD INSTITUCIONAL */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 relative z-10">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-purple-400" />
                <span>SkillHub Curitiba &amp; Região Metropolitana • Polo Regional de Empregabilidade</span>
              </div>
              <Link
                href="/cursos"
                className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 transition"
              >
                <span>Explorar outros cursos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          /* ============================================================== */
          /* CASO 2: CÓDIGO NÃO ENCONTRADO OU INVÁLIDO                      */
          /* ============================================================== */
          <div className="w-full bg-[#120a22]/90 border border-rose-500/30 rounded-3xl p-8 shadow-2xl text-center space-y-4 max-w-xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <XCircle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Código Não Localizado
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-sm mx-auto">
                O código informado (<strong className="text-white font-mono">{currentCode || 'Nenhum'}</strong>) não corresponde a nenhum certificado emitido ou possui caracteres incorretos.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-slate-400 text-left space-y-1">
              <p className="font-semibold text-slate-300">Dicas para verificação:</p>
              <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                <li>Verifique se o código possui o prefixo <code className="text-purple-300">SH-2026-</code>.</li>
                <li>Confira se não há espaços em branco ou letras trocadas.</li>
                <li>Escaneie novamente o QR Code presente no verso do documento.</li>
              </ul>
            </div>

            <div className="pt-2">
              <Link
                href="/cursos"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition shadow-md"
              >
                <span>Conhecer os Cursos do SkillHub</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

      </main>

      <SiteFooter />
    </div>
  );
}
