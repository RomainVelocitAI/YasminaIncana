'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ServiceHeroLinear } from '@/components/services/ServiceHeroLinear'
import { ServiceCard } from '@/components/services/ServiceCard'
import { NotaryFeesCalculator } from '@/components/tools/NotaryFeesCalculator'
import { services } from '@/content/services'

export default function Immobilier2Page() {
  const service = services.find((s) => s.slug === 'immobilier')!
  const otherServices = services.filter((s) => s.slug !== 'immobilier')

  return (
    <>
      {/* Hero style Linear avec vignettes */}
      <ServiceHeroLinear service={service} />

      {/* Section FAQ - cassure nette */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-12 bg-gold" />
                <span className="text-gold text-sm uppercase tracking-[0.2em]">
                  Questions fréquentes
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-6">
                Vos questions sur l'immobilier
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed">
                L'achat ou la vente d'un bien immobilier soulève de nombreuses questions.
                Voici les réponses aux interrogations les plus courantes de nos clients.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {[
                { q: 'Quels sont les frais de notaire ?', a: 'Les frais de notaire représentent environ 7 à 8% du prix de vente dans l\'ancien et 2 à 3% dans le neuf. Ils comprennent les droits de mutation, les émoluments du notaire et les frais divers. Utilisez notre calculateur ci-dessous pour une estimation précise.' },
                { q: 'Combien de temps dure une vente immobilière ?', a: 'Entre la signature du compromis et l\'acte définitif, comptez généralement 2 à 3 mois. Ce délai permet de réunir les documents, d\'obtenir le financement et de purger le délai de rétractation.' },
                { q: 'Qu\'est-ce qu\'une promesse de vente ?', a: 'La promesse de vente (ou compromis) est un avant-contrat qui engage vendeur et acquéreur. Elle fixe les conditions de la vente et prévoit généralement un délai de rétractation de 10 jours pour l\'acheteur.' },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-surface p-6 border border-border-light"
                >
                  <h4 className="font-medium text-text-primary mb-3">{faq.q}</h4>
                  <p className="text-text-secondary">{faq.a}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section calculateur */}
      <section id="calculateur" className="py-20 md:py-32 bg-secondary/30 scroll-mt-24">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <NotaryFeesCalculator />
          </motion.div>
        </div>
      </section>

      {/* Autres services */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-4">
              Découvrir nos autres domaines
            </h2>
            <p className="text-text-secondary">
              Une expertise complète pour tous vos besoins juridiques
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {otherServices.map((s, index) => (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ServiceCard service={s} index={index} variant="compact" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - cassure nette */}
      <section className="bg-primary py-20 md:py-28">
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">
              Un projet immobilier ?
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Notre équipe vous accompagne de A à Z dans toutes vos démarches
              immobilières à La Réunion.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gold hover:bg-gold-light text-text-primary px-8 py-6 text-base transition-all duration-300 hover:-translate-y-1"
              >
                <Link href="/contact?subject=immobilier">
                  <Phone className="w-5 h-5 mr-2" />
                  Prendre rendez-vous
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white hover:text-primary px-8 py-6 text-base transition-all duration-300"
              >
                <Link href="/etude2">
                  Découvrir l'étude
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
