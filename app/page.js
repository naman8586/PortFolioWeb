"use client";

import { motion, useScroll, useSpring } from "framer-motion";

import Scene from "@/components/Scene";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import ProjectGrid from "@/components/ProjectGrid";
import SkillsSection from "@/components/SkillsOrbit";
import Contact from "@/components/Contact";

export default function Home() {
  // Global cinematic scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <main className="relative min-h-screen bg-transparent selection:bg-white/10 selection:text-white">
      {/* ───────────────── Scroll Progress Bar ───────────────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-200 h-2 origin-left bg-zinc-500"
        style={{ scaleX }}
      />

      {/* ───────────────── Persistent Starry Background ───────────────── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Scene />
      </div>

      {/* ───────────────── UI Layer ───────────────── */}
      <div className="relative z-10 flex flex-col">
        <Navbar />

        {/* Hero */}
        <section id="home" className="scroll-mt-24">
          <Hero />
        </section>

        {/* Content Flow */}
        <div className="relative flex flex-col">
          <section id="education" className="scroll-mt-32">
            <Education />
          </section>

          <section id="experience" className="scroll-mt-32">
            <Experience />
          </section>

          <section id="projects" className="scroll-mt-32">
            <ProjectGrid />
          </section>

          {/* Skills Orbit – visual bridge */}
          <section
            id="skills"
            className="scroll-mt-32 min-h-screen flex items-center"
          >
            <SkillsSection />
          </section>

          <section id="contact" className="scroll-mt-32">
            <Contact />
          </section>
        </div>

        {/* ───────────────── Footer ───────────────── */}
        <footer className="relative mt-24 border-t border-white/5 bg-black/10 backdrop-blur-xl">
          <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-center md:text-left space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-tight text-white">
                Naman Soni
              </h3>
              <p className="text-[9px] uppercase tracking-[0.4em] text-zinc-600">
                Full-Stack Developer & Automation Architect
              </p>
            </div>

            <div className="text-center md:text-right space-y-2">
              <p className="text-[9px] uppercase tracking-widest text-zinc-500">
                Designed & Developed in India
              </p>
              <p className="text-[9px] uppercase tracking-widest text-zinc-700">
                © 2025 Naman Soni. All rights reserved.
              </p>
            </div>
          </div>

          {/* subtle bottom glow */}
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-linear-to-r from-transparent via-zinc-800 to-transparent" />
        </footer>
      </div>
    </main>
  );
}
