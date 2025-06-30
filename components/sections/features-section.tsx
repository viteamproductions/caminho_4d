import { Heart, Users, BookOpen, BarChart3, Calendar } from "lucide-react"

const features = [
  {
    name: "Jornada Espiritual",
    description: "Acompanhe seu crescimento na fé através de jornadas personalizadas e reflexões diárias.",
    icon: Heart,
  },
  {
    name: "Pedidos de Oração",
    description: "Compartilhe intenções e ore pelos membros da sua comunidade em tempo real.",
    icon: Users,
  },
  {
    name: "Pequenos Grupos",
    description: "Participe de grupos de estudo bíblico, oração e partilha com outros fiéis.",
    icon: Users,
  },
  {
    name: "Relatórios de Participação",
    description: "Acompanhe estatísticas de participação e engajamento da sua comunidade.",
    icon: BarChart3,
  },
  {
    name: "Eventos e Agenda",
    description: "Organize e participe de eventos, retiros, missas e atividades paroquiais.",
    icon: Calendar,
  },
  {
    name: "Formação e Conteúdo",
    description: "Acesse biblioteca de conteúdos católicos, catequeses e materiais de formação.",
    icon: BookOpen,
  },
]

export function FeaturesSection() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-purple-600">Funcionalidades</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Tudo que sua comunidade precisa em um só lugar
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Uma plataforma completa desenvolvida especialmente para comunidades católicas, respeitando nossa tradição e
            fortalecendo os laços de fé.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-7xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
