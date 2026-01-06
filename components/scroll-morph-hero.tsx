"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Phone, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

// --- Utility ---
// function cn(...inputs: ClassValue[]) {
//     return twMerge(clsx(inputs));
// }

// --- Types ---
export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface FlipCardProps {
    src: string;
    index: number;
    total: number;
    phase: AnimationPhase;
    target: { x: number; y: number; rotation: number; scale: number; opacity: number };
}

// --- FlipCard Component ---
const IMG_WIDTH = 60;  // Reduced from 100
const IMG_HEIGHT = 85; // Reduced from 140

function FlipCard({
    src,
    index,
    total,
    phase,
    target,
}: FlipCardProps) {
    return (
        <motion.div
            // Smoothly animate to the coordinates defined by the parent
            animate={{
                x: target.x,
                y: target.y,
                rotate: target.rotation,
                scale: target.scale,
                opacity: target.opacity,
            }}
            transition={{
                type: "spring",
                stiffness: 40,
                damping: 15,
            }}

            // Initial style
            style={{
                position: "absolute",
                width: IMG_WIDTH,
                height: IMG_HEIGHT,
                transformStyle: "preserve-3d", // Essential for the 3D hover effect
                perspective: "1000px",
            }}
            className="cursor-pointer group"
        >
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ rotateY: 180 }}
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-gray-200"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <img
                        src={src}
                        alt={`hero-${index}`}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-primary flex flex-col items-center justify-center p-4 border border-primary-dark"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <div className="text-center">
                        <p className="text-[8px] font-bold text-gold uppercase tracking-widest mb-1">Découvrir</p>
                        <p className="text-xs font-medium text-white">INCANA</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- Mobile Hero Component (Static, simplified) ---
