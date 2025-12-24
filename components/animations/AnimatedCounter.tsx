'use client'

import { motion, useInView, useSpring, useTransform } from 'framer-motion'
import { useRef, useEffect } from 'react'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const spring = useSpring(0, {
    stiffness: 50,
    damping: 30,
    duration: duration * 1000,
  })

  const display = useTransform(spring, (latest) => Math.round(latest))

  useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [isInView, spring, value])

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  )
}

// Stats block with counter
interface StatBlockProps {
  value: number
  suffix?: string
  label: string
  delay?: number
  dark?: boolean
}

export function StatBlock({ value, suffix = '', label, delay = 0, dark = false }: StatBlockProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className={`font-serif text-4xl md:text-5xl mb-2 ${dark ? 'text-white' : 'text-primary'}`}>
        <AnimatedCounter value={value} suffix={suffix} />
      </div>
      <div className={`text-sm uppercase tracking-widest ${dark ? 'text-white/60' : 'text-text-muted'}`}>
        {label}
      </div>
    </motion.div>
  )
}
