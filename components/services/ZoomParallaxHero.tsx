'use client'

import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import { services } from '@/content/services'

// Images pour le zoom parallax - photos en lien avec les services notariaux
const images = [
  { src: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop', alt: 'Immobilier - Maison moderne' },
  { src: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop', alt: 'Famille heureuse' },
  { src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop', alt: 'Entreprise - Réunion' },
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop', alt: 'Villa luxueuse' },
  { src: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&h=600&fit=crop', alt: 'Immeuble de bureaux' },
  { src: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&h=600&fit=crop', alt: 'Documents juridiques' },
  { src: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&h=600&fit=crop', alt: 'La Réunion - Paysage' },
]

export function ZoomParallaxHero() {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4])
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5])
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6])
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8])
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9])

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9]

  // Animations pour le texte
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -100])

  return (
    <div ref={container} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-text-primary">
        {/* Overlay sombre pour le texte lisible */}
        <div className="absolute inset-0 bg-text-primary/60 z-10 pointer-events-none" />

        {/* Texte central */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <span className="h-px w-16 bg-gold" />
            <span className="text-gold text-sm uppercase tracking-[0.3em] font-medium">
              Notre expertise
            </span>
            <span className="h-px w-16 bg-gold" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-8 leading-tight max-w-5xl"
          >
            Des services juridiques
            <br />
            <span className="text-gold">à votre service</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Un accompagnement complet et personnalisé pour sécuriser
            vos projets immobiliers, protéger votre famille et développer votre patrimoine.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 pointer-events-auto"
          >
            {services.map((service, i) => (
              <motion.a
                key={service.slug}
                href={`#service-${service.slug}`}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border border-white/30 text-white hover:bg-white hover:text-text-primary transition-all duration-300 backdrop-blur-sm"
              >
                <span className="text-gold mr-2">0{i + 1}</span>
                {service.title}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
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

        {/* Images parallax */}
        {images.map(({ src, alt }, index) => {
          const scale = scales[index % scales.length]

          return (
            <motion.div
              key={index}
              style={{ scale }}
              className={`absolute top-0 flex h-full w-full items-center justify-center ${
                index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : ''
              } ${
                index === 2 ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]' : ''
              } ${
                index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''
              } ${
                index === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : ''
              } ${
                index === 5 ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]' : ''
              } ${
                index === 6 ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]' : ''
              }`}
            >
              <div className="relative h-[25vh] w-[25vw] overflow-hidden rounded-lg shadow-2xl">
                <img
                  src={src}
                  alt={alt}
                  className="h-full w-full object-cover"
                />
                {/* Liseré doré subtil */}
                <motion.div
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
                  className="absolute inset-0 border-2 border-gold/50 rounded-lg pointer-events-none"
                />
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
