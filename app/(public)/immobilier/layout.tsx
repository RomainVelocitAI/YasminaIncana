import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Service Immobilier',
  description:
    "Expertise notariale en immobilier : achat, vente, hypothèque, copropriété, VEFA, baux commerciaux. Accompagnement complet pour vos transactions à La Réunion.",
  alternates: {
    canonical: '/immobilier',
  },
  openGraph: {
    title: 'Service Immobilier | Maître INCANA - Notaire',
    description:
      "Transactions immobilières sécurisées : vente, achat, hypothèque, copropriété. Votre notaire à L'Étang Salé.",
    url: '/immobilier',
    type: 'website',
  },
}

export default function ImmobilierLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
