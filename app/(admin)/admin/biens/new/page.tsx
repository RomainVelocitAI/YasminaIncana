import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PropertyForm } from '@/components/admin/PropertyForm'
import { PropertyType } from '@/lib/types'

async function getPropertyTypes(): Promise<PropertyType[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('property_types')
      .select('*')
      .order('display_order')

    if (error) throw error

    return data as PropertyType[]
  } catch {
    return [
      { id: '1', name: 'Maison', slug: 'maison', icon: 'Home', display_order: 1, created_at: '' },
      { id: '2', name: 'Appartement', slug: 'appartement', icon: 'Building', display_order: 2, created_at: '' },
      { id: '3', name: 'Terrain', slug: 'terrain', icon: 'Map', display_order: 3, created_at: '' },
      { id: '4', name: 'Local commercial', slug: 'local-commercial', icon: 'Store', display_order: 4, created_at: '' },
    ]
  }
}

export default async function NewPropertyPage() {
  const propertyTypes = await getPropertyTypes()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/admin/biens"
          className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Retour à la liste</span>
        </Link>

        <h1 className="font-serif text-3xl text-text-primary">
          Ajouter un bien
        </h1>
        <p className="text-text-muted mt-1">
          Créez une nouvelle annonce immobilière
        </p>
      </div>

      {/* Form */}
      <PropertyForm propertyTypes={propertyTypes} />
    </div>
  )
}
