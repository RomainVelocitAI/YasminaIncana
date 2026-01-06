'use client'

import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { PulsingGoldLine } from '@/components/animations/SectionDivider'
import { services } from '@/content/services'

const serviceImages: Record<string, string> = {
  immobilier: '/images/service-immobilier.webp',
  famille: '/images/service-famille.webp',
  entreprise: '/images/service-entreprise.webp',
}

export function ServicesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const items = services.map((service) => ({
    id: service.slug,
    title: service.title,
    summary: service.shortDescription,
    url: `/${service.slug}`,
    image: serviceImages[service.slug] || service.image,
  }))

  const canScrollPrev = currentIndex > 0
  const canScrollNext = currentIndex < items.length - 1

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Ligne dorée pulsante en haut */}
      <PulsingGoldLine position="top" fromDirection="left" />

      {/* Pattern de fond subtil */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--primary) 1px, transparent 0)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container-wide relative">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
          <div className="max-w-2xl">
            <AnimatedSection>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-text-primary mb-4">
                Nos domaines d'expertise
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-text-secondary text-lg">
                Un accompagnement complet pour tous vos projets juridiques,
                de l'immobilier à la transmission patrimoniale.
              </p>
            </AnimatedSection>
          </div>

          {/* Navigation buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex gap-2 mt-6 md:mt-0"
          >
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              disabled={!canScrollPrev}
              className="h-12 w-12 rounded-full border-border hover:border-primary hover:bg-primary/5 disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5 text-text-primary" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentIndex(Math.min(items.length - 1, currentIndex + 1))}
              disabled={!canScrollNext}
              className="h-12 w-12 rounded-full border-border hover:border-primary hover:bg-primary/5 disabled:opacity-30"
            >
              <ChevronRight className="h-5 w-5 text-text-primary" />
            </Button>
          </motion.div>
        </div>

        {/* Carousel */}
        <div className="w-full">
          <Carousel
            index={currentIndex}
            onIndexChange={setCurrentIndex}
            className="w-full"
          >
            <CarouselContent className="gap-6">
              {items.map((item, index) => (
                <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={item.url} className="group block relative w-full h-[380px] md:h-[420px]">
                      <Card className="overflow-hidden h-full w-full border-border-light hover:border-primary/30 transition-all duration-500 shadow-sm hover:shadow-2xl">
                        {/* Image */}
                        <div className="relative h-full w-full transition-all duration-500 group-hover:h-1/2">
                          <Image
                            width={600}
                            height={400}
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                          />
                          {/* Overlay gradient bleu canard */}
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />

                          {/* Title overlay - visible par défaut */}
                          <div className="absolute bottom-0 left-0 right-0 p-6 transition-opacity duration-500 group-hover:opacity-0">
                            <h3 className="font-serif text-2xl text-white">{item.title}</h3>
                          </div>

                          {/* Ligne dorée diagonale */}
                          <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                            <div className="absolute top-4 -right-8 w-24 h-[2px] bg-gold rotate-45" />
                          </div>
                        </div>

                        {/* Text Section - apparaît au hover */}
                        <div className="absolute bottom-0 left-0 w-full h-0 px-6 transition-all duration-500 group-hover:h-1/2 flex flex-col justify-center bg-surface opacity-0 group-hover:opacity-100 overflow-hidden">
                          <h3 className="font-serif text-2xl text-text-primary mb-3">{item.title}</h3>
                          <p className="text-text-secondary text-sm leading-relaxed line-clamp-3 mb-4">
                            {item.summary}
                          </p>
                          <div className="flex items-center gap-2 text-primary font-medium">
                            <span className="text-sm uppercase tracking-wider">En savoir plus</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                          </div>
                        </div>

                        {/* Arrow button au hover */}
                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 border-primary/30 hover:bg-primary hover:text-white hover:-rotate-45 transition-all duration-500 rounded-full"
                        >
                          <ArrowRight className="size-4" />
                        </Button>

                        {/* Bottom line decoration dorée */}
                        <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-gradient-to-r from-gold to-primary group-hover:w-full transition-all duration-500" />
                      </Card>
                    </Link>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* View all link */}
        <AnimatedSection delay={0.5} className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 text-text-secondary hover:text-primary transition-colors group"
          >
            <span className="text-sm uppercase tracking-wider">Voir tous nos services</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </AnimatedSection>
      </div>

      {/* Ligne dorée pulsante en bas */}
      <PulsingGoldLine position="bottom" fromDirection="right" />
    </section>
  )
}
