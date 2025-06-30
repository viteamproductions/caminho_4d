"use client"

import type * as React from "react"
import {
  BookOpen,
  Calendar,
  FileText,
  Heart,
  Home,
  Settings,
  Users,
  BarChart3,
  Cross,
  Shield,
  UserCheck,
  Map,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import { useUserRole } from "@/hooks/use-user-role"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { role, profile } = useUserRole()

  const data = {
    user: {
      name: profile?.nome || "Usuário",
      email: profile?.email || "",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    teams: [
      {
        name: "Caminho 4D",
        logo: Cross,
        plan: "Plataforma Espiritual",
      },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
      },
      {
        title: "Pedidos de Oração",
        url: "/oracoes",
        icon: Heart,
      },
      {
        title: "Membros",
        url: "/membros",
        icon: Users,
      },
      {
        title: "Grupos",
        url: "/grupos",
        icon: Users,
      },
      {
        title: "Jornadas",
        url: "/jornadas",
        icon: Map,
      },
      {
        title: "Eventos",
        url: "/eventos",
        icon: Calendar,
      },
      {
        title: "Formação",
        url: "/formacao",
        icon: BookOpen,
      },
      {
        title: "Relatórios",
        url: "/relatorios",
        icon: BarChart3,
      },
      {
        title: "Documentos",
        url: "/documentos",
        icon: FileText,
      },
      {
        title: "Configurações",
        url: "/configuracoes",
        icon: Settings,
      },
    ],
    projects: [
      {
        name: "Minha Jornada",
        url: "/minha-jornada",
        icon: Map,
      },
    ],
    adminItems: [
      {
        name: "Usuários",
        url: "/admin/usuarios",
        icon: Shield,
      },
      {
        name: "Aprovações",
        url: "/admin/aprovacoes",
        icon: UserCheck,
      },
    ],
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        {(role === "admin" || role === "coordenador") && (
          <NavProjects projects={data.adminItems} title="Administração" />
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
