"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useAuthStore } from "@/lib/stores/auth-store"

export type UserRole = "admin" | "coordenador" | "membro" | null

interface UserProfile {
  id: string
  nome: string
  email: string
  role: UserRole
  status: "ativo" | "pendente" | "inativo"
  created_at: string
}

export function useUserRole() {
  const [role, setRole] = useState<UserRole>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuthStore()

  useEffect(() => {
    async function fetchUserRole() {
      if (!user?.id) {
        setRole(null)
        setProfile(null)
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        console.log("Buscando perfil para usuário:", user.id)

        const { data, error } = await supabase.from("usuarios").select("*").eq("id", user.id).maybeSingle()

        if (error) {
          console.error("Erro ao buscar perfil do usuário:", error)
          setError(error.message)
          // Fallback para perfil básico
          setProfile({
            id: user.id,
            nome: user.email?.split("@")[0] || "Usuário",
            email: user.email || "",
            role: "membro",
            status: "ativo",
            created_at: new Date().toISOString(),
          })
          setRole("membro")
          return
        }

        if (!data) {
          console.log("Usuário não encontrado na tabela usuarios, criando perfil básico")
          // Usuário não existe na tabela, criar perfil básico
          const newProfile: UserProfile = {
            id: user.id,
            nome: user.email?.split("@")[0] || "Usuário",
            email: user.email || "",
            role: "membro",
            status: "pendente",
            created_at: new Date().toISOString(),
          }
          setProfile(newProfile)
          setRole("membro")
          return
        }

        console.log("Perfil encontrado:", data)
        setProfile(data)
        setRole(data.role)
      } catch (err) {
        console.error("Erro inesperado ao buscar perfil:", err)
        setError("Erro inesperado")
        // Fallback seguro
        setProfile({
          id: user.id,
          nome: user.email?.split("@")[0] || "Usuário",
          email: user.email || "",
          role: "membro",
          status: "ativo",
          created_at: new Date().toISOString(),
        })
        setRole("membro")
      } finally {
        setLoading(false)
      }
    }

    fetchUserRole()
  }, [user?.id])

  // Limpar estado quando usuário faz logout
  useEffect(() => {
    if (!user) {
      setRole(null)
      setProfile(null)
      setError(null)
      setLoading(false)
    }
  }, [user])

  return { role, profile, loading, error }
}
