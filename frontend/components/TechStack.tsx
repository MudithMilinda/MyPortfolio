type TechGroup = {
  label: string;
  tools: string[];
};

const TECH_GROUPS: TechGroup[] = [
  {
    label: "Frontend",
    tools: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Flutter"],
  },
  {
    label: "Backend",
    tools: ["Node.js", "Express.js", "Python", "REST APIs"],
  },
  {
    label: "Databases & BaaS",
    tools: ["MongoDB", "MySQL", "PostgreSQL", "Firebase", "Supabase"],
  },
  {
    label: "Tools & Deployment",
    tools: ["Git", "GitHub", "Postman", "Docker", "Vercel", "Render", "AWS", "Linux"],
  },
  {
    label: "Design",
    tools: ["Figma"],
  },
];

export default function TechStack() {
  return (
    <section
      id="tech-stack"
      className="w-full bg-background px-6 py-24 text-foreground lg:px-16 lg:py-32"
    >
      <div className="mx-auto grid max-w-[1280px] gap-16 md:-translate-x-4 md:items-start md:grid-cols-[minmax(280px,0.95fr)_minmax(0,1.05fr)] md:gap-12 lg:grid-cols-[minmax(440px,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
        <div className="md:sticky md:top-6 md:h-fit md:self-start">
          <h2 className="text-[clamp(4.4rem,9vw,8.5rem)] font-medium leading-[0.78] tracking-[-0.075em] text-foreground">
            THE STACK
            <span className="font-signature mt-5 block whitespace-nowrap text-[clamp(5rem,9.5vw,8.8rem)] leading-[0.55] tracking-[-0.045em] text-plasma-violet">
              behind my work.
            </span>
          </h2>

          <div className="mt-16 max-w-[390px] border border-line px-6 py-6">
            <p className="text-[9px] font-medium uppercase tracking-[0.24em] text-muted">
              My Tech Stack
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-muted">
              Technologies and tools I use to design, develop, and deliver scalable, efficient, and reliable software solutions with a focus on performance, maintainability, and modern engineering practices.
            </p>
          </div>
        </div>

        <div className="space-y-11">
          {TECH_GROUPS.map((group) => (
            <div key={group.label}>
              <div className="flex items-center justify-between border-b border-line pb-3">
                <h3 className="text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
                  {group.label}
                </h3>
                <span className="text-[10px] font-medium tracking-[0.16em] text-muted">
                  {String(group.tools.length).padStart(2, "0")}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {group.tools.map((tool) => (
                  <span
                    key={tool}
                    className="border border-line px-4 py-3 text-[15px] font-medium text-foreground transition-colors duration-200 hover:border-plasma-violet hover:bg-plasma-violet/10 hover:text-plasma-violet sm:text-[16px]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
