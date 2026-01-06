'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Loader2, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const subjects = [
  { value: 'immobilier', label: 'Immobilier' },
  { value: 'succession', label: 'Succession' },
  { value: 'famille', label: 'Famille' },
  { value: 'entreprise', label: 'Entreprise' },
  { value: 'autre', label: 'Autre' },
]

interface ContactFormProps {
  initialSubject?: string
}

export function ContactForm({ initialSubject }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const [selectedSubject, setSelectedSubject] = useState(initialSubject || '')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const data = {
      nom: formData.get('lastName'),
      prenom: formData.get('firstName'),
      email: formData.get('email'),
      telephone: formData.get('phone') ? String(formData.get('phone')).replace(/\s/g, '') : null,
      objet: selectedSubject,
      message: formData.get('message'),
      date: new Date().toISOString(),
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de l\'envoi du message')
      }

      setIsSuccess(true)
      // Reset after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-status-available/10 border border-status-available/30 p-8 text-center"
      >
        <CheckCircle className="w-12 h-12 text-status-available mx-auto mb-4" />
        <h3 className="font-serif text-xl text-text-primary mb-2">
          Message envoyé !
        </h3>
        <p className="text-text-secondary">
          Nous vous répondrons dans les meilleurs délais.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="lastName">Nom *</Label>
          <Input
            id="lastName"
            name="lastName"
            required
            placeholder="Votre nom"
            className="bg-surface border-border focus:border-primary"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="firstName">Prénom *</Label>
          <Input
            id="firstName"
            name="firstName"
            required
            placeholder="Votre prénom"
            className="bg-surface border-border focus:border-primary"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="votre@email.com"
            className="bg-surface border-border focus:border-primary"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="06 00 00 00 00"
            className="bg-surface border-border focus:border-primary"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Objet *</Label>
        <Select
          name="subject"
          value={selectedSubject}
          onValueChange={setSelectedSubject}
          required
        >
          <SelectTrigger className="bg-surface border-border focus:border-primary">
            <SelectValue placeholder="Sélectionnez un objet" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject) => (
              <SelectItem key={subject.value} value={subject.value}>
                {subject.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="Décrivez votre projet ou votre demande..."
          rows={5}
          className="bg-surface border-border focus:border-primary resize-none"
        />
      </div>

      {error && (
        <p className="text-destructive text-sm">{error}</p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white px-8 py-6 text-base transition-all duration-300 hover:-translate-y-1 disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Envoyer le message
          </>
        )}
      </Button>

      <p className="text-xs text-text-muted mb-6">
        * Champs obligatoires
      </p>

      {/* Mention légale RGPD complète */}
      <div className="border-t border-border pt-6">
        <details className="group">
          <summary className="text-sm text-text-muted cursor-pointer hover:text-text-secondary transition-colors flex items-center gap-2">
            <span className="text-xs">▶</span>
            <span className="group-open:hidden">Mention sur la protection des données personnelles</span>
            <span className="hidden group-open:inline">Masquer la mention sur la protection des données personnelles</span>
          </summary>
          <div className="mt-4 text-xs text-text-muted space-y-4 leading-relaxed">
            <p>
              L'Office notarial traite des données personnelles concernant les personnes mentionnées aux présentes,
              pour l'accomplissement des activités notariales, notamment de formalités d'actes.
            </p>
            <p>
              Ce traitement est fondé sur le respect d'une obligation légale et l'exécution d'une mission relevant
              de l'exercice de l'autorité publique déléguée par l'État dont sont investis les notaires, officiers publics,
              conformément à l'ordonnance n° 45-2590 du 2 novembre 1945.
            </p>
            <p>Ces données seront susceptibles d'être transférées aux destinataires suivants :</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>les administrations ou partenaires légalement habilités tels que la Direction Générale des Finances Publiques,
              ou, le cas échéant, le livre foncier, les instances notariales, les organismes du notariat, les fichiers centraux
              de la profession notariale (Fichier Central Des Dernières Volontés, Minutier Central Électronique des Notaires,
              registre du PACS, etc.),</li>
              <li>les offices notariaux participant ou concourant à l'acte,</li>
              <li>les établissements financiers concernés,</li>
              <li>les organismes de conseils spécialisés pour la gestion des activités notariales,</li>
              <li>le Conseil supérieur du notariat ou son délégataire, pour la production des statistiques permettant
              l'évaluation des biens immobiliers, en application du décret n° 2013-803 du 3 septembre 2013,</li>
              <li>les organismes publics ou privés pour des opérations de vérification dans le cadre de la recherche
              de personnalités politiquement exposées ou ayant fait l'objet de gel des avoirs ou sanctions, de la lutte
              contre le blanchiment des capitaux et le financement du terrorisme. Ces vérifications font l'objet d'un
              transfert de données dans un pays situé hors de l'Union Européenne et encadré par la signature de clauses
              contractuelles types de la Commission européenne, visant à assurer un niveau de protection des données
              substantiellement équivalent à celui garanti dans l'Union Européenne.</li>
            </ul>
            <p>
              La communication de ces données à ces destinataires peut être indispensable pour l'accomplissement des
              activités notariales.
            </p>
            <p>
              Les documents permettant d'établir, d'enregistrer et de publier les actes sont conservés 30 ans à compter
              de la réalisation de l'ensemble des formalités. L'acte authentique et ses annexes sont conservés 75 ans et
              100 ans lorsque l'acte porte sur des personnes mineures ou majeures protégées. Les vérifications liées aux
              personnalités politiquement exposées, au blanchiment des capitaux et au financement du terrorisme sont
              conservées 5 ans après la fin de la relation d'affaires.
            </p>
            <p>
              Conformément à la réglementation en vigueur relative à la protection des données personnelles, les personnes
              peuvent demander l'accès aux données les concernant. Le cas échéant, elles peuvent demander la rectification
              ou l'effacement de celles-ci, obtenir la limitation du traitement de ces données ou s'y opposer pour des
              raisons tenant à leur situation particulière. Elles peuvent également définir des directives relatives à la
              conservation, à l'effacement et à la communication de leurs données personnelles après leur décès.
            </p>
            <p>
              L'Office notarial a désigné un Délégué à la protection des données que les personnes peuvent contacter
              à l'adresse suivante : <a href="mailto:dpo.not@adnov.fr" className="underline hover:text-primary transition-colors">dpo.not@adnov.fr</a>.
            </p>
            <p>
              Si les personnes estiment, après avoir contacté l'Office notarial, que leurs droits ne sont pas respectés,
              elles peuvent introduire une réclamation auprès d'une autorité européenne de contrôle, la Commission
              Nationale de l'Informatique et des Libertés pour la France.
            </p>
          </div>
        </details>
      </div>
    </form>
  )
}
