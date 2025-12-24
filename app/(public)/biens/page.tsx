import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { unstable_noStore as noStore } from 'next/cache'
import { BiensHero } from '@/components/properties/BiensHero'
import { BiensContent } from '@/components/properties/BiensContent'
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
      {/* Hero avec fond diagonal bleu canard */}
      <BiensHero availableCount={availableCount} />

      {/* Filters & Grid avec animations */}
      <BiensContent
        properties={properties}
        propertyTypes={propertyTypes}
        cities={cities}
      />
    </>
  )
}
