"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

// Témoignages pour l'étude notariale INCANA
const testimonials = [
  {
    tempId: 0,
    testimonial: "Un accompagnement exemplaire pour notre achat immobilier. Maître INCANA a su nous rassurer et tout expliquer clairement.",
    by: "Marie D., Saint-Pierre",
    imgSrc: "https://i.pravatar.cc/150?img=1"
  },
  {
    tempId: 1,
    testimonial: "Professionnalisme et disponibilité remarquables. La succession de mes parents a été gérée avec beaucoup de délicatesse.",
    by: "Jean-Philippe R., L'Étang Salé",
    imgSrc: "https://i.pravatar.cc/150?img=3"
  },
  {
    tempId: 2,
    testimonial: "Excellent conseil pour la création de notre SCI familiale. Nous recommandons vivement cette étude !",
    by: "Famille Hoarau, Saint-Louis",
    imgSrc: "https://i.pravatar.cc/150?img=5"
  },
  {
    tempId: 3,
    testimonial: "Réactivité et expertise au rendez-vous. Notre vente s'est conclue rapidement grâce à leur efficacité.",
    by: "Sophie M., Les Avirons",
    imgSrc: "https://i.pravatar.cc/150?img=9"
  },
  {
    tempId: 4,
    testimonial: "Une équipe à l'écoute qui prend le temps d'expliquer chaque étape. Merci pour votre patience !",
    by: "Patrick L., Saint-Pierre",
    imgSrc: "https://i.pravatar.cc/150?img=11"
  },
  {
    tempId: 5,
    testimonial: "Service impeccable pour notre donation. Les conseils fiscaux nous ont permis d'optimiser la transmission.",
    by: "Christiane B., L'Étang Salé",
    imgSrc: "https://i.pravatar.cc/150?img=13"
  },
  {
    tempId: 6,
    testimonial: "Première acquisition immobilière et un accompagnement parfait du début à la fin. Très rassurant !",
    by: "Lucas et Emma T., Saint-Louis",
    imgSrc: "https://i.pravatar.cc/150?img=15"
  },
  {
    tempId: 7,
    testimonial: "Gestion parfaite de notre contrat de mariage. Conseils personnalisés et explications claires.",
    by: "Alexandra K., Les Avirons",
    imgSrc: "https://i.pravatar.cc/150?img=17"
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
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out",
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
      <img
        src={testimonial.imgSrc}
        alt={`${testimonial.by.split(',')[0]}`}
        className="mb-4 h-14 w-12 bg-muted object-cover object-top"
        style={{
          boxShadow: "3px 3px 0px hsl(var(--background))"
        }}
      />
      <h3 className={cn(
        "text-base sm:text-xl font-medium font-serif",
        isPrimary ? "text-white" : "text-text-primary"
      )}>
        "{testimonial.testimonial}"
      </h3>
      <p className={cn(
        "absolute bottom-8 left-8 right-8 mt-2 text-sm italic",
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