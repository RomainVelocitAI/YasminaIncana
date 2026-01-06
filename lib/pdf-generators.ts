import { jsPDF } from 'jspdf'

// Couleurs de la charte graphique
const COLORS = {
  primary: [13, 92, 99] as [number, number, number],    // Bleu canard
  gold: [194, 156, 96] as [number, number, number],     // Doré
  text: [51, 51, 51] as [number, number, number],
  lightGray: [245, 245, 245] as [number, number, number],
}

interface ChecklistItem {
  text: string
  isHeader?: boolean
}

interface ChecklistConfig {
  title: string
  subtitle?: string
  provision?: string
  items: ChecklistItem[]
}

// Fonction générique pour créer une checklist PDF
export function generateChecklistPDF(config: ChecklistConfig) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()

  // En-tête bleu canard
  doc.setFillColor(...COLORS.primary)
  doc.rect(0, 0, pageWidth, 40, 'F')

  // Ligne dorée
  doc.setFillColor(...COLORS.gold)
  doc.rect(0, 40, pageWidth, 3, 'F')

  // Titre
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('CHECKLIST - ' + config.title.toUpperCase(), pageWidth / 2, 18, { align: 'center' })

  // Sous-titre
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text('Maître Yasmina INCANA - Notaire à L\'Étang Salé', pageWidth / 2, 28, { align: 'center' })

  if (config.subtitle) {
    doc.setFontSize(9)
    doc.text(config.subtitle, pageWidth / 2, 35, { align: 'center' })
  }

  // Provision si applicable
  if (config.provision) {
    doc.setFillColor(...COLORS.gold)
    doc.roundedRect(pageWidth - 60, 48, 45, 12, 2, 2, 'F')
    doc.setTextColor(...COLORS.text)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.text('Provision : ' + config.provision, pageWidth - 37.5, 55, { align: 'center' })
  }

  // Contenu
  let y = 58
  doc.setTextColor(...COLORS.text)

  // Instruction
  doc.setFontSize(9)
  doc.setFont('helvetica', 'italic')
  doc.text('Cochez chaque document une fois rassemblé :', 20, y)
  y += 10

  // Items
  config.items.forEach((item) => {
    if (y > pageHeight - 40) {
      // Nouvelle page si nécessaire
      doc.addPage()
      y = 20
    }

    if (item.isHeader) {
      // Sous-titre / catégorie
      y += 3
      doc.setFillColor(...COLORS.primary)
      doc.rect(15, y - 4, pageWidth - 30, 7, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(10)
      doc.setFont('helvetica', 'bold')
      doc.text(item.text, 20, y)
      doc.setTextColor(...COLORS.text)
      y += 10
    } else {
      // Item avec checkbox
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')

      // Checkbox
      doc.setDrawColor(...COLORS.primary)
      doc.setLineWidth(0.5)
      doc.rect(20, y - 4, 5, 5)

      // Texte
      const textLines = doc.splitTextToSize(item.text, pageWidth - 55)
      doc.text(textLines, 30, y)
      y += 7 * textLines.length
    }
  })

  // Section notes
  y += 10
  if (y < pageHeight - 60) {
    doc.setFillColor(...COLORS.lightGray)
    doc.rect(15, y, pageWidth - 30, 40, 'F')
    doc.setDrawColor(...COLORS.primary)
    doc.setLineWidth(0.5)
    doc.rect(15, y, pageWidth - 30, 40)

    doc.setTextColor(...COLORS.text)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.text('Notes :', 20, y + 8)
  }

  // Pied de page
  const footerY = pageHeight - 20
  doc.setFillColor(...COLORS.primary)
  doc.rect(0, footerY, pageWidth, 20, 'F')

  doc.setFillColor(...COLORS.gold)
  doc.rect(0, footerY, pageWidth, 2, 'F')

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(8)
  doc.text('96 Avenue Raymond Barre - 97427 L\'Étang Salé | Tél : 0262 960 300 | office.incana@notaires.fr', pageWidth / 2, footerY + 10, { align: 'center' })

  // Télécharger
  const fileName = `checklist-${config.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.pdf`
  doc.save(fileName)
}

