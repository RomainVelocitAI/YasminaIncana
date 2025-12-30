'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-background"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px),
                             linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Gradient orbs */}
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
          className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
          className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-gold/5 to-transparent blur-3xl"
        />
      </div>

      <motion.div style={{ y, opacity, scale }} className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-24 lg:py-0">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="h-px w-12 bg-gold" />
              <span className="text-gold text-sm uppercase tracking-[0.2em] font-medium">
                Notaire à La Réunion
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-text-primary mb-6 leading-[1.1]"
            >
              Étude de Maître
              <br />
              <span className="text-primary">INCANA</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-lg md:text-xl text-text-secondary mb-4 max-w-xl"
            >
              Votre notaire à L'Étang Salé
            </motion.p>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="font-serif text-2xl md:text-3xl text-text-muted italic mb-10"
            >
              Expertise, Confiance, Proximité
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary-dark text-white px-8 py-6 text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20"
              >
                <Link href="/etude">Découvrir l'étude</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border hover:border-primary hover:text-primary px-8 py-6 text-base transition-all duration-300"
              >
                <Link href="/services">Nos services</Link>
              </Button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="flex flex-wrap gap-8 md:gap-12 mt-16 pt-8 border-t border-border-light"
            >
              <div>
                <div className="font-serif text-2xl md:text-3xl text-primary">96 Avenue Raymond Barre</div>
                <div className="text-sm text-text-muted uppercase tracking-wider mt-1">
                  Adresse
                </div>
              </div>
              <div>
                <div className="font-serif text-2xl md:text-3xl text-primary">97427 L'Étang Salé</div>
                <div className="text-sm text-text-muted uppercase tracking-wider mt-1">
                  La Réunion
                </div>
              </div>
            </motion.div>
          </div>

          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-4 border border-gold/20 -z-10" />
              <div className="absolute -inset-8 border border-border-light -z-20" />

              {/* Video container */}
              <div className="relative aspect-video bg-text-primary overflow-hidden">
                {/* Video en lecture automatique, en boucle, muette, sans contrôles */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source
                    src="https://res.cloudinary.com/dqd514udc/video/upload/v1766426510/Untitled_Made_with_FlexClip_2_vfi121.mp4"
                    type="video/mp4"
                  />
                  {/* Fallback image si la vidéo ne charge pas */}
                  <img
                    src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=1000&fit=crop"
                    alt="L'étude notariale"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </video>

                {/* Overlay gradient subtil */}
                <div className="absolute inset-0 bg-gradient-to-t from-text-primary/40 via-transparent to-text-primary/10 pointer-events-none" />

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-text-primary to-transparent">
                  <p className="text-white/80 text-sm">
                    Bienvenue à l'étude
                  </p>
                  <p className="text-white font-serif text-lg">
                    L'Étang Salé, La Réunion
                  </p>
                </div>
              </div>

              {/* Decorative gold corner */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-gold/40" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-text-muted uppercase tracking-widest">Défiler</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  )
}
