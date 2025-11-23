import { type NextRequest, NextResponse } from "next/server"
import { Buffer } from "buffer"

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || ""
    let query = ""
    let imageBuffer: Buffer | null = null

    if (contentType.includes("application/json")) {
      const body = await request.json()
      query = body.query
    } else if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData()
      query = formData.get("query") as string
      const imageFile = formData.get("image") as File | null

      if (imageFile) {
        const arrayBuffer = await imageFile.arrayBuffer()
        imageBuffer = Buffer.from(arrayBuffer)
      }
    }

    // Process query with ChatGPT to determine intent
    const intent = await determinIntent(query, imageBuffer)

    return NextResponse.json({
      success: true,
      intent,
      query,
      response: generateResponse(intent, query),
    })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao processar sua solicitação" }, { status: 500 })
  }
}

function determinIntent(query: string, imageBuffer?: Buffer | null): string {
  const lowerQuery = query.toLowerCase()

  // Photo transformation intents - enhanced with image presence
  if (
    lowerQuery.includes("transform") ||
    lowerQuery.includes("foto") ||
    lowerQuery.includes("imagem") ||
    lowerQuery.includes("anime") ||
    lowerQuery.includes("cartoon") ||
    lowerQuery.includes("desenho") ||
    lowerQuery.includes("caricatura") ||
    lowerQuery.includes("arte") ||
    lowerQuery.includes("art") ||
    imageBuffer // If image is provided, likely transformation
  ) {
    return "transform"
  }

  // Project creation intents
  if (
    lowerQuery.includes("criar") ||
    lowerQuery.includes("novo") ||
    lowerQuery.includes("landing") ||
    lowerQuery.includes("ebook") ||
    lowerQuery.includes("video") ||
    lowerQuery.includes("app") ||
    lowerQuery.includes("automação") ||
    lowerQuery.includes("projeto")
  ) {
    return "create"
  }

  // Project search intents
  if (
    lowerQuery.includes("projeto") ||
    lowerQuery.includes("meus") ||
    lowerQuery.includes("lista") ||
    lowerQuery.includes("buscar") ||
    lowerQuery.includes("ver")
  ) {
    return "projects"
  }

  // Settings intents
  if (
    lowerQuery.includes("configur") ||
    lowerQuery.includes("preferência") ||
    lowerQuery.includes("tema") ||
    lowerQuery.includes("settings") ||
    lowerQuery.includes("perfil")
  ) {
    return "settings"
  }

  return "general"
}

function generateResponse(intent: string, query: string): string {
  const responses: Record<string, string> = {
    transform:
      "Vou levar você para transformar fotos em arte! Escolha o estilo desejado: Anime, Cartoon, HQ, Pintura ou outros filtros incríveis.",
    create:
      "Perfeito! Vou ajudá-lo a criar um novo projeto. Qual tipo você prefere: Landing Page, E-book, Vídeo ou App?",
    projects: "Vou mostrar todos os seus projetos criados. Aqui você pode ver, editar ou deletar seus trabalhos.",
    settings: "Você será levado às configurações. Lá pode ajustar tema, preferências e informações do perfil.",
    general: `Entendi sua solicitação: "${query}". Como posso ajudá-lo melhor?`,
  }

  return responses[intent] || responses.general
}
