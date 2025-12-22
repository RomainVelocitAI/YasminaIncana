'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, Info, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

// Barème des émoluments du notaire (arrêté du 28 février 2020, prolongé jusqu'au 28/02/2026)
const EMOLUMENTS_TRANCHES = [
  { min: 0, max: 6500, taux: 0.03870 },
  { min: 6500, max: 17000, taux: 0.01596 },
  { min: 17000, max: 60000, taux: 0.01064 },
  { min: 60000, max: Infinity, taux: 0.00799 },
]

// Taux des droits de mutation par département (2025)
// Source: service-public.gouv.fr
const DEPARTEMENTS = [
  { code: '974', nom: 'La Réunion', tauxDepartement: 4.5, augmente2025: false },
  { code: '75', nom: 'Paris', tauxDepartement: 4.5, augmente2025: false },
  { code: '13', nom: 'Bouches-du-Rhône', tauxDepartement: 4.5, augmente2025: true },
  { code: '69', nom: 'Rhône', tauxDepartement: 4.5, augmente2025: true },
  { code: '33', nom: 'Gironde', tauxDepartement: 4.5, augmente2025: true },
  { code: '31', nom: 'Haute-Garonne', tauxDepartement: 4.5, augmente2025: true },
  { code: '59', nom: 'Nord', tauxDepartement: 4.5, augmente2025: true },
  { code: '44', nom: 'Loire-Atlantique', tauxDepartement: 4.5, augmente2025: true },
  { code: '06', nom: 'Alpes-Maritimes', tauxDepartement: 4.5, augmente2025: true },
  { code: '34', nom: 'Hérault', tauxDepartement: 4.5, augmente2025: true },
  { code: '67', nom: 'Bas-Rhin', tauxDepartement: 4.5, augmente2025: true },
  { code: '38', nom: 'Isère', tauxDepartement: 4.5, augmente2025: false }, // Déjà à 5.09%
  { code: '972', nom: 'Martinique', tauxDepartement: 4.5, augmente2025: false },
  { code: '971', nom: 'Guadeloupe', tauxDepartement: 4.5, augmente2025: false },
  { code: '973', nom: 'Guyane', tauxDepartement: 4.5, augmente2025: false },
  { code: '976', nom: 'Mayotte', tauxDepartement: 4.5, augmente2025: false },
  { code: 'autre', nom: 'Autre département (métropole)', tauxDepartement: 4.5, augmente2025: true },
]

// Constantes fiscales 2025
const TAUX_COMMUNE = 0.012 // 1,20%
const TAUX_FRAIS_ASSIETTE = 0.001 // 0,10% (frais d'assiette et recouvrement)
const CONTRIBUTION_SECURITE_IMMOBILIERE = 0.001 // 0,10%
const CSI_MINIMUM = 15 // Minimum 15€
const TVA = 0.20 // 20%
const DEBOURS_FORFAIT = 1200 // Estimation moyenne des débours
const TAUX_NEUF_TVA = 0.007 // 0,70% pour le neuf (taxe publicité foncière)

interface CalculResult {
  prixBien: number
  droitsMutation: {
    departement: number
    commune: number
    fraisAssiette: number
    total: number
    taux: number
  }
  emoluments: {
    ht: number
    tva: number
    ttc: number
  }
  contributionSecuriteImmobiliere: number
  debours: number
  totalFrais: number
  pourcentage: number
  detailTranches: { tranche: string; montant: number; taux: number }[]
}

function calculerEmoluments(prix: number): { ht: number; tranches: { tranche: string; montant: number; taux: number }[] } {
  let total = 0
  const tranches: { tranche: string; montant: number; taux: number }[] = []

  for (const tranche of EMOLUMENTS_TRANCHES) {
    if (prix > tranche.min) {
      const assiette = Math.min(prix, tranche.max) - tranche.min
      const montant = assiette * tranche.taux
      total += montant

      if (montant > 0) {
        tranches.push({
          tranche: tranche.max === Infinity
            ? `Au-delà de ${tranche.min.toLocaleString('fr-FR')} €`
            : `${tranche.min.toLocaleString('fr-FR')} € à ${tranche.max.toLocaleString('fr-FR')} €`,
          montant,
          taux: tranche.taux * 100,
        })
      }
    }
  }

  return { ht: total, tranches }
}

