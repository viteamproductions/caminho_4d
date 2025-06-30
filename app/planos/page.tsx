import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, Star } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Planos e Preços - Caminho 4D",
  description:
    "Escolha o plano ideal para sua comunidade católica. Planos gratuitos e pagos com funcionalidades completas.",
}

const plans = [
  {
    name: "Gratuito",
    price: "R$ 0",
    period: "/mês",
    description: "Perfeito para começar sua jornada espiritual",
    features: [
      { name: "Até 50 membros", included: true },
      { name: "Jornadas espirituais básicas", included: true },
      { name: "Pedidos de oração", included: true },
      { name: "1 pequeno grupo", included: true },
      { name: "Suporte por email", included: true },
      { name: "Relatórios básicos", included: false },
      { name: "Eventos ilimitados", included: false },
      { name: "Biblioteca completa", included: false },
      { name: "Suporte prioritário", included: false },
      { name: "Personalização avançada", included: false },
    ],
    cta: "Começar Gratuitamente",
    href: "/cadastro",
    popular: false,
  },
  {
    name: "Pessoal",
    price: "R$ 29",
    period: "/mês",
    description: "Para líderes e coordenadores de pastoral",
    features: [
      { name: "Até 200 membros", included: true },
      { name: "Jornadas espirituais completas", included: true },
      { name: "Pedidos de oração ilimitados", included: true },
      { name: "Até 5 pequenos grupos", included: true },
      { name: "Suporte por email e chat", included: true },
      { name: "Relatórios avançados", included: true },
      { name: "Eventos ilimitados", included: true },
      { name: "Biblioteca completa", included: false },
      { name: "Suporte prioritário", included: false },
      { name: "Personalização avançada", included: false },
    ],
    cta: "Assinar Plano Pessoal",
    href: "/cadastro?plan=pessoal",
    popular: false,
  },
  {
    name: "Paróquia",
    price: "R$ 99",
    period: "/mês",
    description: "Solução completa para paróquias e comunidades",
    features: [
      { name: "Membros ilimitados", included: true },
      { name: "Jornadas espirituais completas", included: true },
      { name: "Pedidos de oração ilimitados", included: true },
      { name: "Grupos ilimitados", included: true },
      { name: "Suporte prioritário 24/7", included: true },
      { name: "Relatórios avançados", included: true },
      { name: "Eventos ilimitados", included: true },
      { name: "Biblioteca completa", included: true },
      { name: "Suporte prioritário", included: true },
      { name: "Personalização avançada", included: true },
    ],
    cta: "Assinar Plano Paróquia",
    href: "/cadastro?plan=paroquia",
    popular: true,
  },
]

const faqs = [
  {
    question: "Posso mudar de plano a qualquer momento?",
    answer:
      "Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças são aplicadas imediatamente e você paga apenas a diferença proporcional.",
  },
  {
    question: "O que acontece se eu exceder o limite de membros?",
    answer:
      "Você receberá uma notificação quando estiver próximo do limite. Caso exceda, sugeriremos um upgrade automático para o próximo plano.",
  },
  {
    question: "Existe desconto para pagamento anual?",
    answer:
      "Sim! Oferecemos 20% de desconto para pagamentos anuais em todos os planos pagos. Entre em contato para mais detalhes.",
  },
  {
    question: "Como funciona o suporte técnico?",
    answer:
      "Plano Gratuito: suporte por email. Plano Pessoal: email e chat. Plano Paróquia: suporte prioritário 24/7 com telefone dedicado.",
  },
  {
    question: "Posso cancelar minha assinatura?",
    answer:
      "Sim, você pode cancelar a qualquer momento. Não há multas ou taxas de cancelamento. Você continuará tendo acesso até o final do período pago.",
  },
  {
    question: "Os dados da minha comunidade ficam seguros?",
    answer:
      "Absolutamente! Utilizamos criptografia de ponta e seguimos as melhores práticas de segurança. Seus dados nunca são compartilhados com terceiros.",
  },
]

export default function PlanosPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Planos que Crescem com sua Comunidade</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Escolha o plano ideal para sua paróquia ou comunidade católica. Comece gratuitamente e faça upgrade quando
            precisar.
          </p>
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            <Star className="h-4 w-4" />
            Teste gratuito de 30 dias em todos os planos pagos
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <Card key={plan.name} className={`relative ${plan.popular ? "border-purple-500 border-2" : ""}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600">
                    Mais Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                        ) : (
                          <X className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        )}
                        <span className={feature.included ? "text-gray-900" : "text-gray-500"}>{feature.name}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.href} className="block">
                    <Button
                      className={`w-full ${plan.popular ? "bg-purple-600 hover:bg-purple-700" : ""}`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Perguntas Frequentes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tire suas dúvidas sobre nossos planos e funcionalidades.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ainda tem dúvidas?</h2>
          <p className="text-xl mb-8 opacity-90">
            Nossa equipe está pronta para ajudar você a escolher o melhor plano para sua comunidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contato">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Falar com Especialista
              </Button>
            </Link>
            <Link href="/cadastro">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
              >
                Começar Gratuitamente
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
