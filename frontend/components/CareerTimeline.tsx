"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";

type TimelineEntry = {
  period: string;
  title: string;
  organisation: string;
  type: "Experience" | "Education";
  description: string;
  skills: string[];
  current?: boolean;
};

const TIMELINE: TimelineEntry[] = [
  {
    period: "JUN 2026 — PRESENT",
    title: "Software Engineer Intern",
    organisation: "SoftVision IT Group (Pvt) Ltd",
    type: "Experience",
    description:
      "Developing and enhancing web applications, mobile apps, and cloud solutions with a focus on performance and user experience.",
    skills: ["React", "Next.js", "Node.js", "Cloud"],
    current: true,
  },
  {
    period: "2023 — 2026",
    title: "BSc (Hons) in Software Engineering",
    organisation: "NSBM Green University / University of Plymouth",
    type: "Education",
    description:
      "Focused on full-stack web development, REST API integration, cloud fundamentals, and modern DevOps workflows.",
    skills: ["React", "Next.js", "Express.js", "MongoDB", "Docker", "CI/CD"],
  },
  {
    period: "2023 — 2024",
    title: "Diploma in English",
    organisation: "Esoft Metro Campus",
    type: "Education",
    description:
      "Completed a diploma programme focused on strengthening professional and academic English communication skills.",
    skills: ["Communication", "Professional English"],
  },
  {
    period: "2023",
    title: "GCE Advanced Level — Mathematics Stream",
    organisation: "Dharmapala Vidyalaya, Pannipitiya",
    type: "Education",
    description:
      "Built a strong analytical foundation that led to further study in software engineering.",
    skills: ["Mathematics", "Analytical Thinking"],
  },
];

export default function CareerTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 72%", "end 58%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    mass: 0.35,
  });

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="w-full bg-background px-6 py-24 text-foreground lg:px-16 lg:py-32"
    >
      <div className="mx-auto grid max-w-[1280px] gap-16 md:items-start md:grid-cols-[minmax(0,1.22fr)_minmax(280px,0.78fr)] md:gap-12 lg:gap-20">
        <div className="order-1 md:order-2 md:sticky md:top-6 md:h-fit md:self-start">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-[clamp(3.5rem,5vw,5.5rem)] font-medium leading-[0.82] tracking-[-0.075em] text-foreground">
              MY
              <span className="block">JOURNEY.</span>
              <span className="font-signature mt-4 block whitespace-nowrap text-[clamp(3.5rem,5vw,5.25rem)] leading-[0.58] tracking-[-0.045em] text-plasma-violet">
                From learning to building.
              </span>
            </h2>
            <p className="mt-12 max-w-[390px] text-[15px] leading-relaxed text-muted">
              Explore my educational background, professional experience, and the milestones that have shaped my journey in software engineering.
            </p>
          </motion.div>
        </div>

        <div className="order-2 relative border-l border-line pl-8 sm:pl-10 md:order-1 md:border-l-0 md:border-r md:pl-0 md:pr-10">
          <motion.div
            aria-hidden="true"
            className="absolute inset-y-0 -left-px w-px origin-top bg-plasma-violet md:left-auto md:right-[-1px]"
            style={{ scaleY: progress }}
          />

          {TIMELINE.map((entry, index) => (
            <TimelineItem key={`${entry.period}-${entry.title}`} entry={entry} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ entry, index }: { entry: TimelineEntry; index: number }) {
  const itemRef = useRef<HTMLElement>(null);
  const isActive = useInView(itemRef, { amount: 0.45, margin: "0px 0px -15% 0px" });

  return (
    <motion.article
      ref={itemRef}
      initial={{ opacity: 0.18, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`relative pb-16 last:pb-0 transition-opacity duration-500 md:text-right ${isActive ? "opacity-100" : "opacity-45"}`}
    >
      <motion.span
        aria-hidden="true"
        animate={{
          scale: isActive ? 1 : 0.78,
          backgroundColor: isActive && entry.current ? "var(--plasma-violet)" : "var(--background)",
          borderColor: isActive ? "var(--plasma-violet)" : "var(--muted)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="absolute -left-[37px] top-1 h-3.5 w-3.5 rounded-full border-2 sm:-left-[45px] md:left-auto md:-right-[45px]"
      />

      <p className={`text-[10px] font-medium uppercase tracking-[0.22em] transition-colors duration-300 ${isActive ? "text-foreground" : "text-muted"}`}>
        {entry.period}
      </p>
      <h3 className={`mt-3 text-[clamp(1.55rem,2.7vw,3rem)] font-medium leading-[0.95] tracking-[-0.055em] transition-colors duration-300 ${isActive ? "text-foreground" : "text-foreground/65"}`}>
        {entry.title}
      </h3>
      <p className="mt-3 text-[15px] text-muted">
        <span className={isActive ? "font-medium text-foreground" : "font-medium text-foreground/70"}>{entry.organisation}</span>
        <span className="mx-2 text-plasma-violet">·</span>
        {entry.type}
      </p>
      <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-muted md:ml-auto">
        {entry.description}
      </p>
      <div className="mt-5 flex flex-wrap gap-2 md:justify-end">
        {entry.skills.map((skill) => (
          <span
            key={skill}
            className={`border px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${isActive ? "border-plasma-violet/50 text-foreground" : "border-line text-muted"}`}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
