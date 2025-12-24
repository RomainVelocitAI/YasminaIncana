'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { Button } from '@/components/ui/button'
import { notaryInfo } from '@/content/team'

export function ContactBanner() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const contentY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const goldLineWidth = useTransform(scrollYProgress, [0, 0.5], ['0%', '100%'])

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Zone blanche au-dessus */}
      <div className="h-16 bg-background" />

      {/* Section avec découpe diagonale */}
      <div className="relative">
        {/* Fond sombre avec clip-path diagonal */}
        <div
          className="absolute inset-0 bg-text-primary"
          style={{
            clipPath: 'polygon(0 60px, 100% 0, 100% 100%, 0 100%)',
          }}
        />

        {/* Ligne dorée diagonale en haut avec pulsation */}
        <motion.div
          style={{ width: goldLineWidth }}
          className="absolute top-[60px] left-0 h-[3px] z-10 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gold via-gold to-transparent" />
          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/60 to-transparent"
          />
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-5 z-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl z-0"
        />

        {/* Contenu avec parallax */}
        <motion.div style={{ y: contentY }} className="container-wide py-24 md:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
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
                  Besoin d'un conseil ?
                  <br />
                  <span className="text-gold">Contactez-nous</span>
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <p className="text-white/70 text-lg mb-8 max-w-lg">
                  Notre équipe est à votre disposition pour répondre à toutes vos
                  questions et vous accompagner dans vos projets.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <Button
                  asChild
                  size="lg"
                  className="bg-gold hover:bg-gold-light text-text-primary px-8 py-6 text-base transition-all duration-300 hover:-translate-y-1"
                >
                  <Link href="/contact" className="flex items-center gap-2">
                    Prendre rendez-vous
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </AnimatedSection>
            </div>

            {/* Right - Contact info */}
            <AnimatedSection delay={0.4} direction="left">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-10 relative">
                {/* Lignes décoratives dorées */}
                <div className="absolute -top-2 -left-2 w-12 h-12 border-t-2 border-l-2 border-gold/60" />
                <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-2 border-r-2 border-gold/60" />

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gold/20 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-white font-medium mb-1">Adresse</p>
                      <p className="text-white/60 text-sm">
                        {notaryInfo.address}
                        <br />
                        {notaryInfo.postalCode} {notaryInfo.city}
                        <br />
                        {notaryInfo.country}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gold/20 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-white font-medium mb-1">Téléphone</p>
                      <a
                        href={`tel:${notaryInfo.phone.replace(/\s/g, '')}`}
                        className="text-white/60 text-sm hover:text-gold transition-colors"
                      >
                        {notaryInfo.phone}
                      </a>
                      <p className="text-white/40 text-xs mt-1">
                        Fax : {notaryInfo.fax}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gold/20 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-white font-medium mb-1">Email</p>
                      <a
                        href={`mailto:${notaryInfo.email}`}
                        className="text-white/60 text-sm hover:text-gold transition-colors break-all"
                      >
                        {notaryInfo.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-white font-medium mb-3">Horaires d'ouverture</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {notaryInfo.hours.map((schedule, i) => (
                      <div key={i} className="contents">
                        <span className="text-white/80">{schedule.days}</span>
                        <span className="text-white/50">
                          {schedule.morning === 'Fermé'
                            ? 'Fermé'
                            : `${schedule.morning} - ${schedule.afternoon}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
