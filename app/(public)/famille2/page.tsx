'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ServiceHeroLinear } from '@/components/services/ServiceHeroLinear'
import { ServiceCard } from '@/components/services/ServiceCard'
import { services } from '@/content/services'

export default function Famille2Page() {
  const service = services.find((s) => s.slug === 'famille')!
  const otherServices = services.filter((s) => s.slug !== 'famille')

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
                Vos questions sur le droit de la famille
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed">
                La transmission du patrimoine familial est un sujet délicat qui nécessite
                un accompagnement personnalisé. Voici les réponses aux questions les plus
                fréquemment posées.
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
                { q: 'Quand rédiger un testament ?', a: 'Il est conseillé de rédiger un testament dès que vous souhaitez organiser la transmission de vos biens selon vos volontés, notamment si vous souhaitez avantager certains héritiers ou protéger votre conjoint.' },
                { q: 'Donation ou succession ?', a: 'La donation permet d\'anticiper la transmission tout en bénéficiant d\'abattements fiscaux renouvelables tous les 15 ans. C\'est souvent plus avantageux qu\'une transmission par succession.' },
                { q: 'Comment protéger mon conjoint ?', a: 'Plusieurs dispositifs existent : donation au dernier vivant, testament, clause de préciput dans le contrat de mariage, ou changement de régime matrimonial.' },
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

      {/* Autres services */}
      <section className="py-16 md:py-24 bg-secondary/30">
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
              Besoin de conseils ?
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Notre équipe est à votre écoute pour vous accompagner
              dans l'organisation de votre transmission patrimoniale.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gold hover:bg-gold-light text-text-primary px-8 py-6 text-base transition-all duration-300 hover:-translate-y-1"
              >
                <Link href="/contact?subject=famille">
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
