import Link from "next/link"
import { Cross, Mail, MessageCircle, Instagram } from "lucide-react"

const navigation = {
  main: [
    { name: "Início", href: "/" },
    { name: "Funcionalidades", href: "/funcionalidades" },
    { name: "Planos", href: "/planos" },
    { name: "Blog", href: "/blog" },
    { name: "Sobre", href: "/sobre" },
    { name: "Contato", href: "/contato" },
  ],
  legal: [
    { name: "Política de Privacidade", href: "/politica-de-privacidade" },
    { name: "Política de Cookies", href: "/politica-de-cookies" },
    { name: "Termos de Uso", href: "/termos-de-uso" },
  ],
  social: [
    {
      name: "Email",
      href: "mailto:contato@caminho4d.com",
      icon: Mail,
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/5511999999999",
      icon: MessageCircle,
    },
    {
      name: "Instagram",
      href: "https://instagram.com/caminho4d",
      icon: Instagram,
    },
  ],
}

export function Footer() {
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-purple-600 text-white">
                <Cross className="size-4" />
              </div>
              <span className="text-xl font-bold text-white">Caminho 4D</span>
            </Link>
            <p className="text-sm leading-6 text-gray-300">
              Transformando vidas através da tecnologia a favor da fé. Uma plataforma completa para o crescimento
              espiritual de comunidades católicas.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Navegação</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs leading-5 text-gray-400">
              &copy; {new Date().getFullYear()} Caminho 4D. Todos os direitos reservados.
            </p>
            <p className="text-xs leading-5 text-gray-400 flex items-center gap-1">Feito com fé no Brasil 🇧🇷</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