function calculerFraisNotaire(
  prix: number,
  departementCode: string,
  isNeuf: boolean,
  appliquerHausse2025: boolean
): CalculResult {
  const departement = DEPARTEMENTS.find((d) => d.code === departementCode) || DEPARTEMENTS[0]

  // Calcul du taux département
  let tauxDepartement = departement.tauxDepartement / 100

  // Hausse 2025 si applicable
  if (appliquerHausse2025 && departement.augmente2025) {
    tauxDepartement = 0.05 // 5%
  }

  // Droits de mutation
  let droitsMutation
  if (isNeuf) {
    // Pour le neuf : taxe de publicité foncière réduite
    droitsMutation = {
      departement: 0,
      commune: 0,
      fraisAssiette: 0,
      total: prix * TAUX_NEUF_TVA,
      taux: TAUX_NEUF_TVA * 100,
    }
  } else {
    // Pour l'ancien
    const droitDepartement = prix * tauxDepartement
    const droitCommune = prix * TAUX_COMMUNE
    const fraisAssiette = prix * TAUX_FRAIS_ASSIETTE
    droitsMutation = {
      departement: droitDepartement,
      commune: droitCommune,
      fraisAssiette: fraisAssiette,
      total: droitDepartement + droitCommune + fraisAssiette,
      taux: (tauxDepartement + TAUX_COMMUNE + TAUX_FRAIS_ASSIETTE) * 100,
    }
  }

  // Émoluments du notaire
  const { ht: emolumentsHT, tranches } = calculerEmoluments(prix)
  const emolumentsTVA = emolumentsHT * TVA
  const emolumentsTTC = emolumentsHT + emolumentsTVA

  // Contribution de sécurité immobilière
  const csi = Math.max(prix * CONTRIBUTION_SECURITE_IMMOBILIERE, CSI_MINIMUM)

  // Débours (estimation forfaitaire)
  const debours = DEBOURS_FORFAIT

  // Total
  const totalFrais = droitsMutation.total + emolumentsTTC + csi + debours
  const pourcentage = (totalFrais / prix) * 100

  return {
    prixBien: prix,
    droitsMutation,
    emoluments: {
      ht: emolumentsHT,
      tva: emolumentsTVA,
      ttc: emolumentsTTC,
    },
    contributionSecuriteImmobiliere: csi,
    debours,
    totalFrais,
    pourcentage,
    detailTranches: tranches,
  }
}

