import { GlobalLoading } from "@/components/ui/global-loading"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function AprovacoesLoading() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Aprovações Pendentes</h2>
        <p className="text-muted-foreground">Contas aguardando aprovação</p>
      </div>

      <GlobalLoading type="admin" size="lg" />

      {/* Statistics Skeleton */}
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                <div className="h-4 w-24 rounded-full bg-muted animate-pulse"></div>
                <div className="h-4 w-4 rounded-full bg-muted animate-pulse"></div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-12 mb-2 rounded-full bg-muted animate-pulse"></div>
              <div className="h-3 w-32 rounded-full bg-muted animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Users List Skeleton */}
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 rounded-full bg-muted animate-pulse"></div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-48 rounded-full bg-muted animate-pulse"></div>
                    <div className="h-5 w-16 rounded-full bg-muted animate-pulse"></div>
                    <div className="h-5 w-20 rounded-full bg-muted animate-pulse"></div>
                  </div>
                  <div className="h-4 w-64 rounded-full bg-muted animate-pulse"></div>
                  <div className="h-4 w-40 rounded-full bg-muted animate-pulse"></div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end gap-2">
                <div className="h-8 w-20 rounded-full bg-muted animate-pulse"></div>
                <div className="h-8 w-20 rounded-full bg-muted animate-pulse"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
