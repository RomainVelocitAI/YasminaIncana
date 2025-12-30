'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { PulsingGoldLine } from '@/components/animations/SectionDivider'
import { TeamSlider } from '@/components/team/TeamSlider'
import { ValuesSectionV2 } from '@/components/etude/ValuesSectionV2'
import { team } from '@/content/team'
import ScrollMorphHero from '@/components/scroll-morph-hero'

export default function Etude2Page() {
  const teamRef = useRef(null)
  const ctaRef = useRef(null)

  const { scrollYProgress: teamProgress } = useScroll({
    target: teamRef,
    offset: ['start end', 'end start'],
  })

  const { scrollYProgress: ctaProgress } = useScroll({
    target: ctaRef,
    offset: ['start end', 'end start'],
  })

  const teamContentY = useTransform(teamProgress, [0, 1], [150, -150])
  const ctaContentY = useTransform(ctaProgress, [0, 1], [200, -200])
  const ctaGoldLineWidth = useTransform(ctaProgress, [0, 0.5], ['0%', '100%'])

  return (
    <>
      {/* Hero - Scroll Morph Animation */}
      <section className="h-screen w-full">
        <ScrollMorphHero />
      </section>

      {/* Values - Section avec scroll asymétrique */}
      <ValuesSectionV2 />

      {/* Team - Section avec fond bleu canard diagonal */}
      <section ref={teamRef} id="equipe" className="relative overflow-hidden">
        {/* Zone blanche au-dessus */}
        <div className="h-16 bg-background" />

        <div className="relative">
          {/* Fond bleu canard avec clip-path diagonal */}
          <div
            className="absolute inset-0 bg-primary"
            style={{
              clipPath: 'polygon(0 60px, 100% 0, 100% calc(100% - 60px), 0 100%)',
            }}
          />

          {/* Ligne dorée diagonale en haut avec pulsation */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="absolute top-[60px] left-0 right-0 h-[3px] z-10 origin-left overflow-hidden"
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
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="absolute bottom-[60px] right-0 left-0 h-[3px] z-10 origin-right overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-l from-gold via-gold to-transparent" />
            <motion.div
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute inset-0 bg-gradient-to-l from-white/40 via-white/60 to-transparent"
            />
          </motion.div>

          {/* Contenu avec parallax */}
          <motion.div style={{ y: teamContentY }} className="container-wide py-24 md:py-32 relative z-10">
            <div className="text-center mb-16">
              <AnimatedSection>
                <div className="flex items-center justify-center gap-4 mb-6">
                  <span className="h-px w-12 bg-gold" />
                  <span className="font-serif text-sm text-gold tracking-[0.15em]">02</span>
                  <span className="h-px w-12 bg-gold" />
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-4">
                  Notre équipe
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <p className="text-white/70 max-w-2xl mx-auto">
                  Des professionnels expérimentés et passionnés, à votre écoute pour
                  vous accompagner dans tous vos projets.
                </p>
              </AnimatedSection>
            </div>

            <TeamSlider members={team} />
          </motion.div>
        </div>

        {/* Zone blanche en dessous */}
        <div className="h-16 bg-background" />
      </section>

      {/* CTA Section avec découpe diagonale */}
      <section ref={ctaRef} className="relative overflow-hidden">
        {/* Zone blanche au-dessus */}
        <div className="h-16 bg-background" />

        <div className="relative">
          {/* Fond sombre avec clip-path diagonal inversé */}
          <div
            className="absolute inset-0 bg-text-primary"
            style={{
              clipPath: 'polygon(0 0, 100% 60px, 100% 100%, 0 100%)',
            }}
          />

          {/* Ligne dorée diagonale en haut avec pulsation */}
          <motion.div
            style={{ width: ctaGoldLineWidth }}
            className="absolute top-[60px] right-0 h-[3px] z-10 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-l from-gold via-gold to-transparent" />
            <motion.div
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 bg-gradient-to-l from-white/40 via-white/60 to-transparent"
            />
          </motion.div>

          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10 z-0">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '40px 40px',
              }}
            />
          </div>

          {/* Floating elements */}
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-20 left-20 w-32 h-32 border border-white/20 z-0"
          />
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute bottom-20 right-20 w-48 h-48 border border-gold/30 z-0"
          />

          {/* Contenu avec parallax */}
          <motion.div style={{ y: ctaContentY }} className="container-wide py-24 md:py-32 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">
                Prêt à nous rencontrer ?
              </h2>
              <p className="text-xl text-white/80 mb-10">
                Notre équipe est à votre disposition pour répondre à vos questions
                et vous accompagner dans vos projets.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gold hover:bg-gold-light text-text-primary px-8 py-6 text-base transition-all duration-300 hover:-translate-y-1"
                >
                  <Link href="/contact">
                    <Mail className="w-5 h-5 mr-2" />
                    Nous contacter
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white hover:text-primary px-8 py-6 text-base transition-all duration-300"
                >
                  <Link href="/services">Découvrir nos services</Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
