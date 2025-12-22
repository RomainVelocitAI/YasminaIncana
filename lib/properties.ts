import { createClient } from '@/lib/supabase/server'
import { PropertyWithRelations, PropertyType } from '@/lib/types'

// Récupérer les biens publiés avec filtres optionnels
interface GetPropertiesParams {
  type?: string
  city?: string
  priceMin?: string
  priceMax?: string
  surfaceMin?: string
  featured?: boolean
  limit?: number
}

export async function getProperties(params: GetPropertiesParams = {}): Promise<PropertyWithRelations[]> {
  try {
    const supabase = await createClient()

    let query = supabase
      .from('properties')
      .select(`
        *,
        property_type:property_types(*),
        images:property_images(*)
      `)
      .eq('is_published', true)
      .order('created_at', { ascending: false })

    if (params.featured) {
      query = query.eq('is_featured', true)
    }

    if (params.type) {
      query = query.eq('property_type.slug', params.type)
    }

    if (params.city) {
      query = query.eq('city', params.city)
    }

    if (params.priceMin) {
      query = query.gte('price', parseInt(params.priceMin))
    }

    if (params.priceMax) {
      query = query.lte('price', parseInt(params.priceMax))
    }

    if (params.surfaceMin) {
      query = query.gte('surface', parseInt(params.surfaceMin))
    }

    if (params.limit) {
      query = query.limit(params.limit)
    }

    const { data, error } = await query

    if (error) throw error

    return (data as PropertyWithRelations[]) || []
  } catch (error) {
    console.error('Error fetching properties:', error)
    return []
  }
}

// Récupérer un bien par son slug
export async function getPropertyBySlug(slug: string): Promise<PropertyWithRelations | null> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('properties')
      .select(`
        *,
        property_type:property_types(*),
        images:property_images(*)
      `)
      .eq('slug', slug)
      .eq('is_published', true)
      .single()

    if (error) throw error

    return data as PropertyWithRelations
  } catch {
    return null
  }
}

// Vérifier si des biens sont disponibles
export async function hasPublishedProperties(): Promise<boolean> {
  try {
    const supabase = await createClient()

    const { count, error } = await supabase
      .from('properties')
      .select('*', { count: 'exact', head: true })
      .eq('is_published', true)

    if (error) throw error

    return (count ?? 0) > 0
  } catch {
    return false
  }
}

// Récupérer les biens mis en avant
export async function getFeaturedProperties(): Promise<PropertyWithRelations[]> {
  return getProperties({ featured: true, limit: 3 })
}

// Récupérer les types de biens
export async function getPropertyTypes(): Promise<PropertyType[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('property_types')
      .select('*')
      .order('display_order')

    if (error) throw error

    return (data as PropertyType[]) || []
  } catch {
    return []
  }
}

// Récupérer les villes distinctes des biens publiés
export async function getCities(): Promise<string[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('properties')
      .select('city')
      .eq('is_published', true)

    if (error) throw error

    const cities = [...new Set(data.map((p) => p.city))]
    return cities.filter(Boolean).sort()
  } catch {
    return []
  }
}
