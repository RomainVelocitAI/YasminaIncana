import { unstable_noStore as noStore } from 'next/cache'
import { hasPublishedProperties } from '@/lib/properties'
import { Header } from './Header'

export async function HeaderWrapper() {
  // Désactiver le cache pour toujours avoir les données fraîches
  noStore()

  const showPropertiesLink = await hasPublishedProperties()
  return <Header showPropertiesLink={showPropertiesLink} />
}
