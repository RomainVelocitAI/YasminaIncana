import { Service } from '@/lib/types'

export const services: Service[] = [
  {
    title: "Immobilier",
    slug: "immobilier",
    icon: "Home",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    shortDescription: "Ventes, acquisitions, prêts immobiliers et garanties hypothécaires",
    fullDescription: "L'Office notarial vous accompagne dans vos opérations de vente et d'acquisitions immobilières de maisons, appartements, terrains à bâtir, terrains agricoles, etc.",
    prestations: [
      "Ventes et acquisitions immobilières",
      "Prêt immobilier",
      "Servitudes"
    ]
  },
  {
    title: "Famille & Succession",
    slug: "famille",
    icon: "Users",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop",
    shortDescription: "Successions, donations, testaments et protection du patrimoine familial",
    fullDescription: "Votre Notaire est le conservateur des temps forts de votre vie (mariage, pacs, adoption, filiation, testament, divorce, donation, succession, ...).",
    prestations: [
      "Successions",
      "Donations entre vifs",
      "Donations-partages",
      "Testament",
      "Contrat de mariage",
      "PACS",
      "Divorce",
      "Adoption"
    ]
  },
  {
    title: "Entreprise & Patrimoine",
    slug: "entreprise",
    icon: "Building2",
    image: "/images/service-entreprise.webp",
    shortDescription: "Création de société, cessions et conseil patrimonial personnalisé",
    fullDescription: "Entrepreneurs et dirigeants, nous vous accompagnons dans la création, la transmission et la gestion de vos sociétés (SCI, SARL, SAS, SCCV, ...).",
    prestations: [
      "Création et constitution de sociétés",
      "Cessions de parts sociales et actions",
      "Cessions de fonds de commerce",
      "Baux commerciaux et professionnels",
      "Augmentations et réductions de capital",
      "Fusions et transformations",
      "Conseil patrimonial",
      "Holding et structuration patrimoniale",
      "Pactes d'associés"
    ]
  }
]

export const serviceIcons: Record<string, string> = {
  immobilier: "Home",
  famille: "Users",
  entreprise: "Building2"
}
