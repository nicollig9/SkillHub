'use client';

import React, { useEffect, useState } from 'react';
import { useApp, ToastNotification } from '@/context/AppContext';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

function ToastCard({
  toast,
  onDismiss
}: {
  toast: ToastNotification;
  onDismiss: (id: string) => void;
}) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Inicia a saída suave após 3.5 segundos para sumir completamente aos 3.8s
    const timer = setTimeout(() => {
      handleClose();
    }, 3500);

    return () => clearTimeout(timer);
  }, [toast.id]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onDismiss(toast.id);
    }, 300);
  };

  let borderBg = 'bg-slate-900 border-slate-700 text-slate-100';
  let Icon = Info;
  let iconColor = 'text-blue-400';

  if (toast.type === 'success') {
    borderBg = 'bg-slate-900 border-emerald-500/60 text-emerald-100 shadow-emerald-950/40';
    Icon = CheckCircle2;
    iconColor = 'text-emerald-400';
  } else if (toast.type === 'warning') {
    borderBg = 'bg-slate-900 border-amber-500/60 text-amber-100 shadow-amber-950/40';
    Icon = AlertTriangle;
    iconColor = 'text-amber-400';
  } else if (toast.type === 'error') {
    borderBg = 'bg-slate-900 border-rose-500/60 text-rose-100 shadow-rose-950/40';
    Icon = XCircle;
    iconColor = 'text-rose-400';
  }

  return (
    <div
      className={`pointer-events-auto p-4 rounded-2xl border shadow-xl flex items-start gap-3 transition-all duration-300 ease-in-out ${
        isExiting
          ? 'opacity-0 translate-x-10 scale-95 pointer-events-none'
          : 'opacity-100 translate-x-0 scale-100 animate-in slide-in-from-bottom-5 duration-200'
      } ${borderBg}`}
    >
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
      <div className="flex-1 min-w-0">
        <div className="text-xs font-bold text-white flex items-center justify-between">
          <span>{toast.title}</span>
          <span className="text-[10px] text-slate-400 font-normal">{toast.timestamp}</span>
        </div>
        <p className="text-xs text-slate-300 mt-0.5 leading-snug">{toast.message}</p>
      </div>
      <button
        onClick={handleClose}
        className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
        title="Fechar notificação"
        aria-label="Fechar notificação"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export default function ToastContainer() {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <ToastCard key={toast.id} toast={toast} onDismiss={dismissToast} />
      ))}
    </div>
  );
}
