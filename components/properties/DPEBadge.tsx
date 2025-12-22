import { EnergyRating } from '@/lib/types'

interface DPEBadgeProps {
  rating: EnergyRating
  type: 'dpe' | 'ges'
  showLabel?: boolean
}

const dpeColors: Record<EnergyRating, { bg: string; text: string }> = {
  A: { bg: 'bg-green-600', text: 'text-white' },
  B: { bg: 'bg-green-500', text: 'text-white' },
  C: { bg: 'bg-yellow-400', text: 'text-gray-900' },
  D: { bg: 'bg-yellow-500', text: 'text-gray-900' },
  E: { bg: 'bg-orange-400', text: 'text-white' },
  F: { bg: 'bg-orange-600', text: 'text-white' },
  G: { bg: 'bg-red-600', text: 'text-white' },
  NS: { bg: 'bg-gray-400', text: 'text-white' },
}

const gesColors: Record<EnergyRating, { bg: string; text: string }> = {
  A: { bg: 'bg-purple-200', text: 'text-purple-900' },
  B: { bg: 'bg-purple-300', text: 'text-purple-900' },
  C: { bg: 'bg-purple-400', text: 'text-white' },
  D: { bg: 'bg-purple-500', text: 'text-white' },
  E: { bg: 'bg-purple-600', text: 'text-white' },
  F: { bg: 'bg-purple-700', text: 'text-white' },
  G: { bg: 'bg-purple-900', text: 'text-white' },
  NS: { bg: 'bg-gray-400', text: 'text-white' },
}

export function DPEBadge({ rating, type, showLabel = true }: DPEBadgeProps) {
  const colors = type === 'dpe' ? dpeColors : gesColors
  const color = colors[rating]
  const label = type === 'dpe' ? 'DPE' : 'GES'

  return (
    <div className="inline-flex items-center gap-2">
      {showLabel && (
        <span className="text-sm text-text-muted uppercase tracking-wider">
          {label}
        </span>
      )}
      <div
        className={`${color.bg} ${color.text} w-10 h-10 flex items-center justify-center font-bold text-lg`}
      >
        {rating}
      </div>
    </div>
  )
}

// Full DPE scale component
interface DPEScaleProps {
  rating: EnergyRating
  type: 'dpe' | 'ges'
}

export function DPEScale({ rating, type }: DPEScaleProps) {
  const ratings: EnergyRating[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
  const colors = type === 'dpe' ? dpeColors : gesColors
  const label = type === 'dpe' ? 'Consommation énergétique' : 'Émissions de GES'
  const unit = type === 'dpe' ? 'kWh/m²/an' : 'kg CO₂/m²/an'

  return (
    <div className="space-y-2">
      <p className="text-sm text-text-muted">{label}</p>
      <div className="flex flex-col gap-1">
        {ratings.map((r, index) => {
          const isActive = r === rating
          const color = colors[r]
          const widths = [
            'w-[30%]',
            'w-[40%]',
            'w-[50%]',
            'w-[60%]',
            'w-[70%]',
            'w-[80%]',
            'w-[90%]',
          ]

          return (
            <div key={r} className="flex items-center gap-2">
              <div
                className={`${widths[index]} ${color.bg} ${color.text} h-6 flex items-center justify-between px-2 text-sm font-medium transition-all ${
                  isActive ? 'ring-2 ring-text-primary ring-offset-1' : 'opacity-60'
                }`}
              >
                <span>{r}</span>
                {isActive && <span className="text-xs">◀</span>}
              </div>
            </div>
          )
        })}
      </div>
      <p className="text-xs text-text-muted">{unit}</p>
    </div>
  )
}
