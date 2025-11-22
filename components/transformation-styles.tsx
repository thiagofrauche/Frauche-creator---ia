"use client"

import { Button } from "@/components/ui/button"

export const TRANSFORMATION_STYLES = [
  {
    id: "cartoon",
    name: "Cartoon",
    description: "Estilo desenho animado",
    icon: "🎨",
  },
  {
    id: "anime",
    name: "Anime",
    description: "Estilo anime japonês",
    icon: "⛩️",
  },
  {
    id: "hq",
    name: "HQ/Comics",
    description: "Estilo histórias em quadrinhos",
    icon: "💬",
  },
  {
    id: "painting",
    name: "Pintura",
    description: "Estilo pintura a óleo",
    icon: "🖼️",
  },
  {
    id: "professional",
    name: "Profissional",
    description: "Filtro foto profissional",
    icon: "📸",
  },
  {
    id: "watercolor",
    name: "Aquarela",
    description: "Efeito aquarela artístico",
    icon: "🌊",
  },
  {
    id: "sketch",
    name: "Esboço",
    description: "Estilo desenho a lápis",
    icon: "✏️",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    description: "Estilo cyberpunk futurista",
    icon: "🤖",
  },
  {
    id: "retro",
    name: "Retrô",
    description: "Estilo vintage dos anos 80",
    icon: "📼",
  },
  {
    id: "neon",
    name: "Neon",
    description: "Efeito luzes neon",
    icon: "💡",
  },
  {
    id: "stencil",
    name: "Estêncil",
    description: "Efeito stencil pop art",
    icon: "🎭",
  },
  {
    id: "claymation",
    name: "Claymation",
    description: "Estilo animação em argila",
    icon: "🧩",
  },
]

interface TransformationStylesProps {
  selectedStyle: string
  onStyleChange: (style: string) => void
}

export function TransformationStyles({ selectedStyle, onStyleChange }: TransformationStylesProps) {
  return (
    <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
      {TRANSFORMATION_STYLES.map((style) => (
        <Button
          key={style.id}
          variant={selectedStyle === style.id ? "default" : "outline"}
          onClick={() => onStyleChange(style.id)}
          className={`justify-start text-left h-auto py-2 px-3 ${
            selectedStyle === style.id
              ? "bg-primary text-primary-foreground"
              : "bg-background text-foreground hover:bg-secondary"
          }`}
        >
          <div className="flex flex-col gap-1 w-full">
            <p className="font-medium text-sm">{style.name}</p>
            <p className="text-xs opacity-75">{style.description}</p>
          </div>
        </Button>
      ))}
    </div>
  )
}
