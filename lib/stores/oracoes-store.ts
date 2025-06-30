"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { supabase } from "@/lib/supabase"

interface OracoesState {
  orandoPedidos: string[]
  loading: boolean
  error: string | null
  toggleOracao: (pedidoId: string, userId: string) => Promise<void>
  loadUserPrayers: (userId: string) => Promise<void>
  clearError: () => void
}

export const useOracoesStore = create<OracoesState>()(
  persist(
    (set, get) => ({
      orandoPedidos: [],
      loading: false,
      error: null,

      clearError: () => set({ error: null }),

      loadUserPrayers: async (userId: string) => {
        try {
          set({ loading: true, error: null })

          const { data, error } = await supabase.from("oracoes_usuario").select("pedido_id").eq("user_id", userId)

          if (error) {
            console.error("Erro ao carregar orações do usuário:", error)
            set({ error: "Erro ao carregar suas orações" })
            return
          }

          const pedidosIds = data?.map((item) => item.pedido_id) || []
          set({ orandoPedidos: pedidosIds })
        } catch (error) {
          console.error("Erro inesperado ao carregar orações:", error)
          set({ error: "Erro inesperado ao carregar orações" })
        } finally {
          set({ loading: false })
        }
      },

      toggleOracao: async (pedidoId: string, userId: string) => {
        const { orandoPedidos } = get()
        const isOrando = orandoPedidos.includes(pedidoId)

        try {
          set({ loading: true, error: null })

          if (isOrando) {
            // Parar de orar
            const { error } = await supabase
              .from("oracoes_usuario")
              .delete()
              .eq("user_id", userId)
              .eq("pedido_id", pedidoId)

            if (error) {
              console.error("Erro ao parar de orar:", error)
              throw error
            }

            set({
              orandoPedidos: orandoPedidos.filter((id) => id !== pedidoId),
            })
          } else {
            // Começar a orar
            const { error } = await supabase.from("oracoes_usuario").insert({
              user_id: userId,
              pedido_id: pedidoId,
            })

            if (error) {
              console.error("Erro ao começar a orar:", error)
              throw error
            }

            set({
              orandoPedidos: [...orandoPedidos, pedidoId],
            })
          }
        } catch (error: any) {
          console.error("Erro ao alternar oração:", error)
          set({
            error: error.message || "Erro ao processar sua oração. Tente novamente.",
          })

          // Reverter estado local em caso de erro
          // Não alteramos o estado para manter consistência
        } finally {
          set({ loading: false })
        }
      },
    }),
    {
      name: "oracoes-storage",
      partialize: (state) => ({
        orandoPedidos: state.orandoPedidos,
      }),
    },
  ),
)
