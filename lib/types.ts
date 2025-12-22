// Database types for Supabase

export type PropertyStatus = 'available' | 'under_offer' | 'sold'

export type EnergyRating = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'NS'

export interface PropertyType {
  id: string
  name: string
  slug: string
  icon: string
  display_order: number
  created_at: string
}

export interface PropertyImage {
  id: string
  property_id: string
  url: string
  alt_text: string | null
  is_cover: boolean
  display_order: number
  created_at: string
}

export interface Property {
  id: string
  title: string
  slug: string
  reference: string
  description: string
  price: number
  property_type_id: string
  surface: number | null
  land_surface: number | null
  rooms: number | null
  bedrooms: number | null
  bathrooms: number | null
  address: string | null
  city: string
  postal_code: string
  energy_rating: EnergyRating | null
  ges_rating: EnergyRating | null
  year_built: number | null
  features: string[]
  status: PropertyStatus
  is_featured: boolean
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface PropertyWithRelations extends Property {
  property_type: PropertyType
  images: PropertyImage[]
}

// Team member type
export interface TeamMember {
  name: string
  role: string
  image: string
  bio: string
  email: string | null
  specialties?: string[]
}

// Service type
export interface Service {
  title: string
  slug: string
  icon: string
  image: string
  shortDescription: string
  fullDescription: string
  prestations: string[]
}

// Contact form type
export interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  subject: string
  message: string
}

// Notary info type
export interface NotaryInfo {
  name: string
  title: string
  address: string
  city: string
  postalCode: string
  country: string
  phone: string
  fax: string
  email: string
  hours: {
    days: string
    morning: string
    afternoon: string
  }[]
}

// Property filters
export interface PropertyFilters {
  propertyType?: string
  city?: string
  priceMin?: number
  priceMax?: number
  surfaceMin?: number
  status?: PropertyStatus
}

// Utility type for formatting price
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

// Utility for generating slug
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

// Configuration des champs affichés par type de bien
export interface PropertyTypeFieldsConfig {
  surface: boolean
  land_surface: boolean
  rooms: boolean
  bedrooms: boolean
  bathrooms: boolean
  year_built: boolean
  energy_rating: boolean
  ges_rating: boolean
  features: boolean
  allowedFeatures?: string[] // Si défini, limite les équipements affichés
}

export const PROPERTY_TYPE_FIELDS: Record<string, PropertyTypeFieldsConfig> = {
  maison: {
    surface: true,
    land_surface: true,
    rooms: true,
    bedrooms: true,
    bathrooms: true,
    year_built: true,
    energy_rating: true,
    ges_rating: true,
    features: true,
  },
  appartement: {
    surface: true,
    land_surface: false,
    rooms: true,
    bedrooms: true,
    bathrooms: true,
    year_built: true,
    energy_rating: true,
    ges_rating: true,
    features: true,
  },
  terrain: {
    surface: false,
    land_surface: true,
    rooms: false,
    bedrooms: false,
    bathrooms: false,
    year_built: false,
    energy_rating: false,
    ges_rating: false,
    features: false,
  },
  'local-commercial': {
    surface: true,
    land_surface: false,
    rooms: false,
    bedrooms: false,
    bathrooms: false,
    year_built: true,
    energy_rating: true,
    ges_rating: true,
    features: true,
    allowedFeatures: ['parking', 'alarme', 'climatisation'],
  },
  immeuble: {
    surface: true,
    land_surface: true,
    rooms: false,
    bedrooms: false,
    bathrooms: false,
    year_built: true,
    energy_rating: true,
    ges_rating: true,
    features: true,
  },
  'parking-garage': {
    surface: true,
    land_surface: false,
    rooms: false,
    bedrooms: false,
    bathrooms: false,
    year_built: false,
    energy_rating: false,
    ges_rating: false,
    features: false,
  },
}

// Configuration par défaut (tous les champs affichés)
export const DEFAULT_PROPERTY_FIELDS: PropertyTypeFieldsConfig = {
  surface: true,
  land_surface: true,
  rooms: true,
  bedrooms: true,
  bathrooms: true,
  year_built: true,
  energy_rating: true,
  ges_rating: true,
  features: true,
}

// Fonction utilitaire pour obtenir la config des champs
export function getPropertyFieldsConfig(propertyTypeSlug: string | null | undefined): PropertyTypeFieldsConfig {
  if (!propertyTypeSlug) return DEFAULT_PROPERTY_FIELDS
  return PROPERTY_TYPE_FIELDS[propertyTypeSlug] || DEFAULT_PROPERTY_FIELDS
}
