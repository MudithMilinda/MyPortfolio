"use client";

import { useEffect, useRef, useState } from "react";
import { Mail } from "lucide-react";
import DottedMap from "dotted-map";
import { sendEmail } from "@/lib/actions"; // Server Action එක import කරගැනීම

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

// Sri Lanka's real coordinates
const SRI_LANKA = { lat: 7.8731, lng: 80.7718 };

// Equirectangular lat/lng -> % position within the map image (works for any rendered size)
function latLngToPercent(lat: number, lng: number) {
  return {
    left: ((lng + 180) / 360) * 100,
    top: ((90 - lat) / 180) * 100,
  };
}

// Generated once at module load — real world dot map (no more hand-placed dots)
const dottedMap = new DottedMap({ height: 100, grid: "diagonal" });
const worldMapSvg = dottedMap.getSVG({
  radius: 0.22,
  color: "#3f3f46",
  shape: "circle",
  backgroundColor: "transparent",
});

export default function Contact() {
  const { ref: leftRef, inView: leftInView } = useInView<HTMLDivElement>();
  const { ref: rightRef, inView: rightInView } = useInView<HTMLDivElement>();

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Success screen එක auto-hide කරන්න use කරන timeout ref එක
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Component unmount වුනාම pending timeout එකක් තිබ්බොත් clear කරන්න
  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    };
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const result = await sendEmail(formData);

    setLoading(false);

    if (result.success) {
      setSubmitted(true);
      setForm({ name: "", email: "", company: "", message: "" });

      // තත්පර 5කින් ආයෙත් form එකට හැරෙන්න
      resetTimeoutRef.current = setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } else {
      setErrorMessage(result.error || "Something went wrong. Please try again.");
    }
  }

  const pinPos = latLngToPercent(SRI_LANKA.lat, SRI_LANKA.lng);

  return (
    <section
      id="contact"
      className="w-full bg-background px-6 py-24 text-foreground lg:px-16"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-12">
        {/* ── Left Column ── */}
        <div
          ref={leftRef}
          className={`flex flex-col transition-all duration-700 ease-out ${
            leftInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Mail icon badge */}
          <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl border border-plasma-violet/40 bg-plasma-surface shadow-lg shadow-plasma-violet/10">
            <Mail size={24} className="text-plasma-pink" />
          </div>

          <h2 className="text-[clamp(3rem,5.2vw,5.5rem)] font-medium leading-[0.82] tracking-[-0.075em] text-foreground">
            <span className="block uppercase">CONTACT</span>
            <span className="font-signature ml-[7.5ch] mt-5 block text-[clamp(4.2rem,6.7vw,7rem)] font-normal leading-[0.55] tracking-[-0.045em] text-plasma-violet">
              Us.
            </span>
          </h2>

          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-muted">
            We are always looking for ways to improve our products and
            services. Contact us and let us know how we can help you.
          </p>

          {/* Contact details */}
          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[14px] text-muted">
            <a
              href="mailto:mudithmilinda@gmail.com"
              className="transition-colors hover:text-foreground"
            >
              mudithmilinda@gmail.com
            </a>
            <span className="text-line">•</span>
            <a
              href="tel:+94702877313"
              className="transition-colors hover:text-foreground"
            >
              +94 70 287 7313
            </a>
          </div>

          {/* World map — real dotted world map with a beam pinned on Sri Lanka */}
          <div className="relative mt-12 flex-1 overflow-hidden rounded-xl">
            <img
              src={`data:image/svg+xml;utf8,${encodeURIComponent(worldMapSvg)}`}
              alt="World map"
              className="h-full w-full object-cover opacity-60"
              draggable={false}
            />

            <div
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${pinPos.left}%`, top: `${pinPos.top}%` }}
            >
              {/* Pulsing glow under the pin */}
              <span
                className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full"
                style={{ backgroundColor: "var(--plasma-pink)", opacity: 0.35 }}
              />

              {/* Vertical beam rising from the pin */}
              <span
                className="absolute bottom-1/2 left-1/2 h-20 w-px -translate-x-1/2"
                style={{
                  background:
                    "linear-gradient(to top, var(--plasma-violet), transparent)",
                }}
              />

              {/* The pin itself */}
              <span
                className="relative block h-3 w-3 rounded-full ring-2 ring-plasma-violet/60"
                style={{ backgroundColor: "var(--plasma-pink)" }}
              />

              {/* "We are here" label */}
              <div className="absolute bottom-[88px] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-zinc-700 bg-[#1c1c1e] px-3 py-1.5 text-[11.5px] font-semibold text-zinc-200 shadow-lg">
                We are here
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Column — Form Card ── */}
        <div
          ref={rightRef}
          style={{ transitionDelay: rightInView ? "200ms" : "0ms" }}
          className={`relative min-h-[680px] overflow-hidden rounded-2xl border border-plasma-violet/35 bg-[#09090b] p-8 shadow-2xl shadow-black/60 transition-all duration-700 ease-out sm:p-10 ${
            rightInView ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
          }`}
        >
          <div
            className="pointer-events-none absolute right-0 top-0 h-56 w-56 opacity-[0.12]"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "14px 14px",
            }}
          />

          {submitted ? (
            <div className="flex h-full min-h-[360px] flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-plasma-violet/40 bg-plasma-violet/10">
                <Mail size={24} className="text-plasma-pink" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Message sent!
              </h3>
              <p className="max-w-xs text-sm text-muted">
                Thanks for reaching out. I&apos;ll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
              {/* Full name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-[13px] font-medium text-foreground">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Manu Arora"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-plasma-violet/30 bg-[#10091a] px-4 py-3 text-[14px] text-foreground placeholder-zinc-600 outline-none transition-colors focus:border-plasma-pink/60 focus:ring-1 focus:ring-plasma-pink/30"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-[13px] font-medium text-foreground">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="support@aceternity.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-plasma-violet/30 bg-[#10091a] px-4 py-3 text-[14px] text-foreground placeholder-zinc-600 outline-none transition-colors focus:border-plasma-pink/60 focus:ring-1 focus:ring-plasma-pink/30"
                />
              </div>

              {/* Company */}
              <div className="flex flex-col gap-2">
                <label htmlFor="company" className="text-[13px] font-medium text-foreground">
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Aceternity Labs LLC"
                  value={form.company}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-plasma-violet/30 bg-[#10091a] px-4 py-3 text-[14px] text-foreground placeholder-zinc-600 outline-none transition-colors focus:border-plasma-pink/60 focus:ring-1 focus:ring-plasma-pink/30"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-[13px] font-medium text-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Type your message here"
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="w-full resize-none rounded-lg border border-plasma-violet/30 bg-[#10091a] px-4 py-3 text-[14px] text-foreground placeholder-zinc-600 outline-none transition-colors focus:border-plasma-pink/60 focus:ring-1 focus:ring-plasma-pink/30"
                />
              </div>

              {errorMessage && (
                <p className="text-sm text-red-500">{errorMessage}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="mt-1 w-full bg-foreground px-6 py-3.5 text-[10px] font-medium uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-85 active:opacity-70 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
