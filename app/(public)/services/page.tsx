'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Phone } from 'lucide-react'
import { ZoomParallaxHero } from '@/components/services/ZoomParallaxHero'
import { ServiceSection } from '@/components/services/ServiceSection'
import { services } from '@/content/services'
import { Button } from '@/components/ui/button'

export default function ServicesPage() {
  const ctaRef = useRef(null)

  const { scrollYProgress: ctaProgress } = useScroll({
    target: ctaRef,
    offset: ['start end', 'end start'],
  })

  const ctaContentY = useTransform(ctaProgress, [0, 1], [100, -100])
  const ctaGoldLineWidth = useTransform(ctaProgress, [0, 0.5], ['0%', '100%'])

  return (
    <>
      {/* Hero - Zoom Parallax */}
      <ZoomParallaxHero />

      {/* Service sections - Vertical asymmetric layout */}
      {services.map((service, index) => (
        <div key={service.slug} id={`service-${service.slug}`}>
          <ServiceSection
            service={service}
            index={index}
            isReversed={index % 2 === 1}
          />
        </div>
      ))}

      {/* CTA Section avec découpe diagonale */}
      <section ref={ctaRef} className="relative overflow-hidden">
        {/* Zone blanche au-dessus */}
        <div className="h-16 bg-background" />

        <div className="relative">
          {/* Fond bleu canard avec clip-path diagonal */}
          <div
            className="absolute inset-0 bg-primary"
            style={{
              clipPath: 'polygon(0 60px, 100% 0, 100% 100%, 0 100%)',
            }}
          />

          {/* Ligne dorée diagonale en haut avec pulsation */}
          <motion.div
            style={{ width: ctaGoldLineWidth }}
            className="absolute top-[60px] left-0 h-[3px] z-10 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gold via-gold to-transparent" />
            <motion.div
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/60 to-transparent"
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
                Besoin d'un conseil personnalisé ?
              </h2>
              <p className="text-xl text-white/80 mb-10">
                Notre équipe est à votre disposition pour étudier votre situation
                et vous accompagner dans vos projets.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gold hover:bg-gold-light text-text-primary px-8 py-6 text-base transition-all duration-300 hover:-translate-y-1"
                >
                  <Link href="/contact">
                    <Phone className="w-5 h-5 mr-2" />
                    Prendre rendez-vous
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white hover:text-primary px-8 py-6 text-base transition-all duration-300"
                >
                  <Link href="/etude">Découvrir l'étude</Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
