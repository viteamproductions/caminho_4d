"use client"

import {
  Loader2,
  Heart,
  Users,
  BarChart3,
  Shield,
  Calendar,
  BookOpen,
  Settings,
  FileText,
  Map,
  UserCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface GlobalLoadingProps {
  type?:
    | "dashboard"
    | "oracoes"
    | "membros"
    | "admin"
    | "relatorios"
    | "grupos"
    | "jornadas"
    | "eventos"
    | "formacao"
    | "configuracoes"
    | "documentos"
    | "usuarios"
  size?: "sm" | "md" | "lg"
  message?: string
  className?: string
}

const loadingConfig = {
  dashboard: {
    icon: BarChart3,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    message: "Carregando dashboard...",
  },
  oracoes: {
    icon: Heart,
    color: "text-red-600",
    bgColor: "bg-red-50",
    message: "Carregando pedidos de oração...",
  },
  membros: {
    icon: Users,
    color: "text-green-600",
    bgColor: "bg-green-50",
    message: "Carregando membros...",
  },
  admin: {
    icon: Shield,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    message: "Carregando painel administrativo...",
  },
  relatorios: {
    icon: BarChart3,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    message: "Gerando relatórios...",
  },
  grupos: {
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    message: "Carregando grupos...",
  },
  jornadas: {
    icon: Map,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    message: "Carregando jornadas...",
  },
  eventos: {
    icon: Calendar,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    message: "Carregando eventos...",
  },
  formacao: {
    icon: BookOpen,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    message: "Carregando formação...",
  },
  configuracoes: {
    icon: Settings,
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    message: "Carregando configurações...",
  },
  documentos: {
    icon: FileText,
    color: "text-slate-600",
    bgColor: "bg-slate-50",
    message: "Carregando documentos...",
  },
  usuarios: {
    icon: UserCheck,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    message: "Carregando usuários...",
  },
}

const sizeConfig = {
  sm: {
    container: "h-32",
    icon: "h-6 w-6",
    text: "text-sm",
  },
  md: {
    container: "h-48",
    icon: "h-8 w-8",
    text: "text-base",
  },
  lg: {
    container: "h-64",
    icon: "h-12 w-12",
    text: "text-lg",
  },
}

export function GlobalLoading({ type = "dashboard", size = "md", message, className }: GlobalLoadingProps) {
  const config = loadingConfig[type]
  const sizeStyles = sizeConfig[size]
  const Icon = config.icon

  return (
    <div className={cn("flex flex-col items-center justify-center", sizeStyles.container, config.bgColor, className)}>
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Icon className={cn(sizeStyles.icon, config.color, "animate-pulse")} />
          {type === "oracoes" && (
            <div className="absolute inset-0 animate-ping">
              <Heart className={cn(sizeStyles.icon, "text-red-300")} />
            </div>
          )}
          {type === "admin" && (
            <div className="absolute inset-0 animate-spin">
              <Shield className={cn(sizeStyles.icon, "text-orange-300")} />
            </div>
          )}
        </div>
        <Loader2 className={cn("h-4 w-4 animate-spin", config.color)} />
      </div>
      <p className={cn("mt-3 font-medium", config.color, sizeStyles.text)}>{message || config.message}</p>
    </div>
  )
}

// Skeleton Components
export function ListSkeleton({ items = 5 }: { items?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
          <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
          </div>
          <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
        </div>
      ))}
    </div>
  )
}

export function CardSkeleton({ items = 6 }: { items?: number }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="border rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
          </div>
          <div className="flex items-center justify-between">
            <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function StatsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
            <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-8 bg-gray-200 rounded animate-pulse w-16 mb-2" />
          <div className="h-3 bg-gray-200 rounded animate-pulse w-32" />
        </div>
      ))}
    </div>
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="border rounded-lg">
      <div className="border-b p-4">
        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="border-b p-4 last:border-b-0">
          <div className="grid grid-cols-5 gap-4 items-center">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
              <div className="space-y-1">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-32" />
              </div>
            </div>
            <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-12 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse ml-auto" />
          </div>
        </div>
      ))}
    </div>
  )
}
