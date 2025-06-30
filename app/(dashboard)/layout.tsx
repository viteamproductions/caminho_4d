"use client"

import type React from "react"

import { Suspense } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { GlobalLoading } from "@/components/ui/global-loading"
import { RouteGuard } from "@/components/route-guard"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteGuard allowedRoles={["admin", "coordenador", "membro"]}>
      <SidebarProvider>
        <AppSidebar />
        <Suspense fallback={<GlobalLoading type="dashboard" size="lg" />}>{children}</Suspense>
      </SidebarProvider>
    </RouteGuard>
  )
}
