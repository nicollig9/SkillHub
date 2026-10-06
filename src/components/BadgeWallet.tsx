'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Badge } from '@/types';
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  Eye, 
  EyeOff, 
  QrCode, 
  ExternalLink, 
  Download, 
  FileBadge, 
  Sparkles,
  Scale,
  DollarSign,
  HeartPulse,
  Briefcase,
  FileText
} from 'lucide-react';

export default function BadgeWallet() {
  const { student, badges, applications, setCurrentView, setSelectedCourseId } = useApp();
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [showSensitiveData, setShowSensitiveData] = useState<boolean>(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Scale': return <Scale className="w-6 h-6 text-white" />;
      case 'DollarSign': return <DollarSign className="w-6 h-6 text-white" />;
      case 'HeartPulse': return <HeartPulse className="w-6 h-6 text-white" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-white" />;
      default: return <FileText className="w-6 h-6 text-white" />;
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-500/30 rounded-3xl p-6 lg:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Award className="w-4 h-4 text-purple-400" />
              <span>Carteira Digital de Competências & Perfil do Candidato</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Minhas Badges Conquistadas & Perfil LGPD
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Selos digitais verificáveis que comprovam seus conhecimentos para empresas e recrutadores de Curitiba e Região Metropolitana.
            </p>
          </div>

          <div className="bg-purple-900/40 border border-purple-500/40 rounded-2xl p-3.5 text-center shrink-0">
            <div className="text-2xl font-black text-white">{student.badgesEarned.length} / {badges.length}</div>
            <div className="text-xs text-purple-300 font-semibold">Badges Conquistadas</div>
          </div>
        </div>
      </div>

      {/* Student Profile Card with LGPD Privacy Controls */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-purple-600/30">
              {student.nome.split(' ').map((n) => n[0]).slice(0, 2).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-white">{student.nome}</h2>
                <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Conta Validada
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {student.escolaridade} • Turno {student.turnoEscola}
              </p>
              <div className="text-xs text-purple-300 font-semibold mt-0.5">
                📍 Bairro {student.endereco.bairro} — Curitiba/PR
              </div>
            </div>
          </div>

          {/* Privacy Toggle Simulator */}
          <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-2xl text-xs space-y-2">
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Máscara LGPD (Visão do Recrutador):
              </span>
              <button
                onClick={() => setShowSensitiveData(!showSensitiveData)}
                className="text-purple-400 hover:text-purple-300 flex items-center gap-1 font-bold text-xs"
              >
                {showSensitiveData ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {showSensitiveData ? 'Ocultar Dados' : 'Desbloquear Visualização'}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-300">
              <div>CPF: <span className="text-purple-300 font-bold">{showSensitiveData ? student.cpfRaw : student.cpfMasked}</span></div>
              <div>Tel: <span className="text-purple-300 font-bold">{showSensitiveData ? student.telefoneRaw : student.telefoneMasked}</span></div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="text-xs text-slate-300 leading-relaxed bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
          <strong className="text-white block mb-1">Apresentação Profissional:</strong>
          {student.bio}
        </div>
      </div>

      {/* Badges Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Galeria de Selos Oficiais de Competência
          </div>
          <span className="text-xs text-purple-400 font-semibold">
            Clique na Badge para ver o Certificado
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((badge) => {
            const isEarned = student.badgesEarned.some(
              (b) => b.badgeId.includes(badge.id.replace('badge-', '')) || badge.id.includes(b.badgeId.replace('badge-', ''))
            );
            const earnedInfo = student.badgesEarned.find(
              (b) => b.badgeId.includes(badge.id.replace('badge-', '')) || badge.id.includes(b.badgeId.replace('badge-', ''))
            );

            return (
              <div
                key={badge.id}
                onClick={() => setSelectedBadge(badge)}
                className={`p-5 rounded-3xl border transition-all duration-200 cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isEarned
                    ? 'bg-slate-900/90 border-purple-500/40 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-950/50'
                    : 'bg-slate-950/40 border-slate-900 opacity-60 hover:opacity-90'
                }`}
              >
                {isEarned && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-500/20 to-transparent p-4 pointer-events-none">
                    <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[9px] font-bold px-2 py-0.5 rounded-full">
                      ✓ Conquistada
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${
                        isEarned ? 'bg-gradient-to-br from-purple-600 to-indigo-600 shadow-purple-600/30' : 'bg-slate-800'
                      }`}
                    >
                      {getIcon(badge.icon)}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        {badge.category}
                      </span>
                      <h3 className="text-sm font-extrabold text-white leading-tight">
                        {badge.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 mb-4">
                    {badge.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{badge.workloadHours}h de Formação</span>
                  {isEarned ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Ver Selo
                    </span>
                  ) : (
                    <span className="text-slate-500 flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" /> Bloqueado
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal / Certificate Simulator Viewer */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-purple-500/40 rounded-3xl p-6 lg:p-8 max-w-lg w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-purple-300 font-bold text-xs">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Certificado Digital de Competência</span>
              </div>
              <button
                onClick={() => setSelectedBadge(null)}
                className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1 bg-slate-800 rounded-lg"
              >
                ✕ Fechar
              </button>
            </div>

            {/* Certificate Canvas Box */}
            <div className="bg-gradient-to-b from-purple-950/60 to-slate-950 border-2 border-purple-500/40 rounded-2xl p-6 text-center space-y-4 shadow-inner">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mx-auto shadow-lg shadow-purple-500/30">
                {getIcon(selectedBadge.icon)}
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-purple-300 tracking-wider">
                  SkillHub • Curitiba Metropolitana
                </span>
                <h3 className="text-lg font-black text-white mt-1">
                  {selectedBadge.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto">
                  {selectedBadge.description}
                </p>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl text-xs space-y-1">
                <div className="text-slate-400">Titular: <strong className="text-white">{student.nome}</strong></div>
                <div className="text-slate-400">Carga Horária: <strong className="text-purple-300">{selectedBadge.workloadHours} Horas</strong></div>
                <div className="text-slate-400">Código de Validação: <strong className="text-emerald-400 font-mono">{selectedBadge.codeVerificador || 'SKILL-PR-2026-8841A'}</strong></div>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Assinado digitalmente via JWT & PostgreSQL Neon</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedBadge(null)}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold"
              >
                Concluído
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
