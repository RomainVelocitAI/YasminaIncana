"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

// Vrais témoignages clients de l'étude notariale INCANA
const testimonials = [
  {
    tempId: 0,
    testimonial: "Ouverte à répondre à toute question ou explication des termes juridiques.",
    by: "Paola"
  },
  {
    tempId: 1,
    testimonial: "Prestation impeccable, traitement rapide et accompagnement très professionnel tout au long du dossier. Vraiment très satisfait.",
    by: "Christophe"
  },
  {
    tempId: 2,
    testimonial: "En trois mots : réactivité, efficacité, disponibilité.",
    by: "Samuel"
  },
  {
    tempId: 3,
    testimonial: "Merci pour votre réactivité et votre professionnalisme. De plus il règne une grande humanité au sein du cabinet de Maître INCANA.",
    by: "Guillaume & Vanessa"
  },
  {
    tempId: 4,
    testimonial: "Merci pour le professionnalisme, conseils, disponibilité. Notaire compétente, agréable, ayant le sens relationnel.",
    by: "Client satisfait"
  },
  {
    tempId: 5,
    testimonial: "Professionnelle, efficace, à l'écoute, souriante.",
    by: "Client satisfait"
  },
  {
    tempId: 6,
    testimonial: "Notaire à l'écoute, patiente, réactive, disponible qui explique très bien. Travail plus que parfait pour notre dossier qui a été finalisé très rapidement.",
    by: "Gilda"
  },
  {
    tempId: 7,
    testimonial: "Une véritable capacité de réactivité pour un dossier proposé en dernière minute. Bravo !",
    by: "M. F."
  },
  {
    tempId: 8,
    testimonial: "Dossier traité très rapidement, réactif en cas de besoin. S'adapte à nos disponibilités. Je recommande fortement.",
    by: "Marie Rose"
  },
  {
    tempId: 9,
    testimonial: "Nous avons apprécié l'accompagnement et le professionnalisme lors de notre achat. Maître Incana a su répondre à toutes nos interrogations. Nous saluons sa bienveillance, son écoute et sa rigueur. Nous recommandons sans hésiter ses services.",
    by: "Laurence et Dimitri"
  },
  {
    tempId: 10,
    testimonial: "Le dossier de succession de ma maman a été géré avec professionnalisme, clarté et rapidité. Nous recommandons vivement Maître INCANA pour les démarches.",
    by: "Reine-Claude"
  },
  {
    tempId: 11,
    testimonial: "Merci à Maître Yasmina INCANA d'avoir accompagné avec professionnalisme et délicatesse la signature de l'acte d'achat. Je suis sensible aussi à son attention particulière au lien familial et à la protection du bien.",
    by: "M. B."
  },
  {
    tempId: 12,
    testimonial: "Notaire à l'écoute, et très réactive...",
    by: "Mme G.F."
  },
  {
    tempId: 13,
    testimonial: "Très bien accueillie et explications claires. Transaction rapide.",
    by: "Evelyne"
  },
  {
    tempId: 14,
    testimonial: "Maître Incana a été un soutien pour moi dans la manière efficace et rapide dont elle a fait état pour régler la succession de mon époux. Merci à vous Maître.",
    by: "Simone"
  },
];

interface TestimonialCardProps {
  position: number;
  index: number;
  testimonial: typeof testimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  index,
  testimonial,
  handleMove,
  cardSize
}) => {
  const isCenter = position === 0;
  // Alterner bleu canard / surface : index pair = bleu canard
  const isPrimary = index % 2 === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-6 sm:p-8 transition-all duration-500 ease-in-out",
        isCenter
          ? "z-10 border-gold"
          : "z-0 hover:border-gold/50",
        isPrimary
          ? "bg-primary text-white border-gold"
          : "bg-surface text-text-primary border-secondary"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px var(--gold)" : "0px 0px 0px 0px transparent"
      }}
    >
      <span
        className={cn(
          "absolute block origin-top-right rotate-45",
          isPrimary ? "bg-gold/50" : "bg-border"
        )}
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }}
      />
      {/* Icône guillemet au lieu de photo */}
      <div className={cn(
        "mb-4 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center",
        isPrimary ? "bg-gold/20" : "bg-primary/10"
      )}>
        <Quote className={cn(
          "w-5 h-5 sm:w-6 sm:h-6",
          isPrimary ? "text-gold" : "text-primary"
        )} />
      </div>
      <h3 className={cn(
        "text-sm sm:text-base lg:text-lg font-medium font-serif leading-relaxed",
        isPrimary ? "text-white" : "text-text-primary"
      )}>
        "{testimonial.testimonial}"
      </h3>
      <p className={cn(
        "absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 mt-2 text-sm italic",
        isPrimary ? "text-gold" : "text-text-secondary"
      )}>
        - {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Défilement automatique toutes les 4 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      handleMove(1);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonialsList]);

  return (
    <div
      className="relative w-full overflow-hidden bg-secondary/30"
      style={{ height: 600 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            index={index}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-background border-2 border-secondary hover:bg-primary hover:text-white hover:border-primary",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          )}
          aria-label="Témoignage précédent"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-background border-2 border-secondary hover:bg-primary hover:text-white hover:border-primary",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          )}
          aria-label="Témoignage suivant"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};