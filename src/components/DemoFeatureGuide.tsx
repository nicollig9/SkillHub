'use client';

import React, { useState } from 'react';
import { useApp, AppView } from '@/context/AppContext';
import { CandidateProfileType } from '@/types';
import { 
  Sparkles, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Calculator, 
  Award, 
  GraduationCap, 
  Building2, 
  Briefcase, 
  LogOut, 
  ArrowRight,
  RefreshCw,
  Lightbulb,
  FileText
} from 'lucide-react';

interface GuideContent {
  title: string;
  badge: string;
  icon: React.ReactNode;
  summary: string;
  howItWorks: string[];
  whatToTest: string[];
  legalRule: string;
}

export default function DemoFeatureGuide() {
  const { 
    isDemoMode, 
    currentView, 
    role, 
    candidateProfileType, 
    loginUser, 
    logout, 
    setCurrentView 
  } = useApp();

  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  if (!isDemoMode) {
    return null;
  }

  // Definição rica do guia para cada tela
  const getGuideContent = (): GuideContent => {
    if (role === 'RECRUTADOR') {
      return {
        title: 'Painel da Empresa & Gestão de Contratação Segura',
        badge: 'Ambiente Corporativo',
        icon: <Building2 className="w-5 h-5 text-amber-400" />,
        summary: 'Ambiente onde as empresas de Curitiba e RMC publicam oportunidades com validação jurídica automática e encontram jovens capacitados por bairro.',
        howItWorks: [
          'Exibe as vagas abertas da empresa, status de homologação de CNPJ e contagem de candidatos inscritos.',
          'Permite abrir novas vagas com verificação em tempo real de termos discriminatórios pelo Guardrail de IA.',
          'Filtra e ranqueia candidatos com base na proximidade do bairro da vaga e nos badges de capacitação obtidos na plataforma.'
        ],
        whatToTest: [
          'Clique em "Cadastrar Nova Vaga" e teste termos como "boa aparência" ou "somente solteiros" para ver o filtro antiassédio bloquear a publicação.',
          'Veja os candidatos já inscritos na vaga de Aprendiz Administrativo e o cálculo de distância em km até o local de trabalho.'
        ],
        legalRule: 'Cumprimento estrito do Art. 429 da CLT (Cota de Aprendizagem 5% a 15%), proibição total de cobrança de taxas dos candidatos e proteção de dados de menores conforme a LGPD.'
      };
    }

    switch (currentView) {
      case 'DASHBOARD':
      case 'INICIO':
      case 'LOGIN':
        return {
          title: 'Painel Geral do Aluno (Dashboard)',
          badge: 'Visão Geral & Boas-Vindas',
          icon: <GraduationCap className="w-5 h-5 text-purple-300" />,
          summary: 'Centro de comando do candidato. Reúne em um só lugar métricas de estudo, atalhos para retomar aulas, cursos recomendados e vagas abertas em Curitiba.',
          howItWorks: [
            'Apresenta o perfil ativo (Jovem Aprendiz, Estágio ou 1º Emprego) com status de regularidade e bairro de residência.',
            'Informa o total de horas de capacitação concluídas, badges conquistados e taxa de aproveitamento nos testes.',
            'Sugere cursos de nivelamento prioritários e vagas próximas para envio de candidatura com 1 clique.'
          ],
          whatToTest: [
            'Clique no botão "Continuar Curso" para abrir o visualizador de lições interativo.',
            'Abra o menu lateral (ícone de menu no topo esquerdo) para explorar o Simulador de Holerite ou o Mapa de Vagas.',
            'Veja os cards de status que mudam dinamicamente conforme você estuda.'
          ],
          legalRule: 'Personalização imediata conforme a faixa etária e situação escolar. Garante que jovens menores de idade só tenham acesso a oportunidades compatíveis com a legislação de proteção escolar.'
        };

      case 'CURSOS':
      case 'CURSOS_DISPONIVEIS':
        return {
          title: 'Catálogo de Cursos de Capacitação',
          badge: 'Formação Profissional',
          icon: <Award className="w-5 h-5 text-purple-300" />,
          summary: 'Vitrine de cursos gratuitos desenvolvidos para preparar o jovem com as habilidades práticas mais exigidas pelas empresas contratantes.',
          howItWorks: [
            'Cursos segmentados em tópicos práticos: Atendimento ao Cliente, Postura Corporativa, Informática Básica, Legislação Trabalhista e Comunicação Não-Violenta.',
            'Cada curso é composto por módulos didáticos objetivos com estimativa de tempo e barra de progresso individual.',
            'A conclusão dos módulos libera a avaliação final (Quiz) que emite o Badge Digital com código verificador.'
          ],
          whatToTest: [
            'Clique em "Acessar Curso" em qualquer um dos cards disponíveis.',
            'Veja os detalhes da ementa e a competência profissional que será desenvolvida.'
          ],
          legalRule: 'Formação teórica metodologicamente alinhada às diretrizes do Ministério do Trabalho e Emprego para Programas de Aprendizagem Profissional.'
        };

      case 'MEUS_CURSOS':
        return {
          title: 'Meus Cursos em Andamento & Histórico',
          badge: 'Área do Aluno',
          icon: <GraduationCap className="w-5 h-5 text-purple-300" />,
          summary: 'Acompanhamento do progresso das aulas que você já iniciou, com porcentagem concluída e status de certificação.',
          howItWorks: [
            'Salva onde você parou em cada lição para que você continue seus estudos a qualquer momento sem perder tempo.',
            'Destaca cursos concluídos com badge emitido e cursos que ainda necessitam de finalização do quiz.'
          ],
          whatToTest: [
            'Clique em "Continuar Aula" para retomar o estudo diretamente no módulo pendente.'
          ],
          legalRule: 'Comprovação de frequência e carga horária para cumprimento de exigência teórica do contrato de aprendizagem.'
        };

      case 'TRILHAS':
      case 'TRILHAS_DISPONIVEIS':
      case 'MINHAS_TRILHAS':
        return {
          title: 'Trilhas de Aprendizagem de Carreira',
          badge: 'Jornada Profissional',
          icon: <Briefcase className="w-5 h-5 text-purple-300" />,
          summary: 'Caminhos sequenciais de aprendizado que capacitam o candidato para ocupações específicas no mercado de trabalho.',
          howItWorks: [
            'Agrupa cursos complementares que cobrem competências técnicas (Hard Skills) e comportamentais (Soft Skills).',
            'Exemplos de trilhas: Assistente Administrativo, Vendas & Atendimento ao Cliente e Auxiliar de Logística.',
            'Ao completar todos os cursos de uma trilha, o candidato recebe recomendação prioritária em vagas daquela área.'
          ],
          whatToTest: [
            'Explore os módulos de cada trilha e visualize quais competências são desenvolvidas.'
          ],
          legalRule: 'Alinhamento com a CBO (Classificação Brasileira de Ocupações) para garantir aprendizado válido perante convenções coletivas.'
        };

      case 'MINHAS_AVALIACOES':
        return {
          title: 'Histórico de Avaliações & Quizzes Realizados',
          badge: 'Desempenho Acadêmico',
          icon: <CheckCircle2 className="w-5 h-5 text-purple-300" />,
          summary: 'Registro transparente de notas, porcentagens de acerto e aprovações em todas as avaliações teóricas.',
          howItWorks: [
            'Exibe a data de cada tentativa, pontuação alcançada e se você atingiu a nota mínima exigida de 70%.',
            'Permite refazer os testes caso você queira melhorar sua nota ou revisar os conteúdos errados.'
          ],
          whatToTest: [
            'Complete um curso e faça o quiz para ver sua nota registrada nesta tela com o badge correspondente liberado.'
          ],
          legalRule: 'Critério objetivo de corte pedagógico (mínimo de 70%) para atestar a qualificação real do jovem perante os recrutadores.'
        };

      case 'CURSO_DETALHE':
        return {
          title: 'Visualizador de Lições & Avaliação Final (Quiz)',
          badge: 'Sala de Aula Virtual',
          icon: <FileText className="w-5 h-5 text-purple-300" />,
          summary: 'Ambiente interativo de estudo com leitura dos módulos, acompanhamento de progresso e realização do exame final.',
          howItWorks: [
            'Apresenta o conteúdo da aula dividido em módulos com texto explicativo e dicas de etiqueta corporativa.',
            'O botão "Concluir Módulo" salva o progresso e destrava a próxima aula.',
            'Ao completar todos os módulos, o Quiz Final é liberado com perguntas de múltipla escolha e pontuação instantânea.'
          ],
          whatToTest: [
            'Clique em "Concluir Módulo" para avançar na barra de progresso.',
            'Responda ao Quiz Final e obtenha 70% de acertos para gerar seu Badge autenticado na hora!'
          ],
          legalRule: 'Garantia de aproveitamento educacional com feedback imediato e emissão de certificado digital verificável.'
        };

      case 'MAPA_PROXIMIDADE':
        return {
          title: 'Mapa de Oportunidades por Proximidade (Curitiba)',
          badge: 'Geolocalização & Vagas',
          icon: <MapPin className="w-5 h-5 text-emerald-400" />,
          summary: 'Ferramenta pioneira de mapeamento geográfico que calcula a distância real entre a casa do jovem e a sede da empresa em 75 bairros de Curitiba.',
          howItWorks: [
            'Mapeia vagas em tempo real nos bairros de Curitiba (Boqueirão, CIC, Batel, Portão, Centro, Pinheirinho, etc.).',
            'Calcula a distância estimada em quilômetros em relação ao endereço do aluno, priorizando opções mais próximas.',
            'Permite filtrar por tipo de vaga (Jovem Aprendiz, Estágio ou Efetivo) e por bairro de interesse.'
          ],
          whatToTest: [
            'Altere o filtro de bairro no seletor para ver a reordenação das vagas por proximidade em km.',
            'Clique no botão "Candidatar-se" em qualquer vaga para simular a inscrição imediata com currículo protegido.'
          ],
          legalRule: 'Redução de tempo e custo de deslocamento para o jovem, e conformidade com limites da Lei 10.097/00 (máximo 6h diárias sem horas extras para menores).'
        };

      case 'HOLERITE':
        return {
          title: 'Simulador Realista de Holerite & Salário Líquido',
          badge: 'Educação Financeira',
          icon: <Calculator className="w-5 h-5 text-amber-400" />,
          summary: 'Simulador oficial que ensina o jovem a calcular seu salário líquido e entender todos os descontos legais do contracheque sem surpresas.',
          howItWorks: [
            'Aplica a tabela progressiva oficial de INSS 2026 sobre os rendimentos brutos.',
            'Calcula o desconto legal de Vale Transporte (máximo de 6% do salário base, conforme a Lei nº 7.418/85).',
            'Informa a contribuição de FGTS paga pela empresa (alíquota especial reduzida de 2% para Jovem Aprendiz).',
            'Gera o contracheque completo visual com demonstrativo de proventos, descontos e total líquido depositado.'
          ],
          whatToTest: [
            'Modifique o salário base ou ative opções de Vale Transporte e Vale Refeição para ver os cálculos em tempo real.',
            'Passe o mouse ou toque nos itens de desconto para ler o que cada rubrica significa de acordo com a CLT.'
          ],
          legalRule: 'Educação financeira obrigatória e transparência total com a Consolidação das Leis do Trabalho (CLT) e Lei do Jovem Aprendiz.'
        };

      case 'BADGES_PERFIL':
        return {
          title: 'Carteira Digital de Badges & Credenciais Verificáveis',
          badge: 'Reconhecimento Profissional',
          icon: <Award className="w-5 h-5 text-amber-400" />,
          summary: 'Espaço onde ficam guardadas as microcertificações digitais emitidas após a aprovação nos cursos da plataforma.',
          howItWorks: [
            'Cada badge conquistado recebe uma chave de autenticação criptográfica (ex: SKILL-PR-2026-XXXX).',
            'O selo pode ser verificado por recrutadores e anexado ao currículo em formato de link ou QR Code.',
            'Comprova habilidades práticas mesmo que o jovem ainda não tenha experiência formal em carteira de trabalho.'
          ],
          whatToTest: [
            'Veja os selos disponíveis e os já conquistados com nota e data de conclusão.',
            'Copie o código verificador para simular a validação por um departamento de Recursos Humanos.'
          ],
          legalRule: 'Padrão aberto de microcredenciais educacionais que valoriza a formação técnica continuada e facilita a empregabilidade jovem.'
        };

      default:
        return {
          title: 'Navegação no Modo Demonstração',
          badge: 'Tour Ativo',
          icon: <Sparkles className="w-5 h-5 text-amber-400" />,
          summary: 'Você está navegando pelo SkillHub no Modo Demonstração interativo.',
          howItWorks: [
            'Explore as diferentes seções pelo menu lateral ou pelos atalhos da interface.',
            'Todos os formulários, simuladores e quizzes podem ser testados livremente.'
          ],
          whatToTest: [
            'Experimente abrir o simulador de holerite ou consultar as vagas no mapa de Curitiba.'
          ],
          legalRule: 'Ambiente sandbox protegido sem coleta de dados pessoais sensíveis.'
        };
    }
  };

  const guide = getGuideContent();

  const getProfileLabel = () => {
    if (role === 'RECRUTADOR') return 'Empresa / Recrutador RH';
    if (candidateProfileType === 'ESTAGIARIO') return 'Estagiário (Lei 11.788)';
    if (candidateProfileType === 'PRIMEIRO_EMPREGO') return '1º Emprego (Sem Experiência)';
    return 'Jovem Aprendiz (Lei 10.097)';
  };

  const switchDemoProfile = (targetProfile: CandidateProfileType) => {
    loginUser('demo@skillhub.com.br', 'ALUNO', targetProfile, `Visitante (Demonstração - ${targetProfile})`, true);
  };

  const switchDemoToCompany = () => {
    loginUser('rh.demo@empresa.com.br', 'RECRUTADOR', 'JOVEM_APRENDIZ', 'Empresa Parceira (Demonstração)', true);
  };

  return (
    <div className="w-full mb-6 relative z-20">
      <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-br from-[#230D42] via-[#1A0A31] to-[#120524] text-white shadow-xl overflow-hidden transition-all duration-300">
        
        {/* Barra de Topo do Banner de Demonstração */}
        <div className="px-4 py-3 bg-gradient-to-r from-amber-600/30 via-purple-600/30 to-amber-600/20 border-b border-amber-500/30 flex flex-wrap items-center justify-between gap-3">
          
          {/* Badge & Título */}
          <div className="flex items-center gap-2.5">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Modo Demonstração Ativo</span>
              </span>
              <span className="text-xs text-purple-200 hidden sm:inline">
                • Navegando como: <strong className="text-amber-300">{getProfileLabel()}</strong>
              </span>
            </div>
          </div>

          {/* Ações Rápidas: Alternar Perfil, Minimizar, Sair */}
          <div className="flex items-center gap-2">
            
            {/* Botão de Alternar Perfil Rápido */}
            <div className="hidden md:flex items-center gap-1 bg-[#10061D]/80 p-1 rounded-xl border border-purple-500/30 text-[11px]">
              <span className="text-purple-300 px-1.5 font-semibold">Testar como:</span>
              <button
                type="button"
                onClick={() => switchDemoProfile('JOVEM_APRENDIZ')}
                className={`px-2 py-0.5 rounded-lg transition-all ${
                  role === 'ALUNO' && candidateProfileType === 'JOVEM_APRENDIZ'
                    ? 'bg-purple-600 text-white font-bold'
                    : 'text-purple-300 hover:text-white'
                }`}
                title="Mudar para visão de Jovem Aprendiz"
              >
                Aprendiz
              </button>
              <button
                type="button"
                onClick={() => switchDemoProfile('ESTAGIARIO')}
                className={`px-2 py-0.5 rounded-lg transition-all ${
                  role === 'ALUNO' && candidateProfileType === 'ESTAGIARIO'
                    ? 'bg-purple-600 text-white font-bold'
                    : 'text-purple-300 hover:text-white'
                }`}
                title="Mudar para visão de Estagiário"
              >
                Estágio
              </button>
              <button
                type="button"
                onClick={() => switchDemoProfile('PRIMEIRO_EMPREGO')}
                className={`px-2 py-0.5 rounded-lg transition-all ${
                  role === 'ALUNO' && candidateProfileType === 'PRIMEIRO_EMPREGO'
                    ? 'bg-purple-600 text-white font-bold'
                    : 'text-purple-300 hover:text-white'
                }`}
                title="Mudar para visão de 1º Emprego"
              >
                1º Emprego
              </button>
              <button
                type="button"
                onClick={switchDemoToCompany}
                className={`px-2 py-0.5 rounded-lg transition-all ${
                  role === 'RECRUTADOR'
                    ? 'bg-amber-600 text-white font-bold'
                    : 'text-amber-300 hover:text-white'
                }`}
                title="Mudar para visão de Empresa RH"
              >
                Empresa RH
              </button>
            </div>

            {/* Toggle Expandir / Minimizar */}
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-2.5 py-1 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 border border-purple-500/40 text-purple-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
              title={isExpanded ? 'Recolher explicações desta tela' : 'Ver explicações detalhadas desta tela'}
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
              <span>{isExpanded ? 'Recolher Guia' : 'Como Funciona Esta Página?'}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {/* Sair da Demonstração */}
            <button
              type="button"
              onClick={logout}
              className="px-2.5 py-1 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/40 text-rose-300 hover:text-white text-xs font-semibold flex items-center gap-1 transition-all"
              title="Encerrar tour e voltar para o login"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sair do Tour</span>
            </button>
          </div>
        </div>

        {/* Corpo Explicativo da Página Atual */}
        {isExpanded && (
          <div className="p-4 sm:p-5 space-y-4 animate-fadeIn">
            
            {/* Cabeçalho da Funcionalidade */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-800/40 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-900/50 border border-purple-500/40 flex items-center justify-center shrink-0">
                  {guide.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                      {guide.badge}
                    </span>
                  </div>
                  <h2 className="text-sm sm:text-base font-extrabold text-white">
                    {guide.title}
                  </h2>
                </div>
              </div>

              <div className="text-[11px] text-purple-300 bg-purple-950/50 px-3 py-1.5 rounded-xl border border-purple-700/30">
                💡 <span className="font-semibold text-white">Objetivo Pedagógico:</span> Explicação ativa do Modo Demonstração
              </div>
            </div>

            {/* Resumo da Funcionalidade */}
            <p className="text-xs sm:text-sm text-purple-100 leading-relaxed font-normal">
              {guide.summary}
            </p>

            {/* Grid com 'Como Funciona' e 'O que testar agora' */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
              
              {/* Como Funciona na Prática */}
              <div className="p-3.5 rounded-xl bg-[#140625]/90 border border-purple-500/30 space-y-2">
                <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>Como Funciona Esta Funcionalidade:</span>
                </div>
                <ul className="space-y-1.5 text-xs text-purple-200">
                  {guide.howItWorks.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* O Que Você Pode Testar Agora */}
              <div className="p-3.5 rounded-xl bg-[#140625]/90 border border-purple-500/30 space-y-2">
                <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-emerald-400" />
                  <span>O Que Você Pode Testar Nesta Tela:</span>
                </div>
                <ul className="space-y-1.5 text-xs text-purple-200">
                  {guide.whatToTest.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold shrink-0">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Regra & Proteção Legal Aplicada */}
            <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-600/40 flex items-start gap-2.5 text-xs text-purple-200">
              <ShieldCheck className="w-4 h-4 text-purple-300 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Proteção Legal & Compliance Aplicado: </strong>
                <span>{guide.legalRule}</span>
              </div>
            </div>

            {/* Atalhos Rápidos para outras telas no Modo Tour */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-purple-800/40 text-[11px]">
              <span className="text-purple-300 font-medium">Navegação rápida do tour:</span>
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setCurrentView('DASHBOARD')}
                  className={`px-2.5 py-1 rounded-lg border transition-all ${
                    currentView === 'DASHBOARD'
                      ? 'bg-purple-600 border-purple-400 text-white font-bold'
                      : 'bg-purple-950/50 border-purple-700/40 text-purple-300 hover:text-white'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentView('CURSOS')}
                  className={`px-2.5 py-1 rounded-lg border transition-all ${
                    currentView === 'CURSOS' || currentView === 'CURSOS_DISPONIVEIS'
                      ? 'bg-purple-600 border-purple-400 text-white font-bold'
                      : 'bg-purple-950/50 border-purple-700/40 text-purple-300 hover:text-white'
                  }`}
                >
                  Cursos & Quizzes
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentView('MAPA_PROXIMIDADE')}
                  className={`px-2.5 py-1 rounded-lg border transition-all ${
                    currentView === 'MAPA_PROXIMIDADE'
                      ? 'bg-purple-600 border-purple-400 text-white font-bold'
                      : 'bg-purple-950/50 border-purple-700/40 text-purple-300 hover:text-white'
                  }`}
                >
                  Mapa por Bairro
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentView('HOLERITE')}
                  className={`px-2.5 py-1 rounded-lg border transition-all ${
                    currentView === 'HOLERITE'
                      ? 'bg-purple-600 border-purple-400 text-white font-bold'
                      : 'bg-purple-950/50 border-purple-700/40 text-purple-300 hover:text-white'
                  }`}
                >
                  Simulador de Holerite
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentView('BADGES_PERFIL')}
                  className={`px-2.5 py-1 rounded-lg border transition-all ${
                    currentView === 'BADGES_PERFIL'
                      ? 'bg-purple-600 border-purple-400 text-white font-bold'
                      : 'bg-purple-950/50 border-purple-700/40 text-purple-300 hover:text-white'
                  }`}
                >
                  Badges & Carteira
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
