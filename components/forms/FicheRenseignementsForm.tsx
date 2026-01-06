'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, FileText, User, Mail, Phone, MapPin, Calendar, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { jsPDF } from 'jspdf'

interface FormData {
  civilite: 'M.' | 'Mme' | ''
  nom: string
  prenoms: string
  profession: string
  dateNaissance: string
  lieuNaissance: string
  nationalite: string
  adresse: string
  codePostal: string
  ville: string
  telephone: string
  email: string
  situationMatrimoniale: 'celibataire' | 'marie' | 'divorce' | 'veuf' | 'pacse' | ''
  // Conjoint
  conjointCivilite: 'M.' | 'Mme' | ''
  conjointNom: string
  conjointPrenoms: string
  conjointProfession: string
  conjointDateNaissance: string
  conjointLieuNaissance: string
  // Mariage/PACS
  dateMariage: string
  lieuMariage: string
  regimeMatrimonial: 'legal' | 'contrat' | ''
  notaireContrat: string
  dateContrat: string
}

const initialFormData: FormData = {
  civilite: '',
  nom: '',
  prenoms: '',
  profession: '',
  dateNaissance: '',
  lieuNaissance: '',
  nationalite: 'Française',
  adresse: '',
  codePostal: '',
  ville: '',
  telephone: '',
  email: '',
  situationMatrimoniale: '',
  conjointCivilite: '',
  conjointNom: '',
  conjointPrenoms: '',
  conjointProfession: '',
  conjointDateNaissance: '',
  conjointLieuNaissance: '',
  dateMariage: '',
  lieuMariage: '',
  regimeMatrimonial: '',
  notaireContrat: '',
  dateContrat: '',
}

interface FicheRenseignementsFormProps {
  isOpen: boolean
  onClose: () => void
}

