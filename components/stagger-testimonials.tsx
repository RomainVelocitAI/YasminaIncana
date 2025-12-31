"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Vrais témoignages clients de l'étude notariale INCANA
const testimonials = [
  {
    id: 0,
    text: "Ouverte à répondre à toute question ou explication des termes juridiques.",
    author: "Paola"
  },
  {
    id: 1,
    text: "Prestation impeccable, traitement rapide et accompagnement très professionnel tout au long du dossier. Vraiment très satisfait.",
    author: "Christophe"
  },
  {
    id: 2,
    text: "En trois mots : réactivité, efficacité, disponibilité.",
    author: "Samuel"
  },
  {
    id: 3,
    text: "Merci pour votre réactivité et votre professionnalisme. De plus il règne une grande humanité au sein du cabinet de Maître INCANA.",
    author: "Guillaume & Vanessa"
  },
  {
    id: 4,
    text: "Merci pour le professionnalisme, conseils, disponibilité. Notaire compétente, agréable, ayant le sens relationnel.",
    author: "Client satisfait"
  },
  {
    id: 5,
    text: "Professionnelle, efficace, à l'écoute, souriante.",
    author: "Client satisfait"
  },
  {
    id: 6,
    text: "Notaire à l'écoute, patiente, réactive, disponible qui explique très bien. Travail plus que parfait pour notre dossier qui a été finalisé très rapidement.",
    author: "Gilda"
  },
  {
    id: 7,
    text: "Une véritable capacité de réactivité pour un dossier proposé en dernière minute. Bravo !",
    author: "M. F."
  },
  {
    id: 8,
    text: "Dossier traité très rapidement, réactif en cas de besoin. S'adapte à nos disponibilités. Je recommande fortement.",
    author: "Marie Rose"
  },
  {
    id: 9,
    text: "Nous avons apprécié l'accompagnement et le professionnalisme lors de notre achat. Maître Incana a su répondre à toutes nos interrogations. Nous saluons sa bienveillance, son écoute et sa rigueur. Nous recommandons sans hésiter ses services.",
    author: "Laurence et Dimitri"
  },
  {
    id: 10,
    text: "Le dossier de succession de ma maman a été géré avec professionnalisme, clarté et rapidité. Nous recommandons vivement Maître INCANA pour les démarches.",
    author: "Reine-Claude"
  },
  {
    id: 11,
    text: "Merci à Maître Yasmina INCANA d'avoir accompagné avec professionnalisme et délicatesse la signature de l'acte d'achat. Je suis sensible aussi à son attention particulière au lien familial et à la protection du bien.",
    author: "M. B."
  },
  {
    id: 12,
    text: "Notaire à l'écoute, et très réactive...",
    author: "Mme G.F."
  },
  {
    id: 13,
    text: "Très bien accueillie et explications claires. Transaction rapide.",
    author: "Evelyne"
  },
  {
    id: 14,
    text: "Maître Incana a été un soutien pour moi dans la manière efficace et rapide dont elle a fait état pour régler la succession de mon époux. Merci à vous Maître.",
    author: "Simone"
  },
];

export const StaggerTestimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  const currentTestimonial = testimonials[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <div
      className="relative w-full py-16 md:py-20 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Fond subtil avec motif */}
      <div className="absolute inset-0 bg-secondary/30" />

      {/* Décoration dorée subtile */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-gold/40 to-gold/20" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-t from-transparent via-gold/40 to-gold/20" />

      <div className="container-wide relative">
        {/* Zone du témoignage */}
        <div className="relative min-h-[320px] md:min-h-[280px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentTestimonial.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
              }}
              className="absolute inset-0 flex flex-col items-center justify-center px-4"
            >
              {/* Guillemet ouvrant */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6"
              >
                <svg
                  className="w-12 h-12 md:w-16 md:h-16 text-gold/60"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
                </svg>
              </motion.div>

              {/* Texte du témoignage - Style manuscrit italique */}
              <motion.blockquote
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center max-w-3xl mx-auto mb-8"
              >
                <p className="font-handwriting text-2xl md:text-3xl lg:text-4xl text-text-primary leading-relaxed italic">
                  {currentTestimonial.text}
                </p>
              </motion.blockquote>

              {/* Ligne décorative */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-4"
              />

              {/* Nom de l'auteur - Style normal (pas italique) */}
              <motion.cite
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="not-italic font-sans text-base md:text-lg text-text-secondary tracking-wide"
              >
                — {currentTestimonial.author}
              </motion.cite>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-8">
          {/* Bouton précédent */}
          <button
            onClick={goToPrev}
            className={cn(
              "group flex items-center justify-center w-12 h-12 md:w-14 md:h-14",
              "border border-border-light bg-background/80 backdrop-blur-sm",
              "hover:border-gold hover:bg-gold/5 transition-all duration-300",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            )}
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="w-5 h-5 text-text-secondary group-hover:text-gold transition-colors" />
          </button>

          {/* Indicateurs de pagination */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "bg-gold w-6"
                    : "bg-border hover:bg-gold/50"
                )}
                aria-label={`Aller au témoignage ${index + 1}`}
                aria-current={index === currentIndex ? "true" : undefined}
              />
            ))}
          </div>

          {/* Bouton suivant */}
          <button
            onClick={goToNext}
            className={cn(
              "group flex items-center justify-center w-12 h-12 md:w-14 md:h-14",
              "border border-border-light bg-background/80 backdrop-blur-sm",
              "hover:border-gold hover:bg-gold/5 transition-all duration-300",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            )}
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="w-5 h-5 text-text-secondary group-hover:text-gold transition-colors" />
          </button>
        </div>

        {/* Compteur discret */}
        <div className="text-center mt-6">
          <span className="text-sm text-text-muted font-sans">
            {currentIndex + 1} / {testimonials.length}
          </span>
        </div>
      </div>
    </div>
  );
};
