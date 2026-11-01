"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Menu, Pencil, X } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";

const NAV_ITEMS = [
  { label: "HOME", href: "#home" },
  { label: "SERVICES", href: "#expertise" },
  { label: "ABOUT ME", href: "#about" },
  { label: "TECH STACK", href: "#tech-stack" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "PROJECTS", href: "#featured-work" },
  { label: "CONTACT ME", href: "#contact" },
];


const SOCIALS = [
  { label: "GitHub", href: "https://github.com/MudithMilinda", icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mudith-milinda-8729aa273/", icon: FaLinkedinIn },
];

export default function Sidebar() {
  const [active, setActive] = useState("HOME");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const isNavigatingRef = useRef(false);
  const navigationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => ({
      ...item,
      element: document.getElementById(item.href.slice(1)),
    })).filter((item): item is (typeof NAV_ITEMS)[number] & { element: HTMLElement } => Boolean(item.element));

    let animationFrame = 0;
    const syncActiveSection = () => {
      animationFrame = 0;
      if (isNavigatingRef.current) return;

      const marker = window.innerHeight * 0.4;
      let current = sections[0];
      let closestPastSection = -Infinity;

      for (const section of sections) {
        const top = section.element.getBoundingClientRect().top;
        if (top <= marker && top > closestPastSection) {
          current = section;
          closestPastSection = top;
        }
      }

      if (current) {
        setActive((previous) =>
          previous === current.label ? previous : current.label
        );
      }
    };

    const requestSync = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(syncActiveSection);
    };

    syncActiveSection();
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);

    return () => {
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      if (navigationTimeoutRef.current) clearTimeout(navigationTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!pendingNavigation) return;

    const target = document.getElementById(pendingNavigation.slice(1));
    if (!target) {
      setPendingNavigation(null);
      return;
    }

    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    const headerOffset = isMobile ? 70 : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({ top, behavior: "smooth" });
    window.history.pushState(null, "", pendingNavigation);
    setPendingNavigation(null);
  }, [pendingNavigation]);

  useEffect(() => {
    const closeMobileNavigation = () => setMobileNavOpen(false);
    window.addEventListener("hashchange", closeMobileNavigation);

    return () => window.removeEventListener("hashchange", closeMobileNavigation);
  }, []);

  function handleNavigationClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    label: string
  ) {
    event.preventDefault();
    const target = document.getElementById(href.slice(1));
    if (!target) return;

    isNavigatingRef.current = true;
    setActive(label);
    setMobileNavOpen(false);
    setPendingNavigation(href);

    if (navigationTimeoutRef.current) clearTimeout(navigationTimeoutRef.current);
    navigationTimeoutRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 800);
  }

  return (
    <aside className="sticky top-0 z-50 w-full shrink-0 border-b border-line bg-background lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:h-screen lg:w-[240px] lg:border-b-0 lg:border-r lg:px-6 lg:py-8 lg:overflow-y-auto">
      {/* Compact mobile navbar */}
      <div className="flex items-center justify-between px-5 py-4 lg:hidden">
        <a href="#home" className="flex items-center gap-3">
          <div className="relative h-9 w-9 overflow-hidden rounded-full bg-line">
            <Image src="/images/heroimg.png" alt="Mudith Milinda" fill sizes="36px" className="object-cover" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold leading-tight text-ink">Mudith Milinda</p>
            <p className="mt-0.5 text-[10px] text-muted">Software Engineer</p>
          </div>
        </a>
        <button type="button" onClick={() => setMobileNavOpen((open) => !open)} aria-label="Toggle navigation" aria-expanded={mobileNavOpen} className="flex h-9 w-9 items-center justify-center border border-line text-foreground">
          {mobileNavOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {mobileNavOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0, y: -12 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full z-50 overflow-hidden border-t border-line bg-background shadow-xl shadow-black/20 lg:hidden"
          >
            <ul className="grid grid-cols-2 gap-1 px-5 py-4">
              {NAV_ITEMS.map((item, index) => {
                const isActive = active === item.label;
                return (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, delay: index * 0.035 }}
                  >
                    <a href={item.href} className={`flex items-center gap-2 px-3 py-2.5 text-[13px] transition-colors ${isActive ? "bg-plasma-pink/10 font-semibold text-plasma-pink" : "text-muted"}`}>
                      {item.label}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Profile */}
      <div className="motion-reveal mb-8 hidden lg:block">
        <div className="relative mb-4 h-11 w-11 overflow-hidden rounded-full bg-line">
          <Image
            src="/images/heroimg.png"
            alt="Mudith Milinda"
            fill
            sizes="44px"
            className="object-cover"
          />
        </div>
        <h1 className="mt-2 font-body text-[19px] font-bold leading-tight text-ink">
          Mudith Milinda
        </h1>
        <p className="text-[13px] leading-snug text-muted">
          Software Engineer
        </p>

        <p className="mt-3 text-[12px] leading-snug text-muted">
          Intern at SoftVision IT Group
        </p>
      </div>

      <div className="hidden h-px w-full bg-line lg:block" />

      {/* Navigation */}
      <nav className="motion-reveal motion-delay-1 my-6 hidden lg:block">
        <ul className="space-y-[2px]">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.label;
            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={(event) =>
                    handleNavigationClick(event, item.href, item.label)
                  }
                  className={`flex items-center gap-2 rounded-md px-2 py-[7px] text-[14px] transition-all duration-300 ease-out ${isActive
                    ? "bg-plasma-pink/10 font-semibold text-plasma-pink"
                    : "text-muted hover:text-foreground"
                    }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-dot"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                      className="h-1.5 w-1.5 rounded-full bg-plasma-pink"
                    />
                  )}
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="hidden h-px w-full bg-line lg:block" />


      {/* Connect With */}
      <div className="motion-reveal motion-delay-2 mt-8 hidden lg:block">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[13px] font-medium text-ink">Connect With</span>
          <Pencil size={13} className="text-muted" />
        </div>
        <div className="flex items-center gap-3">
          {SOCIALS.map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink/70 transition-colors hover:text-ink"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
