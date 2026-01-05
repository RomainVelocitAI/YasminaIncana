import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biens Immobiliers à Vendre',
  description:
    "Découvrez les biens immobiliers à vendre par l'étude de Maître INCANA à La Réunion. Maisons, appartements, terrains avec accompagnement notarial complet.",
  alternates: {
    canonical: '/biens',
  },
  openGraph: {
    title: 'Biens Immobiliers | Maître INCANA - Notaire',
    description:
      "Biens immobiliers à vendre à La Réunion avec accompagnement notarial : maisons, appartements, terrains.",
    url: '/biens',
    type: 'website',
  },
}

export default function BiensLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
