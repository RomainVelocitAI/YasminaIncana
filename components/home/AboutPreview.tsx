'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { StatBlock } from '@/components/animations/AnimatedCounter'
import { Button } from '@/components/ui/button'

export function AboutPreview() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Effets parallax plus prononcés
  const imageY = useTransform(scrollYProgress, [0, 1], [150, -150])
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95])
  const contentY = useTransform(scrollYProgress, [0, 1], [80, -80])
  const goldLineWidth = useTransform(scrollYProgress, [0, 0.5], ['0%', '100%'])

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Zone blanche au dessus */}
      <div className="h-24 bg-background" />

      {/* Section principale avec découpe diagonale */}
      <div className="relative">
        {/* Fond bleu canard avec clip-path diagonal */}
        <div
          className="absolute inset-0 bg-primary"
          style={{
            clipPath: 'polygon(0 80px, 100% 0, 100% calc(100% - 80px), 0 100%)',
          }}
        />

        {/* Ligne dorée diagonale en haut avec pulsation */}
        <motion.div
          style={{ width: goldLineWidth }}
          className="absolute top-[80px] left-0 h-[3px] z-10 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gold via-gold to-transparent" />
          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/60 to-transparent"
          />
        </motion.div>

        {/* Ligne dorée diagonale en bas avec pulsation */}
        <motion.div
          style={{ width: goldLineWidth }}
          className="absolute bottom-[80px] right-0 h-[3px] z-10 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-l from-gold via-gold to-transparent" />
          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute inset-0 bg-gradient-to-l from-white/40 via-white/60 to-transparent"
          />
        </motion.div>

        {/* Contenu */}
        <div className="container-wide relative z-10 py-32 md:py-40">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Image column avec parallax */}
            <motion.div
              style={{ y: imageY, scale: imageScale }}
              className="lg:col-span-6 order-2 lg:order-1"
            >
              <div className="relative">
                {/* Main image */}
                <div className="relative aspect-[4/5] overflow-hidden shadow-2xl">
                  <Image
                    src="/images/about-preview.webp"
                    alt="Étude notariale"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                  {/* Overlay de protection + gradient */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent z-10"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>

                {/* Lignes décoratives dorées */}
                <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-gold/60" />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-gold/60" />
              </div>
            </motion.div>

            {/* Text column avec parallax */}
            <motion.div style={{ y: contentY }} className="lg:col-span-6 order-1 lg:order-2">
              <AnimatedSection>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
                  Une expertise notariale
                  <br />
                  <span className="text-gold">au service de vos projets</span>
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  Située au cœur de L'Étang Salé, notre étude notariale vous accompagne
                  dans toutes vos démarches juridiques avec professionnalisme et proximité.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <p className="text-white/70 leading-relaxed mb-8">
                  Maître Yasmina INCANA et son équipe vous offrent un accompagnement
                  personnalisé, alliant tradition notariale et modernité, pour sécuriser
                  vos transactions et protéger vos intérêts.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                <Button
                  asChild
                  className="group bg-gold text-text-primary hover:bg-white transition-all duration-300"
                >
                  <Link href="/etude" className="flex items-center gap-2">
                    Découvrir l'étude
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </AnimatedSection>

              {/* Stats */}
              <AnimatedSection delay={0.5}>
                <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20">
                  <StatBlock value={15} suffix="+" label="Années d'expérience" dark />
                  <StatBlock value={2} label="Experts dédiés" delay={0.1} dark />
                  <StatBlock value={500} suffix="+" label="Dossiers par an" delay={0.2} dark />
                </div>
              </AnimatedSection>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Zone blanche en dessous */}
      <div className="h-24 bg-background" />
    </section>
  )
}
