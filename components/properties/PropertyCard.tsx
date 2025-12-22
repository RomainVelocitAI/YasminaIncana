'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin, Maximize, BedDouble, Bath } from 'lucide-react'
import { formatPrice, PropertyWithRelations } from '@/lib/types'
import { StatusBadge } from './StatusBadge'

interface PropertyCardProps {
  property: PropertyWithRelations
  index?: number
}

export function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const coverImage = property.images?.find((img) => img.is_cover) || property.images?.[0]

  return (
    <Link href={`/biens/${property.slug}`} className="group block">
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        whileHover={{ y: -6 }}
        className="bg-surface border border-border-light hover:border-primary/20 overflow-hidden transition-all duration-500"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
          {coverImage ? (
            <Image
              src={coverImage.url}
              alt={coverImage.alt_text || property.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-text-muted">
              Pas d'image
            </div>
          )}

          {/* Status badge */}
          {property.status !== 'available' && (
            <div className="absolute top-4 left-4">
              <StatusBadge status={property.status} />
            </div>
          )}

          {/* Price overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-text-primary/80 to-transparent p-4">
            <p className="font-serif text-2xl text-white">
              {formatPrice(property.price)}
            </p>
          </div>

          {/* Property type badge */}
          {property.property_type && (
            <div className="absolute top-4 right-4 bg-surface/90 backdrop-blur-sm px-3 py-1 text-xs text-text-primary">
              {property.property_type.name}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-serif text-xl text-text-primary mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-2 text-text-muted text-sm mb-4">
            <MapPin className="w-4 h-4" />
            <span>{property.city}</span>
            {property.postal_code && (
              <span className="text-text-muted/50">({property.postal_code})</span>
            )}
          </div>

          {/* Features */}
          <div className="flex items-center gap-4 pt-4 border-t border-border-light">
            {property.surface && (
              <div className="flex items-center gap-2 text-text-secondary text-sm">
                <Maximize className="w-4 h-4 text-text-muted" />
                <span>{property.surface} m²</span>
              </div>
            )}
            {property.bedrooms && property.bedrooms > 0 && (
              <div className="flex items-center gap-2 text-text-secondary text-sm">
                <BedDouble className="w-4 h-4 text-text-muted" />
                <span>{property.bedrooms} ch.</span>
              </div>
            )}
            {property.bathrooms && property.bathrooms > 0 && (
              <div className="flex items-center gap-2 text-text-secondary text-sm">
                <Bath className="w-4 h-4 text-text-muted" />
                <span>{property.bathrooms}</span>
              </div>
            )}
            {property.rooms && (
              <div className="flex items-center gap-2 text-text-secondary text-sm">
                <span className="text-text-muted">|</span>
                <span>{property.rooms} pièces</span>
              </div>
            )}
          </div>

          {/* Reference */}
          {property.reference && (
            <p className="text-xs text-text-muted mt-4">
              Réf. {property.reference}
            </p>
          )}
        </div>
      </motion.article>
    </Link>
  )
}
