"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Cross,
  Users,
  BookOpen,
  Calendar,
  Heart,
  BarChart3,
  Shield,
  Star,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Instagram,
  MessageCircle,
  Youtube,
  Menu,
  X,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { CookieBanner } from "@/components/cookie-banner"

const features = [
  {
    icon: Cross,
    title: "Jornadas Espirituais",
    description: "Caminhos guiados de crescimento na fé com módulos estruturados e acompanhamento personalizado.",
  },
  {
    icon: Heart,
    title: "Pedidos de Oração",
    description: "Compartilhe suas intenções e ore pelos irmãos da comunidade em um ambiente seguro e acolhedor.",
  },
  {
    icon: Users,
    title: "Pequenos Grupos",
    description: "Participe de grupos de partilha e formação com coordenadores experientes e irmãos na fé.",
  },
  {
    icon: BookOpen,
    title: "Formação Cristã",
    description: "Acesse conteúdos de qualidade: vídeos, PDFs, textos e materiais de formação católica.",
  },
  {
    icon: Calendar,
    title: "Eventos e Encontros",
    description: "Participe de retiros, formações e eventos da comunidade com sistema de inscrições integrado.",
  },
  {
    icon: BarChart3,
    title: "Acompanhamento Pessoal",
    description: "Monitore seu progresso espiritual com relatórios detalhados e conquistas personalizadas.",
  },
]

