'use client';

import React, { useState, useMemo } from 'react';
import {
  Calculator,
  DollarSign,
  ShieldCheck,
  FileText,
  Scale,
  Info,
  HelpCircle,
  Copy,
  Check,
  Printer,
  TrendingUp,
  Percent,
  Calendar,
  Briefcase,
  Layers,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  Plus,
  Minus,
  Bus,
  Wallet,
  PiggyBank,
  Landmark,
  GraduationCap,
  Award,
  Users
} from 'lucide-react';

export default function HoleriteSimulator() {
  // Modalidade de Contrato: Apenas Estagiários, Aprendizes e Primeiro Emprego
  const [contractType, setContractType] = useState<'APRENDIZ' | 'ESTAGIARIO' | 'PRIMEIRO_EMPREGO'>('APRENDIZ');

  // Campos de Entrada Principais
  const [salarioBruto, setSalarioBruto] = useState<number>(1518);
  const [dependentes, setDependentes] = useState<number>(0);
  const [optValeTransporte, setOptValeTransporte] = useState<boolean>(true);

  // Adicionais
  const [showAdicionais, setShowAdicionais] = useState<boolean>(false);
  const [horasExtras, setHorasExtras] = useState<number>(0);
  const [tipoAdicional, setTipoAdicional] = useState<'NENHUM' | 'PERICULOSIDADE' | 'INSALUBRIDADE_MIN' | 'INSALUBRIDADE_MED' | 'INSALUBRIDADE_MAX'>('NENHUM');
  const [outrosAdicionais, setOutrosAdicionais] = useState<number>(0);

  // Outros Descontos
  const [outrosDescontos, setOutrosDescontos] = useState<number>(0);

  // Modos de Visualização Criativos
  const [viewMode, setViewMode] = useState<'MENSAL' | 'ANUAL' | 'COMPARATIVO_MODALIDADES'>('MENSAL');

  // Estados de Interação
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Salário Mínimo de Referência 2026
  const SALARIO_MINIMO_2026 = 1518;

  // =========================================================================
  // CÁLCULOS TRABALHISTAS & FISCAIS (OFICIAIS 2026)
  // =========================================================================

  // 1. Adicionais Especiais
  const valorAdicionalEspecial = useMemo(() => {
    if (tipoAdicional === 'PERICULOSIDADE') {
      return salarioBruto * 0.3; // 30% sobre salário base
    }
    if (tipoAdicional === 'INSALUBRIDADE_MIN') {
      return SALARIO_MINIMO_2026 * 0.1; // 10% do salário mínimo
    }
    if (tipoAdicional === 'INSALUBRIDADE_MED') {
      return SALARIO_MINIMO_2026 * 0.2; // 20% do salário mínimo
    }
    if (tipoAdicional === 'INSALUBRIDADE_MAX') {
      return SALARIO_MINIMO_2026 * 0.4; // 40% do salário mínimo
    }
    return 0;
  }, [tipoAdicional, salarioBruto]);

  // Total de Ganhos Brutos
  const totalProventos = useMemo(() => {
    return salarioBruto + horasExtras + valorAdicionalEspecial + outrosAdicionais;
  }, [salarioBruto, horasExtras, valorAdicionalEspecial, outrosAdicionais]);

  // 2. Cálculo Progressivo do INSS 2026
  const inssCalculado = useMemo(() => {
    if (contractType === 'ESTAGIARIO') {
      return { valor: 0, aliquotaEfetiva: 0, faixa: 'Isento (Estágio não desconta INSS)' };
    }

    const base = totalProventos;
    let imposto = 0;

    const faixa1Teto = 1518.0;
    const faixa2Teto = 2793.88;
    const faixa3Teto = 4190.83;
    const faixa4Teto = 8157.41;

    if (base <= faixa1Teto) {
      imposto = base * 0.075;
    } else if (base <= faixa2Teto) {
      imposto = faixa1Teto * 0.075 + (base - faixa1Teto) * 0.09;
    } else if (base <= faixa3Teto) {
      imposto = faixa1Teto * 0.075 + (faixa2Teto - faixa1Teto) * 0.09 + (base - faixa2Teto) * 0.12;
    } else if (base <= faixa4Teto) {
      imposto =
        faixa1Teto * 0.075 +
        (faixa2Teto - faixa1Teto) * 0.09 +
        (faixa3Teto - faixa2Teto) * 0.12 +
        (base - faixa3Teto) * 0.14;
    } else {
      imposto = 951.63; // Teto Máximo
    }

    const valorFinal = Math.min(imposto, 951.63);
    const aliquotaEfetiva = base > 0 ? (valorFinal / base) * 100 : 0;

    return {
      valor: valorFinal,
      aliquotaEfetiva: Number(aliquotaEfetiva.toFixed(2)),
      faixa: base > faixa4Teto ? 'Teto Máximo' : `${aliquotaEfetiva.toFixed(1)}% do salário`
    };
  }, [totalProventos, contractType]);

  // 3. Desconto do Vale-Transporte (Limite de 6%)
  const descontoVT = useMemo(() => {
    if (!optValeTransporte || contractType === 'ESTAGIARIO') return 0;
    return Math.round(salarioBruto * 0.06 * 100) / 100;
  }, [optValeTransporte, contractType, salarioBruto]);

  // 4. Cálculo do IRPF Retido na Fonte 2026
  const irpfCalculado = useMemo(() => {
    const deducaoDependentes = dependentes * 189.59;
    const baseLegal = totalProventos - inssCalculado.valor - deducaoDependentes;
    const baseComSimplificado = totalProventos - 564.8;
    const baseCalculo = Math.min(baseLegal, baseComSimplificado);

    if (baseCalculo <= 2259.2) {
      return { valor: 0, aliquota: 'Isento (Não Paga Nada)', parcelaDeduzir: 0 };
    }

    let valor = 0;
    let aliquota = '';
    let parcelaDeduzir = 0;

    if (baseCalculo <= 2826.65) {
      aliquota = '7,5%';
      parcelaDeduzir = 169.44;
      valor = baseCalculo * 0.075 - parcelaDeduzir;
    } else if (baseCalculo <= 3751.05) {
      aliquota = '15%';
      parcelaDeduzir = 381.44;
      valor = baseCalculo * 0.15 - parcelaDeduzir;
    } else if (baseCalculo <= 4664.68) {
      aliquota = '22,5%';
      parcelaDeduzir = 662.77;
      valor = baseCalculo * 0.225 - parcelaDeduzir;
    } else {
      aliquota = '27,5%';
      parcelaDeduzir = 896.0;
      valor = baseCalculo * 0.275 - parcelaDeduzir;
    }

    return {
      valor: Math.max(0, valor),
      aliquota,
      parcelaDeduzir
    };
  }, [totalProventos, inssCalculado.valor, dependentes]);

  // 5. Cálculo do FGTS (Depositado pela Empresa, NÃO Descontado)
  const fgtsCalculado = useMemo(() => {
    if (contractType === 'ESTAGIARIO') {
      return { valor: 0, percentual: 0, rotulo: 'Isento por lei (Lei do Estágio 11.788/08)' };
    }
    if (contractType === 'APRENDIZ') {
      return {
        valor: totalProventos * 0.02,
        percentual: 2,
        rotulo: '2% (Alíquota especial para Jovem Aprendiz - Lei 10.097/00)'
      };
    }
    return {
      valor: totalProventos * 0.08,
      percentual: 8,
      rotulo: '8% (Contrato de Entrada no Mercado / Primeiro Emprego)'
    };
  }, [totalProventos, contractType]);

  // Totais Finais
  const totalDescontosGoverno = inssCalculado.valor + irpfCalculado.valor;
  const totalDescontosBeneficios = descontoVT + outrosDescontos;
  const totalDescontos = totalDescontosGoverno + totalDescontosBeneficios;
  const salarioLiquido = Math.max(0, totalProventos - totalDescontos);

  // Distribuição Percentual para a Barra Visual
  const percentLiquido = totalProventos > 0 ? (salarioLiquido / totalProventos) * 100 : 100;
  const percentINSS = totalProventos > 0 ? (inssCalculado.valor / totalProventos) * 100 : 0;
  const percentIRPF = totalProventos > 0 ? (irpfCalculado.valor / totalProventos) * 100 : 0;
  const percentOutros = totalProventos > 0 ? (totalDescontosBeneficios / totalProventos) * 100 : 0;

  // Impacto Anual Acumulado (12 meses + 13º + 1/3 de férias + FGTS)
  const anualAcumulado = useMemo(() => {
    const totalAnualLiquido = salarioLiquido * 12 + salarioLiquido + salarioLiquido / 3;
    const totalFGTSAnual = fgtsCalculado.valor * 13.33;

    return {
      totalAnualLiquido,
      totalFGTSAnual,
      mediaMensalReal: (totalAnualLiquido + totalFGTSAnual) / 12
    };
  }, [salarioLiquido, fgtsCalculado.valor]);

  // Copiar Resumo em Linguagem Simples
  const handleCopySummary = () => {
    const nomeModalidade =
      contractType === 'APRENDIZ'
        ? 'Jovem Aprendiz'
        : contractType === 'ESTAGIARIO'
        ? 'Estágio'
        : 'Primeiro Emprego';

    const texto = `💰 Resumo do Meu Salário - SkillHub\n` +
      `----------------------------------------\n` +
      `Modalidade: ${nomeModalidade}\n` +
      `1. O que eu ganho (Salário Bruto): R$ ${totalProventos.toFixed(2)}\n` +
      `2. O que o Governo recolhe (INSS + IR): - R$ ${totalDescontosGoverno.toFixed(2)}\n` +
      (totalDescontosBeneficios > 0 ? `3. Descontos de Benefícios (VT e outros): - R$ ${totalDescontosBeneficios.toFixed(2)}\n` : '') +
      `----------------------------------------\n` +
      `✅ O QUE REALMENTE CAI NA MINHA CONTA: R$ ${salarioLiquido.toFixed(2)}\n` +
      `🏦 Poupança FGTS depositada pela empresa: R$ ${fgtsCalculado.valor.toFixed(2)}/mês (NÃO descontado do salário)\n` +
      `Calculado no SkillHub: https://skillhub.com.br/holerite`;

    navigator.clipboard.writeText(texto);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-[800px] mx-auto space-y-4 pb-16">
      {/* ========================================================================= */}
      {/* 1. CABEÇALHO HERO BANNER (FOCO EM APRENDIZ, ESTÁGIO E PRIMEIRO EMPREGO)   */}
      {/* ========================================================================= */}
      <div className="bg-[#110E1B] border border-purple-500/20 rounded-2xl p-5 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-950/80 text-purple-200 border border-purple-500/30">
                <Calculator className="w-3.5 h-3.5 text-purple-400" />
                <span>Calculadora Salarial do Jovem</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/70 text-emerald-300 border border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Estágio • Jovem Aprendiz • Primeiro Emprego</span>
              </span>
            </div>

            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Calculadora de Holerite &amp; Salário Líquido
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-xl leading-relaxed">
              Exclusiva para vagas de <strong>Estágio</strong>, <strong>Jovem Aprendiz</strong> e <strong>Primeiro Emprego</strong>. Calcule quanto vai cair no seu Pix sem burocracia ou termos difíceis.
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0 print:hidden">
            <button
              onClick={handleCopySummary}
              className="px-3 py-1.5 rounded-xl bg-[#171126] hover:bg-[#221838] text-zinc-300 hover:text-white border border-purple-500/20 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Copiar resumo simplificado"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-purple-400" />}
              <span>{copied ? 'Copiado!' : 'Copiar Resumo'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-purple-950/40"
              title="Imprimir ou salvar em PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir</span>
            </button>
          </div>
        </div>

        {/* Modalidade de Contrato: 3 Pilares do SkillHub */}
        <div className="mt-4 pt-3.5 border-t border-[#2D1B4E]/60 space-y-2">
          <span className="text-xs font-bold text-zinc-300 block">
            Selecione a sua modalidade de oportunidade:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {/* Opção 1: Jovem Aprendiz */}
            <button
              onClick={() => {
                setContractType('APRENDIZ');
                setSalarioBruto(1518);
                setOptValeTransporte(true);
              }}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                contractType === 'APRENDIZ'
                  ? 'bg-purple-950/90 border-purple-500 text-white shadow-md ring-1 ring-purple-400/50'
                  : 'bg-[#140E24] border-[#2D1B4E] text-zinc-400 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                  <span>Jovem Aprendiz</span>
                </span>
                <span className="text-[10px] bg-purple-900 text-purple-200 px-1.5 py-0.2 rounded font-semibold">
                  FGTS 2%
                </span>
              </div>
              <p className="text-[11px] text-zinc-300 mt-1">
                De 14 a 24 anos. Carteira assinada, curso teórico e horário protegido (Lei 10.097).
              </p>
            </button>

            {/* Opção 2: Estagiário */}
            <button
              onClick={() => {
                setContractType('ESTAGIARIO');
                setSalarioBruto(1400);
                setOptValeTransporte(false);
              }}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                contractType === 'ESTAGIARIO'
                  ? 'bg-purple-950/90 border-purple-500 text-white shadow-md ring-1 ring-purple-400/50'
                  : 'bg-[#140E24] border-[#2D1B4E] text-zinc-400 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Estagiário</span>
                </span>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.2 rounded font-semibold">
                  Sem Descontos
                </span>
              </div>
              <p className="text-[11px] text-zinc-300 mt-1">
                Para estudantes de Ensino Médio, Técnico ou Superior. Bolsa-auxílio livre de INSS (Lei 11.788).
              </p>
            </button>

            {/* Opção 3: Primeiro Emprego */}
            <button
              onClick={() => {
                setContractType('PRIMEIRO_EMPREGO');
                setSalarioBruto(1600);
                setOptValeTransporte(true);
              }}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                contractType === 'PRIMEIRO_EMPREGO'
                  ? 'bg-purple-950/90 border-purple-500 text-white shadow-md ring-1 ring-purple-400/50'
                  : 'bg-[#140E24] border-[#2D1B4E] text-zinc-400 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-purple-400" />
                  <span>Primeiro Emprego</span>
                </span>
                <span className="text-[10px] bg-purple-900 text-purple-200 px-1.5 py-0.2 rounded font-semibold">
                  FGTS 8%
                </span>
              </div>
              <p className="text-[11px] text-zinc-300 mt-1">
                Vaga de entrada formal para quem não tem experiência. Direitos completos garantidos.
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. GRID PRINCIPAL RESPONSIVO DE 2 COLUNAS (ENTRADA VS RESUMO)            */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* ========================================================================= */}
        {/* COLUNA ESQUERDA: FORMULÁRIO DE ENTRADA (LINGUAGEM SIMPLES E DIDÁTICA)     */}
        {/* ========================================================================= */}
        <div className="bg-[#110E1B] border border-purple-500/20 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
          <div className="border-b border-[#2D1B4E]/60 pb-2.5">
            <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-purple-400" />
              <span>Valores da sua Oportunidade</span>
            </h2>
            <p className="text-[12px] text-zinc-400 mt-0.5">
              Preencha o valor combinado para ver o resultado instantâneo:
            </p>
          </div>

          {/* 1. Salário Bruto com subtítulo explicativo */}
          <div className="space-y-1.5">
            <div>
              <div className="flex justify-between items-center text-xs">
                <label htmlFor="salario-input" className="font-bold text-zinc-200">
                  {contractType === 'ESTAGIARIO' ? 'Bolsa-Auxílio Mensal (Estudante):' : 'Salário Bruto Combinado:'}
                </label>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  R$ {salarioBruto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <p className="text-[11px] text-purple-300 mt-0.5">
                💡 O valor que a empresa combinou pagar por mês antes dos descontos.
              </p>
            </div>

            <div className="relative">
              <span className="absolute left-3 top-2.5 text-zinc-400 text-xs font-semibold">R$</span>
              <input
                id="salario-input"
                type="number"
                min="0"
                step="50"
                value={salarioBruto || ''}
                onChange={(e) => setSalarioBruto(Math.max(0, Number(e.target.value)))}
                className="w-full bg-[#160F28] border border-purple-500/20 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-white font-bold focus:outline-none focus:border-purple-400 transition-colors"
                placeholder="Ex: 1518.00"
              />
            </div>

            {/* Botões Rápidos para Jovens e Estudantes */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                { label: 'R$ 800 (Aprendiz 4h)', value: 800 },
                { label: 'R$ 1.400 (Estágio Médio)', value: 1400 },
                { label: 'R$ 1.518 (Salário Mínimo)', value: 1518 },
                { label: 'R$ 1.800 (Primeiro Emprego)', value: 1800 }
              ].map((b) => (
                <button
                  key={b.value}
                  type="button"
                  onClick={() => setSalarioBruto(b.value)}
                  className={`text-[11px] px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                    salarioBruto === b.value
                      ? 'bg-purple-900/80 border-purple-400 text-purple-200 font-bold'
                      : 'bg-[#140E24] border-[#2D1B4E] text-zinc-400 hover:text-white'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Dependentes com explicação simples */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-zinc-200 flex items-center gap-1.5">
                <span>Pessoas que Dependem de Você:</span>
                <button
                  type="button"
                  onClick={() =>
                    setActiveTooltip(activeTooltip === 'dependentes' ? null : 'dependentes')
                  }
                  className="text-purple-400 hover:text-purple-300 cursor-pointer"
                  title="Clique para entender"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </span>
              <span className="text-[11px] text-purple-300">
                {dependentes > 0 ? `Economiza no Imposto de Renda` : 'Nenhum dependente'}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Filhos ou dependentes legais. Reduz o desconto do Imposto de Renda!
            </p>

            {activeTooltip === 'dependentes' && (
              <div className="text-[11px] bg-[#160F28] border border-purple-500/40 rounded-xl p-3 text-zinc-200 leading-relaxed space-y-1 shadow-lg">
                <div className="font-bold text-purple-300 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5" />
                  <span>O que são dependentes?</span>
                </div>
                <p>
                  Filhos menores de idade ou cônjuge. Cada dependente cadastrado reduz <strong>R$ 189,59</strong> da base onde o governo cobra o Imposto de Renda, ajudando a proteger seu salário.
                </p>
              </div>
            )}

            <div className="flex items-center gap-3">
              <div className="flex items-center bg-[#160F28] border border-purple-500/20 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setDependentes(Math.max(0, dependentes - 1))}
                  className="p-2 text-zinc-300 hover:text-white hover:bg-purple-950/60 transition-colors cursor-pointer"
                  aria-label="Diminuir dependentes"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-xs font-bold text-white min-w-[28px] text-center">
                  {dependentes}
                </span>
                <button
                  type="button"
                  onClick={() => setDependentes(dependentes + 1)}
                  className="p-2 text-zinc-300 hover:text-white hover:bg-purple-950/60 transition-colors cursor-pointer"
                  aria-label="Aumentar dependentes"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-xs text-zinc-300">dependentes informados</span>
            </div>
          </div>

          {/* 3. Vale-Transporte com linguagem do dia a dia */}
          {contractType !== 'ESTAGIARIO' && (
            <div className="bg-[#140E24] border border-purple-500/20 rounded-xl p-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs font-bold text-zinc-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={optValeTransporte}
                    onChange={(e) => setOptValeTransporte(e.target.checked)}
                    className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
                  />
                  <span>Quero receber Vale-Transporte (Ônibus / Metrocard)</span>
                </label>
                <button
                  type="button"
                  onClick={() => setActiveTooltip(activeTooltip === 'vt' ? null : 'vt')}
                  className="text-purple-400 hover:text-purple-300 text-[11px] font-semibold flex items-center gap-0.5 cursor-pointer"
                >
                  <span>Entenda</span>
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-[11px] text-zinc-400 pl-6 leading-relaxed">
                A empresa cobre as passagens do mês inteiro e desconta no máximo <strong>6% do seu salário base</strong> (neste caso: R$ {descontoVT.toFixed(2)}).
              </p>

              {activeTooltip === 'vt' && (
                <div className="text-[11px] bg-[#160F28] border border-purple-500/40 rounded-xl p-2.5 text-zinc-200 leading-relaxed shadow-lg">
                  <strong>Regra do Vale-Transporte:</strong> A empresa é obrigada a fornecer passagens suficientes para você ir e voltar do trabalho. Se suas passagens custarem R$ 250 no mês, você só contribui com até 6% do salário (R$ {descontoVT.toFixed(2)}) e a empresa paga todo o restante!
                </div>
              )}
            </div>
          )}

          {/* 4. Sanfona de Ganhos Extras */}
          <div className="border-t border-[#2D1B4E]/60 pt-2">
            <button
              type="button"
              onClick={() => setShowAdicionais(!showAdicionais)}
              className="w-full flex items-center justify-between text-xs font-semibold text-purple-300 hover:text-white py-1 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
                <span>Ganhos Extras (Horas Extras, Bônus, Adicionais)</span>
              </span>
              {showAdicionais ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showAdicionais && (
              <div className="space-y-3 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-300 block">
                    Horas a mais trabalhadas (Horas Extras e Noturno):
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="20"
                    value={horasExtras || ''}
                    onChange={(e) => setHorasExtras(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-[#160F28] border border-purple-500/20 rounded-xl px-3 py-1.5 text-xs text-white"
                    placeholder="R$ 0,00"
                  />
                  {contractType === 'APRENDIZ' && (
                    <span className="text-[10px] text-amber-300 block">
                      Nota: A Lei do Aprendiz protege o jovem e proíbe a realização de horas extras rotineiras.
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-300 block">
                    Adicional por Atividade Especial:
                  </label>
                  <select
                    value={tipoAdicional}
                    onChange={(e) => setTipoAdicional(e.target.value as any)}
                    className="w-full bg-[#160F28] border border-purple-500/20 rounded-xl px-3 py-1.5 text-xs text-white"
                  >
                    <option value="NENHUM">Nenhum adicional especial</option>
                    <option value="PERICULOSIDADE">Periculosidade (+30% por risco físico/eletricidade/combustível)</option>
                    <option value="INSALUBRIDADE_MIN">Insalubridade Mínima (+10% por barulho/químicos leves)</option>
                    <option value="INSALUBRIDADE_MED">Insalubridade Média (+20% por ambientes de atendimento de saúde)</option>
                    <option value="INSALUBRIDADE_MAX">Insalubridade Máxima (+40% por alto contato biológico/químico)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-300 block">
                    Bônus, Gratificações ou Prêmios (R$):
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={outrosAdicionais || ''}
                    onChange={(e) => setOutrosAdicionais(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-[#160F28] border border-purple-500/20 rounded-xl px-3 py-1.5 text-xs text-white"
                    placeholder="R$ 0,00"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 5. Outros Descontos Voluntários */}
          <div className="space-y-1 pt-1 border-t border-[#2D1B4E]/60">
            <div className="flex justify-between items-center text-xs">
              <label htmlFor="outros-descontos-input" className="font-bold text-zinc-300">
                Outros Descontos (Convênios ou Adiantamentos):
              </label>
              <span className="text-[11px] text-zinc-400">Plano odontológico, etc.</span>
            </div>
            <input
              id="outros-descontos-input"
              type="number"
              min="0"
              step="10"
              value={outrosDescontos || ''}
              onChange={(e) => setOutrosDescontos(Math.max(0, Number(e.target.value)))}
              className="w-full bg-[#160F28] border border-purple-500/20 rounded-xl px-3 py-2 text-xs text-white"
              placeholder="Ex: 30.00"
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* COLUNA DIREITA: RESUMO DO HOLERITE COM BOTÕES "ENTENDA ESTE DESCONTO"     */}
        {/* ========================================================================= */}
        <div className="bg-[#110E1B] border border-purple-500/20 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-4 shadow-xl">
          <div className="space-y-3.5">
            {/* Topo do Resumo */}
            <div className="flex items-center justify-between border-b border-[#2D1B4E]/60 pb-2.5">
              <div className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-purple-400" />
                <h2 className="text-sm sm:text-base font-bold text-white">
                  Contracheque do Jovem
                </h2>
              </div>
              <span className="text-[11px] bg-purple-950/80 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded font-semibold">
                Ano Oficial 2026
              </span>
            </div>

            {/* DESTAQUE DO SALÁRIO LÍQUIDO */}
            <div className="bg-gradient-to-r from-emerald-950/90 via-[#0F1E17] to-[#140E24] border border-emerald-500/40 rounded-xl p-4 shadow-inner">
              <span className="text-[11px] uppercase font-bold text-emerald-300 tracking-wider block">
                💰 O que realmente cai na sua conta (via Pix/TED):
              </span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
                R$ {salarioLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-zinc-300 mt-1">
                Seu dinheiro limpo para usar livremente após os descontos legais.
              </p>
            </div>

            {/* ITENS DETALHADOS COM BOTÃO "ENTENDA" */}
            <div className="space-y-2 text-xs">
              {/* Salário Bruto */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#140E24] text-zinc-200">
                <div>
                  <span className="font-bold text-white block">
                    {contractType === 'ESTAGIARIO' ? '1. Bolsa de Estágio' : '1. Salário Bruto Combinado'}
                  </span>
                  <span className="text-[11px] text-zinc-400">Total antes dos descontos</span>
                </div>
                <span className="font-bold text-emerald-400 text-sm">
                  + R$ {totalProventos.toFixed(2)}
                </span>
              </div>

              {/* INSS com Balão Explicativo Didático */}
              <div className="space-y-1">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#140E24] text-zinc-200">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-white">2. INSS (Previdência Social)</span>
                      <button
                        type="button"
                        onClick={() => setActiveTooltip(activeTooltip === 'inss' ? null : 'inss')}
                        className="text-purple-400 hover:text-purple-300 text-[11px] font-semibold underline cursor-pointer"
                      >
                        {activeTooltip === 'inss' ? 'Fechar' : 'Entenda (?)'}
                      </button>
                    </div>
                    <span className="text-[11px] text-zinc-400 block">
                      {contractType === 'ESTAGIARIO' ? 'Estágio é isento' : `Contribuição: ${inssCalculado.faixa}`}
                    </span>
                  </div>
                  <span className="font-bold text-rose-400 text-sm">
                    {inssCalculado.valor > 0 ? `- R$ ${inssCalculado.valor.toFixed(2)}` : 'R$ 0,00'}
                  </span>
                </div>

                {activeTooltip === 'inss' && (
                  <div className="text-[12px] bg-[#160F28] border border-purple-500/40 rounded-xl p-3 text-zinc-200 leading-relaxed space-y-1.5 shadow-lg">
                    <p className="font-bold text-purple-300 flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>O que é o INSS para o jovem?</span>
                    </p>
                    <p>
                      É a contribuição obrigatória para a <strong>Previdência Social</strong> que garante a sua aposentadoria no futuro, auxílio-doença caso você precise se afastar e licença-maternidade/paternidade.
                    </p>
                    <p className="text-[11px] text-purple-200">
                      Estagiários não têm desconto de INSS. Aprendizes e Primeiro Emprego contribuem a partir de 7,5%.
                    </p>
                  </div>
                )}
              </div>

              {/* IRPF com Balão Explicativo Didático */}
              <div className="space-y-1">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#140E24] text-zinc-200">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-white">3. Imposto de Renda (IRPF)</span>
                      <button
                        type="button"
                        onClick={() => setActiveTooltip(activeTooltip === 'irpf' ? null : 'irpf')}
                        className="text-purple-400 hover:text-purple-300 text-[11px] font-semibold underline cursor-pointer"
                      >
                        {activeTooltip === 'irpf' ? 'Fechar' : 'Entenda (?)'}
                      </button>
                    </div>
                    <span className="text-[11px] text-zinc-400 block">
                      Retido na fonte: {irpfCalculado.aliquota}
                    </span>
                  </div>
                  <span className="font-bold text-rose-400 text-sm">
                    {irpfCalculado.valor > 0 ? `- R$ ${irpfCalculado.valor.toFixed(2)}` : 'Isento (R$ 0)'}
                  </span>
                </div>

                {activeTooltip === 'irpf' && (
                  <div className="text-[12px] bg-[#160F28] border border-purple-500/40 rounded-xl p-3 text-zinc-200 leading-relaxed space-y-1.5 shadow-lg">
                    <p className="font-bold text-purple-300 flex items-center gap-1">
                      <Landmark className="w-4 h-4 text-purple-400" />
                      <span>O que é o Imposto de Renda (IRPF)?</span>
                    </p>
                    <p>
                      É o imposto recolhido pelo Governo Federal proporcional aos ganhos.
                    </p>
                    <p className="text-emerald-400 font-semibold">
                      🎉 Se você ganha até R$ 2.259 (ou até R$ 2.824 com o desconto simplificado), você é 100% isento e não paga nenhum centavo!
                    </p>
                  </div>
                )}
              </div>

              {/* Vale-Transporte */}
              {descontoVT > 0 && (
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#140E24] text-zinc-200">
                  <div>
                    <span className="font-bold text-white block">4. Vale-Transporte (6%)</span>
                    <span className="text-[11px] text-zinc-400">Desconto limite para passagens de ônibus</span>
                  </div>
                  <span className="font-bold text-rose-400 text-sm">
                    - R$ {descontoVT.toFixed(2)}
                  </span>
                </div>
              )}

              {/* Outros Descontos */}
              {outrosDescontos > 0 && (
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#140E24] text-zinc-200">
                  <div>
                    <span className="font-bold text-white block">5. Outros Convênios / Descontos</span>
                    <span className="text-[11px] text-zinc-400">Planos médicos ou adiantamentos</span>
                  </div>
                  <span className="font-bold text-rose-400 text-sm">
                    - R$ {outrosDescontos.toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            {/* FGTS COM EXPLICAÇÃO: NÃO É DESCONTADO! */}
            <div className="bg-[#140E24] border border-purple-500/30 rounded-xl p-3 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <PiggyBank className="w-4 h-4 text-amber-400" />
                    <span>FGTS (Poupança que a empresa deposita para você):</span>
                  </span>
                  <span className="text-[11px] text-emerald-400 font-semibold block">
                    NÃO é descontado do seu salário! É um dinheiro a mais.
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-amber-300">
                    R$ {fgtsCalculado.valor.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-zinc-400 block">por mês na Caixa</span>
                </div>
              </div>

              <div className="text-[11px] text-zinc-300 bg-[#0F0C1D] p-2 rounded-lg leading-relaxed">
                <strong>O que é o FGTS?</strong> É o Fundo de Garantia depositado pela empresa em uma conta da Caixa Econômica no seu nome ({fgtsCalculado.rotulo}). Aprendizes recebem 2% e vagas de Primeiro Emprego recebem 8% sobre a remuneração.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. RESUMO VISUAL: "PARA ONDE VAI MEU DINHEIRO? (PASSO A PASSO)"           */}
      {/* ========================================================================= */}
      <div className="bg-[#110E1B] border border-purple-500/20 rounded-2xl p-5 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#2D1B4E]/60 pb-3">
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm sm:text-base font-bold text-white">
              Para Onde Vai Meu Dinheiro? (Passo a Passo Descomplicado)
            </h3>
          </div>
          <span className="text-xs text-purple-300 font-semibold">
            {percentLiquido.toFixed(1)}% fica com você
          </span>
        </div>

        {/* Passo a Passo em 4 Caixas Claras */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Passo 1 */}
          <div className="bg-[#140E24] border border-purple-500/20 rounded-xl p-3.5 space-y-1">
            <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider block">
              Passo 1: Você Ganha
            </span>
            <div className="text-base font-black text-white">
              R$ {totalProventos.toFixed(2)}
            </div>
            <p className="text-[11px] text-zinc-400 leading-snug">
              Salário bruto da oportunidade mais eventuais horas extras.
            </p>
          </div>

          {/* Passo 2 */}
          <div className="bg-[#140E24] border border-purple-500/20 rounded-xl p-3.5 space-y-1">
            <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider block">
              Passo 2: Governo / INSS
            </span>
            <div className="text-base font-black text-rose-400">
              - R$ {totalDescontosGoverno.toFixed(2)}
            </div>
            <p className="text-[11px] text-zinc-400 leading-snug">
              Contribuição de aposentadoria (INSS) e Imposto de Renda (IRPF).
            </p>
          </div>

          {/* Passo 3 */}
          <div className="bg-[#140E24] border border-purple-500/20 rounded-xl p-3.5 space-y-1">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
              Passo 3: Seus Benefícios
            </span>
            <div className="text-base font-black text-amber-400">
              - R$ {totalDescontosBeneficios.toFixed(2)}
            </div>
            <p className="text-[11px] text-zinc-400 leading-snug">
              Parte do custo do vale-transporte de ônibus e outros convênios.
            </p>
          </div>

          {/* Passo 4 */}
          <div className="bg-[#140E24] border border-emerald-500/40 rounded-xl p-3.5 space-y-1 bg-gradient-to-b from-[#140E24] to-emerald-950/40">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
              Passo 4: Na sua Conta
            </span>
            <div className="text-base font-black text-emerald-300">
              R$ {salarioLiquido.toFixed(2)}
            </div>
            <p className="text-[11px] text-zinc-300 leading-snug">
              O valor líquido disponível para você pagar contas e usar livremente!
            </p>
          </div>
        </div>

        {/* Barra Visual Colorida de Distribuição */}
        <div className="pt-2 space-y-2">
          <div className="w-full h-3 bg-[#160F28] rounded-full overflow-hidden flex border border-[#2D1B4E]">
            <div
              style={{ width: `${percentLiquido}%` }}
              className="h-full bg-emerald-500 transition-all duration-300"
              title={`Salário Líquido: ${percentLiquido.toFixed(1)}%`}
            />
            {percentINSS > 0 && (
              <div
                style={{ width: `${percentINSS}%` }}
                className="h-full bg-purple-500 transition-all duration-300"
                title={`INSS: ${percentINSS.toFixed(1)}%`}
              />
            )}
            {percentIRPF > 0 && (
              <div
                style={{ width: `${percentIRPF}%` }}
                className="h-full bg-rose-500 transition-all duration-300"
                title={`IRPF: ${percentIRPF.toFixed(1)}%`}
              />
            )}
            {percentOutros > 0 && (
              <div
                style={{ width: `${percentOutros}%` }}
                className="h-full bg-amber-500 transition-all duration-300"
                title={`Benefícios / VT: ${percentOutros.toFixed(1)}%`}
              />
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <strong className="text-zinc-200">Líquido no Bolso: {percentLiquido.toFixed(1)}%</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              <span>INSS Previdência: {percentINSS.toFixed(1)}%</span>
            </span>
            {percentIRPF > 0 && (
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span>Imposto de Renda: {percentIRPF.toFixed(1)}%</span>
              </span>
            )}
            {percentOutros > 0 && (
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>Vale-Transporte: {percentOutros.toFixed(1)}%</span>
              </span>
            )}
          </div>
        </div>

        {/* Abas Didáticas: Acumulado Anual & Comparativo entre Aprendiz, Estágio e Primeiro Emprego */}
        <div className="pt-3 border-t border-[#2D1B4E]/60 space-y-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setViewMode(viewMode === 'ANUAL' ? 'MENSAL' : 'ANUAL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'ANUAL'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-[#140E24] text-zinc-400 hover:text-white border border-[#2D1B4E]'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Quanto eu recebo no ano inteiro? (13º + Férias)</span>
            </button>

            <button
              onClick={() => setViewMode(viewMode === 'COMPARATIVO_MODALIDADES' ? 'MENSAL' : 'COMPARATIVO_MODALIDADES')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'COMPARATIVO_MODALIDADES'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-[#140E24] text-zinc-400 hover:text-white border border-[#2D1B4E]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Comparativo: Aprendiz vs Estágio vs Primeiro Emprego</span>
            </button>
          </div>

          {/* Visualização 1: Acumulado Anual */}
          {viewMode === 'ANUAL' && (
            <div className="bg-[#140E24] border border-purple-500/20 rounded-xl p-4 space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-[#2D1B4E] pb-2">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <span>Seu Ganho Total Acumulado em 1 Ano de Contrato:</span>
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold">12 meses + direitos</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="bg-[#0F0C1D] border border-purple-500/20 rounded-lg p-3">
                  <span className="text-[11px] text-zinc-400 block">Total Líquido Anual:</span>
                  <div className="text-base font-bold text-emerald-400 mt-0.5">
                    R$ {anualAcumulado.totalAnualLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <span className="text-[10px] text-zinc-400 block mt-0.5">
                    12 salários + 13º integral + Férias (+ 1/3)
                  </span>
                </div>

                <div className="bg-[#0F0C1D] border border-purple-500/20 rounded-lg p-3">
                  <span className="text-[11px] text-zinc-400 block">FGTS Guardado na Caixa:</span>
                  <div className="text-base font-bold text-purple-300 mt-0.5">
                    R$ {anualAcumulado.totalFGTSAnual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <span className="text-[10px] text-zinc-400 block mt-0.5">
                    {contractType === 'ESTAGIARIO' ? 'Estágio não recolhe FGTS' : 'Depositado pela empresa sem desconto'}
                  </span>
                </div>

                <div className="bg-[#0F0C1D] border border-purple-500/20 rounded-lg p-3">
                  <span className="text-[11px] text-zinc-400 block">Média Mensal Real:</span>
                  <div className="text-base font-bold text-white mt-0.5">
                    R$ {anualAcumulado.mediaMensalReal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <span className="text-[10px] text-zinc-400 block mt-0.5">
                    Média por mês somando todos os benefícios
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Visualização 2: Comparativo Didático das 3 Modalidades do SkillHub */}
          {viewMode === 'COMPARATIVO_MODALIDADES' && (
            <div className="bg-[#140E24] border border-purple-500/20 rounded-xl p-4 space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-[#2D1B4E] pb-2">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span>Diferenças entre as Modalidades de Oportunidades do SkillHub:</span>
                </span>
                <span className="text-[11px] text-purple-300 font-semibold">Guia Oficial</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {/* Jovem Aprendiz */}
                <div className="bg-[#0F0C1D] border border-purple-500/20 rounded-lg p-3 space-y-1.5">
                  <span className="font-bold text-purple-300 text-xs block flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                    <span>Jovem Aprendiz:</span>
                  </span>
                  <ul className="space-y-1 text-zinc-300 text-[11px]">
                    <li>• <strong>Idade:</strong> 14 a 24 anos incompletos</li>
                    <li>• <strong>Carga:</strong> 4h a 6h diárias protegidas</li>
                    <li>• <strong>FGTS:</strong> 2% especial depositado</li>
                    <li>• <strong>13º e Férias:</strong> 100% garantidos</li>
                    <li>• <strong>Capacitação:</strong> Curso teórico incluído</li>
                  </ul>
                </div>

                {/* Estágio */}
                <div className="bg-[#0F0C1D] border border-purple-500/20 rounded-lg p-3 space-y-1.5">
                  <span className="font-bold text-emerald-400 text-xs block flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Estagiário:</span>
                  </span>
                  <ul className="space-y-1 text-zinc-300 text-[11px]">
                    <li>• <strong>Requisito:</strong> Matrícula ativa em curso</li>
                    <li>• <strong>Carga:</strong> 4h a 6h diárias (máx. 30h/sem)</li>
                    <li>• <strong>INSS e FGTS:</strong> Isento (sem descontos)</li>
                    <li>• <strong>Recesso:</strong> 30 dias remunerados após 1 ano</li>
                    <li>• <strong>Seguro:</strong> Apólice contra acidentes inclusa</li>
                  </ul>
                </div>

                {/* Primeiro Emprego */}
                <div className="bg-[#0F0C1D] border border-purple-500/20 rounded-lg p-3 space-y-1.5">
                  <span className="font-bold text-white text-xs block flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-purple-400" />
                    <span>Primeiro Emprego:</span>
                  </span>
                  <ul className="space-y-1 text-zinc-300 text-[11px]">
                    <li>• <strong>Perfil:</strong> Jovens sem experiência prévia</li>
                    <li>• <strong>Carga:</strong> Até 40h ou 44h semanais</li>
                    <li>• <strong>FGTS:</strong> 8% integral na conta Caixa</li>
                    <li>• <strong>Direitos:</strong> 13º, férias e rescisão legal</li>
                    <li>• <strong>Carteira:</strong> Registro formal de início</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
