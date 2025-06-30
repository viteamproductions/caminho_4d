"use client"

import { AppSidebar } from "./components/app-sidebar"
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
import { Users, HandIcon as PrayingHands, BookOpen, Calendar, Heart, Plus, Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function Dashboard() {
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
                  <BreadcrumbLink href="#">Caminho 4D</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Painel Geral</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto flex items-center gap-2 px-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar membros, grupos..." className="w-[300px] pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Painel Geral</h1>
              <p className="text-muted-foreground">
                Bem-vindo de volta, Padre João. Aqui está o resumo da sua comunidade espiritual.
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Jornada
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Membros Ativos</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+12%</span> em relação ao mês passado
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pedidos de Oração</CardTitle>
                <PrayingHands className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-blue-600">23</span> novos esta semana
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pequenos Grupos</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">34</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-purple-600">3</span> grupos novos este mês
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Eventos Próximos</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">Próximos 30 dias</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* Recent Prayer Requests */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Pedidos de Oração Recentes</CardTitle>
                <CardDescription>Últimas solicitações da comunidade que precisam de atenção</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>MS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Maria Santos</p>
                    <p className="text-sm text-muted-foreground">Pedindo oração pela saúde da família</p>
                  </div>
                  <Badge variant="outline">Urgente</Badge>
                </div>

                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>JO</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">João Oliveira</p>
                    <p className="text-sm text-muted-foreground">Gratidão pela nova oportunidade de trabalho</p>
                  </div>
                  <Badge variant="secondary">Gratidão</Badge>
                </div>

                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Ana Costa</p>
                    <p className="text-sm text-muted-foreground">Discernimento vocacional para filha</p>
                  </div>
                  <Badge variant="outline">Discernimento</Badge>
                </div>

                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>RL</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Roberto Lima</p>
                    <p className="text-sm text-muted-foreground">Força para superar vícios</p>
                  </div>
                  <Badge variant="outline">Libertação</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Próximos Eventos</CardTitle>
                <CardDescription>Atividades programadas para a comunidade</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Retiro de Carnaval</p>
                    <p className="text-xs text-muted-foreground">28 de Fevereiro - 3 de Março</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Formação de Líderes</p>
                    <p className="text-xs text-muted-foreground">15 de Março, 19h30</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                    <Heart className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Encontro de Casais</p>
                    <p className="text-xs text-muted-foreground">22 de Março, 20h</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                    <Users className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Reunião de Coordenadores</p>
                    <p className="text-xs text-muted-foreground">29 de Março, 19h</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active Groups Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Pequenos Grupos Ativos</CardTitle>
              <CardDescription>Visão geral dos grupos de partilha e formação</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-center space-x-4 rounded-lg border p-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>CF</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Grupo Caminhada da Fé</p>
                    <p className="text-xs text-muted-foreground">Coordenador: Carlos Ferreira</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">12 membros</Badge>
                      <Badge variant="outline">Ativo</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 rounded-lg border p-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>LM</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Grupo Luz de Maria</p>
                    <p className="text-xs text-muted-foreground">Coordenadora: Lucia Mendes</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">8 membros</Badge>
                      <Badge variant="outline">Ativo</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 rounded-lg border p-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>PS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Grupo Pão da Vida</p>
                    <p className="text-xs text-muted-foreground">Coordenador: Paulo Santos</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">15 membros</Badge>
                      <Badge variant="outline">Ativo</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
