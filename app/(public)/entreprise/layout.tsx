import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Entreprise & Patrimoine',
  description:
    "Conseil notarial pour entreprises : création de société, cession de fonds de commerce, baux commerciaux, optimisation patrimoniale. Expertise à La Réunion.",
  alternates: {
    canonical: '/entreprise',
  },
  openGraph: {
    title: 'Entreprise & Patrimoine | Maître INCANA - Notaire',
    description:
      "Création de société, cession, baux commerciaux, conseil patrimonial : votre notaire accompagne votre entreprise.",
    url: '/entreprise',
    type: 'website',
  },
}

export default function EntrepriseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
