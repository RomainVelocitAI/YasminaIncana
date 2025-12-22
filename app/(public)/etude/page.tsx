'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, MapPin, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { TeamMemberCard } from '@/components/team/TeamMemberCard'
import { ValuesSection } from '@/components/etude/ValuesSection'
import { team, notaryInfo } from '@/content/team'

export default function EtudePage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])

  return (
    <>
      {/* Hero - Full screen immersive */}
      <section
        ref={heroRef}
        className="relative min-h-[85vh] flex items-center overflow-hidden bg-text-primary"
      >
        {/* Background image with parallax */}
        <motion.div
          style={{ scale: imageScale }}
          className="absolute inset-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop"
            alt="L'étude notariale"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-text-primary via-text-primary/85 to-text-primary/60" />

        {/* Animated background elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gold/20 rounded-full blur-3xl"
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="container-wide relative z-10"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center gap-4 mb-8"
              >
                <span className="h-px w-16 bg-gold" />
                <span className="text-gold text-sm uppercase tracking-[0.3em] font-medium">
                  Notre cabinet
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight"
              >
                L'étude notariale
                <br />
                <span className="text-gold">ARMON INCANA</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed"
              >
                Implantée au coeur de L'Étang-Salé, notre étude vous accompagne
                avec expertise et bienveillance dans tous vos projets juridiques
                depuis La Réunion.
              </motion.p>

              {/* Quick info cards */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="grid sm:grid-cols-2 gap-4 mb-10"
              >
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4">
                  <MapPin className="w-5 h-5 text-gold mb-2" />
                  <p className="text-white text-sm">{notaryInfo.address}</p>
                  <p className="text-white/60 text-sm">{notaryInfo.postalCode} {notaryInfo.city}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4">
                  <Phone className="w-5 h-5 text-gold mb-2" />
                  <p className="text-white text-sm">{notaryInfo.phone}</p>
                  <p className="text-white/60 text-sm">Du lundi au vendredi</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary-dark text-white px-8"
                >
                  <Link href="/contact">Prendre rendez-vous</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white hover:text-text-primary px-8 transition-all duration-300"
                >
                  <a href="#equipe">Découvrir l'équipe</a>
                </Button>
              </motion.div>
            </div>

            {/* Stats decorative element */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Decorative frame */}
                <div className="absolute -inset-4 border border-gold/30" />
                <div className="absolute -inset-8 border border-white/10" />

                {/* Content */}
                <div className="relative bg-white/5 backdrop-blur-sm p-8 space-y-6">
                  <div className="flex items-center gap-4 pb-6 border-b border-white/10">
                    <div className="w-1 h-12 bg-gold" />
                    <div>
                      <p className="font-serif text-3xl text-white">L'Étang-Salé</p>
                      <p className="text-white/60 text-sm">La Réunion</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pb-6 border-b border-white/10">
                    <div className="w-1 h-12 bg-primary" />
                    <div>
                      <p className="font-serif text-3xl text-white">Expertise</p>
                      <p className="text-white/60 text-sm">Droit notarial complet</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-1 h-12 bg-gold" />
                    <div>
                      <p className="font-serif text-3xl text-white">Proximité</p>
                      <p className="text-white/60 text-sm">Accompagnement personnalisé</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/60 uppercase tracking-widest">
            Découvrir
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-5 h-5 text-gold" />
          </motion.div>
        </motion.div>
      </section>

      {/* About section */}
      <section className="py-20 md:py-28">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <AnimatedSection direction="left">
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1000&h=750&fit=crop"
                    alt="Espace de travail moderne"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-gold/30 -z-10" />
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 -z-10" />
              </div>
            </AnimatedSection>

            {/* Content */}
            <div>
              <AnimatedSection>
                <div className="flex items-center gap-4 mb-6">
                  <span className="h-px w-12 bg-gold" />
                  <span className="section-number">Notre histoire</span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-6">
                  Une tradition d'excellence
                  <br />
                  <span className="text-primary">au service de vos projets</span>
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <p className="text-text-secondary leading-relaxed mb-6">
                  L'étude de Maître Yasmina ARMON INCANA perpétue la tradition
                  notariale en l'alliant aux exigences du monde moderne. Notre
                  mission : vous offrir un accompagnement juridique de qualité,
                  adapté à vos besoins.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <p className="text-text-secondary leading-relaxed mb-6">
                  Située au 96, Avenue Raymond Barre à L'Étang-Salé, notre étude
                  bénéficie d'une position privilégiée pour vous accueillir dans
                  un cadre agréable et professionnel.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <p className="text-text-secondary leading-relaxed">
                  Que vous soyez particulier ou professionnel, nous mettons notre
                  expertise à votre disposition pour sécuriser vos transactions
                  et vous conseiller dans vos choix patrimoniaux.
                </p>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Values - Asymmetric with parallax */}
      <ValuesSection />

      {/* Team */}
      <section id="equipe" className="py-20 md:py-28 bg-secondary/20">
        <div className="container-wide">
          <div className="text-center mb-16">
            <AnimatedSection>
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="h-px w-12 bg-gold" />
                <span className="section-number">Équipe</span>
                <span className="h-px w-12 bg-gold" />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-4">
                Notre équipe
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Des professionnels expérimentés et passionnés, à votre écoute pour
                vous accompagner dans tous vos projets.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <TeamMemberCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 md:py-32 bg-primary overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
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
          className="absolute top-20 left-20 w-32 h-32 border border-white/20"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-20 right-20 w-48 h-48 border border-gold/30"
        />

        <div className="container-wide relative">
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
                className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-base"
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
        </div>
      </section>
    </>
  )
}
