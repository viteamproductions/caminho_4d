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
import { BookOpen, Play, FileText, Download, Clock, Users, Bell, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formationContent = [
  {
    id: 1,
    title: "Fundamentos da Fé Católica",
    description: "Curso básico sobre os pilares da fé católica e seus ensinamentos fundamentais",
    type: "video",
    category: "Doutrina",
    duration: "45 min",
    level: "Iniciante",
    views: 234,
    thumbnail: "/placeholder.svg?height=200&width=300",
    author: "Pe. João Silva",
    createdAt: "2024-01-10",
    tags: ["Catecismo", "Fé", "Básico"],
  },
  {
    id: 2,
    title: "A Oração do Terço - Guia Completo",
    description: "Aprenda a rezar o terço com devoção e compreenda os mistérios marianos",
    type: "pdf",
    category: "Oração",
    duration: "15 min leitura",
    level: "Iniciante",
    views: 189,
    thumbnail: "/placeholder.svg?height=200&width=300",
    author: "Irmã Maria Aparecida",
    createdAt: "2024-01-08",
    tags: ["Terço", "Maria", "Oração"],
  },
  {
    id: 3,
    title: "Liderança Cristã na Comunidade",
    description: "Como exercer liderança baseada nos ensinamentos de Cristo",
    type: "video",
    category: "Liderança",
    duration: "1h 20min",
    level: "Avançado",
    views: 156,
    thumbnail: "/placeholder.svg?height=200&width=300",
    author: "Diác. Carlos Ferreira",
    createdAt: "2024-01-05",
    tags: ["Liderança", "Comunidade", "Serviço"],
  },
  {
    id: 4,
    title: "História da Igreja Católica",
    description: "Jornada através dos 2000 anos de história da Igreja",
    type: "texto",
    category: "História",
    duration: "30 min leitura",
    level: "Intermediário",
    views: 298,
    thumbnail: "/placeholder.svg?height=200&width=300",
    author: "Prof. Ana Costa",
    createdAt: "2024-01-03",
    tags: ["História", "Igreja", "Tradição"],
  },
  {
    id: 5,
    title: "Evangelização no Mundo Moderno",
    description: "Estratégias e métodos para evangelizar na era digital",
    type: "video",
    category: "Evangelização",
    duration: "55 min",
    level: "Intermediário",
    views: 167,
    thumbnail: "/placeholder.svg?height=200&width=300",
    author: "Pe. Roberto Lima",
    createdAt: "2023-12-28",
    tags: ["Evangelização", "Digital", "Missão"],
  },
  {
    id: 6,
    title: "Sacramentos da Igreja",
    description: "Estudo aprofundado sobre os sete sacramentos católicos",
    type: "pdf",
    category: "Sacramentos",
    duration: "25 min leitura",
    level: "Intermediário",
    views: 203,
    thumbnail: "/placeholder.svg?height=200&width=300",
    author: "Pe. João Silva",
    createdAt: "2023-12-25",
    tags: ["Sacramentos", "Liturgia", "Graça"],
  },
]

export default function FormacaoPage() {
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [selectedType, setSelectedType] = useState("todos")
  const [selectedLevel, setSelectedLevel] = useState("todos")

  const filteredContent = formationContent.filter((content) => {
    if (selectedCategory !== "todos" && content.category !== selectedCategory) return false
    if (selectedType !== "todos" && content.type !== selectedType) return false
    if (selectedLevel !== "todos" && content.level !== selectedLevel) return false
    return true
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="h-4 w-4" />
      case "pdf":
        return <FileText className="h-4 w-4" />
      case "texto":
        return <BookOpen className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "video":
        return "Vídeo"
      case "pdf":
        return "PDF"
      case "texto":
        return "Texto"
      default:
        return "Conteúdo"
    }
  }

  const getActionButton = (type: string) => {
    switch (type) {
      case "video":
        return (
          <Button size="sm">
            <Play className="mr-2 h-4 w-4" />
            Assistir
          </Button>
        )
      case "pdf":
        return (
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Baixar
          </Button>
        )
      case "texto":
        return (
          <Button size="sm">
            <BookOpen className="mr-2 h-4 w-4" />
            Ler
          </Button>
        )
      default:
        return (
          <Button size="sm">
            <BookOpen className="mr-2 h-4 w-4" />
            Acessar
          </Button>
        )
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
                  <BreadcrumbPage>Conteúdo de Formação</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto flex items-center gap-2 px-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar conteúdo..." className="w-[300px] pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Conteúdo de Formação</h1>
              <p className="text-muted-foreground">Biblioteca de recursos espirituais para crescimento na fé</p>
            </div>
          </div>

          {/* Content Statistics */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Conteúdos</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formationContent.length}</div>
                <p className="text-xs text-muted-foreground">Recursos disponíveis</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vídeos</CardTitle>
                <Play className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formationContent.filter((c) => c.type === "video").length}</div>
                <p className="text-xs text-muted-foreground">Conteúdos audiovisuais</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Documentos</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formationContent.filter((c) => c.type === "pdf" || c.type === "texto").length}
                </div>
                <p className="text-xs text-muted-foreground">PDFs e textos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formationContent.reduce((acc, content) => acc + content.views, 0)}
                </div>
                <p className="text-xs text-muted-foreground">Total de acessos</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filtros:</span>
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas Categorias</SelectItem>
                <SelectItem value="Doutrina">Doutrina</SelectItem>
                <SelectItem value="Oração">Oração</SelectItem>
                <SelectItem value="Liderança">Liderança</SelectItem>
                <SelectItem value="História">História</SelectItem>
                <SelectItem value="Evangelização">Evangelização</SelectItem>
                <SelectItem value="Sacramentos">Sacramentos</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos Tipos</SelectItem>
                <SelectItem value="video">Vídeos</SelectItem>
                <SelectItem value="pdf">PDFs</SelectItem>
                <SelectItem value="texto">Textos</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Nível" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos Níveis</SelectItem>
                <SelectItem value="Iniciante">Iniciante</SelectItem>
                <SelectItem value="Intermediário">Intermediário</SelectItem>
                <SelectItem value="Avançado">Avançado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Content Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredContent.map((content) => (
              <Card key={content.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-muted relative">
                  <img
                    src={content.thumbnail || "/placeholder.svg"}
                    alt={content.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {getTypeIcon(content.type)}
                      {getTypeLabel(content.type)}
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge variant="outline">{content.level}</Badge>
                  </div>
                </div>

                <CardHeader>
                  <div className="space-y-1">
                    <CardTitle className="text-lg line-clamp-2">{content.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{content.description}</CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {content.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {content.views} visualizações
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {content.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{content.author}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(content.createdAt).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    {getActionButton(content.type)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredContent.length === 0 && (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">Nenhum conteúdo encontrado</h3>
              <p className="text-muted-foreground">Tente ajustar os filtros para encontrar o conteúdo desejado.</p>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
