"use client"

import { Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface TransformedImage {
  id: string
  style: string
  imageUrl: string
  timestamp: number
}

interface TransformationResultsProps {
  images: TransformedImage[]
  onDownload: (imageUrl: string) => void
  onShare: (style: string) => void
}

export function TransformationResults({ images, onDownload, onShare }: TransformationResultsProps) {
  const getStyleLabel = (styleId: string) => {
    const labels: Record<string, string> = {
      cartoon: "Cartoon",
      anime: "Anime",
      hq: "HQ/Comics",
      painting: "Pintura",
      professional: "Profissional",
      watercolor: "Aquarela",
      sketch: "Esboço",
      cyberpunk: "Cyberpunk",
      retro: "Retrô",
      neon: "Neon",
      stencil: "Estêncil",
      claymation: "Claymation",
    }
    return labels[styleId] || styleId
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>Transformações Realizadas</CardTitle>
        <CardDescription>
          {images.length} imagem{images.length !== 1 ? "s" : ""} transformada{images.length !== 1 ? "s" : ""}
        </CardDescription>
      </CardHeader>
      <div className="px-6 pb-6">
        <div className="grid grid-cols-1 gap-6">
          {images.map((image) => (
            <div key={image.id} className="border border-border rounded-lg overflow-hidden">
              <div className="aspect-video bg-muted overflow-hidden">
                <img
                  src={image.imageUrl || "/placeholder.svg"}
                  alt={`Transformed ${image.style}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 bg-secondary/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{getStyleLabel(image.style)}</p>
                    <p className="text-sm text-muted-foreground">{new Date(image.timestamp).toLocaleTimeString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => onDownload(image.imageUrl)} className="gap-2">
                      <Download size={16} />
                      Baixar
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => onShare(image.style)} className="gap-2">
                      <Share2 size={16} />
                      Compartilhar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
