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
import { Calendar, Clock, MapPin, Users, Plus, Bell, Search, Check, X, CalendarDays } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const events = [
  {
    id: 1,
    title: "Retiro de Carnaval",
    description: "Retiro espiritual durante o período de carnaval para aprofundamento na fé",
    date: "2024-02-28",
    endDate: "2024-03-03",
    time: "18:00",
    location: "Casa de Retiros São Francisco",
    maxParticipants: 50,
    confirmedParticipants: 32,
    category: "Retiro",
    status: "confirmado",
    organizer: "Pe. João Silva",
    userRsvp: "confirmado",
  },
  {
    id: 2,
    title: "Formação de Líderes",
    description: "Encontro mensal para formação e capacitação de líderes comunitários",
    date: "2024-03-15",
    endDate: "2024-03-15",
    time: "19:30",
    location: "Sala de Reuniões - Paróquia",
    maxParticipants: 25,
    confirmedParticipants: 18,
    category: "Formação",
    status: "confirmado",
    organizer: "Diác. Carlos Ferreira",
    userRsvp: "pendente",
  },
  {
    id: 3,
    title: "Encontro de Casais",
    description: "Noite especial para casais da comunidade com reflexão e partilha",
    date: "2024-03-22",
    endDate: "2024-03-22",
    time: "20:00",
    location: "Salão Paroquial",
    maxParticipants: 30,
    confirmedParticipants: 24,
    category: "Encontro",
    status: "confirmado",
    organizer: "Casal Silva",
    userRsvp: "recusado",
  },
  {
    id: 4,
    title: "Reunião de Coordenadores",
    description: "Reunião mensal dos coordenadores de pequenos grupos",
    date: "2024-03-29",
    endDate: "2024-03-29",
    time: "19:00",
    location: "Casa Paroquial",
    maxParticipants: 15,
    confirmedParticipants: 12,
    category: "Reunião",
    status: "confirmado",
    organizer: "Pe. João Silva",
    userRsvp: "confirmado",
  },
  {
    id: 5,
    title: "Via Sacra Comunitária",
    description: "Via Sacra especial com participação de todos os grupos",
    date: "2024-04-05",
    endDate: "2024-04-05",
    time: "15:00",
    location: "Igreja Matriz",
    maxParticipants: 200,
    confirmedParticipants: 89,
    category: "Liturgia",
    status: "confirmado",
    organizer: "Equipe Litúrgica",
    userRsvp: "pendente",
  },
  {
    id: 6,
    title: "Festa Junina Comunitária",
    description: "Festa tradicional junina com toda a comunidade paroquial",
    date: "2024-06-15",
    endDate: "2024-06-15",
    time: "18:00",
    location: "Pátio da Paróquia",
    maxParticipants: 300,
    confirmedParticipants: 45,
    category: "Festa",
    status: "planejamento",
    organizer: "Comissão de Festas",
    userRsvp: "pendente",
  },
]

