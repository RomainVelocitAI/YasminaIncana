import { unstable_noStore as noStore } from 'next/cache'
import { Hero } from '@/components/home/Hero'
import { AboutPreview } from '@/components/home/AboutPreview'
import { ServicesPreview } from '@/components/home/ServicesPreview'
import { FeaturedProperties } from '@/components/home/FeaturedProperties'
import { CalculatorCTA } from '@/components/home/CalculatorCTA'
import { ContactBanner } from '@/components/home/ContactBanner'
import { getFeaturedProperties } from '@/lib/properties'

export default async function HomePage() {
  noStore()

  // Récupérer les biens mis en avant depuis Supabase
  const featuredProperties = await getFeaturedProperties()

  return (
    <>
      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <FeaturedProperties properties={featuredProperties} />
      <CalculatorCTA />
      <ContactBanner />
    </>
  )
}
