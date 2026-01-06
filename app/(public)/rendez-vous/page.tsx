'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  FileText,
  Download,
  Building2,
  Users,
  Home,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  X,
  CheckCircle2,
  ClipboardList,
  Edit3
} from 'lucide-react'
import { downloadChecklist } from '@/lib/pdf-generators'
import { FicheRenseignementsModal, generateBlankFichePDF } from '@/components/forms/FicheRenseignementsForm'

// Documents organisés par catégorie avec les vraies pièces à fournir
const documentCategories = [
  {
    id: 'immobilier',
    name: 'Immobilier',
    icon: Home,
    color: 'primary',
    description: 'Ventes, acquisitions et prescriptions trentenaires',
    subcategories: [
      {
        title: 'Vente - Vendeur',
        checklistId: 'vente-vendeur',
        provision: null,
        items: [
          'Livret de famille',
          'Carte d\'identité ou carte de résident',
          'Titre de propriété (acte notarié)',
          'Contrat de bail et 3 dernières quittances (si bien loué)',
          'Si copropriété : règlement, nom du syndic, 3 dernières AG et appels de charges',
          'Si lotissement : règlement, cahier des charges, statuts association syndicale',
          'Si emprunt en cours : nom banque, offre de prêt, tableau d\'amortissement',
          'Taxe foncière',
          'Factures et assurances décennales des travaux < 10 ans',
          'Si construction < 10 ans : permis de construire, plans, DAACT, certificat de conformité, assurance dommage-ouvrage',
          'Diagnostics : termites, électricité, amiante, loi Carrez, assainissement',
          'Procès-verbal de bornage et plan',
          'Avis de valeur vénale (si vente directe sans agence)'
        ]
      },
      {
        title: 'Vente - Acquéreur',
        checklistId: 'vente-acquereur',
        provision: null,
        items: [
          'Livret de famille',
          'Carte nationale d\'identité ou passeport',
          'Relevé d\'identité bancaire (RIB) signé',
          'Si prêt : nom organisme prêteur, montant, durée et taux max souhaités',
          'Si financement par vente d\'un bien : copie du compromis ou promesse',
          'Si construction envisagée : nature, surface et caractéristiques'
        ]
      },
      {
        title: 'Prescription trentenaire',
        checklistId: 'prescription-trentenaire',
        provision: '470 €',
        items: [
          'Plan cadastral du terrain',
          'Extrait de matrice cadastrale',
          'Procès-verbal de bornage contradictoire',
          'Sommation interpellative par Commissaire de Justice (avec photos)',
          'Procès-verbal d\'affichage par Commissaire de Justice',
          'Documents sur les constructions (permis, achèvement, conformité)',
          'Livret de famille des occupants',
          'Copie des pièces d\'identité',
          'Avis d\'imposition taxe foncière et taxe d\'habitation (10 dernières années min.)',
          'Anciens titres de propriété (s\'ils existent)',
          'États hypothécaires (fiche immeuble + fiche personnelle)'
        ]
      }
    ]
  },
  {
    id: 'famille',
    name: 'Famille & Succession',
    icon: Users,
    color: 'gold',
    description: 'Successions, donations, contrats de mariage et PACS',
    subcategories: [
      {
        title: 'Succession',
        checklistId: 'succession',
        provision: '470 €',
        items: [
          'Concernant le défunt :',
          '• Acte de décès',
          '• Livret de famille (+ livrets des précédents mariages)',
          '• Contrat de mariage',
          '• Testament / Donation entre époux',
          'Concernant le patrimoine :',
          '• Titre(s) de propriété du/des bien(s)',
          '• Justificatifs de comptes bancaires',
          '• Carte grise véhicule',
          '• Si fonds de commerce : titre, bail, état matériel/marchandises, extrait RCS/RM',
          '• Si parts de société : statuts, titres, dernier bilan',
          '• Reconnaissances de dettes, actes de prêt',
          '• Frais funéraires (mémoire, quittance)',
          '• Avertissements d\'impôts',
          '• Justificatifs de toutes dettes',
          'Pour chaque héritier :',
          '• Pièce d\'identité',
          '• RIB signé'
        ]
      },
      {
        title: 'Donation / Donation-partage',
        checklistId: 'donation',
        provision: '470 €',
        items: [
          'Pour le donateur ET le donataire :',
          '• Extrait acte de naissance',
          '• Extrait acte de mariage',
          '• Copie pièce d\'identité',
          '• Contrat de mariage ou PACS le cas échéant',
          'Pour le donateur uniquement :',
          '• Livret de famille',
          '• Titre de propriété',
          '• Avis de valeur vénale ou estimation < 3 mois',
          '• Plan de bornage et PV du géomètre-expert',
          '• Si division parcellaire : document d\'arpentage, déclaration préalable/permis',
          '• Plan de prévention des risques naturels (mairie)',
          '• Copie du bail si bien loué',
          '• Si immeuble < 10 ans : permis de construire, plans, DAACT, certificat conformité',
          '• Existence fosse septique, détecteur fumée, borne recharge, piscine...'
        ]
      },
      {
        title: 'Contrat de mariage',
        checklistId: 'contrat-mariage',
        provision: '350 €',
        items: [
          'Pour chaque futur époux :',
          '• Fiche de renseignements complétée',
          '• Copie recto-verso pièce d\'identité (CNI ou passeport)',
          '• Extrait d\'acte de naissance < 2 mois',
          '• RIB signé',
          'Si nationalité étrangère :',
          '• Acte de naissance < 2 mois traduit par traducteur assermenté',
          '• Certificat de coutume ou célibat traduit',
          'Étapes :',
          '1. RDV de renseignements avant le mariage',
          '2. Transmission des documents',
          '3. Réception du projet par mail',
          '4. RDV de signature avant le mariage'
        ]
      },
      {
        title: 'PACS',
        checklistId: 'pacs',
        provision: '350 €',
        items: [
          'Pour chaque futur partenaire :',
          '• Fiche de renseignements complétée',
          '• Copie recto-verso pièce d\'identité (CNI ou passeport)',
          '• Extrait d\'acte de naissance < 2 mois',
          '• RIB signé',
          'Si nationalité étrangère :',
          '• Acte de naissance < 2 mois traduit par traducteur assermenté',
          '• Certificat de coutume ou célibat traduit'
        ]
      }
    ]
  },
  {
    id: 'entreprise',
    name: 'Entreprise & Société',
    icon: Building2,
    color: 'teal',
    description: 'Constitution SCI, baux commerciaux',
    subcategories: [
      {
        title: 'Constitution SCI',
        checklistId: 'sci',
        provision: '470 €',
        items: [
          'Pour chaque associé :',
          '• Nom, prénom, date et lieu de naissance',
          '• Situation maritale (conjoint, date/lieu mariage, régime)',
          '• Adresse postale, email, téléphone',
          '• Copie pièce d\'identité',
          '• Copie carte vitale',
          '• Acte de naissance',
          '• Livret de famille (si marié)',
          '• RIB signé',
          'Informations sur la SCI :',
          '• Nom de la SCI',
          '• Montant du capital social',
          '• Répartition des parts entre associés',
          '• Choix IR ou IS',
          '• Adresse du siège social + titre propriété ou bail'
        ]
      },
      {
        title: 'Bail commercial',
        checklistId: 'bail-commercial',
        provision: null,
        items: [
          'Pour une personne physique :',
          '• Fiche de renseignements complétée',
          '• Pièce d\'identité',
          'Pour une personne morale :',
          '• Statuts à jour',
          '• Pièce d\'identité du représentant légal',
          '• Délibération de nomination (si hors statuts)',
          '• KBIS < 3 mois',
          'Concernant le bien :',
          '• Titre de propriété',
          '• Adresse postale',
          '• Règlement de copropriété (si applicable)',
          '• Bail antérieur, résiliation, état des lieux sortie',
          'Modalités du bail :',
          '• Montant du loyer, mensuel ou annuel',
          '• Soumis à TVA ou non',
          '• Pas de porte, dépôt de garantie, caution',
          '• Taxe foncière à charge du bailleur ou preneur',
          '• Travaux autorisés, prévus ou réalisés < 3 ans'
        ]
      }
    ]
  },
]

