import { GlobalLoading } from "@/components/ui/global-loading"

export default function MinhaJornadaLoading() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Minha Jornada</h2>
        <p className="text-muted-foreground">Seu crescimento espiritual</p>
      </div>

      <GlobalLoading type="jornadas" size="lg" />
    </div>
  )
}
