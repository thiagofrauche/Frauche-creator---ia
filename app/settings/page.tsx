"use client"

import { TopBar } from "@/components/top-bar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Camera } from "lucide-react"

export default function Settings() {
  const [name, setName] = useState("João Silva")
  const [email, setEmail] = useState("joao@example.com")
  const [phone, setPhone] = useState("+55 11 99999-9999")
  const [plan, setPlan] = useState("Pro")

  return (
    <>
      <TopBar />
      <main className="max-w-4xl mx-auto px-4 py-8 md:px-6">
        <h1 className="text-3xl font-bold mb-8">Configurações</h1>

        {/* Account Settings */}
        <Card className="bg-card border-border mb-6">
          <CardHeader>
            <CardTitle>Conta</CardTitle>
            <CardDescription>Gerencie as informações da sua conta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Camera size={24} className="text-primary" />
              </div>
              <Button variant="outline" size="sm">
                Alterar Foto
              </Button>
            </div>

            <div>
              <label className="text-sm font-medium">Nome</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
            </div>

            <div>
              <label className="text-sm font-medium">Telefone</label>
              <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1" />
            </div>

            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Salvar Alterações</Button>
          </CardContent>
        </Card>

        {/* Subscription */}
        <Card className="bg-card border-border mb-6">
          <CardHeader>
            <CardTitle>Assinatura</CardTitle>
            <CardDescription>Gerencie seu plano</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
              <p className="font-semibold text-primary">Plano Atual: {plan}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Você tem acesso ilimitado a recursos do Frauche Creator.ia
              </p>
            </div>
            <Button variant="outline">Gerenciar Plano</Button>
          </CardContent>
        </Card>

        {/* Payments */}
        <Card className="bg-card border-border mb-6">
          <CardHeader>
            <CardTitle>Pagamentos</CardTitle>
            <CardDescription>Gerencie seus métodos de pagamento</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-semibold">•••• •••• •••• 4242</p>
              <p className="text-sm text-muted-foreground">Válido até 12/2025</p>
            </div>
            <Button variant="outline">Adicionar/Atualizar Cartão</Button>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="bg-card border-border mb-6">
          <CardHeader>
            <CardTitle>Aparência</CardTitle>
            <CardDescription>Customize a aparência do aplicativo</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">
              Use o botão na barra superior para alternar entre temas claro e escuro.
            </p>
          </CardContent>
        </Card>

        {/* Logout */}
        <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900">
          <CardHeader>
            <CardTitle className="text-red-600">Sair da Conta</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
              Sair
            </Button>
          </CardContent>
        </Card>
      </main>
    </>
  )
}
