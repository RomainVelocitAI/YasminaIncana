import { Metadata } from 'next'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { ServiceCard } from '@/components/services/ServiceCard'
import { services } from '@/content/services'

export const metadata: Metadata = {
  title: "Nos services",
  description:
    "Découvrez nos domaines d'expertise : immobilier, famille et succession, entreprise et patrimoine. Un accompagnement complet pour tous vos projets.",
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
        <div className="absolute top-20 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

        <div className="container-wide relative">
          <div className="max-w-3xl">
            <AnimatedSection>
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-12 bg-gold" />
                <span className="text-gold text-sm uppercase tracking-[0.2em]">
                  Expertise
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text-primary mb-6">
                Nos domaines d'intervention
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-xl text-text-secondary leading-relaxed">
                Un accompagnement juridique complet pour sécuriser vos projets
                immobiliers, protéger votre famille et développer votre patrimoine.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 md:py-28">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary/30">
        <div className="container-wide">
          <AnimatedSection>
            <div className="text-center">
              <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-4">
                Besoin d'un conseil personnalisé ?
              </h2>
              <p className="text-text-secondary mb-6">
                Notre équipe est à votre disposition pour étudier votre situation.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3 transition-all duration-300 hover:-translate-y-1"
              >
                Nous contacter
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
