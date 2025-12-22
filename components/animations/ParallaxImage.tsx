'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  speed?: number
  overlay?: boolean
  overlayOpacity?: number
}

export function ParallaxImage({
  src,
  alt,
  className = '',
  speed = 0.3,
  overlay = false,
  overlayOpacity = 0.4,
}: ParallaxImageProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.05, 1.1])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </motion.div>
      {overlay && (
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"
          style={{ opacity: overlayOpacity }}
        />
      )}
    </div>
  )
}

// Simple parallax div for decorative elements
interface ParallaxElementProps {
  children: React.ReactNode
  className?: string
  speed?: number
}

export function ParallaxElement({
  children,
  className = '',
  speed = 0.2,
}: ParallaxElementProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [`${speed * -100}px`, `${speed * 100}px`])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
