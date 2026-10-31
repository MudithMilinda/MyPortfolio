"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ALL_PROJECTS, ProjectCard } from "@/components/FeaturedProjects";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 lg:px-16 lg:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <Link
          href="/"
          className="inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-muted transition-colors hover:text-plasma-violet"
        >
          <ArrowLeft size={14} strokeWidth={1.5} /> Back to home
        </Link>

        <div className="mt-16 border-b border-line pb-10">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-plasma-violet">
            Selected work · 2023 — present
          </p>
          <h1 className="mt-5 text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.85] tracking-[-0.075em] text-foreground">
            ALL PROJECTS
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted">
            A collection of products and tools designed to solve real problems.
          </p>
        </div>

        <section className="grid grid-cols-1 gap-4 pt-10 md:grid-cols-2">
          {ALL_PROJECTS.map((project, index) => (
            <ProjectCard key={project.title} index={index} {...project} />
          ))}
        </section>
      </div>
    </main>
  );
}
