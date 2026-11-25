'use client';

import React, { useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  Compass, 
  Sparkles, 
  EyeOff, 
  Eye, 
  ChevronRight, 
  CheckCircle2, 
  GraduationCap, 
  Award, 
  Building2, 
  Briefcase, 
  Calculator, 
  FileCheck2, 
  Layers, 
  BookOpen, 
  ShieldCheck,
  UserCheck
} from 'lucide-react';

interface RouteGuideInfo {
  tag: string;
  title: string;
  icon: React.ReactNode;
  accentBorder: string;
  accentBg: string;
  description: string;
  whatToTest: string[];
  badges: string[];
}

export default function DemoPageGuide() {
  const pathname = usePathname();
  const { isDemoMode, isAuthenticated, role, student, currentUser } = useApp();
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  // Não renderizar se não estiver em Modo Demonstração, se não estiver logado ou na tela de login
  if (!isDemoMode || !isAuthenticated || pathname === '/login') {
    return null;
  }

  // Mapeamento contextual inteligente com base na rota ativa
  const guideInfo: RouteGuideInfo = useMemo(() => {
    const isCompany = role === 'RECRUTADOR' || pathname?.includes('/dashboard/empresa');

    // 1. Dashboard Candidato ou Empresa
    if (pathname === '/dashboard' || pathname === '/dashboard/candidato' || pathname === '/') {
      if (isCompany) {
        return {
          tag: 'Ambiente Corporativo RH',
          title: 'Painel da Empresa & Gestão de Vagas na RMC',
          icon: <Building2 className="w-5 h-5 text-amber-400" />,
          accentBorder: 'border-amber-500/30',
          accentBg: 'from-amber-950/40 to-slate-900/60',
          description: 'Ambiente de recrutamento do SkillHub onde as empresas de Curitiba publicam oportunidades de aprendizagem e estágio com validação jurídica automática (Lei 10.097/00 e Lei 11.788/08) e contratam jovens capacitados por proximidade de transporte.',
          whatToTest: [
            'Veja o pipeline ATS com candidatos reais da RMC ranqueados por proximidade e compatibilidade de badges.',
            'Teste publicar uma nova vaga e observe a ação dos filtros de integridade contra cobrança de taxas a jovens.',
            'Analise a triagem de candidatos por linha de ônibus e bairro de residência.'
          ],
          badges: ['Compliance Lei 10.097', 'LGPD de Menores', 'Triagem por Proximidade']
        };
      }

      return {
        tag: 'Visão Geral do Aluno',
        title: 'Painel do Estudante & Métricas de Evolução',
        icon: <GraduationCap className="w-5 h-5 text-purple-400" />,
        accentBorder: 'border-purple-500/30',
        accentBg: 'from-purple-950/50 to-slate-900/60',
        description: 'Centro de comando do jovem aprendiz. Reúne em tempo real o total de horas certificadas, selos conquistados, cursos em andamento e status das candidaturas enviadas para empresas parceiras de Curitiba e RMC.',
        whatToTest: [
          'Confira os 4 cursos estratégicos já 100% concluídos no perfil modelo do Lucas Andrade e o curso em andamento (IA & Produtividade a 50%).',
          'Observe as 2 candidaturas ativas (Bosch CIC e Condor Boqueirão) com status de análise e entrevista.',
          'Clique em "Continuar Curso" ou navegue pelo menu superior para testar as outras telas.'
        ],
        badges: ['4 Cursos Concluídos', '48h Certificadas', '2 Candidaturas Ativas']
      };
    }

    if (pathname === '/dashboard/empresa') {
      return {
        tag: 'Painel Recrutador',
        title: 'Portal de Gestão de Talentos Corporativo',
        icon: <Building2 className="w-5 h-5 text-amber-400" />,
        accentBorder: 'border-amber-500/30',
        accentBg: 'from-amber-950/40 to-slate-900/60',
        description: 'Painel de contratação corporativa para empresas parceiras de Curitiba anunciarem vagas protegidas e selecionarem jovens qualificados pelo SkillHub.',
        whatToTest: [
          'Acompanhe o funil de candidatos inscritos nas vagas da Renault e Bosch.',
          'Consulte os badges e certificados emitidos para os jovens antes de agendar entrevistas.'
        ],
        badges: ['ATS de Triagem', 'Empresas Curitiba & RMC', 'Gestão de Cota']
      };
    }

    // 2. Catálogo de Cursos
    if (pathname === '/cursos') {
      return {
        tag: 'Capacitação Profissional',
        title: 'Catálogo de Cursos Práticos (33 Cursos Únicos)',
        icon: <BookOpen className="w-5 h-5 text-purple-400" />,
        accentBorder: 'border-purple-500/30',
        accentBg: 'from-purple-950/50 to-slate-900/60',
        description: 'Catálogo completo com 33 cursos práticos elaborados para suprir as principais carências de qualificação de jovens em Curitiba & RMC. Abrange Excel Avançado, Power BI, IA para Escritório, LGPD, Finanças e Postura Profissional.',
        whatToTest: [
          'Filtre por nível (Iniciante, Intermediário e Avançado) e confirme a contagem dinâmica de 33 cursos.',
          'Clique em "Excel Avançado" ou "Power BI" para abrir a sala de aula e testar a visualização do Certificado Oficial.',
          'Abra o curso "Inteligência Artificial e Automação" para ver o progresso de 50% em andamento.'
        ],
        badges: ['33 Cursos Práticos', 'Microcertificações', 'Foco RMC']
      };
    }

    // 3. Sala de Aula / Detalhe de Curso
    if (pathname?.startsWith('/cursos/')) {
      return {
        tag: 'Sala de Aula & Certificação',
        title: 'Ambiente Imersivo de Estudo & Emissão de Certificado',
        icon: <Sparkles className="w-5 h-5 text-amber-400" />,
        accentBorder: 'border-amber-500/30',
        accentBg: 'from-amber-950/40 to-slate-900/60',
        description: 'Ambiente de aula com ementa modular, vídeo-player lado a lado, temporizador de estudo e teste final de fixação (Quiz) protegido pelo Guardrail de aprovação mínima de 70%.',
        whatToTest: [
          'Se o curso estiver concluído, clique no botão dourado "Ver Certificado Oficial" para testar o diploma interativo Frente & Verso.',
          'Teste o botão "Ver Verso" para inspecionar a ementa oficial e competências, e teste o QR Code e o botão de adicionar ao LinkedIn.',
          'Navegue entre as abas de Módulos e faça o Quiz de avaliação para verificar a nota e emissão de badge.'
        ],
        badges: ['Certificado Frente & Verso', 'QR Code de Autenticidade', 'Botão LinkedIn']
      };
    }

    // 4. Trilhas de Aprendizagem
    if (pathname === '/trilhas' || pathname === '/minhas-trilhas') {
      return {
        tag: 'Trilhas de Carreira',
        title: 'Trilhas Estruturadas de Formação da RMC (8 Trilhas)',
        icon: <Layers className="w-5 h-5 text-emerald-400" />,
        accentBorder: 'border-emerald-500/30',
        accentBg: 'from-emerald-950/40 to-slate-900/60',
        description: '8 trilhas que combinam cursos complementares em roteiros de aprendizagem sequenciais. Cada trilha finalizada emite um badge de honra e posiciona o aluno como especialista perante os recrutadores.',
        whatToTest: [
          'Observe as 8 trilhas disponíveis com cálculo automático de horas totais e cursos necessários.',
          'Veja o progresso proporcional calculado a partir dos cursos já concluídos pelo candidato modelo.',
          'Clique em uma trilha para inspecionar a sequência pedagógica passo a passo.'
        ],
        badges: ['8 Trilhas Oficiais', 'Badges de Especialista', 'Progressão de Nível']
      };
    }

    // 5. Vagas e Mapa
    if (pathname === '/vagas') {
      return {
        tag: 'Empregabilidade & Proximidade',
        title: 'Mural de Oportunidades & Mapa de Proximidade da RMC',
        icon: <Briefcase className="w-5 h-5 text-blue-400" />,
        accentBorder: 'border-blue-500/30',
        accentBg: 'from-blue-950/40 to-slate-900/60',
        description: 'Motor de conexão com vagas de Jovem Aprendiz e Estagiário em Curitiba e Região Metropolitana. Calcula a compatibilidade entre as qualificações do candidato e as exigências da vaga, priorizando proximidade por linhas de ônibus.',
        whatToTest: [
          'Filtre as vagas por bairros de Curitiba (ex: CIC, Boqueirão, Centro) ou por modalidade de contratação.',
          'Observe a indicação de compatibilidade (Match) em badges verdes correspondentes aos certificados do Lucas.',
          'Clique em "Candidatar-se" em uma vaga aberta para testar o envio com emissão instantânea de protocolo LGPD.'
        ],
        badges: ['Match de Badges', 'Rotas de Ônibus', 'Protocolo LGPD']
      };
    }

    // 6. Perfil / Passaporte de Competências
    if (pathname === '/perfil') {
      return {
        tag: 'Passaporte Profissional',
        title: 'Passaporte de Competências & Portfólio Público',
        icon: <FileCheck2 className="w-5 h-5 text-amber-400" />,
        accentBorder: 'border-amber-500/30',
        accentBg: 'from-amber-950/40 to-slate-900/60',
        description: 'Portfólio público compartilhável do estudante. Reúne todos os certificados emitidos com códigos de autenticidade determinísticos SH-2026-[HASH], matriz de competências da RMC e gerador de resumo para currículo e LinkedIn.',
        whatToTest: [
          'Clique em "Validar Credencial" em qualquer curso concluído para abrir a rota pública /validar/[codigo].',
          'Clique em "Copiar para Currículo" para copiar a linha formatada para CV.',
          'Experimente o botão "Copiar Resumo Profissional" (Sobre Mim) pronto para o perfil do LinkedIn.',
          'Edite o nome ou cidade no cabeçalho para ver a atualização em tempo real.'
        ],
        badges: ['Códigos SH-2026-[HASH]', 'Matriz de Skills', 'Resumo 1-Clique']
      };
    }

    // 7. Holerite / Salário
    if (pathname === '/holerite' || pathname === '/salario') {
      return {
        tag: 'Simulador Financeiro',
        title: 'Simulador de Holerite & Planejamento do Primeiro Salário',
        icon: <Calculator className="w-5 h-5 text-emerald-400" />,
        accentBorder: 'border-emerald-500/30',
        accentBg: 'from-emerald-950/40 to-slate-900/60',
        description: 'Simulador educativo em conformidade com as Leis 10.097/00 e 11.788/08. Demonstra os cálculos exatos de salário bruto, descontos legais (INSS, VT) e salário líquido para jornadas de 20h, 30h e 40h semanais em Curitiba.',
        whatToTest: [
          'Alterne entre as opções de jornada (20h, 30h e 40h) e veja a alteração instantânea do holerite detalhado.',
          'Consulte a divisão de orçamento recomendada (Regra 50-30-20) e o mapa mental de equilíbrio financeiro.',
          'Analise a explicação jurídica dos descontos legais permitidos por lei.'
        ],
        badges: ['Cálculo CLT & Estágio', 'Regra 50-30-20', 'Mapa Mental']
      };
    }

    // 8. Currículo
    if (pathname === '/curriculo') {
      return {
        tag: 'Ferramenta de Empregabilidade',
        title: 'Gerador de Currículo Otimizado para ATS',
        icon: <FileCheck2 className="w-5 h-5 text-purple-400" />,
        accentBorder: 'border-purple-500/30',
        accentBg: 'from-purple-950/50 to-slate-900/60',
        description: 'Gerador de currículo inteligente que incorpora automaticamente as qualificações, carga horária e códigos de validação do SkillHub, formatado para sistemas de triagem de RH (ATS).',
        whatToTest: [
          'Veja os cursos certificados importados automaticamente no bloco de formação.',
          'Personalize dados de contato e visualize a prévia formatada para impressão limpa.'
        ],
        badges: ['Compatível com ATS', 'Certificações Integradas', 'Layout A4']
      };
    }

    // 9. Validação Pública de Certificados
    if (pathname?.startsWith('/validar')) {
      return {
        tag: 'Autenticidade & Verificação',
        title: 'Página Pública de Validação de Credenciais',
        icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
        accentBorder: 'border-emerald-500/30',
        accentBg: 'from-emerald-950/40 to-slate-900/60',
        description: 'Página pública aberta a qualquer empresa, recrutador ou instituição para validação instantânea de diplomas emitidos pelo SkillHub usando o código determinístico SH-2026-[HASH].',
        whatToTest: [
          'Observe o selo oficial de autenticidade emitido para a credencial consultada.',
          'Confira a checagem da ementa do curso, competências adquiridas e dados do aluno.',
          'Digite outro código ou teste um hash aleatório para verificar a resposta de credencial inválida.'
        ],
        badges: ['Validação Instantânea', 'Código SH-2026', 'Selo Oficial RMC']
      };
    }

    // 10. Sobre o SkillHub
    if (pathname === '/sobre') {
      return {
        tag: 'Institucional & Missão',
        title: 'Sobre a Plataforma SkillHub (Curitiba & RMC)',
        icon: <Compass className="w-5 h-5 text-amber-400" />,
        accentBorder: 'border-amber-500/30',
        accentBg: 'from-amber-950/40 to-slate-900/60',
        description: 'Informações sobre a missão social do SkillHub, integração com os ecossistemas industriais de Curitiba e conformidade com o Estatuto da Juventude e a Lei da Aprendizagem.',
        whatToTest: [
          'Conheça os pilares de impacto social, gamificação com propósito e segurança jurídica.',
          'Consulte as diretrizes regionais de atendimento à RMC.'
        ],
        badges: ['Impacto Social Curitiba', 'Lei 10.097', 'LGPD de Menores']
      };
    }

    // Fallback geral
    return {
      tag: 'Visita Guiada do Modo Demonstração',
      title: 'Ambiente de Avaliação da Plataforma SkillHub',
      icon: <Compass className="w-5 h-5 text-amber-400" />,
      accentBorder: 'border-purple-500/30',
      accentBg: 'from-purple-950/50 to-slate-900/60',
      description: 'Você está navegando no SkillHub em Modo Demonstração com dados realistas de Curitiba & RMC. Explore os cursos, trilhas, vagas e ferramentas financeiras disponíveis.',
      whatToTest: [
        'Utilize a barra de navegação no topo para alternar entre Cursos, Trilhas, Vagas, Perfil e Holerite.',
        'Ao finalizar a avaliação, clique em "Sair da Demonstração" no banner superior para retornar ao login.'
      ],
      badges: ['Navegação Guiada', 'Modo Demonstração', 'Curitiba & RMC']
    };
  }, [pathname, role]);

  // Se o usuário ocultou a dica nesta página
  if (isDismissed) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-2 pb-1 print:hidden animate-fadeIn">
        <button
          type="button"
          onClick={() => setIsDismissed(false)}
          className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 text-purple-200 border border-purple-500/30 shadow-sm transition-all cursor-pointer"
          title="Reabrir a visita guiada desta página"
        >
          <Compass className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
          <span>Ver Dica de Avaliação da Página</span>
          <Eye className="w-3.5 h-3.5 text-purple-300" />
        </button>
      </div>
    );
  }

  return (
    <aside 
      aria-label="Guia do Modo Demonstração"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-3 pb-1 print:hidden animate-fadeIn"
    >
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${guideInfo.accentBg} backdrop-blur-xl border ${guideInfo.accentBorder} p-4 sm:p-5 shadow-2xl transition-all`}>
        
        {/* Glow de fundo */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4">
          
          {/* Lado Esquerdo: Tag, Título e Explicação */}
          <div className="flex-1 space-y-2.5">
            
            {/* Linha de topo: Ícone + Tag + Badges de destaque */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-black/30 border border-white/10 shadow-inner">
                {guideInfo.icon}
              </span>

              <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-900/60 text-purple-200 border border-purple-400/30">
                {guideInfo.tag}
              </span>

              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                Guia de Avaliação
              </span>

              {guideInfo.badges.map((b) => (
                <span key={b} className="hidden lg:inline-flex text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 text-zinc-300 border border-white/10">
                  {b}
                </span>
              ))}
            </div>

            {/* Título da Rota */}
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span>{guideInfo.title}</span>
            </h2>

            {/* Explicação de propósito (2-3 linhas) */}
            {!isCollapsed && (
              <p className="text-xs sm:text-sm text-purple-100/90 dark:text-zinc-200 leading-relaxed font-normal max-w-4xl">
                {guideInfo.description}
              </p>
            )}

            {/* Caixa em destaque: O que testar nesta página */}
            {!isCollapsed && guideInfo.whatToTest.length > 0 && (
              <div className="mt-3 p-3 rounded-xl bg-black/30 border border-white/10 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>💡 O que testar nesta página durante a avaliação:</span>
                </div>
                <ul className="space-y-1 pl-1">
                  {guideInfo.whatToTest.map((tip, idx) => (
                    <li key={idx} className="text-[11px] sm:text-xs text-zinc-300 flex items-start gap-2 leading-snug">
                      <ChevronRight className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* Lado Direito: Ações rápidas (Recolher / Ocultar) */}
          <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-2 shrink-0 pt-1 border-t md:border-t-0 border-white/10">
            <button
              type="button"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-[11px] font-semibold text-purple-200 hover:text-white px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-1.5"
              title={isCollapsed ? 'Expandir explicações detalhadas' : 'Recolher detalhes do card'}
            >
              <span>{isCollapsed ? 'Expandir Dica' : 'Recolher'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsDismissed(true)}
              className="text-[11px] font-semibold text-zinc-400 hover:text-zinc-200 px-2.5 py-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer flex items-center gap-1.5"
              title="Ocultar esta dica durante a navegação desta página"
            >
              <EyeOff className="w-3.5 h-3.5" />
              <span>Ocultar Dica</span>
            </button>
          </div>

        </div>

      </div>
    </aside>
  );
}
