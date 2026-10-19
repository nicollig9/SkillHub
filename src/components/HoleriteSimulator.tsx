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
  Minus
} from 'lucide-react';

export default function HoleriteSimulator() {
  // Modalidade de Contrato
  const [contractType, setContractType] = useState<'APRENDIZ' | 'CLT' | 'ESTAGIARIO'>('APRENDIZ');

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
  const [viewMode, setViewMode] = useState<'MENSAL' | 'ANUAL' | 'COMPARATIVO_PJ'>('MENSAL');

  // Estados de Interação
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Salário Mínimo de Referência 2026
  const SALARIO_MINIMO_2026 = 1518;

  // =========================================================================
  // CÁLCULOS TRABALHISTAS & FISCAIS (OFICIAIS 2026)
  // =========================================================================

  // 1. Adicionais de Insalubridade e Periculosidade
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

  // Total de Proventos Brutos
  const totalProventos = useMemo(() => {
    return salarioBruto + horasExtras + valorAdicionalEspecial + outrosAdicionais;
  }, [salarioBruto, horasExtras, valorAdicionalEspecial, outrosAdicionais]);

  // 2. Cálculo Progressivo do INSS 2026
  const inssCalculado = useMemo(() => {
    if (contractType === 'ESTAGIARIO') {
      return { valor: 0, aliquotaEfetiva: 0, faixa: 'Isento (Termo TCE)' };
    }

    // Tabela Oficial de Faixas Progressivas INSS 2026
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
      // Teto Máximo do INSS
      imposto = 951.63;
    }

    const valorFinal = Math.min(imposto, 951.63);
    const aliquotaEfetiva = base > 0 ? (valorFinal / base) * 100 : 0;

    return {
      valor: valorFinal,
      aliquotaEfetiva: Number(aliquotaEfetiva.toFixed(2)),
      faixa: base > faixa4Teto ? 'Teto Máximo' : `${aliquotaEfetiva.toFixed(1)}% efetiva`
    };
  }, [totalProventos, contractType]);

  // 3. Desconto do Vale-Transporte (Limite de 6% do salário base ou isento para estágio)
  const descontoVT = useMemo(() => {
    if (!optValeTransporte || contractType === 'ESTAGIARIO') return 0;
    return Math.round(salarioBruto * 0.06 * 100) / 100;
  }, [optValeTransporte, contractType, salarioBruto]);

  // 4. Cálculo do IRPF Retido na Fonte 2026
  const irpfCalculado = useMemo(() => {
    // Dedução por dependente: R$ 189,59
    const deducaoDependentes = dependentes * 189.59;
    const baseLegal = totalProventos - inssCalculado.valor - deducaoDependentes;

    // Desconto simplificado de R$ 564,80 (se for mais vantajoso)
    const baseComSimplificado = totalProventos - 564.8;

    const baseCalculo = Math.min(baseLegal, baseComSimplificado);

    if (baseCalculo <= 2259.2) {
      return { valor: 0, aliquota: 'Isento', parcelaDeduzir: 0 };
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
      return { valor: 0, percentual: 0, rotulo: 'Isento (Lei do Estágio 11.788)' };
    }
    if (contractType === 'APRENDIZ') {
      return {
        valor: totalProventos * 0.02,
        percentual: 2,
        rotulo: '2% (Alíquota Especial de Aprendizagem)'
      };
    }
    return {
      valor: totalProventos * 0.08,
      percentual: 8,
      rotulo: '8% (Alíquota CLT Tradicional)'
    };
  }, [totalProventos, contractType]);

  // Totais Finais
  const totalDescontos = useMemo(() => {
    return inssCalculado.valor + irpfCalculado.valor + descontoVT + outrosDescontos;
  }, [inssCalculado.valor, irpfCalculado.valor, descontoVT, outrosDescontos]);

  const salarioLiquido = useMemo(() => {
    return Math.max(0, totalProventos - totalDescontos);
  }, [totalProventos, totalDescontos]);

  // Distribuição Percentual para a Barra Visual
  const percentLiquido = totalProventos > 0 ? (salarioLiquido / totalProventos) * 100 : 100;
  const percentINSS = totalProventos > 0 ? (inssCalculado.valor / totalProventos) * 100 : 0;
  const percentIRPF = totalProventos > 0 ? (irpfCalculado.valor / totalProventos) * 100 : 0;
  const percentOutros =
    totalProventos > 0 ? ((descontoVT + outrosDescontos) / totalProventos) * 100 : 0;

  // Impacto Anual Acumulado (12 meses + 13º + 1/3 de férias + FGTS)
  const anualAcumulado = useMemo(() => {
    const decimoTerceiroLiquido = salarioLiquido;
    const tercoFeriasLiquido = salarioLiquido / 3;
    const totalAnualLiquido = salarioLiquido * 12 + decimoTerceiroLiquido + tercoFeriasLiquido;
    const totalFGTSAnual = fgtsCalculado.valor * 13.33; // 12 meses + 13º + férias

    return {
      totalAnualLiquido,
      totalFGTSAnual,
      mediaMensalReal: (totalAnualLiquido + totalFGTSAnual) / 12
    };
  }, [salarioLiquido, fgtsCalculado.valor]);

  // Estimativa Comparativa CLT vs PJ
  const comparativoPJ = useMemo(() => {
    // Estimativa PJ no Anexo III do Simples Nacional (6% imposto DAS + custos básicos de contabilidade/DAS)
    const impostoDAS = totalProventos * 0.06;
    const liquidoPJ = totalProventos - impostoDAS;

    // Diferença em relação ao salário líquido CLT
    const diferencaMensal = liquidoPJ - salarioLiquido;

    // Para ter o mesmo benefício anual (13º, férias + 1/3, FGTS, rescisão), o PJ precisa ganhar ~30% a mais
    const valorBrutoPJEquivalente = (anualAcumulado.totalAnualLiquido + anualAcumulado.totalFGTSAnual) / 11;

    return {
      liquidoPJ,
      impostoDAS,
      diferencaMensal,
      valorBrutoPJEquivalente
    };
  }, [totalProventos, salarioLiquido, anualAcumulado]);

  // Copiar Resultado para a Área de Transferência
  const handleCopySummary = () => {
    const texto = `📊 Resumo do Holerite - SkillHub 2026\n` +
      `----------------------------------------\n` +
      `Contrato: ${contractType === 'APRENDIZ' ? 'Jovem Aprendiz' : contractType === 'ESTAGIARIO' ? 'Estágio' : 'CLT Padrão'}\n` +
      `Salário Bruto: R$ ${totalProventos.toFixed(2)}\n` +
      `(-) INSS: R$ ${inssCalculado.valor.toFixed(2)} (${inssCalculado.faixa})\n` +
      `(-) IRPF: R$ ${irpfCalculado.valor.toFixed(2)}\n` +
      (descontoVT > 0 ? `(-) Vale-Transporte (6%): R$ ${descontoVT.toFixed(2)}\n` : '') +
      (outrosDescontos > 0 ? `(-) Outros Descontos: R$ ${outrosDescontos.toFixed(2)}\n` : '') +
      `----------------------------------------\n` +
      `💰 Salário Líquido a Receber: R$ ${salarioLiquido.toFixed(2)}\n` +
      `💼 FGTS Depositado pela Empresa: R$ ${fgtsCalculado.valor.toFixed(2)} (${fgtsCalculado.rotulo})\n` +
      `Calculado em: https://skillhub.com.br`;

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
      {/* 1. CABEÇALHO HERO BANNER (PADRÃO ESCURO DO SITE)                          */}
      {/* ========================================================================= */}
      <div className="bg-[#110E1B] border border-purple-500/20 rounded-2xl p-5 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-950/80 text-purple-200 border border-purple-500/30">
                <Calculator className="w-3.5 h-3.5 text-purple-400" />
                <span>Simulador de Holerite</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/70 text-emerald-300 border border-emerald-500/30">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tabelas Oficiais 2026</span>
              </span>
            </div>

            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Calculadora de Salário Líquido &amp; Direitos Trabalhistas
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl leading-relaxed">
              Descubra exatamente quanto cai na sua conta bancária após os descontos legais de INSS, Imposto de Renda e Vale-Transporte.
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0 print:hidden">
            <button
              onClick={handleCopySummary}
              className="px-3 py-1.5 rounded-xl bg-[#171126] hover:bg-[#221838] text-zinc-300 hover:text-white border border-purple-500/20 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Copiar resultado formatado"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-purple-400" />}
              <span>{copied ? 'Copiado!' : 'Copiar'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-purple-950/40"
              title="Imprimir holerite ou salvar em PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir</span>
            </button>
          </div>
        </div>

        {/* Modalidade de Contrato em 3 botões modernos */}
        <div className="mt-4 pt-3.5 border-t border-[#2D1B4E]/60 grid grid-cols-1 sm:grid-cols-3 gap-2">
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
              <span className="text-xs font-bold">Jovem Aprendiz</span>
              <span className="text-[10px] bg-purple-900/80 text-purple-200 px-1.5 py-0.2 rounded font-semibold">
                FGTS 2%
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-0.5">Lei 10.097/00 • Contrato protegido</p>
          </button>

          <button
            onClick={() => {
              setContractType('CLT');
              setSalarioBruto(2200);
              setOptValeTransporte(true);
            }}
            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
              contractType === 'CLT'
                ? 'bg-purple-950/90 border-purple-500 text-white shadow-md ring-1 ring-purple-400/50'
                : 'bg-[#140E24] border-[#2D1B4E] text-zinc-400 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold">CLT Tradicional</span>
              <span className="text-[10px] bg-purple-900/80 text-purple-200 px-1.5 py-0.2 rounded font-semibold">
                FGTS 8%
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-0.5">Regime formal de 40h/44h semanais</p>
          </button>

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
              <span className="text-xs font-bold">Estágio (Bolsa)</span>
              <span className="text-[10px] bg-emerald-950/90 text-emerald-300 px-1.5 py-0.2 rounded font-semibold">
                Sem INSS
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-0.5">Lei 11.788/08 • Termo de estágio</p>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. GRID PRINCIPAL RESPONSIVO DE 2 COLUNAS (ENTRADA VS RESUMO)            */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* ========================================================================= */}
        {/* COLUNA ESQUERDA: FORMULÁRIO DE ENTRADA DE DADOS                           */}
        {/* ========================================================================= */}
        <div className="bg-[#110E1B] border border-purple-500/20 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#2D1B4E]/60 pb-2.5">
            <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-purple-400" />
              <span>Parâmetros Salariais</span>
            </h2>
            <span className="text-[11px] text-zinc-400">Edição em tempo real</span>
          </div>

          {/* Salário Bruto */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label htmlFor="salario-input" className="font-semibold text-zinc-200">
                {contractType === 'ESTAGIARIO' ? 'Bolsa-Auxílio Mensal (R$):' : 'Salário Bruto Base (R$):'}
              </label>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                R$ {salarioBruto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
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

            {/* Botões Rápidos de Salário */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                { label: 'R$ 800 (Aprendiz 20h)', value: 800 },
                { label: 'R$ 1.518 (Mínimo)', value: 1518 },
                { label: 'R$ 2.200 (CLT Jr)', value: 2200 },
                { label: 'R$ 3.500 (Pleno)', value: 3500 }
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

          {/* Número de Dependentes */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-zinc-200 flex items-center gap-1">
                <span>Número de Dependentes:</span>
                <button
                  type="button"
                  onClick={() =>
                    setActiveTooltip(activeTooltip === 'dependentes' ? null : 'dependentes')
                  }
                  className="text-zinc-400 hover:text-purple-300"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </span>
              <span className="text-[11px] text-purple-300">
                -R$ {(dependentes * 189.59).toFixed(2)} na base IRPF
              </span>
            </div>

            {activeTooltip === 'dependentes' && (
              <div className="text-[11px] bg-[#160F28] border border-purple-500/30 rounded-lg p-2 text-zinc-300 leading-relaxed">
                Cada dependente legal (filhos até 21 anos ou cônjuge) deduz R$ 189,59 da base de cálculo do Imposto de Renda.
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
              <span className="text-xs text-zinc-400">dependentes legais para dedução de IR</span>
            </div>
          </div>

          {/* Opção Vale-Transporte */}
          {contractType !== 'ESTAGIARIO' && (
            <div className="bg-[#140E24] border border-purple-500/20 rounded-xl p-3 space-y-1">
              <label className="flex items-center gap-2 text-xs font-semibold text-zinc-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={optValeTransporte}
                  onChange={(e) => setOptValeTransporte(e.target.checked)}
                  className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
                />
                <span>Optar por Receber Vale-Transporte (VT)</span>
              </label>
              <p className="text-[11px] text-zinc-400 pl-6 leading-relaxed">
                Desconto legal limitado a <strong>6% do salário base</strong> (neste caso, R$ {descontoVT.toFixed(2)}).
              </p>
            </div>
          )}

          {/* Sanfona de Adicionais (Horas Extras, Periculosidade, Insalubridade) */}
          <div className="border-t border-[#2D1B4E]/60 pt-2">
            <button
              type="button"
              onClick={() => setShowAdicionais(!showAdicionais)}
              className="w-full flex items-center justify-between text-xs font-semibold text-purple-300 hover:text-white py-1 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
                <span>Adicionais (Horas Extras, Periculosidade, Bônus)</span>
              </span>
              {showAdicionais ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showAdicionais && (
              <div className="space-y-3 pt-2">
                {/* Horas Extras */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-300 block">
                    Horas Extras e Adicional Noturno (R$):
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="20"
                    value={horasExtras || ''}
                    onChange={(e) => setHorasExtras(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-[#160F28] border border-purple-500/20 rounded-xl px-3 py-1.5 text-xs text-white"
                    placeholder="R$ 0.00"
                  />
                </div>

                {/* Adicional de Periculosidade / Insalubridade */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-300 block">
                    Adicional Especial de Atividade:
                  </label>
                  <select
                    value={tipoAdicional}
                    onChange={(e) => setTipoAdicional(e.target.value as any)}
                    className="w-full bg-[#160F28] border border-purple-500/20 rounded-xl px-3 py-1.5 text-xs text-white"
                  >
                    <option value="NENHUM">Sem Adicional Especial</option>
                    <option value="PERICULOSIDADE">Periculosidade (+30% sobre o salário)</option>
                    <option value="INSALUBRIDADE_MIN">Insalubridade Grau Mínimo (+10% do salário mínimo)</option>
                    <option value="INSALUBRIDADE_MED">Insalubridade Grau Médio (+20% do salário mínimo)</option>
                    <option value="INSALUBRIDADE_MAX">Insalubridade Grau Máximo (+40% do salário mínimo)</option>
                  </select>
                  {valorAdicionalEspecial > 0 && (
                    <span className="text-[11px] text-emerald-400 block pt-0.5">
                      + R$ {valorAdicionalEspecial.toFixed(2)} somados ao bruto
                    </span>
                  )}
                </div>

                {/* Outros Adicionais */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-300 block">
                    Outros Proventos / Comissões / Gratificações (R$):
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={outrosAdicionais || ''}
                    onChange={(e) => setOutrosAdicionais(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-[#160F28] border border-purple-500/20 rounded-xl px-3 py-1.5 text-xs text-white"
                    placeholder="R$ 0.00"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Outros Descontos Voluntários */}
          <div className="space-y-1 pt-1 border-t border-[#2D1B4E]/60">
            <div className="flex justify-between items-center text-xs">
              <label htmlFor="outros-descontos-input" className="font-semibold text-zinc-300">
                Outros Descontos Voluntários (R$):
              </label>
              <span className="text-[11px] text-zinc-400">Plano de Saúde, Coparticipação...</span>
            </div>
            <input
              id="outros-descontos-input"
              type="number"
              min="0"
              step="10"
              value={outrosDescontos || ''}
              onChange={(e) => setOutrosDescontos(Math.max(0, Number(e.target.value)))}
              className="w-full bg-[#160F28] border border-purple-500/20 rounded-xl px-3 py-2 text-xs text-white"
              placeholder="Ex: 50.00 (convênio médico/odontológico)"
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* COLUNA DIREITA: RESUMO DO HOLERITE E VALOR LÍQUIDO                        */}
        {/* ========================================================================= */}
        <div className="bg-[#110E1B] border border-purple-500/20 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-4 shadow-xl">
          <div className="space-y-3.5">
            {/* Topo do Resumo */}
            <div className="flex items-center justify-between border-b border-[#2D1B4E]/60 pb-2.5">
              <div className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-purple-400" />
                <h2 className="text-sm sm:text-base font-bold text-white">
                  Resumo do Contracheque
                </h2>
              </div>
              <span className="text-[11px] bg-[#160F28] text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded font-mono">
                COMPETÊNCIA 2026
              </span>
            </div>

            {/* DESTAQUE PRINCIPAL: SALÁRIO LÍQUIDO FINAL */}
            <div className="bg-gradient-to-r from-emerald-950/80 via-[#0F1E17] to-[#140E24] border border-emerald-500/40 rounded-xl p-4 shadow-inner">
              <span className="text-[11px] uppercase font-bold text-emerald-300 tracking-wider block">
                Salário Líquido Final (Na sua Conta)
              </span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
                R$ {salarioLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-zinc-300 mt-1 flex items-center justify-between">
                <span>Total Bruto: R$ {totalProventos.toFixed(2)}</span>
                <span className="text-rose-400 font-semibold">
                  Total Descontos: -R$ {totalDescontos.toFixed(2)}
                </span>
              </div>
            </div>

            {/* TABELA DE RUBRICAS / DETALHAMENTO */}
            <div className="space-y-2 text-xs">
              {/* Proventos */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#140E24] text-zinc-200">
                <span className="font-medium">
                  {contractType === 'ESTAGIARIO' ? 'Bolsa-Auxílio Mensal' : 'Salário Bruto Base'}
                </span>
                <span className="font-bold text-emerald-400">
                  + R$ {salarioBruto.toFixed(2)}
                </span>
              </div>

              {horasExtras + valorAdicionalEspecial + outrosAdicionais > 0 && (
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#140E24] text-zinc-200">
                  <span className="font-medium">Horas Extras &amp; Adicionais</span>
                  <span className="font-bold text-emerald-400">
                    + R$ {(horasExtras + valorAdicionalEspecial + outrosAdicionais).toFixed(2)}
                  </span>
                </div>
              )}

              {/* INSS com Tooltip (?) */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#140E24] text-zinc-200">
                <span className="flex items-center gap-1.5">
                  <span>INSS (Previdência Social)</span>
                  <button
                    type="button"
                    onClick={() => setActiveTooltip(activeTooltip === 'inss' ? null : 'inss')}
                    className="text-zinc-400 hover:text-purple-300 cursor-pointer"
                    title="Explicar cálculo do INSS"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] text-zinc-400">({inssCalculado.faixa})</span>
                </span>
                <span className="font-bold text-rose-400">
                  {inssCalculado.valor > 0 ? `- R$ ${inssCalculado.valor.toFixed(2)}` : 'R$ 0,00'}
                </span>
              </div>

              {activeTooltip === 'inss' && (
                <div className="text-[11px] bg-[#160F28] border border-purple-500/30 rounded-lg p-2.5 text-zinc-300 leading-relaxed space-y-1">
                  <p>
                    <strong>Como é calculado o INSS:</strong> Aplica-se a alíquota progressiva por faixas salariais (7,5% até R$ 1.518; 9% até R$ 2.793,88; 12% até R$ 4.190,83; 14% até R$ 8.157,41).
                  </p>
                  <p className="text-purple-300 font-semibold">
                    Alíquota efetiva calculada para este salário: {inssCalculado.aliquotaEfetiva}%
                  </p>
                </div>
              )}

              {/* IRPF com Tooltip (?) */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#140E24] text-zinc-200">
                <span className="flex items-center gap-1.5">
                  <span>IRPF (Imposto de Renda Retido)</span>
                  <button
                    type="button"
                    onClick={() => setActiveTooltip(activeTooltip === 'irpf' ? null : 'irpf')}
                    className="text-zinc-400 hover:text-purple-300 cursor-pointer"
                    title="Explicar cálculo do IRPF"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] text-zinc-400">({irpfCalculado.aliquota})</span>
                </span>
                <span className="font-bold text-rose-400">
                  {irpfCalculado.valor > 0 ? `- R$ ${irpfCalculado.valor.toFixed(2)}` : 'Isento'}
                </span>
              </div>

              {activeTooltip === 'irpf' && (
                <div className="text-[11px] bg-[#160F28] border border-purple-500/30 rounded-lg p-2.5 text-zinc-300 leading-relaxed space-y-1">
                  <p>
                    <strong>Como é calculado o IRPF:</strong> A base de cálculo subtrai o INSS e os dependentes legais do salário bruto. Salários com base até R$ 2.259,20 são 100% isentos.
                  </p>
                </div>
              )}

              {/* Vale-Transporte */}
              {descontoVT > 0 && (
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#140E24] text-zinc-200">
                  <span>Vale-Transporte (6%)</span>
                  <span className="font-bold text-rose-400">- R$ {descontoVT.toFixed(2)}</span>
                </div>
              )}

              {/* Outros Descontos */}
              {outrosDescontos > 0 && (
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#140E24] text-zinc-200">
                  <span>Outros Descontos</span>
                  <span className="font-bold text-rose-400">- R$ {outrosDescontos.toFixed(2)}</span>
                </div>
              )}
            </div>

            {/* FGTS (CONSULTA / SEM DESCONTO) */}
            <div className="bg-[#140E24] border border-purple-500/20 rounded-xl p-3 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="font-semibold text-zinc-200 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                  <span>Depósito FGTS na Conta Caixa</span>
                </span>
                <span className="text-[11px] text-zinc-400 block">{fgtsCalculado.rotulo}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-purple-300">
                  R$ {fgtsCalculado.valor.toFixed(2)}
                </span>
                <span className="text-[10px] text-emerald-400 block font-medium">Pago pela Empresa</span>
              </div>
            </div>
          </div>

          {/* Dica de Transparência */}
          <div className="pt-2 border-t border-[#2D1B4E]/60 text-[11px] text-zinc-400 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <span>Valores calculados em conformidade com a CLT e legislação trabalhista brasileira.</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. IDEIAS CRIATIVAS: BARRA DE DISTRIBUIÇÃO & MODOS DE ANÁLISE              */}
      {/* ========================================================================= */}
      <div className="bg-[#110E1B] border border-purple-500/20 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
        {/* Barra Visual de Distribuição do Dinheiro */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
            <span className="flex items-center gap-1.5">
              <Percent className="w-3.5 h-3.5 text-purple-400" />
              <span>Distribuição do seu Salário Bruto:</span>
            </span>
            <span className="text-emerald-400 font-bold">{percentLiquido.toFixed(1)}% Líquido</span>
          </div>

          {/* Barra Multissegmentada Colorida */}
          <div className="w-full h-3.5 bg-[#160F28] rounded-full overflow-hidden flex border border-[#2D1B4E]">
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
                title={`Outros / VT: ${percentOutros.toFixed(1)}%`}
              />
            )}
          </div>

          {/* Legenda da Barra */}
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-zinc-400 pt-1">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Líquido ({percentLiquido.toFixed(1)}%)</span>
            </span>
            {percentINSS > 0 && (
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                <span>INSS ({percentINSS.toFixed(1)}%)</span>
              </span>
            )}
            {percentIRPF > 0 && (
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span>IRPF ({percentIRPF.toFixed(1)}%)</span>
              </span>
            )}
            {percentOutros > 0 && (
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>VT &amp; Outros ({percentOutros.toFixed(1)}%)</span>
              </span>
            )}
          </div>
        </div>

        {/* Abas de Recursos Criativos: Detalhamento Anual vs Comparativo PJ */}
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
              <span>Detalhamento Anual (13º + Férias)</span>
            </button>

            <button
              onClick={() => setViewMode(viewMode === 'COMPARATIVO_PJ' ? 'MENSAL' : 'COMPARATIVO_PJ')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'COMPARATIVO_PJ'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-[#140E24] text-zinc-400 hover:text-white border border-[#2D1B4E]'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Modo Comparativo CLT vs PJ</span>
            </button>
          </div>

          {/* Visualização 1: Detalhamento Anual Acumulado */}
          {viewMode === 'ANUAL' && (
            <div className="bg-[#140E24] border border-purple-500/20 rounded-xl p-4 space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-[#2D1B4E] pb-2">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <span>Impacto Financeiro Acumulado em 1 Ano:</span>
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold">12 meses completos</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="bg-[#0F0C1D] border border-purple-500/20 rounded-lg p-3">
                  <span className="text-[11px] text-zinc-400 block">Total Líquido Anual:</span>
                  <div className="text-base font-bold text-emerald-400 mt-0.5">
                    R$ {anualAcumulado.totalAnualLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <span className="text-[10px] text-zinc-500 block mt-0.5">
                    12 salários + 13º integral + Férias (+ 1/3)
                  </span>
                </div>

                <div className="bg-[#0F0C1D] border border-purple-500/20 rounded-lg p-3">
                  <span className="text-[11px] text-zinc-400 block">FGTS Acumulado no Ano:</span>
                  <div className="text-base font-bold text-purple-300 mt-0.5">
                    R$ {anualAcumulado.totalFGTSAnual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <span className="text-[10px] text-zinc-500 block mt-0.5">
                    Depósitos na Caixa com rendimento legal
                  </span>
                </div>

                <div className="bg-[#0F0C1D] border border-purple-500/20 rounded-lg p-3">
                  <span className="text-[11px] text-zinc-400 block">Média Mensal Global Real:</span>
                  <div className="text-base font-bold text-white mt-0.5">
                    R$ {anualAcumulado.mediaMensalReal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <span className="text-[10px] text-zinc-500 block mt-0.5">
                    Salário líquido ponderado por mês
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Visualização 2: Comparativo CLT vs PJ */}
          {viewMode === 'COMPARATIVO_PJ' && (
            <div className="bg-[#140E24] border border-purple-500/20 rounded-xl p-4 space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-[#2D1B4E] pb-2">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-purple-400" />
                  <span>Análise Comparativa: CLT vs Pessoa Jurídica (PJ)</span>
                </span>
                <span className="text-[11px] text-purple-300 font-semibold">
                  Bruto: R$ {totalProventos.toFixed(2)}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-[#0F0C1D] border border-purple-500/20 rounded-lg p-3 space-y-1.5">
                  <span className="font-bold text-purple-300 text-xs block">Opção CLT (Segurança):</span>
                  <ul className="space-y-1 text-zinc-300 text-[11px]">
                    <li>• Salário Líquido Mensal: <strong>R$ {salarioLiquido.toFixed(2)}</strong></li>
                    <li>• 13º Salário Garantido</li>
                    <li>• 30 dias de Férias Remuneradas + 1/3</li>
                    <li>• Depósito FGTS: <strong>R$ {fgtsCalculado.valor.toFixed(2)}/mês</strong></li>
                    <li>• Seguro-desemprego e proteção previdenciária</li>
                  </ul>
                </div>

                <div className="bg-[#0F0C1D] border border-purple-500/20 rounded-lg p-3 space-y-1.5">
                  <span className="font-bold text-emerald-400 text-xs block">Opção PJ (Simples Nacional ~6%):</span>
                  <ul className="space-y-1 text-zinc-300 text-[11px]">
                    <li>• Valor Líquido Mensal: <strong>R$ {comparativoPJ.liquidoPJ.toFixed(2)}</strong></li>
                    <li>• Imposto Simples Nacional: ~R$ {comparativoPJ.impostoDAS.toFixed(2)}</li>
                    <li>• Sem 13º salário obrigatório</li>
                    <li>• Sem FGTS nem férias remuneradas pela lei</li>
                    <li>
                      • Valor PJ mínimo para compensar a CLT:{' '}
                      <strong className="text-emerald-300">
                        R$ {comparativoPJ.valorBrutoPJEquivalente.toFixed(2)}
                      </strong>
                    </li>
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
