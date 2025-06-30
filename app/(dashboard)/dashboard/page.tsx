"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Heart, Users, Calendar, BookOpen, TrendingUp, Plus, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useUserRole } from "@/hooks/use-user-role"
import Link from "next/link"

interface DashboardStats {
  totalPedidos: number
  pedidosUrgentes: number
  totalMembros: number
  proximosEventos: number
  minhasOracoes: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const { profile, isAdmin, isCoordenador } = useUserRole()

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true)

        // Buscar estatísticas gerais
        const [pedidosResult, membrosResult, eventosResult] = await Promise.all([
          supabase.from("pedidos_oracao").select("id, priority").eq("is_public", true),
          supabase.from("usuarios").select("id").eq("status", "ativo"),
          supabase
            .from("eventos")
            .select("id")
            .eq("is_public", true)
            .gte("date", new Date().toISOString().split("T")[0]),
        ])

        // Buscar orações do usuário se estiver logado
        let minhasOracoes = 0
        if (profile?.id) {
          const { count } = await supabase
            .from("oracoes_usuario")
            .select("*", { count: "exact" })
            .eq("user_id", profile.id)
          minhasOracoes = count || 0
        }

        const pedidos = pedidosResult.data || []
        const pedidosUrgentes = pedidos.filter((p) => p.priority === "Urgente").length

        setStats({
          totalPedidos: pedidos.length,
          pedidosUrgentes,
          totalMembros: membrosResult.data?.length || 0,
          proximosEventos: eventosResult.data?.length || 0,
          minhasOracoes,
        })
      } catch (error) {
        console.error("Erro ao carregar estatísticas:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [profile?.id])

  if (loading) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link href="/oracoes">
              <Plus className="mr-2 h-4 w-4" />
              Novo Pedido
            </Link>
          </Button>
        </div>
      </div>

      {/* Estatísticas Principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos de Oração</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalPedidos || 0}</div>
            <p className="text-xs text-muted-foreground">{stats?.pedidosUrgentes || 0} urgentes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Membros Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalMembros || 0}</div>
            <p className="text-xs text-muted-foreground">Na comunidade</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximos Eventos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.proximosEventos || 0}</div>
            <p className="text-xs text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Minhas Orações</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.minhasOracoes || 0}</div>
            <p className="text-xs text-muted-foreground">Pedidos que oro</p>
          </CardContent>
        </Card>
      </div>

      {/* Progresso da Jornada */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Minha Jornada Espiritual</CardTitle>
            <CardDescription>Acompanhe seu progresso no Caminho 4D</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Dimensão: Oração</span>
                <span className="text-sm text-muted-foreground">75%</span>
              </div>
              <Progress value={75} className="w-full" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Dimensão: Palavra</span>
                <span className="text-sm text-muted-foreground">60%</span>
              </div>
              <Progress value={60} className="w-full" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Dimensão: Partilha</span>
                <span className="text-sm text-muted-foreground">45%</span>
              </div>
              <Progress value={45} className="w-full" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Dimensão: Serviço</span>
                <span className="text-sm text-muted-foreground">30%</span>
              </div>
              <Progress value={30} className="w-full" />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Acesse rapidamente as principais funcionalidades</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-start">
              <Link href="/oracoes">
                <Heart className="mr-2 h-4 w-4" />
                Ver Pedidos de Oração
                <ArrowRight className="ml-auto h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start bg-transparent">
              <Link href="/jornadas">
                <BookOpen className="mr-2 h-4 w-4" />
                Minha Jornada
                <ArrowRight className="ml-auto h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start bg-transparent">
              <Link href="/eventos">
                <Calendar className="mr-2 h-4 w-4" />
                Próximos Eventos
                <ArrowRight className="ml-auto h-4 w-4" />
              </Link>
            </Button>
            {(isAdmin || isCoordenador) && (
              <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                <Link href="/membros">
                  <Users className="mr-2 h-4 w-4" />
                  Gerenciar Membros
                  <ArrowRight className="ml-auto h-4 w-4" />
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Boas-vindas personalizadas */}
      {profile && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Bem-vindo(a), {profile.name}!
              <Badge variant={profile.status === "ativo" ? "default" : "secondary"}>{profile.role}</Badge>
            </CardTitle>
            <CardDescription>
              {profile.status === "ativo"
                ? "Você está ativo na comunidade Caminho 4D. Continue sua jornada espiritual!"
                : "Sua conta está pendente de aprovação. Em breve você terá acesso completo à plataforma."}
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  )
}
