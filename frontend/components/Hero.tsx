import Image from "next/image";
import { Feather, ArrowUpRight } from "lucide-react";

// Decorative background: subtle grid drift, floating code glyphs, and soft gradient blobs.
// Pure CSS (styled-jsx), pointer-events disabled, sits behind all content (z-0).
function HeroBackgroundFX() {
  const glyphs = [
    { text: "</>", top: "12%", left: "6%", size: "text-3xl", duration: "14s", delay: "0s" },
    { text: "{ }", top: "68%", left: "10%", size: "text-2xl", duration: "17s", delay: "1.5s" },
    { text: "const", top: "22%", left: "88%", size: "text-xl", duration: "16s", delay: "0.5s" },
    { text: "01", top: "78%", left: "84%", size: "text-2xl", duration: "13s", delay: "2s" },
    { text: "npm run dev", top: "48%", left: "92%", size: "text-sm", duration: "19s", delay: "1s" },
    { text: "=&gt;", top: "6%", left: "45%", size: "text-2xl", duration: "15s", delay: "2.5s" },
    { text: "[ ]", top: "88%", left: "40%", size: "text-xl", duration: "18s", delay: "0.8s" },
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Drifting grid */}
      <div className="hero-grid absolute inset-0 opacity-[0.05]" />

      {/* Soft gradient blobs */}
      <div className="hero-blob hero-blob-1 absolute h-[380px] w-[380px] rounded-full bg-plasma-violet/20 blur-[90px]" />
      <div className="hero-blob hero-blob-2 absolute h-[320px] w-[320px] rounded-full bg-accent/20 blur-[100px]" />

      {/* Floating code glyphs */}
      {glyphs.map((g, i) => (
        <span
          key={i}
          className={`hero-glyph absolute ${g.size} text-muted/25`}
          style={{
            top: g.top,
            left: g.left,
            animationDuration: g.duration,
            animationDelay: g.delay,
          }}
          dangerouslySetInnerHTML={{ __html: g.text }}
        />
      ))}

      {/* Let the decorative grid and glow dissolve naturally into the page. */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent via-background/75 to-background" />
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative mx-auto max-w-content overflow-hidden px-6 py-14 lg:px-16 lg:py-20"
    >
      <HeroBackgroundFX />

      <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_auto]">
        {/* Left: intro copy */}
        <div className="max-w-[560px] lg:max-w-[680px]">
          <div className="motion-reveal mb-4 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-ink sm:text-[11px]">
            <Feather size={15} />
            <span>Portfolio</span>
          </div>

          <h1 className="motion-reveal motion-delay-1 hero-headline text-ink">
            <span className="hero-title block whitespace-nowrap text-[clamp(2.45rem,10vw,6rem)]">ENGINEERING</span>
            <span className="hero-title -mt-[0.04em] ml-[12%] block whitespace-nowrap text-[clamp(2.45rem,10vw,6rem)]">DIGITAL</span>
            <span className="font-signature -mt-2 ml-[2%] block whitespace-nowrap text-[clamp(3.9rem,17vw,10.5rem)] leading-[0.68] text-plasma-violet">experiences.</span>
          </h1>

          <div className="motion-reveal motion-delay-2 mt-13 ml-1 border-l border-plasma-violet/60 pl-4">
            <p className="text-[18px] font-medium leading-none tracking-tight text-ink">
              Mudith Milinda
            </p>
            <p className="mt-2 text-[8px] font-medium uppercase tracking-[0.16em] text-muted sm:whitespace-nowrap sm:text-[10px] sm:tracking-[0.24em]">
              Software Engineer <span className="mx-1 text-plasma-violet">·</span> Full-Stack Developer
            </p>
          </div>

          <p className="motion-reveal motion-delay-3 mt-7 max-w-[430px] text-[15px] leading-relaxed text-muted">
            I design, develop, and engineer scalable software solutions, modern
            web applications, and intelligent digital systems with a focus on
            performance, reliability, user experience, and clean, maintainable
            code.
          </p>

          <div className="motion-reveal motion-delay-2 mt-5 flex items-center gap-2 text-[13px] font-medium text-ink">
            <span className="motion-pulse h-2 w-2 rounded-full bg-accent" />
            Available for new projects
          </div>

          <a
            href="#contact"
            className="motion-reveal motion-delay-3 mt-6 inline-flex items-center gap-2 bg-foreground px-5 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-background transition-transform duration-300 hover:-translate-y-1 hover:opacity-85"
          >
            Contact
            <ArrowUpRight size={16} />
          </a>

        </div>

        {/* Right: portrait + stats */}
        <div className="motion-reveal-right mx-auto w-full max-w-[340px] lg:mx-0">
          <div className="motion-float aspect-[3/4] w-full overflow-hidden rounded-2xl bg-line">
            {/* Photo lives at /public/images/heroimg.png */}
            <Image
              src="/images/heroimg.png"
              alt="Portrait of Mudith Milinda"
              width={480}
              height={640}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

    </section>
  );
}
