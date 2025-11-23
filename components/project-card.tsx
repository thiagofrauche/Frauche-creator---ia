"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Trash2, Copy, Check } from "lucide-react"
import { useState } from "react"

interface ProjectCardProps {
  id: string
  title: string
  summary: string
  badges: string[]
  prompt?: string
  onSave?: () => void
  onExport?: () => void
  onOpen?: () => void
  onDelete?: () => void
}

export function ProjectCard({
  id,
  title,
  summary,
  badges,
  prompt,
  onSave,
  onExport,
  onOpen,
  onDelete,
}: ProjectCardProps) {
  const [copiedSummary, setCopiedSummary] = useState(false)

  const handleCopyPrompt = () => {
    const textToCopy = prompt || summary
    navigator.clipboard.writeText(textToCopy)
    setCopiedSummary(true)
    setTimeout(() => setCopiedSummary(false), 2000)
  }

  return (
    <Card className="hover:shadow-lg transition-shadow bg-card border-border">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="mt-1">{summary}</CardDescription>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {badges.map((badge) => (
            <Badge key={badge} variant="secondary" className="bg-muted text-foreground">
              {badge}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={onOpen} className="flex-1 min-w-24 bg-transparent">
            Abrir
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopyPrompt}
            className="flex-1 min-w-24 bg-transparent"
            title="Copiar Prompt"
          >
            {copiedSummary ? <Check size={16} className="mr-1 text-green-600" /> : <Copy size={16} className="mr-1" />}
            {copiedSummary ? "Copiado!" : "Copiar"}
          </Button>
          <Button size="sm" variant="outline" onClick={onExport} className="flex-1 min-w-24 bg-transparent">
            <Download size={16} className="mr-1" />
            Exportar
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={onDelete}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
