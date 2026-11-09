import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // Aceita 'email' ou 'candEmail' caso venha com nome diferente
    const email = body.email || body.candEmail

    if (!email) {
      return NextResponse.json({ error: 'E-mail é obrigatório.' }, { status: 400 })
    }

    const supabase = await createClient()

    // Insere o e-mail na tabela emails_salvos
    const { data, error } = await supabase
      .from('emails_salvos')
      .insert([{ email }])
      .select()

    if (error) {
      console.error('Erro no Supabase:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ message: 'E-mail guardado com sucesso!', data }, { status: 200 })
  } catch (err) {
    console.error('Erro interno:', err)
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 })
  }
}