export function FicheRenseignementsForm({ isOpen, onClose }: FicheRenseignementsFormProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [step, setStep] = useState(1)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const showConjointSection = ['marie', 'pacse', 'divorce'].includes(formData.situationMatrimoniale)

  const generatePDF = () => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()

    // Couleurs
    const primaryColor: [number, number, number] = [13, 92, 99] // Bleu canard
    const goldColor: [number, number, number] = [194, 156, 96] // Doré
    const textColor: [number, number, number] = [51, 51, 51]

    // En-tête
    doc.setFillColor(...primaryColor)
    doc.rect(0, 0, pageWidth, 35, 'F')

    // Ligne dorée
    doc.setFillColor(...goldColor)
    doc.rect(0, 35, pageWidth, 3, 'F')

    // Titre
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(22)
    doc.setFont('helvetica', 'bold')
    doc.text('FICHE DE RENSEIGNEMENTS', pageWidth / 2, 20, { align: 'center' })

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text('Maître Yasmina INCANA - Notaire', pageWidth / 2, 28, { align: 'center' })

    // Contenu
    let y = 50
    doc.setTextColor(...textColor)

    // Fonction helper pour ajouter une section
    const addSection = (title: string) => {
      doc.setFillColor(...primaryColor)
      doc.rect(15, y - 5, pageWidth - 30, 8, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.text(title, 20, y)
      doc.setTextColor(...textColor)
      y += 10
    }

    // Fonction helper pour ajouter un champ
    const addField = (label: string, value: string) => {
      doc.setFontSize(10)
      doc.setFont('helvetica', 'bold')
      doc.text(label + ' :', 20, y)
      doc.setFont('helvetica', 'normal')
      doc.text(value || '___________________', 70, y)
      y += 7
    }

    // Section Identité
    addSection('IDENTITÉ')
    addField('Civilité', formData.civilite)
    addField('Nom', formData.nom.toUpperCase())
    addField('Prénoms', formData.prenoms)
    addField('Profession', formData.profession)
    addField('Date de naissance', formData.dateNaissance)
    addField('Lieu de naissance', formData.lieuNaissance)
    addField('Nationalité', formData.nationalite)

    y += 5
    addSection('COORDONNÉES')
    addField('Adresse', formData.adresse)
    addField('Code postal', formData.codePostal)
    addField('Ville', formData.ville)
    addField('Téléphone', formData.telephone)
    addField('Email', formData.email)

    y += 5
    addSection('SITUATION MATRIMONIALE')
    const situations: Record<string, string> = {
      celibataire: 'Célibataire',
      marie: 'Marié(e)',
      divorce: 'Divorcé(e)',
      veuf: 'Veuf(ve)',
      pacse: 'Pacsé(e)'
    }
    addField('Situation', situations[formData.situationMatrimoniale] || '')

    if (showConjointSection) {
      y += 5
      addSection('CONJOINT / EX-CONJOINT / PARTENAIRE')
      addField('Civilité', formData.conjointCivilite)
      addField('Nom', formData.conjointNom.toUpperCase())
      addField('Prénoms', formData.conjointPrenoms)
      addField('Profession', formData.conjointProfession)
      addField('Date de naissance', formData.conjointDateNaissance)
      addField('Lieu de naissance', formData.conjointLieuNaissance)

      if (['marie', 'pacse'].includes(formData.situationMatrimoniale)) {
        y += 5
        addSection('UNION')
        addField('Date', formData.dateMariage)
        addField('Lieu', formData.lieuMariage)
        addField('Régime', formData.regimeMatrimonial === 'contrat' ? 'Avec contrat de mariage' : 'Sans contrat (régime légal)')
        if (formData.regimeMatrimonial === 'contrat') {
          addField('Notaire du contrat', formData.notaireContrat)
          addField('Date du contrat', formData.dateContrat)
        }
      }
    }

    // Pied de page
    const footerY = doc.internal.pageSize.getHeight() - 25
    doc.setFillColor(...primaryColor)
    doc.rect(0, footerY, pageWidth, 25, 'F')

    doc.setFillColor(...goldColor)
    doc.rect(0, footerY, pageWidth, 2, 'F')

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(9)
    doc.text('96 Avenue Raymond Barre - 97427 L\'Étang Salé', pageWidth / 2, footerY + 8, { align: 'center' })
    doc.text('Tél : 0262 960 300 - Email : office.incana@notaires.fr', pageWidth / 2, footerY + 14, { align: 'center' })

    // Télécharger
    const fileName = `fiche-renseignements-${formData.nom || 'client'}.pdf`
    doc.save(fileName)
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
            <div className="bg-primary p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-semibold">Fiche de renseignements</h3>
                    <p className="text-sm opacity-80">Étape {step}/2</p>
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

            {/* Form content */}
            <div className="flex-1 overflow-y-auto p-6">
              {step === 1 && (
                <div className="space-y-6">
                  {/* Identité */}
                  <div>
                    <h4 className="font-serif text-lg text-text-primary mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Identité
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">Civilité</label>
                        <select
                          name="civilite"
                          value={formData.civilite}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg border border-border-light focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                        >
                          <option value="">Sélectionner</option>
                          <option value="M.">Monsieur</option>
                          <option value="Mme">Madame</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">Nom</label>
                        <input
                          type="text"
                          name="nom"
                          value={formData.nom}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg border border-border-light focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-text-secondary mb-1">Prénoms</label>
                        <input
                          type="text"
                          name="prenoms"
                          value={formData.prenoms}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg border border-border-light focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">Profession</label>
                        <input
                          type="text"
                          name="profession"
                          value={formData.profession}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg border border-border-light focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">Nationalité</label>
                        <input
                          type="text"
                          name="nationalite"
                          value={formData.nationalite}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg border border-border-light focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">Date de naissance</label>
                        <input
                          type="date"
                          name="dateNaissance"
                          value={formData.dateNaissance}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg border border-border-light focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">Lieu de naissance</label>
                        <input
                          type="text"
                          name="lieuNaissance"
                          value={formData.lieuNaissance}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg border border-border-light focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Coordonnées */}
                  <div>
                    <h4 className="font-serif text-lg text-text-primary mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Coordonnées
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-text-secondary mb-1">Adresse</label>
                        <input
                          type="text"
                          name="adresse"
                          value={formData.adresse}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg border border-border-light focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">Code postal</label>
                        <input
                          type="text"
                          name="codePostal"
                          value={formData.codePostal}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg border border-border-light focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">Ville</label>
                        <input
                          type="text"
                          name="ville"
                          value={formData.ville}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg border border-border-light focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">Téléphone</label>
                        <input
                          type="tel"
                          name="telephone"
                          value={formData.telephone}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg border border-border-light focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg border border-border-light focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  {/* Situation matrimoniale */}
                  <div>
                    <h4 className="font-serif text-lg text-text-primary mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Situation matrimoniale
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">Situation</label>
                        <select
                          name="situationMatrimoniale"
                          value={formData.situationMatrimoniale}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg border border-border-light focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                        >
                          <option value="">Sélectionner</option>
                          <option value="celibataire">Célibataire</option>
                          <option value="marie">Marié(e)</option>
                          <option value="pacse">Pacsé(e)</option>
                          <option value="divorce">Divorcé(e)</option>
                          <option value="veuf">Veuf(ve)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Conjoint */}
                  {showConjointSection && (
                    <div>
                      <h4 className="font-serif text-lg text-text-primary mb-4">
                        {formData.situationMatrimoniale === 'divorce' ? 'Ex-conjoint' : 'Conjoint / Partenaire'}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-text-secondary mb-1">Civilité</label>
                          <select
                            name="conjointCivilite"
                            value={formData.conjointCivilite}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-border-light focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                          >
                            <option value="">Sélectionner</option>
                            <option value="M.">Monsieur</option>
                            <option value="Mme">Madame</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text-secondary mb-1">Nom</label>
                          <input
                            type="text"
                            name="conjointNom"
                            value={formData.conjointNom}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-border-light focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-text-secondary mb-1">Prénoms</label>
                          <input
                            type="text"
                            name="conjointPrenoms"
                            value={formData.conjointPrenoms}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-border-light focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text-secondary mb-1">Profession</label>
                          <input
                            type="text"
                            name="conjointProfession"
                            value={formData.conjointProfession}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-border-light focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text-secondary mb-1">Date de naissance</label>
                          <input
                            type="date"
                            name="conjointDateNaissance"
                            value={formData.conjointDateNaissance}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-border-light focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-text-secondary mb-1">Lieu de naissance</label>
                          <input
                            type="text"
                            name="conjointLieuNaissance"
                            value={formData.conjointLieuNaissance}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-border-light focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mariage/PACS */}
                  {['marie', 'pacse'].includes(formData.situationMatrimoniale) && (
                    <div>
                      <h4 className="font-serif text-lg text-text-primary mb-4">
                        {formData.situationMatrimoniale === 'pacse' ? 'PACS' : 'Mariage'}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-text-secondary mb-1">Date</label>
                          <input
                            type="date"
                            name="dateMariage"
                            value={formData.dateMariage}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-border-light focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text-secondary mb-1">Lieu</label>
                          <input
                            type="text"
                            name="lieuMariage"
                            value={formData.lieuMariage}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-border-light focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-text-secondary mb-1">Régime matrimonial</label>
                          <select
                            name="regimeMatrimonial"
                            value={formData.regimeMatrimonial}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-border-light focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                          >
                            <option value="">Sélectionner</option>
                            <option value="legal">Sans contrat de mariage (régime légal)</option>
                            <option value="contrat">Avec contrat de mariage</option>
                          </select>
                        </div>
                        {formData.regimeMatrimonial === 'contrat' && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-text-secondary mb-1">Notaire du contrat</label>
                              <input
                                type="text"
                                name="notaireContrat"
                                value={formData.notaireContrat}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-border-light focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-text-secondary mb-1">Date du contrat</label>
                              <input
                                type="date"
                                name="dateContrat"
                                value={formData.dateContrat}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-border-light focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border-light bg-secondary/30 flex justify-between">
              {step === 1 ? (
                <>
                  <Button variant="outline" onClick={onClose}>
                    Annuler
                  </Button>
                  <Button onClick={() => setStep(2)} className="bg-primary hover:bg-primary-dark text-white">
                    Suivant
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Retour
                  </Button>
                  <Button onClick={generatePDF} className="bg-primary hover:bg-primary-dark text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Générer le PDF
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Fonction pour télécharger le PDF vierge de la fiche de renseignements
export function generateBlankFichePDF() {
  // Télécharger le PDF pré-conçu avec le logo en filigrane
  const link = document.createElement('a')
  link.href = '/documents/fiche-renseignements.pdf'
  link.download = 'fiche-renseignements.pdf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Alias pour compatibilité
export { FicheRenseignementsForm as FicheRenseignementsModal }
