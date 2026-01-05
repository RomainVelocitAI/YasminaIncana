import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Famille & Succession',
  description:
    "Services notariaux en droit de la famille : mariage, PACS, divorce, testament, donation, succession. Accompagnement personnalisé pour protéger vos proches.",
  alternates: {
    canonical: '/famille',
  },
  openGraph: {
    title: 'Famille & Succession | Maître INCANA - Notaire',
    description:
      "Mariage, PACS, testament, donation, succession : protégez vos proches avec l'accompagnement de votre notaire à La Réunion.",
    url: '/famille',
    type: 'website',
  },
}

export default function FamilleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
