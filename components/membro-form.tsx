"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useMembrosStore } from "@/lib/stores/membros-store"
import { useToast } from "@/hooks/use-toast"
import type { Database } from "@/lib/supabase"
import { Loader2 } from "lucide-react"

type Membro = Database["public"]["Tables"]["membros"]["Row"]

interface MembroFormProps {
  membro?: Membro
  onClose: () => void
}

export function MembroForm({ membro, onClose }: MembroFormProps) {
  const [formData, setFormData] = useState({
    name: membro?.name || "",
    email: membro?.email || "",
    phone: membro?.phone || "",
    role: membro?.role || "Membro",
    status: membro?.status || ("ativo" as const),
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { addMembro, updateMembro } = useMembrosStore()
  const { toast } = useToast()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório"
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório"
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "E-mail inválido"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "❌ Dados inválidos",
        description: "Por favor, corrija os erros no formulário.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const memberData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim() || null,
        role: formData.role,
        status: formData.status,
      }

      if (membro) {
        await updateMembro(membro.id, memberData)
        toast({
          title: "✅ Membro atualizado",
          description: "As informações foram salvas com sucesso.",
        })
      } else {
        await addMembro({
          ...memberData,
          join_date: new Date().toISOString(),
        })
        toast({
          title: "✅ Membro adicionado",
          description: "Novo membro foi cadastrado na comunidade.",
        })
      }
      onClose()
    } catch (error) {
      console.error("Error saving member:", error)
      toast({
        title: "❌ Erro ao salvar",
        description: "Não foi possível salvar as informações. Verifique suas permissões e tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{membro ? "Editar Membro" : "Novo Membro"}</DialogTitle>
        <DialogDescription>
          {membro ? "Atualize as informações do membro." : "Adicione um novo membro à comunidade."}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome Completo *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, name: e.target.value }))
              if (errors.name) {
                setErrors((prev) => ({ ...prev, name: "" }))
              }
            }}
            placeholder="Digite o nome completo"
            disabled={isSubmitting}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-mail *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, email: e.target.value }))
              if (errors.email) {
                setErrors((prev) => ({ ...prev, email: "" }))
              }
            }}
            placeholder="exemplo@email.com"
            disabled={isSubmitting}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
            placeholder="(11) 99999-9999"
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Função</Label>
          <Select
            value={formData.role}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}
            disabled={isSubmitting}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Membro">Membro</SelectItem>
              <SelectItem value="Coordenador">Coordenador</SelectItem>
              <SelectItem value="Coordenadora">Coordenadora</SelectItem>
              <SelectItem value="Vice-Coordenador">Vice-Coordenador</SelectItem>
              <SelectItem value="Vice-Coordenadora">Vice-Coordenadora</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value: "ativo" | "inativo") => setFormData((prev) => ({ ...prev, status: value }))}
            disabled={isSubmitting}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="inativo">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : membro ? (
              "Atualizar"
            ) : (
              "Adicionar"
            )}
          </Button>
        </div>
      </form>
    </DialogContent>
  )
}
