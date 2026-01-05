import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans, Caveat } from 'next/font/google'
import './globals.css'
import { MediaProtection } from '@/components/MediaProtection'
import { CookieBanner } from '@/components/cookies/CookieBanner'
import Script from 'next/script'

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

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-handwriting',
  display: 'swap',
})

const baseUrl = 'https://notaire-incana.re'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
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
    'notaire réunion',
    'étude notariale',
  ],
  authors: [{ name: 'Étude INCANA' }],
  creator: 'Étude Notariale Maître INCANA',
  publisher: 'Étude Notariale Maître INCANA',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      'fr-FR': baseUrl,
      'fr-RE': baseUrl,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: baseUrl,
    siteName: 'Maître INCANA - Notaire',
    title: "Maître INCANA - Notaire à L'Étang Salé",
    description:
      "Étude notariale de Maître Yasmina INCANA à L'Étang Salé, La Réunion. Expertise en immobilier, succession, famille et entreprise.",
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Étude Notariale Maître INCANA - L'Étang Salé, La Réunion",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Maître INCANA - Notaire à L'Étang Salé | La Réunion",
    description:
      "Étude notariale de Maître Yasmina INCANA. Expertise en immobilier, succession, famille et entreprise.",
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // À configurer avec vos vrais identifiants
    // google: 'votre-code-verification-google',
  },
}

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Notary',
      '@id': `${baseUrl}/#organization`,
      name: 'Étude Notariale Maître INCANA',
      alternateName: 'Maître Yasmina INCANA',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.jpg`,
      },
      image: `${baseUrl}/images/etude-hero.png`,
      description:
        "Étude notariale de Maître Yasmina INCANA à L'Étang Salé, La Réunion. Services en immobilier, succession, famille et entreprise.",
      address: {
        '@type': 'PostalAddress',
        streetAddress: '96 Avenue Raymond Barre',
        addressLocality: "L'Étang Salé",
        postalCode: '97427',
        addressRegion: 'La Réunion',
        addressCountry: 'FR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -21.2667,
        longitude: 55.3447,
      },
      telephone: '+262 2 62 26 81 83',
      email: 'yasmina.incana@notaires.fr',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '12:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '13:30',
          closes: '17:00',
        },
      ],
      priceRange: '€€',
      areaServed: {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: -21.2667,
          longitude: 55.3447,
        },
        geoRadius: '50000',
      },
      sameAs: [],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services Notariaux',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Immobilier',
              description: 'Achat, vente, hypothèque, copropriété',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Famille & Succession',
              description: 'Testament, donation, succession, mariage, PACS',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Entreprise & Patrimoine',
              description: 'Création société, cession, conseil patrimonial',
            },
          },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      url: baseUrl,
      name: 'Maître INCANA - Notaire',
      description: "Site officiel de l'étude notariale Maître INCANA",
      publisher: {
        '@id': `${baseUrl}/#organization`,
      },
      inLanguage: 'fr-FR',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${baseUrl}/#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Accueil',
          item: baseUrl,
        },
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${dmSans.variable} ${caveat.variable}`}>
      <head>
        {/* Preconnect pour performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://gaymkbmtppvkyzmkplzu.supabase.co" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" />

        {/* JSON-LD Structured Data */}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background antialiased">
        <MediaProtection />
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
