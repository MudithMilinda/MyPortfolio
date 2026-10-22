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
    title: "Fixora",
    description:
      "A full-stack repair and inventory system for managing jobs, stock, suppliers, sales, warranties, payments, and business reports.",
    image: "/images/Fixora.png",
    href: "#",
  },
  {
    title: "Plan In",
    description:
      "A planning and scheduling platform designed to keep teams organized, with a clean, modern interface built for daily use.",
    image: "/images/planin.png",
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
];

const PROJECT_METADATA = [
  { category: "Full-stack / SaaS", tags: ["React", "TypeScript", "Express.js", "MySQL"] },
  { category: "Web / Product", tags: ["Next.js", "React", "Tailwind CSS"] },
  { category: "Web / Product", tags: ["Next.js", "React", "Responsive UI"] },
  { category: "Web / Tool", tags: ["Next.js", "TypeScript", "API"] },
  { category: "AI / Product", tags: ["Next.js", "AI", "REST APIs"] },
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
  const meta = PROJECT_METADATA[index];

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
        "group relative min-h-[440px] self-start border border-line bg-background",
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
          <div className="relative w-full flex-1 min-h-[230px] overflow-hidden border-b border-line">
            <div className="absolute inset-0 bg-background/30 group-hover:bg-transparent transition-colors z-10 duration-500" />
            <ParallaxImage src={image} alt={title} />
          </div>
        )}
        {/* Content Section */}
        <div className="relative z-10 flex flex-1 flex-col p-6">
          <div className="flex items-center justify-between text-[9px] font-medium uppercase tracking-[0.2em] text-muted">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span>{meta.category}</span>
          </div>
          <h3 className="mt-7 text-[clamp(1.8rem,3vw,3rem)] font-semibold leading-none tracking-[-0.06em] text-foreground transition-colors group-hover:text-plasma-violet">
            {title}
          </h3>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
            {description}
          </p>
          <div className="mt-auto flex items-end justify-between gap-4 pt-7">
            <div className="flex flex-wrap gap-2">
              {meta.tags.map((tag) => (
                <span key={tag} className="border border-plasma-violet/45 px-2 py-1 text-[8px] font-medium uppercase tracking-[0.16em] text-muted">
                  {tag}
                </span>
              ))}
            </div>
            <motion.span
              variants={{ rest: { rotate: 0 }, hover: { rotate: 45 } }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-foreground text-foreground transition-colors group-hover:border-plasma-violet group-hover:text-plasma-violet"
            >
              <ArrowUpRight size={18} strokeWidth={1.5} />
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function FeaturedProjects() {
  return (
    <section
      id="featured-work"
      className="bg-background py-24 px-6 lg:px-16 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-[420px] max-w-[580px] flex-col justify-start pt-8 lg:col-span-3 lg:pr-10"
          >
            <h2 className="text-[clamp(3rem,4.7vw,5rem)] font-medium leading-[0.82] tracking-[-0.075em] text-foreground">
              <span className="block whitespace-nowrap">THINGS</span>
              <span className="ml-[1.5ch] mt-2 block whitespace-nowrap">I&apos;VE</span>
              <span className="font-signature ml-[2.5ch] mt-5 block whitespace-nowrap text-[clamp(4.2rem,6.7vw,7rem)] leading-[0.55] tracking-[-0.045em] text-plasma-violet">
                Built.
              </span>
            </h2>
            <p className="mt-4 max-w-[390px] text-[15px] leading-relaxed text-muted">
              A selection of thoughtful digital products, built to solve real problems and scale with purpose.
            </p>
            <div className="mt-auto max-w-[390px] border-t border-line pt-5">
              <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-plasma-violet">
                Selected work · 2023 — present
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-muted">
                From early ideas to live products, each project brings together clear design, reliable engineering, and real user needs.
              </p>
            </div>
          </motion.div>

          <ProjectCard index={0} {...PROJECTS[0]} className="lg:col-span-3 lg:mt-24" />
          <ProjectCard index={1} {...PROJECTS[1]} className="lg:col-span-4" />
          <ProjectCard index={2} {...PROJECTS[2]} className="lg:col-span-2" />
          <ProjectCard index={3} {...PROJECTS[3]} className="lg:col-span-3" />
          <ProjectCard index={4} {...PROJECTS[4]} className="lg:col-span-3" />
        </div>
      </div>
    </section>
  );
}
