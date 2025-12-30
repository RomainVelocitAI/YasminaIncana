import { unstable_noStore as noStore } from 'next/cache'
import { HeroV2 } from '@/components/home/HeroV2'
import { AboutPreview } from '@/components/home/AboutPreview'
import { ServicesCarousel } from '@/components/home/ServicesCarousel'
import { FeaturedProperties } from '@/components/home/FeaturedProperties'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { ContactBanner } from '@/components/home/ContactBanner'
import { getFeaturedProperties } from '@/lib/properties'

export default async function HomePage() {
  noStore()

  // Récupérer les biens mis en avant depuis Supabase
  const featuredProperties = await getFeaturedProperties()

  return (
    <>
      <HeroV2 />
      <AboutPreview />
      <ServicesCarousel />
      <FeaturedProperties properties={featuredProperties} />
      <TestimonialsSection />
      <ContactBanner />
    </>
  )
}
