'use client'

import React, { useRef, ReactNode } from 'react'

interface Card3DProps {
  children: ReactNode
  className?: string
  intensity?: number // 1-30, default 15
  scale?: number // hover scale, default 1.02
}

export function Card3D({
  children,
  className = '',
  intensity = 15,
  scale = 1.02
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const card = cardRef.current
    if (!card) return

    const { left, top, width, height } = card.getBoundingClientRect()
    const x = e.clientX - left
    const y = e.clientY - top

    // Calculate rotation angles
    const rotateX = ((y - height / 2) / height) * intensity
    const rotateY = ((x - width / 2) / width) * -intensity

    // Apply 3D transform with a slight scale on hover
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    // Reset transform on mouse leave with smooth transition
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)'
  }

  return (
    <div style={{ perspective: '1000px' }}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`transition-transform duration-300 ease-out ${className}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </div>
    </div>
  )
}

// Wrapper pour les éléments qui doivent "flotter" en 3D
export function Card3DContent({
  children,
  className = '',
  depth = 50
}: {
  children: ReactNode
  className?: string
  depth?: number
}) {
  return (
    <div className={className} style={{ transform: `translateZ(${depth}px)` }}>
      {children}
    </div>
  )
}
