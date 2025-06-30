import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export type UserRole = "admin" | "coordenador" | "membro" | "visitante"

export type Database = {
  public: {
    Tables: {
      usuarios: {
        Row: {
          id: string
          name: string
          email: string
          avatar_url?: string
          role: UserRole
          grupo_id?: string
          phone?: string
          bio?: string
          join_date: string
          status: "ativo" | "inativo"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          avatar_url?: string
          role?: UserRole
          grupo_id?: string
          phone?: string
          bio?: string
          join_date?: string
          status?: "ativo" | "inativo"
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          email?: string
          avatar_url?: string
          role?: UserRole
          grupo_id?: string
          phone?: string
          bio?: string
          status?: "ativo" | "inativo"
          updated_at?: string
        }
      }
      grupos: {
        Row: {
          id: string
          name: string
          description?: string
          leader_id?: string
          max_members: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string
          leader_id?: string
          max_members?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          description?: string
          leader_id?: string
          max_members?: number
          updated_at?: string
        }
      }
      oracoes: {
        Row: {
          id: string
          title: string
          content: string
          category: string
          priority: "Normal" | "Urgente"
          author_id: string
          author_name: string
          grupo_id?: string
          prayer_count: number
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          category: string
          priority?: "Normal" | "Urgente"
          author_id: string
          author_name: string
          grupo_id?: string
          prayer_count?: number
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          content?: string
          category?: string
          priority?: "Normal" | "Urgente"
          prayer_count?: number
          is_public?: boolean
          updated_at?: string
        }
      }
      eventos: {
        Row: {
          id: string
          title: string
          description?: string
          date: string
          time: string
          location: string
          max_participants?: number
          category?: string
          status: string
          organizer_id?: string
          grupo_id?: string
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string
          date: string
          time: string
          location: string
          max_participants?: number
          category?: string
          status?: string
          organizer_id?: string
          grupo_id?: string
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          description?: string
          date?: string
          time?: string
          location?: string
          max_participants?: number
          category?: string
          status?: string
          is_public?: boolean
          updated_at?: string
        }
      }
      logs_atividades: {
        Row: {
          id: string
          user_id?: string
          action: string
          details?: any
          ip_address?: string
          user_agent?: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          action: string
          details?: any
          ip_address?: string
          user_agent?: string
          created_at?: string
        }
        Update: {
          action?: string
          details?: any
        }
      }
    }
  }
}

// Helper function to log activities
export async function logActivity(action: string, details?: any) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    await supabase.from("logs_atividades").insert({
      user_id: user?.id,
      action,
      details,
      created_at: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error logging activity:", error)
  }
}
