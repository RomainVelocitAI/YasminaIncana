'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Configuration des 5 fragments asymétriques qui couvrent 100% de l'image
// Découpage calculé pour s'emboîter parfaitement :
//
// ┌─────────────────────┬───────────────┐
// │                     │               │
// │      FRAG 0         │    FRAG 1     │  <- ligne à 45%
// │   (0-60% largeur)   │  (60-100%)    │
// │                     │               │
// ├──────────┬──────────┴───────────────┤  <- ligne à 45%
// │          │                          │
// │  FRAG 2  │        FRAG 3            │  <- ligne à 70%
// │ (0-35%)  │      (35-100%)           │
// │          │                          │
// ├──────────┴─────────────┬────────────┤  <- ligne à 70%
// │                        │            │
// │       FRAG 4           │   (vide)   │
// │    (0-65% largeur)     │            │
// └────────────────────────┴────────────┘
//
const fragments = [
  {
    id: 0,
    // Grand rectangle en haut-gauche (60% largeur x 45% hauteur)
    clipPath: 'inset(0% 40% 55% 0%)',
    startX: -280,
    startY: -200,
    startRotate: -15,
    startScale: 0.85,
    zIndex: 3,
  },
  {
    id: 1,
    // Rectangle en haut-droite (40% largeur x 45% hauteur)
    clipPath: 'inset(0% 0% 55% 60%)',
    startX: 300,
    startY: -180,
    startRotate: 12,
    startScale: 0.9,
    zIndex: 5,
  },
  {
    id: 2,
    // Petit carré milieu-gauche (35% largeur x 25% hauteur)
    clipPath: 'inset(45% 65% 30% 0%)',
    startX: -320,
    startY: 100,
    startRotate: -8,
    startScale: 0.75,
    zIndex: 2,
  },
  {
    id: 3,
    // Grand rectangle milieu-droite (65% largeur x 25% hauteur)
    clipPath: 'inset(45% 0% 30% 35%)',
    startX: 250,
    startY: 150,
    startRotate: 10,
    startScale: 0.8,
    zIndex: 4,
  },
  {
    id: 4,
    // Rectangle en bas (100% largeur x 30% hauteur)
    clipPath: 'inset(70% 0% 0% 0%)',
    startX: 0,
    startY: 250,
    startRotate: 5,
    startScale: 0.95,
    zIndex: 1,
  },
]

// Composant fragment vidéo
function VideoFragment({
  fragment,
  scrollYProgress,
  videoRef,
}: {
  fragment: typeof fragments[0]
  scrollYProgress: any
  videoRef: React.RefObject<HTMLVideoElement | null>
}) {
  const { startX, startY, startRotate, startScale, clipPath, zIndex } = fragment

  // Timing décalé pour chaque fragment (arrivée progressive)
  const delay = fragment.id * 0.03
  const animStart = delay
  const animEnd = 0.5 + delay

  // Animation au scroll : de dispersé (0) à assemblé (1)
  const x = useTransform(scrollYProgress, [animStart, animEnd], [startX, 0])
  const y = useTransform(scrollYProgress, [animStart, animEnd], [startY, 0])
  const rotate = useTransform(scrollYProgress, [animStart, animEnd], [startRotate, 0])
  const scale = useTransform(scrollYProgress, [animStart, animEnd], [startScale, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.85, 1])

  return (
    <motion.div
      style={{ x, y, rotate, scale, opacity, zIndex }}
      className="absolute inset-0 overflow-hidden"
    >
      <div
        style={{ clipPath }}
        className="w-full h-full"
      >
        <video
          ref={fragment.id === 0 ? videoRef : undefined}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://res.cloudinary.com/dqd514udc/video/upload/v1766426510/Untitled_Made_with_FlexClip_2_vfi121.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </motion.div>
  )
}

export function HeroV3() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoTime, setVideoTime] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Synchroniser toutes les vidéos
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const syncVideos = () => {
      setVideoTime(video.currentTime)
    }

    video.addEventListener('timeupdate', syncVideos)
    return () => video.removeEventListener('timeupdate', syncVideos)
  }, [])

  // Animation du contenu texte
  const textOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1])
  const textY = useTransform(scrollYProgress, [0.5, 0.8], [50, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[200vh] bg-background"
    >
      {/* Zone sticky pour l'animation */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Container des fragments vidéo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-5xl aspect-video mx-auto">
            {fragments.map((fragment) => (
              <VideoFragment
                key={fragment.id}
                fragment={fragment}
                scrollYProgress={scrollYProgress}
                videoRef={videoRef}
              />
            ))}

            {/* Bordure qui apparaît quand assemblé */}
            <motion.div
              style={{
                opacity: useTransform(scrollYProgress, [0.5, 0.7], [0, 1]),
              }}
              className="absolute inset-0 border-4 border-primary/20 pointer-events-none"
            />
          </div>
        </div>

        {/* Contenu texte qui apparaît après assemblage */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute bottom-0 left-0 right-0 pb-16 text-center z-10"
        >
          {/* Fond dégradé pour lisibilité */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, var(--background) 0%, transparent 100%)',
            }}
          />

          <div className="relative z-10">
            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-gold" />
              <span className="text-gold text-xs uppercase tracking-[0.2em] font-medium">
                Notaire
              </span>
              <span className="h-px w-8 bg-gold" />
            </div>

            {/* H1 Principal */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl text-text-primary mb-3 leading-tight">
              MAÎTRE
              <br />
              <span className="text-primary">INCANA</span>
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
          </div>
        </motion.div>

        {/* Indicateur de scroll */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]),
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        >
          <span className="text-xs text-text-muted uppercase tracking-widest block mb-2">
            Défiler pour découvrir
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 border-2 border-primary/30 rounded-full mx-auto flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-3 bg-primary rounded-full mt-2"
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
