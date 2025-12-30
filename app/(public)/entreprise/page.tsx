'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ServiceHeroLinear } from '@/components/services/ServiceHeroLinear'
import { ServiceCard } from '@/components/services/ServiceCard'
import { services } from '@/content/services'

export default function EntreprisePage() {
  const service = services.find((s) => s.slug === 'entreprise')!
  const otherServices = services.filter((s) => s.slug !== 'entreprise')

  return (
    <>
      {/* Hero style Linear avec vignettes */}
      <ServiceHeroLinear service={service} />

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
              Un projet d'entreprise ?
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Entrepreneurs, dirigeants, investisseurs : notre équipe est à votre disposition
              pour structurer et sécuriser vos projets.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gold hover:bg-gold-light text-text-primary px-8 py-6 text-base transition-all duration-300 hover:-translate-y-1"
              >
                <Link href="/contact?subject=entreprise">
                  <Phone className="w-5 h-5 mr-2" />
                  Prendre rendez-vous
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white hover:text-primary px-8 py-6 text-base transition-all duration-300"
              >
                <Link href="/etude">
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
