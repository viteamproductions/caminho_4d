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
import { Button } from "@/components/ui/button"
import { BarChart3, Download, TrendingUp, Users, Calendar, Bell, Search, FileText, PieChart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart as RechartsPieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

// Mock data for charts
const journeyCompletionData = [
  { group: "Caminhada da Fé", completed: 8, total: 12 },
  { group: "Luz de Maria", completed: 6, total: 8 },
  { group: "Pão da Vida", completed: 12, total: 15 },
  { group: "Esperança", completed: 4, total: 6 },
]

const eventAttendanceData = [
  { month: "Jan", attendance: 145 },
  { month: "Fev", attendance: 178 },
  { month: "Mar", attendance: 203 },
  { month: "Abr", attendance: 189 },
  { month: "Mai", attendance: 234 },
  { month: "Jun", attendance: 267 },
]

const prayerRequestData = [
  { category: "Saúde", count: 45, color: "#8884d8" },
  { category: "Família", count: 32, color: "#82ca9d" },
  { category: "Trabalho", count: 28, color: "#ffc658" },
  { category: "Discernimento", count: 23, color: "#ff7300" },
  { category: "Gratidão", count: 19, color: "#00ff00" },
  { category: "Libertação", count: 15, color: "#ff0000" },
]

const memberGrowthData = [
  { month: "Jan", members: 1180 },
  { month: "Fev", members: 1205 },
  { month: "Mar", members: 1247 },
  { month: "Abr", members: 1289 },
  { month: "Mai", members: 1324 },
  { month: "Jun", members: 1356 },
]

export default function RelatoriosPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("6meses")
  const { toast } = useToast()

  const handleExport = (format: string) => {
    toast({
      title: `📊 Exportando relatório`,
      description: `O relatório será baixado em formato ${format.toUpperCase()}.`,
    })
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
                  <BreadcrumbPage>Relatórios</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto flex items-center gap-2 px-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar relatórios..." className="w-[300px] pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Relatórios e Insights</h1>
              <p className="text-muted-foreground">Análise de dados e métricas da comunidade</p>
            </div>
            <div className="flex gap-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1mes">Último mês</SelectItem>
                  <SelectItem value="3meses">3 meses</SelectItem>
                  <SelectItem value="6meses">6 meses</SelectItem>
                  <SelectItem value="1ano">1 ano</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => handleExport("pdf")}>
                <Download className="mr-2 h-4 w-4" />
                Exportar PDF
              </Button>
              <Button variant="outline" onClick={() => handleExport("csv")}>
                <FileText className="mr-2 h-4 w-4" />
                Exportar CSV
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Crescimento de Membros</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+176</span> novos membros
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Participação em Eventos</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+5%</span> vs mês anterior
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conclusão de Jornadas</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">65%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-blue-600">30</span> jornadas concluídas
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Engajamento em Orações</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-purple-600">246</span> orações ativas
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Journey Completion Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Conclusão de Jornadas por Grupo</CardTitle>
                <CardDescription>Progresso das jornadas espirituais em cada pequeno grupo</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    completed: {
                      label: "Concluídas",
                      color: "hsl(var(--chart-1))",
                    },
                    total: {
                      label: "Total",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={journeyCompletionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="group" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="completed" fill="var(--color-completed)" name="Concluídas" />
                      <Bar dataKey="total" fill="var(--color-total)" name="Total" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Event Attendance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Participação em Eventos</CardTitle>
                <CardDescription>Evolução da participação em eventos ao longo do tempo</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    attendance: {
                      label: "Participação",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={eventAttendanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="attendance" stroke="var(--color-attendance)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Prayer Requests Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Pedidos de Oração</CardTitle>
                <CardDescription>Categorias mais solicitadas pela comunidade</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    count: {
                      label: "Quantidade",
                      color: "hsl(var(--chart-4))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={prayerRequestData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {prayerRequestData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Member Growth Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Crescimento de Membros</CardTitle>
                <CardDescription>Evolução do número de membros da comunidade</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    members: {
                      label: "Membros",
                      color: "hsl(var(--chart-5))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={memberGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="members" stroke="var(--color-members)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Reports Section */}
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Detalhados</CardTitle>
              <CardDescription>Acesse relatórios específicos para análise aprofundada</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Users className="h-8 w-8 text-blue-600" />
                    <div>
                      <h4 className="font-medium">Relatório de Membros</h4>
                      <p className="text-sm text-muted-foreground">Análise detalhada dos membros</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Baixar
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-8 w-8 text-green-600" />
                    <div>
                      <h4 className="font-medium">Relatório de Eventos</h4>
                      <p className="text-sm text-muted-foreground">Participação e feedback</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Baixar
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <PieChart className="h-8 w-8 text-purple-600" />
                    <div>
                      <h4 className="font-medium">Relatório Financeiro</h4>
                      <p className="text-sm text-muted-foreground">Dízimos e ofertas</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Baixar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
