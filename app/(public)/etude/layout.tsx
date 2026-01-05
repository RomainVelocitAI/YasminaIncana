import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "L'Étude Notariale",
  description:
    "Découvrez l'étude notariale de Maître Yasmina INCANA à L'Étang Salé : notre équipe, nos valeurs de proximité, expertise et réactivité au service de vos projets.",
  alternates: {
    canonical: '/etude',
  },
  openGraph: {
    title: "L'Étude Notariale | Maître INCANA",
    description:
      "Notre équipe de professionnels vous accompagne avec expertise et bienveillance dans tous vos projets notariaux à La Réunion.",
    url: '/etude',
    type: 'website',
  },
}

export default function EtudeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
