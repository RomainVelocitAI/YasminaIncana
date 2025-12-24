'use client'

import { motion } from 'framer-motion'

interface Bubble {
  id: number
  size: number
  x: number
  initialY: number
  delay: number
  duration: number
}

interface FloatingBubblesProps {
  count?: number
  variant?: 'light' | 'primary' | 'gold'
  className?: string
}

export function FloatingBubbles({
  count = 8,
  variant = 'primary',
  className = ''
}: FloatingBubblesProps) {
  // Générer les bulles de manière déterministe avec positions initiales variées
  const bubbles: Bubble[] = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: 60 + (i * 40) % 120, // Entre 60 et 180px - plus grandes
    x: (i * 13 + 5) % 90, // Position horizontale répartie (5% à 95%)
    initialY: (i * 25) % 100, // Position verticale initiale variée
    delay: i * 0.3, // Délais plus courts
    duration: 12 + (i * 2) % 8, // Entre 12 et 20s - plus rapide
  }))

  const colorClasses = {
    light: 'bg-white/10 border-white/20',
    primary: 'bg-primary/8 border-primary/15',
    gold: 'bg-gold/10 border-gold/20',
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className={`absolute rounded-full border-2 ${colorClasses[variant]}`}
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.x}%`,
            bottom: `${bubble.initialY - 20}%`,
          }}
          animate={{
            y: [0, -800],
            x: [0, Math.sin(bubble.id * 2) * 30, 0],
            scale: [1, 1.1, 1],
          }}
          initial={{ opacity: 0.7 }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
