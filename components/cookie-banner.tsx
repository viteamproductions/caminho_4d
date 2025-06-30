"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Cookie, X } from "lucide-react"
import Link from "next/link"

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookie-consent")
    if (!cookieConsent) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowBanner(false)
  }

  const rejectCookies = () => {
    localStorage.setItem("cookie-consent", "rejected")
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-md">
      <Card className="shadow-lg border-purple-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Cookie className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold text-sm mb-1">Cookies e Privacidade</h4>
              <p className="text-xs text-gray-600 mb-3">
                Utilizamos cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa{" "}
                <Link href="/politica-de-cookies" className="text-purple-600 hover:underline">
                  Política de Cookies
                </Link>
                .
              </p>
              <div className="flex gap-2">
                <Button size="sm" onClick={acceptCookies} className="text-xs">
                  Aceitar
                </Button>
                <Button size="sm" variant="outline" onClick={rejectCookies} className="text-xs bg-transparent">
                  Rejeitar
                </Button>
              </div>
            </div>
            <button onClick={rejectCookies} className="text-gray-400 hover:text-gray-600">
              <X className="h-4 w-4" />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
