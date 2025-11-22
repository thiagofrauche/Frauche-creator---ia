"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { LogOut, Plus, FolderOpen, Settings, HelpCircle, Send, Wand2 } from "lucide-react"
import Link from "next/link"

interface SideBarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SideBar({ open, onOpenChange }: SideBarProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex flex-col gap-4">
          <Link href="/transform">
            <Button variant="ghost" className="w-full justify-start" onClick={() => onOpenChange(false)}>
              <Wand2 size={18} className="mr-2" />
              Transformar Foto em Arte
            </Button>
          </Link>

          <Link href="/new">
            <Button variant="ghost" className="w-full justify-start" onClick={() => onOpenChange(false)}>
              <Plus size={18} className="mr-2" />
              Novo Projeto
            </Button>
          </Link>

          <Link href="/projects">
            <Button variant="ghost" className="w-full justify-start" onClick={() => onOpenChange(false)}>
              <FolderOpen size={18} className="mr-2" />
              Seus Projetos
            </Button>
          </Link>

          <Link href="/settings">
            <Button variant="ghost" className="w-full justify-start" onClick={() => onOpenChange(false)}>
              <Settings size={18} className="mr-2" />
              Configurações
            </Button>
          </Link>

          <Button variant="ghost" className="w-full justify-start">
            <HelpCircle size={18} className="mr-2" />
            Ajuda
          </Button>

          <Button variant="ghost" className="w-full justify-start">
            <Send size={18} className="mr-2" />
            Feedback
          </Button>

          <div className="border-t border-border pt-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
            >
              <LogOut size={18} className="mr-2" />
              Sair da Conta
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
