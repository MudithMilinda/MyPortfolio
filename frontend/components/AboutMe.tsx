"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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

export default function AboutPage() {
    const { ref, inView } = useInView<HTMLDivElement>();

    return (
        <main className="bg-background text-foreground">
            {/* Hero / intro block matching the reference image layout */}
            <section
                id="about"
                className="flex w-full items-center justify-center overflow-hidden px-6 py-24 lg:min-h-[620px] lg:px-16 lg:py-28"
            >
                <div className="w-full max-w-6xl">
                    <div
                        ref={ref}
                        className={`relative grid transition-all duration-700 ease-out lg:grid-cols-[255px_1fr] ${inView
                                ? "translate-y-0 opacity-100"
                                : "translate-y-10 opacity-0"
                            }`}
                    >
                        {/* Left Side: Image container matching the grid/plus borders */}
                        <div
                            style={{ transitionDelay: inView ? "120ms" : "0ms" }}
                            className={`relative aspect-square border border-line transition-all duration-700 ease-out lg:aspect-auto lg:min-h-[390px] ${inView
                                    ? "scale-100 opacity-100"
                                    : "scale-95 opacity-0"
                                }`}
                        >
                            {/* Extending fading lines - Top */}
                            <div className="absolute right-full top-[-1px] h-[1px] w-[50vw] bg-gradient-to-l from-line to-transparent" />
                            <div className="absolute left-full top-[-1px] h-[1px] w-[50vw] bg-gradient-to-r from-line to-transparent z-0" />

                            {/* Extending fading lines - Bottom */}
                            <div className="absolute right-full bottom-[-1px] h-[1px] w-[50vw] bg-gradient-to-l from-line to-transparent" />
                            <div className="absolute left-full bottom-[-1px] h-[1px] w-[50vw] bg-gradient-to-r from-line to-transparent z-0" />

                            {/* Extending fading lines - Left */}
                            <div className="absolute bottom-full left-[-1px] w-[1px] h-[50vh] bg-gradient-to-t from-line to-transparent" />
                            <div className="absolute top-full left-[-1px] w-[1px] h-[50vh] bg-gradient-to-b from-line to-transparent" />

                            {/* Extending fading lines - Right */}
                            <div className="absolute bottom-full right-[-1px] w-[1px] h-[50vh] bg-gradient-to-t from-line to-transparent" />
                            <div className="absolute top-full right-[-1px] w-[1px] h-[50vh] bg-gradient-to-b from-line to-transparent" />

                            {/* Corner Plus Markers */}
                            <PlusCorner className="left-0 top-0" />
                            <PlusCorner className="right-0 top-0" />
                            <PlusCorner className="left-0 bottom-0" />
                            <PlusCorner className="right-0 bottom-0" />

                            <Image
                                src="/images/heroimg.png"
                                alt="Portrait of Mudith Milinda"
                                fill
                                sizes="(max-width: 1024px) 100vw, 255px"
                                className="object-cover relative z-10"
                            />
                        </div>

                        {/* Right Side: personal profile card */}
                        <div
                            style={{ transitionDelay: inView ? "260ms" : "0ms" }}
                            className={`relative z-10 flex min-h-[390px] flex-col px-8 py-10 transition-all duration-700 ease-out sm:px-12 lg:px-12 xl:px-16 ${inView
                                    ? "translate-x-0 opacity-100"
                                    : "translate-x-10 opacity-0"
                                }`}
                        >
                            <p className="text-[13px] font-medium uppercase tracking-[0.28em] text-muted">
                                ABOUT ME
                            </p>
                            <p className="mt-5 max-w-3xl text-[clamp(2rem,3vw,3.25rem)] font-normal leading-[1.08] tracking-[-0.055em] text-foreground">
                                &quot;I build systems that think, scale, and connect — from code to intelligent automation.&quot;
                            </p>
                            <div className="mt-6 max-w-3xl space-y-4 text-[15px] leading-relaxed text-muted sm:text-base">
                                <p>
                                    I&apos;m Mudith Milinda, a software engineer based in Sri Lanka. I build modern web applications and digital systems that balance thoughtful design, reliable engineering, and real-world usability.
                                </p>
                                <p>
                                    My work spans front-end interfaces, back-end services, APIs, and cloud-ready solutions. I care about clean code, maintainable systems, and products people enjoy using.
                                </p>
                            </div>

                            <div className="mt-8 grid border-t border-line pt-5 sm:grid-cols-2 sm:gap-x-8">
                                <div className="border-b border-line pb-5 sm:border-b-0">
                                    <p className="text-[9px] font-medium uppercase tracking-[0.24em] text-muted">Location</p>
                                    <p className="mt-2 text-[14px] font-medium text-foreground">Sri Lanka · Remote / Hybrid</p>
                                </div>
                                <div className="pt-5 sm:pt-0">
                                    <p className="text-[9px] font-medium uppercase tracking-[0.24em] text-muted">Current focus</p>
                                    <p className="mt-2 text-[14px] font-medium text-foreground">Full-stack development &amp; AI systems</p>
                                </div>
                                <div className="col-span-full mt-5 border-t border-line pt-5">
                                    <p className="text-[9px] font-medium uppercase tracking-[0.24em] text-muted">Interests</p>
                                    <p className="mt-2 text-[14px] font-medium text-foreground">Full-stack Development · UI/UX design · Cloud solutions · AI agentic</p>
                                </div>
                            </div>

                            <div className="mt-7 flex flex-wrap gap-3">
                                <a href="/Mudith%20Milinda.pdf" download className="border border-foreground bg-foreground px-4 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-background transition-colors hover:bg-transparent hover:text-foreground">Download CV ↓</a>
                                <a href="https://www.linkedin.com/in/mudith-milinda-8729aa273/" target="_blank" rel="noopener noreferrer" className="border border-line px-4 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground transition-colors hover:border-plasma-violet hover:text-plasma-violet">LinkedIn ↗</a>
                                <a href="https://github.com/MudithMilinda" target="_blank" rel="noopener noreferrer" className="border border-line px-4 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground transition-colors hover:border-plasma-violet hover:text-plasma-violet">GitHub ↗</a>
                                <a href="#contact" className="border border-line px-4 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground transition-colors hover:border-plasma-violet hover:text-plasma-violet">Contact ↗</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
