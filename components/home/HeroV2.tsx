'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, Users, Building2, Scale, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Configuration des 4 cartes de services
const serviceCards = [
  {
    title: 'Immobilier',
    icon: Home,
    href: '/immobilier',
    size: 'lg' as const,
    position: 'left-outer',
  },
  {
    title: 'Famille',
    icon: Users,
    href: '/famille',
    size: 'md' as const,
    position: 'left-inner',
  },
  {
    title: 'Entreprise',
    icon: Building2,
    href: '/entreprise',
    size: 'md' as const,
    position: 'right-inner',
  },
  {
    title: 'Conseil',
    icon: Scale,
    href: '/services',
    size: 'lg' as const,
    position: 'right-outer',
  },
]

// Composant carte flottante
function FloatingCard({
  title,
  icon: Icon,
  href,
  size,
  index,
}: {
  title: string
  icon: typeof Home
  href: string
  size: 'sm' | 'md' | 'lg'
  index: number
}) {
  // Tailles selon le prop size
  const sizeClasses = {
    sm: 'w-20 h-28 md:w-28 md:h-40',
    md: 'w-24 h-36 md:w-36 md:h-48',
    lg: 'w-28 h-40 md:w-40 md:h-56',
  }

  // Décalages verticaux pour effet asymétrique
  // Index 0 = Immobilier (gauche ext) -> légèrement remonté
  // Index 1 = Famille (gauche int) -> aligné
  // Index 2 = Entreprise (droite int) -> aligné
  // Index 3 = Conseil (droite ext) -> légèrement remonté
  const verticalOffsets = [-20, 0, 0, -20]

  return (
    <motion.div
      className="relative"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: verticalOffsets[index] }}
        transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
      >
        <Link href={href}>
          <motion.div
            animate={{
              y: [0, -12, 0, 8, 0],
              rotate: [-1, 1, -0.5, 0.5, -1],
            }}
            transition={{
              y: {
                duration: 4 + index * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
              },
              rotate: {
                duration: 5 + index * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
            whileHover={{
              scale: 1.08,
              y: -20,
              boxShadow: '0 25px 50px -12px rgba(13, 92, 99, 0.25)',
            }}
            className={`
              ${sizeClasses[size]}
              bg-white/95 backdrop-blur-sm
              border border-border-light
              shadow-lg hover:shadow-2xl
              transition-shadow duration-300
              cursor-pointer
              flex flex-col items-center justify-center
              p-4
              relative
              overflow-hidden
            `}
          >
            {/* Icône service - AGRANDIE */}
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            </div>

            {/* Titre service - AGRANDI */}
            <span className="font-serif text-base md:text-lg lg:text-xl text-center text-text-primary">
              {title}
            </span>

            {/* Accent doré en bas */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold/50 via-gold to-gold/50" />
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  )
}

export function HeroV2() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoEnded, setVideoEnded] = useState(false)

  // Quand la vidéo se termine, afficher l'image de fin
  const handleVideoEnd = () => {
    setVideoEnded(true)
  }

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-background"
    >
      {/* SECTION 1: Vidéo en demi-ellipse */}
      <div className="relative w-full">
        <div
          className="relative overflow-hidden mx-auto"
        >
          <div
            className="relative"
            style={{
              // Ellipse plus douce avec angle moins tranché
              clipPath: 'ellipse(70% 100% at 50% 0%)',
            }}
          >
            {/* Image de fin (affichée quand la vidéo est terminée) */}
            {videoEnded && (
              <img
                src="/images/video-poster.png"
                alt="L'étude notariale"
                className="absolute inset-0 w-full h-[70vh] md:h-[85vh] object-cover z-10"
              />
            )}

            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnd}
              className={`w-full h-[70vh] md:h-[85vh] object-cover ${videoEnded ? 'invisible' : ''}`}
            >
              <source
                src="https://res.cloudinary.com/dqd514udc/video/upload/v1767107638/Film_Yasmina_on3wpz.mov"
                type="video/mp4"
              />
              {/* Fallback image */}
              <img
                src="/images/video-poster.png"
                alt="L'étude notariale"
                className="w-full h-full object-cover"
              />
            </video>

          </div>
        </div>
      </div>

      {/* SECTION 2: Zone cartes + contenu central */}
      {/* 5 éléments au même niveau avec espacement uniforme */}
      <div className="relative z-20 -mt-8 md:-mt-16 pb-16 md:pb-24">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-evenly">

            {/* Carte 1 - Immobilier (gauche ext) - décalée vers l'extérieur */}
            <div className="order-2 md:order-1 md:-ml-8 lg:-ml-16">
              <FloatingCard
                {...serviceCards[0]}
                index={0}
              />
            </div>

            {/* Carte 2 - Famille (gauche int) */}
            <div className="order-3 md:order-2">
              <FloatingCard
                {...serviceCards[1]}
                index={1}
              />
            </div>

            {/* Bloc central : H1 + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center py-6 order-1 md:order-3"
            >
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-center justify-center gap-3 mb-4"
              >
                <span className="h-px w-8 bg-gold" />
                <span className="text-gold text-xs uppercase tracking-[0.2em] font-medium">
                  Notaire
                </span>
                <span className="h-px w-8 bg-gold" />
              </motion.div>

              {/* H1 Principal */}
              <h1 className="font-serif text-3xl md:text-4xl lg:text-6xl text-primary mb-3 leading-tight">
                M<span className="text-[0.9em]">e</span> Yasmina INCANA
              </h1>

              {/* Sous-titre */}
              <p className="text-text-muted text-base md:text-lg lg:text-xl mb-8">
                Notaire à L'Étang Salé
              </p>

              {/* CTA */}
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary-dark text-white px-8 md:px-10 py-6 md:py-7 text-base md:text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20"
              >
                <Link href="/contact">
                  <Phone className="w-4 h-4 mr-2" />
                  Contacter l'étude
                </Link>
              </Button>
            </motion.div>

            {/* Carte 3 - Entreprise (droite int) */}
            <div className="order-4">
              <FloatingCard
                {...serviceCards[2]}
                index={2}
              />
            </div>

            {/* Carte 4 - Conseil (droite ext) - décalée vers l'extérieur */}
            <div className="order-5 md:-mr-8 lg:-mr-16">
              <FloatingCard
                {...serviceCards[3]}
                index={3}
              />
            </div>

          </div>
        </div>
      </div>

      {/* Éléments décoratifs de fond */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Grille subtile */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px),
                             linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Orbe dégradé */}
        <div
          className="absolute top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-gold/5 to-transparent blur-3xl"
        />
      </div>
    </section>
  )
}
