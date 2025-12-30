import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import { MediaProtection } from '@/components/MediaProtection'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-serif',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: "Maître INCANA - Notaire à L'Étang Salé | La Réunion",
    template: "%s | Maître INCANA - Notaire",
  },
  description:
    "Étude notariale de Maître Yasmina INCANA à L'Étang Salé, La Réunion. Expertise en immobilier, succession, famille et entreprise. Accompagnement personnalisé.",
  keywords: [
    'notaire',
    'La Réunion',
    "L'Étang Salé",
    'immobilier',
    'succession',
    'donation',
    'acte notarié',
    'vente immobilière',
  ],
  authors: [{ name: 'Étude INCANA' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://notaire-armon-incana.re',
    siteName: 'Maître INCANA - Notaire',
    title: "Maître INCANA - Notaire à L'Étang Salé",
    description:
      "Étude notariale de Maître Yasmina INCANA à L'Étang Salé, La Réunion.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="min-h-screen bg-background antialiased">
        <MediaProtection />
        {children}
      </body>
    </html>
  )
}
