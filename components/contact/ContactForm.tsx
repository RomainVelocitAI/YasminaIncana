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

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSuccess(true)

    // Reset after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000)
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

      <p className="text-xs text-text-muted">
        * Champs obligatoires. Vos données sont traitées conformément à notre
        politique de confidentialité.
      </p>
    </form>
  )
}
