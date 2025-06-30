"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Maria Silva",
    location: "São Paulo, SP",
    text: "A plataforma me ajudou a me reconectar com minha fé de uma forma que nunca imaginei. Os grupos de oração online fortaleceram minha espiritualidade.",
    rating: 5,
    role: "Coordenadora de Pastoral",
  },
  {
    id: 2,
    name: "João Santos",
    location: "Rio de Janeiro, RJ",
    text: "Como pároco, vejo o impacto positivo na nossa comunidade. A participação aumentou e os fiéis estão mais engajados nas atividades paroquiais.",
    rating: 5,
    role: "Pároco",
  },
  {
    id: 3,
    name: "Ana Costa",
    location: "Belo Horizonte, MG",
    text: "As jornadas espirituais me guiaram em momentos difíceis. É maravilhoso ter uma ferramenta que une tecnologia e fé de forma tão harmoniosa.",
    rating: 5,
    role: "Membro da Comunidade",
  },
]

export function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[currentTestimonial]

  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-base font-semibold leading-7 text-purple-600">Depoimentos</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Vidas transformadas pela fé
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20">
          <div className="relative">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-xl font-medium leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                "{current.text}"
              </blockquote>
              <figcaption className="mt-8">
                <div className="font-semibold text-gray-900">{current.name}</div>
                <div className="text-gray-600">{current.role}</div>
                <div className="text-sm text-gray-500">{current.location}</div>
              </figcaption>
            </div>
            <div className="flex justify-center items-center mt-8 gap-4">
              <Button variant="outline" size="sm" onClick={prevTestimonial}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      index === currentTestimonial ? "bg-purple-600" : "bg-gray-300"
                    }`}
                    onClick={() => setCurrentTestimonial(index)}
                  />
                ))}
              </div>
              <Button variant="outline" size="sm" onClick={nextTestimonial}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
