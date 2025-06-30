import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Cross, ArrowLeft, Shield, Eye, Lock, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Política de Privacidade - Caminho 4D",
  description: "Conheça nossa política de privacidade e como protegemos seus dados pessoais na plataforma Caminho 4D.",
  keywords: ["política de privacidade", "proteção de dados", "LGPD", "privacidade", "caminho 4d"],
}

export default function PoliticaPrivacidadePage() {
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
          <Shield className="h-16 w-16 text-purple-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Política de Privacidade</h1>
          <p className="text-xl text-gray-600">Última atualização: 1º de janeiro de 2024</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-purple-50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-semibold text-purple-800 mb-4 flex items-center gap-2">
              <Eye className="h-6 w-6" />
              Resumo Executivo
            </h2>
            <p className="text-purple-700">
              O Caminho 4D está comprometido com a proteção da sua privacidade. Coletamos apenas os dados necessários
              para oferecer nossos serviços espirituais e nunca compartilhamos suas informações pessoais com terceiros
              sem seu consentimento explícito.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Informações que Coletamos</h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">1.1 Dados Pessoais</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Nome completo</li>
              <li>Endereço de e-mail</li>
              <li>Número de telefone (opcional)</li>
              <li>Data de nascimento (opcional)</li>
              <li>Foto de perfil (opcional)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">1.2 Dados Espirituais</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Progresso em jornadas espirituais</li>
              <li>Pedidos de oração (quando compartilhados)</li>
              <li>Participação em grupos e eventos</li>
              <li>Preferências de formação</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">1.3 Dados Técnicos</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Endereço IP</li>
              <li>Tipo de navegador e dispositivo</li>
              <li>Páginas visitadas e tempo de permanência</li>
              <li>Cookies e tecnologias similares</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Como Utilizamos suas Informações</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Serviços Principais
                </h3>
                <ul className="text-blue-700 space-y-1">
                  <li>• Personalizar jornadas espirituais</li>
                  <li>• Facilitar participação em grupos</li>
                  <li>• Enviar notificações relevantes</li>
                  <li>• Gerar relatórios de progresso</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Segurança e Melhoria
                </h3>
                <ul className="text-green-700 space-y-1">
                  <li>• Proteger contra fraudes</li>
                  <li>• Melhorar funcionalidades</li>
                  <li>• Suporte técnico</li>
                  <li>• Análises estatísticas</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Compartilhamento de Dados</h2>

            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
              <p className="text-red-800 font-semibold">
                ⚠️ Nunca vendemos ou alugamos seus dados pessoais para terceiros.
              </p>
            </div>

            <p className="mb-4">Compartilhamos informações apenas nas seguintes situações:</p>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Com seu consentimento:</strong> Quando você autoriza expressamente
              </li>
              <li>
                <strong>Prestadores de serviço:</strong> Empresas que nos ajudam a operar a plataforma (hospedagem,
                e-mail)
              </li>
              <li>
                <strong>Obrigações legais:</strong> Quando exigido por lei ou autoridades competentes
              </li>
              <li>
                <strong>Proteção de direitos:</strong> Para proteger nossos direitos, propriedade ou segurança
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Seus Direitos (LGPD)</h2>

            <p className="mb-4">Conforme a Lei Geral de Proteção de Dados, você tem direito a:</p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-gray-200 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Acesso e Portabilidade</h3>
                <p className="text-sm text-gray-600">
                  Solicitar cópia dos seus dados e transferi-los para outro serviço
                </p>
              </div>

              <div className="border border-gray-200 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Correção</h3>
                <p className="text-sm text-gray-600">Corrigir dados incompletos, inexatos ou desatualizados</p>
              </div>

              <div className="border border-gray-200 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Exclusão</h3>
                <p className="text-sm text-gray-600">Solicitar a eliminação dos seus dados pessoais</p>
              </div>

              <div className="border border-gray-200 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Oposição</h3>
                <p className="text-sm text-gray-600">Opor-se ao tratamento dos seus dados em certas situações</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Segurança dos Dados</h2>

            <p className="mb-4">Implementamos medidas técnicas e organizacionais para proteger seus dados:</p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Criptografia SSL/TLS para transmissão de dados</li>
              <li>Criptografia de dados sensíveis em repouso</li>
              <li>Controle de acesso baseado em funções</li>
              <li>Monitoramento contínuo de segurança</li>
              <li>Backups regulares e seguros</li>
              <li>Treinamento da equipe em proteção de dados</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Retenção de Dados</h2>

            <p className="mb-4">Mantemos seus dados pelo tempo necessário para:</p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Fornecer nossos serviços enquanto sua conta estiver ativa</li>
              <li>Cumprir obrigações legais (até 5 anos após encerramento)</li>
              <li>Resolver disputas e fazer cumprir acordos</li>
            </ul>

            <p className="mt-4 text-gray-600">
              Dados anonimizados podem ser mantidos indefinidamente para fins estatísticos e de melhoria dos serviços.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Cookies e Tecnologias Similares</h2>

            <p className="mb-4">Utilizamos cookies para:</p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Manter você logado na plataforma</li>
              <li>Lembrar suas preferências</li>
              <li>Analisar o uso da plataforma</li>
              <li>Personalizar conteúdo</li>
            </ul>

            <p className="mt-4">
              Você pode gerenciar cookies através das configurações do seu navegador. Para mais detalhes, consulte nossa{" "}
              <Link href="/politica-de-cookies" className="text-purple-600 hover:underline">
                Política de Cookies
              </Link>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Alterações nesta Política</h2>

            <p className="mb-4">Podemos atualizar esta política periodicamente. Quando isso acontecer:</p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Notificaremos você por e-mail sobre mudanças significativas</li>
              <li>Publicaremos a nova versão em nossa plataforma</li>
              <li>Atualizaremos a data de "última atualização"</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contato</h2>

            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="mb-4">Para exercer seus direitos ou esclarecer dúvidas sobre esta política:</p>

              <div className="space-y-2">
                <p>
                  <strong>E-mail:</strong> privacidade@caminho4d.org
                </p>
                <p>
                  <strong>Telefone:</strong> (11) 99999-0000
                </p>
                <p>
                  <strong>Endereço:</strong> Rua das Flores, 123 - Centro, São Paulo - SP
                </p>
              </div>

              <p className="mt-4 text-sm text-gray-600">
                Responderemos sua solicitação em até 15 dias úteis, conforme previsto na LGPD.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
