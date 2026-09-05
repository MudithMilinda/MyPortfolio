import Image from "next/image";
import { Feather, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";

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
          className={`hero-glyph absolute font-mono ${g.size} text-muted/25`}
          style={{
            top: g.top,
            left: g.left,
            animationDuration: g.duration,
            animationDelay: g.delay,
          }}
          dangerouslySetInnerHTML={{ __html: g.text }}
        />
      ))}
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
        <div className="max-w-[430px]">
          <div className="motion-reveal mb-4 flex items-center gap-2 text-[14px] text-ink">
            <Feather size={15} />
            <span>Hey there. I&apos;m</span>
          </div>

          <h2 className="motion-reveal motion-delay-1 font-display text-[56px] leading-[0.92] tracking-tight text-ink sm:text-[64px]">
            MUDITH
            <br />
            MILINDA
          </h2>

          <p className="motion-reveal motion-delay-2 mt-6 text-[15px] leading-relaxed text-muted">
            Software Engineer graduate currently interning at SoftVision IT
            Group (Pvt) Ltd, building responsive and scalable full-stack web applications using React.js, Next.js, Node.js, and MongoDB.
          </p>

          <div className="motion-reveal motion-delay-2 mt-5 flex items-center gap-2 text-[13px] font-medium text-ink">
            <span className="motion-pulse h-2 w-2 rounded-full bg-accent" />
            Available for new projects
          </div>

          <a
            href="#contact"
            className="motion-reveal motion-delay-3 mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-[14px] font-semibold text-background transition-transform duration-300 hover:-translate-y-1 hover:opacity-85"
          >
            Contact
            <ArrowUpRight size={16} />
          </a>


          <div className="motion-reveal motion-delay-4 mt-5 flex items-center gap-4">
            <a
              href="https://github.com/MudithMilinda"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub profile"
              className="text-muted transition-colors hover:text-foreground"
            >
              <FaGithub className="h-[19px] w-[19px]" />
            </a>
            <a
              href="https://www.linkedin.com/in/mudith-milinda-8729aa273/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn profile"
              className="text-muted transition-colors hover:text-foreground"
            >
              <FaLinkedinIn className="h-[19px] w-[19px]" />
            </a>
          </div>
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

      {/* Tagline banner */}
      <div className="motion-reveal motion-delay-4 relative z-10 mt-26 flex items-center gap-6">
        <div className="h-px flex-1 bg-line" />
        <p className="max-w-[520px] text-center text-[13px] font-medium leading-relaxed text-ink">
          Driving growth through modern software solutions, full-stack web development, and AI-powered applications.
        </p>
        <div className="h-px flex-1 bg-line" />
      </div>
    </section>
  );
}