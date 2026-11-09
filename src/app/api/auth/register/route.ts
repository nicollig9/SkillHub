import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Sanitiza e obtém as credenciais
const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://anvyqzfiuvzayqviqk.supabase.co').replace(/[\r\n\s]+/g, '').trim();
const SUPABASE_ANON_KEY = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').replace(/[\r\n\s]+/g, '').trim();

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false }
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('--- DADOS RECEBIDOS NA API ---:', body);

    const { email, nome, password, cpf, data_nascimento } = body;

    if (!email) {
      return NextResponse.json({ error: 'O e-mail é obrigatório.' }, { status: 400 });
    }

    // Mapeamento estrito com os nomes das colunas reais da tabela 'alunos'
    const payloadAluno = {
      nome: nome || body.nomeCompleto || 'Aluno',
      email: email.trim(),
      senha_hash: password || '123456',
      cpf: cpf || null,
      data_nascimento: data_nascimento || null,
    };

    const { data, error } = await supabase
      .from('alunos')
      .insert([payloadAluno])
      .select();

    if (error) {
      console.error('--- ERRO DO SUPABASE DB ---:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('--- EXCEÇÃO NO SERVIDOR ---:', err);
    return NextResponse.json(
      { error: err?.message || 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}