'use client'

import Image, { ImageProps } from 'next/image'

type ProtectedImageProps = ImageProps & {
  overlayClassName?: string
}

export function ProtectedImage({
  overlayClassName = '',
  className = '',
  ...props
}: ProtectedImageProps) {
  return (
    <div className="relative" style={{ width: '100%', height: '100%' }}>
      <Image
        {...props}
        className={className}
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
      />
      {/* Overlay transparent qui bloque le clic droit */}
      <div
        className={`absolute inset-0 z-10 ${overlayClassName}`}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      />
    </div>
  )
}
