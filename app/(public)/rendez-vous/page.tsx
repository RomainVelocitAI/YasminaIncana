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
  CheckCircle2
} from 'lucide-react'

// Documents organisés par catégorie
const documentCategories = [
  {
    id: 'immobilier',
    name: 'Immobilier',
    icon: Home,
    color: 'primary',
    description: 'Ventes, acquisitions et transactions immobilières',
    features: [
      'Fiches acquéreur et vendeur',
      'Questionnaires de vente',
      'Documents intervenants'
    ],
    documents: [
      { name: 'Fiche de renseignement acquéreur', file: '/documents/immobilier/fiche-acquereur.pdf' },
      { name: 'Fiche de renseignement intervenant', file: '/documents/immobilier/fiche-intervenant.pdf' },
      { name: 'Fiche de renseignement vendeur', file: '/documents/immobilier/fiche-vendeur.pdf' },
      { name: 'Questionnaire vente via Agence', file: '/documents/immobilier/questionnaire-agence.pdf' },
      { name: 'Questionnaire vente Particulier', file: '/documents/immobilier/questionnaire-particulier.pdf' },
    ]
  },
  {
    id: 'famille',
    name: 'Famille',
    icon: Users,
    color: 'gold',
    description: 'Successions, donations et patrimoine familial',
    features: [
      'Fiches renseignements',
      'Documents donation',
      'Documents succession'
    ],
    documents: [
      { name: 'Fiche Renseignements', file: '/documents/famille/fiche-renseignements.pdf' },
      { name: 'Premier RDV – Donation', file: '/documents/famille/rdv-donation.pdf' },
      { name: 'Premier RDV – Succession', file: '/documents/famille/rdv-succession.pdf' },
      { name: 'Fiche Bien à donner', file: '/documents/famille/fiche-bien-donner.pdf' },
      { name: 'Fiche Donateur', file: '/documents/famille/fiche-donateur.pdf' },
      { name: 'Fiche Donataire', file: '/documents/famille/fiche-donataire.pdf' },
    ]
  },
  {
    id: 'affaires',
    name: 'Entreprise',
    icon: Building2,
    color: 'teal',
    description: 'Création de société, cessions et baux',
    features: [
      'Constitution SCI',
      'Cessions de parts',
      'Baux commerciaux'
    ],
    documents: [
      { name: 'Constitution SCI', file: '/documents/affaires/constitution-sci.pdf' },
      { name: 'Fiche Renseignement Associés SCI', file: '/documents/affaires/fiche-associes-sci.pdf' },
      { name: 'Cession de droit au bail', file: '/documents/affaires/cession-bail.pdf' },
      { name: 'Cession de parts sociales', file: '/documents/affaires/cession-parts.pdf' },
      { name: 'Fiche Renseignement BAILLEUR', file: '/documents/affaires/fiche-bailleur.pdf' },
      { name: 'Fiche Renseignement PRENEUR', file: '/documents/affaires/fiche-preneur.pdf' },
      { name: 'Acquisition Fonds de Commerce', file: '/documents/affaires/fonds-commerce-cessionnaire.pdf' },
      { name: 'Fonds de Commerce (CÉDANT)', file: '/documents/affaires/fonds-commerce-cedant.pdf' },
    ]
  },
]

// Modal pour afficher les documents
function DocumentModal({
  category,
  isOpen,
  onClose
}: {
  category: typeof documentCategories[0] | null
  isOpen: boolean
  onClose: () => void
}) {
  if (!category) return null

  const Icon = category.icon
  const colorClasses = {
    primary: 'bg-primary text-white',
    gold: 'bg-gold text-text-primary',
    teal: 'bg-teal text-white'
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
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-background rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[90vh]"
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
                    <p className="text-sm opacity-80">{category.documents.length} documents</p>
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

            {/* Documents list */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {category.documents.map((doc, index) => (
                  <motion.a
                    key={doc.name}
                    href={doc.file}
                    download
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                      <FileText className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors" />
                    </div>
                    <span className="flex-1 text-text-primary font-medium text-sm">{doc.name}</span>
                    <Download className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors shrink-0" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border-light bg-secondary/30">
              <p className="text-xs text-text-muted text-center">
                Cliquez sur un document pour le télécharger
              </p>
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
              Téléchargez et remplissez les documents correspondant à votre démarche
              avant de nous contacter.
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

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {category.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-sm text-text-primary">
                          <CheckCircle2 className={`w-5 h-5 ${colors.text} shrink-0`} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Document count */}
                    <div className="pt-6 border-t border-border-light">
                      <div className="flex items-center justify-between">
                        <span className="text-text-muted text-sm">{category.documents.length} documents</span>
                        <span className={`${colors.text} text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all`}>
                          Voir les documents
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
                    <p className="text-text-secondary">Samedi : Sur rendez-vous (matin uniquement)</p>
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

      {/* Modal */}
      <DocumentModal
        category={selectedCategory}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  )
}
