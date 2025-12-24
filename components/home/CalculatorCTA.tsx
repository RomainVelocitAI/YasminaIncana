'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Calculator, ArrowRight } from 'lucide-react'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { Button } from '@/components/ui/button'

export function CalculatorCTA() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const contentY = useTransform(scrollYProgress, [0, 1], [80, -80])
  const cardY = useTransform(scrollYProgress, [0, 1], [120, -120])

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Zone blanche au-dessus */}
      <div className="h-16 bg-background" />

      {/* Section avec découpe diagonale - fond bleu canard */}
      <div className="relative">
        {/* Fond bleu canard avec clip-path diagonal inversé */}
        <div
          className="absolute inset-0 bg-primary"
          style={{
            clipPath: 'polygon(0 0, 100% 60px, 100% calc(100% - 60px), 0 100%)',
          }}
        />

        {/* Ligne dorée diagonale en haut avec pulsation */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="absolute top-[60px] right-0 left-0 h-[3px] z-10 origin-right overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-l from-gold via-gold to-transparent" />
          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-l from-white/40 via-white/60 to-transparent"
          />
        </motion.div>

        {/* Ligne dorée diagonale en bas avec pulsation */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="absolute bottom-[60px] left-0 right-0 h-[3px] z-10 origin-left overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gold via-gold to-transparent" />
          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/60 to-transparent"
          />
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-96 border border-white/10 rounded-full"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
          }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          className="absolute -left-10 top-1/2 -translate-y-1/2 w-72 h-72 border border-gold/20 rounded-full"
        />

        {/* Contenu avec parallax */}
        <motion.div style={{ y: contentY }} className="container-wide py-24 md:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <div>
              <AnimatedSection>
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-serif text-sm text-gold tracking-[0.15em]">04</span>
                  <span className="h-px w-12 bg-gold" />
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
                  Estimez vos frais
                  <br />
                  <span className="text-gold">de notaire</span>
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <p className="text-white/70 text-lg mb-8 max-w-lg">
                  Utilisez notre calculateur pour obtenir une estimation précise des frais
                  de notaire pour votre acquisition immobilière. Barème officiel 2025.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <div className="flex flex-wrap gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gold hover:bg-gold-light text-text-primary px-8 py-6 text-base transition-all duration-300 hover:-translate-y-1"
                  >
                    <Link href="/services/immobilier#calculateur" className="flex items-center gap-2">
                      <Calculator className="w-5 h-5" />
                      Accéder au calculateur
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </AnimatedSection>
            </div>

            {/* Right - Visual card avec parallax */}
            <motion.div style={{ y: cardY }}>
              <AnimatedSection delay={0.4} direction="left">
                <div className="relative">
                  {/* Lignes décoratives dorées */}
                  <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-gold/60" />
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-gold/60" />

                  {/* Main card */}
                  <div className="relative bg-white p-8 md:p-10 shadow-2xl">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-primary flex items-center justify-center">
                        <Calculator className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="font-serif text-xl text-text-primary">
                          Calculateur de frais
                        </h3>
                        <p className="text-text-muted text-sm">Barème 2025</p>
                      </div>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {[
                        'Droits de mutation selon le département',
                        'Émoluments du notaire (barème réglementé)',
                        'Contribution de sécurité immobilière',
                        'Option bien neuf / ancien',
                        'Détail complet des calculs',
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center gap-3 text-text-secondary"
                        >
                          <div className="w-2 h-2 bg-gold rounded-full shrink-0" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>

                    <div className="p-4 bg-primary/5 border border-primary/10">
                      <p className="text-sm text-text-muted">
                        <span className="text-status-available font-medium">Bonne nouvelle !</span> La Réunion maintient
                        le taux des droits de mutation à 4,5% en 2025.
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Zone blanche en dessous */}
      <div className="h-16 bg-background" />
    </section>
  )
}
