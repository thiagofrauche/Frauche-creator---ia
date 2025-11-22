import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, prompt, type, model } = body

    // Mock AI generation response
    const mockProject = {
      id: Date.now().toString(),
      name,
      summary: `Projeto gerado com ${model}: ${prompt.substring(0, 80)}...`,
      badges: [
        type === "landing"
          ? "Landing"
          : type === "ebook"
            ? "E-book"
            : type === "video"
              ? "Vídeo"
              : type === "app"
                ? "App"
                : "Automação",
      ],
      sections: [
        {
          title: "Seção Herói",
          content: "Título forte, subtítulo inspirador e call-to-action claro para engajar usuários.",
        },
        {
          title: "Características Principais",
          content: "Destaque os diferenciais do seu projeto em cards informativos.",
        },
        {
          title: "Próximos Passos",
          content: "Refinamento, testes e preparação para deploy em produção.",
        },
      ],
      type,
      model,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({
      project: mockProject,
    })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao processar requisição" }, { status: 500 })
  }
}
