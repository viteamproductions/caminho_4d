"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Cross, Mail, Lock, ArrowLeft } from "lucide-react"
import { useAuthStore } from "@/lib/stores/auth-store"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [useMagicLink, setUseMagicLink] = useState(false)

  const { signIn, signInWithMagicLink } = useAuthStore()
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (useMagicLink) {
        await signInWithMagicLink(email)
        toast({
          title: "✉️ Link enviado!",
          description: "Verifique seu e-mail e clique no link para entrar.",
        })
      } else {
        await signIn(email, password)
        toast({
          title: "✅ Login realizado!",
          description: "Bem-vindo de volta ao Caminho 4D.",
        })
        router.push("/dashboard")
      }
    } catch (error: any) {
      toast({
        title: "❌ Erro no login",
        description: error.message || "Verifique suas credenciais e tente novamente.",
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo de volta</h1>
          <p className="text-gray-600">Entre na sua conta para continuar sua jornada espiritual</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Entrar na Plataforma</CardTitle>
            <CardDescription>
              {useMagicLink
                ? "Digite seu e-mail para receber um link de acesso"
                : "Digite suas credenciais para acessar sua conta"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {!useMagicLink && (
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Entrando..." : useMagicLink ? "Enviar Link" : "Entrar"}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">ou</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full mt-4 bg-transparent"
                onClick={() => setUseMagicLink(!useMagicLink)}
              >
                {useMagicLink ? "Usar senha" : "Entrar com link por e-mail"}
              </Button>
            </div>

            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-gray-600">
                Não tem uma conta?{" "}
                <Link href="/cadastro" className="text-purple-600 hover:underline font-medium">
                  Criar conta gratuita
                </Link>
              </p>
              <Link href="/landing" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Voltar para o site
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Ao entrar, você concorda com nossos{" "}
            <Link href="/termos-de-uso" className="text-purple-600 hover:underline">
              Termos de Uso
            </Link>{" "}
            e{" "}
            <Link href="/politica-de-privacidade" className="text-purple-600 hover:underline">
              Política de Privacidade
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
