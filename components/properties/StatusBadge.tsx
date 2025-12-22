import { PropertyStatus } from '@/lib/types'
import { Badge } from '@/components/ui/badge'

interface StatusBadgeProps {
  status: PropertyStatus
  size?: 'sm' | 'md' | 'lg'
}

const statusConfig: Record<PropertyStatus, { label: string; className: string }> = {
  available: {
    label: 'Disponible',
    className: 'bg-status-available text-white border-0',
  },
  under_offer: {
    label: 'Sous offre',
    className: 'bg-status-offer text-white border-0',
  },
  sold: {
    label: 'Vendu',
    className: 'bg-status-sold text-white border-0',
  },
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status]

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  }

  return (
    <Badge className={`${config.className} ${sizeClasses[size]}`}>
      {config.label}
    </Badge>
  )
}
