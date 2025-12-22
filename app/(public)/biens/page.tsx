import { Metadata } from 'next'
import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { unstable_noStore as noStore } from 'next/cache'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { PropertyCard } from '@/components/properties/PropertyCard'
import { PropertyFilters } from '@/components/properties/PropertyFilters'
import { getProperties, getPropertyTypes, getCities, hasPublishedProperties } from '@/lib/properties'

export const metadata: Metadata = {
  title: 'Biens à vendre',
  description:
    "Découvrez nos biens immobiliers à vendre à La Réunion : maisons, appartements, terrains. Accompagnement notarial complet.",
}

interface SearchParams {
  type?: string
  city?: string
  priceMin?: string
  priceMax?: string
  surfaceMin?: string
}

export default async function BiensPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  noStore()

  // Vérifier s'il y a des biens publiés
  const hasProperties = await hasPublishedProperties()

  // Si aucun bien, rediriger vers l'accueil
  if (!hasProperties) {
    redirect('/')
  }

  const params = await searchParams
  const [properties, propertyTypes, cities] = await Promise.all([
    getProperties(params),
    getPropertyTypes(),
    getCities(),
  ])

  const availableCount = properties.filter((p) => p.status === 'available').length

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />

        <div className="container-wide relative">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-gold" />
              <span className="text-gold text-sm uppercase tracking-[0.2em]">
                Immobilier
              </span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text-primary mb-4">
              Nos biens à la vente
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-xl text-text-secondary">
              {availableCount} bien{availableCount > 1 ? 's' : ''} disponible
              {availableCount > 1 ? 's' : ''}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="py-12 md:py-16">
        <div className="container-wide">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters sidebar */}
            <aside className="lg:col-span-1">
              <Suspense fallback={<div>Chargement...</div>}>
                <PropertyFilters propertyTypes={propertyTypes} cities={cities} />
              </Suspense>
            </aside>

            {/* Properties grid */}
            <div className="lg:col-span-3">
              {properties.length > 0 ? (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {properties.map((property, index) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-text-muted text-lg">
                    Aucun bien ne correspond à vos critères.
                  </p>
                  <p className="text-text-muted mt-2">
                    Essayez de modifier vos filtres.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
