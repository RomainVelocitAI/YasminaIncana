'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Menu, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

const baseNavigation = [
  { name: 'Accueil', href: '/' },
  { name: "L'étude", href: '/etude' },
  { name: 'Nos missions', href: '/services' },
  { name: 'Préparer mon RDV', href: '/rendez-vous' },
  { name: 'Tarifs', href: '/tarifs' },
  { name: 'Contact', href: '/contact' },
]

const propertiesNavItem = { name: 'Biens à vendre', href: '/biens' }

// Pages avec un héro sombre qui nécessitent un header avec fond
const darkHeroPages = ['/services', '/etude', '/biens', '/tarifs']

interface HeaderProps {
  showPropertiesLink?: boolean
}

export function Header({ showPropertiesLink = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Vérifier si la page actuelle a un héro sombre
  const hasDarkHero = darkHeroPages.some(page => pathname === page)

  // Construire la navigation selon si des biens sont disponibles
  const navigation = useMemo(() => {
    if (showPropertiesLink) {
      // Insérer "Biens à vendre" après "Nos missions"
      const navCopy = [...baseNavigation]
      navCopy.splice(3, 0, propertiesNavItem)
      return navCopy
    }
    return baseNavigation
  }, [showPropertiesLink])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Déterminer les styles du header
  const headerStyles = isScrolled
    ? 'bg-surface/95 backdrop-blur-md shadow-sm border-b border-border-light'
    : hasDarkHero
      ? 'bg-text-primary/80 backdrop-blur-md'
      : 'bg-transparent'

  // Couleurs du texte selon le contexte
  const isDarkMode = !isScrolled && hasDarkHero
  const textColor = isDarkMode ? 'text-white' : 'text-text-primary'
  const textSecondaryColor = isDarkMode ? 'text-white/80' : 'text-text-secondary'
  const textMutedColor = isDarkMode ? 'text-white/60' : 'text-text-muted'
  const activeColor = isDarkMode ? 'text-white' : 'text-primary'
  const underlineColor = isDarkMode ? 'bg-white' : 'bg-primary'

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerStyles}`}
    >
      <nav className="container-wide">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative w-12 h-12 md:w-14 md:h-14">
              <Image
                src="/images/logo.jpg"
                alt="Logo Maître INCANA"
                fill
                className="object-contain object-left"
                sizes="56px"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
            <div className="flex flex-col">
              <span className={`font-serif text-lg md:text-xl tracking-tight transition-colors ${
                !isScrolled && hasDarkHero ? 'text-white' : 'text-[#8B2942]'
              } group-hover:opacity-80`}>
                Maître INCANA
              </span>
              <span className={`text-[10px] uppercase tracking-[0.15em] group-hover:text-primary transition-colors ${textMutedColor}`}>
                Notaire
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm tracking-wide transition-colors duration-300 ${
                  pathname === item.href
                    ? activeColor
                    : `${textSecondaryColor} hover:${isDarkMode ? 'text-white' : 'text-primary'}`
                }`}
              >
                {item.name}
                {pathname === item.href && (
                  <motion.span
                    layoutId="activeNav"
                    className={`absolute -bottom-1 left-0 right-0 h-px ${underlineColor}`}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Phone - Desktop */}
            <a
              href="tel:0262960300"
              className={`hidden md:flex items-center gap-2 text-sm hover:text-primary transition-colors ${textSecondaryColor}`}
            >
              <Phone className="w-4 h-4" />
              <span>0262 960 300</span>
            </a>

            {/* CTA Button - Desktop */}
            <Button
              asChild
              className="hidden lg:inline-flex bg-primary hover:bg-primary-dark text-white px-6 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Link href="/contact">Prendre rendez-vous</Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className={textColor}>
                  <Menu className="w-6 h-6" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:w-[400px] bg-surface border-l border-border p-0"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between p-6 border-b border-border">
                    <span className="font-serif text-xl text-text-primary">Menu</span>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex-1 p-6">
                    <ul className="space-y-1">
                      {navigation.map((item, index) => (
                        <motion.li
                          key={item.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`block py-4 text-lg border-b border-border-light transition-colors ${
                              pathname === item.href
                                ? 'text-primary font-medium'
                                : 'text-text-secondary hover:text-primary'
                            }`}
                          >
                            {item.name}
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </nav>

                  {/* Mobile Footer */}
                  <div className="p-6 border-t border-border bg-secondary/30">
                    <a
                      href="tel:0262960300"
                      className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors mb-4"
                    >
                      <Phone className="w-5 h-5" />
                      <span>0262 960 300</span>
                    </a>
                    <Button
                      asChild
                      className="w-full bg-primary hover:bg-primary-dark text-white"
                    >
                      <Link href="/contact" onClick={() => setIsOpen(false)}>
                        Prendre rendez-vous
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}