// Configurations des checklists par type de dossier
export const CHECKLIST_CONFIGS: Record<string, ChecklistConfig> = {
  'vente-vendeur': {
    title: 'Vente - Vendeur',
    subtitle: 'Documents à fournir pour la vente de votre bien',
    items: [
      { text: 'Livret de famille' },
      { text: 'Carte d\'identité ou carte de résident' },
      { text: 'Titre de propriété (acte notarié)' },
      { text: 'Contrat de bail et 3 dernières quittances (si bien loué)' },
      { text: 'COPROPRIÉTÉ', isHeader: true },
      { text: 'Règlement de copropriété' },
      { text: 'Nom et adresse du syndic' },
      { text: '3 dernières assemblées générales' },
      { text: '3 derniers appels de charges' },
      { text: 'LOTISSEMENT', isHeader: true },
      { text: 'Règlement et cahier des charges' },
      { text: 'Statuts de l\'association syndicale' },
      { text: 'Coordonnées du président' },
      { text: 'FINANCEMENT', isHeader: true },
      { text: 'Si emprunt en cours : nom de la banque' },
      { text: 'Offre de prêt' },
      { text: 'Tableau d\'amortissement' },
      { text: 'Attestation d\'assurance' },
      { text: 'FISCALITÉ & DIAGNOSTICS', isHeader: true },
      { text: 'Taxe foncière' },
      { text: 'Diagnostic termites (< 6 mois)' },
      { text: 'Diagnostic électricité (si > 15 ans)' },
      { text: 'Diagnostic amiante (si permis < 1997)' },
      { text: 'Diagnostic loi Carrez (si copropriété)' },
      { text: 'Diagnostic assainissement (fosse septique)' },
      { text: 'TRAVAUX & CONSTRUCTION', isHeader: true },
      { text: 'Factures travaux < 10 ans' },
      { text: 'Assurances décennales des artisans' },
      { text: 'Permis de construire (si < 10 ans)' },
      { text: 'Plans de construction' },
      { text: 'DAACT et certificat de conformité' },
      { text: 'Assurance dommage-ouvrage' },
      { text: 'TERRAIN', isHeader: true },
      { text: 'Procès-verbal de bornage' },
      { text: 'Plan de bornage' },
      { text: 'Avis de valeur vénale (si sans agence)' },
    ]
  },

  'vente-acquereur': {
    title: 'Vente - Acquéreur',
    subtitle: 'Documents à fournir pour votre acquisition',
    items: [
      { text: 'Livret de famille' },
      { text: 'Carte nationale d\'identité ou passeport' },
      { text: 'Relevé d\'identité bancaire (RIB) signé' },
      { text: 'FINANCEMENT PAR PRÊT', isHeader: true },
      { text: 'Nom de l\'organisme prêteur' },
      { text: 'Montant du prêt envisagé' },
      { text: 'Durée maximum souhaitée' },
      { text: 'Taux maximum souhaité' },
      { text: 'FINANCEMENT PAR VENTE', isHeader: true },
      { text: 'Copie du compromis ou promesse de vente' },
      { text: 'CONSTRUCTION ENVISAGÉE', isHeader: true },
      { text: 'Nature de la construction' },
      { text: 'Surface prévue' },
      { text: 'Caractéristiques particulières' },
    ]
  },

  'prescription-trentenaire': {
    title: 'Prescription trentenaire',
    subtitle: 'Documents pour établir la prescription acquisitive',
    provision: '470 €',
    items: [
      { text: 'Plan cadastral du terrain' },
      { text: 'Extrait de matrice cadastrale' },
      { text: 'Procès-verbal de bornage contradictoire' },
      { text: 'Sommation interpellative par Commissaire de Justice' },
      { text: 'Photographies attestant de l\'occupation' },
      { text: 'Procès-verbal d\'affichage par Commissaire de Justice' },
      { text: 'CONSTRUCTIONS', isHeader: true },
      { text: 'Permis de construire' },
      { text: 'Date d\'achèvement des travaux' },
      { text: 'Certificat de conformité' },
      { text: 'ÉTAT CIVIL', isHeader: true },
      { text: 'Livret de famille des occupants' },
      { text: 'Copie des pièces d\'identité' },
      { text: 'PREUVES D\'OCCUPATION', isHeader: true },
      { text: 'Avis d\'imposition taxe foncière (10 ans min.)' },
      { text: 'Avis d\'imposition taxe d\'habitation (10 ans min.)' },
      { text: 'Anciens titres de propriété (si existants)' },
      { text: 'ÉTATS HYPOTHÉCAIRES', isHeader: true },
      { text: 'Fiche immeuble' },
      { text: 'Fiche personnelle du demandeur' },
      { text: 'Fiche personnelle des parents (si applicable)' },
    ]
  },

  'succession': {
    title: 'Succession',
    subtitle: 'Documents pour le règlement de la succession',
    provision: '470 €',
    items: [
      { text: 'CONCERNANT LE DÉFUNT', isHeader: true },
      { text: 'Acte de décès' },
      { text: 'Livret de famille' },
      { text: 'Livrets de famille des précédents mariages' },
      { text: 'Contrat de mariage' },
      { text: 'Testament' },
      { text: 'Donation entre époux' },
      { text: 'PATRIMOINE IMMOBILIER', isHeader: true },
      { text: 'Titre(s) de propriété du/des bien(s)' },
      { text: 'PATRIMOINE MOBILIER', isHeader: true },
      { text: 'Justificatifs de comptes bancaires' },
      { text: 'Carte grise véhicule' },
      { text: 'ACTIVITÉ PROFESSIONNELLE', isHeader: true },
      { text: 'Si fonds de commerce : titre de propriété' },
      { text: 'Bail commercial' },
      { text: 'État du matériel et marchandises' },
      { text: 'Extrait RCS ou répertoire des métiers' },
      { text: 'PARTS DE SOCIÉTÉ', isHeader: true },
      { text: 'Statuts de la société' },
      { text: 'Titres de propriété des parts' },
      { text: 'Dernier bilan' },
      { text: 'DETTES', isHeader: true },
      { text: 'Reconnaissances de dettes' },
      { text: 'Actes de prêt' },
      { text: 'Frais funéraires (mémoire, quittance)' },
      { text: 'Avertissements d\'impôts' },
      { text: 'Justificatifs de toutes dettes' },
      { text: 'POUR CHAQUE HÉRITIER', isHeader: true },
      { text: 'Pièce d\'identité' },
      { text: 'RIB signé' },
    ]
  },

  'donation': {
    title: 'Donation / Donation-partage',
    subtitle: 'Documents pour réaliser une donation',
    provision: '470 €',
    items: [
      { text: 'POUR LE DONATEUR ET LE DONATAIRE', isHeader: true },
      { text: 'Extrait acte de naissance' },
      { text: 'Extrait acte de mariage' },
      { text: 'Copie pièce d\'identité' },
      { text: 'Contrat de mariage ou PACS (le cas échéant)' },
      { text: 'POUR LE DONATEUR UNIQUEMENT', isHeader: true },
      { text: 'Livret de famille' },
      { text: 'Titre de propriété' },
      { text: 'Avis de valeur vénale ou estimation (< 3 mois)' },
      { text: 'Plan de bornage et PV du géomètre-expert' },
      { text: 'Plan de prévention des risques naturels (mairie)' },
      { text: 'Copie du bail (si bien loué)' },
      { text: 'SI DIVISION PARCELLAIRE', isHeader: true },
      { text: 'Document d\'arpentage' },
      { text: 'Déclaration préalable ou permis d\'aménager' },
      { text: 'Certificat de non-opposition' },
      { text: 'SI IMMEUBLE < 10 ANS', isHeader: true },
      { text: 'Permis de construire' },
      { text: 'Plans' },
      { text: 'DAACT' },
      { text: 'Certificat de conformité' },
      { text: 'ÉQUIPEMENTS', isHeader: true },
      { text: 'Existence fosse septique : OUI / NON' },
      { text: 'Détecteur de fumée : OUI / NON' },
      { text: 'Borne de recharge véhicule : OUI / NON' },
      { text: 'Piscine : OUI / NON' },
    ]
  },

  'contrat-mariage': {
    title: 'Contrat de mariage',
    subtitle: 'Documents pour établir votre contrat de mariage',
    provision: '350 €',
    items: [
      { text: 'POUR CHAQUE FUTUR ÉPOUX', isHeader: true },
      { text: 'Fiche de renseignements complétée' },
      { text: 'Copie recto-verso pièce d\'identité (CNI ou passeport)' },
      { text: 'Extrait d\'acte de naissance (< 2 mois)' },
      { text: 'RIB signé' },
      { text: 'SI NATIONALITÉ ÉTRANGÈRE', isHeader: true },
      { text: 'Acte de naissance (< 2 mois) traduit par traducteur assermenté' },
      { text: 'Certificat de coutume ou de célibat traduit' },
      { text: 'ÉTAPES DE LA PROCÉDURE', isHeader: true },
      { text: '1. Rendez-vous de renseignements à l\'étude' },
      { text: '2. Transmission des documents' },
      { text: '3. Réception du projet par email' },
      { text: '4. Rendez-vous de signature (avant le mariage)' },
    ]
  },

  'pacs': {
    title: 'PACS',
    subtitle: 'Documents pour conclure un PACS',
    provision: '350 €',
    items: [
      { text: 'POUR CHAQUE FUTUR PARTENAIRE', isHeader: true },
      { text: 'Fiche de renseignements complétée' },
      { text: 'Copie recto-verso pièce d\'identité (CNI ou passeport)' },
      { text: 'Extrait d\'acte de naissance (< 2 mois)' },
      { text: 'RIB signé' },
      { text: 'SI NATIONALITÉ ÉTRANGÈRE', isHeader: true },
      { text: 'Acte de naissance (< 2 mois) traduit par traducteur assermenté' },
      { text: 'Certificat de coutume ou de célibat traduit' },
    ]
  },

  'sci': {
    title: 'Constitution SCI',
    subtitle: 'Documents pour créer votre Société Civile Immobilière',
    provision: '470 €',
    items: [
      { text: 'POUR CHAQUE ASSOCIÉ', isHeader: true },
      { text: 'Copie pièce d\'identité' },
      { text: 'Copie carte vitale' },
      { text: 'Acte de naissance' },
      { text: 'Livret de famille (si marié)' },
      { text: 'RIB signé' },
      { text: 'INFORMATIONS À FOURNIR', isHeader: true },
      { text: 'Nom, prénom, date et lieu de naissance' },
      { text: 'Situation maritale (conjoint, date/lieu mariage, régime)' },
      { text: 'Adresse postale' },
      { text: 'Email' },
      { text: 'Numéro de téléphone' },
      { text: 'INFORMATIONS SUR LA SCI', isHeader: true },
      { text: 'Nom de la SCI' },
      { text: 'Montant du capital social' },
      { text: 'Répartition des parts entre associés' },
      { text: 'Choix fiscal : IR ou IS' },
      { text: 'SIÈGE SOCIAL', isHeader: true },
      { text: 'Adresse du siège social' },
      { text: 'Titre de propriété du local OU' },
      { text: 'Contrat de location' },
    ]
  },

  'bail-commercial': {
    title: 'Bail commercial',
    subtitle: 'Documents pour établir un bail commercial',
    items: [
      { text: 'POUR UNE PERSONNE PHYSIQUE', isHeader: true },
      { text: 'Fiche de renseignements complétée' },
      { text: 'Pièce d\'identité' },
      { text: 'POUR UNE PERSONNE MORALE', isHeader: true },
      { text: 'Statuts à jour' },
      { text: 'Pièce d\'identité du représentant légal' },
      { text: 'Délibération de nomination (si hors statuts)' },
      { text: 'KBIS de moins de 3 mois' },
      { text: 'CONCERNANT LE BIEN', isHeader: true },
      { text: 'Titre de propriété' },
      { text: 'Adresse postale du bien' },
      { text: 'Règlement de copropriété (si applicable)' },
      { text: 'Bail antérieur' },
      { text: 'Résiliation du bail précédent' },
      { text: 'État des lieux de sortie' },
      { text: 'MODALITÉS DU BAIL', isHeader: true },
      { text: 'Montant du loyer : mensuel / annuel' },
      { text: 'Soumis à TVA : OUI / NON' },
      { text: 'Pas de porte : OUI / NON' },
      { text: 'Dépôt de garantie : OUI / NON' },
      { text: 'Caution : OUI / NON' },
      { text: 'Taxe foncière à charge : bailleur / preneur' },
      { text: 'TRAVAUX', isHeader: true },
      { text: 'Travaux autorisés par le bailleur' },
      { text: 'Travaux prévus prochainement' },
      { text: 'Travaux réalisés il y a moins de 3 ans' },
    ]
  },
}

