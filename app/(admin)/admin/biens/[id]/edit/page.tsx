import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PropertyForm } from '@/components/admin/PropertyForm'
import { Property, PropertyType, PropertyImage } from '@/lib/types'

interface EditPropertyPageProps {
  params: Promise<{ id: string }>
}

type PropertyWithImages = Property & { images?: PropertyImage[] }

async function getProperty(id: string): Promise<PropertyWithImages | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('properties')
      .select(`
        *,
        images:property_images(*)
      `)
      .eq('id', id)
      .single()

    if (error) throw error

    // Trier les images par display_order
    if (data.images) {
      data.images.sort((a: PropertyImage, b: PropertyImage) => a.display_order - b.display_order)
    }

    return data as PropertyWithImages
  } catch {
    return null
  }
}

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
    ]
  }
}

export default async function EditPropertyPage({ params }: EditPropertyPageProps) {
  const { id } = await params
  const [property, propertyTypes] = await Promise.all([
    getProperty(id),
    getPropertyTypes(),
  ])

  if (!property) {
    notFound()
  }

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
          Modifier le bien
        </h1>
        <p className="text-text-muted mt-1">{property.title}</p>
      </div>

      {/* Form */}
      <PropertyForm property={property} propertyTypes={propertyTypes} />
    </div>
  )
}
