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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Search, Upload, Save, Moon, Sun, Palette, User, Church, Shield } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function ConfiguracoesPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    prayer: true,
    events: true,
    groups: false,
  })
  const [personalInfo, setPersonalInfo] = useState({
    name: "Padre João Silva",
    email: "padre.joao@caminho4d.org",
    phone: "(11) 99999-0000",
    bio: "Coordenador Geral da Comunidade Caminho 4D, dedicado ao crescimento espiritual e formação de líderes.",
  })
  const [parishInfo, setParishInfo] = useState({
    name: "Paróquia São Francisco de Assis",
    address: "Rua das Flores, 123 - Centro",
    city: "São Paulo",
    state: "SP",
    cep: "01234-567",
    phone: "(11) 3333-4444",
    website: "www.paroquiasaofrancisco.org.br",
  })

  const { toast } = useToast()

  const handleSave = (section: string) => {
    toast({
      title: "✅ Configurações salvas",
      description: `As configurações de ${section} foram atualizadas com sucesso.`,
    })
  }

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode)
    // Here you would implement actual theme switching logic
    toast({
      title: isDarkMode ? "☀️ Tema claro ativado" : "🌙 Tema escuro ativado",
      description: "O tema da interface foi alterado.",
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
                  <BreadcrumbPage>Configurações</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto flex items-center gap-2 px-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar configurações..." className="w-[300px] pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
              <p className="text-muted-foreground">Gerencie suas preferências e configurações da plataforma</p>
            </div>
          </div>

          <Tabs defaultValue="pessoal" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="pessoal">Pessoal</TabsTrigger>
              <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
              <TabsTrigger value="aparencia">Aparência</TabsTrigger>
              <TabsTrigger value="paroquia">Paróquia</TabsTrigger>
              <TabsTrigger value="seguranca">Segurança</TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="pessoal" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Informações Pessoais
                  </CardTitle>
                  <CardDescription>Atualize suas informações pessoais e foto de perfil</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="/placeholder.svg?height=80&width=80" />
                      <AvatarFallback className="text-lg">PJ</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <Button variant="outline">
                        <Upload className="mr-2 h-4 w-4" />
                        Alterar Foto
                      </Button>
                      <p className="text-sm text-muted-foreground">JPG, PNG ou GIF. Máximo 2MB.</p>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        value={personalInfo.name}
                        onChange={(e) => setPersonalInfo((prev) => ({ ...prev, name: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) => setPersonalInfo((prev) => ({ ...prev, email: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        value={personalInfo.phone}
                        onChange={(e) => setPersonalInfo((prev) => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Biografia</Label>
                    <Textarea
                      id="bio"
                      rows={4}
                      value={personalInfo.bio}
                      onChange={(e) => setPersonalInfo((prev) => ({ ...prev, bio: e.target.value }))}
                    />
                  </div>

                  <Button onClick={() => handleSave("informações pessoais")}>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Alterações
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notificacoes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Preferências de Notificação
                  </CardTitle>
                  <CardDescription>Configure como e quando você deseja receber notificações</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Notificações por E-mail</Label>
                        <p className="text-sm text-muted-foreground">Receba atualizações importantes por e-mail</p>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Notificações Push</Label>
                        <p className="text-sm text-muted-foreground">Receba notificações no navegador</p>
                      </div>
                      <Switch
                        checked={notifications.push}
                        onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, push: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Pedidos de Oração</Label>
                        <p className="text-sm text-muted-foreground">Notificações sobre novos pedidos de oração</p>
                      </div>
                      <Switch
                        checked={notifications.prayer}
                        onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, prayer: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Eventos</Label>
                        <p className="text-sm text-muted-foreground">Lembretes sobre eventos próximos</p>
                      </div>
                      <Switch
                        checked={notifications.events}
                        onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, events: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Atividades dos Grupos</Label>
                        <p className="text-sm text-muted-foreground">Atualizações sobre pequenos grupos</p>
                      </div>
                      <Switch
                        checked={notifications.groups}
                        onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, groups: checked }))}
                      />
                    </div>
                  </div>

                  <Button onClick={() => handleSave("notificações")}>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Preferências
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appearance Tab */}
            <TabsContent value="aparencia" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Aparência e Tema
                  </CardTitle>
                  <CardDescription>Personalize a aparência da plataforma</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Tema Escuro</Label>
                        <p className="text-sm text-muted-foreground">
                          Ative o modo escuro para reduzir o cansaço visual
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4" />
                        <Switch checked={isDarkMode} onCheckedChange={handleThemeToggle} />
                        <Moon className="h-4 w-4" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Cor Principal</Label>
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-full bg-purple-600 border-2 border-purple-600 cursor-pointer"></div>
                        <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-transparent cursor-pointer"></div>
                        <div className="w-8 h-8 rounded-full bg-green-600 border-2 border-transparent cursor-pointer"></div>
                        <div className="w-8 h-8 rounded-full bg-red-600 border-2 border-transparent cursor-pointer"></div>
                        <div className="w-8 h-8 rounded-full bg-orange-600 border-2 border-transparent cursor-pointer"></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fontSize">Tamanho da Fonte</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger className="w-[200px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Pequena</SelectItem>
                          <SelectItem value="medium">Média</SelectItem>
                          <SelectItem value="large">Grande</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button onClick={() => handleSave("aparência")}>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Configurações
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Parish Information Tab */}
            <TabsContent value="paroquia" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Church className="h-5 w-5" />
                    Informações da Paróquia
                  </CardTitle>
                  <CardDescription>Configure as informações da sua paróquia ou diocese</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="parishName">Nome da Paróquia</Label>
                      <Input
                        id="parishName"
                        value={parishInfo.name}
                        onChange={(e) => setParishInfo((prev) => ({ ...prev, name: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="parishPhone">Telefone</Label>
                      <Input
                        id="parishPhone"
                        value={parishInfo.phone}
                        onChange={(e) => setParishInfo((prev) => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Endereço</Label>
                      <Input
                        id="address"
                        value={parishInfo.address}
                        onChange={(e) => setParishInfo((prev) => ({ ...prev, address: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade</Label>
                      <Input
                        id="city"
                        value={parishInfo.city}
                        onChange={(e) => setParishInfo((prev) => ({ ...prev, city: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">Estado</Label>
                      <Input
                        id="state"
                        value={parishInfo.state}
                        onChange={(e) => setParishInfo((prev) => ({ ...prev, state: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cep">CEP</Label>
                      <Input
                        id="cep"
                        value={parishInfo.cep}
                        onChange={(e) => setParishInfo((prev) => ({ ...prev, cep: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={parishInfo.website}
                        onChange={(e) => setParishInfo((prev) => ({ ...prev, website: e.target.value }))}
                      />
                    </div>
                  </div>

                  <Button onClick={() => handleSave("paróquia")}>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Informações
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="seguranca" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Segurança da Conta
                  </CardTitle>
                  <CardDescription>Gerencie a segurança e privacidade da sua conta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Senha Atual</Label>
                      <Input id="currentPassword" type="password" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nova Senha</Label>
                      <Input id="newPassword" type="password" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>

                    <Button variant="outline">Alterar Senha</Button>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Autenticação de Dois Fatores</h4>
                    <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança à sua conta</p>
                    <Button variant="outline">Configurar 2FA</Button>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Sessões Ativas</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Navegador Atual</p>
                          <p className="text-sm text-muted-foreground">Chrome - São Paulo, SP</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Encerrar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
