import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Comprendre les Frais d'Acte",
  description:
    "Comprenez la répartition des frais d'acte (improprement appelés frais de notaire) : taxes, débours et rémunération du notaire. Transparence totale sur vos frais.",
  alternates: {
    canonical: '/tarifs',
  },
  openGraph: {
    title: "Tarifs et Frais d'Acte | Maître INCANA",
    description:
      "Découvrez la répartition réelle des frais d'acte : 80% d'impôts, 10% de débours, 10% de rémunération notariale.",
    url: '/tarifs',
    type: 'website',
  },
}

export default function TarifsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
