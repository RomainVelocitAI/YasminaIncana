import {
  Car,
  Warehouse,
  Wine,
  Waves,
  TreePine,
  Home,
  Building,
  Fence,
  Accessibility,
  Flame,
  Snowflake,
  Sun,
  ShieldCheck,
  Check,
} from 'lucide-react'

interface FeaturesListProps {
  features: string[]
}

const featureIcons: Record<string, React.ElementType> = {
  parking: Car,
  garage: Warehouse,
  cave: Wine,
  piscine: Waves,
  jardin: TreePine,
  terrasse: Home,
  balcon: Building,
  ascenseur: Accessibility,
  cloture: Fence,
  chauffage: Flame,
  climatisation: Snowflake,
  panneaux_solaires: Sun,
  alarme: ShieldCheck,
}

const featureLabels: Record<string, string> = {
  parking: 'Parking',
  garage: 'Garage',
  cave: 'Cave',
  piscine: 'Piscine',
  jardin: 'Jardin',
  terrasse: 'Terrasse',
  balcon: 'Balcon',
  ascenseur: 'Ascenseur',
  cloture: 'Terrain clos',
  chauffage: 'Chauffage',
  climatisation: 'Climatisation',
  panneaux_solaires: 'Panneaux solaires',
  alarme: 'Alarme',
}

export function FeaturesList({ features }: FeaturesListProps) {
  if (!features || features.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {features.map((feature) => {
        const Icon = featureIcons[feature.toLowerCase()] || Check
        const label = featureLabels[feature.toLowerCase()] || feature

        return (
          <div
            key={feature}
            className="flex items-center gap-3 p-3 bg-secondary/50 border border-border-light"
          >
            <div className="w-10 h-10 bg-primary/10 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-text-secondary text-sm">{label}</span>
          </div>
        )
      })}
    </div>
  )
}
