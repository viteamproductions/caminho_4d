import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Caminho 4D - Plataforma Espiritual Católica",
  description:
    "Transforme sua vida espiritual com tecnologia a favor da fé. Plataforma completa para paróquias, grupos e comunidades católicas.",
  keywords: [
    "plataforma católica",
    "jornada espiritual",
    "grupos de oração",
    "paróquia digital",
    "comunidade católica",
  ],
  authors: [{ name: "Caminho 4D" }],
  openGraph: {
    title: "Caminho 4D - Plataforma Espiritual Católica",
    description: "Transforme sua vida espiritual com tecnologia a favor da fé",
    url: "https://caminho4d.com",
    siteName: "Caminho 4D",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Caminho 4D - Plataforma Espiritual",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Caminho 4D - Plataforma Espiritual Católica",
    description: "Transforme sua vida espiritual com tecnologia a favor da fé",
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
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
