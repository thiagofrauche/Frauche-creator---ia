"use client"

import { TopBar } from "@/components/top-bar"
import { ProjectCard } from "@/components/project-card"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react"

interface Project {
  id: string
  name: string
  summary: string
  badges: string[]
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch projects from API
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.projects || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <>
      <TopBar />
      <main className="max-w-7xl mx-auto px-4 py-8 md:px-6">
        {projects.length === 0 && (
          <Card className="bg-card border-border mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Comece um projeto com IA</CardTitle>
              <CardDescription className="mt-2 text-base">
                Use a barra acima para pedir o que você quer criar. Tudo acontece dentro do Frauche Creator.ia.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {projects.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Seus Projetos</h2>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.name}
                  summary={project.summary}
                  badges={project.badges}
                  onOpen={() => console.log("Open:", project.id)}
                  onSave={() => console.log("Save:", project.id)}
                  onExport={() => console.log("Export:", project.id)}
                  onDelete={() => {
                    setProjects(projects.filter((p) => p.id !== project.id))
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  )
}
