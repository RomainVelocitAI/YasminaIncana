'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Home, Users, Building2, ArrowRight, Check } from 'lucide-react'
import { Service } from '@/lib/types'
import { Button } from '@/components/ui/button'

const iconMap: Record<string, React.ElementType> = {
  Home,
  Users,
  Building2,
}

// Images locales de La Réunion pour chaque service
const serviceImages: Record<string, string> = {
  immobilier: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1200&h=800&fit=crop', // Architecture tropicale
  famille: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1200&h=800&fit=crop', // Plage tropicale famille
  entreprise: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&h=800&fit=crop', // Immeuble de bureaux moderne
}

interface ServiceSectionProps {
  service: Service
  index: number
  isReversed?: boolean
}

export function ServiceSection({ service, index, isReversed = false }: ServiceSectionProps) {
  const sectionRef = useRef(null)
  const Icon = iconMap[service.icon] || Home
  const imageUrl = serviceImages[service.slug] || serviceImages.immobilier

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Parallax effects
  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const contentY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const decorY = useTransform(scrollYProgress, [0, 1], [150, -150])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95])

  return (
    <section
      ref={sectionRef}
      className={`relative py-24 md:py-32 overflow-hidden ${
        index % 2 === 0 ? 'bg-background' : 'bg-secondary/20'
      }`}
    >
      {/* Background decorations */}
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
        <motion.div style={{ opacity, scale }}>
          <div
            className={`grid lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
              isReversed ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Image side */}
            <motion.div
              style={{ y: imageY }}
              className={`lg:col-span-6 ${isReversed ? 'lg:col-start-7' : ''}`}
            >
              <div className="relative">
                {/* Decorative frames */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className={`absolute ${
                    isReversed ? '-left-4 -top-4' : '-right-4 -top-4'
                  } w-full h-full border-2 border-primary/20`}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className={`absolute ${
                    isReversed ? '-left-8 -top-8' : '-right-8 -top-8'
                  } w-full h-full border border-gold/30`}
                />

                {/* Main image */}
                <motion.div
                  initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                  whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative aspect-[4/3] overflow-hidden group"
                >
                  <Image
                    src={imageUrl}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-text-primary/40 via-transparent to-transparent" />

                  {/* Number badge */}
                  <div
                    className={`absolute bottom-6 ${
                      isReversed ? 'right-6' : 'left-6'
                    } bg-primary text-white w-16 h-16 flex items-center justify-center`}
                  >
                    <span className="font-serif text-3xl">0{index + 1}</span>
                  </div>
                </motion.div>

                {/* Floating icon */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className={`absolute ${
                    isReversed ? '-left-6 -bottom-6' : '-right-6 -bottom-6'
                  } w-20 h-20 bg-white shadow-2xl flex items-center justify-center`}
                >
                  <Icon className="w-8 h-8 text-primary" />
                </motion.div>
              </div>
            </motion.div>

            {/* Content side */}
            <motion.div
              style={{ y: contentY }}
              className={`lg:col-span-6 ${isReversed ? 'lg:col-start-1 lg:row-start-1' : ''}`}
            >
              <motion.div
                initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
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
                  {service.prestations.slice(0, 4).map((prestation, i) => (
                    <motion.div
                      key={prestation}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 bg-primary/10 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="text-text-secondary">{prestation}</span>
                    </motion.div>
                  ))}
                  {service.prestations.length > 4 && (
                    <p className="text-sm text-primary pl-9">
                      +{service.prestations.length - 4} autres prestations
                    </p>
                  )}
                </div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
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
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Decorative lines */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  )
}
