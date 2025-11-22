"use client"

import type React from "react"

import { useState } from "react"
import { TopBar } from "@/components/top-bar"
import { Upload, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TransformationStyles } from "@/components/transformation-styles"
import { TransformationResults } from "@/components/transformation-results"

interface TransformedImage {
  id: string
  style: string
  imageUrl: string
  timestamp: number
}

export default function TransformPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState<string>("cartoon")
  const [transformedImages, setTransformedImages] = useState<TransformedImage[]>([])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleTransform = async () => {
    if (!uploadedImage) return

    setLoading(true)
    try {
      const response = await fetch("/api/transform/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: uploadedImage,
          style: selectedStyle,
        }),
      })

      const data = await response.json()
      if (data.transformedImage) {
        setTransformedImages((prev) => [
          {
            id: Date.now().toString(),
            style: selectedStyle,
            imageUrl: data.transformedImage,
            timestamp: Date.now(),
          },
          ...prev,
        ])
      }
    } catch (error) {
      console.error("Transform error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <TopBar />
      <main className="max-w-7xl mx-auto px-4 py-8 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Transformar Foto em Arte</h1>
          <p className="text-muted-foreground">
            Use inteligências artificiais avançadas para converter suas fotos em diferentes estilos artísticos
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload & Controls */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-border sticky top-24">
              <CardHeader>
                <CardTitle>Upload de Imagem</CardTitle>
                <CardDescription>Selecione uma foto para transformar</CardDescription>
              </CardHeader>
              <div className="px-6 pb-6 space-y-4">
                {/* Upload Area */}
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:bg-secondary/50 transition">
                  <label className="cursor-pointer w-full">
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    <Upload className="mx-auto mb-2 text-primary" size={32} />
                    <p className="font-medium">Clique ou arraste uma imagem</p>
                    <p className="text-sm text-muted-foreground">PNG, JPG até 10MB</p>
                  </label>
                </div>

                {uploadedImage && (
                  <>
                    <div className="text-sm">
                      <p className="font-medium">Arquivo: {fileName}</p>
                    </div>

                    {/* Style Selection */}
                    <div>
                      <p className="font-medium mb-3">Selecione um Estilo:</p>
                      <TransformationStyles selectedStyle={selectedStyle} onStyleChange={setSelectedStyle} />
                    </div>

                    {/* Transform Button */}
                    <Button
                      onClick={handleTransform}
                      disabled={loading}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Transformando...
                        </>
                      ) : (
                        "Transformar Agora"
                      )}
                    </Button>
                  </>
                )}
              </div>
            </Card>
          </div>

          {/* Preview & Results */}
          <div className="lg:col-span-2">
            {uploadedImage ? (
              <div className="space-y-6">
                {/* Original Image Preview */}
                <Card className="bg-card border-border overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-lg">Imagem Original</CardTitle>
                  </CardHeader>
                  <div className="px-6 pb-6">
                    <img
                      src={uploadedImage || "/placeholder.svg"}
                      alt="Original"
                      className="w-full h-auto rounded-lg max-h-96 object-cover"
                    />
                  </div>
                </Card>

                {/* Transformed Results */}
                {transformedImages.length > 0 && (
                  <TransformationResults
                    images={transformedImages}
                    onDownload={(imageUrl) => {
                      const link = document.createElement("a")
                      link.href = imageUrl
                      link.download = "frauche-transformed.png"
                      link.click()
                    }}
                    onShare={(style) => {
                      const text = `Transformei minha foto em ${style} usando Frauche Creator.ia!`
                      const encodedText = encodeURIComponent(text)
                      window.open(`https://www.instagram.com/?caption=${encodedText}`, "_blank")
                    }}
                  />
                )}
              </div>
            ) : (
              <Card className="bg-card border-border h-64 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground mb-2">Nenhuma imagem carregada</p>
                  <p className="text-sm text-muted-foreground">Faça upload de uma imagem para começar</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
