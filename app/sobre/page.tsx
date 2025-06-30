import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cross, Users, Heart, BookOpen, ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Sobre o Caminho 4D - Plataforma Católica de Crescimento Espiritual",
  description:
    "Conheça a história e missão do Caminho 4D, plataforma católica dedicada ao crescimento espiritual e fortalecimento da comunidade de fé.",
  keywords: [
    "sobre caminho 4d",
    "plataforma católica",
    "crescimento espiritual",
    "comunidade católica",
    "evangelização digital",
  ],
}

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/landing" className="flex items-center gap-2">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-purple-600 text-white">
                <Cross className="size-4" />
              </div>
              <span className="text-xl font-bold text-gray-900">Caminho 4D</span>
            </Link>
            <Link href="/landing">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Sobre o Caminho 4D</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Uma plataforma católica inovadora que une tecnologia e espiritualidade para transformar vidas e fortalecer
            comunidades de fé ao redor do mundo.
          </p>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Nossa História</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  O Caminho 4D nasceu da necessidade de criar uma ponte entre a tradição católica milenar e as
                  possibilidades oferecidas pela tecnologia moderna. Em 2023, um grupo de católicos comprometidos com a
                  evangelização percebeu que era possível usar ferramentas digitais para aprofundar a fé e fortalecer os
                  laços comunitários.
                </p>
                <p>
                  Inspirados pelos ensinamentos do Papa Francisco sobre a importância da evangelização digital e pela
                  rica tradição dos movimentos católicos como o MCC (Movimento de Cursilhos de Cristandade), decidimos
                  criar uma plataforma que pudesse acompanhar os fiéis em sua jornada espiritual de forma personalizada
                  e comunitária.
                </p>
                <p>
                  O nome "4D" representa as quatro dimensões fundamentais da vida cristã que nossa plataforma busca
                  desenvolver: <strong>Oração</strong>, <strong>Comunidade</strong>, <strong>Formação</strong> e{" "}
                  <strong>Missão</strong>.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-purple-100 rounded-2xl p-8 text-center">
                <Cross className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Nossa Missão</h3>
                <p className="text-gray-600">
                  Facilitar o crescimento espiritual através de uma plataforma digital que promove a oração, a
                  comunidade, a formação e a missão evangelizadora.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* As 4 Dimensões */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">As 4 Dimensões da Vida Cristã</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nossa plataforma foi desenvolvida para nutrir cada aspecto essencial da vida católica.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>1ª Dimensão: Oração</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Cultive uma vida de oração profunda através de jornadas espirituais, pedidos comunitários e momentos
                  de contemplação guiada.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>2ª Dimensão: Comunidade</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Participe de pequenos grupos, eventos e encontros que fortalecem os laços fraternos e o senso de
                  pertencimento à Igreja.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>3ª Dimensão: Formação</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Acesse conteúdos de qualidade sobre doutrina católica, espiritualidade e vida cristã para crescer no
                  conhecimento da fé.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Cross className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle>4ª Dimensão: Missão</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Descubra sua vocação e participe ativamente da evangelização, levando Cristo ao mundo através de ações
                  concretas.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nossos Valores */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossos Valores</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Princípios que norteiam nosso trabalho e nossa missão evangelizadora.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 text-purple-600">Fidelidade à Igreja</h3>
              <p className="text-gray-600">
                Seguimos fielmente os ensinamentos do Magistério da Igreja Católica e promovemos a unidade em torno do
                Papa e dos bispos.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 text-purple-600">Inovação Responsável</h3>
              <p className="text-gray-600">
                Utilizamos a tecnologia como ferramenta de evangelização, sempre respeitando a dignidade humana e os
                valores cristãos.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 text-purple-600">Comunidade Acolhedora</h3>
              <p className="text-gray-600">
                Criamos um ambiente seguro e acolhedor onde todos podem crescer na fé, independentemente de onde estão
                em sua jornada espiritual.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Faça Parte da Nossa Comunidade</h2>
          <p className="text-xl mb-8 opacity-90">
            Junte-se a milhares de católicos que já estão vivendo uma experiência transformadora no Caminho 4D.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cadastro">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Criar Conta Gratuita
              </Button>
            </Link>
            <Link href="/landing">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
              >
                Conhecer Funcionalidades
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