// Modal pour afficher les pièces à fournir par sous-catégorie
function DocumentModal({
  category,
  isOpen,
  onClose,
  onOpenFicheForm
}: {
  category: typeof documentCategories[0] | null
  isOpen: boolean
  onClose: () => void
  onOpenFicheForm: () => void
}) {
  if (!category) return null

  const Icon = category.icon
  const colorClasses = {
    primary: 'bg-primary text-white',
    gold: 'bg-gold text-text-primary',
    teal: 'bg-teal text-white'
  }

  const accentClasses = {
    primary: 'text-primary bg-primary/10',
    gold: 'text-gold bg-gold/10',
    teal: 'text-teal bg-teal/10'
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-background rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className={`${colorClasses[category.color as keyof typeof colorClasses]} p-6`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-semibold">{category.name}</h3>
                    <p className="text-sm opacity-80">{category.subcategories.length} types de dossiers</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Section Fiche de renseignements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-primary/5 border-2 border-primary/30 rounded-xl p-5"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <ClipboardList className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-text-primary font-semibold">
                      Fiche de renseignements
                    </h4>
                    <p className="text-sm text-text-secondary">
                      À compléter obligatoirement pour tout dossier
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => {
                      onClose()
                      setTimeout(onOpenFicheForm, 300)
                    }}
                    className="flex-1 bg-primary hover:bg-primary-dark text-white"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Remplir en ligne
                  </Button>
                  <Button
                    onClick={() => generateBlankFichePDF()}
                    variant="outline"
                    className="flex-1 border-primary text-primary hover:bg-primary/10"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    PDF vierge
                  </Button>
                </div>
              </motion.div>

              {/* Subcategories list */}
              {category.subcategories.map((sub, index) => (
                <motion.div
                  key={sub.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index + 1) * 0.1 }}
                  className="bg-secondary/30 rounded-xl p-5"
                >
                  {/* Subcategory header */}
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-serif text-lg text-text-primary font-semibold">{sub.title}</h4>
                    {sub.provision && (
                      <span className={`text-sm font-medium px-3 py-1 rounded-full ${accentClasses[category.color as keyof typeof accentClasses]}`}>
                        Provision : {sub.provision}
                      </span>
                    )}
                  </div>

                  {/* Items list */}
                  <ul className="space-y-2 mb-4">
                    {sub.items.map((item, i) => {
                      const isHeader = !item.startsWith('•') && item.endsWith(':')
                      const isSubItem = item.startsWith('•')

                      return (
                        <li
                          key={i}
                          className={`text-sm ${
                            isHeader
                              ? 'font-medium text-text-primary mt-3 first:mt-0'
                              : isSubItem
                              ? 'text-text-secondary pl-4'
                              : 'text-text-secondary flex items-start gap-2'
                          }`}
                        >
                          {!isHeader && !isSubItem && (
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          )}
                          {isSubItem ? item.substring(2) : item}
                        </li>
                      )
                    })}
                  </ul>

                  {/* Bouton télécharger checklist */}
                  <Button
                    onClick={() => downloadChecklist(sub.checklistId)}
                    variant="outline"
                    size="sm"
                    className="w-full border-gold/50 text-gold hover:bg-gold/10 hover:border-gold"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger la fiche
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function RendezVousPage() {
  const [selectedCategory, setSelectedCategory] = useState<typeof documentCategories[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFicheFormOpen, setIsFicheFormOpen] = useState(false)

  const openModal = (category: typeof documentCategories[0]) => {
    setSelectedCategory(category)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedCategory(null), 300)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-secondary/50 to-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text-primary mb-6">
              Préparez votre <span className="text-primary">rendez-vous</span>
            </h1>
            <p className="text-lg text-text-secondary">
              Consultez la liste des pièces à fournir selon votre démarche
              pour préparer au mieux votre rendez-vous.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing-style Cards Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {documentCategories.map((category, index) => {
              const Icon = category.icon
              const isMiddle = index === 1

              const colorClasses = {
                primary: {
                  bg: 'bg-primary',
                  bgLight: 'bg-primary/10',
                  text: 'text-primary',
                  border: 'border-primary',
                  hover: 'hover:border-primary'
                },
                gold: {
                  bg: 'bg-gold',
                  bgLight: 'bg-gold/10',
                  text: 'text-gold',
                  border: 'border-gold',
                  hover: 'hover:border-gold'
                },
                teal: {
                  bg: 'bg-teal',
                  bgLight: 'bg-teal/10',
                  text: 'text-teal',
                  border: 'border-teal',
                  hover: 'hover:border-teal'
                }
              }

              const colors = colorClasses[category.color as keyof typeof colorClasses]

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative group cursor-pointer ${isMiddle ? 'md:-mt-4 md:mb-4' : ''}`}
                  onClick={() => openModal(category)}
                >
                  <div className={`h-full bg-background border-2 border-border-light ${colors.hover} rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl ${colors.bgLight} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-8 h-8 ${colors.text}`} />
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-serif text-2xl text-text-primary mb-2">{category.name}</h3>
                    <p className="text-text-secondary text-sm mb-6">{category.description}</p>

                    {/* Subcategories as features */}
                    <ul className="space-y-3 mb-8">
                      {category.subcategories.map((sub) => (
                        <li key={sub.title} className="flex items-center gap-3 text-sm text-text-primary">
                          <CheckCircle2 className={`w-5 h-5 ${colors.text} shrink-0`} />
                          {sub.title}
                          {sub.provision && (
                            <span className="text-xs text-text-muted">({sub.provision})</span>
                          )}
                        </li>
                      ))}
                    </ul>

                    {/* Document count */}
                    <div className="pt-6 border-t border-border-light">
                      <div className="flex items-center justify-between">
                        <span className="text-text-muted text-sm">{category.subcategories.length} types de dossiers</span>
                        <span className={`${colors.text} text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all`}>
                          Voir les pièces
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section Contact / Prendre RDV */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Informations de contact */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-6">
                Nous contacter
              </h2>
              <p className="text-text-secondary mb-8">
                Une fois vos documents préparés, n'hésitez pas à nous contacter pour
                fixer un rendez-vous. Notre équipe se tient à votre disposition.
              </p>

              <div className="space-y-6">
                <a href="tel:0262960300" className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                    <Phone className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted mb-1">Téléphone</p>
                    <p className="text-lg text-text-primary font-medium group-hover:text-primary transition-colors">0262 960 300</p>
                  </div>
                </a>

                <a href="mailto:office.incana@notaires.fr" className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                    <Mail className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted mb-1">Email</p>
                    <p className="text-lg text-text-primary font-medium group-hover:text-primary transition-colors">office.incana@notaires.fr</p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted mb-1">Adresse</p>
                    <p className="text-lg text-text-primary font-medium">96 Avenue Raymond Barre</p>
                    <p className="text-text-secondary">97427 L'Étang Salé</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted mb-1">Horaires d'ouverture</p>
                    <p className="text-text-primary">Lundi - Vendredi : 8h30-12h00 / 13h30-17h00</p>
                    <p className="text-text-secondary">Samedi : À la demande (le matin)</p>
                    <p className="text-text-secondary text-sm italic mt-1">Réception sur rendez-vous uniquement</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 border border-gold/20 -z-10" />
              <div className="bg-text-primary p-8 md:p-12">
                <h3 className="font-serif text-2xl md:text-3xl text-white mb-4">
                  Prêt à prendre rendez-vous ?
                </h3>
                <p className="text-white/70 mb-8">
                  Contactez-nous directement ou utilisez notre formulaire de contact
                  pour planifier votre rendez-vous.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary hover:bg-primary-dark text-white"
                  >
                    <Link href="/contact">
                      Formulaire de contact
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-text-primary"
                  >
                    <a href="tel:0262960300">
                      <Phone className="w-4 h-4 mr-2" />
                      Appeler
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modal des documents */}
      <DocumentModal
        category={selectedCategory}
        isOpen={isModalOpen}
        onClose={closeModal}
        onOpenFicheForm={() => setIsFicheFormOpen(true)}
      />

      {/* Modal fiche de renseignements */}
      <FicheRenseignementsModal
        isOpen={isFicheFormOpen}
        onClose={() => setIsFicheFormOpen(false)}
      />
    </>
  )
}
