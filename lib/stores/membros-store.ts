import { create } from "zustand"
import { supabase, logActivity } from "../supabase"
import type { Database } from "../supabase"

type Membro = Database["public"]["Tables"]["membros"]["Row"]
type NovoMembro = Database["public"]["Tables"]["membros"]["Insert"]
type UpdateMembro = Database["public"]["Tables"]["membros"]["Update"]

interface MembrosStore {
  membros: Membro[]
  loading: boolean
  error: string | null

  // Actions
  fetchMembros: () => Promise<void>
  addMembro: (membro: NovoMembro) => Promise<void>
  updateMembro: (id: string, membro: UpdateMembro) => Promise<void>
  deleteMembro: (id: string) => Promise<void>
}

export const useMembrosStore = create<MembrosStore>((set, get) => ({
  membros: [],
  loading: false,
  error: null,

  fetchMembros: async () => {
    set({ loading: true, error: null })
    try {
      const { data, error } = await supabase.from("membros").select("*").order("created_at", { ascending: false })

      if (error) throw error
      set({ membros: data || [], loading: false })
    } catch (error) {
      console.error("Error fetching membros:", error)
      set({ error: (error as Error).message, loading: false })
    }
  },

  addMembro: async (novoMembro) => {
    set({ loading: true, error: null })
    try {
      // Garantir que todos os campos obrigatórios estão presentes
      const membroCompleto = {
        ...novoMembro,
        status: novoMembro.status || "ativo",
        join_date: novoMembro.join_date || new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      const { data, error } = await supabase.from("membros").insert([membroCompleto]).select().single()

      if (error) {
        console.error("Supabase error:", error)
        throw error
      }

      const { membros } = get()
      set({ membros: [data, ...membros], loading: false })

      await logActivity("membro_adicionado", { membroId: data.id, nome: data.name })
    } catch (error) {
      console.error("Error adding membro:", error)
      set({ error: (error as Error).message, loading: false })
      throw error
    }
  },

  updateMembro: async (id, updateData) => {
    set({ loading: true, error: null })
    try {
      const { data, error } = await supabase
        .from("membros")
        .update({
          ...updateData,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error

      const { membros } = get()
      set({
        membros: membros.map((m) => (m.id === id ? data : m)),
        loading: false,
      })

      await logActivity("membro_atualizado", { membroId: id })
    } catch (error) {
      console.error("Error updating membro:", error)
      set({ error: (error as Error).message, loading: false })
      throw error
    }
  },

  deleteMembro: async (id) => {
    set({ loading: true, error: null })
    try {
      const { error } = await supabase.from("membros").delete().eq("id", id)

      if (error) throw error

      const { membros } = get()
      set({
        membros: membros.filter((m) => m.id !== id),
        loading: false,
      })

      await logActivity("membro_removido", { membroId: id })
    } catch (error) {
      console.error("Error deleting membro:", error)
      set({ error: (error as Error).message, loading: false })
      throw error
    }
  },
}))
