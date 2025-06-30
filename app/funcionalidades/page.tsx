import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Heart, Users, BookOpen, BarChart3, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Funcionalidades - Caminho 4D",
  description:
    "Conheça todas as funcionalidades da plataforma Caminho 4D: jornadas espirituais, grupos de oração, relatórios e muito mais.",
}

const features = [
  {
    icon: Heart,
    title: "Jornada Espiritual Personalizada",
    description:
      "Acompanhe seu crescimento na fé através de jornadas personalizadas baseadas na espiritualidade católica. Reflexões diárias, orações guiadas e marcos de progresso espiritual.",
    image: "/placeholder.svg?height=400&width=600",
    benefits: [
      "Reflexões diárias personalizadas",
      "Marcos de progresso espiritual",
      "Orações guiadas por santos",
      "Acompanhamento de hábitos de fé",
    ],
  },
  {
    icon: Users,
    title: "Pedidos de Oração Comunitários",
    description:
      "Compartilhe suas intenções de oração com a comunidade e ore pelos pedidos de outros fiéis. Sistema em tempo real que fortalece os laços de solidariedade cristã.",
    image: "/placeholder.svg?height=400&width=600",
    benefits: [
      "Pedidos em tempo real",
      "Notificações de novas intenções",
      "Histórico de orações atendidas",
      "Grupos privados de oração",
    ],
  },
  {
    icon: Users,
    title: "Pequenos Grupos de Fé",
    description:
      "Participe de pequenos grupos de estudo bíblico, partilha e oração. Conecte-se com outros católicos da sua região ou participe de grupos temáticos online.",
    image: "/placeholder.svg?height=400&width=600",
    benefits: [
      "Grupos por localização",
      "Salas de estudo bíblico",
      "Encontros virtuais e presenciais",
      "Materiais de formação inclusos",
    ],
  },
  {
    icon: BarChart3,
    title: "Relatórios de Participação",
    description:
      "Para coordenadores e párocos: acompanhe estatísticas detalhadas de participação, engajamento e crescimento da comunidade com dashboards intuitivos.",
    image: "/placeholder.svg?height=400&width=600",
    benefits: [
      "Dashboard em tempo real",
      "Métricas de engajamento",
      "Relatórios personalizáveis",
      "Análise de crescimento",
    ],
  },
  {
    icon: Calendar,
    title: "Eventos e Agenda Paroquial",
    description:
      "Organize e divulgue eventos, retiros, missas especiais e atividades paroquiais. Sistema completo de inscrições e lembretes automáticos.",
    image: "/placeholder.svg?height=400&width=600",
    benefits: ["Calendário integrado", "Inscrições online", "Lembretes automáticos", "Gestão de participantes"],
  },
  {
    icon: BookOpen,
    title: "Biblioteca de Formação Católica",
    description:
      "Acesse uma vasta biblioteca de conteúdos católicos: catequeses, documentos da Igreja, vidas de santos, e materiais de formação espiritual.",
    image: "/placeholder.svg?height=400&width=600",
    benefits: [
      "Documentos oficiais da Igreja",
      "Catequeses interativas",
      "Vidas de santos",
      "Cursos de formação online",
    ],
  },
]

export default function FuncionalidadesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Funcionalidades Completas para sua Comunidade
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Descubra como nossa plataforma pode transformar a experiência espiritual da sua paróquia ou comunidade
            católica.
          </p>
          <Link href="/cadastro">
            <Button size="lg" className="text-lg px-8">
              Experimente Gratuitamente
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`flex flex-col lg:flex-row items-center gap-12 mb-24 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">{feature.title}</h2>
                </div>
                <p className="text-lg text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-600 rounded-full" />
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1">
                <div className="bg-gray-100 rounded-2xl p-8 aspect-video flex items-center justify-center">
                  <img
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    className="max-w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para Transformar sua Comunidade?</h2>
          <p className="text-xl mb-8 opacity-90">
            Comece hoje mesmo e veja como nossa plataforma pode fortalecer os laços de fé da sua comunidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cadastro">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Criar Conta Gratuita
              </Button>
            </Link>
            <Link href="/contato">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
              >
                Falar com Especialista
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
