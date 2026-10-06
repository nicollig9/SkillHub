import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, senha, tipo, situacao } = body

    // 1. Verificar se o e-mail já foi registado
    const usuarioExiste = await prisma.user.findUnique({
      where: { email }
    })

    if (usuarioExiste) {
      return NextResponse.json(
        { error: 'Este e-mail já está em uso.' },
        { status: 400 }
      )
    }

    // 2. Gravar o novo utilizador no Supabase através do Prisma
    const novoUsuario = await prisma.user.create({
      data: {
        email,
        senha,
        tipo,
        situacao
      }
    })

    return NextResponse.json(
      { message: 'Registo concluído com sucesso!', user: novoUsuario },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao registar utilizador.' },
      { status: 500 }
    )
  }
}