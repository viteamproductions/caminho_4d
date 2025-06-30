"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUserRole, type UserRole } from "@/hooks/use-user-role"
import { useAuthStore } from "@/lib/stores/auth-store"
import { Skeleton } from "@/components/ui/skeleton"

interface RouteGuardProps {
  allowedRoles: UserRole[]
  children: React.ReactNode
  redirectTo?: string
}

export function RouteGuard({ allowedRoles, children, redirectTo = "/dashboard" }: RouteGuardProps) {
  const { user, loading: authLoading } = useAuthStore()
  const { hasRole, loading: profileLoading, profile } = useUserRole()
  const router = useRouter()

  useEffect(() => {
    if (authLoading || profileLoading) return

    if (!user) {
      router.push("/login")
      return
    }

    if (!hasRole(allowedRoles)) {
      router.push(redirectTo)
      return
    }
  }, [user, hasRole, allowedRoles, router, authLoading, profileLoading, redirectTo])

  if (authLoading || profileLoading) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="space-y-4">
          <Skeleton className="h-8 w-[200px]" />
          <div className="grid gap-4 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-[120px]" />
            ))}
          </div>
          <Skeleton className="h-[400px]" />
        </div>
      </div>
    )
  }

  if (!user || !hasRole(allowedRoles)) {
    return null
  }

  return <>{children}</>
}
