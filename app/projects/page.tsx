"use client"

import { TopBar } from "@/components/top-bar"
import { ProjectCard } from "@/components/project-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react"

interface Project {
  id: string
  name: string
  summary: string
  badges: string[]
  type: string
  date: string
  status: string
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.projects || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja deletar este projeto?")) {
      await fetch(`/api/projects/${id}`, { method: "DELETE" })
      setProjects(projects.filter((p) => p.id !== id))
    }
  }

  const handleDuplicate = (project: Project) => {
    const newProject = { ...project, id: Date.now().toString(), name: `${project.name} (Cópia)` }
    setProjects([...projects, newProject])
  }

  if (loading) {
    return (
      <>
        <TopBar />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <p>Carregando projetos...</p>
        </main>
      </>
    )
  }

  return (
    <>
      <TopBar />
      <main className="max-w-7xl mx-auto px-4 py-8 md:px-6">
        <h1 className="text-3xl font-bold mb-8">Seus Projetos</h1>

        {projects.length === 0 ? (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Nenhum projeto ainda</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Crie seu primeiro projeto acessando a página de novo projeto.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.name}
                summary={project.summary}
                badges={project.badges}
                onOpen={() => console.log("Open:", project.id)}
                onSave={() => handleDuplicate(project)}
                onExport={() => {
                  const json = JSON.stringify(project, null, 2)
                  const blob = new Blob([json], { type: "application/json" })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement("a")
                  a.href = url
                  a.download = `${project.name}.json`
                  a.click()
                }}
                onDelete={() => handleDelete(project.id)}
              />
            ))}
          </div>
        )}
      </main>
    </>
  )
}
