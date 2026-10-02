'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Building2, GraduationCap, ShieldCheck } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';

interface DashboardRouteProps {
  requiredRole: Extract<UserRole, 'ALUNO' | 'RECRUTADOR'>;
  children: React.ReactNode;
}

export default function DashboardRoute({ requiredRole, children }: DashboardRouteProps) {
  const router = useRouter();
  const { isAuthenticated, role } = useApp();
  const isCandidate = requiredRole === 'ALUNO';
  const correctRole = role === requiredRole;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      {isAuthenticated && <Sidebar />}
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {!isAuthenticated || !correctRole ? (
          <section className="mx-auto mt-10 max-w-xl rounded-2xl border border-violet-200/10 bg-[#18132b] p-7 text-center shadow-xl shadow-black/20 sm:p-10">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-violet-300/15 bg-violet-300/[0.07] text-violet-200">
              {!isAuthenticated ? <ShieldCheck className="h-6 w-6" /> : isCandidate ? <GraduationCap className="h-6 w-6" /> : <Building2 className="h-6 w-6" />}
            </span>
            <h1 className="mt-5 text-2xl font-bold text-white">
              {!isAuthenticated ? 'Entre para acessar seu painel' : 'Este painel é de outro perfil'}
            </h1>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
              {!isAuthenticated
                ? 'Acesse sua conta SkillHub para acompanhar candidaturas, vagas e capacitações.'
                : 'Use o painel associado ao perfil da sua conta ou troque de usuário.'}
            </p>
            <button onClick={() => router.push(isCandidate ? '/login' : '/login?perfil=empresa')} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500">
              {!isAuthenticated ? 'Entrar no SkillHub' : isCandidate ? 'Abrir painel da empresa' : 'Abrir painel do candidato'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </section>
        ) : (
          children
        )}
      </main>
    </div>
  );
}