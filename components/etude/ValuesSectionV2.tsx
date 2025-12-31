'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { Scale, Shield, Users, Clock } from 'lucide-react'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { PulsingGoldLine } from '@/components/animations/SectionDivider'

// Configuration des paires photo/texte
const pairs = [
  {
    photo: {
      src: '/images/etude-expertise.png',
      alt: 'Maître Incana - Expertise notariale',
    },
    text: {
      icon: Scale,
      title: 'Expertise',
      description: 'Une connaissance approfondie du droit notarial et une veille juridique permanente pour vous offrir les meilleurs conseils.',
    },
    photoLeft: true, // photo à gauche, texte à droite
  },
  {
    photo: {
      src: '/images/maitre-incana.png',
      alt: 'Maître Yasmina Incana',
    },
    text: {
      icon: Shield,
      title: 'Confiance',
      description: 'La confidentialité et la sécurité de vos transactions sont au cœur de notre engagement professionnel.',
    },
    photoLeft: false, // texte à gauche, photo à droite
  },
  {
    photo: {
      src: '/images/etude-proximite.png',
      alt: 'Accompagnement personnalisé',
    },
    text: {
      icon: Users,
      title: 'Proximité',
      description: "Un accompagnement personnalisé et une écoute attentive pour répondre à vos besoins spécifiques.",
    },
    photoLeft: true,
  },
  {
    photo: {
      src: '/images/etude-reactivite.png',
      alt: 'Équipe réactive',
    },
    text: {
      icon: Clock,
      title: 'Réactivité',
      description: 'Une équipe disponible et réactive pour traiter vos dossiers dans les meilleurs délais.',
    },
    photoLeft: false,
  },
]

// Composant pour une carte photo
function PhotoCard({ src, alt, index }: { src: string; alt: string; index: number }) {
  return (
    <div className="relative h-[180px] w-full sm:h-[220px] md:h-[260px] lg:h-[280px] rounded-2xl sm:rounded-3xl overflow-hidden group shadow-xl">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
      />
      {/* Liseré doré pulsant */}
      <motion.div
        animate={{ opacity: [0.3, 0.9, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
        className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-gold pointer-events-none"
      />
    </div>
  )
}

// Composant pour une carte texte
function TextCard({ icon: Icon, title, description, index }: {
  icon: React.ElementType
  title: string
  description: string
  index: number
}) {
  return (
    <div className="relative h-[180px] w-full sm:h-[220px] md:h-[260px] lg:h-[280px] bg-surface rounded-2xl sm:rounded-3xl p-6 md:p-8 flex flex-col justify-center shadow-xl overflow-hidden">
      {/* Background décoratif */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gold/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      {/* Icône */}
      <div className="relative z-10 w-10 h-10 md:w-14 md:h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
        <Icon className="w-5 h-5 md:w-7 md:h-7 text-primary" />
      </div>

      {/* Titre */}
      <h3 className="relative z-10 font-serif text-lg md:text-xl lg:text-2xl text-text-primary mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="relative z-10 text-text-secondary text-sm md:text-base leading-relaxed line-clamp-3">
        {description}
      </p>

      {/* Liseré doré en bas pulsant */}
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.15 }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-gold to-transparent"
      />
    </div>
  )
}

// Composant pour une paire de cartes (sticky row)
function StickyPair({
  pair,
  pairIndex,
  progress,
  range,
  targetScale,
}: {
  pair: typeof pairs[0]
  pairIndex: number
  progress: any
  range: [number, number]
  targetScale: number
}) {
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div className="sticky top-0 flex items-center justify-center w-full px-4 sm:px-6 lg:px-8">
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${pairIndex * 25 + 150}px)`,
        }}
        className="relative -top-1/4 origin-top w-full max-w-6xl"
      >
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 ${pair.photoLeft ? '' : 'md:flex-row-reverse'}`}>
          {pair.photoLeft ? (
            <>
              <PhotoCard src={pair.photo.src} alt={pair.photo.alt} index={pairIndex} />
              <TextCard {...pair.text} index={pairIndex} />
            </>
          ) : (
            <>
              <TextCard {...pair.text} index={pairIndex} />
              <PhotoCard src={pair.photo.src} alt={pair.photo.alt} index={pairIndex} />
            </>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export function ValuesSectionV2() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section className="relative bg-background">
      {/* Ligne dorée pulsante en haut */}
      <PulsingGoldLine position="top" fromDirection="center" />

      {/* Header */}
      <div className="container-wide py-16 md:py-20">
        <div className="text-center">
          <AnimatedSection>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-text-primary mb-4">
              Nos valeurs
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Les principes qui guident notre engagement au quotidien
              pour vous offrir un service d'excellence.
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* Paires sticky */}
      <main
        ref={containerRef}
        className="relative flex w-full flex-col items-center justify-center pb-[50vh] pt-[5vh] sm:pb-[60vh] sm:pt-[8vh] lg:pb-[70vh] lg:pt-[10vh]"
      >
        {pairs.map((pair, i) => {
          const targetScale = Math.max(0.6, 1 - (pairs.length - i - 1) * 0.08)
          return (
            <StickyPair
              key={`pair_${i}`}
              pair={pair}
              pairIndex={i}
              progress={scrollYProgress}
              range={[i * 0.2, 1]}
              targetScale={targetScale}
            />
          )
        })}
      </main>

      {/* Ligne dorée pulsante en bas */}
      <PulsingGoldLine position="bottom" fromDirection="center" />
    </section>
  )
}
