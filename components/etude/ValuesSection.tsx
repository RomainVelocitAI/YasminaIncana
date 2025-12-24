'use client'

import { Scale, Shield, Users, Clock } from 'lucide-react'
import { ValueSection } from './ValueSection'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { PulsingGoldLine } from '@/components/animations/SectionDivider'

// Valeurs définies ici car les icônes Lucide ne peuvent pas être passées d'un server component
const values = [
  {
    icon: Scale,
    title: 'Expertise',
    description:
      "Une connaissance approfondie du droit notarial et une veille juridique permanente pour vous offrir les meilleurs conseils.",
  },
  {
    icon: Shield,
    title: 'Confiance',
    description:
      'La confidentialité et la sécurité de vos transactions sont au cœur de notre engagement professionnel.',
  },
  {
    icon: Users,
    title: 'Proximité',
    description:
      "Un accompagnement personnalisé et une écoute attentive pour répondre à vos besoins spécifiques.",
  },
  {
    icon: Clock,
    title: 'Réactivité',
    description:
      'Une équipe disponible et réactive pour traiter vos dossiers dans les meilleurs délais.',
  },
]

export function ValuesSection() {
  return (
    <div className="relative">
      {/* Section header */}
      <section className="py-16 md:py-20 bg-secondary/30 relative overflow-hidden">
        {/* Ligne dorée pulsante en haut */}
        <PulsingGoldLine position="top" fromDirection="center" />

        <div className="container-wide">
          <div className="text-center">
            <AnimatedSection>
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="h-px w-12 bg-gold" />
                <span className="font-serif text-sm text-gold tracking-[0.15em]">Valeurs</span>
                <span className="h-px w-12 bg-gold" />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-text-primary mb-4">
                Nos valeurs
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Les principes qui guident notre engagement au quotidien
                pour vous offrir un service d'excellence.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Value sections */}
      {values.map((value, index) => (
        <ValueSection
          key={value.title}
          value={value}
          index={index}
          isReversed={index % 2 !== 0}
        />
      ))}
    </div>
  )
}