export default function EventosPage() {
  const [eventList, setEventList] = useState(events)
  const [selectedTab, setSelectedTab] = useState("proximos")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    maxParticipants: "",
    category: "",
  })
  const { toast } = useToast()

  const handleRsvp = (eventId: number, response: "confirmado" | "recusado") => {
    setEventList((prev) =>
      prev.map((event) =>
        event.id === eventId
          ? {
              ...event,
              userRsvp: response,
              confirmedParticipants:
                response === "confirmado" && event.userRsvp !== "confirmado"
                  ? event.confirmedParticipants + 1
                  : response === "recusado" && event.userRsvp === "confirmado"
                    ? event.confirmedParticipants - 1
                    : event.confirmedParticipants,
            }
          : event,
      ),
    )

    toast({
      title: response === "confirmado" ? "✅ Presença confirmada" : "❌ Presença recusada",
      description: `Sua resposta para o evento foi registrada.`,
    })
  }

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.location) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    const newId = Math.max(...eventList.map((e) => e.id)) + 1
    const createdEvent = {
      id: newId,
      title: newEvent.title,
      description: newEvent.description,
      date: newEvent.date,
      endDate: newEvent.date,
      time: newEvent.time,
      location: newEvent.location,
      maxParticipants: Number.parseInt(newEvent.maxParticipants) || 50,
      confirmedParticipants: 0,
      category: newEvent.category,
      status: "planejamento" as const,
      organizer: "Pe. João Silva",
      userRsvp: "pendente" as const,
    }

    setEventList((prev) => [...prev, createdEvent])
    setNewEvent({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      maxParticipants: "",
      category: "",
    })
    setIsDialogOpen(false)

    toast({
      title: "📅 Evento criado",
      description: "O novo evento foi adicionado ao calendário.",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmado":
        return <Badge variant="default">Confirmado</Badge>
      case "planejamento":
        return <Badge variant="secondary">Planejamento</Badge>
      case "cancelado":
        return <Badge variant="destructive">Cancelado</Badge>
      default:
        return <Badge variant="outline">Pendente</Badge>
    }
  }

  const getRsvpButton = (event: any) => {
    if (event.userRsvp === "confirmado") {
      return (
        <div className="flex gap-2">
          <Button size="sm" variant="default" disabled>
            <Check className="mr-2 h-4 w-4" />
            Confirmado
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleRsvp(event.id, "recusado")}>
            <X className="mr-2 h-4 w-4" />
            Cancelar
          </Button>
        </div>
      )
    } else if (event.userRsvp === "recusado") {
      return (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => handleRsvp(event.id, "confirmado")}>
            <Check className="mr-2 h-4 w-4" />
            Confirmar
          </Button>
          <Button size="sm" variant="secondary" disabled>
            <X className="mr-2 h-4 w-4" />
            Recusado
          </Button>
        </div>
      )
    } else {
      return (
        <div className="flex gap-2">
          <Button size="sm" variant="default" onClick={() => handleRsvp(event.id, "confirmado")}>
            <Check className="mr-2 h-4 w-4" />
            Confirmar
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleRsvp(event.id, "recusado")}>
            <X className="mr-2 h-4 w-4" />
            Recusar
          </Button>
        </div>
      )
    }
  }

  const filteredEvents = eventList.filter((event) => {
    const eventDate = new Date(event.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (selectedTab === "proximos") {
      return eventDate >= today
    } else if (selectedTab === "passados") {
      return eventDate < today
    }
    return true
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
                  <BreadcrumbPage>Eventos</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto flex items-center gap-2 px-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar eventos..." className="w-[300px] pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Eventos</h1>
              <p className="text-muted-foreground">Gerencie e participe dos eventos da comunidade</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Criar Evento
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Criar Novo Evento</DialogTitle>
                  <DialogDescription>Adicione um novo evento ao calendário da comunidade.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título do Evento *</Label>
                    <Input
                      id="title"
                      placeholder="Ex: Retiro Espiritual"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent((prev) => ({ ...prev, title: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      placeholder="Descreva o evento..."
                      value={newEvent.description}
                      onChange={(e) => setNewEvent((prev) => ({ ...prev, description: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Data *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent((prev) => ({ ...prev, date: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time">Horário *</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent((prev) => ({ ...prev, time: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Local *</Label>
                    <Input
                      id="location"
                      placeholder="Ex: Salão Paroquial"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent((prev) => ({ ...prev, location: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="maxParticipants">Máx. Participantes</Label>
                      <Input
                        id="maxParticipants"
                        type="number"
                        placeholder="50"
                        value={newEvent.maxParticipants}
                        onChange={(e) => setNewEvent((prev) => ({ ...prev, maxParticipants: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Categoria</Label>
                      <Select
                        value={newEvent.category}
                        onValueChange={(value) => setNewEvent((prev) => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Retiro">Retiro</SelectItem>
                          <SelectItem value="Formação">Formação</SelectItem>
                          <SelectItem value="Encontro">Encontro</SelectItem>
                          <SelectItem value="Reunião">Reunião</SelectItem>
                          <SelectItem value="Liturgia">Liturgia</SelectItem>
                          <SelectItem value="Festa">Festa</SelectItem>
                          <SelectItem value="Outros">Outros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleCreateEvent}>
                      <Calendar className="mr-2 h-4 w-4" />
                      Criar Evento
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Event Statistics */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Próximos Eventos</CardTitle>
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {eventList.filter((e) => new Date(e.date) >= new Date()).length}
                </div>
                <p className="text-xs text-muted-foreground">Programados</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Suas Confirmações</CardTitle>
                <Check className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{eventList.filter((e) => e.userRsvp === "confirmado").length}</div>
                <p className="text-xs text-muted-foreground">Eventos confirmados</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Participantes</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {eventList.reduce((acc, event) => acc + event.confirmedParticipants, 0)}
                </div>
                <p className="text-xs text-muted-foreground">Confirmações totais</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Ocupação</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(
                    (eventList.reduce((acc, event) => acc + event.confirmedParticipants, 0) /
                      eventList.reduce((acc, event) => acc + event.maxParticipants, 0)) *
                      100,
                  )}
                  %
                </div>
                <p className="text-xs text-muted-foreground">Média de ocupação</p>
              </CardContent>
            </Card>
          </div>

          {/* Events List */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList>
              <TabsTrigger value="proximos">Próximos Eventos</TabsTrigger>
              <TabsTrigger value="passados">Eventos Passados</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {filteredEvents.map((event) => (
                  <Card key={event.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                          <CardDescription>{event.description}</CardDescription>
                        </div>
                        {getStatusBadge(event.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(event.date).toLocaleDateString("pt-BR", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{event.time}</span>
                        </div>

                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>

                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>
                            {event.confirmedParticipants}/{event.maxParticipants} participantes
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{event.category}</Badge>
                          <span className="text-xs text-muted-foreground">por {event.organizer}</span>
                        </div>
                        {selectedTab === "proximos" && getRsvpButton(event)}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {filteredEvents.length === 0 && (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">Nenhum evento encontrado</h3>
              <p className="text-muted-foreground">
                {selectedTab === "proximos"
                  ? "Não há eventos programados no momento."
                  : "Não há eventos passados para exibir."}
              </p>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
