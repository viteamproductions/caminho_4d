import { GlobalLoading } from "@/components/ui/global-loading"

interface PageLoaderProps {
  title?: string
  description?: string
}

export function PageLoader({ title = "Carregando página...", description }: PageLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <GlobalLoading message={title} />
      {description && <p className="text-sm text-muted-foreground text-center max-w-md">{description}</p>}
    </div>
  )
}
