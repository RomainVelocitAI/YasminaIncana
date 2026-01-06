import { TeamMember } from '@/lib/types'

export const team: TeamMember[] = [
  {
    name: "Yasmina INCANA",
    role: "Notaire titulaire",
    image: "/images/maitre-incana.png",
    bio: "Major de promotion en Master à la Faculté de Droit, puis titulaire du Diplôme Supérieur du Notariat, Yasmina INCANA a fondé son étude en 2017. Soucieuse d'être proche de chacun, elle a choisi la ville de L'ETANG SALE afin d'offrir un service de proximité et un accueil dans un environnement chaleureux et décontracté. Accordant une grande importance à l'écoute, de nombreuses familles ont été accompagnées dans l'acquisition et la transmission de leurs biens.",
    email: "yasmina.incana@notaires.fr",
    specialties: ["Droit immobilier", "Droit de la famille", "Droit des successions"]
  },
  {
    name: "Chloé DUPÉRÉ",
    role: "Collaboratrice",
    image: "/images/team-chloe.png",
    bio: "Diplômée en Droit et forte de 10 années d'expérience acquises dans des études parisiennes, Chloé DUPÉRÉ apporte son expertise pointue en matière immobilière. Sa maîtrise des dossiers complexes et son sens du relationnel garantissant un accompagnement unique pour chaque projet.",
    email: null,
    specialties: ["Copropriété", "Transactions immobilières", "Droit de la construction"]
  },
  {
    name: "Melvyne CHEUNG YOU SUN",
    role: "Collaboratrice",
    image: "/images/team-melvyne.png",
    bio: "Diplômée en Droit, Melvyne CHEUNG YOU SUN apporte un suivi administratif des projets. En lien avec les Administrations, elle s'assure de l'avancée des démarches.",
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