function MobileHero() {
    return (
        <div className="relative w-full h-full bg-[#FAFAFA] overflow-hidden">
            {/* Background image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/etude-hero.png"
                    alt="L'étude notariale"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Overlay sombre */}
                <div className="absolute inset-0 bg-gradient-to-b from-text-primary/60 via-text-primary/50 to-text-primary/70" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
                {/* Eyebrow */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-center justify-center gap-3 mb-4"
                >
                    <span className="h-px w-8 bg-gold" />
                    <span className="text-gold text-xs uppercase tracking-[0.2em] font-medium">
                        L'Étude
                    </span>
                    <span className="h-px w-8 bg-gold" />
                </motion.div>

                {/* H1 */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="font-serif text-3xl text-white mb-4 leading-tight"
                >
                    Notre expertise<br />à votre service
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-white/80 text-sm mb-3 max-w-xs leading-relaxed"
                >
                    Immobilier, famille, succession et entreprise.
                    Une équipe de notaires expérimentés vous accompagne.
                </motion.p>

                {/* Quote */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-gold italic text-sm mb-8"
                >
                    « Nos clients ne sont jamais de simples numéros. »
                </motion.p>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <Button
                        asChild
                        size="lg"
                        className="bg-gold hover:bg-gold-light text-text-primary px-6 py-5 text-sm transition-all duration-300"
                    >
                        <Link href="/contact">
                            <Phone className="w-4 h-4 mr-2" />
                            Nous contacter
                        </Link>
                    </Button>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <ArrowDown className="w-5 h-5 text-gold" />
                    </motion.div>
                </motion.div>
            </div>

            {/* Decorative circles */}
            <div className="absolute top-[15%] left-[5%] w-16 h-16 pointer-events-none">
                <div className="absolute inset-0 rounded-full bg-gold/15" />
                <motion.div
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-0 rounded-full border-2 border-gold"
                />
            </div>
            <div className="absolute top-[10%] right-[8%] w-12 h-12 pointer-events-none">
                <div className="absolute inset-0 rounded-full bg-gold/10" />
                <motion.div
                    animate={{ opacity: [0.4, 0.9, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    className="absolute inset-0 rounded-full border-2 border-gold"
                />
            </div>
        </div>
    );
}

// --- Main Hero Component ---
const TOTAL_IMAGES = 20;
const MAX_SCROLL = 3000; // Virtual scroll range

// Images thématiques pour l'étude notariale - immobilier, famille, entreprise, La Réunion
const IMAGES = [
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&q=80", // Maison moderne
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&q=80", // Bureau
    "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=300&q=80", // Famille
    "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=300&q=80", // Immeuble entreprise
    "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=300&q=80", // Villa
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&q=80", // Documents business
    "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=300&q=80", // Famille heureuse
    "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=300&q=80", // Bureau moderne
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&q=80", // Maison luxueuse
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80", // Portrait professionnel
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&q=80", // Villa extérieur
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&q=80", // Groupe famille
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&q=80", // Architecture
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&q=80", // Intérieur maison
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&q=80", // Femme pro
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=300&q=80", // Maison piscine
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=300&q=80", // Poignée de main
    "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=300&q=80", // Appartement moderne
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80", // Portrait femme business
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=300&q=80", // Maison avec jardin
];

// Helper for linear interpolation
const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export default function IntroAnimation() {
    const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // --- Auto Rotation State ---
    const [autoRotate, setAutoRotate] = useState(true);
    const autoRotateAngle = useMotionValue(0);
    const [autoRotateValue, setAutoRotateValue] = useState(0);

    // --- Container Size ---
    useEffect(() => {
        if (!containerRef.current) return;

        const handleResize = (entries: ResizeObserverEntry[]) => {
            for (const entry of entries) {
                setContainerSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        };

        const observer = new ResizeObserver(handleResize);
        observer.observe(containerRef.current);

        // Initial set
        setContainerSize({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight,
        });

        return () => observer.disconnect();
    }, []);

    // --- Virtual Scroll Logic ---
    const virtualScroll = useMotionValue(0);
    const scrollRef = useRef(0); // Keep track of scroll value without re-renders

    // Track if animation is complete to allow normal page scroll
    const [animationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            // Stopper la rotation auto au premier scroll vers le bas
            if (autoRotate && e.deltaY > 0) {
                setAutoRotate(false);
            }

            // If animation is complete and scrolling down, allow normal scroll
            if (animationComplete && e.deltaY > 0) {
                return; // Don't prevent default, let the page scroll
            }

            // If scrolling up and at the top, allow normal scroll
            if (scrollRef.current === 0 && e.deltaY < 0) {
                return;
            }

            // Prevent default to stop browser overscroll/bounce during animation
            e.preventDefault();

            const newScroll = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);

            // Mark animation as complete when reaching the end
            if (newScroll >= MAX_SCROLL - 100) {
                setAnimationComplete(true);
            } else {
                setAnimationComplete(false);
            }
        };

        // Touch support
        let touchStartY = 0;
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };
        const handleTouchMove = (e: TouchEvent) => {
            const touchY = e.touches[0].clientY;
            const deltaY = touchStartY - touchY;
            touchStartY = touchY;

            // Stopper la rotation auto au premier scroll vers le bas
            if (autoRotate && deltaY > 0) {
                setAutoRotate(false);
            }

            // If animation is complete and scrolling down, allow normal scroll
            if (animationComplete && deltaY > 0) {
                return;
            }

            // If scrolling up and at the top, allow normal scroll
            if (scrollRef.current === 0 && deltaY < 0) {
                return;
            }

            e.preventDefault();

            const newScroll = Math.min(Math.max(scrollRef.current + deltaY, 0), MAX_SCROLL);
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);

            if (newScroll >= MAX_SCROLL - 100) {
                setAnimationComplete(true);
            } else {
                setAnimationComplete(false);
            }
        };

        // Attach listeners to container instead of window for portability
        container.addEventListener("wheel", handleWheel, { passive: false });
        container.addEventListener("touchstart", handleTouchStart, { passive: false });
        container.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            container.removeEventListener("wheel", handleWheel);
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
        };
    }, [virtualScroll, animationComplete, autoRotate]);

    // 1. Morph Progress: 0 (Circle) -> 1 (Bottom Arc)
    // Happens between scroll 0 and 600
    const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
    const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

    // 2. Scroll Rotation (Shuffling): Starts after morph (e.g., > 600)
    // Rotates the bottom arc as user continues scrolling
    const scrollRotate = useTransform(virtualScroll, [600, 3000], [0, 360]);
    const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

    // --- Mouse Parallax ---
    const mouseX = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const relativeX = e.clientX - rect.left;

            // Normalize -1 to 1
            const normalizedX = (relativeX / rect.width) * 2 - 1;
            // Move +/- 100px
            mouseX.set(normalizedX * 100);
        };
        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX]);

    // --- Intro Sequence ---
    useEffect(() => {
        const timer1 = setTimeout(() => setIntroPhase("line"), 500);
        const timer2 = setTimeout(() => setIntroPhase("circle"), 2500);
        return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }, []);

    // --- Auto Rotation Animation ---
    useEffect(() => {
        if (!autoRotate || introPhase !== "circle") return;

        let animationId: number;
        let lastTime = performance.now();

        const animate = (currentTime: number) => {
            const deltaTime = currentTime - lastTime;
            lastTime = currentTime;

            // Rotation de 20° par seconde
            const rotationSpeed = 20;
            const newAngle = autoRotateAngle.get() + (rotationSpeed * deltaTime / 1000);
            autoRotateAngle.set(newAngle % 360);

            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationId);
    }, [autoRotate, introPhase, autoRotateAngle]);

    // --- Random Scatter Positions ---
    const scatterPositions = useMemo(() => {
        return IMAGES.map(() => ({
            x: (Math.random() - 0.5) * 1500,
            y: (Math.random() - 0.5) * 1000,
            rotation: (Math.random() - 0.5) * 180,
            scale: 0.6,
            opacity: 0,
        }));
    }, []);

    // --- Render Loop (Manual Calculation for Morph) ---
    const [morphValue, setMorphValue] = useState(0);
    const [rotateValue, setRotateValue] = useState(0);
    const [parallaxValue, setParallaxValue] = useState(0);

    useEffect(() => {
        const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
        const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
        const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
        const unsubscribeAutoRotate = autoRotateAngle.on("change", setAutoRotateValue);
        return () => {
            unsubscribeMorph();
            unsubscribeRotate();
            unsubscribeParallax();
            unsubscribeAutoRotate();
        };
    }, [smoothMorph, smoothScrollRotate, smoothMouseX, autoRotateAngle]);

    // --- Content Opacity ---
    // Fade in content when arc is formed (morphValue > 0.8)
    const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
    const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

    // Render mobile version if on mobile
    if (isMobile) {
        return <MobileHero />;
    }

    return (
        <div ref={containerRef} className="relative w-full h-full bg-[#FAFAFA] overflow-hidden">
            {/* Background image + overlay - appears with content */}
            <motion.div
                style={{ opacity: contentOpacity }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="/images/etude-hero.png"
                    alt="L'étude notariale"
                    fill
                    className="object-cover"
                />
                {/* Overlay sombre */}
                <div className="absolute inset-0 bg-gradient-to-r from-text-primary/70 via-text-primary/50 to-text-primary/30" />
            </motion.div>

            {/* Container */}
            <div className="flex h-full w-full flex-col items-center justify-center perspective-1000">

                {/* Intro Text (Fades out) */}
                <div className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2">
                    <motion.h1
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 1 }}
                        className="font-serif text-2xl font-medium tracking-tight text-primary md:text-4xl"
                    >
                        Notre Étude
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 0.5 - morphValue } : { opacity: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="mt-4 text-xs font-bold tracking-[0.2em] text-text-muted"
                    >
                        DÉFILER POUR DÉCOUVRIR
                    </motion.p>
                </div>

                {/* Decorative circles with pulsing gold borders */}
                {/* Top left circle - large */}
                <motion.div
                    style={{ opacity: contentOpacity }}
                    className="absolute left-[3%] md:left-[8%] top-[10%] z-5 pointer-events-none"
                >
                    <div className="relative w-20 h-20 md:w-36 md:h-36">
                        <div className="absolute inset-0 rounded-full bg-gold/20" />
                        <motion.div
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute inset-0 rounded-full border-2 border-gold"
                        />
                    </div>
                </motion.div>

                {/* Top right circle - medium */}
                <motion.div
                    style={{ opacity: contentOpacity }}
                    className="absolute right-[5%] md:right-[12%] top-[8%] z-5 pointer-events-none"
                >
                    <div className="relative w-16 h-16 md:w-28 md:h-28">
                        <div className="absolute inset-0 rounded-full bg-gold/15" />
                        <motion.div
                            animate={{ opacity: [0.3, 0.9, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                            className="absolute inset-0 rounded-full border-2 border-gold"
                        />
                    </div>
                </motion.div>

                {/* Middle left circle - small */}
                <motion.div
                    style={{ opacity: contentOpacity }}
                    className="absolute left-[8%] md:left-[18%] top-[35%] z-5 pointer-events-none"
                >
                    <div className="relative w-12 h-12 md:w-20 md:h-20">
                        <div className="absolute inset-0 rounded-full bg-gold/18" />
                        <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                            className="absolute inset-0 rounded-full border-2 border-gold"
                        />
                    </div>
                </motion.div>

                {/* Middle right circle - large */}
                <motion.div
                    style={{ opacity: contentOpacity }}
                    className="absolute right-[2%] md:right-[6%] top-[30%] z-5 pointer-events-none"
                >
                    <div className="relative w-24 h-24 md:w-40 md:h-40">
                        <div className="absolute inset-0 rounded-full bg-gold/12" />
                        <motion.div
                            animate={{ opacity: [0.35, 0.85, 0.35] }}
                            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                            className="absolute inset-0 rounded-full border-2 border-gold"
                        />
                    </div>
                </motion.div>

                {/* Arc Active Content (Fades in) */}
                <motion.div
                    style={{ opacity: contentOpacity, y: contentY }}
                    className="absolute top-[30%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4"
                >
                    <h2 className="font-serif text-3xl md:text-5xl font-semibold text-white tracking-tight mb-4">
                        Notre expertise à votre service
                    </h2>
                    <p className="text-sm md:text-base text-white/80 max-w-lg leading-relaxed mb-3">
                        Une équipe dynamique afin de vous accompagner dans vos projets.
                    </p>
                    <p className="text-sm md:text-base text-gold italic max-w-md leading-relaxed">
                        « Chaque projet est unique »
                    </p>
                </motion.div>

                {/* Main Container */}
                <div className="relative flex items-center justify-center w-full h-full">
                    {IMAGES.slice(0, TOTAL_IMAGES).map((src, i) => {
                        let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

                        // 1. Intro Phases (Scatter -> Line)
                        if (introPhase === "scatter") {
                            target = scatterPositions[i];
                        } else if (introPhase === "line") {
                            const lineSpacing = 70; // Adjusted for smaller images (60px width + 10px gap)
                            const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
                            const lineX = i * lineSpacing - lineTotalWidth / 2;
                            target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
                        } else {
                            // 2. Circle Phase & Morph Logic

                            // Responsive Calculations
                            const isMobile = containerSize.width < 768;
                            const minDimension = Math.min(containerSize.width, containerSize.height);

                            // A. Calculate Circle Position
                            const circleRadius = Math.min(minDimension * 0.35, 350);

                            // Ajouter la rotation auto à l'angle de base
                            const baseAngle = (i / TOTAL_IMAGES) * 360;
                            const autoOffset = autoRotate ? autoRotateValue : 0;
                            const circleAngle = baseAngle + autoOffset;

                            const circleRad = (circleAngle * Math.PI) / 180;
                            const circlePos = {
                                x: Math.cos(circleRad) * circleRadius,
                                y: Math.sin(circleRad) * circleRadius,
                                rotation: circleAngle + 90,
                            };

                            // B. Calculate Bottom Arc Position
                            // "Rainbow" Arch: Convex up. Center is highest point.

                            // Radius:
                            const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
                            const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);

                            // Position:
                            const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25);
                            const arcCenterY = arcApexY + arcRadius;

                            // Spread angle:
                            const spreadAngle = isMobile ? 100 : 130;
                            const startAngle = -90 - (spreadAngle / 2);
                            const step = spreadAngle / (TOTAL_IMAGES - 1);

                            // Apply Scroll Rotation (Shuffle) with Bounds
                            // We want to clamp rotation so images don't disappear.
                            // Map scroll range [600, 3000] to a limited rotation range.
                            // Range: [-spreadAngle/2, spreadAngle/2] keeps them roughly in view.
                            // We map 0 -> 1 (progress of scroll loop) to this range.

                            // Note: rotateValue comes from smoothScrollRotate which maps [600, 3000] -> [0, 360]
                            // We need to adjust that mapping in the hook above, OR adjust it here.
                            // Better to adjust it here relative to the spread.

                            // Let's interpret rotateValue (0 to 360) as a progress 0 to 1
                            const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);

                            // Calculate bounded rotation:
                            // Move from 0 (centered) to -spreadAngle (all the way left) or similar.
                            // Let's allow scrolling through the list.
                            // Total sweep needed to see all items if we start at one end?
                            // If we start centered, we can go +/- spreadAngle/2.

                            // User wants to "stop on the last image".
                            // Let's map scroll to: 0 -> -spreadAngle (shifts items left)
                            const maxRotation = spreadAngle * 0.8; // Don't go all the way, keep last item visible
                            const boundedRotation = -scrollProgress * maxRotation;

                            const currentArcAngle = startAngle + (i * step) + boundedRotation;
                            const arcRad = (currentArcAngle * Math.PI) / 180;

                            const arcPos = {
                                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                                rotation: currentArcAngle + 90,
                                scale: isMobile ? 1.4 : 1.8, // Increased scale for active state
                            };

                            // C. Interpolate (Morph)
                            target = {
                                x: lerp(circlePos.x, arcPos.x, morphValue),
                                y: lerp(circlePos.y, arcPos.y, morphValue),
                                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                                scale: lerp(1, arcPos.scale, morphValue),
                                opacity: 1,
                            };
                        }

                        return (
                            <FlipCard
                                key={i}
                                src={src}
                                index={i}
                                total={TOTAL_IMAGES}
                                phase={introPhase} // Pass intro phase for initial animations
                                target={target}
                            />
                        );
                    })}
                </div>

                {/* Scroll indicator when animation is complete */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: animationComplete ? 1 : 0 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
                >
                    <span className="text-xs font-bold tracking-[0.15em] text-text-muted">CONTINUER</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center pt-2"
                    >
                        <motion.div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
