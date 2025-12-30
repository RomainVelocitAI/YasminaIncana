'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

// Images thématiques pour chaque valeur
const valueImages: Record<string, string> = {
  Expertise: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=800&fit=crop',
  Confiance: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=800&fit=crop',
  Proximité: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=1200&h=800&fit=crop',
  Réactivité: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=800&fit=crop',
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

interface ValueSectionProps {
  value: {
    icon: LucideIcon
    title: string
    description: string
  }
  index: number
  isReversed?: boolean
}

export function ValueSection({ value, index, isReversed = false }: ValueSectionProps) {
  const sectionRef = useRef(null)
  const Icon = value.icon
  const imageUrl = valueImages[value.title] || valueImages.Expertise

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Parallax TRES MARQUE - grande différence entre image et contenu
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30])  // Lent
  const contentY = useTransform(scrollYProgress, [0, 1], [250, -250])  // Rapide
  const decorY = useTransform(scrollYProgress, [0, 1], [350, -350])

  return (
    <section
      ref={sectionRef}
      className={`relative py-32 md:py-44 overflow-hidden ${
        index % 2 === 0 ? 'bg-background' : 'bg-secondary/20'
      }`}
    >
      {/* Background decorative element avec fort parallax */}
      <motion.div
        style={{ y: decorY }}
        className={`absolute top-1/2 -translate-y-1/2 ${
          isReversed ? 'left-0' : 'right-0'
        } w-1/2 h-3/4 opacity-[0.02]`}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--primary) 1px, transparent 0)`,
            backgroundSize: '30px 30px',
          }}
        />
      </motion.div>

      <div className="container-wide relative">
        <div
          className={`grid lg:grid-cols-12 gap-8 lg:gap-16 items-start`}
        >
          {/* Image side - bouge lentement */}
          <motion.div
            style={{ y: imageY }}
            className={`lg:col-span-5 ${isReversed ? 'lg:col-start-8' : ''} lg:sticky lg:top-32`}
          >
            <ImageCard3D>
              <div className="relative">
                {/* Decorative frame */}
                <div
                  className={`absolute ${
                    isReversed ? '-left-3 -top-3' : '-right-3 -top-3'
                  } w-full h-full border border-primary/20`}
                />

                {/* Main image avec effet 3D */}
                <div
                  className="relative aspect-[4/3] overflow-hidden shadow-2xl"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <Image
                    src={imageUrl}
                    alt={value.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />

                  {/* Light reflection - flottant */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ transform: 'translateZ(50px)' }}
                  />

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
                    isReversed ? '-right-4 -bottom-4' : '-left-4 -bottom-4'
                  } w-16 h-16 bg-primary shadow-xl flex items-center justify-center`}
                  style={{ transform: 'translateZ(60px)' }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
              </div>
            </ImageCard3D>
          </motion.div>

          {/* Content side - bouge rapidement = décalage visible */}
          <motion.div
            style={{ y: contentY }}
            className={`lg:col-span-6 ${isReversed ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-7'}`}
          >
            {/* Title */}
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-text-primary mb-6">
              {value.title}
            </h3>

            {/* Description */}
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-lg">
              {value.description}
            </p>

            {/* Decorative element */}
            <div className="h-1 w-16 bg-primary mt-8" />
          </motion.div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  )
}
