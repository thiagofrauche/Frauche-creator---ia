"use client"

import type React from "react"

import { TopBar } from "@/components/top-bar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { ProjectCard } from "@/components/project-card"
import { Upload, X, Copy, Check } from "lucide-react"

export default function NewProject() {
  const [projectName, setProjectName] = useState("")
  const [prompt, setPrompt] = useState("")
  const [projectType, setProjectType] = useState("")
  const [aiModel, setAiModel] = useState("gpt")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [exampleImages, setExampleImages] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [copiedPrompt, setCopiedPrompt] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setExampleImages((prev) => [...prev, ...files])

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreviewUrls((prev) => [...prev, event.target?.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setExampleImages((prev) => prev.filter((_, i) => i !== index))
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index))
  }

  const copyPromptToClipboard = () => {
    const fullPrompt = `Projeto: ${projectName}\nTipo: ${projectType}\nModelo IA: ${aiModel}\n\nDescrição:\n${prompt}`
    navigator.clipboard.writeText(fullPrompt)
    setCopiedPrompt(true)
    setTimeout(() => setCopiedPrompt(false), 2000)
  }

  const handleGenerate = async () => {
    if (!projectName.trim() || !prompt.trim() || !projectType) {
      alert("Por favor, preencha todos os campos")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: projectName,
          prompt,
          type: projectType,
          model: aiModel,
          imagesCount: exampleImages.length,
        }),
      })
      const data = await response.json()
      setResult(data.project)
    } catch (error) {
      console.error("Erro ao gerar projeto:", error)
      alert("Erro ao gerar projeto")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <TopBar />
      <main className="max-w-4xl mx-auto px-4 py-8 md:px-6">
        <h1 className="text-3xl font-bold mb-8">Novo Projeto</h1>

        <Card className="bg-card border-border mb-8">
          <CardHeader>
            <CardTitle>Detalhes do Projeto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nome do Projeto</label>
              <Input
                placeholder="Ex: Meu App Incrível"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Descrever o Projeto (Prompt)</label>
              <div className="flex gap-2 items-start mt-1">
                <textarea
                  placeholder="Descreva em detalhes o que você quer criar..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full min-h-32 p-2 border border-border rounded-md bg-background text-foreground flex-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyPromptToClipboard}
                  className="mt-2 h-fit bg-transparent"
                  title="Copiar Prompt"
                >
                  {copiedPrompt ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Imagens de Exemplo (Opcional)</label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 hover:bg-muted/50 transition-colors cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="flex flex-col items-center gap-2 cursor-pointer">
                  <Upload size={24} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Clique ou arraste imagens aqui</span>
                </label>
              </div>

              {previewUrls.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {previewUrls.map((url, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={url || "/placeholder.svg"}
                        alt={`Preview ${idx}`}
                        className="w-full h-24 object-cover rounded-lg border border-border"
                      />
                      <button
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Tipo de Projeto</label>
                <Select value={projectType} onValueChange={setProjectType}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fotos">Fotos</SelectItem>
                    <SelectItem value="videos-clips">Vídeos Clips</SelectItem>
                    <SelectItem value="banners">Banners</SelectItem>
                    <SelectItem value="layout">Layout</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Modelo de IA</label>
                <Select value={aiModel} onValueChange={setAiModel}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecione a IA" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt">ChatGPT</SelectItem>
                    <SelectItem value="claude">Claude</SelectItem>
                    <SelectItem value="gemini">Gemini</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {loading ? "Gerando..." : "Gerar Projeto"}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Resultado Gerado</h2>
            <ProjectCard
              id={result.id}
              title={result.name}
              summary={result.summary}
              badges={result.badges}
              onSave={() => {
                fetch("/api/projects", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(result),
                })
                alert("Projeto salvo!")
              }}
              onExport={() => {
                const json = JSON.stringify(result, null, 2)
                const blob = new Blob([json], { type: "application/json" })
                const url = URL.createObjectURL(blob)
                const a = document.createElement("a")
                a.href = url
                a.download = `${result.name}.json`
                a.click()
              }}
            />

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Seções Sugeridas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {result.sections?.map((section: any, idx: number) => (
                  <div key={idx} className="p-4 bg-background rounded-lg border border-border">
                    <h3 className="font-semibold mb-2">{section.title}</h3>
                    <p className="text-sm text-muted-foreground">{section.content}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </>
  )
}
