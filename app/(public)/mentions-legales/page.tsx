import { Metadata } from 'next'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { notaryInfo } from '@/content/team'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description:
    "Mentions légales du site de l'étude notariale de Maître ARMON INCANA.",
}

export default function MentionsLegalesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />

        <div className="container-wide relative">
          <AnimatedSection>
            <h1 className="font-serif text-4xl md:text-5xl text-text-primary mb-6">
              Mentions légales
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container-narrow">
          <div className="prose prose-lg max-w-none">
            <AnimatedSection>
              <h2 className="font-serif text-2xl text-text-primary">
                Éditeur du site
              </h2>
              <p className="text-text-secondary">
                Le présent site est édité par :
              </p>
              <p className="text-text-secondary">
                <strong>Étude de Maître Yasmina ARMON INCANA</strong>
                <br />
                Notaire
                <br />
                {notaryInfo.address}
                <br />
                {notaryInfo.postalCode} {notaryInfo.city}
                <br />
                {notaryInfo.country}
              </p>
              <p className="text-text-secondary">
                Téléphone : {notaryInfo.phone}
                <br />
                Email : {notaryInfo.email}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="font-serif text-2xl text-text-primary mt-12">
                Directeur de la publication
              </h2>
              <p className="text-text-secondary">
                Maître Yasmina ARMON INCANA, Notaire
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h2 className="font-serif text-2xl text-text-primary mt-12">
                Hébergement
              </h2>
              <p className="text-text-secondary">
                Ce site est hébergé par Vercel Inc.
                <br />
                340 S Lemon Ave #4133
                <br />
                Walnut, CA 91789, États-Unis
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <h2 className="font-serif text-2xl text-text-primary mt-12">
                Propriété intellectuelle
              </h2>
              <p className="text-text-secondary">
                L'ensemble de ce site relève de la législation française et
                internationale sur le droit d'auteur et la propriété intellectuelle.
                Tous les droits de reproduction sont réservés, y compris pour les
                documents téléchargeables et les représentations iconographiques et
                photographiques.
              </p>
              <p className="text-text-secondary">
                La reproduction de tout ou partie de ce site sur un support
                électronique quel qu'il soit est formellement interdite sauf
                autorisation expresse du directeur de la publication.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <h2 className="font-serif text-2xl text-text-primary mt-12">
                Protection des données personnelles
              </h2>
              <p className="text-text-secondary">
                Conformément au Règlement Général sur la Protection des Données (RGPD)
                et à la loi Informatique et Libertés, vous disposez d'un droit d'accès,
                de rectification, d'effacement et de portabilité des données vous
                concernant, ainsi que du droit de vous opposer au traitement pour motif
                légitime.
              </p>
              <p className="text-text-secondary">
                Les informations recueillies via le formulaire de contact sont
                uniquement destinées à l'étude notariale et ne sont en aucun cas
                cédées à des tiers.
              </p>
              <p className="text-text-secondary">
                Pour exercer vos droits ou pour toute question relative à la protection
                de vos données personnelles, vous pouvez nous contacter à l'adresse :
                {' '}{notaryInfo.email}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <h2 className="font-serif text-2xl text-text-primary mt-12">
                Cookies
              </h2>
              <p className="text-text-secondary">
                Ce site utilise des cookies techniques nécessaires à son bon
                fonctionnement. Ces cookies ne collectent aucune donnée personnelle
                et ne sont pas utilisés à des fins publicitaires.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.6}>
              <h2 className="font-serif text-2xl text-text-primary mt-12">
                Crédits photographiques
              </h2>
              <p className="text-text-secondary">
                Les photographies utilisées sur ce site proviennent de :
              </p>
              <ul className="text-text-secondary">
                <li>Photos de l'étude et de l'équipe : Droits réservés</li>
                <li>Photos d'illustration : Unsplash</li>
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.7}>
              <h2 className="font-serif text-2xl text-text-primary mt-12">
                Responsabilité
              </h2>
              <p className="text-text-secondary">
                Les informations fournies sur ce site le sont à titre indicatif.
                Elles ne sauraient constituer un avis juridique. Pour toute question
                juridique, nous vous invitons à prendre contact avec notre étude.
              </p>
              <p className="text-text-secondary">
                L'étude ne saurait être tenue responsable des dommages directs ou
                indirects résultant de l'utilisation de ce site.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
