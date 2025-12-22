'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import { Upload, X, Star, GripVertical, Loader2, ImageIcon } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { PropertyImage } from '@/lib/types'
import { Button } from '@/components/ui/button'

interface ImageUploaderProps {
  propertyId?: string // undefined si nouveau bien (on upload après création)
  images: PropertyImage[]
  onImagesChange: (images: PropertyImage[]) => void
  pendingFiles?: File[] // Fichiers en attente (pour nouveau bien)
  onPendingFilesChange?: (files: File[]) => void
}

export function ImageUploader({
  propertyId,
  images,
  onImagesChange,
  pendingFiles = [],
  onPendingFilesChange,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<string>('')
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)

  // Gérer le drop de fichiers
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)
      const files = Array.from(e.dataTransfer.files).filter((f) =>
        f.type.startsWith('image/')
      )
      if (files.length > 0) {
        handleFiles(files)
      }
    },
    [propertyId]
  )

  // Gérer la sélection de fichiers
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      handleFiles(files)
    }
    // Reset input pour permettre de re-sélectionner le même fichier
    e.target.value = ''
  }

  // Traiter les fichiers
  const handleFiles = async (files: File[]) => {
    setError('')

    // Valider les fichiers
    const validFiles = files.filter((file) => {
      if (!file.type.startsWith('image/')) {
        setError('Seules les images sont acceptées')
        return false
      }
      if (file.size > 10 * 1024 * 1024) {
        setError('Les images doivent faire moins de 10 Mo')
        return false
      }
      return true
    })

    if (validFiles.length === 0) return

    // Si pas de propertyId (nouveau bien), on stocke les fichiers en attente
    if (!propertyId) {
      if (onPendingFilesChange) {
        onPendingFilesChange([...pendingFiles, ...validFiles])
      }
      // Créer des previews locales
      const newPreviews = await Promise.all(
        validFiles.map(async (file, index) => {
          const url = URL.createObjectURL(file)
          return {
            id: `pending-${Date.now()}-${index}`,
            property_id: '',
            url,
            alt_text: file.name,
            is_cover: images.length === 0 && index === 0,
            display_order: images.length + index,
            created_at: new Date().toISOString(),
            _file: file, // Garder référence au fichier
          } as PropertyImage & { _file?: File }
        })
      )
      onImagesChange([...images, ...newPreviews])
      return
    }

    // Upload direct si propertyId existe
    setIsUploading(true)
    const supabase = createClient()
    const uploadedImages: PropertyImage[] = []

    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i]
      setUploadProgress(`Upload ${i + 1}/${validFiles.length}...`)

      try {
        // Générer un nom unique
        const ext = file.name.split('.').pop()
        const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`
        const path = `${propertyId}/${filename}`

        // Upload vers Storage
        const { error: uploadError } = await supabase.storage
          .from('properties')
          .upload(path, file)

        if (uploadError) throw uploadError

        // Récupérer l'URL publique
        const { data: urlData } = supabase.storage
          .from('properties')
          .getPublicUrl(path)

        // Insérer dans la table property_images
        const newImage = {
          property_id: propertyId,
          url: urlData.publicUrl,
          alt_text: file.name,
          is_cover: images.length === 0 && i === 0,
          display_order: images.length + i,
        }

        const { data: insertedImage, error: insertError } = await supabase
          .from('property_images')
          .insert(newImage)
          .select()
          .single()

        if (insertError) throw insertError

        uploadedImages.push(insertedImage)
      } catch (err) {
        console.error('Upload error:', err)
        setError(`Erreur lors de l'upload de ${file.name}`)
      }
    }

    if (uploadedImages.length > 0) {
      onImagesChange([...images, ...uploadedImages])
    }

    setIsUploading(false)
    setUploadProgress('')
  }

  // Supprimer une image
  const handleDelete = async (image: PropertyImage) => {
    // Si c'est une image en attente (preview locale)
    if (image.id.startsWith('pending-')) {
      URL.revokeObjectURL(image.url) // Libérer la mémoire
      const imageWithFile = image as PropertyImage & { _file?: File }
      if (imageWithFile._file && onPendingFilesChange) {
        onPendingFilesChange(pendingFiles.filter((f) => f !== imageWithFile._file))
      }
      onImagesChange(images.filter((img) => img.id !== image.id))
      return
    }

    // Supprimer de Supabase
    try {
      const supabase = createClient()

      // Extraire le path de l'URL
      const urlParts = image.url.split('/properties/')
      if (urlParts[1]) {
        await supabase.storage.from('properties').remove([urlParts[1]])
      }

      // Supprimer de la table
      await supabase.from('property_images').delete().eq('id', image.id)

      onImagesChange(images.filter((img) => img.id !== image.id))
    } catch (err) {
      console.error('Delete error:', err)
      setError("Erreur lors de la suppression de l'image")
    }
  }

  // Définir comme image principale
  const handleSetCover = async (image: PropertyImage) => {
    const updatedImages = images.map((img) => ({
      ...img,
      is_cover: img.id === image.id,
    }))
    onImagesChange(updatedImages)

    // Si pas en mode pending, mettre à jour en base
    if (propertyId && !image.id.startsWith('pending-')) {
      try {
        const supabase = createClient()

        // Retirer is_cover de toutes les images du bien
        await supabase
          .from('property_images')
          .update({ is_cover: false })
          .eq('property_id', propertyId)

        // Définir la nouvelle cover
        await supabase
          .from('property_images')
          .update({ is_cover: true })
          .eq('id', image.id)
      } catch (err) {
        console.error('Set cover error:', err)
      }
    }
  }

  // Réordonner les images
  const handleReorder = (newOrder: PropertyImage[]) => {
    const reorderedImages = newOrder.map((img, index) => ({
      ...img,
      display_order: index,
    }))
    onImagesChange(reorderedImages)

    // Mettre à jour en base si propertyId existe
    if (propertyId) {
      const supabase = createClient()
      reorderedImages.forEach(async (img) => {
        if (!img.id.startsWith('pending-')) {
          await supabase
            .from('property_images')
            .update({ display_order: img.display_order })
            .eq('id', img.id)
        }
      })
    }
  }

  return (
    <div className="space-y-4">
      {/* Zone de drop */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-all
          ${dragOver ? 'border-primary bg-primary/5' : 'border-border-light hover:border-primary/50'}
          ${isUploading ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
        `}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isUploading}
        />

        <div className="flex flex-col items-center gap-3">
          {isUploading ? (
            <>
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-text-secondary">{uploadProgress}</p>
            </>
          ) : (
            <>
              <Upload className="w-10 h-10 text-text-muted" />
              <div>
                <p className="text-text-primary font-medium">
                  Glissez vos images ici
                </p>
                <p className="text-text-muted text-sm mt-1">
                  ou cliquez pour sélectionner (max 10 Mo par image)
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Erreur */}
      {error && (
        <p className="text-destructive text-sm">{error}</p>
      )}

      {/* Liste des images */}
      {images.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-text-muted">
            {images.length} image{images.length > 1 ? 's' : ''} - Glissez pour réordonner
          </p>

          <Reorder.Group
            axis="y"
            values={images}
            onReorder={handleReorder}
            className="space-y-2"
          >
            <AnimatePresence>
              {images.map((image) => (
                <Reorder.Item
                  key={image.id}
                  value={image}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="flex items-center gap-3 p-3 bg-secondary/30 border border-border-light rounded-lg group"
                >
                  {/* Handle de drag */}
                  <div className="cursor-grab active:cursor-grabbing text-text-muted hover:text-text-secondary">
                    <GripVertical className="w-5 h-5" />
                  </div>

                  {/* Thumbnail */}
                  <div className="relative w-20 h-14 bg-secondary rounded overflow-hidden shrink-0">
                    {image.url ? (
                      <Image
                        src={image.url}
                        alt={image.alt_text || ''}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-text-muted" />
                      </div>
                    )}
                    {image.is_cover && (
                      <div className="absolute top-1 left-1 bg-gold text-white text-xs px-1.5 py-0.5 rounded">
                        Cover
                      </div>
                    )}
                  </div>

                  {/* Nom du fichier */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text-primary truncate">
                      {image.alt_text || 'Image'}
                    </p>
                    {image.id.startsWith('pending-') && (
                      <p className="text-xs text-text-muted">En attente d'upload</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!image.is_cover && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSetCover(image)}
                        title="Définir comme image principale"
                        className="h-8 w-8"
                      >
                        <Star className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(image)}
                      title="Supprimer"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </Reorder.Item>
              ))}
            </AnimatePresence>
          </Reorder.Group>
        </div>
      )}

      {/* Message si pas d'images */}
      {images.length === 0 && !isUploading && (
        <p className="text-sm text-text-muted text-center py-4">
          Aucune image ajoutée. La première image sera utilisée comme couverture.
        </p>
      )}
    </div>
  )
}
