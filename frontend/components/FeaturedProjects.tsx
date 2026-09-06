"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// NOTE: image paths below assume files exist in /public/images/.
// Rename these to match your actual filenames if different.
const PROJECTS = [
  {
    title: "Plan In",
    description:
      "A planning and scheduling platform designed to keep teams organized, with a clean, modern interface built for daily use.",
    image: "/images/planin1.png",
    href: "https://planin.space/",
  },
  {
    title: "Veltexo",
    description:
      "A polished business web presence combining modern design with fast, reliable performance across every device.",
    image: "/images/veltexo.png",
    href: "https://www.veltexo.com/",
  },
  {
    title: "QuickMail",
    description:
      "A streamlined email tool built for speed — composing, sending, and managing messages without the usual clutter.",
    image: "/images/quickmail.png",
    href: "https://quickmail-five.vercel.app/",
  },
  {
    title: "JOBALIGN",
    description:
      "An AI-powered career platform designed to analyze user CVs against target job markets, match relevant job openings, and streamline career optimization.",
    image:
      "/images/jobalign.png",
    href: "https://jobalign-indol.vercel.app/",
  },
  {
    title: "Mobile Habit Tracker",
    description:
      "Cross-platform mobile application helping users build better habits with gamification, progress tracking, and social sharing.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80",
    href: "#",
  },
];

const CornerPlusIcons = () => (
  <>
    <PlusIcon className="absolute -top-3 -left-3 z-20" delay={0} />
    <PlusIcon className="absolute -top-3 -right-3 z-20" delay={0.05} />
    <PlusIcon className="absolute -bottom-3 -left-3 z-20" delay={0.1} />
    <PlusIcon className="absolute -bottom-3 -right-3 z-20" delay={0.15} />
  </>
);

const PlusIcon = ({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    strokeWidth="1"
    stroke="currentColor"
    variants={{
      rest: { rotate: 0, scale: 1, opacity: 0.6 },
      hover: {
        rotate: 90,
        scale: 1.15,
        opacity: 1,
        transition: { duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] },
      },
    }}
    className={`text-line size-6 group-hover:text-plasma-pink ${className}`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
  </motion.svg>
);

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// Image that moves at a different speed than its card as the page scrolls,
// creating a parallax effect while the section passes through the viewport.
const ParallaxImage: React.FC<{ src: string; alt: string }> = ({
  src,
  alt,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"],
  });

  // Image shifts vertically within its frame as the card travels through the viewport
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <div ref={wrapperRef} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-[-12%]">
        <motion.div
          variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-full w-full"
        >
          <Image src={src} alt={alt} fill className="object-cover" />
        </motion.div>
      </motion.div>
    </div>
  );
};

const ProjectCard: React.FC<{
  className?: string;
  title: string;
  description: string;
  image?: string;
  href?: string;
  index: number;
}> = ({ className = "", title, description, image, href = "#", index }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={cardVariants}
      transition={{ delay: index * 0.08 }}
      animate="rest"
      whileHover="hover"
      className={cn(
        "group relative border border-dashed border-line bg-background min-h-[300px]",
        "flex flex-col transition-colors hover:border-plasma-violet/60",
        className
      )}
    >
      <Link
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="flex h-full flex-col"
      >
        <CornerPlusIcons />

        {/* Image Section */}
        {image && (
          <div className="relative w-full flex-1 min-h-[160px] overflow-hidden border-b border-dashed border-line">
            <div className="absolute inset-0 bg-background/30 group-hover:bg-transparent transition-colors z-10 duration-500" />
            <ParallaxImage src={image} alt={title} />
          </div>
        )}

        {/* Content Section */}
        <div className="relative z-10 flex flex-col justify-end p-6 bg-background">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-plasma-pink">
              {title}
            </h3>
            <motion.span
              variants={{
                rest: { opacity: 0, x: -8, rotate: -45 },
                hover: { opacity: 1, x: 0, rotate: 0 },
              }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="shrink-0 text-plasma-violet"
            >
              <ArrowUpRight size={20} strokeWidth={1.75} />
            </motion.span>
          </div>
          <p className="mt-2 text-[15px] text-muted leading-relaxed">
            {description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Footer heading drifts up and sharpens into focus as the section scrolls through view
  const footerY = useTransform(scrollYProgress, [0.4, 0.85], [60, 0]);
  const footerOpacity = useTransform(scrollYProgress, [0.4, 0.75], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="featured-work"
      className="bg-background py-24 px-6 lg:px-16 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Responsive Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 auto-rows-auto gap-4">
          <ProjectCard index={0} {...PROJECTS[0]} className="lg:col-span-3 lg:row-span-2" />
          <ProjectCard index={1} {...PROJECTS[1]} className="lg:col-span-2 lg:row-span-2" />
          <ProjectCard index={2} {...PROJECTS[2]} className="lg:col-span-4 lg:row-span-1" />
          <ProjectCard index={3} {...PROJECTS[3]} className="lg:col-span-2 lg:row-span-1" />
          <ProjectCard index={4} {...PROJECTS[4]} className="lg:col-span-2 lg:row-span-1" />
        </div>

        {/* Section Footer Heading (Bottom Right) — animates in as you scroll past the grid */}
        <motion.div
          style={{ y: footerY, opacity: footerOpacity }}
          className="max-w-2xl ml-auto text-right mt-10 lg:-mt-32 px-4 relative z-10 pointer-events-none"
        >
          <h2 className="text-4xl md:text-6xl font-bold font-display tracking-tight text-foreground mb-4">
            Built for performance.<br />Designed for flexibility.
          </h2>
          <p className="text-muted text-lg">
            Showcasing systems, applications, and tools I&apos;ve built. Combining beautiful UI with robust functionality to deliver seamless user experiences.
          </p>
        </motion.div>
      </div>
    </section>
  );
}