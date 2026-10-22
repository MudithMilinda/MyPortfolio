import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import AboutMe from "@/components/AboutMe";
import TechStack from "@/components/TechStack";
import CareerTimeline from "@/components/CareerTimeline";
import FeaturedProjects from "@/components/FeaturedProjects";
import WhatICanBuild from "@/components/WhatICanBuild";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col lg:flex-row">
      <Sidebar />
      <div className="min-w-0 flex-1 lg:ml-[240px]">
        <Hero />
        <Services />
        <AboutMe />
        <TechStack />
        <CareerTimeline />
        <FeaturedProjects />
        <WhatICanBuild />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
