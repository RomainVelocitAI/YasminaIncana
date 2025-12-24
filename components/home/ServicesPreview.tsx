'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Home, Users, Building2, ArrowRight } from 'lucide-react'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/animations/AnimatedSection'
import { FloatingBubbles } from '@/components/animations/FloatingBubbles'
import { services } from '@/content/services'

const iconMap: Record<string, React.ElementType> = {
  Home,
  Users,
  Building2,
}

// Images locales de La Réunion pour chaque service
const serviceImages: Record<string, string> = {
  immobilier: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&h=600&fit=crop', // Architecture tropicale
  famille: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&h=600&fit=crop', // Plage tropicale famille
  entreprise: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&h=600&fit=crop', // Immeuble de bureaux moderne
}

export function ServicesPreview() {
  return (
    <section className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, var(--text-primary) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      {/* Decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Floating bubbles - gold variant for services */}
      <FloatingBubbles count={5} variant="gold" />

      <div className="container-wide relative">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedSection>
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-px w-12 bg-gold" />
              <span className="section-number">02</span>
              <span className="h-px w-12 bg-gold" />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-text-primary mb-4">
              Nos domaines d'expertise
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Un accompagnement complet pour tous vos projets juridiques,
              de l'immobilier à la transmission patrimoniale.
            </p>
          </AnimatedSection>
        </div>

        {/* Services grid */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8" staggerDelay={0.15}>
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Home
            const imageUrl = serviceImages[service.slug] || serviceImages.immobilier
            return (
              <StaggerItem key={service.slug}>
                <Link href={`/services/${service.slug}`} className="group block h-full">
                  <motion.article
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="bg-surface h-full border border-border-light hover:border-primary/30 transition-all duration-500 relative overflow-hidden"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-text-primary/60 via-text-primary/20 to-transparent" />

                      {/* Number overlay */}
                      <span className="absolute top-4 right-4 font-serif text-5xl text-white/30">
                        0{index + 1}
                      </span>

                      {/* Icon overlay */}
                      <div className="absolute bottom-4 left-4">
                        <div className="w-12 h-12 flex items-center justify-center bg-white/90 backdrop-blur-sm">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 lg:p-8">
                      <h3 className="font-serif text-2xl text-text-primary mb-3 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-text-secondary mb-6 leading-relaxed text-sm">
                        {service.shortDescription}
                      </p>

                      {/* Link */}
                      <div className="flex items-center gap-2 text-primary font-medium">
                        <span className="text-sm uppercase tracking-wider">En savoir plus</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                      </div>
                    </div>

                    {/* Bottom line decoration */}
                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500" />
                  </motion.article>
                </Link>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        {/* View all link */}
        <AnimatedSection delay={0.5} className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 text-text-secondary hover:text-primary transition-colors group"
          >
            <span className="text-sm uppercase tracking-wider">Voir tous nos services</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
