'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { Button } from '@/components/ui/button'
import { notaryInfo } from '@/content/team'

export function ContactBanner() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-text-primary" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute inset-0 opacity-5">
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
        className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl"
      />

      <div className="container-wide py-20 md:py-28 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Text */}
          <div>
            <AnimatedSection>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
                Besoin d'un conseil ?
                <br />
                <span className="text-gold">Contactez-nous</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <p className="text-white/70 text-lg mb-8 max-w-lg">
                Notre équipe est à votre disposition pour répondre à toutes vos
                questions et vous accompagner dans vos projets.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary-light text-white px-8 py-6 text-base transition-all duration-300 hover:-translate-y-1"
              >
                <Link href="/contact" className="flex items-center gap-2">
                  Prendre rendez-vous
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </AnimatedSection>
          </div>

          {/* Right - Contact info */}
          <AnimatedSection delay={0.3} direction="left">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-10">
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
      </div>
    </section>
  )
}
