'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Home, Users, Building2, ArrowRight, Check } from 'lucide-react'
import { Service } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { PulsingGoldLine } from '@/components/animations/SectionDivider'

const iconMap: Record<string, React.ElementType> = {
  Home,
  Users,
  Building2,
}

// Images locales de La Réunion pour chaque service
const serviceImages: Record<string, string> = {
  immobilier: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1200&h=800&fit=crop',
  famille: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1200&h=800&fit=crop',
  entreprise: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&h=800&fit=crop',
}

interface ServiceSectionProps {
  service: Service
  index: number
  isReversed?: boolean
}

// Composant 3D Card pour les images
function ImageCard3D({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const { left, top, width, height } = card.getBoundingClientRect()
    const x = e.clientX - left
    const y = e.clientY - top
    const rotateX = ((y - height / 2) / height) * 15
    const rotateY = ((x - width / 2) / width) * -15
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)'
  }

  return (
    <div style={{ perspective: '1000px' }}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="transition-transform duration-300 ease-out cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </div>
    </div>
  )
}

export function ServiceSection({ service, index, isReversed = false }: ServiceSectionProps) {
  const sectionRef = useRef(null)
  const Icon = iconMap[service.icon] || Home
  const imageUrl = serviceImages[service.slug] || serviceImages.immobilier

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Parallax TRES MARQUE - grande différence entre image et contenu
  // Image bouge lentement, contenu bouge rapidement = décalage visible
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30])  // Lent
  const contentY = useTransform(scrollYProgress, [0, 1], [300, -300])  // Rapide
  const decorY = useTransform(scrollYProgress, [0, 1], [400, -400])

  return (
    <section
      ref={sectionRef}
      className={`relative py-32 md:py-48 overflow-hidden ${
        index % 2 === 0 ? 'bg-background' : 'bg-secondary/20'
      }`}
    >
      {/* Ligne dorée pulsante en haut */}
      <PulsingGoldLine position="top" fromDirection={isReversed ? 'right' : 'left'} />

      {/* Background decorations avec parallax fort */}
      <motion.div
        style={{ y: decorY }}
        className={`absolute top-0 ${isReversed ? 'left-0' : 'right-0'} w-1/3 h-full opacity-[0.03]`}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(
              ${isReversed ? '45deg' : '-45deg'},
              transparent,
              transparent 20px,
              var(--primary) 20px,
              var(--primary) 21px
            )`,
          }}
        />
      </motion.div>

      <div className="container-wide relative">
        <div
          className={`grid lg:grid-cols-12 gap-8 lg:gap-16 items-start ${
            isReversed ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Image side - bouge lentement */}
          <motion.div
            style={{ y: imageY }}
            className={`lg:col-span-6 ${isReversed ? 'lg:col-start-7' : ''} lg:sticky lg:top-32`}
          >
            <ImageCard3D>
              <div className="relative">
                {/* Decorative frames */}
                <div
                  className={`absolute ${
                    isReversed ? '-left-4 -top-4' : '-right-4 -top-4'
                  } w-full h-full border-2 border-primary/20`}
                />
                <div
                  className={`absolute ${
                    isReversed ? '-left-8 -top-8' : '-right-8 -top-8'
                  } w-full h-full border border-gold/30`}
                />

                {/* Main image avec effet 3D */}
                <div
                  className="relative aspect-[4/3] overflow-hidden shadow-2xl"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <Image
                    src={imageUrl}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />

                  {/* Light reflection - flottant */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ transform: 'translateZ(50px)' }}
                  />

                  {/* Number badge */}
                  <div
                    className={`absolute bottom-6 ${
                      isReversed ? 'right-6' : 'left-6'
                    } bg-primary text-white w-16 h-16 flex items-center justify-center`}
                    style={{ transform: 'translateZ(40px)' }}
                  >
                    <span className="font-serif text-3xl">0{index + 1}</span>
                  </div>
                </div>

                {/* Lignes décoratives dorées - flottantes */}
                <div
                  className={`absolute -top-3 ${isReversed ? '-right-3' : '-left-3'} w-16 h-16 border-t-2 border-l-2 border-gold`}
                  style={{ transform: 'translateZ(40px)' }}
                />
                <div
                  className={`absolute -bottom-3 ${isReversed ? '-left-3' : '-right-3'} w-16 h-16 border-b-2 border-r-2 border-gold`}
                  style={{ transform: 'translateZ(40px)' }}
                />

                {/* Floating icon */}
                <div
                  className={`absolute ${
                    isReversed ? '-left-6 -bottom-6' : '-right-6 -bottom-6'
                  } w-20 h-20 bg-white shadow-2xl flex items-center justify-center`}
                  style={{ transform: 'translateZ(60px)' }}
                >
                  <Icon className="w-8 h-8 text-primary" />
                </div>
              </div>
            </ImageCard3D>
          </motion.div>

          {/* Content side - bouge rapidement = décalage visible */}
          <motion.div
            style={{ y: contentY }}
            className={`lg:col-span-6 ${isReversed ? 'lg:col-start-1 lg:row-start-1' : ''}`}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-gold" />
              <span className="text-gold text-sm uppercase tracking-[0.2em] font-medium">
                Service 0{index + 1}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-serif text-4xl md:text-5xl text-text-primary mb-6 leading-tight">
              {service.title}
            </h2>

            {/* Description */}
            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
              {service.fullDescription}
            </p>

            {/* Prestations */}
            <div className="space-y-3 mb-10">
              {service.prestations.slice(0, 4).map((prestation) => (
                <div
                  key={prestation}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-primary/10 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-text-secondary">{prestation}</span>
                </div>
              ))}
              {service.prestations.length > 4 && (
                <p className="text-sm text-primary pl-9">
                  +{service.prestations.length - 4} autres prestations
                </p>
              )}
            </div>

            {/* CTA */}
            <Button
              asChild
              className="bg-primary hover:bg-primary-dark text-white px-8 py-6 text-base group"
            >
              <Link href={`/services/${service.slug}`}>
                Découvrir ce service
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Decorative lines */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  )
}
