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
import { Progress } from "@/components/ui/progress"
import { Cross, Clock, Users, Play, CheckCircle, Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"

const journeys = [
  {
    id: 1,
    title: "Caminho da Conversão",
    description: "Uma jornada de 30 dias para aprofundar sua relação com Cristo",
    duration: "30 dias",
    participants: 127,
    progress: 65,
    status: "ativa",
    category: "Conversão",
    startDate: "2024-01-15",
    modules: 8,
    completedModules: 5,
  },
  {
    id: 2,
    title: "Discipulado Missionário",
    description: "Formação para líderes e evangelizadores",
    duration: "45 dias",
    participants: 89,
    progress: 23,
    status: "ativa",
    category: "Liderança",
    startDate: "2024-02-01",
    modules: 12,
    completedModules: 3,
  },
  {
    id: 3,
    title: "Vida de Oração",
    description: "Aprofunde sua vida de oração e contemplação",
    duration: "21 dias",
    participants: 156,
    progress: 100,
    status: "concluída",
    category: "Espiritualidade",
    startDate: "2023-12-01",
    modules: 7,
    completedModules: 7,
  },
  {
    id: 4,
    title: "Família Cristã",
    description: "Fortalecendo os laços familiares na fé",
    duration: "28 dias",
    participants: 78,
    progress: 0,
    status: "disponível",
    category: "Família",
    startDate: null,
    modules: 10,
    completedModules: 0,
  },
]

export default function JornadasPage() {
  const [selectedFilter, setSelectedFilter] = useState("todas")

  const filteredJourneys = journeys.filter((journey) => {
    if (selectedFilter === "todas") return true
    return journey.status === selectedFilter
  })

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
                  <BreadcrumbPage>Jornadas Espirituais</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto flex items-center gap-2 px-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar jornadas..." className="w-[300px] pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Jornadas Espirituais</h1>
              <p className="text-muted-foreground">Acompanhe seu crescimento espiritual através de jornadas guiadas</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Cross className="mr-2 h-4 w-4" />
                  Nova Jornada
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Iniciar Nova Jornada</DialogTitle>
                  <DialogDescription>
                    Escolha uma jornada espiritual para começar seu crescimento na fé.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Esta funcionalidade estará disponível em breve. Entre em contato com seu coordenador para mais
                    informações.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs value={selectedFilter} onValueChange={setSelectedFilter} className="w-full">
            <TabsList>
              <TabsTrigger value="todas">Todas</TabsTrigger>
              <TabsTrigger value="ativa">Ativas</TabsTrigger>
              <TabsTrigger value="concluída">Concluídas</TabsTrigger>
              <TabsTrigger value="disponível">Disponíveis</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedFilter} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredJourneys.map((journey) => (
                  <Card key={journey.id} className="relative overflow-hidden">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{journey.title}</CardTitle>
                          <CardDescription>{journey.description}</CardDescription>
                        </div>
                        <Badge
                          variant={
                            journey.status === "ativa"
                              ? "default"
                              : journey.status === "concluída"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {journey.status === "ativa"
                            ? "Ativa"
                            : journey.status === "concluída"
                              ? "Concluída"
                              : "Disponível"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {journey.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {journey.participants} participantes
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progresso</span>
                          <span>{journey.progress}%</span>
                        </div>
                        <Progress value={journey.progress} className="h-2" />
                        <div className="text-xs text-muted-foreground">
                          {journey.completedModules} de {journey.modules} módulos concluídos
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{journey.category}</Badge>
                        <Button size="sm" variant={journey.status === "disponível" ? "default" : "outline"}>
                          {journey.status === "disponível" ? (
                            <>
                              <Play className="mr-2 h-4 w-4" />
                              Iniciar
                            </>
                          ) : journey.status === "concluída" ? (
                            <>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Revisar
                            </>
                          ) : (
                            "Continuar"
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Journey Statistics */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Jornadas Ativas</CardTitle>
                <Cross className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Progresso médio de 44%</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Jornadas Concluídas</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">100% de conclusão</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Próxima Meta</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">dias para próximo módulo</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
