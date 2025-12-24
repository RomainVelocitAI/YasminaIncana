'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

interface BiensHeroProps {
  availableCount: number
}

export function BiensHero({ availableCount }: BiensHeroProps) {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.3])

  return (
    <section
      ref={heroRef}
      className="relative min-h-[70vh] flex items-center overflow-hidden bg-text-primary"
    >
      {/* Background image with parallax */}
      <motion.div
        style={{ scale: imageScale }}
        className="absolute inset-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop"
          alt="Immobilier à La Réunion"
          fill
          className="object-cover"
          priority
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-text-primary via-text-primary/80 to-text-primary/50" />

      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gold/20 rounded-full blur-3xl"
      />

      <motion.div
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="container-wide relative z-10 py-24 text-white"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-4 mb-8"
        >
          <span className="h-px w-16 bg-gold" />
          <span className="text-gold text-sm uppercase tracking-[0.3em] font-medium">
            Immobilier
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight"
        >
          Nos biens
          <br />
          <span className="text-gold">à la vente</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-white/80 mb-10 max-w-xl"
        >
          Découvrez notre sélection de biens immobiliers à La Réunion,
          accompagnés par l'expertise de notre étude notariale.
        </motion.p>

        {/* Stats badge */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-4"
        >
          <div className="w-1 h-10 bg-gold" />
          <div>
            <p className="font-serif text-3xl text-white">
              {availableCount}
            </p>
            <p className="text-white/60 text-sm">
              bien{availableCount > 1 ? 's' : ''} disponible{availableCount > 1 ? 's' : ''}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/60 uppercase tracking-widest">
          Découvrir
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-5 h-5 text-gold" />
        </motion.div>
      </motion.div>
    </section>
  )
}
