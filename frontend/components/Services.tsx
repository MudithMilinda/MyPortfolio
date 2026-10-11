"use client";

import { useRef } from "react";
import { Code2, Bot, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";

const SERVICES = [
  {
    title: "Full Stack Development",
    description:
      "Building robust, scalable web applications from front-end interfaces to back-end architecture, using modern frameworks and best practices.",
    icon: Code2,
  },
  {
    title: "AI Agentic Systems",
    description:
      "Designing and developing intelligent AI-powered agents that automate workflows, make decisions, and integrate seamlessly into your business processes.",
    icon: Bot,
  },
  {
    title: "ERP System",
    description:
      "Developing enterprise resource planning solutions that streamline operations, connect departments, and give your business a single source of truth.",
    icon: Building2,
  },
];

function DecorIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute left-0 top-0 z-10 size-3.5 shrink-0 -translate-x-[calc(50%+0.5px)] -translate-y-[calc(50%+0.5px)] stroke-1 text-muted",
        className
      )}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

// Snappy spring used for the "pop" feel on hover
const popSpring = { type: "spring" as const, stiffness: 350, damping: 18, mass: 0.6 };

const cardHoverVariants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.045, y: -8, transition: popSpring },
};

const iconHoverVariants = {
  rest: { scale: 1, rotate: 0 },
  hover: { scale: 1.18, rotate: -8, transition: popSpring },
};

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 65%", "end 35%"],
  });

  // These values automatically reverse when the visitor scrolls back up.
  const moveRight = useTransform(scrollYProgress, [0, 0.35, 1], [0, 0, 300]);
  const moveLeft = useTransform(scrollYProgress, [0, 0.35, 1], [0, 0, -300]);

  return (
    <section
      ref={sectionRef}
      id="expertise"
      className="flex w-full items-center justify-center bg-background px-6 py-32 text-foreground lg:px-16"
    >
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-20 max-w-5xl text-left"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-plasma-pink">What I Do</p>
          <h2 className="mt-5 text-[clamp(2.8rem,4.8vw,5.5rem)] font-semibold leading-[0.82] tracking-[-0.075em] text-foreground">
            <motion.span style={{ x: moveRight }} className="block">I TURN</motion.span>
            <motion.span style={{ x: moveLeft }} className="relative block w-fit text-plasma-violet after:absolute after:inset-x-0 after:bottom-[0.12em] after:h-px after:bg-plasma-violet">
              COMPLEX PROBLEMS
            </motion.span>
            <motion.span style={{ x: moveRight }} className="block">INTO POWERFUL</motion.span>
            <motion.span style={{ x: moveLeft }} className="relative block w-fit text-plasma-violet after:absolute after:inset-x-0 after:bottom-[0.12em] after:h-px after:bg-plasma-violet">
              DIGITAL SOLUTIONS.
            </motion.span>
          </h2>
          <p className="mt-7 text-muted">
            End-to-end development services spanning full-stack web apps, intelligent AI agents, and ERP solutions built to power modern businesses.
          </p>
        </motion.div>

        <div className="mx-auto grid w-full max-w-5xl gap-12 pt-1 md:grid-cols-3 md:gap-8">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: index * 0.15 },
                  },
                }}
                animate="rest"
                whileHover="hover"
                className="relative"
              >
                <motion.div
                  variants={cardHoverVariants}
                  className={cn(
                    "group relative flex flex-col gap-6 px-8 pb-8 pt-10 shadow-none transition-shadow duration-300 md:translate-y-[calc(3rem*var(--t-card-index))]",
                    "bg-[radial-gradient(50%_80%_at_25%_0%,rgba(124,58,237,0.03),transparent)] hover:bg-[radial-gradient(50%_80%_at_25%_0%,rgba(124,58,237,0.1),transparent)]",
                    "hover:shadow-[0_18px_40px_-15px_rgba(124,58,237,0.35)]"
                  )}
                  style={
                    {
                      "--t-card-index": index,
                    } as React.CSSProperties
                  }
                >
                  {/* Border extensions */}
                  <div className="absolute -inset-y-4 -left-px w-px bg-line transition-colors group-hover:bg-plasma-violet/40" />
                  <div className="absolute -inset-y-4 -right-px w-px bg-line transition-colors group-hover:bg-plasma-violet/40" />
                  <div className="absolute -inset-x-4 -top-px h-px bg-line transition-colors group-hover:bg-plasma-violet/40" />
                  <div className="absolute -inset-x-4 -bottom-px h-px bg-line transition-colors group-hover:bg-plasma-violet/40" />

                  <DecorIcon className="transition-colors group-hover:text-plasma-pink/70" />
                  {/* Bottom right decor */}
                  <DecorIcon className="left-full top-full translate-x-[calc(-50%+0.5px)] translate-y-[calc(-50%+0.5px)] transition-colors group-hover:text-plasma-pink/70" />

                  <div className="relative z-10 flex flex-col gap-5">
                    <motion.div
                      variants={iconHoverVariants}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-background text-plasma-violet shadow-sm group-hover:border-plasma-pink/50 group-hover:shadow-plasma-pink/20"
                    >
                      <Icon size={20} strokeWidth={1.5} />
                    </motion.div>
                    <h3 className="font-display text-xl tracking-wide transition-colors group-hover:text-plasma-pink">
                      {service.title}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-muted">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
