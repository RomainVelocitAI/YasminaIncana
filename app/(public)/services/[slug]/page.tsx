import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Check, ArrowRight } from 'lucide-react'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/animations/AnimatedSection'
import { ServiceCard } from '@/components/services/ServiceCard'
import { services } from '@/content/services'
import { Button } from '@/components/ui/button'
import { NotaryFeesCalculator } from '@/components/tools/NotaryFeesCalculator'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)

  if (!service) {
    return { title: 'Service non trouvé' }
  }

  return {
    title: service.title,
    description: service.fullDescription,
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)

  if (!service) {
    notFound()
  }

  const otherServices = services.filter((s) => s.slug !== slug)

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="container-wide relative">
          {/* Back link */}
          <AnimatedSection>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Retour aux services</span>
            </Link>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text content */}
            <div>
              <AnimatedSection delay={0.1}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="h-px w-12 bg-gold" />
                  <span className="text-gold text-sm uppercase tracking-[0.2em]">
                    Nos services
                  </span>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text-primary mb-6">
                  {service.title}
                </h1>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <p className="text-xl text-text-secondary leading-relaxed">
                  {service.fullDescription}
                </p>
              </AnimatedSection>
            </div>

            {/* Image */}
            <AnimatedSection delay={0.4} direction="left">
              <div className="relative">
                {/* Background decoration */}
                <div className="absolute -inset-4 bg-primary/10 -rotate-2" />
                <div className="absolute -inset-4 bg-gold/10 rotate-1" />

                {/* Main image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-text-primary/20 to-transparent" />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Prestations */}
      <section className="py-16 md:py-24">
        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Main content */}
            <div className="lg:col-span-7">
              <AnimatedSection>
                <h2 className="font-serif text-2xl md:text-3xl text-text-primary mb-8">
                  Nos prestations
                </h2>
              </AnimatedSection>

              <StaggerContainer className="space-y-4">
                {service.prestations.map((prestation) => (
                  <StaggerItem key={prestation}>
                    <div className="flex items-start gap-4 p-4 bg-surface border border-border-light hover:border-primary/20 transition-colors">
                      <div className="w-8 h-8 bg-primary/10 flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-text-secondary pt-1">{prestation}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {/* CTA */}
              <AnimatedSection delay={0.5} className="mt-12">
                <div className="bg-secondary/50 p-8 border border-border-light">
                  <h3 className="font-serif text-xl text-text-primary mb-3">
                    Besoin d'accompagnement ?
                  </h3>
                  <p className="text-text-secondary mb-6">
                    Contactez-nous pour discuter de votre projet. Notre équipe
                    est à votre disposition pour vous conseiller.
                  </p>
                  <Button
                    asChild
                    className="bg-primary hover:bg-primary-dark text-white"
                  >
                    <Link href="/contact">
                      Prendre rendez-vous
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar - Other services */}
            <aside className="lg:col-span-5">
              <AnimatedSection direction="left">
                <div className="sticky top-32">
                  <h3 className="font-serif text-xl text-text-primary mb-6">
                    Autres domaines
                  </h3>
                  <div className="space-y-2">
                    {otherServices.map((s, index) => (
                      <ServiceCard
                        key={s.slug}
                        service={s}
                        index={index}
                        variant="compact"
                      />
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </aside>
          </div>
        </div>
      </section>

      {/* Calculateur de frais de notaire (pleine largeur, uniquement pour immobilier) */}
      {slug === 'immobilier' && (
        <section id="calculateur" className="py-16 md:py-24 bg-secondary/30 scroll-mt-24">
          <div className="container-wide">
            <AnimatedSection>
              <NotaryFeesCalculator />
            </AnimatedSection>
          </div>
        </section>
      )}
    </>
  )
}
