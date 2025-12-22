import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { unstable_noStore as noStore } from 'next/cache'
import {
  ArrowLeft,
  MapPin,
  Maximize,
  BedDouble,
  Bath,
  Home,
  Calendar,
  Phone,
  Mail,
  LandPlot,
} from 'lucide-react'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { PropertyGallery } from '@/components/properties/PropertyGallery'
import { StatusBadge } from '@/components/properties/StatusBadge'
import { PriceDisplay } from '@/components/properties/PriceDisplay'
import { DPEScale } from '@/components/properties/DPEBadge'
import { FeaturesList } from '@/components/properties/FeaturesList'
import { getPropertyFieldsConfig } from '@/lib/types'
import { getPropertyBySlug } from '@/lib/properties'
import { Button } from '@/components/ui/button'
import { notaryInfo } from '@/content/team'

interface PropertyPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params
  const property = await getPropertyBySlug(slug)

  if (!property) {
    return { title: 'Bien non trouvé' }
  }

  return {
    title: property.title,
    description: property.description.slice(0, 160),
  }
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  noStore()

  const { slug } = await params
  const property = await getPropertyBySlug(slug)

  if (!property) {
    notFound()
  }

  // Obtenir la configuration des champs pour ce type de bien
  const fieldsConfig = getPropertyFieldsConfig(property.property_type?.slug)

  // Construire les caractéristiques selon le type de bien
  const characteristics = [
    fieldsConfig.surface && property.surface
      ? { icon: Maximize, label: 'Surface', value: `${property.surface} m²` }
      : null,
    fieldsConfig.land_surface && property.land_surface
      ? { icon: LandPlot, label: 'Terrain', value: `${property.land_surface} m²` }
      : null,
    fieldsConfig.rooms && property.rooms
      ? { icon: Home, label: 'Pièces', value: property.rooms.toString() }
      : null,
    fieldsConfig.bedrooms && property.bedrooms
      ? { icon: BedDouble, label: 'Chambres', value: property.bedrooms.toString() }
      : null,
    fieldsConfig.bathrooms && property.bathrooms
      ? { icon: Bath, label: 'Salles de bain', value: property.bathrooms.toString() }
      : null,
    fieldsConfig.year_built && property.year_built
      ? { icon: Calendar, label: 'Année', value: property.year_built.toString() }
      : null,
  ].filter((c): c is NonNullable<typeof c> => c !== null)

  // Vérifier si les diagnostics doivent être affichés
  const showDiagnostics =
    (fieldsConfig.energy_rating || fieldsConfig.ges_rating) &&
    (property.energy_rating || property.ges_rating)

  // Filtrer les équipements selon le type de bien
  const filteredFeatures =
    fieldsConfig.features && property.features && property.features.length > 0
      ? fieldsConfig.allowedFeatures
        ? property.features.filter((f) => fieldsConfig.allowedFeatures!.includes(f))
        : property.features
      : []

  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-8 md:pt-36">
        <div className="container-wide">
          <AnimatedSection>
            <Link
              href="/biens"
              className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Retour aux biens</span>
            </Link>
          </AnimatedSection>

          <div className="flex flex-wrap items-start justify-between gap-4">
            <AnimatedSection delay={0.1}>
              <div>
                {property.property_type && (
                  <span className="text-primary text-sm uppercase tracking-wider mb-2 block">
                    {property.property_type.name}
                  </span>
                )}
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-text-primary">
                  {property.title}
                </h1>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <StatusBadge status={property.status} size="lg" />
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.3}>
            <div className="flex items-center gap-2 text-text-muted mt-4">
              <MapPin className="w-4 h-4" />
              <span>
                {property.address && `${property.address}, `}
                {property.postal_code} {property.city}
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Gallery & Content */}
      <section className="pb-16 md:pb-24">
        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Main content */}
            <div className="lg:col-span-8">
              {/* Gallery */}
              <AnimatedSection>
                <PropertyGallery images={property.images} title={property.title} />
              </AnimatedSection>

              {/* Characteristics */}
              {characteristics.length > 0 && (
                <AnimatedSection delay={0.1}>
                  <div className="mt-10">
                    <h2 className="font-serif text-2xl text-text-primary mb-6">
                      Caractéristiques
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {characteristics.map((char) => {
                        const Icon = char.icon
                        return (
                          <div
                            key={char.label}
                            className="flex items-center gap-4 p-4 bg-secondary/30 border border-border-light"
                          >
                            <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0">
                              <Icon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm text-text-muted">{char.label}</p>
                              <p className="text-lg text-text-primary font-medium">
                                {char.value}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Description */}
              <AnimatedSection delay={0.2}>
                <div className="mt-10">
                  <h2 className="font-serif text-2xl text-text-primary mb-6">
                    Description
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    {property.description.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="text-text-secondary leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Features */}
              {filteredFeatures.length > 0 && (
                <AnimatedSection delay={0.3}>
                  <div className="mt-10">
                    <h2 className="font-serif text-2xl text-text-primary mb-6">
                      Équipements
                    </h2>
                    <FeaturesList features={filteredFeatures} />
                  </div>
                </AnimatedSection>
              )}

              {/* DPE/GES */}
              {showDiagnostics && (
                <AnimatedSection delay={0.4}>
                  <div className="mt-10">
                    <h2 className="font-serif text-2xl text-text-primary mb-6">
                      Diagnostics énergétiques
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                      {fieldsConfig.energy_rating && property.energy_rating && property.energy_rating !== 'NS' && (
                        <DPEScale rating={property.energy_rating} type="dpe" />
                      )}
                      {fieldsConfig.ges_rating && property.ges_rating && property.ges_rating !== 'NS' && (
                        <DPEScale rating={property.ges_rating} type="ges" />
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <AnimatedSection direction="left">
                <div className="sticky top-28 space-y-6">
                  {/* Price card */}
                  <div className="bg-surface border border-border-light p-6">
                    <PriceDisplay price={property.price} size="xl" />
                    <p className="text-text-muted text-sm mt-2">
                      Honoraires à la charge du vendeur
                    </p>

                    {property.reference && (
                      <p className="text-sm text-text-muted mt-4 pt-4 border-t border-border-light">
                        Référence : {property.reference}
                      </p>
                    )}
                  </div>

                  {/* Contact card */}
                  <div className="bg-primary text-white p-6">
                    <h3 className="font-serif text-xl mb-4">
                      Intéressé par ce bien ?
                    </h3>
                    <p className="text-white/80 text-sm mb-6">
                      Contactez-nous pour organiser une visite ou obtenir plus
                      d'informations.
                    </p>

                    <div className="space-y-4">
                      <a
                        href={`tel:${notaryInfo.phone.replace(/\s/g, '')}`}
                        className="flex items-center gap-3 text-white/90 hover:text-white transition-colors"
                      >
                        <Phone className="w-5 h-5" />
                        <span>{notaryInfo.phone}</span>
                      </a>
                      <a
                        href={`mailto:${notaryInfo.email}?subject=Demande d'information - ${property.reference}`}
                        className="flex items-center gap-3 text-white/90 hover:text-white transition-colors break-all"
                      >
                        <Mail className="w-5 h-5 shrink-0" />
                        <span className="text-sm">{notaryInfo.email}</span>
                      </a>
                    </div>

                    <Button
                      asChild
                      variant="secondary"
                      className="w-full mt-6 bg-white text-primary hover:bg-white/90"
                    >
                      <Link href={`/contact?bien=${property.reference}`}>
                        Demander des informations
                      </Link>
                    </Button>
                  </div>

                  {/* Location */}
                  <div className="bg-surface border border-border-light p-6">
                    <h3 className="font-serif text-lg text-text-primary mb-4">
                      Localisation
                    </h3>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div className="text-text-secondary text-sm">
                        {property.address && <p>{property.address}</p>}
                        <p>
                          {property.postal_code} {property.city}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
