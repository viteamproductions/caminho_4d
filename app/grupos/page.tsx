"use client"

import { AppSidebar } from "../../components/app-sidebar"
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Clock, MapPin, UserPlus, UserMinus, ChevronDown, ChevronUp, Bell, Search, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const groups = [
  {
    id: 1,
    name: "Grupo Caminhada da Fé",
    leader: "Carlos Ferreira",
    leaderAvatar: "CF",
    meetingDay: "Terças-feiras",
    meetingTime: "19:30",
    location: "Sala 1 - Paróquia",
    memberCount: 12,
    maxMembers: 15,
    description: "Grupo focado no crescimento espiritual através da partilha e oração",
    status: "ativo",
    members: [
      { name: "Maria Santos", avatar: "MS", role: "membro" },
      { name: "João Silva", avatar: "JS", role: "membro" },
      { name: "Ana Costa", avatar: "AC", role: "vice-coordenadora" },
      { name: "Pedro Lima", avatar: "PL", role: "membro" },
      { name: "Lucia Mendes", avatar: "LM", role: "membro" },
    ],
  },
  {
    id: 2,
    name: "Grupo Luz de Maria",
    leader: "Lucia Mendes",
    leaderAvatar: "LM",
    meetingDay: "Quintas-feiras",
    meetingTime: "20:00",
    location: "Sala 2 - Paróquia",
    memberCount: 8,
    maxMembers: 12,
    description: "Grupo mariano dedicado à oração do terço e devoção à Nossa Senhora",
    status: "ativo",
    members: [
      { name: "Rosa Silva", avatar: "RS", role: "membro" },
      { name: "José Santos", avatar: "JS", role: "membro" },
      { name: "Carmen Oliveira", avatar: "CO", role: "membro" },
      { name: "Antonio Lima", avatar: "AL", role: "membro" },
    ],
  },
  {
    id: 3,
    name: "Grupo Pão da Vida",
    leader: "Paulo Santos",
    leaderAvatar: "PS",
    meetingDay: "Sábados",
    meetingTime: "16:00",
    location: "Casa Paroquial",
    memberCount: 15,
    maxMembers: 15,
    description: "Grupo de jovens adultos focado na evangelização e ação social",
    status: "lotado",
    members: [
      { name: "Marcos Ferreira", avatar: "MF", role: "membro" },
      { name: "Julia Costa", avatar: "JC", role: "vice-coordenadora" },
      { name: "Rafael Lima", avatar: "RL", role: "membro" },
      { name: "Beatriz Santos", avatar: "BS", role: "membro" },
      { name: "Gabriel Oliveira", avatar: "GO", role: "membro" },
    ],
  },
  {
    id: 4,
    name: "Grupo Esperança",
    leader: "Maria Aparecida",
    leaderAvatar: "MA",
    meetingDay: "Domingos",
    meetingTime: "18:00",
    location: "Online",
    memberCount: 6,
    maxMembers: 10,
    description: "Grupo de apoio para pessoas em situação de vulnerabilidade",
    status: "ativo",
    members: [
      { name: "Roberto Silva", avatar: "RS", role: "membro" },
      { name: "Helena Costa", avatar: "HC", role: "membro" },
      { name: "Francisco Lima", avatar: "FL", role: "membro" },
    ],
  },
]

export default function GruposPage() {
  const [expandedGroups, setExpandedGroups] = useState<number[]>([])

  const toggleGroup = (groupId: number) => {
    setExpandedGroups((prev) => (prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]))
  }

  return (
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
                <BreadcrumbItem>
                  <BreadcrumbPage>Pequenos Grupos</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto flex items-center gap-2 px-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar grupos..." className="w-[300px] pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Pequenos Grupos</h1>
              <p className="text-muted-foreground">Gerencie os grupos de partilha e formação da comunidade</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Criar Grupo
            </Button>
          </div>

          {/* Groups Statistics */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Grupos</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{groups.length}</div>
                <p className="text-xs text-muted-foreground">
                  {groups.filter((g) => g.status === "ativo").length} ativos
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Membros</CardTitle>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{groups.reduce((acc, group) => acc + group.memberCount, 0)}</div>
                <p className="text-xs text-muted-foreground">Distribuídos em {groups.length} grupos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vagas Disponíveis</CardTitle>
                <UserMinus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {groups.reduce((acc, group) => acc + (group.maxMembers - group.memberCount), 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Em {groups.filter((g) => g.memberCount < g.maxMembers).length} grupos
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Ocupação</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(
                    (groups.reduce((acc, group) => acc + group.memberCount, 0) /
                      groups.reduce((acc, group) => acc + group.maxMembers, 0)) *
                      100,
                  )}
                  %
                </div>
                <p className="text-xs text-muted-foreground">Média de ocupação</p>
              </CardContent>
            </Card>
          </div>

          {/* Groups List */}
          <div className="space-y-4">
            {groups.map((group) => (
              <Card key={group.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{group.name}</CardTitle>
                        <Badge
                          variant={
                            group.status === "ativo" ? "default" : group.status === "lotado" ? "secondary" : "outline"
                          }
                        >
                          {group.status === "ativo" ? "Ativo" : group.status === "lotado" ? "Lotado" : "Inativo"}
                        </Badge>
                      </div>
                      <CardDescription>{group.description}</CardDescription>
                    </div>
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => toggleGroup(group.id)}>
                          {expandedGroups.includes(group.id) ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                    </Collapsible>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>{group.leaderAvatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{group.leader}</p>
                        <p className="text-xs text-muted-foreground">Coordenador</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <div>
                        <p>{group.meetingDay}</p>
                        <p>{group.meetingTime}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <p>{group.location}</p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <p>
                        {group.memberCount}/{group.maxMembers} membros
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" disabled={group.status === "lotado"}>
                      <UserPlus className="mr-2 h-4 w-4" />
                      {group.status === "lotado" ? "Grupo Lotado" : "Participar"}
                    </Button>
                    <Button size="sm" variant="outline">
                      Detalhes
                    </Button>
                  </div>

                  <Collapsible open={expandedGroups.includes(group.id)}>
                    <CollapsibleContent className="space-y-2">
                      <Separator />
                      <div>
                        <h4 className="text-sm font-medium mb-2">Membros do Grupo</h4>
                        <div className="grid gap-2 md:grid-cols-2">
                          {group.members.map((member, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src="/placeholder.svg?height=24&width=24" />
                                <AvatarFallback className="text-xs">{member.avatar}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{member.name}</span>
                              {member.role === "vice-coordenadora" && (
                                <Badge variant="outline" className="text-xs">
                                  Vice
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
