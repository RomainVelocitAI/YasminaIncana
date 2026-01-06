"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TeamMember } from "@/lib/types";
import Image from "next/image";

interface TeamSliderProps {
  members: TeamMember[];
  className?: string;
}

/**
 * Un slider animé pour présenter les membres de l'équipe.
 * Utilise framer-motion pour les animations et respecte
 * la charte graphique du site (bleu canard, doré).
 */
export const TeamSlider = ({
  members,
  className,
}: TeamSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const activeMember = members[currentIndex];

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % members.length);
  };

  const handlePrev = () => {
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 + members.length) % members.length);
  };

  const handleThumbnailClick = (index: number) => {
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  // Get other members for thumbnails
  const thumbnailMembers = members.filter((_, i) => i !== currentIndex);

  // Animation variants for the main image
  const imageVariants = {
    enter: (direction: "left" | "right") => ({
      y: direction === "right" ? "100%" : "-100%",
      opacity: 0,
    }),
    center: { y: 0, opacity: 1 },
    exit: (direction: "left" | "right") => ({
      y: direction === "right" ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  // Animation variants for the text content
  const textVariants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? 50 : -50,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        className
      )}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* === Left Column: Thumbnails === */}
        <div className="lg:col-span-3 flex flex-col justify-end order-2 lg:order-1">
          {/* Thumbnail Navigation */}
          <div className="flex space-x-3">
            {thumbnailMembers.map((member) => {
              const originalIndex = members.findIndex(
                (m) => m.name === member.name
              );
              return (
                <button
                  key={member.name}
                  onClick={() => handleThumbnailClick(originalIndex)}
                  className="relative overflow-hidden w-16 h-20 lg:w-20 lg:h-24 opacity-70 hover:opacity-100 transition-all duration-300 focus:outline-none group"
                  aria-label={`Voir ${member.name}`}
                >
                  {/* Liseré doré pulsant */}
                  <motion.div
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-0 border-2 border-gold z-10 pointer-events-none"
                  />
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="80px"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* === Center Column: Main Image === */}
        <div className="lg:col-span-4 relative h-80 lg:h-[450px] order-1 lg:order-2">
          {/* Decorative frames */}
          <div className="absolute -right-3 -top-3 w-full h-full border-2 border-gold/30 z-0" />
          <div className="absolute -right-6 -top-6 w-full h-full border border-white/10 z-0" />

          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 overflow-hidden"
            >
              <Image
                src={activeMember.image}
                alt={activeMember.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 400px"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Gold corner accents */}
          <div className="absolute -top-2 -left-2 w-12 h-12 border-t-2 border-l-2 border-gold z-20" />
          <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-2 border-r-2 border-gold z-20" />
        </div>

        {/* === Right Column: Text and Navigation === */}
        <div className="lg:col-span-5 flex flex-col justify-between lg:pl-8 order-3">
          {/* Text Content */}
          <div className="relative overflow-hidden pt-4 lg:pt-8 min-h-[280px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Role badge */}
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="h-px w-8 bg-gold" />
                  <span className="text-gold text-sm uppercase tracking-wider font-medium">
                    {activeMember.role}
                  </span>
                </div>

                {/* Name */}
                <h3 className="font-serif text-3xl lg:text-4xl text-white mb-4">
                  {activeMember.name}
                </h3>

                {/* Bio */}
                <p className="text-white/80 text-base lg:text-lg leading-relaxed">
                  {activeMember.bio}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-3 mt-8 lg:mt-0">
            <Button
              variant="outline"
              size="icon"
              className="rounded-none w-12 h-12 border-white/30 bg-transparent text-white hover:bg-white/10 hover:border-gold transition-all"
              onClick={handlePrev}
              aria-label="Membre précédent"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              className="rounded-none w-12 h-12 bg-gold text-text-primary hover:bg-gold-light transition-all"
              onClick={handleNext}
              aria-label="Membre suivant"
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
