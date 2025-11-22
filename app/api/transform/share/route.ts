import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { imageUrl, platform, caption } = body

    // Mock social media sharing setup
    const shareUrls = {
      instagram: `https://www.instagram.com/`,
      tiktok: `https://www.tiktok.com/`,
      twitter: `https://twitter.com/`,
    }

    return NextResponse.json({
      success: true,
      shareUrl: shareUrls[platform as keyof typeof shareUrls],
      message: `Pronto para compartilhar no ${platform}!`,
    })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao preparar compartilhamento" }, { status: 500 })
  }
}
