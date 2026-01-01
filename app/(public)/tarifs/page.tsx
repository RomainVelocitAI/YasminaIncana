'use client'

import { useRef } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Landmark, FileText, Briefcase, ArrowRight, ArrowDown } from 'lucide-react'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { PulsingGoldLine } from '@/components/animations/SectionDivider'
import { Button } from '@/components/ui/button'

// Import dynamique pour Three.js (client-side only)
const FraisNotaireVisualization = dynamic(
  () => import('@/components/tarifs/FraisNotaireVisualization'),
  { ssr: false, loading: () => <div className="w-full h-[400px] bg-secondary/30 animate-pulse rounded-lg" /> }
)

const categories = [
  {
    title: 'Impôts et Taxes',
    percentage: '80%',
    description:
      "Ce sont les sommes que le notaire est tenu de percevoir et de reverser à l'État pour le compte de son client. Elles varient suivant la nature de l'acte et du bien.",
    icon: Landmark,
    color: '#E07B39',
  },
  {
    title: 'Débours',
    percentage: '10%',
    description:
      "Ce sont les sommes acquittées par le notaire pour le compte de son client servant à rémunérer les différents intervenants qui produisent les pièces nécessaires à la rédaction de l'acte (documents d'urbanisme, extrait cadastral, questionnaire syndic...).",
    icon: FileText,
    color: '#0D5C63',
  },
  {
    title: 'Rémunération du notaire',
    percentage: '10%',
    description:
      "Parce que le notaire remplit une fonction d'intérêt public, la majorité des actes qu'il établit sont soumis à un tarif national. Pour les autres actes, votre notaire vous indiquera au préalable sa rémunération et vous proposera une convention d'honoraires.",
    icon: Briefcase,
    color: '#7EBDC3',
  },
]

export default function TarifsPage() {
  const heroRef = useRef(null)
  const chartRef = useRef(null)

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const { scrollYProgress: chartProgress } = useScroll({
    target: chartRef,
    offset: ['start end', 'end start'],
  })

  const heroY = useTransform(heroProgress, [0, 1], [0, 100])
  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0])
  const chartY = useTransform(chartProgress, [0, 1], [60, -60])

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center overflow-hidden"
      >
        {/* Fond bleu canard avec clip-path diagonal */}
        <div
          className="absolute inset-0 bg-primary"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 80px), 0 100%)',
          }}
        />

        {/* Ligne dorée diagonale */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="absolute bottom-[80px] left-0 right-0 h-[3px] z-10 origin-left overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gold via-gold to-transparent" />
          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/60 to-transparent"
          />
        </motion.div>

        {/* Animated background */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-gold/20 rounded-full blur-3xl"
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="container-wide relative z-10 py-24"
        >
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="h-px w-12 bg-gold" />
              <span className="text-gold text-sm uppercase tracking-[0.2em]">
                Transparence
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6"
            >
              Comprendre les frais de notaire
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-white/80 leading-relaxed"
            >
              Découvrez la répartition réelle des frais d'acte et ce que vous
              payez vraiment.
            </motion.p>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-5 h-5 text-gold" />
          </motion.div>
        </motion.div>
      </section>

      {/* Section Camembert */}
      <section ref={chartRef} className="py-16 md:py-24 bg-background relative overflow-hidden">
        <PulsingGoldLine position="top" fromDirection="left" />

        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Texte explicatif */}
            <AnimatedSection direction="right">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-6">
                  Que payez-vous réellement ?
                </h2>

                <div className="prose prose-lg">
                  <p className="text-text-secondary leading-relaxed mb-6">
                    Les frais d'acte improprement appelés{' '}
                    <strong className="text-text-primary">« frais de notaire »</strong>{' '}
                    comprennent en réalité les taxes reversées au Trésor Public, les
                    débours et la rémunération au titre du service notarial.
                  </p>

                  <div className="bg-secondary/50 border-l-4 border-gold p-6 rounded-r-lg">
                    <p className="text-text-secondary text-sm m-0">
                      <strong className="text-text-primary">Le saviez-vous ?</strong>
                      <br />
                      Environ <span className="text-gold font-semibold">8/10ème</span> des
                      frais sont reversés à l'État et aux collectivités locales. La
                      rémunération du notaire ne représente qu'environ{' '}
                      <span className="text-gold font-semibold">1/10ème</span> du total.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Visualisation 3D des frais */}
            <motion.div style={{ y: chartY }}>
              <AnimatedSection delay={0.2}>
                <FraisNotaireVisualization />
              </AnimatedSection>
            </motion.div>
          </div>
        </div>

        <PulsingGoldLine position="bottom" fromDirection="right" />
      </section>

      {/* Détails des catégories */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container-wide">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-4">
                Détail de la répartition
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Comprendre où va chaque euro de vos frais d'acte.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <AnimatedSection key={category.title} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="bg-surface border border-border-light p-8 h-full relative group shadow-sm hover:shadow-lg transition-shadow duration-300"
                  >
                    {/* Coins dorés */}
                    <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-gold/40 group-hover:border-gold/80 transition-colors duration-300" />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-gold/40 group-hover:border-gold/80 transition-colors duration-300" />

                    {/* Icône avec couleur */}
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <Icon className="w-8 h-8" style={{ color: category.color }} />
                    </div>

                    {/* Pourcentage */}
                    <div
                      className="font-serif text-4xl font-bold mb-2"
                      style={{ color: category.color }}
                    >
                      {category.percentage}
                    </div>

                    {/* Titre */}
                    <h3 className="font-serif text-xl text-text-primary mb-4">
                      {category.title}
                    </h3>

                    {/* Description */}
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {category.description}
                    </p>
                  </motion.div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden">
        <div className="h-16 bg-background" />

        <div className="relative">
          <div
            className="absolute inset-0 bg-text-primary"
            style={{
              clipPath: 'polygon(0 60px, 100% 0, 100% 100%, 0 100%)',
            }}
          />

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="absolute top-[60px] left-0 right-0 h-[3px] z-10 origin-left overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gold via-gold to-transparent" />
          </motion.div>

          <div className="container-wide py-24 md:py-32 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <AnimatedSection>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6">
                  Besoin d'une estimation ?
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <p className="text-white/70 text-lg mb-10">
                  Notre équipe est à votre disposition pour vous fournir une
                  estimation détaillée des frais liés à votre projet.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <Button
                  asChild
                  size="lg"
                  className="bg-gold hover:bg-gold-light text-text-primary px-8 py-6 text-base transition-all duration-300 hover:-translate-y-1"
                >
                  <Link href="/contact" className="flex items-center gap-2">
                    Nous contacter
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
