'use client'

import Link from 'next/link'

const footerLinks = {
  navigation: [
    { name: 'Accueil', href: '/' },
    { name: "L'étude", href: '/etude' },
    { name: 'Nos services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ],
  services: [
    { name: 'Immobilier', href: '/services/immobilier' },
    { name: 'Famille & Succession', href: '/services/famille' },
    { name: 'Entreprise & Patrimoine', href: '/services/entreprise' },
  ],
  legal: [
    { name: 'Mentions légales', href: '/mentions-legales' },
    { name: 'Politique de confidentialité', href: '/mentions-legales#confidentialite' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-text-primary text-white/80 relative overflow-hidden">
      {/* Decorative top line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container-wide py-12 md:py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <h3 className="font-serif text-xl text-white">
                Maître ARMON INCANA
              </h3>
              <span className="text-xs text-gold uppercase tracking-[0.2em]">
                Notaire
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed">
              Votre notaire à L'Étang-Salé, La Réunion.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-medium text-white mb-4 text-sm uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-medium text-white mb-4 text-sm uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-medium text-white mb-4 text-sm uppercase tracking-wider">
              Informations
            </h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Étude de Maître ARMON INCANA. Tous droits réservés.
            </p>
            <p className="text-xs text-white/40">
              Notaire à L'Étang-Salé, La Réunion
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
