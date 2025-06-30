import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Cross, ArrowLeft, ChevronDown, HelpCircle, Users, BookOpen, Heart } from "lucide-react"

export const metadata: Metadata = {
  title: "Perguntas Frequentes - Caminho 4D",
  description:
    "Encontre respostas para as principais dúvidas sobre a plataforma Caminho 4D, jornadas espirituais e comunidade católica.",
  keywords: ["faq", "perguntas frequentes", "ajuda", "suporte", "caminho 4d", "dúvidas"],
}

const faqs = [
  {
    category: "Geral",
    icon: HelpCircle,
    questions: [
      {
        question: "O que é o Caminho 4D?",
        answer:
          "O Caminho 4D é uma plataforma católica digital que oferece jornadas espirituais, grupos de partilha, conteúdos de formação e ferramentas para crescimento na fé. As 4 dimensões representam: Oração, Comunidade, Formação e Missão.",
      },
      {
        question: "A plataforma é gratuita?",
        answer:
          "Sim! O Caminho 4D é completamente gratuito. Acreditamos que o crescimento espiritual deve ser acessível a todos. Mantemos a plataforma através de doações voluntárias da comunidade.",
      },
      {
        question: "Preciso ser católico para usar?",
        answer:
          "Embora nossa plataforma seja baseada na doutrina católica, pessoas de todas as denominações cristãs são bem-vindas. Nosso conteúdo segue os ensinamentos da Igreja Católica.",
      },
      {
        question: "Como posso começar?",
        answer:
          "Basta criar uma conta gratuita, completar seu perfil e escolher sua primeira jornada espiritual. Nosso sistema irá recomendar conteúdos adequados ao seu momento de fé.",
      },
    ],
  },
  {
    category: "Jornadas Espirituais",
    icon: BookOpen,
    questions: [
      {
        question: "O que são as jornadas espirituais?",
        answer:
          "São caminhos estruturados de crescimento na fé, com módulos semanais que incluem reflexões, orações, leituras e atividades práticas. Cada jornada tem duração e objetivos específicos.",
      },
      {
        question: "Posso fazer mais de uma jornada ao mesmo tempo?",
        answer:
          "Recomendamos focar em uma jornada por vez para melhor aproveitamento. Porém, você pode participar de jornadas complementares se sentir que consegue acompanhar.",
      },
      {
        question: "E se eu perder uma semana?",
        answer:
          "Não há problema! As jornadas são flexíveis. Você pode retomar de onde parou ou revisar módulos anteriores. O importante é manter a constância no seu ritmo.",
      },
      {
        question: "Recebo certificado ao concluir?",
        answer:
          "Sim! Ao completar uma jornada, você recebe um certificado digital e conquistas que ficam registradas no seu perfil espiritual.",
      },
    ],
  },
  {
    category: "Pequenos Grupos",
    icon: Users,
    questions: [
      {
        question: "Como funcionam os pequenos grupos?",
        answer:
          "São grupos de 8 a 15 pessoas que se reúnem regularmente para partilha, oração e estudo. Cada grupo tem um coordenador experiente e segue um cronograma de encontros.",
      },
      {
        question: "Posso criar meu próprio grupo?",
        answer:
          "Para criar um grupo, você precisa ter o papel de coordenador na plataforma. Entre em contato conosco se tem experiência em liderança de grupos católicos.",
      },
      {
        question: "Os encontros são presenciais ou online?",
        answer:
          "Depende do grupo! Temos grupos presenciais, online e híbridos. Você pode escolher o formato que melhor se adapta à sua rotina.",
      },
      {
        question: "Posso sair de um grupo?",
        answer:
          "Sim, você pode deixar um grupo a qualquer momento através das configurações. Recomendamos conversar com o coordenador antes para um diálogo fraterno.",
      },
    ],
  },
  {
    category: "Pedidos de Oração",
    icon: Heart,
    questions: [
      {
        question: "Como compartilhar um pedido de oração?",
        answer:
          "Acesse a seção 'Pedidos de Oração', clique em 'Novo Pedido' e preencha o formulário. Você pode escolher se quer compartilhar com toda a comunidade ou apenas com seu grupo.",
      },
      {
        question: "Meus pedidos são privados?",
        answer:
          "Você controla a privacidade! Pode compartilhar publicamente, apenas com seu grupo, ou manter privado para acompanhamento pessoal.",
      },
      {
        question: "Como oro pelos outros?",
        answer:
          "Na lista de pedidos, clique em 'Rezarei por você' para registrar sua oração. Isso encoraja quem fez o pedido e fortalece nossa rede de oração.",
      },
      {
        question: "Posso atualizar meu pedido?",
        answer:
          "Sim! Você pode editar, atualizar com novidades ou marcar como respondido. Isso ajuda a comunidade a acompanhar as graças recebidas.",
      },
    ],
  },
]

export default function FAQPage() {
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
          <HelpCircle className="h-16 w-16 text-purple-600 mx-auto mb-4" />
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Perguntas Frequentes</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Encontre respostas para as principais dúvidas sobre o Caminho 4D e nossa comunidade de fé.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-8">
            {faqs.map((category, categoryIndex) => (
              <Card key={categoryIndex}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <category.icon className="h-6 w-6 text-purple-600" />
                    </div>
                    {category.category}
                  </CardTitle>
                  <CardDescription>Dúvidas mais comuns sobre {category.category.toLowerCase()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.questions.map((faq, faqIndex) => (
                      <Collapsible key={faqIndex}>
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                          <span className="font-medium">{faq.question}</span>
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-4 text-gray-600 leading-relaxed">
                          {faq.answer}
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center">
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Não encontrou sua resposta?</h2>
                <p className="text-gray-600 mb-6">
                  Nossa equipe está pronta para ajudar você com qualquer dúvida sobre a plataforma ou sua jornada
                  espiritual.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contato">
                    <Button size="lg">Entrar em Contato</Button>
                  </Link>
                  <a href="https://wa.me/5511999990000" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" variant="outline">
                      WhatsApp
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
