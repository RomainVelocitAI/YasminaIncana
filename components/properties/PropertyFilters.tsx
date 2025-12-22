'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { PropertyType } from '@/lib/types'

interface PropertyFiltersProps {
  propertyTypes: PropertyType[]
  cities: string[]
}

export function PropertyFilters({ propertyTypes, cities }: PropertyFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  const [filters, setFilters] = useState({
    type: searchParams.get('type') || '',
    city: searchParams.get('city') || '',
    priceMin: searchParams.get('priceMin') || '',
    priceMax: searchParams.get('priceMax') || '',
    surfaceMin: searchParams.get('surfaceMin') || '',
  })

  const hasActiveFilters = Object.values(filters).some((v) => v !== '')

  const updateUrl = (newFilters: typeof filters) => {
    const params = new URLSearchParams()
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    router.push(`/biens?${params.toString()}`)
  }

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    updateUrl(newFilters)
  }

  const clearFilters = () => {
    const emptyFilters = {
      type: '',
      city: '',
      priceMin: '',
      priceMax: '',
      surfaceMin: '',
    }
    setFilters(emptyFilters)
    router.push('/biens')
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Property type */}
      <div className="space-y-2">
        <Label>Type de bien</Label>
        <Select
          value={filters.type}
          onValueChange={(v) => handleFilterChange('type', v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Tous les types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Tous les types</SelectItem>
            {propertyTypes.map((type) => (
              <SelectItem key={type.id} value={type.slug}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* City */}
      <div className="space-y-2">
        <Label>Ville</Label>
        <Select
          value={filters.city}
          onValueChange={(v) => handleFilterChange('city', v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Toutes les villes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Toutes les villes</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price range */}
      <div className="space-y-2">
        <Label>Prix</Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={filters.priceMin}
            onChange={(e) => handleFilterChange('priceMin', e.target.value)}
          />
          <Input
            type="number"
            placeholder="Max"
            value={filters.priceMax}
            onChange={(e) => handleFilterChange('priceMax', e.target.value)}
          />
        </div>
      </div>

      {/* Surface */}
      <div className="space-y-2">
        <Label>Surface min. (m²)</Label>
        <Input
          type="number"
          placeholder="Surface minimum"
          value={filters.surfaceMin}
          onChange={(e) => handleFilterChange('surfaceMin', e.target.value)}
        />
      </div>

      {/* Clear filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full"
        >
          <X className="w-4 h-4 mr-2" />
          Effacer les filtres
        </Button>
      )}
    </div>
  )

  return (
    <>
      {/* Desktop filters */}
      <div className="hidden lg:block bg-surface border border-border-light p-6">
        <h3 className="font-serif text-lg text-text-primary mb-6 flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5" />
          Filtres
        </h3>
        <FilterContent />
      </div>

      {/* Mobile filter button */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filtres
              {hasActiveFilters && (
                <span className="ml-2 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                  {Object.values(filters).filter((v) => v !== '').length}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:w-[400px]">
            <SheetHeader>
              <SheetTitle className="font-serif">Filtres</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
