"use client"

import type React from "react"

import { useState, useRef } from "react"
import { X, MessageCircle, Loader2, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ChatSearchModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onNavigate: (intent: string) => void
}

export function ChatSearchModal({ open, onOpenChange, onNavigate }: ChatSearchModalProps) {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState("")
  const [intent, setIntent] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSearch = async () => {
    if (!query.trim() && !imageFile) return

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("query", query)
      if (imageFile) {
        formData.append("image", imageFile)
      }

      const result = await fetch("/api/chat/search", {
        method: "POST",
        body: formData,
      }).then((res) => res.json())

      setResponse(result.response)
      setIntent(result.intent)
    } catch (error) {
      setResponse("Desculpe, houve um erro ao processar sua solicitação.")
    } finally {
      setLoading(false)
    }
  }

  const handleNavigate = () => {
    if (intent && intent !== "general") {
      onNavigate(intent)
      onOpenChange(false)
      setQuery("")
      setResponse("")
      setIntent("")
      setImagePreview(null)
      setImageFile(null)
    }
  }

  const handleClose = () => {
    onOpenChange(false)
    setQuery("")
    setResponse("")
    setIntent("")
    setImagePreview(null)
    setImageFile(null)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center justify-center">
      <div className="bg-background w-full md:w-full md:max-w-2xl md:rounded-lg rounded-t-lg border border-border shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <MessageCircle size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Chat com IA</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-4 max-h-96 overflow-y-auto">
          <div className="space-y-3">
            {/* Description and Image Upload */}
            <div className="flex gap-3">
              <Input
                placeholder="Descreva o que deseja fazer..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !loading && handleSearch()}
                disabled={loading}
                className="flex-1"
              />
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              <Button
                variant="outline"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
                title="Anexar imagem de exemplo"
              >
                <ImageIcon size={18} />
              </Button>
              <Button
                onClick={handleSearch}
                disabled={loading || (!query.trim() && !imageFile)}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : "Enviar"}
              </Button>
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="relative rounded-lg overflow-hidden border border-border">
                <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-full h-40 object-cover" />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setImagePreview(null)
                    setImageFile(null)
                    if (fileInputRef.current) fileInputRef.current.value = ""
                  }}
                >
                  <X size={14} />
                </Button>
              </div>
            )}
          </div>

          {/* Response */}
          {response && (
            <div className="bg-secondary/20 border border-secondary rounded-lg p-4">
              <p className="text-sm text-foreground">{response}</p>
            </div>
          )}

          {/* Navigate Button */}
          {intent && intent !== "general" && (
            <Button onClick={handleNavigate} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Ir para{" "}
              {intent === "transform"
                ? "Transformar Foto"
                : intent === "create"
                  ? "Criar Projeto"
                  : intent === "projects"
                    ? "Meus Projetos"
                    : "Configurações"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
