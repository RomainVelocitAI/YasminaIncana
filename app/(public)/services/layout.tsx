import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nos Services Notariaux',
  description:
    "Découvrez l'ensemble des services notariaux proposés par l'étude de Maître INCANA : immobilier, famille, succession, entreprise et patrimoine à La Réunion.",
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Services Notariaux | Maître INCANA',
    description:
      "Immobilier, famille, succession, entreprise : découvrez tous nos services notariaux à L'Étang Salé, La Réunion.",
    url: '/services',
    type: 'website',
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
