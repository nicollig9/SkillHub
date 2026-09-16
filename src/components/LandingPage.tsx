'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { 
  GraduationCap, 
  MapPin, 
  Award, 
  ShieldCheck, 
  Calculator, 
  Building2, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  Users, 
  Compass,
  FileCheck
} from 'lucide-react';
import { COURSES } from '@/data/coursesData';

export default function LandingPage() {
  const { setCurrentView, setRole, openCourse, vagas, student, badges } = useApp();

  const featuredCourse = COURSES[0];

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-12">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION COM A LOGO OFICIAL TRANSPARENTE E PALETA SUAVIZADA        */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#24123E] via-[#351859] to-[#4A207A] border border-[#6D34A8]/40 p-6 sm:p-10 lg:p-12 shadow-2xl">
        {/* Glow de fundo suave */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#8B5CF6]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#D97706]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Coluna de Texto & Ações (7 colunas) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-[#1B0D30]/80 border border-[#7C3AED]/40 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#DDD6FE] shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B] animate-pulse" />
              <span>Plataforma Oficial de Capacitação & Empregabilidade</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Seu conhecimento abre portas. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#FBBF24] via-[#F59E0B] to-[#FCD34D] bg-clip-text text-transparent">
                Seu bairro tem a vaga.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-purple-100 leading-relaxed max-w-2xl">
              O <strong className="text-white font-bold">SkillHub</strong> capacita jovens para o mercado de trabalho com trilhas práticas de qualificação profissional, certificação digital via <strong className="text-[#FCD34D]">Badges</strong> e conexão georreferenciada com vagas de Jovem Aprendiz e Estágio em Curitiba e Região Metropolitana.
            </p>

            {/* Botões de Ação Principal */}
            <div className="flex flex-wrap gap-3.5 pt-2">
              <button
                onClick={() => setCurrentView('LOGIN')}
                className="flex items-center gap-2.5 bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#FBBF24] hover:to-[#F59E0B] text-[#1A0B2E] font-extrabold px-6 py-3.5 rounded-xl shadow-lg shadow-amber-950/40 hover:shadow-amber-500/25 transition-all duration-200 transform hover:-translate-y-0.5 text-sm"
              >
                <Sparkles className="w-4 h-4 text-[#1A0B2E]" />
                <span>Entrar / Criar Minha Conta</span>
                <ArrowRight className="w-4 h-4 text-[#1A0B2E]" />
              </button>

              <button
                onClick={() => setCurrentView('CURSOS_DISPONIVEIS')}
                className="flex items-center gap-2 bg-[#1C0D33]/90 hover:bg-[#2A154A] border border-[#7C3AED]/50 hover:border-[#A78BFA] text-purple-100 hover:text-white font-bold px-5 py-3.5 rounded-xl transition-all duration-200 text-sm shadow-md"
              >
                <GraduationCap className="w-4 h-4 text-[#8B5CF6]" />
                <span>Explorar Cursos Gratuitos</span>
              </button>

              <button
                onClick={() => setCurrentView('TRILHAS_DISPONIVEIS')}
                className="flex items-center gap-2 bg-[#1C0D33]/90 hover:bg-[#2A154A] border border-[#7C3AED]/50 hover:border-[#A78BFA] text-purple-100 hover:text-white font-bold px-5 py-3.5 rounded-xl transition-all duration-200 text-sm shadow-md"
              >
                <span>Ver 5 Trilhas</span>
              </button>

              <button
                onClick={() => {
                  setRole('RECRUTADOR');
                  setCurrentView('LOGIN');
                }}
                className="flex items-center gap-2 bg-[#180A2D]/70 hover:bg-[#241042] border border-amber-500/30 text-amber-200 hover:text-white font-semibold px-4 py-3.5 rounded-xl transition-all duration-200 text-xs sm:text-sm"
              >
                <Building2 className="w-4 h-4 text-amber-300" />
                <span>Para Empresas / RH</span>
              </button>
            </div>

            {/* Mini Destaques rápidos */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-purple-200/90">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Gratuito para Alunos</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Lei da Aprendizagem (10.097/00)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Conformidade Total LGPD</span>
              </div>
            </div>
          </div>

          {/* Coluna da Logo Oficial Sem Fundo Branco (5 colunas) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            
            {/* Halo de luz suave atrás da Logo */}
            <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#7C3AED]/30 via-[#F59E0B]/15 to-transparent rounded-full blur-2xl animate-pulse" />
              
              {/* Imagem da Logo Oficial Sem Fundo Branco */}
              <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                <img
                  src="/logo.png"
                  alt="SkillHub Logo Oficial - Curitiba & RMC"
                  className="w-full h-auto max-h-[300px] object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)] filter transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Badges Flutuantes Informativos */}
              <div className="absolute -bottom-2 -left-2 bg-[#180A2D]/95 border border-[#7C3AED]/60 rounded-xl px-3 py-1.5 text-[11px] font-bold text-white shadow-xl flex items-center gap-2 backdrop-blur-md">
                <Award className="w-4 h-4 text-[#F59E0B]" />
                <span>Badges Verificáveis</span>
              </div>

              <div className="absolute -top-2 -right-2 bg-[#180A2D]/95 border border-[#F59E0B]/50 rounded-xl px-3 py-1.5 text-[11px] font-bold text-[#FDE68A] shadow-xl flex items-center gap-2 backdrop-blur-md">
                <Compass className="w-4 h-4 text-[#F59E0B]" />
                <span>Curitiba & RMC</span>
              </div>
            </div>

            <p className="text-[11px] text-purple-300/80 mt-3 text-center">
              Emblema Oficial SkillHub • Jardim Botânico, Educação & Rosa dos Ventos
            </p>
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 2. ESTATÍSTICAS INTEGRADAS AO BANCO DE DADOS & ESTADO                     */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-[#1C0F32] border border-[#5B2594]/50 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-[#8B5CF6]/70 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">Cursos Disponíveis</span>
            <div className="p-2 rounded-xl bg-[#2D164E] text-[#D8B4FE]">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">30+ Cursos</div>
          <p className="text-[11px] text-purple-200 mt-1">5 Trilhas Práticas Completas</p>
        </div>

        <div className="bg-[#1C0F32] border border-[#5B2594]/50 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-[#8B5CF6]/70 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">Vagas em Curitiba</span>
            <div className="p-2 rounded-xl bg-[#2D164E] text-[#F59E0B]">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">{vagas.length} Oportunidades</div>
          <p className="text-[11px] text-purple-200 mt-1">CIC, Boqueirão, Centro e mais</p>
        </div>

        <div className="bg-[#1C0F32] border border-[#5B2594]/50 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-[#8B5CF6]/70 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">Badges Digitais</span>
            <div className="p-2 rounded-xl bg-[#2D164E] text-[#34D399]">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">{badges.length} Selos Oficiais</div>
          <p className="text-[11px] text-purple-200 mt-1">Nota de corte &ge; 70% no Quiz</p>
        </div>

        <div className="bg-[#1C0F32] border border-[#5B2594]/50 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-[#8B5CF6]/70 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">Segurança & LGPD</span>
            <div className="p-2 rounded-xl bg-[#2D164E] text-[#60A5FA]">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">100% Protegido</div>
          <p className="text-[11px] text-purple-200 mt-1">Filtro Anti-Golpe & CNPJ Ativo</p>
        </div>

      </section>


      {/* ========================================================================= */}
      {/* 3. COMO FUNCIONA O SKILLHUB (4 PILARES)                                  */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DDD6FE] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Ecossistema Completo de Desenvolvimento</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Como o SkillHub Impulsiona Você no Mercado
          </h2>
          <p className="text-xs sm:text-sm text-purple-200">
            Da qualificação inicial à contratação formal, cada etapa é pensada para garantir o sucesso do jovem e a segurança das empresas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Capacitação */}
          <div className="bg-[#180C2C] border border-[#521E8A]/50 hover:border-[#7C3AED] rounded-2xl p-6 space-y-4 transition-all duration-200 hover:-translate-y-1 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4F2684] to-[#7C3AED] flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">1. Cursos Rápidos & Práticos</h3>
              <p className="text-xs text-purple-200/90 leading-relaxed">
                Conteúdos práticos e objetivos: Legislação do Aprendiz, Rotinas de Escritório, IA e Soft Skills.
              </p>
            </div>
            <button
              onClick={() => setCurrentView('CURSOS')}
              className="text-xs font-bold text-[#FCD34D] hover:text-white flex items-center gap-1 pt-2 transition-colors"
            >
              <span>Ver Cursos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Badges */}
          <div className="bg-[#180C2C] border border-[#521E8A]/50 hover:border-[#7C3AED] rounded-2xl p-6 space-y-4 transition-all duration-200 hover:-translate-y-1 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D97706] to-[#F59E0B] flex items-center justify-center text-[#1A0B2E] shadow-md font-black">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">2. Badges de Competência</h3>
              <p className="text-xs text-purple-200/90 leading-relaxed">
                Ao acertar &ge; 70% nos testes de fixação, você ganha selos digitais auditáveis que provam suas habilidades para o RH.
              </p>
            </div>
            <button
              onClick={() => setCurrentView('BADGES_PERFIL')}
              className="text-xs font-bold text-[#FCD34D] hover:text-white flex items-center gap-1 pt-2 transition-colors"
            >
              <span>Ver Minhas Badges</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Proximidade */}
          <div className="bg-[#180C2C] border border-[#521E8A]/50 hover:border-[#7C3AED] rounded-2xl p-6 space-y-4 transition-all duration-200 hover:-translate-y-1 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#059669] to-[#10B981] flex items-center justify-center text-white shadow-md">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">3. Mapa por Bairros de Curitiba</h3>
              <p className="text-xs text-purple-200/90 leading-relaxed">
                Filtre vagas por proximidade de onde você mora (CIC, Boqueirão, Centro, Portão) economizando tempo e transporte.
              </p>
            </div>
            <button
              onClick={() => setCurrentView('MAPA_PROXIMIDADE')}
              className="text-xs font-bold text-[#FCD34D] hover:text-white flex items-center gap-1 pt-2 transition-colors"
            >
              <span>Abrir Mapa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 4: Calculadora de Salário */}
          <div className="bg-[#180C2C] border border-[#521E8A]/50 hover:border-[#7C3AED] rounded-2xl p-6 space-y-4 transition-all duration-200 hover:-translate-y-1 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#3B82F6] flex items-center justify-center text-white shadow-md">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">4. Calculadora de Holerite</h3>
              <p className="text-xs text-purple-200/90 leading-relaxed">
                Entenda exatamente como funciona o salário do Jovem Aprendiz: cálculo de horas, desconto de INSS, FGTS e valor líquido real.
              </p>
            </div>
            <button
              onClick={() => setCurrentView('HOLERITE')}
              className="text-xs font-bold text-[#FCD34D] hover:text-white flex items-center gap-1 pt-2 transition-colors"
            >
              <span>Calcular Salário</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 4. CURSO EM DESTAQUE - INTEGRAÇÃO DIRETA                                   */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-r from-[#20103A] via-[#2F1552] to-[#3F1B6C] border-2 border-[#7C3AED]/60 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#F59E0B] text-[#1A0B2E] font-black text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                ★ Curso Recomendado para Iniciar
              </span>
              <span className="text-xs text-purple-200 font-bold">
                {featuredCourse.trackName}
              </span>
            </div>

            <h3 className="text-2xl font-extrabold text-white">
              {featuredCourse.title}
            </h3>

            <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
              {featuredCourse.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-purple-200 pt-1">
              <span>⏱️ <strong>{featuredCourse.hours} Horas</strong> de estudo</span>
              <span>•</span>
              <span>🎓 <strong>{featuredCourse.modules.length} Módulos Práticos</strong></span>
              <span>•</span>
              <span>🏅 Selo Digital: <strong className="text-[#FCD34D]">{featuredCourse.badgeName}</strong></span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
            <button
              onClick={() => openCourse(featuredCourse.id)}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#7C3AED] to-[#9333EA] hover:from-[#8B5CF6] hover:to-[#A855F7] text-white font-extrabold px-6 py-3.5 rounded-xl shadow-lg transition-all text-sm"
            >
              <span>Acessar Curso Agora</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentView('CURSOS')}
              className="flex items-center justify-center gap-2 bg-[#17092B]/80 hover:bg-[#250F44] border border-purple-500/40 text-purple-200 hover:text-white font-semibold px-4 py-2.5 rounded-xl text-xs transition-all"
            >
              <span>Ver todas as Trilhas</span>
            </button>
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 5. SEÇÃO DE RECRUTADORES & EMPRESAS                                       */}
      {/* ========================================================================= */}
      <section className="max-w-4xl mx-auto w-full">
        <div className="bg-[#190D2E] border border-[#521E8A]/60 rounded-3xl p-6 sm:p-8 space-y-4 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2 text-xs font-bold text-[#F59E0B] uppercase">
              <Building2 className="w-4 h-4" />
              <span>Para RH, Empresas e Agências de Curitiba</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Contrate Jovens Qualificados e Próximos da sua Empresa
            </h3>
            <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
              Publique vagas corporativas validadas, filtre candidatos por badges conquistadas e encontre aprendizes e estagiários nos bairros de Curitiba e RMC.
            </p>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <button
              onClick={() => setCurrentView('LOGIN')}
              className="w-full md:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-[#1A0B2E] font-black px-6 py-3.5 rounded-xl transition-all text-xs sm:text-sm shadow-lg hover:brightness-110"
            >
              <Building2 className="w-4 h-4 text-[#1A0B2E]" />
              <span>Acessar Área da Empresa</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 6. RODAPÉ INSTITUCIONAL                                                   */}
      {/* ========================================================================= */}
      <footer className="pt-8 border-t border-[#4C1D95]/40 text-center space-y-3 text-xs text-purple-300">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-purple-200">
          <button onClick={() => setCurrentView('INICIO')} className="hover:text-white transition-colors">Início</button>
          <span>•</span>
          <button onClick={() => setCurrentView('CURSOS')} className="hover:text-white transition-colors">Cursos & Trilhas</button>
          <span>•</span>
          <button onClick={() => setCurrentView('MAPA_PROXIMIDADE')} className="hover:text-white transition-colors">Vagas por Bairro</button>
          <span>•</span>
          <button onClick={() => setCurrentView('HOLERITE')} className="hover:text-white transition-colors">Calculadora Salarial</button>
          <span>•</span>
          <button onClick={() => setCurrentView('BADGES_PERFIL')} className="hover:text-white transition-colors">Badges</button>
        </div>
        <p className="text-[11px] text-purple-400">
          © 2026 SkillHub Curitiba & Região Metropolitana • Plataforma Educacional & Formação Profissional. Em conformidade com a Lei Federal nº 10.097/2000 (Lei da Aprendizagem) e LGPD (Lei nº 13.709/2018).
        </p>
      </footer>

    </div>
  );
}
