'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Suspense } from 'react'
import { PropertyCard } from '@/components/properties/PropertyCard'
import { PropertyFilters } from '@/components/properties/PropertyFilters'
import { PulsingGoldLine } from '@/components/animations/SectionDivider'
import type { PropertyWithRelations, PropertyType } from '@/lib/types'

interface BiensContentProps {
  properties: PropertyWithRelations[]
  propertyTypes: PropertyType[]
  cities: string[]
}

export function BiensContent({ properties, propertyTypes, cities }: BiensContentProps) {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const contentY = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <section ref={sectionRef} className="py-12 md:py-20 relative overflow-hidden">
      {/* Ligne dorée pulsante en haut */}
      <PulsingGoldLine position="top" fromDirection="left" />

      {/* Pattern de fond subtil */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, var(--primary) 1px, transparent 0)`,
        backgroundSize: '48px 48px'
      }} />

      <motion.div style={{ y: contentY }} className="container-wide relative">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-32">
              <div className="bg-surface border border-border-light p-6 relative shadow-sm">
                {/* Coins dorés */}
                <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-gold/60" />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-gold/60" />

                <Suspense fallback={<div className="text-text-muted">Chargement...</div>}>
                  <PropertyFilters propertyTypes={propertyTypes} cities={cities} />
                </Suspense>
              </div>
            </div>
          </aside>

          {/* Properties grid */}
          <div className="lg:col-span-3">
            {properties.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {properties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <PropertyCard
                      property={property}
                      index={index}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16 bg-secondary/30 border border-border-light relative"
              >
                {/* Coins dorés */}
                <div className="absolute -top-2 -left-2 w-10 h-10 border-t-2 border-l-2 border-gold/40" />
                <div className="absolute -bottom-2 -right-2 w-10 h-10 border-b-2 border-r-2 border-gold/40" />

                <p className="text-text-muted text-lg">
                  Aucun bien ne correspond à vos critères.
                </p>
                <p className="text-text-muted mt-2">
                  Essayez de modifier vos filtres.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Ligne dorée pulsante en bas */}
      <PulsingGoldLine position="bottom" fromDirection="right" />
    </section>
  )
}
