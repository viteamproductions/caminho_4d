"use client"

import { useEffect, useState } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, UserPlus, Search, Bell, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useMembrosStore } from "@/lib/stores/membros-store"
import { MembroForm } from "@/components/membro-form"
import { useToast } from "@/hooks/use-toast"
import { RouteGuard } from "@/components/route-guard"
import type { Database } from "@/lib/supabase"

type Membro = Database["public"]["Tables"]["membros"]["Row"]

export default function MembrosPage() {
  const { membros, loading, fetchMembros, deleteMembro } = useMembrosStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMembro, setSelectedMembro] = useState<Membro | undefined>()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchMembros()
  }, [fetchMembros])

  const handleEdit = (membro: Membro) => {
    setSelectedMembro(membro)
    setIsDialogOpen(true)
  }

  const handleDelete = async (membroId: string) => {
    if (confirm("Tem certeza que deseja remover este membro?")) {
      try {
        await deleteMembro(membroId)
        toast({
          title: "✅ Membro removido",
          description: "O membro foi removido da comunidade.",
        })
      } catch (error) {
        toast({
          title: "❌ Erro",
          description: "Não foi possível remover o membro.",
          variant: "destructive",
        })
      }
    }
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedMembro(undefined)
  }

  const filteredMembros = membros.filter((membro) => {
    if (!searchTerm) return true
    return (
      membro.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      membro.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      membro.role.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <RouteGuard allowedRoles={["admin", "coordenador"]}>
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
                <BreadcrumbItem>
                  <BreadcrumbPage>Membros</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto flex items-center gap-2 px-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar membros..."
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
              <h1 className="text-2xl font-bold tracking-tight">Membros da Comunidade</h1>
              <p className="text-muted-foreground">Gerencie os membros e suas informações</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setSelectedMembro(undefined)}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Adicionar Membro
                </Button>
              </DialogTrigger>
              <MembroForm membro={selectedMembro} onClose={handleCloseDialog} />
            </Dialog>
          </div>

          {/* Statistics */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Membros</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{loading ? "..." : membros.length}</div>
                <p className="text-xs text-muted-foreground">Na comunidade</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Membros Ativos</CardTitle>
                <Users className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? "..." : membros.filter((m) => m.status === "ativo").length}
                </div>
                <p className="text-xs text-muted-foreground">Status ativo</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Coordenadores</CardTitle>
                <Users className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? "..." : membros.filter((m) => m.role.toLowerCase().includes("coordenador")).length}
                </div>
                <p className="text-xs text-muted-foreground">Líderes</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Novos Este Mês</CardTitle>
                <UserPlus className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading
                    ? "..."
                    : membros.filter((m) => {
                        const monthAgo = new Date()
                        monthAgo.setMonth(monthAgo.getMonth() - 1)
                        return new Date(m.join_date) > monthAgo
                      }).length}
                </div>
                <p className="text-xs text-muted-foreground">Últimos 30 dias</p>
              </CardContent>
            </Card>
          </div>

          {/* Members Table */}
          <Card>
            <CardHeader>
              <CardTitle>Lista de Membros</CardTitle>
              <CardDescription>Todos os membros cadastrados na comunidade</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Carregando membros...</p>
                </div>
              ) : filteredMembros.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">
                    {searchTerm ? "Nenhum membro encontrado" : "Nenhum membro cadastrado"}
                  </h3>
                  <p className="text-muted-foreground">
                    {searchTerm
                      ? "Tente buscar com outros termos."
                      : "Comece adicionando o primeiro membro da comunidade."}
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Membro</TableHead>
                      <TableHead>Função</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data de Ingresso</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMembros.map((membro) => (
                      <TableRow key={membro.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={membro.avatar || "/placeholder.svg?height=32&width=32"} />
                              <AvatarFallback>{getInitials(membro.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{membro.name}</p>
                              <p className="text-sm text-muted-foreground">{membro.email}</p>
                              {membro.phone && <p className="text-sm text-muted-foreground">{membro.phone}</p>}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{membro.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={membro.status === "ativo" ? "default" : "secondary"}>{membro.status}</Badge>
                        </TableCell>
                        <TableCell>{new Date(membro.join_date).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEdit(membro)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDelete(membro.id)} className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Remover
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </RouteGuard>
  )
}
