'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, Users, Building2, ArrowRight } from 'lucide-react'
import { Service } from '@/lib/types'

const iconMap: Record<string, React.ElementType> = {
  Home,
  Users,
  Building2,
}

interface ServiceCardProps {
  service: Service
  index?: number
  variant?: 'default' | 'compact'
}

export function ServiceCard({ service, index = 0, variant = 'default' }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Home

  if (variant === 'compact') {
    return (
      <Link href={`/${service.slug}`} className="group block">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ x: 8 }}
          className="flex items-center gap-4 p-4 border-b border-border-light hover:bg-secondary/30 transition-all"
        >
          <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
            <Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-lg text-text-primary group-hover:text-primary transition-colors">
              {service.title}
            </h3>
            <p className="text-sm text-text-muted truncate">
              {service.shortDescription}
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-primary transition-all group-hover:translate-x-1" />
        </motion.article>
      </Link>
    )
  }

  return (
    <Link href={`/${service.slug}`} className="group block h-full">
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15, duration: 0.6 }}
        whileHover={{ y: -8 }}
        className="bg-surface h-full p-8 lg:p-10 border border-border-light hover:border-primary/30 transition-all duration-500 relative overflow-hidden"
      >
        {/* Icon */}
        <div className="relative mb-8">
          <div className="w-16 h-16 flex items-center justify-center bg-primary/5 group-hover:bg-primary transition-colors duration-500">
            <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-500" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-16 h-16 border border-gold/20 -z-10" />
        </div>

        {/* Content */}
        <h3 className="font-serif text-2xl text-text-primary mb-4 group-hover:text-primary transition-colors">
          {service.title}
        </h3>
        <p className="text-text-secondary mb-6 leading-relaxed">
          {service.shortDescription}
        </p>

        {/* Prestations preview */}
        <ul className="space-y-2 mb-6">
          {service.prestations.slice(0, 3).map((prestation) => (
            <li
              key={prestation}
              className="flex items-center gap-2 text-sm text-text-muted"
            >
              <span className="w-1 h-1 bg-gold rounded-full" />
              {prestation}
            </li>
          ))}
          {service.prestations.length > 3 && (
            <li className="text-sm text-primary">
              +{service.prestations.length - 3} autres prestations
            </li>
          )}
        </ul>

        {/* Link */}
        <div className="flex items-center gap-2 text-primary font-medium">
          <span className="text-sm uppercase tracking-wider">En savoir plus</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
        </div>

        {/* Bottom line decoration */}
        <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500" />
      </motion.article>
    </Link>
  )
}
