import { UserPlus, Users, BookOpen, Share2 } from "lucide-react"

const steps = [
  {
    name: "Crie sua conta",
    description: "Cadastre-se gratuitamente e configure seu perfil espiritual personalizado.",
    icon: UserPlus,
  },
  {
    name: "Participe de grupos",
    description: "Junte-se a pequenos grupos de oração e comunidades de fé próximas a você.",
    icon: Users,
  },
  {
    name: "Registre sua jornada",
    description: "Acompanhe seu crescimento espiritual através de jornadas guiadas e reflexões.",
    icon: BookOpen,
  },
  {
    name: "Compartilhe orações",
    description: "Faça pedidos de oração e ore pelos membros da sua comunidade.",
    icon: Share2,
  },
]

export function HowItWorksSection() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-purple-600">Como funciona</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Sua jornada espiritual em 4 passos simples
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Desenvolvemos uma experiência intuitiva que respeita a tradição católica enquanto oferece ferramentas
            modernas para o crescimento espiritual.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {steps.map((step, index) => (
              <div key={step.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
                    <step.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <span className="text-purple-600 font-bold mr-2">{index + 1}.</span>
                  {step.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{step.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
