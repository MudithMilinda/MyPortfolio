"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";

const CAPABILITIES = [
  { number: "01", label: "PRODUCT ENGINEERING", title: "PRODUCT\nENGINEERING", background: "PRODUCT ENGINEERING", description: "End-to-end web products, shaped from the first idea through launch and iteration.", details: ["NEXT.JS + REACT", "API INTEGRATION", "DEPLOYMENT"] },
  { number: "02", label: "FRONTEND ENGINEERING", title: "FRONTEND\nENGINEERING", background: "FRONTEND ENGINEERING", description: "Fast, responsive interfaces with deliberate interactions and a polished visual system.", details: ["REACT + NEXT.JS", "TAILWIND CSS", "RESPONSIVE UI"] },
  { number: "03", label: "BACKEND ENGINEERING", title: "BACKEND\nENGINEERING", background: "BACKEND ENGINEERING", description: "Clear, dependable APIs and services designed to support products as they grow.", details: ["NODE + EXPRESS", "REST APIS", "DATABASES"] },
  { number: "04", label: "MOBILE APPLICATIONS", title: "MOBILE\nAPPLICATIONS", background: "MOBILE APPLICATIONS", description: "Cross-platform mobile experiences that feel focused, useful, and easy to use.", details: ["FLUTTER", "FIREBASE", "MOBILE UI"] },
  { number: "05", label: "AI PRODUCT INTEGRATION", title: "AI PRODUCT\nINTEGRATION", background: "AI INTEGRATION", description: "Practical AI features and automated workflows that make digital products more capable.", details: ["AI AGENTS", "AUTOMATION", "API WORKFLOWS"] },
];

function CapabilityHeading({
  title,
  index,
  progress,
}: {
  title: string;
  index: number;
  progress: MotionValue<number>;
}) {
  const focus = index / (CAPABILITIES.length - 1);
  const start = index === 0 ? 0 : focus - 0.25;
  const end = index === CAPABILITIES.length - 1 ? 1 : focus + 0.25;
  const range = index === 0 ? [0, 0.125, end] : index === CAPABILITIES.length - 1 ? [start, 0.875, 1] : [start, focus, end];
  const right = useTransform(progress, range, [34, 0, -34]);
  const left = useTransform(progress, range, [-34, 0, 34]);

  return (
    <h2 className="text-[clamp(4.5rem,8.7vw,10rem)] font-semibold leading-[0.78] tracking-[-0.085em] text-foreground">
      {title.split("\n").map((line, lineIndex) => {
        const accent = lineIndex % 2 === 1;
        return (
          <motion.span
            key={line}
            style={{ x: accent ? left : right }}
            className={`relative block w-fit max-w-full ${accent ? "text-plasma-violet after:absolute after:inset-x-0 after:bottom-[0.13em] after:h-px after:bg-plasma-violet" : ""}`}
          >
            {line}
          </motion.span>
        );
      })}
    </h2>
  );
}

export default function WhatICanBuild() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  const smoothX = useSpring(x, { stiffness: 95, damping: 25, mass: 0.3 });

  return (
    <section id="capabilities" aria-label="What I can build" className="bg-[#080914] text-foreground">
      <div className="space-y-12 px-6 py-24 lg:hidden">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-plasma-pink">What I can build</p>
        {CAPABILITIES.map((capability) => (
          <article key={capability.number} className="border-t border-white/15 pt-5">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-plasma-violet">{capability.number} / {capability.label}</p>
            <h2 className="mt-7 whitespace-pre-line text-5xl font-semibold leading-[0.8] tracking-[-0.08em]">{capability.title}</h2>
            <p className="mt-6 leading-relaxed text-white/65">{capability.description}</p>
            <p className="mt-6 text-[9px] font-medium tracking-[0.15em] text-white/55">{capability.details.join(" · ")}</p>
          </article>
        ))}
      </div>

      <div ref={sectionRef} className="relative hidden lg:block" style={{ height: `${CAPABILITIES.length * 100}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div style={{ x: smoothX }} className="flex h-full w-[500%]">
            {CAPABILITIES.map((capability) => (
              <article key={capability.number} className="relative flex h-full w-1/5 shrink-0 overflow-hidden border-r border-white/10 px-14 py-12 xl:px-20">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_73%_46%,rgba(139,92,246,0.16),transparent_30rem)]" />
                <p className="pointer-events-none absolute left-8 top-[43%] w-max -translate-y-1/2 select-none text-[clamp(7rem,15vw,18rem)] font-semibold leading-none tracking-[-0.1em] text-white/[0.035]">{capability.background}</p>

                <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col">
                  <div className="flex items-center justify-between text-[9px] font-semibold tracking-[0.2em] text-white/55">
                    <span>WHAT I CAN BUILD</span>
                    <span>{capability.number} / {String(CAPABILITIES.length).padStart(2, "0")}</span>
                  </div>

                  <div className="my-auto max-w-4xl">
                    <div className="mb-5 flex items-center gap-4 text-[9px] font-semibold tracking-[0.2em] text-white/55">
                      <span>{capability.number}</span><span className="h-px w-16 bg-plasma-violet" /><span>{capability.label}</span>
                    </div>
                    <CapabilityHeading title={capability.title} index={CAPABILITIES.indexOf(capability)} progress={scrollYProgress} />
                    <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-white/65">{capability.description}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-6 border-t border-white/15 pt-5">
                    {capability.details.map((detail, detailIndex) => (
                      <div key={detail}>
                        <p className="text-[8px] font-semibold tracking-[0.18em] text-white/40">DETAIL {String(detailIndex + 1).padStart(2, "0")}</p>
                        <p className="mt-2 text-[10px] font-medium tracking-[0.12em] text-white/75">{detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </motion.div>

          <div className="absolute bottom-12 right-14 z-20 flex gap-2 xl:right-20" aria-hidden="true">
            {CAPABILITIES.map((capability, index) => <span key={capability.number} className={`h-1 rounded-full ${index === 0 ? "w-9 bg-plasma-violet" : "w-3 bg-white/30"}`} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
