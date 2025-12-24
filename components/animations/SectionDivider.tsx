'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

// Ligne dorée décorative avec animation et pulsation
export function GoldLine({
  className = '',
  direction = 'horizontal',
  animated = true,
  pulse = true
}: {
  className?: string
  direction?: 'horizontal' | 'vertical' | 'diagonal'
  animated?: boolean
  pulse?: boolean
}) {
  const lineClass = direction === 'horizontal'
    ? 'h-[2px] w-full'
    : direction === 'vertical'
    ? 'w-[2px] h-full'
    : 'h-[2px] w-full rotate-12 origin-left'

  if (animated) {
    return (
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className={`relative ${lineClass} ${className}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gold/60 via-gold to-gold/60" />
        {pulse && (
          <motion.div
            animate={{
              opacity: [0.4, 1, 0.4],
              scaleX: [0.95, 1.02, 0.95],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          />
        )}
      </motion.div>
    )
  }

  return (
    <div className={`relative ${lineClass} ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-gold/60 via-gold to-gold/60" />
      {pulse && (
        <motion.div
          animate={{
            opacity: [0.4, 1, 0.4],
            scaleX: [0.95, 1.02, 0.95],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
        />
      )}
    </div>
  )
}

// Ligne dorée pulsante pour les sections (utilisable directement)
export function PulsingGoldLine({
  className = '',
  position = 'top',
  fromDirection = 'left'
}: {
  className?: string
  position?: 'top' | 'bottom'
  fromDirection?: 'left' | 'right' | 'center'
}) {
  const originClass = fromDirection === 'left'
    ? 'origin-left'
    : fromDirection === 'right'
    ? 'origin-right'
    : 'origin-center'

  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2 }}
      className={`absolute ${position}-0 left-[10%] right-[10%] h-[2px] ${originClass} ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold to-transparent" />
      <motion.div
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
      />
    </motion.div>
  )
}

// Section avec découpe diagonale
interface DiagonalSectionProps {
  children: React.ReactNode
  bgColor?: string
  direction?: 'left' | 'right'
  className?: string
  showGoldLine?: boolean
  parallax?: boolean
}

export function DiagonalSection({
  children,
  bgColor = 'bg-primary',
  direction = 'right',
  className = '',
  showGoldLine = true,
  parallax = true,
}: DiagonalSectionProps) {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const contentY = useTransform(scrollYProgress, [0, 1], [100, -100])

  // Clip path selon la direction
  const clipPath = direction === 'right'
    ? 'polygon(0 8%, 100% 0, 100% 92%, 0 100%)'
    : 'polygon(0 0, 100% 8%, 100% 100%, 0 92%)'

  return (
    <section ref={sectionRef} className={`relative ${className}`}>
      {/* Fond avec découpe diagonale */}
      <div
        className={`${bgColor} py-32 md:py-48`}
        style={{ clipPath }}
      >
        {/* Ligne dorée en haut */}
        {showGoldLine && (
          <div
            className="absolute top-[8%] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent"
            style={{ transform: direction === 'right' ? 'rotate(-2deg)' : 'rotate(2deg)' }}
          />
        )}

        {/* Contenu avec parallax */}
        {parallax ? (
          <motion.div style={{ y: contentY }}>
            {children}
          </motion.div>
        ) : (
          children
        )}

        {/* Ligne dorée en bas */}
        {showGoldLine && (
          <div
            className="absolute bottom-[8%] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent"
            style={{ transform: direction === 'right' ? 'rotate(-2deg)' : 'rotate(2deg)' }}
          />
        )}
      </div>
    </section>
  )
}

// Section avec triangle qui déborde
interface TriangleSectionProps {
  children: React.ReactNode
  bgColor?: string
  trianglePosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  className?: string
}

export function TriangleSection({
  children,
  bgColor = 'bg-primary',
  trianglePosition = 'bottom-right',
  className = '',
}: TriangleSectionProps) {
  const triangleStyles: Record<string, string> = {
    'top-left': 'top-0 left-0 border-l-[100vw] border-l-transparent border-t-[150px]',
    'top-right': 'top-0 right-0 border-r-[100vw] border-r-transparent border-t-[150px]',
    'bottom-left': 'bottom-0 left-0 border-l-[100vw] border-l-transparent border-b-[150px]',
    'bottom-right': 'bottom-0 right-0 border-r-[100vw] border-r-transparent border-b-[150px]',
  }

  const borderColor = bgColor.replace('bg-', 'border-b-').replace('bg-', 'border-t-')

  return (
    <section className={`relative ${className}`}>
      <div className={`${bgColor} relative`}>
        {children}
      </div>
      {/* Triangle qui déborde */}
      <div
        className={`absolute w-0 h-0 ${triangleStyles[trianglePosition]} ${borderColor}`}
      />
    </section>
  )
}
