'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, Users, Building2, ArrowRight } from 'lucide-react'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/animations/AnimatedSection'
import { services } from '@/content/services'

const iconMap: Record<string, React.ElementType> = {
  Home,
  Users,
  Building2,
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
            return (
              <StaggerItem key={service.slug}>
                <Link href={`/services/${service.slug}`} className="group block h-full">
                  <motion.article
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="bg-surface h-full p-8 lg:p-10 border border-border-light hover:border-primary/30 transition-all duration-500 relative overflow-hidden"
                  >
                    {/* Number */}
                    <span className="absolute top-6 right-6 font-serif text-6xl text-border-light group-hover:text-primary/10 transition-colors duration-500">
                      0{index + 1}
                    </span>

                    {/* Icon */}
                    <div className="relative mb-8">
                      <div className="w-16 h-16 flex items-center justify-center bg-primary/5 group-hover:bg-primary transition-colors duration-500">
                        <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-500" />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-16 h-16 border border-gold/20 -z-10" />
                    </div>

                    {/* Content */}
                    <h3 className="font-serif text-2xl text-text-primary mb-4 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-text-secondary mb-6 leading-relaxed">
                      {service.shortDescription}
                    </p>

                    {/* Link */}
                    <div className="flex items-center gap-2 text-primary font-medium">
                      <span className="text-sm uppercase tracking-wider">En savoir plus</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
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
