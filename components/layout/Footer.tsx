'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { notaryInfo } from '@/content/team'

const footerLinks = {
  services: [
    { name: 'Immobilier', href: '/services/immobilier' },
    { name: 'Famille & Succession', href: '/services/famille' },
    { name: 'Entreprise & Patrimoine', href: '/services/entreprise' },
  ],
  study: [
    { name: "L'étude", href: '/etude' },
    { name: 'Notre équipe', href: '/etude#equipe' },
    { name: 'Biens à vendre', href: '/biens' },
  ],
  legal: [
    { name: 'Mentions légales', href: '/mentions-legales' },
    { name: 'Contact', href: '/contact' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-text-primary text-white/80 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

      <div className="container-wide py-16 md:py-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand & Contact */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <h3 className="font-serif text-2xl text-white mb-1">
                Maître ARMON INCANA
              </h3>
              <span className="text-xs text-gold uppercase tracking-[0.2em]">
                Notaire
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Votre notaire à L'Étang-Salé. Expertise, confiance et proximité
              au service de vos projets.
            </p>
            <div className="space-y-3 text-sm">
              <a
                href={`tel:${notaryInfo.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors"
              >
                <Phone className="w-4 h-4 text-gold" />
                <span>{notaryInfo.phone}</span>
              </a>
              <a
                href={`mailto:${notaryInfo.email}`}
                className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors"
              >
                <Mail className="w-4 h-4 text-gold" />
                <span>{notaryInfo.email}</span>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-lg text-white mb-6">Nos services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-gold transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-gold transition-all duration-300 group-hover:w-4" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* L'étude */}
          <div>
            <h4 className="font-serif text-lg text-white mb-6">L'étude</h4>
            <ul className="space-y-3">
              {footerLinks.study.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-gold transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-gold transition-all duration-300 group-hover:w-4" />
                    {link.name}
                  </Link>
                </li>
              ))}
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-gold transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-gold transition-all duration-300 group-hover:w-4" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours & Address */}
          <div>
            <h4 className="font-serif text-lg text-white mb-6">Nous trouver</h4>
            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-1" />
                <div className="text-white/60">
                  <p>{notaryInfo.address}</p>
                  <p>
                    {notaryInfo.postalCode} {notaryInfo.city}
                  </p>
                  <p>{notaryInfo.country}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="w-4 h-4 text-gold shrink-0 mt-1" />
                <div className="text-white/60">
                  {notaryInfo.hours.map((schedule, i) => (
                    <p key={i}>
                      <span className="text-white/80">{schedule.days}:</span>
                      <br />
                      {schedule.morning === 'Fermé'
                        ? 'Fermé'
                        : `${schedule.morning} | ${schedule.afternoon}`}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/40">
              © {new Date().getFullYear()} Étude de Maître ARMON INCANA. Tous
              droits réservés.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/mentions-legales"
                className="text-sm text-white/40 hover:text-gold transition-colors"
              >
                Mentions légales
              </Link>
              <span className="text-white/20">|</span>
              <span className="text-sm text-white/40">
                Notaire à La Réunion
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
