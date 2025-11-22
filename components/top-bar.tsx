"use client"

import { useState } from "react"
import { Moon, Sun, Menu } from "lucide-react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation" // Use next/navigation for App Router
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SideBar } from "./sidebar"

export function TopBar() {
  const { theme, setTheme } = useTheme()
  const router = useRouter() // Corrected router import for App Router
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const handleCreate = () => {
    const query = searchValue.trim().toLowerCase()
    if (query.includes("transform") || query.includes("foto") || query.includes("imagem") || query.includes("art")) {
      router.push("/transform")
    } else if (searchValue.trim()) {
      console.log("Creating:", searchValue)
    }
  }

  return (
    <>
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="px-4 py-3 md:px-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 items-center">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-lg md:text-xl font-bold text-primary">Frauche Creator.ia</h1>
            </div>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:flex gap-2">
              <Input
                type="text"
                placeholder="Peça aqui o que quer criar…"
                className="flex-1"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleCreate()}
              />
              <Button onClick={handleCreate} className="bg-primary text-primary-foreground hover:bg-primary/90">
                Criar
              </Button>
            </div>

            {/* Theme Toggle & Menu */}
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-foreground"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} className="text-foreground">
                <Menu size={20} />
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4 flex gap-2">
            <Input
              type="text"
              placeholder="Peça aqui o que quer criar…"
              className="flex-1"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleCreate()}
            />
            <Button onClick={handleCreate} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Criar
            </Button>
          </div>
        </div>
      </div>

      <SideBar open={sidebarOpen} onOpenChange={setSidebarOpen} />
    </>
  )
}
