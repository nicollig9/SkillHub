'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  HelpCircle,
  FileText,
  Lock,
  X,
  ArrowRight,
  CheckCircle2,
  Building2,
  Sparkles,
  Award,
  Briefcase
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function Footer() {
  const router = useRouter();
  const { setCurrentView } = useApp();
  const [activeModal, setActiveModal] = useState<'FAQ' | 'TERMOS' | 'LGPD' | 'EMPRESAS' | 'ENTREVISTAS' | 'EMBAIXADOR' | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNav = (view: any, route?: string) => {
    setCurrentView(view);
    if (typeof window !== 'undefined' && window.location.pathname !== '/' && route) {
      router.push(route);
    } else if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      router.push('/');
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 4500);
  };

  return (
    <footer className="w-full mt-auto py-8 px-4 sm:px-6 lg:px-8 print:hidden transition-colors duration-300">
      {/* Container elegante flutuante com tom creme suave bg-[#f4f2eb] no tema claro */}
      <div className="max-w-7xl mx-auto bg-[#f4f2eb] dark:bg-slate-900/90 border border-[#e3dfd3] dark:border-purple-500/20 rounded-3xl shadow-sm py-9 px-6 sm:px-10 transition-colors duration-300">
        
        {/* Grid Principal: Identidade & Textos Institucionais (Esquerda) vs Navegação em 3 Colunas (Direita) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* ========================================================================= */}
          {/* 1. BLOCO DE IDENTIDADE E TEXTOS INSTITUCIONAIS (ESQUERDA - 5 COLUNAS)     */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Logo oficial do SkillHub (escudo roxo e dourado) & Marca */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
                  <img
                    src="/logo.png"
                    alt="SkillHub Logo"
                    className="w-10 h-10 object-contain drop-shadow-sm transition-transform hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                      const fallback = (e.target as HTMLElement).parentElement?.querySelector('.fallback-footer-logo');
                      if (fallback) fallback.classList.remove('hidden');
                    }}
                  />
                  <div className="fallback-footer-logo hidden w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white font-black text-base shadow-sm">
                    S
                  </div>
                </div>

                <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Skill<span className="text-purple-600 dark:text-purple-400">Hub</span>
                </span>
              </div>

              {/* Badge Regional */}
              <span className="inline-flex items-center bg-purple-100 text-purple-900 dark:bg-purple-950/80 dark:text-purple-300 text-xs font-semibold px-3 py-1 rounded-full border border-purple-200/80 dark:border-purple-500/30">
                📍 Focado em Curitiba e Região Metropolitana
              </span>
            </div>

            {/* Texto de Apresentação Acolhedor */}
            <p className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed max-w-md font-medium">
              O SkillHub é a plataforma de aceleração profissional criada para conectar jovens aprendizes, estagiários e ingressantes no mercado de trabalho às melhores oportunidades reais em Curitiba e RMC, integrando trilhas de formação modular, inteligência de vagas e ferramentas práticas de carreira.
            </p>

            {/* Captura de Newsletter / Vagas no E-mail */}
            <div className="pt-2">
              <label htmlFor="newsletter-email" className="text-xs font-bold text-slate-800 dark:text-zinc-200 uppercase tracking-wider block mb-2">
                Receba alertas de novas vagas da RMC no seu e-mail
              </label>
              
              <form onSubmit={handleSubscribe} className="relative flex items-center max-w-md">
                <input
                  id="newsletter-email"
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Seu melhor e-mail para vagas..."
                  required
                  className="w-full bg-white dark:bg-slate-950/80 border border-[#d6d0c2] dark:border-purple-500/30 rounded-full pl-4 pr-12 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-purple-600 transition-colors shadow-xs"
                />
                <button
                  type="submit"
                  aria-label="Cadastrar e-mail para receber vagas"
                  className="absolute right-1 w-8 h-8 rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center transition-all cursor-pointer shadow-sm"
                  title="Cadastrar e-mail"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 mt-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Pronto! Você receberá nosso radar semanal de vagas de Curitiba e RMC.</span>
                </div>
              )}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 2. COLUNAS DE NAVEGAÇÃO ENRIQUECIDAS (DIREITA - 7 COLUNAS)                 */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 pt-1 sm:pt-1.5">
            {/* Grid em 3 Colunas Detalhadas Alinhadas ao Topo */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
              
              {/* COLUNA 1: Formação & Aprendizado */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3.5">
                  Formação &amp; Aprendizado
                </h4>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => handleNav('CURSOS_DISPONIVEIS')}
                      className="text-slate-700 hover:text-purple-700 dark:text-zinc-400 dark:hover:text-purple-300 text-xs sm:text-[13px] leading-snug font-medium transition-colors duration-200 cursor-pointer text-left block py-0.5"
                    >
                      Cursos por Níveis (Iniciante ao Avançado)
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNav('TRILHAS_DISPONIVEIS')}
                      className="text-slate-700 hover:text-purple-700 dark:text-zinc-400 dark:hover:text-purple-300 text-xs sm:text-[13px] leading-snug font-medium transition-colors duration-200 cursor-pointer text-left block py-0.5"
                    >
                      Trilhas de Formação &amp; Selos
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveModal('EMBAIXADOR')}
                      className="text-slate-700 hover:text-purple-700 dark:text-zinc-400 dark:hover:text-purple-300 text-xs sm:text-[13px] leading-snug font-medium transition-colors duration-200 cursor-pointer text-left block py-0.5"
                    >
                      Embaixador do Primeiro Emprego
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNav('CURSOS_DISPONIVEIS')}
                      className="text-slate-700 hover:text-purple-700 dark:text-zinc-400 dark:hover:text-purple-300 text-xs sm:text-[13px] leading-snug font-medium transition-colors duration-200 cursor-pointer text-left block py-0.5"
                    >
                      Produtividade com IA
                    </button>
                  </li>
                </ul>
              </div>

              {/* COLUNA 2: Ferramentas & Vagas */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3.5">
                  Ferramentas &amp; Vagas
                </h4>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => handleNav('MAPA_PROXIMIDADE')}
                      className="text-slate-700 hover:text-purple-700 dark:text-zinc-400 dark:hover:text-purple-300 text-xs sm:text-[13px] leading-snug font-medium transition-colors duration-200 cursor-pointer text-left block py-0.5"
                    >
                      Mapa Inteligente de Vagas (Curitiba &amp; RMC)
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNav('HOLERITE', '/holerite')}
                      className="text-slate-700 hover:text-purple-700 dark:text-zinc-400 dark:hover:text-purple-300 text-xs sm:text-[13px] leading-snug font-medium transition-colors duration-200 cursor-pointer text-left block py-0.5"
                    >
                      Calculadora de Holerite &amp; Salário
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => router.push('/curriculo')}
                      className="text-slate-700 hover:text-purple-700 dark:text-zinc-400 dark:hover:text-purple-300 text-xs sm:text-[13px] leading-snug font-medium transition-colors duration-200 cursor-pointer text-left block py-0.5"
                    >
                      Gerador de Currículo Inteligente
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveModal('ENTREVISTAS')}
                      className="text-slate-700 hover:text-purple-700 dark:text-zinc-400 dark:hover:text-purple-300 text-xs sm:text-[13px] leading-snug font-medium transition-colors duration-200 cursor-pointer text-left block py-0.5"
                    >
                      Guia de Entrevistas &amp; Postura
                    </button>
                  </li>
                </ul>
              </div>

              {/* COLUNA 3: Institucional & Suporte */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3.5">
                  Institucional &amp; Suporte
                </h4>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setActiveModal('FAQ')}
                      className="text-slate-700 hover:text-purple-700 dark:text-zinc-400 dark:hover:text-purple-300 text-xs sm:text-[13px] leading-snug font-medium transition-colors duration-200 cursor-pointer text-left block py-0.5"
                    >
                      Dúvidas Frequentes (FAQ)
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveModal('EMPRESAS')}
                      className="text-slate-700 hover:text-purple-700 dark:text-zinc-400 dark:hover:text-purple-300 text-xs sm:text-[13px] leading-snug font-medium transition-colors duration-200 cursor-pointer text-left block py-0.5"
                    >
                      Como Funciona para Empresas
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveModal('TERMOS')}
                      className="text-slate-700 hover:text-purple-700 dark:text-zinc-400 dark:hover:text-purple-300 text-xs sm:text-[13px] leading-snug font-medium transition-colors duration-200 cursor-pointer text-left block py-0.5"
                    >
                      Termos de Uso da Plataforma
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveModal('LGPD')}
                      className="text-slate-700 hover:text-purple-700 dark:text-zinc-400 dark:hover:text-purple-300 text-xs sm:text-[13px] leading-snug font-medium transition-colors duration-200 cursor-pointer text-left block py-0.5"
                    >
                      Política de Privacidade &amp; LGPD
                    </button>
                  </li>
                </ul>
              </div>

            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. FAIXA INFERIOR DE CREDIBILIDADE (BOTTOM BAR)                            */}
        {/* ========================================================================= */}
        <div className="border-t border-[#ded9cb] dark:border-slate-800 my-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 dark:text-zinc-500 font-medium">
          <span className="text-center sm:text-left">
            © 2026 SkillHub — Plataforma de Formação Profissional e Empregabilidade Jovem. Todos os direitos reservados.
          </span>
          <span className="text-center sm:text-right shrink-0">
            Desenvolvido com foco no ecossistema de talentos locais | Curitiba, PR
          </span>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* MODAIS INFORMATIVOS & INSTITUCIONAIS                                     */}
      {/* ========================================================================= */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-purple-500/30 rounded-2xl p-6 shadow-2xl relative text-slate-900 dark:text-zinc-100 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-300 flex items-center justify-center font-bold text-sm">
                  {activeModal === 'FAQ' && <HelpCircle className="w-4 h-4" />}
                  {activeModal === 'TERMOS' && <FileText className="w-4 h-4" />}
                  {activeModal === 'LGPD' && <Lock className="w-4 h-4 text-emerald-500" />}
                  {activeModal === 'EMPRESAS' && <Building2 className="w-4 h-4 text-purple-600" />}
                  {activeModal === 'ENTREVISTAS' && <Briefcase className="w-4 h-4 text-amber-500" />}
                  {activeModal === 'EMBAIXADOR' && <Award className="w-4 h-4 text-purple-600" />}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {activeModal === 'FAQ' && 'Dúvidas Frequentes (FAQ)'}
                  {activeModal === 'TERMOS' && 'Termos de Uso da Plataforma'}
                  {activeModal === 'LGPD' && 'Privacidade & Proteção de Dados (LGPD)'}
                  {activeModal === 'EMPRESAS' && 'Como Funciona para Empresas'}
                  {activeModal === 'ENTREVISTAS' && 'Guia de Entrevistas & Postura'}
                  {activeModal === 'EMBAIXADOR' && 'Programa Embaixador do Primeiro Emprego'}
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-400 transition-colors cursor-pointer"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed space-y-3 max-h-[60vh] overflow-y-auto pr-2 font-medium">
              {activeModal === 'FAQ' && (
                <>
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white">Como me inscrevo nas vagas?</h5>
                    <p>Basta acessar a aba de Vagas ou o Mapa de Proximidade, selecionar a oportunidade desejada e clicar em "Candidatar-se". Seus dados do perfil serão enviados diretamente ao RH parceiro.</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white">Os cursos e certificados são gratuitos?</h5>
                    <p>Sim! Todos os cursos e trilhas oferecidos pelo SkillHub são 100% gratuitos para estudantes de Curitiba e RMC com emissão de microcertificações e badges.</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white">O SkillHub atende apenas Curitiba?</h5>
                    <p>Nosso foco principal é Curitiba e os 29 municípios da Região Metropolitana (RMC), conectando candidatos às linhas de transporte e bairros locais como CIC, Centro, Boqueirão, Pinhais, Araucária e São José dos Pinhais.</p>
                  </div>
                </>
              )}

              {activeModal === 'EMPRESAS' && (
                <>
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white">Contratação Segura de Jovens Talentos</h5>
                    <p>O SkillHub facilita o cumprimento da cota legal de aprendizagem (Lei 10.097/00) e a captação de estagiários qualificados, conectando empresas da RMC a candidatos pré-capacitados e certificados.</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white">Painel do Recrutador Integrado</h5>
                    <p>Anuncie vagas com filtros de proximidade por linhas de ônibus da URBS/Comec e avalie o índice de engajamento do jovem nas trilhas de capacitação antes da entrevista.</p>
                  </div>
                </>
              )}

              {activeModal === 'ENTREVISTAS' && (
                <>
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white">1. Pontualidade e Rota Antecipada</h5>
                    <p>Consulte antecipadamente o trajeto de ônibus pelo nosso Mapa Inteligente. Chegar 15 minutos antes demonstra organização e confiabilidade.</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white">2. Demonstre Vontade de Aprender</h5>
                    <p>Para o primeiro emprego e estágio, recrutadores valorizam mais a curiosidade, disciplina e vontade de evoluir do que a experiência prévia.</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white">3. Conheça a Empresa</h5>
                    <p>Pesquise o que a empresa faz em Curitiba. Isso mostra preparação e interesse genuíno na oportunidade.</p>
                  </div>
                </>
              )}

              {activeModal === 'EMBAIXADOR' && (
                <>
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white">Liderança Jovem nas Escolas e Colégios</h5>
                    <p>O programa Embaixador reconhece jovens estudantes que compartilham as capacitações e vagas do SkillHub com sua turma escolar ou comunidade local.</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white">Benefícios e Selo Especial</h5>
                    <p>Embaixadores recebem mentorias exclusivas de carreira, destaque em processos seletivos locais e o selo oficial de Liderança Jovem.</p>
                  </div>
                </>
              )}

              {activeModal === 'TERMOS' && (
                <>
                  <p>
                    O <strong>SkillHub</strong> é um serviço de intermediação de aprendizagem e primeiro emprego regulamentado pelas Leis nº 10.097/00 (Lei da Aprendizagem) e nº 11.788/08 (Lei do Estágio).
                  </p>
                  <p>
                    É estritamente proibida qualquer cobrança de taxas de seleção ou inscrição aos candidatos. As empresas parceiras passam por verificação de CNPJ ativo antes de anunciar qualquer vaga.
                  </p>
                </>
              )}

              {activeModal === 'LGPD' && (
                <>
                  <p>
                    Em estrita conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), seus dados pessoais, endereço e contato são mantidos sob sigilo e apenas compartilhados com empresas e recrutadores mediante o seu consentimento expresso ao se candidatar.
                  </p>
                  <p>
                    Para menores de 18 anos, aplicam-se as salvaguardas adicionais do Estatuto da Criança e do Adolescente (ECA) e proteção especial aos dados sensíveis do estudante.
                  </p>
                </>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors cursor-pointer shadow-sm"
              >
                Entendi e Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
