'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Home, Users, Building2, ArrowRight } from 'lucide-react'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/animations/AnimatedSection'
import { PulsingGoldLine } from '@/components/animations/SectionDivider'
import { services } from '@/content/services'

const iconMap: Record<string, React.ElementType> = {
  Home,
  Users,
  Building2,
}

const serviceImages: Record<string, string> = {
  immobilier: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&h=600&fit=crop',
  famille: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&h=600&fit=crop',
  entreprise: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&h=600&fit=crop',
}

export function ServicesPreview() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Parallax pour chaque carte avec des vitesses différentes
  const card1Y = useTransform(scrollYProgress, [0, 1], [120, -120])
  const card2Y = useTransform(scrollYProgress, [0, 1], [80, -80])
  const card3Y = useTransform(scrollYProgress, [0, 1], [140, -140])
  const headerY = useTransform(scrollYProgress, [0, 1], [50, -50])

  const cardYValues = [card1Y, card2Y, card3Y]

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Ligne dorée pulsante en haut */}
      <PulsingGoldLine position="top" fromDirection="left" />

      {/* Pattern de fond subtil */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, var(--primary) 1px, transparent 0)`,
        backgroundSize: '48px 48px'
      }} />

      <div className="container-wide relative">
        {/* Header avec parallax */}
        <motion.div style={{ y: headerY }} className="text-center mb-16">
          <AnimatedSection>
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-px w-12 bg-gold" />
              <span className="font-serif text-sm text-gold tracking-[0.15em]">02</span>
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
        </motion.div>

        {/* Services grid avec parallax individuel */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8" staggerDelay={0.15}>
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Home
            const imageUrl = serviceImages[service.slug] || serviceImages.immobilier
            return (
              <StaggerItem key={service.slug}>
                <motion.div style={{ y: cardYValues[index] }}>
                  <Link href={`/services/${service.slug}`} className="group block h-full">
                    <motion.article
                      whileHover={{ y: -12, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="bg-surface h-full border border-border-light hover:border-primary/30 transition-all duration-500 relative overflow-hidden shadow-sm hover:shadow-2xl"
                    >
                      {/* Image */}
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={service.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        {/* Overlay gradient bleu canard */}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent" />

                        {/* Number overlay */}
                        <span className="absolute top-4 right-4 font-serif text-6xl text-white/20">
                          0{index + 1}
                        </span>

                        {/* Icon overlay */}
                        <div className="absolute bottom-4 left-4">
                          <div className="w-14 h-14 flex items-center justify-center bg-white/95 backdrop-blur-sm shadow-lg">
                            <Icon className="w-7 h-7 text-primary" />
                          </div>
                        </div>

                        {/* Ligne dorée diagonale */}
                        <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                          <div className="absolute top-4 -right-8 w-24 h-[2px] bg-gold rotate-45" />
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

                      {/* Bottom line decoration dorée */}
                      <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-gradient-to-r from-gold to-primary group-hover:w-full transition-all duration-500" />
                    </motion.article>
                  </Link>
                </motion.div>
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

      {/* Ligne dorée pulsante en bas */}
      <PulsingGoldLine position="bottom" fromDirection="right" />
    </section>
  )
}
