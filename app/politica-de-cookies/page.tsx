import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Cross, ArrowLeft, Cookie } from "lucide-react"

export const metadata: Metadata = {
  title: "Política de Cookies - Caminho 4D",
  description: "Entenda como utilizamos cookies e tecnologias similares na plataforma Caminho 4D.",
  keywords: ["política de cookies", "cookies", "rastreamento", "privacidade", "caminho 4d"],
}

export default function PoliticaCookiesPage() {
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

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <Cookie className="h-16 w-16 text-purple-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Política de Cookies</h1>
          <p className="text-xl text-gray-600">Última atualização: 1º de janeiro de 2024</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-orange-50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-semibold text-orange-800 mb-4 flex items-center gap-2">
              <Cookie className="h-6 w-6" />O que são Cookies?
            </h2>
            <p className="text-orange-700">
              Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita nosso site. Eles
              nos ajudam a melhorar sua experiência, lembrar suas preferências e entender como você usa nossa
              plataforma.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Tipos de Cookies que Utilizamos</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-green-200 bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Cookies Essenciais</h3>
                <p className="text-green-700 text-sm mb-2">Necessários para o funcionamento básico da plataforma</p>
                <ul className="text-green-600 text-sm space-y-1">
                  <li>• Autenticação de usuário</li>
                  <li>• Segurança da sessão</li>
                  <li>• Preferências de idioma</li>
                  <li>• Carrinho de compras</li>
                </ul>
              </div>

              <div className="border border-blue-200 bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Cookies de Funcionalidade</h3>
                <p className="text-blue-700 text-sm mb-2">Melhoram a experiência do usuário</p>
                <ul className="text-blue-600 text-sm space-y-1">
                  <li>• Lembrar preferências</li>
                  <li>• Configurações de tema</li>
                  <li>• Histórico de navegação</li>
                  <li>• Formulários preenchidos</li>
                </ul>
              </div>

              <div className="border border-purple-200 bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-800 mb-2">Cookies Analíticos</h3>
                <p className="text-purple-700 text-sm mb-2">Nos ajudam a entender como você usa o site</p>
                <ul className="text-purple-600 text-sm space-y-1">
                  <li>• Páginas mais visitadas</li>
                  <li>• Tempo de permanência</li>
                  <li>• Origem do tráfego</li>
                  <li>• Erros encontrados</li>
                </ul>
              </div>

              <div className="border border-orange-200 bg-orange-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-orange-800 mb-2">Cookies de Marketing</h3>
                <p className="text-orange-700 text-sm mb-2">Personalizam conteúdo e anúncios</p>
                <ul className="text-orange-600 text-sm space-y-1">
                  <li>• Conteúdo personalizado</li>
                  <li>• Recomendações</li>
                  <li>• Campanhas direcionadas</li>
                  <li>• Redes sociais</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Cookies de Terceiros</h2>

            <p className="mb-4">Utilizamos serviços de terceiros que podem definir seus próprios cookies:</p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 p-3 text-left">Serviço</th>
                    <th className="border border-gray-300 p-3 text-left">Finalidade</th>
                    <th className="border border-gray-300 p-3 text-left">Duração</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-3">Google Analytics</td>
                    <td className="border border-gray-300 p-3">Análise de tráfego e comportamento</td>
                    <td className="border border-gray-300 p-3">2 anos</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">Supabase</td>
                    <td className="border border-gray-300 p-3">Autenticação e banco de dados</td>
                    <td className="border border-gray-300 p-3">Sessão</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">YouTube</td>
                    <td className="border border-gray-300 p-3">Reprodução de vídeos</td>
                    <td className="border border-gray-300 p-3">Variável</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Como Gerenciar Cookies</h2>

            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Configurações do Navegador</h3>
              <p className="text-blue-700 mb-4">
                Você pode controlar cookies através das configurações do seu navegador:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Chrome</h4>
                  <p className="text-sm text-blue-600">Configurações → Privacidade e segurança → Cookies</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Firefox</h4>
                  <p className="text-sm text-blue-600">Opções → Privacidade e segurança → Cookies</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Safari</h4>
                  <p className="text-sm text-blue-600">Preferências → Privacidade → Cookies</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Edge</h4>
                  <p className="text-sm text-blue-600">Configurações → Privacidade → Cookies</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-yellow-800">
                <strong>Atenção:</strong> Desabilitar cookies essenciais pode afetar o funcionamento da plataforma.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Suas Escolhas</h2>

            <div className="space-y-4">
              <div className="border border-gray-200 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Aceitar Todos os Cookies</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Permite que usemos todos os tipos de cookies para oferecer a melhor experiência possível.
                </p>
                <Button className="w-full md:w-auto">Aceitar Todos</Button>
              </div>

              <div className="border border-gray-200 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Configurações Personalizadas</h3>
                <p className="text-sm text-gray-600 mb-3">Escolha quais tipos de cookies você deseja permitir.</p>
                <Button variant="outline" className="w-full md:w-auto bg-transparent">
                  Personalizar
                </Button>
              </div>

              <div className="border border-gray-200 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Apenas Essenciais</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Permite apenas cookies necessários para o funcionamento básico.
                </p>
                <Button variant="outline" className="w-full md:w-auto bg-transparent">
                  Apenas Essenciais
                </Button>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Atualizações desta Política</h2>

            <p className="mb-4">
              Esta política de cookies pode ser atualizada periodicamente para refletir mudanças em nossas práticas ou
              por outros motivos operacionais, legais ou regulamentares.
            </p>

            <p className="mb-4">
              Recomendamos que você revise esta página regularmente para se manter informado sobre nosso uso de cookies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Contato</h2>

            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="mb-4">Se você tiver dúvidas sobre nossa política de cookies:</p>

              <div className="space-y-2">
                <p>
                  <strong>E-mail:</strong> cookies@caminho4d.org
                </p>
                <p>
                  <strong>Telefone:</strong> (11) 99999-0000
                </p>
                <p>
                  <strong>Endereço:</strong> Rua das Flores, 123 - Centro, São Paulo - SP
                </p>
              </div>

              <p className="mt-4">
                Para mais informações sobre privacidade, consulte nossa{" "}
                <Link href="/politica-de-privacidade" className="text-purple-600 hover:underline">
                  Política de Privacidade
                </Link>
                .
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
