import { Service } from '@/lib/types'

export const services: Service[] = [
  {
    title: "Immobilier",
    slug: "immobilier",
    icon: "Home",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    shortDescription: "Ventes, acquisitions, prêts immobiliers et garanties hypothécaires",
    fullDescription: "Le notaire est l'acteur incontournable de toute transaction immobilière. De l'acquisition à la vente, en passant par les prêts et les garanties, nous vous accompagnons à chaque étape pour sécuriser votre projet immobilier.",
    prestations: [
      "Vente et acquisition de biens immobiliers",
      "Avant-contrats et promesses de vente",
      "Prêts immobiliers et garanties hypothécaires",
      "Copropriété et règlements",
      "VEFA et contrats de construction",
      "Baux d'habitation",
      "Viager",
      "Servitudes et mitoyenneté"
    ]
  },
  {
    title: "Famille & Succession",
    slug: "famille",
    icon: "Users",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop",
    shortDescription: "Successions, donations, testaments et protection du patrimoine familial",
    fullDescription: "La transmission du patrimoine et la protection de vos proches sont au cœur de nos préoccupations. Nous vous conseillons pour organiser votre succession, rédiger vos testaments et accompagner vos donations dans le respect de vos volontés.",
    prestations: [
      "Successions et déclarations de succession",
      "Donations entre vifs",
      "Donations-partages",
      "Testaments et legs",
      "Contrats de mariage et régimes matrimoniaux",
      "PACS",
      "Divorce et liquidation de régime",
      "Protection des majeurs vulnérables",
      "Adoption"
    ]
  },
  {
    title: "Entreprise & Patrimoine",
    slug: "entreprise",
    icon: "Building2",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    shortDescription: "Création de société, cessions et conseil patrimonial personnalisé",
    fullDescription: "Entrepreneurs et chefs d'entreprise, nous vous accompagnons dans la création, la transmission et la gestion de votre entreprise. Notre expertise en conseil patrimonial vous aide à optimiser et protéger votre patrimoine professionnel et personnel.",
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
