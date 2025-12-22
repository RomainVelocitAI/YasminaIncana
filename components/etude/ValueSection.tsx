'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

// Images thématiques pour chaque valeur
const valueImages: Record<string, string> = {
  Expertise: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=800&fit=crop', // Bureau juridique
  Confiance: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=800&fit=crop', // Poignée de main
  Proximité: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=1200&h=800&fit=crop', // Discussion client
  Réactivité: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=800&fit=crop', // Équipe dynamique
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

  // Parallax effects
  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80])
  const contentY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const decorY = useTransform(scrollYProgress, [0, 1], [120, -120])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section
      ref={sectionRef}
      className={`relative py-20 md:py-28 overflow-hidden ${
        index % 2 === 0 ? 'bg-background' : 'bg-secondary/20'
      }`}
    >
      {/* Background decorative element */}
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
        <motion.div style={{ opacity }}>
          <div
            className={`grid lg:grid-cols-12 gap-8 lg:gap-16 items-center`}
          >
            {/* Image side */}
            <motion.div
              style={{ y: imageY }}
              className={`lg:col-span-5 ${isReversed ? 'lg:col-start-8' : ''}`}
            >
              <div className="relative">
                {/* Decorative frame */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className={`absolute ${
                    isReversed ? '-left-3 -top-3' : '-right-3 -top-3'
                  } w-full h-full border border-primary/20`}
                />

                {/* Main image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative aspect-[4/3] overflow-hidden group"
                >
                  <Image
                    src={imageUrl}
                    alt={value.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-text-primary/30 via-transparent to-transparent" />

                  {/* Number badge */}
                  <div
                    className={`absolute top-4 ${
                      isReversed ? 'left-4' : 'right-4'
                    } font-serif text-6xl text-white/20`}
                  >
                    0{index + 1}
                  </div>
                </motion.div>

                {/* Floating icon */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className={`absolute ${
                    isReversed ? '-right-4 -bottom-4' : '-left-4 -bottom-4'
                  } w-16 h-16 bg-primary shadow-xl flex items-center justify-center`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </motion.div>
              </div>
            </motion.div>

            {/* Content side */}
            <motion.div
              style={{ y: contentY }}
              className={`lg:col-span-6 ${isReversed ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-7'}`}
            >
              <motion.div
                initial={{ opacity: 0, x: isReversed ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {/* Eyebrow */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-10 bg-gold" />
                  <span className="text-gold text-xs uppercase tracking-[0.2em] font-medium">
                    Valeur 0{index + 1}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-text-primary mb-6">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-lg">
                  {value.description}
                </p>

                {/* Decorative element */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '4rem' }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="h-1 bg-primary mt-8"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  )
}