const testimonials = [
  {
    name: "Pe. João Silva",
    role: "Coordenador Geral",
    avatar: "PJ",
    quote:
      "O Caminho 4D revolucionou nossa forma de acompanhar os fiéis. Agora conseguimos oferecer um cuidado mais próximo e personalizado a cada membro da comunidade.",
  },
  {
    name: "Maria Santos",
    role: "Coordenadora de Grupo",
    avatar: "MS",
    quote:
      "A plataforma facilitou muito o trabalho com meu pequeno grupo. Posso acompanhar o progresso de cada pessoa e oferecer o suporte necessário em tempo real.",
  },
  {
    name: "Carlos Ferreira",
    role: "Membro Ativo",
    avatar: "CF",
    quote:
      "Minha jornada espiritual ganhou uma nova dimensão. Os conteúdos são ricos e o acompanhamento me ajuda a manter o foco no crescimento na fé.",
  },
]

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    acceptTerms: false,
  })
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.acceptTerms) {
      toast({
        title: "Aceite os termos",
        description: "É necessário aceitar os termos de uso e política de privacidade.",
        variant: "destructive",
      })
      return
    }

    // Aqui você integraria com Supabase ou webhook
    toast({
      title: "✅ Mensagem enviada!",
      description: "Entraremos em contato em breve. Obrigado pelo interesse!",
    })

    setFormData({ name: "", email: "", message: "", acceptTerms: false })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-white">
      <CookieBanner />

      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-purple-600 text-white">
                <Cross className="size-4" />
              </div>
              <span className="text-xl font-bold text-gray-900">Caminho 4D</span>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection("sobre")} className="text-gray-600 hover:text-purple-600">
                Sobre
              </button>
              <button
                onClick={() => scrollToSection("funcionalidades")}
                className="text-gray-600 hover:text-purple-600"
              >
                Funcionalidades
              </button>
              <button onClick={() => scrollToSection("depoimentos")} className="text-gray-600 hover:text-purple-600">
                Depoimentos
              </button>
              <button onClick={() => scrollToSection("contato")} className="text-gray-600 hover:text-purple-600">
                Contato
              </button>
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <Link href="/login">
                <Button variant="outline">Entrar</Button>
              </Link>
              <Link href="/cadastro">
                <Button>Criar Conta</Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <nav className="flex flex-col gap-4 mt-4">
                <button onClick={() => scrollToSection("sobre")} className="text-left text-gray-600">
                  Sobre
                </button>
                <button onClick={() => scrollToSection("funcionalidades")} className="text-left text-gray-600">
                  Funcionalidades
                </button>
                <button onClick={() => scrollToSection("depoimentos")} className="text-left text-gray-600">
                  Depoimentos
                </button>
                <button onClick={() => scrollToSection("contato")} className="text-left text-gray-600">
                  Contato
                </button>
                <div className="flex flex-col gap-2 mt-4">
                  <Link href="/login">
                    <Button variant="outline" className="w-full bg-transparent">
                      Entrar
                    </Button>
                  </Link>
                  <Link href="/cadastro">
                    <Button className="w-full">Criar Conta</Button>
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Sua Jornada Espiritual em{" "}
                <span className="text-purple-600 relative">
                  4 Dimensões
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-purple-200 rounded"></div>
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Conecte-se com sua fé através de uma plataforma completa para crescimento espiritual, comunidade e
                formação cristã. Junte-se a milhares de pessoas em sua caminhada rumo à santidade.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8" onClick={() => scrollToSection("funcionalidades")}>
                  Comece sua Jornada
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 bg-transparent"
                  onClick={() => scrollToSection("sobre")}
                >
                  Saiba Mais
                </Button>
              </div>
              <div className="mt-8 p-4 bg-white/80 rounded-lg border border-purple-100">
                <p className="text-purple-800 italic text-center">
                  "Eu sou o caminho, a verdade e a vida. Ninguém vem ao Pai senão por mim."
                </p>
                <p className="text-purple-600 text-sm text-center mt-2">João 14:6</p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-purple-400 to-blue-500 rounded-full opacity-20 absolute -top-4 -left-4 w-72 h-72"></div>
              <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 absolute -bottom-4 -right-4 w-64 h-64"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 text-center">
                <Cross className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Plataforma Católica</h3>
                <p className="text-gray-600 mb-6">Tecnologia a serviço da evangelização</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">1000+</div>
                    <div className="text-gray-600">Membros Ativos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">50+</div>
                    <div className="text-gray-600">Pequenos Grupos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">200+</div>
                    <div className="text-gray-600">Jornadas Concluídas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">24/7</div>
                    <div className="text-gray-600">Suporte Espiritual</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Section */}
      <section id="sobre" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Como Funciona o Caminho 4D</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nossa plataforma integra tecnologia e espiritualidade para oferecer uma experiência completa de
              crescimento na fé católica.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Cadastre-se</h3>
              <p className="text-gray-600">Crie sua conta e complete seu perfil espiritual</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Escolha sua Jornada</h3>
              <p className="text-gray-600">Selecione o caminho espiritual adequado ao seu momento</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Participe da Comunidade</h3>
              <p className="text-gray-600">Conecte-se com grupos e participe de eventos</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Cresça na Fé</h3>
              <p className="text-gray-600">Acompanhe seu progresso e celebre suas conquistas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Funcionalidades Section */}
      <section id="funcionalidades" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Funcionalidades da Plataforma</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubra todas as ferramentas disponíveis para enriquecer sua jornada espiritual e fortalecer sua
              comunidade de fé.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/cadastro">
              <Button size="lg" className="text-lg px-8">
                Experimente Gratuitamente
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Depoimentos Section */}
      <section id="depoimentos" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">O que Nossa Comunidade Diz</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conheça os testemunhos de quem já está vivendo uma experiência transformadora no Caminho 4D.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg?height=48&width=48" />
                      <AvatarFallback className="bg-purple-100 text-purple-600">{testimonial.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic leading-relaxed">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Segurança Section */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Segurança e Confiança</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Seus dados e sua privacidade são nossa prioridade. Utilizamos as melhores práticas de segurança digital.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Criptografia SSL</h3>
              <p className="text-gray-600">Todos os dados são protegidos com criptografia de ponta a ponta</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Conformidade LGPD</h3>
              <p className="text-gray-600">Seguimos rigorosamente as diretrizes da Lei Geral de Proteção de Dados</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cross className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Valores Católicos</h3>
              <p className="text-gray-600">Plataforma desenvolvida com base nos princípios da doutrina católica</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-4 bg-white rounded-lg p-4 shadow-sm">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                🔒 Certificado SSL
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                ✅ LGPD Compliant
              </Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                ⛪ Aprovado pela Igreja
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Contato Section */}
      <section id="contato" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Entre em Contato</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tem dúvidas ou quer saber mais sobre o Caminho 4D? Nossa equipe está pronta para ajudar você.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Fale com Nossa Equipe</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="message">Mensagem *</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, acceptTerms: !!checked }))}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    Aceito os{" "}
                    <Link href="/termos-de-uso" className="text-purple-600 hover:underline">
                      termos de uso
                    </Link>{" "}
                    e{" "}
                    <Link href="/politica-de-privacidade" className="text-purple-600 hover:underline">
                      política de privacidade
                    </Link>
                    *
                  </Label>
                </div>
                <Button type="submit" size="lg" className="w-full">
                  Enviar Mensagem
                </Button>
              </form>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6">Outras Formas de Contato</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">WhatsApp</h4>
                    <p className="text-gray-600">(11) 99999-0000</p>
                    <a
                      href="https://wa.me/5511999990000"
                      className="text-purple-600 hover:underline text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Falar com coordenador
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">E-mail</h4>
                    <p className="text-gray-600">contato@caminho4d.org</p>
                    <p className="text-sm text-gray-500">Resposta em até 24h</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Endereço</h4>
                    <p className="text-gray-600">Paróquia São Francisco de Assis</p>
                    <p className="text-gray-600">Rua das Flores, 123 - Centro</p>
                    <p className="text-gray-600">São Paulo - SP</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-purple-50 rounded-lg">
                <h4 className="font-semibold mb-2">Horário de Atendimento</h4>
                <p className="text-gray-600 text-sm">Segunda a Sexta: 9h às 18h</p>
                <p className="text-gray-600 text-sm">Sábado: 9h às 12h</p>
                <p className="text-gray-600 text-sm">Domingo: Após as missas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-purple-600 text-white">
                  <Cross className="size-4" />
                </div>
                <span className="text-xl font-bold">Caminho 4D</span>
              </div>
              <p className="text-gray-400 mb-4">
                Plataforma católica para crescimento espiritual e fortalecimento da comunidade de fé.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <MessageCircle className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Institucional</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/sobre" className="hover:text-white">
                    Quem Somos
                  </Link>
                </li>
                <li>
                  <Link href="/comunidade-catolica" className="hover:text-white">
                    Nossa Comunidade
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    Perguntas Frequentes
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/termos-de-uso" className="hover:text-white">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link href="/politica-de-privacidade" className="hover:text-white">
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="/politica-de-cookies" className="hover:text-white">
                    Política de Cookies
                  </Link>
                </li>
                <li>
                  <Link href="/contato" className="hover:text-white">
                    Contato
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  (11) 99999-0000
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  contato@caminho4d.org
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  São Paulo - SP
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Caminho 4D. Todos os direitos reservados.</p>
            <p className="text-sm mt-2">
              Desenvolvido com ❤️ para a evangelização católica | Tecnologia a serviço da fé
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
