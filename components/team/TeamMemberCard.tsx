'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { TeamMember } from '@/lib/types'

interface TeamMemberCardProps {
  member: TeamMember
  index?: number
}

export function TeamMemberCard({ member, index = 0 }: TeamMemberCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const card = cardRef.current
    if (!card) return

    const { left, top, width, height } = card.getBoundingClientRect()
    const x = e.clientX - left
    const y = e.clientY - top

    const rotateX = ((y - height / 2) / height) * 20
    const rotateY = ((x - width / 2) / width) * -20

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)'
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group"
      style={{ perspective: '1000px' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative transition-transform duration-300 ease-out cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Image container avec effet 3D profondeur */}
        <div
          className="relative aspect-[3/4] overflow-hidden bg-white/10 shadow-2xl"
          style={{ transform: 'translateZ(30px)' }}
        >
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-text-primary/90 via-text-primary/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

          {/* Light reflection effect - flottant */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ transform: 'translateZ(50px)' }}
          />

          {/* Contact on hover - flottant */}
          {member.email && (
            <div
              className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0"
              style={{ transform: 'translateZ(60px)' }}
            >
              <a
                href={`mailto:${member.email}`}
                className="flex items-center gap-2 text-white hover:text-gold transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">{member.email}</span>
              </a>
            </div>
          )}
        </div>

        {/* Decorative frame - en arrière */}
        <div
          className="absolute -bottom-4 -right-4 w-full h-full border border-gold/40 -z-10"
          style={{ transform: 'translateZ(-30px)' }}
        />

        {/* Coins dorés - flottants */}
        <div
          className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-gold"
          style={{ transform: 'translateZ(40px)' }}
        />
        <div
          className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-gold"
          style={{ transform: 'translateZ(40px)' }}
        />
      </div>

      {/* Info - Texte blanc pour fond bleu */}
      <div className="mt-6">
        <h3 className="font-serif text-2xl text-white group-hover:text-gold transition-colors">
          {member.name}
        </h3>
        <p className="text-gold text-sm uppercase tracking-wider mt-1 mb-4">
          {member.role}
        </p>
        <p className="text-white/80 text-sm leading-relaxed">
          {member.bio}
        </p>

        {/* Specialties */}
        {member.specialties && member.specialties.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {member.specialties.map((specialty) => (
              <span
                key={specialty}
                className="text-xs text-white/90 bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1"
              >
                {specialty}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  )
}
