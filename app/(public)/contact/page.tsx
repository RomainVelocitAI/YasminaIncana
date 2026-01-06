'use client'

import { useState, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, ArrowDown, FileText, Building2, Home, Video } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { PulsingGoldLine } from '@/components/animations/SectionDivider'
import { ContactForm } from '@/components/contact/ContactForm'
import { notaryInfo } from '@/content/team'

// Méthodes de rendez-vous
const appointmentMethods = [
  {
    id: 'office',
    title: 'Au sein de notre Étude',
    description: 'Dans un cadre chaleureux et moderne, lieu de vos rendez-vous de conseils et de signature.',
    icon: Building2,
    color: 'primary',
  },
  {
    id: 'home',
    title: 'À votre domicile',
    description: 'Personnes âgées ou à mobilité réduite, nous nous déplaçons afin de vous aider à réaliser vos démarches notariales.',
    icon: Home,
    color: 'primary',
  },
  {
    id: 'remote',
    title: 'À distance par visioconférence',
    description: 'Lors de vos déplacements dans le monde, la continuité de vos projets est assurée par la signature électronique de votre procuration à distance grâce à la visioconférence.',
    icon: Video,
    color: 'primary',
  },
]

function ContactFormWithSubject() {
  const searchParams = useSearchParams()
  const initialSubject = searchParams.get('subject') || undefined
  return <ContactForm initialSubject={initialSubject} />
}

