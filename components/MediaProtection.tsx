'use client'

import { useEffect } from 'react'

export function MediaProtection() {
  useEffect(() => {
    // Désactiver le clic droit sur les images et vidéos
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'IMG' ||
        target.tagName === 'VIDEO' ||
        target.closest('video') ||
        target.closest('picture')
      ) {
        e.preventDefault()
        return false
      }
    }

    // Désactiver le drag des images
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'IMG' || target.tagName === 'VIDEO') {
        e.preventDefault()
        return false
      }
    }

    // Désactiver certaines touches (comme Ctrl+S, Ctrl+U)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === 's' || e.key === 'S' || e.key === 'u' || e.key === 'U')) {
        e.preventDefault()
        return false
      }
    }

    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('dragstart', handleDragStart)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('dragstart', handleDragStart)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return null
}
