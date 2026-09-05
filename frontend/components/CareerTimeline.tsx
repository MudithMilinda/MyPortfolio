"use client";

import { useEffect, useRef, useState } from "react";
import { Building2, GraduationCap } from "lucide-react";

type TimelineEntry = {
  period: string;
  type: "Experience" | "Education";
  title: string;
  organisation: string;
  description: string;
  current?: boolean;
};

const TIMELINE: TimelineEntry[] = [
  {
    period: "2023",
    type: "Education",
    title: "GCE Advanced Level – Mathematics Stream",
    organisation: "Dharmapala Vidyalaya, Pannipitiya",
    description:
      "Completed secondary education under the Mathematics stream, building the analytical foundation for further study in software engineering.",
  },
  {
    period: "2023 – 2024",
    type: "Education",
    title: "Diploma in English",
    organisation: "Esoft Metro Campus",
    description:
      "Completed a diploma programme focused on strengthening professional and academic English communication skills.",
  },
  {
    period: "2023 – 2026",
    type: "Education",
    title: "BSc (Hons) in Software Engineering",
    organisation: "NSBM Green University / University of Plymouth",
    description:
      "Graduated with a degree focused on full-stack web development — React.js, Next.js, Node.js, Express.js, and MongoDB — alongside REST API integration, cloud fundamentals (AWS), and modern DevOps workflows using Git, Docker, and CI/CD.",
  },
  {
    period: "JUN 2026 – PRESENT",
    type: "Experience",
    title: "Internship as a Software Engineer",
    organisation: "SoftVision IT Group (Pvt) Ltd",
    description:
      "Developed and enhanced web applications, mobile apps, and cloud solutions to improve performance and user experience.",
    current: true,
  },
];

// Scroll-triggered reveal hook — fires once when the element enters the viewport
function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export default function CareerTimeline() {
  const { ref: headingRef, inView: headingInView } = useInView<HTMLDivElement>();
  const { ref: lineRef, inView: lineInView } = useInView<HTMLDivElement>(0.05);

  return (
    <section
      id="experience"
      className="w-full bg-background px-6 py-12 text-foreground lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div
          ref={headingRef}
          className={`mb-8 text-center transition-all duration-700 ease-out ${headingInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
        >
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/70">
            MY JOURNEY
          </p>
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Career Timeline
          </h2>
        </div>

        {/* Timeline */}
        <div ref={lineRef} className="relative">
          {/* Center track line — desktop */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-line md:block" />
          {/* Center fill line — animates in as the timeline scrolls into view */}
          <div
            className={`absolute left-1/2 top-0 hidden w-px -translate-x-1/2 origin-top bg-foreground/70 transition-transform duration-[1400ms] ease-out md:block ${lineInView ? "scale-y-100" : "scale-y-0"
              }`}
            style={{ height: "100%" }}
          />

          {/* Left track line — mobile */}
          <div className="absolute left-[5px] top-0 h-full w-px bg-line md:hidden" />
          {/* Left fill line — mobile */}
          <div
            className={`absolute left-[5px] top-0 w-px origin-top bg-foreground/70 transition-transform duration-[1400ms] ease-out md:hidden ${lineInView ? "scale-y-100" : "scale-y-0"
              }`}
            style={{ height: "100%" }}
          />

          <div className="space-y-6 md:space-y-8">
            {TIMELINE.map((entry, index) => (
              <TimelineRow key={index} entry={entry} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineRow({ entry, index }: { entry: TimelineEntry; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${index * 100}ms` : "0ms" }}
      className={`relative flex gap-5 transition-all duration-700 ease-out md:grid md:grid-cols-[1fr_auto_1fr] md:gap-0 ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
    >
      {/* LEFT column (desktop) */}
      <div className={`hidden md:block ${isLeft ? "pr-6 text-right" : ""}`}>
        {isLeft && <EntryCard entry={entry} align="right" />}
      </div>

      {/* Dot */}
      <div className="relative z-10 mt-0.5 flex-shrink-0 md:mt-0.5 md:flex md:items-start md:justify-center">
        <span
          className={`flex h-3 w-3 items-center justify-center rounded-full border-2 bg-background transition-transform duration-500 ${entry.current ? "border-plasma-pink" : "border-plasma-blue"
            } ${inView ? "scale-100" : "scale-50"
            }`}
          style={{ transitionDelay: inView ? `${index * 100 + 200}ms` : "0ms" }}
        >
          <span className="h-1 w-1 rounded-full bg-foreground" />
        </span>
      </div>

      {/* RIGHT column (desktop) */}
      <div className={`hidden md:block ${!isLeft ? "pl-6" : ""}`}>
        {!isLeft && <EntryCard entry={entry} align="left" />}
      </div>

      {/* Mobile: single column */}
      <div className="flex-1 pb-1 md:hidden">
        <EntryCard entry={entry} align="left" />
      </div>
    </div>
  );
}

function EntryCard({
  entry,
  align,
}: {
  entry: TimelineEntry;
  align: "left" | "right";
}) {
  const isRight = align === "right";
  const accent = entry.current
    ? {
      text: "text-plasma-pink",
      border: "border-line",
      surface: "bg-foreground/5",
    }
    : {
      text: "text-foreground",
      border: "border-line",
      surface: "bg-foreground/5",
    };

  return (
    <div>
      {/* Badge row */}
      <div
        className={`mb-1.5 flex flex-wrap items-center gap-2 ${isRight ? "justify-end" : ""
          }`}
      >
        <span
          className={`rounded border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-foreground/80 ${accent.border} ${accent.surface}`}
        >
          {entry.period}
        </span>
        <span className="text-[10px] text-muted">• {entry.type}</span>
      </div>

      {/* Title */}
      <h3 className={`mb-1 text-[15px] font-bold leading-snug sm:text-base ${accent.text}`}>
        {entry.title}
      </h3>

      {/* Organisation */}
      <div
        className={`mb-1.5 flex items-center gap-1.5 text-[11px] text-muted ${isRight ? "justify-end" : ""
          }`}
      >
        {isRight ? (
          <>
            <span>{entry.organisation}</span>
            {entry.type === "Education" ? (
              <GraduationCap size={11} className="flex-shrink-0" />
            ) : (
              <Building2 size={11} className="flex-shrink-0" />
            )}
          </>
        ) : (
          <>
            {entry.type === "Education" ? (
              <GraduationCap size={11} className="flex-shrink-0" />
            ) : (
              <Building2 size={11} className="flex-shrink-0" />
            )}
            <span>{entry.organisation}</span>
          </>
        )}
      </div>

      {/* Description */}
      <p
        className={`max-w-md text-[12px] leading-relaxed text-muted ${isRight ? "ml-auto" : ""
          }`}
      >
        {entry.description}
      </p>
    </div>
  );
}