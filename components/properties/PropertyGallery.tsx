'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, Expand } from 'lucide-react'
import { PropertyImage } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'

interface PropertyGalleryProps {
  images: PropertyImage[]
  title: string
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const sortedImages = [...images].sort((a, b) => {
    if (a.is_cover) return -1
    if (b.is_cover) return 1
    return a.display_order - b.display_order
  })

  const currentImage = sortedImages[currentIndex]

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % sortedImages.length)
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + sortedImages.length) % sortedImages.length)
  }

  if (!sortedImages.length) {
    return (
      <div className="aspect-[16/10] bg-secondary flex items-center justify-center">
        <p className="text-text-muted">Aucune image disponible</p>
      </div>
    )
  }

  return (
    <>
      <div className="relative">
        {/* Main image */}
        <div className="relative aspect-[16/10] bg-secondary overflow-hidden group">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={currentImage.url}
                alt={currentImage.alt_text || `${title} - Image ${currentIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 65vw"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          {sortedImages.length > 1 && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Expand button */}
          <button
            onClick={() => setIsLightboxOpen(true)}
            className="absolute bottom-4 right-4 w-12 h-12 bg-white/90 hover:bg-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
            aria-label="Agrandir"
          >
            <Expand className="w-5 h-5" />
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 left-4 bg-text-primary/80 text-white text-sm px-3 py-1">
            {currentIndex + 1} / {sortedImages.length}
          </div>
        </div>

        {/* Thumbnails */}
        {sortedImages.length > 1 && (
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {sortedImages.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setCurrentIndex(index)}
                className={`relative w-24 h-16 shrink-0 overflow-hidden transition-all ${
                  index === currentIndex
                    ? 'ring-2 ring-primary'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src={image.url}
                  alt={image.alt_text || `Miniature ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-text-primary border-0">
          <div className="relative w-full h-[90vh]">
            <Image
              src={currentImage.url}
              alt={currentImage.alt_text || title}
              fill
              className="object-contain"
              sizes="95vw"
            />

            {/* Close button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation */}
            {sortedImages.length > 1 && (
              <>
                <button
                  onClick={goToPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 text-white text-sm px-4 py-2">
              {currentIndex + 1} / {sortedImages.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
