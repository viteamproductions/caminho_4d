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
import { Progress } from "@/components/ui/progress"
import {
  Trophy,
  Star,
  Calendar,
  Users,
  BookOpen,
  Heart,
  Award,
  Bell,
  Search,
  ChevronRight,
  CheckCircle,
} from "lucide-react"
import { Input } from "@/components/ui/input"

const userProfile = {
  name: "Padre João Silva",
  email: "padre.joao@caminho4d.org",
  avatar: "PJ",
  role: "Coordenador Geral",
  joinDate: "2022-03-15",
  currentGroup: "Grupo Caminhada da Fé",
  activeJourneys: 2,
  completedJourneys: 5,
  totalPoints: 2450,
  level: "Mestre Espiritual",
}

const achievements = [
  {
    id: 1,
    title: "Primeiro Passo",
    description: "Completou sua primeira jornada espiritual",
    icon: "🎯",
    earned: true,
    earnedDate: "2022-04-20",
  },
  {
    id: 2,
    title: "Líder Nato",
    description: "Coordenou um pequeno grupo por 6 meses",
    icon: "👑",
    earned: true,
    earnedDate: "2022-09-15",
  },
  {
    id: 3,
    title: "Coração Orante",
    description: "Orou por 100 pedidos da comunidade",
    icon: "🙏",
    earned: true,
    earnedDate: "2023-01-10",
  },
  {
    id: 4,
    title: "Evangelizador",
    description: "Trouxe 5 novos membros para a comunidade",
    icon: "✨",
    earned: true,
    earnedDate: "2023-06-30",
  },
  {
    id: 5,
    title: "Mestre da Fé",
    description: "Completou 5 jornadas espirituais",
    icon: "🏆",
    earned: true,
    earnedDate: "2024-01-15",
  },
  {
    id: 6,
    title: "Servidor Fiel",
    description: "Participou de 20 eventos comunitários",
    icon: "⭐",
    earned: false,
    progress: 85,
  },
]

const currentJourneys = [
  {
    id: 1,
    title: "Discipulado Missionário",
    progress: 65,
    totalModules: 12,
    completedModules: 8,
    nextModule: "Evangelização no Mundo Digital",
    dueDate: "2024-04-15",
  },
  {
    id: 2,
    title: "Liderança Cristã",
    progress: 23,
    totalModules: 10,
    completedModules: 2,
    nextModule: "Características de um Líder Servo",
    dueDate: "2024-04-20",
  },
]

const recentActivities = [
  {
    id: 1,
    type: "journey",
    title: "Completou módulo: Oração Contemplativa",
    date: "2024-03-20",
    points: 50,
  },
  {
    id: 2,
    type: "prayer",
    title: "Orou por Maria Santos",
    date: "2024-03-19",
    points: 10,
  },
  {
    id: 3,
    type: "event",
    title: "Participou do Retiro de Carnaval",
    date: "2024-03-01",
    points: 100,
  },
  {
    id: 4,
    type: "achievement",
    title: "Conquistou: Mestre da Fé",
    date: "2024-01-15",
    points: 200,
  },
]

const suggestedActions = [
  {
    id: 1,
    title: "Continue sua jornada",
    description: "Próximo módulo: Evangelização no Mundo Digital",
    action: "Continuar",
    priority: "high",
  },
  {
    id: 2,
    title: "Participe do próximo evento",
    description: "Formação de Líderes - 15 de Março",
    action: "Confirmar Presença",
    priority: "medium",
  },
  {
    id: 3,
    title: "Ore pela comunidade",
    description: "5 novos pedidos de oração aguardam",
    action: "Ver Pedidos",
    priority: "medium",
  },
  {
    id: 4,
    title: "Complete seu perfil",
    description: "Adicione uma foto e biografia",
    action: "Editar Perfil",
    priority: "low",
  },
]

export default function MinhaJornadaPage() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "journey":
        return <BookOpen className="h-4 w-4 text-blue-600" />
      case "prayer":
        return <Heart className="h-4 w-4 text-red-600" />
      case "event":
        return <Calendar className="h-4 w-4 text-green-600" />
      case "achievement":
        return <Trophy className="h-4 w-4 text-yellow-600" />
      default:
        return <Star className="h-4 w-4 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-200 bg-red-50"
      case "medium":
        return "border-yellow-200 bg-yellow-50"
      case "low":
        return "border-blue-200 bg-blue-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
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
                  <BreadcrumbPage>Minha Jornada</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto flex items-center gap-2 px-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar atividades..." className="w-[300px] pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Minha Jornada Espiritual</h1>
              <p className="text-muted-foreground">Acompanhe seu crescimento e progresso na fé</p>
            </div>
          </div>

          {/* User Profile Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback className="text-lg bg-purple-100 text-purple-600">
                    {userProfile.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{userProfile.name}</h2>
                  <p className="text-muted-foreground">{userProfile.role}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant="secondary">{userProfile.level}</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {userProfile.currentGroup}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Membro desde {new Date(userProfile.joinDate).toLocaleDateString("pt-BR")}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-purple-600">{userProfile.totalPoints}</div>
                  <p className="text-sm text-muted-foreground">Pontos Espirituais</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Overview */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Jornadas Ativas</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userProfile.activeJourneys}</div>
                <p className="text-xs text-muted-foreground">Em andamento</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Jornadas Concluídas</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userProfile.completedJourneys}</div>
                <p className="text-xs text-muted-foreground">Finalizadas com sucesso</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conquistas</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{achievements.filter((a) => a.earned).length}</div>
                <p className="text-xs text-muted-foreground">de {achievements.length} disponíveis</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Nível Atual</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">{userProfile.level}</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Current Journeys */}
            <Card>
              <CardHeader>
                <CardTitle>Jornadas em Andamento</CardTitle>
                <CardDescription>Continue seu crescimento espiritual</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentJourneys.map((journey) => (
                  <div key={journey.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{journey.title}</h4>
                      <Badge variant="outline">{journey.progress}%</Badge>
                    </div>
                    <Progress value={journey.progress} className="h-2" />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>
                        {journey.completedModules} de {journey.totalModules} módulos
                      </span>
                      <span>Prazo: {new Date(journey.dueDate).toLocaleDateString("pt-BR")}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Próximo:</p>
                        <p className="text-sm text-muted-foreground">{journey.nextModule}</p>
                      </div>
                      <Button size="sm">
                        Continuar
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Conquistas</CardTitle>
                <CardDescription>Suas medalhas e marcos espirituais</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        achievement.earned ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        {achievement.earned ? (
                          <p className="text-xs text-green-600">
                            Conquistado em {new Date(achievement.earnedDate!).toLocaleDateString("pt-BR")}
                          </p>
                        ) : (
                          <div className="mt-1">
                            <Progress value={achievement.progress || 0} className="h-1" />
                            <p className="text-xs text-muted-foreground mt-1">{achievement.progress || 0}% concluído</p>
                          </div>
                        )}
                      </div>
                      {achievement.earned && <Award className="h-5 w-5 text-green-600" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Atividades Recentes</CardTitle>
                <CardDescription>Seu histórico de participação</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-3">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(activity.date).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      <Badge variant="secondary">+{activity.points} pts</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Suggested Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Próximos Passos</CardTitle>
                <CardDescription>Ações recomendadas para seu crescimento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {suggestedActions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className={`p-3 rounded-lg border ${getPriorityColor(suggestion.priority)}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium">{suggestion.title}</h4>
                          <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          {suggestion.action}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
