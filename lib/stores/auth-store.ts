import { create } from "zustand"
import { supabase, logActivity } from "../supabase"
import type { User } from "@supabase/supabase-js"

interface AuthStore {
  user: User | null
  loading: boolean
  initialized: boolean

  // Actions
  signIn: (email: string, password: string) => Promise<void>
  signInWithMagicLink: (email: string) => Promise<void>
  signOut: () => Promise<void>
  initialize: () => Promise<void>
  clearUser: () => void
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  loading: true,
  initialized: false,

  clearUser: () => {
    set({ user: null })
  },

  signIn: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      set({ user: data.user })
      await logActivity("user_login", { method: "password" })
    } catch (error) {
      console.error("Sign in error:", error)
      throw error
    }
  },

  signInWithMagicLink: async (email) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      })

      if (error) throw error
      await logActivity("magic_link_sent", { email })
    } catch (error) {
      console.error("Magic link error:", error)
      throw error
    }
  },

  signOut: async () => {
    try {
      await logActivity("user_logout")
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      // Limpar estado completamente
      set({ user: null, loading: false })
    } catch (error) {
      console.error("Sign out error:", error)
      throw error
    }
  },

  initialize: async () => {
    if (get().initialized) return

    set({ loading: true })

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      set({
        user: session?.user || null,
        loading: false,
        initialized: true,
      })

      // Listen for auth changes
      supabase.auth.onAuthStateChange(async (event, session) => {
        console.log("Auth state change:", event, session?.user?.id)

        if (event === "SIGNED_OUT") {
          set({ user: null })
        } else if (event === "SIGNED_IN" && session?.user) {
          set({ user: session.user })
          await logActivity("auth_state_change", { event })
        }
      })
    } catch (error) {
      console.error("Auth initialization error:", error)
      set({ user: null, loading: false, initialized: true })
    }
  },
}))
