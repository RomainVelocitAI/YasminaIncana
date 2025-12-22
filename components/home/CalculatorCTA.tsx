'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calculator, ArrowRight } from 'lucide-react'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { Button } from '@/components/ui/button'

export function CalculatorCTA() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-secondary/50" />

      {/* Decorative elements */}
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-96 border border-primary/10 rounded-full"
      />
      <motion.div
        animate={{
          rotate: [360, 0],
        }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        className="absolute -left-10 top-1/2 -translate-y-1/2 w-72 h-72 border border-gold/10 rounded-full"
      />
      <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />

      <div className="container-wide relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <div>
            <AnimatedSection>
              <div className="flex items-center gap-4 mb-6">
                <span className="section-number">04</span>
                <span className="h-px w-12 bg-gold" />
                <span className="text-text-muted text-sm uppercase tracking-wider">
                  Outil pratique
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-text-primary mb-6 leading-tight">
                Estimez vos frais
                <br />
                <span className="text-primary">de notaire</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-text-secondary text-lg mb-8 max-w-lg">
                Utilisez notre calculateur pour obtenir une estimation précise des frais
                de notaire pour votre acquisition immobilière. Barème officiel 2025.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary-dark text-white px-8 py-6 text-base transition-all duration-300 hover:-translate-y-1"
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

          {/* Right - Visual card */}
          <AnimatedSection delay={0.4} direction="left">
            <div className="relative">
              {/* Background card */}
              <div className="absolute inset-4 bg-primary/10 -rotate-3 rounded-lg" />

              {/* Main card */}
              <div className="relative bg-surface border border-border-light p-8 md:p-10">
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

                <div className="p-4 bg-secondary/50 border border-border-light">
                  <p className="text-sm text-text-muted">
                    <span className="text-status-available font-medium">Bonne nouvelle !</span> La Réunion maintient
                    le taux des droits de mutation à 4,5% en 2025.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
