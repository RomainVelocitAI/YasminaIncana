import { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock, Printer } from 'lucide-react'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { ContactForm } from '@/components/contact/ContactForm'
import { notaryInfo } from '@/content/team'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Contactez l'étude de Maître ARMON INCANA à L'Étang-Salé. Prenez rendez-vous pour vos projets immobiliers, successions et conseils juridiques.",
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />

        <div className="container-wide relative">
          <div className="max-w-3xl">
            <AnimatedSection>
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-12 bg-gold" />
                <span className="text-gold text-sm uppercase tracking-[0.2em]">
                  Contact
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text-primary mb-6">
                Nous contacter
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-xl text-text-secondary leading-relaxed">
                Notre équipe est à votre disposition pour répondre à vos questions
                et vous accompagner dans vos projets.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-16 md:py-24">
        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Contact info */}
            <aside className="lg:col-span-5">
              <AnimatedSection direction="right">
                <div className="sticky top-32 space-y-8">
                  <div>
                    <h2 className="font-serif text-2xl text-text-primary mb-6">
                      Informations pratiques
                    </h2>

                    <div className="space-y-6">
                      {/* Address */}
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary mb-1">Adresse</p>
                          <p className="text-text-secondary text-sm">
                            {notaryInfo.address}
                            <br />
                            {notaryInfo.postalCode} {notaryInfo.city}
                            <br />
                            {notaryInfo.country}
                          </p>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0">
                          <Phone className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary mb-1">Téléphone</p>
                          <a
                            href={`tel:${notaryInfo.phone.replace(/\s/g, '')}`}
                            className="text-text-secondary text-sm hover:text-primary transition-colors"
                          >
                            {notaryInfo.phone}
                          </a>
                        </div>
                      </div>

                      {/* Fax */}
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0">
                          <Printer className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary mb-1">Fax</p>
                          <p className="text-text-secondary text-sm">
                            {notaryInfo.fax}
                          </p>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0">
                          <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary mb-1">Email</p>
                          <a
                            href={`mailto:${notaryInfo.email}`}
                            className="text-text-secondary text-sm hover:text-primary transition-colors break-all"
                          >
                            {notaryInfo.email}
                          </a>
                        </div>
                      </div>

                      {/* Hours */}
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0">
                          <Clock className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary mb-2">
                            Horaires d'ouverture
                          </p>
                          <table className="text-sm text-text-secondary">
                            <tbody>
                              {notaryInfo.hours.map((schedule, i) => (
                                <tr key={i}>
                                  <td className="pr-4 py-1 text-text-primary">
                                    {schedule.days}
                                  </td>
                                  <td className="py-1">
                                    {schedule.morning === 'Fermé'
                                      ? 'Fermé'
                                      : `${schedule.morning} - ${schedule.afternoon}`}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Map placeholder */}
                  <div className="aspect-[4/3] bg-secondary border border-border-light overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.7!2d55.35!3d-21.27!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDE2JzEyLjAiUyA1NcKwMjEnMDAuMCJF!5e0!3m2!1sfr!2sfr!4v1"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Localisation de l'étude"
                    />
                  </div>
                </div>
              </AnimatedSection>
            </aside>

            {/* Contact form */}
            <div className="lg:col-span-7">
              <AnimatedSection>
                <div className="bg-surface border border-border-light p-8 md:p-12">
                  <h2 className="font-serif text-2xl text-text-primary mb-2">
                    Envoyez-nous un message
                  </h2>
                  <p className="text-text-secondary mb-8">
                    Remplissez le formulaire ci-dessous et nous vous répondrons
                    dans les meilleurs délais.
                  </p>
                  <ContactForm />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