// Mapping des types de checklist vers les fichiers PDF
const PDF_FILES: Record<string, string> = {
  'vente-vendeur': '/documents/vente-vendeur.pdf',
  'vente-acquereur': '/documents/vente-acquereur.pdf',
  'prescription-trentenaire': '/documents/prescription-trentenaire.pdf',
  'donation': '/documents/donation.pdf',
  'contrat-mariage': '/documents/contrat-mariage.pdf',
  'pacs': '/documents/pacs.pdf',
  'sci': '/documents/sci.pdf',
  'bail-commercial': '/documents/bail-commercial.pdf',
  'succession': '/documents/succession.pdf',
}

// Fonction helper pour télécharger une checklist
// Utilise les fichiers PDF quand disponibles, sinon génère un PDF dynamique
export function downloadChecklist(type: string) {
  // Si un fichier PDF existe, le télécharger directement
  const pdfPath = PDF_FILES[type]
  if (pdfPath) {
    const link = document.createElement('a')
    link.href = pdfPath
    link.download = pdfPath.split('/').pop() || `checklist-${type}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    return
  }

  // Sinon, générer un PDF dynamique
  const config = CHECKLIST_CONFIGS[type]
  if (config) {
    generateChecklistPDF(config)
  } else {
    console.error(`Checklist type "${type}" not found`)
  }
}
