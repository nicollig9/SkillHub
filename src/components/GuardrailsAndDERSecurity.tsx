'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { DER_TABLES_INFO } from '@/data/mockData';
import { 
  ShieldCheck, 
  Database, 
  Code2, 
  Terminal, 
  Lock, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  FileCode2, 
  Server, 
  Eye, 
  Send,
  KeyRound,
  FileCheck
} from 'lucide-react';

export default function GuardrailsAndDERSecurity() {
  const { guardrailLogs, testAntiHarassment, testCnpjValidation } = useApp();

  const [activeTab, setActiveTab] = useState<'DER_SCHEMA' | 'SQL_DDL' | 'TESTER_GUARDRAILS' | 'AUDIT_LOGS'>('DER_SCHEMA');
  
  // Interactive Chat / Anti-harassment Test State
  const [chatInput, setChatInput] = useState('');
  const [chatResult, setChatResult] = useState<{ safe: boolean; flaggedTerms: string[]; sanitized: string } | null>(null);

  // CNPJ Test State
  const [cnpjInput, setCnpjInput] = useState('45.123.456/0001-92');
  const [cnpjResult, setCnpjResult] = useState<{ valid: boolean; companyName?: string; status?: string } | null>(null);

  // Selected table in DER
  const [selectedTable, setSelectedTable] = useState<string>('Enderecos');

  const handleTestChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const res = testAntiHarassment(chatInput);
    setChatResult(res);
  };

  const handleTestCnpj = (e: React.FormEvent) => {
    e.preventDefault();
    const res = testCnpjValidation(cnpjInput);
    setCnpjResult(res);
  };

  const sqlDDLCode = `-- =================================================================
-- SKILLHUB - ESQUEMA DE BANCO DE DADOS (DER) & GUARDRAILS DE SEGURANÇA
-- PostgreSQL (Neon) + Prisma ORM
-- =================================================================

-- 1. TABELA DE ENDEREÇOS (Guardrail: Isola a geolocalização exata do aluno)
CREATE TABLE Enderecos (
    id_endereco SERIAL PRIMARY KEY,
    rua VARCHAR(150),
    numero VARCHAR(20),
    bairro VARCHAR(80) NOT NULL, -- Exibido publicamente no mapa
    cidade VARCHAR(80) NOT NULL DEFAULT 'Curitiba',
    estado VARCHAR(2) NOT NULL DEFAULT 'PR',
    cep VARCHAR(10),
    latitude DECIMAL(10, 8),   -- Mantido restrito ao backend
    longitude DECIMAL(11, 8)   -- Mantido restrito ao backend
);

-- 2. TABELA DE ALUNOS / CANDIDATOS (Proteção LGPD para Menores)
CREATE TABLE Alunos (
    id_aluno SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL, -- Criptografia BCrypt com Salt
    cpf VARCHAR(14) UNIQUE NOT NULL,
    data_nascimento DATE NOT NULL,
    id_endereco INT REFERENCES Enderecos(id_endereco)
);

-- 3. TABELA DE EMPRESAS (Validação Anti-Fraude com Receita Federal)
CREATE TABLE Empresas (
    id_empresa SERIAL PRIMARY KEY,
    razao_social VARCHAR(150) NOT NULL,
    cnpj VARCHAR(18) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    validado_cnpj BOOLEAN DEFAULT FALSE, -- Guardrail anti-fraude
    id_endereco INT REFERENCES Enderecos(id_endereco)
);

-- 4. TABELA DE BADGES / CURSOS
CREATE TABLE Badges (
    id_badge SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    categoria VARCHAR(50), -- Ex: 'Trabalho', 'Finanças', 'Saúde Mental'
    carga_horaria_minutos INT NOT NULL
);

-- 5. TABELA DE CONQUISTAS (Relacionamento Aluno <-> Badge)
CREATE TABLE Alunos_Badges (
    id_aluno INT REFERENCES Alunos(id_aluno),
    id_badge INT REFERENCES Badges(id_badge),
    data_conquista TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    nota_quiz DECIMAL(4,2) NOT NULL, -- Guardrail: Média mínima de 70%
    PRIMARY KEY (id_aluno, id_badge)
);

-- 6. TABELA DE VAGAS
CREATE TABLE Vagas (
    id_vaga SERIAL PRIMARY KEY,
    id_empresa INT REFERENCES Empresas(id_empresa),
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'ATIVA', -- ATIVA, PREENCHIDA, CANCELADA
    bairro_vaga VARCHAR(80) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. REQUISITOS DE BADGES DA VAGA (Relacionamento Vaga <-> Badge)
CREATE TABLE Vagas_Badges_Requeridas (
    id_vaga INT REFERENCES Vagas(id_vaga),
    id_badge INT REFERENCES Badges(id_badge),
    PRIMARY KEY (id_vaga, id_badge)
);

-- 8. CANDIDATURAS (Liberação Consentida de Contato)
CREATE TABLE Candidaturas (
    id_candidatura SERIAL PRIMARY KEY,
    id_vaga INT REFERENCES Vagas(id_vaga),
    id_aluno INT REFERENCES Alunos(id_aluno),
    data_candidatura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(30) DEFAULT 'EM_ANALISE'
);`;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border border-emerald-500/30 rounded-3xl p-6 lg:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Arquitetura de Segurança, LGPD & Modelagem de Dados</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Guardrails, Segurança e Banco de Dados (DER)
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Mecanismos automatizados no código que impedem vazamento de dados de menores, fraudes de vagas, assédio em mensagens e manipulação de badges.
            </p>
          </div>

          <div className="bg-emerald-900/40 border border-emerald-500/40 rounded-2xl p-3 text-xs text-emerald-200">
            <span className="font-bold text-white block">PostgreSQL Neon & Next.js:</span>
            Consultas Parametrizadas Anti-SQLi
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('DER_SCHEMA')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'DER_SCHEMA'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Database className="w-4 h-4" />
          Modelo Entidade-Relacionamento (DER)
        </button>

        <button
          onClick={() => setActiveTab('SQL_DDL')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'SQL_DDL'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Code2 className="w-4 h-4" />
          Código SQL DDL Oficial
        </button>

        <button
          onClick={() => setActiveTab('TESTER_GUARDRAILS')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'TESTER_GUARDRAILS'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Terminal className="w-4 h-4" />
          Simulador de Testes dos Guardrails
        </button>

        <button
          onClick={() => setActiveTab('AUDIT_LOGS')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'AUDIT_LOGS'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          Logs de Auditoria em Tempo Real ({guardrailLogs.length})
        </button>
      </div>

      {/* TAB 1: DER SCHEMA VIEWER */}
      {activeTab === 'DER_SCHEMA' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Tables List */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
              Tabelas Relacionais (8 Entidades)
            </div>
            {DER_TABLES_INFO.map((t) => (
              <button
                key={t.name}
                onClick={() => setSelectedTable(t.name)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                  selectedTable === t.name
                    ? 'bg-emerald-950/50 border-emerald-500 text-white ring-1 ring-emerald-500 shadow-md'
                    : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold text-emerald-300">
                    dbo.{t.name}
                  </span>
                  <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    {t.columns.length} colunas
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-1">{t.purpose}</p>
              </button>
            ))}
          </div>

          {/* Table Details */}
          {DER_TABLES_INFO.find((t) => t.name === selectedTable) && (() => {
            const table = DER_TABLES_INFO.find((t) => t.name === selectedTable)!;

            return (
              <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-5 shadow-xl">
                <div className="border-b border-slate-800 pb-3">
                  <span className="text-[10px] uppercase font-bold text-emerald-400">
                    Especificação de Tabela
                  </span>
                  <h2 className="text-xl font-extrabold text-white font-mono">
                    CREATE TABLE {table.name}
                  </h2>
                  <p className="text-xs text-slate-300 mt-1">{table.purpose}</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse font-sans">
                    <thead>
                      <tr className="border-b border-slate-700 bg-slate-950/80 text-slate-400">
                        <th className="p-3">Coluna</th>
                        <th className="p-3">Tipo de Dado</th>
                        <th className="p-3">Chave</th>
                        <th className="p-3">Finalidade / Guardrail</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-200">
                      {table.columns.map((col, idx) => (
                        <tr key={idx} className="hover:bg-slate-950/40">
                          <td className="p-3 font-mono text-emerald-300 font-bold">{col.name}</td>
                          <td className="p-3 font-mono text-slate-400">{col.type}</td>
                          <td className="p-3">
                            {col.isPk && (
                              <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[9px] font-bold px-1.5 py-0.5 rounded">
                                PK
                              </span>
                            )}
                            {col.isFk && (
                              <span className="bg-indigo-950 text-indigo-300 border border-indigo-500/40 text-[9px] font-bold px-1.5 py-0.5 rounded ml-1">
                                FK
                              </span>
                            )}
                            {!col.isPk && !col.isFk && <span className="text-slate-500">-</span>}
                          </td>
                          <td className="p-3 text-[11px] text-slate-300">{col.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB 2: SQL DDL CODE */}
      {activeTab === 'SQL_DDL' && (
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <FileCode2 className="w-4 h-4" />
              <span>Script DDL PostgreSQL (Compatível com Neon & Prisma)</span>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(sqlDDLCode);
                alert('Código SQL DDL copiado para a área de transferência!');
              }}
              className="px-3 py-1.5 bg-slate-900 border border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold"
            >
              Copiar Script SQL
            </button>
          </div>

          <pre className="p-4 bg-slate-900/90 rounded-2xl text-emerald-300 font-mono text-xs leading-relaxed overflow-x-auto border border-slate-800">
            {sqlDDLCode}
          </pre>
        </div>
      )}

      {/* TAB 3: LIVE GUARDRAIL TESTER */}
      {activeTab === 'TESTER_GUARDRAILS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Test 1: Anti-Harassment Chat Filter */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>1. Filtro Anti-Assédio e Moderação de Chat</span>
            </div>
            <p className="text-xs text-slate-300">
              Teste o algoritmo que higieniza mensagens e bloqueia termos ofensivos entre recrutadores e jovens.
            </p>

            <form onSubmit={handleTestChat} className="space-y-3">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ex: Olá jovem, você foi idiota ao responder..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" /> Testar Sanitização em Tempo Real
              </button>
            </form>

            {chatResult && (
              <div className={`p-4 rounded-2xl border text-xs space-y-2 ${chatResult.safe ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-200' : 'bg-rose-950/60 border-rose-500/60 text-rose-200'}`}>
                <div className="font-bold flex items-center gap-1.5">
                  {chatResult.safe ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-rose-400" />}
                  <span>{chatResult.safe ? 'Mensagem Limpa & Aprovada' : 'Termo Inadequado Detectado e Bloqueado!'}</span>
                </div>
                <div>
                  <strong>Texto Higienizado:</strong>
                  <div className="p-2 bg-slate-950 rounded-lg font-mono text-[11px] mt-1 text-slate-200">
                    {chatResult.sanitized}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Test 2: CNPJ API Validator */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase">
              <KeyRound className="w-4 h-4" />
              <span>2. Validador de CNPJ (Receita Federal)</span>
            </div>
            <p className="text-xs text-slate-300">
              Garante que apenas organizações com CNPJ ativo e regularizado possam cadastrar vagas para aprendizes.
            </p>

            <form onSubmit={handleTestCnpj} className="space-y-3">
              <input
                type="text"
                value={cnpjInput}
                onChange={(e) => setCnpjInput(e.target.value)}
                placeholder="00.000.000/0001-00"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                <Server className="w-3.5 h-3.5" /> Consultar Base da Receita Federal
              </button>
            </form>

            {cnpjResult && (
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs space-y-1 text-slate-300">
                <div>Status: <strong className="text-emerald-400">{cnpjResult.status}</strong></div>
                {cnpjResult.companyName && (
                  <div>Razão Social: <strong className="text-white">{cnpjResult.companyName}</strong></div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: AUDIT LOGS STREAM */}
      {activeTab === 'AUDIT_LOGS' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-4 shadow-xl">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              Trilha de Auditoria dos Guardrails de Segurança
            </h3>
            <span className="text-xs text-slate-400">Stream Ativo</span>
          </div>

          <div className="space-y-2.5 max-h-[500px] overflow-y-auto">
            {guardrailLogs.map((log) => (
              <div
                key={log.id}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        log.status === 'BLOCKED'
                          ? 'bg-rose-950 text-rose-300 border border-rose-500/40'
                          : log.status === 'PROTECTED'
                          ? 'bg-purple-950 text-purple-300 border border-purple-500/40'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                      }`}
                    >
                      {log.status}
                    </span>
                    <span className="font-mono text-slate-400 text-[11px]">{log.type}</span>
                  </div>
                  <span className="text-[10px] text-slate-500">{log.timestamp}</span>
                </div>

                <p className="text-slate-200 leading-relaxed font-sans">{log.details}</p>
                <div className="text-[10px] text-slate-500 font-mono">Fonte: {log.source}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
