'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { StatBlock } from '@/components/animations/AnimatedCounter'
import { Button } from '@/components/ui/button'

export function AboutPreview() {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-secondary/50 to-transparent pointer-events-none" />

      <div className="container-wide relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Image column - 55% */}
          <AnimatedSection direction="left" className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative">
              {/* Main image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=1000&fit=crop"
                  alt="Étude notariale"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-text-primary/30 to-transparent" />
              </div>

              {/* Floating accent card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute -bottom-8 -right-8 md:right-8 bg-surface p-6 shadow-xl border border-border-light max-w-[280px]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-serif text-xl text-primary">Y</span>
                  </div>
                  <div>
                    <p className="font-serif text-lg text-text-primary">
                      Maître ARMON INCANA
                    </p>
                    <p className="text-sm text-text-muted">Notaire titulaire</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary italic">
                  "Accompagner nos clients avec expertise et bienveillance"
                </p>
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-32 h-32 border border-gold/20 -z-10" />
              <div className="absolute top-1/4 -left-12 h-px w-24 bg-gradient-to-r from-gold to-transparent" />
            </div>
          </AnimatedSection>

          {/* Text column - 45% */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <AnimatedSection>
              <div className="flex items-center gap-4 mb-6">
                <span className="section-number">01</span>
                <span className="h-px w-12 bg-gold" />
                <span className="text-text-muted text-sm uppercase tracking-wider">
                  L'étude
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-text-primary mb-6 leading-tight">
                Une expertise notariale
                <br />
                <span className="text-primary">au service de vos projets</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-text-secondary text-lg leading-relaxed mb-6">
                Située au cœur de L'Étang-Salé, notre étude notariale vous accompagne
                dans toutes vos démarches juridiques avec professionnalisme et proximité.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <p className="text-text-secondary leading-relaxed mb-8">
                Maître Yasmina ARMON INCANA et son équipe vous offrent un accompagnement
                personnalisé, alliant tradition notariale et modernité, pour sécuriser
                vos transactions et protéger vos intérêts.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <Button
                asChild
                variant="outline"
                className="group border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                <Link href="/etude" className="flex items-center gap-2">
                  Découvrir l'étude
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </AnimatedSection>

            {/* Stats */}
            <AnimatedSection delay={0.5}>
              <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-border-light">
                <StatBlock value={15} suffix="+" label="Années d'expérience" />
                <StatBlock value={2} label="Experts dédiés" delay={0.1} />
                <StatBlock value={500} suffix="+" label="Dossiers par an" delay={0.2} />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}
