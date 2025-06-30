import type React from "react"
import { useUserRole, type UserRole } from "@/hooks/use-user-role"

interface IfRoleProps {
  allowed: UserRole[]
  children: React.ReactNode
  fallback?: React.ReactNode
  showMessage?: boolean
}

export function IfRole({ allowed, children, fallback, showMessage = false }: IfRoleProps) {
  const { hasRole, loading, profile } = useUserRole()

  if (loading) {
    return null // ou um skeleton
  }

  if (!hasRole(allowed)) {
    if (showMessage && profile) {
      return (
        <div className="text-center py-4 text-muted-foreground">
          <p>Esta funcionalidade está disponível apenas para: {allowed.join(", ")}</p>
          <p className="text-sm">Você está logado como: {profile.role}</p>
        </div>
      )
    }
    return fallback || null
  }

  return <>{children}</>
}
