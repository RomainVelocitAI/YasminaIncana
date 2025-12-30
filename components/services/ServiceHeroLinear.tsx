'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Phone } from 'lucide-react'
import { Service } from '@/lib/types'
import { Button } from '@/components/ui/button'

// Images pour chaque prestation de chaque service
const prestationImages: Record<string, string[]> = {
  immobilier: [
    'https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=1600&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600&h=900&fit=crop&q=90',
  ],
  famille: [
    'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1600&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1600&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1581952976147-5a2d15560349?w=1600&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1600&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1600&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?w=1600&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?w=1600&h=900&fit=crop&q=90',
  ],
  entreprise: [
    'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1600&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1600&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1600&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&h=900&fit=crop&q=90',
  ],
}

// Descriptions courtes pour chaque prestation
const prestationDescriptions: Record<string, string[]> = {
  immobilier: [
    "Nous vous accompagnons dans l'achat ou la vente de votre bien immobilier, en sécurisant chaque étape de la transaction.",
    "Inscription de garanties immobilières.",
    "Constitution de servitudes.",
  ],
  famille: [
    "Règlement complet des successions, de la notoriété au partage entre héritiers.",
    "Transmission de votre patrimoine de votre vivant avec optimisation fiscale.",
    "Anticipez la transmission en répartissant vos biens entre vos héritiers.",
    "Rédigez vos dernières volontés afin d'anticiper le devenir de vos biens.",
    "Adaptez votre régime matrimonial à votre situation.",
    "Organisez votre vie commune avec un cadre juridique adapté.",
    "Accompagnement dans les procédures de divorce et liquidation du régime matrimonial.",
    "Accompagnement juridique dans les procédures d'adoption.",
  ],
  entreprise: [
    "Choix de la forme juridique, rédaction des statuts et accomplissement des formalités.",
    "Sécurisation des transferts de participations entre associés ou vers des tiers.",
    "Vente ou acquisition de fonds de commerce avec toutes les garanties nécessaires.",
    "Rédaction et renouvellement de baux commerciaux et professionnels.",
    "Opérations sur le capital social de votre société.",
    "Restructuration de sociétés : fusions, scissions, transformations.",
    "Optimisation et structuration de votre patrimoine personnel et professionnel.",
    "Création de holdings pour organiser et transmettre votre patrimoine.",
    "Rédaction de pactes d'associés pour organiser les relations entre partenaires.",
  ],
}

interface ServiceHeroLinearProps {
  service: Service
}

export function ServiceHeroLinear({ service }: ServiceHeroLinearProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const images = prestationImages[service.slug] || prestationImages.immobilier
  const descriptions = prestationDescriptions[service.slug] || prestationDescriptions.immobilier

  const activePrestation = service.prestations[activeIndex]
  const activeImage = images[activeIndex % images.length]
  const activeDescription = descriptions[activeIndex % descriptions.length]

  return (
    <section className="relative min-h-screen bg-text-primary overflow-hidden">
      {/* Background Image avec transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={activeImage}
            alt={activePrestation}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          {/* Overlay sombre */}
          <div className="absolute inset-0 bg-gradient-to-r from-text-primary via-text-primary/80 to-text-primary/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-text-primary via-transparent to-text-primary/60" />
        </motion.div>
      </AnimatePresence>

      {/* Contenu */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header avec back link */}
        <div className="container-wide pt-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-white/60 hover:text-gold transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm">Retour aux services</span>
            </Link>
          </motion.div>
        </div>

        {/* Contenu principal */}
        <div className="container-wide flex-1 flex flex-col justify-center py-16">
          <div className="max-w-2xl">
            {/* Titre de la prestation */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={activeIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight"
              >
                {activePrestation}
              </motion.h1>
            </AnimatePresence>

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-lg md:text-xl text-white/70 leading-relaxed mb-10"
              >
                {activeDescription}
              </motion.p>
            </AnimatePresence>

            {/* Bouton CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-gold hover:bg-gold-light text-text-primary px-8 py-6 text-base transition-all duration-300 hover:-translate-y-1"
              >
                <Link href={`/contact?subject=${service.slug}`}>
                  <Phone className="w-5 h-5 mr-2" />
                  Prendre rendez-vous
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Vignettes en bas - sur 2 lignes */}
        <div className="container-wide pb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {service.prestations.map((prestation, index) => (
              <motion.button
                key={prestation}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                onClick={() => setActiveIndex(index)}
                className={`relative group ${
                  activeIndex === index ? 'ring-2 ring-gold' : ''
                }`}
              >
                {/* Vignette image */}
                <div className="relative w-28 h-16 sm:w-32 sm:h-20 md:w-36 md:h-22 overflow-hidden">
                  <Image
                    src={images[index % images.length]}
                    alt={prestation}
                    fill
                    className={`object-cover transition-all duration-300 ${
                      activeIndex === index ? 'brightness-100' : 'brightness-50 group-hover:brightness-75'
                    }`}
                    sizes="144px"
                  />
                  {/* Barre de progression si actif */}
                  {activeIndex === index && (
                    <motion.div
                      layoutId="activeThumbnail"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gold"
                    />
                  )}
                </div>
                {/* Label en dessous */}
                <p className={`mt-1 text-[10px] sm:text-xs text-left max-w-[112px] sm:max-w-[128px] md:max-w-[144px] line-clamp-2 transition-colors ${
                  activeIndex === index ? 'text-white' : 'text-white/50 group-hover:text-white/70'
                }`}>
                  {prestation}
                </p>
              </motion.button>
            ))}
          </div>

          {/* Navigation arrows pour très petit écran */}
          <div className="flex items-center justify-center gap-4 mt-6 sm:hidden">
            <button
              onClick={() => setActiveIndex(prev => prev > 0 ? prev - 1 : service.prestations.length - 1)}
              className="w-10 h-10 flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-gold transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveIndex(prev => (prev + 1) % service.prestations.length)}
              className="w-10 h-10 flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-gold transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
