'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin, Maximize, BedDouble } from 'lucide-react'
import { motion } from 'framer-motion'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/animations/AnimatedSection'
import { formatPrice, PropertyWithRelations, PropertyStatus } from '@/lib/types'
import { Badge } from '@/components/ui/badge'

interface DisplayProperty {
  id: string
  title: string
  slug: string
  price: number
  city: string
  surface: number | null
  bedrooms: number | null
  status: PropertyStatus
  imageUrl: string
}

const statusLabels = {
  available: { label: 'Disponible', color: 'bg-status-available' },
  under_offer: { label: 'Sous offre', color: 'bg-status-offer' },
  sold: { label: 'Vendu', color: 'bg-status-sold' },
}

function mapToDisplayProperty(property: PropertyWithRelations): DisplayProperty {
  const coverImage = property.images?.find((img) => img.is_cover) || property.images?.[0]
  return {
    id: property.id,
    title: property.title,
    slug: property.slug,
    price: property.price,
    city: property.city,
    surface: property.surface,
    bedrooms: property.bedrooms,
    status: property.status,
    imageUrl: coverImage?.url || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
  }
}

interface FeaturedPropertiesProps {
  properties: PropertyWithRelations[]
}

export function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  // Ne rien afficher si pas de biens
  if (!properties || properties.length === 0) {
    return null
  }

  const displayProperties: DisplayProperty[] = properties.map(mapToDisplayProperty)

  return (
    <section className="py-24 md:py-32 bg-background relative">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-wide relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <AnimatedSection>
              <div className="flex items-center gap-4 mb-4">
                <span className="section-number">03</span>
                <span className="h-px w-12 bg-gold" />
                <span className="text-text-muted text-sm uppercase tracking-wider">
                  Immobilier
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-text-primary">
                Biens à la vente
              </h2>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.2}>
            <Link
              href="/biens"
              className="group inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
            >
              <span className="font-medium">Voir tous les biens</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </AnimatedSection>
        </div>

        {/* Properties grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayProperties.slice(0, 3).map((property) => (
            <StaggerItem key={property.id}>
              <Link href={`/biens/${property.slug}`} className="group block">
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="bg-surface border border-border-light hover:border-primary/20 overflow-hidden transition-all duration-500"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={property.imageUrl}
                      alt={property.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Status badge */}
                    {property.status !== 'available' && (
                      <Badge
                        className={`absolute top-4 left-4 ${statusLabels[property.status].color} text-white border-0`}
                      >
                        {statusLabels[property.status].label}
                      </Badge>
                    )}
                    {/* Price overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-text-primary/80 to-transparent p-4">
                      <p className="font-serif text-2xl text-white">
                        {formatPrice(property.price)}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-serif text-xl text-text-primary mb-3 group-hover:text-primary transition-colors line-clamp-1">
                      {property.title}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-text-muted text-sm mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>{property.city}</span>
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
                    </div>
                  </div>
                </motion.article>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
