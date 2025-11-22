import { type NextRequest, NextResponse } from "next/server"

// Mock database
const mockProjects = [
  {
    id: "1",
    name: "Landing Page SaaS",
    summary: "Landing page moderna para startup de IA",
    badges: ["Landing", "Design"],
    type: "landing",
    date: "2025-11-20",
    status: "Completo",
  },
  {
    id: "2",
    name: "E-book Marketing",
    summary: "Guia completo sobre estratégias de marketing digital",
    badges: ["E-book", "Conteúdo"],
    type: "ebook",
    date: "2025-11-18",
    status: "Completo",
  },
]

export async function GET() {
  return NextResponse.json({
    projects: mockProjects,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newProject = {
      ...body,
      date: new Date().toISOString().split("T")[0],
      status: "Completo",
    }
    return NextResponse.json({
      success: true,
      project: newProject,
    })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao salvar projeto" }, { status: 500 })
  }
}
