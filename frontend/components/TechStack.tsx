"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import {
  SiJavascript,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiFlutter,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiSupabase,
  SiMysql,
  SiPostgresql,
  SiPostman,
  SiGit,
  SiGithub,
  SiFigma,
  SiDocker,
  SiVercel,
  SiRender,
  SiLinux,
  SiGooglecloud,
} from "react-icons/si";

function PlusCorner({ className }: { className: string }) {
  return (
    <span
      className={`pointer-events-none absolute z-10 flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-[14px] font-light leading-none text-line select-none ${className}`}
    >
      +
    </span>
  );
}

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

type Category = "frontend" | "backend" | "database";

type TechItem = {
  name: string;
  icon: typeof SiJavascript;
  category: Category;
  index: number;
  color: string;
};

const ALL_TECH_ITEMS: TechItem[] = [
  { name: "JavaScript", icon: SiJavascript, category: "frontend", index: 0, color: "#F7DF1E" },
  { name: "Python", icon: SiPython, category: "backend", index: 1, color: "#3776AB" },
  { name: "React.js", icon: SiReact, category: "frontend", index: 2, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, category: "frontend", index: 3, color: "#FFFFFF" },
  { name: "HTML", icon: SiHtml5, category: "frontend", index: 4, color: "#E34F26" },
  { name: "CSS", icon: SiCss, category: "frontend", index: 5, color: "#1572B6" },
  { name: "Tailwind CSS", icon: SiTailwindcss, category: "frontend", index: 6, color: "#06B6D4" },
  { name: "Flutter", icon: SiFlutter, category: "frontend", index: 7, color: "#02569B" },
  { name: "Node.js", icon: SiNodedotjs, category: "backend", index: 8, color: "#5FA04E" },
  { name: "Express.js", icon: SiExpress, category: "backend", index: 9, color: "#FFFFFF" },
  { name: "MongoDB", icon: SiMongodb, category: "database", index: 10, color: "#47A248" },
  { name: "Firebase", icon: SiFirebase, category: "database", index: 11, color: "#FFCA28" },
  { name: "Supabase", icon: SiSupabase, category: "database", index: 12, color: "#3ECF8E" },
  { name: "MySQL", icon: SiMysql, category: "database", index: 13, color: "#4479A1" },
  { name: "PostgreSQL", icon: SiPostgresql, category: "database", index: 14, color: "#4169E1" },
  { name: "Git", icon: SiGit, category: "backend", index: 15, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, category: "backend", index: 16, color: "#FFFFFF" },
  { name: "Figma", icon: SiFigma, category: "frontend", index: 17, color: "#F24E1E" },
  { name: "Docker", icon: SiDocker, category: "backend", index: 18, color: "#2496ED" },
  { name: "Vercel", icon: SiVercel, category: "backend", index: 19, color: "#FFFFFF" },
  { name: "Render", icon: SiRender, category: "backend", index: 20, color: "#46E3B7" },
  { name: "Linux", icon: SiLinux, category: "backend", index: 21, color: "#FCC624" },
  { name: "AWS", icon: SiGooglecloud, category: "backend", index: 22, color: "#FF9900" },
  { name: "Postman", icon: SiPostman, category: "backend", index: 23, color: "#FF6C37" },
];

const TABS: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "database", label: "Database" },
];

export default function TechStack() {
  const { ref: sectionRef, inView } = useInView<HTMLDivElement>();
  const [activeTab, setActiveTab] = useState<"all" | Category>("all");
  const [items, setItems] = useState<TechItem[]>(ALL_TECH_ITEMS);
  const [fade, setFade] = useState(true);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setFade(false);
    const timeout = setTimeout(() => {
      setItems(
        activeTab === "all"
          ? ALL_TECH_ITEMS
          : ALL_TECH_ITEMS.filter((item) => item.category === activeTab)
      );
      setFade(true);
    }, 180);
    return () => clearTimeout(timeout);
  }, [activeTab]);

  return (
    <section
      id="tech-stack"
      className="w-full bg-background px-6 py-20 text-foreground lg:px-16"
    >
      <div
        ref={sectionRef}
        className={`mx-auto max-w-6xl transition-all duration-700 ease-out ${inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
      >
        <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-muted">
          Tools &amp; Tech Stack
        </p>

        {/* Category tabs */}
        <div className="mb-10 flex items-center justify-center">
          <div className="inline-flex overflow-hidden rounded-full border border-line divide-x divide-line">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 text-[13px] font-medium transition-colors duration-300 ${activeTab === tab.id
                    ? "bg-foreground text-background"
                    : "text-muted hover:bg-zinc-900/50 hover:text-foreground"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative border-y border-line">
          <PlusCorner className="left-0 top-0" />
          <PlusCorner className="right-0 top-0 translate-x-1/2" />
          <PlusCorner className="bottom-0 left-0 translate-y-1/2" />
          <PlusCorner className="bottom-0 right-0 translate-x-1/2 translate-y-1/2" />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 border-x border-line divide-x divide-y divide-line">
            {items.map((tool, idx) => {
              const Icon = tool.icon;
              const duration = `${4.2 + (tool.index % 5) * 0.35}s`;
              const delay = `${(tool.index % 7) * 110}ms`;
              return (
                <div
                  key={tool.name}
                  style={{
                    transitionDelay: fade ? `${Math.min(idx * 30, 300)}ms` : "0ms",
                    "--tech-duration": duration,
                    "--tech-delay": delay,
                  } as CSSProperties}
                  className={`tech-tile group relative flex flex-col items-center gap-3 px-4 py-8 transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-900/50 ${fade ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                    }`}
                >
                  <PlusCorner className="left-0 top-0" />
                  <PlusCorner className="right-0 top-0 translate-x-1/2" />
                  <PlusCorner className="left-0 bottom-0 translate-y-1/2" />
                  <PlusCorner className="right-0 bottom-0 translate-x-1/2 translate-y-1/2" />

                  <Icon
                    className="tech-icon-drift h-6 w-6 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: tool.color }}
                  />
                  <span className="text-center text-[11px] font-medium text-muted transition-colors group-hover:text-foreground">
                    {tool.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}