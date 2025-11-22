import { type NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    // Mock delete
    return NextResponse.json({
      success: true,
      message: `Projeto ${id} deletado`,
    })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao deletar projeto" }, { status: 500 })
  }
}
