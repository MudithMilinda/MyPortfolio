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

                        {/* Right Side: Content block with "ABOUT ME", Quote, Name and Role */}
                        <div
                            style={{ transitionDelay: inView ? "260ms" : "0ms" }}
                            className={`flex min-h-[390px] relative z-10 flex-col justify-center px-8 py-12 transition-all duration-700 ease-out sm:px-12 lg:px-12 xl:px-16 ${inView
                                    ? "translate-x-0 opacity-100"
                                    : "translate-x-10 opacity-0"
                                }`}
                        >
                            <p className="text-[13px] font-medium uppercase tracking-[0.28em] text-muted">
                                ABOUT ME
                            </p>
                            <blockquote className="mt-6 max-w-3xl font-display text-3xl leading-[1.12] tracking-tight text-foreground sm:text-4xl xl:text-5xl">
                                &quot;I build systems that think, scale, and connect — from
                                code to intelligent automation.&quot;
                            </blockquote>
                            <div className="mt-10">
                                <p className="text-xl font-semibold text-foreground">
                                    G.Mudith Milinda
                                </p>
                                <p className="mt-1 text-[15px] text-muted">
                                    Full Stack Developer &amp; AI Systems Engineer
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}