import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nous Contacter',
  description:
    "Contactez l'étude notariale de Maître INCANA à L'Étang Salé, La Réunion. Rendez-vous à l'étude, à domicile ou en visioconférence. Téléphone, email, formulaire.",
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact | Maître INCANA - Notaire',
    description:
      "Prenez rendez-vous avec notre équipe : à l'étude, à domicile ou en visioconférence. 96 Avenue Raymond Barre, L'Étang Salé.",
    url: '/contact',
    type: 'website',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
