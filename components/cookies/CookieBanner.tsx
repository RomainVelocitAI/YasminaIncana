'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Cookie, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const COOKIE_CONSENT_KEY = 'cookie-info-seen'
const CONSENT_DURATION_MONTHS = 13

function isConsentValid(): boolean {
  if (typeof window === 'undefined') return true

  const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
  if (!consent) return false

  try {
    const { date } = JSON.parse(consent)
    const consentDate = new Date(date)
    const expiryDate = new Date(consentDate)
    expiryDate.setMonth(expiryDate.getMonth() + CONSENT_DURATION_MONTHS)

    return new Date() < expiryDate
  } catch {
    return false
  }
}

function saveConsent(): void {
  const consent = {
    date: new Date().toISOString(),
    version: '1.0'
  }
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent))
}

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    if (!isConsentValid()) {
      // Petit délai pour une meilleure UX
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    saveConsent()
    setIsVisible(false)
  }

  // Éviter les problèmes d'hydratation SSR
  if (!isMounted) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="container-wide mx-auto">
            <div className="bg-white rounded-xl shadow-2xl border border-border/50 overflow-hidden">
              {/* Bordure décorative dorée en haut */}
              <div className="h-1 bg-gradient-to-r from-gold/50 via-gold to-gold/50" />

              <div className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                  {/* Icône et texte */}
                  <div className="flex items-start gap-3 flex-1">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Cookie className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-lg text-foreground mb-1">
                        Utilisation des cookies
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Ce site utilise uniquement des cookies techniques nécessaires à son bon fonctionnement.
                        Aucune donnée personnelle n'est collectée à des fins publicitaires ou de suivi.
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 md:flex-shrink-0">
                    <Link
                      href="/mentions-legales#cookies"
                      className="text-sm text-primary hover:text-primary/80 underline-offset-4 hover:underline transition-colors whitespace-nowrap"
                    >
                      En savoir plus
                    </Link>
                    <Button
                      onClick={handleAccept}
                      className="bg-primary hover:bg-primary/90 text-white px-6"
                    >
                      J'ai compris
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bouton fermer (mobile) */}
          <button
            onClick={handleAccept}
            className="absolute top-6 right-6 md:hidden w-8 h-8 rounded-full bg-muted/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Export pour permettre de rouvrir le bandeau depuis le footer
export function useCookieBanner() {
  const resetConsent = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(COOKIE_CONSENT_KEY)
      window.location.reload()
    }
  }

  return { resetConsent }
}
