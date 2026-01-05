import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Préparer votre Rendez-vous',
  description:
    "Préparez votre rendez-vous chez le notaire : documents à fournir selon votre démarche (vente, achat, succession, donation, mariage). Checklists téléchargeables.",
  alternates: {
    canonical: '/rendez-vous',
  },
  openGraph: {
    title: 'Préparer votre Rendez-vous | Maître INCANA',
    description:
      "Tous les documents à préparer pour votre rendez-vous chez le notaire selon votre projet.",
    url: '/rendez-vous',
    type: 'website',
  },
}

export default function RendezVousLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
