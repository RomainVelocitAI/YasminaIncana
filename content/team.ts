import { TeamMember } from '@/lib/types'

export const team: TeamMember[] = [
  {
    name: "Yasmina INCANA",
    role: "Notaire titulaire",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=faces",
    bio: "Maître Yasmina INCANA dirige l'étude avec passion et rigueur. Diplômée en droit notarial, elle accompagne ses clients dans toutes leurs démarches juridiques avec expertise et bienveillance. Son engagement envers l'excellence et la proximité client font d'elle une référence sur le territoire réunionnais.",
    email: "yasmina.incana@notaires.fr",
    specialties: ["Droit immobilier", "Droit de la famille", "Droit des successions"]
  },
  {
    name: "Chloé Dupéré",
    role: "Clerc de notaire",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=faces",
    bio: "Forte de 10 années d'expérience acquises dans des études parisiennes prestigieuses, Chloé Dupéré apporte son expertise pointue en matière de copropriété. Sa maîtrise des dossiers complexes et son sens du détail garantissent un accompagnement de qualité pour chaque transaction.",
    email: null,
    specialties: ["Copropriété", "Transactions immobilières", "Droit de la construction"]
  }
]

export const notaryInfo = {
  name: "Étude de Maître INCANA",
  title: "Notaire",
  address: "96, Avenue Raymond Barre",
  city: "L'Étang-Salé",
  postalCode: "97427",
  country: "La Réunion, France",
  phone: "0262 960 300",
  fax: "02 62 96 03 13",
  email: "yasmina.incana@notaires.fr",
  hours: [
    { days: "Lundi - Vendredi", morning: "8h30 - 12h00", afternoon: "14h00 - 18h00" },
    { days: "Samedi - Dimanche", morning: "Fermé", afternoon: "Fermé" }
  ]
}
