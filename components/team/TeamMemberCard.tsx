'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { TeamMember } from '@/lib/types'

interface TeamMemberCardProps {
  member: TeamMember
  index?: number
}

export function TeamMemberCard({ member, index = 0 }: TeamMemberCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group"
    >
      <div className="relative">
        {/* Image container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-text-primary/80 via-text-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Contact on hover */}
          {member.email && (
            <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
              <a
                href={`mailto:${member.email}`}
                className="flex items-center gap-2 text-white/90 hover:text-gold transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">{member.email}</span>
              </a>
            </div>
          )}
        </div>

        {/* Decorative frame */}
        <div className="absolute -bottom-3 -right-3 w-full h-full border border-gold/20 -z-10 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />
      </div>

      {/* Info */}
      <div className="mt-6">
        <h3 className="font-serif text-2xl text-text-primary group-hover:text-primary transition-colors">
          {member.name}
        </h3>
        <p className="text-primary text-sm uppercase tracking-wider mt-1 mb-4">
          {member.role}
        </p>
        <p className="text-text-secondary text-sm leading-relaxed">
          {member.bio}
        </p>

        {/* Specialties */}
        {member.specialties && member.specialties.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {member.specialties.map((specialty) => (
              <span
                key={specialty}
                className="text-xs text-text-muted bg-secondary px-3 py-1"
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
