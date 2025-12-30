'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'
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
  ArrowRight
} from 'lucide-react'
import { FAQSection } from '@/components/faq-sections'

// Documents organisés par catégorie
const documentCategories = [
  {
    id: 'immobilier',
    name: 'Immobilier',
    icon: Home,
    color: 'bg-primary/10 text-primary',
    documents: [
      { name: 'Fiche de renseignement à remettre à l\'acquéreur', file: '/documents/immobilier/fiche-acquereur.pdf' },
      { name: 'Fiche de renseignement à remettre à l\'intervenant', file: '/documents/immobilier/fiche-intervenant.pdf' },
      { name: 'Fiche de renseignement à remettre au vendeur', file: '/documents/immobilier/fiche-vendeur.pdf' },
      { name: 'Questionnaire Bien vendu via Agence Immobilière', file: '/documents/immobilier/questionnaire-agence.pdf' },
      { name: 'Questionnaire Bien vendu Particulier à Particulier', file: '/documents/immobilier/questionnaire-particulier.pdf' },
    ]
  },
  {
    id: 'famille',
    name: 'Famille',
    icon: Users,
    color: 'bg-gold/10 text-gold',
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
    name: 'Droit des affaires',
    icon: Building2,
    color: 'bg-teal/10 text-teal',
    documents: [
      { name: 'Constitution SCI', file: '/documents/affaires/constitution-sci.pdf' },
      { name: 'Fiche Renseignement Associés SCI', file: '/documents/affaires/fiche-associes-sci.pdf' },
      { name: 'Cession de droit au bail', file: '/documents/affaires/cession-bail.pdf' },
      { name: 'Cession de parts sociales', file: '/documents/affaires/cession-parts.pdf' },
      { name: 'Fiche Renseignement BAILLEUR', file: '/documents/affaires/fiche-bailleur.pdf' },
      { name: 'Fiche Renseignement PRENEUR', file: '/documents/affaires/fiche-preneur.pdf' },
      { name: 'Acquisition Fonds de Commerce (CESSIONNAIRE)', file: '/documents/affaires/fonds-commerce-cessionnaire.pdf' },
      { name: 'Fonds de Commerce (CÉDANT)', file: '/documents/affaires/fonds-commerce-cedant.pdf' },
    ]
  },
]

// Composant pour les onglets de documents (à l'intérieur de la carte)
function DocumentTabs() {
  const [activeTab, setActiveTab] = useState('immobilier')
  const activeCategory = documentCategories.find(cat => cat.id === activeTab)!

  return (
    <div className="h-full w-full flex flex-col bg-background overflow-hidden">
      {/* En-tête avec titre */}
      <div className="p-4 md:p-6 border-b border-border-light bg-secondary/30">
        <h2 className="font-serif text-lg md:text-xl text-text-primary text-center">
          Documents à préparer
        </h2>
      </div>

      {/* Onglets de catégories */}
      <div className="flex justify-center gap-2 md:gap-4 p-3 md:p-4 border-b border-border-light bg-surface">
        {documentCategories.map((category) => {
          const Icon = category.icon
          return (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-full border text-xs md:text-sm transition-all duration-300 ${
                activeTab === category.id
                  ? 'bg-primary text-white border-primary shadow-md'
                  : 'bg-background border-border hover:border-primary hover:text-primary'
              }`}
            >
              <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="font-medium">{category.name}</span>
            </button>
          )
        })}
      </div>

      {/* Liste des documents scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-border-light">
          {activeCategory.documents.map((doc, index) => (
            <motion.div
              key={doc.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
              className="flex items-center justify-between p-3 md:p-4 hover:bg-secondary/30 transition-colors group"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                  <FileText className="w-4 h-4 text-text-muted group-hover:text-primary transition-colors" />
                </div>
                <span className="text-text-primary text-sm md:text-base font-medium truncate">{doc.name}</span>
              </div>
              <a
                href={doc.file}
                download
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs md:text-sm text-primary hover:bg-primary hover:text-white rounded-lg transition-all duration-300 shrink-0 ml-2"
              >
                <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Télécharger</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer avec info */}
      <div className="p-3 md:p-4 border-t border-border-light bg-secondary/20 text-center">
        <p className="text-xs md:text-sm text-text-muted">
          {activeCategory.documents.length} documents disponibles dans cette catégorie
        </p>
      </div>
    </div>
  )
}

export default function RendezVousPage() {
  return (
    <>
      {/* Hero avec Container Scroll Animation */}
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="h-px w-12 bg-gold" />
              <span className="text-gold text-sm uppercase tracking-[0.2em] font-medium">
                Prenez rendez-vous
              </span>
              <span className="h-px w-12 bg-gold" />
            </motion.div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text-primary mb-6">
              Préparez votre <span className="text-primary">rendez-vous</span>
            </h1>

            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
              Téléchargez et remplissez les documents correspondant à votre démarche
              avant de nous contacter.
            </p>
          </div>
        }
      >
        {/* Interface des documents avec onglets à l'intérieur de la carte */}
        <DocumentTabs />
      </ContainerScroll>

      {/* Section Contact / Prendre RDV */}
      <section className="py-16 md:py-24">
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

                <a href="mailto:contact@notaire-incana.re" className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                    <Mail className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted mb-1">Email</p>
                    <p className="text-lg text-text-primary font-medium group-hover:text-primary transition-colors">contact@notaire-incana.re</p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted mb-1">Adresse</p>
                    <p className="text-lg text-text-primary font-medium">96 Avenue Raymond Barre</p>
                    <p className="text-text-secondary">97427 L'Étang-Salé, La Réunion</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted mb-1">Horaires d'ouverture</p>
                    <p className="text-text-primary">Lundi - Vendredi : 8h00 - 12h00 / 14h00 - 17h00</p>
                    <p className="text-text-secondary">Samedi : Sur rendez-vous uniquement</p>
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

      {/* Section FAQ */}
      <FAQSection />
    </>
  )
}
