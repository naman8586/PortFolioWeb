"use client";
import { motion, useScroll, useSpring } from "framer-motion";

import Scene from "@/components/Scene";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import ProjectGrid from "@/components/ProjectGrid";
import Contact from "@/components/Contact";

export default function Home() {
  const { scrollYProgress } = useScroll();
  
  // Refined Spring: Lower stiffness and higher damping for a "heavy", premium feel
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <main className="relative min-h-screen bg-[#050505] selection:bg-white/10 selection:text-white">
      
      {/* ───────────────── Scroll Progress Bar ───────────────── */}
      {/* Thinner (1px) and white for a more elegant, minimal look */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] h-[1px] origin-left bg-white/40"
        style={{ scaleX }}
      />

      {/* ───────────────── Persistent Background ───────────────── */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <Scene />
      </div>

      {/* ───────────────── UI Layer ───────────────── */}
      <div className="relative z-10 flex flex-col">
        <Navbar />

        {/* Hero - The Entry Point */}
        <section id="home" className="scroll-mt-24">
          <Hero />
        </section>

        {/* The Narrative Flow */}
        <div className="relative flex flex-col space-y-32 md:space-y-48 pb-32">
        
          <section id="experience" className="scroll-mt-32">
            <Experience />
          </section>

          <section id="projects" className="scroll-mt-32 px-6">
            <ProjectGrid />
          </section>

          <section id="education" className="scroll-mt-32">
            <Education />
          </section>

          <section id="contact" className="scroll-mt-32">
            <Contact />
          </section>
        </div>

        {/* ───────────────── Footer ───────────────── */}
        <footer className="relative border-t border-white/5 bg-black">
          <div className="mx-auto max-w-7xl px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                Naman Soni
              </h3>
              <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                Full-Stack & Automation Architect
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2">
              <p className="text-[9px] uppercase tracking-widest text-zinc-500">
                Crafted with intention <span className="mx-2 text-zinc-800">/</span> 2026
              </p>
              <p className="text-[9px] uppercase tracking-widest text-zinc-800">
                © All rights reserved.
              </p>
            </div>
          </div>

          {/* Minimalist bottom line */}
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </footer>
      </div>
    </main>
  );
}