"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cross, User, Mail, Lock, ArrowLeft, CheckCircle, Phone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function CadastroPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    desiredRole: "membro",
    message: "",
    acceptTerms: false,
    acceptNewsletter: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.acceptTerms) {
      toast({
        title: "Aceite os termos",
        description: "É necessário aceitar os termos de uso para criar sua conta.",
        variant: "destructive",
      })
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Senhas não coincidem",
        description: "Verifique se as senhas digitadas são iguais.",
        variant: "destructive",
      })
      return
    }

    if (formData.password.length < 6) {
      toast({
        title: "Senha muito curta",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            phone: formData.phone,
            desired_role: formData.desiredRole,
            message: formData.message,
          },
        },
      })

      if (error) throw error

      // Atualizar dados adicionais na tabela usuarios
      if (data.user) {
        await supabase
          .from("usuarios")
          .update({
            phone: formData.phone,
            bio: formData.message,
            updated_at: new Date().toISOString(),
          })
          .eq("id", data.user.id)
      }

      toast({
        title: "✅ Cadastro realizado!",
        description: "Seu cadastro foi enviado para aprovação. Você receberá um e-mail quando for aprovado.",
      })

      router.push("/cadastro-sucesso")
    } catch (error: any) {
      toast({
        title: "❌ Erro ao criar conta",
        description: error.message || "Tente novamente em alguns instantes.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/landing" className="inline-flex items-center gap-2 mb-6">
            <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-purple-600 text-white">
              <Cross className="size-5" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Caminho 4D</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Solicitar Acesso</h1>
          <p className="text-gray-600">Preencha os dados para solicitar acesso à plataforma</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Solicitação de Cadastro</CardTitle>
            <CardDescription>Seu cadastro será analisado por um administrador antes da aprovação</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="desiredRole">Como deseja participar? *</Label>
                <Select
                  value={formData.desiredRole}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, desiredRole: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="membro">Membro (participar dos grupos)</SelectItem>
                    <SelectItem value="coordenador">Coordenador (liderar grupos)</SelectItem>
                    <SelectItem value="visitante">Visitante (apenas visualizar)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensagem (opcional)</Label>
                <Textarea
                  id="message"
                  placeholder="Conte um pouco sobre você e sua motivação para participar..."
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    value={formData.password}
                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Digite a senha novamente"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, acceptTerms: !!checked }))}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    Aceito os{" "}
                    <Link href="/termos-de-uso" className="text-purple-600 hover:underline">
                      Termos de Uso
                    </Link>{" "}
                    e{" "}
                    <Link href="/politica-de-privacidade" className="text-purple-600 hover:underline">
                      Política de Privacidade
                    </Link>
                    *
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="newsletter"
                    checked={formData.acceptNewsletter}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, acceptNewsletter: !!checked }))}
                  />
                  <Label htmlFor="newsletter" className="text-sm">
                    Quero receber novidades e conteúdos espirituais por e-mail
                  </Label>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Enviando solicitação..." : "Solicitar Acesso"}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-gray-600">
                Já tem uma conta?{" "}
                <Link href="/login" className="text-purple-600 hover:underline font-medium">
                  Fazer login
                </Link>
              </p>
              <Link href="/landing" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Voltar para o site
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Process Info */}
        <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Processo de Aprovação:</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="h-4 w-4 text-blue-600" />
              1. Envie sua solicitação de cadastro
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="h-4 w-4 text-orange-600" />
              2. Aguarde análise do administrador
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="h-4 w-4 text-green-600" />
              3. Receba e-mail de aprovação
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="h-4 w-4 text-purple-600" />
              4. Acesse a plataforma completa
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
