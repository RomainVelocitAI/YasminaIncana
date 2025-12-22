'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Save } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import {
  Property,
  PropertyType,
  PropertyImage,
  generateSlug,
  getPropertyFieldsConfig,
  PropertyTypeFieldsConfig
} from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ImageUploader } from './ImageUploader'

interface PropertyFormProps {
  property?: Property & { images?: PropertyImage[] }
  propertyTypes: PropertyType[]
}

const energyRatings = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'NS']

const allFeatures = [
  { id: 'parking', label: 'Parking' },
  { id: 'garage', label: 'Garage' },
  { id: 'cave', label: 'Cave' },
  { id: 'piscine', label: 'Piscine' },
  { id: 'terrasse', label: 'Terrasse' },
  { id: 'jardin', label: 'Jardin' },
  { id: 'balcon', label: 'Balcon' },
  { id: 'ascenseur', label: 'Ascenseur' },
  { id: 'climatisation', label: 'Climatisation' },
  { id: 'chauffage', label: 'Chauffage' },
  { id: 'alarme', label: 'Alarme' },
  { id: 'panneaux_solaires', label: 'Panneaux solaires' },
]

// Animation variants
const fadeInOut = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: 'auto' },
  exit: { opacity: 0, height: 0 },
}

const fieldFade = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

