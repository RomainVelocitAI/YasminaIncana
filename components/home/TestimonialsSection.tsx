'use client'

import { StaggerTestimonials } from '@/components/stagger-testimonials'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { PulsingGoldLine } from '@/components/animations/SectionDivider'

export function TestimonialsSection() {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      {/* Ligne dorée pulsante en haut */}
      <PulsingGoldLine position="top" fromDirection="center" />

      {/* Header */}
      <div className="container-wide mb-12">
        <div className="text-center">
          <AnimatedSection>
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-px w-12 bg-gold" />
              <span className="font-serif text-sm text-gold tracking-[0.15em]">Témoignages</span>
              <span className="h-px w-12 bg-gold" />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-text-primary mb-4">
              Ils nous font confiance
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Découvrez les retours de nos clients sur leur expérience
              avec l'étude notariale INCANA.
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* Carrousel de témoignages */}
      <StaggerTestimonials />

      {/* Ligne dorée pulsante en bas */}
      <PulsingGoldLine position="bottom" fromDirection="center" />
    </section>
  )
}
