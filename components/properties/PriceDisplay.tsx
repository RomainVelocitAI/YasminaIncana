import { formatPrice } from '@/lib/types'

interface PriceDisplayProps {
  price: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function PriceDisplay({ price, size = 'md', className = '' }: PriceDisplayProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl md:text-5xl',
  }

  return (
    <p className={`font-serif text-primary ${sizeClasses[size]} ${className}`}>
      {formatPrice(price)}
    </p>
  )
}
