import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Caminho 4D - Plataforma Católica de Crescimento Espiritual",
  description:
    "Transforme sua vida espiritual com jornadas guiadas, pequenos grupos, pedidos de oração e conteúdos de formação católica. Junte-se à nossa comunidade de fé.",
  keywords: [
    "plataforma católica",
    "crescimento espiritual",
    "jornadas espirituais",
    "pequenos grupos católicos",
    "pedidos de oração",
    "formação cristã",
    "comunidade católica online",
    "evangelização digital",
    "MCC",
    "cursilho",
    "vida de oração",
  ],
  authors: [{ name: "Caminho 4D" }],
  creator: "Caminho 4D",
  publisher: "Caminho 4D",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://caminho4d.org",
    title: "Caminho 4D - Sua Jornada Espiritual em 4 Dimensões",
    description:
      "Plataforma católica completa para crescimento espiritual com jornadas guiadas, grupos de partilha e formação cristã.",
    siteName: "Caminho 4D",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Caminho 4D - Plataforma Católica",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Caminho 4D - Plataforma Católica de Crescimento Espiritual",
    description: "Transforme sua vida espiritual com nossa plataforma católica completa.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
}

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
