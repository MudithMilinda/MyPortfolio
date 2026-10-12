"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, Pencil, X } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About Me", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Projects", href: "#featured-work" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];


const SOCIALS = [
  { label: "GitHub", href: "https://github.com/MudithMilinda", icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mudith-milinda-8729aa273/", icon: FaLinkedinIn },
];

export default function Sidebar() {
  const [active, setActive] = useState("Home");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const syncActiveSection = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const marker = window.innerHeight * 0.36;
        let current = NAV_ITEMS[0].label;
        let closestSectionTop = Number.NEGATIVE_INFINITY;

        for (const item of NAV_ITEMS) {
          const section = document.querySelector(item.href);
          const sectionTop = section?.getBoundingClientRect().top;
          if (
            sectionTop !== undefined &&
            sectionTop <= marker &&
            sectionTop > closestSectionTop
          ) {
            current = item.label;
            closestSectionTop = sectionTop;
          }
        }
        setActive(current);
      });
    };

    syncActiveSection();
    window.addEventListener("scroll", syncActiveSection, { passive: true });
    window.addEventListener("resize", syncActiveSection);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", syncActiveSection);
      window.removeEventListener("resize", syncActiveSection);
    };
  }, []);

  function handleNavigationClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    label: string
  ) {
    event.preventDefault();
    setActive(label);
    setMobileNavOpen(false);

    document.querySelector(href)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <aside className="sticky top-0 z-50 w-full shrink-0 border-b border-line bg-background lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:h-screen lg:w-[240px] lg:border-b-0 lg:border-r lg:px-6 lg:py-8 lg:overflow-y-auto">
      {/* Compact mobile navbar */}
      <div className="flex items-center justify-between px-5 py-4 lg:hidden">
        <a href="#home" onClick={(event) => handleNavigationClick(event, "#home", "Home")} className="flex items-center gap-3">
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

      {mobileNavOpen && (
        <nav className="border-t border-line px-5 py-4 lg:hidden">
          <ul className="grid grid-cols-2 gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.label;
              return (
                <li key={item.label}>
                  <a href={item.href} onClick={(event) => handleNavigationClick(event, item.href, item.label)} className={`flex items-center gap-2 px-3 py-2.5 text-[13px] transition-colors ${isActive ? "bg-plasma-pink/10 font-semibold text-plasma-pink" : "text-muted"}`}>
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

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
