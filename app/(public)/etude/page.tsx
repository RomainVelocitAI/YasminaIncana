import { Metadata } from 'next'
import Image from 'next/image'
import { Scale, Shield, Users, Clock } from 'lucide-react'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/animations/AnimatedSection'
import { TeamMemberCard } from '@/components/team/TeamMemberCard'
import { team, notaryInfo } from '@/content/team'

export const metadata: Metadata = {
  title: "L'étude",
  description:
    "Découvrez l'étude notariale de Maître Yasmina ARMON INCANA à L'Étang-Salé. Une équipe d'experts à votre service.",
}

const values = [
  {
    icon: Scale,
    title: 'Expertise',
    description:
      "Une connaissance approfondie du droit notarial et une veille juridique permanente pour vous offrir les meilleurs conseils.",
  },
  {
    icon: Shield,
    title: 'Confiance',
    description:
      'La confidentialité et la sécurité de vos transactions sont au cœur de notre engagement professionnel.',
  },
  {
    icon: Users,
    title: 'Proximité',
    description:
      "Un accompagnement personnalisé et une écoute attentive pour répondre à vos besoins spécifiques.",
  },
  {
    icon: Clock,
    title: 'Réactivité',
    description:
      'Une équipe disponible et réactive pour traiter vos dossiers dans les meilleurs délais.',
  },
]

export default function EtudePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="container-wide relative">
          <div className="max-w-3xl">
            <AnimatedSection>
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-12 bg-gold" />
                <span className="text-gold text-sm uppercase tracking-[0.2em]">
                  Notre cabinet
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text-primary mb-6">
                L'étude
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-xl text-text-secondary leading-relaxed">
                Implantée au cœur de L'Étang-Salé, notre étude notariale vous
                accompagne avec expertise et bienveillance dans tous vos projets
                juridiques.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* About section */}
      <section className="py-20 md:py-28">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <AnimatedSection direction="left">
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&h=750&fit=crop"
                    alt="L'étude notariale"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-gold/30 -z-10" />
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 -z-10" />
              </div>
            </AnimatedSection>

            {/* Content */}
            <div>
              <AnimatedSection>
                <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-6">
                  Une tradition d'excellence
                  <br />
                  <span className="text-primary">au service de vos projets</span>
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <p className="text-text-secondary leading-relaxed mb-6">
                  L'étude de Maître Yasmina ARMON INCANA perpétue la tradition
                  notariale en l'alliant aux exigences du monde moderne. Notre
                  mission : vous offrir un accompagnement juridique de qualité,
                  adapté à vos besoins.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <p className="text-text-secondary leading-relaxed mb-6">
                  Située au 96, Avenue Raymond Barre à L'Étang-Salé, notre étude
                  bénéficie d'une position privilégiée pour vous accueillir dans
                  un cadre agréable et professionnel.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <p className="text-text-secondary leading-relaxed">
                  Que vous soyez particulier ou professionnel, nous mettons notre
                  expertise à votre disposition pour sécuriser vos transactions
                  et vous conseiller dans vos choix patrimoniaux.
                </p>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="container-wide">
          <div className="text-center mb-16">
            <AnimatedSection>
              <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-4">
                Nos valeurs
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Des principes fondamentaux qui guident notre pratique quotidienne
                et notre relation avec nos clients.
              </p>
            </AnimatedSection>
          </div>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <StaggerItem key={value.title}>
                  <div className="bg-surface p-8 border border-border-light h-full hover:border-primary/20 transition-colors duration-300">
                    <div className="w-14 h-14 bg-primary/10 flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-serif text-xl text-text-primary mb-3">
                      {value.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Team */}
      <section id="equipe" className="py-20 md:py-28">
        <div className="container-wide">
          <div className="text-center mb-16">
            <AnimatedSection>
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="h-px w-12 bg-gold" />
                <span className="section-number">Équipe</span>
                <span className="h-px w-12 bg-gold" />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-4">
                Notre équipe
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Des professionnels expérimentés et passionnés, à votre écoute pour
                vous accompagner dans tous vos projets.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <TeamMemberCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
