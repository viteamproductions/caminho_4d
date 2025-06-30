"use client"

import { useEffect, useState } from "react"
import { AppSidebar } from "../../../components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Clock, Search, Bell, Mail, Phone, User, X, Check } from "lucide-react"
import { RouteGuard } from "@/components/route-guard"
import { useToast } from "@/hooks/use-toast"
import { supabase, logActivity } from "@/lib/supabase"
import type { Database } from "@/lib/supabase"

type Usuario = Database["public"]["Tables"]["usuarios"]["Row"]

export default function AdminAprovacaoPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    fetchUsuariosPendentes()
  }, [])

  const fetchUsuariosPendentes = async () => {
    try {
      const { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("status", "pendente")
        .order("created_at", { ascending: false })

      if (error) throw error
      setUsuarios(data || [])
    } catch (error) {
      console.error("Error fetching pending users:", error)
      toast({
        title: "❌ Erro",
        description: "Não foi possível carregar os usuários pendentes.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleApproval = async (userId: string, approved: boolean) => {
    try {
      const { data: currentUser } = await supabase.auth.getUser()
      if (!currentUser.user) {
        toast({
          title: "❌ Erro",
          description: "Você precisa estar logado para aprovar usuários.",
          variant: "destructive",
        })
        return
      }

      const updateData = {
        status: approved ? ("ativo" as const) : ("rejeitado" as const),
        approved_at: new Date().toISOString(),
        approved_by: currentUser.user.id,
        role: approved ? ("membro" as const) : ("visitante" as const),
        updated_at: new Date().toISOString(),
      }

      const { error } = await supabase.from("usuarios").update(updateData).eq("id", userId)

      if (error) throw error

      // Remover da lista local
      setUsuarios((prev) => prev.filter((u) => u.id !== userId))

      // Log da atividade
      await logActivity(approved ? "usuario_aprovado" : "usuario_rejeitado", {
        userId,
        approvedBy: currentUser.user.id,
      })

      toast({
        title: approved ? "✅ Usuário Aprovado" : "❌ Usuário Rejeitado",
        description: approved
          ? "O usuário foi aprovado e pode acessar o sistema."
          : "O usuário foi rejeitado e não poderá acessar o sistema.",
      })

      // TODO: Enviar e-mail de notificação
    } catch (error) {
      console.error("Error updating user status:", error)
      toast({
        title: "❌ Erro",
        description: "Não foi possível atualizar o status do usuário.",
        variant: "destructive",
      })
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const filteredUsuarios = usuarios.filter((user) => {
    if (!searchTerm) return true
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <RouteGuard allowedRoles={["admin"]}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/dashboard">Caminho 4D</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/admin">Administração</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Aprovação de Usuários</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="ml-auto flex items-center gap-2 px-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar usuários..."
                  className="w-[300px] pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Aprovação de Usuários</h1>
                <p className="text-muted-foreground">Gerencie solicitações de cadastro na plataforma</p>
              </div>
              <Badge variant="secondary" className="text-sm">
                {usuarios.length} pendente{usuarios.length !== 1 ? "s" : ""}
              </Badge>
            </div>

            {/* Statistics */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Aguardando Aprovação</CardTitle>
                  <Clock className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{usuarios.length}</div>
                  <p className="text-xs text-muted-foreground">Novos cadastros</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Esta Semana</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {
                      usuarios.filter((u) => {
                        const weekAgo = new Date()
                        weekAgo.setDate(weekAgo.getDate() - 7)
                        return new Date(u.created_at) > weekAgo
                      }).length
                    }
                  </div>
                  <p className="text-xs text-muted-foreground">Novos cadastros</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Coordenadores</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{usuarios.filter((u) => u.role === "coordenador").length}</div>
                  <p className="text-xs text-muted-foreground">Solicitações de liderança</p>
                </CardContent>
              </Card>
            </div>

            {/* Pending Users List */}
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Carregando usuários pendentes...</p>
                </div>
              ) : usuarios.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">Nenhuma aprovação pendente</h3>
                  <p className="text-muted-foreground">
                    Todos os usuários foram processados. Novos cadastros aparecerão aqui.
                  </p>
                </div>
              ) : (
                usuarios.map((usuario) => (
                  <Card key={usuario.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={usuario.avatar_url || "/placeholder.svg?height=32&width=32"} />
                            <AvatarFallback>{getInitials(usuario.name)}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <CardTitle className="text-lg">{usuario.name}</CardTitle>
                              <Badge variant="outline" className="capitalize">
                                {usuario.role}
                              </Badge>
                              <Badge variant="secondary">Pendente</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Mail className="h-4 w-4" />
                                {usuario.email}
                              </div>
                              {usuario.phone && (
                                <div className="flex items-center gap-1">
                                  <Phone className="h-4 w-4" />
                                  {usuario.phone}
                                </div>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Cadastrado em {formatDate(usuario.created_at)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {usuario.bio && (
                        <div>
                          <h4 className="text-sm font-medium mb-1">Mensagem:</h4>
                          <p className="text-sm text-muted-foreground">{usuario.bio}</p>
                        </div>
                      )}

                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleApproval(usuario.id, false)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="mr-2 h-4 w-4" />
                          Rejeitar
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleApproval(usuario.id, true)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Aprovar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </RouteGuard>
  )
}