export default function ContactPage() {
  const heroRef = useRef(null)
  const formRef = useRef(null)

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const { scrollYProgress: formProgress } = useScroll({
    target: formRef,
    offset: ['start end', 'end start'],
  })

  const heroY = useTransform(heroProgress, [0, 1], [0, 100])
  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0])

  const formContentY = useTransform(formProgress, [0, 1], [80, -80])
  const formInfoY = useTransform(formProgress, [0, 1], [60, -60])

  return (
    <>
      {/* Hero - Full screen avec fond bleu canard diagonal */}
      <section
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center overflow-hidden"
      >
        {/* Fond bleu canard avec clip-path diagonal */}
        <div
          className="absolute inset-0 bg-primary"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 80px), 0 100%)',
          }}
        />

        {/* Ligne dorée diagonale en bas avec pulsation */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="absolute bottom-[80px] left-0 right-0 h-[3px] z-10 origin-left overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gold via-gold to-transparent" />
          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/60 to-transparent"
          />
        </motion.div>

        {/* Animated background elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-gold/20 rounded-full blur-3xl"
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="container-wide relative z-10 py-24"
        >
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="h-px w-12 bg-gold" />
              <span className="text-gold text-sm uppercase tracking-[0.2em]">
                Contact
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6"
            >
              Nous contacter
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-white/80 leading-relaxed"
            >
              Notre équipe est à votre disposition pour répondre à vos questions
              et vous accompagner dans vos projets.
            </motion.p>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-5 h-5 text-gold" />
          </motion.div>
        </motion.div>
      </section>

      {/* Section Méthodes de rendez-vous */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container-wide">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-4">
                Comment souhaitez-vous nous rencontrer ?
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Maître INCANA s'adapte à vos besoins et vous propose plusieurs modalités de rendez-vous.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {appointmentMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <AnimatedSection key={method.id} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="bg-surface border border-border-light p-8 h-full relative group shadow-sm hover:shadow-lg transition-shadow duration-300"
                  >
                    {/* Coins dorés */}
                    <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-gold/40 group-hover:border-gold/80 transition-colors duration-300" />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-gold/40 group-hover:border-gold/80 transition-colors duration-300" />

                    {/* Icône */}
                    <div className={`w-16 h-16 rounded-full ${method.id === 'remote' ? 'bg-primary' : 'bg-primary/10'} flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-8 h-8 ${method.id === 'remote' ? 'text-white' : 'text-primary'}`} />
                    </div>

                    {/* Contenu */}
                    <h3 className="font-serif text-xl text-text-primary text-center mb-4">
                      {method.title}
                    </h3>
                    <p className="text-text-secondary text-sm text-center leading-relaxed">
                      {method.description}
                    </p>
                  </motion.div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact section avec parallax */}
      <section ref={formRef} className="py-16 md:py-24 relative overflow-hidden">
        {/* Ligne dorée pulsante en haut */}
        <PulsingGoldLine position="top" fromDirection="left" />

        {/* Pattern de fond subtil */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--primary) 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />

        <div className="container-wide relative">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Contact info avec parallax */}
            <motion.aside style={{ y: formInfoY }} className="lg:col-span-5">
              <AnimatedSection direction="right">
                <div className="sticky top-32 space-y-8">
                  <div>
                    <h2 className="font-serif text-2xl text-text-primary mb-6">
                      Informations pratiques
                    </h2>

                    <div className="space-y-6">
                      {/* Address */}
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary mb-1">Adresse</p>
                          <p className="text-text-secondary text-sm">
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
                        <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0">
                          <Phone className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary mb-1">Téléphone</p>
                          <a
                            href={`tel:${notaryInfo.phone.replace(/\s/g, '')}`}
                            className="text-text-secondary text-sm hover:text-primary transition-colors"
                          >
                            {notaryInfo.phone}
                          </a>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0">
                          <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary mb-1">Email</p>
                          <a
                            href={`mailto:${notaryInfo.email}`}
                            className="text-text-secondary text-sm hover:text-primary transition-colors break-all"
                          >
                            {notaryInfo.email}
                          </a>
                        </div>
                      </div>

                      {/* Hours */}
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0">
                          <Clock className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary mb-2">
                            Horaires d'ouverture
                          </p>
                          <table className="text-sm text-text-secondary">
                            <tbody>
                              {notaryInfo.hours.map((schedule, i) => (
                                <tr key={i}>
                                  <td className="pr-4 py-1 text-text-primary">
                                    {schedule.days}
                                  </td>
                                  <td className="py-1">
                                    {schedule.morning === 'Fermé'
                                      ? 'Fermé'
                                      : schedule.afternoon
                                        ? `${schedule.morning} - ${schedule.afternoon}`
                                        : schedule.morning}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {notaryInfo.appointmentNote && (
                            <p className="text-sm text-text-secondary italic mt-2">
                              {notaryInfo.appointmentNote}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Map avec coins dorés */}
                  <div className="relative">
                    <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-gold/60" />
                    <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-gold/60" />
                    <div className="aspect-[4/3] bg-secondary border border-border-light overflow-hidden shadow-lg">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.8!2d55.3447!3d-21.2667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2178b3a5c5c5c5c5%3A0x0!2s96%20Avenue%20Raymond%20Barre%2C%2097427%20L'%C3%89tang-Sal%C3%A9!5e0!3m2!1sfr!2sfr!4v1"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Localisation de l'étude - 96 Avenue Raymond Barre, L'Étang Salé"
                        sandbox="allow-scripts allow-same-origin allow-popups"
                      />
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </motion.aside>

            {/* Contact form avec parallax */}
            <motion.div style={{ y: formContentY }} className="lg:col-span-7">
              <AnimatedSection>
                <div className="bg-surface border border-border-light p-8 md:p-12 relative shadow-lg">
                  {/* Coins dorés */}
                  <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-gold/60" />
                  <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-gold/60" />

                  {/* Encart préparation RDV */}
                  <div className="bg-primary/5 border border-primary/20 p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-lg text-text-primary mb-1">
                        Préparez votre rendez-vous
                      </h3>
                      <p className="text-text-secondary text-sm">
                        Téléchargez les documents à préparer selon votre démarche.
                      </p>
                    </div>
                    <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white shrink-0">
                      <Link href="/rendez-vous">
                        Voir les documents
                      </Link>
                    </Button>
                  </div>

                  <h2 className="font-serif text-2xl text-text-primary mb-2">
                    Envoyez-nous un message
                  </h2>
                  <p className="text-text-secondary mb-8">
                    Remplissez le formulaire ci-dessous et nous vous répondrons
                    dans les meilleurs délais.
                  </p>
                  <Suspense fallback={<div className="animate-pulse h-96 bg-secondary/50 rounded" />}>
                    <ContactFormWithSubject />
                  </Suspense>
                </div>
              </AnimatedSection>
            </motion.div>
          </div>
        </div>

        {/* Ligne dorée pulsante en bas */}
        <PulsingGoldLine position="bottom" fromDirection="right" />
      </section>
    </>
  )
}
