"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Plus, Clock, AlertTriangle, User, HandIcon as PrayingHands } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useUserRole } from "@/hooks/use-user-role"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useToast } from "@/hooks/use-toast"
import { GlobalLoading, CardSkeleton, StatsSkeleton } from "@/components/ui/global-loading"

interface PedidoOracao {
  id: string
  title: string
  content: string
  category: string
  priority: "Normal" | "Urgente"
  author_name: string
  prayer_count: number
  created_at: string
  is_public: boolean
}

export default function OracoesPage() {
  const [pedidos, setPedidos] = useState<PedidoOracao[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [orandoPedidos, setOrandoPedidos] = useState<string[]>([])
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const { profile } = useUserRole()
  const { toast } = useToast()

  useEffect(() => {
    async function fetchPedidos() {
      try {
        setLoading(true)
        setError(null)

        const { data, error: fetchError } = await supabase
          .from("pedidos_oracao")
          .select("*")
          .eq("is_public", true)
          .order("created_at", { ascending: false })

        if (fetchError) {
          throw fetchError
        }

        setPedidos(data || [])
      } catch (error) {
        console.error("Erro ao carregar pedidos:", error)
        setError("Não foi possível carregar os pedidos de oração")
      } finally {
        setLoading(false)
      }
    }

    async function loadUserPrayers() {
      if (!profile?.id) return

      try {
        const { data } = await supabase.from("oracoes_usuario").select("pedido_id").eq("user_id", profile.id)

        if (data) {
          setOrandoPedidos(data.map((item) => item.pedido_id))
        }
      } catch (error) {
        console.error("Erro ao carregar orações do usuário:", error)
      }
    }

    fetchPedidos()
    loadUserPrayers()
  }, [profile?.id])

  const handleToggleOracao = async (pedidoId: string) => {
    if (!profile?.id) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para orar por um pedido",
        variant: "destructive",
      })
      return
    }

    setActionLoading(pedidoId)
    const isOrando = orandoPedidos.includes(pedidoId)

    try {
      if (isOrando) {
        // Parar de orar
        const { error } = await supabase
          .from("oracoes_usuario")
          .delete()
          .eq("user_id", profile.id)
          .eq("pedido_id", pedidoId)

        if (error) throw error

        setOrandoPedidos((prev) => prev.filter((id) => id !== pedidoId))
        setPedidos((prev) =>
          prev.map((pedido) =>
            pedido.id === pedidoId ? { ...pedido, prayer_count: Math.max(0, pedido.prayer_count - 1) } : pedido,
          ),
        )

        toast({
          title: "Oração removida",
          description: "Você parou de orar por este pedido",
        })
      } else {
        // Começar a orar
        const { error } = await supabase.from("oracoes_usuario").insert({
          user_id: profile.id,
          pedido_id: pedidoId,
        })

        if (error) throw error

        setOrandoPedidos((prev) => [...prev, pedidoId])
        setPedidos((prev) =>
          prev.map((pedido) =>
            pedido.id === pedidoId ? { ...pedido, prayer_count: pedido.prayer_count + 1 } : pedido,
          ),
        )

        toast({
          title: "🙏 Oração registrada",
          description: "Você está orando por este pedido. Que Deus abençoe!",
        })
      }
    } catch (error: any) {
      console.error("Erro ao alternar oração:", error)
      toast({
        title: "Erro",
        description: "Não foi possível processar sua oração. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setActionLoading(null)
    }
  }

  if (loading) {
    return (
      <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Pedidos de Oração</h2>
            <p className="text-muted-foreground">Compartilhe suas intenções e ore pelos irmãos da comunidade</p>
          </div>
          <Button disabled>
            <Plus className="mr-2 h-4 w-4" />
            Novo Pedido
          </Button>
        </div>

        <StatsSkeleton />
        <GlobalLoading type="oracoes" size="md" />
        <CardSkeleton items={6} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Pedidos de Oração</h2>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Erro ao carregar pedidos</h3>
            <p className="text-muted-foreground text-center mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const pedidosUrgentes = pedidos.filter((p) => p.priority === "Urgente").length
  const totalOracoes = pedidos.reduce((acc, p) => acc + p.prayer_count, 0)
  const minhasOracoes = orandoPedidos.length

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Pedidos de Oração</h2>
          <p className="text-muted-foreground">Compartilhe suas intenções e ore pelos irmãos da comunidade</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Pedido
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Pedidos</CardTitle>
            <PrayingHands className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pedidos.length}</div>
            <p className="text-xs text-muted-foreground">Ativos na comunidade</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orações Feitas</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOracoes}</div>
            <p className="text-xs text-muted-foreground">Pela comunidade</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos Urgentes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pedidosUrgentes}</div>
            <p className="text-xs text-muted-foreground">Precisam de atenção</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suas Orações</CardTitle>
            <PrayingHands className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{minhasOracoes}</div>
            <p className="text-xs text-muted-foreground">Você está orando</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Pedidos */}
      {pedidos.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Heart className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum pedido encontrado</h3>
            <p className="text-muted-foreground text-center mb-4">
              Seja o primeiro a compartilhar um pedido de oração com a comunidade.
            </p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Criar Primeiro Pedido
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pedidos.map((pedido) => {
            const isOrando = orandoPedidos.includes(pedido.id)
            const isUrgente = pedido.priority === "Urgente"
            const isLoadingAction = actionLoading === pedido.id

            return (
              <Card key={pedido.id} className={isUrgente ? "border-orange-200 bg-orange-50/50" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg leading-tight">{pedido.title}</CardTitle>
                    {isUrgente && (
                      <Badge variant="destructive" className="ml-2 shrink-0">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Urgente
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {pedido.author_name}
                    <span>•</span>
                    <Clock className="w-4 h-4" />
                    {formatDistanceToNow(new Date(pedido.created_at), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{pedido.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{pedido.category}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {pedido.prayer_count} {pedido.prayer_count === 1 ? "pessoa orando" : "pessoas orando"}
                      </span>
                    </div>
                    <Button
                      variant={isOrando ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleToggleOracao(pedido.id)}
                      disabled={isLoadingAction || !profile}
                      className={isOrando ? "bg-red-600 hover:bg-red-700" : ""}
                    >
                      <Heart className={`w-4 h-4 mr-1 ${isOrando ? "fill-current" : ""}`} />
                      {isLoadingAction ? "..." : isOrando ? "Orando 🙏" : "Orar"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
