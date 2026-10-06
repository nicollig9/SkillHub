'use client';

import React, { useState } from 'react';
import { 
  Calculator, 
  DollarSign, 
  ShieldCheck, 
  FileText,
  Scale,
  Info
} from 'lucide-react';

export default function HoleriteSimulator() {
  const [contractType, setContractType] = useState<'APRENDIZ' | 'ESTAGIARIO' | 'CLT_REGULAR'>('APRENDIZ');
  const [salarioBase, setSalarioBase] = useState<number>(1120);
  const [optValeTransporte, setOptValeTransporte] = useState<boolean>(true);
  const [horasSemanais, setHorasSemanais] = useState<number>(30);

  let descontoVT = 0;
  let descontoINSS = 0;
  let valorFGTS = 0;
  let aliquotaFGTSText = '';

  if (contractType === 'APRENDIZ') {
    descontoVT = optValeTransporte ? Math.round(salarioBase * 0.06 * 100) / 100 : 0;
    descontoINSS = Math.round(salarioBase * 0.075 * 100) / 100;
    valorFGTS = Math.round(salarioBase * 0.02 * 100) / 100;
    aliquotaFGTSText = '2% (Alíquota Especial de Aprendizagem - Depositado pela empresa sem desconto do aluno)';
  } else if (contractType === 'ESTAGIARIO') {
    descontoVT = 0;
    descontoINSS = 0;
    valorFGTS = 0;
    aliquotaFGTSText = 'Isento (Estágio não recolhe FGTS por ser ato educativo escolar TCE)';
  } else {
    descontoVT = optValeTransporte ? Math.round(salarioBase * 0.06 * 100) / 100 : 0;
    descontoINSS = Math.round(salarioBase * 0.075 * 100) / 100;
    valorFGTS = Math.round(salarioBase * 0.08 * 100) / 100;
    aliquotaFGTSText = '8% (Alíquota CLT Regular - Recolhido pelo empregador)';
  }

  const totalProventos = salarioBase;
  const totalDescontos = descontoVT + descontoINSS;
  const salarioLiquido = Math.max(0, totalProventos - totalDescontos);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner with Purple + Yellow Gradient */}
      <div className="bg-gradient-to-r from-[#2E1065] via-[#581C87] to-[#78350F] border-2 border-yellow-400/40 rounded-3xl p-6 lg:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-yellow-300 font-black text-xs uppercase tracking-wider mb-1">
              <Calculator className="w-4 h-4 text-yellow-400" />
              <span>Calculadora Trabalhista & Decodificador de Contracheque</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
              Calculadora de Holerite & Direitos Trabalhistas
            </h1>
            <p className="text-xs text-purple-100 mt-1 max-w-2xl font-medium">
              Entenda exatamente como é calculado o primeiro salário, o desconto legal do Vale-Transporte, a alíquota de INSS e o depósito de FGTS.
            </p>
          </div>

          <div className="bg-slate-950/80 border-2 border-yellow-400/50 rounded-2xl p-3 text-xs text-yellow-200 shadow-lg">
            <span className="font-black text-white block">Módulo Didático 2026:</span>
            Tabelas oficiais e cálculo transparente
          </div>
        </div>
      </div>

      {/* Contract Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <button
          onClick={() => {
            setContractType('APRENDIZ');
            setSalarioBase(1120);
          }}
          className={`p-4 rounded-3xl border transition-all text-left ${
            contractType === 'APRENDIZ'
              ? 'bg-gradient-to-r from-purple-950 via-purple-900 to-yellow-950/70 border-yellow-400 ring-2 ring-yellow-400/40 text-white shadow-xl'
              : 'bg-[#0F0D1E] border-purple-900/60 text-slate-300 hover:border-yellow-400/40'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-black text-yellow-300">Lei nº 10.097/2000</span>
            <span className="text-[10px] bg-yellow-400 text-slate-950 px-2 py-0.5 rounded-full font-black">
              FGTS 2%
            </span>
          </div>
          <div className="text-sm font-black text-white">Jovem Aprendiz (CLT Especial)</div>
          <p className="text-[11px] text-purple-200 mt-1">
            Registro em CTPS, férias escolares, 13º e FGTS com alíquota especial de 2%.
          </p>
        </button>

        <button
          onClick={() => {
            setContractType('ESTAGIARIO');
            setSalarioBase(1350);
          }}
          className={`p-4 rounded-3xl border transition-all text-left ${
            contractType === 'ESTAGIARIO'
              ? 'bg-gradient-to-r from-purple-950 via-purple-900 to-yellow-950/70 border-yellow-400 ring-2 ring-yellow-400/40 text-white shadow-xl'
              : 'bg-[#0F0D1E] border-purple-900/60 text-slate-300 hover:border-yellow-400/40'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-black text-yellow-300">Lei nº 11.788/2008</span>
            <span className="text-[10px] bg-yellow-400 text-slate-950 px-2 py-0.5 rounded-full font-black">
              Bolsa-Auxílio
            </span>
          </div>
          <div className="text-sm font-black text-white">Estagiário (Termo TCE)</div>
          <p className="text-[11px] text-purple-200 mt-1">
            Ato educativo sem vínculo CLT, seguro obrigatório e recesso remunerado.
          </p>
        </button>

        <button
          onClick={() => {
            setContractType('CLT_REGULAR');
            setSalarioBase(1550);
          }}
          className={`p-4 rounded-3xl border transition-all text-left ${
            contractType === 'CLT_REGULAR'
              ? 'bg-gradient-to-r from-purple-950 via-purple-900 to-yellow-950/70 border-yellow-400 ring-2 ring-yellow-400/40 text-white shadow-xl'
              : 'bg-[#0F0D1E] border-purple-900/60 text-slate-300 hover:border-yellow-400/40'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-black text-yellow-300">CLT Padrão</span>
            <span className="text-[10px] bg-yellow-400 text-slate-950 px-2 py-0.5 rounded-full font-black">
              FGTS 8%
            </span>
          </div>
          <div className="text-sm font-black text-white">Contrato CLT Tradicional</div>
          <p className="text-[11px] text-purple-200 mt-1">
            Para fins de comparação: jornada integral e FGTS tradicional de 8%.
          </p>
        </button>
      </div>

      {/* Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-5 bg-[#0F0D1E] border border-purple-900/60 rounded-3xl p-6 space-y-5 shadow-2xl">
          <div className="border-b border-purple-900/40 pb-3">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-yellow-400" />
              Parâmetros de Cálculo
            </h3>
            <p className="text-xs text-purple-200 mt-0.5">
              Ajuste o valor para calcular diferentes jornadas e benefícios.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-200">
                {contractType === 'ESTAGIARIO' ? 'Valor da Bolsa-Auxílio:' : 'Salário Bruto / Base:'}
              </span>
              <span className="text-sm font-black text-yellow-300 bg-purple-950 px-3 py-1 rounded-xl border border-yellow-400/40">
                R$ {salarioBase.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="800"
              max="2500"
              step="20"
              value={salarioBase}
              onChange={(e) => setSalarioBase(Number(e.target.value))}
              className="w-full accent-yellow-400 h-2.5 bg-slate-900 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-purple-300 font-bold">
              <span>R$ 800 (Meio período)</span>
              <span>R$ 1.120 (Padrão 120h)</span>
              <span>R$ 2.500 (Técnico)</span>
            </div>
          </div>

          {/* Carga Horária */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-200">Jornada Semanal:</span>
              <span className="text-xs font-bold text-yellow-300 bg-purple-950 px-2.5 py-0.5 rounded-lg border border-purple-800">
                {horasSemanais}h semanais
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setHorasSemanais(20)}
                className={`py-2 px-3 rounded-2xl text-xs font-black border transition-all ${
                  horasSemanais === 20 ? 'bg-yellow-400 text-slate-950 border-yellow-300 shadow-md' : 'bg-slate-950 text-slate-300 border-purple-900'
                }`}
              >
                4h / Dia (20h)
              </button>
              <button
                type="button"
                onClick={() => setHorasSemanais(30)}
                className={`py-2 px-3 rounded-2xl text-xs font-black border transition-all ${
                  horasSemanais === 30 ? 'bg-yellow-400 text-slate-950 border-yellow-300 shadow-md' : 'bg-slate-950 text-slate-300 border-purple-900'
                }`}
              >
                6h / Dia (30h - Estudante)
              </button>
            </div>
          </div>

          {/* Vale-Transporte */}
          {contractType !== 'ESTAGIARIO' && (
            <div className="bg-slate-950 border border-yellow-400/30 rounded-2xl p-4 space-y-2">
              <label className="flex items-center gap-2 text-xs font-black text-yellow-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={optValeTransporte}
                  onChange={(e) => setOptValeTransporte(e.target.checked)}
                  className="w-4 h-4 accent-yellow-400 rounded"
                />
                <span>Optar por Receber Vale-Transporte (VT)</span>
              </label>
              <p className="text-[11px] text-slate-300 pl-6 leading-relaxed">
                Por lei, o desconto máximo no contracheque é limitado a 6% do salário base.
              </p>
            </div>
          )}

          <div className="bg-gradient-to-r from-purple-950 via-purple-900 to-yellow-950 border border-yellow-400/40 rounded-2xl p-4 text-xs space-y-1.5 text-yellow-100">
            <div className="font-black flex items-center gap-1.5 text-yellow-300">
              <ShieldCheck className="w-4 h-4" />
              <span>Guardrail de Transparência Trabalhista</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              O SkillHub valida se os descontos respeitam rigorosamente a legislação brasileira.
            </p>
          </div>
        </div>

        {/* Holerite Output Column */}
        <div className="lg:col-span-7 bg-[#0F0D1E] border border-purple-900/60 rounded-3xl p-6 lg:p-8 space-y-5 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="border-b border-purple-900/40 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black text-yellow-400 uppercase tracking-wider">
                  Demonstrativo Oficial de Pagamento
                </span>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-yellow-400" />
                  DEMONSTRATIVO DE PAGAMENTO MENSAL
                </h3>
              </div>
              <span className="text-xs bg-slate-950 text-yellow-300 px-3 py-1 rounded-xl font-mono border border-yellow-400/30">
                COMPETÊNCIA: 09/2026
              </span>
            </div>

            <div className="mt-4 bg-slate-950 border-2 border-yellow-400/30 rounded-3xl p-5 font-mono text-xs space-y-4 shadow-inner">
              <div className="grid grid-cols-2 gap-2 text-[11px] text-purple-200 border-b border-purple-950 pb-3 font-sans">
                <div>
                  <strong>EMPRESA:</strong> SKILLHUB PARCEIROS PR LTDA<br />
                  <strong>CNPJ:</strong> 45.***.***/0001-92 (Validado)
                </div>
                <div className="text-right">
                  <strong>COLABORADOR:</strong> LUCAS SILVA OLIVEIRA<br />
                  <strong>CARGO:</strong> {contractType === 'APRENDIZ' ? 'JOVEM APRENDIZ' : contractType === 'ESTAGIARIO' ? 'ESTAGIÁRIO' : 'ASSISTENTE JR.'}
                </div>
              </div>

              <div className="space-y-2">
                <div className="grid grid-cols-12 gap-2 text-purple-300 font-sans font-black border-b border-purple-950 pb-1 text-[11px]">
                  <div className="col-span-6">Descrição da Rubrica</div>
                  <div className="col-span-3 text-right">Proventos (+)</div>
                  <div className="col-span-3 text-right">Descontos (-)</div>
                </div>

                <div className="grid grid-cols-12 gap-2 text-slate-200">
                  <div className="col-span-6">
                    {contractType === 'ESTAGIARIO' ? '001 Bolsa-Auxílio Mensal' : '001 Salário Base Aprendiz'}
                  </div>
                  <div className="col-span-3 text-right text-yellow-300 font-black">
                    R$ {salarioBase.toFixed(2)}
                  </div>
                  <div className="col-span-3 text-right text-slate-600">-</div>
                </div>

                {descontoVT > 0 && (
                  <div className="grid grid-cols-12 gap-2 text-slate-200">
                    <div className="col-span-6">050 Desconto Vale-Transporte (6%)</div>
                    <div className="col-span-3 text-right text-slate-600">-</div>
                    <div className="col-span-3 text-right text-rose-400 font-bold">
                      R$ {descontoVT.toFixed(2)}
                    </div>
                  </div>
                )}

                {descontoINSS > 0 && (
                  <div className="grid grid-cols-12 gap-2 text-slate-200">
                    <div className="col-span-6">102 Previdência Social INSS (7,5%)</div>
                    <div className="col-span-3 text-right text-slate-600">-</div>
                    <div className="col-span-3 text-right text-rose-400 font-bold">
                      R$ {descontoINSS.toFixed(2)}
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-purple-950 pt-3 grid grid-cols-12 gap-2 font-sans font-black text-xs">
                <div className="col-span-6 text-purple-200">TOTAL PROVENTOS / DESCONTOS:</div>
                <div className="col-span-3 text-right text-yellow-300">
                  R$ {totalProventos.toFixed(2)}
                </div>
                <div className="col-span-3 text-right text-rose-400">
                  R$ {totalDescontos.toFixed(2)}
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#2E1065] via-[#581C87] to-[#78350F] border-2 border-yellow-400/50 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-3 font-sans shadow-lg">
                <div>
                  <span className="text-[11px] text-yellow-300 font-black uppercase tracking-wider block">
                    VALOR LÍQUIDO A RECEBER (EM CONTA):
                  </span>
                  <span className="text-2xl font-black text-white">
                    R$ {salarioLiquido.toFixed(2)}
                  </span>
                </div>
                <div className="text-right text-xs bg-slate-950/90 border border-yellow-400/40 p-2.5 rounded-xl">
                  <div className="text-purple-200 font-semibold">Depósito FGTS (Conta Caixa):</div>
                  <div className="font-black text-yellow-300 text-sm">
                    R$ {valorFGTS.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-purple-200 font-sans leading-relaxed border-t border-purple-950 pt-2 flex items-start gap-1.5">
                <Info className="w-3.5 h-3.5 text-yellow-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Nota sobre FGTS:</strong> {aliquotaFGTSText}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