function formatMoney(value: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

function formatMoneyPrecis(value: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function NotaryFeesCalculator() {
  const [prix, setPrix] = useState<string>('250000')
  const [departement, setDepartement] = useState<string>('974')
  const [isNeuf, setIsNeuf] = useState<boolean>(false)
  const [appliquerHausse2025, setAppliquerHausse2025] = useState<boolean>(true)
  const [showDetails, setShowDetails] = useState<boolean>(false)

  const result = useMemo(() => {
    const prixNum = parseFloat(prix.replace(/\s/g, '')) || 0
    if (prixNum <= 0) return null
    return calculerFraisNotaire(prixNum, departement, isNeuf, appliquerHausse2025)
  }, [prix, departement, isNeuf, appliquerHausse2025])

  const selectedDept = DEPARTEMENTS.find((d) => d.code === departement)

  return (
    <TooltipProvider>
      <div className="bg-surface border border-border">
        {/* Header */}
        <div className="bg-primary p-4 md:p-6 text-white">
          <div className="flex items-center gap-3 mb-1">
            <Calculator className="w-6 h-6" />
            <h2 className="font-serif text-xl md:text-2xl">Calculateur de frais de notaire</h2>
          </div>
          <p className="text-white/80 text-sm">
            Estimez les frais pour votre acquisition immobilière (barème 2025)
          </p>
        </div>

        <div className="p-4 md:p-6">
          {/* Layout horizontal : Formulaire | Résultat */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Colonne gauche - Formulaire */}
            <div className="space-y-5">
              {/* Prix et Département */}
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Prix du bien */}
                <div className="space-y-2">
                  <Label htmlFor="prix" className="flex items-center gap-2 text-sm">
                    Prix du bien (€)
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-3.5 h-3.5 text-text-muted" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Prix d'achat hors frais d'agence</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    id="prix"
                    type="text"
                    value={prix}
                    onChange={(e) => setPrix(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="250000"
                    className="font-medium"
                  />
                </div>

                {/* Département */}
                <div className="space-y-2">
                  <Label htmlFor="departement" className="flex items-center gap-2 text-sm">
                    Département
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-3.5 h-3.5 text-text-muted" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Le taux varie selon le département</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Select value={departement} onValueChange={setDepartement}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DEPARTEMENTS.map((dept) => (
                        <SelectItem key={dept.code} value={dept.code}>
                          {dept.nom} ({dept.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Options - En ligne */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-3 px-3 py-2 bg-secondary/30 rounded-lg">
                  <div>
                    <p className="font-medium text-text-primary text-sm">Bien neuf</p>
                    <p className="text-xs text-text-muted">VEFA ou - de 5 ans</p>
                  </div>
                  <Switch checked={isNeuf} onCheckedChange={setIsNeuf} />
                </div>

                {selectedDept?.augmente2025 && !isNeuf && (
                  <div className="flex items-center gap-3 px-3 py-2 bg-secondary/30 rounded-lg">
                    <div>
                      <p className="font-medium text-text-primary text-sm">Hausse 2025</p>
                      <p className="text-xs text-text-muted">+0,5% DMTO</p>
                    </div>
                    <Switch
                      checked={appliquerHausse2025}
                      onCheckedChange={setAppliquerHausse2025}
                    />
                  </div>
                )}
              </div>

              {/* Info La Réunion */}
              {departement === '974' && (
                <div className="flex items-start gap-2 p-3 bg-status-available/10 border border-status-available/30 rounded-lg">
                  <Info className="w-4 h-4 text-status-available shrink-0 mt-0.5" />
                  <p className="text-xs text-text-secondary">
                    <strong>Bonne nouvelle !</strong> La Réunion maintient le taux à 4,5% en 2025.
                  </p>
                </div>
              )}

              {/* Disclaimer */}
              <p className="text-xs text-text-muted">
                * Estimation indicative. Sources : <a href="https://www.service-public.fr" className="underline" target="_blank" rel="noopener">service-public.fr</a>
              </p>
            </div>

            {/* Colonne droite - Résultat */}
            <div className="lg:border-l lg:border-border-light lg:pl-8">
              {result ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col"
                >
                  {/* Total */}
                  <div className="text-center mb-6">
                    <p className="text-text-muted text-xs uppercase tracking-wider mb-2">
                      Estimation des frais de notaire
                    </p>
                    <p className="font-serif text-4xl md:text-5xl text-primary">
                      {formatMoney(result.totalFrais)}
                    </p>
                    <p className="text-text-secondary text-sm mt-1">
                      Soit <span className="font-semibold">{result.pourcentage.toFixed(2)}%</span> du prix du bien
                    </p>
                  </div>

                  {/* Résumé en grille compacte */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center p-3 bg-secondary/30 rounded-lg">
                      <p className="text-lg font-serif text-text-primary">
                        {formatMoney(result.droitsMutation.total)}
                      </p>
                      <p className="text-xs text-text-muted">Droits de mutation</p>
                    </div>
                    <div className="text-center p-3 bg-secondary/30 rounded-lg">
                      <p className="text-lg font-serif text-text-primary">
                        {formatMoney(result.emoluments.ttc)}
                      </p>
                      <p className="text-xs text-text-muted">Émoluments notaire</p>
                    </div>
                    <div className="text-center p-3 bg-secondary/30 rounded-lg">
                      <p className="text-lg font-serif text-text-primary">
                        {formatMoney(result.contributionSecuriteImmobiliere)}
                      </p>
                      <p className="text-xs text-text-muted">Contribution sécurité</p>
                    </div>
                    <div className="text-center p-3 bg-secondary/30 rounded-lg">
                      <p className="text-lg font-serif text-text-primary">
                        {formatMoney(result.debours)}
                      </p>
                      <p className="text-xs text-text-muted">Débours (estimation)</p>
                    </div>
                  </div>

                  {/* Bouton détails */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDetails(!showDetails)}
                    className="w-full"
                  >
                    {showDetails ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-2" />
                        Masquer le détail
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-2" />
                        Voir le détail
                      </>
                    )}
                  </Button>
                </motion.div>
              ) : (
                <div className="h-full flex items-center justify-center text-text-muted">
                  <p>Entrez un prix pour voir l'estimation</p>
                </div>
              )}
            </div>
          </div>

          {/* Détails (pleine largeur sous le formulaire/résultat) */}
          <AnimatePresence>
            {showDetails && result && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-6 pt-6 border-t border-border grid md:grid-cols-3 gap-6">
                  {/* Droits de mutation */}
                  <div>
                    <h3 className="font-serif text-base text-text-primary mb-3">
                      Droits de mutation ({result.droitsMutation.taux.toFixed(2)}%)
                    </h3>
                    {!isNeuf ? (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Droit départemental</span>
                          <span className="text-text-primary">{formatMoneyPrecis(result.droitsMutation.departement)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Taxe communale</span>
                          <span className="text-text-primary">{formatMoneyPrecis(result.droitsMutation.commune)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Frais d'assiette</span>
                          <span className="text-text-primary">{formatMoneyPrecis(result.droitsMutation.fraisAssiette)}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-border-light font-medium">
                          <span className="text-text-primary">Total</span>
                          <span className="text-primary">{formatMoneyPrecis(result.droitsMutation.total)}</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-text-secondary">
                        Taxe de publicité foncière réduite : {formatMoneyPrecis(result.droitsMutation.total)}
                      </p>
                    )}
                  </div>

                  {/* Émoluments */}
                  <div>
                    <h3 className="font-serif text-base text-text-primary mb-3">
                      Émoluments du notaire
                    </h3>
                    <div className="space-y-2 text-sm">
                      {result.detailTranches.map((t, i) => (
                        <div key={i} className="flex justify-between">
                          <span className="text-text-secondary text-xs">{t.taux.toFixed(2)}%</span>
                          <span className="text-text-primary">{formatMoneyPrecis(t.montant)}</span>
                        </div>
                      ))}
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Sous-total HT</span>
                        <span className="text-text-primary">{formatMoneyPrecis(result.emoluments.ht)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">TVA (20%)</span>
                        <span className="text-text-primary">{formatMoneyPrecis(result.emoluments.tva)}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-border-light font-medium">
                        <span className="text-text-primary">Total TTC</span>
                        <span className="text-primary">{formatMoneyPrecis(result.emoluments.ttc)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Autres frais */}
                  <div>
                    <h3 className="font-serif text-base text-text-primary mb-3">
                      Autres frais
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Contribution sécurité immo.</span>
                        <span className="text-text-primary">{formatMoneyPrecis(result.contributionSecuriteImmobiliere)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Débours (estimation)</span>
                        <span className="text-text-primary">{formatMoneyPrecis(result.debours)}</span>
                      </div>
                      <div className="flex justify-between pt-4 mt-4 border-t border-border-light">
                        <span className="font-serif text-lg text-text-primary">Total estimé</span>
                        <span className="font-serif text-lg text-primary">{formatMoney(result.totalFrais)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </TooltipProvider>
  )
}
