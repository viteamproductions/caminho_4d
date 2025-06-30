import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CtaSection() {
  return (
    <div className="bg-purple-600">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Comece sua jornada espiritual hoje mesmo
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-purple-200">
            Junte-se a milhares de católicos que já estão vivendo uma experiência transformadora. Cadastre-se
            gratuitamente e descubra como a tecnologia pode fortalecer sua fé.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/cadastro">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Criar Conta Gratuita
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contato">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
              >
                Falar com Especialista
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
