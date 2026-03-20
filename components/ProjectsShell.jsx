"use client";
/**
 * components/ProjectsShell.jsx
 * ─────────────────────────────────────────────────────────
 * Thin client wrapper that ONLY provides the section-level
 * Framer Motion scroll parallax. The actual data is fetched
 * in the parent Server Component (ProjectGrid.jsx) and passed
 * as children — this avoids the "async client component" error.
 * ─────────────────────────────────────────────────────────
 */
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ProjectsShell({ children }) {
  const ref = useRef(null);

  /* Section-level parallax — identical to Education & Experience */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const y       = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -80]);
  const scale   = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 0.98]);

  return (
    <motion.section
      ref={ref}
      id="projects"
      style={{ opacity, y, scale }}
      className="relative mx-auto max-w-7xl py-32 px-6"
    >
      {children}
    </motion.section>
  );
}
