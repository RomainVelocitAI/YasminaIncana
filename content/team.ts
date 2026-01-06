import { TeamMember } from '@/lib/types'

export const team: TeamMember[] = [
  {
    name: "Yasmina INCANA",
    role: "Notaire titulaire",
    image: "/images/maitre-incana.png",
    bio: "Diplômée en droit notarial, Maître Yasmina INCANA a choisi de s'installer à La Réunion pour être au plus près de ses clients. Elle prend le temps d'écouter et d'expliquer chaque étape, convaincue que le notaire doit rendre le droit accessible à tous.",
    email: "yasmina.incana@notaires.fr",
    specialties: ["Droit immobilier", "Droit de la famille", "Droit des successions"]
  },
  {
    name: "Chloé DUPÉRÉ",
    role: "Clerc de notaire",
    image: "/images/team-chloe.png",
    bio: "Forte de 10 années d'expérience acquises dans des études parisiennes prestigieuses, Chloé DUPÉRÉ apporte son expertise pointue en matière de copropriété. Sa maîtrise des dossiers complexes et son sens du détail garantissent un accompagnement de qualité pour chaque transaction.",
    email: null,
    specialties: ["Copropriété", "Transactions immobilières", "Droit de la construction"]
  },
  {
    name: "Melvyne CHEUNG YOU SUN",
    role: "Assistante juridique",
    image: "/images/team-melvyne.png",
    bio: "Diplômée en droit notarial, Melvyne CHEUNG YOU SUN apporte un suivi administratif des projets. En lien avec les Administrations, elle s'assure de l'avancée des démarches.",
    email: null,
    specialties: ["Suivi administratif", "Relations administrations", "Gestion des démarches"]
  }
]

export const notaryInfo = {
  name: "Étude de Maître INCANA",
  title: "Notaire",
  address: "96, Avenue Raymond Barre",
  city: "L'Étang Salé",
  postalCode: "97427",
  country: "La Réunion, France",
  phone: "0262 960 300",
  email: "office.incana@notaires.fr",
  hours: [
    { days: "Lundi - Vendredi", morning: "8h30-12h00 / 13h30-17h00", afternoon: "" },
    { days: "Samedi", morning: "À la demande (le matin)", afternoon: "" }
  ],
  appointmentNote: "Réception sur rendez-vous uniquement"
}