export function PropertyForm({ property, propertyTypes }: PropertyFormProps) {
  const router = useRouter()
  const isEditing = !!property

  const [formData, setFormData] = useState({
    title: property?.title || '',
    reference: property?.reference || '',
    property_type_id: property?.property_type_id || '',
    price: property?.price?.toString() || '',
    description: property?.description || '',
    surface: property?.surface?.toString() || '',
    land_surface: property?.land_surface?.toString() || '',
    rooms: property?.rooms?.toString() || '',
    bedrooms: property?.bedrooms?.toString() || '',
    bathrooms: property?.bathrooms?.toString() || '',
    address: property?.address || '',
    city: property?.city || '',
    postal_code: property?.postal_code || '',
    energy_rating: property?.energy_rating || '',
    ges_rating: property?.ges_rating || '',
    year_built: property?.year_built?.toString() || '',
    features: property?.features || [],
    status: property?.status || 'available',
    is_featured: property?.is_featured || false,
    is_published: property?.is_published || false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  // État pour les images
  const [images, setImages] = useState<PropertyImage[]>(property?.images || [])
  const [pendingFiles, setPendingFiles] = useState<File[]>([])

  // Obtenir le slug du type de bien sélectionné
  const selectedPropertyType = useMemo(() => {
    return propertyTypes.find((t) => t.id === formData.property_type_id)
  }, [formData.property_type_id, propertyTypes])

  // Obtenir la configuration des champs pour ce type
  const fieldsConfig: PropertyTypeFieldsConfig = useMemo(() => {
    return getPropertyFieldsConfig(selectedPropertyType?.slug)
  }, [selectedPropertyType])

  // Filtrer les équipements selon le type
  const availableFeatures = useMemo(() => {
    if (!fieldsConfig.features) return []
    if (fieldsConfig.allowedFeatures) {
      return allFeatures.filter((f) => fieldsConfig.allowedFeatures!.includes(f.id))
    }
    return allFeatures
  }, [fieldsConfig])

  // Réinitialiser les champs masqués quand le type change
  useEffect(() => {
    if (!selectedPropertyType) return

    setFormData((prev) => {
      const updates: Partial<typeof prev> = {}

      if (!fieldsConfig.surface) updates.surface = ''
      if (!fieldsConfig.land_surface) updates.land_surface = ''
      if (!fieldsConfig.rooms) updates.rooms = ''
      if (!fieldsConfig.bedrooms) updates.bedrooms = ''
      if (!fieldsConfig.bathrooms) updates.bathrooms = ''
      if (!fieldsConfig.year_built) updates.year_built = ''
      if (!fieldsConfig.energy_rating) updates.energy_rating = ''
      if (!fieldsConfig.ges_rating) updates.ges_rating = ''

      // Filtrer les équipements non autorisés
      if (!fieldsConfig.features) {
        updates.features = []
      } else if (fieldsConfig.allowedFeatures) {
        updates.features = prev.features.filter((f) =>
          fieldsConfig.allowedFeatures!.includes(f)
        )
      }

      return { ...prev, ...updates }
    })
  }, [selectedPropertyType, fieldsConfig])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePropertyTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, property_type_id: value }))
  }

  const handleFeatureToggle = (featureId: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter((f) => f !== featureId)
        : [...prev.features, featureId],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const supabase = createClient()

      const slug = generateSlug(formData.title)

      const propertyData = {
        title: formData.title,
        slug,
        reference: formData.reference,
        property_type_id: formData.property_type_id || null,
        price: parseFloat(formData.price) || 0,
        description: formData.description,
        surface: formData.surface ? parseFloat(formData.surface) : null,
        land_surface: formData.land_surface ? parseFloat(formData.land_surface) : null,
        rooms: formData.rooms ? parseInt(formData.rooms) : null,
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
        address: formData.address || null,
        city: formData.city,
        postal_code: formData.postal_code,
        energy_rating: formData.energy_rating || null,
        ges_rating: formData.ges_rating || null,
        year_built: formData.year_built ? parseInt(formData.year_built) : null,
        features: formData.features,
        status: formData.status,
        is_featured: formData.is_featured,
        is_published: formData.is_published,
      }

      let propertyId = property?.id

      if (isEditing) {
        const { error } = await supabase
          .from('properties')
          .update(propertyData)
          .eq('id', property.id)

        if (error) throw error
      } else {
        // Créer le bien et récupérer l'ID
        const { data: newProperty, error } = await supabase
          .from('properties')
          .insert(propertyData)
          .select('id')
          .single()

        if (error) throw error
        propertyId = newProperty.id

        // Upload des images en attente
        if (pendingFiles.length > 0 && propertyId) {
          for (let i = 0; i < pendingFiles.length; i++) {
            const file = pendingFiles[i]
            const ext = file.name.split('.').pop()
            const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`
            const path = `${propertyId}/${filename}`

            // Upload vers Storage
            const { error: uploadError } = await supabase.storage
              .from('properties')
              .upload(path, file)

            if (uploadError) {
              console.error('Upload error:', uploadError)
              continue
            }

            // Récupérer l'URL publique
            const { data: urlData } = supabase.storage
              .from('properties')
              .getPublicUrl(path)

            // Trouver l'image correspondante dans le state pour récupérer is_cover
            const pendingImage = images.find(
              (img) => img.id.startsWith('pending-') && img.alt_text === file.name
            )

            // Insérer dans la table property_images
            await supabase.from('property_images').insert({
              property_id: propertyId,
              url: urlData.publicUrl,
              alt_text: file.name,
              is_cover: pendingImage?.is_cover || i === 0,
              display_order: i,
            })
          }
        }
      }

      router.push('/admin/biens')
      router.refresh()
    } catch (err) {
      console.error('Error saving property:', err)
      setError('Une erreur est survenue lors de l\'enregistrement')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Vérifier si au moins un champ de caractéristiques est affiché
  const showCharacteristicsSection =
    fieldsConfig.surface ||
    fieldsConfig.land_surface ||
    fieldsConfig.rooms ||
    fieldsConfig.bedrooms ||
    fieldsConfig.bathrooms ||
    fieldsConfig.year_built

  // Vérifier si la section diagnostics doit être affichée
  const showDiagnosticsSection = fieldsConfig.energy_rating || fieldsConfig.ges_rating

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Informations générales */}
      <div className="bg-surface border border-border p-6">
        <h2 className="font-serif text-xl text-text-primary mb-6">
          Informations générales
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Type de bien - en premier */}
          <div className="space-y-2">
            <Label htmlFor="property_type_id">Type de bien *</Label>
            <Select
              value={formData.property_type_id}
              onValueChange={handlePropertyTypeChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                {propertyTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reference">Référence</Label>
            <Input
              id="reference"
              name="reference"
              value={formData.reference}
              onChange={handleChange}
              placeholder="Ex: NOT-2024-001"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Titre *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Ex: Villa contemporaine avec vue mer"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Prix (€) *</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="250000"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              placeholder="Description détaillée du bien..."
            />
          </div>
        </div>
      </div>

      {/* Photos */}
      <div className="bg-surface border border-border p-6">
        <h2 className="font-serif text-xl text-text-primary mb-6">
          Photos
        </h2>
        <ImageUploader
          propertyId={property?.id}
          images={images}
          onImagesChange={setImages}
          pendingFiles={pendingFiles}
          onPendingFilesChange={setPendingFiles}
        />
      </div>

      {/* Caractéristiques - Affichage conditionnel */}
      <AnimatePresence mode="wait">
        {showCharacteristicsSection && (
          <motion.div
            key="characteristics"
            variants={fadeInOut}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-surface border border-border p-6">
              <h2 className="font-serif text-xl text-text-primary mb-6">
                Caractéristiques
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {fieldsConfig.surface && (
                    <motion.div
                      key="surface"
                      variants={fieldFade}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.2 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="surface">Surface habitable (m²)</Label>
                      <Input
                        id="surface"
                        name="surface"
                        type="number"
                        value={formData.surface}
                        onChange={handleChange}
                        placeholder="120"
                      />
                    </motion.div>
                  )}

                  {fieldsConfig.land_surface && (
                    <motion.div
                      key="land_surface"
                      variants={fieldFade}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.2, delay: 0.05 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="land_surface">Surface terrain (m²)</Label>
                      <Input
                        id="land_surface"
                        name="land_surface"
                        type="number"
                        value={formData.land_surface}
                        onChange={handleChange}
                        placeholder="500"
                      />
                    </motion.div>
                  )}

                  {fieldsConfig.rooms && (
                    <motion.div
                      key="rooms"
                      variants={fieldFade}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.2, delay: 0.1 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="rooms">Nombre de pièces</Label>
                      <Input
                        id="rooms"
                        name="rooms"
                        type="number"
                        value={formData.rooms}
                        onChange={handleChange}
                        placeholder="5"
                      />
                    </motion.div>
                  )}

                  {fieldsConfig.bedrooms && (
                    <motion.div
                      key="bedrooms"
                      variants={fieldFade}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.2, delay: 0.15 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="bedrooms">Nombre de chambres</Label>
                      <Input
                        id="bedrooms"
                        name="bedrooms"
                        type="number"
                        value={formData.bedrooms}
                        onChange={handleChange}
                        placeholder="3"
                      />
                    </motion.div>
                  )}

                  {fieldsConfig.bathrooms && (
                    <motion.div
                      key="bathrooms"
                      variants={fieldFade}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.2, delay: 0.2 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="bathrooms">Salles de bain</Label>
                      <Input
                        id="bathrooms"
                        name="bathrooms"
                        type="number"
                        value={formData.bathrooms}
                        onChange={handleChange}
                        placeholder="2"
                      />
                    </motion.div>
                  )}

                  {fieldsConfig.year_built && (
                    <motion.div
                      key="year_built"
                      variants={fieldFade}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.2, delay: 0.25 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="year_built">Année de construction</Label>
                      <Input
                        id="year_built"
                        name="year_built"
                        type="number"
                        value={formData.year_built}
                        onChange={handleChange}
                        placeholder="2020"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Localisation */}
      <div className="bg-surface border border-border p-6">
        <h2 className="font-serif text-xl text-text-primary mb-6">
          Localisation
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="address">Adresse</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="12 Rue des Palmiers"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="postal_code">Code postal *</Label>
            <Input
              id="postal_code"
              name="postal_code"
              value={formData.postal_code}
              onChange={handleChange}
              required
              placeholder="97427"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">Ville *</Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              placeholder="L'Étang-Salé"
            />
          </div>
        </div>
      </div>

      {/* Diagnostics - Affichage conditionnel */}
      <AnimatePresence mode="wait">
        {showDiagnosticsSection && (
          <motion.div
            key="diagnostics"
            variants={fadeInOut}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-surface border border-border p-6">
              <h2 className="font-serif text-xl text-text-primary mb-6">
                Diagnostics énergétiques
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                  {fieldsConfig.energy_rating && (
                    <motion.div
                      key="energy_rating"
                      variants={fieldFade}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.2 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="energy_rating">DPE</Label>
                      <Select
                        value={formData.energy_rating}
                        onValueChange={(v) =>
                          setFormData((prev) => ({ ...prev, energy_rating: v }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          {energyRatings.map((rating) => (
                            <SelectItem key={rating} value={rating}>
                              {rating === 'NS' ? 'Non soumis' : `Classe ${rating}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                  )}

                  {fieldsConfig.ges_rating && (
                    <motion.div
                      key="ges_rating"
                      variants={fieldFade}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.2, delay: 0.05 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="ges_rating">GES</Label>
                      <Select
                        value={formData.ges_rating}
                        onValueChange={(v) =>
                          setFormData((prev) => ({ ...prev, ges_rating: v }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          {energyRatings.map((rating) => (
                            <SelectItem key={rating} value={rating}>
                              {rating === 'NS' ? 'Non soumis' : `Classe ${rating}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Équipements - Affichage conditionnel */}
      <AnimatePresence mode="wait">
        {fieldsConfig.features && availableFeatures.length > 0 && (
          <motion.div
            key="features"
            variants={fadeInOut}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-surface border border-border p-6">
              <h2 className="font-serif text-xl text-text-primary mb-6">
                Équipements
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <AnimatePresence mode="popLayout">
                  {availableFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.id}
                      variants={fieldFade}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.2, delay: index * 0.03 }}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={feature.id}
                        checked={formData.features.includes(feature.id)}
                        onCheckedChange={() => handleFeatureToggle(feature.id)}
                      />
                      <label
                        htmlFor={feature.id}
                        className="text-sm text-text-secondary cursor-pointer"
                      >
                        {feature.label}
                      </label>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Publication */}
      <div className="bg-surface border border-border p-6">
        <h2 className="font-serif text-xl text-text-primary mb-6">
          Publication
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="status">Statut</Label>
            <Select
              value={formData.status}
              onValueChange={(v) =>
                setFormData((prev) => ({ ...prev, status: v as 'available' | 'under_offer' | 'sold' }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Disponible</SelectItem>
                <SelectItem value="under_offer">Sous offre</SelectItem>
                <SelectItem value="sold">Vendu</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
            <div>
              <p className="font-medium text-text-primary">Mis en avant</p>
              <p className="text-sm text-text-muted">
                Afficher sur la page d&apos;accueil
              </p>
            </div>
            <Switch
              checked={formData.is_featured}
              onCheckedChange={(v) =>
                setFormData((prev) => ({ ...prev, is_featured: v }))
              }
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
            <div>
              <p className="font-medium text-text-primary">Publié</p>
              <p className="text-sm text-text-muted">Visible sur le site</p>
            </div>
            <Switch
              checked={formData.is_published}
              onCheckedChange={(v) =>
                setFormData((prev) => ({ ...prev, is_published: v }))
              }
            />
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/30 text-destructive">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Annuler
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary hover:bg-primary-dark text-white"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Enregistrement...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              {isEditing ? 'Enregistrer' : 'Créer le bien'}
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
