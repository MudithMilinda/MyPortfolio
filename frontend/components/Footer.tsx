"use client";

import { useEffect, useRef, useState } from "react";
import { Geist } from "next/font/google";

// Resend's wordmark uses a rounded, geometric grotesk — Geist is the closest
// match available as a Google Font. Swap this for your preferred family.
const geist = Geist({ subsets: ["latin"], weight: ["700", "800", "900"] });

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mudith-milinda-8729aa273/",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/mudith_m_gallage/",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/gallage.mudith",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@mudithmilinda6233",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const CONTACT_ITEMS = [
  {
    label: "Address",
    lines: ["7/B Gallage Mawatha", "Poregedara, Padukka"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C7.86 2 4.5 5.36 4.5 9.5c0 5.5 6.5 11.5 7.05 12a.75.75 0 0 0 .9 0c.55-.5 7.05-6.5 7.05-12C19.5 5.36 16.14 2 12 2zm0 10.25a2.75 2.75 0 1 1 0-5.5 2.75 2.75 0 0 1 0 5.5z" />
      </svg>
    ),
  },
  {
    label: "Phone",
    lines: ["+94 70 287 7313"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z" />
      </svg>
    ),
  },
  {
    label: "Email",
    lines: ["mudithmilinda@gmail.com"],
    href: "mailto:mudithmilinda@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 5.5A1.5 1.5 0 0 1 3.5 4h17A1.5 1.5 0 0 1 22 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 18.5v-13zm2.2.5 7.24 5.68a.9.9 0 0 0 1.12 0L19.8 6H4.2zM20 8.1l-6.85 5.37a2.9 2.9 0 0 1-3.6 0L4 8.1V18h16V8.1z" />
      </svg>
    ),
  },
];

// Scroll-triggered reveal hook — fires once when the element enters the viewport.
// IMPORTANT: no negative rootMargin here. A negative bottom margin shrinks the
// effective viewport, and on short pages (footer already fully visible on load,
// nothing to scroll) the element can sit permanently inside that excluded zone
// and never register as "in view" — leaving it stuck at opacity-0 forever.
function useInView<T extends HTMLElement>(threshold = 0.1) {
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
      { threshold, rootMargin: "0px" }
    );

    observer.observe(el);

    // Fallback: if the element is already visible in the viewport at mount
    // time (common on short pages that don't need scrolling), reveal it
    // immediately instead of waiting on the observer.
    const rect = el.getBoundingClientRect();
    const alreadyVisible =
      rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom > 0;
    if (alreadyVisible) {
      setInView(true);
      observer.disconnect();
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export default function Footer() {
  const textRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState<{ x: number; y: number } | null>(null);

  const { ref: topRef, inView: topInView } = useInView<HTMLDivElement>();
  const { ref: nameRevealRef, inView: nameInView } = useInView<HTMLDivElement>(0.1);
  const { ref: bottomRef, inView: bottomInView } = useInView<HTMLDivElement>();

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = textRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  function handleMouseLeave() {
    setSpotlight(null);
  }

  // Resend's mark runs edge-to-edge and reads clearly even without hover —
  // pushed the size up and tightened tracking so short names like "MUDITH"
  // still fill the width the same way "Resend" does.
  const heroFontSize = "clamp(120px, 24vw, 320px)";

  return (
    <footer className="w-full border-t border-line bg-background text-foreground">
      {/* ── Contact details + about company ── */}
      <div
        ref={topRef}
        className={`mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-16 transition-all duration-700 ease-out sm:grid-cols-2 lg:px-16 ${topInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
      >
        {/* Left: contact list */}
        <ul className="flex flex-col gap-7">
          {CONTACT_ITEMS.map((item) => (
            <li key={item.label} className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-foreground">
                {item.icon}
              </span>
              <div className="flex flex-col gap-0.5 text-[15px] leading-snug">
                {item.lines.map((line, i) => {
                  const isLast = i === item.lines.length - 1;
                  const isEmphasized = item.lines.length === 1 || isLast;
                  if (item.href && isLast) {
                    return (
                      <a
                        key={line}
                        href={item.href}
                        className="font-bold text-plasma-pink transition-colors hover:text-plasma-violet"
                      >
                        {line}
                      </a>
                    );
                  }
                  return (
                    <span
                      key={line}
                      className={isEmphasized ? "font-bold text-foreground" : "text-foreground/90"}
                    >
                      {line}
                    </span>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>

        {/* Right: about company */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[19px] font-bold text-foreground">About the company</h3>
          <p className="max-w-md text-[15px] leading-relaxed text-muted">
            &quot;I build systems that think, scale, and connect — from code to intelligent automation.&quot;
          </p>
          <div className="mt-2 flex items-center gap-3">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-foreground transition-colors hover:bg-white/15"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Big name, Resend-style: embossed letters that sink into black, ── */}
      {/* ── with a glowing outline that follows the cursor ── */}
      <div
        ref={(node) => {
          textRef.current = node;
          nameRevealRef.current = node;
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative w-full cursor-default select-none overflow-hidden py-6 transition-all duration-700 ease-out ${nameInView ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
          }`}
        style={{
          maskImage: "linear-gradient(to bottom, black 60%, transparent 98%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 98%)",
        }}
        aria-hidden="true"
      >
        {/* Base layer — embossed letterforms, clearly legible at rest with a
            soft top-light gradient, the way Resend's mark reads before hover */}
        <p
          className={`${geist.className} m-0 text-center font-black leading-none`}
          style={{
            fontSize: heroFontSize,
            letterSpacing: "-0.04em",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.14)",
            backgroundImage:
              "linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.03) 75%, rgba(255,255,255,0) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          MUDITH
        </p>

        {/* Spotlight layer — a bright, glowing outline revealed only inside a
            small radius around the cursor, like light catching an edge */}
        {spotlight && (
          <p
            className={`${geist.className} pointer-events-none absolute inset-0 m-0 text-center font-black leading-none`}
            style={{
              fontSize: heroFontSize,
              letterSpacing: "-0.04em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "transparent",
              WebkitTextStroke: "1.25px rgba(255,255,255,0.95)",
              filter:
                "drop-shadow(0 0 6px rgba(255,255,255,0.55)) drop-shadow(0 0 22px rgba(167,139,250,0.35))",
              WebkitMaskImage: `radial-gradient(circle 220px at ${spotlight.x}px ${spotlight.y}px, black 0%, transparent 75%)`,
              maskImage: `radial-gradient(circle 220px at ${spotlight.x}px ${spotlight.y}px, black 0%, transparent 75%)`,
            }}
          >
            MUDITH
          </p>
        )}
      </div>



      {/* Dashed divider */}
      <div className="mx-auto max-w-6xl px-6 lg:px-16">
        <div className="h-px w-full border-t border-dashed border-line" />
      </div>

      {/* ── Bottom bar ── */}
      <div
        ref={bottomRef}
        style={{ transitionDelay: bottomInView ? "150ms" : "0ms" }}
        className={`mx-auto flex max-w-6xl flex-col-reverse items-center justify-between gap-4 px-6 py-6 transition-all duration-700 ease-out sm:flex-row lg:px-16 ${bottomInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
      >
        <p className="text-[13px] text-muted">
          © {new Date().getFullYear()} Mudith Milinda. All rights reserved.
        </p>

        <div className="flex items-center gap-5">
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-foreground"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}